'use server';

import type { CreateCategoryResponse, UpdateCategoryInput } from './types';
import {
  BASE_URL,
  base64ToFile,
  handleFetchError,
  parseErrorResponse,
} from './utils';
import { getToken } from '@/lib/utils/cookies';

export async function updateCategoryAction(
  input: UpdateCategoryInput
): Promise<CreateCategoryResponse> {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: 'Authentication token not found',
      };
    }

    // Validate input
    if (!input.name || !input.name.trim()) {
      return {
        success: false,
        error: 'Category name is required',
      };
    }

    if (!input.id) {
      return {
        success: false,
        error: 'Category ID is required',
      };
    }

    // Create FormData
    const formData = new FormData();
    formData.append('name', input.name.trim());

    // Only append image if provided
    if (input.image && input.imageName) {
      const { file: imageFile } = base64ToFile(input.image, input.imageName);
      formData.append('image', imageFile);
    }

    // Construct API URL
    const apiUrl = `${BASE_URL}/api/v1/categories/${input.id}`;

    // Validate URL
    try {
      new URL(apiUrl);
    } catch (urlError) {
      console.error('Invalid API URL:', apiUrl, urlError);
      return {
        success: false,
        error: `Invalid API URL: ${apiUrl}`,
      };
    }

    // Make API request
    let response: Response;
    try {
      response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        signal: AbortSignal.timeout(30000),
      });
    } catch (fetchError) {
      console.error('Fetch error details:', {
        message:
          fetchError instanceof Error ? fetchError.message : 'Unknown error',
        apiUrl,
        hasToken: !!token,
      });

      const errorMessage = handleFetchError(
        fetchError,
        'Failed to update category'
      );
      return {
        success: false,
        error: errorMessage,
      };
    }

    // Handle non-200 responses
    if (!response.ok) {
      const errorMessage = await parseErrorResponse(response);
      console.error('API error response:', errorMessage);
      console.error('Response status:', response.status);

      return {
        success: false,
        error: `Failed to update category: ${errorMessage}`,
      };
    }

    // Parse successful response
    const responseData = await response.json();

    return {
      success: true,
      data: responseData.category || responseData.data || responseData,
      message: responseData.message || 'Category updated successfully',
    };
  } catch (error) {
    console.error('Error updating category:', error);

    const errorMessage = handleFetchError(
      error,
      'An unexpected error occurred while updating the category'
    );

    return {
      success: false,
      error: errorMessage,
    };
  }
}

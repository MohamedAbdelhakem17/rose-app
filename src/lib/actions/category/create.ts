'use server';

import type { CreateCategoryResponse, CreateCategoryInput } from './types';
import {
  BASE_URL,
  base64ToFile,
  handleFetchError,
  parseErrorResponse,
} from './utils';
import { getToken } from '@/lib/utils/cookies';

export async function createCategoryAction(
  input: CreateCategoryInput
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

    if (!input.image || !input.imageName) {
      return {
        success: false,
        error: 'Category image is required',
      };
    }

    // Convert base64 to File
    const { file: imageFile } = base64ToFile(input.image, input.imageName);

    // Create FormData
    const formData = new FormData();
    formData.append('name', input.name.trim());
    formData.append('image', imageFile);

    // Construct API URL
    const apiUrl = `${BASE_URL}/api/v1/categories`;

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
        method: 'POST',
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
        'Failed to create category'
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
        error: `Failed to create category: ${errorMessage}`,
      };
    }

    // Parse successful response
    const responseData = await response.json();

    return {
      success: true,
      data: responseData.category || responseData.data || responseData,
      message: responseData.message || 'Category created successfully',
    };
  } catch (error) {
    console.error('Error creating category:', error);

    const errorMessage = handleFetchError(
      error,
      'An unexpected error occurred while creating the category'
    );

    return {
      success: false,
      error: errorMessage,
    };
  }
}

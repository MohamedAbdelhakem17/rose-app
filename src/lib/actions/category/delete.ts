'use server';

import type { CreateCategoryResponse, DeleteCategoryInput } from './types';
import { BASE_URL, handleFetchError, parseErrorResponse } from './utils';
import { getToken } from '@/lib/utils/cookies';

export async function deleteCategoryAction(
  input: DeleteCategoryInput
): Promise<CreateCategoryResponse> {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: 'Authentication token not found',
      };
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
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
        'Failed to delete category'
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
        error: `Failed to delete category: ${errorMessage}`,
      };
    }

    // Parse successful response
    const responseData = await response.json();

    return {
      success: true,
      data: responseData.category || responseData.data || responseData,
      message: responseData.message || 'Category deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting category:', error);

    const errorMessage = handleFetchError(
      error,
      'An unexpected error occurred while deleting the category'
    );

    return {
      success: false,
      error: errorMessage,
    };
  }
}

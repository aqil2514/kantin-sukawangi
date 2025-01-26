export function createApiResponse<T = unknown, E = unknown>(
    status: 'success' | 'error',
    message: string,
    data?: T,
    errors?: E,
  ): General.ApiResponse<T, E> {
    return {
      status,
      message,
      data,
      errors,
    };
  }
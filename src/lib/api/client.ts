/**
 * Clean API Client abstraction.
 * Follows Frontend Architecture Specification:
 * Component -> Feature Service -> API Client -> Hono REST API.
 * In this prototype, the client simulates network async latency and returns normalized API responses.
 */

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
}

export const simulateNetworkLatency = (ms = 180): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const ApiClient = {
  get: async <T>(endpoint: string, fallbackData: T): Promise<ApiResponse<T>> => {
    await simulateNetworkLatency(100);
    return {
      success: true,
      data: fallbackData,
    };
  },

  post: async <T>(endpoint: string, body: unknown, resultData: T): Promise<ApiResponse<T>> => {
    await simulateNetworkLatency(200);
    return {
      success: true,
      data: resultData,
    };
  },

  patch: async <T>(endpoint: string, body: unknown, updatedData: T): Promise<ApiResponse<T>> => {
    await simulateNetworkLatency(150);
    return {
      success: true,
      data: updatedData,
    };
  },

  delete: async (endpoint: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    await simulateNetworkLatency(150);
    return {
      success: true,
      data: { deleted: true },
    };
  },
};

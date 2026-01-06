export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export const successResponse = <T>(
  data: T,
  message = "Success"
): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const errorResponse = (
  message = "Something went wrong"
): ApiResponse<null> => ({
  success: false,
  message,
});

//Structured Success Response
export const successResponse = (data: unknown, message = "Success") => ({
  success: true,
  message,
  data,
});
//Structured Error Response
export const errorResponse = (message = "Something went wrong") => ({
  success: false,
  message,
});

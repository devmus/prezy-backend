export const successResponse = (
  data,
  message = "Success",
  statusCode = 200
) => ({
  status: "success",
  message,
  data,
  statusCode,
});

export const errorResponse = (
  message = "Something went wrong",
  statusCode = 500,
  data = null
) => ({
  status: "error",
  message,
  data,
  statusCode,
});

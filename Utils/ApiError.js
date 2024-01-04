class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.details = message;
    this.statusCode = statusCode;
    this.isApiError = true;
  }
}
export default ApiError;

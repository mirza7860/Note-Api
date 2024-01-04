class ApiResponse {
  constructor(status = 200, response = {}, headers = {}, metadata = {}) {
    this.status = status;
    this.response = response;
  }
}
export default ApiResponse;

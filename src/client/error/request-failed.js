class RequestFailedError extends Error {
  /**
   * @param {string} url
   * @param {*} response 
   */
  constructor(url, response) {
    const { message, reason } = response instanceof Error ? response : response.data;

    super(
      `Request to ${ url } failed due to ${ reason || 'UnknownError' }: ${ message }`
    );

    this.url = url;
    this.response = response;
    this.reason = reason;
  }
}

module.exports = RequestFailedError;

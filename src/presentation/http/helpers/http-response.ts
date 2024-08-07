/**
 * Interface representing an HTTP response.
 */
export interface IHttpResponse {
    statusCode: number
    body: Record<string, string>
  }
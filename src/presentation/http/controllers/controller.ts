import { IHttpRequest } from "../helpers/http-request";
import { HttpRequest } from "../helpers/implementation/http-request.impl";
import { HttpResponse } from "../helpers/implementation/http-response.impl";

export interface IController {
  handle(req: IHttpRequest): Promise<HttpResponse>;
}

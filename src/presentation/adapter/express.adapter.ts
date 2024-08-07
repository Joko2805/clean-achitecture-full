import { Request } from "express";
import { IController } from "../http/controllers/controller";
import { HttpRequest } from "../http/helpers/implementation/http-request.impl";
import { IHttpResponse } from "../http/helpers/http-response";

export async function expressAdapter(
  req: Request,
  controller: IController
): Promise<IHttpResponse> {
  const { user, ...body } = req.body;

  const httpRequest = new HttpRequest({
    header: req.header,
    body: body,
    path: req.params,
    query: req.query,
    user: user,
    files: req.files,
  });

  const response: IHttpResponse = await controller.handle(httpRequest);

  return response;
}

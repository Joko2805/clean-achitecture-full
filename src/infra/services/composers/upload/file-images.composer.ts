import { IController } from "../../../../presentation/http/controllers/controller";
import { FileImageController } from "../../../../presentation/http/controllers/upload/file-image.controller";

export function fileImageComposer(): IController {
  const controller: IController = new FileImageController();
  return controller;
}

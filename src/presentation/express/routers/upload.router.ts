import { response, Router } from "express";
import { expressAdapter } from "../../adapter/express.adapter";
import { fileUploadComposer } from "../../../infra/services/composers/upload/file-upload.composer";
import { fileImageComposer } from "../../../infra/services/composers/upload/file-images.composer";

const uploadRouter = Router();

uploadRouter.post("/single/:type", async (req, res) => {
  const responseAdapter = await expressAdapter(req, fileUploadComposer());
  res.status(responseAdapter.statusCode).json(responseAdapter.body);
});

uploadRouter.get("/images/:type/:img", async (req, res) => {
  const responseAdapter = await expressAdapter(req, fileImageComposer());
  const pathFile = (responseAdapter.body as { pathFile: string }).pathFile;
  return res.status(responseAdapter.statusCode).sendFile(pathFile);
});

export { uploadRouter };

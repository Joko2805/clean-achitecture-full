import { Router } from "express";
import { ensureAuthentication } from "../middlewares/ensure-authentication.midleware";
import { createProductComposer } from "../../../infra/services/composers/product/create-product.composer";
import { expressAdapter } from "../../adapter/express.adapter";
import { getAllProductComposer } from "../../../infra/services/composers/product/get-all-product.composer";

const productRouter = Router();

productRouter.post("/", ensureAuthentication, async (req, res) => {
  const responseAdapter = await expressAdapter(req, createProductComposer());
  res.status(responseAdapter.statusCode).json(responseAdapter.body);
});

productRouter.get("/", ensureAuthentication, async (req, res) => {
  const responseAdapter = await expressAdapter(req, getAllProductComposer());
  res.status(responseAdapter.statusCode).json(responseAdapter.body);
});

export { productRouter };

import { Router } from "express";
import { createCategoryComposer } from "../../../infra/services/composers/category/create-category.composer";
import { expressAdapter } from "../../adapter/express.adapter";
import { ensureAuthentication } from "../middlewares/ensure-authentication.midleware";
import { getAllCategoryComposer } from "../../../infra/services/composers/category/get-all-category.composer";

const categoryRouter = Router();

categoryRouter.get("/", ensureAuthentication, async (req, res) => {
  const responseAdapter = await expressAdapter(req, getAllCategoryComposer());
  return res.status(responseAdapter.statusCode).json(responseAdapter.body);
});

categoryRouter.post("/", ensureAuthentication, async (req, res) => {
  const response = await expressAdapter(req, createCategoryComposer());
  return res.status(response.statusCode).json(response.body);
});

export { categoryRouter };

import { Router } from "express";
import { expressAdapter } from "../../adapter/express.adapter";
import { registerUserComposer } from "../../../infra/services/composers/user/register-user.composer";
import { authenticateUseComposer } from "../../../infra/services/composers/auth/authenticate-use.composer";
import { confirmUserComposer } from "../../../infra/services/composers/auth/confirm-user.composer";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const response = await expressAdapter(req, registerUserComposer());
  return res.status(response.statusCode).json(response.body);
});

authRouter.post("/authenticate", async (req, res) => {
  const response = await expressAdapter(req, authenticateUseComposer());
  return res.status(response.statusCode).json(response.body);
});

authRouter.get("/confirm-email/:token", async (req, res) => {
  const response = await expressAdapter(req, confirmUserComposer());
  return res.status(response.statusCode).json(response.body);
});

export { authRouter };

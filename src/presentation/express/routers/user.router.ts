import { Router } from "express";
import { expressAdapter } from "../../adapter/express.adapter";
import { updateUserComposer } from "../../../infra/services/composers/user/update-user.composer";
import { ensureAuthentication } from "../middlewares/ensure-authentication.midleware";

const userRouter = Router();

userRouter.put("/:id", ensureAuthentication, async (req, res) => {
  const responseAdapter = await expressAdapter(req, updateUserComposer());
  res.status(responseAdapter.statusCode).json(responseAdapter.body);
});

export { userRouter };

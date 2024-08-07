import { NextFunction, Request, Response } from "express";
import { AuthMessages } from "../../../domain/enum/authenticate/authenticate-messages";
import { TokenManagerProvider } from "../../../infra/providers/token-manager.provider.impl";
import { UserRepository } from "../../../infra/repositories/user.repository.impl";
import { prismaClient } from "../../../infra/databases/mysql/prisma/connection";

export async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res
      .status(401)
      .json({ error: AuthMessages.AuthorizationHeaderMissing });
  }

  const [, token] = authToken.split(" ");

  const tokenManagerProvider = new TokenManagerProvider();

  const { isValid, payload } = await tokenManagerProvider.getPayloadIfValid(
    token
  );

  if (!isValid) {
    return res.status(401).json({ error: AuthMessages.TokenInvalidOrExpired });
  }

  //TODO: Possible change
  // FIXME: Cambiar por id
  const id = (payload as { id: number }).id;

  const userRepository = new UserRepository(prismaClient);

  const user = await userRepository.findById(id);

  req.body.user = user;

  if (!user?.confirmedEmail) {
    return res
      .status(401)
      .json({ error: AuthMessages.AuthorizationHeaderMissing });
  }

  return next();
}

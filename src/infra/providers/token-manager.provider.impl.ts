import { envs } from "../../config/plugins/env.plugin";
import { ITokenManagerProvider } from "../../domain/providers/token-manager.provider";

import jwt from "jsonwebtoken";

const SECRET_KEY = envs.SECRET_KEY;

export class TokenManagerProvider implements ITokenManagerProvider {
  async getPayloadIfValid(
    token: string
  ): Promise<{ isValid: boolean; payload: any }> {
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      return { isValid: true, payload };
    } catch (error) {
      return { isValid: false, payload: null };
    }
  }

  async generateToken(email: string, id: number): Promise<string> {
    const token = jwt.sign({ id }, SECRET_KEY, {
      subject: email,
      expiresIn: "1h",
    });

    return token;
  }
}

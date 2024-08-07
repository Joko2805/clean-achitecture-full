import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_USER: get("MAILER_USER").required().asString(),
  MAILER_PASS: get("MAILER_PASS").required().asString(),
  WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
  SECRET_KEY: get("SECRET_KEY").required().asString()
};

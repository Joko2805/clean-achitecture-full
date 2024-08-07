import { createTransport, Transporter } from "nodemailer";
import {
  EmailOptions,
  IMailerProvider,
} from "../../domain/providers/mailer.provider";
import { envs } from "../../config/plugins/env.plugin";

const SERVICE = envs.MAILER_SERVICE;
const USER = envs.MAILER_USER;
const PASS = envs.MAILER_PASS;

export class MailerProvider implements IMailerProvider {
  private _transporter: Transporter;

  constructor() {
    this._transporter = createTransport({
      service: SERVICE,
      auth: {
        user: USER,
        pass: PASS,
      },
    });
  }

  async sendEmail({ to, subject, body }: EmailOptions): Promise<void> {
    await this._transporter.sendMail({
      to,
      subject,
      html: body,
    });
  }
}

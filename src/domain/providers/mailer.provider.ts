// INFO: añadir aqui los attachments

export type EmailOptions = {
  to: string;
  subject: string;
  body: string;
};

export interface IMailerProvider {
  sendEmail(options: EmailOptions): Promise<void>;
}

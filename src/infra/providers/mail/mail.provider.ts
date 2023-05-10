export type MailDTO = {
  from: string;
  to: string;
  text?: string;
  html?: string;
  subject: string;
};

export interface IMailProviver {
  sendMail(data: MailDTO): Promise<void>;
}

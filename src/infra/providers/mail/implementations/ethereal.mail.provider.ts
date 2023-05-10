import nodemailer, { Transporter } from "nodemailer";
import { logger } from "../../../../utils/logger";
import { IMailProviver, MailDTO } from "../mail.provider";

export class EtherealMailProvider implements IMailProviver {
  private client!: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then(() => {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: "kaylie.ward@ethereal.email",
            pass: "3jZVMEdEG8PMYSBJKx",
          },
        });
        this.client = transporter;
      })
      .catch(console.error);
  }
  async sendMail(data: MailDTO): Promise<void> {
    const resultMail = await this.client.sendMail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    logger.info(`Message sent: ${resultMail.messageId}`);
    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(resultMail)}`);
  }
}

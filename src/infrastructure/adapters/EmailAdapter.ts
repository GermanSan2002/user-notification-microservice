import nodemailer from "nodemailer";
import { ExternalChannelAdapter } from "../../domain/repositories/ExternalChannelAdapter";

export class EmailAdapter implements ExternalChannelAdapter {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    // Configuración del servicio de correo electrónico
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, 
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, 
      },
    });
  }

  async send(message: string, recipient: string): Promise<boolean> {
    // Lógica para enviar un correo electrónico
    console.log(`Sending Email to ${recipient}: ${message}`);
    try {
      // Configuración del correo
      const mailOptions = {
        from: process.env.MAIL_FROM, // Remitente
        to: recipient, // Destinatario
        subject: "Notificación", // Asunto
        text: message, // Contenido en texto plano
      };

      // Enviar correo
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Correo enviado: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return false;
    }
  }
}

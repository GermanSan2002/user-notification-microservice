import { ExternalChannelAdapter } from "../../domain/repositories/ExternalChannelAdapter";

export class EmailAdapter implements ExternalChannelAdapter {
  async send(message: string, recipient: string): Promise<boolean> {
    // Lógica para enviar un correo electrónico
    console.log(`Sending Email to ${recipient}: ${message}`);
    return true;
  }
}

import { ExternalChannelAdapter } from "../../domain/repositories/ExternalChannelAdapter";

export class SmsAdapter implements ExternalChannelAdapter {
  async send(message: string, recipient: string): Promise<boolean> {
    // Lógica para enviar mensaje SMS
    console.log(`Sending SMS to ${recipient}: ${message}`);
    return true;
  }
}

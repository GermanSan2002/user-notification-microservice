import { ExternalChannelAdapter } from "../../domain/repositories/ExternalChannelAdapter";

export class PushNotificationAdapter implements ExternalChannelAdapter {
  async send(message: string, recipient: string): Promise<boolean> {
    // Lógica para enviar notificación push
    console.log(`Sending Push Notification to ${recipient}: ${message}`);
    return true;
  }
}
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";

export class DeliveryMonitoringService {
  constructor(private notificationRepository: NotificationRepository) {}

  async monitorDelivery(notificationId: string): Promise<void> {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new Error("Notification not found");
    }
    // Aquí va la lógica para verificar el estado de la entrega
    console.log(`Monitoring delivery for notification ${notificationId}`);
  }

  async retryFailedDelivery(notificationId: string): Promise<boolean> {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new Error("Notification not found");
    }
    // Lógica para intentar reenviar la notificación si falló
    console.log(`Retrying delivery for notification ${notificationId}`);
    return true;
  }
}

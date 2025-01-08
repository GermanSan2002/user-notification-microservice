//import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { NotificationUseCase } from "../interfaces/NotificationUseCase";
import { NotificationDTO } from "../dtos/NotificationDTO";
import { Notification } from "../../domain/entities/Notification";
import { NotificationRepositoryImpl } from "../../infrastructure/persistence/NotificationRepositoryImpl";

export class NotificationService implements NotificationUseCase {
  constructor(private notificationRepository: NotificationRepositoryImpl) {}

  async createNotification(notificationDTO: NotificationDTO): Promise<Notification> {
    const notification = new Notification(
      notificationDTO.id,
      notificationDTO.userId,
      notificationDTO.recipient,
      notificationDTO.message,
      notificationDTO.channel,
      notificationDTO.priority,
      notificationDTO.status,
      new Date()
    );
    
    await this.notificationRepository.save(notification);
    return notification;
  }

  async getNotificationsByUser(userId: string): Promise<NotificationDTO[]> {
    const notifications = await this.notificationRepository.findByUser(userId);
    return notifications.map((n) => ({
      id: n.id,
      userId: n.userId,
      recipient: n.recipient,
      message: n.message,
      channel: n.channel,
      priority: n.priority,
      status: n.status,
      timestamp: n.timestamp,
    }));
  }
}
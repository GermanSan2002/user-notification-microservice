import { NotificationDTO } from "../dtos/NotificationDTO";
import { Notification } from "../../domain/entities/Notification";

export interface NotificationUseCase {
  createNotification(notificationDTO: NotificationDTO): Promise<Notification>;
  getNotificationsByUser(userId: string): Promise<NotificationDTO[]>;
}

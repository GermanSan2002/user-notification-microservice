import { Notification } from "../entities/Notification";

export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | undefined>;
  findAll(): Promise<Notification[]>;
  findByUser(userId: string): Promise<Notification[]>;
}

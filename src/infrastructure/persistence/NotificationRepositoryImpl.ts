// src/infrastructure/persistence/NotificationRepositoryImpl.ts
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { Notification } from "../../domain/entities/Notification";

export class NotificationRepositoryImpl implements NotificationRepository {
  private notifications: Notification[] = [];

  async save(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findById(id: string): Promise<Notification | undefined> {
    return this.notifications.find((notification) => notification.id === id);
  }

  async findAll(): Promise<Notification[]> {
    return this.notifications;
  }

  async findByUser(userId: string): Promise<Notification[]> {
    return this.notifications.filter((notification) => notification.userId === userId);
  }

  async delete(id: string): Promise<void> {
    this.notifications = this.notifications.filter((notes) => notes.id !== id);
  }  
}

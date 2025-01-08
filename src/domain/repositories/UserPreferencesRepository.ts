import { NotificationPreferences } from "../entities/NotificationPreferences";

export interface UserPreferencesRepository {
  save(preferences: NotificationPreferences): Promise<void>;
  findByUser(userId: string): Promise<NotificationPreferences | undefined>;
  findAll(): Promise<NotificationPreferences[]>;
  update(preferences: NotificationPreferences): Promise<void>;
}

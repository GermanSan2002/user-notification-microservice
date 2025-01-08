import { NotificationPreferencesDTO } from "../dtos/NotificationPreferencesDTO";

export interface PreferencesUseCase {
  getUserPreferences(userId: string): Promise<NotificationPreferencesDTO>;
  updateUserPreferences(userId: string, preferences: NotificationPreferencesDTO): Promise<void>;
}

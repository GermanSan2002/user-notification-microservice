import { UserPreferencesRepository } from "../../domain/repositories/UserPreferencesRepository";
import { NotificationPreferences } from "../../domain/entities/NotificationPreferences";
import { Frequency } from "../../domain/enums/Frequency";

export class UserPreferencesRepositoryImpl implements UserPreferencesRepository {
  private preferencesList: NotificationPreferences[] = [];

  async save(preferences: NotificationPreferences): Promise<void> {
    this.preferencesList.push(preferences);
  }

  async findByUser(userId: string): Promise<NotificationPreferences | undefined> {
    return this.preferencesList.find((preferences) => preferences.userId === userId);
  }

  async findAll(): Promise<NotificationPreferences[]> {
    return this.preferencesList;
  }

  async update(preferences: NotificationPreferences): Promise<void> {
    const index = this.preferencesList.findIndex((p) => p.userId === preferences.userId);
  
    if (index === -1) {
      throw new Error(`Preferences for user ${preferences.userId} not found`);
    }
  
    // Actualizar las preferencias existentes.
    this.preferencesList[index] = preferences;
  }  

  async clean(): Promise<void>{
    this.preferencesList = [];
  }
}

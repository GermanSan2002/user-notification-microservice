//import { UserPreferencesRepository } from "../../domain/repositories/UserPreferencesRepository";
import { PreferencesUseCase } from "../interfaces/PreferencesUseCase";
import { NotificationPreferencesDTO } from "../dtos/NotificationPreferencesDTO";
import { NotificationPreferences } from "../../domain/entities/NotificationPreferences";
import { UserPreferencesRepositoryImpl } from "../../infrastructure/persistence/UserPreferencesRepositoryImpl";

export class UserPreferencesService implements PreferencesUseCase {
  constructor(private preferencesRepository: UserPreferencesRepositoryImpl) {}

  async getUserPreferences(userId: string): Promise<NotificationPreferencesDTO> {
    const preferences = await this.preferencesRepository.findByUser(userId);
    if (!preferences) {
      throw new Error(`Preferences for user ${userId} not found`);
    }
    return {
      userId: preferences.userId,
      alertTypes: preferences.alertTypes.map((type) => type.id),
      frequency: preferences.frequency,
      preferredChannels: preferences.preferredChannels,
      doNotDisturb: preferences.doNotDisturb,
    };
  }

  async updateUserPreferences(userId: string, preferencesDTO: NotificationPreferencesDTO): Promise<void> {
    const preferences = new NotificationPreferences(
      preferencesDTO.userId,
      preferencesDTO.alertTypes.map((id) => ({ id, alert: "" })), // Assume alert description is fetched elsewhere
      preferencesDTO.frequency,
      preferencesDTO.preferredChannels,
      preferencesDTO.doNotDisturb
    );
    await this.preferencesRepository.update(preferences);
  }
}

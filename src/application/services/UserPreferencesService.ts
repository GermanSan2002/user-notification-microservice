import { PreferencesUseCase } from "../interfaces/PreferencesUseCase";
import { NotificationPreferencesDTO } from "../dtos/NotificationPreferencesDTO";
import { NotificationPreferences } from "../../domain/entities/NotificationPreferences";
import { UserPreferencesRepositoryImpl } from "../../infrastructure/persistence/UserPreferencesRepositoryImpl";
import { AlertTypeRepositoryImpl } from "../../infrastructure/persistence/AlertTypeRepositoryImpl";

export class UserPreferencesService implements PreferencesUseCase {
  constructor(private preferencesRepository: UserPreferencesRepositoryImpl, private alertTypeRepository: AlertTypeRepositoryImpl) {}

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
    const alertTypes = await Promise.all(
      preferencesDTO.alertTypes.map(async (id) => {
          const alert = await this.alertTypeRepository.findById(id);
          if (!alert) {
              throw new Error(`Alert with ID ${id} not found`);
          }
          return alert;
      })
    );
    const preferences = new NotificationPreferences(
      preferencesDTO.userId,
      alertTypes,
      preferencesDTO.frequency,
      preferencesDTO.preferredChannels,
      preferencesDTO.doNotDisturb
    );
    await this.preferencesRepository.update(preferences);
  }

  async delete(userId: string): Promise<void>{
    return this.preferencesRepository.delete(userId);
  }
}

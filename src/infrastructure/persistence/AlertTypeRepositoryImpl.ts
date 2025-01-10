import { AlertTypeRepository } from "../../domain/repositories/AlertTypeRepository";
import { AlertType } from "../../domain/entities/AlertType";

export class AlertTypeRepositoryImpl implements AlertTypeRepository {
  private alertTypes: AlertType[] = [];

  async save(alertType: AlertType): Promise<void> {
    this.alertTypes.push(alertType);
  }

  async findById(id: string): Promise<AlertType | undefined> {
    return this.alertTypes.find((alertType) => alertType.id === id);
  }

  async findAll(): Promise<AlertType[]> {
    return this.alertTypes;
  }

  async delete(id: string): Promise<void> {
    this.alertTypes = this.alertTypes.filter((alerts) => alerts.id !== id);
  }  
}

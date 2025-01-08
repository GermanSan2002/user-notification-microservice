import { AlertType } from "../entities/AlertType";

export interface AlertTypeRepository {
  save(alertType: AlertType): Promise<void>;
  findById(id: string): Promise<AlertType | undefined>;
  findAll(): Promise<AlertType[]>;
}

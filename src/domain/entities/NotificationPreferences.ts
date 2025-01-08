import { Frequency } from "../enums/Frequency";
import { Channel } from "../enums/Channel";
import { AlertType } from "./AlertType";

export class NotificationPreferences {
  constructor(
    public userId: string,
    public alertTypes: AlertType[],
    public frequency: Frequency,
    public preferredChannels: Channel[],
    public doNotDisturb: boolean
  ) {}
}

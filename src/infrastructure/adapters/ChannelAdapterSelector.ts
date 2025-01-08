import { ExternalChannelAdapter } from "../../domain/repositories/ExternalChannelAdapter";
import { PushNotificationAdapter } from "./PushNotificationAdapter";
import { SmsAdapter } from "./SmsAdapter";
import { EmailAdapter } from "./EmailAdapter";
import { NotificationPreferencesDTO } from "../../application/dtos/NotificationPreferencesDTO";
import { Channel } from "../../domain/enums/Channel";

export class ChannelAdapterSelector {
  selectAdapter(preferences: NotificationPreferencesDTO): ExternalChannelAdapter {
    if (preferences.preferredChannels.includes(Channel.PUSH)) {
      return new PushNotificationAdapter();
    }
    if (preferences.preferredChannels.includes(Channel.SMS)) {
      return new SmsAdapter();
    }
    if (preferences.preferredChannels.includes(Channel.EMAIL)) {
      return new EmailAdapter();
    }
    throw new Error("No preferred channel found");
  }
}

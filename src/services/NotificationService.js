import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

class NotificationService {
  constructor() {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification received:', notification);
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }

  scheduleNotification(title, message, date, repeat) {
    let repeatType = null;
    if (repeat === 'Daily') {
      repeatType = 'day';
    } else if (repeat === 'Weekly') {
      repeatType = 'week';
    } else if (repeat === 'Monthly') {
      repeatType = 'month';
    }

    console.log('Scheduling notification:', {title, message, date, repeatType});

    PushNotification.localNotificationSchedule({
      title: title,
      message: message,
      date: new Date(date),
      allowWhileIdle: true,
      repeatType: repeatType,
    });
  }

  cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default new NotificationService();

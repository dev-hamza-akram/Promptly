import SQLite from 'react-native-sqlite-storage';
import NotificationService from './NotificationService';

const db = SQLite.openDatabase(
  {
    name: 'reminders.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  }
);

const ReminderService = {
  createTable: () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS reminders (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, repeat TEXT, priority TEXT, category TEXT)',
        [],
        () => {
          console.log('Table created successfully');
        },
        error => {
          console.log('Error on creating table ' + error.message);
        }
      );
    });
  },

  saveReminder: (title, description, date, repeat, priority, category) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO reminders (title, description, date, repeat, priority, category) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, date.toString(), repeat, priority, category],
        (txn, result) => {
          console.log('Reminder saved successfully');
          console.log('Scheduling notification for:', { title, description, date, repeat });
          NotificationService.scheduleNotification(title, description, new Date(date), repeat);
        },
        error => {
          console.log('Error on saving reminder ' + error.message);
        }
      );
    });
  },

  getReminders: (callback) => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM reminders',
        [],
        (txn, results) => {
          let len = results.rows.length;
          let reminders = [];
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            reminders.push(row);
          }
          callback(reminders);
        },
        error => {
          console.log('Error on fetching reminders ' + error.message);
        }
      );
    });
  },

  updateReminder: (id, title, description, date, repeat, priority, category, callback) => {
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE reminders SET title = ?, description = ?, date = ?, repeat = ?, priority = ?, category = ? WHERE id = ?',
        [title, description, date.toString(), repeat, priority, category, id],
        (txn, result) => {
          console.log('Reminder updated successfully');
          NotificationService.scheduleNotification(title, description, new Date(date), repeat);
          if (callback) callback();
        },
        error => {
          console.log('Error on updating reminder ' + error.message);
        }
      );
    });
  },

  deleteReminder: (id, callback) => {
    db.transaction(txn => {
      txn.executeSql(
        'DELETE FROM reminders WHERE id = ?',
        [id],
        (txn, result) => {
          console.log('Reminder deleted successfully');
          NotificationService.cancelAllNotifications(); // Optionally clear all notifications
          if (callback) callback();
        },
        error => {
          console.log('Error on deleting reminder ' + error.message);
        }
      );
    });
  },
};

export default ReminderService;

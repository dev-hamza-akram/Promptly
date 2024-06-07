import SQLite from 'react-native-sqlite-storage';

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
        () => {
          console.log('Reminder saved successfully');
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
};

export default ReminderService;

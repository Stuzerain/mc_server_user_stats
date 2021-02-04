const pgres = require('./index.js');

const createPeopleTable = `CREATE TABLE mcPeople(
  peopleID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL
)`;

const createTotalTimeTable = `CREATE TABLE totalTime(
  totalID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  peopleID INT,
  total INT NOT NULL DEFAULT 0,
  FOREIGN KEY (peopleID) REFERENCES people(peopleID) ON DELETE CASCADE
)`;

const createDailyTimeTable = `CREATE TABLE dailyTime(
  dailyID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  peopleID INT,
  dailyTime INT NOT NULL DEFAULT 0,
  day DATE NOT NULL DEFAULT CURRENT_DATE,
  FOREIGN KEY (peopleID) REFERENCES people(peopleID) ON DELETE CASCADE
)`;

const init = () => {
  pgres.connect();
  console.log('starting setup');

  pgres.query(createPeopleTable)
    .then(() => {
      console.log('people table created');
      pgres.query(createTotalTimeTable);
    })
    .then(() => {
      console.log('total time table created');
      pgres.query(createDailyTimeTable);
    })
    .catch(err => {
      console.error(err);
      return pgres.end()
      .then(() => {
        console.log('disconnected');
      })
    })
};

const setup = () => {
  init();
  setTimeout(() => {
    pgres.end()
      .then(() => {
        console.log('disconnected')
      })
  }, 250)
}

setup();
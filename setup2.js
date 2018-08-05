const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('stepsdb', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
db.serialize(function () {
    //db.run("DROP TABLE users")
     db.run("CREATE TABLE users ( id INTEGER PRIMARY KEY AUTOINCREMENT, user text NOT NULL, monday number, tuesday number, wednesday number, thursday number, friday number, saturday number, sunday number );");
});
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});
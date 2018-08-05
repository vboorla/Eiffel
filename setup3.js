const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('stepsdb', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
db.serialize(function () {
    db.run("INSERT INTO users (user,monday ) VALUES ('test1',4500)");
    db.run("INSERT INTO users (user,monday ) VALUES ('test2',6500)");
    db.run("DELETE FROM users WHERE id = 1");
    db.run("UPDATE users SET user = 'new_value_1', monday = 7000 WHERE id = 5")
    db.each("SELECT * FROM users", function (err, row) {
        console.log(row.user, row.monday, row.id);
    });
});
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('stepsdb', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

//console.log(__dirname);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/users', function (req, res) {
    //see all users
    db.all("SELECT * FROM users",function(err,rows){
        res.json(rows);
    }) 
});
app.post('/users', function (req, res) {
    //create add user
    db.run("INSERT INTO users(user,monday,tuesday,wednesday,thursday,friday,saturday,sunday) VALUES('"+req.body.user+"','"+req.body.monday+"','"+req.body.tuesday+"','"+req.body.wednesday+"','"+req.body.thursday+"','"+req.body.friday+"','"+req.body.saturday+"','"+req.body.sunday+"')",function(err){
        console.log(err);
        res.json({id:this.lastID});    
    })
});
app.get('/users/:id', function (req, res) {
    //get user info by ID    
     db.all("SELECT * FROM users WHERE id="+req.params.id,function(err,rows){
        res.json(rows);
    })
});
app.put('/users/:id', function (req, res) {
    //uupdate user
    db.run("UPDATE users SET user='"+req.body.user+"', monday='"+req.body.monday+"' , tuesday='"+req.body.tuesday+"', wednesday='"+req.body.wednesday+"', thursday='"+req.body.thursday+"', friday='"+req.body.friday+"', saturday='"+req.body.saturday+"', sunday='"+req.body.sunday+"' WHERE id="+req.params.id,function(err){
        console.log(err);
        res.json({status:this.changes});    
    })
});
app.delete('/users/:id', function (req, res) {
    //delete user
    db.run("DELETE FROM users WHERE id="+req.params.id,function(err){
        console.log(err);
        res.json({status:this.changes});    
    })
});
app.listen(3000);

//this function returns the object of index id within a array of objects.
function getRow(id) {
    for (let item of data.users) {
        if (item.id == id) return item;
    }
    return "User does not exist with this ID";
}

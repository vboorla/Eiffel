const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const data = {
    "users": [{
            user: "harish",
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0,
            id: 1
        }, {
            user: "vishnu",
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0,
            id: 2
        }
     ]
}

//console.log(__dirname);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.get('/users', function (req, res) {
    //see all users
    res.json(data);
});
app.post('/users', function (req, res) {
    //create add user
    req.body.id = Math.floor(Date.now());
    data.users.push(req.body);
    /*console.log(req.body);
    console.log(data);  */
    res.send("POST Sent");
});
app.get('/users/:id', function (req, res) {
    //get user info by ID    
    res.send(getRow(req.params.id));
});
app.put('/users/:id', function (req, res) {
    //uupdate user
    req.body.id = req.params.id;
    let temp = data.users.indexOf(getRow(req.params.id));
    if (temp != -1) {
        data.users[temp] = req.body
        res.write('updated ' + temp)
    } else {
        res.write('not found');
    }
    res.send();
});
app.delete('/users/:id', function (req, res) {
    //delete user
    let temp = data.users.indexOf(getRow(req.params.id));
    //console.log(req.params.id);
    if (temp != -1) {
        data.users.splice(temp, 1);
        res.write('deleted ' + temp);
    } else {
        res.write('item Not Found');
    }
    //console.log(data);
    res.send();
});
app.listen(3000);


function getRow(id) {
    for (let item of data.users) {
        if (item.id == id) return item;
    }
    return "User does not exist with this ID";
}

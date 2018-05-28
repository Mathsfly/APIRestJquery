"use strict"
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var server = require('http').Server(app);

var contacts = [];

app.get('/', function(req, res){
    res.render('mainPage')
});	

app.get('/:id', function(req, res){
    var id = req.params.id;
    const contact  = contacts.find(function () {
        contacts.id === id;
    });
	if (contact){
        res.send('The name of {id: '+ id + '} is: {' + data.value + '}');
    } else {
        res.send('this id does not exist in database');
    }
});	

app.get('/post-err/:id', function(req, res){
    var id = req.params.id;
    res.send('This id = ' + id + ' is not valid');
})

app.post('/addContact', function(req, res){
    const data = req.body;
    const contact  = contacts.find(function (elm) {
        return elm.id === data.id;
    });

    if (!contact){
        contacts.push(data);
        console.log(contacts);
    } else {
        res.redirect('/post-err/' + data.id);
    }
});	

app.post('/loadContacts', function(req, res){
    res.send(contacts);
});	

app.get('/AllContact', function(req, res){
	contacts.find(function (err, data) {
        if (err) return res.error(err);
        res.json(data);
    })
});	

server.listen(8081, function () {
    console.log('app running on 8081')
})
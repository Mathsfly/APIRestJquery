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

app.post('/', function(req, res){
    const data = req.body;
    const contact  = contacts.find(function (elm) {
        return elm.id === data.id;
    });

    if (!contact){
        contacts.push(data);
        res.send('add ok');
    } else {
        res.redirect('/post-err/' + data.id);
    }
});

app.put('/', function(req, res){
    const data = req.body;
    const contact  = contacts.find(function (elm) {
        return elm.id === data.id;
    });
    if (!contact){
        res.redirect('/post-err/' + data.id);
    } else {
        contact.name = data.name;
        res.send('modify ok');
    }
});		

app.post('/loadContacts', function(req, res){
    res.send(contacts);
});	

app.delete('/', function(req, res){
    const data = req.body;
    const contact  = contacts.find(function (elm) {
        return elm.id === data.id;
    });
    if (!contact){
        res.redirect('/post-err/' + data.id);
    } else {
        let idx = contacts.indexOf(contact);
        if (idx > -1) contacts.splice(idx,1);
        res.send('Delete ok');
    }
});	

app.get('/AllContact', function(req, res){
	contacts.find(function (err, data) {
        if (err) return res.error(err);
        res.json(data);
    })
});	

server.listen(8081, function () {
    console.log('app running on 8081');
})
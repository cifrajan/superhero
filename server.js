// Beolvassuk a szükséges csomagokat.
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Kapcsolódás az adatbázishoz.
mongoose.connect('mongodb://localhost/superhero');

// itf tábla model.
var models = {};
models.users = require('./models/users');
models.users.setConnection(mongoose);

/////////////////////////////////////////////////////
// GLobális változók.
var port = 3333;
var staticDir = 'build'

// Létrehozunk egy express szerver példányt.
var app = express();
app.set('view engine', 'jade');
app.set('views', './build/view');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Statikus fájlok.
app.use(express.static(staticDir));

app.use('/:model/:id*?', function(req, res, next) {


    if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
    console.log ( req.method);

        switch (req.method.toLowerCase()){
            // READ
            case 'get':
                var where = {};
                if (req.params.id){
                    where = { "_id": req.params.id };
                };
                models[req.params.model].getModel().find(where, function(err, data) {
                    if (req.params.id){
                        res.send(JSON.stringify(data[0]));
                    } else {
                        res.send(JSON.stringify(data));
                    }
                });
                break;
            // UPDATE
            case 'post':
                // Adatcsomagok fogadása.
                var requestBody = req.body;
                var newData = {};
                for (var k in requestBody){
                    if (k == "_id"){
                        continue;
                    }
                    newData[k] = requestBody[k];
                }
                models[req.params.model].getModel().update({
                    _id: requestBody._id
                    }, newData,
                    function(err, data) {
                        res.send('{"success": true}');
                });
                break;
            // CREATE
            case 'put':
                // Adatcsomagok fogadása.
                var requestBody = req.body;
                var row = {};
                for (var k in requestBody){
                    if (k == "_id"){
                        continue;
                    }
                    row[k] = requestBody[k];
                }
                models[req.params.model].create(row, function(data){
                   res.send(JSON.stringify(data));
                });
                break;
            // DELETE
            case 'delete':
                if (req.params.id) {
                    var where = {_id: req.params.id};
                    models[req.params.model].getModel().remove(
                        where,
                        function(err, rem){
                            if (err) console.error(err);
                            res.send(JSON.stringify(rem));
                        });
                } else {
                    res.send('{"error": "no is"}');
                }
                break;
            default:
                res.send('{"error": "unsupported method"}');
        }

    } else {
        next();
    }
});

// Definiáljuk a szerver működését.
app.get('/', function (req, res) {
//    console.log('Jött egy kliens paraméter nélküli kérés!');
    handleUsers(req, res, false, function(allUser) {
        res.render('index', {
            title: 'ItFactory Web Superhero',
            message: 'Yes it is!',
            users: allUser
        });
    });
});

// Felhasználó modell.
function handleUsers(req, res, next, callBack) {
    fs.readFile('./users.json', 'utf8', function (err, data) {
        if (err) throw err;


        //var path = req.url.split('/');
        var users = JSON.parse(data);

        if (callBack) {
            callBack(users);
            return;
        }

        var _user = {};

        // Ha nem kaptunk id-t.
        if (!req.params.id) {
            _user = users;
        } else {
            for (var k in users) {
                if (req.params.id == users[k].id) {
                    _user = users[k];
                }
            }
        }


        console.log('Fut a handleUsers function ' + req.url);
        res.send(JSON.stringify(_user));
    });
};

// Felhasználók beolvasása.
app.get('/users/:id*?', function (req, res) {
    console.log('Fut az app.get(/users/:id*? ' + req.url);
    handleUsers(req, res);
});

// Megadjuk, hogy a szerver melyik portot figyelje.
app.listen(port);

console.log("Server running in localhost:" + port);

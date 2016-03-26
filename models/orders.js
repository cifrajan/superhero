// Mongodb adatmodell.
var mongoose = require ("mongoose");
// Kezeli a megadott táblát.
var db,
    Orders;
function setConnection (mongodb) {
    db = mongodb;
    setModel();
}

// Kollekció modell.
function setModel() {

    // order schema.
    var Schema = mongoose.Schema;
    var orderSchema = new Schema({
        order_id: String,
        desc: String,
        product: String,
        deadline: Date,
        created_at: Date
    });

    Orders = db.model( 'Orders', orderSchema, 'Orders');
}

function getModel(modelName) {
    return Orders;
}

// Adatok olvasása a kollekcióból.
function read(where, callBack) {
   // Paraméter vizsgálata.
    if (!where) {
        where = {};

    }

    // Adatbázis olvasása.
    Orders.find(where, function(err, data) {
        if (err) {
            console.error('Error in query:', where);
            data = [];
        }

        if (callBack) {
            callBack (data);
        }
    });
}

// Egy dokumentum lekérése.
function first ( where, callBack) {
    read(where, function(data) {
       if (data.length > 0) {
           callBack (data[0]);
       } else {
           callBack(null);
       }
    });
}

// Új dokumentum beszúrása az adatbázisba.
function create(document, callBack) {

    var order = new Orders(document);
    order.save( function(err){
        if ( err) {
            console.error("Save error: ", err);
            callBack({});
        } else {
            callBack(order);
        }
    });
}

// Publikus elemek.
module.exports = {
    setConnection: setConnection,
    read: read,
    create: create,
    first: first,
    getModel: getModel
};





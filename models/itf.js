// Mongodb adatmodell.
// Kezeli a megadott táblát. itf
var db,
    Itf;
function setConnection (mongodb) {
    db = mongodb;
    setModel();
}

// Kollekció modell.
function setModel() {
    Itf = db.model( 'itf', {
        name: String,
        email: String,
        order: {
            date: Date,
            amount: Number,
            status: String,
            product: String
        }
    }, 'itf');

    //var user = new Itf( {'name': 'Joe'} );
    //user.save();

}

// Adatok olvasása a kollekcióból.
function read(where, callBack) {
    Itf.find(where, function(err, data) {
        if (err) {console.error('Error in query:', where);
                  callBack({});
        } else {
            callBack(data);
        }
    });
}

// Publikus elemek.
module.exports = {
    setConnection: setConnection,
    read: read
};





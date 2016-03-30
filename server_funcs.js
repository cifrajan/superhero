//Users.create( {
//    name: 'Jason Statham',
//    email: 'statham@gmail.com',
//    phone: +3614563214,
//    address: '1122 Budapest, Kiss u. 10.',
//    role: 3,
//    meta: {
//        birthday: new Date('1994-07-04'),
//        hobby: 'golf'
//    }
//}, function(saved) {
//    console.info("Saved model: ", saved);
//});

// Dokumentum törlése.
//Users.getModel().remove({'name': new RegExp('jack', 'i')}, function(err,rem){
//   if (err) console.error(err);
//    else {
//        console.log(rem.result);
//    }
//});
//
//// Dokumentum frissítése.
//Users.getModel().update(
//    {name: new RegExp('jason', 'i')},
//    {girlFrienf: 'Mariann'},
//    function(err, user){
//        if (err)
//            console.error(err);
//});

// Első találat a feltételek alapján.
//Users.first({name: new RegExp('jason', 'i')}, function(user){
//    if (user !== null) {
//        console.info("User name: ", user.name);
//    } else {
//        console.info("No user!");
//    }
//});

// Adminok visszaadása.
//Users.getModel().isAdmin( 2, function(err, data) {
//    console.log(err);
//    console.log(data);
//});

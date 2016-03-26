superhero.service( "userService", [
    "crudFactory",
    "$q",
    function( crudFactory, $q ) {
        var service = this;
        service.users = [];
        service.modelName = 'users';

        // Felhasználók lekérése.
        service.getAll = function(){
            var deferred = $q.defer();
            crudFactory.read(service.modelName)
                .then( function( userData ) {
                    deferred.resolve(userData);
                }, function( err ) {
                    deferred.reject( err);
                });
            return deferred.promise;
        };

        // Egy felhasználó lekérése
        service.getOne = function(id){
            var deferred = $q.defer();
            crudFactory.readOne(service.modelName, id)
                .then( function( userData ) {
                    deferred.resolve(userData);
                }, function( err ) {
                    deferred.reject( err);
                });
            return deferred.promise;
        };

        // Adatok frissítése.
        service.saveUser = function(row){
            var deferred = $q.defer();
            crudFactory.update(service.modelName, row)
                .then( function( userData ) {
                    deferred.resolve(userData);
                }, function( err ) {
                    deferred.reject( err);
                });
            return deferred.promise;
        };

        // Adatsor törlése.
        service.deleteUser = function(row){
            var deferred = $q.defer();
            crudFactory.delete(service.modelName, row)
                .then( function( userData ) {
                    deferred.resolve(userData);
                }, function( err ) {
                    deferred.reject( err);
                });
            return deferred.promise;
        };

        // Új rekord beszúrása.
        service.insertUser = function(row){
            var deferred = $q.defer();
            crudFactory.create(service.modelName, row)
                .then( function( userData ) {
                    deferred.resolve(userData);
                }, function( err ) {
                    deferred.reject( err);
                });
            return deferred.promise;
        };
    }
]);

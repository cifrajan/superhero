// Factory létrehozása.
superhero.factory("crudFactory", [
    "$http",
    "$q",
    function ($http, $q) {
        return {
            read: function (model) {

                // Új defer példány.
                var deferred = $q.defer();

                // Felhasználók lekérése.
                $http.get('/' +model)
                    .then(function (serverData) {
                        deferred.resolve( serverData.data );
                    }, function( err ) {
                        deferred.reject( err );
                    });

                // Visszatérés a promise objektummal.
                return deferred.promise;
            },
            readOne: function (model, id) {
                // Új defer példány.
                var deferred = $q.defer();

                // Felhasználók lekérése.
                $http.get('/' + model + '/' +id)
                    .then(function (serverData) {
                        deferred.resolve( serverData.data );
                    }, function( err ) {
                        deferred.reject( err );
                    });

                // Visszatérés a promise objektummal.
                return deferred.promise;
            },
            update: function (model, row ){
                // Új defer példány.
                var deferred = $q.defer();

                // Felhasználók lekérése.
                $http.post('/' + model, row)
                    .then(function (serverData) {
                        deferred.resolve( serverData.data );
                    }, function( err ) {
                        deferred.reject( err );
                    });

                // Visszatérés a promise objektummal.
                return deferred.promise;
            },
            delete: function ( model, row ){
                // Új defer példány.
                var deferred = $q.defer();

                // Felhasználók lekérése.
                $http.delete('/' + model + '/' + row._id)
                    .then(function (serverData) {
                        deferred.resolve( serverData.data );
                    }, function( err ) {
                        deferred.reject( err );
                    });

                // Visszatérés a promise objektummal.
                return deferred.promise;
            },
            create: function( model, row ){
                // Új defer példány.
                var deferred = $q.defer();

                // Felhasználók lekérése.
                $http.put('/' + model, row)
                    .then(function (serverData) {
                        deferred.resolve( serverData.data );
                    }, function( err ) {
                        deferred.reject( err );
                    });

                // Visszatérés a promise objektummal.
                return deferred.promise;
            }
        };
    }
])

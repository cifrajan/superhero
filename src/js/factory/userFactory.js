// Factory létrehozása.
superhero.factory("userFactory", [
    "$http",
    "$q",
    function ($http, $q) {
        return {
            getAll: function () {

                // Új defer példány.
                var deferred = $q.defer();

                // Felhasználók lekérése.
                $http.get('/users')
                    .then(function (serverData) {
                        deferred.resolve( serverData.data );
                    }, function( err ) {
                        deferred.reject( err );
                    });

                // Visszatérés a promise objektummal.
                return deferred.promise;
            },
            getOne: function (id) {
                // Új defer példány.
                var deferred = $q.defer();

                // Felhasználók lekérése.
                $http.get('/users/' +id)
                    .then(function (serverData) {
                        deferred.resolve( serverData.data );
                    }, function( err ) {
                        deferred.reject( err );
                    });

                // Visszatérés a promise objektummal.
                return deferred.promise;
            },
            saveUser: function ( row ){
                // Új defer példány.
                var deferred = $q.defer();

                // Felhasználók lekérése.
                $http.post('/users', row)
                    .then(function (serverData) {
                        deferred.resolve( serverData.data );
                    }, function( err ) {
                        deferred.reject( err );
                    });

                // Visszatérés a promise objektummal.
                return deferred.promise;
            },
            deleteUser: function ( row ){
                // Új defer példány.
                var deferred = $q.defer();

                // Felhasználók lekérése.
                $http.delete('/users/' +row._id)
                    .then(function (serverData) {
                        deferred.resolve( serverData.data );
                    }, function( err ) {
                        deferred.reject( err );
                    });

                // Visszatérés a promise objektummal.
                return deferred.promise;
            },
            insertUser: function( row ){
                // Új defer példány.
                var deferred = $q.defer();

                // Felhasználók lekérése.
                $http.put('/users', row)
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

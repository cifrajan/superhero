superhero.service( "userService", [
    "userFactory",
    "$q",
    function( userFactory, $q ) {
        var service = this;
        service.users = [];
        service.getAll = function() {

            // Defer.
            var deferred = $q.defer();

            if ( service.users.length < 1 ) {
                userFactory.getAll()
                    .then( function( users ) {
                        service.users = users;
                        deferred.resolve( users );
                    });
            } else {
                deferred.resolve( service.users );
            }

            return deferred.promise;
        }
    }
]);

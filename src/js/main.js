/*
Angular.js-ben vannak:
    Modul
    Controller
    Factory
    Service
    Filter
    Directive
*/

// Fő modul definiálása.
var superhero = angular.module("superhero", ['currencyModule']);

// Module futásának kezdete.
superhero.run(["$http", function($http) {
    $http.defaults.headers.common['x-requested-with'] =
        'XMLHttpRequest';
}]);


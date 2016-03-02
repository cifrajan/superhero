// Fő modul definiálása.
var superhero = angular.module("superhero", ['currencyModule']);

// Létrehozunk egy kontrollert.
superhero.controller("nameController", ["$scope", function($scope){

    // Figyelt változó.
    $scope.yourPrice = 9999;

    // YourPrice változó figyelése.
    $scope.$watch('yourPrice', function(newValue, oldValue) {
        console.log(newValue, oldValue);
    });

    //Új értékek kalkulálása.
    $scope.calcOwnPrice = function(price) {
        price = price.toString().replace(/[^0-9]/g, '');
        var newPrice = Math.round(parseInt(price) * 0.7);
        return isNaN(newPrice) ? 0 : newPrice;
    };
    $scope.calcOtherPrice = function(price) {
        price = price.toString().replace(/[^0-9]/g, '');
        var newPrice = Math.round(parseInt(price) * 0.85);
        return isNaN(newPrice) ? 0 : newPrice;
    };




}]);

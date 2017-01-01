/**
 * Created by Koushik on 12/29/2016.
 */

(function () {
    angular.module('placefinder')
        .controller('NavbarController',NavbarController);

    NavbarController.$inject = ['$location'];
    function NavbarController($location) {

        this.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }

})();
/**
 * Created by Koushik on 12/29/2016.
 */
(function () {
    angular.module('placefinder')
        .directive('restaurantDetails',restaurantDetails);

    function restaurantDetails() {
        var directive={
            templateUrl: 'app/restaurants/restaurantview.html',
            controller:'PlaceFinderController',
            controllerAs:'pfc'
        }
        return directive;
    }
})();
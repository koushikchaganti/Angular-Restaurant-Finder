/**
 * Created by Koushik on 12/29/2016.
 */
(function () {

    angular.module('placefinder')
        .config(PlaceFinderRouter);

    PlaceFinderRouter.$inject = ['$stateProvider','$urlRouterProvider'];
    function PlaceFinderRouter($stateProvider,$urlRouterProvider){

        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home',{
                url:'/home',
                templateUrl:'app/restaurants/home.html'
            })
            .state('maps',{
                url:'/maps',
                templateUrl:'app/restaurants/mapview.html',
                controller:'mapCtrl',
                controllerAs:'vm'
            })
    }
})();
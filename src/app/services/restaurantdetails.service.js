/**
 * Created by Koushik on 12/29/2016.
 */

(function () {
    angular.module('placefinder')
        .service('PlaceFinderService',PlaceFinderService);

    PlaceFinderService.$inject = ['$http'];
    function PlaceFinderService($http){
        this.findNearByRestaurants = function (location) {
            console.log("loc in service"+location);
            var config = {
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD6i1EKqpd2sA0Bd7JqwWrl2HsVu1O3k9g&types=restaurant&radius=8046.72',
                params:{location: location}
            }

            return $http(config)
                .then(function (resp) {
                    console.log(resp.data);
                    return resp.data.results;
                }, function (err) {
                    console.log(err);
                    return err;
                })
        }
    }
})();
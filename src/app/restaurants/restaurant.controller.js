/**
 * Created by Koushik on 12/29/2016.
 */

(function () {

    angular.module('placefinder')
        .controller('PlaceFinderController',PlaceFinderController);

    PlaceFinderController.$inject = ['PlaceFinderService','$geolocation'];
    function PlaceFinderController(PlaceFinderService,$geolocation){
        var pfc = this;
        pfc.img1 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyD6i1EKqpd2sA0Bd7JqwWrl2HsVu1O3k9g&photoreference=";
        pfc.pageSize = 4;
        pfc.currentPage = 1;
        $geolocation.getCurrentPosition().then(function(position) {
            pfc.lat = position.coords.latitude;
            pfc.lon = position.coords.longitude;
            var coord = pfc.lat +","+pfc.lon;
            console.log(coord)

            PlaceFinderService.findNearByRestaurants(coord)
                .then(function (resp) {
                    pfc.restaurants = resp;
                    console.log(resp);
                },function (err) {
                    console.log(err);
                })
        });
    }
})();
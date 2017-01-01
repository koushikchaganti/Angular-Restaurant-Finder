/**
 * Created by Koushik on 12/30/2016.
 */
(function () {
        angular.module('placefinder')
            .controller('mapCtrl',mapCtrl);
        mapCtrl.$inject = ['NgMap','$geolocation','PlaceFinderService'];
        function mapCtrl(NgMap,$geolocation,PlaceFinderService) {
            var vm = this;

            $geolocation.getCurrentPosition().then(function(position) {
                vm.lat = position.coords.latitude;
                vm.lon = position.coords.longitude;
                var coord = vm.lat +","+vm.lon;
                PlaceFinderService.findNearByRestaurants(coord)
                    .then(function (resp) {
                        vm.positions = resp;
                    },function (err) {
                        console.log(err);
                    })

                console.log(vm.positions.geometry.location.lat);

                vm.positions1={}

                for (var i=1;i<=vm.positions.length;i++) {
                    vm.positions1=[vm.positions[0].geometry.location.lat, vm.positions[0].geometry.location.lat]
                }

                console.log("Positons : "+vm.positions1);

            });


            // vm.positions1 =[
            //     {pos:[40.11, -75.21],name:1}, {pos:[40.22, -75.10],name:2},
            //     {pos:[40.33, -74.99],name:3}, {pos:[40.44, -74.88],name:4},
            //     {pos:[40.55, -74.77],name:5}, {pos:[40.66, -74.66],name:6}];

            vm.positions2 =[
                {pos:[40.71, -73.21],name:1}, {pos:[40.72, -73.20],name:2},
                {pos:[40.73, -73.19],name:3}, {pos:[40.74, -73.18],name:4},
                {pos:[40.75, -73.17],name:5}, {pos:[40.76, -73.16],name:6}];

            vm.setPositions = function(pos) {
                vm.positions = angular.copy(pos);
            };
            NgMap.getMap().then(function(map) {
                vm.map = map;
            });
            vm.setPositions(vm.positions1);
            vm.currentIndex = 0;
            vm.selectNextCustomMarker = function() {
                vm.map.customMarkers[vm.currentIndex].removeClass('selected');
                vm.currentIndex = (vm.currentIndex+1) % vm.positions.length;
                vm.map.customMarkers[vm.currentIndex].addClass('selected');
                vm.currentPosition = vm.positions[vm.currentIndex];
            }
            };
})();
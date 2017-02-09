/**
 * Created by Koushik on 12/20/2016.
 */

(function () {
    'use strict';
    angular.module('placefinder')
        .filter('startFrom', function () {
            return function (data, start) {
                if (data) {
                    start = +start; //parse to int
                    return data.slice(start);
                }
                return [];
            }
        })
})();
(function () {
    'use strict';

    angular
            .module('mvsApp')
            .service('ComunicationService', ComunicationService);

    ComunicationService.$inject = ['$http', '$q'];

    function ComunicationService($http, $q) {

        this.post = function (url) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'POST',
                headers: {
                    Authorization: 'Basic YWRtaW46YWRtaW4='
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        this.get = function (url) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'GET',
                headers: {
                    Authorization: 'Basic YWRtaW46YWRtaW4='
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

    }

})();
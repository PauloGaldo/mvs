(function () {
    'use strict';

    angular
            .module('mvsApp')
            .service('ComunicationService', ComunicationService);

    ComunicationService.$inject = ['$http', '$q'];

    function ComunicationService($http, $q) {

        this.post = function (url, token) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'POST',
                headers: {
                    Authorization: token
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        this.get = function (url, token) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'GET',
                headers: {
                    Authorization: token
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        this.download = function (url, token) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'GET',
                responseType: "blob",
                headers: {
                    Authorization: token
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
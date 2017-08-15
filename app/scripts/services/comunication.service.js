(function () {
    'use strict';

    angular
            .module('mvsApp')
            .service('ComunicationService', ComunicationService);

    ComunicationService.$inject = ['$http', '$q', 'Constante'];

    function ComunicationService($http, $q, Constante) {

        this.post = function (url) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'POST',
                headers: {
                    Authorization: Constante.JWT
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
                    Authorization: Constante.JWT
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        this.download = function (url) {
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'GET',
                responseType: "blob",
                headers: {
                    Authorization: Constante.JWT
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
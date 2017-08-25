(function () {
    'use strict';

    angular
            .module('mvsApp')
            .config(Config);

    Config.$inject = ['$stateProvider', 'localStorageServiceProvider'];

    function Config($stateProvider, localStorageServiceProvider) {

        localStorageServiceProvider
                .setPrefix('mvsApp')
                .setStorageType('sessionStorage')
                .setNotify(true, true);

        function Configuration($http, $q) {
            var deferred = $q.defer();
            $http({
                url: 'config.json',
                method: 'GET'
            }).then(function successCallback(response) {
                console.log(response);
                response.data.BASE_URL = 'http://' + response.data.host_modulo + ':' + response.data.port_modulo;
                response.data.CAM_URL = 'http://' + response.data.host_stream + ':' + response.data.port_stream;
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                console.log(response);
            });
            return deferred.promise;
        }

        $stateProvider
                .state('flowplayer', {
                    url: '/flowplayer?id',
                    resolve: {Configuration: Configuration},
                    views: {
                        'video': {
                            templateUrl: "views/flowplayer.html",
                            controller: 'FlashCtrl as vm'
                        },
                        'controls': {
                            templateUrl: "views/main.html",
                            controller: 'MainCtrl as vm'
                        }
                    }
                })
                .state('nativo', {
                    url: '/nativo?id',
                    resolve: {Configuration: Configuration},
                    views: {
                        'video': {
                            templateUrl: "views/nativo.html",
                            controller: 'NativeCtrlr as vm'
                        },
                        'controls': {
                            templateUrl: "views/main.html",
                            controller: 'MainCtrl as vm'
                        }
                    }
                })
                .state('socket', {
                    url: '/socket?id',
                    resolve: {Configuration: Configuration},
                    views: {
                        'video': {
                            templateUrl: "views/socket.html",
                            controller: 'SocketCtrlr as vm'
                        },
                        'controls': {
                            templateUrl: "views/main.html",
                            controller: 'MainCtrl as vm'
                        }
                    }
                })
                .state('extension', {
                    url: '/extension?id',
                    resolve: {Configuration: Configuration},
                    views: {
                        'video': {
                            templateUrl: "views/extension.html",
                            controller: "ExtensionCtrlr as vm"
                        },
                        'controls': {
                            templateUrl: "views/main.html",
                            controller: 'MainCtrl as vm'
                        }
                    }
                });

    }

})();
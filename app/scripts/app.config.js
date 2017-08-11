(function () {
    'use strict';

    angular
            .module('mvsApp')
            .config(Config);

    Config.$inject = ['$stateProvider', '$locationProvider'];

    function Config($stateProvider, $locationProvider) {
        $stateProvider
                .state('flowplayer', {
                    url: '/flowplayer?id',
                    templateUrl: "views/flowplayer.html",
                    controller: 'FlashCtrl as vm'
                })
                .state('nativo', {
                    url: '/nativo?id',
                    templateUrl: "views/nativo.html",
                    controller: 'NativeCtrlr as vm'
                })
                .state('socket', {
                    url: '/socket?id',
                    templateUrl: "views/socket.html",
                    controller: 'SocketCtrlr as vm'
                });
//        $locationProvider.html5Mode(true);
    }

})();
(function () {
    'use strict';

    angular
            .module('mvsApp')
            .config(Config);

    Config.$inject = ['$stateProvider', '$locationProvider'];

    function Config($stateProvider, $locationProvider) {
        $stateProvider
                /*MODULO CONSULTAS*/
                .state('flowplayer', {
                    url: '/flowplayer?id',
                    templateUrl: "views/flowplayer.html",
                    controller: 'MainCtrl as vm'
                })
                .state('nativo', {
                    url: '/nativo?id',
                    templateUrl: "views/nativo.html",
                    controller: 'NativoCtrlr as vm'
                });
//        $locationProvider.html5Mode(true);
    }

})();
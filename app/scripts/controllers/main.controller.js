(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$stateParams'];

    function MainCtrl($stateParams) {
        var vm = this;

        $f().play([{url: 'http://108.59.81.161/video/flash/' + $stateParams.id}]);
    }

})();
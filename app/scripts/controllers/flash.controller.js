(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('FlashCtrl', FlashCtrl);

    FlashCtrl.$inject = ['$stateParams', 'Constante'];

    function FlashCtrl($stateParams, Constante) {
        var vm = this;

        $f().play([{url: Constante.CAM_URL + '/video/flash/' + $stateParams.id}]);
    }

})();
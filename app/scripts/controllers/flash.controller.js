(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('FlashCtrl', FlashCtrl);

    FlashCtrl.$inject = ['$stateParams', 'Configuration'];

    function FlashCtrl($stateParams, Configuration) {
        var vm = this;

        $f().play([{url: Configuration.CAM_URL + '/video/flash/' + $stateParams.id}]);
    }

})();
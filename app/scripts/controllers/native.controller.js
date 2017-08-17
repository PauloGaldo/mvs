(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('NativeCtrlr', NativeCtrlr);

    NativeCtrlr.$inject = ['$stateParams', 'Configuration'];

    function NativeCtrlr($stateParams, Configuration) {
        var vm = this;
        vm.id = $stateParams.id;
        vm.source = Configuration.CAM_URL + '/video/html5/' + $stateParams.id;
    }

})();
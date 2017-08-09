(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('NativeCtrlr', NativeCtrlr);

    NativeCtrlr.$inject = ['$stateParams', 'Constante'];

    function NativeCtrlr($stateParams, Constante) {
        var vm = this;
        vm.id = $stateParams.id;
        vm.source = Constante.CAM_URL + '/html5/' + $stateParams.id;
    }

})();
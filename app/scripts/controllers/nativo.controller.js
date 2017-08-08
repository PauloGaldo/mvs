(function () {
    'use strict';
    
    angular
            .module('mvsApp')
            .controller('NativoCtrlr', NativoCtrlr);

    NativoCtrlr.$inject = ['$stateParams'];

    function NativoCtrlr($stateParams) {
        var vm = this;
        vm.id = $stateParams.id;
        vm.source = 'http://108.59.81.161/html5/' + $stateParams.id;
    }

})();
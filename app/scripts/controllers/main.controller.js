(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$stateParams', 'Constante', 'ComunicationService'];

    function MainCtrl($stateParams, Constante, ComunicationService) {
        var vm = this;
        vm.moveRight = moveRight;
        vm.moveLeft = moveLeft;
        vm.moveUp = moveUp;
        vm.moveDown = moveDown;
        vm.stop = stop;
        vm.zoomOut = zoomOut;
        vm.zoomIn = zoomIn;


        /**
         * Movimiento a la derecha
         * @returns {undefined}
         */
        function moveRight() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=right";
            ComunicationService.post(url);
        }

        /**
         * Movimiento a la izquierda
         * @returns {undefined}
         */
        function moveLeft() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=left";
            ComunicationService.post(url);
        }

        /**
         * Movminiento hacia arriba
         * @returns {undefined}
         */
        function moveUp() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=up";
            ComunicationService.post(url);
        }

        /**
         * Movimiento hacia abajo
         * @returns {undefined}
         */
        function moveDown() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=down";
            ComunicationService.post(url);
        }

        /**
         * Detener movimiento
         * @returns {undefined}
         */
        function stop() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=stop";
            ComunicationService.post(url);
        }

        /**
         * Alejar camara
         * @returns {undefined}
         */
        function zoomOut() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/zoom?action=out";
            ComunicationService.post(url);
        }

        /**
         * Acercar camara
         * @returns {undefined}
         */
        function zoomIn() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/zoom?action=in";
            ComunicationService.post(url);
        }
    }

})();

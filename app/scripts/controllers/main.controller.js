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

        function exportVideo() {
            var desde = $("#date_desde").val() + "T" + $("#time_desde").val() + ":" + $("#segs_desde").val();
            var hasta = $("#date_hasta").val() + "T" + $("#time_hasta").val() + ":" + $("#segs_hasta").val();
            var url = "http://148.240.92.98:8484/api/device-manager/export?guid=" + window.cameraId + "&from=" + encodeURIComponent(desde) + "&to=" + encodeURIComponent(hasta);
            post(url);
        }
    }

})();

(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$stateParams', 'Constante', 'ComunicationService', 'localStorageService', '$timeout', 'Blob', 'FileSaver'];

    function MainCtrl($stateParams, Constante, ComunicationService, localStorageService, $timeout, Blob, FileSaver) {
        var vm = this;
        /*VARIABLES*/
        vm.frm = {};
        vm.habilitar = {
            btnDownload: false,
            btnExportar: false
        };
        vm.cameraMovements = null;
        vm.guids = [];
        vm.visible = {btnDownload: false, btnExportar: true};
        vm.text = {
            btnDownload: 'Descargar',
            btnExportar: 'Exportar'
        };
        /*FUNCIONES Y/O METODOS*/
        vm.descargarVideo = descargarVideo;
        vm.exportVideo = exportVideo;
        vm.moveRight = moveRight;
        vm.moveLeft = moveLeft;
        vm.moveUp = moveUp;
        vm.moveDown = moveDown;
        vm.stop = stop;
        vm.zoomOut = zoomOut;
        vm.zoomIn = zoomIn;

        $timeout(checkForExports, 10000);

        /**
         * Funcion para checkear estado de exportacion
         * @returns {undefined}
         */
        function checkForExports() {
            var control = localStorageService.get('guids');
            if (control) {
                if (control.length > 0) {
                    vm.habilitar.btnExportar = true;
                    console.log(control);
                    var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/video/export/" + control[0].guid + "/info";
                    ComunicationService
                            .get(url)
                            .then(function (response) {
                                console.log(response);
                                if (response.data.exportStatus.finished) {
                                    vm.text.url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/video/export/" + control[0].guid;
                                    vm.text.descargar = 'export_from' + control[0].from + '_to' + control[0].to + '.mp4';
                                    vm.visible.btnDownload = true;
                                    vm.visible.btnExportar = false;
                                }
                            });
                } else {
                    vm.habilitar.btnExportar = false;
                }
            } else {
                vm.habilitar.btnExportar = false;
            }
            $timeout(checkForExports, 10000);
        }

        /**
         * Funcion para descargar video exportado
         * @returns {undefined}
         */
        function descargarVideo() {
            vm.habilitar.btnDownload = true;
            var control = localStorageService.get('guids');
            control.splice(0, 1);
            localStorageService.set('guids', control);
            vm.visible.btnDownload = false;
            vm.habilitar.btnExportar = false;
            vm.visible.btnExportar = true;
        }

        /**
         * Movimiento a la derecha
         * @returns {undefined}
         */
        function moveRight() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=right";
            vm.cameraMovements = 'Moviendo a la derecha';
            ComunicationService
                    .post(url)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = response.data.msg;
                        } else {
                            vm.cameraMovements = 'Error al mover camara';
                        }
                    });
        }

        /**
         * Movimiento a la izquierda
         * @returns {undefined}
         */
        function moveLeft() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=left";
            vm.cameraMovements = 'Moviendo a la izquierda';
            ComunicationService
                    .post(url)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = response.data.msg;
                        } else {
                            vm.cameraMovements = 'Error al mover camara';
                        }
                    });
        }

        /**
         * Movminiento hacia arriba
         * @returns {undefined}
         */
        function moveUp() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=up";
            vm.cameraMovements = 'Moviendo arriba';
            ComunicationService
                    .post(url)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = response.data.msg;
                        } else {
                            vm.cameraMovements = 'Error al mover camara';
                        }
                    });
        }

        /**
         * Movimiento hacia abajo
         * @returns {undefined}
         */
        function moveDown() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=down";
            vm.cameraMovements = 'Moviendo abajo';
            ComunicationService
                    .post(url)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = response.data.msg;
                        } else {
                            vm.cameraMovements = 'Error al mover camara';
                        }
                    });
        }

        /**
         * Detener movimiento
         * @returns {undefined}
         */
        function stop() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=stop";
            vm.cameraMovements = 'Deteniendo movimiento';
            ComunicationService
                    .post(url)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = response.data.msg;
                        } else {
                            vm.cameraMovements = 'Error al mover camara';
                        }
                    });
        }

        /**
         * Alejar camara
         * @returns {undefined}
         */
        function zoomOut() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/zoom?action=out";
            vm.cameraMovements = 'Alejando camara';
            ComunicationService
                    .post(url)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = response.data.msg;
                        } else {
                            vm.cameraMovements = 'Error al mover camara';
                        }
                    });
        }

        /**
         * Acercar camara
         * @returns {undefined}
         */
        function zoomIn() {
            var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/zoom?action=in";
            vm.cameraMovements = 'Acercando camara';
            ComunicationService
                    .post(url)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = response.data.msg;
                        } else {
                            vm.cameraMovements = 'Error al mover camara';
                        }
                    });
        }

        /**
         * Funcion para exportar video
         * @param {type} model
         * @param {type} form
         * @returns {undefined}
         */
        function exportVideo(model, form) {
            console.log(model);
            angular.forEach(form.$$controls, function (field) {
                field.$setTouched();
            });
            if (form.$valid) {
                var splitDesde = model.fechaDesde.toISOString().split("T");
                var fechaDesde = splitDesde[0] + "T" + model.fechaDesde.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'}) + ".000";
                var splitHasta = model.fechaHasta.toISOString().split("T");
                var fechaHasta = splitHasta[0] + "T" + model.fechaHasta.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'}) + ".000";
                var url = Constante.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/video/export?from=" + fechaDesde + "&to=" + fechaHasta;
                ComunicationService
                        .post(url)
                        .then(function (response) {
                            console.log(response);
                            vm.guids.push({
                                from: fechaDesde,
                                to: fechaHasta,
                                guid: response.data.exportGUIDs[0]
                            });
                            vm.habilitar.btnExportar = true;
                            localStorageService.set('guids', vm.guids);
                        });
            }
        }
    }

})();

(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$stateParams', 'Configuration', 'ComunicationService', 'localStorageService', '$timeout'];

    function MainCtrl($stateParams, Configuration, ComunicationService, localStorageService, $timeout) {
        var vm = this;
        /*VARIABLES*/
        vm.frm = {};
        vm.habilitar = {
            btnDownload: false,
            btnExportar: false
        };
        vm.cameraMovements = null;
        vm.guids = [];
        vm.maxDatetimeLocal = new Date();
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
                    var url = Configuration.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/video/export/" + control[0].guid + "/info";
                    ComunicationService
                            .get(url, Configuration.token)
                            .then(function (response) {
                                console.log(response);
                                if (response.data.exportStatus.finished) {
                                    vm.text.url = Configuration.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/video/export/" + control[0].guid;
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
            var url = Configuration.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=right";
            vm.cameraMovements = 'Moviendo a la derecha';
            ComunicationService
                    .post(url, Configuration.token)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = 'Movimiento exitoso';
                        } else {
                            vm.cameraMovements = 'Error al mover cámara';
                        }
                    });
        }

        /**
         * Movimiento a la izquierda
         * @returns {undefined}
         */
        function moveLeft() {
            var url = Configuration.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=left";
            vm.cameraMovements = 'Moviendo a la izquierda';
            ComunicationService
                    .post(url, Configuration.token)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = 'Movimiento exitoso';
                        } else {
                            vm.cameraMovements = 'Error al mover cámara';
                        }
                    });
        }

        /**
         * Movminiento hacia arriba
         * @returns {undefined}
         */
        function moveUp() {
            var url = Configuration.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=up";
            vm.cameraMovements = 'Moviendo arriba';
            ComunicationService
                    .post(url, Configuration.token)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = 'Movimiento exitoso';
                        } else {
                            vm.cameraMovements = 'Error al mover cámara';
                        }
                    });
        }

        /**
         * Movimiento hacia abajo
         * @returns {undefined}
         */
        function moveDown() {
            var url = Configuration.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=down";
            vm.cameraMovements = 'Moviendo abajo';
            ComunicationService
                    .post(url, Configuration.token)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = 'Movimiento exitoso';
                        } else {
                            vm.cameraMovements = 'Error al mover cámara';
                        }
                    });
        }

        /**
         * Detener movimiento
         * @returns {undefined}
         */
        function stop() {
            var url = Configuration.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/move?action=stop";
            vm.cameraMovements = 'Deteniendo movimiento';
            ComunicationService
                    .post(url, Configuration.token)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = 'Acción exitosa';
                        } else {
                            vm.cameraMovements = 'Error al mover cámara';
                        }
                    });
        }

        /**
         * Alejar cámara
         * @returns {undefined}
         */
        function zoomOut() {
            var url = Configuration.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/zoom?action=out";
            vm.cameraMovements = 'Alejando cámara';
            ComunicationService
                    .post(url, Configuration.token)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = 'Acción exitosa';
                        } else {
                            vm.cameraMovements = 'Error al mover cámara';
                        }
                    });
        }

        /**
         * Acercar cámara
         * @returns {undefined}
         */
        function zoomIn() {
            var url = Configuration.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/zoom?action=in";
            vm.cameraMovements = 'Acercando cámara';
            ComunicationService
                    .post(url, Configuration.token)
                    .then(function (response) {
                        if (response.status === 200) {
                            vm.cameraMovements = 'Acción exitosa';
                        } else {
                            vm.cameraMovements = 'Error al mover cámara';
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
                var fechaDesde = splitDesde[0] + "T";
                var horaDesde = model.fechaDesde.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
                if (horaDesde.length < 8) {
                    fechaDesde += '0' + horaDesde + '.000';
                } else {
                    fechaDesde += horaDesde + '.000';
                }
                var splitHasta = model.fechaHasta.toISOString().split("T");
                var fechaHasta = splitHasta[0] + "T";
                var horaHasta = model.fechaHasta.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
                if (horaHasta.length < 8) {
                    fechaHasta += '0' + horaHasta + '.000';
                } else {
                    fechaHasta += horaHasta + '.000';
                }
                var url = Configuration.BASE_URL + "/api/v1/camera/" + $stateParams.id + "/video/export?from=" + fechaDesde + "&to=" + fechaHasta;
                ComunicationService
                        .post(url, Configuration.token)
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

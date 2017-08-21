(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('NativeCtrlr', NativeCtrlr);

    NativeCtrlr.$inject = ['$stateParams', 'Configuration', '$scope'];

    function NativeCtrlr($stateParams, Configuration, $scope) {
        var vm = this;
        vm.id = $stateParams.id;
//        vm.source = Configuration.CAM_URL + '/video/html5/' + $stateParams.id;

        var socket = io();

        var ms = new MediaSource();
        var sourceBuffer;
        var queue = [];
        var video = document.getElementById("video");
        video.src = window.URL.createObjectURL(ms);

        /**
         * Evento de carga de pantalla
         * @param {type} event 
         */
        $scope.$on('$viewContentLoaded', function (event) {
            formLoad();
        });

        function formLoad() {
            socket.on('start', function (response) {
                console.log(response);
                socket.emit('streaming', $stateParams.id);
                ms.addEventListener('sourceopen', videoLoad, false);
                ms.addEventListener('sourceclose', videoClosed, false);
            });
        }

        function videoLoad() {
            var inicialized = false;
            sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
            socket.on('data', function (response) {
                var bytes = new Uint8Array(response);
                console.log(sourceBuffer.updating);
                if (!inicialized) {
                    inicialized = true;
                    sourceBuffer.appendBuffer(bytes);
                    sourceBuffer.addEventListener('updateend', loadSegment, false);
                }
            });
        }

        function loadSegment() {
            socket.on('data', function (response) {
                var bytes = new Uint8Array(response);
                if (!sourceBuffer.updating) {
                    sourceBuffer.appendBuffer(bytes);
                } else {
                    queue.push(bytes);
                }
            });
        }

        function videoClosed(e) {
            console.log('mediaSource readyState: ' + this.readyState);
        }


    }

})();
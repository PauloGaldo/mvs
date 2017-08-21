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

        socket.on('start', function (response) {
            console.log(response);
            socket.emit('streaming', $stateParams.id);
            ms.addEventListener('sourceopen', videoLoad, false);
            ms.addEventListener('sourceclose', videoClosed, false);
            ms.addEventListener('sourceopen', function (e) {
                console.log('sourceopen: ' + ms.readyState);
            });
            ms.addEventListener('sourceended', function (e) {
                console.log('sourceended: ' + ms.readyState);
            });
            ms.addEventListener('sourceclose', function (e) {
                console.log('sourceclose: ' + ms.readyState);
            });
            ms.addEventListener('error', function (e) {
                console.log('error: ' + ms.readyState);
            });

        });


        function videoLoad() {
            sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
            sourceBuffer.addEventListener('updatestart', function (e) {
//                console.log('updatestart: ' + ms.readyState);
            });
            sourceBuffer.addEventListener('updateend', function (e) {
//                console.log('updateend: ' + ms.readyState);
            });
            sourceBuffer.addEventListener('error', function (e) {
//                console.log('error: ' + ms.readyState);
            });
            sourceBuffer.addEventListener('abort', function (e) {
//                console.log('abort: ' + ms.readyState);
            });
            sourceBuffer.addEventListener('update', function () {
                if (queue.length > 0 && !sourceBuffer.updating) {
                    console.log(queue.length);
                    sourceBuffer.appendBuffer(queue.shift());
                }
            });

            socket.on('data', function (response) {
                var bytes = new Uint8Array(response);
                var blob = new Blob(bytes);
                console.log(blob.size);
                if (sourceBuffer.updating || queue.length > 0) {
                    queue.push(bytes);
                } else {
                    sourceBuffer.appendBuffer(bytes);
                }
            });
        }

        function videoClosed(e) {
            console.log('mediaSource readyState: ' + this.readyState);
        }


    }

})();
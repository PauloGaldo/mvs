(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('SocketCtrlr', SocketCtrlr);

    SocketCtrlr.$inject = ['$stateParams'];

    function SocketCtrlr($stateParams) {
        var vm = this;

        var socket = io();
        var canvas = document.getElementById("preview");
        var context = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 450;
        context.width = canvas.width;
        context.height = canvas.height;

        socket.on('start', function (response) {
            console.log(response);
            socket.emit('streaming', $stateParams.id);
            socket.on('data', function (response) {
                var bytes = new Uint8Array(response);
                var blob = new Blob([bytes], {type: 'application/octet-binary'});
                var url = URL.createObjectURL(blob);
                var img = new Image;
                img.onload = function () {
                    URL.revokeObjectURL(url);
                    context.drawImage(img, 0, 0, context.width, context.height);
                };
                img.src = url;
            });
        });



    }

})();
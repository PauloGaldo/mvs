(function () {
    'use strict';

    angular
            .module('mvsApp')
            .controller('ExtensionCtrlr', ExtensionCtrlr);

    ExtensionCtrlr.$inject = ['$stateParams', 'Configuration', '$scope'];

    function ExtensionCtrlr($stateParams, Configuration, $scope) {
        var vm = this;
        vm.id = $stateParams.id;
        var socket = io();

        /**
         * Evento de carga de pantalla
         * @param {type} event 
         */
        $scope.$on('$viewContentLoaded', function (event) {
            socket.on('start', function (response) {
                console.log(response);
                socket.emit('rtsp_request', $stateParams.id);
                formLoad();
            });
        });

        function formLoad() {
            socket.on('rtsp_response', function (url) {
                console.log(url);
                createPlayer(url);
            });
        }

        function createPlayer(rtsp) {
            var playerId = 'vxg_media_player';
            var div = document.createElement('div');
            div.setAttribute("id", playerId);
            div.setAttribute("class", "vxgplayer");
            var runtimePlayers = document.getElementById('dynamicallyPlayers');
            runtimePlayers.appendChild(div);
            vxgplayer(playerId, {
                url: '',
                nmf_path: 'media_player.nmf',
                nmf_src: 'pnacl/Release/media_player.nmf',
                latency: 300000,
                aspect_ratio_mode: 1,
                autohide: 3,
                controls: true,
                connection_timeout: 5000,
                connection_udp: 0,
                custom_digital_zoom: false
            }).ready(function () {
                console.log(rtsp);
                vxgplayer(playerId).src(rtsp);
                vxgplayer(playerId).play();
            });

        }


    }
})();
(function () {
    'use strict';
    $.getJSON("config.json", function (json) {
        console.log(json);
        angular
                .module('mvsApp')
                .constant('Constante', {
                    BASE_URL: 'http://' + json.host_modulo + ':' + json.port_modulo,
                    JWT: json.token,
                    CAM_URL: 'http://' + json.host_stream + ':' + json.port_stream
                });
    });
})();
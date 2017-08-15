(function () {
    'use strict';

    angular
        .module('mvsApp')
        .constant('Constante', {
            BASE_URL: 'http://192.168.80.173:8080',
            JWT: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfTFBSLFJPTEVfUkZJRCxST0xFX1VTRVIsUk9MRV9XIiwiZXhwIjoxNTExNDU3NzI0fQ.-ClxLK4sKJD3iQrFpxvJzrW6TvGzRONCwjhrAOJPN2QOFjxcGJ8ndW9anfMcFHL18DBtrlCtIM9mkloKT-RhNg',
            CAM_URL: 'http://104.198.36.174'
        });
})();
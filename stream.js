const express = require('express')();
const http = require('http');
const ffmpeg = require('fluent-ffmpeg');
const server = require('http').Server(express);
const path = require('path');

function mapperCamera(guid, callback) {
    var id;
    switch (guid) {
        case "00000000-0000-0000-0000-00047e02545b":
            id = 10;
            break;
        case "00000000-0000-0000-0000-00047e025587":
            id = 14;
            break;
        case "00000000-0000-0000-0000-00047e025a48":
            id = 15;
            break;
        default:
            id = 1;
            break;
    }
    var path = '/api/device-manager/cameras/' + id + '/stream-url';
    var options = {
        hostname: '148.240.92.98',
        port: 8484,
        path: path,
        method: 'GET',
        auth: 'admin:admin',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        }
    };
    http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
            return callback(chunk);
        });
    }).end();
}

function setCameraUrl(guid, callback) {
    var path = '/api/v1/camera/' + guid + '/video/url';
    var options = {
        hostname: '148.240.92.98',
        port: 8484,
        path: path,
        method: 'GET',
        auth: 'admin:admin',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        }
    };
    http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
            return callback(chunk);
        });
    }).end();
}


server.listen(80, function () {
    console.log('Listening on localhost:8080');
});

/**
 * 00000000-0000-0000-0000-00047e02545b
 * 00000000-0000-0000-0000-00047e025587
 * 00000000-0000-0000-0000-00047e025a48
 * @param {type} req 
 * @param {type} res 
 */
express.get('/video/flash/:id', function (req, res) {
    console.log("id: " + req.params.id);
    setCameraUrl(req.params.id, function (url) {
        res.contentType('flv');
        ffmpeg(url)
                .preset('flashvideo')
                .inputOptions([
                    '-rtsp_transport', 'tcp'
                ])
                .outputOptions([
                    '-maxrate', '4000k',
                    '-bufsize', '1835k'
                ])
                .on('end', function () {
                    console.log('Stream has ended');
                })
                .on('error', function (err) {
                    console.log('an error happened: ' + err.message);
                })
                .pipe(res, {end: true});
    });
});

/**
 * 00000000-0000-0000-0000-00047e02545b
 * 00000000-0000-0000-0000-00047e025587
 * 00000000-0000-0000-0000-00047e025a48
 * @param {type} req 
 * @param {type} res 
 */
express.get('/html5/:id', function (req, res) {
    console.log("id: " + req.params.id);
    setCameraUrl(req.params.id, function (url) {
        ffmpeg(url)
                .inputOptions([
                    '-rtsp_transport', 'tcp'
                ])
                .outputOptions([
                    '-c:v', 'libtheora',
                    '-maxrate', '4000k',
                    '-bufsize', '1835k'
                ])
                .format('ogg')
                .on('end', function () {
                    console.log('Stream has ended');
                })
                .on('error', function (err) {
                    console.log('an error happened: ' + err.message);
                })
                .pipe(res, {end: true});
    });
});


express.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

express.get('/flowplayer/flowplayer.controls.swf', function (req, res) {
    res.sendFile(__dirname + '/dist/flowplayer/flowplayer.controls.swf');
});

express.get('/flowplayer/flowplayer.min.js', function (req, res) {
    res.sendFile(__dirname + '/dist/flowplayer/flowplayer.min.js');
});

express.get('/flowplayer/flowplayer.swf', function (req, res) {
    res.sendFile(__dirname + '/dist/flowplayer/flowplayer.swf');
});

/*ESTAS DIRECCIONES DEBEN ACTUALIZARCE CADA QUE SE HAGA UN BUILD*/

express.get('/scripts/scripts.2aba9a6c.js', function (req, res) {
    res.sendFile(__dirname + '/dist/scripts/scripts.2aba9a6c.js');
});

express.get('/scripts/vendor.3014206a.js', function (req, res) {
    res.sendFile(__dirname + '/dist/scripts/vendor.3014206a.js');
});

express.get('/styles/main.6230cc0e.css', function (req, res) {
    res.sendFile(__dirname + '/dist/styles/main.6230cc0e.css');
});

express.get('/styles/vendor.d41d8cd9.css', function (req, res) {
    res.sendFile(__dirname + '/dist/styles/vendor.d41d8cd9.css');
});
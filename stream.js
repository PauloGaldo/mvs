const express = require('express');
const app = express();
const ffmpeg = require('fluent-ffmpeg');
const http = require('http').createServer(app);
const sender = require('http');
const io = require('socket.io')(http);
const Log = require('log');
let LOGGER = new Log('debug');
let port = process.env.PORT || 8080;

app.listen(port, function () {
    LOGGER.info('Listening port: ' + port);
});

app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
//app.use('/socket.io', express.static(__dirname + '/socket.io'));

io.on('connection', function (socket) {
    LOGGER.info('connected to socket', socket);
});

/**
 * 00000000-0000-0000-0000-00047e02545b
 * 00000000-0000-0000-0000-00047e025587
 * 00000000-0000-0000-0000-00047e025a48
 * @param {type} req 
 * @param {type} res 
 */
app.get('/video/flash/:id', function (req, res) {
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
app.get('/html5/:id', function (req, res) {
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
    sender.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
            return callback(chunk);
        });
    }).end();
}

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
    sender.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
            return callback(chunk);
        });
    }).end();
}
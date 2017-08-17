const express = require('express');
const app = express();
const ffmpeg = require('fluent-ffmpeg');
const http = require('http').Server(app);
const sender = require('http');
const io = require('socket.io')(http);
const Log = require('log');
const logger = new Log('debug');
const port = process.env.PORT || 80;
const fs = require('fs');
const config = {
    host_stream: process.argv[2],
    port_stream: process.argv[3],
    host_modulo: process.argv[4],
    port_modulo: process.argv[5],
    token: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUwMzA3MTc1Mn0.fnYfLYVPrctWHyfkeDm_7D0t70YMyfRE6eYQGGUvjCwfmLgrTENaWv19AhxevqC3ykvCvstJ_Ns2pWgzJUyCvw'
};
fs.writeFile("app/config.json", JSON.stringify(config), function (err) {
    logger.info('config ' + err);
});

logger.info(process.argv[2], process.argv[3]);

http.listen(port, function () {
    logger.info('Listening port: ' + port);
});

app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

io.on('connection', function (socket) {
    logger.info('connected to socket');
    socket.emit('start', 'connected to socket');
    socket.on('streaming', function (guid) {
        logger.info(guid);
        setCameraUrl(guid, function (url) {
            var stream = ffmpeg(url)
                    .inputOptions([
                        '-rtsp_transport', 'tcp',
                        '-r', '10'
                    ])
                    .outputOptions([
//                    '-c:v', 'libtheora',
                        '-q:v', '10',
                        '-updatefirst', '1',
                        '-f', 'image2',
//                        '-maxrate', '1000k',
//                        '-bufsize', '435k',
                        '-s', '1280x720'
                    ])
//                .format('ogg')
                    .on('end', function () {
                        logger.info('Stream has ended');
                    })
                    .on('error', function (err) {
                        logger.info('an error happened: ' + err.message);
                    })
                    .on('start', function (commandLine) {
                        logger.info('Spawned Ffmpeg with command: ' + commandLine);
                    });
            var ffstream = stream.pipe();
            ffstream.on('data', function (resp) {
                socket.emit('data', resp);
            });
        });
    });
});

/**
 * 00000000-0000-0000-0000-00047e02545b
 * 00000000-0000-0000-0000-00047e025587
 * 00000000-0000-0000-0000-00047e025a48
 * @param {type} req 
 * @param {type} res 
 */
app.get('/video/flash/:id', function (req, res) {
    logger.info("id: " + req.params.id);
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
                    logger.info('Stream has ended');
                })
                .on('error', function (err) {
                    logger.info('an error happened: ' + err.message);
                })
                .on('start', function (commandLine) {
                    logger.info('Spawned Ffmpeg with command: ' + commandLine);
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
app.get('/video/html5/:id', function (req, res) {
    logger.info("id: " + req.params.id);
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
                    logger.info('Stream has ended');
                })
                .on('error', function (err) {
                    logger.error('an error happened: ' + err.message);
                })
                .on('start', function (commandLine) {
                    logger.info(commandLine);
                })
                .pipe(res, {end: true});
    });
});

function setCameraUrl(guid, callback) {
    var path = '/api/v1/camera/' + guid + '/video/url';
    var options = {
        hostname: config.host_modulo,
        port: config.port_modulo,
        path: path,
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
            'Authorization': config.token
        }
    };
    logger.info(options);
    sender.request(options, function (res) {
        logger.info(res.statusCode);
        if (res.statusCode === 200) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                logger.info("RTSP: ", chunk);
                return callback(chunk);
            });
        }
    }).end();
}

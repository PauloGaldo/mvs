const express = require('express');
const app = express();
const ffmpeg = require('fluent-ffmpeg');
const http = require('http').Server(app);
const sender = require('http');
const io = require('socket.io')(http);
const Log = require('log');
const logger = new Log('debug');
const fs = require('fs');
const config = {token: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX1VTRVIsUk9MRV9BRE1JTixST0xFX1ciLCJleHAiOjE1MTEzOTUxOTl9.2vk9a_mtaEMIQ18Yrn8NdxYLEgTC12XWyVkEIJMRPXtY3EiaOxvaBhWdkFY37oMFpNVUwzVW8GvmQOdJ8qDqKg'};
const path = require('path');
if (process.argv.length === 5) {
    fs.writeFile(path.join(__dirname, 'app/config.json'), JSON.stringify(config), function (err) {
        if (err) {
            logger.error('config ' + err);
        }
        logger.info('File successfully created on: ' + path.join(__dirname));
        config.host_stream = process.argv[2];
        config.port_stream = process.argv[3];
        config.host_modulo = process.argv[4];
        config.port_modulo = process.argv[5];
    });
} else {
    fs.readFile(path.join(__dirname, 'app/config.json'), 'utf8', function (err, data) {
        if (err) {
            logger.error(err);
        }
        let params = JSON.parse(data);
        logger.info('Config file found at: ' + path.join(__dirname));
        config.host_stream = params.host_stream;
        config.port_stream = params.port_stream;
        config.host_modulo = params.host_modulo;
        config.port_modulo = params.port_modulo;
        config.token = params.token;
    });
}


process.on('uncaughtException', function (err) {
    logger.error(err);
});
logger.info(process.argv[2], process.argv[3]);
http.listen(config.port_stream, function () {
    logger.info('Listening port: ' + config.port_stream);
});
app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
io.on('connection', function (socket) {
    var stream = null;
    logger.info('connected to socket');
    socket.emit('start', 'connected to socket');
    socket.on('streaming', function (guid) {
        logger.info(guid);
        setCameraUrl(guid, function (url) {
            if (url) {
                stream = ffmpeg(url)
                        .inputOptions([
//                            /**/'-threads', '32',
                            '-rtsp_transport', 'tcp'
                        ])
                        .outputOptions([
                            '-preset', 'fast',
                            '-f', 'image2',
                            '-q:v', '5',
                            '-updatefirst', '1',
                            '-r', '30',
                            '-q', '5',
                            '-s', '1280x720'
                        ])
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
            }
        });
    });
    socket.on('rtsp_request', function (guid) {
        setCameraUrl(guid, function (url) {
            socket.emit('rtsp_response', url);
        });
    });
    socket.on('disconnect', function () {
        logger.info('socket disconnected');
        if (stream) {
            stream.kill();
        }
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
        if (url) {
            ffmpeg(url)
                    .preset('flashvideo')
                    .inputOptions([
                        '-rtsp_transport', 'tcp'
                    ])
                    .outputOptions([
                        /*'-maxrate', '4000k',
                         '-bufsize', '1835k',*/
                        '-q:v', '10',
                        '-updatefirst', '1',
                        '-s', '1280x720'
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
        }
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
        if (url) {
            ffmpeg(url)
                    .inputOptions([
                        '-rtsp_transport', 'tcp'
                    ])
                    .outputOptions([
                        '-c:v', 'libtheora',
                        /*'-maxrate', '4000k',
                         '-bufsize', '1835k',*/
                        '-q:v', '10',
                        '-updatefirst', '1',
                        '-s', '1280x720'
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
        }
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
    sender.request(options, function (res) {
        logger.info(res.statusCode);
        if (res.statusCode === 200) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                logger.info("RTSP: ", chunk);
                return callback(chunk);
            });
        } else {
            return callback(null);
        }
    }).end();
}

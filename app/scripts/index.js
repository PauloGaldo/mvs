$(document).ready(function () {
    window.cameraId = getParameterByName("id");
});



function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    switch (decodeURIComponent(results[2].replace(/\+/g, " "))) {
        case "00000000-0000-0000-0000-00047e02545b":
            return 10;
            break;
        case "00000000-0000-0000-0000-00047e025587":
            return 14;
            break;
        case "00000000-0000-0000-0000-00047e025a48":
            return 15;
            break;
        default:
            return 1;
            break;
    }
}

function stop() {
    //var url = "http://148.240.92.98:8484/api/device-manager/ptz/move?panSpeed=0&tiltSpeed=0&stop=true&guid=" + window.cameraId;
    var url = "http://148.240.92.98:8484/api/device-manager/ptz/" + window.cameraId + "/move?panSpeed=0&tiltSpeed=0&stop=true";
    post(url);
}

function moveRight() {
    //var url = "http://148.240.92.98:8484/api/device-manager/ptz/move?panSpeed=5&tiltSpeed=0&stop=false&guid=" + window.cameraId;
    var url = "http://148.240.92.98:8484/api/device-manager/ptz/" + window.cameraId + "/move?panSpeed=5&tiltSpeed=0&stop=false";
    post(url);
}

function moveLeft() {
    //var url = "http://148.240.92.98:8484/api/device-manager/ptz/move?panSpeed=-5&tiltSpeed=0&stop=false&guid=" + window.cameraId;
    var url = "http://148.240.92.98:8484/api/device-manager/ptz/" + window.cameraId + "/move?panSpeed=-5&tiltSpeed=0&stop=false";
    post(url);
}

function moveUp() {
    //var url = "http://148.240.92.98:8484/api/device-manager/ptz/move?panSpeed=0&tiltSpeed=1&stop=false&guid=" + window.cameraId;
    var url = "http://148.240.92.98:8484/api/device-manager/ptz/" + window.cameraId + "/move?panSpeed=0&tiltSpeed=1&stop=false";
    post(url);
}

function moveDown() {
    //var url = "http://148.240.92.98:8484/api/device-manager/ptz/move?panSpeed=0&tiltSpeed=-1&stop=false&guid=" + window.cameraId;
    var url = "http://148.240.92.98:8484/api/device-manager/ptz/" + window.cameraId + "/move?panSpeed=0&tiltSpeed=-1&stop=false";
    post(url);
}

function zoomOut() {
    //var url = "http://148.240.92.98:8484/api/device-manager/ptz/zoom?zoomOperation=2&stop=false&guid=" + window.cameraId;
    var url = "http://148.240.92.98:8484/api/device-manager/ptz/" + window.cameraId + "/zoom?zoomOperation=2&stop=false";
    post(url);
}

function zoomIn() {
    //var url = "http://148.240.92.98:8484/api/device-manager/ptz/zoom?zoomOperation=1&stop=false&guid=" + window.cameraId;
    var url = "http://148.240.92.98:8484/api/device-manager/ptz/" + window.cameraId + "/zoom?zoomOperation=1&stop=false";
    post(url);
}

function exportVideo() {
    var desde = $("#date_desde").val() + "T" + $("#time_desde").val() + ":" + $("#segs_desde").val();
    var hasta = $("#date_hasta").val() + "T" + $("#time_hasta").val() + ":" + $("#segs_hasta").val();
    var url = "http://148.240.92.98:8484/api/device-manager/export?guid=" + window.cameraId + "&from=" + encodeURIComponent(desde) + "&to=" + encodeURIComponent(hasta);
    post(url);
}

function post(url) {
    $.ajax({
        type: "POST",
//        beforeSend: function (request) {
//            request.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
//        },
        headers: {
            "Authorization": "Basic YWRtaW46YWRtaW4="
        },
        url: url,
        //                  data: "json=" + escape(JSON.stringify(params)),
        processData: false,
        success: function (msg) {
            console.log(msg);
        }
    });
}

function get(url) {
    $.ajax({
        type: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "Basic YWRtaW46YWRtaW4=");
        },
        url: url,
        processData: false,
        success: function (msg) {
            console.log(StringifyPretty(msg));
        }
    });
}
         
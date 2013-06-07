var VirtualMaze = VirtualMaze || {};

// To solve some compatibility issues
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;

VirtualMaze.maze = null;
VirtualMaze.originalSnapshotContext = document.getElementById("original_snapshot").getContext('2d');

var video = document.getElementById("video");

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

/** Display live stream from webcam **/

var cameraStream = null

function onCameraFail(e) {
    console.error("Unable to retrieve camera stream: ", e);
}

function onCameraSuccess(stream) {
    video.src = window.URL.createObjectURL(stream);
    cameraStream = stream;
}

navigator.getUserMedia({ video: true }, onCameraSuccess, onCameraFail);

document.getElementById("snap_button").addEventListener("click", function(e) {
    e.preventDefault();
    if (cameraStream) {
        context.drawImage(video, 0, 0, 800, 600);
        VirtualMaze.originalSnapshotContext.drawImage(video, 0, 0, 800, 600);
        video.parentNode.style.display = "none";
        canvas.parentNode.style.display = "block";

        VirtualMaze.maze = new Maze(context);
        VirtualMaze.maze.buildWalls();
    }
}, true);

document.getElementById("new_maze").addEventListener("click", function(e) {
    video.parentNode.style.display = "block";
    canvas.parentNode.style.display = "none";
}, true);

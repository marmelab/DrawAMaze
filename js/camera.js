// To solve some compatibility issues
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;

var VirtualMaze = VirtualMaze || {};

VirtualMaze.WebcamStream = function() {

    var me = this;

    this.userMedia = null
    this.cameraStream = null
    this.video = document.getElementById("video");

    this.start = function() {
        this.userMedia = navigator.getUserMedia({
            video: true
        }, function(stream) {
            me.video.src = window.URL.createObjectURL(stream);
            me.cameraStream = stream;
        }, function(e) {
            console.error("Unable to retrieve camera stream: ", e);
        });
    };

    this.takeSnapshot = function(originalContext, context) {
        context.drawImage(this.video, 0, 0, 800, 600);
        originalContext.drawImage(this.video, 0, 0, 800, 600);
    }
}

var VirtualMaze = VirtualMaze || {};

var wallThresholdValue = document.getElementById("wall_threshold_value");

document.getElementById("wall_threshold").addEventListener("change", function(e) {
    if (VirtualMaze.maze) {
        VirtualMaze.maze.updateWallThreshold(this.value);
        wallThresholdValue.innerText = this.value;
    }
}, true);

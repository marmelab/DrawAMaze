var VirtualMaze = VirtualMaze || {};

VirtualMaze.Player = function(x, y, radius) {

    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw = function(context) {
        if (!context) {
            return;
        }

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.fillStyle = "red";
        context.fill();
    }
}

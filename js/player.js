var VirtualMaze = VirtualMaze || {};

VirtualMaze.Player = function(context, x, y, radius) {

    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw = function() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        this.context.closePath();
        this.context.fillStyle = "red";
        this.context.fill();
    }
}

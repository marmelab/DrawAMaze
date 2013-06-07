var VirtualMaze = VirtualMaze || {};

VirtualMaze.Player = function(x, y, radius) {

    this.SPEED = 10;

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

    this.move = function(direction) {
        switch(direction) {
            case "right":
                this.x += this.SPEED;
                if (this.x + this.radius > 800) {
                    this.x = 800 - this.radius;
                }
                break;

            case "left":
                this.x -= this.SPEED;
                if (this.x < this.radius) {
                    this.x = this.radius;
                }
                break;

            case "up":
                this.y -= this.SPEED;
                if (this.y - this.radius < 0) {
                    this.y = this.radius;
                }
                break;

            case "down":
                this.y += this.SPEED;
                if (this.y + this.radius > 600) {
                    this.y = 600 - this.radius;
                }
                break;
        }
    }
}

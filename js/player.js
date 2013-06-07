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

    this.move = function(direction, imageData) {

        if (!this._isStillInCanvas(direction) || this._hasWallInTrajectory(direction, imageData)) {
            return;
        }

        switch (direction) {
            case "left":
                this.x -= this.SPEED;
                return;

            case "right":
                this.x += this.SPEED;
                return;

            case "up":
                this.y -= this.SPEED;
                return;

            case "down":
                this.y += this.SPEED;
                return;

        }
    }

    this._isStillInCanvas = function(direction) {
        switch (direction) {
            case "left":
                return this.x - this.SPEED > this.radius;

            case "right":
                return this.x + this.radius + this.SPEED < 800;

            case "up":
                return this.y - this.radius > 0;

            case "down":
                return this.y + this.SPEED + this.radius < 600;
        }
    }

    this._hasWallInTrajectory = function(direction, imageData) {
        switch(direction) {
            case "right":
                var xMin = this.x + this.radius;
                var xMax = xMin + this.SPEED;
                var yMin = this.y - this.radius;
                var yMax = this.y + this.radius;
                break;

            case "left":
                var xMax = this.x - this.radius;
                var xMin = xMax - this.SPEED;
                var yMin = this.y - this.radius;
                var yMax = this.y + this.radius;
                break;

            case "up":
                var yMax = this.y - this.radius;
                var yMin = yMax - this.SPEED;
                var xMin = this.x - this.radius;
                var xMax = this.x + this.radius;
                break;

            case "down":
                var yMin = this.y + this.radius;
                var yMax = yMin + this.SPEED;
                var xMin = this.x - this.radius;
                var xMax = this.x + this.radius;
                break;
        }

        return this._hasWall(imageData, xMin, xMax, yMin, yMax);
    }

    this._hasWall = function(imageData, xMin, xMax, yMin, yMax) {
        for (var y = yMin ; y < yMax ; y++) {
            for (var x = xMin ; x < xMax ; x++) {
                var index = 4 * (y * 800 + x);
                if (imageData[index] == 0) {
                    return true;
                }
            }
        }
    }
}

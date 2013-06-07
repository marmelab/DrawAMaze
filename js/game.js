var VirtualMaze = VirtualMaze || {};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

VirtualMaze.Game = function() {

    this.canvas = document.getElementById("canvas");
    this.context = canvas.getContext("2d");

    this.originalContext = document.getElementById("original_snapshot").getContext("2d");

    this.maze = null;
    this.player = null;

    this.snapButton = null;
    this.parametersHandlersSet = false;

    this.webcamStream = new VirtualMaze.WebcamStream();

    this.snapLevel = function() {
        document.getElementById("snapStep").style.display = "block";
        document.getElementById("gameStep").style.display = "none";

        this.addSnapButtonHandler();

        this.webcamStream.start();
    }

    this.play = function() {

        var me = this;

        document.getElementById("new_maze").addEventListener("click", function(e) {
            me.snapLevel();
        }, true);

        document.getElementById("snapStep").style.display = "none";
        document.getElementById("gameStep").style.display = "block";

        me.maze = new VirtualMaze.Maze();
        me.maze.buildWalls();

        me.player = new VirtualMaze.Player(200, 200, 50);

        this.addParametersHandlers();
        this.draw();
    }

    this.draw = function() {
        this.maze.draw(this.context);
        this.player.draw(this.context);

        var me = this;
        requestAnimFrame(function() {
            me.draw();
        });
    }

    this.addSnapButtonHandler = function() {
        if (null !== this.snapButton) {
            return;
        }

        var me = this;

        this.snapButton = document.getElementById("snap_button");
        this.snapButton.addEventListener("click", function(e) {
            e.preventDefault();

            if (!me.webcamStream.cameraStream) {
                return;
            }

            me.webcamStream.takeSnapshot(me.originalContext, document.getElementById("wall_canvas").getContext("2d"));

            me.play();
        });
    }

    this.addParametersHandlers = function() {
        if (this.parametersHandlersSet) {
            return;
        }

        var me = this;
        document.getElementById("wall_threshold").addEventListener("change", function(e) {
            if (me.maze) {
                me.maze.updateWallThreshold(this.value, me.originalContext);
                document.getElementById("wall_threshold_value").innerText = this.value;
            }
        }, true);

        document.getElementById("player_radius").addEventListener("change", function(e) {
            if (me.player) {
                me.player.radius = this.value;
                me.player.draw();
                document.getElementById("player_radius_value").innerText = this.value;
            }
        }, true);

        this.parametersHandlersSet = true;
    }

    this.snapLevel();

}

var Maze = function(context) {

    this.WALL_THRESHOLD = 100;

    this.context = context;

    /**
     * @see http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
     */
    this._convertToGray = function() {
        var imageData = this.context.getImageData(0, 0, 800, 600);

        var pixels = imageData.data;
        for (var i = 0, c = pixels.length ; i < c ; i += 4) {
            var r = pixels[i];
            var g = pixels[i + 1];
            var b = pixels[i + 2];

            var luma = 0.299 * r + 0.587 * g + 0.114 * b;

            imageData.data[i] = luma;
            imageData.data[i + 1] = luma;
            imageData.data[i + 2] = luma;
        }

        this.context.putImageData(imageData, 0, 0);

        return imageData;
    }

    this.buildWalls = function() {
        var imageData = this._convertToGray();

        var pixels = imageData.data;
        for (var i = 0, c = pixels.length ; i < c ; i += 4) {
            if (pixels[i] > this.WALL_THRESHOLD) {
                // Empty space
                pixels[i] = 255;
                pixels[i + 1] = 255;
                pixels[i + 2] = 255;
            } else {
                // Wall
                pixels[i] = 0;
                pixels[i + 1] = 0;
                pixels[i + 2] = 0;
            }
        }

        this.context.putImageData(imageData, 0, 0);

        return imageData;
    }

    this.updateWallThreshold = function(newThreshold) {
        this.WALL_THRESHOLD = newThreshold;
        this.context.putImageData(VirtualMaze.originalSnapshotContext.getImageData(0, 0, 800, 600), 0, 0);
        this.buildWalls();
    }

};

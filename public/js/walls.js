/*
var Walls = function() {
    this.resetWalls();
};

Walls.prototype.addWall = function(wall) {
    console.log("ADD WALL!");
    console.log(wall);

    if (wall.endPoint.x < wall.startPoint.x
        || wall.endPoint.y < wall.startPoint.y
    ) {
        console.log("CHANGE!");
        var tmp = wall.getStartPoint();
        wall.setStartPoint(wall.getEndPoint());
        wall.setEndPoint(tmp);
    }

    console.log(wall);
    this.walls.push(wall);
};

Walls.prototype.removeWall = function(wall) {
    //var index = this.walls.indexOf(wall);
    //this.walls.splice(index, 1);

    this.each(function(currentWall, index) {
        if (currentWall.getUniqueId() == wall.getUniqueId) {
            this.walls.slice(index, 1);
        }
    })
};

Walls.prototype.removeDeviceByElement = function(element) {
    //console.log("REMOVE");
    //console.log(element);
    this.each(function(wall) {
        wall.removeDeviceByElement(element);
    });
};

Walls.prototype.resetWalls = function() {
    this.walls = [];
};

Walls.prototype.each = function(callback) {
    for (var i = 0; i < this.walls.length; i++) {
        callback(this.walls[i], i, this.walls);
    }
};

Walls.prototype.removeLastWall = function() {
    return this.walls.pop();
};

Object.defineProperty(
    Walls.prototype, 'length', {
        get: function() {
            return this.walls.length;
        }
    }
);
*/

function Walls() {

    this.walls = [];
    this.searchResult = undefined;

    this.addWall = function(wall) {
        if (wall.endPoint.x < wall.startPoint.x
            || wall.endPoint.y < wall.startPoint.y
        ) {
            var tmp = wall.getStartPoint();
            wall.setStartPoint(wall.getEndPoint());
            wall.setEndPoint(tmp);
        }
        this.walls.push(wall);
        return this;
    };

    this.removeWall = function(wall) {
        var self = this;
        this.each(function(currentWall, index) {
            if (currentWall.getUniqueId() == wall.getUniqueId()) {
                self.walls.splice(index, 1);
            }
        });
        return this;
    };

    this.removeDeviceByElement = function(element) {
        this.each(function(wall) {
            wall.removeDeviceByElement(element);
        });
        return this;
    };

    this.resetWalls = function() {
        this.walls = [];
    };

    this.each = function(callback) {
        for (var i = 0; i < this.walls.length; i++) {
            this.searchResult = callback(this.walls[i], i, this.walls);
            if (undefined !== this.searchResult) {
                return false;
            }
        }
        return this;
    };

    this.searchWall = function(wall) {
        return this.walls.indexOf(wall);
    };

    this.removeLastWall = function() {
        return this.walls.pop();
    };

    this.length = function() {
        return this.walls.length;
    };
}
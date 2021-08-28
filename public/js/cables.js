var Cables = function() {
    this.resetCables();
};

Cables.prototype.addCable = function(cable) {
    if (cable.getEndPoint().getX() < cable.getStartPoint().getX()
        || cable.getEndPoint().getY() < cable.getStartPoint().getY()
    ) {
        var tmp = cable.getStartPoint();
        cable.setStartPoint(cable.getEndPoint());
        cable.setEndPoint(tmp);
    }
    this.cables.push(cable);
};

Cables.prototype.removeCable = function(cable) {
    var index = this.cables.indexOf(cable);
    this.cables.splice(index, 1);
};

Cables.prototype.removeCableByElement = function(element) {
    this.each(function(cable) {
        cable.removeCableByElement(element);
    });
};

Cables.prototype.resetCables = function() {
    this.cables = [];
};

Cables.prototype.each = function(callback) {
    for (var i = 0; i < this.cables.length; i++) {
        callback(this.cables[i], i, this.cables);
    }
};

Cables.prototype.removeLastCable = function() {
    return this.cables.pop();
};

Object.defineProperty(
    Cables.prototype, 'length', {
        get: function() {
            return this.cables.length;
        }
    }
);
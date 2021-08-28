function Point(x, y, z, parent) {
    this.setX(x)
        .setY(y)
        .setZ(z)
        .setParent(parent)
        .setUniqueId(uuidv4());
}

Point.prototype.setUniqueId = function(uniqueId) {
    this.uniqueId = uniqueId;
    return this;
};

Point.prototype.getUniqueId = function() {
    return this.uniqueId;
};

Point.prototype.setX = function(x) {
    this.x = x;
    return this;
};

Point.prototype.getX = function() {
    return this.x;
};

Point.prototype.setY = function(y) {
    this.y = y;
    return this;
};

Point.prototype.getY = function() {
    return this.y
};

Point.prototype.setZ = function(z) {
    this.z = z;
    return this;
};

Point.prototype.getZ = function() {
    return this.z
};

Point.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
};

Point.prototype.getParent = function() {
    return this.parent;
};

function Connector(lineStartPoint, lineEndPoint, zoneStart, zoneSize, parent) {
    var uniqueId = uuidv4();

    if (null === lineStartPoint.getParent()
        || undefined === lineStartPoint.getParent()
    ) {
        lineStartPoint.setParent(this);
    }

    if (null === lineEndPoint.getParent()
        || undefined === lineEndPoint.getParent()
    ) {
        lineEndPoint.setParent(this);
    }

    if (null === zoneStart.getParent()
        || undefined === zoneStart.getParent()
    ) {
        zoneStart.setParent(this);
    }

    this.setLineStart(lineStartPoint)
        .setLineEnd(lineEndPoint)
        .setZoneStart(zoneStart)
        .setZoneSize(zoneSize)
        .setUniqueId(uniqueId)
        .setParent(parent)
        .resetCables();
}

Connector.prototype.addCable = function(cable) {
    this.cables.addCable(cable);
};

Connector.prototype.removeCable = function(cable) {
    this.cables.removeCable(cable);
};

Connector.prototype.removeCableByElement = function(element) {
    this.devices.removeCableByElement(element);
};

Connector.prototype.setLineStart = function(lineStart) {
    this.lineStart = lineStart;
    return this;
};

Connector.prototype.getLineStart = function() {
    return this.lineStart;
};

Connector.prototype.setLineEnd = function(lineEnd) {
    this.lineEnd = lineEnd;
    return this;
};

Connector.prototype.getLineEnd = function() {
    return this.lineEnd;
};

Connector.prototype.setZoneStart = function(zoneStart) {
    this.zoneStart = zoneStart;
    return this;
};

Connector.prototype.getZoneStart = function() {
    return this.zoneStart;
};

Connector.prototype.setZoneSize = function(zoneSize) {
    this.zoneSize = zoneSize;
    return this;
};

Connector.prototype.getZoneSize = function() {
    return this.zoneSize;
};

Connector.prototype.searchCable = function(cable) {
    return this.devices.searchCable(cable);
};

Connector.prototype.resetCables = function() {
    this.cables = new Cables();
};

Connector.prototype.setUniqueId = function(uniqueId) {
    this.uniqueId = uniqueId;
    return this;
};

Connector.prototype.getUniqueId = function() {
    return this.uniqueId;
};

Connector.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
};

Connector.prototype.getParent = function() {
    return this.parent;
};

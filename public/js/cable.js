function Cable(startConnector, endConnector) {
    Line.call(this, startConnector, endConnector);
    var uniqueId = uuidv4();
    this.setUniqueId(uniqueId)
        .setStartConnector(startConnector)
        .setEndConnector(endConnector);
}

Cable.prototype = Object.create(Line.prototype);

Cable.prototype.setUniqueId = function(uniqueId) {
    this.uniqueId = uniqueId;
    return this;
};

Cable.prototype.getUniqueId = function() {
    return this.uniqueId;
};

Cable.prototype.setStartConnector = function(startConnector) {
    this.startConnector = startConnector;
    return this;
};

Cable.prototype.getStartConnector = function() {
    return this.startConnector;
};

Cable.prototype.setEndConnector = function(endConnector) {
    this.endConnector = endConnector;
    return this;
};

Cable.prototype.getEndConnector = function() {
    return this.endConnector;
};

Cable.prototype.constructor = Cable;

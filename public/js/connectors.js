var Connectors = function() {
    this.connectors = [];
};

Connectors.prototype.addConnector = function(connector) {
    this.connectors.push(connector);
};

Connectors.prototype.each = function(callback) {
    for (var i = 0; i < this.connectors.length; i++) {
        callback(this.connectors[i], i, this.connectors);
    }
};

Connectors.prototype.removeConnector = function(connector) {
    this.connectors.splice(this.searchConnector(connector), 1);
};

Connectors.prototype.removeConnectorByElement = function(element) {
    var connectors = this.connectors;
    jQuery.each(connectors, function(key, connector) {
        if (undefined !== connector
            && element == connector.element
        ) {
            connectors.splice(key, 1);
        }
    });
};

Connectors.prototype.getConnector = function(index) {
    return this.connectors[index];
};

Connectors.prototype.searchConnector = function(connector) {
    return this.connectors.indexOf(connector);
};

Object.defineProperty(
    Connectors.prototype, 'length', {
        get: function() {
            return this.connectors.length;
        }
    }
);
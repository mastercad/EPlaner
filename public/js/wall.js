function Wall(startPoint, endPoint) {
    Line.call(this, startPoint, endPoint);
    this.setUniqueId(uuidv4())
        .resetDevices()
        .setOpenConnectors(new Connectors());
}

Wall.prototype = Object.create(Line.prototype);

Wall.prototype.addDevice = function(device) {
    this.devices.addDevice(device);
    return this;
};

Wall.prototype.removeDevice = function(device) {
    this.devices.removeDevice(device);
    return this;
};

Wall.prototype.removeDeviceByElement = function(element) {
    this.devices.removeDeviceByElement(element);
    return this;
};

Wall.prototype.searchDevice = function(device) {
    return this.devices.searchDevice(device);
};

Wall.prototype.resetDevices = function() {
    this.devices = new Devices();
    return this;
};

Wall.prototype.setUniqueId = function(uniqueId) {
    this.uniqueId = uniqueId;
    return this;
};

Wall.prototype.getUniqueId = function() {
    return this.uniqueId;
};

Wall.prototype.setOpenConnectors = function(openConnectors) {
    this.openConnectors = openConnectors;
    return this;
};

Wall.prototype.getOpenConnectors = function() {
    return this.openConnectors;
};

Wall.prototype.constructor = Wall;

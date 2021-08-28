var Device = function(position, element, parent) {
    var uniqueId = uuidv4();

    jQuery(element).data('unique-id', uniqueId);
    jQuery(element).attr('data-unique-id', uniqueId);

    if (null === position.getParent()
        || undefined === position.getParent()
    ) {
        position.setParent(this);
    }

    this.setPosition(position)
        .setParent(parent)
        .setWidth(jQuery(element).width())
        .setHeight(jQuery(element).height())
        .setCenter(this.calculateCenterPointForDevice())
        .setName(null)
        .setElement(element)
        .setType(null)
        .setUniqueId(uniqueId);

    var halfDeviceHeight = this.getHeight() / 2 + 5;
    var halfDeviceWidth = this.getWidth() / 2 + 5;
    var connectorSize = 5;

    var defaultConnectors = new Connectors();
    defaultConnectors.addConnector(
        new Connector(
            new Point(0, 0),
            new Point(0, -1 * halfDeviceHeight),
            new Point(0, -1 * halfDeviceHeight - connectorSize),
            connectorSize
        )
    );
    defaultConnectors.addConnector(
        new Connector(
            new Point(0, 0),
            new Point(0, halfDeviceHeight),
            new Point(0, halfDeviceHeight + connectorSize),
            connectorSize
        )
    );
    defaultConnectors.addConnector(
        new Connector(
            new Point(0, 0),
            new Point(-1 * halfDeviceWidth, 0),
            new Point(-1 * halfDeviceWidth - connectorSize, 0),
            connectorSize
        )
    );
    defaultConnectors.addConnector(
        new Connector(
            new Point(0, 0),
            new Point(halfDeviceWidth, 0),
            new Point(halfDeviceWidth + connectorSize, 0),
            connectorSize
        )
    );

    this.setDefaultConnectors(defaultConnectors)
        .generateConnectors();
    return this;
};

Device.prototype.setDefaultConnectors = function(defaultConnectors) {
    this.defaultConnectors = defaultConnectors;
    return this;
};

Device.prototype.getDefaultConnectors = function() {
    return this.defaultConnectors;
};

Device.prototype.setPosition = function(position) {
    this.position = position;
    return this;
};

Device.prototype.getPosition = function() {
    return this.position;
};

Device.prototype.setCenter = function(center) {
    this.center = center;
    return this;
};

Device.prototype.getCenter = function() {
    return this.center;
};

Device.prototype.setWidth = function(width) {
    this.width = width;
    return this;
};

Device.prototype.getWidth = function() {
    return this.width;
};

Device.prototype.setHeight = function(height) {
    this.height = height;
    return this;
};

Device.prototype.getHeight = function() {
    return this.height;
};

Device.prototype.setName = function(name) {
    this.name = name;
    return this;
};

Device.prototype.getName = function() {
    return this.name;
};

Device.prototype.setElement = function(element) {
    this.element = element;
    return this;
};

Device.prototype.getElement = function() {
    return this.element;
};

Device.prototype.setType = function(type) {
    this.type = type;
    return this;
};

Device.prototype.getType = function() {
    return this.type;
};

Device.prototype.setConnectors = function(connectors) {
    this.connectors = connectors;
    return this;
};

Device.prototype.getConnectors = function() {
    return this.connectors;
};

Device.prototype.setUniqueId = function(uniqueId) {
    this.uniqueId = uniqueId;
    return this;
};

Device.prototype.getUniqueId = function() {
    return this.uniqueId;
};

Device.prototype.setParent = function(parent) {
    this.parent = parent;
    return this;
};

Device.prototype.getParent = function() {
    return this.parent;
};

Device.prototype.refresh = function() {
    this.setCenter(this.calculateCenterPointForDevice());
    if (0 === this.getConnectors().length) {
        this.generateConnectors();
    }
    this.refreshConnectors();
    return this;
};

Device.prototype.refreshConnectors = function() {
    var self = this;
    this.getDefaultConnectors().each(function(defaultConnector, index) {
        self.getConnectors().getConnector(index).getLineStart().setX(self.getCenter().getX() + defaultConnector.getLineStart().getX());
        self.getConnectors().getConnector(index).getLineStart().setY(self.getCenter().getY() + defaultConnector.getLineStart().getY());
        self.getConnectors().getConnector(index).getLineEnd().setX(self.getCenter().getX() + defaultConnector.getLineEnd().getX());
        self.getConnectors().getConnector(index).getLineEnd().setY(self.getCenter().getY() + defaultConnector.getLineEnd().getY());
        self.getConnectors().getConnector(index).getZoneStart().setX(self.getCenter().getX() + defaultConnector.getZoneStart().getX());
        self.getConnectors().getConnector(index).getZoneStart().setY(self.getCenter().getY() + defaultConnector.getZoneStart().getY());
        self.getConnectors().getConnector(index).setZoneSize(defaultConnector.getZoneSize());
    });
    return this;
};

Device.prototype.generateConnectors = function() {
    var connectors = new Connectors();
    var self = this;
    this.getDefaultConnectors().each(function(connector) {
        connectors.addConnector(
            new Connector(
                new Point(0, 0),
                new Point(0, 0),
                new Point(0, 0),
                0,
                self
            )
        );
    });

    this.setConnectors(connectors);
    return this;
};

Device.prototype.calculateCenterPointForDevice = function() {
    return new Point(
        this.getPosition().getX() + (this.getWidth() / 2),
        this.getPosition().getY() + (this.getHeight() / 2)
    );
};

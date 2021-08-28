function Line(startPoint, endPoint) {
    this.setStartPoint(startPoint)
        .setEndPoint(endPoint);
}
Line.prototype.setStartPoint = function(startPoint) {
    this.startPoint = startPoint;
    return this;
};

Line.prototype.getStartPoint = function() {
    return this.startPoint;
};

Line.prototype.setEndPoint = function(endPoint) {
    this.endPoint = endPoint;
    return this;
};

Line.prototype.getEndPoint = function() {
    return this.endPoint;
};

Line.prototype.isAngular = function() {
    return !(this.getStartPoint().getX() != this.getEndPoint().getX()
    && this.getStartPoint().getY() != this.getEndPoint().getY());
};

Line.prototype.checkPointMatches = function(point) {
    var lineStartPoint = new Point(this.getStartPoint().getX(), this.getStartPoint().getY());
    var lineEndPoint = new Point(this.getEndPoint().getX(), this.getEndPoint().getY());
    var tmp = null;

    if (lineEndPoint.getX() < lineStartPoint.getX()) {
        tmp = lineStartPoint.getX();
        lineStartPoint.setX(lineEndPoint.getX());
        lineEndPoint.setX(tmp);
    }

    if (lineEndPoint.getY() < lineStartPoint.getY()) {
        tmp = lineStartPoint.getY();
        lineStartPoint.setY(lineEndPoint);
        lineEndPoint.setY(tmp);
    }

    return !(point.getX() < lineStartPoint.getX()
        || point.getX() > lineEndPoint.getX()
        || point.getY() < lineStartPoint.getY()
        || point.getY() > lineEndPoint.getY()
    );
};

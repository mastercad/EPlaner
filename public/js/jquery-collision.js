(function($) {
    function CollisionCoords(proto, containment) {
        if (!proto) {
            this.x1 = this.y1 = this.x2 = this.y2 = 0;
            this.proto = null;
        } else if ("offset" in proto) {
            var d = proto.data("jquery-collision-coordinates");
            if (d) {
                this.x1 = d.x1;
                this.y1 = d.y1;
                this.x2 = d.x2;
                this.y2 = d.y2;
            } else if (containment && containment.length && containment.length >= 4) {
                this.x1 = containment[0];
                this.y1 = containment[1];
                this.x2 = containment[2] + proto.outerWidth(true);
                this.y2 = containment[3] + proto.outerHeight(true);
            } else if (proto.parent().length <= 0) {
                this.x1 = parseInt(proto.css("left")) || 0;
                this.y1 = parseInt(proto.css("top")) || 0;
                this.x2 = parseInt(proto.css("width")) || 0;
                this.y2 = parseInt(proto.css("height")) || 0;
                this.x2 += this.x1;
                this.x2 += (parseInt(proto.css("margin-left")) || 0) + (parseInt(proto.css("border-left")) || 0) + (parseInt(proto.css("padding-left")) || 0) +
                (parseInt(proto.css("padding-right")) || 0) + (parseInt(proto.css("border-right")) || 0) + (parseInt(proto.css("margin-right")) || 0);
                this.y2 += this.y1;
                this.y2 += (parseInt(proto.css("margin-top")) || 0) + (parseInt(proto.css("border-top")) || 0) + (parseInt(proto.css("padding-top")) || 0) +
                (parseInt(proto.css("padding-bottom")) || 0) + (parseInt(proto.css("border-bottom")) || 0) + (parseInt(proto.css("margin-bottom")) || 0);
            } else {
                var o = proto.offset();
                this.x1 = o.left - (parseInt(proto.css("margin-left")) || 0);
                this.y1 = o.top - (parseInt(proto.css("margin-top")) || 0);
                this.x2 = this.x1 + proto.outerWidth(true);
                this.y2 = this.y1 + proto.outerHeight(true);
            }
            this.proto = proto;
        } else if ("x1" in proto) {
            this.x1 = proto.x1;
            this.y1 = proto.y1;
            this.x2 = proto.x2;
            this.y2 = proto.y2;
            this.proto = proto;
        }
        if ("dir" in proto) {
            this.dir = proto.dir;
        }
    }
    CollisionCoords.prototype.innerContainer = function() {
        var clone = new CollisionCoords(this);
        if (this.proto["css"]) {
            clone.x1 += parseInt(this.proto.css("margin-left")) || 0;
            clone.x1 += parseInt(this.proto.css("border-left")) || 0;
            clone.x1 += parseInt(this.proto.css("padding-left")) || 0;
            clone.x2 -= parseInt(this.proto.css("padding-right")) || 0;
            clone.x2 -= parseInt(this.proto.css("border-right")) || 0;
            clone.x2 -= parseInt(this.proto.css("margin-right")) || 0;
            clone.y1 += parseInt(this.proto.css("margin-top")) || 0;
            clone.y1 += parseInt(this.proto.css("border-top")) || 0;
            clone.y1 += parseInt(this.proto.css("padding-top")) || 0;
            clone.y2 -= parseInt(this.proto.css("padding-bottom")) || 0;
            clone.y2 -= parseInt(this.proto.css("border-bottom")) || 0;
            clone.y2 -= parseInt(this.proto.css("margin-bottom")) || 0;
        }
        return clone;
    };;;
    CollisionCoords.prototype.move = function(dx, dy) {
        this.x1 += dx;
        this.x2 += dx;
        this.y1 += dy;
        this.y2 += dy;
        return this;
    };
    CollisionCoords.prototype.update = function(obj) {
        if ("x1" in obj) this.x1 = obj["x1"];
        if ("x2" in obj) this.x1 = obj["x2"];
        if ("y1" in obj) this.x1 = obj["y1"];
        if ("y2" in obj) this.x1 = obj["y2"];
        if ("left" in obj) {
            var w = this.x2 - this.x1;
            this.x1 = obj["left"];
            this.x2 = this.x1 + w;
        }
        if ("top" in obj) {
            var h = this.y2 - this.y1;
            this.y1 = obj["top"];
            this.y2 = this.y1 + h;
        }
        if ("offset" in obj) {
            var o = obj.offset();
            this.update(o);
            this.x2 = this.x1 + obj.width();
            this.y2 = this.y1 + obj.height();
        }
        if ("dir" in obj) this.x1 = obj["dir"];
        return this;
    };
    CollisionCoords.prototype.width = function() {
        return (this.x2 - this.x1);
    };
    CollisionCoords.prototype.height = function() {
        return (this.y2 - this.y1);
    };
    CollisionCoords.prototype.centerx = function() {
        return (this.x1 + this.x2) / 2;
    };
    CollisionCoords.prototype.centery = function() {
        return (this.y1 + this.y2) / 2;
    };
    CollisionCoords.prototype.toString = function() {
        return (this.proto["get"] ? "#" + this.proto.get(0).id : "") + "[" + [this.x1, this.y1, this.x2, this.y2].join(",") + "]";
    };
    CollisionCoords.EPSILON = 0.001;
    CollisionCoords.prototype.containsPoint = function(x, y, inclusive) {
        if (!inclusive) inclusive = false;
        var epsilon = (inclusive ? -1 : +1) * CollisionCoords.EPSILON;
        if ((x > (this.x1 + epsilon) && x < (this.x2 - epsilon)) && (y > (this.y1 + epsilon) && y < (this.y2 - epsilon)))
            return true;
        else
            return false;
    };
    CollisionCoords.prototype.overlaps = function(other, inclusive) {
        var hit = this._overlaps(other, inclusive);
        if (hit.length > 0) return hit;
        hit = other._overlaps(this, inclusive);
        if (hit.length > 0) {
            hit[0].dir = hit[0].dir == "Inside" ? "Outside" : hit[0].dir == "Outside" ? "Inside" : hit[0].dir == "N" ? "S" : hit[0].dir == "S" ? "N" : hit[0].dir == "W" ? "E" : hit[0].dir == "E" ? "W" : hit[0].dir == "NE" ? "SW" : hit[0].dir == "SW" ? "NE" : hit[0].dir == "SE" ? "NW" : hit[0].dir == "NW" ? "SE" : undefined;
        }
        return hit || [];
    };;;
    CollisionCoords.prototype._overlaps = function(other, inclusive) {
        var c1 = other;
        var c2 = this;
        if (!inclusive) inclusive = false;
        var ax = c1.centerx();
        var ay = c1.centery();
        var points = [
            [c1.x1, c1.y1, "SE"],
            [c1.x2, c1.y1, "SW"],
            [c1.x2, c1.y2, "NW"],
            [c1.x1, c1.y2, "NE"],
            [ax, c1.y1, "S"],
            [c1.x2, ay, "W"],
            [ax, c1.y2, "N"],
            [c1.x1, ay, "E"],
            [ax, ay, undefined]
        ];
        var hit = null;
        var dirs = {
            NW: false,
            N: false,
            NE: false,
            E: false,
            SE: false,
            S: false,
            SW: false,
            W: false
        };
        for (var i = 0; i < points.length; i++) {
            if (this.containsPoint(points[i][0], points[i][1], inclusive)) {
                if (points[i][2]) dirs[points[i][2]] = true;
                if (hit) continue;
                hit = [new CollisionCoords({
                    x1: Math.max(c1.x1, c2.x1),
                    y1: Math.max(c1.y1, c2.y1),
                    x2: Math.min(c1.x2, c2.x2),
                    y2: Math.min(c1.y2, c2.y2),
                    dir: points[i][2]
                })];
            }
        }
        if (hit) {
            if (dirs["NW"] && dirs["NE"]) hit[0].dir = "N";
            if (dirs["NE"] && dirs["SE"]) hit[0].dir = "E";
            if (dirs["SE"] && dirs["SW"]) hit[0].dir = "S";
            if (dirs["SW"] && dirs["NW"]) hit[0].dir = "W";
            if (dirs["NW"] && dirs["NE"] && dirs["SE"] && dirs["SW"]) hit[0].dir = "Outside";
            if (!dirs["NW"] && !dirs["NE"] && !dirs["SE"] && !dirs["SW"] && !dirs["N"] && !dirs["E"] && !dirs["S"] && !dirs["W"]) hit[0].dir = "Inside";
        }
        return hit || [];
    };
    CollisionCoords.prototype._protrusion = function(area, dir, list) {
        var o = this.overlaps(new CollisionCoords(area), false);
        if (o.length <= 0) return list;
        o[0].dir = dir;
        list.push(o[0]);
        return list;
    };
    CollisionCoords.prototype.protrusions = function(container) {
        var list = [];
        var n = Number.NEGATIVE_INFINITY;
        var p = Number.POSITIVE_INFINITY;
        var l = container.x1;
        var r = container.x2;
        var t = container.y1;
        var b = container.y2;
        list = this._protrusion({
            x1: l,
            y1: n,
            x2: r,
            y2: t
        }, "N", list);
        list = this._protrusion({
            x1: r,
            y1: n,
            x2: p,
            y2: t
        }, "NE", list);
        list = this._protrusion({
            x1: r,
            y1: t,
            x2: p,
            y2: b
        }, "E", list);
        list = this._protrusion({
            x1: r,
            y1: b,
            x2: p,
            y2: p
        }, "SE", list);
        list = this._protrusion({
            x1: l,
            y1: b,
            x2: r,
            y2: p
        }, "S", list);
        list = this._protrusion({
            x1: n,
            y1: b,
            x2: l,
            y2: p
        }, "SW", list);
        list = this._protrusion({
            x1: n,
            y1: t,
            x2: l,
            y2: b
        }, "W", list);
        list = this._protrusion({
            x1: n,
            y1: n,
            x2: l,
            y2: t
        }, "NW", list);
        return list;
    };

    function Collision(targetNode, obstacleNode, overlapCoords, overlapType) {
        this.target = targetNode;
        this.obstacle = obstacleNode;
        this.overlap = overlapCoords;
        this.overlapType = overlapType;
    }
    Collision.prototype.distance = function(other) {
        var tc = c.target;
        var oc = c.overlap;
        return Math.sqrt((tc.centerx() - oc.centerx()) * (tc.centerx() - oc.centerx()) +
        (tc.centery() - oc.centery()) * (tc.centery() - oc.centery()));
    };;;

    function CollisionFactory(targets, obstacles, containment) {
        this.targets = targets;
        this.obstacles = obstacles;
        this.collisions = null;
        this.cache = null;
        if (containment) this.containment = containment;
        else this.containment = null;
    }
    CollisionFactory.prototype.getCollisions = function(overlapType) {
        if (this.collisions !== null) return this.collisions;
        this.cache = {};
        this.collisions = [];
        if (!overlapType) overlapType = "collision";
        if (overlapType != "collision" && overlapType != "protrusion") return [];
        var c = [];
        var t = this.targets;
        var o = this.obstacles;
        for (var ti = 0; ti < t.length; ti++) {
            var tc = t[ti];
            for (var oi = 0; oi < o.length; oi++) {
                var oc = o[oi];
                var ol = ((overlapType == "collision") ? tc.overlaps(oc) : tc.protrusions(oc.innerContainer()));
                for (var oli = 0; oli < ol.length; oli++) {
                    c.push(new Collision(t[ti], o[oi], ol[oli], overlapType));
                }
            }
        }
        this.collisions = c;
        return c;
    };

    function makeCoordsArray(j) {
        return $(j).get().map(function(e, i, a) {
            return new CollisionCoords($(e));
        });
    }

    function combineQueries(array) {
        var j = $();
        for (var i = 0; i < array.length; i++) {
            j = j.add(array[i]);
        }
        return j;
    }
    $.fn.collision = function(selector, options) {
        if (!options) options = {};
        var mode = "collision";
        var as = null;
        var cd = null;
        var od = null;
        var dd = null;
        var rel = "body";
        if (options.mode == "protrusion") mode = options.mode;
        if (options.as) as = options.as;
        if (options.colliderData) cd = options.colliderData;
        if (options.obstacleData) od = options.obstacleData;
        if (options.directionData) dd = options.directionData;
        if (options.relative) rel = options.relative;
        var cf = new CollisionFactory(makeCoordsArray(this), makeCoordsArray(selector));
        var ov = cf.getCollisions(mode);
        var array;
        if (!as) array = $.map(ov, function(e, i, a) {
            return e.obstacle.proto;
        });
        else array = $.map(ov, function(e, i, a) {
            var xoff = e.overlap.x1;
            var yoff = e.overlap.y1;
            if (rel && rel != "body") {
                var r = rel == "collider" ? $(e.target.proto) : rel == "obstacle" ? $(e.obstacle.proto) : $(rel);
                if (r.length > 0) {
                    var roff = r.offset();
                    xoff -= roff.left;
                    yoff -= roff.top;
                }
            }
            var c = $(as).offset({
                left: xoff,
                top: yoff
            }).width(e.overlap.width()).height(e.overlap.height());
            if (cd) c.data(cd, $(e.target.proto));
            if (od) c.data(od, $(e.obstacle.proto));
            if (dd && e.overlap.dir) c.data(dd, e.overlap.dir);
            return c;
        });
        return combineQueries(array);
    };
})(jQuery);


// jquery-ui-draggable-collision.min.js 1.0.2
(function(e) {
    function r(e, t, n, r, i) {
        jQuery.Event.call(this, e);
        this.collider = t;
        this.obstacle = n;
        this.collisionType = r;
        this.collision = i
    }

    function i(e, t, n, r) {
        jQuery.Event.call(this, e);
        this.collider = t;
        this.obstacle = n;
        this.collisionType = r
    }

    function s(e, t, n, r) {
        this.x1 = e;
        this.y1 = t;
        this.x2 = n;
        this.y2 = r
    }

    function o(e) {
        if (e.length <= 0) return null;
        var t = 0;
        var n = 0;
        var r = 0;
        for (var i = 0; i < e.length; i++) {
            r += e[i].area();
            t += e[i].centerx() * e[i].area();
            n += e[i].centery() * e[i].area()
        }
        var o = Math.sqrt(r);
        return new s(t / r - o / 2, n / r - o / 2, t / r + o / 2, n / r + o / 2)
    }

    function u(e, t, n) {
        if (!t) t = 0;
        if (!n) n = 0;
        if (e.parent().length > 0) {
            var r = t + e.offset().left - (parseInt(e.css("margin-left")) || 0);
            var i = n + e.offset().top - (parseInt(e.css("margin-top")) || 0);
            var o = r + e.outerWidth(true);
            var u = i + e.outerHeight(true)
        } else {
            var r = t + parseInt(e.css("left")) || 0;
            var i = n + parseInt(e.css("top")) || 0;
            var o = r + parseInt(e.css("width")) || 0;
            var u = i + parseInt(e.css("height")) || 0;
            o += (parseInt(e.css("margin-left")) || 0) + (parseInt(e.css("border-left")) || 0) + (parseInt(e.css("padding-left")) || 0) + (parseInt(e.css("padding-right")) || 0) + (parseInt(e.css("border-right")) || 0) + (parseInt(e.css("margin-right")) || 0);
            u += (parseInt(e.css("margin-top")) || 0) + (parseInt(e.css("border-top")) || 0) + (parseInt(e.css("padding-top")) || 0) + (parseInt(e.css("padding-bottom")) || 0) + (parseInt(e.css("border-bottom")) || 0) + (parseInt(e.css("margin-bottom")) || 0)
        }
        return new s(r, i, o, u)
    }

    function a(t, n, r) {
        return o(t.toArray().map(function(t, i, s) {
            return u(e(t), n, r)
        }))
    }

    function f(t, n, r, i, s, o, f, l, c, h) {
        if (!l) l = a(e(this.collider), s, o);
        if (!s) s = 0;
        if (!o) o = 0;
        this.collision = e(t);
        this.collider = e(t.data(n));
        this.obstacle = e(t.data(r));
        this.direction = t.data(f);
        this.type = i;
        this.dx = s;
        this.dy = o;
        this.centerOfMass = l;
        this.collisionCoords = u(this.collision);
        this.colliderCoords = u(this.collider, s, o);
        this.obstacleCoords = u(this.obstacle);
        if (!c) c = this.colliderCoords.centerx();
        if (!h) c = this.colliderCoords.centery();
        this.mousex = c;
        this.mousey = h
    }

    function l(e, t) {
        var n = e.distance();
        var r = t.distance();
        return n < r ? -1 : n > r ? +1 : 0
    }

    function c(t, n) {
        this.draggable = e(t);
        this.obstacleSelector = n.obstacle || ".ui-draggable-collision-obstacle";
        this.restraintSelector = n.restraint || ".ui-draggable-collision-restraint";
        this.obstacle = e(n.obstacle || ".ui-draggable-collision-obstacle");
        this.restraint = e(n.restraint || ".ui-draggable-collision-restraint");
        var r = n.collider || ".ui-draggable-dragging";
        this.collider = t.find(r).andSelf().filter(r);
        this.colliderData = n.colliderData || null;
        this.obstacleData = n.obstacleData || null;
        this.directionData = n.directionData || null;
        this.relative = n.relative || "body";
        this.preventCollision = n.preventCollision || false;
        this.preventProtrusion = n.preventProtrusion || false;
        this.collisions = e();
        this.protrusions = e()
    }

    function h(t, n, r, i, s) {
        e.ui.plugin.call(n, r, i, s);
        t.trigger(i, s)
    }

    function p(t, n, r) {
        var asdasd = e(this).data("draggable");
        var s = asdasd.options
    }

    function d(t, n, r, i, s, o) {
        var u = e(t).clone();
        u.children().remove();
        u.css("background", "transparent").css("pointer-events", "none").css("border", "1px solid " + o).css("margin", "0px").css("padding", "0px").addClass("testdebug").css("position", "absolute").css("background-color", "transparent").appendTo("body");
        u.width(i - 2);
        u.height(s - 2);
        u.offset({
            left: n,
            top: r
        });
        return u
    }

    function v(t, n) {
        return d(t, e(t).css("left"), e(t).css("top"), e(t).outerWidth(), e(t).outerHeight(), n)
    }

    function m(t, n, r, i) {
        return d(t, r[0], r[1], r[2] - r[0] + e(n).width(), r[3] - r[1] + e(n).height(), i)
    }

    function g(t, r) {
        n = e(this).data("draggable").options.collisionVisualDebug;
        e(this).data("jquery-ui-draggable-collision-recent-position", r.originalPosition)
    }

    function y(r, i) {
        e(this).removeData("jquery-ui-draggable-collision-recent-position");
        if (n) e(".testdebug").remove();
        n = t
    }

    function b(s, o) {
        var l = e(this).data("jquery-ui-draggable-collision-recent-position");
        if (t) {
            console.log("handleCollision ******************************************************************")
        }
        if (n) e(".testdebug").remove();
        var p = "collision";
        var g = "precollision";
        var y = "postcollision";
        var b = "protrusion";
        var E = "preprotrusion";
        var S = "postprotrusion";
        var x = e(this).data("draggable");
        var T = x.options;
        var N = [];
        if (T.obstacle || T.restraint) N.push(new c(e(this), T));
        if (T.multipleCollisionInteractions && T.multipleCollisionInteractions["length"]) {
            var C = T.multipleCollisionInteractions;
            for (var k = 0; k < C.length; k++) N.push(new c(e(this), C[k]))
        }
        if (N.length <= 0) {
            e(this).data("jquery-ui-draggable-collision-recent-position", o.position);
            return
        }
        var L = "ui-draggable-collision-collider-temp";
        var A = "ui-draggable-collision-obstacle-temp";
        var O = "ui-draggable-collision-direction-temp";
        var M = "ui-draggable-collision-interaction-temp";
        var _ = s.data;
        var D = "<div />";
        if (_ && _.as) D = _.as;
        var P;
        var H = 1;
        for (var k = 0; k < N.length; k++) {
            H += 2 * N[k].collider.length * (N[k].obstacle.length + N[k].restraint.length);
            if (n) {
                N[k].obstacle.each(function() {
                    d(e(this), e(this).offset().left, e(this).offset().top, e(this).innerWidth(), e(this).innerHeight(), "black")
                });
                N[k].restraint.each(function() {
                    d(e(this), e(this).offset().left, e(this).offset().top, e(this).innerWidth(), e(this).innerHeight(), "magenta")
                })
            }
            if (N[k].obstacleSelector) {
                P = new i(g, e(this), N[k].obstacle, p);
                h(N[k].collider, x, g, P, o)
            }
            if (N[k].restraintSelector) {
                P = new i(E, e(this), N[k].restraint, b);
                h(N[k].collider, x, E, P, o)
            }
        }
        var B = l.left;
        var j = l.top;
        var F = o.position.left - l.left;
        var I = o.position.top - l.top;
        var q;
        var R;
        var U = [];
        var z = [];
        var W = [];
        var X = [];
        var V = e();
        if (x.containment) {
            H += 2;
            var J = x.containment.concat();
            if (x.relative_container) {
                J[0] += e(x.relative_container).offset().left;
                J[1] += e(x.relative_container).offset().top;
                J[2] += e(x.relative_container).offset().left;
                J[3] += e(x.relative_container).offset().top
            }
            V = e("<div />").offset({
                left: J[0],
                top: J[1]
            }).width(J[2] - J[0] + e(this).width()).height(J[3] - J[1] + e(this).height());
            if (n) {
                m(V, this, J, "blue")
            }
        }
        var K = {};
        var Q = 0;
        while (Q < H) {
            Q++;
            q = o.position.left - l.left;
            R = o.position.top - l.top;
            U = [];
            z = [];
            W = [];
            for (var k = 0; k < N.length; k++) {
                N[k].collisions = e();
                N[k].protrusions = e();
                var G = N[k].collider;
                var Y = N[k].obstacle;
                var Z = N[k].restraint;
                if (t) console.log("trying inter,c,o,r=", N[k], G, Y, Z);
                G.each(function() {
                    e(this).data("jquery-collision-coordinates", u(e(this), q, R))
                });
                var et = a(G);
                for (var tt = 0; tt < G.length; tt++) {
                    var nt = e(G[tt]).collision(Y, {
                        mode: "collision",
                        as: "<div />",
                        colliderData: L,
                        obstacleData: A,
                        directionData: O,
                        relative: "body"
                    });
                    if (t) {
                        console.log("collisions", nt)
                    }
                    nt.data(M, N[k]);
                    N[k].collisions = N[k].collisions.add(nt);
                    if (nt.length > 0) {
                        z = nt.toArray().map(function(t, n, r) {
                            return new f(e(t), L, A, "collision", q, R, O, et, s.pageX, s.pageY)
                        });
                        U = U.concat(z);
                        if (n) e("<span>c" + Q + "</span>").appendTo(v(e(nt), "black"))
                    }
                    nt = e(G[tt]).collision(Z, {
                        mode: "protrusion",
                        as: "<div />",
                        colliderData: L,
                        obstacleData: A,
                        directionData: O,
                        relative: "body"
                    });
                    if (t) {
                        console.log("protrusions", nt)
                    }
                    nt.data(M, N[k]);
                    N[k].protrusions = N[k].protrusions.add(nt);
                    if (nt.length > 0) {
                        W = nt.toArray().map(function(t, n, r) {
                            return new f(e(t), L, A, "protrusion", q, R, O, et, s.pageX, s.pageY)
                        });
                        U = U.concat(W);
                        if (n) e("<span>p" + Q + "</span>").appendTo(v(e(nt), "magenta"))
                    }
                }
                G.each(function() {
                    e(this).removeData("jquery-collision-coordinates")
                })
            }
            if (x.containment) {
                e(this).each(function() {
                    e(this).data("jquery-collision-coordinates", u(e(this), q, R))
                });
                var rt = e(this).collision(V, {
                    mode: "protrusion",
                    as: "<div />",
                    colliderData: L,
                    obstacleData: A,
                    directionData: O,
                    relative: "body"
                });
                X = rt.toArray().map(function(t, n, r) {
                    return new f(e(t), L, A, "protrusion", q, R, O, a(G), s.pageX, s.pageY)
                });
                if (n) e("<span>x" + Q + "</span>").appendTo(rt, "blue");
                e(this).each(function() {
                    e(this).removeData("jquery-collision-coordinates")
                })
            }
            if (t) console.log("checking if we have any collisions at all...");
            if (z.length <= 0 && W.length <= 0 && X.length <= 0) break;
            var it = true;
            for (var k = 0; k < N.length; k++) {
                if (t) console.log("checking adjustments for", N[k], "ccl=", X, "pc,cl,pp,pl=", N[k].preventCollision, N[k].collisions.length, N[k].preventProtrusion, N[k].protrusions.length);
                if (t) console.log("checking if we overstepped our containment...");
                if (!N[k].preventCollision && !N[k].preventProtrusion && X.length > 0) {
                    if (t) {
                        console.log("not trying to prevent anything, but jumped our containment", N[k])
                    }
                    it = false
                }
                if (t) console.log("checking if we want to block something we have collided with...");
                if (N[k].preventCollision && (N[k].collisions.length > 0 || X.length > 0) || N[k].preventProtrusion && (N[k].protrusions.length > 0 || X.length > 0)) {
                    if (t) {
                        console.log("trying to prevent something that we're still hitting", N[k])
                    }
                    it = false
                }
            }
            if (it) {
                if (t) {
                    console.log("done adjusting")
                }
                break
            }
            if (t) console.log("calculating delta with ocl,ccl=", U, X);
            var _ = w(U.concat(), X, K);
            if (t) console.log("dx=", _.dx, "dy=", _.dy);
            if (_.dx == 0 && _.dy == 0) break;
            o.position.left += _.dx;
            o.position.top += _.dy
        }
        q = o.position.left - l.left;
        R = o.position.top - l.top;
        if (Q > H || X.length > 0 || T.preventProtrusion && W.length > 0 || T.preventCollision && z.length > 0) {
            if (t) console.log("reverting, i=", Q, "maxiter=", H, "cocl=", z, "cocl.len=", z.length, "pocl=", W, "pocl.len=", W.length, "ccl=", X, "ccl.len=", X.length, "origdx=", F, "origdy=", I, "dx=", q, "dy=", R);
            o.position.left = B;
            o.position.top = j
        }
        for (var tt = 0; tt < U.length; tt++) {
            var nt = U[tt];
            for (var st = 0; st < nt.collision.length; st++) {
                var ot = e(nt.collision[st]);
                var ut = e(ot.data(L));
                var at = e(ot.data(A));
                var ft = ot.data(O);
                var lt = ot.data(M);
                ot.removeData(L).removeData(A).removeData(O).removeData(M);
                if (lt.colliderData) ot.data(lt.colliderData, ut);
                if (lt.obstacleData) ot.data(lt.obstacleData, at);
                if (ft && lt.directionData) ot.data(lt.directionData, ft);
                if (lt.relative && lt.relative != "body") {
                    var ct = ot.offset();
                    var ht = lt.relative == "collider" ? ut : lt.relative == "obstacle" ? at : e(lt.relative);
                    var pt = ht.offset();
                    ot.offset({
                        left: ct.left - pt.left,
                        top: ct.top - pt.top
                    })
                }
                if (lt.obstacleSelector && nt.type == "collision") {
                    P = new r(p, ut, at, p, ot);
                    h(ut, x, p, P, o)
                }
                if (lt.restraintSelector && nt.type == "protrusion") {
                    P = new r(b, ut, at, b, ot);
                    h(ut, x, b, P, o)
                }
            }
        }
        for (var k = 0; k < N.length; k++) {
            if (N[k].obstacleSelector) {
                P = new i(y, e(this), N[k].obstacle, p);
                h(N[k].collider, x, y, P, o)
            }
            if (N[k].restraintSelector) {
                P = new i(S, e(this), N[k].restraint, b);
                h(N[k].collider, x, S, P, o)
            }
        }
        e(this).data("jquery-ui-draggable-collision-recent-position", o.position)
    }

    function w(r, i, s) {
        var o = r.concat(i).sort(l);
        if (n) {
            if (!s.deltanum) {
                s.deltanum = 1
            }
        }
        if (t) {
            console.log("collisions, in order: ", o.map(function(e, t, n) {
                return e.collisionCoords.hash()
            }).join(","))
        }
        while (o.length > 0) {
            var u = o.pop();
            var a = u.obstacleCoords;
            var f = u.colliderCoords;
            var c = u.collisionCoords;
            var h = u.type;
            var p = u.direction;
            var d = u.hash();
            var v = u.type == "protrusion" ? f.centerx() > a.centerx() ? -1 : +1 : f.centerx() > a.centerx() ? +1 : -1;
            var m = u.type == "protrusion" ? f.centery() > a.centery() ? -1 : +1 : f.centery() > a.centery() ? +1 : -1;
            var g = u.embedx(v);
            var y = u.embedy(m);
            if (t) console.log("cv,cc,co,ct,dx,dy,thisc.dx,thisc.dy,dirx,diry,co.centerx,co.centery,cc.centerx,cc.centery,key=", c.hash(), f.hash(), a.hash(), h, g, y, u.dx, u.dy, v, m, a.centerx(), a.centery(), f.centerx(), f.centery(), d);
            var b = g < y;
            if (d in s && s[d] == "tried reverse") {
                if (t) console.log("but already tried reverse too...");
                continue
            } else if (d in s && s[d] == "tried normal") {
                if (t) console.log("but already tried this...");
                b = !b;
                s[d] = "tried reverse"
            } else {
                s[d] = "tried normal"
            }
            if (b) {
                if (n) {
                    e("<span>" + u.direction + "d" + s.deltanum + ".dx=" + g + "*" + v + "</span>").css("color", "black").addClass("testdebug").css("position", "absolute").css("white-space", "nowrap").offset({
                        left: u.mousex,
                        top: u.mousey + 20 * (s.deltanum - 1)
                    }).appendTo("body");
                    s.deltanum++
                }
                if (g <= 0) {
                    o.push(u);
                    continue
                }
                return {
                    dx: g * v,
                    dy: 0
                }
            } else {
                if (n) {
                    e("<span>" + u.direction + "d" + s.deltanum + ".dy=" + y + "*" + m + "</span>").css("color", "black").addClass("testdebug").css("position", "absolute").css("white-space", "nowrap").offset({
                        left: u.mousex,
                        top: u.mousey + 20 * (s.deltanum - 1)
                    }).appendTo("body");
                    s.deltanum++
                }
                if (y <= 0) {
                    o.push(u);
                    continue
                }
                return {
                    dx: 0,
                    dy: y * m
                }
            }
        }
        return {
            dx: 0,
            dy: 0
        }
    }
    var t = false;
    var n = t;
    e.ui.draggable.prototype.options.obstacle = ".ui-draggable-collision-obstacle";
    e.ui.draggable.prototype.options.restraint = ".ui-draggable-collision-restraint";
    e.ui.draggable.prototype.options.collider = ".ui-draggable-dragging";
    e.ui.draggable.prototype.options.colliderData = null;
    e.ui.draggable.prototype.options.obstacleData = null;
    e.ui.draggable.prototype.options.directionData = null;
    e.ui.draggable.prototype.options.relative = "body";
    e.ui.draggable.prototype.options.preventCollision = false;
    e.ui.draggable.prototype.options.preventProtrusion = false;
    e.ui.draggable.prototype.options.collisionVisualDebug = false;
    e.ui.draggable.prototype.options.multipleCollisionInteractions = [];
    e.ui.plugin.add("draggable", "obstacle", {
        create: function(e, t) {
            p.call(this, e, t)
        },
        start: function(e, t) {
            g.call(this, e, t)
        },
        drag: function(e, t) {
            return b.call(this, e, t)
        },
        stop: function(e, t) {
            b.call(this, e, t);
            y.call(this, e, t)
        }
    });
    e.ui.plugin.add("draggable", "restraint", {
        create: function(e, t) {
            p.call(this, e, t)
        },
        start: function(t, n) {
            if (!e(this).data("draggable").options.obstacle) {
                g.call(this, t, n)
            }
        },
        drag: function(t, n) {
            if (!e(this).data("draggable").options.obstacle) {
                return b.call(this, t, n)
            }
        },
        stop: function(t, n) {
            if (!e(this).data("draggable").options.obstacle) {
                b.call(this, t, n);
                y.call(this, t, n)
            }
        }
    });
    e.ui.plugin.add("draggable", "multipleCollisionInteractions", {
        create: function(e, t) {
            p.call(this, e, t)
        },
        start: function(t, n) {
            if (!e(this).data("draggable").options.obstacle && !e(this).data("draggable").options.restraint) {
                g.call(this, t, n)
            }
        },
        drag: function(t, n) {
            if (!e(this).data("draggable").options.obstacle && !e(this).data("draggable").options.restraint) {
                return b.call(this, t, n)
            }
        },
        stop: function(t, n) {
            if (!e(this).data("draggable").options.obstacle && !e(this).data("draggable").options.restraint) {
                b.call(this, t, n);
                y.call(this, t, n)
            }
        }
    });
    r.prototype = new e.Event("");
    i.prototype = new e.Event("");
    s.prototype.width = function() {
        return this.x2 - this.x1
    };
    s.prototype.height = function() {
        return this.y2 + this.y1
    };
    s.prototype.centerx = function() {
        return (this.x1 + this.x2) / 2
    };
    s.prototype.centery = function() {
        return (this.y1 + this.y2) / 2
    };
    s.prototype.area = function() {
        return this.width() * this.height()
    };
    s.prototype.hash = function() {
        return "[" + [this.x1, this.y1, this.x2, this.y2].join(",") + "]"
    };
    s.prototype.distance = function(e) {
        return this.distanceTo(e.centerx(), e.centery())
    };
    s.prototype.distanceTo = function(e, t) {
        var n = this.centerx() - e;
        var r = this.centerx() - t;
        return Math.sqrt(n * n + r * r)
    };
    f.prototype.embedx = function(e) {
        if (this.type == "collision") {
            if (e < 0) return this.colliderCoords.x2 - this.obstacleCoords.x1;
            if (e > 0) return this.obstacleCoords.x2 - this.colliderCoords.x1
        } else if (this.type == "protrusion") {
            if (this.direction == "N" || this.direction == "S") return 0;
            if (e < 0) return this.colliderCoords.x2 - this.obstacleCoords.x2;
            if (e > 0) return this.obstacleCoords.x1 - this.colliderCoords.x1
        }
        return 0
    };
    f.prototype.embedy = function(e) {
        if (this.type == "collision") {
            if (e < 0) return this.colliderCoords.y2 - this.obstacleCoords.y1;
            if (e > 0) return this.obstacleCoords.y2 - this.colliderCoords.y1
        } else if (this.type == "protrusion") {
            if (this.direction == "E" || this.direction == "W") return 0;
            if (e < 0) return this.colliderCoords.y2 - this.obstacleCoords.y2;
            if (e > 0) return this.obstacleCoords.y1 - this.colliderCoords.y1
        }
        return 0
    };
    f.prototype.distance = function() {
        var e = this.centerOfMass.centerx();
        var t = this.centerOfMass.centery();
        var n = this.collisionCoords.centerx();
        var r = this.collisionCoords.centery();
        return Math.sqrt((n - e) * (n - e) + (r - t) * (r - t))
    };
    f.prototype.hash = function() {
        return this.type + "[" + this.colliderCoords.hash() + "," + this.obstacleCoords.hash() + "]"
    };
})(jQuery);;;
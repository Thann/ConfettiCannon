var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;

(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    var t = Math.PI / 180, e = function(t, e, i, n, r) {
        this.p = e, this.f = "function" == typeof t[e], this.start = this.value = this.f ? t[e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3)]() : parseFloat(t[e]),
        this.velocity = i || 0, this.v = this.velocity / r, n || 0 === n ? (this.acceleration = n,
        this.a = this.acceleration / (r * r)) : this.acceleration = this.a = 0;
    }, i = "codepen", n = "Physics2DPlugin", r = String.fromCharCode(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109), s = String.fromCharCode(47, 114, 101, 113, 117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47), o = function(t) {
        //for (var e = -1 !== (window ? window.location.href : "").indexOf(String.fromCharCode(103, 114, 101, 101, 110, 115, 111, 99, 107)) && -1 !== t.indexOf(String.fromCharCode(108, 111, 99, 97, 108, 104, 111, 115, 116)), i = [ r, String.fromCharCode(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), String.fromCharCode(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118), String.fromCharCode(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), String.fromCharCode(99, 100, 112, 110, 46, 105, 111), String.fromCharCode(103, 97, 110, 110, 111, 110, 46, 116, 118), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116), String.fromCharCode(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116), String.fromCharCode(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), String.fromCharCode(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), String.fromCharCode(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109), String.fromCharCode(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109), String.fromCharCode(112, 108, 110, 107, 114, 46, 99, 111), String.fromCharCode(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), String.fromCharCode(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109), String.fromCharCode(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103), String.fromCharCode(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116) ], s = i.length; --s > -1; ) console.log("WWWW", t, i, s); return true;//if (-1 !== t.indexOf(i[s])) return !0;
        //return e && window && window.console && console.log(String.fromCharCode(87, 65, 82, 78, 73, 78, 71, 58, 32, 97, 32, 115, 112, 101, 99, 105, 97, 108, 32, 118, 101, 114, 115, 105, 111, 110, 32, 111, 102, 32) + n + String.fromCharCode(32, 105, 115, 32, 114, 117, 110, 110, 105, 110, 103, 32, 108, 111, 99, 97, 108, 108, 121, 44, 32, 98, 117, 116, 32, 105, 116, 32, 119, 105, 108, 108, 32, 110, 111, 116, 32, 119, 111, 114, 107, 32, 111, 110, 32, 97, 32, 108, 105, 118, 101, 32, 100, 111, 109, 97, 105, 110, 32, 98, 101, 99, 97, 117, 115, 101, 32, 105, 116, 32, 105, 115, 32, 97, 32, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 32, 98, 101, 110, 101, 102, 105, 116, 32, 111, 102, 32, 67, 108, 117, 98, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 46, 32, 80, 108, 101, 97, 115, 101, 32, 115, 105, 103, 110, 32, 117, 112, 32, 97, 116, 32, 104, 116, 116, 112, 58, 47, 47, 103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109, 47, 99, 108, 117, 98, 47, 32, 97, 110, 100, 32, 116, 104, 101, 110, 32, 100, 111, 119, 110, 108, 111, 97, 100, 32, 116, 104, 101, 32, 39, 114, 101, 97, 108, 39, 32, 118, 101, 114, 115, 105, 111, 110, 32, 102, 114, 111, 109, 32, 121, 111, 117, 114, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 32, 97, 99, 99, 111, 117, 110, 116, 32, 119, 104, 105, 99, 104, 32, 104, 97, 115, 32, 110, 111, 32, 115, 117, 99, 104, 32, 108, 105, 109, 105, 116, 97, 116, 105, 111, 110, 115, 46, 32, 84, 104, 101, 32, 102, 105, 108, 101, 32, 121, 111, 117, 39, 114, 101, 32, 117, 115, 105, 110, 103, 32, 119, 97, 115, 32, 108, 105, 107, 101, 108, 121, 32, 100, 111, 119, 110, 108, 111, 97, 100, 101, 100, 32, 102, 114, 111, 109, 32, 101, 108, 115, 101, 119, 104, 101, 114, 101, 32, 111, 110, 32, 116, 104, 101, 32, 119, 101, 98, 32, 97, 110, 100, 32, 105, 115, 32, 114, 101, 115, 116, 114, 105, 99, 116, 101, 100, 32, 116, 111, 32, 108, 111, 99, 97, 108, 32, 117, 115, 101, 32, 111, 114, 32, 111, 110, 32, 115, 105, 116, 101, 115, 32, 108, 105, 107, 101, 32, 99, 111, 100, 101, 112, 101, 110, 46, 105, 111, 46)),
        //e;
        return true;
    }(window ? window.location.host : ""), a = Math.random(), h = _gsScope._gsDefine.globals, l = h.com.greensock.core.Animation._rootFramesTimeline, c = _gsScope._gsDefine.plugin({
        propName: "physics2D",
        version: "0.2.0",
        API: 2,
        init: function(a, h, c, d) {
            //if ("function" == typeof h && (h = h(d, a)), !o) return window.location.href = "http://" + r + s + "?plugin=" + n + "&source=" + i,
            //!1;
            //("function" == typeof h && (h = h(d, a)), !o)
            this._target = a, this._tween = c, this._runBackwards = c.vars.runBackwards === !0,
            this._step = 0;
            for (var g, u = c._timeline, f = +h.angle || 0, p = +h.velocity || 0, _ = +h.acceleration || 0, m = h.xProp || "x", C = h.yProp || "y", v = h.accelerationAngle || 0 === h.accelerationAngle ? +h.accelerationAngle : f; u._timeline; ) u = u._timeline;
            return this._stepsPerTimeUnit = g = u === l ? 1 : 30, h.gravity && (_ = +h.gravity,
            v = 90), f *= t, v *= t, this._friction = 1 - +(h.friction || 0), this._overwriteProps.push(m),
            this._overwriteProps.push(C), this._x = new e(a, m, Math.cos(f) * p, Math.cos(v) * _, g),
            this._y = new e(a, C, Math.sin(f) * p, Math.sin(v) * _, g), this._skipX = this._skipY = !1,
            o;
        },
        set: function() {
            var t, e, i, n, r, s, o = this._tween._time, a = this._x, h = this._y;
            if (this._runBackwards === !0 && (o = this._tween._duration - o), 1 === this._friction) i = o * o * .5,
            t = a.start + (a.velocity * o + a.acceleration * i), e = h.start + (h.velocity * o + h.acceleration * i); else {
                if (o *= this._stepsPerTimeUnit, n = s = (0 | o) - this._step, r = o % 1, 0 > s) for (s = -s; --s > -1; ) a.value -= a.v,
                h.value -= h.v, a.v /= this._friction, h.v /= this._friction, a.v -= a.a, h.v -= h.a; else for (;--s > -1; ) a.v += a.a,
                h.v += h.a, a.v *= this._friction, h.v *= this._friction, a.value += a.v, h.value += h.v;
                t = a.value + a.v * r, e = h.value + h.v * r, this._step += n;
            }
            this._skipX || (a.m && (t = a.m(t, this._target)), a.f ? this._target[a.p](t) : this._target[a.p] = t),
            this._skipY || (h.m && (e = h.m(e, this._target)), h.f ? this._target[h.p](e) : this._target[h.p] = e);
        }
    }), d = c.prototype;
    d._kill = function(t) {
        return null != t[this._x.p] && (this._skipX = !0), null != t[this._y.p] && (this._skipY = !0),
        this._super._kill.call(this, t);
    }, d._mod = function(t) {
        var e = t[this._x.p] || t.physics2D;
        e && "function" == typeof e && (this._x.m = e), e = t[this._y.p] || t.physics2D,
        e && "function" == typeof e && (this._y.m = e);
    }, c._autoCSS = !0, c._cssRegister = function() {
        var t = h.CSSPlugin;
        if (t) {
            var e = t._internals, i = e._parseToProxy, n = e._setPluginRatio, r = e.CSSPropTween;
            e._registerComplexSpecialProp("physics2D", {
                parser: function(t, e, s, o, h, l) {
                    l = new c();
                    var d, g = e.xProp || "x", u = e.yProp || "y", f = {};
                    return f[g] = f[u] = a++, d = i(t, f, o, h, l), h = new r(t, "physics2D", 0, 0, d.pt, 2),
                    h.data = d, h.plugin = l, h.setRatio = n, l._onInitTween(d.proxy, e, o._tween),
                    h;
                }
            });
        }
    };
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();

/* ta.js (c) Nino Kroesen & Denis Spasyuk MIT License. */

function ta(){};

ta.aroon = {
    up: this.aroon_up,
    down: this.aroon_down,
    osc: this.aroon_osc
};

/** Median
var data = [4, 6, 3, 1, 2, 5];
var length = 4; // default = data.length
ta.median(data, length);*/
ta.median = async function (a, n) {
    for (var t = [], r = n || a.length; r <= a.length; r++) {
        var e = a.slice(r - n, r);
        e.sort((a, n) => a > n ? -1 : a < n ? 1 : 0), t.push(e[Math.round(e.length / 2)])
    }
    return t
}
/** K-means Clustering
var data = [2, 3, 4, 5, 3, 5, 7, 8, 6, 8, 6, 4, 2, 6];
var length = 4;
ta.kmeans(data, length);*/
ta.kmeans = async function (a, n) {
    var t, r = [],
        e = [],
        l = [],
        s = !1,
        o = Math.round(a.length / (n + 1));
    for (i = 0; i < n; i++) e[i] = a[o * (i + 1)];
    do {
        for (i = 0; i < n; i++) r[i] = [];
        for (x = 0; x < a.length; x++) {
            var h = -1;
            for (y = 0; y < n; y++) {
                var u = Math.abs(e[y] - a[x]); - 1 === h ? (h = u, t = y) : u <= h && (h = u, t = y)
            }
            r[t].push(a[x])
        }
        for (l = e, x = 0; x < n; x++) {
            var p = 0;
            for (y = 0; y < r[x].length; y++) p += r[x][y];
            var c = p / r[t].length;
            e[x] = c
        }
        for (x = 0; x < n; x++) e[x] !== l[x] && (s = !0)
    } while (s);
    return r
}
/** Normalize
var data = [5,4,9,4];
var margin = 0.1; // margin % (default = 0)
ta.normalize(data, margin);*/
ta.normalize = async function (a, n) {
    n = n || 0;
    for (var t = await Math.max.apply(null, a.slice()) * (1 + n), r = await Math.min.apply(null, a.slice()) * (1 - n), e = [], l = 0; l < a.length; l++) e.push(1 - (t - a[l]) / (t - r));
    return e
}
/** Denormalize
var data = [5,4,9,4]; // original data || [highest, lowest]
var norm = [0.22, 0.06, 0.86, 0.06, 0.44]; // normalized data
var margin = 0.1; // margin % (default = 0)
ta.denormalize(data, norm, margin);*/
ta.denormalize = async function (a, n, t) {
    t = t || 0;
    for (var r = await Math.max.apply(null, a.slice()) * (1 + t), e = await Math.min.apply(null, a.slice()) * (1 - t), l = [], s = 0; s < n.length; s++) l.push(e + n[s] * (r - e));
    return l
}
/** Median Absolute Deviation
var data = [3, 7, 5, 4, 3, 8, 9];
var length = 6; // default = data.length
ta.mad(data, length);*/
ta.mad = async function (a, n) {
    for (var t = n || a.length, r = [], e = t; e <= a.length; e++) {
        var l = a.slice(e - t, e),
            s = await this.median(l),
            o = l.map(a => Math.abs(a - s[s.length - 1]));
        o = await this.median(o), r.push(o[o.length - 1])
    }
    return r
}
/** Average Absolute Deviation
var data = [4, 6, 8, 6, 8, 9, 10, 11];
var length = 7; // default = data.length
ta.aad(data, length);*/
ta.aad = async function (a, n) {
    for (var t = n || a.length, r = [], e = t; e <= a.length; e++) {
        var l = a.slice(e - t, e),
            s = 0,
            o = await this.sma(l, t);
        for (q in l) s += Math.abs(l[q] - o[o.length - 1]);
        r.push(s / t)
    }
    return r
}
/** Sum Squared Differences
var data = [7, 6, 5, 7, 9, 8, 3, 5, 4];
var length = 7; // default = data.length
ta.ssd(data, length);*/
ta.ssd =  async function (a, n) {
    for (var t = n || a.length, r = [], e = t; e < a.length; e++) {
        var l = a.slice(e - t, e),
            s = await this.sma(l, t),
            o = 0;
        for (let a in l) o += (l[a] - s[s.length - 1]) ** 2;
        r.push(Math.sqrt(o))
    }
    return r
}
/** Relative Strength Index (RSI)
var data = [1, 2, 3, 4, 5, 6, 7, 5];
var length = 6; // default = 14
ta.rsi(data, length);*/
ta.rsi = async function (a, n) {
    for (var t = n || 14, r = [], e = a.slice(0, t), l = t, s = 0, o = 0; l < a.length; l++, s = 0, o = 0) {
        e.push(a[l]);
        for (var h = 1; h < e.length; h++) e[h] - e[h - 1] < 0 ? o += Math.abs(e[h] - e[h - 1]) : s += e[h] - e[h - 1];
        var u = 100 - 100 / (1 + s / t / (o / t));
        r.push(u), e.splice(0, 1)
    }
    return r
}
/** Wilder's Relative Strength Index
var data = [1, 2, 3, 4, 5, 6, 7, 5, 6];
var length = 6; // default = 14
ta.wrsi(data, length);*/
ta.wrsi = async function (a, n) {
    for (var t = n || 14, r = [], e = [], l = [], s = 1; s < a.length; s++) a[s] - a[s - 1] < 0 ? (l.push(Math.abs(a[s] - a[s - 1])), e.push(0)) : (l.push(0), e.push(a[s] - a[s - 1]));
    l = await this.wsma(l, t), e = await this.wsma(e, t);
    for (let a in l) r.push(100 - 100 / (1 + e[a] / l[a]));
    return r
}
/** True Strength Index (TSI)
var data = [1.32, 1.27, 1.42, 1.47, 1.42, 1.45, 1.59];
var longlength = 3; // default = 25
var shortlength = 2; // default = 13
var signallength = 2; // default = 13
ta.tsi(data, longlength, shortlength, signallength);*/
ta.tsi = async function (a, n, t, r) {
    for (var e = n || 25, l = t || 13, s = r || 13, o = [], h = [], u = [], i = [], p = 1; p < a.length; p++) o.push(a[p] - a[p - 1]), h.push(Math.abs(a[p] - a[p - 1]));
    var c = await this.ema(o, e),
        f = await this.ema(h, e),
        m = await this.ema(c, l),
        g = await this.ema(f, l);
    for (p = 0; p < m.length; p++) u.push(m[p] / g[p]);
    var v = await this.ema(u, s);
    u.splice(0, u.length - v.length);
    for (p = 0; p < v.length; p++) i.push([v[p], u[p]]);
    return i
}
/** Balance Of Power
var data = [[4, 5, 4, 5], [5, 6, 5, 6], [6, 8, 5, 6]]; // [open, high, low, close]
var length = 2; // default = 14
ta.bop(data, length);
// output (array)*/
ta.bop = async function (a, n) {
    var t = a.map(a => (a[3] - a[0]) / (a[1] - a[2]));
    n = n || 14;
    return t = await this.sma(t, n)
}
/** Force Index
var data = [[1.4, 200], [1.5, 240], [1.1, 300], [1.2, 240], [1.5, 400]]; // [close, volume]
var length = 4; // default = 13
ta.fi(data, length);*/
ta.fi = async function (a, n) {
    for (var t = n || 13, r = [], e = [], l = 1; l < a.length; l++)
        if (r.push((a[l][0] - a[l - 1][0]) * a[l][1]), r.length >= t) {
            var s = await this.ema(r, t);
            e.push(s[s.length - 1]), r.splice(0, 1)
        } return e
}
/** Accumulative Swing Index
var data = [[7, 6, 4], [9, 7, 5], [9, 8, 6]]; // [high, close, low]
ta.asi(data);*/
ta.asi = async function (a) {
    for (var n = [], t = 1; t < a.length; t++) {
        var r, e = a[t][1],
            l = a[t - 1][1],
            s = a[t][0],
            o = a[t - 1][0],
            h = a[t][2],
            u = a[t - 1][2],
            i = o - e > u - e ? o - e : u - e,
            p = a[t][0],
            c = a[t - 1][0],
            f = Math.max(a[t][0], a[t - 1][0]) - Math.min(a[t][2], a[t - 1][2]);
        s - l > h - l && s - l > s - h && (r = s - l - (h - l) / 2 + (l - c) / 4), h - l > s - l && h - l > s - h && (r = h - l - (s - l) / 2 + (l - c) / 4), s - h > s - l && s - h > h - l && (r = s - h + (l - c) / 4), n.push((l - e + (l - c) / 2 + (e - p) / 2) / r * 50 * i / f)
    }
    return n
}
/** Awesome Oscillator
var data = [[6, 5], [8, 6], [7, 4], [6, 5], [7, 6], [9, 8]]; // [high, low]
var shortlength = 2; // default = 5
var longlength = 5; // default = 35
ta.ao(data, shortlength, longlength);*/
ta.ao = async function (a, n, t) {
    var r = n || 5,
        e = t || 35,
        l = [];
    a = a.map(a => (a[0] + a[1]) / 2), pl = a.slice(0, e - 1);
    for (var s = e - 1; s < a.length; s++) {
        pl.push(a[s]);
        var o = await this.sma(pl, r),
            h = await this.sma(pl, e);
        l.push(o[o.length - 1] - h[h.length - 1]), pl.splice(0, 1)
    }
    return l
}
/** Williams %R
var data = [2, 1, 3, 1, 2];
var length = 4; // default = 14
ta.pr(data, length);*/
ta.pr = async function (a, n) {
    for (var t = n || 14, r = [], e = t; e <= a.length; e++) {
        var l = a.slice(e - t, e),
            s = await Math.max.apply(null, l),
            o = await Math.min.apply(null, l);
        r.push((s - a[e - 1]) / (s - o) * -100)
    }
    return r
}
/** Least Squares Moving Average (LSMA)
var data = [5, 6, 6, 3, 4, 6, 7];
var length = 6; // default = 25
ta.lsma(data, length);*/
ta.lsma = async function (a, n) {
    for (var t = n || 25, r = [], e = t; e <= a.length; e++) {
        for (var l, s, o = a.slice(e - t, e), h = 0, u = 0, i = 0, p = 0, c = 1; c <= t; c++) h += c, u += o[c - 1], i += o[c - 1] * c, p += c * c, o[c - 1] * o[c - 1];
        s = u / t - (l = (i - h * u / t) / (p - h * h / t)) * h / t, r.push(l * t + s)
    }
    return r
}
/** Donchian Channels
var data = [[6, 2], [5, 2], [5, 3], [6, 3], [7, 4], [6, 3]]; // [high, low]
var length = 5; // default = 20
ta.don(data, length);*/
ta.don = async function (a, n) {
    for (var t = [], r = n || 20, e = r; e <= a.length; e++) {
        var l = a.slice(e - r, e),
            s = [],
            o = [];
        for (let a in l) s.push(l[a][0]), o.push(l[a][1]);
        var h = Math.max.apply(null, s.slice()),
            u = Math.min.apply(null, o.slice());
        t.push([h, (h + u) / 2, u])
    }
    return t
}
/** Ichimoku Cloud
var data = [[6, 3, 2], [5, 4, 2], [5, 4, 3], [6, 4, 3], [7, 6, 4], [6, 5, 3]]; // [high, close, low]
var length1 = 9; // default = 9
var length2 = 26; // default = 26
var length3 = 52; // default = 52
var displacement = 26; // default = 26
ta.ichimoku(data, length1, length2, length3, displacement);*/
ta.ichimoku = async function (a, n, t, r, e) {
    for (var l = [], s = n || 9, o = t || 26, h = r || 52, u = e || 26, i = [], p = [], c = 0; c < a.length; c++)
        if (l.push(a[c]), l.length > h) {
            var f = [],
                m = [];
            for (let a in l) f.push(l[a][0]), m.push(l[a][2]);
            var g = (Math.max.apply(null, f.slice(f.length - 1 - s, f.length - 1)) + Math.min.apply(null, m.slice(m.length - 1 - s, m.length - 1))) / 2,
                v = (Math.max.apply(null, f.slice(f.length - 1 - o, f.length - 1)) + Math.min.apply(null, m.slice(m.length - 1 - o, m.length - 1))) / 2,
                d = a[c][1] + v,
                x = (Math.max.apply(null, f.slice(f.length - 1 - h, f.length - 1)) + Math.min.apply(null, m.slice(m.length - 1 - o, m.length - 1))) / 2;
            chik = a[c][1], p.push([g, v, d, x, chik]), l.splice(0, 1)
        } for (c = u; c < p.length - u; c++) i.push([p[c][0], p[c][1], p[c + (u - 1)][2], p[c + (u - 1)][3], p[c + u - 1][4]]);
    return i
}
/** Stochastics
var data = [[3,2,1], [2,2,1], [4,3,1], [2,2,1]]; // [high, close, low]
var length = 2; // default = 14
var smoothd = 1; // default = 3
var smoothk = 1; // default = 3
ta.stoch(data, length, smoothd, smoothk);*/
ta.stoch = async function (a, n, t, r) {
    var e = n || 14,
        l = t || 3,
        s = r || 3,
        o = [],
        h = [],
        u = [],
        i = [];
    e < l && ([e, l] = [l, e]), s > l && ([s, l] = [l, s]);
    for (var p = 0; p < a.length; p++) {
        if (h.push(a[p][0]), u.push(a[p][2]), h.length >= e) {
            var c = await Math.max.apply(null, h),
                f = await Math.min.apply(null, u),
                m = 100 * (a[p][1] - f) / (c - f);
            i.push(m)
        }
        if (s > 0 && i.length > s) {
            var g = await this.sma(i, s);
            i.push(g[g.length - 1])
        }
        if (i.length - s >= l) {
            var v = await this.sma(i, l);
            o.push([m, v[v.length - 1]]), h.splice(0, 1), u.splice(0, 1), i.splice(0, 1)
        }
    }
    return o
}
/** Average True Range (ATR)
var data = [[3,2,1], [2,2,1], [4,3,1], [2,2,1]]; // [high, close, low]
var length = 3; // default = 14
ta.atr(data, length);*/
ta.atr = async function (a, n) {
    for (var t = n || 14, r = [a[0][0] - a[0][2]], e = 1; e < a.length; e++) {
        var l = await Math.max(a[e][0] - a[e - 1][1], a[e][2] - a[e - 1][1], a[e][0] - a[e][2]);
        r.push((r[r.length - 1] * (t - 1) + l) / t)
    }
    return r
}

/** Simple Moving Average (SMA) 
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 6; // default = 14
ta.sma(data, length);*/
ta.sma = async function (a, n) {
    for (var t = n || 14, r = [], e = t, l = 0; e <= a.length; e++, l = 0) {
        var s = a.slice(e - t, e);
        for (q in s) l += s[q];
        r.push(l / t)
    }
    return r
}

/** Smoothed Moving Average (SMMA)
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 5; // default = 14
ta.smma(data, length);*/
ta.smma = async function (a, n) {
    for (var t = n || 14, r = [], e = t; e <= a.length; e++) {
        var l = a.slice(e - t, e),
            s = 0;
        for (q in l) s += l[q];
        r.length <= 0 ? r.push(s / t) : r.push((s - r[r.length - 1]) / t)
    }
    return r.splice(0, 1), r
}

/** Weighted Moving Average (WMA)
var data = [69, 68, 66, 70, 68];
var length = 4; // default = 14
ta.wma(data, length);*/
ta.wma = async function (a, n) {
    for (var t = n || 14, r = 0, e = [], l = 1; l <= t; l++) r += l;
    for (l = t; l <= a.length; l++) {
        var s = a.slice(l - t, l),
            o = 0;
        for (q in s) o += s[q] * (Number(q) + 1) / r;
        e.push(o)
    }
    return e
}

/** Wilder's Smoothing Moving Average
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 6; // default = 14
ta.wsma(data, length);*/
ta.wsma = async function (a, n) {
    for (var t = n || 14, r = [], e = 1 / t, l = t; l <= a.length; l++)
        if (r.length > 0) r.push((a[l - 1] - r[r.length - 1]) * e + r[r.length - 1]);
        else {
            var s = a.slice(l - t, l),
                o = 0;
            for (q in s) o += s[q];
            r.push(o / t)
        } return r
}
/** Parabolic Weighted Moving Average
var data = [17, 26, 23, 29, 20];
var length = 4; // default = 14
ta.pwma(data, length);*/
ta.pwma = async function (a, n) {
    for (var t = 0, r = [], e = [], l = n || 14, s = l / 2, o = n; s >= 1; s--, o--) s % 1 != 0 ? t += (s = Math.round(s)) * o : (e.push(s * o), t += s * o * 2), e.unshift(s * o);
    for (s = l; s <= a.length; s++) {
        for (var h = 0, u = a.slice(s - l, s), i = l - 1; i >= 0; i--) h += u[i] * e[i] / t;
        r.push(h)
    }
    return r
}
/** Hyperbolic Weighted Moving Average
var data = [54, 51, 86, 42, 47];
var length = 4; // default = 14
ta.hwma(data, length);*/
ta.hwma = async function (a, n) {
    for (var t = 0, r = [], e = [], l = n || 14, s = 1, o = l; s <= l / 2; s++, o--) s % 1 != 0 ? t += (s = Math.round(s)) * o : (e.push(s * o), t += s * o * 2), e.unshift(s * o);
    for (s = l; s <= a.length; s++) {
        for (var h = 0, u = a.slice(s - l, s), i = l - 1; i >= 0; i--) h += u[i] * e[i] / t;
        r.push(h)
    }
    return r
}
/** Volume Weighted Moving Average (VWMA)
var data = [[1, 59], [1.1, 82], [1.21, 27], [1.42, 73], [1.32, 42]]; // [price, volume (quantity)]
var length = 4; // default = 20
ta.vwma(data, length);*/
ta.vwma = async function (a, n) {
    for (var t = n || 20, r = [], e = (a = a.map(a => [a[0] * a[1], a[1]]), t); e <= a.length; e++) {
        for (var l = a.slice(e - t, e), s = 0, o = 0, h = 0; h < l.length; h++) s += l[h][1], o += l[h][0];
        r.push(o / s)
    }
    return r
}
/** Exponential Moving Average (EMA)
var data = [1, 2, 3, 4, 5, 6, 10];
var length = 6; // default = 12
ta.ema(data, length);*/
ta.ema = async function (a, n) {
    for (var t = n || 12, r = [], e = 2 / (t + 1), l = t; l <= a.length; l++)
        if (r.length > 0) r.push((a[l - 1] - r[r.length - 1]) * e + r[r.length - 1]);
        else {
            var s = a.slice(l - t, l),
                o = 0;
            for (q in s) o += s[q];
            r.push(o / t)
        } return r
}
/** Hull Moving Average
var data = [6, 7, 5, 6, 7, 4, 5, 7];
var length = 6; // default = 14
ta.hull(data, length);*/
ta.hull = async function (a, n) {
    var t = n || 14,
        r = [],
        e = [],
        l = await this.wma(a, t),
        s = Math.round(Math.sqrt(t)),
        o = await this.wma(a, Math.round(t / 2));
    o.splice(0, o.length - l.length);
    for (let a in l)
        if (r.push(2 * o[a] - l[a]), r.length >= s) {
            var h = await this.wma(r, s);
            e.push(h[h.length - 1])
        } return e
}
/** Kaufman Adaptive Moving Average (KAMA)
var data = [8, 7, 8, 9, 7, 9];
var length1 = 2; // default = 10
var length2 = 4; // default = 2
var length3 = 8; // default = 30
ta.kama(data, length1, length2, length3);*/
ta.kama = async function (a, n, t, r) {
    n = n || 10, t = t || 2, r = r || 30;
    for (var e = [(e = await this.sma(a, n))[e.length - 1]], l = n + 1; l < a.length; l++) {
        for (var s = 0, o = Math.abs(a[l] - a[l - n]), h = 1; h < n; h++) s += Math.abs(a[l - h] - a[l - h - 1]);
        var u = (o / s * (2 / (t + 1) - 2 / (r + 1) + 2 / (r + 1))) ** 2;
        e.push(e[e.length - 1] + u * (a[l] - e[e.length - 1]))
    }
    return e
}
/** Moving Average Convergence / Divergence (MACD)
var data = [1, 2, 3, 4, 5, 6, 14];
var length1 = 3; // default = 12
var length2 = 6; // default = 26
ta.macd(data, length1, length2);*/
ta.macd = async function (a, n, t) {
    var r = n || 12,
        e = t || 26;
    r > e && ([r, e] = [e, r]);
    var l = await this.ema(a, r),
        s = await this.ema(a, e),
        o = [];
    l.splice(0, e - r);
    for (var h = 0; h < s.length; h++) o.push(l[h] - s[h]);
    return o
}
/** Bollinger Bands
var data = [1, 2, 3, 4, 5, 6];
var length = 5; // default = 14
var deviations = 2; // default = 1
ta.bands(data, length, deviations);*/
ta.bands = async function (a, n, t) {
    for (var r = n || 14, e = t || 1, l = [], s = [], o = [], h = await this.sma(a, r), u = 0; u < a.length; u++)
        if (l.push(a[u]), l.length >= r) {
            var i = await this.std(l, r);
            s.push(i), l.splice(0, 1)
        } for (u = 0; u < h.length; u++) o.push([h[u] + s[u] * e, h[u], h[u] - s[u] * e]);
    return o
}
/** Bollinger Bandwidth
var data = [1, 2, 3, 4, 5, 6];
var length = 5; // default = 14
var deviations = 2; // default = 1
ta.bandwidth(data, length, deviations)*/
ta.bandwidth = async function (a, n, t) {
    for (var r = n || 14, e = t || 1, l = [], s = await this.bands(a, r, e), o = 0; o < s.length; o++) l.push((s[o][0] - s[o][2]) / s[o][1]);
    return l
}
/** Keltner Channels
var data = [[3,2,1], [2,2,1], [4,3,1], [2,2,1], [3,3,1]]; // [high, close, low]
var length = 5; // default = 14
var deviations = 1; // default = 1
ta.keltner(data, length, deviations);*/
ta.keltner = async function (a, n, t) {
    var r, e = n || 14,
        l = t || 1,
        s = [],
        o = await this.atr(a, e),
        h = [];
    for (var u in a) s.push((a[u][0] + a[u][1] + a[u][2]) / 3);
    r = await this.sma(s, e), o.splice(0, e - 1);
    for (u = 0; u < r.length; u++) h.push([r[u] + o[u] * l, r[u], r[u] - o[u] * l]);
    return h
}
/** Variance 
var data = [6, 7, 2, 3, 5, 8, 6, 2];
var length = 7; // default = data.length
ta.variance(data, length);*/
ta.variance = async function (a, n) {
    for (var t = n || a.length, r = [], e = t; e <= a.length; e++) {
        var l = a.slice(e - t, e),
            s = await this.sma(l, t),
            o = 0;
        for (x in l) o += (l[x] - s[s.length - 1]) ** 2;
        r.push(o / t)
    }
    return r
}
/** Standard Deviation
var data = [1, 2, 3];
var length = 3; // default = data.length
ta.std(data, length);*/
ta.std = async function (a, n) {
    var t = n || a.length,
        r = a.reduce((a, n) => Number(a) + Number(n)) / t;
    return Math.sqrt(a.reduce((a, n) => a + Math.pow(n - r, 2), 0) / t)
}
/** Inverse Normal Distribution
var data = 0.4732;
ta.normsinv(data);*/
ta.normsinv = async function (a) {
    var n = -.00778489400243029,
        t = -.322396458041136,
        r = -2.40075827716184,
        e = -2.54973253934373,
        l = 4.37466414146497,
        s = 2.93816398269878,
        o = .00778469570904146,
        h = .32246712907004,
        u = 2.445134137143,
        i = 3.75440866190742;
    if (a < 0 || a > 1) return 0;
    if (a < .02425) return (((((n * (p = Math.sqrt(-2 * Math.log(a))) + t) * p + r) * p + e) * p + l) * p + s) / ((((o * p + h) * p + u) * p + i) * p + 1);
    if (a <= .97575) {
        var p, c = (p = a - .5) * p;
        return (((((-39.6968302866538 * c + 220.946098424521) * c - 275.928510446969) * c + 138.357751867269) * c - 30.6647980661472) * c + 2.50662827745924) * p / (((((-54.4760987982241 * c + 161.585836858041) * c - 155.698979859887) * c + 66.8013118877197) * c - 13.2806815528857) * c + 1)
    }
    return -(((((n * (p = Math.sqrt(-2 * Math.log(1 - a))) + t) * p + r) * p + e) * p + l) * p + s) / ((((o * p + h) * p + u) * p + i) * p + 1)
}
/** Monte Carlo Simulation

var data = [6, 4, 7, 8, 5, 6];
var length = 2; // default = 50
var simulations = 100; // default = 1000
var percentile = 0.5; // default = undefined (returns all raw simulations)
ta.sim(data, length, simulations, percentile)*/
ta.sim = async function (a, n, t, r) {
    for (var e = [], l = (n = n || 50, t = t || 1e3, 0); l < t; l++) {
        for (var s = a.slice(), o = 0; o < n; o++) {
            for (var h = [], u = 1; u < s.length; u++) {
                var i = await this.dif(s[u], s[u - 1]);
                h.push(i)
            }
            var p = await this.sma(h, h.length),
                c = await this.std(h),
                f = await this.normsinv(Math.random());
            s.push(s[s.length - 1] * Math.exp(p[0] - c * c / 2 + c * f))
        }
        e.push(s)
    }
    if (!r) return e;
    var m = a.slice();
    for (l = a.length; l < e[0].length; l++) e.sort((a, n) => a[l] > n[l] ? 1 : a[l] < n[l] ? -1 : 0), m.push(e[Math.round(e.length * r)][l]);
    return m
}
/** Correlation
var data1 = [1, 2, 3, 4, 5, 2];
var data2 = [1, 3, 2, 4, 6, 3];
ta.cor(data1, data2)*/
ta.cor = async function (a, n) {
    for (var t = await this.sma(a, a.length), r = await this.sma(n, n.length), e = 0, l = 0, s = 0, o = 0; o < a.length; o++) {
        var h = a[o] - t,
            u = n[o] - r;
        e += h * u, l += Math.pow(h, 2), s += Math.pow(u, 2)
    }
    var i = a.length - 1;
    return l /= i, s /= i, e / (i * (l = Math.sqrt(l)) * (s = Math.sqrt(s)))
}
/** Percentage Difference
var newval = 0.75;
var oldval = 0.5;
ta.dif(newval, oldval);*/
ta.dif = async function (a, n) {
    return (a - n) / n
}
/** Aroon Up
var data = [5, 4, 5, 2];
var length = 3; // default = 10
ta.aroon.up(data, length);*/
ta.aroon_up = async function (a, n) {
    for (var t = n || 10, r = [], e = t; e <= a.length; e++) {
        var l = a.slice(e - t, e),
            s = l.slice();
        s.sort((a, n) => a - n), r.push(100 * (t - (l.findIndex(a => a === s[t - 1]) + 1)) / t)
    }
    return r
}
/** Aroon Down
var data = [2, 5, 4, 5];
var length = 3; // default = 10
ta.aroon.down(data, length);*/
ta.aroon_down= async function (a, n) {
    for (var t = n || 10, r = [], e = t; e <= a.length; e++) {
        var l = a.slice(e - t, e),
            s = l.slice(0);
        s.sort((a, n) => a - n), r.push(100 * (t - (l.findIndex(a => a === s[0]) + 1)) / t)
    }
    return r
}
/** Aroon Oscillator
var data = [2, 5, 4, 5];
var length = 3; // default = 25
ta.aroon_osc(data, length);*/
ta.aroon_osc = async function (a, n) {
    for (var t = n || 25, r = [], e = await this.aroon_up(a, t), l = await this.aroon_down(a, t), s = 0; s < e.length; s++) r.push(e[s] - l[s]);
    return r
}
/** Money Flow Index
var data = [[19, 13], [14, 38], [21, 25], [32, 17]]; // [buy volume, sell volume]
var length = 3; // default = 14
ta.mfi(data, length);*/
ta.mfi = async function (a, n) {
    for (var t = n || 14, r = [], e = a.map(a => a[1]), l = a.map(a => a[0]), s = t; s <= a.length; s++) {
        var o = 0,
            h = 0;
        for (q = s - t; q < s; q++) o += l[q], h += e[q];
        r.push(100 - 100 / (1 + o / h))
    }
    return r
}
/** Rate Of Change
var data = [1, 2, 3, 4];
var length = 3; // default = 14
ta.roc(data, length);*/
ta.roc=async function (a, n) {
    for (var t = n || 14, r = [], e = t; e <= a.length; e++) r.push((a[e - 1] - a[e - t]) / a[e - t]);
    return r
}
/** Coppock Curve
var data = [3, 4, 5, 3, 4, 5, 6, 4, 7, 5, 4, 7, 5];
var length1 = 4; // (ROC period 1) default = 11
var length2 = 6; // (ROC period 2) default = 14
var length3 = 5; // (WMA smoothing period) default = 10
ta.cop(data, length1, length2, length3);*/
ta.cop = async function (a, n, t, r) {
    n = n || 11, t = t || 14, r = r || 10, max = Math.max(n, t), co = [];
    for (var e = max + r; e < a.length; e++) {
        var l = a.slice(e - (max + r), e),
            s = l.slice(),
            o = [];
        l = await this.roc(l, n), s = await this.roc(s, t), l.splice(0, l.length - s.length), s.splice(0, s.length - l.length);
        for (var h = 0; h < l.length; h++) o.push(l[h] + s[h]);
        o = await this.wma(o, r), co.push(o[o.length - 1])
    }
    return co
}
/** Know Sure Thing
var data = [8, 6, 7, 6, 8, 9, 7, 5, 6, 7, 6, 8, 6, 7, 6, 8, 9, 9, 8, 6, 4, 6, 5, 6, 7, 8, 9];
// roc sma #1
var r1 = 5; // default = 10
var s1 = 5; // default = 10
// roc sma #2
var r2 = 7; // default = 15
var s2 = 5; // default = 10
// roc sma #3
var r3 = 10; // default = 20
var s3 = 5; // default = 10
// roc sma #4
var r4 = 15; // default = 30
var s4 = 7; // default = 15
// signal line
var sig = 4; // default = 9
ta.kst(data, r1, r2, r3, r4, s1, s2, s3, s4, sig);*/
ta.kst = async function (a, n, t, r, e, l, s, o, h, u) {
    n = n || 10, t = t || 15, r = r || 20, e = e || 30, l = l || 10, s = s || 10, o = o || 10, h = h || 15, u = u || 9;
    for (var i = [], p = [], c = Math.max(n, t, r, e) + Math.max(l, s, o, h), f = c; f < a.length; f++) {
        var m = a.slice(f - c, f),
            g = await this.roc(m, n),
            v = await this.roc(m, t),
            d = await this.roc(m, r),
            x = await this.roc(m, e);
        g = await this.sma(g, l), v = await this.sma(v, s), d = await this.sma(d, o), x = await this.sma(x, h), i.push(g[g.length - 1] + v[v.length - 1] + d[d.length - 1] + x[x.length - 1])
    }
    var w = await this.sma(i, u);
    for (var f in i.splice(0, i.length - w.length), w) p.push([i[f], w[f]]);
    return p
}
/** On-Balance Volume
var data = [[25200, 10], [30000, 10.15], [25600, 10.17], [32000, 10.13]]; // [asset volume, close price]
ta.obv(data);*/
ta.obv = async function (a) {
    for (var n = [0], t = 1; t < a.length; t++) a[t][1] > a[t - 1][1] && n.push(n[n.length - 1] + a[t][0]), a[t][1] < a[t - 1][1] && n.push(n[n.length - 1] - a[t][0]), a[t][1] === a[t - 1][1] && n.push(n[n.length - 1]);
    return n
}

/**Volume-Weighted Average Price
var data = [[127.21, 89329], [127.17, 16137], [127.16, 23945]]; // [average price, volume (quantity)]
var length = 2; // default = data.length
ta.vwap(data, length);*/
ta.vwap = async function (a, n) {
    for (var t = !n || n > a.length ? a.length : n, r = (a = a.map(a => [a[0] * a[1], a[1]]), []), e = t; e <= a.length; e++) {
        for (var l = a.slice(e - t, e), s = 0, o = 0, h = 0; h < l.length; h++) s += l[h][1], o += l[h][0];
        r.push(o / s)
    }
    return r
}
/** Momentum
var data = [1, 1.1, 1.2, 1.24, 1.34];
var length = 4; // default = 10
var percentage = false; // default = false (true returns percentage)
ta.mom(data, length, percentage);*/
ta.mom = async function (a, n, t) {
    for (var r = n || 10, e = [], l = r - 1; l < a.length; l++) t ? e.push(a[l] / a[l - (r - 1)] * 100) : e.push(a[l] - a[l - (r - 1)]);
    return e
}
/** Chande Momentum Oscillator
var data = [1, 1.2, 1.3, 1.3, 1.2, 1.4];
var length = 4; // default = 9
ta.mom_osc(data, length);*/
ta.mom_osc = async function (a, n) {
    for (var t = n || 9, r = [], e = t; e < a.length; e++) {
        for (var l = 0, s = 0, o = 1; o < t; o++) a[e - t + (o - 1)] < a[e - t + o] ? l += a[e - t + o] : s += a[e - t + o];
        r.push((l - s) / (l + s) * 100)
    }
    return r
}
/** Heikin Ashi
var data = [[3, 4, 2, 3], [3, 6, 3, 5], [5, 5, 2, 3]]; // [open, high, low, close]
ta.ha(data);*/
ta.ha = async function (a) {
    for (var n = [
            [(Number(a[0][0]) + Number(a[0][3])) / 2, Number(a[0][1]), Number(a[0][2]), (Number(a[0][0]) + Number(a[0][1]) + Number(a[0][2]) + Number(a[0][3])) / 4]
        ], t = 1; t < a.length; t++) n.push([(n[n.length - 1][0] + n[n.length - 1][3]) / 2, Math.max(n[n.length - 1][0], n[n.length - 1][3], a[t][1]), Math.min(n[n.length - 1][0], n[n.length - 1][3], a[t][2]), (a[t][0] + a[t][1] + a[t][2] + a[t][3]) / 4]);
    return n
}
/** Renko
var data = [[8, 6], [9, 7], [9, 8]]; // [high, low]
var bricksize = 3;
ta.ren(data, bricksize);*/
ta.ren = async function (a, n) {
    for (var t = [], r = (n = n || 1, Math.floor(n) === n ? 0 : n.toString().split(".")[1].length || 0), e = Math.ceil(a[0][0] / n * 10 ** r) / 10 ** r * n, l = e - n, s = 1; s < a.length; s++) {
        if (a[s][0] > e + n)
            do {
                t.push([e, e + n, e, e + n]), e += n, l += n
            } while (a[s][0] > e + n);
        if (a[s][1] < l - n)
            do {
                t.push([l, l, l - n, l - n]), e -= n, l -= n
            } while (a[s][1] < l - n)
    }
    return t
}

try {
    module.exports = exports = ta;
  } catch (e) {}

const util = {};
util.base64Encode = function(e) {
    var t, n, o, r, s, i, a, l, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        u = 0,
        c = 0,
        p = "",
        f = [];
    if (!e) return e;
    e = util.utf8Encode(e);
    do {
        t = e.charCodeAt(u++), n = e.charCodeAt(u++), o = e.charCodeAt(u++), l = t << 16 | n << 8 | o, r = l >> 18 &
            63, s = l >> 12 & 63, i = l >> 6 & 63, a = 63 & l, f[c++] = d.charAt(r) + d.charAt(s) + d.charAt(i) + d.charAt(
                a)
    } while (u < e.length);
    switch (p = f.join(""), e.length % 3) {
        case 1:
            p = p.slice(0, -2) + "==";
            break;
        case 2:
            p = p.slice(0, -1) + "="
    }
    return p
};
util.UUID = function() {
    let just_test_distinctid_2 = 0;

    var e = function() {
            for (var e = 1 * new Date, t = 0; e == 1 * new Date;) t++;
            return e.toString(16) + t.toString(16)
        },
        t = function() {
            return Math.random().toString(16).replace(".", "")
        },
        n = function(e) {
            function t(e, t) {
                var n, o = 0;
                for (n = 0; n < t.length; n++) o |= s[n] << 8 * n;
                return e ^ o
            }
            var n, o, r = navigator.userAgent,
                s = [],
                i = 0;
            for (n = 0; n < r.length; n++) o = r.charCodeAt(n), s.unshift(255 & o), s.length >= 4 && (i = t(i, s), s = []);
            return s.length > 0 && (i = t(i, s)), i.toString(16)
        };
    return function() {
        var o = String(screen.height * screen.width);
        o = o && /\d{5,}/.test(o) ? o.toString(16) : String(31242 * Math.random()).replace(".", "").slice(0, 8);
        var r = e() + "-" + t() + "-" + n() + "-" + o + "-" + e();
        return r ? (just_test_distinctid_2 = 1, r) : (just_test_distinctid_2 = 2, (String(Math.random()) + String(
            Math.random()) + String(Math.random())).slice(2, 15))
    }
}();

util.utf8Encode = function(e) {
    e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var t, n, o, r = "",
        s = 0;
    for (t = n = 0, s = e.length, o = 0; s > o; o++) {
        var i = e.charCodeAt(o),
            a = null;
        128 > i ? n++ : a = i > 127 && 2048 > i ? String.fromCharCode(i >> 6 | 192, 63 & i | 128) : String.fromCharCode(
            i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128), null !== a && (n > t && (r += e.substring(t, n)), r += a,
            t = n = o + 1)
    }
    return n > t && (r += e.substring(t, e.length)), r
};
export const Util = util
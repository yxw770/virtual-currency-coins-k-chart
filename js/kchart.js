/**
 * @license
 * KLineChart v7.0.0
 * Copyright (c) 2019 lihu.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ?
		define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).klinecharts = {})
}(this, (function(t) {
	"use strict";
	var e = {
			name: "BBI",
			series: "price",
			precision: 2,
			calcParams: [3, 6, 12, 24],
			shouldCheckParamCount: !0,
			shouldOhlc: !0,
			plots: [{
				key: "bbi",
				title: "BBI",
				type: "line"
			}],
			calcTechnicalIndicator: function(t, e) {
				var i = Math.max.apply(null, e),
					a = [],
					n = [];
				return t.map((function(r, o) {
					var s = {},
						c = r.close;
					if (e.forEach((function(e, i) {
							a[i] = (a[i] || 0) + c, e - 1 > o || (n[i] = a[i] / e, a[i] -= t[o - (e - 1)].close)
						})), o >= i - 1) {
						var h = 0;
						n.forEach((function(t) {
							h += t
						})), s.bbi = h / 4
					}
					return s
				}))
			}
		},
		i = {
			name: "DMA",
			calcParams: [10, 50, 10],
			plots: [{
				key: "dma",
				title: "DMA",
				type: "line"
			}, {
				key: "ama",
				title: "AMA",
				type: "line"
			}],
			calcTechnicalIndicator: function(t, e) {
				var i = Math.max(e[0], e[1]),
					a = 0,
					n = 0,
					r = 0,
					o = [];
				return t.forEach((function(s, c) {
					var h, l, u = {},
						d = s.close;
					if (a += d, n += d, e[0] - 1 > c || (h = a / e[0], a -= t[c - (e[0] - 1)].close), e[1] - 1 > c || (l = n / e[
							1], n -= t[c - (e[1] - 1)].close), c >= i - 1) {
						var _ = h - l;
						u.dma = _, r += _, i + e[2] - 2 > c || (u.ama = r / e[2], r -= o[c - (e[2] - 1)].dma)
					}
					o.push(u)
				})), o
			}
		},
		a = {
			name: "DMI",
			calcParams: [14, 6],
			plots: [{
				key: "pdi",
				title: "PDI",
				type: "line"
			}, {
				key: "mdi",
				title: "MDI",
				type: "line"
			}, {
				key: "adx",
				title: "ADX",
				type: "line"
			}, {
				key: "adxr",
				title: "ADXR",
				type: "line"
			}],
			calcTechnicalIndicator: function(t, e) {
				var i = 0,
					a = [],
					n = 0,
					r = [],
					o = 0,
					s = [],
					c = 0,
					h = [],
					l = [];
				return t.forEach((function(u, d) {
					var _ = {};
					if (d > 0) {
						var v = t[d - 1].close,
							f = u.high,
							p = u.low,
							m = f - p,
							y = Math.abs(f - v),
							x = Math.abs(p - v),
							g = f - t[d - 1].high,
							k = t[d - 1].low - p,
							w = Math.max(Math.max(m, y), x);
						i += w, a.push(w);
						var D = g > 0 && g > k ? g : 0;
						n += D, r.push(D);
						var P = k > 0 && k > g ? k : 0;
						if (o += P, s.push(P), d >= e[0]) {
							var M, b, E;
							if (0 === i ? (M = 0, b = 0) : (M = 100 * n / i, b = 100 * o / i), c += E = b + M === 0 ? 0 : Math.abs(b -
									M) / (b + M) * 100, h.push(E), _.pdi = M, _.mdi = b, d >= e[0] + e[1] - 1) {
								var C = c / e[1];
								_.adx = C, e[0] + 2 * e[1] - 2 > d || (_.adxr = (C + l[d - (e[1] - 1)].adx) / 2), c -= h[d - (e[0] + e[1] -
									1)]
							}
							i -= a[d - e[0]], n -= r[d - e[0]], o -= s[d - e[0]]
						}
					}
					l.push(_)
				})), l
			}
		},
		n = {
			name: "CR",
			calcParams: [26, 10, 20, 40, 60],
			plots: [{
				key: "cr",
				title: "CR",
				type: "line"
			}, {
				key: "ma1",
				title: "MA1",
				type: "line"
			}, {
				key: "ma2",
				title: "MA2",
				type: "line"
			}, {
				key: "ma3",
				title: "MA3",
				type: "line"
			}, {
				key: "ma4",
				title: "MA4",
				type: "line"
			}],
			calcTechnicalIndicator: function(t, e) {
				var i = Math.ceil(e[1] / 2.5 + 1),
					a = Math.ceil(e[2] / 2.5 + 1),
					n = Math.ceil(e[3] / 2.5 + 1),
					r = Math.ceil(e[4] / 2.5 + 1),
					o = 0,
					s = [],
					c = 0,
					h = [],
					l = 0,
					u = [],
					d = 0,
					_ = [],
					v = [];
				return t.forEach((function(f, p) {
					var m = {};
					if (p > 0) {
						var y = t[p - 1],
							x = (y.high + y.close + y.low + y.open) / 4,
							g = Math.max(0, f.high - x),
							k = Math.max(0, x - f.low);
						if (p >= e[0]) {
							m.cr = 0 !== k ? g / k * 100 : 0;
							o += m.cr, c += m.cr, l += m.cr, d += m.cr, e[0] + e[1] - 1 > p || (s.push(o / e[1]), e[0] + e[1] + i - 2 >
									p || (m.ma1 = s[s.length - 1 - i]), o -= v[p - (e[1] - 1)].cr), e[0] + e[2] - 1 > p || (h.push(c / e[2]),
									e[0] + e[2] + a - 2 > p || (m.ma2 = h[h.length - 1 - a]), c -= v[p - (e[2] - 1)].cr), e[0] + e[3] - 1 >
								p || (u.push(l / e[3]), e[0] + e[3] + n - 2 > p || (m.ma3 = u[u.length - 1 - n]), l -= v[p - (e[3] - 1)].cr),
								e[0] + e[4] - 1 > p || (_.push(d / e[4]), e[0] + e[4] + r - 2 > p || (m.ma4 = _[_.length - 1 - r]), d -=
									v[p - (e[4] - 1)].cr)
						}
					}
					v.push(m)
				})), v
			}
		},
		r = {
			name: "AO",
			calcParams: [5, 34],
			shouldCheckParamCount: !0,
			plots: [{
				key: "ao",
				title: "AO",
				type: "bar",
				color: function(t, e) {
					return (t.currentData.technicalIndicatorData || {}).ao > (t.preData.technicalIndicatorData || {}).ao ? e.bar.upColor :
						e.bar.downColor
				},
				isStroke: function(t) {
					return (t.currentData.technicalIndicatorData || {}).ao > (t.preData.technicalIndicatorData || {}).ao
				}
			}],
			baseValue: 0,
			calcTechnicalIndicator: function(t, e) {
				var i = Math.max(e[0], e[1]),
					a = 0,
					n = 0,
					r = 0,
					o = 0;
				return t.map((function(s, c) {
					var h = {},
						l = (s.low + s.high) / 2;
					if (a += l, n += l, c >= e[0] - 1) {
						r = a / e[0];
						var u = t[c - (e[0] - 1)];
						a -= (u.low + u.high) / 2
					}
					if (c >= e[1] - 1) {
						o = n / e[1];
						var d = t[c - (e[1] - 1)];
						n -= (d.low + d.high) / 2
					}
					return i - 1 > c || (h.ao = r - o), h
				}))
			}
		},
		o = {
			name: "CCI",
			calcParams: [13],
			plots: [{
				key: "cci",
				title: "CCI",
				type: "line"
			}],
			calcTechnicalIndicator: function(t, e) {
				var i, a = e[0] - 1,
					n = 0,
					r = 0,
					o = [];
				return t.map((function(s, c) {
					var h, l = {},
						u = s.close;
					if (n += u, o.push(h = a > c ? n / (c + 1) : n / e[0]), r += Math.abs(h - u), c >= a) {
						l.cci = 0 !== (i = r / e[0]) ? ((s.high + s.low + u) / 3 - h) / i / .015 : 0;
						var d = t[c - a].close;
						n -= d, r -= Math.abs(o[c - a] - d)
					}
					return l
				}))
			}
		},
		s = {
			name: "RSI",
			calcParams: [6, 12, 24],
			shouldCheckParamCount: !1,
			plots: [{
				key: "rsi6",
				title: "RSI6",
				type: "line"
			}, {
				key: "rsi12",
				title: "RSI12",
				type: "line"
			}, {
				key: "rsi24",
				title: "RSI24",
				type: "line"
			}],
			calcTechnicalIndicator: function(t, e, i) {
				var a = [],
					n = [];
				return t.map((function(r, o) {
					var s = {},
						c = r.open;
					return e.forEach((function(e, h) {
						var l = (r.close - c) / c;
						if (a[h] = a[h] || 0, n[h] = n[h] || 0, l > 0 ? a[h] = a[h] + l : n[h] = n[h] + Math.abs(l), o >= e - 1) {
							var u = (a[h] + n[h]) / e;
							s[i[h].key] = 0 === u ? 0 : a[h] / e / u * 100;
							var d = t[o - (e - 1)],
								_ = d.open,
								v = (d.close - _) / _;
							v > 0 ? a[h] -= v : n[h] -= Math.abs(v)
						}
					})), s
				}))
			}
		};

	function c() {
		var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
			e = Number.MIN_SAFE_INTEGER,
			i = Number.MAX_SAFE_INTEGER;
		return t.forEach((function(t) {
			e = Math.max(t.high, e), i = Math.min(t.low, i)
		})), {
			hn: e,
			ln: i
		}
	}
	var h = {
			name: "KDJ",
			calcParams: [9, 3, 3],
			plots: [{
				key: "k",
				title: "K",
				type: "line"
			}, {
				key: "d",
				title: "D",
				type: "line"
			}, {
				key: "j",
				title: "J",
				type: "line"
			}],
			calcTechnicalIndicator: function(t, e) {
				var i = [];
				return t.forEach((function(a, n) {
					var r = {},
						o = a.close;
					if (n >= e[0] - 1) {
						var s = c(t.slice(n - (e[0] - 1), n + 1)),
							h = s.ln,
							l = s.hn - h;
						r.k = ((e[1] - 1) * (i[n - 1].k || 50) + (o - h) / (0 === l ? 1 : l) * 100) / e[1], r.d = ((e[2] - 1) * (i[
							n - 1].d || 50) + r.k) / e[2], r.j = 3 * r.k - 2 * r.d
					}
					i.push(r)
				})), i
			}
		},
		l = {
			name: "WR",
			calcParams: [6, 10, 14],
			shouldCheckParamCount: !1,
			plots: [{
				key: "wr1",
				title: "WR1",
				type: "line"
			}, {
				key: "wr2",
				title: "WR2",
				type: "line"
			}, {
				key: "wr3",
				title: "WR3",
				type: "line"
			}],
			regeneratePlots: function(t) {
				return t.map((function(t, e) {
					return {
						key: "wr".concat(e + 1),
						title: "WR".concat(e + 1),
						type: "line"
					}
				}))
			},
			calcTechnicalIndicator: function(t, e, i) {
				return t.map((function(a, n) {
					var r = {},
						o = a.close;
					return e.forEach((function(e, a) {
						var s = e - 1;
						if (n >= s) {
							var h = c(t.slice(n - s, n + 1)),
								l = h.hn,
								u = l - h.ln;
							r[i[a].key] = 0 === u ? 0 : (l - o) / u * 100
						}
					})), r
				}))
			}
		};
	var u = {
			name: "BOLL",
			series: "price",
			calcParams: [20, 2],
			precision: 2,
			shouldOhlc: !0,
			plots: [{
				key: "up",
				title: "UP",
				type: "line"
			}, {
				key: "mid",
				title: "MID",
				type: "line"
			}, {
				key: "dn",
				title: "DN",
				type: "line"
			}],
			calcTechnicalIndicator: function(t, e) {
				var i = e[0] - 1,
					a = 0;
				return t.map((function(n, r) {
					var o = {};
					if (a += n.close, r >= i) {
						o.mid = a / e[0];
						var s = function(t, e) {
							var i = t.length,
								a = 0;
							t.forEach((function(t) {
								var i = t.close - e;
								a += i * i
							}));
							var n = a > 0,
								r = Math.sqrt((a = Math.abs(a)) / i);
							return n ? r : -1 * r
						}(t.slice(r - i, r + 1), o.mid);
						o.up = o.mid + e[1] * s, o.dn = o.mid - e[1] * s, a -= t[r - i].close
					}
					return o
				}))
			}
		},
		d = {
			name: "SAR",
			series: "price",
			calcParams: [2, 2, 20],
			precision: 2,
			shouldOhlc: !0,
			plots: [{
				key: "sar",
				title: "SAR",
				type: "circle",
				color: function(t, e) {
					var i = t.currentData,
						a = i.kLineData || {};
					return (a.high + a.low) / 2 > (i.technicalIndicatorData || {}).sar ? e.circle.upColor : e.circle.downColor
				}
			}],
			calcTechnicalIndicator: function(t, e) {
				var i = e[0] / 100,
					a = e[1] / 100,
					n = e[2] / 100,
					r = i,
					o = -100,
					s = !1,
					c = 0;
				return t.map((function(e, h) {
					var l = c,
						u = e.high,
						d = e.low;
					if (s) {
						(-100 === o || u > o) && (o = u, r = Math.min(r + a, n)), c = l + r * (o - l);
						var _ = Math.min(t[Math.max(1, h) - 1].low, d);
						c > e.low ? (c = o, r = i, o = -100, s = !s) : c > _ && (c = _)
					} else {
						(-100 === o || o > d) && (o = d, r = Math.min(r + a, n)), c = l + r * (o - l);
						var v = Math.max(t[Math.max(1, h) - 1].high, u);
						e.high > c ? (c = o, r = 0, o = -100, s = !s) : v > c && (c = v)
					}
					return {
						sar: c
					}
				}))
			}
		},
		_ = {
			technicalIndicatorExtensions: {},
			graphicMarkExtensions: {},
			addTechnicalIndicator: function(t) {
				var e = this;
				t && [].concat(t).forEach((function(t) {
					t.name && (e.technicalIndicatorExtensions[t.name] = t)
				}))
			},
			addGraphicMark: function(t) {
				var e = this;
				t && [].concat(t).forEach((function(t) {
					t.name && (e.graphicMarkExtensions[t.name] = t)
				}))
			}
		};

	function v(t) {
		return (v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" :
				typeof t
		})(t)
	}

	function f(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function p(t, e) {
		for (var i = 0; e.length > i; i++) {
			var a = e[i];
			a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t,
				a.key, a)
		}
	}

	function m(t, e, i) {
		return e && p(t.prototype, e), i && p(t, i), t
	}

	function y(t, e, i) {
		return e in t ? Object.defineProperty(t, e, {
			value: i,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[e] = i, t
	}

	function x(t, e) {
		var i = Object.keys(t);
		if (Object.getOwnPropertySymbols) {
			var a = Object.getOwnPropertySymbols(t);
			e && (a = a.filter((function(e) {
				return Object.getOwnPropertyDescriptor(t, e).enumerable
			}))), i.push.apply(i, a)
		}
		return i
	}

	function g(t) {
		for (var e = 1; arguments.length > e; e++) {
			var i = null != arguments[e] ? arguments[e] : {};
			e % 2 ? x(Object(i), !0).forEach((function(e) {
				y(t, e, i[e])
			})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : x(
				Object(i)).forEach((function(e) {
				Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
			}))
		}
		return t
	}

	function k(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
		t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				writable: !0,
				configurable: !0
			}
		}), e && D(t, e)
	}

	function w(t) {
		return (w = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
			return t.__proto__ || Object.getPrototypeOf(t)
		})(t)
	}

	function D(t, e) {
		return (D = Object.setPrototypeOf || function(t, e) {
			return t.__proto__ = e, t
		})(t, e)
	}

	function P(t, e) {
		return !e || "object" != typeof e && "function" != typeof e ? function(t) {
			if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return t
		}(t) : e
	}

	function M(t) {
		var e = function() {
			if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ("function" == typeof Proxy) return !0;
			try {
				return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
			} catch (t) {
				return !1
			}
		}();
		return function() {
			var i, a = w(t);
			if (e) {
				var n = w(this).constructor;
				i = Reflect.construct(a, arguments, n)
			} else i = a.apply(this, arguments);
			return P(this, i)
		}
	}

	function b(t, e, i) {
		return (b = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, i) {
			var a = function(t, e) {
				for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = w(t)););
				return t
			}(t, e);
			if (a) {
				var n = Object.getOwnPropertyDescriptor(a, e);
				return n.get ? n.get.call(i) : n.value
			}
		})(t, e, i || t)
	}

	function E(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var i = 0, a = Array(e); e > i; i++) a[i] = t[i];
		return a
	}

	function C(t, e) {
		var i;
		if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
			if (Array.isArray(t) || (i = function(t, e) {
					if (t) {
						if ("string" == typeof t) return E(t, e);
						var i = Object.prototype.toString.call(t).slice(8, -1);
						return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) :
							"Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? E(t, e) : void 0
					}
				}(t)) || e && t && "number" == typeof t.length) {
				i && (t = i);
				var a = 0,
					n = function() {};
				return {
					s: n,
					n: function() {
						return t.length > a ? {
							done: !1,
							value: t[a++]
						} : {
							done: !0
						}
					},
					e: function(t) {
						throw t
					},
					f: n
				}
			}
			throw new TypeError(
				"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
			)
		}
		var r, o = !0,
			s = !1;
		return {
			s: function() {
				i = t[Symbol.iterator]()
			},
			n: function() {
				var t = i.next();
				return o = t.done, t
			},
			e: function(t) {
				s = !0, r = t
			},
			f: function() {
				try {
					o || null == i.return || i.return()
				} finally {
					if (s) throw r
				}
			}
		}
	}

	function I(t, e) {
		if (L(t) && L(e))
			for (var i in e)
				if (i in t) {
					var a = t[i],
						n = e[i];
					L(n) && L(a) && !S(n) && !S(a) ? I(a, n) : O(e[i]) && (t[i] = e[i])
				}
	}

	function T(t) {
		if (!t || !L(t)) return t;
		var e, i, a;
		for (i in e = S(t) ? [] : {}, t) t.hasOwnProperty(i) && (e[i] = (a = t[i]) && L(a) ? T(a) : a);
		return e
	}

	function S(t) {
		return "[object Array]" === Object.prototype.toString.call(t)
	}

	function A(t) {
		return "function" == typeof t
	}

	function L(t) {
		return !!t && "object" === v(t)
	}

	function V(t) {
		return "number" == typeof t && !isNaN(t)
	}

	function O(t) {
		return null != t
	}

	function z(t) {
		return "boolean" == typeof t
	}
	var R = "dash",
		F = "left",
		B = "right",
		Y = "percentage",
		H = "candle_solid",
		W = "candle_stroke",
		G = "candle_up_stroke",
		N = "candle_down_stroke",
		X = "ohlc",
		j = "area",
		U = "always",
		Z = "follow_cross",
		K = "standard",
		q = {
			grid: {
				show: !0,
				horizontal: {
					show: !0,
					size: 1,
					color: "#393939",
					style: R,
					dashValue: [2, 2]
				},
				vertical: {
					show: !0,
					size: 1,
					color: "#393939",
					style: R,
					dashValue: [2, 2]
				}
			},
			candle: {
				margin: {
					top: .2,
					bottom: .1
				},
				type: H,
				bar: {
					upColor: "#26A69A",
					downColor: "#EF5350",
					noChangeColor: "#888888"
				},
				area: {
					lineSize: 2,
					lineColor: "#2196F3",
					value: "close",
					fillColor: [{
						offset: 0,
						color: "rgba(33, 150, 243, 0.01)"
					}, {
						offset: 1,
						color: "rgba(33, 150, 243, 0.2)"
					}]
				},
				priceMark: {
					show: !0,
					high: {
						show: !0,
						color: "#D9D9D9",
						textMargin: 5,
						textSize: 2,
						textFamily: "Helvetica Neue",
						textWeight: "normal"
					},
					low: {
						show: !0,
						color: "#D9D9D9",
						textMargin: 5,
						textSize: 2,
						textFamily: "Helvetica Neue",
						textWeight: "normal"
					},
					last: {
						show: !0,
						upColor: "#26A69A",
						downColor: "#EF5350",
						noChangeColor: "#888888",
						line: {
							show: !0,
							style: R,
							dashValue: [4, 4],
							size: 1
						},
						text: {
							show: !0,
							size: 3,
							paddingLeft: 2,
							paddingTop: 2,
							paddingRight: 2,
							paddingBottom: 2,
							color: "#FFFFFF",
							family: "Helvetica Neue",
							weight: "normal"
						}
					}
				},
				tooltip: {
					showRule: U,
					showType: 'standard',
					labels: ['??????' ,"???" ,"???" , "???" ,"???" ,"?????????" , /* "??????", */"RMB" ],
					values: null,
					defaultValue: "n/a",
					rect: {
						paddingLeft: 0,
						paddingRight: 0,
						paddingTop: 0,
						paddingBottom:3,
						offsetLeft: 8,
						offsetTop: 8,
						offsetRight: 8,
						borderRadius: 4,	
						borderSize: 1,
						borderColor: "#3f4254",
						fillColor: "rgba(17, 17, 17, .3)",	
						// colors: ["#D9D9D9", "#D9D9D9","#D9D9D9", "#D9D9D9", "#D9D9D9","#D9D9D9","#E11D74"],
					},
					text: {
						size:3,
						family: "Helvetica Neue",
						weight: "normal",	
						 color: '#D9D9D9',
						// colors: ["#D9D9D9", "#D9D9D9","#D9D9D9", "#D9D9D9", "#D9D9D9","#D9D9D9","#E11D74"],
						marginLeft: 8,	
						marginTop: 6,
						marginRight: 8,
						marginBottom: 0
					}
				}
			},
			technicalIndicator: {
				margin: {
					top: .2,
					bottom: .1
				},
				bar: {
					upColor: "rgba(38, 166, 154, .65)",
					downColor: "rgba(239, 83, 80, .65)",
					noChangeColor: "#888888"
				},
				line: {
					size: 1,
					colors: ["#FF9600", "#9D65C9", "#2196F3", "#E11D74", "#01C5C4"]
				},
				circle: {
					upColor: "rgba(38, 166, 154, .65)",
					downColor: "rgba(239, 83, 80, .65)",
					noChangeColor: "#888888"
				},
				lastValueMark: {
					show: !1,
					text: {
						show: !1,
						color: "#ffffff",
						size: 3,
						family: "Helvetica Neue",
						weight: "normal",
						paddingLeft: 3,
						paddingTop: 2,
						paddingRight: 3,
						paddingBottom: 2
					}
				},
				tooltip: {
					showRule: U,
					showName: !0,
					showParams: !0,
					defaultValue: "n/a",
					text: {
						size: 3,
						family: "Helvetica Neue",
						weight: "normal",
						color: "#D9D9D9",
						marginTop: 6,
						marginRight: 8,
						marginBottom: 0,
						marginLeft: 8
					}
				}
			},
			xAxis: {
				show: !0,
				height: null,
				axisLine: {
					show: !0,
					color: "#888888",
					size: 1
				},
				tickText: {
					show: !0,
					color: "#D9D9D9",
					size: 3,
					family: "Helvetica Neue",
					weight: "normal",
					paddingTop: 3,
					paddingBottom: 6
				},
				tickLine: {
					show: !0,
					size: 1,
					length: 3,
					color: "#888888"
				}
			},
			yAxis: {
				show: !0,
				width: 35,
				type: "normal",
				position: B,
				inside: !1,
				axisLine: {
					show: !0,
					color: "#888888",
					size: 1
				},
				tickText: {
					show: !0,
					color: "#D9D9D9",
					size: 3,
					family: "Helvetica Neue",
					weight: "normal",
					paddingLeft: 3,
					paddingRight: 6
				},
				tickLine: {
					show: !0,
					size: 1,
					length: 3,
					color: "#888888"
				}
			},
			separator: {
				size: 1,
				color: "#888888",
				fill: !0,
				activeBackgroundColor: "rgba(33, 150, 243, 0.08)"
			},
			crosshair: {
				show: !0,
				horizontal: {
					show: !0,
					line: {
						show: !0,
						style: R,
						dashValue: [4, 2],
						size: 1,
						color: "#888888"
					},
					text: {
						show: !0,
						color: "#D9D9D9",
						size: 3,
						family: "Helvetica Neue",
						weight: "normal",
						paddingLeft: 2,
						paddingRight: 2,
						paddingTop: 2,
						paddingBottom: 2,
						borderSize: 1,
						borderColor: "#505050",
						backgroundColor: "#505050"
					}
				},
				vertical: {
					show: !0,
					line: {
						show: !0,
						style: R,
						dashValue: [4, 2],
						size: 1,
						color: "#888888"
					},
					text: {
						show: !0,
						color: "#D9D9D9",
						size: 3,
						family: "Helvetica Neue",
						weight: "normal",
						paddingLeft: 2,
						paddingRight: 2,
						paddingTop: 2,
						paddingBottom: 2,
						borderSize: 1,
						borderColor: "#505050",
						backgroundColor: "#505050"
					}
				}
			},
			graphicMark: {
				point: {
					backgroundColor: "#2196F3",
					borderColor: "rgba(33, 150, 243, 0.35)",
					borderSize: 1,
					radius: 5,
					activeBackgroundColor: "#2196F3",
					activeBorderColor: "rgba(33, 150, 243, 0.35)",
					activeBorderSize: 3,
					activeRadius: 5
				},
				line: {
					color: "#2196F3",
					size: 1,
					dashValue: [2, 2]
				},
				polygon: {
					stroke: {
						size: 1,
						color: "#2196F3"
					},
					fill: {
						color: "rgba(33, 150, 243, 0.1)"
					}
				},
				arc: {
					stroke: {
						size: 1,
						color: "#2196F3"
					},
					fill: {
						color: "rgba(33, 150, 243, 0.1)"
					}
				},
				text: {
					color: "#1e88e5",
					size: 3,
					family: "Helvetica Neue",
					weight: "normal",
					marginLeft: 2,
					marginRight: 2,
					marginTop: 2,
					marginBottom: 6
				}
			}
		};

	function $(t, e) {
		var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "--";
		if (t && L(t)) {
			var a = t[e];
			if (O(a)) return a
		}
		return i
	}

	function J(t, e) {
		var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "MM-DD hh:mm";
		if (V(e)) {
			var a = t.format(new Date(e)),
				n = a.split(", "),
				r = n[0].split("/"),
				o = {
					YYYY: r[2],
					MM: r[0],
					DD: r[1],
					"hh:mm": "24" === n[1].match(/^[\d]{2}/)[0] ? n[1].replace(/^[\d]{2}/, "00") : n[1]
				};
			return i.replace(/YYYY|MM|DD|(hh:mm)/g, (function(t) {
				return o[t]
			}))
		}
		return "--"
	}

	function Q(t) {
		var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2,
			i = +t;
		return (i || 0 === i) && V(i) ? i.toFixed(e) : "".concat(i)
	}

	function tt(t) {
		return V(+t) ? t > 1e9 ? "".concat(+(t / 1e9).toFixed(3), "B") : t > 1e6 ? "".concat(+(t / 1e6).toFixed(3), "M") :
			t > 1e3 ? "".concat(+(t / 1e3).toFixed(3), "K") : t : "--"
	}
	var et = "price",
		it = "volume",
		at = function() {
			function t(e) {
				var i = e.name,
					a = e.series,
					n = e.calcParams,
					r = e.plots,
					o = e.precision,
					s = e.shouldCheckParamCount,
					c = e.shouldOhlc,
					h = e.shouldFormatBigNumber,
					l = e.baseValue,
					u = e.minValue,
					d = e.maxValue,
					_ = e.styles;
				f(this, t), this.name = i || "", this.series = a || "normal", this.precision = O(o) && V(o) && o >= 0 ? o : 4,
					this.calcParams = S(n) ? n : [], this.plots = S(r) ? r : [], this.shouldCheckParamCount = !z(s) || s, this.shouldOhlc =
					c, this.shouldFormatBigNumber = h, this.baseValue = V(l) ? l : null, this.minValue = u, this.maxValue = d, this.styles =
					_, this.result = []
			}
			return m(t, [{
				key: "setPrecision",
				value: function(t) {
					return !(!V(t) || 0 > t) && (this.precision = parseInt(t, 10), !0)
				}
			}, {
				key: "setCalcParams",
				value: function(t) {
					if (!S(t)) return !1;
					if (this.shouldCheckParamCount && t.length !== this.calcParams.length) return !1;
					var e, i = C(t);
					try {
						for (i.s(); !(e = i.n()).done;) {
							var a = e.value;
							if (!V(a) || 0 >= a || parseInt(a, 10) !== a) return !1
						}
					} catch (t) {
						i.e(t)
					} finally {
						i.f()
					}
					this.calcParams = T(t);
					var n = this.regeneratePlots(t);
					return n && S(n) && (this.plots = n), !0
				}
			}, {
				key: "setStyles",
				value: function(t, e) {
					return !!L(t) && (this.styles || (this.styles = {
						bar: T(e.bar),
						line: T(e.line),
						circle: T(e.circle)
					}), I(this.styles, t), !0)
				}
			}, {
				key: "calcTechnicalIndicator",
				value: function(t, e) {}
			}, {
				key: "regeneratePlots",
				value: function(t) {}
			}]), t
		}();

	function nt(t) {
		var e = t.name,
			i = t.series,
			a = t.calcParams,
			n = t.plots,
			r = t.precision,
			o = t.shouldCheckParamCount,
			s = t.shouldOhlc,
			c = t.shouldFormatBigNumber,
			h = t.baseValue,
			l = t.minValue,
			u = t.maxValue,
			d = t.styles,
			_ = t.calcTechnicalIndicator,
			v = t.regeneratePlots,
			p = t.render;
		if (!e || !A(_)) return null;
		var m = function(t) {
			k(v, t);
			var _ = M(v);

			function v() {
				return f(this, v), _.call(this, {
					name: e,
					series: i,
					calcParams: a,
					plots: n,
					precision: r,
					shouldCheckParamCount: o,
					shouldOhlc: s,
					shouldFormatBigNumber: c,
					baseValue: h,
					minValue: l,
					maxValue: u,
					styles: d
				})
			}
			return v
		}(at);
		return m.prototype.calcTechnicalIndicator = _, v && A(v) && (m.prototype.regeneratePlots = v), p && A(p) && (m.prototype
			.render = p), new m
	}

	function rt(t) {
		return {
			name: t.name,
			series: t.series,
			calcParams: t.calcParams,
			precision: t.precision,
			styles: t.styles
		}
	}

	function ot() {
		var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			e = arguments.length > 1 ? arguments[1] : void 0,
			i = e.calcParams,
			a = e.plots,
			n = e.precision,
			r = e.shouldFormatBigNumber,
			o = [],
			s = "",
			c = "";
		return a.length > 0 && (s = e.name), i.length > 0 && (c = "(".concat(i.join(","), ")")), a.forEach((function(e) {
			var i = {};
			if (O(e.title)) {
				var a = t[e.key];
				O(a) && (a = Q(a, n), r && (a = tt(a))), i.title = e.title, i.value = a
			}
			o.push(i)
		})), {
			values: o,
			name: s,
			calcParamText: c
		}
	}

	function st(t, e, i, a) {
		t.fillStyle = e, t.beginPath(), t.arc(i.x, i.y, a, 0, 2 * Math.PI), t.closePath(), t.fill()
	}

	function ct(t, e) {
		var i = t.x - e.x;
		if (0 !== i) {
			var a = (t.y - e.y) / i;
			return {
				k: a,
				b: t.y - a * t.x
			}
		}
	}

	function ht(t, e, i) {
		return lt(ct(t, e), i)
	}

	function lt(t, e) {
		return t ? e.x * t.k + t.b : e.y
	}

	function ut(t, e, i) {
		if (!i || !t || !e) return !1;
		if (t.x === e.x) return 2 > Math.abs(i.x - t.x);
		var a = ct(t, e),
			n = lt(a, i),
			r = Math.abs(n - i.y);
		return 4 > r * r / (a.k * a.k + 1)
	}

	function dt(t, e, i) {
		return !!ut(t, e, i) && (t.x === e.x ? e.y > t.y ? 2 > t.y - i.y : 2 > i.y - t.y : e.x > t.x ? 2 > t.x - i.x : 2 >
			i.x - t.x)
	}

	function _t(t, e, i) {
		return !!ut(t, e, i) && (t.x === e.x ? 4 > Math.abs(t.y - i.y) + Math.abs(e.y - i.y) - Math.abs(t.y - e.y) : 4 >
			Math.abs(t.x - i.x) + Math.abs(e.x - i.x) - Math.abs(t.x - e.x))
	}

	function vt(t, e, i) {
		if (!i) return !1;
		var a = i.x - t.x,
			n = i.y - t.y;
		return !(a * a + n * n > e * e)
	}

	function ft(t, e) {
		var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
			a = [];
		if (t.length > 1)
			if (t[0].x === t[1].x) {
				var n = 0,
					r = e.y;
				if (a.push([{
						x: t[0].x,
						y: n
					}, {
						x: t[0].x,
						y: r
					}]), t.length > 2) {
					a.push([{
						x: t[2].x,
						y: n
					}, {
						x: t[2].x,
						y: r
					}]);
					for (var o = t[0].x - t[2].x, s = 0; i > s; s++) {
						var c = o * (s + 1);
						a.push([{
							x: t[0].x + c,
							y: n
						}, {
							x: t[0].x + c,
							y: r
						}])
					}
				}
			} else {
				var h = 0,
					l = e.x,
					u = ct(t[0], t[1]),
					d = u.k,
					_ = u.b;
				if (a.push([{
						x: h,
						y: h * d + _
					}, {
						x: l,
						y: l * d + _
					}]), t.length > 2) {
					var v = t[2].y - d * t[2].x;
					a.push([{
						x: h,
						y: h * d + v
					}, {
						x: l,
						y: l * d + v
					}]);
					for (var f = _ - v, p = 0; i > p; p++) {
						var m = _ + f * (p + 1);
						a.push([{
							x: h,
							y: h * d + m
						}, {
							x: l,
							y: l * d + m
						}])
					}
				}
			} return a
	}

	function pt(t, e, i, a) {
		t.beginPath();
		var n = t.lineWidth % 2 ? .5 : 0;
		t.moveTo(i, e + n), t.lineTo(a, e + n), t.stroke(), t.closePath()
	}

	function mt(t, e, i, a) {
		t.beginPath();
		var n = t.lineWidth % 2 ? .5 : 0;
		t.moveTo(e + n, i), t.lineTo(e + n, a), t.stroke(), t.closePath()
	}

	function yt(t, e) {
		t.save(), t.lineWidth % 2 && t.translate(.5, .5), e(), t.restore()
	}
	var xt = "other",
		gt = "point",
		kt = "none",
		wt = "line",
		Dt = "text",
		Pt = "continuous_line",
		Mt = "polygon",
		bt = "arc",
		Et = "stroke",
		Ct = "fill",
		It = "dash",
		Tt = 0,
		St = 1,
		At = 2;
	var Lt = function() {
			function t(e) {
				var i = e.id,
					a = e.name,
					n = e.totalStep,
					r = e.chartData,
					o = e.xAxis,
					s = e.yAxis,
					c = e.points,
					h = e.styles;
				f(this, t), this._id = i, this._name = a, this._totalStep = n, this._chartData = r, this._xAxis = o, this._yAxis =
					s, this._styles = null, this._drawStep = 1, this._tpPoints = [], this._applyPoints(c), this.setStyles(h)
			}
			return m(t, [{
				key: "_applyPoints",
				value: function(t) {
					if (S(t) && t.length > 0) {
						var e;
						this._totalStep - 1 > t.length ? (this._drawStep = t.length + 1, this._tpPoints = T(t), e = t.length) : (
							this._drawStep = -1, this._tpPoints = t.slice(0, this._totalStep - 1), e = this._totalStep - 1);
						for (var i = 0; e > i; i++) this.performMouseMoveForDrawing(i + 2, this._tpPoints, this._tpPoints[i], this._xAxis,
							this._yAxis); - 1 === this._drawStep && this.performMousePressedMove(this._tpPoints, this._tpPoints.length -
							1, this._tpPoints[this._tpPoints.length - 1], this._xAxis, this._yAxis)
					}
				}
			}, {
				key: "_timestampOrDataIndexToPointX",
				value: function(t) {
					var e = t.timestamp,
						i = t.dataIndex;
					return this._xAxis.convertToPixel(e ? this._chartData.timestampToDataIndex(e) : i)
				}
			}, {
				key: "_drawLines",
				value: function(t, e, i, a) {
					t.save(), t.strokeStyle = a.line.color, t.lineWidth = a.line.size, i === It && t.setLineDash(a.line.dashValue),
						e.forEach((function(e) {
							var i, a;
							if (e.length > 1) switch ((i = e[0]).x === (a = e[1]).x ? At : i.y === a.y ? St : Tt) {
								case Tt:
									yt(t, (function() {
										t.beginPath(), t.moveTo(e[0].x, e[0].y), t.lineTo(e[1].x, e[1].y), t.stroke(), t.closePath()
									}));
									break;
								case St:
									pt(t, e[0].y, e[0].x, e[1].x);
									break;
								case At:
									mt(t, e[0].x, e[0].y, e[1].y)
							}
						})), t.restore()
				}
			}, {
				key: "_drawContinuousLines",
				value: function(t, e, i, a) {
					t.save(), t.strokeStyle = a.line.color, t.lineWidth = a.line.size, i === It && t.setLineDash(a.line.dashValue),
						e.forEach((function(e) {
							e.length > 0 && yt(t, (function() {
								t.beginPath(), t.moveTo(e[0].x, e[0].y);
								for (var i = 1; e.length > i; i++) t.lineTo(e[i].x, e[i].y);
								t.stroke(), t.closePath()
							}))
						})), t.restore()
				}
			}, {
				key: "_drawPolygons",
				value: function(t, e, i, a) {
					var n;
					t.save(), i === Ct ? (t.fillStyle = a.polygon.fill.color, n = t.fill) : (t.lineWidth = a.polygon.stroke.size,
						t.strokeStyle = a.polygon.stroke.color, n = t.stroke), e.forEach((function(e) {
						e.length > 0 && yt(t, (function() {
							t.beginPath(), t.moveTo(e[0].x, e[0].y);
							for (var i = 1; e.length > i; i++) t.lineTo(e[i].x, e[i].y);
							t.closePath(), n.call(t)
						}))
					})), t.restore()
				}
			}, {
				key: "_drawArcs",
				value: function(t, e, i, a) {
					t.save(), i === Ct ? t.fillStyle = a.arc.fill.color : (t.lineWidth = a.arc.stroke.size, t.strokeStyle = a.arc
						.stroke.color), e.forEach((function(e) {
						var a = e.x,
							n = e.y,
							r = e.radius,
							o = e.startAngle,
							s = e.endAngle;
						t.beginPath(), t.arc(a, n, r, o, s), i === Ct ? (t.closePath(), t.fill()) : (t.stroke(), t.closePath())
					})), t.restore()
				}
			}, {
				key: "_drawText",
				value: function(t, e, i, a) {
					var n;
					t.save(), i === Et ? (t.strokeStyle = a.text.color, n = t.strokeText) : (t.fillStyle = a.text.color, n = t.fillText),
						t.font = "".concat(a.text.weight, " ").concat(a.text.size, "px ").concat(a.text.family), e.forEach((
							function(e) {
								n.call(t, e.text, e.x + a.text.marginLeft, e.y - a.text.marginBottom)
							})), t.restore()
				}
			}, {
				key: "draw",
				value: function(t) {
					var e = this,
						i = this._tpPoints.map((function(t) {
							var i = t.price;
							return {
								x: e._timestampOrDataIndexToPointX({
									timestamp: t.timestamp,
									dataIndex: t.dataIndex
								}),
								y: e._yAxis.convertToPixel(i)
							}
						})),
						a = this._styles || this._chartData.styleOptions().graphicMark;
					if (1 !== this._drawStep && i.length > 0) {
						var n = {
								width: this._xAxis.width(),
								height: this._yAxis.height()
							},
							r = {
								price: this._chartData.pricePrecision(),
								volume: this._chartData.volumePrecision()
							},
							o = this.createGraphicDataSource(this._drawStep, this._tpPoints, i, n, r, this._xAxis, this._yAxis) || [];
						o.forEach((function(i) {
							var n = i.type,
								r = i.isDraw,
								o = i.style,
								s = i.dataSource,
								c = void 0 === s ? [] : s;
							if (!O(r) || r) switch (n) {
								case wt:
									e._drawLines(t, c, o, a);
									break;
								case Pt:
									e._drawContinuousLines(t, c, o, a);
									break;
								case Mt:
									e._drawPolygons(t, c, o, a);
									break;
								case bt:
									e._drawArcs(t, c, o, a);
									break;
								case Dt:
									e._drawText(t, c, o, a)
							}
						})), this.drawExtend(t, o, a, n, r, this._xAxis, this._yAxis)
					}
					var s = this._chartData.graphicMarkMouseOperate();
					(s.hover.id === this._id && s.hover.element !== kt || s.click.id === this._id && s.click.element !== kt) &&
					i.forEach((function(i, n) {
						var r = i.x,
							o = i.y,
							c = a.point.radius,
							h = a.point.backgroundColor,
							l = a.point.borderColor,
							u = a.point.borderSize;
						s.hover.id === e._id && s.hover.element === gt && n === s.hover.elementIndex && (c = a.point.activeRadius,
							h = a.point.activeBackgroundColor, l = a.point.activeBorderColor, u = a.point.activeBorderSize), st(t,
							l, {
								x: r,
								y: o
							}, c + u), st(t, h, {
							x: r,
							y: o
						}, c)
					}))
				}
			}, {
				key: "setStyles",
				value: function(t) {
					return !!L(t) && (this._styles || (this._styles = T(this._chartData.styleOptions().graphicMark)), I(this._styles,
						t), !0)
				}
			}, {
				key: "id",
				value: function() {
					return this._id
				}
			}, {
				key: "isDrawing",
				value: function() {
					return -1 !== this._drawStep
				}
			}, {
				key: "checkMousePointOnGraphic",
				value: function(t, e) {
					for (var i = this._styles || this._chartData.styleOptions().graphicMark, a = [], n = 0; this._tpPoints.length >
						n; n++) {
						var r = this._tpPoints[n],
							o = r.price,
							s = {
								x: this._timestampOrDataIndexToPointX({
									timestamp: r.timestamp,
									dataIndex: r.dataIndex
								}),
								y: this._yAxis.convertToPixel(o)
							};
						if (a.push(s), vt(s, i.point.radius, t)) return {
							id: this._id,
							element: gt,
							elementIndex: n
						}
					}
					var c, h = C(this.createGraphicDataSource(this._drawStep, this._tpPoints, a, {
						width: this._xAxis.width(),
						height: this._yAxis.height()
					}, {
						price: this._chartData.pricePrecision(),
						volume: this._chartData.volumePrecision()
					}, this._xAxis, this._yAxis) || []);
					try {
						for (h.s(); !(c = h.n()).done;) {
							var l = c.value,
								u = l.key,
								d = l.type,
								_ = l.dataSource,
								v = void 0 === _ ? [] : _;
							if (l.isCheck)
								for (var f = 0; v.length > f; f++) {
									if (this.checkMousePointOn(u, d, v[f], t)) return {
										id: this._id,
										element: xt,
										elementIndex: f
									}
								}
						}
					} catch (t) {
						h.e(t)
					} finally {
						h.f()
					}
				}
			}, {
				key: "mouseMoveForDrawing",
				value: function(t) {
					var e = this._xAxis.convertFromPixel(t.x),
						i = this._chartData.dataIndexToTimestamp(e),
						a = this._yAxis.convertFromPixel(t.y);
					this._tpPoints[this._drawStep - 1] = {
						timestamp: i,
						price: a,
						dataIndex: e
					}, this.performMouseMoveForDrawing(this._drawStep, this._tpPoints, {
						timestamp: i,
						price: a,
						dataIndex: e
					}, this._xAxis, this._yAxis), this.onDrawing({
						id: this._id,
						step: this._drawStep,
						points: this._tpPoints
					})
				}
			}, {
				key: "mouseLeftButtonDownForDrawing",
				value: function() {
					this._drawStep === this._totalStep - 1 ? (this._drawStep = -1, this.onDrawEnd({
						id: this._id
					})) : this._drawStep++
				}
			}, {
				key: "mousePressedMove",
				value: function(t, e) {
					var i = this._chartData.graphicMarkMouseOperate(),
						a = i.click.elementIndex;
					if (i.click.id === this._id && i.click.element === gt && -1 !== a) {
						var n = this._xAxis.convertFromPixel(t.x),
							r = this._chartData.dataIndexToTimestamp(n),
							o = this._yAxis.convertFromPixel(t.y);
						this._tpPoints[a].timestamp = r, this._tpPoints[a].dataIndex = n, this._tpPoints[a].price = o, this.performMousePressedMove(
							this._tpPoints, a, {
								dataIndex: n,
								timestamp: r,
								price: o
							}, this._xAxis, this._yAxis), this.onPressedMove({
							id: i.click.id,
							event: e
						})
					}
				}
			}, {
				key: "onDrawStart",
				value: function(t) {}
			}, {
				key: "onDrawing",
				value: function(t) {}
			}, {
				key: "onDrawEnd",
				value: function(t) {}
			}, {
				key: "onClick",
				value: function(t) {}
			}, {
				key: "onRightClick",
				value: function(t) {}
			}, {
				key: "onPressedMove",
				value: function(t) {}
			}, {
				key: "onRemove",
				value: function(t) {}
			}, {
				key: "checkMousePointOn",
				value: function(t, e, i, a) {}
			}, {
				key: "createGraphicDataSource",
				value: function(t, e, i, a, n, r, o) {}
			}, {
				key: "performMouseMoveForDrawing",
				value: function(t, e, i, a, n) {}
			}, {
				key: "performMousePressedMove",
				value: function(t, e, i, a, n) {}
			}, {
				key: "drawExtend",
				value: function(t, e, i, a, n, r, o) {}
			}]), t
		}(),
		Vt = function() {
			function t() {
				f(this, t), this._observers = []
			}
			return m(t, [{
				key: "subscribe",
				value: function(t) {
					0 > this._observers.indexOf(t) && this._observers.push(t)
				}
			}, {
				key: "unsubscribe",
				value: function(t) {
					var e = this._observers.indexOf(t);
					e > -1 && this._observers.splice(e, 1)
				}
			}, {
				key: "execute",
				value: function(t) {
					this._observers.forEach((function(e) {
						e(t)
					}))
				}
			}, {
				key: "hasObservers",
				value: function() {
					return this._observers.length > 0
				}
			}]), t
		}();

	function Ot(t) {
		var e = t.name,
			i = t.totalStep,
			a = t.checkMousePointOn,
			n = t.createGraphicDataSource,
			r = t.performMousePressedMove,
			o = t.performMouseMoveForDrawing,
			s = t.drawExtend;
		if (!(e && V(i) && A(a) && A(n))) return null;
		var c = function(t) {
			k(n, t);
			var a = M(n);

			function n(t) {
				var r = t.id,
					o = t.chartData,
					s = t.xAxis,
					c = t.yAxis,
					h = t.points,
					l = t.styles;
				return f(this, n), a.call(this, {
					id: r,
					name: e,
					totalStep: i,
					chartData: o,
					xAxis: s,
					yAxis: c,
					points: h,
					styles: l
				})
			}
			return n
		}(Lt);
		return c.prototype.checkMousePointOn = a, c.prototype.createGraphicDataSource = n, A(r) && (c.prototype.performMousePressedMove =
			r), A(o) && (c.prototype.performMouseMoveForDrawing = o), A(s) && (c.prototype.drawExtend = s), c
	}
	var zt = 1,
		Rt = 2,
		Ft = 3,
		Bt = 4,
		Yt = {
			drawCandle: "drawCandle",
			drawTechnicalIndicator: "drawTechnicalIndicator",
			zoom: "zoom",
			scroll: "scroll"
		},
		Ht = "action",
		Wt = "id",
		Gt = function() {
			function t(e, i) {
				f(this, t), this._invalidateHandler = i, this._styleOptions = T(q), I(this._styleOptions, e), this._technicalIndicatorMapping =
					function() {
						var t = {},
							e = _.technicalIndicatorExtensions;
						for (var i in e) {
							var a = nt(e[i]);
							a && (t[i] = a)
						}
						return t
					}(), this._zoomEnabled = !0, this._scrollEnabled = !0, this._pricePrecision = 2, this._volumePrecision = 0, this
					._dateTimeFormat = new Intl.DateTimeFormat("en", {
						hour12: !1,
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "2-digit",
						minute: "2-digit"
					}), this._dataList = [], this._loading = !0, this._loadMoreCallback = null, this._more = !0, this._totalDataSpace =
					0, this._dataSpace = 6, this._barSpace = this._calcBarSpace(), this._offsetRightSpace = 50, this._offsetRightBarCount =
					this._offsetRightSpace / this._dataSpace, this._leftMinVisibleBarCount = 2, this._rightMinVisibleBarCount = 2,
					this._from = 0, this._to = 0, this._crosshair = {}, this._preOffsetRightBarCount = 0, this._dragGraphicMarkFlag = !
					1, this._graphicMarkMapping = function() {
						var t = {},
							e = _.graphicMarkExtensions;
						for (var i in e) {
							var a = Ot(e[i]);
							a && (t[i] = a)
						}
						return t
					}(), this._graphicMarkMouseOperate = {
						click: {
							id: "",
							element: kt,
							elementIndex: -1
						},
						hover: {
							id: "",
							element: kt,
							elementIndex: -1
						}
					}, this._graphicMarks = [], this._dragPaneFlag = !1, this._actionDelegate = {}
			}
			return m(t, [{
				key: "_calcBarSpace",
				value: function() {
					return Math.max(1, Math.min(Math.floor(.8 * this._dataSpace), Math.floor(this._dataSpace) - 1))
				}
			}, {
				key: "_innerSetDataSpace",
				value: function(t) {
					return !(!t || 1 > t || t > 50 || this._dataSpace === t) && (this._dataSpace = t, this._barSpace = this._calcBarSpace(),
						!0)
				}
			}, {
				key: "_adjustFromTo",
				value: function() {
					var t = this._dataList.length,
						e = this._totalDataSpace / this._dataSpace,
						i = this._barSpace / 2 / this._dataSpace,
						a = e - Math.min(this._leftMinVisibleBarCount, t) + (1 - i);
					this._offsetRightBarCount > a && (this._offsetRightBarCount = a);
					var n = -t + Math.min(this._rightMinVisibleBarCount, t) + i;
					n > this._offsetRightBarCount && (this._offsetRightBarCount = n), this._to = Math.round(this._offsetRightBarCount +
							t), this._from = Math.floor(this._to - e) - 1, this._to > t && (this._to = t), 0 > this._from && (this._from =
							0), 0 === this._from && this._more && !this._loading && this._loadMoreCallback && A(this._loadMoreCallback) &&
						(this._loading = !0, this._loadMoreCallback($(this._dataList[0], "timestamp")))
				}
			}, {
				key: "styleOptions",
				value: function() {
					return this._styleOptions
				}
			}, {
				key: "applyStyleOptions",
				value: function(t) {
					I(this._styleOptions, t)
				}
			}, {
				key: "technicalIndicatorInfo",
				value: function(t) {
					if (!O(t)) {
						var e = {};
						for (var i in this._technicalIndicatorMapping) {
							e[i] = rt(this._technicalIndicatorMapping[i])
						}
						return e
					}
					var a = this.technicalIndicator(t);
					return a ? rt(a) : {}
				}
			}, {
				key: "technicalIndicator",
				value: function(t) {
					return this._technicalIndicatorMapping[t]
				}
			}, {
				key: "pricePrecision",
				value: function() {
					return this._pricePrecision
				}
			}, {
				key: "volumePrecision",
				value: function() {
					return this._volumePrecision
				}
			}, {
				key: "dateTimeFormat",
				value: function() {
					return this._dateTimeFormat
				}
			}, {
				key: "setTimezone",
				value: function(t) {
					var e;
					try {
						e = new Intl.DateTimeFormat("en", {
							hour12: !1,
							timeZone: t,
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
							hour: "2-digit",
							minute: "2-digit"
						})
					} catch (t) {}
					e && (this._dateTimeFormat = e)
				}
			}, {
				key: "timezone",
				value: function() {
					return this._dateTimeFormat.resolvedOptions().timeZone
				}
			}, {
				key: "applyPriceVolumePrecision",
				value: function(t, e) {
					for (var i in this._pricePrecision = t, this._volumePrecision = e, this._technicalIndicatorMapping) {
						switch (this._technicalIndicatorMapping[i].series) {
							case et:
								this._technicalIndicatorMapping[i].setPrecision(t);
								break;
							case it:
								this._technicalIndicatorMapping[i].setPrecision(e)
						}
					}
				}
			}, {
				key: "applyTechnicalIndicatorPrecision",
				value: function(t, e) {
					var i = this.technicalIndicator(e);
					if (i) i.setPrecision(t);
					else
						for (var a in this._technicalIndicatorMapping) this._technicalIndicatorMapping[a].setPrecision(t)
				}
			}, {
				key: "dataList",
				value: function() {
					return this._dataList
				}
			}, {
				key: "clearDataList",
				value: function() {
					this._more = !0, this._loading = !0, this._dataList = [], this._from = 0, this._to = 0
				}
			}, {
				key: "addData",
				value: function(t, e, i) {
					if (L(t))
						if (S(t)) {
							this._loading = !1, this._more = !z(i) || i;
							var a = 0 === this._dataList.length;
							this._dataList = t.concat(this._dataList), a ? this.setOffsetRightSpace(this._offsetRightSpace) : this._adjustFromTo()
						} else {
							this._dataList.length > e ? this._dataList[e] = t : (this._dataList.push(t), 0 > this._offsetRightBarCount &&
								(this._offsetRightBarCount -= 1), this._adjustFromTo())
						}
				}
			}, {
				key: "dataSpace",
				value: function() {
					return this._dataSpace
				}
			}, {
				key: "barSpace",
				value: function() {
					return this._barSpace
				}
			}, {
				key: "offsetRightBarCount",
				value: function() {
					return this._offsetRightBarCount
				}
			}, {
				key: "setDataSpace",
				value: function(t) {
					this._innerSetDataSpace(t) && (this._adjustFromTo(), this.invalidate())
				}
			}, {
				key: "setTotalDataSpace",
				value: function(t) {
					this._totalDataSpace !== t && (this._totalDataSpace = t, this._adjustFromTo())
				}
			}, {
				key: "setOffsetRightSpace",
				value: function(t) {
					this._offsetRightSpace = t, this._offsetRightBarCount = t / this._dataSpace, this._adjustFromTo()
				}
			}, {
				key: "setLeftMinVisibleBarCount",
				value: function(t) {
					this._leftMinVisibleBarCount = t
				}
			}, {
				key: "setRightMinVisibleBarCount",
				value: function(t) {
					this._rightMinVisibleBarCount = t
				}
			}, {
				key: "from",
				value: function() {
					return this._from
				}
			}, {
				key: "to",
				value: function() {
					return this._to
				}
			}, {
				key: "crosshair",
				value: function() {
					return this._crosshair
				}
			}, {
				key: "setCrosshairPointPaneId",
				value: function(t, e) {
					var i = t || {};
					this._crosshair.x === i.x && this._crosshair.y === i.y && this._crosshair.paneId === e || (this._crosshair =
						g(g({}, t), {}, {
							paneId: e
						}), this.invalidate(Rt))
				}
			}, {
				key: "startScroll",
				value: function() {
					this._preOffsetRightBarCount = this._offsetRightBarCount
				}
			}, {
				key: "scroll",
				value: function(t) {
					if (this._scrollEnabled) {
						var e = t / this._dataSpace;
						this.actionExecute("scroll", {
							barCount: e,
							distance: t
						}), this._offsetRightBarCount = this._preOffsetRightBarCount - e, this._adjustFromTo(), this.invalidate()
					}
				}
			}, {
				key: "coordinateToFloatIndex",
				value: function(t) {
					return Math.round(1e6 * (this._dataList.length + this._offsetRightBarCount - (this._totalDataSpace - t) /
						this._dataSpace)) / 1e6
				}
			}, {
				key: "dataIndexToTimestamp",
				value: function(t) {
					var e = this._dataList[t];
					if (e) return e.timestamp
				}
			}, {
				key: "timestampToDataIndex",
				value: function(t) {
					return 0 === this._dataList.length ? 0 : function(t, e, i) {
						var a = 0,
							n = 0;
						for (n = t.length - 1; a !== n;) {
							var r = Math.floor((n + a) / 2),
								o = n - a,
								s = t[r][e];
							if (i === t[a][e]) return a;
							if (i === t[n][e]) return n;
							if (i === s) return r;
							if (i > s ? a = r : n = r, 2 >= o) break
						}
						return a
					}(this._dataList, "timestamp", t)
				}
			}, {
				key: "zoom",
				value: function(t, e) {
					if (this._zoomEnabled) {
						e && !O(e.x) || (e = {
							x: O(this._crosshair.x) ? this._crosshair.x : this._totalDataSpace / 2
						}), this.actionExecute("zoom", {
							point: e,
							scale: t
						});
						var i = this.coordinateToFloatIndex(e.x);
						this._innerSetDataSpace(this._dataSpace + t * (this._dataSpace / 10)) && (this._offsetRightBarCount += i -
							this.coordinateToFloatIndex(e.x), this._adjustFromTo(), this.invalidate())
					}
				}
			}, {
				key: "invalidate",
				value: function(t) {
					this._invalidateHandler(t)
				}
			}, {
				key: "setZoomEnabled",
				value: function(t) {
					this._zoomEnabled = t
				}
			}, {
				key: "zoomEnabled",
				value: function() {
					return this._zoomEnabled
				}
			}, {
				key: "setScrollEnabled",
				value: function(t) {
					this._scrollEnabled = t
				}
			}, {
				key: "scrollEnabled",
				value: function() {
					return this._scrollEnabled
				}
			}, {
				key: "loadMore",
				value: function(t) {
					this._loadMoreCallback = t
				}
			}, {
				key: "clearGraphicMark",
				value: function() {
					this._graphicMarks.length > 0 && (this._graphicMarks = [], this.invalidate(zt))
				}
			}, {
				key: "addGraphicMarkInstance",
				value: function(t) {
					var e, i = C(this._graphicMarks);
					try {
						for (i.s(); !(e = i.n()).done;) {
							if (e.value.id() === t.id()) return !1
						}
					} catch (t) {
						i.e(t)
					} finally {
						i.f()
					}
					var a = this._graphicMarks[this._graphicMarks.length - 1];
					return a && a.isDrawing() ? this._graphicMarks[this._graphicMarks.length - 1] = t : this._graphicMarks.push(
						t), this.invalidate(zt), !0
				}
			}, {
				key: "addCustomGraphicMark",
				value: function(t) {
					var e = Ot(t);
					e && (this._graphicMarkMapping[t.name] = e)
				}
			}, {
				key: "setGraphicMarkOptions",
				value: function(t) {
					var e, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
						a = i.styles,
						n = C(this._graphicMarks);
					try {
						for (n.s(); !(e = n.n()).done;) {
							var r = e.value;
							if (r.id() === t) {
								r.setStyles(a) && this.invalidate(zt);
								break
							}
						}
					} catch (t) {
						n.e(t)
					} finally {
						n.f()
					}
				}
			}, {
				key: "removeGraphicMarkInstance",
				value: function(t) {
					var e = this._graphicMarks,
						i = -1;
					if (t.type === Wt) {
						for (var a = 0; e.length > a; a++)
							if (t.id === e[a].id()) {
								i = a;
								break
							}
					} else i = t.index; - 1 !== i && (e[i].onRemove({
						id: e[i].id()
					}), e.splice(i, 1), this.invalidate(zt))
				}
			}, {
				key: "dragGraphicMarkFlag",
				value: function() {
					return this._dragGraphicMarkFlag
				}
			}, {
				key: "setDragGraphicMarkFlag",
				value: function(t) {
					this._dragGraphicMarkFlag = t
				}
			}, {
				key: "setGraphicMarkMouseOperate",
				value: function(t, e) {
					var i = this._graphicMarkMouseOperate,
						a = i.hover,
						n = i.click,
						r = this._graphicMarks[this._graphicMarks.length - 1],
						o = !1;
					!t || a.id === t.id && a.element === t.element && a.elementIndex === t.elementIndex || (this._graphicMarkMouseOperate
							.hover = g({}, t), o = !0), !e || n.id === e.id && n.element === e.element && n.elementIndex === e.elementIndex ||
						(this._graphicMarkMouseOperate.click = g({}, e), o = !0), (o || r && r.isDrawing()) && this.invalidate(zt)
				}
			}, {
				key: "graphicMarkMouseOperate",
				value: function() {
					return this._graphicMarkMouseOperate
				}
			}, {
				key: "dragPaneFlag",
				value: function() {
					return this._dragPaneFlag
				}
			}, {
				key: "setDragPaneFlag",
				value: function(t) {
					this._dragPaneFlag = t
				}
			}, {
				key: "graphicMarkMapping",
				value: function() {
					return this._graphicMarkMapping
				}
			}, {
				key: "graphicMarks",
				value: function() {
					return this._graphicMarks
				}
			}, {
				key: "addCustomTechnicalIndicator",
				value: function(t) {
					var e = nt(t || {});
					e && (this._technicalIndicatorMapping[e.name] = e)
				}
			}, {
				key: "actionExecute",
				value: function(t, e, i, a) {
					var n = this._actionDelegate[t];
					n && n.hasObservers() && (i && i(), n.execute(e), a && a())
				}
			}, {
				key: "subscribeAction",
				value: function(t, e) {
					if (!(t in Yt)) return !1;
					var i = this._actionDelegate[t];
					return i || (i = new Vt, this._actionDelegate[t] = i), i.subscribe(e), !0
				}
			}, {
				key: "unsubscribeAction",
				value: function(t, e) {
					if (!(t in Yt)) return !1;
					var i = this._actionDelegate[t];
					return !(!i || (i.unsubscribe(e), i.hasObservers())) && (delete this._actionDelegate[t], !0)
				}
			}]), t
		}();

	function Nt(t) {
		return t.ownerDocument && t.ownerDocument.defaultView && t.ownerDocument.defaultView.devicePixelRatio || 1
	}

	function Xt(t, e) {
		return Math.round(t.measureText(e).width)
	}

	function jt() {
		var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 12,
			e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "normal",
			i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Helvetica Neue";
		return "".concat(e, " ").concat(t, "px ").concat(i)
	}
	var Ut = function() {
			function t(e) {
				f(this, t), this._height = -1, this._container = e.container, this._chartData = e.chartData, this._initBefore(e),
					this._initElement(), this._mainWidget = this._createMainWidget(this._element, e), this._yAxisWidget = this._createYAxisWidget(
						this._element, e)
			}
			return m(t, [{
				key: "_initBefore",
				value: function(t) {}
			}, {
				key: "_initElement",
				value: function() {
					this._element = document.createElement("div"), this._element.style.margin = "0", this._element.style.padding =
						"0", this._element.style.position = "relative", this._element.style.overflow = "hidden", this._element.style
						.width = "100%";
					var t = this._container.lastChild;
					t ? this._container.insertBefore(this._element, t) : this._container.appendChild(this._element)
				}
			}, {
				key: "_createMainWidget",
				value: function(t, e) {}
			}, {
				key: "_createYAxisWidget",
				value: function(t, e) {}
			}, {
				key: "computeAxis",
				value: function() {}
			}, {
				key: "width",
				value: function() {
					return this._element.offsetWidth
				}
			}, {
				key: "setWidth",
				value: function(t, e) {
					this._mainWidget.setWidth(t), this._yAxisWidget && this._yAxisWidget.setWidth(e)
				}
			}, {
				key: "height",	
				value: function() {
					//????????????????????????
					// console.log(this._height)
					return this._height
				}
			}, {
				key: "setHeight",
				value: function(t) {
					// console.log(t)
					this._height = t, this._mainWidget.setHeight(t), this._yAxisWidget && this._yAxisWidget.setHeight(t)
				}
			}, {
				key: "setOffsetLeft",
				value: function(t, e) {
					this._mainWidget.setOffsetLeft(t), this._yAxisWidget && this._yAxisWidget.setOffsetLeft(e)
				}
			}, {
				key: "layout",
				value: function() {
					this._element.offsetHeight !== this._height && (this._element.style.height = "".concat(this._height, "px")),
						this._mainWidget.layout(), this._yAxisWidget && this._yAxisWidget.layout()
				}
			}, {
				key: "invalidate",
				value: function(t) {
					this._yAxisWidget && this._yAxisWidget.invalidate(t), this._mainWidget.invalidate(t)
				}
			}, {
				key: "getImage",
				value: function(t, e) {
					var i = document.createElement("canvas"),
						a = i.getContext("2d"),
						n = Nt(i),
						r = this._element.offsetWidth,
						o = this._element.offsetHeight;
					i.style.width = "".concat(r, "px"), i.style.height = "".concat(o, "px"), i.width = r * n, i.height = o * n,
						a.scale(n, n);
					var s = this._mainWidget.getElement(),
						c = s.offsetWidth,
						h = s.offsetHeight,
						l = parseInt(s.style.left, 10);
					if (a.drawImage(this._mainWidget.getImage(t, e), l, 0, c, h), this._yAxisWidget) {
						var u = this._yAxisWidget.getElement(),
							d = u.offsetWidth,
							_ = u.offsetHeight,
							v = parseInt(u.style.left, 10);
						a.drawImage(this._yAxisWidget.getImage(t), v, 0, d, _)
					}
					return i
				}
			}, {
				key: "destroy",
				value: function() {
					this._container.removeChild(this._element)
				}
			}]), t
		}(),
		Zt = function() {
			function t(e) {
				f(this, t), this._width = 0, this._height = 0, this._initElement(e.container), this._mainView = this._createMainView(
					this._element, e), this._expandView = this._createExpandView(this._element, e), this._crosshairView = this._createCrosshairView(
					this._element, e)
			}
			return m(t, [{
				key: "_initElement",
				value: function(t) {
					this._element = document.createElement("div"), this._element.style.top = "0", this._element.style.margin =
						"0", this._element.style.padding = "0", this._element.style.position = "absolute", this._element.style.overflow =
						"hidden", t.appendChild(this._element)
				}
			}, {
				key: "_createMainView",
				value: function(t, e) {}
			}, {
				key: "_createExpandView",
				value: function(t, e) {}
			}, {
				key: "_createCrosshairView",
				value: function(t, e) {}
			}, {
				key: "getElement",
				value: function() {
					return this._element
				}
			}, {
				key: "setWidth",
				value: function(t) {
					this._width = t, this._mainView.setWidth(t), this._crosshairView.setWidth(t), this._expandView && this._expandView
						.setWidth(t)
				}
			}, {
				key: "setHeight",
				value: function(t) {
					this._height = t, this._mainView.setHeight(t), this._crosshairView.setHeight(t), this._expandView && this._expandView
						.setHeight(t)
				}
			}, {
				key: "setOffsetLeft",
				value: function(t) {
					this._element.style.left = "".concat(t, "px")
				}
			}, {
				key: "layout",
				value: function() {
					this._element.offsetWidth !== this._width && (this._element.style.width = "".concat(this._width, "px")),
						this._element.offsetHeight !== this._height && (this._element.style.height = "".concat(this._height, "px")),
						this._mainView.layout(), this._crosshairView.layout(), this._expandView && this._expandView.layout()
				}
			}, {
				key: "invalidate",
				value: function(t) {
					switch (t) {
						case zt:
							this._expandView && this._expandView.flush();
							break;
						case Rt:
							this._crosshairView.flush();
							break;
						case Ft:
						case Bt:
							this._mainView.flush(), this._crosshairView.flush(), this._expandView && this._expandView.flush()
					}
				}
			}, {
				key: "getImage",
				value: function(t, e) {
					var i = document.createElement("canvas"),
						a = i.getContext("2d"),
						n = Nt(i);
					return i.style.width = "".concat(this._width, "px"), i.style.height = "".concat(this._height, "px"), i.width =
						this._width * n, i.height = this._height * n, a.scale(n, n), a.drawImage(this._mainView.getImage(), 0, 0,
							this._width, this._height), e && this._expandView && a.drawImage(this._expandView.getImage(), 0, 0, this._width,
							this._height), t && a.drawImage(this._crosshairView.getImage(), 0, 0, this._width, this._height), i
				}
			}]), t
		}();
	var Kt = "line",
		qt = "bar",
		$t = "circle",
		Jt = function() {
			function t(e, i) {
				f(this, t), this._chartData = i, this._initCanvas(e)
			}
			return m(t, [{
				key: "_initCanvas",
				value: function(t) {
					this._canvas = document.createElement("canvas"), this._canvas.style.position = "absolute", this._canvas.style
						.top = "0", this._canvas.style.left = "0", this._canvas.style.zIndex = "2", this._ctx = this._canvas.getContext(
							"2d"), t.appendChild(this._canvas)
				}
			}, {
				key: "_redraw",
				value: function(t) {
					this._ctx.clearRect(0, 0, this._canvas.offsetWidth, this._canvas.offsetHeight), t && t(), this._draw()
				}
			}, {
				key: "_draw",
				value: function() {}
			}, {
				key: "setWidth",
				value: function(t) {
					this._width = t
				}
			}, {
				key: "setHeight",
				value: function(t) {
					this._height = t
				}
			}, {
				key: "layout",
				value: function() {
					var t = this;
					this._height !== this._canvas.offsetHeight || this._width !== this._canvas.offsetWidth ? this._redraw((
						function() {
							var e = Nt(t._canvas);
							t._canvas.style.width = "".concat(t._width, "px"), t._canvas.style.height = "".concat(t._height, "px"),
								t._canvas.width = t._width * e, t._canvas.height = t._height * e, t._ctx.scale(e, e)
						})) : this.flush()
				}
			}, {
				key: "flush",
				value: function() {
					var t, e, i = this;
					this.requestAnimationId && (t = this.requestAnimationId, window.cancelAnimationFrame || clearTimeout(t),
						window.cancelAnimationFrame(t)), this.requestAnimationId = (e = function() {
						i._redraw()
					}, window.requestAnimationFrame ? window.requestAnimationFrame(e) : window.setTimeout((function() {
						e()
					}), 1e3 / 60))
				}
			}, {
				key: "getImage",
				value: function() {
					return this._canvas
				}
			}]), t
		}(),
		Qt = function(t) {
			k(i, t);
			var e = M(i);

			function i(t, a, n, r, o) {
				var s;
				return f(this, i), (s = e.call(this, t, a))._xAxis = n, s._yAxis = r, s._additionalDataProvider = o, s
			}
			return m(i, [{
				key: "_draw",
				value: function() {
					this._drawGrid(), this._drawTechnicalIndicators()
				}
			}, {
				key: "_drawGrid",
				value: function() {
					var t = this,
						e = this._chartData.styleOptions().grid;
					if (e.show) {
						var i = e.horizontal;
						this._ctx.save(), i.show && (this._ctx.strokeStyle = i.color, this._ctx.lineWidth = i.size, i.style === R &&
							this._ctx.setLineDash(i.dashValue), this._yAxis.ticks().forEach((function(e) {
								pt(t._ctx, e.y, 0, t._width)
							})));
						var a = e.vertical;
						a.show && (this._ctx.strokeStyle = a.color, this._ctx.lineWidth = a.size, this._ctx.setLineDash(a.style ===
							R ? a.dashValue : []), this._xAxis.ticks().forEach((function(e) {
							mt(t._ctx, e.x, 0, t._height)
						}))), this._ctx.restore()
					}
				}
			}, {
				key: "_drawTechnicalIndicators",
				value: function() {
					var t = this,
						e = this._chartData.styleOptions().technicalIndicator;
					this._additionalDataProvider.technicalIndicators().forEach((function(i) {
						var a = i.plots,
							n = [],
							r = t._chartData.dataList(),
							o = i.result,
							s = i.styles || e;
						i.render && (t._ctx.save(), i.render(t._ctx, {
							from: t._chartData.from(),
							to: t._chartData.to(),
							kLineDataList: t._chartData.dataList(),
							technicalIndicatorDataList: o
						}, {
							width: t._width,
							height: t._height,
							dataSpace: t._chartData.dataSpace(),
							barSpace: t._chartData.barSpace()
						}, s, {
							convertFromPixel: t._xAxis.convertFromPixel.bind(t._xAxis),
							convertToPixel: t._xAxis.convertToPixel.bind(t._xAxis)
						}, {
							convertFromPixel: t._yAxis.convertFromPixel.bind(t._yAxis),
							convertToPixel: t._yAxis.convertToPixel.bind(t._yAxis)
						}, t._yAxis.isCandleYAxis()), t._ctx.restore());
						var c = i.baseValue;
						O(c) || (c = t._yAxis.min());
						var h = t._yAxis.convertToPixel(c),
							l = t._yAxis.isCandleYAxis();
						t._ctx.lineWidth = 1, t._drawGraphics((function(e, c, u, d, _) {
							var v = o[c] || {},
								f = 0;
							i.shouldOhlc && !l && t._drawCandleBar(e, d, _, c, u, s.bar, X);
							var p = {};
							a.forEach((function(a) {
								var m = v[a.key],
									y = t._yAxis.convertToPixel(m);
								switch (p[a.key] = y, a.type) {
									case $t:
										if (O(m)) {
											var x = {
													preData: {
														kLineData: r[c - 1],
														technicalIndicatorData: o[c - 1]
													},
													currentData: {
														kLineData: u,
														technicalIndicatorData: v
													},
													nextData: {
														kLineData: r[c + 1],
														technicalIndicatorData: o[c + 1]
													}
												},
												k = {
													x: e,
													y: y,
													radius: d,
													color: a.color && a.color(x, s) || s.circle.noChangeColor,
													isStroke: !a.isStroke || a.isStroke(x)
												};
											t._drawCircle(k)
										}
										break;
									case qt:
										if (O(m)) {
											var w = {
													preData: {
														kLineData: r[c - 1],
														technicalIndicatorData: o[c - 1]
													},
													currentData: {
														kLineData: u,
														technicalIndicatorData: v
													},
													nextData: {
														kLineData: r[c + 1],
														technicalIndicatorData: o[c + 1]
													}
												},
												D = Math.abs(h - y),
												P = {
													x: e - d,
													width: 2 * d,
													height: Math.max(1, D)
												};
											P.y = y > h ? h : 1 > D ? h - 1 : y, P.color = a.color && a.color(w, s) || s.bar.noChangeColor,
												P.isStroke = !!a.isStroke && a.isStroke(w), t._drawBar(P)
										}
										break;
									case Kt:
										var M = null;
										O(m) && (M = {
											x: e,
											y: y
										}), n[f] ? n[f].push(M) : n[f] = [M], f++
								}
								t._drawActionExecute("drawTechnicalIndicator", {
									ctx: t._ctx,
									kLineData: u,
									dataIndex: c,
									technicalIndicatorData: v,
									technicalIndicatorName: i.name,
									coordinate: g({
										x: e
									}, p),
									viewport: {
										width: t._width,
										height: t._height
									},
									barSpace: _,
									halfBarSpace: d,
									isCandle: l
								})
							}))
						}), (function() {
							t._drawLines(n, s)
						}))
					}))
				}
			}, {
				key: "_drawLines",
				value: function(t, e) {
					var i = this,
						a = e.line.colors || [],
						n = a.length;
					this._ctx.lineWidth = e.line.size, yt(this._ctx, (function() {
						t.forEach((function(t, e) {
							i._ctx.strokeStyle = a[e % n], i._ctx.beginPath();
							var r = !0;
							t.forEach((function(t) {
								O(t) && (r ? (i._ctx.moveTo(t.x, t.y), r = !1) : i._ctx.lineTo(t.x, t.y))
							})), i._ctx.stroke(), i._ctx.closePath()
						}))
					}))
				}
			}, {
				key: "_drawBar",
				value: function(t) {
					t.isStroke ? (this._ctx.strokeStyle = t.color, this._ctx.strokeRect(t.x + .5, t.y, t.width - 1, t.height)) :
						(this._ctx.fillStyle = t.color, this._ctx.fillRect(t.x, t.y, t.width, t.height))
				}
			}, {
				key: "_drawCircle",
				value: function(t) {
					this._ctx.strokeStyle = t.color, this._ctx.fillStyle = t.color, this._ctx.beginPath(), this._ctx.arc(t.x, t.y,
						t.radius, 2 * Math.PI, 0, !0), t.isStroke ? this._ctx.stroke() : this._ctx.fill(), this._ctx.closePath()
				}
			}, {
				key: "_drawGraphics",
				value: function(t, e) {
					for (var i = this._chartData.dataList(), a = i.length, n = this._chartData.barSpace(), r = this._chartData.dataSpace(),
							o = n / 2, s = this._chartData.offsetRightBarCount(), c = this._chartData.to(), h = this._chartData.from(); c >
						h; h++) {
						t(this._width - (a + s - h - .5) * r + o, h, i[h], o, n)
					}
					e && e()
				}
			}, {
				key: "_drawCandleBar",
				value: function(t, e, i, a, n, r, o) {
					var s = n.open,
						c = n.close,
						h = n.high,
						l = n.low;
					c > s ? (this._ctx.strokeStyle = r.upColor, this._ctx.fillStyle = r.upColor) : s > c ? (this._ctx.strokeStyle =
						r.downColor, this._ctx.fillStyle = r.downColor) : (this._ctx.strokeStyle = r.noChangeColor, this._ctx.fillStyle =
						r.noChangeColor);
					var u = this._yAxis.convertToPixel(s),
						d = this._yAxis.convertToPixel(c),
						_ = this._yAxis.convertToPixel(h),
						v = this._yAxis.convertToPixel(l),
						f = Math.min(u, d),
						p = Math.max(u, d);
					this._ctx.fillRect(t - .5, _, 1, f - _), this._ctx.fillRect(t - .5, p, 1, v - p);
					var m = Math.max(1, p - f);
					switch (o) {
						case H:
							this._ctx.fillRect(t - e, f, i, m);
							break;
						case W:
							this._ctx.strokeRect(t - e + .5, f, i - 1, m);
							break;
						case G:
							c > s ? this._ctx.strokeRect(t - e + .5, f, i - 1, m) : this._ctx.fillRect(t - e, f, i, m);
							break;
						case N:
							c > s ? this._ctx.fillRect(t - e, f, i, m) : this._ctx.strokeRect(t - e + .5, f, i - 1, m);
							break;
						default:
							this._ctx.fillRect(t - .5, _, 1, v - _), this._ctx.fillRect(t - e, u - .5, e, 1), this._ctx.fillRect(t, d -
								.5, e, 1)
					}
					this._drawActionExecute("drawCandle", {
						ctx: this._ctx,
						dataIndex: a,
						kLineData: n,
						coordinate: {
							x: t,
							open: u,
							close: d,
							high: _,
							low: v
						},
						viewport: {
							width: this._width,
							height: this._height
						},
						barSpace: i,
						halfBarSpace: e,
						isCandle: this._yAxis.isCandleYAxis()
					})
				}
			}, {
				key: "_drawActionExecute",
				value: function(t, e) {
					var i = this;
					this._chartData.actionExecute(t, e, (function() {
						i._ctx.save()
					}), (function() {
						i._ctx.restore()
					}))
				}
			}]), i
		}(Jt);

	function te(t, e, i, a, n) {
		t.fillStyle = e, t.fillText(n, i, a)
	}
	var ee = function(t) {
			k(i, t);
			var e = M(i);

			function i(t, a, n, r, o) {
				var s;
				return f(this, i), (s = e.call(this, t, a))._xAxis = n, s._yAxis = r, s._additionalDataProvider = o, s
			}
			return m(i, [{
				key: "_draw",
				value: function() {
					var t, e, i = this._chartData.crosshair(),
						a = this._chartData.dataList(),
						n = a[e = O(i.x) ? 0 > (t = this._xAxis.convertFromPixel(i.x)) ? 0 : t > a.length - 1 ? a.length - 1 : t :
							t = a.length - 1];
					if (n) {
						var r = this._additionalDataProvider.technicalIndicators(),
							o = this._chartData.styleOptions().crosshair,
							s = this._xAxis.convertToPixel(t);
						i.paneId === this._additionalDataProvider.id() && this._drawCrosshairLine(o, "horizontal", i.y, 0, this._width,
							pt), i.paneId && this._drawCrosshairLine(o, "vertical", s, 0, this._height, mt), this._drawTooltip(i, n,
							e, s, r)
					}
				}
			}, {
				key: "_drawTooltip",
				value: function(t, e, i, a, n) {
					this._drawBatchTechnicalIndicatorToolTip(t, i, n)
				}
			}, {
				key: "_drawCrosshairLine",
				value: function(t, e, i, a, n, r) {
					var o = t[e],
						s = o.line;
					t.show && o.show && s.show && (this._ctx.save(), this._ctx.lineWidth = s.size, this._ctx.strokeStyle = s.color,
						s.style === R && this._ctx.setLineDash(s.dashValue), r(this._ctx, i, a, n), this._ctx.restore())
				}
			}, {
				key: "_drawBatchTechnicalIndicatorToolTip",
				value: function(t, e, i) {
					var a = this,
						n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
						r = this._chartData.styleOptions().technicalIndicator,
						o = r.tooltip,
						s = n;
					i.forEach((function(i) {
						a._drawTechnicalIndicatorTooltip(t, e, i, r, s), s += o.text.marginTop + o.text.size + o.text.marginBottom
					}))
				}
			}, {
				key: "_drawTechnicalIndicatorTooltip",
				value: function(t, e, i, a) {
					var n = this,
						r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
						o = a.tooltip;
					if (this._shouldDrawTooltip(t, o)) {
						var s = i.styles || a,
							c = i.result,
							h = c[e],
							l = ot(h, i),
							u = s.line.colors,
							d = this._chartData.dataList(),
							_ = {
								preData: {
									kLineData: d[e - 1],
									technicalIndicatorData: c[e - 1]
								},
								currentData: {
									kLineData: d[e],
									technicalIndicatorData: h
								},
								nextData: {
									kLineData: d[e + 1],
									technicalIndicatorData: c[e + 1]
								}
							},
							v = i.plots,
							f = o.text,
							p = l.values,
							m = f.marginLeft,
							y = f.marginRight,
							x = 0,
							g = f.marginTop + r,
							k = f.size,
							w = f.color,
							D = u.length;
						if (this._ctx.textBaseline = "top", this._ctx.font = jt(k, f.weight, f.family), o.showName) {
							var P = l.name,
								M = Xt(this._ctx, P);
							te(this._ctx, w, x += m, g, P), x += M, o.showParams || (x += y)
						}
						if (o.showParams) {
							var b = l.calcParamText,
								E = Xt(this._ctx, b);
							o.showName || (x += m), te(this._ctx, w, x, g, b), x += E + y
						}
						var C, I = 0;
						v.forEach((function(t, e) {
							switch (t.type) {
								case $t:
									C = t.color && t.color(_, s) || s.circle.noChangeColor;
									break;
								case qt:
									C = t.color && t.color(_, s) || s.bar.noChangeColor;
									break;
								case Kt:
									C = u[I % D] || w, I++
							}
							var i = p[e].title;
							if (O(i)) {
								x += m;
								var a = "".concat("".concat(i ? "".concat(i, ":") : "")).concat(p[e].value || o.defaultValue),
									r = Xt(n._ctx, a);
								te(n._ctx, C, x, g, a), x += r + y
							}
						}))
					}
				}
			}, {
				key: "_shouldDrawTooltip",
				value: function(t, e) {
					var i = e.showRule;
					return i === U || i === Z && !!t.paneId
				}
			}]), i
		}(Jt),
		ie = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "_createMainView",
				value: function(t, e) {
					return new Qt(t, e.chartData, e.xAxis, e.yAxis, e.additionalDataProvider)
				}
			}, {
				key: "_createCrosshairView",
				value: function(t, e) {
					return new ee(t, e.chartData, e.xAxis, e.yAxis, e.additionalDataProvider)
				}
			}]), i
		}(Zt);

	function ae(t, e, i, a, n, r, o, s) {
		ne(t, e, n, r, o, s),
			function(t, e, i, a, n, r, o) {
				t.lineWidth = i, t.strokeStyle = e, t.strokeRect(a, n, r, o)
			}(t, i, a, n, r, o, s)
	}

	function ne(t, e, i, a, n, r) {
		t.fillStyle = e, t.fillRect(i, a, n, r)
	}

	function re(t, e, i, a, n, r) {
		t.beginPath(), t.moveTo(e + r, i), t.arcTo(e + a, i, e + a, i + n, r), t.arcTo(e + a, i + n, e, i + n, r), t.arcTo(
			e, i + n, e, i, r), t.arcTo(e, i, e + a, i, r), t.closePath()
	}
	var oe = function(t) {
			k(i, t);
			var e = M(i);

			function i(t, a, n, r) {
				var o;
				return f(this, i), (o = e.call(this, t, a))._yAxis = n, o._additionalDataProvider = r, o
			}
			return m(i, [{
				key: "_draw",
				value: function() {
					var t = this._chartData.styleOptions().yAxis;
					t.show && (this._drawAxisLine(t), this._drawTickLines(t), this._drawTickLabels(t), this._drawTechnicalIndicatorLastValue(
						t), this._drawLastPriceLabel(t))
				}
			}, {
				key: "_drawAxisLine",
				value: function(t) {
					var e, i = t.axisLine;
					i.show && (this._ctx.strokeStyle = i.color, this._ctx.lineWidth = i.size, e = this._isDrawFromStart(t) ? 0 :
						this._width - 1, mt(this._ctx, e, 0, this._height))
				}
			}, {
				key: "_drawTickLines",
				value: function(t) {
					var e = this,
						i = t.tickLine;
					if (i.show) {
						this._ctx.lineWidth = i.size, this._ctx.strokeStyle = i.color;
						var a, n, r = i.length;
						this._isDrawFromStart(t) ? (a = 0, t.axisLine.show && (a += t.axisLine.size), n = a + r) : (a = this._width,
							t.axisLine.show && (a -= t.axisLine.size), n = a - r), this._yAxis.ticks().forEach((function(t) {
							pt(e._ctx, t.y, a, n)
						}))
					}
				}
			}, {
				key: "_drawTickLabels",
				value: function(t) {
					var e = this,
						i = t.tickText;
					if (i.show) {
						var a, n = t.tickLine,
							r = n.show,
							o = n.length;
						this._isDrawFromStart(t) ? (a = i.paddingLeft, t.axisLine.show && (a += t.axisLine.size), r && (a += o),
							this._ctx.textAlign = "left") : (a = this._width - i.paddingRight, t.axisLine.show && (a -= t.axisLine.size),
							r && (a -= o), this._ctx.textAlign = "right"), this._ctx.textBaseline = "middle", this._ctx.font = jt(i.size,
							i.weight, i.family), this._ctx.fillStyle = i.color, this._yAxis.ticks().forEach((function(t) {
							e._ctx.fillText(t.v, a, t.y)
						})), this._ctx.textAlign = "left"
					}
				}
			}, {
				key: "_drawTechnicalIndicatorLastValue",
				value: function(t) {
					var e = this,
						i = this._chartData.styleOptions().technicalIndicator,
						a = i.lastValueMark,
						n = this._additionalDataProvider.technicalIndicators();
					if (a.show && a.text.show) {
						var r = this._chartData.dataList();
						n.forEach((function(n) {
							var o = n.result || [],
								s = o.length,
								c = o[s - 1] || {},
								h = {
									preData: {
										kLineData: r[s - 2],
										technicalIndicatorData: o[s - 2]
									},
									currentData: {
										kLineData: r[s - 1],
										technicalIndicatorData: c
									},
									nextData: {
										kLineData: null,
										technicalIndicatorData: null
									}
								},
								l = n.precision,
								u = n.styles || i,
								d = u.line.colors || [],
								_ = d.length,
								v = 0;
							n.plots.forEach((function(i) {
								var r, o = c[i.key];
								switch (i.type) {
									case $t:
										r = i.color && i.color(h, u) || u.circle.noChangeColor;
										break;
									case qt:
										r = i.color && i.color(h, u) || u.bar.noChangeColor;
										break;
									case Kt:
										r = d[v % _], v++
								}
								O(o) && e._drawMarkLabel(t, o, l, n.shouldFormatBigNumber, g(g({}, a.text), {}, {
									backgroundColor: r
								}))
							}))
						}))
					}
				}
			}, {
				key: "_drawLastPriceLabel",
				value: function(t) {
					if (this._yAxis.isCandleYAxis()) {
						var e = this._chartData.styleOptions().candle.priceMark,
							i = e.last;
						if (e.show && i.show && i.text.show) {
							var a = this._chartData.dataList(),
								n = a[a.length - 1];
							if (n) {
								var r, o = n.close,
									s = n.open;
								r = o > s ? i.upColor : s > o ? i.downColor : i.noChangeColor, this._drawMarkLabel(t, o, this._chartData.pricePrecision(),
									!1, g(g({}, i.text), {}, {
										backgroundColor: r
									}))
							}
						}
					}
				}
			}, {
				key: "_drawMarkLabel",
				value: function(t, e, i, a, n) {
					var r, o = n.size,
						s = n.weight,
						c = n.family,
						h = n.color,
						l = n.backgroundColor,
						u = n.paddingLeft,
						d = n.paddingTop,
						_ = n.paddingRight,
						v = n.paddingBottom,
						f = this._yAxis.convertToPixel(e);
					if (f = +Math.max(.05 * this._height, Math.min(f, .98 * this._height)).toFixed(0), this._yAxis.isPercentageYAxis()) {
						var p = this._chartData.dataList()[this._chartData.from()].close;
						r = "".concat(((e - p) / p * 100).toFixed(2), "%")
					} else r = Q(e, i), a && (r = tt(r));
					this._ctx.font = jt(o, s, c);
					var m, y = Xt(this._ctx, r) + u + _,
						x = d + o + v;
					m = this._isDrawFromStart(t) ? 0 : this._width - y, ne(this._ctx, l, m, f - d - o / 2, y, x), this._ctx.textBaseline =
						"middle", te(this._ctx, h, m + u, f, r)
				}
			}, {
				key: "_isDrawFromStart",
				value: function(t) {
					return t.position === F && t.inside || t.position === B && !t.inside
				}
			}]), i
		}(Jt),
		se = function(t) {
			k(i, t);
			var e = M(i);

			function i(t, a, n, r) {
				var o;
				return f(this, i), (o = e.call(this, t, a))._yAxis = n, o._additionalDataProvider = r, o
			}
			return m(i, [{
				key: "_draw",
				value: function() {
					this._drawCrossHairLabel()
				}
			}, {
				key: "_drawCrossHairLabel",
				value: function() {
					var t = this._chartData.crosshair();
					if (t.paneId === this._additionalDataProvider.id() && 0 !== this._chartData.dataList().length) {
						var e = this._chartData.styleOptions(),
							i = e.crosshair,
							a = i.horizontal,
							n = a.text;
						if (i.show && a.show && n.show) {
							var r, o = this._yAxis.convertFromPixel(t.y);
							if (this._yAxis.isPercentageYAxis()) {
								var s = this._chartData.dataList()[this._chartData.from()].close;
								r = "".concat(((o - s) / s * 100).toFixed(2), "%")
							} else {
								var c = this._additionalDataProvider.technicalIndicators(),
									h = 0,
									l = !1;
								this._yAxis.isCandleYAxis() ? h = this._chartData.pricePrecision() : c.forEach((function(t) {
									h = Math.max(t.precision, h), l || (l = t.shouldFormatBigNumber)
								})), r = Q(o, h), l && (r = tt(r))
							}
							var u = n.size;
							this._ctx.font = jt(u, n.weight, n.family);
							var d, _ = Xt(this._ctx, r),
								v = n.paddingLeft,
								f = n.paddingTop,
								p = n.borderSize,
								m = _ + 2 * p + v + n.paddingRight,
								y = e.yAxis;
							ae(this._ctx, n.backgroundColor, n.borderColor, p, d = y.position === F && y.inside || y.position === B &&
									!y.inside ? 0 : this._width - m, t.y - p - f - u / 2, m, u + 2 * p + f + n.paddingBottom), this._ctx.textBaseline =
								"middle", te(this._ctx, n.color, d + p + v, t.y, r)
						}
					}
				}
			}]), i
		}(Jt),
		ce = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "_createMainView",
				value: function(t, e) {
					return new oe(t, e.chartData, e.yAxis, e.additionalDataProvider)
				}
			}, {
				key: "_createCrosshairView",
				value: function(t, e) {
					return new se(t, e.chartData, e.yAxis, e.additionalDataProvider)
				}
			}]), i
		}(Zt),
		he = function() {
			function t(e) {
				f(this, t), this._chartData = e, this._width = 0, this._height = 0, this._cacheMinValue = 0, this._cacheMaxValue =
					0, this._minValue = 0, this._maxValue = 0, this._range = 0, this._ticks = [], this._initMeasureCanvas()
			}
			return m(t, [{
				key: "_initMeasureCanvas",
				value: function() {
					var t = document.createElement("canvas"),
						e = Nt(t);
					this._measureCtx = t.getContext("2d"), this._measureCtx.scale(e, e)
				}
			}, {
				key: "min",
				value: function() {
					return this._minValue
				}
			}, {
				key: "max",
				value: function() {
					return this._maxValue
				}
			}, {
				key: "width",
				value: function() {
					return this._width
				}
			}, {
				key: "height",
				value: function() {
					return this._height
				}
			}, {
				key: "setWidth",
				value: function(t) {
					this._width = t
				}
			}, {
				key: "setHeight",
				value: function(t) {
					this._height = t
				}
			}, {
				key: "ticks",
				value: function() {
					return this._ticks
				}
			}, {
				key: "computeAxis",
				value: function(t) {
					var e = this._computeMinMaxValue(),
						i = e.min,
						a = e.max,
						n = e.range;
					return this._minValue = i, this._maxValue = a, !(this._cacheMinValue === i && this._cacheMaxValue === a && !
						t) && (this._cacheMinValue = i, this._cacheMaxValue = a, this._range = n, this._ticks = this._computeOptimalTicks(
						this._computeTicks()), !0)
				}
			}, {
				key: "_computeMinMaxValue",
				value: function() {}
			}, {
				key: "_computeOptimalTicks",
				value: function(t) {}
			}, {
				key: "_computeTicks",
				value: function() {
					var t = [];
					if (this._range >= 0) {
						var e = this._nice(this._range / 8),
							i = this._getIntervalPrecision(e),
							a = this._round(Math.ceil(this._minValue / e) * e, i),
							n = this._round(Math.floor(this._maxValue / e) * e, i),
							r = 0,
							o = a;
						if (0 !== e)
							for (; n >= o;) t[r] = {
								v: o.toFixed(i)
							}, ++r, o += e
					}
					return t
				}
			}, {
				key: "_nice",
				value: function(t) {
					var e = Math.floor(Math.log(t) / Math.LN10),
						i = Math.pow(10, e),
						a = t / i;
					return t = (1.5 > a ? 1 : 2.5 > a ? 2 : 3.5 > a ? 3 : 4.5 > a ? 4 : 5.5 > a ? 5 : 6.5 > a ? 6 : 8) * i, -20 >
						e ? t : +t.toFixed(0 > e ? -e : 0)
				}
			}, {
				key: "_getIntervalPrecision",
				value: function(t) {
					var e = "" + t,
						i = e.indexOf("e");
					if (i > 0) {
						var a = +e.slice(i + 1);
						return 0 > a ? -a : 0
					}
					var n = e.indexOf(".");
					return 0 > n ? 0 : e.length - 1 - n
				}
			}, {
				key: "_round",
				value: function(t, e) {
					return null == e && (e = 10), +(t = (+t).toFixed(e = Math.min(Math.max(0, e), 20)))
				}
			}]), t
		}(),
		le = function(t) {
			k(i, t);
			var e = M(i);

			function i(t, a, n) {
				var r;
				return f(this, i), (r = e.call(this, t))._isCandleYAxis = a, r._additionalDataProvider = n, r
			}
			return m(i, [{
				key: "_computeMinMaxValue",
				value: function() {
					var t, e, i = this._minValue,
						a = this._maxValue,
						n = Math.abs(a - i);
					return e = (t = this._isCandleYAxis ? this._chartData.styleOptions().candle.margin : this._chartData.styleOptions()
						.technicalIndicator.margin).top > 1 ? t.top / this._height : V(t.top) ? t.top : .2, {
						min: i -= n * (t.bottom > 1 ? t.bottom / this._height : V(t.bottom) ? t.bottom : .1),
						max: a += n * e,
						range: n = Math.abs(a - i)
					}
				}
			}, {
				key: "_computeOptimalTicks",
				value: function(t) {
					var e = [],
						i = t.length;
					if (i > 0) {
						var a = this._chartData.styleOptions().xAxis.tickText.size,
							n = this._innerConvertToPixel(+t[0].v),
							r = 1;
						if (i > 1) {
							var o = this._innerConvertToPixel(+t[1].v),
								s = Math.abs(o - n);
							2 * a > s && (r = Math.ceil(2 * a / s))
						}
						var c = this._additionalDataProvider.technicalIndicators(),
							h = 0,
							l = !1;
						this._isCandleYAxis ? h = this._chartData.pricePrecision() : c.forEach((function(t) {
							h = Math.max(h, t.precision), l || (l = t.shouldFormatBigNumber)
						}));
						for (var u = this.isPercentageYAxis(), d = 0; i > d; d += r) {
							var _ = t[d].v,
								v = this._innerConvertToPixel(+(_ = 0 == +_ ? "0" : _)),
								f = "";
							u ? f = "".concat(Q(_, 2), "%") : (f = Q(_, h), l && (f = tt(f))), v > a && this._height - a > v && e.push({
								v: f,
								y: v
							})
						}
					}
					return e
				}
			}, {
				key: "calcMinMaxValue",
				value: function() {
					var t = this,
						e = this._additionalDataProvider.technicalIndicators(),
						i = this._chartData.dataList(),
						a = this._chartData.from(),
						n = this._chartData.to(),
						r = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
						o = [],
						s = !1,
						c = Number.MAX_SAFE_INTEGER,
						h = Number.MIN_SAFE_INTEGER,
						l = Number.MIN_SAFE_INTEGER;
					e.forEach((function(t) {
						s || (s = t.should), l = Math.max(l, t.precision), O(t.minValue) && V(t.minValue) && (c = Math.min(c, t.minValue)),
							O(t.maxValue) && V(t.maxValue) && (h = Math.max(h, t.maxValue)), o.push({
								plots: t.plots,
								result: t.result
							})
					}));
					var u = 4;
					if (this._isCandleYAxis) {
						var d = this._chartData.pricePrecision();
						u = l !== Number.MIN_SAFE_INTEGER ? Math.max(l, d) : d
					} else l !== Number.MIN_SAFE_INTEGER && (u = l);
					for (var _ = this._chartData.styleOptions().candle, v = _.type === j, f = _.area.value, p = this._isCandleYAxis &&
							!v || !this._isCandleYAxis && s, m = function(e) {
								var a = i[e];
								p && (r[0] = Math.min(r[0], a.low), r[1] = Math.max(r[1], a.high)), t._isCandleYAxis && v && (r[0] = Math
									.min(r[0], a[f]), r[1] = Math.max(r[1], a[f])), o.forEach((function(t) {
									var i = t.result[e] || {};
									t.plots.forEach((function(t) {
										var e = i[t.key];
										O(e) && (r[0] = Math.min(r[0], e), r[1] = Math.max(r[1], e))
									}))
								}))
							}, y = a; n > y; y++) m(y);
					if (r[0] !== Number.MAX_SAFE_INTEGER && r[1] !== Number.MIN_SAFE_INTEGER) {
						if (c !== Number.MAX_SAFE_INTEGER && (r[0] = Math.min(c, r[0])), h !== Number.MIN_SAFE_INTEGER && (r[1] =
								Math.max(h, r[1])), this.isPercentageYAxis()) {
							var x = i[a].close;
							this._minValue = (r[0] - x) / x * 100, this._maxValue = (r[1] - x) / x * 100, (this._minValue === this._maxValue ||
								.01 > Math.abs(this._minValue - this._maxValue)) && (this._minValue -= 10, this._maxValue += 10)
						} else if (this._minValue = r[0], this._maxValue = r[1], this._minValue === this._maxValue || Math.pow(10,
								-u) > Math.abs(this._minValue - this._maxValue)) {
							var g = 0 !== this._minValue ? Math.abs(.2 * this._minValue) : 10;
							this._minValue = 0 !== this._minValue ? this._minValue - g : this._minValue, this._maxValue += g
						}
					} else this._minValue = 0, this._maxValue = 0
				}
			}, {
				key: "_innerConvertToPixel",
				value: function(t) {
					return Math.round((1 - (t - this._minValue) / this._range) * this._height)
				}
			}, {
				key: "isCandleYAxis",
				value: function() {
					return this._isCandleYAxis
				}
			}, {
				key: "isPercentageYAxis",
				value: function() {
					return this._isCandleYAxis && this._chartData.styleOptions().yAxis.type === Y
				}
			}, {
				key: "getSelfWidth",
				value: function() {
					var t = this,
						e = this._chartData.styleOptions(),
						i = e.yAxis,
						a = i.width;
					if (O(a) && V(+a)) return +a;
					var n = 0;
					if (i.show && (i.axisLine.show && (n += i.axisLine.size), i.tickLine.show && (n += i.tickLine.length), i.tickText
							.show)) {
						var r = 0;
						this._measureCtx.font = jt(i.tickText.size, i.tickText.weight, i.tickText.family), this._ticks.forEach((
							function(e) {
								r = Math.max(r, Xt(t._measureCtx, e.v))
							})), n += i.tickText.paddingLeft + i.tickText.paddingRight + r
					}
					var o = e.crosshair,
						s = 0;
					if (o.show && o.horizontal.show && o.horizontal.text.show) {
						var c = this._additionalDataProvider.technicalIndicators(),
							h = 0,
							l = !1;
						c.forEach((function(t) {
							h = Math.max(t.precision, h), l || (l = t.shouldFormatBigNumber)
						})), this._measureCtx.font = jt(o.horizontal.text.size, o.horizontal.text.weight, o.horizontal.text.family);
						var u = 2;
						if (!this.isPercentageYAxis())
							if (this._isCandleYAxis) {
								var d = this._chartData.pricePrecision(),
									_ = e.technicalIndicator.lastValueMark;
								u = _.show && _.text.show ? Math.max(h, d) : d
							} else u = h;
						var v = Q(this._maxValue, u);
						l && (v = tt(v)), s += o.horizontal.text.paddingLeft + o.horizontal.text.paddingRight + 2 * o.horizontal.text
							.borderSize + Xt(this._measureCtx, v)
					}
					return Math.max(n, s)
				}
			}, {
				key: "convertFromPixel",
				value: function(t) {
					var e = (1 - t / this._height) * this._range + this._minValue;
					if (this.isPercentageYAxis()) {
						var i = this._chartData.dataList()[this._chartData.from()].close;
						return i * e / 100 + i
					}
					return e
				}
			}, {
				key: "convertToPixel",
				value: function(t) {
					var e = t;
					if (this.isPercentageYAxis()) {
						var i = (this._chartData.dataList()[this._chartData.from()] || {}).close;
						O(i) && (e = (t - i) / i * 100)
					}
					return this._innerConvertToPixel(e)
				}
			}]), i
		}(he),
		ue = function(t) {
			k(i, t);
			var e = M(i);

			function i(t) {
				var a;
				return f(this, i), (a = e.call(this, t))._technicalIndicators = [], "height" in t && a.setHeight(t.height), a.setTechnicalIndicator(
					a._chartData.technicalIndicator(t.name)), a
			}
			return m(i, [{
				key: "_initBefore",
				value: function(t) {
					this._id = t.id, this._yAxis = this._createYAxis(t)
				}
			}, {
				key: "_createYAxis",
				value: function(t) {
					return new le(t.chartData, !1, {
						technicalIndicators: this.technicalIndicators.bind(this)
					})
				}
			}, {
				key: "_createMainWidget",
				value: function(t, e) {
					return new ie({
						container: t,
						chartData: e.chartData,
						xAxis: e.xAxis,
						yAxis: this._yAxis,
						additionalDataProvider: {
							technicalIndicators: this.technicalIndicators.bind(this),
							id: this.id.bind(this)
						}
					})
				}
			}, {
				key: "_createYAxisWidget",
				value: function(t, e) {
					return new ce({
						container: t,
						chartData: e.chartData,
						yAxis: this._yAxis,
						additionalDataProvider: {
							technicalIndicators: this.technicalIndicators.bind(this),
							id: this.id.bind(this)
						}
					})
				}
			}, {
				key: "_includeTechnicalIndicator",
				value: function(t) {
					var e, i = C(this._technicalIndicators);
					try {
						for (i.s(); !(e = i.n()).done;) {
							if (e.value.name === t) return !0
						}
					} catch (t) {
						i.e(t)
					} finally {
						i.f()
					}
					return !1
				}
			}, {
				key: "setHeight",
				value: function(t) {
					b(w(i.prototype), "setHeight", this).call(this, t), this._yAxis.setHeight(t)
				}
			}, {
				key: "setWidth",
				value: function(t, e) {
					b(w(i.prototype), "setWidth", this).call(this, t, e), this._yAxis.setWidth(e)
				}
			}, {
				key: "computeAxis",
				value: function(t) {
					return this._yAxis.calcMinMaxValue(), this._yAxis.computeAxis(t)
				}
			}, {
				key: "getSelfAxisWidth",
				value: function() {
					return this._yAxis.getSelfWidth()
				}
			}, {
				key: "id",
				value: function() {
					return this._id
				}
			}, {
				key: "yAxis",
				value: function() {
					return this._yAxis
				}
			}, {
				key: "technicalIndicators",
				value: function() {
					return this._technicalIndicators
				}
			}, {
				key: "isEmptyTechnicalIndicator",
				value: function() {
					return 0 === this._technicalIndicators.length
				}
			}, {
				key: "removeTechnicalIndicator",
				value: function(t) {
					if (!t) return this._technicalIndicators = [], !0;
					for (var e = -1, i = 0; this._technicalIndicators.length > i; i++)
						if (this._technicalIndicators[i].name === t) {
							e = i;
							break
						} return e > -1 ? (this._technicalIndicators.splice(e, 1), !0) : void 0
				}
			}, {
				key: "setTechnicalIndicator",
				value: function(t, e) {
					if (t) {
						if (this._includeTechnicalIndicator(t.name)) return !1;
						var i = Object.create(t);
						return e ? this._technicalIndicators.push(i) : this._technicalIndicators = [i], this.calcTechnicalIndicator(
							i), !0
					}
					return !1
				}
			}, {
				key: "calcTechnicalIndicator",
				value: function(t) {
					t.result = t.calcTechnicalIndicator(this._chartData.dataList(), t.calcParams, t.plots) || []
				}
			}, {
				key: "calcAllTechnicalIndicator",
				value: function() {
					var t = this;
					return this.technicalIndicators().forEach((function(e) {
						t.calcTechnicalIndicator(e)
					})), this.computeAxis()
				}
			}]), i
		}(Ut),
		de = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "_draw",
				value: function() {
					this._drawGrid();
					var t = this._chartData.styleOptions().candle;
					t.type === j ? this._drawArea(t) : (this._drawCandle(t), this._drawLowHighPrice(t.priceMark, "high", "high",
						Number.MIN_SAFE_INTEGER, [-2, -5], (function(t, e) {
							if (t > e) return t
						})), this._drawLowHighPrice(t.priceMark, "low", "low", Number.MAX_SAFE_INTEGER, [2, 5], (function(t, e) {
						if (e > t) return t
					}))), this._drawTechnicalIndicators(), this._drawLastPriceLine(t.priceMark)
				}
			}, {
				key: "_drawArea",
				value: function(t) {
					var e = this,
						i = [],
						a = [],
						n = this._chartData.from(),
						r = Number.MAX_SAFE_INTEGER,
						o = t.area;
					this._drawGraphics((function(t, s, c, h) {
						var l = c[o.value];
						if (O(l) && V(l)) {
							var u = e._yAxis.convertToPixel(l);
							if (s === n) {
								var d = t - h;
								a.push({
									x: d,
									y: e._height
								}), a.push({
									x: d,
									y: u
								}), i.push({
									x: d,
									y: u
								})
							}
							i.push({
								x: t,
								y: u
							}), a.push({
								x: t,
								y: u
							}), r = Math.min(r, u)
						}
					}), (function() {
						var t = a.length;
						if (t > 0) {
							var n = a[t - 1],
								s = e._chartData.barSpace() / 2,
								c = n.x + s;
							i.push({
								x: c,
								y: n.y
							}), a.push({
								x: c,
								y: n.y
							}), a.push({
								x: c,
								y: e._height
							})
						}
						if (i.length > 0 && (e._ctx.lineWidth = o.lineSize, e._ctx.strokeStyle = o.lineColor, yt(e._ctx, (
								function() {
									e._ctx.beginPath(), e._ctx.moveTo(i[0].x, i[0].y);
									for (var t = 1; i.length > t; t++) e._ctx.lineTo(i[t].x, i[t].y);
									e._ctx.stroke(), e._ctx.closePath()
								}))), a.length > 0) {
							var h = o.fillColor;
							if (S(h)) {
								var l = e._ctx.createLinearGradient(0, e._height, 0, r);
								try {
									h.forEach((function(t) {
										l.addColorStop(t.offset, t.color)
									}))
								} catch (t) {}
								e._ctx.fillStyle = l
							} else e._ctx.fillStyle = h;
							e._ctx.beginPath(), e._ctx.moveTo(a[0].x, a[0].y);
							for (var u = 1; a.length > u; u++) e._ctx.lineTo(a[u].x, a[u].y);
							e._ctx.closePath(), e._ctx.fill()
						}
					}))
				}
			}, {
				key: "_drawCandle",
				value: function(t) {
					var e = this;
					this._drawGraphics((function(i, a, n, r, o) {
						e._drawCandleBar(i, r, o, a, n, t.bar, t.type)
					}))
				}
			}, {
				key: "_drawLowHighPrice",
				value: function(t, e, i, a, n, r) {
					var o = this,
						s = t[e];
					if (t.show && s.show) {
						for (var c = this._chartData.dataList(), h = this._chartData.to(), l = a, u = -1, d = this._chartData.from(); h >
							d; d++) {
							var _ = r($(c[d], i, a), l);
							_ && (l = _, u = d)
						}
						var v = this._chartData.pricePrecision(),
							f = this._yAxis.convertToPixel(l),
							p = this._xAxis.convertToPixel(u),
							m = f + n[0];
						this._ctx.textAlign = "left", this._ctx.lineWidth = 1, this._ctx.strokeStyle = s.color, this._ctx.fillStyle =
							s.color, yt(this._ctx, (function() {
								o._ctx.beginPath(), o._ctx.moveTo(p - 2, m + n[0]), o._ctx.lineTo(p, m), o._ctx.lineTo(p + 2, m + n[0]),
									o._ctx.stroke(), o._ctx.closePath()
							}));
						var y = m + n[1];
						yt(this._ctx, (function() {
							o._ctx.beginPath(), o._ctx.moveTo(p, m), o._ctx.lineTo(p, y), o._ctx.lineTo(p + 5, y), o._ctx.stroke(),
								o._ctx.closePath()
						})), this._ctx.font = jt(s.textSize, s.textWeight, s.textFamily);
						var x = Q(l, v);
						this._ctx.textBaseline = "middle", this._ctx.fillText(x, p + 5 + s.textMargin, y)
					}
				}
			}, {
				key: "_drawLastPriceLine",
				value: function(t) {
					var e = t.last;
					if (t.show && e.show && e.line.show) {
						var i = this._chartData.dataList(),
							a = i[i.length - 1];
						if (a) {
							var n, r = a.close,
								o = a.open,
								s = this._yAxis.convertToPixel(r);
							s = +Math.max(.05 * this._height, Math.min(s, .98 * this._height)).toFixed(0), n = r > o ? e.upColor : o >
								r ? e.downColor : e.noChangeColor, this._ctx.save(), this._ctx.strokeStyle = n, this._ctx.lineWidth = e.line
								.size, e.line.style === R && this._ctx.setLineDash(e.line.dashValue), pt(this._ctx, s, 0, this._width),
								this._ctx.restore()
						}
					}
				}
			}]), i
		}(Qt),
		_e = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "_drawTooltip",
				value: function(t, e, i, a, n) {
					var r = this._chartData.styleOptions(),
						o = r.candle,
						s = o.tooltip,
						c = this._shouldDrawTooltip(t, s);
					if (s.showType === K) {
						var h = c ? s.text.size + s.text.marginTop : 0;
						this._drawCandleTooltipWithStandard(e, o, c), this._drawBatchTechnicalIndicatorToolTip(t, i, n, h)
					} else this._drawCandleTooltipWithRect(e, n, i, a, o, c, r.technicalIndicator, this._shouldDrawTooltip(t, r.technicalIndicator
						.tooltip))
				}
			}, {
				key: "_drawCandleTooltipWithStandard",
				value: function(t, e, i) {
					var a = this;
					if (i) {
						var n = this._getCandleTooltipData(t, e),
							r = e.tooltip,
							o = r.text.marginLeft,
							s = r.text.marginRight,
							c = r.text.size,
							h = r.text.color,
							l = r.labels;
						this._ctx.textBaseline = "top", this._ctx.font = jt(c, r.text.weight, r.text.family);
						var u = o,
							d = r.text.marginTop;
						l.forEach((function(t, e) {
							var i = t ? "".concat(t, ": ") : "",
								c = Xt(a._ctx, i);
							te(a._ctx, h, u, d, i), u += c;
							var l, _, v = n[e] || r.defaultValue;
							L(v) ? (l = v.value || r.defaultValue, _ = v.color || h) : (_ = h, l = v);
							var f = Xt(a._ctx, l);
							te(a._ctx, _, u, d, l), u += f + o + s
						}))
					}
				}
			}, {
				key: "_drawCandleTooltipWithRect",
				value: function(t, e, i, a, n, r, o, s) {
					var c = this;
					if (r || s) {
						var h = n.tooltip,
							l = h.labels,
							u = this._getCandleTooltipData(t, n),
							d = h.text.marginLeft,
							_ = h.text.marginRight,
							v = h.text.marginTop,
							f = h.text.marginBottom,
							p = h.text.size,
							m = h.text.color,
							y = h.rect,
							x = y.borderSize,
							g = y.paddingLeft,
							k = y.paddingRight,
							w = y.paddingTop,
							D = y.paddingBottom,
							P = y.offsetLeft,
							M = y.offsetRight,
							b = 0,
							E = 0,
							C = 0;
						this._ctx.save(), this._ctx.textBaseline = "top", r && (this._ctx.font = jt(p, h.text.weight, h.text.family),
							l.forEach((function(t, e) {
								var i, a = u[e];
								i = L(a) ? a.value || h.defaultValue : a;
								var n = t ? "".concat(t, ": ").concat(i) : "".concat(i),
									r = Xt(c._ctx, n) + d + _;
								b = Math.max(b, r)
							})), C += (f + v + p) * l.length);
						var I = o.tooltip,
							T = I.text.marginLeft,
							S = I.text.marginRight,
							A = I.text.marginTop,
							V = I.text.marginBottom,
							z = I.text.size,
							R = [],
							F = this._chartData.dataList();
						if (e.forEach((function(t) {
								var e = t.result;
								R.push({
									tooltipData: ot(e[i], t),
									cbData: {
										preData: {
											kLineData: F[i - 1],
											technicalIndicatorData: e[i - 1]
										},
										currentData: {
											kLineData: F[i],
											technicalIndicatorData: e[i]
										},
										nextData: {
											kLineData: F[i + 1],
											technicalIndicatorData: e[i + 1]
										}
									}
								})
							})), s && (this._ctx.font = jt(z, I.text.weight, I.text.family), R.forEach((function(t) {
								t.tooltipData.values.forEach((function(t) {
									var e = t.title,
										i = t.value;
									if (O(e)) {
										var a = i || I.defaultValue,
											n = e ? "".concat(e, ": ").concat(a) : "".concat(a),
											r = Xt(c._ctx, n) + T + S;
										b = Math.max(b, r), C += A + V + z
									}
								}))
							}))), 0 !== (E += b) && 0 !== C) {
							var B;
							E += 2 * x + g + k;
							var Y = y.offsetTop,
								H = y.borderRadius;
							! function(t, e, i, a, n, r, o) {
								t.fillStyle = e, re(t, i, a, n, r, o), t.fill()
							}(this._ctx, y.fillColor, B = this._width / 2 > a ? this._width - M - E : P, Y, E, C += 2 * x + w + D, H),
							function(t, e, i, a, n, r, o, s) {
								t.lineWidth = i, t.strokeStyle = e, re(t, a, n, r, o, s), t.stroke()
							}(this._ctx, y.borderColor, x, B, Y, E, C, H);
							var W = B + x + g + d,
								G = Y + x + w;
							if (r && (this._ctx.font = jt(p, h.text.weight, h.text.family), l.forEach((function(t, e) {
									G += v, c._ctx.textAlign = "left", te(c._ctx, m, W, G, "".concat(t, ": "));
									var i, a, n = u[e];
									L(n) ? (a = n.color || m, i = n.value || h.defaultValue) : (a = m, i = n || h.defaultValue), c._ctx.textAlign =
										"right", te(c._ctx, a, B + E - x - _ - k, G, i), G += p + f
								}))), s) {
								var N = this._chartData.styleOptions().technicalIndicator,
									X = B + x + g + T;
								this._ctx.font = jt(z, I.text.weight, I.text.family), R.forEach((function(t, i) {
									var a, n = t.tooltipData,
										r = t.cbData,
										o = e[i].styles || N,
										s = o.line.colors,
										h = s.length,
										l = 0;
									e[i].plots.forEach((function(t, e) {
										switch (t.type) {
											case $t:
												a = t.color && t.color(r, o) || o.circle.noChangeColor;
												break;
											case qt:
												a = t.color && t.color(r, o) || o.bar.noChangeColor;
												break;
											case Kt:
												a = s[l % h] || o.text.color, l++
										}
										var i = n.values[e];
										O(i.title) && (G += A, c._ctx.textAlign = "left", c._ctx.fillStyle = a, c._ctx.fillText("".concat(
											i.title, ": "), X, G), c._ctx.textAlign = "right", c._ctx.fillText(i.value || I.defaultValue,
											B + E - x - S - k, G), G += z + V)
									}))
								}))
							}
							this._ctx.restore()
						}
					}
				}
			}, {
				key: "_getCandleTooltipData",
				value: function(t, e) {
					var i = this,
						a = e.tooltip.values,
						n = [];
					if (a) A(a) ? n = a(t, e) || [] : S(a) && (n = a);
					else {
						var r = this._chartData.pricePrecision(),
							o = this._chartData.volumePrecision();
						(n = [ $(t, "base_coin"),$(t, "open"), $(t, "close"), $(t, "high"), $(t, "low"), $(t, "volume"),/* $(t, "timestamp") ,*/$(t, "rmb")]).forEach((
							function(t, e) {
								switch (e) {
									case 0:
									n[e] =t;
										
										break;
									case n.length - 2:
										n[e] = tt(Q(t, o));
										break;
										/* case n.length - 2:
											n[e] = J(i._chartData.dateTimeFormat(), t, "YYYY-MM-DD hh:mm");
											break; */
									default:
										n[e] = Q(t, r)
								}
							}))
					}
					return n
				}
			}]), i
		}(ee),
		ve = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "_draw",
				value: function() {
					var t = this;
					this._chartData.graphicMarks().forEach((function(e) {
						e.draw(t._ctx)
					}))
				}
			}]), i
		}(Jt),
		fe = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "_createMainView",
				value: function(t, e) {
					return new de(t, e.chartData, e.xAxis, e.yAxis, e.additionalDataProvider)
				}
			}, {
				key: "_createExpandView",
				value: function(t, e) {
					return new ve(t, e.chartData)
				}
			}, {
				key: "_createCrosshairView",
				value: function(t, e) {
					return new _e(t, e.chartData, e.xAxis, e.yAxis, e.additionalDataProvider)
				}
			}]), i
		}(ie),
		pe = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "_createYAxis",
				value: function(t) {
					return new le(t.chartData, !0, {
						technicalIndicators: this.technicalIndicators.bind(this)
					})
				}
			}, {
				key: "_createMainWidget",
				value: function(t, e) {
					return new fe({
						container: t,
						chartData: e.chartData,
						xAxis: e.xAxis,
						yAxis: this._yAxis,
						additionalDataProvider: {
							technicalIndicators: this.technicalIndicators.bind(this),
							id: this.id.bind(this)
						}
					})
				}
			}]), i
		}(ue),
		me = function(t) {
			k(i, t);
			var e = M(i);

			function i(t, a, n) {
				var r;
				return f(this, i), (r = e.call(this, t, a))._xAxis = n, r
			}
			return m(i, [{
				key: "_draw",
				value: function() {
					var t = this._chartData.styleOptions().xAxis;
					t.show && (this._drawAxisLine(t), this._drawTickLines(t), this._drawTickLabels(t))
				}
			}, {
				key: "_drawAxisLine",
				value: function(t) {
					var e = t.axisLine;
					e.show && (this._ctx.strokeStyle = e.color, this._ctx.lineWidth = e.size, pt(this._ctx, 0, 0, this._width))
				}
			}, {
				key: "_drawTickLines",
				value: function(t) {
					var e = this,
						i = t.tickLine;
					if (i.show) {
						this._ctx.lineWidth = i.size, this._ctx.strokeStyle = i.color;
						var a = t.axisLine.show ? t.axisLine.size : 0,
							n = a + i.length;
						this._xAxis.ticks().forEach((function(t) {
							mt(e._ctx, t.x, a, n)
						}))
					}
				}
			}, {
				key: "_drawTickLabels",
				value: function(t) {
					var e = t.tickText;
					if (e.show) {
						var i = t.tickLine;
						this._ctx.textBaseline = "top", this._ctx.font = jt(e.size, e.weight, e.family), this._ctx.textAlign =
							"center", this._ctx.fillStyle = e.color;
						var a = e.paddingTop;
						t.axisLine.show && (a += t.axisLine.size), i.show && (a += i.length);
						for (var n = this._xAxis.ticks(), r = n.length, o = 0; r > o; o++) this._ctx.fillText(n[o].v, n[o].x, a)
					}
				}
			}]), i
		}(Jt),
		ye = function(t) {
			k(i, t);
			var e = M(i);

			function i(t, a, n) {
				var r;
				return f(this, i), (r = e.call(this, t, a))._xAxis = n, r
			}
			return m(i, [{
				key: "_draw",
				value: function() {
					this._drawCrosshairLabel()
				}
			}, {
				key: "_drawCrosshairLabel",
				value: function() {
					var t = this._chartData.crosshair();
					if (t.paneId) {
						var e = this._chartData.styleOptions().crosshair,
							i = e.vertical,
							a = i.text;
						if (e.show && i.show && a.show) {
							var n, r = this._chartData.dataList(),
								o = r[n = O(t.x) ? this._xAxis.convertFromPixel(t.x) : r.length - 1];
							if (o) {
								var s = this._xAxis.convertToPixel(n),
									c = o.timestamp,
									h = J(this._chartData.dateTimeFormat(), c, "YYYY-MM-DD hh:mm"),
									l = a.size;
								this._ctx.font = jt(l, a.weight, a.family);
								var u = Xt(this._ctx, h),
									d = s - u / 2,
									_ = a.paddingLeft,
									v = a.paddingRight,
									f = a.paddingTop,
									p = a.borderSize;
								_ + p > d ? d = _ + p : d > this._width - u - p - v && (d = this._width - u - p - v), ae(this._ctx, a.backgroundColor,
										a.borderColor, p, d - p - _, 0, u + 2 * p + v + _, l + 2 * p + f + a.paddingBottom), this._ctx.textBaseline =
									"top", te(this._ctx, a.color, d, p + f, h)
							}
						}
					}
				}
			}]), i
		}(Jt),
		xe = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "_createMainView",
				value: function(t, e) {
					return new me(t, e.chartData, e.xAxis)
				}
			}, {
				key: "_createCrosshairView",
				value: function(t, e) {
					return new ye(t, e.chartData, e.xAxis)
				}
			}]), i
		}(Zt),
		ge = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "_computeMinMaxValue",
				value: function() {
					var t = this._chartData.from(),
						e = this._chartData.to() - 1;
					return {
						min: t,
						max: e,
						range: e - t + 1
					}
				}
			}, {
				key: "_computeOptimalTicks",
				value: function(t) {
					var e = [],
						i = t.length,
						a = this._chartData.dataList();
					if (i > 0) {
						var n = this._chartData.dateTimeFormat(),
							r = this._chartData.styleOptions().xAxis.tickText;
						this._measureCtx.font = jt(r.size, r.weight, r.family);
						var o = Xt(this._measureCtx, "00-00 00:00"),
							s = this.convertToPixel(parseInt(t[0].v, 10)),
							c = 1;
						if (i > 1) {
							var h = this.convertToPixel(parseInt(t[1].v, 10)),
								l = Math.abs(h - s);
							o > l && (c = Math.ceil(o / l))
						}
						for (var u = 0; i > u; u += c) {
							var d = parseInt(t[u].v, 10),
								_ = a[d].timestamp,
								v = J(n, _, "hh:mm");
							if (0 !== u) v = this._optimalTickLabel(n, _, a[parseInt(t[u - c].v, 10)].timestamp) || v;
							var f = this.convertToPixel(d);
							e.push({
								v: v,
								x: f,
								oV: _
							})
						}
						if (1 === e.length) e[0].v = J(n, e[0].oV, "YYYY-MM-DD hh:mm");
						else {
							var p = e[0].oV,
								m = e[1].oV;
							if (e[2]) {
								var y = e[2].v;
								/^[0-9]{2}-[0-9]{2}$/.test(y) ? e[0].v = J(n, p, "MM-DD") : /^[0-9]{4}-[0-9]{2}$/.test(y) ? e[0].v = J(n,
									p, "YYYY-MM") : /^[0-9]{4}$/.test(y) && (e[0].v = J(n, p, "YYYY"))
							} else e[0].v = this._optimalTickLabel(n, p, m) || e[0].v
						}
					}
					return e
				}
			}, {
				key: "_optimalTickLabel",
				value: function(t, e, i) {
					var a = J(t, e, "YYYY"),
						n = J(t, e, "YYYY-MM"),
						r = J(t, e, "MM-DD");
					return a !== J(t, i, "YYYY") ? a : n !== J(t, i, "YYYY-MM") ? n : r !== J(t, i, "MM-DD") ? r : null
				}
			}, {
				key: "getSelfHeight",
				value: function() {
					var t = this._chartData.styleOptions(),
						e = t.xAxis,
						i = e.height;
					if (O(i) && V(+i)) return +i;
					var a = t.crosshair,
						n = 0;
					e.show && (e.axisLine.show && (n += e.axisLine.size), e.tickLine.show && (n += e.tickLine.length), e.tickText
						.show && (n += e.tickText.paddingTop + e.tickText.paddingBottom + e.tickText.size));
					var r = 0;
					return a.show && a.vertical.show && a.vertical.text.show && (r += a.vertical.text.paddingTop + a.vertical.text
						.paddingBottom + 2 * a.vertical.text.borderSize + a.vertical.text.size), Math.max(n, r)
				}
			}, {
				key: "convertFromPixel",
				value: function(t) {
					return Math.round(this._chartData.coordinateToFloatIndex(t)) - 1
				}
			}, {
				key: "convertToPixel",
				value: function(t) {
					var e = this._chartData.dataList().length,
						i = this._chartData.dataSpace(),
						a = e + this._chartData.offsetRightBarCount() - t;
					return this._width - (a - .5) * i + this._chartData.barSpace() / 2
				}
			}]), i
		}(he),
		ke = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "_initBefore",
				value: function() {
					this._xAxis = new ge(this._chartData)
				}
			}, {
				key: "_createMainWidget",
				value: function(t, e) {
					return new xe({
						container: t,
						chartData: e.chartData,
						xAxis: this._xAxis
					})
				}
			}, {
				key: "computeAxis",
				value: function() {
					this._xAxis.computeAxis(!0)
				}
			}, {
				key: "getSelfAxisHeight",
				value: function() {
					return this._xAxis.getSelfHeight()
				}
			}, {
				key: "xAxis",
				value: function() {
					return this._xAxis
				}
			}, {
				key: "setWidth",
				value: function(t, e) {
					b(w(i.prototype), "setWidth", this).call(this, t, e), this._xAxis.setWidth(t)
				}
			}, {
				key: "setHeight",
				value: function(t) {
					b(w(i.prototype), "setHeight", this).call(this, t), this._xAxis.setHeight(t)
				}
			}]), i
		}(Ut),
		we = 0,
		De = 2;

	function Pe(t) {
		return t.getBoundingClientRect() || {
			left: 0,
			top: 0
		}
	}

	function Me(t) {
		return !!t.touches
	}

	function be(t) {
		t.cancelable && t.preventDefault()
	}
	var Ee = !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in window || !!(window.DocumentTouch &&
			document instanceof window.DocumentTouch),
		Ce = "onorientationchange" in window && Ee;

	function Ie(t, e) {
		var i = t.clientX - e.clientX,
			a = t.clientY - e.clientY;
		return Math.sqrt(i * i + a * a)
	}
	var Te = "mouse",
		Se = "touch",
		Ae = function() {
			function t(e, i, a) {
				f(this, t), this._target = e, this._handler = i, this._options = a, this._clickCount = 0, this._clickTimeoutId =
					null, this._longTapTimeoutId = null, this._longTapActive = !1, this._mouseMoveStartPosition = null, this._moveExceededManhattanDistance = !
					1, this._cancelClick = !1, this._unsubscribeOutsideEvents = null, this._unsubscribeMousemove = null, this._unsubscribeRoot =
					null, this._startPinchMiddlePoint = null, this._startPinchDistance = 0, this._pinchPrevented = !1, this._preventDragProcess = !
					1, this._mousePressed = !1, this._init()
			}
			return m(t, [{
				key: "destroy",
				value: function() {
					null !== this._unsubscribeOutsideEvents && (this._unsubscribeOutsideEvents(), this._unsubscribeOutsideEvents =
							null), null !== this._unsubscribeMousemove && (this._unsubscribeMousemove(), this._unsubscribeMousemove =
							null), null !== this._unsubscribeRoot && (this._unsubscribeRoot(), this._unsubscribeRoot = null), this._clearLongTapTimeout(),
						this._resetClickTimeout()
				}
			}, {
				key: "_mouseEnterHandler",
				value: function(t) {
					var e = this;
					this._unsubscribeMousemove && this._unsubscribeMousemove();
					var i = this._mouseMoveHandler.bind(this),
						a = this._mouseWheelHandler.bind(this);
					this._unsubscribeMousemove = function() {
						e._target.removeEventListener("mousemove", i), e._target.removeEventListener("wheel", a)
					}, this._target.addEventListener("mousemove", i), this._target.addEventListener("wheel", a, {
						passive: !1
					}), Me(t) && this._mouseMoveHandler(t);
					var n = this._makeCompatEvent(t);
					this._processEvent(n, this._handler.mouseEnterEvent)
				}
			}, {
				key: "_resetClickTimeout",
				value: function() {
					null !== this._clickTimeoutId && clearTimeout(this._clickTimeoutId), this._clickCount = 0, this._clickTimeoutId =
						null
				}
			}, {
				key: "_mouseMoveHandler",
				value: function(t) {
					if (!this._mousePressed || Me(t)) {
						var e = this._makeCompatEvent(t);
						this._processEvent(e, this._handler.mouseMoveEvent)
					}
				}
			}, {
				key: "_mouseWheelHandler",
				value: function(t) {
					var e = this._makeCompatEvent(t);
					t.localX = e.localX, t.localY = e.localY, this._processEvent(t, this._handler.mouseWheelEvent)
				}
			}, {
				key: "_mouseMoveWithDownHandler",
				value: function(t) {
					if ((!("button" in t) || t.button === we) && null === this._startPinchMiddlePoint) {
						var e = Me(t);
						if (!this._preventDragProcess || !e) {
							this._pinchPrevented = !0;
							var i = this._makeCompatEvent(t),
								a = this._mouseMoveStartPosition,
								n = Math.abs(a.x - i.pageX),
								r = Math.abs(a.y - i.pageY),
								o = n + r > 5;
							if (o || !e) {
								if (o && !this._moveExceededManhattanDistance && e) {
									var s = .5 * n;
									r >= s && !this._options.treatVertTouchDragAsPageScroll || s > r && !this._options.treatHorzTouchDragAsPageScroll ||
										(this._preventDragProcess = !0)
								}
								o && (this._moveExceededManhattanDistance = !0, this._cancelClick = !0, e && this._clearLongTapTimeout()),
									this._preventDragProcess || (this._processEvent(i, this._handler.pressedMouseMoveEvent), e && be(t))
							}
						}
					}
				}
			}, {
				key: "_mouseUpHandler",
				value: function(t) {
					if (!("button" in t) || t.button === we) {
						var e = this._makeCompatEvent(t);
						this._clearLongTapTimeout(), this._mouseMoveStartPosition = null, this._mousePressed = !1, this._unsubscribeRoot &&
							(this._unsubscribeRoot(), this._unsubscribeRoot = null), Me(t) && this._mouseLeaveHandler(t), this._processEvent(
								e, this._handler.mouseUpEvent), ++this._clickCount, this._clickTimeoutId && this._clickCount > 1 ? (this._processEvent(
								e, this._handler.mouseDoubleClickEvent), this._resetClickTimeout()) : this._cancelClick || this._processEvent(
								e, this._handler.mouseClickEvent), Me(t) && (be(t), this._mouseLeaveHandler(t), 0 === t.touches.length &&
								(this._longTapActive = !1))
					}
				}
			}, {
				key: "_clearLongTapTimeout",
				value: function() {
					null !== this._longTapTimeoutId && (clearTimeout(this._longTapTimeoutId), this._longTapTimeoutId = null)
				}
			}, {
				key: "_mouseDownHandler",
				value: function(t) {
					if (!("button" in t) || t.button === we || t.button === De) {
						var e = this._makeCompatEvent(t);
						if ("button" in t && t.button === De) this._processEvent(e, this._handler.mouseRightDownEvent);
						else {
							this._cancelClick = !1, this._moveExceededManhattanDistance = !1, this._preventDragProcess = !1, Me(t) &&
								this._mouseEnterHandler(t), this._mouseMoveStartPosition = {
									x: e.pageX,
									y: e.pageY
								}, this._unsubscribeRoot && (this._unsubscribeRoot(), this._unsubscribeRoot = null);
							var i = this._mouseMoveWithDownHandler.bind(this),
								a = this._mouseUpHandler.bind(this),
								n = this._target.ownerDocument.documentElement;
							this._unsubscribeRoot = function() {
									n.removeEventListener("touchmove", i), n.removeEventListener("touchend", a), n.removeEventListener(
										"mousemove", i), n.removeEventListener("mouseup", a)
								}, n.addEventListener("touchmove", i, {
									passive: !1
								}), n.addEventListener("touchend", a, {
									passive: !1
								}), this._clearLongTapTimeout(), Me(t) && 1 === t.touches.length ? this._longTapTimeoutId = setTimeout(
									this._longTapHandler.bind(this, t), 600) : (n.addEventListener("mousemove", i), n.addEventListener(
									"mouseup", a)), this._mousePressed = !0, this._processEvent(e, this._handler.mouseDownEvent), this._clickTimeoutId ||
								(this._clickCount = 0, this._clickTimeoutId = setTimeout(this._resetClickTimeout.bind(this), 500))
						}
					}
				}
			}, {
				key: "_init",
				value: function() {
					var t = this;
					this._target.addEventListener("mouseenter", this._mouseEnterHandler.bind(this)), this._target.addEventListener(
						"touchcancel", this._clearLongTapTimeout.bind(this));
					var e = this._target.ownerDocument,
						i = function(e) {
							t._handler.mouseDownOutsideEvent && (e.target && t._target.contains(e.target) || t._handler.mouseDownOutsideEvent())
						};
					this._unsubscribeOutsideEvents = function() {
							e.removeEventListener("mousedown", i), e.removeEventListener("touchstart", i)
						}, e.addEventListener("mousedown", i), e.addEventListener("touchstart", i, {
							passive: !0
						}), this._target.addEventListener("mouseleave", this._mouseLeaveHandler.bind(this)), this._target.addEventListener(
							"touchstart", this._mouseDownHandler.bind(this), {
								passive: !0
							}), Ce || this._target.addEventListener("mousedown", this._mouseDownHandler.bind(this)), this._initPinch(),
						this._target.addEventListener("touchmove", (function() {}), {
							passive: !1
						})
				}
			}, {
				key: "_initPinch",
				value: function() {
					var t = this;
					void 0 === this._handler.pinchStartEvent && void 0 === this._handler.pinchEvent && void 0 === this._handler.pinchEndEvent ||
						(this._target.addEventListener("touchstart", (function(e) {
							return t._checkPinchState(e.touches)
						}), {
							passive: !0
						}), this._target.addEventListener("touchmove", (function(e) {
							if (2 === e.touches.length && null !== t._startPinchMiddlePoint && void 0 !== t._handler.pinchEvent) {
								var i = Ie(e.touches[0], e.touches[1]);
								t._handler.pinchEvent(t._startPinchMiddlePoint, i / t._startPinchDistance), be(e)
							}
						}), {
							passive: !1
						}), this._target.addEventListener("touchend", (function(e) {
							t._checkPinchState(e.touches)
						})))
				}
			}, {
				key: "_checkPinchState",
				value: function(t) {
					1 === t.length && (this._pinchPrevented = !1), 2 !== t.length || this._pinchPrevented || this._longTapActive ?
						this._stopPinch() : this._startPinch(t)
				}
			}, {
				key: "_startPinch",
				value: function(t) {
					var e = Pe(this._target);
					this._startPinchMiddlePoint = {
							x: (t[0].clientX - e.left + (t[1].clientX - e.left)) / 2,
							y: (t[0].clientY - e.top + (t[1].clientY - e.top)) / 2
						}, this._startPinchDistance = Ie(t[0], t[1]), void 0 !== this._handler.pinchStartEvent && this._handler.pinchStartEvent(),
						this._clearLongTapTimeout()
				}
			}, {
				key: "_stopPinch",
				value: function() {
					null !== this._startPinchMiddlePoint && (this._startPinchMiddlePoint = null, void 0 !== this._handler.pinchEndEvent &&
						this._handler.pinchEndEvent())
				}
			}, {
				key: "_mouseLeaveHandler",
				value: function(t) {
					this._unsubscribeMousemove && this._unsubscribeMousemove();
					var e = this._makeCompatEvent(t);
					this._processEvent(e, this._handler.mouseLeaveEvent)
				}
			}, {
				key: "_longTapHandler",
				value: function(t) {
					var e = this._makeCompatEvent(t);
					this._processEvent(e, this._handler.longTapEvent), this._cancelClick = !0, this._longTapActive = !0
				}
			}, {
				key: "_processEvent",
				value: function(t, e) {
					e && e.call(this._handler, t)
				}
			}, {
				key: "_makeCompatEvent",
				value: function(t) {
					var e;
					e = "touches" in t && t.touches.length ? t.touches[0] : "changedTouches" in t && t.changedTouches.length ? t
						.changedTouches[0] : t;
					var i = Pe(this._target);
					return {
						clientX: e.clientX,
						clientY: e.clientY,
						pageX: e.pageX,
						pageY: e.pageY,
						screenX: e.screenX,
						screenY: e.screenY,
						localX: e.clientX - i.left,
						localY: e.clientY - i.top,
						ctrlKey: t.ctrlKey,
						altKey: t.altKey,
						shiftKey: t.shiftKey,
						metaKey: t.metaKey,
						type: t.type.startsWith("mouse") ? Te : Se,
						target: e.target,
						view: t.view
					}
				}
			}]), t
		}(),
		Le = function() {
			function t(e, i, a, n, r) {
				f(this, t), this._chartData = i, this._paneIndex = a, this._width = 0, this._offsetLeft = 0, this._dragEventHandler =
					r, this._dragFlag = !1, this._initElement(e, n)
			}
			return m(t, [{
				key: "_initElement",
				value: function(t, e) {
					this._container = t, this._wrapper = this._createElement(), this._wrapper.style.position = "relative", this._element =
						this._createElement(), this._element.style.width = "100%", this._element.style.position = "absolute", this._element
						.style.zIndex = "20", this._element.style.top = "-3px", this._element.style.height = "7px", e && (this._element
							.style.cursor = "ns-resize", this._dragEvent = new Ae(this._element, {
								mouseDownEvent: this._mouseDownEvent.bind(this),
								mouseUpEvent: this._mouseUpEvent.bind(this),
								pressedMouseMoveEvent: this._pressedMouseMoveEvent.bind(this),
								mouseEnterEvent: this._mouseEnterEvent.bind(this),
								mouseLeaveEvent: this._mouseLeaveEvent.bind(this)
							}, {
								treatVertTouchDragAsPageScroll: !1,
								treatHorzTouchDragAsPageScroll: !0
							})), this._wrapper.appendChild(this._element);
					var i = t.lastChild;
					i ? t.insertBefore(this._wrapper, i) : t.appendChild(this._wrapper)
				}
			}, {
				key: "_createElement",
				value: function() {
					var t = document.createElement("div");
					return t.style.margin = "0", t.style.padding = "0", t
				}
			}, {
				key: "_mouseDownEvent",
				value: function(t) {
					this._dragFlag = !0, this._startY = t.pageY, this._dragEventHandler.startDrag(this._paneIndex)
				}
			}, {
				key: "_mouseUpEvent",
				value: function() {
					this._dragFlag = !1, this._chartData.setDragPaneFlag(!1)
				}
			}, {
				key: "_pressedMouseMoveEvent",
				value: function(t) {
					this._dragEventHandler.drag(t.pageY - this._startY, this._paneIndex), this._chartData.setDragPaneFlag(!0),
						this._chartData.setCrosshairPointPaneId()
				}
			}, {
				key: "_mouseEnterEvent",
				value: function() {
					var t = this._chartData.styleOptions().separator;
					this._element.style.background = t.activeBackgroundColor, this._chartData.setDragPaneFlag(!0), this._chartData
						.setCrosshairPointPaneId()
				}
			}, {
				key: "_mouseLeaveEvent",
				value: function() {
					this._dragFlag || (this._element.style.background = null, this._chartData.setDragPaneFlag(!1))
				}
			}, {
				key: "height",
				value: function() {
					return this._wrapper.offsetHeight
				}
			}, {
				key: "setSize",
				value: function(t, e) {
					this._offsetLeft = t, this._width = e, this.invalidate()
				}
			}, {
				key: "updatePaneIndex",
				value: function(t) {
					this._paneIndex = t
				}
			}, {
				key: "invalidate",
				value: function() {
					var t = this._chartData.styleOptions().separator;
					this._element.style.top = "".concat(-Math.floor((7 - t.size) / 2), "px"), this._wrapper.style.backgroundColor =
						t.color, this._wrapper.style.height = "".concat(t.size, "px"), this._wrapper.style.marginLeft = "".concat(t
							.fill ? 0 : this._offsetLeft, "px"), this._wrapper.style.width = t.fill ? "100%" : "".concat(this._width,
							"px")
				}
			}, {
				key: "getImage",
				value: function() {
					var t = this._chartData.styleOptions().separator,
						e = document.createElement("canvas"),
						i = e.getContext("2d"),
						a = Nt(e),
						n = this._wrapper.offsetWidth,
						r = t.size;
					return e.style.width = "".concat(n, "px"), e.style.height = "".concat(r, "px"), e.width = n * a, e.height =
						r * a, i.scale(a, a), i.fillStyle = t.color, i.fillRect(this._offsetLeft, 0, n, r), e
				}
			}, {
				key: "destroy",
				value: function() {
					this._dragEvent && this._dragEvent.destroy(), this._container.removeChild(this._wrapper)
				}
			}]), t
		}();

	function Ve(t) {
		return t.type === Se
	}

	function Oe(t) {
		return t.type === Te
	}
	var ze = function() {
			function t(e) {
				f(this, t), this._chartData = e, this._chartContentSize = {}, this._paneContentSize = {}
			}
			return m(t, [{
				key: "_checkEventPointX",
				value: function(t) {
					return t > 0 && this._chartContentSize.contentRight - this._chartContentSize.contentLeft > t
				}
			}, {
				key: "setChartContentSize",
				value: function(t) {
					this._chartContentSize = t
				}
			}, {
				key: "setPaneContentSize",
				value: function(t) {
					this._paneContentSize = t
				}
			}]), t
		}(),
		Re = function(t) {
			k(i, t);
			var e = M(i);

			function i(t) {
				var a;
				return f(this, i), (a = e.call(this, t))._startScrollPoint = {}, a._touchPoint = null, a._touchCancelCrossHair = !
					1, a._touchZoomed = !1, a._pinchScale = 1, a
			}
			return m(i, [{
				key: "pinchStartEvent",
				value: function() {
					this._pinchScale = 1, this._touchZoomed = !0
				}
			}, {
				key: "pinchEvent",
				value: function(t, e) {
					var i = 5 * (e - this._pinchScale);
					this._pinchScale = e, this._chartData.zoom(i, t)
				}
			}, {
				key: "mouseLeaveEvent",
				value: function(t) {
					Oe(t) && this._chartData.setCrosshairPointPaneId()
				}
			}, {
				key: "mouseMoveEvent",
				value: function(t) {
					var e = this;
					Oe(t) && this._performCross(t, !1, (function(i) {
						e._chartData.setCrosshairPointPaneId({
							x: t.localX,
							y: i.y
						}, i.paneId)
					}), (function() {
						e._chartData.setCrosshairPointPaneId()
					}))
				}
			}, {
				key: "mouseWheelEvent",
				value: function(t) {
					if (this._checkEventPointX(t.localX)) {
						var e = -t.deltaY / 100;
						if (0 !== e) {
							switch (t.cancelable && t.preventDefault(), t.deltaMode) {
								case t.DOM_DELTA_PAGE:
									e *= 120;
									break;
								case t.DOM_DELTA_LINE:
									e *= 32
							}
							if (0 !== e) {
								var i = Math.sign(e) * Math.min(1, Math.abs(e));
								this._chartData.zoom(i, {
									x: t.localX,
									y: t.localY
								})
							}
						}
					}
				}
			}, {
				key: "mouseClickEvent",
				value: function(t) {
					var e = this;
					this._performCross(t, !0, (function(i) {
						e._touchPoint || e._touchCancelCrossHair || e._touchZoomed || (e._touchPoint = {
							x: t.localX,
							y: t.localY
						}, e._chartData.setCrosshairPointPaneId({
							x: t.localX,
							y: i.y
						}, i.paneId))
					}))
				}
			}, {
				key: "mouseDownEvent",
				value: function(t) {
					var e = this;
					this._startScrollPoint = {
						x: t.localX,
						y: t.localY
					}, this._chartData.startScroll(), this._performCross(t, !0, (function(i) {
						var a = {
							x: t.localX,
							y: i.y
						};
						if (e._touchZoomed = !1, e._touchPoint) {
							var n = t.localX - e._touchPoint.x,
								r = t.localY - e._touchPoint.y;
							10 > Math.sqrt(n * n + r * r) ? (e._touchPoint = {
								x: t.localX,
								y: t.localY
							}, e._chartData.setCrosshairPointPaneId(a, i.paneId)) : (e._touchCancelCrossHair = !0, e._touchPoint =
								null, e._chartData.setCrosshairPointPaneId())
						} else e._touchCancelCrossHair = !1
					}))
				}
			}, {
				key: "pressedMouseMoveEvent",
				value: function(t) {
					var e = this;
					this._performCross(t, !1, (function(i) {
						var a = {
							x: t.localX,
							y: i.y
						};
						if (Ve(t) && e._touchPoint) return e._touchPoint = {
							x: t.localX,
							y: t.localY
						}, void e._chartData.setCrosshairPointPaneId(a, i.paneId);
						var n = t.localX - e._startScrollPoint.x;
						e._chartData.setCrosshairPointPaneId(a, i.paneId), e._chartData.scroll(n)
					}))
				}
			}, {
				key: "longTapEvent",
				value: function(t) {
					var e = this;
					this._performCross(t, !0, (function(i) {
						e._touchPoint = {
							x: t.localX,
							y: t.localY
						}, e._chartData.setCrosshairPointPaneId({
							x: t.localX,
							y: i.y
						}, i.paneId)
					}))
				}
			}, {
				key: "_performCross",
				value: function(t, e, i, a) {
					if (!e || Ve(t))
						if (this._checkEventPointX(t.localX)) {
							var n = !1;
							for (var r in this._paneContentSize) {
								var o = this._paneContentSize[r];
								if (t.localY > o.contentTop && o.contentBottom > t.localY) {
									n = !0, i && i({
										paneId: r,
										y: t.localY - o.contentTop
									});
									break
								}
							}!n && a && a()
						} else a && a()
				}
			}]), i
		}(ze),
		Fe = function(t) {
			k(i, t);
			var e = M(i);

			function i(t) {
				var a;
				return f(this, i), (a = e.call(this, t))._pressedGraphicMark = null, a
			}
			return m(i, [{
				key: "mouseUpEvent",
				value: function(t) {
					this._pressedGraphicMark && (this._pressedGraphicMark = null, this._chartData.setDragGraphicMarkFlag(!1))
				}
			}, {
				key: "mouseMoveEvent",
				value: function(t) {
					if (this._checkEventPointX(t.localX) && this._checkEventPointY(t.localY)) {
						var e = {
							x: t.localX,
							y: t.localY
						};
						if (!this._waitingForMouseMoveAnimationFrame) {
							this._waitingForMouseMoveAnimationFrame = !0;
							var i, a, n = this._chartData.graphicMarks(),
								r = n[n.length - 1];
							if (r && r.isDrawing()) r.mouseMoveForDrawing(e), i = r.checkMousePointOnGraphic(e), a = {
								id: "",
								element: kt,
								elementIndex: -1
							};
							else {
								var o, s = C(n);
								try {
									for (s.s(); !(o = s.n()).done;) {
										if (i = o.value.checkMousePointOnGraphic(e)) break
									}
								} catch (t) {
									s.e(t)
								} finally {
									s.f()
								}
							}
							this._chartData.setGraphicMarkMouseOperate(i || {
								id: "",
								element: kt,
								elementIndex: -1
							}, a), this._waitingForMouseMoveAnimationFrame = !1
						}
					}
				}
			}, {
				key: "mouseDownEvent",
				value: function(t) {
					if (this._checkEventPointX(t.localX) && this._checkEventPointY(t.localY)) {
						var e, i = {
								x: t.localX,
								y: t.localY
							},
							a = this._chartData.graphicMarks(),
							n = a[a.length - 1],
							r = {
								id: "",
								element: kt,
								elementIndex: -1
							};
						if (n && n.isDrawing()) n.mouseLeftButtonDownForDrawing(i), e = n.checkMousePointOnGraphic(i);
						else
							for (var o = 0; a.length > o; o++)
								if (e = a[o].checkMousePointOnGraphic(i)) {
									e.element === gt && (this._pressedGraphicMark = a[o], this._chartData.setDragGraphicMarkFlag(!0), r = g({},
										e)), a[o].onClick({
										id: e.id,
										event: t
									});
									break
								} this._chartData.setGraphicMarkMouseOperate(r, e || {
							id: "",
							element: kt,
							elementIndex: -1
						})
					}
				}
			}, {
				key: "mouseRightDownEvent",
				value: function(t) {
					for (var e = this._chartData.graphicMarks(), i = 0; e.length > i; i++)
						if (e[i].checkMousePointOnGraphic({
								x: t.localX,
								y: t.localY
							}) && !e[i].onRightClick({
								id: e[i].id(),
								event: t
							})) {
							this._chartData.removeGraphicMarkInstance({
								type: Ht,
								index: i
							});
							break
						}
				}
			}, {
				key: "pressedMouseMoveEvent",
				value: function(t) {
					var e = this._chartData.graphicMarks(),
						i = e[e.length - 1];
					i && i.isDrawing() || !this._pressedGraphicMark || (this._pressedGraphicMark.mousePressedMove({
						x: t.localX,
						y: t.localY
					}, t), this._chartData.invalidate(zt))
				}
			}, {
				key: "_checkEventPointY",
				value: function(t) {
					var e = this._paneContentSize[Ze];
					return t > e.contentTop && e.contentBottom > t
				}
			}]), i
		}(ze),
		Be = "Equal",
		Ye = "Minus",
		He = "ArrowLeft",
		We = "ArrowRight",
		Ge = function(t) {
			k(i, t);
			var e = M(i);

			function i() {
				return f(this, i), e.apply(this, arguments)
			}
			return m(i, [{
				key: "keyBoardDownEvent",
				value: function(t) {
					if (t.shiftKey) switch (t.code) {
						case Be:
							this._chartData.zoom(.5);
							break;
						case Ye:
							this._chartData.zoom(-.5);
							break;
						case He:
							this._chartData.startScroll(), this._chartData.scroll(3 * -this._chartData.dataSpace());
							break;
						case We:
							this._chartData.startScroll(), this._chartData.scroll(3 * this._chartData.dataSpace())
					}
				}
			}]), i
		}(ze),
		Ne = function() {
			function t(e, i) {
				f(this, t), this._target = e, this._chartData = i, this._chartContentSize = {}, this._event = new Ae(this._target, {
						pinchStartEvent: this._pinchStartEvent.bind(this),
						pinchEvent: this._pinchEvent.bind(this),
						mouseUpEvent: this._mouseUpEvent.bind(this),
						mouseClickEvent: this._mouseClickEvent.bind(this),
						mouseDownEvent: this._mouseDownEvent.bind(this),
						mouseRightDownEvent: this._mouseRightDownEvent.bind(this),
						mouseLeaveEvent: this._mouseLeaveEvent.bind(this),
						mouseMoveEvent: this._mouseMoveEvent.bind(this),
						mouseWheelEvent: this._mouseWheelEvent.bind(this),
						pressedMouseMoveEvent: this._pressedMouseMoveEvent.bind(this),
						longTapEvent: this._longTapEvent.bind(this)
					}, {
						treatVertTouchDragAsPageScroll: !1,
						treatHorzTouchDragAsPageScroll: !1
					}), this._boundKeyBoardDownEvent = this._keyBoardDownEvent.bind(this), this._target.addEventListener("keydown",
						this._boundKeyBoardDownEvent), this._boundContextMenuEvent = function(t) {
						t.preventDefault()
					}, this._target.addEventListener("contextmenu", this._boundContextMenuEvent, !1), this._zoomScrollEventHandler =
					new Re(i), this._graphicMarkEventHandler = new Fe(i), this._keyBoardEventHandler = new Ge(i)
			}
			return m(t, [{
				key: "_keyBoardDownEvent",
				value: function(t) {
					this._keyBoardEventHandler.keyBoardDownEvent(t)
				}
			}, {
				key: "_pinchStartEvent",
				value: function() {
					this._zoomScrollEventHandler.pinchStartEvent()
				}
			}, {
				key: "_pinchEvent",
				value: function(t, e) {
					this._zoomScrollEventHandler.pinchEvent(t, e)
				}
			}, {
				key: "_mouseUpEvent",
				value: function(t) {
					this._target.style.cursor = "crosshair", this._shouldPerformGraphicMarkEvent() && (t.localX -= this._chartContentSize
						.contentLeft, this._graphicMarkEventHandler.mouseUpEvent(t))
				}
			}, {
				key: "_mouseLeaveEvent",
				value: function(t) {
					this._checkZoomScroll() && (t.localX -= this._chartContentSize.contentLeft, this._zoomScrollEventHandler.mouseLeaveEvent(
						t))
				}
			}, {
				key: "_mouseMoveEvent",
				value: function(t) {
					t.localX -= this._chartContentSize.contentLeft, this._shouldPerformGraphicMarkEvent() && this._graphicMarkEventHandler
						.mouseMoveEvent(t), this._checkZoomScroll() && this._zoomScrollEventHandler.mouseMoveEvent(t)
				}
			}, {
				key: "_mouseWheelEvent",
				value: function(t) {
					this._checkZoomScroll() && this._zoomScrollEventHandler.mouseWheelEvent(t)
				}
			}, {
				key: "_mouseClickEvent",
				value: function(t) {
					this._checkZoomScroll() && (t.localX -= this._chartContentSize.contentLeft, this._zoomScrollEventHandler.mouseClickEvent(
						t))
				}
			}, {
				key: "_mouseDownEvent",
				value: function(t) {
					this._target.style.cursor = "pointer", t.localX -= this._chartContentSize.contentLeft, this._shouldPerformGraphicMarkEvent() &&
						this._graphicMarkEventHandler.mouseDownEvent(t), this._checkZoomScroll() && this._zoomScrollEventHandler.mouseDownEvent(
							t)
				}
			}, {
				key: "_mouseRightDownEvent",
				value: function(t) {
					this._shouldPerformGraphicMarkEvent() && (t.localX -= this._chartContentSize.contentLeft, this._graphicMarkEventHandler
						.mouseRightDownEvent(t))
				}
			}, {
				key: "_pressedMouseMoveEvent",
				value: function(t) {
					t.localX -= this._chartContentSize.contentLeft, this._chartData.dragGraphicMarkFlag() && (this._graphicMarkEventHandler
						.pressedMouseMoveEvent(t), this._chartData.crosshair().paneId && this._chartData.setCrosshairPointPaneId()
					), this._checkZoomScroll() && this._zoomScrollEventHandler.pressedMouseMoveEvent(t)
				}
			}, {
				key: "_longTapEvent",
				value: function(t) {
					this._checkZoomScroll() && (t.localX -= this._chartContentSize.contentLeft, this._zoomScrollEventHandler.longTapEvent(
						t))
				}
			}, {
				key: "_checkZoomScroll",
				value: function() {
					var t = this._chartData.graphicMarks(),
						e = t.length;
					return !(this._chartData.dragPaneFlag() || this._chartData.dragGraphicMarkFlag() || 0 !== e && t[e - 1].isDrawing())
				}
			}, {
				key: "_shouldPerformGraphicMarkEvent",
				value: function() {
					return this._chartData.graphicMarks().length > 0
				}
			}, {
				key: "setChartContentSize",
				value: function(t) {
					this._chartContentSize = t, this._zoomScrollEventHandler.setChartContentSize(t), this._graphicMarkEventHandler
						.setChartContentSize(t)
				}
			}, {
				key: "setPaneContentSize",
				value: function(t) {
					this._zoomScrollEventHandler.setPaneContentSize(t), this._graphicMarkEventHandler.setPaneContentSize(t)
				}
			}, {
				key: "destroy",
				value: function() {
					this._event.destroy(), this._target.removeEventListener("keydown", this._boundKeyBoardDownEvent), this._target
						.removeEventListener("contextmenu", this._boundContextMenuEvent)
				}
			}]), t
		}();

	function Xe(t) {
		var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 16,
			i = 0;
		return function() {
			var a = Date.now(),
				n = this,
				r = arguments;
			a - i > e && (t.apply(n, r), i = a)
		}
	}
	var je = "technical_indicator_pane_",
		Ue = "graphic_mark_",
		Ze = "candle_pane",
		Ke = function() {
			function t(e, i) {
				f(this, t), this._initChartContainer(e), this._graphicMarkBaseId = 0, this._paneBaseId = 0, this._technicalIndicatorPanes = [],
					this._separatorPanes = [], this._separatorDragStartTechnicalIndicatorHeight = 0, this._chartData = new Gt(i,
						this._updatePane.bind(this)), this._xAxisPane = new ke({
						container: this._chartContainer,
						chartData: this._chartData
					}), this._candlePane = new pe({
						container: this._chartContainer,
						chartData: this._chartData,
						xAxis: this._xAxisPane.xAxis(),
						id: Ze
					}), this._chartEvent = new Ne(this._chartContainer, this._chartData), this.adjustPaneViewport(!0, !0, !0)
			}
			return m(t, [{
				key: "_initChartContainer",
				value: function(t) {
					this._container = t, this._chartContainer = document.createElement("div"), this._chartContainer.style.userSelect =
						"none", this._chartContainer.style.webkitUserSelect = "none", this._chartContainer.style.msUserSelect =
						"none", this._chartContainer.style.MozUserSelect = "none", this._chartContainer.style.webkitTapHighlightColor =
						"transparent", this._chartContainer.style.position = "relative", this._chartContainer.style.outline =
						"none", this._chartContainer.style.borderStyle = "none", this._chartContainer.style.width = "100%", this._chartContainer
						.style.cursor = "crosshair", this._chartContainer.tabIndex = 1, t.appendChild(this._chartContainer)
				}
			}, {
				key: "_separatorStartDrag",
				value: function(t) {
					this._separatorDragStartTechnicalIndicatorHeight = this._technicalIndicatorPanes[t].height()
				}
			}, {
				key: "_separatorDrag",
				value: function(t, e) {
					var i = this._separatorDragStartTechnicalIndicatorHeight - t;
					0 > i && (i = 0), this._technicalIndicatorPanes[e].setHeight(i), this.adjustPaneViewport(!0, !0, !0, !0, !0)
				}
			}, {
				key: "_updatePane",
				value: function() {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Bt;
					if (t === Rt) this._xAxisPane.invalidate(t), this._candlePane.invalidate(t), this._technicalIndicatorPanes.forEach(
						(function(e) {
							e.invalidate(t)
						}));
					else {
						var e = this._candlePane.computeAxis();
						t !== zt && this._technicalIndicatorPanes.forEach((function(t) {
							var i = t.computeAxis();
							i && (e = i)
						})), this.adjustPaneViewport(!1, e, !0)
					}
				}
			}, {
				key: "_calcAllPaneTechnicalIndicator",
				value: function() {
					var t = this,
						e = [Promise.resolve(this._candlePane.calcAllTechnicalIndicator())];
					this._technicalIndicatorPanes.forEach((function(t) {
						e.push(Promise.resolve(t.calcAllTechnicalIndicator()))
					})), Promise.all(e).then((function(e) {
						var i = e.indexOf(!0) > -1;
						t.adjustPaneViewport(!1, i, !0)
					}))
				}
			}, {
				//????????????
				key: "_measurePaneHeight",
				value: function() {
					var t = this._chartData.styleOptions(),
						e = this._container.offsetHeight,
						i = t.separator.size,
						a = i * this._separatorPanes.length,
						n = this._xAxisPane.getSelfAxisHeight(),
						r = e - n - a,
						o = 0;
					this._technicalIndicatorPanes.forEach((function(t) {
						var e = t.height();
						if ((o += e) > r) {
							var i = o - r;
							o = r, t.setHeight(e - i)
						}
					}));
					var s = r - o,
						c = {};
					c[Ze] = {
						contentTop: 0,
						contentBottom: s
					};
					var h = s,
						l = s;
					this._candlePane.setHeight(s);
					for (var u = 0; this._technicalIndicatorPanes.length > u; u++) {
						var d = this._technicalIndicatorPanes[u],
							_ = d.height();
						d.setHeight(_), l += _ + i, c[d.id()] = {
							contentTop: h,
							contentBottom: l
						}, h = l
					}
					this._xAxisPane.setHeight(n), this._chartEvent.setPaneContentSize(c)
				}
			}, {
				key: "_measurePaneWidth",
				value: function() {
					var t, e, i, a, n = this._chartData.styleOptions().yAxis,
						r = n.position === F,
						o = this._container.offsetWidth;
					!n.inside ? (e = this._candlePane.getSelfAxisWidth(), this._technicalIndicatorPanes.forEach((function(t) {
						e = Math.max(e, t.getSelfAxisWidth())
					})), t = o - e, r ? (i = 0, a = e) : (a = 0, i = o - e)) : (t = o, e = o, i = 0, a = 0), this._chartData.setTotalDataSpace(
						t), this._candlePane.setWidth(t, e), this._candlePane.setOffsetLeft(a, i);
					for (var s = 0; this._technicalIndicatorPanes.length > s; s++) {
						var c = this._technicalIndicatorPanes[s],
							h = this._separatorPanes[s];
						c.setWidth(t, e), c.setOffsetLeft(a, i), h.setSize(a, t)
					}
					this._xAxisPane.setWidth(t, e), this._xAxisPane.setOffsetLeft(a, i), this._chartEvent.setChartContentSize({
						contentLeft: a,
						contentRight: a + t
					})
				}
			}, {
				key: "adjustPaneViewport",
				value: function(t, e, i, a, n) {
					t && this._measurePaneHeight();
					var r = !1;
					a && (r = this._candlePane.computeAxis(n), this._technicalIndicatorPanes.forEach((function(t) {
						var e = t.computeAxis(n);
						r || (r = e)
					}))), (!a && e || a && r) && this._measurePaneWidth(), i && (this._xAxisPane.computeAxis(), this._xAxisPane
						.layout(), this._candlePane.layout(), this._technicalIndicatorPanes.forEach((function(t) {
							t.layout()
						})))
				}
			}, {
				key: "chartData",
				value: function() {
					return this._chartData
				}
			}, {
				key: "overrideTechnicalIndicator",
				value: function(t) {
					var e = this,
						i = t.name,
						a = t.calcParams,
						n = t.precision,
						r = t.styles,
						o = this._chartData.technicalIndicator(i);
					if (o) {
						var s = o.setCalcParams(a),
							c = o.setPrecision(n),
							h = o.setStyles(r, this._chartData.styleOptions().technicalIndicator);
						if (s || c || h) {
							var l = this._candlePane.technicalIndicators(),
								u = !1,
								d = [];
							l.forEach((function(t) {
								t.name === i && (s && (u = !0, t.setCalcParams(a), d.push(Promise.resolve(e._candlePane.calcTechnicalIndicator(
									t)))), c && (u = !0, t.setPrecision(n)), h && (u = !0, t.setStyles(r)))
							})), this._technicalIndicatorPanes.forEach((function(t) {
								t.technicalIndicators().forEach((function(e) {
									e.name === i && (s && (u = !0, e.setCalcParams(a), d.push(Promise.resolve(t.calcTechnicalIndicator(
										e)))), c && (u = !0, e.setPrecision(n)), h && (u = !0, e.setStyles(r)))
								}))
							})), u && Promise.all(d).then((function(t) {
								e.adjustPaneViewport(!1, !0, !0, !0)
							}))
						}
					}
				}
			}, {
				key: "_applyDataList",
				value: function(t, e, i) {
					S(t) && (A(i) && i(), this._chartData.addData(t, 0, e), this._calcAllPaneTechnicalIndicator())
				}
			}, {
				key: "applyNewData",
				value: function(t, e) {
					var i = this;
					this._applyDataList(t, e, (function() {
						i._chartData.clearDataList()
					}))
				}
			}, {
				key: "applyMoreData",
				value: function(t, e) {
					this._applyDataList(t, e)
				}
			}, {
				key: "updateData",
				value: function(t) {
					if (L(t) && !S(t)) {
						var e = this._chartData.dataList(),
							i = e.length,
							a = +$(t, "timestamp", 0),
							n = +$(e[i - 1], "timestamp", 0);
						if (a >= n) {
							var r = i;
							a === n && (r = i - 1), this._chartData.addData(t, r), this._calcAllPaneTechnicalIndicator()
						}
					}
				}
			}, {
				key: "removeTechnicalIndicator",
				value: function(t, e) {
					if (t === Ze) this._candlePane.removeTechnicalIndicator(e) && this.adjustPaneViewport(!1, !0, !0, !0);
					else {
						for (var i, a = 0; this._technicalIndicatorPanes.length > a; a++) {
							if (this._technicalIndicatorPanes[a].id() === t) {
								i = a;
								break
							}
						}
						if (O(i)) {
							var n = this._technicalIndicatorPanes[i].removeTechnicalIndicator(e);
							if (this._technicalIndicatorPanes[i].isEmptyTechnicalIndicator()) {
								this._technicalIndicatorPanes[i].destroy(), this._separatorPanes[i].destroy(), this._technicalIndicatorPanes
									.splice(i, 1), this._separatorPanes.splice(i, 1);
								for (var r = 0; this._separatorPanes.length > r; r++) this._separatorPanes[r].updatePaneIndex(r);
								this.adjustPaneViewport(!0, !0, !0, !0, !0)
							} else n && this.adjustPaneViewport(!1, !0, !0, !0)
						}
					}
				}
			}, {
				key: "createTechnicalIndicator",
				value: function(t, e) {
					var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
					if (i.id) {
						if (i.id === Ze) return this._candlePane.setTechnicalIndicator(t, e) && this.adjustPaneViewport(!1, !0, !0,
							!0), i.id;
						var a, n = C(this._technicalIndicatorPanes);
						try {
							for (n.s(); !(a = n.n()).done;) {
								var r = a.value;
								if (i.id === r.id()) return r.setTechnicalIndicator(t, e) && this.adjustPaneViewport(!1, !0, !0, !0), i.id
							}
						} catch (t) {
							n.e(t)
						} finally {
							n.f()
						}
					}
					var o = this._technicalIndicatorPanes.length,
						s = !z(i.dragEnabled) || i.dragEnabled;
					this._separatorPanes.push(new Le(this._chartContainer, this._chartData, o, s, {
						startDrag: this._separatorStartDrag.bind(this),
						drag: Xe(this._separatorDrag.bind(this), 50)
					}));
					var c = i.id || "".concat(je).concat(++this._paneBaseId),
						h = new ue({
							container: this._chartContainer,
							chartData: this._chartData,
							xAxis: this._xAxisPane.xAxis(),
							name: t.name,
							id: c,
							height: i.height || 30
						});
					return this._technicalIndicatorPanes.push(h), this.adjustPaneViewport(!0, !0, !0, !0, !0), c
				}
			}, {
				key: "getPaneTechnicalIndicator",
				value: function(t) {
					var e = function(t) {
						var e = {};
						return t.technicalIndicators().forEach((function(t) {
							e[t.name] = rt(t)
						})), e
					};
					if (!O(t)) {
						var i = {};
						i[this._candlePane.id()] = e(this._candlePane);
						var a, n = C(this._technicalIndicatorPanes);
						try {
							for (n.s(); !(a = n.n()).done;) {
								var r = a.value;
								i[r.id()] = e(r)
							}
						} catch (t) {
							n.e(t)
						} finally {
							n.f()
						}
						return i
					}
					if (t === Ze) return e(this._candlePane);
					var o, s = C(this._technicalIndicatorPanes);
					try {
						for (s.s(); !(o = s.n()).done;) {
							var c = o.value;
							if (c.id() === t) return e(c)
						}
					} catch (t) {
						s.e(t)
					} finally {
						s.f()
					}
					return {}
				}
			}, {
				key: "createGraphicMark",
				value: function(t) {
					var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
						i = e.id,
						a = e.points,
						n = e.styles,
						r = e.onDrawStart,
						o = e.onDrawing,
						s = e.onDrawEnd,
						c = e.onClick,
						h = e.onRightClick,
						l = e.onPressedMove,
						u = e.onRemove,
						d = i || "".concat(Ue).concat(++this._graphicMarkBaseId),
						_ = new t({
							id: d,
							chartData: this._chartData,
							xAxis: this._xAxisPane.xAxis(),
							yAxis: this._candlePane.yAxis(),
							points: a,
							styles: n
						});
					if (A(r) && (_.onDrawStart = r, _.onDrawStart({
							id: d
						})), A(o) && (_.onDrawing = o), A(s) && (_.onDrawEnd = s), A(c) && (_.onClick = c), A(h) && (_.onRightClick =
							h), A(l) && (_.onPressedMove = l), A(u) && (_.onRemove = u), this._chartData.addGraphicMarkInstance(_))
						return d
				}
			}, {
				key: "setTimezone",
				value: function(t) {
					this._chartData.setTimezone(t), this._xAxisPane.computeAxis(), this._xAxisPane.invalidate(Bt)
				}
			}, {
				key: "getConvertPictureUrl",
				value: function(t, e, i, a) {
					var n = document.createElement("canvas"),
						r = n.getContext("2d"),
						o = Nt(n),
						s = this._chartContainer.offsetWidth,	
						c = this._chartContainer.offsetHeight;
					n.style.width = "".concat(s, "px"), n.style.height = "".concat(c, "px"), n.width = s * o, n.height = c * o,
						r.scale(o, o), r.fillStyle = a, r.fillRect(0, 0, s, c);
					var h = 0,
						l = this._candlePane.height();
					r.drawImage(this._candlePane.getImage(t, e), 0, h, s, l), h += l;
					for (var u = 0; this._separatorPanes.length > u; u++) {
						var d = this._separatorPanes[u],
							_ = d.height(),
							v = this._technicalIndicatorPanes[u],
							f = v.height();
						r.drawImage(d.getImage(), 0, h, s, _), h += _, r.drawImage(v.getImage(t), 0, h, s, f), h += f
					}
					return r.drawImage(this._xAxisPane.getImage(t), 0, h, s, this._xAxisPane.height()), n.toDataURL("image/".concat(
						i))
				}
			}, {
				key: "destroy",
				value: function() {
					this._candlePane.destroy(), this._technicalIndicatorPanes.forEach((function(t) {
						t.destroy()
					})), this._separatorPanes.forEach((function(t) {
						t.destroy()
					})), this._xAxisPane.destroy(), this._container.removeChild(this._chartContainer), this._chartEvent.destroy()
				}
			}]), t
		}(),
		qe = function() {
			function t(e, i) {
				f(this, t), this._chartPane = new Ke(e, i)
			}
			return m(t, [{
				key: "setStyleOptions",
				value: function(t) {
					t && (this._chartPane.chartData().applyStyleOptions(t), this._chartPane.adjustPaneViewport(!0, !0, !0, !0, !
						0))
				}
			}, {
				key: "getStyleOptions",
				value: function() {
					return T(this._chartPane.chartData().styleOptions())
				}
			}, {
				key: "overrideTechnicalIndicator",
				value: function(t) {
					this._chartPane.overrideTechnicalIndicator(t)
				}
			}, {
				key: "getTechnicalIndicatorByName",
				value: function(t) {
					return this._chartPane.chartData().technicalIndicatorInfo(t)
				}
			}, {
				key: "getTechnicalIndicatorByPaneId",
				value: function(t) {
					return this._chartPane.getPaneTechnicalIndicator(t)
				}
			}, {
				key: "setPriceVolumePrecision",
				value: function(t, e) {
					console.log(t,e)
					O(t) && V(t) && t >= 0 && O(e) && V(e) && e >= 0 && this._chartPane.chartData().applyPriceVolumePrecision(t,
						e)
				}
			}, {
				key: "setTimezone",
				value: function(t) {
					this._chartPane.setTimezone(t)
				}
			}, {
				key: "getTimezone",
				value: function() {
					return this._chartPane.chartData().timezone()
				}
			}, {
				key: "resize",
				value: function() {
					this._chartPane.adjustPaneViewport(!0, !0, !0, !0, !0)
				}
			}, {
				key: "setOffsetRightSpace",
				value: function(t) {
					this._chartPane.chartData().setOffsetRightSpace(t)
				}
			}, {
				key: "setLeftMinVisibleBarCount",
				value: function(t) {
					O(t) && V(t) && t > 0 && this._chartPane.chartData().setLeftMinVisibleBarCount(Math.ceil(t))
				}
			}, {
				key: "setRightMinVisibleBarCount",
				value: function(t) {
					O(t) && V(t) && t > 0 && this._chartPane.chartData().setRightMinVisibleBarCount(Math.ceil(t))
				}
			}, {
				key: "setDataSpace",
				value: function(t) {
					this._chartPane.chartData().setDataSpace(t)
				}
			}, {
				key: "clearData",
				value: function() {
					this._chartPane.chartData().clearDataList()
				}
			}, {
				key: "getDataList",
				value: function() {
					return this._chartPane.chartData().dataList()
				}
			}, {
				key: "applyNewData",
				value: function(t, e) {
					S(t) && this._chartPane.applyNewData(t, e)
				}
			}, {
				key: "applyMoreData",
				value: function(t, e) {
					S(t) && this._chartPane.applyMoreData(t, e)
				}
			}, {
				key: "updateData",
				value: function(t) {
					this._chartPane.updateData(t)
				}
			}, {
				key: "loadMore",
				value: function(t) {
					this._chartPane.chartData().loadMore(t)
				}
			}, {
				key: "createTechnicalIndicator",
				value: function(t, e, i) {
					var a = this._chartPane.chartData().technicalIndicator(t);
					return a ? this._chartPane.createTechnicalIndicator(a, e, i) : i && i.id || null
				}
			}, {
				key: "addCustomTechnicalIndicator",
				value: function(t) {
					this._chartPane.chartData().addCustomTechnicalIndicator(t)
				}
			}, {
				key: "removeTechnicalIndicator",
				value: function(t, e) {
					this._chartPane.removeTechnicalIndicator(t, e)
				}
			}, {
				key: "createGraphicMark",
				value: function(t, e) {
					var i = this._chartPane.chartData().graphicMarkMapping()[t];
					if (!i) return null;
					var a = this._chartPane.createGraphicMark(i, e);
					return a || null
				}
			}, {
				key: "setGraphicMarkOptions",
				value: function(t, e) {
					this._chartPane.chartData().setGraphicMarkOptions(t, e)
				}
			}, {
				key: "addCustomGraphicMark",
				value: function(t) {
					this._chartPane.chartData().addCustomGraphicMark(t)
				}
			}, {
				key: "removeGraphicMark",
				value: function(t) {
					t ? this._chartPane.chartData().removeGraphicMarkInstance({
						type: "id",
						id: t
					}) : this._chartPane.chartData().clearGraphicMark()
				}
			}, {
				key: "setZoomEnabled",
				value: function(t) {
					this._chartPane.chartData().setZoomEnabled(t)
				}
			}, {
				key: "isZoomEnabled",
				value: function() {
					return this._chartPane.chartData().zoomEnabled()
				}
			}, {
				key: "setScrollEnabled",
				value: function(t) {
					this._chartPane.chartData().setScrollEnabled(t)
				}
			}, {
				key: "isScrollEnabled",
				value: function() {
					return this._chartPane.chartData().scrollEnabled()
				}
			}, {
				key: "subscribeAction",
				value: function(t, e) {
					this._chartPane.chartData().subscribeAction(t, e)
				}
			}, {
				key: "unsubscribeAction",
				value: function(t, e) {
					this._chartPane.chartData().unsubscribeAction(t, e)
				}
			}, {
				key: "getConvertPictureUrl",
				value: function(t, e) {
					var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "jpeg",
						a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "#333333";
					if ("png" === i || "jpeg" === i || "bmp" === i) return this._chartPane.getConvertPictureUrl(t, e, i, a)
				}
			}, {
				key: "destroy",
				value: function() {
					this._chartPane.destroy()
				}
			}]), t
		}(),
		$e = {},
		Je = 1,
		Qe = "k_line_chart_";

	function ti(t) {
		return t && t instanceof HTMLElement && t.appendChild && "function" == typeof t.appendChild
	}
	_.addTechnicalIndicator([{
		name: "AVP",
		series: "price",
		precision: 2,
		plots: [{
			key: "avp",
			title: "AVP",
			type: "line"
		}],
		calcTechnicalIndicator: function(t) {
			var e = 0,
				i = 0;
			return t.map((function(t) {
				var a = {};
				return e += t.turnover || 0, 0 !== (i += t.volume || 0) && (a.avp = e / i), a
			}))
		}
	}, e, i, a, {
		name: "EMV",
		calcParams: [14, 9],
		plots: [{
			key: "emv",
			title: "EMV",
			type: "line"
		}, {
			key: "maEmv",
			title: "MAEMV",
			type: "line"
		}],
		calcTechnicalIndicator: function(t, e) {
			var i = 0,
				a = 0,
				n = [],
				r = [];
			return t.forEach((function(o, s) {
				var c = {};
				if (s > 0) {
					var h = o.high,
						l = o.low,
						u = ((h + l) / 2 - (t[s - 1].high + t[s - 1].low) / 2) * (h - l) - (o.turnover || 0);
					n.push(u), i += u, e[0] > s || (c.emv = i / e[0], a += c.emv, e[0] + e[1] - 1 > s || (c.maEmv = a / e[1],
						a -= r[s - (e[1] - 1)].emv), i -= n[s - e[0]])
				}
				r.push(c)
			})), r
		}
	}, {
		name: "EMA",
		series: "price",
		calcParams: [6, 12, 20],
		precision: 2,
		shouldCheckParamCount: !1,
		shouldOhlc: !0,
		plots: [{
			key: "ema6",
			title: "EMA6",
			type: "line"
		}, {
			key: "ema12",
			title: "EMA12",
			type: "line"
		}, {
			key: "ema20",
			title: "EMA20",
			type: "line"
		}],
		regeneratePlots: function(t) {
			return t.map((function(t) {
				return {
					key: "ema".concat(t),
					title: "EMA".concat(t),
					type: "line"
				}
			}))
		},
		calcTechnicalIndicator: function(t, e, i) {
			var a = [];
			return t.map((function(t, n) {
				var r = {},
					o = t.close;
				return e.forEach((function(t, e) {
					var s;
					r[i[e].key] = s = 0 === n ? o : (2 * o + (t - 1) * a[e]) / (t + 1), a[e] = s
				})), r
			}))
		}
	}, {
		name: "MA",
		series: "price",
		calcParams: [5, 10, 30, 60],
		precision: 2,
		shouldCheckParamCount: !1,
		shouldOhlc: !0,
		plots: [{
			key: "ma5",
			title: "MA5",
			type: "line"
		}, {
			key: "ma10",
			title: "MA10",
			type: "line"
		}, {
			key: "ma30",
			title: "MA30",
			type: "line"
		}, {
			key: "ma60",
			title: "MA60",
			type: "line"
		}],
		regeneratePlots: function(t) {
			return t.map((function(t) {
				return {
					key: "ma".concat(t),
					title: "MA".concat(t),
					type: "line"
				}
			}))
		},
		calcTechnicalIndicator: function(t, e, i) {
			var a = [];
			return t.map((function(n, r) {
				var o = {},
					s = n.close;
				return e.forEach((function(e, n) {
					a[n] = (a[n] || 0) + s, e - 1 > r || (o[i[n].key] = a[n] / e, a[n] -= t[r - (e - 1)].close)
				})), o
			}))
		}
	}, {
		name: "MACD",
		calcParams: [12, 26, 9],
		baseValue: 0,
		plots: [{
			key: "diff",
			title: "DIFF",
			type: "line"
		}, {
			key: "dea",
			title: "DEA",
			type: "line"
		}, {
			key: "macd",
			title: "MACD",
			type: "bar",
			color: function(t, e) {
				var i = (t.currentData.technicalIndicatorData || {}).macd;
				return i > 0 ? e.bar.upColor : 0 > i ? e.bar.downColor : e.bar.noChangeColor
			},
			isStroke: function(t) {
				return (t.currentData.technicalIndicatorData || {}).macd > (t.preData.technicalIndicatorData || {}).macd
			}
		}],
		calcTechnicalIndicator: function(t, e) {
			var i, a, n = 0,
				r = 0,
				o = 0,
				s = 0;
			return t.map((function(t, c) {
				var h = t.close;
				0 === c ? (i = h, a = h) : (i = (2 * h + (e[0] - 1) * n) / (e[0] + 1), a = (2 * h + (e[1] - 1) * r) / (e[1] +
					1));
				var l = i - a;
				return n = i, r = a, s = o = (2 * l + s * (e[2] - 1)) / (e[2] + 1), {
					diff: l,
					dea: o,
					macd: 2 * (l - o)
				}
			}))
		}
	}, {
		name: "SMA",
		calcParams: [12, 2],
		series: "price",
		precision: 2,
		plots: [{
			key: "sma",
			title: "SMA",
			type: "line"
		}],
		shouldCheckParamCount: !0,
		shouldOhlc: !0,
		calcTechnicalIndicator: function(t, e) {
			var i = 0;
			return t.map((function(t, a) {
				var n = {},
					r = t.close;
				return n.sma = 0 === a ? r : (r * e[1] + i * (e[0] - e[1] + 1)) / (e[0] + 1), i = n.sma, n
			}))
		}
	}, {
		name: "TRIX",
		calcParams: [12, 20],
		plots: [{
			key: "trix",
			title: "TRIX",
			type: "line"
		}, {
			key: "maTrix",
			title: "MATRIX",
			type: "line"
		}],
		calcTechnicalIndicator: function(t, e) {
			var i, a, n, r, o, s, c = 0,
				h = [];
			return t.forEach((function(t, l) {
				var u = {},
					d = t.close;
				0 === l ? (i = d, a = d, n = d) : (n = (2 * (a = (2 * (i = (2 * d + (e[0] - 1) * r) / (e[0] + 1)) + (e[0] -
						1) * o) / (e[0] + 1)) + (e[0] - 1) * s) / (e[0] + 1), u.trix = 0 === s ? 0 : (n - s) / s * 100, c += u.trix,
					e[1] - 1 > l || (u.maTrix = c / e[1], c -= h[l - (e[1] - 1)].trix || 0)), r = i, o = a, s = n, h.push(u)
			})), h
		}
	}, {
		name: "BRAR",
		calcParams: [26],
		plots: [{
			key: "br",
			title: "BR",
			type: "line"
		}, {
			key: "ar",
			title: "AR",
			type: "line"
		}],
		calcTechnicalIndicator: function(t, e) {
			var i = 0,
				a = 0,
				n = 0,
				r = 0;
			return t.map((function(o, s) {
				var c = {};
				if (s > 0) {
					var h = o.high,
						l = o.low,
						u = o.open,
						d = t[s - 1].close;
					if (n += h - u, r += u - l, i += h - d, a += d - l, s >= e[0]) {
						c.ar = 0 !== r ? n / r * 100 : 0, c.br = 0 !== a ? i / a * 100 : 0;
						var _ = t[s - (e[0] - 1)].high,
							v = t[s - (e[0] - 1)].low,
							f = t[s - (e[0] - 1)].open,
							p = t[s - e[0]].close;
						i -= _ - p, a -= p - v, n -= _ - f, r -= f - v
					}
				}
				return c
			}))
		}
	}, n, {
		name: "MTM",
		calcParams: [6, 10],
		plots: [{
			key: "mtm",
			title: "MTM",
			type: "line"
		}, {
			key: "maMtm",
			title: "MAMTM",
			type: "line"
		}],
		calcTechnicalIndicator: function(t, e) {
			var i = 0,
				a = [];
			return t.forEach((function(n, r) {
				var o = {};
				r < e[0] - 1 || (o.mtm = n.close - t[r - (e[0] - 1)].close, i += o.mtm, e[0] + e[1] - 2 > r || (o.maMtm =
					i / e[1], i -= a[r - (e[1] - 1)].mtm));
				a.push(o)
			})), a
		}
	}, {
		name: "PSY",
		calcParams: [12, 6],
		plots: [{
			key: "psy",
			title: "PSY",
			type: "line"
		}, {
			key: "maPsy",
			title: "MAPSY",
			type: "line"
		}],
		calcTechnicalIndicator: function(t, e) {
			var i = 0,
				a = 0,
				n = [],
				r = [];
			return t.forEach((function(t, o) {
				var s = {},
					c = t.close - t.open > 0 ? 1 : 0;
				n.push(c), i += c, e[0] - 1 > o || (s.psy = i / e[0] * 100, a += s.psy, e[0] + e[1] - 2 > o || (s.maPsy =
					a / e[1], a -= r[o - (e[1] - 1)].psy), i -= n[o - (e[0] - 1)]), r.push(s)
			})), r
		}
	}, {
		name: "ROC",
		calcParams: [12, 6],
		shouldCheckParamCount: !0,
		plots: [{
			key: "roc",
			title: "ROC",
			type: "line"
		}, {
			key: "maRoc",
			title: "MAROC",
			type: "line"
		}],
		calcTechnicalIndicator: function(t, e) {
			var i = [],
				a = 0;
			return t.forEach((function(n, r) {
				var o = {};
				if (r >= e[0] - 1) {
					var s = t[r - (e[0] - 1)].close;
					o.roc = 0 !== s ? (n.close - s) / s : 0, a += o.roc, e[0] - 1 + e[1] - 1 > r || (o.maRoc = a / e[1], a -=
						i[r - (e[1] - 1)].roc)
				}
				i.push(o)
			})), i
		}
	}, {
		name: "VR",
		calcParams: [24, 30],
		plots: [{
			key: "vr",
			title: "VR",
			type: "line"
		}, {
			key: "maVr",
			title: "MAVR",
			type: "line"
		}],
		calcTechnicalIndicator: function(t, e) {
			var i = 0,
				a = 0,
				n = 0,
				r = 0,
				o = [];
			return t.forEach((function(s, c) {
				var h = {},
					l = s.close,
					u = s.open,
					d = s.volume;
				if (l > u ? i += d : u > l ? a += d : n += d, c >= e[0] - 1) {
					var _ = n / 2;
					h.vr = a + _ === 0 ? 0 : (i + _) / (a + _), r += h.vr, e[0] + e[1] - 2 > c || (h.maVr = r / e[1], r -= o[
						c - (e[1] - 1)].vr);
					var v = t[c - (e[0] - 1)],
						f = v.open,
						p = v.close,
						m = v.volume;
					p > f ? i -= m : f > p ? a -= m : n -= m
				}
				o.push(h)
			})), o
		}
	}, r, {
		name: "BIAS",
		calcParams: [6, 12, 24],
		shouldCheckParamCount: !1,
		plots: [{
			key: "bias6",
			title: "BIAS6",
			type: "line"
		}, {
			key: "bias12",
			title: "BIAS12",
			type: "line"
		}, {
			key: "bias24",
			title: "BIAS24",
			type: "line"
		}],
		regeneratePlots: function(t) {
			return t.map((function(t) {
				return {
					key: "bias".concat(t),
					title: "BIAS".concat(t),
					type: "line"
				}
			}))
		},
		calcTechnicalIndicator: function(t, e, i) {
			var a = [];
			return t.map((function(n, r) {
				var o = {},
					s = n.close;
				return e.forEach((function(n, c) {
					if (a[c] = (a[c] || 0) + s, r >= n - 1) {
						var h = a[c] / e[c];
						o[i[c].key] = (s - h) / h * 100, a[c] -= t[r - (n - 1)].close
					}
				})), o
			}))
		}
	}, o, s, h, l, u, d, {
		name: "OBV",
		calcParams: [30],
		plots: [{
			key: "obv",
			title: "OBV",
			type: "line"
		}, {
			key: "maObv",
			title: "MAOBV",
			type: "line"
		}],
		calcTechnicalIndicator: function(t, e) {
			var i = 0,
				a = [];
			return t.forEach((function(t, n) {
				var r = {},
					o = t.close,
					s = t.high - o;
				r.obv = 0 === s ? 0 : (o - t.low - s) / s * t.volume, i += r.obv, e[0] - 1 > n || (r.maObv = i / e[0], i -=
					a[n - (e[0] - 1)].obv), a.push(r)
			})), a
		}
	}, {
		name: "PVT",
		plots: [{
			key: "pvt",
			title: "PVT",
			type: "line"
		}],
		calcTechnicalIndicator: function(t) {
			var e = 0;
			return t.map((function(i, a) {
				var n = {};
				if (a > 0) {
					var r = t[a - 1].close,
						o = 0;
					0 !== r && (o = (i.close - r) / r * i.volume), n.pvt = e += o
				}
				return n
			}))
		}
	}, {
		name: "VOL",
		series: "volume",
		calcParams: [5, 10, 20],
		shouldCheckParamCount: !1,
		shouldFormatBigNumber: !0,
		precision: 0,
		baseValue: 0,
		minValue: 0,
		plots: [{
			key: "ma5",
			title: "MA5",
			type: "line"
		}, {
			key: "ma10",
			title: "MA10",
			type: "line"
		}, {
			key: "ma20",
			title: "MA20",
			type: "line"
		}, {
			key: "volume",
			title: "VOLUME",
			type: "bar",
			color: function(t, e) {
				var i = t.currentData.kLineData || {};
				return i.close > i.open ? e.bar.upColor : i.open > i.close ? e.bar.downColor : e.bar.noChangeColor
			}
		}],
		regeneratePlots: function(t) {
			var e = t.map((function(t) {
				return {
					key: "ma".concat(t),
					title: "MA".concat(t),
					type: "line"
				}
			}));
			return e.push({
				key: "volume",
				title: "VOLUME",
				type: "bar",
				color: function(t, e) {
					var i = t.currentData.kLineData || {};
					return i.close > i.open ? e.bar.upColor : i.open > i.close ? e.bar.downColor : e.bar.noChangeColor
				}
			}), e
		},
		calcTechnicalIndicator: function(t, e, i) {
			var a = [];
			return t.map((function(n, r) {
				var o = n.volume || 0,
					s = {
						volume: o
					};
				return e.forEach((function(e, n) {
					a[n] = (a[n] || 0) + o, e - 1 > r || (s[i[n].key] = a[n] / e, a[n] -= t[r - (e - 1)].volume)
				})), s
			}))
		}
	}]), _.addGraphicMark([{
		name: "horizontalRayLine",
		totalStep: 3,
		checkMousePointOn: function(t, e, i, a) {
			return dt(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i, a) {
			var n = {
				x: 0,
				y: i[0].y
			};
			return i[1] && i[1].x > i[0].x && (n.x = a.width), [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: [
					[i[0], n]
				]
			}]
		},
		performMousePressedMove: function(t, e, i) {
			var a = i.price;
			t[0].price = a, t[1].price = a
		},
		performMouseMoveForDrawing: function(t, e, i) {
			2 === t && (e[0].price = i.price)
		}
	}, {
		name: "horizontalSegment",
		totalStep: 3,
		checkMousePointOn: function(t, e, i, a) {
			return _t(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i) {
			var a = [];
			return 2 === i.length && (a = [i]), [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: a
			}]
		},
		performMousePressedMove: function(t, e, i) {
			var a = i.price;
			t[0].price = a, t[1].price = a
		},
		performMouseMoveForDrawing: function(t, e, i) {
			2 === t && (e[0].price = i.price)
		}
	}, {
		name: "horizontalStraightLine",
		totalStep: 2,
		checkMousePointOn: function(t, e, i, a) {
			return ut(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i, a) {
			return [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: [
					[{
						x: 0,
						y: i[0].y
					}, {
						x: a.width,
						y: i[0].y
					}]
				]
			}]
		}
	}, {
		name: "verticalRayLine",
		totalStep: 3,
		checkMousePointOn: function(t, e, i, a) {
			return dt(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i, a) {
			var n = {
				x: i[0].x,
				y: 0
			};
			return i[1] && i[1].y > i[0].y && (n.y = a.height), [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: [
					[i[0], n]
				]
			}]
		},
		performMousePressedMove: function(t, e, i) {
			var a = i.dataIndex,
				n = i.timestamp;
			t[0].timestamp = n, t[0].dataIndex = a, t[1].timestamp = n, t[1].dataIndex = a
		},
		performMouseMoveForDrawing: function(t, e, i) {
			var a = i.dataIndex;
			2 === t && (e[0].timestamp = i.timestamp, e[0].dataIndex = a)
		}
	}, {
		name: "verticalSegment",
		totalStep: 3,
		checkMousePointOn: function(t, e, i, a) {
			return _t(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i) {
			var a = [];
			return 2 === i.length && (a = [i]), [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: a
			}]
		},
		performMousePressedMove: function(t, e, i) {
			var a = i.dataIndex,
				n = i.timestamp;
			t[0].timestamp = n, t[0].dataIndex = a, t[1].timestamp = n, t[1].dataIndex = a
		},
		performMouseMoveForDrawing: function(t, e, i) {
			var a = i.dataIndex;
			2 === t && (e[0].timestamp = i.timestamp, e[0].dataIndex = a)
		}
	}, {
		name: "verticalStraightLine",
		totalStep: 2,
		checkMousePointOn: function(t, e, i, a) {
			return ut(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i, a) {
			return [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: [
					[{
						x: i[0].x,
						y: 0
					}, {
						x: i[0].x,
						y: a.height
					}]
				]
			}]
		}
	}, {
		name: "rayLine",
		totalStep: 3,
		checkMousePointOn: function(t, e, i) {
			return dt(e[0], e[1], i)
		},
		createGraphicDataSource: function(t, e, i, a) {
			return [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: [(n = i[0], r = i[1], o = {
					x: a.width,
					y: a.height
				}, n && r ? [n, n.x === r.x && n.y !== r.y ? r.y > n.y ? {
					x: n.x,
					y: o.y
				} : {
					x: n.x,
					y: 0
				} : n.x > r.x ? {
					x: 0,
					y: ht(n, r, {
						x: 0,
						y: n.y
					})
				} : {
					x: o.x,
					y: ht(n, r, {
						x: o.x,
						y: n.y
					})
				}] : [])]
			}];
			var n, r, o
		}
	}, {
		name: "segment",
		totalStep: 3,
		checkMousePointOn: function(t, e, i, a) {
			return _t(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i) {
			var a = [];
			return 2 === i.length && (a = [i]), [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: a
			}]
		}
	}, {
		name: "straightLine",
		totalStep: 3,
		checkMousePointOn: function(t, e, i, a) {
			return ut(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i, a) {
			return 2 > i.length || i[0].x === i[1].x ? [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: [
					[{
						x: i[0].x,
						y: 0
					}, {
						x: i[0].x,
						y: a.height
					}]
				]
			}] : [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: [
					[{
						x: 0,
						y: ht(i[0], i[1], {
							x: 0,
							y: i[0].y
						})
					}, {
						x: a.width,
						y: ht(i[0], i[1], {
							x: a.width,
							y: i[0].y
						})
					}]
				]
			}]
		}
	}, {
		name: "parallelStraightLine",
		totalStep: 4,
		checkMousePointOn: function(t, e, i, a) {
			return ut(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i, a) {
			return [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: ft(i, {
					x: a.width,
					y: a.height
				})
			}]
		}
	}, {
		name: "priceChannelLine",
		totalStep: 4,
		checkMousePointOn: function(t, e, i, a) {
			return ut(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i, a) {
			return [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: ft(i, {
					x: a.width,
					y: a.height
				}, 1)
			}]
		}
	}, {
		name: "priceLine",
		totalStep: 2,
		checkMousePointOn: function(t, e, i, a) {
			return dt(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i, a, n, r, o) {
			return [{
				type: "line",
				isDraw: !0,
				isCheck: !0,
				dataSource: [
					[i[0], {
						x: a.width,
						y: i[0].y
					}]
				]
			}, {
				type: "text",
				isDraw: !0,
				isCheck: !1,
				dataSource: [{
					x: i[0].x,
					y: i[0].y,
					text: o.convertFromPixel(i[0].y).toFixed(n.price)
				}]
			}]
		}
	}, {
		name: "fibonacciLine",
		totalStep: 3,
		checkMousePointOn: function(t, e, i, a) {
			return ut(i[0], i[1], a)
		},
		createGraphicDataSource: function(t, e, i, a, n) {
			if (i.length > 0) {
				var r = [],
					o = [],
					s = a.width;
				if (i.length > 1) {
					var c = i[0].y - i[1].y,
						h = e[0].price - e[1].price;
					[1, .786, .618, .5, .382, .236, 0].forEach((function(t) {
						var a = i[1].y + c * t,
							l = (e[1].price + h * t).toFixed(n.price);
						r.push([{
							x: 0,
							y: a
						}, {
							x: s,
							y: a
						}]), o.push({
							x: 0,
							y: a,
							text: "".concat(l, " (").concat((100 * t).toFixed(1), "%)")
						})
					}))
				}
				return [{
					type: "line",
					isDraw: !0,
					isCheck: !0,
					dataSource: r
				}, {
					type: "text",
					isDraw: !0,
					isCheck: !1,
					dataSource: o
				}]
			}
			return []
		}
	}]), t.dispose = function(t) {
		var e, i;
		t && ("string" == typeof t && ((i = document.getElementById(t)) && (e = i.chartId), e || (i = document.getElementsByClassName(
			t)) && (e = i.chartId)), e || (e = t.chartId), !e && t instanceof qe && (e = t.id), e && ($e[e].destroy(),
			delete $e[e]))
	}, t.extension = _, t.init = function(t) {
		var e, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
		if (!t) return null;
		if ("string" == typeof t ? ti(e = document.getElementById(t)) || (e = document.getElementsByClassName(t)) : e = t,
			!ti(e)) return null;
		var a = $e[e.chartId || ""];
		if (a) return a;
		var n = "".concat(Qe).concat(Je++);
		return (a = new qe(e, i)).id = n, e.chartId = n, $e[n] = a, a
	}, t.version = function() {
		return "7.0.0"
	}, Object.defineProperty(t, "__esModule", {
		value: !0
	})
}));

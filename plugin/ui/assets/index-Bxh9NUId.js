var ov = Object.defineProperty;
var sv = (e, r, o) =>
  r in e
    ? ov(e, r, { enumerable: !0, configurable: !0, writable: !0, value: o })
    : (e[r] = o);
var ct = (e, r, o) => sv(e, typeof r != "symbol" ? r + "" : r, o);
(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) i(l);
  new MutationObserver((l) => {
    for (const u of l)
      if (u.type === "childList")
        for (const c of u.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && i(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(l) {
    const u = {};
    return (
      l.integrity && (u.integrity = l.integrity),
      l.referrerPolicy && (u.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (u.credentials = "omit")
          : (u.credentials = "same-origin"),
      u
    );
  }
  function i(l) {
    if (l.ep) return;
    l.ep = !0;
    const u = o(l);
    fetch(l.href, u);
  }
})();
function $c(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Uu = { exports: {} },
  us = {},
  Yu = { exports: {} },
  Pe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Lh;
function iv() {
  if (Lh) return Pe;
  Lh = 1;
  var e = Symbol.for("react.element"),
    r = Symbol.for("react.portal"),
    o = Symbol.for("react.fragment"),
    i = Symbol.for("react.strict_mode"),
    l = Symbol.for("react.profiler"),
    u = Symbol.for("react.provider"),
    c = Symbol.for("react.context"),
    f = Symbol.for("react.forward_ref"),
    h = Symbol.for("react.suspense"),
    p = Symbol.for("react.memo"),
    x = Symbol.for("react.lazy"),
    g = Symbol.iterator;
  function v(M) {
    return M === null || typeof M != "object"
      ? null
      : ((M = (g && M[g]) || M["@@iterator"]),
        typeof M == "function" ? M : null);
  }
  var S = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    b = {};
  function N(M, I, oe) {
    ((this.props = M),
      (this.context = I),
      (this.refs = b),
      (this.updater = oe || S));
  }
  ((N.prototype.isReactComponent = {}),
    (N.prototype.setState = function (M, I) {
      if (typeof M != "object" && typeof M != "function" && M != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, M, I, "setState");
    }),
    (N.prototype.forceUpdate = function (M) {
      this.updater.enqueueForceUpdate(this, M, "forceUpdate");
    }));
  function _() {}
  _.prototype = N.prototype;
  function R(M, I, oe) {
    ((this.props = M),
      (this.context = I),
      (this.refs = b),
      (this.updater = oe || S));
  }
  var E = (R.prototype = new _());
  ((E.constructor = R), w(E, N.prototype), (E.isPureReactComponent = !0));
  var j = Array.isArray,
    O = Object.prototype.hasOwnProperty,
    A = { current: null },
    P = { key: !0, ref: !0, __self: !0, __source: !0 };
  function H(M, I, oe) {
    var le,
      Z = {},
      Q = null,
      ne = null;
    if (I != null)
      for (le in (I.ref !== void 0 && (ne = I.ref),
      I.key !== void 0 && (Q = "" + I.key),
      I))
        O.call(I, le) && !P.hasOwnProperty(le) && (Z[le] = I[le]);
    var J = arguments.length - 2;
    if (J === 1) Z.children = oe;
    else if (1 < J) {
      for (var ie = Array(J), ue = 0; ue < J; ue++) ie[ue] = arguments[ue + 2];
      Z.children = ie;
    }
    if (M && M.defaultProps)
      for (le in ((J = M.defaultProps), J)) Z[le] === void 0 && (Z[le] = J[le]);
    return {
      $$typeof: e,
      type: M,
      key: Q,
      ref: ne,
      props: Z,
      _owner: A.current,
    };
  }
  function V(M, I) {
    return {
      $$typeof: e,
      type: M.type,
      key: I,
      ref: M.ref,
      props: M.props,
      _owner: M._owner,
    };
  }
  function re(M) {
    return typeof M == "object" && M !== null && M.$$typeof === e;
  }
  function Y(M) {
    var I = { "=": "=0", ":": "=2" };
    return (
      "$" +
      M.replace(/[=:]/g, function (oe) {
        return I[oe];
      })
    );
  }
  var U = /\/+/g;
  function te(M, I) {
    return typeof M == "object" && M !== null && M.key != null
      ? Y("" + M.key)
      : I.toString(36);
  }
  function L(M, I, oe, le, Z) {
    var Q = typeof M;
    (Q === "undefined" || Q === "boolean") && (M = null);
    var ne = !1;
    if (M === null) ne = !0;
    else
      switch (Q) {
        case "string":
        case "number":
          ne = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case e:
            case r:
              ne = !0;
          }
      }
    if (ne)
      return (
        (ne = M),
        (Z = Z(ne)),
        (M = le === "" ? "." + te(ne, 0) : le),
        j(Z)
          ? ((oe = ""),
            M != null && (oe = M.replace(U, "$&/") + "/"),
            L(Z, I, oe, "", function (ue) {
              return ue;
            }))
          : Z != null &&
            (re(Z) &&
              (Z = V(
                Z,
                oe +
                  (!Z.key || (ne && ne.key === Z.key)
                    ? ""
                    : ("" + Z.key).replace(U, "$&/") + "/") +
                  M
              )),
            I.push(Z)),
        1
      );
    if (((ne = 0), (le = le === "" ? "." : le + ":"), j(M)))
      for (var J = 0; J < M.length; J++) {
        Q = M[J];
        var ie = le + te(Q, J);
        ne += L(Q, I, oe, ie, Z);
      }
    else if (((ie = v(M)), typeof ie == "function"))
      for (M = ie.call(M), J = 0; !(Q = M.next()).done; )
        ((Q = Q.value), (ie = le + te(Q, J++)), (ne += L(Q, I, oe, ie, Z)));
    else if (Q === "object")
      throw (
        (I = String(M)),
        Error(
          "Objects are not valid as a React child (found: " +
            (I === "[object Object]"
              ? "object with keys {" + Object.keys(M).join(", ") + "}"
              : I) +
            "). If you meant to render a collection of children, use an array instead."
        )
      );
    return ne;
  }
  function K(M, I, oe) {
    if (M == null) return M;
    var le = [],
      Z = 0;
    return (
      L(M, le, "", "", function (Q) {
        return I.call(oe, Q, Z++);
      }),
      le
    );
  }
  function B(M) {
    if (M._status === -1) {
      var I = M._result;
      ((I = I()),
        I.then(
          function (oe) {
            (M._status === 0 || M._status === -1) &&
              ((M._status = 1), (M._result = oe));
          },
          function (oe) {
            (M._status === 0 || M._status === -1) &&
              ((M._status = 2), (M._result = oe));
          }
        ),
        M._status === -1 && ((M._status = 0), (M._result = I)));
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var X = { current: null },
    z = { transition: null },
    $ = {
      ReactCurrentDispatcher: X,
      ReactCurrentBatchConfig: z,
      ReactCurrentOwner: A,
    };
  function W() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (Pe.Children = {
      map: K,
      forEach: function (M, I, oe) {
        K(
          M,
          function () {
            I.apply(this, arguments);
          },
          oe
        );
      },
      count: function (M) {
        var I = 0;
        return (
          K(M, function () {
            I++;
          }),
          I
        );
      },
      toArray: function (M) {
        return (
          K(M, function (I) {
            return I;
          }) || []
        );
      },
      only: function (M) {
        if (!re(M))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return M;
      },
    }),
    (Pe.Component = N),
    (Pe.Fragment = o),
    (Pe.Profiler = l),
    (Pe.PureComponent = R),
    (Pe.StrictMode = i),
    (Pe.Suspense = h),
    (Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $),
    (Pe.act = W),
    (Pe.cloneElement = function (M, I, oe) {
      if (M == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            M +
            "."
        );
      var le = w({}, M.props),
        Z = M.key,
        Q = M.ref,
        ne = M._owner;
      if (I != null) {
        if (
          (I.ref !== void 0 && ((Q = I.ref), (ne = A.current)),
          I.key !== void 0 && (Z = "" + I.key),
          M.type && M.type.defaultProps)
        )
          var J = M.type.defaultProps;
        for (ie in I)
          O.call(I, ie) &&
            !P.hasOwnProperty(ie) &&
            (le[ie] = I[ie] === void 0 && J !== void 0 ? J[ie] : I[ie]);
      }
      var ie = arguments.length - 2;
      if (ie === 1) le.children = oe;
      else if (1 < ie) {
        J = Array(ie);
        for (var ue = 0; ue < ie; ue++) J[ue] = arguments[ue + 2];
        le.children = J;
      }
      return {
        $$typeof: e,
        type: M.type,
        key: Z,
        ref: Q,
        props: le,
        _owner: ne,
      };
    }),
    (Pe.createContext = function (M) {
      return (
        (M = {
          $$typeof: c,
          _currentValue: M,
          _currentValue2: M,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (M.Provider = { $$typeof: u, _context: M }),
        (M.Consumer = M)
      );
    }),
    (Pe.createElement = H),
    (Pe.createFactory = function (M) {
      var I = H.bind(null, M);
      return ((I.type = M), I);
    }),
    (Pe.createRef = function () {
      return { current: null };
    }),
    (Pe.forwardRef = function (M) {
      return { $$typeof: f, render: M };
    }),
    (Pe.isValidElement = re),
    (Pe.lazy = function (M) {
      return { $$typeof: x, _payload: { _status: -1, _result: M }, _init: B };
    }),
    (Pe.memo = function (M, I) {
      return { $$typeof: p, type: M, compare: I === void 0 ? null : I };
    }),
    (Pe.startTransition = function (M) {
      var I = z.transition;
      z.transition = {};
      try {
        M();
      } finally {
        z.transition = I;
      }
    }),
    (Pe.unstable_act = W),
    (Pe.useCallback = function (M, I) {
      return X.current.useCallback(M, I);
    }),
    (Pe.useContext = function (M) {
      return X.current.useContext(M);
    }),
    (Pe.useDebugValue = function () {}),
    (Pe.useDeferredValue = function (M) {
      return X.current.useDeferredValue(M);
    }),
    (Pe.useEffect = function (M, I) {
      return X.current.useEffect(M, I);
    }),
    (Pe.useId = function () {
      return X.current.useId();
    }),
    (Pe.useImperativeHandle = function (M, I, oe) {
      return X.current.useImperativeHandle(M, I, oe);
    }),
    (Pe.useInsertionEffect = function (M, I) {
      return X.current.useInsertionEffect(M, I);
    }),
    (Pe.useLayoutEffect = function (M, I) {
      return X.current.useLayoutEffect(M, I);
    }),
    (Pe.useMemo = function (M, I) {
      return X.current.useMemo(M, I);
    }),
    (Pe.useReducer = function (M, I, oe) {
      return X.current.useReducer(M, I, oe);
    }),
    (Pe.useRef = function (M) {
      return X.current.useRef(M);
    }),
    (Pe.useState = function (M) {
      return X.current.useState(M);
    }),
    (Pe.useSyncExternalStore = function (M, I, oe) {
      return X.current.useSyncExternalStore(M, I, oe);
    }),
    (Pe.useTransition = function () {
      return X.current.useTransition();
    }),
    (Pe.version = "18.3.1"),
    Pe
  );
}
var zh;
function Rs() {
  return (zh || ((zh = 1), (Yu.exports = iv())), Yu.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $h;
function lv() {
  if ($h) return us;
  $h = 1;
  var e = Rs(),
    r = Symbol.for("react.element"),
    o = Symbol.for("react.fragment"),
    i = Object.prototype.hasOwnProperty,
    l = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(f, h, p) {
    var x,
      g = {},
      v = null,
      S = null;
    (p !== void 0 && (v = "" + p),
      h.key !== void 0 && (v = "" + h.key),
      h.ref !== void 0 && (S = h.ref));
    for (x in h) i.call(h, x) && !u.hasOwnProperty(x) && (g[x] = h[x]);
    if (f && f.defaultProps)
      for (x in ((h = f.defaultProps), h)) g[x] === void 0 && (g[x] = h[x]);
    return {
      $$typeof: r,
      type: f,
      key: v,
      ref: S,
      props: g,
      _owner: l.current,
    };
  }
  return ((us.Fragment = o), (us.jsx = c), (us.jsxs = c), us);
}
var Ah;
function av() {
  return (Ah || ((Ah = 1), (Uu.exports = lv())), Uu.exports);
}
var y = av(),
  C = Rs();
const no = $c(C);
var sl = {},
  Xu = { exports: {} },
  vt = {},
  Ku = { exports: {} },
  Qu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dh;
function uv() {
  return (
    Dh ||
      ((Dh = 1),
      (function (e) {
        function r(z, $) {
          var W = z.length;
          z.push($);
          e: for (; 0 < W; ) {
            var M = (W - 1) >>> 1,
              I = z[M];
            if (0 < l(I, $)) ((z[M] = $), (z[W] = I), (W = M));
            else break e;
          }
        }
        function o(z) {
          return z.length === 0 ? null : z[0];
        }
        function i(z) {
          if (z.length === 0) return null;
          var $ = z[0],
            W = z.pop();
          if (W !== $) {
            z[0] = W;
            e: for (var M = 0, I = z.length, oe = I >>> 1; M < oe; ) {
              var le = 2 * (M + 1) - 1,
                Z = z[le],
                Q = le + 1,
                ne = z[Q];
              if (0 > l(Z, W))
                Q < I && 0 > l(ne, Z)
                  ? ((z[M] = ne), (z[Q] = W), (M = Q))
                  : ((z[M] = Z), (z[le] = W), (M = le));
              else if (Q < I && 0 > l(ne, W))
                ((z[M] = ne), (z[Q] = W), (M = Q));
              else break e;
            }
          }
          return $;
        }
        function l(z, $) {
          var W = z.sortIndex - $.sortIndex;
          return W !== 0 ? W : z.id - $.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var u = performance;
          e.unstable_now = function () {
            return u.now();
          };
        } else {
          var c = Date,
            f = c.now();
          e.unstable_now = function () {
            return c.now() - f;
          };
        }
        var h = [],
          p = [],
          x = 1,
          g = null,
          v = 3,
          S = !1,
          w = !1,
          b = !1,
          N = typeof setTimeout == "function" ? setTimeout : null,
          _ = typeof clearTimeout == "function" ? clearTimeout : null,
          R = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function E(z) {
          for (var $ = o(p); $ !== null; ) {
            if ($.callback === null) i(p);
            else if ($.startTime <= z)
              (i(p), ($.sortIndex = $.expirationTime), r(h, $));
            else break;
            $ = o(p);
          }
        }
        function j(z) {
          if (((b = !1), E(z), !w))
            if (o(h) !== null) ((w = !0), B(O));
            else {
              var $ = o(p);
              $ !== null && X(j, $.startTime - z);
            }
        }
        function O(z, $) {
          ((w = !1), b && ((b = !1), _(H), (H = -1)), (S = !0));
          var W = v;
          try {
            for (
              E($), g = o(h);
              g !== null && (!(g.expirationTime > $) || (z && !Y()));
            ) {
              var M = g.callback;
              if (typeof M == "function") {
                ((g.callback = null), (v = g.priorityLevel));
                var I = M(g.expirationTime <= $);
                (($ = e.unstable_now()),
                  typeof I == "function"
                    ? (g.callback = I)
                    : g === o(h) && i(h),
                  E($));
              } else i(h);
              g = o(h);
            }
            if (g !== null) var oe = !0;
            else {
              var le = o(p);
              (le !== null && X(j, le.startTime - $), (oe = !1));
            }
            return oe;
          } finally {
            ((g = null), (v = W), (S = !1));
          }
        }
        var A = !1,
          P = null,
          H = -1,
          V = 5,
          re = -1;
        function Y() {
          return !(e.unstable_now() - re < V);
        }
        function U() {
          if (P !== null) {
            var z = e.unstable_now();
            re = z;
            var $ = !0;
            try {
              $ = P(!0, z);
            } finally {
              $ ? te() : ((A = !1), (P = null));
            }
          } else A = !1;
        }
        var te;
        if (typeof R == "function")
          te = function () {
            R(U);
          };
        else if (typeof MessageChannel < "u") {
          var L = new MessageChannel(),
            K = L.port2;
          ((L.port1.onmessage = U),
            (te = function () {
              K.postMessage(null);
            }));
        } else
          te = function () {
            N(U, 0);
          };
        function B(z) {
          ((P = z), A || ((A = !0), te()));
        }
        function X(z, $) {
          H = N(function () {
            z(e.unstable_now());
          }, $);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (z) {
            z.callback = null;
          }),
          (e.unstable_continueExecution = function () {
            w || S || ((w = !0), B(O));
          }),
          (e.unstable_forceFrameRate = function (z) {
            0 > z || 125 < z
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (V = 0 < z ? Math.floor(1e3 / z) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return v;
          }),
          (e.unstable_getFirstCallbackNode = function () {
            return o(h);
          }),
          (e.unstable_next = function (z) {
            switch (v) {
              case 1:
              case 2:
              case 3:
                var $ = 3;
                break;
              default:
                $ = v;
            }
            var W = v;
            v = $;
            try {
              return z();
            } finally {
              v = W;
            }
          }),
          (e.unstable_pauseExecution = function () {}),
          (e.unstable_requestPaint = function () {}),
          (e.unstable_runWithPriority = function (z, $) {
            switch (z) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                z = 3;
            }
            var W = v;
            v = z;
            try {
              return $();
            } finally {
              v = W;
            }
          }),
          (e.unstable_scheduleCallback = function (z, $, W) {
            var M = e.unstable_now();
            switch (
              (typeof W == "object" && W !== null
                ? ((W = W.delay),
                  (W = typeof W == "number" && 0 < W ? M + W : M))
                : (W = M),
              z)
            ) {
              case 1:
                var I = -1;
                break;
              case 2:
                I = 250;
                break;
              case 5:
                I = 1073741823;
                break;
              case 4:
                I = 1e4;
                break;
              default:
                I = 5e3;
            }
            return (
              (I = W + I),
              (z = {
                id: x++,
                callback: $,
                priorityLevel: z,
                startTime: W,
                expirationTime: I,
                sortIndex: -1,
              }),
              W > M
                ? ((z.sortIndex = W),
                  r(p, z),
                  o(h) === null &&
                    z === o(p) &&
                    (b ? (_(H), (H = -1)) : (b = !0), X(j, W - M)))
                : ((z.sortIndex = I), r(h, z), w || S || ((w = !0), B(O))),
              z
            );
          }),
          (e.unstable_shouldYield = Y),
          (e.unstable_wrapCallback = function (z) {
            var $ = v;
            return function () {
              var W = v;
              v = $;
              try {
                return z.apply(this, arguments);
              } finally {
                v = W;
              }
            };
          }));
      })(Qu)),
    Qu
  );
}
var Oh;
function cv() {
  return (Oh || ((Oh = 1), (Ku.exports = uv())), Ku.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fh;
function dv() {
  if (Fh) return vt;
  Fh = 1;
  var e = Rs(),
    r = cv();
  function o(t) {
    for (
      var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + t,
        s = 1;
      s < arguments.length;
      s++
    )
      n += "&args[]=" + encodeURIComponent(arguments[s]);
    return (
      "Minified React error #" +
      t +
      "; visit " +
      n +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var i = new Set(),
    l = {};
  function u(t, n) {
    (c(t, n), c(t + "Capture", n));
  }
  function c(t, n) {
    for (l[t] = n, t = 0; t < n.length; t++) i.add(n[t]);
  }
  var f = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    h = Object.prototype.hasOwnProperty,
    p =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    x = {},
    g = {};
  function v(t) {
    return h.call(g, t)
      ? !0
      : h.call(x, t)
        ? !1
        : p.test(t)
          ? (g[t] = !0)
          : ((x[t] = !0), !1);
  }
  function S(t, n, s, a) {
    if (s !== null && s.type === 0) return !1;
    switch (typeof n) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return a
          ? !1
          : s !== null
            ? !s.acceptsBooleans
            : ((t = t.toLowerCase().slice(0, 5)),
              t !== "data-" && t !== "aria-");
      default:
        return !1;
    }
  }
  function w(t, n, s, a) {
    if (n === null || typeof n > "u" || S(t, n, s, a)) return !0;
    if (a) return !1;
    if (s !== null)
      switch (s.type) {
        case 3:
          return !n;
        case 4:
          return n === !1;
        case 5:
          return isNaN(n);
        case 6:
          return isNaN(n) || 1 > n;
      }
    return !1;
  }
  function b(t, n, s, a, d, m, k) {
    ((this.acceptsBooleans = n === 2 || n === 3 || n === 4),
      (this.attributeName = a),
      (this.attributeNamespace = d),
      (this.mustUseProperty = s),
      (this.propertyName = t),
      (this.type = n),
      (this.sanitizeURL = m),
      (this.removeEmptyString = k));
  }
  var N = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (t) {
      N[t] = new b(t, 0, !1, t, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (t) {
      var n = t[0];
      N[n] = new b(n, 1, !1, t[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (t) {
        N[t] = new b(t, 2, !1, t.toLowerCase(), null, !1, !1);
      }
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (t) {
      N[t] = new b(t, 2, !1, t, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (t) {
        N[t] = new b(t, 3, !1, t.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (t) {
      N[t] = new b(t, 3, !0, t, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (t) {
      N[t] = new b(t, 4, !1, t, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (t) {
      N[t] = new b(t, 6, !1, t, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (t) {
      N[t] = new b(t, 5, !1, t.toLowerCase(), null, !1, !1);
    }));
  var _ = /[\-:]([a-z])/g;
  function R(t) {
    return t[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (t) {
      var n = t.replace(_, R);
      N[n] = new b(n, 1, !1, t, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (t) {
        var n = t.replace(_, R);
        N[n] = new b(n, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (t) {
      var n = t.replace(_, R);
      N[n] = new b(n, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (t) {
      N[t] = new b(t, 1, !1, t.toLowerCase(), null, !1, !1);
    }),
    (N.xlinkHref = new b(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1
    )),
    ["src", "href", "action", "formAction"].forEach(function (t) {
      N[t] = new b(t, 1, !1, t.toLowerCase(), null, !0, !0);
    }));
  function E(t, n, s, a) {
    var d = N.hasOwnProperty(n) ? N[n] : null;
    (d !== null
      ? d.type !== 0
      : a ||
        !(2 < n.length) ||
        (n[0] !== "o" && n[0] !== "O") ||
        (n[1] !== "n" && n[1] !== "N")) &&
      (w(n, s, d, a) && (s = null),
      a || d === null
        ? v(n) &&
          (s === null ? t.removeAttribute(n) : t.setAttribute(n, "" + s))
        : d.mustUseProperty
          ? (t[d.propertyName] = s === null ? (d.type === 3 ? !1 : "") : s)
          : ((n = d.attributeName),
            (a = d.attributeNamespace),
            s === null
              ? t.removeAttribute(n)
              : ((d = d.type),
                (s = d === 3 || (d === 4 && s === !0) ? "" : "" + s),
                a ? t.setAttributeNS(a, n, s) : t.setAttribute(n, s))));
  }
  var j = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    O = Symbol.for("react.element"),
    A = Symbol.for("react.portal"),
    P = Symbol.for("react.fragment"),
    H = Symbol.for("react.strict_mode"),
    V = Symbol.for("react.profiler"),
    re = Symbol.for("react.provider"),
    Y = Symbol.for("react.context"),
    U = Symbol.for("react.forward_ref"),
    te = Symbol.for("react.suspense"),
    L = Symbol.for("react.suspense_list"),
    K = Symbol.for("react.memo"),
    B = Symbol.for("react.lazy"),
    X = Symbol.for("react.offscreen"),
    z = Symbol.iterator;
  function $(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (z && t[z]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var W = Object.assign,
    M;
  function I(t) {
    if (M === void 0)
      try {
        throw Error();
      } catch (s) {
        var n = s.stack.trim().match(/\n( *(at )?)/);
        M = (n && n[1]) || "";
      }
    return (
      `
` +
      M +
      t
    );
  }
  var oe = !1;
  function le(t, n) {
    if (!t || oe) return "";
    oe = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (n)
        if (
          ((n = function () {
            throw Error();
          }),
          Object.defineProperty(n.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(n, []);
          } catch (ee) {
            var a = ee;
          }
          Reflect.construct(t, [], n);
        } else {
          try {
            n.call();
          } catch (ee) {
            a = ee;
          }
          t.call(n.prototype);
        }
      else {
        try {
          throw Error();
        } catch (ee) {
          a = ee;
        }
        t();
      }
    } catch (ee) {
      if (ee && a && typeof ee.stack == "string") {
        for (
          var d = ee.stack.split(`
`),
            m = a.stack.split(`
`),
            k = d.length - 1,
            T = m.length - 1;
          1 <= k && 0 <= T && d[k] !== m[T];
        )
          T--;
        for (; 1 <= k && 0 <= T; k--, T--)
          if (d[k] !== m[T]) {
            if (k !== 1 || T !== 1)
              do
                if ((k--, T--, 0 > T || d[k] !== m[T])) {
                  var D =
                    `
` + d[k].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      D.includes("<anonymous>") &&
                      (D = D.replace("<anonymous>", t.displayName)),
                    D
                  );
                }
              while (1 <= k && 0 <= T);
            break;
          }
      }
    } finally {
      ((oe = !1), (Error.prepareStackTrace = s));
    }
    return (t = t ? t.displayName || t.name : "") ? I(t) : "";
  }
  function Z(t) {
    switch (t.tag) {
      case 5:
        return I(t.type);
      case 16:
        return I("Lazy");
      case 13:
        return I("Suspense");
      case 19:
        return I("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((t = le(t.type, !1)), t);
      case 11:
        return ((t = le(t.type.render, !1)), t);
      case 1:
        return ((t = le(t.type, !0)), t);
      default:
        return "";
    }
  }
  function Q(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case P:
        return "Fragment";
      case A:
        return "Portal";
      case V:
        return "Profiler";
      case H:
        return "StrictMode";
      case te:
        return "Suspense";
      case L:
        return "SuspenseList";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Y:
          return (t.displayName || "Context") + ".Consumer";
        case re:
          return (t._context.displayName || "Context") + ".Provider";
        case U:
          var n = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = n.displayName || n.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case K:
          return (
            (n = t.displayName || null),
            n !== null ? n : Q(t.type) || "Memo"
          );
        case B:
          ((n = t._payload), (t = t._init));
          try {
            return Q(t(n));
          } catch {}
      }
    return null;
  }
  function ne(t) {
    var n = t.type;
    switch (t.tag) {
      case 24:
        return "Cache";
      case 9:
        return (n.displayName || "Context") + ".Consumer";
      case 10:
        return (n._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (t = n.render),
          (t = t.displayName || t.name || ""),
          n.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return n;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Q(n);
      case 8:
        return n === H ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof n == "function") return n.displayName || n.name || null;
        if (typeof n == "string") return n;
    }
    return null;
  }
  function J(t) {
    switch (typeof t) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function ie(t) {
    var n = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (n === "checkbox" || n === "radio")
    );
  }
  function ue(t) {
    var n = ie(t) ? "checked" : "value",
      s = Object.getOwnPropertyDescriptor(t.constructor.prototype, n),
      a = "" + t[n];
    if (
      !t.hasOwnProperty(n) &&
      typeof s < "u" &&
      typeof s.get == "function" &&
      typeof s.set == "function"
    ) {
      var d = s.get,
        m = s.set;
      return (
        Object.defineProperty(t, n, {
          configurable: !0,
          get: function () {
            return d.call(this);
          },
          set: function (k) {
            ((a = "" + k), m.call(this, k));
          },
        }),
        Object.defineProperty(t, n, { enumerable: s.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (k) {
            a = "" + k;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[n]);
          },
        }
      );
    }
  }
  function se(t) {
    t._valueTracker || (t._valueTracker = ue(t));
  }
  function ae(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var s = n.getValue(),
      a = "";
    return (
      t && (a = ie(t) ? (t.checked ? "true" : "false") : t.value),
      (t = a),
      t !== s ? (n.setValue(t), !0) : !1
    );
  }
  function de(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function ge(t, n) {
    var s = n.checked;
    return W({}, n, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: s ?? t._wrapperState.initialChecked,
    });
  }
  function Ce(t, n) {
    var s = n.defaultValue == null ? "" : n.defaultValue,
      a = n.checked != null ? n.checked : n.defaultChecked;
    ((s = J(n.value != null ? n.value : s)),
      (t._wrapperState = {
        initialChecked: a,
        initialValue: s,
        controlled:
          n.type === "checkbox" || n.type === "radio"
            ? n.checked != null
            : n.value != null,
      }));
  }
  function ke(t, n) {
    ((n = n.checked), n != null && E(t, "checked", n, !1));
  }
  function Se(t, n) {
    ke(t, n);
    var s = J(n.value),
      a = n.type;
    if (s != null)
      a === "number"
        ? ((s === 0 && t.value === "") || t.value != s) && (t.value = "" + s)
        : t.value !== "" + s && (t.value = "" + s);
    else if (a === "submit" || a === "reset") {
      t.removeAttribute("value");
      return;
    }
    (n.hasOwnProperty("value")
      ? me(t, n.type, s)
      : n.hasOwnProperty("defaultValue") && me(t, n.type, J(n.defaultValue)),
      n.checked == null &&
        n.defaultChecked != null &&
        (t.defaultChecked = !!n.defaultChecked));
  }
  function Ie(t, n, s) {
    if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
      var a = n.type;
      if (
        !(
          (a !== "submit" && a !== "reset") ||
          (n.value !== void 0 && n.value !== null)
        )
      )
        return;
      ((n = "" + t._wrapperState.initialValue),
        s || n === t.value || (t.value = n),
        (t.defaultValue = n));
    }
    ((s = t.name),
      s !== "" && (t.name = ""),
      (t.defaultChecked = !!t._wrapperState.initialChecked),
      s !== "" && (t.name = s));
  }
  function me(t, n, s) {
    (n !== "number" || de(t.ownerDocument) !== t) &&
      (s == null
        ? (t.defaultValue = "" + t._wrapperState.initialValue)
        : t.defaultValue !== "" + s && (t.defaultValue = "" + s));
  }
  var _e = Array.isArray;
  function Re(t, n, s, a) {
    if (((t = t.options), n)) {
      n = {};
      for (var d = 0; d < s.length; d++) n["$" + s[d]] = !0;
      for (s = 0; s < t.length; s++)
        ((d = n.hasOwnProperty("$" + t[s].value)),
          t[s].selected !== d && (t[s].selected = d),
          d && a && (t[s].defaultSelected = !0));
    } else {
      for (s = "" + J(s), n = null, d = 0; d < t.length; d++) {
        if (t[d].value === s) {
          ((t[d].selected = !0), a && (t[d].defaultSelected = !0));
          return;
        }
        n !== null || t[d].disabled || (n = t[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Je(t, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(o(91));
    return W({}, n, {
      value: void 0,
      defaultValue: void 0,
      children: "" + t._wrapperState.initialValue,
    });
  }
  function jt(t, n) {
    var s = n.value;
    if (s == null) {
      if (((s = n.children), (n = n.defaultValue), s != null)) {
        if (n != null) throw Error(o(92));
        if (_e(s)) {
          if (1 < s.length) throw Error(o(93));
          s = s[0];
        }
        n = s;
      }
      (n == null && (n = ""), (s = n));
    }
    t._wrapperState = { initialValue: J(s) };
  }
  function sn(t, n) {
    var s = J(n.value),
      a = J(n.defaultValue);
    (s != null &&
      ((s = "" + s),
      s !== t.value && (t.value = s),
      n.defaultValue == null && t.defaultValue !== s && (t.defaultValue = s)),
      a != null && (t.defaultValue = "" + a));
  }
  function Gn(t) {
    var n = t.textContent;
    n === t._wrapperState.initialValue &&
      n !== "" &&
      n !== null &&
      (t.value = n);
  }
  function ln(t) {
    switch (t) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function an(t, n) {
    return t == null || t === "http://www.w3.org/1999/xhtml"
      ? ln(n)
      : t === "http://www.w3.org/2000/svg" && n === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : t;
  }
  var qn,
    Hs = (function (t) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (n, s, a, d) {
            MSApp.execUnsafeLocalFunction(function () {
              return t(n, s, a, d);
            });
          }
        : t;
    })(function (t, n) {
      if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t)
        t.innerHTML = n;
      else {
        for (
          qn = qn || document.createElement("div"),
            qn.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>",
            n = qn.firstChild;
          t.firstChild;
        )
          t.removeChild(t.firstChild);
        for (; n.firstChild; ) t.appendChild(n.firstChild);
      }
    });
  function un(t, n) {
    if (n) {
      var s = t.firstChild;
      if (s && s === t.lastChild && s.nodeType === 3) {
        s.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var Zn = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    Jl = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Zn).forEach(function (t) {
    Jl.forEach(function (n) {
      ((n = n + t.charAt(0).toUpperCase() + t.substring(1)), (Zn[n] = Zn[t]));
    });
  });
  function Bs(t, n, s) {
    return n == null || typeof n == "boolean" || n === ""
      ? ""
      : s || typeof n != "number" || n === 0 || (Zn.hasOwnProperty(t) && Zn[t])
        ? ("" + n).trim()
        : n + "px";
  }
  function Vs(t, n) {
    t = t.style;
    for (var s in n)
      if (n.hasOwnProperty(s)) {
        var a = s.indexOf("--") === 0,
          d = Bs(s, n[s], a);
        (s === "float" && (s = "cssFloat"),
          a ? t.setProperty(s, d) : (t[s] = d));
      }
  }
  var ea = W(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  );
  function xo(t, n) {
    if (n) {
      if (ea[t] && (n.children != null || n.dangerouslySetInnerHTML != null))
        throw Error(o(137, t));
      if (n.dangerouslySetInnerHTML != null) {
        if (n.children != null) throw Error(o(60));
        if (
          typeof n.dangerouslySetInnerHTML != "object" ||
          !("__html" in n.dangerouslySetInnerHTML)
        )
          throw Error(o(61));
      }
      if (n.style != null && typeof n.style != "object") throw Error(o(62));
    }
  }
  function wo(t, n) {
    if (t.indexOf("-") === -1) return typeof n.is == "string";
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var So = null;
  function Eo(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var ko = null,
    Cn = null,
    Nn = null;
  function Ws(t) {
    if ((t = Ko(t))) {
      if (typeof ko != "function") throw Error(o(280));
      var n = t.stateNode;
      n && ((n = wi(n)), ko(t.stateNode, t.type, n));
    }
  }
  function Us(t) {
    Cn ? (Nn ? Nn.push(t) : (Nn = [t])) : (Cn = t);
  }
  function Ys() {
    if (Cn) {
      var t = Cn,
        n = Nn;
      if (((Nn = Cn = null), Ws(t), n)) for (t = 0; t < n.length; t++) Ws(n[t]);
    }
  }
  function Xs(t, n) {
    return t(n);
  }
  function Ks() {}
  var Co = !1;
  function Qs(t, n, s) {
    if (Co) return t(n, s);
    Co = !0;
    try {
      return Xs(t, n, s);
    } finally {
      ((Co = !1), (Cn !== null || Nn !== null) && (Ks(), Ys()));
    }
  }
  function Jn(t, n) {
    var s = t.stateNode;
    if (s === null) return null;
    var a = wi(s);
    if (a === null) return null;
    s = a[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((t = t.type),
          (a = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !a));
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (s && typeof s != "function") throw Error(o(231, n, typeof s));
    return s;
  }
  var No = !1;
  if (f)
    try {
      var er = {};
      (Object.defineProperty(er, "passive", {
        get: function () {
          No = !0;
        },
      }),
        window.addEventListener("test", er, er),
        window.removeEventListener("test", er, er));
    } catch {
      No = !1;
    }
  function ta(t, n, s, a, d, m, k, T, D) {
    var ee = Array.prototype.slice.call(arguments, 3);
    try {
      n.apply(s, ee);
    } catch (fe) {
      this.onError(fe);
    }
  }
  var tr = !1,
    Nr = null,
    _r = !1,
    _o = null,
    na = {
      onError: function (t) {
        ((tr = !0), (Nr = t));
      },
    };
  function ra(t, n, s, a, d, m, k, T, D) {
    ((tr = !1), (Nr = null), ta.apply(na, arguments));
  }
  function oa(t, n, s, a, d, m, k, T, D) {
    if ((ra.apply(this, arguments), tr)) {
      if (tr) {
        var ee = Nr;
        ((tr = !1), (Nr = null));
      } else throw Error(o(198));
      _r || ((_r = !0), (_o = ee));
    }
  }
  function Kt(t) {
    var n = t,
      s = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do ((n = t), (n.flags & 4098) !== 0 && (s = n.return), (t = n.return));
      while (t);
    }
    return n.tag === 3 ? s : null;
  }
  function bo(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        (n === null && ((t = t.alternate), t !== null && (n = t.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function jo(t) {
    if (Kt(t) !== t) throw Error(o(188));
  }
  function sa(t) {
    var n = t.alternate;
    if (!n) {
      if (((n = Kt(t)), n === null)) throw Error(o(188));
      return n !== t ? null : t;
    }
    for (var s = t, a = n; ; ) {
      var d = s.return;
      if (d === null) break;
      var m = d.alternate;
      if (m === null) {
        if (((a = d.return), a !== null)) {
          s = a;
          continue;
        }
        break;
      }
      if (d.child === m.child) {
        for (m = d.child; m; ) {
          if (m === s) return (jo(d), t);
          if (m === a) return (jo(d), n);
          m = m.sibling;
        }
        throw Error(o(188));
      }
      if (s.return !== a.return) ((s = d), (a = m));
      else {
        for (var k = !1, T = d.child; T; ) {
          if (T === s) {
            ((k = !0), (s = d), (a = m));
            break;
          }
          if (T === a) {
            ((k = !0), (a = d), (s = m));
            break;
          }
          T = T.sibling;
        }
        if (!k) {
          for (T = m.child; T; ) {
            if (T === s) {
              ((k = !0), (s = m), (a = d));
              break;
            }
            if (T === a) {
              ((k = !0), (a = m), (s = d));
              break;
            }
            T = T.sibling;
          }
          if (!k) throw Error(o(189));
        }
      }
      if (s.alternate !== a) throw Error(o(190));
    }
    if (s.tag !== 3) throw Error(o(188));
    return s.stateNode.current === s ? t : n;
  }
  function Gs(t) {
    return ((t = sa(t)), t !== null ? qs(t) : null);
  }
  function qs(t) {
    if (t.tag === 5 || t.tag === 6) return t;
    for (t = t.child; t !== null; ) {
      var n = qs(t);
      if (n !== null) return n;
      t = t.sibling;
    }
    return null;
  }
  var Zs = r.unstable_scheduleCallback,
    Js = r.unstable_cancelCallback,
    ia = r.unstable_shouldYield,
    ei = r.unstable_requestPaint,
    We = r.unstable_now,
    la = r.unstable_getCurrentPriorityLevel,
    Io = r.unstable_ImmediatePriority,
    ti = r.unstable_UserBlockingPriority,
    br = r.unstable_NormalPriority,
    aa = r.unstable_LowPriority,
    ni = r.unstable_IdlePriority,
    nr = null,
    It = null;
  function ua(t) {
    if (It && typeof It.onCommitFiberRoot == "function")
      try {
        It.onCommitFiberRoot(nr, t, void 0, (t.current.flags & 128) === 128);
      } catch {}
  }
  var wt = Math.clz32 ? Math.clz32 : fa,
    ca = Math.log,
    da = Math.LN2;
  function fa(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((ca(t) / da) | 0)) | 0);
  }
  var jr = 64,
    Ir = 4194304;
  function Qt(t) {
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return t & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return t;
    }
  }
  function Mr(t, n) {
    var s = t.pendingLanes;
    if (s === 0) return 0;
    var a = 0,
      d = t.suspendedLanes,
      m = t.pingedLanes,
      k = s & 268435455;
    if (k !== 0) {
      var T = k & ~d;
      T !== 0 ? (a = Qt(T)) : ((m &= k), m !== 0 && (a = Qt(m)));
    } else ((k = s & ~d), k !== 0 ? (a = Qt(k)) : m !== 0 && (a = Qt(m)));
    if (a === 0) return 0;
    if (
      n !== 0 &&
      n !== a &&
      (n & d) === 0 &&
      ((d = a & -a), (m = n & -n), d >= m || (d === 16 && (m & 4194240) !== 0))
    )
      return n;
    if (((a & 4) !== 0 && (a |= s & 16), (n = t.entangledLanes), n !== 0))
      for (t = t.entanglements, n &= a; 0 < n; )
        ((s = 31 - wt(n)), (d = 1 << s), (a |= t[s]), (n &= ~d));
    return a;
  }
  function ri(t, n) {
    switch (t) {
      case 1:
      case 2:
      case 4:
        return n + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ha(t, n) {
    for (
      var s = t.suspendedLanes,
        a = t.pingedLanes,
        d = t.expirationTimes,
        m = t.pendingLanes;
      0 < m;
    ) {
      var k = 31 - wt(m),
        T = 1 << k,
        D = d[k];
      (D === -1
        ? ((T & s) === 0 || (T & a) !== 0) && (d[k] = ri(T, n))
        : D <= n && (t.expiredLanes |= T),
        (m &= ~T));
    }
  }
  function Mo(t) {
    return (
      (t = t.pendingLanes & -1073741825),
      t !== 0 ? t : t & 1073741824 ? 1073741824 : 0
    );
  }
  function Pr() {
    var t = jr;
    return ((jr <<= 1), (jr & 4194240) === 0 && (jr = 64), t);
  }
  function Po(t) {
    for (var n = [], s = 0; 31 > s; s++) n.push(t);
    return n;
  }
  function rr(t, n, s) {
    ((t.pendingLanes |= n),
      n !== 536870912 && ((t.suspendedLanes = 0), (t.pingedLanes = 0)),
      (t = t.eventTimes),
      (n = 31 - wt(n)),
      (t[n] = s));
  }
  function oi(t, n) {
    var s = t.pendingLanes & ~n;
    ((t.pendingLanes = n),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.expiredLanes &= n),
      (t.mutableReadLanes &= n),
      (t.entangledLanes &= n),
      (n = t.entanglements));
    var a = t.eventTimes;
    for (t = t.expirationTimes; 0 < s; ) {
      var d = 31 - wt(s),
        m = 1 << d;
      ((n[d] = 0), (a[d] = -1), (t[d] = -1), (s &= ~m));
    }
  }
  function pa(t, n) {
    var s = (t.entangledLanes |= n);
    for (t = t.entanglements; s; ) {
      var a = 31 - wt(s),
        d = 1 << a;
      ((d & n) | (t[a] & n) && (t[a] |= n), (s &= ~d));
    }
  }
  var $e = 0;
  function dd(t) {
    return (
      (t &= -t),
      1 < t ? (4 < t ? ((t & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var fd,
    ma,
    hd,
    pd,
    md,
    ga = !1,
    si = [],
    _n = null,
    bn = null,
    jn = null,
    Ro = new Map(),
    To = new Map(),
    In = [],
    _g =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " "
      );
  function gd(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        _n = null;
        break;
      case "dragenter":
      case "dragleave":
        bn = null;
        break;
      case "mouseover":
      case "mouseout":
        jn = null;
        break;
      case "pointerover":
      case "pointerout":
        Ro.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        To.delete(n.pointerId);
    }
  }
  function Lo(t, n, s, a, d, m) {
    return t === null || t.nativeEvent !== m
      ? ((t = {
          blockedOn: n,
          domEventName: s,
          eventSystemFlags: a,
          nativeEvent: m,
          targetContainers: [d],
        }),
        n !== null && ((n = Ko(n)), n !== null && ma(n)),
        t)
      : ((t.eventSystemFlags |= a),
        (n = t.targetContainers),
        d !== null && n.indexOf(d) === -1 && n.push(d),
        t);
  }
  function bg(t, n, s, a, d) {
    switch (n) {
      case "focusin":
        return ((_n = Lo(_n, t, n, s, a, d)), !0);
      case "dragenter":
        return ((bn = Lo(bn, t, n, s, a, d)), !0);
      case "mouseover":
        return ((jn = Lo(jn, t, n, s, a, d)), !0);
      case "pointerover":
        var m = d.pointerId;
        return (Ro.set(m, Lo(Ro.get(m) || null, t, n, s, a, d)), !0);
      case "gotpointercapture":
        return (
          (m = d.pointerId),
          To.set(m, Lo(To.get(m) || null, t, n, s, a, d)),
          !0
        );
    }
    return !1;
  }
  function yd(t) {
    var n = or(t.target);
    if (n !== null) {
      var s = Kt(n);
      if (s !== null) {
        if (((n = s.tag), n === 13)) {
          if (((n = bo(s)), n !== null)) {
            ((t.blockedOn = n),
              md(t.priority, function () {
                hd(s);
              }));
            return;
          }
        } else if (n === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function ii(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var s = va(t.domEventName, t.eventSystemFlags, n[0], t.nativeEvent);
      if (s === null) {
        s = t.nativeEvent;
        var a = new s.constructor(s.type, s);
        ((So = a), s.target.dispatchEvent(a), (So = null));
      } else return ((n = Ko(s)), n !== null && ma(n), (t.blockedOn = s), !1);
      n.shift();
    }
    return !0;
  }
  function vd(t, n, s) {
    ii(t) && s.delete(n);
  }
  function jg() {
    ((ga = !1),
      _n !== null && ii(_n) && (_n = null),
      bn !== null && ii(bn) && (bn = null),
      jn !== null && ii(jn) && (jn = null),
      Ro.forEach(vd),
      To.forEach(vd));
  }
  function zo(t, n) {
    t.blockedOn === n &&
      ((t.blockedOn = null),
      ga ||
        ((ga = !0),
        r.unstable_scheduleCallback(r.unstable_NormalPriority, jg)));
  }
  function $o(t) {
    function n(d) {
      return zo(d, t);
    }
    if (0 < si.length) {
      zo(si[0], t);
      for (var s = 1; s < si.length; s++) {
        var a = si[s];
        a.blockedOn === t && (a.blockedOn = null);
      }
    }
    for (
      _n !== null && zo(_n, t),
        bn !== null && zo(bn, t),
        jn !== null && zo(jn, t),
        Ro.forEach(n),
        To.forEach(n),
        s = 0;
      s < In.length;
      s++
    )
      ((a = In[s]), a.blockedOn === t && (a.blockedOn = null));
    for (; 0 < In.length && ((s = In[0]), s.blockedOn === null); )
      (yd(s), s.blockedOn === null && In.shift());
  }
  var Rr = j.ReactCurrentBatchConfig,
    li = !0;
  function Ig(t, n, s, a) {
    var d = $e,
      m = Rr.transition;
    Rr.transition = null;
    try {
      (($e = 1), ya(t, n, s, a));
    } finally {
      (($e = d), (Rr.transition = m));
    }
  }
  function Mg(t, n, s, a) {
    var d = $e,
      m = Rr.transition;
    Rr.transition = null;
    try {
      (($e = 4), ya(t, n, s, a));
    } finally {
      (($e = d), (Rr.transition = m));
    }
  }
  function ya(t, n, s, a) {
    if (li) {
      var d = va(t, n, s, a);
      if (d === null) (za(t, n, a, ai, s), gd(t, a));
      else if (bg(d, t, n, s, a)) a.stopPropagation();
      else if ((gd(t, a), n & 4 && -1 < _g.indexOf(t))) {
        for (; d !== null; ) {
          var m = Ko(d);
          if (
            (m !== null && fd(m),
            (m = va(t, n, s, a)),
            m === null && za(t, n, a, ai, s),
            m === d)
          )
            break;
          d = m;
        }
        d !== null && a.stopPropagation();
      } else za(t, n, a, null, s);
    }
  }
  var ai = null;
  function va(t, n, s, a) {
    if (((ai = null), (t = Eo(a)), (t = or(t)), t !== null))
      if (((n = Kt(t)), n === null)) t = null;
      else if (((s = n.tag), s === 13)) {
        if (((t = bo(n)), t !== null)) return t;
        t = null;
      } else if (s === 3) {
        if (n.stateNode.current.memoizedState.isDehydrated)
          return n.tag === 3 ? n.stateNode.containerInfo : null;
        t = null;
      } else n !== t && (t = null);
    return ((ai = t), null);
  }
  function xd(t) {
    switch (t) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (la()) {
          case Io:
            return 1;
          case ti:
            return 4;
          case br:
          case aa:
            return 16;
          case ni:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Mn = null,
    xa = null,
    ui = null;
  function wd() {
    if (ui) return ui;
    var t,
      n = xa,
      s = n.length,
      a,
      d = "value" in Mn ? Mn.value : Mn.textContent,
      m = d.length;
    for (t = 0; t < s && n[t] === d[t]; t++);
    var k = s - t;
    for (a = 1; a <= k && n[s - a] === d[m - a]; a++);
    return (ui = d.slice(t, 1 < a ? 1 - a : void 0));
  }
  function ci(t) {
    var n = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && n === 13 && (t = 13))
        : (t = n),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function di() {
    return !0;
  }
  function Sd() {
    return !1;
  }
  function St(t) {
    function n(s, a, d, m, k) {
      ((this._reactName = s),
        (this._targetInst = d),
        (this.type = a),
        (this.nativeEvent = m),
        (this.target = k),
        (this.currentTarget = null));
      for (var T in t)
        t.hasOwnProperty(T) && ((s = t[T]), (this[T] = s ? s(m) : m[T]));
      return (
        (this.isDefaultPrevented = (
          m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1
        )
          ? di
          : Sd),
        (this.isPropagationStopped = Sd),
        this
      );
    }
    return (
      W(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var s = this.nativeEvent;
          s &&
            (s.preventDefault
              ? s.preventDefault()
              : typeof s.returnValue != "unknown" && (s.returnValue = !1),
            (this.isDefaultPrevented = di));
        },
        stopPropagation: function () {
          var s = this.nativeEvent;
          s &&
            (s.stopPropagation
              ? s.stopPropagation()
              : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0),
            (this.isPropagationStopped = di));
        },
        persist: function () {},
        isPersistent: di,
      }),
      n
    );
  }
  var Tr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    wa = St(Tr),
    Ao = W({}, Tr, { view: 0, detail: 0 }),
    Pg = St(Ao),
    Sa,
    Ea,
    Do,
    fi = W({}, Ao, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ca,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== Do &&
              (Do && t.type === "mousemove"
                ? ((Sa = t.screenX - Do.screenX), (Ea = t.screenY - Do.screenY))
                : (Ea = Sa = 0),
              (Do = t)),
            Sa);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : Ea;
      },
    }),
    Ed = St(fi),
    Rg = W({}, fi, { dataTransfer: 0 }),
    Tg = St(Rg),
    Lg = W({}, Ao, { relatedTarget: 0 }),
    ka = St(Lg),
    zg = W({}, Tr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    $g = St(zg),
    Ag = W({}, Tr, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    Dg = St(Ag),
    Og = W({}, Tr, { data: 0 }),
    kd = St(Og),
    Fg = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Hg = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Bg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Vg(t) {
    var n = this.nativeEvent;
    return n.getModifierState
      ? n.getModifierState(t)
      : (t = Bg[t])
        ? !!n[t]
        : !1;
  }
  function Ca() {
    return Vg;
  }
  var Wg = W({}, Ao, {
      key: function (t) {
        if (t.key) {
          var n = Fg[t.key] || t.key;
          if (n !== "Unidentified") return n;
        }
        return t.type === "keypress"
          ? ((t = ci(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? Hg[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ca,
      charCode: function (t) {
        return t.type === "keypress" ? ci(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? ci(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    Ug = St(Wg),
    Yg = W({}, fi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Cd = St(Yg),
    Xg = W({}, Ao, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ca,
    }),
    Kg = St(Xg),
    Qg = W({}, Tr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Gg = St(Qg),
    qg = W({}, fi, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
            ? -t.wheelDeltaX
            : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Zg = St(qg),
    Jg = [9, 13, 27, 32],
    Na = f && "CompositionEvent" in window,
    Oo = null;
  f && "documentMode" in document && (Oo = document.documentMode);
  var ey = f && "TextEvent" in window && !Oo,
    Nd = f && (!Na || (Oo && 8 < Oo && 11 >= Oo)),
    _d = " ",
    bd = !1;
  function jd(t, n) {
    switch (t) {
      case "keyup":
        return Jg.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Id(t) {
    return (
      (t = t.detail),
      typeof t == "object" && "data" in t ? t.data : null
    );
  }
  var Lr = !1;
  function ty(t, n) {
    switch (t) {
      case "compositionend":
        return Id(n);
      case "keypress":
        return n.which !== 32 ? null : ((bd = !0), _d);
      case "textInput":
        return ((t = n.data), t === _d && bd ? null : t);
      default:
        return null;
    }
  }
  function ny(t, n) {
    if (Lr)
      return t === "compositionend" || (!Na && jd(t, n))
        ? ((t = wd()), (ui = xa = Mn = null), (Lr = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Nd && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var ry = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Md(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!ry[t.type] : n === "textarea";
  }
  function Pd(t, n, s, a) {
    (Us(a),
      (n = yi(n, "onChange")),
      0 < n.length &&
        ((s = new wa("onChange", "change", null, s, a)),
        t.push({ event: s, listeners: n })));
  }
  var Fo = null,
    Ho = null;
  function oy(t) {
    Qd(t, 0);
  }
  function hi(t) {
    var n = Or(t);
    if (ae(n)) return t;
  }
  function sy(t, n) {
    if (t === "change") return n;
  }
  var Rd = !1;
  if (f) {
    var _a;
    if (f) {
      var ba = "oninput" in document;
      if (!ba) {
        var Td = document.createElement("div");
        (Td.setAttribute("oninput", "return;"),
          (ba = typeof Td.oninput == "function"));
      }
      _a = ba;
    } else _a = !1;
    Rd = _a && (!document.documentMode || 9 < document.documentMode);
  }
  function Ld() {
    Fo && (Fo.detachEvent("onpropertychange", zd), (Ho = Fo = null));
  }
  function zd(t) {
    if (t.propertyName === "value" && hi(Ho)) {
      var n = [];
      (Pd(n, Ho, t, Eo(t)), Qs(oy, n));
    }
  }
  function iy(t, n, s) {
    t === "focusin"
      ? (Ld(), (Fo = n), (Ho = s), Fo.attachEvent("onpropertychange", zd))
      : t === "focusout" && Ld();
  }
  function ly(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return hi(Ho);
  }
  function ay(t, n) {
    if (t === "click") return hi(n);
  }
  function uy(t, n) {
    if (t === "input" || t === "change") return hi(n);
  }
  function cy(t, n) {
    return (t === n && (t !== 0 || 1 / t === 1 / n)) || (t !== t && n !== n);
  }
  var At = typeof Object.is == "function" ? Object.is : cy;
  function Bo(t, n) {
    if (At(t, n)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof n != "object" ||
      n === null
    )
      return !1;
    var s = Object.keys(t),
      a = Object.keys(n);
    if (s.length !== a.length) return !1;
    for (a = 0; a < s.length; a++) {
      var d = s[a];
      if (!h.call(n, d) || !At(t[d], n[d])) return !1;
    }
    return !0;
  }
  function $d(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Ad(t, n) {
    var s = $d(t);
    t = 0;
    for (var a; s; ) {
      if (s.nodeType === 3) {
        if (((a = t + s.textContent.length), t <= n && a >= n))
          return { node: s, offset: n - t };
        t = a;
      }
      e: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break e;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = $d(s);
    }
  }
  function Dd(t, n) {
    return t && n
      ? t === n
        ? !0
        : t && t.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? Dd(t, n.parentNode)
            : "contains" in t
              ? t.contains(n)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function Od() {
    for (var t = window, n = de(); n instanceof t.HTMLIFrameElement; ) {
      try {
        var s = typeof n.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) t = n.contentWindow;
      else break;
      n = de(t.document);
    }
    return n;
  }
  function ja(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      n &&
      ((n === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        n === "textarea" ||
        t.contentEditable === "true")
    );
  }
  function dy(t) {
    var n = Od(),
      s = t.focusedElem,
      a = t.selectionRange;
    if (
      n !== s &&
      s &&
      s.ownerDocument &&
      Dd(s.ownerDocument.documentElement, s)
    ) {
      if (a !== null && ja(s)) {
        if (
          ((n = a.start),
          (t = a.end),
          t === void 0 && (t = n),
          "selectionStart" in s)
        )
          ((s.selectionStart = n),
            (s.selectionEnd = Math.min(t, s.value.length)));
        else if (
          ((t = ((n = s.ownerDocument || document) && n.defaultView) || window),
          t.getSelection)
        ) {
          t = t.getSelection();
          var d = s.textContent.length,
            m = Math.min(a.start, d);
          ((a = a.end === void 0 ? m : Math.min(a.end, d)),
            !t.extend && m > a && ((d = a), (a = m), (m = d)),
            (d = Ad(s, m)));
          var k = Ad(s, a);
          d &&
            k &&
            (t.rangeCount !== 1 ||
              t.anchorNode !== d.node ||
              t.anchorOffset !== d.offset ||
              t.focusNode !== k.node ||
              t.focusOffset !== k.offset) &&
            ((n = n.createRange()),
            n.setStart(d.node, d.offset),
            t.removeAllRanges(),
            m > a
              ? (t.addRange(n), t.extend(k.node, k.offset))
              : (n.setEnd(k.node, k.offset), t.addRange(n)));
        }
      }
      for (n = [], t = s; (t = t.parentNode); )
        t.nodeType === 1 &&
          n.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
      for (typeof s.focus == "function" && s.focus(), s = 0; s < n.length; s++)
        ((t = n[s]),
          (t.element.scrollLeft = t.left),
          (t.element.scrollTop = t.top));
    }
  }
  var fy = f && "documentMode" in document && 11 >= document.documentMode,
    zr = null,
    Ia = null,
    Vo = null,
    Ma = !1;
  function Fd(t, n, s) {
    var a =
      s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Ma ||
      zr == null ||
      zr !== de(a) ||
      ((a = zr),
      "selectionStart" in a && ja(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Vo && Bo(Vo, a)) ||
        ((Vo = a),
        (a = yi(Ia, "onSelect")),
        0 < a.length &&
          ((n = new wa("onSelect", "select", null, n, s)),
          t.push({ event: n, listeners: a }),
          (n.target = zr))));
  }
  function pi(t, n) {
    var s = {};
    return (
      (s[t.toLowerCase()] = n.toLowerCase()),
      (s["Webkit" + t] = "webkit" + n),
      (s["Moz" + t] = "moz" + n),
      s
    );
  }
  var $r = {
      animationend: pi("Animation", "AnimationEnd"),
      animationiteration: pi("Animation", "AnimationIteration"),
      animationstart: pi("Animation", "AnimationStart"),
      transitionend: pi("Transition", "TransitionEnd"),
    },
    Pa = {},
    Hd = {};
  f &&
    ((Hd = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete $r.animationend.animation,
      delete $r.animationiteration.animation,
      delete $r.animationstart.animation),
    "TransitionEvent" in window || delete $r.transitionend.transition);
  function mi(t) {
    if (Pa[t]) return Pa[t];
    if (!$r[t]) return t;
    var n = $r[t],
      s;
    for (s in n) if (n.hasOwnProperty(s) && s in Hd) return (Pa[t] = n[s]);
    return t;
  }
  var Bd = mi("animationend"),
    Vd = mi("animationiteration"),
    Wd = mi("animationstart"),
    Ud = mi("transitionend"),
    Yd = new Map(),
    Xd =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  function Pn(t, n) {
    (Yd.set(t, n), u(n, [t]));
  }
  for (var Ra = 0; Ra < Xd.length; Ra++) {
    var Ta = Xd[Ra],
      hy = Ta.toLowerCase(),
      py = Ta[0].toUpperCase() + Ta.slice(1);
    Pn(hy, "on" + py);
  }
  (Pn(Bd, "onAnimationEnd"),
    Pn(Vd, "onAnimationIteration"),
    Pn(Wd, "onAnimationStart"),
    Pn("dblclick", "onDoubleClick"),
    Pn("focusin", "onFocus"),
    Pn("focusout", "onBlur"),
    Pn(Ud, "onTransitionEnd"),
    c("onMouseEnter", ["mouseout", "mouseover"]),
    c("onMouseLeave", ["mouseout", "mouseover"]),
    c("onPointerEnter", ["pointerout", "pointerover"]),
    c("onPointerLeave", ["pointerout", "pointerover"]),
    u(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    u(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    u("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    u(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    u(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    u(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    ));
  var Wo =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    my = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Wo)
    );
  function Kd(t, n, s) {
    var a = t.type || "unknown-event";
    ((t.currentTarget = s), oa(a, n, void 0, t), (t.currentTarget = null));
  }
  function Qd(t, n) {
    n = (n & 4) !== 0;
    for (var s = 0; s < t.length; s++) {
      var a = t[s],
        d = a.event;
      a = a.listeners;
      e: {
        var m = void 0;
        if (n)
          for (var k = a.length - 1; 0 <= k; k--) {
            var T = a[k],
              D = T.instance,
              ee = T.currentTarget;
            if (((T = T.listener), D !== m && d.isPropagationStopped()))
              break e;
            (Kd(d, T, ee), (m = D));
          }
        else
          for (k = 0; k < a.length; k++) {
            if (
              ((T = a[k]),
              (D = T.instance),
              (ee = T.currentTarget),
              (T = T.listener),
              D !== m && d.isPropagationStopped())
            )
              break e;
            (Kd(d, T, ee), (m = D));
          }
      }
    }
    if (_r) throw ((t = _o), (_r = !1), (_o = null), t);
  }
  function De(t, n) {
    var s = n[Ha];
    s === void 0 && (s = n[Ha] = new Set());
    var a = t + "__bubble";
    s.has(a) || (Gd(n, t, 2, !1), s.add(a));
  }
  function La(t, n, s) {
    var a = 0;
    (n && (a |= 4), Gd(s, t, a, n));
  }
  var gi = "_reactListening" + Math.random().toString(36).slice(2);
  function Uo(t) {
    if (!t[gi]) {
      ((t[gi] = !0),
        i.forEach(function (s) {
          s !== "selectionchange" && (my.has(s) || La(s, !1, t), La(s, !0, t));
        }));
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[gi] || ((n[gi] = !0), La("selectionchange", !1, n));
    }
  }
  function Gd(t, n, s, a) {
    switch (xd(n)) {
      case 1:
        var d = Ig;
        break;
      case 4:
        d = Mg;
        break;
      default:
        d = ya;
    }
    ((s = d.bind(null, n, s, t)),
      (d = void 0),
      !No ||
        (n !== "touchstart" && n !== "touchmove" && n !== "wheel") ||
        (d = !0),
      a
        ? d !== void 0
          ? t.addEventListener(n, s, { capture: !0, passive: d })
          : t.addEventListener(n, s, !0)
        : d !== void 0
          ? t.addEventListener(n, s, { passive: d })
          : t.addEventListener(n, s, !1));
  }
  function za(t, n, s, a, d) {
    var m = a;
    if ((n & 1) === 0 && (n & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var k = a.tag;
        if (k === 3 || k === 4) {
          var T = a.stateNode.containerInfo;
          if (T === d || (T.nodeType === 8 && T.parentNode === d)) break;
          if (k === 4)
            for (k = a.return; k !== null; ) {
              var D = k.tag;
              if (
                (D === 3 || D === 4) &&
                ((D = k.stateNode.containerInfo),
                D === d || (D.nodeType === 8 && D.parentNode === d))
              )
                return;
              k = k.return;
            }
          for (; T !== null; ) {
            if (((k = or(T)), k === null)) return;
            if (((D = k.tag), D === 5 || D === 6)) {
              a = m = k;
              continue e;
            }
            T = T.parentNode;
          }
        }
        a = a.return;
      }
    Qs(function () {
      var ee = m,
        fe = Eo(s),
        he = [];
      e: {
        var ce = Yd.get(t);
        if (ce !== void 0) {
          var ye = wa,
            xe = t;
          switch (t) {
            case "keypress":
              if (ci(s) === 0) break e;
            case "keydown":
            case "keyup":
              ye = Ug;
              break;
            case "focusin":
              ((xe = "focus"), (ye = ka));
              break;
            case "focusout":
              ((xe = "blur"), (ye = ka));
              break;
            case "beforeblur":
            case "afterblur":
              ye = ka;
              break;
            case "click":
              if (s.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ye = Ed;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ye = Tg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ye = Kg;
              break;
            case Bd:
            case Vd:
            case Wd:
              ye = $g;
              break;
            case Ud:
              ye = Gg;
              break;
            case "scroll":
              ye = Pg;
              break;
            case "wheel":
              ye = Zg;
              break;
            case "copy":
            case "cut":
            case "paste":
              ye = Dg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ye = Cd;
          }
          var we = (n & 4) !== 0,
            Ke = !we && t === "scroll",
            G = we ? (ce !== null ? ce + "Capture" : null) : ce;
          we = [];
          for (var F = ee, q; F !== null; ) {
            q = F;
            var pe = q.stateNode;
            if (
              (q.tag === 5 &&
                pe !== null &&
                ((q = pe),
                G !== null &&
                  ((pe = Jn(F, G)), pe != null && we.push(Yo(F, pe, q)))),
              Ke)
            )
              break;
            F = F.return;
          }
          0 < we.length &&
            ((ce = new ye(ce, xe, null, s, fe)),
            he.push({ event: ce, listeners: we }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((ce = t === "mouseover" || t === "pointerover"),
            (ye = t === "mouseout" || t === "pointerout"),
            ce &&
              s !== So &&
              (xe = s.relatedTarget || s.fromElement) &&
              (or(xe) || xe[cn]))
          )
            break e;
          if (
            (ye || ce) &&
            ((ce =
              fe.window === fe
                ? fe
                : (ce = fe.ownerDocument)
                  ? ce.defaultView || ce.parentWindow
                  : window),
            ye
              ? ((xe = s.relatedTarget || s.toElement),
                (ye = ee),
                (xe = xe ? or(xe) : null),
                xe !== null &&
                  ((Ke = Kt(xe)),
                  xe !== Ke || (xe.tag !== 5 && xe.tag !== 6)) &&
                  (xe = null))
              : ((ye = null), (xe = ee)),
            ye !== xe)
          ) {
            if (
              ((we = Ed),
              (pe = "onMouseLeave"),
              (G = "onMouseEnter"),
              (F = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((we = Cd),
                (pe = "onPointerLeave"),
                (G = "onPointerEnter"),
                (F = "pointer")),
              (Ke = ye == null ? ce : Or(ye)),
              (q = xe == null ? ce : Or(xe)),
              (ce = new we(pe, F + "leave", ye, s, fe)),
              (ce.target = Ke),
              (ce.relatedTarget = q),
              (pe = null),
              or(fe) === ee &&
                ((we = new we(G, F + "enter", xe, s, fe)),
                (we.target = q),
                (we.relatedTarget = Ke),
                (pe = we)),
              (Ke = pe),
              ye && xe)
            )
              t: {
                for (we = ye, G = xe, F = 0, q = we; q; q = Ar(q)) F++;
                for (q = 0, pe = G; pe; pe = Ar(pe)) q++;
                for (; 0 < F - q; ) ((we = Ar(we)), F--);
                for (; 0 < q - F; ) ((G = Ar(G)), q--);
                for (; F--; ) {
                  if (we === G || (G !== null && we === G.alternate)) break t;
                  ((we = Ar(we)), (G = Ar(G)));
                }
                we = null;
              }
            else we = null;
            (ye !== null && qd(he, ce, ye, we, !1),
              xe !== null && Ke !== null && qd(he, Ke, xe, we, !0));
          }
        }
        e: {
          if (
            ((ce = ee ? Or(ee) : window),
            (ye = ce.nodeName && ce.nodeName.toLowerCase()),
            ye === "select" || (ye === "input" && ce.type === "file"))
          )
            var Ee = sy;
          else if (Md(ce))
            if (Rd) Ee = uy;
            else {
              Ee = ly;
              var be = iy;
            }
          else
            (ye = ce.nodeName) &&
              ye.toLowerCase() === "input" &&
              (ce.type === "checkbox" || ce.type === "radio") &&
              (Ee = ay);
          if (Ee && (Ee = Ee(t, ee))) {
            Pd(he, Ee, s, fe);
            break e;
          }
          (be && be(t, ce, ee),
            t === "focusout" &&
              (be = ce._wrapperState) &&
              be.controlled &&
              ce.type === "number" &&
              me(ce, "number", ce.value));
        }
        switch (((be = ee ? Or(ee) : window), t)) {
          case "focusin":
            (Md(be) || be.contentEditable === "true") &&
              ((zr = be), (Ia = ee), (Vo = null));
            break;
          case "focusout":
            Vo = Ia = zr = null;
            break;
          case "mousedown":
            Ma = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Ma = !1), Fd(he, s, fe));
            break;
          case "selectionchange":
            if (fy) break;
          case "keydown":
          case "keyup":
            Fd(he, s, fe);
        }
        var je;
        if (Na)
          e: {
            switch (t) {
              case "compositionstart":
                var Me = "onCompositionStart";
                break e;
              case "compositionend":
                Me = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Me = "onCompositionUpdate";
                break e;
            }
            Me = void 0;
          }
        else
          Lr
            ? jd(t, s) && (Me = "onCompositionEnd")
            : t === "keydown" &&
              s.keyCode === 229 &&
              (Me = "onCompositionStart");
        (Me &&
          (Nd &&
            s.locale !== "ko" &&
            (Lr || Me !== "onCompositionStart"
              ? Me === "onCompositionEnd" && Lr && (je = wd())
              : ((Mn = fe),
                (xa = "value" in Mn ? Mn.value : Mn.textContent),
                (Lr = !0))),
          (be = yi(ee, Me)),
          0 < be.length &&
            ((Me = new kd(Me, t, null, s, fe)),
            he.push({ event: Me, listeners: be }),
            je
              ? (Me.data = je)
              : ((je = Id(s)), je !== null && (Me.data = je)))),
          (je = ey ? ty(t, s) : ny(t, s)) &&
            ((ee = yi(ee, "onBeforeInput")),
            0 < ee.length &&
              ((fe = new kd("onBeforeInput", "beforeinput", null, s, fe)),
              he.push({ event: fe, listeners: ee }),
              (fe.data = je))));
      }
      Qd(he, n);
    });
  }
  function Yo(t, n, s) {
    return { instance: t, listener: n, currentTarget: s };
  }
  function yi(t, n) {
    for (var s = n + "Capture", a = []; t !== null; ) {
      var d = t,
        m = d.stateNode;
      (d.tag === 5 &&
        m !== null &&
        ((d = m),
        (m = Jn(t, s)),
        m != null && a.unshift(Yo(t, m, d)),
        (m = Jn(t, n)),
        m != null && a.push(Yo(t, m, d))),
        (t = t.return));
    }
    return a;
  }
  function Ar(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5);
    return t || null;
  }
  function qd(t, n, s, a, d) {
    for (var m = n._reactName, k = []; s !== null && s !== a; ) {
      var T = s,
        D = T.alternate,
        ee = T.stateNode;
      if (D !== null && D === a) break;
      (T.tag === 5 &&
        ee !== null &&
        ((T = ee),
        d
          ? ((D = Jn(s, m)), D != null && k.unshift(Yo(s, D, T)))
          : d || ((D = Jn(s, m)), D != null && k.push(Yo(s, D, T)))),
        (s = s.return));
    }
    k.length !== 0 && t.push({ event: n, listeners: k });
  }
  var gy = /\r\n?/g,
    yy = /\u0000|\uFFFD/g;
  function Zd(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        gy,
        `
`
      )
      .replace(yy, "");
  }
  function vi(t, n, s) {
    if (((n = Zd(n)), Zd(t) !== n && s)) throw Error(o(425));
  }
  function xi() {}
  var $a = null,
    Aa = null;
  function Da(t, n) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof n.children == "string" ||
      typeof n.children == "number" ||
      (typeof n.dangerouslySetInnerHTML == "object" &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Oa = typeof setTimeout == "function" ? setTimeout : void 0,
    vy = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Jd = typeof Promise == "function" ? Promise : void 0,
    xy =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Jd < "u"
          ? function (t) {
              return Jd.resolve(null).then(t).catch(wy);
            }
          : Oa;
  function wy(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Fa(t, n) {
    var s = n,
      a = 0;
    do {
      var d = s.nextSibling;
      if ((t.removeChild(s), d && d.nodeType === 8))
        if (((s = d.data), s === "/$")) {
          if (a === 0) {
            (t.removeChild(d), $o(n));
            return;
          }
          a--;
        } else (s !== "$" && s !== "$?" && s !== "$!") || a++;
      s = d;
    } while (s);
    $o(n);
  }
  function Rn(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (((n = t.data), n === "$" || n === "$!" || n === "$?")) break;
        if (n === "/$") return null;
      }
    }
    return t;
  }
  function ef(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var s = t.data;
        if (s === "$" || s === "$!" || s === "$?") {
          if (n === 0) return t;
          n--;
        } else s === "/$" && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  var Dr = Math.random().toString(36).slice(2),
    Gt = "__reactFiber$" + Dr,
    Xo = "__reactProps$" + Dr,
    cn = "__reactContainer$" + Dr,
    Ha = "__reactEvents$" + Dr,
    Sy = "__reactListeners$" + Dr,
    Ey = "__reactHandles$" + Dr;
  function or(t) {
    var n = t[Gt];
    if (n) return n;
    for (var s = t.parentNode; s; ) {
      if ((n = s[cn] || s[Gt])) {
        if (
          ((s = n.alternate),
          n.child !== null || (s !== null && s.child !== null))
        )
          for (t = ef(t); t !== null; ) {
            if ((s = t[Gt])) return s;
            t = ef(t);
          }
        return n;
      }
      ((t = s), (s = t.parentNode));
    }
    return null;
  }
  function Ko(t) {
    return (
      (t = t[Gt] || t[cn]),
      !t || (t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3)
        ? null
        : t
    );
  }
  function Or(t) {
    if (t.tag === 5 || t.tag === 6) return t.stateNode;
    throw Error(o(33));
  }
  function wi(t) {
    return t[Xo] || null;
  }
  var Ba = [],
    Fr = -1;
  function Tn(t) {
    return { current: t };
  }
  function Oe(t) {
    0 > Fr || ((t.current = Ba[Fr]), (Ba[Fr] = null), Fr--);
  }
  function Ae(t, n) {
    (Fr++, (Ba[Fr] = t.current), (t.current = n));
  }
  var Ln = {},
    it = Tn(Ln),
    ht = Tn(!1),
    sr = Ln;
  function Hr(t, n) {
    var s = t.type.contextTypes;
    if (!s) return Ln;
    var a = t.stateNode;
    if (a && a.__reactInternalMemoizedUnmaskedChildContext === n)
      return a.__reactInternalMemoizedMaskedChildContext;
    var d = {},
      m;
    for (m in s) d[m] = n[m];
    return (
      a &&
        ((t = t.stateNode),
        (t.__reactInternalMemoizedUnmaskedChildContext = n),
        (t.__reactInternalMemoizedMaskedChildContext = d)),
      d
    );
  }
  function pt(t) {
    return ((t = t.childContextTypes), t != null);
  }
  function Si() {
    (Oe(ht), Oe(it));
  }
  function tf(t, n, s) {
    if (it.current !== Ln) throw Error(o(168));
    (Ae(it, n), Ae(ht, s));
  }
  function nf(t, n, s) {
    var a = t.stateNode;
    if (((n = n.childContextTypes), typeof a.getChildContext != "function"))
      return s;
    a = a.getChildContext();
    for (var d in a) if (!(d in n)) throw Error(o(108, ne(t) || "Unknown", d));
    return W({}, s, a);
  }
  function Ei(t) {
    return (
      (t =
        ((t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext) ||
        Ln),
      (sr = it.current),
      Ae(it, t),
      Ae(ht, ht.current),
      !0
    );
  }
  function rf(t, n, s) {
    var a = t.stateNode;
    if (!a) throw Error(o(169));
    (s
      ? ((t = nf(t, n, sr)),
        (a.__reactInternalMemoizedMergedChildContext = t),
        Oe(ht),
        Oe(it),
        Ae(it, t))
      : Oe(ht),
      Ae(ht, s));
  }
  var dn = null,
    ki = !1,
    Va = !1;
  function of(t) {
    dn === null ? (dn = [t]) : dn.push(t);
  }
  function ky(t) {
    ((ki = !0), of(t));
  }
  function zn() {
    if (!Va && dn !== null) {
      Va = !0;
      var t = 0,
        n = $e;
      try {
        var s = dn;
        for ($e = 1; t < s.length; t++) {
          var a = s[t];
          do a = a(!0);
          while (a !== null);
        }
        ((dn = null), (ki = !1));
      } catch (d) {
        throw (dn !== null && (dn = dn.slice(t + 1)), Zs(Io, zn), d);
      } finally {
        (($e = n), (Va = !1));
      }
    }
    return null;
  }
  var Br = [],
    Vr = 0,
    Ci = null,
    Ni = 0,
    Mt = [],
    Pt = 0,
    ir = null,
    fn = 1,
    hn = "";
  function lr(t, n) {
    ((Br[Vr++] = Ni), (Br[Vr++] = Ci), (Ci = t), (Ni = n));
  }
  function sf(t, n, s) {
    ((Mt[Pt++] = fn), (Mt[Pt++] = hn), (Mt[Pt++] = ir), (ir = t));
    var a = fn;
    t = hn;
    var d = 32 - wt(a) - 1;
    ((a &= ~(1 << d)), (s += 1));
    var m = 32 - wt(n) + d;
    if (30 < m) {
      var k = d - (d % 5);
      ((m = (a & ((1 << k) - 1)).toString(32)),
        (a >>= k),
        (d -= k),
        (fn = (1 << (32 - wt(n) + d)) | (s << d) | a),
        (hn = m + t));
    } else ((fn = (1 << m) | (s << d) | a), (hn = t));
  }
  function Wa(t) {
    t.return !== null && (lr(t, 1), sf(t, 1, 0));
  }
  function Ua(t) {
    for (; t === Ci; )
      ((Ci = Br[--Vr]), (Br[Vr] = null), (Ni = Br[--Vr]), (Br[Vr] = null));
    for (; t === ir; )
      ((ir = Mt[--Pt]),
        (Mt[Pt] = null),
        (hn = Mt[--Pt]),
        (Mt[Pt] = null),
        (fn = Mt[--Pt]),
        (Mt[Pt] = null));
  }
  var Et = null,
    kt = null,
    Fe = !1,
    Dt = null;
  function lf(t, n) {
    var s = zt(5, null, null, 0);
    ((s.elementType = "DELETED"),
      (s.stateNode = n),
      (s.return = t),
      (n = t.deletions),
      n === null ? ((t.deletions = [s]), (t.flags |= 16)) : n.push(s));
  }
  function af(t, n) {
    switch (t.tag) {
      case 5:
        var s = t.type;
        return (
          (n =
            n.nodeType !== 1 || s.toLowerCase() !== n.nodeName.toLowerCase()
              ? null
              : n),
          n !== null
            ? ((t.stateNode = n), (Et = t), (kt = Rn(n.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (n = t.pendingProps === "" || n.nodeType !== 3 ? null : n),
          n !== null ? ((t.stateNode = n), (Et = t), (kt = null), !0) : !1
        );
      case 13:
        return (
          (n = n.nodeType !== 8 ? null : n),
          n !== null
            ? ((s = ir !== null ? { id: fn, overflow: hn } : null),
              (t.memoizedState = {
                dehydrated: n,
                treeContext: s,
                retryLane: 1073741824,
              }),
              (s = zt(18, null, null, 0)),
              (s.stateNode = n),
              (s.return = t),
              (t.child = s),
              (Et = t),
              (kt = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Ya(t) {
    return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
  }
  function Xa(t) {
    if (Fe) {
      var n = kt;
      if (n) {
        var s = n;
        if (!af(t, n)) {
          if (Ya(t)) throw Error(o(418));
          n = Rn(s.nextSibling);
          var a = Et;
          n && af(t, n)
            ? lf(a, s)
            : ((t.flags = (t.flags & -4097) | 2), (Fe = !1), (Et = t));
        }
      } else {
        if (Ya(t)) throw Error(o(418));
        ((t.flags = (t.flags & -4097) | 2), (Fe = !1), (Et = t));
      }
    }
  }
  function uf(t) {
    for (
      t = t.return;
      t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13;
    )
      t = t.return;
    Et = t;
  }
  function _i(t) {
    if (t !== Et) return !1;
    if (!Fe) return (uf(t), (Fe = !0), !1);
    var n;
    if (
      ((n = t.tag !== 3) &&
        !(n = t.tag !== 5) &&
        ((n = t.type),
        (n = n !== "head" && n !== "body" && !Da(t.type, t.memoizedProps))),
      n && (n = kt))
    ) {
      if (Ya(t)) throw (cf(), Error(o(418)));
      for (; n; ) (lf(t, n), (n = Rn(n.nextSibling)));
    }
    if ((uf(t), t.tag === 13)) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(o(317));
      e: {
        for (t = t.nextSibling, n = 0; t; ) {
          if (t.nodeType === 8) {
            var s = t.data;
            if (s === "/$") {
              if (n === 0) {
                kt = Rn(t.nextSibling);
                break e;
              }
              n--;
            } else (s !== "$" && s !== "$!" && s !== "$?") || n++;
          }
          t = t.nextSibling;
        }
        kt = null;
      }
    } else kt = Et ? Rn(t.stateNode.nextSibling) : null;
    return !0;
  }
  function cf() {
    for (var t = kt; t; ) t = Rn(t.nextSibling);
  }
  function Wr() {
    ((kt = Et = null), (Fe = !1));
  }
  function Ka(t) {
    Dt === null ? (Dt = [t]) : Dt.push(t);
  }
  var Cy = j.ReactCurrentBatchConfig;
  function Qo(t, n, s) {
    if (
      ((t = s.ref),
      t !== null && typeof t != "function" && typeof t != "object")
    ) {
      if (s._owner) {
        if (((s = s._owner), s)) {
          if (s.tag !== 1) throw Error(o(309));
          var a = s.stateNode;
        }
        if (!a) throw Error(o(147, t));
        var d = a,
          m = "" + t;
        return n !== null &&
          n.ref !== null &&
          typeof n.ref == "function" &&
          n.ref._stringRef === m
          ? n.ref
          : ((n = function (k) {
              var T = d.refs;
              k === null ? delete T[m] : (T[m] = k);
            }),
            (n._stringRef = m),
            n);
      }
      if (typeof t != "string") throw Error(o(284));
      if (!s._owner) throw Error(o(290, t));
    }
    return t;
  }
  function bi(t, n) {
    throw (
      (t = Object.prototype.toString.call(n)),
      Error(
        o(
          31,
          t === "[object Object]"
            ? "object with keys {" + Object.keys(n).join(", ") + "}"
            : t
        )
      )
    );
  }
  function df(t) {
    var n = t._init;
    return n(t._payload);
  }
  function ff(t) {
    function n(G, F) {
      if (t) {
        var q = G.deletions;
        q === null ? ((G.deletions = [F]), (G.flags |= 16)) : q.push(F);
      }
    }
    function s(G, F) {
      if (!t) return null;
      for (; F !== null; ) (n(G, F), (F = F.sibling));
      return null;
    }
    function a(G, F) {
      for (G = new Map(); F !== null; )
        (F.key !== null ? G.set(F.key, F) : G.set(F.index, F), (F = F.sibling));
      return G;
    }
    function d(G, F) {
      return ((G = Vn(G, F)), (G.index = 0), (G.sibling = null), G);
    }
    function m(G, F, q) {
      return (
        (G.index = q),
        t
          ? ((q = G.alternate),
            q !== null
              ? ((q = q.index), q < F ? ((G.flags |= 2), F) : q)
              : ((G.flags |= 2), F))
          : ((G.flags |= 1048576), F)
      );
    }
    function k(G) {
      return (t && G.alternate === null && (G.flags |= 2), G);
    }
    function T(G, F, q, pe) {
      return F === null || F.tag !== 6
        ? ((F = Ou(q, G.mode, pe)), (F.return = G), F)
        : ((F = d(F, q)), (F.return = G), F);
    }
    function D(G, F, q, pe) {
      var Ee = q.type;
      return Ee === P
        ? fe(G, F, q.props.children, pe, q.key)
        : F !== null &&
            (F.elementType === Ee ||
              (typeof Ee == "object" &&
                Ee !== null &&
                Ee.$$typeof === B &&
                df(Ee) === F.type))
          ? ((pe = d(F, q.props)), (pe.ref = Qo(G, F, q)), (pe.return = G), pe)
          : ((pe = qi(q.type, q.key, q.props, null, G.mode, pe)),
            (pe.ref = Qo(G, F, q)),
            (pe.return = G),
            pe);
    }
    function ee(G, F, q, pe) {
      return F === null ||
        F.tag !== 4 ||
        F.stateNode.containerInfo !== q.containerInfo ||
        F.stateNode.implementation !== q.implementation
        ? ((F = Fu(q, G.mode, pe)), (F.return = G), F)
        : ((F = d(F, q.children || [])), (F.return = G), F);
    }
    function fe(G, F, q, pe, Ee) {
      return F === null || F.tag !== 7
        ? ((F = mr(q, G.mode, pe, Ee)), (F.return = G), F)
        : ((F = d(F, q)), (F.return = G), F);
    }
    function he(G, F, q) {
      if ((typeof F == "string" && F !== "") || typeof F == "number")
        return ((F = Ou("" + F, G.mode, q)), (F.return = G), F);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case O:
            return (
              (q = qi(F.type, F.key, F.props, null, G.mode, q)),
              (q.ref = Qo(G, null, F)),
              (q.return = G),
              q
            );
          case A:
            return ((F = Fu(F, G.mode, q)), (F.return = G), F);
          case B:
            var pe = F._init;
            return he(G, pe(F._payload), q);
        }
        if (_e(F) || $(F))
          return ((F = mr(F, G.mode, q, null)), (F.return = G), F);
        bi(G, F);
      }
      return null;
    }
    function ce(G, F, q, pe) {
      var Ee = F !== null ? F.key : null;
      if ((typeof q == "string" && q !== "") || typeof q == "number")
        return Ee !== null ? null : T(G, F, "" + q, pe);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case O:
            return q.key === Ee ? D(G, F, q, pe) : null;
          case A:
            return q.key === Ee ? ee(G, F, q, pe) : null;
          case B:
            return ((Ee = q._init), ce(G, F, Ee(q._payload), pe));
        }
        if (_e(q) || $(q)) return Ee !== null ? null : fe(G, F, q, pe, null);
        bi(G, q);
      }
      return null;
    }
    function ye(G, F, q, pe, Ee) {
      if ((typeof pe == "string" && pe !== "") || typeof pe == "number")
        return ((G = G.get(q) || null), T(F, G, "" + pe, Ee));
      if (typeof pe == "object" && pe !== null) {
        switch (pe.$$typeof) {
          case O:
            return (
              (G = G.get(pe.key === null ? q : pe.key) || null),
              D(F, G, pe, Ee)
            );
          case A:
            return (
              (G = G.get(pe.key === null ? q : pe.key) || null),
              ee(F, G, pe, Ee)
            );
          case B:
            var be = pe._init;
            return ye(G, F, q, be(pe._payload), Ee);
        }
        if (_e(pe) || $(pe))
          return ((G = G.get(q) || null), fe(F, G, pe, Ee, null));
        bi(F, pe);
      }
      return null;
    }
    function xe(G, F, q, pe) {
      for (
        var Ee = null, be = null, je = F, Me = (F = 0), nt = null;
        je !== null && Me < q.length;
        Me++
      ) {
        je.index > Me ? ((nt = je), (je = null)) : (nt = je.sibling);
        var ze = ce(G, je, q[Me], pe);
        if (ze === null) {
          je === null && (je = nt);
          break;
        }
        (t && je && ze.alternate === null && n(G, je),
          (F = m(ze, F, Me)),
          be === null ? (Ee = ze) : (be.sibling = ze),
          (be = ze),
          (je = nt));
      }
      if (Me === q.length) return (s(G, je), Fe && lr(G, Me), Ee);
      if (je === null) {
        for (; Me < q.length; Me++)
          ((je = he(G, q[Me], pe)),
            je !== null &&
              ((F = m(je, F, Me)),
              be === null ? (Ee = je) : (be.sibling = je),
              (be = je)));
        return (Fe && lr(G, Me), Ee);
      }
      for (je = a(G, je); Me < q.length; Me++)
        ((nt = ye(je, G, Me, q[Me], pe)),
          nt !== null &&
            (t &&
              nt.alternate !== null &&
              je.delete(nt.key === null ? Me : nt.key),
            (F = m(nt, F, Me)),
            be === null ? (Ee = nt) : (be.sibling = nt),
            (be = nt)));
      return (
        t &&
          je.forEach(function (Wn) {
            return n(G, Wn);
          }),
        Fe && lr(G, Me),
        Ee
      );
    }
    function we(G, F, q, pe) {
      var Ee = $(q);
      if (typeof Ee != "function") throw Error(o(150));
      if (((q = Ee.call(q)), q == null)) throw Error(o(151));
      for (
        var be = (Ee = null), je = F, Me = (F = 0), nt = null, ze = q.next();
        je !== null && !ze.done;
        Me++, ze = q.next()
      ) {
        je.index > Me ? ((nt = je), (je = null)) : (nt = je.sibling);
        var Wn = ce(G, je, ze.value, pe);
        if (Wn === null) {
          je === null && (je = nt);
          break;
        }
        (t && je && Wn.alternate === null && n(G, je),
          (F = m(Wn, F, Me)),
          be === null ? (Ee = Wn) : (be.sibling = Wn),
          (be = Wn),
          (je = nt));
      }
      if (ze.done) return (s(G, je), Fe && lr(G, Me), Ee);
      if (je === null) {
        for (; !ze.done; Me++, ze = q.next())
          ((ze = he(G, ze.value, pe)),
            ze !== null &&
              ((F = m(ze, F, Me)),
              be === null ? (Ee = ze) : (be.sibling = ze),
              (be = ze)));
        return (Fe && lr(G, Me), Ee);
      }
      for (je = a(G, je); !ze.done; Me++, ze = q.next())
        ((ze = ye(je, G, Me, ze.value, pe)),
          ze !== null &&
            (t &&
              ze.alternate !== null &&
              je.delete(ze.key === null ? Me : ze.key),
            (F = m(ze, F, Me)),
            be === null ? (Ee = ze) : (be.sibling = ze),
            (be = ze)));
      return (
        t &&
          je.forEach(function (rv) {
            return n(G, rv);
          }),
        Fe && lr(G, Me),
        Ee
      );
    }
    function Ke(G, F, q, pe) {
      if (
        (typeof q == "object" &&
          q !== null &&
          q.type === P &&
          q.key === null &&
          (q = q.props.children),
        typeof q == "object" && q !== null)
      ) {
        switch (q.$$typeof) {
          case O:
            e: {
              for (var Ee = q.key, be = F; be !== null; ) {
                if (be.key === Ee) {
                  if (((Ee = q.type), Ee === P)) {
                    if (be.tag === 7) {
                      (s(G, be.sibling),
                        (F = d(be, q.props.children)),
                        (F.return = G),
                        (G = F));
                      break e;
                    }
                  } else if (
                    be.elementType === Ee ||
                    (typeof Ee == "object" &&
                      Ee !== null &&
                      Ee.$$typeof === B &&
                      df(Ee) === be.type)
                  ) {
                    (s(G, be.sibling),
                      (F = d(be, q.props)),
                      (F.ref = Qo(G, be, q)),
                      (F.return = G),
                      (G = F));
                    break e;
                  }
                  s(G, be);
                  break;
                } else n(G, be);
                be = be.sibling;
              }
              q.type === P
                ? ((F = mr(q.props.children, G.mode, pe, q.key)),
                  (F.return = G),
                  (G = F))
                : ((pe = qi(q.type, q.key, q.props, null, G.mode, pe)),
                  (pe.ref = Qo(G, F, q)),
                  (pe.return = G),
                  (G = pe));
            }
            return k(G);
          case A:
            e: {
              for (be = q.key; F !== null; ) {
                if (F.key === be)
                  if (
                    F.tag === 4 &&
                    F.stateNode.containerInfo === q.containerInfo &&
                    F.stateNode.implementation === q.implementation
                  ) {
                    (s(G, F.sibling),
                      (F = d(F, q.children || [])),
                      (F.return = G),
                      (G = F));
                    break e;
                  } else {
                    s(G, F);
                    break;
                  }
                else n(G, F);
                F = F.sibling;
              }
              ((F = Fu(q, G.mode, pe)), (F.return = G), (G = F));
            }
            return k(G);
          case B:
            return ((be = q._init), Ke(G, F, be(q._payload), pe));
        }
        if (_e(q)) return xe(G, F, q, pe);
        if ($(q)) return we(G, F, q, pe);
        bi(G, q);
      }
      return (typeof q == "string" && q !== "") || typeof q == "number"
        ? ((q = "" + q),
          F !== null && F.tag === 6
            ? (s(G, F.sibling), (F = d(F, q)), (F.return = G), (G = F))
            : (s(G, F), (F = Ou(q, G.mode, pe)), (F.return = G), (G = F)),
          k(G))
        : s(G, F);
    }
    return Ke;
  }
  var Ur = ff(!0),
    hf = ff(!1),
    ji = Tn(null),
    Ii = null,
    Yr = null,
    Qa = null;
  function Ga() {
    Qa = Yr = Ii = null;
  }
  function qa(t) {
    var n = ji.current;
    (Oe(ji), (t._currentValue = n));
  }
  function Za(t, n, s) {
    for (; t !== null; ) {
      var a = t.alternate;
      if (
        ((t.childLanes & n) !== n
          ? ((t.childLanes |= n), a !== null && (a.childLanes |= n))
          : a !== null && (a.childLanes & n) !== n && (a.childLanes |= n),
        t === s)
      )
        break;
      t = t.return;
    }
  }
  function Xr(t, n) {
    ((Ii = t),
      (Qa = Yr = null),
      (t = t.dependencies),
      t !== null &&
        t.firstContext !== null &&
        ((t.lanes & n) !== 0 && (mt = !0), (t.firstContext = null)));
  }
  function Rt(t) {
    var n = t._currentValue;
    if (Qa !== t)
      if (((t = { context: t, memoizedValue: n, next: null }), Yr === null)) {
        if (Ii === null) throw Error(o(308));
        ((Yr = t), (Ii.dependencies = { lanes: 0, firstContext: t }));
      } else Yr = Yr.next = t;
    return n;
  }
  var ar = null;
  function Ja(t) {
    ar === null ? (ar = [t]) : ar.push(t);
  }
  function pf(t, n, s, a) {
    var d = n.interleaved;
    return (
      d === null ? ((s.next = s), Ja(n)) : ((s.next = d.next), (d.next = s)),
      (n.interleaved = s),
      pn(t, a)
    );
  }
  function pn(t, n) {
    t.lanes |= n;
    var s = t.alternate;
    for (s !== null && (s.lanes |= n), s = t, t = t.return; t !== null; )
      ((t.childLanes |= n),
        (s = t.alternate),
        s !== null && (s.childLanes |= n),
        (s = t),
        (t = t.return));
    return s.tag === 3 ? s.stateNode : null;
  }
  var $n = !1;
  function eu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function mf(t, n) {
    ((t = t.updateQueue),
      n.updateQueue === t &&
        (n.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          effects: t.effects,
        }));
  }
  function mn(t, n) {
    return {
      eventTime: t,
      lane: n,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function An(t, n, s) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (Le & 2) !== 0)) {
      var d = a.pending;
      return (
        d === null ? (n.next = n) : ((n.next = d.next), (d.next = n)),
        (a.pending = n),
        pn(t, s)
      );
    }
    return (
      (d = a.interleaved),
      d === null ? ((n.next = n), Ja(a)) : ((n.next = d.next), (d.next = n)),
      (a.interleaved = n),
      pn(t, s)
    );
  }
  function Mi(t, n, s) {
    if (
      ((n = n.updateQueue), n !== null && ((n = n.shared), (s & 4194240) !== 0))
    ) {
      var a = n.lanes;
      ((a &= t.pendingLanes), (s |= a), (n.lanes = s), pa(t, s));
    }
  }
  function gf(t, n) {
    var s = t.updateQueue,
      a = t.alternate;
    if (a !== null && ((a = a.updateQueue), s === a)) {
      var d = null,
        m = null;
      if (((s = s.firstBaseUpdate), s !== null)) {
        do {
          var k = {
            eventTime: s.eventTime,
            lane: s.lane,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null,
          };
          (m === null ? (d = m = k) : (m = m.next = k), (s = s.next));
        } while (s !== null);
        m === null ? (d = m = n) : (m = m.next = n);
      } else d = m = n;
      ((s = {
        baseState: a.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: m,
        shared: a.shared,
        effects: a.effects,
      }),
        (t.updateQueue = s));
      return;
    }
    ((t = s.lastBaseUpdate),
      t === null ? (s.firstBaseUpdate = n) : (t.next = n),
      (s.lastBaseUpdate = n));
  }
  function Pi(t, n, s, a) {
    var d = t.updateQueue;
    $n = !1;
    var m = d.firstBaseUpdate,
      k = d.lastBaseUpdate,
      T = d.shared.pending;
    if (T !== null) {
      d.shared.pending = null;
      var D = T,
        ee = D.next;
      ((D.next = null), k === null ? (m = ee) : (k.next = ee), (k = D));
      var fe = t.alternate;
      fe !== null &&
        ((fe = fe.updateQueue),
        (T = fe.lastBaseUpdate),
        T !== k &&
          (T === null ? (fe.firstBaseUpdate = ee) : (T.next = ee),
          (fe.lastBaseUpdate = D)));
    }
    if (m !== null) {
      var he = d.baseState;
      ((k = 0), (fe = ee = D = null), (T = m));
      do {
        var ce = T.lane,
          ye = T.eventTime;
        if ((a & ce) === ce) {
          fe !== null &&
            (fe = fe.next =
              {
                eventTime: ye,
                lane: 0,
                tag: T.tag,
                payload: T.payload,
                callback: T.callback,
                next: null,
              });
          e: {
            var xe = t,
              we = T;
            switch (((ce = n), (ye = s), we.tag)) {
              case 1:
                if (((xe = we.payload), typeof xe == "function")) {
                  he = xe.call(ye, he, ce);
                  break e;
                }
                he = xe;
                break e;
              case 3:
                xe.flags = (xe.flags & -65537) | 128;
              case 0:
                if (
                  ((xe = we.payload),
                  (ce = typeof xe == "function" ? xe.call(ye, he, ce) : xe),
                  ce == null)
                )
                  break e;
                he = W({}, he, ce);
                break e;
              case 2:
                $n = !0;
            }
          }
          T.callback !== null &&
            T.lane !== 0 &&
            ((t.flags |= 64),
            (ce = d.effects),
            ce === null ? (d.effects = [T]) : ce.push(T));
        } else
          ((ye = {
            eventTime: ye,
            lane: ce,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null,
          }),
            fe === null ? ((ee = fe = ye), (D = he)) : (fe = fe.next = ye),
            (k |= ce));
        if (((T = T.next), T === null)) {
          if (((T = d.shared.pending), T === null)) break;
          ((ce = T),
            (T = ce.next),
            (ce.next = null),
            (d.lastBaseUpdate = ce),
            (d.shared.pending = null));
        }
      } while (!0);
      if (
        (fe === null && (D = he),
        (d.baseState = D),
        (d.firstBaseUpdate = ee),
        (d.lastBaseUpdate = fe),
        (n = d.shared.interleaved),
        n !== null)
      ) {
        d = n;
        do ((k |= d.lane), (d = d.next));
        while (d !== n);
      } else m === null && (d.shared.lanes = 0);
      ((dr |= k), (t.lanes = k), (t.memoizedState = he));
    }
  }
  function yf(t, n, s) {
    if (((t = n.effects), (n.effects = null), t !== null))
      for (n = 0; n < t.length; n++) {
        var a = t[n],
          d = a.callback;
        if (d !== null) {
          if (((a.callback = null), (a = s), typeof d != "function"))
            throw Error(o(191, d));
          d.call(a);
        }
      }
  }
  var Go = {},
    qt = Tn(Go),
    qo = Tn(Go),
    Zo = Tn(Go);
  function ur(t) {
    if (t === Go) throw Error(o(174));
    return t;
  }
  function tu(t, n) {
    switch ((Ae(Zo, n), Ae(qo, t), Ae(qt, Go), (t = n.nodeType), t)) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : an(null, "");
        break;
      default:
        ((t = t === 8 ? n.parentNode : n),
          (n = t.namespaceURI || null),
          (t = t.tagName),
          (n = an(n, t)));
    }
    (Oe(qt), Ae(qt, n));
  }
  function Kr() {
    (Oe(qt), Oe(qo), Oe(Zo));
  }
  function vf(t) {
    ur(Zo.current);
    var n = ur(qt.current),
      s = an(n, t.type);
    n !== s && (Ae(qo, t), Ae(qt, s));
  }
  function nu(t) {
    qo.current === t && (Oe(qt), Oe(qo));
  }
  var Ue = Tn(0);
  function Ri(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var s = n.memoizedState;
        if (
          s !== null &&
          ((s = s.dehydrated), s === null || s.data === "$?" || s.data === "$!")
        )
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return null;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
    return null;
  }
  var ru = [];
  function ou() {
    for (var t = 0; t < ru.length; t++)
      ru[t]._workInProgressVersionPrimary = null;
    ru.length = 0;
  }
  var Ti = j.ReactCurrentDispatcher,
    su = j.ReactCurrentBatchConfig,
    cr = 0,
    Ye = null,
    qe = null,
    et = null,
    Li = !1,
    Jo = !1,
    es = 0,
    Ny = 0;
  function lt() {
    throw Error(o(321));
  }
  function iu(t, n) {
    if (n === null) return !1;
    for (var s = 0; s < n.length && s < t.length; s++)
      if (!At(t[s], n[s])) return !1;
    return !0;
  }
  function lu(t, n, s, a, d, m) {
    if (
      ((cr = m),
      (Ye = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (Ti.current = t === null || t.memoizedState === null ? Iy : My),
      (t = s(a, d)),
      Jo)
    ) {
      m = 0;
      do {
        if (((Jo = !1), (es = 0), 25 <= m)) throw Error(o(301));
        ((m += 1),
          (et = qe = null),
          (n.updateQueue = null),
          (Ti.current = Py),
          (t = s(a, d)));
      } while (Jo);
    }
    if (
      ((Ti.current = Ai),
      (n = qe !== null && qe.next !== null),
      (cr = 0),
      (et = qe = Ye = null),
      (Li = !1),
      n)
    )
      throw Error(o(300));
    return t;
  }
  function au() {
    var t = es !== 0;
    return ((es = 0), t);
  }
  function Zt() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (et === null ? (Ye.memoizedState = et = t) : (et = et.next = t), et);
  }
  function Tt() {
    if (qe === null) {
      var t = Ye.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = qe.next;
    var n = et === null ? Ye.memoizedState : et.next;
    if (n !== null) ((et = n), (qe = t));
    else {
      if (t === null) throw Error(o(310));
      ((qe = t),
        (t = {
          memoizedState: qe.memoizedState,
          baseState: qe.baseState,
          baseQueue: qe.baseQueue,
          queue: qe.queue,
          next: null,
        }),
        et === null ? (Ye.memoizedState = et = t) : (et = et.next = t));
    }
    return et;
  }
  function ts(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function uu(t) {
    var n = Tt(),
      s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var a = qe,
      d = a.baseQueue,
      m = s.pending;
    if (m !== null) {
      if (d !== null) {
        var k = d.next;
        ((d.next = m.next), (m.next = k));
      }
      ((a.baseQueue = d = m), (s.pending = null));
    }
    if (d !== null) {
      ((m = d.next), (a = a.baseState));
      var T = (k = null),
        D = null,
        ee = m;
      do {
        var fe = ee.lane;
        if ((cr & fe) === fe)
          (D !== null &&
            (D = D.next =
              {
                lane: 0,
                action: ee.action,
                hasEagerState: ee.hasEagerState,
                eagerState: ee.eagerState,
                next: null,
              }),
            (a = ee.hasEagerState ? ee.eagerState : t(a, ee.action)));
        else {
          var he = {
            lane: fe,
            action: ee.action,
            hasEagerState: ee.hasEagerState,
            eagerState: ee.eagerState,
            next: null,
          };
          (D === null ? ((T = D = he), (k = a)) : (D = D.next = he),
            (Ye.lanes |= fe),
            (dr |= fe));
        }
        ee = ee.next;
      } while (ee !== null && ee !== m);
      (D === null ? (k = a) : (D.next = T),
        At(a, n.memoizedState) || (mt = !0),
        (n.memoizedState = a),
        (n.baseState = k),
        (n.baseQueue = D),
        (s.lastRenderedState = a));
    }
    if (((t = s.interleaved), t !== null)) {
      d = t;
      do ((m = d.lane), (Ye.lanes |= m), (dr |= m), (d = d.next));
      while (d !== t);
    } else d === null && (s.lanes = 0);
    return [n.memoizedState, s.dispatch];
  }
  function cu(t) {
    var n = Tt(),
      s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var a = s.dispatch,
      d = s.pending,
      m = n.memoizedState;
    if (d !== null) {
      s.pending = null;
      var k = (d = d.next);
      do ((m = t(m, k.action)), (k = k.next));
      while (k !== d);
      (At(m, n.memoizedState) || (mt = !0),
        (n.memoizedState = m),
        n.baseQueue === null && (n.baseState = m),
        (s.lastRenderedState = m));
    }
    return [m, a];
  }
  function xf() {}
  function wf(t, n) {
    var s = Ye,
      a = Tt(),
      d = n(),
      m = !At(a.memoizedState, d);
    if (
      (m && ((a.memoizedState = d), (mt = !0)),
      (a = a.queue),
      du(kf.bind(null, s, a, t), [t]),
      a.getSnapshot !== n || m || (et !== null && et.memoizedState.tag & 1))
    ) {
      if (
        ((s.flags |= 2048),
        ns(9, Ef.bind(null, s, a, d, n), void 0, null),
        tt === null)
      )
        throw Error(o(349));
      (cr & 30) !== 0 || Sf(s, n, d);
    }
    return d;
  }
  function Sf(t, n, s) {
    ((t.flags |= 16384),
      (t = { getSnapshot: n, value: s }),
      (n = Ye.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }),
          (Ye.updateQueue = n),
          (n.stores = [t]))
        : ((s = n.stores), s === null ? (n.stores = [t]) : s.push(t)));
  }
  function Ef(t, n, s, a) {
    ((n.value = s), (n.getSnapshot = a), Cf(n) && Nf(t));
  }
  function kf(t, n, s) {
    return s(function () {
      Cf(n) && Nf(t);
    });
  }
  function Cf(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var s = n();
      return !At(t, s);
    } catch {
      return !0;
    }
  }
  function Nf(t) {
    var n = pn(t, 1);
    n !== null && Bt(n, t, 1, -1);
  }
  function _f(t) {
    var n = Zt();
    return (
      typeof t == "function" && (t = t()),
      (n.memoizedState = n.baseState = t),
      (t = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ts,
        lastRenderedState: t,
      }),
      (n.queue = t),
      (t = t.dispatch = jy.bind(null, Ye, t)),
      [n.memoizedState, t]
    );
  }
  function ns(t, n, s, a) {
    return (
      (t = { tag: t, create: n, destroy: s, deps: a, next: null }),
      (n = Ye.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }),
          (Ye.updateQueue = n),
          (n.lastEffect = t.next = t))
        : ((s = n.lastEffect),
          s === null
            ? (n.lastEffect = t.next = t)
            : ((a = s.next), (s.next = t), (t.next = a), (n.lastEffect = t))),
      t
    );
  }
  function bf() {
    return Tt().memoizedState;
  }
  function zi(t, n, s, a) {
    var d = Zt();
    ((Ye.flags |= t),
      (d.memoizedState = ns(1 | n, s, void 0, a === void 0 ? null : a)));
  }
  function $i(t, n, s, a) {
    var d = Tt();
    a = a === void 0 ? null : a;
    var m = void 0;
    if (qe !== null) {
      var k = qe.memoizedState;
      if (((m = k.destroy), a !== null && iu(a, k.deps))) {
        d.memoizedState = ns(n, s, m, a);
        return;
      }
    }
    ((Ye.flags |= t), (d.memoizedState = ns(1 | n, s, m, a)));
  }
  function jf(t, n) {
    return zi(8390656, 8, t, n);
  }
  function du(t, n) {
    return $i(2048, 8, t, n);
  }
  function If(t, n) {
    return $i(4, 2, t, n);
  }
  function Mf(t, n) {
    return $i(4, 4, t, n);
  }
  function Pf(t, n) {
    if (typeof n == "function")
      return (
        (t = t()),
        n(t),
        function () {
          n(null);
        }
      );
    if (n != null)
      return (
        (t = t()),
        (n.current = t),
        function () {
          n.current = null;
        }
      );
  }
  function Rf(t, n, s) {
    return (
      (s = s != null ? s.concat([t]) : null),
      $i(4, 4, Pf.bind(null, n, t), s)
    );
  }
  function fu() {}
  function Tf(t, n) {
    var s = Tt();
    n = n === void 0 ? null : n;
    var a = s.memoizedState;
    return a !== null && n !== null && iu(n, a[1])
      ? a[0]
      : ((s.memoizedState = [t, n]), t);
  }
  function Lf(t, n) {
    var s = Tt();
    n = n === void 0 ? null : n;
    var a = s.memoizedState;
    return a !== null && n !== null && iu(n, a[1])
      ? a[0]
      : ((t = t()), (s.memoizedState = [t, n]), t);
  }
  function zf(t, n, s) {
    return (cr & 21) === 0
      ? (t.baseState && ((t.baseState = !1), (mt = !0)), (t.memoizedState = s))
      : (At(s, n) ||
          ((s = Pr()), (Ye.lanes |= s), (dr |= s), (t.baseState = !0)),
        n);
  }
  function _y(t, n) {
    var s = $e;
    (($e = s !== 0 && 4 > s ? s : 4), t(!0));
    var a = su.transition;
    su.transition = {};
    try {
      (t(!1), n());
    } finally {
      (($e = s), (su.transition = a));
    }
  }
  function $f() {
    return Tt().memoizedState;
  }
  function by(t, n, s) {
    var a = Hn(t);
    if (
      ((s = {
        lane: a,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Af(t))
    )
      Df(n, s);
    else if (((s = pf(t, n, s, a)), s !== null)) {
      var d = ft();
      (Bt(s, t, a, d), Of(s, n, a));
    }
  }
  function jy(t, n, s) {
    var a = Hn(t),
      d = {
        lane: a,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Af(t)) Df(n, d);
    else {
      var m = t.alternate;
      if (
        t.lanes === 0 &&
        (m === null || m.lanes === 0) &&
        ((m = n.lastRenderedReducer), m !== null)
      )
        try {
          var k = n.lastRenderedState,
            T = m(k, s);
          if (((d.hasEagerState = !0), (d.eagerState = T), At(T, k))) {
            var D = n.interleaved;
            (D === null
              ? ((d.next = d), Ja(n))
              : ((d.next = D.next), (D.next = d)),
              (n.interleaved = d));
            return;
          }
        } catch {
        } finally {
        }
      ((s = pf(t, n, d, a)),
        s !== null && ((d = ft()), Bt(s, t, a, d), Of(s, n, a)));
    }
  }
  function Af(t) {
    var n = t.alternate;
    return t === Ye || (n !== null && n === Ye);
  }
  function Df(t, n) {
    Jo = Li = !0;
    var s = t.pending;
    (s === null ? (n.next = n) : ((n.next = s.next), (s.next = n)),
      (t.pending = n));
  }
  function Of(t, n, s) {
    if ((s & 4194240) !== 0) {
      var a = n.lanes;
      ((a &= t.pendingLanes), (s |= a), (n.lanes = s), pa(t, s));
    }
  }
  var Ai = {
      readContext: Rt,
      useCallback: lt,
      useContext: lt,
      useEffect: lt,
      useImperativeHandle: lt,
      useInsertionEffect: lt,
      useLayoutEffect: lt,
      useMemo: lt,
      useReducer: lt,
      useRef: lt,
      useState: lt,
      useDebugValue: lt,
      useDeferredValue: lt,
      useTransition: lt,
      useMutableSource: lt,
      useSyncExternalStore: lt,
      useId: lt,
      unstable_isNewReconciler: !1,
    },
    Iy = {
      readContext: Rt,
      useCallback: function (t, n) {
        return ((Zt().memoizedState = [t, n === void 0 ? null : n]), t);
      },
      useContext: Rt,
      useEffect: jf,
      useImperativeHandle: function (t, n, s) {
        return (
          (s = s != null ? s.concat([t]) : null),
          zi(4194308, 4, Pf.bind(null, n, t), s)
        );
      },
      useLayoutEffect: function (t, n) {
        return zi(4194308, 4, t, n);
      },
      useInsertionEffect: function (t, n) {
        return zi(4, 2, t, n);
      },
      useMemo: function (t, n) {
        var s = Zt();
        return (
          (n = n === void 0 ? null : n),
          (t = t()),
          (s.memoizedState = [t, n]),
          t
        );
      },
      useReducer: function (t, n, s) {
        var a = Zt();
        return (
          (n = s !== void 0 ? s(n) : n),
          (a.memoizedState = a.baseState = n),
          (t = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: n,
          }),
          (a.queue = t),
          (t = t.dispatch = by.bind(null, Ye, t)),
          [a.memoizedState, t]
        );
      },
      useRef: function (t) {
        var n = Zt();
        return ((t = { current: t }), (n.memoizedState = t));
      },
      useState: _f,
      useDebugValue: fu,
      useDeferredValue: function (t) {
        return (Zt().memoizedState = t);
      },
      useTransition: function () {
        var t = _f(!1),
          n = t[0];
        return ((t = _y.bind(null, t[1])), (Zt().memoizedState = t), [n, t]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (t, n, s) {
        var a = Ye,
          d = Zt();
        if (Fe) {
          if (s === void 0) throw Error(o(407));
          s = s();
        } else {
          if (((s = n()), tt === null)) throw Error(o(349));
          (cr & 30) !== 0 || Sf(a, n, s);
        }
        d.memoizedState = s;
        var m = { value: s, getSnapshot: n };
        return (
          (d.queue = m),
          jf(kf.bind(null, a, m, t), [t]),
          (a.flags |= 2048),
          ns(9, Ef.bind(null, a, m, s, n), void 0, null),
          s
        );
      },
      useId: function () {
        var t = Zt(),
          n = tt.identifierPrefix;
        if (Fe) {
          var s = hn,
            a = fn;
          ((s = (a & ~(1 << (32 - wt(a) - 1))).toString(32) + s),
            (n = ":" + n + "R" + s),
            (s = es++),
            0 < s && (n += "H" + s.toString(32)),
            (n += ":"));
        } else ((s = Ny++), (n = ":" + n + "r" + s.toString(32) + ":"));
        return (t.memoizedState = n);
      },
      unstable_isNewReconciler: !1,
    },
    My = {
      readContext: Rt,
      useCallback: Tf,
      useContext: Rt,
      useEffect: du,
      useImperativeHandle: Rf,
      useInsertionEffect: If,
      useLayoutEffect: Mf,
      useMemo: Lf,
      useReducer: uu,
      useRef: bf,
      useState: function () {
        return uu(ts);
      },
      useDebugValue: fu,
      useDeferredValue: function (t) {
        var n = Tt();
        return zf(n, qe.memoizedState, t);
      },
      useTransition: function () {
        var t = uu(ts)[0],
          n = Tt().memoizedState;
        return [t, n];
      },
      useMutableSource: xf,
      useSyncExternalStore: wf,
      useId: $f,
      unstable_isNewReconciler: !1,
    },
    Py = {
      readContext: Rt,
      useCallback: Tf,
      useContext: Rt,
      useEffect: du,
      useImperativeHandle: Rf,
      useInsertionEffect: If,
      useLayoutEffect: Mf,
      useMemo: Lf,
      useReducer: cu,
      useRef: bf,
      useState: function () {
        return cu(ts);
      },
      useDebugValue: fu,
      useDeferredValue: function (t) {
        var n = Tt();
        return qe === null ? (n.memoizedState = t) : zf(n, qe.memoizedState, t);
      },
      useTransition: function () {
        var t = cu(ts)[0],
          n = Tt().memoizedState;
        return [t, n];
      },
      useMutableSource: xf,
      useSyncExternalStore: wf,
      useId: $f,
      unstable_isNewReconciler: !1,
    };
  function Ot(t, n) {
    if (t && t.defaultProps) {
      ((n = W({}, n)), (t = t.defaultProps));
      for (var s in t) n[s] === void 0 && (n[s] = t[s]);
      return n;
    }
    return n;
  }
  function hu(t, n, s, a) {
    ((n = t.memoizedState),
      (s = s(a, n)),
      (s = s == null ? n : W({}, n, s)),
      (t.memoizedState = s),
      t.lanes === 0 && (t.updateQueue.baseState = s));
  }
  var Di = {
    isMounted: function (t) {
      return (t = t._reactInternals) ? Kt(t) === t : !1;
    },
    enqueueSetState: function (t, n, s) {
      t = t._reactInternals;
      var a = ft(),
        d = Hn(t),
        m = mn(a, d);
      ((m.payload = n),
        s != null && (m.callback = s),
        (n = An(t, m, d)),
        n !== null && (Bt(n, t, d, a), Mi(n, t, d)));
    },
    enqueueReplaceState: function (t, n, s) {
      t = t._reactInternals;
      var a = ft(),
        d = Hn(t),
        m = mn(a, d);
      ((m.tag = 1),
        (m.payload = n),
        s != null && (m.callback = s),
        (n = An(t, m, d)),
        n !== null && (Bt(n, t, d, a), Mi(n, t, d)));
    },
    enqueueForceUpdate: function (t, n) {
      t = t._reactInternals;
      var s = ft(),
        a = Hn(t),
        d = mn(s, a);
      ((d.tag = 2),
        n != null && (d.callback = n),
        (n = An(t, d, a)),
        n !== null && (Bt(n, t, a, s), Mi(n, t, a)));
    },
  };
  function Ff(t, n, s, a, d, m, k) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(a, m, k)
        : n.prototype && n.prototype.isPureReactComponent
          ? !Bo(s, a) || !Bo(d, m)
          : !0
    );
  }
  function Hf(t, n, s) {
    var a = !1,
      d = Ln,
      m = n.contextType;
    return (
      typeof m == "object" && m !== null
        ? (m = Rt(m))
        : ((d = pt(n) ? sr : it.current),
          (a = n.contextTypes),
          (m = (a = a != null) ? Hr(t, d) : Ln)),
      (n = new n(s, m)),
      (t.memoizedState =
        n.state !== null && n.state !== void 0 ? n.state : null),
      (n.updater = Di),
      (t.stateNode = n),
      (n._reactInternals = t),
      a &&
        ((t = t.stateNode),
        (t.__reactInternalMemoizedUnmaskedChildContext = d),
        (t.__reactInternalMemoizedMaskedChildContext = m)),
      n
    );
  }
  function Bf(t, n, s, a) {
    ((t = n.state),
      typeof n.componentWillReceiveProps == "function" &&
        n.componentWillReceiveProps(s, a),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(s, a),
      n.state !== t && Di.enqueueReplaceState(n, n.state, null));
  }
  function pu(t, n, s, a) {
    var d = t.stateNode;
    ((d.props = s), (d.state = t.memoizedState), (d.refs = {}), eu(t));
    var m = n.contextType;
    (typeof m == "object" && m !== null
      ? (d.context = Rt(m))
      : ((m = pt(n) ? sr : it.current), (d.context = Hr(t, m))),
      (d.state = t.memoizedState),
      (m = n.getDerivedStateFromProps),
      typeof m == "function" && (hu(t, n, m, s), (d.state = t.memoizedState)),
      typeof n.getDerivedStateFromProps == "function" ||
        typeof d.getSnapshotBeforeUpdate == "function" ||
        (typeof d.UNSAFE_componentWillMount != "function" &&
          typeof d.componentWillMount != "function") ||
        ((n = d.state),
        typeof d.componentWillMount == "function" && d.componentWillMount(),
        typeof d.UNSAFE_componentWillMount == "function" &&
          d.UNSAFE_componentWillMount(),
        n !== d.state && Di.enqueueReplaceState(d, d.state, null),
        Pi(t, s, d, a),
        (d.state = t.memoizedState)),
      typeof d.componentDidMount == "function" && (t.flags |= 4194308));
  }
  function Qr(t, n) {
    try {
      var s = "",
        a = n;
      do ((s += Z(a)), (a = a.return));
      while (a);
      var d = s;
    } catch (m) {
      d =
        `
Error generating stack: ` +
        m.message +
        `
` +
        m.stack;
    }
    return { value: t, source: n, stack: d, digest: null };
  }
  function mu(t, n, s) {
    return { value: t, source: null, stack: s ?? null, digest: n ?? null };
  }
  function gu(t, n) {
    try {
      console.error(n.value);
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  var Ry = typeof WeakMap == "function" ? WeakMap : Map;
  function Vf(t, n, s) {
    ((s = mn(-1, s)), (s.tag = 3), (s.payload = { element: null }));
    var a = n.value;
    return (
      (s.callback = function () {
        (Ui || ((Ui = !0), (Pu = a)), gu(t, n));
      }),
      s
    );
  }
  function Wf(t, n, s) {
    ((s = mn(-1, s)), (s.tag = 3));
    var a = t.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var d = n.value;
      ((s.payload = function () {
        return a(d);
      }),
        (s.callback = function () {
          gu(t, n);
        }));
    }
    var m = t.stateNode;
    return (
      m !== null &&
        typeof m.componentDidCatch == "function" &&
        (s.callback = function () {
          (gu(t, n),
            typeof a != "function" &&
              (On === null ? (On = new Set([this])) : On.add(this)));
          var k = n.stack;
          this.componentDidCatch(n.value, {
            componentStack: k !== null ? k : "",
          });
        }),
      s
    );
  }
  function Uf(t, n, s) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Ry();
      var d = new Set();
      a.set(n, d);
    } else ((d = a.get(n)), d === void 0 && ((d = new Set()), a.set(n, d)));
    d.has(s) || (d.add(s), (t = Yy.bind(null, t, n, s)), n.then(t, t));
  }
  function Yf(t) {
    do {
      var n;
      if (
        ((n = t.tag === 13) &&
          ((n = t.memoizedState),
          (n = n !== null ? n.dehydrated !== null : !0)),
        n)
      )
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function Xf(t, n, s, a, d) {
    return (t.mode & 1) === 0
      ? (t === n
          ? (t.flags |= 65536)
          : ((t.flags |= 128),
            (s.flags |= 131072),
            (s.flags &= -52805),
            s.tag === 1 &&
              (s.alternate === null
                ? (s.tag = 17)
                : ((n = mn(-1, 1)), (n.tag = 2), An(s, n, 1))),
            (s.lanes |= 1)),
        t)
      : ((t.flags |= 65536), (t.lanes = d), t);
  }
  var Ty = j.ReactCurrentOwner,
    mt = !1;
  function dt(t, n, s, a) {
    n.child = t === null ? hf(n, null, s, a) : Ur(n, t.child, s, a);
  }
  function Kf(t, n, s, a, d) {
    s = s.render;
    var m = n.ref;
    return (
      Xr(n, d),
      (a = lu(t, n, s, a, m, d)),
      (s = au()),
      t !== null && !mt
        ? ((n.updateQueue = t.updateQueue),
          (n.flags &= -2053),
          (t.lanes &= ~d),
          gn(t, n, d))
        : (Fe && s && Wa(n), (n.flags |= 1), dt(t, n, a, d), n.child)
    );
  }
  function Qf(t, n, s, a, d) {
    if (t === null) {
      var m = s.type;
      return typeof m == "function" &&
        !Du(m) &&
        m.defaultProps === void 0 &&
        s.compare === null &&
        s.defaultProps === void 0
        ? ((n.tag = 15), (n.type = m), Gf(t, n, m, a, d))
        : ((t = qi(s.type, null, a, n, n.mode, d)),
          (t.ref = n.ref),
          (t.return = n),
          (n.child = t));
    }
    if (((m = t.child), (t.lanes & d) === 0)) {
      var k = m.memoizedProps;
      if (
        ((s = s.compare), (s = s !== null ? s : Bo), s(k, a) && t.ref === n.ref)
      )
        return gn(t, n, d);
    }
    return (
      (n.flags |= 1),
      (t = Vn(m, a)),
      (t.ref = n.ref),
      (t.return = n),
      (n.child = t)
    );
  }
  function Gf(t, n, s, a, d) {
    if (t !== null) {
      var m = t.memoizedProps;
      if (Bo(m, a) && t.ref === n.ref)
        if (((mt = !1), (n.pendingProps = a = m), (t.lanes & d) !== 0))
          (t.flags & 131072) !== 0 && (mt = !0);
        else return ((n.lanes = t.lanes), gn(t, n, d));
    }
    return yu(t, n, s, a, d);
  }
  function qf(t, n, s) {
    var a = n.pendingProps,
      d = a.children,
      m = t !== null ? t.memoizedState : null;
    if (a.mode === "hidden")
      if ((n.mode & 1) === 0)
        ((n.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          Ae(qr, Ct),
          (Ct |= s));
      else {
        if ((s & 1073741824) === 0)
          return (
            (t = m !== null ? m.baseLanes | s : s),
            (n.lanes = n.childLanes = 1073741824),
            (n.memoizedState = {
              baseLanes: t,
              cachePool: null,
              transitions: null,
            }),
            (n.updateQueue = null),
            Ae(qr, Ct),
            (Ct |= t),
            null
          );
        ((n.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (a = m !== null ? m.baseLanes : s),
          Ae(qr, Ct),
          (Ct |= a));
      }
    else
      (m !== null ? ((a = m.baseLanes | s), (n.memoizedState = null)) : (a = s),
        Ae(qr, Ct),
        (Ct |= a));
    return (dt(t, n, d, s), n.child);
  }
  function Zf(t, n) {
    var s = n.ref;
    ((t === null && s !== null) || (t !== null && t.ref !== s)) &&
      ((n.flags |= 512), (n.flags |= 2097152));
  }
  function yu(t, n, s, a, d) {
    var m = pt(s) ? sr : it.current;
    return (
      (m = Hr(n, m)),
      Xr(n, d),
      (s = lu(t, n, s, a, m, d)),
      (a = au()),
      t !== null && !mt
        ? ((n.updateQueue = t.updateQueue),
          (n.flags &= -2053),
          (t.lanes &= ~d),
          gn(t, n, d))
        : (Fe && a && Wa(n), (n.flags |= 1), dt(t, n, s, d), n.child)
    );
  }
  function Jf(t, n, s, a, d) {
    if (pt(s)) {
      var m = !0;
      Ei(n);
    } else m = !1;
    if ((Xr(n, d), n.stateNode === null))
      (Fi(t, n), Hf(n, s, a), pu(n, s, a, d), (a = !0));
    else if (t === null) {
      var k = n.stateNode,
        T = n.memoizedProps;
      k.props = T;
      var D = k.context,
        ee = s.contextType;
      typeof ee == "object" && ee !== null
        ? (ee = Rt(ee))
        : ((ee = pt(s) ? sr : it.current), (ee = Hr(n, ee)));
      var fe = s.getDerivedStateFromProps,
        he =
          typeof fe == "function" ||
          typeof k.getSnapshotBeforeUpdate == "function";
      (he ||
        (typeof k.UNSAFE_componentWillReceiveProps != "function" &&
          typeof k.componentWillReceiveProps != "function") ||
        ((T !== a || D !== ee) && Bf(n, k, a, ee)),
        ($n = !1));
      var ce = n.memoizedState;
      ((k.state = ce),
        Pi(n, a, k, d),
        (D = n.memoizedState),
        T !== a || ce !== D || ht.current || $n
          ? (typeof fe == "function" &&
              (hu(n, s, fe, a), (D = n.memoizedState)),
            (T = $n || Ff(n, s, T, a, ce, D, ee))
              ? (he ||
                  (typeof k.UNSAFE_componentWillMount != "function" &&
                    typeof k.componentWillMount != "function") ||
                  (typeof k.componentWillMount == "function" &&
                    k.componentWillMount(),
                  typeof k.UNSAFE_componentWillMount == "function" &&
                    k.UNSAFE_componentWillMount()),
                typeof k.componentDidMount == "function" &&
                  (n.flags |= 4194308))
              : (typeof k.componentDidMount == "function" &&
                  (n.flags |= 4194308),
                (n.memoizedProps = a),
                (n.memoizedState = D)),
            (k.props = a),
            (k.state = D),
            (k.context = ee),
            (a = T))
          : (typeof k.componentDidMount == "function" && (n.flags |= 4194308),
            (a = !1)));
    } else {
      ((k = n.stateNode),
        mf(t, n),
        (T = n.memoizedProps),
        (ee = n.type === n.elementType ? T : Ot(n.type, T)),
        (k.props = ee),
        (he = n.pendingProps),
        (ce = k.context),
        (D = s.contextType),
        typeof D == "object" && D !== null
          ? (D = Rt(D))
          : ((D = pt(s) ? sr : it.current), (D = Hr(n, D))));
      var ye = s.getDerivedStateFromProps;
      ((fe =
        typeof ye == "function" ||
        typeof k.getSnapshotBeforeUpdate == "function") ||
        (typeof k.UNSAFE_componentWillReceiveProps != "function" &&
          typeof k.componentWillReceiveProps != "function") ||
        ((T !== he || ce !== D) && Bf(n, k, a, D)),
        ($n = !1),
        (ce = n.memoizedState),
        (k.state = ce),
        Pi(n, a, k, d));
      var xe = n.memoizedState;
      T !== he || ce !== xe || ht.current || $n
        ? (typeof ye == "function" && (hu(n, s, ye, a), (xe = n.memoizedState)),
          (ee = $n || Ff(n, s, ee, a, ce, xe, D) || !1)
            ? (fe ||
                (typeof k.UNSAFE_componentWillUpdate != "function" &&
                  typeof k.componentWillUpdate != "function") ||
                (typeof k.componentWillUpdate == "function" &&
                  k.componentWillUpdate(a, xe, D),
                typeof k.UNSAFE_componentWillUpdate == "function" &&
                  k.UNSAFE_componentWillUpdate(a, xe, D)),
              typeof k.componentDidUpdate == "function" && (n.flags |= 4),
              typeof k.getSnapshotBeforeUpdate == "function" &&
                (n.flags |= 1024))
            : (typeof k.componentDidUpdate != "function" ||
                (T === t.memoizedProps && ce === t.memoizedState) ||
                (n.flags |= 4),
              typeof k.getSnapshotBeforeUpdate != "function" ||
                (T === t.memoizedProps && ce === t.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = a),
              (n.memoizedState = xe)),
          (k.props = a),
          (k.state = xe),
          (k.context = D),
          (a = ee))
        : (typeof k.componentDidUpdate != "function" ||
            (T === t.memoizedProps && ce === t.memoizedState) ||
            (n.flags |= 4),
          typeof k.getSnapshotBeforeUpdate != "function" ||
            (T === t.memoizedProps && ce === t.memoizedState) ||
            (n.flags |= 1024),
          (a = !1));
    }
    return vu(t, n, s, a, m, d);
  }
  function vu(t, n, s, a, d, m) {
    Zf(t, n);
    var k = (n.flags & 128) !== 0;
    if (!a && !k) return (d && rf(n, s, !1), gn(t, n, m));
    ((a = n.stateNode), (Ty.current = n));
    var T =
      k && typeof s.getDerivedStateFromError != "function" ? null : a.render();
    return (
      (n.flags |= 1),
      t !== null && k
        ? ((n.child = Ur(n, t.child, null, m)), (n.child = Ur(n, null, T, m)))
        : dt(t, n, T, m),
      (n.memoizedState = a.state),
      d && rf(n, s, !0),
      n.child
    );
  }
  function eh(t) {
    var n = t.stateNode;
    (n.pendingContext
      ? tf(t, n.pendingContext, n.pendingContext !== n.context)
      : n.context && tf(t, n.context, !1),
      tu(t, n.containerInfo));
  }
  function th(t, n, s, a, d) {
    return (Wr(), Ka(d), (n.flags |= 256), dt(t, n, s, a), n.child);
  }
  var xu = { dehydrated: null, treeContext: null, retryLane: 0 };
  function wu(t) {
    return { baseLanes: t, cachePool: null, transitions: null };
  }
  function nh(t, n, s) {
    var a = n.pendingProps,
      d = Ue.current,
      m = !1,
      k = (n.flags & 128) !== 0,
      T;
    if (
      ((T = k) ||
        (T = t !== null && t.memoizedState === null ? !1 : (d & 2) !== 0),
      T
        ? ((m = !0), (n.flags &= -129))
        : (t === null || t.memoizedState !== null) && (d |= 1),
      Ae(Ue, d & 1),
      t === null)
    )
      return (
        Xa(n),
        (t = n.memoizedState),
        t !== null && ((t = t.dehydrated), t !== null)
          ? ((n.mode & 1) === 0
              ? (n.lanes = 1)
              : t.data === "$!"
                ? (n.lanes = 8)
                : (n.lanes = 1073741824),
            null)
          : ((k = a.children),
            (t = a.fallback),
            m
              ? ((a = n.mode),
                (m = n.child),
                (k = { mode: "hidden", children: k }),
                (a & 1) === 0 && m !== null
                  ? ((m.childLanes = 0), (m.pendingProps = k))
                  : (m = Zi(k, a, 0, null)),
                (t = mr(t, a, s, null)),
                (m.return = n),
                (t.return = n),
                (m.sibling = t),
                (n.child = m),
                (n.child.memoizedState = wu(s)),
                (n.memoizedState = xu),
                t)
              : Su(n, k))
      );
    if (((d = t.memoizedState), d !== null && ((T = d.dehydrated), T !== null)))
      return Ly(t, n, k, a, T, d, s);
    if (m) {
      ((m = a.fallback), (k = n.mode), (d = t.child), (T = d.sibling));
      var D = { mode: "hidden", children: a.children };
      return (
        (k & 1) === 0 && n.child !== d
          ? ((a = n.child),
            (a.childLanes = 0),
            (a.pendingProps = D),
            (n.deletions = null))
          : ((a = Vn(d, D)), (a.subtreeFlags = d.subtreeFlags & 14680064)),
        T !== null ? (m = Vn(T, m)) : ((m = mr(m, k, s, null)), (m.flags |= 2)),
        (m.return = n),
        (a.return = n),
        (a.sibling = m),
        (n.child = a),
        (a = m),
        (m = n.child),
        (k = t.child.memoizedState),
        (k =
          k === null
            ? wu(s)
            : {
                baseLanes: k.baseLanes | s,
                cachePool: null,
                transitions: k.transitions,
              }),
        (m.memoizedState = k),
        (m.childLanes = t.childLanes & ~s),
        (n.memoizedState = xu),
        a
      );
    }
    return (
      (m = t.child),
      (t = m.sibling),
      (a = Vn(m, { mode: "visible", children: a.children })),
      (n.mode & 1) === 0 && (a.lanes = s),
      (a.return = n),
      (a.sibling = null),
      t !== null &&
        ((s = n.deletions),
        s === null ? ((n.deletions = [t]), (n.flags |= 16)) : s.push(t)),
      (n.child = a),
      (n.memoizedState = null),
      a
    );
  }
  function Su(t, n) {
    return (
      (n = Zi({ mode: "visible", children: n }, t.mode, 0, null)),
      (n.return = t),
      (t.child = n)
    );
  }
  function Oi(t, n, s, a) {
    return (
      a !== null && Ka(a),
      Ur(n, t.child, null, s),
      (t = Su(n, n.pendingProps.children)),
      (t.flags |= 2),
      (n.memoizedState = null),
      t
    );
  }
  function Ly(t, n, s, a, d, m, k) {
    if (s)
      return n.flags & 256
        ? ((n.flags &= -257), (a = mu(Error(o(422)))), Oi(t, n, k, a))
        : n.memoizedState !== null
          ? ((n.child = t.child), (n.flags |= 128), null)
          : ((m = a.fallback),
            (d = n.mode),
            (a = Zi({ mode: "visible", children: a.children }, d, 0, null)),
            (m = mr(m, d, k, null)),
            (m.flags |= 2),
            (a.return = n),
            (m.return = n),
            (a.sibling = m),
            (n.child = a),
            (n.mode & 1) !== 0 && Ur(n, t.child, null, k),
            (n.child.memoizedState = wu(k)),
            (n.memoizedState = xu),
            m);
    if ((n.mode & 1) === 0) return Oi(t, n, k, null);
    if (d.data === "$!") {
      if (((a = d.nextSibling && d.nextSibling.dataset), a)) var T = a.dgst;
      return (
        (a = T),
        (m = Error(o(419))),
        (a = mu(m, a, void 0)),
        Oi(t, n, k, a)
      );
    }
    if (((T = (k & t.childLanes) !== 0), mt || T)) {
      if (((a = tt), a !== null)) {
        switch (k & -k) {
          case 4:
            d = 2;
            break;
          case 16:
            d = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            d = 32;
            break;
          case 536870912:
            d = 268435456;
            break;
          default:
            d = 0;
        }
        ((d = (d & (a.suspendedLanes | k)) !== 0 ? 0 : d),
          d !== 0 &&
            d !== m.retryLane &&
            ((m.retryLane = d), pn(t, d), Bt(a, t, d, -1)));
      }
      return (Au(), (a = mu(Error(o(421)))), Oi(t, n, k, a));
    }
    return d.data === "$?"
      ? ((n.flags |= 128),
        (n.child = t.child),
        (n = Xy.bind(null, t)),
        (d._reactRetry = n),
        null)
      : ((t = m.treeContext),
        (kt = Rn(d.nextSibling)),
        (Et = n),
        (Fe = !0),
        (Dt = null),
        t !== null &&
          ((Mt[Pt++] = fn),
          (Mt[Pt++] = hn),
          (Mt[Pt++] = ir),
          (fn = t.id),
          (hn = t.overflow),
          (ir = n)),
        (n = Su(n, a.children)),
        (n.flags |= 4096),
        n);
  }
  function rh(t, n, s) {
    t.lanes |= n;
    var a = t.alternate;
    (a !== null && (a.lanes |= n), Za(t.return, n, s));
  }
  function Eu(t, n, s, a, d) {
    var m = t.memoizedState;
    m === null
      ? (t.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: s,
          tailMode: d,
        })
      : ((m.isBackwards = n),
        (m.rendering = null),
        (m.renderingStartTime = 0),
        (m.last = a),
        (m.tail = s),
        (m.tailMode = d));
  }
  function oh(t, n, s) {
    var a = n.pendingProps,
      d = a.revealOrder,
      m = a.tail;
    if ((dt(t, n, a.children, s), (a = Ue.current), (a & 2) !== 0))
      ((a = (a & 1) | 2), (n.flags |= 128));
    else {
      if (t !== null && (t.flags & 128) !== 0)
        e: for (t = n.child; t !== null; ) {
          if (t.tag === 13) t.memoizedState !== null && rh(t, s, n);
          else if (t.tag === 19) rh(t, s, n);
          else if (t.child !== null) {
            ((t.child.return = t), (t = t.child));
            continue;
          }
          if (t === n) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === n) break e;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      a &= 1;
    }
    if ((Ae(Ue, a), (n.mode & 1) === 0)) n.memoizedState = null;
    else
      switch (d) {
        case "forwards":
          for (s = n.child, d = null; s !== null; )
            ((t = s.alternate),
              t !== null && Ri(t) === null && (d = s),
              (s = s.sibling));
          ((s = d),
            s === null
              ? ((d = n.child), (n.child = null))
              : ((d = s.sibling), (s.sibling = null)),
            Eu(n, !1, d, s, m));
          break;
        case "backwards":
          for (s = null, d = n.child, n.child = null; d !== null; ) {
            if (((t = d.alternate), t !== null && Ri(t) === null)) {
              n.child = d;
              break;
            }
            ((t = d.sibling), (d.sibling = s), (s = d), (d = t));
          }
          Eu(n, !0, s, null, m);
          break;
        case "together":
          Eu(n, !1, null, null, void 0);
          break;
        default:
          n.memoizedState = null;
      }
    return n.child;
  }
  function Fi(t, n) {
    (n.mode & 1) === 0 &&
      t !== null &&
      ((t.alternate = null), (n.alternate = null), (n.flags |= 2));
  }
  function gn(t, n, s) {
    if (
      (t !== null && (n.dependencies = t.dependencies),
      (dr |= n.lanes),
      (s & n.childLanes) === 0)
    )
      return null;
    if (t !== null && n.child !== t.child) throw Error(o(153));
    if (n.child !== null) {
      for (
        t = n.child, s = Vn(t, t.pendingProps), n.child = s, s.return = n;
        t.sibling !== null;
      )
        ((t = t.sibling),
          (s = s.sibling = Vn(t, t.pendingProps)),
          (s.return = n));
      s.sibling = null;
    }
    return n.child;
  }
  function zy(t, n, s) {
    switch (n.tag) {
      case 3:
        (eh(n), Wr());
        break;
      case 5:
        vf(n);
        break;
      case 1:
        pt(n.type) && Ei(n);
        break;
      case 4:
        tu(n, n.stateNode.containerInfo);
        break;
      case 10:
        var a = n.type._context,
          d = n.memoizedProps.value;
        (Ae(ji, a._currentValue), (a._currentValue = d));
        break;
      case 13:
        if (((a = n.memoizedState), a !== null))
          return a.dehydrated !== null
            ? (Ae(Ue, Ue.current & 1), (n.flags |= 128), null)
            : (s & n.child.childLanes) !== 0
              ? nh(t, n, s)
              : (Ae(Ue, Ue.current & 1),
                (t = gn(t, n, s)),
                t !== null ? t.sibling : null);
        Ae(Ue, Ue.current & 1);
        break;
      case 19:
        if (((a = (s & n.childLanes) !== 0), (t.flags & 128) !== 0)) {
          if (a) return oh(t, n, s);
          n.flags |= 128;
        }
        if (
          ((d = n.memoizedState),
          d !== null &&
            ((d.rendering = null), (d.tail = null), (d.lastEffect = null)),
          Ae(Ue, Ue.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((n.lanes = 0), qf(t, n, s));
    }
    return gn(t, n, s);
  }
  var sh, ku, ih, lh;
  ((sh = function (t, n) {
    for (var s = n.child; s !== null; ) {
      if (s.tag === 5 || s.tag === 6) t.appendChild(s.stateNode);
      else if (s.tag !== 4 && s.child !== null) {
        ((s.child.return = s), (s = s.child));
        continue;
      }
      if (s === n) break;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === n) return;
        s = s.return;
      }
      ((s.sibling.return = s.return), (s = s.sibling));
    }
  }),
    (ku = function () {}),
    (ih = function (t, n, s, a) {
      var d = t.memoizedProps;
      if (d !== a) {
        ((t = n.stateNode), ur(qt.current));
        var m = null;
        switch (s) {
          case "input":
            ((d = ge(t, d)), (a = ge(t, a)), (m = []));
            break;
          case "select":
            ((d = W({}, d, { value: void 0 })),
              (a = W({}, a, { value: void 0 })),
              (m = []));
            break;
          case "textarea":
            ((d = Je(t, d)), (a = Je(t, a)), (m = []));
            break;
          default:
            typeof d.onClick != "function" &&
              typeof a.onClick == "function" &&
              (t.onclick = xi);
        }
        xo(s, a);
        var k;
        s = null;
        for (ee in d)
          if (!a.hasOwnProperty(ee) && d.hasOwnProperty(ee) && d[ee] != null)
            if (ee === "style") {
              var T = d[ee];
              for (k in T) T.hasOwnProperty(k) && (s || (s = {}), (s[k] = ""));
            } else
              ee !== "dangerouslySetInnerHTML" &&
                ee !== "children" &&
                ee !== "suppressContentEditableWarning" &&
                ee !== "suppressHydrationWarning" &&
                ee !== "autoFocus" &&
                (l.hasOwnProperty(ee)
                  ? m || (m = [])
                  : (m = m || []).push(ee, null));
        for (ee in a) {
          var D = a[ee];
          if (
            ((T = d != null ? d[ee] : void 0),
            a.hasOwnProperty(ee) && D !== T && (D != null || T != null))
          )
            if (ee === "style")
              if (T) {
                for (k in T)
                  !T.hasOwnProperty(k) ||
                    (D && D.hasOwnProperty(k)) ||
                    (s || (s = {}), (s[k] = ""));
                for (k in D)
                  D.hasOwnProperty(k) &&
                    T[k] !== D[k] &&
                    (s || (s = {}), (s[k] = D[k]));
              } else (s || (m || (m = []), m.push(ee, s)), (s = D));
            else
              ee === "dangerouslySetInnerHTML"
                ? ((D = D ? D.__html : void 0),
                  (T = T ? T.__html : void 0),
                  D != null && T !== D && (m = m || []).push(ee, D))
                : ee === "children"
                  ? (typeof D != "string" && typeof D != "number") ||
                    (m = m || []).push(ee, "" + D)
                  : ee !== "suppressContentEditableWarning" &&
                    ee !== "suppressHydrationWarning" &&
                    (l.hasOwnProperty(ee)
                      ? (D != null && ee === "onScroll" && De("scroll", t),
                        m || T === D || (m = []))
                      : (m = m || []).push(ee, D));
        }
        s && (m = m || []).push("style", s);
        var ee = m;
        (n.updateQueue = ee) && (n.flags |= 4);
      }
    }),
    (lh = function (t, n, s, a) {
      s !== a && (n.flags |= 4);
    }));
  function rs(t, n) {
    if (!Fe)
      switch (t.tailMode) {
        case "hidden":
          n = t.tail;
          for (var s = null; n !== null; )
            (n.alternate !== null && (s = n), (n = n.sibling));
          s === null ? (t.tail = null) : (s.sibling = null);
          break;
        case "collapsed":
          s = t.tail;
          for (var a = null; s !== null; )
            (s.alternate !== null && (a = s), (s = s.sibling));
          a === null
            ? n || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function at(t) {
    var n = t.alternate !== null && t.alternate.child === t.child,
      s = 0,
      a = 0;
    if (n)
      for (var d = t.child; d !== null; )
        ((s |= d.lanes | d.childLanes),
          (a |= d.subtreeFlags & 14680064),
          (a |= d.flags & 14680064),
          (d.return = t),
          (d = d.sibling));
    else
      for (d = t.child; d !== null; )
        ((s |= d.lanes | d.childLanes),
          (a |= d.subtreeFlags),
          (a |= d.flags),
          (d.return = t),
          (d = d.sibling));
    return ((t.subtreeFlags |= a), (t.childLanes = s), n);
  }
  function $y(t, n, s) {
    var a = n.pendingProps;
    switch ((Ua(n), n.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (at(n), null);
      case 1:
        return (pt(n.type) && Si(), at(n), null);
      case 3:
        return (
          (a = n.stateNode),
          Kr(),
          Oe(ht),
          Oe(it),
          ou(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (_i(n)
              ? (n.flags |= 4)
              : t === null ||
                (t.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), Dt !== null && (Lu(Dt), (Dt = null)))),
          ku(t, n),
          at(n),
          null
        );
      case 5:
        nu(n);
        var d = ur(Zo.current);
        if (((s = n.type), t !== null && n.stateNode != null))
          (ih(t, n, s, a, d),
            t.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152)));
        else {
          if (!a) {
            if (n.stateNode === null) throw Error(o(166));
            return (at(n), null);
          }
          if (((t = ur(qt.current)), _i(n))) {
            ((a = n.stateNode), (s = n.type));
            var m = n.memoizedProps;
            switch (((a[Gt] = n), (a[Xo] = m), (t = (n.mode & 1) !== 0), s)) {
              case "dialog":
                (De("cancel", a), De("close", a));
                break;
              case "iframe":
              case "object":
              case "embed":
                De("load", a);
                break;
              case "video":
              case "audio":
                for (d = 0; d < Wo.length; d++) De(Wo[d], a);
                break;
              case "source":
                De("error", a);
                break;
              case "img":
              case "image":
              case "link":
                (De("error", a), De("load", a));
                break;
              case "details":
                De("toggle", a);
                break;
              case "input":
                (Ce(a, m), De("invalid", a));
                break;
              case "select":
                ((a._wrapperState = { wasMultiple: !!m.multiple }),
                  De("invalid", a));
                break;
              case "textarea":
                (jt(a, m), De("invalid", a));
            }
            (xo(s, m), (d = null));
            for (var k in m)
              if (m.hasOwnProperty(k)) {
                var T = m[k];
                k === "children"
                  ? typeof T == "string"
                    ? a.textContent !== T &&
                      (m.suppressHydrationWarning !== !0 &&
                        vi(a.textContent, T, t),
                      (d = ["children", T]))
                    : typeof T == "number" &&
                      a.textContent !== "" + T &&
                      (m.suppressHydrationWarning !== !0 &&
                        vi(a.textContent, T, t),
                      (d = ["children", "" + T]))
                  : l.hasOwnProperty(k) &&
                    T != null &&
                    k === "onScroll" &&
                    De("scroll", a);
              }
            switch (s) {
              case "input":
                (se(a), Ie(a, m, !0));
                break;
              case "textarea":
                (se(a), Gn(a));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof m.onClick == "function" && (a.onclick = xi);
            }
            ((a = d), (n.updateQueue = a), a !== null && (n.flags |= 4));
          } else {
            ((k = d.nodeType === 9 ? d : d.ownerDocument),
              t === "http://www.w3.org/1999/xhtml" && (t = ln(s)),
              t === "http://www.w3.org/1999/xhtml"
                ? s === "script"
                  ? ((t = k.createElement("div")),
                    (t.innerHTML = "<script><\/script>"),
                    (t = t.removeChild(t.firstChild)))
                  : typeof a.is == "string"
                    ? (t = k.createElement(s, { is: a.is }))
                    : ((t = k.createElement(s)),
                      s === "select" &&
                        ((k = t),
                        a.multiple
                          ? (k.multiple = !0)
                          : a.size && (k.size = a.size)))
                : (t = k.createElementNS(t, s)),
              (t[Gt] = n),
              (t[Xo] = a),
              sh(t, n, !1, !1),
              (n.stateNode = t));
            e: {
              switch (((k = wo(s, a)), s)) {
                case "dialog":
                  (De("cancel", t), De("close", t), (d = a));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (De("load", t), (d = a));
                  break;
                case "video":
                case "audio":
                  for (d = 0; d < Wo.length; d++) De(Wo[d], t);
                  d = a;
                  break;
                case "source":
                  (De("error", t), (d = a));
                  break;
                case "img":
                case "image":
                case "link":
                  (De("error", t), De("load", t), (d = a));
                  break;
                case "details":
                  (De("toggle", t), (d = a));
                  break;
                case "input":
                  (Ce(t, a), (d = ge(t, a)), De("invalid", t));
                  break;
                case "option":
                  d = a;
                  break;
                case "select":
                  ((t._wrapperState = { wasMultiple: !!a.multiple }),
                    (d = W({}, a, { value: void 0 })),
                    De("invalid", t));
                  break;
                case "textarea":
                  (jt(t, a), (d = Je(t, a)), De("invalid", t));
                  break;
                default:
                  d = a;
              }
              (xo(s, d), (T = d));
              for (m in T)
                if (T.hasOwnProperty(m)) {
                  var D = T[m];
                  m === "style"
                    ? Vs(t, D)
                    : m === "dangerouslySetInnerHTML"
                      ? ((D = D ? D.__html : void 0), D != null && Hs(t, D))
                      : m === "children"
                        ? typeof D == "string"
                          ? (s !== "textarea" || D !== "") && un(t, D)
                          : typeof D == "number" && un(t, "" + D)
                        : m !== "suppressContentEditableWarning" &&
                          m !== "suppressHydrationWarning" &&
                          m !== "autoFocus" &&
                          (l.hasOwnProperty(m)
                            ? D != null && m === "onScroll" && De("scroll", t)
                            : D != null && E(t, m, D, k));
                }
              switch (s) {
                case "input":
                  (se(t), Ie(t, a, !1));
                  break;
                case "textarea":
                  (se(t), Gn(t));
                  break;
                case "option":
                  a.value != null && t.setAttribute("value", "" + J(a.value));
                  break;
                case "select":
                  ((t.multiple = !!a.multiple),
                    (m = a.value),
                    m != null
                      ? Re(t, !!a.multiple, m, !1)
                      : a.defaultValue != null &&
                        Re(t, !!a.multiple, a.defaultValue, !0));
                  break;
                default:
                  typeof d.onClick == "function" && (t.onclick = xi);
              }
              switch (s) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a = !!a.autoFocus;
                  break e;
                case "img":
                  a = !0;
                  break e;
                default:
                  a = !1;
              }
            }
            a && (n.flags |= 4);
          }
          n.ref !== null && ((n.flags |= 512), (n.flags |= 2097152));
        }
        return (at(n), null);
      case 6:
        if (t && n.stateNode != null) lh(t, n, t.memoizedProps, a);
        else {
          if (typeof a != "string" && n.stateNode === null) throw Error(o(166));
          if (((s = ur(Zo.current)), ur(qt.current), _i(n))) {
            if (
              ((a = n.stateNode),
              (s = n.memoizedProps),
              (a[Gt] = n),
              (m = a.nodeValue !== s) && ((t = Et), t !== null))
            )
              switch (t.tag) {
                case 3:
                  vi(a.nodeValue, s, (t.mode & 1) !== 0);
                  break;
                case 5:
                  t.memoizedProps.suppressHydrationWarning !== !0 &&
                    vi(a.nodeValue, s, (t.mode & 1) !== 0);
              }
            m && (n.flags |= 4);
          } else
            ((a = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(a)),
              (a[Gt] = n),
              (n.stateNode = a));
        }
        return (at(n), null);
      case 13:
        if (
          (Oe(Ue),
          (a = n.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (Fe && kt !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0)
            (cf(), Wr(), (n.flags |= 98560), (m = !1));
          else if (((m = _i(n)), a !== null && a.dehydrated !== null)) {
            if (t === null) {
              if (!m) throw Error(o(318));
              if (
                ((m = n.memoizedState),
                (m = m !== null ? m.dehydrated : null),
                !m)
              )
                throw Error(o(317));
              m[Gt] = n;
            } else
              (Wr(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4));
            (at(n), (m = !1));
          } else (Dt !== null && (Lu(Dt), (Dt = null)), (m = !0));
          if (!m) return n.flags & 65536 ? n : null;
        }
        return (n.flags & 128) !== 0
          ? ((n.lanes = s), n)
          : ((a = a !== null),
            a !== (t !== null && t.memoizedState !== null) &&
              a &&
              ((n.child.flags |= 8192),
              (n.mode & 1) !== 0 &&
                (t === null || (Ue.current & 1) !== 0
                  ? Ze === 0 && (Ze = 3)
                  : Au())),
            n.updateQueue !== null && (n.flags |= 4),
            at(n),
            null);
      case 4:
        return (
          Kr(),
          ku(t, n),
          t === null && Uo(n.stateNode.containerInfo),
          at(n),
          null
        );
      case 10:
        return (qa(n.type._context), at(n), null);
      case 17:
        return (pt(n.type) && Si(), at(n), null);
      case 19:
        if ((Oe(Ue), (m = n.memoizedState), m === null)) return (at(n), null);
        if (((a = (n.flags & 128) !== 0), (k = m.rendering), k === null))
          if (a) rs(m, !1);
          else {
            if (Ze !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = n.child; t !== null; ) {
                if (((k = Ri(t)), k !== null)) {
                  for (
                    n.flags |= 128,
                      rs(m, !1),
                      a = k.updateQueue,
                      a !== null && ((n.updateQueue = a), (n.flags |= 4)),
                      n.subtreeFlags = 0,
                      a = s,
                      s = n.child;
                    s !== null;
                  )
                    ((m = s),
                      (t = a),
                      (m.flags &= 14680066),
                      (k = m.alternate),
                      k === null
                        ? ((m.childLanes = 0),
                          (m.lanes = t),
                          (m.child = null),
                          (m.subtreeFlags = 0),
                          (m.memoizedProps = null),
                          (m.memoizedState = null),
                          (m.updateQueue = null),
                          (m.dependencies = null),
                          (m.stateNode = null))
                        : ((m.childLanes = k.childLanes),
                          (m.lanes = k.lanes),
                          (m.child = k.child),
                          (m.subtreeFlags = 0),
                          (m.deletions = null),
                          (m.memoizedProps = k.memoizedProps),
                          (m.memoizedState = k.memoizedState),
                          (m.updateQueue = k.updateQueue),
                          (m.type = k.type),
                          (t = k.dependencies),
                          (m.dependencies =
                            t === null
                              ? null
                              : {
                                  lanes: t.lanes,
                                  firstContext: t.firstContext,
                                })),
                      (s = s.sibling));
                  return (Ae(Ue, (Ue.current & 1) | 2), n.child);
                }
                t = t.sibling;
              }
            m.tail !== null &&
              We() > Zr &&
              ((n.flags |= 128), (a = !0), rs(m, !1), (n.lanes = 4194304));
          }
        else {
          if (!a)
            if (((t = Ri(k)), t !== null)) {
              if (
                ((n.flags |= 128),
                (a = !0),
                (s = t.updateQueue),
                s !== null && ((n.updateQueue = s), (n.flags |= 4)),
                rs(m, !0),
                m.tail === null &&
                  m.tailMode === "hidden" &&
                  !k.alternate &&
                  !Fe)
              )
                return (at(n), null);
            } else
              2 * We() - m.renderingStartTime > Zr &&
                s !== 1073741824 &&
                ((n.flags |= 128), (a = !0), rs(m, !1), (n.lanes = 4194304));
          m.isBackwards
            ? ((k.sibling = n.child), (n.child = k))
            : ((s = m.last),
              s !== null ? (s.sibling = k) : (n.child = k),
              (m.last = k));
        }
        return m.tail !== null
          ? ((n = m.tail),
            (m.rendering = n),
            (m.tail = n.sibling),
            (m.renderingStartTime = We()),
            (n.sibling = null),
            (s = Ue.current),
            Ae(Ue, a ? (s & 1) | 2 : s & 1),
            n)
          : (at(n), null);
      case 22:
      case 23:
        return (
          $u(),
          (a = n.memoizedState !== null),
          t !== null && (t.memoizedState !== null) !== a && (n.flags |= 8192),
          a && (n.mode & 1) !== 0
            ? (Ct & 1073741824) !== 0 &&
              (at(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : at(n),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function Ay(t, n) {
    switch ((Ua(n), n.tag)) {
      case 1:
        return (
          pt(n.type) && Si(),
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 3:
        return (
          Kr(),
          Oe(ht),
          Oe(it),
          ou(),
          (t = n.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((n.flags = (t & -65537) | 128), n)
            : null
        );
      case 5:
        return (nu(n), null);
      case 13:
        if (
          (Oe(Ue), (t = n.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (n.alternate === null) throw Error(o(340));
          Wr();
        }
        return (
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 19:
        return (Oe(Ue), null);
      case 4:
        return (Kr(), null);
      case 10:
        return (qa(n.type._context), null);
      case 22:
      case 23:
        return ($u(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Hi = !1,
    ut = !1,
    Dy = typeof WeakSet == "function" ? WeakSet : Set,
    ve = null;
  function Gr(t, n) {
    var s = t.ref;
    if (s !== null)
      if (typeof s == "function")
        try {
          s(null);
        } catch (a) {
          Xe(t, n, a);
        }
      else s.current = null;
  }
  function Cu(t, n, s) {
    try {
      s();
    } catch (a) {
      Xe(t, n, a);
    }
  }
  var ah = !1;
  function Oy(t, n) {
    if ((($a = li), (t = Od()), ja(t))) {
      if ("selectionStart" in t)
        var s = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          s = ((s = t.ownerDocument) && s.defaultView) || window;
          var a = s.getSelection && s.getSelection();
          if (a && a.rangeCount !== 0) {
            s = a.anchorNode;
            var d = a.anchorOffset,
              m = a.focusNode;
            a = a.focusOffset;
            try {
              (s.nodeType, m.nodeType);
            } catch {
              s = null;
              break e;
            }
            var k = 0,
              T = -1,
              D = -1,
              ee = 0,
              fe = 0,
              he = t,
              ce = null;
            t: for (;;) {
              for (
                var ye;
                he !== s || (d !== 0 && he.nodeType !== 3) || (T = k + d),
                  he !== m || (a !== 0 && he.nodeType !== 3) || (D = k + a),
                  he.nodeType === 3 && (k += he.nodeValue.length),
                  (ye = he.firstChild) !== null;
              )
                ((ce = he), (he = ye));
              for (;;) {
                if (he === t) break t;
                if (
                  (ce === s && ++ee === d && (T = k),
                  ce === m && ++fe === a && (D = k),
                  (ye = he.nextSibling) !== null)
                )
                  break;
                ((he = ce), (ce = he.parentNode));
              }
              he = ye;
            }
            s = T === -1 || D === -1 ? null : { start: T, end: D };
          } else s = null;
        }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (
      Aa = { focusedElem: t, selectionRange: s }, li = !1, ve = n;
      ve !== null;
    )
      if (
        ((n = ve), (t = n.child), (n.subtreeFlags & 1028) !== 0 && t !== null)
      )
        ((t.return = n), (ve = t));
      else
        for (; ve !== null; ) {
          n = ve;
          try {
            var xe = n.alternate;
            if ((n.flags & 1024) !== 0)
              switch (n.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (xe !== null) {
                    var we = xe.memoizedProps,
                      Ke = xe.memoizedState,
                      G = n.stateNode,
                      F = G.getSnapshotBeforeUpdate(
                        n.elementType === n.type ? we : Ot(n.type, we),
                        Ke
                      );
                    G.__reactInternalSnapshotBeforeUpdate = F;
                  }
                  break;
                case 3:
                  var q = n.stateNode.containerInfo;
                  q.nodeType === 1
                    ? (q.textContent = "")
                    : q.nodeType === 9 &&
                      q.documentElement &&
                      q.removeChild(q.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(o(163));
              }
          } catch (pe) {
            Xe(n, n.return, pe);
          }
          if (((t = n.sibling), t !== null)) {
            ((t.return = n.return), (ve = t));
            break;
          }
          ve = n.return;
        }
    return ((xe = ah), (ah = !1), xe);
  }
  function os(t, n, s) {
    var a = n.updateQueue;
    if (((a = a !== null ? a.lastEffect : null), a !== null)) {
      var d = (a = a.next);
      do {
        if ((d.tag & t) === t) {
          var m = d.destroy;
          ((d.destroy = void 0), m !== void 0 && Cu(n, s, m));
        }
        d = d.next;
      } while (d !== a);
    }
  }
  function Bi(t, n) {
    if (
      ((n = n.updateQueue), (n = n !== null ? n.lastEffect : null), n !== null)
    ) {
      var s = (n = n.next);
      do {
        if ((s.tag & t) === t) {
          var a = s.create;
          s.destroy = a();
        }
        s = s.next;
      } while (s !== n);
    }
  }
  function Nu(t) {
    var n = t.ref;
    if (n !== null) {
      var s = t.stateNode;
      switch (t.tag) {
        case 5:
          t = s;
          break;
        default:
          t = s;
      }
      typeof n == "function" ? n(t) : (n.current = t);
    }
  }
  function uh(t) {
    var n = t.alternate;
    (n !== null && ((t.alternate = null), uh(n)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 &&
        ((n = t.stateNode),
        n !== null &&
          (delete n[Gt],
          delete n[Xo],
          delete n[Ha],
          delete n[Sy],
          delete n[Ey])),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  function ch(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 4;
  }
  function dh(t) {
    e: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || ch(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if (t.flags & 2 || t.child === null || t.tag === 4) continue e;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function _u(t, n, s) {
    var a = t.tag;
    if (a === 5 || a === 6)
      ((t = t.stateNode),
        n
          ? s.nodeType === 8
            ? s.parentNode.insertBefore(t, n)
            : s.insertBefore(t, n)
          : (s.nodeType === 8
              ? ((n = s.parentNode), n.insertBefore(t, s))
              : ((n = s), n.appendChild(t)),
            (s = s._reactRootContainer),
            s != null || n.onclick !== null || (n.onclick = xi)));
    else if (a !== 4 && ((t = t.child), t !== null))
      for (_u(t, n, s), t = t.sibling; t !== null; )
        (_u(t, n, s), (t = t.sibling));
  }
  function bu(t, n, s) {
    var a = t.tag;
    if (a === 5 || a === 6)
      ((t = t.stateNode), n ? s.insertBefore(t, n) : s.appendChild(t));
    else if (a !== 4 && ((t = t.child), t !== null))
      for (bu(t, n, s), t = t.sibling; t !== null; )
        (bu(t, n, s), (t = t.sibling));
  }
  var ot = null,
    Ft = !1;
  function Dn(t, n, s) {
    for (s = s.child; s !== null; ) (fh(t, n, s), (s = s.sibling));
  }
  function fh(t, n, s) {
    if (It && typeof It.onCommitFiberUnmount == "function")
      try {
        It.onCommitFiberUnmount(nr, s);
      } catch {}
    switch (s.tag) {
      case 5:
        ut || Gr(s, n);
      case 6:
        var a = ot,
          d = Ft;
        ((ot = null),
          Dn(t, n, s),
          (ot = a),
          (Ft = d),
          ot !== null &&
            (Ft
              ? ((t = ot),
                (s = s.stateNode),
                t.nodeType === 8
                  ? t.parentNode.removeChild(s)
                  : t.removeChild(s))
              : ot.removeChild(s.stateNode)));
        break;
      case 18:
        ot !== null &&
          (Ft
            ? ((t = ot),
              (s = s.stateNode),
              t.nodeType === 8
                ? Fa(t.parentNode, s)
                : t.nodeType === 1 && Fa(t, s),
              $o(t))
            : Fa(ot, s.stateNode));
        break;
      case 4:
        ((a = ot),
          (d = Ft),
          (ot = s.stateNode.containerInfo),
          (Ft = !0),
          Dn(t, n, s),
          (ot = a),
          (Ft = d));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !ut &&
          ((a = s.updateQueue), a !== null && ((a = a.lastEffect), a !== null))
        ) {
          d = a = a.next;
          do {
            var m = d,
              k = m.destroy;
            ((m = m.tag),
              k !== void 0 && ((m & 2) !== 0 || (m & 4) !== 0) && Cu(s, n, k),
              (d = d.next));
          } while (d !== a);
        }
        Dn(t, n, s);
        break;
      case 1:
        if (
          !ut &&
          (Gr(s, n),
          (a = s.stateNode),
          typeof a.componentWillUnmount == "function")
        )
          try {
            ((a.props = s.memoizedProps),
              (a.state = s.memoizedState),
              a.componentWillUnmount());
          } catch (T) {
            Xe(s, n, T);
          }
        Dn(t, n, s);
        break;
      case 21:
        Dn(t, n, s);
        break;
      case 22:
        s.mode & 1
          ? ((ut = (a = ut) || s.memoizedState !== null), Dn(t, n, s), (ut = a))
          : Dn(t, n, s);
        break;
      default:
        Dn(t, n, s);
    }
  }
  function hh(t) {
    var n = t.updateQueue;
    if (n !== null) {
      t.updateQueue = null;
      var s = t.stateNode;
      (s === null && (s = t.stateNode = new Dy()),
        n.forEach(function (a) {
          var d = Ky.bind(null, t, a);
          s.has(a) || (s.add(a), a.then(d, d));
        }));
    }
  }
  function Ht(t, n) {
    var s = n.deletions;
    if (s !== null)
      for (var a = 0; a < s.length; a++) {
        var d = s[a];
        try {
          var m = t,
            k = n,
            T = k;
          e: for (; T !== null; ) {
            switch (T.tag) {
              case 5:
                ((ot = T.stateNode), (Ft = !1));
                break e;
              case 3:
                ((ot = T.stateNode.containerInfo), (Ft = !0));
                break e;
              case 4:
                ((ot = T.stateNode.containerInfo), (Ft = !0));
                break e;
            }
            T = T.return;
          }
          if (ot === null) throw Error(o(160));
          (fh(m, k, d), (ot = null), (Ft = !1));
          var D = d.alternate;
          (D !== null && (D.return = null), (d.return = null));
        } catch (ee) {
          Xe(d, n, ee);
        }
      }
    if (n.subtreeFlags & 12854)
      for (n = n.child; n !== null; ) (ph(n, t), (n = n.sibling));
  }
  function ph(t, n) {
    var s = t.alternate,
      a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Ht(n, t), Jt(t), a & 4)) {
          try {
            (os(3, t, t.return), Bi(3, t));
          } catch (we) {
            Xe(t, t.return, we);
          }
          try {
            os(5, t, t.return);
          } catch (we) {
            Xe(t, t.return, we);
          }
        }
        break;
      case 1:
        (Ht(n, t), Jt(t), a & 512 && s !== null && Gr(s, s.return));
        break;
      case 5:
        if (
          (Ht(n, t),
          Jt(t),
          a & 512 && s !== null && Gr(s, s.return),
          t.flags & 32)
        ) {
          var d = t.stateNode;
          try {
            un(d, "");
          } catch (we) {
            Xe(t, t.return, we);
          }
        }
        if (a & 4 && ((d = t.stateNode), d != null)) {
          var m = t.memoizedProps,
            k = s !== null ? s.memoizedProps : m,
            T = t.type,
            D = t.updateQueue;
          if (((t.updateQueue = null), D !== null))
            try {
              (T === "input" &&
                m.type === "radio" &&
                m.name != null &&
                ke(d, m),
                wo(T, k));
              var ee = wo(T, m);
              for (k = 0; k < D.length; k += 2) {
                var fe = D[k],
                  he = D[k + 1];
                fe === "style"
                  ? Vs(d, he)
                  : fe === "dangerouslySetInnerHTML"
                    ? Hs(d, he)
                    : fe === "children"
                      ? un(d, he)
                      : E(d, fe, he, ee);
              }
              switch (T) {
                case "input":
                  Se(d, m);
                  break;
                case "textarea":
                  sn(d, m);
                  break;
                case "select":
                  var ce = d._wrapperState.wasMultiple;
                  d._wrapperState.wasMultiple = !!m.multiple;
                  var ye = m.value;
                  ye != null
                    ? Re(d, !!m.multiple, ye, !1)
                    : ce !== !!m.multiple &&
                      (m.defaultValue != null
                        ? Re(d, !!m.multiple, m.defaultValue, !0)
                        : Re(d, !!m.multiple, m.multiple ? [] : "", !1));
              }
              d[Xo] = m;
            } catch (we) {
              Xe(t, t.return, we);
            }
        }
        break;
      case 6:
        if ((Ht(n, t), Jt(t), a & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          ((d = t.stateNode), (m = t.memoizedProps));
          try {
            d.nodeValue = m;
          } catch (we) {
            Xe(t, t.return, we);
          }
        }
        break;
      case 3:
        if (
          (Ht(n, t), Jt(t), a & 4 && s !== null && s.memoizedState.isDehydrated)
        )
          try {
            $o(n.containerInfo);
          } catch (we) {
            Xe(t, t.return, we);
          }
        break;
      case 4:
        (Ht(n, t), Jt(t));
        break;
      case 13:
        (Ht(n, t),
          Jt(t),
          (d = t.child),
          d.flags & 8192 &&
            ((m = d.memoizedState !== null),
            (d.stateNode.isHidden = m),
            !m ||
              (d.alternate !== null && d.alternate.memoizedState !== null) ||
              (Mu = We())),
          a & 4 && hh(t));
        break;
      case 22:
        if (
          ((fe = s !== null && s.memoizedState !== null),
          t.mode & 1 ? ((ut = (ee = ut) || fe), Ht(n, t), (ut = ee)) : Ht(n, t),
          Jt(t),
          a & 8192)
        ) {
          if (
            ((ee = t.memoizedState !== null),
            (t.stateNode.isHidden = ee) && !fe && (t.mode & 1) !== 0)
          )
            for (ve = t, fe = t.child; fe !== null; ) {
              for (he = ve = fe; ve !== null; ) {
                switch (((ce = ve), (ye = ce.child), ce.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    os(4, ce, ce.return);
                    break;
                  case 1:
                    Gr(ce, ce.return);
                    var xe = ce.stateNode;
                    if (typeof xe.componentWillUnmount == "function") {
                      ((a = ce), (s = ce.return));
                      try {
                        ((n = a),
                          (xe.props = n.memoizedProps),
                          (xe.state = n.memoizedState),
                          xe.componentWillUnmount());
                      } catch (we) {
                        Xe(a, s, we);
                      }
                    }
                    break;
                  case 5:
                    Gr(ce, ce.return);
                    break;
                  case 22:
                    if (ce.memoizedState !== null) {
                      yh(he);
                      continue;
                    }
                }
                ye !== null ? ((ye.return = ce), (ve = ye)) : yh(he);
              }
              fe = fe.sibling;
            }
          e: for (fe = null, he = t; ; ) {
            if (he.tag === 5) {
              if (fe === null) {
                fe = he;
                try {
                  ((d = he.stateNode),
                    ee
                      ? ((m = d.style),
                        typeof m.setProperty == "function"
                          ? m.setProperty("display", "none", "important")
                          : (m.display = "none"))
                      : ((T = he.stateNode),
                        (D = he.memoizedProps.style),
                        (k =
                          D != null && D.hasOwnProperty("display")
                            ? D.display
                            : null),
                        (T.style.display = Bs("display", k))));
                } catch (we) {
                  Xe(t, t.return, we);
                }
              }
            } else if (he.tag === 6) {
              if (fe === null)
                try {
                  he.stateNode.nodeValue = ee ? "" : he.memoizedProps;
                } catch (we) {
                  Xe(t, t.return, we);
                }
            } else if (
              ((he.tag !== 22 && he.tag !== 23) ||
                he.memoizedState === null ||
                he === t) &&
              he.child !== null
            ) {
              ((he.child.return = he), (he = he.child));
              continue;
            }
            if (he === t) break e;
            for (; he.sibling === null; ) {
              if (he.return === null || he.return === t) break e;
              (fe === he && (fe = null), (he = he.return));
            }
            (fe === he && (fe = null),
              (he.sibling.return = he.return),
              (he = he.sibling));
          }
        }
        break;
      case 19:
        (Ht(n, t), Jt(t), a & 4 && hh(t));
        break;
      case 21:
        break;
      default:
        (Ht(n, t), Jt(t));
    }
  }
  function Jt(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        e: {
          for (var s = t.return; s !== null; ) {
            if (ch(s)) {
              var a = s;
              break e;
            }
            s = s.return;
          }
          throw Error(o(160));
        }
        switch (a.tag) {
          case 5:
            var d = a.stateNode;
            a.flags & 32 && (un(d, ""), (a.flags &= -33));
            var m = dh(t);
            bu(t, m, d);
            break;
          case 3:
          case 4:
            var k = a.stateNode.containerInfo,
              T = dh(t);
            _u(t, T, k);
            break;
          default:
            throw Error(o(161));
        }
      } catch (D) {
        Xe(t, t.return, D);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function Fy(t, n, s) {
    ((ve = t), mh(t));
  }
  function mh(t, n, s) {
    for (var a = (t.mode & 1) !== 0; ve !== null; ) {
      var d = ve,
        m = d.child;
      if (d.tag === 22 && a) {
        var k = d.memoizedState !== null || Hi;
        if (!k) {
          var T = d.alternate,
            D = (T !== null && T.memoizedState !== null) || ut;
          T = Hi;
          var ee = ut;
          if (((Hi = k), (ut = D) && !ee))
            for (ve = d; ve !== null; )
              ((k = ve),
                (D = k.child),
                k.tag === 22 && k.memoizedState !== null
                  ? vh(d)
                  : D !== null
                    ? ((D.return = k), (ve = D))
                    : vh(d));
          for (; m !== null; ) ((ve = m), mh(m), (m = m.sibling));
          ((ve = d), (Hi = T), (ut = ee));
        }
        gh(t);
      } else
        (d.subtreeFlags & 8772) !== 0 && m !== null
          ? ((m.return = d), (ve = m))
          : gh(t);
    }
  }
  function gh(t) {
    for (; ve !== null; ) {
      var n = ve;
      if ((n.flags & 8772) !== 0) {
        var s = n.alternate;
        try {
          if ((n.flags & 8772) !== 0)
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                ut || Bi(5, n);
                break;
              case 1:
                var a = n.stateNode;
                if (n.flags & 4 && !ut)
                  if (s === null) a.componentDidMount();
                  else {
                    var d =
                      n.elementType === n.type
                        ? s.memoizedProps
                        : Ot(n.type, s.memoizedProps);
                    a.componentDidUpdate(
                      d,
                      s.memoizedState,
                      a.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                var m = n.updateQueue;
                m !== null && yf(n, m, a);
                break;
              case 3:
                var k = n.updateQueue;
                if (k !== null) {
                  if (((s = null), n.child !== null))
                    switch (n.child.tag) {
                      case 5:
                        s = n.child.stateNode;
                        break;
                      case 1:
                        s = n.child.stateNode;
                    }
                  yf(n, k, s);
                }
                break;
              case 5:
                var T = n.stateNode;
                if (s === null && n.flags & 4) {
                  s = T;
                  var D = n.memoizedProps;
                  switch (n.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      D.autoFocus && s.focus();
                      break;
                    case "img":
                      D.src && (s.src = D.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (n.memoizedState === null) {
                  var ee = n.alternate;
                  if (ee !== null) {
                    var fe = ee.memoizedState;
                    if (fe !== null) {
                      var he = fe.dehydrated;
                      he !== null && $o(he);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(o(163));
            }
          ut || (n.flags & 512 && Nu(n));
        } catch (ce) {
          Xe(n, n.return, ce);
        }
      }
      if (n === t) {
        ve = null;
        break;
      }
      if (((s = n.sibling), s !== null)) {
        ((s.return = n.return), (ve = s));
        break;
      }
      ve = n.return;
    }
  }
  function yh(t) {
    for (; ve !== null; ) {
      var n = ve;
      if (n === t) {
        ve = null;
        break;
      }
      var s = n.sibling;
      if (s !== null) {
        ((s.return = n.return), (ve = s));
        break;
      }
      ve = n.return;
    }
  }
  function vh(t) {
    for (; ve !== null; ) {
      var n = ve;
      try {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            var s = n.return;
            try {
              Bi(4, n);
            } catch (D) {
              Xe(n, s, D);
            }
            break;
          case 1:
            var a = n.stateNode;
            if (typeof a.componentDidMount == "function") {
              var d = n.return;
              try {
                a.componentDidMount();
              } catch (D) {
                Xe(n, d, D);
              }
            }
            var m = n.return;
            try {
              Nu(n);
            } catch (D) {
              Xe(n, m, D);
            }
            break;
          case 5:
            var k = n.return;
            try {
              Nu(n);
            } catch (D) {
              Xe(n, k, D);
            }
        }
      } catch (D) {
        Xe(n, n.return, D);
      }
      if (n === t) {
        ve = null;
        break;
      }
      var T = n.sibling;
      if (T !== null) {
        ((T.return = n.return), (ve = T));
        break;
      }
      ve = n.return;
    }
  }
  var Hy = Math.ceil,
    Vi = j.ReactCurrentDispatcher,
    ju = j.ReactCurrentOwner,
    Lt = j.ReactCurrentBatchConfig,
    Le = 0,
    tt = null,
    Qe = null,
    st = 0,
    Ct = 0,
    qr = Tn(0),
    Ze = 0,
    ss = null,
    dr = 0,
    Wi = 0,
    Iu = 0,
    is = null,
    gt = null,
    Mu = 0,
    Zr = 1 / 0,
    yn = null,
    Ui = !1,
    Pu = null,
    On = null,
    Yi = !1,
    Fn = null,
    Xi = 0,
    ls = 0,
    Ru = null,
    Ki = -1,
    Qi = 0;
  function ft() {
    return (Le & 6) !== 0 ? We() : Ki !== -1 ? Ki : (Ki = We());
  }
  function Hn(t) {
    return (t.mode & 1) === 0
      ? 1
      : (Le & 2) !== 0 && st !== 0
        ? st & -st
        : Cy.transition !== null
          ? (Qi === 0 && (Qi = Pr()), Qi)
          : ((t = $e),
            t !== 0 ||
              ((t = window.event), (t = t === void 0 ? 16 : xd(t.type))),
            t);
  }
  function Bt(t, n, s, a) {
    if (50 < ls) throw ((ls = 0), (Ru = null), Error(o(185)));
    (rr(t, s, a),
      ((Le & 2) === 0 || t !== tt) &&
        (t === tt && ((Le & 2) === 0 && (Wi |= s), Ze === 4 && Bn(t, st)),
        yt(t, a),
        s === 1 &&
          Le === 0 &&
          (n.mode & 1) === 0 &&
          ((Zr = We() + 500), ki && zn())));
  }
  function yt(t, n) {
    var s = t.callbackNode;
    ha(t, n);
    var a = Mr(t, t === tt ? st : 0);
    if (a === 0)
      (s !== null && Js(s), (t.callbackNode = null), (t.callbackPriority = 0));
    else if (((n = a & -a), t.callbackPriority !== n)) {
      if ((s != null && Js(s), n === 1))
        (t.tag === 0 ? ky(wh.bind(null, t)) : of(wh.bind(null, t)),
          xy(function () {
            (Le & 6) === 0 && zn();
          }),
          (s = null));
      else {
        switch (dd(a)) {
          case 1:
            s = Io;
            break;
          case 4:
            s = ti;
            break;
          case 16:
            s = br;
            break;
          case 536870912:
            s = ni;
            break;
          default:
            s = br;
        }
        s = jh(s, xh.bind(null, t));
      }
      ((t.callbackPriority = n), (t.callbackNode = s));
    }
  }
  function xh(t, n) {
    if (((Ki = -1), (Qi = 0), (Le & 6) !== 0)) throw Error(o(327));
    var s = t.callbackNode;
    if (Jr() && t.callbackNode !== s) return null;
    var a = Mr(t, t === tt ? st : 0);
    if (a === 0) return null;
    if ((a & 30) !== 0 || (a & t.expiredLanes) !== 0 || n) n = Gi(t, a);
    else {
      n = a;
      var d = Le;
      Le |= 2;
      var m = Eh();
      (tt !== t || st !== n) && ((yn = null), (Zr = We() + 500), hr(t, n));
      do
        try {
          Wy();
          break;
        } catch (T) {
          Sh(t, T);
        }
      while (!0);
      (Ga(),
        (Vi.current = m),
        (Le = d),
        Qe !== null ? (n = 0) : ((tt = null), (st = 0), (n = Ze)));
    }
    if (n !== 0) {
      if (
        (n === 2 && ((d = Mo(t)), d !== 0 && ((a = d), (n = Tu(t, d)))),
        n === 1)
      )
        throw ((s = ss), hr(t, 0), Bn(t, a), yt(t, We()), s);
      if (n === 6) Bn(t, a);
      else {
        if (
          ((d = t.current.alternate),
          (a & 30) === 0 &&
            !By(d) &&
            ((n = Gi(t, a)),
            n === 2 && ((m = Mo(t)), m !== 0 && ((a = m), (n = Tu(t, m)))),
            n === 1))
        )
          throw ((s = ss), hr(t, 0), Bn(t, a), yt(t, We()), s);
        switch (((t.finishedWork = d), (t.finishedLanes = a), n)) {
          case 0:
          case 1:
            throw Error(o(345));
          case 2:
            pr(t, gt, yn);
            break;
          case 3:
            if (
              (Bn(t, a),
              (a & 130023424) === a && ((n = Mu + 500 - We()), 10 < n))
            ) {
              if (Mr(t, 0) !== 0) break;
              if (((d = t.suspendedLanes), (d & a) !== a)) {
                (ft(), (t.pingedLanes |= t.suspendedLanes & d));
                break;
              }
              t.timeoutHandle = Oa(pr.bind(null, t, gt, yn), n);
              break;
            }
            pr(t, gt, yn);
            break;
          case 4:
            if ((Bn(t, a), (a & 4194240) === a)) break;
            for (n = t.eventTimes, d = -1; 0 < a; ) {
              var k = 31 - wt(a);
              ((m = 1 << k), (k = n[k]), k > d && (d = k), (a &= ~m));
            }
            if (
              ((a = d),
              (a = We() - a),
              (a =
                (120 > a
                  ? 120
                  : 480 > a
                    ? 480
                    : 1080 > a
                      ? 1080
                      : 1920 > a
                        ? 1920
                        : 3e3 > a
                          ? 3e3
                          : 4320 > a
                            ? 4320
                            : 1960 * Hy(a / 1960)) - a),
              10 < a)
            ) {
              t.timeoutHandle = Oa(pr.bind(null, t, gt, yn), a);
              break;
            }
            pr(t, gt, yn);
            break;
          case 5:
            pr(t, gt, yn);
            break;
          default:
            throw Error(o(329));
        }
      }
    }
    return (yt(t, We()), t.callbackNode === s ? xh.bind(null, t) : null);
  }
  function Tu(t, n) {
    var s = is;
    return (
      t.current.memoizedState.isDehydrated && (hr(t, n).flags |= 256),
      (t = Gi(t, n)),
      t !== 2 && ((n = gt), (gt = s), n !== null && Lu(n)),
      t
    );
  }
  function Lu(t) {
    gt === null ? (gt = t) : gt.push.apply(gt, t);
  }
  function By(t) {
    for (var n = t; ; ) {
      if (n.flags & 16384) {
        var s = n.updateQueue;
        if (s !== null && ((s = s.stores), s !== null))
          for (var a = 0; a < s.length; a++) {
            var d = s[a],
              m = d.getSnapshot;
            d = d.value;
            try {
              if (!At(m(), d)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((s = n.child), n.subtreeFlags & 16384 && s !== null))
        ((s.return = n), (n = s));
      else {
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return !0;
          n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
      }
    }
    return !0;
  }
  function Bn(t, n) {
    for (
      n &= ~Iu,
        n &= ~Wi,
        t.suspendedLanes |= n,
        t.pingedLanes &= ~n,
        t = t.expirationTimes;
      0 < n;
    ) {
      var s = 31 - wt(n),
        a = 1 << s;
      ((t[s] = -1), (n &= ~a));
    }
  }
  function wh(t) {
    if ((Le & 6) !== 0) throw Error(o(327));
    Jr();
    var n = Mr(t, 0);
    if ((n & 1) === 0) return (yt(t, We()), null);
    var s = Gi(t, n);
    if (t.tag !== 0 && s === 2) {
      var a = Mo(t);
      a !== 0 && ((n = a), (s = Tu(t, a)));
    }
    if (s === 1) throw ((s = ss), hr(t, 0), Bn(t, n), yt(t, We()), s);
    if (s === 6) throw Error(o(345));
    return (
      (t.finishedWork = t.current.alternate),
      (t.finishedLanes = n),
      pr(t, gt, yn),
      yt(t, We()),
      null
    );
  }
  function zu(t, n) {
    var s = Le;
    Le |= 1;
    try {
      return t(n);
    } finally {
      ((Le = s), Le === 0 && ((Zr = We() + 500), ki && zn()));
    }
  }
  function fr(t) {
    Fn !== null && Fn.tag === 0 && (Le & 6) === 0 && Jr();
    var n = Le;
    Le |= 1;
    var s = Lt.transition,
      a = $e;
    try {
      if (((Lt.transition = null), ($e = 1), t)) return t();
    } finally {
      (($e = a), (Lt.transition = s), (Le = n), (Le & 6) === 0 && zn());
    }
  }
  function $u() {
    ((Ct = qr.current), Oe(qr));
  }
  function hr(t, n) {
    ((t.finishedWork = null), (t.finishedLanes = 0));
    var s = t.timeoutHandle;
    if ((s !== -1 && ((t.timeoutHandle = -1), vy(s)), Qe !== null))
      for (s = Qe.return; s !== null; ) {
        var a = s;
        switch ((Ua(a), a.tag)) {
          case 1:
            ((a = a.type.childContextTypes), a != null && Si());
            break;
          case 3:
            (Kr(), Oe(ht), Oe(it), ou());
            break;
          case 5:
            nu(a);
            break;
          case 4:
            Kr();
            break;
          case 13:
            Oe(Ue);
            break;
          case 19:
            Oe(Ue);
            break;
          case 10:
            qa(a.type._context);
            break;
          case 22:
          case 23:
            $u();
        }
        s = s.return;
      }
    if (
      ((tt = t),
      (Qe = t = Vn(t.current, null)),
      (st = Ct = n),
      (Ze = 0),
      (ss = null),
      (Iu = Wi = dr = 0),
      (gt = is = null),
      ar !== null)
    ) {
      for (n = 0; n < ar.length; n++)
        if (((s = ar[n]), (a = s.interleaved), a !== null)) {
          s.interleaved = null;
          var d = a.next,
            m = s.pending;
          if (m !== null) {
            var k = m.next;
            ((m.next = d), (a.next = k));
          }
          s.pending = a;
        }
      ar = null;
    }
    return t;
  }
  function Sh(t, n) {
    do {
      var s = Qe;
      try {
        if ((Ga(), (Ti.current = Ai), Li)) {
          for (var a = Ye.memoizedState; a !== null; ) {
            var d = a.queue;
            (d !== null && (d.pending = null), (a = a.next));
          }
          Li = !1;
        }
        if (
          ((cr = 0),
          (et = qe = Ye = null),
          (Jo = !1),
          (es = 0),
          (ju.current = null),
          s === null || s.return === null)
        ) {
          ((Ze = 1), (ss = n), (Qe = null));
          break;
        }
        e: {
          var m = t,
            k = s.return,
            T = s,
            D = n;
          if (
            ((n = st),
            (T.flags |= 32768),
            D !== null && typeof D == "object" && typeof D.then == "function")
          ) {
            var ee = D,
              fe = T,
              he = fe.tag;
            if ((fe.mode & 1) === 0 && (he === 0 || he === 11 || he === 15)) {
              var ce = fe.alternate;
              ce
                ? ((fe.updateQueue = ce.updateQueue),
                  (fe.memoizedState = ce.memoizedState),
                  (fe.lanes = ce.lanes))
                : ((fe.updateQueue = null), (fe.memoizedState = null));
            }
            var ye = Yf(k);
            if (ye !== null) {
              ((ye.flags &= -257),
                Xf(ye, k, T, m, n),
                ye.mode & 1 && Uf(m, ee, n),
                (n = ye),
                (D = ee));
              var xe = n.updateQueue;
              if (xe === null) {
                var we = new Set();
                (we.add(D), (n.updateQueue = we));
              } else xe.add(D);
              break e;
            } else {
              if ((n & 1) === 0) {
                (Uf(m, ee, n), Au());
                break e;
              }
              D = Error(o(426));
            }
          } else if (Fe && T.mode & 1) {
            var Ke = Yf(k);
            if (Ke !== null) {
              ((Ke.flags & 65536) === 0 && (Ke.flags |= 256),
                Xf(Ke, k, T, m, n),
                Ka(Qr(D, T)));
              break e;
            }
          }
          ((m = D = Qr(D, T)),
            Ze !== 4 && (Ze = 2),
            is === null ? (is = [m]) : is.push(m),
            (m = k));
          do {
            switch (m.tag) {
              case 3:
                ((m.flags |= 65536), (n &= -n), (m.lanes |= n));
                var G = Vf(m, D, n);
                gf(m, G);
                break e;
              case 1:
                T = D;
                var F = m.type,
                  q = m.stateNode;
                if (
                  (m.flags & 128) === 0 &&
                  (typeof F.getDerivedStateFromError == "function" ||
                    (q !== null &&
                      typeof q.componentDidCatch == "function" &&
                      (On === null || !On.has(q))))
                ) {
                  ((m.flags |= 65536), (n &= -n), (m.lanes |= n));
                  var pe = Wf(m, T, n);
                  gf(m, pe);
                  break e;
                }
            }
            m = m.return;
          } while (m !== null);
        }
        Ch(s);
      } catch (Ee) {
        ((n = Ee), Qe === s && s !== null && (Qe = s = s.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Eh() {
    var t = Vi.current;
    return ((Vi.current = Ai), t === null ? Ai : t);
  }
  function Au() {
    ((Ze === 0 || Ze === 3 || Ze === 2) && (Ze = 4),
      tt === null ||
        ((dr & 268435455) === 0 && (Wi & 268435455) === 0) ||
        Bn(tt, st));
  }
  function Gi(t, n) {
    var s = Le;
    Le |= 2;
    var a = Eh();
    (tt !== t || st !== n) && ((yn = null), hr(t, n));
    do
      try {
        Vy();
        break;
      } catch (d) {
        Sh(t, d);
      }
    while (!0);
    if ((Ga(), (Le = s), (Vi.current = a), Qe !== null)) throw Error(o(261));
    return ((tt = null), (st = 0), Ze);
  }
  function Vy() {
    for (; Qe !== null; ) kh(Qe);
  }
  function Wy() {
    for (; Qe !== null && !ia(); ) kh(Qe);
  }
  function kh(t) {
    var n = bh(t.alternate, t, Ct);
    ((t.memoizedProps = t.pendingProps),
      n === null ? Ch(t) : (Qe = n),
      (ju.current = null));
  }
  function Ch(t) {
    var n = t;
    do {
      var s = n.alternate;
      if (((t = n.return), (n.flags & 32768) === 0)) {
        if (((s = $y(s, n, Ct)), s !== null)) {
          Qe = s;
          return;
        }
      } else {
        if (((s = Ay(s, n)), s !== null)) {
          ((s.flags &= 32767), (Qe = s));
          return;
        }
        if (t !== null)
          ((t.flags |= 32768), (t.subtreeFlags = 0), (t.deletions = null));
        else {
          ((Ze = 6), (Qe = null));
          return;
        }
      }
      if (((n = n.sibling), n !== null)) {
        Qe = n;
        return;
      }
      Qe = n = t;
    } while (n !== null);
    Ze === 0 && (Ze = 5);
  }
  function pr(t, n, s) {
    var a = $e,
      d = Lt.transition;
    try {
      ((Lt.transition = null), ($e = 1), Uy(t, n, s, a));
    } finally {
      ((Lt.transition = d), ($e = a));
    }
    return null;
  }
  function Uy(t, n, s, a) {
    do Jr();
    while (Fn !== null);
    if ((Le & 6) !== 0) throw Error(o(327));
    s = t.finishedWork;
    var d = t.finishedLanes;
    if (s === null) return null;
    if (((t.finishedWork = null), (t.finishedLanes = 0), s === t.current))
      throw Error(o(177));
    ((t.callbackNode = null), (t.callbackPriority = 0));
    var m = s.lanes | s.childLanes;
    if (
      (oi(t, m),
      t === tt && ((Qe = tt = null), (st = 0)),
      ((s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0) ||
        Yi ||
        ((Yi = !0),
        jh(br, function () {
          return (Jr(), null);
        })),
      (m = (s.flags & 15990) !== 0),
      (s.subtreeFlags & 15990) !== 0 || m)
    ) {
      ((m = Lt.transition), (Lt.transition = null));
      var k = $e;
      $e = 1;
      var T = Le;
      ((Le |= 4),
        (ju.current = null),
        Oy(t, s),
        ph(s, t),
        dy(Aa),
        (li = !!$a),
        (Aa = $a = null),
        (t.current = s),
        Fy(s),
        ei(),
        (Le = T),
        ($e = k),
        (Lt.transition = m));
    } else t.current = s;
    if (
      (Yi && ((Yi = !1), (Fn = t), (Xi = d)),
      (m = t.pendingLanes),
      m === 0 && (On = null),
      ua(s.stateNode),
      yt(t, We()),
      n !== null)
    )
      for (a = t.onRecoverableError, s = 0; s < n.length; s++)
        ((d = n[s]), a(d.value, { componentStack: d.stack, digest: d.digest }));
    if (Ui) throw ((Ui = !1), (t = Pu), (Pu = null), t);
    return (
      (Xi & 1) !== 0 && t.tag !== 0 && Jr(),
      (m = t.pendingLanes),
      (m & 1) !== 0 ? (t === Ru ? ls++ : ((ls = 0), (Ru = t))) : (ls = 0),
      zn(),
      null
    );
  }
  function Jr() {
    if (Fn !== null) {
      var t = dd(Xi),
        n = Lt.transition,
        s = $e;
      try {
        if (((Lt.transition = null), ($e = 16 > t ? 16 : t), Fn === null))
          var a = !1;
        else {
          if (((t = Fn), (Fn = null), (Xi = 0), (Le & 6) !== 0))
            throw Error(o(331));
          var d = Le;
          for (Le |= 4, ve = t.current; ve !== null; ) {
            var m = ve,
              k = m.child;
            if ((ve.flags & 16) !== 0) {
              var T = m.deletions;
              if (T !== null) {
                for (var D = 0; D < T.length; D++) {
                  var ee = T[D];
                  for (ve = ee; ve !== null; ) {
                    var fe = ve;
                    switch (fe.tag) {
                      case 0:
                      case 11:
                      case 15:
                        os(8, fe, m);
                    }
                    var he = fe.child;
                    if (he !== null) ((he.return = fe), (ve = he));
                    else
                      for (; ve !== null; ) {
                        fe = ve;
                        var ce = fe.sibling,
                          ye = fe.return;
                        if ((uh(fe), fe === ee)) {
                          ve = null;
                          break;
                        }
                        if (ce !== null) {
                          ((ce.return = ye), (ve = ce));
                          break;
                        }
                        ve = ye;
                      }
                  }
                }
                var xe = m.alternate;
                if (xe !== null) {
                  var we = xe.child;
                  if (we !== null) {
                    xe.child = null;
                    do {
                      var Ke = we.sibling;
                      ((we.sibling = null), (we = Ke));
                    } while (we !== null);
                  }
                }
                ve = m;
              }
            }
            if ((m.subtreeFlags & 2064) !== 0 && k !== null)
              ((k.return = m), (ve = k));
            else
              e: for (; ve !== null; ) {
                if (((m = ve), (m.flags & 2048) !== 0))
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      os(9, m, m.return);
                  }
                var G = m.sibling;
                if (G !== null) {
                  ((G.return = m.return), (ve = G));
                  break e;
                }
                ve = m.return;
              }
          }
          var F = t.current;
          for (ve = F; ve !== null; ) {
            k = ve;
            var q = k.child;
            if ((k.subtreeFlags & 2064) !== 0 && q !== null)
              ((q.return = k), (ve = q));
            else
              e: for (k = F; ve !== null; ) {
                if (((T = ve), (T.flags & 2048) !== 0))
                  try {
                    switch (T.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Bi(9, T);
                    }
                  } catch (Ee) {
                    Xe(T, T.return, Ee);
                  }
                if (T === k) {
                  ve = null;
                  break e;
                }
                var pe = T.sibling;
                if (pe !== null) {
                  ((pe.return = T.return), (ve = pe));
                  break e;
                }
                ve = T.return;
              }
          }
          if (
            ((Le = d),
            zn(),
            It && typeof It.onPostCommitFiberRoot == "function")
          )
            try {
              It.onPostCommitFiberRoot(nr, t);
            } catch {}
          a = !0;
        }
        return a;
      } finally {
        (($e = s), (Lt.transition = n));
      }
    }
    return !1;
  }
  function Nh(t, n, s) {
    ((n = Qr(s, n)),
      (n = Vf(t, n, 1)),
      (t = An(t, n, 1)),
      (n = ft()),
      t !== null && (rr(t, 1, n), yt(t, n)));
  }
  function Xe(t, n, s) {
    if (t.tag === 3) Nh(t, t, s);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Nh(n, t, s);
          break;
        } else if (n.tag === 1) {
          var a = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (On === null || !On.has(a)))
          ) {
            ((t = Qr(s, t)),
              (t = Wf(n, t, 1)),
              (n = An(n, t, 1)),
              (t = ft()),
              n !== null && (rr(n, 1, t), yt(n, t)));
            break;
          }
        }
        n = n.return;
      }
  }
  function Yy(t, n, s) {
    var a = t.pingCache;
    (a !== null && a.delete(n),
      (n = ft()),
      (t.pingedLanes |= t.suspendedLanes & s),
      tt === t &&
        (st & s) === s &&
        (Ze === 4 || (Ze === 3 && (st & 130023424) === st && 500 > We() - Mu)
          ? hr(t, 0)
          : (Iu |= s)),
      yt(t, n));
  }
  function _h(t, n) {
    n === 0 &&
      ((t.mode & 1) === 0
        ? (n = 1)
        : ((n = Ir), (Ir <<= 1), (Ir & 130023424) === 0 && (Ir = 4194304)));
    var s = ft();
    ((t = pn(t, n)), t !== null && (rr(t, n, s), yt(t, s)));
  }
  function Xy(t) {
    var n = t.memoizedState,
      s = 0;
    (n !== null && (s = n.retryLane), _h(t, s));
  }
  function Ky(t, n) {
    var s = 0;
    switch (t.tag) {
      case 13:
        var a = t.stateNode,
          d = t.memoizedState;
        d !== null && (s = d.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      default:
        throw Error(o(314));
    }
    (a !== null && a.delete(n), _h(t, s));
  }
  var bh;
  bh = function (t, n, s) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps || ht.current) mt = !0;
      else {
        if ((t.lanes & s) === 0 && (n.flags & 128) === 0)
          return ((mt = !1), zy(t, n, s));
        mt = (t.flags & 131072) !== 0;
      }
    else ((mt = !1), Fe && (n.flags & 1048576) !== 0 && sf(n, Ni, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 2:
        var a = n.type;
        (Fi(t, n), (t = n.pendingProps));
        var d = Hr(n, it.current);
        (Xr(n, s), (d = lu(null, n, a, t, d, s)));
        var m = au();
        return (
          (n.flags |= 1),
          typeof d == "object" &&
          d !== null &&
          typeof d.render == "function" &&
          d.$$typeof === void 0
            ? ((n.tag = 1),
              (n.memoizedState = null),
              (n.updateQueue = null),
              pt(a) ? ((m = !0), Ei(n)) : (m = !1),
              (n.memoizedState =
                d.state !== null && d.state !== void 0 ? d.state : null),
              eu(n),
              (d.updater = Di),
              (n.stateNode = d),
              (d._reactInternals = n),
              pu(n, a, t, s),
              (n = vu(null, n, a, !0, m, s)))
            : ((n.tag = 0), Fe && m && Wa(n), dt(null, n, d, s), (n = n.child)),
          n
        );
      case 16:
        a = n.elementType;
        e: {
          switch (
            (Fi(t, n),
            (t = n.pendingProps),
            (d = a._init),
            (a = d(a._payload)),
            (n.type = a),
            (d = n.tag = Gy(a)),
            (t = Ot(a, t)),
            d)
          ) {
            case 0:
              n = yu(null, n, a, t, s);
              break e;
            case 1:
              n = Jf(null, n, a, t, s);
              break e;
            case 11:
              n = Kf(null, n, a, t, s);
              break e;
            case 14:
              n = Qf(null, n, a, Ot(a.type, t), s);
              break e;
          }
          throw Error(o(306, a, ""));
        }
        return n;
      case 0:
        return (
          (a = n.type),
          (d = n.pendingProps),
          (d = n.elementType === a ? d : Ot(a, d)),
          yu(t, n, a, d, s)
        );
      case 1:
        return (
          (a = n.type),
          (d = n.pendingProps),
          (d = n.elementType === a ? d : Ot(a, d)),
          Jf(t, n, a, d, s)
        );
      case 3:
        e: {
          if ((eh(n), t === null)) throw Error(o(387));
          ((a = n.pendingProps),
            (m = n.memoizedState),
            (d = m.element),
            mf(t, n),
            Pi(n, a, null, s));
          var k = n.memoizedState;
          if (((a = k.element), m.isDehydrated))
            if (
              ((m = {
                element: a,
                isDehydrated: !1,
                cache: k.cache,
                pendingSuspenseBoundaries: k.pendingSuspenseBoundaries,
                transitions: k.transitions,
              }),
              (n.updateQueue.baseState = m),
              (n.memoizedState = m),
              n.flags & 256)
            ) {
              ((d = Qr(Error(o(423)), n)), (n = th(t, n, a, s, d)));
              break e;
            } else if (a !== d) {
              ((d = Qr(Error(o(424)), n)), (n = th(t, n, a, s, d)));
              break e;
            } else
              for (
                kt = Rn(n.stateNode.containerInfo.firstChild),
                  Et = n,
                  Fe = !0,
                  Dt = null,
                  s = hf(n, null, a, s),
                  n.child = s;
                s;
              )
                ((s.flags = (s.flags & -3) | 4096), (s = s.sibling));
          else {
            if ((Wr(), a === d)) {
              n = gn(t, n, s);
              break e;
            }
            dt(t, n, a, s);
          }
          n = n.child;
        }
        return n;
      case 5:
        return (
          vf(n),
          t === null && Xa(n),
          (a = n.type),
          (d = n.pendingProps),
          (m = t !== null ? t.memoizedProps : null),
          (k = d.children),
          Da(a, d) ? (k = null) : m !== null && Da(a, m) && (n.flags |= 32),
          Zf(t, n),
          dt(t, n, k, s),
          n.child
        );
      case 6:
        return (t === null && Xa(n), null);
      case 13:
        return nh(t, n, s);
      case 4:
        return (
          tu(n, n.stateNode.containerInfo),
          (a = n.pendingProps),
          t === null ? (n.child = Ur(n, null, a, s)) : dt(t, n, a, s),
          n.child
        );
      case 11:
        return (
          (a = n.type),
          (d = n.pendingProps),
          (d = n.elementType === a ? d : Ot(a, d)),
          Kf(t, n, a, d, s)
        );
      case 7:
        return (dt(t, n, n.pendingProps, s), n.child);
      case 8:
        return (dt(t, n, n.pendingProps.children, s), n.child);
      case 12:
        return (dt(t, n, n.pendingProps.children, s), n.child);
      case 10:
        e: {
          if (
            ((a = n.type._context),
            (d = n.pendingProps),
            (m = n.memoizedProps),
            (k = d.value),
            Ae(ji, a._currentValue),
            (a._currentValue = k),
            m !== null)
          )
            if (At(m.value, k)) {
              if (m.children === d.children && !ht.current) {
                n = gn(t, n, s);
                break e;
              }
            } else
              for (m = n.child, m !== null && (m.return = n); m !== null; ) {
                var T = m.dependencies;
                if (T !== null) {
                  k = m.child;
                  for (var D = T.firstContext; D !== null; ) {
                    if (D.context === a) {
                      if (m.tag === 1) {
                        ((D = mn(-1, s & -s)), (D.tag = 2));
                        var ee = m.updateQueue;
                        if (ee !== null) {
                          ee = ee.shared;
                          var fe = ee.pending;
                          (fe === null
                            ? (D.next = D)
                            : ((D.next = fe.next), (fe.next = D)),
                            (ee.pending = D));
                        }
                      }
                      ((m.lanes |= s),
                        (D = m.alternate),
                        D !== null && (D.lanes |= s),
                        Za(m.return, s, n),
                        (T.lanes |= s));
                      break;
                    }
                    D = D.next;
                  }
                } else if (m.tag === 10) k = m.type === n.type ? null : m.child;
                else if (m.tag === 18) {
                  if (((k = m.return), k === null)) throw Error(o(341));
                  ((k.lanes |= s),
                    (T = k.alternate),
                    T !== null && (T.lanes |= s),
                    Za(k, s, n),
                    (k = m.sibling));
                } else k = m.child;
                if (k !== null) k.return = m;
                else
                  for (k = m; k !== null; ) {
                    if (k === n) {
                      k = null;
                      break;
                    }
                    if (((m = k.sibling), m !== null)) {
                      ((m.return = k.return), (k = m));
                      break;
                    }
                    k = k.return;
                  }
                m = k;
              }
          (dt(t, n, d.children, s), (n = n.child));
        }
        return n;
      case 9:
        return (
          (d = n.type),
          (a = n.pendingProps.children),
          Xr(n, s),
          (d = Rt(d)),
          (a = a(d)),
          (n.flags |= 1),
          dt(t, n, a, s),
          n.child
        );
      case 14:
        return (
          (a = n.type),
          (d = Ot(a, n.pendingProps)),
          (d = Ot(a.type, d)),
          Qf(t, n, a, d, s)
        );
      case 15:
        return Gf(t, n, n.type, n.pendingProps, s);
      case 17:
        return (
          (a = n.type),
          (d = n.pendingProps),
          (d = n.elementType === a ? d : Ot(a, d)),
          Fi(t, n),
          (n.tag = 1),
          pt(a) ? ((t = !0), Ei(n)) : (t = !1),
          Xr(n, s),
          Hf(n, a, d),
          pu(n, a, d, s),
          vu(null, n, a, !0, t, s)
        );
      case 19:
        return oh(t, n, s);
      case 22:
        return qf(t, n, s);
    }
    throw Error(o(156, n.tag));
  };
  function jh(t, n) {
    return Zs(t, n);
  }
  function Qy(t, n, s, a) {
    ((this.tag = t),
      (this.key = s),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = n),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function zt(t, n, s, a) {
    return new Qy(t, n, s, a);
  }
  function Du(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Gy(t) {
    if (typeof t == "function") return Du(t) ? 1 : 0;
    if (t != null) {
      if (((t = t.$$typeof), t === U)) return 11;
      if (t === K) return 14;
    }
    return 2;
  }
  function Vn(t, n) {
    var s = t.alternate;
    return (
      s === null
        ? ((s = zt(t.tag, n, t.key, t.mode)),
          (s.elementType = t.elementType),
          (s.type = t.type),
          (s.stateNode = t.stateNode),
          (s.alternate = t),
          (t.alternate = s))
        : ((s.pendingProps = n),
          (s.type = t.type),
          (s.flags = 0),
          (s.subtreeFlags = 0),
          (s.deletions = null)),
      (s.flags = t.flags & 14680064),
      (s.childLanes = t.childLanes),
      (s.lanes = t.lanes),
      (s.child = t.child),
      (s.memoizedProps = t.memoizedProps),
      (s.memoizedState = t.memoizedState),
      (s.updateQueue = t.updateQueue),
      (n = t.dependencies),
      (s.dependencies =
        n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (s.sibling = t.sibling),
      (s.index = t.index),
      (s.ref = t.ref),
      s
    );
  }
  function qi(t, n, s, a, d, m) {
    var k = 2;
    if (((a = t), typeof t == "function")) Du(t) && (k = 1);
    else if (typeof t == "string") k = 5;
    else
      e: switch (t) {
        case P:
          return mr(s.children, d, m, n);
        case H:
          ((k = 8), (d |= 8));
          break;
        case V:
          return (
            (t = zt(12, s, n, d | 2)),
            (t.elementType = V),
            (t.lanes = m),
            t
          );
        case te:
          return (
            (t = zt(13, s, n, d)),
            (t.elementType = te),
            (t.lanes = m),
            t
          );
        case L:
          return ((t = zt(19, s, n, d)), (t.elementType = L), (t.lanes = m), t);
        case X:
          return Zi(s, d, m, n);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case re:
                k = 10;
                break e;
              case Y:
                k = 9;
                break e;
              case U:
                k = 11;
                break e;
              case K:
                k = 14;
                break e;
              case B:
                ((k = 16), (a = null));
                break e;
            }
          throw Error(o(130, t == null ? t : typeof t, ""));
      }
    return (
      (n = zt(k, s, n, d)),
      (n.elementType = t),
      (n.type = a),
      (n.lanes = m),
      n
    );
  }
  function mr(t, n, s, a) {
    return ((t = zt(7, t, a, n)), (t.lanes = s), t);
  }
  function Zi(t, n, s, a) {
    return (
      (t = zt(22, t, a, n)),
      (t.elementType = X),
      (t.lanes = s),
      (t.stateNode = { isHidden: !1 }),
      t
    );
  }
  function Ou(t, n, s) {
    return ((t = zt(6, t, null, n)), (t.lanes = s), t);
  }
  function Fu(t, n, s) {
    return (
      (n = zt(4, t.children !== null ? t.children : [], t.key, n)),
      (n.lanes = s),
      (n.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      n
    );
  }
  function qy(t, n, s, a, d) {
    ((this.tag = n),
      (this.containerInfo = t),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Po(0)),
      (this.expirationTimes = Po(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Po(0)),
      (this.identifierPrefix = a),
      (this.onRecoverableError = d),
      (this.mutableSourceEagerHydrationData = null));
  }
  function Hu(t, n, s, a, d, m, k, T, D) {
    return (
      (t = new qy(t, n, s, T, D)),
      n === 1 ? ((n = 1), m === !0 && (n |= 8)) : (n = 0),
      (m = zt(3, null, null, n)),
      (t.current = m),
      (m.stateNode = t),
      (m.memoizedState = {
        element: a,
        isDehydrated: s,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      eu(m),
      t
    );
  }
  function Zy(t, n, s) {
    var a =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: A,
      key: a == null ? null : "" + a,
      children: t,
      containerInfo: n,
      implementation: s,
    };
  }
  function Ih(t) {
    if (!t) return Ln;
    t = t._reactInternals;
    e: {
      if (Kt(t) !== t || t.tag !== 1) throw Error(o(170));
      var n = t;
      do {
        switch (n.tag) {
          case 3:
            n = n.stateNode.context;
            break e;
          case 1:
            if (pt(n.type)) {
              n = n.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        n = n.return;
      } while (n !== null);
      throw Error(o(171));
    }
    if (t.tag === 1) {
      var s = t.type;
      if (pt(s)) return nf(t, s, n);
    }
    return n;
  }
  function Mh(t, n, s, a, d, m, k, T, D) {
    return (
      (t = Hu(s, a, !0, t, d, m, k, T, D)),
      (t.context = Ih(null)),
      (s = t.current),
      (a = ft()),
      (d = Hn(s)),
      (m = mn(a, d)),
      (m.callback = n ?? null),
      An(s, m, d),
      (t.current.lanes = d),
      rr(t, d, a),
      yt(t, a),
      t
    );
  }
  function Ji(t, n, s, a) {
    var d = n.current,
      m = ft(),
      k = Hn(d);
    return (
      (s = Ih(s)),
      n.context === null ? (n.context = s) : (n.pendingContext = s),
      (n = mn(m, k)),
      (n.payload = { element: t }),
      (a = a === void 0 ? null : a),
      a !== null && (n.callback = a),
      (t = An(d, n, k)),
      t !== null && (Bt(t, d, k, m), Mi(t, d, k)),
      k
    );
  }
  function el(t) {
    if (((t = t.current), !t.child)) return null;
    switch (t.child.tag) {
      case 5:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function Ph(t, n) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var s = t.retryLane;
      t.retryLane = s !== 0 && s < n ? s : n;
    }
  }
  function Bu(t, n) {
    (Ph(t, n), (t = t.alternate) && Ph(t, n));
  }
  function Jy() {
    return null;
  }
  var Rh =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          console.error(t);
        };
  function Vu(t) {
    this._internalRoot = t;
  }
  ((tl.prototype.render = Vu.prototype.render =
    function (t) {
      var n = this._internalRoot;
      if (n === null) throw Error(o(409));
      Ji(t, n, null, null);
    }),
    (tl.prototype.unmount = Vu.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var n = t.containerInfo;
          (fr(function () {
            Ji(null, t, null, null);
          }),
            (n[cn] = null));
        }
      }));
  function tl(t) {
    this._internalRoot = t;
  }
  tl.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var n = pd();
      t = { blockedOn: null, target: t, priority: n };
      for (var s = 0; s < In.length && n !== 0 && n < In[s].priority; s++);
      (In.splice(s, 0, t), s === 0 && yd(t));
    }
  };
  function Wu(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function nl(t) {
    return !(
      !t ||
      (t.nodeType !== 1 &&
        t.nodeType !== 9 &&
        t.nodeType !== 11 &&
        (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Th() {}
  function ev(t, n, s, a, d) {
    if (d) {
      if (typeof a == "function") {
        var m = a;
        a = function () {
          var ee = el(k);
          m.call(ee);
        };
      }
      var k = Mh(n, a, t, 0, null, !1, !1, "", Th);
      return (
        (t._reactRootContainer = k),
        (t[cn] = k.current),
        Uo(t.nodeType === 8 ? t.parentNode : t),
        fr(),
        k
      );
    }
    for (; (d = t.lastChild); ) t.removeChild(d);
    if (typeof a == "function") {
      var T = a;
      a = function () {
        var ee = el(D);
        T.call(ee);
      };
    }
    var D = Hu(t, 0, !1, null, null, !1, !1, "", Th);
    return (
      (t._reactRootContainer = D),
      (t[cn] = D.current),
      Uo(t.nodeType === 8 ? t.parentNode : t),
      fr(function () {
        Ji(n, D, s, a);
      }),
      D
    );
  }
  function rl(t, n, s, a, d) {
    var m = s._reactRootContainer;
    if (m) {
      var k = m;
      if (typeof d == "function") {
        var T = d;
        d = function () {
          var D = el(k);
          T.call(D);
        };
      }
      Ji(n, k, t, d);
    } else k = ev(s, n, t, d, a);
    return el(k);
  }
  ((fd = function (t) {
    switch (t.tag) {
      case 3:
        var n = t.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var s = Qt(n.pendingLanes);
          s !== 0 &&
            (pa(n, s | 1),
            yt(n, We()),
            (Le & 6) === 0 && ((Zr = We() + 500), zn()));
        }
        break;
      case 13:
        (fr(function () {
          var a = pn(t, 1);
          if (a !== null) {
            var d = ft();
            Bt(a, t, 1, d);
          }
        }),
          Bu(t, 1));
    }
  }),
    (ma = function (t) {
      if (t.tag === 13) {
        var n = pn(t, 134217728);
        if (n !== null) {
          var s = ft();
          Bt(n, t, 134217728, s);
        }
        Bu(t, 134217728);
      }
    }),
    (hd = function (t) {
      if (t.tag === 13) {
        var n = Hn(t),
          s = pn(t, n);
        if (s !== null) {
          var a = ft();
          Bt(s, t, n, a);
        }
        Bu(t, n);
      }
    }),
    (pd = function () {
      return $e;
    }),
    (md = function (t, n) {
      var s = $e;
      try {
        return (($e = t), n());
      } finally {
        $e = s;
      }
    }),
    (ko = function (t, n, s) {
      switch (n) {
        case "input":
          if ((Se(t, s), (n = s.name), s.type === "radio" && n != null)) {
            for (s = t; s.parentNode; ) s = s.parentNode;
            for (
              s = s.querySelectorAll(
                "input[name=" + JSON.stringify("" + n) + '][type="radio"]'
              ),
                n = 0;
              n < s.length;
              n++
            ) {
              var a = s[n];
              if (a !== t && a.form === t.form) {
                var d = wi(a);
                if (!d) throw Error(o(90));
                (ae(a), Se(a, d));
              }
            }
          }
          break;
        case "textarea":
          sn(t, s);
          break;
        case "select":
          ((n = s.value), n != null && Re(t, !!s.multiple, n, !1));
      }
    }),
    (Xs = zu),
    (Ks = fr));
  var tv = { usingClientEntryPoint: !1, Events: [Ko, Or, wi, Us, Ys, zu] },
    as = {
      findFiberByHostInstance: or,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    nv = {
      bundleType: as.bundleType,
      version: as.version,
      rendererPackageName: as.rendererPackageName,
      rendererConfig: as.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: j.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (t) {
        return ((t = Gs(t)), t === null ? null : t.stateNode);
      },
      findFiberByHostInstance: as.findFiberByHostInstance || Jy,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ol = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ol.isDisabled && ol.supportsFiber)
      try {
        ((nr = ol.inject(nv)), (It = ol));
      } catch {}
  }
  return (
    (vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tv),
    (vt.createPortal = function (t, n) {
      var s =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Wu(n)) throw Error(o(200));
      return Zy(t, n, null, s);
    }),
    (vt.createRoot = function (t, n) {
      if (!Wu(t)) throw Error(o(299));
      var s = !1,
        a = "",
        d = Rh;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (s = !0),
          n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (d = n.onRecoverableError)),
        (n = Hu(t, 1, !1, null, null, s, !1, a, d)),
        (t[cn] = n.current),
        Uo(t.nodeType === 8 ? t.parentNode : t),
        new Vu(n)
      );
    }),
    (vt.findDOMNode = function (t) {
      if (t == null) return null;
      if (t.nodeType === 1) return t;
      var n = t._reactInternals;
      if (n === void 0)
        throw typeof t.render == "function"
          ? Error(o(188))
          : ((t = Object.keys(t).join(",")), Error(o(268, t)));
      return ((t = Gs(n)), (t = t === null ? null : t.stateNode), t);
    }),
    (vt.flushSync = function (t) {
      return fr(t);
    }),
    (vt.hydrate = function (t, n, s) {
      if (!nl(n)) throw Error(o(200));
      return rl(null, t, n, !0, s);
    }),
    (vt.hydrateRoot = function (t, n, s) {
      if (!Wu(t)) throw Error(o(405));
      var a = (s != null && s.hydratedSources) || null,
        d = !1,
        m = "",
        k = Rh;
      if (
        (s != null &&
          (s.unstable_strictMode === !0 && (d = !0),
          s.identifierPrefix !== void 0 && (m = s.identifierPrefix),
          s.onRecoverableError !== void 0 && (k = s.onRecoverableError)),
        (n = Mh(n, null, t, 1, s ?? null, d, !1, m, k)),
        (t[cn] = n.current),
        Uo(t),
        a)
      )
        for (t = 0; t < a.length; t++)
          ((s = a[t]),
            (d = s._getVersion),
            (d = d(s._source)),
            n.mutableSourceEagerHydrationData == null
              ? (n.mutableSourceEagerHydrationData = [s, d])
              : n.mutableSourceEagerHydrationData.push(s, d));
      return new tl(n);
    }),
    (vt.render = function (t, n, s) {
      if (!nl(n)) throw Error(o(200));
      return rl(null, t, n, !1, s);
    }),
    (vt.unmountComponentAtNode = function (t) {
      if (!nl(t)) throw Error(o(40));
      return t._reactRootContainer
        ? (fr(function () {
            rl(null, null, t, !1, function () {
              ((t._reactRootContainer = null), (t[cn] = null));
            });
          }),
          !0)
        : !1;
    }),
    (vt.unstable_batchedUpdates = zu),
    (vt.unstable_renderSubtreeIntoContainer = function (t, n, s, a) {
      if (!nl(s)) throw Error(o(200));
      if (t == null || t._reactInternals === void 0) throw Error(o(38));
      return rl(t, n, s, !1, a);
    }),
    (vt.version = "18.3.1-next-f1338f8080-20240426"),
    vt
  );
}
var Hh;
function hm() {
  if (Hh) return Xu.exports;
  Hh = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (r) {
        console.error(r);
      }
  }
  return (e(), (Xu.exports = dv()), Xu.exports);
}
var Bh;
function fv() {
  if (Bh) return sl;
  Bh = 1;
  var e = hm();
  return ((sl.createRoot = e.createRoot), (sl.hydrateRoot = e.hydrateRoot), sl);
}
var hv = fv();
const pv = $c(hv);
/**
 * react-router v7.11.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Vh = "popstate";
function mv(e = {}) {
  function r(i, l) {
    let { pathname: u, search: c, hash: f } = i.location;
    return gc(
      "",
      { pathname: u, search: c, hash: f },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default"
    );
  }
  function o(i, l) {
    return typeof l == "string" ? l : ws(l);
  }
  return yv(r, o, null, e);
}
function He(e, r) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(r);
}
function $t(e, r) {
  if (!e) {
    typeof console < "u" && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function gv() {
  return Math.random().toString(36).substring(2, 10);
}
function Wh(e, r) {
  return { usr: e.state, key: e.key, idx: r };
}
function gc(e, r, o = null, i) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof r == "string" ? go(r) : r),
    state: o,
    key: (r && r.key) || i || gv(),
  };
}
function ws({ pathname: e = "/", search: r = "", hash: o = "" }) {
  return (
    r && r !== "?" && (e += r.charAt(0) === "?" ? r : "?" + r),
    o && o !== "#" && (e += o.charAt(0) === "#" ? o : "#" + o),
    e
  );
}
function go(e) {
  let r = {};
  if (e) {
    let o = e.indexOf("#");
    o >= 0 && ((r.hash = e.substring(o)), (e = e.substring(0, o)));
    let i = e.indexOf("?");
    (i >= 0 && ((r.search = e.substring(i)), (e = e.substring(0, i))),
      e && (r.pathname = e));
  }
  return r;
}
function yv(e, r, o, i = {}) {
  let { window: l = document.defaultView, v5Compat: u = !1 } = i,
    c = l.history,
    f = "POP",
    h = null,
    p = x();
  p == null && ((p = 0), c.replaceState({ ...c.state, idx: p }, ""));
  function x() {
    return (c.state || { idx: null }).idx;
  }
  function g() {
    f = "POP";
    let N = x(),
      _ = N == null ? null : N - p;
    ((p = N), h && h({ action: f, location: b.location, delta: _ }));
  }
  function v(N, _) {
    f = "PUSH";
    let R = gc(b.location, N, _);
    p = x() + 1;
    let E = Wh(R, p),
      j = b.createHref(R);
    try {
      c.pushState(E, "", j);
    } catch (O) {
      if (O instanceof DOMException && O.name === "DataCloneError") throw O;
      l.location.assign(j);
    }
    u && h && h({ action: f, location: b.location, delta: 1 });
  }
  function S(N, _) {
    f = "REPLACE";
    let R = gc(b.location, N, _);
    p = x();
    let E = Wh(R, p),
      j = b.createHref(R);
    (c.replaceState(E, "", j),
      u && h && h({ action: f, location: b.location, delta: 0 }));
  }
  function w(N) {
    return vv(N);
  }
  let b = {
    get action() {
      return f;
    },
    get location() {
      return e(l, c);
    },
    listen(N) {
      if (h) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(Vh, g),
        (h = N),
        () => {
          (l.removeEventListener(Vh, g), (h = null));
        }
      );
    },
    createHref(N) {
      return r(l, N);
    },
    createURL: w,
    encodeLocation(N) {
      let _ = w(N);
      return { pathname: _.pathname, search: _.search, hash: _.hash };
    },
    push: v,
    replace: S,
    go(N) {
      return c.go(N);
    },
  };
  return b;
}
function vv(e, r = !1) {
  let o = "http://localhost";
  (typeof window < "u" &&
    (o =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    He(o, "No window.location.(origin|href) available to create URL"));
  let i = typeof e == "string" ? e : ws(e);
  return (
    (i = i.replace(/ $/, "%20")),
    !r && i.startsWith("//") && (i = o + i),
    new URL(i, o)
  );
}
function pm(e, r, o = "/") {
  return xv(e, r, o, !1);
}
function xv(e, r, o, i) {
  let l = typeof r == "string" ? go(r) : r,
    u = Sn(l.pathname || "/", o);
  if (u == null) return null;
  let c = mm(e);
  wv(c);
  let f = null;
  for (let h = 0; f == null && h < c.length; ++h) {
    let p = Pv(u);
    f = Iv(c[h], p, i);
  }
  return f;
}
function mm(e, r = [], o = [], i = "", l = !1) {
  let u = (c, f, h = l, p) => {
    let x = {
      relativePath: p === void 0 ? c.path || "" : p,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: f,
      route: c,
    };
    if (x.relativePath.startsWith("/")) {
      if (!x.relativePath.startsWith(i) && h) return;
      (He(
        x.relativePath.startsWith(i),
        `Absolute route path "${x.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (x.relativePath = x.relativePath.slice(i.length)));
    }
    let g = wn([i, x.relativePath]),
      v = o.concat(x);
    (c.children &&
      c.children.length > 0 &&
      (He(
        c.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
      ),
      mm(c.children, r, v, g, h)),
      !(c.path == null && !c.index) &&
        r.push({ path: g, score: bv(g, c.index), routesMeta: v }));
  };
  return (
    e.forEach((c, f) => {
      var h;
      if (c.path === "" || !((h = c.path) != null && h.includes("?"))) u(c, f);
      else for (let p of gm(c.path)) u(c, f, !0, p);
    }),
    r
  );
}
function gm(e) {
  let r = e.split("/");
  if (r.length === 0) return [];
  let [o, ...i] = r,
    l = o.endsWith("?"),
    u = o.replace(/\?$/, "");
  if (i.length === 0) return l ? [u, ""] : [u];
  let c = gm(i.join("/")),
    f = [];
  return (
    f.push(...c.map((h) => (h === "" ? u : [u, h].join("/")))),
    l && f.push(...c),
    f.map((h) => (e.startsWith("/") && h === "" ? "/" : h))
  );
}
function wv(e) {
  e.sort((r, o) =>
    r.score !== o.score
      ? o.score - r.score
      : jv(
          r.routesMeta.map((i) => i.childrenIndex),
          o.routesMeta.map((i) => i.childrenIndex)
        )
  );
}
var Sv = /^:[\w-]+$/,
  Ev = 3,
  kv = 2,
  Cv = 1,
  Nv = 10,
  _v = -2,
  Uh = (e) => e === "*";
function bv(e, r) {
  let o = e.split("/"),
    i = o.length;
  return (
    o.some(Uh) && (i += _v),
    r && (i += kv),
    o
      .filter((l) => !Uh(l))
      .reduce((l, u) => l + (Sv.test(u) ? Ev : u === "" ? Cv : Nv), i)
  );
}
function jv(e, r) {
  return e.length === r.length && e.slice(0, -1).every((i, l) => i === r[l])
    ? e[e.length - 1] - r[r.length - 1]
    : 0;
}
function Iv(e, r, o = !1) {
  let { routesMeta: i } = e,
    l = {},
    u = "/",
    c = [];
  for (let f = 0; f < i.length; ++f) {
    let h = i[f],
      p = f === i.length - 1,
      x = u === "/" ? r : r.slice(u.length) || "/",
      g = _l(
        { path: h.relativePath, caseSensitive: h.caseSensitive, end: p },
        x
      ),
      v = h.route;
    if (
      (!g &&
        p &&
        o &&
        !i[i.length - 1].route.index &&
        (g = _l(
          { path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 },
          x
        )),
      !g)
    )
      return null;
    (Object.assign(l, g.params),
      c.push({
        params: l,
        pathname: wn([u, g.pathname]),
        pathnameBase: zv(wn([u, g.pathnameBase])),
        route: v,
      }),
      g.pathnameBase !== "/" && (u = wn([u, g.pathnameBase])));
  }
  return c;
}
function _l(e, r) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [o, i] = Mv(e.path, e.caseSensitive, e.end),
    l = r.match(o);
  if (!l) return null;
  let u = l[0],
    c = u.replace(/(.)\/+$/, "$1"),
    f = l.slice(1);
  return {
    params: i.reduce((p, { paramName: x, isOptional: g }, v) => {
      if (x === "*") {
        let w = f[v] || "";
        c = u.slice(0, u.length - w.length).replace(/(.)\/+$/, "$1");
      }
      const S = f[v];
      return (
        g && !S ? (p[x] = void 0) : (p[x] = (S || "").replace(/%2F/g, "/")),
        p
      );
    }, {}),
    pathname: u,
    pathnameBase: c,
    pattern: e,
  };
}
function Mv(e, r = !1, o = !0) {
  $t(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let i = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (c, f, h) => (
            i.push({ paramName: f, isOptional: h != null }),
            h ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    e.endsWith("*")
      ? (i.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : o
        ? (l += "\\/*$")
        : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, r ? void 0 : "i"), i]
  );
}
function Pv(e) {
  try {
    return e
      .split("/")
      .map((r) => decodeURIComponent(r).replace(/\//g, "%2F"))
      .join("/");
  } catch (r) {
    return (
      $t(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`
      ),
      e
    );
  }
}
function Sn(e, r) {
  if (r === "/") return e;
  if (!e.toLowerCase().startsWith(r.toLowerCase())) return null;
  let o = r.endsWith("/") ? r.length - 1 : r.length,
    i = e.charAt(o);
  return i && i !== "/" ? null : e.slice(o) || "/";
}
var ym = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Rv = (e) => ym.test(e);
function Tv(e, r = "/") {
  let {
      pathname: o,
      search: i = "",
      hash: l = "",
    } = typeof e == "string" ? go(e) : e,
    u;
  if (o)
    if (Rv(o)) u = o;
    else {
      if (o.includes("//")) {
        let c = o;
        ((o = o.replace(/\/\/+/g, "/")),
          $t(
            !1,
            `Pathnames cannot have embedded double slashes - normalizing ${c} -> ${o}`
          ));
      }
      o.startsWith("/") ? (u = Yh(o.substring(1), "/")) : (u = Yh(o, r));
    }
  else u = r;
  return { pathname: u, search: $v(i), hash: Av(l) };
}
function Yh(e, r) {
  let o = r.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? o.length > 1 && o.pop() : l !== "." && o.push(l);
    }),
    o.length > 1 ? o.join("/") : "/"
  );
}
function Gu(e, r, o, i) {
  return `Cannot include a '${e}' character in a manually specified \`to.${r}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Lv(e) {
  return e.filter(
    (r, o) => o === 0 || (r.route.path && r.route.path.length > 0)
  );
}
function Ac(e) {
  let r = Lv(e);
  return r.map((o, i) => (i === r.length - 1 ? o.pathname : o.pathnameBase));
}
function Dc(e, r, o, i = !1) {
  let l;
  typeof e == "string"
    ? (l = go(e))
    : ((l = { ...e }),
      He(
        !l.pathname || !l.pathname.includes("?"),
        Gu("?", "pathname", "search", l)
      ),
      He(
        !l.pathname || !l.pathname.includes("#"),
        Gu("#", "pathname", "hash", l)
      ),
      He(!l.search || !l.search.includes("#"), Gu("#", "search", "hash", l)));
  let u = e === "" || l.pathname === "",
    c = u ? "/" : l.pathname,
    f;
  if (c == null) f = o;
  else {
    let g = r.length - 1;
    if (!i && c.startsWith("..")) {
      let v = c.split("/");
      for (; v[0] === ".."; ) (v.shift(), (g -= 1));
      l.pathname = v.join("/");
    }
    f = g >= 0 ? r[g] : "/";
  }
  let h = Tv(l, f),
    p = c && c !== "/" && c.endsWith("/"),
    x = (u || c === ".") && o.endsWith("/");
  return (!h.pathname.endsWith("/") && (p || x) && (h.pathname += "/"), h);
}
var wn = (e) => e.join("/").replace(/\/\/+/g, "/"),
  zv = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  $v = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Av = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  Dv = class {
    constructor(e, r, o, i = !1) {
      ((this.status = e),
        (this.statusText = r || ""),
        (this.internal = i),
        o instanceof Error
          ? ((this.data = o.toString()), (this.error = o))
          : (this.data = o));
    }
  };
function Ov(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
function Fv(e) {
  return (
    e
      .map((r) => r.route.path)
      .filter(Boolean)
      .join("/")
      .replace(/\/\/*/g, "/") || "/"
  );
}
var vm =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function xm(e, r) {
  let o = e;
  if (typeof o != "string" || !ym.test(o))
    return { absoluteURL: void 0, isExternal: !1, to: o };
  let i = o,
    l = !1;
  if (vm)
    try {
      let u = new URL(window.location.href),
        c = o.startsWith("//") ? new URL(u.protocol + o) : new URL(o),
        f = Sn(c.pathname, r);
      c.origin === u.origin && f != null
        ? (o = f + c.search + c.hash)
        : (l = !0);
    } catch {
      $t(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: i, isExternal: l, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var wm = ["POST", "PUT", "PATCH", "DELETE"];
new Set(wm);
var Hv = ["GET", ...wm];
new Set(Hv);
var yo = C.createContext(null);
yo.displayName = "DataRouter";
var Ol = C.createContext(null);
Ol.displayName = "DataRouterState";
var Bv = C.createContext(!1),
  Sm = C.createContext({ isTransitioning: !1 });
Sm.displayName = "ViewTransition";
var Vv = C.createContext(new Map());
Vv.displayName = "Fetchers";
var Wv = C.createContext(null);
Wv.displayName = "Await";
var bt = C.createContext(null);
bt.displayName = "Navigation";
var Ts = C.createContext(null);
Ts.displayName = "Location";
var rn = C.createContext({ outlet: null, matches: [], isDataRoute: !1 });
rn.displayName = "Route";
var Oc = C.createContext(null);
Oc.displayName = "RouteError";
var Em = "REACT_ROUTER_ERROR",
  Uv = "REDIRECT",
  Yv = "ROUTE_ERROR_RESPONSE";
function Xv(e) {
  if (e.startsWith(`${Em}:${Uv}:{`))
    try {
      let r = JSON.parse(e.slice(28));
      if (
        typeof r == "object" &&
        r &&
        typeof r.status == "number" &&
        typeof r.statusText == "string" &&
        typeof r.location == "string" &&
        typeof r.reloadDocument == "boolean" &&
        typeof r.replace == "boolean"
      )
        return r;
    } catch {}
}
function Kv(e) {
  if (e.startsWith(`${Em}:${Yv}:{`))
    try {
      let r = JSON.parse(e.slice(40));
      if (
        typeof r == "object" &&
        r &&
        typeof r.status == "number" &&
        typeof r.statusText == "string"
      )
        return new Dv(r.status, r.statusText, r.data);
    } catch {}
}
function Qv(e, { relative: r } = {}) {
  He(
    vo(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: o, navigator: i } = C.useContext(bt),
    { hash: l, pathname: u, search: c } = Ls(e, { relative: r }),
    f = u;
  return (
    o !== "/" && (f = u === "/" ? o : wn([o, u])),
    i.createHref({ pathname: f, search: c, hash: l })
  );
}
function vo() {
  return C.useContext(Ts) != null;
}
function Qn() {
  return (
    He(
      vo(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    C.useContext(Ts).location
  );
}
var km =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Cm(e) {
  C.useContext(bt).static || C.useLayoutEffect(e);
}
function Nm() {
  let { isDataRoute: e } = C.useContext(rn);
  return e ? ax() : Gv();
}
function Gv() {
  He(
    vo(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = C.useContext(yo),
    { basename: r, navigator: o } = C.useContext(bt),
    { matches: i } = C.useContext(rn),
    { pathname: l } = Qn(),
    u = JSON.stringify(Ac(i)),
    c = C.useRef(!1);
  return (
    Cm(() => {
      c.current = !0;
    }),
    C.useCallback(
      (h, p = {}) => {
        if (($t(c.current, km), !c.current)) return;
        if (typeof h == "number") {
          o.go(h);
          return;
        }
        let x = Dc(h, JSON.parse(u), l, p.relative === "path");
        (e == null &&
          r !== "/" &&
          (x.pathname = x.pathname === "/" ? r : wn([r, x.pathname])),
          (p.replace ? o.replace : o.push)(x, p.state, p));
      },
      [r, o, u, l, e]
    )
  );
}
C.createContext(null);
function Ls(e, { relative: r } = {}) {
  let { matches: o } = C.useContext(rn),
    { pathname: i } = Qn(),
    l = JSON.stringify(Ac(o));
  return C.useMemo(() => Dc(e, JSON.parse(l), i, r === "path"), [e, l, i, r]);
}
function qv(e, r) {
  return _m(e, r);
}
function _m(e, r, o, i, l) {
  var R;
  He(
    vo(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: u } = C.useContext(bt),
    { matches: c } = C.useContext(rn),
    f = c[c.length - 1],
    h = f ? f.params : {},
    p = f ? f.pathname : "/",
    x = f ? f.pathnameBase : "/",
    g = f && f.route;
  {
    let E = (g && g.path) || "";
    jm(
      p,
      !g || E.endsWith("*") || E.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${E}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${E}"> to <Route path="${E === "/" ? "*" : `${E}/*`}">.`
    );
  }
  let v = Qn(),
    S;
  if (r) {
    let E = typeof r == "string" ? go(r) : r;
    (He(
      x === "/" || ((R = E.pathname) == null ? void 0 : R.startsWith(x)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${x}" but pathname "${E.pathname}" was given in the \`location\` prop.`
    ),
      (S = E));
  } else S = v;
  let w = S.pathname || "/",
    b = w;
  if (x !== "/") {
    let E = x.replace(/^\//, "").split("/");
    b = "/" + w.replace(/^\//, "").split("/").slice(E.length).join("/");
  }
  let N = pm(e, { pathname: b });
  ($t(
    g || N != null,
    `No routes matched location "${S.pathname}${S.search}${S.hash}" `
  ),
    $t(
      N == null ||
        N[N.length - 1].route.element !== void 0 ||
        N[N.length - 1].route.Component !== void 0 ||
        N[N.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let _ = nx(
    N &&
      N.map((E) =>
        Object.assign({}, E, {
          params: Object.assign({}, h, E.params),
          pathname: wn([
            x,
            u.encodeLocation
              ? u.encodeLocation(
                  E.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
                ).pathname
              : E.pathname,
          ]),
          pathnameBase:
            E.pathnameBase === "/"
              ? x
              : wn([
                  x,
                  u.encodeLocation
                    ? u.encodeLocation(
                        E.pathnameBase
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23")
                      ).pathname
                    : E.pathnameBase,
                ]),
        })
      ),
    c,
    o,
    i,
    l
  );
  return r && _
    ? C.createElement(
        Ts.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...S,
            },
            navigationType: "POP",
          },
        },
        _
      )
    : _;
}
function Zv() {
  let e = lx(),
    r = Ov(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    o = e instanceof Error ? e.stack : null,
    i = "rgba(200,200,200, 0.5)",
    l = { padding: "0.5rem", backgroundColor: i },
    u = { padding: "2px 4px", backgroundColor: i },
    c = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (c = C.createElement(
      C.Fragment,
      null,
      C.createElement("p", null, "💿 Hey developer 👋"),
      C.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        C.createElement("code", { style: u }, "ErrorBoundary"),
        " or",
        " ",
        C.createElement("code", { style: u }, "errorElement"),
        " prop on your route."
      )
    )),
    C.createElement(
      C.Fragment,
      null,
      C.createElement("h2", null, "Unexpected Application Error!"),
      C.createElement("h3", { style: { fontStyle: "italic" } }, r),
      o ? C.createElement("pre", { style: l }, o) : null,
      c
    )
  );
}
var Jv = C.createElement(Zv, null),
  bm = class extends C.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, r) {
      return r.location !== e.location ||
        (r.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : r.error,
            location: r.location,
            revalidation: e.revalidation || r.revalidation,
          };
    }
    componentDidCatch(e, r) {
      this.props.onError
        ? this.props.onError(e, r)
        : console.error(
            "React Router caught the following error during render",
            e
          );
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == "object" &&
        e &&
        "digest" in e &&
        typeof e.digest == "string"
      ) {
        const o = Kv(e.digest);
        o && (e = o);
      }
      let r =
        e !== void 0
          ? C.createElement(
              rn.Provider,
              { value: this.props.routeContext },
              C.createElement(Oc.Provider, {
                value: e,
                children: this.props.component,
              })
            )
          : this.props.children;
      return this.context ? C.createElement(ex, { error: e }, r) : r;
    }
  };
bm.contextType = Bv;
var qu = new WeakMap();
function ex({ children: e, error: r }) {
  let { basename: o } = C.useContext(bt);
  if (
    typeof r == "object" &&
    r &&
    "digest" in r &&
    typeof r.digest == "string"
  ) {
    let i = Xv(r.digest);
    if (i) {
      let l = qu.get(r);
      if (l) throw l;
      let u = xm(i.location, o);
      if (vm && !qu.get(r))
        if (u.isExternal || i.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(u.to, {
              replace: i.replace,
            })
          );
          throw (qu.set(r, c), c);
        }
      return C.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${u.absoluteURL || u.to}`,
      });
    }
  }
  return e;
}
function tx({ routeContext: e, match: r, children: o }) {
  let i = C.useContext(yo);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = r.route.id),
    C.createElement(rn.Provider, { value: e }, o)
  );
}
function nx(e, r = [], o = null, i = null, l = null) {
  if (e == null) {
    if (!o) return null;
    if (o.errors) e = o.matches;
    else if (r.length === 0 && !o.initialized && o.matches.length > 0)
      e = o.matches;
    else return null;
  }
  let u = e,
    c = o == null ? void 0 : o.errors;
  if (c != null) {
    let x = u.findIndex(
      (g) => g.route.id && (c == null ? void 0 : c[g.route.id]) !== void 0
    );
    (He(
      x >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(c).join(",")}`
    ),
      (u = u.slice(0, Math.min(u.length, x + 1))));
  }
  let f = !1,
    h = -1;
  if (o)
    for (let x = 0; x < u.length; x++) {
      let g = u[x];
      if (
        ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (h = x),
        g.route.id)
      ) {
        let { loaderData: v, errors: S } = o,
          w =
            g.route.loader &&
            !v.hasOwnProperty(g.route.id) &&
            (!S || S[g.route.id] === void 0);
        if (g.route.lazy || w) {
          ((f = !0), h >= 0 ? (u = u.slice(0, h + 1)) : (u = [u[0]]));
          break;
        }
      }
    }
  let p =
    o && i
      ? (x, g) => {
          var v, S;
          i(x, {
            location: o.location,
            params:
              ((S = (v = o.matches) == null ? void 0 : v[0]) == null
                ? void 0
                : S.params) ?? {},
            unstable_pattern: Fv(o.matches),
            errorInfo: g,
          });
        }
      : void 0;
  return u.reduceRight((x, g, v) => {
    let S,
      w = !1,
      b = null,
      N = null;
    o &&
      ((S = c && g.route.id ? c[g.route.id] : void 0),
      (b = g.route.errorElement || Jv),
      f &&
        (h < 0 && v === 0
          ? (jm(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (w = !0),
            (N = null))
          : h === v &&
            ((w = !0), (N = g.route.hydrateFallbackElement || null))));
    let _ = r.concat(u.slice(0, v + 1)),
      R = () => {
        let E;
        return (
          S
            ? (E = b)
            : w
              ? (E = N)
              : g.route.Component
                ? (E = C.createElement(g.route.Component, null))
                : g.route.element
                  ? (E = g.route.element)
                  : (E = x),
          C.createElement(tx, {
            match: g,
            routeContext: { outlet: x, matches: _, isDataRoute: o != null },
            children: E,
          })
        );
      };
    return o && (g.route.ErrorBoundary || g.route.errorElement || v === 0)
      ? C.createElement(bm, {
          location: o.location,
          revalidation: o.revalidation,
          component: b,
          error: S,
          children: R(),
          routeContext: { outlet: null, matches: _, isDataRoute: !0 },
          onError: p,
        })
      : R();
  }, null);
}
function Fc(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function rx(e) {
  let r = C.useContext(yo);
  return (He(r, Fc(e)), r);
}
function ox(e) {
  let r = C.useContext(Ol);
  return (He(r, Fc(e)), r);
}
function sx(e) {
  let r = C.useContext(rn);
  return (He(r, Fc(e)), r);
}
function Hc(e) {
  let r = sx(e),
    o = r.matches[r.matches.length - 1];
  return (
    He(
      o.route.id,
      `${e} can only be used on routes that contain a unique "id"`
    ),
    o.route.id
  );
}
function ix() {
  return Hc("useRouteId");
}
function lx() {
  var i;
  let e = C.useContext(Oc),
    r = ox("useRouteError"),
    o = Hc("useRouteError");
  return e !== void 0 ? e : (i = r.errors) == null ? void 0 : i[o];
}
function ax() {
  let { router: e } = rx("useNavigate"),
    r = Hc("useNavigate"),
    o = C.useRef(!1);
  return (
    Cm(() => {
      o.current = !0;
    }),
    C.useCallback(
      async (l, u = {}) => {
        ($t(o.current, km),
          o.current &&
            (typeof l == "number"
              ? await e.navigate(l)
              : await e.navigate(l, { fromRouteId: r, ...u })));
      },
      [e, r]
    )
  );
}
var Xh = {};
function jm(e, r, o) {
  !r && !Xh[e] && ((Xh[e] = !0), $t(!1, o));
}
C.memo(ux);
function ux({ routes: e, future: r, state: o, onError: i }) {
  return _m(e, void 0, o, i, r);
}
function cx({ to: e, replace: r, state: o, relative: i }) {
  He(
    vo(),
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let { static: l } = C.useContext(bt);
  $t(
    !l,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  );
  let { matches: u } = C.useContext(rn),
    { pathname: c } = Qn(),
    f = Nm(),
    h = Dc(e, Ac(u), c, i === "path"),
    p = JSON.stringify(h);
  return (
    C.useEffect(() => {
      f(JSON.parse(p), { replace: r, state: o, relative: i });
    }, [f, p, i, r, o]),
    null
  );
}
function yc(e) {
  He(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function dx({
  basename: e = "/",
  children: r = null,
  location: o,
  navigationType: i = "POP",
  navigator: l,
  static: u = !1,
  unstable_useTransitions: c,
}) {
  He(
    !vo(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let f = e.replace(/^\/*/, "/"),
    h = C.useMemo(
      () => ({
        basename: f,
        navigator: l,
        static: u,
        unstable_useTransitions: c,
        future: {},
      }),
      [f, l, u, c]
    );
  typeof o == "string" && (o = go(o));
  let {
      pathname: p = "/",
      search: x = "",
      hash: g = "",
      state: v = null,
      key: S = "default",
    } = o,
    w = C.useMemo(() => {
      let b = Sn(p, f);
      return b == null
        ? null
        : {
            location: { pathname: b, search: x, hash: g, state: v, key: S },
            navigationType: i,
          };
    }, [f, p, x, g, v, S, i]);
  return (
    $t(
      w != null,
      `<Router basename="${f}"> is not able to match the URL "${p}${x}${g}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    w == null
      ? null
      : C.createElement(
          bt.Provider,
          { value: h },
          C.createElement(Ts.Provider, { children: r, value: w })
        )
  );
}
function fx({ children: e, location: r }) {
  return qv(vc(e), r);
}
function vc(e, r = []) {
  let o = [];
  return (
    C.Children.forEach(e, (i, l) => {
      if (!C.isValidElement(i)) return;
      let u = [...r, l];
      if (i.type === C.Fragment) {
        o.push.apply(o, vc(i.props.children, u));
        return;
      }
      (He(
        i.type === yc,
        `[${typeof i.type == "string" ? i.type : i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        He(
          !i.props.index || !i.props.children,
          "An index route cannot have child routes."
        ));
      let c = {
        id: i.props.id || u.join("-"),
        caseSensitive: i.props.caseSensitive,
        element: i.props.element,
        Component: i.props.Component,
        index: i.props.index,
        path: i.props.path,
        middleware: i.props.middleware,
        loader: i.props.loader,
        action: i.props.action,
        hydrateFallbackElement: i.props.hydrateFallbackElement,
        HydrateFallback: i.props.HydrateFallback,
        errorElement: i.props.errorElement,
        ErrorBoundary: i.props.ErrorBoundary,
        hasErrorBoundary:
          i.props.hasErrorBoundary === !0 ||
          i.props.ErrorBoundary != null ||
          i.props.errorElement != null,
        shouldRevalidate: i.props.shouldRevalidate,
        handle: i.props.handle,
        lazy: i.props.lazy,
      };
      (i.props.children && (c.children = vc(i.props.children, u)), o.push(c));
    }),
    o
  );
}
var vl = "get",
  xl = "application/x-www-form-urlencoded";
function Fl(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function hx(e) {
  return Fl(e) && e.tagName.toLowerCase() === "button";
}
function px(e) {
  return Fl(e) && e.tagName.toLowerCase() === "form";
}
function mx(e) {
  return Fl(e) && e.tagName.toLowerCase() === "input";
}
function gx(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function yx(e, r) {
  return e.button === 0 && (!r || r === "_self") && !gx(e);
}
var il = null;
function vx() {
  if (il === null)
    try {
      (new FormData(document.createElement("form"), 0), (il = !1));
    } catch {
      il = !0;
    }
  return il;
}
var xx = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Zu(e) {
  return e != null && !xx.has(e)
    ? ($t(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${xl}"`
      ),
      null)
    : e;
}
function wx(e, r) {
  let o, i, l, u, c;
  if (px(e)) {
    let f = e.getAttribute("action");
    ((i = f ? Sn(f, r) : null),
      (o = e.getAttribute("method") || vl),
      (l = Zu(e.getAttribute("enctype")) || xl),
      (u = new FormData(e)));
  } else if (hx(e) || (mx(e) && (e.type === "submit" || e.type === "image"))) {
    let f = e.form;
    if (f == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let h = e.getAttribute("formaction") || f.getAttribute("action");
    if (
      ((i = h ? Sn(h, r) : null),
      (o = e.getAttribute("formmethod") || f.getAttribute("method") || vl),
      (l =
        Zu(e.getAttribute("formenctype")) ||
        Zu(f.getAttribute("enctype")) ||
        xl),
      (u = new FormData(f, e)),
      !vx())
    ) {
      let { name: p, type: x, value: g } = e;
      if (x === "image") {
        let v = p ? `${p}.` : "";
        (u.append(`${v}x`, "0"), u.append(`${v}y`, "0"));
      } else p && u.append(p, g);
    }
  } else {
    if (Fl(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = vl), (i = null), (l = xl), (c = e));
  }
  return (
    u && l === "text/plain" && ((c = u), (u = void 0)),
    { action: i, method: o.toLowerCase(), encType: l, formData: u, body: c }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Bc(e, r) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(r);
}
function Sx(e, r, o) {
  let i =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : e;
  return (
    i.pathname === "/"
      ? (i.pathname = `_root.${o}`)
      : r && Sn(i.pathname, r) === "/"
        ? (i.pathname = `${r.replace(/\/$/, "")}/_root.${o}`)
        : (i.pathname = `${i.pathname.replace(/\/$/, "")}.${o}`),
    i
  );
}
async function Ex(e, r) {
  if (e.id in r) return r[e.id];
  try {
    let o = await import(e.module);
    return ((r[e.id] = o), o);
  } catch (o) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`
      ),
      console.error(o),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function kx(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function Cx(e, r, o) {
  let i = await Promise.all(
    e.map(async (l) => {
      let u = r.routes[l.route.id];
      if (u) {
        let c = await Ex(u, o);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return jx(
    i
      .flat(1)
      .filter(kx)
      .filter((l) => l.rel === "stylesheet" || l.rel === "preload")
      .map((l) =>
        l.rel === "stylesheet"
          ? { ...l, rel: "prefetch", as: "style" }
          : { ...l, rel: "prefetch" }
      )
  );
}
function Kh(e, r, o, i, l, u) {
  let c = (h, p) => (o[p] ? h.route.id !== o[p].route.id : !0),
    f = (h, p) => {
      var x;
      return (
        o[p].pathname !== h.pathname ||
        (((x = o[p].route.path) == null ? void 0 : x.endsWith("*")) &&
          o[p].params["*"] !== h.params["*"])
      );
    };
  return u === "assets"
    ? r.filter((h, p) => c(h, p) || f(h, p))
    : u === "data"
      ? r.filter((h, p) => {
          var g;
          let x = i.routes[h.route.id];
          if (!x || !x.hasLoader) return !1;
          if (c(h, p) || f(h, p)) return !0;
          if (h.route.shouldRevalidate) {
            let v = h.route.shouldRevalidate({
              currentUrl: new URL(
                l.pathname + l.search + l.hash,
                window.origin
              ),
              currentParams: ((g = o[0]) == null ? void 0 : g.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: h.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof v == "boolean") return v;
          }
          return !0;
        })
      : [];
}
function Nx(e, r, { includeHydrateFallback: o } = {}) {
  return _x(
    e
      .map((i) => {
        let l = r.routes[i.route.id];
        if (!l) return [];
        let u = [l.module];
        return (
          l.clientActionModule && (u = u.concat(l.clientActionModule)),
          l.clientLoaderModule && (u = u.concat(l.clientLoaderModule)),
          o &&
            l.hydrateFallbackModule &&
            (u = u.concat(l.hydrateFallbackModule)),
          l.imports && (u = u.concat(l.imports)),
          u
        );
      })
      .flat(1)
  );
}
function _x(e) {
  return [...new Set(e)];
}
function bx(e) {
  let r = {},
    o = Object.keys(e).sort();
  for (let i of o) r[i] = e[i];
  return r;
}
function jx(e, r) {
  let o = new Set();
  return (
    new Set(r),
    e.reduce((i, l) => {
      let u = JSON.stringify(bx(l));
      return (o.has(u) || (o.add(u), i.push({ key: u, link: l })), i);
    }, [])
  );
}
function Im() {
  let e = C.useContext(yo);
  return (
    Bc(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    e
  );
}
function Ix() {
  let e = C.useContext(Ol);
  return (
    Bc(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    e
  );
}
var Vc = C.createContext(void 0);
Vc.displayName = "FrameworkContext";
function Mm() {
  let e = C.useContext(Vc);
  return (
    Bc(e, "You must render this element inside a <HydratedRouter> element"),
    e
  );
}
function Mx(e, r) {
  let o = C.useContext(Vc),
    [i, l] = C.useState(!1),
    [u, c] = C.useState(!1),
    {
      onFocus: f,
      onBlur: h,
      onMouseEnter: p,
      onMouseLeave: x,
      onTouchStart: g,
    } = r,
    v = C.useRef(null);
  (C.useEffect(() => {
    if ((e === "render" && c(!0), e === "viewport")) {
      let b = (_) => {
          _.forEach((R) => {
            c(R.isIntersecting);
          });
        },
        N = new IntersectionObserver(b, { threshold: 0.5 });
      return (
        v.current && N.observe(v.current),
        () => {
          N.disconnect();
        }
      );
    }
  }, [e]),
    C.useEffect(() => {
      if (i) {
        let b = setTimeout(() => {
          c(!0);
        }, 100);
        return () => {
          clearTimeout(b);
        };
      }
    }, [i]));
  let S = () => {
      l(!0);
    },
    w = () => {
      (l(!1), c(!1));
    };
  return o
    ? e !== "intent"
      ? [u, v, {}]
      : [
          u,
          v,
          {
            onFocus: cs(f, S),
            onBlur: cs(h, w),
            onMouseEnter: cs(p, S),
            onMouseLeave: cs(x, w),
            onTouchStart: cs(g, S),
          },
        ]
    : [!1, v, {}];
}
function cs(e, r) {
  return (o) => {
    (e && e(o), o.defaultPrevented || r(o));
  };
}
function Px({ page: e, ...r }) {
  let { router: o } = Im(),
    i = C.useMemo(() => pm(o.routes, e, o.basename), [o.routes, e, o.basename]);
  return i ? C.createElement(Tx, { page: e, matches: i, ...r }) : null;
}
function Rx(e) {
  let { manifest: r, routeModules: o } = Mm(),
    [i, l] = C.useState([]);
  return (
    C.useEffect(() => {
      let u = !1;
      return (
        Cx(e, r, o).then((c) => {
          u || l(c);
        }),
        () => {
          u = !0;
        }
      );
    }, [e, r, o]),
    i
  );
}
function Tx({ page: e, matches: r, ...o }) {
  let i = Qn(),
    { manifest: l, routeModules: u } = Mm(),
    { basename: c } = Im(),
    { loaderData: f, matches: h } = Ix(),
    p = C.useMemo(() => Kh(e, r, h, l, i, "data"), [e, r, h, l, i]),
    x = C.useMemo(() => Kh(e, r, h, l, i, "assets"), [e, r, h, l, i]),
    g = C.useMemo(() => {
      if (e === i.pathname + i.search + i.hash) return [];
      let w = new Set(),
        b = !1;
      if (
        (r.forEach((_) => {
          var E;
          let R = l.routes[_.route.id];
          !R ||
            !R.hasLoader ||
            ((!p.some((j) => j.route.id === _.route.id) &&
              _.route.id in f &&
              (E = u[_.route.id]) != null &&
              E.shouldRevalidate) ||
            R.hasClientLoader
              ? (b = !0)
              : w.add(_.route.id));
        }),
        w.size === 0)
      )
        return [];
      let N = Sx(e, c, "data");
      return (
        b &&
          w.size > 0 &&
          N.searchParams.set(
            "_routes",
            r
              .filter((_) => w.has(_.route.id))
              .map((_) => _.route.id)
              .join(",")
          ),
        [N.pathname + N.search]
      );
    }, [c, f, i, l, p, r, e, u]),
    v = C.useMemo(() => Nx(x, l), [x, l]),
    S = Rx(x);
  return C.createElement(
    C.Fragment,
    null,
    g.map((w) =>
      C.createElement("link", {
        key: w,
        rel: "prefetch",
        as: "fetch",
        href: w,
        ...o,
      })
    ),
    v.map((w) =>
      C.createElement("link", { key: w, rel: "modulepreload", href: w, ...o })
    ),
    S.map(({ key: w, link: b }) =>
      C.createElement("link", { key: w, nonce: o.nonce, ...b })
    )
  );
}
function Lx(...e) {
  return (r) => {
    e.forEach((o) => {
      typeof o == "function" ? o(r) : o != null && (o.current = r);
    });
  };
}
var zx =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  zx && (window.__reactRouterVersion = "7.11.0");
} catch {}
function $x({
  basename: e,
  children: r,
  unstable_useTransitions: o,
  window: i,
}) {
  let l = C.useRef();
  l.current == null && (l.current = mv({ window: i, v5Compat: !0 }));
  let u = l.current,
    [c, f] = C.useState({ action: u.action, location: u.location }),
    h = C.useCallback(
      (p) => {
        o === !1 ? f(p) : C.startTransition(() => f(p));
      },
      [o]
    );
  return (
    C.useLayoutEffect(() => u.listen(h), [u, h]),
    C.createElement(dx, {
      basename: e,
      children: r,
      location: c.location,
      navigationType: c.action,
      navigator: u,
      unstable_useTransitions: o,
    })
  );
}
var Pm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Rm = C.forwardRef(function (
    {
      onClick: r,
      discover: o = "render",
      prefetch: i = "none",
      relative: l,
      reloadDocument: u,
      replace: c,
      state: f,
      target: h,
      to: p,
      preventScrollReset: x,
      viewTransition: g,
      unstable_defaultShouldRevalidate: v,
      ...S
    },
    w
  ) {
    let { basename: b, unstable_useTransitions: N } = C.useContext(bt),
      _ = typeof p == "string" && Pm.test(p),
      R = xm(p, b);
    p = R.to;
    let E = Qv(p, { relative: l }),
      [j, O, A] = Mx(i, S),
      P = Fx(p, {
        replace: c,
        state: f,
        target: h,
        preventScrollReset: x,
        relative: l,
        viewTransition: g,
        unstable_defaultShouldRevalidate: v,
        unstable_useTransitions: N,
      });
    function H(re) {
      (r && r(re), re.defaultPrevented || P(re));
    }
    let V = C.createElement("a", {
      ...S,
      ...A,
      href: R.absoluteURL || E,
      onClick: R.isExternal || u ? r : H,
      ref: Lx(w, O),
      target: h,
      "data-discover": !_ && o === "render" ? "true" : void 0,
    });
    return j && !_
      ? C.createElement(C.Fragment, null, V, C.createElement(Px, { page: E }))
      : V;
  });
Rm.displayName = "Link";
var Ax = C.forwardRef(function (
  {
    "aria-current": r = "page",
    caseSensitive: o = !1,
    className: i = "",
    end: l = !1,
    style: u,
    to: c,
    viewTransition: f,
    children: h,
    ...p
  },
  x
) {
  let g = Ls(c, { relative: p.relative }),
    v = Qn(),
    S = C.useContext(Ol),
    { navigator: w, basename: b } = C.useContext(bt),
    N = S != null && Ux(g) && f === !0,
    _ = w.encodeLocation ? w.encodeLocation(g).pathname : g.pathname,
    R = v.pathname,
    E =
      S && S.navigation && S.navigation.location
        ? S.navigation.location.pathname
        : null;
  (o ||
    ((R = R.toLowerCase()),
    (E = E ? E.toLowerCase() : null),
    (_ = _.toLowerCase())),
    E && b && (E = Sn(E, b) || E));
  const j = _ !== "/" && _.endsWith("/") ? _.length - 1 : _.length;
  let O = R === _ || (!l && R.startsWith(_) && R.charAt(j) === "/"),
    A =
      E != null &&
      (E === _ || (!l && E.startsWith(_) && E.charAt(_.length) === "/")),
    P = { isActive: O, isPending: A, isTransitioning: N },
    H = O ? r : void 0,
    V;
  typeof i == "function"
    ? (V = i(P))
    : (V = [
        i,
        O ? "active" : null,
        A ? "pending" : null,
        N ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let re = typeof u == "function" ? u(P) : u;
  return C.createElement(
    Rm,
    {
      ...p,
      "aria-current": H,
      className: V,
      ref: x,
      style: re,
      to: c,
      viewTransition: f,
    },
    typeof h == "function" ? h(P) : h
  );
});
Ax.displayName = "NavLink";
var Dx = C.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: r,
      navigate: o,
      reloadDocument: i,
      replace: l,
      state: u,
      method: c = vl,
      action: f,
      onSubmit: h,
      relative: p,
      preventScrollReset: x,
      viewTransition: g,
      unstable_defaultShouldRevalidate: v,
      ...S
    },
    w
  ) => {
    let { unstable_useTransitions: b } = C.useContext(bt),
      N = Vx(),
      _ = Wx(f, { relative: p }),
      R = c.toLowerCase() === "get" ? "get" : "post",
      E = typeof f == "string" && Pm.test(f),
      j = (O) => {
        if ((h && h(O), O.defaultPrevented)) return;
        O.preventDefault();
        let A = O.nativeEvent.submitter,
          P = (A == null ? void 0 : A.getAttribute("formmethod")) || c,
          H = () =>
            N(A || O.currentTarget, {
              fetcherKey: r,
              method: P,
              navigate: o,
              replace: l,
              state: u,
              relative: p,
              preventScrollReset: x,
              viewTransition: g,
              unstable_defaultShouldRevalidate: v,
            });
        b && o !== !1 ? C.startTransition(() => H()) : H();
      };
    return C.createElement("form", {
      ref: w,
      method: R,
      action: _,
      onSubmit: i ? h : j,
      ...S,
      "data-discover": !E && e === "render" ? "true" : void 0,
    });
  }
);
Dx.displayName = "Form";
function Ox(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Tm(e) {
  let r = C.useContext(yo);
  return (He(r, Ox(e)), r);
}
function Fx(
  e,
  {
    target: r,
    replace: o,
    state: i,
    preventScrollReset: l,
    relative: u,
    viewTransition: c,
    unstable_defaultShouldRevalidate: f,
    unstable_useTransitions: h,
  } = {}
) {
  let p = Nm(),
    x = Qn(),
    g = Ls(e, { relative: u });
  return C.useCallback(
    (v) => {
      if (yx(v, r)) {
        v.preventDefault();
        let S = o !== void 0 ? o : ws(x) === ws(g),
          w = () =>
            p(e, {
              replace: S,
              state: i,
              preventScrollReset: l,
              relative: u,
              viewTransition: c,
              unstable_defaultShouldRevalidate: f,
            });
        h ? C.startTransition(() => w()) : w();
      }
    },
    [x, p, g, o, i, r, e, l, u, c, f, h]
  );
}
var Hx = 0,
  Bx = () => `__${String(++Hx)}__`;
function Vx() {
  let { router: e } = Tm("useSubmit"),
    { basename: r } = C.useContext(bt),
    o = ix(),
    i = e.fetch,
    l = e.navigate;
  return C.useCallback(
    async (u, c = {}) => {
      let { action: f, method: h, encType: p, formData: x, body: g } = wx(u, r);
      if (c.navigate === !1) {
        let v = c.fetcherKey || Bx();
        await i(v, o, c.action || f, {
          unstable_defaultShouldRevalidate: c.unstable_defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: x,
          body: g,
          formMethod: c.method || h,
          formEncType: c.encType || p,
          flushSync: c.flushSync,
        });
      } else
        await l(c.action || f, {
          unstable_defaultShouldRevalidate: c.unstable_defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: x,
          body: g,
          formMethod: c.method || h,
          formEncType: c.encType || p,
          replace: c.replace,
          state: c.state,
          fromRouteId: o,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition,
        });
    },
    [i, l, r, o]
  );
}
function Wx(e, { relative: r } = {}) {
  let { basename: o } = C.useContext(bt),
    i = C.useContext(rn);
  He(i, "useFormAction must be used inside a RouteContext");
  let [l] = i.matches.slice(-1),
    u = { ...Ls(e || ".", { relative: r }) },
    c = Qn();
  if (e == null) {
    u.search = c.search;
    let f = new URLSearchParams(u.search),
      h = f.getAll("index");
    if (h.some((x) => x === "")) {
      (f.delete("index"),
        h.filter((g) => g).forEach((g) => f.append("index", g)));
      let x = f.toString();
      u.search = x ? `?${x}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      l.route.index &&
      (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"),
    o !== "/" && (u.pathname = u.pathname === "/" ? o : wn([o, u.pathname])),
    ws(u)
  );
}
function Ux(e, { relative: r } = {}) {
  let o = C.useContext(Sm);
  He(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = Tm("useViewTransitionState"),
    l = Ls(e, { relative: r });
  if (!o.isTransitioning) return !1;
  let u = Sn(o.currentLocation.pathname, i) || o.currentLocation.pathname,
    c = Sn(o.nextLocation.pathname, i) || o.nextLocation.pathname;
  return _l(l.pathname, c) != null || _l(l.pathname, u) != null;
}
hm();
const Qh = (e) => {
    let r;
    const o = new Set(),
      i = (p, x) => {
        const g = typeof p == "function" ? p(r) : p;
        if (!Object.is(g, r)) {
          const v = r;
          ((r =
            (x ?? (typeof g != "object" || g === null))
              ? g
              : Object.assign({}, r, g)),
            o.forEach((S) => S(r, v)));
        }
      },
      l = () => r,
      f = {
        setState: i,
        getState: l,
        getInitialState: () => h,
        subscribe: (p) => (o.add(p), () => o.delete(p)),
      },
      h = (r = e(i, l, f));
    return f;
  },
  Yx = (e) => (e ? Qh(e) : Qh),
  Xx = (e) => e;
function Kx(e, r = Xx) {
  const o = no.useSyncExternalStore(
    e.subscribe,
    no.useCallback(() => r(e.getState()), [e, r]),
    no.useCallback(() => r(e.getInitialState()), [e, r])
  );
  return (no.useDebugValue(o), o);
}
const Gh = (e) => {
    const r = Yx(e),
      o = (i) => Kx(r, i);
    return (Object.assign(o, r), o);
  },
  Wc = (e) => (e ? Gh(e) : Gh),
  Uc = Wc((e, r) => ({
    projects: [],
    selectedProjectId: null,
    loading: !1,
    error: null,
    fetchProjects: async () => {
      e({ loading: !0, error: null });
      try {
        const o = await fetch("/api/projects?limit=100");
        if (!o.ok) throw new Error("Failed to fetch projects");
        const i = await o.json();
        e({ projects: i.projects || [], loading: !1 });
      } catch (o) {
        const i =
          o instanceof Error ? o.message : "プロジェクトの取得に失敗しました";
        (console.error("[ProjectStore] Failed to fetch projects:", o),
          e({ error: i, loading: !1 }));
      }
    },
    selectProject: (o) => {
      e({ selectedProjectId: o });
    },
    getSelectedProject: () => {
      const { projects: o, selectedProjectId: i } = r();
      return (i && o.find((l) => l.projectId === i)) || null;
    },
    createProject: async (o) => {
      var i;
      e({ error: null });
      try {
        const l = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(o),
        });
        if (!l.ok) {
          const c = await l.json(),
            f =
              typeof c.error == "string"
                ? c.error
                : ((i = c.error) == null ? void 0 : i.message) ||
                  "プロジェクトの作成に失敗しました";
          throw new Error(f);
        }
        const u = await l.json();
        return (e((c) => ({ projects: [...c.projects, u] })), u);
      } catch (l) {
        const u =
          l instanceof Error ? l.message : "プロジェクトの作成に失敗しました";
        return (e({ error: u }), null);
      }
    },
    updateProject: async (o, i) => {
      var l;
      e({ error: null });
      try {
        const u = await fetch(`/api/projects/${o}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(i),
        });
        if (!u.ok) {
          const f = await u.json(),
            h =
              typeof f.error == "string"
                ? f.error
                : ((l = f.error) == null ? void 0 : l.message) ||
                  "プロジェクトの更新に失敗しました";
          throw new Error(h);
        }
        const c = await u.json();
        return (
          e((f) => ({
            projects: f.projects.map((h) => (h.projectId === o ? c : h)),
          })),
          c
        );
      } catch (u) {
        const c =
          u instanceof Error ? u.message : "プロジェクトの更新に失敗しました";
        return (e({ error: c }), null);
      }
    },
    deleteProject: async (o) => {
      var i;
      e({ error: null });
      try {
        const l = await fetch(`/api/projects/${o}`, { method: "DELETE" });
        if (!l.ok && l.status !== 204) {
          const u = await l.json(),
            c =
              typeof u.error == "string"
                ? u.error
                : ((i = u.error) == null ? void 0 : i.message) ||
                  "プロジェクトの削除に失敗しました";
          throw new Error(c);
        }
        return (
          e((u) => ({
            projects: u.projects.filter((c) => c.projectId !== o),
            selectedProjectId:
              u.selectedProjectId === o ? null : u.selectedProjectId,
          })),
          !0
        );
      } catch (l) {
        const u =
          l instanceof Error ? l.message : "プロジェクトの削除に失敗しました";
        return (e({ error: u }), !1);
      }
    },
  }));
function Qx({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      fillRule: "evenodd",
      d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
      clipRule: "evenodd",
    }),
  });
}
function Gx({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      fillRule: "evenodd",
      d: "M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM6 13.25v-2.5h2.5v2.5H6zm0-3.5V7.25h2.5v2.5H6zm3.5 0V7.25H12v2.5H9.5zm0 3.5v-2.5H12v2.5H9.5zm3.5 0v-2.5h2.5v2.5H13zm0-3.5V7.25h2.5v2.5H13z",
      clipRule: "evenodd",
    }),
  });
}
function qh({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z",
      clipRule: "evenodd",
    }),
  });
}
function wl({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      d: "M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z",
    }),
  });
}
function xc({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      fillRule: "evenodd",
      d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
      clipRule: "evenodd",
    }),
  });
}
function Zh({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      fillRule: "evenodd",
      d: "M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z",
      clipRule: "evenodd",
    }),
  });
}
function qx({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      fillRule: "evenodd",
      d: "M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z",
      clipRule: "evenodd",
    }),
  });
}
function Zx({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      d: "M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z",
    }),
  });
}
function Jx({ className: e }) {
  return y.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: [
      y.jsx("path", { d: "M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" }),
      y.jsx("path", {
        fillRule: "evenodd",
        d: "M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
        clipRule: "evenodd",
      }),
    ],
  });
}
function e1({ className: e }) {
  return y.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: [
      y.jsx("path", {
        fillRule: "evenodd",
        d: "M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z",
        clipRule: "evenodd",
      }),
      y.jsx("path", {
        d: "M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z",
      }),
    ],
  });
}
function Ss({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      fillRule: "evenodd",
      d: "M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z",
      clipRule: "evenodd",
    }),
  });
}
function wc({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z",
    }),
  });
}
function Es({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      fillRule: "evenodd",
      d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
      clipRule: "evenodd",
    }),
  });
}
function Lm({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      d: "M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z",
    }),
  });
}
function t1({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      fillRule: "evenodd",
      d: "M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z",
      clipRule: "evenodd",
    }),
  });
}
function n1({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      fillRule: "evenodd",
      d: "M3.25 3A2.25 2.25 0 001 5.25v9.5A2.25 2.25 0 003.25 17h13.5A2.25 2.25 0 0019 14.75v-9.5A2.25 2.25 0 0016.75 3H3.25zm.943 8.752a.75.75 0 01.055-1.06L6.128 9l-1.88-1.693a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 01-1.06-.055zM9.75 10.25a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z",
      clipRule: "evenodd",
    }),
  });
}
function r1({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      d: "M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z",
    }),
  });
}
function o1({ className: e }) {
  return y.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: [
      y.jsx("path", {
        d: "M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z",
      }),
      y.jsx("path", {
        fillRule: "evenodd",
        d: "M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z",
        clipRule: "evenodd",
      }),
    ],
  });
}
function s1({ className: e }) {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: y.jsx("path", {
      d: "M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z",
    }),
  });
}
function i1({
  sessions: e,
  sessionsLoading: r = !1,
  onSessionSelect: o,
  onSessionClick: i,
  onSessionDelete: l,
  onBulkDelete: u,
  onSessionHover: c,
  selectedSessionIds: f = [],
}) {
  const {
      projects: h,
      selectedProjectId: p,
      loading: x,
      fetchProjects: g,
      selectProject: v,
      updateProject: S,
      deleteProject: w,
    } = Uc(),
    [b, N] = C.useState(!1),
    [_, R] = C.useState(!1),
    [E, j] = C.useState(new Set()),
    [O, A] = C.useState(!1),
    [P, H] = C.useState(null),
    [V, re] = C.useState(""),
    [Y, U] = C.useState(null);
  C.useEffect(() => {
    g();
  }, [g]);
  const te = C.useMemo(
      () => (p ? e.filter((Z) => Z.projectId === p) : e),
      [e, p]
    ),
    L = C.useMemo(() => {
      const Z = new Set(e.map((Q) => Q.projectId).filter(Boolean));
      return h.filter((Q) => Z.has(Q.projectId));
    }, [e, h]),
    K = C.useCallback(
      (Z) => {
        (v(Z), N(!1));
      },
      [v]
    ),
    B = h.find((Z) => Z.projectId === p),
    X = C.useCallback((Z, Q) => {
      (H(Z), re(Q), N(!1));
    }, []),
    z = C.useCallback(async () => {
      !P || !V.trim() || (await S(P, { name: V.trim() }), H(null), re(""));
    }, [P, V, S]),
    $ = C.useCallback(() => {
      (H(null), re(""));
    }, []),
    W = C.useCallback(
      async (Z) => {
        confirm("このプロジェクトを削除しますか？") && (await w(Z), N(!1));
      },
      [w]
    ),
    M = C.useCallback(() => {
      (R((Z) => !Z), j(new Set()));
    }, []),
    I = C.useCallback((Z) => {
      j((Q) => {
        const ne = new Set(Q);
        return (ne.has(Z) ? ne.delete(Z) : ne.add(Z), ne);
      });
    }, []),
    oe = C.useCallback(() => {
      E.size === te.length
        ? j(new Set())
        : j(new Set(te.map((Z) => Z.sessionId)));
    }, [te, E.size]),
    le = C.useCallback(async () => {
      if (!(E.size === 0 || !u)) {
        A(!0);
        try {
          (await u(Array.from(E)), j(new Set()), R(!1));
        } finally {
          A(!1);
        }
      }
    }, [E, u]);
  return y.jsxs("aside", {
    className:
      "w-64 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] flex flex-col h-full",
    children: [
      y.jsx("div", {
        className: "p-3 border-b border-[var(--border-subtle)]",
        children: y.jsxs("div", {
          className: "relative",
          children: [
            y.jsxs("button", {
              onClick: () => N(!b),
              className:
                "w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors",
              "aria-expanded": b,
              "aria-haspopup": "listbox",
              children: [
                y.jsxs("div", {
                  className: "flex items-center gap-2 min-w-0",
                  children: [
                    y.jsx(wl, {
                      className:
                        "w-4 h-4 text-[var(--text-muted)] flex-shrink-0",
                    }),
                    y.jsx("span", {
                      className: "text-sm text-[var(--text-primary)] truncate",
                      children: x
                        ? "読み込み中..."
                        : (B == null ? void 0 : B.name) ||
                          "すべてのプロジェクト",
                    }),
                  ],
                }),
                y.jsx(xc, {
                  className:
                    "w-4 h-4 text-[var(--text-muted)] transition-transform " +
                    (b ? "rotate-180" : ""),
                }),
              ],
            }),
            b &&
              y.jsxs("div", {
                className:
                  "absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto",
                children: [
                  y.jsx("button", {
                    onClick: () => K(null),
                    className:
                      "w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] transition-colors " +
                      (p
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"),
                    role: "option",
                    "aria-selected": !p,
                    children: "すべてのプロジェクト",
                  }),
                  L.map((Z) =>
                    y.jsx(
                      "div",
                      {
                        className:
                          "group flex items-center gap-1 px-2 py-2 text-sm hover:bg-[var(--bg-surface)] transition-colors " +
                          (p === Z.projectId
                            ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"
                            : "text-[var(--text-primary)]"),
                        children:
                          P === Z.projectId
                            ? y.jsxs("div", {
                                className: "flex-1 flex items-center gap-1",
                                children: [
                                  y.jsx("label", {
                                    htmlFor: `edit-project-${Z.projectId}`,
                                    className: "sr-only",
                                    children: "プロジェクト名を編集",
                                  }),
                                  y.jsx("input", {
                                    id: `edit-project-${Z.projectId}`,
                                    type: "text",
                                    value: V,
                                    onChange: (Q) => re(Q.target.value),
                                    onKeyDown: (Q) => {
                                      (Q.key === "Enter" && z(),
                                        Q.key === "Escape" && $());
                                    },
                                    className:
                                      "flex-1 px-2 py-1 text-sm bg-[var(--bg-base)] border border-[var(--border-default)] rounded text-[var(--text-primary)]",
                                    autoFocus: !0,
                                    "aria-label": "プロジェクト名",
                                  }),
                                  y.jsx("button", {
                                    onClick: z,
                                    className:
                                      "p-1 rounded hover:bg-[var(--color-primary-500)] text-[var(--text-muted)] hover:text-white transition-colors",
                                    "aria-label": "保存",
                                    children: y.jsx(Es, {
                                      className: "w-4 h-4",
                                    }),
                                  }),
                                ],
                              })
                            : y.jsxs(y.Fragment, {
                                children: [
                                  y.jsxs("button", {
                                    onClick: () => K(Z.projectId),
                                    className: "flex-1 text-left min-w-0",
                                    role: "option",
                                    "aria-selected": p === Z.projectId,
                                    children: [
                                      y.jsx("div", {
                                        className: "truncate",
                                        children: Z.name,
                                      }),
                                      y.jsx("div", {
                                        className:
                                          "text-xs text-[var(--text-muted)] truncate",
                                        children: Z.path,
                                      }),
                                    ],
                                  }),
                                  y.jsx("button", {
                                    onClick: (Q) => {
                                      (Q.stopPropagation(),
                                        X(Z.projectId, Z.name));
                                    },
                                    className:
                                      "p-1 rounded opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-[var(--bg-base)] transition-all",
                                    title: "名前を変更",
                                    "aria-label": `${Z.name}の名前を変更`,
                                    children: y.jsx(Lm, {
                                      className:
                                        "w-3 h-3 text-[var(--text-muted)]",
                                    }),
                                  }),
                                  y.jsx("button", {
                                    onClick: (Q) => {
                                      (Q.stopPropagation(), W(Z.projectId));
                                    },
                                    className:
                                      "p-1 rounded opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-500/20 transition-all",
                                    title: "削除",
                                    "aria-label": `${Z.name}を削除`,
                                    children: y.jsx(Ss, {
                                      className: "w-3 h-3 text-red-400",
                                    }),
                                  }),
                                ],
                              }),
                      },
                      Z.projectId
                    )
                  ),
                ],
              }),
          ],
        }),
      }),
      y.jsxs("div", {
        className: "flex-1 overflow-y-auto",
        children: [
          y.jsxs("div", {
            className: "px-3 py-2 flex items-center justify-between",
            children: [
              y.jsx("span", {
                className:
                  "text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider",
                children: "Sessions",
              }),
              u &&
                te.length > 0 &&
                y.jsx("button", {
                  onClick: M,
                  className: `text-xs px-2 py-1 rounded transition-colors ${_ ? "bg-[var(--color-primary-500)] text-white" : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]"}`,
                  children: _ ? "完了" : "選択",
                }),
            ],
          }),
          _ &&
            te.length > 0 &&
            y.jsxs("div", {
              className: "px-3 pb-2 flex items-center gap-2",
              children: [
                y.jsx("button", {
                  onClick: oe,
                  className:
                    "text-xs px-2 py-1 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors",
                  children: E.size === te.length ? "全解除" : "全選択",
                }),
                E.size > 0 &&
                  y.jsxs("button", {
                    onClick: le,
                    disabled: O,
                    className:
                      "text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50 flex items-center gap-1",
                    children: [
                      y.jsx(Ss, { className: "w-3 h-3" }),
                      O ? "削除中..." : `${E.size}件を削除`,
                    ],
                  }),
              ],
            }),
          r
            ? y.jsx("div", {
                className: "px-3 space-y-2",
                children: [1, 2, 3].map((Z) =>
                  y.jsx(
                    "div",
                    {
                      className:
                        "h-12 bg-[var(--bg-elevated)] rounded animate-pulse",
                    },
                    Z
                  )
                ),
              })
            : te.length === 0
              ? y.jsx("div", {
                  className:
                    "px-3 py-4 text-sm text-[var(--text-muted)] text-center",
                  children: "セッションがありません",
                })
              : y.jsx("div", {
                  className: "px-2 space-y-1",
                  children: te.map((Z) => {
                    const Q = h.find((ne) => ne.projectId === Z.projectId);
                    return y.jsx(
                      a1,
                      {
                        session: Z,
                        isHidden: f.includes(Z.sessionId),
                        onToggle: o,
                        onClick: (ne) => U(ne.sessionId),
                        onDelete: l,
                        onHover: c,
                        bulkSelectMode: _,
                        isBulkSelected: E.has(Z.sessionId),
                        onBulkToggle: I,
                        projectName: Q == null ? void 0 : Q.name,
                        showProjectBadge: !p,
                        isClicked: Y === Z.sessionId,
                      },
                      Z.sessionId
                    );
                  }),
                }),
        ],
      }),
    ],
  });
}
const l1 = {
    idle: "bg-gray-400",
    active: "bg-blue-500",
    completed: "bg-green-500",
    error: "bg-red-500",
    processing: "bg-yellow-500",
  },
  a1 = C.memo(function ({
    session: r,
    isHidden: o,
    onToggle: i,
    onClick: l,
    onDelete: u,
    onHover: c,
    bulkSelectMode: f = !1,
    isBulkSelected: h = !1,
    onBulkToggle: p,
    projectName: x,
    showProjectBadge: g = !1,
    isClicked: v = !1,
  }) {
    const S = C.useCallback(
        (j) => {
          (j.stopPropagation(), i == null || i(r));
        },
        [i, r]
      ),
      w = C.useCallback(() => {
        f ? p == null || p(r.sessionId) : l == null || l(r);
      }, [f, l, p, r]),
      b = C.useCallback(
        (j) => {
          (j.stopPropagation(), u == null || u(r));
        },
        [u, r]
      ),
      N = C.useCallback(
        (j) => {
          (j.stopPropagation(), p == null || p(r.sessionId));
        },
        [p, r.sessionId]
      ),
      _ = C.useCallback(() => {
        c == null || c(r.sessionId);
      }, [c, r.sessionId]),
      R = C.useCallback(() => {
        c == null || c(null);
      }, [c]),
      E = new Date(r.updatedAt).toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
      });
    return y.jsxs("div", {
      onClick: w,
      onMouseEnter: _,
      onMouseLeave: R,
      className:
        "group flex items-center gap-1 px-2 py-2 rounded-lg transition-colors cursor-pointer " +
        (h
          ? "bg-[var(--color-primary-500)]/20"
          : o
            ? "opacity-50 hover:opacity-70"
            : r.status === "processing"
              ? "border border-[var(--color-primary-400)] bg-[var(--color-primary-400)]/5 hover:bg-[var(--color-primary-400)]/10"
              : v
                ? "bg-[var(--color-primary-400)]/20 hover:bg-[var(--color-primary-400)]/25"
                : "hover:bg-[var(--color-primary-400)]/10"),
      children: [
        f
          ? y.jsx("button", {
              onClick: N,
              className: `p-1 rounded transition-colors flex-shrink-0 ${h ? "bg-[var(--color-primary-500)] text-white" : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:bg-[var(--bg-surface)]"}`,
              children: h
                ? y.jsx(Es, { className: "w-4 h-4" })
                : y.jsx("div", { className: "w-4 h-4" }),
            })
          : y.jsx("button", {
              onClick: S,
              className:
                "p-1 rounded hover:bg-[var(--bg-surface)] transition-colors flex-shrink-0",
              title: o ? "エディタに表示" : "エディタから非表示",
              children: o
                ? y.jsx(e1, { className: "w-4 h-4 text-[var(--text-muted)]" })
                : y.jsx(Jx, {
                    className: "w-4 h-4 text-[var(--text-secondary)]",
                  }),
            }),
        y.jsxs("div", {
          className: "flex-1 text-left flex items-center gap-2 min-w-0",
          children: [
            y.jsx("span", {
              className:
                "w-2 h-2 rounded-full flex-shrink-0 " +
                (o ? "bg-gray-500" : l1[r.status]),
            }),
            y.jsxs("div", {
              className: "flex-1 min-w-0",
              children: [
                y.jsx("div", {
                  className:
                    "text-sm truncate " +
                    (o
                      ? "text-[var(--text-muted)] line-through"
                      : "text-[var(--text-primary)]"),
                  children: r.name,
                }),
                y.jsxs("div", {
                  className:
                    "flex items-center gap-2 text-xs text-[var(--text-muted)]",
                  children: [
                    y.jsx("span", { children: E }),
                    g &&
                      x &&
                      y.jsx("span", {
                        className:
                          "px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded text-[10px] truncate max-w-[80px]",
                        children: x,
                      }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !f &&
          y.jsx("button", {
            onClick: b,
            className:
              "p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all flex-shrink-0",
            title: "セッションを削除",
            children: y.jsx(Ss, {
              className: "w-4 h-4 text-red-400 hover:text-red-300",
            }),
          }),
      ],
    });
  });
function Ge(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let r = "";
  if (Array.isArray(e))
    for (let o = 0, i; o < e.length; o++)
      (i = Ge(e[o])) !== "" && (r += (r && " ") + i);
  else for (let o in e) e[o] && (r += (r && " ") + o);
  return r;
}
var u1 = { value: () => {} };
function Hl() {
  for (var e = 0, r = arguments.length, o = {}, i; e < r; ++e) {
    if (!(i = arguments[e] + "") || i in o || /[\s.]/.test(i))
      throw new Error("illegal type: " + i);
    o[i] = [];
  }
  return new Sl(o);
}
function Sl(e) {
  this._ = e;
}
function c1(e, r) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (o) {
      var i = "",
        l = o.indexOf(".");
      if (
        (l >= 0 && ((i = o.slice(l + 1)), (o = o.slice(0, l))),
        o && !r.hasOwnProperty(o))
      )
        throw new Error("unknown type: " + o);
      return { type: o, name: i };
    });
}
Sl.prototype = Hl.prototype = {
  constructor: Sl,
  on: function (e, r) {
    var o = this._,
      i = c1(e + "", o),
      l,
      u = -1,
      c = i.length;
    if (arguments.length < 2) {
      for (; ++u < c; )
        if ((l = (e = i[u]).type) && (l = d1(o[l], e.name))) return l;
      return;
    }
    if (r != null && typeof r != "function")
      throw new Error("invalid callback: " + r);
    for (; ++u < c; )
      if ((l = (e = i[u]).type)) o[l] = Jh(o[l], e.name, r);
      else if (r == null) for (l in o) o[l] = Jh(o[l], e.name, null);
    return this;
  },
  copy: function () {
    var e = {},
      r = this._;
    for (var o in r) e[o] = r[o].slice();
    return new Sl(e);
  },
  call: function (e, r) {
    if ((l = arguments.length - 2) > 0)
      for (var o = new Array(l), i = 0, l, u; i < l; ++i)
        o[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (u = this._[e], i = 0, l = u.length; i < l; ++i) u[i].value.apply(r, o);
  },
  apply: function (e, r, o) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var i = this._[e], l = 0, u = i.length; l < u; ++l)
      i[l].value.apply(r, o);
  },
};
function d1(e, r) {
  for (var o = 0, i = e.length, l; o < i; ++o)
    if ((l = e[o]).name === r) return l.value;
}
function Jh(e, r, o) {
  for (var i = 0, l = e.length; i < l; ++i)
    if (e[i].name === r) {
      ((e[i] = u1), (e = e.slice(0, i).concat(e.slice(i + 1))));
      break;
    }
  return (o != null && e.push({ name: r, value: o }), e);
}
var Sc = "http://www.w3.org/1999/xhtml";
const ep = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Sc,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Bl(e) {
  var r = (e += ""),
    o = r.indexOf(":");
  return (
    o >= 0 && (r = e.slice(0, o)) !== "xmlns" && (e = e.slice(o + 1)),
    ep.hasOwnProperty(r) ? { space: ep[r], local: e } : e
  );
}
function f1(e) {
  return function () {
    var r = this.ownerDocument,
      o = this.namespaceURI;
    return o === Sc && r.documentElement.namespaceURI === Sc
      ? r.createElement(e)
      : r.createElementNS(o, e);
  };
}
function h1(e) {
  return function () {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function zm(e) {
  var r = Bl(e);
  return (r.local ? h1 : f1)(r);
}
function p1() {}
function Yc(e) {
  return e == null
    ? p1
    : function () {
        return this.querySelector(e);
      };
}
function m1(e) {
  typeof e != "function" && (e = Yc(e));
  for (var r = this._groups, o = r.length, i = new Array(o), l = 0; l < o; ++l)
    for (
      var u = r[l], c = u.length, f = (i[l] = new Array(c)), h, p, x = 0;
      x < c;
      ++x
    )
      (h = u[x]) &&
        (p = e.call(h, h.__data__, x, u)) &&
        ("__data__" in h && (p.__data__ = h.__data__), (f[x] = p));
  return new _t(i, this._parents);
}
function g1(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function y1() {
  return [];
}
function $m(e) {
  return e == null
    ? y1
    : function () {
        return this.querySelectorAll(e);
      };
}
function v1(e) {
  return function () {
    return g1(e.apply(this, arguments));
  };
}
function x1(e) {
  typeof e == "function" ? (e = v1(e)) : (e = $m(e));
  for (var r = this._groups, o = r.length, i = [], l = [], u = 0; u < o; ++u)
    for (var c = r[u], f = c.length, h, p = 0; p < f; ++p)
      (h = c[p]) && (i.push(e.call(h, h.__data__, p, c)), l.push(h));
  return new _t(i, l);
}
function Am(e) {
  return function () {
    return this.matches(e);
  };
}
function Dm(e) {
  return function (r) {
    return r.matches(e);
  };
}
var w1 = Array.prototype.find;
function S1(e) {
  return function () {
    return w1.call(this.children, e);
  };
}
function E1() {
  return this.firstElementChild;
}
function k1(e) {
  return this.select(e == null ? E1 : S1(typeof e == "function" ? e : Dm(e)));
}
var C1 = Array.prototype.filter;
function N1() {
  return Array.from(this.children);
}
function _1(e) {
  return function () {
    return C1.call(this.children, e);
  };
}
function b1(e) {
  return this.selectAll(
    e == null ? N1 : _1(typeof e == "function" ? e : Dm(e))
  );
}
function j1(e) {
  typeof e != "function" && (e = Am(e));
  for (var r = this._groups, o = r.length, i = new Array(o), l = 0; l < o; ++l)
    for (var u = r[l], c = u.length, f = (i[l] = []), h, p = 0; p < c; ++p)
      (h = u[p]) && e.call(h, h.__data__, p, u) && f.push(h);
  return new _t(i, this._parents);
}
function Om(e) {
  return new Array(e.length);
}
function I1() {
  return new _t(this._enter || this._groups.map(Om), this._parents);
}
function bl(e, r) {
  ((this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = r));
}
bl.prototype = {
  constructor: bl,
  appendChild: function (e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function (e, r) {
    return this._parent.insertBefore(e, r);
  },
  querySelector: function (e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function (e) {
    return this._parent.querySelectorAll(e);
  },
};
function M1(e) {
  return function () {
    return e;
  };
}
function P1(e, r, o, i, l, u) {
  for (var c = 0, f, h = r.length, p = u.length; c < p; ++c)
    (f = r[c]) ? ((f.__data__ = u[c]), (i[c] = f)) : (o[c] = new bl(e, u[c]));
  for (; c < h; ++c) (f = r[c]) && (l[c] = f);
}
function R1(e, r, o, i, l, u, c) {
  var f,
    h,
    p = new Map(),
    x = r.length,
    g = u.length,
    v = new Array(x),
    S;
  for (f = 0; f < x; ++f)
    (h = r[f]) &&
      ((v[f] = S = c.call(h, h.__data__, f, r) + ""),
      p.has(S) ? (l[f] = h) : p.set(S, h));
  for (f = 0; f < g; ++f)
    ((S = c.call(e, u[f], f, u) + ""),
      (h = p.get(S))
        ? ((i[f] = h), (h.__data__ = u[f]), p.delete(S))
        : (o[f] = new bl(e, u[f])));
  for (f = 0; f < x; ++f) (h = r[f]) && p.get(v[f]) === h && (l[f] = h);
}
function T1(e) {
  return e.__data__;
}
function L1(e, r) {
  if (!arguments.length) return Array.from(this, T1);
  var o = r ? R1 : P1,
    i = this._parents,
    l = this._groups;
  typeof e != "function" && (e = M1(e));
  for (
    var u = l.length,
      c = new Array(u),
      f = new Array(u),
      h = new Array(u),
      p = 0;
    p < u;
    ++p
  ) {
    var x = i[p],
      g = l[p],
      v = g.length,
      S = z1(e.call(x, x && x.__data__, p, i)),
      w = S.length,
      b = (f[p] = new Array(w)),
      N = (c[p] = new Array(w)),
      _ = (h[p] = new Array(v));
    o(x, g, b, N, _, S, r);
    for (var R = 0, E = 0, j, O; R < w; ++R)
      if ((j = b[R])) {
        for (R >= E && (E = R + 1); !(O = N[E]) && ++E < w; );
        j._next = O || null;
      }
  }
  return ((c = new _t(c, i)), (c._enter = f), (c._exit = h), c);
}
function z1(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function $1() {
  return new _t(this._exit || this._groups.map(Om), this._parents);
}
function A1(e, r, o) {
  var i = this.enter(),
    l = this,
    u = this.exit();
  return (
    typeof e == "function"
      ? ((i = e(i)), i && (i = i.selection()))
      : (i = i.append(e + "")),
    r != null && ((l = r(l)), l && (l = l.selection())),
    o == null ? u.remove() : o(u),
    i && l ? i.merge(l).order() : l
  );
}
function D1(e) {
  for (
    var r = e.selection ? e.selection() : e,
      o = this._groups,
      i = r._groups,
      l = o.length,
      u = i.length,
      c = Math.min(l, u),
      f = new Array(l),
      h = 0;
    h < c;
    ++h
  )
    for (
      var p = o[h], x = i[h], g = p.length, v = (f[h] = new Array(g)), S, w = 0;
      w < g;
      ++w
    )
      (S = p[w] || x[w]) && (v[w] = S);
  for (; h < l; ++h) f[h] = o[h];
  return new _t(f, this._parents);
}
function O1() {
  for (var e = this._groups, r = -1, o = e.length; ++r < o; )
    for (var i = e[r], l = i.length - 1, u = i[l], c; --l >= 0; )
      (c = i[l]) &&
        (u &&
          c.compareDocumentPosition(u) ^ 4 &&
          u.parentNode.insertBefore(c, u),
        (u = c));
  return this;
}
function F1(e) {
  e || (e = H1);
  function r(g, v) {
    return g && v ? e(g.__data__, v.__data__) : !g - !v;
  }
  for (
    var o = this._groups, i = o.length, l = new Array(i), u = 0;
    u < i;
    ++u
  ) {
    for (
      var c = o[u], f = c.length, h = (l[u] = new Array(f)), p, x = 0;
      x < f;
      ++x
    )
      (p = c[x]) && (h[x] = p);
    h.sort(r);
  }
  return new _t(l, this._parents).order();
}
function H1(e, r) {
  return e < r ? -1 : e > r ? 1 : e >= r ? 0 : NaN;
}
function B1() {
  var e = arguments[0];
  return ((arguments[0] = this), e.apply(null, arguments), this);
}
function V1() {
  return Array.from(this);
}
function W1() {
  for (var e = this._groups, r = 0, o = e.length; r < o; ++r)
    for (var i = e[r], l = 0, u = i.length; l < u; ++l) {
      var c = i[l];
      if (c) return c;
    }
  return null;
}
function U1() {
  let e = 0;
  for (const r of this) ++e;
  return e;
}
function Y1() {
  return !this.node();
}
function X1(e) {
  for (var r = this._groups, o = 0, i = r.length; o < i; ++o)
    for (var l = r[o], u = 0, c = l.length, f; u < c; ++u)
      (f = l[u]) && e.call(f, f.__data__, u, l);
  return this;
}
function K1(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function Q1(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function G1(e, r) {
  return function () {
    this.setAttribute(e, r);
  };
}
function q1(e, r) {
  return function () {
    this.setAttributeNS(e.space, e.local, r);
  };
}
function Z1(e, r) {
  return function () {
    var o = r.apply(this, arguments);
    o == null ? this.removeAttribute(e) : this.setAttribute(e, o);
  };
}
function J1(e, r) {
  return function () {
    var o = r.apply(this, arguments);
    o == null
      ? this.removeAttributeNS(e.space, e.local)
      : this.setAttributeNS(e.space, e.local, o);
  };
}
function ew(e, r) {
  var o = Bl(e);
  if (arguments.length < 2) {
    var i = this.node();
    return o.local ? i.getAttributeNS(o.space, o.local) : i.getAttribute(o);
  }
  return this.each(
    (r == null
      ? o.local
        ? Q1
        : K1
      : typeof r == "function"
        ? o.local
          ? J1
          : Z1
        : o.local
          ? q1
          : G1)(o, r)
  );
}
function Fm(e) {
  return (
    (e.ownerDocument && e.ownerDocument.defaultView) ||
    (e.document && e) ||
    e.defaultView
  );
}
function tw(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function nw(e, r, o) {
  return function () {
    this.style.setProperty(e, r, o);
  };
}
function rw(e, r, o) {
  return function () {
    var i = r.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, o);
  };
}
function ow(e, r, o) {
  return arguments.length > 1
    ? this.each(
        (r == null ? tw : typeof r == "function" ? rw : nw)(e, r, o ?? "")
      )
    : lo(this.node(), e);
}
function lo(e, r) {
  return (
    e.style.getPropertyValue(r) ||
    Fm(e).getComputedStyle(e, null).getPropertyValue(r)
  );
}
function sw(e) {
  return function () {
    delete this[e];
  };
}
function iw(e, r) {
  return function () {
    this[e] = r;
  };
}
function lw(e, r) {
  return function () {
    var o = r.apply(this, arguments);
    o == null ? delete this[e] : (this[e] = o);
  };
}
function aw(e, r) {
  return arguments.length > 1
    ? this.each((r == null ? sw : typeof r == "function" ? lw : iw)(e, r))
    : this.node()[e];
}
function Hm(e) {
  return e.trim().split(/^|\s+/);
}
function Xc(e) {
  return e.classList || new Bm(e);
}
function Bm(e) {
  ((this._node = e), (this._names = Hm(e.getAttribute("class") || "")));
}
Bm.prototype = {
  add: function (e) {
    var r = this._names.indexOf(e);
    r < 0 &&
      (this._names.push(e),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (e) {
    var r = this._names.indexOf(e);
    r >= 0 &&
      (this._names.splice(r, 1),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (e) {
    return this._names.indexOf(e) >= 0;
  },
};
function Vm(e, r) {
  for (var o = Xc(e), i = -1, l = r.length; ++i < l; ) o.add(r[i]);
}
function Wm(e, r) {
  for (var o = Xc(e), i = -1, l = r.length; ++i < l; ) o.remove(r[i]);
}
function uw(e) {
  return function () {
    Vm(this, e);
  };
}
function cw(e) {
  return function () {
    Wm(this, e);
  };
}
function dw(e, r) {
  return function () {
    (r.apply(this, arguments) ? Vm : Wm)(this, e);
  };
}
function fw(e, r) {
  var o = Hm(e + "");
  if (arguments.length < 2) {
    for (var i = Xc(this.node()), l = -1, u = o.length; ++l < u; )
      if (!i.contains(o[l])) return !1;
    return !0;
  }
  return this.each((typeof r == "function" ? dw : r ? uw : cw)(o, r));
}
function hw() {
  this.textContent = "";
}
function pw(e) {
  return function () {
    this.textContent = e;
  };
}
function mw(e) {
  return function () {
    var r = e.apply(this, arguments);
    this.textContent = r ?? "";
  };
}
function gw(e) {
  return arguments.length
    ? this.each(e == null ? hw : (typeof e == "function" ? mw : pw)(e))
    : this.node().textContent;
}
function yw() {
  this.innerHTML = "";
}
function vw(e) {
  return function () {
    this.innerHTML = e;
  };
}
function xw(e) {
  return function () {
    var r = e.apply(this, arguments);
    this.innerHTML = r ?? "";
  };
}
function ww(e) {
  return arguments.length
    ? this.each(e == null ? yw : (typeof e == "function" ? xw : vw)(e))
    : this.node().innerHTML;
}
function Sw() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ew() {
  return this.each(Sw);
}
function kw() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Cw() {
  return this.each(kw);
}
function Nw(e) {
  var r = typeof e == "function" ? e : zm(e);
  return this.select(function () {
    return this.appendChild(r.apply(this, arguments));
  });
}
function _w() {
  return null;
}
function bw(e, r) {
  var o = typeof e == "function" ? e : zm(e),
    i = r == null ? _w : typeof r == "function" ? r : Yc(r);
  return this.select(function () {
    return this.insertBefore(
      o.apply(this, arguments),
      i.apply(this, arguments) || null
    );
  });
}
function jw() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Iw() {
  return this.each(jw);
}
function Mw() {
  var e = this.cloneNode(!1),
    r = this.parentNode;
  return r ? r.insertBefore(e, this.nextSibling) : e;
}
function Pw() {
  var e = this.cloneNode(!0),
    r = this.parentNode;
  return r ? r.insertBefore(e, this.nextSibling) : e;
}
function Rw(e) {
  return this.select(e ? Pw : Mw);
}
function Tw(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Lw(e) {
  return function (r) {
    e.call(this, r, this.__data__);
  };
}
function zw(e) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (r) {
      var o = "",
        i = r.indexOf(".");
      return (
        i >= 0 && ((o = r.slice(i + 1)), (r = r.slice(0, i))),
        { type: r, name: o }
      );
    });
}
function $w(e) {
  return function () {
    var r = this.__on;
    if (r) {
      for (var o = 0, i = -1, l = r.length, u; o < l; ++o)
        ((u = r[o]),
          (!e.type || u.type === e.type) && u.name === e.name
            ? this.removeEventListener(u.type, u.listener, u.options)
            : (r[++i] = u));
      ++i ? (r.length = i) : delete this.__on;
    }
  };
}
function Aw(e, r, o) {
  return function () {
    var i = this.__on,
      l,
      u = Lw(r);
    if (i) {
      for (var c = 0, f = i.length; c < f; ++c)
        if ((l = i[c]).type === e.type && l.name === e.name) {
          (this.removeEventListener(l.type, l.listener, l.options),
            this.addEventListener(l.type, (l.listener = u), (l.options = o)),
            (l.value = r));
          return;
        }
    }
    (this.addEventListener(e.type, u, o),
      (l = { type: e.type, name: e.name, value: r, listener: u, options: o }),
      i ? i.push(l) : (this.__on = [l]));
  };
}
function Dw(e, r, o) {
  var i = zw(e + ""),
    l,
    u = i.length,
    c;
  if (arguments.length < 2) {
    var f = this.node().__on;
    if (f) {
      for (var h = 0, p = f.length, x; h < p; ++h)
        for (l = 0, x = f[h]; l < u; ++l)
          if ((c = i[l]).type === x.type && c.name === x.name) return x.value;
    }
    return;
  }
  for (f = r ? Aw : $w, l = 0; l < u; ++l) this.each(f(i[l], r, o));
  return this;
}
function Um(e, r, o) {
  var i = Fm(e),
    l = i.CustomEvent;
  (typeof l == "function"
    ? (l = new l(r, o))
    : ((l = i.document.createEvent("Event")),
      o
        ? (l.initEvent(r, o.bubbles, o.cancelable), (l.detail = o.detail))
        : l.initEvent(r, !1, !1)),
    e.dispatchEvent(l));
}
function Ow(e, r) {
  return function () {
    return Um(this, e, r);
  };
}
function Fw(e, r) {
  return function () {
    return Um(this, e, r.apply(this, arguments));
  };
}
function Hw(e, r) {
  return this.each((typeof r == "function" ? Fw : Ow)(e, r));
}
function* Bw() {
  for (var e = this._groups, r = 0, o = e.length; r < o; ++r)
    for (var i = e[r], l = 0, u = i.length, c; l < u; ++l)
      (c = i[l]) && (yield c);
}
var Ym = [null];
function _t(e, r) {
  ((this._groups = e), (this._parents = r));
}
function zs() {
  return new _t([[document.documentElement]], Ym);
}
function Vw() {
  return this;
}
_t.prototype = zs.prototype = {
  constructor: _t,
  select: m1,
  selectAll: x1,
  selectChild: k1,
  selectChildren: b1,
  filter: j1,
  data: L1,
  enter: I1,
  exit: $1,
  join: A1,
  merge: D1,
  selection: Vw,
  order: O1,
  sort: F1,
  call: B1,
  nodes: V1,
  node: W1,
  size: U1,
  empty: Y1,
  each: X1,
  attr: ew,
  style: ow,
  property: aw,
  classed: fw,
  text: gw,
  html: ww,
  raise: Ew,
  lower: Cw,
  append: Nw,
  insert: bw,
  remove: Iw,
  clone: Rw,
  datum: Tw,
  on: Dw,
  dispatch: Hw,
  [Symbol.iterator]: Bw,
};
function Nt(e) {
  return typeof e == "string"
    ? new _t([[document.querySelector(e)]], [document.documentElement])
    : new _t([[e]], Ym);
}
function Ww(e) {
  let r;
  for (; (r = e.sourceEvent); ) e = r;
  return e;
}
function Vt(e, r) {
  if (((e = Ww(e)), r === void 0 && (r = e.currentTarget), r)) {
    var o = r.ownerSVGElement || r;
    if (o.createSVGPoint) {
      var i = o.createSVGPoint();
      return (
        (i.x = e.clientX),
        (i.y = e.clientY),
        (i = i.matrixTransform(r.getScreenCTM().inverse())),
        [i.x, i.y]
      );
    }
    if (r.getBoundingClientRect) {
      var l = r.getBoundingClientRect();
      return [
        e.clientX - l.left - r.clientLeft,
        e.clientY - l.top - r.clientTop,
      ];
    }
  }
  return [e.pageX, e.pageY];
}
const Uw = { passive: !1 },
  ks = { capture: !0, passive: !1 };
function Ju(e) {
  e.stopImmediatePropagation();
}
function so(e) {
  (e.preventDefault(), e.stopImmediatePropagation());
}
function Xm(e) {
  var r = e.document.documentElement,
    o = Nt(e).on("dragstart.drag", so, ks);
  "onselectstart" in r
    ? o.on("selectstart.drag", so, ks)
    : ((r.__noselect = r.style.MozUserSelect),
      (r.style.MozUserSelect = "none"));
}
function Km(e, r) {
  var o = e.document.documentElement,
    i = Nt(e).on("dragstart.drag", null);
  (r &&
    (i.on("click.drag", so, ks),
    setTimeout(function () {
      i.on("click.drag", null);
    }, 0)),
    "onselectstart" in o
      ? i.on("selectstart.drag", null)
      : ((o.style.MozUserSelect = o.__noselect), delete o.__noselect));
}
const ll = (e) => () => e;
function Ec(
  e,
  {
    sourceEvent: r,
    subject: o,
    target: i,
    identifier: l,
    active: u,
    x: c,
    y: f,
    dx: h,
    dy: p,
    dispatch: x,
  }
) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: r, enumerable: !0, configurable: !0 },
    subject: { value: o, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    identifier: { value: l, enumerable: !0, configurable: !0 },
    active: { value: u, enumerable: !0, configurable: !0 },
    x: { value: c, enumerable: !0, configurable: !0 },
    y: { value: f, enumerable: !0, configurable: !0 },
    dx: { value: h, enumerable: !0, configurable: !0 },
    dy: { value: p, enumerable: !0, configurable: !0 },
    _: { value: x },
  });
}
Ec.prototype.on = function () {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Yw(e) {
  return !e.ctrlKey && !e.button;
}
function Xw() {
  return this.parentNode;
}
function Kw(e, r) {
  return r ?? { x: e.x, y: e.y };
}
function Qw() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Qm() {
  var e = Yw,
    r = Xw,
    o = Kw,
    i = Qw,
    l = {},
    u = Hl("start", "drag", "end"),
    c = 0,
    f,
    h,
    p,
    x,
    g = 0;
  function v(j) {
    j.on("mousedown.drag", S)
      .filter(i)
      .on("touchstart.drag", N)
      .on("touchmove.drag", _, Uw)
      .on("touchend.drag touchcancel.drag", R)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function S(j, O) {
    if (!(x || !e.call(this, j, O))) {
      var A = E(this, r.call(this, j, O), j, O, "mouse");
      A &&
        (Nt(j.view).on("mousemove.drag", w, ks).on("mouseup.drag", b, ks),
        Xm(j.view),
        Ju(j),
        (p = !1),
        (f = j.clientX),
        (h = j.clientY),
        A("start", j));
    }
  }
  function w(j) {
    if ((so(j), !p)) {
      var O = j.clientX - f,
        A = j.clientY - h;
      p = O * O + A * A > g;
    }
    l.mouse("drag", j);
  }
  function b(j) {
    (Nt(j.view).on("mousemove.drag mouseup.drag", null),
      Km(j.view, p),
      so(j),
      l.mouse("end", j));
  }
  function N(j, O) {
    if (e.call(this, j, O)) {
      var A = j.changedTouches,
        P = r.call(this, j, O),
        H = A.length,
        V,
        re;
      for (V = 0; V < H; ++V)
        (re = E(this, P, j, O, A[V].identifier, A[V])) &&
          (Ju(j), re("start", j, A[V]));
    }
  }
  function _(j) {
    var O = j.changedTouches,
      A = O.length,
      P,
      H;
    for (P = 0; P < A; ++P)
      (H = l[O[P].identifier]) && (so(j), H("drag", j, O[P]));
  }
  function R(j) {
    var O = j.changedTouches,
      A = O.length,
      P,
      H;
    for (
      x && clearTimeout(x),
        x = setTimeout(function () {
          x = null;
        }, 500),
        P = 0;
      P < A;
      ++P
    )
      (H = l[O[P].identifier]) && (Ju(j), H("end", j, O[P]));
  }
  function E(j, O, A, P, H, V) {
    var re = u.copy(),
      Y = Vt(V || A, O),
      U,
      te,
      L;
    if (
      (L = o.call(
        j,
        new Ec("beforestart", {
          sourceEvent: A,
          target: v,
          identifier: H,
          active: c,
          x: Y[0],
          y: Y[1],
          dx: 0,
          dy: 0,
          dispatch: re,
        }),
        P
      )) != null
    )
      return (
        (U = L.x - Y[0] || 0),
        (te = L.y - Y[1] || 0),
        function K(B, X, z) {
          var $ = Y,
            W;
          switch (B) {
            case "start":
              ((l[H] = K), (W = c++));
              break;
            case "end":
              (delete l[H], --c);
            case "drag":
              ((Y = Vt(z || X, O)), (W = c));
              break;
          }
          re.call(
            B,
            j,
            new Ec(B, {
              sourceEvent: X,
              subject: L,
              target: v,
              identifier: H,
              active: W,
              x: Y[0] + U,
              y: Y[1] + te,
              dx: Y[0] - $[0],
              dy: Y[1] - $[1],
              dispatch: re,
            }),
            P
          );
        }
      );
  }
  return (
    (v.filter = function (j) {
      return arguments.length
        ? ((e = typeof j == "function" ? j : ll(!!j)), v)
        : e;
    }),
    (v.container = function (j) {
      return arguments.length
        ? ((r = typeof j == "function" ? j : ll(j)), v)
        : r;
    }),
    (v.subject = function (j) {
      return arguments.length
        ? ((o = typeof j == "function" ? j : ll(j)), v)
        : o;
    }),
    (v.touchable = function (j) {
      return arguments.length
        ? ((i = typeof j == "function" ? j : ll(!!j)), v)
        : i;
    }),
    (v.on = function () {
      var j = u.on.apply(u, arguments);
      return j === u ? v : j;
    }),
    (v.clickDistance = function (j) {
      return arguments.length ? ((g = (j = +j) * j), v) : Math.sqrt(g);
    }),
    v
  );
}
function Kc(e, r, o) {
  ((e.prototype = r.prototype = o), (o.constructor = e));
}
function Gm(e, r) {
  var o = Object.create(e.prototype);
  for (var i in r) o[i] = r[i];
  return o;
}
function $s() {}
var Cs = 0.7,
  jl = 1 / Cs,
  io = "\\s*([+-]?\\d+)\\s*",
  Ns = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  tn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Gw = /^#([0-9a-f]{3,8})$/,
  qw = new RegExp(`^rgb\\(${io},${io},${io}\\)$`),
  Zw = new RegExp(`^rgb\\(${tn},${tn},${tn}\\)$`),
  Jw = new RegExp(`^rgba\\(${io},${io},${io},${Ns}\\)$`),
  eS = new RegExp(`^rgba\\(${tn},${tn},${tn},${Ns}\\)$`),
  tS = new RegExp(`^hsl\\(${Ns},${tn},${tn}\\)$`),
  nS = new RegExp(`^hsla\\(${Ns},${tn},${tn},${Ns}\\)$`),
  tp = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
Kc($s, Sr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: np,
  formatHex: np,
  formatHex8: rS,
  formatHsl: oS,
  formatRgb: rp,
  toString: rp,
});
function np() {
  return this.rgb().formatHex();
}
function rS() {
  return this.rgb().formatHex8();
}
function oS() {
  return qm(this).formatHsl();
}
function rp() {
  return this.rgb().formatRgb();
}
function Sr(e) {
  var r, o;
  return (
    (e = (e + "").trim().toLowerCase()),
    (r = Gw.exec(e))
      ? ((o = r[1].length),
        (r = parseInt(r[1], 16)),
        o === 6
          ? op(r)
          : o === 3
            ? new xt(
                ((r >> 8) & 15) | ((r >> 4) & 240),
                ((r >> 4) & 15) | (r & 240),
                ((r & 15) << 4) | (r & 15),
                1
              )
            : o === 8
              ? al(
                  (r >> 24) & 255,
                  (r >> 16) & 255,
                  (r >> 8) & 255,
                  (r & 255) / 255
                )
              : o === 4
                ? al(
                    ((r >> 12) & 15) | ((r >> 8) & 240),
                    ((r >> 8) & 15) | ((r >> 4) & 240),
                    ((r >> 4) & 15) | (r & 240),
                    (((r & 15) << 4) | (r & 15)) / 255
                  )
                : null)
      : (r = qw.exec(e))
        ? new xt(r[1], r[2], r[3], 1)
        : (r = Zw.exec(e))
          ? new xt(
              (r[1] * 255) / 100,
              (r[2] * 255) / 100,
              (r[3] * 255) / 100,
              1
            )
          : (r = Jw.exec(e))
            ? al(r[1], r[2], r[3], r[4])
            : (r = eS.exec(e))
              ? al(
                  (r[1] * 255) / 100,
                  (r[2] * 255) / 100,
                  (r[3] * 255) / 100,
                  r[4]
                )
              : (r = tS.exec(e))
                ? lp(r[1], r[2] / 100, r[3] / 100, 1)
                : (r = nS.exec(e))
                  ? lp(r[1], r[2] / 100, r[3] / 100, r[4])
                  : tp.hasOwnProperty(e)
                    ? op(tp[e])
                    : e === "transparent"
                      ? new xt(NaN, NaN, NaN, 0)
                      : null
  );
}
function op(e) {
  return new xt((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function al(e, r, o, i) {
  return (i <= 0 && (e = r = o = NaN), new xt(e, r, o, i));
}
function sS(e) {
  return (
    e instanceof $s || (e = Sr(e)),
    e ? ((e = e.rgb()), new xt(e.r, e.g, e.b, e.opacity)) : new xt()
  );
}
function kc(e, r, o, i) {
  return arguments.length === 1 ? sS(e) : new xt(e, r, o, i ?? 1);
}
function xt(e, r, o, i) {
  ((this.r = +e), (this.g = +r), (this.b = +o), (this.opacity = +i));
}
Kc(
  xt,
  kc,
  Gm($s, {
    brighter(e) {
      return (
        (e = e == null ? jl : Math.pow(jl, e)),
        new xt(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? Cs : Math.pow(Cs, e)),
        new xt(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new xt(xr(this.r), xr(this.g), xr(this.b), Il(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: sp,
    formatHex: sp,
    formatHex8: iS,
    formatRgb: ip,
    toString: ip,
  })
);
function sp() {
  return `#${yr(this.r)}${yr(this.g)}${yr(this.b)}`;
}
function iS() {
  return `#${yr(this.r)}${yr(this.g)}${yr(this.b)}${yr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ip() {
  const e = Il(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${xr(this.r)}, ${xr(this.g)}, ${xr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Il(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function xr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function yr(e) {
  return ((e = xr(e)), (e < 16 ? "0" : "") + e.toString(16));
}
function lp(e, r, o, i) {
  return (
    i <= 0
      ? (e = r = o = NaN)
      : o <= 0 || o >= 1
        ? (e = r = NaN)
        : r <= 0 && (e = NaN),
    new Wt(e, r, o, i)
  );
}
function qm(e) {
  if (e instanceof Wt) return new Wt(e.h, e.s, e.l, e.opacity);
  if ((e instanceof $s || (e = Sr(e)), !e)) return new Wt();
  if (e instanceof Wt) return e;
  e = e.rgb();
  var r = e.r / 255,
    o = e.g / 255,
    i = e.b / 255,
    l = Math.min(r, o, i),
    u = Math.max(r, o, i),
    c = NaN,
    f = u - l,
    h = (u + l) / 2;
  return (
    f
      ? (r === u
          ? (c = (o - i) / f + (o < i) * 6)
          : o === u
            ? (c = (i - r) / f + 2)
            : (c = (r - o) / f + 4),
        (f /= h < 0.5 ? u + l : 2 - u - l),
        (c *= 60))
      : (f = h > 0 && h < 1 ? 0 : c),
    new Wt(c, f, h, e.opacity)
  );
}
function lS(e, r, o, i) {
  return arguments.length === 1 ? qm(e) : new Wt(e, r, o, i ?? 1);
}
function Wt(e, r, o, i) {
  ((this.h = +e), (this.s = +r), (this.l = +o), (this.opacity = +i));
}
Kc(
  Wt,
  lS,
  Gm($s, {
    brighter(e) {
      return (
        (e = e == null ? jl : Math.pow(jl, e)),
        new Wt(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? Cs : Math.pow(Cs, e)),
        new Wt(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        r = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        o = this.l,
        i = o + (o < 0.5 ? o : 1 - o) * r,
        l = 2 * o - i;
      return new xt(
        ec(e >= 240 ? e - 240 : e + 120, l, i),
        ec(e, l, i),
        ec(e < 120 ? e + 240 : e - 120, l, i),
        this.opacity
      );
    },
    clamp() {
      return new Wt(ap(this.h), ul(this.s), ul(this.l), Il(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const e = Il(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${ap(this.h)}, ${ul(this.s) * 100}%, ${ul(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  })
);
function ap(e) {
  return ((e = (e || 0) % 360), e < 0 ? e + 360 : e);
}
function ul(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ec(e, r, o) {
  return (
    (e < 60
      ? r + ((o - r) * e) / 60
      : e < 180
        ? o
        : e < 240
          ? r + ((o - r) * (240 - e)) / 60
          : r) * 255
  );
}
const Qc = (e) => () => e;
function aS(e, r) {
  return function (o) {
    return e + o * r;
  };
}
function uS(e, r, o) {
  return (
    (e = Math.pow(e, o)),
    (r = Math.pow(r, o) - e),
    (o = 1 / o),
    function (i) {
      return Math.pow(e + i * r, o);
    }
  );
}
function cS(e) {
  return (e = +e) == 1
    ? Zm
    : function (r, o) {
        return o - r ? uS(r, o, e) : Qc(isNaN(r) ? o : r);
      };
}
function Zm(e, r) {
  var o = r - e;
  return o ? aS(e, o) : Qc(isNaN(e) ? r : e);
}
const Ml = (function e(r) {
  var o = cS(r);
  function i(l, u) {
    var c = o((l = kc(l)).r, (u = kc(u)).r),
      f = o(l.g, u.g),
      h = o(l.b, u.b),
      p = Zm(l.opacity, u.opacity);
    return function (x) {
      return (
        (l.r = c(x)),
        (l.g = f(x)),
        (l.b = h(x)),
        (l.opacity = p(x)),
        l + ""
      );
    };
  }
  return ((i.gamma = e), i);
})(1);
function dS(e, r) {
  r || (r = []);
  var o = e ? Math.min(r.length, e.length) : 0,
    i = r.slice(),
    l;
  return function (u) {
    for (l = 0; l < o; ++l) i[l] = e[l] * (1 - u) + r[l] * u;
    return i;
  };
}
function fS(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function hS(e, r) {
  var o = r ? r.length : 0,
    i = e ? Math.min(o, e.length) : 0,
    l = new Array(i),
    u = new Array(o),
    c;
  for (c = 0; c < i; ++c) l[c] = ys(e[c], r[c]);
  for (; c < o; ++c) u[c] = r[c];
  return function (f) {
    for (c = 0; c < i; ++c) u[c] = l[c](f);
    return u;
  };
}
function pS(e, r) {
  var o = new Date();
  return (
    (e = +e),
    (r = +r),
    function (i) {
      return (o.setTime(e * (1 - i) + r * i), o);
    }
  );
}
function en(e, r) {
  return (
    (e = +e),
    (r = +r),
    function (o) {
      return e * (1 - o) + r * o;
    }
  );
}
function mS(e, r) {
  var o = {},
    i = {},
    l;
  ((e === null || typeof e != "object") && (e = {}),
    (r === null || typeof r != "object") && (r = {}));
  for (l in r) l in e ? (o[l] = ys(e[l], r[l])) : (i[l] = r[l]);
  return function (u) {
    for (l in o) i[l] = o[l](u);
    return i;
  };
}
var Cc = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  tc = new RegExp(Cc.source, "g");
function gS(e) {
  return function () {
    return e;
  };
}
function yS(e) {
  return function (r) {
    return e(r) + "";
  };
}
function Jm(e, r) {
  var o = (Cc.lastIndex = tc.lastIndex = 0),
    i,
    l,
    u,
    c = -1,
    f = [],
    h = [];
  for (e = e + "", r = r + ""; (i = Cc.exec(e)) && (l = tc.exec(r)); )
    ((u = l.index) > o &&
      ((u = r.slice(o, u)), f[c] ? (f[c] += u) : (f[++c] = u)),
      (i = i[0]) === (l = l[0])
        ? f[c]
          ? (f[c] += l)
          : (f[++c] = l)
        : ((f[++c] = null), h.push({ i: c, x: en(i, l) })),
      (o = tc.lastIndex));
  return (
    o < r.length && ((u = r.slice(o)), f[c] ? (f[c] += u) : (f[++c] = u)),
    f.length < 2
      ? h[0]
        ? yS(h[0].x)
        : gS(r)
      : ((r = h.length),
        function (p) {
          for (var x = 0, g; x < r; ++x) f[(g = h[x]).i] = g.x(p);
          return f.join("");
        })
  );
}
function ys(e, r) {
  var o = typeof r,
    i;
  return r == null || o === "boolean"
    ? Qc(r)
    : (o === "number"
        ? en
        : o === "string"
          ? (i = Sr(r))
            ? ((r = i), Ml)
            : Jm
          : r instanceof Sr
            ? Ml
            : r instanceof Date
              ? pS
              : fS(r)
                ? dS
                : Array.isArray(r)
                  ? hS
                  : (typeof r.valueOf != "function" &&
                        typeof r.toString != "function") ||
                      isNaN(r)
                    ? mS
                    : en)(e, r);
}
var up = 180 / Math.PI,
  Nc = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function e0(e, r, o, i, l, u) {
  var c, f, h;
  return (
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c)),
    (h = e * o + r * i) && ((o -= e * h), (i -= r * h)),
    (f = Math.sqrt(o * o + i * i)) && ((o /= f), (i /= f), (h /= f)),
    e * i < r * o && ((e = -e), (r = -r), (h = -h), (c = -c)),
    {
      translateX: l,
      translateY: u,
      rotate: Math.atan2(r, e) * up,
      skewX: Math.atan(h) * up,
      scaleX: c,
      scaleY: f,
    }
  );
}
var cl;
function vS(e) {
  const r = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    e + ""
  );
  return r.isIdentity ? Nc : e0(r.a, r.b, r.c, r.d, r.e, r.f);
}
function xS(e) {
  return e == null ||
    (cl || (cl = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    cl.setAttribute("transform", e),
    !(e = cl.transform.baseVal.consolidate()))
    ? Nc
    : ((e = e.matrix), e0(e.a, e.b, e.c, e.d, e.e, e.f));
}
function t0(e, r, o, i) {
  function l(p) {
    return p.length ? p.pop() + " " : "";
  }
  function u(p, x, g, v, S, w) {
    if (p !== g || x !== v) {
      var b = S.push("translate(", null, r, null, o);
      w.push({ i: b - 4, x: en(p, g) }, { i: b - 2, x: en(x, v) });
    } else (g || v) && S.push("translate(" + g + r + v + o);
  }
  function c(p, x, g, v) {
    p !== x
      ? (p - x > 180 ? (x += 360) : x - p > 180 && (p += 360),
        v.push({ i: g.push(l(g) + "rotate(", null, i) - 2, x: en(p, x) }))
      : x && g.push(l(g) + "rotate(" + x + i);
  }
  function f(p, x, g, v) {
    p !== x
      ? v.push({ i: g.push(l(g) + "skewX(", null, i) - 2, x: en(p, x) })
      : x && g.push(l(g) + "skewX(" + x + i);
  }
  function h(p, x, g, v, S, w) {
    if (p !== g || x !== v) {
      var b = S.push(l(S) + "scale(", null, ",", null, ")");
      w.push({ i: b - 4, x: en(p, g) }, { i: b - 2, x: en(x, v) });
    } else (g !== 1 || v !== 1) && S.push(l(S) + "scale(" + g + "," + v + ")");
  }
  return function (p, x) {
    var g = [],
      v = [];
    return (
      (p = e(p)),
      (x = e(x)),
      u(p.translateX, p.translateY, x.translateX, x.translateY, g, v),
      c(p.rotate, x.rotate, g, v),
      f(p.skewX, x.skewX, g, v),
      h(p.scaleX, p.scaleY, x.scaleX, x.scaleY, g, v),
      (p = x = null),
      function (S) {
        for (var w = -1, b = v.length, N; ++w < b; ) g[(N = v[w]).i] = N.x(S);
        return g.join("");
      }
    );
  };
}
var wS = t0(vS, "px, ", "px)", "deg)"),
  SS = t0(xS, ", ", ")", ")"),
  ES = 1e-12;
function cp(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function kS(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function CS(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const El = (function e(r, o, i) {
  function l(u, c) {
    var f = u[0],
      h = u[1],
      p = u[2],
      x = c[0],
      g = c[1],
      v = c[2],
      S = x - f,
      w = g - h,
      b = S * S + w * w,
      N,
      _;
    if (b < ES)
      ((_ = Math.log(v / p) / r),
        (N = function (P) {
          return [f + P * S, h + P * w, p * Math.exp(r * P * _)];
        }));
    else {
      var R = Math.sqrt(b),
        E = (v * v - p * p + i * b) / (2 * p * o * R),
        j = (v * v - p * p - i * b) / (2 * v * o * R),
        O = Math.log(Math.sqrt(E * E + 1) - E),
        A = Math.log(Math.sqrt(j * j + 1) - j);
      ((_ = (A - O) / r),
        (N = function (P) {
          var H = P * _,
            V = cp(O),
            re = (p / (o * R)) * (V * CS(r * H + O) - kS(O));
          return [f + re * S, h + re * w, (p * V) / cp(r * H + O)];
        }));
    }
    return ((N.duration = (_ * 1e3 * r) / Math.SQRT2), N);
  }
  return (
    (l.rho = function (u) {
      var c = Math.max(0.001, +u),
        f = c * c,
        h = f * f;
      return e(c, f, h);
    }),
    l
  );
})(Math.SQRT2, 2, 4);
var ao = 0,
  ms = 0,
  ds = 0,
  n0 = 1e3,
  Pl,
  gs,
  Rl = 0,
  Er = 0,
  Vl = 0,
  _s = typeof performance == "object" && performance.now ? performance : Date,
  r0 =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (e) {
          setTimeout(e, 17);
        };
function Gc() {
  return Er || (r0(NS), (Er = _s.now() + Vl));
}
function NS() {
  Er = 0;
}
function Tl() {
  this._call = this._time = this._next = null;
}
Tl.prototype = o0.prototype = {
  constructor: Tl,
  restart: function (e, r, o) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    ((o = (o == null ? Gc() : +o) + (r == null ? 0 : +r)),
      !this._next &&
        gs !== this &&
        (gs ? (gs._next = this) : (Pl = this), (gs = this)),
      (this._call = e),
      (this._time = o),
      _c());
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), _c());
  },
};
function o0(e, r, o) {
  var i = new Tl();
  return (i.restart(e, r, o), i);
}
function _S() {
  (Gc(), ++ao);
  for (var e = Pl, r; e; )
    ((r = Er - e._time) >= 0 && e._call.call(void 0, r), (e = e._next));
  --ao;
}
function dp() {
  ((Er = (Rl = _s.now()) + Vl), (ao = ms = 0));
  try {
    _S();
  } finally {
    ((ao = 0), jS(), (Er = 0));
  }
}
function bS() {
  var e = _s.now(),
    r = e - Rl;
  r > n0 && ((Vl -= r), (Rl = e));
}
function jS() {
  for (var e, r = Pl, o, i = 1 / 0; r; )
    r._call
      ? (i > r._time && (i = r._time), (e = r), (r = r._next))
      : ((o = r._next), (r._next = null), (r = e ? (e._next = o) : (Pl = o)));
  ((gs = e), _c(i));
}
function _c(e) {
  if (!ao) {
    ms && (ms = clearTimeout(ms));
    var r = e - Er;
    r > 24
      ? (e < 1 / 0 && (ms = setTimeout(dp, e - _s.now() - Vl)),
        ds && (ds = clearInterval(ds)))
      : (ds || ((Rl = _s.now()), (ds = setInterval(bS, n0))), (ao = 1), r0(dp));
  }
}
function fp(e, r, o) {
  var i = new Tl();
  return (
    (r = r == null ? 0 : +r),
    i.restart(
      (l) => {
        (i.stop(), e(l + r));
      },
      r,
      o
    ),
    i
  );
}
var IS = Hl("start", "end", "cancel", "interrupt"),
  MS = [],
  s0 = 0,
  hp = 1,
  bc = 2,
  kl = 3,
  pp = 4,
  jc = 5,
  Cl = 6;
function Wl(e, r, o, i, l, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (o in c) return;
  PS(e, o, {
    name: r,
    index: i,
    group: l,
    on: IS,
    tween: MS,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: s0,
  });
}
function qc(e, r) {
  var o = Xt(e, r);
  if (o.state > s0) throw new Error("too late; already scheduled");
  return o;
}
function on(e, r) {
  var o = Xt(e, r);
  if (o.state > kl) throw new Error("too late; already running");
  return o;
}
function Xt(e, r) {
  var o = e.__transition;
  if (!o || !(o = o[r])) throw new Error("transition not found");
  return o;
}
function PS(e, r, o) {
  var i = e.__transition,
    l;
  ((i[r] = o), (o.timer = o0(u, 0, o.time)));
  function u(p) {
    ((o.state = hp),
      o.timer.restart(c, o.delay, o.time),
      o.delay <= p && c(p - o.delay));
  }
  function c(p) {
    var x, g, v, S;
    if (o.state !== hp) return h();
    for (x in i)
      if (((S = i[x]), S.name === o.name)) {
        if (S.state === kl) return fp(c);
        S.state === pp
          ? ((S.state = Cl),
            S.timer.stop(),
            S.on.call("interrupt", e, e.__data__, S.index, S.group),
            delete i[x])
          : +x < r &&
            ((S.state = Cl),
            S.timer.stop(),
            S.on.call("cancel", e, e.__data__, S.index, S.group),
            delete i[x]);
      }
    if (
      (fp(function () {
        o.state === kl &&
          ((o.state = pp), o.timer.restart(f, o.delay, o.time), f(p));
      }),
      (o.state = bc),
      o.on.call("start", e, e.__data__, o.index, o.group),
      o.state === bc)
    ) {
      for (
        o.state = kl, l = new Array((v = o.tween.length)), x = 0, g = -1;
        x < v;
        ++x
      )
        (S = o.tween[x].value.call(e, e.__data__, o.index, o.group)) &&
          (l[++g] = S);
      l.length = g + 1;
    }
  }
  function f(p) {
    for (
      var x =
          p < o.duration
            ? o.ease.call(null, p / o.duration)
            : (o.timer.restart(h), (o.state = jc), 1),
        g = -1,
        v = l.length;
      ++g < v;
    )
      l[g].call(e, x);
    o.state === jc && (o.on.call("end", e, e.__data__, o.index, o.group), h());
  }
  function h() {
    ((o.state = Cl), o.timer.stop(), delete i[r]);
    for (var p in i) return;
    delete e.__transition;
  }
}
function Nl(e, r) {
  var o = e.__transition,
    i,
    l,
    u = !0,
    c;
  if (o) {
    r = r == null ? null : r + "";
    for (c in o) {
      if ((i = o[c]).name !== r) {
        u = !1;
        continue;
      }
      ((l = i.state > bc && i.state < jc),
        (i.state = Cl),
        i.timer.stop(),
        i.on.call(l ? "interrupt" : "cancel", e, e.__data__, i.index, i.group),
        delete o[c]);
    }
    u && delete e.__transition;
  }
}
function RS(e) {
  return this.each(function () {
    Nl(this, e);
  });
}
function TS(e, r) {
  var o, i;
  return function () {
    var l = on(this, e),
      u = l.tween;
    if (u !== o) {
      i = o = u;
      for (var c = 0, f = i.length; c < f; ++c)
        if (i[c].name === r) {
          ((i = i.slice()), i.splice(c, 1));
          break;
        }
    }
    l.tween = i;
  };
}
function LS(e, r, o) {
  var i, l;
  if (typeof o != "function") throw new Error();
  return function () {
    var u = on(this, e),
      c = u.tween;
    if (c !== i) {
      l = (i = c).slice();
      for (var f = { name: r, value: o }, h = 0, p = l.length; h < p; ++h)
        if (l[h].name === r) {
          l[h] = f;
          break;
        }
      h === p && l.push(f);
    }
    u.tween = l;
  };
}
function zS(e, r) {
  var o = this._id;
  if (((e += ""), arguments.length < 2)) {
    for (var i = Xt(this.node(), o).tween, l = 0, u = i.length, c; l < u; ++l)
      if ((c = i[l]).name === e) return c.value;
    return null;
  }
  return this.each((r == null ? TS : LS)(o, e, r));
}
function Zc(e, r, o) {
  var i = e._id;
  return (
    e.each(function () {
      var l = on(this, i);
      (l.value || (l.value = {}))[r] = o.apply(this, arguments);
    }),
    function (l) {
      return Xt(l, i).value[r];
    }
  );
}
function i0(e, r) {
  var o;
  return (
    typeof r == "number"
      ? en
      : r instanceof Sr
        ? Ml
        : (o = Sr(r))
          ? ((r = o), Ml)
          : Jm
  )(e, r);
}
function $S(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function AS(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function DS(e, r, o) {
  var i,
    l = o + "",
    u;
  return function () {
    var c = this.getAttribute(e);
    return c === l ? null : c === i ? u : (u = r((i = c), o));
  };
}
function OS(e, r, o) {
  var i,
    l = o + "",
    u;
  return function () {
    var c = this.getAttributeNS(e.space, e.local);
    return c === l ? null : c === i ? u : (u = r((i = c), o));
  };
}
function FS(e, r, o) {
  var i, l, u;
  return function () {
    var c,
      f = o(this),
      h;
    return f == null
      ? void this.removeAttribute(e)
      : ((c = this.getAttribute(e)),
        (h = f + ""),
        c === h
          ? null
          : c === i && h === l
            ? u
            : ((l = h), (u = r((i = c), f))));
  };
}
function HS(e, r, o) {
  var i, l, u;
  return function () {
    var c,
      f = o(this),
      h;
    return f == null
      ? void this.removeAttributeNS(e.space, e.local)
      : ((c = this.getAttributeNS(e.space, e.local)),
        (h = f + ""),
        c === h
          ? null
          : c === i && h === l
            ? u
            : ((l = h), (u = r((i = c), f))));
  };
}
function BS(e, r) {
  var o = Bl(e),
    i = o === "transform" ? SS : i0;
  return this.attrTween(
    e,
    typeof r == "function"
      ? (o.local ? HS : FS)(o, i, Zc(this, "attr." + e, r))
      : r == null
        ? (o.local ? AS : $S)(o)
        : (o.local ? OS : DS)(o, i, r)
  );
}
function VS(e, r) {
  return function (o) {
    this.setAttribute(e, r.call(this, o));
  };
}
function WS(e, r) {
  return function (o) {
    this.setAttributeNS(e.space, e.local, r.call(this, o));
  };
}
function US(e, r) {
  var o, i;
  function l() {
    var u = r.apply(this, arguments);
    return (u !== i && (o = (i = u) && WS(e, u)), o);
  }
  return ((l._value = r), l);
}
function YS(e, r) {
  var o, i;
  function l() {
    var u = r.apply(this, arguments);
    return (u !== i && (o = (i = u) && VS(e, u)), o);
  }
  return ((l._value = r), l);
}
function XS(e, r) {
  var o = "attr." + e;
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (r == null) return this.tween(o, null);
  if (typeof r != "function") throw new Error();
  var i = Bl(e);
  return this.tween(o, (i.local ? US : YS)(i, r));
}
function KS(e, r) {
  return function () {
    qc(this, e).delay = +r.apply(this, arguments);
  };
}
function QS(e, r) {
  return (
    (r = +r),
    function () {
      qc(this, e).delay = r;
    }
  );
}
function GS(e) {
  var r = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? KS : QS)(r, e))
    : Xt(this.node(), r).delay;
}
function qS(e, r) {
  return function () {
    on(this, e).duration = +r.apply(this, arguments);
  };
}
function ZS(e, r) {
  return (
    (r = +r),
    function () {
      on(this, e).duration = r;
    }
  );
}
function JS(e) {
  var r = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? qS : ZS)(r, e))
    : Xt(this.node(), r).duration;
}
function e2(e, r) {
  if (typeof r != "function") throw new Error();
  return function () {
    on(this, e).ease = r;
  };
}
function t2(e) {
  var r = this._id;
  return arguments.length ? this.each(e2(r, e)) : Xt(this.node(), r).ease;
}
function n2(e, r) {
  return function () {
    var o = r.apply(this, arguments);
    if (typeof o != "function") throw new Error();
    on(this, e).ease = o;
  };
}
function r2(e) {
  if (typeof e != "function") throw new Error();
  return this.each(n2(this._id, e));
}
function o2(e) {
  typeof e != "function" && (e = Am(e));
  for (var r = this._groups, o = r.length, i = new Array(o), l = 0; l < o; ++l)
    for (var u = r[l], c = u.length, f = (i[l] = []), h, p = 0; p < c; ++p)
      (h = u[p]) && e.call(h, h.__data__, p, u) && f.push(h);
  return new En(i, this._parents, this._name, this._id);
}
function s2(e) {
  if (e._id !== this._id) throw new Error();
  for (
    var r = this._groups,
      o = e._groups,
      i = r.length,
      l = o.length,
      u = Math.min(i, l),
      c = new Array(i),
      f = 0;
    f < u;
    ++f
  )
    for (
      var h = r[f], p = o[f], x = h.length, g = (c[f] = new Array(x)), v, S = 0;
      S < x;
      ++S
    )
      (v = h[S] || p[S]) && (g[S] = v);
  for (; f < i; ++f) c[f] = r[f];
  return new En(c, this._parents, this._name, this._id);
}
function i2(e) {
  return (e + "")
    .trim()
    .split(/^|\s+/)
    .every(function (r) {
      var o = r.indexOf(".");
      return (o >= 0 && (r = r.slice(0, o)), !r || r === "start");
    });
}
function l2(e, r, o) {
  var i,
    l,
    u = i2(r) ? qc : on;
  return function () {
    var c = u(this, e),
      f = c.on;
    (f !== i && (l = (i = f).copy()).on(r, o), (c.on = l));
  };
}
function a2(e, r) {
  var o = this._id;
  return arguments.length < 2
    ? Xt(this.node(), o).on.on(e)
    : this.each(l2(o, e, r));
}
function u2(e) {
  return function () {
    var r = this.parentNode;
    for (var o in this.__transition) if (+o !== e) return;
    r && r.removeChild(this);
  };
}
function c2() {
  return this.on("end.remove", u2(this._id));
}
function d2(e) {
  var r = this._name,
    o = this._id;
  typeof e != "function" && (e = Yc(e));
  for (var i = this._groups, l = i.length, u = new Array(l), c = 0; c < l; ++c)
    for (
      var f = i[c], h = f.length, p = (u[c] = new Array(h)), x, g, v = 0;
      v < h;
      ++v
    )
      (x = f[v]) &&
        (g = e.call(x, x.__data__, v, f)) &&
        ("__data__" in x && (g.__data__ = x.__data__),
        (p[v] = g),
        Wl(p[v], r, o, v, p, Xt(x, o)));
  return new En(u, this._parents, r, o);
}
function f2(e) {
  var r = this._name,
    o = this._id;
  typeof e != "function" && (e = $m(e));
  for (var i = this._groups, l = i.length, u = [], c = [], f = 0; f < l; ++f)
    for (var h = i[f], p = h.length, x, g = 0; g < p; ++g)
      if ((x = h[g])) {
        for (
          var v = e.call(x, x.__data__, g, h),
            S,
            w = Xt(x, o),
            b = 0,
            N = v.length;
          b < N;
          ++b
        )
          (S = v[b]) && Wl(S, r, o, b, v, w);
        (u.push(v), c.push(x));
      }
  return new En(u, c, r, o);
}
var h2 = zs.prototype.constructor;
function p2() {
  return new h2(this._groups, this._parents);
}
function m2(e, r) {
  var o, i, l;
  return function () {
    var u = lo(this, e),
      c = (this.style.removeProperty(e), lo(this, e));
    return u === c ? null : u === o && c === i ? l : (l = r((o = u), (i = c)));
  };
}
function l0(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function g2(e, r, o) {
  var i,
    l = o + "",
    u;
  return function () {
    var c = lo(this, e);
    return c === l ? null : c === i ? u : (u = r((i = c), o));
  };
}
function y2(e, r, o) {
  var i, l, u;
  return function () {
    var c = lo(this, e),
      f = o(this),
      h = f + "";
    return (
      f == null && (h = f = (this.style.removeProperty(e), lo(this, e))),
      c === h ? null : c === i && h === l ? u : ((l = h), (u = r((i = c), f)))
    );
  };
}
function v2(e, r) {
  var o,
    i,
    l,
    u = "style." + r,
    c = "end." + u,
    f;
  return function () {
    var h = on(this, e),
      p = h.on,
      x = h.value[u] == null ? f || (f = l0(r)) : void 0;
    ((p !== o || l !== x) && (i = (o = p).copy()).on(c, (l = x)), (h.on = i));
  };
}
function x2(e, r, o) {
  var i = (e += "") == "transform" ? wS : i0;
  return r == null
    ? this.styleTween(e, m2(e, i)).on("end.style." + e, l0(e))
    : typeof r == "function"
      ? this.styleTween(e, y2(e, i, Zc(this, "style." + e, r))).each(
          v2(this._id, e)
        )
      : this.styleTween(e, g2(e, i, r), o).on("end.style." + e, null);
}
function w2(e, r, o) {
  return function (i) {
    this.style.setProperty(e, r.call(this, i), o);
  };
}
function S2(e, r, o) {
  var i, l;
  function u() {
    var c = r.apply(this, arguments);
    return (c !== l && (i = (l = c) && w2(e, c, o)), i);
  }
  return ((u._value = r), u);
}
function E2(e, r, o) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (r == null) return this.tween(i, null);
  if (typeof r != "function") throw new Error();
  return this.tween(i, S2(e, r, o ?? ""));
}
function k2(e) {
  return function () {
    this.textContent = e;
  };
}
function C2(e) {
  return function () {
    var r = e(this);
    this.textContent = r ?? "";
  };
}
function N2(e) {
  return this.tween(
    "text",
    typeof e == "function"
      ? C2(Zc(this, "text", e))
      : k2(e == null ? "" : e + "")
  );
}
function _2(e) {
  return function (r) {
    this.textContent = e.call(this, r);
  };
}
function b2(e) {
  var r, o;
  function i() {
    var l = e.apply(this, arguments);
    return (l !== o && (r = (o = l) && _2(l)), r);
  }
  return ((i._value = e), i);
}
function j2(e) {
  var r = "text";
  if (arguments.length < 1) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, b2(e));
}
function I2() {
  for (
    var e = this._name,
      r = this._id,
      o = a0(),
      i = this._groups,
      l = i.length,
      u = 0;
    u < l;
    ++u
  )
    for (var c = i[u], f = c.length, h, p = 0; p < f; ++p)
      if ((h = c[p])) {
        var x = Xt(h, r);
        Wl(h, e, o, p, c, {
          time: x.time + x.delay + x.duration,
          delay: 0,
          duration: x.duration,
          ease: x.ease,
        });
      }
  return new En(i, this._parents, e, o);
}
function M2() {
  var e,
    r,
    o = this,
    i = o._id,
    l = o.size();
  return new Promise(function (u, c) {
    var f = { value: c },
      h = {
        value: function () {
          --l === 0 && u();
        },
      };
    (o.each(function () {
      var p = on(this, i),
        x = p.on;
      (x !== e &&
        ((r = (e = x).copy()),
        r._.cancel.push(f),
        r._.interrupt.push(f),
        r._.end.push(h)),
        (p.on = r));
    }),
      l === 0 && u());
  });
}
var P2 = 0;
function En(e, r, o, i) {
  ((this._groups = e), (this._parents = r), (this._name = o), (this._id = i));
}
function a0() {
  return ++P2;
}
var vn = zs.prototype;
En.prototype = {
  constructor: En,
  select: d2,
  selectAll: f2,
  selectChild: vn.selectChild,
  selectChildren: vn.selectChildren,
  filter: o2,
  merge: s2,
  selection: p2,
  transition: I2,
  call: vn.call,
  nodes: vn.nodes,
  node: vn.node,
  size: vn.size,
  empty: vn.empty,
  each: vn.each,
  on: a2,
  attr: BS,
  attrTween: XS,
  style: x2,
  styleTween: E2,
  text: N2,
  textTween: j2,
  remove: c2,
  tween: zS,
  delay: GS,
  duration: JS,
  ease: t2,
  easeVarying: r2,
  end: M2,
  [Symbol.iterator]: vn[Symbol.iterator],
};
function R2(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var T2 = { time: null, delay: 0, duration: 250, ease: R2 };
function L2(e, r) {
  for (var o; !(o = e.__transition) || !(o = o[r]); )
    if (!(e = e.parentNode)) throw new Error(`transition ${r} not found`);
  return o;
}
function z2(e) {
  var r, o;
  e instanceof En
    ? ((r = e._id), (e = e._name))
    : ((r = a0()), ((o = T2).time = Gc()), (e = e == null ? null : e + ""));
  for (var i = this._groups, l = i.length, u = 0; u < l; ++u)
    for (var c = i[u], f = c.length, h, p = 0; p < f; ++p)
      (h = c[p]) && Wl(h, e, r, p, c, o || L2(h, r));
  return new En(i, this._parents, e, r);
}
zs.prototype.interrupt = RS;
zs.prototype.transition = z2;
const dl = (e) => () => e;
function $2(e, { sourceEvent: r, target: o, transform: i, dispatch: l }) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: r, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: l },
  });
}
function xn(e, r, o) {
  ((this.k = e), (this.x = r), (this.y = o));
}
xn.prototype = {
  constructor: xn,
  scale: function (e) {
    return e === 1 ? this : new xn(this.k * e, this.x, this.y);
  },
  translate: function (e, r) {
    return (e === 0) & (r === 0)
      ? this
      : new xn(this.k, this.x + this.k * e, this.y + this.k * r);
  },
  apply: function (e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function (e) {
    return e * this.k + this.x;
  },
  applyY: function (e) {
    return e * this.k + this.y;
  },
  invert: function (e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function (e) {
    return (e - this.x) / this.k;
  },
  invertY: function (e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function (e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function (e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function () {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  },
};
var Ul = new xn(1, 0, 0);
u0.prototype = xn.prototype;
function u0(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Ul;
  return e.__zoom;
}
function nc(e) {
  e.stopImmediatePropagation();
}
function fs(e) {
  (e.preventDefault(), e.stopImmediatePropagation());
}
function A2(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function D2() {
  var e = this;
  return e instanceof SVGElement
    ? ((e = e.ownerSVGElement || e),
      e.hasAttribute("viewBox")
        ? ((e = e.viewBox.baseVal),
          [
            [e.x, e.y],
            [e.x + e.width, e.y + e.height],
          ])
        : [
            [0, 0],
            [e.width.baseVal.value, e.height.baseVal.value],
          ])
    : [
        [0, 0],
        [e.clientWidth, e.clientHeight],
      ];
}
function mp() {
  return this.__zoom || Ul;
}
function O2(e) {
  return (
    -e.deltaY *
    (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) *
    (e.ctrlKey ? 10 : 1)
  );
}
function F2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function H2(e, r, o) {
  var i = e.invertX(r[0][0]) - o[0][0],
    l = e.invertX(r[1][0]) - o[1][0],
    u = e.invertY(r[0][1]) - o[0][1],
    c = e.invertY(r[1][1]) - o[1][1];
  return e.translate(
    l > i ? (i + l) / 2 : Math.min(0, i) || Math.max(0, l),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function c0() {
  var e = A2,
    r = D2,
    o = H2,
    i = O2,
    l = F2,
    u = [0, 1 / 0],
    c = [
      [-1 / 0, -1 / 0],
      [1 / 0, 1 / 0],
    ],
    f = 250,
    h = El,
    p = Hl("start", "zoom", "end"),
    x,
    g,
    v,
    S = 500,
    w = 150,
    b = 0,
    N = 10;
  function _(L) {
    L.property("__zoom", mp)
      .on("wheel.zoom", H, { passive: !1 })
      .on("mousedown.zoom", V)
      .on("dblclick.zoom", re)
      .filter(l)
      .on("touchstart.zoom", Y)
      .on("touchmove.zoom", U)
      .on("touchend.zoom touchcancel.zoom", te)
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  ((_.transform = function (L, K, B, X) {
    var z = L.selection ? L.selection() : L;
    (z.property("__zoom", mp),
      L !== z
        ? O(L, K, B, X)
        : z.interrupt().each(function () {
            A(this, arguments)
              .event(X)
              .start()
              .zoom(null, typeof K == "function" ? K.apply(this, arguments) : K)
              .end();
          }));
  }),
    (_.scaleBy = function (L, K, B, X) {
      _.scaleTo(
        L,
        function () {
          var z = this.__zoom.k,
            $ = typeof K == "function" ? K.apply(this, arguments) : K;
          return z * $;
        },
        B,
        X
      );
    }),
    (_.scaleTo = function (L, K, B, X) {
      _.transform(
        L,
        function () {
          var z = r.apply(this, arguments),
            $ = this.__zoom,
            W =
              B == null
                ? j(z)
                : typeof B == "function"
                  ? B.apply(this, arguments)
                  : B,
            M = $.invert(W),
            I = typeof K == "function" ? K.apply(this, arguments) : K;
          return o(E(R($, I), W, M), z, c);
        },
        B,
        X
      );
    }),
    (_.translateBy = function (L, K, B, X) {
      _.transform(
        L,
        function () {
          return o(
            this.__zoom.translate(
              typeof K == "function" ? K.apply(this, arguments) : K,
              typeof B == "function" ? B.apply(this, arguments) : B
            ),
            r.apply(this, arguments),
            c
          );
        },
        null,
        X
      );
    }),
    (_.translateTo = function (L, K, B, X, z) {
      _.transform(
        L,
        function () {
          var $ = r.apply(this, arguments),
            W = this.__zoom,
            M =
              X == null
                ? j($)
                : typeof X == "function"
                  ? X.apply(this, arguments)
                  : X;
          return o(
            Ul.translate(M[0], M[1])
              .scale(W.k)
              .translate(
                typeof K == "function" ? -K.apply(this, arguments) : -K,
                typeof B == "function" ? -B.apply(this, arguments) : -B
              ),
            $,
            c
          );
        },
        X,
        z
      );
    }));
  function R(L, K) {
    return (
      (K = Math.max(u[0], Math.min(u[1], K))),
      K === L.k ? L : new xn(K, L.x, L.y)
    );
  }
  function E(L, K, B) {
    var X = K[0] - B[0] * L.k,
      z = K[1] - B[1] * L.k;
    return X === L.x && z === L.y ? L : new xn(L.k, X, z);
  }
  function j(L) {
    return [(+L[0][0] + +L[1][0]) / 2, (+L[0][1] + +L[1][1]) / 2];
  }
  function O(L, K, B, X) {
    L.on("start.zoom", function () {
      A(this, arguments).event(X).start();
    })
      .on("interrupt.zoom end.zoom", function () {
        A(this, arguments).event(X).end();
      })
      .tween("zoom", function () {
        var z = this,
          $ = arguments,
          W = A(z, $).event(X),
          M = r.apply(z, $),
          I = B == null ? j(M) : typeof B == "function" ? B.apply(z, $) : B,
          oe = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]),
          le = z.__zoom,
          Z = typeof K == "function" ? K.apply(z, $) : K,
          Q = h(le.invert(I).concat(oe / le.k), Z.invert(I).concat(oe / Z.k));
        return function (ne) {
          if (ne === 1) ne = Z;
          else {
            var J = Q(ne),
              ie = oe / J[2];
            ne = new xn(ie, I[0] - J[0] * ie, I[1] - J[1] * ie);
          }
          W.zoom(null, ne);
        };
      });
  }
  function A(L, K, B) {
    return (!B && L.__zooming) || new P(L, K);
  }
  function P(L, K) {
    ((this.that = L),
      (this.args = K),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = r.apply(L, K)),
      (this.taps = 0));
  }
  P.prototype = {
    event: function (L) {
      return (L && (this.sourceEvent = L), this);
    },
    start: function () {
      return (
        ++this.active === 1 &&
          ((this.that.__zooming = this), this.emit("start")),
        this
      );
    },
    zoom: function (L, K) {
      return (
        this.mouse &&
          L !== "mouse" &&
          (this.mouse[1] = K.invert(this.mouse[0])),
        this.touch0 &&
          L !== "touch" &&
          (this.touch0[1] = K.invert(this.touch0[0])),
        this.touch1 &&
          L !== "touch" &&
          (this.touch1[1] = K.invert(this.touch1[0])),
        (this.that.__zoom = K),
        this.emit("zoom"),
        this
      );
    },
    end: function () {
      return (
        --this.active === 0 && (delete this.that.__zooming, this.emit("end")),
        this
      );
    },
    emit: function (L) {
      var K = Nt(this.that).datum();
      p.call(
        L,
        this.that,
        new $2(L, {
          sourceEvent: this.sourceEvent,
          target: _,
          transform: this.that.__zoom,
          dispatch: p,
        }),
        K
      );
    },
  };
  function H(L, ...K) {
    if (!e.apply(this, arguments)) return;
    var B = A(this, K).event(L),
      X = this.__zoom,
      z = Math.max(
        u[0],
        Math.min(u[1], X.k * Math.pow(2, i.apply(this, arguments)))
      ),
      $ = Vt(L);
    if (B.wheel)
      ((B.mouse[0][0] !== $[0] || B.mouse[0][1] !== $[1]) &&
        (B.mouse[1] = X.invert((B.mouse[0] = $))),
        clearTimeout(B.wheel));
    else {
      if (X.k === z) return;
      ((B.mouse = [$, X.invert($)]), Nl(this), B.start());
    }
    (fs(L),
      (B.wheel = setTimeout(W, w)),
      B.zoom("mouse", o(E(R(X, z), B.mouse[0], B.mouse[1]), B.extent, c)));
    function W() {
      ((B.wheel = null), B.end());
    }
  }
  function V(L, ...K) {
    if (v || !e.apply(this, arguments)) return;
    var B = L.currentTarget,
      X = A(this, K, !0).event(L),
      z = Nt(L.view).on("mousemove.zoom", I, !0).on("mouseup.zoom", oe, !0),
      $ = Vt(L, B),
      W = L.clientX,
      M = L.clientY;
    (Xm(L.view),
      nc(L),
      (X.mouse = [$, this.__zoom.invert($)]),
      Nl(this),
      X.start());
    function I(le) {
      if ((fs(le), !X.moved)) {
        var Z = le.clientX - W,
          Q = le.clientY - M;
        X.moved = Z * Z + Q * Q > b;
      }
      X.event(le).zoom(
        "mouse",
        o(E(X.that.__zoom, (X.mouse[0] = Vt(le, B)), X.mouse[1]), X.extent, c)
      );
    }
    function oe(le) {
      (z.on("mousemove.zoom mouseup.zoom", null),
        Km(le.view, X.moved),
        fs(le),
        X.event(le).end());
    }
  }
  function re(L, ...K) {
    if (e.apply(this, arguments)) {
      var B = this.__zoom,
        X = Vt(L.changedTouches ? L.changedTouches[0] : L, this),
        z = B.invert(X),
        $ = B.k * (L.shiftKey ? 0.5 : 2),
        W = o(E(R(B, $), X, z), r.apply(this, K), c);
      (fs(L),
        f > 0
          ? Nt(this).transition().duration(f).call(O, W, X, L)
          : Nt(this).call(_.transform, W, X, L));
    }
  }
  function Y(L, ...K) {
    if (e.apply(this, arguments)) {
      var B = L.touches,
        X = B.length,
        z = A(this, K, L.changedTouches.length === X).event(L),
        $,
        W,
        M,
        I;
      for (nc(L), W = 0; W < X; ++W)
        ((M = B[W]),
          (I = Vt(M, this)),
          (I = [I, this.__zoom.invert(I), M.identifier]),
          z.touch0
            ? !z.touch1 &&
              z.touch0[2] !== I[2] &&
              ((z.touch1 = I), (z.taps = 0))
            : ((z.touch0 = I), ($ = !0), (z.taps = 1 + !!x)));
      (x && (x = clearTimeout(x)),
        $ &&
          (z.taps < 2 &&
            ((g = I[0]),
            (x = setTimeout(function () {
              x = null;
            }, S))),
          Nl(this),
          z.start()));
    }
  }
  function U(L, ...K) {
    if (this.__zooming) {
      var B = A(this, K).event(L),
        X = L.changedTouches,
        z = X.length,
        $,
        W,
        M,
        I;
      for (fs(L), $ = 0; $ < z; ++$)
        ((W = X[$]),
          (M = Vt(W, this)),
          B.touch0 && B.touch0[2] === W.identifier
            ? (B.touch0[0] = M)
            : B.touch1 && B.touch1[2] === W.identifier && (B.touch1[0] = M));
      if (((W = B.that.__zoom), B.touch1)) {
        var oe = B.touch0[0],
          le = B.touch0[1],
          Z = B.touch1[0],
          Q = B.touch1[1],
          ne = (ne = Z[0] - oe[0]) * ne + (ne = Z[1] - oe[1]) * ne,
          J = (J = Q[0] - le[0]) * J + (J = Q[1] - le[1]) * J;
        ((W = R(W, Math.sqrt(ne / J))),
          (M = [(oe[0] + Z[0]) / 2, (oe[1] + Z[1]) / 2]),
          (I = [(le[0] + Q[0]) / 2, (le[1] + Q[1]) / 2]));
      } else if (B.touch0) ((M = B.touch0[0]), (I = B.touch0[1]));
      else return;
      B.zoom("touch", o(E(W, M, I), B.extent, c));
    }
  }
  function te(L, ...K) {
    if (this.__zooming) {
      var B = A(this, K).event(L),
        X = L.changedTouches,
        z = X.length,
        $,
        W;
      for (
        nc(L),
          v && clearTimeout(v),
          v = setTimeout(function () {
            v = null;
          }, S),
          $ = 0;
        $ < z;
        ++$
      )
        ((W = X[$]),
          B.touch0 && B.touch0[2] === W.identifier
            ? delete B.touch0
            : B.touch1 && B.touch1[2] === W.identifier && delete B.touch1);
      if (
        (B.touch1 && !B.touch0 && ((B.touch0 = B.touch1), delete B.touch1),
        B.touch0)
      )
        B.touch0[1] = this.__zoom.invert(B.touch0[0]);
      else if (
        (B.end(),
        B.taps === 2 &&
          ((W = Vt(W, this)), Math.hypot(g[0] - W[0], g[1] - W[1]) < N))
      ) {
        var M = Nt(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return (
    (_.wheelDelta = function (L) {
      return arguments.length
        ? ((i = typeof L == "function" ? L : dl(+L)), _)
        : i;
    }),
    (_.filter = function (L) {
      return arguments.length
        ? ((e = typeof L == "function" ? L : dl(!!L)), _)
        : e;
    }),
    (_.touchable = function (L) {
      return arguments.length
        ? ((l = typeof L == "function" ? L : dl(!!L)), _)
        : l;
    }),
    (_.extent = function (L) {
      return arguments.length
        ? ((r =
            typeof L == "function"
              ? L
              : dl([
                  [+L[0][0], +L[0][1]],
                  [+L[1][0], +L[1][1]],
                ])),
          _)
        : r;
    }),
    (_.scaleExtent = function (L) {
      return arguments.length
        ? ((u[0] = +L[0]), (u[1] = +L[1]), _)
        : [u[0], u[1]];
    }),
    (_.translateExtent = function (L) {
      return arguments.length
        ? ((c[0][0] = +L[0][0]),
          (c[1][0] = +L[1][0]),
          (c[0][1] = +L[0][1]),
          (c[1][1] = +L[1][1]),
          _)
        : [
            [c[0][0], c[0][1]],
            [c[1][0], c[1][1]],
          ];
    }),
    (_.constrain = function (L) {
      return arguments.length ? ((o = L), _) : o;
    }),
    (_.duration = function (L) {
      return arguments.length ? ((f = +L), _) : f;
    }),
    (_.interpolate = function (L) {
      return arguments.length ? ((h = L), _) : h;
    }),
    (_.on = function () {
      var L = p.on.apply(p, arguments);
      return L === p ? _ : L;
    }),
    (_.clickDistance = function (L) {
      return arguments.length ? ((b = (L = +L) * L), _) : Math.sqrt(b);
    }),
    (_.tapDistance = function (L) {
      return arguments.length ? ((N = +L), _) : N;
    }),
    _
  );
}
const nn = {
    error001: () =>
      "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
    error002: () =>
      "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
    error003: (e) =>
      `Node type "${e}" not found. Using fallback type "default".`,
    error004: () =>
      "The React Flow parent container needs a width and a height to render the graph.",
    error005: () => "Only child nodes can use a parent extent.",
    error006: () => "Can't create edge. An edge needs a source and a target.",
    error007: (e) => `The old edge with id=${e} does not exist.`,
    error009: (e) => `Marker type "${e}" doesn't exist.`,
    error008: (e, { id: r, sourceHandle: o, targetHandle: i }) =>
      `Couldn't create edge for ${e} handle id: "${e === "source" ? o : i}", edge id: ${r}.`,
    error010: () =>
      "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
    error011: (e) =>
      `Edge type "${e}" not found. Using fallback type "default".`,
    error012: (e) =>
      `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
    error013: (e = "react") =>
      `It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,
    error014: () =>
      "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
    error015: () =>
      "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  },
  bs = [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  d0 = ["Enter", " ", "Escape"],
  f0 = {
    "node.a11yDescription.default":
      "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
    "node.a11yDescription.keyboardDisabled":
      "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
    "node.a11yDescription.ariaLiveMessage": ({ direction: e, x: r, y: o }) =>
      `Moved selected node ${e}. New position, x: ${r}, y: ${o}`,
    "edge.a11yDescription.default":
      "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
    "controls.ariaLabel": "Control Panel",
    "controls.zoomIn.ariaLabel": "Zoom In",
    "controls.zoomOut.ariaLabel": "Zoom Out",
    "controls.fitView.ariaLabel": "Fit View",
    "controls.interactive.ariaLabel": "Toggle Interactivity",
    "minimap.ariaLabel": "Mini Map",
    "handle.ariaLabel": "Handle",
  };
var uo;
(function (e) {
  ((e.Strict = "strict"), (e.Loose = "loose"));
})(uo || (uo = {}));
var wr;
(function (e) {
  ((e.Free = "free"), (e.Vertical = "vertical"), (e.Horizontal = "horizontal"));
})(wr || (wr = {}));
var js;
(function (e) {
  ((e.Partial = "partial"), (e.Full = "full"));
})(js || (js = {}));
const h0 = {
  inProgress: !1,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null,
  pointer: null,
};
var Xn;
(function (e) {
  ((e.Bezier = "default"),
    (e.Straight = "straight"),
    (e.Step = "step"),
    (e.SmoothStep = "smoothstep"),
    (e.SimpleBezier = "simplebezier"));
})(Xn || (Xn = {}));
var Ll;
(function (e) {
  ((e.Arrow = "arrow"), (e.ArrowClosed = "arrowclosed"));
})(Ll || (Ll = {}));
var Ne;
(function (e) {
  ((e.Left = "left"),
    (e.Top = "top"),
    (e.Right = "right"),
    (e.Bottom = "bottom"));
})(Ne || (Ne = {}));
const gp = {
  [Ne.Left]: Ne.Right,
  [Ne.Right]: Ne.Left,
  [Ne.Top]: Ne.Bottom,
  [Ne.Bottom]: Ne.Top,
};
function p0(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const m0 = (e) => "id" in e && "source" in e && "target" in e,
  B2 = (e) =>
    "id" in e && "position" in e && !("source" in e) && !("target" in e),
  Jc = (e) =>
    "id" in e && "internals" in e && !("source" in e) && !("target" in e),
  As = (e, r = [0, 0]) => {
    const { width: o, height: i } = kn(e),
      l = e.origin ?? r,
      u = o * l[0],
      c = i * l[1];
    return { x: e.position.x - u, y: e.position.y - c };
  },
  V2 = (e, r = { nodeOrigin: [0, 0] }) => {
    if (e.length === 0) return { x: 0, y: 0, width: 0, height: 0 };
    const o = e.reduce(
      (i, l) => {
        const u = typeof l == "string";
        let c = !r.nodeLookup && !u ? l : void 0;
        r.nodeLookup &&
          (c = u ? r.nodeLookup.get(l) : Jc(l) ? l : r.nodeLookup.get(l.id));
        const f = c ? zl(c, r.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
        return Yl(i, f);
      },
      { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }
    );
    return Xl(o);
  },
  Ds = (e, r = {}) => {
    let o = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 },
      i = !1;
    return (
      e.forEach((l) => {
        (r.filter === void 0 || r.filter(l)) && ((o = Yl(o, zl(l))), (i = !0));
      }),
      i ? Xl(o) : { x: 0, y: 0, width: 0, height: 0 }
    );
  },
  ed = (e, r, [o, i, l] = [0, 0, 1], u = !1, c = !1) => {
    const f = { ...Fs(r, [o, i, l]), width: r.width / l, height: r.height / l },
      h = [];
    for (const p of e.values()) {
      const { measured: x, selectable: g = !0, hidden: v = !1 } = p;
      if ((c && !g) || v) continue;
      const S = x.width ?? p.width ?? p.initialWidth ?? null,
        w = x.height ?? p.height ?? p.initialHeight ?? null,
        b = Is(f, fo(p)),
        N = (S ?? 0) * (w ?? 0),
        _ = u && b > 0;
      (!p.internals.handleBounds || _ || b >= N || p.dragging) && h.push(p);
    }
    return h;
  },
  W2 = (e, r) => {
    const o = new Set();
    return (
      e.forEach((i) => {
        o.add(i.id);
      }),
      r.filter((i) => o.has(i.source) || o.has(i.target))
    );
  };
function U2(e, r) {
  const o = new Map(),
    i = r != null && r.nodes ? new Set(r.nodes.map((l) => l.id)) : null;
  return (
    e.forEach((l) => {
      l.measured.width &&
        l.measured.height &&
        ((r == null ? void 0 : r.includeHiddenNodes) || !l.hidden) &&
        (!i || i.has(l.id)) &&
        o.set(l.id, l);
    }),
    o
  );
}
async function Y2(
  { nodes: e, width: r, height: o, panZoom: i, minZoom: l, maxZoom: u },
  c
) {
  if (e.size === 0) return Promise.resolve(!0);
  const f = U2(e, c),
    h = Ds(f),
    p = td(
      h,
      r,
      o,
      (c == null ? void 0 : c.minZoom) ?? l,
      (c == null ? void 0 : c.maxZoom) ?? u,
      (c == null ? void 0 : c.padding) ?? 0.1
    );
  return (
    await i.setViewport(p, {
      duration: c == null ? void 0 : c.duration,
      ease: c == null ? void 0 : c.ease,
      interpolate: c == null ? void 0 : c.interpolate,
    }),
    Promise.resolve(!0)
  );
}
function g0({
  nodeId: e,
  nextPosition: r,
  nodeLookup: o,
  nodeOrigin: i = [0, 0],
  nodeExtent: l,
  onError: u,
}) {
  const c = o.get(e),
    f = c.parentId ? o.get(c.parentId) : void 0,
    { x: h, y: p } = f ? f.internals.positionAbsolute : { x: 0, y: 0 },
    x = c.origin ?? i;
  let g = c.extent || l;
  if (c.extent === "parent" && !c.expandParent)
    if (!f) u == null || u("005", nn.error005());
    else {
      const S = f.measured.width,
        w = f.measured.height;
      S &&
        w &&
        (g = [
          [h, p],
          [h + S, p + w],
        ]);
    }
  else
    f &&
      ho(c.extent) &&
      (g = [
        [c.extent[0][0] + h, c.extent[0][1] + p],
        [c.extent[1][0] + h, c.extent[1][1] + p],
      ]);
  const v = ho(g) ? kr(r, g, c.measured) : r;
  return (
    (c.measured.width === void 0 || c.measured.height === void 0) &&
      (u == null || u("015", nn.error015())),
    {
      position: {
        x: v.x - h + (c.measured.width ?? 0) * x[0],
        y: v.y - p + (c.measured.height ?? 0) * x[1],
      },
      positionAbsolute: v,
    }
  );
}
async function X2({
  nodesToRemove: e = [],
  edgesToRemove: r = [],
  nodes: o,
  edges: i,
  onBeforeDelete: l,
}) {
  const u = new Set(e.map((v) => v.id)),
    c = [];
  for (const v of o) {
    if (v.deletable === !1) continue;
    const S = u.has(v.id),
      w = !S && v.parentId && c.find((b) => b.id === v.parentId);
    (S || w) && c.push(v);
  }
  const f = new Set(r.map((v) => v.id)),
    h = i.filter((v) => v.deletable !== !1),
    x = W2(c, h);
  for (const v of h) f.has(v.id) && !x.find((w) => w.id === v.id) && x.push(v);
  if (!l) return { edges: x, nodes: c };
  const g = await l({ nodes: c, edges: x });
  return typeof g == "boolean"
    ? g
      ? { edges: x, nodes: c }
      : { edges: [], nodes: [] }
    : g;
}
const co = (e, r = 0, o = 1) => Math.min(Math.max(e, r), o),
  kr = (e = { x: 0, y: 0 }, r, o) => ({
    x: co(e.x, r[0][0], r[1][0] - ((o == null ? void 0 : o.width) ?? 0)),
    y: co(e.y, r[0][1], r[1][1] - ((o == null ? void 0 : o.height) ?? 0)),
  });
function y0(e, r, o) {
  const { width: i, height: l } = kn(o),
    { x: u, y: c } = o.internals.positionAbsolute;
  return kr(
    e,
    [
      [u, c],
      [u + i, c + l],
    ],
    r
  );
}
const yp = (e, r, o) =>
    e < r
      ? co(Math.abs(e - r), 1, r) / r
      : e > o
        ? -co(Math.abs(e - o), 1, r) / r
        : 0,
  v0 = (e, r, o = 15, i = 40) => {
    const l = yp(e.x, i, r.width - i) * o,
      u = yp(e.y, i, r.height - i) * o;
    return [l, u];
  },
  Yl = (e, r) => ({
    x: Math.min(e.x, r.x),
    y: Math.min(e.y, r.y),
    x2: Math.max(e.x2, r.x2),
    y2: Math.max(e.y2, r.y2),
  }),
  Ic = ({ x: e, y: r, width: o, height: i }) => ({
    x: e,
    y: r,
    x2: e + o,
    y2: r + i,
  }),
  Xl = ({ x: e, y: r, x2: o, y2: i }) => ({
    x: e,
    y: r,
    width: o - e,
    height: i - r,
  }),
  fo = (e, r = [0, 0]) => {
    var l, u;
    const { x: o, y: i } = Jc(e) ? e.internals.positionAbsolute : As(e, r);
    return {
      x: o,
      y: i,
      width:
        ((l = e.measured) == null ? void 0 : l.width) ??
        e.width ??
        e.initialWidth ??
        0,
      height:
        ((u = e.measured) == null ? void 0 : u.height) ??
        e.height ??
        e.initialHeight ??
        0,
    };
  },
  zl = (e, r = [0, 0]) => {
    var l, u;
    const { x: o, y: i } = Jc(e) ? e.internals.positionAbsolute : As(e, r);
    return {
      x: o,
      y: i,
      x2:
        o +
        (((l = e.measured) == null ? void 0 : l.width) ??
          e.width ??
          e.initialWidth ??
          0),
      y2:
        i +
        (((u = e.measured) == null ? void 0 : u.height) ??
          e.height ??
          e.initialHeight ??
          0),
    };
  },
  x0 = (e, r) => Xl(Yl(Ic(e), Ic(r))),
  Is = (e, r) => {
    const o = Math.max(
        0,
        Math.min(e.x + e.width, r.x + r.width) - Math.max(e.x, r.x)
      ),
      i = Math.max(
        0,
        Math.min(e.y + e.height, r.y + r.height) - Math.max(e.y, r.y)
      );
    return Math.ceil(o * i);
  },
  vp = (e) => Ut(e.width) && Ut(e.height) && Ut(e.x) && Ut(e.y),
  Ut = (e) => !isNaN(e) && isFinite(e),
  K2 = (e, r) => {},
  Os = (e, r = [1, 1]) => ({
    x: r[0] * Math.round(e.x / r[0]),
    y: r[1] * Math.round(e.y / r[1]),
  }),
  Fs = ({ x: e, y: r }, [o, i, l], u = !1, c = [1, 1]) => {
    const f = { x: (e - o) / l, y: (r - i) / l };
    return u ? Os(f, c) : f;
  },
  $l = ({ x: e, y: r }, [o, i, l]) => ({ x: e * l + o, y: r * l + i });
function eo(e, r) {
  if (typeof e == "number") return Math.floor((r - r / (1 + e)) * 0.5);
  if (typeof e == "string" && e.endsWith("px")) {
    const o = parseFloat(e);
    if (!Number.isNaN(o)) return Math.floor(o);
  }
  if (typeof e == "string" && e.endsWith("%")) {
    const o = parseFloat(e);
    if (!Number.isNaN(o)) return Math.floor(r * o * 0.01);
  }
  return (
    console.error(
      `[React Flow] The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`
    ),
    0
  );
}
function Q2(e, r, o) {
  if (typeof e == "string" || typeof e == "number") {
    const i = eo(e, o),
      l = eo(e, r);
    return { top: i, right: l, bottom: i, left: l, x: l * 2, y: i * 2 };
  }
  if (typeof e == "object") {
    const i = eo(e.top ?? e.y ?? 0, o),
      l = eo(e.bottom ?? e.y ?? 0, o),
      u = eo(e.left ?? e.x ?? 0, r),
      c = eo(e.right ?? e.x ?? 0, r);
    return { top: i, right: c, bottom: l, left: u, x: u + c, y: i + l };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function G2(e, r, o, i, l, u) {
  const { x: c, y: f } = $l(e, [r, o, i]),
    { x: h, y: p } = $l({ x: e.x + e.width, y: e.y + e.height }, [r, o, i]),
    x = l - h,
    g = u - p;
  return {
    left: Math.floor(c),
    top: Math.floor(f),
    right: Math.floor(x),
    bottom: Math.floor(g),
  };
}
const td = (e, r, o, i, l, u) => {
    const c = Q2(u, r, o),
      f = (r - c.x) / e.width,
      h = (o - c.y) / e.height,
      p = Math.min(f, h),
      x = co(p, i, l),
      g = e.x + e.width / 2,
      v = e.y + e.height / 2,
      S = r / 2 - g * x,
      w = o / 2 - v * x,
      b = G2(e, S, w, x, r, o),
      N = {
        left: Math.min(b.left - c.left, 0),
        top: Math.min(b.top - c.top, 0),
        right: Math.min(b.right - c.right, 0),
        bottom: Math.min(b.bottom - c.bottom, 0),
      };
    return { x: S - N.left + N.right, y: w - N.top + N.bottom, zoom: x };
  },
  Ms = () => {
    var e;
    return (
      typeof navigator < "u" &&
      ((e = navigator == null ? void 0 : navigator.userAgent) == null
        ? void 0
        : e.indexOf("Mac")) >= 0
    );
  };
function ho(e) {
  return e != null && e !== "parent";
}
function kn(e) {
  var r, o;
  return {
    width:
      ((r = e.measured) == null ? void 0 : r.width) ??
      e.width ??
      e.initialWidth ??
      0,
    height:
      ((o = e.measured) == null ? void 0 : o.height) ??
      e.height ??
      e.initialHeight ??
      0,
  };
}
function w0(e) {
  var r, o;
  return (
    (((r = e.measured) == null ? void 0 : r.width) ??
      e.width ??
      e.initialWidth) !== void 0 &&
    (((o = e.measured) == null ? void 0 : o.height) ??
      e.height ??
      e.initialHeight) !== void 0
  );
}
function S0(e, r = { width: 0, height: 0 }, o, i, l) {
  const u = { ...e },
    c = i.get(o);
  if (c) {
    const f = c.origin || l;
    ((u.x += c.internals.positionAbsolute.x - (r.width ?? 0) * f[0]),
      (u.y += c.internals.positionAbsolute.y - (r.height ?? 0) * f[1]));
  }
  return u;
}
function xp(e, r) {
  if (e.size !== r.size) return !1;
  for (const o of e) if (!r.has(o)) return !1;
  return !0;
}
function q2() {
  let e, r;
  return {
    promise: new Promise((i, l) => {
      ((e = i), (r = l));
    }),
    resolve: e,
    reject: r,
  };
}
function Z2(e) {
  return { ...f0, ...(e || {}) };
}
function vs(
  e,
  { snapGrid: r = [0, 0], snapToGrid: o = !1, transform: i, containerBounds: l }
) {
  const { x: u, y: c } = Yt(e),
    f = Fs(
      {
        x: u - ((l == null ? void 0 : l.left) ?? 0),
        y: c - ((l == null ? void 0 : l.top) ?? 0),
      },
      i
    ),
    { x: h, y: p } = o ? Os(f, r) : f;
  return { xSnapped: h, ySnapped: p, ...f };
}
const nd = (e) => ({ width: e.offsetWidth, height: e.offsetHeight }),
  E0 = (e) => {
    var r;
    return (
      ((r = e == null ? void 0 : e.getRootNode) == null ? void 0 : r.call(e)) ||
      (window == null ? void 0 : window.document)
    );
  },
  J2 = ["INPUT", "SELECT", "TEXTAREA"];
function k0(e) {
  var i, l;
  const r =
    ((l = (i = e.composedPath) == null ? void 0 : i.call(e)) == null
      ? void 0
      : l[0]) || e.target;
  return (r == null ? void 0 : r.nodeType) !== 1
    ? !1
    : J2.includes(r.nodeName) ||
        r.hasAttribute("contenteditable") ||
        !!r.closest(".nokey");
}
const C0 = (e) => "clientX" in e,
  Yt = (e, r) => {
    var u, c;
    const o = C0(e),
      i = o ? e.clientX : (u = e.touches) == null ? void 0 : u[0].clientX,
      l = o ? e.clientY : (c = e.touches) == null ? void 0 : c[0].clientY;
    return {
      x: i - ((r == null ? void 0 : r.left) ?? 0),
      y: l - ((r == null ? void 0 : r.top) ?? 0),
    };
  },
  wp = (e, r, o, i, l) => {
    const u = r.querySelectorAll(`.${e}`);
    return !u || !u.length
      ? null
      : Array.from(u).map((c) => {
          const f = c.getBoundingClientRect();
          return {
            id: c.getAttribute("data-handleid"),
            type: e,
            nodeId: l,
            position: c.getAttribute("data-handlepos"),
            x: (f.left - o.left) / i,
            y: (f.top - o.top) / i,
            ...nd(c),
          };
        });
  };
function N0({
  sourceX: e,
  sourceY: r,
  targetX: o,
  targetY: i,
  sourceControlX: l,
  sourceControlY: u,
  targetControlX: c,
  targetControlY: f,
}) {
  const h = e * 0.125 + l * 0.375 + c * 0.375 + o * 0.125,
    p = r * 0.125 + u * 0.375 + f * 0.375 + i * 0.125,
    x = Math.abs(h - e),
    g = Math.abs(p - r);
  return [h, p, x, g];
}
function fl(e, r) {
  return e >= 0 ? 0.5 * e : r * 25 * Math.sqrt(-e);
}
function Sp({ pos: e, x1: r, y1: o, x2: i, y2: l, c: u }) {
  switch (e) {
    case Ne.Left:
      return [r - fl(r - i, u), o];
    case Ne.Right:
      return [r + fl(i - r, u), o];
    case Ne.Top:
      return [r, o - fl(o - l, u)];
    case Ne.Bottom:
      return [r, o + fl(l - o, u)];
  }
}
function _0({
  sourceX: e,
  sourceY: r,
  sourcePosition: o = Ne.Bottom,
  targetX: i,
  targetY: l,
  targetPosition: u = Ne.Top,
  curvature: c = 0.25,
}) {
  const [f, h] = Sp({ pos: o, x1: e, y1: r, x2: i, y2: l, c }),
    [p, x] = Sp({ pos: u, x1: i, y1: l, x2: e, y2: r, c }),
    [g, v, S, w] = N0({
      sourceX: e,
      sourceY: r,
      targetX: i,
      targetY: l,
      sourceControlX: f,
      sourceControlY: h,
      targetControlX: p,
      targetControlY: x,
    });
  return [`M${e},${r} C${f},${h} ${p},${x} ${i},${l}`, g, v, S, w];
}
function b0({ sourceX: e, sourceY: r, targetX: o, targetY: i }) {
  const l = Math.abs(o - e) / 2,
    u = o < e ? o + l : o - l,
    c = Math.abs(i - r) / 2,
    f = i < r ? i + c : i - c;
  return [u, f, l, c];
}
function eE({
  sourceNode: e,
  targetNode: r,
  selected: o = !1,
  zIndex: i = 0,
  elevateOnSelect: l = !1,
  zIndexMode: u = "basic",
}) {
  if (u === "manual") return i;
  const c = l && o ? i + 1e3 : i,
    f = Math.max(
      e.parentId || (l && e.selected) ? e.internals.z : 0,
      r.parentId || (l && r.selected) ? r.internals.z : 0
    );
  return c + f;
}
function tE({
  sourceNode: e,
  targetNode: r,
  width: o,
  height: i,
  transform: l,
}) {
  const u = Yl(zl(e), zl(r));
  (u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1));
  const c = {
    x: -l[0] / l[2],
    y: -l[1] / l[2],
    width: o / l[2],
    height: i / l[2],
  };
  return Is(c, Xl(u)) > 0;
}
const nE = ({ source: e, sourceHandle: r, target: o, targetHandle: i }) =>
    `xy-edge__${e}${r || ""}-${o}${i || ""}`,
  rE = (e, r) =>
    r.some(
      (o) =>
        o.source === e.source &&
        o.target === e.target &&
        (o.sourceHandle === e.sourceHandle ||
          (!o.sourceHandle && !e.sourceHandle)) &&
        (o.targetHandle === e.targetHandle ||
          (!o.targetHandle && !e.targetHandle))
    ),
  j0 = (e, r, o = {}) => {
    if (!e.source || !e.target) return r;
    const i = o.getEdgeId || nE;
    let l;
    return (
      m0(e) ? (l = { ...e }) : (l = { ...e, id: i(e) }),
      rE(l, r)
        ? r
        : (l.sourceHandle === null && delete l.sourceHandle,
          l.targetHandle === null && delete l.targetHandle,
          r.concat(l))
    );
  };
function I0({ sourceX: e, sourceY: r, targetX: o, targetY: i }) {
  const [l, u, c, f] = b0({ sourceX: e, sourceY: r, targetX: o, targetY: i });
  return [`M ${e},${r}L ${o},${i}`, l, u, c, f];
}
const Ep = {
    [Ne.Left]: { x: -1, y: 0 },
    [Ne.Right]: { x: 1, y: 0 },
    [Ne.Top]: { x: 0, y: -1 },
    [Ne.Bottom]: { x: 0, y: 1 },
  },
  oE = ({ source: e, sourcePosition: r = Ne.Bottom, target: o }) =>
    r === Ne.Left || r === Ne.Right
      ? e.x < o.x
        ? { x: 1, y: 0 }
        : { x: -1, y: 0 }
      : e.y < o.y
        ? { x: 0, y: 1 }
        : { x: 0, y: -1 },
  kp = (e, r) => Math.sqrt(Math.pow(r.x - e.x, 2) + Math.pow(r.y - e.y, 2));
function sE({
  source: e,
  sourcePosition: r = Ne.Bottom,
  target: o,
  targetPosition: i = Ne.Top,
  center: l,
  offset: u,
  stepPosition: c,
}) {
  const f = Ep[r],
    h = Ep[i],
    p = { x: e.x + f.x * u, y: e.y + f.y * u },
    x = { x: o.x + h.x * u, y: o.y + h.y * u },
    g = oE({ source: p, sourcePosition: r, target: x }),
    v = g.x !== 0 ? "x" : "y",
    S = g[v];
  let w = [],
    b,
    N;
  const _ = { x: 0, y: 0 },
    R = { x: 0, y: 0 },
    [, , E, j] = b0({ sourceX: e.x, sourceY: e.y, targetX: o.x, targetY: o.y });
  if (f[v] * h[v] === -1) {
    v === "x"
      ? ((b = l.x ?? p.x + (x.x - p.x) * c), (N = l.y ?? (p.y + x.y) / 2))
      : ((b = l.x ?? (p.x + x.x) / 2), (N = l.y ?? p.y + (x.y - p.y) * c));
    const A = [
        { x: b, y: p.y },
        { x: b, y: x.y },
      ],
      P = [
        { x: p.x, y: N },
        { x: x.x, y: N },
      ];
    f[v] === S ? (w = v === "x" ? A : P) : (w = v === "x" ? P : A);
  } else {
    const A = [{ x: p.x, y: x.y }],
      P = [{ x: x.x, y: p.y }];
    if (
      (v === "x" ? (w = f.x === S ? P : A) : (w = f.y === S ? A : P), r === i)
    ) {
      const U = Math.abs(e[v] - o[v]);
      if (U <= u) {
        const te = Math.min(u - 1, u - U);
        f[v] === S
          ? (_[v] = (p[v] > e[v] ? -1 : 1) * te)
          : (R[v] = (x[v] > o[v] ? -1 : 1) * te);
      }
    }
    if (r !== i) {
      const U = v === "x" ? "y" : "x",
        te = f[v] === h[U],
        L = p[U] > x[U],
        K = p[U] < x[U];
      ((f[v] === 1 && ((!te && L) || (te && K))) ||
        (f[v] !== 1 && ((!te && K) || (te && L)))) &&
        (w = v === "x" ? A : P);
    }
    const H = { x: p.x + _.x, y: p.y + _.y },
      V = { x: x.x + R.x, y: x.y + R.y },
      re = Math.max(Math.abs(H.x - w[0].x), Math.abs(V.x - w[0].x)),
      Y = Math.max(Math.abs(H.y - w[0].y), Math.abs(V.y - w[0].y));
    re >= Y
      ? ((b = (H.x + V.x) / 2), (N = w[0].y))
      : ((b = w[0].x), (N = (H.y + V.y) / 2));
  }
  return [
    [
      e,
      { x: p.x + _.x, y: p.y + _.y },
      ...w,
      { x: x.x + R.x, y: x.y + R.y },
      o,
    ],
    b,
    N,
    E,
    j,
  ];
}
function iE(e, r, o, i) {
  const l = Math.min(kp(e, r) / 2, kp(r, o) / 2, i),
    { x: u, y: c } = r;
  if ((e.x === u && u === o.x) || (e.y === c && c === o.y)) return `L${u} ${c}`;
  if (e.y === c) {
    const p = e.x < o.x ? -1 : 1,
      x = e.y < o.y ? 1 : -1;
    return `L ${u + l * p},${c}Q ${u},${c} ${u},${c + l * x}`;
  }
  const f = e.x < o.x ? 1 : -1,
    h = e.y < o.y ? -1 : 1;
  return `L ${u},${c + l * h}Q ${u},${c} ${u + l * f},${c}`;
}
function Mc({
  sourceX: e,
  sourceY: r,
  sourcePosition: o = Ne.Bottom,
  targetX: i,
  targetY: l,
  targetPosition: u = Ne.Top,
  borderRadius: c = 5,
  centerX: f,
  centerY: h,
  offset: p = 20,
  stepPosition: x = 0.5,
}) {
  const [g, v, S, w, b] = sE({
    source: { x: e, y: r },
    sourcePosition: o,
    target: { x: i, y: l },
    targetPosition: u,
    center: { x: f, y: h },
    offset: p,
    stepPosition: x,
  });
  return [
    g.reduce((_, R, E) => {
      let j = "";
      return (
        E > 0 && E < g.length - 1
          ? (j = iE(g[E - 1], R, g[E + 1], c))
          : (j = `${E === 0 ? "M" : "L"}${R.x} ${R.y}`),
        (_ += j),
        _
      );
    }, ""),
    v,
    S,
    w,
    b,
  ];
}
function Cp(e) {
  var r;
  return (
    e &&
    !!(e.internals.handleBounds || ((r = e.handles) != null && r.length)) &&
    !!(e.measured.width || e.width || e.initialWidth)
  );
}
function lE(e) {
  var g;
  const { sourceNode: r, targetNode: o } = e;
  if (!Cp(r) || !Cp(o)) return null;
  const i = r.internals.handleBounds || Np(r.handles),
    l = o.internals.handleBounds || Np(o.handles),
    u = _p((i == null ? void 0 : i.source) ?? [], e.sourceHandle),
    c = _p(
      e.connectionMode === uo.Strict
        ? ((l == null ? void 0 : l.target) ?? [])
        : ((l == null ? void 0 : l.target) ?? []).concat(
            (l == null ? void 0 : l.source) ?? []
          ),
      e.targetHandle
    );
  if (!u || !c)
    return (
      (g = e.onError) == null ||
        g.call(
          e,
          "008",
          nn.error008(u ? "target" : "source", {
            id: e.id,
            sourceHandle: e.sourceHandle,
            targetHandle: e.targetHandle,
          })
        ),
      null
    );
  const f = (u == null ? void 0 : u.position) || Ne.Bottom,
    h = (c == null ? void 0 : c.position) || Ne.Top,
    p = Cr(r, u, f),
    x = Cr(o, c, h);
  return {
    sourceX: p.x,
    sourceY: p.y,
    targetX: x.x,
    targetY: x.y,
    sourcePosition: f,
    targetPosition: h,
  };
}
function Np(e) {
  if (!e) return null;
  const r = [],
    o = [];
  for (const i of e)
    ((i.width = i.width ?? 1),
      (i.height = i.height ?? 1),
      i.type === "source" ? r.push(i) : i.type === "target" && o.push(i));
  return { source: r, target: o };
}
function Cr(e, r, o = Ne.Left, i = !1) {
  const l = ((r == null ? void 0 : r.x) ?? 0) + e.internals.positionAbsolute.x,
    u = ((r == null ? void 0 : r.y) ?? 0) + e.internals.positionAbsolute.y,
    { width: c, height: f } = r ?? kn(e);
  if (i) return { x: l + c / 2, y: u + f / 2 };
  switch ((r == null ? void 0 : r.position) ?? o) {
    case Ne.Top:
      return { x: l + c / 2, y: u };
    case Ne.Right:
      return { x: l + c, y: u + f / 2 };
    case Ne.Bottom:
      return { x: l + c / 2, y: u + f };
    case Ne.Left:
      return { x: l, y: u + f / 2 };
  }
}
function _p(e, r) {
  return (e && (r ? e.find((o) => o.id === r) : e[0])) || null;
}
function Pc(e, r) {
  return e
    ? typeof e == "string"
      ? e
      : `${r ? `${r}__` : ""}${Object.keys(e)
          .sort()
          .map((i) => `${i}=${e[i]}`)
          .join("&")}`
    : "";
}
function aE(
  e,
  { id: r, defaultColor: o, defaultMarkerStart: i, defaultMarkerEnd: l }
) {
  const u = new Set();
  return e
    .reduce(
      (c, f) => (
        [f.markerStart || i, f.markerEnd || l].forEach((h) => {
          if (h && typeof h == "object") {
            const p = Pc(h, r);
            u.has(p) ||
              (c.push({ id: p, color: h.color || o, ...h }), u.add(p));
          }
        }),
        c
      ),
      []
    )
    .sort((c, f) => c.id.localeCompare(f.id));
}
const M0 = 1e3,
  uE = 10,
  rd = {
    nodeOrigin: [0, 0],
    nodeExtent: bs,
    elevateNodesOnSelect: !0,
    zIndexMode: "basic",
    defaults: {},
  },
  cE = { ...rd, checkEquality: !0 };
function od(e, r) {
  const o = { ...e };
  for (const i in r) r[i] !== void 0 && (o[i] = r[i]);
  return o;
}
function dE(e, r, o) {
  const i = od(rd, o);
  for (const l of e.values())
    if (l.parentId) id(l, e, r, i);
    else {
      const u = As(l, i.nodeOrigin),
        c = ho(l.extent) ? l.extent : i.nodeExtent,
        f = kr(u, c, kn(l));
      l.internals.positionAbsolute = f;
    }
}
function fE(e, r) {
  if (!e.handles)
    return e.measured
      ? r == null
        ? void 0
        : r.internals.handleBounds
      : void 0;
  const o = [],
    i = [];
  for (const l of e.handles) {
    const u = {
      id: l.id,
      width: l.width ?? 1,
      height: l.height ?? 1,
      nodeId: e.id,
      x: l.x,
      y: l.y,
      position: l.position,
      type: l.type,
    };
    l.type === "source" ? o.push(u) : l.type === "target" && i.push(u);
  }
  return { source: o, target: i };
}
function sd(e) {
  return e === "manual";
}
function Rc(e, r, o, i = {}) {
  var p, x;
  const l = od(cE, i),
    u = { i: 0 },
    c = new Map(r),
    f = l != null && l.elevateNodesOnSelect && !sd(l.zIndexMode) ? M0 : 0;
  let h = e.length > 0;
  (r.clear(), o.clear());
  for (const g of e) {
    let v = c.get(g.id);
    if (l.checkEquality && g === (v == null ? void 0 : v.internals.userNode))
      r.set(g.id, v);
    else {
      const S = As(g, l.nodeOrigin),
        w = ho(g.extent) ? g.extent : l.nodeExtent,
        b = kr(S, w, kn(g));
      ((v = {
        ...l.defaults,
        ...g,
        measured: {
          width: (p = g.measured) == null ? void 0 : p.width,
          height: (x = g.measured) == null ? void 0 : x.height,
        },
        internals: {
          positionAbsolute: b,
          handleBounds: fE(g, v),
          z: P0(g, f, l.zIndexMode),
          userNode: g,
        },
      }),
        r.set(g.id, v));
    }
    ((v.measured === void 0 ||
      v.measured.width === void 0 ||
      v.measured.height === void 0) &&
      !v.hidden &&
      (h = !1),
      g.parentId && id(v, r, o, i, u));
  }
  return h;
}
function hE(e, r) {
  if (!e.parentId) return;
  const o = r.get(e.parentId);
  o ? o.set(e.id, e) : r.set(e.parentId, new Map([[e.id, e]]));
}
function id(e, r, o, i, l) {
  const {
      elevateNodesOnSelect: u,
      nodeOrigin: c,
      nodeExtent: f,
      zIndexMode: h,
    } = od(rd, i),
    p = e.parentId,
    x = r.get(p);
  if (!x) {
    console.warn(
      `Parent node ${p} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`
    );
    return;
  }
  (hE(e, o),
    l &&
      !x.parentId &&
      x.internals.rootParentIndex === void 0 &&
      h === "auto" &&
      ((x.internals.rootParentIndex = ++l.i),
      (x.internals.z = x.internals.z + l.i * uE)),
    l &&
      x.internals.rootParentIndex !== void 0 &&
      (l.i = x.internals.rootParentIndex));
  const g = u && !sd(h) ? M0 : 0,
    { x: v, y: S, z: w } = pE(e, x, c, f, g, h),
    { positionAbsolute: b } = e.internals,
    N = v !== b.x || S !== b.y;
  (N || w !== e.internals.z) &&
    r.set(e.id, {
      ...e,
      internals: {
        ...e.internals,
        positionAbsolute: N ? { x: v, y: S } : b,
        z: w,
      },
    });
}
function P0(e, r, o) {
  const i = Ut(e.zIndex) ? e.zIndex : 0;
  return sd(o) ? i : i + (e.selected ? r : 0);
}
function pE(e, r, o, i, l, u) {
  const { x: c, y: f } = r.internals.positionAbsolute,
    h = kn(e),
    p = As(e, o),
    x = ho(e.extent) ? kr(p, e.extent, h) : p;
  let g = kr({ x: c + x.x, y: f + x.y }, i, h);
  e.extent === "parent" && (g = y0(g, h, r));
  const v = P0(e, l, u),
    S = r.internals.z ?? 0;
  return { x: g.x, y: g.y, z: S >= v ? S + 1 : v };
}
function ld(e, r, o, i = [0, 0]) {
  var c;
  const l = [],
    u = new Map();
  for (const f of e) {
    const h = r.get(f.parentId);
    if (!h) continue;
    const p =
        ((c = u.get(f.parentId)) == null ? void 0 : c.expandedRect) ?? fo(h),
      x = x0(p, f.rect);
    u.set(f.parentId, { expandedRect: x, parent: h });
  }
  return (
    u.size > 0 &&
      u.forEach(({ expandedRect: f, parent: h }, p) => {
        var E;
        const x = h.internals.positionAbsolute,
          g = kn(h),
          v = h.origin ?? i,
          S = f.x < x.x ? Math.round(Math.abs(x.x - f.x)) : 0,
          w = f.y < x.y ? Math.round(Math.abs(x.y - f.y)) : 0,
          b = Math.max(g.width, Math.round(f.width)),
          N = Math.max(g.height, Math.round(f.height)),
          _ = (b - g.width) * v[0],
          R = (N - g.height) * v[1];
        ((S > 0 || w > 0 || _ || R) &&
          (l.push({
            id: p,
            type: "position",
            position: { x: h.position.x - S + _, y: h.position.y - w + R },
          }),
          (E = o.get(p)) == null ||
            E.forEach((j) => {
              e.some((O) => O.id === j.id) ||
                l.push({
                  id: j.id,
                  type: "position",
                  position: { x: j.position.x + S, y: j.position.y + w },
                });
            })),
          (g.width < f.width || g.height < f.height || S || w) &&
            l.push({
              id: p,
              type: "dimensions",
              setAttributes: !0,
              dimensions: {
                width: b + (S ? v[0] * S - _ : 0),
                height: N + (w ? v[1] * w - R : 0),
              },
            }));
      }),
    l
  );
}
function mE(e, r, o, i, l, u, c) {
  const f = i == null ? void 0 : i.querySelector(".xyflow__viewport");
  let h = !1;
  if (!f) return { changes: [], updatedInternals: h };
  const p = [],
    x = window.getComputedStyle(f),
    { m22: g } = new window.DOMMatrixReadOnly(x.transform),
    v = [];
  for (const S of e.values()) {
    const w = r.get(S.id);
    if (!w) continue;
    if (w.hidden) {
      (r.set(w.id, {
        ...w,
        internals: { ...w.internals, handleBounds: void 0 },
      }),
        (h = !0));
      continue;
    }
    const b = nd(S.nodeElement),
      N = w.measured.width !== b.width || w.measured.height !== b.height;
    if (
      !!(b.width && b.height && (N || !w.internals.handleBounds || S.force))
    ) {
      const R = S.nodeElement.getBoundingClientRect(),
        E = ho(w.extent) ? w.extent : u;
      let { positionAbsolute: j } = w.internals;
      w.parentId && w.extent === "parent"
        ? (j = y0(j, b, r.get(w.parentId)))
        : E && (j = kr(j, E, b));
      const O = {
        ...w,
        measured: b,
        internals: {
          ...w.internals,
          positionAbsolute: j,
          handleBounds: {
            source: wp("source", S.nodeElement, R, g, w.id),
            target: wp("target", S.nodeElement, R, g, w.id),
          },
        },
      };
      (r.set(w.id, O),
        w.parentId && id(O, r, o, { nodeOrigin: l, zIndexMode: c }),
        (h = !0),
        N &&
          (p.push({ id: w.id, type: "dimensions", dimensions: b }),
          w.expandParent &&
            w.parentId &&
            v.push({ id: w.id, parentId: w.parentId, rect: fo(O, l) })));
    }
  }
  if (v.length > 0) {
    const S = ld(v, r, o, l);
    p.push(...S);
  }
  return { changes: p, updatedInternals: h };
}
async function gE({
  delta: e,
  panZoom: r,
  transform: o,
  translateExtent: i,
  width: l,
  height: u,
}) {
  if (!r || (!e.x && !e.y)) return Promise.resolve(!1);
  const c = await r.setViewportConstrained(
      { x: o[0] + e.x, y: o[1] + e.y, zoom: o[2] },
      [
        [0, 0],
        [l, u],
      ],
      i
    ),
    f = !!c && (c.x !== o[0] || c.y !== o[1] || c.k !== o[2]);
  return Promise.resolve(f);
}
function bp(e, r, o, i, l, u) {
  let c = l;
  const f = i.get(c) || new Map();
  (i.set(c, f.set(o, r)), (c = `${l}-${e}`));
  const h = i.get(c) || new Map();
  if ((i.set(c, h.set(o, r)), u)) {
    c = `${l}-${e}-${u}`;
    const p = i.get(c) || new Map();
    i.set(c, p.set(o, r));
  }
}
function R0(e, r, o) {
  (e.clear(), r.clear());
  for (const i of o) {
    const {
        source: l,
        target: u,
        sourceHandle: c = null,
        targetHandle: f = null,
      } = i,
      h = {
        edgeId: i.id,
        source: l,
        target: u,
        sourceHandle: c,
        targetHandle: f,
      },
      p = `${l}-${c}--${u}-${f}`,
      x = `${u}-${f}--${l}-${c}`;
    (bp("source", h, x, e, l, c), bp("target", h, p, e, u, f), r.set(i.id, i));
  }
}
function T0(e, r) {
  if (!e.parentId) return !1;
  const o = r.get(e.parentId);
  return o ? (o.selected ? !0 : T0(o, r)) : !1;
}
function jp(e, r, o) {
  var l;
  let i = e;
  do {
    if ((l = i == null ? void 0 : i.matches) != null && l.call(i, r)) return !0;
    if (i === o) return !1;
    i = i == null ? void 0 : i.parentElement;
  } while (i);
  return !1;
}
function yE(e, r, o, i) {
  const l = new Map();
  for (const [u, c] of e)
    if (
      (c.selected || c.id === i) &&
      (!c.parentId || !T0(c, e)) &&
      (c.draggable || (r && typeof c.draggable > "u"))
    ) {
      const f = e.get(u);
      f &&
        l.set(u, {
          id: u,
          position: f.position || { x: 0, y: 0 },
          distance: {
            x: o.x - f.internals.positionAbsolute.x,
            y: o.y - f.internals.positionAbsolute.y,
          },
          extent: f.extent,
          parentId: f.parentId,
          origin: f.origin,
          expandParent: f.expandParent,
          internals: {
            positionAbsolute: f.internals.positionAbsolute || { x: 0, y: 0 },
          },
          measured: {
            width: f.measured.width ?? 0,
            height: f.measured.height ?? 0,
          },
        });
    }
  return l;
}
function rc({ nodeId: e, dragItems: r, nodeLookup: o, dragging: i = !0 }) {
  var c, f, h;
  const l = [];
  for (const [p, x] of r) {
    const g = (c = o.get(p)) == null ? void 0 : c.internals.userNode;
    g && l.push({ ...g, position: x.position, dragging: i });
  }
  if (!e) return [l[0], l];
  const u = (f = o.get(e)) == null ? void 0 : f.internals.userNode;
  return [
    u
      ? {
          ...u,
          position:
            ((h = r.get(e)) == null ? void 0 : h.position) || u.position,
          dragging: i,
        }
      : l[0],
    l,
  ];
}
function vE({ dragItems: e, snapGrid: r, x: o, y: i }) {
  const l = e.values().next().value;
  if (!l) return null;
  const u = { x: o - l.distance.x, y: i - l.distance.y },
    c = Os(u, r);
  return { x: c.x - u.x, y: c.y - u.y };
}
function xE({
  onNodeMouseDown: e,
  getStoreItems: r,
  onDragStart: o,
  onDrag: i,
  onDragStop: l,
}) {
  let u = { x: null, y: null },
    c = 0,
    f = new Map(),
    h = !1,
    p = { x: 0, y: 0 },
    x = null,
    g = !1,
    v = null,
    S = !1,
    w = !1,
    b = null;
  function N({
    noDragClassName: R,
    handleSelector: E,
    domNode: j,
    isSelectable: O,
    nodeId: A,
    nodeClickDistance: P = 0,
  }) {
    v = Nt(j);
    function H({ x: U, y: te }) {
      const {
        nodeLookup: L,
        nodeExtent: K,
        snapGrid: B,
        snapToGrid: X,
        nodeOrigin: z,
        onNodeDrag: $,
        onSelectionDrag: W,
        onError: M,
        updateNodePositions: I,
      } = r();
      u = { x: U, y: te };
      let oe = !1;
      const le = f.size > 1,
        Z = le && K ? Ic(Ds(f)) : null,
        Q = le && X ? vE({ dragItems: f, snapGrid: B, x: U, y: te }) : null;
      for (const [ne, J] of f) {
        if (!L.has(ne)) continue;
        let ie = { x: U - J.distance.x, y: te - J.distance.y };
        X &&
          (ie = Q
            ? { x: Math.round(ie.x + Q.x), y: Math.round(ie.y + Q.y) }
            : Os(ie, B));
        let ue = null;
        if (le && K && !J.extent && Z) {
          const { positionAbsolute: de } = J.internals,
            ge = de.x - Z.x + K[0][0],
            Ce = de.x + J.measured.width - Z.x2 + K[1][0],
            ke = de.y - Z.y + K[0][1],
            Se = de.y + J.measured.height - Z.y2 + K[1][1];
          ue = [
            [ge, ke],
            [Ce, Se],
          ];
        }
        const { position: se, positionAbsolute: ae } = g0({
          nodeId: ne,
          nextPosition: ie,
          nodeLookup: L,
          nodeExtent: ue || K,
          nodeOrigin: z,
          onError: M,
        });
        ((oe = oe || J.position.x !== se.x || J.position.y !== se.y),
          (J.position = se),
          (J.internals.positionAbsolute = ae));
      }
      if (((w = w || oe), !!oe && (I(f, !0), b && (i || $ || (!A && W))))) {
        const [ne, J] = rc({ nodeId: A, dragItems: f, nodeLookup: L });
        (i == null || i(b, f, ne, J),
          $ == null || $(b, ne, J),
          A || W == null || W(b, J));
      }
    }
    async function V() {
      if (!x) return;
      const {
        transform: U,
        panBy: te,
        autoPanSpeed: L,
        autoPanOnNodeDrag: K,
      } = r();
      if (!K) {
        ((h = !1), cancelAnimationFrame(c));
        return;
      }
      const [B, X] = v0(p, x, L);
      ((B !== 0 || X !== 0) &&
        ((u.x = (u.x ?? 0) - B / U[2]),
        (u.y = (u.y ?? 0) - X / U[2]),
        (await te({ x: B, y: X })) && H(u)),
        (c = requestAnimationFrame(V)));
    }
    function re(U) {
      var le;
      const {
        nodeLookup: te,
        multiSelectionActive: L,
        nodesDraggable: K,
        transform: B,
        snapGrid: X,
        snapToGrid: z,
        selectNodesOnDrag: $,
        onNodeDragStart: W,
        onSelectionDragStart: M,
        unselectNodesAndEdges: I,
      } = r();
      ((g = !0),
        (!$ || !O) &&
          !L &&
          A &&
          (((le = te.get(A)) != null && le.selected) || I()),
        O && $ && A && (e == null || e(A)));
      const oe = vs(U.sourceEvent, {
        transform: B,
        snapGrid: X,
        snapToGrid: z,
        containerBounds: x,
      });
      if (
        ((u = oe), (f = yE(te, K, oe, A)), f.size > 0 && (o || W || (!A && M)))
      ) {
        const [Z, Q] = rc({ nodeId: A, dragItems: f, nodeLookup: te });
        (o == null || o(U.sourceEvent, f, Z, Q),
          W == null || W(U.sourceEvent, Z, Q),
          A || M == null || M(U.sourceEvent, Q));
      }
    }
    const Y = Qm()
      .clickDistance(P)
      .on("start", (U) => {
        const {
          domNode: te,
          nodeDragThreshold: L,
          transform: K,
          snapGrid: B,
          snapToGrid: X,
        } = r();
        ((x = (te == null ? void 0 : te.getBoundingClientRect()) || null),
          (S = !1),
          (w = !1),
          (b = U.sourceEvent),
          L === 0 && re(U),
          (u = vs(U.sourceEvent, {
            transform: K,
            snapGrid: B,
            snapToGrid: X,
            containerBounds: x,
          })),
          (p = Yt(U.sourceEvent, x)));
      })
      .on("drag", (U) => {
        const {
            autoPanOnNodeDrag: te,
            transform: L,
            snapGrid: K,
            snapToGrid: B,
            nodeDragThreshold: X,
            nodeLookup: z,
          } = r(),
          $ = vs(U.sourceEvent, {
            transform: L,
            snapGrid: K,
            snapToGrid: B,
            containerBounds: x,
          });
        if (
          ((b = U.sourceEvent),
          ((U.sourceEvent.type === "touchmove" &&
            U.sourceEvent.touches.length > 1) ||
            (A && !z.has(A))) &&
            (S = !0),
          !S)
        ) {
          if ((!h && te && g && ((h = !0), V()), !g)) {
            const W = Yt(U.sourceEvent, x),
              M = W.x - p.x,
              I = W.y - p.y;
            Math.sqrt(M * M + I * I) > X && re(U);
          }
          (u.x !== $.xSnapped || u.y !== $.ySnapped) &&
            f &&
            g &&
            ((p = Yt(U.sourceEvent, x)), H($));
        }
      })
      .on("end", (U) => {
        if (
          !(!g || S) &&
          ((h = !1), (g = !1), cancelAnimationFrame(c), f.size > 0)
        ) {
          const {
            nodeLookup: te,
            updateNodePositions: L,
            onNodeDragStop: K,
            onSelectionDragStop: B,
          } = r();
          if ((w && (L(f, !1), (w = !1)), l || K || (!A && B))) {
            const [X, z] = rc({
              nodeId: A,
              dragItems: f,
              nodeLookup: te,
              dragging: !1,
            });
            (l == null || l(U.sourceEvent, f, X, z),
              K == null || K(U.sourceEvent, X, z),
              A || B == null || B(U.sourceEvent, z));
          }
        }
      })
      .filter((U) => {
        const te = U.target;
        return !U.button && (!R || !jp(te, `.${R}`, j)) && (!E || jp(te, E, j));
      });
    v.call(Y);
  }
  function _() {
    v == null || v.on(".drag", null);
  }
  return { update: N, destroy: _ };
}
function wE(e, r, o) {
  const i = [],
    l = { x: e.x - o, y: e.y - o, width: o * 2, height: o * 2 };
  for (const u of r.values()) Is(l, fo(u)) > 0 && i.push(u);
  return i;
}
const SE = 250;
function EE(e, r, o, i) {
  var f, h;
  let l = [],
    u = 1 / 0;
  const c = wE(e, o, r + SE);
  for (const p of c) {
    const x = [
      ...(((f = p.internals.handleBounds) == null ? void 0 : f.source) ?? []),
      ...(((h = p.internals.handleBounds) == null ? void 0 : h.target) ?? []),
    ];
    for (const g of x) {
      if (i.nodeId === g.nodeId && i.type === g.type && i.id === g.id) continue;
      const { x: v, y: S } = Cr(p, g, g.position, !0),
        w = Math.sqrt(Math.pow(v - e.x, 2) + Math.pow(S - e.y, 2));
      w > r ||
        (w < u
          ? ((l = [{ ...g, x: v, y: S }]), (u = w))
          : w === u && l.push({ ...g, x: v, y: S }));
    }
  }
  if (!l.length) return null;
  if (l.length > 1) {
    const p = i.type === "source" ? "target" : "source";
    return l.find((x) => x.type === p) ?? l[0];
  }
  return l[0];
}
function L0(e, r, o, i, l, u = !1) {
  var p, x, g;
  const c = i.get(e);
  if (!c) return null;
  const f =
      l === "strict"
        ? (p = c.internals.handleBounds) == null
          ? void 0
          : p[r]
        : [
            ...(((x = c.internals.handleBounds) == null ? void 0 : x.source) ??
              []),
            ...(((g = c.internals.handleBounds) == null ? void 0 : g.target) ??
              []),
          ],
    h =
      (o
        ? f == null
          ? void 0
          : f.find((v) => v.id === o)
        : f == null
          ? void 0
          : f[0]) ?? null;
  return h && u ? { ...h, ...Cr(c, h, h.position, !0) } : h;
}
function z0(e, r) {
  return (
    e ||
    (r != null && r.classList.contains("target")
      ? "target"
      : r != null && r.classList.contains("source")
        ? "source"
        : null)
  );
}
function kE(e, r) {
  let o = null;
  return (r ? (o = !0) : e && !r && (o = !1), o);
}
const $0 = () => !0;
function CE(
  e,
  {
    connectionMode: r,
    connectionRadius: o,
    handleId: i,
    nodeId: l,
    edgeUpdaterType: u,
    isTarget: c,
    domNode: f,
    nodeLookup: h,
    lib: p,
    autoPanOnConnect: x,
    flowId: g,
    panBy: v,
    cancelConnection: S,
    onConnectStart: w,
    onConnect: b,
    onConnectEnd: N,
    isValidConnection: _ = $0,
    onReconnectEnd: R,
    updateConnection: E,
    getTransform: j,
    getFromHandle: O,
    autoPanSpeed: A,
    dragThreshold: P = 1,
    handleDomNode: H,
  }
) {
  const V = E0(e.target);
  let re = 0,
    Y;
  const { x: U, y: te } = Yt(e),
    L = z0(u, H),
    K = f == null ? void 0 : f.getBoundingClientRect();
  let B = !1;
  if (!K || !L) return;
  const X = L0(l, L, i, h, r);
  if (!X) return;
  let z = Yt(e, K),
    $ = !1,
    W = null,
    M = !1,
    I = null;
  function oe() {
    if (!x || !K) return;
    const [se, ae] = v0(z, K, A);
    (v({ x: se, y: ae }), (re = requestAnimationFrame(oe)));
  }
  const le = { ...X, nodeId: l, type: L, position: X.position },
    Z = h.get(l);
  let ne = {
    inProgress: !0,
    isValid: null,
    from: Cr(Z, le, Ne.Left, !0),
    fromHandle: le,
    fromPosition: le.position,
    fromNode: Z,
    to: z,
    toHandle: null,
    toPosition: gp[le.position],
    toNode: null,
    pointer: z,
  };
  function J() {
    ((B = !0),
      E(ne),
      w == null || w(e, { nodeId: l, handleId: i, handleType: L }));
  }
  P === 0 && J();
  function ie(se) {
    if (!B) {
      const { x: Se, y: Ie } = Yt(se),
        me = Se - U,
        _e = Ie - te;
      if (!(me * me + _e * _e > P * P)) return;
      J();
    }
    if (!O() || !le) {
      ue(se);
      return;
    }
    const ae = j();
    ((z = Yt(se, K)),
      (Y = EE(Fs(z, ae, !1, [1, 1]), o, h, le)),
      $ || (oe(), ($ = !0)));
    const de = A0(se, {
      handle: Y,
      connectionMode: r,
      fromNodeId: l,
      fromHandleId: i,
      fromType: c ? "target" : "source",
      isValidConnection: _,
      doc: V,
      lib: p,
      flowId: g,
      nodeLookup: h,
    });
    ((I = de.handleDomNode), (W = de.connection), (M = kE(!!Y, de.isValid)));
    const ge = h.get(l),
      Ce = ge ? Cr(ge, le, Ne.Left, !0) : ne.from,
      ke = {
        ...ne,
        from: Ce,
        isValid: M,
        to:
          de.toHandle && M ? $l({ x: de.toHandle.x, y: de.toHandle.y }, ae) : z,
        toHandle: de.toHandle,
        toPosition: M && de.toHandle ? de.toHandle.position : gp[le.position],
        toNode: de.toHandle ? h.get(de.toHandle.nodeId) : null,
        pointer: z,
      };
    (E(ke), (ne = ke));
  }
  function ue(se) {
    if (!("touches" in se && se.touches.length > 0)) {
      if (B) {
        (Y || I) && W && M && (b == null || b(W));
        const { inProgress: ae, ...de } = ne,
          ge = { ...de, toPosition: ne.toHandle ? ne.toPosition : null };
        (N == null || N(se, ge), u && (R == null || R(se, ge)));
      }
      (S(),
        cancelAnimationFrame(re),
        ($ = !1),
        (M = !1),
        (W = null),
        (I = null),
        V.removeEventListener("mousemove", ie),
        V.removeEventListener("mouseup", ue),
        V.removeEventListener("touchmove", ie),
        V.removeEventListener("touchend", ue));
    }
  }
  (V.addEventListener("mousemove", ie),
    V.addEventListener("mouseup", ue),
    V.addEventListener("touchmove", ie),
    V.addEventListener("touchend", ue));
}
function A0(
  e,
  {
    handle: r,
    connectionMode: o,
    fromNodeId: i,
    fromHandleId: l,
    fromType: u,
    doc: c,
    lib: f,
    flowId: h,
    isValidConnection: p = $0,
    nodeLookup: x,
  }
) {
  const g = u === "target",
    v = r
      ? c.querySelector(
          `.${f}-flow__handle[data-id="${h}-${r == null ? void 0 : r.nodeId}-${r == null ? void 0 : r.id}-${r == null ? void 0 : r.type}"]`
        )
      : null,
    { x: S, y: w } = Yt(e),
    b = c.elementFromPoint(S, w),
    N = b != null && b.classList.contains(`${f}-flow__handle`) ? b : v,
    _ = { handleDomNode: N, isValid: !1, connection: null, toHandle: null };
  if (N) {
    const R = z0(void 0, N),
      E = N.getAttribute("data-nodeid"),
      j = N.getAttribute("data-handleid"),
      O = N.classList.contains("connectable"),
      A = N.classList.contains("connectableend");
    if (!E || !R) return _;
    const P = {
      source: g ? E : i,
      sourceHandle: g ? j : l,
      target: g ? i : E,
      targetHandle: g ? l : j,
    };
    _.connection = P;
    const V =
      O &&
      A &&
      (o === uo.Strict
        ? (g && R === "source") || (!g && R === "target")
        : E !== i || j !== l);
    ((_.isValid = V && p(P)), (_.toHandle = L0(E, R, j, x, o, !0)));
  }
  return _;
}
const Tc = { onPointerDown: CE, isValid: A0 };
function NE({ domNode: e, panZoom: r, getTransform: o, getViewScale: i }) {
  const l = Nt(e);
  function u({
    translateExtent: f,
    width: h,
    height: p,
    zoomStep: x = 1,
    pannable: g = !0,
    zoomable: v = !0,
    inversePan: S = !1,
  }) {
    const w = (E) => {
      if (E.sourceEvent.type !== "wheel" || !r) return;
      const j = o(),
        O = E.sourceEvent.ctrlKey && Ms() ? 10 : 1,
        A =
          -E.sourceEvent.deltaY *
          (E.sourceEvent.deltaMode === 1
            ? 0.05
            : E.sourceEvent.deltaMode
              ? 1
              : 0.002) *
          x,
        P = j[2] * Math.pow(2, A * O);
      r.scaleTo(P);
    };
    let b = [0, 0];
    const N = (E) => {
        (E.sourceEvent.type === "mousedown" ||
          E.sourceEvent.type === "touchstart") &&
          (b = [
            E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
            E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY,
          ]);
      },
      _ = (E) => {
        const j = o();
        if (
          (E.sourceEvent.type !== "mousemove" &&
            E.sourceEvent.type !== "touchmove") ||
          !r
        )
          return;
        const O = [
            E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
            E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY,
          ],
          A = [O[0] - b[0], O[1] - b[1]];
        b = O;
        const P = i() * Math.max(j[2], Math.log(j[2])) * (S ? -1 : 1),
          H = { x: j[0] - A[0] * P, y: j[1] - A[1] * P },
          V = [
            [0, 0],
            [h, p],
          ];
        r.setViewportConstrained({ x: H.x, y: H.y, zoom: j[2] }, V, f);
      },
      R = c0()
        .on("start", N)
        .on("zoom", g ? _ : null)
        .on("zoom.wheel", v ? w : null);
    l.call(R, {});
  }
  function c() {
    l.on("zoom", null);
  }
  return { update: u, destroy: c, pointer: Vt };
}
const Kl = (e) => ({ x: e.x, y: e.y, zoom: e.k }),
  oc = ({ x: e, y: r, zoom: o }) => Ul.translate(e, r).scale(o),
  ro = (e, r) => e.target.closest(`.${r}`),
  D0 = (e, r) => r === 2 && Array.isArray(e) && e.includes(2),
  _E = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2,
  sc = (e, r = 0, o = _E, i = () => {}) => {
    const l = typeof r == "number" && r > 0;
    return (l || i(), l ? e.transition().duration(r).ease(o).on("end", i) : e);
  },
  O0 = (e) => {
    const r = e.ctrlKey && Ms() ? 10 : 1;
    return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) * r;
  };
function bE({
  zoomPanValues: e,
  noWheelClassName: r,
  d3Selection: o,
  d3Zoom: i,
  panOnScrollMode: l,
  panOnScrollSpeed: u,
  zoomOnPinch: c,
  onPanZoomStart: f,
  onPanZoom: h,
  onPanZoomEnd: p,
}) {
  return (x) => {
    if (ro(x, r)) return (x.ctrlKey && x.preventDefault(), !1);
    (x.preventDefault(), x.stopImmediatePropagation());
    const g = o.property("__zoom").k || 1;
    if (x.ctrlKey && c) {
      const N = Vt(x),
        _ = O0(x),
        R = g * Math.pow(2, _);
      i.scaleTo(o, R, N, x);
      return;
    }
    const v = x.deltaMode === 1 ? 20 : 1;
    let S = l === wr.Vertical ? 0 : x.deltaX * v,
      w = l === wr.Horizontal ? 0 : x.deltaY * v;
    (!Ms() && x.shiftKey && l !== wr.Vertical && ((S = x.deltaY * v), (w = 0)),
      i.translateBy(o, -(S / g) * u, -(w / g) * u, { internal: !0 }));
    const b = Kl(o.property("__zoom"));
    (clearTimeout(e.panScrollTimeout),
      e.isPanScrolling
        ? (h == null || h(x, b),
          (e.panScrollTimeout = setTimeout(() => {
            (p == null || p(x, b), (e.isPanScrolling = !1));
          }, 150)))
        : ((e.isPanScrolling = !0), f == null || f(x, b)));
  };
}
function jE({ noWheelClassName: e, preventScrolling: r, d3ZoomHandler: o }) {
  return function (i, l) {
    const u = i.type === "wheel",
      c = !r && u && !i.ctrlKey,
      f = ro(i, e);
    if ((i.ctrlKey && u && f && i.preventDefault(), c || f)) return null;
    (i.preventDefault(), o.call(this, i, l));
  };
}
function IE({ zoomPanValues: e, onDraggingChange: r, onPanZoomStart: o }) {
  return (i) => {
    var u, c, f;
    if ((u = i.sourceEvent) != null && u.internal) return;
    const l = Kl(i.transform);
    ((e.mouseButton = ((c = i.sourceEvent) == null ? void 0 : c.button) || 0),
      (e.isZoomingOrPanning = !0),
      (e.prevViewport = l),
      ((f = i.sourceEvent) == null ? void 0 : f.type) === "mousedown" && r(!0),
      o && (o == null || o(i.sourceEvent, l)));
  };
}
function ME({
  zoomPanValues: e,
  panOnDrag: r,
  onPaneContextMenu: o,
  onTransformChange: i,
  onPanZoom: l,
}) {
  return (u) => {
    var c, f;
    ((e.usedRightMouseButton = !!(o && D0(r, e.mouseButton ?? 0))),
      ((c = u.sourceEvent) != null && c.sync) ||
        i([u.transform.x, u.transform.y, u.transform.k]),
      l &&
        !((f = u.sourceEvent) != null && f.internal) &&
        (l == null || l(u.sourceEvent, Kl(u.transform))));
  };
}
function PE({
  zoomPanValues: e,
  panOnDrag: r,
  panOnScroll: o,
  onDraggingChange: i,
  onPanZoomEnd: l,
  onPaneContextMenu: u,
}) {
  return (c) => {
    var f;
    if (
      !((f = c.sourceEvent) != null && f.internal) &&
      ((e.isZoomingOrPanning = !1),
      u &&
        D0(r, e.mouseButton ?? 0) &&
        !e.usedRightMouseButton &&
        c.sourceEvent &&
        u(c.sourceEvent),
      (e.usedRightMouseButton = !1),
      i(!1),
      l)
    ) {
      const h = Kl(c.transform);
      ((e.prevViewport = h),
        clearTimeout(e.timerId),
        (e.timerId = setTimeout(
          () => {
            l == null || l(c.sourceEvent, h);
          },
          o ? 150 : 0
        )));
    }
  };
}
function RE({
  zoomActivationKeyPressed: e,
  zoomOnScroll: r,
  zoomOnPinch: o,
  panOnDrag: i,
  panOnScroll: l,
  zoomOnDoubleClick: u,
  userSelectionActive: c,
  noWheelClassName: f,
  noPanClassName: h,
  lib: p,
  connectionInProgress: x,
}) {
  return (g) => {
    var N;
    const v = e || r,
      S = o && g.ctrlKey,
      w = g.type === "wheel";
    if (
      g.button === 1 &&
      g.type === "mousedown" &&
      (ro(g, `${p}-flow__node`) || ro(g, `${p}-flow__edge`))
    )
      return !0;
    if (
      (!i && !v && !l && !u && !o) ||
      c ||
      (x && !w) ||
      (ro(g, f) && w) ||
      (ro(g, h) && (!w || (l && w && !e))) ||
      (!o && g.ctrlKey && w)
    )
      return !1;
    if (
      !o &&
      g.type === "touchstart" &&
      ((N = g.touches) == null ? void 0 : N.length) > 1
    )
      return (g.preventDefault(), !1);
    if (
      (!v && !l && !S && w) ||
      (!i && (g.type === "mousedown" || g.type === "touchstart")) ||
      (Array.isArray(i) && !i.includes(g.button) && g.type === "mousedown")
    )
      return !1;
    const b =
      (Array.isArray(i) && i.includes(g.button)) || !g.button || g.button <= 1;
    return (!g.ctrlKey || w) && b;
  };
}
function TE({
  domNode: e,
  minZoom: r,
  maxZoom: o,
  translateExtent: i,
  viewport: l,
  onPanZoom: u,
  onPanZoomStart: c,
  onPanZoomEnd: f,
  onDraggingChange: h,
}) {
  const p = {
      isZoomingOrPanning: !1,
      usedRightMouseButton: !1,
      prevViewport: {},
      mouseButton: 0,
      timerId: void 0,
      panScrollTimeout: void 0,
      isPanScrolling: !1,
    },
    x = e.getBoundingClientRect(),
    g = c0().scaleExtent([r, o]).translateExtent(i),
    v = Nt(e).call(g);
  R(
    { x: l.x, y: l.y, zoom: co(l.zoom, r, o) },
    [
      [0, 0],
      [x.width, x.height],
    ],
    i
  );
  const S = v.on("wheel.zoom"),
    w = v.on("dblclick.zoom");
  g.wheelDelta(O0);
  function b(Y, U) {
    return v
      ? new Promise((te) => {
          g == null ||
            g
              .interpolate(
                (U == null ? void 0 : U.interpolate) === "linear" ? ys : El
              )
              .transform(
                sc(
                  v,
                  U == null ? void 0 : U.duration,
                  U == null ? void 0 : U.ease,
                  () => te(!0)
                ),
                Y
              );
        })
      : Promise.resolve(!1);
  }
  function N({
    noWheelClassName: Y,
    noPanClassName: U,
    onPaneContextMenu: te,
    userSelectionActive: L,
    panOnScroll: K,
    panOnDrag: B,
    panOnScrollMode: X,
    panOnScrollSpeed: z,
    preventScrolling: $,
    zoomOnPinch: W,
    zoomOnScroll: M,
    zoomOnDoubleClick: I,
    zoomActivationKeyPressed: oe,
    lib: le,
    onTransformChange: Z,
    connectionInProgress: Q,
    paneClickDistance: ne,
    selectionOnDrag: J,
  }) {
    L && !p.isZoomingOrPanning && _();
    const ie = K && !oe && !L;
    g.clickDistance(J ? 1 / 0 : !Ut(ne) || ne < 0 ? 0 : ne);
    const ue = ie
      ? bE({
          zoomPanValues: p,
          noWheelClassName: Y,
          d3Selection: v,
          d3Zoom: g,
          panOnScrollMode: X,
          panOnScrollSpeed: z,
          zoomOnPinch: W,
          onPanZoomStart: c,
          onPanZoom: u,
          onPanZoomEnd: f,
        })
      : jE({ noWheelClassName: Y, preventScrolling: $, d3ZoomHandler: S });
    if ((v.on("wheel.zoom", ue, { passive: !1 }), !L)) {
      const ae = IE({
        zoomPanValues: p,
        onDraggingChange: h,
        onPanZoomStart: c,
      });
      g.on("start", ae);
      const de = ME({
        zoomPanValues: p,
        panOnDrag: B,
        onPaneContextMenu: !!te,
        onPanZoom: u,
        onTransformChange: Z,
      });
      g.on("zoom", de);
      const ge = PE({
        zoomPanValues: p,
        panOnDrag: B,
        panOnScroll: K,
        onPaneContextMenu: te,
        onPanZoomEnd: f,
        onDraggingChange: h,
      });
      g.on("end", ge);
    }
    const se = RE({
      zoomActivationKeyPressed: oe,
      panOnDrag: B,
      zoomOnScroll: M,
      panOnScroll: K,
      zoomOnDoubleClick: I,
      zoomOnPinch: W,
      userSelectionActive: L,
      noPanClassName: U,
      noWheelClassName: Y,
      lib: le,
      connectionInProgress: Q,
    });
    (g.filter(se), I ? v.on("dblclick.zoom", w) : v.on("dblclick.zoom", null));
  }
  function _() {
    g.on("zoom", null);
  }
  async function R(Y, U, te) {
    const L = oc(Y),
      K = g == null ? void 0 : g.constrain()(L, U, te);
    return (K && (await b(K)), new Promise((B) => B(K)));
  }
  async function E(Y, U) {
    const te = oc(Y);
    return (await b(te, U), new Promise((L) => L(te)));
  }
  function j(Y) {
    if (v) {
      const U = oc(Y),
        te = v.property("__zoom");
      (te.k !== Y.zoom || te.x !== Y.x || te.y !== Y.y) &&
        (g == null || g.transform(v, U, null, { sync: !0 }));
    }
  }
  function O() {
    const Y = v ? u0(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: Y.x, y: Y.y, zoom: Y.k };
  }
  function A(Y, U) {
    return v
      ? new Promise((te) => {
          g == null ||
            g
              .interpolate(
                (U == null ? void 0 : U.interpolate) === "linear" ? ys : El
              )
              .scaleTo(
                sc(
                  v,
                  U == null ? void 0 : U.duration,
                  U == null ? void 0 : U.ease,
                  () => te(!0)
                ),
                Y
              );
        })
      : Promise.resolve(!1);
  }
  function P(Y, U) {
    return v
      ? new Promise((te) => {
          g == null ||
            g
              .interpolate(
                (U == null ? void 0 : U.interpolate) === "linear" ? ys : El
              )
              .scaleBy(
                sc(
                  v,
                  U == null ? void 0 : U.duration,
                  U == null ? void 0 : U.ease,
                  () => te(!0)
                ),
                Y
              );
        })
      : Promise.resolve(!1);
  }
  function H(Y) {
    g == null || g.scaleExtent(Y);
  }
  function V(Y) {
    g == null || g.translateExtent(Y);
  }
  function re(Y) {
    const U = !Ut(Y) || Y < 0 ? 0 : Y;
    g == null || g.clickDistance(U);
  }
  return {
    update: N,
    destroy: _,
    setViewport: E,
    setViewportConstrained: R,
    getViewport: O,
    scaleTo: A,
    scaleBy: P,
    setScaleExtent: H,
    setTranslateExtent: V,
    syncViewport: j,
    setClickDistance: re,
  };
}
var po;
(function (e) {
  ((e.Line = "line"), (e.Handle = "handle"));
})(po || (po = {}));
function LE({
  width: e,
  prevWidth: r,
  height: o,
  prevHeight: i,
  affectsX: l,
  affectsY: u,
}) {
  const c = e - r,
    f = o - i,
    h = [c > 0 ? 1 : c < 0 ? -1 : 0, f > 0 ? 1 : f < 0 ? -1 : 0];
  return (c && l && (h[0] = h[0] * -1), f && u && (h[1] = h[1] * -1), h);
}
function Ip(e) {
  const r = e.includes("right") || e.includes("left"),
    o = e.includes("bottom") || e.includes("top"),
    i = e.includes("left"),
    l = e.includes("top");
  return { isHorizontal: r, isVertical: o, affectsX: i, affectsY: l };
}
function Un(e, r) {
  return Math.max(0, r - e);
}
function Yn(e, r) {
  return Math.max(0, e - r);
}
function hl(e, r, o) {
  return Math.max(0, r - e, e - o);
}
function Mp(e, r) {
  return e ? !r : r;
}
function zE(e, r, o, i, l, u, c, f) {
  let { affectsX: h, affectsY: p } = r;
  const { isHorizontal: x, isVertical: g } = r,
    v = x && g,
    { xSnapped: S, ySnapped: w } = o,
    { minWidth: b, maxWidth: N, minHeight: _, maxHeight: R } = i,
    { x: E, y: j, width: O, height: A, aspectRatio: P } = e;
  let H = Math.floor(x ? S - e.pointerX : 0),
    V = Math.floor(g ? w - e.pointerY : 0);
  const re = O + (h ? -H : H),
    Y = A + (p ? -V : V),
    U = -u[0] * O,
    te = -u[1] * A;
  let L = hl(re, b, N),
    K = hl(Y, _, R);
  if (c) {
    let z = 0,
      $ = 0;
    (h && H < 0
      ? (z = Un(E + H + U, c[0][0]))
      : !h && H > 0 && (z = Yn(E + re + U, c[1][0])),
      p && V < 0
        ? ($ = Un(j + V + te, c[0][1]))
        : !p && V > 0 && ($ = Yn(j + Y + te, c[1][1])),
      (L = Math.max(L, z)),
      (K = Math.max(K, $)));
  }
  if (f) {
    let z = 0,
      $ = 0;
    (h && H > 0
      ? (z = Yn(E + H, f[0][0]))
      : !h && H < 0 && (z = Un(E + re, f[1][0])),
      p && V > 0
        ? ($ = Yn(j + V, f[0][1]))
        : !p && V < 0 && ($ = Un(j + Y, f[1][1])),
      (L = Math.max(L, z)),
      (K = Math.max(K, $)));
  }
  if (l) {
    if (x) {
      const z = hl(re / P, _, R) * P;
      if (((L = Math.max(L, z)), c)) {
        let $ = 0;
        ((!h && !p) || (h && !p && v)
          ? ($ = Yn(j + te + re / P, c[1][1]) * P)
          : ($ = Un(j + te + (h ? H : -H) / P, c[0][1]) * P),
          (L = Math.max(L, $)));
      }
      if (f) {
        let $ = 0;
        ((!h && !p) || (h && !p && v)
          ? ($ = Un(j + re / P, f[1][1]) * P)
          : ($ = Yn(j + (h ? H : -H) / P, f[0][1]) * P),
          (L = Math.max(L, $)));
      }
    }
    if (g) {
      const z = hl(Y * P, b, N) / P;
      if (((K = Math.max(K, z)), c)) {
        let $ = 0;
        ((!h && !p) || (p && !h && v)
          ? ($ = Yn(E + Y * P + U, c[1][0]) / P)
          : ($ = Un(E + (p ? V : -V) * P + U, c[0][0]) / P),
          (K = Math.max(K, $)));
      }
      if (f) {
        let $ = 0;
        ((!h && !p) || (p && !h && v)
          ? ($ = Un(E + Y * P, f[1][0]) / P)
          : ($ = Yn(E + (p ? V : -V) * P, f[0][0]) / P),
          (K = Math.max(K, $)));
      }
    }
  }
  ((V = V + (V < 0 ? K : -K)),
    (H = H + (H < 0 ? L : -L)),
    l &&
      (v
        ? re > Y * P
          ? (V = (Mp(h, p) ? -H : H) / P)
          : (H = (Mp(h, p) ? -V : V) * P)
        : x
          ? ((V = H / P), (p = h))
          : ((H = V * P), (h = p))));
  const B = h ? E + H : E,
    X = p ? j + V : j;
  return {
    width: O + (h ? -H : H),
    height: A + (p ? -V : V),
    x: u[0] * H * (h ? -1 : 1) + B,
    y: u[1] * V * (p ? -1 : 1) + X,
  };
}
const F0 = { width: 0, height: 0, x: 0, y: 0 },
  $E = { ...F0, pointerX: 0, pointerY: 0, aspectRatio: 1 };
function AE(e) {
  return [
    [0, 0],
    [e.measured.width, e.measured.height],
  ];
}
function DE(e, r, o) {
  const i = r.position.x + e.position.x,
    l = r.position.y + e.position.y,
    u = e.measured.width ?? 0,
    c = e.measured.height ?? 0,
    f = o[0] * u,
    h = o[1] * c;
  return [
    [i - f, l - h],
    [i + u - f, l + c - h],
  ];
}
function OE({
  domNode: e,
  nodeId: r,
  getStoreItems: o,
  onChange: i,
  onEnd: l,
}) {
  const u = Nt(e);
  let c = {
    controlDirection: Ip("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE,
    },
    resizeDirection: void 0,
    keepAspectRatio: !1,
  };
  function f({
    controlPosition: p,
    boundaries: x,
    keepAspectRatio: g,
    resizeDirection: v,
    onResizeStart: S,
    onResize: w,
    onResizeEnd: b,
    shouldResize: N,
  }) {
    let _ = { ...F0 },
      R = { ...$E };
    c = {
      boundaries: x,
      resizeDirection: v,
      keepAspectRatio: g,
      controlDirection: Ip(p),
    };
    let E,
      j = null,
      O = [],
      A,
      P,
      H,
      V = !1;
    const re = Qm()
      .on("start", (Y) => {
        const {
          nodeLookup: U,
          transform: te,
          snapGrid: L,
          snapToGrid: K,
          nodeOrigin: B,
          paneDomNode: X,
        } = o();
        if (((E = U.get(r)), !E)) return;
        j = (X == null ? void 0 : X.getBoundingClientRect()) ?? null;
        const { xSnapped: z, ySnapped: $ } = vs(Y.sourceEvent, {
          transform: te,
          snapGrid: L,
          snapToGrid: K,
          containerBounds: j,
        });
        ((_ = {
          width: E.measured.width ?? 0,
          height: E.measured.height ?? 0,
          x: E.position.x ?? 0,
          y: E.position.y ?? 0,
        }),
          (R = {
            ..._,
            pointerX: z,
            pointerY: $,
            aspectRatio: _.width / _.height,
          }),
          (A = void 0),
          E.parentId &&
            (E.extent === "parent" || E.expandParent) &&
            ((A = U.get(E.parentId)),
            (P = A && E.extent === "parent" ? AE(A) : void 0)),
          (O = []),
          (H = void 0));
        for (const [W, M] of U)
          if (
            M.parentId === r &&
            (O.push({ id: W, position: { ...M.position }, extent: M.extent }),
            M.extent === "parent" || M.expandParent)
          ) {
            const I = DE(M, E, M.origin ?? B);
            H
              ? (H = [
                  [Math.min(I[0][0], H[0][0]), Math.min(I[0][1], H[0][1])],
                  [Math.max(I[1][0], H[1][0]), Math.max(I[1][1], H[1][1])],
                ])
              : (H = I);
          }
        S == null || S(Y, { ..._ });
      })
      .on("drag", (Y) => {
        const {
            transform: U,
            snapGrid: te,
            snapToGrid: L,
            nodeOrigin: K,
          } = o(),
          B = vs(Y.sourceEvent, {
            transform: U,
            snapGrid: te,
            snapToGrid: L,
            containerBounds: j,
          }),
          X = [];
        if (!E) return;
        const { x: z, y: $, width: W, height: M } = _,
          I = {},
          oe = E.origin ?? K,
          {
            width: le,
            height: Z,
            x: Q,
            y: ne,
          } = zE(
            R,
            c.controlDirection,
            B,
            c.boundaries,
            c.keepAspectRatio,
            oe,
            P,
            H
          ),
          J = le !== W,
          ie = Z !== M,
          ue = Q !== z && J,
          se = ne !== $ && ie;
        if (!ue && !se && !J && !ie) return;
        if (
          (ue || se || oe[0] === 1 || oe[1] === 1) &&
          ((I.x = ue ? Q : _.x),
          (I.y = se ? ne : _.y),
          (_.x = I.x),
          (_.y = I.y),
          O.length > 0)
        ) {
          const Ce = Q - z,
            ke = ne - $;
          for (const Se of O)
            ((Se.position = {
              x: Se.position.x - Ce + oe[0] * (le - W),
              y: Se.position.y - ke + oe[1] * (Z - M),
            }),
              X.push(Se));
        }
        if (
          ((J || ie) &&
            ((I.width =
              J && (!c.resizeDirection || c.resizeDirection === "horizontal")
                ? le
                : _.width),
            (I.height =
              ie && (!c.resizeDirection || c.resizeDirection === "vertical")
                ? Z
                : _.height),
            (_.width = I.width),
            (_.height = I.height)),
          A && E.expandParent)
        ) {
          const Ce = oe[0] * (I.width ?? 0);
          I.x && I.x < Ce && ((_.x = Ce), (R.x = R.x - (I.x - Ce)));
          const ke = oe[1] * (I.height ?? 0);
          I.y && I.y < ke && ((_.y = ke), (R.y = R.y - (I.y - ke)));
        }
        const ae = LE({
            width: _.width,
            prevWidth: W,
            height: _.height,
            prevHeight: M,
            affectsX: c.controlDirection.affectsX,
            affectsY: c.controlDirection.affectsY,
          }),
          de = { ..._, direction: ae };
        (N == null ? void 0 : N(Y, de)) !== !1 &&
          ((V = !0), w == null || w(Y, de), i(I, X));
      })
      .on("end", (Y) => {
        V && (b == null || b(Y, { ..._ }), l == null || l({ ..._ }), (V = !1));
      });
    u.call(re);
  }
  function h() {
    u.on(".drag", null);
  }
  return { update: f, destroy: h };
}
var ic = { exports: {} },
  lc = {},
  ac = { exports: {} },
  uc = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pp;
function FE() {
  if (Pp) return uc;
  Pp = 1;
  var e = Rs();
  function r(g, v) {
    return (g === v && (g !== 0 || 1 / g === 1 / v)) || (g !== g && v !== v);
  }
  var o = typeof Object.is == "function" ? Object.is : r,
    i = e.useState,
    l = e.useEffect,
    u = e.useLayoutEffect,
    c = e.useDebugValue;
  function f(g, v) {
    var S = v(),
      w = i({ inst: { value: S, getSnapshot: v } }),
      b = w[0].inst,
      N = w[1];
    return (
      u(
        function () {
          ((b.value = S), (b.getSnapshot = v), h(b) && N({ inst: b }));
        },
        [g, S, v]
      ),
      l(
        function () {
          return (
            h(b) && N({ inst: b }),
            g(function () {
              h(b) && N({ inst: b });
            })
          );
        },
        [g]
      ),
      c(S),
      S
    );
  }
  function h(g) {
    var v = g.getSnapshot;
    g = g.value;
    try {
      var S = v();
      return !o(g, S);
    } catch {
      return !0;
    }
  }
  function p(g, v) {
    return v();
  }
  var x =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? p
      : f;
  return (
    (uc.useSyncExternalStore =
      e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : x),
    uc
  );
}
var Rp;
function HE() {
  return (Rp || ((Rp = 1), (ac.exports = FE())), ac.exports);
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Tp;
function BE() {
  if (Tp) return lc;
  Tp = 1;
  var e = Rs(),
    r = HE();
  function o(p, x) {
    return (p === x && (p !== 0 || 1 / p === 1 / x)) || (p !== p && x !== x);
  }
  var i = typeof Object.is == "function" ? Object.is : o,
    l = r.useSyncExternalStore,
    u = e.useRef,
    c = e.useEffect,
    f = e.useMemo,
    h = e.useDebugValue;
  return (
    (lc.useSyncExternalStoreWithSelector = function (p, x, g, v, S) {
      var w = u(null);
      if (w.current === null) {
        var b = { hasValue: !1, value: null };
        w.current = b;
      } else b = w.current;
      w = f(
        function () {
          function _(A) {
            if (!R) {
              if (((R = !0), (E = A), (A = v(A)), S !== void 0 && b.hasValue)) {
                var P = b.value;
                if (S(P, A)) return (j = P);
              }
              return (j = A);
            }
            if (((P = j), i(E, A))) return P;
            var H = v(A);
            return S !== void 0 && S(P, H) ? ((E = A), P) : ((E = A), (j = H));
          }
          var R = !1,
            E,
            j,
            O = g === void 0 ? null : g;
          return [
            function () {
              return _(x());
            },
            O === null
              ? void 0
              : function () {
                  return _(O());
                },
          ];
        },
        [x, g, v, S]
      );
      var N = l(p, w[0], w[1]);
      return (
        c(
          function () {
            ((b.hasValue = !0), (b.value = N));
          },
          [N]
        ),
        h(N),
        N
      );
    }),
    lc
  );
}
var Lp;
function VE() {
  return (Lp || ((Lp = 1), (ic.exports = BE())), ic.exports);
}
var WE = VE();
const UE = $c(WE),
  YE = {},
  zp = (e) => {
    let r;
    const o = new Set(),
      i = (x, g) => {
        const v = typeof x == "function" ? x(r) : x;
        if (!Object.is(v, r)) {
          const S = r;
          ((r =
            (g ?? (typeof v != "object" || v === null))
              ? v
              : Object.assign({}, r, v)),
            o.forEach((w) => w(r, S)));
        }
      },
      l = () => r,
      h = {
        setState: i,
        getState: l,
        getInitialState: () => p,
        subscribe: (x) => (o.add(x), () => o.delete(x)),
        destroy: () => {
          ((YE ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
            ),
            o.clear());
        },
      },
      p = (r = e(i, l, h));
    return h;
  },
  XE = (e) => (e ? zp(e) : zp),
  { useDebugValue: KE } = no,
  { useSyncExternalStoreWithSelector: QE } = UE,
  GE = (e) => e;
function H0(e, r = GE, o) {
  const i = QE(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    r,
    o
  );
  return (KE(i), i);
}
const $p = (e, r) => {
    const o = XE(e),
      i = (l, u = r) => H0(o, l, u);
    return (Object.assign(i, o), i);
  },
  qE = (e, r) => (e ? $p(e, r) : $p);
function Be(e, r) {
  if (Object.is(e, r)) return !0;
  if (typeof e != "object" || e === null || typeof r != "object" || r === null)
    return !1;
  if (e instanceof Map && r instanceof Map) {
    if (e.size !== r.size) return !1;
    for (const [i, l] of e) if (!Object.is(l, r.get(i))) return !1;
    return !0;
  }
  if (e instanceof Set && r instanceof Set) {
    if (e.size !== r.size) return !1;
    for (const i of e) if (!r.has(i)) return !1;
    return !0;
  }
  const o = Object.keys(e);
  if (o.length !== Object.keys(r).length) return !1;
  for (const i of o)
    if (!Object.prototype.hasOwnProperty.call(r, i) || !Object.is(e[i], r[i]))
      return !1;
  return !0;
}
const Ql = C.createContext(null),
  ZE = Ql.Provider,
  B0 = nn.error001();
function Te(e, r) {
  const o = C.useContext(Ql);
  if (o === null) throw new Error(B0);
  return H0(o, e, r);
}
function Ve() {
  const e = C.useContext(Ql);
  if (e === null) throw new Error(B0);
  return C.useMemo(
    () => ({
      getState: e.getState,
      setState: e.setState,
      subscribe: e.subscribe,
    }),
    [e]
  );
}
const Ap = { display: "none" },
  JE = {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0px, 0px, 0px, 0px)",
    clipPath: "inset(100%)",
  },
  V0 = "react-flow__node-desc",
  W0 = "react-flow__edge-desc",
  ek = "react-flow__aria-live",
  tk = (e) => e.ariaLiveMessage,
  nk = (e) => e.ariaLabelConfig;
function rk({ rfId: e }) {
  const r = Te(tk);
  return y.jsx("div", {
    id: `${ek}-${e}`,
    "aria-live": "assertive",
    "aria-atomic": "true",
    style: JE,
    children: r,
  });
}
function ok({ rfId: e, disableKeyboardA11y: r }) {
  const o = Te(nk);
  return y.jsxs(y.Fragment, {
    children: [
      y.jsx("div", {
        id: `${V0}-${e}`,
        style: Ap,
        children: r
          ? o["node.a11yDescription.default"]
          : o["node.a11yDescription.keyboardDisabled"],
      }),
      y.jsx("div", {
        id: `${W0}-${e}`,
        style: Ap,
        children: o["edge.a11yDescription.default"],
      }),
      !r && y.jsx(rk, { rfId: e }),
    ],
  });
}
const Gl = C.forwardRef(
  (
    { position: e = "top-left", children: r, className: o, style: i, ...l },
    u
  ) => {
    const c = `${e}`.split("-");
    return y.jsx("div", {
      className: Ge(["react-flow__panel", o, ...c]),
      style: i,
      ref: u,
      ...l,
      children: r,
    });
  }
);
Gl.displayName = "Panel";
function sk({ proOptions: e, position: r = "bottom-right" }) {
  return e != null && e.hideAttribution
    ? null
    : y.jsx(Gl, {
        position: r,
        className: "react-flow__attribution",
        "data-message":
          "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev",
        children: y.jsx("a", {
          href: "https://reactflow.dev",
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "React Flow attribution",
          children: "React Flow",
        }),
      });
}
const ik = (e) => {
    const r = [],
      o = [];
    for (const [, i] of e.nodeLookup)
      i.selected && r.push(i.internals.userNode);
    for (const [, i] of e.edgeLookup) i.selected && o.push(i);
    return { selectedNodes: r, selectedEdges: o };
  },
  pl = (e) => e.id;
function lk(e, r) {
  return (
    Be(e.selectedNodes.map(pl), r.selectedNodes.map(pl)) &&
    Be(e.selectedEdges.map(pl), r.selectedEdges.map(pl))
  );
}
function ak({ onSelectionChange: e }) {
  const r = Ve(),
    { selectedNodes: o, selectedEdges: i } = Te(ik, lk);
  return (
    C.useEffect(() => {
      const l = { nodes: o, edges: i };
      (e == null || e(l),
        r.getState().onSelectionChangeHandlers.forEach((u) => u(l)));
    }, [o, i, e]),
    null
  );
}
const uk = (e) => !!e.onSelectionChangeHandlers;
function ck({ onSelectionChange: e }) {
  const r = Te(uk);
  return e || r ? y.jsx(ak, { onSelectionChange: e }) : null;
}
const U0 = [0, 0],
  dk = { x: 0, y: 0, zoom: 1 },
  fk = [
    "nodes",
    "edges",
    "defaultNodes",
    "defaultEdges",
    "onConnect",
    "onConnectStart",
    "onConnectEnd",
    "onClickConnectStart",
    "onClickConnectEnd",
    "nodesDraggable",
    "autoPanOnNodeFocus",
    "nodesConnectable",
    "nodesFocusable",
    "edgesFocusable",
    "edgesReconnectable",
    "elevateNodesOnSelect",
    "elevateEdgesOnSelect",
    "minZoom",
    "maxZoom",
    "nodeExtent",
    "onNodesChange",
    "onEdgesChange",
    "elementsSelectable",
    "connectionMode",
    "snapGrid",
    "snapToGrid",
    "translateExtent",
    "connectOnClick",
    "defaultEdgeOptions",
    "fitView",
    "fitViewOptions",
    "onNodesDelete",
    "onEdgesDelete",
    "onDelete",
    "onNodeDrag",
    "onNodeDragStart",
    "onNodeDragStop",
    "onSelectionDrag",
    "onSelectionDragStart",
    "onSelectionDragStop",
    "onMoveStart",
    "onMove",
    "onMoveEnd",
    "noPanClassName",
    "nodeOrigin",
    "autoPanOnConnect",
    "autoPanOnNodeDrag",
    "onError",
    "connectionRadius",
    "isValidConnection",
    "selectNodesOnDrag",
    "nodeDragThreshold",
    "connectionDragThreshold",
    "onBeforeDelete",
    "debug",
    "autoPanSpeed",
    "ariaLabelConfig",
    "zIndexMode",
  ],
  Dp = [...fk, "rfId"],
  hk = (e) => ({
    setNodes: e.setNodes,
    setEdges: e.setEdges,
    setMinZoom: e.setMinZoom,
    setMaxZoom: e.setMaxZoom,
    setTranslateExtent: e.setTranslateExtent,
    setNodeExtent: e.setNodeExtent,
    reset: e.reset,
    setDefaultNodesAndEdges: e.setDefaultNodesAndEdges,
  }),
  Op = {
    translateExtent: bs,
    nodeOrigin: U0,
    minZoom: 0.5,
    maxZoom: 2,
    elementsSelectable: !0,
    noPanClassName: "nopan",
    rfId: "1",
  };
function pk(e) {
  const {
      setNodes: r,
      setEdges: o,
      setMinZoom: i,
      setMaxZoom: l,
      setTranslateExtent: u,
      setNodeExtent: c,
      reset: f,
      setDefaultNodesAndEdges: h,
    } = Te(hk, Be),
    p = Ve();
  C.useEffect(
    () => (
      h(e.defaultNodes, e.defaultEdges),
      () => {
        ((x.current = Op), f());
      }
    ),
    []
  );
  const x = C.useRef(Op);
  return (
    C.useEffect(
      () => {
        for (const g of Dp) {
          const v = e[g],
            S = x.current[g];
          v !== S &&
            (typeof e[g] > "u" ||
              (g === "nodes"
                ? r(v)
                : g === "edges"
                  ? o(v)
                  : g === "minZoom"
                    ? i(v)
                    : g === "maxZoom"
                      ? l(v)
                      : g === "translateExtent"
                        ? u(v)
                        : g === "nodeExtent"
                          ? c(v)
                          : g === "ariaLabelConfig"
                            ? p.setState({ ariaLabelConfig: Z2(v) })
                            : g === "fitView"
                              ? p.setState({ fitViewQueued: v })
                              : g === "fitViewOptions"
                                ? p.setState({ fitViewOptions: v })
                                : p.setState({ [g]: v })));
        }
        x.current = e;
      },
      Dp.map((g) => e[g])
    ),
    null
  );
}
function Fp() {
  return typeof window > "u" || !window.matchMedia
    ? null
    : window.matchMedia("(prefers-color-scheme: dark)");
}
function mk(e) {
  var i;
  const [r, o] = C.useState(e === "system" ? null : e);
  return (
    C.useEffect(() => {
      if (e !== "system") {
        o(e);
        return;
      }
      const l = Fp(),
        u = () => o(l != null && l.matches ? "dark" : "light");
      return (
        u(),
        l == null || l.addEventListener("change", u),
        () => {
          l == null || l.removeEventListener("change", u);
        }
      );
    }, [e]),
    r !== null ? r : (i = Fp()) != null && i.matches ? "dark" : "light"
  );
}
const Hp = typeof document < "u" ? document : null;
function Ps(e = null, r = { target: Hp, actInsideInputWithModifier: !0 }) {
  const [o, i] = C.useState(!1),
    l = C.useRef(!1),
    u = C.useRef(new Set([])),
    [c, f] = C.useMemo(() => {
      if (e !== null) {
        const p = (Array.isArray(e) ? e : [e])
            .filter((g) => typeof g == "string")
            .map((g) =>
              g
                .replace(
                  "+",
                  `
`
                )
                .replace(
                  `

`,
                  `
+`
                ).split(`
`)
            ),
          x = p.reduce((g, v) => g.concat(...v), []);
        return [p, x];
      }
      return [[], []];
    }, [e]);
  return (
    C.useEffect(() => {
      const h = (r == null ? void 0 : r.target) ?? Hp,
        p = (r == null ? void 0 : r.actInsideInputWithModifier) ?? !0;
      if (e !== null) {
        const x = (S) => {
            var N, _;
            if (
              ((l.current = S.ctrlKey || S.metaKey || S.shiftKey || S.altKey),
              (!l.current || (l.current && !p)) && k0(S))
            )
              return !1;
            const b = Vp(S.code, f);
            if ((u.current.add(S[b]), Bp(c, u.current, !1))) {
              const R =
                  ((_ = (N = S.composedPath) == null ? void 0 : N.call(S)) ==
                  null
                    ? void 0
                    : _[0]) || S.target,
                E =
                  (R == null ? void 0 : R.nodeName) === "BUTTON" ||
                  (R == null ? void 0 : R.nodeName) === "A";
              (r.preventDefault !== !1 &&
                (l.current || !E) &&
                S.preventDefault(),
                i(!0));
            }
          },
          g = (S) => {
            const w = Vp(S.code, f);
            (Bp(c, u.current, !0)
              ? (i(!1), u.current.clear())
              : u.current.delete(S[w]),
              S.key === "Meta" && u.current.clear(),
              (l.current = !1));
          },
          v = () => {
            (u.current.clear(), i(!1));
          };
        return (
          h == null || h.addEventListener("keydown", x),
          h == null || h.addEventListener("keyup", g),
          window.addEventListener("blur", v),
          window.addEventListener("contextmenu", v),
          () => {
            (h == null || h.removeEventListener("keydown", x),
              h == null || h.removeEventListener("keyup", g),
              window.removeEventListener("blur", v),
              window.removeEventListener("contextmenu", v));
          }
        );
      }
    }, [e, i]),
    o
  );
}
function Bp(e, r, o) {
  return e
    .filter((i) => o || i.length === r.size)
    .some((i) => i.every((l) => r.has(l)));
}
function Vp(e, r) {
  return r.includes(e) ? "code" : "key";
}
const gk = () => {
  const e = Ve();
  return C.useMemo(
    () => ({
      zoomIn: (r) => {
        const { panZoom: o } = e.getState();
        return o
          ? o.scaleBy(1.2, { duration: r == null ? void 0 : r.duration })
          : Promise.resolve(!1);
      },
      zoomOut: (r) => {
        const { panZoom: o } = e.getState();
        return o
          ? o.scaleBy(1 / 1.2, { duration: r == null ? void 0 : r.duration })
          : Promise.resolve(!1);
      },
      zoomTo: (r, o) => {
        const { panZoom: i } = e.getState();
        return i
          ? i.scaleTo(r, { duration: o == null ? void 0 : o.duration })
          : Promise.resolve(!1);
      },
      getZoom: () => e.getState().transform[2],
      setViewport: async (r, o) => {
        const {
          transform: [i, l, u],
          panZoom: c,
        } = e.getState();
        return c
          ? (await c.setViewport(
              { x: r.x ?? i, y: r.y ?? l, zoom: r.zoom ?? u },
              o
            ),
            Promise.resolve(!0))
          : Promise.resolve(!1);
      },
      getViewport: () => {
        const [r, o, i] = e.getState().transform;
        return { x: r, y: o, zoom: i };
      },
      setCenter: async (r, o, i) => e.getState().setCenter(r, o, i),
      fitBounds: async (r, o) => {
        const {
            width: i,
            height: l,
            minZoom: u,
            maxZoom: c,
            panZoom: f,
          } = e.getState(),
          h = td(r, i, l, u, c, (o == null ? void 0 : o.padding) ?? 0.1);
        return f
          ? (await f.setViewport(h, {
              duration: o == null ? void 0 : o.duration,
              ease: o == null ? void 0 : o.ease,
              interpolate: o == null ? void 0 : o.interpolate,
            }),
            Promise.resolve(!0))
          : Promise.resolve(!1);
      },
      screenToFlowPosition: (r, o = {}) => {
        const {
          transform: i,
          snapGrid: l,
          snapToGrid: u,
          domNode: c,
        } = e.getState();
        if (!c) return r;
        const { x: f, y: h } = c.getBoundingClientRect(),
          p = { x: r.x - f, y: r.y - h },
          x = o.snapGrid ?? l,
          g = o.snapToGrid ?? u;
        return Fs(p, i, g, x);
      },
      flowToScreenPosition: (r) => {
        const { transform: o, domNode: i } = e.getState();
        if (!i) return r;
        const { x: l, y: u } = i.getBoundingClientRect(),
          c = $l(r, o);
        return { x: c.x + l, y: c.y + u };
      },
    }),
    []
  );
};
function Y0(e, r) {
  const o = [],
    i = new Map(),
    l = [];
  for (const u of e)
    if (u.type === "add") {
      l.push(u);
      continue;
    } else if (u.type === "remove" || u.type === "replace") i.set(u.id, [u]);
    else {
      const c = i.get(u.id);
      c ? c.push(u) : i.set(u.id, [u]);
    }
  for (const u of r) {
    const c = i.get(u.id);
    if (!c) {
      o.push(u);
      continue;
    }
    if (c[0].type === "remove") continue;
    if (c[0].type === "replace") {
      o.push({ ...c[0].item });
      continue;
    }
    const f = { ...u };
    for (const h of c) yk(h, f);
    o.push(f);
  }
  return (
    l.length &&
      l.forEach((u) => {
        u.index !== void 0
          ? o.splice(u.index, 0, { ...u.item })
          : o.push({ ...u.item });
      }),
    o
  );
}
function yk(e, r) {
  switch (e.type) {
    case "select": {
      r.selected = e.selected;
      break;
    }
    case "position": {
      (typeof e.position < "u" && (r.position = e.position),
        typeof e.dragging < "u" && (r.dragging = e.dragging));
      break;
    }
    case "dimensions": {
      (typeof e.dimensions < "u" &&
        ((r.measured = { ...e.dimensions }),
        e.setAttributes &&
          ((e.setAttributes === !0 || e.setAttributes === "width") &&
            (r.width = e.dimensions.width),
          (e.setAttributes === !0 || e.setAttributes === "height") &&
            (r.height = e.dimensions.height))),
        typeof e.resizing == "boolean" && (r.resizing = e.resizing));
      break;
    }
  }
}
function X0(e, r) {
  return Y0(e, r);
}
function K0(e, r) {
  return Y0(e, r);
}
function gr(e, r) {
  return { id: e, type: "select", selected: r };
}
function oo(e, r = new Set(), o = !1) {
  const i = [];
  for (const [l, u] of e) {
    const c = r.has(l);
    !(u.selected === void 0 && !c) &&
      u.selected !== c &&
      (o && (u.selected = c), i.push(gr(u.id, c)));
  }
  return i;
}
function Wp({ items: e = [], lookup: r }) {
  var l;
  const o = [],
    i = new Map(e.map((u) => [u.id, u]));
  for (const [u, c] of e.entries()) {
    const f = r.get(c.id),
      h =
        ((l = f == null ? void 0 : f.internals) == null
          ? void 0
          : l.userNode) ?? f;
    (h !== void 0 && h !== c && o.push({ id: c.id, item: c, type: "replace" }),
      h === void 0 && o.push({ item: c, type: "add", index: u }));
  }
  for (const [u] of r) i.get(u) === void 0 && o.push({ id: u, type: "remove" });
  return o;
}
function Up(e) {
  return { id: e.id, type: "remove" };
}
const Yp = (e) => B2(e),
  vk = (e) => m0(e);
function Q0(e) {
  return C.forwardRef(e);
}
const xk = typeof window < "u" ? C.useLayoutEffect : C.useEffect;
function Xp(e) {
  const [r, o] = C.useState(BigInt(0)),
    [i] = C.useState(() => wk(() => o((l) => l + BigInt(1))));
  return (
    xk(() => {
      const l = i.get();
      l.length && (e(l), i.reset());
    }, [r]),
    i
  );
}
function wk(e) {
  let r = [];
  return {
    get: () => r,
    reset: () => {
      r = [];
    },
    push: (o) => {
      (r.push(o), e());
    },
  };
}
const G0 = C.createContext(null);
function Sk({ children: e }) {
  const r = Ve(),
    o = C.useCallback((f) => {
      const {
        nodes: h = [],
        setNodes: p,
        hasDefaultNodes: x,
        onNodesChange: g,
        nodeLookup: v,
        fitViewQueued: S,
        onNodesChangeMiddlewareMap: w,
      } = r.getState();
      let b = h;
      for (const _ of f) b = typeof _ == "function" ? _(b) : _;
      let N = Wp({ items: b, lookup: v });
      for (const _ of w.values()) N = _(N);
      (x && p(b),
        N.length > 0
          ? g == null || g(N)
          : S &&
            window.requestAnimationFrame(() => {
              const { fitViewQueued: _, nodes: R, setNodes: E } = r.getState();
              _ && E(R);
            }));
    }, []),
    i = Xp(o),
    l = C.useCallback((f) => {
      const {
        edges: h = [],
        setEdges: p,
        hasDefaultEdges: x,
        onEdgesChange: g,
        edgeLookup: v,
      } = r.getState();
      let S = h;
      for (const w of f) S = typeof w == "function" ? w(S) : w;
      x ? p(S) : g && g(Wp({ items: S, lookup: v }));
    }, []),
    u = Xp(l),
    c = C.useMemo(() => ({ nodeQueue: i, edgeQueue: u }), []);
  return y.jsx(G0.Provider, { value: c, children: e });
}
function Ek() {
  const e = C.useContext(G0);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const kk = (e) => !!e.panZoom;
function ad() {
  const e = gk(),
    r = Ve(),
    o = Ek(),
    i = Te(kk),
    l = C.useMemo(() => {
      const u = (g) => r.getState().nodeLookup.get(g),
        c = (g) => {
          o.nodeQueue.push(g);
        },
        f = (g) => {
          o.edgeQueue.push(g);
        },
        h = (g) => {
          var _, R;
          const { nodeLookup: v, nodeOrigin: S } = r.getState(),
            w = Yp(g) ? g : v.get(g.id),
            b = w.parentId
              ? S0(w.position, w.measured, w.parentId, v, S)
              : w.position,
            N = {
              ...w,
              position: b,
              width: ((_ = w.measured) == null ? void 0 : _.width) ?? w.width,
              height:
                ((R = w.measured) == null ? void 0 : R.height) ?? w.height,
            };
          return fo(N);
        },
        p = (g, v, S = { replace: !1 }) => {
          c((w) =>
            w.map((b) => {
              if (b.id === g) {
                const N = typeof v == "function" ? v(b) : v;
                return S.replace && Yp(N) ? N : { ...b, ...N };
              }
              return b;
            })
          );
        },
        x = (g, v, S = { replace: !1 }) => {
          f((w) =>
            w.map((b) => {
              if (b.id === g) {
                const N = typeof v == "function" ? v(b) : v;
                return S.replace && vk(N) ? N : { ...b, ...N };
              }
              return b;
            })
          );
        };
      return {
        getNodes: () => r.getState().nodes.map((g) => ({ ...g })),
        getNode: (g) => {
          var v;
          return (v = u(g)) == null ? void 0 : v.internals.userNode;
        },
        getInternalNode: u,
        getEdges: () => {
          const { edges: g = [] } = r.getState();
          return g.map((v) => ({ ...v }));
        },
        getEdge: (g) => r.getState().edgeLookup.get(g),
        setNodes: c,
        setEdges: f,
        addNodes: (g) => {
          const v = Array.isArray(g) ? g : [g];
          o.nodeQueue.push((S) => [...S, ...v]);
        },
        addEdges: (g) => {
          const v = Array.isArray(g) ? g : [g];
          o.edgeQueue.push((S) => [...S, ...v]);
        },
        toObject: () => {
          const { nodes: g = [], edges: v = [], transform: S } = r.getState(),
            [w, b, N] = S;
          return {
            nodes: g.map((_) => ({ ..._ })),
            edges: v.map((_) => ({ ..._ })),
            viewport: { x: w, y: b, zoom: N },
          };
        },
        deleteElements: async ({ nodes: g = [], edges: v = [] }) => {
          const {
              nodes: S,
              edges: w,
              onNodesDelete: b,
              onEdgesDelete: N,
              triggerNodeChanges: _,
              triggerEdgeChanges: R,
              onDelete: E,
              onBeforeDelete: j,
            } = r.getState(),
            { nodes: O, edges: A } = await X2({
              nodesToRemove: g,
              edgesToRemove: v,
              nodes: S,
              edges: w,
              onBeforeDelete: j,
            }),
            P = A.length > 0,
            H = O.length > 0;
          if (P) {
            const V = A.map(Up);
            (N == null || N(A), R(V));
          }
          if (H) {
            const V = O.map(Up);
            (b == null || b(O), _(V));
          }
          return (
            (H || P) && (E == null || E({ nodes: O, edges: A })),
            { deletedNodes: O, deletedEdges: A }
          );
        },
        getIntersectingNodes: (g, v = !0, S) => {
          const w = vp(g),
            b = w ? g : h(g),
            N = S !== void 0;
          return b
            ? (S || r.getState().nodes).filter((_) => {
                const R = r.getState().nodeLookup.get(_.id);
                if (R && !w && (_.id === g.id || !R.internals.positionAbsolute))
                  return !1;
                const E = fo(N ? _ : R),
                  j = Is(E, b);
                return (
                  (v && j > 0) ||
                  j >= E.width * E.height ||
                  j >= b.width * b.height
                );
              })
            : [];
        },
        isNodeIntersecting: (g, v, S = !0) => {
          const b = vp(g) ? g : h(g);
          if (!b) return !1;
          const N = Is(b, v);
          return (
            (S && N > 0) || N >= v.width * v.height || N >= b.width * b.height
          );
        },
        updateNode: p,
        updateNodeData: (g, v, S = { replace: !1 }) => {
          p(
            g,
            (w) => {
              const b = typeof v == "function" ? v(w) : v;
              return S.replace
                ? { ...w, data: b }
                : { ...w, data: { ...w.data, ...b } };
            },
            S
          );
        },
        updateEdge: x,
        updateEdgeData: (g, v, S = { replace: !1 }) => {
          x(
            g,
            (w) => {
              const b = typeof v == "function" ? v(w) : v;
              return S.replace
                ? { ...w, data: b }
                : { ...w, data: { ...w.data, ...b } };
            },
            S
          );
        },
        getNodesBounds: (g) => {
          const { nodeLookup: v, nodeOrigin: S } = r.getState();
          return V2(g, { nodeLookup: v, nodeOrigin: S });
        },
        getHandleConnections: ({ type: g, id: v, nodeId: S }) => {
          var w;
          return Array.from(
            ((w = r
              .getState()
              .connectionLookup.get(`${S}-${g}${v ? `-${v}` : ""}`)) == null
              ? void 0
              : w.values()) ?? []
          );
        },
        getNodeConnections: ({ type: g, handleId: v, nodeId: S }) => {
          var w;
          return Array.from(
            ((w = r
              .getState()
              .connectionLookup.get(
                `${S}${g ? (v ? `-${g}-${v}` : `-${g}`) : ""}`
              )) == null
              ? void 0
              : w.values()) ?? []
          );
        },
        fitView: async (g) => {
          const v = r.getState().fitViewResolver ?? q2();
          return (
            r.setState({
              fitViewQueued: !0,
              fitViewOptions: g,
              fitViewResolver: v,
            }),
            o.nodeQueue.push((S) => [...S]),
            v.promise
          );
        },
      };
    }, []);
  return C.useMemo(() => ({ ...l, ...e, viewportInitialized: i }), [i]);
}
const Kp = (e) => e.selected,
  Ck = typeof window < "u" ? window : void 0;
function Nk({ deleteKeyCode: e, multiSelectionKeyCode: r }) {
  const o = Ve(),
    { deleteElements: i } = ad(),
    l = Ps(e, { actInsideInputWithModifier: !1 }),
    u = Ps(r, { target: Ck });
  (C.useEffect(() => {
    if (l) {
      const { edges: c, nodes: f } = o.getState();
      (i({ nodes: f.filter(Kp), edges: c.filter(Kp) }),
        o.setState({ nodesSelectionActive: !1 }));
    }
  }, [l]),
    C.useEffect(() => {
      o.setState({ multiSelectionActive: u });
    }, [u]));
}
function _k(e) {
  const r = Ve();
  C.useEffect(() => {
    const o = () => {
      var l, u, c, f;
      if (
        !e.current ||
        !(
          ((u = (l = e.current).checkVisibility) == null
            ? void 0
            : u.call(l)) ?? !0
        )
      )
        return !1;
      const i = nd(e.current);
      ((i.height === 0 || i.width === 0) &&
        ((f = (c = r.getState()).onError) == null ||
          f.call(c, "004", nn.error004())),
        r.setState({ width: i.width || 500, height: i.height || 500 }));
    };
    if (e.current) {
      (o(), window.addEventListener("resize", o));
      const i = new ResizeObserver(() => o());
      return (
        i.observe(e.current),
        () => {
          (window.removeEventListener("resize", o),
            i && e.current && i.unobserve(e.current));
        }
      );
    }
  }, []);
}
const ql = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  bk = (e) => ({
    userSelectionActive: e.userSelectionActive,
    lib: e.lib,
    connectionInProgress: e.connection.inProgress,
  });
function jk({
  onPaneContextMenu: e,
  zoomOnScroll: r = !0,
  zoomOnPinch: o = !0,
  panOnScroll: i = !1,
  panOnScrollSpeed: l = 0.5,
  panOnScrollMode: u = wr.Free,
  zoomOnDoubleClick: c = !0,
  panOnDrag: f = !0,
  defaultViewport: h,
  translateExtent: p,
  minZoom: x,
  maxZoom: g,
  zoomActivationKeyCode: v,
  preventScrolling: S = !0,
  children: w,
  noWheelClassName: b,
  noPanClassName: N,
  onViewportChange: _,
  isControlledViewport: R,
  paneClickDistance: E,
  selectionOnDrag: j,
}) {
  const O = Ve(),
    A = C.useRef(null),
    { userSelectionActive: P, lib: H, connectionInProgress: V } = Te(bk, Be),
    re = Ps(v),
    Y = C.useRef();
  _k(A);
  const U = C.useCallback(
    (te) => {
      (_ == null || _({ x: te[0], y: te[1], zoom: te[2] }),
        R || O.setState({ transform: te }));
    },
    [_, R]
  );
  return (
    C.useEffect(() => {
      if (A.current) {
        Y.current = TE({
          domNode: A.current,
          minZoom: x,
          maxZoom: g,
          translateExtent: p,
          viewport: h,
          onDraggingChange: (B) => O.setState({ paneDragging: B }),
          onPanZoomStart: (B, X) => {
            const { onViewportChangeStart: z, onMoveStart: $ } = O.getState();
            ($ == null || $(B, X), z == null || z(X));
          },
          onPanZoom: (B, X) => {
            const { onViewportChange: z, onMove: $ } = O.getState();
            ($ == null || $(B, X), z == null || z(X));
          },
          onPanZoomEnd: (B, X) => {
            const { onViewportChangeEnd: z, onMoveEnd: $ } = O.getState();
            ($ == null || $(B, X), z == null || z(X));
          },
        });
        const { x: te, y: L, zoom: K } = Y.current.getViewport();
        return (
          O.setState({
            panZoom: Y.current,
            transform: [te, L, K],
            domNode: A.current.closest(".react-flow"),
          }),
          () => {
            var B;
            (B = Y.current) == null || B.destroy();
          }
        );
      }
    }, []),
    C.useEffect(() => {
      var te;
      (te = Y.current) == null ||
        te.update({
          onPaneContextMenu: e,
          zoomOnScroll: r,
          zoomOnPinch: o,
          panOnScroll: i,
          panOnScrollSpeed: l,
          panOnScrollMode: u,
          zoomOnDoubleClick: c,
          panOnDrag: f,
          zoomActivationKeyPressed: re,
          preventScrolling: S,
          noPanClassName: N,
          userSelectionActive: P,
          noWheelClassName: b,
          lib: H,
          onTransformChange: U,
          connectionInProgress: V,
          selectionOnDrag: j,
          paneClickDistance: E,
        });
    }, [e, r, o, i, l, u, c, f, re, S, N, P, b, H, U, V, j, E]),
    y.jsx("div", {
      className: "react-flow__renderer",
      ref: A,
      style: ql,
      children: w,
    })
  );
}
const Ik = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect,
});
function Mk() {
  const { userSelectionActive: e, userSelectionRect: r } = Te(Ik, Be);
  return e && r
    ? y.jsx("div", {
        className: "react-flow__selection react-flow__container",
        style: {
          width: r.width,
          height: r.height,
          transform: `translate(${r.x}px, ${r.y}px)`,
        },
      })
    : null;
}
const cc = (e, r) => (o) => {
    o.target === r.current && (e == null || e(o));
  },
  Pk = (e) => ({
    userSelectionActive: e.userSelectionActive,
    elementsSelectable: e.elementsSelectable,
    connectionInProgress: e.connection.inProgress,
    dragging: e.paneDragging,
  });
function Rk({
  isSelecting: e,
  selectionKeyPressed: r,
  selectionMode: o = js.Full,
  panOnDrag: i,
  paneClickDistance: l,
  selectionOnDrag: u,
  onSelectionStart: c,
  onSelectionEnd: f,
  onPaneClick: h,
  onPaneContextMenu: p,
  onPaneScroll: x,
  onPaneMouseEnter: g,
  onPaneMouseMove: v,
  onPaneMouseLeave: S,
  children: w,
}) {
  const b = Ve(),
    {
      userSelectionActive: N,
      elementsSelectable: _,
      dragging: R,
      connectionInProgress: E,
    } = Te(Pk, Be),
    j = _ && (e || N),
    O = C.useRef(null),
    A = C.useRef(),
    P = C.useRef(new Set()),
    H = C.useRef(new Set()),
    V = C.useRef(!1),
    re = (z) => {
      if (V.current || E) {
        V.current = !1;
        return;
      }
      (h == null || h(z),
        b.getState().resetSelectedElements(),
        b.setState({ nodesSelectionActive: !1 }));
    },
    Y = (z) => {
      if (Array.isArray(i) && i != null && i.includes(2)) {
        z.preventDefault();
        return;
      }
      p == null || p(z);
    },
    U = x ? (z) => x(z) : void 0,
    te = (z) => {
      V.current && (z.stopPropagation(), (V.current = !1));
    },
    L = (z) => {
      var Z, Q;
      const { domNode: $ } = b.getState();
      if (
        ((A.current = $ == null ? void 0 : $.getBoundingClientRect()),
        !A.current)
      )
        return;
      const W = z.target === O.current;
      if (
        (!W && !!z.target.closest(".nokey")) ||
        !e ||
        !((u && W) || r) ||
        z.button !== 0 ||
        !z.isPrimary
      )
        return;
      ((Q = (Z = z.target) == null ? void 0 : Z.setPointerCapture) == null ||
        Q.call(Z, z.pointerId),
        (V.current = !1));
      const { x: oe, y: le } = Yt(z.nativeEvent, A.current);
      (b.setState({
        userSelectionRect: {
          width: 0,
          height: 0,
          startX: oe,
          startY: le,
          x: oe,
          y: le,
        },
      }),
        W || (z.stopPropagation(), z.preventDefault()));
    },
    K = (z) => {
      const {
        userSelectionRect: $,
        transform: W,
        nodeLookup: M,
        edgeLookup: I,
        connectionLookup: oe,
        triggerNodeChanges: le,
        triggerEdgeChanges: Z,
        defaultEdgeOptions: Q,
        resetSelectedElements: ne,
      } = b.getState();
      if (!A.current || !$) return;
      const { x: J, y: ie } = Yt(z.nativeEvent, A.current),
        { startX: ue, startY: se } = $;
      if (!V.current) {
        const ke = r ? 0 : l;
        if (Math.hypot(J - ue, ie - se) <= ke) return;
        (ne(), c == null || c(z));
      }
      V.current = !0;
      const ae = {
          startX: ue,
          startY: se,
          x: J < ue ? J : ue,
          y: ie < se ? ie : se,
          width: Math.abs(J - ue),
          height: Math.abs(ie - se),
        },
        de = P.current,
        ge = H.current;
      ((P.current = new Set(
        ed(M, ae, W, o === js.Partial, !0).map((ke) => ke.id)
      )),
        (H.current = new Set()));
      const Ce = (Q == null ? void 0 : Q.selectable) ?? !0;
      for (const ke of P.current) {
        const Se = oe.get(ke);
        if (Se)
          for (const { edgeId: Ie } of Se.values()) {
            const me = I.get(Ie);
            me && (me.selectable ?? Ce) && H.current.add(Ie);
          }
      }
      if (!xp(de, P.current)) {
        const ke = oo(M, P.current, !0);
        le(ke);
      }
      if (!xp(ge, H.current)) {
        const ke = oo(I, H.current);
        Z(ke);
      }
      b.setState({
        userSelectionRect: ae,
        userSelectionActive: !0,
        nodesSelectionActive: !1,
      });
    },
    B = (z) => {
      var $, W;
      z.button === 0 &&
        ((W = ($ = z.target) == null ? void 0 : $.releasePointerCapture) ==
          null || W.call($, z.pointerId),
        !N &&
          z.target === O.current &&
          b.getState().userSelectionRect &&
          (re == null || re(z)),
        b.setState({ userSelectionActive: !1, userSelectionRect: null }),
        V.current &&
          (f == null || f(z),
          b.setState({ nodesSelectionActive: P.current.size > 0 })));
    },
    X = i === !0 || (Array.isArray(i) && i.includes(0));
  return y.jsxs("div", {
    className: Ge([
      "react-flow__pane",
      { draggable: X, dragging: R, selection: e },
    ]),
    onClick: j ? void 0 : cc(re, O),
    onContextMenu: cc(Y, O),
    onWheel: cc(U, O),
    onPointerEnter: j ? void 0 : g,
    onPointerMove: j ? K : v,
    onPointerUp: j ? B : void 0,
    onPointerDownCapture: j ? L : void 0,
    onClickCapture: j ? te : void 0,
    onPointerLeave: S,
    ref: O,
    style: ql,
    children: [w, y.jsx(Mk, {})],
  });
}
function Lc({ id: e, store: r, unselect: o = !1, nodeRef: i }) {
  const {
      addSelectedNodes: l,
      unselectNodesAndEdges: u,
      multiSelectionActive: c,
      nodeLookup: f,
      onError: h,
    } = r.getState(),
    p = f.get(e);
  if (!p) {
    h == null || h("012", nn.error012(e));
    return;
  }
  (r.setState({ nodesSelectionActive: !1 }),
    p.selected
      ? (o || (p.selected && c)) &&
        (u({ nodes: [p], edges: [] }),
        requestAnimationFrame(() => {
          var x;
          return (x = i == null ? void 0 : i.current) == null
            ? void 0
            : x.blur();
        }))
      : l([e]));
}
function q0({
  nodeRef: e,
  disabled: r = !1,
  noDragClassName: o,
  handleSelector: i,
  nodeId: l,
  isSelectable: u,
  nodeClickDistance: c,
}) {
  const f = Ve(),
    [h, p] = C.useState(!1),
    x = C.useRef();
  return (
    C.useEffect(() => {
      x.current = xE({
        getStoreItems: () => f.getState(),
        onNodeMouseDown: (g) => {
          Lc({ id: g, store: f, nodeRef: e });
        },
        onDragStart: () => {
          p(!0);
        },
        onDragStop: () => {
          p(!1);
        },
      });
    }, []),
    C.useEffect(() => {
      var g, v;
      if (r) (g = x.current) == null || g.destroy();
      else if (e.current)
        return (
          (v = x.current) == null ||
            v.update({
              noDragClassName: o,
              handleSelector: i,
              domNode: e.current,
              isSelectable: u,
              nodeId: l,
              nodeClickDistance: c,
            }),
          () => {
            var S;
            (S = x.current) == null || S.destroy();
          }
        );
    }, [o, i, r, u, e, l]),
    h
  );
}
const Tk = (e) => (r) =>
  r.selected && (r.draggable || (e && typeof r.draggable > "u"));
function Z0() {
  const e = Ve();
  return C.useCallback((o) => {
    const {
        nodeExtent: i,
        snapToGrid: l,
        snapGrid: u,
        nodesDraggable: c,
        onError: f,
        updateNodePositions: h,
        nodeLookup: p,
        nodeOrigin: x,
      } = e.getState(),
      g = new Map(),
      v = Tk(c),
      S = l ? u[0] : 5,
      w = l ? u[1] : 5,
      b = o.direction.x * S * o.factor,
      N = o.direction.y * w * o.factor;
    for (const [, _] of p) {
      if (!v(_)) continue;
      let R = {
        x: _.internals.positionAbsolute.x + b,
        y: _.internals.positionAbsolute.y + N,
      };
      l && (R = Os(R, u));
      const { position: E, positionAbsolute: j } = g0({
        nodeId: _.id,
        nextPosition: R,
        nodeLookup: p,
        nodeExtent: i,
        nodeOrigin: x,
        onError: f,
      });
      ((_.position = E), (_.internals.positionAbsolute = j), g.set(_.id, _));
    }
    h(g);
  }, []);
}
const ud = C.createContext(null),
  Lk = ud.Provider;
ud.Consumer;
const J0 = () => C.useContext(ud),
  zk = (e) => ({
    connectOnClick: e.connectOnClick,
    noPanClassName: e.noPanClassName,
    rfId: e.rfId,
  }),
  $k = (e, r, o) => (i) => {
    const {
        connectionClickStartHandle: l,
        connectionMode: u,
        connection: c,
      } = i,
      { fromHandle: f, toHandle: h, isValid: p } = c,
      x =
        (h == null ? void 0 : h.nodeId) === e &&
        (h == null ? void 0 : h.id) === r &&
        (h == null ? void 0 : h.type) === o;
    return {
      connectingFrom:
        (f == null ? void 0 : f.nodeId) === e &&
        (f == null ? void 0 : f.id) === r &&
        (f == null ? void 0 : f.type) === o,
      connectingTo: x,
      clickConnecting:
        (l == null ? void 0 : l.nodeId) === e &&
        (l == null ? void 0 : l.id) === r &&
        (l == null ? void 0 : l.type) === o,
      isPossibleEndHandle:
        u === uo.Strict
          ? (f == null ? void 0 : f.type) !== o
          : e !== (f == null ? void 0 : f.nodeId) ||
            r !== (f == null ? void 0 : f.id),
      connectionInProcess: !!f,
      clickConnectionInProcess: !!l,
      valid: x && p,
    };
  };
function Ak(
  {
    type: e = "source",
    position: r = Ne.Top,
    isValidConnection: o,
    isConnectable: i = !0,
    isConnectableStart: l = !0,
    isConnectableEnd: u = !0,
    id: c,
    onConnect: f,
    children: h,
    className: p,
    onMouseDown: x,
    onTouchStart: g,
    ...v
  },
  S
) {
  var K, B;
  const w = c || null,
    b = e === "target",
    N = Ve(),
    _ = J0(),
    { connectOnClick: R, noPanClassName: E, rfId: j } = Te(zk, Be),
    {
      connectingFrom: O,
      connectingTo: A,
      clickConnecting: P,
      isPossibleEndHandle: H,
      connectionInProcess: V,
      clickConnectionInProcess: re,
      valid: Y,
    } = Te($k(_, w, e), Be);
  _ ||
    (B = (K = N.getState()).onError) == null ||
    B.call(K, "010", nn.error010());
  const U = (X) => {
      const {
          defaultEdgeOptions: z,
          onConnect: $,
          hasDefaultEdges: W,
        } = N.getState(),
        M = { ...z, ...X };
      if (W) {
        const { edges: I, setEdges: oe } = N.getState();
        oe(j0(M, I));
      }
      ($ == null || $(M), f == null || f(M));
    },
    te = (X) => {
      if (!_) return;
      const z = C0(X.nativeEvent);
      if (l && ((z && X.button === 0) || !z)) {
        const $ = N.getState();
        Tc.onPointerDown(X.nativeEvent, {
          handleDomNode: X.currentTarget,
          autoPanOnConnect: $.autoPanOnConnect,
          connectionMode: $.connectionMode,
          connectionRadius: $.connectionRadius,
          domNode: $.domNode,
          nodeLookup: $.nodeLookup,
          lib: $.lib,
          isTarget: b,
          handleId: w,
          nodeId: _,
          flowId: $.rfId,
          panBy: $.panBy,
          cancelConnection: $.cancelConnection,
          onConnectStart: $.onConnectStart,
          onConnectEnd: $.onConnectEnd,
          updateConnection: $.updateConnection,
          onConnect: U,
          isValidConnection: o || $.isValidConnection,
          getTransform: () => N.getState().transform,
          getFromHandle: () => N.getState().connection.fromHandle,
          autoPanSpeed: $.autoPanSpeed,
          dragThreshold: $.connectionDragThreshold,
        });
      }
      z ? x == null || x(X) : g == null || g(X);
    },
    L = (X) => {
      const {
        onClickConnectStart: z,
        onClickConnectEnd: $,
        connectionClickStartHandle: W,
        connectionMode: M,
        isValidConnection: I,
        lib: oe,
        rfId: le,
        nodeLookup: Z,
        connection: Q,
      } = N.getState();
      if (!_ || (!W && !l)) return;
      if (!W) {
        (z == null ||
          z(X.nativeEvent, { nodeId: _, handleId: w, handleType: e }),
          N.setState({
            connectionClickStartHandle: { nodeId: _, type: e, id: w },
          }));
        return;
      }
      const ne = E0(X.target),
        J = o || I,
        { connection: ie, isValid: ue } = Tc.isValid(X.nativeEvent, {
          handle: { nodeId: _, id: w, type: e },
          connectionMode: M,
          fromNodeId: W.nodeId,
          fromHandleId: W.id || null,
          fromType: W.type,
          isValidConnection: J,
          flowId: le,
          doc: ne,
          lib: oe,
          nodeLookup: Z,
        });
      ue && ie && U(ie);
      const se = structuredClone(Q);
      (delete se.inProgress,
        (se.toPosition = se.toHandle ? se.toHandle.position : null),
        $ == null || $(X, se),
        N.setState({ connectionClickStartHandle: null }));
    };
  return y.jsx("div", {
    "data-handleid": w,
    "data-nodeid": _,
    "data-handlepos": r,
    "data-id": `${j}-${_}-${w}-${e}`,
    className: Ge([
      "react-flow__handle",
      `react-flow__handle-${r}`,
      "nodrag",
      E,
      p,
      {
        source: !b,
        target: b,
        connectable: i,
        connectablestart: l,
        connectableend: u,
        clickconnecting: P,
        connectingfrom: O,
        connectingto: A,
        valid: Y,
        connectionindicator: i && (!V || H) && (V || re ? u : l),
      },
    ]),
    onMouseDown: te,
    onTouchStart: te,
    onClick: R ? L : void 0,
    ref: S,
    ...v,
    children: h,
  });
}
const mo = C.memo(Q0(Ak));
function Dk({ data: e, isConnectable: r, sourcePosition: o = Ne.Bottom }) {
  return y.jsxs(y.Fragment, {
    children: [
      e == null ? void 0 : e.label,
      y.jsx(mo, { type: "source", position: o, isConnectable: r }),
    ],
  });
}
function Ok({
  data: e,
  isConnectable: r,
  targetPosition: o = Ne.Top,
  sourcePosition: i = Ne.Bottom,
}) {
  return y.jsxs(y.Fragment, {
    children: [
      y.jsx(mo, { type: "target", position: o, isConnectable: r }),
      e == null ? void 0 : e.label,
      y.jsx(mo, { type: "source", position: i, isConnectable: r }),
    ],
  });
}
function Fk() {
  return null;
}
function Hk({ data: e, isConnectable: r, targetPosition: o = Ne.Top }) {
  return y.jsxs(y.Fragment, {
    children: [
      y.jsx(mo, { type: "target", position: o, isConnectable: r }),
      e == null ? void 0 : e.label,
    ],
  });
}
const Al = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  },
  Qp = { input: Dk, default: Ok, output: Hk, group: Fk };
function Bk(e) {
  var r, o, i, l;
  return e.internals.handleBounds === void 0
    ? {
        width:
          e.width ??
          e.initialWidth ??
          ((r = e.style) == null ? void 0 : r.width),
        height:
          e.height ??
          e.initialHeight ??
          ((o = e.style) == null ? void 0 : o.height),
      }
    : {
        width: e.width ?? ((i = e.style) == null ? void 0 : i.width),
        height: e.height ?? ((l = e.style) == null ? void 0 : l.height),
      };
}
const Vk = (e) => {
  const {
    width: r,
    height: o,
    x: i,
    y: l,
  } = Ds(e.nodeLookup, { filter: (u) => !!u.selected });
  return {
    width: Ut(r) ? r : null,
    height: Ut(o) ? o : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${i}px,${l}px)`,
  };
};
function Wk({
  onSelectionContextMenu: e,
  noPanClassName: r,
  disableKeyboardA11y: o,
}) {
  const i = Ve(),
    {
      width: l,
      height: u,
      transformString: c,
      userSelectionActive: f,
    } = Te(Vk, Be),
    h = Z0(),
    p = C.useRef(null);
  if (
    (C.useEffect(() => {
      var v;
      o || (v = p.current) == null || v.focus({ preventScroll: !0 });
    }, [o]),
    q0({ nodeRef: p }),
    f || !l || !u)
  )
    return null;
  const x = e
      ? (v) => {
          const S = i.getState().nodes.filter((w) => w.selected);
          e(v, S);
        }
      : void 0,
    g = (v) => {
      Object.prototype.hasOwnProperty.call(Al, v.key) &&
        (v.preventDefault(),
        h({ direction: Al[v.key], factor: v.shiftKey ? 4 : 1 }));
    };
  return y.jsx("div", {
    className: Ge(["react-flow__nodesselection", "react-flow__container", r]),
    style: { transform: c },
    children: y.jsx("div", {
      ref: p,
      className: "react-flow__nodesselection-rect",
      onContextMenu: x,
      tabIndex: o ? void 0 : -1,
      onKeyDown: o ? void 0 : g,
      style: { width: l, height: u },
    }),
  });
}
const Gp = typeof window < "u" ? window : void 0,
  Uk = (e) => ({
    nodesSelectionActive: e.nodesSelectionActive,
    userSelectionActive: e.userSelectionActive,
  });
function eg({
  children: e,
  onPaneClick: r,
  onPaneMouseEnter: o,
  onPaneMouseMove: i,
  onPaneMouseLeave: l,
  onPaneContextMenu: u,
  onPaneScroll: c,
  paneClickDistance: f,
  deleteKeyCode: h,
  selectionKeyCode: p,
  selectionOnDrag: x,
  selectionMode: g,
  onSelectionStart: v,
  onSelectionEnd: S,
  multiSelectionKeyCode: w,
  panActivationKeyCode: b,
  zoomActivationKeyCode: N,
  elementsSelectable: _,
  zoomOnScroll: R,
  zoomOnPinch: E,
  panOnScroll: j,
  panOnScrollSpeed: O,
  panOnScrollMode: A,
  zoomOnDoubleClick: P,
  panOnDrag: H,
  defaultViewport: V,
  translateExtent: re,
  minZoom: Y,
  maxZoom: U,
  preventScrolling: te,
  onSelectionContextMenu: L,
  noWheelClassName: K,
  noPanClassName: B,
  disableKeyboardA11y: X,
  onViewportChange: z,
  isControlledViewport: $,
}) {
  const { nodesSelectionActive: W, userSelectionActive: M } = Te(Uk, Be),
    I = Ps(p, { target: Gp }),
    oe = Ps(b, { target: Gp }),
    le = oe || H,
    Z = oe || j,
    Q = x && le !== !0,
    ne = I || M || Q;
  return (
    Nk({ deleteKeyCode: h, multiSelectionKeyCode: w }),
    y.jsx(jk, {
      onPaneContextMenu: u,
      elementsSelectable: _,
      zoomOnScroll: R,
      zoomOnPinch: E,
      panOnScroll: Z,
      panOnScrollSpeed: O,
      panOnScrollMode: A,
      zoomOnDoubleClick: P,
      panOnDrag: !I && le,
      defaultViewport: V,
      translateExtent: re,
      minZoom: Y,
      maxZoom: U,
      zoomActivationKeyCode: N,
      preventScrolling: te,
      noWheelClassName: K,
      noPanClassName: B,
      onViewportChange: z,
      isControlledViewport: $,
      paneClickDistance: f,
      selectionOnDrag: Q,
      children: y.jsxs(Rk, {
        onSelectionStart: v,
        onSelectionEnd: S,
        onPaneClick: r,
        onPaneMouseEnter: o,
        onPaneMouseMove: i,
        onPaneMouseLeave: l,
        onPaneContextMenu: u,
        onPaneScroll: c,
        panOnDrag: le,
        isSelecting: !!ne,
        selectionMode: g,
        selectionKeyPressed: I,
        paneClickDistance: f,
        selectionOnDrag: Q,
        children: [
          e,
          W &&
            y.jsx(Wk, {
              onSelectionContextMenu: L,
              noPanClassName: B,
              disableKeyboardA11y: X,
            }),
        ],
      }),
    })
  );
}
eg.displayName = "FlowRenderer";
const Yk = C.memo(eg),
  Xk = (e) => (r) =>
    e
      ? ed(
          r.nodeLookup,
          { x: 0, y: 0, width: r.width, height: r.height },
          r.transform,
          !0
        ).map((o) => o.id)
      : Array.from(r.nodeLookup.keys());
function Kk(e) {
  return Te(C.useCallback(Xk(e), [e]), Be);
}
const Qk = (e) => e.updateNodeInternals;
function Gk() {
  const e = Te(Qk),
    [r] = C.useState(() =>
      typeof ResizeObserver > "u"
        ? null
        : new ResizeObserver((o) => {
            const i = new Map();
            (o.forEach((l) => {
              const u = l.target.getAttribute("data-id");
              i.set(u, { id: u, nodeElement: l.target, force: !0 });
            }),
              e(i));
          })
    );
  return (
    C.useEffect(
      () => () => {
        r == null || r.disconnect();
      },
      [r]
    ),
    r
  );
}
function qk({ node: e, nodeType: r, hasDimensions: o, resizeObserver: i }) {
  const l = Ve(),
    u = C.useRef(null),
    c = C.useRef(null),
    f = C.useRef(e.sourcePosition),
    h = C.useRef(e.targetPosition),
    p = C.useRef(r),
    x = o && !!e.internals.handleBounds;
  return (
    C.useEffect(() => {
      u.current &&
        !e.hidden &&
        (!x || c.current !== u.current) &&
        (c.current && (i == null || i.unobserve(c.current)),
        i == null || i.observe(u.current),
        (c.current = u.current));
    }, [x, e.hidden]),
    C.useEffect(
      () => () => {
        c.current && (i == null || i.unobserve(c.current), (c.current = null));
      },
      []
    ),
    C.useEffect(() => {
      if (u.current) {
        const g = p.current !== r,
          v = f.current !== e.sourcePosition,
          S = h.current !== e.targetPosition;
        (g || v || S) &&
          ((p.current = r),
          (f.current = e.sourcePosition),
          (h.current = e.targetPosition),
          l
            .getState()
            .updateNodeInternals(
              new Map([[e.id, { id: e.id, nodeElement: u.current, force: !0 }]])
            ));
      }
    }, [e.id, r, e.sourcePosition, e.targetPosition]),
    u
  );
}
function Zk({
  id: e,
  onClick: r,
  onMouseEnter: o,
  onMouseMove: i,
  onMouseLeave: l,
  onContextMenu: u,
  onDoubleClick: c,
  nodesDraggable: f,
  elementsSelectable: h,
  nodesConnectable: p,
  nodesFocusable: x,
  resizeObserver: g,
  noDragClassName: v,
  noPanClassName: S,
  disableKeyboardA11y: w,
  rfId: b,
  nodeTypes: N,
  nodeClickDistance: _,
  onError: R,
}) {
  const {
    node: E,
    internals: j,
    isParent: O,
  } = Te((J) => {
    const ie = J.nodeLookup.get(e),
      ue = J.parentLookup.has(e);
    return { node: ie, internals: ie.internals, isParent: ue };
  }, Be);
  let A = E.type || "default",
    P = (N == null ? void 0 : N[A]) || Qp[A];
  P === void 0 &&
    (R == null || R("003", nn.error003(A)),
    (A = "default"),
    (P = (N == null ? void 0 : N.default) || Qp.default));
  const H = !!(E.draggable || (f && typeof E.draggable > "u")),
    V = !!(E.selectable || (h && typeof E.selectable > "u")),
    re = !!(E.connectable || (p && typeof E.connectable > "u")),
    Y = !!(E.focusable || (x && typeof E.focusable > "u")),
    U = Ve(),
    te = w0(E),
    L = qk({ node: E, nodeType: A, hasDimensions: te, resizeObserver: g }),
    K = q0({
      nodeRef: L,
      disabled: E.hidden || !H,
      noDragClassName: v,
      handleSelector: E.dragHandle,
      nodeId: e,
      isSelectable: V,
      nodeClickDistance: _,
    }),
    B = Z0();
  if (E.hidden) return null;
  const X = kn(E),
    z = Bk(E),
    $ = V || H || r || o || i || l,
    W = o ? (J) => o(J, { ...j.userNode }) : void 0,
    M = i ? (J) => i(J, { ...j.userNode }) : void 0,
    I = l ? (J) => l(J, { ...j.userNode }) : void 0,
    oe = u ? (J) => u(J, { ...j.userNode }) : void 0,
    le = c ? (J) => c(J, { ...j.userNode }) : void 0,
    Z = (J) => {
      const { selectNodesOnDrag: ie, nodeDragThreshold: ue } = U.getState();
      (V && (!ie || !H || ue > 0) && Lc({ id: e, store: U, nodeRef: L }),
        r && r(J, { ...j.userNode }));
    },
    Q = (J) => {
      if (!(k0(J.nativeEvent) || w)) {
        if (d0.includes(J.key) && V) {
          const ie = J.key === "Escape";
          Lc({ id: e, store: U, unselect: ie, nodeRef: L });
        } else if (
          H &&
          E.selected &&
          Object.prototype.hasOwnProperty.call(Al, J.key)
        ) {
          J.preventDefault();
          const { ariaLabelConfig: ie } = U.getState();
          (U.setState({
            ariaLiveMessage: ie["node.a11yDescription.ariaLiveMessage"]({
              direction: J.key.replace("Arrow", "").toLowerCase(),
              x: ~~j.positionAbsolute.x,
              y: ~~j.positionAbsolute.y,
            }),
          }),
            B({ direction: Al[J.key], factor: J.shiftKey ? 4 : 1 }));
        }
      }
    },
    ne = () => {
      var ge;
      if (w || !((ge = L.current) != null && ge.matches(":focus-visible")))
        return;
      const {
        transform: J,
        width: ie,
        height: ue,
        autoPanOnNodeFocus: se,
        setCenter: ae,
      } = U.getState();
      if (!se) return;
      ed(new Map([[e, E]]), { x: 0, y: 0, width: ie, height: ue }, J, !0)
        .length > 0 ||
        ae(E.position.x + X.width / 2, E.position.y + X.height / 2, {
          zoom: J[2],
        });
    };
  return y.jsx("div", {
    className: Ge([
      "react-flow__node",
      `react-flow__node-${A}`,
      { [S]: H },
      E.className,
      {
        selected: E.selected,
        selectable: V,
        parent: O,
        draggable: H,
        dragging: K,
      },
    ]),
    ref: L,
    style: {
      zIndex: j.z,
      transform: `translate(${j.positionAbsolute.x}px,${j.positionAbsolute.y}px)`,
      pointerEvents: $ ? "all" : "none",
      visibility: te ? "visible" : "hidden",
      ...E.style,
      ...z,
    },
    "data-id": e,
    "data-testid": `rf__node-${e}`,
    onMouseEnter: W,
    onMouseMove: M,
    onMouseLeave: I,
    onContextMenu: oe,
    onClick: Z,
    onDoubleClick: le,
    onKeyDown: Y ? Q : void 0,
    tabIndex: Y ? 0 : void 0,
    onFocus: Y ? ne : void 0,
    role: E.ariaRole ?? (Y ? "group" : void 0),
    "aria-roledescription": "node",
    "aria-describedby": w ? void 0 : `${V0}-${b}`,
    "aria-label": E.ariaLabel,
    ...E.domAttributes,
    children: y.jsx(Lk, {
      value: e,
      children: y.jsx(P, {
        id: e,
        data: E.data,
        type: A,
        positionAbsoluteX: j.positionAbsolute.x,
        positionAbsoluteY: j.positionAbsolute.y,
        selected: E.selected ?? !1,
        selectable: V,
        draggable: H,
        deletable: E.deletable ?? !0,
        isConnectable: re,
        sourcePosition: E.sourcePosition,
        targetPosition: E.targetPosition,
        dragging: K,
        dragHandle: E.dragHandle,
        zIndex: j.z,
        parentId: E.parentId,
        ...X,
      }),
    }),
  });
}
var Jk = C.memo(Zk);
const eC = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError,
});
function tg(e) {
  const {
      nodesDraggable: r,
      nodesConnectable: o,
      nodesFocusable: i,
      elementsSelectable: l,
      onError: u,
    } = Te(eC, Be),
    c = Kk(e.onlyRenderVisibleElements),
    f = Gk();
  return y.jsx("div", {
    className: "react-flow__nodes",
    style: ql,
    children: c.map((h) =>
      y.jsx(
        Jk,
        {
          id: h,
          nodeTypes: e.nodeTypes,
          nodeExtent: e.nodeExtent,
          onClick: e.onNodeClick,
          onMouseEnter: e.onNodeMouseEnter,
          onMouseMove: e.onNodeMouseMove,
          onMouseLeave: e.onNodeMouseLeave,
          onContextMenu: e.onNodeContextMenu,
          onDoubleClick: e.onNodeDoubleClick,
          noDragClassName: e.noDragClassName,
          noPanClassName: e.noPanClassName,
          rfId: e.rfId,
          disableKeyboardA11y: e.disableKeyboardA11y,
          resizeObserver: f,
          nodesDraggable: r,
          nodesConnectable: o,
          nodesFocusable: i,
          elementsSelectable: l,
          nodeClickDistance: e.nodeClickDistance,
          onError: u,
        },
        h
      )
    ),
  });
}
tg.displayName = "NodeRenderer";
const tC = C.memo(tg);
function nC(e) {
  return Te(
    C.useCallback(
      (o) => {
        if (!e) return o.edges.map((l) => l.id);
        const i = [];
        if (o.width && o.height)
          for (const l of o.edges) {
            const u = o.nodeLookup.get(l.source),
              c = o.nodeLookup.get(l.target);
            u &&
              c &&
              tE({
                sourceNode: u,
                targetNode: c,
                width: o.width,
                height: o.height,
                transform: o.transform,
              }) &&
              i.push(l.id);
          }
        return i;
      },
      [e]
    ),
    Be
  );
}
const rC = ({ color: e = "none", strokeWidth: r = 1 }) => {
    const o = { strokeWidth: r, ...(e && { stroke: e }) };
    return y.jsx("polyline", {
      className: "arrow",
      style: o,
      strokeLinecap: "round",
      fill: "none",
      strokeLinejoin: "round",
      points: "-5,-4 0,0 -5,4",
    });
  },
  oC = ({ color: e = "none", strokeWidth: r = 1 }) => {
    const o = { strokeWidth: r, ...(e && { stroke: e, fill: e }) };
    return y.jsx("polyline", {
      className: "arrowclosed",
      style: o,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      points: "-5,-4 0,0 -5,4 -5,-4",
    });
  },
  qp = { [Ll.Arrow]: rC, [Ll.ArrowClosed]: oC };
function sC(e) {
  const r = Ve();
  return C.useMemo(() => {
    var l, u;
    return Object.prototype.hasOwnProperty.call(qp, e)
      ? qp[e]
      : ((u = (l = r.getState()).onError) == null ||
          u.call(l, "009", nn.error009(e)),
        null);
  }, [e]);
}
const iC = ({
    id: e,
    type: r,
    color: o,
    width: i = 12.5,
    height: l = 12.5,
    markerUnits: u = "strokeWidth",
    strokeWidth: c,
    orient: f = "auto-start-reverse",
  }) => {
    const h = sC(r);
    return h
      ? y.jsx("marker", {
          className: "react-flow__arrowhead",
          id: e,
          markerWidth: `${i}`,
          markerHeight: `${l}`,
          viewBox: "-10 -10 20 20",
          markerUnits: u,
          orient: f,
          refX: "0",
          refY: "0",
          children: y.jsx(h, { color: o, strokeWidth: c }),
        })
      : null;
  },
  ng = ({ defaultColor: e, rfId: r }) => {
    const o = Te((u) => u.edges),
      i = Te((u) => u.defaultEdgeOptions),
      l = C.useMemo(
        () =>
          aE(o, {
            id: r,
            defaultColor: e,
            defaultMarkerStart: i == null ? void 0 : i.markerStart,
            defaultMarkerEnd: i == null ? void 0 : i.markerEnd,
          }),
        [o, i, r, e]
      );
    return l.length
      ? y.jsx("svg", {
          className: "react-flow__marker",
          "aria-hidden": "true",
          children: y.jsx("defs", {
            children: l.map((u) =>
              y.jsx(
                iC,
                {
                  id: u.id,
                  type: u.type,
                  color: u.color,
                  width: u.width,
                  height: u.height,
                  markerUnits: u.markerUnits,
                  strokeWidth: u.strokeWidth,
                  orient: u.orient,
                },
                u.id
              )
            ),
          }),
        })
      : null;
  };
ng.displayName = "MarkerDefinitions";
var lC = C.memo(ng);
function rg({
  x: e,
  y: r,
  label: o,
  labelStyle: i,
  labelShowBg: l = !0,
  labelBgStyle: u,
  labelBgPadding: c = [2, 4],
  labelBgBorderRadius: f = 2,
  children: h,
  className: p,
  ...x
}) {
  const [g, v] = C.useState({ x: 1, y: 0, width: 0, height: 0 }),
    S = Ge(["react-flow__edge-textwrapper", p]),
    w = C.useRef(null);
  return (
    C.useEffect(() => {
      if (w.current) {
        const b = w.current.getBBox();
        v({ x: b.x, y: b.y, width: b.width, height: b.height });
      }
    }, [o]),
    o
      ? y.jsxs("g", {
          transform: `translate(${e - g.width / 2} ${r - g.height / 2})`,
          className: S,
          visibility: g.width ? "visible" : "hidden",
          ...x,
          children: [
            l &&
              y.jsx("rect", {
                width: g.width + 2 * c[0],
                x: -c[0],
                y: -c[1],
                height: g.height + 2 * c[1],
                className: "react-flow__edge-textbg",
                style: u,
                rx: f,
                ry: f,
              }),
            y.jsx("text", {
              className: "react-flow__edge-text",
              y: g.height / 2,
              dy: "0.3em",
              ref: w,
              style: i,
              children: o,
            }),
            h,
          ],
        })
      : null
  );
}
rg.displayName = "EdgeText";
const aC = C.memo(rg);
function Zl({
  path: e,
  labelX: r,
  labelY: o,
  label: i,
  labelStyle: l,
  labelShowBg: u,
  labelBgStyle: c,
  labelBgPadding: f,
  labelBgBorderRadius: h,
  interactionWidth: p = 20,
  ...x
}) {
  return y.jsxs(y.Fragment, {
    children: [
      y.jsx("path", {
        ...x,
        d: e,
        fill: "none",
        className: Ge(["react-flow__edge-path", x.className]),
      }),
      p
        ? y.jsx("path", {
            d: e,
            fill: "none",
            strokeOpacity: 0,
            strokeWidth: p,
            className: "react-flow__edge-interaction",
          })
        : null,
      i && Ut(r) && Ut(o)
        ? y.jsx(aC, {
            x: r,
            y: o,
            label: i,
            labelStyle: l,
            labelShowBg: u,
            labelBgStyle: c,
            labelBgPadding: f,
            labelBgBorderRadius: h,
          })
        : null,
    ],
  });
}
function Zp({ pos: e, x1: r, y1: o, x2: i, y2: l }) {
  return e === Ne.Left || e === Ne.Right
    ? [0.5 * (r + i), o]
    : [r, 0.5 * (o + l)];
}
function og({
  sourceX: e,
  sourceY: r,
  sourcePosition: o = Ne.Bottom,
  targetX: i,
  targetY: l,
  targetPosition: u = Ne.Top,
}) {
  const [c, f] = Zp({ pos: o, x1: e, y1: r, x2: i, y2: l }),
    [h, p] = Zp({ pos: u, x1: i, y1: l, x2: e, y2: r }),
    [x, g, v, S] = N0({
      sourceX: e,
      sourceY: r,
      targetX: i,
      targetY: l,
      sourceControlX: c,
      sourceControlY: f,
      targetControlX: h,
      targetControlY: p,
    });
  return [`M${e},${r} C${c},${f} ${h},${p} ${i},${l}`, x, g, v, S];
}
function sg(e) {
  return C.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      sourcePosition: c,
      targetPosition: f,
      label: h,
      labelStyle: p,
      labelShowBg: x,
      labelBgStyle: g,
      labelBgPadding: v,
      labelBgBorderRadius: S,
      style: w,
      markerEnd: b,
      markerStart: N,
      interactionWidth: _,
    }) => {
      const [R, E, j] = og({
          sourceX: o,
          sourceY: i,
          sourcePosition: c,
          targetX: l,
          targetY: u,
          targetPosition: f,
        }),
        O = e.isInternal ? void 0 : r;
      return y.jsx(Zl, {
        id: O,
        path: R,
        labelX: E,
        labelY: j,
        label: h,
        labelStyle: p,
        labelShowBg: x,
        labelBgStyle: g,
        labelBgPadding: v,
        labelBgBorderRadius: S,
        style: w,
        markerEnd: b,
        markerStart: N,
        interactionWidth: _,
      });
    }
  );
}
const uC = sg({ isInternal: !1 }),
  ig = sg({ isInternal: !0 });
uC.displayName = "SimpleBezierEdge";
ig.displayName = "SimpleBezierEdgeInternal";
function lg(e) {
  return C.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      label: c,
      labelStyle: f,
      labelShowBg: h,
      labelBgStyle: p,
      labelBgPadding: x,
      labelBgBorderRadius: g,
      style: v,
      sourcePosition: S = Ne.Bottom,
      targetPosition: w = Ne.Top,
      markerEnd: b,
      markerStart: N,
      pathOptions: _,
      interactionWidth: R,
    }) => {
      const [E, j, O] = Mc({
          sourceX: o,
          sourceY: i,
          sourcePosition: S,
          targetX: l,
          targetY: u,
          targetPosition: w,
          borderRadius: _ == null ? void 0 : _.borderRadius,
          offset: _ == null ? void 0 : _.offset,
          stepPosition: _ == null ? void 0 : _.stepPosition,
        }),
        A = e.isInternal ? void 0 : r;
      return y.jsx(Zl, {
        id: A,
        path: E,
        labelX: j,
        labelY: O,
        label: c,
        labelStyle: f,
        labelShowBg: h,
        labelBgStyle: p,
        labelBgPadding: x,
        labelBgBorderRadius: g,
        style: v,
        markerEnd: b,
        markerStart: N,
        interactionWidth: R,
      });
    }
  );
}
const ag = lg({ isInternal: !1 }),
  ug = lg({ isInternal: !0 });
ag.displayName = "SmoothStepEdge";
ug.displayName = "SmoothStepEdgeInternal";
function cg(e) {
  return C.memo(({ id: r, ...o }) => {
    var l;
    const i = e.isInternal ? void 0 : r;
    return y.jsx(ag, {
      ...o,
      id: i,
      pathOptions: C.useMemo(() => {
        var u;
        return {
          borderRadius: 0,
          offset: (u = o.pathOptions) == null ? void 0 : u.offset,
        };
      }, [(l = o.pathOptions) == null ? void 0 : l.offset]),
    });
  });
}
const cC = cg({ isInternal: !1 }),
  dg = cg({ isInternal: !0 });
cC.displayName = "StepEdge";
dg.displayName = "StepEdgeInternal";
function fg(e) {
  return C.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      label: c,
      labelStyle: f,
      labelShowBg: h,
      labelBgStyle: p,
      labelBgPadding: x,
      labelBgBorderRadius: g,
      style: v,
      markerEnd: S,
      markerStart: w,
      interactionWidth: b,
    }) => {
      const [N, _, R] = I0({ sourceX: o, sourceY: i, targetX: l, targetY: u }),
        E = e.isInternal ? void 0 : r;
      return y.jsx(Zl, {
        id: E,
        path: N,
        labelX: _,
        labelY: R,
        label: c,
        labelStyle: f,
        labelShowBg: h,
        labelBgStyle: p,
        labelBgPadding: x,
        labelBgBorderRadius: g,
        style: v,
        markerEnd: S,
        markerStart: w,
        interactionWidth: b,
      });
    }
  );
}
const dC = fg({ isInternal: !1 }),
  hg = fg({ isInternal: !0 });
dC.displayName = "StraightEdge";
hg.displayName = "StraightEdgeInternal";
function pg(e) {
  return C.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      sourcePosition: c = Ne.Bottom,
      targetPosition: f = Ne.Top,
      label: h,
      labelStyle: p,
      labelShowBg: x,
      labelBgStyle: g,
      labelBgPadding: v,
      labelBgBorderRadius: S,
      style: w,
      markerEnd: b,
      markerStart: N,
      pathOptions: _,
      interactionWidth: R,
    }) => {
      const [E, j, O] = _0({
          sourceX: o,
          sourceY: i,
          sourcePosition: c,
          targetX: l,
          targetY: u,
          targetPosition: f,
          curvature: _ == null ? void 0 : _.curvature,
        }),
        A = e.isInternal ? void 0 : r;
      return y.jsx(Zl, {
        id: A,
        path: E,
        labelX: j,
        labelY: O,
        label: h,
        labelStyle: p,
        labelShowBg: x,
        labelBgStyle: g,
        labelBgPadding: v,
        labelBgBorderRadius: S,
        style: w,
        markerEnd: b,
        markerStart: N,
        interactionWidth: R,
      });
    }
  );
}
const fC = pg({ isInternal: !1 }),
  mg = pg({ isInternal: !0 });
fC.displayName = "BezierEdge";
mg.displayName = "BezierEdgeInternal";
const Jp = {
    default: mg,
    straight: hg,
    step: dg,
    smoothstep: ug,
    simplebezier: ig,
  },
  em = {
    sourceX: null,
    sourceY: null,
    targetX: null,
    targetY: null,
    sourcePosition: null,
    targetPosition: null,
  },
  hC = (e, r, o) => (o === Ne.Left ? e - r : o === Ne.Right ? e + r : e),
  pC = (e, r, o) => (o === Ne.Top ? e - r : o === Ne.Bottom ? e + r : e),
  tm = "react-flow__edgeupdater";
function nm({
  position: e,
  centerX: r,
  centerY: o,
  radius: i = 10,
  onMouseDown: l,
  onMouseEnter: u,
  onMouseOut: c,
  type: f,
}) {
  return y.jsx("circle", {
    onMouseDown: l,
    onMouseEnter: u,
    onMouseOut: c,
    className: Ge([tm, `${tm}-${f}`]),
    cx: hC(r, i, e),
    cy: pC(o, i, e),
    r: i,
    stroke: "transparent",
    fill: "transparent",
  });
}
function mC({
  isReconnectable: e,
  reconnectRadius: r,
  edge: o,
  sourceX: i,
  sourceY: l,
  targetX: u,
  targetY: c,
  sourcePosition: f,
  targetPosition: h,
  onReconnect: p,
  onReconnectStart: x,
  onReconnectEnd: g,
  setReconnecting: v,
  setUpdateHover: S,
}) {
  const w = Ve(),
    b = (j, O) => {
      if (j.button !== 0) return;
      const {
          autoPanOnConnect: A,
          domNode: P,
          isValidConnection: H,
          connectionMode: V,
          connectionRadius: re,
          lib: Y,
          onConnectStart: U,
          onConnectEnd: te,
          cancelConnection: L,
          nodeLookup: K,
          rfId: B,
          panBy: X,
          updateConnection: z,
        } = w.getState(),
        $ = O.type === "target",
        W = (oe, le) => {
          (v(!1), g == null || g(oe, o, O.type, le));
        },
        M = (oe) => (p == null ? void 0 : p(o, oe)),
        I = (oe, le) => {
          (v(!0), x == null || x(j, o, O.type), U == null || U(oe, le));
        };
      Tc.onPointerDown(j.nativeEvent, {
        autoPanOnConnect: A,
        connectionMode: V,
        connectionRadius: re,
        domNode: P,
        handleId: O.id,
        nodeId: O.nodeId,
        nodeLookup: K,
        isTarget: $,
        edgeUpdaterType: O.type,
        lib: Y,
        flowId: B,
        cancelConnection: L,
        panBy: X,
        isValidConnection: H,
        onConnect: M,
        onConnectStart: I,
        onConnectEnd: te,
        onReconnectEnd: W,
        updateConnection: z,
        getTransform: () => w.getState().transform,
        getFromHandle: () => w.getState().connection.fromHandle,
        dragThreshold: w.getState().connectionDragThreshold,
        handleDomNode: j.currentTarget,
      });
    },
    N = (j) =>
      b(j, { nodeId: o.target, id: o.targetHandle ?? null, type: "target" }),
    _ = (j) =>
      b(j, { nodeId: o.source, id: o.sourceHandle ?? null, type: "source" }),
    R = () => S(!0),
    E = () => S(!1);
  return y.jsxs(y.Fragment, {
    children: [
      (e === !0 || e === "source") &&
        y.jsx(nm, {
          position: f,
          centerX: i,
          centerY: l,
          radius: r,
          onMouseDown: N,
          onMouseEnter: R,
          onMouseOut: E,
          type: "source",
        }),
      (e === !0 || e === "target") &&
        y.jsx(nm, {
          position: h,
          centerX: u,
          centerY: c,
          radius: r,
          onMouseDown: _,
          onMouseEnter: R,
          onMouseOut: E,
          type: "target",
        }),
    ],
  });
}
function gC({
  id: e,
  edgesFocusable: r,
  edgesReconnectable: o,
  elementsSelectable: i,
  onClick: l,
  onDoubleClick: u,
  onContextMenu: c,
  onMouseEnter: f,
  onMouseMove: h,
  onMouseLeave: p,
  reconnectRadius: x,
  onReconnect: g,
  onReconnectStart: v,
  onReconnectEnd: S,
  rfId: w,
  edgeTypes: b,
  noPanClassName: N,
  onError: _,
  disableKeyboardA11y: R,
}) {
  let E = Te((ae) => ae.edgeLookup.get(e));
  const j = Te((ae) => ae.defaultEdgeOptions);
  E = j ? { ...j, ...E } : E;
  let O = E.type || "default",
    A = (b == null ? void 0 : b[O]) || Jp[O];
  A === void 0 &&
    (_ == null || _("011", nn.error011(O)),
    (O = "default"),
    (A = (b == null ? void 0 : b.default) || Jp.default));
  const P = !!(E.focusable || (r && typeof E.focusable > "u")),
    H =
      typeof g < "u" &&
      (E.reconnectable || (o && typeof E.reconnectable > "u")),
    V = !!(E.selectable || (i && typeof E.selectable > "u")),
    re = C.useRef(null),
    [Y, U] = C.useState(!1),
    [te, L] = C.useState(!1),
    K = Ve(),
    {
      zIndex: B,
      sourceX: X,
      sourceY: z,
      targetX: $,
      targetY: W,
      sourcePosition: M,
      targetPosition: I,
    } = Te(
      C.useCallback(
        (ae) => {
          const de = ae.nodeLookup.get(E.source),
            ge = ae.nodeLookup.get(E.target);
          if (!de || !ge) return { zIndex: E.zIndex, ...em };
          const Ce = lE({
            id: e,
            sourceNode: de,
            targetNode: ge,
            sourceHandle: E.sourceHandle || null,
            targetHandle: E.targetHandle || null,
            connectionMode: ae.connectionMode,
            onError: _,
          });
          return {
            zIndex: eE({
              selected: E.selected,
              zIndex: E.zIndex,
              sourceNode: de,
              targetNode: ge,
              elevateOnSelect: ae.elevateEdgesOnSelect,
              zIndexMode: ae.zIndexMode,
            }),
            ...(Ce || em),
          };
        },
        [
          E.source,
          E.target,
          E.sourceHandle,
          E.targetHandle,
          E.selected,
          E.zIndex,
        ]
      ),
      Be
    ),
    oe = C.useMemo(
      () => (E.markerStart ? `url('#${Pc(E.markerStart, w)}')` : void 0),
      [E.markerStart, w]
    ),
    le = C.useMemo(
      () => (E.markerEnd ? `url('#${Pc(E.markerEnd, w)}')` : void 0),
      [E.markerEnd, w]
    );
  if (E.hidden || X === null || z === null || $ === null || W === null)
    return null;
  const Z = (ae) => {
      var ke;
      const {
        addSelectedEdges: de,
        unselectNodesAndEdges: ge,
        multiSelectionActive: Ce,
      } = K.getState();
      (V &&
        (K.setState({ nodesSelectionActive: !1 }),
        E.selected && Ce
          ? (ge({ nodes: [], edges: [E] }),
            (ke = re.current) == null || ke.blur())
          : de([e])),
        l && l(ae, E));
    },
    Q = u
      ? (ae) => {
          u(ae, { ...E });
        }
      : void 0,
    ne = c
      ? (ae) => {
          c(ae, { ...E });
        }
      : void 0,
    J = f
      ? (ae) => {
          f(ae, { ...E });
        }
      : void 0,
    ie = h
      ? (ae) => {
          h(ae, { ...E });
        }
      : void 0,
    ue = p
      ? (ae) => {
          p(ae, { ...E });
        }
      : void 0,
    se = (ae) => {
      var de;
      if (!R && d0.includes(ae.key) && V) {
        const { unselectNodesAndEdges: ge, addSelectedEdges: Ce } =
          K.getState();
        ae.key === "Escape"
          ? ((de = re.current) == null || de.blur(), ge({ edges: [E] }))
          : Ce([e]);
      }
    };
  return y.jsx("svg", {
    style: { zIndex: B },
    children: y.jsxs("g", {
      className: Ge([
        "react-flow__edge",
        `react-flow__edge-${O}`,
        E.className,
        N,
        {
          selected: E.selected,
          animated: E.animated,
          inactive: !V && !l,
          updating: Y,
          selectable: V,
        },
      ]),
      onClick: Z,
      onDoubleClick: Q,
      onContextMenu: ne,
      onMouseEnter: J,
      onMouseMove: ie,
      onMouseLeave: ue,
      onKeyDown: P ? se : void 0,
      tabIndex: P ? 0 : void 0,
      role: E.ariaRole ?? (P ? "group" : "img"),
      "aria-roledescription": "edge",
      "data-id": e,
      "data-testid": `rf__edge-${e}`,
      "aria-label":
        E.ariaLabel === null
          ? void 0
          : E.ariaLabel || `Edge from ${E.source} to ${E.target}`,
      "aria-describedby": P ? `${W0}-${w}` : void 0,
      ref: re,
      ...E.domAttributes,
      children: [
        !te &&
          y.jsx(A, {
            id: e,
            source: E.source,
            target: E.target,
            type: E.type,
            selected: E.selected,
            animated: E.animated,
            selectable: V,
            deletable: E.deletable ?? !0,
            label: E.label,
            labelStyle: E.labelStyle,
            labelShowBg: E.labelShowBg,
            labelBgStyle: E.labelBgStyle,
            labelBgPadding: E.labelBgPadding,
            labelBgBorderRadius: E.labelBgBorderRadius,
            sourceX: X,
            sourceY: z,
            targetX: $,
            targetY: W,
            sourcePosition: M,
            targetPosition: I,
            data: E.data,
            style: E.style,
            sourceHandleId: E.sourceHandle,
            targetHandleId: E.targetHandle,
            markerStart: oe,
            markerEnd: le,
            pathOptions: "pathOptions" in E ? E.pathOptions : void 0,
            interactionWidth: E.interactionWidth,
          }),
        H &&
          y.jsx(mC, {
            edge: E,
            isReconnectable: H,
            reconnectRadius: x,
            onReconnect: g,
            onReconnectStart: v,
            onReconnectEnd: S,
            sourceX: X,
            sourceY: z,
            targetX: $,
            targetY: W,
            sourcePosition: M,
            targetPosition: I,
            setUpdateHover: U,
            setReconnecting: L,
          }),
      ],
    }),
  });
}
var yC = C.memo(gC);
const vC = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError,
});
function gg({
  defaultMarkerColor: e,
  onlyRenderVisibleElements: r,
  rfId: o,
  edgeTypes: i,
  noPanClassName: l,
  onReconnect: u,
  onEdgeContextMenu: c,
  onEdgeMouseEnter: f,
  onEdgeMouseMove: h,
  onEdgeMouseLeave: p,
  onEdgeClick: x,
  reconnectRadius: g,
  onEdgeDoubleClick: v,
  onReconnectStart: S,
  onReconnectEnd: w,
  disableKeyboardA11y: b,
}) {
  const {
      edgesFocusable: N,
      edgesReconnectable: _,
      elementsSelectable: R,
      onError: E,
    } = Te(vC, Be),
    j = nC(r);
  return y.jsxs("div", {
    className: "react-flow__edges",
    children: [
      y.jsx(lC, { defaultColor: e, rfId: o }),
      j.map((O) =>
        y.jsx(
          yC,
          {
            id: O,
            edgesFocusable: N,
            edgesReconnectable: _,
            elementsSelectable: R,
            noPanClassName: l,
            onReconnect: u,
            onContextMenu: c,
            onMouseEnter: f,
            onMouseMove: h,
            onMouseLeave: p,
            onClick: x,
            reconnectRadius: g,
            onDoubleClick: v,
            onReconnectStart: S,
            onReconnectEnd: w,
            rfId: o,
            onError: E,
            edgeTypes: i,
            disableKeyboardA11y: b,
          },
          O
        )
      ),
    ],
  });
}
gg.displayName = "EdgeRenderer";
const xC = C.memo(gg),
  wC = (e) =>
    `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function SC({ children: e }) {
  const r = Te(wC);
  return y.jsx("div", {
    className: "react-flow__viewport xyflow__viewport react-flow__container",
    style: { transform: r },
    children: e,
  });
}
function EC(e) {
  const r = ad(),
    o = C.useRef(!1);
  C.useEffect(() => {
    !o.current &&
      r.viewportInitialized &&
      e &&
      (setTimeout(() => e(r), 1), (o.current = !0));
  }, [e, r.viewportInitialized]);
}
const kC = (e) => {
  var r;
  return (r = e.panZoom) == null ? void 0 : r.syncViewport;
};
function CC(e) {
  const r = Te(kC),
    o = Ve();
  return (
    C.useEffect(() => {
      e && (r == null || r(e), o.setState({ transform: [e.x, e.y, e.zoom] }));
    }, [e, r]),
    null
  );
}
function NC(e) {
  return e.connection.inProgress
    ? { ...e.connection, to: Fs(e.connection.to, e.transform) }
    : { ...e.connection };
}
function _C(e) {
  return NC;
}
function bC(e) {
  const r = _C();
  return Te(r, Be);
}
const jC = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height,
});
function IC({ containerStyle: e, style: r, type: o, component: i }) {
  const {
    nodesConnectable: l,
    width: u,
    height: c,
    isValid: f,
    inProgress: h,
  } = Te(jC, Be);
  return !(u && l && h)
    ? null
    : y.jsx("svg", {
        style: e,
        width: u,
        height: c,
        className: "react-flow__connectionline react-flow__container",
        children: y.jsx("g", {
          className: Ge(["react-flow__connection", p0(f)]),
          children: y.jsx(yg, {
            style: r,
            type: o,
            CustomComponent: i,
            isValid: f,
          }),
        }),
      });
}
const yg = ({
  style: e,
  type: r = Xn.Bezier,
  CustomComponent: o,
  isValid: i,
}) => {
  const {
    inProgress: l,
    from: u,
    fromNode: c,
    fromHandle: f,
    fromPosition: h,
    to: p,
    toNode: x,
    toHandle: g,
    toPosition: v,
    pointer: S,
  } = bC();
  if (!l) return;
  if (o)
    return y.jsx(o, {
      connectionLineType: r,
      connectionLineStyle: e,
      fromNode: c,
      fromHandle: f,
      fromX: u.x,
      fromY: u.y,
      toX: p.x,
      toY: p.y,
      fromPosition: h,
      toPosition: v,
      connectionStatus: p0(i),
      toNode: x,
      toHandle: g,
      pointer: S,
    });
  let w = "";
  const b = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: h,
    targetX: p.x,
    targetY: p.y,
    targetPosition: v,
  };
  switch (r) {
    case Xn.Bezier:
      [w] = _0(b);
      break;
    case Xn.SimpleBezier:
      [w] = og(b);
      break;
    case Xn.Step:
      [w] = Mc({ ...b, borderRadius: 0 });
      break;
    case Xn.SmoothStep:
      [w] = Mc(b);
      break;
    default:
      [w] = I0(b);
  }
  return y.jsx("path", {
    d: w,
    fill: "none",
    className: "react-flow__connection-path",
    style: e,
  });
};
yg.displayName = "ConnectionLine";
const MC = {};
function rm(e = MC) {
  (C.useRef(e), Ve(), C.useEffect(() => {}, [e]));
}
function PC() {
  (Ve(), C.useRef(!1), C.useEffect(() => {}, []));
}
function vg({
  nodeTypes: e,
  edgeTypes: r,
  onInit: o,
  onNodeClick: i,
  onEdgeClick: l,
  onNodeDoubleClick: u,
  onEdgeDoubleClick: c,
  onNodeMouseEnter: f,
  onNodeMouseMove: h,
  onNodeMouseLeave: p,
  onNodeContextMenu: x,
  onSelectionContextMenu: g,
  onSelectionStart: v,
  onSelectionEnd: S,
  connectionLineType: w,
  connectionLineStyle: b,
  connectionLineComponent: N,
  connectionLineContainerStyle: _,
  selectionKeyCode: R,
  selectionOnDrag: E,
  selectionMode: j,
  multiSelectionKeyCode: O,
  panActivationKeyCode: A,
  zoomActivationKeyCode: P,
  deleteKeyCode: H,
  onlyRenderVisibleElements: V,
  elementsSelectable: re,
  defaultViewport: Y,
  translateExtent: U,
  minZoom: te,
  maxZoom: L,
  preventScrolling: K,
  defaultMarkerColor: B,
  zoomOnScroll: X,
  zoomOnPinch: z,
  panOnScroll: $,
  panOnScrollSpeed: W,
  panOnScrollMode: M,
  zoomOnDoubleClick: I,
  panOnDrag: oe,
  onPaneClick: le,
  onPaneMouseEnter: Z,
  onPaneMouseMove: Q,
  onPaneMouseLeave: ne,
  onPaneScroll: J,
  onPaneContextMenu: ie,
  paneClickDistance: ue,
  nodeClickDistance: se,
  onEdgeContextMenu: ae,
  onEdgeMouseEnter: de,
  onEdgeMouseMove: ge,
  onEdgeMouseLeave: Ce,
  reconnectRadius: ke,
  onReconnect: Se,
  onReconnectStart: Ie,
  onReconnectEnd: me,
  noDragClassName: _e,
  noWheelClassName: Re,
  noPanClassName: Je,
  disableKeyboardA11y: jt,
  nodeExtent: sn,
  rfId: Gn,
  viewport: ln,
  onViewportChange: an,
}) {
  return (
    rm(e),
    rm(r),
    PC(),
    EC(o),
    CC(ln),
    y.jsx(Yk, {
      onPaneClick: le,
      onPaneMouseEnter: Z,
      onPaneMouseMove: Q,
      onPaneMouseLeave: ne,
      onPaneContextMenu: ie,
      onPaneScroll: J,
      paneClickDistance: ue,
      deleteKeyCode: H,
      selectionKeyCode: R,
      selectionOnDrag: E,
      selectionMode: j,
      onSelectionStart: v,
      onSelectionEnd: S,
      multiSelectionKeyCode: O,
      panActivationKeyCode: A,
      zoomActivationKeyCode: P,
      elementsSelectable: re,
      zoomOnScroll: X,
      zoomOnPinch: z,
      zoomOnDoubleClick: I,
      panOnScroll: $,
      panOnScrollSpeed: W,
      panOnScrollMode: M,
      panOnDrag: oe,
      defaultViewport: Y,
      translateExtent: U,
      minZoom: te,
      maxZoom: L,
      onSelectionContextMenu: g,
      preventScrolling: K,
      noDragClassName: _e,
      noWheelClassName: Re,
      noPanClassName: Je,
      disableKeyboardA11y: jt,
      onViewportChange: an,
      isControlledViewport: !!ln,
      children: y.jsxs(SC, {
        children: [
          y.jsx(xC, {
            edgeTypes: r,
            onEdgeClick: l,
            onEdgeDoubleClick: c,
            onReconnect: Se,
            onReconnectStart: Ie,
            onReconnectEnd: me,
            onlyRenderVisibleElements: V,
            onEdgeContextMenu: ae,
            onEdgeMouseEnter: de,
            onEdgeMouseMove: ge,
            onEdgeMouseLeave: Ce,
            reconnectRadius: ke,
            defaultMarkerColor: B,
            noPanClassName: Je,
            disableKeyboardA11y: jt,
            rfId: Gn,
          }),
          y.jsx(IC, { style: b, type: w, component: N, containerStyle: _ }),
          y.jsx("div", { className: "react-flow__edgelabel-renderer" }),
          y.jsx(tC, {
            nodeTypes: e,
            onNodeClick: i,
            onNodeDoubleClick: u,
            onNodeMouseEnter: f,
            onNodeMouseMove: h,
            onNodeMouseLeave: p,
            onNodeContextMenu: x,
            nodeClickDistance: se,
            onlyRenderVisibleElements: V,
            noPanClassName: Je,
            noDragClassName: _e,
            disableKeyboardA11y: jt,
            nodeExtent: sn,
            rfId: Gn,
          }),
          y.jsx("div", { className: "react-flow__viewport-portal" }),
        ],
      }),
    })
  );
}
vg.displayName = "GraphView";
const RC = C.memo(vg),
  om = ({
    nodes: e,
    edges: r,
    defaultNodes: o,
    defaultEdges: i,
    width: l,
    height: u,
    fitView: c,
    fitViewOptions: f,
    minZoom: h = 0.5,
    maxZoom: p = 2,
    nodeOrigin: x,
    nodeExtent: g,
    zIndexMode: v = "basic",
  } = {}) => {
    const S = new Map(),
      w = new Map(),
      b = new Map(),
      N = new Map(),
      _ = i ?? r ?? [],
      R = o ?? e ?? [],
      E = x ?? [0, 0],
      j = g ?? bs;
    R0(b, N, _);
    const O = Rc(R, S, w, { nodeOrigin: E, nodeExtent: j, zIndexMode: v });
    let A = [0, 0, 1];
    if (c && l && u) {
      const P = Ds(S, {
          filter: (Y) =>
            !!((Y.width || Y.initialWidth) && (Y.height || Y.initialHeight)),
        }),
        {
          x: H,
          y: V,
          zoom: re,
        } = td(P, l, u, h, p, (f == null ? void 0 : f.padding) ?? 0.1);
      A = [H, V, re];
    }
    return {
      rfId: "1",
      width: l ?? 0,
      height: u ?? 0,
      transform: A,
      nodes: R,
      nodesInitialized: O,
      nodeLookup: S,
      parentLookup: w,
      edges: _,
      edgeLookup: N,
      connectionLookup: b,
      onNodesChange: null,
      onEdgesChange: null,
      hasDefaultNodes: o !== void 0,
      hasDefaultEdges: i !== void 0,
      panZoom: null,
      minZoom: h,
      maxZoom: p,
      translateExtent: bs,
      nodeExtent: j,
      nodesSelectionActive: !1,
      userSelectionActive: !1,
      userSelectionRect: null,
      connectionMode: uo.Strict,
      domNode: null,
      paneDragging: !1,
      noPanClassName: "nopan",
      nodeOrigin: E,
      nodeDragThreshold: 1,
      connectionDragThreshold: 1,
      snapGrid: [15, 15],
      snapToGrid: !1,
      nodesDraggable: !0,
      nodesConnectable: !0,
      nodesFocusable: !0,
      edgesFocusable: !0,
      edgesReconnectable: !0,
      elementsSelectable: !0,
      elevateNodesOnSelect: !0,
      elevateEdgesOnSelect: !0,
      selectNodesOnDrag: !0,
      multiSelectionActive: !1,
      fitViewQueued: c ?? !1,
      fitViewOptions: f,
      fitViewResolver: null,
      connection: { ...h0 },
      connectionClickStartHandle: null,
      connectOnClick: !0,
      ariaLiveMessage: "",
      autoPanOnConnect: !0,
      autoPanOnNodeDrag: !0,
      autoPanOnNodeFocus: !0,
      autoPanSpeed: 15,
      connectionRadius: 20,
      onError: K2,
      isValidConnection: void 0,
      onSelectionChangeHandlers: [],
      lib: "react",
      debug: !1,
      ariaLabelConfig: f0,
      zIndexMode: v,
      onNodesChangeMiddlewareMap: new Map(),
      onEdgesChangeMiddlewareMap: new Map(),
    };
  },
  TC = ({
    nodes: e,
    edges: r,
    defaultNodes: o,
    defaultEdges: i,
    width: l,
    height: u,
    fitView: c,
    fitViewOptions: f,
    minZoom: h,
    maxZoom: p,
    nodeOrigin: x,
    nodeExtent: g,
    zIndexMode: v,
  }) =>
    qE((S, w) => {
      async function b() {
        const {
          nodeLookup: N,
          panZoom: _,
          fitViewOptions: R,
          fitViewResolver: E,
          width: j,
          height: O,
          minZoom: A,
          maxZoom: P,
        } = w();
        _ &&
          (await Y2(
            {
              nodes: N,
              width: j,
              height: O,
              panZoom: _,
              minZoom: A,
              maxZoom: P,
            },
            R
          ),
          E == null || E.resolve(!0),
          S({ fitViewResolver: null }));
      }
      return {
        ...om({
          nodes: e,
          edges: r,
          width: l,
          height: u,
          fitView: c,
          fitViewOptions: f,
          minZoom: h,
          maxZoom: p,
          nodeOrigin: x,
          nodeExtent: g,
          defaultNodes: o,
          defaultEdges: i,
          zIndexMode: v,
        }),
        setNodes: (N) => {
          const {
              nodeLookup: _,
              parentLookup: R,
              nodeOrigin: E,
              elevateNodesOnSelect: j,
              fitViewQueued: O,
              zIndexMode: A,
            } = w(),
            P = Rc(N, _, R, {
              nodeOrigin: E,
              nodeExtent: g,
              elevateNodesOnSelect: j,
              checkEquality: !0,
              zIndexMode: A,
            });
          O && P
            ? (b(),
              S({
                nodes: N,
                nodesInitialized: P,
                fitViewQueued: !1,
                fitViewOptions: void 0,
              }))
            : S({ nodes: N, nodesInitialized: P });
        },
        setEdges: (N) => {
          const { connectionLookup: _, edgeLookup: R } = w();
          (R0(_, R, N), S({ edges: N }));
        },
        setDefaultNodesAndEdges: (N, _) => {
          if (N) {
            const { setNodes: R } = w();
            (R(N), S({ hasDefaultNodes: !0 }));
          }
          if (_) {
            const { setEdges: R } = w();
            (R(_), S({ hasDefaultEdges: !0 }));
          }
        },
        updateNodeInternals: (N) => {
          const {
              triggerNodeChanges: _,
              nodeLookup: R,
              parentLookup: E,
              domNode: j,
              nodeOrigin: O,
              nodeExtent: A,
              debug: P,
              fitViewQueued: H,
              zIndexMode: V,
            } = w(),
            { changes: re, updatedInternals: Y } = mE(N, R, E, j, O, A, V);
          Y &&
            (dE(R, E, { nodeOrigin: O, nodeExtent: A, zIndexMode: V }),
            H ? (b(), S({ fitViewQueued: !1, fitViewOptions: void 0 })) : S({}),
            (re == null ? void 0 : re.length) > 0 &&
              (P && console.log("React Flow: trigger node changes", re),
              _ == null || _(re)));
        },
        updateNodePositions: (N, _ = !1) => {
          const R = [];
          let E = [];
          const {
            nodeLookup: j,
            triggerNodeChanges: O,
            connection: A,
            updateConnection: P,
            onNodesChangeMiddlewareMap: H,
          } = w();
          for (const [V, re] of N) {
            const Y = j.get(V),
              U = !!(
                Y != null &&
                Y.expandParent &&
                Y != null &&
                Y.parentId &&
                re != null &&
                re.position
              ),
              te = {
                id: V,
                type: "position",
                position: U
                  ? {
                      x: Math.max(0, re.position.x),
                      y: Math.max(0, re.position.y),
                    }
                  : re.position,
                dragging: _,
              };
            if (Y && A.inProgress && A.fromNode.id === Y.id) {
              const L = Cr(Y, A.fromHandle, Ne.Left, !0);
              P({ ...A, from: L });
            }
            (U &&
              Y.parentId &&
              R.push({
                id: V,
                parentId: Y.parentId,
                rect: {
                  ...re.internals.positionAbsolute,
                  width: re.measured.width ?? 0,
                  height: re.measured.height ?? 0,
                },
              }),
              E.push(te));
          }
          if (R.length > 0) {
            const { parentLookup: V, nodeOrigin: re } = w(),
              Y = ld(R, j, V, re);
            E.push(...Y);
          }
          for (const V of H.values()) E = V(E);
          O(E);
        },
        triggerNodeChanges: (N) => {
          const {
            onNodesChange: _,
            setNodes: R,
            nodes: E,
            hasDefaultNodes: j,
            debug: O,
          } = w();
          if (N != null && N.length) {
            if (j) {
              const A = X0(N, E);
              R(A);
            }
            (O && console.log("React Flow: trigger node changes", N),
              _ == null || _(N));
          }
        },
        triggerEdgeChanges: (N) => {
          const {
            onEdgesChange: _,
            setEdges: R,
            edges: E,
            hasDefaultEdges: j,
            debug: O,
          } = w();
          if (N != null && N.length) {
            if (j) {
              const A = K0(N, E);
              R(A);
            }
            (O && console.log("React Flow: trigger edge changes", N),
              _ == null || _(N));
          }
        },
        addSelectedNodes: (N) => {
          const {
            multiSelectionActive: _,
            edgeLookup: R,
            nodeLookup: E,
            triggerNodeChanges: j,
            triggerEdgeChanges: O,
          } = w();
          if (_) {
            const A = N.map((P) => gr(P, !0));
            j(A);
            return;
          }
          (j(oo(E, new Set([...N]), !0)), O(oo(R)));
        },
        addSelectedEdges: (N) => {
          const {
            multiSelectionActive: _,
            edgeLookup: R,
            nodeLookup: E,
            triggerNodeChanges: j,
            triggerEdgeChanges: O,
          } = w();
          if (_) {
            const A = N.map((P) => gr(P, !0));
            O(A);
            return;
          }
          (O(oo(R, new Set([...N]))), j(oo(E, new Set(), !0)));
        },
        unselectNodesAndEdges: ({ nodes: N, edges: _ } = {}) => {
          const {
              edges: R,
              nodes: E,
              nodeLookup: j,
              triggerNodeChanges: O,
              triggerEdgeChanges: A,
            } = w(),
            P = N || E,
            H = _ || R,
            V = P.map((Y) => {
              const U = j.get(Y.id);
              return (U && (U.selected = !1), gr(Y.id, !1));
            }),
            re = H.map((Y) => gr(Y.id, !1));
          (O(V), A(re));
        },
        setMinZoom: (N) => {
          const { panZoom: _, maxZoom: R } = w();
          (_ == null || _.setScaleExtent([N, R]), S({ minZoom: N }));
        },
        setMaxZoom: (N) => {
          const { panZoom: _, minZoom: R } = w();
          (_ == null || _.setScaleExtent([R, N]), S({ maxZoom: N }));
        },
        setTranslateExtent: (N) => {
          var _;
          ((_ = w().panZoom) == null || _.setTranslateExtent(N),
            S({ translateExtent: N }));
        },
        resetSelectedElements: () => {
          const {
            edges: N,
            nodes: _,
            triggerNodeChanges: R,
            triggerEdgeChanges: E,
            elementsSelectable: j,
          } = w();
          if (!j) return;
          const O = _.reduce(
              (P, H) => (H.selected ? [...P, gr(H.id, !1)] : P),
              []
            ),
            A = N.reduce((P, H) => (H.selected ? [...P, gr(H.id, !1)] : P), []);
          (R(O), E(A));
        },
        setNodeExtent: (N) => {
          const {
            nodes: _,
            nodeLookup: R,
            parentLookup: E,
            nodeOrigin: j,
            elevateNodesOnSelect: O,
            nodeExtent: A,
            zIndexMode: P,
          } = w();
          (N[0][0] === A[0][0] &&
            N[0][1] === A[0][1] &&
            N[1][0] === A[1][0] &&
            N[1][1] === A[1][1]) ||
            (Rc(_, R, E, {
              nodeOrigin: j,
              nodeExtent: N,
              elevateNodesOnSelect: O,
              checkEquality: !1,
              zIndexMode: P,
            }),
            S({ nodeExtent: N }));
        },
        panBy: (N) => {
          const {
            transform: _,
            width: R,
            height: E,
            panZoom: j,
            translateExtent: O,
          } = w();
          return gE({
            delta: N,
            panZoom: j,
            transform: _,
            translateExtent: O,
            width: R,
            height: E,
          });
        },
        setCenter: async (N, _, R) => {
          const { width: E, height: j, maxZoom: O, panZoom: A } = w();
          if (!A) return Promise.resolve(!1);
          const P = typeof (R == null ? void 0 : R.zoom) < "u" ? R.zoom : O;
          return (
            await A.setViewport(
              { x: E / 2 - N * P, y: j / 2 - _ * P, zoom: P },
              {
                duration: R == null ? void 0 : R.duration,
                ease: R == null ? void 0 : R.ease,
                interpolate: R == null ? void 0 : R.interpolate,
              }
            ),
            Promise.resolve(!0)
          );
        },
        cancelConnection: () => {
          S({ connection: { ...h0 } });
        },
        updateConnection: (N) => {
          S({ connection: N });
        },
        reset: () => S({ ...om() }),
      };
    }, Object.is);
function LC({
  initialNodes: e,
  initialEdges: r,
  defaultNodes: o,
  defaultEdges: i,
  initialWidth: l,
  initialHeight: u,
  initialMinZoom: c,
  initialMaxZoom: f,
  initialFitViewOptions: h,
  fitView: p,
  nodeOrigin: x,
  nodeExtent: g,
  zIndexMode: v,
  children: S,
}) {
  const [w] = C.useState(() =>
    TC({
      nodes: e,
      edges: r,
      defaultNodes: o,
      defaultEdges: i,
      width: l,
      height: u,
      fitView: p,
      minZoom: c,
      maxZoom: f,
      fitViewOptions: h,
      nodeOrigin: x,
      nodeExtent: g,
      zIndexMode: v,
    })
  );
  return y.jsx(ZE, { value: w, children: y.jsx(Sk, { children: S }) });
}
function zC({
  children: e,
  nodes: r,
  edges: o,
  defaultNodes: i,
  defaultEdges: l,
  width: u,
  height: c,
  fitView: f,
  fitViewOptions: h,
  minZoom: p,
  maxZoom: x,
  nodeOrigin: g,
  nodeExtent: v,
  zIndexMode: S,
}) {
  return C.useContext(Ql)
    ? y.jsx(y.Fragment, { children: e })
    : y.jsx(LC, {
        initialNodes: r,
        initialEdges: o,
        defaultNodes: i,
        defaultEdges: l,
        initialWidth: u,
        initialHeight: c,
        fitView: f,
        initialFitViewOptions: h,
        initialMinZoom: p,
        initialMaxZoom: x,
        nodeOrigin: g,
        nodeExtent: v,
        zIndexMode: S,
        children: e,
      });
}
const $C = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0,
};
function AC(
  {
    nodes: e,
    edges: r,
    defaultNodes: o,
    defaultEdges: i,
    className: l,
    nodeTypes: u,
    edgeTypes: c,
    onNodeClick: f,
    onEdgeClick: h,
    onInit: p,
    onMove: x,
    onMoveStart: g,
    onMoveEnd: v,
    onConnect: S,
    onConnectStart: w,
    onConnectEnd: b,
    onClickConnectStart: N,
    onClickConnectEnd: _,
    onNodeMouseEnter: R,
    onNodeMouseMove: E,
    onNodeMouseLeave: j,
    onNodeContextMenu: O,
    onNodeDoubleClick: A,
    onNodeDragStart: P,
    onNodeDrag: H,
    onNodeDragStop: V,
    onNodesDelete: re,
    onEdgesDelete: Y,
    onDelete: U,
    onSelectionChange: te,
    onSelectionDragStart: L,
    onSelectionDrag: K,
    onSelectionDragStop: B,
    onSelectionContextMenu: X,
    onSelectionStart: z,
    onSelectionEnd: $,
    onBeforeDelete: W,
    connectionMode: M,
    connectionLineType: I = Xn.Bezier,
    connectionLineStyle: oe,
    connectionLineComponent: le,
    connectionLineContainerStyle: Z,
    deleteKeyCode: Q = "Backspace",
    selectionKeyCode: ne = "Shift",
    selectionOnDrag: J = !1,
    selectionMode: ie = js.Full,
    panActivationKeyCode: ue = "Space",
    multiSelectionKeyCode: se = Ms() ? "Meta" : "Control",
    zoomActivationKeyCode: ae = Ms() ? "Meta" : "Control",
    snapToGrid: de,
    snapGrid: ge,
    onlyRenderVisibleElements: Ce = !1,
    selectNodesOnDrag: ke,
    nodesDraggable: Se,
    autoPanOnNodeFocus: Ie,
    nodesConnectable: me,
    nodesFocusable: _e,
    nodeOrigin: Re = U0,
    edgesFocusable: Je,
    edgesReconnectable: jt,
    elementsSelectable: sn = !0,
    defaultViewport: Gn = dk,
    minZoom: ln = 0.5,
    maxZoom: an = 2,
    translateExtent: qn = bs,
    preventScrolling: Hs = !0,
    nodeExtent: un,
    defaultMarkerColor: Zn = "#b1b1b7",
    zoomOnScroll: Jl = !0,
    zoomOnPinch: Bs = !0,
    panOnScroll: Vs = !1,
    panOnScrollSpeed: ea = 0.5,
    panOnScrollMode: xo = wr.Free,
    zoomOnDoubleClick: wo = !0,
    panOnDrag: So = !0,
    onPaneClick: Eo,
    onPaneMouseEnter: ko,
    onPaneMouseMove: Cn,
    onPaneMouseLeave: Nn,
    onPaneScroll: Ws,
    onPaneContextMenu: Us,
    paneClickDistance: Ys = 1,
    nodeClickDistance: Xs = 0,
    children: Ks,
    onReconnect: Co,
    onReconnectStart: Qs,
    onReconnectEnd: Jn,
    onEdgeContextMenu: No,
    onEdgeDoubleClick: er,
    onEdgeMouseEnter: ta,
    onEdgeMouseMove: tr,
    onEdgeMouseLeave: Nr,
    reconnectRadius: _r = 10,
    onNodesChange: _o,
    onEdgesChange: na,
    noDragClassName: ra = "nodrag",
    noWheelClassName: oa = "nowheel",
    noPanClassName: Kt = "nopan",
    fitView: bo,
    fitViewOptions: jo,
    connectOnClick: sa,
    attributionPosition: Gs,
    proOptions: qs,
    defaultEdgeOptions: Zs,
    elevateNodesOnSelect: Js = !0,
    elevateEdgesOnSelect: ia = !1,
    disableKeyboardA11y: ei = !1,
    autoPanOnConnect: We,
    autoPanOnNodeDrag: la,
    autoPanSpeed: Io,
    connectionRadius: ti,
    isValidConnection: br,
    onError: aa,
    style: ni,
    id: nr,
    nodeDragThreshold: It,
    connectionDragThreshold: ua,
    viewport: wt,
    onViewportChange: ca,
    width: da,
    height: fa,
    colorMode: jr = "light",
    debug: Ir,
    onScroll: Qt,
    ariaLabelConfig: Mr,
    zIndexMode: ri = "basic",
    ...ha
  },
  Mo
) {
  const Pr = nr || "1",
    Po = mk(jr),
    rr = C.useCallback(
      (oi) => {
        (oi.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }),
          Qt == null || Qt(oi));
      },
      [Qt]
    );
  return y.jsx("div", {
    "data-testid": "rf__wrapper",
    ...ha,
    onScroll: rr,
    style: { ...ni, ...$C },
    ref: Mo,
    className: Ge(["react-flow", l, Po]),
    id: nr,
    role: "application",
    children: y.jsxs(zC, {
      nodes: e,
      edges: r,
      width: da,
      height: fa,
      fitView: bo,
      fitViewOptions: jo,
      minZoom: ln,
      maxZoom: an,
      nodeOrigin: Re,
      nodeExtent: un,
      zIndexMode: ri,
      children: [
        y.jsx(RC, {
          onInit: p,
          onNodeClick: f,
          onEdgeClick: h,
          onNodeMouseEnter: R,
          onNodeMouseMove: E,
          onNodeMouseLeave: j,
          onNodeContextMenu: O,
          onNodeDoubleClick: A,
          nodeTypes: u,
          edgeTypes: c,
          connectionLineType: I,
          connectionLineStyle: oe,
          connectionLineComponent: le,
          connectionLineContainerStyle: Z,
          selectionKeyCode: ne,
          selectionOnDrag: J,
          selectionMode: ie,
          deleteKeyCode: Q,
          multiSelectionKeyCode: se,
          panActivationKeyCode: ue,
          zoomActivationKeyCode: ae,
          onlyRenderVisibleElements: Ce,
          defaultViewport: Gn,
          translateExtent: qn,
          minZoom: ln,
          maxZoom: an,
          preventScrolling: Hs,
          zoomOnScroll: Jl,
          zoomOnPinch: Bs,
          zoomOnDoubleClick: wo,
          panOnScroll: Vs,
          panOnScrollSpeed: ea,
          panOnScrollMode: xo,
          panOnDrag: So,
          onPaneClick: Eo,
          onPaneMouseEnter: ko,
          onPaneMouseMove: Cn,
          onPaneMouseLeave: Nn,
          onPaneScroll: Ws,
          onPaneContextMenu: Us,
          paneClickDistance: Ys,
          nodeClickDistance: Xs,
          onSelectionContextMenu: X,
          onSelectionStart: z,
          onSelectionEnd: $,
          onReconnect: Co,
          onReconnectStart: Qs,
          onReconnectEnd: Jn,
          onEdgeContextMenu: No,
          onEdgeDoubleClick: er,
          onEdgeMouseEnter: ta,
          onEdgeMouseMove: tr,
          onEdgeMouseLeave: Nr,
          reconnectRadius: _r,
          defaultMarkerColor: Zn,
          noDragClassName: ra,
          noWheelClassName: oa,
          noPanClassName: Kt,
          rfId: Pr,
          disableKeyboardA11y: ei,
          nodeExtent: un,
          viewport: wt,
          onViewportChange: ca,
        }),
        y.jsx(pk, {
          nodes: e,
          edges: r,
          defaultNodes: o,
          defaultEdges: i,
          onConnect: S,
          onConnectStart: w,
          onConnectEnd: b,
          onClickConnectStart: N,
          onClickConnectEnd: _,
          nodesDraggable: Se,
          autoPanOnNodeFocus: Ie,
          nodesConnectable: me,
          nodesFocusable: _e,
          edgesFocusable: Je,
          edgesReconnectable: jt,
          elementsSelectable: sn,
          elevateNodesOnSelect: Js,
          elevateEdgesOnSelect: ia,
          minZoom: ln,
          maxZoom: an,
          nodeExtent: un,
          onNodesChange: _o,
          onEdgesChange: na,
          snapToGrid: de,
          snapGrid: ge,
          connectionMode: M,
          translateExtent: qn,
          connectOnClick: sa,
          defaultEdgeOptions: Zs,
          fitView: bo,
          fitViewOptions: jo,
          onNodesDelete: re,
          onEdgesDelete: Y,
          onDelete: U,
          onNodeDragStart: P,
          onNodeDrag: H,
          onNodeDragStop: V,
          onSelectionDrag: K,
          onSelectionDragStart: L,
          onSelectionDragStop: B,
          onMove: x,
          onMoveStart: g,
          onMoveEnd: v,
          noPanClassName: Kt,
          nodeOrigin: Re,
          rfId: Pr,
          autoPanOnConnect: We,
          autoPanOnNodeDrag: la,
          autoPanSpeed: Io,
          onError: aa,
          connectionRadius: ti,
          isValidConnection: br,
          selectNodesOnDrag: ke,
          nodeDragThreshold: It,
          connectionDragThreshold: ua,
          onBeforeDelete: W,
          debug: Ir,
          ariaLabelConfig: Mr,
          zIndexMode: ri,
        }),
        y.jsx(ck, { onSelectionChange: te }),
        Ks,
        y.jsx(sk, { proOptions: qs, position: Gs }),
        y.jsx(ok, { rfId: Pr, disableKeyboardA11y: ei }),
      ],
    }),
  });
}
var DC = Q0(AC);
function OC(e) {
  const [r, o] = C.useState(e),
    i = C.useCallback((l) => o((u) => X0(l, u)), []);
  return [r, o, i];
}
function FC(e) {
  const [r, o] = C.useState(e),
    i = C.useCallback((l) => o((u) => K0(l, u)), []);
  return [r, o, i];
}
function HC({ dimensions: e, lineWidth: r, variant: o, className: i }) {
  return y.jsx("path", {
    strokeWidth: r,
    d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`,
    className: Ge(["react-flow__background-pattern", o, i]),
  });
}
function BC({ radius: e, className: r }) {
  return y.jsx("circle", {
    cx: e,
    cy: e,
    r: e,
    className: Ge(["react-flow__background-pattern", "dots", r]),
  });
}
var Kn;
(function (e) {
  ((e.Lines = "lines"), (e.Dots = "dots"), (e.Cross = "cross"));
})(Kn || (Kn = {}));
const VC = { [Kn.Dots]: 1, [Kn.Lines]: 1, [Kn.Cross]: 6 },
  WC = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function xg({
  id: e,
  variant: r = Kn.Dots,
  gap: o = 20,
  size: i,
  lineWidth: l = 1,
  offset: u = 0,
  color: c,
  bgColor: f,
  style: h,
  className: p,
  patternClassName: x,
}) {
  const g = C.useRef(null),
    { transform: v, patternId: S } = Te(WC, Be),
    w = i || VC[r],
    b = r === Kn.Dots,
    N = r === Kn.Cross,
    _ = Array.isArray(o) ? o : [o, o],
    R = [_[0] * v[2] || 1, _[1] * v[2] || 1],
    E = w * v[2],
    j = Array.isArray(u) ? u : [u, u],
    O = N ? [E, E] : R,
    A = [j[0] * v[2] || 1 + O[0] / 2, j[1] * v[2] || 1 + O[1] / 2],
    P = `${S}${e || ""}`;
  return y.jsxs("svg", {
    className: Ge(["react-flow__background", p]),
    style: {
      ...h,
      ...ql,
      "--xy-background-color-props": f,
      "--xy-background-pattern-color-props": c,
    },
    ref: g,
    "data-testid": "rf__background",
    children: [
      y.jsx("pattern", {
        id: P,
        x: v[0] % R[0],
        y: v[1] % R[1],
        width: R[0],
        height: R[1],
        patternUnits: "userSpaceOnUse",
        patternTransform: `translate(-${A[0]},-${A[1]})`,
        children: b
          ? y.jsx(BC, { radius: E / 2, className: x })
          : y.jsx(HC, {
              dimensions: O,
              lineWidth: l,
              variant: r,
              className: x,
            }),
      }),
      y.jsx("rect", {
        x: "0",
        y: "0",
        width: "100%",
        height: "100%",
        fill: `url(#${P})`,
      }),
    ],
  });
}
xg.displayName = "Background";
C.memo(xg);
function UC() {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    children: y.jsx("path", {
      d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z",
    }),
  });
}
function YC() {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 5",
    children: y.jsx("path", { d: "M0 0h32v4.2H0z" }),
  });
}
function XC() {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 30",
    children: y.jsx("path", {
      d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z",
    }),
  });
}
function KC() {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32",
    children: y.jsx("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z",
    }),
  });
}
function QC() {
  return y.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32",
    children: y.jsx("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z",
    }),
  });
}
function ml({ children: e, className: r, ...o }) {
  return y.jsx("button", {
    type: "button",
    className: Ge(["react-flow__controls-button", r]),
    ...o,
    children: e,
  });
}
const GC = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig,
});
function wg({
  style: e,
  showZoom: r = !0,
  showFitView: o = !0,
  showInteractive: i = !0,
  fitViewOptions: l,
  onZoomIn: u,
  onZoomOut: c,
  onFitView: f,
  onInteractiveChange: h,
  className: p,
  children: x,
  position: g = "bottom-left",
  orientation: v = "vertical",
  "aria-label": S,
}) {
  const w = Ve(),
    {
      isInteractive: b,
      minZoomReached: N,
      maxZoomReached: _,
      ariaLabelConfig: R,
    } = Te(GC, Be),
    { zoomIn: E, zoomOut: j, fitView: O } = ad(),
    A = () => {
      (E(), u == null || u());
    },
    P = () => {
      (j(), c == null || c());
    },
    H = () => {
      (O(l), f == null || f());
    },
    V = () => {
      (w.setState({
        nodesDraggable: !b,
        nodesConnectable: !b,
        elementsSelectable: !b,
      }),
        h == null || h(!b));
    },
    re = v === "horizontal" ? "horizontal" : "vertical";
  return y.jsxs(Gl, {
    className: Ge(["react-flow__controls", re, p]),
    position: g,
    style: e,
    "data-testid": "rf__controls",
    "aria-label": S ?? R["controls.ariaLabel"],
    children: [
      r &&
        y.jsxs(y.Fragment, {
          children: [
            y.jsx(ml, {
              onClick: A,
              className: "react-flow__controls-zoomin",
              title: R["controls.zoomIn.ariaLabel"],
              "aria-label": R["controls.zoomIn.ariaLabel"],
              disabled: _,
              children: y.jsx(UC, {}),
            }),
            y.jsx(ml, {
              onClick: P,
              className: "react-flow__controls-zoomout",
              title: R["controls.zoomOut.ariaLabel"],
              "aria-label": R["controls.zoomOut.ariaLabel"],
              disabled: N,
              children: y.jsx(YC, {}),
            }),
          ],
        }),
      o &&
        y.jsx(ml, {
          className: "react-flow__controls-fitview",
          onClick: H,
          title: R["controls.fitView.ariaLabel"],
          "aria-label": R["controls.fitView.ariaLabel"],
          children: y.jsx(XC, {}),
        }),
      i &&
        y.jsx(ml, {
          className: "react-flow__controls-interactive",
          onClick: V,
          title: R["controls.interactive.ariaLabel"],
          "aria-label": R["controls.interactive.ariaLabel"],
          children: b ? y.jsx(QC, {}) : y.jsx(KC, {}),
        }),
      x,
    ],
  });
}
wg.displayName = "Controls";
const qC = C.memo(wg);
function ZC({
  id: e,
  x: r,
  y: o,
  width: i,
  height: l,
  style: u,
  color: c,
  strokeColor: f,
  strokeWidth: h,
  className: p,
  borderRadius: x,
  shapeRendering: g,
  selected: v,
  onClick: S,
}) {
  const { background: w, backgroundColor: b } = u || {},
    N = c || w || b;
  return y.jsx("rect", {
    className: Ge(["react-flow__minimap-node", { selected: v }, p]),
    x: r,
    y: o,
    rx: x,
    ry: x,
    width: i,
    height: l,
    style: { fill: N, stroke: f, strokeWidth: h },
    shapeRendering: g,
    onClick: S ? (_) => S(_, e) : void 0,
  });
}
const JC = C.memo(ZC),
  eN = (e) => e.nodes.map((r) => r.id),
  dc = (e) => (e instanceof Function ? e : () => e);
function tN({
  nodeStrokeColor: e,
  nodeColor: r,
  nodeClassName: o = "",
  nodeBorderRadius: i = 5,
  nodeStrokeWidth: l,
  nodeComponent: u = JC,
  onClick: c,
}) {
  const f = Te(eN, Be),
    h = dc(r),
    p = dc(e),
    x = dc(o),
    g =
      typeof window > "u" || window.chrome
        ? "crispEdges"
        : "geometricPrecision";
  return y.jsx(y.Fragment, {
    children: f.map((v) =>
      y.jsx(
        rN,
        {
          id: v,
          nodeColorFunc: h,
          nodeStrokeColorFunc: p,
          nodeClassNameFunc: x,
          nodeBorderRadius: i,
          nodeStrokeWidth: l,
          NodeComponent: u,
          onClick: c,
          shapeRendering: g,
        },
        v
      )
    ),
  });
}
function nN({
  id: e,
  nodeColorFunc: r,
  nodeStrokeColorFunc: o,
  nodeClassNameFunc: i,
  nodeBorderRadius: l,
  nodeStrokeWidth: u,
  shapeRendering: c,
  NodeComponent: f,
  onClick: h,
}) {
  const {
    node: p,
    x,
    y: g,
    width: v,
    height: S,
  } = Te((w) => {
    const { internals: b } = w.nodeLookup.get(e),
      N = b.userNode,
      { x: _, y: R } = b.positionAbsolute,
      { width: E, height: j } = kn(N);
    return { node: N, x: _, y: R, width: E, height: j };
  }, Be);
  return !p || p.hidden || !w0(p)
    ? null
    : y.jsx(f, {
        x,
        y: g,
        width: v,
        height: S,
        style: p.style,
        selected: !!p.selected,
        className: i(p),
        color: r(p),
        borderRadius: l,
        strokeColor: o(p),
        strokeWidth: u,
        shapeRendering: c,
        onClick: h,
        id: p.id,
      });
}
const rN = C.memo(nN);
var oN = C.memo(tN);
const sN = 200,
  iN = 150,
  lN = (e) => !e.hidden,
  aN = (e) => {
    const r = {
      x: -e.transform[0] / e.transform[2],
      y: -e.transform[1] / e.transform[2],
      width: e.width / e.transform[2],
      height: e.height / e.transform[2],
    };
    return {
      viewBB: r,
      boundingRect:
        e.nodeLookup.size > 0 ? x0(Ds(e.nodeLookup, { filter: lN }), r) : r,
      rfId: e.rfId,
      panZoom: e.panZoom,
      translateExtent: e.translateExtent,
      flowWidth: e.width,
      flowHeight: e.height,
      ariaLabelConfig: e.ariaLabelConfig,
    };
  },
  uN = "react-flow__minimap-desc";
function Sg({
  style: e,
  className: r,
  nodeStrokeColor: o,
  nodeColor: i,
  nodeClassName: l = "",
  nodeBorderRadius: u = 5,
  nodeStrokeWidth: c,
  nodeComponent: f,
  bgColor: h,
  maskColor: p,
  maskStrokeColor: x,
  maskStrokeWidth: g,
  position: v = "bottom-right",
  onClick: S,
  onNodeClick: w,
  pannable: b = !1,
  zoomable: N = !1,
  ariaLabel: _,
  inversePan: R,
  zoomStep: E = 1,
  offsetScale: j = 5,
}) {
  const O = Ve(),
    A = C.useRef(null),
    {
      boundingRect: P,
      viewBB: H,
      rfId: V,
      panZoom: re,
      translateExtent: Y,
      flowWidth: U,
      flowHeight: te,
      ariaLabelConfig: L,
    } = Te(aN, Be),
    K = (e == null ? void 0 : e.width) ?? sN,
    B = (e == null ? void 0 : e.height) ?? iN,
    X = P.width / K,
    z = P.height / B,
    $ = Math.max(X, z),
    W = $ * K,
    M = $ * B,
    I = j * $,
    oe = P.x - (W - P.width) / 2 - I,
    le = P.y - (M - P.height) / 2 - I,
    Z = W + I * 2,
    Q = M + I * 2,
    ne = `${uN}-${V}`,
    J = C.useRef(0),
    ie = C.useRef();
  ((J.current = $),
    C.useEffect(() => {
      if (A.current && re)
        return (
          (ie.current = NE({
            domNode: A.current,
            panZoom: re,
            getTransform: () => O.getState().transform,
            getViewScale: () => J.current,
          })),
          () => {
            var de;
            (de = ie.current) == null || de.destroy();
          }
        );
    }, [re]),
    C.useEffect(() => {
      var de;
      (de = ie.current) == null ||
        de.update({
          translateExtent: Y,
          width: U,
          height: te,
          inversePan: R,
          pannable: b,
          zoomStep: E,
          zoomable: N,
        });
    }, [b, N, R, E, Y, U, te]));
  const ue = S
      ? (de) => {
          var ke;
          const [ge, Ce] = ((ke = ie.current) == null
            ? void 0
            : ke.pointer(de)) || [0, 0];
          S(de, { x: ge, y: Ce });
        }
      : void 0,
    se = w
      ? C.useCallback((de, ge) => {
          const Ce = O.getState().nodeLookup.get(ge).internals.userNode;
          w(de, Ce);
        }, [])
      : void 0,
    ae = _ ?? L["minimap.ariaLabel"];
  return y.jsx(Gl, {
    position: v,
    style: {
      ...e,
      "--xy-minimap-background-color-props": typeof h == "string" ? h : void 0,
      "--xy-minimap-mask-background-color-props":
        typeof p == "string" ? p : void 0,
      "--xy-minimap-mask-stroke-color-props": typeof x == "string" ? x : void 0,
      "--xy-minimap-mask-stroke-width-props":
        typeof g == "number" ? g * $ : void 0,
      "--xy-minimap-node-background-color-props":
        typeof i == "string" ? i : void 0,
      "--xy-minimap-node-stroke-color-props": typeof o == "string" ? o : void 0,
      "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0,
    },
    className: Ge(["react-flow__minimap", r]),
    "data-testid": "rf__minimap",
    children: y.jsxs("svg", {
      width: K,
      height: B,
      viewBox: `${oe} ${le} ${Z} ${Q}`,
      className: "react-flow__minimap-svg",
      role: "img",
      "aria-labelledby": ne,
      ref: A,
      onClick: ue,
      children: [
        ae && y.jsx("title", { id: ne, children: ae }),
        y.jsx(oN, {
          onClick: se,
          nodeColor: i,
          nodeStrokeColor: o,
          nodeBorderRadius: u,
          nodeClassName: l,
          nodeStrokeWidth: c,
          nodeComponent: f,
        }),
        y.jsx("path", {
          className: "react-flow__minimap-mask",
          d: `M${oe - I},${le - I}h${Z + I * 2}v${Q + I * 2}h${-Z - I * 2}z
        M${H.x},${H.y}h${H.width}v${H.height}h${-H.width}z`,
          fillRule: "evenodd",
          pointerEvents: "none",
        }),
      ],
    }),
  });
}
Sg.displayName = "MiniMap";
const cN = C.memo(Sg),
  dN = (e) => (r) => (e ? `${Math.max(1 / r.transform[2], 1)}` : void 0),
  fN = { [po.Line]: "right", [po.Handle]: "bottom-right" };
function hN({
  nodeId: e,
  position: r,
  variant: o = po.Handle,
  className: i,
  style: l = void 0,
  children: u,
  color: c,
  minWidth: f = 10,
  minHeight: h = 10,
  maxWidth: p = Number.MAX_VALUE,
  maxHeight: x = Number.MAX_VALUE,
  keepAspectRatio: g = !1,
  resizeDirection: v,
  autoScale: S = !0,
  shouldResize: w,
  onResizeStart: b,
  onResize: N,
  onResizeEnd: _,
}) {
  const R = J0(),
    E = typeof e == "string" ? e : R,
    j = Ve(),
    O = C.useRef(null),
    A = o === po.Handle,
    P = Te(C.useCallback(dN(A && S), [A, S]), Be),
    H = C.useRef(null),
    V = r ?? fN[o];
  C.useEffect(() => {
    if (!(!O.current || !E))
      return (
        H.current ||
          (H.current = OE({
            domNode: O.current,
            nodeId: E,
            getStoreItems: () => {
              const {
                nodeLookup: Y,
                transform: U,
                snapGrid: te,
                snapToGrid: L,
                nodeOrigin: K,
                domNode: B,
              } = j.getState();
              return {
                nodeLookup: Y,
                transform: U,
                snapGrid: te,
                snapToGrid: L,
                nodeOrigin: K,
                paneDomNode: B,
              };
            },
            onChange: (Y, U) => {
              const {
                  triggerNodeChanges: te,
                  nodeLookup: L,
                  parentLookup: K,
                  nodeOrigin: B,
                } = j.getState(),
                X = [],
                z = { x: Y.x, y: Y.y },
                $ = L.get(E);
              if ($ && $.expandParent && $.parentId) {
                const W = $.origin ?? B,
                  M = Y.width ?? $.measured.width ?? 0,
                  I = Y.height ?? $.measured.height ?? 0,
                  oe = {
                    id: $.id,
                    parentId: $.parentId,
                    rect: {
                      width: M,
                      height: I,
                      ...S0(
                        { x: Y.x ?? $.position.x, y: Y.y ?? $.position.y },
                        { width: M, height: I },
                        $.parentId,
                        L,
                        W
                      ),
                    },
                  },
                  le = ld([oe], L, K, B);
                (X.push(...le),
                  (z.x = Y.x ? Math.max(W[0] * M, Y.x) : void 0),
                  (z.y = Y.y ? Math.max(W[1] * I, Y.y) : void 0));
              }
              if (z.x !== void 0 && z.y !== void 0) {
                const W = { id: E, type: "position", position: { ...z } };
                X.push(W);
              }
              if (Y.width !== void 0 && Y.height !== void 0) {
                const M = {
                  id: E,
                  type: "dimensions",
                  resizing: !0,
                  setAttributes: v
                    ? v === "horizontal"
                      ? "width"
                      : "height"
                    : !0,
                  dimensions: { width: Y.width, height: Y.height },
                };
                X.push(M);
              }
              for (const W of U) {
                const M = { ...W, type: "position" };
                X.push(M);
              }
              te(X);
            },
            onEnd: ({ width: Y, height: U }) => {
              const te = {
                id: E,
                type: "dimensions",
                resizing: !1,
                dimensions: { width: Y, height: U },
              };
              j.getState().triggerNodeChanges([te]);
            },
          })),
        H.current.update({
          controlPosition: V,
          boundaries: { minWidth: f, minHeight: h, maxWidth: p, maxHeight: x },
          keepAspectRatio: g,
          resizeDirection: v,
          onResizeStart: b,
          onResize: N,
          onResizeEnd: _,
          shouldResize: w,
        }),
        () => {
          var Y;
          (Y = H.current) == null || Y.destroy();
        }
      );
  }, [V, f, h, p, x, g, b, N, _, w]);
  const re = V.split("-");
  return y.jsx("div", {
    className: Ge(["react-flow__resize-control", "nodrag", ...re, o, i]),
    ref: O,
    style: {
      ...l,
      scale: P,
      ...(c && { [A ? "backgroundColor" : "borderColor"]: c }),
    },
    children: u,
  });
}
C.memo(hN);
const pN = { NORMAL: 1e3 };
function mN(e) {
  if (typeof e != "object" || e === null) return !1;
  const r = e;
  if (typeof r.type != "string") return !1;
  switch (r.type) {
    case "joined":
      return typeof r.sessionId == "string" && Array.isArray(r.messages);
    case "left":
      return typeof r.sessionId == "string";
    case "new-message":
      return typeof r.message == "object" && r.message !== null;
    case "typing":
      return typeof r.sessionId == "string" && typeof r.isTyping == "boolean";
    case "error":
      return typeof r.message == "string";
    case "edge_created":
      return typeof r.edge == "object" && r.edge !== null;
    case "edge_deleted":
      return typeof r.edgeId == "string";
    default:
      return !1;
  }
}
const gN = {
  maxReconnectAttempts: 5,
  reconnectBaseDelay: 1e3,
  reconnectMaxDelay: 3e4,
};
class yN {
  constructor(r = {}) {
    ct(this, "ws", null);
    ct(this, "url", "");
    ct(this, "config");
    ct(this, "reconnectAttempts", 0);
    ct(this, "reconnectTimer", null);
    ct(this, "currentSessionId", null);
    ct(this, "connectionState", "disconnected");
    ct(this, "onJoined", null);
    ct(this, "onLeft", null);
    ct(this, "onMessage", null);
    ct(this, "onTyping", null);
    ct(this, "onError", null);
    ct(this, "onConnectionChange", null);
    ct(this, "onEdgeCreated", null);
    ct(this, "onEdgeDeleted", null);
    this.config = { ...gN, ...r };
  }
  connect(r) {
    var o;
    if (((o = this.ws) == null ? void 0 : o.readyState) === WebSocket.OPEN) {
      console.warn("[WebSocket] Already connected");
      return;
    }
    ((this.url = r),
      this.setConnectionState("connecting"),
      this.createConnection());
  }
  disconnect() {
    (this.clearReconnectTimer(),
      (this.reconnectAttempts = 0),
      this.ws && (this.ws.close(1e3, "Client disconnect"), (this.ws = null)),
      (this.currentSessionId = null),
      this.setConnectionState("disconnected"));
  }
  getConnectionState() {
    return this.connectionState;
  }
  getCurrentSessionId() {
    return this.currentSessionId;
  }
  joinSession(r) {
    var o;
    if (!this.isConnected()) {
      (console.error("[WebSocket] Not connected"),
        (o = this.onError) == null || o.call(this, "Not connected to server"));
      return;
    }
    (this.currentSessionId &&
      this.currentSessionId !== r &&
      this.leaveSession(this.currentSessionId),
      this.send({ type: "join", sessionId: r }),
      (this.currentSessionId = r));
  }
  leaveSession(r) {
    this.isConnected() &&
      (this.send({ type: "leave", sessionId: r }),
      this.currentSessionId === r && (this.currentSessionId = null));
  }
  sendMessage(r, o) {
    var i;
    if (!this.isConnected()) {
      (console.error("[WebSocket] Not connected"),
        (i = this.onError) == null || i.call(this, "Not connected to server"));
      return;
    }
    this.send({ type: "message", sessionId: r, content: o });
  }
  sendTyping(r, o) {
    this.isConnected() &&
      this.send({ type: "typing", sessionId: r, isTyping: o });
  }
  createConnection() {
    try {
      ((this.ws = new WebSocket(this.url)),
        (this.ws.onopen = () => {
          (console.log("[WebSocket] Connected"),
            (this.reconnectAttempts = 0),
            this.setConnectionState("connected"),
            this.currentSessionId &&
              this.send({ type: "join", sessionId: this.currentSessionId }));
        }),
        (this.ws.onmessage = (r) => {
          this.handleMessage(r.data);
        }),
        (this.ws.onclose = (r) => {
          (console.log(`[WebSocket] Closed: ${r.code} ${r.reason}`),
            (this.ws = null),
            this.setConnectionState("disconnected"),
            r.code !== pN.NORMAL && this.scheduleReconnect());
        }),
        (this.ws.onerror = (r) => {
          var i, l;
          const o =
            r instanceof ErrorEvent ? r.message : "Unknown connection error";
          (console.error("[WebSocket] Error:", {
            type: r.type,
            message: o,
            url: this.url,
            readyState: (i = this.ws) == null ? void 0 : i.readyState,
          }),
            (l = this.onError) == null || l.call(this, o));
        }));
    } catch (r) {
      (console.error("[WebSocket] Failed to create connection:", r),
        this.setConnectionState("disconnected"),
        this.scheduleReconnect());
    }
  }
  handleMessage(r) {
    var o, i, l, u, c, f, h, p, x;
    try {
      const g = JSON.parse(r);
      if (!mN(g)) {
        (console.error("[WebSocket] Invalid message format:", g),
          (o = this.onError) == null ||
            o.call(this, "Invalid message from server"));
        return;
      }
      const v = g;
      switch (v.type) {
        case "joined":
          (i = this.onJoined) == null || i.call(this, v.sessionId, v.messages);
          break;
        case "left":
          (l = this.onLeft) == null || l.call(this, v.sessionId);
          break;
        case "new-message":
          (u = this.onMessage) == null || u.call(this, v.message);
          break;
        case "typing":
          (c = this.onTyping) == null || c.call(this, v.sessionId, v.isTyping);
          break;
        case "error":
          (f = this.onError) == null || f.call(this, v.message);
          break;
        case "edge_created":
          (h = this.onEdgeCreated) == null || h.call(this, v.edge);
          break;
        case "edge_deleted":
          (p = this.onEdgeDeleted) == null ||
            p.call(this, v.edgeId, v.remainingContext);
          break;
      }
    } catch (g) {
      (console.error("[WebSocket] Failed to parse message:", g),
        (x = this.onError) == null ||
          x.call(this, "Failed to parse server message"));
    }
  }
  send(r) {
    var o;
    ((o = this.ws) == null ? void 0 : o.readyState) === WebSocket.OPEN &&
      this.ws.send(JSON.stringify(r));
  }
  isConnected() {
    var r;
    return ((r = this.ws) == null ? void 0 : r.readyState) === WebSocket.OPEN;
  }
  setConnectionState(r) {
    var o;
    this.connectionState !== r &&
      ((this.connectionState = r),
      (o = this.onConnectionChange) == null || o.call(this, r));
  }
  scheduleReconnect() {
    var o;
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      (console.log("[WebSocket] Max reconnect attempts reached"),
        (o = this.onError) == null ||
          o.call(this, "Failed to reconnect after maximum attempts"));
      return;
    }
    const r = Math.min(
      this.config.reconnectBaseDelay * Math.pow(2, this.reconnectAttempts),
      this.config.reconnectMaxDelay
    );
    (console.log(
      `[WebSocket] Reconnecting in ${r}ms (attempt ${this.reconnectAttempts + 1})`
    ),
      (this.reconnectTimer = setTimeout(() => {
        (this.reconnectAttempts++,
          this.setConnectionState("connecting"),
          this.createConnection());
      }, r)));
  }
  clearReconnectTimer() {
    this.reconnectTimer &&
      (clearTimeout(this.reconnectTimer), (this.reconnectTimer = null));
  }
}
const rt = new yN(),
  fc = {
    connectionState: "disconnected",
    currentSessionId: null,
    messages: [],
    typingSessionId: null,
    lastError: null,
    lastEdgeCreated: null,
    lastEdgeDeleted: null,
  },
  hs = {
    MAX_MESSAGES: 1e3,
    CONNECTION_TIMEOUT_MS: 5e3,
    CONNECTION_CHECK_INTERVAL_MS: 100,
  },
  sm = () =>
    `${window.location.protocol === "https:" ? "wss:" : "ws:"}//localhost:3001`;
let vr = null;
function hc() {
  vr && (clearTimeout(vr), (vr = null));
}
const pc = Wc(
    (e, r) => (
      (rt.onConnectionChange = (o) => {
        e({ connectionState: o });
      }),
      (rt.onJoined = (o, i) => {
        e({ currentSessionId: o, messages: i, lastError: null });
      }),
      (rt.onLeft = () => {
        e({ currentSessionId: null, messages: [], typingSessionId: null });
      }),
      (rt.onMessage = (o) => {
        e((i) => {
          const l = [...i.messages, o];
          return l.length > hs.MAX_MESSAGES
            ? { messages: l.slice(-1e3) }
            : { messages: l };
        });
      }),
      (rt.onTyping = (o, i) => {
        e({ typingSessionId: i ? o : null });
      }),
      (rt.onError = (o) => {
        e({ lastError: o });
      }),
      (rt.onEdgeCreated = (o) => {
        e({ lastEdgeCreated: o });
      }),
      (rt.onEdgeDeleted = (o, i) => {
        e({ lastEdgeDeleted: { edgeId: o, remainingContext: i } });
      }),
      {
        ...fc,
        connect: (o) => {
          const i = o || sm();
          rt.connect(i);
        },
        disconnect: () => {
          (hc(), rt.disconnect(), e(fc));
        },
        joinSession: (o) => {
          const { connectionState: i } = r();
          if ((hc(), i !== "connected")) {
            const l = sm();
            rt.connect(l);
            let u = 0;
            const c = Math.floor(
                hs.CONNECTION_TIMEOUT_MS / hs.CONNECTION_CHECK_INTERVAL_MS
              ),
              f = () => {
                rt.getConnectionState() === "connected"
                  ? (rt.joinSession(o), (vr = null))
                  : u < c
                    ? (u++,
                      (vr = setTimeout(f, hs.CONNECTION_CHECK_INTERVAL_MS)))
                    : (console.error("[WebSocketStore] Connection timeout"),
                      e({ lastError: "Connection timeout" }),
                      (vr = null));
              };
            vr = setTimeout(f, hs.CONNECTION_CHECK_INTERVAL_MS);
          } else rt.joinSession(o);
        },
        leaveSession: () => {
          const { currentSessionId: o } = r();
          (o && rt.leaveSession(o),
            e({ currentSessionId: null, messages: [], typingSessionId: null }));
        },
        sendMessage: (o) => {
          const { currentSessionId: i, connectionState: l } = r();
          if (l !== "connected") {
            e({ lastError: "Not connected to server" });
            return;
          }
          if (!i) {
            e({ lastError: "Not in a session" });
            return;
          }
          rt.sendMessage(i, o);
        },
        setTyping: (o) => {
          const { currentSessionId: i, connectionState: l } = r();
          l !== "connected" || !i || rt.sendTyping(i, o);
        },
        clearError: () => {
          e({ lastError: null });
        },
        clearEdgeEvents: () => {
          e({ lastEdgeCreated: null, lastEdgeDeleted: null });
        },
        reset: () => {
          (hc(), rt.disconnect(), e(fc));
        },
      }
    )
  ),
  Eg = "cnthub-node-positions",
  kg = "cnthub-edges",
  Cg = "cnthub-connected-sessions",
  cd = "http://localhost:3048",
  vN = 180,
  xN = 70,
  wN = 260,
  SN = 140,
  zc = 20;
function im(e) {
  return e.type === "context"
    ? { width: wN, height: SN }
    : { width: vN, height: xN };
}
function Dl(e, r) {
  const o = im(e),
    i = im(r),
    l = { x: e.position.x + o.width / 2, y: e.position.y + o.height / 2 },
    u = { x: r.position.x + i.width / 2, y: r.position.y + i.height / 2 },
    c = (o.width + i.width) / 2 + zc,
    f = (o.height + i.height) / 2 + zc,
    h = Math.abs(l.x - u.x),
    p = Math.abs(l.y - u.y);
  return h < c && p < f;
}
function Ng(e, r) {
  const o = { ...e.position },
    i = r.filter((h) => h.id !== e.id),
    l = { ...e, position: o };
  if (!i.some((h) => Dl(l, h))) return o;
  const c = [
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
    ],
    f = zc + 20;
  for (let h = 1; h <= 10; h++)
    for (const p of c) {
      const x = { x: o.x + p.dx * f * h, y: o.y + p.dy * f * h };
      if (((l.position = x), !i.some((v) => Dl(l, v)))) return x;
    }
  return { x: o.x + f * 3, y: o.y };
}
function lm(e) {
  const r = [];
  let o = !1;
  for (const i of e) {
    const l = { ...i },
      u = Ng(l, [...r, l]);
    ((u.x !== l.position.x || u.y !== l.position.y) &&
      ((l.position = u), (o = !0)),
      r.push(l));
  }
  return { nodes: r, changed: o };
}
function am(e, r, o) {
  const l = o === "context" ? 180 : 100,
    u = o === "context" ? 280 : 220,
    c = o === "context" ? 500 : 50,
    f = 80,
    h = c + (e % 4) * u,
    p = f + Math.floor(e / 4) * l,
    x = { type: o, position: { x: h, y: p } };
  if (!r.some((w) => Dl(x, w))) return { x: h, y: p };
  const v = [
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
    ],
    S = o === "context" ? 100 : 60;
  for (let w = 1; w <= 15; w++)
    for (const b of v) {
      const N = { x: h + b.dx * S * w, y: p + b.dy * S * w };
      if (((x.position = N), !r.some((R) => Dl(x, R)) && N.x >= 0 && N.y >= 0))
        return N;
    }
  return { x: h, y: p + l * (e + 1) };
}
function um() {
  try {
    const e = localStorage.getItem(Eg);
    return e ? JSON.parse(e) : {};
  } catch {
    return {};
  }
}
function to(e) {
  try {
    localStorage.setItem(Eg, JSON.stringify(e));
  } catch {}
}
function EN() {
  try {
    const e = localStorage.getItem(kg);
    return e ? JSON.parse(e) : [];
  } catch {
    return [];
  }
}
function ps(e) {
  try {
    localStorage.setItem(kg, JSON.stringify(e));
  } catch {}
}
function kN() {
  try {
    const e = localStorage.getItem(Cg);
    return e ? JSON.parse(e) : [];
  } catch {
    return [];
  }
}
function gl(e) {
  try {
    localStorage.setItem(Cg, JSON.stringify(e));
  } catch {}
}
async function CN(e, r) {
  try {
    const o = await fetch(`${cd}/api/edges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceSessionId: e, targetClaudeSessionId: r }),
    });
    return o.ok
      ? await o.json()
      : (console.warn("[NodeEditor] Failed to create edge:", o.status), null);
  } catch (o) {
    return (console.warn("[NodeEditor] Error creating edge:", o), null);
  }
}
async function NN(e) {
  try {
    const r = await fetch(`${cd}/api/edges/${e}`, { method: "DELETE" });
    return r.ok || r.status === 404;
  } catch (r) {
    return (console.warn("[NodeEditor] Error deleting edge:", r), !1);
  }
}
async function _N(e) {
  try {
    const r = await fetch(`${cd}/api/edges/by-target/${e}`);
    return r.ok ? (await r.json()).edges || [] : [];
  } catch (r) {
    return (console.warn("[NodeEditor] Error loading edges:", r), []);
  }
}
function xs(e) {
  return e >= 1e6
    ? (e / 1e6).toFixed(1) + "M"
    : e >= 1e3
      ? (e / 1e3).toFixed(1) + "k"
      : e.toString();
}
const bN = {
    error_loop: "エラーの繰り返し",
    edit_loop: "編集ループ",
    test_failure_loop: "テスト失敗ループ",
    rollback: "ロールバック",
    other: "その他の問題",
  },
  jN = {
    high: "bg-red-500/20 text-red-400 border-red-500/50",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    low: "bg-gray-500/20 text-gray-400 border-gray-500/50",
  },
  IN = {
    feature: "F",
    bugfix: "B",
    refactor: "R",
    exploration: "E",
    other: "O",
  },
  yl = {
    feature: "機能追加",
    bugfix: "バグ修正",
    refactor: "リファクタ",
    exploration: "調査",
    other: "その他",
  };
function MN({ data: e }) {
  var c;
  const r = e.theme !== "light",
    o = r ? "text-white" : "text-[var(--text-primary)]",
    i = r
      ? { backgroundColor: "#1a1a19", borderColor: "#3a3a39", color: "#f5f5f1" }
      : {
          backgroundColor: "#ffffff",
          borderColor: "#e8e6dc",
          color: "#141413",
        },
    l = C.useCallback(
      (f) => {
        var h;
        (f.key === "Enter" || f.key === " ") &&
          (f.preventDefault(), (h = e.onClick) == null || h.call(e));
      },
      [e]
    ),
    u = e.issueType ? bN[e.issueType] || e.issueType : "問題あり";
  return y.jsxs("div", {
    role: "button",
    tabIndex: 0,
    onClick: e.onClick,
    onKeyDown: l,
    "aria-label": `Session: ${e.label}${e.projectName ? ` - Project: ${e.projectName}` : ""}${e.hasIssues ? ` - ${u}` : ""}`,
    style: i,
    className:
      "session-node group px-4 py-3 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-lg shadow-md w-[180px] h-[70px] relative transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)] " +
      (e.hasIssues ? "border-red-500/50 bg-red-500/10 " : "") +
      (e.isHovered
        ? "border-[var(--color-primary-400)] bg-[var(--color-primary-400)]/10 ring-2 ring-[var(--color-primary-400)]/50 scale-105"
        : e.hasIssues
          ? ""
          : "hover:bg-[var(--color-primary-400)]/10 hover:border-[var(--color-primary-400)] hover:shadow-lg"),
    children: [
      y.jsx(mo, {
        type: "source",
        position: Ne.Right,
        className: "w-3 h-3 bg-[var(--color-primary-500)]",
        "aria-hidden": "true",
      }),
      e.hasIssues &&
        y.jsx("div", {
          className:
            "absolute -top-2 -left-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center cursor-help",
          title: u,
          children: y.jsx("span", {
            role: "img",
            "aria-label": "問題あり",
            children: "🐛",
          }),
        }),
      (e.inputTokens !== void 0 || e.outputTokens !== void 0) &&
        y.jsxs("div", {
          className:
            "absolute -top-2 -right-2 bg-[var(--bg-elevated)] text-[var(--text-muted)] text-[10px] px-1.5 py-0.5 rounded-full border border-[var(--border-default)] whitespace-nowrap",
          "aria-label": `Input: ${e.inputTokens || 0}, Output: ${e.outputTokens || 0}`,
          children: [
            "in:",
            xs(e.inputTokens || 0),
            " / out:",
            xs(e.outputTokens || 0),
          ],
        }),
      y.jsx("div", {
        className: `text-sm font-semibold truncate ${o}`,
        children: e.label,
      }),
      y.jsxs("div", {
        className: "flex items-center gap-2 mt-1",
        children: [
          y.jsxs("div", {
            className: "flex items-center gap-2 min-w-0",
            children: [
              e.date &&
                y.jsx("span", {
                  className: "text-xs text-[var(--text-secondary)]",
                  children: e.date,
                }),
              e.projectName &&
                y.jsx("span", {
                  className:
                    "px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded text-[10px] text-[var(--text-primary)] truncate max-w-[70px]",
                  title: e.projectName,
                  children: e.projectName,
                }),
            ],
          }),
          y.jsxs("div", {
            className: "flex items-center gap-1 ml-auto shrink-0",
            children: [
              e.importance &&
                e.importance !== "medium" &&
                y.jsx("span", {
                  className: `w-4 h-4 rounded border text-[9px] font-bold flex items-center justify-center ${jN[e.importance] || ""}`,
                  title: `重要度: ${e.importance}`,
                  "aria-label": `重要度: ${e.importance}`,
                  children: e.importance === "high" ? "H" : "L",
                }),
              e.category &&
                y.jsx("span", {
                  className:
                    "w-4 h-4 rounded bg-[var(--bg-elevated)] text-[9px] font-semibold text-[var(--text-secondary)] flex items-center justify-center",
                  title: yl[e.category] || e.category,
                  "aria-label": yl[e.category] || e.category,
                  children:
                    IN[e.category] ||
                    ((c = yl[e.category]) == null ? void 0 : c[0]) ||
                    "O",
                }),
            ],
          }),
        ],
      }),
      (e.category || (e.importance && e.importance !== "medium")) &&
        y.jsx("div", {
          className:
            "absolute left-0 right-0 top-full mt-1 z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity",
          children: y.jsxs("div", {
            className:
              "px-2 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-primary)] shadow-lg flex items-center gap-2",
            children: [
              e.importance &&
                e.importance !== "medium" &&
                y.jsxs("span", {
                  className: "font-semibold",
                  children: ["重要度: ", e.importance === "high" ? "高" : "低"],
                }),
              e.category &&
                y.jsx("span", {
                  className: "text-[var(--text-secondary)]",
                  children: yl[e.category] || e.category,
                }),
            ],
          }),
        }),
    ],
  });
}
function PN({ data: e }) {
  var u, c, f;
  const r = C.useCallback(() => {
      var h;
      (h = e.onExport) == null || h.call(e);
    }, [e]),
    o = !!e.sessionId,
    i = e.mergeStatus === "merging",
    l = e.mergeStatus === "completed" && e.mergedSummary;
  return y.jsxs("div", {
    className: `px-6 py-4 text-white rounded-xl shadow-lg min-w-[240px] text-center cursor-pointer transition-colors relative ${i ? "bg-[var(--color-primary-400)] animate-pulse" : "bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-500)]"}`,
    onClick: r,
    children: [
      y.jsx(mo, {
        type: "target",
        position: Ne.Left,
        className: "w-3 h-3 bg-[var(--color-cream-100)]",
      }),
      (e.inputTokens !== void 0 || e.outputTokens !== void 0) &&
        y.jsxs("div", {
          className:
            "absolute -top-2 -right-2 bg-white text-[var(--color-primary-600)] text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[var(--color-primary-600)] whitespace-nowrap",
          children: [
            "in:",
            xs(e.inputTokens || 0),
            " / out:",
            xs(e.outputTokens || 0),
          ],
        }),
      y.jsx("div", {
        className: "text-sm font-bold truncate max-w-[220px]",
        children: o ? e.sessionName || e.sessionId : "セッション未接続",
      }),
      o &&
        y.jsxs("div", {
          className: "flex items-center gap-2 mt-1",
          children: [
            e.projectName &&
              y.jsx("span", {
                className:
                  "px-1.5 py-0.5 bg-white/20 rounded text-xs truncate max-w-[100px]",
                title: e.projectName,
                children: e.projectName,
              }),
            e.sessionId &&
              y.jsx("span", {
                className: "text-xs opacity-60 font-mono truncate",
                children: e.sessionId,
              }),
          ],
        }),
      y.jsxs("div", {
        className: "text-xs opacity-90 mt-3 flex justify-center gap-3",
        children: [
          y.jsxs("span", {
            className: "bg-white/20 px-2 py-0.5 rounded",
            children: [e.observationCount, " obs"],
          }),
          y.jsxs("span", {
            className: "bg-white/20 px-2 py-0.5 rounded",
            children: ["+", e.connectedCount, " merged"],
          }),
        ],
      }),
      i &&
        y.jsx("div", {
          className: "text-xs mt-2 bg-white/30 px-2 py-1 rounded",
          children: "🔄 要約を生成中...",
        }),
      l &&
        y.jsxs("div", {
          className: "text-xs mt-2 bg-white/20 px-2 py-1 rounded text-left",
          children: [
            y.jsx("div", {
              className: "font-bold mb-1",
              children: "📝 統合要約:",
            }),
            y.jsx("div", {
              className: "line-clamp-2 opacity-90",
              children: (u = e.mergedSummary) == null ? void 0 : u.shortSummary,
            }),
            y.jsxs("div", {
              className: "opacity-60 mt-1",
              children: [
                (c = e.mergedSummary) == null ? void 0 : c.sessionCount,
                "セッション →",
                " ",
                xs(
                  ((f = e.mergedSummary) == null ? void 0 : f.mergedTokens) || 0
                ),
                " tokens",
              ],
            }),
          ],
        }),
      e.mergeStatus === "error" &&
        y.jsx("div", {
          className: "text-xs mt-2 bg-red-500/30 px-2 py-1 rounded",
          children: "⚠️ マージ失敗",
        }),
      y.jsx("div", {
        className: "text-xs opacity-60 mt-2",
        children: "クリックで Export",
      }),
    ],
  });
}
const RN = { session: MN, context: PN };
function TN({
  sessions: e = [],
  projects: r = [],
  currentSessionsData: o = [],
  theme: i = "dark",
  onGetSession: l,
  onExportSession: u,
  onDeleteRequest: c,
  pendingDelete: f,
  onDeleteComplete: h,
  onMerge: p,
  mergeStatus: x = "idle",
  mergedSummary: g,
  onSessionDetail: v,
  hoveredSessionId: S,
}) {
  const w = C.useRef(um()),
    b = C.useRef(EN()),
    N = C.useRef(kN()),
    [_, R] = C.useState(N.current),
    [E, j] = C.useState({}),
    O = C.useRef(new Set()),
    [A, P, H] = OC([]),
    [V, re, Y] = FC(b.current),
    U = C.useMemo(() => new Map(r.map((Q) => [Q.projectId, Q.name])), [r]),
    te = C.useCallback(
      (Q) => {
        (H(Q),
          Q.filter(
            (J) => J.type === "position" && "position" in J && J.position
          ).length > 0 &&
            requestAnimationFrame(() => {
              P((J) => {
                const ie = {};
                return (
                  J.forEach((ue) => {
                    ie[ue.id] = ue.position;
                  }),
                  to(ie),
                  J
                );
              });
            }));
      },
      [H, P]
    ),
    L = C.useCallback(
      (Q) => {
        (Y(Q),
          requestAnimationFrame(() => {
            re((ne) => (ps(ne), ne));
          }));
      },
      [Y, re]
    ),
    K = C.useCallback(
      (Q) => () => {
        (console.log("[Viewer] Export session:", Q), u == null || u(Q));
      },
      [u]
    );
  (C.useEffect(() => {
    P((Q) => {
      const ne = w.current,
        J = new Set(
          Q.filter((Se) => Se.id.startsWith("context-")).map((Se) => Se.id)
        ),
        ie = [];
      let ue = [...Q],
        se = 0;
      o.forEach((Se) => {
        const Ie = Se.session;
        if (!Ie) return;
        const me = `context-${Ie.sessionId}`,
          _e = ne[me],
          Re = _e || am(se, ue, "context");
        if (!J.has(me)) {
          const Je = {
            id: me,
            type: "context",
            position: Re,
            data: {
              label: "進行中セッション",
              sessionId: Ie.sessionId,
              sessionName: Ie.name,
              status: Ie.status,
              tokenCount: Se.tokenCount,
              inputTokens: Ie.inputTokens ?? Se.inputTokens,
              outputTokens: Ie.outputTokens ?? Se.outputTokens,
              connectedCount: _.length,
              observationCount: Se.observationCount,
              projectName: Ie.projectId ? U.get(Ie.projectId) : void 0,
              onExport: K(Ie.sessionId),
              mergeStatus: x,
              mergedSummary: g,
            },
          };
          (ie.push(Je), (ue = [...ue, Je]), se++);
        }
      });
      const ae = new Set(
          o
            .filter((Se) => Se.session)
            .map((Se) => `context-${Se.session.sessionId}`)
        ),
        ge = [
          ...Q.filter((Se) =>
            Se.id.startsWith("context-") ? ae.has(Se.id) : !0
          ).map((Se) => {
            if (Se.id.startsWith("context-")) {
              const Ie = Se.id.replace("context-", ""),
                me = o.find((_e) => {
                  var Re;
                  return (
                    ((Re = _e.session) == null ? void 0 : Re.sessionId) === Ie
                  );
                });
              if (me != null && me.session)
                return {
                  ...Se,
                  data: {
                    ...Se.data,
                    sessionId: me.session.sessionId,
                    sessionName: me.session.name,
                    status: me.session.status,
                    tokenCount: me.tokenCount,
                    inputTokens: me.session.inputTokens ?? me.inputTokens,
                    outputTokens: me.session.outputTokens ?? me.outputTokens,
                    connectedCount: _.length,
                    observationCount: me.observationCount,
                    projectName: me.session.projectId
                      ? U.get(me.session.projectId)
                      : void 0,
                    onExport: K(me.session.sessionId),
                    mergeStatus: x,
                    mergedSummary: g,
                  },
                };
            }
            return Se;
          }),
          ...ie,
        ],
        Ce = lm(ge),
        ke = Ce.changed ? Ce.nodes : ge;
      if (ie.length > 0) {
        const Se = {};
        (ke.forEach((Ie) => {
          Se[Ie.id] = Ie.position;
        }),
          to(Se));
      }
      return ke;
    });
  }, [o, _, K, P, x, g, U]),
    C.useEffect(() => {
      P((Q) => {
        const ne = new Set(Q.map((me) => me.id)),
          J = [],
          ie = w.current,
          ue = new Map(e.map((me) => ["session-" + me.sessionId, me])),
          se = Q.map((me) => {
            if (me.type === "session") {
              const _e = ue.get(me.id);
              if (_e) {
                const Re = _e.projectId ? U.get(_e.projectId) : void 0;
                if (
                  me.data.label !== _e.name ||
                  me.data.projectName !== Re ||
                  me.data.inputTokens !== _e.inputTokens ||
                  me.data.outputTokens !== _e.outputTokens ||
                  me.data.hasIssues !== _e.hasIssues ||
                  me.data.importance !== _e.importance ||
                  me.data.category !== _e.category ||
                  me.data.theme !== i
                )
                  return {
                    ...me,
                    data: {
                      ...me.data,
                      label: _e.name,
                      status: _e.status,
                      date: new Date(_e.updatedAt).toLocaleDateString("ja-JP"),
                      tokenCount: _e.tokenCount,
                      inputTokens: _e.inputTokens,
                      outputTokens: _e.outputTokens,
                      projectName: Re,
                      hasIssues: _e.hasIssues,
                      issueType: _e.issueType,
                      importance: _e.importance,
                      category: _e.category,
                      theme: i,
                    },
                  };
              }
            }
            return me;
          });
        let ae = [...se],
          de = 0;
        e.forEach((me) => {
          const _e = "session-" + me.sessionId;
          if (!ne.has(_e)) {
            const Re = ie[_e],
              Je = Re || am(de, ae, "session"),
              jt = me.projectId ? U.get(me.projectId) : void 0,
              sn = {
                id: _e,
                type: "session",
                position: Je,
                data: {
                  label: me.name,
                  sessionId: me.sessionId,
                  status: me.status,
                  date: new Date(me.updatedAt).toLocaleDateString("ja-JP"),
                  tokenCount: me.tokenCount,
                  inputTokens: me.inputTokens,
                  outputTokens: me.outputTokens,
                  projectName: jt,
                  hasIssues: me.hasIssues,
                  issueType: me.issueType,
                  importance: me.importance,
                  category: me.category,
                  theme: i,
                  onClick: () => (v == null ? void 0 : v(me.sessionId)),
                },
              };
            (J.push(sn), (ae = [...ae, sn]), de++);
          }
        });
        const ge = new Set(e.map((me) => "session-" + me.sessionId)),
          ke = [
            ...se.filter((me) => me.id.startsWith("context-") || ge.has(me.id)),
            ...J,
          ],
          Se = lm(ke),
          Ie = Se.changed ? Se.nodes : ke;
        if (J.length > 0) {
          const me = {};
          (Ie.forEach((_e) => {
            me[_e.id] = _e.position;
          }),
            to(me));
        }
        return Ie;
      });
    }, [e, U, P, i, v]),
    C.useEffect(() => {
      P((Q) =>
        Q.map((ne) => {
          if (ne.type === "session") {
            const ie = ne.data.sessionId === S;
            if (ne.data.isHovered !== ie)
              return { ...ne, data: { ...ne.data, isHovered: ie } };
          }
          return ne;
        })
      );
    }, [S, P]),
    C.useEffect(() => {
      (async () => {
        for (const ne of o) {
          const J = ne.session;
          if (!J) continue;
          const ie = J.sessionId;
          if (O.current.has(ie)) continue;
          O.current.add(ie);
          const ue = await _N(ie);
          if (ue.length === 0) continue;
          const se = [],
            ae = {},
            de = [];
          for (const ge of ue) {
            const Ce = `reactflow__edge-session-${ge.sourceSessionId}-context-${ie}`;
            (se.push({
              id: Ce,
              source: `session-${ge.sourceSessionId}`,
              target: `context-${ie}`,
            }),
              (ae[Ce] = ge.edgeId),
              de.push(ge.sourceSessionId));
          }
          (re((ge) => {
            const Ce = new Set(ge.map((Ie) => Ie.id)),
              ke = se.filter((Ie) => !Ce.has(Ie.id)),
              Se = [...ge, ...ke];
            return (ps(Se), Se);
          }),
            j((ge) => ({ ...ge, ...ae })),
            R((ge) => {
              const Ce = [...new Set([...ge, ...de])];
              return (gl(Ce), Ce);
            }));
        }
      })();
    }, [o, re]));
  const B = pc((Q) => Q.lastEdgeCreated),
    X = pc((Q) => Q.clearEdgeEvents);
  C.useEffect(() => {
    if (!B) return;
    const { edgeId: Q, sourceSessionId: ne, targetClaudeSessionId: J } = B,
      ie = `reactflow__edge-session-${ne}-context-${J}`;
    (re((ue) => {
      if (ue.some((de) => de.id === ie)) return ue;
      const se = { id: ie, source: `session-${ne}`, target: `context-${J}` },
        ae = [...ue, se];
      return (ps(ae), ae);
    }),
      j((ue) => ({ ...ue, [ie]: Q })),
      R((ue) => {
        if (ue.includes(ne)) return ue;
        const se = [...ue, ne];
        return (gl(se), se);
      }),
      P((ue) =>
        ue.map((se) => {
          if (se.id === `context-${J}`) {
            const ae =
              typeof se.data.connectedCount == "number"
                ? se.data.connectedCount
                : 0;
            return { ...se, data: { ...se.data, connectedCount: ae + 1 } };
          }
          return se;
        })
      ),
      X(),
      console.log(`[NodeEditor] Edge created via WebSocket: ${ne} -> ${J}`));
  }, [B, re, P, X]);
  const z = pc((Q) => Q.lastEdgeDeleted),
    [$, W] = C.useState(!1);
  C.useEffect(() => {
    if (!z) return;
    const { edgeId: Q, remainingContext: ne } = z;
    (ne &&
      (W(!0),
      console.log(
        `[NodeEditor] Edge deleted via WebSocket: ${Q}. Context pending for /clear.`
      )),
      X());
  }, [z, X]);
  const M = C.useCallback(
      async (Q) => {
        if (
          !(!Q.source || !Q.target) &&
          Q.source.startsWith("session-") &&
          Q.target.startsWith("context-")
        ) {
          const ne = Q.source.replace("session-", ""),
            J = Q.target.replace("context-", "");
          if (_.includes(ne)) return;
          const ie = await CN(ne, J);
          re((se) => {
            var de;
            const ae = j0(Q, se);
            if ((ps(ae), ie)) {
              const ge =
                (de = ae.find(
                  (Ce) => Ce.source === Q.source && Ce.target === Q.target
                )) == null
                  ? void 0
                  : de.id;
              ge && j((Ce) => ({ ...Ce, [ge]: ie.edgeId }));
            }
            return ae;
          });
          const ue = [..._, ne];
          (R(ue),
            gl(ue),
            P((se) =>
              se.map((ae) =>
                ae.id.startsWith("context-")
                  ? { ...ae, data: { ...ae.data, connectedCount: ue.length } }
                  : ae
              )
            ),
            l == null || l(ne),
            ue.length >= 2 && p && p(ue));
        }
      },
      [_, re, P, l, p]
    ),
    I = C.useCallback(
      (Q) => {
        const ne = V.find((ue) => ue.id === Q);
        if (!ne) return;
        const J = ne.source.replace("session-", ""),
          ie = e.find((ue) => ue.sessionId === J);
        c == null ||
          c({
            type: "edge",
            id: Q,
            name: (ie == null ? void 0 : ie.name) || J,
          });
      },
      [V, e, c]
    ),
    oe = C.useCallback(
      (Q, ne) => {
        I(ne.id);
      },
      [I]
    ),
    le = C.useCallback(
      async (Q) => {
        const ne = Q.filter((ie) => ie.source.startsWith("session-")).map(
          (ie) => ie.source.replace("session-", "")
        );
        for (const ie of Q) {
          const ue = E[ie.id];
          ue &&
            (await NN(ue),
            j((se) => {
              const ae = { ...se };
              return (delete ae[ie.id], ae);
            }));
        }
        const J = _.filter((ie) => !ne.includes(ie));
        (R(J),
          gl(J),
          re((ie) => (ps(ie), ie)),
          P((ie) =>
            ie.map((ue) =>
              ue.id.startsWith("context-")
                ? { ...ue, data: { ...ue.data, connectedCount: J.length } }
                : ue
            )
          ));
      },
      [_, P, re, E]
    ),
    Z = C.useCallback(
      (Q, ne) => {
        const J = A.map((ue) =>
            ue.id === ne.id ? { ...ue, position: ne.position } : ue
          ),
          ie = Ng(ne, J);
        if (ie.x !== ne.position.x || ie.y !== ne.position.y)
          P((ue) => {
            const se = ue.map((de) =>
                de.id === ne.id ? { ...de, position: ie } : de
              ),
              ae = {};
            return (
              se.forEach((de) => {
                ae[de.id] = de.position;
              }),
              to(ae),
              se
            );
          });
        else {
          const ue = {};
          (J.forEach((se) => {
            ue[se.id] = se.position;
          }),
            to(ue));
        }
      },
      [A, P]
    );
  return (
    C.useEffect(() => {
      if (f) {
        if (f.type === "edge") {
          const Q = V.find((ne) => ne.id === f.id);
          Q && (le([Q]), re((ne) => ne.filter((J) => J.id !== f.id)));
        } else if (f.type === "node" && !f.id.startsWith("context-")) {
          const Q = V.filter((J) => J.source === f.id || J.target === f.id);
          (Q.length > 0 &&
            (le(Q),
            re((J) =>
              J.filter((ie) => ie.source !== f.id && ie.target !== f.id)
            )),
            P((J) => J.filter((ie) => ie.id !== f.id)));
          const ne = um();
          (delete ne[f.id], to(ne));
        }
        h == null || h();
      }
    }, [f, V, le, re, P, h]),
    y.jsxs("div", {
      className: `w-full h-full bg-[var(--bg-base)] relative ${i === "dark" ? "react-flow-theme-dark" : ""}`,
      children: [
        y.jsxs(DC, {
          nodes: A,
          edges: V,
          onNodesChange: te,
          onEdgesChange: L,
          onConnect: M,
          onEdgesDelete: le,
          onEdgeClick: oe,
          onNodeDragStop: Z,
          nodeTypes: RN,
          fitView: !0,
          proOptions: { hideAttribution: !0 },
          className: "bg-[var(--bg-base)]",
          children: [
            y.jsx(qC, {
              className:
                "bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg",
            }),
            y.jsx(cN, {
              className:
                "bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg",
              nodeColor: "#d97757",
              maskColor: "rgba(15, 15, 14, 0.8)",
            }),
          ],
        }),
        $ &&
          y.jsx("div", {
            className:
              "absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50",
            children: y.jsxs("div", {
              className:
                "bg-yellow-500/90 text-black px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md",
              children: [
                y.jsx("span", { className: "text-xl", children: "⚠️" }),
                y.jsxs("div", {
                  className: "flex-1",
                  children: [
                    y.jsx("div", {
                      className: "font-semibold",
                      children: "コンテキストが変更されました",
                    }),
                    y.jsxs("div", {
                      className: "text-sm opacity-80",
                      children: [
                        "Claude Code で",
                        " ",
                        y.jsx("code", {
                          className: "bg-black/20 px-1 rounded",
                          children: "/clear",
                        }),
                        " ",
                        "を実行してください。残りのセッションは自動的に復元されます。",
                      ],
                    }),
                  ],
                }),
                y.jsx("button", {
                  onClick: () => W(!1),
                  className: "text-black/60 hover:text-black transition-colors",
                  "aria-label": "通知を閉じる",
                  children: "✕",
                }),
              ],
            }),
          }),
      ],
    })
  );
}
const LN = Wc((e) => ({
    skills: [],
    hooks: [],
    mcpServers: [],
    rules: [],
    loading: !1,
    error: null,
    lastFetched: null,
    fetchSystemContext: async (r) => {
      e({ loading: !0, error: null });
      try {
        const o = new URLSearchParams();
        r && o.set("projectPath", r);
        const i = `/api/system-context${o.toString() ? `?${o}` : ""}`,
          l = await fetch(i);
        if (!l.ok) {
          const c = await l.json();
          throw new Error(c.error || "System Context の取得に失敗しました");
        }
        const u = await l.json();
        e({
          skills: u.skills,
          hooks: u.hooks,
          mcpServers: u.mcpServers,
          rules: u.rules,
          loading: !1,
          lastFetched: new Date(),
        });
      } catch (o) {
        const i =
          o instanceof Error
            ? o.message
            : "System Context の取得に失敗しました";
        (console.error("[SystemContextStore] Failed to fetch:", o),
          e({ error: i, loading: !1 }));
      }
    },
    fetchSkills: async (r) => {
      e({ loading: !0, error: null });
      try {
        const o = new URLSearchParams();
        r && o.set("projectPath", r);
        const i = `/api/system-context/skills${o.toString() ? `?${o}` : ""}`,
          l = await fetch(i);
        if (!l.ok) throw new Error("Skills の取得に失敗しました");
        const u = await l.json();
        e({ skills: u.skills, loading: !1 });
      } catch (o) {
        const i =
          o instanceof Error ? o.message : "Skills の取得に失敗しました";
        e({ error: i, loading: !1 });
      }
    },
    fetchHooks: async (r) => {
      e({ loading: !0, error: null });
      try {
        const o = new URLSearchParams();
        r && o.set("projectPath", r);
        const i = `/api/system-context/hooks${o.toString() ? `?${o}` : ""}`,
          l = await fetch(i);
        if (!l.ok) throw new Error("Hooks の取得に失敗しました");
        const u = await l.json();
        e({ hooks: u.hooks, loading: !1 });
      } catch (o) {
        const i = o instanceof Error ? o.message : "Hooks の取得に失敗しました";
        e({ error: i, loading: !1 });
      }
    },
    fetchMcpServers: async (r) => {
      e({ loading: !0, error: null });
      try {
        const o = new URLSearchParams();
        r && o.set("projectPath", r);
        const i = `/api/system-context/mcp${o.toString() ? `?${o}` : ""}`,
          l = await fetch(i);
        if (!l.ok) throw new Error("MCP Servers の取得に失敗しました");
        const u = await l.json();
        e({ mcpServers: u.mcpServers, loading: !1 });
      } catch (o) {
        const i =
          o instanceof Error ? o.message : "MCP Servers の取得に失敗しました";
        e({ error: i, loading: !1 });
      }
    },
    fetchRules: async (r) => {
      e({ loading: !0, error: null });
      try {
        const o = new URLSearchParams();
        r && o.set("projectPath", r);
        const i = `/api/system-context/rules${o.toString() ? `?${o}` : ""}`,
          l = await fetch(i);
        if (!l.ok) throw new Error("Rules の取得に失敗しました");
        const u = await l.json();
        e({ rules: u.rules, loading: !1 });
      } catch (o) {
        const i = o instanceof Error ? o.message : "Rules の取得に失敗しました";
        e({ error: i, loading: !1 });
      }
    },
    reset: () => {
      e({
        skills: [],
        hooks: [],
        mcpServers: [],
        rules: [],
        loading: !1,
        error: null,
        lastFetched: null,
      });
    },
  })),
  zN = {
    global: "bg-blue-500/20 text-blue-400",
    project: "bg-green-500/20 text-green-400",
    plugin: "bg-purple-500/20 text-purple-400",
  },
  $N = { skills: n1, hooks: r1, mcp: o1, rules: s1 },
  AN = {
    skills: "bg-[var(--color-primary-500)]",
    hooks: "bg-amber-500",
    mcp: "bg-cyan-500",
    rules: "bg-emerald-500",
  };
function DN({ onOptimize: e }) {
  var $, W, M;
  const { projects: r, fetchProjects: o } = Uc(),
    {
      skills: i,
      hooks: l,
      mcpServers: u,
      rules: c,
      loading: f,
      fetchSystemContext: h,
    } = LN(),
    [p, x] = C.useState("skills"),
    [g, v] = C.useState(null),
    [S, w] = C.useState(null),
    [b, N] = C.useState(new Set()),
    [_, R] = C.useState(""),
    [E, j] = C.useState(!1),
    [O, A] = C.useState(!1),
    [P, H] = C.useState(!1),
    [V, re] = C.useState(null);
  (C.useEffect(() => {
    o();
  }, [o]),
    C.useEffect(() => {
      const I = r.find((oe) => oe.projectId === g);
      h(I == null ? void 0 : I.path);
    }, [g, r, h]),
    C.useMemo(() => {
      var I;
      if (g)
        return (I = r.find((oe) => oe.projectId === g)) == null
          ? void 0
          : I.path;
    }, [g, r]));
  const Y = C.useMemo(() => {
      var I;
      if (S)
        return (I = r.find((oe) => oe.projectId === S)) == null
          ? void 0
          : I.path;
    }, [S, r]),
    U = C.useMemo(() => {
      switch (p) {
        case "skills":
          return i;
        case "hooks":
          return l;
        case "mcp":
          return u;
        case "rules":
          return c;
        default:
          return [];
      }
    }, [p, i, l, u, c]),
    te = C.useMemo(() => {
      if (!_) return U;
      const I = _.toLowerCase();
      return U.filter((oe) => {
        const le = "name" in oe ? oe.name : "event" in oe ? oe.event : "",
          Z = "description" in oe ? oe.description : "";
        return (
          le.toLowerCase().includes(I) ||
          (Z == null ? void 0 : Z.toLowerCase().includes(I))
        );
      });
    }, [U, _]),
    L = C.useCallback(
      (I) =>
        "name" in I && "path" in I
          ? `${I.source}:${I.name}`
          : "event" in I
            ? `${I.source}:${I.event}:${I.command}`
            : `${I.source}:${JSON.stringify(I)}`,
      []
    ),
    K = C.useCallback(
      (I) => ("name" in I ? I.name : "event" in I ? I.event : "Unknown"),
      []
    ),
    B = C.useCallback(
      (I) => {
        const oe = L(I);
        N((le) => {
          const Z = new Set(le);
          return (Z.has(oe) ? Z.delete(oe) : Z.add(oe), Z);
        });
      },
      [L]
    ),
    X = C.useCallback(() => {
      b.size === te.length ? N(new Set()) : N(new Set(te.map(L)));
    }, [te, b.size, L]),
    z = C.useCallback(async () => {
      if (!(!Y || b.size === 0)) {
        (H(!0), re(null));
        try {
          const I = te
              .filter((Z) => b.has(L(Z)))
              .filter((Z) => "path" in Z)
              .map((Z) => ({ type: p, sourcePath: Z.path, name: K(Z) })),
            oe = await fetch("/api/system-context/copy", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items: I, targetProjectPath: Y }),
            });
          if (!oe.ok) {
            const Z = await oe.json();
            throw new Error(Z.error || "コピーに失敗しました");
          }
          const le = await oe.json();
          (re({ success: !0, message: `${le.copied}件をコピーしました` }),
            N(new Set()));
        } catch (I) {
          re({
            success: !1,
            message: I instanceof Error ? I.message : "コピーに失敗しました",
          });
        } finally {
          H(!1);
        }
      }
    }, [Y, b, te, p, L, K]);
  return (
    C.useEffect(() => {
      N(new Set());
    }, [p]),
    y.jsxs("div", {
      className: "h-full flex flex-col bg-[var(--bg-base)]",
      children: [
        y.jsxs("div", {
          className:
            "flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]",
          children: [
            ["skills", "hooks", "mcp", "rules"].map((I) => {
              const oe = $N[I],
                le =
                  I === "skills"
                    ? i.length
                    : I === "hooks"
                      ? l.length
                      : I === "mcp"
                        ? u.length
                        : c.length;
              return y.jsxs(
                "button",
                {
                  onClick: () => x(I),
                  className: `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${p === I ? `${AN[I]} text-white` : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"}`,
                  children: [
                    y.jsx(oe, { className: "w-4 h-4" }),
                    y.jsx("span", { className: "capitalize", children: I }),
                    y.jsx("span", {
                      className: `px-1.5 py-0.5 rounded text-xs ${p === I ? "bg-white/20" : "bg-[var(--bg-elevated)]"}`,
                      children: le,
                    }),
                  ],
                },
                I
              );
            }),
            y.jsx("div", { className: "flex-1" }),
            e &&
              y.jsx("button", {
                onClick: () => e(p, Array.from(b)),
                disabled: b.size === 0,
                className:
                  "px-3 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-400)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                children: "最適化",
              }),
          ],
        }),
        y.jsxs("div", {
          className: "flex-1 flex overflow-hidden",
          children: [
            y.jsxs("div", {
              className:
                "w-1/2 flex flex-col border-r border-[var(--border-subtle)]",
              children: [
                y.jsxs("div", {
                  className:
                    "p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]",
                  children: [
                    y.jsxs("div", {
                      className: "relative",
                      children: [
                        y.jsxs("button", {
                          onClick: () => j(!E),
                          className:
                            "w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors",
                          children: [
                            y.jsxs("div", {
                              className: "flex items-center gap-2",
                              children: [
                                y.jsx(wl, {
                                  className: "w-4 h-4 text-[var(--text-muted)]",
                                }),
                                y.jsx("span", {
                                  className:
                                    "text-sm text-[var(--text-primary)]",
                                  children: g
                                    ? ($ = r.find((I) => I.projectId === g)) ==
                                      null
                                      ? void 0
                                      : $.name
                                    : "グローバル設定",
                                }),
                              ],
                            }),
                            y.jsx(xc, {
                              className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${E ? "rotate-180" : ""}`,
                            }),
                          ],
                        }),
                        E &&
                          y.jsxs("div", {
                            className:
                              "absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto",
                            children: [
                              y.jsx("button", {
                                onClick: () => {
                                  (v(null), j(!1));
                                },
                                className: `w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${g ? "text-[var(--text-primary)]" : "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"}`,
                                children: "グローバル設定",
                              }),
                              r.map((I) =>
                                y.jsx(
                                  "button",
                                  {
                                    onClick: () => {
                                      (v(I.projectId), j(!1));
                                    },
                                    className: `w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${g === I.projectId ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]" : "text-[var(--text-primary)]"}`,
                                    children: I.name,
                                  },
                                  I.projectId
                                )
                              ),
                            ],
                          }),
                      ],
                    }),
                    y.jsxs("div", {
                      className: "mt-2 relative",
                      children: [
                        y.jsx(Qx, {
                          className:
                            "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]",
                        }),
                        y.jsx("input", {
                          type: "text",
                          value: _,
                          onChange: (I) => R(I.target.value),
                          placeholder: "検索...",
                          className:
                            "w-full pl-9 pr-3 py-2 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]",
                        }),
                      ],
                    }),
                  ],
                }),
                y.jsx("div", {
                  className: "flex-1 overflow-y-auto p-2",
                  children: f
                    ? y.jsx("div", {
                        className: "space-y-2 p-2",
                        children: [1, 2, 3].map((I) =>
                          y.jsx(
                            "div",
                            {
                              className:
                                "h-16 bg-[var(--bg-elevated)] rounded-lg animate-pulse",
                            },
                            I
                          )
                        ),
                      })
                    : te.length === 0
                      ? y.jsx("div", {
                          className: "p-4 text-center text-[var(--text-muted)]",
                          children: _
                            ? "検索結果がありません"
                            : "アイテムがありません",
                        })
                      : y.jsx("div", {
                          className: "space-y-1",
                          children: te.map((I) => {
                            const oe = L(I),
                              le = b.has(oe),
                              Z = K(I),
                              Q = I.source,
                              ne = "description" in I ? I.description : void 0;
                            return y.jsxs(
                              "div",
                              {
                                onClick: () => B(I),
                                className: `p-3 rounded-lg cursor-pointer transition-colors ${le ? "bg-[var(--color-primary-500)]/20 border border-[var(--color-primary-500)]" : "bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] border border-transparent"}`,
                                children: [
                                  y.jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      y.jsx("div", {
                                        className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${le ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]" : "border-[var(--border-default)]"}`,
                                        children:
                                          le &&
                                          y.jsx(Es, {
                                            className: "w-3 h-3 text-white",
                                          }),
                                      }),
                                      y.jsx("span", {
                                        className:
                                          "flex-1 text-sm font-medium text-[var(--text-primary)] truncate",
                                        children: Z,
                                      }),
                                      y.jsx("span", {
                                        className: `px-1.5 py-0.5 rounded text-xs ${zN[Q]}`,
                                        children: Q[0].toUpperCase(),
                                      }),
                                    ],
                                  }),
                                  ne &&
                                    y.jsx("div", {
                                      className:
                                        "mt-1 ml-7 text-xs text-[var(--text-muted)] line-clamp-2",
                                      children: ne,
                                    }),
                                ],
                              },
                              oe
                            );
                          }),
                        }),
                }),
                y.jsxs("div", {
                  className:
                    "p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-2",
                  children: [
                    y.jsx("button", {
                      onClick: X,
                      className:
                        "px-3 py-1.5 rounded text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors",
                      children: b.size === te.length ? "全解除" : "全選択",
                    }),
                    y.jsxs("span", {
                      className: "text-sm text-[var(--text-muted)]",
                      children: [b.size, "件選択中"],
                    }),
                  ],
                }),
              ],
            }),
            y.jsxs("div", {
              className: "w-1/2 flex flex-col",
              children: [
                y.jsx("div", {
                  className:
                    "p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]",
                  children: y.jsxs("div", {
                    className: "relative",
                    children: [
                      y.jsxs("button", {
                        onClick: () => A(!O),
                        className:
                          "w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors",
                        children: [
                          y.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              y.jsx(wl, {
                                className: "w-4 h-4 text-[var(--text-muted)]",
                              }),
                              y.jsx("span", {
                                className: "text-sm text-[var(--text-primary)]",
                                children: S
                                  ? (W = r.find((I) => I.projectId === S)) ==
                                    null
                                    ? void 0
                                    : W.name
                                  : "コピー先を選択...",
                              }),
                            ],
                          }),
                          y.jsx(xc, {
                            className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${O ? "rotate-180" : ""}`,
                          }),
                        ],
                      }),
                      O &&
                        y.jsx("div", {
                          className:
                            "absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto",
                          children: r
                            .filter((I) => I.projectId !== g)
                            .map((I) =>
                              y.jsxs(
                                "button",
                                {
                                  onClick: () => {
                                    (w(I.projectId), A(!1));
                                  },
                                  className: `w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${S === I.projectId ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]" : "text-[var(--text-primary)]"}`,
                                  children: [
                                    y.jsx("div", { children: I.name }),
                                    y.jsx("div", {
                                      className:
                                        "text-xs text-[var(--text-muted)] truncate",
                                      children: I.path,
                                    }),
                                  ],
                                },
                                I.projectId
                              )
                            ),
                        }),
                    ],
                  }),
                }),
                y.jsx("div", {
                  className:
                    "flex-1 flex flex-col items-center justify-center p-8 text-center",
                  children: S
                    ? b.size === 0
                      ? y.jsxs("div", {
                          className: "text-[var(--text-muted)]",
                          children: [
                            y.jsx(Es, {
                              className: "w-16 h-16 mx-auto mb-4 opacity-30",
                            }),
                            y.jsx("p", {
                              children:
                                "左のリストからコピーするアイテムを選択してください",
                            }),
                          ],
                        })
                      : y.jsxs("div", {
                          className: "w-full max-w-sm",
                          children: [
                            y.jsxs("div", {
                              className:
                                "text-lg font-medium text-[var(--text-primary)] mb-4",
                              children: [
                                b.size,
                                "件を",
                                y.jsx("br", {}),
                                y.jsx("span", {
                                  className: "text-[var(--color-primary-400)]",
                                  children:
                                    (M = r.find((I) => I.projectId === S)) ==
                                    null
                                      ? void 0
                                      : M.name,
                                }),
                                y.jsx("br", {}),
                                "にコピー",
                              ],
                            }),
                            y.jsx("button", {
                              onClick: z,
                              disabled: P,
                              className:
                                "w-full px-6 py-3 rounded-lg text-sm font-medium bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-400)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                              children: P ? "コピー中..." : "コピーを実行",
                            }),
                            V &&
                              y.jsx("div", {
                                className: `mt-4 p-3 rounded-lg text-sm ${V.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`,
                                children: V.message,
                              }),
                          ],
                        })
                    : y.jsxs("div", {
                        className: "text-[var(--text-muted)]",
                        children: [
                          y.jsx(wl, {
                            className: "w-16 h-16 mx-auto mb-4 opacity-30",
                          }),
                          y.jsx("p", {
                            children: "コピー先プロジェクトを選択してください",
                          }),
                        ],
                      }),
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
function mc(e) {
  return e >= 1e3 ? (e / 1e3).toFixed(1) + "k" : e.toString();
}
function ON(e) {
  switch (e) {
    case "feature":
      return "✨";
    case "bugfix":
      return "🐛";
    case "refactor":
      return "♻️";
    case "docs":
      return "📝";
    case "test":
      return "🧪";
    case "config":
      return "⚙️";
    case "exploration":
      return "🔍";
    default:
      return "📦";
  }
}
function FN({
  isOpen: e,
  onClose: r,
  sessionId: o,
  sessionName: i,
  onExportComplete: l,
}) {
  const [u, c] = C.useState(!1),
    [f, h] = C.useState(!1),
    [p, x] = C.useState(null),
    [g, v] = C.useState(new Set()),
    [S, w] = C.useState(null),
    [b, N] = C.useState(new Set()),
    _ = C.useCallback(async () => {
      var P;
      (c(!0), w(null));
      try {
        const H = await fetch(`/api/sessions/${o}/analyze`, { method: "POST" });
        if (!H.ok) {
          const re = await H.json();
          throw new Error(
            ((P = re.error) == null ? void 0 : P.message) ||
              "分析に失敗しました"
          );
        }
        const V = await H.json();
        x(V);
      } catch (H) {
        w(H instanceof Error ? H.message : "分析に失敗しました");
      } finally {
        c(!1);
      }
    }, [o]);
  (C.useEffect(() => {
    e && !p && !u && _();
  }, [e, p, u, _]),
    C.useEffect(() => {
      e || (x(null), v(new Set()), w(null), N(new Set()));
    }, [e]));
  const R = C.useCallback((P) => {
      v((H) => {
        const V = new Set(H);
        return (V.has(P) ? V.delete(P) : V.add(P), V);
      });
    }, []),
    E = C.useCallback((P) => {
      N((H) => {
        const V = new Set(H);
        return (V.has(P) ? V.delete(P) : V.add(P), V);
      });
    }, []),
    j = C.useCallback(
      () =>
        p
          ? p.groups
              .filter((P) => g.has(P.category))
              .flatMap((P) => P.observationIds)
          : [],
      [p, g]
    ),
    O = C.useCallback(
      () =>
        p
          ? p.groups
              .filter((P) => g.has(P.category))
              .reduce((P, H) => P + H.estimatedTokens, 0)
          : 0,
      [p, g]
    ),
    A = C.useCallback(async () => {
      var re, Y;
      const P = j();
      if (P.length === 0) return;
      const H =
          p == null
            ? void 0
            : p.groups
                .filter((U) => g.has(U.category))
                .map((U) => U.description)
                .join(", "),
        V =
          window.prompt(
            `Export: ${P.length} observations

新しいセッション名を入力してください:`,
            `Export: ${H}`
          ) || `Export from ${i}`;
      if (V) {
        (h(!0), w(null));
        try {
          const U = await fetch(`/api/sessions/${o}/smart-export`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              observationIds: P,
              groupName: V,
              deleteAfterExport: !0,
            }),
          });
          if (!U.ok) {
            const L = await U.json();
            throw new Error(
              ((re = L.error) == null ? void 0 : re.message) ||
                "Export に失敗しました"
            );
          }
          const te = await U.json();
          (alert(`Export 完了!

新しいセッション: ${(Y = te.session) == null ? void 0 : Y.sessionId}
削除した observations: ${te.deletedCount}`),
            l(),
            r());
        } catch (U) {
          w(U instanceof Error ? U.message : "Export に失敗しました");
        } finally {
          h(!1);
        }
      }
    }, [j, p, g, o, i, l, r]);
  return e
    ? y.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          y.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: r,
          }),
          y.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[600px] max-h-[80vh] flex flex-col border border-[var(--border-default)]",
            children: [
              y.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  y.jsxs("div", {
                    children: [
                      y.jsx("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: "Smart Export",
                      }),
                      y.jsx("p", {
                        className: "text-sm text-[var(--text-muted)] mt-1",
                        children: i,
                      }),
                    ],
                  }),
                  y.jsx("button", {
                    onClick: r,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                    children: y.jsx("svg", {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: y.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12",
                      }),
                    }),
                  }),
                ],
              }),
              y.jsxs("div", {
                className: "flex-1 overflow-y-auto px-6 py-4",
                children: [
                  u &&
                    y.jsxs("div", {
                      className:
                        "flex flex-col items-center justify-center py-12",
                      children: [
                        y.jsx("div", {
                          className:
                            "w-8 h-8 border-2 border-[var(--color-primary-500)] border-t-transparent rounded-full animate-spin",
                        }),
                        y.jsx("p", {
                          className: "mt-4 text-[var(--text-muted)]",
                          children: "AI で分析中...",
                        }),
                      ],
                    }),
                  S &&
                    y.jsxs("div", {
                      className:
                        "bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4",
                      children: [
                        y.jsx("p", { className: "text-red-400", children: S }),
                        y.jsx("button", {
                          onClick: _,
                          className:
                            "mt-2 text-sm text-red-400 hover:text-red-300 underline",
                          children: "再試行",
                        }),
                      ],
                    }),
                  p &&
                    !u &&
                    y.jsxs(y.Fragment, {
                      children: [
                        y.jsxs("div", {
                          className: "flex gap-4 mb-6 text-sm",
                          children: [
                            y.jsxs("div", {
                              className:
                                "bg-[var(--bg-elevated)] px-3 py-2 rounded-lg",
                              children: [
                                y.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "総数: ",
                                }),
                                y.jsxs("span", {
                                  className:
                                    "text-[var(--text-primary)] font-medium",
                                  children: [p.totalObservations, " obs"],
                                }),
                              ],
                            }),
                            y.jsxs("div", {
                              className:
                                "bg-[var(--bg-elevated)] px-3 py-2 rounded-lg",
                              children: [
                                y.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "トークン: ",
                                }),
                                y.jsx("span", {
                                  className:
                                    "text-[var(--text-primary)] font-medium",
                                  children: mc(p.totalEstimatedTokens),
                                }),
                              ],
                            }),
                            y.jsxs("div", {
                              className:
                                "bg-[var(--bg-elevated)] px-3 py-2 rounded-lg",
                              children: [
                                y.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "分析時間: ",
                                }),
                                y.jsxs("span", {
                                  className:
                                    "text-[var(--text-primary)] font-medium",
                                  children: [
                                    (p.analysisTimeMs / 1e3).toFixed(1),
                                    "s",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        y.jsx("div", {
                          className: "space-y-3",
                          children: p.groups.map((P) =>
                            y.jsxs(
                              "div",
                              {
                                className: `border rounded-lg overflow-hidden transition-colors ${g.has(P.category) ? "border-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10" : "border-[var(--border-default)] bg-[var(--bg-elevated)]"}`,
                                children: [
                                  y.jsxs("div", {
                                    className:
                                      "flex items-center gap-3 p-4 cursor-pointer",
                                    onClick: () => R(P.category),
                                    children: [
                                      y.jsx("div", {
                                        className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${g.has(P.category) ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]" : "border-[var(--border-default)]"}`,
                                        children:
                                          g.has(P.category) &&
                                          y.jsx("svg", {
                                            className: "w-3 h-3 text-white",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: y.jsx("path", {
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              strokeWidth: 3,
                                              d: "M5 13l4 4L19 7",
                                            }),
                                          }),
                                      }),
                                      y.jsx("span", {
                                        className: "text-xl",
                                        children: ON(P.category),
                                      }),
                                      y.jsxs("div", {
                                        className: "flex-1",
                                        children: [
                                          y.jsxs("div", {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              y.jsx("span", {
                                                className:
                                                  "font-medium text-[var(--text-primary)]",
                                                children: P.categoryLabel,
                                              }),
                                              y.jsxs("span", {
                                                className:
                                                  "text-sm text-[var(--text-muted)]",
                                                children: [
                                                  "(",
                                                  P.observationIds.length,
                                                  " obs)",
                                                ],
                                              }),
                                            ],
                                          }),
                                          y.jsx("p", {
                                            className:
                                              "text-sm text-[var(--text-muted)] mt-0.5",
                                            children: P.description,
                                          }),
                                        ],
                                      }),
                                      y.jsxs("div", {
                                        className:
                                          "text-sm text-[var(--text-muted)]",
                                        children: [
                                          mc(P.estimatedTokens),
                                          " tokens",
                                        ],
                                      }),
                                      y.jsx("button", {
                                        onClick: (H) => {
                                          (H.stopPropagation(), E(P.category));
                                        },
                                        className:
                                          "p-1 hover:bg-[var(--bg-surface)] rounded transition-colors",
                                        children: y.jsx("svg", {
                                          className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${b.has(P.category) ? "rotate-180" : ""}`,
                                          fill: "none",
                                          stroke: "currentColor",
                                          viewBox: "0 0 24 24",
                                          children: y.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 9l-7 7-7-7",
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                  b.has(P.category) &&
                                    y.jsx("div", {
                                      className: "px-4 pb-4 pt-0",
                                      children: y.jsx("div", {
                                        className:
                                          "bg-[var(--bg-base)] rounded-lg p-3 text-xs font-mono text-[var(--text-muted)] max-h-32 overflow-y-auto",
                                        children: P.observationIds.map((H, V) =>
                                          y.jsxs(
                                            "div",
                                            {
                                              children: [
                                                H,
                                                V <
                                                  P.observationIds.length - 1 &&
                                                  ", ",
                                              ],
                                            },
                                            H
                                          )
                                        ),
                                      }),
                                    }),
                                ],
                              },
                              P.category
                            )
                          ),
                        }),
                      ],
                    }),
                ],
              }),
              y.jsxs("div", {
                className:
                  "px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  y.jsx("div", {
                    className: "text-sm text-[var(--text-muted)]",
                    children:
                      g.size > 0 &&
                      y.jsxs(y.Fragment, {
                        children: [
                          "選択中: ",
                          j().length,
                          " obs (",
                          mc(O()),
                          " tokens)",
                        ],
                      }),
                  }),
                  y.jsxs("div", {
                    className: "flex gap-3",
                    children: [
                      y.jsx("button", {
                        onClick: r,
                        className:
                          "px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                        children: "キャンセル",
                      }),
                      y.jsx("button", {
                        onClick: A,
                        disabled: g.size === 0 || f || u,
                        className: `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${g.size === 0 || f || u ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed" : "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]"}`,
                        children: f ? "Exporting..." : "Export & 削除",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    : null;
}
const cm = { session: "セッション", node: "ノード", edge: "接続" };
function dm({
  isOpen: e,
  onClose: r,
  onConfirm: o,
  targetType: i,
  targetName: l,
  targetId: u,
}) {
  const [c, f] = C.useState(!1),
    [h, p] = C.useState(null),
    x = C.useCallback(async () => {
      (f(!0), p(null));
      try {
        (await o(), r());
      } catch (v) {
        p(v instanceof Error ? v.message : "削除に失敗しました");
      } finally {
        f(!1);
      }
    }, [o, r]),
    g = C.useCallback(() => {
      c || (p(null), r());
    }, [c, r]);
  return e
    ? y.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          y.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: g,
          }),
          y.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[400px] border border-[var(--border-default)]",
            children: [
              y.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  y.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      y.jsx("div", {
                        className: "p-2 bg-red-500/10 rounded-lg",
                        children: y.jsx(Ss, {
                          className: "w-5 h-5 text-red-500",
                        }),
                      }),
                      y.jsxs("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: [cm[i], "を削除"],
                      }),
                    ],
                  }),
                  y.jsx("button", {
                    onClick: g,
                    disabled: c,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                    children: y.jsx(wc, {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                    }),
                  }),
                ],
              }),
              y.jsxs("div", {
                className: "px-6 py-6",
                children: [
                  y.jsxs("p", {
                    className: "text-[var(--text-secondary)]",
                    children: ["以下の", cm[i], "を削除しますか？"],
                  }),
                  y.jsxs("div", {
                    className: "mt-4 p-4 bg-[var(--bg-elevated)] rounded-lg",
                    children: [
                      y.jsx("p", {
                        className:
                          "font-medium text-[var(--text-primary)] truncate",
                        children: l,
                      }),
                      u &&
                        y.jsx("p", {
                          className:
                            "text-xs text-[var(--text-muted)] font-mono mt-1 truncate",
                          children: u,
                        }),
                    ],
                  }),
                  y.jsx("p", {
                    className: "mt-4 text-sm text-[var(--text-muted)]",
                    children: "この操作は取り消せません。",
                  }),
                  h &&
                    y.jsx("div", {
                      className:
                        "mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3",
                      children: y.jsx("p", {
                        className: "text-sm text-red-400",
                        children: h,
                      }),
                    }),
                ],
              }),
              y.jsxs("div", {
                className:
                  "px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-3",
                children: [
                  y.jsx("button", {
                    onClick: g,
                    disabled: c,
                    className:
                      "px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                    children: "キャンセル",
                  }),
                  y.jsx("button", {
                    onClick: x,
                    disabled: c,
                    className:
                      "px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2",
                    children: c
                      ? y.jsxs(y.Fragment, {
                          children: [
                            y.jsx("div", {
                              className:
                                "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin",
                            }),
                            "削除中...",
                          ],
                        })
                      : y.jsxs(y.Fragment, {
                          children: [
                            y.jsx(Ss, { className: "w-4 h-4" }),
                            "削除する",
                          ],
                        }),
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    : null;
}
function HN({
  isOpen: e,
  onClose: r,
  sessionId: o,
  onDelete: i,
  onNameChange: l,
}) {
  const [u, c] = C.useState(null),
    [f, h] = C.useState(!1),
    [p, x] = C.useState(null),
    [g, v] = C.useState(!1),
    [S, w] = C.useState(""),
    [b, N] = C.useState(!1);
  C.useEffect(() => {
    if (!e || !o) return;
    (async () => {
      var H;
      (h(!0), x(null));
      try {
        const [V, re, Y] = await Promise.all([
          fetch(`/api/sessions/${o}`),
          fetch(`/api/sessions/${o}/summary`),
          fetch(`/api/sessions/${o}/observations?limit=1`),
        ]);
        if (!V.ok) throw new Error("セッション情報の取得に失敗しました");
        const U = await V.json(),
          te = re.ok ? await re.json() : null,
          L = Y.ok ? await Y.json() : null;
        c({
          ...U,
          summary: te == null ? void 0 : te.summary,
          observationCount:
            ((H = L == null ? void 0 : L.pagination) == null
              ? void 0
              : H.total) || U.observationCount,
        });
      } catch (V) {
        x(
          V instanceof Error ? V.message : "セッション情報の取得に失敗しました"
        );
      } finally {
        h(!1);
      }
    })();
  }, [e, o]);
  const _ = C.useCallback(() => {
      (c(null), x(null), v(!1), w(""), r());
    }, [r]),
    R = C.useCallback(() => {
      u && (w(u.name), v(!0));
    }, [u]),
    E = C.useCallback(() => {
      (v(!1), w(""));
    }, []),
    j = C.useCallback(async () => {
      if (!(!u || !S.trim())) {
        N(!0);
        try {
          if (
            !(
              await fetch(`/api/sessions/${u.sessionId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: S.trim() }),
              })
            ).ok
          )
            throw new Error("名前の更新に失敗しました");
          const H = S.trim();
          (c({ ...u, name: H }), v(!1), w(""), l == null || l(u.sessionId, H));
        } catch (P) {
          alert(P instanceof Error ? P.message : "名前の更新に失敗しました");
        } finally {
          N(!1);
        }
      }
    }, [u, S, l]);
  if (
    (C.useEffect(() => {
      if (!e) return;
      const P = (H) => {
        H.key === "Escape" && _();
      };
      return (
        document.addEventListener("keydown", P),
        () => document.removeEventListener("keydown", P)
      );
    }, [e, _]),
    !e)
  )
    return null;
  const O = (P) =>
      new Date(P).toLocaleString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    A = {
      idle: "bg-gray-500",
      active: "bg-blue-500",
      completed: "bg-green-500",
      error: "bg-red-500",
      processing: "bg-yellow-500",
      merged: "bg-purple-500",
    };
  return y.jsxs("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center",
    children: [
      y.jsx("div", {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: _,
      }),
      y.jsxs("div", {
        className:
          "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[500px] max-h-[80vh] border border-[var(--border-default)] flex flex-col",
        children: [
          y.jsxs("div", {
            className:
              "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between flex-shrink-0",
            children: [
              y.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  y.jsx("div", {
                    className:
                      "p-2 bg-[var(--color-primary-500)]/10 rounded-lg",
                    children: y.jsx(Zh, {
                      className: "w-5 h-5 text-[var(--color-primary-500)]",
                    }),
                  }),
                  y.jsx("h2", {
                    className:
                      "text-lg font-semibold text-[var(--text-primary)]",
                    children: "セッション詳細",
                  }),
                ],
              }),
              y.jsx("button", {
                onClick: _,
                className:
                  "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                children: y.jsx(wc, {
                  className: "w-5 h-5 text-[var(--text-muted)]",
                }),
              }),
            ],
          }),
          y.jsx("div", {
            className: "flex-1 overflow-y-auto px-6 py-4",
            children: f
              ? y.jsxs("div", {
                  className: "space-y-4",
                  children: [
                    y.jsx("div", {
                      className:
                        "h-6 bg-[var(--bg-elevated)] rounded animate-pulse",
                    }),
                    y.jsx("div", {
                      className:
                        "h-4 bg-[var(--bg-elevated)] rounded animate-pulse w-3/4",
                    }),
                    y.jsx("div", {
                      className:
                        "h-20 bg-[var(--bg-elevated)] rounded animate-pulse",
                    }),
                  ],
                })
              : p
                ? y.jsx("div", {
                    className:
                      "bg-red-500/10 border border-red-500/30 rounded-lg p-4",
                    children: y.jsx("p", {
                      className: "text-sm text-red-400",
                      children: p,
                    }),
                  })
                : u
                  ? y.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        y.jsxs("div", {
                          children: [
                            g
                              ? y.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    y.jsx("input", {
                                      type: "text",
                                      value: S,
                                      onChange: (P) => w(P.target.value),
                                      className:
                                        "flex-1 px-3 py-2 text-lg font-medium bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary-400)]",
                                      autoFocus: !0,
                                      onKeyDown: (P) => {
                                        (P.key === "Enter" && j(),
                                          P.key === "Escape" && E());
                                      },
                                    }),
                                    y.jsx("button", {
                                      onClick: j,
                                      disabled: b || !S.trim(),
                                      className:
                                        "p-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] disabled:opacity-50 transition-colors",
                                      title: "保存",
                                      children: y.jsx(Es, {
                                        className: "w-5 h-5",
                                      }),
                                    }),
                                    y.jsx("button", {
                                      onClick: E,
                                      className:
                                        "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                                      title: "キャンセル",
                                      children: y.jsx(wc, {
                                        className:
                                          "w-5 h-5 text-[var(--text-muted)]",
                                      }),
                                    }),
                                  ],
                                })
                              : y.jsxs("div", {
                                  className: "flex items-center gap-2 group",
                                  children: [
                                    y.jsx("h3", {
                                      className:
                                        "text-xl font-medium text-[var(--text-primary)]",
                                      children: u.name,
                                    }),
                                    y.jsx("button", {
                                      onClick: R,
                                      className:
                                        "p-1.5 opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-elevated)] rounded-lg transition-all",
                                      title: "名前を編集",
                                      children: y.jsx(Lm, {
                                        className:
                                          "w-4 h-4 text-[var(--text-muted)]",
                                      }),
                                    }),
                                  ],
                                }),
                            y.jsxs("div", {
                              className: "flex items-center gap-2 mt-2",
                              children: [
                                y.jsx("span", {
                                  className: `w-2 h-2 rounded-full ${A[u.status] || "bg-gray-500"}`,
                                }),
                                y.jsx("span", {
                                  className:
                                    "text-sm text-[var(--text-secondary)] capitalize",
                                  children: u.status,
                                }),
                              ],
                            }),
                          ],
                        }),
                        y.jsxs("div", {
                          className:
                            "bg-[var(--bg-elevated)] rounded-lg p-4 space-y-3",
                          children: [
                            y.jsxs("div", {
                              className: "flex items-center gap-2 text-sm",
                              children: [
                                y.jsx(qh, {
                                  className: "w-4 h-4 text-[var(--text-muted)]",
                                }),
                                y.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "作成日時:",
                                }),
                                y.jsx("span", {
                                  className: "text-[var(--text-primary)]",
                                  children: O(u.createdAt),
                                }),
                              ],
                            }),
                            y.jsxs("div", {
                              className: "flex items-center gap-2 text-sm",
                              children: [
                                y.jsx(qh, {
                                  className: "w-4 h-4 text-[var(--text-muted)]",
                                }),
                                y.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "更新日時:",
                                }),
                                y.jsx("span", {
                                  className: "text-[var(--text-primary)]",
                                  children: O(u.updatedAt),
                                }),
                              ],
                            }),
                            u.observationCount !== void 0 &&
                              y.jsxs("div", {
                                className: "flex items-center gap-2 text-sm",
                                children: [
                                  y.jsx(Zh, {
                                    className:
                                      "w-4 h-4 text-[var(--text-muted)]",
                                  }),
                                  y.jsx("span", {
                                    className: "text-[var(--text-muted)]",
                                    children: "観測記録:",
                                  }),
                                  y.jsxs("span", {
                                    className: "text-[var(--text-primary)]",
                                    children: [u.observationCount, "件"],
                                  }),
                                ],
                              }),
                            u.tokenCount !== void 0 &&
                              u.tokenCount > 0 &&
                              y.jsxs("div", {
                                className: "flex items-center gap-2 text-sm",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "w-4 h-4 text-center text-[var(--text-muted)]",
                                    children: "#",
                                  }),
                                  y.jsx("span", {
                                    className: "text-[var(--text-muted)]",
                                    children: "トークン:",
                                  }),
                                  y.jsx("span", {
                                    className: "text-[var(--text-primary)]",
                                    children: u.tokenCount.toLocaleString(),
                                  }),
                                ],
                              }),
                          ],
                        }),
                        u.summary &&
                          y.jsxs("div", {
                            children: [
                              y.jsx("h4", {
                                className:
                                  "text-sm font-medium text-[var(--text-muted)] mb-2",
                                children: "要約",
                              }),
                              y.jsx("div", {
                                className:
                                  "bg-[var(--bg-elevated)] rounded-lg p-4",
                                children: y.jsx("p", {
                                  className:
                                    "text-sm text-[var(--text-secondary)] whitespace-pre-wrap",
                                  children: u.summary,
                                }),
                              }),
                            ],
                          }),
                        y.jsx("div", {
                          className:
                            "pt-2 border-t border-[var(--border-subtle)]",
                          children: y.jsxs("p", {
                            className:
                              "text-xs text-[var(--text-muted)] font-mono",
                            children: ["ID: ", u.sessionId],
                          }),
                        }),
                      ],
                    })
                  : null,
          }),
          y.jsxs("div", {
            className:
              "px-6 py-4 border-t border-[var(--border-subtle)] flex justify-between flex-shrink-0",
            children: [
              i && o
                ? y.jsx("button", {
                    onClick: () => {
                      (i(o), _());
                    },
                    className:
                      "px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors",
                    children: "削除",
                  })
                : y.jsx("div", {}),
              y.jsx("button", {
                onClick: _,
                className:
                  "px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                children: "閉じる",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const fm = "claude-cnthub-theme";
function BN() {
  const [e, r] = C.useState(() => {
    if (typeof window < "u") {
      const l = localStorage.getItem(fm);
      if (l === "light" || l === "dark") return l;
    }
    return "dark";
  });
  C.useEffect(() => {
    const l = document.documentElement;
    ((l.dataset.theme = e),
      e === "light"
        ? (l.classList.add("light"), l.classList.remove("dark"))
        : (l.classList.add("dark"), l.classList.remove("light")),
      localStorage.setItem(fm, e));
  }, [e]);
  const o = C.useCallback(() => {
      r((l) => (l === "dark" ? "light" : "dark"));
    }, []),
    i = C.useCallback((l) => {
      r(l);
    }, []);
  return { theme: e, toggleTheme: o, setTheme: i };
}
function VN() {
  const { theme: e, toggleTheme: r } = BN(),
    { selectedProjectId: o, projects: i } = Uc(),
    [l, u] = C.useState([]),
    [c, f] = C.useState("sessions"),
    [h, p] = C.useState([]),
    [x, g] = C.useState([]),
    [v, S] = C.useState(!1),
    [w, b] = C.useState(null),
    [N, _] = C.useState(null),
    [R, E] = C.useState(null),
    j = C.useRef(null),
    [O, A] = C.useState("idle"),
    [P, H] = C.useState(null),
    [V, re] = C.useState(null),
    [Y, U] = C.useState(null),
    te = C.useMemo(
      () =>
        l
          .filter((se) => !h.includes(se.sessionId))
          .filter((se) => !o || se.projectId === o),
      [l, h, o]
    ),
    L = C.useCallback(async () => {
      try {
        const se = await fetch("/api/sessions?limit=100&status=completed");
        if (!se.ok) throw new Error("Failed to fetch");
        const ae = await se.json();
        u(ae.items || []);
      } catch (se) {
        (console.error("[ViewerPage] Failed to fetch sessions:", se), u([]));
      }
    }, []);
  (C.useEffect(() => {
    L();
  }, [L]),
    C.useEffect(() => {
      let se = !0;
      const ae = async () => {
        try {
          const ge = [],
            Ce = await fetch("/api/sessions?limit=10&status=processing");
          if (Ce.ok) {
            const Ie = await Ce.json();
            ge.push(...(Ie.items || []));
          }
          const ke = await fetch("/api/sessions?limit=10&status=idle");
          if (ke.ok) {
            const Ie = await ke.json();
            ge.push(...(Ie.items || []));
          }
          if (!se) return;
          if (ge.length === 0) {
            g([]);
            return;
          }
          const Se = await Promise.all(
            ge.map(async (Ie) => {
              var me;
              try {
                const _e = await fetch(
                  `/api/sessions/${Ie.sessionId}/observations?limit=100`
                );
                if (_e.ok) {
                  const Re = await _e.json();
                  return {
                    session: Ie,
                    observations: Re.items || [],
                    observationCount:
                      ((me = Re.items) == null ? void 0 : me.length) || 0,
                    tokenCount: Ie.tokenCount || 0,
                    inputTokens: Ie.inputTokens,
                    outputTokens: Ie.outputTokens,
                  };
                }
              } catch {}
              return {
                session: Ie,
                observations: [],
                observationCount: 0,
                tokenCount: Ie.tokenCount || 0,
                inputTokens: Ie.inputTokens,
                outputTokens: Ie.outputTokens,
              };
            })
          );
          se && g(Se);
        } catch (ge) {
          console.error("[ViewerPage] Failed to fetch current sessions:", ge);
        }
      };
      ae();
      const de = setInterval(ae, 5e3);
      return () => {
        ((se = !1), clearInterval(de));
      };
    }, []));
  const K = C.useCallback((se) => {
      p((ae) =>
        ae.includes(se.sessionId)
          ? ae.filter((de) => de !== se.sessionId)
          : [...ae, se.sessionId]
      );
    }, []),
    B = C.useCallback((se) => {
      (console.log("[Viewer] Session clicked:", se.sessionId),
        re(se.sessionId));
    }, []),
    X = C.useCallback((se) => {
      console.log("[Viewer] Get session:", se);
    }, []),
    z = C.useCallback((se) => {
      b(se);
    }, []),
    $ = C.useCallback(async () => {
      var ae;
      if (!w) return;
      const se = w.sessionId;
      try {
        const de = await fetch(`/api/sessions/${se}`, { method: "DELETE" });
        if (!de.ok) {
          const ge = await de.json();
          throw new Error(
            ((ae = ge.error) == null ? void 0 : ae.message) ||
              "削除に失敗しました"
          );
        }
        (u((ge) => ge.filter((Ce) => Ce.sessionId !== se)),
          p((ge) => ge.filter((Ce) => Ce !== se)),
          b(null));
      } catch (de) {
        (console.error("[ViewerPage] Failed to delete session:", de),
          alert(
            de instanceof Error ? de.message : "セッションの削除に失敗しました"
          ));
      }
    }, [w]),
    W = C.useCallback(
      (se) => {
        const ae = l.find((de) => de.sessionId === se);
        b(
          ae
            ? { sessionId: ae.sessionId, name: ae.name }
            : { sessionId: se, name: se }
        );
      },
      [l]
    ),
    M = C.useCallback((se, ae) => {
      u((de) =>
        de.map((ge) => (ge.sessionId === se ? { ...ge, name: ae } : ge))
      );
    }, []),
    I = C.useCallback(async (se) => {
      var ae;
      try {
        const de = await fetch("/api/sessions/bulk-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionIds: se }),
        });
        if (!de.ok) {
          const ke = await de.json();
          throw new Error(
            ((ae = ke.error) == null ? void 0 : ae.message) ||
              "一括削除に失敗しました"
          );
        }
        const ge = await de.json(),
          Ce = new Set(
            ge.results.filter((ke) => ke.success).map((ke) => ke.sessionId)
          );
        (u((ke) => ke.filter((Se) => !Ce.has(Se.sessionId))),
          p((ke) => ke.filter((Se) => !Ce.has(Se))));
      } catch (de) {
        (console.error("[ViewerPage] Failed to bulk delete sessions:", de),
          alert(de instanceof Error ? de.message : "一括削除に失敗しました"));
      }
    }, []),
    oe = C.useCallback((se) => {
      _(se);
    }, []),
    le = C.useCallback(async () => {
      if (N)
        return new Promise((se) => {
          ((j.current = se), E({ type: N.type, id: N.id }));
        });
    }, [N]),
    Z = C.useCallback(() => {
      (E(null), _(null), j.current && (j.current(), (j.current = null)));
    }, []),
    [Q, ne] = C.useState(null),
    J = C.useCallback(
      (se) => {
        const ae = x.find((de) => {
          var ge;
          return ((ge = de.session) == null ? void 0 : ge.sessionId) === se;
        });
        if (!(ae != null && ae.session) || ae.observationCount === 0) {
          alert("エクスポートするobservationsがありません");
          return;
        }
        (console.log("[Viewer] Opening Smart Export modal:", se),
          ne(ae),
          S(!0));
      },
      [x]
    ),
    ie = C.useCallback(async () => {
      (console.log("[Viewer] Smart Export completed"), await L());
    }, [L]),
    ue = C.useCallback(async (se) => {
      var ae, de, ge, Ce, ke, Se, Ie, me;
      if (se.length < 2) return null;
      (console.log("[Viewer] Starting merge:", se), A("merging"), H(null));
      try {
        const _e = await fetch("/api/merges/with-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceSessionIds: se }),
        });
        if (!_e.ok) {
          const jt = await _e.json();
          return (
            console.error("[Viewer] Merge failed:", jt),
            A("error"),
            null
          );
        }
        const Re = await _e.json(),
          Je = {
            shortSummary:
              ((ae = Re.summary) == null ? void 0 : ae.shortSummary) || "",
            detailedSummary:
              ((de = Re.summary) == null ? void 0 : de.detailedSummary) || "",
            keyDecisions:
              ((ge = Re.summary) == null ? void 0 : ge.keyDecisions) || [],
            topics: ((Ce = Re.summary) == null ? void 0 : Ce.topics) || [],
            sessionCount:
              ((ke = Re.summary) == null ? void 0 : ke.sessionCount) ||
              se.length,
            totalOriginalTokens:
              ((Se = Re.summary) == null ? void 0 : Se.totalOriginalTokens) ||
              0,
            mergedTokens:
              ((Ie = Re.summary) == null ? void 0 : Ie.mergedTokens) || 0,
            compressionRatio:
              ((me = Re.summary) == null ? void 0 : me.compressionRatio) || 0,
          };
        return (
          H(Je),
          A("completed"),
          console.log("[Viewer] Merge completed:", Je),
          Je
        );
      } catch (_e) {
        return (console.error("[Viewer] Merge error:", _e), A("error"), null);
      }
    }, []);
  return y.jsxs("div", {
    className: `${e === "dark" ? "viewer-theme " : ""}h-screen flex flex-col bg-[var(--bg-base)]`,
    children: [
      y.jsxs("header", {
        className:
          "h-12 flex items-center justify-between px-4 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]",
        children: [
          y.jsxs("div", {
            className: "flex items-center gap-4",
            children: [
              y.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  y.jsx("span", {
                    className:
                      "text-lg font-semibold text-[var(--color-primary-500)]",
                    children: "cnthub",
                  }),
                  y.jsx("span", {
                    className: "text-sm text-[var(--text-muted)]",
                    children: "Viewer",
                  }),
                ],
              }),
              y.jsxs("div", {
                className:
                  "flex items-center bg-[var(--bg-elevated)] rounded-lg p-1",
                role: "tablist",
                "aria-label": "ビュー切り替え",
                children: [
                  y.jsxs("button", {
                    role: "tab",
                    "aria-selected": c === "sessions",
                    "aria-controls": "sessions-panel",
                    onClick: () => f("sessions"),
                    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${c === "sessions" ? "bg-[var(--color-primary-500)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"}`,
                    children: [y.jsx(Gx, { className: "w-4 h-4" }), "Sessions"],
                  }),
                  y.jsxs("button", {
                    role: "tab",
                    "aria-selected": c === "system",
                    "aria-controls": "system-panel",
                    onClick: () => f("system"),
                    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${c === "system" ? "bg-[var(--color-primary-500)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"}`,
                    children: [y.jsx(t1, { className: "w-4 h-4" }), "System"],
                  }),
                ],
              }),
            ],
          }),
          y.jsx("button", {
            onClick: r,
            className:
              "p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors",
            "aria-label":
              e === "dark" ? "ライトモードに切替" : "ダークモードに切替",
            children:
              e === "dark"
                ? y.jsx(Zx, {
                    className: "w-5 h-5 text-[var(--text-secondary)]",
                  })
                : y.jsx(qx, {
                    className: "w-5 h-5 text-[var(--text-secondary)]",
                  }),
          }),
        ],
      }),
      y.jsx("div", {
        className: "flex-1 flex overflow-hidden",
        children:
          c === "sessions"
            ? y.jsxs(y.Fragment, {
                children: [
                  y.jsx(i1, {
                    sessions: l,
                    onSessionSelect: K,
                    onSessionClick: B,
                    onSessionDelete: z,
                    onBulkDelete: I,
                    onSessionHover: U,
                    selectedSessionIds: h,
                  }),
                  y.jsx("main", {
                    className: "flex-1 overflow-hidden",
                    children: y.jsx("div", {
                      id: "sessions-panel",
                      role: "tabpanel",
                      "aria-labelledby": "sessions-tab",
                      className: "h-full",
                      children: y.jsx(TN, {
                        sessions: te,
                        projects: i,
                        currentSessionsData: x,
                        theme: e,
                        onGetSession: X,
                        onExportSession: J,
                        onDeleteRequest: oe,
                        pendingDelete: R,
                        onDeleteComplete: Z,
                        onMerge: ue,
                        mergeStatus: O,
                        mergedSummary: P,
                        onSessionDetail: (se) => re(se),
                        hoveredSessionId: Y,
                      }),
                    }),
                  }),
                ],
              })
            : y.jsx("main", {
                className: "flex-1 overflow-hidden",
                children: y.jsx("div", {
                  id: "system-panel",
                  role: "tabpanel",
                  "aria-labelledby": "system-tab",
                  className: "h-full",
                  children: y.jsx(DN, {
                    onOptimize: (se, ae) => {
                      console.log("[System] Optimize requested:", se, ae);
                    },
                  }),
                }),
              }),
      }),
      (Q == null ? void 0 : Q.session) &&
        y.jsx(FN, {
          isOpen: v,
          onClose: () => {
            (S(!1), ne(null));
          },
          sessionId: Q.session.sessionId,
          sessionName: Q.session.name,
          onExportComplete: ie,
        }),
      y.jsx(dm, {
        isOpen: !!w,
        onClose: () => b(null),
        onConfirm: $,
        targetType: "session",
        targetName: (w == null ? void 0 : w.name) || "",
        targetId: w == null ? void 0 : w.sessionId,
      }),
      y.jsx(dm, {
        isOpen: !!N,
        onClose: () => _(null),
        onConfirm: le,
        targetType: (N == null ? void 0 : N.type) === "node" ? "node" : "edge",
        targetName: (N == null ? void 0 : N.name) || "",
        targetId: N == null ? void 0 : N.id,
      }),
      y.jsx(HN, {
        isOpen: !!V,
        onClose: () => re(null),
        sessionId: V,
        onDelete: W,
        onNameChange: M,
      }),
    ],
  });
}
function WN() {
  return y.jsxs(fx, {
    children: [
      y.jsx(yc, { path: "/", element: y.jsx(VN, {}) }),
      y.jsx(yc, { path: "*", element: y.jsx(cx, { to: "/", replace: !0 }) }),
    ],
  });
}
const UN = "/viewer/";
pv.createRoot(document.getElementById("root")).render(
  y.jsx(no.StrictMode, {
    children: y.jsx($x, { basename: UN, children: y.jsx(WN, {}) }),
  })
);
//# sourceMappingURL=index-Bxh9NUId.js.map

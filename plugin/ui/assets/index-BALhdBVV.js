var iv = Object.defineProperty;
var lv = (e, r, o) =>
  r in e
    ? iv(e, r, { enumerable: !0, configurable: !0, writable: !0, value: o })
    : (e[r] = o);
var ut = (e, r, o) => lv(e, typeof r != "symbol" ? r + "" : r, o);
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
var Xu = { exports: {} },
  cs = {},
  Ku = { exports: {} },
  Pe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ah;
function av() {
  if (Ah) return Pe;
  Ah = 1;
  var e = Symbol.for("react.element"),
    r = Symbol.for("react.portal"),
    o = Symbol.for("react.fragment"),
    i = Symbol.for("react.strict_mode"),
    l = Symbol.for("react.profiler"),
    u = Symbol.for("react.provider"),
    c = Symbol.for("react.context"),
    f = Symbol.for("react.forward_ref"),
    h = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    x = Symbol.for("react.lazy"),
    y = Symbol.iterator;
  function v(M) {
    return M === null || typeof M != "object"
      ? null
      : ((M = (y && M[y]) || M["@@iterator"]),
        typeof M == "function" ? M : null);
  }
  var w = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    S = Object.assign,
    _ = {};
  function C(M, I, ne) {
    ((this.props = M),
      (this.context = I),
      (this.refs = _),
      (this.updater = ne || w));
  }
  ((C.prototype.isReactComponent = {}),
    (C.prototype.setState = function (M, I) {
      if (typeof M != "object" && typeof M != "function" && M != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, M, I, "setState");
    }),
    (C.prototype.forceUpdate = function (M) {
      this.updater.enqueueForceUpdate(this, M, "forceUpdate");
    }));
  function b() {}
  b.prototype = C.prototype;
  function P(M, I, ne) {
    ((this.props = M),
      (this.context = I),
      (this.refs = _),
      (this.updater = ne || w));
  }
  var E = (P.prototype = new b());
  ((E.constructor = P), S(E, C.prototype), (E.isPureReactComponent = !0));
  var j = Array.isArray,
    D = Object.prototype.hasOwnProperty,
    A = { current: null },
    R = { key: !0, ref: !0, __self: !0, __source: !0 };
  function H(M, I, ne) {
    var ie,
      F = {},
      Z = null,
      re = null;
    if (I != null)
      for (ie in (I.ref !== void 0 && (re = I.ref),
      I.key !== void 0 && (Z = "" + I.key),
      I))
        D.call(I, ie) && !R.hasOwnProperty(ie) && (F[ie] = I[ie]);
    var Q = arguments.length - 2;
    if (Q === 1) F.children = ne;
    else if (1 < Q) {
      for (var oe = Array(Q), fe = 0; fe < Q; fe++) oe[fe] = arguments[fe + 2];
      F.children = oe;
    }
    if (M && M.defaultProps)
      for (ie in ((Q = M.defaultProps), Q)) F[ie] === void 0 && (F[ie] = Q[ie]);
    return {
      $$typeof: e,
      type: M,
      key: Z,
      ref: re,
      props: F,
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
  function se(M) {
    return typeof M == "object" && M !== null && M.$$typeof === e;
  }
  function X(M) {
    var I = { "=": "=0", ":": "=2" };
    return (
      "$" +
      M.replace(/[=:]/g, function (ne) {
        return I[ne];
      })
    );
  }
  var Y = /\/+/g;
  function te(M, I) {
    return typeof M == "object" && M !== null && M.key != null
      ? X("" + M.key)
      : I.toString(36);
  }
  function L(M, I, ne, ie, F) {
    var Z = typeof M;
    (Z === "undefined" || Z === "boolean") && (M = null);
    var re = !1;
    if (M === null) re = !0;
    else
      switch (Z) {
        case "string":
        case "number":
          re = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case e:
            case r:
              re = !0;
          }
      }
    if (re)
      return (
        (re = M),
        (F = F(re)),
        (M = ie === "" ? "." + te(re, 0) : ie),
        j(F)
          ? ((ne = ""),
            M != null && (ne = M.replace(Y, "$&/") + "/"),
            L(F, I, ne, "", function (fe) {
              return fe;
            }))
          : F != null &&
            (se(F) &&
              (F = V(
                F,
                ne +
                  (!F.key || (re && re.key === F.key)
                    ? ""
                    : ("" + F.key).replace(Y, "$&/") + "/") +
                  M
              )),
            I.push(F)),
        1
      );
    if (((re = 0), (ie = ie === "" ? "." : ie + ":"), j(M)))
      for (var Q = 0; Q < M.length; Q++) {
        Z = M[Q];
        var oe = ie + te(Z, Q);
        re += L(Z, I, ne, oe, F);
      }
    else if (((oe = v(M)), typeof oe == "function"))
      for (M = oe.call(M), Q = 0; !(Z = M.next()).done; )
        ((Z = Z.value), (oe = ie + te(Z, Q++)), (re += L(Z, I, ne, oe, F)));
    else if (Z === "object")
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
    return re;
  }
  function G(M, I, ne) {
    if (M == null) return M;
    var ie = [],
      F = 0;
    return (
      L(M, ie, "", "", function (Z) {
        return I.call(ne, Z, F++);
      }),
      ie
    );
  }
  function B(M) {
    if (M._status === -1) {
      var I = M._result;
      ((I = I()),
        I.then(
          function (ne) {
            (M._status === 0 || M._status === -1) &&
              ((M._status = 1), (M._result = ne));
          },
          function (ne) {
            (M._status === 0 || M._status === -1) &&
              ((M._status = 2), (M._result = ne));
          }
        ),
        M._status === -1 && ((M._status = 0), (M._result = I)));
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var K = { current: null },
    z = { transition: null },
    $ = {
      ReactCurrentDispatcher: K,
      ReactCurrentBatchConfig: z,
      ReactCurrentOwner: A,
    };
  function U() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (Pe.Children = {
      map: G,
      forEach: function (M, I, ne) {
        G(
          M,
          function () {
            I.apply(this, arguments);
          },
          ne
        );
      },
      count: function (M) {
        var I = 0;
        return (
          G(M, function () {
            I++;
          }),
          I
        );
      },
      toArray: function (M) {
        return (
          G(M, function (I) {
            return I;
          }) || []
        );
      },
      only: function (M) {
        if (!se(M))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return M;
      },
    }),
    (Pe.Component = C),
    (Pe.Fragment = o),
    (Pe.Profiler = l),
    (Pe.PureComponent = P),
    (Pe.StrictMode = i),
    (Pe.Suspense = h),
    (Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $),
    (Pe.act = U),
    (Pe.cloneElement = function (M, I, ne) {
      if (M == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            M +
            "."
        );
      var ie = S({}, M.props),
        F = M.key,
        Z = M.ref,
        re = M._owner;
      if (I != null) {
        if (
          (I.ref !== void 0 && ((Z = I.ref), (re = A.current)),
          I.key !== void 0 && (F = "" + I.key),
          M.type && M.type.defaultProps)
        )
          var Q = M.type.defaultProps;
        for (oe in I)
          D.call(I, oe) &&
            !R.hasOwnProperty(oe) &&
            (ie[oe] = I[oe] === void 0 && Q !== void 0 ? Q[oe] : I[oe]);
      }
      var oe = arguments.length - 2;
      if (oe === 1) ie.children = ne;
      else if (1 < oe) {
        Q = Array(oe);
        for (var fe = 0; fe < oe; fe++) Q[fe] = arguments[fe + 2];
        ie.children = Q;
      }
      return {
        $$typeof: e,
        type: M.type,
        key: F,
        ref: Z,
        props: ie,
        _owner: re,
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
    (Pe.isValidElement = se),
    (Pe.lazy = function (M) {
      return { $$typeof: x, _payload: { _status: -1, _result: M }, _init: B };
    }),
    (Pe.memo = function (M, I) {
      return { $$typeof: m, type: M, compare: I === void 0 ? null : I };
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
    (Pe.unstable_act = U),
    (Pe.useCallback = function (M, I) {
      return K.current.useCallback(M, I);
    }),
    (Pe.useContext = function (M) {
      return K.current.useContext(M);
    }),
    (Pe.useDebugValue = function () {}),
    (Pe.useDeferredValue = function (M) {
      return K.current.useDeferredValue(M);
    }),
    (Pe.useEffect = function (M, I) {
      return K.current.useEffect(M, I);
    }),
    (Pe.useId = function () {
      return K.current.useId();
    }),
    (Pe.useImperativeHandle = function (M, I, ne) {
      return K.current.useImperativeHandle(M, I, ne);
    }),
    (Pe.useInsertionEffect = function (M, I) {
      return K.current.useInsertionEffect(M, I);
    }),
    (Pe.useLayoutEffect = function (M, I) {
      return K.current.useLayoutEffect(M, I);
    }),
    (Pe.useMemo = function (M, I) {
      return K.current.useMemo(M, I);
    }),
    (Pe.useReducer = function (M, I, ne) {
      return K.current.useReducer(M, I, ne);
    }),
    (Pe.useRef = function (M) {
      return K.current.useRef(M);
    }),
    (Pe.useState = function (M) {
      return K.current.useState(M);
    }),
    (Pe.useSyncExternalStore = function (M, I, ne) {
      return K.current.useSyncExternalStore(M, I, ne);
    }),
    (Pe.useTransition = function () {
      return K.current.useTransition();
    }),
    (Pe.version = "18.3.1"),
    Pe
  );
}
var $h;
function Ls() {
  return ($h || (($h = 1), (Ku.exports = av())), Ku.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dh;
function uv() {
  if (Dh) return cs;
  Dh = 1;
  var e = Ls(),
    r = Symbol.for("react.element"),
    o = Symbol.for("react.fragment"),
    i = Object.prototype.hasOwnProperty,
    l = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(f, h, m) {
    var x,
      y = {},
      v = null,
      w = null;
    (m !== void 0 && (v = "" + m),
      h.key !== void 0 && (v = "" + h.key),
      h.ref !== void 0 && (w = h.ref));
    for (x in h) i.call(h, x) && !u.hasOwnProperty(x) && (y[x] = h[x]);
    if (f && f.defaultProps)
      for (x in ((h = f.defaultProps), h)) y[x] === void 0 && (y[x] = h[x]);
    return {
      $$typeof: r,
      type: f,
      key: v,
      ref: w,
      props: y,
      _owner: l.current,
    };
  }
  return ((cs.Fragment = o), (cs.jsx = c), (cs.jsxs = c), cs);
}
var Oh;
function cv() {
  return (Oh || ((Oh = 1), (Xu.exports = uv())), Xu.exports);
}
var p = cv(),
  k = Ls();
const ro = $c(k);
var il = {},
  Qu = { exports: {} },
  St = {},
  Gu = { exports: {} },
  qu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fh;
function dv() {
  return (
    Fh ||
      ((Fh = 1),
      (function (e) {
        function r(z, $) {
          var U = z.length;
          z.push($);
          e: for (; 0 < U; ) {
            var M = (U - 1) >>> 1,
              I = z[M];
            if (0 < l(I, $)) ((z[M] = $), (z[U] = I), (U = M));
            else break e;
          }
        }
        function o(z) {
          return z.length === 0 ? null : z[0];
        }
        function i(z) {
          if (z.length === 0) return null;
          var $ = z[0],
            U = z.pop();
          if (U !== $) {
            z[0] = U;
            e: for (var M = 0, I = z.length, ne = I >>> 1; M < ne; ) {
              var ie = 2 * (M + 1) - 1,
                F = z[ie],
                Z = ie + 1,
                re = z[Z];
              if (0 > l(F, U))
                Z < I && 0 > l(re, F)
                  ? ((z[M] = re), (z[Z] = U), (M = Z))
                  : ((z[M] = F), (z[ie] = U), (M = ie));
              else if (Z < I && 0 > l(re, U))
                ((z[M] = re), (z[Z] = U), (M = Z));
              else break e;
            }
          }
          return $;
        }
        function l(z, $) {
          var U = z.sortIndex - $.sortIndex;
          return U !== 0 ? U : z.id - $.id;
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
          m = [],
          x = 1,
          y = null,
          v = 3,
          w = !1,
          S = !1,
          _ = !1,
          C = typeof setTimeout == "function" ? setTimeout : null,
          b = typeof clearTimeout == "function" ? clearTimeout : null,
          P = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function E(z) {
          for (var $ = o(m); $ !== null; ) {
            if ($.callback === null) i(m);
            else if ($.startTime <= z)
              (i(m), ($.sortIndex = $.expirationTime), r(h, $));
            else break;
            $ = o(m);
          }
        }
        function j(z) {
          if (((_ = !1), E(z), !S))
            if (o(h) !== null) ((S = !0), B(D));
            else {
              var $ = o(m);
              $ !== null && K(j, $.startTime - z);
            }
        }
        function D(z, $) {
          ((S = !1), _ && ((_ = !1), b(H), (H = -1)), (w = !0));
          var U = v;
          try {
            for (
              E($), y = o(h);
              y !== null && (!(y.expirationTime > $) || (z && !X()));
            ) {
              var M = y.callback;
              if (typeof M == "function") {
                ((y.callback = null), (v = y.priorityLevel));
                var I = M(y.expirationTime <= $);
                (($ = e.unstable_now()),
                  typeof I == "function"
                    ? (y.callback = I)
                    : y === o(h) && i(h),
                  E($));
              } else i(h);
              y = o(h);
            }
            if (y !== null) var ne = !0;
            else {
              var ie = o(m);
              (ie !== null && K(j, ie.startTime - $), (ne = !1));
            }
            return ne;
          } finally {
            ((y = null), (v = U), (w = !1));
          }
        }
        var A = !1,
          R = null,
          H = -1,
          V = 5,
          se = -1;
        function X() {
          return !(e.unstable_now() - se < V);
        }
        function Y() {
          if (R !== null) {
            var z = e.unstable_now();
            se = z;
            var $ = !0;
            try {
              $ = R(!0, z);
            } finally {
              $ ? te() : ((A = !1), (R = null));
            }
          } else A = !1;
        }
        var te;
        if (typeof P == "function")
          te = function () {
            P(Y);
          };
        else if (typeof MessageChannel < "u") {
          var L = new MessageChannel(),
            G = L.port2;
          ((L.port1.onmessage = Y),
            (te = function () {
              G.postMessage(null);
            }));
        } else
          te = function () {
            C(Y, 0);
          };
        function B(z) {
          ((R = z), A || ((A = !0), te()));
        }
        function K(z, $) {
          H = C(function () {
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
            S || w || ((S = !0), B(D));
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
            var U = v;
            v = $;
            try {
              return z();
            } finally {
              v = U;
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
            var U = v;
            v = z;
            try {
              return $();
            } finally {
              v = U;
            }
          }),
          (e.unstable_scheduleCallback = function (z, $, U) {
            var M = e.unstable_now();
            switch (
              (typeof U == "object" && U !== null
                ? ((U = U.delay),
                  (U = typeof U == "number" && 0 < U ? M + U : M))
                : (U = M),
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
              (I = U + I),
              (z = {
                id: x++,
                callback: $,
                priorityLevel: z,
                startTime: U,
                expirationTime: I,
                sortIndex: -1,
              }),
              U > M
                ? ((z.sortIndex = U),
                  r(m, z),
                  o(h) === null &&
                    z === o(m) &&
                    (_ ? (b(H), (H = -1)) : (_ = !0), K(j, U - M)))
                : ((z.sortIndex = I), r(h, z), S || w || ((S = !0), B(D))),
              z
            );
          }),
          (e.unstable_shouldYield = X),
          (e.unstable_wrapCallback = function (z) {
            var $ = v;
            return function () {
              var U = v;
              v = $;
              try {
                return z.apply(this, arguments);
              } finally {
                v = U;
              }
            };
          }));
      })(qu)),
    qu
  );
}
var Hh;
function fv() {
  return (Hh || ((Hh = 1), (Gu.exports = dv())), Gu.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bh;
function hv() {
  if (Bh) return St;
  Bh = 1;
  var e = Ls(),
    r = fv();
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
    m =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    x = {},
    y = {};
  function v(t) {
    return h.call(y, t)
      ? !0
      : h.call(x, t)
        ? !1
        : m.test(t)
          ? (y[t] = !0)
          : ((x[t] = !0), !1);
  }
  function w(t, n, s, a) {
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
  function S(t, n, s, a) {
    if (n === null || typeof n > "u" || w(t, n, s, a)) return !0;
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
  function _(t, n, s, a, d, g, N) {
    ((this.acceptsBooleans = n === 2 || n === 3 || n === 4),
      (this.attributeName = a),
      (this.attributeNamespace = d),
      (this.mustUseProperty = s),
      (this.propertyName = t),
      (this.type = n),
      (this.sanitizeURL = g),
      (this.removeEmptyString = N));
  }
  var C = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (t) {
      C[t] = new _(t, 0, !1, t, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (t) {
      var n = t[0];
      C[n] = new _(n, 1, !1, t[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (t) {
        C[t] = new _(t, 2, !1, t.toLowerCase(), null, !1, !1);
      }
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (t) {
      C[t] = new _(t, 2, !1, t, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (t) {
        C[t] = new _(t, 3, !1, t.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (t) {
      C[t] = new _(t, 3, !0, t, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (t) {
      C[t] = new _(t, 4, !1, t, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (t) {
      C[t] = new _(t, 6, !1, t, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (t) {
      C[t] = new _(t, 5, !1, t.toLowerCase(), null, !1, !1);
    }));
  var b = /[\-:]([a-z])/g;
  function P(t) {
    return t[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (t) {
      var n = t.replace(b, P);
      C[n] = new _(n, 1, !1, t, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (t) {
        var n = t.replace(b, P);
        C[n] = new _(n, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (t) {
      var n = t.replace(b, P);
      C[n] = new _(n, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (t) {
      C[t] = new _(t, 1, !1, t.toLowerCase(), null, !1, !1);
    }),
    (C.xlinkHref = new _(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1
    )),
    ["src", "href", "action", "formAction"].forEach(function (t) {
      C[t] = new _(t, 1, !1, t.toLowerCase(), null, !0, !0);
    }));
  function E(t, n, s, a) {
    var d = C.hasOwnProperty(n) ? C[n] : null;
    (d !== null
      ? d.type !== 0
      : a ||
        !(2 < n.length) ||
        (n[0] !== "o" && n[0] !== "O") ||
        (n[1] !== "n" && n[1] !== "N")) &&
      (S(n, s, d, a) && (s = null),
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
    D = Symbol.for("react.element"),
    A = Symbol.for("react.portal"),
    R = Symbol.for("react.fragment"),
    H = Symbol.for("react.strict_mode"),
    V = Symbol.for("react.profiler"),
    se = Symbol.for("react.provider"),
    X = Symbol.for("react.context"),
    Y = Symbol.for("react.forward_ref"),
    te = Symbol.for("react.suspense"),
    L = Symbol.for("react.suspense_list"),
    G = Symbol.for("react.memo"),
    B = Symbol.for("react.lazy"),
    K = Symbol.for("react.offscreen"),
    z = Symbol.iterator;
  function $(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (z && t[z]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var U = Object.assign,
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
  var ne = !1;
  function ie(t, n) {
    if (!t || ne) return "";
    ne = !0;
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
            g = a.stack.split(`
`),
            N = d.length - 1,
            T = g.length - 1;
          1 <= N && 0 <= T && d[N] !== g[T];
        )
          T--;
        for (; 1 <= N && 0 <= T; N--, T--)
          if (d[N] !== g[T]) {
            if (N !== 1 || T !== 1)
              do
                if ((N--, T--, 0 > T || d[N] !== g[T])) {
                  var O =
                    `
` + d[N].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      O.includes("<anonymous>") &&
                      (O = O.replace("<anonymous>", t.displayName)),
                    O
                  );
                }
              while (1 <= N && 0 <= T);
            break;
          }
      }
    } finally {
      ((ne = !1), (Error.prepareStackTrace = s));
    }
    return (t = t ? t.displayName || t.name : "") ? I(t) : "";
  }
  function F(t) {
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
        return ((t = ie(t.type, !1)), t);
      case 11:
        return ((t = ie(t.type.render, !1)), t);
      case 1:
        return ((t = ie(t.type, !0)), t);
      default:
        return "";
    }
  }
  function Z(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case R:
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
        case X:
          return (t.displayName || "Context") + ".Consumer";
        case se:
          return (t._context.displayName || "Context") + ".Provider";
        case Y:
          var n = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = n.displayName || n.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case G:
          return (
            (n = t.displayName || null),
            n !== null ? n : Z(t.type) || "Memo"
          );
        case B:
          ((n = t._payload), (t = t._init));
          try {
            return Z(t(n));
          } catch {}
      }
    return null;
  }
  function re(t) {
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
        return Z(n);
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
  function Q(t) {
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
  function oe(t) {
    var n = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (n === "checkbox" || n === "radio")
    );
  }
  function fe(t) {
    var n = oe(t) ? "checked" : "value",
      s = Object.getOwnPropertyDescriptor(t.constructor.prototype, n),
      a = "" + t[n];
    if (
      !t.hasOwnProperty(n) &&
      typeof s < "u" &&
      typeof s.get == "function" &&
      typeof s.set == "function"
    ) {
      var d = s.get,
        g = s.set;
      return (
        Object.defineProperty(t, n, {
          configurable: !0,
          get: function () {
            return d.call(this);
          },
          set: function (N) {
            ((a = "" + N), g.call(this, N));
          },
        }),
        Object.defineProperty(t, n, { enumerable: s.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (N) {
            a = "" + N;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[n]);
          },
        }
      );
    }
  }
  function me(t) {
    t._valueTracker || (t._valueTracker = fe(t));
  }
  function ye(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var s = n.getValue(),
      a = "";
    return (
      t && (a = oe(t) ? (t.checked ? "true" : "false") : t.value),
      (t = a),
      t !== s ? (n.setValue(t), !0) : !1
    );
  }
  function ve(t) {
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
  function Ee(t, n) {
    var s = n.checked;
    return U({}, n, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: s ?? t._wrapperState.initialChecked,
    });
  }
  function de(t, n) {
    var s = n.defaultValue == null ? "" : n.defaultValue,
      a = n.checked != null ? n.checked : n.defaultChecked;
    ((s = Q(n.value != null ? n.value : s)),
      (t._wrapperState = {
        initialChecked: a,
        initialValue: s,
        controlled:
          n.type === "checkbox" || n.type === "radio"
            ? n.checked != null
            : n.value != null,
      }));
  }
  function le(t, n) {
    ((n = n.checked), n != null && E(t, "checked", n, !1));
  }
  function ge(t, n) {
    le(t, n);
    var s = Q(n.value),
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
      ? Ne(t, n.type, s)
      : n.hasOwnProperty("defaultValue") && Ne(t, n.type, Q(n.defaultValue)),
      n.checked == null &&
        n.defaultChecked != null &&
        (t.defaultChecked = !!n.defaultChecked));
  }
  function ae(t, n, s) {
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
  function Ne(t, n, s) {
    (n !== "number" || ve(t.ownerDocument) !== t) &&
      (s == null
        ? (t.defaultValue = "" + t._wrapperState.initialValue)
        : t.defaultValue !== "" + s && (t.defaultValue = "" + s));
  }
  var Me = Array.isArray;
  function De(t, n, s, a) {
    if (((t = t.options), n)) {
      n = {};
      for (var d = 0; d < s.length; d++) n["$" + s[d]] = !0;
      for (s = 0; s < t.length; s++)
        ((d = n.hasOwnProperty("$" + t[s].value)),
          t[s].selected !== d && (t[s].selected = d),
          d && a && (t[s].defaultSelected = !0));
    } else {
      for (s = "" + Q(s), n = null, d = 0; d < t.length; d++) {
        if (t[d].value === s) {
          ((t[d].selected = !0), a && (t[d].defaultSelected = !0));
          return;
        }
        n !== null || t[d].disabled || (n = t[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function ze(t, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(o(91));
    return U({}, n, {
      value: void 0,
      defaultValue: void 0,
      children: "" + t._wrapperState.initialValue,
    });
  }
  function Ge(t, n) {
    var s = n.value;
    if (s == null) {
      if (((s = n.children), (n = n.defaultValue), s != null)) {
        if (n != null) throw Error(o(92));
        if (Me(s)) {
          if (1 < s.length) throw Error(o(93));
          s = s[0];
        }
        n = s;
      }
      (n == null && (n = ""), (s = n));
    }
    t._wrapperState = { initialValue: Q(s) };
  }
  function Rt(t, n) {
    var s = Q(n.value),
      a = Q(n.defaultValue);
    (s != null &&
      ((s = "" + s),
      s !== t.value && (t.value = s),
      n.defaultValue == null && t.defaultValue !== s && (t.defaultValue = s)),
      a != null && (t.defaultValue = "" + a));
  }
  function rt(t) {
    var n = t.textContent;
    n === t._wrapperState.initialValue &&
      n !== "" &&
      n !== null &&
      (t.value = n);
  }
  function qe(t) {
    switch (t) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function kt(t, n) {
    return t == null || t === "http://www.w3.org/1999/xhtml"
      ? qe(n)
      : t === "http://www.w3.org/2000/svg" && n === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : t;
  }
  var Ht,
    Cr = (function (t) {
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
          Ht = Ht || document.createElement("div"),
            Ht.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>",
            n = Ht.firstChild;
          t.firstChild;
        )
          t.removeChild(t.firstChild);
        for (; n.firstChild; ) t.appendChild(n.firstChild);
      }
    });
  function dn(t, n) {
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
    ta = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Zn).forEach(function (t) {
    ta.forEach(function (n) {
      ((n = n + t.charAt(0).toUpperCase() + t.substring(1)), (Zn[n] = Zn[t]));
    });
  });
  function Vs(t, n, s) {
    return n == null || typeof n == "boolean" || n === ""
      ? ""
      : s || typeof n != "number" || n === 0 || (Zn.hasOwnProperty(t) && Zn[t])
        ? ("" + n).trim()
        : n + "px";
  }
  function Ws(t, n) {
    t = t.style;
    for (var s in n)
      if (n.hasOwnProperty(s)) {
        var a = s.indexOf("--") === 0,
          d = Vs(s, n[s], a);
        (s === "float" && (s = "cssFloat"),
          a ? t.setProperty(s, d) : (t[s] = d));
      }
  }
  var na = U(
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
  function wo(t, n) {
    if (n) {
      if (na[t] && (n.children != null || n.dangerouslySetInnerHTML != null))
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
  function So(t, n) {
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
  var Eo = null;
  function ko(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var No = null,
    bn = null,
    _n = null;
  function Us(t) {
    if ((t = Qo(t))) {
      if (typeof No != "function") throw Error(o(280));
      var n = t.stateNode;
      n && ((n = Si(n)), No(t.stateNode, t.type, n));
    }
  }
  function Ys(t) {
    bn ? (_n ? _n.push(t) : (_n = [t])) : (bn = t);
  }
  function Xs() {
    if (bn) {
      var t = bn,
        n = _n;
      if (((_n = bn = null), Us(t), n)) for (t = 0; t < n.length; t++) Us(n[t]);
    }
  }
  function Ks(t, n) {
    return t(n);
  }
  function Qs() {}
  var Co = !1;
  function Gs(t, n, s) {
    if (Co) return t(n, s);
    Co = !0;
    try {
      return Ks(t, n, s);
    } finally {
      ((Co = !1), (bn !== null || _n !== null) && (Qs(), Xs()));
    }
  }
  function Jn(t, n) {
    var s = t.stateNode;
    if (s === null) return null;
    var a = Si(s);
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
  var bo = !1;
  if (f)
    try {
      var er = {};
      (Object.defineProperty(er, "passive", {
        get: function () {
          bo = !0;
        },
      }),
        window.addEventListener("test", er, er),
        window.removeEventListener("test", er, er));
    } catch {
      bo = !1;
    }
  function ra(t, n, s, a, d, g, N, T, O) {
    var ee = Array.prototype.slice.call(arguments, 3);
    try {
      n.apply(s, ee);
    } catch (ce) {
      this.onError(ce);
    }
  }
  var tr = !1,
    br = null,
    _r = !1,
    _o = null,
    oa = {
      onError: function (t) {
        ((tr = !0), (br = t));
      },
    };
  function sa(t, n, s, a, d, g, N, T, O) {
    ((tr = !1), (br = null), ra.apply(oa, arguments));
  }
  function ia(t, n, s, a, d, g, N, T, O) {
    if ((sa.apply(this, arguments), tr)) {
      if (tr) {
        var ee = br;
        ((tr = !1), (br = null));
      } else throw Error(o(198));
      _r || ((_r = !0), (_o = ee));
    }
  }
  function Jt(t) {
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
  function jo(t) {
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
  function Io(t) {
    if (Jt(t) !== t) throw Error(o(188));
  }
  function la(t) {
    var n = t.alternate;
    if (!n) {
      if (((n = Jt(t)), n === null)) throw Error(o(188));
      return n !== t ? null : t;
    }
    for (var s = t, a = n; ; ) {
      var d = s.return;
      if (d === null) break;
      var g = d.alternate;
      if (g === null) {
        if (((a = d.return), a !== null)) {
          s = a;
          continue;
        }
        break;
      }
      if (d.child === g.child) {
        for (g = d.child; g; ) {
          if (g === s) return (Io(d), t);
          if (g === a) return (Io(d), n);
          g = g.sibling;
        }
        throw Error(o(188));
      }
      if (s.return !== a.return) ((s = d), (a = g));
      else {
        for (var N = !1, T = d.child; T; ) {
          if (T === s) {
            ((N = !0), (s = d), (a = g));
            break;
          }
          if (T === a) {
            ((N = !0), (a = d), (s = g));
            break;
          }
          T = T.sibling;
        }
        if (!N) {
          for (T = g.child; T; ) {
            if (T === s) {
              ((N = !0), (s = g), (a = d));
              break;
            }
            if (T === a) {
              ((N = !0), (a = g), (s = d));
              break;
            }
            T = T.sibling;
          }
          if (!N) throw Error(o(189));
        }
      }
      if (s.alternate !== a) throw Error(o(190));
    }
    if (s.tag !== 3) throw Error(o(188));
    return s.stateNode.current === s ? t : n;
  }
  function qs(t) {
    return ((t = la(t)), t !== null ? Zs(t) : null);
  }
  function Zs(t) {
    if (t.tag === 5 || t.tag === 6) return t;
    for (t = t.child; t !== null; ) {
      var n = Zs(t);
      if (n !== null) return n;
      t = t.sibling;
    }
    return null;
  }
  var Js = r.unstable_scheduleCallback,
    ei = r.unstable_cancelCallback,
    aa = r.unstable_shouldYield,
    ti = r.unstable_requestPaint,
    Ue = r.unstable_now,
    ua = r.unstable_getCurrentPriorityLevel,
    Mo = r.unstable_ImmediatePriority,
    ni = r.unstable_UserBlockingPriority,
    jr = r.unstable_NormalPriority,
    ca = r.unstable_LowPriority,
    ri = r.unstable_IdlePriority,
    nr = null,
    Tt = null;
  function da(t) {
    if (Tt && typeof Tt.onCommitFiberRoot == "function")
      try {
        Tt.onCommitFiberRoot(nr, t, void 0, (t.current.flags & 128) === 128);
      } catch {}
  }
  var Nt = Math.clz32 ? Math.clz32 : pa,
    fa = Math.log,
    ha = Math.LN2;
  function pa(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((fa(t) / ha) | 0)) | 0);
  }
  var Ir = 64,
    Mr = 4194304;
  function en(t) {
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
  function Pr(t, n) {
    var s = t.pendingLanes;
    if (s === 0) return 0;
    var a = 0,
      d = t.suspendedLanes,
      g = t.pingedLanes,
      N = s & 268435455;
    if (N !== 0) {
      var T = N & ~d;
      T !== 0 ? (a = en(T)) : ((g &= N), g !== 0 && (a = en(g)));
    } else ((N = s & ~d), N !== 0 ? (a = en(N)) : g !== 0 && (a = en(g)));
    if (a === 0) return 0;
    if (
      n !== 0 &&
      n !== a &&
      (n & d) === 0 &&
      ((d = a & -a), (g = n & -n), d >= g || (d === 16 && (g & 4194240) !== 0))
    )
      return n;
    if (((a & 4) !== 0 && (a |= s & 16), (n = t.entangledLanes), n !== 0))
      for (t = t.entanglements, n &= a; 0 < n; )
        ((s = 31 - Nt(n)), (d = 1 << s), (a |= t[s]), (n &= ~d));
    return a;
  }
  function oi(t, n) {
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
  function ma(t, n) {
    for (
      var s = t.suspendedLanes,
        a = t.pingedLanes,
        d = t.expirationTimes,
        g = t.pendingLanes;
      0 < g;
    ) {
      var N = 31 - Nt(g),
        T = 1 << N,
        O = d[N];
      (O === -1
        ? ((T & s) === 0 || (T & a) !== 0) && (d[N] = oi(T, n))
        : O <= n && (t.expiredLanes |= T),
        (g &= ~T));
    }
  }
  function Po(t) {
    return (
      (t = t.pendingLanes & -1073741825),
      t !== 0 ? t : t & 1073741824 ? 1073741824 : 0
    );
  }
  function Rr() {
    var t = Ir;
    return ((Ir <<= 1), (Ir & 4194240) === 0 && (Ir = 64), t);
  }
  function Ro(t) {
    for (var n = [], s = 0; 31 > s; s++) n.push(t);
    return n;
  }
  function rr(t, n, s) {
    ((t.pendingLanes |= n),
      n !== 536870912 && ((t.suspendedLanes = 0), (t.pingedLanes = 0)),
      (t = t.eventTimes),
      (n = 31 - Nt(n)),
      (t[n] = s));
  }
  function si(t, n) {
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
      var d = 31 - Nt(s),
        g = 1 << d;
      ((n[d] = 0), (a[d] = -1), (t[d] = -1), (s &= ~g));
    }
  }
  function ga(t, n) {
    var s = (t.entangledLanes |= n);
    for (t = t.entanglements; s; ) {
      var a = 31 - Nt(s),
        d = 1 << a;
      ((d & n) | (t[a] & n) && (t[a] |= n), (s &= ~d));
    }
  }
  var Ae = 0;
  function hd(t) {
    return (
      (t &= -t),
      1 < t ? (4 < t ? ((t & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var pd,
    ya,
    md,
    gd,
    yd,
    va = !1,
    ii = [],
    jn = null,
    In = null,
    Mn = null,
    To = new Map(),
    Lo = new Map(),
    Pn = [],
    jg =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " "
      );
  function vd(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        jn = null;
        break;
      case "dragenter":
      case "dragleave":
        In = null;
        break;
      case "mouseover":
      case "mouseout":
        Mn = null;
        break;
      case "pointerover":
      case "pointerout":
        To.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Lo.delete(n.pointerId);
    }
  }
  function zo(t, n, s, a, d, g) {
    return t === null || t.nativeEvent !== g
      ? ((t = {
          blockedOn: n,
          domEventName: s,
          eventSystemFlags: a,
          nativeEvent: g,
          targetContainers: [d],
        }),
        n !== null && ((n = Qo(n)), n !== null && ya(n)),
        t)
      : ((t.eventSystemFlags |= a),
        (n = t.targetContainers),
        d !== null && n.indexOf(d) === -1 && n.push(d),
        t);
  }
  function Ig(t, n, s, a, d) {
    switch (n) {
      case "focusin":
        return ((jn = zo(jn, t, n, s, a, d)), !0);
      case "dragenter":
        return ((In = zo(In, t, n, s, a, d)), !0);
      case "mouseover":
        return ((Mn = zo(Mn, t, n, s, a, d)), !0);
      case "pointerover":
        var g = d.pointerId;
        return (To.set(g, zo(To.get(g) || null, t, n, s, a, d)), !0);
      case "gotpointercapture":
        return (
          (g = d.pointerId),
          Lo.set(g, zo(Lo.get(g) || null, t, n, s, a, d)),
          !0
        );
    }
    return !1;
  }
  function xd(t) {
    var n = or(t.target);
    if (n !== null) {
      var s = Jt(n);
      if (s !== null) {
        if (((n = s.tag), n === 13)) {
          if (((n = jo(s)), n !== null)) {
            ((t.blockedOn = n),
              yd(t.priority, function () {
                md(s);
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
  function li(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var s = wa(t.domEventName, t.eventSystemFlags, n[0], t.nativeEvent);
      if (s === null) {
        s = t.nativeEvent;
        var a = new s.constructor(s.type, s);
        ((Eo = a), s.target.dispatchEvent(a), (Eo = null));
      } else return ((n = Qo(s)), n !== null && ya(n), (t.blockedOn = s), !1);
      n.shift();
    }
    return !0;
  }
  function wd(t, n, s) {
    li(t) && s.delete(n);
  }
  function Mg() {
    ((va = !1),
      jn !== null && li(jn) && (jn = null),
      In !== null && li(In) && (In = null),
      Mn !== null && li(Mn) && (Mn = null),
      To.forEach(wd),
      Lo.forEach(wd));
  }
  function Ao(t, n) {
    t.blockedOn === n &&
      ((t.blockedOn = null),
      va ||
        ((va = !0),
        r.unstable_scheduleCallback(r.unstable_NormalPriority, Mg)));
  }
  function $o(t) {
    function n(d) {
      return Ao(d, t);
    }
    if (0 < ii.length) {
      Ao(ii[0], t);
      for (var s = 1; s < ii.length; s++) {
        var a = ii[s];
        a.blockedOn === t && (a.blockedOn = null);
      }
    }
    for (
      jn !== null && Ao(jn, t),
        In !== null && Ao(In, t),
        Mn !== null && Ao(Mn, t),
        To.forEach(n),
        Lo.forEach(n),
        s = 0;
      s < Pn.length;
      s++
    )
      ((a = Pn[s]), a.blockedOn === t && (a.blockedOn = null));
    for (; 0 < Pn.length && ((s = Pn[0]), s.blockedOn === null); )
      (xd(s), s.blockedOn === null && Pn.shift());
  }
  var Tr = j.ReactCurrentBatchConfig,
    ai = !0;
  function Pg(t, n, s, a) {
    var d = Ae,
      g = Tr.transition;
    Tr.transition = null;
    try {
      ((Ae = 1), xa(t, n, s, a));
    } finally {
      ((Ae = d), (Tr.transition = g));
    }
  }
  function Rg(t, n, s, a) {
    var d = Ae,
      g = Tr.transition;
    Tr.transition = null;
    try {
      ((Ae = 4), xa(t, n, s, a));
    } finally {
      ((Ae = d), (Tr.transition = g));
    }
  }
  function xa(t, n, s, a) {
    if (ai) {
      var d = wa(t, n, s, a);
      if (d === null) ($a(t, n, a, ui, s), vd(t, a));
      else if (Ig(d, t, n, s, a)) a.stopPropagation();
      else if ((vd(t, a), n & 4 && -1 < jg.indexOf(t))) {
        for (; d !== null; ) {
          var g = Qo(d);
          if (
            (g !== null && pd(g),
            (g = wa(t, n, s, a)),
            g === null && $a(t, n, a, ui, s),
            g === d)
          )
            break;
          d = g;
        }
        d !== null && a.stopPropagation();
      } else $a(t, n, a, null, s);
    }
  }
  var ui = null;
  function wa(t, n, s, a) {
    if (((ui = null), (t = ko(a)), (t = or(t)), t !== null))
      if (((n = Jt(t)), n === null)) t = null;
      else if (((s = n.tag), s === 13)) {
        if (((t = jo(n)), t !== null)) return t;
        t = null;
      } else if (s === 3) {
        if (n.stateNode.current.memoizedState.isDehydrated)
          return n.tag === 3 ? n.stateNode.containerInfo : null;
        t = null;
      } else n !== t && (t = null);
    return ((ui = t), null);
  }
  function Sd(t) {
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
        switch (ua()) {
          case Mo:
            return 1;
          case ni:
            return 4;
          case jr:
          case ca:
            return 16;
          case ri:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Rn = null,
    Sa = null,
    ci = null;
  function Ed() {
    if (ci) return ci;
    var t,
      n = Sa,
      s = n.length,
      a,
      d = "value" in Rn ? Rn.value : Rn.textContent,
      g = d.length;
    for (t = 0; t < s && n[t] === d[t]; t++);
    var N = s - t;
    for (a = 1; a <= N && n[s - a] === d[g - a]; a++);
    return (ci = d.slice(t, 1 < a ? 1 - a : void 0));
  }
  function di(t) {
    var n = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && n === 13 && (t = 13))
        : (t = n),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function fi() {
    return !0;
  }
  function kd() {
    return !1;
  }
  function Ct(t) {
    function n(s, a, d, g, N) {
      ((this._reactName = s),
        (this._targetInst = d),
        (this.type = a),
        (this.nativeEvent = g),
        (this.target = N),
        (this.currentTarget = null));
      for (var T in t)
        t.hasOwnProperty(T) && ((s = t[T]), (this[T] = s ? s(g) : g[T]));
      return (
        (this.isDefaultPrevented = (
          g.defaultPrevented != null ? g.defaultPrevented : g.returnValue === !1
        )
          ? fi
          : kd),
        (this.isPropagationStopped = kd),
        this
      );
    }
    return (
      U(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var s = this.nativeEvent;
          s &&
            (s.preventDefault
              ? s.preventDefault()
              : typeof s.returnValue != "unknown" && (s.returnValue = !1),
            (this.isDefaultPrevented = fi));
        },
        stopPropagation: function () {
          var s = this.nativeEvent;
          s &&
            (s.stopPropagation
              ? s.stopPropagation()
              : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0),
            (this.isPropagationStopped = fi));
        },
        persist: function () {},
        isPersistent: fi,
      }),
      n
    );
  }
  var Lr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ea = Ct(Lr),
    Do = U({}, Lr, { view: 0, detail: 0 }),
    Tg = Ct(Do),
    ka,
    Na,
    Oo,
    hi = U({}, Do, {
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
      getModifierState: ba,
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
          : (t !== Oo &&
              (Oo && t.type === "mousemove"
                ? ((ka = t.screenX - Oo.screenX), (Na = t.screenY - Oo.screenY))
                : (Na = ka = 0),
              (Oo = t)),
            ka);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : Na;
      },
    }),
    Nd = Ct(hi),
    Lg = U({}, hi, { dataTransfer: 0 }),
    zg = Ct(Lg),
    Ag = U({}, Do, { relatedTarget: 0 }),
    Ca = Ct(Ag),
    $g = U({}, Lr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Dg = Ct($g),
    Og = U({}, Lr, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    Fg = Ct(Og),
    Hg = U({}, Lr, { data: 0 }),
    Cd = Ct(Hg),
    Bg = {
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
    Vg = {
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
    Wg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Ug(t) {
    var n = this.nativeEvent;
    return n.getModifierState
      ? n.getModifierState(t)
      : (t = Wg[t])
        ? !!n[t]
        : !1;
  }
  function ba() {
    return Ug;
  }
  var Yg = U({}, Do, {
      key: function (t) {
        if (t.key) {
          var n = Bg[t.key] || t.key;
          if (n !== "Unidentified") return n;
        }
        return t.type === "keypress"
          ? ((t = di(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? Vg[t.keyCode] || "Unidentified"
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
      getModifierState: ba,
      charCode: function (t) {
        return t.type === "keypress" ? di(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? di(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    Xg = Ct(Yg),
    Kg = U({}, hi, {
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
    bd = Ct(Kg),
    Qg = U({}, Do, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ba,
    }),
    Gg = Ct(Qg),
    qg = U({}, Lr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Zg = Ct(qg),
    Jg = U({}, hi, {
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
    ey = Ct(Jg),
    ty = [9, 13, 27, 32],
    _a = f && "CompositionEvent" in window,
    Fo = null;
  f && "documentMode" in document && (Fo = document.documentMode);
  var ny = f && "TextEvent" in window && !Fo,
    _d = f && (!_a || (Fo && 8 < Fo && 11 >= Fo)),
    jd = " ",
    Id = !1;
  function Md(t, n) {
    switch (t) {
      case "keyup":
        return ty.indexOf(n.keyCode) !== -1;
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
  function Pd(t) {
    return (
      (t = t.detail),
      typeof t == "object" && "data" in t ? t.data : null
    );
  }
  var zr = !1;
  function ry(t, n) {
    switch (t) {
      case "compositionend":
        return Pd(n);
      case "keypress":
        return n.which !== 32 ? null : ((Id = !0), jd);
      case "textInput":
        return ((t = n.data), t === jd && Id ? null : t);
      default:
        return null;
    }
  }
  function oy(t, n) {
    if (zr)
      return t === "compositionend" || (!_a && Md(t, n))
        ? ((t = Ed()), (ci = Sa = Rn = null), (zr = !1), t)
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
        return _d && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var sy = {
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
  function Rd(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!sy[t.type] : n === "textarea";
  }
  function Td(t, n, s, a) {
    (Ys(a),
      (n = vi(n, "onChange")),
      0 < n.length &&
        ((s = new Ea("onChange", "change", null, s, a)),
        t.push({ event: s, listeners: n })));
  }
  var Ho = null,
    Bo = null;
  function iy(t) {
    qd(t, 0);
  }
  function pi(t) {
    var n = Fr(t);
    if (ye(n)) return t;
  }
  function ly(t, n) {
    if (t === "change") return n;
  }
  var Ld = !1;
  if (f) {
    var ja;
    if (f) {
      var Ia = "oninput" in document;
      if (!Ia) {
        var zd = document.createElement("div");
        (zd.setAttribute("oninput", "return;"),
          (Ia = typeof zd.oninput == "function"));
      }
      ja = Ia;
    } else ja = !1;
    Ld = ja && (!document.documentMode || 9 < document.documentMode);
  }
  function Ad() {
    Ho && (Ho.detachEvent("onpropertychange", $d), (Bo = Ho = null));
  }
  function $d(t) {
    if (t.propertyName === "value" && pi(Bo)) {
      var n = [];
      (Td(n, Bo, t, ko(t)), Gs(iy, n));
    }
  }
  function ay(t, n, s) {
    t === "focusin"
      ? (Ad(), (Ho = n), (Bo = s), Ho.attachEvent("onpropertychange", $d))
      : t === "focusout" && Ad();
  }
  function uy(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return pi(Bo);
  }
  function cy(t, n) {
    if (t === "click") return pi(n);
  }
  function dy(t, n) {
    if (t === "input" || t === "change") return pi(n);
  }
  function fy(t, n) {
    return (t === n && (t !== 0 || 1 / t === 1 / n)) || (t !== t && n !== n);
  }
  var Bt = typeof Object.is == "function" ? Object.is : fy;
  function Vo(t, n) {
    if (Bt(t, n)) return !0;
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
      if (!h.call(n, d) || !Bt(t[d], n[d])) return !1;
    }
    return !0;
  }
  function Dd(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Od(t, n) {
    var s = Dd(t);
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
      s = Dd(s);
    }
  }
  function Fd(t, n) {
    return t && n
      ? t === n
        ? !0
        : t && t.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? Fd(t, n.parentNode)
            : "contains" in t
              ? t.contains(n)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function Hd() {
    for (var t = window, n = ve(); n instanceof t.HTMLIFrameElement; ) {
      try {
        var s = typeof n.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) t = n.contentWindow;
      else break;
      n = ve(t.document);
    }
    return n;
  }
  function Ma(t) {
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
  function hy(t) {
    var n = Hd(),
      s = t.focusedElem,
      a = t.selectionRange;
    if (
      n !== s &&
      s &&
      s.ownerDocument &&
      Fd(s.ownerDocument.documentElement, s)
    ) {
      if (a !== null && Ma(s)) {
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
            g = Math.min(a.start, d);
          ((a = a.end === void 0 ? g : Math.min(a.end, d)),
            !t.extend && g > a && ((d = a), (a = g), (g = d)),
            (d = Od(s, g)));
          var N = Od(s, a);
          d &&
            N &&
            (t.rangeCount !== 1 ||
              t.anchorNode !== d.node ||
              t.anchorOffset !== d.offset ||
              t.focusNode !== N.node ||
              t.focusOffset !== N.offset) &&
            ((n = n.createRange()),
            n.setStart(d.node, d.offset),
            t.removeAllRanges(),
            g > a
              ? (t.addRange(n), t.extend(N.node, N.offset))
              : (n.setEnd(N.node, N.offset), t.addRange(n)));
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
  var py = f && "documentMode" in document && 11 >= document.documentMode,
    Ar = null,
    Pa = null,
    Wo = null,
    Ra = !1;
  function Bd(t, n, s) {
    var a =
      s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Ra ||
      Ar == null ||
      Ar !== ve(a) ||
      ((a = Ar),
      "selectionStart" in a && Ma(a)
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
      (Wo && Vo(Wo, a)) ||
        ((Wo = a),
        (a = vi(Pa, "onSelect")),
        0 < a.length &&
          ((n = new Ea("onSelect", "select", null, n, s)),
          t.push({ event: n, listeners: a }),
          (n.target = Ar))));
  }
  function mi(t, n) {
    var s = {};
    return (
      (s[t.toLowerCase()] = n.toLowerCase()),
      (s["Webkit" + t] = "webkit" + n),
      (s["Moz" + t] = "moz" + n),
      s
    );
  }
  var $r = {
      animationend: mi("Animation", "AnimationEnd"),
      animationiteration: mi("Animation", "AnimationIteration"),
      animationstart: mi("Animation", "AnimationStart"),
      transitionend: mi("Transition", "TransitionEnd"),
    },
    Ta = {},
    Vd = {};
  f &&
    ((Vd = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete $r.animationend.animation,
      delete $r.animationiteration.animation,
      delete $r.animationstart.animation),
    "TransitionEvent" in window || delete $r.transitionend.transition);
  function gi(t) {
    if (Ta[t]) return Ta[t];
    if (!$r[t]) return t;
    var n = $r[t],
      s;
    for (s in n) if (n.hasOwnProperty(s) && s in Vd) return (Ta[t] = n[s]);
    return t;
  }
  var Wd = gi("animationend"),
    Ud = gi("animationiteration"),
    Yd = gi("animationstart"),
    Xd = gi("transitionend"),
    Kd = new Map(),
    Qd =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  function Tn(t, n) {
    (Kd.set(t, n), u(n, [t]));
  }
  for (var La = 0; La < Qd.length; La++) {
    var za = Qd[La],
      my = za.toLowerCase(),
      gy = za[0].toUpperCase() + za.slice(1);
    Tn(my, "on" + gy);
  }
  (Tn(Wd, "onAnimationEnd"),
    Tn(Ud, "onAnimationIteration"),
    Tn(Yd, "onAnimationStart"),
    Tn("dblclick", "onDoubleClick"),
    Tn("focusin", "onFocus"),
    Tn("focusout", "onBlur"),
    Tn(Xd, "onTransitionEnd"),
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
  var Uo =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    yy = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Uo)
    );
  function Gd(t, n, s) {
    var a = t.type || "unknown-event";
    ((t.currentTarget = s), ia(a, n, void 0, t), (t.currentTarget = null));
  }
  function qd(t, n) {
    n = (n & 4) !== 0;
    for (var s = 0; s < t.length; s++) {
      var a = t[s],
        d = a.event;
      a = a.listeners;
      e: {
        var g = void 0;
        if (n)
          for (var N = a.length - 1; 0 <= N; N--) {
            var T = a[N],
              O = T.instance,
              ee = T.currentTarget;
            if (((T = T.listener), O !== g && d.isPropagationStopped()))
              break e;
            (Gd(d, T, ee), (g = O));
          }
        else
          for (N = 0; N < a.length; N++) {
            if (
              ((T = a[N]),
              (O = T.instance),
              (ee = T.currentTarget),
              (T = T.listener),
              O !== g && d.isPropagationStopped())
            )
              break e;
            (Gd(d, T, ee), (g = O));
          }
      }
    }
    if (_r) throw ((t = _o), (_r = !1), (_o = null), t);
  }
  function Oe(t, n) {
    var s = n[Va];
    s === void 0 && (s = n[Va] = new Set());
    var a = t + "__bubble";
    s.has(a) || (Zd(n, t, 2, !1), s.add(a));
  }
  function Aa(t, n, s) {
    var a = 0;
    (n && (a |= 4), Zd(s, t, a, n));
  }
  var yi = "_reactListening" + Math.random().toString(36).slice(2);
  function Yo(t) {
    if (!t[yi]) {
      ((t[yi] = !0),
        i.forEach(function (s) {
          s !== "selectionchange" && (yy.has(s) || Aa(s, !1, t), Aa(s, !0, t));
        }));
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[yi] || ((n[yi] = !0), Aa("selectionchange", !1, n));
    }
  }
  function Zd(t, n, s, a) {
    switch (Sd(n)) {
      case 1:
        var d = Pg;
        break;
      case 4:
        d = Rg;
        break;
      default:
        d = xa;
    }
    ((s = d.bind(null, n, s, t)),
      (d = void 0),
      !bo ||
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
  function $a(t, n, s, a, d) {
    var g = a;
    if ((n & 1) === 0 && (n & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var N = a.tag;
        if (N === 3 || N === 4) {
          var T = a.stateNode.containerInfo;
          if (T === d || (T.nodeType === 8 && T.parentNode === d)) break;
          if (N === 4)
            for (N = a.return; N !== null; ) {
              var O = N.tag;
              if (
                (O === 3 || O === 4) &&
                ((O = N.stateNode.containerInfo),
                O === d || (O.nodeType === 8 && O.parentNode === d))
              )
                return;
              N = N.return;
            }
          for (; T !== null; ) {
            if (((N = or(T)), N === null)) return;
            if (((O = N.tag), O === 5 || O === 6)) {
              a = g = N;
              continue e;
            }
            T = T.parentNode;
          }
        }
        a = a.return;
      }
    Gs(function () {
      var ee = g,
        ce = ko(s),
        he = [];
      e: {
        var ue = Kd.get(t);
        if (ue !== void 0) {
          var xe = Ea,
            Se = t;
          switch (t) {
            case "keypress":
              if (di(s) === 0) break e;
            case "keydown":
            case "keyup":
              xe = Xg;
              break;
            case "focusin":
              ((Se = "focus"), (xe = Ca));
              break;
            case "focusout":
              ((Se = "blur"), (xe = Ca));
              break;
            case "beforeblur":
            case "afterblur":
              xe = Ca;
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
              xe = Nd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              xe = zg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              xe = Gg;
              break;
            case Wd:
            case Ud:
            case Yd:
              xe = Dg;
              break;
            case Xd:
              xe = Zg;
              break;
            case "scroll":
              xe = Tg;
              break;
            case "wheel":
              xe = ey;
              break;
            case "copy":
            case "cut":
            case "paste":
              xe = Fg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              xe = bd;
          }
          var ke = (n & 4) !== 0,
            Qe = !ke && t === "scroll",
            q = ke ? (ue !== null ? ue + "Capture" : null) : ue;
          ke = [];
          for (var W = ee, J; W !== null; ) {
            J = W;
            var pe = J.stateNode;
            if (
              (J.tag === 5 &&
                pe !== null &&
                ((J = pe),
                q !== null &&
                  ((pe = Jn(W, q)), pe != null && ke.push(Xo(W, pe, J)))),
              Qe)
            )
              break;
            W = W.return;
          }
          0 < ke.length &&
            ((ue = new xe(ue, Se, null, s, ce)),
            he.push({ event: ue, listeners: ke }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((ue = t === "mouseover" || t === "pointerover"),
            (xe = t === "mouseout" || t === "pointerout"),
            ue &&
              s !== Eo &&
              (Se = s.relatedTarget || s.fromElement) &&
              (or(Se) || Se[fn]))
          )
            break e;
          if (
            (xe || ue) &&
            ((ue =
              ce.window === ce
                ? ce
                : (ue = ce.ownerDocument)
                  ? ue.defaultView || ue.parentWindow
                  : window),
            xe
              ? ((Se = s.relatedTarget || s.toElement),
                (xe = ee),
                (Se = Se ? or(Se) : null),
                Se !== null &&
                  ((Qe = Jt(Se)),
                  Se !== Qe || (Se.tag !== 5 && Se.tag !== 6)) &&
                  (Se = null))
              : ((xe = null), (Se = ee)),
            xe !== Se)
          ) {
            if (
              ((ke = Nd),
              (pe = "onMouseLeave"),
              (q = "onMouseEnter"),
              (W = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((ke = bd),
                (pe = "onPointerLeave"),
                (q = "onPointerEnter"),
                (W = "pointer")),
              (Qe = xe == null ? ue : Fr(xe)),
              (J = Se == null ? ue : Fr(Se)),
              (ue = new ke(pe, W + "leave", xe, s, ce)),
              (ue.target = Qe),
              (ue.relatedTarget = J),
              (pe = null),
              or(ce) === ee &&
                ((ke = new ke(q, W + "enter", Se, s, ce)),
                (ke.target = J),
                (ke.relatedTarget = Qe),
                (pe = ke)),
              (Qe = pe),
              xe && Se)
            )
              t: {
                for (ke = xe, q = Se, W = 0, J = ke; J; J = Dr(J)) W++;
                for (J = 0, pe = q; pe; pe = Dr(pe)) J++;
                for (; 0 < W - J; ) ((ke = Dr(ke)), W--);
                for (; 0 < J - W; ) ((q = Dr(q)), J--);
                for (; W--; ) {
                  if (ke === q || (q !== null && ke === q.alternate)) break t;
                  ((ke = Dr(ke)), (q = Dr(q)));
                }
                ke = null;
              }
            else ke = null;
            (xe !== null && Jd(he, ue, xe, ke, !1),
              Se !== null && Qe !== null && Jd(he, Qe, Se, ke, !0));
          }
        }
        e: {
          if (
            ((ue = ee ? Fr(ee) : window),
            (xe = ue.nodeName && ue.nodeName.toLowerCase()),
            xe === "select" || (xe === "input" && ue.type === "file"))
          )
            var Ce = ly;
          else if (Rd(ue))
            if (Ld) Ce = dy;
            else {
              Ce = uy;
              var _e = ay;
            }
          else
            (xe = ue.nodeName) &&
              xe.toLowerCase() === "input" &&
              (ue.type === "checkbox" || ue.type === "radio") &&
              (Ce = cy);
          if (Ce && (Ce = Ce(t, ee))) {
            Td(he, Ce, s, ce);
            break e;
          }
          (_e && _e(t, ue, ee),
            t === "focusout" &&
              (_e = ue._wrapperState) &&
              _e.controlled &&
              ue.type === "number" &&
              Ne(ue, "number", ue.value));
        }
        switch (((_e = ee ? Fr(ee) : window), t)) {
          case "focusin":
            (Rd(_e) || _e.contentEditable === "true") &&
              ((Ar = _e), (Pa = ee), (Wo = null));
            break;
          case "focusout":
            Wo = Pa = Ar = null;
            break;
          case "mousedown":
            Ra = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Ra = !1), Bd(he, s, ce));
            break;
          case "selectionchange":
            if (py) break;
          case "keydown":
          case "keyup":
            Bd(he, s, ce);
        }
        var je;
        if (_a)
          e: {
            switch (t) {
              case "compositionstart":
                var Ie = "onCompositionStart";
                break e;
              case "compositionend":
                Ie = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ie = "onCompositionUpdate";
                break e;
            }
            Ie = void 0;
          }
        else
          zr
            ? Md(t, s) && (Ie = "onCompositionEnd")
            : t === "keydown" &&
              s.keyCode === 229 &&
              (Ie = "onCompositionStart");
        (Ie &&
          (_d &&
            s.locale !== "ko" &&
            (zr || Ie !== "onCompositionStart"
              ? Ie === "onCompositionEnd" && zr && (je = Ed())
              : ((Rn = ce),
                (Sa = "value" in Rn ? Rn.value : Rn.textContent),
                (zr = !0))),
          (_e = vi(ee, Ie)),
          0 < _e.length &&
            ((Ie = new Cd(Ie, t, null, s, ce)),
            he.push({ event: Ie, listeners: _e }),
            je
              ? (Ie.data = je)
              : ((je = Pd(s)), je !== null && (Ie.data = je)))),
          (je = ny ? ry(t, s) : oy(t, s)) &&
            ((ee = vi(ee, "onBeforeInput")),
            0 < ee.length &&
              ((ce = new Cd("onBeforeInput", "beforeinput", null, s, ce)),
              he.push({ event: ce, listeners: ee }),
              (ce.data = je))));
      }
      qd(he, n);
    });
  }
  function Xo(t, n, s) {
    return { instance: t, listener: n, currentTarget: s };
  }
  function vi(t, n) {
    for (var s = n + "Capture", a = []; t !== null; ) {
      var d = t,
        g = d.stateNode;
      (d.tag === 5 &&
        g !== null &&
        ((d = g),
        (g = Jn(t, s)),
        g != null && a.unshift(Xo(t, g, d)),
        (g = Jn(t, n)),
        g != null && a.push(Xo(t, g, d))),
        (t = t.return));
    }
    return a;
  }
  function Dr(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5);
    return t || null;
  }
  function Jd(t, n, s, a, d) {
    for (var g = n._reactName, N = []; s !== null && s !== a; ) {
      var T = s,
        O = T.alternate,
        ee = T.stateNode;
      if (O !== null && O === a) break;
      (T.tag === 5 &&
        ee !== null &&
        ((T = ee),
        d
          ? ((O = Jn(s, g)), O != null && N.unshift(Xo(s, O, T)))
          : d || ((O = Jn(s, g)), O != null && N.push(Xo(s, O, T)))),
        (s = s.return));
    }
    N.length !== 0 && t.push({ event: n, listeners: N });
  }
  var vy = /\r\n?/g,
    xy = /\u0000|\uFFFD/g;
  function ef(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        vy,
        `
`
      )
      .replace(xy, "");
  }
  function xi(t, n, s) {
    if (((n = ef(n)), ef(t) !== n && s)) throw Error(o(425));
  }
  function wi() {}
  var Da = null,
    Oa = null;
  function Fa(t, n) {
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
  var Ha = typeof setTimeout == "function" ? setTimeout : void 0,
    wy = typeof clearTimeout == "function" ? clearTimeout : void 0,
    tf = typeof Promise == "function" ? Promise : void 0,
    Sy =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof tf < "u"
          ? function (t) {
              return tf.resolve(null).then(t).catch(Ey);
            }
          : Ha;
  function Ey(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Ba(t, n) {
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
  function Ln(t) {
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
  function nf(t) {
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
  var Or = Math.random().toString(36).slice(2),
    tn = "__reactFiber$" + Or,
    Ko = "__reactProps$" + Or,
    fn = "__reactContainer$" + Or,
    Va = "__reactEvents$" + Or,
    ky = "__reactListeners$" + Or,
    Ny = "__reactHandles$" + Or;
  function or(t) {
    var n = t[tn];
    if (n) return n;
    for (var s = t.parentNode; s; ) {
      if ((n = s[fn] || s[tn])) {
        if (
          ((s = n.alternate),
          n.child !== null || (s !== null && s.child !== null))
        )
          for (t = nf(t); t !== null; ) {
            if ((s = t[tn])) return s;
            t = nf(t);
          }
        return n;
      }
      ((t = s), (s = t.parentNode));
    }
    return null;
  }
  function Qo(t) {
    return (
      (t = t[tn] || t[fn]),
      !t || (t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3)
        ? null
        : t
    );
  }
  function Fr(t) {
    if (t.tag === 5 || t.tag === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Si(t) {
    return t[Ko] || null;
  }
  var Wa = [],
    Hr = -1;
  function zn(t) {
    return { current: t };
  }
  function Fe(t) {
    0 > Hr || ((t.current = Wa[Hr]), (Wa[Hr] = null), Hr--);
  }
  function $e(t, n) {
    (Hr++, (Wa[Hr] = t.current), (t.current = n));
  }
  var An = {},
    ct = zn(An),
    gt = zn(!1),
    sr = An;
  function Br(t, n) {
    var s = t.type.contextTypes;
    if (!s) return An;
    var a = t.stateNode;
    if (a && a.__reactInternalMemoizedUnmaskedChildContext === n)
      return a.__reactInternalMemoizedMaskedChildContext;
    var d = {},
      g;
    for (g in s) d[g] = n[g];
    return (
      a &&
        ((t = t.stateNode),
        (t.__reactInternalMemoizedUnmaskedChildContext = n),
        (t.__reactInternalMemoizedMaskedChildContext = d)),
      d
    );
  }
  function yt(t) {
    return ((t = t.childContextTypes), t != null);
  }
  function Ei() {
    (Fe(gt), Fe(ct));
  }
  function rf(t, n, s) {
    if (ct.current !== An) throw Error(o(168));
    ($e(ct, n), $e(gt, s));
  }
  function of(t, n, s) {
    var a = t.stateNode;
    if (((n = n.childContextTypes), typeof a.getChildContext != "function"))
      return s;
    a = a.getChildContext();
    for (var d in a) if (!(d in n)) throw Error(o(108, re(t) || "Unknown", d));
    return U({}, s, a);
  }
  function ki(t) {
    return (
      (t =
        ((t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext) ||
        An),
      (sr = ct.current),
      $e(ct, t),
      $e(gt, gt.current),
      !0
    );
  }
  function sf(t, n, s) {
    var a = t.stateNode;
    if (!a) throw Error(o(169));
    (s
      ? ((t = of(t, n, sr)),
        (a.__reactInternalMemoizedMergedChildContext = t),
        Fe(gt),
        Fe(ct),
        $e(ct, t))
      : Fe(gt),
      $e(gt, s));
  }
  var hn = null,
    Ni = !1,
    Ua = !1;
  function lf(t) {
    hn === null ? (hn = [t]) : hn.push(t);
  }
  function Cy(t) {
    ((Ni = !0), lf(t));
  }
  function $n() {
    if (!Ua && hn !== null) {
      Ua = !0;
      var t = 0,
        n = Ae;
      try {
        var s = hn;
        for (Ae = 1; t < s.length; t++) {
          var a = s[t];
          do a = a(!0);
          while (a !== null);
        }
        ((hn = null), (Ni = !1));
      } catch (d) {
        throw (hn !== null && (hn = hn.slice(t + 1)), Js(Mo, $n), d);
      } finally {
        ((Ae = n), (Ua = !1));
      }
    }
    return null;
  }
  var Vr = [],
    Wr = 0,
    Ci = null,
    bi = 0,
    Lt = [],
    zt = 0,
    ir = null,
    pn = 1,
    mn = "";
  function lr(t, n) {
    ((Vr[Wr++] = bi), (Vr[Wr++] = Ci), (Ci = t), (bi = n));
  }
  function af(t, n, s) {
    ((Lt[zt++] = pn), (Lt[zt++] = mn), (Lt[zt++] = ir), (ir = t));
    var a = pn;
    t = mn;
    var d = 32 - Nt(a) - 1;
    ((a &= ~(1 << d)), (s += 1));
    var g = 32 - Nt(n) + d;
    if (30 < g) {
      var N = d - (d % 5);
      ((g = (a & ((1 << N) - 1)).toString(32)),
        (a >>= N),
        (d -= N),
        (pn = (1 << (32 - Nt(n) + d)) | (s << d) | a),
        (mn = g + t));
    } else ((pn = (1 << g) | (s << d) | a), (mn = t));
  }
  function Ya(t) {
    t.return !== null && (lr(t, 1), af(t, 1, 0));
  }
  function Xa(t) {
    for (; t === Ci; )
      ((Ci = Vr[--Wr]), (Vr[Wr] = null), (bi = Vr[--Wr]), (Vr[Wr] = null));
    for (; t === ir; )
      ((ir = Lt[--zt]),
        (Lt[zt] = null),
        (mn = Lt[--zt]),
        (Lt[zt] = null),
        (pn = Lt[--zt]),
        (Lt[zt] = null));
  }
  var bt = null,
    _t = null,
    He = !1,
    Vt = null;
  function uf(t, n) {
    var s = Ot(5, null, null, 0);
    ((s.elementType = "DELETED"),
      (s.stateNode = n),
      (s.return = t),
      (n = t.deletions),
      n === null ? ((t.deletions = [s]), (t.flags |= 16)) : n.push(s));
  }
  function cf(t, n) {
    switch (t.tag) {
      case 5:
        var s = t.type;
        return (
          (n =
            n.nodeType !== 1 || s.toLowerCase() !== n.nodeName.toLowerCase()
              ? null
              : n),
          n !== null
            ? ((t.stateNode = n), (bt = t), (_t = Ln(n.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (n = t.pendingProps === "" || n.nodeType !== 3 ? null : n),
          n !== null ? ((t.stateNode = n), (bt = t), (_t = null), !0) : !1
        );
      case 13:
        return (
          (n = n.nodeType !== 8 ? null : n),
          n !== null
            ? ((s = ir !== null ? { id: pn, overflow: mn } : null),
              (t.memoizedState = {
                dehydrated: n,
                treeContext: s,
                retryLane: 1073741824,
              }),
              (s = Ot(18, null, null, 0)),
              (s.stateNode = n),
              (s.return = t),
              (t.child = s),
              (bt = t),
              (_t = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Ka(t) {
    return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
  }
  function Qa(t) {
    if (He) {
      var n = _t;
      if (n) {
        var s = n;
        if (!cf(t, n)) {
          if (Ka(t)) throw Error(o(418));
          n = Ln(s.nextSibling);
          var a = bt;
          n && cf(t, n)
            ? uf(a, s)
            : ((t.flags = (t.flags & -4097) | 2), (He = !1), (bt = t));
        }
      } else {
        if (Ka(t)) throw Error(o(418));
        ((t.flags = (t.flags & -4097) | 2), (He = !1), (bt = t));
      }
    }
  }
  function df(t) {
    for (
      t = t.return;
      t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13;
    )
      t = t.return;
    bt = t;
  }
  function _i(t) {
    if (t !== bt) return !1;
    if (!He) return (df(t), (He = !0), !1);
    var n;
    if (
      ((n = t.tag !== 3) &&
        !(n = t.tag !== 5) &&
        ((n = t.type),
        (n = n !== "head" && n !== "body" && !Fa(t.type, t.memoizedProps))),
      n && (n = _t))
    ) {
      if (Ka(t)) throw (ff(), Error(o(418)));
      for (; n; ) (uf(t, n), (n = Ln(n.nextSibling)));
    }
    if ((df(t), t.tag === 13)) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(o(317));
      e: {
        for (t = t.nextSibling, n = 0; t; ) {
          if (t.nodeType === 8) {
            var s = t.data;
            if (s === "/$") {
              if (n === 0) {
                _t = Ln(t.nextSibling);
                break e;
              }
              n--;
            } else (s !== "$" && s !== "$!" && s !== "$?") || n++;
          }
          t = t.nextSibling;
        }
        _t = null;
      }
    } else _t = bt ? Ln(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ff() {
    for (var t = _t; t; ) t = Ln(t.nextSibling);
  }
  function Ur() {
    ((_t = bt = null), (He = !1));
  }
  function Ga(t) {
    Vt === null ? (Vt = [t]) : Vt.push(t);
  }
  var by = j.ReactCurrentBatchConfig;
  function Go(t, n, s) {
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
          g = "" + t;
        return n !== null &&
          n.ref !== null &&
          typeof n.ref == "function" &&
          n.ref._stringRef === g
          ? n.ref
          : ((n = function (N) {
              var T = d.refs;
              N === null ? delete T[g] : (T[g] = N);
            }),
            (n._stringRef = g),
            n);
      }
      if (typeof t != "string") throw Error(o(284));
      if (!s._owner) throw Error(o(290, t));
    }
    return t;
  }
  function ji(t, n) {
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
  function hf(t) {
    var n = t._init;
    return n(t._payload);
  }
  function pf(t) {
    function n(q, W) {
      if (t) {
        var J = q.deletions;
        J === null ? ((q.deletions = [W]), (q.flags |= 16)) : J.push(W);
      }
    }
    function s(q, W) {
      if (!t) return null;
      for (; W !== null; ) (n(q, W), (W = W.sibling));
      return null;
    }
    function a(q, W) {
      for (q = new Map(); W !== null; )
        (W.key !== null ? q.set(W.key, W) : q.set(W.index, W), (W = W.sibling));
      return q;
    }
    function d(q, W) {
      return ((q = Un(q, W)), (q.index = 0), (q.sibling = null), q);
    }
    function g(q, W, J) {
      return (
        (q.index = J),
        t
          ? ((J = q.alternate),
            J !== null
              ? ((J = J.index), J < W ? ((q.flags |= 2), W) : J)
              : ((q.flags |= 2), W))
          : ((q.flags |= 1048576), W)
      );
    }
    function N(q) {
      return (t && q.alternate === null && (q.flags |= 2), q);
    }
    function T(q, W, J, pe) {
      return W === null || W.tag !== 6
        ? ((W = Hu(J, q.mode, pe)), (W.return = q), W)
        : ((W = d(W, J)), (W.return = q), W);
    }
    function O(q, W, J, pe) {
      var Ce = J.type;
      return Ce === R
        ? ce(q, W, J.props.children, pe, J.key)
        : W !== null &&
            (W.elementType === Ce ||
              (typeof Ce == "object" &&
                Ce !== null &&
                Ce.$$typeof === B &&
                hf(Ce) === W.type))
          ? ((pe = d(W, J.props)), (pe.ref = Go(q, W, J)), (pe.return = q), pe)
          : ((pe = Zi(J.type, J.key, J.props, null, q.mode, pe)),
            (pe.ref = Go(q, W, J)),
            (pe.return = q),
            pe);
    }
    function ee(q, W, J, pe) {
      return W === null ||
        W.tag !== 4 ||
        W.stateNode.containerInfo !== J.containerInfo ||
        W.stateNode.implementation !== J.implementation
        ? ((W = Bu(J, q.mode, pe)), (W.return = q), W)
        : ((W = d(W, J.children || [])), (W.return = q), W);
    }
    function ce(q, W, J, pe, Ce) {
      return W === null || W.tag !== 7
        ? ((W = mr(J, q.mode, pe, Ce)), (W.return = q), W)
        : ((W = d(W, J)), (W.return = q), W);
    }
    function he(q, W, J) {
      if ((typeof W == "string" && W !== "") || typeof W == "number")
        return ((W = Hu("" + W, q.mode, J)), (W.return = q), W);
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case D:
            return (
              (J = Zi(W.type, W.key, W.props, null, q.mode, J)),
              (J.ref = Go(q, null, W)),
              (J.return = q),
              J
            );
          case A:
            return ((W = Bu(W, q.mode, J)), (W.return = q), W);
          case B:
            var pe = W._init;
            return he(q, pe(W._payload), J);
        }
        if (Me(W) || $(W))
          return ((W = mr(W, q.mode, J, null)), (W.return = q), W);
        ji(q, W);
      }
      return null;
    }
    function ue(q, W, J, pe) {
      var Ce = W !== null ? W.key : null;
      if ((typeof J == "string" && J !== "") || typeof J == "number")
        return Ce !== null ? null : T(q, W, "" + J, pe);
      if (typeof J == "object" && J !== null) {
        switch (J.$$typeof) {
          case D:
            return J.key === Ce ? O(q, W, J, pe) : null;
          case A:
            return J.key === Ce ? ee(q, W, J, pe) : null;
          case B:
            return ((Ce = J._init), ue(q, W, Ce(J._payload), pe));
        }
        if (Me(J) || $(J)) return Ce !== null ? null : ce(q, W, J, pe, null);
        ji(q, J);
      }
      return null;
    }
    function xe(q, W, J, pe, Ce) {
      if ((typeof pe == "string" && pe !== "") || typeof pe == "number")
        return ((q = q.get(J) || null), T(W, q, "" + pe, Ce));
      if (typeof pe == "object" && pe !== null) {
        switch (pe.$$typeof) {
          case D:
            return (
              (q = q.get(pe.key === null ? J : pe.key) || null),
              O(W, q, pe, Ce)
            );
          case A:
            return (
              (q = q.get(pe.key === null ? J : pe.key) || null),
              ee(W, q, pe, Ce)
            );
          case B:
            var _e = pe._init;
            return xe(q, W, J, _e(pe._payload), Ce);
        }
        if (Me(pe) || $(pe))
          return ((q = q.get(J) || null), ce(W, q, pe, Ce, null));
        ji(W, pe);
      }
      return null;
    }
    function Se(q, W, J, pe) {
      for (
        var Ce = null, _e = null, je = W, Ie = (W = 0), it = null;
        je !== null && Ie < J.length;
        Ie++
      ) {
        je.index > Ie ? ((it = je), (je = null)) : (it = je.sibling);
        var Le = ue(q, je, J[Ie], pe);
        if (Le === null) {
          je === null && (je = it);
          break;
        }
        (t && je && Le.alternate === null && n(q, je),
          (W = g(Le, W, Ie)),
          _e === null ? (Ce = Le) : (_e.sibling = Le),
          (_e = Le),
          (je = it));
      }
      if (Ie === J.length) return (s(q, je), He && lr(q, Ie), Ce);
      if (je === null) {
        for (; Ie < J.length; Ie++)
          ((je = he(q, J[Ie], pe)),
            je !== null &&
              ((W = g(je, W, Ie)),
              _e === null ? (Ce = je) : (_e.sibling = je),
              (_e = je)));
        return (He && lr(q, Ie), Ce);
      }
      for (je = a(q, je); Ie < J.length; Ie++)
        ((it = xe(je, q, Ie, J[Ie], pe)),
          it !== null &&
            (t &&
              it.alternate !== null &&
              je.delete(it.key === null ? Ie : it.key),
            (W = g(it, W, Ie)),
            _e === null ? (Ce = it) : (_e.sibling = it),
            (_e = it)));
      return (
        t &&
          je.forEach(function (Yn) {
            return n(q, Yn);
          }),
        He && lr(q, Ie),
        Ce
      );
    }
    function ke(q, W, J, pe) {
      var Ce = $(J);
      if (typeof Ce != "function") throw Error(o(150));
      if (((J = Ce.call(J)), J == null)) throw Error(o(151));
      for (
        var _e = (Ce = null), je = W, Ie = (W = 0), it = null, Le = J.next();
        je !== null && !Le.done;
        Ie++, Le = J.next()
      ) {
        je.index > Ie ? ((it = je), (je = null)) : (it = je.sibling);
        var Yn = ue(q, je, Le.value, pe);
        if (Yn === null) {
          je === null && (je = it);
          break;
        }
        (t && je && Yn.alternate === null && n(q, je),
          (W = g(Yn, W, Ie)),
          _e === null ? (Ce = Yn) : (_e.sibling = Yn),
          (_e = Yn),
          (je = it));
      }
      if (Le.done) return (s(q, je), He && lr(q, Ie), Ce);
      if (je === null) {
        for (; !Le.done; Ie++, Le = J.next())
          ((Le = he(q, Le.value, pe)),
            Le !== null &&
              ((W = g(Le, W, Ie)),
              _e === null ? (Ce = Le) : (_e.sibling = Le),
              (_e = Le)));
        return (He && lr(q, Ie), Ce);
      }
      for (je = a(q, je); !Le.done; Ie++, Le = J.next())
        ((Le = xe(je, q, Ie, Le.value, pe)),
          Le !== null &&
            (t &&
              Le.alternate !== null &&
              je.delete(Le.key === null ? Ie : Le.key),
            (W = g(Le, W, Ie)),
            _e === null ? (Ce = Le) : (_e.sibling = Le),
            (_e = Le)));
      return (
        t &&
          je.forEach(function (sv) {
            return n(q, sv);
          }),
        He && lr(q, Ie),
        Ce
      );
    }
    function Qe(q, W, J, pe) {
      if (
        (typeof J == "object" &&
          J !== null &&
          J.type === R &&
          J.key === null &&
          (J = J.props.children),
        typeof J == "object" && J !== null)
      ) {
        switch (J.$$typeof) {
          case D:
            e: {
              for (var Ce = J.key, _e = W; _e !== null; ) {
                if (_e.key === Ce) {
                  if (((Ce = J.type), Ce === R)) {
                    if (_e.tag === 7) {
                      (s(q, _e.sibling),
                        (W = d(_e, J.props.children)),
                        (W.return = q),
                        (q = W));
                      break e;
                    }
                  } else if (
                    _e.elementType === Ce ||
                    (typeof Ce == "object" &&
                      Ce !== null &&
                      Ce.$$typeof === B &&
                      hf(Ce) === _e.type)
                  ) {
                    (s(q, _e.sibling),
                      (W = d(_e, J.props)),
                      (W.ref = Go(q, _e, J)),
                      (W.return = q),
                      (q = W));
                    break e;
                  }
                  s(q, _e);
                  break;
                } else n(q, _e);
                _e = _e.sibling;
              }
              J.type === R
                ? ((W = mr(J.props.children, q.mode, pe, J.key)),
                  (W.return = q),
                  (q = W))
                : ((pe = Zi(J.type, J.key, J.props, null, q.mode, pe)),
                  (pe.ref = Go(q, W, J)),
                  (pe.return = q),
                  (q = pe));
            }
            return N(q);
          case A:
            e: {
              for (_e = J.key; W !== null; ) {
                if (W.key === _e)
                  if (
                    W.tag === 4 &&
                    W.stateNode.containerInfo === J.containerInfo &&
                    W.stateNode.implementation === J.implementation
                  ) {
                    (s(q, W.sibling),
                      (W = d(W, J.children || [])),
                      (W.return = q),
                      (q = W));
                    break e;
                  } else {
                    s(q, W);
                    break;
                  }
                else n(q, W);
                W = W.sibling;
              }
              ((W = Bu(J, q.mode, pe)), (W.return = q), (q = W));
            }
            return N(q);
          case B:
            return ((_e = J._init), Qe(q, W, _e(J._payload), pe));
        }
        if (Me(J)) return Se(q, W, J, pe);
        if ($(J)) return ke(q, W, J, pe);
        ji(q, J);
      }
      return (typeof J == "string" && J !== "") || typeof J == "number"
        ? ((J = "" + J),
          W !== null && W.tag === 6
            ? (s(q, W.sibling), (W = d(W, J)), (W.return = q), (q = W))
            : (s(q, W), (W = Hu(J, q.mode, pe)), (W.return = q), (q = W)),
          N(q))
        : s(q, W);
    }
    return Qe;
  }
  var Yr = pf(!0),
    mf = pf(!1),
    Ii = zn(null),
    Mi = null,
    Xr = null,
    qa = null;
  function Za() {
    qa = Xr = Mi = null;
  }
  function Ja(t) {
    var n = Ii.current;
    (Fe(Ii), (t._currentValue = n));
  }
  function eu(t, n, s) {
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
  function Kr(t, n) {
    ((Mi = t),
      (qa = Xr = null),
      (t = t.dependencies),
      t !== null &&
        t.firstContext !== null &&
        ((t.lanes & n) !== 0 && (vt = !0), (t.firstContext = null)));
  }
  function At(t) {
    var n = t._currentValue;
    if (qa !== t)
      if (((t = { context: t, memoizedValue: n, next: null }), Xr === null)) {
        if (Mi === null) throw Error(o(308));
        ((Xr = t), (Mi.dependencies = { lanes: 0, firstContext: t }));
      } else Xr = Xr.next = t;
    return n;
  }
  var ar = null;
  function tu(t) {
    ar === null ? (ar = [t]) : ar.push(t);
  }
  function gf(t, n, s, a) {
    var d = n.interleaved;
    return (
      d === null ? ((s.next = s), tu(n)) : ((s.next = d.next), (d.next = s)),
      (n.interleaved = s),
      gn(t, a)
    );
  }
  function gn(t, n) {
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
  var Dn = !1;
  function nu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function yf(t, n) {
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
  function yn(t, n) {
    return {
      eventTime: t,
      lane: n,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function On(t, n, s) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (Te & 2) !== 0)) {
      var d = a.pending;
      return (
        d === null ? (n.next = n) : ((n.next = d.next), (d.next = n)),
        (a.pending = n),
        gn(t, s)
      );
    }
    return (
      (d = a.interleaved),
      d === null ? ((n.next = n), tu(a)) : ((n.next = d.next), (d.next = n)),
      (a.interleaved = n),
      gn(t, s)
    );
  }
  function Pi(t, n, s) {
    if (
      ((n = n.updateQueue), n !== null && ((n = n.shared), (s & 4194240) !== 0))
    ) {
      var a = n.lanes;
      ((a &= t.pendingLanes), (s |= a), (n.lanes = s), ga(t, s));
    }
  }
  function vf(t, n) {
    var s = t.updateQueue,
      a = t.alternate;
    if (a !== null && ((a = a.updateQueue), s === a)) {
      var d = null,
        g = null;
      if (((s = s.firstBaseUpdate), s !== null)) {
        do {
          var N = {
            eventTime: s.eventTime,
            lane: s.lane,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null,
          };
          (g === null ? (d = g = N) : (g = g.next = N), (s = s.next));
        } while (s !== null);
        g === null ? (d = g = n) : (g = g.next = n);
      } else d = g = n;
      ((s = {
        baseState: a.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: g,
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
  function Ri(t, n, s, a) {
    var d = t.updateQueue;
    Dn = !1;
    var g = d.firstBaseUpdate,
      N = d.lastBaseUpdate,
      T = d.shared.pending;
    if (T !== null) {
      d.shared.pending = null;
      var O = T,
        ee = O.next;
      ((O.next = null), N === null ? (g = ee) : (N.next = ee), (N = O));
      var ce = t.alternate;
      ce !== null &&
        ((ce = ce.updateQueue),
        (T = ce.lastBaseUpdate),
        T !== N &&
          (T === null ? (ce.firstBaseUpdate = ee) : (T.next = ee),
          (ce.lastBaseUpdate = O)));
    }
    if (g !== null) {
      var he = d.baseState;
      ((N = 0), (ce = ee = O = null), (T = g));
      do {
        var ue = T.lane,
          xe = T.eventTime;
        if ((a & ue) === ue) {
          ce !== null &&
            (ce = ce.next =
              {
                eventTime: xe,
                lane: 0,
                tag: T.tag,
                payload: T.payload,
                callback: T.callback,
                next: null,
              });
          e: {
            var Se = t,
              ke = T;
            switch (((ue = n), (xe = s), ke.tag)) {
              case 1:
                if (((Se = ke.payload), typeof Se == "function")) {
                  he = Se.call(xe, he, ue);
                  break e;
                }
                he = Se;
                break e;
              case 3:
                Se.flags = (Se.flags & -65537) | 128;
              case 0:
                if (
                  ((Se = ke.payload),
                  (ue = typeof Se == "function" ? Se.call(xe, he, ue) : Se),
                  ue == null)
                )
                  break e;
                he = U({}, he, ue);
                break e;
              case 2:
                Dn = !0;
            }
          }
          T.callback !== null &&
            T.lane !== 0 &&
            ((t.flags |= 64),
            (ue = d.effects),
            ue === null ? (d.effects = [T]) : ue.push(T));
        } else
          ((xe = {
            eventTime: xe,
            lane: ue,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null,
          }),
            ce === null ? ((ee = ce = xe), (O = he)) : (ce = ce.next = xe),
            (N |= ue));
        if (((T = T.next), T === null)) {
          if (((T = d.shared.pending), T === null)) break;
          ((ue = T),
            (T = ue.next),
            (ue.next = null),
            (d.lastBaseUpdate = ue),
            (d.shared.pending = null));
        }
      } while (!0);
      if (
        (ce === null && (O = he),
        (d.baseState = O),
        (d.firstBaseUpdate = ee),
        (d.lastBaseUpdate = ce),
        (n = d.shared.interleaved),
        n !== null)
      ) {
        d = n;
        do ((N |= d.lane), (d = d.next));
        while (d !== n);
      } else g === null && (d.shared.lanes = 0);
      ((dr |= N), (t.lanes = N), (t.memoizedState = he));
    }
  }
  function xf(t, n, s) {
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
  var qo = {},
    nn = zn(qo),
    Zo = zn(qo),
    Jo = zn(qo);
  function ur(t) {
    if (t === qo) throw Error(o(174));
    return t;
  }
  function ru(t, n) {
    switch (($e(Jo, n), $e(Zo, t), $e(nn, qo), (t = n.nodeType), t)) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : kt(null, "");
        break;
      default:
        ((t = t === 8 ? n.parentNode : n),
          (n = t.namespaceURI || null),
          (t = t.tagName),
          (n = kt(n, t)));
    }
    (Fe(nn), $e(nn, n));
  }
  function Qr() {
    (Fe(nn), Fe(Zo), Fe(Jo));
  }
  function wf(t) {
    ur(Jo.current);
    var n = ur(nn.current),
      s = kt(n, t.type);
    n !== s && ($e(Zo, t), $e(nn, s));
  }
  function ou(t) {
    Zo.current === t && (Fe(nn), Fe(Zo));
  }
  var Ye = zn(0);
  function Ti(t) {
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
  var su = [];
  function iu() {
    for (var t = 0; t < su.length; t++)
      su[t]._workInProgressVersionPrimary = null;
    su.length = 0;
  }
  var Li = j.ReactCurrentDispatcher,
    lu = j.ReactCurrentBatchConfig,
    cr = 0,
    Xe = null,
    et = null,
    ot = null,
    zi = !1,
    es = !1,
    ts = 0,
    _y = 0;
  function dt() {
    throw Error(o(321));
  }
  function au(t, n) {
    if (n === null) return !1;
    for (var s = 0; s < n.length && s < t.length; s++)
      if (!Bt(t[s], n[s])) return !1;
    return !0;
  }
  function uu(t, n, s, a, d, g) {
    if (
      ((cr = g),
      (Xe = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (Li.current = t === null || t.memoizedState === null ? Py : Ry),
      (t = s(a, d)),
      es)
    ) {
      g = 0;
      do {
        if (((es = !1), (ts = 0), 25 <= g)) throw Error(o(301));
        ((g += 1),
          (ot = et = null),
          (n.updateQueue = null),
          (Li.current = Ty),
          (t = s(a, d)));
      } while (es);
    }
    if (
      ((Li.current = Di),
      (n = et !== null && et.next !== null),
      (cr = 0),
      (ot = et = Xe = null),
      (zi = !1),
      n)
    )
      throw Error(o(300));
    return t;
  }
  function cu() {
    var t = ts !== 0;
    return ((ts = 0), t);
  }
  function rn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (ot === null ? (Xe.memoizedState = ot = t) : (ot = ot.next = t), ot);
  }
  function $t() {
    if (et === null) {
      var t = Xe.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = et.next;
    var n = ot === null ? Xe.memoizedState : ot.next;
    if (n !== null) ((ot = n), (et = t));
    else {
      if (t === null) throw Error(o(310));
      ((et = t),
        (t = {
          memoizedState: et.memoizedState,
          baseState: et.baseState,
          baseQueue: et.baseQueue,
          queue: et.queue,
          next: null,
        }),
        ot === null ? (Xe.memoizedState = ot = t) : (ot = ot.next = t));
    }
    return ot;
  }
  function ns(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function du(t) {
    var n = $t(),
      s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var a = et,
      d = a.baseQueue,
      g = s.pending;
    if (g !== null) {
      if (d !== null) {
        var N = d.next;
        ((d.next = g.next), (g.next = N));
      }
      ((a.baseQueue = d = g), (s.pending = null));
    }
    if (d !== null) {
      ((g = d.next), (a = a.baseState));
      var T = (N = null),
        O = null,
        ee = g;
      do {
        var ce = ee.lane;
        if ((cr & ce) === ce)
          (O !== null &&
            (O = O.next =
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
            lane: ce,
            action: ee.action,
            hasEagerState: ee.hasEagerState,
            eagerState: ee.eagerState,
            next: null,
          };
          (O === null ? ((T = O = he), (N = a)) : (O = O.next = he),
            (Xe.lanes |= ce),
            (dr |= ce));
        }
        ee = ee.next;
      } while (ee !== null && ee !== g);
      (O === null ? (N = a) : (O.next = T),
        Bt(a, n.memoizedState) || (vt = !0),
        (n.memoizedState = a),
        (n.baseState = N),
        (n.baseQueue = O),
        (s.lastRenderedState = a));
    }
    if (((t = s.interleaved), t !== null)) {
      d = t;
      do ((g = d.lane), (Xe.lanes |= g), (dr |= g), (d = d.next));
      while (d !== t);
    } else d === null && (s.lanes = 0);
    return [n.memoizedState, s.dispatch];
  }
  function fu(t) {
    var n = $t(),
      s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var a = s.dispatch,
      d = s.pending,
      g = n.memoizedState;
    if (d !== null) {
      s.pending = null;
      var N = (d = d.next);
      do ((g = t(g, N.action)), (N = N.next));
      while (N !== d);
      (Bt(g, n.memoizedState) || (vt = !0),
        (n.memoizedState = g),
        n.baseQueue === null && (n.baseState = g),
        (s.lastRenderedState = g));
    }
    return [g, a];
  }
  function Sf() {}
  function Ef(t, n) {
    var s = Xe,
      a = $t(),
      d = n(),
      g = !Bt(a.memoizedState, d);
    if (
      (g && ((a.memoizedState = d), (vt = !0)),
      (a = a.queue),
      hu(Cf.bind(null, s, a, t), [t]),
      a.getSnapshot !== n || g || (ot !== null && ot.memoizedState.tag & 1))
    ) {
      if (
        ((s.flags |= 2048),
        rs(9, Nf.bind(null, s, a, d, n), void 0, null),
        st === null)
      )
        throw Error(o(349));
      (cr & 30) !== 0 || kf(s, n, d);
    }
    return d;
  }
  function kf(t, n, s) {
    ((t.flags |= 16384),
      (t = { getSnapshot: n, value: s }),
      (n = Xe.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }),
          (Xe.updateQueue = n),
          (n.stores = [t]))
        : ((s = n.stores), s === null ? (n.stores = [t]) : s.push(t)));
  }
  function Nf(t, n, s, a) {
    ((n.value = s), (n.getSnapshot = a), bf(n) && _f(t));
  }
  function Cf(t, n, s) {
    return s(function () {
      bf(n) && _f(t);
    });
  }
  function bf(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var s = n();
      return !Bt(t, s);
    } catch {
      return !0;
    }
  }
  function _f(t) {
    var n = gn(t, 1);
    n !== null && Xt(n, t, 1, -1);
  }
  function jf(t) {
    var n = rn();
    return (
      typeof t == "function" && (t = t()),
      (n.memoizedState = n.baseState = t),
      (t = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ns,
        lastRenderedState: t,
      }),
      (n.queue = t),
      (t = t.dispatch = My.bind(null, Xe, t)),
      [n.memoizedState, t]
    );
  }
  function rs(t, n, s, a) {
    return (
      (t = { tag: t, create: n, destroy: s, deps: a, next: null }),
      (n = Xe.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }),
          (Xe.updateQueue = n),
          (n.lastEffect = t.next = t))
        : ((s = n.lastEffect),
          s === null
            ? (n.lastEffect = t.next = t)
            : ((a = s.next), (s.next = t), (t.next = a), (n.lastEffect = t))),
      t
    );
  }
  function If() {
    return $t().memoizedState;
  }
  function Ai(t, n, s, a) {
    var d = rn();
    ((Xe.flags |= t),
      (d.memoizedState = rs(1 | n, s, void 0, a === void 0 ? null : a)));
  }
  function $i(t, n, s, a) {
    var d = $t();
    a = a === void 0 ? null : a;
    var g = void 0;
    if (et !== null) {
      var N = et.memoizedState;
      if (((g = N.destroy), a !== null && au(a, N.deps))) {
        d.memoizedState = rs(n, s, g, a);
        return;
      }
    }
    ((Xe.flags |= t), (d.memoizedState = rs(1 | n, s, g, a)));
  }
  function Mf(t, n) {
    return Ai(8390656, 8, t, n);
  }
  function hu(t, n) {
    return $i(2048, 8, t, n);
  }
  function Pf(t, n) {
    return $i(4, 2, t, n);
  }
  function Rf(t, n) {
    return $i(4, 4, t, n);
  }
  function Tf(t, n) {
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
  function Lf(t, n, s) {
    return (
      (s = s != null ? s.concat([t]) : null),
      $i(4, 4, Tf.bind(null, n, t), s)
    );
  }
  function pu() {}
  function zf(t, n) {
    var s = $t();
    n = n === void 0 ? null : n;
    var a = s.memoizedState;
    return a !== null && n !== null && au(n, a[1])
      ? a[0]
      : ((s.memoizedState = [t, n]), t);
  }
  function Af(t, n) {
    var s = $t();
    n = n === void 0 ? null : n;
    var a = s.memoizedState;
    return a !== null && n !== null && au(n, a[1])
      ? a[0]
      : ((t = t()), (s.memoizedState = [t, n]), t);
  }
  function $f(t, n, s) {
    return (cr & 21) === 0
      ? (t.baseState && ((t.baseState = !1), (vt = !0)), (t.memoizedState = s))
      : (Bt(s, n) ||
          ((s = Rr()), (Xe.lanes |= s), (dr |= s), (t.baseState = !0)),
        n);
  }
  function jy(t, n) {
    var s = Ae;
    ((Ae = s !== 0 && 4 > s ? s : 4), t(!0));
    var a = lu.transition;
    lu.transition = {};
    try {
      (t(!1), n());
    } finally {
      ((Ae = s), (lu.transition = a));
    }
  }
  function Df() {
    return $t().memoizedState;
  }
  function Iy(t, n, s) {
    var a = Vn(t);
    if (
      ((s = {
        lane: a,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Of(t))
    )
      Ff(n, s);
    else if (((s = gf(t, n, s, a)), s !== null)) {
      var d = mt();
      (Xt(s, t, a, d), Hf(s, n, a));
    }
  }
  function My(t, n, s) {
    var a = Vn(t),
      d = {
        lane: a,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Of(t)) Ff(n, d);
    else {
      var g = t.alternate;
      if (
        t.lanes === 0 &&
        (g === null || g.lanes === 0) &&
        ((g = n.lastRenderedReducer), g !== null)
      )
        try {
          var N = n.lastRenderedState,
            T = g(N, s);
          if (((d.hasEagerState = !0), (d.eagerState = T), Bt(T, N))) {
            var O = n.interleaved;
            (O === null
              ? ((d.next = d), tu(n))
              : ((d.next = O.next), (O.next = d)),
              (n.interleaved = d));
            return;
          }
        } catch {
        } finally {
        }
      ((s = gf(t, n, d, a)),
        s !== null && ((d = mt()), Xt(s, t, a, d), Hf(s, n, a)));
    }
  }
  function Of(t) {
    var n = t.alternate;
    return t === Xe || (n !== null && n === Xe);
  }
  function Ff(t, n) {
    es = zi = !0;
    var s = t.pending;
    (s === null ? (n.next = n) : ((n.next = s.next), (s.next = n)),
      (t.pending = n));
  }
  function Hf(t, n, s) {
    if ((s & 4194240) !== 0) {
      var a = n.lanes;
      ((a &= t.pendingLanes), (s |= a), (n.lanes = s), ga(t, s));
    }
  }
  var Di = {
      readContext: At,
      useCallback: dt,
      useContext: dt,
      useEffect: dt,
      useImperativeHandle: dt,
      useInsertionEffect: dt,
      useLayoutEffect: dt,
      useMemo: dt,
      useReducer: dt,
      useRef: dt,
      useState: dt,
      useDebugValue: dt,
      useDeferredValue: dt,
      useTransition: dt,
      useMutableSource: dt,
      useSyncExternalStore: dt,
      useId: dt,
      unstable_isNewReconciler: !1,
    },
    Py = {
      readContext: At,
      useCallback: function (t, n) {
        return ((rn().memoizedState = [t, n === void 0 ? null : n]), t);
      },
      useContext: At,
      useEffect: Mf,
      useImperativeHandle: function (t, n, s) {
        return (
          (s = s != null ? s.concat([t]) : null),
          Ai(4194308, 4, Tf.bind(null, n, t), s)
        );
      },
      useLayoutEffect: function (t, n) {
        return Ai(4194308, 4, t, n);
      },
      useInsertionEffect: function (t, n) {
        return Ai(4, 2, t, n);
      },
      useMemo: function (t, n) {
        var s = rn();
        return (
          (n = n === void 0 ? null : n),
          (t = t()),
          (s.memoizedState = [t, n]),
          t
        );
      },
      useReducer: function (t, n, s) {
        var a = rn();
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
          (t = t.dispatch = Iy.bind(null, Xe, t)),
          [a.memoizedState, t]
        );
      },
      useRef: function (t) {
        var n = rn();
        return ((t = { current: t }), (n.memoizedState = t));
      },
      useState: jf,
      useDebugValue: pu,
      useDeferredValue: function (t) {
        return (rn().memoizedState = t);
      },
      useTransition: function () {
        var t = jf(!1),
          n = t[0];
        return ((t = jy.bind(null, t[1])), (rn().memoizedState = t), [n, t]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (t, n, s) {
        var a = Xe,
          d = rn();
        if (He) {
          if (s === void 0) throw Error(o(407));
          s = s();
        } else {
          if (((s = n()), st === null)) throw Error(o(349));
          (cr & 30) !== 0 || kf(a, n, s);
        }
        d.memoizedState = s;
        var g = { value: s, getSnapshot: n };
        return (
          (d.queue = g),
          Mf(Cf.bind(null, a, g, t), [t]),
          (a.flags |= 2048),
          rs(9, Nf.bind(null, a, g, s, n), void 0, null),
          s
        );
      },
      useId: function () {
        var t = rn(),
          n = st.identifierPrefix;
        if (He) {
          var s = mn,
            a = pn;
          ((s = (a & ~(1 << (32 - Nt(a) - 1))).toString(32) + s),
            (n = ":" + n + "R" + s),
            (s = ts++),
            0 < s && (n += "H" + s.toString(32)),
            (n += ":"));
        } else ((s = _y++), (n = ":" + n + "r" + s.toString(32) + ":"));
        return (t.memoizedState = n);
      },
      unstable_isNewReconciler: !1,
    },
    Ry = {
      readContext: At,
      useCallback: zf,
      useContext: At,
      useEffect: hu,
      useImperativeHandle: Lf,
      useInsertionEffect: Pf,
      useLayoutEffect: Rf,
      useMemo: Af,
      useReducer: du,
      useRef: If,
      useState: function () {
        return du(ns);
      },
      useDebugValue: pu,
      useDeferredValue: function (t) {
        var n = $t();
        return $f(n, et.memoizedState, t);
      },
      useTransition: function () {
        var t = du(ns)[0],
          n = $t().memoizedState;
        return [t, n];
      },
      useMutableSource: Sf,
      useSyncExternalStore: Ef,
      useId: Df,
      unstable_isNewReconciler: !1,
    },
    Ty = {
      readContext: At,
      useCallback: zf,
      useContext: At,
      useEffect: hu,
      useImperativeHandle: Lf,
      useInsertionEffect: Pf,
      useLayoutEffect: Rf,
      useMemo: Af,
      useReducer: fu,
      useRef: If,
      useState: function () {
        return fu(ns);
      },
      useDebugValue: pu,
      useDeferredValue: function (t) {
        var n = $t();
        return et === null ? (n.memoizedState = t) : $f(n, et.memoizedState, t);
      },
      useTransition: function () {
        var t = fu(ns)[0],
          n = $t().memoizedState;
        return [t, n];
      },
      useMutableSource: Sf,
      useSyncExternalStore: Ef,
      useId: Df,
      unstable_isNewReconciler: !1,
    };
  function Wt(t, n) {
    if (t && t.defaultProps) {
      ((n = U({}, n)), (t = t.defaultProps));
      for (var s in t) n[s] === void 0 && (n[s] = t[s]);
      return n;
    }
    return n;
  }
  function mu(t, n, s, a) {
    ((n = t.memoizedState),
      (s = s(a, n)),
      (s = s == null ? n : U({}, n, s)),
      (t.memoizedState = s),
      t.lanes === 0 && (t.updateQueue.baseState = s));
  }
  var Oi = {
    isMounted: function (t) {
      return (t = t._reactInternals) ? Jt(t) === t : !1;
    },
    enqueueSetState: function (t, n, s) {
      t = t._reactInternals;
      var a = mt(),
        d = Vn(t),
        g = yn(a, d);
      ((g.payload = n),
        s != null && (g.callback = s),
        (n = On(t, g, d)),
        n !== null && (Xt(n, t, d, a), Pi(n, t, d)));
    },
    enqueueReplaceState: function (t, n, s) {
      t = t._reactInternals;
      var a = mt(),
        d = Vn(t),
        g = yn(a, d);
      ((g.tag = 1),
        (g.payload = n),
        s != null && (g.callback = s),
        (n = On(t, g, d)),
        n !== null && (Xt(n, t, d, a), Pi(n, t, d)));
    },
    enqueueForceUpdate: function (t, n) {
      t = t._reactInternals;
      var s = mt(),
        a = Vn(t),
        d = yn(s, a);
      ((d.tag = 2),
        n != null && (d.callback = n),
        (n = On(t, d, a)),
        n !== null && (Xt(n, t, a, s), Pi(n, t, a)));
    },
  };
  function Bf(t, n, s, a, d, g, N) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(a, g, N)
        : n.prototype && n.prototype.isPureReactComponent
          ? !Vo(s, a) || !Vo(d, g)
          : !0
    );
  }
  function Vf(t, n, s) {
    var a = !1,
      d = An,
      g = n.contextType;
    return (
      typeof g == "object" && g !== null
        ? (g = At(g))
        : ((d = yt(n) ? sr : ct.current),
          (a = n.contextTypes),
          (g = (a = a != null) ? Br(t, d) : An)),
      (n = new n(s, g)),
      (t.memoizedState =
        n.state !== null && n.state !== void 0 ? n.state : null),
      (n.updater = Oi),
      (t.stateNode = n),
      (n._reactInternals = t),
      a &&
        ((t = t.stateNode),
        (t.__reactInternalMemoizedUnmaskedChildContext = d),
        (t.__reactInternalMemoizedMaskedChildContext = g)),
      n
    );
  }
  function Wf(t, n, s, a) {
    ((t = n.state),
      typeof n.componentWillReceiveProps == "function" &&
        n.componentWillReceiveProps(s, a),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(s, a),
      n.state !== t && Oi.enqueueReplaceState(n, n.state, null));
  }
  function gu(t, n, s, a) {
    var d = t.stateNode;
    ((d.props = s), (d.state = t.memoizedState), (d.refs = {}), nu(t));
    var g = n.contextType;
    (typeof g == "object" && g !== null
      ? (d.context = At(g))
      : ((g = yt(n) ? sr : ct.current), (d.context = Br(t, g))),
      (d.state = t.memoizedState),
      (g = n.getDerivedStateFromProps),
      typeof g == "function" && (mu(t, n, g, s), (d.state = t.memoizedState)),
      typeof n.getDerivedStateFromProps == "function" ||
        typeof d.getSnapshotBeforeUpdate == "function" ||
        (typeof d.UNSAFE_componentWillMount != "function" &&
          typeof d.componentWillMount != "function") ||
        ((n = d.state),
        typeof d.componentWillMount == "function" && d.componentWillMount(),
        typeof d.UNSAFE_componentWillMount == "function" &&
          d.UNSAFE_componentWillMount(),
        n !== d.state && Oi.enqueueReplaceState(d, d.state, null),
        Ri(t, s, d, a),
        (d.state = t.memoizedState)),
      typeof d.componentDidMount == "function" && (t.flags |= 4194308));
  }
  function Gr(t, n) {
    try {
      var s = "",
        a = n;
      do ((s += F(a)), (a = a.return));
      while (a);
      var d = s;
    } catch (g) {
      d =
        `
Error generating stack: ` +
        g.message +
        `
` +
        g.stack;
    }
    return { value: t, source: n, stack: d, digest: null };
  }
  function yu(t, n, s) {
    return { value: t, source: null, stack: s ?? null, digest: n ?? null };
  }
  function vu(t, n) {
    try {
      console.error(n.value);
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  var Ly = typeof WeakMap == "function" ? WeakMap : Map;
  function Uf(t, n, s) {
    ((s = yn(-1, s)), (s.tag = 3), (s.payload = { element: null }));
    var a = n.value;
    return (
      (s.callback = function () {
        (Yi || ((Yi = !0), (Tu = a)), vu(t, n));
      }),
      s
    );
  }
  function Yf(t, n, s) {
    ((s = yn(-1, s)), (s.tag = 3));
    var a = t.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var d = n.value;
      ((s.payload = function () {
        return a(d);
      }),
        (s.callback = function () {
          vu(t, n);
        }));
    }
    var g = t.stateNode;
    return (
      g !== null &&
        typeof g.componentDidCatch == "function" &&
        (s.callback = function () {
          (vu(t, n),
            typeof a != "function" &&
              (Hn === null ? (Hn = new Set([this])) : Hn.add(this)));
          var N = n.stack;
          this.componentDidCatch(n.value, {
            componentStack: N !== null ? N : "",
          });
        }),
      s
    );
  }
  function Xf(t, n, s) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Ly();
      var d = new Set();
      a.set(n, d);
    } else ((d = a.get(n)), d === void 0 && ((d = new Set()), a.set(n, d)));
    d.has(s) || (d.add(s), (t = Ky.bind(null, t, n, s)), n.then(t, t));
  }
  function Kf(t) {
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
  function Qf(t, n, s, a, d) {
    return (t.mode & 1) === 0
      ? (t === n
          ? (t.flags |= 65536)
          : ((t.flags |= 128),
            (s.flags |= 131072),
            (s.flags &= -52805),
            s.tag === 1 &&
              (s.alternate === null
                ? (s.tag = 17)
                : ((n = yn(-1, 1)), (n.tag = 2), On(s, n, 1))),
            (s.lanes |= 1)),
        t)
      : ((t.flags |= 65536), (t.lanes = d), t);
  }
  var zy = j.ReactCurrentOwner,
    vt = !1;
  function pt(t, n, s, a) {
    n.child = t === null ? mf(n, null, s, a) : Yr(n, t.child, s, a);
  }
  function Gf(t, n, s, a, d) {
    s = s.render;
    var g = n.ref;
    return (
      Kr(n, d),
      (a = uu(t, n, s, a, g, d)),
      (s = cu()),
      t !== null && !vt
        ? ((n.updateQueue = t.updateQueue),
          (n.flags &= -2053),
          (t.lanes &= ~d),
          vn(t, n, d))
        : (He && s && Ya(n), (n.flags |= 1), pt(t, n, a, d), n.child)
    );
  }
  function qf(t, n, s, a, d) {
    if (t === null) {
      var g = s.type;
      return typeof g == "function" &&
        !Fu(g) &&
        g.defaultProps === void 0 &&
        s.compare === null &&
        s.defaultProps === void 0
        ? ((n.tag = 15), (n.type = g), Zf(t, n, g, a, d))
        : ((t = Zi(s.type, null, a, n, n.mode, d)),
          (t.ref = n.ref),
          (t.return = n),
          (n.child = t));
    }
    if (((g = t.child), (t.lanes & d) === 0)) {
      var N = g.memoizedProps;
      if (
        ((s = s.compare), (s = s !== null ? s : Vo), s(N, a) && t.ref === n.ref)
      )
        return vn(t, n, d);
    }
    return (
      (n.flags |= 1),
      (t = Un(g, a)),
      (t.ref = n.ref),
      (t.return = n),
      (n.child = t)
    );
  }
  function Zf(t, n, s, a, d) {
    if (t !== null) {
      var g = t.memoizedProps;
      if (Vo(g, a) && t.ref === n.ref)
        if (((vt = !1), (n.pendingProps = a = g), (t.lanes & d) !== 0))
          (t.flags & 131072) !== 0 && (vt = !0);
        else return ((n.lanes = t.lanes), vn(t, n, d));
    }
    return xu(t, n, s, a, d);
  }
  function Jf(t, n, s) {
    var a = n.pendingProps,
      d = a.children,
      g = t !== null ? t.memoizedState : null;
    if (a.mode === "hidden")
      if ((n.mode & 1) === 0)
        ((n.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          $e(Zr, jt),
          (jt |= s));
      else {
        if ((s & 1073741824) === 0)
          return (
            (t = g !== null ? g.baseLanes | s : s),
            (n.lanes = n.childLanes = 1073741824),
            (n.memoizedState = {
              baseLanes: t,
              cachePool: null,
              transitions: null,
            }),
            (n.updateQueue = null),
            $e(Zr, jt),
            (jt |= t),
            null
          );
        ((n.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (a = g !== null ? g.baseLanes : s),
          $e(Zr, jt),
          (jt |= a));
      }
    else
      (g !== null ? ((a = g.baseLanes | s), (n.memoizedState = null)) : (a = s),
        $e(Zr, jt),
        (jt |= a));
    return (pt(t, n, d, s), n.child);
  }
  function eh(t, n) {
    var s = n.ref;
    ((t === null && s !== null) || (t !== null && t.ref !== s)) &&
      ((n.flags |= 512), (n.flags |= 2097152));
  }
  function xu(t, n, s, a, d) {
    var g = yt(s) ? sr : ct.current;
    return (
      (g = Br(n, g)),
      Kr(n, d),
      (s = uu(t, n, s, a, g, d)),
      (a = cu()),
      t !== null && !vt
        ? ((n.updateQueue = t.updateQueue),
          (n.flags &= -2053),
          (t.lanes &= ~d),
          vn(t, n, d))
        : (He && a && Ya(n), (n.flags |= 1), pt(t, n, s, d), n.child)
    );
  }
  function th(t, n, s, a, d) {
    if (yt(s)) {
      var g = !0;
      ki(n);
    } else g = !1;
    if ((Kr(n, d), n.stateNode === null))
      (Hi(t, n), Vf(n, s, a), gu(n, s, a, d), (a = !0));
    else if (t === null) {
      var N = n.stateNode,
        T = n.memoizedProps;
      N.props = T;
      var O = N.context,
        ee = s.contextType;
      typeof ee == "object" && ee !== null
        ? (ee = At(ee))
        : ((ee = yt(s) ? sr : ct.current), (ee = Br(n, ee)));
      var ce = s.getDerivedStateFromProps,
        he =
          typeof ce == "function" ||
          typeof N.getSnapshotBeforeUpdate == "function";
      (he ||
        (typeof N.UNSAFE_componentWillReceiveProps != "function" &&
          typeof N.componentWillReceiveProps != "function") ||
        ((T !== a || O !== ee) && Wf(n, N, a, ee)),
        (Dn = !1));
      var ue = n.memoizedState;
      ((N.state = ue),
        Ri(n, a, N, d),
        (O = n.memoizedState),
        T !== a || ue !== O || gt.current || Dn
          ? (typeof ce == "function" &&
              (mu(n, s, ce, a), (O = n.memoizedState)),
            (T = Dn || Bf(n, s, T, a, ue, O, ee))
              ? (he ||
                  (typeof N.UNSAFE_componentWillMount != "function" &&
                    typeof N.componentWillMount != "function") ||
                  (typeof N.componentWillMount == "function" &&
                    N.componentWillMount(),
                  typeof N.UNSAFE_componentWillMount == "function" &&
                    N.UNSAFE_componentWillMount()),
                typeof N.componentDidMount == "function" &&
                  (n.flags |= 4194308))
              : (typeof N.componentDidMount == "function" &&
                  (n.flags |= 4194308),
                (n.memoizedProps = a),
                (n.memoizedState = O)),
            (N.props = a),
            (N.state = O),
            (N.context = ee),
            (a = T))
          : (typeof N.componentDidMount == "function" && (n.flags |= 4194308),
            (a = !1)));
    } else {
      ((N = n.stateNode),
        yf(t, n),
        (T = n.memoizedProps),
        (ee = n.type === n.elementType ? T : Wt(n.type, T)),
        (N.props = ee),
        (he = n.pendingProps),
        (ue = N.context),
        (O = s.contextType),
        typeof O == "object" && O !== null
          ? (O = At(O))
          : ((O = yt(s) ? sr : ct.current), (O = Br(n, O))));
      var xe = s.getDerivedStateFromProps;
      ((ce =
        typeof xe == "function" ||
        typeof N.getSnapshotBeforeUpdate == "function") ||
        (typeof N.UNSAFE_componentWillReceiveProps != "function" &&
          typeof N.componentWillReceiveProps != "function") ||
        ((T !== he || ue !== O) && Wf(n, N, a, O)),
        (Dn = !1),
        (ue = n.memoizedState),
        (N.state = ue),
        Ri(n, a, N, d));
      var Se = n.memoizedState;
      T !== he || ue !== Se || gt.current || Dn
        ? (typeof xe == "function" && (mu(n, s, xe, a), (Se = n.memoizedState)),
          (ee = Dn || Bf(n, s, ee, a, ue, Se, O) || !1)
            ? (ce ||
                (typeof N.UNSAFE_componentWillUpdate != "function" &&
                  typeof N.componentWillUpdate != "function") ||
                (typeof N.componentWillUpdate == "function" &&
                  N.componentWillUpdate(a, Se, O),
                typeof N.UNSAFE_componentWillUpdate == "function" &&
                  N.UNSAFE_componentWillUpdate(a, Se, O)),
              typeof N.componentDidUpdate == "function" && (n.flags |= 4),
              typeof N.getSnapshotBeforeUpdate == "function" &&
                (n.flags |= 1024))
            : (typeof N.componentDidUpdate != "function" ||
                (T === t.memoizedProps && ue === t.memoizedState) ||
                (n.flags |= 4),
              typeof N.getSnapshotBeforeUpdate != "function" ||
                (T === t.memoizedProps && ue === t.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = a),
              (n.memoizedState = Se)),
          (N.props = a),
          (N.state = Se),
          (N.context = O),
          (a = ee))
        : (typeof N.componentDidUpdate != "function" ||
            (T === t.memoizedProps && ue === t.memoizedState) ||
            (n.flags |= 4),
          typeof N.getSnapshotBeforeUpdate != "function" ||
            (T === t.memoizedProps && ue === t.memoizedState) ||
            (n.flags |= 1024),
          (a = !1));
    }
    return wu(t, n, s, a, g, d);
  }
  function wu(t, n, s, a, d, g) {
    eh(t, n);
    var N = (n.flags & 128) !== 0;
    if (!a && !N) return (d && sf(n, s, !1), vn(t, n, g));
    ((a = n.stateNode), (zy.current = n));
    var T =
      N && typeof s.getDerivedStateFromError != "function" ? null : a.render();
    return (
      (n.flags |= 1),
      t !== null && N
        ? ((n.child = Yr(n, t.child, null, g)), (n.child = Yr(n, null, T, g)))
        : pt(t, n, T, g),
      (n.memoizedState = a.state),
      d && sf(n, s, !0),
      n.child
    );
  }
  function nh(t) {
    var n = t.stateNode;
    (n.pendingContext
      ? rf(t, n.pendingContext, n.pendingContext !== n.context)
      : n.context && rf(t, n.context, !1),
      ru(t, n.containerInfo));
  }
  function rh(t, n, s, a, d) {
    return (Ur(), Ga(d), (n.flags |= 256), pt(t, n, s, a), n.child);
  }
  var Su = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Eu(t) {
    return { baseLanes: t, cachePool: null, transitions: null };
  }
  function oh(t, n, s) {
    var a = n.pendingProps,
      d = Ye.current,
      g = !1,
      N = (n.flags & 128) !== 0,
      T;
    if (
      ((T = N) ||
        (T = t !== null && t.memoizedState === null ? !1 : (d & 2) !== 0),
      T
        ? ((g = !0), (n.flags &= -129))
        : (t === null || t.memoizedState !== null) && (d |= 1),
      $e(Ye, d & 1),
      t === null)
    )
      return (
        Qa(n),
        (t = n.memoizedState),
        t !== null && ((t = t.dehydrated), t !== null)
          ? ((n.mode & 1) === 0
              ? (n.lanes = 1)
              : t.data === "$!"
                ? (n.lanes = 8)
                : (n.lanes = 1073741824),
            null)
          : ((N = a.children),
            (t = a.fallback),
            g
              ? ((a = n.mode),
                (g = n.child),
                (N = { mode: "hidden", children: N }),
                (a & 1) === 0 && g !== null
                  ? ((g.childLanes = 0), (g.pendingProps = N))
                  : (g = Ji(N, a, 0, null)),
                (t = mr(t, a, s, null)),
                (g.return = n),
                (t.return = n),
                (g.sibling = t),
                (n.child = g),
                (n.child.memoizedState = Eu(s)),
                (n.memoizedState = Su),
                t)
              : ku(n, N))
      );
    if (((d = t.memoizedState), d !== null && ((T = d.dehydrated), T !== null)))
      return Ay(t, n, N, a, T, d, s);
    if (g) {
      ((g = a.fallback), (N = n.mode), (d = t.child), (T = d.sibling));
      var O = { mode: "hidden", children: a.children };
      return (
        (N & 1) === 0 && n.child !== d
          ? ((a = n.child),
            (a.childLanes = 0),
            (a.pendingProps = O),
            (n.deletions = null))
          : ((a = Un(d, O)), (a.subtreeFlags = d.subtreeFlags & 14680064)),
        T !== null ? (g = Un(T, g)) : ((g = mr(g, N, s, null)), (g.flags |= 2)),
        (g.return = n),
        (a.return = n),
        (a.sibling = g),
        (n.child = a),
        (a = g),
        (g = n.child),
        (N = t.child.memoizedState),
        (N =
          N === null
            ? Eu(s)
            : {
                baseLanes: N.baseLanes | s,
                cachePool: null,
                transitions: N.transitions,
              }),
        (g.memoizedState = N),
        (g.childLanes = t.childLanes & ~s),
        (n.memoizedState = Su),
        a
      );
    }
    return (
      (g = t.child),
      (t = g.sibling),
      (a = Un(g, { mode: "visible", children: a.children })),
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
  function ku(t, n) {
    return (
      (n = Ji({ mode: "visible", children: n }, t.mode, 0, null)),
      (n.return = t),
      (t.child = n)
    );
  }
  function Fi(t, n, s, a) {
    return (
      a !== null && Ga(a),
      Yr(n, t.child, null, s),
      (t = ku(n, n.pendingProps.children)),
      (t.flags |= 2),
      (n.memoizedState = null),
      t
    );
  }
  function Ay(t, n, s, a, d, g, N) {
    if (s)
      return n.flags & 256
        ? ((n.flags &= -257), (a = yu(Error(o(422)))), Fi(t, n, N, a))
        : n.memoizedState !== null
          ? ((n.child = t.child), (n.flags |= 128), null)
          : ((g = a.fallback),
            (d = n.mode),
            (a = Ji({ mode: "visible", children: a.children }, d, 0, null)),
            (g = mr(g, d, N, null)),
            (g.flags |= 2),
            (a.return = n),
            (g.return = n),
            (a.sibling = g),
            (n.child = a),
            (n.mode & 1) !== 0 && Yr(n, t.child, null, N),
            (n.child.memoizedState = Eu(N)),
            (n.memoizedState = Su),
            g);
    if ((n.mode & 1) === 0) return Fi(t, n, N, null);
    if (d.data === "$!") {
      if (((a = d.nextSibling && d.nextSibling.dataset), a)) var T = a.dgst;
      return (
        (a = T),
        (g = Error(o(419))),
        (a = yu(g, a, void 0)),
        Fi(t, n, N, a)
      );
    }
    if (((T = (N & t.childLanes) !== 0), vt || T)) {
      if (((a = st), a !== null)) {
        switch (N & -N) {
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
        ((d = (d & (a.suspendedLanes | N)) !== 0 ? 0 : d),
          d !== 0 &&
            d !== g.retryLane &&
            ((g.retryLane = d), gn(t, d), Xt(a, t, d, -1)));
      }
      return (Ou(), (a = yu(Error(o(421)))), Fi(t, n, N, a));
    }
    return d.data === "$?"
      ? ((n.flags |= 128),
        (n.child = t.child),
        (n = Qy.bind(null, t)),
        (d._reactRetry = n),
        null)
      : ((t = g.treeContext),
        (_t = Ln(d.nextSibling)),
        (bt = n),
        (He = !0),
        (Vt = null),
        t !== null &&
          ((Lt[zt++] = pn),
          (Lt[zt++] = mn),
          (Lt[zt++] = ir),
          (pn = t.id),
          (mn = t.overflow),
          (ir = n)),
        (n = ku(n, a.children)),
        (n.flags |= 4096),
        n);
  }
  function sh(t, n, s) {
    t.lanes |= n;
    var a = t.alternate;
    (a !== null && (a.lanes |= n), eu(t.return, n, s));
  }
  function Nu(t, n, s, a, d) {
    var g = t.memoizedState;
    g === null
      ? (t.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: s,
          tailMode: d,
        })
      : ((g.isBackwards = n),
        (g.rendering = null),
        (g.renderingStartTime = 0),
        (g.last = a),
        (g.tail = s),
        (g.tailMode = d));
  }
  function ih(t, n, s) {
    var a = n.pendingProps,
      d = a.revealOrder,
      g = a.tail;
    if ((pt(t, n, a.children, s), (a = Ye.current), (a & 2) !== 0))
      ((a = (a & 1) | 2), (n.flags |= 128));
    else {
      if (t !== null && (t.flags & 128) !== 0)
        e: for (t = n.child; t !== null; ) {
          if (t.tag === 13) t.memoizedState !== null && sh(t, s, n);
          else if (t.tag === 19) sh(t, s, n);
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
    if (($e(Ye, a), (n.mode & 1) === 0)) n.memoizedState = null;
    else
      switch (d) {
        case "forwards":
          for (s = n.child, d = null; s !== null; )
            ((t = s.alternate),
              t !== null && Ti(t) === null && (d = s),
              (s = s.sibling));
          ((s = d),
            s === null
              ? ((d = n.child), (n.child = null))
              : ((d = s.sibling), (s.sibling = null)),
            Nu(n, !1, d, s, g));
          break;
        case "backwards":
          for (s = null, d = n.child, n.child = null; d !== null; ) {
            if (((t = d.alternate), t !== null && Ti(t) === null)) {
              n.child = d;
              break;
            }
            ((t = d.sibling), (d.sibling = s), (s = d), (d = t));
          }
          Nu(n, !0, s, null, g);
          break;
        case "together":
          Nu(n, !1, null, null, void 0);
          break;
        default:
          n.memoizedState = null;
      }
    return n.child;
  }
  function Hi(t, n) {
    (n.mode & 1) === 0 &&
      t !== null &&
      ((t.alternate = null), (n.alternate = null), (n.flags |= 2));
  }
  function vn(t, n, s) {
    if (
      (t !== null && (n.dependencies = t.dependencies),
      (dr |= n.lanes),
      (s & n.childLanes) === 0)
    )
      return null;
    if (t !== null && n.child !== t.child) throw Error(o(153));
    if (n.child !== null) {
      for (
        t = n.child, s = Un(t, t.pendingProps), n.child = s, s.return = n;
        t.sibling !== null;
      )
        ((t = t.sibling),
          (s = s.sibling = Un(t, t.pendingProps)),
          (s.return = n));
      s.sibling = null;
    }
    return n.child;
  }
  function $y(t, n, s) {
    switch (n.tag) {
      case 3:
        (nh(n), Ur());
        break;
      case 5:
        wf(n);
        break;
      case 1:
        yt(n.type) && ki(n);
        break;
      case 4:
        ru(n, n.stateNode.containerInfo);
        break;
      case 10:
        var a = n.type._context,
          d = n.memoizedProps.value;
        ($e(Ii, a._currentValue), (a._currentValue = d));
        break;
      case 13:
        if (((a = n.memoizedState), a !== null))
          return a.dehydrated !== null
            ? ($e(Ye, Ye.current & 1), (n.flags |= 128), null)
            : (s & n.child.childLanes) !== 0
              ? oh(t, n, s)
              : ($e(Ye, Ye.current & 1),
                (t = vn(t, n, s)),
                t !== null ? t.sibling : null);
        $e(Ye, Ye.current & 1);
        break;
      case 19:
        if (((a = (s & n.childLanes) !== 0), (t.flags & 128) !== 0)) {
          if (a) return ih(t, n, s);
          n.flags |= 128;
        }
        if (
          ((d = n.memoizedState),
          d !== null &&
            ((d.rendering = null), (d.tail = null), (d.lastEffect = null)),
          $e(Ye, Ye.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((n.lanes = 0), Jf(t, n, s));
    }
    return vn(t, n, s);
  }
  var lh, Cu, ah, uh;
  ((lh = function (t, n) {
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
    (Cu = function () {}),
    (ah = function (t, n, s, a) {
      var d = t.memoizedProps;
      if (d !== a) {
        ((t = n.stateNode), ur(nn.current));
        var g = null;
        switch (s) {
          case "input":
            ((d = Ee(t, d)), (a = Ee(t, a)), (g = []));
            break;
          case "select":
            ((d = U({}, d, { value: void 0 })),
              (a = U({}, a, { value: void 0 })),
              (g = []));
            break;
          case "textarea":
            ((d = ze(t, d)), (a = ze(t, a)), (g = []));
            break;
          default:
            typeof d.onClick != "function" &&
              typeof a.onClick == "function" &&
              (t.onclick = wi);
        }
        wo(s, a);
        var N;
        s = null;
        for (ee in d)
          if (!a.hasOwnProperty(ee) && d.hasOwnProperty(ee) && d[ee] != null)
            if (ee === "style") {
              var T = d[ee];
              for (N in T) T.hasOwnProperty(N) && (s || (s = {}), (s[N] = ""));
            } else
              ee !== "dangerouslySetInnerHTML" &&
                ee !== "children" &&
                ee !== "suppressContentEditableWarning" &&
                ee !== "suppressHydrationWarning" &&
                ee !== "autoFocus" &&
                (l.hasOwnProperty(ee)
                  ? g || (g = [])
                  : (g = g || []).push(ee, null));
        for (ee in a) {
          var O = a[ee];
          if (
            ((T = d != null ? d[ee] : void 0),
            a.hasOwnProperty(ee) && O !== T && (O != null || T != null))
          )
            if (ee === "style")
              if (T) {
                for (N in T)
                  !T.hasOwnProperty(N) ||
                    (O && O.hasOwnProperty(N)) ||
                    (s || (s = {}), (s[N] = ""));
                for (N in O)
                  O.hasOwnProperty(N) &&
                    T[N] !== O[N] &&
                    (s || (s = {}), (s[N] = O[N]));
              } else (s || (g || (g = []), g.push(ee, s)), (s = O));
            else
              ee === "dangerouslySetInnerHTML"
                ? ((O = O ? O.__html : void 0),
                  (T = T ? T.__html : void 0),
                  O != null && T !== O && (g = g || []).push(ee, O))
                : ee === "children"
                  ? (typeof O != "string" && typeof O != "number") ||
                    (g = g || []).push(ee, "" + O)
                  : ee !== "suppressContentEditableWarning" &&
                    ee !== "suppressHydrationWarning" &&
                    (l.hasOwnProperty(ee)
                      ? (O != null && ee === "onScroll" && Oe("scroll", t),
                        g || T === O || (g = []))
                      : (g = g || []).push(ee, O));
        }
        s && (g = g || []).push("style", s);
        var ee = g;
        (n.updateQueue = ee) && (n.flags |= 4);
      }
    }),
    (uh = function (t, n, s, a) {
      s !== a && (n.flags |= 4);
    }));
  function os(t, n) {
    if (!He)
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
  function ft(t) {
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
  function Dy(t, n, s) {
    var a = n.pendingProps;
    switch ((Xa(n), n.tag)) {
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
        return (ft(n), null);
      case 1:
        return (yt(n.type) && Ei(), ft(n), null);
      case 3:
        return (
          (a = n.stateNode),
          Qr(),
          Fe(gt),
          Fe(ct),
          iu(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (_i(n)
              ? (n.flags |= 4)
              : t === null ||
                (t.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), Vt !== null && (Au(Vt), (Vt = null)))),
          Cu(t, n),
          ft(n),
          null
        );
      case 5:
        ou(n);
        var d = ur(Jo.current);
        if (((s = n.type), t !== null && n.stateNode != null))
          (ah(t, n, s, a, d),
            t.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152)));
        else {
          if (!a) {
            if (n.stateNode === null) throw Error(o(166));
            return (ft(n), null);
          }
          if (((t = ur(nn.current)), _i(n))) {
            ((a = n.stateNode), (s = n.type));
            var g = n.memoizedProps;
            switch (((a[tn] = n), (a[Ko] = g), (t = (n.mode & 1) !== 0), s)) {
              case "dialog":
                (Oe("cancel", a), Oe("close", a));
                break;
              case "iframe":
              case "object":
              case "embed":
                Oe("load", a);
                break;
              case "video":
              case "audio":
                for (d = 0; d < Uo.length; d++) Oe(Uo[d], a);
                break;
              case "source":
                Oe("error", a);
                break;
              case "img":
              case "image":
              case "link":
                (Oe("error", a), Oe("load", a));
                break;
              case "details":
                Oe("toggle", a);
                break;
              case "input":
                (de(a, g), Oe("invalid", a));
                break;
              case "select":
                ((a._wrapperState = { wasMultiple: !!g.multiple }),
                  Oe("invalid", a));
                break;
              case "textarea":
                (Ge(a, g), Oe("invalid", a));
            }
            (wo(s, g), (d = null));
            for (var N in g)
              if (g.hasOwnProperty(N)) {
                var T = g[N];
                N === "children"
                  ? typeof T == "string"
                    ? a.textContent !== T &&
                      (g.suppressHydrationWarning !== !0 &&
                        xi(a.textContent, T, t),
                      (d = ["children", T]))
                    : typeof T == "number" &&
                      a.textContent !== "" + T &&
                      (g.suppressHydrationWarning !== !0 &&
                        xi(a.textContent, T, t),
                      (d = ["children", "" + T]))
                  : l.hasOwnProperty(N) &&
                    T != null &&
                    N === "onScroll" &&
                    Oe("scroll", a);
              }
            switch (s) {
              case "input":
                (me(a), ae(a, g, !0));
                break;
              case "textarea":
                (me(a), rt(a));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof g.onClick == "function" && (a.onclick = wi);
            }
            ((a = d), (n.updateQueue = a), a !== null && (n.flags |= 4));
          } else {
            ((N = d.nodeType === 9 ? d : d.ownerDocument),
              t === "http://www.w3.org/1999/xhtml" && (t = qe(s)),
              t === "http://www.w3.org/1999/xhtml"
                ? s === "script"
                  ? ((t = N.createElement("div")),
                    (t.innerHTML = "<script><\/script>"),
                    (t = t.removeChild(t.firstChild)))
                  : typeof a.is == "string"
                    ? (t = N.createElement(s, { is: a.is }))
                    : ((t = N.createElement(s)),
                      s === "select" &&
                        ((N = t),
                        a.multiple
                          ? (N.multiple = !0)
                          : a.size && (N.size = a.size)))
                : (t = N.createElementNS(t, s)),
              (t[tn] = n),
              (t[Ko] = a),
              lh(t, n, !1, !1),
              (n.stateNode = t));
            e: {
              switch (((N = So(s, a)), s)) {
                case "dialog":
                  (Oe("cancel", t), Oe("close", t), (d = a));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (Oe("load", t), (d = a));
                  break;
                case "video":
                case "audio":
                  for (d = 0; d < Uo.length; d++) Oe(Uo[d], t);
                  d = a;
                  break;
                case "source":
                  (Oe("error", t), (d = a));
                  break;
                case "img":
                case "image":
                case "link":
                  (Oe("error", t), Oe("load", t), (d = a));
                  break;
                case "details":
                  (Oe("toggle", t), (d = a));
                  break;
                case "input":
                  (de(t, a), (d = Ee(t, a)), Oe("invalid", t));
                  break;
                case "option":
                  d = a;
                  break;
                case "select":
                  ((t._wrapperState = { wasMultiple: !!a.multiple }),
                    (d = U({}, a, { value: void 0 })),
                    Oe("invalid", t));
                  break;
                case "textarea":
                  (Ge(t, a), (d = ze(t, a)), Oe("invalid", t));
                  break;
                default:
                  d = a;
              }
              (wo(s, d), (T = d));
              for (g in T)
                if (T.hasOwnProperty(g)) {
                  var O = T[g];
                  g === "style"
                    ? Ws(t, O)
                    : g === "dangerouslySetInnerHTML"
                      ? ((O = O ? O.__html : void 0), O != null && Cr(t, O))
                      : g === "children"
                        ? typeof O == "string"
                          ? (s !== "textarea" || O !== "") && dn(t, O)
                          : typeof O == "number" && dn(t, "" + O)
                        : g !== "suppressContentEditableWarning" &&
                          g !== "suppressHydrationWarning" &&
                          g !== "autoFocus" &&
                          (l.hasOwnProperty(g)
                            ? O != null && g === "onScroll" && Oe("scroll", t)
                            : O != null && E(t, g, O, N));
                }
              switch (s) {
                case "input":
                  (me(t), ae(t, a, !1));
                  break;
                case "textarea":
                  (me(t), rt(t));
                  break;
                case "option":
                  a.value != null && t.setAttribute("value", "" + Q(a.value));
                  break;
                case "select":
                  ((t.multiple = !!a.multiple),
                    (g = a.value),
                    g != null
                      ? De(t, !!a.multiple, g, !1)
                      : a.defaultValue != null &&
                        De(t, !!a.multiple, a.defaultValue, !0));
                  break;
                default:
                  typeof d.onClick == "function" && (t.onclick = wi);
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
        return (ft(n), null);
      case 6:
        if (t && n.stateNode != null) uh(t, n, t.memoizedProps, a);
        else {
          if (typeof a != "string" && n.stateNode === null) throw Error(o(166));
          if (((s = ur(Jo.current)), ur(nn.current), _i(n))) {
            if (
              ((a = n.stateNode),
              (s = n.memoizedProps),
              (a[tn] = n),
              (g = a.nodeValue !== s) && ((t = bt), t !== null))
            )
              switch (t.tag) {
                case 3:
                  xi(a.nodeValue, s, (t.mode & 1) !== 0);
                  break;
                case 5:
                  t.memoizedProps.suppressHydrationWarning !== !0 &&
                    xi(a.nodeValue, s, (t.mode & 1) !== 0);
              }
            g && (n.flags |= 4);
          } else
            ((a = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(a)),
              (a[tn] = n),
              (n.stateNode = a));
        }
        return (ft(n), null);
      case 13:
        if (
          (Fe(Ye),
          (a = n.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (He && _t !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0)
            (ff(), Ur(), (n.flags |= 98560), (g = !1));
          else if (((g = _i(n)), a !== null && a.dehydrated !== null)) {
            if (t === null) {
              if (!g) throw Error(o(318));
              if (
                ((g = n.memoizedState),
                (g = g !== null ? g.dehydrated : null),
                !g)
              )
                throw Error(o(317));
              g[tn] = n;
            } else
              (Ur(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4));
            (ft(n), (g = !1));
          } else (Vt !== null && (Au(Vt), (Vt = null)), (g = !0));
          if (!g) return n.flags & 65536 ? n : null;
        }
        return (n.flags & 128) !== 0
          ? ((n.lanes = s), n)
          : ((a = a !== null),
            a !== (t !== null && t.memoizedState !== null) &&
              a &&
              ((n.child.flags |= 8192),
              (n.mode & 1) !== 0 &&
                (t === null || (Ye.current & 1) !== 0
                  ? tt === 0 && (tt = 3)
                  : Ou())),
            n.updateQueue !== null && (n.flags |= 4),
            ft(n),
            null);
      case 4:
        return (
          Qr(),
          Cu(t, n),
          t === null && Yo(n.stateNode.containerInfo),
          ft(n),
          null
        );
      case 10:
        return (Ja(n.type._context), ft(n), null);
      case 17:
        return (yt(n.type) && Ei(), ft(n), null);
      case 19:
        if ((Fe(Ye), (g = n.memoizedState), g === null)) return (ft(n), null);
        if (((a = (n.flags & 128) !== 0), (N = g.rendering), N === null))
          if (a) os(g, !1);
          else {
            if (tt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = n.child; t !== null; ) {
                if (((N = Ti(t)), N !== null)) {
                  for (
                    n.flags |= 128,
                      os(g, !1),
                      a = N.updateQueue,
                      a !== null && ((n.updateQueue = a), (n.flags |= 4)),
                      n.subtreeFlags = 0,
                      a = s,
                      s = n.child;
                    s !== null;
                  )
                    ((g = s),
                      (t = a),
                      (g.flags &= 14680066),
                      (N = g.alternate),
                      N === null
                        ? ((g.childLanes = 0),
                          (g.lanes = t),
                          (g.child = null),
                          (g.subtreeFlags = 0),
                          (g.memoizedProps = null),
                          (g.memoizedState = null),
                          (g.updateQueue = null),
                          (g.dependencies = null),
                          (g.stateNode = null))
                        : ((g.childLanes = N.childLanes),
                          (g.lanes = N.lanes),
                          (g.child = N.child),
                          (g.subtreeFlags = 0),
                          (g.deletions = null),
                          (g.memoizedProps = N.memoizedProps),
                          (g.memoizedState = N.memoizedState),
                          (g.updateQueue = N.updateQueue),
                          (g.type = N.type),
                          (t = N.dependencies),
                          (g.dependencies =
                            t === null
                              ? null
                              : {
                                  lanes: t.lanes,
                                  firstContext: t.firstContext,
                                })),
                      (s = s.sibling));
                  return ($e(Ye, (Ye.current & 1) | 2), n.child);
                }
                t = t.sibling;
              }
            g.tail !== null &&
              Ue() > Jr &&
              ((n.flags |= 128), (a = !0), os(g, !1), (n.lanes = 4194304));
          }
        else {
          if (!a)
            if (((t = Ti(N)), t !== null)) {
              if (
                ((n.flags |= 128),
                (a = !0),
                (s = t.updateQueue),
                s !== null && ((n.updateQueue = s), (n.flags |= 4)),
                os(g, !0),
                g.tail === null &&
                  g.tailMode === "hidden" &&
                  !N.alternate &&
                  !He)
              )
                return (ft(n), null);
            } else
              2 * Ue() - g.renderingStartTime > Jr &&
                s !== 1073741824 &&
                ((n.flags |= 128), (a = !0), os(g, !1), (n.lanes = 4194304));
          g.isBackwards
            ? ((N.sibling = n.child), (n.child = N))
            : ((s = g.last),
              s !== null ? (s.sibling = N) : (n.child = N),
              (g.last = N));
        }
        return g.tail !== null
          ? ((n = g.tail),
            (g.rendering = n),
            (g.tail = n.sibling),
            (g.renderingStartTime = Ue()),
            (n.sibling = null),
            (s = Ye.current),
            $e(Ye, a ? (s & 1) | 2 : s & 1),
            n)
          : (ft(n), null);
      case 22:
      case 23:
        return (
          Du(),
          (a = n.memoizedState !== null),
          t !== null && (t.memoizedState !== null) !== a && (n.flags |= 8192),
          a && (n.mode & 1) !== 0
            ? (jt & 1073741824) !== 0 &&
              (ft(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : ft(n),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(o(156, n.tag));
  }
  function Oy(t, n) {
    switch ((Xa(n), n.tag)) {
      case 1:
        return (
          yt(n.type) && Ei(),
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 3:
        return (
          Qr(),
          Fe(gt),
          Fe(ct),
          iu(),
          (t = n.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((n.flags = (t & -65537) | 128), n)
            : null
        );
      case 5:
        return (ou(n), null);
      case 13:
        if (
          (Fe(Ye), (t = n.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (n.alternate === null) throw Error(o(340));
          Ur();
        }
        return (
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 19:
        return (Fe(Ye), null);
      case 4:
        return (Qr(), null);
      case 10:
        return (Ja(n.type._context), null);
      case 22:
      case 23:
        return (Du(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Bi = !1,
    ht = !1,
    Fy = typeof WeakSet == "function" ? WeakSet : Set,
    we = null;
  function qr(t, n) {
    var s = t.ref;
    if (s !== null)
      if (typeof s == "function")
        try {
          s(null);
        } catch (a) {
          Ke(t, n, a);
        }
      else s.current = null;
  }
  function bu(t, n, s) {
    try {
      s();
    } catch (a) {
      Ke(t, n, a);
    }
  }
  var ch = !1;
  function Hy(t, n) {
    if (((Da = ai), (t = Hd()), Ma(t))) {
      if ("selectionStart" in t)
        var s = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          s = ((s = t.ownerDocument) && s.defaultView) || window;
          var a = s.getSelection && s.getSelection();
          if (a && a.rangeCount !== 0) {
            s = a.anchorNode;
            var d = a.anchorOffset,
              g = a.focusNode;
            a = a.focusOffset;
            try {
              (s.nodeType, g.nodeType);
            } catch {
              s = null;
              break e;
            }
            var N = 0,
              T = -1,
              O = -1,
              ee = 0,
              ce = 0,
              he = t,
              ue = null;
            t: for (;;) {
              for (
                var xe;
                he !== s || (d !== 0 && he.nodeType !== 3) || (T = N + d),
                  he !== g || (a !== 0 && he.nodeType !== 3) || (O = N + a),
                  he.nodeType === 3 && (N += he.nodeValue.length),
                  (xe = he.firstChild) !== null;
              )
                ((ue = he), (he = xe));
              for (;;) {
                if (he === t) break t;
                if (
                  (ue === s && ++ee === d && (T = N),
                  ue === g && ++ce === a && (O = N),
                  (xe = he.nextSibling) !== null)
                )
                  break;
                ((he = ue), (ue = he.parentNode));
              }
              he = xe;
            }
            s = T === -1 || O === -1 ? null : { start: T, end: O };
          } else s = null;
        }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (
      Oa = { focusedElem: t, selectionRange: s }, ai = !1, we = n;
      we !== null;
    )
      if (
        ((n = we), (t = n.child), (n.subtreeFlags & 1028) !== 0 && t !== null)
      )
        ((t.return = n), (we = t));
      else
        for (; we !== null; ) {
          n = we;
          try {
            var Se = n.alternate;
            if ((n.flags & 1024) !== 0)
              switch (n.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (Se !== null) {
                    var ke = Se.memoizedProps,
                      Qe = Se.memoizedState,
                      q = n.stateNode,
                      W = q.getSnapshotBeforeUpdate(
                        n.elementType === n.type ? ke : Wt(n.type, ke),
                        Qe
                      );
                    q.__reactInternalSnapshotBeforeUpdate = W;
                  }
                  break;
                case 3:
                  var J = n.stateNode.containerInfo;
                  J.nodeType === 1
                    ? (J.textContent = "")
                    : J.nodeType === 9 &&
                      J.documentElement &&
                      J.removeChild(J.documentElement);
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
            Ke(n, n.return, pe);
          }
          if (((t = n.sibling), t !== null)) {
            ((t.return = n.return), (we = t));
            break;
          }
          we = n.return;
        }
    return ((Se = ch), (ch = !1), Se);
  }
  function ss(t, n, s) {
    var a = n.updateQueue;
    if (((a = a !== null ? a.lastEffect : null), a !== null)) {
      var d = (a = a.next);
      do {
        if ((d.tag & t) === t) {
          var g = d.destroy;
          ((d.destroy = void 0), g !== void 0 && bu(n, s, g));
        }
        d = d.next;
      } while (d !== a);
    }
  }
  function Vi(t, n) {
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
  function _u(t) {
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
  function dh(t) {
    var n = t.alternate;
    (n !== null && ((t.alternate = null), dh(n)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 &&
        ((n = t.stateNode),
        n !== null &&
          (delete n[tn],
          delete n[Ko],
          delete n[Va],
          delete n[ky],
          delete n[Ny])),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  function fh(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 4;
  }
  function hh(t) {
    e: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || fh(t.return)) return null;
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
  function ju(t, n, s) {
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
            s != null || n.onclick !== null || (n.onclick = wi)));
    else if (a !== 4 && ((t = t.child), t !== null))
      for (ju(t, n, s), t = t.sibling; t !== null; )
        (ju(t, n, s), (t = t.sibling));
  }
  function Iu(t, n, s) {
    var a = t.tag;
    if (a === 5 || a === 6)
      ((t = t.stateNode), n ? s.insertBefore(t, n) : s.appendChild(t));
    else if (a !== 4 && ((t = t.child), t !== null))
      for (Iu(t, n, s), t = t.sibling; t !== null; )
        (Iu(t, n, s), (t = t.sibling));
  }
  var lt = null,
    Ut = !1;
  function Fn(t, n, s) {
    for (s = s.child; s !== null; ) (ph(t, n, s), (s = s.sibling));
  }
  function ph(t, n, s) {
    if (Tt && typeof Tt.onCommitFiberUnmount == "function")
      try {
        Tt.onCommitFiberUnmount(nr, s);
      } catch {}
    switch (s.tag) {
      case 5:
        ht || qr(s, n);
      case 6:
        var a = lt,
          d = Ut;
        ((lt = null),
          Fn(t, n, s),
          (lt = a),
          (Ut = d),
          lt !== null &&
            (Ut
              ? ((t = lt),
                (s = s.stateNode),
                t.nodeType === 8
                  ? t.parentNode.removeChild(s)
                  : t.removeChild(s))
              : lt.removeChild(s.stateNode)));
        break;
      case 18:
        lt !== null &&
          (Ut
            ? ((t = lt),
              (s = s.stateNode),
              t.nodeType === 8
                ? Ba(t.parentNode, s)
                : t.nodeType === 1 && Ba(t, s),
              $o(t))
            : Ba(lt, s.stateNode));
        break;
      case 4:
        ((a = lt),
          (d = Ut),
          (lt = s.stateNode.containerInfo),
          (Ut = !0),
          Fn(t, n, s),
          (lt = a),
          (Ut = d));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !ht &&
          ((a = s.updateQueue), a !== null && ((a = a.lastEffect), a !== null))
        ) {
          d = a = a.next;
          do {
            var g = d,
              N = g.destroy;
            ((g = g.tag),
              N !== void 0 && ((g & 2) !== 0 || (g & 4) !== 0) && bu(s, n, N),
              (d = d.next));
          } while (d !== a);
        }
        Fn(t, n, s);
        break;
      case 1:
        if (
          !ht &&
          (qr(s, n),
          (a = s.stateNode),
          typeof a.componentWillUnmount == "function")
        )
          try {
            ((a.props = s.memoizedProps),
              (a.state = s.memoizedState),
              a.componentWillUnmount());
          } catch (T) {
            Ke(s, n, T);
          }
        Fn(t, n, s);
        break;
      case 21:
        Fn(t, n, s);
        break;
      case 22:
        s.mode & 1
          ? ((ht = (a = ht) || s.memoizedState !== null), Fn(t, n, s), (ht = a))
          : Fn(t, n, s);
        break;
      default:
        Fn(t, n, s);
    }
  }
  function mh(t) {
    var n = t.updateQueue;
    if (n !== null) {
      t.updateQueue = null;
      var s = t.stateNode;
      (s === null && (s = t.stateNode = new Fy()),
        n.forEach(function (a) {
          var d = Gy.bind(null, t, a);
          s.has(a) || (s.add(a), a.then(d, d));
        }));
    }
  }
  function Yt(t, n) {
    var s = n.deletions;
    if (s !== null)
      for (var a = 0; a < s.length; a++) {
        var d = s[a];
        try {
          var g = t,
            N = n,
            T = N;
          e: for (; T !== null; ) {
            switch (T.tag) {
              case 5:
                ((lt = T.stateNode), (Ut = !1));
                break e;
              case 3:
                ((lt = T.stateNode.containerInfo), (Ut = !0));
                break e;
              case 4:
                ((lt = T.stateNode.containerInfo), (Ut = !0));
                break e;
            }
            T = T.return;
          }
          if (lt === null) throw Error(o(160));
          (ph(g, N, d), (lt = null), (Ut = !1));
          var O = d.alternate;
          (O !== null && (O.return = null), (d.return = null));
        } catch (ee) {
          Ke(d, n, ee);
        }
      }
    if (n.subtreeFlags & 12854)
      for (n = n.child; n !== null; ) (gh(n, t), (n = n.sibling));
  }
  function gh(t, n) {
    var s = t.alternate,
      a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Yt(n, t), on(t), a & 4)) {
          try {
            (ss(3, t, t.return), Vi(3, t));
          } catch (ke) {
            Ke(t, t.return, ke);
          }
          try {
            ss(5, t, t.return);
          } catch (ke) {
            Ke(t, t.return, ke);
          }
        }
        break;
      case 1:
        (Yt(n, t), on(t), a & 512 && s !== null && qr(s, s.return));
        break;
      case 5:
        if (
          (Yt(n, t),
          on(t),
          a & 512 && s !== null && qr(s, s.return),
          t.flags & 32)
        ) {
          var d = t.stateNode;
          try {
            dn(d, "");
          } catch (ke) {
            Ke(t, t.return, ke);
          }
        }
        if (a & 4 && ((d = t.stateNode), d != null)) {
          var g = t.memoizedProps,
            N = s !== null ? s.memoizedProps : g,
            T = t.type,
            O = t.updateQueue;
          if (((t.updateQueue = null), O !== null))
            try {
              (T === "input" &&
                g.type === "radio" &&
                g.name != null &&
                le(d, g),
                So(T, N));
              var ee = So(T, g);
              for (N = 0; N < O.length; N += 2) {
                var ce = O[N],
                  he = O[N + 1];
                ce === "style"
                  ? Ws(d, he)
                  : ce === "dangerouslySetInnerHTML"
                    ? Cr(d, he)
                    : ce === "children"
                      ? dn(d, he)
                      : E(d, ce, he, ee);
              }
              switch (T) {
                case "input":
                  ge(d, g);
                  break;
                case "textarea":
                  Rt(d, g);
                  break;
                case "select":
                  var ue = d._wrapperState.wasMultiple;
                  d._wrapperState.wasMultiple = !!g.multiple;
                  var xe = g.value;
                  xe != null
                    ? De(d, !!g.multiple, xe, !1)
                    : ue !== !!g.multiple &&
                      (g.defaultValue != null
                        ? De(d, !!g.multiple, g.defaultValue, !0)
                        : De(d, !!g.multiple, g.multiple ? [] : "", !1));
              }
              d[Ko] = g;
            } catch (ke) {
              Ke(t, t.return, ke);
            }
        }
        break;
      case 6:
        if ((Yt(n, t), on(t), a & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          ((d = t.stateNode), (g = t.memoizedProps));
          try {
            d.nodeValue = g;
          } catch (ke) {
            Ke(t, t.return, ke);
          }
        }
        break;
      case 3:
        if (
          (Yt(n, t), on(t), a & 4 && s !== null && s.memoizedState.isDehydrated)
        )
          try {
            $o(n.containerInfo);
          } catch (ke) {
            Ke(t, t.return, ke);
          }
        break;
      case 4:
        (Yt(n, t), on(t));
        break;
      case 13:
        (Yt(n, t),
          on(t),
          (d = t.child),
          d.flags & 8192 &&
            ((g = d.memoizedState !== null),
            (d.stateNode.isHidden = g),
            !g ||
              (d.alternate !== null && d.alternate.memoizedState !== null) ||
              (Ru = Ue())),
          a & 4 && mh(t));
        break;
      case 22:
        if (
          ((ce = s !== null && s.memoizedState !== null),
          t.mode & 1 ? ((ht = (ee = ht) || ce), Yt(n, t), (ht = ee)) : Yt(n, t),
          on(t),
          a & 8192)
        ) {
          if (
            ((ee = t.memoizedState !== null),
            (t.stateNode.isHidden = ee) && !ce && (t.mode & 1) !== 0)
          )
            for (we = t, ce = t.child; ce !== null; ) {
              for (he = we = ce; we !== null; ) {
                switch (((ue = we), (xe = ue.child), ue.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ss(4, ue, ue.return);
                    break;
                  case 1:
                    qr(ue, ue.return);
                    var Se = ue.stateNode;
                    if (typeof Se.componentWillUnmount == "function") {
                      ((a = ue), (s = ue.return));
                      try {
                        ((n = a),
                          (Se.props = n.memoizedProps),
                          (Se.state = n.memoizedState),
                          Se.componentWillUnmount());
                      } catch (ke) {
                        Ke(a, s, ke);
                      }
                    }
                    break;
                  case 5:
                    qr(ue, ue.return);
                    break;
                  case 22:
                    if (ue.memoizedState !== null) {
                      xh(he);
                      continue;
                    }
                }
                xe !== null ? ((xe.return = ue), (we = xe)) : xh(he);
              }
              ce = ce.sibling;
            }
          e: for (ce = null, he = t; ; ) {
            if (he.tag === 5) {
              if (ce === null) {
                ce = he;
                try {
                  ((d = he.stateNode),
                    ee
                      ? ((g = d.style),
                        typeof g.setProperty == "function"
                          ? g.setProperty("display", "none", "important")
                          : (g.display = "none"))
                      : ((T = he.stateNode),
                        (O = he.memoizedProps.style),
                        (N =
                          O != null && O.hasOwnProperty("display")
                            ? O.display
                            : null),
                        (T.style.display = Vs("display", N))));
                } catch (ke) {
                  Ke(t, t.return, ke);
                }
              }
            } else if (he.tag === 6) {
              if (ce === null)
                try {
                  he.stateNode.nodeValue = ee ? "" : he.memoizedProps;
                } catch (ke) {
                  Ke(t, t.return, ke);
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
              (ce === he && (ce = null), (he = he.return));
            }
            (ce === he && (ce = null),
              (he.sibling.return = he.return),
              (he = he.sibling));
          }
        }
        break;
      case 19:
        (Yt(n, t), on(t), a & 4 && mh(t));
        break;
      case 21:
        break;
      default:
        (Yt(n, t), on(t));
    }
  }
  function on(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        e: {
          for (var s = t.return; s !== null; ) {
            if (fh(s)) {
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
            a.flags & 32 && (dn(d, ""), (a.flags &= -33));
            var g = hh(t);
            Iu(t, g, d);
            break;
          case 3:
          case 4:
            var N = a.stateNode.containerInfo,
              T = hh(t);
            ju(t, T, N);
            break;
          default:
            throw Error(o(161));
        }
      } catch (O) {
        Ke(t, t.return, O);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function By(t, n, s) {
    ((we = t), yh(t));
  }
  function yh(t, n, s) {
    for (var a = (t.mode & 1) !== 0; we !== null; ) {
      var d = we,
        g = d.child;
      if (d.tag === 22 && a) {
        var N = d.memoizedState !== null || Bi;
        if (!N) {
          var T = d.alternate,
            O = (T !== null && T.memoizedState !== null) || ht;
          T = Bi;
          var ee = ht;
          if (((Bi = N), (ht = O) && !ee))
            for (we = d; we !== null; )
              ((N = we),
                (O = N.child),
                N.tag === 22 && N.memoizedState !== null
                  ? wh(d)
                  : O !== null
                    ? ((O.return = N), (we = O))
                    : wh(d));
          for (; g !== null; ) ((we = g), yh(g), (g = g.sibling));
          ((we = d), (Bi = T), (ht = ee));
        }
        vh(t);
      } else
        (d.subtreeFlags & 8772) !== 0 && g !== null
          ? ((g.return = d), (we = g))
          : vh(t);
    }
  }
  function vh(t) {
    for (; we !== null; ) {
      var n = we;
      if ((n.flags & 8772) !== 0) {
        var s = n.alternate;
        try {
          if ((n.flags & 8772) !== 0)
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                ht || Vi(5, n);
                break;
              case 1:
                var a = n.stateNode;
                if (n.flags & 4 && !ht)
                  if (s === null) a.componentDidMount();
                  else {
                    var d =
                      n.elementType === n.type
                        ? s.memoizedProps
                        : Wt(n.type, s.memoizedProps);
                    a.componentDidUpdate(
                      d,
                      s.memoizedState,
                      a.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                var g = n.updateQueue;
                g !== null && xf(n, g, a);
                break;
              case 3:
                var N = n.updateQueue;
                if (N !== null) {
                  if (((s = null), n.child !== null))
                    switch (n.child.tag) {
                      case 5:
                        s = n.child.stateNode;
                        break;
                      case 1:
                        s = n.child.stateNode;
                    }
                  xf(n, N, s);
                }
                break;
              case 5:
                var T = n.stateNode;
                if (s === null && n.flags & 4) {
                  s = T;
                  var O = n.memoizedProps;
                  switch (n.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      O.autoFocus && s.focus();
                      break;
                    case "img":
                      O.src && (s.src = O.src);
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
                    var ce = ee.memoizedState;
                    if (ce !== null) {
                      var he = ce.dehydrated;
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
          ht || (n.flags & 512 && _u(n));
        } catch (ue) {
          Ke(n, n.return, ue);
        }
      }
      if (n === t) {
        we = null;
        break;
      }
      if (((s = n.sibling), s !== null)) {
        ((s.return = n.return), (we = s));
        break;
      }
      we = n.return;
    }
  }
  function xh(t) {
    for (; we !== null; ) {
      var n = we;
      if (n === t) {
        we = null;
        break;
      }
      var s = n.sibling;
      if (s !== null) {
        ((s.return = n.return), (we = s));
        break;
      }
      we = n.return;
    }
  }
  function wh(t) {
    for (; we !== null; ) {
      var n = we;
      try {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            var s = n.return;
            try {
              Vi(4, n);
            } catch (O) {
              Ke(n, s, O);
            }
            break;
          case 1:
            var a = n.stateNode;
            if (typeof a.componentDidMount == "function") {
              var d = n.return;
              try {
                a.componentDidMount();
              } catch (O) {
                Ke(n, d, O);
              }
            }
            var g = n.return;
            try {
              _u(n);
            } catch (O) {
              Ke(n, g, O);
            }
            break;
          case 5:
            var N = n.return;
            try {
              _u(n);
            } catch (O) {
              Ke(n, N, O);
            }
        }
      } catch (O) {
        Ke(n, n.return, O);
      }
      if (n === t) {
        we = null;
        break;
      }
      var T = n.sibling;
      if (T !== null) {
        ((T.return = n.return), (we = T));
        break;
      }
      we = n.return;
    }
  }
  var Vy = Math.ceil,
    Wi = j.ReactCurrentDispatcher,
    Mu = j.ReactCurrentOwner,
    Dt = j.ReactCurrentBatchConfig,
    Te = 0,
    st = null,
    Ze = null,
    at = 0,
    jt = 0,
    Zr = zn(0),
    tt = 0,
    is = null,
    dr = 0,
    Ui = 0,
    Pu = 0,
    ls = null,
    xt = null,
    Ru = 0,
    Jr = 1 / 0,
    xn = null,
    Yi = !1,
    Tu = null,
    Hn = null,
    Xi = !1,
    Bn = null,
    Ki = 0,
    as = 0,
    Lu = null,
    Qi = -1,
    Gi = 0;
  function mt() {
    return (Te & 6) !== 0 ? Ue() : Qi !== -1 ? Qi : (Qi = Ue());
  }
  function Vn(t) {
    return (t.mode & 1) === 0
      ? 1
      : (Te & 2) !== 0 && at !== 0
        ? at & -at
        : by.transition !== null
          ? (Gi === 0 && (Gi = Rr()), Gi)
          : ((t = Ae),
            t !== 0 ||
              ((t = window.event), (t = t === void 0 ? 16 : Sd(t.type))),
            t);
  }
  function Xt(t, n, s, a) {
    if (50 < as) throw ((as = 0), (Lu = null), Error(o(185)));
    (rr(t, s, a),
      ((Te & 2) === 0 || t !== st) &&
        (t === st && ((Te & 2) === 0 && (Ui |= s), tt === 4 && Wn(t, at)),
        wt(t, a),
        s === 1 &&
          Te === 0 &&
          (n.mode & 1) === 0 &&
          ((Jr = Ue() + 500), Ni && $n())));
  }
  function wt(t, n) {
    var s = t.callbackNode;
    ma(t, n);
    var a = Pr(t, t === st ? at : 0);
    if (a === 0)
      (s !== null && ei(s), (t.callbackNode = null), (t.callbackPriority = 0));
    else if (((n = a & -a), t.callbackPriority !== n)) {
      if ((s != null && ei(s), n === 1))
        (t.tag === 0 ? Cy(Eh.bind(null, t)) : lf(Eh.bind(null, t)),
          Sy(function () {
            (Te & 6) === 0 && $n();
          }),
          (s = null));
      else {
        switch (hd(a)) {
          case 1:
            s = Mo;
            break;
          case 4:
            s = ni;
            break;
          case 16:
            s = jr;
            break;
          case 536870912:
            s = ri;
            break;
          default:
            s = jr;
        }
        s = Mh(s, Sh.bind(null, t));
      }
      ((t.callbackPriority = n), (t.callbackNode = s));
    }
  }
  function Sh(t, n) {
    if (((Qi = -1), (Gi = 0), (Te & 6) !== 0)) throw Error(o(327));
    var s = t.callbackNode;
    if (eo() && t.callbackNode !== s) return null;
    var a = Pr(t, t === st ? at : 0);
    if (a === 0) return null;
    if ((a & 30) !== 0 || (a & t.expiredLanes) !== 0 || n) n = qi(t, a);
    else {
      n = a;
      var d = Te;
      Te |= 2;
      var g = Nh();
      (st !== t || at !== n) && ((xn = null), (Jr = Ue() + 500), hr(t, n));
      do
        try {
          Yy();
          break;
        } catch (T) {
          kh(t, T);
        }
      while (!0);
      (Za(),
        (Wi.current = g),
        (Te = d),
        Ze !== null ? (n = 0) : ((st = null), (at = 0), (n = tt)));
    }
    if (n !== 0) {
      if (
        (n === 2 && ((d = Po(t)), d !== 0 && ((a = d), (n = zu(t, d)))),
        n === 1)
      )
        throw ((s = is), hr(t, 0), Wn(t, a), wt(t, Ue()), s);
      if (n === 6) Wn(t, a);
      else {
        if (
          ((d = t.current.alternate),
          (a & 30) === 0 &&
            !Wy(d) &&
            ((n = qi(t, a)),
            n === 2 && ((g = Po(t)), g !== 0 && ((a = g), (n = zu(t, g)))),
            n === 1))
        )
          throw ((s = is), hr(t, 0), Wn(t, a), wt(t, Ue()), s);
        switch (((t.finishedWork = d), (t.finishedLanes = a), n)) {
          case 0:
          case 1:
            throw Error(o(345));
          case 2:
            pr(t, xt, xn);
            break;
          case 3:
            if (
              (Wn(t, a),
              (a & 130023424) === a && ((n = Ru + 500 - Ue()), 10 < n))
            ) {
              if (Pr(t, 0) !== 0) break;
              if (((d = t.suspendedLanes), (d & a) !== a)) {
                (mt(), (t.pingedLanes |= t.suspendedLanes & d));
                break;
              }
              t.timeoutHandle = Ha(pr.bind(null, t, xt, xn), n);
              break;
            }
            pr(t, xt, xn);
            break;
          case 4:
            if ((Wn(t, a), (a & 4194240) === a)) break;
            for (n = t.eventTimes, d = -1; 0 < a; ) {
              var N = 31 - Nt(a);
              ((g = 1 << N), (N = n[N]), N > d && (d = N), (a &= ~g));
            }
            if (
              ((a = d),
              (a = Ue() - a),
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
                            : 1960 * Vy(a / 1960)) - a),
              10 < a)
            ) {
              t.timeoutHandle = Ha(pr.bind(null, t, xt, xn), a);
              break;
            }
            pr(t, xt, xn);
            break;
          case 5:
            pr(t, xt, xn);
            break;
          default:
            throw Error(o(329));
        }
      }
    }
    return (wt(t, Ue()), t.callbackNode === s ? Sh.bind(null, t) : null);
  }
  function zu(t, n) {
    var s = ls;
    return (
      t.current.memoizedState.isDehydrated && (hr(t, n).flags |= 256),
      (t = qi(t, n)),
      t !== 2 && ((n = xt), (xt = s), n !== null && Au(n)),
      t
    );
  }
  function Au(t) {
    xt === null ? (xt = t) : xt.push.apply(xt, t);
  }
  function Wy(t) {
    for (var n = t; ; ) {
      if (n.flags & 16384) {
        var s = n.updateQueue;
        if (s !== null && ((s = s.stores), s !== null))
          for (var a = 0; a < s.length; a++) {
            var d = s[a],
              g = d.getSnapshot;
            d = d.value;
            try {
              if (!Bt(g(), d)) return !1;
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
  function Wn(t, n) {
    for (
      n &= ~Pu,
        n &= ~Ui,
        t.suspendedLanes |= n,
        t.pingedLanes &= ~n,
        t = t.expirationTimes;
      0 < n;
    ) {
      var s = 31 - Nt(n),
        a = 1 << s;
      ((t[s] = -1), (n &= ~a));
    }
  }
  function Eh(t) {
    if ((Te & 6) !== 0) throw Error(o(327));
    eo();
    var n = Pr(t, 0);
    if ((n & 1) === 0) return (wt(t, Ue()), null);
    var s = qi(t, n);
    if (t.tag !== 0 && s === 2) {
      var a = Po(t);
      a !== 0 && ((n = a), (s = zu(t, a)));
    }
    if (s === 1) throw ((s = is), hr(t, 0), Wn(t, n), wt(t, Ue()), s);
    if (s === 6) throw Error(o(345));
    return (
      (t.finishedWork = t.current.alternate),
      (t.finishedLanes = n),
      pr(t, xt, xn),
      wt(t, Ue()),
      null
    );
  }
  function $u(t, n) {
    var s = Te;
    Te |= 1;
    try {
      return t(n);
    } finally {
      ((Te = s), Te === 0 && ((Jr = Ue() + 500), Ni && $n()));
    }
  }
  function fr(t) {
    Bn !== null && Bn.tag === 0 && (Te & 6) === 0 && eo();
    var n = Te;
    Te |= 1;
    var s = Dt.transition,
      a = Ae;
    try {
      if (((Dt.transition = null), (Ae = 1), t)) return t();
    } finally {
      ((Ae = a), (Dt.transition = s), (Te = n), (Te & 6) === 0 && $n());
    }
  }
  function Du() {
    ((jt = Zr.current), Fe(Zr));
  }
  function hr(t, n) {
    ((t.finishedWork = null), (t.finishedLanes = 0));
    var s = t.timeoutHandle;
    if ((s !== -1 && ((t.timeoutHandle = -1), wy(s)), Ze !== null))
      for (s = Ze.return; s !== null; ) {
        var a = s;
        switch ((Xa(a), a.tag)) {
          case 1:
            ((a = a.type.childContextTypes), a != null && Ei());
            break;
          case 3:
            (Qr(), Fe(gt), Fe(ct), iu());
            break;
          case 5:
            ou(a);
            break;
          case 4:
            Qr();
            break;
          case 13:
            Fe(Ye);
            break;
          case 19:
            Fe(Ye);
            break;
          case 10:
            Ja(a.type._context);
            break;
          case 22:
          case 23:
            Du();
        }
        s = s.return;
      }
    if (
      ((st = t),
      (Ze = t = Un(t.current, null)),
      (at = jt = n),
      (tt = 0),
      (is = null),
      (Pu = Ui = dr = 0),
      (xt = ls = null),
      ar !== null)
    ) {
      for (n = 0; n < ar.length; n++)
        if (((s = ar[n]), (a = s.interleaved), a !== null)) {
          s.interleaved = null;
          var d = a.next,
            g = s.pending;
          if (g !== null) {
            var N = g.next;
            ((g.next = d), (a.next = N));
          }
          s.pending = a;
        }
      ar = null;
    }
    return t;
  }
  function kh(t, n) {
    do {
      var s = Ze;
      try {
        if ((Za(), (Li.current = Di), zi)) {
          for (var a = Xe.memoizedState; a !== null; ) {
            var d = a.queue;
            (d !== null && (d.pending = null), (a = a.next));
          }
          zi = !1;
        }
        if (
          ((cr = 0),
          (ot = et = Xe = null),
          (es = !1),
          (ts = 0),
          (Mu.current = null),
          s === null || s.return === null)
        ) {
          ((tt = 1), (is = n), (Ze = null));
          break;
        }
        e: {
          var g = t,
            N = s.return,
            T = s,
            O = n;
          if (
            ((n = at),
            (T.flags |= 32768),
            O !== null && typeof O == "object" && typeof O.then == "function")
          ) {
            var ee = O,
              ce = T,
              he = ce.tag;
            if ((ce.mode & 1) === 0 && (he === 0 || he === 11 || he === 15)) {
              var ue = ce.alternate;
              ue
                ? ((ce.updateQueue = ue.updateQueue),
                  (ce.memoizedState = ue.memoizedState),
                  (ce.lanes = ue.lanes))
                : ((ce.updateQueue = null), (ce.memoizedState = null));
            }
            var xe = Kf(N);
            if (xe !== null) {
              ((xe.flags &= -257),
                Qf(xe, N, T, g, n),
                xe.mode & 1 && Xf(g, ee, n),
                (n = xe),
                (O = ee));
              var Se = n.updateQueue;
              if (Se === null) {
                var ke = new Set();
                (ke.add(O), (n.updateQueue = ke));
              } else Se.add(O);
              break e;
            } else {
              if ((n & 1) === 0) {
                (Xf(g, ee, n), Ou());
                break e;
              }
              O = Error(o(426));
            }
          } else if (He && T.mode & 1) {
            var Qe = Kf(N);
            if (Qe !== null) {
              ((Qe.flags & 65536) === 0 && (Qe.flags |= 256),
                Qf(Qe, N, T, g, n),
                Ga(Gr(O, T)));
              break e;
            }
          }
          ((g = O = Gr(O, T)),
            tt !== 4 && (tt = 2),
            ls === null ? (ls = [g]) : ls.push(g),
            (g = N));
          do {
            switch (g.tag) {
              case 3:
                ((g.flags |= 65536), (n &= -n), (g.lanes |= n));
                var q = Uf(g, O, n);
                vf(g, q);
                break e;
              case 1:
                T = O;
                var W = g.type,
                  J = g.stateNode;
                if (
                  (g.flags & 128) === 0 &&
                  (typeof W.getDerivedStateFromError == "function" ||
                    (J !== null &&
                      typeof J.componentDidCatch == "function" &&
                      (Hn === null || !Hn.has(J))))
                ) {
                  ((g.flags |= 65536), (n &= -n), (g.lanes |= n));
                  var pe = Yf(g, T, n);
                  vf(g, pe);
                  break e;
                }
            }
            g = g.return;
          } while (g !== null);
        }
        bh(s);
      } catch (Ce) {
        ((n = Ce), Ze === s && s !== null && (Ze = s = s.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Nh() {
    var t = Wi.current;
    return ((Wi.current = Di), t === null ? Di : t);
  }
  function Ou() {
    ((tt === 0 || tt === 3 || tt === 2) && (tt = 4),
      st === null ||
        ((dr & 268435455) === 0 && (Ui & 268435455) === 0) ||
        Wn(st, at));
  }
  function qi(t, n) {
    var s = Te;
    Te |= 2;
    var a = Nh();
    (st !== t || at !== n) && ((xn = null), hr(t, n));
    do
      try {
        Uy();
        break;
      } catch (d) {
        kh(t, d);
      }
    while (!0);
    if ((Za(), (Te = s), (Wi.current = a), Ze !== null)) throw Error(o(261));
    return ((st = null), (at = 0), tt);
  }
  function Uy() {
    for (; Ze !== null; ) Ch(Ze);
  }
  function Yy() {
    for (; Ze !== null && !aa(); ) Ch(Ze);
  }
  function Ch(t) {
    var n = Ih(t.alternate, t, jt);
    ((t.memoizedProps = t.pendingProps),
      n === null ? bh(t) : (Ze = n),
      (Mu.current = null));
  }
  function bh(t) {
    var n = t;
    do {
      var s = n.alternate;
      if (((t = n.return), (n.flags & 32768) === 0)) {
        if (((s = Dy(s, n, jt)), s !== null)) {
          Ze = s;
          return;
        }
      } else {
        if (((s = Oy(s, n)), s !== null)) {
          ((s.flags &= 32767), (Ze = s));
          return;
        }
        if (t !== null)
          ((t.flags |= 32768), (t.subtreeFlags = 0), (t.deletions = null));
        else {
          ((tt = 6), (Ze = null));
          return;
        }
      }
      if (((n = n.sibling), n !== null)) {
        Ze = n;
        return;
      }
      Ze = n = t;
    } while (n !== null);
    tt === 0 && (tt = 5);
  }
  function pr(t, n, s) {
    var a = Ae,
      d = Dt.transition;
    try {
      ((Dt.transition = null), (Ae = 1), Xy(t, n, s, a));
    } finally {
      ((Dt.transition = d), (Ae = a));
    }
    return null;
  }
  function Xy(t, n, s, a) {
    do eo();
    while (Bn !== null);
    if ((Te & 6) !== 0) throw Error(o(327));
    s = t.finishedWork;
    var d = t.finishedLanes;
    if (s === null) return null;
    if (((t.finishedWork = null), (t.finishedLanes = 0), s === t.current))
      throw Error(o(177));
    ((t.callbackNode = null), (t.callbackPriority = 0));
    var g = s.lanes | s.childLanes;
    if (
      (si(t, g),
      t === st && ((Ze = st = null), (at = 0)),
      ((s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0) ||
        Xi ||
        ((Xi = !0),
        Mh(jr, function () {
          return (eo(), null);
        })),
      (g = (s.flags & 15990) !== 0),
      (s.subtreeFlags & 15990) !== 0 || g)
    ) {
      ((g = Dt.transition), (Dt.transition = null));
      var N = Ae;
      Ae = 1;
      var T = Te;
      ((Te |= 4),
        (Mu.current = null),
        Hy(t, s),
        gh(s, t),
        hy(Oa),
        (ai = !!Da),
        (Oa = Da = null),
        (t.current = s),
        By(s),
        ti(),
        (Te = T),
        (Ae = N),
        (Dt.transition = g));
    } else t.current = s;
    if (
      (Xi && ((Xi = !1), (Bn = t), (Ki = d)),
      (g = t.pendingLanes),
      g === 0 && (Hn = null),
      da(s.stateNode),
      wt(t, Ue()),
      n !== null)
    )
      for (a = t.onRecoverableError, s = 0; s < n.length; s++)
        ((d = n[s]), a(d.value, { componentStack: d.stack, digest: d.digest }));
    if (Yi) throw ((Yi = !1), (t = Tu), (Tu = null), t);
    return (
      (Ki & 1) !== 0 && t.tag !== 0 && eo(),
      (g = t.pendingLanes),
      (g & 1) !== 0 ? (t === Lu ? as++ : ((as = 0), (Lu = t))) : (as = 0),
      $n(),
      null
    );
  }
  function eo() {
    if (Bn !== null) {
      var t = hd(Ki),
        n = Dt.transition,
        s = Ae;
      try {
        if (((Dt.transition = null), (Ae = 16 > t ? 16 : t), Bn === null))
          var a = !1;
        else {
          if (((t = Bn), (Bn = null), (Ki = 0), (Te & 6) !== 0))
            throw Error(o(331));
          var d = Te;
          for (Te |= 4, we = t.current; we !== null; ) {
            var g = we,
              N = g.child;
            if ((we.flags & 16) !== 0) {
              var T = g.deletions;
              if (T !== null) {
                for (var O = 0; O < T.length; O++) {
                  var ee = T[O];
                  for (we = ee; we !== null; ) {
                    var ce = we;
                    switch (ce.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ss(8, ce, g);
                    }
                    var he = ce.child;
                    if (he !== null) ((he.return = ce), (we = he));
                    else
                      for (; we !== null; ) {
                        ce = we;
                        var ue = ce.sibling,
                          xe = ce.return;
                        if ((dh(ce), ce === ee)) {
                          we = null;
                          break;
                        }
                        if (ue !== null) {
                          ((ue.return = xe), (we = ue));
                          break;
                        }
                        we = xe;
                      }
                  }
                }
                var Se = g.alternate;
                if (Se !== null) {
                  var ke = Se.child;
                  if (ke !== null) {
                    Se.child = null;
                    do {
                      var Qe = ke.sibling;
                      ((ke.sibling = null), (ke = Qe));
                    } while (ke !== null);
                  }
                }
                we = g;
              }
            }
            if ((g.subtreeFlags & 2064) !== 0 && N !== null)
              ((N.return = g), (we = N));
            else
              e: for (; we !== null; ) {
                if (((g = we), (g.flags & 2048) !== 0))
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ss(9, g, g.return);
                  }
                var q = g.sibling;
                if (q !== null) {
                  ((q.return = g.return), (we = q));
                  break e;
                }
                we = g.return;
              }
          }
          var W = t.current;
          for (we = W; we !== null; ) {
            N = we;
            var J = N.child;
            if ((N.subtreeFlags & 2064) !== 0 && J !== null)
              ((J.return = N), (we = J));
            else
              e: for (N = W; we !== null; ) {
                if (((T = we), (T.flags & 2048) !== 0))
                  try {
                    switch (T.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Vi(9, T);
                    }
                  } catch (Ce) {
                    Ke(T, T.return, Ce);
                  }
                if (T === N) {
                  we = null;
                  break e;
                }
                var pe = T.sibling;
                if (pe !== null) {
                  ((pe.return = T.return), (we = pe));
                  break e;
                }
                we = T.return;
              }
          }
          if (
            ((Te = d),
            $n(),
            Tt && typeof Tt.onPostCommitFiberRoot == "function")
          )
            try {
              Tt.onPostCommitFiberRoot(nr, t);
            } catch {}
          a = !0;
        }
        return a;
      } finally {
        ((Ae = s), (Dt.transition = n));
      }
    }
    return !1;
  }
  function _h(t, n, s) {
    ((n = Gr(s, n)),
      (n = Uf(t, n, 1)),
      (t = On(t, n, 1)),
      (n = mt()),
      t !== null && (rr(t, 1, n), wt(t, n)));
  }
  function Ke(t, n, s) {
    if (t.tag === 3) _h(t, t, s);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          _h(n, t, s);
          break;
        } else if (n.tag === 1) {
          var a = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (Hn === null || !Hn.has(a)))
          ) {
            ((t = Gr(s, t)),
              (t = Yf(n, t, 1)),
              (n = On(n, t, 1)),
              (t = mt()),
              n !== null && (rr(n, 1, t), wt(n, t)));
            break;
          }
        }
        n = n.return;
      }
  }
  function Ky(t, n, s) {
    var a = t.pingCache;
    (a !== null && a.delete(n),
      (n = mt()),
      (t.pingedLanes |= t.suspendedLanes & s),
      st === t &&
        (at & s) === s &&
        (tt === 4 || (tt === 3 && (at & 130023424) === at && 500 > Ue() - Ru)
          ? hr(t, 0)
          : (Pu |= s)),
      wt(t, n));
  }
  function jh(t, n) {
    n === 0 &&
      ((t.mode & 1) === 0
        ? (n = 1)
        : ((n = Mr), (Mr <<= 1), (Mr & 130023424) === 0 && (Mr = 4194304)));
    var s = mt();
    ((t = gn(t, n)), t !== null && (rr(t, n, s), wt(t, s)));
  }
  function Qy(t) {
    var n = t.memoizedState,
      s = 0;
    (n !== null && (s = n.retryLane), jh(t, s));
  }
  function Gy(t, n) {
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
    (a !== null && a.delete(n), jh(t, s));
  }
  var Ih;
  Ih = function (t, n, s) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps || gt.current) vt = !0;
      else {
        if ((t.lanes & s) === 0 && (n.flags & 128) === 0)
          return ((vt = !1), $y(t, n, s));
        vt = (t.flags & 131072) !== 0;
      }
    else ((vt = !1), He && (n.flags & 1048576) !== 0 && af(n, bi, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 2:
        var a = n.type;
        (Hi(t, n), (t = n.pendingProps));
        var d = Br(n, ct.current);
        (Kr(n, s), (d = uu(null, n, a, t, d, s)));
        var g = cu();
        return (
          (n.flags |= 1),
          typeof d == "object" &&
          d !== null &&
          typeof d.render == "function" &&
          d.$$typeof === void 0
            ? ((n.tag = 1),
              (n.memoizedState = null),
              (n.updateQueue = null),
              yt(a) ? ((g = !0), ki(n)) : (g = !1),
              (n.memoizedState =
                d.state !== null && d.state !== void 0 ? d.state : null),
              nu(n),
              (d.updater = Oi),
              (n.stateNode = d),
              (d._reactInternals = n),
              gu(n, a, t, s),
              (n = wu(null, n, a, !0, g, s)))
            : ((n.tag = 0), He && g && Ya(n), pt(null, n, d, s), (n = n.child)),
          n
        );
      case 16:
        a = n.elementType;
        e: {
          switch (
            (Hi(t, n),
            (t = n.pendingProps),
            (d = a._init),
            (a = d(a._payload)),
            (n.type = a),
            (d = n.tag = Zy(a)),
            (t = Wt(a, t)),
            d)
          ) {
            case 0:
              n = xu(null, n, a, t, s);
              break e;
            case 1:
              n = th(null, n, a, t, s);
              break e;
            case 11:
              n = Gf(null, n, a, t, s);
              break e;
            case 14:
              n = qf(null, n, a, Wt(a.type, t), s);
              break e;
          }
          throw Error(o(306, a, ""));
        }
        return n;
      case 0:
        return (
          (a = n.type),
          (d = n.pendingProps),
          (d = n.elementType === a ? d : Wt(a, d)),
          xu(t, n, a, d, s)
        );
      case 1:
        return (
          (a = n.type),
          (d = n.pendingProps),
          (d = n.elementType === a ? d : Wt(a, d)),
          th(t, n, a, d, s)
        );
      case 3:
        e: {
          if ((nh(n), t === null)) throw Error(o(387));
          ((a = n.pendingProps),
            (g = n.memoizedState),
            (d = g.element),
            yf(t, n),
            Ri(n, a, null, s));
          var N = n.memoizedState;
          if (((a = N.element), g.isDehydrated))
            if (
              ((g = {
                element: a,
                isDehydrated: !1,
                cache: N.cache,
                pendingSuspenseBoundaries: N.pendingSuspenseBoundaries,
                transitions: N.transitions,
              }),
              (n.updateQueue.baseState = g),
              (n.memoizedState = g),
              n.flags & 256)
            ) {
              ((d = Gr(Error(o(423)), n)), (n = rh(t, n, a, s, d)));
              break e;
            } else if (a !== d) {
              ((d = Gr(Error(o(424)), n)), (n = rh(t, n, a, s, d)));
              break e;
            } else
              for (
                _t = Ln(n.stateNode.containerInfo.firstChild),
                  bt = n,
                  He = !0,
                  Vt = null,
                  s = mf(n, null, a, s),
                  n.child = s;
                s;
              )
                ((s.flags = (s.flags & -3) | 4096), (s = s.sibling));
          else {
            if ((Ur(), a === d)) {
              n = vn(t, n, s);
              break e;
            }
            pt(t, n, a, s);
          }
          n = n.child;
        }
        return n;
      case 5:
        return (
          wf(n),
          t === null && Qa(n),
          (a = n.type),
          (d = n.pendingProps),
          (g = t !== null ? t.memoizedProps : null),
          (N = d.children),
          Fa(a, d) ? (N = null) : g !== null && Fa(a, g) && (n.flags |= 32),
          eh(t, n),
          pt(t, n, N, s),
          n.child
        );
      case 6:
        return (t === null && Qa(n), null);
      case 13:
        return oh(t, n, s);
      case 4:
        return (
          ru(n, n.stateNode.containerInfo),
          (a = n.pendingProps),
          t === null ? (n.child = Yr(n, null, a, s)) : pt(t, n, a, s),
          n.child
        );
      case 11:
        return (
          (a = n.type),
          (d = n.pendingProps),
          (d = n.elementType === a ? d : Wt(a, d)),
          Gf(t, n, a, d, s)
        );
      case 7:
        return (pt(t, n, n.pendingProps, s), n.child);
      case 8:
        return (pt(t, n, n.pendingProps.children, s), n.child);
      case 12:
        return (pt(t, n, n.pendingProps.children, s), n.child);
      case 10:
        e: {
          if (
            ((a = n.type._context),
            (d = n.pendingProps),
            (g = n.memoizedProps),
            (N = d.value),
            $e(Ii, a._currentValue),
            (a._currentValue = N),
            g !== null)
          )
            if (Bt(g.value, N)) {
              if (g.children === d.children && !gt.current) {
                n = vn(t, n, s);
                break e;
              }
            } else
              for (g = n.child, g !== null && (g.return = n); g !== null; ) {
                var T = g.dependencies;
                if (T !== null) {
                  N = g.child;
                  for (var O = T.firstContext; O !== null; ) {
                    if (O.context === a) {
                      if (g.tag === 1) {
                        ((O = yn(-1, s & -s)), (O.tag = 2));
                        var ee = g.updateQueue;
                        if (ee !== null) {
                          ee = ee.shared;
                          var ce = ee.pending;
                          (ce === null
                            ? (O.next = O)
                            : ((O.next = ce.next), (ce.next = O)),
                            (ee.pending = O));
                        }
                      }
                      ((g.lanes |= s),
                        (O = g.alternate),
                        O !== null && (O.lanes |= s),
                        eu(g.return, s, n),
                        (T.lanes |= s));
                      break;
                    }
                    O = O.next;
                  }
                } else if (g.tag === 10) N = g.type === n.type ? null : g.child;
                else if (g.tag === 18) {
                  if (((N = g.return), N === null)) throw Error(o(341));
                  ((N.lanes |= s),
                    (T = N.alternate),
                    T !== null && (T.lanes |= s),
                    eu(N, s, n),
                    (N = g.sibling));
                } else N = g.child;
                if (N !== null) N.return = g;
                else
                  for (N = g; N !== null; ) {
                    if (N === n) {
                      N = null;
                      break;
                    }
                    if (((g = N.sibling), g !== null)) {
                      ((g.return = N.return), (N = g));
                      break;
                    }
                    N = N.return;
                  }
                g = N;
              }
          (pt(t, n, d.children, s), (n = n.child));
        }
        return n;
      case 9:
        return (
          (d = n.type),
          (a = n.pendingProps.children),
          Kr(n, s),
          (d = At(d)),
          (a = a(d)),
          (n.flags |= 1),
          pt(t, n, a, s),
          n.child
        );
      case 14:
        return (
          (a = n.type),
          (d = Wt(a, n.pendingProps)),
          (d = Wt(a.type, d)),
          qf(t, n, a, d, s)
        );
      case 15:
        return Zf(t, n, n.type, n.pendingProps, s);
      case 17:
        return (
          (a = n.type),
          (d = n.pendingProps),
          (d = n.elementType === a ? d : Wt(a, d)),
          Hi(t, n),
          (n.tag = 1),
          yt(a) ? ((t = !0), ki(n)) : (t = !1),
          Kr(n, s),
          Vf(n, a, d),
          gu(n, a, d, s),
          wu(null, n, a, !0, t, s)
        );
      case 19:
        return ih(t, n, s);
      case 22:
        return Jf(t, n, s);
    }
    throw Error(o(156, n.tag));
  };
  function Mh(t, n) {
    return Js(t, n);
  }
  function qy(t, n, s, a) {
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
  function Ot(t, n, s, a) {
    return new qy(t, n, s, a);
  }
  function Fu(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Zy(t) {
    if (typeof t == "function") return Fu(t) ? 1 : 0;
    if (t != null) {
      if (((t = t.$$typeof), t === Y)) return 11;
      if (t === G) return 14;
    }
    return 2;
  }
  function Un(t, n) {
    var s = t.alternate;
    return (
      s === null
        ? ((s = Ot(t.tag, n, t.key, t.mode)),
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
  function Zi(t, n, s, a, d, g) {
    var N = 2;
    if (((a = t), typeof t == "function")) Fu(t) && (N = 1);
    else if (typeof t == "string") N = 5;
    else
      e: switch (t) {
        case R:
          return mr(s.children, d, g, n);
        case H:
          ((N = 8), (d |= 8));
          break;
        case V:
          return (
            (t = Ot(12, s, n, d | 2)),
            (t.elementType = V),
            (t.lanes = g),
            t
          );
        case te:
          return (
            (t = Ot(13, s, n, d)),
            (t.elementType = te),
            (t.lanes = g),
            t
          );
        case L:
          return ((t = Ot(19, s, n, d)), (t.elementType = L), (t.lanes = g), t);
        case K:
          return Ji(s, d, g, n);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case se:
                N = 10;
                break e;
              case X:
                N = 9;
                break e;
              case Y:
                N = 11;
                break e;
              case G:
                N = 14;
                break e;
              case B:
                ((N = 16), (a = null));
                break e;
            }
          throw Error(o(130, t == null ? t : typeof t, ""));
      }
    return (
      (n = Ot(N, s, n, d)),
      (n.elementType = t),
      (n.type = a),
      (n.lanes = g),
      n
    );
  }
  function mr(t, n, s, a) {
    return ((t = Ot(7, t, a, n)), (t.lanes = s), t);
  }
  function Ji(t, n, s, a) {
    return (
      (t = Ot(22, t, a, n)),
      (t.elementType = K),
      (t.lanes = s),
      (t.stateNode = { isHidden: !1 }),
      t
    );
  }
  function Hu(t, n, s) {
    return ((t = Ot(6, t, null, n)), (t.lanes = s), t);
  }
  function Bu(t, n, s) {
    return (
      (n = Ot(4, t.children !== null ? t.children : [], t.key, n)),
      (n.lanes = s),
      (n.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      n
    );
  }
  function Jy(t, n, s, a, d) {
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
      (this.eventTimes = Ro(0)),
      (this.expirationTimes = Ro(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Ro(0)),
      (this.identifierPrefix = a),
      (this.onRecoverableError = d),
      (this.mutableSourceEagerHydrationData = null));
  }
  function Vu(t, n, s, a, d, g, N, T, O) {
    return (
      (t = new Jy(t, n, s, T, O)),
      n === 1 ? ((n = 1), g === !0 && (n |= 8)) : (n = 0),
      (g = Ot(3, null, null, n)),
      (t.current = g),
      (g.stateNode = t),
      (g.memoizedState = {
        element: a,
        isDehydrated: s,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      nu(g),
      t
    );
  }
  function ev(t, n, s) {
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
  function Ph(t) {
    if (!t) return An;
    t = t._reactInternals;
    e: {
      if (Jt(t) !== t || t.tag !== 1) throw Error(o(170));
      var n = t;
      do {
        switch (n.tag) {
          case 3:
            n = n.stateNode.context;
            break e;
          case 1:
            if (yt(n.type)) {
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
      if (yt(s)) return of(t, s, n);
    }
    return n;
  }
  function Rh(t, n, s, a, d, g, N, T, O) {
    return (
      (t = Vu(s, a, !0, t, d, g, N, T, O)),
      (t.context = Ph(null)),
      (s = t.current),
      (a = mt()),
      (d = Vn(s)),
      (g = yn(a, d)),
      (g.callback = n ?? null),
      On(s, g, d),
      (t.current.lanes = d),
      rr(t, d, a),
      wt(t, a),
      t
    );
  }
  function el(t, n, s, a) {
    var d = n.current,
      g = mt(),
      N = Vn(d);
    return (
      (s = Ph(s)),
      n.context === null ? (n.context = s) : (n.pendingContext = s),
      (n = yn(g, N)),
      (n.payload = { element: t }),
      (a = a === void 0 ? null : a),
      a !== null && (n.callback = a),
      (t = On(d, n, N)),
      t !== null && (Xt(t, d, N, g), Pi(t, d, N)),
      N
    );
  }
  function tl(t) {
    if (((t = t.current), !t.child)) return null;
    switch (t.child.tag) {
      case 5:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function Th(t, n) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var s = t.retryLane;
      t.retryLane = s !== 0 && s < n ? s : n;
    }
  }
  function Wu(t, n) {
    (Th(t, n), (t = t.alternate) && Th(t, n));
  }
  function tv() {
    return null;
  }
  var Lh =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          console.error(t);
        };
  function Uu(t) {
    this._internalRoot = t;
  }
  ((nl.prototype.render = Uu.prototype.render =
    function (t) {
      var n = this._internalRoot;
      if (n === null) throw Error(o(409));
      el(t, n, null, null);
    }),
    (nl.prototype.unmount = Uu.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var n = t.containerInfo;
          (fr(function () {
            el(null, t, null, null);
          }),
            (n[fn] = null));
        }
      }));
  function nl(t) {
    this._internalRoot = t;
  }
  nl.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var n = gd();
      t = { blockedOn: null, target: t, priority: n };
      for (var s = 0; s < Pn.length && n !== 0 && n < Pn[s].priority; s++);
      (Pn.splice(s, 0, t), s === 0 && xd(t));
    }
  };
  function Yu(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function rl(t) {
    return !(
      !t ||
      (t.nodeType !== 1 &&
        t.nodeType !== 9 &&
        t.nodeType !== 11 &&
        (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function zh() {}
  function nv(t, n, s, a, d) {
    if (d) {
      if (typeof a == "function") {
        var g = a;
        a = function () {
          var ee = tl(N);
          g.call(ee);
        };
      }
      var N = Rh(n, a, t, 0, null, !1, !1, "", zh);
      return (
        (t._reactRootContainer = N),
        (t[fn] = N.current),
        Yo(t.nodeType === 8 ? t.parentNode : t),
        fr(),
        N
      );
    }
    for (; (d = t.lastChild); ) t.removeChild(d);
    if (typeof a == "function") {
      var T = a;
      a = function () {
        var ee = tl(O);
        T.call(ee);
      };
    }
    var O = Vu(t, 0, !1, null, null, !1, !1, "", zh);
    return (
      (t._reactRootContainer = O),
      (t[fn] = O.current),
      Yo(t.nodeType === 8 ? t.parentNode : t),
      fr(function () {
        el(n, O, s, a);
      }),
      O
    );
  }
  function ol(t, n, s, a, d) {
    var g = s._reactRootContainer;
    if (g) {
      var N = g;
      if (typeof d == "function") {
        var T = d;
        d = function () {
          var O = tl(N);
          T.call(O);
        };
      }
      el(n, N, t, d);
    } else N = nv(s, n, t, d, a);
    return tl(N);
  }
  ((pd = function (t) {
    switch (t.tag) {
      case 3:
        var n = t.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var s = en(n.pendingLanes);
          s !== 0 &&
            (ga(n, s | 1),
            wt(n, Ue()),
            (Te & 6) === 0 && ((Jr = Ue() + 500), $n()));
        }
        break;
      case 13:
        (fr(function () {
          var a = gn(t, 1);
          if (a !== null) {
            var d = mt();
            Xt(a, t, 1, d);
          }
        }),
          Wu(t, 1));
    }
  }),
    (ya = function (t) {
      if (t.tag === 13) {
        var n = gn(t, 134217728);
        if (n !== null) {
          var s = mt();
          Xt(n, t, 134217728, s);
        }
        Wu(t, 134217728);
      }
    }),
    (md = function (t) {
      if (t.tag === 13) {
        var n = Vn(t),
          s = gn(t, n);
        if (s !== null) {
          var a = mt();
          Xt(s, t, n, a);
        }
        Wu(t, n);
      }
    }),
    (gd = function () {
      return Ae;
    }),
    (yd = function (t, n) {
      var s = Ae;
      try {
        return ((Ae = t), n());
      } finally {
        Ae = s;
      }
    }),
    (No = function (t, n, s) {
      switch (n) {
        case "input":
          if ((ge(t, s), (n = s.name), s.type === "radio" && n != null)) {
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
                var d = Si(a);
                if (!d) throw Error(o(90));
                (ye(a), ge(a, d));
              }
            }
          }
          break;
        case "textarea":
          Rt(t, s);
          break;
        case "select":
          ((n = s.value), n != null && De(t, !!s.multiple, n, !1));
      }
    }),
    (Ks = $u),
    (Qs = fr));
  var rv = { usingClientEntryPoint: !1, Events: [Qo, Fr, Si, Ys, Xs, $u] },
    us = {
      findFiberByHostInstance: or,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    ov = {
      bundleType: us.bundleType,
      version: us.version,
      rendererPackageName: us.rendererPackageName,
      rendererConfig: us.rendererConfig,
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
        return ((t = qs(t)), t === null ? null : t.stateNode);
      },
      findFiberByHostInstance: us.findFiberByHostInstance || tv,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var sl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!sl.isDisabled && sl.supportsFiber)
      try {
        ((nr = sl.inject(ov)), (Tt = sl));
      } catch {}
  }
  return (
    (St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rv),
    (St.createPortal = function (t, n) {
      var s =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Yu(n)) throw Error(o(200));
      return ev(t, n, null, s);
    }),
    (St.createRoot = function (t, n) {
      if (!Yu(t)) throw Error(o(299));
      var s = !1,
        a = "",
        d = Lh;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (s = !0),
          n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (d = n.onRecoverableError)),
        (n = Vu(t, 1, !1, null, null, s, !1, a, d)),
        (t[fn] = n.current),
        Yo(t.nodeType === 8 ? t.parentNode : t),
        new Uu(n)
      );
    }),
    (St.findDOMNode = function (t) {
      if (t == null) return null;
      if (t.nodeType === 1) return t;
      var n = t._reactInternals;
      if (n === void 0)
        throw typeof t.render == "function"
          ? Error(o(188))
          : ((t = Object.keys(t).join(",")), Error(o(268, t)));
      return ((t = qs(n)), (t = t === null ? null : t.stateNode), t);
    }),
    (St.flushSync = function (t) {
      return fr(t);
    }),
    (St.hydrate = function (t, n, s) {
      if (!rl(n)) throw Error(o(200));
      return ol(null, t, n, !0, s);
    }),
    (St.hydrateRoot = function (t, n, s) {
      if (!Yu(t)) throw Error(o(405));
      var a = (s != null && s.hydratedSources) || null,
        d = !1,
        g = "",
        N = Lh;
      if (
        (s != null &&
          (s.unstable_strictMode === !0 && (d = !0),
          s.identifierPrefix !== void 0 && (g = s.identifierPrefix),
          s.onRecoverableError !== void 0 && (N = s.onRecoverableError)),
        (n = Rh(n, null, t, 1, s ?? null, d, !1, g, N)),
        (t[fn] = n.current),
        Yo(t),
        a)
      )
        for (t = 0; t < a.length; t++)
          ((s = a[t]),
            (d = s._getVersion),
            (d = d(s._source)),
            n.mutableSourceEagerHydrationData == null
              ? (n.mutableSourceEagerHydrationData = [s, d])
              : n.mutableSourceEagerHydrationData.push(s, d));
      return new nl(n);
    }),
    (St.render = function (t, n, s) {
      if (!rl(n)) throw Error(o(200));
      return ol(null, t, n, !1, s);
    }),
    (St.unmountComponentAtNode = function (t) {
      if (!rl(t)) throw Error(o(40));
      return t._reactRootContainer
        ? (fr(function () {
            ol(null, null, t, !1, function () {
              ((t._reactRootContainer = null), (t[fn] = null));
            });
          }),
          !0)
        : !1;
    }),
    (St.unstable_batchedUpdates = $u),
    (St.unstable_renderSubtreeIntoContainer = function (t, n, s, a) {
      if (!rl(s)) throw Error(o(200));
      if (t == null || t._reactInternals === void 0) throw Error(o(38));
      return ol(t, n, s, !1, a);
    }),
    (St.version = "18.3.1-next-f1338f8080-20240426"),
    St
  );
}
var Vh;
function mm() {
  if (Vh) return Qu.exports;
  Vh = 1;
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
  return (e(), (Qu.exports = hv()), Qu.exports);
}
var Wh;
function pv() {
  if (Wh) return il;
  Wh = 1;
  var e = mm();
  return ((il.createRoot = e.createRoot), (il.hydrateRoot = e.hydrateRoot), il);
}
var mv = pv();
const gv = $c(mv);
/**
 * react-router v7.11.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Uh = "popstate";
function yv(e = {}) {
  function r(i, l) {
    let { pathname: u, search: c, hash: f } = i.location;
    return yc(
      "",
      { pathname: u, search: c, hash: f },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default"
    );
  }
  function o(i, l) {
    return typeof l == "string" ? l : Ss(l);
  }
  return xv(r, o, null, e);
}
function Be(e, r) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(r);
}
function Ft(e, r) {
  if (!e) {
    typeof console < "u" && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function vv() {
  return Math.random().toString(36).substring(2, 10);
}
function Yh(e, r) {
  return { usr: e.state, key: e.key, idx: r };
}
function yc(e, r, o = null, i) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof r == "string" ? yo(r) : r),
    state: o,
    key: (r && r.key) || i || vv(),
  };
}
function Ss({ pathname: e = "/", search: r = "", hash: o = "" }) {
  return (
    r && r !== "?" && (e += r.charAt(0) === "?" ? r : "?" + r),
    o && o !== "#" && (e += o.charAt(0) === "#" ? o : "#" + o),
    e
  );
}
function yo(e) {
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
function xv(e, r, o, i = {}) {
  let { window: l = document.defaultView, v5Compat: u = !1 } = i,
    c = l.history,
    f = "POP",
    h = null,
    m = x();
  m == null && ((m = 0), c.replaceState({ ...c.state, idx: m }, ""));
  function x() {
    return (c.state || { idx: null }).idx;
  }
  function y() {
    f = "POP";
    let C = x(),
      b = C == null ? null : C - m;
    ((m = C), h && h({ action: f, location: _.location, delta: b }));
  }
  function v(C, b) {
    f = "PUSH";
    let P = yc(_.location, C, b);
    m = x() + 1;
    let E = Yh(P, m),
      j = _.createHref(P);
    try {
      c.pushState(E, "", j);
    } catch (D) {
      if (D instanceof DOMException && D.name === "DataCloneError") throw D;
      l.location.assign(j);
    }
    u && h && h({ action: f, location: _.location, delta: 1 });
  }
  function w(C, b) {
    f = "REPLACE";
    let P = yc(_.location, C, b);
    m = x();
    let E = Yh(P, m),
      j = _.createHref(P);
    (c.replaceState(E, "", j),
      u && h && h({ action: f, location: _.location, delta: 0 }));
  }
  function S(C) {
    return wv(C);
  }
  let _ = {
    get action() {
      return f;
    },
    get location() {
      return e(l, c);
    },
    listen(C) {
      if (h) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(Uh, y),
        (h = C),
        () => {
          (l.removeEventListener(Uh, y), (h = null));
        }
      );
    },
    createHref(C) {
      return r(l, C);
    },
    createURL: S,
    encodeLocation(C) {
      let b = S(C);
      return { pathname: b.pathname, search: b.search, hash: b.hash };
    },
    push: v,
    replace: w,
    go(C) {
      return c.go(C);
    },
  };
  return _;
}
function wv(e, r = !1) {
  let o = "http://localhost";
  (typeof window < "u" &&
    (o =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    Be(o, "No window.location.(origin|href) available to create URL"));
  let i = typeof e == "string" ? e : Ss(e);
  return (
    (i = i.replace(/ $/, "%20")),
    !r && i.startsWith("//") && (i = o + i),
    new URL(i, o)
  );
}
function gm(e, r, o = "/") {
  return Sv(e, r, o, !1);
}
function Sv(e, r, o, i) {
  let l = typeof r == "string" ? yo(r) : r,
    u = kn(l.pathname || "/", o);
  if (u == null) return null;
  let c = ym(e);
  Ev(c);
  let f = null;
  for (let h = 0; f == null && h < c.length; ++h) {
    let m = Tv(u);
    f = Pv(c[h], m, i);
  }
  return f;
}
function ym(e, r = [], o = [], i = "", l = !1) {
  let u = (c, f, h = l, m) => {
    let x = {
      relativePath: m === void 0 ? c.path || "" : m,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: f,
      route: c,
    };
    if (x.relativePath.startsWith("/")) {
      if (!x.relativePath.startsWith(i) && h) return;
      (Be(
        x.relativePath.startsWith(i),
        `Absolute route path "${x.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (x.relativePath = x.relativePath.slice(i.length)));
    }
    let y = En([i, x.relativePath]),
      v = o.concat(x);
    (c.children &&
      c.children.length > 0 &&
      (Be(
        c.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${y}".`
      ),
      ym(c.children, r, v, y, h)),
      !(c.path == null && !c.index) &&
        r.push({ path: y, score: Iv(y, c.index), routesMeta: v }));
  };
  return (
    e.forEach((c, f) => {
      var h;
      if (c.path === "" || !((h = c.path) != null && h.includes("?"))) u(c, f);
      else for (let m of vm(c.path)) u(c, f, !0, m);
    }),
    r
  );
}
function vm(e) {
  let r = e.split("/");
  if (r.length === 0) return [];
  let [o, ...i] = r,
    l = o.endsWith("?"),
    u = o.replace(/\?$/, "");
  if (i.length === 0) return l ? [u, ""] : [u];
  let c = vm(i.join("/")),
    f = [];
  return (
    f.push(...c.map((h) => (h === "" ? u : [u, h].join("/")))),
    l && f.push(...c),
    f.map((h) => (e.startsWith("/") && h === "" ? "/" : h))
  );
}
function Ev(e) {
  e.sort((r, o) =>
    r.score !== o.score
      ? o.score - r.score
      : Mv(
          r.routesMeta.map((i) => i.childrenIndex),
          o.routesMeta.map((i) => i.childrenIndex)
        )
  );
}
var kv = /^:[\w-]+$/,
  Nv = 3,
  Cv = 2,
  bv = 1,
  _v = 10,
  jv = -2,
  Xh = (e) => e === "*";
function Iv(e, r) {
  let o = e.split("/"),
    i = o.length;
  return (
    o.some(Xh) && (i += jv),
    r && (i += Cv),
    o
      .filter((l) => !Xh(l))
      .reduce((l, u) => l + (kv.test(u) ? Nv : u === "" ? bv : _v), i)
  );
}
function Mv(e, r) {
  return e.length === r.length && e.slice(0, -1).every((i, l) => i === r[l])
    ? e[e.length - 1] - r[r.length - 1]
    : 0;
}
function Pv(e, r, o = !1) {
  let { routesMeta: i } = e,
    l = {},
    u = "/",
    c = [];
  for (let f = 0; f < i.length; ++f) {
    let h = i[f],
      m = f === i.length - 1,
      x = u === "/" ? r : r.slice(u.length) || "/",
      y = jl(
        { path: h.relativePath, caseSensitive: h.caseSensitive, end: m },
        x
      ),
      v = h.route;
    if (
      (!y &&
        m &&
        o &&
        !i[i.length - 1].route.index &&
        (y = jl(
          { path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 },
          x
        )),
      !y)
    )
      return null;
    (Object.assign(l, y.params),
      c.push({
        params: l,
        pathname: En([u, y.pathname]),
        pathnameBase: $v(En([u, y.pathnameBase])),
        route: v,
      }),
      y.pathnameBase !== "/" && (u = En([u, y.pathnameBase])));
  }
  return c;
}
function jl(e, r) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [o, i] = Rv(e.path, e.caseSensitive, e.end),
    l = r.match(o);
  if (!l) return null;
  let u = l[0],
    c = u.replace(/(.)\/+$/, "$1"),
    f = l.slice(1);
  return {
    params: i.reduce((m, { paramName: x, isOptional: y }, v) => {
      if (x === "*") {
        let S = f[v] || "";
        c = u.slice(0, u.length - S.length).replace(/(.)\/+$/, "$1");
      }
      const w = f[v];
      return (
        y && !w ? (m[x] = void 0) : (m[x] = (w || "").replace(/%2F/g, "/")),
        m
      );
    }, {}),
    pathname: u,
    pathnameBase: c,
    pattern: e,
  };
}
function Rv(e, r = !1, o = !0) {
  Ft(
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
function Tv(e) {
  try {
    return e
      .split("/")
      .map((r) => decodeURIComponent(r).replace(/\//g, "%2F"))
      .join("/");
  } catch (r) {
    return (
      Ft(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`
      ),
      e
    );
  }
}
function kn(e, r) {
  if (r === "/") return e;
  if (!e.toLowerCase().startsWith(r.toLowerCase())) return null;
  let o = r.endsWith("/") ? r.length - 1 : r.length,
    i = e.charAt(o);
  return i && i !== "/" ? null : e.slice(o) || "/";
}
var xm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Lv = (e) => xm.test(e);
function zv(e, r = "/") {
  let {
      pathname: o,
      search: i = "",
      hash: l = "",
    } = typeof e == "string" ? yo(e) : e,
    u;
  if (o)
    if (Lv(o)) u = o;
    else {
      if (o.includes("//")) {
        let c = o;
        ((o = o.replace(/\/\/+/g, "/")),
          Ft(
            !1,
            `Pathnames cannot have embedded double slashes - normalizing ${c} -> ${o}`
          ));
      }
      o.startsWith("/") ? (u = Kh(o.substring(1), "/")) : (u = Kh(o, r));
    }
  else u = r;
  return { pathname: u, search: Dv(i), hash: Ov(l) };
}
function Kh(e, r) {
  let o = r.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? o.length > 1 && o.pop() : l !== "." && o.push(l);
    }),
    o.length > 1 ? o.join("/") : "/"
  );
}
function Zu(e, r, o, i) {
  return `Cannot include a '${e}' character in a manually specified \`to.${r}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Av(e) {
  return e.filter(
    (r, o) => o === 0 || (r.route.path && r.route.path.length > 0)
  );
}
function Dc(e) {
  let r = Av(e);
  return r.map((o, i) => (i === r.length - 1 ? o.pathname : o.pathnameBase));
}
function Oc(e, r, o, i = !1) {
  let l;
  typeof e == "string"
    ? (l = yo(e))
    : ((l = { ...e }),
      Be(
        !l.pathname || !l.pathname.includes("?"),
        Zu("?", "pathname", "search", l)
      ),
      Be(
        !l.pathname || !l.pathname.includes("#"),
        Zu("#", "pathname", "hash", l)
      ),
      Be(!l.search || !l.search.includes("#"), Zu("#", "search", "hash", l)));
  let u = e === "" || l.pathname === "",
    c = u ? "/" : l.pathname,
    f;
  if (c == null) f = o;
  else {
    let y = r.length - 1;
    if (!i && c.startsWith("..")) {
      let v = c.split("/");
      for (; v[0] === ".."; ) (v.shift(), (y -= 1));
      l.pathname = v.join("/");
    }
    f = y >= 0 ? r[y] : "/";
  }
  let h = zv(l, f),
    m = c && c !== "/" && c.endsWith("/"),
    x = (u || c === ".") && o.endsWith("/");
  return (!h.pathname.endsWith("/") && (m || x) && (h.pathname += "/"), h);
}
var En = (e) => e.join("/").replace(/\/\/+/g, "/"),
  $v = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Dv = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Ov = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  Fv = class {
    constructor(e, r, o, i = !1) {
      ((this.status = e),
        (this.statusText = r || ""),
        (this.internal = i),
        o instanceof Error
          ? ((this.data = o.toString()), (this.error = o))
          : (this.data = o));
    }
  };
function Hv(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
function Bv(e) {
  return (
    e
      .map((r) => r.route.path)
      .filter(Boolean)
      .join("/")
      .replace(/\/\/*/g, "/") || "/"
  );
}
var wm =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function Sm(e, r) {
  let o = e;
  if (typeof o != "string" || !xm.test(o))
    return { absoluteURL: void 0, isExternal: !1, to: o };
  let i = o,
    l = !1;
  if (wm)
    try {
      let u = new URL(window.location.href),
        c = o.startsWith("//") ? new URL(u.protocol + o) : new URL(o),
        f = kn(c.pathname, r);
      c.origin === u.origin && f != null
        ? (o = f + c.search + c.hash)
        : (l = !0);
    } catch {
      Ft(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: i, isExternal: l, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Em = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Em);
var Vv = ["GET", ...Em];
new Set(Vv);
var vo = k.createContext(null);
vo.displayName = "DataRouter";
var Hl = k.createContext(null);
Hl.displayName = "DataRouterState";
var Wv = k.createContext(!1),
  km = k.createContext({ isTransitioning: !1 });
km.displayName = "ViewTransition";
var Uv = k.createContext(new Map());
Uv.displayName = "Fetchers";
var Yv = k.createContext(null);
Yv.displayName = "Await";
var Pt = k.createContext(null);
Pt.displayName = "Navigation";
var zs = k.createContext(null);
zs.displayName = "Location";
var un = k.createContext({ outlet: null, matches: [], isDataRoute: !1 });
un.displayName = "Route";
var Fc = k.createContext(null);
Fc.displayName = "RouteError";
var Nm = "REACT_ROUTER_ERROR",
  Xv = "REDIRECT",
  Kv = "ROUTE_ERROR_RESPONSE";
function Qv(e) {
  if (e.startsWith(`${Nm}:${Xv}:{`))
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
function Gv(e) {
  if (e.startsWith(`${Nm}:${Kv}:{`))
    try {
      let r = JSON.parse(e.slice(40));
      if (
        typeof r == "object" &&
        r &&
        typeof r.status == "number" &&
        typeof r.statusText == "string"
      )
        return new Fv(r.status, r.statusText, r.data);
    } catch {}
}
function qv(e, { relative: r } = {}) {
  Be(
    xo(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: o, navigator: i } = k.useContext(Pt),
    { hash: l, pathname: u, search: c } = As(e, { relative: r }),
    f = u;
  return (
    o !== "/" && (f = u === "/" ? o : En([o, u])),
    i.createHref({ pathname: f, search: c, hash: l })
  );
}
function xo() {
  return k.useContext(zs) != null;
}
function qn() {
  return (
    Be(
      xo(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    k.useContext(zs).location
  );
}
var Cm =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function bm(e) {
  k.useContext(Pt).static || k.useLayoutEffect(e);
}
function _m() {
  let { isDataRoute: e } = k.useContext(un);
  return e ? cx() : Zv();
}
function Zv() {
  Be(
    xo(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = k.useContext(vo),
    { basename: r, navigator: o } = k.useContext(Pt),
    { matches: i } = k.useContext(un),
    { pathname: l } = qn(),
    u = JSON.stringify(Dc(i)),
    c = k.useRef(!1);
  return (
    bm(() => {
      c.current = !0;
    }),
    k.useCallback(
      (h, m = {}) => {
        if ((Ft(c.current, Cm), !c.current)) return;
        if (typeof h == "number") {
          o.go(h);
          return;
        }
        let x = Oc(h, JSON.parse(u), l, m.relative === "path");
        (e == null &&
          r !== "/" &&
          (x.pathname = x.pathname === "/" ? r : En([r, x.pathname])),
          (m.replace ? o.replace : o.push)(x, m.state, m));
      },
      [r, o, u, l, e]
    )
  );
}
k.createContext(null);
function As(e, { relative: r } = {}) {
  let { matches: o } = k.useContext(un),
    { pathname: i } = qn(),
    l = JSON.stringify(Dc(o));
  return k.useMemo(() => Oc(e, JSON.parse(l), i, r === "path"), [e, l, i, r]);
}
function Jv(e, r) {
  return jm(e, r);
}
function jm(e, r, o, i, l) {
  var P;
  Be(
    xo(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: u } = k.useContext(Pt),
    { matches: c } = k.useContext(un),
    f = c[c.length - 1],
    h = f ? f.params : {},
    m = f ? f.pathname : "/",
    x = f ? f.pathnameBase : "/",
    y = f && f.route;
  {
    let E = (y && y.path) || "";
    Mm(
      m,
      !y || E.endsWith("*") || E.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${E}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${E}"> to <Route path="${E === "/" ? "*" : `${E}/*`}">.`
    );
  }
  let v = qn(),
    w;
  if (r) {
    let E = typeof r == "string" ? yo(r) : r;
    (Be(
      x === "/" || ((P = E.pathname) == null ? void 0 : P.startsWith(x)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${x}" but pathname "${E.pathname}" was given in the \`location\` prop.`
    ),
      (w = E));
  } else w = v;
  let S = w.pathname || "/",
    _ = S;
  if (x !== "/") {
    let E = x.replace(/^\//, "").split("/");
    _ = "/" + S.replace(/^\//, "").split("/").slice(E.length).join("/");
  }
  let C = gm(e, { pathname: _ });
  (Ft(
    y || C != null,
    `No routes matched location "${w.pathname}${w.search}${w.hash}" `
  ),
    Ft(
      C == null ||
        C[C.length - 1].route.element !== void 0 ||
        C[C.length - 1].route.Component !== void 0 ||
        C[C.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${w.pathname}${w.search}${w.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let b = ox(
    C &&
      C.map((E) =>
        Object.assign({}, E, {
          params: Object.assign({}, h, E.params),
          pathname: En([
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
              : En([
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
  return r && b
    ? k.createElement(
        zs.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...w,
            },
            navigationType: "POP",
          },
        },
        b
      )
    : b;
}
function ex() {
  let e = ux(),
    r = Hv(e)
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
    (c = k.createElement(
      k.Fragment,
      null,
      k.createElement("p", null, "💿 Hey developer 👋"),
      k.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        k.createElement("code", { style: u }, "ErrorBoundary"),
        " or",
        " ",
        k.createElement("code", { style: u }, "errorElement"),
        " prop on your route."
      )
    )),
    k.createElement(
      k.Fragment,
      null,
      k.createElement("h2", null, "Unexpected Application Error!"),
      k.createElement("h3", { style: { fontStyle: "italic" } }, r),
      o ? k.createElement("pre", { style: l }, o) : null,
      c
    )
  );
}
var tx = k.createElement(ex, null),
  Im = class extends k.Component {
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
        const o = Gv(e.digest);
        o && (e = o);
      }
      let r =
        e !== void 0
          ? k.createElement(
              un.Provider,
              { value: this.props.routeContext },
              k.createElement(Fc.Provider, {
                value: e,
                children: this.props.component,
              })
            )
          : this.props.children;
      return this.context ? k.createElement(nx, { error: e }, r) : r;
    }
  };
Im.contextType = Wv;
var Ju = new WeakMap();
function nx({ children: e, error: r }) {
  let { basename: o } = k.useContext(Pt);
  if (
    typeof r == "object" &&
    r &&
    "digest" in r &&
    typeof r.digest == "string"
  ) {
    let i = Qv(r.digest);
    if (i) {
      let l = Ju.get(r);
      if (l) throw l;
      let u = Sm(i.location, o);
      if (wm && !Ju.get(r))
        if (u.isExternal || i.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(u.to, {
              replace: i.replace,
            })
          );
          throw (Ju.set(r, c), c);
        }
      return k.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${u.absoluteURL || u.to}`,
      });
    }
  }
  return e;
}
function rx({ routeContext: e, match: r, children: o }) {
  let i = k.useContext(vo);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = r.route.id),
    k.createElement(un.Provider, { value: e }, o)
  );
}
function ox(e, r = [], o = null, i = null, l = null) {
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
      (y) => y.route.id && (c == null ? void 0 : c[y.route.id]) !== void 0
    );
    (Be(
      x >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(c).join(",")}`
    ),
      (u = u.slice(0, Math.min(u.length, x + 1))));
  }
  let f = !1,
    h = -1;
  if (o)
    for (let x = 0; x < u.length; x++) {
      let y = u[x];
      if (
        ((y.route.HydrateFallback || y.route.hydrateFallbackElement) && (h = x),
        y.route.id)
      ) {
        let { loaderData: v, errors: w } = o,
          S =
            y.route.loader &&
            !v.hasOwnProperty(y.route.id) &&
            (!w || w[y.route.id] === void 0);
        if (y.route.lazy || S) {
          ((f = !0), h >= 0 ? (u = u.slice(0, h + 1)) : (u = [u[0]]));
          break;
        }
      }
    }
  let m =
    o && i
      ? (x, y) => {
          var v, w;
          i(x, {
            location: o.location,
            params:
              ((w = (v = o.matches) == null ? void 0 : v[0]) == null
                ? void 0
                : w.params) ?? {},
            unstable_pattern: Bv(o.matches),
            errorInfo: y,
          });
        }
      : void 0;
  return u.reduceRight((x, y, v) => {
    let w,
      S = !1,
      _ = null,
      C = null;
    o &&
      ((w = c && y.route.id ? c[y.route.id] : void 0),
      (_ = y.route.errorElement || tx),
      f &&
        (h < 0 && v === 0
          ? (Mm(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (S = !0),
            (C = null))
          : h === v &&
            ((S = !0), (C = y.route.hydrateFallbackElement || null))));
    let b = r.concat(u.slice(0, v + 1)),
      P = () => {
        let E;
        return (
          w
            ? (E = _)
            : S
              ? (E = C)
              : y.route.Component
                ? (E = k.createElement(y.route.Component, null))
                : y.route.element
                  ? (E = y.route.element)
                  : (E = x),
          k.createElement(rx, {
            match: y,
            routeContext: { outlet: x, matches: b, isDataRoute: o != null },
            children: E,
          })
        );
      };
    return o && (y.route.ErrorBoundary || y.route.errorElement || v === 0)
      ? k.createElement(Im, {
          location: o.location,
          revalidation: o.revalidation,
          component: _,
          error: w,
          children: P(),
          routeContext: { outlet: null, matches: b, isDataRoute: !0 },
          onError: m,
        })
      : P();
  }, null);
}
function Hc(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function sx(e) {
  let r = k.useContext(vo);
  return (Be(r, Hc(e)), r);
}
function ix(e) {
  let r = k.useContext(Hl);
  return (Be(r, Hc(e)), r);
}
function lx(e) {
  let r = k.useContext(un);
  return (Be(r, Hc(e)), r);
}
function Bc(e) {
  let r = lx(e),
    o = r.matches[r.matches.length - 1];
  return (
    Be(
      o.route.id,
      `${e} can only be used on routes that contain a unique "id"`
    ),
    o.route.id
  );
}
function ax() {
  return Bc("useRouteId");
}
function ux() {
  var i;
  let e = k.useContext(Fc),
    r = ix("useRouteError"),
    o = Bc("useRouteError");
  return e !== void 0 ? e : (i = r.errors) == null ? void 0 : i[o];
}
function cx() {
  let { router: e } = sx("useNavigate"),
    r = Bc("useNavigate"),
    o = k.useRef(!1);
  return (
    bm(() => {
      o.current = !0;
    }),
    k.useCallback(
      async (l, u = {}) => {
        (Ft(o.current, Cm),
          o.current &&
            (typeof l == "number"
              ? await e.navigate(l)
              : await e.navigate(l, { fromRouteId: r, ...u })));
      },
      [e, r]
    )
  );
}
var Qh = {};
function Mm(e, r, o) {
  !r && !Qh[e] && ((Qh[e] = !0), Ft(!1, o));
}
k.memo(dx);
function dx({ routes: e, future: r, state: o, onError: i }) {
  return jm(e, void 0, o, i, r);
}
function fx({ to: e, replace: r, state: o, relative: i }) {
  Be(
    xo(),
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let { static: l } = k.useContext(Pt);
  Ft(
    !l,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  );
  let { matches: u } = k.useContext(un),
    { pathname: c } = qn(),
    f = _m(),
    h = Oc(e, Dc(u), c, i === "path"),
    m = JSON.stringify(h);
  return (
    k.useEffect(() => {
      f(JSON.parse(m), { replace: r, state: o, relative: i });
    }, [f, m, i, r, o]),
    null
  );
}
function vc(e) {
  Be(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function hx({
  basename: e = "/",
  children: r = null,
  location: o,
  navigationType: i = "POP",
  navigator: l,
  static: u = !1,
  unstable_useTransitions: c,
}) {
  Be(
    !xo(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let f = e.replace(/^\/*/, "/"),
    h = k.useMemo(
      () => ({
        basename: f,
        navigator: l,
        static: u,
        unstable_useTransitions: c,
        future: {},
      }),
      [f, l, u, c]
    );
  typeof o == "string" && (o = yo(o));
  let {
      pathname: m = "/",
      search: x = "",
      hash: y = "",
      state: v = null,
      key: w = "default",
    } = o,
    S = k.useMemo(() => {
      let _ = kn(m, f);
      return _ == null
        ? null
        : {
            location: { pathname: _, search: x, hash: y, state: v, key: w },
            navigationType: i,
          };
    }, [f, m, x, y, v, w, i]);
  return (
    Ft(
      S != null,
      `<Router basename="${f}"> is not able to match the URL "${m}${x}${y}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    S == null
      ? null
      : k.createElement(
          Pt.Provider,
          { value: h },
          k.createElement(zs.Provider, { children: r, value: S })
        )
  );
}
function px({ children: e, location: r }) {
  return Jv(xc(e), r);
}
function xc(e, r = []) {
  let o = [];
  return (
    k.Children.forEach(e, (i, l) => {
      if (!k.isValidElement(i)) return;
      let u = [...r, l];
      if (i.type === k.Fragment) {
        o.push.apply(o, xc(i.props.children, u));
        return;
      }
      (Be(
        i.type === vc,
        `[${typeof i.type == "string" ? i.type : i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Be(
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
      (i.props.children && (c.children = xc(i.props.children, u)), o.push(c));
    }),
    o
  );
}
var xl = "get",
  wl = "application/x-www-form-urlencoded";
function Bl(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function mx(e) {
  return Bl(e) && e.tagName.toLowerCase() === "button";
}
function gx(e) {
  return Bl(e) && e.tagName.toLowerCase() === "form";
}
function yx(e) {
  return Bl(e) && e.tagName.toLowerCase() === "input";
}
function vx(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function xx(e, r) {
  return e.button === 0 && (!r || r === "_self") && !vx(e);
}
var ll = null;
function wx() {
  if (ll === null)
    try {
      (new FormData(document.createElement("form"), 0), (ll = !1));
    } catch {
      ll = !0;
    }
  return ll;
}
var Sx = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function ec(e) {
  return e != null && !Sx.has(e)
    ? (Ft(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${wl}"`
      ),
      null)
    : e;
}
function Ex(e, r) {
  let o, i, l, u, c;
  if (gx(e)) {
    let f = e.getAttribute("action");
    ((i = f ? kn(f, r) : null),
      (o = e.getAttribute("method") || xl),
      (l = ec(e.getAttribute("enctype")) || wl),
      (u = new FormData(e)));
  } else if (mx(e) || (yx(e) && (e.type === "submit" || e.type === "image"))) {
    let f = e.form;
    if (f == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let h = e.getAttribute("formaction") || f.getAttribute("action");
    if (
      ((i = h ? kn(h, r) : null),
      (o = e.getAttribute("formmethod") || f.getAttribute("method") || xl),
      (l =
        ec(e.getAttribute("formenctype")) ||
        ec(f.getAttribute("enctype")) ||
        wl),
      (u = new FormData(f, e)),
      !wx())
    ) {
      let { name: m, type: x, value: y } = e;
      if (x === "image") {
        let v = m ? `${m}.` : "";
        (u.append(`${v}x`, "0"), u.append(`${v}y`, "0"));
      } else m && u.append(m, y);
    }
  } else {
    if (Bl(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = xl), (i = null), (l = wl), (c = e));
  }
  return (
    u && l === "text/plain" && ((c = u), (u = void 0)),
    { action: i, method: o.toLowerCase(), encType: l, formData: u, body: c }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Vc(e, r) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(r);
}
function kx(e, r, o) {
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
      : r && kn(i.pathname, r) === "/"
        ? (i.pathname = `${r.replace(/\/$/, "")}/_root.${o}`)
        : (i.pathname = `${i.pathname.replace(/\/$/, "")}.${o}`),
    i
  );
}
async function Nx(e, r) {
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
function Cx(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function bx(e, r, o) {
  let i = await Promise.all(
    e.map(async (l) => {
      let u = r.routes[l.route.id];
      if (u) {
        let c = await Nx(u, o);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return Mx(
    i
      .flat(1)
      .filter(Cx)
      .filter((l) => l.rel === "stylesheet" || l.rel === "preload")
      .map((l) =>
        l.rel === "stylesheet"
          ? { ...l, rel: "prefetch", as: "style" }
          : { ...l, rel: "prefetch" }
      )
  );
}
function Gh(e, r, o, i, l, u) {
  let c = (h, m) => (o[m] ? h.route.id !== o[m].route.id : !0),
    f = (h, m) => {
      var x;
      return (
        o[m].pathname !== h.pathname ||
        (((x = o[m].route.path) == null ? void 0 : x.endsWith("*")) &&
          o[m].params["*"] !== h.params["*"])
      );
    };
  return u === "assets"
    ? r.filter((h, m) => c(h, m) || f(h, m))
    : u === "data"
      ? r.filter((h, m) => {
          var y;
          let x = i.routes[h.route.id];
          if (!x || !x.hasLoader) return !1;
          if (c(h, m) || f(h, m)) return !0;
          if (h.route.shouldRevalidate) {
            let v = h.route.shouldRevalidate({
              currentUrl: new URL(
                l.pathname + l.search + l.hash,
                window.origin
              ),
              currentParams: ((y = o[0]) == null ? void 0 : y.params) || {},
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
function _x(e, r, { includeHydrateFallback: o } = {}) {
  return jx(
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
function jx(e) {
  return [...new Set(e)];
}
function Ix(e) {
  let r = {},
    o = Object.keys(e).sort();
  for (let i of o) r[i] = e[i];
  return r;
}
function Mx(e, r) {
  let o = new Set();
  return (
    new Set(r),
    e.reduce((i, l) => {
      let u = JSON.stringify(Ix(l));
      return (o.has(u) || (o.add(u), i.push({ key: u, link: l })), i);
    }, [])
  );
}
function Pm() {
  let e = k.useContext(vo);
  return (
    Vc(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    e
  );
}
function Px() {
  let e = k.useContext(Hl);
  return (
    Vc(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    e
  );
}
var Wc = k.createContext(void 0);
Wc.displayName = "FrameworkContext";
function Rm() {
  let e = k.useContext(Wc);
  return (
    Vc(e, "You must render this element inside a <HydratedRouter> element"),
    e
  );
}
function Rx(e, r) {
  let o = k.useContext(Wc),
    [i, l] = k.useState(!1),
    [u, c] = k.useState(!1),
    {
      onFocus: f,
      onBlur: h,
      onMouseEnter: m,
      onMouseLeave: x,
      onTouchStart: y,
    } = r,
    v = k.useRef(null);
  (k.useEffect(() => {
    if ((e === "render" && c(!0), e === "viewport")) {
      let _ = (b) => {
          b.forEach((P) => {
            c(P.isIntersecting);
          });
        },
        C = new IntersectionObserver(_, { threshold: 0.5 });
      return (
        v.current && C.observe(v.current),
        () => {
          C.disconnect();
        }
      );
    }
  }, [e]),
    k.useEffect(() => {
      if (i) {
        let _ = setTimeout(() => {
          c(!0);
        }, 100);
        return () => {
          clearTimeout(_);
        };
      }
    }, [i]));
  let w = () => {
      l(!0);
    },
    S = () => {
      (l(!1), c(!1));
    };
  return o
    ? e !== "intent"
      ? [u, v, {}]
      : [
          u,
          v,
          {
            onFocus: ds(f, w),
            onBlur: ds(h, S),
            onMouseEnter: ds(m, w),
            onMouseLeave: ds(x, S),
            onTouchStart: ds(y, w),
          },
        ]
    : [!1, v, {}];
}
function ds(e, r) {
  return (o) => {
    (e && e(o), o.defaultPrevented || r(o));
  };
}
function Tx({ page: e, ...r }) {
  let { router: o } = Pm(),
    i = k.useMemo(() => gm(o.routes, e, o.basename), [o.routes, e, o.basename]);
  return i ? k.createElement(zx, { page: e, matches: i, ...r }) : null;
}
function Lx(e) {
  let { manifest: r, routeModules: o } = Rm(),
    [i, l] = k.useState([]);
  return (
    k.useEffect(() => {
      let u = !1;
      return (
        bx(e, r, o).then((c) => {
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
function zx({ page: e, matches: r, ...o }) {
  let i = qn(),
    { manifest: l, routeModules: u } = Rm(),
    { basename: c } = Pm(),
    { loaderData: f, matches: h } = Px(),
    m = k.useMemo(() => Gh(e, r, h, l, i, "data"), [e, r, h, l, i]),
    x = k.useMemo(() => Gh(e, r, h, l, i, "assets"), [e, r, h, l, i]),
    y = k.useMemo(() => {
      if (e === i.pathname + i.search + i.hash) return [];
      let S = new Set(),
        _ = !1;
      if (
        (r.forEach((b) => {
          var E;
          let P = l.routes[b.route.id];
          !P ||
            !P.hasLoader ||
            ((!m.some((j) => j.route.id === b.route.id) &&
              b.route.id in f &&
              (E = u[b.route.id]) != null &&
              E.shouldRevalidate) ||
            P.hasClientLoader
              ? (_ = !0)
              : S.add(b.route.id));
        }),
        S.size === 0)
      )
        return [];
      let C = kx(e, c, "data");
      return (
        _ &&
          S.size > 0 &&
          C.searchParams.set(
            "_routes",
            r
              .filter((b) => S.has(b.route.id))
              .map((b) => b.route.id)
              .join(",")
          ),
        [C.pathname + C.search]
      );
    }, [c, f, i, l, m, r, e, u]),
    v = k.useMemo(() => _x(x, l), [x, l]),
    w = Lx(x);
  return k.createElement(
    k.Fragment,
    null,
    y.map((S) =>
      k.createElement("link", {
        key: S,
        rel: "prefetch",
        as: "fetch",
        href: S,
        ...o,
      })
    ),
    v.map((S) =>
      k.createElement("link", { key: S, rel: "modulepreload", href: S, ...o })
    ),
    w.map(({ key: S, link: _ }) =>
      k.createElement("link", { key: S, nonce: o.nonce, ..._ })
    )
  );
}
function Ax(...e) {
  return (r) => {
    e.forEach((o) => {
      typeof o == "function" ? o(r) : o != null && (o.current = r);
    });
  };
}
var $x =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  $x && (window.__reactRouterVersion = "7.11.0");
} catch {}
function Dx({
  basename: e,
  children: r,
  unstable_useTransitions: o,
  window: i,
}) {
  let l = k.useRef();
  l.current == null && (l.current = yv({ window: i, v5Compat: !0 }));
  let u = l.current,
    [c, f] = k.useState({ action: u.action, location: u.location }),
    h = k.useCallback(
      (m) => {
        o === !1 ? f(m) : k.startTransition(() => f(m));
      },
      [o]
    );
  return (
    k.useLayoutEffect(() => u.listen(h), [u, h]),
    k.createElement(hx, {
      basename: e,
      children: r,
      location: c.location,
      navigationType: c.action,
      navigator: u,
      unstable_useTransitions: o,
    })
  );
}
var Tm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Lm = k.forwardRef(function (
    {
      onClick: r,
      discover: o = "render",
      prefetch: i = "none",
      relative: l,
      reloadDocument: u,
      replace: c,
      state: f,
      target: h,
      to: m,
      preventScrollReset: x,
      viewTransition: y,
      unstable_defaultShouldRevalidate: v,
      ...w
    },
    S
  ) {
    let { basename: _, unstable_useTransitions: C } = k.useContext(Pt),
      b = typeof m == "string" && Tm.test(m),
      P = Sm(m, _);
    m = P.to;
    let E = qv(m, { relative: l }),
      [j, D, A] = Rx(i, w),
      R = Bx(m, {
        replace: c,
        state: f,
        target: h,
        preventScrollReset: x,
        relative: l,
        viewTransition: y,
        unstable_defaultShouldRevalidate: v,
        unstable_useTransitions: C,
      });
    function H(se) {
      (r && r(se), se.defaultPrevented || R(se));
    }
    let V = k.createElement("a", {
      ...w,
      ...A,
      href: P.absoluteURL || E,
      onClick: P.isExternal || u ? r : H,
      ref: Ax(S, D),
      target: h,
      "data-discover": !b && o === "render" ? "true" : void 0,
    });
    return j && !b
      ? k.createElement(k.Fragment, null, V, k.createElement(Tx, { page: E }))
      : V;
  });
Lm.displayName = "Link";
var Ox = k.forwardRef(function (
  {
    "aria-current": r = "page",
    caseSensitive: o = !1,
    className: i = "",
    end: l = !1,
    style: u,
    to: c,
    viewTransition: f,
    children: h,
    ...m
  },
  x
) {
  let y = As(c, { relative: m.relative }),
    v = qn(),
    w = k.useContext(Hl),
    { navigator: S, basename: _ } = k.useContext(Pt),
    C = w != null && Xx(y) && f === !0,
    b = S.encodeLocation ? S.encodeLocation(y).pathname : y.pathname,
    P = v.pathname,
    E =
      w && w.navigation && w.navigation.location
        ? w.navigation.location.pathname
        : null;
  (o ||
    ((P = P.toLowerCase()),
    (E = E ? E.toLowerCase() : null),
    (b = b.toLowerCase())),
    E && _ && (E = kn(E, _) || E));
  const j = b !== "/" && b.endsWith("/") ? b.length - 1 : b.length;
  let D = P === b || (!l && P.startsWith(b) && P.charAt(j) === "/"),
    A =
      E != null &&
      (E === b || (!l && E.startsWith(b) && E.charAt(b.length) === "/")),
    R = { isActive: D, isPending: A, isTransitioning: C },
    H = D ? r : void 0,
    V;
  typeof i == "function"
    ? (V = i(R))
    : (V = [
        i,
        D ? "active" : null,
        A ? "pending" : null,
        C ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let se = typeof u == "function" ? u(R) : u;
  return k.createElement(
    Lm,
    {
      ...m,
      "aria-current": H,
      className: V,
      ref: x,
      style: se,
      to: c,
      viewTransition: f,
    },
    typeof h == "function" ? h(R) : h
  );
});
Ox.displayName = "NavLink";
var Fx = k.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: r,
      navigate: o,
      reloadDocument: i,
      replace: l,
      state: u,
      method: c = xl,
      action: f,
      onSubmit: h,
      relative: m,
      preventScrollReset: x,
      viewTransition: y,
      unstable_defaultShouldRevalidate: v,
      ...w
    },
    S
  ) => {
    let { unstable_useTransitions: _ } = k.useContext(Pt),
      C = Ux(),
      b = Yx(f, { relative: m }),
      P = c.toLowerCase() === "get" ? "get" : "post",
      E = typeof f == "string" && Tm.test(f),
      j = (D) => {
        if ((h && h(D), D.defaultPrevented)) return;
        D.preventDefault();
        let A = D.nativeEvent.submitter,
          R = (A == null ? void 0 : A.getAttribute("formmethod")) || c,
          H = () =>
            C(A || D.currentTarget, {
              fetcherKey: r,
              method: R,
              navigate: o,
              replace: l,
              state: u,
              relative: m,
              preventScrollReset: x,
              viewTransition: y,
              unstable_defaultShouldRevalidate: v,
            });
        _ && o !== !1 ? k.startTransition(() => H()) : H();
      };
    return k.createElement("form", {
      ref: S,
      method: P,
      action: b,
      onSubmit: i ? h : j,
      ...w,
      "data-discover": !E && e === "render" ? "true" : void 0,
    });
  }
);
Fx.displayName = "Form";
function Hx(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function zm(e) {
  let r = k.useContext(vo);
  return (Be(r, Hx(e)), r);
}
function Bx(
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
  let m = _m(),
    x = qn(),
    y = As(e, { relative: u });
  return k.useCallback(
    (v) => {
      if (xx(v, r)) {
        v.preventDefault();
        let w = o !== void 0 ? o : Ss(x) === Ss(y),
          S = () =>
            m(e, {
              replace: w,
              state: i,
              preventScrollReset: l,
              relative: u,
              viewTransition: c,
              unstable_defaultShouldRevalidate: f,
            });
        h ? k.startTransition(() => S()) : S();
      }
    },
    [x, m, y, o, i, r, e, l, u, c, f, h]
  );
}
var Vx = 0,
  Wx = () => `__${String(++Vx)}__`;
function Ux() {
  let { router: e } = zm("useSubmit"),
    { basename: r } = k.useContext(Pt),
    o = ax(),
    i = e.fetch,
    l = e.navigate;
  return k.useCallback(
    async (u, c = {}) => {
      let { action: f, method: h, encType: m, formData: x, body: y } = Ex(u, r);
      if (c.navigate === !1) {
        let v = c.fetcherKey || Wx();
        await i(v, o, c.action || f, {
          unstable_defaultShouldRevalidate: c.unstable_defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: x,
          body: y,
          formMethod: c.method || h,
          formEncType: c.encType || m,
          flushSync: c.flushSync,
        });
      } else
        await l(c.action || f, {
          unstable_defaultShouldRevalidate: c.unstable_defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: x,
          body: y,
          formMethod: c.method || h,
          formEncType: c.encType || m,
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
function Yx(e, { relative: r } = {}) {
  let { basename: o } = k.useContext(Pt),
    i = k.useContext(un);
  Be(i, "useFormAction must be used inside a RouteContext");
  let [l] = i.matches.slice(-1),
    u = { ...As(e || ".", { relative: r }) },
    c = qn();
  if (e == null) {
    u.search = c.search;
    let f = new URLSearchParams(u.search),
      h = f.getAll("index");
    if (h.some((x) => x === "")) {
      (f.delete("index"),
        h.filter((y) => y).forEach((y) => f.append("index", y)));
      let x = f.toString();
      u.search = x ? `?${x}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      l.route.index &&
      (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"),
    o !== "/" && (u.pathname = u.pathname === "/" ? o : En([o, u.pathname])),
    Ss(u)
  );
}
function Xx(e, { relative: r } = {}) {
  let o = k.useContext(km);
  Be(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = zm("useViewTransitionState"),
    l = As(e, { relative: r });
  if (!o.isTransitioning) return !1;
  let u = kn(o.currentLocation.pathname, i) || o.currentLocation.pathname,
    c = kn(o.nextLocation.pathname, i) || o.nextLocation.pathname;
  return jl(l.pathname, c) != null || jl(l.pathname, u) != null;
}
mm();
const qh = (e) => {
    let r;
    const o = new Set(),
      i = (m, x) => {
        const y = typeof m == "function" ? m(r) : m;
        if (!Object.is(y, r)) {
          const v = r;
          ((r =
            (x ?? (typeof y != "object" || y === null))
              ? y
              : Object.assign({}, r, y)),
            o.forEach((w) => w(r, v)));
        }
      },
      l = () => r,
      f = {
        setState: i,
        getState: l,
        getInitialState: () => h,
        subscribe: (m) => (o.add(m), () => o.delete(m)),
      },
      h = (r = e(i, l, f));
    return f;
  },
  Kx = (e) => (e ? qh(e) : qh),
  Qx = (e) => e;
function Gx(e, r = Qx) {
  const o = ro.useSyncExternalStore(
    e.subscribe,
    ro.useCallback(() => r(e.getState()), [e, r]),
    ro.useCallback(() => r(e.getInitialState()), [e, r])
  );
  return (ro.useDebugValue(o), o);
}
const Zh = (e) => {
    const r = Kx(e),
      o = (i) => Gx(r, i);
    return (Object.assign(o, r), o);
  },
  Uc = (e) => (e ? Zh(e) : Zh),
  Yc = Uc((e, r) => ({
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
function qx({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
      clipRule: "evenodd",
    }),
  });
}
function Zx({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM6 13.25v-2.5h2.5v2.5H6zm0-3.5V7.25h2.5v2.5H6zm3.5 0V7.25H12v2.5H9.5zm0 3.5v-2.5H12v2.5H9.5zm3.5 0v-2.5h2.5v2.5H13zm0-3.5V7.25h2.5v2.5H13z",
      clipRule: "evenodd",
    }),
  });
}
function Jx({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293c.121-.233.362-.393.642-.413a41.102 41.102 0 003.55-.414c1.437-.232 2.43-1.49 2.43-2.902V5.426c0-1.412-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z",
      clipRule: "evenodd",
    }),
  });
}
function Jh({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z",
      clipRule: "evenodd",
    }),
  });
}
function Sl({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      d: "M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z",
    }),
  });
}
function e1({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    }),
  });
}
function wc({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
      clipRule: "evenodd",
    }),
  });
}
function ep({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z",
      clipRule: "evenodd",
    }),
  });
}
function t1({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z",
      clipRule: "evenodd",
    }),
  });
}
function n1({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      d: "M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z",
    }),
  });
}
function r1({ className: e }) {
  return p.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: [
      p.jsx("path", { d: "M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" }),
      p.jsx("path", {
        fillRule: "evenodd",
        d: "M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
        clipRule: "evenodd",
      }),
    ],
  });
}
function o1({ className: e }) {
  return p.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: [
      p.jsx("path", {
        fillRule: "evenodd",
        d: "M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z",
        clipRule: "evenodd",
      }),
      p.jsx("path", {
        d: "M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z",
      }),
    ],
  });
}
function Es({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z",
      clipRule: "evenodd",
    }),
  });
}
function ks({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z",
    }),
  });
}
function Ns({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
      clipRule: "evenodd",
    }),
  });
}
function Am({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      d: "M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z",
    }),
  });
}
function s1({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z",
      clipRule: "evenodd",
    }),
  });
}
function i1({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M3.25 3A2.25 2.25 0 001 5.25v9.5A2.25 2.25 0 003.25 17h13.5A2.25 2.25 0 0019 14.75v-9.5A2.25 2.25 0 0016.75 3H3.25zm.943 8.752a.75.75 0 01.055-1.06L6.128 9l-1.88-1.693a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 01-1.06-.055zM9.75 10.25a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z",
      clipRule: "evenodd",
    }),
  });
}
function l1({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      d: "M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z",
    }),
  });
}
function a1({ className: e }) {
  return p.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: [
      p.jsx("path", {
        d: "M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z",
      }),
      p.jsx("path", {
        fillRule: "evenodd",
        d: "M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z",
        clipRule: "evenodd",
      }),
    ],
  });
}
function u1({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      d: "M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z",
    }),
  });
}
function $m({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    }),
  });
}
function Xc({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M6.56 1.14a.75.75 0 01.177 1.045 3.989 3.989 0 00-.464.86c.185.17.382.329.59.473A3.993 3.993 0 0110 2c1.272 0 2.405.594 3.137 1.518.208-.144.405-.302.59-.473a3.989 3.989 0 00-.464-.86.75.75 0 011.222-.869c.369.519.65 1.105.822 1.736a.75.75 0 01-.174.707 7.03 7.03 0 01-1.299 1.098A4 4 0 0114 6c0 .52-.301.963-.723 1.187a6.961 6.961 0 01-1.158.486c.022.15.035.303.035.459v.874c1.168.115 2.27.455 3.266.974a.75.75 0 11-.706 1.323A7.967 7.967 0 0012 10.163v.461c0 .136-.013.269-.038.398a8 8 0 012.818 1.614.75.75 0 01-1.06 1.06 6.5 6.5 0 00-2.18-1.403A4.5 4.5 0 0110 14.5a4.5 4.5 0 01-1.54-2.207 6.5 6.5 0 00-2.18 1.403.75.75 0 01-1.06-1.06 8 8 0 012.818-1.614 2.981 2.981 0 01-.038-.398v-.461a7.967 7.967 0 00-2.714 1.14.75.75 0 11-.706-1.323 8.96 8.96 0 013.266-.974v-.874c0-.156.013-.31.035-.459a6.961 6.961 0 01-1.158-.486A1.348 1.348 0 016 6c0-.22.018-.436.052-.647a7.03 7.03 0 01-1.299-1.098.75.75 0 01-.174-.707c.172-.63.453-1.217.822-1.736a.75.75 0 011.159.326z",
      clipRule: "evenodd",
    }),
  });
}
function c1({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      d: "M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06A.75.75 0 116.11 5.173L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.062a.75.75 0 01-1.062-1.061l1.061-1.06a.75.75 0 011.06 0zM3 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 10zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0114 10zm-6.828 5.243a3.5 3.5 0 105.656 0H7.172zM10 5.5a4.5 4.5 0 00-3.464 7.404A3 3 0 018.5 15.5h3a3 3 0 011.964-2.596A4.5 4.5 0 0010 5.5z",
    }),
  });
}
function d1({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      fillRule: "evenodd",
      d: "M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z",
      clipRule: "evenodd",
    }),
  });
}
function f1({ className: e }) {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: p.jsx("path", {
      d: "M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z",
    }),
  });
}
function h1({
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
      selectedProjectId: m,
      loading: x,
      fetchProjects: y,
      selectProject: v,
      updateProject: w,
      deleteProject: S,
    } = Yc(),
    [_, C] = k.useState(!1),
    [b, P] = k.useState(!1),
    [E, j] = k.useState(new Set()),
    [D, A] = k.useState(!1),
    [R, H] = k.useState(null),
    [V, se] = k.useState(""),
    [X, Y] = k.useState(null);
  k.useEffect(() => {
    y();
  }, [y]);
  const te = k.useMemo(
      () => (m ? e.filter((F) => F.projectId === m) : e),
      [e, m]
    ),
    L = k.useMemo(() => {
      const F = new Set(e.map((Z) => Z.projectId).filter(Boolean));
      return h.filter((Z) => F.has(Z.projectId));
    }, [e, h]),
    G = k.useCallback(
      (F) => {
        (v(F), C(!1));
      },
      [v]
    ),
    B = h.find((F) => F.projectId === m),
    K = k.useCallback((F, Z) => {
      (H(F), se(Z), C(!1));
    }, []),
    z = k.useCallback(async () => {
      !R || !V.trim() || (await w(R, { name: V.trim() }), H(null), se(""));
    }, [R, V, w]),
    $ = k.useCallback(() => {
      (H(null), se(""));
    }, []),
    U = k.useCallback(
      async (F) => {
        confirm("このプロジェクトを削除しますか？") && (await S(F), C(!1));
      },
      [S]
    ),
    M = k.useCallback(() => {
      (P((F) => !F), j(new Set()));
    }, []),
    I = k.useCallback((F) => {
      j((Z) => {
        const re = new Set(Z);
        return (re.has(F) ? re.delete(F) : re.add(F), re);
      });
    }, []),
    ne = k.useCallback(() => {
      E.size === te.length
        ? j(new Set())
        : j(new Set(te.map((F) => F.sessionId)));
    }, [te, E.size]),
    ie = k.useCallback(async () => {
      if (!(E.size === 0 || !u)) {
        A(!0);
        try {
          (await u(Array.from(E)), j(new Set()), P(!1));
        } finally {
          A(!1);
        }
      }
    }, [E, u]);
  return p.jsxs("aside", {
    className:
      "w-64 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] flex flex-col h-full",
    children: [
      p.jsx("div", {
        className: "p-3 border-b border-[var(--border-subtle)]",
        children: p.jsxs("div", {
          className: "relative",
          children: [
            p.jsxs("button", {
              onClick: () => C(!_),
              className:
                "w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors",
              "aria-expanded": _,
              "aria-haspopup": "listbox",
              children: [
                p.jsxs("div", {
                  className: "flex items-center gap-2 min-w-0",
                  children: [
                    p.jsx(Sl, {
                      className:
                        "w-4 h-4 text-[var(--text-muted)] flex-shrink-0",
                    }),
                    p.jsx("span", {
                      className: "text-sm text-[var(--text-primary)] truncate",
                      children: x
                        ? "読み込み中..."
                        : (B == null ? void 0 : B.name) ||
                          "すべてのプロジェクト",
                    }),
                  ],
                }),
                p.jsx(wc, {
                  className:
                    "w-4 h-4 text-[var(--text-muted)] transition-transform " +
                    (_ ? "rotate-180" : ""),
                }),
              ],
            }),
            _ &&
              p.jsxs("div", {
                className:
                  "absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto",
                children: [
                  p.jsx("button", {
                    onClick: () => G(null),
                    className:
                      "w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] transition-colors " +
                      (m
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"),
                    role: "option",
                    "aria-selected": !m,
                    children: "すべてのプロジェクト",
                  }),
                  L.map((F) =>
                    p.jsx(
                      "div",
                      {
                        className:
                          "group flex items-center gap-1 px-2 py-2 text-sm hover:bg-[var(--bg-surface)] transition-colors " +
                          (m === F.projectId
                            ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"
                            : "text-[var(--text-primary)]"),
                        children:
                          R === F.projectId
                            ? p.jsxs("div", {
                                className: "flex-1 flex items-center gap-1",
                                children: [
                                  p.jsx("label", {
                                    htmlFor: `edit-project-${F.projectId}`,
                                    className: "sr-only",
                                    children: "プロジェクト名を編集",
                                  }),
                                  p.jsx("input", {
                                    id: `edit-project-${F.projectId}`,
                                    type: "text",
                                    value: V,
                                    onChange: (Z) => se(Z.target.value),
                                    onKeyDown: (Z) => {
                                      (Z.key === "Enter" && z(),
                                        Z.key === "Escape" && $());
                                    },
                                    className:
                                      "flex-1 px-2 py-1 text-sm bg-[var(--bg-base)] border border-[var(--border-default)] rounded text-[var(--text-primary)]",
                                    autoFocus: !0,
                                    "aria-label": "プロジェクト名",
                                  }),
                                  p.jsx("button", {
                                    onClick: z,
                                    className:
                                      "p-1 rounded hover:bg-[var(--color-primary-500)] text-[var(--text-muted)] hover:text-white transition-colors",
                                    "aria-label": "保存",
                                    children: p.jsx(Ns, {
                                      className: "w-4 h-4",
                                    }),
                                  }),
                                ],
                              })
                            : p.jsxs(p.Fragment, {
                                children: [
                                  p.jsxs("button", {
                                    onClick: () => G(F.projectId),
                                    className: "flex-1 text-left min-w-0",
                                    role: "option",
                                    "aria-selected": m === F.projectId,
                                    children: [
                                      p.jsx("div", {
                                        className: "truncate",
                                        children: F.name,
                                      }),
                                      p.jsx("div", {
                                        className:
                                          "text-xs text-[var(--text-muted)] truncate",
                                        children: F.path,
                                      }),
                                    ],
                                  }),
                                  p.jsx("button", {
                                    onClick: (Z) => {
                                      (Z.stopPropagation(),
                                        K(F.projectId, F.name));
                                    },
                                    className:
                                      "p-1 rounded opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-[var(--bg-base)] transition-all",
                                    title: "名前を変更",
                                    "aria-label": `${F.name}の名前を変更`,
                                    children: p.jsx(Am, {
                                      className:
                                        "w-3 h-3 text-[var(--text-muted)]",
                                    }),
                                  }),
                                  p.jsx("button", {
                                    onClick: (Z) => {
                                      (Z.stopPropagation(), U(F.projectId));
                                    },
                                    className:
                                      "p-1 rounded opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-500/20 transition-all",
                                    title: "削除",
                                    "aria-label": `${F.name}を削除`,
                                    children: p.jsx(Es, {
                                      className: "w-3 h-3 text-red-400",
                                    }),
                                  }),
                                ],
                              }),
                      },
                      F.projectId
                    )
                  ),
                ],
              }),
          ],
        }),
      }),
      p.jsxs("div", {
        className: "flex-1 overflow-y-auto",
        children: [
          p.jsxs("div", {
            className: "px-3 py-2 flex items-center justify-between",
            children: [
              p.jsx("span", {
                className:
                  "text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider",
                children: "Sessions",
              }),
              u &&
                te.length > 0 &&
                p.jsx("button", {
                  onClick: M,
                  className: `text-xs px-2 py-1 rounded transition-colors ${b ? "bg-[var(--color-primary-500)] text-white" : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]"}`,
                  children: b ? "完了" : "選択",
                }),
            ],
          }),
          b &&
            te.length > 0 &&
            p.jsxs("div", {
              className: "px-3 pb-2 flex items-center gap-2",
              children: [
                p.jsx("button", {
                  onClick: ne,
                  className:
                    "text-xs px-2 py-1 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors",
                  children: E.size === te.length ? "全解除" : "全選択",
                }),
                E.size > 0 &&
                  p.jsxs("button", {
                    onClick: ie,
                    disabled: D,
                    className:
                      "text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50 flex items-center gap-1",
                    children: [
                      p.jsx(Es, { className: "w-3 h-3" }),
                      D ? "削除中..." : `${E.size}件を削除`,
                    ],
                  }),
              ],
            }),
          r
            ? p.jsx("div", {
                className: "px-3 space-y-2",
                children: [1, 2, 3].map((F) =>
                  p.jsx(
                    "div",
                    {
                      className:
                        "h-12 bg-[var(--bg-elevated)] rounded animate-pulse",
                    },
                    F
                  )
                ),
              })
            : te.length === 0
              ? p.jsx("div", {
                  className:
                    "px-3 py-4 text-sm text-[var(--text-muted)] text-center",
                  children: "セッションがありません",
                })
              : p.jsx("div", {
                  className: "px-2 space-y-1",
                  children: te.map((F) => {
                    const Z = h.find((re) => re.projectId === F.projectId);
                    return p.jsx(
                      m1,
                      {
                        session: F,
                        isHidden: f.includes(F.sessionId),
                        onToggle: o,
                        onClick: (re) => Y(re.sessionId),
                        onDelete: l,
                        onHover: c,
                        bulkSelectMode: b,
                        isBulkSelected: E.has(F.sessionId),
                        onBulkToggle: I,
                        projectName: Z == null ? void 0 : Z.name,
                        showProjectBadge: !m,
                        isClicked: X === F.sessionId,
                      },
                      F.sessionId
                    );
                  }),
                }),
        ],
      }),
    ],
  });
}
const p1 = {
    idle: "bg-gray-400",
    active: "bg-blue-500",
    completed: "bg-green-500",
    error: "bg-red-500",
    processing: "bg-yellow-500",
  },
  m1 = k.memo(function ({
    session: r,
    isHidden: o,
    onToggle: i,
    onClick: l,
    onDelete: u,
    onHover: c,
    bulkSelectMode: f = !1,
    isBulkSelected: h = !1,
    onBulkToggle: m,
    projectName: x,
    showProjectBadge: y = !1,
    isClicked: v = !1,
  }) {
    const w = k.useCallback(
        (j) => {
          (j.stopPropagation(), i == null || i(r));
        },
        [i, r]
      ),
      S = k.useCallback(() => {
        f ? m == null || m(r.sessionId) : l == null || l(r);
      }, [f, l, m, r]),
      _ = k.useCallback(
        (j) => {
          (j.stopPropagation(), u == null || u(r));
        },
        [u, r]
      ),
      C = k.useCallback(
        (j) => {
          (j.stopPropagation(), m == null || m(r.sessionId));
        },
        [m, r.sessionId]
      ),
      b = k.useCallback(() => {
        c == null || c(r.sessionId);
      }, [c, r.sessionId]),
      P = k.useCallback(() => {
        c == null || c(null);
      }, [c]),
      E = new Date(r.updatedAt).toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
      });
    return p.jsxs("div", {
      onClick: S,
      onMouseEnter: b,
      onMouseLeave: P,
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
          ? p.jsx("button", {
              onClick: C,
              className: `p-1 rounded transition-colors flex-shrink-0 ${h ? "bg-[var(--color-primary-500)] text-white" : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:bg-[var(--bg-surface)]"}`,
              children: h
                ? p.jsx(Ns, { className: "w-4 h-4" })
                : p.jsx("div", { className: "w-4 h-4" }),
            })
          : p.jsx("button", {
              onClick: w,
              className:
                "p-1 rounded hover:bg-[var(--bg-surface)] transition-colors flex-shrink-0",
              title: o ? "エディタに表示" : "エディタから非表示",
              children: o
                ? p.jsx(o1, { className: "w-4 h-4 text-[var(--text-muted)]" })
                : p.jsx(r1, {
                    className: "w-4 h-4 text-[var(--text-secondary)]",
                  }),
            }),
        p.jsxs("div", {
          className: "flex-1 text-left flex items-center gap-2 min-w-0",
          children: [
            p.jsx("span", {
              className:
                "w-2 h-2 rounded-full flex-shrink-0 " +
                (o ? "bg-gray-500" : p1[r.status]),
            }),
            p.jsxs("div", {
              className: "flex-1 min-w-0",
              children: [
                p.jsx("div", {
                  className:
                    "text-sm truncate " +
                    (o
                      ? "text-[var(--text-muted)] line-through"
                      : "text-[var(--text-primary)]"),
                  children: r.name,
                }),
                p.jsxs("div", {
                  className:
                    "flex items-center gap-2 text-xs text-[var(--text-muted)]",
                  children: [
                    p.jsx("span", { children: E }),
                    y &&
                      x &&
                      p.jsx("span", {
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
          p.jsx("button", {
            onClick: _,
            className:
              "p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all flex-shrink-0",
            title: "セッションを削除",
            children: p.jsx(Es, {
              className: "w-4 h-4 text-red-400 hover:text-red-300",
            }),
          }),
      ],
    });
  });
function Je(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let r = "";
  if (Array.isArray(e))
    for (let o = 0, i; o < e.length; o++)
      (i = Je(e[o])) !== "" && (r += (r && " ") + i);
  else for (let o in e) e[o] && (r += (r && " ") + o);
  return r;
}
var g1 = { value: () => {} };
function Vl() {
  for (var e = 0, r = arguments.length, o = {}, i; e < r; ++e) {
    if (!(i = arguments[e] + "") || i in o || /[\s.]/.test(i))
      throw new Error("illegal type: " + i);
    o[i] = [];
  }
  return new El(o);
}
function El(e) {
  this._ = e;
}
function y1(e, r) {
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
El.prototype = Vl.prototype = {
  constructor: El,
  on: function (e, r) {
    var o = this._,
      i = y1(e + "", o),
      l,
      u = -1,
      c = i.length;
    if (arguments.length < 2) {
      for (; ++u < c; )
        if ((l = (e = i[u]).type) && (l = v1(o[l], e.name))) return l;
      return;
    }
    if (r != null && typeof r != "function")
      throw new Error("invalid callback: " + r);
    for (; ++u < c; )
      if ((l = (e = i[u]).type)) o[l] = tp(o[l], e.name, r);
      else if (r == null) for (l in o) o[l] = tp(o[l], e.name, null);
    return this;
  },
  copy: function () {
    var e = {},
      r = this._;
    for (var o in r) e[o] = r[o].slice();
    return new El(e);
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
function v1(e, r) {
  for (var o = 0, i = e.length, l; o < i; ++o)
    if ((l = e[o]).name === r) return l.value;
}
function tp(e, r, o) {
  for (var i = 0, l = e.length; i < l; ++i)
    if (e[i].name === r) {
      ((e[i] = g1), (e = e.slice(0, i).concat(e.slice(i + 1))));
      break;
    }
  return (o != null && e.push({ name: r, value: o }), e);
}
var Sc = "http://www.w3.org/1999/xhtml";
const np = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Sc,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Wl(e) {
  var r = (e += ""),
    o = r.indexOf(":");
  return (
    o >= 0 && (r = e.slice(0, o)) !== "xmlns" && (e = e.slice(o + 1)),
    np.hasOwnProperty(r) ? { space: np[r], local: e } : e
  );
}
function x1(e) {
  return function () {
    var r = this.ownerDocument,
      o = this.namespaceURI;
    return o === Sc && r.documentElement.namespaceURI === Sc
      ? r.createElement(e)
      : r.createElementNS(o, e);
  };
}
function w1(e) {
  return function () {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Dm(e) {
  var r = Wl(e);
  return (r.local ? w1 : x1)(r);
}
function S1() {}
function Kc(e) {
  return e == null
    ? S1
    : function () {
        return this.querySelector(e);
      };
}
function E1(e) {
  typeof e != "function" && (e = Kc(e));
  for (var r = this._groups, o = r.length, i = new Array(o), l = 0; l < o; ++l)
    for (
      var u = r[l], c = u.length, f = (i[l] = new Array(c)), h, m, x = 0;
      x < c;
      ++x
    )
      (h = u[x]) &&
        (m = e.call(h, h.__data__, x, u)) &&
        ("__data__" in h && (m.__data__ = h.__data__), (f[x] = m));
  return new Mt(i, this._parents);
}
function k1(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function N1() {
  return [];
}
function Om(e) {
  return e == null
    ? N1
    : function () {
        return this.querySelectorAll(e);
      };
}
function C1(e) {
  return function () {
    return k1(e.apply(this, arguments));
  };
}
function b1(e) {
  typeof e == "function" ? (e = C1(e)) : (e = Om(e));
  for (var r = this._groups, o = r.length, i = [], l = [], u = 0; u < o; ++u)
    for (var c = r[u], f = c.length, h, m = 0; m < f; ++m)
      (h = c[m]) && (i.push(e.call(h, h.__data__, m, c)), l.push(h));
  return new Mt(i, l);
}
function Fm(e) {
  return function () {
    return this.matches(e);
  };
}
function Hm(e) {
  return function (r) {
    return r.matches(e);
  };
}
var _1 = Array.prototype.find;
function j1(e) {
  return function () {
    return _1.call(this.children, e);
  };
}
function I1() {
  return this.firstElementChild;
}
function M1(e) {
  return this.select(e == null ? I1 : j1(typeof e == "function" ? e : Hm(e)));
}
var P1 = Array.prototype.filter;
function R1() {
  return Array.from(this.children);
}
function T1(e) {
  return function () {
    return P1.call(this.children, e);
  };
}
function L1(e) {
  return this.selectAll(
    e == null ? R1 : T1(typeof e == "function" ? e : Hm(e))
  );
}
function z1(e) {
  typeof e != "function" && (e = Fm(e));
  for (var r = this._groups, o = r.length, i = new Array(o), l = 0; l < o; ++l)
    for (var u = r[l], c = u.length, f = (i[l] = []), h, m = 0; m < c; ++m)
      (h = u[m]) && e.call(h, h.__data__, m, u) && f.push(h);
  return new Mt(i, this._parents);
}
function Bm(e) {
  return new Array(e.length);
}
function A1() {
  return new Mt(this._enter || this._groups.map(Bm), this._parents);
}
function Il(e, r) {
  ((this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = r));
}
Il.prototype = {
  constructor: Il,
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
function $1(e) {
  return function () {
    return e;
  };
}
function D1(e, r, o, i, l, u) {
  for (var c = 0, f, h = r.length, m = u.length; c < m; ++c)
    (f = r[c]) ? ((f.__data__ = u[c]), (i[c] = f)) : (o[c] = new Il(e, u[c]));
  for (; c < h; ++c) (f = r[c]) && (l[c] = f);
}
function O1(e, r, o, i, l, u, c) {
  var f,
    h,
    m = new Map(),
    x = r.length,
    y = u.length,
    v = new Array(x),
    w;
  for (f = 0; f < x; ++f)
    (h = r[f]) &&
      ((v[f] = w = c.call(h, h.__data__, f, r) + ""),
      m.has(w) ? (l[f] = h) : m.set(w, h));
  for (f = 0; f < y; ++f)
    ((w = c.call(e, u[f], f, u) + ""),
      (h = m.get(w))
        ? ((i[f] = h), (h.__data__ = u[f]), m.delete(w))
        : (o[f] = new Il(e, u[f])));
  for (f = 0; f < x; ++f) (h = r[f]) && m.get(v[f]) === h && (l[f] = h);
}
function F1(e) {
  return e.__data__;
}
function H1(e, r) {
  if (!arguments.length) return Array.from(this, F1);
  var o = r ? O1 : D1,
    i = this._parents,
    l = this._groups;
  typeof e != "function" && (e = $1(e));
  for (
    var u = l.length,
      c = new Array(u),
      f = new Array(u),
      h = new Array(u),
      m = 0;
    m < u;
    ++m
  ) {
    var x = i[m],
      y = l[m],
      v = y.length,
      w = B1(e.call(x, x && x.__data__, m, i)),
      S = w.length,
      _ = (f[m] = new Array(S)),
      C = (c[m] = new Array(S)),
      b = (h[m] = new Array(v));
    o(x, y, _, C, b, w, r);
    for (var P = 0, E = 0, j, D; P < S; ++P)
      if ((j = _[P])) {
        for (P >= E && (E = P + 1); !(D = C[E]) && ++E < S; );
        j._next = D || null;
      }
  }
  return ((c = new Mt(c, i)), (c._enter = f), (c._exit = h), c);
}
function B1(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function V1() {
  return new Mt(this._exit || this._groups.map(Bm), this._parents);
}
function W1(e, r, o) {
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
function U1(e) {
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
      var m = o[h], x = i[h], y = m.length, v = (f[h] = new Array(y)), w, S = 0;
      S < y;
      ++S
    )
      (w = m[S] || x[S]) && (v[S] = w);
  for (; h < l; ++h) f[h] = o[h];
  return new Mt(f, this._parents);
}
function Y1() {
  for (var e = this._groups, r = -1, o = e.length; ++r < o; )
    for (var i = e[r], l = i.length - 1, u = i[l], c; --l >= 0; )
      (c = i[l]) &&
        (u &&
          c.compareDocumentPosition(u) ^ 4 &&
          u.parentNode.insertBefore(c, u),
        (u = c));
  return this;
}
function X1(e) {
  e || (e = K1);
  function r(y, v) {
    return y && v ? e(y.__data__, v.__data__) : !y - !v;
  }
  for (
    var o = this._groups, i = o.length, l = new Array(i), u = 0;
    u < i;
    ++u
  ) {
    for (
      var c = o[u], f = c.length, h = (l[u] = new Array(f)), m, x = 0;
      x < f;
      ++x
    )
      (m = c[x]) && (h[x] = m);
    h.sort(r);
  }
  return new Mt(l, this._parents).order();
}
function K1(e, r) {
  return e < r ? -1 : e > r ? 1 : e >= r ? 0 : NaN;
}
function Q1() {
  var e = arguments[0];
  return ((arguments[0] = this), e.apply(null, arguments), this);
}
function G1() {
  return Array.from(this);
}
function q1() {
  for (var e = this._groups, r = 0, o = e.length; r < o; ++r)
    for (var i = e[r], l = 0, u = i.length; l < u; ++l) {
      var c = i[l];
      if (c) return c;
    }
  return null;
}
function Z1() {
  let e = 0;
  for (const r of this) ++e;
  return e;
}
function J1() {
  return !this.node();
}
function ew(e) {
  for (var r = this._groups, o = 0, i = r.length; o < i; ++o)
    for (var l = r[o], u = 0, c = l.length, f; u < c; ++u)
      (f = l[u]) && e.call(f, f.__data__, u, l);
  return this;
}
function tw(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function nw(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function rw(e, r) {
  return function () {
    this.setAttribute(e, r);
  };
}
function ow(e, r) {
  return function () {
    this.setAttributeNS(e.space, e.local, r);
  };
}
function sw(e, r) {
  return function () {
    var o = r.apply(this, arguments);
    o == null ? this.removeAttribute(e) : this.setAttribute(e, o);
  };
}
function iw(e, r) {
  return function () {
    var o = r.apply(this, arguments);
    o == null
      ? this.removeAttributeNS(e.space, e.local)
      : this.setAttributeNS(e.space, e.local, o);
  };
}
function lw(e, r) {
  var o = Wl(e);
  if (arguments.length < 2) {
    var i = this.node();
    return o.local ? i.getAttributeNS(o.space, o.local) : i.getAttribute(o);
  }
  return this.each(
    (r == null
      ? o.local
        ? nw
        : tw
      : typeof r == "function"
        ? o.local
          ? iw
          : sw
        : o.local
          ? ow
          : rw)(o, r)
  );
}
function Vm(e) {
  return (
    (e.ownerDocument && e.ownerDocument.defaultView) ||
    (e.document && e) ||
    e.defaultView
  );
}
function aw(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function uw(e, r, o) {
  return function () {
    this.style.setProperty(e, r, o);
  };
}
function cw(e, r, o) {
  return function () {
    var i = r.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, o);
  };
}
function dw(e, r, o) {
  return arguments.length > 1
    ? this.each(
        (r == null ? aw : typeof r == "function" ? cw : uw)(e, r, o ?? "")
      )
    : ao(this.node(), e);
}
function ao(e, r) {
  return (
    e.style.getPropertyValue(r) ||
    Vm(e).getComputedStyle(e, null).getPropertyValue(r)
  );
}
function fw(e) {
  return function () {
    delete this[e];
  };
}
function hw(e, r) {
  return function () {
    this[e] = r;
  };
}
function pw(e, r) {
  return function () {
    var o = r.apply(this, arguments);
    o == null ? delete this[e] : (this[e] = o);
  };
}
function mw(e, r) {
  return arguments.length > 1
    ? this.each((r == null ? fw : typeof r == "function" ? pw : hw)(e, r))
    : this.node()[e];
}
function Wm(e) {
  return e.trim().split(/^|\s+/);
}
function Qc(e) {
  return e.classList || new Um(e);
}
function Um(e) {
  ((this._node = e), (this._names = Wm(e.getAttribute("class") || "")));
}
Um.prototype = {
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
function Ym(e, r) {
  for (var o = Qc(e), i = -1, l = r.length; ++i < l; ) o.add(r[i]);
}
function Xm(e, r) {
  for (var o = Qc(e), i = -1, l = r.length; ++i < l; ) o.remove(r[i]);
}
function gw(e) {
  return function () {
    Ym(this, e);
  };
}
function yw(e) {
  return function () {
    Xm(this, e);
  };
}
function vw(e, r) {
  return function () {
    (r.apply(this, arguments) ? Ym : Xm)(this, e);
  };
}
function xw(e, r) {
  var o = Wm(e + "");
  if (arguments.length < 2) {
    for (var i = Qc(this.node()), l = -1, u = o.length; ++l < u; )
      if (!i.contains(o[l])) return !1;
    return !0;
  }
  return this.each((typeof r == "function" ? vw : r ? gw : yw)(o, r));
}
function ww() {
  this.textContent = "";
}
function Sw(e) {
  return function () {
    this.textContent = e;
  };
}
function Ew(e) {
  return function () {
    var r = e.apply(this, arguments);
    this.textContent = r ?? "";
  };
}
function kw(e) {
  return arguments.length
    ? this.each(e == null ? ww : (typeof e == "function" ? Ew : Sw)(e))
    : this.node().textContent;
}
function Nw() {
  this.innerHTML = "";
}
function Cw(e) {
  return function () {
    this.innerHTML = e;
  };
}
function bw(e) {
  return function () {
    var r = e.apply(this, arguments);
    this.innerHTML = r ?? "";
  };
}
function _w(e) {
  return arguments.length
    ? this.each(e == null ? Nw : (typeof e == "function" ? bw : Cw)(e))
    : this.node().innerHTML;
}
function jw() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Iw() {
  return this.each(jw);
}
function Mw() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Pw() {
  return this.each(Mw);
}
function Rw(e) {
  var r = typeof e == "function" ? e : Dm(e);
  return this.select(function () {
    return this.appendChild(r.apply(this, arguments));
  });
}
function Tw() {
  return null;
}
function Lw(e, r) {
  var o = typeof e == "function" ? e : Dm(e),
    i = r == null ? Tw : typeof r == "function" ? r : Kc(r);
  return this.select(function () {
    return this.insertBefore(
      o.apply(this, arguments),
      i.apply(this, arguments) || null
    );
  });
}
function zw() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Aw() {
  return this.each(zw);
}
function $w() {
  var e = this.cloneNode(!1),
    r = this.parentNode;
  return r ? r.insertBefore(e, this.nextSibling) : e;
}
function Dw() {
  var e = this.cloneNode(!0),
    r = this.parentNode;
  return r ? r.insertBefore(e, this.nextSibling) : e;
}
function Ow(e) {
  return this.select(e ? Dw : $w);
}
function Fw(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Hw(e) {
  return function (r) {
    e.call(this, r, this.__data__);
  };
}
function Bw(e) {
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
function Vw(e) {
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
function Ww(e, r, o) {
  return function () {
    var i = this.__on,
      l,
      u = Hw(r);
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
function Uw(e, r, o) {
  var i = Bw(e + ""),
    l,
    u = i.length,
    c;
  if (arguments.length < 2) {
    var f = this.node().__on;
    if (f) {
      for (var h = 0, m = f.length, x; h < m; ++h)
        for (l = 0, x = f[h]; l < u; ++l)
          if ((c = i[l]).type === x.type && c.name === x.name) return x.value;
    }
    return;
  }
  for (f = r ? Ww : Vw, l = 0; l < u; ++l) this.each(f(i[l], r, o));
  return this;
}
function Km(e, r, o) {
  var i = Vm(e),
    l = i.CustomEvent;
  (typeof l == "function"
    ? (l = new l(r, o))
    : ((l = i.document.createEvent("Event")),
      o
        ? (l.initEvent(r, o.bubbles, o.cancelable), (l.detail = o.detail))
        : l.initEvent(r, !1, !1)),
    e.dispatchEvent(l));
}
function Yw(e, r) {
  return function () {
    return Km(this, e, r);
  };
}
function Xw(e, r) {
  return function () {
    return Km(this, e, r.apply(this, arguments));
  };
}
function Kw(e, r) {
  return this.each((typeof r == "function" ? Xw : Yw)(e, r));
}
function* Qw() {
  for (var e = this._groups, r = 0, o = e.length; r < o; ++r)
    for (var i = e[r], l = 0, u = i.length, c; l < u; ++l)
      (c = i[l]) && (yield c);
}
var Qm = [null];
function Mt(e, r) {
  ((this._groups = e), (this._parents = r));
}
function $s() {
  return new Mt([[document.documentElement]], Qm);
}
function Gw() {
  return this;
}
Mt.prototype = $s.prototype = {
  constructor: Mt,
  select: E1,
  selectAll: b1,
  selectChild: M1,
  selectChildren: L1,
  filter: z1,
  data: H1,
  enter: A1,
  exit: V1,
  join: W1,
  merge: U1,
  selection: Gw,
  order: Y1,
  sort: X1,
  call: Q1,
  nodes: G1,
  node: q1,
  size: Z1,
  empty: J1,
  each: ew,
  attr: lw,
  style: dw,
  property: mw,
  classed: xw,
  text: kw,
  html: _w,
  raise: Iw,
  lower: Pw,
  append: Rw,
  insert: Lw,
  remove: Aw,
  clone: Ow,
  datum: Fw,
  on: Uw,
  dispatch: Kw,
  [Symbol.iterator]: Qw,
};
function It(e) {
  return typeof e == "string"
    ? new Mt([[document.querySelector(e)]], [document.documentElement])
    : new Mt([[e]], Qm);
}
function qw(e) {
  let r;
  for (; (r = e.sourceEvent); ) e = r;
  return e;
}
function Kt(e, r) {
  if (((e = qw(e)), r === void 0 && (r = e.currentTarget), r)) {
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
const Zw = { passive: !1 },
  Cs = { capture: !0, passive: !1 };
function tc(e) {
  e.stopImmediatePropagation();
}
function io(e) {
  (e.preventDefault(), e.stopImmediatePropagation());
}
function Gm(e) {
  var r = e.document.documentElement,
    o = It(e).on("dragstart.drag", io, Cs);
  "onselectstart" in r
    ? o.on("selectstart.drag", io, Cs)
    : ((r.__noselect = r.style.MozUserSelect),
      (r.style.MozUserSelect = "none"));
}
function qm(e, r) {
  var o = e.document.documentElement,
    i = It(e).on("dragstart.drag", null);
  (r &&
    (i.on("click.drag", io, Cs),
    setTimeout(function () {
      i.on("click.drag", null);
    }, 0)),
    "onselectstart" in o
      ? i.on("selectstart.drag", null)
      : ((o.style.MozUserSelect = o.__noselect), delete o.__noselect));
}
const al = (e) => () => e;
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
    dy: m,
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
    dy: { value: m, enumerable: !0, configurable: !0 },
    _: { value: x },
  });
}
Ec.prototype.on = function () {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Jw(e) {
  return !e.ctrlKey && !e.button;
}
function e2() {
  return this.parentNode;
}
function t2(e, r) {
  return r ?? { x: e.x, y: e.y };
}
function n2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Zm() {
  var e = Jw,
    r = e2,
    o = t2,
    i = n2,
    l = {},
    u = Vl("start", "drag", "end"),
    c = 0,
    f,
    h,
    m,
    x,
    y = 0;
  function v(j) {
    j.on("mousedown.drag", w)
      .filter(i)
      .on("touchstart.drag", C)
      .on("touchmove.drag", b, Zw)
      .on("touchend.drag touchcancel.drag", P)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function w(j, D) {
    if (!(x || !e.call(this, j, D))) {
      var A = E(this, r.call(this, j, D), j, D, "mouse");
      A &&
        (It(j.view).on("mousemove.drag", S, Cs).on("mouseup.drag", _, Cs),
        Gm(j.view),
        tc(j),
        (m = !1),
        (f = j.clientX),
        (h = j.clientY),
        A("start", j));
    }
  }
  function S(j) {
    if ((io(j), !m)) {
      var D = j.clientX - f,
        A = j.clientY - h;
      m = D * D + A * A > y;
    }
    l.mouse("drag", j);
  }
  function _(j) {
    (It(j.view).on("mousemove.drag mouseup.drag", null),
      qm(j.view, m),
      io(j),
      l.mouse("end", j));
  }
  function C(j, D) {
    if (e.call(this, j, D)) {
      var A = j.changedTouches,
        R = r.call(this, j, D),
        H = A.length,
        V,
        se;
      for (V = 0; V < H; ++V)
        (se = E(this, R, j, D, A[V].identifier, A[V])) &&
          (tc(j), se("start", j, A[V]));
    }
  }
  function b(j) {
    var D = j.changedTouches,
      A = D.length,
      R,
      H;
    for (R = 0; R < A; ++R)
      (H = l[D[R].identifier]) && (io(j), H("drag", j, D[R]));
  }
  function P(j) {
    var D = j.changedTouches,
      A = D.length,
      R,
      H;
    for (
      x && clearTimeout(x),
        x = setTimeout(function () {
          x = null;
        }, 500),
        R = 0;
      R < A;
      ++R
    )
      (H = l[D[R].identifier]) && (tc(j), H("end", j, D[R]));
  }
  function E(j, D, A, R, H, V) {
    var se = u.copy(),
      X = Kt(V || A, D),
      Y,
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
          x: X[0],
          y: X[1],
          dx: 0,
          dy: 0,
          dispatch: se,
        }),
        R
      )) != null
    )
      return (
        (Y = L.x - X[0] || 0),
        (te = L.y - X[1] || 0),
        function G(B, K, z) {
          var $ = X,
            U;
          switch (B) {
            case "start":
              ((l[H] = G), (U = c++));
              break;
            case "end":
              (delete l[H], --c);
            case "drag":
              ((X = Kt(z || K, D)), (U = c));
              break;
          }
          se.call(
            B,
            j,
            new Ec(B, {
              sourceEvent: K,
              subject: L,
              target: v,
              identifier: H,
              active: U,
              x: X[0] + Y,
              y: X[1] + te,
              dx: X[0] - $[0],
              dy: X[1] - $[1],
              dispatch: se,
            }),
            R
          );
        }
      );
  }
  return (
    (v.filter = function (j) {
      return arguments.length
        ? ((e = typeof j == "function" ? j : al(!!j)), v)
        : e;
    }),
    (v.container = function (j) {
      return arguments.length
        ? ((r = typeof j == "function" ? j : al(j)), v)
        : r;
    }),
    (v.subject = function (j) {
      return arguments.length
        ? ((o = typeof j == "function" ? j : al(j)), v)
        : o;
    }),
    (v.touchable = function (j) {
      return arguments.length
        ? ((i = typeof j == "function" ? j : al(!!j)), v)
        : i;
    }),
    (v.on = function () {
      var j = u.on.apply(u, arguments);
      return j === u ? v : j;
    }),
    (v.clickDistance = function (j) {
      return arguments.length ? ((y = (j = +j) * j), v) : Math.sqrt(y);
    }),
    v
  );
}
function Gc(e, r, o) {
  ((e.prototype = r.prototype = o), (o.constructor = e));
}
function Jm(e, r) {
  var o = Object.create(e.prototype);
  for (var i in r) o[i] = r[i];
  return o;
}
function Ds() {}
var bs = 0.7,
  Ml = 1 / bs,
  lo = "\\s*([+-]?\\d+)\\s*",
  _s = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  ln = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  r2 = /^#([0-9a-f]{3,8})$/,
  o2 = new RegExp(`^rgb\\(${lo},${lo},${lo}\\)$`),
  s2 = new RegExp(`^rgb\\(${ln},${ln},${ln}\\)$`),
  i2 = new RegExp(`^rgba\\(${lo},${lo},${lo},${_s}\\)$`),
  l2 = new RegExp(`^rgba\\(${ln},${ln},${ln},${_s}\\)$`),
  a2 = new RegExp(`^hsl\\(${_s},${ln},${ln}\\)$`),
  u2 = new RegExp(`^hsla\\(${_s},${ln},${ln},${_s}\\)$`),
  rp = {
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
Gc(Ds, Sr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: op,
  formatHex: op,
  formatHex8: c2,
  formatHsl: d2,
  formatRgb: sp,
  toString: sp,
});
function op() {
  return this.rgb().formatHex();
}
function c2() {
  return this.rgb().formatHex8();
}
function d2() {
  return e0(this).formatHsl();
}
function sp() {
  return this.rgb().formatRgb();
}
function Sr(e) {
  var r, o;
  return (
    (e = (e + "").trim().toLowerCase()),
    (r = r2.exec(e))
      ? ((o = r[1].length),
        (r = parseInt(r[1], 16)),
        o === 6
          ? ip(r)
          : o === 3
            ? new Et(
                ((r >> 8) & 15) | ((r >> 4) & 240),
                ((r >> 4) & 15) | (r & 240),
                ((r & 15) << 4) | (r & 15),
                1
              )
            : o === 8
              ? ul(
                  (r >> 24) & 255,
                  (r >> 16) & 255,
                  (r >> 8) & 255,
                  (r & 255) / 255
                )
              : o === 4
                ? ul(
                    ((r >> 12) & 15) | ((r >> 8) & 240),
                    ((r >> 8) & 15) | ((r >> 4) & 240),
                    ((r >> 4) & 15) | (r & 240),
                    (((r & 15) << 4) | (r & 15)) / 255
                  )
                : null)
      : (r = o2.exec(e))
        ? new Et(r[1], r[2], r[3], 1)
        : (r = s2.exec(e))
          ? new Et(
              (r[1] * 255) / 100,
              (r[2] * 255) / 100,
              (r[3] * 255) / 100,
              1
            )
          : (r = i2.exec(e))
            ? ul(r[1], r[2], r[3], r[4])
            : (r = l2.exec(e))
              ? ul(
                  (r[1] * 255) / 100,
                  (r[2] * 255) / 100,
                  (r[3] * 255) / 100,
                  r[4]
                )
              : (r = a2.exec(e))
                ? up(r[1], r[2] / 100, r[3] / 100, 1)
                : (r = u2.exec(e))
                  ? up(r[1], r[2] / 100, r[3] / 100, r[4])
                  : rp.hasOwnProperty(e)
                    ? ip(rp[e])
                    : e === "transparent"
                      ? new Et(NaN, NaN, NaN, 0)
                      : null
  );
}
function ip(e) {
  return new Et((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function ul(e, r, o, i) {
  return (i <= 0 && (e = r = o = NaN), new Et(e, r, o, i));
}
function f2(e) {
  return (
    e instanceof Ds || (e = Sr(e)),
    e ? ((e = e.rgb()), new Et(e.r, e.g, e.b, e.opacity)) : new Et()
  );
}
function kc(e, r, o, i) {
  return arguments.length === 1 ? f2(e) : new Et(e, r, o, i ?? 1);
}
function Et(e, r, o, i) {
  ((this.r = +e), (this.g = +r), (this.b = +o), (this.opacity = +i));
}
Gc(
  Et,
  kc,
  Jm(Ds, {
    brighter(e) {
      return (
        (e = e == null ? Ml : Math.pow(Ml, e)),
        new Et(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? bs : Math.pow(bs, e)),
        new Et(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Et(xr(this.r), xr(this.g), xr(this.b), Pl(this.opacity));
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
    hex: lp,
    formatHex: lp,
    formatHex8: h2,
    formatRgb: ap,
    toString: ap,
  })
);
function lp() {
  return `#${yr(this.r)}${yr(this.g)}${yr(this.b)}`;
}
function h2() {
  return `#${yr(this.r)}${yr(this.g)}${yr(this.b)}${yr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ap() {
  const e = Pl(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${xr(this.r)}, ${xr(this.g)}, ${xr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Pl(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function xr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function yr(e) {
  return ((e = xr(e)), (e < 16 ? "0" : "") + e.toString(16));
}
function up(e, r, o, i) {
  return (
    i <= 0
      ? (e = r = o = NaN)
      : o <= 0 || o >= 1
        ? (e = r = NaN)
        : r <= 0 && (e = NaN),
    new Qt(e, r, o, i)
  );
}
function e0(e) {
  if (e instanceof Qt) return new Qt(e.h, e.s, e.l, e.opacity);
  if ((e instanceof Ds || (e = Sr(e)), !e)) return new Qt();
  if (e instanceof Qt) return e;
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
    new Qt(c, f, h, e.opacity)
  );
}
function p2(e, r, o, i) {
  return arguments.length === 1 ? e0(e) : new Qt(e, r, o, i ?? 1);
}
function Qt(e, r, o, i) {
  ((this.h = +e), (this.s = +r), (this.l = +o), (this.opacity = +i));
}
Gc(
  Qt,
  p2,
  Jm(Ds, {
    brighter(e) {
      return (
        (e = e == null ? Ml : Math.pow(Ml, e)),
        new Qt(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? bs : Math.pow(bs, e)),
        new Qt(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        r = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        o = this.l,
        i = o + (o < 0.5 ? o : 1 - o) * r,
        l = 2 * o - i;
      return new Et(
        nc(e >= 240 ? e - 240 : e + 120, l, i),
        nc(e, l, i),
        nc(e < 120 ? e + 240 : e - 120, l, i),
        this.opacity
      );
    },
    clamp() {
      return new Qt(cp(this.h), cl(this.s), cl(this.l), Pl(this.opacity));
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
      const e = Pl(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${cp(this.h)}, ${cl(this.s) * 100}%, ${cl(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  })
);
function cp(e) {
  return ((e = (e || 0) % 360), e < 0 ? e + 360 : e);
}
function cl(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function nc(e, r, o) {
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
const qc = (e) => () => e;
function m2(e, r) {
  return function (o) {
    return e + o * r;
  };
}
function g2(e, r, o) {
  return (
    (e = Math.pow(e, o)),
    (r = Math.pow(r, o) - e),
    (o = 1 / o),
    function (i) {
      return Math.pow(e + i * r, o);
    }
  );
}
function y2(e) {
  return (e = +e) == 1
    ? t0
    : function (r, o) {
        return o - r ? g2(r, o, e) : qc(isNaN(r) ? o : r);
      };
}
function t0(e, r) {
  var o = r - e;
  return o ? m2(e, o) : qc(isNaN(e) ? r : e);
}
const Rl = (function e(r) {
  var o = y2(r);
  function i(l, u) {
    var c = o((l = kc(l)).r, (u = kc(u)).r),
      f = o(l.g, u.g),
      h = o(l.b, u.b),
      m = t0(l.opacity, u.opacity);
    return function (x) {
      return (
        (l.r = c(x)),
        (l.g = f(x)),
        (l.b = h(x)),
        (l.opacity = m(x)),
        l + ""
      );
    };
  }
  return ((i.gamma = e), i);
})(1);
function v2(e, r) {
  r || (r = []);
  var o = e ? Math.min(r.length, e.length) : 0,
    i = r.slice(),
    l;
  return function (u) {
    for (l = 0; l < o; ++l) i[l] = e[l] * (1 - u) + r[l] * u;
    return i;
  };
}
function x2(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function w2(e, r) {
  var o = r ? r.length : 0,
    i = e ? Math.min(o, e.length) : 0,
    l = new Array(i),
    u = new Array(o),
    c;
  for (c = 0; c < i; ++c) l[c] = vs(e[c], r[c]);
  for (; c < o; ++c) u[c] = r[c];
  return function (f) {
    for (c = 0; c < i; ++c) u[c] = l[c](f);
    return u;
  };
}
function S2(e, r) {
  var o = new Date();
  return (
    (e = +e),
    (r = +r),
    function (i) {
      return (o.setTime(e * (1 - i) + r * i), o);
    }
  );
}
function sn(e, r) {
  return (
    (e = +e),
    (r = +r),
    function (o) {
      return e * (1 - o) + r * o;
    }
  );
}
function E2(e, r) {
  var o = {},
    i = {},
    l;
  ((e === null || typeof e != "object") && (e = {}),
    (r === null || typeof r != "object") && (r = {}));
  for (l in r) l in e ? (o[l] = vs(e[l], r[l])) : (i[l] = r[l]);
  return function (u) {
    for (l in o) i[l] = o[l](u);
    return i;
  };
}
var Nc = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  rc = new RegExp(Nc.source, "g");
function k2(e) {
  return function () {
    return e;
  };
}
function N2(e) {
  return function (r) {
    return e(r) + "";
  };
}
function n0(e, r) {
  var o = (Nc.lastIndex = rc.lastIndex = 0),
    i,
    l,
    u,
    c = -1,
    f = [],
    h = [];
  for (e = e + "", r = r + ""; (i = Nc.exec(e)) && (l = rc.exec(r)); )
    ((u = l.index) > o &&
      ((u = r.slice(o, u)), f[c] ? (f[c] += u) : (f[++c] = u)),
      (i = i[0]) === (l = l[0])
        ? f[c]
          ? (f[c] += l)
          : (f[++c] = l)
        : ((f[++c] = null), h.push({ i: c, x: sn(i, l) })),
      (o = rc.lastIndex));
  return (
    o < r.length && ((u = r.slice(o)), f[c] ? (f[c] += u) : (f[++c] = u)),
    f.length < 2
      ? h[0]
        ? N2(h[0].x)
        : k2(r)
      : ((r = h.length),
        function (m) {
          for (var x = 0, y; x < r; ++x) f[(y = h[x]).i] = y.x(m);
          return f.join("");
        })
  );
}
function vs(e, r) {
  var o = typeof r,
    i;
  return r == null || o === "boolean"
    ? qc(r)
    : (o === "number"
        ? sn
        : o === "string"
          ? (i = Sr(r))
            ? ((r = i), Rl)
            : n0
          : r instanceof Sr
            ? Rl
            : r instanceof Date
              ? S2
              : x2(r)
                ? v2
                : Array.isArray(r)
                  ? w2
                  : (typeof r.valueOf != "function" &&
                        typeof r.toString != "function") ||
                      isNaN(r)
                    ? E2
                    : sn)(e, r);
}
var dp = 180 / Math.PI,
  Cc = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function r0(e, r, o, i, l, u) {
  var c, f, h;
  return (
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c)),
    (h = e * o + r * i) && ((o -= e * h), (i -= r * h)),
    (f = Math.sqrt(o * o + i * i)) && ((o /= f), (i /= f), (h /= f)),
    e * i < r * o && ((e = -e), (r = -r), (h = -h), (c = -c)),
    {
      translateX: l,
      translateY: u,
      rotate: Math.atan2(r, e) * dp,
      skewX: Math.atan(h) * dp,
      scaleX: c,
      scaleY: f,
    }
  );
}
var dl;
function C2(e) {
  const r = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    e + ""
  );
  return r.isIdentity ? Cc : r0(r.a, r.b, r.c, r.d, r.e, r.f);
}
function b2(e) {
  return e == null ||
    (dl || (dl = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    dl.setAttribute("transform", e),
    !(e = dl.transform.baseVal.consolidate()))
    ? Cc
    : ((e = e.matrix), r0(e.a, e.b, e.c, e.d, e.e, e.f));
}
function o0(e, r, o, i) {
  function l(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, x, y, v, w, S) {
    if (m !== y || x !== v) {
      var _ = w.push("translate(", null, r, null, o);
      S.push({ i: _ - 4, x: sn(m, y) }, { i: _ - 2, x: sn(x, v) });
    } else (y || v) && w.push("translate(" + y + r + v + o);
  }
  function c(m, x, y, v) {
    m !== x
      ? (m - x > 180 ? (x += 360) : x - m > 180 && (m += 360),
        v.push({ i: y.push(l(y) + "rotate(", null, i) - 2, x: sn(m, x) }))
      : x && y.push(l(y) + "rotate(" + x + i);
  }
  function f(m, x, y, v) {
    m !== x
      ? v.push({ i: y.push(l(y) + "skewX(", null, i) - 2, x: sn(m, x) })
      : x && y.push(l(y) + "skewX(" + x + i);
  }
  function h(m, x, y, v, w, S) {
    if (m !== y || x !== v) {
      var _ = w.push(l(w) + "scale(", null, ",", null, ")");
      S.push({ i: _ - 4, x: sn(m, y) }, { i: _ - 2, x: sn(x, v) });
    } else (y !== 1 || v !== 1) && w.push(l(w) + "scale(" + y + "," + v + ")");
  }
  return function (m, x) {
    var y = [],
      v = [];
    return (
      (m = e(m)),
      (x = e(x)),
      u(m.translateX, m.translateY, x.translateX, x.translateY, y, v),
      c(m.rotate, x.rotate, y, v),
      f(m.skewX, x.skewX, y, v),
      h(m.scaleX, m.scaleY, x.scaleX, x.scaleY, y, v),
      (m = x = null),
      function (w) {
        for (var S = -1, _ = v.length, C; ++S < _; ) y[(C = v[S]).i] = C.x(w);
        return y.join("");
      }
    );
  };
}
var _2 = o0(C2, "px, ", "px)", "deg)"),
  j2 = o0(b2, ", ", ")", ")"),
  I2 = 1e-12;
function fp(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function M2(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function P2(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const kl = (function e(r, o, i) {
  function l(u, c) {
    var f = u[0],
      h = u[1],
      m = u[2],
      x = c[0],
      y = c[1],
      v = c[2],
      w = x - f,
      S = y - h,
      _ = w * w + S * S,
      C,
      b;
    if (_ < I2)
      ((b = Math.log(v / m) / r),
        (C = function (R) {
          return [f + R * w, h + R * S, m * Math.exp(r * R * b)];
        }));
    else {
      var P = Math.sqrt(_),
        E = (v * v - m * m + i * _) / (2 * m * o * P),
        j = (v * v - m * m - i * _) / (2 * v * o * P),
        D = Math.log(Math.sqrt(E * E + 1) - E),
        A = Math.log(Math.sqrt(j * j + 1) - j);
      ((b = (A - D) / r),
        (C = function (R) {
          var H = R * b,
            V = fp(D),
            se = (m / (o * P)) * (V * P2(r * H + D) - M2(D));
          return [f + se * w, h + se * S, (m * V) / fp(r * H + D)];
        }));
    }
    return ((C.duration = (b * 1e3 * r) / Math.SQRT2), C);
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
var uo = 0,
  gs = 0,
  fs = 0,
  s0 = 1e3,
  Tl,
  ys,
  Ll = 0,
  Er = 0,
  Ul = 0,
  js = typeof performance == "object" && performance.now ? performance : Date,
  i0 =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (e) {
          setTimeout(e, 17);
        };
function Zc() {
  return Er || (i0(R2), (Er = js.now() + Ul));
}
function R2() {
  Er = 0;
}
function zl() {
  this._call = this._time = this._next = null;
}
zl.prototype = l0.prototype = {
  constructor: zl,
  restart: function (e, r, o) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    ((o = (o == null ? Zc() : +o) + (r == null ? 0 : +r)),
      !this._next &&
        ys !== this &&
        (ys ? (ys._next = this) : (Tl = this), (ys = this)),
      (this._call = e),
      (this._time = o),
      bc());
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), bc());
  },
};
function l0(e, r, o) {
  var i = new zl();
  return (i.restart(e, r, o), i);
}
function T2() {
  (Zc(), ++uo);
  for (var e = Tl, r; e; )
    ((r = Er - e._time) >= 0 && e._call.call(void 0, r), (e = e._next));
  --uo;
}
function hp() {
  ((Er = (Ll = js.now()) + Ul), (uo = gs = 0));
  try {
    T2();
  } finally {
    ((uo = 0), z2(), (Er = 0));
  }
}
function L2() {
  var e = js.now(),
    r = e - Ll;
  r > s0 && ((Ul -= r), (Ll = e));
}
function z2() {
  for (var e, r = Tl, o, i = 1 / 0; r; )
    r._call
      ? (i > r._time && (i = r._time), (e = r), (r = r._next))
      : ((o = r._next), (r._next = null), (r = e ? (e._next = o) : (Tl = o)));
  ((ys = e), bc(i));
}
function bc(e) {
  if (!uo) {
    gs && (gs = clearTimeout(gs));
    var r = e - Er;
    r > 24
      ? (e < 1 / 0 && (gs = setTimeout(hp, e - js.now() - Ul)),
        fs && (fs = clearInterval(fs)))
      : (fs || ((Ll = js.now()), (fs = setInterval(L2, s0))), (uo = 1), i0(hp));
  }
}
function pp(e, r, o) {
  var i = new zl();
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
var A2 = Vl("start", "end", "cancel", "interrupt"),
  $2 = [],
  a0 = 0,
  mp = 1,
  _c = 2,
  Nl = 3,
  gp = 4,
  jc = 5,
  Cl = 6;
function Yl(e, r, o, i, l, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (o in c) return;
  D2(e, o, {
    name: r,
    index: i,
    group: l,
    on: A2,
    tween: $2,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: a0,
  });
}
function Jc(e, r) {
  var o = Zt(e, r);
  if (o.state > a0) throw new Error("too late; already scheduled");
  return o;
}
function cn(e, r) {
  var o = Zt(e, r);
  if (o.state > Nl) throw new Error("too late; already running");
  return o;
}
function Zt(e, r) {
  var o = e.__transition;
  if (!o || !(o = o[r])) throw new Error("transition not found");
  return o;
}
function D2(e, r, o) {
  var i = e.__transition,
    l;
  ((i[r] = o), (o.timer = l0(u, 0, o.time)));
  function u(m) {
    ((o.state = mp),
      o.timer.restart(c, o.delay, o.time),
      o.delay <= m && c(m - o.delay));
  }
  function c(m) {
    var x, y, v, w;
    if (o.state !== mp) return h();
    for (x in i)
      if (((w = i[x]), w.name === o.name)) {
        if (w.state === Nl) return pp(c);
        w.state === gp
          ? ((w.state = Cl),
            w.timer.stop(),
            w.on.call("interrupt", e, e.__data__, w.index, w.group),
            delete i[x])
          : +x < r &&
            ((w.state = Cl),
            w.timer.stop(),
            w.on.call("cancel", e, e.__data__, w.index, w.group),
            delete i[x]);
      }
    if (
      (pp(function () {
        o.state === Nl &&
          ((o.state = gp), o.timer.restart(f, o.delay, o.time), f(m));
      }),
      (o.state = _c),
      o.on.call("start", e, e.__data__, o.index, o.group),
      o.state === _c)
    ) {
      for (
        o.state = Nl, l = new Array((v = o.tween.length)), x = 0, y = -1;
        x < v;
        ++x
      )
        (w = o.tween[x].value.call(e, e.__data__, o.index, o.group)) &&
          (l[++y] = w);
      l.length = y + 1;
    }
  }
  function f(m) {
    for (
      var x =
          m < o.duration
            ? o.ease.call(null, m / o.duration)
            : (o.timer.restart(h), (o.state = jc), 1),
        y = -1,
        v = l.length;
      ++y < v;
    )
      l[y].call(e, x);
    o.state === jc && (o.on.call("end", e, e.__data__, o.index, o.group), h());
  }
  function h() {
    ((o.state = Cl), o.timer.stop(), delete i[r]);
    for (var m in i) return;
    delete e.__transition;
  }
}
function bl(e, r) {
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
      ((l = i.state > _c && i.state < jc),
        (i.state = Cl),
        i.timer.stop(),
        i.on.call(l ? "interrupt" : "cancel", e, e.__data__, i.index, i.group),
        delete o[c]);
    }
    u && delete e.__transition;
  }
}
function O2(e) {
  return this.each(function () {
    bl(this, e);
  });
}
function F2(e, r) {
  var o, i;
  return function () {
    var l = cn(this, e),
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
function H2(e, r, o) {
  var i, l;
  if (typeof o != "function") throw new Error();
  return function () {
    var u = cn(this, e),
      c = u.tween;
    if (c !== i) {
      l = (i = c).slice();
      for (var f = { name: r, value: o }, h = 0, m = l.length; h < m; ++h)
        if (l[h].name === r) {
          l[h] = f;
          break;
        }
      h === m && l.push(f);
    }
    u.tween = l;
  };
}
function B2(e, r) {
  var o = this._id;
  if (((e += ""), arguments.length < 2)) {
    for (var i = Zt(this.node(), o).tween, l = 0, u = i.length, c; l < u; ++l)
      if ((c = i[l]).name === e) return c.value;
    return null;
  }
  return this.each((r == null ? F2 : H2)(o, e, r));
}
function ed(e, r, o) {
  var i = e._id;
  return (
    e.each(function () {
      var l = cn(this, i);
      (l.value || (l.value = {}))[r] = o.apply(this, arguments);
    }),
    function (l) {
      return Zt(l, i).value[r];
    }
  );
}
function u0(e, r) {
  var o;
  return (
    typeof r == "number"
      ? sn
      : r instanceof Sr
        ? Rl
        : (o = Sr(r))
          ? ((r = o), Rl)
          : n0
  )(e, r);
}
function V2(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function W2(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function U2(e, r, o) {
  var i,
    l = o + "",
    u;
  return function () {
    var c = this.getAttribute(e);
    return c === l ? null : c === i ? u : (u = r((i = c), o));
  };
}
function Y2(e, r, o) {
  var i,
    l = o + "",
    u;
  return function () {
    var c = this.getAttributeNS(e.space, e.local);
    return c === l ? null : c === i ? u : (u = r((i = c), o));
  };
}
function X2(e, r, o) {
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
function K2(e, r, o) {
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
function Q2(e, r) {
  var o = Wl(e),
    i = o === "transform" ? j2 : u0;
  return this.attrTween(
    e,
    typeof r == "function"
      ? (o.local ? K2 : X2)(o, i, ed(this, "attr." + e, r))
      : r == null
        ? (o.local ? W2 : V2)(o)
        : (o.local ? Y2 : U2)(o, i, r)
  );
}
function G2(e, r) {
  return function (o) {
    this.setAttribute(e, r.call(this, o));
  };
}
function q2(e, r) {
  return function (o) {
    this.setAttributeNS(e.space, e.local, r.call(this, o));
  };
}
function Z2(e, r) {
  var o, i;
  function l() {
    var u = r.apply(this, arguments);
    return (u !== i && (o = (i = u) && q2(e, u)), o);
  }
  return ((l._value = r), l);
}
function J2(e, r) {
  var o, i;
  function l() {
    var u = r.apply(this, arguments);
    return (u !== i && (o = (i = u) && G2(e, u)), o);
  }
  return ((l._value = r), l);
}
function eS(e, r) {
  var o = "attr." + e;
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (r == null) return this.tween(o, null);
  if (typeof r != "function") throw new Error();
  var i = Wl(e);
  return this.tween(o, (i.local ? Z2 : J2)(i, r));
}
function tS(e, r) {
  return function () {
    Jc(this, e).delay = +r.apply(this, arguments);
  };
}
function nS(e, r) {
  return (
    (r = +r),
    function () {
      Jc(this, e).delay = r;
    }
  );
}
function rS(e) {
  var r = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? tS : nS)(r, e))
    : Zt(this.node(), r).delay;
}
function oS(e, r) {
  return function () {
    cn(this, e).duration = +r.apply(this, arguments);
  };
}
function sS(e, r) {
  return (
    (r = +r),
    function () {
      cn(this, e).duration = r;
    }
  );
}
function iS(e) {
  var r = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? oS : sS)(r, e))
    : Zt(this.node(), r).duration;
}
function lS(e, r) {
  if (typeof r != "function") throw new Error();
  return function () {
    cn(this, e).ease = r;
  };
}
function aS(e) {
  var r = this._id;
  return arguments.length ? this.each(lS(r, e)) : Zt(this.node(), r).ease;
}
function uS(e, r) {
  return function () {
    var o = r.apply(this, arguments);
    if (typeof o != "function") throw new Error();
    cn(this, e).ease = o;
  };
}
function cS(e) {
  if (typeof e != "function") throw new Error();
  return this.each(uS(this._id, e));
}
function dS(e) {
  typeof e != "function" && (e = Fm(e));
  for (var r = this._groups, o = r.length, i = new Array(o), l = 0; l < o; ++l)
    for (var u = r[l], c = u.length, f = (i[l] = []), h, m = 0; m < c; ++m)
      (h = u[m]) && e.call(h, h.__data__, m, u) && f.push(h);
  return new Nn(i, this._parents, this._name, this._id);
}
function fS(e) {
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
      var h = r[f], m = o[f], x = h.length, y = (c[f] = new Array(x)), v, w = 0;
      w < x;
      ++w
    )
      (v = h[w] || m[w]) && (y[w] = v);
  for (; f < i; ++f) c[f] = r[f];
  return new Nn(c, this._parents, this._name, this._id);
}
function hS(e) {
  return (e + "")
    .trim()
    .split(/^|\s+/)
    .every(function (r) {
      var o = r.indexOf(".");
      return (o >= 0 && (r = r.slice(0, o)), !r || r === "start");
    });
}
function pS(e, r, o) {
  var i,
    l,
    u = hS(r) ? Jc : cn;
  return function () {
    var c = u(this, e),
      f = c.on;
    (f !== i && (l = (i = f).copy()).on(r, o), (c.on = l));
  };
}
function mS(e, r) {
  var o = this._id;
  return arguments.length < 2
    ? Zt(this.node(), o).on.on(e)
    : this.each(pS(o, e, r));
}
function gS(e) {
  return function () {
    var r = this.parentNode;
    for (var o in this.__transition) if (+o !== e) return;
    r && r.removeChild(this);
  };
}
function yS() {
  return this.on("end.remove", gS(this._id));
}
function vS(e) {
  var r = this._name,
    o = this._id;
  typeof e != "function" && (e = Kc(e));
  for (var i = this._groups, l = i.length, u = new Array(l), c = 0; c < l; ++c)
    for (
      var f = i[c], h = f.length, m = (u[c] = new Array(h)), x, y, v = 0;
      v < h;
      ++v
    )
      (x = f[v]) &&
        (y = e.call(x, x.__data__, v, f)) &&
        ("__data__" in x && (y.__data__ = x.__data__),
        (m[v] = y),
        Yl(m[v], r, o, v, m, Zt(x, o)));
  return new Nn(u, this._parents, r, o);
}
function xS(e) {
  var r = this._name,
    o = this._id;
  typeof e != "function" && (e = Om(e));
  for (var i = this._groups, l = i.length, u = [], c = [], f = 0; f < l; ++f)
    for (var h = i[f], m = h.length, x, y = 0; y < m; ++y)
      if ((x = h[y])) {
        for (
          var v = e.call(x, x.__data__, y, h),
            w,
            S = Zt(x, o),
            _ = 0,
            C = v.length;
          _ < C;
          ++_
        )
          (w = v[_]) && Yl(w, r, o, _, v, S);
        (u.push(v), c.push(x));
      }
  return new Nn(u, c, r, o);
}
var wS = $s.prototype.constructor;
function SS() {
  return new wS(this._groups, this._parents);
}
function ES(e, r) {
  var o, i, l;
  return function () {
    var u = ao(this, e),
      c = (this.style.removeProperty(e), ao(this, e));
    return u === c ? null : u === o && c === i ? l : (l = r((o = u), (i = c)));
  };
}
function c0(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function kS(e, r, o) {
  var i,
    l = o + "",
    u;
  return function () {
    var c = ao(this, e);
    return c === l ? null : c === i ? u : (u = r((i = c), o));
  };
}
function NS(e, r, o) {
  var i, l, u;
  return function () {
    var c = ao(this, e),
      f = o(this),
      h = f + "";
    return (
      f == null && (h = f = (this.style.removeProperty(e), ao(this, e))),
      c === h ? null : c === i && h === l ? u : ((l = h), (u = r((i = c), f)))
    );
  };
}
function CS(e, r) {
  var o,
    i,
    l,
    u = "style." + r,
    c = "end." + u,
    f;
  return function () {
    var h = cn(this, e),
      m = h.on,
      x = h.value[u] == null ? f || (f = c0(r)) : void 0;
    ((m !== o || l !== x) && (i = (o = m).copy()).on(c, (l = x)), (h.on = i));
  };
}
function bS(e, r, o) {
  var i = (e += "") == "transform" ? _2 : u0;
  return r == null
    ? this.styleTween(e, ES(e, i)).on("end.style." + e, c0(e))
    : typeof r == "function"
      ? this.styleTween(e, NS(e, i, ed(this, "style." + e, r))).each(
          CS(this._id, e)
        )
      : this.styleTween(e, kS(e, i, r), o).on("end.style." + e, null);
}
function _S(e, r, o) {
  return function (i) {
    this.style.setProperty(e, r.call(this, i), o);
  };
}
function jS(e, r, o) {
  var i, l;
  function u() {
    var c = r.apply(this, arguments);
    return (c !== l && (i = (l = c) && _S(e, c, o)), i);
  }
  return ((u._value = r), u);
}
function IS(e, r, o) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (r == null) return this.tween(i, null);
  if (typeof r != "function") throw new Error();
  return this.tween(i, jS(e, r, o ?? ""));
}
function MS(e) {
  return function () {
    this.textContent = e;
  };
}
function PS(e) {
  return function () {
    var r = e(this);
    this.textContent = r ?? "";
  };
}
function RS(e) {
  return this.tween(
    "text",
    typeof e == "function"
      ? PS(ed(this, "text", e))
      : MS(e == null ? "" : e + "")
  );
}
function TS(e) {
  return function (r) {
    this.textContent = e.call(this, r);
  };
}
function LS(e) {
  var r, o;
  function i() {
    var l = e.apply(this, arguments);
    return (l !== o && (r = (o = l) && TS(l)), r);
  }
  return ((i._value = e), i);
}
function zS(e) {
  var r = "text";
  if (arguments.length < 1) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, LS(e));
}
function AS() {
  for (
    var e = this._name,
      r = this._id,
      o = d0(),
      i = this._groups,
      l = i.length,
      u = 0;
    u < l;
    ++u
  )
    for (var c = i[u], f = c.length, h, m = 0; m < f; ++m)
      if ((h = c[m])) {
        var x = Zt(h, r);
        Yl(h, e, o, m, c, {
          time: x.time + x.delay + x.duration,
          delay: 0,
          duration: x.duration,
          ease: x.ease,
        });
      }
  return new Nn(i, this._parents, e, o);
}
function $S() {
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
      var m = cn(this, i),
        x = m.on;
      (x !== e &&
        ((r = (e = x).copy()),
        r._.cancel.push(f),
        r._.interrupt.push(f),
        r._.end.push(h)),
        (m.on = r));
    }),
      l === 0 && u());
  });
}
var DS = 0;
function Nn(e, r, o, i) {
  ((this._groups = e), (this._parents = r), (this._name = o), (this._id = i));
}
function d0() {
  return ++DS;
}
var wn = $s.prototype;
Nn.prototype = {
  constructor: Nn,
  select: vS,
  selectAll: xS,
  selectChild: wn.selectChild,
  selectChildren: wn.selectChildren,
  filter: dS,
  merge: fS,
  selection: SS,
  transition: AS,
  call: wn.call,
  nodes: wn.nodes,
  node: wn.node,
  size: wn.size,
  empty: wn.empty,
  each: wn.each,
  on: mS,
  attr: Q2,
  attrTween: eS,
  style: bS,
  styleTween: IS,
  text: RS,
  textTween: zS,
  remove: yS,
  tween: B2,
  delay: rS,
  duration: iS,
  ease: aS,
  easeVarying: cS,
  end: $S,
  [Symbol.iterator]: wn[Symbol.iterator],
};
function OS(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var FS = { time: null, delay: 0, duration: 250, ease: OS };
function HS(e, r) {
  for (var o; !(o = e.__transition) || !(o = o[r]); )
    if (!(e = e.parentNode)) throw new Error(`transition ${r} not found`);
  return o;
}
function BS(e) {
  var r, o;
  e instanceof Nn
    ? ((r = e._id), (e = e._name))
    : ((r = d0()), ((o = FS).time = Zc()), (e = e == null ? null : e + ""));
  for (var i = this._groups, l = i.length, u = 0; u < l; ++u)
    for (var c = i[u], f = c.length, h, m = 0; m < f; ++m)
      (h = c[m]) && Yl(h, e, r, m, c, o || HS(h, r));
  return new Nn(i, this._parents, e, r);
}
$s.prototype.interrupt = O2;
$s.prototype.transition = BS;
const fl = (e) => () => e;
function VS(e, { sourceEvent: r, target: o, transform: i, dispatch: l }) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: r, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: l },
  });
}
function Sn(e, r, o) {
  ((this.k = e), (this.x = r), (this.y = o));
}
Sn.prototype = {
  constructor: Sn,
  scale: function (e) {
    return e === 1 ? this : new Sn(this.k * e, this.x, this.y);
  },
  translate: function (e, r) {
    return (e === 0) & (r === 0)
      ? this
      : new Sn(this.k, this.x + this.k * e, this.y + this.k * r);
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
var Xl = new Sn(1, 0, 0);
f0.prototype = Sn.prototype;
function f0(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Xl;
  return e.__zoom;
}
function oc(e) {
  e.stopImmediatePropagation();
}
function hs(e) {
  (e.preventDefault(), e.stopImmediatePropagation());
}
function WS(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function US() {
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
function yp() {
  return this.__zoom || Xl;
}
function YS(e) {
  return (
    -e.deltaY *
    (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) *
    (e.ctrlKey ? 10 : 1)
  );
}
function XS() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function KS(e, r, o) {
  var i = e.invertX(r[0][0]) - o[0][0],
    l = e.invertX(r[1][0]) - o[1][0],
    u = e.invertY(r[0][1]) - o[0][1],
    c = e.invertY(r[1][1]) - o[1][1];
  return e.translate(
    l > i ? (i + l) / 2 : Math.min(0, i) || Math.max(0, l),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function h0() {
  var e = WS,
    r = US,
    o = KS,
    i = YS,
    l = XS,
    u = [0, 1 / 0],
    c = [
      [-1 / 0, -1 / 0],
      [1 / 0, 1 / 0],
    ],
    f = 250,
    h = kl,
    m = Vl("start", "zoom", "end"),
    x,
    y,
    v,
    w = 500,
    S = 150,
    _ = 0,
    C = 10;
  function b(L) {
    L.property("__zoom", yp)
      .on("wheel.zoom", H, { passive: !1 })
      .on("mousedown.zoom", V)
      .on("dblclick.zoom", se)
      .filter(l)
      .on("touchstart.zoom", X)
      .on("touchmove.zoom", Y)
      .on("touchend.zoom touchcancel.zoom", te)
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  ((b.transform = function (L, G, B, K) {
    var z = L.selection ? L.selection() : L;
    (z.property("__zoom", yp),
      L !== z
        ? D(L, G, B, K)
        : z.interrupt().each(function () {
            A(this, arguments)
              .event(K)
              .start()
              .zoom(null, typeof G == "function" ? G.apply(this, arguments) : G)
              .end();
          }));
  }),
    (b.scaleBy = function (L, G, B, K) {
      b.scaleTo(
        L,
        function () {
          var z = this.__zoom.k,
            $ = typeof G == "function" ? G.apply(this, arguments) : G;
          return z * $;
        },
        B,
        K
      );
    }),
    (b.scaleTo = function (L, G, B, K) {
      b.transform(
        L,
        function () {
          var z = r.apply(this, arguments),
            $ = this.__zoom,
            U =
              B == null
                ? j(z)
                : typeof B == "function"
                  ? B.apply(this, arguments)
                  : B,
            M = $.invert(U),
            I = typeof G == "function" ? G.apply(this, arguments) : G;
          return o(E(P($, I), U, M), z, c);
        },
        B,
        K
      );
    }),
    (b.translateBy = function (L, G, B, K) {
      b.transform(
        L,
        function () {
          return o(
            this.__zoom.translate(
              typeof G == "function" ? G.apply(this, arguments) : G,
              typeof B == "function" ? B.apply(this, arguments) : B
            ),
            r.apply(this, arguments),
            c
          );
        },
        null,
        K
      );
    }),
    (b.translateTo = function (L, G, B, K, z) {
      b.transform(
        L,
        function () {
          var $ = r.apply(this, arguments),
            U = this.__zoom,
            M =
              K == null
                ? j($)
                : typeof K == "function"
                  ? K.apply(this, arguments)
                  : K;
          return o(
            Xl.translate(M[0], M[1])
              .scale(U.k)
              .translate(
                typeof G == "function" ? -G.apply(this, arguments) : -G,
                typeof B == "function" ? -B.apply(this, arguments) : -B
              ),
            $,
            c
          );
        },
        K,
        z
      );
    }));
  function P(L, G) {
    return (
      (G = Math.max(u[0], Math.min(u[1], G))),
      G === L.k ? L : new Sn(G, L.x, L.y)
    );
  }
  function E(L, G, B) {
    var K = G[0] - B[0] * L.k,
      z = G[1] - B[1] * L.k;
    return K === L.x && z === L.y ? L : new Sn(L.k, K, z);
  }
  function j(L) {
    return [(+L[0][0] + +L[1][0]) / 2, (+L[0][1] + +L[1][1]) / 2];
  }
  function D(L, G, B, K) {
    L.on("start.zoom", function () {
      A(this, arguments).event(K).start();
    })
      .on("interrupt.zoom end.zoom", function () {
        A(this, arguments).event(K).end();
      })
      .tween("zoom", function () {
        var z = this,
          $ = arguments,
          U = A(z, $).event(K),
          M = r.apply(z, $),
          I = B == null ? j(M) : typeof B == "function" ? B.apply(z, $) : B,
          ne = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]),
          ie = z.__zoom,
          F = typeof G == "function" ? G.apply(z, $) : G,
          Z = h(ie.invert(I).concat(ne / ie.k), F.invert(I).concat(ne / F.k));
        return function (re) {
          if (re === 1) re = F;
          else {
            var Q = Z(re),
              oe = ne / Q[2];
            re = new Sn(oe, I[0] - Q[0] * oe, I[1] - Q[1] * oe);
          }
          U.zoom(null, re);
        };
      });
  }
  function A(L, G, B) {
    return (!B && L.__zooming) || new R(L, G);
  }
  function R(L, G) {
    ((this.that = L),
      (this.args = G),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = r.apply(L, G)),
      (this.taps = 0));
  }
  R.prototype = {
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
    zoom: function (L, G) {
      return (
        this.mouse &&
          L !== "mouse" &&
          (this.mouse[1] = G.invert(this.mouse[0])),
        this.touch0 &&
          L !== "touch" &&
          (this.touch0[1] = G.invert(this.touch0[0])),
        this.touch1 &&
          L !== "touch" &&
          (this.touch1[1] = G.invert(this.touch1[0])),
        (this.that.__zoom = G),
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
      var G = It(this.that).datum();
      m.call(
        L,
        this.that,
        new VS(L, {
          sourceEvent: this.sourceEvent,
          target: b,
          transform: this.that.__zoom,
          dispatch: m,
        }),
        G
      );
    },
  };
  function H(L, ...G) {
    if (!e.apply(this, arguments)) return;
    var B = A(this, G).event(L),
      K = this.__zoom,
      z = Math.max(
        u[0],
        Math.min(u[1], K.k * Math.pow(2, i.apply(this, arguments)))
      ),
      $ = Kt(L);
    if (B.wheel)
      ((B.mouse[0][0] !== $[0] || B.mouse[0][1] !== $[1]) &&
        (B.mouse[1] = K.invert((B.mouse[0] = $))),
        clearTimeout(B.wheel));
    else {
      if (K.k === z) return;
      ((B.mouse = [$, K.invert($)]), bl(this), B.start());
    }
    (hs(L),
      (B.wheel = setTimeout(U, S)),
      B.zoom("mouse", o(E(P(K, z), B.mouse[0], B.mouse[1]), B.extent, c)));
    function U() {
      ((B.wheel = null), B.end());
    }
  }
  function V(L, ...G) {
    if (v || !e.apply(this, arguments)) return;
    var B = L.currentTarget,
      K = A(this, G, !0).event(L),
      z = It(L.view).on("mousemove.zoom", I, !0).on("mouseup.zoom", ne, !0),
      $ = Kt(L, B),
      U = L.clientX,
      M = L.clientY;
    (Gm(L.view),
      oc(L),
      (K.mouse = [$, this.__zoom.invert($)]),
      bl(this),
      K.start());
    function I(ie) {
      if ((hs(ie), !K.moved)) {
        var F = ie.clientX - U,
          Z = ie.clientY - M;
        K.moved = F * F + Z * Z > _;
      }
      K.event(ie).zoom(
        "mouse",
        o(E(K.that.__zoom, (K.mouse[0] = Kt(ie, B)), K.mouse[1]), K.extent, c)
      );
    }
    function ne(ie) {
      (z.on("mousemove.zoom mouseup.zoom", null),
        qm(ie.view, K.moved),
        hs(ie),
        K.event(ie).end());
    }
  }
  function se(L, ...G) {
    if (e.apply(this, arguments)) {
      var B = this.__zoom,
        K = Kt(L.changedTouches ? L.changedTouches[0] : L, this),
        z = B.invert(K),
        $ = B.k * (L.shiftKey ? 0.5 : 2),
        U = o(E(P(B, $), K, z), r.apply(this, G), c);
      (hs(L),
        f > 0
          ? It(this).transition().duration(f).call(D, U, K, L)
          : It(this).call(b.transform, U, K, L));
    }
  }
  function X(L, ...G) {
    if (e.apply(this, arguments)) {
      var B = L.touches,
        K = B.length,
        z = A(this, G, L.changedTouches.length === K).event(L),
        $,
        U,
        M,
        I;
      for (oc(L), U = 0; U < K; ++U)
        ((M = B[U]),
          (I = Kt(M, this)),
          (I = [I, this.__zoom.invert(I), M.identifier]),
          z.touch0
            ? !z.touch1 &&
              z.touch0[2] !== I[2] &&
              ((z.touch1 = I), (z.taps = 0))
            : ((z.touch0 = I), ($ = !0), (z.taps = 1 + !!x)));
      (x && (x = clearTimeout(x)),
        $ &&
          (z.taps < 2 &&
            ((y = I[0]),
            (x = setTimeout(function () {
              x = null;
            }, w))),
          bl(this),
          z.start()));
    }
  }
  function Y(L, ...G) {
    if (this.__zooming) {
      var B = A(this, G).event(L),
        K = L.changedTouches,
        z = K.length,
        $,
        U,
        M,
        I;
      for (hs(L), $ = 0; $ < z; ++$)
        ((U = K[$]),
          (M = Kt(U, this)),
          B.touch0 && B.touch0[2] === U.identifier
            ? (B.touch0[0] = M)
            : B.touch1 && B.touch1[2] === U.identifier && (B.touch1[0] = M));
      if (((U = B.that.__zoom), B.touch1)) {
        var ne = B.touch0[0],
          ie = B.touch0[1],
          F = B.touch1[0],
          Z = B.touch1[1],
          re = (re = F[0] - ne[0]) * re + (re = F[1] - ne[1]) * re,
          Q = (Q = Z[0] - ie[0]) * Q + (Q = Z[1] - ie[1]) * Q;
        ((U = P(U, Math.sqrt(re / Q))),
          (M = [(ne[0] + F[0]) / 2, (ne[1] + F[1]) / 2]),
          (I = [(ie[0] + Z[0]) / 2, (ie[1] + Z[1]) / 2]));
      } else if (B.touch0) ((M = B.touch0[0]), (I = B.touch0[1]));
      else return;
      B.zoom("touch", o(E(U, M, I), B.extent, c));
    }
  }
  function te(L, ...G) {
    if (this.__zooming) {
      var B = A(this, G).event(L),
        K = L.changedTouches,
        z = K.length,
        $,
        U;
      for (
        oc(L),
          v && clearTimeout(v),
          v = setTimeout(function () {
            v = null;
          }, w),
          $ = 0;
        $ < z;
        ++$
      )
        ((U = K[$]),
          B.touch0 && B.touch0[2] === U.identifier
            ? delete B.touch0
            : B.touch1 && B.touch1[2] === U.identifier && delete B.touch1);
      if (
        (B.touch1 && !B.touch0 && ((B.touch0 = B.touch1), delete B.touch1),
        B.touch0)
      )
        B.touch0[1] = this.__zoom.invert(B.touch0[0]);
      else if (
        (B.end(),
        B.taps === 2 &&
          ((U = Kt(U, this)), Math.hypot(y[0] - U[0], y[1] - U[1]) < C))
      ) {
        var M = It(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return (
    (b.wheelDelta = function (L) {
      return arguments.length
        ? ((i = typeof L == "function" ? L : fl(+L)), b)
        : i;
    }),
    (b.filter = function (L) {
      return arguments.length
        ? ((e = typeof L == "function" ? L : fl(!!L)), b)
        : e;
    }),
    (b.touchable = function (L) {
      return arguments.length
        ? ((l = typeof L == "function" ? L : fl(!!L)), b)
        : l;
    }),
    (b.extent = function (L) {
      return arguments.length
        ? ((r =
            typeof L == "function"
              ? L
              : fl([
                  [+L[0][0], +L[0][1]],
                  [+L[1][0], +L[1][1]],
                ])),
          b)
        : r;
    }),
    (b.scaleExtent = function (L) {
      return arguments.length
        ? ((u[0] = +L[0]), (u[1] = +L[1]), b)
        : [u[0], u[1]];
    }),
    (b.translateExtent = function (L) {
      return arguments.length
        ? ((c[0][0] = +L[0][0]),
          (c[1][0] = +L[1][0]),
          (c[0][1] = +L[0][1]),
          (c[1][1] = +L[1][1]),
          b)
        : [
            [c[0][0], c[0][1]],
            [c[1][0], c[1][1]],
          ];
    }),
    (b.constrain = function (L) {
      return arguments.length ? ((o = L), b) : o;
    }),
    (b.duration = function (L) {
      return arguments.length ? ((f = +L), b) : f;
    }),
    (b.interpolate = function (L) {
      return arguments.length ? ((h = L), b) : h;
    }),
    (b.on = function () {
      var L = m.on.apply(m, arguments);
      return L === m ? b : L;
    }),
    (b.clickDistance = function (L) {
      return arguments.length ? ((_ = (L = +L) * L), b) : Math.sqrt(_);
    }),
    (b.tapDistance = function (L) {
      return arguments.length ? ((C = +L), b) : C;
    }),
    b
  );
}
const an = {
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
  Is = [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  p0 = ["Enter", " ", "Escape"],
  m0 = {
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
var co;
(function (e) {
  ((e.Strict = "strict"), (e.Loose = "loose"));
})(co || (co = {}));
var wr;
(function (e) {
  ((e.Free = "free"), (e.Vertical = "vertical"), (e.Horizontal = "horizontal"));
})(wr || (wr = {}));
var Ms;
(function (e) {
  ((e.Partial = "partial"), (e.Full = "full"));
})(Ms || (Ms = {}));
const g0 = {
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
var Qn;
(function (e) {
  ((e.Bezier = "default"),
    (e.Straight = "straight"),
    (e.Step = "step"),
    (e.SmoothStep = "smoothstep"),
    (e.SimpleBezier = "simplebezier"));
})(Qn || (Qn = {}));
var Al;
(function (e) {
  ((e.Arrow = "arrow"), (e.ArrowClosed = "arrowclosed"));
})(Al || (Al = {}));
var be;
(function (e) {
  ((e.Left = "left"),
    (e.Top = "top"),
    (e.Right = "right"),
    (e.Bottom = "bottom"));
})(be || (be = {}));
const vp = {
  [be.Left]: be.Right,
  [be.Right]: be.Left,
  [be.Top]: be.Bottom,
  [be.Bottom]: be.Top,
};
function y0(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const v0 = (e) => "id" in e && "source" in e && "target" in e,
  QS = (e) =>
    "id" in e && "position" in e && !("source" in e) && !("target" in e),
  td = (e) =>
    "id" in e && "internals" in e && !("source" in e) && !("target" in e),
  Os = (e, r = [0, 0]) => {
    const { width: o, height: i } = Cn(e),
      l = e.origin ?? r,
      u = o * l[0],
      c = i * l[1];
    return { x: e.position.x - u, y: e.position.y - c };
  },
  GS = (e, r = { nodeOrigin: [0, 0] }) => {
    if (e.length === 0) return { x: 0, y: 0, width: 0, height: 0 };
    const o = e.reduce(
      (i, l) => {
        const u = typeof l == "string";
        let c = !r.nodeLookup && !u ? l : void 0;
        r.nodeLookup &&
          (c = u ? r.nodeLookup.get(l) : td(l) ? l : r.nodeLookup.get(l.id));
        const f = c ? $l(c, r.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
        return Kl(i, f);
      },
      { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }
    );
    return Ql(o);
  },
  Fs = (e, r = {}) => {
    let o = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 },
      i = !1;
    return (
      e.forEach((l) => {
        (r.filter === void 0 || r.filter(l)) && ((o = Kl(o, $l(l))), (i = !0));
      }),
      i ? Ql(o) : { x: 0, y: 0, width: 0, height: 0 }
    );
  },
  nd = (e, r, [o, i, l] = [0, 0, 1], u = !1, c = !1) => {
    const f = { ...Bs(r, [o, i, l]), width: r.width / l, height: r.height / l },
      h = [];
    for (const m of e.values()) {
      const { measured: x, selectable: y = !0, hidden: v = !1 } = m;
      if ((c && !y) || v) continue;
      const w = x.width ?? m.width ?? m.initialWidth ?? null,
        S = x.height ?? m.height ?? m.initialHeight ?? null,
        _ = Ps(f, ho(m)),
        C = (w ?? 0) * (S ?? 0),
        b = u && _ > 0;
      (!m.internals.handleBounds || b || _ >= C || m.dragging) && h.push(m);
    }
    return h;
  },
  qS = (e, r) => {
    const o = new Set();
    return (
      e.forEach((i) => {
        o.add(i.id);
      }),
      r.filter((i) => o.has(i.source) || o.has(i.target))
    );
  };
function ZS(e, r) {
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
async function JS(
  { nodes: e, width: r, height: o, panZoom: i, minZoom: l, maxZoom: u },
  c
) {
  if (e.size === 0) return Promise.resolve(!0);
  const f = ZS(e, c),
    h = Fs(f),
    m = rd(
      h,
      r,
      o,
      (c == null ? void 0 : c.minZoom) ?? l,
      (c == null ? void 0 : c.maxZoom) ?? u,
      (c == null ? void 0 : c.padding) ?? 0.1
    );
  return (
    await i.setViewport(m, {
      duration: c == null ? void 0 : c.duration,
      ease: c == null ? void 0 : c.ease,
      interpolate: c == null ? void 0 : c.interpolate,
    }),
    Promise.resolve(!0)
  );
}
function x0({
  nodeId: e,
  nextPosition: r,
  nodeLookup: o,
  nodeOrigin: i = [0, 0],
  nodeExtent: l,
  onError: u,
}) {
  const c = o.get(e),
    f = c.parentId ? o.get(c.parentId) : void 0,
    { x: h, y: m } = f ? f.internals.positionAbsolute : { x: 0, y: 0 },
    x = c.origin ?? i;
  let y = c.extent || l;
  if (c.extent === "parent" && !c.expandParent)
    if (!f) u == null || u("005", an.error005());
    else {
      const w = f.measured.width,
        S = f.measured.height;
      w &&
        S &&
        (y = [
          [h, m],
          [h + w, m + S],
        ]);
    }
  else
    f &&
      po(c.extent) &&
      (y = [
        [c.extent[0][0] + h, c.extent[0][1] + m],
        [c.extent[1][0] + h, c.extent[1][1] + m],
      ]);
  const v = po(y) ? kr(r, y, c.measured) : r;
  return (
    (c.measured.width === void 0 || c.measured.height === void 0) &&
      (u == null || u("015", an.error015())),
    {
      position: {
        x: v.x - h + (c.measured.width ?? 0) * x[0],
        y: v.y - m + (c.measured.height ?? 0) * x[1],
      },
      positionAbsolute: v,
    }
  );
}
async function e5({
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
    const w = u.has(v.id),
      S = !w && v.parentId && c.find((_) => _.id === v.parentId);
    (w || S) && c.push(v);
  }
  const f = new Set(r.map((v) => v.id)),
    h = i.filter((v) => v.deletable !== !1),
    x = qS(c, h);
  for (const v of h) f.has(v.id) && !x.find((S) => S.id === v.id) && x.push(v);
  if (!l) return { edges: x, nodes: c };
  const y = await l({ nodes: c, edges: x });
  return typeof y == "boolean"
    ? y
      ? { edges: x, nodes: c }
      : { edges: [], nodes: [] }
    : y;
}
const fo = (e, r = 0, o = 1) => Math.min(Math.max(e, r), o),
  kr = (e = { x: 0, y: 0 }, r, o) => ({
    x: fo(e.x, r[0][0], r[1][0] - ((o == null ? void 0 : o.width) ?? 0)),
    y: fo(e.y, r[0][1], r[1][1] - ((o == null ? void 0 : o.height) ?? 0)),
  });
function w0(e, r, o) {
  const { width: i, height: l } = Cn(o),
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
const xp = (e, r, o) =>
    e < r
      ? fo(Math.abs(e - r), 1, r) / r
      : e > o
        ? -fo(Math.abs(e - o), 1, r) / r
        : 0,
  S0 = (e, r, o = 15, i = 40) => {
    const l = xp(e.x, i, r.width - i) * o,
      u = xp(e.y, i, r.height - i) * o;
    return [l, u];
  },
  Kl = (e, r) => ({
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
  Ql = ({ x: e, y: r, x2: o, y2: i }) => ({
    x: e,
    y: r,
    width: o - e,
    height: i - r,
  }),
  ho = (e, r = [0, 0]) => {
    var l, u;
    const { x: o, y: i } = td(e) ? e.internals.positionAbsolute : Os(e, r);
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
  $l = (e, r = [0, 0]) => {
    var l, u;
    const { x: o, y: i } = td(e) ? e.internals.positionAbsolute : Os(e, r);
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
  E0 = (e, r) => Ql(Kl(Ic(e), Ic(r))),
  Ps = (e, r) => {
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
  wp = (e) => Gt(e.width) && Gt(e.height) && Gt(e.x) && Gt(e.y),
  Gt = (e) => !isNaN(e) && isFinite(e),
  t5 = (e, r) => {},
  Hs = (e, r = [1, 1]) => ({
    x: r[0] * Math.round(e.x / r[0]),
    y: r[1] * Math.round(e.y / r[1]),
  }),
  Bs = ({ x: e, y: r }, [o, i, l], u = !1, c = [1, 1]) => {
    const f = { x: (e - o) / l, y: (r - i) / l };
    return u ? Hs(f, c) : f;
  },
  Dl = ({ x: e, y: r }, [o, i, l]) => ({ x: e * l + o, y: r * l + i });
function to(e, r) {
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
function n5(e, r, o) {
  if (typeof e == "string" || typeof e == "number") {
    const i = to(e, o),
      l = to(e, r);
    return { top: i, right: l, bottom: i, left: l, x: l * 2, y: i * 2 };
  }
  if (typeof e == "object") {
    const i = to(e.top ?? e.y ?? 0, o),
      l = to(e.bottom ?? e.y ?? 0, o),
      u = to(e.left ?? e.x ?? 0, r),
      c = to(e.right ?? e.x ?? 0, r);
    return { top: i, right: c, bottom: l, left: u, x: u + c, y: i + l };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function r5(e, r, o, i, l, u) {
  const { x: c, y: f } = Dl(e, [r, o, i]),
    { x: h, y: m } = Dl({ x: e.x + e.width, y: e.y + e.height }, [r, o, i]),
    x = l - h,
    y = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(f),
    right: Math.floor(x),
    bottom: Math.floor(y),
  };
}
const rd = (e, r, o, i, l, u) => {
    const c = n5(u, r, o),
      f = (r - c.x) / e.width,
      h = (o - c.y) / e.height,
      m = Math.min(f, h),
      x = fo(m, i, l),
      y = e.x + e.width / 2,
      v = e.y + e.height / 2,
      w = r / 2 - y * x,
      S = o / 2 - v * x,
      _ = r5(e, w, S, x, r, o),
      C = {
        left: Math.min(_.left - c.left, 0),
        top: Math.min(_.top - c.top, 0),
        right: Math.min(_.right - c.right, 0),
        bottom: Math.min(_.bottom - c.bottom, 0),
      };
    return { x: w - C.left + C.right, y: S - C.top + C.bottom, zoom: x };
  },
  Rs = () => {
    var e;
    return (
      typeof navigator < "u" &&
      ((e = navigator == null ? void 0 : navigator.userAgent) == null
        ? void 0
        : e.indexOf("Mac")) >= 0
    );
  };
function po(e) {
  return e != null && e !== "parent";
}
function Cn(e) {
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
function k0(e) {
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
function N0(e, r = { width: 0, height: 0 }, o, i, l) {
  const u = { ...e },
    c = i.get(o);
  if (c) {
    const f = c.origin || l;
    ((u.x += c.internals.positionAbsolute.x - (r.width ?? 0) * f[0]),
      (u.y += c.internals.positionAbsolute.y - (r.height ?? 0) * f[1]));
  }
  return u;
}
function Sp(e, r) {
  if (e.size !== r.size) return !1;
  for (const o of e) if (!r.has(o)) return !1;
  return !0;
}
function o5() {
  let e, r;
  return {
    promise: new Promise((i, l) => {
      ((e = i), (r = l));
    }),
    resolve: e,
    reject: r,
  };
}
function s5(e) {
  return { ...m0, ...(e || {}) };
}
function xs(
  e,
  { snapGrid: r = [0, 0], snapToGrid: o = !1, transform: i, containerBounds: l }
) {
  const { x: u, y: c } = qt(e),
    f = Bs(
      {
        x: u - ((l == null ? void 0 : l.left) ?? 0),
        y: c - ((l == null ? void 0 : l.top) ?? 0),
      },
      i
    ),
    { x: h, y: m } = o ? Hs(f, r) : f;
  return { xSnapped: h, ySnapped: m, ...f };
}
const od = (e) => ({ width: e.offsetWidth, height: e.offsetHeight }),
  C0 = (e) => {
    var r;
    return (
      ((r = e == null ? void 0 : e.getRootNode) == null ? void 0 : r.call(e)) ||
      (window == null ? void 0 : window.document)
    );
  },
  i5 = ["INPUT", "SELECT", "TEXTAREA"];
function b0(e) {
  var i, l;
  const r =
    ((l = (i = e.composedPath) == null ? void 0 : i.call(e)) == null
      ? void 0
      : l[0]) || e.target;
  return (r == null ? void 0 : r.nodeType) !== 1
    ? !1
    : i5.includes(r.nodeName) ||
        r.hasAttribute("contenteditable") ||
        !!r.closest(".nokey");
}
const _0 = (e) => "clientX" in e,
  qt = (e, r) => {
    var u, c;
    const o = _0(e),
      i = o ? e.clientX : (u = e.touches) == null ? void 0 : u[0].clientX,
      l = o ? e.clientY : (c = e.touches) == null ? void 0 : c[0].clientY;
    return {
      x: i - ((r == null ? void 0 : r.left) ?? 0),
      y: l - ((r == null ? void 0 : r.top) ?? 0),
    };
  },
  Ep = (e, r, o, i, l) => {
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
            ...od(c),
          };
        });
  };
function j0({
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
    m = r * 0.125 + u * 0.375 + f * 0.375 + i * 0.125,
    x = Math.abs(h - e),
    y = Math.abs(m - r);
  return [h, m, x, y];
}
function hl(e, r) {
  return e >= 0 ? 0.5 * e : r * 25 * Math.sqrt(-e);
}
function kp({ pos: e, x1: r, y1: o, x2: i, y2: l, c: u }) {
  switch (e) {
    case be.Left:
      return [r - hl(r - i, u), o];
    case be.Right:
      return [r + hl(i - r, u), o];
    case be.Top:
      return [r, o - hl(o - l, u)];
    case be.Bottom:
      return [r, o + hl(l - o, u)];
  }
}
function I0({
  sourceX: e,
  sourceY: r,
  sourcePosition: o = be.Bottom,
  targetX: i,
  targetY: l,
  targetPosition: u = be.Top,
  curvature: c = 0.25,
}) {
  const [f, h] = kp({ pos: o, x1: e, y1: r, x2: i, y2: l, c }),
    [m, x] = kp({ pos: u, x1: i, y1: l, x2: e, y2: r, c }),
    [y, v, w, S] = j0({
      sourceX: e,
      sourceY: r,
      targetX: i,
      targetY: l,
      sourceControlX: f,
      sourceControlY: h,
      targetControlX: m,
      targetControlY: x,
    });
  return [`M${e},${r} C${f},${h} ${m},${x} ${i},${l}`, y, v, w, S];
}
function M0({ sourceX: e, sourceY: r, targetX: o, targetY: i }) {
  const l = Math.abs(o - e) / 2,
    u = o < e ? o + l : o - l,
    c = Math.abs(i - r) / 2,
    f = i < r ? i + c : i - c;
  return [u, f, l, c];
}
function l5({
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
function a5({
  sourceNode: e,
  targetNode: r,
  width: o,
  height: i,
  transform: l,
}) {
  const u = Kl($l(e), $l(r));
  (u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1));
  const c = {
    x: -l[0] / l[2],
    y: -l[1] / l[2],
    width: o / l[2],
    height: i / l[2],
  };
  return Ps(c, Ql(u)) > 0;
}
const u5 = ({ source: e, sourceHandle: r, target: o, targetHandle: i }) =>
    `xy-edge__${e}${r || ""}-${o}${i || ""}`,
  c5 = (e, r) =>
    r.some(
      (o) =>
        o.source === e.source &&
        o.target === e.target &&
        (o.sourceHandle === e.sourceHandle ||
          (!o.sourceHandle && !e.sourceHandle)) &&
        (o.targetHandle === e.targetHandle ||
          (!o.targetHandle && !e.targetHandle))
    ),
  P0 = (e, r, o = {}) => {
    if (!e.source || !e.target) return r;
    const i = o.getEdgeId || u5;
    let l;
    return (
      v0(e) ? (l = { ...e }) : (l = { ...e, id: i(e) }),
      c5(l, r)
        ? r
        : (l.sourceHandle === null && delete l.sourceHandle,
          l.targetHandle === null && delete l.targetHandle,
          r.concat(l))
    );
  };
function R0({ sourceX: e, sourceY: r, targetX: o, targetY: i }) {
  const [l, u, c, f] = M0({ sourceX: e, sourceY: r, targetX: o, targetY: i });
  return [`M ${e},${r}L ${o},${i}`, l, u, c, f];
}
const Np = {
    [be.Left]: { x: -1, y: 0 },
    [be.Right]: { x: 1, y: 0 },
    [be.Top]: { x: 0, y: -1 },
    [be.Bottom]: { x: 0, y: 1 },
  },
  d5 = ({ source: e, sourcePosition: r = be.Bottom, target: o }) =>
    r === be.Left || r === be.Right
      ? e.x < o.x
        ? { x: 1, y: 0 }
        : { x: -1, y: 0 }
      : e.y < o.y
        ? { x: 0, y: 1 }
        : { x: 0, y: -1 },
  Cp = (e, r) => Math.sqrt(Math.pow(r.x - e.x, 2) + Math.pow(r.y - e.y, 2));
function f5({
  source: e,
  sourcePosition: r = be.Bottom,
  target: o,
  targetPosition: i = be.Top,
  center: l,
  offset: u,
  stepPosition: c,
}) {
  const f = Np[r],
    h = Np[i],
    m = { x: e.x + f.x * u, y: e.y + f.y * u },
    x = { x: o.x + h.x * u, y: o.y + h.y * u },
    y = d5({ source: m, sourcePosition: r, target: x }),
    v = y.x !== 0 ? "x" : "y",
    w = y[v];
  let S = [],
    _,
    C;
  const b = { x: 0, y: 0 },
    P = { x: 0, y: 0 },
    [, , E, j] = M0({ sourceX: e.x, sourceY: e.y, targetX: o.x, targetY: o.y });
  if (f[v] * h[v] === -1) {
    v === "x"
      ? ((_ = l.x ?? m.x + (x.x - m.x) * c), (C = l.y ?? (m.y + x.y) / 2))
      : ((_ = l.x ?? (m.x + x.x) / 2), (C = l.y ?? m.y + (x.y - m.y) * c));
    const A = [
        { x: _, y: m.y },
        { x: _, y: x.y },
      ],
      R = [
        { x: m.x, y: C },
        { x: x.x, y: C },
      ];
    f[v] === w ? (S = v === "x" ? A : R) : (S = v === "x" ? R : A);
  } else {
    const A = [{ x: m.x, y: x.y }],
      R = [{ x: x.x, y: m.y }];
    if (
      (v === "x" ? (S = f.x === w ? R : A) : (S = f.y === w ? A : R), r === i)
    ) {
      const Y = Math.abs(e[v] - o[v]);
      if (Y <= u) {
        const te = Math.min(u - 1, u - Y);
        f[v] === w
          ? (b[v] = (m[v] > e[v] ? -1 : 1) * te)
          : (P[v] = (x[v] > o[v] ? -1 : 1) * te);
      }
    }
    if (r !== i) {
      const Y = v === "x" ? "y" : "x",
        te = f[v] === h[Y],
        L = m[Y] > x[Y],
        G = m[Y] < x[Y];
      ((f[v] === 1 && ((!te && L) || (te && G))) ||
        (f[v] !== 1 && ((!te && G) || (te && L)))) &&
        (S = v === "x" ? A : R);
    }
    const H = { x: m.x + b.x, y: m.y + b.y },
      V = { x: x.x + P.x, y: x.y + P.y },
      se = Math.max(Math.abs(H.x - S[0].x), Math.abs(V.x - S[0].x)),
      X = Math.max(Math.abs(H.y - S[0].y), Math.abs(V.y - S[0].y));
    se >= X
      ? ((_ = (H.x + V.x) / 2), (C = S[0].y))
      : ((_ = S[0].x), (C = (H.y + V.y) / 2));
  }
  return [
    [
      e,
      { x: m.x + b.x, y: m.y + b.y },
      ...S,
      { x: x.x + P.x, y: x.y + P.y },
      o,
    ],
    _,
    C,
    E,
    j,
  ];
}
function h5(e, r, o, i) {
  const l = Math.min(Cp(e, r) / 2, Cp(r, o) / 2, i),
    { x: u, y: c } = r;
  if ((e.x === u && u === o.x) || (e.y === c && c === o.y)) return `L${u} ${c}`;
  if (e.y === c) {
    const m = e.x < o.x ? -1 : 1,
      x = e.y < o.y ? 1 : -1;
    return `L ${u + l * m},${c}Q ${u},${c} ${u},${c + l * x}`;
  }
  const f = e.x < o.x ? 1 : -1,
    h = e.y < o.y ? -1 : 1;
  return `L ${u},${c + l * h}Q ${u},${c} ${u + l * f},${c}`;
}
function Mc({
  sourceX: e,
  sourceY: r,
  sourcePosition: o = be.Bottom,
  targetX: i,
  targetY: l,
  targetPosition: u = be.Top,
  borderRadius: c = 5,
  centerX: f,
  centerY: h,
  offset: m = 20,
  stepPosition: x = 0.5,
}) {
  const [y, v, w, S, _] = f5({
    source: { x: e, y: r },
    sourcePosition: o,
    target: { x: i, y: l },
    targetPosition: u,
    center: { x: f, y: h },
    offset: m,
    stepPosition: x,
  });
  return [
    y.reduce((b, P, E) => {
      let j = "";
      return (
        E > 0 && E < y.length - 1
          ? (j = h5(y[E - 1], P, y[E + 1], c))
          : (j = `${E === 0 ? "M" : "L"}${P.x} ${P.y}`),
        (b += j),
        b
      );
    }, ""),
    v,
    w,
    S,
    _,
  ];
}
function bp(e) {
  var r;
  return (
    e &&
    !!(e.internals.handleBounds || ((r = e.handles) != null && r.length)) &&
    !!(e.measured.width || e.width || e.initialWidth)
  );
}
function p5(e) {
  var y;
  const { sourceNode: r, targetNode: o } = e;
  if (!bp(r) || !bp(o)) return null;
  const i = r.internals.handleBounds || _p(r.handles),
    l = o.internals.handleBounds || _p(o.handles),
    u = jp((i == null ? void 0 : i.source) ?? [], e.sourceHandle),
    c = jp(
      e.connectionMode === co.Strict
        ? ((l == null ? void 0 : l.target) ?? [])
        : ((l == null ? void 0 : l.target) ?? []).concat(
            (l == null ? void 0 : l.source) ?? []
          ),
      e.targetHandle
    );
  if (!u || !c)
    return (
      (y = e.onError) == null ||
        y.call(
          e,
          "008",
          an.error008(u ? "target" : "source", {
            id: e.id,
            sourceHandle: e.sourceHandle,
            targetHandle: e.targetHandle,
          })
        ),
      null
    );
  const f = (u == null ? void 0 : u.position) || be.Bottom,
    h = (c == null ? void 0 : c.position) || be.Top,
    m = Nr(r, u, f),
    x = Nr(o, c, h);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: x.x,
    targetY: x.y,
    sourcePosition: f,
    targetPosition: h,
  };
}
function _p(e) {
  if (!e) return null;
  const r = [],
    o = [];
  for (const i of e)
    ((i.width = i.width ?? 1),
      (i.height = i.height ?? 1),
      i.type === "source" ? r.push(i) : i.type === "target" && o.push(i));
  return { source: r, target: o };
}
function Nr(e, r, o = be.Left, i = !1) {
  const l = ((r == null ? void 0 : r.x) ?? 0) + e.internals.positionAbsolute.x,
    u = ((r == null ? void 0 : r.y) ?? 0) + e.internals.positionAbsolute.y,
    { width: c, height: f } = r ?? Cn(e);
  if (i) return { x: l + c / 2, y: u + f / 2 };
  switch ((r == null ? void 0 : r.position) ?? o) {
    case be.Top:
      return { x: l + c / 2, y: u };
    case be.Right:
      return { x: l + c, y: u + f / 2 };
    case be.Bottom:
      return { x: l + c / 2, y: u + f };
    case be.Left:
      return { x: l, y: u + f / 2 };
  }
}
function jp(e, r) {
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
function m5(
  e,
  { id: r, defaultColor: o, defaultMarkerStart: i, defaultMarkerEnd: l }
) {
  const u = new Set();
  return e
    .reduce(
      (c, f) => (
        [f.markerStart || i, f.markerEnd || l].forEach((h) => {
          if (h && typeof h == "object") {
            const m = Pc(h, r);
            u.has(m) ||
              (c.push({ id: m, color: h.color || o, ...h }), u.add(m));
          }
        }),
        c
      ),
      []
    )
    .sort((c, f) => c.id.localeCompare(f.id));
}
const T0 = 1e3,
  g5 = 10,
  sd = {
    nodeOrigin: [0, 0],
    nodeExtent: Is,
    elevateNodesOnSelect: !0,
    zIndexMode: "basic",
    defaults: {},
  },
  y5 = { ...sd, checkEquality: !0 };
function id(e, r) {
  const o = { ...e };
  for (const i in r) r[i] !== void 0 && (o[i] = r[i]);
  return o;
}
function v5(e, r, o) {
  const i = id(sd, o);
  for (const l of e.values())
    if (l.parentId) ad(l, e, r, i);
    else {
      const u = Os(l, i.nodeOrigin),
        c = po(l.extent) ? l.extent : i.nodeExtent,
        f = kr(u, c, Cn(l));
      l.internals.positionAbsolute = f;
    }
}
function x5(e, r) {
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
function ld(e) {
  return e === "manual";
}
function Rc(e, r, o, i = {}) {
  var m, x;
  const l = id(y5, i),
    u = { i: 0 },
    c = new Map(r),
    f = l != null && l.elevateNodesOnSelect && !ld(l.zIndexMode) ? T0 : 0;
  let h = e.length > 0;
  (r.clear(), o.clear());
  for (const y of e) {
    let v = c.get(y.id);
    if (l.checkEquality && y === (v == null ? void 0 : v.internals.userNode))
      r.set(y.id, v);
    else {
      const w = Os(y, l.nodeOrigin),
        S = po(y.extent) ? y.extent : l.nodeExtent,
        _ = kr(w, S, Cn(y));
      ((v = {
        ...l.defaults,
        ...y,
        measured: {
          width: (m = y.measured) == null ? void 0 : m.width,
          height: (x = y.measured) == null ? void 0 : x.height,
        },
        internals: {
          positionAbsolute: _,
          handleBounds: x5(y, v),
          z: L0(y, f, l.zIndexMode),
          userNode: y,
        },
      }),
        r.set(y.id, v));
    }
    ((v.measured === void 0 ||
      v.measured.width === void 0 ||
      v.measured.height === void 0) &&
      !v.hidden &&
      (h = !1),
      y.parentId && ad(v, r, o, i, u));
  }
  return h;
}
function w5(e, r) {
  if (!e.parentId) return;
  const o = r.get(e.parentId);
  o ? o.set(e.id, e) : r.set(e.parentId, new Map([[e.id, e]]));
}
function ad(e, r, o, i, l) {
  const {
      elevateNodesOnSelect: u,
      nodeOrigin: c,
      nodeExtent: f,
      zIndexMode: h,
    } = id(sd, i),
    m = e.parentId,
    x = r.get(m);
  if (!x) {
    console.warn(
      `Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`
    );
    return;
  }
  (w5(e, o),
    l &&
      !x.parentId &&
      x.internals.rootParentIndex === void 0 &&
      h === "auto" &&
      ((x.internals.rootParentIndex = ++l.i),
      (x.internals.z = x.internals.z + l.i * g5)),
    l &&
      x.internals.rootParentIndex !== void 0 &&
      (l.i = x.internals.rootParentIndex));
  const y = u && !ld(h) ? T0 : 0,
    { x: v, y: w, z: S } = S5(e, x, c, f, y, h),
    { positionAbsolute: _ } = e.internals,
    C = v !== _.x || w !== _.y;
  (C || S !== e.internals.z) &&
    r.set(e.id, {
      ...e,
      internals: {
        ...e.internals,
        positionAbsolute: C ? { x: v, y: w } : _,
        z: S,
      },
    });
}
function L0(e, r, o) {
  const i = Gt(e.zIndex) ? e.zIndex : 0;
  return ld(o) ? i : i + (e.selected ? r : 0);
}
function S5(e, r, o, i, l, u) {
  const { x: c, y: f } = r.internals.positionAbsolute,
    h = Cn(e),
    m = Os(e, o),
    x = po(e.extent) ? kr(m, e.extent, h) : m;
  let y = kr({ x: c + x.x, y: f + x.y }, i, h);
  e.extent === "parent" && (y = w0(y, h, r));
  const v = L0(e, l, u),
    w = r.internals.z ?? 0;
  return { x: y.x, y: y.y, z: w >= v ? w + 1 : v };
}
function ud(e, r, o, i = [0, 0]) {
  var c;
  const l = [],
    u = new Map();
  for (const f of e) {
    const h = r.get(f.parentId);
    if (!h) continue;
    const m =
        ((c = u.get(f.parentId)) == null ? void 0 : c.expandedRect) ?? ho(h),
      x = E0(m, f.rect);
    u.set(f.parentId, { expandedRect: x, parent: h });
  }
  return (
    u.size > 0 &&
      u.forEach(({ expandedRect: f, parent: h }, m) => {
        var E;
        const x = h.internals.positionAbsolute,
          y = Cn(h),
          v = h.origin ?? i,
          w = f.x < x.x ? Math.round(Math.abs(x.x - f.x)) : 0,
          S = f.y < x.y ? Math.round(Math.abs(x.y - f.y)) : 0,
          _ = Math.max(y.width, Math.round(f.width)),
          C = Math.max(y.height, Math.round(f.height)),
          b = (_ - y.width) * v[0],
          P = (C - y.height) * v[1];
        ((w > 0 || S > 0 || b || P) &&
          (l.push({
            id: m,
            type: "position",
            position: { x: h.position.x - w + b, y: h.position.y - S + P },
          }),
          (E = o.get(m)) == null ||
            E.forEach((j) => {
              e.some((D) => D.id === j.id) ||
                l.push({
                  id: j.id,
                  type: "position",
                  position: { x: j.position.x + w, y: j.position.y + S },
                });
            })),
          (y.width < f.width || y.height < f.height || w || S) &&
            l.push({
              id: m,
              type: "dimensions",
              setAttributes: !0,
              dimensions: {
                width: _ + (w ? v[0] * w - b : 0),
                height: C + (S ? v[1] * S - P : 0),
              },
            }));
      }),
    l
  );
}
function E5(e, r, o, i, l, u, c) {
  const f = i == null ? void 0 : i.querySelector(".xyflow__viewport");
  let h = !1;
  if (!f) return { changes: [], updatedInternals: h };
  const m = [],
    x = window.getComputedStyle(f),
    { m22: y } = new window.DOMMatrixReadOnly(x.transform),
    v = [];
  for (const w of e.values()) {
    const S = r.get(w.id);
    if (!S) continue;
    if (S.hidden) {
      (r.set(S.id, {
        ...S,
        internals: { ...S.internals, handleBounds: void 0 },
      }),
        (h = !0));
      continue;
    }
    const _ = od(w.nodeElement),
      C = S.measured.width !== _.width || S.measured.height !== _.height;
    if (
      !!(_.width && _.height && (C || !S.internals.handleBounds || w.force))
    ) {
      const P = w.nodeElement.getBoundingClientRect(),
        E = po(S.extent) ? S.extent : u;
      let { positionAbsolute: j } = S.internals;
      S.parentId && S.extent === "parent"
        ? (j = w0(j, _, r.get(S.parentId)))
        : E && (j = kr(j, E, _));
      const D = {
        ...S,
        measured: _,
        internals: {
          ...S.internals,
          positionAbsolute: j,
          handleBounds: {
            source: Ep("source", w.nodeElement, P, y, S.id),
            target: Ep("target", w.nodeElement, P, y, S.id),
          },
        },
      };
      (r.set(S.id, D),
        S.parentId && ad(D, r, o, { nodeOrigin: l, zIndexMode: c }),
        (h = !0),
        C &&
          (m.push({ id: S.id, type: "dimensions", dimensions: _ }),
          S.expandParent &&
            S.parentId &&
            v.push({ id: S.id, parentId: S.parentId, rect: ho(D, l) })));
    }
  }
  if (v.length > 0) {
    const w = ud(v, r, o, l);
    m.push(...w);
  }
  return { changes: m, updatedInternals: h };
}
async function k5({
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
function Ip(e, r, o, i, l, u) {
  let c = l;
  const f = i.get(c) || new Map();
  (i.set(c, f.set(o, r)), (c = `${l}-${e}`));
  const h = i.get(c) || new Map();
  if ((i.set(c, h.set(o, r)), u)) {
    c = `${l}-${e}-${u}`;
    const m = i.get(c) || new Map();
    i.set(c, m.set(o, r));
  }
}
function z0(e, r, o) {
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
      m = `${l}-${c}--${u}-${f}`,
      x = `${u}-${f}--${l}-${c}`;
    (Ip("source", h, x, e, l, c), Ip("target", h, m, e, u, f), r.set(i.id, i));
  }
}
function A0(e, r) {
  if (!e.parentId) return !1;
  const o = r.get(e.parentId);
  return o ? (o.selected ? !0 : A0(o, r)) : !1;
}
function Mp(e, r, o) {
  var l;
  let i = e;
  do {
    if ((l = i == null ? void 0 : i.matches) != null && l.call(i, r)) return !0;
    if (i === o) return !1;
    i = i == null ? void 0 : i.parentElement;
  } while (i);
  return !1;
}
function N5(e, r, o, i) {
  const l = new Map();
  for (const [u, c] of e)
    if (
      (c.selected || c.id === i) &&
      (!c.parentId || !A0(c, e)) &&
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
function sc({ nodeId: e, dragItems: r, nodeLookup: o, dragging: i = !0 }) {
  var c, f, h;
  const l = [];
  for (const [m, x] of r) {
    const y = (c = o.get(m)) == null ? void 0 : c.internals.userNode;
    y && l.push({ ...y, position: x.position, dragging: i });
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
function C5({ dragItems: e, snapGrid: r, x: o, y: i }) {
  const l = e.values().next().value;
  if (!l) return null;
  const u = { x: o - l.distance.x, y: i - l.distance.y },
    c = Hs(u, r);
  return { x: c.x - u.x, y: c.y - u.y };
}
function b5({
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
    m = { x: 0, y: 0 },
    x = null,
    y = !1,
    v = null,
    w = !1,
    S = !1,
    _ = null;
  function C({
    noDragClassName: P,
    handleSelector: E,
    domNode: j,
    isSelectable: D,
    nodeId: A,
    nodeClickDistance: R = 0,
  }) {
    v = It(j);
    function H({ x: Y, y: te }) {
      const {
        nodeLookup: L,
        nodeExtent: G,
        snapGrid: B,
        snapToGrid: K,
        nodeOrigin: z,
        onNodeDrag: $,
        onSelectionDrag: U,
        onError: M,
        updateNodePositions: I,
      } = r();
      u = { x: Y, y: te };
      let ne = !1;
      const ie = f.size > 1,
        F = ie && G ? Ic(Fs(f)) : null,
        Z = ie && K ? C5({ dragItems: f, snapGrid: B, x: Y, y: te }) : null;
      for (const [re, Q] of f) {
        if (!L.has(re)) continue;
        let oe = { x: Y - Q.distance.x, y: te - Q.distance.y };
        K &&
          (oe = Z
            ? { x: Math.round(oe.x + Z.x), y: Math.round(oe.y + Z.y) }
            : Hs(oe, B));
        let fe = null;
        if (ie && G && !Q.extent && F) {
          const { positionAbsolute: ve } = Q.internals,
            Ee = ve.x - F.x + G[0][0],
            de = ve.x + Q.measured.width - F.x2 + G[1][0],
            le = ve.y - F.y + G[0][1],
            ge = ve.y + Q.measured.height - F.y2 + G[1][1];
          fe = [
            [Ee, le],
            [de, ge],
          ];
        }
        const { position: me, positionAbsolute: ye } = x0({
          nodeId: re,
          nextPosition: oe,
          nodeLookup: L,
          nodeExtent: fe || G,
          nodeOrigin: z,
          onError: M,
        });
        ((ne = ne || Q.position.x !== me.x || Q.position.y !== me.y),
          (Q.position = me),
          (Q.internals.positionAbsolute = ye));
      }
      if (((S = S || ne), !!ne && (I(f, !0), _ && (i || $ || (!A && U))))) {
        const [re, Q] = sc({ nodeId: A, dragItems: f, nodeLookup: L });
        (i == null || i(_, f, re, Q),
          $ == null || $(_, re, Q),
          A || U == null || U(_, Q));
      }
    }
    async function V() {
      if (!x) return;
      const {
        transform: Y,
        panBy: te,
        autoPanSpeed: L,
        autoPanOnNodeDrag: G,
      } = r();
      if (!G) {
        ((h = !1), cancelAnimationFrame(c));
        return;
      }
      const [B, K] = S0(m, x, L);
      ((B !== 0 || K !== 0) &&
        ((u.x = (u.x ?? 0) - B / Y[2]),
        (u.y = (u.y ?? 0) - K / Y[2]),
        (await te({ x: B, y: K })) && H(u)),
        (c = requestAnimationFrame(V)));
    }
    function se(Y) {
      var ie;
      const {
        nodeLookup: te,
        multiSelectionActive: L,
        nodesDraggable: G,
        transform: B,
        snapGrid: K,
        snapToGrid: z,
        selectNodesOnDrag: $,
        onNodeDragStart: U,
        onSelectionDragStart: M,
        unselectNodesAndEdges: I,
      } = r();
      ((y = !0),
        (!$ || !D) &&
          !L &&
          A &&
          (((ie = te.get(A)) != null && ie.selected) || I()),
        D && $ && A && (e == null || e(A)));
      const ne = xs(Y.sourceEvent, {
        transform: B,
        snapGrid: K,
        snapToGrid: z,
        containerBounds: x,
      });
      if (
        ((u = ne), (f = N5(te, G, ne, A)), f.size > 0 && (o || U || (!A && M)))
      ) {
        const [F, Z] = sc({ nodeId: A, dragItems: f, nodeLookup: te });
        (o == null || o(Y.sourceEvent, f, F, Z),
          U == null || U(Y.sourceEvent, F, Z),
          A || M == null || M(Y.sourceEvent, Z));
      }
    }
    const X = Zm()
      .clickDistance(R)
      .on("start", (Y) => {
        const {
          domNode: te,
          nodeDragThreshold: L,
          transform: G,
          snapGrid: B,
          snapToGrid: K,
        } = r();
        ((x = (te == null ? void 0 : te.getBoundingClientRect()) || null),
          (w = !1),
          (S = !1),
          (_ = Y.sourceEvent),
          L === 0 && se(Y),
          (u = xs(Y.sourceEvent, {
            transform: G,
            snapGrid: B,
            snapToGrid: K,
            containerBounds: x,
          })),
          (m = qt(Y.sourceEvent, x)));
      })
      .on("drag", (Y) => {
        const {
            autoPanOnNodeDrag: te,
            transform: L,
            snapGrid: G,
            snapToGrid: B,
            nodeDragThreshold: K,
            nodeLookup: z,
          } = r(),
          $ = xs(Y.sourceEvent, {
            transform: L,
            snapGrid: G,
            snapToGrid: B,
            containerBounds: x,
          });
        if (
          ((_ = Y.sourceEvent),
          ((Y.sourceEvent.type === "touchmove" &&
            Y.sourceEvent.touches.length > 1) ||
            (A && !z.has(A))) &&
            (w = !0),
          !w)
        ) {
          if ((!h && te && y && ((h = !0), V()), !y)) {
            const U = qt(Y.sourceEvent, x),
              M = U.x - m.x,
              I = U.y - m.y;
            Math.sqrt(M * M + I * I) > K && se(Y);
          }
          (u.x !== $.xSnapped || u.y !== $.ySnapped) &&
            f &&
            y &&
            ((m = qt(Y.sourceEvent, x)), H($));
        }
      })
      .on("end", (Y) => {
        if (
          !(!y || w) &&
          ((h = !1), (y = !1), cancelAnimationFrame(c), f.size > 0)
        ) {
          const {
            nodeLookup: te,
            updateNodePositions: L,
            onNodeDragStop: G,
            onSelectionDragStop: B,
          } = r();
          if ((S && (L(f, !1), (S = !1)), l || G || (!A && B))) {
            const [K, z] = sc({
              nodeId: A,
              dragItems: f,
              nodeLookup: te,
              dragging: !1,
            });
            (l == null || l(Y.sourceEvent, f, K, z),
              G == null || G(Y.sourceEvent, K, z),
              A || B == null || B(Y.sourceEvent, z));
          }
        }
      })
      .filter((Y) => {
        const te = Y.target;
        return !Y.button && (!P || !Mp(te, `.${P}`, j)) && (!E || Mp(te, E, j));
      });
    v.call(X);
  }
  function b() {
    v == null || v.on(".drag", null);
  }
  return { update: C, destroy: b };
}
function _5(e, r, o) {
  const i = [],
    l = { x: e.x - o, y: e.y - o, width: o * 2, height: o * 2 };
  for (const u of r.values()) Ps(l, ho(u)) > 0 && i.push(u);
  return i;
}
const j5 = 250;
function I5(e, r, o, i) {
  var f, h;
  let l = [],
    u = 1 / 0;
  const c = _5(e, o, r + j5);
  for (const m of c) {
    const x = [
      ...(((f = m.internals.handleBounds) == null ? void 0 : f.source) ?? []),
      ...(((h = m.internals.handleBounds) == null ? void 0 : h.target) ?? []),
    ];
    for (const y of x) {
      if (i.nodeId === y.nodeId && i.type === y.type && i.id === y.id) continue;
      const { x: v, y: w } = Nr(m, y, y.position, !0),
        S = Math.sqrt(Math.pow(v - e.x, 2) + Math.pow(w - e.y, 2));
      S > r ||
        (S < u
          ? ((l = [{ ...y, x: v, y: w }]), (u = S))
          : S === u && l.push({ ...y, x: v, y: w }));
    }
  }
  if (!l.length) return null;
  if (l.length > 1) {
    const m = i.type === "source" ? "target" : "source";
    return l.find((x) => x.type === m) ?? l[0];
  }
  return l[0];
}
function $0(e, r, o, i, l, u = !1) {
  var m, x, y;
  const c = i.get(e);
  if (!c) return null;
  const f =
      l === "strict"
        ? (m = c.internals.handleBounds) == null
          ? void 0
          : m[r]
        : [
            ...(((x = c.internals.handleBounds) == null ? void 0 : x.source) ??
              []),
            ...(((y = c.internals.handleBounds) == null ? void 0 : y.target) ??
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
  return h && u ? { ...h, ...Nr(c, h, h.position, !0) } : h;
}
function D0(e, r) {
  return (
    e ||
    (r != null && r.classList.contains("target")
      ? "target"
      : r != null && r.classList.contains("source")
        ? "source"
        : null)
  );
}
function M5(e, r) {
  let o = null;
  return (r ? (o = !0) : e && !r && (o = !1), o);
}
const O0 = () => !0;
function P5(
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
    lib: m,
    autoPanOnConnect: x,
    flowId: y,
    panBy: v,
    cancelConnection: w,
    onConnectStart: S,
    onConnect: _,
    onConnectEnd: C,
    isValidConnection: b = O0,
    onReconnectEnd: P,
    updateConnection: E,
    getTransform: j,
    getFromHandle: D,
    autoPanSpeed: A,
    dragThreshold: R = 1,
    handleDomNode: H,
  }
) {
  const V = C0(e.target);
  let se = 0,
    X;
  const { x: Y, y: te } = qt(e),
    L = D0(u, H),
    G = f == null ? void 0 : f.getBoundingClientRect();
  let B = !1;
  if (!G || !L) return;
  const K = $0(l, L, i, h, r);
  if (!K) return;
  let z = qt(e, G),
    $ = !1,
    U = null,
    M = !1,
    I = null;
  function ne() {
    if (!x || !G) return;
    const [me, ye] = S0(z, G, A);
    (v({ x: me, y: ye }), (se = requestAnimationFrame(ne)));
  }
  const ie = { ...K, nodeId: l, type: L, position: K.position },
    F = h.get(l);
  let re = {
    inProgress: !0,
    isValid: null,
    from: Nr(F, ie, be.Left, !0),
    fromHandle: ie,
    fromPosition: ie.position,
    fromNode: F,
    to: z,
    toHandle: null,
    toPosition: vp[ie.position],
    toNode: null,
    pointer: z,
  };
  function Q() {
    ((B = !0),
      E(re),
      S == null || S(e, { nodeId: l, handleId: i, handleType: L }));
  }
  R === 0 && Q();
  function oe(me) {
    if (!B) {
      const { x: ge, y: ae } = qt(me),
        Ne = ge - Y,
        Me = ae - te;
      if (!(Ne * Ne + Me * Me > R * R)) return;
      Q();
    }
    if (!D() || !ie) {
      fe(me);
      return;
    }
    const ye = j();
    ((z = qt(me, G)),
      (X = I5(Bs(z, ye, !1, [1, 1]), o, h, ie)),
      $ || (ne(), ($ = !0)));
    const ve = F0(me, {
      handle: X,
      connectionMode: r,
      fromNodeId: l,
      fromHandleId: i,
      fromType: c ? "target" : "source",
      isValidConnection: b,
      doc: V,
      lib: m,
      flowId: y,
      nodeLookup: h,
    });
    ((I = ve.handleDomNode), (U = ve.connection), (M = M5(!!X, ve.isValid)));
    const Ee = h.get(l),
      de = Ee ? Nr(Ee, ie, be.Left, !0) : re.from,
      le = {
        ...re,
        from: de,
        isValid: M,
        to:
          ve.toHandle && M ? Dl({ x: ve.toHandle.x, y: ve.toHandle.y }, ye) : z,
        toHandle: ve.toHandle,
        toPosition: M && ve.toHandle ? ve.toHandle.position : vp[ie.position],
        toNode: ve.toHandle ? h.get(ve.toHandle.nodeId) : null,
        pointer: z,
      };
    (E(le), (re = le));
  }
  function fe(me) {
    if (!("touches" in me && me.touches.length > 0)) {
      if (B) {
        (X || I) && U && M && (_ == null || _(U));
        const { inProgress: ye, ...ve } = re,
          Ee = { ...ve, toPosition: re.toHandle ? re.toPosition : null };
        (C == null || C(me, Ee), u && (P == null || P(me, Ee)));
      }
      (w(),
        cancelAnimationFrame(se),
        ($ = !1),
        (M = !1),
        (U = null),
        (I = null),
        V.removeEventListener("mousemove", oe),
        V.removeEventListener("mouseup", fe),
        V.removeEventListener("touchmove", oe),
        V.removeEventListener("touchend", fe));
    }
  }
  (V.addEventListener("mousemove", oe),
    V.addEventListener("mouseup", fe),
    V.addEventListener("touchmove", oe),
    V.addEventListener("touchend", fe));
}
function F0(
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
    isValidConnection: m = O0,
    nodeLookup: x,
  }
) {
  const y = u === "target",
    v = r
      ? c.querySelector(
          `.${f}-flow__handle[data-id="${h}-${r == null ? void 0 : r.nodeId}-${r == null ? void 0 : r.id}-${r == null ? void 0 : r.type}"]`
        )
      : null,
    { x: w, y: S } = qt(e),
    _ = c.elementFromPoint(w, S),
    C = _ != null && _.classList.contains(`${f}-flow__handle`) ? _ : v,
    b = { handleDomNode: C, isValid: !1, connection: null, toHandle: null };
  if (C) {
    const P = D0(void 0, C),
      E = C.getAttribute("data-nodeid"),
      j = C.getAttribute("data-handleid"),
      D = C.classList.contains("connectable"),
      A = C.classList.contains("connectableend");
    if (!E || !P) return b;
    const R = {
      source: y ? E : i,
      sourceHandle: y ? j : l,
      target: y ? i : E,
      targetHandle: y ? l : j,
    };
    b.connection = R;
    const V =
      D &&
      A &&
      (o === co.Strict
        ? (y && P === "source") || (!y && P === "target")
        : E !== i || j !== l);
    ((b.isValid = V && m(R)), (b.toHandle = $0(E, P, j, x, o, !0)));
  }
  return b;
}
const Tc = { onPointerDown: P5, isValid: F0 };
function R5({ domNode: e, panZoom: r, getTransform: o, getViewScale: i }) {
  const l = It(e);
  function u({
    translateExtent: f,
    width: h,
    height: m,
    zoomStep: x = 1,
    pannable: y = !0,
    zoomable: v = !0,
    inversePan: w = !1,
  }) {
    const S = (E) => {
      if (E.sourceEvent.type !== "wheel" || !r) return;
      const j = o(),
        D = E.sourceEvent.ctrlKey && Rs() ? 10 : 1,
        A =
          -E.sourceEvent.deltaY *
          (E.sourceEvent.deltaMode === 1
            ? 0.05
            : E.sourceEvent.deltaMode
              ? 1
              : 0.002) *
          x,
        R = j[2] * Math.pow(2, A * D);
      r.scaleTo(R);
    };
    let _ = [0, 0];
    const C = (E) => {
        (E.sourceEvent.type === "mousedown" ||
          E.sourceEvent.type === "touchstart") &&
          (_ = [
            E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
            E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY,
          ]);
      },
      b = (E) => {
        const j = o();
        if (
          (E.sourceEvent.type !== "mousemove" &&
            E.sourceEvent.type !== "touchmove") ||
          !r
        )
          return;
        const D = [
            E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
            E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY,
          ],
          A = [D[0] - _[0], D[1] - _[1]];
        _ = D;
        const R = i() * Math.max(j[2], Math.log(j[2])) * (w ? -1 : 1),
          H = { x: j[0] - A[0] * R, y: j[1] - A[1] * R },
          V = [
            [0, 0],
            [h, m],
          ];
        r.setViewportConstrained({ x: H.x, y: H.y, zoom: j[2] }, V, f);
      },
      P = h0()
        .on("start", C)
        .on("zoom", y ? b : null)
        .on("zoom.wheel", v ? S : null);
    l.call(P, {});
  }
  function c() {
    l.on("zoom", null);
  }
  return { update: u, destroy: c, pointer: Kt };
}
const Gl = (e) => ({ x: e.x, y: e.y, zoom: e.k }),
  ic = ({ x: e, y: r, zoom: o }) => Xl.translate(e, r).scale(o),
  oo = (e, r) => e.target.closest(`.${r}`),
  H0 = (e, r) => r === 2 && Array.isArray(e) && e.includes(2),
  T5 = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2,
  lc = (e, r = 0, o = T5, i = () => {}) => {
    const l = typeof r == "number" && r > 0;
    return (l || i(), l ? e.transition().duration(r).ease(o).on("end", i) : e);
  },
  B0 = (e) => {
    const r = e.ctrlKey && Rs() ? 10 : 1;
    return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) * r;
  };
function L5({
  zoomPanValues: e,
  noWheelClassName: r,
  d3Selection: o,
  d3Zoom: i,
  panOnScrollMode: l,
  panOnScrollSpeed: u,
  zoomOnPinch: c,
  onPanZoomStart: f,
  onPanZoom: h,
  onPanZoomEnd: m,
}) {
  return (x) => {
    if (oo(x, r)) return (x.ctrlKey && x.preventDefault(), !1);
    (x.preventDefault(), x.stopImmediatePropagation());
    const y = o.property("__zoom").k || 1;
    if (x.ctrlKey && c) {
      const C = Kt(x),
        b = B0(x),
        P = y * Math.pow(2, b);
      i.scaleTo(o, P, C, x);
      return;
    }
    const v = x.deltaMode === 1 ? 20 : 1;
    let w = l === wr.Vertical ? 0 : x.deltaX * v,
      S = l === wr.Horizontal ? 0 : x.deltaY * v;
    (!Rs() && x.shiftKey && l !== wr.Vertical && ((w = x.deltaY * v), (S = 0)),
      i.translateBy(o, -(w / y) * u, -(S / y) * u, { internal: !0 }));
    const _ = Gl(o.property("__zoom"));
    (clearTimeout(e.panScrollTimeout),
      e.isPanScrolling
        ? (h == null || h(x, _),
          (e.panScrollTimeout = setTimeout(() => {
            (m == null || m(x, _), (e.isPanScrolling = !1));
          }, 150)))
        : ((e.isPanScrolling = !0), f == null || f(x, _)));
  };
}
function z5({ noWheelClassName: e, preventScrolling: r, d3ZoomHandler: o }) {
  return function (i, l) {
    const u = i.type === "wheel",
      c = !r && u && !i.ctrlKey,
      f = oo(i, e);
    if ((i.ctrlKey && u && f && i.preventDefault(), c || f)) return null;
    (i.preventDefault(), o.call(this, i, l));
  };
}
function A5({ zoomPanValues: e, onDraggingChange: r, onPanZoomStart: o }) {
  return (i) => {
    var u, c, f;
    if ((u = i.sourceEvent) != null && u.internal) return;
    const l = Gl(i.transform);
    ((e.mouseButton = ((c = i.sourceEvent) == null ? void 0 : c.button) || 0),
      (e.isZoomingOrPanning = !0),
      (e.prevViewport = l),
      ((f = i.sourceEvent) == null ? void 0 : f.type) === "mousedown" && r(!0),
      o && (o == null || o(i.sourceEvent, l)));
  };
}
function $5({
  zoomPanValues: e,
  panOnDrag: r,
  onPaneContextMenu: o,
  onTransformChange: i,
  onPanZoom: l,
}) {
  return (u) => {
    var c, f;
    ((e.usedRightMouseButton = !!(o && H0(r, e.mouseButton ?? 0))),
      ((c = u.sourceEvent) != null && c.sync) ||
        i([u.transform.x, u.transform.y, u.transform.k]),
      l &&
        !((f = u.sourceEvent) != null && f.internal) &&
        (l == null || l(u.sourceEvent, Gl(u.transform))));
  };
}
function D5({
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
        H0(r, e.mouseButton ?? 0) &&
        !e.usedRightMouseButton &&
        c.sourceEvent &&
        u(c.sourceEvent),
      (e.usedRightMouseButton = !1),
      i(!1),
      l)
    ) {
      const h = Gl(c.transform);
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
function O5({
  zoomActivationKeyPressed: e,
  zoomOnScroll: r,
  zoomOnPinch: o,
  panOnDrag: i,
  panOnScroll: l,
  zoomOnDoubleClick: u,
  userSelectionActive: c,
  noWheelClassName: f,
  noPanClassName: h,
  lib: m,
  connectionInProgress: x,
}) {
  return (y) => {
    var C;
    const v = e || r,
      w = o && y.ctrlKey,
      S = y.type === "wheel";
    if (
      y.button === 1 &&
      y.type === "mousedown" &&
      (oo(y, `${m}-flow__node`) || oo(y, `${m}-flow__edge`))
    )
      return !0;
    if (
      (!i && !v && !l && !u && !o) ||
      c ||
      (x && !S) ||
      (oo(y, f) && S) ||
      (oo(y, h) && (!S || (l && S && !e))) ||
      (!o && y.ctrlKey && S)
    )
      return !1;
    if (
      !o &&
      y.type === "touchstart" &&
      ((C = y.touches) == null ? void 0 : C.length) > 1
    )
      return (y.preventDefault(), !1);
    if (
      (!v && !l && !w && S) ||
      (!i && (y.type === "mousedown" || y.type === "touchstart")) ||
      (Array.isArray(i) && !i.includes(y.button) && y.type === "mousedown")
    )
      return !1;
    const _ =
      (Array.isArray(i) && i.includes(y.button)) || !y.button || y.button <= 1;
    return (!y.ctrlKey || S) && _;
  };
}
function F5({
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
  const m = {
      isZoomingOrPanning: !1,
      usedRightMouseButton: !1,
      prevViewport: {},
      mouseButton: 0,
      timerId: void 0,
      panScrollTimeout: void 0,
      isPanScrolling: !1,
    },
    x = e.getBoundingClientRect(),
    y = h0().scaleExtent([r, o]).translateExtent(i),
    v = It(e).call(y);
  P(
    { x: l.x, y: l.y, zoom: fo(l.zoom, r, o) },
    [
      [0, 0],
      [x.width, x.height],
    ],
    i
  );
  const w = v.on("wheel.zoom"),
    S = v.on("dblclick.zoom");
  y.wheelDelta(B0);
  function _(X, Y) {
    return v
      ? new Promise((te) => {
          y == null ||
            y
              .interpolate(
                (Y == null ? void 0 : Y.interpolate) === "linear" ? vs : kl
              )
              .transform(
                lc(
                  v,
                  Y == null ? void 0 : Y.duration,
                  Y == null ? void 0 : Y.ease,
                  () => te(!0)
                ),
                X
              );
        })
      : Promise.resolve(!1);
  }
  function C({
    noWheelClassName: X,
    noPanClassName: Y,
    onPaneContextMenu: te,
    userSelectionActive: L,
    panOnScroll: G,
    panOnDrag: B,
    panOnScrollMode: K,
    panOnScrollSpeed: z,
    preventScrolling: $,
    zoomOnPinch: U,
    zoomOnScroll: M,
    zoomOnDoubleClick: I,
    zoomActivationKeyPressed: ne,
    lib: ie,
    onTransformChange: F,
    connectionInProgress: Z,
    paneClickDistance: re,
    selectionOnDrag: Q,
  }) {
    L && !m.isZoomingOrPanning && b();
    const oe = G && !ne && !L;
    y.clickDistance(Q ? 1 / 0 : !Gt(re) || re < 0 ? 0 : re);
    const fe = oe
      ? L5({
          zoomPanValues: m,
          noWheelClassName: X,
          d3Selection: v,
          d3Zoom: y,
          panOnScrollMode: K,
          panOnScrollSpeed: z,
          zoomOnPinch: U,
          onPanZoomStart: c,
          onPanZoom: u,
          onPanZoomEnd: f,
        })
      : z5({ noWheelClassName: X, preventScrolling: $, d3ZoomHandler: w });
    if ((v.on("wheel.zoom", fe, { passive: !1 }), !L)) {
      const ye = A5({
        zoomPanValues: m,
        onDraggingChange: h,
        onPanZoomStart: c,
      });
      y.on("start", ye);
      const ve = $5({
        zoomPanValues: m,
        panOnDrag: B,
        onPaneContextMenu: !!te,
        onPanZoom: u,
        onTransformChange: F,
      });
      y.on("zoom", ve);
      const Ee = D5({
        zoomPanValues: m,
        panOnDrag: B,
        panOnScroll: G,
        onPaneContextMenu: te,
        onPanZoomEnd: f,
        onDraggingChange: h,
      });
      y.on("end", Ee);
    }
    const me = O5({
      zoomActivationKeyPressed: ne,
      panOnDrag: B,
      zoomOnScroll: M,
      panOnScroll: G,
      zoomOnDoubleClick: I,
      zoomOnPinch: U,
      userSelectionActive: L,
      noPanClassName: Y,
      noWheelClassName: X,
      lib: ie,
      connectionInProgress: Z,
    });
    (y.filter(me), I ? v.on("dblclick.zoom", S) : v.on("dblclick.zoom", null));
  }
  function b() {
    y.on("zoom", null);
  }
  async function P(X, Y, te) {
    const L = ic(X),
      G = y == null ? void 0 : y.constrain()(L, Y, te);
    return (G && (await _(G)), new Promise((B) => B(G)));
  }
  async function E(X, Y) {
    const te = ic(X);
    return (await _(te, Y), new Promise((L) => L(te)));
  }
  function j(X) {
    if (v) {
      const Y = ic(X),
        te = v.property("__zoom");
      (te.k !== X.zoom || te.x !== X.x || te.y !== X.y) &&
        (y == null || y.transform(v, Y, null, { sync: !0 }));
    }
  }
  function D() {
    const X = v ? f0(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: X.x, y: X.y, zoom: X.k };
  }
  function A(X, Y) {
    return v
      ? new Promise((te) => {
          y == null ||
            y
              .interpolate(
                (Y == null ? void 0 : Y.interpolate) === "linear" ? vs : kl
              )
              .scaleTo(
                lc(
                  v,
                  Y == null ? void 0 : Y.duration,
                  Y == null ? void 0 : Y.ease,
                  () => te(!0)
                ),
                X
              );
        })
      : Promise.resolve(!1);
  }
  function R(X, Y) {
    return v
      ? new Promise((te) => {
          y == null ||
            y
              .interpolate(
                (Y == null ? void 0 : Y.interpolate) === "linear" ? vs : kl
              )
              .scaleBy(
                lc(
                  v,
                  Y == null ? void 0 : Y.duration,
                  Y == null ? void 0 : Y.ease,
                  () => te(!0)
                ),
                X
              );
        })
      : Promise.resolve(!1);
  }
  function H(X) {
    y == null || y.scaleExtent(X);
  }
  function V(X) {
    y == null || y.translateExtent(X);
  }
  function se(X) {
    const Y = !Gt(X) || X < 0 ? 0 : X;
    y == null || y.clickDistance(Y);
  }
  return {
    update: C,
    destroy: b,
    setViewport: E,
    setViewportConstrained: P,
    getViewport: D,
    scaleTo: A,
    scaleBy: R,
    setScaleExtent: H,
    setTranslateExtent: V,
    syncViewport: j,
    setClickDistance: se,
  };
}
var mo;
(function (e) {
  ((e.Line = "line"), (e.Handle = "handle"));
})(mo || (mo = {}));
function H5({
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
function Pp(e) {
  const r = e.includes("right") || e.includes("left"),
    o = e.includes("bottom") || e.includes("top"),
    i = e.includes("left"),
    l = e.includes("top");
  return { isHorizontal: r, isVertical: o, affectsX: i, affectsY: l };
}
function Xn(e, r) {
  return Math.max(0, r - e);
}
function Kn(e, r) {
  return Math.max(0, e - r);
}
function pl(e, r, o) {
  return Math.max(0, r - e, e - o);
}
function Rp(e, r) {
  return e ? !r : r;
}
function B5(e, r, o, i, l, u, c, f) {
  let { affectsX: h, affectsY: m } = r;
  const { isHorizontal: x, isVertical: y } = r,
    v = x && y,
    { xSnapped: w, ySnapped: S } = o,
    { minWidth: _, maxWidth: C, minHeight: b, maxHeight: P } = i,
    { x: E, y: j, width: D, height: A, aspectRatio: R } = e;
  let H = Math.floor(x ? w - e.pointerX : 0),
    V = Math.floor(y ? S - e.pointerY : 0);
  const se = D + (h ? -H : H),
    X = A + (m ? -V : V),
    Y = -u[0] * D,
    te = -u[1] * A;
  let L = pl(se, _, C),
    G = pl(X, b, P);
  if (c) {
    let z = 0,
      $ = 0;
    (h && H < 0
      ? (z = Xn(E + H + Y, c[0][0]))
      : !h && H > 0 && (z = Kn(E + se + Y, c[1][0])),
      m && V < 0
        ? ($ = Xn(j + V + te, c[0][1]))
        : !m && V > 0 && ($ = Kn(j + X + te, c[1][1])),
      (L = Math.max(L, z)),
      (G = Math.max(G, $)));
  }
  if (f) {
    let z = 0,
      $ = 0;
    (h && H > 0
      ? (z = Kn(E + H, f[0][0]))
      : !h && H < 0 && (z = Xn(E + se, f[1][0])),
      m && V > 0
        ? ($ = Kn(j + V, f[0][1]))
        : !m && V < 0 && ($ = Xn(j + X, f[1][1])),
      (L = Math.max(L, z)),
      (G = Math.max(G, $)));
  }
  if (l) {
    if (x) {
      const z = pl(se / R, b, P) * R;
      if (((L = Math.max(L, z)), c)) {
        let $ = 0;
        ((!h && !m) || (h && !m && v)
          ? ($ = Kn(j + te + se / R, c[1][1]) * R)
          : ($ = Xn(j + te + (h ? H : -H) / R, c[0][1]) * R),
          (L = Math.max(L, $)));
      }
      if (f) {
        let $ = 0;
        ((!h && !m) || (h && !m && v)
          ? ($ = Xn(j + se / R, f[1][1]) * R)
          : ($ = Kn(j + (h ? H : -H) / R, f[0][1]) * R),
          (L = Math.max(L, $)));
      }
    }
    if (y) {
      const z = pl(X * R, _, C) / R;
      if (((G = Math.max(G, z)), c)) {
        let $ = 0;
        ((!h && !m) || (m && !h && v)
          ? ($ = Kn(E + X * R + Y, c[1][0]) / R)
          : ($ = Xn(E + (m ? V : -V) * R + Y, c[0][0]) / R),
          (G = Math.max(G, $)));
      }
      if (f) {
        let $ = 0;
        ((!h && !m) || (m && !h && v)
          ? ($ = Xn(E + X * R, f[1][0]) / R)
          : ($ = Kn(E + (m ? V : -V) * R, f[0][0]) / R),
          (G = Math.max(G, $)));
      }
    }
  }
  ((V = V + (V < 0 ? G : -G)),
    (H = H + (H < 0 ? L : -L)),
    l &&
      (v
        ? se > X * R
          ? (V = (Rp(h, m) ? -H : H) / R)
          : (H = (Rp(h, m) ? -V : V) * R)
        : x
          ? ((V = H / R), (m = h))
          : ((H = V * R), (h = m))));
  const B = h ? E + H : E,
    K = m ? j + V : j;
  return {
    width: D + (h ? -H : H),
    height: A + (m ? -V : V),
    x: u[0] * H * (h ? -1 : 1) + B,
    y: u[1] * V * (m ? -1 : 1) + K,
  };
}
const V0 = { width: 0, height: 0, x: 0, y: 0 },
  V5 = { ...V0, pointerX: 0, pointerY: 0, aspectRatio: 1 };
function W5(e) {
  return [
    [0, 0],
    [e.measured.width, e.measured.height],
  ];
}
function U5(e, r, o) {
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
function Y5({
  domNode: e,
  nodeId: r,
  getStoreItems: o,
  onChange: i,
  onEnd: l,
}) {
  const u = It(e);
  let c = {
    controlDirection: Pp("bottom-right"),
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
    controlPosition: m,
    boundaries: x,
    keepAspectRatio: y,
    resizeDirection: v,
    onResizeStart: w,
    onResize: S,
    onResizeEnd: _,
    shouldResize: C,
  }) {
    let b = { ...V0 },
      P = { ...V5 };
    c = {
      boundaries: x,
      resizeDirection: v,
      keepAspectRatio: y,
      controlDirection: Pp(m),
    };
    let E,
      j = null,
      D = [],
      A,
      R,
      H,
      V = !1;
    const se = Zm()
      .on("start", (X) => {
        const {
          nodeLookup: Y,
          transform: te,
          snapGrid: L,
          snapToGrid: G,
          nodeOrigin: B,
          paneDomNode: K,
        } = o();
        if (((E = Y.get(r)), !E)) return;
        j = (K == null ? void 0 : K.getBoundingClientRect()) ?? null;
        const { xSnapped: z, ySnapped: $ } = xs(X.sourceEvent, {
          transform: te,
          snapGrid: L,
          snapToGrid: G,
          containerBounds: j,
        });
        ((b = {
          width: E.measured.width ?? 0,
          height: E.measured.height ?? 0,
          x: E.position.x ?? 0,
          y: E.position.y ?? 0,
        }),
          (P = {
            ...b,
            pointerX: z,
            pointerY: $,
            aspectRatio: b.width / b.height,
          }),
          (A = void 0),
          E.parentId &&
            (E.extent === "parent" || E.expandParent) &&
            ((A = Y.get(E.parentId)),
            (R = A && E.extent === "parent" ? W5(A) : void 0)),
          (D = []),
          (H = void 0));
        for (const [U, M] of Y)
          if (
            M.parentId === r &&
            (D.push({ id: U, position: { ...M.position }, extent: M.extent }),
            M.extent === "parent" || M.expandParent)
          ) {
            const I = U5(M, E, M.origin ?? B);
            H
              ? (H = [
                  [Math.min(I[0][0], H[0][0]), Math.min(I[0][1], H[0][1])],
                  [Math.max(I[1][0], H[1][0]), Math.max(I[1][1], H[1][1])],
                ])
              : (H = I);
          }
        w == null || w(X, { ...b });
      })
      .on("drag", (X) => {
        const {
            transform: Y,
            snapGrid: te,
            snapToGrid: L,
            nodeOrigin: G,
          } = o(),
          B = xs(X.sourceEvent, {
            transform: Y,
            snapGrid: te,
            snapToGrid: L,
            containerBounds: j,
          }),
          K = [];
        if (!E) return;
        const { x: z, y: $, width: U, height: M } = b,
          I = {},
          ne = E.origin ?? G,
          {
            width: ie,
            height: F,
            x: Z,
            y: re,
          } = B5(
            P,
            c.controlDirection,
            B,
            c.boundaries,
            c.keepAspectRatio,
            ne,
            R,
            H
          ),
          Q = ie !== U,
          oe = F !== M,
          fe = Z !== z && Q,
          me = re !== $ && oe;
        if (!fe && !me && !Q && !oe) return;
        if (
          (fe || me || ne[0] === 1 || ne[1] === 1) &&
          ((I.x = fe ? Z : b.x),
          (I.y = me ? re : b.y),
          (b.x = I.x),
          (b.y = I.y),
          D.length > 0)
        ) {
          const de = Z - z,
            le = re - $;
          for (const ge of D)
            ((ge.position = {
              x: ge.position.x - de + ne[0] * (ie - U),
              y: ge.position.y - le + ne[1] * (F - M),
            }),
              K.push(ge));
        }
        if (
          ((Q || oe) &&
            ((I.width =
              Q && (!c.resizeDirection || c.resizeDirection === "horizontal")
                ? ie
                : b.width),
            (I.height =
              oe && (!c.resizeDirection || c.resizeDirection === "vertical")
                ? F
                : b.height),
            (b.width = I.width),
            (b.height = I.height)),
          A && E.expandParent)
        ) {
          const de = ne[0] * (I.width ?? 0);
          I.x && I.x < de && ((b.x = de), (P.x = P.x - (I.x - de)));
          const le = ne[1] * (I.height ?? 0);
          I.y && I.y < le && ((b.y = le), (P.y = P.y - (I.y - le)));
        }
        const ye = H5({
            width: b.width,
            prevWidth: U,
            height: b.height,
            prevHeight: M,
            affectsX: c.controlDirection.affectsX,
            affectsY: c.controlDirection.affectsY,
          }),
          ve = { ...b, direction: ye };
        (C == null ? void 0 : C(X, ve)) !== !1 &&
          ((V = !0), S == null || S(X, ve), i(I, K));
      })
      .on("end", (X) => {
        V && (_ == null || _(X, { ...b }), l == null || l({ ...b }), (V = !1));
      });
    u.call(se);
  }
  function h() {
    u.on(".drag", null);
  }
  return { update: f, destroy: h };
}
var ac = { exports: {} },
  uc = {},
  cc = { exports: {} },
  dc = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Tp;
function X5() {
  if (Tp) return dc;
  Tp = 1;
  var e = Ls();
  function r(y, v) {
    return (y === v && (y !== 0 || 1 / y === 1 / v)) || (y !== y && v !== v);
  }
  var o = typeof Object.is == "function" ? Object.is : r,
    i = e.useState,
    l = e.useEffect,
    u = e.useLayoutEffect,
    c = e.useDebugValue;
  function f(y, v) {
    var w = v(),
      S = i({ inst: { value: w, getSnapshot: v } }),
      _ = S[0].inst,
      C = S[1];
    return (
      u(
        function () {
          ((_.value = w), (_.getSnapshot = v), h(_) && C({ inst: _ }));
        },
        [y, w, v]
      ),
      l(
        function () {
          return (
            h(_) && C({ inst: _ }),
            y(function () {
              h(_) && C({ inst: _ });
            })
          );
        },
        [y]
      ),
      c(w),
      w
    );
  }
  function h(y) {
    var v = y.getSnapshot;
    y = y.value;
    try {
      var w = v();
      return !o(y, w);
    } catch {
      return !0;
    }
  }
  function m(y, v) {
    return v();
  }
  var x =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? m
      : f;
  return (
    (dc.useSyncExternalStore =
      e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : x),
    dc
  );
}
var Lp;
function K5() {
  return (Lp || ((Lp = 1), (cc.exports = X5())), cc.exports);
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zp;
function Q5() {
  if (zp) return uc;
  zp = 1;
  var e = Ls(),
    r = K5();
  function o(m, x) {
    return (m === x && (m !== 0 || 1 / m === 1 / x)) || (m !== m && x !== x);
  }
  var i = typeof Object.is == "function" ? Object.is : o,
    l = r.useSyncExternalStore,
    u = e.useRef,
    c = e.useEffect,
    f = e.useMemo,
    h = e.useDebugValue;
  return (
    (uc.useSyncExternalStoreWithSelector = function (m, x, y, v, w) {
      var S = u(null);
      if (S.current === null) {
        var _ = { hasValue: !1, value: null };
        S.current = _;
      } else _ = S.current;
      S = f(
        function () {
          function b(A) {
            if (!P) {
              if (((P = !0), (E = A), (A = v(A)), w !== void 0 && _.hasValue)) {
                var R = _.value;
                if (w(R, A)) return (j = R);
              }
              return (j = A);
            }
            if (((R = j), i(E, A))) return R;
            var H = v(A);
            return w !== void 0 && w(R, H) ? ((E = A), R) : ((E = A), (j = H));
          }
          var P = !1,
            E,
            j,
            D = y === void 0 ? null : y;
          return [
            function () {
              return b(x());
            },
            D === null
              ? void 0
              : function () {
                  return b(D());
                },
          ];
        },
        [x, y, v, w]
      );
      var C = l(m, S[0], S[1]);
      return (
        c(
          function () {
            ((_.hasValue = !0), (_.value = C));
          },
          [C]
        ),
        h(C),
        C
      );
    }),
    uc
  );
}
var Ap;
function G5() {
  return (Ap || ((Ap = 1), (ac.exports = Q5())), ac.exports);
}
var q5 = G5();
const Z5 = $c(q5),
  J5 = {},
  $p = (e) => {
    let r;
    const o = new Set(),
      i = (x, y) => {
        const v = typeof x == "function" ? x(r) : x;
        if (!Object.is(v, r)) {
          const w = r;
          ((r =
            (y ?? (typeof v != "object" || v === null))
              ? v
              : Object.assign({}, r, v)),
            o.forEach((S) => S(r, w)));
        }
      },
      l = () => r,
      h = {
        setState: i,
        getState: l,
        getInitialState: () => m,
        subscribe: (x) => (o.add(x), () => o.delete(x)),
        destroy: () => {
          ((J5 ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
            ),
            o.clear());
        },
      },
      m = (r = e(i, l, h));
    return h;
  },
  eE = (e) => (e ? $p(e) : $p),
  { useDebugValue: tE } = ro,
  { useSyncExternalStoreWithSelector: nE } = Z5,
  rE = (e) => e;
function W0(e, r = rE, o) {
  const i = nE(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    r,
    o
  );
  return (tE(i), i);
}
const Dp = (e, r) => {
    const o = eE(e),
      i = (l, u = r) => W0(o, l, u);
    return (Object.assign(i, o), i);
  },
  oE = (e, r) => (e ? Dp(e, r) : Dp);
function Ve(e, r) {
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
const ql = k.createContext(null),
  sE = ql.Provider,
  U0 = an.error001();
function Re(e, r) {
  const o = k.useContext(ql);
  if (o === null) throw new Error(U0);
  return W0(o, e, r);
}
function We() {
  const e = k.useContext(ql);
  if (e === null) throw new Error(U0);
  return k.useMemo(
    () => ({
      getState: e.getState,
      setState: e.setState,
      subscribe: e.subscribe,
    }),
    [e]
  );
}
const Op = { display: "none" },
  iE = {
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
  Y0 = "react-flow__node-desc",
  X0 = "react-flow__edge-desc",
  lE = "react-flow__aria-live",
  aE = (e) => e.ariaLiveMessage,
  uE = (e) => e.ariaLabelConfig;
function cE({ rfId: e }) {
  const r = Re(aE);
  return p.jsx("div", {
    id: `${lE}-${e}`,
    "aria-live": "assertive",
    "aria-atomic": "true",
    style: iE,
    children: r,
  });
}
function dE({ rfId: e, disableKeyboardA11y: r }) {
  const o = Re(uE);
  return p.jsxs(p.Fragment, {
    children: [
      p.jsx("div", {
        id: `${Y0}-${e}`,
        style: Op,
        children: r
          ? o["node.a11yDescription.default"]
          : o["node.a11yDescription.keyboardDisabled"],
      }),
      p.jsx("div", {
        id: `${X0}-${e}`,
        style: Op,
        children: o["edge.a11yDescription.default"],
      }),
      !r && p.jsx(cE, { rfId: e }),
    ],
  });
}
const Zl = k.forwardRef(
  (
    { position: e = "top-left", children: r, className: o, style: i, ...l },
    u
  ) => {
    const c = `${e}`.split("-");
    return p.jsx("div", {
      className: Je(["react-flow__panel", o, ...c]),
      style: i,
      ref: u,
      ...l,
      children: r,
    });
  }
);
Zl.displayName = "Panel";
function fE({ proOptions: e, position: r = "bottom-right" }) {
  return e != null && e.hideAttribution
    ? null
    : p.jsx(Zl, {
        position: r,
        className: "react-flow__attribution",
        "data-message":
          "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev",
        children: p.jsx("a", {
          href: "https://reactflow.dev",
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "React Flow attribution",
          children: "React Flow",
        }),
      });
}
const hE = (e) => {
    const r = [],
      o = [];
    for (const [, i] of e.nodeLookup)
      i.selected && r.push(i.internals.userNode);
    for (const [, i] of e.edgeLookup) i.selected && o.push(i);
    return { selectedNodes: r, selectedEdges: o };
  },
  ml = (e) => e.id;
function pE(e, r) {
  return (
    Ve(e.selectedNodes.map(ml), r.selectedNodes.map(ml)) &&
    Ve(e.selectedEdges.map(ml), r.selectedEdges.map(ml))
  );
}
function mE({ onSelectionChange: e }) {
  const r = We(),
    { selectedNodes: o, selectedEdges: i } = Re(hE, pE);
  return (
    k.useEffect(() => {
      const l = { nodes: o, edges: i };
      (e == null || e(l),
        r.getState().onSelectionChangeHandlers.forEach((u) => u(l)));
    }, [o, i, e]),
    null
  );
}
const gE = (e) => !!e.onSelectionChangeHandlers;
function yE({ onSelectionChange: e }) {
  const r = Re(gE);
  return e || r ? p.jsx(mE, { onSelectionChange: e }) : null;
}
const K0 = [0, 0],
  vE = { x: 0, y: 0, zoom: 1 },
  xE = [
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
  Fp = [...xE, "rfId"],
  wE = (e) => ({
    setNodes: e.setNodes,
    setEdges: e.setEdges,
    setMinZoom: e.setMinZoom,
    setMaxZoom: e.setMaxZoom,
    setTranslateExtent: e.setTranslateExtent,
    setNodeExtent: e.setNodeExtent,
    reset: e.reset,
    setDefaultNodesAndEdges: e.setDefaultNodesAndEdges,
  }),
  Hp = {
    translateExtent: Is,
    nodeOrigin: K0,
    minZoom: 0.5,
    maxZoom: 2,
    elementsSelectable: !0,
    noPanClassName: "nopan",
    rfId: "1",
  };
function SE(e) {
  const {
      setNodes: r,
      setEdges: o,
      setMinZoom: i,
      setMaxZoom: l,
      setTranslateExtent: u,
      setNodeExtent: c,
      reset: f,
      setDefaultNodesAndEdges: h,
    } = Re(wE, Ve),
    m = We();
  k.useEffect(
    () => (
      h(e.defaultNodes, e.defaultEdges),
      () => {
        ((x.current = Hp), f());
      }
    ),
    []
  );
  const x = k.useRef(Hp);
  return (
    k.useEffect(
      () => {
        for (const y of Fp) {
          const v = e[y],
            w = x.current[y];
          v !== w &&
            (typeof e[y] > "u" ||
              (y === "nodes"
                ? r(v)
                : y === "edges"
                  ? o(v)
                  : y === "minZoom"
                    ? i(v)
                    : y === "maxZoom"
                      ? l(v)
                      : y === "translateExtent"
                        ? u(v)
                        : y === "nodeExtent"
                          ? c(v)
                          : y === "ariaLabelConfig"
                            ? m.setState({ ariaLabelConfig: s5(v) })
                            : y === "fitView"
                              ? m.setState({ fitViewQueued: v })
                              : y === "fitViewOptions"
                                ? m.setState({ fitViewOptions: v })
                                : m.setState({ [y]: v })));
        }
        x.current = e;
      },
      Fp.map((y) => e[y])
    ),
    null
  );
}
function Bp() {
  return typeof window > "u" || !window.matchMedia
    ? null
    : window.matchMedia("(prefers-color-scheme: dark)");
}
function EE(e) {
  var i;
  const [r, o] = k.useState(e === "system" ? null : e);
  return (
    k.useEffect(() => {
      if (e !== "system") {
        o(e);
        return;
      }
      const l = Bp(),
        u = () => o(l != null && l.matches ? "dark" : "light");
      return (
        u(),
        l == null || l.addEventListener("change", u),
        () => {
          l == null || l.removeEventListener("change", u);
        }
      );
    }, [e]),
    r !== null ? r : (i = Bp()) != null && i.matches ? "dark" : "light"
  );
}
const Vp = typeof document < "u" ? document : null;
function Ts(e = null, r = { target: Vp, actInsideInputWithModifier: !0 }) {
  const [o, i] = k.useState(!1),
    l = k.useRef(!1),
    u = k.useRef(new Set([])),
    [c, f] = k.useMemo(() => {
      if (e !== null) {
        const m = (Array.isArray(e) ? e : [e])
            .filter((y) => typeof y == "string")
            .map((y) =>
              y
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
          x = m.reduce((y, v) => y.concat(...v), []);
        return [m, x];
      }
      return [[], []];
    }, [e]);
  return (
    k.useEffect(() => {
      const h = (r == null ? void 0 : r.target) ?? Vp,
        m = (r == null ? void 0 : r.actInsideInputWithModifier) ?? !0;
      if (e !== null) {
        const x = (w) => {
            var C, b;
            if (
              ((l.current = w.ctrlKey || w.metaKey || w.shiftKey || w.altKey),
              (!l.current || (l.current && !m)) && b0(w))
            )
              return !1;
            const _ = Up(w.code, f);
            if ((u.current.add(w[_]), Wp(c, u.current, !1))) {
              const P =
                  ((b = (C = w.composedPath) == null ? void 0 : C.call(w)) ==
                  null
                    ? void 0
                    : b[0]) || w.target,
                E =
                  (P == null ? void 0 : P.nodeName) === "BUTTON" ||
                  (P == null ? void 0 : P.nodeName) === "A";
              (r.preventDefault !== !1 &&
                (l.current || !E) &&
                w.preventDefault(),
                i(!0));
            }
          },
          y = (w) => {
            const S = Up(w.code, f);
            (Wp(c, u.current, !0)
              ? (i(!1), u.current.clear())
              : u.current.delete(w[S]),
              w.key === "Meta" && u.current.clear(),
              (l.current = !1));
          },
          v = () => {
            (u.current.clear(), i(!1));
          };
        return (
          h == null || h.addEventListener("keydown", x),
          h == null || h.addEventListener("keyup", y),
          window.addEventListener("blur", v),
          window.addEventListener("contextmenu", v),
          () => {
            (h == null || h.removeEventListener("keydown", x),
              h == null || h.removeEventListener("keyup", y),
              window.removeEventListener("blur", v),
              window.removeEventListener("contextmenu", v));
          }
        );
      }
    }, [e, i]),
    o
  );
}
function Wp(e, r, o) {
  return e
    .filter((i) => o || i.length === r.size)
    .some((i) => i.every((l) => r.has(l)));
}
function Up(e, r) {
  return r.includes(e) ? "code" : "key";
}
const kE = () => {
  const e = We();
  return k.useMemo(
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
          h = rd(r, i, l, u, c, (o == null ? void 0 : o.padding) ?? 0.1);
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
          m = { x: r.x - f, y: r.y - h },
          x = o.snapGrid ?? l,
          y = o.snapToGrid ?? u;
        return Bs(m, i, y, x);
      },
      flowToScreenPosition: (r) => {
        const { transform: o, domNode: i } = e.getState();
        if (!i) return r;
        const { x: l, y: u } = i.getBoundingClientRect(),
          c = Dl(r, o);
        return { x: c.x + l, y: c.y + u };
      },
    }),
    []
  );
};
function Q0(e, r) {
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
    for (const h of c) NE(h, f);
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
function NE(e, r) {
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
function G0(e, r) {
  return Q0(e, r);
}
function q0(e, r) {
  return Q0(e, r);
}
function gr(e, r) {
  return { id: e, type: "select", selected: r };
}
function so(e, r = new Set(), o = !1) {
  const i = [];
  for (const [l, u] of e) {
    const c = r.has(l);
    !(u.selected === void 0 && !c) &&
      u.selected !== c &&
      (o && (u.selected = c), i.push(gr(u.id, c)));
  }
  return i;
}
function Yp({ items: e = [], lookup: r }) {
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
function Xp(e) {
  return { id: e.id, type: "remove" };
}
const Kp = (e) => QS(e),
  CE = (e) => v0(e);
function Z0(e) {
  return k.forwardRef(e);
}
const bE = typeof window < "u" ? k.useLayoutEffect : k.useEffect;
function Qp(e) {
  const [r, o] = k.useState(BigInt(0)),
    [i] = k.useState(() => _E(() => o((l) => l + BigInt(1))));
  return (
    bE(() => {
      const l = i.get();
      l.length && (e(l), i.reset());
    }, [r]),
    i
  );
}
function _E(e) {
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
const J0 = k.createContext(null);
function jE({ children: e }) {
  const r = We(),
    o = k.useCallback((f) => {
      const {
        nodes: h = [],
        setNodes: m,
        hasDefaultNodes: x,
        onNodesChange: y,
        nodeLookup: v,
        fitViewQueued: w,
        onNodesChangeMiddlewareMap: S,
      } = r.getState();
      let _ = h;
      for (const b of f) _ = typeof b == "function" ? b(_) : b;
      let C = Yp({ items: _, lookup: v });
      for (const b of S.values()) C = b(C);
      (x && m(_),
        C.length > 0
          ? y == null || y(C)
          : w &&
            window.requestAnimationFrame(() => {
              const { fitViewQueued: b, nodes: P, setNodes: E } = r.getState();
              b && E(P);
            }));
    }, []),
    i = Qp(o),
    l = k.useCallback((f) => {
      const {
        edges: h = [],
        setEdges: m,
        hasDefaultEdges: x,
        onEdgesChange: y,
        edgeLookup: v,
      } = r.getState();
      let w = h;
      for (const S of f) w = typeof S == "function" ? S(w) : S;
      x ? m(w) : y && y(Yp({ items: w, lookup: v }));
    }, []),
    u = Qp(l),
    c = k.useMemo(() => ({ nodeQueue: i, edgeQueue: u }), []);
  return p.jsx(J0.Provider, { value: c, children: e });
}
function IE() {
  const e = k.useContext(J0);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const ME = (e) => !!e.panZoom;
function cd() {
  const e = kE(),
    r = We(),
    o = IE(),
    i = Re(ME),
    l = k.useMemo(() => {
      const u = (y) => r.getState().nodeLookup.get(y),
        c = (y) => {
          o.nodeQueue.push(y);
        },
        f = (y) => {
          o.edgeQueue.push(y);
        },
        h = (y) => {
          var b, P;
          const { nodeLookup: v, nodeOrigin: w } = r.getState(),
            S = Kp(y) ? y : v.get(y.id),
            _ = S.parentId
              ? N0(S.position, S.measured, S.parentId, v, w)
              : S.position,
            C = {
              ...S,
              position: _,
              width: ((b = S.measured) == null ? void 0 : b.width) ?? S.width,
              height:
                ((P = S.measured) == null ? void 0 : P.height) ?? S.height,
            };
          return ho(C);
        },
        m = (y, v, w = { replace: !1 }) => {
          c((S) =>
            S.map((_) => {
              if (_.id === y) {
                const C = typeof v == "function" ? v(_) : v;
                return w.replace && Kp(C) ? C : { ..._, ...C };
              }
              return _;
            })
          );
        },
        x = (y, v, w = { replace: !1 }) => {
          f((S) =>
            S.map((_) => {
              if (_.id === y) {
                const C = typeof v == "function" ? v(_) : v;
                return w.replace && CE(C) ? C : { ..._, ...C };
              }
              return _;
            })
          );
        };
      return {
        getNodes: () => r.getState().nodes.map((y) => ({ ...y })),
        getNode: (y) => {
          var v;
          return (v = u(y)) == null ? void 0 : v.internals.userNode;
        },
        getInternalNode: u,
        getEdges: () => {
          const { edges: y = [] } = r.getState();
          return y.map((v) => ({ ...v }));
        },
        getEdge: (y) => r.getState().edgeLookup.get(y),
        setNodes: c,
        setEdges: f,
        addNodes: (y) => {
          const v = Array.isArray(y) ? y : [y];
          o.nodeQueue.push((w) => [...w, ...v]);
        },
        addEdges: (y) => {
          const v = Array.isArray(y) ? y : [y];
          o.edgeQueue.push((w) => [...w, ...v]);
        },
        toObject: () => {
          const { nodes: y = [], edges: v = [], transform: w } = r.getState(),
            [S, _, C] = w;
          return {
            nodes: y.map((b) => ({ ...b })),
            edges: v.map((b) => ({ ...b })),
            viewport: { x: S, y: _, zoom: C },
          };
        },
        deleteElements: async ({ nodes: y = [], edges: v = [] }) => {
          const {
              nodes: w,
              edges: S,
              onNodesDelete: _,
              onEdgesDelete: C,
              triggerNodeChanges: b,
              triggerEdgeChanges: P,
              onDelete: E,
              onBeforeDelete: j,
            } = r.getState(),
            { nodes: D, edges: A } = await e5({
              nodesToRemove: y,
              edgesToRemove: v,
              nodes: w,
              edges: S,
              onBeforeDelete: j,
            }),
            R = A.length > 0,
            H = D.length > 0;
          if (R) {
            const V = A.map(Xp);
            (C == null || C(A), P(V));
          }
          if (H) {
            const V = D.map(Xp);
            (_ == null || _(D), b(V));
          }
          return (
            (H || R) && (E == null || E({ nodes: D, edges: A })),
            { deletedNodes: D, deletedEdges: A }
          );
        },
        getIntersectingNodes: (y, v = !0, w) => {
          const S = wp(y),
            _ = S ? y : h(y),
            C = w !== void 0;
          return _
            ? (w || r.getState().nodes).filter((b) => {
                const P = r.getState().nodeLookup.get(b.id);
                if (P && !S && (b.id === y.id || !P.internals.positionAbsolute))
                  return !1;
                const E = ho(C ? b : P),
                  j = Ps(E, _);
                return (
                  (v && j > 0) ||
                  j >= E.width * E.height ||
                  j >= _.width * _.height
                );
              })
            : [];
        },
        isNodeIntersecting: (y, v, w = !0) => {
          const _ = wp(y) ? y : h(y);
          if (!_) return !1;
          const C = Ps(_, v);
          return (
            (w && C > 0) || C >= v.width * v.height || C >= _.width * _.height
          );
        },
        updateNode: m,
        updateNodeData: (y, v, w = { replace: !1 }) => {
          m(
            y,
            (S) => {
              const _ = typeof v == "function" ? v(S) : v;
              return w.replace
                ? { ...S, data: _ }
                : { ...S, data: { ...S.data, ..._ } };
            },
            w
          );
        },
        updateEdge: x,
        updateEdgeData: (y, v, w = { replace: !1 }) => {
          x(
            y,
            (S) => {
              const _ = typeof v == "function" ? v(S) : v;
              return w.replace
                ? { ...S, data: _ }
                : { ...S, data: { ...S.data, ..._ } };
            },
            w
          );
        },
        getNodesBounds: (y) => {
          const { nodeLookup: v, nodeOrigin: w } = r.getState();
          return GS(y, { nodeLookup: v, nodeOrigin: w });
        },
        getHandleConnections: ({ type: y, id: v, nodeId: w }) => {
          var S;
          return Array.from(
            ((S = r
              .getState()
              .connectionLookup.get(`${w}-${y}${v ? `-${v}` : ""}`)) == null
              ? void 0
              : S.values()) ?? []
          );
        },
        getNodeConnections: ({ type: y, handleId: v, nodeId: w }) => {
          var S;
          return Array.from(
            ((S = r
              .getState()
              .connectionLookup.get(
                `${w}${y ? (v ? `-${y}-${v}` : `-${y}`) : ""}`
              )) == null
              ? void 0
              : S.values()) ?? []
          );
        },
        fitView: async (y) => {
          const v = r.getState().fitViewResolver ?? o5();
          return (
            r.setState({
              fitViewQueued: !0,
              fitViewOptions: y,
              fitViewResolver: v,
            }),
            o.nodeQueue.push((w) => [...w]),
            v.promise
          );
        },
      };
    }, []);
  return k.useMemo(() => ({ ...l, ...e, viewportInitialized: i }), [i]);
}
const Gp = (e) => e.selected,
  PE = typeof window < "u" ? window : void 0;
function RE({ deleteKeyCode: e, multiSelectionKeyCode: r }) {
  const o = We(),
    { deleteElements: i } = cd(),
    l = Ts(e, { actInsideInputWithModifier: !1 }),
    u = Ts(r, { target: PE });
  (k.useEffect(() => {
    if (l) {
      const { edges: c, nodes: f } = o.getState();
      (i({ nodes: f.filter(Gp), edges: c.filter(Gp) }),
        o.setState({ nodesSelectionActive: !1 }));
    }
  }, [l]),
    k.useEffect(() => {
      o.setState({ multiSelectionActive: u });
    }, [u]));
}
function TE(e) {
  const r = We();
  k.useEffect(() => {
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
      const i = od(e.current);
      ((i.height === 0 || i.width === 0) &&
        ((f = (c = r.getState()).onError) == null ||
          f.call(c, "004", an.error004())),
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
const Jl = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  LE = (e) => ({
    userSelectionActive: e.userSelectionActive,
    lib: e.lib,
    connectionInProgress: e.connection.inProgress,
  });
function zE({
  onPaneContextMenu: e,
  zoomOnScroll: r = !0,
  zoomOnPinch: o = !0,
  panOnScroll: i = !1,
  panOnScrollSpeed: l = 0.5,
  panOnScrollMode: u = wr.Free,
  zoomOnDoubleClick: c = !0,
  panOnDrag: f = !0,
  defaultViewport: h,
  translateExtent: m,
  minZoom: x,
  maxZoom: y,
  zoomActivationKeyCode: v,
  preventScrolling: w = !0,
  children: S,
  noWheelClassName: _,
  noPanClassName: C,
  onViewportChange: b,
  isControlledViewport: P,
  paneClickDistance: E,
  selectionOnDrag: j,
}) {
  const D = We(),
    A = k.useRef(null),
    { userSelectionActive: R, lib: H, connectionInProgress: V } = Re(LE, Ve),
    se = Ts(v),
    X = k.useRef();
  TE(A);
  const Y = k.useCallback(
    (te) => {
      (b == null || b({ x: te[0], y: te[1], zoom: te[2] }),
        P || D.setState({ transform: te }));
    },
    [b, P]
  );
  return (
    k.useEffect(() => {
      if (A.current) {
        X.current = F5({
          domNode: A.current,
          minZoom: x,
          maxZoom: y,
          translateExtent: m,
          viewport: h,
          onDraggingChange: (B) => D.setState({ paneDragging: B }),
          onPanZoomStart: (B, K) => {
            const { onViewportChangeStart: z, onMoveStart: $ } = D.getState();
            ($ == null || $(B, K), z == null || z(K));
          },
          onPanZoom: (B, K) => {
            const { onViewportChange: z, onMove: $ } = D.getState();
            ($ == null || $(B, K), z == null || z(K));
          },
          onPanZoomEnd: (B, K) => {
            const { onViewportChangeEnd: z, onMoveEnd: $ } = D.getState();
            ($ == null || $(B, K), z == null || z(K));
          },
        });
        const { x: te, y: L, zoom: G } = X.current.getViewport();
        return (
          D.setState({
            panZoom: X.current,
            transform: [te, L, G],
            domNode: A.current.closest(".react-flow"),
          }),
          () => {
            var B;
            (B = X.current) == null || B.destroy();
          }
        );
      }
    }, []),
    k.useEffect(() => {
      var te;
      (te = X.current) == null ||
        te.update({
          onPaneContextMenu: e,
          zoomOnScroll: r,
          zoomOnPinch: o,
          panOnScroll: i,
          panOnScrollSpeed: l,
          panOnScrollMode: u,
          zoomOnDoubleClick: c,
          panOnDrag: f,
          zoomActivationKeyPressed: se,
          preventScrolling: w,
          noPanClassName: C,
          userSelectionActive: R,
          noWheelClassName: _,
          lib: H,
          onTransformChange: Y,
          connectionInProgress: V,
          selectionOnDrag: j,
          paneClickDistance: E,
        });
    }, [e, r, o, i, l, u, c, f, se, w, C, R, _, H, Y, V, j, E]),
    p.jsx("div", {
      className: "react-flow__renderer",
      ref: A,
      style: Jl,
      children: S,
    })
  );
}
const AE = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect,
});
function $E() {
  const { userSelectionActive: e, userSelectionRect: r } = Re(AE, Ve);
  return e && r
    ? p.jsx("div", {
        className: "react-flow__selection react-flow__container",
        style: {
          width: r.width,
          height: r.height,
          transform: `translate(${r.x}px, ${r.y}px)`,
        },
      })
    : null;
}
const fc = (e, r) => (o) => {
    o.target === r.current && (e == null || e(o));
  },
  DE = (e) => ({
    userSelectionActive: e.userSelectionActive,
    elementsSelectable: e.elementsSelectable,
    connectionInProgress: e.connection.inProgress,
    dragging: e.paneDragging,
  });
function OE({
  isSelecting: e,
  selectionKeyPressed: r,
  selectionMode: o = Ms.Full,
  panOnDrag: i,
  paneClickDistance: l,
  selectionOnDrag: u,
  onSelectionStart: c,
  onSelectionEnd: f,
  onPaneClick: h,
  onPaneContextMenu: m,
  onPaneScroll: x,
  onPaneMouseEnter: y,
  onPaneMouseMove: v,
  onPaneMouseLeave: w,
  children: S,
}) {
  const _ = We(),
    {
      userSelectionActive: C,
      elementsSelectable: b,
      dragging: P,
      connectionInProgress: E,
    } = Re(DE, Ve),
    j = b && (e || C),
    D = k.useRef(null),
    A = k.useRef(),
    R = k.useRef(new Set()),
    H = k.useRef(new Set()),
    V = k.useRef(!1),
    se = (z) => {
      if (V.current || E) {
        V.current = !1;
        return;
      }
      (h == null || h(z),
        _.getState().resetSelectedElements(),
        _.setState({ nodesSelectionActive: !1 }));
    },
    X = (z) => {
      if (Array.isArray(i) && i != null && i.includes(2)) {
        z.preventDefault();
        return;
      }
      m == null || m(z);
    },
    Y = x ? (z) => x(z) : void 0,
    te = (z) => {
      V.current && (z.stopPropagation(), (V.current = !1));
    },
    L = (z) => {
      var F, Z;
      const { domNode: $ } = _.getState();
      if (
        ((A.current = $ == null ? void 0 : $.getBoundingClientRect()),
        !A.current)
      )
        return;
      const U = z.target === D.current;
      if (
        (!U && !!z.target.closest(".nokey")) ||
        !e ||
        !((u && U) || r) ||
        z.button !== 0 ||
        !z.isPrimary
      )
        return;
      ((Z = (F = z.target) == null ? void 0 : F.setPointerCapture) == null ||
        Z.call(F, z.pointerId),
        (V.current = !1));
      const { x: ne, y: ie } = qt(z.nativeEvent, A.current);
      (_.setState({
        userSelectionRect: {
          width: 0,
          height: 0,
          startX: ne,
          startY: ie,
          x: ne,
          y: ie,
        },
      }),
        U || (z.stopPropagation(), z.preventDefault()));
    },
    G = (z) => {
      const {
        userSelectionRect: $,
        transform: U,
        nodeLookup: M,
        edgeLookup: I,
        connectionLookup: ne,
        triggerNodeChanges: ie,
        triggerEdgeChanges: F,
        defaultEdgeOptions: Z,
        resetSelectedElements: re,
      } = _.getState();
      if (!A.current || !$) return;
      const { x: Q, y: oe } = qt(z.nativeEvent, A.current),
        { startX: fe, startY: me } = $;
      if (!V.current) {
        const le = r ? 0 : l;
        if (Math.hypot(Q - fe, oe - me) <= le) return;
        (re(), c == null || c(z));
      }
      V.current = !0;
      const ye = {
          startX: fe,
          startY: me,
          x: Q < fe ? Q : fe,
          y: oe < me ? oe : me,
          width: Math.abs(Q - fe),
          height: Math.abs(oe - me),
        },
        ve = R.current,
        Ee = H.current;
      ((R.current = new Set(
        nd(M, ye, U, o === Ms.Partial, !0).map((le) => le.id)
      )),
        (H.current = new Set()));
      const de = (Z == null ? void 0 : Z.selectable) ?? !0;
      for (const le of R.current) {
        const ge = ne.get(le);
        if (ge)
          for (const { edgeId: ae } of ge.values()) {
            const Ne = I.get(ae);
            Ne && (Ne.selectable ?? de) && H.current.add(ae);
          }
      }
      if (!Sp(ve, R.current)) {
        const le = so(M, R.current, !0);
        ie(le);
      }
      if (!Sp(Ee, H.current)) {
        const le = so(I, H.current);
        F(le);
      }
      _.setState({
        userSelectionRect: ye,
        userSelectionActive: !0,
        nodesSelectionActive: !1,
      });
    },
    B = (z) => {
      var $, U;
      z.button === 0 &&
        ((U = ($ = z.target) == null ? void 0 : $.releasePointerCapture) ==
          null || U.call($, z.pointerId),
        !C &&
          z.target === D.current &&
          _.getState().userSelectionRect &&
          (se == null || se(z)),
        _.setState({ userSelectionActive: !1, userSelectionRect: null }),
        V.current &&
          (f == null || f(z),
          _.setState({ nodesSelectionActive: R.current.size > 0 })));
    },
    K = i === !0 || (Array.isArray(i) && i.includes(0));
  return p.jsxs("div", {
    className: Je([
      "react-flow__pane",
      { draggable: K, dragging: P, selection: e },
    ]),
    onClick: j ? void 0 : fc(se, D),
    onContextMenu: fc(X, D),
    onWheel: fc(Y, D),
    onPointerEnter: j ? void 0 : y,
    onPointerMove: j ? G : v,
    onPointerUp: j ? B : void 0,
    onPointerDownCapture: j ? L : void 0,
    onClickCapture: j ? te : void 0,
    onPointerLeave: w,
    ref: D,
    style: Jl,
    children: [S, p.jsx($E, {})],
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
    m = f.get(e);
  if (!m) {
    h == null || h("012", an.error012(e));
    return;
  }
  (r.setState({ nodesSelectionActive: !1 }),
    m.selected
      ? (o || (m.selected && c)) &&
        (u({ nodes: [m], edges: [] }),
        requestAnimationFrame(() => {
          var x;
          return (x = i == null ? void 0 : i.current) == null
            ? void 0
            : x.blur();
        }))
      : l([e]));
}
function eg({
  nodeRef: e,
  disabled: r = !1,
  noDragClassName: o,
  handleSelector: i,
  nodeId: l,
  isSelectable: u,
  nodeClickDistance: c,
}) {
  const f = We(),
    [h, m] = k.useState(!1),
    x = k.useRef();
  return (
    k.useEffect(() => {
      x.current = b5({
        getStoreItems: () => f.getState(),
        onNodeMouseDown: (y) => {
          Lc({ id: y, store: f, nodeRef: e });
        },
        onDragStart: () => {
          m(!0);
        },
        onDragStop: () => {
          m(!1);
        },
      });
    }, []),
    k.useEffect(() => {
      var y, v;
      if (r) (y = x.current) == null || y.destroy();
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
            var w;
            (w = x.current) == null || w.destroy();
          }
        );
    }, [o, i, r, u, e, l]),
    h
  );
}
const FE = (e) => (r) =>
  r.selected && (r.draggable || (e && typeof r.draggable > "u"));
function tg() {
  const e = We();
  return k.useCallback((o) => {
    const {
        nodeExtent: i,
        snapToGrid: l,
        snapGrid: u,
        nodesDraggable: c,
        onError: f,
        updateNodePositions: h,
        nodeLookup: m,
        nodeOrigin: x,
      } = e.getState(),
      y = new Map(),
      v = FE(c),
      w = l ? u[0] : 5,
      S = l ? u[1] : 5,
      _ = o.direction.x * w * o.factor,
      C = o.direction.y * S * o.factor;
    for (const [, b] of m) {
      if (!v(b)) continue;
      let P = {
        x: b.internals.positionAbsolute.x + _,
        y: b.internals.positionAbsolute.y + C,
      };
      l && (P = Hs(P, u));
      const { position: E, positionAbsolute: j } = x0({
        nodeId: b.id,
        nextPosition: P,
        nodeLookup: m,
        nodeExtent: i,
        nodeOrigin: x,
        onError: f,
      });
      ((b.position = E), (b.internals.positionAbsolute = j), y.set(b.id, b));
    }
    h(y);
  }, []);
}
const dd = k.createContext(null),
  HE = dd.Provider;
dd.Consumer;
const ng = () => k.useContext(dd),
  BE = (e) => ({
    connectOnClick: e.connectOnClick,
    noPanClassName: e.noPanClassName,
    rfId: e.rfId,
  }),
  VE = (e, r, o) => (i) => {
    const {
        connectionClickStartHandle: l,
        connectionMode: u,
        connection: c,
      } = i,
      { fromHandle: f, toHandle: h, isValid: m } = c,
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
        u === co.Strict
          ? (f == null ? void 0 : f.type) !== o
          : e !== (f == null ? void 0 : f.nodeId) ||
            r !== (f == null ? void 0 : f.id),
      connectionInProcess: !!f,
      clickConnectionInProcess: !!l,
      valid: x && m,
    };
  };
function WE(
  {
    type: e = "source",
    position: r = be.Top,
    isValidConnection: o,
    isConnectable: i = !0,
    isConnectableStart: l = !0,
    isConnectableEnd: u = !0,
    id: c,
    onConnect: f,
    children: h,
    className: m,
    onMouseDown: x,
    onTouchStart: y,
    ...v
  },
  w
) {
  var G, B;
  const S = c || null,
    _ = e === "target",
    C = We(),
    b = ng(),
    { connectOnClick: P, noPanClassName: E, rfId: j } = Re(BE, Ve),
    {
      connectingFrom: D,
      connectingTo: A,
      clickConnecting: R,
      isPossibleEndHandle: H,
      connectionInProcess: V,
      clickConnectionInProcess: se,
      valid: X,
    } = Re(VE(b, S, e), Ve);
  b ||
    (B = (G = C.getState()).onError) == null ||
    B.call(G, "010", an.error010());
  const Y = (K) => {
      const {
          defaultEdgeOptions: z,
          onConnect: $,
          hasDefaultEdges: U,
        } = C.getState(),
        M = { ...z, ...K };
      if (U) {
        const { edges: I, setEdges: ne } = C.getState();
        ne(P0(M, I));
      }
      ($ == null || $(M), f == null || f(M));
    },
    te = (K) => {
      if (!b) return;
      const z = _0(K.nativeEvent);
      if (l && ((z && K.button === 0) || !z)) {
        const $ = C.getState();
        Tc.onPointerDown(K.nativeEvent, {
          handleDomNode: K.currentTarget,
          autoPanOnConnect: $.autoPanOnConnect,
          connectionMode: $.connectionMode,
          connectionRadius: $.connectionRadius,
          domNode: $.domNode,
          nodeLookup: $.nodeLookup,
          lib: $.lib,
          isTarget: _,
          handleId: S,
          nodeId: b,
          flowId: $.rfId,
          panBy: $.panBy,
          cancelConnection: $.cancelConnection,
          onConnectStart: $.onConnectStart,
          onConnectEnd: $.onConnectEnd,
          updateConnection: $.updateConnection,
          onConnect: Y,
          isValidConnection: o || $.isValidConnection,
          getTransform: () => C.getState().transform,
          getFromHandle: () => C.getState().connection.fromHandle,
          autoPanSpeed: $.autoPanSpeed,
          dragThreshold: $.connectionDragThreshold,
        });
      }
      z ? x == null || x(K) : y == null || y(K);
    },
    L = (K) => {
      const {
        onClickConnectStart: z,
        onClickConnectEnd: $,
        connectionClickStartHandle: U,
        connectionMode: M,
        isValidConnection: I,
        lib: ne,
        rfId: ie,
        nodeLookup: F,
        connection: Z,
      } = C.getState();
      if (!b || (!U && !l)) return;
      if (!U) {
        (z == null ||
          z(K.nativeEvent, { nodeId: b, handleId: S, handleType: e }),
          C.setState({
            connectionClickStartHandle: { nodeId: b, type: e, id: S },
          }));
        return;
      }
      const re = C0(K.target),
        Q = o || I,
        { connection: oe, isValid: fe } = Tc.isValid(K.nativeEvent, {
          handle: { nodeId: b, id: S, type: e },
          connectionMode: M,
          fromNodeId: U.nodeId,
          fromHandleId: U.id || null,
          fromType: U.type,
          isValidConnection: Q,
          flowId: ie,
          doc: re,
          lib: ne,
          nodeLookup: F,
        });
      fe && oe && Y(oe);
      const me = structuredClone(Z);
      (delete me.inProgress,
        (me.toPosition = me.toHandle ? me.toHandle.position : null),
        $ == null || $(K, me),
        C.setState({ connectionClickStartHandle: null }));
    };
  return p.jsx("div", {
    "data-handleid": S,
    "data-nodeid": b,
    "data-handlepos": r,
    "data-id": `${j}-${b}-${S}-${e}`,
    className: Je([
      "react-flow__handle",
      `react-flow__handle-${r}`,
      "nodrag",
      E,
      m,
      {
        source: !_,
        target: _,
        connectable: i,
        connectablestart: l,
        connectableend: u,
        clickconnecting: R,
        connectingfrom: D,
        connectingto: A,
        valid: X,
        connectionindicator: i && (!V || H) && (V || se ? u : l),
      },
    ]),
    onMouseDown: te,
    onTouchStart: te,
    onClick: P ? L : void 0,
    ref: w,
    ...v,
    children: h,
  });
}
const go = k.memo(Z0(WE));
function UE({ data: e, isConnectable: r, sourcePosition: o = be.Bottom }) {
  return p.jsxs(p.Fragment, {
    children: [
      e == null ? void 0 : e.label,
      p.jsx(go, { type: "source", position: o, isConnectable: r }),
    ],
  });
}
function YE({
  data: e,
  isConnectable: r,
  targetPosition: o = be.Top,
  sourcePosition: i = be.Bottom,
}) {
  return p.jsxs(p.Fragment, {
    children: [
      p.jsx(go, { type: "target", position: o, isConnectable: r }),
      e == null ? void 0 : e.label,
      p.jsx(go, { type: "source", position: i, isConnectable: r }),
    ],
  });
}
function XE() {
  return null;
}
function KE({ data: e, isConnectable: r, targetPosition: o = be.Top }) {
  return p.jsxs(p.Fragment, {
    children: [
      p.jsx(go, { type: "target", position: o, isConnectable: r }),
      e == null ? void 0 : e.label,
    ],
  });
}
const Ol = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  },
  qp = { input: UE, default: YE, output: KE, group: XE };
function QE(e) {
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
const GE = (e) => {
  const {
    width: r,
    height: o,
    x: i,
    y: l,
  } = Fs(e.nodeLookup, { filter: (u) => !!u.selected });
  return {
    width: Gt(r) ? r : null,
    height: Gt(o) ? o : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${i}px,${l}px)`,
  };
};
function qE({
  onSelectionContextMenu: e,
  noPanClassName: r,
  disableKeyboardA11y: o,
}) {
  const i = We(),
    {
      width: l,
      height: u,
      transformString: c,
      userSelectionActive: f,
    } = Re(GE, Ve),
    h = tg(),
    m = k.useRef(null);
  if (
    (k.useEffect(() => {
      var v;
      o || (v = m.current) == null || v.focus({ preventScroll: !0 });
    }, [o]),
    eg({ nodeRef: m }),
    f || !l || !u)
  )
    return null;
  const x = e
      ? (v) => {
          const w = i.getState().nodes.filter((S) => S.selected);
          e(v, w);
        }
      : void 0,
    y = (v) => {
      Object.prototype.hasOwnProperty.call(Ol, v.key) &&
        (v.preventDefault(),
        h({ direction: Ol[v.key], factor: v.shiftKey ? 4 : 1 }));
    };
  return p.jsx("div", {
    className: Je(["react-flow__nodesselection", "react-flow__container", r]),
    style: { transform: c },
    children: p.jsx("div", {
      ref: m,
      className: "react-flow__nodesselection-rect",
      onContextMenu: x,
      tabIndex: o ? void 0 : -1,
      onKeyDown: o ? void 0 : y,
      style: { width: l, height: u },
    }),
  });
}
const Zp = typeof window < "u" ? window : void 0,
  ZE = (e) => ({
    nodesSelectionActive: e.nodesSelectionActive,
    userSelectionActive: e.userSelectionActive,
  });
function rg({
  children: e,
  onPaneClick: r,
  onPaneMouseEnter: o,
  onPaneMouseMove: i,
  onPaneMouseLeave: l,
  onPaneContextMenu: u,
  onPaneScroll: c,
  paneClickDistance: f,
  deleteKeyCode: h,
  selectionKeyCode: m,
  selectionOnDrag: x,
  selectionMode: y,
  onSelectionStart: v,
  onSelectionEnd: w,
  multiSelectionKeyCode: S,
  panActivationKeyCode: _,
  zoomActivationKeyCode: C,
  elementsSelectable: b,
  zoomOnScroll: P,
  zoomOnPinch: E,
  panOnScroll: j,
  panOnScrollSpeed: D,
  panOnScrollMode: A,
  zoomOnDoubleClick: R,
  panOnDrag: H,
  defaultViewport: V,
  translateExtent: se,
  minZoom: X,
  maxZoom: Y,
  preventScrolling: te,
  onSelectionContextMenu: L,
  noWheelClassName: G,
  noPanClassName: B,
  disableKeyboardA11y: K,
  onViewportChange: z,
  isControlledViewport: $,
}) {
  const { nodesSelectionActive: U, userSelectionActive: M } = Re(ZE, Ve),
    I = Ts(m, { target: Zp }),
    ne = Ts(_, { target: Zp }),
    ie = ne || H,
    F = ne || j,
    Z = x && ie !== !0,
    re = I || M || Z;
  return (
    RE({ deleteKeyCode: h, multiSelectionKeyCode: S }),
    p.jsx(zE, {
      onPaneContextMenu: u,
      elementsSelectable: b,
      zoomOnScroll: P,
      zoomOnPinch: E,
      panOnScroll: F,
      panOnScrollSpeed: D,
      panOnScrollMode: A,
      zoomOnDoubleClick: R,
      panOnDrag: !I && ie,
      defaultViewport: V,
      translateExtent: se,
      minZoom: X,
      maxZoom: Y,
      zoomActivationKeyCode: C,
      preventScrolling: te,
      noWheelClassName: G,
      noPanClassName: B,
      onViewportChange: z,
      isControlledViewport: $,
      paneClickDistance: f,
      selectionOnDrag: Z,
      children: p.jsxs(OE, {
        onSelectionStart: v,
        onSelectionEnd: w,
        onPaneClick: r,
        onPaneMouseEnter: o,
        onPaneMouseMove: i,
        onPaneMouseLeave: l,
        onPaneContextMenu: u,
        onPaneScroll: c,
        panOnDrag: ie,
        isSelecting: !!re,
        selectionMode: y,
        selectionKeyPressed: I,
        paneClickDistance: f,
        selectionOnDrag: Z,
        children: [
          e,
          U &&
            p.jsx(qE, {
              onSelectionContextMenu: L,
              noPanClassName: B,
              disableKeyboardA11y: K,
            }),
        ],
      }),
    })
  );
}
rg.displayName = "FlowRenderer";
const JE = k.memo(rg),
  ek = (e) => (r) =>
    e
      ? nd(
          r.nodeLookup,
          { x: 0, y: 0, width: r.width, height: r.height },
          r.transform,
          !0
        ).map((o) => o.id)
      : Array.from(r.nodeLookup.keys());
function tk(e) {
  return Re(k.useCallback(ek(e), [e]), Ve);
}
const nk = (e) => e.updateNodeInternals;
function rk() {
  const e = Re(nk),
    [r] = k.useState(() =>
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
    k.useEffect(
      () => () => {
        r == null || r.disconnect();
      },
      [r]
    ),
    r
  );
}
function ok({ node: e, nodeType: r, hasDimensions: o, resizeObserver: i }) {
  const l = We(),
    u = k.useRef(null),
    c = k.useRef(null),
    f = k.useRef(e.sourcePosition),
    h = k.useRef(e.targetPosition),
    m = k.useRef(r),
    x = o && !!e.internals.handleBounds;
  return (
    k.useEffect(() => {
      u.current &&
        !e.hidden &&
        (!x || c.current !== u.current) &&
        (c.current && (i == null || i.unobserve(c.current)),
        i == null || i.observe(u.current),
        (c.current = u.current));
    }, [x, e.hidden]),
    k.useEffect(
      () => () => {
        c.current && (i == null || i.unobserve(c.current), (c.current = null));
      },
      []
    ),
    k.useEffect(() => {
      if (u.current) {
        const y = m.current !== r,
          v = f.current !== e.sourcePosition,
          w = h.current !== e.targetPosition;
        (y || v || w) &&
          ((m.current = r),
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
function sk({
  id: e,
  onClick: r,
  onMouseEnter: o,
  onMouseMove: i,
  onMouseLeave: l,
  onContextMenu: u,
  onDoubleClick: c,
  nodesDraggable: f,
  elementsSelectable: h,
  nodesConnectable: m,
  nodesFocusable: x,
  resizeObserver: y,
  noDragClassName: v,
  noPanClassName: w,
  disableKeyboardA11y: S,
  rfId: _,
  nodeTypes: C,
  nodeClickDistance: b,
  onError: P,
}) {
  const {
    node: E,
    internals: j,
    isParent: D,
  } = Re((Q) => {
    const oe = Q.nodeLookup.get(e),
      fe = Q.parentLookup.has(e);
    return { node: oe, internals: oe.internals, isParent: fe };
  }, Ve);
  let A = E.type || "default",
    R = (C == null ? void 0 : C[A]) || qp[A];
  R === void 0 &&
    (P == null || P("003", an.error003(A)),
    (A = "default"),
    (R = (C == null ? void 0 : C.default) || qp.default));
  const H = !!(E.draggable || (f && typeof E.draggable > "u")),
    V = !!(E.selectable || (h && typeof E.selectable > "u")),
    se = !!(E.connectable || (m && typeof E.connectable > "u")),
    X = !!(E.focusable || (x && typeof E.focusable > "u")),
    Y = We(),
    te = k0(E),
    L = ok({ node: E, nodeType: A, hasDimensions: te, resizeObserver: y }),
    G = eg({
      nodeRef: L,
      disabled: E.hidden || !H,
      noDragClassName: v,
      handleSelector: E.dragHandle,
      nodeId: e,
      isSelectable: V,
      nodeClickDistance: b,
    }),
    B = tg();
  if (E.hidden) return null;
  const K = Cn(E),
    z = QE(E),
    $ = V || H || r || o || i || l,
    U = o ? (Q) => o(Q, { ...j.userNode }) : void 0,
    M = i ? (Q) => i(Q, { ...j.userNode }) : void 0,
    I = l ? (Q) => l(Q, { ...j.userNode }) : void 0,
    ne = u ? (Q) => u(Q, { ...j.userNode }) : void 0,
    ie = c ? (Q) => c(Q, { ...j.userNode }) : void 0,
    F = (Q) => {
      const { selectNodesOnDrag: oe, nodeDragThreshold: fe } = Y.getState();
      (V && (!oe || !H || fe > 0) && Lc({ id: e, store: Y, nodeRef: L }),
        r && r(Q, { ...j.userNode }));
    },
    Z = (Q) => {
      if (!(b0(Q.nativeEvent) || S)) {
        if (p0.includes(Q.key) && V) {
          const oe = Q.key === "Escape";
          Lc({ id: e, store: Y, unselect: oe, nodeRef: L });
        } else if (
          H &&
          E.selected &&
          Object.prototype.hasOwnProperty.call(Ol, Q.key)
        ) {
          Q.preventDefault();
          const { ariaLabelConfig: oe } = Y.getState();
          (Y.setState({
            ariaLiveMessage: oe["node.a11yDescription.ariaLiveMessage"]({
              direction: Q.key.replace("Arrow", "").toLowerCase(),
              x: ~~j.positionAbsolute.x,
              y: ~~j.positionAbsolute.y,
            }),
          }),
            B({ direction: Ol[Q.key], factor: Q.shiftKey ? 4 : 1 }));
        }
      }
    },
    re = () => {
      var Ee;
      if (S || !((Ee = L.current) != null && Ee.matches(":focus-visible")))
        return;
      const {
        transform: Q,
        width: oe,
        height: fe,
        autoPanOnNodeFocus: me,
        setCenter: ye,
      } = Y.getState();
      if (!me) return;
      nd(new Map([[e, E]]), { x: 0, y: 0, width: oe, height: fe }, Q, !0)
        .length > 0 ||
        ye(E.position.x + K.width / 2, E.position.y + K.height / 2, {
          zoom: Q[2],
        });
    };
  return p.jsx("div", {
    className: Je([
      "react-flow__node",
      `react-flow__node-${A}`,
      { [w]: H },
      E.className,
      {
        selected: E.selected,
        selectable: V,
        parent: D,
        draggable: H,
        dragging: G,
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
    onMouseEnter: U,
    onMouseMove: M,
    onMouseLeave: I,
    onContextMenu: ne,
    onClick: F,
    onDoubleClick: ie,
    onKeyDown: X ? Z : void 0,
    tabIndex: X ? 0 : void 0,
    onFocus: X ? re : void 0,
    role: E.ariaRole ?? (X ? "group" : void 0),
    "aria-roledescription": "node",
    "aria-describedby": S ? void 0 : `${Y0}-${_}`,
    "aria-label": E.ariaLabel,
    ...E.domAttributes,
    children: p.jsx(HE, {
      value: e,
      children: p.jsx(R, {
        id: e,
        data: E.data,
        type: A,
        positionAbsoluteX: j.positionAbsolute.x,
        positionAbsoluteY: j.positionAbsolute.y,
        selected: E.selected ?? !1,
        selectable: V,
        draggable: H,
        deletable: E.deletable ?? !0,
        isConnectable: se,
        sourcePosition: E.sourcePosition,
        targetPosition: E.targetPosition,
        dragging: G,
        dragHandle: E.dragHandle,
        zIndex: j.z,
        parentId: E.parentId,
        ...K,
      }),
    }),
  });
}
var ik = k.memo(sk);
const lk = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError,
});
function og(e) {
  const {
      nodesDraggable: r,
      nodesConnectable: o,
      nodesFocusable: i,
      elementsSelectable: l,
      onError: u,
    } = Re(lk, Ve),
    c = tk(e.onlyRenderVisibleElements),
    f = rk();
  return p.jsx("div", {
    className: "react-flow__nodes",
    style: Jl,
    children: c.map((h) =>
      p.jsx(
        ik,
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
og.displayName = "NodeRenderer";
const ak = k.memo(og);
function uk(e) {
  return Re(
    k.useCallback(
      (o) => {
        if (!e) return o.edges.map((l) => l.id);
        const i = [];
        if (o.width && o.height)
          for (const l of o.edges) {
            const u = o.nodeLookup.get(l.source),
              c = o.nodeLookup.get(l.target);
            u &&
              c &&
              a5({
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
    Ve
  );
}
const ck = ({ color: e = "none", strokeWidth: r = 1 }) => {
    const o = { strokeWidth: r, ...(e && { stroke: e }) };
    return p.jsx("polyline", {
      className: "arrow",
      style: o,
      strokeLinecap: "round",
      fill: "none",
      strokeLinejoin: "round",
      points: "-5,-4 0,0 -5,4",
    });
  },
  dk = ({ color: e = "none", strokeWidth: r = 1 }) => {
    const o = { strokeWidth: r, ...(e && { stroke: e, fill: e }) };
    return p.jsx("polyline", {
      className: "arrowclosed",
      style: o,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      points: "-5,-4 0,0 -5,4 -5,-4",
    });
  },
  Jp = { [Al.Arrow]: ck, [Al.ArrowClosed]: dk };
function fk(e) {
  const r = We();
  return k.useMemo(() => {
    var l, u;
    return Object.prototype.hasOwnProperty.call(Jp, e)
      ? Jp[e]
      : ((u = (l = r.getState()).onError) == null ||
          u.call(l, "009", an.error009(e)),
        null);
  }, [e]);
}
const hk = ({
    id: e,
    type: r,
    color: o,
    width: i = 12.5,
    height: l = 12.5,
    markerUnits: u = "strokeWidth",
    strokeWidth: c,
    orient: f = "auto-start-reverse",
  }) => {
    const h = fk(r);
    return h
      ? p.jsx("marker", {
          className: "react-flow__arrowhead",
          id: e,
          markerWidth: `${i}`,
          markerHeight: `${l}`,
          viewBox: "-10 -10 20 20",
          markerUnits: u,
          orient: f,
          refX: "0",
          refY: "0",
          children: p.jsx(h, { color: o, strokeWidth: c }),
        })
      : null;
  },
  sg = ({ defaultColor: e, rfId: r }) => {
    const o = Re((u) => u.edges),
      i = Re((u) => u.defaultEdgeOptions),
      l = k.useMemo(
        () =>
          m5(o, {
            id: r,
            defaultColor: e,
            defaultMarkerStart: i == null ? void 0 : i.markerStart,
            defaultMarkerEnd: i == null ? void 0 : i.markerEnd,
          }),
        [o, i, r, e]
      );
    return l.length
      ? p.jsx("svg", {
          className: "react-flow__marker",
          "aria-hidden": "true",
          children: p.jsx("defs", {
            children: l.map((u) =>
              p.jsx(
                hk,
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
sg.displayName = "MarkerDefinitions";
var pk = k.memo(sg);
function ig({
  x: e,
  y: r,
  label: o,
  labelStyle: i,
  labelShowBg: l = !0,
  labelBgStyle: u,
  labelBgPadding: c = [2, 4],
  labelBgBorderRadius: f = 2,
  children: h,
  className: m,
  ...x
}) {
  const [y, v] = k.useState({ x: 1, y: 0, width: 0, height: 0 }),
    w = Je(["react-flow__edge-textwrapper", m]),
    S = k.useRef(null);
  return (
    k.useEffect(() => {
      if (S.current) {
        const _ = S.current.getBBox();
        v({ x: _.x, y: _.y, width: _.width, height: _.height });
      }
    }, [o]),
    o
      ? p.jsxs("g", {
          transform: `translate(${e - y.width / 2} ${r - y.height / 2})`,
          className: w,
          visibility: y.width ? "visible" : "hidden",
          ...x,
          children: [
            l &&
              p.jsx("rect", {
                width: y.width + 2 * c[0],
                x: -c[0],
                y: -c[1],
                height: y.height + 2 * c[1],
                className: "react-flow__edge-textbg",
                style: u,
                rx: f,
                ry: f,
              }),
            p.jsx("text", {
              className: "react-flow__edge-text",
              y: y.height / 2,
              dy: "0.3em",
              ref: S,
              style: i,
              children: o,
            }),
            h,
          ],
        })
      : null
  );
}
ig.displayName = "EdgeText";
const mk = k.memo(ig);
function ea({
  path: e,
  labelX: r,
  labelY: o,
  label: i,
  labelStyle: l,
  labelShowBg: u,
  labelBgStyle: c,
  labelBgPadding: f,
  labelBgBorderRadius: h,
  interactionWidth: m = 20,
  ...x
}) {
  return p.jsxs(p.Fragment, {
    children: [
      p.jsx("path", {
        ...x,
        d: e,
        fill: "none",
        className: Je(["react-flow__edge-path", x.className]),
      }),
      m
        ? p.jsx("path", {
            d: e,
            fill: "none",
            strokeOpacity: 0,
            strokeWidth: m,
            className: "react-flow__edge-interaction",
          })
        : null,
      i && Gt(r) && Gt(o)
        ? p.jsx(mk, {
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
function em({ pos: e, x1: r, y1: o, x2: i, y2: l }) {
  return e === be.Left || e === be.Right
    ? [0.5 * (r + i), o]
    : [r, 0.5 * (o + l)];
}
function lg({
  sourceX: e,
  sourceY: r,
  sourcePosition: o = be.Bottom,
  targetX: i,
  targetY: l,
  targetPosition: u = be.Top,
}) {
  const [c, f] = em({ pos: o, x1: e, y1: r, x2: i, y2: l }),
    [h, m] = em({ pos: u, x1: i, y1: l, x2: e, y2: r }),
    [x, y, v, w] = j0({
      sourceX: e,
      sourceY: r,
      targetX: i,
      targetY: l,
      sourceControlX: c,
      sourceControlY: f,
      targetControlX: h,
      targetControlY: m,
    });
  return [`M${e},${r} C${c},${f} ${h},${m} ${i},${l}`, x, y, v, w];
}
function ag(e) {
  return k.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      sourcePosition: c,
      targetPosition: f,
      label: h,
      labelStyle: m,
      labelShowBg: x,
      labelBgStyle: y,
      labelBgPadding: v,
      labelBgBorderRadius: w,
      style: S,
      markerEnd: _,
      markerStart: C,
      interactionWidth: b,
    }) => {
      const [P, E, j] = lg({
          sourceX: o,
          sourceY: i,
          sourcePosition: c,
          targetX: l,
          targetY: u,
          targetPosition: f,
        }),
        D = e.isInternal ? void 0 : r;
      return p.jsx(ea, {
        id: D,
        path: P,
        labelX: E,
        labelY: j,
        label: h,
        labelStyle: m,
        labelShowBg: x,
        labelBgStyle: y,
        labelBgPadding: v,
        labelBgBorderRadius: w,
        style: S,
        markerEnd: _,
        markerStart: C,
        interactionWidth: b,
      });
    }
  );
}
const gk = ag({ isInternal: !1 }),
  ug = ag({ isInternal: !0 });
gk.displayName = "SimpleBezierEdge";
ug.displayName = "SimpleBezierEdgeInternal";
function cg(e) {
  return k.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      label: c,
      labelStyle: f,
      labelShowBg: h,
      labelBgStyle: m,
      labelBgPadding: x,
      labelBgBorderRadius: y,
      style: v,
      sourcePosition: w = be.Bottom,
      targetPosition: S = be.Top,
      markerEnd: _,
      markerStart: C,
      pathOptions: b,
      interactionWidth: P,
    }) => {
      const [E, j, D] = Mc({
          sourceX: o,
          sourceY: i,
          sourcePosition: w,
          targetX: l,
          targetY: u,
          targetPosition: S,
          borderRadius: b == null ? void 0 : b.borderRadius,
          offset: b == null ? void 0 : b.offset,
          stepPosition: b == null ? void 0 : b.stepPosition,
        }),
        A = e.isInternal ? void 0 : r;
      return p.jsx(ea, {
        id: A,
        path: E,
        labelX: j,
        labelY: D,
        label: c,
        labelStyle: f,
        labelShowBg: h,
        labelBgStyle: m,
        labelBgPadding: x,
        labelBgBorderRadius: y,
        style: v,
        markerEnd: _,
        markerStart: C,
        interactionWidth: P,
      });
    }
  );
}
const dg = cg({ isInternal: !1 }),
  fg = cg({ isInternal: !0 });
dg.displayName = "SmoothStepEdge";
fg.displayName = "SmoothStepEdgeInternal";
function hg(e) {
  return k.memo(({ id: r, ...o }) => {
    var l;
    const i = e.isInternal ? void 0 : r;
    return p.jsx(dg, {
      ...o,
      id: i,
      pathOptions: k.useMemo(() => {
        var u;
        return {
          borderRadius: 0,
          offset: (u = o.pathOptions) == null ? void 0 : u.offset,
        };
      }, [(l = o.pathOptions) == null ? void 0 : l.offset]),
    });
  });
}
const yk = hg({ isInternal: !1 }),
  pg = hg({ isInternal: !0 });
yk.displayName = "StepEdge";
pg.displayName = "StepEdgeInternal";
function mg(e) {
  return k.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      label: c,
      labelStyle: f,
      labelShowBg: h,
      labelBgStyle: m,
      labelBgPadding: x,
      labelBgBorderRadius: y,
      style: v,
      markerEnd: w,
      markerStart: S,
      interactionWidth: _,
    }) => {
      const [C, b, P] = R0({ sourceX: o, sourceY: i, targetX: l, targetY: u }),
        E = e.isInternal ? void 0 : r;
      return p.jsx(ea, {
        id: E,
        path: C,
        labelX: b,
        labelY: P,
        label: c,
        labelStyle: f,
        labelShowBg: h,
        labelBgStyle: m,
        labelBgPadding: x,
        labelBgBorderRadius: y,
        style: v,
        markerEnd: w,
        markerStart: S,
        interactionWidth: _,
      });
    }
  );
}
const vk = mg({ isInternal: !1 }),
  gg = mg({ isInternal: !0 });
vk.displayName = "StraightEdge";
gg.displayName = "StraightEdgeInternal";
function yg(e) {
  return k.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      sourcePosition: c = be.Bottom,
      targetPosition: f = be.Top,
      label: h,
      labelStyle: m,
      labelShowBg: x,
      labelBgStyle: y,
      labelBgPadding: v,
      labelBgBorderRadius: w,
      style: S,
      markerEnd: _,
      markerStart: C,
      pathOptions: b,
      interactionWidth: P,
    }) => {
      const [E, j, D] = I0({
          sourceX: o,
          sourceY: i,
          sourcePosition: c,
          targetX: l,
          targetY: u,
          targetPosition: f,
          curvature: b == null ? void 0 : b.curvature,
        }),
        A = e.isInternal ? void 0 : r;
      return p.jsx(ea, {
        id: A,
        path: E,
        labelX: j,
        labelY: D,
        label: h,
        labelStyle: m,
        labelShowBg: x,
        labelBgStyle: y,
        labelBgPadding: v,
        labelBgBorderRadius: w,
        style: S,
        markerEnd: _,
        markerStart: C,
        interactionWidth: P,
      });
    }
  );
}
const xk = yg({ isInternal: !1 }),
  vg = yg({ isInternal: !0 });
xk.displayName = "BezierEdge";
vg.displayName = "BezierEdgeInternal";
const tm = {
    default: vg,
    straight: gg,
    step: pg,
    smoothstep: fg,
    simplebezier: ug,
  },
  nm = {
    sourceX: null,
    sourceY: null,
    targetX: null,
    targetY: null,
    sourcePosition: null,
    targetPosition: null,
  },
  wk = (e, r, o) => (o === be.Left ? e - r : o === be.Right ? e + r : e),
  Sk = (e, r, o) => (o === be.Top ? e - r : o === be.Bottom ? e + r : e),
  rm = "react-flow__edgeupdater";
function om({
  position: e,
  centerX: r,
  centerY: o,
  radius: i = 10,
  onMouseDown: l,
  onMouseEnter: u,
  onMouseOut: c,
  type: f,
}) {
  return p.jsx("circle", {
    onMouseDown: l,
    onMouseEnter: u,
    onMouseOut: c,
    className: Je([rm, `${rm}-${f}`]),
    cx: wk(r, i, e),
    cy: Sk(o, i, e),
    r: i,
    stroke: "transparent",
    fill: "transparent",
  });
}
function Ek({
  isReconnectable: e,
  reconnectRadius: r,
  edge: o,
  sourceX: i,
  sourceY: l,
  targetX: u,
  targetY: c,
  sourcePosition: f,
  targetPosition: h,
  onReconnect: m,
  onReconnectStart: x,
  onReconnectEnd: y,
  setReconnecting: v,
  setUpdateHover: w,
}) {
  const S = We(),
    _ = (j, D) => {
      if (j.button !== 0) return;
      const {
          autoPanOnConnect: A,
          domNode: R,
          isValidConnection: H,
          connectionMode: V,
          connectionRadius: se,
          lib: X,
          onConnectStart: Y,
          onConnectEnd: te,
          cancelConnection: L,
          nodeLookup: G,
          rfId: B,
          panBy: K,
          updateConnection: z,
        } = S.getState(),
        $ = D.type === "target",
        U = (ne, ie) => {
          (v(!1), y == null || y(ne, o, D.type, ie));
        },
        M = (ne) => (m == null ? void 0 : m(o, ne)),
        I = (ne, ie) => {
          (v(!0), x == null || x(j, o, D.type), Y == null || Y(ne, ie));
        };
      Tc.onPointerDown(j.nativeEvent, {
        autoPanOnConnect: A,
        connectionMode: V,
        connectionRadius: se,
        domNode: R,
        handleId: D.id,
        nodeId: D.nodeId,
        nodeLookup: G,
        isTarget: $,
        edgeUpdaterType: D.type,
        lib: X,
        flowId: B,
        cancelConnection: L,
        panBy: K,
        isValidConnection: H,
        onConnect: M,
        onConnectStart: I,
        onConnectEnd: te,
        onReconnectEnd: U,
        updateConnection: z,
        getTransform: () => S.getState().transform,
        getFromHandle: () => S.getState().connection.fromHandle,
        dragThreshold: S.getState().connectionDragThreshold,
        handleDomNode: j.currentTarget,
      });
    },
    C = (j) =>
      _(j, { nodeId: o.target, id: o.targetHandle ?? null, type: "target" }),
    b = (j) =>
      _(j, { nodeId: o.source, id: o.sourceHandle ?? null, type: "source" }),
    P = () => w(!0),
    E = () => w(!1);
  return p.jsxs(p.Fragment, {
    children: [
      (e === !0 || e === "source") &&
        p.jsx(om, {
          position: f,
          centerX: i,
          centerY: l,
          radius: r,
          onMouseDown: C,
          onMouseEnter: P,
          onMouseOut: E,
          type: "source",
        }),
      (e === !0 || e === "target") &&
        p.jsx(om, {
          position: h,
          centerX: u,
          centerY: c,
          radius: r,
          onMouseDown: b,
          onMouseEnter: P,
          onMouseOut: E,
          type: "target",
        }),
    ],
  });
}
function kk({
  id: e,
  edgesFocusable: r,
  edgesReconnectable: o,
  elementsSelectable: i,
  onClick: l,
  onDoubleClick: u,
  onContextMenu: c,
  onMouseEnter: f,
  onMouseMove: h,
  onMouseLeave: m,
  reconnectRadius: x,
  onReconnect: y,
  onReconnectStart: v,
  onReconnectEnd: w,
  rfId: S,
  edgeTypes: _,
  noPanClassName: C,
  onError: b,
  disableKeyboardA11y: P,
}) {
  let E = Re((ye) => ye.edgeLookup.get(e));
  const j = Re((ye) => ye.defaultEdgeOptions);
  E = j ? { ...j, ...E } : E;
  let D = E.type || "default",
    A = (_ == null ? void 0 : _[D]) || tm[D];
  A === void 0 &&
    (b == null || b("011", an.error011(D)),
    (D = "default"),
    (A = (_ == null ? void 0 : _.default) || tm.default));
  const R = !!(E.focusable || (r && typeof E.focusable > "u")),
    H =
      typeof y < "u" &&
      (E.reconnectable || (o && typeof E.reconnectable > "u")),
    V = !!(E.selectable || (i && typeof E.selectable > "u")),
    se = k.useRef(null),
    [X, Y] = k.useState(!1),
    [te, L] = k.useState(!1),
    G = We(),
    {
      zIndex: B,
      sourceX: K,
      sourceY: z,
      targetX: $,
      targetY: U,
      sourcePosition: M,
      targetPosition: I,
    } = Re(
      k.useCallback(
        (ye) => {
          const ve = ye.nodeLookup.get(E.source),
            Ee = ye.nodeLookup.get(E.target);
          if (!ve || !Ee) return { zIndex: E.zIndex, ...nm };
          const de = p5({
            id: e,
            sourceNode: ve,
            targetNode: Ee,
            sourceHandle: E.sourceHandle || null,
            targetHandle: E.targetHandle || null,
            connectionMode: ye.connectionMode,
            onError: b,
          });
          return {
            zIndex: l5({
              selected: E.selected,
              zIndex: E.zIndex,
              sourceNode: ve,
              targetNode: Ee,
              elevateOnSelect: ye.elevateEdgesOnSelect,
              zIndexMode: ye.zIndexMode,
            }),
            ...(de || nm),
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
      Ve
    ),
    ne = k.useMemo(
      () => (E.markerStart ? `url('#${Pc(E.markerStart, S)}')` : void 0),
      [E.markerStart, S]
    ),
    ie = k.useMemo(
      () => (E.markerEnd ? `url('#${Pc(E.markerEnd, S)}')` : void 0),
      [E.markerEnd, S]
    );
  if (E.hidden || K === null || z === null || $ === null || U === null)
    return null;
  const F = (ye) => {
      var le;
      const {
        addSelectedEdges: ve,
        unselectNodesAndEdges: Ee,
        multiSelectionActive: de,
      } = G.getState();
      (V &&
        (G.setState({ nodesSelectionActive: !1 }),
        E.selected && de
          ? (Ee({ nodes: [], edges: [E] }),
            (le = se.current) == null || le.blur())
          : ve([e])),
        l && l(ye, E));
    },
    Z = u
      ? (ye) => {
          u(ye, { ...E });
        }
      : void 0,
    re = c
      ? (ye) => {
          c(ye, { ...E });
        }
      : void 0,
    Q = f
      ? (ye) => {
          f(ye, { ...E });
        }
      : void 0,
    oe = h
      ? (ye) => {
          h(ye, { ...E });
        }
      : void 0,
    fe = m
      ? (ye) => {
          m(ye, { ...E });
        }
      : void 0,
    me = (ye) => {
      var ve;
      if (!P && p0.includes(ye.key) && V) {
        const { unselectNodesAndEdges: Ee, addSelectedEdges: de } =
          G.getState();
        ye.key === "Escape"
          ? ((ve = se.current) == null || ve.blur(), Ee({ edges: [E] }))
          : de([e]);
      }
    };
  return p.jsx("svg", {
    style: { zIndex: B },
    children: p.jsxs("g", {
      className: Je([
        "react-flow__edge",
        `react-flow__edge-${D}`,
        E.className,
        C,
        {
          selected: E.selected,
          animated: E.animated,
          inactive: !V && !l,
          updating: X,
          selectable: V,
        },
      ]),
      onClick: F,
      onDoubleClick: Z,
      onContextMenu: re,
      onMouseEnter: Q,
      onMouseMove: oe,
      onMouseLeave: fe,
      onKeyDown: R ? me : void 0,
      tabIndex: R ? 0 : void 0,
      role: E.ariaRole ?? (R ? "group" : "img"),
      "aria-roledescription": "edge",
      "data-id": e,
      "data-testid": `rf__edge-${e}`,
      "aria-label":
        E.ariaLabel === null
          ? void 0
          : E.ariaLabel || `Edge from ${E.source} to ${E.target}`,
      "aria-describedby": R ? `${X0}-${S}` : void 0,
      ref: se,
      ...E.domAttributes,
      children: [
        !te &&
          p.jsx(A, {
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
            sourceX: K,
            sourceY: z,
            targetX: $,
            targetY: U,
            sourcePosition: M,
            targetPosition: I,
            data: E.data,
            style: E.style,
            sourceHandleId: E.sourceHandle,
            targetHandleId: E.targetHandle,
            markerStart: ne,
            markerEnd: ie,
            pathOptions: "pathOptions" in E ? E.pathOptions : void 0,
            interactionWidth: E.interactionWidth,
          }),
        H &&
          p.jsx(Ek, {
            edge: E,
            isReconnectable: H,
            reconnectRadius: x,
            onReconnect: y,
            onReconnectStart: v,
            onReconnectEnd: w,
            sourceX: K,
            sourceY: z,
            targetX: $,
            targetY: U,
            sourcePosition: M,
            targetPosition: I,
            setUpdateHover: Y,
            setReconnecting: L,
          }),
      ],
    }),
  });
}
var Nk = k.memo(kk);
const Ck = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError,
});
function xg({
  defaultMarkerColor: e,
  onlyRenderVisibleElements: r,
  rfId: o,
  edgeTypes: i,
  noPanClassName: l,
  onReconnect: u,
  onEdgeContextMenu: c,
  onEdgeMouseEnter: f,
  onEdgeMouseMove: h,
  onEdgeMouseLeave: m,
  onEdgeClick: x,
  reconnectRadius: y,
  onEdgeDoubleClick: v,
  onReconnectStart: w,
  onReconnectEnd: S,
  disableKeyboardA11y: _,
}) {
  const {
      edgesFocusable: C,
      edgesReconnectable: b,
      elementsSelectable: P,
      onError: E,
    } = Re(Ck, Ve),
    j = uk(r);
  return p.jsxs("div", {
    className: "react-flow__edges",
    children: [
      p.jsx(pk, { defaultColor: e, rfId: o }),
      j.map((D) =>
        p.jsx(
          Nk,
          {
            id: D,
            edgesFocusable: C,
            edgesReconnectable: b,
            elementsSelectable: P,
            noPanClassName: l,
            onReconnect: u,
            onContextMenu: c,
            onMouseEnter: f,
            onMouseMove: h,
            onMouseLeave: m,
            onClick: x,
            reconnectRadius: y,
            onDoubleClick: v,
            onReconnectStart: w,
            onReconnectEnd: S,
            rfId: o,
            onError: E,
            edgeTypes: i,
            disableKeyboardA11y: _,
          },
          D
        )
      ),
    ],
  });
}
xg.displayName = "EdgeRenderer";
const bk = k.memo(xg),
  _k = (e) =>
    `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function jk({ children: e }) {
  const r = Re(_k);
  return p.jsx("div", {
    className: "react-flow__viewport xyflow__viewport react-flow__container",
    style: { transform: r },
    children: e,
  });
}
function Ik(e) {
  const r = cd(),
    o = k.useRef(!1);
  k.useEffect(() => {
    !o.current &&
      r.viewportInitialized &&
      e &&
      (setTimeout(() => e(r), 1), (o.current = !0));
  }, [e, r.viewportInitialized]);
}
const Mk = (e) => {
  var r;
  return (r = e.panZoom) == null ? void 0 : r.syncViewport;
};
function Pk(e) {
  const r = Re(Mk),
    o = We();
  return (
    k.useEffect(() => {
      e && (r == null || r(e), o.setState({ transform: [e.x, e.y, e.zoom] }));
    }, [e, r]),
    null
  );
}
function Rk(e) {
  return e.connection.inProgress
    ? { ...e.connection, to: Bs(e.connection.to, e.transform) }
    : { ...e.connection };
}
function Tk(e) {
  return Rk;
}
function Lk(e) {
  const r = Tk();
  return Re(r, Ve);
}
const zk = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height,
});
function Ak({ containerStyle: e, style: r, type: o, component: i }) {
  const {
    nodesConnectable: l,
    width: u,
    height: c,
    isValid: f,
    inProgress: h,
  } = Re(zk, Ve);
  return !(u && l && h)
    ? null
    : p.jsx("svg", {
        style: e,
        width: u,
        height: c,
        className: "react-flow__connectionline react-flow__container",
        children: p.jsx("g", {
          className: Je(["react-flow__connection", y0(f)]),
          children: p.jsx(wg, {
            style: r,
            type: o,
            CustomComponent: i,
            isValid: f,
          }),
        }),
      });
}
const wg = ({
  style: e,
  type: r = Qn.Bezier,
  CustomComponent: o,
  isValid: i,
}) => {
  const {
    inProgress: l,
    from: u,
    fromNode: c,
    fromHandle: f,
    fromPosition: h,
    to: m,
    toNode: x,
    toHandle: y,
    toPosition: v,
    pointer: w,
  } = Lk();
  if (!l) return;
  if (o)
    return p.jsx(o, {
      connectionLineType: r,
      connectionLineStyle: e,
      fromNode: c,
      fromHandle: f,
      fromX: u.x,
      fromY: u.y,
      toX: m.x,
      toY: m.y,
      fromPosition: h,
      toPosition: v,
      connectionStatus: y0(i),
      toNode: x,
      toHandle: y,
      pointer: w,
    });
  let S = "";
  const _ = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: h,
    targetX: m.x,
    targetY: m.y,
    targetPosition: v,
  };
  switch (r) {
    case Qn.Bezier:
      [S] = I0(_);
      break;
    case Qn.SimpleBezier:
      [S] = lg(_);
      break;
    case Qn.Step:
      [S] = Mc({ ..._, borderRadius: 0 });
      break;
    case Qn.SmoothStep:
      [S] = Mc(_);
      break;
    default:
      [S] = R0(_);
  }
  return p.jsx("path", {
    d: S,
    fill: "none",
    className: "react-flow__connection-path",
    style: e,
  });
};
wg.displayName = "ConnectionLine";
const $k = {};
function sm(e = $k) {
  (k.useRef(e), We(), k.useEffect(() => {}, [e]));
}
function Dk() {
  (We(), k.useRef(!1), k.useEffect(() => {}, []));
}
function Sg({
  nodeTypes: e,
  edgeTypes: r,
  onInit: o,
  onNodeClick: i,
  onEdgeClick: l,
  onNodeDoubleClick: u,
  onEdgeDoubleClick: c,
  onNodeMouseEnter: f,
  onNodeMouseMove: h,
  onNodeMouseLeave: m,
  onNodeContextMenu: x,
  onSelectionContextMenu: y,
  onSelectionStart: v,
  onSelectionEnd: w,
  connectionLineType: S,
  connectionLineStyle: _,
  connectionLineComponent: C,
  connectionLineContainerStyle: b,
  selectionKeyCode: P,
  selectionOnDrag: E,
  selectionMode: j,
  multiSelectionKeyCode: D,
  panActivationKeyCode: A,
  zoomActivationKeyCode: R,
  deleteKeyCode: H,
  onlyRenderVisibleElements: V,
  elementsSelectable: se,
  defaultViewport: X,
  translateExtent: Y,
  minZoom: te,
  maxZoom: L,
  preventScrolling: G,
  defaultMarkerColor: B,
  zoomOnScroll: K,
  zoomOnPinch: z,
  panOnScroll: $,
  panOnScrollSpeed: U,
  panOnScrollMode: M,
  zoomOnDoubleClick: I,
  panOnDrag: ne,
  onPaneClick: ie,
  onPaneMouseEnter: F,
  onPaneMouseMove: Z,
  onPaneMouseLeave: re,
  onPaneScroll: Q,
  onPaneContextMenu: oe,
  paneClickDistance: fe,
  nodeClickDistance: me,
  onEdgeContextMenu: ye,
  onEdgeMouseEnter: ve,
  onEdgeMouseMove: Ee,
  onEdgeMouseLeave: de,
  reconnectRadius: le,
  onReconnect: ge,
  onReconnectStart: ae,
  onReconnectEnd: Ne,
  noDragClassName: Me,
  noWheelClassName: De,
  noPanClassName: ze,
  disableKeyboardA11y: Ge,
  nodeExtent: Rt,
  rfId: rt,
  viewport: qe,
  onViewportChange: kt,
}) {
  return (
    sm(e),
    sm(r),
    Dk(),
    Ik(o),
    Pk(qe),
    p.jsx(JE, {
      onPaneClick: ie,
      onPaneMouseEnter: F,
      onPaneMouseMove: Z,
      onPaneMouseLeave: re,
      onPaneContextMenu: oe,
      onPaneScroll: Q,
      paneClickDistance: fe,
      deleteKeyCode: H,
      selectionKeyCode: P,
      selectionOnDrag: E,
      selectionMode: j,
      onSelectionStart: v,
      onSelectionEnd: w,
      multiSelectionKeyCode: D,
      panActivationKeyCode: A,
      zoomActivationKeyCode: R,
      elementsSelectable: se,
      zoomOnScroll: K,
      zoomOnPinch: z,
      zoomOnDoubleClick: I,
      panOnScroll: $,
      panOnScrollSpeed: U,
      panOnScrollMode: M,
      panOnDrag: ne,
      defaultViewport: X,
      translateExtent: Y,
      minZoom: te,
      maxZoom: L,
      onSelectionContextMenu: y,
      preventScrolling: G,
      noDragClassName: Me,
      noWheelClassName: De,
      noPanClassName: ze,
      disableKeyboardA11y: Ge,
      onViewportChange: kt,
      isControlledViewport: !!qe,
      children: p.jsxs(jk, {
        children: [
          p.jsx(bk, {
            edgeTypes: r,
            onEdgeClick: l,
            onEdgeDoubleClick: c,
            onReconnect: ge,
            onReconnectStart: ae,
            onReconnectEnd: Ne,
            onlyRenderVisibleElements: V,
            onEdgeContextMenu: ye,
            onEdgeMouseEnter: ve,
            onEdgeMouseMove: Ee,
            onEdgeMouseLeave: de,
            reconnectRadius: le,
            defaultMarkerColor: B,
            noPanClassName: ze,
            disableKeyboardA11y: Ge,
            rfId: rt,
          }),
          p.jsx(Ak, { style: _, type: S, component: C, containerStyle: b }),
          p.jsx("div", { className: "react-flow__edgelabel-renderer" }),
          p.jsx(ak, {
            nodeTypes: e,
            onNodeClick: i,
            onNodeDoubleClick: u,
            onNodeMouseEnter: f,
            onNodeMouseMove: h,
            onNodeMouseLeave: m,
            onNodeContextMenu: x,
            nodeClickDistance: me,
            onlyRenderVisibleElements: V,
            noPanClassName: ze,
            noDragClassName: Me,
            disableKeyboardA11y: Ge,
            nodeExtent: Rt,
            rfId: rt,
          }),
          p.jsx("div", { className: "react-flow__viewport-portal" }),
        ],
      }),
    })
  );
}
Sg.displayName = "GraphView";
const Ok = k.memo(Sg),
  im = ({
    nodes: e,
    edges: r,
    defaultNodes: o,
    defaultEdges: i,
    width: l,
    height: u,
    fitView: c,
    fitViewOptions: f,
    minZoom: h = 0.5,
    maxZoom: m = 2,
    nodeOrigin: x,
    nodeExtent: y,
    zIndexMode: v = "basic",
  } = {}) => {
    const w = new Map(),
      S = new Map(),
      _ = new Map(),
      C = new Map(),
      b = i ?? r ?? [],
      P = o ?? e ?? [],
      E = x ?? [0, 0],
      j = y ?? Is;
    z0(_, C, b);
    const D = Rc(P, w, S, { nodeOrigin: E, nodeExtent: j, zIndexMode: v });
    let A = [0, 0, 1];
    if (c && l && u) {
      const R = Fs(w, {
          filter: (X) =>
            !!((X.width || X.initialWidth) && (X.height || X.initialHeight)),
        }),
        {
          x: H,
          y: V,
          zoom: se,
        } = rd(R, l, u, h, m, (f == null ? void 0 : f.padding) ?? 0.1);
      A = [H, V, se];
    }
    return {
      rfId: "1",
      width: l ?? 0,
      height: u ?? 0,
      transform: A,
      nodes: P,
      nodesInitialized: D,
      nodeLookup: w,
      parentLookup: S,
      edges: b,
      edgeLookup: C,
      connectionLookup: _,
      onNodesChange: null,
      onEdgesChange: null,
      hasDefaultNodes: o !== void 0,
      hasDefaultEdges: i !== void 0,
      panZoom: null,
      minZoom: h,
      maxZoom: m,
      translateExtent: Is,
      nodeExtent: j,
      nodesSelectionActive: !1,
      userSelectionActive: !1,
      userSelectionRect: null,
      connectionMode: co.Strict,
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
      connection: { ...g0 },
      connectionClickStartHandle: null,
      connectOnClick: !0,
      ariaLiveMessage: "",
      autoPanOnConnect: !0,
      autoPanOnNodeDrag: !0,
      autoPanOnNodeFocus: !0,
      autoPanSpeed: 15,
      connectionRadius: 20,
      onError: t5,
      isValidConnection: void 0,
      onSelectionChangeHandlers: [],
      lib: "react",
      debug: !1,
      ariaLabelConfig: m0,
      zIndexMode: v,
      onNodesChangeMiddlewareMap: new Map(),
      onEdgesChangeMiddlewareMap: new Map(),
    };
  },
  Fk = ({
    nodes: e,
    edges: r,
    defaultNodes: o,
    defaultEdges: i,
    width: l,
    height: u,
    fitView: c,
    fitViewOptions: f,
    minZoom: h,
    maxZoom: m,
    nodeOrigin: x,
    nodeExtent: y,
    zIndexMode: v,
  }) =>
    oE((w, S) => {
      async function _() {
        const {
          nodeLookup: C,
          panZoom: b,
          fitViewOptions: P,
          fitViewResolver: E,
          width: j,
          height: D,
          minZoom: A,
          maxZoom: R,
        } = S();
        b &&
          (await JS(
            {
              nodes: C,
              width: j,
              height: D,
              panZoom: b,
              minZoom: A,
              maxZoom: R,
            },
            P
          ),
          E == null || E.resolve(!0),
          w({ fitViewResolver: null }));
      }
      return {
        ...im({
          nodes: e,
          edges: r,
          width: l,
          height: u,
          fitView: c,
          fitViewOptions: f,
          minZoom: h,
          maxZoom: m,
          nodeOrigin: x,
          nodeExtent: y,
          defaultNodes: o,
          defaultEdges: i,
          zIndexMode: v,
        }),
        setNodes: (C) => {
          const {
              nodeLookup: b,
              parentLookup: P,
              nodeOrigin: E,
              elevateNodesOnSelect: j,
              fitViewQueued: D,
              zIndexMode: A,
            } = S(),
            R = Rc(C, b, P, {
              nodeOrigin: E,
              nodeExtent: y,
              elevateNodesOnSelect: j,
              checkEquality: !0,
              zIndexMode: A,
            });
          D && R
            ? (_(),
              w({
                nodes: C,
                nodesInitialized: R,
                fitViewQueued: !1,
                fitViewOptions: void 0,
              }))
            : w({ nodes: C, nodesInitialized: R });
        },
        setEdges: (C) => {
          const { connectionLookup: b, edgeLookup: P } = S();
          (z0(b, P, C), w({ edges: C }));
        },
        setDefaultNodesAndEdges: (C, b) => {
          if (C) {
            const { setNodes: P } = S();
            (P(C), w({ hasDefaultNodes: !0 }));
          }
          if (b) {
            const { setEdges: P } = S();
            (P(b), w({ hasDefaultEdges: !0 }));
          }
        },
        updateNodeInternals: (C) => {
          const {
              triggerNodeChanges: b,
              nodeLookup: P,
              parentLookup: E,
              domNode: j,
              nodeOrigin: D,
              nodeExtent: A,
              debug: R,
              fitViewQueued: H,
              zIndexMode: V,
            } = S(),
            { changes: se, updatedInternals: X } = E5(C, P, E, j, D, A, V);
          X &&
            (v5(P, E, { nodeOrigin: D, nodeExtent: A, zIndexMode: V }),
            H ? (_(), w({ fitViewQueued: !1, fitViewOptions: void 0 })) : w({}),
            (se == null ? void 0 : se.length) > 0 &&
              (R && console.log("React Flow: trigger node changes", se),
              b == null || b(se)));
        },
        updateNodePositions: (C, b = !1) => {
          const P = [];
          let E = [];
          const {
            nodeLookup: j,
            triggerNodeChanges: D,
            connection: A,
            updateConnection: R,
            onNodesChangeMiddlewareMap: H,
          } = S();
          for (const [V, se] of C) {
            const X = j.get(V),
              Y = !!(
                X != null &&
                X.expandParent &&
                X != null &&
                X.parentId &&
                se != null &&
                se.position
              ),
              te = {
                id: V,
                type: "position",
                position: Y
                  ? {
                      x: Math.max(0, se.position.x),
                      y: Math.max(0, se.position.y),
                    }
                  : se.position,
                dragging: b,
              };
            if (X && A.inProgress && A.fromNode.id === X.id) {
              const L = Nr(X, A.fromHandle, be.Left, !0);
              R({ ...A, from: L });
            }
            (Y &&
              X.parentId &&
              P.push({
                id: V,
                parentId: X.parentId,
                rect: {
                  ...se.internals.positionAbsolute,
                  width: se.measured.width ?? 0,
                  height: se.measured.height ?? 0,
                },
              }),
              E.push(te));
          }
          if (P.length > 0) {
            const { parentLookup: V, nodeOrigin: se } = S(),
              X = ud(P, j, V, se);
            E.push(...X);
          }
          for (const V of H.values()) E = V(E);
          D(E);
        },
        triggerNodeChanges: (C) => {
          const {
            onNodesChange: b,
            setNodes: P,
            nodes: E,
            hasDefaultNodes: j,
            debug: D,
          } = S();
          if (C != null && C.length) {
            if (j) {
              const A = G0(C, E);
              P(A);
            }
            (D && console.log("React Flow: trigger node changes", C),
              b == null || b(C));
          }
        },
        triggerEdgeChanges: (C) => {
          const {
            onEdgesChange: b,
            setEdges: P,
            edges: E,
            hasDefaultEdges: j,
            debug: D,
          } = S();
          if (C != null && C.length) {
            if (j) {
              const A = q0(C, E);
              P(A);
            }
            (D && console.log("React Flow: trigger edge changes", C),
              b == null || b(C));
          }
        },
        addSelectedNodes: (C) => {
          const {
            multiSelectionActive: b,
            edgeLookup: P,
            nodeLookup: E,
            triggerNodeChanges: j,
            triggerEdgeChanges: D,
          } = S();
          if (b) {
            const A = C.map((R) => gr(R, !0));
            j(A);
            return;
          }
          (j(so(E, new Set([...C]), !0)), D(so(P)));
        },
        addSelectedEdges: (C) => {
          const {
            multiSelectionActive: b,
            edgeLookup: P,
            nodeLookup: E,
            triggerNodeChanges: j,
            triggerEdgeChanges: D,
          } = S();
          if (b) {
            const A = C.map((R) => gr(R, !0));
            D(A);
            return;
          }
          (D(so(P, new Set([...C]))), j(so(E, new Set(), !0)));
        },
        unselectNodesAndEdges: ({ nodes: C, edges: b } = {}) => {
          const {
              edges: P,
              nodes: E,
              nodeLookup: j,
              triggerNodeChanges: D,
              triggerEdgeChanges: A,
            } = S(),
            R = C || E,
            H = b || P,
            V = R.map((X) => {
              const Y = j.get(X.id);
              return (Y && (Y.selected = !1), gr(X.id, !1));
            }),
            se = H.map((X) => gr(X.id, !1));
          (D(V), A(se));
        },
        setMinZoom: (C) => {
          const { panZoom: b, maxZoom: P } = S();
          (b == null || b.setScaleExtent([C, P]), w({ minZoom: C }));
        },
        setMaxZoom: (C) => {
          const { panZoom: b, minZoom: P } = S();
          (b == null || b.setScaleExtent([P, C]), w({ maxZoom: C }));
        },
        setTranslateExtent: (C) => {
          var b;
          ((b = S().panZoom) == null || b.setTranslateExtent(C),
            w({ translateExtent: C }));
        },
        resetSelectedElements: () => {
          const {
            edges: C,
            nodes: b,
            triggerNodeChanges: P,
            triggerEdgeChanges: E,
            elementsSelectable: j,
          } = S();
          if (!j) return;
          const D = b.reduce(
              (R, H) => (H.selected ? [...R, gr(H.id, !1)] : R),
              []
            ),
            A = C.reduce((R, H) => (H.selected ? [...R, gr(H.id, !1)] : R), []);
          (P(D), E(A));
        },
        setNodeExtent: (C) => {
          const {
            nodes: b,
            nodeLookup: P,
            parentLookup: E,
            nodeOrigin: j,
            elevateNodesOnSelect: D,
            nodeExtent: A,
            zIndexMode: R,
          } = S();
          (C[0][0] === A[0][0] &&
            C[0][1] === A[0][1] &&
            C[1][0] === A[1][0] &&
            C[1][1] === A[1][1]) ||
            (Rc(b, P, E, {
              nodeOrigin: j,
              nodeExtent: C,
              elevateNodesOnSelect: D,
              checkEquality: !1,
              zIndexMode: R,
            }),
            w({ nodeExtent: C }));
        },
        panBy: (C) => {
          const {
            transform: b,
            width: P,
            height: E,
            panZoom: j,
            translateExtent: D,
          } = S();
          return k5({
            delta: C,
            panZoom: j,
            transform: b,
            translateExtent: D,
            width: P,
            height: E,
          });
        },
        setCenter: async (C, b, P) => {
          const { width: E, height: j, maxZoom: D, panZoom: A } = S();
          if (!A) return Promise.resolve(!1);
          const R = typeof (P == null ? void 0 : P.zoom) < "u" ? P.zoom : D;
          return (
            await A.setViewport(
              { x: E / 2 - C * R, y: j / 2 - b * R, zoom: R },
              {
                duration: P == null ? void 0 : P.duration,
                ease: P == null ? void 0 : P.ease,
                interpolate: P == null ? void 0 : P.interpolate,
              }
            ),
            Promise.resolve(!0)
          );
        },
        cancelConnection: () => {
          w({ connection: { ...g0 } });
        },
        updateConnection: (C) => {
          w({ connection: C });
        },
        reset: () => w({ ...im() }),
      };
    }, Object.is);
function Hk({
  initialNodes: e,
  initialEdges: r,
  defaultNodes: o,
  defaultEdges: i,
  initialWidth: l,
  initialHeight: u,
  initialMinZoom: c,
  initialMaxZoom: f,
  initialFitViewOptions: h,
  fitView: m,
  nodeOrigin: x,
  nodeExtent: y,
  zIndexMode: v,
  children: w,
}) {
  const [S] = k.useState(() =>
    Fk({
      nodes: e,
      edges: r,
      defaultNodes: o,
      defaultEdges: i,
      width: l,
      height: u,
      fitView: m,
      minZoom: c,
      maxZoom: f,
      fitViewOptions: h,
      nodeOrigin: x,
      nodeExtent: y,
      zIndexMode: v,
    })
  );
  return p.jsx(sE, { value: S, children: p.jsx(jE, { children: w }) });
}
function Bk({
  children: e,
  nodes: r,
  edges: o,
  defaultNodes: i,
  defaultEdges: l,
  width: u,
  height: c,
  fitView: f,
  fitViewOptions: h,
  minZoom: m,
  maxZoom: x,
  nodeOrigin: y,
  nodeExtent: v,
  zIndexMode: w,
}) {
  return k.useContext(ql)
    ? p.jsx(p.Fragment, { children: e })
    : p.jsx(Hk, {
        initialNodes: r,
        initialEdges: o,
        defaultNodes: i,
        defaultEdges: l,
        initialWidth: u,
        initialHeight: c,
        fitView: f,
        initialFitViewOptions: h,
        initialMinZoom: m,
        initialMaxZoom: x,
        nodeOrigin: y,
        nodeExtent: v,
        zIndexMode: w,
        children: e,
      });
}
const Vk = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0,
};
function Wk(
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
    onInit: m,
    onMove: x,
    onMoveStart: y,
    onMoveEnd: v,
    onConnect: w,
    onConnectStart: S,
    onConnectEnd: _,
    onClickConnectStart: C,
    onClickConnectEnd: b,
    onNodeMouseEnter: P,
    onNodeMouseMove: E,
    onNodeMouseLeave: j,
    onNodeContextMenu: D,
    onNodeDoubleClick: A,
    onNodeDragStart: R,
    onNodeDrag: H,
    onNodeDragStop: V,
    onNodesDelete: se,
    onEdgesDelete: X,
    onDelete: Y,
    onSelectionChange: te,
    onSelectionDragStart: L,
    onSelectionDrag: G,
    onSelectionDragStop: B,
    onSelectionContextMenu: K,
    onSelectionStart: z,
    onSelectionEnd: $,
    onBeforeDelete: U,
    connectionMode: M,
    connectionLineType: I = Qn.Bezier,
    connectionLineStyle: ne,
    connectionLineComponent: ie,
    connectionLineContainerStyle: F,
    deleteKeyCode: Z = "Backspace",
    selectionKeyCode: re = "Shift",
    selectionOnDrag: Q = !1,
    selectionMode: oe = Ms.Full,
    panActivationKeyCode: fe = "Space",
    multiSelectionKeyCode: me = Rs() ? "Meta" : "Control",
    zoomActivationKeyCode: ye = Rs() ? "Meta" : "Control",
    snapToGrid: ve,
    snapGrid: Ee,
    onlyRenderVisibleElements: de = !1,
    selectNodesOnDrag: le,
    nodesDraggable: ge,
    autoPanOnNodeFocus: ae,
    nodesConnectable: Ne,
    nodesFocusable: Me,
    nodeOrigin: De = K0,
    edgesFocusable: ze,
    edgesReconnectable: Ge,
    elementsSelectable: Rt = !0,
    defaultViewport: rt = vE,
    minZoom: qe = 0.5,
    maxZoom: kt = 2,
    translateExtent: Ht = Is,
    preventScrolling: Cr = !0,
    nodeExtent: dn,
    defaultMarkerColor: Zn = "#b1b1b7",
    zoomOnScroll: ta = !0,
    zoomOnPinch: Vs = !0,
    panOnScroll: Ws = !1,
    panOnScrollSpeed: na = 0.5,
    panOnScrollMode: wo = wr.Free,
    zoomOnDoubleClick: So = !0,
    panOnDrag: Eo = !0,
    onPaneClick: ko,
    onPaneMouseEnter: No,
    onPaneMouseMove: bn,
    onPaneMouseLeave: _n,
    onPaneScroll: Us,
    onPaneContextMenu: Ys,
    paneClickDistance: Xs = 1,
    nodeClickDistance: Ks = 0,
    children: Qs,
    onReconnect: Co,
    onReconnectStart: Gs,
    onReconnectEnd: Jn,
    onEdgeContextMenu: bo,
    onEdgeDoubleClick: er,
    onEdgeMouseEnter: ra,
    onEdgeMouseMove: tr,
    onEdgeMouseLeave: br,
    reconnectRadius: _r = 10,
    onNodesChange: _o,
    onEdgesChange: oa,
    noDragClassName: sa = "nodrag",
    noWheelClassName: ia = "nowheel",
    noPanClassName: Jt = "nopan",
    fitView: jo,
    fitViewOptions: Io,
    connectOnClick: la,
    attributionPosition: qs,
    proOptions: Zs,
    defaultEdgeOptions: Js,
    elevateNodesOnSelect: ei = !0,
    elevateEdgesOnSelect: aa = !1,
    disableKeyboardA11y: ti = !1,
    autoPanOnConnect: Ue,
    autoPanOnNodeDrag: ua,
    autoPanSpeed: Mo,
    connectionRadius: ni,
    isValidConnection: jr,
    onError: ca,
    style: ri,
    id: nr,
    nodeDragThreshold: Tt,
    connectionDragThreshold: da,
    viewport: Nt,
    onViewportChange: fa,
    width: ha,
    height: pa,
    colorMode: Ir = "light",
    debug: Mr,
    onScroll: en,
    ariaLabelConfig: Pr,
    zIndexMode: oi = "basic",
    ...ma
  },
  Po
) {
  const Rr = nr || "1",
    Ro = EE(Ir),
    rr = k.useCallback(
      (si) => {
        (si.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }),
          en == null || en(si));
      },
      [en]
    );
  return p.jsx("div", {
    "data-testid": "rf__wrapper",
    ...ma,
    onScroll: rr,
    style: { ...ri, ...Vk },
    ref: Po,
    className: Je(["react-flow", l, Ro]),
    id: nr,
    role: "application",
    children: p.jsxs(Bk, {
      nodes: e,
      edges: r,
      width: ha,
      height: pa,
      fitView: jo,
      fitViewOptions: Io,
      minZoom: qe,
      maxZoom: kt,
      nodeOrigin: De,
      nodeExtent: dn,
      zIndexMode: oi,
      children: [
        p.jsx(Ok, {
          onInit: m,
          onNodeClick: f,
          onEdgeClick: h,
          onNodeMouseEnter: P,
          onNodeMouseMove: E,
          onNodeMouseLeave: j,
          onNodeContextMenu: D,
          onNodeDoubleClick: A,
          nodeTypes: u,
          edgeTypes: c,
          connectionLineType: I,
          connectionLineStyle: ne,
          connectionLineComponent: ie,
          connectionLineContainerStyle: F,
          selectionKeyCode: re,
          selectionOnDrag: Q,
          selectionMode: oe,
          deleteKeyCode: Z,
          multiSelectionKeyCode: me,
          panActivationKeyCode: fe,
          zoomActivationKeyCode: ye,
          onlyRenderVisibleElements: de,
          defaultViewport: rt,
          translateExtent: Ht,
          minZoom: qe,
          maxZoom: kt,
          preventScrolling: Cr,
          zoomOnScroll: ta,
          zoomOnPinch: Vs,
          zoomOnDoubleClick: So,
          panOnScroll: Ws,
          panOnScrollSpeed: na,
          panOnScrollMode: wo,
          panOnDrag: Eo,
          onPaneClick: ko,
          onPaneMouseEnter: No,
          onPaneMouseMove: bn,
          onPaneMouseLeave: _n,
          onPaneScroll: Us,
          onPaneContextMenu: Ys,
          paneClickDistance: Xs,
          nodeClickDistance: Ks,
          onSelectionContextMenu: K,
          onSelectionStart: z,
          onSelectionEnd: $,
          onReconnect: Co,
          onReconnectStart: Gs,
          onReconnectEnd: Jn,
          onEdgeContextMenu: bo,
          onEdgeDoubleClick: er,
          onEdgeMouseEnter: ra,
          onEdgeMouseMove: tr,
          onEdgeMouseLeave: br,
          reconnectRadius: _r,
          defaultMarkerColor: Zn,
          noDragClassName: sa,
          noWheelClassName: ia,
          noPanClassName: Jt,
          rfId: Rr,
          disableKeyboardA11y: ti,
          nodeExtent: dn,
          viewport: Nt,
          onViewportChange: fa,
        }),
        p.jsx(SE, {
          nodes: e,
          edges: r,
          defaultNodes: o,
          defaultEdges: i,
          onConnect: w,
          onConnectStart: S,
          onConnectEnd: _,
          onClickConnectStart: C,
          onClickConnectEnd: b,
          nodesDraggable: ge,
          autoPanOnNodeFocus: ae,
          nodesConnectable: Ne,
          nodesFocusable: Me,
          edgesFocusable: ze,
          edgesReconnectable: Ge,
          elementsSelectable: Rt,
          elevateNodesOnSelect: ei,
          elevateEdgesOnSelect: aa,
          minZoom: qe,
          maxZoom: kt,
          nodeExtent: dn,
          onNodesChange: _o,
          onEdgesChange: oa,
          snapToGrid: ve,
          snapGrid: Ee,
          connectionMode: M,
          translateExtent: Ht,
          connectOnClick: la,
          defaultEdgeOptions: Js,
          fitView: jo,
          fitViewOptions: Io,
          onNodesDelete: se,
          onEdgesDelete: X,
          onDelete: Y,
          onNodeDragStart: R,
          onNodeDrag: H,
          onNodeDragStop: V,
          onSelectionDrag: G,
          onSelectionDragStart: L,
          onSelectionDragStop: B,
          onMove: x,
          onMoveStart: y,
          onMoveEnd: v,
          noPanClassName: Jt,
          nodeOrigin: De,
          rfId: Rr,
          autoPanOnConnect: Ue,
          autoPanOnNodeDrag: ua,
          autoPanSpeed: Mo,
          onError: ca,
          connectionRadius: ni,
          isValidConnection: jr,
          selectNodesOnDrag: le,
          nodeDragThreshold: Tt,
          connectionDragThreshold: da,
          onBeforeDelete: U,
          debug: Mr,
          ariaLabelConfig: Pr,
          zIndexMode: oi,
        }),
        p.jsx(yE, { onSelectionChange: te }),
        Qs,
        p.jsx(fE, { proOptions: Zs, position: qs }),
        p.jsx(dE, { rfId: Rr, disableKeyboardA11y: ti }),
      ],
    }),
  });
}
var Uk = Z0(Wk);
function Yk(e) {
  const [r, o] = k.useState(e),
    i = k.useCallback((l) => o((u) => G0(l, u)), []);
  return [r, o, i];
}
function Xk(e) {
  const [r, o] = k.useState(e),
    i = k.useCallback((l) => o((u) => q0(l, u)), []);
  return [r, o, i];
}
function Kk({ dimensions: e, lineWidth: r, variant: o, className: i }) {
  return p.jsx("path", {
    strokeWidth: r,
    d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`,
    className: Je(["react-flow__background-pattern", o, i]),
  });
}
function Qk({ radius: e, className: r }) {
  return p.jsx("circle", {
    cx: e,
    cy: e,
    r: e,
    className: Je(["react-flow__background-pattern", "dots", r]),
  });
}
var Gn;
(function (e) {
  ((e.Lines = "lines"), (e.Dots = "dots"), (e.Cross = "cross"));
})(Gn || (Gn = {}));
const Gk = { [Gn.Dots]: 1, [Gn.Lines]: 1, [Gn.Cross]: 6 },
  qk = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function Eg({
  id: e,
  variant: r = Gn.Dots,
  gap: o = 20,
  size: i,
  lineWidth: l = 1,
  offset: u = 0,
  color: c,
  bgColor: f,
  style: h,
  className: m,
  patternClassName: x,
}) {
  const y = k.useRef(null),
    { transform: v, patternId: w } = Re(qk, Ve),
    S = i || Gk[r],
    _ = r === Gn.Dots,
    C = r === Gn.Cross,
    b = Array.isArray(o) ? o : [o, o],
    P = [b[0] * v[2] || 1, b[1] * v[2] || 1],
    E = S * v[2],
    j = Array.isArray(u) ? u : [u, u],
    D = C ? [E, E] : P,
    A = [j[0] * v[2] || 1 + D[0] / 2, j[1] * v[2] || 1 + D[1] / 2],
    R = `${w}${e || ""}`;
  return p.jsxs("svg", {
    className: Je(["react-flow__background", m]),
    style: {
      ...h,
      ...Jl,
      "--xy-background-color-props": f,
      "--xy-background-pattern-color-props": c,
    },
    ref: y,
    "data-testid": "rf__background",
    children: [
      p.jsx("pattern", {
        id: R,
        x: v[0] % P[0],
        y: v[1] % P[1],
        width: P[0],
        height: P[1],
        patternUnits: "userSpaceOnUse",
        patternTransform: `translate(-${A[0]},-${A[1]})`,
        children: _
          ? p.jsx(Qk, { radius: E / 2, className: x })
          : p.jsx(Kk, {
              dimensions: D,
              lineWidth: l,
              variant: r,
              className: x,
            }),
      }),
      p.jsx("rect", {
        x: "0",
        y: "0",
        width: "100%",
        height: "100%",
        fill: `url(#${R})`,
      }),
    ],
  });
}
Eg.displayName = "Background";
k.memo(Eg);
function Zk() {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    children: p.jsx("path", {
      d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z",
    }),
  });
}
function Jk() {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 5",
    children: p.jsx("path", { d: "M0 0h32v4.2H0z" }),
  });
}
function eN() {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 30",
    children: p.jsx("path", {
      d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z",
    }),
  });
}
function tN() {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32",
    children: p.jsx("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z",
    }),
  });
}
function nN() {
  return p.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32",
    children: p.jsx("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z",
    }),
  });
}
function gl({ children: e, className: r, ...o }) {
  return p.jsx("button", {
    type: "button",
    className: Je(["react-flow__controls-button", r]),
    ...o,
    children: e,
  });
}
const rN = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig,
});
function kg({
  style: e,
  showZoom: r = !0,
  showFitView: o = !0,
  showInteractive: i = !0,
  fitViewOptions: l,
  onZoomIn: u,
  onZoomOut: c,
  onFitView: f,
  onInteractiveChange: h,
  className: m,
  children: x,
  position: y = "bottom-left",
  orientation: v = "vertical",
  "aria-label": w,
}) {
  const S = We(),
    {
      isInteractive: _,
      minZoomReached: C,
      maxZoomReached: b,
      ariaLabelConfig: P,
    } = Re(rN, Ve),
    { zoomIn: E, zoomOut: j, fitView: D } = cd(),
    A = () => {
      (E(), u == null || u());
    },
    R = () => {
      (j(), c == null || c());
    },
    H = () => {
      (D(l), f == null || f());
    },
    V = () => {
      (S.setState({
        nodesDraggable: !_,
        nodesConnectable: !_,
        elementsSelectable: !_,
      }),
        h == null || h(!_));
    },
    se = v === "horizontal" ? "horizontal" : "vertical";
  return p.jsxs(Zl, {
    className: Je(["react-flow__controls", se, m]),
    position: y,
    style: e,
    "data-testid": "rf__controls",
    "aria-label": w ?? P["controls.ariaLabel"],
    children: [
      r &&
        p.jsxs(p.Fragment, {
          children: [
            p.jsx(gl, {
              onClick: A,
              className: "react-flow__controls-zoomin",
              title: P["controls.zoomIn.ariaLabel"],
              "aria-label": P["controls.zoomIn.ariaLabel"],
              disabled: b,
              children: p.jsx(Zk, {}),
            }),
            p.jsx(gl, {
              onClick: R,
              className: "react-flow__controls-zoomout",
              title: P["controls.zoomOut.ariaLabel"],
              "aria-label": P["controls.zoomOut.ariaLabel"],
              disabled: C,
              children: p.jsx(Jk, {}),
            }),
          ],
        }),
      o &&
        p.jsx(gl, {
          className: "react-flow__controls-fitview",
          onClick: H,
          title: P["controls.fitView.ariaLabel"],
          "aria-label": P["controls.fitView.ariaLabel"],
          children: p.jsx(eN, {}),
        }),
      i &&
        p.jsx(gl, {
          className: "react-flow__controls-interactive",
          onClick: V,
          title: P["controls.interactive.ariaLabel"],
          "aria-label": P["controls.interactive.ariaLabel"],
          children: _ ? p.jsx(nN, {}) : p.jsx(tN, {}),
        }),
      x,
    ],
  });
}
kg.displayName = "Controls";
const oN = k.memo(kg);
function sN({
  id: e,
  x: r,
  y: o,
  width: i,
  height: l,
  style: u,
  color: c,
  strokeColor: f,
  strokeWidth: h,
  className: m,
  borderRadius: x,
  shapeRendering: y,
  selected: v,
  onClick: w,
}) {
  const { background: S, backgroundColor: _ } = u || {},
    C = c || S || _;
  return p.jsx("rect", {
    className: Je(["react-flow__minimap-node", { selected: v }, m]),
    x: r,
    y: o,
    rx: x,
    ry: x,
    width: i,
    height: l,
    style: { fill: C, stroke: f, strokeWidth: h },
    shapeRendering: y,
    onClick: w ? (b) => w(b, e) : void 0,
  });
}
const iN = k.memo(sN),
  lN = (e) => e.nodes.map((r) => r.id),
  hc = (e) => (e instanceof Function ? e : () => e);
function aN({
  nodeStrokeColor: e,
  nodeColor: r,
  nodeClassName: o = "",
  nodeBorderRadius: i = 5,
  nodeStrokeWidth: l,
  nodeComponent: u = iN,
  onClick: c,
}) {
  const f = Re(lN, Ve),
    h = hc(r),
    m = hc(e),
    x = hc(o),
    y =
      typeof window > "u" || window.chrome
        ? "crispEdges"
        : "geometricPrecision";
  return p.jsx(p.Fragment, {
    children: f.map((v) =>
      p.jsx(
        cN,
        {
          id: v,
          nodeColorFunc: h,
          nodeStrokeColorFunc: m,
          nodeClassNameFunc: x,
          nodeBorderRadius: i,
          nodeStrokeWidth: l,
          NodeComponent: u,
          onClick: c,
          shapeRendering: y,
        },
        v
      )
    ),
  });
}
function uN({
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
    node: m,
    x,
    y,
    width: v,
    height: w,
  } = Re((S) => {
    const { internals: _ } = S.nodeLookup.get(e),
      C = _.userNode,
      { x: b, y: P } = _.positionAbsolute,
      { width: E, height: j } = Cn(C);
    return { node: C, x: b, y: P, width: E, height: j };
  }, Ve);
  return !m || m.hidden || !k0(m)
    ? null
    : p.jsx(f, {
        x,
        y,
        width: v,
        height: w,
        style: m.style,
        selected: !!m.selected,
        className: i(m),
        color: r(m),
        borderRadius: l,
        strokeColor: o(m),
        strokeWidth: u,
        shapeRendering: c,
        onClick: h,
        id: m.id,
      });
}
const cN = k.memo(uN);
var dN = k.memo(aN);
const fN = 200,
  hN = 150,
  pN = (e) => !e.hidden,
  mN = (e) => {
    const r = {
      x: -e.transform[0] / e.transform[2],
      y: -e.transform[1] / e.transform[2],
      width: e.width / e.transform[2],
      height: e.height / e.transform[2],
    };
    return {
      viewBB: r,
      boundingRect:
        e.nodeLookup.size > 0 ? E0(Fs(e.nodeLookup, { filter: pN }), r) : r,
      rfId: e.rfId,
      panZoom: e.panZoom,
      translateExtent: e.translateExtent,
      flowWidth: e.width,
      flowHeight: e.height,
      ariaLabelConfig: e.ariaLabelConfig,
    };
  },
  gN = "react-flow__minimap-desc";
function Ng({
  style: e,
  className: r,
  nodeStrokeColor: o,
  nodeColor: i,
  nodeClassName: l = "",
  nodeBorderRadius: u = 5,
  nodeStrokeWidth: c,
  nodeComponent: f,
  bgColor: h,
  maskColor: m,
  maskStrokeColor: x,
  maskStrokeWidth: y,
  position: v = "bottom-right",
  onClick: w,
  onNodeClick: S,
  pannable: _ = !1,
  zoomable: C = !1,
  ariaLabel: b,
  inversePan: P,
  zoomStep: E = 1,
  offsetScale: j = 5,
}) {
  const D = We(),
    A = k.useRef(null),
    {
      boundingRect: R,
      viewBB: H,
      rfId: V,
      panZoom: se,
      translateExtent: X,
      flowWidth: Y,
      flowHeight: te,
      ariaLabelConfig: L,
    } = Re(mN, Ve),
    G = (e == null ? void 0 : e.width) ?? fN,
    B = (e == null ? void 0 : e.height) ?? hN,
    K = R.width / G,
    z = R.height / B,
    $ = Math.max(K, z),
    U = $ * G,
    M = $ * B,
    I = j * $,
    ne = R.x - (U - R.width) / 2 - I,
    ie = R.y - (M - R.height) / 2 - I,
    F = U + I * 2,
    Z = M + I * 2,
    re = `${gN}-${V}`,
    Q = k.useRef(0),
    oe = k.useRef();
  ((Q.current = $),
    k.useEffect(() => {
      if (A.current && se)
        return (
          (oe.current = R5({
            domNode: A.current,
            panZoom: se,
            getTransform: () => D.getState().transform,
            getViewScale: () => Q.current,
          })),
          () => {
            var ve;
            (ve = oe.current) == null || ve.destroy();
          }
        );
    }, [se]),
    k.useEffect(() => {
      var ve;
      (ve = oe.current) == null ||
        ve.update({
          translateExtent: X,
          width: Y,
          height: te,
          inversePan: P,
          pannable: _,
          zoomStep: E,
          zoomable: C,
        });
    }, [_, C, P, E, X, Y, te]));
  const fe = w
      ? (ve) => {
          var le;
          const [Ee, de] = ((le = oe.current) == null
            ? void 0
            : le.pointer(ve)) || [0, 0];
          w(ve, { x: Ee, y: de });
        }
      : void 0,
    me = S
      ? k.useCallback((ve, Ee) => {
          const de = D.getState().nodeLookup.get(Ee).internals.userNode;
          S(ve, de);
        }, [])
      : void 0,
    ye = b ?? L["minimap.ariaLabel"];
  return p.jsx(Zl, {
    position: v,
    style: {
      ...e,
      "--xy-minimap-background-color-props": typeof h == "string" ? h : void 0,
      "--xy-minimap-mask-background-color-props":
        typeof m == "string" ? m : void 0,
      "--xy-minimap-mask-stroke-color-props": typeof x == "string" ? x : void 0,
      "--xy-minimap-mask-stroke-width-props":
        typeof y == "number" ? y * $ : void 0,
      "--xy-minimap-node-background-color-props":
        typeof i == "string" ? i : void 0,
      "--xy-minimap-node-stroke-color-props": typeof o == "string" ? o : void 0,
      "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0,
    },
    className: Je(["react-flow__minimap", r]),
    "data-testid": "rf__minimap",
    children: p.jsxs("svg", {
      width: G,
      height: B,
      viewBox: `${ne} ${ie} ${F} ${Z}`,
      className: "react-flow__minimap-svg",
      role: "img",
      "aria-labelledby": re,
      ref: A,
      onClick: fe,
      children: [
        ye && p.jsx("title", { id: re, children: ye }),
        p.jsx(dN, {
          onClick: me,
          nodeColor: i,
          nodeStrokeColor: o,
          nodeBorderRadius: u,
          nodeClassName: l,
          nodeStrokeWidth: c,
          nodeComponent: f,
        }),
        p.jsx("path", {
          className: "react-flow__minimap-mask",
          d: `M${ne - I},${ie - I}h${F + I * 2}v${Z + I * 2}h${-F - I * 2}z
        M${H.x},${H.y}h${H.width}v${H.height}h${-H.width}z`,
          fillRule: "evenodd",
          pointerEvents: "none",
        }),
      ],
    }),
  });
}
Ng.displayName = "MiniMap";
const yN = k.memo(Ng),
  vN = (e) => (r) => (e ? `${Math.max(1 / r.transform[2], 1)}` : void 0),
  xN = { [mo.Line]: "right", [mo.Handle]: "bottom-right" };
function wN({
  nodeId: e,
  position: r,
  variant: o = mo.Handle,
  className: i,
  style: l = void 0,
  children: u,
  color: c,
  minWidth: f = 10,
  minHeight: h = 10,
  maxWidth: m = Number.MAX_VALUE,
  maxHeight: x = Number.MAX_VALUE,
  keepAspectRatio: y = !1,
  resizeDirection: v,
  autoScale: w = !0,
  shouldResize: S,
  onResizeStart: _,
  onResize: C,
  onResizeEnd: b,
}) {
  const P = ng(),
    E = typeof e == "string" ? e : P,
    j = We(),
    D = k.useRef(null),
    A = o === mo.Handle,
    R = Re(k.useCallback(vN(A && w), [A, w]), Ve),
    H = k.useRef(null),
    V = r ?? xN[o];
  k.useEffect(() => {
    if (!(!D.current || !E))
      return (
        H.current ||
          (H.current = Y5({
            domNode: D.current,
            nodeId: E,
            getStoreItems: () => {
              const {
                nodeLookup: X,
                transform: Y,
                snapGrid: te,
                snapToGrid: L,
                nodeOrigin: G,
                domNode: B,
              } = j.getState();
              return {
                nodeLookup: X,
                transform: Y,
                snapGrid: te,
                snapToGrid: L,
                nodeOrigin: G,
                paneDomNode: B,
              };
            },
            onChange: (X, Y) => {
              const {
                  triggerNodeChanges: te,
                  nodeLookup: L,
                  parentLookup: G,
                  nodeOrigin: B,
                } = j.getState(),
                K = [],
                z = { x: X.x, y: X.y },
                $ = L.get(E);
              if ($ && $.expandParent && $.parentId) {
                const U = $.origin ?? B,
                  M = X.width ?? $.measured.width ?? 0,
                  I = X.height ?? $.measured.height ?? 0,
                  ne = {
                    id: $.id,
                    parentId: $.parentId,
                    rect: {
                      width: M,
                      height: I,
                      ...N0(
                        { x: X.x ?? $.position.x, y: X.y ?? $.position.y },
                        { width: M, height: I },
                        $.parentId,
                        L,
                        U
                      ),
                    },
                  },
                  ie = ud([ne], L, G, B);
                (K.push(...ie),
                  (z.x = X.x ? Math.max(U[0] * M, X.x) : void 0),
                  (z.y = X.y ? Math.max(U[1] * I, X.y) : void 0));
              }
              if (z.x !== void 0 && z.y !== void 0) {
                const U = { id: E, type: "position", position: { ...z } };
                K.push(U);
              }
              if (X.width !== void 0 && X.height !== void 0) {
                const M = {
                  id: E,
                  type: "dimensions",
                  resizing: !0,
                  setAttributes: v
                    ? v === "horizontal"
                      ? "width"
                      : "height"
                    : !0,
                  dimensions: { width: X.width, height: X.height },
                };
                K.push(M);
              }
              for (const U of Y) {
                const M = { ...U, type: "position" };
                K.push(M);
              }
              te(K);
            },
            onEnd: ({ width: X, height: Y }) => {
              const te = {
                id: E,
                type: "dimensions",
                resizing: !1,
                dimensions: { width: X, height: Y },
              };
              j.getState().triggerNodeChanges([te]);
            },
          })),
        H.current.update({
          controlPosition: V,
          boundaries: { minWidth: f, minHeight: h, maxWidth: m, maxHeight: x },
          keepAspectRatio: y,
          resizeDirection: v,
          onResizeStart: _,
          onResize: C,
          onResizeEnd: b,
          shouldResize: S,
        }),
        () => {
          var X;
          (X = H.current) == null || X.destroy();
        }
      );
  }, [V, f, h, m, x, y, _, C, b, S]);
  const se = V.split("-");
  return p.jsx("div", {
    className: Je(["react-flow__resize-control", "nodrag", ...se, o, i]),
    ref: D,
    style: {
      ...l,
      scale: R,
      ...(c && { [A ? "backgroundColor" : "borderColor"]: c }),
    },
    children: u,
  });
}
k.memo(wN);
const SN = { NORMAL: 1e3 };
function EN(e) {
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
    case "tokens_updated":
      return typeof r.tokens == "object" && r.tokens !== null;
    default:
      return !1;
  }
}
const kN = {
  maxReconnectAttempts: 5,
  reconnectBaseDelay: 1e3,
  reconnectMaxDelay: 3e4,
};
class NN {
  constructor(r = {}) {
    ut(this, "ws", null);
    ut(this, "url", "");
    ut(this, "config");
    ut(this, "reconnectAttempts", 0);
    ut(this, "reconnectTimer", null);
    ut(this, "currentSessionId", null);
    ut(this, "connectionState", "disconnected");
    ut(this, "onJoined", null);
    ut(this, "onLeft", null);
    ut(this, "onMessage", null);
    ut(this, "onTyping", null);
    ut(this, "onError", null);
    ut(this, "onConnectionChange", null);
    ut(this, "onEdgeCreated", null);
    ut(this, "onEdgeDeleted", null);
    ut(this, "onTokensUpdated", null);
    this.config = { ...kN, ...r };
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
            r.code !== SN.NORMAL && this.scheduleReconnect());
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
    var o, i, l, u, c, f, h, m, x, y;
    try {
      const v = JSON.parse(r);
      if (!EN(v)) {
        (console.error("[WebSocket] Invalid message format:", v),
          (o = this.onError) == null ||
            o.call(this, "Invalid message from server"));
        return;
      }
      const w = v;
      switch (w.type) {
        case "joined":
          (i = this.onJoined) == null || i.call(this, w.sessionId, w.messages);
          break;
        case "left":
          (l = this.onLeft) == null || l.call(this, w.sessionId);
          break;
        case "new-message":
          (u = this.onMessage) == null || u.call(this, w.message);
          break;
        case "typing":
          (c = this.onTyping) == null || c.call(this, w.sessionId, w.isTyping);
          break;
        case "error":
          (f = this.onError) == null || f.call(this, w.message);
          break;
        case "edge_created":
          (h = this.onEdgeCreated) == null || h.call(this, w.edge);
          break;
        case "edge_deleted":
          (m = this.onEdgeDeleted) == null ||
            m.call(this, w.edgeId, w.remainingContext);
          break;
        case "tokens_updated":
          (x = this.onTokensUpdated) == null || x.call(this, w.tokens);
          break;
      }
    } catch (v) {
      (console.error("[WebSocket] Failed to parse message:", v),
        (y = this.onError) == null ||
          y.call(this, "Failed to parse server message"));
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
const nt = new NN(),
  pc = {
    connectionState: "disconnected",
    currentSessionId: null,
    messages: [],
    typingSessionId: null,
    lastError: null,
    lastEdgeCreated: null,
    lastEdgeDeleted: null,
    lastTokensUpdated: null,
  },
  ps = {
    MAX_MESSAGES: 1e3,
    CONNECTION_TIMEOUT_MS: 5e3,
    CONNECTION_CHECK_INTERVAL_MS: 100,
  },
  lm = () =>
    `${window.location.protocol === "https:" ? "wss:" : "ws:"}//localhost:3001`;
let vr = null;
function mc() {
  vr && (clearTimeout(vr), (vr = null));
}
const _l = Uc(
    (e, r) => (
      (nt.onConnectionChange = (o) => {
        e({ connectionState: o });
      }),
      (nt.onJoined = (o, i) => {
        e({ currentSessionId: o, messages: i, lastError: null });
      }),
      (nt.onLeft = () => {
        e({ currentSessionId: null, messages: [], typingSessionId: null });
      }),
      (nt.onMessage = (o) => {
        e((i) => {
          const l = [...i.messages, o];
          return l.length > ps.MAX_MESSAGES
            ? { messages: l.slice(-1e3) }
            : { messages: l };
        });
      }),
      (nt.onTyping = (o, i) => {
        e({ typingSessionId: i ? o : null });
      }),
      (nt.onError = (o) => {
        e({ lastError: o });
      }),
      (nt.onEdgeCreated = (o) => {
        e({ lastEdgeCreated: o });
      }),
      (nt.onEdgeDeleted = (o, i) => {
        e({ lastEdgeDeleted: { edgeId: o, remainingContext: i } });
      }),
      (nt.onTokensUpdated = (o) => {
        e({ lastTokensUpdated: o });
      }),
      {
        ...pc,
        connect: (o) => {
          const i = o || lm();
          nt.connect(i);
        },
        disconnect: () => {
          (mc(), nt.disconnect(), e(pc));
        },
        joinSession: (o) => {
          const { connectionState: i } = r();
          if ((mc(), i !== "connected")) {
            const l = lm();
            nt.connect(l);
            let u = 0;
            const c = Math.floor(
                ps.CONNECTION_TIMEOUT_MS / ps.CONNECTION_CHECK_INTERVAL_MS
              ),
              f = () => {
                nt.getConnectionState() === "connected"
                  ? (nt.joinSession(o), (vr = null))
                  : u < c
                    ? (u++,
                      (vr = setTimeout(f, ps.CONNECTION_CHECK_INTERVAL_MS)))
                    : (console.error("[WebSocketStore] Connection timeout"),
                      e({ lastError: "Connection timeout" }),
                      (vr = null));
              };
            vr = setTimeout(f, ps.CONNECTION_CHECK_INTERVAL_MS);
          } else nt.joinSession(o);
        },
        leaveSession: () => {
          const { currentSessionId: o } = r();
          (o && nt.leaveSession(o),
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
          nt.sendMessage(i, o);
        },
        setTyping: (o) => {
          const { currentSessionId: i, connectionState: l } = r();
          l !== "connected" || !i || nt.sendTyping(i, o);
        },
        clearError: () => {
          e({ lastError: null });
        },
        clearEdgeEvents: () => {
          e({ lastEdgeCreated: null, lastEdgeDeleted: null });
        },
        reset: () => {
          (mc(), nt.disconnect(), e(pc));
        },
      }
    )
  ),
  Cg = "cnthub-node-positions",
  bg = "cnthub-edges",
  zc = "cnthub-connected-sessions",
  fd = "http://localhost:3048",
  CN = 180,
  bN = 70,
  _N = 260,
  jN = 140,
  Ac = 20;
function am(e) {
  return e.type === "context"
    ? { width: _N, height: jN }
    : { width: CN, height: bN };
}
function Fl(e, r) {
  const o = am(e),
    i = am(r),
    l = { x: e.position.x + o.width / 2, y: e.position.y + o.height / 2 },
    u = { x: r.position.x + i.width / 2, y: r.position.y + i.height / 2 },
    c = (o.width + i.width) / 2 + Ac,
    f = (o.height + i.height) / 2 + Ac,
    h = Math.abs(l.x - u.x),
    m = Math.abs(l.y - u.y);
  return h < c && m < f;
}
function _g(e, r) {
  const o = { ...e.position },
    i = r.filter((h) => h.id !== e.id),
    l = { ...e, position: o };
  if (!i.some((h) => Fl(l, h))) return o;
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
    f = Ac + 20;
  for (let h = 1; h <= 10; h++)
    for (const m of c) {
      const x = { x: o.x + m.dx * f * h, y: o.y + m.dy * f * h };
      if (((l.position = x), !i.some((v) => Fl(l, v)))) return x;
    }
  return { x: o.x + f * 3, y: o.y };
}
function um(e) {
  const r = [];
  let o = !1;
  for (const i of e) {
    const l = { ...i },
      u = _g(l, [...r, l]);
    ((u.x !== l.position.x || u.y !== l.position.y) &&
      ((l.position = u), (o = !0)),
      r.push(l));
  }
  return { nodes: r, changed: o };
}
function cm(e, r, o) {
  const l = o === "context" ? 180 : 100,
    u = o === "context" ? 280 : 220,
    c = o === "context" ? 500 : 50,
    f = 80,
    h = c + (e % 4) * u,
    m = f + Math.floor(e / 4) * l,
    x = { type: o, position: { x: h, y: m } };
  if (!r.some((S) => Fl(x, S))) return { x: h, y: m };
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
    w = o === "context" ? 100 : 60;
  for (let S = 1; S <= 15; S++)
    for (const _ of v) {
      const C = { x: h + _.dx * w * S, y: m + _.dy * w * S };
      if (((x.position = C), !r.some((P) => Fl(x, P)) && C.x >= 0 && C.y >= 0))
        return C;
    }
  return { x: h, y: m + l * (e + 1) };
}
function dm() {
  try {
    const e = localStorage.getItem(Cg);
    return e ? JSON.parse(e) : {};
  } catch {
    return {};
  }
}
function no(e) {
  try {
    localStorage.setItem(Cg, JSON.stringify(e));
  } catch {}
}
function IN() {
  try {
    const e = localStorage.getItem(bg);
    return e ? JSON.parse(e) : [];
  } catch {
    return [];
  }
}
function ms(e) {
  try {
    localStorage.setItem(bg, JSON.stringify(e));
  } catch {}
}
function MN() {
  try {
    const e = localStorage.getItem(zc);
    if (!e) return {};
    const r = JSON.parse(e);
    return Array.isArray(r)
      ? (console.log("[NodeEditor] Migrating old connected sessions format"),
        localStorage.removeItem(zc),
        {})
      : r;
  } catch {
    return {};
  }
}
function yl(e) {
  try {
    localStorage.setItem(zc, JSON.stringify(e));
  } catch {}
}
async function PN(e, r) {
  try {
    const o = await fetch(`${fd}/api/edges`, {
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
async function RN(e) {
  try {
    const r = await fetch(`${fd}/api/edges/${e}`, { method: "DELETE" });
    return r.ok || r.status === 404;
  } catch (r) {
    return (console.warn("[NodeEditor] Error deleting edge:", r), !1);
  }
}
async function TN(e) {
  try {
    const r = await fetch(`${fd}/api/edges/by-target/${e}`);
    return r.ok ? (await r.json()).edges || [] : [];
  } catch (r) {
    return (console.warn("[NodeEditor] Error loading edges:", r), []);
  }
}
function ws(e) {
  return e >= 1e6
    ? (e / 1e6).toFixed(1) + "M"
    : e >= 1e3
      ? (e / 1e3).toFixed(1) + "k"
      : e.toString();
}
const LN = {
    error_loop: "エラーの繰り返し",
    edit_loop: "編集ループ",
    test_failure_loop: "テスト失敗ループ",
    rollback: "ロールバック",
    other: "その他の問題",
  },
  zN = {
    high: "bg-red-500/20 text-red-400 border-red-500/50",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    low: "bg-gray-500/20 text-gray-400 border-gray-500/50",
  },
  AN = {
    feature: "F",
    bugfix: "B",
    refactor: "R",
    exploration: "E",
    other: "O",
  },
  vl = {
    feature: "機能追加",
    bugfix: "バグ修正",
    refactor: "リファクタ",
    exploration: "調査",
    other: "その他",
  };
function $N({ data: e }) {
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
    l = k.useCallback(
      (f) => {
        var h;
        (f.key === "Enter" || f.key === " ") &&
          (f.preventDefault(), (h = e.onClick) == null || h.call(e));
      },
      [e]
    ),
    u = e.issueType ? LN[e.issueType] || e.issueType : "問題あり";
  return p.jsxs("div", {
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
      p.jsx(go, {
        type: "source",
        position: be.Right,
        className: "w-3 h-3 bg-[var(--color-primary-500)]",
        "aria-hidden": "true",
      }),
      e.hasIssues &&
        p.jsx("div", {
          className:
            "absolute -top-2 -left-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center cursor-help",
          title: u,
          children: p.jsx("span", {
            role: "img",
            "aria-label": "問題あり",
            children: "🐛",
          }),
        }),
      (e.inputTokens !== void 0 || e.outputTokens !== void 0) &&
        p.jsxs("div", {
          className:
            "absolute -top-2 -right-2 bg-[var(--bg-elevated)] text-[var(--text-muted)] text-[10px] px-1.5 py-0.5 rounded-full border border-[var(--border-default)] whitespace-nowrap",
          "aria-label": `Input: ${e.inputTokens || 0}, Output: ${e.outputTokens || 0}`,
          children: [
            "in:",
            ws(e.inputTokens || 0),
            " / out:",
            ws(e.outputTokens || 0),
          ],
        }),
      p.jsx("div", {
        className: `text-sm font-semibold truncate ${o}`,
        children: e.label,
      }),
      p.jsxs("div", {
        className: "flex items-center gap-2 mt-1",
        children: [
          p.jsxs("div", {
            className: "flex items-center gap-2 min-w-0",
            children: [
              e.date &&
                p.jsx("span", {
                  className: "text-xs text-[var(--text-secondary)]",
                  children: e.date,
                }),
              e.projectName &&
                p.jsx("span", {
                  className:
                    "px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded text-[10px] text-[var(--text-primary)] truncate max-w-[70px]",
                  title: e.projectName,
                  children: e.projectName,
                }),
            ],
          }),
          p.jsxs("div", {
            className: "flex items-center gap-1 ml-auto shrink-0",
            children: [
              e.importance &&
                e.importance !== "medium" &&
                p.jsx("span", {
                  className: `w-4 h-4 rounded border text-[9px] font-bold flex items-center justify-center ${zN[e.importance] || ""}`,
                  title: `重要度: ${e.importance}`,
                  "aria-label": `重要度: ${e.importance}`,
                  children: e.importance === "high" ? "H" : "L",
                }),
              e.category &&
                p.jsx("span", {
                  className:
                    "w-4 h-4 rounded bg-[var(--bg-elevated)] text-[9px] font-semibold text-[var(--text-secondary)] flex items-center justify-center",
                  title: vl[e.category] || e.category,
                  "aria-label": vl[e.category] || e.category,
                  children:
                    AN[e.category] ||
                    ((c = vl[e.category]) == null ? void 0 : c[0]) ||
                    "O",
                }),
            ],
          }),
        ],
      }),
      (e.category || (e.importance && e.importance !== "medium")) &&
        p.jsx("div", {
          className:
            "absolute left-0 right-0 top-full mt-1 z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity",
          children: p.jsxs("div", {
            className:
              "px-2 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-primary)] shadow-lg flex items-center gap-2",
            children: [
              e.importance &&
                e.importance !== "medium" &&
                p.jsxs("span", {
                  className: "font-semibold",
                  children: ["重要度: ", e.importance === "high" ? "高" : "低"],
                }),
              e.category &&
                p.jsx("span", {
                  className: "text-[var(--text-secondary)]",
                  children: vl[e.category] || e.category,
                }),
            ],
          }),
        }),
    ],
  });
}
function DN({ data: e }) {
  var u, c, f;
  const r = k.useCallback(() => {
      var h;
      (h = e.onExport) == null || h.call(e);
    }, [e]),
    o = !!e.sessionId,
    i = e.mergeStatus === "merging",
    l = e.mergeStatus === "completed" && e.mergedSummary;
  return p.jsxs("div", {
    className: `px-6 py-4 text-white rounded-xl shadow-lg min-w-[240px] text-center cursor-pointer transition-colors relative ${i ? "bg-[var(--color-primary-400)] animate-pulse" : "bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-500)]"}`,
    onClick: r,
    children: [
      p.jsx(go, {
        type: "target",
        position: be.Left,
        className: "w-3 h-3 bg-[var(--color-cream-100)]",
      }),
      (e.inputTokens !== void 0 || e.outputTokens !== void 0) &&
        p.jsxs("div", {
          className:
            "absolute -top-2 -right-2 bg-white text-[var(--color-primary-600)] text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[var(--color-primary-600)] whitespace-nowrap",
          children: [
            "in:",
            ws(e.inputTokens || 0),
            " / out:",
            ws(e.outputTokens || 0),
          ],
        }),
      p.jsx("div", {
        className: "text-sm font-bold truncate max-w-[220px]",
        children: o ? e.sessionName || e.sessionId : "セッション未接続",
      }),
      o &&
        p.jsxs("div", {
          className: "flex items-center gap-2 mt-1",
          children: [
            e.projectName &&
              p.jsx("span", {
                className:
                  "px-1.5 py-0.5 bg-white/20 rounded text-xs truncate max-w-[100px]",
                title: e.projectName,
                children: e.projectName,
              }),
            e.sessionId &&
              p.jsx("span", {
                className: "text-xs opacity-60 font-mono truncate",
                children: e.sessionId,
              }),
          ],
        }),
      p.jsxs("div", {
        className: "text-xs opacity-90 mt-3 flex justify-center gap-3",
        children: [
          p.jsxs("span", {
            className: "bg-white/20 px-2 py-0.5 rounded",
            children: [e.observationCount, " obs"],
          }),
          p.jsxs("span", {
            className: "bg-white/20 px-2 py-0.5 rounded",
            children: ["+", e.connectedCount, " merged"],
          }),
        ],
      }),
      i &&
        p.jsx("div", {
          className: "text-xs mt-2 bg-white/30 px-2 py-1 rounded",
          children: "🔄 要約を生成中...",
        }),
      l &&
        p.jsxs("div", {
          className: "text-xs mt-2 bg-white/20 px-2 py-1 rounded text-left",
          children: [
            p.jsx("div", {
              className: "font-bold mb-1",
              children: "📝 統合要約:",
            }),
            p.jsx("div", {
              className: "line-clamp-2 opacity-90",
              children: (u = e.mergedSummary) == null ? void 0 : u.shortSummary,
            }),
            p.jsxs("div", {
              className: "opacity-60 mt-1",
              children: [
                (c = e.mergedSummary) == null ? void 0 : c.sessionCount,
                "セッション →",
                " ",
                ws(
                  ((f = e.mergedSummary) == null ? void 0 : f.mergedTokens) || 0
                ),
                " tokens",
              ],
            }),
          ],
        }),
      e.mergeStatus === "error" &&
        p.jsx("div", {
          className: "text-xs mt-2 bg-red-500/30 px-2 py-1 rounded",
          children: "⚠️ マージ失敗",
        }),
      p.jsx("div", {
        className: "text-xs opacity-60 mt-2",
        children: "クリックで Export",
      }),
    ],
  });
}
const ON = { session: $N, context: DN };
function FN({
  sessions: e = [],
  projects: r = [],
  currentSessionsData: o = [],
  theme: i = "dark",
  onGetSession: l,
  onExportSession: u,
  onDeleteRequest: c,
  pendingDelete: f,
  onDeleteComplete: h,
  onMerge: m,
  mergeStateByContext: x = {},
  onSessionDetail: y,
  hoveredSessionId: v,
}) {
  const w = k.useRef(dm()),
    S = k.useRef(IN()),
    _ = k.useRef(MN()),
    [C, b] = k.useState(_.current),
    [P, E] = k.useState({}),
    j = k.useRef(new Set()),
    [D, A, R] = Yk([]),
    [H, V, se] = Xk(S.current),
    X = k.useMemo(() => new Map(r.map((F) => [F.projectId, F.name])), [r]),
    Y = k.useCallback(
      (F) => {
        (R(F),
          F.filter(
            (re) => re.type === "position" && "position" in re && re.position
          ).length > 0 &&
            requestAnimationFrame(() => {
              A((re) => {
                const Q = {};
                return (
                  re.forEach((oe) => {
                    Q[oe.id] = oe.position;
                  }),
                  no(Q),
                  re
                );
              });
            }));
      },
      [R, A]
    ),
    te = k.useCallback(
      (F) => {
        (se(F),
          requestAnimationFrame(() => {
            V((Z) => (ms(Z), Z));
          }));
      },
      [se, V]
    ),
    L = k.useCallback(
      (F) => () => {
        (console.log("[Viewer] Export session:", F), u == null || u(F));
      },
      [u]
    );
  (k.useEffect(() => {
    A((F) => {
      const Z = w.current,
        re = new Set(
          F.filter((le) => le.id.startsWith("context-")).map((le) => le.id)
        ),
        Q = [];
      let oe = [...F],
        fe = 0;
      o.forEach((le) => {
        const ge = le.session;
        if (!ge) return;
        const ae = `context-${ge.sessionId}`,
          Ne = Z[ae],
          Me = Ne || cm(fe, oe, "context");
        if (!re.has(ae)) {
          const De = C[ae] || [],
            ze = x[ae] || { status: "idle", summary: null },
            Ge = {
              id: ae,
              type: "context",
              position: Me,
              data: {
                label: "進行中セッション",
                sessionId: ge.sessionId,
                sessionName: ge.name,
                status: ge.status,
                tokenCount: le.tokenCount,
                inputTokens: ge.inputTokens ?? le.inputTokens,
                outputTokens: ge.outputTokens ?? le.outputTokens,
                connectedCount: De.length,
                observationCount: le.observationCount,
                projectName: ge.projectId ? X.get(ge.projectId) : void 0,
                onExport: L(ge.sessionId),
                mergeStatus: ze.status,
                mergedSummary: ze.summary,
              },
            };
          (Q.push(Ge), (oe = [...oe, Ge]), fe++);
        }
      });
      const me = new Set(
          o
            .filter((le) => le.session)
            .map((le) => `context-${le.session.sessionId}`)
        ),
        ve = [
          ...F.filter((le) =>
            le.id.startsWith("context-") ? me.has(le.id) : !0
          ).map((le) => {
            if (le.id.startsWith("context-")) {
              const ge = le.id.replace("context-", ""),
                ae = o.find((Ne) => {
                  var Me;
                  return (
                    ((Me = Ne.session) == null ? void 0 : Me.sessionId) === ge
                  );
                });
              if (ae != null && ae.session) {
                const Ne = C[le.id] || [],
                  Me = x[le.id] || { status: "idle", summary: null };
                return {
                  ...le,
                  data: {
                    ...le.data,
                    sessionId: ae.session.sessionId,
                    sessionName: ae.session.name,
                    status: ae.session.status,
                    tokenCount: ae.tokenCount,
                    inputTokens: ae.session.inputTokens ?? ae.inputTokens,
                    outputTokens: ae.session.outputTokens ?? ae.outputTokens,
                    connectedCount: Ne.length,
                    observationCount: ae.observationCount,
                    projectName: ae.session.projectId
                      ? X.get(ae.session.projectId)
                      : void 0,
                    onExport: L(ae.session.sessionId),
                    mergeStatus: Me.status,
                    mergedSummary: Me.summary,
                  },
                };
              }
            }
            return le;
          }),
          ...Q,
        ],
        Ee = um(ve),
        de = Ee.changed ? Ee.nodes : ve;
      if (Q.length > 0) {
        const le = {};
        (de.forEach((ge) => {
          le[ge.id] = ge.position;
        }),
          no(le));
      }
      return de;
    });
  }, [o, C, L, A, x, X]),
    k.useEffect(() => {
      A((F) => {
        const Z = new Set(F.map((ae) => ae.id)),
          re = [],
          Q = w.current,
          oe = new Map(e.map((ae) => ["session-" + ae.sessionId, ae])),
          fe = F.map((ae) => {
            if (ae.type === "session") {
              const Ne = oe.get(ae.id);
              if (Ne) {
                const Me = Ne.projectId ? X.get(Ne.projectId) : void 0;
                if (
                  ae.data.label !== Ne.name ||
                  ae.data.projectName !== Me ||
                  ae.data.inputTokens !== Ne.inputTokens ||
                  ae.data.outputTokens !== Ne.outputTokens ||
                  ae.data.hasIssues !== Ne.hasIssues ||
                  ae.data.importance !== Ne.importance ||
                  ae.data.category !== Ne.category ||
                  ae.data.theme !== i
                )
                  return {
                    ...ae,
                    data: {
                      ...ae.data,
                      label: Ne.name,
                      status: Ne.status,
                      date: new Date(Ne.updatedAt).toLocaleDateString("ja-JP"),
                      tokenCount: Ne.tokenCount,
                      inputTokens: Ne.inputTokens,
                      outputTokens: Ne.outputTokens,
                      projectName: Me,
                      hasIssues: Ne.hasIssues,
                      issueType: Ne.issueType,
                      importance: Ne.importance,
                      category: Ne.category,
                      theme: i,
                    },
                  };
              }
            }
            return ae;
          });
        let me = [...fe],
          ye = 0;
        e.forEach((ae) => {
          const Ne = "session-" + ae.sessionId;
          if (!Z.has(Ne)) {
            const Me = Q[Ne],
              De = Me || cm(ye, me, "session"),
              ze = ae.projectId ? X.get(ae.projectId) : void 0,
              Ge = {
                id: Ne,
                type: "session",
                position: De,
                data: {
                  label: ae.name,
                  sessionId: ae.sessionId,
                  status: ae.status,
                  date: new Date(ae.updatedAt).toLocaleDateString("ja-JP"),
                  tokenCount: ae.tokenCount,
                  inputTokens: ae.inputTokens,
                  outputTokens: ae.outputTokens,
                  projectName: ze,
                  hasIssues: ae.hasIssues,
                  issueType: ae.issueType,
                  importance: ae.importance,
                  category: ae.category,
                  theme: i,
                  onClick: () => (y == null ? void 0 : y(ae.sessionId)),
                },
              };
            (re.push(Ge), (me = [...me, Ge]), ye++);
          }
        });
        const ve = new Set(e.map((ae) => "session-" + ae.sessionId)),
          de = [
            ...fe.filter((ae) => ae.id.startsWith("context-") || ve.has(ae.id)),
            ...re,
          ],
          le = um(de),
          ge = le.changed ? le.nodes : de;
        if (re.length > 0) {
          const ae = {};
          (ge.forEach((Ne) => {
            ae[Ne.id] = Ne.position;
          }),
            no(ae));
        }
        return ge;
      });
    }, [e, X, A, i, y]),
    k.useEffect(() => {
      A((F) =>
        F.map((Z) => {
          if (Z.type === "session") {
            const Q = Z.data.sessionId === v;
            if (Z.data.isHovered !== Q)
              return { ...Z, data: { ...Z.data, isHovered: Q } };
          }
          return Z;
        })
      );
    }, [v, A]),
    k.useEffect(() => {
      (async () => {
        for (const Z of o) {
          const re = Z.session;
          if (!re) continue;
          const Q = re.sessionId;
          if (j.current.has(Q)) continue;
          j.current.add(Q);
          const oe = await TN(Q);
          if (oe.length === 0) continue;
          const fe = [],
            me = {},
            ye = [];
          for (const Ee of oe) {
            const de = `reactflow__edge-session-${Ee.sourceSessionId}-context-${Q}`;
            (fe.push({
              id: de,
              source: `session-${Ee.sourceSessionId}`,
              target: `context-${Q}`,
            }),
              (me[de] = Ee.edgeId),
              ye.push(Ee.sourceSessionId));
          }
          (V((Ee) => {
            const de = new Set(Ee.map((ae) => ae.id)),
              le = fe.filter((ae) => !de.has(ae.id)),
              ge = [...Ee, ...le];
            return (ms(ge), ge);
          }),
            E((Ee) => ({ ...Ee, ...me })));
          const ve = `context-${Q}`;
          b((Ee) => {
            const de = Ee[ve] || [],
              le = [...new Set([...de, ...ye])],
              ge = { ...Ee, [ve]: le };
            return (yl(ge), ge);
          });
        }
      })();
    }, [o, V]));
  const G = _l((F) => F.lastEdgeCreated),
    B = _l((F) => F.clearEdgeEvents);
  k.useEffect(() => {
    if (!G) return;
    const { edgeId: F, sourceSessionId: Z, targetClaudeSessionId: re } = G,
      Q = `reactflow__edge-session-${Z}-context-${re}`;
    (V((fe) => {
      if (fe.some((ve) => ve.id === Q)) return fe;
      const me = { id: Q, source: `session-${Z}`, target: `context-${re}` },
        ye = [...fe, me];
      return (ms(ye), ye);
    }),
      E((fe) => ({ ...fe, [Q]: F })));
    const oe = `context-${re}`;
    (b((fe) => {
      const me = fe[oe] || [];
      if (me.includes(Z)) return fe;
      const ye = [...me, Z],
        ve = { ...fe, [oe]: ye };
      return (yl(ve), ve);
    }),
      A((fe) =>
        fe.map((me) => {
          if (me.id === oe) {
            const ye =
              typeof me.data.connectedCount == "number"
                ? me.data.connectedCount
                : 0;
            return { ...me, data: { ...me.data, connectedCount: ye + 1 } };
          }
          return me;
        })
      ),
      B(),
      console.log(`[NodeEditor] Edge created via WebSocket: ${Z} -> ${re}`));
  }, [G, V, A, B]);
  const K = _l((F) => F.lastEdgeDeleted),
    [z, $] = k.useState(!1);
  k.useEffect(() => {
    if (!K) return;
    const { edgeId: F, remainingContext: Z } = K;
    (Z &&
      ($(!0),
      console.log(
        `[NodeEditor] Edge deleted via WebSocket: ${F}. Context pending for /clear.`
      )),
      B());
  }, [K, B]);
  const U = k.useCallback(
      async (F) => {
        if (
          !(!F.source || !F.target) &&
          F.source.startsWith("session-") &&
          F.target.startsWith("context-")
        ) {
          const Z = F.source.replace("session-", ""),
            re = F.target.replace("context-", ""),
            Q = F.target,
            oe = C[Q] || [];
          if (oe.includes(Z)) return;
          const fe = await PN(Z, re);
          V((ve) => {
            var de;
            const Ee = P0(F, ve);
            if ((ms(Ee), fe)) {
              const le =
                (de = Ee.find(
                  (ge) => ge.source === F.source && ge.target === F.target
                )) == null
                  ? void 0
                  : de.id;
              le && E((ge) => ({ ...ge, [le]: fe.edgeId }));
            }
            return Ee;
          });
          const me = [...oe, Z],
            ye = { ...C, [Q]: me };
          (b(ye),
            yl(ye),
            A((ve) =>
              ve.map((Ee) =>
                Ee.id === Q
                  ? { ...Ee, data: { ...Ee.data, connectedCount: me.length } }
                  : Ee
              )
            ),
            l == null || l(Z),
            me.length >= 2 && m && m(Q, me));
        }
      },
      [C, V, A, l, m]
    ),
    M = k.useCallback(
      (F) => {
        const Z = H.find((oe) => oe.id === F);
        if (!Z) return;
        const re = Z.source.replace("session-", ""),
          Q = e.find((oe) => oe.sessionId === re);
        c == null ||
          c({ type: "edge", id: F, name: (Q == null ? void 0 : Q.name) || re });
      },
      [H, e, c]
    ),
    I = k.useCallback(
      (F, Z) => {
        M(Z.id);
      },
      [M]
    ),
    ne = k.useCallback(
      async (F) => {
        const Z = {};
        for (const Q of F)
          if (
            Q.source.startsWith("session-") &&
            Q.target.startsWith("context-")
          ) {
            const oe = Q.source.replace("session-", ""),
              fe = Q.target;
            (Z[fe] || (Z[fe] = []), Z[fe].push(oe));
          }
        for (const Q of F) {
          const oe = P[Q.id];
          oe &&
            (await RN(oe),
            E((fe) => {
              const me = { ...fe };
              return (delete me[Q.id], me);
            }));
        }
        const re = { ...C };
        for (const [Q, oe] of Object.entries(Z)) {
          const fe = re[Q] || [];
          ((re[Q] = fe.filter((me) => !oe.includes(me))),
            re[Q].length === 0 && delete re[Q]);
        }
        (b(re),
          yl(re),
          V((Q) => (ms(Q), Q)),
          A((Q) =>
            Q.map((oe) => {
              var fe;
              if (oe.id.startsWith("context-") && Z[oe.id]) {
                const me = ((fe = re[oe.id]) == null ? void 0 : fe.length) || 0;
                return { ...oe, data: { ...oe.data, connectedCount: me } };
              }
              return oe;
            })
          ));
      },
      [C, A, V, P]
    ),
    ie = k.useCallback(
      (F, Z) => {
        const re = D.map((oe) =>
            oe.id === Z.id ? { ...oe, position: Z.position } : oe
          ),
          Q = _g(Z, re);
        if (Q.x !== Z.position.x || Q.y !== Z.position.y)
          A((oe) => {
            const fe = oe.map((ye) =>
                ye.id === Z.id ? { ...ye, position: Q } : ye
              ),
              me = {};
            return (
              fe.forEach((ye) => {
                me[ye.id] = ye.position;
              }),
              no(me),
              fe
            );
          });
        else {
          const oe = {};
          (re.forEach((fe) => {
            oe[fe.id] = fe.position;
          }),
            no(oe));
        }
      },
      [D, A]
    );
  return (
    k.useEffect(() => {
      if (f) {
        if (f.type === "edge") {
          const F = H.find((Z) => Z.id === f.id);
          F && (ne([F]), V((Z) => Z.filter((re) => re.id !== f.id)));
        } else if (f.type === "node" && !f.id.startsWith("context-")) {
          const F = H.filter((re) => re.source === f.id || re.target === f.id);
          (F.length > 0 &&
            (ne(F),
            V((re) =>
              re.filter((Q) => Q.source !== f.id && Q.target !== f.id)
            )),
            A((re) => re.filter((Q) => Q.id !== f.id)));
          const Z = dm();
          (delete Z[f.id], no(Z));
        }
        h == null || h();
      }
    }, [f, H, ne, V, A, h]),
    p.jsxs("div", {
      className: `w-full h-full bg-[var(--bg-base)] relative ${i === "dark" ? "react-flow-theme-dark" : ""}`,
      children: [
        p.jsxs(Uk, {
          nodes: D,
          edges: H,
          onNodesChange: Y,
          onEdgesChange: te,
          onConnect: U,
          onEdgesDelete: ne,
          onEdgeClick: I,
          onNodeDragStop: ie,
          nodeTypes: ON,
          fitView: !0,
          proOptions: { hideAttribution: !0 },
          className: "bg-[var(--bg-base)]",
          children: [
            p.jsx(oN, {
              className:
                "bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg",
            }),
            p.jsx(yN, {
              className:
                "bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg",
              nodeColor: "#d97757",
              maskColor: "rgba(15, 15, 14, 0.8)",
            }),
          ],
        }),
        z &&
          p.jsx("div", {
            className:
              "absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50",
            children: p.jsxs("div", {
              className:
                "bg-yellow-500/90 text-black px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md",
              children: [
                p.jsx("span", { className: "text-xl", children: "⚠️" }),
                p.jsxs("div", {
                  className: "flex-1",
                  children: [
                    p.jsx("div", {
                      className: "font-semibold",
                      children: "コンテキストが変更されました",
                    }),
                    p.jsxs("div", {
                      className: "text-sm opacity-80",
                      children: [
                        "Claude Code で",
                        " ",
                        p.jsx("code", {
                          className: "bg-black/20 px-1 rounded",
                          children: "/clear",
                        }),
                        " ",
                        "を実行してください。残りのセッションは自動的に復元されます。",
                      ],
                    }),
                  ],
                }),
                p.jsx("button", {
                  onClick: () => $(!1),
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
const HN = Uc((e) => ({
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
  BN = {
    global: "bg-blue-500/20 text-blue-400",
    project: "bg-green-500/20 text-green-400",
    plugin: "bg-purple-500/20 text-purple-400",
  },
  VN = { skills: i1, hooks: l1, mcp: a1, rules: u1 },
  WN = {
    skills: "bg-[var(--color-primary-500)]",
    hooks: "bg-amber-500",
    mcp: "bg-cyan-500",
    rules: "bg-emerald-500",
  };
function UN({ onOptimize: e }) {
  var $, U, M;
  const { projects: r, fetchProjects: o } = Yc(),
    {
      skills: i,
      hooks: l,
      mcpServers: u,
      rules: c,
      loading: f,
      fetchSystemContext: h,
    } = HN(),
    [m, x] = k.useState("skills"),
    [y, v] = k.useState(null),
    [w, S] = k.useState(null),
    [_, C] = k.useState(new Set()),
    [b, P] = k.useState(""),
    [E, j] = k.useState(!1),
    [D, A] = k.useState(!1),
    [R, H] = k.useState(!1),
    [V, se] = k.useState(null);
  (k.useEffect(() => {
    o();
  }, [o]),
    k.useEffect(() => {
      const I = r.find((ne) => ne.projectId === y);
      h(I == null ? void 0 : I.path);
    }, [y, r, h]),
    k.useMemo(() => {
      var I;
      if (y)
        return (I = r.find((ne) => ne.projectId === y)) == null
          ? void 0
          : I.path;
    }, [y, r]));
  const X = k.useMemo(() => {
      var I;
      if (w)
        return (I = r.find((ne) => ne.projectId === w)) == null
          ? void 0
          : I.path;
    }, [w, r]),
    Y = k.useMemo(() => {
      switch (m) {
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
    }, [m, i, l, u, c]),
    te = k.useMemo(() => {
      if (!b) return Y;
      const I = b.toLowerCase();
      return Y.filter((ne) => {
        const ie = "name" in ne ? ne.name : "event" in ne ? ne.event : "",
          F = "description" in ne ? ne.description : "";
        return (
          ie.toLowerCase().includes(I) ||
          (F == null ? void 0 : F.toLowerCase().includes(I))
        );
      });
    }, [Y, b]),
    L = k.useCallback(
      (I) =>
        "name" in I && "path" in I
          ? `${I.source}:${I.name}`
          : "event" in I
            ? `${I.source}:${I.event}:${I.command}`
            : `${I.source}:${JSON.stringify(I)}`,
      []
    ),
    G = k.useCallback(
      (I) => ("name" in I ? I.name : "event" in I ? I.event : "Unknown"),
      []
    ),
    B = k.useCallback(
      (I) => {
        const ne = L(I);
        C((ie) => {
          const F = new Set(ie);
          return (F.has(ne) ? F.delete(ne) : F.add(ne), F);
        });
      },
      [L]
    ),
    K = k.useCallback(() => {
      _.size === te.length ? C(new Set()) : C(new Set(te.map(L)));
    }, [te, _.size, L]),
    z = k.useCallback(async () => {
      if (!(!X || _.size === 0)) {
        (H(!0), se(null));
        try {
          const I = te
              .filter((F) => _.has(L(F)))
              .filter((F) => "path" in F)
              .map((F) => ({ type: m, sourcePath: F.path, name: G(F) })),
            ne = await fetch("/api/system-context/copy", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items: I, targetProjectPath: X }),
            });
          if (!ne.ok) {
            const F = await ne.json();
            throw new Error(F.error || "コピーに失敗しました");
          }
          const ie = await ne.json();
          (se({ success: !0, message: `${ie.copied}件をコピーしました` }),
            C(new Set()));
        } catch (I) {
          se({
            success: !1,
            message: I instanceof Error ? I.message : "コピーに失敗しました",
          });
        } finally {
          H(!1);
        }
      }
    }, [X, _, te, m, L, G]);
  return (
    k.useEffect(() => {
      C(new Set());
    }, [m]),
    p.jsxs("div", {
      className: "h-full flex flex-col bg-[var(--bg-base)]",
      children: [
        p.jsxs("div", {
          className:
            "flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]",
          children: [
            ["skills", "hooks", "mcp", "rules"].map((I) => {
              const ne = VN[I],
                ie =
                  I === "skills"
                    ? i.length
                    : I === "hooks"
                      ? l.length
                      : I === "mcp"
                        ? u.length
                        : c.length;
              return p.jsxs(
                "button",
                {
                  onClick: () => x(I),
                  className: `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${m === I ? `${WN[I]} text-white` : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"}`,
                  children: [
                    p.jsx(ne, { className: "w-4 h-4" }),
                    p.jsx("span", { className: "capitalize", children: I }),
                    p.jsx("span", {
                      className: `px-1.5 py-0.5 rounded text-xs ${m === I ? "bg-white/20" : "bg-[var(--bg-elevated)]"}`,
                      children: ie,
                    }),
                  ],
                },
                I
              );
            }),
            p.jsx("div", { className: "flex-1" }),
            e &&
              p.jsx("button", {
                onClick: () => e(m, Array.from(_)),
                disabled: _.size === 0,
                className:
                  "px-3 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-400)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                children: "最適化",
              }),
          ],
        }),
        p.jsxs("div", {
          className: "flex-1 flex overflow-hidden",
          children: [
            p.jsxs("div", {
              className:
                "w-1/2 flex flex-col border-r border-[var(--border-subtle)]",
              children: [
                p.jsxs("div", {
                  className:
                    "p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]",
                  children: [
                    p.jsxs("div", {
                      className: "relative",
                      children: [
                        p.jsxs("button", {
                          onClick: () => j(!E),
                          className:
                            "w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors",
                          children: [
                            p.jsxs("div", {
                              className: "flex items-center gap-2",
                              children: [
                                p.jsx(Sl, {
                                  className: "w-4 h-4 text-[var(--text-muted)]",
                                }),
                                p.jsx("span", {
                                  className:
                                    "text-sm text-[var(--text-primary)]",
                                  children: y
                                    ? ($ = r.find((I) => I.projectId === y)) ==
                                      null
                                      ? void 0
                                      : $.name
                                    : "グローバル設定",
                                }),
                              ],
                            }),
                            p.jsx(wc, {
                              className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${E ? "rotate-180" : ""}`,
                            }),
                          ],
                        }),
                        E &&
                          p.jsxs("div", {
                            className:
                              "absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto",
                            children: [
                              p.jsx("button", {
                                onClick: () => {
                                  (v(null), j(!1));
                                },
                                className: `w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${y ? "text-[var(--text-primary)]" : "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"}`,
                                children: "グローバル設定",
                              }),
                              r.map((I) =>
                                p.jsx(
                                  "button",
                                  {
                                    onClick: () => {
                                      (v(I.projectId), j(!1));
                                    },
                                    className: `w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${y === I.projectId ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]" : "text-[var(--text-primary)]"}`,
                                    children: I.name,
                                  },
                                  I.projectId
                                )
                              ),
                            ],
                          }),
                      ],
                    }),
                    p.jsxs("div", {
                      className: "mt-2 relative",
                      children: [
                        p.jsx(qx, {
                          className:
                            "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]",
                        }),
                        p.jsx("input", {
                          type: "text",
                          value: b,
                          onChange: (I) => P(I.target.value),
                          placeholder: "検索...",
                          className:
                            "w-full pl-9 pr-3 py-2 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]",
                        }),
                      ],
                    }),
                  ],
                }),
                p.jsx("div", {
                  className: "flex-1 overflow-y-auto p-2",
                  children: f
                    ? p.jsx("div", {
                        className: "space-y-2 p-2",
                        children: [1, 2, 3].map((I) =>
                          p.jsx(
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
                      ? p.jsx("div", {
                          className: "p-4 text-center text-[var(--text-muted)]",
                          children: b
                            ? "検索結果がありません"
                            : "アイテムがありません",
                        })
                      : p.jsx("div", {
                          className: "space-y-1",
                          children: te.map((I) => {
                            const ne = L(I),
                              ie = _.has(ne),
                              F = G(I),
                              Z = I.source,
                              re = "description" in I ? I.description : void 0;
                            return p.jsxs(
                              "div",
                              {
                                onClick: () => B(I),
                                className: `p-3 rounded-lg cursor-pointer transition-colors ${ie ? "bg-[var(--color-primary-500)]/20 border border-[var(--color-primary-500)]" : "bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] border border-transparent"}`,
                                children: [
                                  p.jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      p.jsx("div", {
                                        className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${ie ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]" : "border-[var(--border-default)]"}`,
                                        children:
                                          ie &&
                                          p.jsx(Ns, {
                                            className: "w-3 h-3 text-white",
                                          }),
                                      }),
                                      p.jsx("span", {
                                        className:
                                          "flex-1 text-sm font-medium text-[var(--text-primary)] truncate",
                                        children: F,
                                      }),
                                      p.jsx("span", {
                                        className: `px-1.5 py-0.5 rounded text-xs ${BN[Z]}`,
                                        children: Z[0].toUpperCase(),
                                      }),
                                    ],
                                  }),
                                  re &&
                                    p.jsx("div", {
                                      className:
                                        "mt-1 ml-7 text-xs text-[var(--text-muted)] line-clamp-2",
                                      children: re,
                                    }),
                                ],
                              },
                              ne
                            );
                          }),
                        }),
                }),
                p.jsxs("div", {
                  className:
                    "p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-2",
                  children: [
                    p.jsx("button", {
                      onClick: K,
                      className:
                        "px-3 py-1.5 rounded text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors",
                      children: _.size === te.length ? "全解除" : "全選択",
                    }),
                    p.jsxs("span", {
                      className: "text-sm text-[var(--text-muted)]",
                      children: [_.size, "件選択中"],
                    }),
                  ],
                }),
              ],
            }),
            p.jsxs("div", {
              className: "w-1/2 flex flex-col",
              children: [
                p.jsx("div", {
                  className:
                    "p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]",
                  children: p.jsxs("div", {
                    className: "relative",
                    children: [
                      p.jsxs("button", {
                        onClick: () => A(!D),
                        className:
                          "w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors",
                        children: [
                          p.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              p.jsx(Sl, {
                                className: "w-4 h-4 text-[var(--text-muted)]",
                              }),
                              p.jsx("span", {
                                className: "text-sm text-[var(--text-primary)]",
                                children: w
                                  ? (U = r.find((I) => I.projectId === w)) ==
                                    null
                                    ? void 0
                                    : U.name
                                  : "コピー先を選択...",
                              }),
                            ],
                          }),
                          p.jsx(wc, {
                            className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${D ? "rotate-180" : ""}`,
                          }),
                        ],
                      }),
                      D &&
                        p.jsx("div", {
                          className:
                            "absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto",
                          children: r
                            .filter((I) => I.projectId !== y)
                            .map((I) =>
                              p.jsxs(
                                "button",
                                {
                                  onClick: () => {
                                    (S(I.projectId), A(!1));
                                  },
                                  className: `w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${w === I.projectId ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]" : "text-[var(--text-primary)]"}`,
                                  children: [
                                    p.jsx("div", { children: I.name }),
                                    p.jsx("div", {
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
                p.jsx("div", {
                  className:
                    "flex-1 flex flex-col items-center justify-center p-8 text-center",
                  children: w
                    ? _.size === 0
                      ? p.jsxs("div", {
                          className: "text-[var(--text-muted)]",
                          children: [
                            p.jsx(Ns, {
                              className: "w-16 h-16 mx-auto mb-4 opacity-30",
                            }),
                            p.jsx("p", {
                              children:
                                "左のリストからコピーするアイテムを選択してください",
                            }),
                          ],
                        })
                      : p.jsxs("div", {
                          className: "w-full max-w-sm",
                          children: [
                            p.jsxs("div", {
                              className:
                                "text-lg font-medium text-[var(--text-primary)] mb-4",
                              children: [
                                _.size,
                                "件を",
                                p.jsx("br", {}),
                                p.jsx("span", {
                                  className: "text-[var(--color-primary-400)]",
                                  children:
                                    (M = r.find((I) => I.projectId === w)) ==
                                    null
                                      ? void 0
                                      : M.name,
                                }),
                                p.jsx("br", {}),
                                "にコピー",
                              ],
                            }),
                            p.jsx("button", {
                              onClick: z,
                              disabled: R,
                              className:
                                "w-full px-6 py-3 rounded-lg text-sm font-medium bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-400)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                              children: R ? "コピー中..." : "コピーを実行",
                            }),
                            V &&
                              p.jsx("div", {
                                className: `mt-4 p-3 rounded-lg text-sm ${V.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`,
                                children: V.message,
                              }),
                          ],
                        })
                    : p.jsxs("div", {
                        className: "text-[var(--text-muted)]",
                        children: [
                          p.jsx(Sl, {
                            className: "w-16 h-16 mx-auto mb-4 opacity-30",
                          }),
                          p.jsx("p", {
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
function gc(e) {
  return e >= 1e3 ? (e / 1e3).toFixed(1) + "k" : e.toString();
}
function YN(e) {
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
function XN({
  isOpen: e,
  onClose: r,
  sessionId: o,
  sessionName: i,
  onExportComplete: l,
}) {
  const [u, c] = k.useState(!1),
    [f, h] = k.useState(!1),
    [m, x] = k.useState(null),
    [y, v] = k.useState(new Set()),
    [w, S] = k.useState(null),
    [_, C] = k.useState(new Set()),
    b = k.useCallback(async () => {
      var R;
      (c(!0), S(null));
      try {
        const H = await fetch(`/api/sessions/${o}/analyze`, { method: "POST" });
        if (!H.ok) {
          const se = await H.json();
          throw new Error(
            ((R = se.error) == null ? void 0 : R.message) ||
              "分析に失敗しました"
          );
        }
        const V = await H.json();
        x(V);
      } catch (H) {
        S(H instanceof Error ? H.message : "分析に失敗しました");
      } finally {
        c(!1);
      }
    }, [o]);
  (k.useEffect(() => {
    e && !m && !u && b();
  }, [e, m, u, b]),
    k.useEffect(() => {
      e || (x(null), v(new Set()), S(null), C(new Set()));
    }, [e]));
  const P = k.useCallback((R) => {
      v((H) => {
        const V = new Set(H);
        return (V.has(R) ? V.delete(R) : V.add(R), V);
      });
    }, []),
    E = k.useCallback((R) => {
      C((H) => {
        const V = new Set(H);
        return (V.has(R) ? V.delete(R) : V.add(R), V);
      });
    }, []),
    j = k.useCallback(
      () =>
        m
          ? m.groups
              .filter((R) => y.has(R.category))
              .flatMap((R) => R.observationIds)
          : [],
      [m, y]
    ),
    D = k.useCallback(
      () =>
        m
          ? m.groups
              .filter((R) => y.has(R.category))
              .reduce((R, H) => R + H.estimatedTokens, 0)
          : 0,
      [m, y]
    ),
    A = k.useCallback(async () => {
      var se, X;
      const R = j();
      if (R.length === 0) return;
      const H =
          m == null
            ? void 0
            : m.groups
                .filter((Y) => y.has(Y.category))
                .map((Y) => Y.description)
                .join(", "),
        V =
          window.prompt(
            `Export: ${R.length} observations

新しいセッション名を入力してください:`,
            `Export: ${H}`
          ) || `Export from ${i}`;
      if (V) {
        (h(!0), S(null));
        try {
          const Y = await fetch(`/api/sessions/${o}/smart-export`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              observationIds: R,
              groupName: V,
              deleteAfterExport: !0,
            }),
          });
          if (!Y.ok) {
            const L = await Y.json();
            throw new Error(
              ((se = L.error) == null ? void 0 : se.message) ||
                "Export に失敗しました"
            );
          }
          const te = await Y.json();
          (alert(`Export 完了!

新しいセッション: ${(X = te.session) == null ? void 0 : X.sessionId}
削除した observations: ${te.deletedCount}`),
            l(),
            r());
        } catch (Y) {
          S(Y instanceof Error ? Y.message : "Export に失敗しました");
        } finally {
          h(!1);
        }
      }
    }, [j, m, y, o, i, l, r]);
  return e
    ? p.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          p.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: r,
          }),
          p.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[600px] max-h-[80vh] flex flex-col border border-[var(--border-default)]",
            children: [
              p.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  p.jsxs("div", {
                    children: [
                      p.jsx("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: "Smart Export",
                      }),
                      p.jsx("p", {
                        className: "text-sm text-[var(--text-muted)] mt-1",
                        children: i,
                      }),
                    ],
                  }),
                  p.jsx("button", {
                    onClick: r,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                    children: p.jsx("svg", {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: p.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12",
                      }),
                    }),
                  }),
                ],
              }),
              p.jsxs("div", {
                className: "flex-1 overflow-y-auto px-6 py-4",
                children: [
                  u &&
                    p.jsxs("div", {
                      className:
                        "flex flex-col items-center justify-center py-12",
                      children: [
                        p.jsx("div", {
                          className:
                            "w-8 h-8 border-2 border-[var(--color-primary-500)] border-t-transparent rounded-full animate-spin",
                        }),
                        p.jsx("p", {
                          className: "mt-4 text-[var(--text-muted)]",
                          children: "AI で分析中...",
                        }),
                      ],
                    }),
                  w &&
                    p.jsxs("div", {
                      className:
                        "bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4",
                      children: [
                        p.jsx("p", { className: "text-red-400", children: w }),
                        p.jsx("button", {
                          onClick: b,
                          className:
                            "mt-2 text-sm text-red-400 hover:text-red-300 underline",
                          children: "再試行",
                        }),
                      ],
                    }),
                  m &&
                    !u &&
                    p.jsxs(p.Fragment, {
                      children: [
                        p.jsxs("div", {
                          className: "flex gap-4 mb-6 text-sm",
                          children: [
                            p.jsxs("div", {
                              className:
                                "bg-[var(--bg-elevated)] px-3 py-2 rounded-lg",
                              children: [
                                p.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "総数: ",
                                }),
                                p.jsxs("span", {
                                  className:
                                    "text-[var(--text-primary)] font-medium",
                                  children: [m.totalObservations, " obs"],
                                }),
                              ],
                            }),
                            p.jsxs("div", {
                              className:
                                "bg-[var(--bg-elevated)] px-3 py-2 rounded-lg",
                              children: [
                                p.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "トークン: ",
                                }),
                                p.jsx("span", {
                                  className:
                                    "text-[var(--text-primary)] font-medium",
                                  children: gc(m.totalEstimatedTokens),
                                }),
                              ],
                            }),
                            p.jsxs("div", {
                              className:
                                "bg-[var(--bg-elevated)] px-3 py-2 rounded-lg",
                              children: [
                                p.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "分析時間: ",
                                }),
                                p.jsxs("span", {
                                  className:
                                    "text-[var(--text-primary)] font-medium",
                                  children: [
                                    (m.analysisTimeMs / 1e3).toFixed(1),
                                    "s",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        p.jsx("div", {
                          className: "space-y-3",
                          children: m.groups.map((R) =>
                            p.jsxs(
                              "div",
                              {
                                className: `border rounded-lg overflow-hidden transition-colors ${y.has(R.category) ? "border-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10" : "border-[var(--border-default)] bg-[var(--bg-elevated)]"}`,
                                children: [
                                  p.jsxs("div", {
                                    className:
                                      "flex items-center gap-3 p-4 cursor-pointer",
                                    onClick: () => P(R.category),
                                    children: [
                                      p.jsx("div", {
                                        className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${y.has(R.category) ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]" : "border-[var(--border-default)]"}`,
                                        children:
                                          y.has(R.category) &&
                                          p.jsx("svg", {
                                            className: "w-3 h-3 text-white",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: p.jsx("path", {
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              strokeWidth: 3,
                                              d: "M5 13l4 4L19 7",
                                            }),
                                          }),
                                      }),
                                      p.jsx("span", {
                                        className: "text-xl",
                                        children: YN(R.category),
                                      }),
                                      p.jsxs("div", {
                                        className: "flex-1",
                                        children: [
                                          p.jsxs("div", {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              p.jsx("span", {
                                                className:
                                                  "font-medium text-[var(--text-primary)]",
                                                children: R.categoryLabel,
                                              }),
                                              p.jsxs("span", {
                                                className:
                                                  "text-sm text-[var(--text-muted)]",
                                                children: [
                                                  "(",
                                                  R.observationIds.length,
                                                  " obs)",
                                                ],
                                              }),
                                            ],
                                          }),
                                          p.jsx("p", {
                                            className:
                                              "text-sm text-[var(--text-muted)] mt-0.5",
                                            children: R.description,
                                          }),
                                        ],
                                      }),
                                      p.jsxs("div", {
                                        className:
                                          "text-sm text-[var(--text-muted)]",
                                        children: [
                                          gc(R.estimatedTokens),
                                          " tokens",
                                        ],
                                      }),
                                      p.jsx("button", {
                                        onClick: (H) => {
                                          (H.stopPropagation(), E(R.category));
                                        },
                                        className:
                                          "p-1 hover:bg-[var(--bg-surface)] rounded transition-colors",
                                        children: p.jsx("svg", {
                                          className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${_.has(R.category) ? "rotate-180" : ""}`,
                                          fill: "none",
                                          stroke: "currentColor",
                                          viewBox: "0 0 24 24",
                                          children: p.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 9l-7 7-7-7",
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                  _.has(R.category) &&
                                    p.jsx("div", {
                                      className: "px-4 pb-4 pt-0",
                                      children: p.jsx("div", {
                                        className:
                                          "bg-[var(--bg-base)] rounded-lg p-3 text-xs font-mono text-[var(--text-muted)] max-h-32 overflow-y-auto",
                                        children: R.observationIds.map((H, V) =>
                                          p.jsxs(
                                            "div",
                                            {
                                              children: [
                                                H,
                                                V <
                                                  R.observationIds.length - 1 &&
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
                              R.category
                            )
                          ),
                        }),
                      ],
                    }),
                ],
              }),
              p.jsxs("div", {
                className:
                  "px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  p.jsx("div", {
                    className: "text-sm text-[var(--text-muted)]",
                    children:
                      y.size > 0 &&
                      p.jsxs(p.Fragment, {
                        children: [
                          "選択中: ",
                          j().length,
                          " obs (",
                          gc(D()),
                          " tokens)",
                        ],
                      }),
                  }),
                  p.jsxs("div", {
                    className: "flex gap-3",
                    children: [
                      p.jsx("button", {
                        onClick: r,
                        className:
                          "px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                        children: "キャンセル",
                      }),
                      p.jsx("button", {
                        onClick: A,
                        disabled: y.size === 0 || f || u,
                        className: `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${y.size === 0 || f || u ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed" : "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]"}`,
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
const fm = { session: "セッション", node: "ノード", edge: "接続" };
function hm({
  isOpen: e,
  onClose: r,
  onConfirm: o,
  targetType: i,
  targetName: l,
  targetId: u,
}) {
  const [c, f] = k.useState(!1),
    [h, m] = k.useState(null),
    x = k.useCallback(async () => {
      (f(!0), m(null));
      try {
        (await o(), r());
      } catch (v) {
        m(v instanceof Error ? v.message : "削除に失敗しました");
      } finally {
        f(!1);
      }
    }, [o, r]),
    y = k.useCallback(() => {
      c || (m(null), r());
    }, [c, r]);
  return e
    ? p.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          p.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: y,
          }),
          p.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[400px] border border-[var(--border-default)]",
            children: [
              p.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  p.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      p.jsx("div", {
                        className: "p-2 bg-red-500/10 rounded-lg",
                        children: p.jsx(Es, {
                          className: "w-5 h-5 text-red-500",
                        }),
                      }),
                      p.jsxs("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: [fm[i], "を削除"],
                      }),
                    ],
                  }),
                  p.jsx("button", {
                    onClick: y,
                    disabled: c,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                    children: p.jsx(ks, {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                    }),
                  }),
                ],
              }),
              p.jsxs("div", {
                className: "px-6 py-6",
                children: [
                  p.jsxs("p", {
                    className: "text-[var(--text-secondary)]",
                    children: ["以下の", fm[i], "を削除しますか？"],
                  }),
                  p.jsxs("div", {
                    className: "mt-4 p-4 bg-[var(--bg-elevated)] rounded-lg",
                    children: [
                      p.jsx("p", {
                        className:
                          "font-medium text-[var(--text-primary)] truncate",
                        children: l,
                      }),
                      u &&
                        p.jsx("p", {
                          className:
                            "text-xs text-[var(--text-muted)] font-mono mt-1 truncate",
                          children: u,
                        }),
                    ],
                  }),
                  p.jsx("p", {
                    className: "mt-4 text-sm text-[var(--text-muted)]",
                    children: "この操作は取り消せません。",
                  }),
                  h &&
                    p.jsx("div", {
                      className:
                        "mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3",
                      children: p.jsx("p", {
                        className: "text-sm text-red-400",
                        children: h,
                      }),
                    }),
                ],
              }),
              p.jsxs("div", {
                className:
                  "px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-3",
                children: [
                  p.jsx("button", {
                    onClick: y,
                    disabled: c,
                    className:
                      "px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                    children: "キャンセル",
                  }),
                  p.jsx("button", {
                    onClick: x,
                    disabled: c,
                    className:
                      "px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2",
                    children: c
                      ? p.jsxs(p.Fragment, {
                          children: [
                            p.jsx("div", {
                              className:
                                "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin",
                            }),
                            "削除中...",
                          ],
                        })
                      : p.jsxs(p.Fragment, {
                          children: [
                            p.jsx(Es, { className: "w-4 h-4" }),
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
function KN({
  isOpen: e,
  onClose: r,
  sessionId: o,
  onDelete: i,
  onNameChange: l,
}) {
  const [u, c] = k.useState(null),
    [f, h] = k.useState(!1),
    [m, x] = k.useState(null),
    [y, v] = k.useState(!1),
    [w, S] = k.useState(""),
    [_, C] = k.useState(!1);
  k.useEffect(() => {
    if (!e || !o) return;
    (async () => {
      var H;
      (h(!0), x(null));
      try {
        const [V, se, X] = await Promise.all([
          fetch(`/api/sessions/${o}`),
          fetch(`/api/sessions/${o}/summary`),
          fetch(`/api/sessions/${o}/observations?limit=1`),
        ]);
        if (!V.ok) throw new Error("セッション情報の取得に失敗しました");
        const Y = await V.json(),
          te = se.ok ? await se.json() : null,
          L = X.ok ? await X.json() : null;
        c({
          ...Y,
          summary: te == null ? void 0 : te.summary,
          observationCount:
            ((H = L == null ? void 0 : L.pagination) == null
              ? void 0
              : H.total) || Y.observationCount,
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
  const b = k.useCallback(() => {
      (c(null), x(null), v(!1), S(""), r());
    }, [r]),
    P = k.useCallback(() => {
      u && (S(u.name), v(!0));
    }, [u]),
    E = k.useCallback(() => {
      (v(!1), S(""));
    }, []),
    j = k.useCallback(async () => {
      if (!(!u || !w.trim())) {
        C(!0);
        try {
          if (
            !(
              await fetch(`/api/sessions/${u.sessionId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: w.trim() }),
              })
            ).ok
          )
            throw new Error("名前の更新に失敗しました");
          const H = w.trim();
          (c({ ...u, name: H }), v(!1), S(""), l == null || l(u.sessionId, H));
        } catch (R) {
          alert(R instanceof Error ? R.message : "名前の更新に失敗しました");
        } finally {
          C(!1);
        }
      }
    }, [u, w, l]);
  if (
    (k.useEffect(() => {
      if (!e) return;
      const R = (H) => {
        H.key === "Escape" && b();
      };
      return (
        document.addEventListener("keydown", R),
        () => document.removeEventListener("keydown", R)
      );
    }, [e, b]),
    !e)
  )
    return null;
  const D = (R) =>
      new Date(R).toLocaleString("ja-JP", {
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
  return p.jsxs("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center",
    children: [
      p.jsx("div", {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: b,
      }),
      p.jsxs("div", {
        className:
          "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[500px] max-h-[80vh] border border-[var(--border-default)] flex flex-col",
        children: [
          p.jsxs("div", {
            className:
              "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between flex-shrink-0",
            children: [
              p.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  p.jsx("div", {
                    className:
                      "p-2 bg-[var(--color-primary-500)]/10 rounded-lg",
                    children: p.jsx(ep, {
                      className: "w-5 h-5 text-[var(--color-primary-500)]",
                    }),
                  }),
                  p.jsx("h2", {
                    className:
                      "text-lg font-semibold text-[var(--text-primary)]",
                    children: "セッション詳細",
                  }),
                ],
              }),
              p.jsx("button", {
                onClick: b,
                className:
                  "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                children: p.jsx(ks, {
                  className: "w-5 h-5 text-[var(--text-muted)]",
                }),
              }),
            ],
          }),
          p.jsx("div", {
            className: "flex-1 overflow-y-auto px-6 py-4",
            children: f
              ? p.jsxs("div", {
                  className: "space-y-4",
                  children: [
                    p.jsx("div", {
                      className:
                        "h-6 bg-[var(--bg-elevated)] rounded animate-pulse",
                    }),
                    p.jsx("div", {
                      className:
                        "h-4 bg-[var(--bg-elevated)] rounded animate-pulse w-3/4",
                    }),
                    p.jsx("div", {
                      className:
                        "h-20 bg-[var(--bg-elevated)] rounded animate-pulse",
                    }),
                  ],
                })
              : m
                ? p.jsx("div", {
                    className:
                      "bg-red-500/10 border border-red-500/30 rounded-lg p-4",
                    children: p.jsx("p", {
                      className: "text-sm text-red-400",
                      children: m,
                    }),
                  })
                : u
                  ? p.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        p.jsxs("div", {
                          children: [
                            y
                              ? p.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    p.jsx("input", {
                                      type: "text",
                                      value: w,
                                      onChange: (R) => S(R.target.value),
                                      className:
                                        "flex-1 px-3 py-2 text-lg font-medium bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary-400)]",
                                      autoFocus: !0,
                                      onKeyDown: (R) => {
                                        (R.key === "Enter" && j(),
                                          R.key === "Escape" && E());
                                      },
                                    }),
                                    p.jsx("button", {
                                      onClick: j,
                                      disabled: _ || !w.trim(),
                                      className:
                                        "p-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] disabled:opacity-50 transition-colors",
                                      title: "保存",
                                      children: p.jsx(Ns, {
                                        className: "w-5 h-5",
                                      }),
                                    }),
                                    p.jsx("button", {
                                      onClick: E,
                                      className:
                                        "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                                      title: "キャンセル",
                                      children: p.jsx(ks, {
                                        className:
                                          "w-5 h-5 text-[var(--text-muted)]",
                                      }),
                                    }),
                                  ],
                                })
                              : p.jsxs("div", {
                                  className: "flex items-center gap-2 group",
                                  children: [
                                    p.jsx("h3", {
                                      className:
                                        "text-xl font-medium text-[var(--text-primary)]",
                                      children: u.name,
                                    }),
                                    p.jsx("button", {
                                      onClick: P,
                                      className:
                                        "p-1.5 opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-elevated)] rounded-lg transition-all",
                                      title: "名前を編集",
                                      children: p.jsx(Am, {
                                        className:
                                          "w-4 h-4 text-[var(--text-muted)]",
                                      }),
                                    }),
                                  ],
                                }),
                            p.jsxs("div", {
                              className: "flex items-center gap-2 mt-2",
                              children: [
                                p.jsx("span", {
                                  className: `w-2 h-2 rounded-full ${A[u.status] || "bg-gray-500"}`,
                                }),
                                p.jsx("span", {
                                  className:
                                    "text-sm text-[var(--text-secondary)] capitalize",
                                  children: u.status,
                                }),
                              ],
                            }),
                          ],
                        }),
                        p.jsxs("div", {
                          className:
                            "bg-[var(--bg-elevated)] rounded-lg p-4 space-y-3",
                          children: [
                            p.jsxs("div", {
                              className: "flex items-center gap-2 text-sm",
                              children: [
                                p.jsx(Jh, {
                                  className: "w-4 h-4 text-[var(--text-muted)]",
                                }),
                                p.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "作成日時:",
                                }),
                                p.jsx("span", {
                                  className: "text-[var(--text-primary)]",
                                  children: D(u.createdAt),
                                }),
                              ],
                            }),
                            p.jsxs("div", {
                              className: "flex items-center gap-2 text-sm",
                              children: [
                                p.jsx(Jh, {
                                  className: "w-4 h-4 text-[var(--text-muted)]",
                                }),
                                p.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "更新日時:",
                                }),
                                p.jsx("span", {
                                  className: "text-[var(--text-primary)]",
                                  children: D(u.updatedAt),
                                }),
                              ],
                            }),
                            u.observationCount !== void 0 &&
                              p.jsxs("div", {
                                className: "flex items-center gap-2 text-sm",
                                children: [
                                  p.jsx(ep, {
                                    className:
                                      "w-4 h-4 text-[var(--text-muted)]",
                                  }),
                                  p.jsx("span", {
                                    className: "text-[var(--text-muted)]",
                                    children: "観測記録:",
                                  }),
                                  p.jsxs("span", {
                                    className: "text-[var(--text-primary)]",
                                    children: [u.observationCount, "件"],
                                  }),
                                ],
                              }),
                            u.tokenCount !== void 0 &&
                              u.tokenCount > 0 &&
                              p.jsxs("div", {
                                className: "flex items-center gap-2 text-sm",
                                children: [
                                  p.jsx("span", {
                                    className:
                                      "w-4 h-4 text-center text-[var(--text-muted)]",
                                    children: "#",
                                  }),
                                  p.jsx("span", {
                                    className: "text-[var(--text-muted)]",
                                    children: "トークン:",
                                  }),
                                  p.jsx("span", {
                                    className: "text-[var(--text-primary)]",
                                    children: u.tokenCount.toLocaleString(),
                                  }),
                                ],
                              }),
                          ],
                        }),
                        u.summary &&
                          p.jsxs("div", {
                            children: [
                              p.jsx("h4", {
                                className:
                                  "text-sm font-medium text-[var(--text-muted)] mb-2",
                                children: "要約",
                              }),
                              p.jsx("div", {
                                className:
                                  "bg-[var(--bg-elevated)] rounded-lg p-4",
                                children: p.jsx("p", {
                                  className:
                                    "text-sm text-[var(--text-secondary)] whitespace-pre-wrap",
                                  children: u.summary,
                                }),
                              }),
                            ],
                          }),
                        p.jsx("div", {
                          className:
                            "pt-2 border-t border-[var(--border-subtle)]",
                          children: p.jsxs("p", {
                            className:
                              "text-xs text-[var(--text-muted)] font-mono",
                            children: ["ID: ", u.sessionId],
                          }),
                        }),
                      ],
                    })
                  : null,
          }),
          p.jsxs("div", {
            className:
              "px-6 py-4 border-t border-[var(--border-subtle)] flex justify-between flex-shrink-0",
            children: [
              i && o
                ? p.jsx("button", {
                    onClick: () => {
                      (i(o), b());
                    },
                    className:
                      "px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors",
                    children: "削除",
                  })
                : p.jsx("div", {}),
              p.jsx("button", {
                onClick: b,
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
const pm = "claude-cnthub-theme";
function QN() {
  const [e, r] = k.useState(() => {
    if (typeof window < "u") {
      const l = localStorage.getItem(pm);
      if (l === "light" || l === "dark") return l;
    }
    return "dark";
  });
  k.useEffect(() => {
    const l = document.documentElement;
    ((l.dataset.theme = e),
      e === "light"
        ? (l.classList.add("light"), l.classList.remove("dark"))
        : (l.classList.add("dark"), l.classList.remove("light")),
      localStorage.setItem(pm, e));
  }, [e]);
  const o = k.useCallback(() => {
      r((l) => (l === "dark" ? "light" : "dark"));
    }, []),
    i = k.useCallback((l) => {
      r(l);
    }, []);
  return { theme: e, toggleTheme: o, setTheme: i };
}
const GN = [
  {
    title: "セッション管理",
    items: [
      {
        label: "セッション一覧",
        description: "左サイドバーで全セッションを確認",
      },
      {
        label: "セッション詳細",
        description: "セッションをクリックして詳細を表示",
      },
      {
        label: "セッション削除",
        description: "セッション右クリックまたはゴミ箱アイコン",
      },
    ],
  },
  {
    title: "ノードエディタ",
    items: [
      { label: "ノード追加", description: "セッションをドラッグ&ドロップ" },
      { label: "ノード接続", description: "ノードからノードへドラッグ" },
      { label: "接続削除", description: "接続線をクリックして削除" },
      {
        label: "移動・ズーム",
        description: "ドラッグで移動、スクロールでズーム",
      },
    ],
  },
  {
    title: "検索",
    items: [
      {
        label: "セマンティック検索",
        description: "ヘッダーの検索バーで自然言語検索",
      },
      {
        label: "フィルタリング",
        description: "ステータスやプロジェクトで絞り込み",
      },
    ],
  },
  {
    title: "Claude Code コマンド",
    items: [
      {
        label: "/cnthub:export",
        description: "現在のセッションをエクスポート",
      },
      {
        label: "/cnthub:get",
        description: "過去のセッションからコンテキストを取得",
      },
    ],
  },
];
function qN({ isOpen: e, onClose: r }) {
  return e
    ? p.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          p.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: r,
          }),
          p.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[560px] max-h-[80vh] overflow-hidden border border-[var(--border-default)]",
            children: [
              p.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  p.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      p.jsx("div", {
                        className: "p-2 bg-orange-500/10 rounded-lg",
                        children: p.jsx($m, {
                          className: "w-5 h-5 text-orange-500",
                        }),
                      }),
                      p.jsx("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: "操作ガイド",
                      }),
                    ],
                  }),
                  p.jsx("button", {
                    onClick: r,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                    children: p.jsx(ks, {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                    }),
                  }),
                ],
              }),
              p.jsx("div", {
                className: "px-6 py-6 overflow-y-auto max-h-[calc(80vh-140px)]",
                children: p.jsx("div", {
                  className: "space-y-6",
                  children: GN.map((o) =>
                    p.jsxs(
                      "div",
                      {
                        children: [
                          p.jsx("h3", {
                            className:
                              "text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3",
                            children: o.title,
                          }),
                          p.jsx("div", {
                            className: "space-y-2",
                            children: o.items.map((i) =>
                              p.jsxs(
                                "div",
                                {
                                  className:
                                    "flex items-start gap-3 p-3 bg-[var(--bg-elevated)] rounded-lg",
                                  children: [
                                    p.jsx("span", {
                                      className:
                                        "text-sm font-medium text-[var(--text-primary)] min-w-[120px]",
                                      children: i.label,
                                    }),
                                    p.jsx("span", {
                                      className:
                                        "text-sm text-[var(--text-muted)]",
                                      children: i.description,
                                    }),
                                  ],
                                },
                                i.label
                              )
                            ),
                          }),
                        ],
                      },
                      o.title
                    )
                  ),
                }),
              }),
              p.jsx("div", {
                className:
                  "px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end",
                children: p.jsx("button", {
                  onClick: r,
                  className:
                    "px-4 py-2 text-sm font-medium bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary-hover)] transition-colors",
                  children: "閉じる",
                }),
              }),
            ],
          }),
        ],
      })
    : null;
}
const ZN = [
  {
    type: "bug",
    label: "バグ報告",
    icon: p.jsx(Xc, { className: "w-4 h-4" }),
    description: "問題や不具合を報告",
  },
  {
    type: "feature_request",
    label: "機能要望",
    icon: p.jsx(c1, { className: "w-4 h-4" }),
    description: "新機能のリクエスト",
  },
  {
    type: "improvement",
    label: "改善提案",
    icon: p.jsx(d1, { className: "w-4 h-4" }),
    description: "既存機能の改善",
  },
  {
    type: "other",
    label: "その他",
    icon: p.jsx(Jx, { className: "w-4 h-4" }),
    description: "その他のフィードバック",
  },
];
function JN({ isOpen: e, onClose: r }) {
  const [o, i] = k.useState(null),
    [l, u] = k.useState(""),
    [c, f] = k.useState(!1),
    [h, m] = k.useState(!1),
    [x, y] = k.useState(null),
    v = l.length,
    w = 10,
    S = 1e3,
    _ = v >= w && v <= S,
    C = k.useCallback(() => {
      c || (i(null), u(""), y(null), m(!1), r());
    }, [c, r]),
    b = k.useCallback(async () => {
      var P;
      if (!o) {
        y("カテゴリを選択してください");
        return;
      }
      if (!_) {
        y(`内容は${w}〜${S}文字で入力してください`);
        return;
      }
      (f(!0), y(null));
      try {
        const E = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: o, content: l.trim() }),
        });
        if (!E.ok) {
          const j = await E.json();
          throw new Error(
            ((P = j.error) == null ? void 0 : P.message) || "送信に失敗しました"
          );
        }
        (m(!0),
          i(null),
          u(""),
          setTimeout(() => {
            (m(!1), r());
          }, 3e3));
      } catch (E) {
        y(E instanceof Error ? E.message : "エラーが発生しました");
      } finally {
        f(!1);
      }
    }, [o, l, _, r]);
  return e
    ? p.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          p.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: C,
          }),
          p.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[480px] max-h-[85vh] overflow-hidden border border-[var(--border-default)]",
            children: [
              p.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  p.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      p.jsx("div", {
                        className: "p-2 bg-orange-500/10 rounded-lg",
                        children: p.jsx(Xc, {
                          className: "w-5 h-5 text-orange-500",
                        }),
                      }),
                      p.jsx("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: "フィードバック",
                      }),
                    ],
                  }),
                  p.jsx("button", {
                    onClick: C,
                    disabled: c,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                    children: p.jsx(ks, {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                    }),
                  }),
                ],
              }),
              p.jsx("div", {
                className: "px-6 py-6 overflow-y-auto max-h-[calc(85vh-140px)]",
                children: h
                  ? p.jsxs("div", {
                      className:
                        "flex flex-col items-center justify-center py-8",
                      children: [
                        p.jsx("div", {
                          className:
                            "w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4",
                          children: p.jsx(e1, {
                            className: "w-8 h-8 text-green-500",
                          }),
                        }),
                        p.jsx("h3", {
                          className:
                            "text-lg font-bold text-[var(--text-primary)] mb-2",
                          children: "送信完了!",
                        }),
                        p.jsxs("p", {
                          className:
                            "text-[var(--text-muted)] text-sm text-center",
                          children: [
                            "フィードバックをお送りいただきありがとうございます。",
                            p.jsx("br", {}),
                            "いただいたご意見は今後の改善に活かします。",
                          ],
                        }),
                      ],
                    })
                  : p.jsxs(p.Fragment, {
                      children: [
                        p.jsxs("div", {
                          className: "mb-5",
                          children: [
                            p.jsx("label", {
                              className:
                                "block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider",
                              children: "カテゴリを選択",
                            }),
                            p.jsx("div", {
                              className: "grid grid-cols-2 gap-2",
                              children: ZN.map((P) =>
                                p.jsxs(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => i(P.type),
                                    className: `
                        flex flex-col items-start p-3 rounded-lg border transition-all duration-200
                        ${o === P.type ? "border-orange-500 bg-orange-500/10 text-orange-500" : "border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-subtle)] hover:bg-[var(--bg-surface)]"}
                      `,
                                    children: [
                                      p.jsxs("div", {
                                        className:
                                          "flex items-center gap-2 mb-1",
                                        children: [
                                          P.icon,
                                          p.jsx("span", {
                                            className: "text-xs font-medium",
                                            children: P.label,
                                          }),
                                        ],
                                      }),
                                      p.jsx("span", {
                                        className:
                                          "text-[10px] text-[var(--text-muted)]",
                                        children: P.description,
                                      }),
                                    ],
                                  },
                                  P.type
                                )
                              ),
                            }),
                          ],
                        }),
                        p.jsxs("div", {
                          className: "mb-4",
                          children: [
                            p.jsx("label", {
                              className:
                                "block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider",
                              children: "内容",
                            }),
                            p.jsx("textarea", {
                              value: l,
                              onChange: (P) => u(P.target.value),
                              placeholder: "詳しく教えてください...",
                              className: `
                    w-full h-32 p-3 rounded-lg border bg-[var(--bg-elevated)] text-[var(--text-primary)] placeholder-[var(--text-muted)]
                    text-sm resize-none focus:outline-none transition-colors
                    ${x && !_ ? "border-red-500 focus:border-red-500" : "border-[var(--border-default)] focus:border-orange-500"}
                  `,
                            }),
                            p.jsxs("div", {
                              className:
                                "flex justify-between items-center mt-1",
                              children: [
                                p.jsx("span", {
                                  className: `text-xs ${v < w ? "text-[var(--text-muted)]" : v > S ? "text-red-500" : "text-[var(--text-muted)]"}`,
                                  children:
                                    v < w
                                      ? `あと${w - v}文字以上`
                                      : v > S
                                        ? `${v - S}文字超過`
                                        : "",
                                }),
                                p.jsxs("span", {
                                  className: `text-xs ${v > S ? "text-red-500" : "text-[var(--text-muted)]"}`,
                                  children: [v, "/", S],
                                }),
                              ],
                            }),
                          ],
                        }),
                        x &&
                          p.jsx("div", {
                            className:
                              "mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm",
                            children: x,
                          }),
                      ],
                    }),
              }),
              !h &&
                p.jsxs("div", {
                  className:
                    "px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-3",
                  children: [
                    p.jsx("button", {
                      onClick: C,
                      disabled: c,
                      className:
                        "px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                      children: "キャンセル",
                    }),
                    p.jsx("button", {
                      onClick: b,
                      disabled: c || !o || !_,
                      className: `
                px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2
                ${c || !o || !_ ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"}
              `,
                      children: c
                        ? p.jsxs(p.Fragment, {
                            children: [
                              p.jsx("div", {
                                className:
                                  "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin",
                              }),
                              "送信中...",
                            ],
                          })
                        : p.jsxs(p.Fragment, {
                            children: [
                              p.jsx(f1, { className: "w-4 h-4" }),
                              "送信する",
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
function eC() {
  const { theme: e, toggleTheme: r } = QN(),
    { selectedProjectId: o, projects: i } = Yc(),
    [l, u] = k.useState([]),
    [c, f] = k.useState("sessions"),
    [h, m] = k.useState([]),
    [x, y] = k.useState([]),
    [v, w] = k.useState(!1),
    [S, _] = k.useState(null),
    [C, b] = k.useState(null),
    [P, E] = k.useState(null),
    j = k.useRef(null),
    [D, A] = k.useState({}),
    [R, H] = k.useState(null),
    [V, se] = k.useState(null),
    [X, Y] = k.useState(!1),
    [te, L] = k.useState(!1),
    G = k.useMemo(
      () =>
        l
          .filter((de) => !h.includes(de.sessionId))
          .filter((de) => !o || de.projectId === o),
      [l, h, o]
    ),
    B = k.useCallback(async () => {
      try {
        const de = await fetch("/api/sessions?limit=100&status=completed");
        if (!de.ok) throw new Error("Failed to fetch");
        const le = await de.json();
        u(le.items || []);
      } catch (de) {
        (console.error("[ViewerPage] Failed to fetch sessions:", de), u([]));
      }
    }, []);
  (k.useEffect(() => {
    B();
  }, [B]),
    k.useEffect(() => {
      let de = !0;
      const le = async () => {
        try {
          const ae = [],
            Ne = await fetch("/api/sessions?limit=10&status=processing");
          if (Ne.ok) {
            const ze = await Ne.json();
            ae.push(...(ze.items || []));
          }
          const Me = await fetch("/api/sessions?limit=10&status=idle");
          if (Me.ok) {
            const ze = await Me.json();
            ae.push(...(ze.items || []));
          }
          if (!de) return;
          if (ae.length === 0) {
            y([]);
            return;
          }
          const De = await Promise.all(
            ae.map(async (ze) => {
              var Ge;
              try {
                const Rt = await fetch(
                  `/api/sessions/${ze.sessionId}/observations?limit=100`
                );
                if (Rt.ok) {
                  const rt = await Rt.json();
                  return {
                    session: ze,
                    observations: rt.items || [],
                    observationCount:
                      ((Ge = rt.items) == null ? void 0 : Ge.length) || 0,
                    tokenCount: ze.tokenCount || 0,
                    inputTokens: ze.inputTokens,
                    outputTokens: ze.outputTokens,
                  };
                }
              } catch {}
              return {
                session: ze,
                observations: [],
                observationCount: 0,
                tokenCount: ze.tokenCount || 0,
                inputTokens: ze.inputTokens,
                outputTokens: ze.outputTokens,
              };
            })
          );
          de && y(De);
        } catch (ae) {
          console.error("[ViewerPage] Failed to fetch current sessions:", ae);
        }
      };
      le();
      const ge = setInterval(le, 5e3);
      return () => {
        ((de = !1), clearInterval(ge));
      };
    }, []));
  const { connect: K, lastTokensUpdated: z } = _l();
  (k.useEffect(() => {
    K();
  }, [K]),
    k.useEffect(() => {
      z &&
        y((de) =>
          de.map((le) => {
            var ge;
            return ((ge = le.session) == null ? void 0 : ge.sessionId) ===
              z.sessionId
              ? {
                  ...le,
                  inputTokens: z.inputTokens,
                  outputTokens: z.outputTokens,
                  session: le.session
                    ? {
                        ...le.session,
                        inputTokens: z.inputTokens,
                        outputTokens: z.outputTokens,
                      }
                    : null,
                }
              : le;
          })
        );
    }, [z]));
  const $ = k.useCallback((de) => {
      m((le) =>
        le.includes(de.sessionId)
          ? le.filter((ge) => ge !== de.sessionId)
          : [...le, de.sessionId]
      );
    }, []),
    U = k.useCallback((de) => {
      (console.log("[Viewer] Session clicked:", de.sessionId), H(de.sessionId));
    }, []),
    M = k.useCallback((de) => {
      console.log("[Viewer] Get session:", de);
    }, []),
    I = k.useCallback((de) => {
      _(de);
    }, []),
    ne = k.useCallback(async () => {
      var le;
      if (!S) return;
      const de = S.sessionId;
      try {
        const ge = await fetch(`/api/sessions/${de}`, { method: "DELETE" });
        if (!ge.ok) {
          const ae = await ge.json();
          throw new Error(
            ((le = ae.error) == null ? void 0 : le.message) ||
              "削除に失敗しました"
          );
        }
        (u((ae) => ae.filter((Ne) => Ne.sessionId !== de)),
          m((ae) => ae.filter((Ne) => Ne !== de)),
          _(null));
      } catch (ge) {
        (console.error("[ViewerPage] Failed to delete session:", ge),
          alert(
            ge instanceof Error ? ge.message : "セッションの削除に失敗しました"
          ));
      }
    }, [S]),
    ie = k.useCallback(
      (de) => {
        const le = l.find((ge) => ge.sessionId === de);
        _(
          le
            ? { sessionId: le.sessionId, name: le.name }
            : { sessionId: de, name: de }
        );
      },
      [l]
    ),
    F = k.useCallback((de, le) => {
      u((ge) =>
        ge.map((ae) => (ae.sessionId === de ? { ...ae, name: le } : ae))
      );
    }, []),
    Z = k.useCallback(async (de) => {
      var le;
      try {
        const ge = await fetch("/api/sessions/bulk-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionIds: de }),
        });
        if (!ge.ok) {
          const Me = await ge.json();
          throw new Error(
            ((le = Me.error) == null ? void 0 : le.message) ||
              "一括削除に失敗しました"
          );
        }
        const ae = await ge.json(),
          Ne = new Set(
            ae.results.filter((Me) => Me.success).map((Me) => Me.sessionId)
          );
        (u((Me) => Me.filter((De) => !Ne.has(De.sessionId))),
          m((Me) => Me.filter((De) => !Ne.has(De))));
      } catch (ge) {
        (console.error("[ViewerPage] Failed to bulk delete sessions:", ge),
          alert(ge instanceof Error ? ge.message : "一括削除に失敗しました"));
      }
    }, []),
    re = k.useCallback((de) => {
      b(de);
    }, []),
    Q = k.useCallback(async () => {
      if (C)
        return new Promise((de) => {
          ((j.current = de), E({ type: C.type, id: C.id }));
        });
    }, [C]),
    oe = k.useCallback(() => {
      (E(null), b(null), j.current && (j.current(), (j.current = null)));
    }, []),
    [fe, me] = k.useState(null),
    ye = k.useCallback(
      (de) => {
        const le = x.find((ge) => {
          var ae;
          return ((ae = ge.session) == null ? void 0 : ae.sessionId) === de;
        });
        if (!(le != null && le.session) || le.observationCount === 0) {
          alert("エクスポートするobservationsがありません");
          return;
        }
        (console.log("[Viewer] Opening Smart Export modal:", de),
          me(le),
          w(!0));
      },
      [x]
    ),
    ve = k.useCallback(async () => {
      (console.log("[Viewer] Smart Export completed"), await B());
    }, [B]),
    Ee = k.useCallback(async (de, le) => {
      var ge, ae, Ne, Me, De, ze, Ge, Rt;
      if (le.length < 2) return null;
      (console.log("[Viewer] Starting merge for context:", de, le),
        A((rt) => ({ ...rt, [de]: { status: "merging", summary: null } })));
      try {
        const rt = await fetch("/api/merges/with-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceSessionIds: le }),
        });
        if (!rt.ok) {
          const Ht = await rt.json();
          return (
            console.error("[Viewer] Merge failed:", Ht),
            A((Cr) => ({ ...Cr, [de]: { status: "error", summary: null } })),
            null
          );
        }
        const qe = await rt.json(),
          kt = {
            shortSummary:
              ((ge = qe.summary) == null ? void 0 : ge.shortSummary) || "",
            detailedSummary:
              ((ae = qe.summary) == null ? void 0 : ae.detailedSummary) || "",
            keyDecisions:
              ((Ne = qe.summary) == null ? void 0 : Ne.keyDecisions) || [],
            topics: ((Me = qe.summary) == null ? void 0 : Me.topics) || [],
            sessionCount:
              ((De = qe.summary) == null ? void 0 : De.sessionCount) ||
              le.length,
            totalOriginalTokens:
              ((ze = qe.summary) == null ? void 0 : ze.totalOriginalTokens) ||
              0,
            mergedTokens:
              ((Ge = qe.summary) == null ? void 0 : Ge.mergedTokens) || 0,
            compressionRatio:
              ((Rt = qe.summary) == null ? void 0 : Rt.compressionRatio) || 0,
          };
        return (
          A((Ht) => ({ ...Ht, [de]: { status: "completed", summary: kt } })),
          console.log("[Viewer] Merge completed for context:", de, kt),
          kt
        );
      } catch (rt) {
        return (
          console.error("[Viewer] Merge error:", rt),
          A((qe) => ({ ...qe, [de]: { status: "error", summary: null } })),
          null
        );
      }
    }, []);
  return p.jsxs("div", {
    className: `${e === "dark" ? "viewer-theme " : ""}h-screen flex flex-col bg-[var(--bg-base)]`,
    children: [
      p.jsxs("header", {
        className:
          "h-12 flex items-center justify-between px-4 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]",
        children: [
          p.jsxs("div", {
            className: "flex items-center gap-4",
            children: [
              p.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  p.jsx("span", {
                    className:
                      "text-lg font-semibold text-[var(--color-primary-500)]",
                    children: "cnthub",
                  }),
                  p.jsx("span", {
                    className: "text-sm text-[var(--text-muted)]",
                    children: "Viewer",
                  }),
                ],
              }),
              p.jsxs("div", {
                className:
                  "flex items-center bg-[var(--bg-elevated)] rounded-lg p-1",
                role: "tablist",
                "aria-label": "ビュー切り替え",
                children: [
                  p.jsxs("button", {
                    role: "tab",
                    "aria-selected": c === "sessions",
                    "aria-controls": "sessions-panel",
                    onClick: () => f("sessions"),
                    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${c === "sessions" ? "bg-[var(--color-primary-500)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"}`,
                    children: [p.jsx(Zx, { className: "w-4 h-4" }), "Sessions"],
                  }),
                  p.jsxs("button", {
                    role: "tab",
                    "aria-selected": c === "system",
                    "aria-controls": "system-panel",
                    onClick: () => f("system"),
                    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${c === "system" ? "bg-[var(--color-primary-500)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"}`,
                    children: [p.jsx(s1, { className: "w-4 h-4" }), "System"],
                  }),
                ],
              }),
            ],
          }),
          p.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              p.jsx("button", {
                onClick: () => L(!0),
                className:
                  "p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors",
                "aria-label": "フィードバックを送信",
                children: p.jsx(Xc, {
                  className: "w-5 h-5 text-[var(--text-secondary)]",
                }),
              }),
              p.jsx("button", {
                onClick: () => Y(!0),
                className:
                  "p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors",
                "aria-label": "操作ガイドを表示",
                children: p.jsx($m, {
                  className: "w-5 h-5 text-[var(--text-secondary)]",
                }),
              }),
              p.jsx("button", {
                onClick: r,
                className:
                  "p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors",
                "aria-label":
                  e === "dark" ? "ライトモードに切替" : "ダークモードに切替",
                children:
                  e === "dark"
                    ? p.jsx(n1, {
                        className: "w-5 h-5 text-[var(--text-secondary)]",
                      })
                    : p.jsx(t1, {
                        className: "w-5 h-5 text-[var(--text-secondary)]",
                      }),
              }),
            ],
          }),
        ],
      }),
      p.jsx("div", {
        className: "flex-1 flex overflow-hidden",
        children:
          c === "sessions"
            ? p.jsxs(p.Fragment, {
                children: [
                  p.jsx(h1, {
                    sessions: l,
                    onSessionSelect: $,
                    onSessionClick: U,
                    onSessionDelete: I,
                    onBulkDelete: Z,
                    onSessionHover: se,
                    selectedSessionIds: h,
                  }),
                  p.jsx("main", {
                    className: "flex-1 overflow-hidden",
                    children: p.jsx("div", {
                      id: "sessions-panel",
                      role: "tabpanel",
                      "aria-labelledby": "sessions-tab",
                      className: "h-full",
                      children: p.jsx(FN, {
                        sessions: G,
                        projects: i,
                        currentSessionsData: x,
                        theme: e,
                        onGetSession: M,
                        onExportSession: ye,
                        onDeleteRequest: re,
                        pendingDelete: P,
                        onDeleteComplete: oe,
                        onMerge: Ee,
                        mergeStateByContext: D,
                        onSessionDetail: (de) => H(de),
                        hoveredSessionId: V,
                      }),
                    }),
                  }),
                ],
              })
            : p.jsx("main", {
                className: "flex-1 overflow-hidden",
                children: p.jsx("div", {
                  id: "system-panel",
                  role: "tabpanel",
                  "aria-labelledby": "system-tab",
                  className: "h-full",
                  children: p.jsx(UN, {
                    onOptimize: (de, le) => {
                      console.log("[System] Optimize requested:", de, le);
                    },
                  }),
                }),
              }),
      }),
      (fe == null ? void 0 : fe.session) &&
        p.jsx(XN, {
          isOpen: v,
          onClose: () => {
            (w(!1), me(null));
          },
          sessionId: fe.session.sessionId,
          sessionName: fe.session.name,
          onExportComplete: ve,
        }),
      p.jsx(hm, {
        isOpen: !!S,
        onClose: () => _(null),
        onConfirm: ne,
        targetType: "session",
        targetName: (S == null ? void 0 : S.name) || "",
        targetId: S == null ? void 0 : S.sessionId,
      }),
      p.jsx(hm, {
        isOpen: !!C,
        onClose: () => b(null),
        onConfirm: Q,
        targetType: (C == null ? void 0 : C.type) === "node" ? "node" : "edge",
        targetName: (C == null ? void 0 : C.name) || "",
        targetId: C == null ? void 0 : C.id,
      }),
      p.jsx(KN, {
        isOpen: !!R,
        onClose: () => H(null),
        sessionId: R,
        onDelete: ie,
        onNameChange: F,
      }),
      p.jsx(qN, { isOpen: X, onClose: () => Y(!1) }),
      p.jsx(JN, { isOpen: te, onClose: () => L(!1) }),
    ],
  });
}
function tC() {
  return p.jsxs(px, {
    children: [
      p.jsx(vc, { path: "/", element: p.jsx(eC, {}) }),
      p.jsx(vc, { path: "*", element: p.jsx(fx, { to: "/", replace: !0 }) }),
    ],
  });
}
const nC = "/viewer/";
gv.createRoot(document.getElementById("root")).render(
  p.jsx(ro.StrictMode, {
    children: p.jsx(Dx, { basename: nC, children: p.jsx(tC, {}) }),
  })
);
//# sourceMappingURL=index-BALhdBVV.js.map

var ix = Object.defineProperty;
var lx = (e, r, o) =>
  r in e
    ? ix(e, r, { enumerable: !0, configurable: !0, writable: !0, value: o })
    : (e[r] = o);
var ft = (e, r, o) => lx(e, typeof r != "symbol" ? r + "" : r, o);
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
  ps = {},
  Ku = { exports: {} },
  Te = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ah;
function ax() {
  if (Ah) return Te;
  Ah = 1;
  var e = Symbol.for("react.element"),
    r = Symbol.for("react.portal"),
    o = Symbol.for("react.fragment"),
    i = Symbol.for("react.strict_mode"),
    l = Symbol.for("react.profiler"),
    u = Symbol.for("react.provider"),
    c = Symbol.for("react.context"),
    d = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    g = Symbol.iterator;
  function x(P) {
    return P === null || typeof P != "object"
      ? null
      : ((P = (g && P[g]) || P["@@iterator"]),
        typeof P == "function" ? P : null);
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
    j = {};
  function C(P, M, ne) {
    ((this.props = P),
      (this.context = M),
      (this.refs = j),
      (this.updater = ne || S));
  }
  ((C.prototype.isReactComponent = {}),
    (C.prototype.setState = function (P, M) {
      if (typeof P != "object" && typeof P != "function" && P != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, P, M, "setState");
    }),
    (C.prototype.forceUpdate = function (P) {
      this.updater.enqueueForceUpdate(this, P, "forceUpdate");
    }));
  function b() {}
  b.prototype = C.prototype;
  function I(P, M, ne) {
    ((this.props = P),
      (this.context = M),
      (this.refs = j),
      (this.updater = ne || S));
  }
  var k = (I.prototype = new b());
  ((k.constructor = I), w(k, C.prototype), (k.isPureReactComponent = !0));
  var _ = Array.isArray,
    D = Object.prototype.hasOwnProperty,
    z = { current: null },
    R = { key: !0, ref: !0, __self: !0, __source: !0 };
  function H(P, M, ne) {
    var oe,
      F = {},
      Q = null,
      re = null;
    if (M != null)
      for (oe in (M.ref !== void 0 && (re = M.ref),
      M.key !== void 0 && (Q = "" + M.key),
      M))
        D.call(M, oe) && !R.hasOwnProperty(oe) && (F[oe] = M[oe]);
    var G = arguments.length - 2;
    if (G === 1) F.children = ne;
    else if (1 < G) {
      for (var se = Array(G), ce = 0; ce < G; ce++) se[ce] = arguments[ce + 2];
      F.children = se;
    }
    if (P && P.defaultProps)
      for (oe in ((G = P.defaultProps), G)) F[oe] === void 0 && (F[oe] = G[oe]);
    return {
      $$typeof: e,
      type: P,
      key: Q,
      ref: re,
      props: F,
      _owner: z.current,
    };
  }
  function V(P, M) {
    return {
      $$typeof: e,
      type: P.type,
      key: M,
      ref: P.ref,
      props: P.props,
      _owner: P._owner,
    };
  }
  function ie(P) {
    return typeof P == "object" && P !== null && P.$$typeof === e;
  }
  function X(P) {
    var M = { "=": "=0", ":": "=2" };
    return (
      "$" +
      P.replace(/[=:]/g, function (ne) {
        return M[ne];
      })
    );
  }
  var Y = /\/+/g;
  function te(P, M) {
    return typeof P == "object" && P !== null && P.key != null
      ? X("" + P.key)
      : M.toString(36);
  }
  function L(P, M, ne, oe, F) {
    var Q = typeof P;
    (Q === "undefined" || Q === "boolean") && (P = null);
    var re = !1;
    if (P === null) re = !0;
    else
      switch (Q) {
        case "string":
        case "number":
          re = !0;
          break;
        case "object":
          switch (P.$$typeof) {
            case e:
            case r:
              re = !0;
          }
      }
    if (re)
      return (
        (re = P),
        (F = F(re)),
        (P = oe === "" ? "." + te(re, 0) : oe),
        _(F)
          ? ((ne = ""),
            P != null && (ne = P.replace(Y, "$&/") + "/"),
            L(F, M, ne, "", function (ce) {
              return ce;
            }))
          : F != null &&
            (ie(F) &&
              (F = V(
                F,
                ne +
                  (!F.key || (re && re.key === F.key)
                    ? ""
                    : ("" + F.key).replace(Y, "$&/") + "/") +
                  P
              )),
            M.push(F)),
        1
      );
    if (((re = 0), (oe = oe === "" ? "." : oe + ":"), _(P)))
      for (var G = 0; G < P.length; G++) {
        Q = P[G];
        var se = oe + te(Q, G);
        re += L(Q, M, ne, se, F);
      }
    else if (((se = x(P)), typeof se == "function"))
      for (P = se.call(P), G = 0; !(Q = P.next()).done; )
        ((Q = Q.value), (se = oe + te(Q, G++)), (re += L(Q, M, ne, se, F)));
    else if (Q === "object")
      throw (
        (M = String(P)),
        Error(
          "Objects are not valid as a React child (found: " +
            (M === "[object Object]"
              ? "object with keys {" + Object.keys(P).join(", ") + "}"
              : M) +
            "). If you meant to render a collection of children, use an array instead."
        )
      );
    return re;
  }
  function q(P, M, ne) {
    if (P == null) return P;
    var oe = [],
      F = 0;
    return (
      L(P, oe, "", "", function (Q) {
        return M.call(ne, Q, F++);
      }),
      oe
    );
  }
  function B(P) {
    if (P._status === -1) {
      var M = P._result;
      ((M = M()),
        M.then(
          function (ne) {
            (P._status === 0 || P._status === -1) &&
              ((P._status = 1), (P._result = ne));
          },
          function (ne) {
            (P._status === 0 || P._status === -1) &&
              ((P._status = 2), (P._result = ne));
          }
        ),
        P._status === -1 && ((P._status = 0), (P._result = M)));
    }
    if (P._status === 1) return P._result.default;
    throw P._result;
  }
  var K = { current: null },
    A = { transition: null },
    $ = {
      ReactCurrentDispatcher: K,
      ReactCurrentBatchConfig: A,
      ReactCurrentOwner: z,
    };
  function U() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (Te.Children = {
      map: q,
      forEach: function (P, M, ne) {
        q(
          P,
          function () {
            M.apply(this, arguments);
          },
          ne
        );
      },
      count: function (P) {
        var M = 0;
        return (
          q(P, function () {
            M++;
          }),
          M
        );
      },
      toArray: function (P) {
        return (
          q(P, function (M) {
            return M;
          }) || []
        );
      },
      only: function (P) {
        if (!ie(P))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return P;
      },
    }),
    (Te.Component = C),
    (Te.Fragment = o),
    (Te.Profiler = l),
    (Te.PureComponent = I),
    (Te.StrictMode = i),
    (Te.Suspense = p),
    (Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $),
    (Te.act = U),
    (Te.cloneElement = function (P, M, ne) {
      if (P == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            P +
            "."
        );
      var oe = w({}, P.props),
        F = P.key,
        Q = P.ref,
        re = P._owner;
      if (M != null) {
        if (
          (M.ref !== void 0 && ((Q = M.ref), (re = z.current)),
          M.key !== void 0 && (F = "" + M.key),
          P.type && P.type.defaultProps)
        )
          var G = P.type.defaultProps;
        for (se in M)
          D.call(M, se) &&
            !R.hasOwnProperty(se) &&
            (oe[se] = M[se] === void 0 && G !== void 0 ? G[se] : M[se]);
      }
      var se = arguments.length - 2;
      if (se === 1) oe.children = ne;
      else if (1 < se) {
        G = Array(se);
        for (var ce = 0; ce < se; ce++) G[ce] = arguments[ce + 2];
        oe.children = G;
      }
      return {
        $$typeof: e,
        type: P.type,
        key: F,
        ref: Q,
        props: oe,
        _owner: re,
      };
    }),
    (Te.createContext = function (P) {
      return (
        (P = {
          $$typeof: c,
          _currentValue: P,
          _currentValue2: P,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (P.Provider = { $$typeof: u, _context: P }),
        (P.Consumer = P)
      );
    }),
    (Te.createElement = H),
    (Te.createFactory = function (P) {
      var M = H.bind(null, P);
      return ((M.type = P), M);
    }),
    (Te.createRef = function () {
      return { current: null };
    }),
    (Te.forwardRef = function (P) {
      return { $$typeof: d, render: P };
    }),
    (Te.isValidElement = ie),
    (Te.lazy = function (P) {
      return { $$typeof: v, _payload: { _status: -1, _result: P }, _init: B };
    }),
    (Te.memo = function (P, M) {
      return { $$typeof: m, type: P, compare: M === void 0 ? null : M };
    }),
    (Te.startTransition = function (P) {
      var M = A.transition;
      A.transition = {};
      try {
        P();
      } finally {
        A.transition = M;
      }
    }),
    (Te.unstable_act = U),
    (Te.useCallback = function (P, M) {
      return K.current.useCallback(P, M);
    }),
    (Te.useContext = function (P) {
      return K.current.useContext(P);
    }),
    (Te.useDebugValue = function () {}),
    (Te.useDeferredValue = function (P) {
      return K.current.useDeferredValue(P);
    }),
    (Te.useEffect = function (P, M) {
      return K.current.useEffect(P, M);
    }),
    (Te.useId = function () {
      return K.current.useId();
    }),
    (Te.useImperativeHandle = function (P, M, ne) {
      return K.current.useImperativeHandle(P, M, ne);
    }),
    (Te.useInsertionEffect = function (P, M) {
      return K.current.useInsertionEffect(P, M);
    }),
    (Te.useLayoutEffect = function (P, M) {
      return K.current.useLayoutEffect(P, M);
    }),
    (Te.useMemo = function (P, M) {
      return K.current.useMemo(P, M);
    }),
    (Te.useReducer = function (P, M, ne) {
      return K.current.useReducer(P, M, ne);
    }),
    (Te.useRef = function (P) {
      return K.current.useRef(P);
    }),
    (Te.useState = function (P) {
      return K.current.useState(P);
    }),
    (Te.useSyncExternalStore = function (P, M, ne) {
      return K.current.useSyncExternalStore(P, M, ne);
    }),
    (Te.useTransition = function () {
      return K.current.useTransition();
    }),
    (Te.version = "18.3.1"),
    Te
  );
}
var $h;
function Ds() {
  return ($h || (($h = 1), (Ku.exports = ax())), Ku.exports);
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
function ux() {
  if (Dh) return ps;
  Dh = 1;
  var e = Ds(),
    r = Symbol.for("react.element"),
    o = Symbol.for("react.fragment"),
    i = Object.prototype.hasOwnProperty,
    l = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(d, p, m) {
    var v,
      g = {},
      x = null,
      S = null;
    (m !== void 0 && (x = "" + m),
      p.key !== void 0 && (x = "" + p.key),
      p.ref !== void 0 && (S = p.ref));
    for (v in p) i.call(p, v) && !u.hasOwnProperty(v) && (g[v] = p[v]);
    if (d && d.defaultProps)
      for (v in ((p = d.defaultProps), p)) g[v] === void 0 && (g[v] = p[v]);
    return {
      $$typeof: r,
      type: d,
      key: x,
      ref: S,
      props: g,
      _owner: l.current,
    };
  }
  return ((ps.Fragment = o), (ps.jsx = c), (ps.jsxs = c), ps);
}
var Oh;
function cx() {
  return (Oh || ((Oh = 1), (Xu.exports = ux())), Xu.exports);
}
var h = cx(),
  E = Ds();
const uo = $c(E);
var al = {},
  Qu = { exports: {} },
  _t = {},
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
function dx() {
  return (
    Fh ||
      ((Fh = 1),
      (function (e) {
        function r(A, $) {
          var U = A.length;
          A.push($);
          e: for (; 0 < U; ) {
            var P = (U - 1) >>> 1,
              M = A[P];
            if (0 < l(M, $)) ((A[P] = $), (A[U] = M), (U = P));
            else break e;
          }
        }
        function o(A) {
          return A.length === 0 ? null : A[0];
        }
        function i(A) {
          if (A.length === 0) return null;
          var $ = A[0],
            U = A.pop();
          if (U !== $) {
            A[0] = U;
            e: for (var P = 0, M = A.length, ne = M >>> 1; P < ne; ) {
              var oe = 2 * (P + 1) - 1,
                F = A[oe],
                Q = oe + 1,
                re = A[Q];
              if (0 > l(F, U))
                Q < M && 0 > l(re, F)
                  ? ((A[P] = re), (A[Q] = U), (P = Q))
                  : ((A[P] = F), (A[oe] = U), (P = oe));
              else if (Q < M && 0 > l(re, U))
                ((A[P] = re), (A[Q] = U), (P = Q));
              else break e;
            }
          }
          return $;
        }
        function l(A, $) {
          var U = A.sortIndex - $.sortIndex;
          return U !== 0 ? U : A.id - $.id;
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
            d = c.now();
          e.unstable_now = function () {
            return c.now() - d;
          };
        }
        var p = [],
          m = [],
          v = 1,
          g = null,
          x = 3,
          S = !1,
          w = !1,
          j = !1,
          C = typeof setTimeout == "function" ? setTimeout : null,
          b = typeof clearTimeout == "function" ? clearTimeout : null,
          I = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function k(A) {
          for (var $ = o(m); $ !== null; ) {
            if ($.callback === null) i(m);
            else if ($.startTime <= A)
              (i(m), ($.sortIndex = $.expirationTime), r(p, $));
            else break;
            $ = o(m);
          }
        }
        function _(A) {
          if (((j = !1), k(A), !w))
            if (o(p) !== null) ((w = !0), B(D));
            else {
              var $ = o(m);
              $ !== null && K(_, $.startTime - A);
            }
        }
        function D(A, $) {
          ((w = !1), j && ((j = !1), b(H), (H = -1)), (S = !0));
          var U = x;
          try {
            for (
              k($), g = o(p);
              g !== null && (!(g.expirationTime > $) || (A && !X()));
            ) {
              var P = g.callback;
              if (typeof P == "function") {
                ((g.callback = null), (x = g.priorityLevel));
                var M = P(g.expirationTime <= $);
                (($ = e.unstable_now()),
                  typeof M == "function"
                    ? (g.callback = M)
                    : g === o(p) && i(p),
                  k($));
              } else i(p);
              g = o(p);
            }
            if (g !== null) var ne = !0;
            else {
              var oe = o(m);
              (oe !== null && K(_, oe.startTime - $), (ne = !1));
            }
            return ne;
          } finally {
            ((g = null), (x = U), (S = !1));
          }
        }
        var z = !1,
          R = null,
          H = -1,
          V = 5,
          ie = -1;
        function X() {
          return !(e.unstable_now() - ie < V);
        }
        function Y() {
          if (R !== null) {
            var A = e.unstable_now();
            ie = A;
            var $ = !0;
            try {
              $ = R(!0, A);
            } finally {
              $ ? te() : ((z = !1), (R = null));
            }
          } else z = !1;
        }
        var te;
        if (typeof I == "function")
          te = function () {
            I(Y);
          };
        else if (typeof MessageChannel < "u") {
          var L = new MessageChannel(),
            q = L.port2;
          ((L.port1.onmessage = Y),
            (te = function () {
              q.postMessage(null);
            }));
        } else
          te = function () {
            C(Y, 0);
          };
        function B(A) {
          ((R = A), z || ((z = !0), te()));
        }
        function K(A, $) {
          H = C(function () {
            A(e.unstable_now());
          }, $);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (A) {
            A.callback = null;
          }),
          (e.unstable_continueExecution = function () {
            w || S || ((w = !0), B(D));
          }),
          (e.unstable_forceFrameRate = function (A) {
            0 > A || 125 < A
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (V = 0 < A ? Math.floor(1e3 / A) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (e.unstable_getFirstCallbackNode = function () {
            return o(p);
          }),
          (e.unstable_next = function (A) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var $ = 3;
                break;
              default:
                $ = x;
            }
            var U = x;
            x = $;
            try {
              return A();
            } finally {
              x = U;
            }
          }),
          (e.unstable_pauseExecution = function () {}),
          (e.unstable_requestPaint = function () {}),
          (e.unstable_runWithPriority = function (A, $) {
            switch (A) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                A = 3;
            }
            var U = x;
            x = A;
            try {
              return $();
            } finally {
              x = U;
            }
          }),
          (e.unstable_scheduleCallback = function (A, $, U) {
            var P = e.unstable_now();
            switch (
              (typeof U == "object" && U !== null
                ? ((U = U.delay),
                  (U = typeof U == "number" && 0 < U ? P + U : P))
                : (U = P),
              A)
            ) {
              case 1:
                var M = -1;
                break;
              case 2:
                M = 250;
                break;
              case 5:
                M = 1073741823;
                break;
              case 4:
                M = 1e4;
                break;
              default:
                M = 5e3;
            }
            return (
              (M = U + M),
              (A = {
                id: v++,
                callback: $,
                priorityLevel: A,
                startTime: U,
                expirationTime: M,
                sortIndex: -1,
              }),
              U > P
                ? ((A.sortIndex = U),
                  r(m, A),
                  o(p) === null &&
                    A === o(m) &&
                    (j ? (b(H), (H = -1)) : (j = !0), K(_, U - P)))
                : ((A.sortIndex = M), r(p, A), w || S || ((w = !0), B(D))),
              A
            );
          }),
          (e.unstable_shouldYield = X),
          (e.unstable_wrapCallback = function (A) {
            var $ = x;
            return function () {
              var U = x;
              x = $;
              try {
                return A.apply(this, arguments);
              } finally {
                x = U;
              }
            };
          }));
      })(qu)),
    qu
  );
}
var Hh;
function fx() {
  return (Hh || ((Hh = 1), (Gu.exports = dx())), Gu.exports);
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
function hx() {
  if (Bh) return _t;
  Bh = 1;
  var e = Ds(),
    r = fx();
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
  var d = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    p = Object.prototype.hasOwnProperty,
    m =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    v = {},
    g = {};
  function x(t) {
    return p.call(g, t)
      ? !0
      : p.call(v, t)
        ? !1
        : m.test(t)
          ? (g[t] = !0)
          : ((v[t] = !0), !1);
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
  function j(t, n, s, a, f, y, N) {
    ((this.acceptsBooleans = n === 2 || n === 3 || n === 4),
      (this.attributeName = a),
      (this.attributeNamespace = f),
      (this.mustUseProperty = s),
      (this.propertyName = t),
      (this.type = n),
      (this.sanitizeURL = y),
      (this.removeEmptyString = N));
  }
  var C = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (t) {
      C[t] = new j(t, 0, !1, t, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (t) {
      var n = t[0];
      C[n] = new j(n, 1, !1, t[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (t) {
        C[t] = new j(t, 2, !1, t.toLowerCase(), null, !1, !1);
      }
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (t) {
      C[t] = new j(t, 2, !1, t, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (t) {
        C[t] = new j(t, 3, !1, t.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (t) {
      C[t] = new j(t, 3, !0, t, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (t) {
      C[t] = new j(t, 4, !1, t, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (t) {
      C[t] = new j(t, 6, !1, t, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (t) {
      C[t] = new j(t, 5, !1, t.toLowerCase(), null, !1, !1);
    }));
  var b = /[\-:]([a-z])/g;
  function I(t) {
    return t[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (t) {
      var n = t.replace(b, I);
      C[n] = new j(n, 1, !1, t, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (t) {
        var n = t.replace(b, I);
        C[n] = new j(n, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (t) {
      var n = t.replace(b, I);
      C[n] = new j(n, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (t) {
      C[t] = new j(t, 1, !1, t.toLowerCase(), null, !1, !1);
    }),
    (C.xlinkHref = new j(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1
    )),
    ["src", "href", "action", "formAction"].forEach(function (t) {
      C[t] = new j(t, 1, !1, t.toLowerCase(), null, !0, !0);
    }));
  function k(t, n, s, a) {
    var f = C.hasOwnProperty(n) ? C[n] : null;
    (f !== null
      ? f.type !== 0
      : a ||
        !(2 < n.length) ||
        (n[0] !== "o" && n[0] !== "O") ||
        (n[1] !== "n" && n[1] !== "N")) &&
      (w(n, s, f, a) && (s = null),
      a || f === null
        ? x(n) &&
          (s === null ? t.removeAttribute(n) : t.setAttribute(n, "" + s))
        : f.mustUseProperty
          ? (t[f.propertyName] = s === null ? (f.type === 3 ? !1 : "") : s)
          : ((n = f.attributeName),
            (a = f.attributeNamespace),
            s === null
              ? t.removeAttribute(n)
              : ((f = f.type),
                (s = f === 3 || (f === 4 && s === !0) ? "" : "" + s),
                a ? t.setAttributeNS(a, n, s) : t.setAttribute(n, s))));
  }
  var _ = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    D = Symbol.for("react.element"),
    z = Symbol.for("react.portal"),
    R = Symbol.for("react.fragment"),
    H = Symbol.for("react.strict_mode"),
    V = Symbol.for("react.profiler"),
    ie = Symbol.for("react.provider"),
    X = Symbol.for("react.context"),
    Y = Symbol.for("react.forward_ref"),
    te = Symbol.for("react.suspense"),
    L = Symbol.for("react.suspense_list"),
    q = Symbol.for("react.memo"),
    B = Symbol.for("react.lazy"),
    K = Symbol.for("react.offscreen"),
    A = Symbol.iterator;
  function $(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (A && t[A]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var U = Object.assign,
    P;
  function M(t) {
    if (P === void 0)
      try {
        throw Error();
      } catch (s) {
        var n = s.stack.trim().match(/\n( *(at )?)/);
        P = (n && n[1]) || "";
      }
    return (
      `
` +
      P +
      t
    );
  }
  var ne = !1;
  function oe(t, n) {
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
          var f = ee.stack.split(`
`),
            y = a.stack.split(`
`),
            N = f.length - 1,
            T = y.length - 1;
          1 <= N && 0 <= T && f[N] !== y[T];
        )
          T--;
        for (; 1 <= N && 0 <= T; N--, T--)
          if (f[N] !== y[T]) {
            if (N !== 1 || T !== 1)
              do
                if ((N--, T--, 0 > T || f[N] !== y[T])) {
                  var O =
                    `
` + f[N].replace(" at new ", " at ");
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
    return (t = t ? t.displayName || t.name : "") ? M(t) : "";
  }
  function F(t) {
    switch (t.tag) {
      case 5:
        return M(t.type);
      case 16:
        return M("Lazy");
      case 13:
        return M("Suspense");
      case 19:
        return M("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((t = oe(t.type, !1)), t);
      case 11:
        return ((t = oe(t.type.render, !1)), t);
      case 1:
        return ((t = oe(t.type, !0)), t);
      default:
        return "";
    }
  }
  function Q(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case R:
        return "Fragment";
      case z:
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
        case ie:
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
        case q:
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
  function G(t) {
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
  function se(t) {
    var n = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (n === "checkbox" || n === "radio")
    );
  }
  function ce(t) {
    var n = se(t) ? "checked" : "value",
      s = Object.getOwnPropertyDescriptor(t.constructor.prototype, n),
      a = "" + t[n];
    if (
      !t.hasOwnProperty(n) &&
      typeof s < "u" &&
      typeof s.get == "function" &&
      typeof s.set == "function"
    ) {
      var f = s.get,
        y = s.set;
      return (
        Object.defineProperty(t, n, {
          configurable: !0,
          get: function () {
            return f.call(this);
          },
          set: function (N) {
            ((a = "" + N), y.call(this, N));
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
  function fe(t) {
    t._valueTracker || (t._valueTracker = ce(t));
  }
  function pe(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var s = n.getValue(),
      a = "";
    return (
      t && (a = se(t) ? (t.checked ? "true" : "false") : t.value),
      (t = a),
      t !== s ? (n.setValue(t), !0) : !1
    );
  }
  function ge(t) {
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
  function Se(t, n) {
    var s = n.checked;
    return U({}, n, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: s ?? t._wrapperState.initialChecked,
    });
  }
  function Pe(t, n) {
    var s = n.defaultValue == null ? "" : n.defaultValue,
      a = n.checked != null ? n.checked : n.defaultChecked;
    ((s = G(n.value != null ? n.value : s)),
      (t._wrapperState = {
        initialChecked: a,
        initialValue: s,
        controlled:
          n.type === "checkbox" || n.type === "radio"
            ? n.checked != null
            : n.value != null,
      }));
  }
  function me(t, n) {
    ((n = n.checked), n != null && k(t, "checked", n, !1));
  }
  function Ce(t, n) {
    me(t, n);
    var s = G(n.value),
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
      ? _e(t, n.type, s)
      : n.hasOwnProperty("defaultValue") && _e(t, n.type, G(n.defaultValue)),
      n.checked == null &&
        n.defaultChecked != null &&
        (t.defaultChecked = !!n.defaultChecked));
  }
  function he(t, n, s) {
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
  function _e(t, n, s) {
    (n !== "number" || ge(t.ownerDocument) !== t) &&
      (s == null
        ? (t.defaultValue = "" + t._wrapperState.initialValue)
        : t.defaultValue !== "" + s && (t.defaultValue = "" + s));
  }
  var De = Array.isArray;
  function it(t, n, s, a) {
    if (((t = t.options), n)) {
      n = {};
      for (var f = 0; f < s.length; f++) n["$" + s[f]] = !0;
      for (s = 0; s < t.length; s++)
        ((f = n.hasOwnProperty("$" + t[s].value)),
          t[s].selected !== f && (t[s].selected = f),
          f && a && (t[s].defaultSelected = !0));
    } else {
      for (s = "" + G(s), n = null, f = 0; f < t.length; f++) {
        if (t[f].value === s) {
          ((t[f].selected = !0), a && (t[f].defaultSelected = !0));
          return;
        }
        n !== null || t[f].disabled || (n = t[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function ht(t, n) {
    if (n.dangerouslySetInnerHTML != null) throw Error(o(91));
    return U({}, n, {
      value: void 0,
      defaultValue: void 0,
      children: "" + t._wrapperState.initialValue,
    });
  }
  function ye(t, n) {
    var s = n.value;
    if (s == null) {
      if (((s = n.children), (n = n.defaultValue), s != null)) {
        if (n != null) throw Error(o(92));
        if (De(s)) {
          if (1 < s.length) throw Error(o(93));
          s = s[0];
        }
        n = s;
      }
      (n == null && (n = ""), (s = n));
    }
    t._wrapperState = { initialValue: G(s) };
  }
  function Ie(t, n) {
    var s = G(n.value),
      a = G(n.defaultValue);
    (s != null &&
      ((s = "" + s),
      s !== t.value && (t.value = s),
      n.defaultValue == null && t.defaultValue !== s && (t.defaultValue = s)),
      a != null && (t.defaultValue = "" + a));
  }
  function Re(t) {
    var n = t.textContent;
    n === t._wrapperState.initialValue &&
      n !== "" &&
      n !== null &&
      (t.value = n);
  }
  function Le(t) {
    switch (t) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Qe(t, n) {
    return t == null || t === "http://www.w3.org/1999/xhtml"
      ? Le(n)
      : t === "http://www.w3.org/2000/svg" && n === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : t;
  }
  var Be,
    Et = (function (t) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (n, s, a, f) {
            MSApp.execUnsafeLocalFunction(function () {
              return t(n, s, a, f);
            });
          }
        : t;
    })(function (t, n) {
      if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t)
        t.innerHTML = n;
      else {
        for (
          Be = Be || document.createElement("div"),
            Be.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>",
            n = Be.firstChild;
          t.firstChild;
        )
          t.removeChild(t.firstChild);
        for (; n.firstChild; ) t.appendChild(n.firstChild);
      }
    });
  function Fe(t, n) {
    if (n) {
      var s = t.firstChild;
      if (s && s === t.lastChild && s.nodeType === 3) {
        s.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var Mt = {
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
    gn = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Mt).forEach(function (t) {
    gn.forEach(function (n) {
      ((n = n + t.charAt(0).toUpperCase() + t.substring(1)), (Mt[n] = Mt[t]));
    });
  });
  function xt(t, n, s) {
    return n == null || typeof n == "boolean" || n === ""
      ? ""
      : s || typeof n != "number" || n === 0 || (Mt.hasOwnProperty(t) && Mt[t])
        ? ("" + n).trim()
        : n + "px";
  }
  function vt(t, n) {
    t = t.style;
    for (var s in n)
      if (n.hasOwnProperty(s)) {
        var a = s.indexOf("--") === 0,
          f = xt(s, n[s], a);
        (s === "float" && (s = "cssFloat"),
          a ? t.setProperty(s, f) : (t[s] = f));
      }
  }
  var or = U(
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
  function yn(t, n) {
    if (n) {
      if (or[t] && (n.children != null || n.dangerouslySetInnerHTML != null))
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
  function sr(t, n) {
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
  var bo = null;
  function jo(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var _o = null,
    Rn = null,
    Tn = null;
  function Xs(t) {
    if ((t = Zo(t))) {
      if (typeof _o != "function") throw Error(o(280));
      var n = t.stateNode;
      n && ((n = ki(n)), _o(t.stateNode, t.type, n));
    }
  }
  function Ks(t) {
    Rn ? (Tn ? Tn.push(t) : (Tn = [t])) : (Rn = t);
  }
  function Qs() {
    if (Rn) {
      var t = Rn,
        n = Tn;
      if (((Tn = Rn = null), Xs(t), n)) for (t = 0; t < n.length; t++) Xs(n[t]);
    }
  }
  function Gs(t, n) {
    return t(n);
  }
  function qs() {}
  var Io = !1;
  function Js(t, n, s) {
    if (Io) return t(n, s);
    Io = !0;
    try {
      return Gs(t, n, s);
    } finally {
      ((Io = !1), (Rn !== null || Tn !== null) && (qs(), Qs()));
    }
  }
  function ir(t, n) {
    var s = t.stateNode;
    if (s === null) return null;
    var a = ki(s);
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
  var Mo = !1;
  if (d)
    try {
      var lr = {};
      (Object.defineProperty(lr, "passive", {
        get: function () {
          Mo = !0;
        },
      }),
        window.addEventListener("test", lr, lr),
        window.removeEventListener("test", lr, lr));
    } catch {
      Mo = !1;
    }
  function ra(t, n, s, a, f, y, N, T, O) {
    var ee = Array.prototype.slice.call(arguments, 3);
    try {
      n.apply(s, ee);
    } catch (ae) {
      this.onError(ae);
    }
  }
  var ar = !1,
    Rr = null,
    Tr = !1,
    Po = null,
    oa = {
      onError: function (t) {
        ((ar = !0), (Rr = t));
      },
    };
  function sa(t, n, s, a, f, y, N, T, O) {
    ((ar = !1), (Rr = null), ra.apply(oa, arguments));
  }
  function ia(t, n, s, a, f, y, N, T, O) {
    if ((sa.apply(this, arguments), ar)) {
      if (ar) {
        var ee = Rr;
        ((ar = !1), (Rr = null));
      } else throw Error(o(198));
      Tr || ((Tr = !0), (Po = ee));
    }
  }
  function on(t) {
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
  function Ro(t) {
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
  function To(t) {
    if (on(t) !== t) throw Error(o(188));
  }
  function la(t) {
    var n = t.alternate;
    if (!n) {
      if (((n = on(t)), n === null)) throw Error(o(188));
      return n !== t ? null : t;
    }
    for (var s = t, a = n; ; ) {
      var f = s.return;
      if (f === null) break;
      var y = f.alternate;
      if (y === null) {
        if (((a = f.return), a !== null)) {
          s = a;
          continue;
        }
        break;
      }
      if (f.child === y.child) {
        for (y = f.child; y; ) {
          if (y === s) return (To(f), t);
          if (y === a) return (To(f), n);
          y = y.sibling;
        }
        throw Error(o(188));
      }
      if (s.return !== a.return) ((s = f), (a = y));
      else {
        for (var N = !1, T = f.child; T; ) {
          if (T === s) {
            ((N = !0), (s = f), (a = y));
            break;
          }
          if (T === a) {
            ((N = !0), (a = f), (s = y));
            break;
          }
          T = T.sibling;
        }
        if (!N) {
          for (T = y.child; T; ) {
            if (T === s) {
              ((N = !0), (s = y), (a = f));
              break;
            }
            if (T === a) {
              ((N = !0), (a = y), (s = f));
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
  function Zs(t) {
    return ((t = la(t)), t !== null ? ei(t) : null);
  }
  function ei(t) {
    if (t.tag === 5 || t.tag === 6) return t;
    for (t = t.child; t !== null; ) {
      var n = ei(t);
      if (n !== null) return n;
      t = t.sibling;
    }
    return null;
  }
  var ti = r.unstable_scheduleCallback,
    ni = r.unstable_cancelCallback,
    aa = r.unstable_shouldYield,
    ri = r.unstable_requestPaint,
    Ge = r.unstable_now,
    ua = r.unstable_getCurrentPriorityLevel,
    Lo = r.unstable_ImmediatePriority,
    oi = r.unstable_UserBlockingPriority,
    Lr = r.unstable_NormalPriority,
    ca = r.unstable_LowPriority,
    si = r.unstable_IdlePriority,
    ur = null,
    Ot = null;
  function da(t) {
    if (Ot && typeof Ot.onCommitFiberRoot == "function")
      try {
        Ot.onCommitFiberRoot(ur, t, void 0, (t.current.flags & 128) === 128);
      } catch {}
  }
  var Pt = Math.clz32 ? Math.clz32 : pa,
    fa = Math.log,
    ha = Math.LN2;
  function pa(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((fa(t) / ha) | 0)) | 0);
  }
  var zr = 64,
    Ar = 4194304;
  function sn(t) {
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
  function $r(t, n) {
    var s = t.pendingLanes;
    if (s === 0) return 0;
    var a = 0,
      f = t.suspendedLanes,
      y = t.pingedLanes,
      N = s & 268435455;
    if (N !== 0) {
      var T = N & ~f;
      T !== 0 ? (a = sn(T)) : ((y &= N), y !== 0 && (a = sn(y)));
    } else ((N = s & ~f), N !== 0 ? (a = sn(N)) : y !== 0 && (a = sn(y)));
    if (a === 0) return 0;
    if (
      n !== 0 &&
      n !== a &&
      (n & f) === 0 &&
      ((f = a & -a), (y = n & -n), f >= y || (f === 16 && (y & 4194240) !== 0))
    )
      return n;
    if (((a & 4) !== 0 && (a |= s & 16), (n = t.entangledLanes), n !== 0))
      for (t = t.entanglements, n &= a; 0 < n; )
        ((s = 31 - Pt(n)), (f = 1 << s), (a |= t[s]), (n &= ~f));
    return a;
  }
  function ii(t, n) {
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
        f = t.expirationTimes,
        y = t.pendingLanes;
      0 < y;
    ) {
      var N = 31 - Pt(y),
        T = 1 << N,
        O = f[N];
      (O === -1
        ? ((T & s) === 0 || (T & a) !== 0) && (f[N] = ii(T, n))
        : O <= n && (t.expiredLanes |= T),
        (y &= ~T));
    }
  }
  function zo(t) {
    return (
      (t = t.pendingLanes & -1073741825),
      t !== 0 ? t : t & 1073741824 ? 1073741824 : 0
    );
  }
  function Dr() {
    var t = zr;
    return ((zr <<= 1), (zr & 4194240) === 0 && (zr = 64), t);
  }
  function Ao(t) {
    for (var n = [], s = 0; 31 > s; s++) n.push(t);
    return n;
  }
  function cr(t, n, s) {
    ((t.pendingLanes |= n),
      n !== 536870912 && ((t.suspendedLanes = 0), (t.pingedLanes = 0)),
      (t = t.eventTimes),
      (n = 31 - Pt(n)),
      (t[n] = s));
  }
  function li(t, n) {
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
      var f = 31 - Pt(s),
        y = 1 << f;
      ((n[f] = 0), (a[f] = -1), (t[f] = -1), (s &= ~y));
    }
  }
  function ga(t, n) {
    var s = (t.entangledLanes |= n);
    for (t = t.entanglements; s; ) {
      var a = 31 - Pt(s),
        f = 1 << a;
      ((f & n) | (t[a] & n) && (t[a] |= n), (s &= ~f));
    }
  }
  var Oe = 0;
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
    xa = !1,
    ai = [],
    Ln = null,
    zn = null,
    An = null,
    $o = new Map(),
    Do = new Map(),
    $n = [],
    _g =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " "
      );
  function xd(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ln = null;
        break;
      case "dragenter":
      case "dragleave":
        zn = null;
        break;
      case "mouseover":
      case "mouseout":
        An = null;
        break;
      case "pointerover":
      case "pointerout":
        $o.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Do.delete(n.pointerId);
    }
  }
  function Oo(t, n, s, a, f, y) {
    return t === null || t.nativeEvent !== y
      ? ((t = {
          blockedOn: n,
          domEventName: s,
          eventSystemFlags: a,
          nativeEvent: y,
          targetContainers: [f],
        }),
        n !== null && ((n = Zo(n)), n !== null && ya(n)),
        t)
      : ((t.eventSystemFlags |= a),
        (n = t.targetContainers),
        f !== null && n.indexOf(f) === -1 && n.push(f),
        t);
  }
  function Ig(t, n, s, a, f) {
    switch (n) {
      case "focusin":
        return ((Ln = Oo(Ln, t, n, s, a, f)), !0);
      case "dragenter":
        return ((zn = Oo(zn, t, n, s, a, f)), !0);
      case "mouseover":
        return ((An = Oo(An, t, n, s, a, f)), !0);
      case "pointerover":
        var y = f.pointerId;
        return ($o.set(y, Oo($o.get(y) || null, t, n, s, a, f)), !0);
      case "gotpointercapture":
        return (
          (y = f.pointerId),
          Do.set(y, Oo(Do.get(y) || null, t, n, s, a, f)),
          !0
        );
    }
    return !1;
  }
  function vd(t) {
    var n = dr(t.target);
    if (n !== null) {
      var s = on(n);
      if (s !== null) {
        if (((n = s.tag), n === 13)) {
          if (((n = Ro(s)), n !== null)) {
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
  function ui(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var s = wa(t.domEventName, t.eventSystemFlags, n[0], t.nativeEvent);
      if (s === null) {
        s = t.nativeEvent;
        var a = new s.constructor(s.type, s);
        ((bo = a), s.target.dispatchEvent(a), (bo = null));
      } else return ((n = Zo(s)), n !== null && ya(n), (t.blockedOn = s), !1);
      n.shift();
    }
    return !0;
  }
  function wd(t, n, s) {
    ui(t) && s.delete(n);
  }
  function Mg() {
    ((xa = !1),
      Ln !== null && ui(Ln) && (Ln = null),
      zn !== null && ui(zn) && (zn = null),
      An !== null && ui(An) && (An = null),
      $o.forEach(wd),
      Do.forEach(wd));
  }
  function Fo(t, n) {
    t.blockedOn === n &&
      ((t.blockedOn = null),
      xa ||
        ((xa = !0),
        r.unstable_scheduleCallback(r.unstable_NormalPriority, Mg)));
  }
  function Ho(t) {
    function n(f) {
      return Fo(f, t);
    }
    if (0 < ai.length) {
      Fo(ai[0], t);
      for (var s = 1; s < ai.length; s++) {
        var a = ai[s];
        a.blockedOn === t && (a.blockedOn = null);
      }
    }
    for (
      Ln !== null && Fo(Ln, t),
        zn !== null && Fo(zn, t),
        An !== null && Fo(An, t),
        $o.forEach(n),
        Do.forEach(n),
        s = 0;
      s < $n.length;
      s++
    )
      ((a = $n[s]), a.blockedOn === t && (a.blockedOn = null));
    for (; 0 < $n.length && ((s = $n[0]), s.blockedOn === null); )
      (vd(s), s.blockedOn === null && $n.shift());
  }
  var Or = _.ReactCurrentBatchConfig,
    ci = !0;
  function Pg(t, n, s, a) {
    var f = Oe,
      y = Or.transition;
    Or.transition = null;
    try {
      ((Oe = 1), va(t, n, s, a));
    } finally {
      ((Oe = f), (Or.transition = y));
    }
  }
  function Rg(t, n, s, a) {
    var f = Oe,
      y = Or.transition;
    Or.transition = null;
    try {
      ((Oe = 4), va(t, n, s, a));
    } finally {
      ((Oe = f), (Or.transition = y));
    }
  }
  function va(t, n, s, a) {
    if (ci) {
      var f = wa(t, n, s, a);
      if (f === null) ($a(t, n, a, di, s), xd(t, a));
      else if (Ig(f, t, n, s, a)) a.stopPropagation();
      else if ((xd(t, a), n & 4 && -1 < _g.indexOf(t))) {
        for (; f !== null; ) {
          var y = Zo(f);
          if (
            (y !== null && pd(y),
            (y = wa(t, n, s, a)),
            y === null && $a(t, n, a, di, s),
            y === f)
          )
            break;
          f = y;
        }
        f !== null && a.stopPropagation();
      } else $a(t, n, a, null, s);
    }
  }
  var di = null;
  function wa(t, n, s, a) {
    if (((di = null), (t = jo(a)), (t = dr(t)), t !== null))
      if (((n = on(t)), n === null)) t = null;
      else if (((s = n.tag), s === 13)) {
        if (((t = Ro(n)), t !== null)) return t;
        t = null;
      } else if (s === 3) {
        if (n.stateNode.current.memoizedState.isDehydrated)
          return n.tag === 3 ? n.stateNode.containerInfo : null;
        t = null;
      } else n !== t && (t = null);
    return ((di = t), null);
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
          case Lo:
            return 1;
          case oi:
            return 4;
          case Lr:
          case ca:
            return 16;
          case si:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Dn = null,
    Sa = null,
    fi = null;
  function Ed() {
    if (fi) return fi;
    var t,
      n = Sa,
      s = n.length,
      a,
      f = "value" in Dn ? Dn.value : Dn.textContent,
      y = f.length;
    for (t = 0; t < s && n[t] === f[t]; t++);
    var N = s - t;
    for (a = 1; a <= N && n[s - a] === f[y - a]; a++);
    return (fi = f.slice(t, 1 < a ? 1 - a : void 0));
  }
  function hi(t) {
    var n = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && n === 13 && (t = 13))
        : (t = n),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function pi() {
    return !0;
  }
  function kd() {
    return !1;
  }
  function Rt(t) {
    function n(s, a, f, y, N) {
      ((this._reactName = s),
        (this._targetInst = f),
        (this.type = a),
        (this.nativeEvent = y),
        (this.target = N),
        (this.currentTarget = null));
      for (var T in t)
        t.hasOwnProperty(T) && ((s = t[T]), (this[T] = s ? s(y) : y[T]));
      return (
        (this.isDefaultPrevented = (
          y.defaultPrevented != null ? y.defaultPrevented : y.returnValue === !1
        )
          ? pi
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
            (this.isDefaultPrevented = pi));
        },
        stopPropagation: function () {
          var s = this.nativeEvent;
          s &&
            (s.stopPropagation
              ? s.stopPropagation()
              : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0),
            (this.isPropagationStopped = pi));
        },
        persist: function () {},
        isPersistent: pi,
      }),
      n
    );
  }
  var Fr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ea = Rt(Fr),
    Bo = U({}, Fr, { view: 0, detail: 0 }),
    Tg = Rt(Bo),
    ka,
    Na,
    Vo,
    mi = U({}, Bo, {
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
          : (t !== Vo &&
              (Vo && t.type === "mousemove"
                ? ((ka = t.screenX - Vo.screenX), (Na = t.screenY - Vo.screenY))
                : (Na = ka = 0),
              (Vo = t)),
            ka);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : Na;
      },
    }),
    Nd = Rt(mi),
    Lg = U({}, mi, { dataTransfer: 0 }),
    zg = Rt(Lg),
    Ag = U({}, Bo, { relatedTarget: 0 }),
    Ca = Rt(Ag),
    $g = U({}, Fr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Dg = Rt($g),
    Og = U({}, Fr, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    Fg = Rt(Og),
    Hg = U({}, Fr, { data: 0 }),
    Cd = Rt(Hg),
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
  var Yg = U({}, Bo, {
      key: function (t) {
        if (t.key) {
          var n = Bg[t.key] || t.key;
          if (n !== "Unidentified") return n;
        }
        return t.type === "keypress"
          ? ((t = hi(t)), t === 13 ? "Enter" : String.fromCharCode(t))
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
        return t.type === "keypress" ? hi(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? hi(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    Xg = Rt(Yg),
    Kg = U({}, mi, {
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
    bd = Rt(Kg),
    Qg = U({}, Bo, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ba,
    }),
    Gg = Rt(Qg),
    qg = U({}, Fr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Jg = Rt(qg),
    Zg = U({}, mi, {
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
    ey = Rt(Zg),
    ty = [9, 13, 27, 32],
    ja = d && "CompositionEvent" in window,
    Wo = null;
  d && "documentMode" in document && (Wo = document.documentMode);
  var ny = d && "TextEvent" in window && !Wo,
    jd = d && (!ja || (Wo && 8 < Wo && 11 >= Wo)),
    _d = " ",
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
  var Hr = !1;
  function ry(t, n) {
    switch (t) {
      case "compositionend":
        return Pd(n);
      case "keypress":
        return n.which !== 32 ? null : ((Id = !0), _d);
      case "textInput":
        return ((t = n.data), t === _d && Id ? null : t);
      default:
        return null;
    }
  }
  function oy(t, n) {
    if (Hr)
      return t === "compositionend" || (!ja && Md(t, n))
        ? ((t = Ed()), (fi = Sa = Dn = null), (Hr = !1), t)
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
        return jd && n.locale !== "ko" ? null : n.data;
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
    (Ks(a),
      (n = wi(n, "onChange")),
      0 < n.length &&
        ((s = new Ea("onChange", "change", null, s, a)),
        t.push({ event: s, listeners: n })));
  }
  var Uo = null,
    Yo = null;
  function iy(t) {
    qd(t, 0);
  }
  function gi(t) {
    var n = Yr(t);
    if (pe(n)) return t;
  }
  function ly(t, n) {
    if (t === "change") return n;
  }
  var Ld = !1;
  if (d) {
    var _a;
    if (d) {
      var Ia = "oninput" in document;
      if (!Ia) {
        var zd = document.createElement("div");
        (zd.setAttribute("oninput", "return;"),
          (Ia = typeof zd.oninput == "function"));
      }
      _a = Ia;
    } else _a = !1;
    Ld = _a && (!document.documentMode || 9 < document.documentMode);
  }
  function Ad() {
    Uo && (Uo.detachEvent("onpropertychange", $d), (Yo = Uo = null));
  }
  function $d(t) {
    if (t.propertyName === "value" && gi(Yo)) {
      var n = [];
      (Td(n, Yo, t, jo(t)), Js(iy, n));
    }
  }
  function ay(t, n, s) {
    t === "focusin"
      ? (Ad(), (Uo = n), (Yo = s), Uo.attachEvent("onpropertychange", $d))
      : t === "focusout" && Ad();
  }
  function uy(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return gi(Yo);
  }
  function cy(t, n) {
    if (t === "click") return gi(n);
  }
  function dy(t, n) {
    if (t === "input" || t === "change") return gi(n);
  }
  function fy(t, n) {
    return (t === n && (t !== 0 || 1 / t === 1 / n)) || (t !== t && n !== n);
  }
  var Xt = typeof Object.is == "function" ? Object.is : fy;
  function Xo(t, n) {
    if (Xt(t, n)) return !0;
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
      var f = s[a];
      if (!p.call(n, f) || !Xt(t[f], n[f])) return !1;
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
    for (var t = window, n = ge(); n instanceof t.HTMLIFrameElement; ) {
      try {
        var s = typeof n.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) t = n.contentWindow;
      else break;
      n = ge(t.document);
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
          var f = s.textContent.length,
            y = Math.min(a.start, f);
          ((a = a.end === void 0 ? y : Math.min(a.end, f)),
            !t.extend && y > a && ((f = a), (a = y), (y = f)),
            (f = Od(s, y)));
          var N = Od(s, a);
          f &&
            N &&
            (t.rangeCount !== 1 ||
              t.anchorNode !== f.node ||
              t.anchorOffset !== f.offset ||
              t.focusNode !== N.node ||
              t.focusOffset !== N.offset) &&
            ((n = n.createRange()),
            n.setStart(f.node, f.offset),
            t.removeAllRanges(),
            y > a
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
  var py = d && "documentMode" in document && 11 >= document.documentMode,
    Br = null,
    Pa = null,
    Ko = null,
    Ra = !1;
  function Bd(t, n, s) {
    var a =
      s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Ra ||
      Br == null ||
      Br !== ge(a) ||
      ((a = Br),
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
      (Ko && Xo(Ko, a)) ||
        ((Ko = a),
        (a = wi(Pa, "onSelect")),
        0 < a.length &&
          ((n = new Ea("onSelect", "select", null, n, s)),
          t.push({ event: n, listeners: a }),
          (n.target = Br))));
  }
  function yi(t, n) {
    var s = {};
    return (
      (s[t.toLowerCase()] = n.toLowerCase()),
      (s["Webkit" + t] = "webkit" + n),
      (s["Moz" + t] = "moz" + n),
      s
    );
  }
  var Vr = {
      animationend: yi("Animation", "AnimationEnd"),
      animationiteration: yi("Animation", "AnimationIteration"),
      animationstart: yi("Animation", "AnimationStart"),
      transitionend: yi("Transition", "TransitionEnd"),
    },
    Ta = {},
    Vd = {};
  d &&
    ((Vd = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Vr.animationend.animation,
      delete Vr.animationiteration.animation,
      delete Vr.animationstart.animation),
    "TransitionEvent" in window || delete Vr.transitionend.transition);
  function xi(t) {
    if (Ta[t]) return Ta[t];
    if (!Vr[t]) return t;
    var n = Vr[t],
      s;
    for (s in n) if (n.hasOwnProperty(s) && s in Vd) return (Ta[t] = n[s]);
    return t;
  }
  var Wd = xi("animationend"),
    Ud = xi("animationiteration"),
    Yd = xi("animationstart"),
    Xd = xi("transitionend"),
    Kd = new Map(),
    Qd =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  function On(t, n) {
    (Kd.set(t, n), u(n, [t]));
  }
  for (var La = 0; La < Qd.length; La++) {
    var za = Qd[La],
      my = za.toLowerCase(),
      gy = za[0].toUpperCase() + za.slice(1);
    On(my, "on" + gy);
  }
  (On(Wd, "onAnimationEnd"),
    On(Ud, "onAnimationIteration"),
    On(Yd, "onAnimationStart"),
    On("dblclick", "onDoubleClick"),
    On("focusin", "onFocus"),
    On("focusout", "onBlur"),
    On(Xd, "onTransitionEnd"),
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
  var Qo =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    yy = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Qo)
    );
  function Gd(t, n, s) {
    var a = t.type || "unknown-event";
    ((t.currentTarget = s), ia(a, n, void 0, t), (t.currentTarget = null));
  }
  function qd(t, n) {
    n = (n & 4) !== 0;
    for (var s = 0; s < t.length; s++) {
      var a = t[s],
        f = a.event;
      a = a.listeners;
      e: {
        var y = void 0;
        if (n)
          for (var N = a.length - 1; 0 <= N; N--) {
            var T = a[N],
              O = T.instance,
              ee = T.currentTarget;
            if (((T = T.listener), O !== y && f.isPropagationStopped()))
              break e;
            (Gd(f, T, ee), (y = O));
          }
        else
          for (N = 0; N < a.length; N++) {
            if (
              ((T = a[N]),
              (O = T.instance),
              (ee = T.currentTarget),
              (T = T.listener),
              O !== y && f.isPropagationStopped())
            )
              break e;
            (Gd(f, T, ee), (y = O));
          }
      }
    }
    if (Tr) throw ((t = Po), (Tr = !1), (Po = null), t);
  }
  function Ve(t, n) {
    var s = n[Va];
    s === void 0 && (s = n[Va] = new Set());
    var a = t + "__bubble";
    s.has(a) || (Jd(n, t, 2, !1), s.add(a));
  }
  function Aa(t, n, s) {
    var a = 0;
    (n && (a |= 4), Jd(s, t, a, n));
  }
  var vi = "_reactListening" + Math.random().toString(36).slice(2);
  function Go(t) {
    if (!t[vi]) {
      ((t[vi] = !0),
        i.forEach(function (s) {
          s !== "selectionchange" && (yy.has(s) || Aa(s, !1, t), Aa(s, !0, t));
        }));
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[vi] || ((n[vi] = !0), Aa("selectionchange", !1, n));
    }
  }
  function Jd(t, n, s, a) {
    switch (Sd(n)) {
      case 1:
        var f = Pg;
        break;
      case 4:
        f = Rg;
        break;
      default:
        f = va;
    }
    ((s = f.bind(null, n, s, t)),
      (f = void 0),
      !Mo ||
        (n !== "touchstart" && n !== "touchmove" && n !== "wheel") ||
        (f = !0),
      a
        ? f !== void 0
          ? t.addEventListener(n, s, { capture: !0, passive: f })
          : t.addEventListener(n, s, !0)
        : f !== void 0
          ? t.addEventListener(n, s, { passive: f })
          : t.addEventListener(n, s, !1));
  }
  function $a(t, n, s, a, f) {
    var y = a;
    if ((n & 1) === 0 && (n & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var N = a.tag;
        if (N === 3 || N === 4) {
          var T = a.stateNode.containerInfo;
          if (T === f || (T.nodeType === 8 && T.parentNode === f)) break;
          if (N === 4)
            for (N = a.return; N !== null; ) {
              var O = N.tag;
              if (
                (O === 3 || O === 4) &&
                ((O = N.stateNode.containerInfo),
                O === f || (O.nodeType === 8 && O.parentNode === f))
              )
                return;
              N = N.return;
            }
          for (; T !== null; ) {
            if (((N = dr(T)), N === null)) return;
            if (((O = N.tag), O === 5 || O === 6)) {
              a = y = N;
              continue e;
            }
            T = T.parentNode;
          }
        }
        a = a.return;
      }
    Js(function () {
      var ee = y,
        ae = jo(s),
        ue = [];
      e: {
        var le = Kd.get(t);
        if (le !== void 0) {
          var xe = Ea,
            we = t;
          switch (t) {
            case "keypress":
              if (hi(s) === 0) break e;
            case "keydown":
            case "keyup":
              xe = Xg;
              break;
            case "focusin":
              ((we = "focus"), (xe = Ca));
              break;
            case "focusout":
              ((we = "blur"), (xe = Ca));
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
              xe = Jg;
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
          var Ee = (n & 4) !== 0,
            et = !Ee && t === "scroll",
            J = Ee ? (le !== null ? le + "Capture" : null) : le;
          Ee = [];
          for (var W = ee, Z; W !== null; ) {
            Z = W;
            var de = Z.stateNode;
            if (
              (Z.tag === 5 &&
                de !== null &&
                ((Z = de),
                J !== null &&
                  ((de = ir(W, J)), de != null && Ee.push(qo(W, de, Z)))),
              et)
            )
              break;
            W = W.return;
          }
          0 < Ee.length &&
            ((le = new xe(le, we, null, s, ae)),
            ue.push({ event: le, listeners: Ee }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((le = t === "mouseover" || t === "pointerover"),
            (xe = t === "mouseout" || t === "pointerout"),
            le &&
              s !== bo &&
              (we = s.relatedTarget || s.fromElement) &&
              (dr(we) || we[xn]))
          )
            break e;
          if (
            (xe || le) &&
            ((le =
              ae.window === ae
                ? ae
                : (le = ae.ownerDocument)
                  ? le.defaultView || le.parentWindow
                  : window),
            xe
              ? ((we = s.relatedTarget || s.toElement),
                (xe = ee),
                (we = we ? dr(we) : null),
                we !== null &&
                  ((et = on(we)),
                  we !== et || (we.tag !== 5 && we.tag !== 6)) &&
                  (we = null))
              : ((xe = null), (we = ee)),
            xe !== we)
          ) {
            if (
              ((Ee = Nd),
              (de = "onMouseLeave"),
              (J = "onMouseEnter"),
              (W = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((Ee = bd),
                (de = "onPointerLeave"),
                (J = "onPointerEnter"),
                (W = "pointer")),
              (et = xe == null ? le : Yr(xe)),
              (Z = we == null ? le : Yr(we)),
              (le = new Ee(de, W + "leave", xe, s, ae)),
              (le.target = et),
              (le.relatedTarget = Z),
              (de = null),
              dr(ae) === ee &&
                ((Ee = new Ee(J, W + "enter", we, s, ae)),
                (Ee.target = Z),
                (Ee.relatedTarget = et),
                (de = Ee)),
              (et = de),
              xe && we)
            )
              t: {
                for (Ee = xe, J = we, W = 0, Z = Ee; Z; Z = Wr(Z)) W++;
                for (Z = 0, de = J; de; de = Wr(de)) Z++;
                for (; 0 < W - Z; ) ((Ee = Wr(Ee)), W--);
                for (; 0 < Z - W; ) ((J = Wr(J)), Z--);
                for (; W--; ) {
                  if (Ee === J || (J !== null && Ee === J.alternate)) break t;
                  ((Ee = Wr(Ee)), (J = Wr(J)));
                }
                Ee = null;
              }
            else Ee = null;
            (xe !== null && Zd(ue, le, xe, Ee, !1),
              we !== null && et !== null && Zd(ue, et, we, Ee, !0));
          }
        }
        e: {
          if (
            ((le = ee ? Yr(ee) : window),
            (xe = le.nodeName && le.nodeName.toLowerCase()),
            xe === "select" || (xe === "input" && le.type === "file"))
          )
            var ke = ly;
          else if (Rd(le))
            if (Ld) ke = dy;
            else {
              ke = uy;
              var be = ay;
            }
          else
            (xe = le.nodeName) &&
              xe.toLowerCase() === "input" &&
              (le.type === "checkbox" || le.type === "radio") &&
              (ke = cy);
          if (ke && (ke = ke(t, ee))) {
            Td(ue, ke, s, ae);
            break e;
          }
          (be && be(t, le, ee),
            t === "focusout" &&
              (be = le._wrapperState) &&
              be.controlled &&
              le.type === "number" &&
              _e(le, "number", le.value));
        }
        switch (((be = ee ? Yr(ee) : window), t)) {
          case "focusin":
            (Rd(be) || be.contentEditable === "true") &&
              ((Br = be), (Pa = ee), (Ko = null));
            break;
          case "focusout":
            Ko = Pa = Br = null;
            break;
          case "mousedown":
            Ra = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Ra = !1), Bd(ue, s, ae));
            break;
          case "selectionchange":
            if (py) break;
          case "keydown":
          case "keyup":
            Bd(ue, s, ae);
        }
        var je;
        if (ja)
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
          Hr
            ? Md(t, s) && (Me = "onCompositionEnd")
            : t === "keydown" &&
              s.keyCode === 229 &&
              (Me = "onCompositionStart");
        (Me &&
          (jd &&
            s.locale !== "ko" &&
            (Hr || Me !== "onCompositionStart"
              ? Me === "onCompositionEnd" && Hr && (je = Ed())
              : ((Dn = ae),
                (Sa = "value" in Dn ? Dn.value : Dn.textContent),
                (Hr = !0))),
          (be = wi(ee, Me)),
          0 < be.length &&
            ((Me = new Cd(Me, t, null, s, ae)),
            ue.push({ event: Me, listeners: be }),
            je
              ? (Me.data = je)
              : ((je = Pd(s)), je !== null && (Me.data = je)))),
          (je = ny ? ry(t, s) : oy(t, s)) &&
            ((ee = wi(ee, "onBeforeInput")),
            0 < ee.length &&
              ((ae = new Cd("onBeforeInput", "beforeinput", null, s, ae)),
              ue.push({ event: ae, listeners: ee }),
              (ae.data = je))));
      }
      qd(ue, n);
    });
  }
  function qo(t, n, s) {
    return { instance: t, listener: n, currentTarget: s };
  }
  function wi(t, n) {
    for (var s = n + "Capture", a = []; t !== null; ) {
      var f = t,
        y = f.stateNode;
      (f.tag === 5 &&
        y !== null &&
        ((f = y),
        (y = ir(t, s)),
        y != null && a.unshift(qo(t, y, f)),
        (y = ir(t, n)),
        y != null && a.push(qo(t, y, f))),
        (t = t.return));
    }
    return a;
  }
  function Wr(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5);
    return t || null;
  }
  function Zd(t, n, s, a, f) {
    for (var y = n._reactName, N = []; s !== null && s !== a; ) {
      var T = s,
        O = T.alternate,
        ee = T.stateNode;
      if (O !== null && O === a) break;
      (T.tag === 5 &&
        ee !== null &&
        ((T = ee),
        f
          ? ((O = ir(s, y)), O != null && N.unshift(qo(s, O, T)))
          : f || ((O = ir(s, y)), O != null && N.push(qo(s, O, T)))),
        (s = s.return));
    }
    N.length !== 0 && t.push({ event: n, listeners: N });
  }
  var xy = /\r\n?/g,
    vy = /\u0000|\uFFFD/g;
  function ef(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        xy,
        `
`
      )
      .replace(vy, "");
  }
  function Si(t, n, s) {
    if (((n = ef(n)), ef(t) !== n && s)) throw Error(o(425));
  }
  function Ei() {}
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
      var f = s.nextSibling;
      if ((t.removeChild(s), f && f.nodeType === 8))
        if (((s = f.data), s === "/$")) {
          if (a === 0) {
            (t.removeChild(f), Ho(n));
            return;
          }
          a--;
        } else (s !== "$" && s !== "$?" && s !== "$!") || a++;
      s = f;
    } while (s);
    Ho(n);
  }
  function Fn(t) {
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
  var Ur = Math.random().toString(36).slice(2),
    ln = "__reactFiber$" + Ur,
    Jo = "__reactProps$" + Ur,
    xn = "__reactContainer$" + Ur,
    Va = "__reactEvents$" + Ur,
    ky = "__reactListeners$" + Ur,
    Ny = "__reactHandles$" + Ur;
  function dr(t) {
    var n = t[ln];
    if (n) return n;
    for (var s = t.parentNode; s; ) {
      if ((n = s[xn] || s[ln])) {
        if (
          ((s = n.alternate),
          n.child !== null || (s !== null && s.child !== null))
        )
          for (t = nf(t); t !== null; ) {
            if ((s = t[ln])) return s;
            t = nf(t);
          }
        return n;
      }
      ((t = s), (s = t.parentNode));
    }
    return null;
  }
  function Zo(t) {
    return (
      (t = t[ln] || t[xn]),
      !t || (t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3)
        ? null
        : t
    );
  }
  function Yr(t) {
    if (t.tag === 5 || t.tag === 6) return t.stateNode;
    throw Error(o(33));
  }
  function ki(t) {
    return t[Jo] || null;
  }
  var Wa = [],
    Xr = -1;
  function Hn(t) {
    return { current: t };
  }
  function We(t) {
    0 > Xr || ((t.current = Wa[Xr]), (Wa[Xr] = null), Xr--);
  }
  function He(t, n) {
    (Xr++, (Wa[Xr] = t.current), (t.current = n));
  }
  var Bn = {},
    pt = Hn(Bn),
    kt = Hn(!1),
    fr = Bn;
  function Kr(t, n) {
    var s = t.type.contextTypes;
    if (!s) return Bn;
    var a = t.stateNode;
    if (a && a.__reactInternalMemoizedUnmaskedChildContext === n)
      return a.__reactInternalMemoizedMaskedChildContext;
    var f = {},
      y;
    for (y in s) f[y] = n[y];
    return (
      a &&
        ((t = t.stateNode),
        (t.__reactInternalMemoizedUnmaskedChildContext = n),
        (t.__reactInternalMemoizedMaskedChildContext = f)),
      f
    );
  }
  function Nt(t) {
    return ((t = t.childContextTypes), t != null);
  }
  function Ni() {
    (We(kt), We(pt));
  }
  function rf(t, n, s) {
    if (pt.current !== Bn) throw Error(o(168));
    (He(pt, n), He(kt, s));
  }
  function of(t, n, s) {
    var a = t.stateNode;
    if (((n = n.childContextTypes), typeof a.getChildContext != "function"))
      return s;
    a = a.getChildContext();
    for (var f in a) if (!(f in n)) throw Error(o(108, re(t) || "Unknown", f));
    return U({}, s, a);
  }
  function Ci(t) {
    return (
      (t =
        ((t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext) ||
        Bn),
      (fr = pt.current),
      He(pt, t),
      He(kt, kt.current),
      !0
    );
  }
  function sf(t, n, s) {
    var a = t.stateNode;
    if (!a) throw Error(o(169));
    (s
      ? ((t = of(t, n, fr)),
        (a.__reactInternalMemoizedMergedChildContext = t),
        We(kt),
        We(pt),
        He(pt, t))
      : We(kt),
      He(kt, s));
  }
  var vn = null,
    bi = !1,
    Ua = !1;
  function lf(t) {
    vn === null ? (vn = [t]) : vn.push(t);
  }
  function Cy(t) {
    ((bi = !0), lf(t));
  }
  function Vn() {
    if (!Ua && vn !== null) {
      Ua = !0;
      var t = 0,
        n = Oe;
      try {
        var s = vn;
        for (Oe = 1; t < s.length; t++) {
          var a = s[t];
          do a = a(!0);
          while (a !== null);
        }
        ((vn = null), (bi = !1));
      } catch (f) {
        throw (vn !== null && (vn = vn.slice(t + 1)), ti(Lo, Vn), f);
      } finally {
        ((Oe = n), (Ua = !1));
      }
    }
    return null;
  }
  var Qr = [],
    Gr = 0,
    ji = null,
    _i = 0,
    Ft = [],
    Ht = 0,
    hr = null,
    wn = 1,
    Sn = "";
  function pr(t, n) {
    ((Qr[Gr++] = _i), (Qr[Gr++] = ji), (ji = t), (_i = n));
  }
  function af(t, n, s) {
    ((Ft[Ht++] = wn), (Ft[Ht++] = Sn), (Ft[Ht++] = hr), (hr = t));
    var a = wn;
    t = Sn;
    var f = 32 - Pt(a) - 1;
    ((a &= ~(1 << f)), (s += 1));
    var y = 32 - Pt(n) + f;
    if (30 < y) {
      var N = f - (f % 5);
      ((y = (a & ((1 << N) - 1)).toString(32)),
        (a >>= N),
        (f -= N),
        (wn = (1 << (32 - Pt(n) + f)) | (s << f) | a),
        (Sn = y + t));
    } else ((wn = (1 << y) | (s << f) | a), (Sn = t));
  }
  function Ya(t) {
    t.return !== null && (pr(t, 1), af(t, 1, 0));
  }
  function Xa(t) {
    for (; t === ji; )
      ((ji = Qr[--Gr]), (Qr[Gr] = null), (_i = Qr[--Gr]), (Qr[Gr] = null));
    for (; t === hr; )
      ((hr = Ft[--Ht]),
        (Ft[Ht] = null),
        (Sn = Ft[--Ht]),
        (Ft[Ht] = null),
        (wn = Ft[--Ht]),
        (Ft[Ht] = null));
  }
  var Tt = null,
    Lt = null,
    Ue = !1,
    Kt = null;
  function uf(t, n) {
    var s = Ut(5, null, null, 0);
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
            ? ((t.stateNode = n), (Tt = t), (Lt = Fn(n.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (n = t.pendingProps === "" || n.nodeType !== 3 ? null : n),
          n !== null ? ((t.stateNode = n), (Tt = t), (Lt = null), !0) : !1
        );
      case 13:
        return (
          (n = n.nodeType !== 8 ? null : n),
          n !== null
            ? ((s = hr !== null ? { id: wn, overflow: Sn } : null),
              (t.memoizedState = {
                dehydrated: n,
                treeContext: s,
                retryLane: 1073741824,
              }),
              (s = Ut(18, null, null, 0)),
              (s.stateNode = n),
              (s.return = t),
              (t.child = s),
              (Tt = t),
              (Lt = null),
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
    if (Ue) {
      var n = Lt;
      if (n) {
        var s = n;
        if (!cf(t, n)) {
          if (Ka(t)) throw Error(o(418));
          n = Fn(s.nextSibling);
          var a = Tt;
          n && cf(t, n)
            ? uf(a, s)
            : ((t.flags = (t.flags & -4097) | 2), (Ue = !1), (Tt = t));
        }
      } else {
        if (Ka(t)) throw Error(o(418));
        ((t.flags = (t.flags & -4097) | 2), (Ue = !1), (Tt = t));
      }
    }
  }
  function df(t) {
    for (
      t = t.return;
      t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13;
    )
      t = t.return;
    Tt = t;
  }
  function Ii(t) {
    if (t !== Tt) return !1;
    if (!Ue) return (df(t), (Ue = !0), !1);
    var n;
    if (
      ((n = t.tag !== 3) &&
        !(n = t.tag !== 5) &&
        ((n = t.type),
        (n = n !== "head" && n !== "body" && !Fa(t.type, t.memoizedProps))),
      n && (n = Lt))
    ) {
      if (Ka(t)) throw (ff(), Error(o(418)));
      for (; n; ) (uf(t, n), (n = Fn(n.nextSibling)));
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
                Lt = Fn(t.nextSibling);
                break e;
              }
              n--;
            } else (s !== "$" && s !== "$!" && s !== "$?") || n++;
          }
          t = t.nextSibling;
        }
        Lt = null;
      }
    } else Lt = Tt ? Fn(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ff() {
    for (var t = Lt; t; ) t = Fn(t.nextSibling);
  }
  function qr() {
    ((Lt = Tt = null), (Ue = !1));
  }
  function Ga(t) {
    Kt === null ? (Kt = [t]) : Kt.push(t);
  }
  var by = _.ReactCurrentBatchConfig;
  function es(t, n, s) {
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
        var f = a,
          y = "" + t;
        return n !== null &&
          n.ref !== null &&
          typeof n.ref == "function" &&
          n.ref._stringRef === y
          ? n.ref
          : ((n = function (N) {
              var T = f.refs;
              N === null ? delete T[y] : (T[y] = N);
            }),
            (n._stringRef = y),
            n);
      }
      if (typeof t != "string") throw Error(o(284));
      if (!s._owner) throw Error(o(290, t));
    }
    return t;
  }
  function Mi(t, n) {
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
    function n(J, W) {
      if (t) {
        var Z = J.deletions;
        Z === null ? ((J.deletions = [W]), (J.flags |= 16)) : Z.push(W);
      }
    }
    function s(J, W) {
      if (!t) return null;
      for (; W !== null; ) (n(J, W), (W = W.sibling));
      return null;
    }
    function a(J, W) {
      for (J = new Map(); W !== null; )
        (W.key !== null ? J.set(W.key, W) : J.set(W.index, W), (W = W.sibling));
      return J;
    }
    function f(J, W) {
      return ((J = qn(J, W)), (J.index = 0), (J.sibling = null), J);
    }
    function y(J, W, Z) {
      return (
        (J.index = Z),
        t
          ? ((Z = J.alternate),
            Z !== null
              ? ((Z = Z.index), Z < W ? ((J.flags |= 2), W) : Z)
              : ((J.flags |= 2), W))
          : ((J.flags |= 1048576), W)
      );
    }
    function N(J) {
      return (t && J.alternate === null && (J.flags |= 2), J);
    }
    function T(J, W, Z, de) {
      return W === null || W.tag !== 6
        ? ((W = Hu(Z, J.mode, de)), (W.return = J), W)
        : ((W = f(W, Z)), (W.return = J), W);
    }
    function O(J, W, Z, de) {
      var ke = Z.type;
      return ke === R
        ? ae(J, W, Z.props.children, de, Z.key)
        : W !== null &&
            (W.elementType === ke ||
              (typeof ke == "object" &&
                ke !== null &&
                ke.$$typeof === B &&
                hf(ke) === W.type))
          ? ((de = f(W, Z.props)), (de.ref = es(J, W, Z)), (de.return = J), de)
          : ((de = el(Z.type, Z.key, Z.props, null, J.mode, de)),
            (de.ref = es(J, W, Z)),
            (de.return = J),
            de);
    }
    function ee(J, W, Z, de) {
      return W === null ||
        W.tag !== 4 ||
        W.stateNode.containerInfo !== Z.containerInfo ||
        W.stateNode.implementation !== Z.implementation
        ? ((W = Bu(Z, J.mode, de)), (W.return = J), W)
        : ((W = f(W, Z.children || [])), (W.return = J), W);
    }
    function ae(J, W, Z, de, ke) {
      return W === null || W.tag !== 7
        ? ((W = Er(Z, J.mode, de, ke)), (W.return = J), W)
        : ((W = f(W, Z)), (W.return = J), W);
    }
    function ue(J, W, Z) {
      if ((typeof W == "string" && W !== "") || typeof W == "number")
        return ((W = Hu("" + W, J.mode, Z)), (W.return = J), W);
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case D:
            return (
              (Z = el(W.type, W.key, W.props, null, J.mode, Z)),
              (Z.ref = es(J, null, W)),
              (Z.return = J),
              Z
            );
          case z:
            return ((W = Bu(W, J.mode, Z)), (W.return = J), W);
          case B:
            var de = W._init;
            return ue(J, de(W._payload), Z);
        }
        if (De(W) || $(W))
          return ((W = Er(W, J.mode, Z, null)), (W.return = J), W);
        Mi(J, W);
      }
      return null;
    }
    function le(J, W, Z, de) {
      var ke = W !== null ? W.key : null;
      if ((typeof Z == "string" && Z !== "") || typeof Z == "number")
        return ke !== null ? null : T(J, W, "" + Z, de);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case D:
            return Z.key === ke ? O(J, W, Z, de) : null;
          case z:
            return Z.key === ke ? ee(J, W, Z, de) : null;
          case B:
            return ((ke = Z._init), le(J, W, ke(Z._payload), de));
        }
        if (De(Z) || $(Z)) return ke !== null ? null : ae(J, W, Z, de, null);
        Mi(J, Z);
      }
      return null;
    }
    function xe(J, W, Z, de, ke) {
      if ((typeof de == "string" && de !== "") || typeof de == "number")
        return ((J = J.get(Z) || null), T(W, J, "" + de, ke));
      if (typeof de == "object" && de !== null) {
        switch (de.$$typeof) {
          case D:
            return (
              (J = J.get(de.key === null ? Z : de.key) || null),
              O(W, J, de, ke)
            );
          case z:
            return (
              (J = J.get(de.key === null ? Z : de.key) || null),
              ee(W, J, de, ke)
            );
          case B:
            var be = de._init;
            return xe(J, W, Z, be(de._payload), ke);
        }
        if (De(de) || $(de))
          return ((J = J.get(Z) || null), ae(W, J, de, ke, null));
        Mi(W, de);
      }
      return null;
    }
    function we(J, W, Z, de) {
      for (
        var ke = null, be = null, je = W, Me = (W = 0), ut = null;
        je !== null && Me < Z.length;
        Me++
      ) {
        je.index > Me ? ((ut = je), (je = null)) : (ut = je.sibling);
        var $e = le(J, je, Z[Me], de);
        if ($e === null) {
          je === null && (je = ut);
          break;
        }
        (t && je && $e.alternate === null && n(J, je),
          (W = y($e, W, Me)),
          be === null ? (ke = $e) : (be.sibling = $e),
          (be = $e),
          (je = ut));
      }
      if (Me === Z.length) return (s(J, je), Ue && pr(J, Me), ke);
      if (je === null) {
        for (; Me < Z.length; Me++)
          ((je = ue(J, Z[Me], de)),
            je !== null &&
              ((W = y(je, W, Me)),
              be === null ? (ke = je) : (be.sibling = je),
              (be = je)));
        return (Ue && pr(J, Me), ke);
      }
      for (je = a(J, je); Me < Z.length; Me++)
        ((ut = xe(je, J, Me, Z[Me], de)),
          ut !== null &&
            (t &&
              ut.alternate !== null &&
              je.delete(ut.key === null ? Me : ut.key),
            (W = y(ut, W, Me)),
            be === null ? (ke = ut) : (be.sibling = ut),
            (be = ut)));
      return (
        t &&
          je.forEach(function (Jn) {
            return n(J, Jn);
          }),
        Ue && pr(J, Me),
        ke
      );
    }
    function Ee(J, W, Z, de) {
      var ke = $(Z);
      if (typeof ke != "function") throw Error(o(150));
      if (((Z = ke.call(Z)), Z == null)) throw Error(o(151));
      for (
        var be = (ke = null), je = W, Me = (W = 0), ut = null, $e = Z.next();
        je !== null && !$e.done;
        Me++, $e = Z.next()
      ) {
        je.index > Me ? ((ut = je), (je = null)) : (ut = je.sibling);
        var Jn = le(J, je, $e.value, de);
        if (Jn === null) {
          je === null && (je = ut);
          break;
        }
        (t && je && Jn.alternate === null && n(J, je),
          (W = y(Jn, W, Me)),
          be === null ? (ke = Jn) : (be.sibling = Jn),
          (be = Jn),
          (je = ut));
      }
      if ($e.done) return (s(J, je), Ue && pr(J, Me), ke);
      if (je === null) {
        for (; !$e.done; Me++, $e = Z.next())
          (($e = ue(J, $e.value, de)),
            $e !== null &&
              ((W = y($e, W, Me)),
              be === null ? (ke = $e) : (be.sibling = $e),
              (be = $e)));
        return (Ue && pr(J, Me), ke);
      }
      for (je = a(J, je); !$e.done; Me++, $e = Z.next())
        (($e = xe(je, J, Me, $e.value, de)),
          $e !== null &&
            (t &&
              $e.alternate !== null &&
              je.delete($e.key === null ? Me : $e.key),
            (W = y($e, W, Me)),
            be === null ? (ke = $e) : (be.sibling = $e),
            (be = $e)));
      return (
        t &&
          je.forEach(function (sx) {
            return n(J, sx);
          }),
        Ue && pr(J, Me),
        ke
      );
    }
    function et(J, W, Z, de) {
      if (
        (typeof Z == "object" &&
          Z !== null &&
          Z.type === R &&
          Z.key === null &&
          (Z = Z.props.children),
        typeof Z == "object" && Z !== null)
      ) {
        switch (Z.$$typeof) {
          case D:
            e: {
              for (var ke = Z.key, be = W; be !== null; ) {
                if (be.key === ke) {
                  if (((ke = Z.type), ke === R)) {
                    if (be.tag === 7) {
                      (s(J, be.sibling),
                        (W = f(be, Z.props.children)),
                        (W.return = J),
                        (J = W));
                      break e;
                    }
                  } else if (
                    be.elementType === ke ||
                    (typeof ke == "object" &&
                      ke !== null &&
                      ke.$$typeof === B &&
                      hf(ke) === be.type)
                  ) {
                    (s(J, be.sibling),
                      (W = f(be, Z.props)),
                      (W.ref = es(J, be, Z)),
                      (W.return = J),
                      (J = W));
                    break e;
                  }
                  s(J, be);
                  break;
                } else n(J, be);
                be = be.sibling;
              }
              Z.type === R
                ? ((W = Er(Z.props.children, J.mode, de, Z.key)),
                  (W.return = J),
                  (J = W))
                : ((de = el(Z.type, Z.key, Z.props, null, J.mode, de)),
                  (de.ref = es(J, W, Z)),
                  (de.return = J),
                  (J = de));
            }
            return N(J);
          case z:
            e: {
              for (be = Z.key; W !== null; ) {
                if (W.key === be)
                  if (
                    W.tag === 4 &&
                    W.stateNode.containerInfo === Z.containerInfo &&
                    W.stateNode.implementation === Z.implementation
                  ) {
                    (s(J, W.sibling),
                      (W = f(W, Z.children || [])),
                      (W.return = J),
                      (J = W));
                    break e;
                  } else {
                    s(J, W);
                    break;
                  }
                else n(J, W);
                W = W.sibling;
              }
              ((W = Bu(Z, J.mode, de)), (W.return = J), (J = W));
            }
            return N(J);
          case B:
            return ((be = Z._init), et(J, W, be(Z._payload), de));
        }
        if (De(Z)) return we(J, W, Z, de);
        if ($(Z)) return Ee(J, W, Z, de);
        Mi(J, Z);
      }
      return (typeof Z == "string" && Z !== "") || typeof Z == "number"
        ? ((Z = "" + Z),
          W !== null && W.tag === 6
            ? (s(J, W.sibling), (W = f(W, Z)), (W.return = J), (J = W))
            : (s(J, W), (W = Hu(Z, J.mode, de)), (W.return = J), (J = W)),
          N(J))
        : s(J, W);
    }
    return et;
  }
  var Jr = pf(!0),
    mf = pf(!1),
    Pi = Hn(null),
    Ri = null,
    Zr = null,
    qa = null;
  function Ja() {
    qa = Zr = Ri = null;
  }
  function Za(t) {
    var n = Pi.current;
    (We(Pi), (t._currentValue = n));
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
  function eo(t, n) {
    ((Ri = t),
      (qa = Zr = null),
      (t = t.dependencies),
      t !== null &&
        t.firstContext !== null &&
        ((t.lanes & n) !== 0 && (Ct = !0), (t.firstContext = null)));
  }
  function Bt(t) {
    var n = t._currentValue;
    if (qa !== t)
      if (((t = { context: t, memoizedValue: n, next: null }), Zr === null)) {
        if (Ri === null) throw Error(o(308));
        ((Zr = t), (Ri.dependencies = { lanes: 0, firstContext: t }));
      } else Zr = Zr.next = t;
    return n;
  }
  var mr = null;
  function tu(t) {
    mr === null ? (mr = [t]) : mr.push(t);
  }
  function gf(t, n, s, a) {
    var f = n.interleaved;
    return (
      f === null ? ((s.next = s), tu(n)) : ((s.next = f.next), (f.next = s)),
      (n.interleaved = s),
      En(t, a)
    );
  }
  function En(t, n) {
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
  var Wn = !1;
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
  function kn(t, n) {
    return {
      eventTime: t,
      lane: n,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function Un(t, n, s) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (Ae & 2) !== 0)) {
      var f = a.pending;
      return (
        f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)),
        (a.pending = n),
        En(t, s)
      );
    }
    return (
      (f = a.interleaved),
      f === null ? ((n.next = n), tu(a)) : ((n.next = f.next), (f.next = n)),
      (a.interleaved = n),
      En(t, s)
    );
  }
  function Ti(t, n, s) {
    if (
      ((n = n.updateQueue), n !== null && ((n = n.shared), (s & 4194240) !== 0))
    ) {
      var a = n.lanes;
      ((a &= t.pendingLanes), (s |= a), (n.lanes = s), ga(t, s));
    }
  }
  function xf(t, n) {
    var s = t.updateQueue,
      a = t.alternate;
    if (a !== null && ((a = a.updateQueue), s === a)) {
      var f = null,
        y = null;
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
          (y === null ? (f = y = N) : (y = y.next = N), (s = s.next));
        } while (s !== null);
        y === null ? (f = y = n) : (y = y.next = n);
      } else f = y = n;
      ((s = {
        baseState: a.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: y,
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
  function Li(t, n, s, a) {
    var f = t.updateQueue;
    Wn = !1;
    var y = f.firstBaseUpdate,
      N = f.lastBaseUpdate,
      T = f.shared.pending;
    if (T !== null) {
      f.shared.pending = null;
      var O = T,
        ee = O.next;
      ((O.next = null), N === null ? (y = ee) : (N.next = ee), (N = O));
      var ae = t.alternate;
      ae !== null &&
        ((ae = ae.updateQueue),
        (T = ae.lastBaseUpdate),
        T !== N &&
          (T === null ? (ae.firstBaseUpdate = ee) : (T.next = ee),
          (ae.lastBaseUpdate = O)));
    }
    if (y !== null) {
      var ue = f.baseState;
      ((N = 0), (ae = ee = O = null), (T = y));
      do {
        var le = T.lane,
          xe = T.eventTime;
        if ((a & le) === le) {
          ae !== null &&
            (ae = ae.next =
              {
                eventTime: xe,
                lane: 0,
                tag: T.tag,
                payload: T.payload,
                callback: T.callback,
                next: null,
              });
          e: {
            var we = t,
              Ee = T;
            switch (((le = n), (xe = s), Ee.tag)) {
              case 1:
                if (((we = Ee.payload), typeof we == "function")) {
                  ue = we.call(xe, ue, le);
                  break e;
                }
                ue = we;
                break e;
              case 3:
                we.flags = (we.flags & -65537) | 128;
              case 0:
                if (
                  ((we = Ee.payload),
                  (le = typeof we == "function" ? we.call(xe, ue, le) : we),
                  le == null)
                )
                  break e;
                ue = U({}, ue, le);
                break e;
              case 2:
                Wn = !0;
            }
          }
          T.callback !== null &&
            T.lane !== 0 &&
            ((t.flags |= 64),
            (le = f.effects),
            le === null ? (f.effects = [T]) : le.push(T));
        } else
          ((xe = {
            eventTime: xe,
            lane: le,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null,
          }),
            ae === null ? ((ee = ae = xe), (O = ue)) : (ae = ae.next = xe),
            (N |= le));
        if (((T = T.next), T === null)) {
          if (((T = f.shared.pending), T === null)) break;
          ((le = T),
            (T = le.next),
            (le.next = null),
            (f.lastBaseUpdate = le),
            (f.shared.pending = null));
        }
      } while (!0);
      if (
        (ae === null && (O = ue),
        (f.baseState = O),
        (f.firstBaseUpdate = ee),
        (f.lastBaseUpdate = ae),
        (n = f.shared.interleaved),
        n !== null)
      ) {
        f = n;
        do ((N |= f.lane), (f = f.next));
        while (f !== n);
      } else y === null && (f.shared.lanes = 0);
      ((xr |= N), (t.lanes = N), (t.memoizedState = ue));
    }
  }
  function vf(t, n, s) {
    if (((t = n.effects), (n.effects = null), t !== null))
      for (n = 0; n < t.length; n++) {
        var a = t[n],
          f = a.callback;
        if (f !== null) {
          if (((a.callback = null), (a = s), typeof f != "function"))
            throw Error(o(191, f));
          f.call(a);
        }
      }
  }
  var ts = {},
    an = Hn(ts),
    ns = Hn(ts),
    rs = Hn(ts);
  function gr(t) {
    if (t === ts) throw Error(o(174));
    return t;
  }
  function ru(t, n) {
    switch ((He(rs, n), He(ns, t), He(an, ts), (t = n.nodeType), t)) {
      case 9:
      case 11:
        n = (n = n.documentElement) ? n.namespaceURI : Qe(null, "");
        break;
      default:
        ((t = t === 8 ? n.parentNode : n),
          (n = t.namespaceURI || null),
          (t = t.tagName),
          (n = Qe(n, t)));
    }
    (We(an), He(an, n));
  }
  function to() {
    (We(an), We(ns), We(rs));
  }
  function wf(t) {
    gr(rs.current);
    var n = gr(an.current),
      s = Qe(n, t.type);
    n !== s && (He(ns, t), He(an, s));
  }
  function ou(t) {
    ns.current === t && (We(an), We(ns));
  }
  var qe = Hn(0);
  function zi(t) {
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
  var Ai = _.ReactCurrentDispatcher,
    lu = _.ReactCurrentBatchConfig,
    yr = 0,
    Je = null,
    rt = null,
    lt = null,
    $i = !1,
    os = !1,
    ss = 0,
    jy = 0;
  function mt() {
    throw Error(o(321));
  }
  function au(t, n) {
    if (n === null) return !1;
    for (var s = 0; s < n.length && s < t.length; s++)
      if (!Xt(t[s], n[s])) return !1;
    return !0;
  }
  function uu(t, n, s, a, f, y) {
    if (
      ((yr = y),
      (Je = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (Ai.current = t === null || t.memoizedState === null ? Py : Ry),
      (t = s(a, f)),
      os)
    ) {
      y = 0;
      do {
        if (((os = !1), (ss = 0), 25 <= y)) throw Error(o(301));
        ((y += 1),
          (lt = rt = null),
          (n.updateQueue = null),
          (Ai.current = Ty),
          (t = s(a, f)));
      } while (os);
    }
    if (
      ((Ai.current = Fi),
      (n = rt !== null && rt.next !== null),
      (yr = 0),
      (lt = rt = Je = null),
      ($i = !1),
      n)
    )
      throw Error(o(300));
    return t;
  }
  function cu() {
    var t = ss !== 0;
    return ((ss = 0), t);
  }
  function un() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (lt === null ? (Je.memoizedState = lt = t) : (lt = lt.next = t), lt);
  }
  function Vt() {
    if (rt === null) {
      var t = Je.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = rt.next;
    var n = lt === null ? Je.memoizedState : lt.next;
    if (n !== null) ((lt = n), (rt = t));
    else {
      if (t === null) throw Error(o(310));
      ((rt = t),
        (t = {
          memoizedState: rt.memoizedState,
          baseState: rt.baseState,
          baseQueue: rt.baseQueue,
          queue: rt.queue,
          next: null,
        }),
        lt === null ? (Je.memoizedState = lt = t) : (lt = lt.next = t));
    }
    return lt;
  }
  function is(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function du(t) {
    var n = Vt(),
      s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var a = rt,
      f = a.baseQueue,
      y = s.pending;
    if (y !== null) {
      if (f !== null) {
        var N = f.next;
        ((f.next = y.next), (y.next = N));
      }
      ((a.baseQueue = f = y), (s.pending = null));
    }
    if (f !== null) {
      ((y = f.next), (a = a.baseState));
      var T = (N = null),
        O = null,
        ee = y;
      do {
        var ae = ee.lane;
        if ((yr & ae) === ae)
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
          var ue = {
            lane: ae,
            action: ee.action,
            hasEagerState: ee.hasEagerState,
            eagerState: ee.eagerState,
            next: null,
          };
          (O === null ? ((T = O = ue), (N = a)) : (O = O.next = ue),
            (Je.lanes |= ae),
            (xr |= ae));
        }
        ee = ee.next;
      } while (ee !== null && ee !== y);
      (O === null ? (N = a) : (O.next = T),
        Xt(a, n.memoizedState) || (Ct = !0),
        (n.memoizedState = a),
        (n.baseState = N),
        (n.baseQueue = O),
        (s.lastRenderedState = a));
    }
    if (((t = s.interleaved), t !== null)) {
      f = t;
      do ((y = f.lane), (Je.lanes |= y), (xr |= y), (f = f.next));
      while (f !== t);
    } else f === null && (s.lanes = 0);
    return [n.memoizedState, s.dispatch];
  }
  function fu(t) {
    var n = Vt(),
      s = n.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var a = s.dispatch,
      f = s.pending,
      y = n.memoizedState;
    if (f !== null) {
      s.pending = null;
      var N = (f = f.next);
      do ((y = t(y, N.action)), (N = N.next));
      while (N !== f);
      (Xt(y, n.memoizedState) || (Ct = !0),
        (n.memoizedState = y),
        n.baseQueue === null && (n.baseState = y),
        (s.lastRenderedState = y));
    }
    return [y, a];
  }
  function Sf() {}
  function Ef(t, n) {
    var s = Je,
      a = Vt(),
      f = n(),
      y = !Xt(a.memoizedState, f);
    if (
      (y && ((a.memoizedState = f), (Ct = !0)),
      (a = a.queue),
      hu(Cf.bind(null, s, a, t), [t]),
      a.getSnapshot !== n || y || (lt !== null && lt.memoizedState.tag & 1))
    ) {
      if (
        ((s.flags |= 2048),
        ls(9, Nf.bind(null, s, a, f, n), void 0, null),
        at === null)
      )
        throw Error(o(349));
      (yr & 30) !== 0 || kf(s, n, f);
    }
    return f;
  }
  function kf(t, n, s) {
    ((t.flags |= 16384),
      (t = { getSnapshot: n, value: s }),
      (n = Je.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }),
          (Je.updateQueue = n),
          (n.stores = [t]))
        : ((s = n.stores), s === null ? (n.stores = [t]) : s.push(t)));
  }
  function Nf(t, n, s, a) {
    ((n.value = s), (n.getSnapshot = a), bf(n) && jf(t));
  }
  function Cf(t, n, s) {
    return s(function () {
      bf(n) && jf(t);
    });
  }
  function bf(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var s = n();
      return !Xt(t, s);
    } catch {
      return !0;
    }
  }
  function jf(t) {
    var n = En(t, 1);
    n !== null && Jt(n, t, 1, -1);
  }
  function _f(t) {
    var n = un();
    return (
      typeof t == "function" && (t = t()),
      (n.memoizedState = n.baseState = t),
      (t = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: is,
        lastRenderedState: t,
      }),
      (n.queue = t),
      (t = t.dispatch = My.bind(null, Je, t)),
      [n.memoizedState, t]
    );
  }
  function ls(t, n, s, a) {
    return (
      (t = { tag: t, create: n, destroy: s, deps: a, next: null }),
      (n = Je.updateQueue),
      n === null
        ? ((n = { lastEffect: null, stores: null }),
          (Je.updateQueue = n),
          (n.lastEffect = t.next = t))
        : ((s = n.lastEffect),
          s === null
            ? (n.lastEffect = t.next = t)
            : ((a = s.next), (s.next = t), (t.next = a), (n.lastEffect = t))),
      t
    );
  }
  function If() {
    return Vt().memoizedState;
  }
  function Di(t, n, s, a) {
    var f = un();
    ((Je.flags |= t),
      (f.memoizedState = ls(1 | n, s, void 0, a === void 0 ? null : a)));
  }
  function Oi(t, n, s, a) {
    var f = Vt();
    a = a === void 0 ? null : a;
    var y = void 0;
    if (rt !== null) {
      var N = rt.memoizedState;
      if (((y = N.destroy), a !== null && au(a, N.deps))) {
        f.memoizedState = ls(n, s, y, a);
        return;
      }
    }
    ((Je.flags |= t), (f.memoizedState = ls(1 | n, s, y, a)));
  }
  function Mf(t, n) {
    return Di(8390656, 8, t, n);
  }
  function hu(t, n) {
    return Oi(2048, 8, t, n);
  }
  function Pf(t, n) {
    return Oi(4, 2, t, n);
  }
  function Rf(t, n) {
    return Oi(4, 4, t, n);
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
      Oi(4, 4, Tf.bind(null, n, t), s)
    );
  }
  function pu() {}
  function zf(t, n) {
    var s = Vt();
    n = n === void 0 ? null : n;
    var a = s.memoizedState;
    return a !== null && n !== null && au(n, a[1])
      ? a[0]
      : ((s.memoizedState = [t, n]), t);
  }
  function Af(t, n) {
    var s = Vt();
    n = n === void 0 ? null : n;
    var a = s.memoizedState;
    return a !== null && n !== null && au(n, a[1])
      ? a[0]
      : ((t = t()), (s.memoizedState = [t, n]), t);
  }
  function $f(t, n, s) {
    return (yr & 21) === 0
      ? (t.baseState && ((t.baseState = !1), (Ct = !0)), (t.memoizedState = s))
      : (Xt(s, n) ||
          ((s = Dr()), (Je.lanes |= s), (xr |= s), (t.baseState = !0)),
        n);
  }
  function _y(t, n) {
    var s = Oe;
    ((Oe = s !== 0 && 4 > s ? s : 4), t(!0));
    var a = lu.transition;
    lu.transition = {};
    try {
      (t(!1), n());
    } finally {
      ((Oe = s), (lu.transition = a));
    }
  }
  function Df() {
    return Vt().memoizedState;
  }
  function Iy(t, n, s) {
    var a = Qn(t);
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
      var f = St();
      (Jt(s, t, a, f), Hf(s, n, a));
    }
  }
  function My(t, n, s) {
    var a = Qn(t),
      f = {
        lane: a,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Of(t)) Ff(n, f);
    else {
      var y = t.alternate;
      if (
        t.lanes === 0 &&
        (y === null || y.lanes === 0) &&
        ((y = n.lastRenderedReducer), y !== null)
      )
        try {
          var N = n.lastRenderedState,
            T = y(N, s);
          if (((f.hasEagerState = !0), (f.eagerState = T), Xt(T, N))) {
            var O = n.interleaved;
            (O === null
              ? ((f.next = f), tu(n))
              : ((f.next = O.next), (O.next = f)),
              (n.interleaved = f));
            return;
          }
        } catch {
        } finally {
        }
      ((s = gf(t, n, f, a)),
        s !== null && ((f = St()), Jt(s, t, a, f), Hf(s, n, a)));
    }
  }
  function Of(t) {
    var n = t.alternate;
    return t === Je || (n !== null && n === Je);
  }
  function Ff(t, n) {
    os = $i = !0;
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
  var Fi = {
      readContext: Bt,
      useCallback: mt,
      useContext: mt,
      useEffect: mt,
      useImperativeHandle: mt,
      useInsertionEffect: mt,
      useLayoutEffect: mt,
      useMemo: mt,
      useReducer: mt,
      useRef: mt,
      useState: mt,
      useDebugValue: mt,
      useDeferredValue: mt,
      useTransition: mt,
      useMutableSource: mt,
      useSyncExternalStore: mt,
      useId: mt,
      unstable_isNewReconciler: !1,
    },
    Py = {
      readContext: Bt,
      useCallback: function (t, n) {
        return ((un().memoizedState = [t, n === void 0 ? null : n]), t);
      },
      useContext: Bt,
      useEffect: Mf,
      useImperativeHandle: function (t, n, s) {
        return (
          (s = s != null ? s.concat([t]) : null),
          Di(4194308, 4, Tf.bind(null, n, t), s)
        );
      },
      useLayoutEffect: function (t, n) {
        return Di(4194308, 4, t, n);
      },
      useInsertionEffect: function (t, n) {
        return Di(4, 2, t, n);
      },
      useMemo: function (t, n) {
        var s = un();
        return (
          (n = n === void 0 ? null : n),
          (t = t()),
          (s.memoizedState = [t, n]),
          t
        );
      },
      useReducer: function (t, n, s) {
        var a = un();
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
          (t = t.dispatch = Iy.bind(null, Je, t)),
          [a.memoizedState, t]
        );
      },
      useRef: function (t) {
        var n = un();
        return ((t = { current: t }), (n.memoizedState = t));
      },
      useState: _f,
      useDebugValue: pu,
      useDeferredValue: function (t) {
        return (un().memoizedState = t);
      },
      useTransition: function () {
        var t = _f(!1),
          n = t[0];
        return ((t = _y.bind(null, t[1])), (un().memoizedState = t), [n, t]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (t, n, s) {
        var a = Je,
          f = un();
        if (Ue) {
          if (s === void 0) throw Error(o(407));
          s = s();
        } else {
          if (((s = n()), at === null)) throw Error(o(349));
          (yr & 30) !== 0 || kf(a, n, s);
        }
        f.memoizedState = s;
        var y = { value: s, getSnapshot: n };
        return (
          (f.queue = y),
          Mf(Cf.bind(null, a, y, t), [t]),
          (a.flags |= 2048),
          ls(9, Nf.bind(null, a, y, s, n), void 0, null),
          s
        );
      },
      useId: function () {
        var t = un(),
          n = at.identifierPrefix;
        if (Ue) {
          var s = Sn,
            a = wn;
          ((s = (a & ~(1 << (32 - Pt(a) - 1))).toString(32) + s),
            (n = ":" + n + "R" + s),
            (s = ss++),
            0 < s && (n += "H" + s.toString(32)),
            (n += ":"));
        } else ((s = jy++), (n = ":" + n + "r" + s.toString(32) + ":"));
        return (t.memoizedState = n);
      },
      unstable_isNewReconciler: !1,
    },
    Ry = {
      readContext: Bt,
      useCallback: zf,
      useContext: Bt,
      useEffect: hu,
      useImperativeHandle: Lf,
      useInsertionEffect: Pf,
      useLayoutEffect: Rf,
      useMemo: Af,
      useReducer: du,
      useRef: If,
      useState: function () {
        return du(is);
      },
      useDebugValue: pu,
      useDeferredValue: function (t) {
        var n = Vt();
        return $f(n, rt.memoizedState, t);
      },
      useTransition: function () {
        var t = du(is)[0],
          n = Vt().memoizedState;
        return [t, n];
      },
      useMutableSource: Sf,
      useSyncExternalStore: Ef,
      useId: Df,
      unstable_isNewReconciler: !1,
    },
    Ty = {
      readContext: Bt,
      useCallback: zf,
      useContext: Bt,
      useEffect: hu,
      useImperativeHandle: Lf,
      useInsertionEffect: Pf,
      useLayoutEffect: Rf,
      useMemo: Af,
      useReducer: fu,
      useRef: If,
      useState: function () {
        return fu(is);
      },
      useDebugValue: pu,
      useDeferredValue: function (t) {
        var n = Vt();
        return rt === null ? (n.memoizedState = t) : $f(n, rt.memoizedState, t);
      },
      useTransition: function () {
        var t = fu(is)[0],
          n = Vt().memoizedState;
        return [t, n];
      },
      useMutableSource: Sf,
      useSyncExternalStore: Ef,
      useId: Df,
      unstable_isNewReconciler: !1,
    };
  function Qt(t, n) {
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
  var Hi = {
    isMounted: function (t) {
      return (t = t._reactInternals) ? on(t) === t : !1;
    },
    enqueueSetState: function (t, n, s) {
      t = t._reactInternals;
      var a = St(),
        f = Qn(t),
        y = kn(a, f);
      ((y.payload = n),
        s != null && (y.callback = s),
        (n = Un(t, y, f)),
        n !== null && (Jt(n, t, f, a), Ti(n, t, f)));
    },
    enqueueReplaceState: function (t, n, s) {
      t = t._reactInternals;
      var a = St(),
        f = Qn(t),
        y = kn(a, f);
      ((y.tag = 1),
        (y.payload = n),
        s != null && (y.callback = s),
        (n = Un(t, y, f)),
        n !== null && (Jt(n, t, f, a), Ti(n, t, f)));
    },
    enqueueForceUpdate: function (t, n) {
      t = t._reactInternals;
      var s = St(),
        a = Qn(t),
        f = kn(s, a);
      ((f.tag = 2),
        n != null && (f.callback = n),
        (n = Un(t, f, a)),
        n !== null && (Jt(n, t, a, s), Ti(n, t, a)));
    },
  };
  function Bf(t, n, s, a, f, y, N) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(a, y, N)
        : n.prototype && n.prototype.isPureReactComponent
          ? !Xo(s, a) || !Xo(f, y)
          : !0
    );
  }
  function Vf(t, n, s) {
    var a = !1,
      f = Bn,
      y = n.contextType;
    return (
      typeof y == "object" && y !== null
        ? (y = Bt(y))
        : ((f = Nt(n) ? fr : pt.current),
          (a = n.contextTypes),
          (y = (a = a != null) ? Kr(t, f) : Bn)),
      (n = new n(s, y)),
      (t.memoizedState =
        n.state !== null && n.state !== void 0 ? n.state : null),
      (n.updater = Hi),
      (t.stateNode = n),
      (n._reactInternals = t),
      a &&
        ((t = t.stateNode),
        (t.__reactInternalMemoizedUnmaskedChildContext = f),
        (t.__reactInternalMemoizedMaskedChildContext = y)),
      n
    );
  }
  function Wf(t, n, s, a) {
    ((t = n.state),
      typeof n.componentWillReceiveProps == "function" &&
        n.componentWillReceiveProps(s, a),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(s, a),
      n.state !== t && Hi.enqueueReplaceState(n, n.state, null));
  }
  function gu(t, n, s, a) {
    var f = t.stateNode;
    ((f.props = s), (f.state = t.memoizedState), (f.refs = {}), nu(t));
    var y = n.contextType;
    (typeof y == "object" && y !== null
      ? (f.context = Bt(y))
      : ((y = Nt(n) ? fr : pt.current), (f.context = Kr(t, y))),
      (f.state = t.memoizedState),
      (y = n.getDerivedStateFromProps),
      typeof y == "function" && (mu(t, n, y, s), (f.state = t.memoizedState)),
      typeof n.getDerivedStateFromProps == "function" ||
        typeof f.getSnapshotBeforeUpdate == "function" ||
        (typeof f.UNSAFE_componentWillMount != "function" &&
          typeof f.componentWillMount != "function") ||
        ((n = f.state),
        typeof f.componentWillMount == "function" && f.componentWillMount(),
        typeof f.UNSAFE_componentWillMount == "function" &&
          f.UNSAFE_componentWillMount(),
        n !== f.state && Hi.enqueueReplaceState(f, f.state, null),
        Li(t, s, f, a),
        (f.state = t.memoizedState)),
      typeof f.componentDidMount == "function" && (t.flags |= 4194308));
  }
  function no(t, n) {
    try {
      var s = "",
        a = n;
      do ((s += F(a)), (a = a.return));
      while (a);
      var f = s;
    } catch (y) {
      f =
        `
Error generating stack: ` +
        y.message +
        `
` +
        y.stack;
    }
    return { value: t, source: n, stack: f, digest: null };
  }
  function yu(t, n, s) {
    return { value: t, source: null, stack: s ?? null, digest: n ?? null };
  }
  function xu(t, n) {
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
    ((s = kn(-1, s)), (s.tag = 3), (s.payload = { element: null }));
    var a = n.value;
    return (
      (s.callback = function () {
        (Ki || ((Ki = !0), (Tu = a)), xu(t, n));
      }),
      s
    );
  }
  function Yf(t, n, s) {
    ((s = kn(-1, s)), (s.tag = 3));
    var a = t.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var f = n.value;
      ((s.payload = function () {
        return a(f);
      }),
        (s.callback = function () {
          xu(t, n);
        }));
    }
    var y = t.stateNode;
    return (
      y !== null &&
        typeof y.componentDidCatch == "function" &&
        (s.callback = function () {
          (xu(t, n),
            typeof a != "function" &&
              (Xn === null ? (Xn = new Set([this])) : Xn.add(this)));
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
      var f = new Set();
      a.set(n, f);
    } else ((f = a.get(n)), f === void 0 && ((f = new Set()), a.set(n, f)));
    f.has(s) || (f.add(s), (t = Ky.bind(null, t, n, s)), n.then(t, t));
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
  function Qf(t, n, s, a, f) {
    return (t.mode & 1) === 0
      ? (t === n
          ? (t.flags |= 65536)
          : ((t.flags |= 128),
            (s.flags |= 131072),
            (s.flags &= -52805),
            s.tag === 1 &&
              (s.alternate === null
                ? (s.tag = 17)
                : ((n = kn(-1, 1)), (n.tag = 2), Un(s, n, 1))),
            (s.lanes |= 1)),
        t)
      : ((t.flags |= 65536), (t.lanes = f), t);
  }
  var zy = _.ReactCurrentOwner,
    Ct = !1;
  function wt(t, n, s, a) {
    n.child = t === null ? mf(n, null, s, a) : Jr(n, t.child, s, a);
  }
  function Gf(t, n, s, a, f) {
    s = s.render;
    var y = n.ref;
    return (
      eo(n, f),
      (a = uu(t, n, s, a, y, f)),
      (s = cu()),
      t !== null && !Ct
        ? ((n.updateQueue = t.updateQueue),
          (n.flags &= -2053),
          (t.lanes &= ~f),
          Nn(t, n, f))
        : (Ue && s && Ya(n), (n.flags |= 1), wt(t, n, a, f), n.child)
    );
  }
  function qf(t, n, s, a, f) {
    if (t === null) {
      var y = s.type;
      return typeof y == "function" &&
        !Fu(y) &&
        y.defaultProps === void 0 &&
        s.compare === null &&
        s.defaultProps === void 0
        ? ((n.tag = 15), (n.type = y), Jf(t, n, y, a, f))
        : ((t = el(s.type, null, a, n, n.mode, f)),
          (t.ref = n.ref),
          (t.return = n),
          (n.child = t));
    }
    if (((y = t.child), (t.lanes & f) === 0)) {
      var N = y.memoizedProps;
      if (
        ((s = s.compare), (s = s !== null ? s : Xo), s(N, a) && t.ref === n.ref)
      )
        return Nn(t, n, f);
    }
    return (
      (n.flags |= 1),
      (t = qn(y, a)),
      (t.ref = n.ref),
      (t.return = n),
      (n.child = t)
    );
  }
  function Jf(t, n, s, a, f) {
    if (t !== null) {
      var y = t.memoizedProps;
      if (Xo(y, a) && t.ref === n.ref)
        if (((Ct = !1), (n.pendingProps = a = y), (t.lanes & f) !== 0))
          (t.flags & 131072) !== 0 && (Ct = !0);
        else return ((n.lanes = t.lanes), Nn(t, n, f));
    }
    return vu(t, n, s, a, f);
  }
  function Zf(t, n, s) {
    var a = n.pendingProps,
      f = a.children,
      y = t !== null ? t.memoizedState : null;
    if (a.mode === "hidden")
      if ((n.mode & 1) === 0)
        ((n.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          He(oo, zt),
          (zt |= s));
      else {
        if ((s & 1073741824) === 0)
          return (
            (t = y !== null ? y.baseLanes | s : s),
            (n.lanes = n.childLanes = 1073741824),
            (n.memoizedState = {
              baseLanes: t,
              cachePool: null,
              transitions: null,
            }),
            (n.updateQueue = null),
            He(oo, zt),
            (zt |= t),
            null
          );
        ((n.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (a = y !== null ? y.baseLanes : s),
          He(oo, zt),
          (zt |= a));
      }
    else
      (y !== null ? ((a = y.baseLanes | s), (n.memoizedState = null)) : (a = s),
        He(oo, zt),
        (zt |= a));
    return (wt(t, n, f, s), n.child);
  }
  function eh(t, n) {
    var s = n.ref;
    ((t === null && s !== null) || (t !== null && t.ref !== s)) &&
      ((n.flags |= 512), (n.flags |= 2097152));
  }
  function vu(t, n, s, a, f) {
    var y = Nt(s) ? fr : pt.current;
    return (
      (y = Kr(n, y)),
      eo(n, f),
      (s = uu(t, n, s, a, y, f)),
      (a = cu()),
      t !== null && !Ct
        ? ((n.updateQueue = t.updateQueue),
          (n.flags &= -2053),
          (t.lanes &= ~f),
          Nn(t, n, f))
        : (Ue && a && Ya(n), (n.flags |= 1), wt(t, n, s, f), n.child)
    );
  }
  function th(t, n, s, a, f) {
    if (Nt(s)) {
      var y = !0;
      Ci(n);
    } else y = !1;
    if ((eo(n, f), n.stateNode === null))
      (Vi(t, n), Vf(n, s, a), gu(n, s, a, f), (a = !0));
    else if (t === null) {
      var N = n.stateNode,
        T = n.memoizedProps;
      N.props = T;
      var O = N.context,
        ee = s.contextType;
      typeof ee == "object" && ee !== null
        ? (ee = Bt(ee))
        : ((ee = Nt(s) ? fr : pt.current), (ee = Kr(n, ee)));
      var ae = s.getDerivedStateFromProps,
        ue =
          typeof ae == "function" ||
          typeof N.getSnapshotBeforeUpdate == "function";
      (ue ||
        (typeof N.UNSAFE_componentWillReceiveProps != "function" &&
          typeof N.componentWillReceiveProps != "function") ||
        ((T !== a || O !== ee) && Wf(n, N, a, ee)),
        (Wn = !1));
      var le = n.memoizedState;
      ((N.state = le),
        Li(n, a, N, f),
        (O = n.memoizedState),
        T !== a || le !== O || kt.current || Wn
          ? (typeof ae == "function" &&
              (mu(n, s, ae, a), (O = n.memoizedState)),
            (T = Wn || Bf(n, s, T, a, le, O, ee))
              ? (ue ||
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
        (ee = n.type === n.elementType ? T : Qt(n.type, T)),
        (N.props = ee),
        (ue = n.pendingProps),
        (le = N.context),
        (O = s.contextType),
        typeof O == "object" && O !== null
          ? (O = Bt(O))
          : ((O = Nt(s) ? fr : pt.current), (O = Kr(n, O))));
      var xe = s.getDerivedStateFromProps;
      ((ae =
        typeof xe == "function" ||
        typeof N.getSnapshotBeforeUpdate == "function") ||
        (typeof N.UNSAFE_componentWillReceiveProps != "function" &&
          typeof N.componentWillReceiveProps != "function") ||
        ((T !== ue || le !== O) && Wf(n, N, a, O)),
        (Wn = !1),
        (le = n.memoizedState),
        (N.state = le),
        Li(n, a, N, f));
      var we = n.memoizedState;
      T !== ue || le !== we || kt.current || Wn
        ? (typeof xe == "function" && (mu(n, s, xe, a), (we = n.memoizedState)),
          (ee = Wn || Bf(n, s, ee, a, le, we, O) || !1)
            ? (ae ||
                (typeof N.UNSAFE_componentWillUpdate != "function" &&
                  typeof N.componentWillUpdate != "function") ||
                (typeof N.componentWillUpdate == "function" &&
                  N.componentWillUpdate(a, we, O),
                typeof N.UNSAFE_componentWillUpdate == "function" &&
                  N.UNSAFE_componentWillUpdate(a, we, O)),
              typeof N.componentDidUpdate == "function" && (n.flags |= 4),
              typeof N.getSnapshotBeforeUpdate == "function" &&
                (n.flags |= 1024))
            : (typeof N.componentDidUpdate != "function" ||
                (T === t.memoizedProps && le === t.memoizedState) ||
                (n.flags |= 4),
              typeof N.getSnapshotBeforeUpdate != "function" ||
                (T === t.memoizedProps && le === t.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = a),
              (n.memoizedState = we)),
          (N.props = a),
          (N.state = we),
          (N.context = O),
          (a = ee))
        : (typeof N.componentDidUpdate != "function" ||
            (T === t.memoizedProps && le === t.memoizedState) ||
            (n.flags |= 4),
          typeof N.getSnapshotBeforeUpdate != "function" ||
            (T === t.memoizedProps && le === t.memoizedState) ||
            (n.flags |= 1024),
          (a = !1));
    }
    return wu(t, n, s, a, y, f);
  }
  function wu(t, n, s, a, f, y) {
    eh(t, n);
    var N = (n.flags & 128) !== 0;
    if (!a && !N) return (f && sf(n, s, !1), Nn(t, n, y));
    ((a = n.stateNode), (zy.current = n));
    var T =
      N && typeof s.getDerivedStateFromError != "function" ? null : a.render();
    return (
      (n.flags |= 1),
      t !== null && N
        ? ((n.child = Jr(n, t.child, null, y)), (n.child = Jr(n, null, T, y)))
        : wt(t, n, T, y),
      (n.memoizedState = a.state),
      f && sf(n, s, !0),
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
  function rh(t, n, s, a, f) {
    return (qr(), Ga(f), (n.flags |= 256), wt(t, n, s, a), n.child);
  }
  var Su = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Eu(t) {
    return { baseLanes: t, cachePool: null, transitions: null };
  }
  function oh(t, n, s) {
    var a = n.pendingProps,
      f = qe.current,
      y = !1,
      N = (n.flags & 128) !== 0,
      T;
    if (
      ((T = N) ||
        (T = t !== null && t.memoizedState === null ? !1 : (f & 2) !== 0),
      T
        ? ((y = !0), (n.flags &= -129))
        : (t === null || t.memoizedState !== null) && (f |= 1),
      He(qe, f & 1),
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
            y
              ? ((a = n.mode),
                (y = n.child),
                (N = { mode: "hidden", children: N }),
                (a & 1) === 0 && y !== null
                  ? ((y.childLanes = 0), (y.pendingProps = N))
                  : (y = tl(N, a, 0, null)),
                (t = Er(t, a, s, null)),
                (y.return = n),
                (t.return = n),
                (y.sibling = t),
                (n.child = y),
                (n.child.memoizedState = Eu(s)),
                (n.memoizedState = Su),
                t)
              : ku(n, N))
      );
    if (((f = t.memoizedState), f !== null && ((T = f.dehydrated), T !== null)))
      return Ay(t, n, N, a, T, f, s);
    if (y) {
      ((y = a.fallback), (N = n.mode), (f = t.child), (T = f.sibling));
      var O = { mode: "hidden", children: a.children };
      return (
        (N & 1) === 0 && n.child !== f
          ? ((a = n.child),
            (a.childLanes = 0),
            (a.pendingProps = O),
            (n.deletions = null))
          : ((a = qn(f, O)), (a.subtreeFlags = f.subtreeFlags & 14680064)),
        T !== null ? (y = qn(T, y)) : ((y = Er(y, N, s, null)), (y.flags |= 2)),
        (y.return = n),
        (a.return = n),
        (a.sibling = y),
        (n.child = a),
        (a = y),
        (y = n.child),
        (N = t.child.memoizedState),
        (N =
          N === null
            ? Eu(s)
            : {
                baseLanes: N.baseLanes | s,
                cachePool: null,
                transitions: N.transitions,
              }),
        (y.memoizedState = N),
        (y.childLanes = t.childLanes & ~s),
        (n.memoizedState = Su),
        a
      );
    }
    return (
      (y = t.child),
      (t = y.sibling),
      (a = qn(y, { mode: "visible", children: a.children })),
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
      (n = tl({ mode: "visible", children: n }, t.mode, 0, null)),
      (n.return = t),
      (t.child = n)
    );
  }
  function Bi(t, n, s, a) {
    return (
      a !== null && Ga(a),
      Jr(n, t.child, null, s),
      (t = ku(n, n.pendingProps.children)),
      (t.flags |= 2),
      (n.memoizedState = null),
      t
    );
  }
  function Ay(t, n, s, a, f, y, N) {
    if (s)
      return n.flags & 256
        ? ((n.flags &= -257), (a = yu(Error(o(422)))), Bi(t, n, N, a))
        : n.memoizedState !== null
          ? ((n.child = t.child), (n.flags |= 128), null)
          : ((y = a.fallback),
            (f = n.mode),
            (a = tl({ mode: "visible", children: a.children }, f, 0, null)),
            (y = Er(y, f, N, null)),
            (y.flags |= 2),
            (a.return = n),
            (y.return = n),
            (a.sibling = y),
            (n.child = a),
            (n.mode & 1) !== 0 && Jr(n, t.child, null, N),
            (n.child.memoizedState = Eu(N)),
            (n.memoizedState = Su),
            y);
    if ((n.mode & 1) === 0) return Bi(t, n, N, null);
    if (f.data === "$!") {
      if (((a = f.nextSibling && f.nextSibling.dataset), a)) var T = a.dgst;
      return (
        (a = T),
        (y = Error(o(419))),
        (a = yu(y, a, void 0)),
        Bi(t, n, N, a)
      );
    }
    if (((T = (N & t.childLanes) !== 0), Ct || T)) {
      if (((a = at), a !== null)) {
        switch (N & -N) {
          case 4:
            f = 2;
            break;
          case 16:
            f = 8;
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
            f = 32;
            break;
          case 536870912:
            f = 268435456;
            break;
          default:
            f = 0;
        }
        ((f = (f & (a.suspendedLanes | N)) !== 0 ? 0 : f),
          f !== 0 &&
            f !== y.retryLane &&
            ((y.retryLane = f), En(t, f), Jt(a, t, f, -1)));
      }
      return (Ou(), (a = yu(Error(o(421)))), Bi(t, n, N, a));
    }
    return f.data === "$?"
      ? ((n.flags |= 128),
        (n.child = t.child),
        (n = Qy.bind(null, t)),
        (f._reactRetry = n),
        null)
      : ((t = y.treeContext),
        (Lt = Fn(f.nextSibling)),
        (Tt = n),
        (Ue = !0),
        (Kt = null),
        t !== null &&
          ((Ft[Ht++] = wn),
          (Ft[Ht++] = Sn),
          (Ft[Ht++] = hr),
          (wn = t.id),
          (Sn = t.overflow),
          (hr = n)),
        (n = ku(n, a.children)),
        (n.flags |= 4096),
        n);
  }
  function sh(t, n, s) {
    t.lanes |= n;
    var a = t.alternate;
    (a !== null && (a.lanes |= n), eu(t.return, n, s));
  }
  function Nu(t, n, s, a, f) {
    var y = t.memoizedState;
    y === null
      ? (t.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: s,
          tailMode: f,
        })
      : ((y.isBackwards = n),
        (y.rendering = null),
        (y.renderingStartTime = 0),
        (y.last = a),
        (y.tail = s),
        (y.tailMode = f));
  }
  function ih(t, n, s) {
    var a = n.pendingProps,
      f = a.revealOrder,
      y = a.tail;
    if ((wt(t, n, a.children, s), (a = qe.current), (a & 2) !== 0))
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
    if ((He(qe, a), (n.mode & 1) === 0)) n.memoizedState = null;
    else
      switch (f) {
        case "forwards":
          for (s = n.child, f = null; s !== null; )
            ((t = s.alternate),
              t !== null && zi(t) === null && (f = s),
              (s = s.sibling));
          ((s = f),
            s === null
              ? ((f = n.child), (n.child = null))
              : ((f = s.sibling), (s.sibling = null)),
            Nu(n, !1, f, s, y));
          break;
        case "backwards":
          for (s = null, f = n.child, n.child = null; f !== null; ) {
            if (((t = f.alternate), t !== null && zi(t) === null)) {
              n.child = f;
              break;
            }
            ((t = f.sibling), (f.sibling = s), (s = f), (f = t));
          }
          Nu(n, !0, s, null, y);
          break;
        case "together":
          Nu(n, !1, null, null, void 0);
          break;
        default:
          n.memoizedState = null;
      }
    return n.child;
  }
  function Vi(t, n) {
    (n.mode & 1) === 0 &&
      t !== null &&
      ((t.alternate = null), (n.alternate = null), (n.flags |= 2));
  }
  function Nn(t, n, s) {
    if (
      (t !== null && (n.dependencies = t.dependencies),
      (xr |= n.lanes),
      (s & n.childLanes) === 0)
    )
      return null;
    if (t !== null && n.child !== t.child) throw Error(o(153));
    if (n.child !== null) {
      for (
        t = n.child, s = qn(t, t.pendingProps), n.child = s, s.return = n;
        t.sibling !== null;
      )
        ((t = t.sibling),
          (s = s.sibling = qn(t, t.pendingProps)),
          (s.return = n));
      s.sibling = null;
    }
    return n.child;
  }
  function $y(t, n, s) {
    switch (n.tag) {
      case 3:
        (nh(n), qr());
        break;
      case 5:
        wf(n);
        break;
      case 1:
        Nt(n.type) && Ci(n);
        break;
      case 4:
        ru(n, n.stateNode.containerInfo);
        break;
      case 10:
        var a = n.type._context,
          f = n.memoizedProps.value;
        (He(Pi, a._currentValue), (a._currentValue = f));
        break;
      case 13:
        if (((a = n.memoizedState), a !== null))
          return a.dehydrated !== null
            ? (He(qe, qe.current & 1), (n.flags |= 128), null)
            : (s & n.child.childLanes) !== 0
              ? oh(t, n, s)
              : (He(qe, qe.current & 1),
                (t = Nn(t, n, s)),
                t !== null ? t.sibling : null);
        He(qe, qe.current & 1);
        break;
      case 19:
        if (((a = (s & n.childLanes) !== 0), (t.flags & 128) !== 0)) {
          if (a) return ih(t, n, s);
          n.flags |= 128;
        }
        if (
          ((f = n.memoizedState),
          f !== null &&
            ((f.rendering = null), (f.tail = null), (f.lastEffect = null)),
          He(qe, qe.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((n.lanes = 0), Zf(t, n, s));
    }
    return Nn(t, n, s);
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
      var f = t.memoizedProps;
      if (f !== a) {
        ((t = n.stateNode), gr(an.current));
        var y = null;
        switch (s) {
          case "input":
            ((f = Se(t, f)), (a = Se(t, a)), (y = []));
            break;
          case "select":
            ((f = U({}, f, { value: void 0 })),
              (a = U({}, a, { value: void 0 })),
              (y = []));
            break;
          case "textarea":
            ((f = ht(t, f)), (a = ht(t, a)), (y = []));
            break;
          default:
            typeof f.onClick != "function" &&
              typeof a.onClick == "function" &&
              (t.onclick = Ei);
        }
        yn(s, a);
        var N;
        s = null;
        for (ee in f)
          if (!a.hasOwnProperty(ee) && f.hasOwnProperty(ee) && f[ee] != null)
            if (ee === "style") {
              var T = f[ee];
              for (N in T) T.hasOwnProperty(N) && (s || (s = {}), (s[N] = ""));
            } else
              ee !== "dangerouslySetInnerHTML" &&
                ee !== "children" &&
                ee !== "suppressContentEditableWarning" &&
                ee !== "suppressHydrationWarning" &&
                ee !== "autoFocus" &&
                (l.hasOwnProperty(ee)
                  ? y || (y = [])
                  : (y = y || []).push(ee, null));
        for (ee in a) {
          var O = a[ee];
          if (
            ((T = f != null ? f[ee] : void 0),
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
              } else (s || (y || (y = []), y.push(ee, s)), (s = O));
            else
              ee === "dangerouslySetInnerHTML"
                ? ((O = O ? O.__html : void 0),
                  (T = T ? T.__html : void 0),
                  O != null && T !== O && (y = y || []).push(ee, O))
                : ee === "children"
                  ? (typeof O != "string" && typeof O != "number") ||
                    (y = y || []).push(ee, "" + O)
                  : ee !== "suppressContentEditableWarning" &&
                    ee !== "suppressHydrationWarning" &&
                    (l.hasOwnProperty(ee)
                      ? (O != null && ee === "onScroll" && Ve("scroll", t),
                        y || T === O || (y = []))
                      : (y = y || []).push(ee, O));
        }
        s && (y = y || []).push("style", s);
        var ee = y;
        (n.updateQueue = ee) && (n.flags |= 4);
      }
    }),
    (uh = function (t, n, s, a) {
      s !== a && (n.flags |= 4);
    }));
  function as(t, n) {
    if (!Ue)
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
  function gt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child,
      s = 0,
      a = 0;
    if (n)
      for (var f = t.child; f !== null; )
        ((s |= f.lanes | f.childLanes),
          (a |= f.subtreeFlags & 14680064),
          (a |= f.flags & 14680064),
          (f.return = t),
          (f = f.sibling));
    else
      for (f = t.child; f !== null; )
        ((s |= f.lanes | f.childLanes),
          (a |= f.subtreeFlags),
          (a |= f.flags),
          (f.return = t),
          (f = f.sibling));
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
        return (gt(n), null);
      case 1:
        return (Nt(n.type) && Ni(), gt(n), null);
      case 3:
        return (
          (a = n.stateNode),
          to(),
          We(kt),
          We(pt),
          iu(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (Ii(n)
              ? (n.flags |= 4)
              : t === null ||
                (t.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), Kt !== null && (Au(Kt), (Kt = null)))),
          Cu(t, n),
          gt(n),
          null
        );
      case 5:
        ou(n);
        var f = gr(rs.current);
        if (((s = n.type), t !== null && n.stateNode != null))
          (ah(t, n, s, a, f),
            t.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152)));
        else {
          if (!a) {
            if (n.stateNode === null) throw Error(o(166));
            return (gt(n), null);
          }
          if (((t = gr(an.current)), Ii(n))) {
            ((a = n.stateNode), (s = n.type));
            var y = n.memoizedProps;
            switch (((a[ln] = n), (a[Jo] = y), (t = (n.mode & 1) !== 0), s)) {
              case "dialog":
                (Ve("cancel", a), Ve("close", a));
                break;
              case "iframe":
              case "object":
              case "embed":
                Ve("load", a);
                break;
              case "video":
              case "audio":
                for (f = 0; f < Qo.length; f++) Ve(Qo[f], a);
                break;
              case "source":
                Ve("error", a);
                break;
              case "img":
              case "image":
              case "link":
                (Ve("error", a), Ve("load", a));
                break;
              case "details":
                Ve("toggle", a);
                break;
              case "input":
                (Pe(a, y), Ve("invalid", a));
                break;
              case "select":
                ((a._wrapperState = { wasMultiple: !!y.multiple }),
                  Ve("invalid", a));
                break;
              case "textarea":
                (ye(a, y), Ve("invalid", a));
            }
            (yn(s, y), (f = null));
            for (var N in y)
              if (y.hasOwnProperty(N)) {
                var T = y[N];
                N === "children"
                  ? typeof T == "string"
                    ? a.textContent !== T &&
                      (y.suppressHydrationWarning !== !0 &&
                        Si(a.textContent, T, t),
                      (f = ["children", T]))
                    : typeof T == "number" &&
                      a.textContent !== "" + T &&
                      (y.suppressHydrationWarning !== !0 &&
                        Si(a.textContent, T, t),
                      (f = ["children", "" + T]))
                  : l.hasOwnProperty(N) &&
                    T != null &&
                    N === "onScroll" &&
                    Ve("scroll", a);
              }
            switch (s) {
              case "input":
                (fe(a), he(a, y, !0));
                break;
              case "textarea":
                (fe(a), Re(a));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof y.onClick == "function" && (a.onclick = Ei);
            }
            ((a = f), (n.updateQueue = a), a !== null && (n.flags |= 4));
          } else {
            ((N = f.nodeType === 9 ? f : f.ownerDocument),
              t === "http://www.w3.org/1999/xhtml" && (t = Le(s)),
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
              (t[ln] = n),
              (t[Jo] = a),
              lh(t, n, !1, !1),
              (n.stateNode = t));
            e: {
              switch (((N = sr(s, a)), s)) {
                case "dialog":
                  (Ve("cancel", t), Ve("close", t), (f = a));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (Ve("load", t), (f = a));
                  break;
                case "video":
                case "audio":
                  for (f = 0; f < Qo.length; f++) Ve(Qo[f], t);
                  f = a;
                  break;
                case "source":
                  (Ve("error", t), (f = a));
                  break;
                case "img":
                case "image":
                case "link":
                  (Ve("error", t), Ve("load", t), (f = a));
                  break;
                case "details":
                  (Ve("toggle", t), (f = a));
                  break;
                case "input":
                  (Pe(t, a), (f = Se(t, a)), Ve("invalid", t));
                  break;
                case "option":
                  f = a;
                  break;
                case "select":
                  ((t._wrapperState = { wasMultiple: !!a.multiple }),
                    (f = U({}, a, { value: void 0 })),
                    Ve("invalid", t));
                  break;
                case "textarea":
                  (ye(t, a), (f = ht(t, a)), Ve("invalid", t));
                  break;
                default:
                  f = a;
              }
              (yn(s, f), (T = f));
              for (y in T)
                if (T.hasOwnProperty(y)) {
                  var O = T[y];
                  y === "style"
                    ? vt(t, O)
                    : y === "dangerouslySetInnerHTML"
                      ? ((O = O ? O.__html : void 0), O != null && Et(t, O))
                      : y === "children"
                        ? typeof O == "string"
                          ? (s !== "textarea" || O !== "") && Fe(t, O)
                          : typeof O == "number" && Fe(t, "" + O)
                        : y !== "suppressContentEditableWarning" &&
                          y !== "suppressHydrationWarning" &&
                          y !== "autoFocus" &&
                          (l.hasOwnProperty(y)
                            ? O != null && y === "onScroll" && Ve("scroll", t)
                            : O != null && k(t, y, O, N));
                }
              switch (s) {
                case "input":
                  (fe(t), he(t, a, !1));
                  break;
                case "textarea":
                  (fe(t), Re(t));
                  break;
                case "option":
                  a.value != null && t.setAttribute("value", "" + G(a.value));
                  break;
                case "select":
                  ((t.multiple = !!a.multiple),
                    (y = a.value),
                    y != null
                      ? it(t, !!a.multiple, y, !1)
                      : a.defaultValue != null &&
                        it(t, !!a.multiple, a.defaultValue, !0));
                  break;
                default:
                  typeof f.onClick == "function" && (t.onclick = Ei);
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
        return (gt(n), null);
      case 6:
        if (t && n.stateNode != null) uh(t, n, t.memoizedProps, a);
        else {
          if (typeof a != "string" && n.stateNode === null) throw Error(o(166));
          if (((s = gr(rs.current)), gr(an.current), Ii(n))) {
            if (
              ((a = n.stateNode),
              (s = n.memoizedProps),
              (a[ln] = n),
              (y = a.nodeValue !== s) && ((t = Tt), t !== null))
            )
              switch (t.tag) {
                case 3:
                  Si(a.nodeValue, s, (t.mode & 1) !== 0);
                  break;
                case 5:
                  t.memoizedProps.suppressHydrationWarning !== !0 &&
                    Si(a.nodeValue, s, (t.mode & 1) !== 0);
              }
            y && (n.flags |= 4);
          } else
            ((a = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(a)),
              (a[ln] = n),
              (n.stateNode = a));
        }
        return (gt(n), null);
      case 13:
        if (
          (We(qe),
          (a = n.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (Ue && Lt !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0)
            (ff(), qr(), (n.flags |= 98560), (y = !1));
          else if (((y = Ii(n)), a !== null && a.dehydrated !== null)) {
            if (t === null) {
              if (!y) throw Error(o(318));
              if (
                ((y = n.memoizedState),
                (y = y !== null ? y.dehydrated : null),
                !y)
              )
                throw Error(o(317));
              y[ln] = n;
            } else
              (qr(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4));
            (gt(n), (y = !1));
          } else (Kt !== null && (Au(Kt), (Kt = null)), (y = !0));
          if (!y) return n.flags & 65536 ? n : null;
        }
        return (n.flags & 128) !== 0
          ? ((n.lanes = s), n)
          : ((a = a !== null),
            a !== (t !== null && t.memoizedState !== null) &&
              a &&
              ((n.child.flags |= 8192),
              (n.mode & 1) !== 0 &&
                (t === null || (qe.current & 1) !== 0
                  ? ot === 0 && (ot = 3)
                  : Ou())),
            n.updateQueue !== null && (n.flags |= 4),
            gt(n),
            null);
      case 4:
        return (
          to(),
          Cu(t, n),
          t === null && Go(n.stateNode.containerInfo),
          gt(n),
          null
        );
      case 10:
        return (Za(n.type._context), gt(n), null);
      case 17:
        return (Nt(n.type) && Ni(), gt(n), null);
      case 19:
        if ((We(qe), (y = n.memoizedState), y === null)) return (gt(n), null);
        if (((a = (n.flags & 128) !== 0), (N = y.rendering), N === null))
          if (a) as(y, !1);
          else {
            if (ot !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = n.child; t !== null; ) {
                if (((N = zi(t)), N !== null)) {
                  for (
                    n.flags |= 128,
                      as(y, !1),
                      a = N.updateQueue,
                      a !== null && ((n.updateQueue = a), (n.flags |= 4)),
                      n.subtreeFlags = 0,
                      a = s,
                      s = n.child;
                    s !== null;
                  )
                    ((y = s),
                      (t = a),
                      (y.flags &= 14680066),
                      (N = y.alternate),
                      N === null
                        ? ((y.childLanes = 0),
                          (y.lanes = t),
                          (y.child = null),
                          (y.subtreeFlags = 0),
                          (y.memoizedProps = null),
                          (y.memoizedState = null),
                          (y.updateQueue = null),
                          (y.dependencies = null),
                          (y.stateNode = null))
                        : ((y.childLanes = N.childLanes),
                          (y.lanes = N.lanes),
                          (y.child = N.child),
                          (y.subtreeFlags = 0),
                          (y.deletions = null),
                          (y.memoizedProps = N.memoizedProps),
                          (y.memoizedState = N.memoizedState),
                          (y.updateQueue = N.updateQueue),
                          (y.type = N.type),
                          (t = N.dependencies),
                          (y.dependencies =
                            t === null
                              ? null
                              : {
                                  lanes: t.lanes,
                                  firstContext: t.firstContext,
                                })),
                      (s = s.sibling));
                  return (He(qe, (qe.current & 1) | 2), n.child);
                }
                t = t.sibling;
              }
            y.tail !== null &&
              Ge() > so &&
              ((n.flags |= 128), (a = !0), as(y, !1), (n.lanes = 4194304));
          }
        else {
          if (!a)
            if (((t = zi(N)), t !== null)) {
              if (
                ((n.flags |= 128),
                (a = !0),
                (s = t.updateQueue),
                s !== null && ((n.updateQueue = s), (n.flags |= 4)),
                as(y, !0),
                y.tail === null &&
                  y.tailMode === "hidden" &&
                  !N.alternate &&
                  !Ue)
              )
                return (gt(n), null);
            } else
              2 * Ge() - y.renderingStartTime > so &&
                s !== 1073741824 &&
                ((n.flags |= 128), (a = !0), as(y, !1), (n.lanes = 4194304));
          y.isBackwards
            ? ((N.sibling = n.child), (n.child = N))
            : ((s = y.last),
              s !== null ? (s.sibling = N) : (n.child = N),
              (y.last = N));
        }
        return y.tail !== null
          ? ((n = y.tail),
            (y.rendering = n),
            (y.tail = n.sibling),
            (y.renderingStartTime = Ge()),
            (n.sibling = null),
            (s = qe.current),
            He(qe, a ? (s & 1) | 2 : s & 1),
            n)
          : (gt(n), null);
      case 22:
      case 23:
        return (
          Du(),
          (a = n.memoizedState !== null),
          t !== null && (t.memoizedState !== null) !== a && (n.flags |= 8192),
          a && (n.mode & 1) !== 0
            ? (zt & 1073741824) !== 0 &&
              (gt(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : gt(n),
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
          Nt(n.type) && Ni(),
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 3:
        return (
          to(),
          We(kt),
          We(pt),
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
          (We(qe), (t = n.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (n.alternate === null) throw Error(o(340));
          qr();
        }
        return (
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 19:
        return (We(qe), null);
      case 4:
        return (to(), null);
      case 10:
        return (Za(n.type._context), null);
      case 22:
      case 23:
        return (Du(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Wi = !1,
    yt = !1,
    Fy = typeof WeakSet == "function" ? WeakSet : Set,
    ve = null;
  function ro(t, n) {
    var s = t.ref;
    if (s !== null)
      if (typeof s == "function")
        try {
          s(null);
        } catch (a) {
          Ze(t, n, a);
        }
      else s.current = null;
  }
  function bu(t, n, s) {
    try {
      s();
    } catch (a) {
      Ze(t, n, a);
    }
  }
  var ch = !1;
  function Hy(t, n) {
    if (((Da = ci), (t = Hd()), Ma(t))) {
      if ("selectionStart" in t)
        var s = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          s = ((s = t.ownerDocument) && s.defaultView) || window;
          var a = s.getSelection && s.getSelection();
          if (a && a.rangeCount !== 0) {
            s = a.anchorNode;
            var f = a.anchorOffset,
              y = a.focusNode;
            a = a.focusOffset;
            try {
              (s.nodeType, y.nodeType);
            } catch {
              s = null;
              break e;
            }
            var N = 0,
              T = -1,
              O = -1,
              ee = 0,
              ae = 0,
              ue = t,
              le = null;
            t: for (;;) {
              for (
                var xe;
                ue !== s || (f !== 0 && ue.nodeType !== 3) || (T = N + f),
                  ue !== y || (a !== 0 && ue.nodeType !== 3) || (O = N + a),
                  ue.nodeType === 3 && (N += ue.nodeValue.length),
                  (xe = ue.firstChild) !== null;
              )
                ((le = ue), (ue = xe));
              for (;;) {
                if (ue === t) break t;
                if (
                  (le === s && ++ee === f && (T = N),
                  le === y && ++ae === a && (O = N),
                  (xe = ue.nextSibling) !== null)
                )
                  break;
                ((ue = le), (le = ue.parentNode));
              }
              ue = xe;
            }
            s = T === -1 || O === -1 ? null : { start: T, end: O };
          } else s = null;
        }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (
      Oa = { focusedElem: t, selectionRange: s }, ci = !1, ve = n;
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
            var we = n.alternate;
            if ((n.flags & 1024) !== 0)
              switch (n.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (we !== null) {
                    var Ee = we.memoizedProps,
                      et = we.memoizedState,
                      J = n.stateNode,
                      W = J.getSnapshotBeforeUpdate(
                        n.elementType === n.type ? Ee : Qt(n.type, Ee),
                        et
                      );
                    J.__reactInternalSnapshotBeforeUpdate = W;
                  }
                  break;
                case 3:
                  var Z = n.stateNode.containerInfo;
                  Z.nodeType === 1
                    ? (Z.textContent = "")
                    : Z.nodeType === 9 &&
                      Z.documentElement &&
                      Z.removeChild(Z.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(o(163));
              }
          } catch (de) {
            Ze(n, n.return, de);
          }
          if (((t = n.sibling), t !== null)) {
            ((t.return = n.return), (ve = t));
            break;
          }
          ve = n.return;
        }
    return ((we = ch), (ch = !1), we);
  }
  function us(t, n, s) {
    var a = n.updateQueue;
    if (((a = a !== null ? a.lastEffect : null), a !== null)) {
      var f = (a = a.next);
      do {
        if ((f.tag & t) === t) {
          var y = f.destroy;
          ((f.destroy = void 0), y !== void 0 && bu(n, s, y));
        }
        f = f.next;
      } while (f !== a);
    }
  }
  function Ui(t, n) {
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
  function ju(t) {
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
          (delete n[ln],
          delete n[Jo],
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
            s != null || n.onclick !== null || (n.onclick = Ei)));
    else if (a !== 4 && ((t = t.child), t !== null))
      for (_u(t, n, s), t = t.sibling; t !== null; )
        (_u(t, n, s), (t = t.sibling));
  }
  function Iu(t, n, s) {
    var a = t.tag;
    if (a === 5 || a === 6)
      ((t = t.stateNode), n ? s.insertBefore(t, n) : s.appendChild(t));
    else if (a !== 4 && ((t = t.child), t !== null))
      for (Iu(t, n, s), t = t.sibling; t !== null; )
        (Iu(t, n, s), (t = t.sibling));
  }
  var ct = null,
    Gt = !1;
  function Yn(t, n, s) {
    for (s = s.child; s !== null; ) (ph(t, n, s), (s = s.sibling));
  }
  function ph(t, n, s) {
    if (Ot && typeof Ot.onCommitFiberUnmount == "function")
      try {
        Ot.onCommitFiberUnmount(ur, s);
      } catch {}
    switch (s.tag) {
      case 5:
        yt || ro(s, n);
      case 6:
        var a = ct,
          f = Gt;
        ((ct = null),
          Yn(t, n, s),
          (ct = a),
          (Gt = f),
          ct !== null &&
            (Gt
              ? ((t = ct),
                (s = s.stateNode),
                t.nodeType === 8
                  ? t.parentNode.removeChild(s)
                  : t.removeChild(s))
              : ct.removeChild(s.stateNode)));
        break;
      case 18:
        ct !== null &&
          (Gt
            ? ((t = ct),
              (s = s.stateNode),
              t.nodeType === 8
                ? Ba(t.parentNode, s)
                : t.nodeType === 1 && Ba(t, s),
              Ho(t))
            : Ba(ct, s.stateNode));
        break;
      case 4:
        ((a = ct),
          (f = Gt),
          (ct = s.stateNode.containerInfo),
          (Gt = !0),
          Yn(t, n, s),
          (ct = a),
          (Gt = f));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !yt &&
          ((a = s.updateQueue), a !== null && ((a = a.lastEffect), a !== null))
        ) {
          f = a = a.next;
          do {
            var y = f,
              N = y.destroy;
            ((y = y.tag),
              N !== void 0 && ((y & 2) !== 0 || (y & 4) !== 0) && bu(s, n, N),
              (f = f.next));
          } while (f !== a);
        }
        Yn(t, n, s);
        break;
      case 1:
        if (
          !yt &&
          (ro(s, n),
          (a = s.stateNode),
          typeof a.componentWillUnmount == "function")
        )
          try {
            ((a.props = s.memoizedProps),
              (a.state = s.memoizedState),
              a.componentWillUnmount());
          } catch (T) {
            Ze(s, n, T);
          }
        Yn(t, n, s);
        break;
      case 21:
        Yn(t, n, s);
        break;
      case 22:
        s.mode & 1
          ? ((yt = (a = yt) || s.memoizedState !== null), Yn(t, n, s), (yt = a))
          : Yn(t, n, s);
        break;
      default:
        Yn(t, n, s);
    }
  }
  function mh(t) {
    var n = t.updateQueue;
    if (n !== null) {
      t.updateQueue = null;
      var s = t.stateNode;
      (s === null && (s = t.stateNode = new Fy()),
        n.forEach(function (a) {
          var f = Gy.bind(null, t, a);
          s.has(a) || (s.add(a), a.then(f, f));
        }));
    }
  }
  function qt(t, n) {
    var s = n.deletions;
    if (s !== null)
      for (var a = 0; a < s.length; a++) {
        var f = s[a];
        try {
          var y = t,
            N = n,
            T = N;
          e: for (; T !== null; ) {
            switch (T.tag) {
              case 5:
                ((ct = T.stateNode), (Gt = !1));
                break e;
              case 3:
                ((ct = T.stateNode.containerInfo), (Gt = !0));
                break e;
              case 4:
                ((ct = T.stateNode.containerInfo), (Gt = !0));
                break e;
            }
            T = T.return;
          }
          if (ct === null) throw Error(o(160));
          (ph(y, N, f), (ct = null), (Gt = !1));
          var O = f.alternate;
          (O !== null && (O.return = null), (f.return = null));
        } catch (ee) {
          Ze(f, n, ee);
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
        if ((qt(n, t), cn(t), a & 4)) {
          try {
            (us(3, t, t.return), Ui(3, t));
          } catch (Ee) {
            Ze(t, t.return, Ee);
          }
          try {
            us(5, t, t.return);
          } catch (Ee) {
            Ze(t, t.return, Ee);
          }
        }
        break;
      case 1:
        (qt(n, t), cn(t), a & 512 && s !== null && ro(s, s.return));
        break;
      case 5:
        if (
          (qt(n, t),
          cn(t),
          a & 512 && s !== null && ro(s, s.return),
          t.flags & 32)
        ) {
          var f = t.stateNode;
          try {
            Fe(f, "");
          } catch (Ee) {
            Ze(t, t.return, Ee);
          }
        }
        if (a & 4 && ((f = t.stateNode), f != null)) {
          var y = t.memoizedProps,
            N = s !== null ? s.memoizedProps : y,
            T = t.type,
            O = t.updateQueue;
          if (((t.updateQueue = null), O !== null))
            try {
              (T === "input" &&
                y.type === "radio" &&
                y.name != null &&
                me(f, y),
                sr(T, N));
              var ee = sr(T, y);
              for (N = 0; N < O.length; N += 2) {
                var ae = O[N],
                  ue = O[N + 1];
                ae === "style"
                  ? vt(f, ue)
                  : ae === "dangerouslySetInnerHTML"
                    ? Et(f, ue)
                    : ae === "children"
                      ? Fe(f, ue)
                      : k(f, ae, ue, ee);
              }
              switch (T) {
                case "input":
                  Ce(f, y);
                  break;
                case "textarea":
                  Ie(f, y);
                  break;
                case "select":
                  var le = f._wrapperState.wasMultiple;
                  f._wrapperState.wasMultiple = !!y.multiple;
                  var xe = y.value;
                  xe != null
                    ? it(f, !!y.multiple, xe, !1)
                    : le !== !!y.multiple &&
                      (y.defaultValue != null
                        ? it(f, !!y.multiple, y.defaultValue, !0)
                        : it(f, !!y.multiple, y.multiple ? [] : "", !1));
              }
              f[Jo] = y;
            } catch (Ee) {
              Ze(t, t.return, Ee);
            }
        }
        break;
      case 6:
        if ((qt(n, t), cn(t), a & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          ((f = t.stateNode), (y = t.memoizedProps));
          try {
            f.nodeValue = y;
          } catch (Ee) {
            Ze(t, t.return, Ee);
          }
        }
        break;
      case 3:
        if (
          (qt(n, t), cn(t), a & 4 && s !== null && s.memoizedState.isDehydrated)
        )
          try {
            Ho(n.containerInfo);
          } catch (Ee) {
            Ze(t, t.return, Ee);
          }
        break;
      case 4:
        (qt(n, t), cn(t));
        break;
      case 13:
        (qt(n, t),
          cn(t),
          (f = t.child),
          f.flags & 8192 &&
            ((y = f.memoizedState !== null),
            (f.stateNode.isHidden = y),
            !y ||
              (f.alternate !== null && f.alternate.memoizedState !== null) ||
              (Ru = Ge())),
          a & 4 && mh(t));
        break;
      case 22:
        if (
          ((ae = s !== null && s.memoizedState !== null),
          t.mode & 1 ? ((yt = (ee = yt) || ae), qt(n, t), (yt = ee)) : qt(n, t),
          cn(t),
          a & 8192)
        ) {
          if (
            ((ee = t.memoizedState !== null),
            (t.stateNode.isHidden = ee) && !ae && (t.mode & 1) !== 0)
          )
            for (ve = t, ae = t.child; ae !== null; ) {
              for (ue = ve = ae; ve !== null; ) {
                switch (((le = ve), (xe = le.child), le.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    us(4, le, le.return);
                    break;
                  case 1:
                    ro(le, le.return);
                    var we = le.stateNode;
                    if (typeof we.componentWillUnmount == "function") {
                      ((a = le), (s = le.return));
                      try {
                        ((n = a),
                          (we.props = n.memoizedProps),
                          (we.state = n.memoizedState),
                          we.componentWillUnmount());
                      } catch (Ee) {
                        Ze(a, s, Ee);
                      }
                    }
                    break;
                  case 5:
                    ro(le, le.return);
                    break;
                  case 22:
                    if (le.memoizedState !== null) {
                      vh(ue);
                      continue;
                    }
                }
                xe !== null ? ((xe.return = le), (ve = xe)) : vh(ue);
              }
              ae = ae.sibling;
            }
          e: for (ae = null, ue = t; ; ) {
            if (ue.tag === 5) {
              if (ae === null) {
                ae = ue;
                try {
                  ((f = ue.stateNode),
                    ee
                      ? ((y = f.style),
                        typeof y.setProperty == "function"
                          ? y.setProperty("display", "none", "important")
                          : (y.display = "none"))
                      : ((T = ue.stateNode),
                        (O = ue.memoizedProps.style),
                        (N =
                          O != null && O.hasOwnProperty("display")
                            ? O.display
                            : null),
                        (T.style.display = xt("display", N))));
                } catch (Ee) {
                  Ze(t, t.return, Ee);
                }
              }
            } else if (ue.tag === 6) {
              if (ae === null)
                try {
                  ue.stateNode.nodeValue = ee ? "" : ue.memoizedProps;
                } catch (Ee) {
                  Ze(t, t.return, Ee);
                }
            } else if (
              ((ue.tag !== 22 && ue.tag !== 23) ||
                ue.memoizedState === null ||
                ue === t) &&
              ue.child !== null
            ) {
              ((ue.child.return = ue), (ue = ue.child));
              continue;
            }
            if (ue === t) break e;
            for (; ue.sibling === null; ) {
              if (ue.return === null || ue.return === t) break e;
              (ae === ue && (ae = null), (ue = ue.return));
            }
            (ae === ue && (ae = null),
              (ue.sibling.return = ue.return),
              (ue = ue.sibling));
          }
        }
        break;
      case 19:
        (qt(n, t), cn(t), a & 4 && mh(t));
        break;
      case 21:
        break;
      default:
        (qt(n, t), cn(t));
    }
  }
  function cn(t) {
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
            var f = a.stateNode;
            a.flags & 32 && (Fe(f, ""), (a.flags &= -33));
            var y = hh(t);
            Iu(t, y, f);
            break;
          case 3:
          case 4:
            var N = a.stateNode.containerInfo,
              T = hh(t);
            _u(t, T, N);
            break;
          default:
            throw Error(o(161));
        }
      } catch (O) {
        Ze(t, t.return, O);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function By(t, n, s) {
    ((ve = t), yh(t));
  }
  function yh(t, n, s) {
    for (var a = (t.mode & 1) !== 0; ve !== null; ) {
      var f = ve,
        y = f.child;
      if (f.tag === 22 && a) {
        var N = f.memoizedState !== null || Wi;
        if (!N) {
          var T = f.alternate,
            O = (T !== null && T.memoizedState !== null) || yt;
          T = Wi;
          var ee = yt;
          if (((Wi = N), (yt = O) && !ee))
            for (ve = f; ve !== null; )
              ((N = ve),
                (O = N.child),
                N.tag === 22 && N.memoizedState !== null
                  ? wh(f)
                  : O !== null
                    ? ((O.return = N), (ve = O))
                    : wh(f));
          for (; y !== null; ) ((ve = y), yh(y), (y = y.sibling));
          ((ve = f), (Wi = T), (yt = ee));
        }
        xh(t);
      } else
        (f.subtreeFlags & 8772) !== 0 && y !== null
          ? ((y.return = f), (ve = y))
          : xh(t);
    }
  }
  function xh(t) {
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
                yt || Ui(5, n);
                break;
              case 1:
                var a = n.stateNode;
                if (n.flags & 4 && !yt)
                  if (s === null) a.componentDidMount();
                  else {
                    var f =
                      n.elementType === n.type
                        ? s.memoizedProps
                        : Qt(n.type, s.memoizedProps);
                    a.componentDidUpdate(
                      f,
                      s.memoizedState,
                      a.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                var y = n.updateQueue;
                y !== null && vf(n, y, a);
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
                  vf(n, N, s);
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
                    var ae = ee.memoizedState;
                    if (ae !== null) {
                      var ue = ae.dehydrated;
                      ue !== null && Ho(ue);
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
          yt || (n.flags & 512 && ju(n));
        } catch (le) {
          Ze(n, n.return, le);
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
  function vh(t) {
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
  function wh(t) {
    for (; ve !== null; ) {
      var n = ve;
      try {
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            var s = n.return;
            try {
              Ui(4, n);
            } catch (O) {
              Ze(n, s, O);
            }
            break;
          case 1:
            var a = n.stateNode;
            if (typeof a.componentDidMount == "function") {
              var f = n.return;
              try {
                a.componentDidMount();
              } catch (O) {
                Ze(n, f, O);
              }
            }
            var y = n.return;
            try {
              ju(n);
            } catch (O) {
              Ze(n, y, O);
            }
            break;
          case 5:
            var N = n.return;
            try {
              ju(n);
            } catch (O) {
              Ze(n, N, O);
            }
        }
      } catch (O) {
        Ze(n, n.return, O);
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
  var Vy = Math.ceil,
    Yi = _.ReactCurrentDispatcher,
    Mu = _.ReactCurrentOwner,
    Wt = _.ReactCurrentBatchConfig,
    Ae = 0,
    at = null,
    tt = null,
    dt = 0,
    zt = 0,
    oo = Hn(0),
    ot = 0,
    cs = null,
    xr = 0,
    Xi = 0,
    Pu = 0,
    ds = null,
    bt = null,
    Ru = 0,
    so = 1 / 0,
    Cn = null,
    Ki = !1,
    Tu = null,
    Xn = null,
    Qi = !1,
    Kn = null,
    Gi = 0,
    fs = 0,
    Lu = null,
    qi = -1,
    Ji = 0;
  function St() {
    return (Ae & 6) !== 0 ? Ge() : qi !== -1 ? qi : (qi = Ge());
  }
  function Qn(t) {
    return (t.mode & 1) === 0
      ? 1
      : (Ae & 2) !== 0 && dt !== 0
        ? dt & -dt
        : by.transition !== null
          ? (Ji === 0 && (Ji = Dr()), Ji)
          : ((t = Oe),
            t !== 0 ||
              ((t = window.event), (t = t === void 0 ? 16 : Sd(t.type))),
            t);
  }
  function Jt(t, n, s, a) {
    if (50 < fs) throw ((fs = 0), (Lu = null), Error(o(185)));
    (cr(t, s, a),
      ((Ae & 2) === 0 || t !== at) &&
        (t === at && ((Ae & 2) === 0 && (Xi |= s), ot === 4 && Gn(t, dt)),
        jt(t, a),
        s === 1 &&
          Ae === 0 &&
          (n.mode & 1) === 0 &&
          ((so = Ge() + 500), bi && Vn())));
  }
  function jt(t, n) {
    var s = t.callbackNode;
    ma(t, n);
    var a = $r(t, t === at ? dt : 0);
    if (a === 0)
      (s !== null && ni(s), (t.callbackNode = null), (t.callbackPriority = 0));
    else if (((n = a & -a), t.callbackPriority !== n)) {
      if ((s != null && ni(s), n === 1))
        (t.tag === 0 ? Cy(Eh.bind(null, t)) : lf(Eh.bind(null, t)),
          Sy(function () {
            (Ae & 6) === 0 && Vn();
          }),
          (s = null));
      else {
        switch (hd(a)) {
          case 1:
            s = Lo;
            break;
          case 4:
            s = oi;
            break;
          case 16:
            s = Lr;
            break;
          case 536870912:
            s = si;
            break;
          default:
            s = Lr;
        }
        s = Mh(s, Sh.bind(null, t));
      }
      ((t.callbackPriority = n), (t.callbackNode = s));
    }
  }
  function Sh(t, n) {
    if (((qi = -1), (Ji = 0), (Ae & 6) !== 0)) throw Error(o(327));
    var s = t.callbackNode;
    if (io() && t.callbackNode !== s) return null;
    var a = $r(t, t === at ? dt : 0);
    if (a === 0) return null;
    if ((a & 30) !== 0 || (a & t.expiredLanes) !== 0 || n) n = Zi(t, a);
    else {
      n = a;
      var f = Ae;
      Ae |= 2;
      var y = Nh();
      (at !== t || dt !== n) && ((Cn = null), (so = Ge() + 500), wr(t, n));
      do
        try {
          Yy();
          break;
        } catch (T) {
          kh(t, T);
        }
      while (!0);
      (Ja(),
        (Yi.current = y),
        (Ae = f),
        tt !== null ? (n = 0) : ((at = null), (dt = 0), (n = ot)));
    }
    if (n !== 0) {
      if (
        (n === 2 && ((f = zo(t)), f !== 0 && ((a = f), (n = zu(t, f)))),
        n === 1)
      )
        throw ((s = cs), wr(t, 0), Gn(t, a), jt(t, Ge()), s);
      if (n === 6) Gn(t, a);
      else {
        if (
          ((f = t.current.alternate),
          (a & 30) === 0 &&
            !Wy(f) &&
            ((n = Zi(t, a)),
            n === 2 && ((y = zo(t)), y !== 0 && ((a = y), (n = zu(t, y)))),
            n === 1))
        )
          throw ((s = cs), wr(t, 0), Gn(t, a), jt(t, Ge()), s);
        switch (((t.finishedWork = f), (t.finishedLanes = a), n)) {
          case 0:
          case 1:
            throw Error(o(345));
          case 2:
            Sr(t, bt, Cn);
            break;
          case 3:
            if (
              (Gn(t, a),
              (a & 130023424) === a && ((n = Ru + 500 - Ge()), 10 < n))
            ) {
              if ($r(t, 0) !== 0) break;
              if (((f = t.suspendedLanes), (f & a) !== a)) {
                (St(), (t.pingedLanes |= t.suspendedLanes & f));
                break;
              }
              t.timeoutHandle = Ha(Sr.bind(null, t, bt, Cn), n);
              break;
            }
            Sr(t, bt, Cn);
            break;
          case 4:
            if ((Gn(t, a), (a & 4194240) === a)) break;
            for (n = t.eventTimes, f = -1; 0 < a; ) {
              var N = 31 - Pt(a);
              ((y = 1 << N), (N = n[N]), N > f && (f = N), (a &= ~y));
            }
            if (
              ((a = f),
              (a = Ge() - a),
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
              t.timeoutHandle = Ha(Sr.bind(null, t, bt, Cn), a);
              break;
            }
            Sr(t, bt, Cn);
            break;
          case 5:
            Sr(t, bt, Cn);
            break;
          default:
            throw Error(o(329));
        }
      }
    }
    return (jt(t, Ge()), t.callbackNode === s ? Sh.bind(null, t) : null);
  }
  function zu(t, n) {
    var s = ds;
    return (
      t.current.memoizedState.isDehydrated && (wr(t, n).flags |= 256),
      (t = Zi(t, n)),
      t !== 2 && ((n = bt), (bt = s), n !== null && Au(n)),
      t
    );
  }
  function Au(t) {
    bt === null ? (bt = t) : bt.push.apply(bt, t);
  }
  function Wy(t) {
    for (var n = t; ; ) {
      if (n.flags & 16384) {
        var s = n.updateQueue;
        if (s !== null && ((s = s.stores), s !== null))
          for (var a = 0; a < s.length; a++) {
            var f = s[a],
              y = f.getSnapshot;
            f = f.value;
            try {
              if (!Xt(y(), f)) return !1;
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
  function Gn(t, n) {
    for (
      n &= ~Pu,
        n &= ~Xi,
        t.suspendedLanes |= n,
        t.pingedLanes &= ~n,
        t = t.expirationTimes;
      0 < n;
    ) {
      var s = 31 - Pt(n),
        a = 1 << s;
      ((t[s] = -1), (n &= ~a));
    }
  }
  function Eh(t) {
    if ((Ae & 6) !== 0) throw Error(o(327));
    io();
    var n = $r(t, 0);
    if ((n & 1) === 0) return (jt(t, Ge()), null);
    var s = Zi(t, n);
    if (t.tag !== 0 && s === 2) {
      var a = zo(t);
      a !== 0 && ((n = a), (s = zu(t, a)));
    }
    if (s === 1) throw ((s = cs), wr(t, 0), Gn(t, n), jt(t, Ge()), s);
    if (s === 6) throw Error(o(345));
    return (
      (t.finishedWork = t.current.alternate),
      (t.finishedLanes = n),
      Sr(t, bt, Cn),
      jt(t, Ge()),
      null
    );
  }
  function $u(t, n) {
    var s = Ae;
    Ae |= 1;
    try {
      return t(n);
    } finally {
      ((Ae = s), Ae === 0 && ((so = Ge() + 500), bi && Vn()));
    }
  }
  function vr(t) {
    Kn !== null && Kn.tag === 0 && (Ae & 6) === 0 && io();
    var n = Ae;
    Ae |= 1;
    var s = Wt.transition,
      a = Oe;
    try {
      if (((Wt.transition = null), (Oe = 1), t)) return t();
    } finally {
      ((Oe = a), (Wt.transition = s), (Ae = n), (Ae & 6) === 0 && Vn());
    }
  }
  function Du() {
    ((zt = oo.current), We(oo));
  }
  function wr(t, n) {
    ((t.finishedWork = null), (t.finishedLanes = 0));
    var s = t.timeoutHandle;
    if ((s !== -1 && ((t.timeoutHandle = -1), wy(s)), tt !== null))
      for (s = tt.return; s !== null; ) {
        var a = s;
        switch ((Xa(a), a.tag)) {
          case 1:
            ((a = a.type.childContextTypes), a != null && Ni());
            break;
          case 3:
            (to(), We(kt), We(pt), iu());
            break;
          case 5:
            ou(a);
            break;
          case 4:
            to();
            break;
          case 13:
            We(qe);
            break;
          case 19:
            We(qe);
            break;
          case 10:
            Za(a.type._context);
            break;
          case 22:
          case 23:
            Du();
        }
        s = s.return;
      }
    if (
      ((at = t),
      (tt = t = qn(t.current, null)),
      (dt = zt = n),
      (ot = 0),
      (cs = null),
      (Pu = Xi = xr = 0),
      (bt = ds = null),
      mr !== null)
    ) {
      for (n = 0; n < mr.length; n++)
        if (((s = mr[n]), (a = s.interleaved), a !== null)) {
          s.interleaved = null;
          var f = a.next,
            y = s.pending;
          if (y !== null) {
            var N = y.next;
            ((y.next = f), (a.next = N));
          }
          s.pending = a;
        }
      mr = null;
    }
    return t;
  }
  function kh(t, n) {
    do {
      var s = tt;
      try {
        if ((Ja(), (Ai.current = Fi), $i)) {
          for (var a = Je.memoizedState; a !== null; ) {
            var f = a.queue;
            (f !== null && (f.pending = null), (a = a.next));
          }
          $i = !1;
        }
        if (
          ((yr = 0),
          (lt = rt = Je = null),
          (os = !1),
          (ss = 0),
          (Mu.current = null),
          s === null || s.return === null)
        ) {
          ((ot = 1), (cs = n), (tt = null));
          break;
        }
        e: {
          var y = t,
            N = s.return,
            T = s,
            O = n;
          if (
            ((n = dt),
            (T.flags |= 32768),
            O !== null && typeof O == "object" && typeof O.then == "function")
          ) {
            var ee = O,
              ae = T,
              ue = ae.tag;
            if ((ae.mode & 1) === 0 && (ue === 0 || ue === 11 || ue === 15)) {
              var le = ae.alternate;
              le
                ? ((ae.updateQueue = le.updateQueue),
                  (ae.memoizedState = le.memoizedState),
                  (ae.lanes = le.lanes))
                : ((ae.updateQueue = null), (ae.memoizedState = null));
            }
            var xe = Kf(N);
            if (xe !== null) {
              ((xe.flags &= -257),
                Qf(xe, N, T, y, n),
                xe.mode & 1 && Xf(y, ee, n),
                (n = xe),
                (O = ee));
              var we = n.updateQueue;
              if (we === null) {
                var Ee = new Set();
                (Ee.add(O), (n.updateQueue = Ee));
              } else we.add(O);
              break e;
            } else {
              if ((n & 1) === 0) {
                (Xf(y, ee, n), Ou());
                break e;
              }
              O = Error(o(426));
            }
          } else if (Ue && T.mode & 1) {
            var et = Kf(N);
            if (et !== null) {
              ((et.flags & 65536) === 0 && (et.flags |= 256),
                Qf(et, N, T, y, n),
                Ga(no(O, T)));
              break e;
            }
          }
          ((y = O = no(O, T)),
            ot !== 4 && (ot = 2),
            ds === null ? (ds = [y]) : ds.push(y),
            (y = N));
          do {
            switch (y.tag) {
              case 3:
                ((y.flags |= 65536), (n &= -n), (y.lanes |= n));
                var J = Uf(y, O, n);
                xf(y, J);
                break e;
              case 1:
                T = O;
                var W = y.type,
                  Z = y.stateNode;
                if (
                  (y.flags & 128) === 0 &&
                  (typeof W.getDerivedStateFromError == "function" ||
                    (Z !== null &&
                      typeof Z.componentDidCatch == "function" &&
                      (Xn === null || !Xn.has(Z))))
                ) {
                  ((y.flags |= 65536), (n &= -n), (y.lanes |= n));
                  var de = Yf(y, T, n);
                  xf(y, de);
                  break e;
                }
            }
            y = y.return;
          } while (y !== null);
        }
        bh(s);
      } catch (ke) {
        ((n = ke), tt === s && s !== null && (tt = s = s.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Nh() {
    var t = Yi.current;
    return ((Yi.current = Fi), t === null ? Fi : t);
  }
  function Ou() {
    ((ot === 0 || ot === 3 || ot === 2) && (ot = 4),
      at === null ||
        ((xr & 268435455) === 0 && (Xi & 268435455) === 0) ||
        Gn(at, dt));
  }
  function Zi(t, n) {
    var s = Ae;
    Ae |= 2;
    var a = Nh();
    (at !== t || dt !== n) && ((Cn = null), wr(t, n));
    do
      try {
        Uy();
        break;
      } catch (f) {
        kh(t, f);
      }
    while (!0);
    if ((Ja(), (Ae = s), (Yi.current = a), tt !== null)) throw Error(o(261));
    return ((at = null), (dt = 0), ot);
  }
  function Uy() {
    for (; tt !== null; ) Ch(tt);
  }
  function Yy() {
    for (; tt !== null && !aa(); ) Ch(tt);
  }
  function Ch(t) {
    var n = Ih(t.alternate, t, zt);
    ((t.memoizedProps = t.pendingProps),
      n === null ? bh(t) : (tt = n),
      (Mu.current = null));
  }
  function bh(t) {
    var n = t;
    do {
      var s = n.alternate;
      if (((t = n.return), (n.flags & 32768) === 0)) {
        if (((s = Dy(s, n, zt)), s !== null)) {
          tt = s;
          return;
        }
      } else {
        if (((s = Oy(s, n)), s !== null)) {
          ((s.flags &= 32767), (tt = s));
          return;
        }
        if (t !== null)
          ((t.flags |= 32768), (t.subtreeFlags = 0), (t.deletions = null));
        else {
          ((ot = 6), (tt = null));
          return;
        }
      }
      if (((n = n.sibling), n !== null)) {
        tt = n;
        return;
      }
      tt = n = t;
    } while (n !== null);
    ot === 0 && (ot = 5);
  }
  function Sr(t, n, s) {
    var a = Oe,
      f = Wt.transition;
    try {
      ((Wt.transition = null), (Oe = 1), Xy(t, n, s, a));
    } finally {
      ((Wt.transition = f), (Oe = a));
    }
    return null;
  }
  function Xy(t, n, s, a) {
    do io();
    while (Kn !== null);
    if ((Ae & 6) !== 0) throw Error(o(327));
    s = t.finishedWork;
    var f = t.finishedLanes;
    if (s === null) return null;
    if (((t.finishedWork = null), (t.finishedLanes = 0), s === t.current))
      throw Error(o(177));
    ((t.callbackNode = null), (t.callbackPriority = 0));
    var y = s.lanes | s.childLanes;
    if (
      (li(t, y),
      t === at && ((tt = at = null), (dt = 0)),
      ((s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0) ||
        Qi ||
        ((Qi = !0),
        Mh(Lr, function () {
          return (io(), null);
        })),
      (y = (s.flags & 15990) !== 0),
      (s.subtreeFlags & 15990) !== 0 || y)
    ) {
      ((y = Wt.transition), (Wt.transition = null));
      var N = Oe;
      Oe = 1;
      var T = Ae;
      ((Ae |= 4),
        (Mu.current = null),
        Hy(t, s),
        gh(s, t),
        hy(Oa),
        (ci = !!Da),
        (Oa = Da = null),
        (t.current = s),
        By(s),
        ri(),
        (Ae = T),
        (Oe = N),
        (Wt.transition = y));
    } else t.current = s;
    if (
      (Qi && ((Qi = !1), (Kn = t), (Gi = f)),
      (y = t.pendingLanes),
      y === 0 && (Xn = null),
      da(s.stateNode),
      jt(t, Ge()),
      n !== null)
    )
      for (a = t.onRecoverableError, s = 0; s < n.length; s++)
        ((f = n[s]), a(f.value, { componentStack: f.stack, digest: f.digest }));
    if (Ki) throw ((Ki = !1), (t = Tu), (Tu = null), t);
    return (
      (Gi & 1) !== 0 && t.tag !== 0 && io(),
      (y = t.pendingLanes),
      (y & 1) !== 0 ? (t === Lu ? fs++ : ((fs = 0), (Lu = t))) : (fs = 0),
      Vn(),
      null
    );
  }
  function io() {
    if (Kn !== null) {
      var t = hd(Gi),
        n = Wt.transition,
        s = Oe;
      try {
        if (((Wt.transition = null), (Oe = 16 > t ? 16 : t), Kn === null))
          var a = !1;
        else {
          if (((t = Kn), (Kn = null), (Gi = 0), (Ae & 6) !== 0))
            throw Error(o(331));
          var f = Ae;
          for (Ae |= 4, ve = t.current; ve !== null; ) {
            var y = ve,
              N = y.child;
            if ((ve.flags & 16) !== 0) {
              var T = y.deletions;
              if (T !== null) {
                for (var O = 0; O < T.length; O++) {
                  var ee = T[O];
                  for (ve = ee; ve !== null; ) {
                    var ae = ve;
                    switch (ae.tag) {
                      case 0:
                      case 11:
                      case 15:
                        us(8, ae, y);
                    }
                    var ue = ae.child;
                    if (ue !== null) ((ue.return = ae), (ve = ue));
                    else
                      for (; ve !== null; ) {
                        ae = ve;
                        var le = ae.sibling,
                          xe = ae.return;
                        if ((dh(ae), ae === ee)) {
                          ve = null;
                          break;
                        }
                        if (le !== null) {
                          ((le.return = xe), (ve = le));
                          break;
                        }
                        ve = xe;
                      }
                  }
                }
                var we = y.alternate;
                if (we !== null) {
                  var Ee = we.child;
                  if (Ee !== null) {
                    we.child = null;
                    do {
                      var et = Ee.sibling;
                      ((Ee.sibling = null), (Ee = et));
                    } while (Ee !== null);
                  }
                }
                ve = y;
              }
            }
            if ((y.subtreeFlags & 2064) !== 0 && N !== null)
              ((N.return = y), (ve = N));
            else
              e: for (; ve !== null; ) {
                if (((y = ve), (y.flags & 2048) !== 0))
                  switch (y.tag) {
                    case 0:
                    case 11:
                    case 15:
                      us(9, y, y.return);
                  }
                var J = y.sibling;
                if (J !== null) {
                  ((J.return = y.return), (ve = J));
                  break e;
                }
                ve = y.return;
              }
          }
          var W = t.current;
          for (ve = W; ve !== null; ) {
            N = ve;
            var Z = N.child;
            if ((N.subtreeFlags & 2064) !== 0 && Z !== null)
              ((Z.return = N), (ve = Z));
            else
              e: for (N = W; ve !== null; ) {
                if (((T = ve), (T.flags & 2048) !== 0))
                  try {
                    switch (T.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ui(9, T);
                    }
                  } catch (ke) {
                    Ze(T, T.return, ke);
                  }
                if (T === N) {
                  ve = null;
                  break e;
                }
                var de = T.sibling;
                if (de !== null) {
                  ((de.return = T.return), (ve = de));
                  break e;
                }
                ve = T.return;
              }
          }
          if (
            ((Ae = f),
            Vn(),
            Ot && typeof Ot.onPostCommitFiberRoot == "function")
          )
            try {
              Ot.onPostCommitFiberRoot(ur, t);
            } catch {}
          a = !0;
        }
        return a;
      } finally {
        ((Oe = s), (Wt.transition = n));
      }
    }
    return !1;
  }
  function jh(t, n, s) {
    ((n = no(s, n)),
      (n = Uf(t, n, 1)),
      (t = Un(t, n, 1)),
      (n = St()),
      t !== null && (cr(t, 1, n), jt(t, n)));
  }
  function Ze(t, n, s) {
    if (t.tag === 3) jh(t, t, s);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          jh(n, t, s);
          break;
        } else if (n.tag === 1) {
          var a = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (Xn === null || !Xn.has(a)))
          ) {
            ((t = no(s, t)),
              (t = Yf(n, t, 1)),
              (n = Un(n, t, 1)),
              (t = St()),
              n !== null && (cr(n, 1, t), jt(n, t)));
            break;
          }
        }
        n = n.return;
      }
  }
  function Ky(t, n, s) {
    var a = t.pingCache;
    (a !== null && a.delete(n),
      (n = St()),
      (t.pingedLanes |= t.suspendedLanes & s),
      at === t &&
        (dt & s) === s &&
        (ot === 4 || (ot === 3 && (dt & 130023424) === dt && 500 > Ge() - Ru)
          ? wr(t, 0)
          : (Pu |= s)),
      jt(t, n));
  }
  function _h(t, n) {
    n === 0 &&
      ((t.mode & 1) === 0
        ? (n = 1)
        : ((n = Ar), (Ar <<= 1), (Ar & 130023424) === 0 && (Ar = 4194304)));
    var s = St();
    ((t = En(t, n)), t !== null && (cr(t, n, s), jt(t, s)));
  }
  function Qy(t) {
    var n = t.memoizedState,
      s = 0;
    (n !== null && (s = n.retryLane), _h(t, s));
  }
  function Gy(t, n) {
    var s = 0;
    switch (t.tag) {
      case 13:
        var a = t.stateNode,
          f = t.memoizedState;
        f !== null && (s = f.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      default:
        throw Error(o(314));
    }
    (a !== null && a.delete(n), _h(t, s));
  }
  var Ih;
  Ih = function (t, n, s) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps || kt.current) Ct = !0;
      else {
        if ((t.lanes & s) === 0 && (n.flags & 128) === 0)
          return ((Ct = !1), $y(t, n, s));
        Ct = (t.flags & 131072) !== 0;
      }
    else ((Ct = !1), Ue && (n.flags & 1048576) !== 0 && af(n, _i, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 2:
        var a = n.type;
        (Vi(t, n), (t = n.pendingProps));
        var f = Kr(n, pt.current);
        (eo(n, s), (f = uu(null, n, a, t, f, s)));
        var y = cu();
        return (
          (n.flags |= 1),
          typeof f == "object" &&
          f !== null &&
          typeof f.render == "function" &&
          f.$$typeof === void 0
            ? ((n.tag = 1),
              (n.memoizedState = null),
              (n.updateQueue = null),
              Nt(a) ? ((y = !0), Ci(n)) : (y = !1),
              (n.memoizedState =
                f.state !== null && f.state !== void 0 ? f.state : null),
              nu(n),
              (f.updater = Hi),
              (n.stateNode = f),
              (f._reactInternals = n),
              gu(n, a, t, s),
              (n = wu(null, n, a, !0, y, s)))
            : ((n.tag = 0), Ue && y && Ya(n), wt(null, n, f, s), (n = n.child)),
          n
        );
      case 16:
        a = n.elementType;
        e: {
          switch (
            (Vi(t, n),
            (t = n.pendingProps),
            (f = a._init),
            (a = f(a._payload)),
            (n.type = a),
            (f = n.tag = Jy(a)),
            (t = Qt(a, t)),
            f)
          ) {
            case 0:
              n = vu(null, n, a, t, s);
              break e;
            case 1:
              n = th(null, n, a, t, s);
              break e;
            case 11:
              n = Gf(null, n, a, t, s);
              break e;
            case 14:
              n = qf(null, n, a, Qt(a.type, t), s);
              break e;
          }
          throw Error(o(306, a, ""));
        }
        return n;
      case 0:
        return (
          (a = n.type),
          (f = n.pendingProps),
          (f = n.elementType === a ? f : Qt(a, f)),
          vu(t, n, a, f, s)
        );
      case 1:
        return (
          (a = n.type),
          (f = n.pendingProps),
          (f = n.elementType === a ? f : Qt(a, f)),
          th(t, n, a, f, s)
        );
      case 3:
        e: {
          if ((nh(n), t === null)) throw Error(o(387));
          ((a = n.pendingProps),
            (y = n.memoizedState),
            (f = y.element),
            yf(t, n),
            Li(n, a, null, s));
          var N = n.memoizedState;
          if (((a = N.element), y.isDehydrated))
            if (
              ((y = {
                element: a,
                isDehydrated: !1,
                cache: N.cache,
                pendingSuspenseBoundaries: N.pendingSuspenseBoundaries,
                transitions: N.transitions,
              }),
              (n.updateQueue.baseState = y),
              (n.memoizedState = y),
              n.flags & 256)
            ) {
              ((f = no(Error(o(423)), n)), (n = rh(t, n, a, s, f)));
              break e;
            } else if (a !== f) {
              ((f = no(Error(o(424)), n)), (n = rh(t, n, a, s, f)));
              break e;
            } else
              for (
                Lt = Fn(n.stateNode.containerInfo.firstChild),
                  Tt = n,
                  Ue = !0,
                  Kt = null,
                  s = mf(n, null, a, s),
                  n.child = s;
                s;
              )
                ((s.flags = (s.flags & -3) | 4096), (s = s.sibling));
          else {
            if ((qr(), a === f)) {
              n = Nn(t, n, s);
              break e;
            }
            wt(t, n, a, s);
          }
          n = n.child;
        }
        return n;
      case 5:
        return (
          wf(n),
          t === null && Qa(n),
          (a = n.type),
          (f = n.pendingProps),
          (y = t !== null ? t.memoizedProps : null),
          (N = f.children),
          Fa(a, f) ? (N = null) : y !== null && Fa(a, y) && (n.flags |= 32),
          eh(t, n),
          wt(t, n, N, s),
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
          t === null ? (n.child = Jr(n, null, a, s)) : wt(t, n, a, s),
          n.child
        );
      case 11:
        return (
          (a = n.type),
          (f = n.pendingProps),
          (f = n.elementType === a ? f : Qt(a, f)),
          Gf(t, n, a, f, s)
        );
      case 7:
        return (wt(t, n, n.pendingProps, s), n.child);
      case 8:
        return (wt(t, n, n.pendingProps.children, s), n.child);
      case 12:
        return (wt(t, n, n.pendingProps.children, s), n.child);
      case 10:
        e: {
          if (
            ((a = n.type._context),
            (f = n.pendingProps),
            (y = n.memoizedProps),
            (N = f.value),
            He(Pi, a._currentValue),
            (a._currentValue = N),
            y !== null)
          )
            if (Xt(y.value, N)) {
              if (y.children === f.children && !kt.current) {
                n = Nn(t, n, s);
                break e;
              }
            } else
              for (y = n.child, y !== null && (y.return = n); y !== null; ) {
                var T = y.dependencies;
                if (T !== null) {
                  N = y.child;
                  for (var O = T.firstContext; O !== null; ) {
                    if (O.context === a) {
                      if (y.tag === 1) {
                        ((O = kn(-1, s & -s)), (O.tag = 2));
                        var ee = y.updateQueue;
                        if (ee !== null) {
                          ee = ee.shared;
                          var ae = ee.pending;
                          (ae === null
                            ? (O.next = O)
                            : ((O.next = ae.next), (ae.next = O)),
                            (ee.pending = O));
                        }
                      }
                      ((y.lanes |= s),
                        (O = y.alternate),
                        O !== null && (O.lanes |= s),
                        eu(y.return, s, n),
                        (T.lanes |= s));
                      break;
                    }
                    O = O.next;
                  }
                } else if (y.tag === 10) N = y.type === n.type ? null : y.child;
                else if (y.tag === 18) {
                  if (((N = y.return), N === null)) throw Error(o(341));
                  ((N.lanes |= s),
                    (T = N.alternate),
                    T !== null && (T.lanes |= s),
                    eu(N, s, n),
                    (N = y.sibling));
                } else N = y.child;
                if (N !== null) N.return = y;
                else
                  for (N = y; N !== null; ) {
                    if (N === n) {
                      N = null;
                      break;
                    }
                    if (((y = N.sibling), y !== null)) {
                      ((y.return = N.return), (N = y));
                      break;
                    }
                    N = N.return;
                  }
                y = N;
              }
          (wt(t, n, f.children, s), (n = n.child));
        }
        return n;
      case 9:
        return (
          (f = n.type),
          (a = n.pendingProps.children),
          eo(n, s),
          (f = Bt(f)),
          (a = a(f)),
          (n.flags |= 1),
          wt(t, n, a, s),
          n.child
        );
      case 14:
        return (
          (a = n.type),
          (f = Qt(a, n.pendingProps)),
          (f = Qt(a.type, f)),
          qf(t, n, a, f, s)
        );
      case 15:
        return Jf(t, n, n.type, n.pendingProps, s);
      case 17:
        return (
          (a = n.type),
          (f = n.pendingProps),
          (f = n.elementType === a ? f : Qt(a, f)),
          Vi(t, n),
          (n.tag = 1),
          Nt(a) ? ((t = !0), Ci(n)) : (t = !1),
          eo(n, s),
          Vf(n, a, f),
          gu(n, a, f, s),
          wu(null, n, a, !0, t, s)
        );
      case 19:
        return ih(t, n, s);
      case 22:
        return Zf(t, n, s);
    }
    throw Error(o(156, n.tag));
  };
  function Mh(t, n) {
    return ti(t, n);
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
  function Ut(t, n, s, a) {
    return new qy(t, n, s, a);
  }
  function Fu(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Jy(t) {
    if (typeof t == "function") return Fu(t) ? 1 : 0;
    if (t != null) {
      if (((t = t.$$typeof), t === Y)) return 11;
      if (t === q) return 14;
    }
    return 2;
  }
  function qn(t, n) {
    var s = t.alternate;
    return (
      s === null
        ? ((s = Ut(t.tag, n, t.key, t.mode)),
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
  function el(t, n, s, a, f, y) {
    var N = 2;
    if (((a = t), typeof t == "function")) Fu(t) && (N = 1);
    else if (typeof t == "string") N = 5;
    else
      e: switch (t) {
        case R:
          return Er(s.children, f, y, n);
        case H:
          ((N = 8), (f |= 8));
          break;
        case V:
          return (
            (t = Ut(12, s, n, f | 2)),
            (t.elementType = V),
            (t.lanes = y),
            t
          );
        case te:
          return (
            (t = Ut(13, s, n, f)),
            (t.elementType = te),
            (t.lanes = y),
            t
          );
        case L:
          return ((t = Ut(19, s, n, f)), (t.elementType = L), (t.lanes = y), t);
        case K:
          return tl(s, f, y, n);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case ie:
                N = 10;
                break e;
              case X:
                N = 9;
                break e;
              case Y:
                N = 11;
                break e;
              case q:
                N = 14;
                break e;
              case B:
                ((N = 16), (a = null));
                break e;
            }
          throw Error(o(130, t == null ? t : typeof t, ""));
      }
    return (
      (n = Ut(N, s, n, f)),
      (n.elementType = t),
      (n.type = a),
      (n.lanes = y),
      n
    );
  }
  function Er(t, n, s, a) {
    return ((t = Ut(7, t, a, n)), (t.lanes = s), t);
  }
  function tl(t, n, s, a) {
    return (
      (t = Ut(22, t, a, n)),
      (t.elementType = K),
      (t.lanes = s),
      (t.stateNode = { isHidden: !1 }),
      t
    );
  }
  function Hu(t, n, s) {
    return ((t = Ut(6, t, null, n)), (t.lanes = s), t);
  }
  function Bu(t, n, s) {
    return (
      (n = Ut(4, t.children !== null ? t.children : [], t.key, n)),
      (n.lanes = s),
      (n.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      n
    );
  }
  function Zy(t, n, s, a, f) {
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
      (this.eventTimes = Ao(0)),
      (this.expirationTimes = Ao(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Ao(0)),
      (this.identifierPrefix = a),
      (this.onRecoverableError = f),
      (this.mutableSourceEagerHydrationData = null));
  }
  function Vu(t, n, s, a, f, y, N, T, O) {
    return (
      (t = new Zy(t, n, s, T, O)),
      n === 1 ? ((n = 1), y === !0 && (n |= 8)) : (n = 0),
      (y = Ut(3, null, null, n)),
      (t.current = y),
      (y.stateNode = t),
      (y.memoizedState = {
        element: a,
        isDehydrated: s,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      nu(y),
      t
    );
  }
  function ex(t, n, s) {
    var a =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: z,
      key: a == null ? null : "" + a,
      children: t,
      containerInfo: n,
      implementation: s,
    };
  }
  function Ph(t) {
    if (!t) return Bn;
    t = t._reactInternals;
    e: {
      if (on(t) !== t || t.tag !== 1) throw Error(o(170));
      var n = t;
      do {
        switch (n.tag) {
          case 3:
            n = n.stateNode.context;
            break e;
          case 1:
            if (Nt(n.type)) {
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
      if (Nt(s)) return of(t, s, n);
    }
    return n;
  }
  function Rh(t, n, s, a, f, y, N, T, O) {
    return (
      (t = Vu(s, a, !0, t, f, y, N, T, O)),
      (t.context = Ph(null)),
      (s = t.current),
      (a = St()),
      (f = Qn(s)),
      (y = kn(a, f)),
      (y.callback = n ?? null),
      Un(s, y, f),
      (t.current.lanes = f),
      cr(t, f, a),
      jt(t, a),
      t
    );
  }
  function nl(t, n, s, a) {
    var f = n.current,
      y = St(),
      N = Qn(f);
    return (
      (s = Ph(s)),
      n.context === null ? (n.context = s) : (n.pendingContext = s),
      (n = kn(y, N)),
      (n.payload = { element: t }),
      (a = a === void 0 ? null : a),
      a !== null && (n.callback = a),
      (t = Un(f, n, N)),
      t !== null && (Jt(t, f, N, y), Ti(t, f, N)),
      N
    );
  }
  function rl(t) {
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
  function tx() {
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
  ((ol.prototype.render = Uu.prototype.render =
    function (t) {
      var n = this._internalRoot;
      if (n === null) throw Error(o(409));
      nl(t, n, null, null);
    }),
    (ol.prototype.unmount = Uu.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var n = t.containerInfo;
          (vr(function () {
            nl(null, t, null, null);
          }),
            (n[xn] = null));
        }
      }));
  function ol(t) {
    this._internalRoot = t;
  }
  ol.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var n = gd();
      t = { blockedOn: null, target: t, priority: n };
      for (var s = 0; s < $n.length && n !== 0 && n < $n[s].priority; s++);
      ($n.splice(s, 0, t), s === 0 && vd(t));
    }
  };
  function Yu(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function sl(t) {
    return !(
      !t ||
      (t.nodeType !== 1 &&
        t.nodeType !== 9 &&
        t.nodeType !== 11 &&
        (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function zh() {}
  function nx(t, n, s, a, f) {
    if (f) {
      if (typeof a == "function") {
        var y = a;
        a = function () {
          var ee = rl(N);
          y.call(ee);
        };
      }
      var N = Rh(n, a, t, 0, null, !1, !1, "", zh);
      return (
        (t._reactRootContainer = N),
        (t[xn] = N.current),
        Go(t.nodeType === 8 ? t.parentNode : t),
        vr(),
        N
      );
    }
    for (; (f = t.lastChild); ) t.removeChild(f);
    if (typeof a == "function") {
      var T = a;
      a = function () {
        var ee = rl(O);
        T.call(ee);
      };
    }
    var O = Vu(t, 0, !1, null, null, !1, !1, "", zh);
    return (
      (t._reactRootContainer = O),
      (t[xn] = O.current),
      Go(t.nodeType === 8 ? t.parentNode : t),
      vr(function () {
        nl(n, O, s, a);
      }),
      O
    );
  }
  function il(t, n, s, a, f) {
    var y = s._reactRootContainer;
    if (y) {
      var N = y;
      if (typeof f == "function") {
        var T = f;
        f = function () {
          var O = rl(N);
          T.call(O);
        };
      }
      nl(n, N, t, f);
    } else N = nx(s, n, t, f, a);
    return rl(N);
  }
  ((pd = function (t) {
    switch (t.tag) {
      case 3:
        var n = t.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var s = sn(n.pendingLanes);
          s !== 0 &&
            (ga(n, s | 1),
            jt(n, Ge()),
            (Ae & 6) === 0 && ((so = Ge() + 500), Vn()));
        }
        break;
      case 13:
        (vr(function () {
          var a = En(t, 1);
          if (a !== null) {
            var f = St();
            Jt(a, t, 1, f);
          }
        }),
          Wu(t, 1));
    }
  }),
    (ya = function (t) {
      if (t.tag === 13) {
        var n = En(t, 134217728);
        if (n !== null) {
          var s = St();
          Jt(n, t, 134217728, s);
        }
        Wu(t, 134217728);
      }
    }),
    (md = function (t) {
      if (t.tag === 13) {
        var n = Qn(t),
          s = En(t, n);
        if (s !== null) {
          var a = St();
          Jt(s, t, n, a);
        }
        Wu(t, n);
      }
    }),
    (gd = function () {
      return Oe;
    }),
    (yd = function (t, n) {
      var s = Oe;
      try {
        return ((Oe = t), n());
      } finally {
        Oe = s;
      }
    }),
    (_o = function (t, n, s) {
      switch (n) {
        case "input":
          if ((Ce(t, s), (n = s.name), s.type === "radio" && n != null)) {
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
                var f = ki(a);
                if (!f) throw Error(o(90));
                (pe(a), Ce(a, f));
              }
            }
          }
          break;
        case "textarea":
          Ie(t, s);
          break;
        case "select":
          ((n = s.value), n != null && it(t, !!s.multiple, n, !1));
      }
    }),
    (Gs = $u),
    (qs = vr));
  var rx = { usingClientEntryPoint: !1, Events: [Zo, Yr, ki, Ks, Qs, $u] },
    hs = {
      findFiberByHostInstance: dr,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    ox = {
      bundleType: hs.bundleType,
      version: hs.version,
      rendererPackageName: hs.rendererPackageName,
      rendererConfig: hs.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: _.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (t) {
        return ((t = Zs(t)), t === null ? null : t.stateNode);
      },
      findFiberByHostInstance: hs.findFiberByHostInstance || tx,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ll = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ll.isDisabled && ll.supportsFiber)
      try {
        ((ur = ll.inject(ox)), (Ot = ll));
      } catch {}
  }
  return (
    (_t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rx),
    (_t.createPortal = function (t, n) {
      var s =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Yu(n)) throw Error(o(200));
      return ex(t, n, null, s);
    }),
    (_t.createRoot = function (t, n) {
      if (!Yu(t)) throw Error(o(299));
      var s = !1,
        a = "",
        f = Lh;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (s = !0),
          n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (f = n.onRecoverableError)),
        (n = Vu(t, 1, !1, null, null, s, !1, a, f)),
        (t[xn] = n.current),
        Go(t.nodeType === 8 ? t.parentNode : t),
        new Uu(n)
      );
    }),
    (_t.findDOMNode = function (t) {
      if (t == null) return null;
      if (t.nodeType === 1) return t;
      var n = t._reactInternals;
      if (n === void 0)
        throw typeof t.render == "function"
          ? Error(o(188))
          : ((t = Object.keys(t).join(",")), Error(o(268, t)));
      return ((t = Zs(n)), (t = t === null ? null : t.stateNode), t);
    }),
    (_t.flushSync = function (t) {
      return vr(t);
    }),
    (_t.hydrate = function (t, n, s) {
      if (!sl(n)) throw Error(o(200));
      return il(null, t, n, !0, s);
    }),
    (_t.hydrateRoot = function (t, n, s) {
      if (!Yu(t)) throw Error(o(405));
      var a = (s != null && s.hydratedSources) || null,
        f = !1,
        y = "",
        N = Lh;
      if (
        (s != null &&
          (s.unstable_strictMode === !0 && (f = !0),
          s.identifierPrefix !== void 0 && (y = s.identifierPrefix),
          s.onRecoverableError !== void 0 && (N = s.onRecoverableError)),
        (n = Rh(n, null, t, 1, s ?? null, f, !1, y, N)),
        (t[xn] = n.current),
        Go(t),
        a)
      )
        for (t = 0; t < a.length; t++)
          ((s = a[t]),
            (f = s._getVersion),
            (f = f(s._source)),
            n.mutableSourceEagerHydrationData == null
              ? (n.mutableSourceEagerHydrationData = [s, f])
              : n.mutableSourceEagerHydrationData.push(s, f));
      return new ol(n);
    }),
    (_t.render = function (t, n, s) {
      if (!sl(n)) throw Error(o(200));
      return il(null, t, n, !1, s);
    }),
    (_t.unmountComponentAtNode = function (t) {
      if (!sl(t)) throw Error(o(40));
      return t._reactRootContainer
        ? (vr(function () {
            il(null, null, t, !1, function () {
              ((t._reactRootContainer = null), (t[xn] = null));
            });
          }),
          !0)
        : !1;
    }),
    (_t.unstable_batchedUpdates = $u),
    (_t.unstable_renderSubtreeIntoContainer = function (t, n, s, a) {
      if (!sl(s)) throw Error(o(200));
      if (t == null || t._reactInternals === void 0) throw Error(o(38));
      return il(t, n, s, !1, a);
    }),
    (_t.version = "18.3.1-next-f1338f8080-20240426"),
    _t
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
  return (e(), (Qu.exports = hx()), Qu.exports);
}
var Wh;
function px() {
  if (Wh) return al;
  Wh = 1;
  var e = mm();
  return ((al.createRoot = e.createRoot), (al.hydrateRoot = e.hydrateRoot), al);
}
var mx = px();
const gx = $c(mx);
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
function yx(e = {}) {
  function r(i, l) {
    let { pathname: u, search: c, hash: d } = i.location;
    return yc(
      "",
      { pathname: u, search: c, hash: d },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default"
    );
  }
  function o(i, l) {
    return typeof l == "string" ? l : Cs(l);
  }
  return vx(r, o, null, e);
}
function Ye(e, r) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(r);
}
function Yt(e, r) {
  if (!e) {
    typeof console < "u" && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function xx() {
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
    ...(typeof r == "string" ? ko(r) : r),
    state: o,
    key: (r && r.key) || i || xx(),
  };
}
function Cs({ pathname: e = "/", search: r = "", hash: o = "" }) {
  return (
    r && r !== "?" && (e += r.charAt(0) === "?" ? r : "?" + r),
    o && o !== "#" && (e += o.charAt(0) === "#" ? o : "#" + o),
    e
  );
}
function ko(e) {
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
function vx(e, r, o, i = {}) {
  let { window: l = document.defaultView, v5Compat: u = !1 } = i,
    c = l.history,
    d = "POP",
    p = null,
    m = v();
  m == null && ((m = 0), c.replaceState({ ...c.state, idx: m }, ""));
  function v() {
    return (c.state || { idx: null }).idx;
  }
  function g() {
    d = "POP";
    let C = v(),
      b = C == null ? null : C - m;
    ((m = C), p && p({ action: d, location: j.location, delta: b }));
  }
  function x(C, b) {
    d = "PUSH";
    let I = yc(j.location, C, b);
    m = v() + 1;
    let k = Yh(I, m),
      _ = j.createHref(I);
    try {
      c.pushState(k, "", _);
    } catch (D) {
      if (D instanceof DOMException && D.name === "DataCloneError") throw D;
      l.location.assign(_);
    }
    u && p && p({ action: d, location: j.location, delta: 1 });
  }
  function S(C, b) {
    d = "REPLACE";
    let I = yc(j.location, C, b);
    m = v();
    let k = Yh(I, m),
      _ = j.createHref(I);
    (c.replaceState(k, "", _),
      u && p && p({ action: d, location: j.location, delta: 0 }));
  }
  function w(C) {
    return wx(C);
  }
  let j = {
    get action() {
      return d;
    },
    get location() {
      return e(l, c);
    },
    listen(C) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(Uh, g),
        (p = C),
        () => {
          (l.removeEventListener(Uh, g), (p = null));
        }
      );
    },
    createHref(C) {
      return r(l, C);
    },
    createURL: w,
    encodeLocation(C) {
      let b = w(C);
      return { pathname: b.pathname, search: b.search, hash: b.hash };
    },
    push: x,
    replace: S,
    go(C) {
      return c.go(C);
    },
  };
  return j;
}
function wx(e, r = !1) {
  let o = "http://localhost";
  (typeof window < "u" &&
    (o =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    Ye(o, "No window.location.(origin|href) available to create URL"));
  let i = typeof e == "string" ? e : Cs(e);
  return (
    (i = i.replace(/ $/, "%20")),
    !r && i.startsWith("//") && (i = o + i),
    new URL(i, o)
  );
}
function gm(e, r, o = "/") {
  return Sx(e, r, o, !1);
}
function Sx(e, r, o, i) {
  let l = typeof r == "string" ? ko(r) : r,
    u = In(l.pathname || "/", o);
  if (u == null) return null;
  let c = ym(e);
  Ex(c);
  let d = null;
  for (let p = 0; d == null && p < c.length; ++p) {
    let m = Tx(u);
    d = Px(c[p], m, i);
  }
  return d;
}
function ym(e, r = [], o = [], i = "", l = !1) {
  let u = (c, d, p = l, m) => {
    let v = {
      relativePath: m === void 0 ? c.path || "" : m,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: d,
      route: c,
    };
    if (v.relativePath.startsWith("/")) {
      if (!v.relativePath.startsWith(i) && p) return;
      (Ye(
        v.relativePath.startsWith(i),
        `Absolute route path "${v.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (v.relativePath = v.relativePath.slice(i.length)));
    }
    let g = _n([i, v.relativePath]),
      x = o.concat(v);
    (c.children &&
      c.children.length > 0 &&
      (Ye(
        c.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
      ),
      ym(c.children, r, x, g, p)),
      !(c.path == null && !c.index) &&
        r.push({ path: g, score: Ix(g, c.index), routesMeta: x }));
  };
  return (
    e.forEach((c, d) => {
      var p;
      if (c.path === "" || !((p = c.path) != null && p.includes("?"))) u(c, d);
      else for (let m of xm(c.path)) u(c, d, !0, m);
    }),
    r
  );
}
function xm(e) {
  let r = e.split("/");
  if (r.length === 0) return [];
  let [o, ...i] = r,
    l = o.endsWith("?"),
    u = o.replace(/\?$/, "");
  if (i.length === 0) return l ? [u, ""] : [u];
  let c = xm(i.join("/")),
    d = [];
  return (
    d.push(...c.map((p) => (p === "" ? u : [u, p].join("/")))),
    l && d.push(...c),
    d.map((p) => (e.startsWith("/") && p === "" ? "/" : p))
  );
}
function Ex(e) {
  e.sort((r, o) =>
    r.score !== o.score
      ? o.score - r.score
      : Mx(
          r.routesMeta.map((i) => i.childrenIndex),
          o.routesMeta.map((i) => i.childrenIndex)
        )
  );
}
var kx = /^:[\w-]+$/,
  Nx = 3,
  Cx = 2,
  bx = 1,
  jx = 10,
  _x = -2,
  Xh = (e) => e === "*";
function Ix(e, r) {
  let o = e.split("/"),
    i = o.length;
  return (
    o.some(Xh) && (i += _x),
    r && (i += Cx),
    o
      .filter((l) => !Xh(l))
      .reduce((l, u) => l + (kx.test(u) ? Nx : u === "" ? bx : jx), i)
  );
}
function Mx(e, r) {
  return e.length === r.length && e.slice(0, -1).every((i, l) => i === r[l])
    ? e[e.length - 1] - r[r.length - 1]
    : 0;
}
function Px(e, r, o = !1) {
  let { routesMeta: i } = e,
    l = {},
    u = "/",
    c = [];
  for (let d = 0; d < i.length; ++d) {
    let p = i[d],
      m = d === i.length - 1,
      v = u === "/" ? r : r.slice(u.length) || "/",
      g = Ml(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
        v
      ),
      x = p.route;
    if (
      (!g &&
        m &&
        o &&
        !i[i.length - 1].route.index &&
        (g = Ml(
          { path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 },
          v
        )),
      !g)
    )
      return null;
    (Object.assign(l, g.params),
      c.push({
        params: l,
        pathname: _n([u, g.pathname]),
        pathnameBase: $x(_n([u, g.pathnameBase])),
        route: x,
      }),
      g.pathnameBase !== "/" && (u = _n([u, g.pathnameBase])));
  }
  return c;
}
function Ml(e, r) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [o, i] = Rx(e.path, e.caseSensitive, e.end),
    l = r.match(o);
  if (!l) return null;
  let u = l[0],
    c = u.replace(/(.)\/+$/, "$1"),
    d = l.slice(1);
  return {
    params: i.reduce((m, { paramName: v, isOptional: g }, x) => {
      if (v === "*") {
        let w = d[x] || "";
        c = u.slice(0, u.length - w.length).replace(/(.)\/+$/, "$1");
      }
      const S = d[x];
      return (
        g && !S ? (m[v] = void 0) : (m[v] = (S || "").replace(/%2F/g, "/")),
        m
      );
    }, {}),
    pathname: u,
    pathnameBase: c,
    pattern: e,
  };
}
function Rx(e, r = !1, o = !0) {
  Yt(
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
          (c, d, p) => (
            i.push({ paramName: d, isOptional: p != null }),
            p ? "/?([^\\/]+)?" : "/([^\\/]+)"
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
function Tx(e) {
  try {
    return e
      .split("/")
      .map((r) => decodeURIComponent(r).replace(/\//g, "%2F"))
      .join("/");
  } catch (r) {
    return (
      Yt(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`
      ),
      e
    );
  }
}
function In(e, r) {
  if (r === "/") return e;
  if (!e.toLowerCase().startsWith(r.toLowerCase())) return null;
  let o = r.endsWith("/") ? r.length - 1 : r.length,
    i = e.charAt(o);
  return i && i !== "/" ? null : e.slice(o) || "/";
}
var vm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Lx = (e) => vm.test(e);
function zx(e, r = "/") {
  let {
      pathname: o,
      search: i = "",
      hash: l = "",
    } = typeof e == "string" ? ko(e) : e,
    u;
  if (o)
    if (Lx(o)) u = o;
    else {
      if (o.includes("//")) {
        let c = o;
        ((o = o.replace(/\/\/+/g, "/")),
          Yt(
            !1,
            `Pathnames cannot have embedded double slashes - normalizing ${c} -> ${o}`
          ));
      }
      o.startsWith("/") ? (u = Kh(o.substring(1), "/")) : (u = Kh(o, r));
    }
  else u = r;
  return { pathname: u, search: Dx(i), hash: Ox(l) };
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
function Ju(e, r, o, i) {
  return `Cannot include a '${e}' character in a manually specified \`to.${r}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Ax(e) {
  return e.filter(
    (r, o) => o === 0 || (r.route.path && r.route.path.length > 0)
  );
}
function Dc(e) {
  let r = Ax(e);
  return r.map((o, i) => (i === r.length - 1 ? o.pathname : o.pathnameBase));
}
function Oc(e, r, o, i = !1) {
  let l;
  typeof e == "string"
    ? (l = ko(e))
    : ((l = { ...e }),
      Ye(
        !l.pathname || !l.pathname.includes("?"),
        Ju("?", "pathname", "search", l)
      ),
      Ye(
        !l.pathname || !l.pathname.includes("#"),
        Ju("#", "pathname", "hash", l)
      ),
      Ye(!l.search || !l.search.includes("#"), Ju("#", "search", "hash", l)));
  let u = e === "" || l.pathname === "",
    c = u ? "/" : l.pathname,
    d;
  if (c == null) d = o;
  else {
    let g = r.length - 1;
    if (!i && c.startsWith("..")) {
      let x = c.split("/");
      for (; x[0] === ".."; ) (x.shift(), (g -= 1));
      l.pathname = x.join("/");
    }
    d = g >= 0 ? r[g] : "/";
  }
  let p = zx(l, d),
    m = c && c !== "/" && c.endsWith("/"),
    v = (u || c === ".") && o.endsWith("/");
  return (!p.pathname.endsWith("/") && (m || v) && (p.pathname += "/"), p);
}
var _n = (e) => e.join("/").replace(/\/\/+/g, "/"),
  $x = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Dx = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Ox = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  Fx = class {
    constructor(e, r, o, i = !1) {
      ((this.status = e),
        (this.statusText = r || ""),
        (this.internal = i),
        o instanceof Error
          ? ((this.data = o.toString()), (this.error = o))
          : (this.data = o));
    }
  };
function Hx(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
function Bx(e) {
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
  if (typeof o != "string" || !vm.test(o))
    return { absoluteURL: void 0, isExternal: !1, to: o };
  let i = o,
    l = !1;
  if (wm)
    try {
      let u = new URL(window.location.href),
        c = o.startsWith("//") ? new URL(u.protocol + o) : new URL(o),
        d = In(c.pathname, r);
      c.origin === u.origin && d != null
        ? (o = d + c.search + c.hash)
        : (l = !0);
    } catch {
      Yt(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: i, isExternal: l, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Em = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Em);
var Vx = ["GET", ...Em];
new Set(Vx);
var No = E.createContext(null);
No.displayName = "DataRouter";
var Vl = E.createContext(null);
Vl.displayName = "DataRouterState";
var Wx = E.createContext(!1),
  km = E.createContext({ isTransitioning: !1 });
km.displayName = "ViewTransition";
var Ux = E.createContext(new Map());
Ux.displayName = "Fetchers";
var Yx = E.createContext(null);
Yx.displayName = "Await";
var Dt = E.createContext(null);
Dt.displayName = "Navigation";
var Os = E.createContext(null);
Os.displayName = "Location";
var pn = E.createContext({ outlet: null, matches: [], isDataRoute: !1 });
pn.displayName = "Route";
var Fc = E.createContext(null);
Fc.displayName = "RouteError";
var Nm = "REACT_ROUTER_ERROR",
  Xx = "REDIRECT",
  Kx = "ROUTE_ERROR_RESPONSE";
function Qx(e) {
  if (e.startsWith(`${Nm}:${Xx}:{`))
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
function Gx(e) {
  if (e.startsWith(`${Nm}:${Kx}:{`))
    try {
      let r = JSON.parse(e.slice(40));
      if (
        typeof r == "object" &&
        r &&
        typeof r.status == "number" &&
        typeof r.statusText == "string"
      )
        return new Fx(r.status, r.statusText, r.data);
    } catch {}
}
function qx(e, { relative: r } = {}) {
  Ye(
    Co(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: o, navigator: i } = E.useContext(Dt),
    { hash: l, pathname: u, search: c } = Fs(e, { relative: r }),
    d = u;
  return (
    o !== "/" && (d = u === "/" ? o : _n([o, u])),
    i.createHref({ pathname: d, search: c, hash: l })
  );
}
function Co() {
  return E.useContext(Os) != null;
}
function rr() {
  return (
    Ye(
      Co(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    E.useContext(Os).location
  );
}
var Cm =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function bm(e) {
  E.useContext(Dt).static || E.useLayoutEffect(e);
}
function jm() {
  let { isDataRoute: e } = E.useContext(pn);
  return e ? cv() : Jx();
}
function Jx() {
  Ye(
    Co(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = E.useContext(No),
    { basename: r, navigator: o } = E.useContext(Dt),
    { matches: i } = E.useContext(pn),
    { pathname: l } = rr(),
    u = JSON.stringify(Dc(i)),
    c = E.useRef(!1);
  return (
    bm(() => {
      c.current = !0;
    }),
    E.useCallback(
      (p, m = {}) => {
        if ((Yt(c.current, Cm), !c.current)) return;
        if (typeof p == "number") {
          o.go(p);
          return;
        }
        let v = Oc(p, JSON.parse(u), l, m.relative === "path");
        (e == null &&
          r !== "/" &&
          (v.pathname = v.pathname === "/" ? r : _n([r, v.pathname])),
          (m.replace ? o.replace : o.push)(v, m.state, m));
      },
      [r, o, u, l, e]
    )
  );
}
E.createContext(null);
function Fs(e, { relative: r } = {}) {
  let { matches: o } = E.useContext(pn),
    { pathname: i } = rr(),
    l = JSON.stringify(Dc(o));
  return E.useMemo(() => Oc(e, JSON.parse(l), i, r === "path"), [e, l, i, r]);
}
function Zx(e, r) {
  return _m(e, r);
}
function _m(e, r, o, i, l) {
  var I;
  Ye(
    Co(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: u } = E.useContext(Dt),
    { matches: c } = E.useContext(pn),
    d = c[c.length - 1],
    p = d ? d.params : {},
    m = d ? d.pathname : "/",
    v = d ? d.pathnameBase : "/",
    g = d && d.route;
  {
    let k = (g && g.path) || "";
    Mm(
      m,
      !g || k.endsWith("*") || k.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${k}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${k}"> to <Route path="${k === "/" ? "*" : `${k}/*`}">.`
    );
  }
  let x = rr(),
    S;
  if (r) {
    let k = typeof r == "string" ? ko(r) : r;
    (Ye(
      v === "/" || ((I = k.pathname) == null ? void 0 : I.startsWith(v)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${k.pathname}" was given in the \`location\` prop.`
    ),
      (S = k));
  } else S = x;
  let w = S.pathname || "/",
    j = w;
  if (v !== "/") {
    let k = v.replace(/^\//, "").split("/");
    j = "/" + w.replace(/^\//, "").split("/").slice(k.length).join("/");
  }
  let C = gm(e, { pathname: j });
  (Yt(
    g || C != null,
    `No routes matched location "${S.pathname}${S.search}${S.hash}" `
  ),
    Yt(
      C == null ||
        C[C.length - 1].route.element !== void 0 ||
        C[C.length - 1].route.Component !== void 0 ||
        C[C.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let b = ov(
    C &&
      C.map((k) =>
        Object.assign({}, k, {
          params: Object.assign({}, p, k.params),
          pathname: _n([
            v,
            u.encodeLocation
              ? u.encodeLocation(
                  k.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
                ).pathname
              : k.pathname,
          ]),
          pathnameBase:
            k.pathnameBase === "/"
              ? v
              : _n([
                  v,
                  u.encodeLocation
                    ? u.encodeLocation(
                        k.pathnameBase
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23")
                      ).pathname
                    : k.pathnameBase,
                ]),
        })
      ),
    c,
    o,
    i,
    l
  );
  return r && b
    ? E.createElement(
        Os.Provider,
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
        b
      )
    : b;
}
function ev() {
  let e = uv(),
    r = Hx(e)
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
    (c = E.createElement(
      E.Fragment,
      null,
      E.createElement("p", null, "💿 Hey developer 👋"),
      E.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        E.createElement("code", { style: u }, "ErrorBoundary"),
        " or",
        " ",
        E.createElement("code", { style: u }, "errorElement"),
        " prop on your route."
      )
    )),
    E.createElement(
      E.Fragment,
      null,
      E.createElement("h2", null, "Unexpected Application Error!"),
      E.createElement("h3", { style: { fontStyle: "italic" } }, r),
      o ? E.createElement("pre", { style: l }, o) : null,
      c
    )
  );
}
var tv = E.createElement(ev, null),
  Im = class extends E.Component {
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
        const o = Gx(e.digest);
        o && (e = o);
      }
      let r =
        e !== void 0
          ? E.createElement(
              pn.Provider,
              { value: this.props.routeContext },
              E.createElement(Fc.Provider, {
                value: e,
                children: this.props.component,
              })
            )
          : this.props.children;
      return this.context ? E.createElement(nv, { error: e }, r) : r;
    }
  };
Im.contextType = Wx;
var Zu = new WeakMap();
function nv({ children: e, error: r }) {
  let { basename: o } = E.useContext(Dt);
  if (
    typeof r == "object" &&
    r &&
    "digest" in r &&
    typeof r.digest == "string"
  ) {
    let i = Qx(r.digest);
    if (i) {
      let l = Zu.get(r);
      if (l) throw l;
      let u = Sm(i.location, o);
      if (wm && !Zu.get(r))
        if (u.isExternal || i.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(u.to, {
              replace: i.replace,
            })
          );
          throw (Zu.set(r, c), c);
        }
      return E.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${u.absoluteURL || u.to}`,
      });
    }
  }
  return e;
}
function rv({ routeContext: e, match: r, children: o }) {
  let i = E.useContext(No);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = r.route.id),
    E.createElement(pn.Provider, { value: e }, o)
  );
}
function ov(e, r = [], o = null, i = null, l = null) {
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
    let v = u.findIndex(
      (g) => g.route.id && (c == null ? void 0 : c[g.route.id]) !== void 0
    );
    (Ye(
      v >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(c).join(",")}`
    ),
      (u = u.slice(0, Math.min(u.length, v + 1))));
  }
  let d = !1,
    p = -1;
  if (o)
    for (let v = 0; v < u.length; v++) {
      let g = u[v];
      if (
        ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (p = v),
        g.route.id)
      ) {
        let { loaderData: x, errors: S } = o,
          w =
            g.route.loader &&
            !x.hasOwnProperty(g.route.id) &&
            (!S || S[g.route.id] === void 0);
        if (g.route.lazy || w) {
          ((d = !0), p >= 0 ? (u = u.slice(0, p + 1)) : (u = [u[0]]));
          break;
        }
      }
    }
  let m =
    o && i
      ? (v, g) => {
          var x, S;
          i(v, {
            location: o.location,
            params:
              ((S = (x = o.matches) == null ? void 0 : x[0]) == null
                ? void 0
                : S.params) ?? {},
            unstable_pattern: Bx(o.matches),
            errorInfo: g,
          });
        }
      : void 0;
  return u.reduceRight((v, g, x) => {
    let S,
      w = !1,
      j = null,
      C = null;
    o &&
      ((S = c && g.route.id ? c[g.route.id] : void 0),
      (j = g.route.errorElement || tv),
      d &&
        (p < 0 && x === 0
          ? (Mm(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (w = !0),
            (C = null))
          : p === x &&
            ((w = !0), (C = g.route.hydrateFallbackElement || null))));
    let b = r.concat(u.slice(0, x + 1)),
      I = () => {
        let k;
        return (
          S
            ? (k = j)
            : w
              ? (k = C)
              : g.route.Component
                ? (k = E.createElement(g.route.Component, null))
                : g.route.element
                  ? (k = g.route.element)
                  : (k = v),
          E.createElement(rv, {
            match: g,
            routeContext: { outlet: v, matches: b, isDataRoute: o != null },
            children: k,
          })
        );
      };
    return o && (g.route.ErrorBoundary || g.route.errorElement || x === 0)
      ? E.createElement(Im, {
          location: o.location,
          revalidation: o.revalidation,
          component: j,
          error: S,
          children: I(),
          routeContext: { outlet: null, matches: b, isDataRoute: !0 },
          onError: m,
        })
      : I();
  }, null);
}
function Hc(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function sv(e) {
  let r = E.useContext(No);
  return (Ye(r, Hc(e)), r);
}
function iv(e) {
  let r = E.useContext(Vl);
  return (Ye(r, Hc(e)), r);
}
function lv(e) {
  let r = E.useContext(pn);
  return (Ye(r, Hc(e)), r);
}
function Bc(e) {
  let r = lv(e),
    o = r.matches[r.matches.length - 1];
  return (
    Ye(
      o.route.id,
      `${e} can only be used on routes that contain a unique "id"`
    ),
    o.route.id
  );
}
function av() {
  return Bc("useRouteId");
}
function uv() {
  var i;
  let e = E.useContext(Fc),
    r = iv("useRouteError"),
    o = Bc("useRouteError");
  return e !== void 0 ? e : (i = r.errors) == null ? void 0 : i[o];
}
function cv() {
  let { router: e } = sv("useNavigate"),
    r = Bc("useNavigate"),
    o = E.useRef(!1);
  return (
    bm(() => {
      o.current = !0;
    }),
    E.useCallback(
      async (l, u = {}) => {
        (Yt(o.current, Cm),
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
  !r && !Qh[e] && ((Qh[e] = !0), Yt(!1, o));
}
E.memo(dv);
function dv({ routes: e, future: r, state: o, onError: i }) {
  return _m(e, void 0, o, i, r);
}
function fv({ to: e, replace: r, state: o, relative: i }) {
  Ye(
    Co(),
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let { static: l } = E.useContext(Dt);
  Yt(
    !l,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  );
  let { matches: u } = E.useContext(pn),
    { pathname: c } = rr(),
    d = jm(),
    p = Oc(e, Dc(u), c, i === "path"),
    m = JSON.stringify(p);
  return (
    E.useEffect(() => {
      d(JSON.parse(m), { replace: r, state: o, relative: i });
    }, [d, m, i, r, o]),
    null
  );
}
function xc(e) {
  Ye(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function hv({
  basename: e = "/",
  children: r = null,
  location: o,
  navigationType: i = "POP",
  navigator: l,
  static: u = !1,
  unstable_useTransitions: c,
}) {
  Ye(
    !Co(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = e.replace(/^\/*/, "/"),
    p = E.useMemo(
      () => ({
        basename: d,
        navigator: l,
        static: u,
        unstable_useTransitions: c,
        future: {},
      }),
      [d, l, u, c]
    );
  typeof o == "string" && (o = ko(o));
  let {
      pathname: m = "/",
      search: v = "",
      hash: g = "",
      state: x = null,
      key: S = "default",
    } = o,
    w = E.useMemo(() => {
      let j = In(m, d);
      return j == null
        ? null
        : {
            location: { pathname: j, search: v, hash: g, state: x, key: S },
            navigationType: i,
          };
    }, [d, m, v, g, x, S, i]);
  return (
    Yt(
      w != null,
      `<Router basename="${d}"> is not able to match the URL "${m}${v}${g}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    w == null
      ? null
      : E.createElement(
          Dt.Provider,
          { value: p },
          E.createElement(Os.Provider, { children: r, value: w })
        )
  );
}
function pv({ children: e, location: r }) {
  return Zx(vc(e), r);
}
function vc(e, r = []) {
  let o = [];
  return (
    E.Children.forEach(e, (i, l) => {
      if (!E.isValidElement(i)) return;
      let u = [...r, l];
      if (i.type === E.Fragment) {
        o.push.apply(o, vc(i.props.children, u));
        return;
      }
      (Ye(
        i.type === xc,
        `[${typeof i.type == "string" ? i.type : i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Ye(
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
var Sl = "get",
  El = "application/x-www-form-urlencoded";
function Wl(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function mv(e) {
  return Wl(e) && e.tagName.toLowerCase() === "button";
}
function gv(e) {
  return Wl(e) && e.tagName.toLowerCase() === "form";
}
function yv(e) {
  return Wl(e) && e.tagName.toLowerCase() === "input";
}
function xv(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function vv(e, r) {
  return e.button === 0 && (!r || r === "_self") && !xv(e);
}
var ul = null;
function wv() {
  if (ul === null)
    try {
      (new FormData(document.createElement("form"), 0), (ul = !1));
    } catch {
      ul = !0;
    }
  return ul;
}
var Sv = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function ec(e) {
  return e != null && !Sv.has(e)
    ? (Yt(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${El}"`
      ),
      null)
    : e;
}
function Ev(e, r) {
  let o, i, l, u, c;
  if (gv(e)) {
    let d = e.getAttribute("action");
    ((i = d ? In(d, r) : null),
      (o = e.getAttribute("method") || Sl),
      (l = ec(e.getAttribute("enctype")) || El),
      (u = new FormData(e)));
  } else if (mv(e) || (yv(e) && (e.type === "submit" || e.type === "image"))) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (
      ((i = p ? In(p, r) : null),
      (o = e.getAttribute("formmethod") || d.getAttribute("method") || Sl),
      (l =
        ec(e.getAttribute("formenctype")) ||
        ec(d.getAttribute("enctype")) ||
        El),
      (u = new FormData(d, e)),
      !wv())
    ) {
      let { name: m, type: v, value: g } = e;
      if (v === "image") {
        let x = m ? `${m}.` : "";
        (u.append(`${x}x`, "0"), u.append(`${x}y`, "0"));
      } else m && u.append(m, g);
    }
  } else {
    if (Wl(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = Sl), (i = null), (l = El), (c = e));
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
function kv(e, r, o) {
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
      : r && In(i.pathname, r) === "/"
        ? (i.pathname = `${r.replace(/\/$/, "")}/_root.${o}`)
        : (i.pathname = `${i.pathname.replace(/\/$/, "")}.${o}`),
    i
  );
}
async function Nv(e, r) {
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
function Cv(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function bv(e, r, o) {
  let i = await Promise.all(
    e.map(async (l) => {
      let u = r.routes[l.route.id];
      if (u) {
        let c = await Nv(u, o);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return Mv(
    i
      .flat(1)
      .filter(Cv)
      .filter((l) => l.rel === "stylesheet" || l.rel === "preload")
      .map((l) =>
        l.rel === "stylesheet"
          ? { ...l, rel: "prefetch", as: "style" }
          : { ...l, rel: "prefetch" }
      )
  );
}
function Gh(e, r, o, i, l, u) {
  let c = (p, m) => (o[m] ? p.route.id !== o[m].route.id : !0),
    d = (p, m) => {
      var v;
      return (
        o[m].pathname !== p.pathname ||
        (((v = o[m].route.path) == null ? void 0 : v.endsWith("*")) &&
          o[m].params["*"] !== p.params["*"])
      );
    };
  return u === "assets"
    ? r.filter((p, m) => c(p, m) || d(p, m))
    : u === "data"
      ? r.filter((p, m) => {
          var g;
          let v = i.routes[p.route.id];
          if (!v || !v.hasLoader) return !1;
          if (c(p, m) || d(p, m)) return !0;
          if (p.route.shouldRevalidate) {
            let x = p.route.shouldRevalidate({
              currentUrl: new URL(
                l.pathname + l.search + l.hash,
                window.origin
              ),
              currentParams: ((g = o[0]) == null ? void 0 : g.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof x == "boolean") return x;
          }
          return !0;
        })
      : [];
}
function jv(e, r, { includeHydrateFallback: o } = {}) {
  return _v(
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
function _v(e) {
  return [...new Set(e)];
}
function Iv(e) {
  let r = {},
    o = Object.keys(e).sort();
  for (let i of o) r[i] = e[i];
  return r;
}
function Mv(e, r) {
  let o = new Set();
  return (
    new Set(r),
    e.reduce((i, l) => {
      let u = JSON.stringify(Iv(l));
      return (o.has(u) || (o.add(u), i.push({ key: u, link: l })), i);
    }, [])
  );
}
function Pm() {
  let e = E.useContext(No);
  return (
    Vc(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    e
  );
}
function Pv() {
  let e = E.useContext(Vl);
  return (
    Vc(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    e
  );
}
var Wc = E.createContext(void 0);
Wc.displayName = "FrameworkContext";
function Rm() {
  let e = E.useContext(Wc);
  return (
    Vc(e, "You must render this element inside a <HydratedRouter> element"),
    e
  );
}
function Rv(e, r) {
  let o = E.useContext(Wc),
    [i, l] = E.useState(!1),
    [u, c] = E.useState(!1),
    {
      onFocus: d,
      onBlur: p,
      onMouseEnter: m,
      onMouseLeave: v,
      onTouchStart: g,
    } = r,
    x = E.useRef(null);
  (E.useEffect(() => {
    if ((e === "render" && c(!0), e === "viewport")) {
      let j = (b) => {
          b.forEach((I) => {
            c(I.isIntersecting);
          });
        },
        C = new IntersectionObserver(j, { threshold: 0.5 });
      return (
        x.current && C.observe(x.current),
        () => {
          C.disconnect();
        }
      );
    }
  }, [e]),
    E.useEffect(() => {
      if (i) {
        let j = setTimeout(() => {
          c(!0);
        }, 100);
        return () => {
          clearTimeout(j);
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
      ? [u, x, {}]
      : [
          u,
          x,
          {
            onFocus: ms(d, S),
            onBlur: ms(p, w),
            onMouseEnter: ms(m, S),
            onMouseLeave: ms(v, w),
            onTouchStart: ms(g, S),
          },
        ]
    : [!1, x, {}];
}
function ms(e, r) {
  return (o) => {
    (e && e(o), o.defaultPrevented || r(o));
  };
}
function Tv({ page: e, ...r }) {
  let { router: o } = Pm(),
    i = E.useMemo(() => gm(o.routes, e, o.basename), [o.routes, e, o.basename]);
  return i ? E.createElement(zv, { page: e, matches: i, ...r }) : null;
}
function Lv(e) {
  let { manifest: r, routeModules: o } = Rm(),
    [i, l] = E.useState([]);
  return (
    E.useEffect(() => {
      let u = !1;
      return (
        bv(e, r, o).then((c) => {
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
function zv({ page: e, matches: r, ...o }) {
  let i = rr(),
    { manifest: l, routeModules: u } = Rm(),
    { basename: c } = Pm(),
    { loaderData: d, matches: p } = Pv(),
    m = E.useMemo(() => Gh(e, r, p, l, i, "data"), [e, r, p, l, i]),
    v = E.useMemo(() => Gh(e, r, p, l, i, "assets"), [e, r, p, l, i]),
    g = E.useMemo(() => {
      if (e === i.pathname + i.search + i.hash) return [];
      let w = new Set(),
        j = !1;
      if (
        (r.forEach((b) => {
          var k;
          let I = l.routes[b.route.id];
          !I ||
            !I.hasLoader ||
            ((!m.some((_) => _.route.id === b.route.id) &&
              b.route.id in d &&
              (k = u[b.route.id]) != null &&
              k.shouldRevalidate) ||
            I.hasClientLoader
              ? (j = !0)
              : w.add(b.route.id));
        }),
        w.size === 0)
      )
        return [];
      let C = kv(e, c, "data");
      return (
        j &&
          w.size > 0 &&
          C.searchParams.set(
            "_routes",
            r
              .filter((b) => w.has(b.route.id))
              .map((b) => b.route.id)
              .join(",")
          ),
        [C.pathname + C.search]
      );
    }, [c, d, i, l, m, r, e, u]),
    x = E.useMemo(() => jv(v, l), [v, l]),
    S = Lv(v);
  return E.createElement(
    E.Fragment,
    null,
    g.map((w) =>
      E.createElement("link", {
        key: w,
        rel: "prefetch",
        as: "fetch",
        href: w,
        ...o,
      })
    ),
    x.map((w) =>
      E.createElement("link", { key: w, rel: "modulepreload", href: w, ...o })
    ),
    S.map(({ key: w, link: j }) =>
      E.createElement("link", { key: w, nonce: o.nonce, ...j })
    )
  );
}
function Av(...e) {
  return (r) => {
    e.forEach((o) => {
      typeof o == "function" ? o(r) : o != null && (o.current = r);
    });
  };
}
var $v =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  $v && (window.__reactRouterVersion = "7.11.0");
} catch {}
function Dv({
  basename: e,
  children: r,
  unstable_useTransitions: o,
  window: i,
}) {
  let l = E.useRef();
  l.current == null && (l.current = yx({ window: i, v5Compat: !0 }));
  let u = l.current,
    [c, d] = E.useState({ action: u.action, location: u.location }),
    p = E.useCallback(
      (m) => {
        o === !1 ? d(m) : E.startTransition(() => d(m));
      },
      [o]
    );
  return (
    E.useLayoutEffect(() => u.listen(p), [u, p]),
    E.createElement(hv, {
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
  Lm = E.forwardRef(function (
    {
      onClick: r,
      discover: o = "render",
      prefetch: i = "none",
      relative: l,
      reloadDocument: u,
      replace: c,
      state: d,
      target: p,
      to: m,
      preventScrollReset: v,
      viewTransition: g,
      unstable_defaultShouldRevalidate: x,
      ...S
    },
    w
  ) {
    let { basename: j, unstable_useTransitions: C } = E.useContext(Dt),
      b = typeof m == "string" && Tm.test(m),
      I = Sm(m, j);
    m = I.to;
    let k = qx(m, { relative: l }),
      [_, D, z] = Rv(i, S),
      R = Bv(m, {
        replace: c,
        state: d,
        target: p,
        preventScrollReset: v,
        relative: l,
        viewTransition: g,
        unstable_defaultShouldRevalidate: x,
        unstable_useTransitions: C,
      });
    function H(ie) {
      (r && r(ie), ie.defaultPrevented || R(ie));
    }
    let V = E.createElement("a", {
      ...S,
      ...z,
      href: I.absoluteURL || k,
      onClick: I.isExternal || u ? r : H,
      ref: Av(w, D),
      target: p,
      "data-discover": !b && o === "render" ? "true" : void 0,
    });
    return _ && !b
      ? E.createElement(E.Fragment, null, V, E.createElement(Tv, { page: k }))
      : V;
  });
Lm.displayName = "Link";
var Ov = E.forwardRef(function (
  {
    "aria-current": r = "page",
    caseSensitive: o = !1,
    className: i = "",
    end: l = !1,
    style: u,
    to: c,
    viewTransition: d,
    children: p,
    ...m
  },
  v
) {
  let g = Fs(c, { relative: m.relative }),
    x = rr(),
    S = E.useContext(Vl),
    { navigator: w, basename: j } = E.useContext(Dt),
    C = S != null && Xv(g) && d === !0,
    b = w.encodeLocation ? w.encodeLocation(g).pathname : g.pathname,
    I = x.pathname,
    k =
      S && S.navigation && S.navigation.location
        ? S.navigation.location.pathname
        : null;
  (o ||
    ((I = I.toLowerCase()),
    (k = k ? k.toLowerCase() : null),
    (b = b.toLowerCase())),
    k && j && (k = In(k, j) || k));
  const _ = b !== "/" && b.endsWith("/") ? b.length - 1 : b.length;
  let D = I === b || (!l && I.startsWith(b) && I.charAt(_) === "/"),
    z =
      k != null &&
      (k === b || (!l && k.startsWith(b) && k.charAt(b.length) === "/")),
    R = { isActive: D, isPending: z, isTransitioning: C },
    H = D ? r : void 0,
    V;
  typeof i == "function"
    ? (V = i(R))
    : (V = [
        i,
        D ? "active" : null,
        z ? "pending" : null,
        C ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let ie = typeof u == "function" ? u(R) : u;
  return E.createElement(
    Lm,
    {
      ...m,
      "aria-current": H,
      className: V,
      ref: v,
      style: ie,
      to: c,
      viewTransition: d,
    },
    typeof p == "function" ? p(R) : p
  );
});
Ov.displayName = "NavLink";
var Fv = E.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: r,
      navigate: o,
      reloadDocument: i,
      replace: l,
      state: u,
      method: c = Sl,
      action: d,
      onSubmit: p,
      relative: m,
      preventScrollReset: v,
      viewTransition: g,
      unstable_defaultShouldRevalidate: x,
      ...S
    },
    w
  ) => {
    let { unstable_useTransitions: j } = E.useContext(Dt),
      C = Uv(),
      b = Yv(d, { relative: m }),
      I = c.toLowerCase() === "get" ? "get" : "post",
      k = typeof d == "string" && Tm.test(d),
      _ = (D) => {
        if ((p && p(D), D.defaultPrevented)) return;
        D.preventDefault();
        let z = D.nativeEvent.submitter,
          R = (z == null ? void 0 : z.getAttribute("formmethod")) || c,
          H = () =>
            C(z || D.currentTarget, {
              fetcherKey: r,
              method: R,
              navigate: o,
              replace: l,
              state: u,
              relative: m,
              preventScrollReset: v,
              viewTransition: g,
              unstable_defaultShouldRevalidate: x,
            });
        j && o !== !1 ? E.startTransition(() => H()) : H();
      };
    return E.createElement("form", {
      ref: w,
      method: I,
      action: b,
      onSubmit: i ? p : _,
      ...S,
      "data-discover": !k && e === "render" ? "true" : void 0,
    });
  }
);
Fv.displayName = "Form";
function Hv(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function zm(e) {
  let r = E.useContext(No);
  return (Ye(r, Hv(e)), r);
}
function Bv(
  e,
  {
    target: r,
    replace: o,
    state: i,
    preventScrollReset: l,
    relative: u,
    viewTransition: c,
    unstable_defaultShouldRevalidate: d,
    unstable_useTransitions: p,
  } = {}
) {
  let m = jm(),
    v = rr(),
    g = Fs(e, { relative: u });
  return E.useCallback(
    (x) => {
      if (vv(x, r)) {
        x.preventDefault();
        let S = o !== void 0 ? o : Cs(v) === Cs(g),
          w = () =>
            m(e, {
              replace: S,
              state: i,
              preventScrollReset: l,
              relative: u,
              viewTransition: c,
              unstable_defaultShouldRevalidate: d,
            });
        p ? E.startTransition(() => w()) : w();
      }
    },
    [v, m, g, o, i, r, e, l, u, c, d, p]
  );
}
var Vv = 0,
  Wv = () => `__${String(++Vv)}__`;
function Uv() {
  let { router: e } = zm("useSubmit"),
    { basename: r } = E.useContext(Dt),
    o = av(),
    i = e.fetch,
    l = e.navigate;
  return E.useCallback(
    async (u, c = {}) => {
      let { action: d, method: p, encType: m, formData: v, body: g } = Ev(u, r);
      if (c.navigate === !1) {
        let x = c.fetcherKey || Wv();
        await i(x, o, c.action || d, {
          unstable_defaultShouldRevalidate: c.unstable_defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: v,
          body: g,
          formMethod: c.method || p,
          formEncType: c.encType || m,
          flushSync: c.flushSync,
        });
      } else
        await l(c.action || d, {
          unstable_defaultShouldRevalidate: c.unstable_defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: v,
          body: g,
          formMethod: c.method || p,
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
function Yv(e, { relative: r } = {}) {
  let { basename: o } = E.useContext(Dt),
    i = E.useContext(pn);
  Ye(i, "useFormAction must be used inside a RouteContext");
  let [l] = i.matches.slice(-1),
    u = { ...Fs(e || ".", { relative: r }) },
    c = rr();
  if (e == null) {
    u.search = c.search;
    let d = new URLSearchParams(u.search),
      p = d.getAll("index");
    if (p.some((v) => v === "")) {
      (d.delete("index"),
        p.filter((g) => g).forEach((g) => d.append("index", g)));
      let v = d.toString();
      u.search = v ? `?${v}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      l.route.index &&
      (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"),
    o !== "/" && (u.pathname = u.pathname === "/" ? o : _n([o, u.pathname])),
    Cs(u)
  );
}
function Xv(e, { relative: r } = {}) {
  let o = E.useContext(km);
  Ye(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = zm("useViewTransitionState"),
    l = Fs(e, { relative: r });
  if (!o.isTransitioning) return !1;
  let u = In(o.currentLocation.pathname, i) || o.currentLocation.pathname,
    c = In(o.nextLocation.pathname, i) || o.nextLocation.pathname;
  return Ml(l.pathname, c) != null || Ml(l.pathname, u) != null;
}
mm();
const qh = (e) => {
    let r;
    const o = new Set(),
      i = (m, v) => {
        const g = typeof m == "function" ? m(r) : m;
        if (!Object.is(g, r)) {
          const x = r;
          ((r =
            (v ?? (typeof g != "object" || g === null))
              ? g
              : Object.assign({}, r, g)),
            o.forEach((S) => S(r, x)));
        }
      },
      l = () => r,
      d = {
        setState: i,
        getState: l,
        getInitialState: () => p,
        subscribe: (m) => (o.add(m), () => o.delete(m)),
      },
      p = (r = e(i, l, d));
    return d;
  },
  Kv = (e) => (e ? qh(e) : qh),
  Qv = (e) => e;
function Gv(e, r = Qv) {
  const o = uo.useSyncExternalStore(
    e.subscribe,
    uo.useCallback(() => r(e.getState()), [e, r]),
    uo.useCallback(() => r(e.getInitialState()), [e, r])
  );
  return (uo.useDebugValue(o), o);
}
const Jh = (e) => {
    const r = Kv(e),
      o = (i) => Gv(r, i);
    return (Object.assign(o, r), o);
  },
  Uc = (e) => (e ? Jh(e) : Jh),
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
            d =
              typeof c.error == "string"
                ? c.error
                : ((i = c.error) == null ? void 0 : i.message) ||
                  "プロジェクトの作成に失敗しました";
          throw new Error(d);
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
          const d = await u.json(),
            p =
              typeof d.error == "string"
                ? d.error
                : ((l = d.error) == null ? void 0 : l.message) ||
                  "プロジェクトの更新に失敗しました";
          throw new Error(p);
        }
        const c = await u.json();
        return (
          e((d) => ({
            projects: d.projects.map((p) => (p.projectId === o ? c : p)),
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
function qv({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
      clipRule: "evenodd",
    }),
  });
}
function Jv({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM6 13.25v-2.5h2.5v2.5H6zm0-3.5V7.25h2.5v2.5H6zm3.5 0V7.25H12v2.5H9.5zm0 3.5v-2.5H12v2.5H9.5zm3.5 0v-2.5h2.5v2.5H13zm0-3.5V7.25h2.5v2.5H13z",
      clipRule: "evenodd",
    }),
  });
}
function Zv({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293c.121-.233.362-.393.642-.413a41.102 41.102 0 003.55-.414c1.437-.232 2.43-1.49 2.43-2.902V5.426c0-1.412-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z",
      clipRule: "evenodd",
    }),
  });
}
function Zh({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z",
      clipRule: "evenodd",
    }),
  });
}
function kl({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      d: "M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z",
    }),
  });
}
function e1({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    }),
  });
}
function wc({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
      clipRule: "evenodd",
    }),
  });
}
function ep({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z",
      clipRule: "evenodd",
    }),
  });
}
function t1({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z",
      clipRule: "evenodd",
    }),
  });
}
function n1({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      d: "M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z",
    }),
  });
}
function r1({ className: e }) {
  return h.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: [
      h.jsx("path", { d: "M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" }),
      h.jsx("path", {
        fillRule: "evenodd",
        d: "M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
        clipRule: "evenodd",
      }),
    ],
  });
}
function o1({ className: e }) {
  return h.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: [
      h.jsx("path", {
        fillRule: "evenodd",
        d: "M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z",
        clipRule: "evenodd",
      }),
      h.jsx("path", {
        d: "M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z",
      }),
    ],
  });
}
function bs({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z",
      clipRule: "evenodd",
    }),
  });
}
function js({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z",
    }),
  });
}
function _s({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
      clipRule: "evenodd",
    }),
  });
}
function Am({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      d: "M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z",
    }),
  });
}
function s1({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z",
      clipRule: "evenodd",
    }),
  });
}
function i1({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M3.25 3A2.25 2.25 0 001 5.25v9.5A2.25 2.25 0 003.25 17h13.5A2.25 2.25 0 0019 14.75v-9.5A2.25 2.25 0 0016.75 3H3.25zm.943 8.752a.75.75 0 01.055-1.06L6.128 9l-1.88-1.693a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 01-1.06-.055zM9.75 10.25a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z",
      clipRule: "evenodd",
    }),
  });
}
function l1({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      d: "M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z",
    }),
  });
}
function a1({ className: e }) {
  return h.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: [
      h.jsx("path", {
        d: "M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z",
      }),
      h.jsx("path", {
        fillRule: "evenodd",
        d: "M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z",
        clipRule: "evenodd",
      }),
    ],
  });
}
function u1({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      d: "M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z",
    }),
  });
}
function $m({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    }),
  });
}
function Xc({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M6.56 1.14a.75.75 0 01.177 1.045 3.989 3.989 0 00-.464.86c.185.17.382.329.59.473A3.993 3.993 0 0110 2c1.272 0 2.405.594 3.137 1.518.208-.144.405-.302.59-.473a3.989 3.989 0 00-.464-.86.75.75 0 011.222-.869c.369.519.65 1.105.822 1.736a.75.75 0 01-.174.707 7.03 7.03 0 01-1.299 1.098A4 4 0 0114 6c0 .52-.301.963-.723 1.187a6.961 6.961 0 01-1.158.486c.022.15.035.303.035.459v.874c1.168.115 2.27.455 3.266.974a.75.75 0 11-.706 1.323A7.967 7.967 0 0012 10.163v.461c0 .136-.013.269-.038.398a8 8 0 012.818 1.614.75.75 0 01-1.06 1.06 6.5 6.5 0 00-2.18-1.403A4.5 4.5 0 0110 14.5a4.5 4.5 0 01-1.54-2.207 6.5 6.5 0 00-2.18 1.403.75.75 0 01-1.06-1.06 8 8 0 012.818-1.614 2.981 2.981 0 01-.038-.398v-.461a7.967 7.967 0 00-2.714 1.14.75.75 0 11-.706-1.323 8.96 8.96 0 013.266-.974v-.874c0-.156.013-.31.035-.459a6.961 6.961 0 01-1.158-.486A1.348 1.348 0 016 6c0-.22.018-.436.052-.647a7.03 7.03 0 01-1.299-1.098.75.75 0 01-.174-.707c.172-.63.453-1.217.822-1.736a.75.75 0 011.159.326z",
      clipRule: "evenodd",
    }),
  });
}
function c1({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      d: "M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06A.75.75 0 116.11 5.173L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.062a.75.75 0 01-1.062-1.061l1.061-1.06a.75.75 0 011.06 0zM3 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 10zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0114 10zm-6.828 5.243a3.5 3.5 0 105.656 0H7.172zM10 5.5a4.5 4.5 0 00-3.464 7.404A3 3 0 018.5 15.5h3a3 3 0 011.964-2.596A4.5 4.5 0 0010 5.5z",
    }),
  });
}
function d1({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
      fillRule: "evenodd",
      d: "M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z",
      clipRule: "evenodd",
    }),
  });
}
function f1({ className: e }) {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: e,
    "aria-hidden": "true",
    children: h.jsx("path", {
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
  selectedSessionIds: d = [],
}) {
  const {
      projects: p,
      selectedProjectId: m,
      loading: v,
      fetchProjects: g,
      selectProject: x,
      updateProject: S,
      deleteProject: w,
    } = Yc(),
    [j, C] = E.useState(!1),
    [b, I] = E.useState(!1),
    [k, _] = E.useState(new Set()),
    [D, z] = E.useState(!1),
    [R, H] = E.useState(null),
    [V, ie] = E.useState(""),
    [X, Y] = E.useState(null);
  E.useEffect(() => {
    g();
  }, [g]);
  const te = E.useMemo(
      () => (m ? e.filter((F) => F.projectId === m) : e),
      [e, m]
    ),
    L = E.useMemo(() => {
      const F = new Set(e.map((Q) => Q.projectId).filter(Boolean));
      return p.filter((Q) => F.has(Q.projectId));
    }, [e, p]),
    q = E.useCallback(
      (F) => {
        (x(F), C(!1));
      },
      [x]
    ),
    B = p.find((F) => F.projectId === m),
    K = E.useCallback((F, Q) => {
      (H(F), ie(Q), C(!1));
    }, []),
    A = E.useCallback(async () => {
      !R || !V.trim() || (await S(R, { name: V.trim() }), H(null), ie(""));
    }, [R, V, S]),
    $ = E.useCallback(() => {
      (H(null), ie(""));
    }, []),
    U = E.useCallback(
      async (F) => {
        confirm("このプロジェクトを削除しますか？") && (await w(F), C(!1));
      },
      [w]
    ),
    P = E.useCallback(() => {
      (I((F) => !F), _(new Set()));
    }, []),
    M = E.useCallback((F) => {
      _((Q) => {
        const re = new Set(Q);
        return (re.has(F) ? re.delete(F) : re.add(F), re);
      });
    }, []),
    ne = E.useCallback(() => {
      k.size === te.length
        ? _(new Set())
        : _(new Set(te.map((F) => F.sessionId)));
    }, [te, k.size]),
    oe = E.useCallback(async () => {
      if (!(k.size === 0 || !u)) {
        z(!0);
        try {
          (await u(Array.from(k)), _(new Set()), I(!1));
        } finally {
          z(!1);
        }
      }
    }, [k, u]);
  return h.jsxs("aside", {
    className:
      "w-64 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] flex flex-col h-full",
    children: [
      h.jsx("div", {
        className: "p-3 border-b border-[var(--border-subtle)]",
        children: h.jsxs("div", {
          className: "relative",
          children: [
            h.jsxs("button", {
              onClick: () => C(!j),
              className:
                "w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors",
              "aria-expanded": j,
              "aria-haspopup": "listbox",
              children: [
                h.jsxs("div", {
                  className: "flex items-center gap-2 min-w-0",
                  children: [
                    h.jsx(kl, {
                      className:
                        "w-4 h-4 text-[var(--text-muted)] flex-shrink-0",
                    }),
                    h.jsx("span", {
                      className: "text-sm text-[var(--text-primary)] truncate",
                      children: v
                        ? "読み込み中..."
                        : (B == null ? void 0 : B.name) ||
                          "すべてのプロジェクト",
                    }),
                  ],
                }),
                h.jsx(wc, {
                  className:
                    "w-4 h-4 text-[var(--text-muted)] transition-transform " +
                    (j ? "rotate-180" : ""),
                }),
              ],
            }),
            j &&
              h.jsxs("div", {
                className:
                  "absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto",
                children: [
                  h.jsx("button", {
                    onClick: () => q(null),
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
                    h.jsx(
                      "div",
                      {
                        className:
                          "group flex items-center gap-1 px-2 py-2 text-sm hover:bg-[var(--bg-surface)] transition-colors " +
                          (m === F.projectId
                            ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"
                            : "text-[var(--text-primary)]"),
                        children:
                          R === F.projectId
                            ? h.jsxs("div", {
                                className: "flex-1 flex items-center gap-1",
                                children: [
                                  h.jsx("label", {
                                    htmlFor: `edit-project-${F.projectId}`,
                                    className: "sr-only",
                                    children: "プロジェクト名を編集",
                                  }),
                                  h.jsx("input", {
                                    id: `edit-project-${F.projectId}`,
                                    type: "text",
                                    value: V,
                                    onChange: (Q) => ie(Q.target.value),
                                    onKeyDown: (Q) => {
                                      (Q.key === "Enter" && A(),
                                        Q.key === "Escape" && $());
                                    },
                                    className:
                                      "flex-1 px-2 py-1 text-sm bg-[var(--bg-base)] border border-[var(--border-default)] rounded text-[var(--text-primary)]",
                                    autoFocus: !0,
                                    "aria-label": "プロジェクト名",
                                  }),
                                  h.jsx("button", {
                                    onClick: A,
                                    className:
                                      "p-1 rounded hover:bg-[var(--color-primary-500)] text-[var(--text-muted)] hover:text-white transition-colors",
                                    "aria-label": "保存",
                                    children: h.jsx(_s, {
                                      className: "w-4 h-4",
                                    }),
                                  }),
                                ],
                              })
                            : h.jsxs(h.Fragment, {
                                children: [
                                  h.jsxs("button", {
                                    onClick: () => q(F.projectId),
                                    className: "flex-1 text-left min-w-0",
                                    role: "option",
                                    "aria-selected": m === F.projectId,
                                    children: [
                                      h.jsx("div", {
                                        className: "truncate",
                                        children: F.name,
                                      }),
                                      h.jsx("div", {
                                        className:
                                          "text-xs text-[var(--text-muted)] truncate",
                                        children: F.path,
                                      }),
                                    ],
                                  }),
                                  h.jsx("button", {
                                    onClick: (Q) => {
                                      (Q.stopPropagation(),
                                        K(F.projectId, F.name));
                                    },
                                    className:
                                      "p-1 rounded opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-[var(--bg-base)] transition-all",
                                    title: "名前を変更",
                                    "aria-label": `${F.name}の名前を変更`,
                                    children: h.jsx(Am, {
                                      className:
                                        "w-3 h-3 text-[var(--text-muted)]",
                                    }),
                                  }),
                                  h.jsx("button", {
                                    onClick: (Q) => {
                                      (Q.stopPropagation(), U(F.projectId));
                                    },
                                    className:
                                      "p-1 rounded opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-500/20 transition-all",
                                    title: "削除",
                                    "aria-label": `${F.name}を削除`,
                                    children: h.jsx(bs, {
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
      h.jsxs("div", {
        className: "flex-1 overflow-y-auto",
        children: [
          h.jsxs("div", {
            className: "px-3 py-2 flex items-center justify-between",
            children: [
              h.jsx("span", {
                className:
                  "text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider",
                children: "Sessions",
              }),
              u &&
                te.length > 0 &&
                h.jsx("button", {
                  onClick: P,
                  className: `text-xs px-2 py-1 rounded transition-colors ${b ? "bg-[var(--color-primary-500)] text-white" : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]"}`,
                  children: b ? "完了" : "選択",
                }),
            ],
          }),
          b &&
            te.length > 0 &&
            h.jsxs("div", {
              className: "px-3 pb-2 flex items-center gap-2",
              children: [
                h.jsx("button", {
                  onClick: ne,
                  className:
                    "text-xs px-2 py-1 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors",
                  children: k.size === te.length ? "全解除" : "全選択",
                }),
                k.size > 0 &&
                  h.jsxs("button", {
                    onClick: oe,
                    disabled: D,
                    className:
                      "text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50 flex items-center gap-1",
                    children: [
                      h.jsx(bs, { className: "w-3 h-3" }),
                      D ? "削除中..." : `${k.size}件を削除`,
                    ],
                  }),
              ],
            }),
          r
            ? h.jsx("div", {
                className: "px-3 space-y-2",
                children: [1, 2, 3].map((F) =>
                  h.jsx(
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
              ? h.jsx("div", {
                  className:
                    "px-3 py-4 text-sm text-[var(--text-muted)] text-center",
                  children: "セッションがありません",
                })
              : h.jsx("div", {
                  className: "px-2 space-y-1",
                  children: te.map((F) => {
                    const Q = p.find((re) => re.projectId === F.projectId);
                    return h.jsx(
                      m1,
                      {
                        session: F,
                        isHidden: d.includes(F.sessionId),
                        onToggle: o,
                        onClick: (re) => Y(re.sessionId),
                        onDelete: l,
                        onHover: c,
                        bulkSelectMode: b,
                        isBulkSelected: k.has(F.sessionId),
                        onBulkToggle: M,
                        projectName: Q == null ? void 0 : Q.name,
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
  m1 = E.memo(function ({
    session: r,
    isHidden: o,
    onToggle: i,
    onClick: l,
    onDelete: u,
    onHover: c,
    bulkSelectMode: d = !1,
    isBulkSelected: p = !1,
    onBulkToggle: m,
    projectName: v,
    showProjectBadge: g = !1,
    isClicked: x = !1,
  }) {
    const S = E.useCallback(
        (_) => {
          (_.stopPropagation(), i == null || i(r));
        },
        [i, r]
      ),
      w = E.useCallback(() => {
        d ? m == null || m(r.sessionId) : l == null || l(r);
      }, [d, l, m, r]),
      j = E.useCallback(
        (_) => {
          (_.stopPropagation(), u == null || u(r));
        },
        [u, r]
      ),
      C = E.useCallback(
        (_) => {
          (_.stopPropagation(), m == null || m(r.sessionId));
        },
        [m, r.sessionId]
      ),
      b = E.useCallback(() => {
        c == null || c(r.sessionId);
      }, [c, r.sessionId]),
      I = E.useCallback(() => {
        c == null || c(null);
      }, [c]),
      k = new Date(r.updatedAt).toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
      });
    return h.jsxs("div", {
      onClick: w,
      onMouseEnter: b,
      onMouseLeave: I,
      className:
        "group flex items-center gap-1 px-2 py-2 rounded-lg transition-colors cursor-pointer " +
        (p
          ? "bg-[var(--color-primary-500)]/20"
          : o
            ? "opacity-50 hover:opacity-70"
            : r.status === "processing"
              ? "border border-[var(--color-primary-400)] bg-[var(--color-primary-400)]/5 hover:bg-[var(--color-primary-400)]/10"
              : x
                ? "bg-[var(--color-primary-400)]/20 hover:bg-[var(--color-primary-400)]/25"
                : "hover:bg-[var(--color-primary-400)]/10"),
      children: [
        d
          ? h.jsx("button", {
              onClick: C,
              className: `p-1 rounded transition-colors flex-shrink-0 ${p ? "bg-[var(--color-primary-500)] text-white" : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:bg-[var(--bg-surface)]"}`,
              children: p
                ? h.jsx(_s, { className: "w-4 h-4" })
                : h.jsx("div", { className: "w-4 h-4" }),
            })
          : h.jsx("button", {
              onClick: S,
              className:
                "p-1 rounded hover:bg-[var(--bg-surface)] transition-colors flex-shrink-0",
              title: o ? "エディタに表示" : "エディタから非表示",
              children: o
                ? h.jsx(o1, { className: "w-4 h-4 text-[var(--text-muted)]" })
                : h.jsx(r1, {
                    className: "w-4 h-4 text-[var(--text-secondary)]",
                  }),
            }),
        h.jsxs("div", {
          className: "flex-1 text-left flex items-center gap-2 min-w-0",
          children: [
            h.jsx("span", {
              className:
                "w-2 h-2 rounded-full flex-shrink-0 " +
                (o ? "bg-gray-500" : p1[r.status]),
            }),
            h.jsxs("div", {
              className: "flex-1 min-w-0",
              children: [
                h.jsx("div", {
                  className:
                    "text-sm truncate " +
                    (o
                      ? "text-[var(--text-muted)] line-through"
                      : "text-[var(--text-primary)]"),
                  children: r.name,
                }),
                h.jsxs("div", {
                  className:
                    "flex items-center gap-2 text-xs text-[var(--text-muted)]",
                  children: [
                    h.jsx("span", { children: k }),
                    g &&
                      v &&
                      h.jsx("span", {
                        className:
                          "px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded text-[10px] truncate max-w-[80px]",
                        children: v,
                      }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !d &&
          h.jsx("button", {
            onClick: j,
            className:
              "p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all flex-shrink-0",
            title: "セッションを削除",
            children: h.jsx(bs, {
              className: "w-4 h-4 text-red-400 hover:text-red-300",
            }),
          }),
      ],
    });
  });
function nt(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let r = "";
  if (Array.isArray(e))
    for (let o = 0, i; o < e.length; o++)
      (i = nt(e[o])) !== "" && (r += (r && " ") + i);
  else for (let o in e) e[o] && (r += (r && " ") + o);
  return r;
}
var g1 = { value: () => {} };
function Ul() {
  for (var e = 0, r = arguments.length, o = {}, i; e < r; ++e) {
    if (!(i = arguments[e] + "") || i in o || /[\s.]/.test(i))
      throw new Error("illegal type: " + i);
    o[i] = [];
  }
  return new Nl(o);
}
function Nl(e) {
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
Nl.prototype = Ul.prototype = {
  constructor: Nl,
  on: function (e, r) {
    var o = this._,
      i = y1(e + "", o),
      l,
      u = -1,
      c = i.length;
    if (arguments.length < 2) {
      for (; ++u < c; )
        if ((l = (e = i[u]).type) && (l = x1(o[l], e.name))) return l;
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
    return new Nl(e);
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
function x1(e, r) {
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
function Yl(e) {
  var r = (e += ""),
    o = r.indexOf(":");
  return (
    o >= 0 && (r = e.slice(0, o)) !== "xmlns" && (e = e.slice(o + 1)),
    np.hasOwnProperty(r) ? { space: np[r], local: e } : e
  );
}
function v1(e) {
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
  var r = Yl(e);
  return (r.local ? w1 : v1)(r);
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
      var u = r[l], c = u.length, d = (i[l] = new Array(c)), p, m, v = 0;
      v < c;
      ++v
    )
      (p = u[v]) &&
        (m = e.call(p, p.__data__, v, u)) &&
        ("__data__" in p && (m.__data__ = p.__data__), (d[v] = m));
  return new $t(i, this._parents);
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
    for (var c = r[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && (i.push(e.call(p, p.__data__, m, c)), l.push(p));
  return new $t(i, l);
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
var j1 = Array.prototype.find;
function _1(e) {
  return function () {
    return j1.call(this.children, e);
  };
}
function I1() {
  return this.firstElementChild;
}
function M1(e) {
  return this.select(e == null ? I1 : _1(typeof e == "function" ? e : Hm(e)));
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
    for (var u = r[l], c = u.length, d = (i[l] = []), p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new $t(i, this._parents);
}
function Bm(e) {
  return new Array(e.length);
}
function A1() {
  return new $t(this._enter || this._groups.map(Bm), this._parents);
}
function Pl(e, r) {
  ((this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = r));
}
Pl.prototype = {
  constructor: Pl,
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
  for (var c = 0, d, p = r.length, m = u.length; c < m; ++c)
    (d = r[c]) ? ((d.__data__ = u[c]), (i[c] = d)) : (o[c] = new Pl(e, u[c]));
  for (; c < p; ++c) (d = r[c]) && (l[c] = d);
}
function O1(e, r, o, i, l, u, c) {
  var d,
    p,
    m = new Map(),
    v = r.length,
    g = u.length,
    x = new Array(v),
    S;
  for (d = 0; d < v; ++d)
    (p = r[d]) &&
      ((x[d] = S = c.call(p, p.__data__, d, r) + ""),
      m.has(S) ? (l[d] = p) : m.set(S, p));
  for (d = 0; d < g; ++d)
    ((S = c.call(e, u[d], d, u) + ""),
      (p = m.get(S))
        ? ((i[d] = p), (p.__data__ = u[d]), m.delete(S))
        : (o[d] = new Pl(e, u[d])));
  for (d = 0; d < v; ++d) (p = r[d]) && m.get(x[d]) === p && (l[d] = p);
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
      d = new Array(u),
      p = new Array(u),
      m = 0;
    m < u;
    ++m
  ) {
    var v = i[m],
      g = l[m],
      x = g.length,
      S = B1(e.call(v, v && v.__data__, m, i)),
      w = S.length,
      j = (d[m] = new Array(w)),
      C = (c[m] = new Array(w)),
      b = (p[m] = new Array(x));
    o(v, g, j, C, b, S, r);
    for (var I = 0, k = 0, _, D; I < w; ++I)
      if ((_ = j[I])) {
        for (I >= k && (k = I + 1); !(D = C[k]) && ++k < w; );
        _._next = D || null;
      }
  }
  return ((c = new $t(c, i)), (c._enter = d), (c._exit = p), c);
}
function B1(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function V1() {
  return new $t(this._exit || this._groups.map(Bm), this._parents);
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
      d = new Array(l),
      p = 0;
    p < c;
    ++p
  )
    for (
      var m = o[p], v = i[p], g = m.length, x = (d[p] = new Array(g)), S, w = 0;
      w < g;
      ++w
    )
      (S = m[w] || v[w]) && (x[w] = S);
  for (; p < l; ++p) d[p] = o[p];
  return new $t(d, this._parents);
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
  function r(g, x) {
    return g && x ? e(g.__data__, x.__data__) : !g - !x;
  }
  for (
    var o = this._groups, i = o.length, l = new Array(i), u = 0;
    u < i;
    ++u
  ) {
    for (
      var c = o[u], d = c.length, p = (l[u] = new Array(d)), m, v = 0;
      v < d;
      ++v
    )
      (m = c[v]) && (p[v] = m);
    p.sort(r);
  }
  return new $t(l, this._parents).order();
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
function J1() {
  let e = 0;
  for (const r of this) ++e;
  return e;
}
function Z1() {
  return !this.node();
}
function ew(e) {
  for (var r = this._groups, o = 0, i = r.length; o < i; ++o)
    for (var l = r[o], u = 0, c = l.length, d; u < c; ++u)
      (d = l[u]) && e.call(d, d.__data__, u, l);
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
  var o = Yl(e);
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
    : mo(this.node(), e);
}
function mo(e, r) {
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
function xw(e, r) {
  return function () {
    (r.apply(this, arguments) ? Ym : Xm)(this, e);
  };
}
function vw(e, r) {
  var o = Wm(e + "");
  if (arguments.length < 2) {
    for (var i = Qc(this.node()), l = -1, u = o.length; ++l < u; )
      if (!i.contains(o[l])) return !1;
    return !0;
  }
  return this.each((typeof r == "function" ? xw : r ? gw : yw)(o, r));
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
function jw(e) {
  return arguments.length
    ? this.each(e == null ? Nw : (typeof e == "function" ? bw : Cw)(e))
    : this.node().innerHTML;
}
function _w() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Iw() {
  return this.each(_w);
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
      for (var c = 0, d = i.length; c < d; ++c)
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
    var d = this.node().__on;
    if (d) {
      for (var p = 0, m = d.length, v; p < m; ++p)
        for (l = 0, v = d[p]; l < u; ++l)
          if ((c = i[l]).type === v.type && c.name === v.name) return v.value;
    }
    return;
  }
  for (d = r ? Ww : Vw, l = 0; l < u; ++l) this.each(d(i[l], r, o));
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
function $t(e, r) {
  ((this._groups = e), (this._parents = r));
}
function Hs() {
  return new $t([[document.documentElement]], Qm);
}
function Gw() {
  return this;
}
$t.prototype = Hs.prototype = {
  constructor: $t,
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
  size: J1,
  empty: Z1,
  each: ew,
  attr: lw,
  style: dw,
  property: mw,
  classed: vw,
  text: kw,
  html: jw,
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
function At(e) {
  return typeof e == "string"
    ? new $t([[document.querySelector(e)]], [document.documentElement])
    : new $t([[e]], Qm);
}
function qw(e) {
  let r;
  for (; (r = e.sourceEvent); ) e = r;
  return e;
}
function Zt(e, r) {
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
const Jw = { passive: !1 },
  Is = { capture: !0, passive: !1 };
function tc(e) {
  e.stopImmediatePropagation();
}
function ho(e) {
  (e.preventDefault(), e.stopImmediatePropagation());
}
function Gm(e) {
  var r = e.document.documentElement,
    o = At(e).on("dragstart.drag", ho, Is);
  "onselectstart" in r
    ? o.on("selectstart.drag", ho, Is)
    : ((r.__noselect = r.style.MozUserSelect),
      (r.style.MozUserSelect = "none"));
}
function qm(e, r) {
  var o = e.document.documentElement,
    i = At(e).on("dragstart.drag", null);
  (r &&
    (i.on("click.drag", ho, Is),
    setTimeout(function () {
      i.on("click.drag", null);
    }, 0)),
    "onselectstart" in o
      ? i.on("selectstart.drag", null)
      : ((o.style.MozUserSelect = o.__noselect), delete o.__noselect));
}
const cl = (e) => () => e;
function Ec(
  e,
  {
    sourceEvent: r,
    subject: o,
    target: i,
    identifier: l,
    active: u,
    x: c,
    y: d,
    dx: p,
    dy: m,
    dispatch: v,
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
    y: { value: d, enumerable: !0, configurable: !0 },
    dx: { value: p, enumerable: !0, configurable: !0 },
    dy: { value: m, enumerable: !0, configurable: !0 },
    _: { value: v },
  });
}
Ec.prototype.on = function () {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Zw(e) {
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
function Jm() {
  var e = Zw,
    r = e2,
    o = t2,
    i = n2,
    l = {},
    u = Ul("start", "drag", "end"),
    c = 0,
    d,
    p,
    m,
    v,
    g = 0;
  function x(_) {
    _.on("mousedown.drag", S)
      .filter(i)
      .on("touchstart.drag", C)
      .on("touchmove.drag", b, Jw)
      .on("touchend.drag touchcancel.drag", I)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function S(_, D) {
    if (!(v || !e.call(this, _, D))) {
      var z = k(this, r.call(this, _, D), _, D, "mouse");
      z &&
        (At(_.view).on("mousemove.drag", w, Is).on("mouseup.drag", j, Is),
        Gm(_.view),
        tc(_),
        (m = !1),
        (d = _.clientX),
        (p = _.clientY),
        z("start", _));
    }
  }
  function w(_) {
    if ((ho(_), !m)) {
      var D = _.clientX - d,
        z = _.clientY - p;
      m = D * D + z * z > g;
    }
    l.mouse("drag", _);
  }
  function j(_) {
    (At(_.view).on("mousemove.drag mouseup.drag", null),
      qm(_.view, m),
      ho(_),
      l.mouse("end", _));
  }
  function C(_, D) {
    if (e.call(this, _, D)) {
      var z = _.changedTouches,
        R = r.call(this, _, D),
        H = z.length,
        V,
        ie;
      for (V = 0; V < H; ++V)
        (ie = k(this, R, _, D, z[V].identifier, z[V])) &&
          (tc(_), ie("start", _, z[V]));
    }
  }
  function b(_) {
    var D = _.changedTouches,
      z = D.length,
      R,
      H;
    for (R = 0; R < z; ++R)
      (H = l[D[R].identifier]) && (ho(_), H("drag", _, D[R]));
  }
  function I(_) {
    var D = _.changedTouches,
      z = D.length,
      R,
      H;
    for (
      v && clearTimeout(v),
        v = setTimeout(function () {
          v = null;
        }, 500),
        R = 0;
      R < z;
      ++R
    )
      (H = l[D[R].identifier]) && (tc(_), H("end", _, D[R]));
  }
  function k(_, D, z, R, H, V) {
    var ie = u.copy(),
      X = Zt(V || z, D),
      Y,
      te,
      L;
    if (
      (L = o.call(
        _,
        new Ec("beforestart", {
          sourceEvent: z,
          target: x,
          identifier: H,
          active: c,
          x: X[0],
          y: X[1],
          dx: 0,
          dy: 0,
          dispatch: ie,
        }),
        R
      )) != null
    )
      return (
        (Y = L.x - X[0] || 0),
        (te = L.y - X[1] || 0),
        function q(B, K, A) {
          var $ = X,
            U;
          switch (B) {
            case "start":
              ((l[H] = q), (U = c++));
              break;
            case "end":
              (delete l[H], --c);
            case "drag":
              ((X = Zt(A || K, D)), (U = c));
              break;
          }
          ie.call(
            B,
            _,
            new Ec(B, {
              sourceEvent: K,
              subject: L,
              target: x,
              identifier: H,
              active: U,
              x: X[0] + Y,
              y: X[1] + te,
              dx: X[0] - $[0],
              dy: X[1] - $[1],
              dispatch: ie,
            }),
            R
          );
        }
      );
  }
  return (
    (x.filter = function (_) {
      return arguments.length
        ? ((e = typeof _ == "function" ? _ : cl(!!_)), x)
        : e;
    }),
    (x.container = function (_) {
      return arguments.length
        ? ((r = typeof _ == "function" ? _ : cl(_)), x)
        : r;
    }),
    (x.subject = function (_) {
      return arguments.length
        ? ((o = typeof _ == "function" ? _ : cl(_)), x)
        : o;
    }),
    (x.touchable = function (_) {
      return arguments.length
        ? ((i = typeof _ == "function" ? _ : cl(!!_)), x)
        : i;
    }),
    (x.on = function () {
      var _ = u.on.apply(u, arguments);
      return _ === u ? x : _;
    }),
    (x.clickDistance = function (_) {
      return arguments.length ? ((g = (_ = +_) * _), x) : Math.sqrt(g);
    }),
    x
  );
}
function Gc(e, r, o) {
  ((e.prototype = r.prototype = o), (o.constructor = e));
}
function Zm(e, r) {
  var o = Object.create(e.prototype);
  for (var i in r) o[i] = r[i];
  return o;
}
function Bs() {}
var Ms = 0.7,
  Rl = 1 / Ms,
  po = "\\s*([+-]?\\d+)\\s*",
  Ps = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  fn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  r2 = /^#([0-9a-f]{3,8})$/,
  o2 = new RegExp(`^rgb\\(${po},${po},${po}\\)$`),
  s2 = new RegExp(`^rgb\\(${fn},${fn},${fn}\\)$`),
  i2 = new RegExp(`^rgba\\(${po},${po},${po},${Ps}\\)$`),
  l2 = new RegExp(`^rgba\\(${fn},${fn},${fn},${Ps}\\)$`),
  a2 = new RegExp(`^hsl\\(${Ps},${fn},${fn}\\)$`),
  u2 = new RegExp(`^hsla\\(${Ps},${fn},${fn},${Ps}\\)$`),
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
Gc(Bs, _r, {
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
function _r(e) {
  var r, o;
  return (
    (e = (e + "").trim().toLowerCase()),
    (r = r2.exec(e))
      ? ((o = r[1].length),
        (r = parseInt(r[1], 16)),
        o === 6
          ? ip(r)
          : o === 3
            ? new It(
                ((r >> 8) & 15) | ((r >> 4) & 240),
                ((r >> 4) & 15) | (r & 240),
                ((r & 15) << 4) | (r & 15),
                1
              )
            : o === 8
              ? dl(
                  (r >> 24) & 255,
                  (r >> 16) & 255,
                  (r >> 8) & 255,
                  (r & 255) / 255
                )
              : o === 4
                ? dl(
                    ((r >> 12) & 15) | ((r >> 8) & 240),
                    ((r >> 8) & 15) | ((r >> 4) & 240),
                    ((r >> 4) & 15) | (r & 240),
                    (((r & 15) << 4) | (r & 15)) / 255
                  )
                : null)
      : (r = o2.exec(e))
        ? new It(r[1], r[2], r[3], 1)
        : (r = s2.exec(e))
          ? new It(
              (r[1] * 255) / 100,
              (r[2] * 255) / 100,
              (r[3] * 255) / 100,
              1
            )
          : (r = i2.exec(e))
            ? dl(r[1], r[2], r[3], r[4])
            : (r = l2.exec(e))
              ? dl(
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
                      ? new It(NaN, NaN, NaN, 0)
                      : null
  );
}
function ip(e) {
  return new It((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function dl(e, r, o, i) {
  return (i <= 0 && (e = r = o = NaN), new It(e, r, o, i));
}
function f2(e) {
  return (
    e instanceof Bs || (e = _r(e)),
    e ? ((e = e.rgb()), new It(e.r, e.g, e.b, e.opacity)) : new It()
  );
}
function kc(e, r, o, i) {
  return arguments.length === 1 ? f2(e) : new It(e, r, o, i ?? 1);
}
function It(e, r, o, i) {
  ((this.r = +e), (this.g = +r), (this.b = +o), (this.opacity = +i));
}
Gc(
  It,
  kc,
  Zm(Bs, {
    brighter(e) {
      return (
        (e = e == null ? Rl : Math.pow(Rl, e)),
        new It(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? Ms : Math.pow(Ms, e)),
        new It(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new It(br(this.r), br(this.g), br(this.b), Tl(this.opacity));
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
  return `#${Nr(this.r)}${Nr(this.g)}${Nr(this.b)}`;
}
function h2() {
  return `#${Nr(this.r)}${Nr(this.g)}${Nr(this.b)}${Nr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ap() {
  const e = Tl(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${br(this.r)}, ${br(this.g)}, ${br(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Tl(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function br(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Nr(e) {
  return ((e = br(e)), (e < 16 ? "0" : "") + e.toString(16));
}
function up(e, r, o, i) {
  return (
    i <= 0
      ? (e = r = o = NaN)
      : o <= 0 || o >= 1
        ? (e = r = NaN)
        : r <= 0 && (e = NaN),
    new en(e, r, o, i)
  );
}
function e0(e) {
  if (e instanceof en) return new en(e.h, e.s, e.l, e.opacity);
  if ((e instanceof Bs || (e = _r(e)), !e)) return new en();
  if (e instanceof en) return e;
  e = e.rgb();
  var r = e.r / 255,
    o = e.g / 255,
    i = e.b / 255,
    l = Math.min(r, o, i),
    u = Math.max(r, o, i),
    c = NaN,
    d = u - l,
    p = (u + l) / 2;
  return (
    d
      ? (r === u
          ? (c = (o - i) / d + (o < i) * 6)
          : o === u
            ? (c = (i - r) / d + 2)
            : (c = (r - o) / d + 4),
        (d /= p < 0.5 ? u + l : 2 - u - l),
        (c *= 60))
      : (d = p > 0 && p < 1 ? 0 : c),
    new en(c, d, p, e.opacity)
  );
}
function p2(e, r, o, i) {
  return arguments.length === 1 ? e0(e) : new en(e, r, o, i ?? 1);
}
function en(e, r, o, i) {
  ((this.h = +e), (this.s = +r), (this.l = +o), (this.opacity = +i));
}
Gc(
  en,
  p2,
  Zm(Bs, {
    brighter(e) {
      return (
        (e = e == null ? Rl : Math.pow(Rl, e)),
        new en(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? Ms : Math.pow(Ms, e)),
        new en(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        r = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        o = this.l,
        i = o + (o < 0.5 ? o : 1 - o) * r,
        l = 2 * o - i;
      return new It(
        nc(e >= 240 ? e - 240 : e + 120, l, i),
        nc(e, l, i),
        nc(e < 120 ? e + 240 : e - 120, l, i),
        this.opacity
      );
    },
    clamp() {
      return new en(cp(this.h), fl(this.s), fl(this.l), Tl(this.opacity));
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
      const e = Tl(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${cp(this.h)}, ${fl(this.s) * 100}%, ${fl(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  })
);
function cp(e) {
  return ((e = (e || 0) % 360), e < 0 ? e + 360 : e);
}
function fl(e) {
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
const Ll = (function e(r) {
  var o = y2(r);
  function i(l, u) {
    var c = o((l = kc(l)).r, (u = kc(u)).r),
      d = o(l.g, u.g),
      p = o(l.b, u.b),
      m = t0(l.opacity, u.opacity);
    return function (v) {
      return (
        (l.r = c(v)),
        (l.g = d(v)),
        (l.b = p(v)),
        (l.opacity = m(v)),
        l + ""
      );
    };
  }
  return ((i.gamma = e), i);
})(1);
function x2(e, r) {
  r || (r = []);
  var o = e ? Math.min(r.length, e.length) : 0,
    i = r.slice(),
    l;
  return function (u) {
    for (l = 0; l < o; ++l) i[l] = e[l] * (1 - u) + r[l] * u;
    return i;
  };
}
function v2(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function w2(e, r) {
  var o = r ? r.length : 0,
    i = e ? Math.min(o, e.length) : 0,
    l = new Array(i),
    u = new Array(o),
    c;
  for (c = 0; c < i; ++c) l[c] = Es(e[c], r[c]);
  for (; c < o; ++c) u[c] = r[c];
  return function (d) {
    for (c = 0; c < i; ++c) u[c] = l[c](d);
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
function dn(e, r) {
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
  for (l in r) l in e ? (o[l] = Es(e[l], r[l])) : (i[l] = r[l]);
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
    d = [],
    p = [];
  for (e = e + "", r = r + ""; (i = Nc.exec(e)) && (l = rc.exec(r)); )
    ((u = l.index) > o &&
      ((u = r.slice(o, u)), d[c] ? (d[c] += u) : (d[++c] = u)),
      (i = i[0]) === (l = l[0])
        ? d[c]
          ? (d[c] += l)
          : (d[++c] = l)
        : ((d[++c] = null), p.push({ i: c, x: dn(i, l) })),
      (o = rc.lastIndex));
  return (
    o < r.length && ((u = r.slice(o)), d[c] ? (d[c] += u) : (d[++c] = u)),
    d.length < 2
      ? p[0]
        ? N2(p[0].x)
        : k2(r)
      : ((r = p.length),
        function (m) {
          for (var v = 0, g; v < r; ++v) d[(g = p[v]).i] = g.x(m);
          return d.join("");
        })
  );
}
function Es(e, r) {
  var o = typeof r,
    i;
  return r == null || o === "boolean"
    ? qc(r)
    : (o === "number"
        ? dn
        : o === "string"
          ? (i = _r(r))
            ? ((r = i), Ll)
            : n0
          : r instanceof _r
            ? Ll
            : r instanceof Date
              ? S2
              : v2(r)
                ? x2
                : Array.isArray(r)
                  ? w2
                  : (typeof r.valueOf != "function" &&
                        typeof r.toString != "function") ||
                      isNaN(r)
                    ? E2
                    : dn)(e, r);
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
  var c, d, p;
  return (
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c)),
    (p = e * o + r * i) && ((o -= e * p), (i -= r * p)),
    (d = Math.sqrt(o * o + i * i)) && ((o /= d), (i /= d), (p /= d)),
    e * i < r * o && ((e = -e), (r = -r), (p = -p), (c = -c)),
    {
      translateX: l,
      translateY: u,
      rotate: Math.atan2(r, e) * dp,
      skewX: Math.atan(p) * dp,
      scaleX: c,
      scaleY: d,
    }
  );
}
var hl;
function C2(e) {
  const r = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    e + ""
  );
  return r.isIdentity ? Cc : r0(r.a, r.b, r.c, r.d, r.e, r.f);
}
function b2(e) {
  return e == null ||
    (hl || (hl = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    hl.setAttribute("transform", e),
    !(e = hl.transform.baseVal.consolidate()))
    ? Cc
    : ((e = e.matrix), r0(e.a, e.b, e.c, e.d, e.e, e.f));
}
function o0(e, r, o, i) {
  function l(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, v, g, x, S, w) {
    if (m !== g || v !== x) {
      var j = S.push("translate(", null, r, null, o);
      w.push({ i: j - 4, x: dn(m, g) }, { i: j - 2, x: dn(v, x) });
    } else (g || x) && S.push("translate(" + g + r + x + o);
  }
  function c(m, v, g, x) {
    m !== v
      ? (m - v > 180 ? (v += 360) : v - m > 180 && (m += 360),
        x.push({ i: g.push(l(g) + "rotate(", null, i) - 2, x: dn(m, v) }))
      : v && g.push(l(g) + "rotate(" + v + i);
  }
  function d(m, v, g, x) {
    m !== v
      ? x.push({ i: g.push(l(g) + "skewX(", null, i) - 2, x: dn(m, v) })
      : v && g.push(l(g) + "skewX(" + v + i);
  }
  function p(m, v, g, x, S, w) {
    if (m !== g || v !== x) {
      var j = S.push(l(S) + "scale(", null, ",", null, ")");
      w.push({ i: j - 4, x: dn(m, g) }, { i: j - 2, x: dn(v, x) });
    } else (g !== 1 || x !== 1) && S.push(l(S) + "scale(" + g + "," + x + ")");
  }
  return function (m, v) {
    var g = [],
      x = [];
    return (
      (m = e(m)),
      (v = e(v)),
      u(m.translateX, m.translateY, v.translateX, v.translateY, g, x),
      c(m.rotate, v.rotate, g, x),
      d(m.skewX, v.skewX, g, x),
      p(m.scaleX, m.scaleY, v.scaleX, v.scaleY, g, x),
      (m = v = null),
      function (S) {
        for (var w = -1, j = x.length, C; ++w < j; ) g[(C = x[w]).i] = C.x(S);
        return g.join("");
      }
    );
  };
}
var j2 = o0(C2, "px, ", "px)", "deg)"),
  _2 = o0(b2, ", ", ")", ")"),
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
const Cl = (function e(r, o, i) {
  function l(u, c) {
    var d = u[0],
      p = u[1],
      m = u[2],
      v = c[0],
      g = c[1],
      x = c[2],
      S = v - d,
      w = g - p,
      j = S * S + w * w,
      C,
      b;
    if (j < I2)
      ((b = Math.log(x / m) / r),
        (C = function (R) {
          return [d + R * S, p + R * w, m * Math.exp(r * R * b)];
        }));
    else {
      var I = Math.sqrt(j),
        k = (x * x - m * m + i * j) / (2 * m * o * I),
        _ = (x * x - m * m - i * j) / (2 * x * o * I),
        D = Math.log(Math.sqrt(k * k + 1) - k),
        z = Math.log(Math.sqrt(_ * _ + 1) - _);
      ((b = (z - D) / r),
        (C = function (R) {
          var H = R * b,
            V = fp(D),
            ie = (m / (o * I)) * (V * P2(r * H + D) - M2(D));
          return [d + ie * S, p + ie * w, (m * V) / fp(r * H + D)];
        }));
    }
    return ((C.duration = (b * 1e3 * r) / Math.SQRT2), C);
  }
  return (
    (l.rho = function (u) {
      var c = Math.max(0.001, +u),
        d = c * c,
        p = d * d;
      return e(c, d, p);
    }),
    l
  );
})(Math.SQRT2, 2, 4);
var go = 0,
  ws = 0,
  gs = 0,
  s0 = 1e3,
  zl,
  Ss,
  Al = 0,
  Ir = 0,
  Xl = 0,
  Rs = typeof performance == "object" && performance.now ? performance : Date,
  i0 =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (e) {
          setTimeout(e, 17);
        };
function Jc() {
  return Ir || (i0(R2), (Ir = Rs.now() + Xl));
}
function R2() {
  Ir = 0;
}
function $l() {
  this._call = this._time = this._next = null;
}
$l.prototype = l0.prototype = {
  constructor: $l,
  restart: function (e, r, o) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    ((o = (o == null ? Jc() : +o) + (r == null ? 0 : +r)),
      !this._next &&
        Ss !== this &&
        (Ss ? (Ss._next = this) : (zl = this), (Ss = this)),
      (this._call = e),
      (this._time = o),
      bc());
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), bc());
  },
};
function l0(e, r, o) {
  var i = new $l();
  return (i.restart(e, r, o), i);
}
function T2() {
  (Jc(), ++go);
  for (var e = zl, r; e; )
    ((r = Ir - e._time) >= 0 && e._call.call(void 0, r), (e = e._next));
  --go;
}
function hp() {
  ((Ir = (Al = Rs.now()) + Xl), (go = ws = 0));
  try {
    T2();
  } finally {
    ((go = 0), z2(), (Ir = 0));
  }
}
function L2() {
  var e = Rs.now(),
    r = e - Al;
  r > s0 && ((Xl -= r), (Al = e));
}
function z2() {
  for (var e, r = zl, o, i = 1 / 0; r; )
    r._call
      ? (i > r._time && (i = r._time), (e = r), (r = r._next))
      : ((o = r._next), (r._next = null), (r = e ? (e._next = o) : (zl = o)));
  ((Ss = e), bc(i));
}
function bc(e) {
  if (!go) {
    ws && (ws = clearTimeout(ws));
    var r = e - Ir;
    r > 24
      ? (e < 1 / 0 && (ws = setTimeout(hp, e - Rs.now() - Xl)),
        gs && (gs = clearInterval(gs)))
      : (gs || ((Al = Rs.now()), (gs = setInterval(L2, s0))), (go = 1), i0(hp));
  }
}
function pp(e, r, o) {
  var i = new $l();
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
var A2 = Ul("start", "end", "cancel", "interrupt"),
  $2 = [],
  a0 = 0,
  mp = 1,
  jc = 2,
  bl = 3,
  gp = 4,
  _c = 5,
  jl = 6;
function Kl(e, r, o, i, l, u) {
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
function Zc(e, r) {
  var o = rn(e, r);
  if (o.state > a0) throw new Error("too late; already scheduled");
  return o;
}
function mn(e, r) {
  var o = rn(e, r);
  if (o.state > bl) throw new Error("too late; already running");
  return o;
}
function rn(e, r) {
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
    var v, g, x, S;
    if (o.state !== mp) return p();
    for (v in i)
      if (((S = i[v]), S.name === o.name)) {
        if (S.state === bl) return pp(c);
        S.state === gp
          ? ((S.state = jl),
            S.timer.stop(),
            S.on.call("interrupt", e, e.__data__, S.index, S.group),
            delete i[v])
          : +v < r &&
            ((S.state = jl),
            S.timer.stop(),
            S.on.call("cancel", e, e.__data__, S.index, S.group),
            delete i[v]);
      }
    if (
      (pp(function () {
        o.state === bl &&
          ((o.state = gp), o.timer.restart(d, o.delay, o.time), d(m));
      }),
      (o.state = jc),
      o.on.call("start", e, e.__data__, o.index, o.group),
      o.state === jc)
    ) {
      for (
        o.state = bl, l = new Array((x = o.tween.length)), v = 0, g = -1;
        v < x;
        ++v
      )
        (S = o.tween[v].value.call(e, e.__data__, o.index, o.group)) &&
          (l[++g] = S);
      l.length = g + 1;
    }
  }
  function d(m) {
    for (
      var v =
          m < o.duration
            ? o.ease.call(null, m / o.duration)
            : (o.timer.restart(p), (o.state = _c), 1),
        g = -1,
        x = l.length;
      ++g < x;
    )
      l[g].call(e, v);
    o.state === _c && (o.on.call("end", e, e.__data__, o.index, o.group), p());
  }
  function p() {
    ((o.state = jl), o.timer.stop(), delete i[r]);
    for (var m in i) return;
    delete e.__transition;
  }
}
function _l(e, r) {
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
      ((l = i.state > jc && i.state < _c),
        (i.state = jl),
        i.timer.stop(),
        i.on.call(l ? "interrupt" : "cancel", e, e.__data__, i.index, i.group),
        delete o[c]);
    }
    u && delete e.__transition;
  }
}
function O2(e) {
  return this.each(function () {
    _l(this, e);
  });
}
function F2(e, r) {
  var o, i;
  return function () {
    var l = mn(this, e),
      u = l.tween;
    if (u !== o) {
      i = o = u;
      for (var c = 0, d = i.length; c < d; ++c)
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
    var u = mn(this, e),
      c = u.tween;
    if (c !== i) {
      l = (i = c).slice();
      for (var d = { name: r, value: o }, p = 0, m = l.length; p < m; ++p)
        if (l[p].name === r) {
          l[p] = d;
          break;
        }
      p === m && l.push(d);
    }
    u.tween = l;
  };
}
function B2(e, r) {
  var o = this._id;
  if (((e += ""), arguments.length < 2)) {
    for (var i = rn(this.node(), o).tween, l = 0, u = i.length, c; l < u; ++l)
      if ((c = i[l]).name === e) return c.value;
    return null;
  }
  return this.each((r == null ? F2 : H2)(o, e, r));
}
function ed(e, r, o) {
  var i = e._id;
  return (
    e.each(function () {
      var l = mn(this, i);
      (l.value || (l.value = {}))[r] = o.apply(this, arguments);
    }),
    function (l) {
      return rn(l, i).value[r];
    }
  );
}
function u0(e, r) {
  var o;
  return (
    typeof r == "number"
      ? dn
      : r instanceof _r
        ? Ll
        : (o = _r(r))
          ? ((r = o), Ll)
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
      d = o(this),
      p;
    return d == null
      ? void this.removeAttribute(e)
      : ((c = this.getAttribute(e)),
        (p = d + ""),
        c === p
          ? null
          : c === i && p === l
            ? u
            : ((l = p), (u = r((i = c), d))));
  };
}
function K2(e, r, o) {
  var i, l, u;
  return function () {
    var c,
      d = o(this),
      p;
    return d == null
      ? void this.removeAttributeNS(e.space, e.local)
      : ((c = this.getAttributeNS(e.space, e.local)),
        (p = d + ""),
        c === p
          ? null
          : c === i && p === l
            ? u
            : ((l = p), (u = r((i = c), d))));
  };
}
function Q2(e, r) {
  var o = Yl(e),
    i = o === "transform" ? _2 : u0;
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
function J2(e, r) {
  var o, i;
  function l() {
    var u = r.apply(this, arguments);
    return (u !== i && (o = (i = u) && q2(e, u)), o);
  }
  return ((l._value = r), l);
}
function Z2(e, r) {
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
  var i = Yl(e);
  return this.tween(o, (i.local ? J2 : Z2)(i, r));
}
function tS(e, r) {
  return function () {
    Zc(this, e).delay = +r.apply(this, arguments);
  };
}
function nS(e, r) {
  return (
    (r = +r),
    function () {
      Zc(this, e).delay = r;
    }
  );
}
function rS(e) {
  var r = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? tS : nS)(r, e))
    : rn(this.node(), r).delay;
}
function oS(e, r) {
  return function () {
    mn(this, e).duration = +r.apply(this, arguments);
  };
}
function sS(e, r) {
  return (
    (r = +r),
    function () {
      mn(this, e).duration = r;
    }
  );
}
function iS(e) {
  var r = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? oS : sS)(r, e))
    : rn(this.node(), r).duration;
}
function lS(e, r) {
  if (typeof r != "function") throw new Error();
  return function () {
    mn(this, e).ease = r;
  };
}
function aS(e) {
  var r = this._id;
  return arguments.length ? this.each(lS(r, e)) : rn(this.node(), r).ease;
}
function uS(e, r) {
  return function () {
    var o = r.apply(this, arguments);
    if (typeof o != "function") throw new Error();
    mn(this, e).ease = o;
  };
}
function cS(e) {
  if (typeof e != "function") throw new Error();
  return this.each(uS(this._id, e));
}
function dS(e) {
  typeof e != "function" && (e = Fm(e));
  for (var r = this._groups, o = r.length, i = new Array(o), l = 0; l < o; ++l)
    for (var u = r[l], c = u.length, d = (i[l] = []), p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new Mn(i, this._parents, this._name, this._id);
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
      d = 0;
    d < u;
    ++d
  )
    for (
      var p = r[d], m = o[d], v = p.length, g = (c[d] = new Array(v)), x, S = 0;
      S < v;
      ++S
    )
      (x = p[S] || m[S]) && (g[S] = x);
  for (; d < i; ++d) c[d] = r[d];
  return new Mn(c, this._parents, this._name, this._id);
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
    u = hS(r) ? Zc : mn;
  return function () {
    var c = u(this, e),
      d = c.on;
    (d !== i && (l = (i = d).copy()).on(r, o), (c.on = l));
  };
}
function mS(e, r) {
  var o = this._id;
  return arguments.length < 2
    ? rn(this.node(), o).on.on(e)
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
function xS(e) {
  var r = this._name,
    o = this._id;
  typeof e != "function" && (e = Kc(e));
  for (var i = this._groups, l = i.length, u = new Array(l), c = 0; c < l; ++c)
    for (
      var d = i[c], p = d.length, m = (u[c] = new Array(p)), v, g, x = 0;
      x < p;
      ++x
    )
      (v = d[x]) &&
        (g = e.call(v, v.__data__, x, d)) &&
        ("__data__" in v && (g.__data__ = v.__data__),
        (m[x] = g),
        Kl(m[x], r, o, x, m, rn(v, o)));
  return new Mn(u, this._parents, r, o);
}
function vS(e) {
  var r = this._name,
    o = this._id;
  typeof e != "function" && (e = Om(e));
  for (var i = this._groups, l = i.length, u = [], c = [], d = 0; d < l; ++d)
    for (var p = i[d], m = p.length, v, g = 0; g < m; ++g)
      if ((v = p[g])) {
        for (
          var x = e.call(v, v.__data__, g, p),
            S,
            w = rn(v, o),
            j = 0,
            C = x.length;
          j < C;
          ++j
        )
          (S = x[j]) && Kl(S, r, o, j, x, w);
        (u.push(x), c.push(v));
      }
  return new Mn(u, c, r, o);
}
var wS = Hs.prototype.constructor;
function SS() {
  return new wS(this._groups, this._parents);
}
function ES(e, r) {
  var o, i, l;
  return function () {
    var u = mo(this, e),
      c = (this.style.removeProperty(e), mo(this, e));
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
    var c = mo(this, e);
    return c === l ? null : c === i ? u : (u = r((i = c), o));
  };
}
function NS(e, r, o) {
  var i, l, u;
  return function () {
    var c = mo(this, e),
      d = o(this),
      p = d + "";
    return (
      d == null && (p = d = (this.style.removeProperty(e), mo(this, e))),
      c === p ? null : c === i && p === l ? u : ((l = p), (u = r((i = c), d)))
    );
  };
}
function CS(e, r) {
  var o,
    i,
    l,
    u = "style." + r,
    c = "end." + u,
    d;
  return function () {
    var p = mn(this, e),
      m = p.on,
      v = p.value[u] == null ? d || (d = c0(r)) : void 0;
    ((m !== o || l !== v) && (i = (o = m).copy()).on(c, (l = v)), (p.on = i));
  };
}
function bS(e, r, o) {
  var i = (e += "") == "transform" ? j2 : u0;
  return r == null
    ? this.styleTween(e, ES(e, i)).on("end.style." + e, c0(e))
    : typeof r == "function"
      ? this.styleTween(e, NS(e, i, ed(this, "style." + e, r))).each(
          CS(this._id, e)
        )
      : this.styleTween(e, kS(e, i, r), o).on("end.style." + e, null);
}
function jS(e, r, o) {
  return function (i) {
    this.style.setProperty(e, r.call(this, i), o);
  };
}
function _S(e, r, o) {
  var i, l;
  function u() {
    var c = r.apply(this, arguments);
    return (c !== l && (i = (l = c) && jS(e, c, o)), i);
  }
  return ((u._value = r), u);
}
function IS(e, r, o) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (r == null) return this.tween(i, null);
  if (typeof r != "function") throw new Error();
  return this.tween(i, _S(e, r, o ?? ""));
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
    for (var c = i[u], d = c.length, p, m = 0; m < d; ++m)
      if ((p = c[m])) {
        var v = rn(p, r);
        Kl(p, e, o, m, c, {
          time: v.time + v.delay + v.duration,
          delay: 0,
          duration: v.duration,
          ease: v.ease,
        });
      }
  return new Mn(i, this._parents, e, o);
}
function $S() {
  var e,
    r,
    o = this,
    i = o._id,
    l = o.size();
  return new Promise(function (u, c) {
    var d = { value: c },
      p = {
        value: function () {
          --l === 0 && u();
        },
      };
    (o.each(function () {
      var m = mn(this, i),
        v = m.on;
      (v !== e &&
        ((r = (e = v).copy()),
        r._.cancel.push(d),
        r._.interrupt.push(d),
        r._.end.push(p)),
        (m.on = r));
    }),
      l === 0 && u());
  });
}
var DS = 0;
function Mn(e, r, o, i) {
  ((this._groups = e), (this._parents = r), (this._name = o), (this._id = i));
}
function d0() {
  return ++DS;
}
var bn = Hs.prototype;
Mn.prototype = {
  constructor: Mn,
  select: xS,
  selectAll: vS,
  selectChild: bn.selectChild,
  selectChildren: bn.selectChildren,
  filter: dS,
  merge: fS,
  selection: SS,
  transition: AS,
  call: bn.call,
  nodes: bn.nodes,
  node: bn.node,
  size: bn.size,
  empty: bn.empty,
  each: bn.each,
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
  [Symbol.iterator]: bn[Symbol.iterator],
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
  e instanceof Mn
    ? ((r = e._id), (e = e._name))
    : ((r = d0()), ((o = FS).time = Jc()), (e = e == null ? null : e + ""));
  for (var i = this._groups, l = i.length, u = 0; u < l; ++u)
    for (var c = i[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && Kl(p, e, r, m, c, o || HS(p, r));
  return new Mn(i, this._parents, e, r);
}
Hs.prototype.interrupt = O2;
Hs.prototype.transition = BS;
const pl = (e) => () => e;
function VS(e, { sourceEvent: r, target: o, transform: i, dispatch: l }) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: r, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    transform: { value: i, enumerable: !0, configurable: !0 },
    _: { value: l },
  });
}
function jn(e, r, o) {
  ((this.k = e), (this.x = r), (this.y = o));
}
jn.prototype = {
  constructor: jn,
  scale: function (e) {
    return e === 1 ? this : new jn(this.k * e, this.x, this.y);
  },
  translate: function (e, r) {
    return (e === 0) & (r === 0)
      ? this
      : new jn(this.k, this.x + this.k * e, this.y + this.k * r);
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
var Ql = new jn(1, 0, 0);
f0.prototype = jn.prototype;
function f0(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Ql;
  return e.__zoom;
}
function oc(e) {
  e.stopImmediatePropagation();
}
function ys(e) {
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
  return this.__zoom || Ql;
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
    d = 250,
    p = Cl,
    m = Ul("start", "zoom", "end"),
    v,
    g,
    x,
    S = 500,
    w = 150,
    j = 0,
    C = 10;
  function b(L) {
    L.property("__zoom", yp)
      .on("wheel.zoom", H, { passive: !1 })
      .on("mousedown.zoom", V)
      .on("dblclick.zoom", ie)
      .filter(l)
      .on("touchstart.zoom", X)
      .on("touchmove.zoom", Y)
      .on("touchend.zoom touchcancel.zoom", te)
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  ((b.transform = function (L, q, B, K) {
    var A = L.selection ? L.selection() : L;
    (A.property("__zoom", yp),
      L !== A
        ? D(L, q, B, K)
        : A.interrupt().each(function () {
            z(this, arguments)
              .event(K)
              .start()
              .zoom(null, typeof q == "function" ? q.apply(this, arguments) : q)
              .end();
          }));
  }),
    (b.scaleBy = function (L, q, B, K) {
      b.scaleTo(
        L,
        function () {
          var A = this.__zoom.k,
            $ = typeof q == "function" ? q.apply(this, arguments) : q;
          return A * $;
        },
        B,
        K
      );
    }),
    (b.scaleTo = function (L, q, B, K) {
      b.transform(
        L,
        function () {
          var A = r.apply(this, arguments),
            $ = this.__zoom,
            U =
              B == null
                ? _(A)
                : typeof B == "function"
                  ? B.apply(this, arguments)
                  : B,
            P = $.invert(U),
            M = typeof q == "function" ? q.apply(this, arguments) : q;
          return o(k(I($, M), U, P), A, c);
        },
        B,
        K
      );
    }),
    (b.translateBy = function (L, q, B, K) {
      b.transform(
        L,
        function () {
          return o(
            this.__zoom.translate(
              typeof q == "function" ? q.apply(this, arguments) : q,
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
    (b.translateTo = function (L, q, B, K, A) {
      b.transform(
        L,
        function () {
          var $ = r.apply(this, arguments),
            U = this.__zoom,
            P =
              K == null
                ? _($)
                : typeof K == "function"
                  ? K.apply(this, arguments)
                  : K;
          return o(
            Ql.translate(P[0], P[1])
              .scale(U.k)
              .translate(
                typeof q == "function" ? -q.apply(this, arguments) : -q,
                typeof B == "function" ? -B.apply(this, arguments) : -B
              ),
            $,
            c
          );
        },
        K,
        A
      );
    }));
  function I(L, q) {
    return (
      (q = Math.max(u[0], Math.min(u[1], q))),
      q === L.k ? L : new jn(q, L.x, L.y)
    );
  }
  function k(L, q, B) {
    var K = q[0] - B[0] * L.k,
      A = q[1] - B[1] * L.k;
    return K === L.x && A === L.y ? L : new jn(L.k, K, A);
  }
  function _(L) {
    return [(+L[0][0] + +L[1][0]) / 2, (+L[0][1] + +L[1][1]) / 2];
  }
  function D(L, q, B, K) {
    L.on("start.zoom", function () {
      z(this, arguments).event(K).start();
    })
      .on("interrupt.zoom end.zoom", function () {
        z(this, arguments).event(K).end();
      })
      .tween("zoom", function () {
        var A = this,
          $ = arguments,
          U = z(A, $).event(K),
          P = r.apply(A, $),
          M = B == null ? _(P) : typeof B == "function" ? B.apply(A, $) : B,
          ne = Math.max(P[1][0] - P[0][0], P[1][1] - P[0][1]),
          oe = A.__zoom,
          F = typeof q == "function" ? q.apply(A, $) : q,
          Q = p(oe.invert(M).concat(ne / oe.k), F.invert(M).concat(ne / F.k));
        return function (re) {
          if (re === 1) re = F;
          else {
            var G = Q(re),
              se = ne / G[2];
            re = new jn(se, M[0] - G[0] * se, M[1] - G[1] * se);
          }
          U.zoom(null, re);
        };
      });
  }
  function z(L, q, B) {
    return (!B && L.__zooming) || new R(L, q);
  }
  function R(L, q) {
    ((this.that = L),
      (this.args = q),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = r.apply(L, q)),
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
    zoom: function (L, q) {
      return (
        this.mouse &&
          L !== "mouse" &&
          (this.mouse[1] = q.invert(this.mouse[0])),
        this.touch0 &&
          L !== "touch" &&
          (this.touch0[1] = q.invert(this.touch0[0])),
        this.touch1 &&
          L !== "touch" &&
          (this.touch1[1] = q.invert(this.touch1[0])),
        (this.that.__zoom = q),
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
      var q = At(this.that).datum();
      m.call(
        L,
        this.that,
        new VS(L, {
          sourceEvent: this.sourceEvent,
          target: b,
          transform: this.that.__zoom,
          dispatch: m,
        }),
        q
      );
    },
  };
  function H(L, ...q) {
    if (!e.apply(this, arguments)) return;
    var B = z(this, q).event(L),
      K = this.__zoom,
      A = Math.max(
        u[0],
        Math.min(u[1], K.k * Math.pow(2, i.apply(this, arguments)))
      ),
      $ = Zt(L);
    if (B.wheel)
      ((B.mouse[0][0] !== $[0] || B.mouse[0][1] !== $[1]) &&
        (B.mouse[1] = K.invert((B.mouse[0] = $))),
        clearTimeout(B.wheel));
    else {
      if (K.k === A) return;
      ((B.mouse = [$, K.invert($)]), _l(this), B.start());
    }
    (ys(L),
      (B.wheel = setTimeout(U, w)),
      B.zoom("mouse", o(k(I(K, A), B.mouse[0], B.mouse[1]), B.extent, c)));
    function U() {
      ((B.wheel = null), B.end());
    }
  }
  function V(L, ...q) {
    if (x || !e.apply(this, arguments)) return;
    var B = L.currentTarget,
      K = z(this, q, !0).event(L),
      A = At(L.view).on("mousemove.zoom", M, !0).on("mouseup.zoom", ne, !0),
      $ = Zt(L, B),
      U = L.clientX,
      P = L.clientY;
    (Gm(L.view),
      oc(L),
      (K.mouse = [$, this.__zoom.invert($)]),
      _l(this),
      K.start());
    function M(oe) {
      if ((ys(oe), !K.moved)) {
        var F = oe.clientX - U,
          Q = oe.clientY - P;
        K.moved = F * F + Q * Q > j;
      }
      K.event(oe).zoom(
        "mouse",
        o(k(K.that.__zoom, (K.mouse[0] = Zt(oe, B)), K.mouse[1]), K.extent, c)
      );
    }
    function ne(oe) {
      (A.on("mousemove.zoom mouseup.zoom", null),
        qm(oe.view, K.moved),
        ys(oe),
        K.event(oe).end());
    }
  }
  function ie(L, ...q) {
    if (e.apply(this, arguments)) {
      var B = this.__zoom,
        K = Zt(L.changedTouches ? L.changedTouches[0] : L, this),
        A = B.invert(K),
        $ = B.k * (L.shiftKey ? 0.5 : 2),
        U = o(k(I(B, $), K, A), r.apply(this, q), c);
      (ys(L),
        d > 0
          ? At(this).transition().duration(d).call(D, U, K, L)
          : At(this).call(b.transform, U, K, L));
    }
  }
  function X(L, ...q) {
    if (e.apply(this, arguments)) {
      var B = L.touches,
        K = B.length,
        A = z(this, q, L.changedTouches.length === K).event(L),
        $,
        U,
        P,
        M;
      for (oc(L), U = 0; U < K; ++U)
        ((P = B[U]),
          (M = Zt(P, this)),
          (M = [M, this.__zoom.invert(M), P.identifier]),
          A.touch0
            ? !A.touch1 &&
              A.touch0[2] !== M[2] &&
              ((A.touch1 = M), (A.taps = 0))
            : ((A.touch0 = M), ($ = !0), (A.taps = 1 + !!v)));
      (v && (v = clearTimeout(v)),
        $ &&
          (A.taps < 2 &&
            ((g = M[0]),
            (v = setTimeout(function () {
              v = null;
            }, S))),
          _l(this),
          A.start()));
    }
  }
  function Y(L, ...q) {
    if (this.__zooming) {
      var B = z(this, q).event(L),
        K = L.changedTouches,
        A = K.length,
        $,
        U,
        P,
        M;
      for (ys(L), $ = 0; $ < A; ++$)
        ((U = K[$]),
          (P = Zt(U, this)),
          B.touch0 && B.touch0[2] === U.identifier
            ? (B.touch0[0] = P)
            : B.touch1 && B.touch1[2] === U.identifier && (B.touch1[0] = P));
      if (((U = B.that.__zoom), B.touch1)) {
        var ne = B.touch0[0],
          oe = B.touch0[1],
          F = B.touch1[0],
          Q = B.touch1[1],
          re = (re = F[0] - ne[0]) * re + (re = F[1] - ne[1]) * re,
          G = (G = Q[0] - oe[0]) * G + (G = Q[1] - oe[1]) * G;
        ((U = I(U, Math.sqrt(re / G))),
          (P = [(ne[0] + F[0]) / 2, (ne[1] + F[1]) / 2]),
          (M = [(oe[0] + Q[0]) / 2, (oe[1] + Q[1]) / 2]));
      } else if (B.touch0) ((P = B.touch0[0]), (M = B.touch0[1]));
      else return;
      B.zoom("touch", o(k(U, P, M), B.extent, c));
    }
  }
  function te(L, ...q) {
    if (this.__zooming) {
      var B = z(this, q).event(L),
        K = L.changedTouches,
        A = K.length,
        $,
        U;
      for (
        oc(L),
          x && clearTimeout(x),
          x = setTimeout(function () {
            x = null;
          }, S),
          $ = 0;
        $ < A;
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
          ((U = Zt(U, this)), Math.hypot(g[0] - U[0], g[1] - U[1]) < C))
      ) {
        var P = At(this).on("dblclick.zoom");
        P && P.apply(this, arguments);
      }
    }
  }
  return (
    (b.wheelDelta = function (L) {
      return arguments.length
        ? ((i = typeof L == "function" ? L : pl(+L)), b)
        : i;
    }),
    (b.filter = function (L) {
      return arguments.length
        ? ((e = typeof L == "function" ? L : pl(!!L)), b)
        : e;
    }),
    (b.touchable = function (L) {
      return arguments.length
        ? ((l = typeof L == "function" ? L : pl(!!L)), b)
        : l;
    }),
    (b.extent = function (L) {
      return arguments.length
        ? ((r =
            typeof L == "function"
              ? L
              : pl([
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
      return arguments.length ? ((d = +L), b) : d;
    }),
    (b.interpolate = function (L) {
      return arguments.length ? ((p = L), b) : p;
    }),
    (b.on = function () {
      var L = m.on.apply(m, arguments);
      return L === m ? b : L;
    }),
    (b.clickDistance = function (L) {
      return arguments.length ? ((j = (L = +L) * L), b) : Math.sqrt(j);
    }),
    (b.tapDistance = function (L) {
      return arguments.length ? ((C = +L), b) : C;
    }),
    b
  );
}
const hn = {
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
  Ts = [
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
var yo;
(function (e) {
  ((e.Strict = "strict"), (e.Loose = "loose"));
})(yo || (yo = {}));
var jr;
(function (e) {
  ((e.Free = "free"), (e.Vertical = "vertical"), (e.Horizontal = "horizontal"));
})(jr || (jr = {}));
var Ls;
(function (e) {
  ((e.Partial = "partial"), (e.Full = "full"));
})(Ls || (Ls = {}));
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
var tr;
(function (e) {
  ((e.Bezier = "default"),
    (e.Straight = "straight"),
    (e.Step = "step"),
    (e.SmoothStep = "smoothstep"),
    (e.SimpleBezier = "simplebezier"));
})(tr || (tr = {}));
var Dl;
(function (e) {
  ((e.Arrow = "arrow"), (e.ArrowClosed = "arrowclosed"));
})(Dl || (Dl = {}));
var Ne;
(function (e) {
  ((e.Left = "left"),
    (e.Top = "top"),
    (e.Right = "right"),
    (e.Bottom = "bottom"));
})(Ne || (Ne = {}));
const xp = {
  [Ne.Left]: Ne.Right,
  [Ne.Right]: Ne.Left,
  [Ne.Top]: Ne.Bottom,
  [Ne.Bottom]: Ne.Top,
};
function y0(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const x0 = (e) => "id" in e && "source" in e && "target" in e,
  QS = (e) =>
    "id" in e && "position" in e && !("source" in e) && !("target" in e),
  td = (e) =>
    "id" in e && "internals" in e && !("source" in e) && !("target" in e),
  Vs = (e, r = [0, 0]) => {
    const { width: o, height: i } = Pn(e),
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
        const d = c ? Ol(c, r.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
        return Gl(i, d);
      },
      { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }
    );
    return ql(o);
  },
  Ws = (e, r = {}) => {
    let o = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 },
      i = !1;
    return (
      e.forEach((l) => {
        (r.filter === void 0 || r.filter(l)) && ((o = Gl(o, Ol(l))), (i = !0));
      }),
      i ? ql(o) : { x: 0, y: 0, width: 0, height: 0 }
    );
  },
  nd = (e, r, [o, i, l] = [0, 0, 1], u = !1, c = !1) => {
    const d = { ...Ys(r, [o, i, l]), width: r.width / l, height: r.height / l },
      p = [];
    for (const m of e.values()) {
      const { measured: v, selectable: g = !0, hidden: x = !1 } = m;
      if ((c && !g) || x) continue;
      const S = v.width ?? m.width ?? m.initialWidth ?? null,
        w = v.height ?? m.height ?? m.initialHeight ?? null,
        j = zs(d, vo(m)),
        C = (S ?? 0) * (w ?? 0),
        b = u && j > 0;
      (!m.internals.handleBounds || b || j >= C || m.dragging) && p.push(m);
    }
    return p;
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
function JS(e, r) {
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
async function ZS(
  { nodes: e, width: r, height: o, panZoom: i, minZoom: l, maxZoom: u },
  c
) {
  if (e.size === 0) return Promise.resolve(!0);
  const d = JS(e, c),
    p = Ws(d),
    m = rd(
      p,
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
function v0({
  nodeId: e,
  nextPosition: r,
  nodeLookup: o,
  nodeOrigin: i = [0, 0],
  nodeExtent: l,
  onError: u,
}) {
  const c = o.get(e),
    d = c.parentId ? o.get(c.parentId) : void 0,
    { x: p, y: m } = d ? d.internals.positionAbsolute : { x: 0, y: 0 },
    v = c.origin ?? i;
  let g = c.extent || l;
  if (c.extent === "parent" && !c.expandParent)
    if (!d) u == null || u("005", hn.error005());
    else {
      const S = d.measured.width,
        w = d.measured.height;
      S &&
        w &&
        (g = [
          [p, m],
          [p + S, m + w],
        ]);
    }
  else
    d &&
      wo(c.extent) &&
      (g = [
        [c.extent[0][0] + p, c.extent[0][1] + m],
        [c.extent[1][0] + p, c.extent[1][1] + m],
      ]);
  const x = wo(g) ? Mr(r, g, c.measured) : r;
  return (
    (c.measured.width === void 0 || c.measured.height === void 0) &&
      (u == null || u("015", hn.error015())),
    {
      position: {
        x: x.x - p + (c.measured.width ?? 0) * v[0],
        y: x.y - m + (c.measured.height ?? 0) * v[1],
      },
      positionAbsolute: x,
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
  const u = new Set(e.map((x) => x.id)),
    c = [];
  for (const x of o) {
    if (x.deletable === !1) continue;
    const S = u.has(x.id),
      w = !S && x.parentId && c.find((j) => j.id === x.parentId);
    (S || w) && c.push(x);
  }
  const d = new Set(r.map((x) => x.id)),
    p = i.filter((x) => x.deletable !== !1),
    v = qS(c, p);
  for (const x of p) d.has(x.id) && !v.find((w) => w.id === x.id) && v.push(x);
  if (!l) return { edges: v, nodes: c };
  const g = await l({ nodes: c, edges: v });
  return typeof g == "boolean"
    ? g
      ? { edges: v, nodes: c }
      : { edges: [], nodes: [] }
    : g;
}
const xo = (e, r = 0, o = 1) => Math.min(Math.max(e, r), o),
  Mr = (e = { x: 0, y: 0 }, r, o) => ({
    x: xo(e.x, r[0][0], r[1][0] - ((o == null ? void 0 : o.width) ?? 0)),
    y: xo(e.y, r[0][1], r[1][1] - ((o == null ? void 0 : o.height) ?? 0)),
  });
function w0(e, r, o) {
  const { width: i, height: l } = Pn(o),
    { x: u, y: c } = o.internals.positionAbsolute;
  return Mr(
    e,
    [
      [u, c],
      [u + i, c + l],
    ],
    r
  );
}
const vp = (e, r, o) =>
    e < r
      ? xo(Math.abs(e - r), 1, r) / r
      : e > o
        ? -xo(Math.abs(e - o), 1, r) / r
        : 0,
  S0 = (e, r, o = 15, i = 40) => {
    const l = vp(e.x, i, r.width - i) * o,
      u = vp(e.y, i, r.height - i) * o;
    return [l, u];
  },
  Gl = (e, r) => ({
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
  ql = ({ x: e, y: r, x2: o, y2: i }) => ({
    x: e,
    y: r,
    width: o - e,
    height: i - r,
  }),
  vo = (e, r = [0, 0]) => {
    var l, u;
    const { x: o, y: i } = td(e) ? e.internals.positionAbsolute : Vs(e, r);
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
  Ol = (e, r = [0, 0]) => {
    var l, u;
    const { x: o, y: i } = td(e) ? e.internals.positionAbsolute : Vs(e, r);
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
  E0 = (e, r) => ql(Gl(Ic(e), Ic(r))),
  zs = (e, r) => {
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
  wp = (e) => tn(e.width) && tn(e.height) && tn(e.x) && tn(e.y),
  tn = (e) => !isNaN(e) && isFinite(e),
  t5 = (e, r) => {},
  Us = (e, r = [1, 1]) => ({
    x: r[0] * Math.round(e.x / r[0]),
    y: r[1] * Math.round(e.y / r[1]),
  }),
  Ys = ({ x: e, y: r }, [o, i, l], u = !1, c = [1, 1]) => {
    const d = { x: (e - o) / l, y: (r - i) / l };
    return u ? Us(d, c) : d;
  },
  Fl = ({ x: e, y: r }, [o, i, l]) => ({ x: e * l + o, y: r * l + i });
function lo(e, r) {
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
    const i = lo(e, o),
      l = lo(e, r);
    return { top: i, right: l, bottom: i, left: l, x: l * 2, y: i * 2 };
  }
  if (typeof e == "object") {
    const i = lo(e.top ?? e.y ?? 0, o),
      l = lo(e.bottom ?? e.y ?? 0, o),
      u = lo(e.left ?? e.x ?? 0, r),
      c = lo(e.right ?? e.x ?? 0, r);
    return { top: i, right: c, bottom: l, left: u, x: u + c, y: i + l };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function r5(e, r, o, i, l, u) {
  const { x: c, y: d } = Fl(e, [r, o, i]),
    { x: p, y: m } = Fl({ x: e.x + e.width, y: e.y + e.height }, [r, o, i]),
    v = l - p,
    g = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(v),
    bottom: Math.floor(g),
  };
}
const rd = (e, r, o, i, l, u) => {
    const c = n5(u, r, o),
      d = (r - c.x) / e.width,
      p = (o - c.y) / e.height,
      m = Math.min(d, p),
      v = xo(m, i, l),
      g = e.x + e.width / 2,
      x = e.y + e.height / 2,
      S = r / 2 - g * v,
      w = o / 2 - x * v,
      j = r5(e, S, w, v, r, o),
      C = {
        left: Math.min(j.left - c.left, 0),
        top: Math.min(j.top - c.top, 0),
        right: Math.min(j.right - c.right, 0),
        bottom: Math.min(j.bottom - c.bottom, 0),
      };
    return { x: S - C.left + C.right, y: w - C.top + C.bottom, zoom: v };
  },
  As = () => {
    var e;
    return (
      typeof navigator < "u" &&
      ((e = navigator == null ? void 0 : navigator.userAgent) == null
        ? void 0
        : e.indexOf("Mac")) >= 0
    );
  };
function wo(e) {
  return e != null && e !== "parent";
}
function Pn(e) {
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
    const d = c.origin || l;
    ((u.x += c.internals.positionAbsolute.x - (r.width ?? 0) * d[0]),
      (u.y += c.internals.positionAbsolute.y - (r.height ?? 0) * d[1]));
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
function ks(
  e,
  { snapGrid: r = [0, 0], snapToGrid: o = !1, transform: i, containerBounds: l }
) {
  const { x: u, y: c } = nn(e),
    d = Ys(
      {
        x: u - ((l == null ? void 0 : l.left) ?? 0),
        y: c - ((l == null ? void 0 : l.top) ?? 0),
      },
      i
    ),
    { x: p, y: m } = o ? Us(d, r) : d;
  return { xSnapped: p, ySnapped: m, ...d };
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
const j0 = (e) => "clientX" in e,
  nn = (e, r) => {
    var u, c;
    const o = j0(e),
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
          const d = c.getBoundingClientRect();
          return {
            id: c.getAttribute("data-handleid"),
            type: e,
            nodeId: l,
            position: c.getAttribute("data-handlepos"),
            x: (d.left - o.left) / i,
            y: (d.top - o.top) / i,
            ...od(c),
          };
        });
  };
function _0({
  sourceX: e,
  sourceY: r,
  targetX: o,
  targetY: i,
  sourceControlX: l,
  sourceControlY: u,
  targetControlX: c,
  targetControlY: d,
}) {
  const p = e * 0.125 + l * 0.375 + c * 0.375 + o * 0.125,
    m = r * 0.125 + u * 0.375 + d * 0.375 + i * 0.125,
    v = Math.abs(p - e),
    g = Math.abs(m - r);
  return [p, m, v, g];
}
function ml(e, r) {
  return e >= 0 ? 0.5 * e : r * 25 * Math.sqrt(-e);
}
function kp({ pos: e, x1: r, y1: o, x2: i, y2: l, c: u }) {
  switch (e) {
    case Ne.Left:
      return [r - ml(r - i, u), o];
    case Ne.Right:
      return [r + ml(i - r, u), o];
    case Ne.Top:
      return [r, o - ml(o - l, u)];
    case Ne.Bottom:
      return [r, o + ml(l - o, u)];
  }
}
function I0({
  sourceX: e,
  sourceY: r,
  sourcePosition: o = Ne.Bottom,
  targetX: i,
  targetY: l,
  targetPosition: u = Ne.Top,
  curvature: c = 0.25,
}) {
  const [d, p] = kp({ pos: o, x1: e, y1: r, x2: i, y2: l, c }),
    [m, v] = kp({ pos: u, x1: i, y1: l, x2: e, y2: r, c }),
    [g, x, S, w] = _0({
      sourceX: e,
      sourceY: r,
      targetX: i,
      targetY: l,
      sourceControlX: d,
      sourceControlY: p,
      targetControlX: m,
      targetControlY: v,
    });
  return [`M${e},${r} C${d},${p} ${m},${v} ${i},${l}`, g, x, S, w];
}
function M0({ sourceX: e, sourceY: r, targetX: o, targetY: i }) {
  const l = Math.abs(o - e) / 2,
    u = o < e ? o + l : o - l,
    c = Math.abs(i - r) / 2,
    d = i < r ? i + c : i - c;
  return [u, d, l, c];
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
    d = Math.max(
      e.parentId || (l && e.selected) ? e.internals.z : 0,
      r.parentId || (l && r.selected) ? r.internals.z : 0
    );
  return c + d;
}
function a5({
  sourceNode: e,
  targetNode: r,
  width: o,
  height: i,
  transform: l,
}) {
  const u = Gl(Ol(e), Ol(r));
  (u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1));
  const c = {
    x: -l[0] / l[2],
    y: -l[1] / l[2],
    width: o / l[2],
    height: i / l[2],
  };
  return zs(c, ql(u)) > 0;
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
      x0(e) ? (l = { ...e }) : (l = { ...e, id: i(e) }),
      c5(l, r)
        ? r
        : (l.sourceHandle === null && delete l.sourceHandle,
          l.targetHandle === null && delete l.targetHandle,
          r.concat(l))
    );
  };
function R0({ sourceX: e, sourceY: r, targetX: o, targetY: i }) {
  const [l, u, c, d] = M0({ sourceX: e, sourceY: r, targetX: o, targetY: i });
  return [`M ${e},${r}L ${o},${i}`, l, u, c, d];
}
const Np = {
    [Ne.Left]: { x: -1, y: 0 },
    [Ne.Right]: { x: 1, y: 0 },
    [Ne.Top]: { x: 0, y: -1 },
    [Ne.Bottom]: { x: 0, y: 1 },
  },
  d5 = ({ source: e, sourcePosition: r = Ne.Bottom, target: o }) =>
    r === Ne.Left || r === Ne.Right
      ? e.x < o.x
        ? { x: 1, y: 0 }
        : { x: -1, y: 0 }
      : e.y < o.y
        ? { x: 0, y: 1 }
        : { x: 0, y: -1 },
  Cp = (e, r) => Math.sqrt(Math.pow(r.x - e.x, 2) + Math.pow(r.y - e.y, 2));
function f5({
  source: e,
  sourcePosition: r = Ne.Bottom,
  target: o,
  targetPosition: i = Ne.Top,
  center: l,
  offset: u,
  stepPosition: c,
}) {
  const d = Np[r],
    p = Np[i],
    m = { x: e.x + d.x * u, y: e.y + d.y * u },
    v = { x: o.x + p.x * u, y: o.y + p.y * u },
    g = d5({ source: m, sourcePosition: r, target: v }),
    x = g.x !== 0 ? "x" : "y",
    S = g[x];
  let w = [],
    j,
    C;
  const b = { x: 0, y: 0 },
    I = { x: 0, y: 0 },
    [, , k, _] = M0({ sourceX: e.x, sourceY: e.y, targetX: o.x, targetY: o.y });
  if (d[x] * p[x] === -1) {
    x === "x"
      ? ((j = l.x ?? m.x + (v.x - m.x) * c), (C = l.y ?? (m.y + v.y) / 2))
      : ((j = l.x ?? (m.x + v.x) / 2), (C = l.y ?? m.y + (v.y - m.y) * c));
    const z = [
        { x: j, y: m.y },
        { x: j, y: v.y },
      ],
      R = [
        { x: m.x, y: C },
        { x: v.x, y: C },
      ];
    d[x] === S ? (w = x === "x" ? z : R) : (w = x === "x" ? R : z);
  } else {
    const z = [{ x: m.x, y: v.y }],
      R = [{ x: v.x, y: m.y }];
    if (
      (x === "x" ? (w = d.x === S ? R : z) : (w = d.y === S ? z : R), r === i)
    ) {
      const Y = Math.abs(e[x] - o[x]);
      if (Y <= u) {
        const te = Math.min(u - 1, u - Y);
        d[x] === S
          ? (b[x] = (m[x] > e[x] ? -1 : 1) * te)
          : (I[x] = (v[x] > o[x] ? -1 : 1) * te);
      }
    }
    if (r !== i) {
      const Y = x === "x" ? "y" : "x",
        te = d[x] === p[Y],
        L = m[Y] > v[Y],
        q = m[Y] < v[Y];
      ((d[x] === 1 && ((!te && L) || (te && q))) ||
        (d[x] !== 1 && ((!te && q) || (te && L)))) &&
        (w = x === "x" ? z : R);
    }
    const H = { x: m.x + b.x, y: m.y + b.y },
      V = { x: v.x + I.x, y: v.y + I.y },
      ie = Math.max(Math.abs(H.x - w[0].x), Math.abs(V.x - w[0].x)),
      X = Math.max(Math.abs(H.y - w[0].y), Math.abs(V.y - w[0].y));
    ie >= X
      ? ((j = (H.x + V.x) / 2), (C = w[0].y))
      : ((j = w[0].x), (C = (H.y + V.y) / 2));
  }
  return [
    [
      e,
      { x: m.x + b.x, y: m.y + b.y },
      ...w,
      { x: v.x + I.x, y: v.y + I.y },
      o,
    ],
    j,
    C,
    k,
    _,
  ];
}
function h5(e, r, o, i) {
  const l = Math.min(Cp(e, r) / 2, Cp(r, o) / 2, i),
    { x: u, y: c } = r;
  if ((e.x === u && u === o.x) || (e.y === c && c === o.y)) return `L${u} ${c}`;
  if (e.y === c) {
    const m = e.x < o.x ? -1 : 1,
      v = e.y < o.y ? 1 : -1;
    return `L ${u + l * m},${c}Q ${u},${c} ${u},${c + l * v}`;
  }
  const d = e.x < o.x ? 1 : -1,
    p = e.y < o.y ? -1 : 1;
  return `L ${u},${c + l * p}Q ${u},${c} ${u + l * d},${c}`;
}
function Mc({
  sourceX: e,
  sourceY: r,
  sourcePosition: o = Ne.Bottom,
  targetX: i,
  targetY: l,
  targetPosition: u = Ne.Top,
  borderRadius: c = 5,
  centerX: d,
  centerY: p,
  offset: m = 20,
  stepPosition: v = 0.5,
}) {
  const [g, x, S, w, j] = f5({
    source: { x: e, y: r },
    sourcePosition: o,
    target: { x: i, y: l },
    targetPosition: u,
    center: { x: d, y: p },
    offset: m,
    stepPosition: v,
  });
  return [
    g.reduce((b, I, k) => {
      let _ = "";
      return (
        k > 0 && k < g.length - 1
          ? (_ = h5(g[k - 1], I, g[k + 1], c))
          : (_ = `${k === 0 ? "M" : "L"}${I.x} ${I.y}`),
        (b += _),
        b
      );
    }, ""),
    x,
    S,
    w,
    j,
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
  var g;
  const { sourceNode: r, targetNode: o } = e;
  if (!bp(r) || !bp(o)) return null;
  const i = r.internals.handleBounds || jp(r.handles),
    l = o.internals.handleBounds || jp(o.handles),
    u = _p((i == null ? void 0 : i.source) ?? [], e.sourceHandle),
    c = _p(
      e.connectionMode === yo.Strict
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
          hn.error008(u ? "target" : "source", {
            id: e.id,
            sourceHandle: e.sourceHandle,
            targetHandle: e.targetHandle,
          })
        ),
      null
    );
  const d = (u == null ? void 0 : u.position) || Ne.Bottom,
    p = (c == null ? void 0 : c.position) || Ne.Top,
    m = Pr(r, u, d),
    v = Pr(o, c, p);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: v.x,
    targetY: v.y,
    sourcePosition: d,
    targetPosition: p,
  };
}
function jp(e) {
  if (!e) return null;
  const r = [],
    o = [];
  for (const i of e)
    ((i.width = i.width ?? 1),
      (i.height = i.height ?? 1),
      i.type === "source" ? r.push(i) : i.type === "target" && o.push(i));
  return { source: r, target: o };
}
function Pr(e, r, o = Ne.Left, i = !1) {
  const l = ((r == null ? void 0 : r.x) ?? 0) + e.internals.positionAbsolute.x,
    u = ((r == null ? void 0 : r.y) ?? 0) + e.internals.positionAbsolute.y,
    { width: c, height: d } = r ?? Pn(e);
  if (i) return { x: l + c / 2, y: u + d / 2 };
  switch ((r == null ? void 0 : r.position) ?? o) {
    case Ne.Top:
      return { x: l + c / 2, y: u };
    case Ne.Right:
      return { x: l + c, y: u + d / 2 };
    case Ne.Bottom:
      return { x: l + c / 2, y: u + d };
    case Ne.Left:
      return { x: l, y: u + d / 2 };
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
function m5(
  e,
  { id: r, defaultColor: o, defaultMarkerStart: i, defaultMarkerEnd: l }
) {
  const u = new Set();
  return e
    .reduce(
      (c, d) => (
        [d.markerStart || i, d.markerEnd || l].forEach((p) => {
          if (p && typeof p == "object") {
            const m = Pc(p, r);
            u.has(m) ||
              (c.push({ id: m, color: p.color || o, ...p }), u.add(m));
          }
        }),
        c
      ),
      []
    )
    .sort((c, d) => c.id.localeCompare(d.id));
}
const T0 = 1e3,
  g5 = 10,
  sd = {
    nodeOrigin: [0, 0],
    nodeExtent: Ts,
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
function x5(e, r, o) {
  const i = id(sd, o);
  for (const l of e.values())
    if (l.parentId) ad(l, e, r, i);
    else {
      const u = Vs(l, i.nodeOrigin),
        c = wo(l.extent) ? l.extent : i.nodeExtent,
        d = Mr(u, c, Pn(l));
      l.internals.positionAbsolute = d;
    }
}
function v5(e, r) {
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
  var m, v;
  const l = id(y5, i),
    u = { i: 0 },
    c = new Map(r),
    d = l != null && l.elevateNodesOnSelect && !ld(l.zIndexMode) ? T0 : 0;
  let p = e.length > 0;
  (r.clear(), o.clear());
  for (const g of e) {
    let x = c.get(g.id);
    if (l.checkEquality && g === (x == null ? void 0 : x.internals.userNode))
      r.set(g.id, x);
    else {
      const S = Vs(g, l.nodeOrigin),
        w = wo(g.extent) ? g.extent : l.nodeExtent,
        j = Mr(S, w, Pn(g));
      ((x = {
        ...l.defaults,
        ...g,
        measured: {
          width: (m = g.measured) == null ? void 0 : m.width,
          height: (v = g.measured) == null ? void 0 : v.height,
        },
        internals: {
          positionAbsolute: j,
          handleBounds: v5(g, x),
          z: L0(g, d, l.zIndexMode),
          userNode: g,
        },
      }),
        r.set(g.id, x));
    }
    ((x.measured === void 0 ||
      x.measured.width === void 0 ||
      x.measured.height === void 0) &&
      !x.hidden &&
      (p = !1),
      g.parentId && ad(x, r, o, i, u));
  }
  return p;
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
      nodeExtent: d,
      zIndexMode: p,
    } = id(sd, i),
    m = e.parentId,
    v = r.get(m);
  if (!v) {
    console.warn(
      `Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`
    );
    return;
  }
  (w5(e, o),
    l &&
      !v.parentId &&
      v.internals.rootParentIndex === void 0 &&
      p === "auto" &&
      ((v.internals.rootParentIndex = ++l.i),
      (v.internals.z = v.internals.z + l.i * g5)),
    l &&
      v.internals.rootParentIndex !== void 0 &&
      (l.i = v.internals.rootParentIndex));
  const g = u && !ld(p) ? T0 : 0,
    { x, y: S, z: w } = S5(e, v, c, d, g, p),
    { positionAbsolute: j } = e.internals,
    C = x !== j.x || S !== j.y;
  (C || w !== e.internals.z) &&
    r.set(e.id, {
      ...e,
      internals: {
        ...e.internals,
        positionAbsolute: C ? { x, y: S } : j,
        z: w,
      },
    });
}
function L0(e, r, o) {
  const i = tn(e.zIndex) ? e.zIndex : 0;
  return ld(o) ? i : i + (e.selected ? r : 0);
}
function S5(e, r, o, i, l, u) {
  const { x: c, y: d } = r.internals.positionAbsolute,
    p = Pn(e),
    m = Vs(e, o),
    v = wo(e.extent) ? Mr(m, e.extent, p) : m;
  let g = Mr({ x: c + v.x, y: d + v.y }, i, p);
  e.extent === "parent" && (g = w0(g, p, r));
  const x = L0(e, l, u),
    S = r.internals.z ?? 0;
  return { x: g.x, y: g.y, z: S >= x ? S + 1 : x };
}
function ud(e, r, o, i = [0, 0]) {
  var c;
  const l = [],
    u = new Map();
  for (const d of e) {
    const p = r.get(d.parentId);
    if (!p) continue;
    const m =
        ((c = u.get(d.parentId)) == null ? void 0 : c.expandedRect) ?? vo(p),
      v = E0(m, d.rect);
    u.set(d.parentId, { expandedRect: v, parent: p });
  }
  return (
    u.size > 0 &&
      u.forEach(({ expandedRect: d, parent: p }, m) => {
        var k;
        const v = p.internals.positionAbsolute,
          g = Pn(p),
          x = p.origin ?? i,
          S = d.x < v.x ? Math.round(Math.abs(v.x - d.x)) : 0,
          w = d.y < v.y ? Math.round(Math.abs(v.y - d.y)) : 0,
          j = Math.max(g.width, Math.round(d.width)),
          C = Math.max(g.height, Math.round(d.height)),
          b = (j - g.width) * x[0],
          I = (C - g.height) * x[1];
        ((S > 0 || w > 0 || b || I) &&
          (l.push({
            id: m,
            type: "position",
            position: { x: p.position.x - S + b, y: p.position.y - w + I },
          }),
          (k = o.get(m)) == null ||
            k.forEach((_) => {
              e.some((D) => D.id === _.id) ||
                l.push({
                  id: _.id,
                  type: "position",
                  position: { x: _.position.x + S, y: _.position.y + w },
                });
            })),
          (g.width < d.width || g.height < d.height || S || w) &&
            l.push({
              id: m,
              type: "dimensions",
              setAttributes: !0,
              dimensions: {
                width: j + (S ? x[0] * S - b : 0),
                height: C + (w ? x[1] * w - I : 0),
              },
            }));
      }),
    l
  );
}
function E5(e, r, o, i, l, u, c) {
  const d = i == null ? void 0 : i.querySelector(".xyflow__viewport");
  let p = !1;
  if (!d) return { changes: [], updatedInternals: p };
  const m = [],
    v = window.getComputedStyle(d),
    { m22: g } = new window.DOMMatrixReadOnly(v.transform),
    x = [];
  for (const S of e.values()) {
    const w = r.get(S.id);
    if (!w) continue;
    if (w.hidden) {
      (r.set(w.id, {
        ...w,
        internals: { ...w.internals, handleBounds: void 0 },
      }),
        (p = !0));
      continue;
    }
    const j = od(S.nodeElement),
      C = w.measured.width !== j.width || w.measured.height !== j.height;
    if (
      !!(j.width && j.height && (C || !w.internals.handleBounds || S.force))
    ) {
      const I = S.nodeElement.getBoundingClientRect(),
        k = wo(w.extent) ? w.extent : u;
      let { positionAbsolute: _ } = w.internals;
      w.parentId && w.extent === "parent"
        ? (_ = w0(_, j, r.get(w.parentId)))
        : k && (_ = Mr(_, k, j));
      const D = {
        ...w,
        measured: j,
        internals: {
          ...w.internals,
          positionAbsolute: _,
          handleBounds: {
            source: Ep("source", S.nodeElement, I, g, w.id),
            target: Ep("target", S.nodeElement, I, g, w.id),
          },
        },
      };
      (r.set(w.id, D),
        w.parentId && ad(D, r, o, { nodeOrigin: l, zIndexMode: c }),
        (p = !0),
        C &&
          (m.push({ id: w.id, type: "dimensions", dimensions: j }),
          w.expandParent &&
            w.parentId &&
            x.push({ id: w.id, parentId: w.parentId, rect: vo(D, l) })));
    }
  }
  if (x.length > 0) {
    const S = ud(x, r, o, l);
    m.push(...S);
  }
  return { changes: m, updatedInternals: p };
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
    d = !!c && (c.x !== o[0] || c.y !== o[1] || c.k !== o[2]);
  return Promise.resolve(d);
}
function Ip(e, r, o, i, l, u) {
  let c = l;
  const d = i.get(c) || new Map();
  (i.set(c, d.set(o, r)), (c = `${l}-${e}`));
  const p = i.get(c) || new Map();
  if ((i.set(c, p.set(o, r)), u)) {
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
        targetHandle: d = null,
      } = i,
      p = {
        edgeId: i.id,
        source: l,
        target: u,
        sourceHandle: c,
        targetHandle: d,
      },
      m = `${l}-${c}--${u}-${d}`,
      v = `${u}-${d}--${l}-${c}`;
    (Ip("source", p, v, e, l, c), Ip("target", p, m, e, u, d), r.set(i.id, i));
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
      const d = e.get(u);
      d &&
        l.set(u, {
          id: u,
          position: d.position || { x: 0, y: 0 },
          distance: {
            x: o.x - d.internals.positionAbsolute.x,
            y: o.y - d.internals.positionAbsolute.y,
          },
          extent: d.extent,
          parentId: d.parentId,
          origin: d.origin,
          expandParent: d.expandParent,
          internals: {
            positionAbsolute: d.internals.positionAbsolute || { x: 0, y: 0 },
          },
          measured: {
            width: d.measured.width ?? 0,
            height: d.measured.height ?? 0,
          },
        });
    }
  return l;
}
function sc({ nodeId: e, dragItems: r, nodeLookup: o, dragging: i = !0 }) {
  var c, d, p;
  const l = [];
  for (const [m, v] of r) {
    const g = (c = o.get(m)) == null ? void 0 : c.internals.userNode;
    g && l.push({ ...g, position: v.position, dragging: i });
  }
  if (!e) return [l[0], l];
  const u = (d = o.get(e)) == null ? void 0 : d.internals.userNode;
  return [
    u
      ? {
          ...u,
          position:
            ((p = r.get(e)) == null ? void 0 : p.position) || u.position,
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
    c = Us(u, r);
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
    d = new Map(),
    p = !1,
    m = { x: 0, y: 0 },
    v = null,
    g = !1,
    x = null,
    S = !1,
    w = !1,
    j = null;
  function C({
    noDragClassName: I,
    handleSelector: k,
    domNode: _,
    isSelectable: D,
    nodeId: z,
    nodeClickDistance: R = 0,
  }) {
    x = At(_);
    function H({ x: Y, y: te }) {
      const {
        nodeLookup: L,
        nodeExtent: q,
        snapGrid: B,
        snapToGrid: K,
        nodeOrigin: A,
        onNodeDrag: $,
        onSelectionDrag: U,
        onError: P,
        updateNodePositions: M,
      } = r();
      u = { x: Y, y: te };
      let ne = !1;
      const oe = d.size > 1,
        F = oe && q ? Ic(Ws(d)) : null,
        Q = oe && K ? C5({ dragItems: d, snapGrid: B, x: Y, y: te }) : null;
      for (const [re, G] of d) {
        if (!L.has(re)) continue;
        let se = { x: Y - G.distance.x, y: te - G.distance.y };
        K &&
          (se = Q
            ? { x: Math.round(se.x + Q.x), y: Math.round(se.y + Q.y) }
            : Us(se, B));
        let ce = null;
        if (oe && q && !G.extent && F) {
          const { positionAbsolute: ge } = G.internals,
            Se = ge.x - F.x + q[0][0],
            Pe = ge.x + G.measured.width - F.x2 + q[1][0],
            me = ge.y - F.y + q[0][1],
            Ce = ge.y + G.measured.height - F.y2 + q[1][1];
          ce = [
            [Se, me],
            [Pe, Ce],
          ];
        }
        const { position: fe, positionAbsolute: pe } = v0({
          nodeId: re,
          nextPosition: se,
          nodeLookup: L,
          nodeExtent: ce || q,
          nodeOrigin: A,
          onError: P,
        });
        ((ne = ne || G.position.x !== fe.x || G.position.y !== fe.y),
          (G.position = fe),
          (G.internals.positionAbsolute = pe));
      }
      if (((w = w || ne), !!ne && (M(d, !0), j && (i || $ || (!z && U))))) {
        const [re, G] = sc({ nodeId: z, dragItems: d, nodeLookup: L });
        (i == null || i(j, d, re, G),
          $ == null || $(j, re, G),
          z || U == null || U(j, G));
      }
    }
    async function V() {
      if (!v) return;
      const {
        transform: Y,
        panBy: te,
        autoPanSpeed: L,
        autoPanOnNodeDrag: q,
      } = r();
      if (!q) {
        ((p = !1), cancelAnimationFrame(c));
        return;
      }
      const [B, K] = S0(m, v, L);
      ((B !== 0 || K !== 0) &&
        ((u.x = (u.x ?? 0) - B / Y[2]),
        (u.y = (u.y ?? 0) - K / Y[2]),
        (await te({ x: B, y: K })) && H(u)),
        (c = requestAnimationFrame(V)));
    }
    function ie(Y) {
      var oe;
      const {
        nodeLookup: te,
        multiSelectionActive: L,
        nodesDraggable: q,
        transform: B,
        snapGrid: K,
        snapToGrid: A,
        selectNodesOnDrag: $,
        onNodeDragStart: U,
        onSelectionDragStart: P,
        unselectNodesAndEdges: M,
      } = r();
      ((g = !0),
        (!$ || !D) &&
          !L &&
          z &&
          (((oe = te.get(z)) != null && oe.selected) || M()),
        D && $ && z && (e == null || e(z)));
      const ne = ks(Y.sourceEvent, {
        transform: B,
        snapGrid: K,
        snapToGrid: A,
        containerBounds: v,
      });
      if (
        ((u = ne), (d = N5(te, q, ne, z)), d.size > 0 && (o || U || (!z && P)))
      ) {
        const [F, Q] = sc({ nodeId: z, dragItems: d, nodeLookup: te });
        (o == null || o(Y.sourceEvent, d, F, Q),
          U == null || U(Y.sourceEvent, F, Q),
          z || P == null || P(Y.sourceEvent, Q));
      }
    }
    const X = Jm()
      .clickDistance(R)
      .on("start", (Y) => {
        const {
          domNode: te,
          nodeDragThreshold: L,
          transform: q,
          snapGrid: B,
          snapToGrid: K,
        } = r();
        ((v = (te == null ? void 0 : te.getBoundingClientRect()) || null),
          (S = !1),
          (w = !1),
          (j = Y.sourceEvent),
          L === 0 && ie(Y),
          (u = ks(Y.sourceEvent, {
            transform: q,
            snapGrid: B,
            snapToGrid: K,
            containerBounds: v,
          })),
          (m = nn(Y.sourceEvent, v)));
      })
      .on("drag", (Y) => {
        const {
            autoPanOnNodeDrag: te,
            transform: L,
            snapGrid: q,
            snapToGrid: B,
            nodeDragThreshold: K,
            nodeLookup: A,
          } = r(),
          $ = ks(Y.sourceEvent, {
            transform: L,
            snapGrid: q,
            snapToGrid: B,
            containerBounds: v,
          });
        if (
          ((j = Y.sourceEvent),
          ((Y.sourceEvent.type === "touchmove" &&
            Y.sourceEvent.touches.length > 1) ||
            (z && !A.has(z))) &&
            (S = !0),
          !S)
        ) {
          if ((!p && te && g && ((p = !0), V()), !g)) {
            const U = nn(Y.sourceEvent, v),
              P = U.x - m.x,
              M = U.y - m.y;
            Math.sqrt(P * P + M * M) > K && ie(Y);
          }
          (u.x !== $.xSnapped || u.y !== $.ySnapped) &&
            d &&
            g &&
            ((m = nn(Y.sourceEvent, v)), H($));
        }
      })
      .on("end", (Y) => {
        if (
          !(!g || S) &&
          ((p = !1), (g = !1), cancelAnimationFrame(c), d.size > 0)
        ) {
          const {
            nodeLookup: te,
            updateNodePositions: L,
            onNodeDragStop: q,
            onSelectionDragStop: B,
          } = r();
          if ((w && (L(d, !1), (w = !1)), l || q || (!z && B))) {
            const [K, A] = sc({
              nodeId: z,
              dragItems: d,
              nodeLookup: te,
              dragging: !1,
            });
            (l == null || l(Y.sourceEvent, d, K, A),
              q == null || q(Y.sourceEvent, K, A),
              z || B == null || B(Y.sourceEvent, A));
          }
        }
      })
      .filter((Y) => {
        const te = Y.target;
        return !Y.button && (!I || !Mp(te, `.${I}`, _)) && (!k || Mp(te, k, _));
      });
    x.call(X);
  }
  function b() {
    x == null || x.on(".drag", null);
  }
  return { update: C, destroy: b };
}
function j5(e, r, o) {
  const i = [],
    l = { x: e.x - o, y: e.y - o, width: o * 2, height: o * 2 };
  for (const u of r.values()) zs(l, vo(u)) > 0 && i.push(u);
  return i;
}
const _5 = 250;
function I5(e, r, o, i) {
  var d, p;
  let l = [],
    u = 1 / 0;
  const c = j5(e, o, r + _5);
  for (const m of c) {
    const v = [
      ...(((d = m.internals.handleBounds) == null ? void 0 : d.source) ?? []),
      ...(((p = m.internals.handleBounds) == null ? void 0 : p.target) ?? []),
    ];
    for (const g of v) {
      if (i.nodeId === g.nodeId && i.type === g.type && i.id === g.id) continue;
      const { x, y: S } = Pr(m, g, g.position, !0),
        w = Math.sqrt(Math.pow(x - e.x, 2) + Math.pow(S - e.y, 2));
      w > r ||
        (w < u
          ? ((l = [{ ...g, x, y: S }]), (u = w))
          : w === u && l.push({ ...g, x, y: S }));
    }
  }
  if (!l.length) return null;
  if (l.length > 1) {
    const m = i.type === "source" ? "target" : "source";
    return l.find((v) => v.type === m) ?? l[0];
  }
  return l[0];
}
function $0(e, r, o, i, l, u = !1) {
  var m, v, g;
  const c = i.get(e);
  if (!c) return null;
  const d =
      l === "strict"
        ? (m = c.internals.handleBounds) == null
          ? void 0
          : m[r]
        : [
            ...(((v = c.internals.handleBounds) == null ? void 0 : v.source) ??
              []),
            ...(((g = c.internals.handleBounds) == null ? void 0 : g.target) ??
              []),
          ],
    p =
      (o
        ? d == null
          ? void 0
          : d.find((x) => x.id === o)
        : d == null
          ? void 0
          : d[0]) ?? null;
  return p && u ? { ...p, ...Pr(c, p, p.position, !0) } : p;
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
    domNode: d,
    nodeLookup: p,
    lib: m,
    autoPanOnConnect: v,
    flowId: g,
    panBy: x,
    cancelConnection: S,
    onConnectStart: w,
    onConnect: j,
    onConnectEnd: C,
    isValidConnection: b = O0,
    onReconnectEnd: I,
    updateConnection: k,
    getTransform: _,
    getFromHandle: D,
    autoPanSpeed: z,
    dragThreshold: R = 1,
    handleDomNode: H,
  }
) {
  const V = C0(e.target);
  let ie = 0,
    X;
  const { x: Y, y: te } = nn(e),
    L = D0(u, H),
    q = d == null ? void 0 : d.getBoundingClientRect();
  let B = !1;
  if (!q || !L) return;
  const K = $0(l, L, i, p, r);
  if (!K) return;
  let A = nn(e, q),
    $ = !1,
    U = null,
    P = !1,
    M = null;
  function ne() {
    if (!v || !q) return;
    const [fe, pe] = S0(A, q, z);
    (x({ x: fe, y: pe }), (ie = requestAnimationFrame(ne)));
  }
  const oe = { ...K, nodeId: l, type: L, position: K.position },
    F = p.get(l);
  let re = {
    inProgress: !0,
    isValid: null,
    from: Pr(F, oe, Ne.Left, !0),
    fromHandle: oe,
    fromPosition: oe.position,
    fromNode: F,
    to: A,
    toHandle: null,
    toPosition: xp[oe.position],
    toNode: null,
    pointer: A,
  };
  function G() {
    ((B = !0),
      k(re),
      w == null || w(e, { nodeId: l, handleId: i, handleType: L }));
  }
  R === 0 && G();
  function se(fe) {
    if (!B) {
      const { x: Ce, y: he } = nn(fe),
        _e = Ce - Y,
        De = he - te;
      if (!(_e * _e + De * De > R * R)) return;
      G();
    }
    if (!D() || !oe) {
      ce(fe);
      return;
    }
    const pe = _();
    ((A = nn(fe, q)),
      (X = I5(Ys(A, pe, !1, [1, 1]), o, p, oe)),
      $ || (ne(), ($ = !0)));
    const ge = F0(fe, {
      handle: X,
      connectionMode: r,
      fromNodeId: l,
      fromHandleId: i,
      fromType: c ? "target" : "source",
      isValidConnection: b,
      doc: V,
      lib: m,
      flowId: g,
      nodeLookup: p,
    });
    ((M = ge.handleDomNode), (U = ge.connection), (P = M5(!!X, ge.isValid)));
    const Se = p.get(l),
      Pe = Se ? Pr(Se, oe, Ne.Left, !0) : re.from,
      me = {
        ...re,
        from: Pe,
        isValid: P,
        to:
          ge.toHandle && P ? Fl({ x: ge.toHandle.x, y: ge.toHandle.y }, pe) : A,
        toHandle: ge.toHandle,
        toPosition: P && ge.toHandle ? ge.toHandle.position : xp[oe.position],
        toNode: ge.toHandle ? p.get(ge.toHandle.nodeId) : null,
        pointer: A,
      };
    (k(me), (re = me));
  }
  function ce(fe) {
    if (!("touches" in fe && fe.touches.length > 0)) {
      if (B) {
        (X || M) && U && P && (j == null || j(U));
        const { inProgress: pe, ...ge } = re,
          Se = { ...ge, toPosition: re.toHandle ? re.toPosition : null };
        (C == null || C(fe, Se), u && (I == null || I(fe, Se)));
      }
      (S(),
        cancelAnimationFrame(ie),
        ($ = !1),
        (P = !1),
        (U = null),
        (M = null),
        V.removeEventListener("mousemove", se),
        V.removeEventListener("mouseup", ce),
        V.removeEventListener("touchmove", se),
        V.removeEventListener("touchend", ce));
    }
  }
  (V.addEventListener("mousemove", se),
    V.addEventListener("mouseup", ce),
    V.addEventListener("touchmove", se),
    V.addEventListener("touchend", ce));
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
    lib: d,
    flowId: p,
    isValidConnection: m = O0,
    nodeLookup: v,
  }
) {
  const g = u === "target",
    x = r
      ? c.querySelector(
          `.${d}-flow__handle[data-id="${p}-${r == null ? void 0 : r.nodeId}-${r == null ? void 0 : r.id}-${r == null ? void 0 : r.type}"]`
        )
      : null,
    { x: S, y: w } = nn(e),
    j = c.elementFromPoint(S, w),
    C = j != null && j.classList.contains(`${d}-flow__handle`) ? j : x,
    b = { handleDomNode: C, isValid: !1, connection: null, toHandle: null };
  if (C) {
    const I = D0(void 0, C),
      k = C.getAttribute("data-nodeid"),
      _ = C.getAttribute("data-handleid"),
      D = C.classList.contains("connectable"),
      z = C.classList.contains("connectableend");
    if (!k || !I) return b;
    const R = {
      source: g ? k : i,
      sourceHandle: g ? _ : l,
      target: g ? i : k,
      targetHandle: g ? l : _,
    };
    b.connection = R;
    const V =
      D &&
      z &&
      (o === yo.Strict
        ? (g && I === "source") || (!g && I === "target")
        : k !== i || _ !== l);
    ((b.isValid = V && m(R)), (b.toHandle = $0(k, I, _, v, o, !0)));
  }
  return b;
}
const Tc = { onPointerDown: P5, isValid: F0 };
function R5({ domNode: e, panZoom: r, getTransform: o, getViewScale: i }) {
  const l = At(e);
  function u({
    translateExtent: d,
    width: p,
    height: m,
    zoomStep: v = 1,
    pannable: g = !0,
    zoomable: x = !0,
    inversePan: S = !1,
  }) {
    const w = (k) => {
      if (k.sourceEvent.type !== "wheel" || !r) return;
      const _ = o(),
        D = k.sourceEvent.ctrlKey && As() ? 10 : 1,
        z =
          -k.sourceEvent.deltaY *
          (k.sourceEvent.deltaMode === 1
            ? 0.05
            : k.sourceEvent.deltaMode
              ? 1
              : 0.002) *
          v,
        R = _[2] * Math.pow(2, z * D);
      r.scaleTo(R);
    };
    let j = [0, 0];
    const C = (k) => {
        (k.sourceEvent.type === "mousedown" ||
          k.sourceEvent.type === "touchstart") &&
          (j = [
            k.sourceEvent.clientX ?? k.sourceEvent.touches[0].clientX,
            k.sourceEvent.clientY ?? k.sourceEvent.touches[0].clientY,
          ]);
      },
      b = (k) => {
        const _ = o();
        if (
          (k.sourceEvent.type !== "mousemove" &&
            k.sourceEvent.type !== "touchmove") ||
          !r
        )
          return;
        const D = [
            k.sourceEvent.clientX ?? k.sourceEvent.touches[0].clientX,
            k.sourceEvent.clientY ?? k.sourceEvent.touches[0].clientY,
          ],
          z = [D[0] - j[0], D[1] - j[1]];
        j = D;
        const R = i() * Math.max(_[2], Math.log(_[2])) * (S ? -1 : 1),
          H = { x: _[0] - z[0] * R, y: _[1] - z[1] * R },
          V = [
            [0, 0],
            [p, m],
          ];
        r.setViewportConstrained({ x: H.x, y: H.y, zoom: _[2] }, V, d);
      },
      I = h0()
        .on("start", C)
        .on("zoom", g ? b : null)
        .on("zoom.wheel", x ? w : null);
    l.call(I, {});
  }
  function c() {
    l.on("zoom", null);
  }
  return { update: u, destroy: c, pointer: Zt };
}
const Jl = (e) => ({ x: e.x, y: e.y, zoom: e.k }),
  ic = ({ x: e, y: r, zoom: o }) => Ql.translate(e, r).scale(o),
  co = (e, r) => e.target.closest(`.${r}`),
  H0 = (e, r) => r === 2 && Array.isArray(e) && e.includes(2),
  T5 = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2,
  lc = (e, r = 0, o = T5, i = () => {}) => {
    const l = typeof r == "number" && r > 0;
    return (l || i(), l ? e.transition().duration(r).ease(o).on("end", i) : e);
  },
  B0 = (e) => {
    const r = e.ctrlKey && As() ? 10 : 1;
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
  onPanZoomStart: d,
  onPanZoom: p,
  onPanZoomEnd: m,
}) {
  return (v) => {
    if (co(v, r)) return (v.ctrlKey && v.preventDefault(), !1);
    (v.preventDefault(), v.stopImmediatePropagation());
    const g = o.property("__zoom").k || 1;
    if (v.ctrlKey && c) {
      const C = Zt(v),
        b = B0(v),
        I = g * Math.pow(2, b);
      i.scaleTo(o, I, C, v);
      return;
    }
    const x = v.deltaMode === 1 ? 20 : 1;
    let S = l === jr.Vertical ? 0 : v.deltaX * x,
      w = l === jr.Horizontal ? 0 : v.deltaY * x;
    (!As() && v.shiftKey && l !== jr.Vertical && ((S = v.deltaY * x), (w = 0)),
      i.translateBy(o, -(S / g) * u, -(w / g) * u, { internal: !0 }));
    const j = Jl(o.property("__zoom"));
    (clearTimeout(e.panScrollTimeout),
      e.isPanScrolling
        ? (p == null || p(v, j),
          (e.panScrollTimeout = setTimeout(() => {
            (m == null || m(v, j), (e.isPanScrolling = !1));
          }, 150)))
        : ((e.isPanScrolling = !0), d == null || d(v, j)));
  };
}
function z5({ noWheelClassName: e, preventScrolling: r, d3ZoomHandler: o }) {
  return function (i, l) {
    const u = i.type === "wheel",
      c = !r && u && !i.ctrlKey,
      d = co(i, e);
    if ((i.ctrlKey && u && d && i.preventDefault(), c || d)) return null;
    (i.preventDefault(), o.call(this, i, l));
  };
}
function A5({ zoomPanValues: e, onDraggingChange: r, onPanZoomStart: o }) {
  return (i) => {
    var u, c, d;
    if ((u = i.sourceEvent) != null && u.internal) return;
    const l = Jl(i.transform);
    ((e.mouseButton = ((c = i.sourceEvent) == null ? void 0 : c.button) || 0),
      (e.isZoomingOrPanning = !0),
      (e.prevViewport = l),
      ((d = i.sourceEvent) == null ? void 0 : d.type) === "mousedown" && r(!0),
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
    var c, d;
    ((e.usedRightMouseButton = !!(o && H0(r, e.mouseButton ?? 0))),
      ((c = u.sourceEvent) != null && c.sync) ||
        i([u.transform.x, u.transform.y, u.transform.k]),
      l &&
        !((d = u.sourceEvent) != null && d.internal) &&
        (l == null || l(u.sourceEvent, Jl(u.transform))));
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
    var d;
    if (
      !((d = c.sourceEvent) != null && d.internal) &&
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
      const p = Jl(c.transform);
      ((e.prevViewport = p),
        clearTimeout(e.timerId),
        (e.timerId = setTimeout(
          () => {
            l == null || l(c.sourceEvent, p);
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
  noWheelClassName: d,
  noPanClassName: p,
  lib: m,
  connectionInProgress: v,
}) {
  return (g) => {
    var C;
    const x = e || r,
      S = o && g.ctrlKey,
      w = g.type === "wheel";
    if (
      g.button === 1 &&
      g.type === "mousedown" &&
      (co(g, `${m}-flow__node`) || co(g, `${m}-flow__edge`))
    )
      return !0;
    if (
      (!i && !x && !l && !u && !o) ||
      c ||
      (v && !w) ||
      (co(g, d) && w) ||
      (co(g, p) && (!w || (l && w && !e))) ||
      (!o && g.ctrlKey && w)
    )
      return !1;
    if (
      !o &&
      g.type === "touchstart" &&
      ((C = g.touches) == null ? void 0 : C.length) > 1
    )
      return (g.preventDefault(), !1);
    if (
      (!x && !l && !S && w) ||
      (!i && (g.type === "mousedown" || g.type === "touchstart")) ||
      (Array.isArray(i) && !i.includes(g.button) && g.type === "mousedown")
    )
      return !1;
    const j =
      (Array.isArray(i) && i.includes(g.button)) || !g.button || g.button <= 1;
    return (!g.ctrlKey || w) && j;
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
  onPanZoomEnd: d,
  onDraggingChange: p,
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
    v = e.getBoundingClientRect(),
    g = h0().scaleExtent([r, o]).translateExtent(i),
    x = At(e).call(g);
  I(
    { x: l.x, y: l.y, zoom: xo(l.zoom, r, o) },
    [
      [0, 0],
      [v.width, v.height],
    ],
    i
  );
  const S = x.on("wheel.zoom"),
    w = x.on("dblclick.zoom");
  g.wheelDelta(B0);
  function j(X, Y) {
    return x
      ? new Promise((te) => {
          g == null ||
            g
              .interpolate(
                (Y == null ? void 0 : Y.interpolate) === "linear" ? Es : Cl
              )
              .transform(
                lc(
                  x,
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
    panOnScroll: q,
    panOnDrag: B,
    panOnScrollMode: K,
    panOnScrollSpeed: A,
    preventScrolling: $,
    zoomOnPinch: U,
    zoomOnScroll: P,
    zoomOnDoubleClick: M,
    zoomActivationKeyPressed: ne,
    lib: oe,
    onTransformChange: F,
    connectionInProgress: Q,
    paneClickDistance: re,
    selectionOnDrag: G,
  }) {
    L && !m.isZoomingOrPanning && b();
    const se = q && !ne && !L;
    g.clickDistance(G ? 1 / 0 : !tn(re) || re < 0 ? 0 : re);
    const ce = se
      ? L5({
          zoomPanValues: m,
          noWheelClassName: X,
          d3Selection: x,
          d3Zoom: g,
          panOnScrollMode: K,
          panOnScrollSpeed: A,
          zoomOnPinch: U,
          onPanZoomStart: c,
          onPanZoom: u,
          onPanZoomEnd: d,
        })
      : z5({ noWheelClassName: X, preventScrolling: $, d3ZoomHandler: S });
    if ((x.on("wheel.zoom", ce, { passive: !1 }), !L)) {
      const pe = A5({
        zoomPanValues: m,
        onDraggingChange: p,
        onPanZoomStart: c,
      });
      g.on("start", pe);
      const ge = $5({
        zoomPanValues: m,
        panOnDrag: B,
        onPaneContextMenu: !!te,
        onPanZoom: u,
        onTransformChange: F,
      });
      g.on("zoom", ge);
      const Se = D5({
        zoomPanValues: m,
        panOnDrag: B,
        panOnScroll: q,
        onPaneContextMenu: te,
        onPanZoomEnd: d,
        onDraggingChange: p,
      });
      g.on("end", Se);
    }
    const fe = O5({
      zoomActivationKeyPressed: ne,
      panOnDrag: B,
      zoomOnScroll: P,
      panOnScroll: q,
      zoomOnDoubleClick: M,
      zoomOnPinch: U,
      userSelectionActive: L,
      noPanClassName: Y,
      noWheelClassName: X,
      lib: oe,
      connectionInProgress: Q,
    });
    (g.filter(fe), M ? x.on("dblclick.zoom", w) : x.on("dblclick.zoom", null));
  }
  function b() {
    g.on("zoom", null);
  }
  async function I(X, Y, te) {
    const L = ic(X),
      q = g == null ? void 0 : g.constrain()(L, Y, te);
    return (q && (await j(q)), new Promise((B) => B(q)));
  }
  async function k(X, Y) {
    const te = ic(X);
    return (await j(te, Y), new Promise((L) => L(te)));
  }
  function _(X) {
    if (x) {
      const Y = ic(X),
        te = x.property("__zoom");
      (te.k !== X.zoom || te.x !== X.x || te.y !== X.y) &&
        (g == null || g.transform(x, Y, null, { sync: !0 }));
    }
  }
  function D() {
    const X = x ? f0(x.node()) : { x: 0, y: 0, k: 1 };
    return { x: X.x, y: X.y, zoom: X.k };
  }
  function z(X, Y) {
    return x
      ? new Promise((te) => {
          g == null ||
            g
              .interpolate(
                (Y == null ? void 0 : Y.interpolate) === "linear" ? Es : Cl
              )
              .scaleTo(
                lc(
                  x,
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
    return x
      ? new Promise((te) => {
          g == null ||
            g
              .interpolate(
                (Y == null ? void 0 : Y.interpolate) === "linear" ? Es : Cl
              )
              .scaleBy(
                lc(
                  x,
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
    g == null || g.scaleExtent(X);
  }
  function V(X) {
    g == null || g.translateExtent(X);
  }
  function ie(X) {
    const Y = !tn(X) || X < 0 ? 0 : X;
    g == null || g.clickDistance(Y);
  }
  return {
    update: C,
    destroy: b,
    setViewport: k,
    setViewportConstrained: I,
    getViewport: D,
    scaleTo: z,
    scaleBy: R,
    setScaleExtent: H,
    setTranslateExtent: V,
    syncViewport: _,
    setClickDistance: ie,
  };
}
var So;
(function (e) {
  ((e.Line = "line"), (e.Handle = "handle"));
})(So || (So = {}));
function H5({
  width: e,
  prevWidth: r,
  height: o,
  prevHeight: i,
  affectsX: l,
  affectsY: u,
}) {
  const c = e - r,
    d = o - i,
    p = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return (c && l && (p[0] = p[0] * -1), d && u && (p[1] = p[1] * -1), p);
}
function Pp(e) {
  const r = e.includes("right") || e.includes("left"),
    o = e.includes("bottom") || e.includes("top"),
    i = e.includes("left"),
    l = e.includes("top");
  return { isHorizontal: r, isVertical: o, affectsX: i, affectsY: l };
}
function Zn(e, r) {
  return Math.max(0, r - e);
}
function er(e, r) {
  return Math.max(0, e - r);
}
function gl(e, r, o) {
  return Math.max(0, r - e, e - o);
}
function Rp(e, r) {
  return e ? !r : r;
}
function B5(e, r, o, i, l, u, c, d) {
  let { affectsX: p, affectsY: m } = r;
  const { isHorizontal: v, isVertical: g } = r,
    x = v && g,
    { xSnapped: S, ySnapped: w } = o,
    { minWidth: j, maxWidth: C, minHeight: b, maxHeight: I } = i,
    { x: k, y: _, width: D, height: z, aspectRatio: R } = e;
  let H = Math.floor(v ? S - e.pointerX : 0),
    V = Math.floor(g ? w - e.pointerY : 0);
  const ie = D + (p ? -H : H),
    X = z + (m ? -V : V),
    Y = -u[0] * D,
    te = -u[1] * z;
  let L = gl(ie, j, C),
    q = gl(X, b, I);
  if (c) {
    let A = 0,
      $ = 0;
    (p && H < 0
      ? (A = Zn(k + H + Y, c[0][0]))
      : !p && H > 0 && (A = er(k + ie + Y, c[1][0])),
      m && V < 0
        ? ($ = Zn(_ + V + te, c[0][1]))
        : !m && V > 0 && ($ = er(_ + X + te, c[1][1])),
      (L = Math.max(L, A)),
      (q = Math.max(q, $)));
  }
  if (d) {
    let A = 0,
      $ = 0;
    (p && H > 0
      ? (A = er(k + H, d[0][0]))
      : !p && H < 0 && (A = Zn(k + ie, d[1][0])),
      m && V > 0
        ? ($ = er(_ + V, d[0][1]))
        : !m && V < 0 && ($ = Zn(_ + X, d[1][1])),
      (L = Math.max(L, A)),
      (q = Math.max(q, $)));
  }
  if (l) {
    if (v) {
      const A = gl(ie / R, b, I) * R;
      if (((L = Math.max(L, A)), c)) {
        let $ = 0;
        ((!p && !m) || (p && !m && x)
          ? ($ = er(_ + te + ie / R, c[1][1]) * R)
          : ($ = Zn(_ + te + (p ? H : -H) / R, c[0][1]) * R),
          (L = Math.max(L, $)));
      }
      if (d) {
        let $ = 0;
        ((!p && !m) || (p && !m && x)
          ? ($ = Zn(_ + ie / R, d[1][1]) * R)
          : ($ = er(_ + (p ? H : -H) / R, d[0][1]) * R),
          (L = Math.max(L, $)));
      }
    }
    if (g) {
      const A = gl(X * R, j, C) / R;
      if (((q = Math.max(q, A)), c)) {
        let $ = 0;
        ((!p && !m) || (m && !p && x)
          ? ($ = er(k + X * R + Y, c[1][0]) / R)
          : ($ = Zn(k + (m ? V : -V) * R + Y, c[0][0]) / R),
          (q = Math.max(q, $)));
      }
      if (d) {
        let $ = 0;
        ((!p && !m) || (m && !p && x)
          ? ($ = Zn(k + X * R, d[1][0]) / R)
          : ($ = er(k + (m ? V : -V) * R, d[0][0]) / R),
          (q = Math.max(q, $)));
      }
    }
  }
  ((V = V + (V < 0 ? q : -q)),
    (H = H + (H < 0 ? L : -L)),
    l &&
      (x
        ? ie > X * R
          ? (V = (Rp(p, m) ? -H : H) / R)
          : (H = (Rp(p, m) ? -V : V) * R)
        : v
          ? ((V = H / R), (m = p))
          : ((H = V * R), (p = m))));
  const B = p ? k + H : k,
    K = m ? _ + V : _;
  return {
    width: D + (p ? -H : H),
    height: z + (m ? -V : V),
    x: u[0] * H * (p ? -1 : 1) + B,
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
    d = o[0] * u,
    p = o[1] * c;
  return [
    [i - d, l - p],
    [i + u - d, l + c - p],
  ];
}
function Y5({
  domNode: e,
  nodeId: r,
  getStoreItems: o,
  onChange: i,
  onEnd: l,
}) {
  const u = At(e);
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
  function d({
    controlPosition: m,
    boundaries: v,
    keepAspectRatio: g,
    resizeDirection: x,
    onResizeStart: S,
    onResize: w,
    onResizeEnd: j,
    shouldResize: C,
  }) {
    let b = { ...V0 },
      I = { ...V5 };
    c = {
      boundaries: v,
      resizeDirection: x,
      keepAspectRatio: g,
      controlDirection: Pp(m),
    };
    let k,
      _ = null,
      D = [],
      z,
      R,
      H,
      V = !1;
    const ie = Jm()
      .on("start", (X) => {
        const {
          nodeLookup: Y,
          transform: te,
          snapGrid: L,
          snapToGrid: q,
          nodeOrigin: B,
          paneDomNode: K,
        } = o();
        if (((k = Y.get(r)), !k)) return;
        _ = (K == null ? void 0 : K.getBoundingClientRect()) ?? null;
        const { xSnapped: A, ySnapped: $ } = ks(X.sourceEvent, {
          transform: te,
          snapGrid: L,
          snapToGrid: q,
          containerBounds: _,
        });
        ((b = {
          width: k.measured.width ?? 0,
          height: k.measured.height ?? 0,
          x: k.position.x ?? 0,
          y: k.position.y ?? 0,
        }),
          (I = {
            ...b,
            pointerX: A,
            pointerY: $,
            aspectRatio: b.width / b.height,
          }),
          (z = void 0),
          k.parentId &&
            (k.extent === "parent" || k.expandParent) &&
            ((z = Y.get(k.parentId)),
            (R = z && k.extent === "parent" ? W5(z) : void 0)),
          (D = []),
          (H = void 0));
        for (const [U, P] of Y)
          if (
            P.parentId === r &&
            (D.push({ id: U, position: { ...P.position }, extent: P.extent }),
            P.extent === "parent" || P.expandParent)
          ) {
            const M = U5(P, k, P.origin ?? B);
            H
              ? (H = [
                  [Math.min(M[0][0], H[0][0]), Math.min(M[0][1], H[0][1])],
                  [Math.max(M[1][0], H[1][0]), Math.max(M[1][1], H[1][1])],
                ])
              : (H = M);
          }
        S == null || S(X, { ...b });
      })
      .on("drag", (X) => {
        const {
            transform: Y,
            snapGrid: te,
            snapToGrid: L,
            nodeOrigin: q,
          } = o(),
          B = ks(X.sourceEvent, {
            transform: Y,
            snapGrid: te,
            snapToGrid: L,
            containerBounds: _,
          }),
          K = [];
        if (!k) return;
        const { x: A, y: $, width: U, height: P } = b,
          M = {},
          ne = k.origin ?? q,
          {
            width: oe,
            height: F,
            x: Q,
            y: re,
          } = B5(
            I,
            c.controlDirection,
            B,
            c.boundaries,
            c.keepAspectRatio,
            ne,
            R,
            H
          ),
          G = oe !== U,
          se = F !== P,
          ce = Q !== A && G,
          fe = re !== $ && se;
        if (!ce && !fe && !G && !se) return;
        if (
          (ce || fe || ne[0] === 1 || ne[1] === 1) &&
          ((M.x = ce ? Q : b.x),
          (M.y = fe ? re : b.y),
          (b.x = M.x),
          (b.y = M.y),
          D.length > 0)
        ) {
          const Pe = Q - A,
            me = re - $;
          for (const Ce of D)
            ((Ce.position = {
              x: Ce.position.x - Pe + ne[0] * (oe - U),
              y: Ce.position.y - me + ne[1] * (F - P),
            }),
              K.push(Ce));
        }
        if (
          ((G || se) &&
            ((M.width =
              G && (!c.resizeDirection || c.resizeDirection === "horizontal")
                ? oe
                : b.width),
            (M.height =
              se && (!c.resizeDirection || c.resizeDirection === "vertical")
                ? F
                : b.height),
            (b.width = M.width),
            (b.height = M.height)),
          z && k.expandParent)
        ) {
          const Pe = ne[0] * (M.width ?? 0);
          M.x && M.x < Pe && ((b.x = Pe), (I.x = I.x - (M.x - Pe)));
          const me = ne[1] * (M.height ?? 0);
          M.y && M.y < me && ((b.y = me), (I.y = I.y - (M.y - me)));
        }
        const pe = H5({
            width: b.width,
            prevWidth: U,
            height: b.height,
            prevHeight: P,
            affectsX: c.controlDirection.affectsX,
            affectsY: c.controlDirection.affectsY,
          }),
          ge = { ...b, direction: pe };
        (C == null ? void 0 : C(X, ge)) !== !1 &&
          ((V = !0), w == null || w(X, ge), i(M, K));
      })
      .on("end", (X) => {
        V && (j == null || j(X, { ...b }), l == null || l({ ...b }), (V = !1));
      });
    u.call(ie);
  }
  function p() {
    u.on(".drag", null);
  }
  return { update: d, destroy: p };
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
  var e = Ds();
  function r(g, x) {
    return (g === x && (g !== 0 || 1 / g === 1 / x)) || (g !== g && x !== x);
  }
  var o = typeof Object.is == "function" ? Object.is : r,
    i = e.useState,
    l = e.useEffect,
    u = e.useLayoutEffect,
    c = e.useDebugValue;
  function d(g, x) {
    var S = x(),
      w = i({ inst: { value: S, getSnapshot: x } }),
      j = w[0].inst,
      C = w[1];
    return (
      u(
        function () {
          ((j.value = S), (j.getSnapshot = x), p(j) && C({ inst: j }));
        },
        [g, S, x]
      ),
      l(
        function () {
          return (
            p(j) && C({ inst: j }),
            g(function () {
              p(j) && C({ inst: j });
            })
          );
        },
        [g]
      ),
      c(S),
      S
    );
  }
  function p(g) {
    var x = g.getSnapshot;
    g = g.value;
    try {
      var S = x();
      return !o(g, S);
    } catch {
      return !0;
    }
  }
  function m(g, x) {
    return x();
  }
  var v =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? m
      : d;
  return (
    (dc.useSyncExternalStore =
      e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : v),
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
  var e = Ds(),
    r = K5();
  function o(m, v) {
    return (m === v && (m !== 0 || 1 / m === 1 / v)) || (m !== m && v !== v);
  }
  var i = typeof Object.is == "function" ? Object.is : o,
    l = r.useSyncExternalStore,
    u = e.useRef,
    c = e.useEffect,
    d = e.useMemo,
    p = e.useDebugValue;
  return (
    (uc.useSyncExternalStoreWithSelector = function (m, v, g, x, S) {
      var w = u(null);
      if (w.current === null) {
        var j = { hasValue: !1, value: null };
        w.current = j;
      } else j = w.current;
      w = d(
        function () {
          function b(z) {
            if (!I) {
              if (((I = !0), (k = z), (z = x(z)), S !== void 0 && j.hasValue)) {
                var R = j.value;
                if (S(R, z)) return (_ = R);
              }
              return (_ = z);
            }
            if (((R = _), i(k, z))) return R;
            var H = x(z);
            return S !== void 0 && S(R, H) ? ((k = z), R) : ((k = z), (_ = H));
          }
          var I = !1,
            k,
            _,
            D = g === void 0 ? null : g;
          return [
            function () {
              return b(v());
            },
            D === null
              ? void 0
              : function () {
                  return b(D());
                },
          ];
        },
        [v, g, x, S]
      );
      var C = l(m, w[0], w[1]);
      return (
        c(
          function () {
            ((j.hasValue = !0), (j.value = C));
          },
          [C]
        ),
        p(C),
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
const J5 = $c(q5),
  Z5 = {},
  $p = (e) => {
    let r;
    const o = new Set(),
      i = (v, g) => {
        const x = typeof v == "function" ? v(r) : v;
        if (!Object.is(x, r)) {
          const S = r;
          ((r =
            (g ?? (typeof x != "object" || x === null))
              ? x
              : Object.assign({}, r, x)),
            o.forEach((w) => w(r, S)));
        }
      },
      l = () => r,
      p = {
        setState: i,
        getState: l,
        getInitialState: () => m,
        subscribe: (v) => (o.add(v), () => o.delete(v)),
        destroy: () => {
          ((Z5 ? "production" : void 0) !== "production" &&
            console.warn(
              "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
            ),
            o.clear());
        },
      },
      m = (r = e(i, l, p));
    return p;
  },
  eE = (e) => (e ? $p(e) : $p),
  { useDebugValue: tE } = uo,
  { useSyncExternalStoreWithSelector: nE } = J5,
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
function Xe(e, r) {
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
const Zl = E.createContext(null),
  sE = Zl.Provider,
  U0 = hn.error001();
function ze(e, r) {
  const o = E.useContext(Zl);
  if (o === null) throw new Error(U0);
  return W0(o, e, r);
}
function Ke() {
  const e = E.useContext(Zl);
  if (e === null) throw new Error(U0);
  return E.useMemo(
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
  const r = ze(aE);
  return h.jsx("div", {
    id: `${lE}-${e}`,
    "aria-live": "assertive",
    "aria-atomic": "true",
    style: iE,
    children: r,
  });
}
function dE({ rfId: e, disableKeyboardA11y: r }) {
  const o = ze(uE);
  return h.jsxs(h.Fragment, {
    children: [
      h.jsx("div", {
        id: `${Y0}-${e}`,
        style: Op,
        children: r
          ? o["node.a11yDescription.default"]
          : o["node.a11yDescription.keyboardDisabled"],
      }),
      h.jsx("div", {
        id: `${X0}-${e}`,
        style: Op,
        children: o["edge.a11yDescription.default"],
      }),
      !r && h.jsx(cE, { rfId: e }),
    ],
  });
}
const ea = E.forwardRef(
  (
    { position: e = "top-left", children: r, className: o, style: i, ...l },
    u
  ) => {
    const c = `${e}`.split("-");
    return h.jsx("div", {
      className: nt(["react-flow__panel", o, ...c]),
      style: i,
      ref: u,
      ...l,
      children: r,
    });
  }
);
ea.displayName = "Panel";
function fE({ proOptions: e, position: r = "bottom-right" }) {
  return e != null && e.hideAttribution
    ? null
    : h.jsx(ea, {
        position: r,
        className: "react-flow__attribution",
        "data-message":
          "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev",
        children: h.jsx("a", {
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
  yl = (e) => e.id;
function pE(e, r) {
  return (
    Xe(e.selectedNodes.map(yl), r.selectedNodes.map(yl)) &&
    Xe(e.selectedEdges.map(yl), r.selectedEdges.map(yl))
  );
}
function mE({ onSelectionChange: e }) {
  const r = Ke(),
    { selectedNodes: o, selectedEdges: i } = ze(hE, pE);
  return (
    E.useEffect(() => {
      const l = { nodes: o, edges: i };
      (e == null || e(l),
        r.getState().onSelectionChangeHandlers.forEach((u) => u(l)));
    }, [o, i, e]),
    null
  );
}
const gE = (e) => !!e.onSelectionChangeHandlers;
function yE({ onSelectionChange: e }) {
  const r = ze(gE);
  return e || r ? h.jsx(mE, { onSelectionChange: e }) : null;
}
const K0 = [0, 0],
  xE = { x: 0, y: 0, zoom: 1 },
  vE = [
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
  Fp = [...vE, "rfId"],
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
    translateExtent: Ts,
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
      reset: d,
      setDefaultNodesAndEdges: p,
    } = ze(wE, Xe),
    m = Ke();
  E.useEffect(
    () => (
      p(e.defaultNodes, e.defaultEdges),
      () => {
        ((v.current = Hp), d());
      }
    ),
    []
  );
  const v = E.useRef(Hp);
  return (
    E.useEffect(
      () => {
        for (const g of Fp) {
          const x = e[g],
            S = v.current[g];
          x !== S &&
            (typeof e[g] > "u" ||
              (g === "nodes"
                ? r(x)
                : g === "edges"
                  ? o(x)
                  : g === "minZoom"
                    ? i(x)
                    : g === "maxZoom"
                      ? l(x)
                      : g === "translateExtent"
                        ? u(x)
                        : g === "nodeExtent"
                          ? c(x)
                          : g === "ariaLabelConfig"
                            ? m.setState({ ariaLabelConfig: s5(x) })
                            : g === "fitView"
                              ? m.setState({ fitViewQueued: x })
                              : g === "fitViewOptions"
                                ? m.setState({ fitViewOptions: x })
                                : m.setState({ [g]: x })));
        }
        v.current = e;
      },
      Fp.map((g) => e[g])
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
  const [r, o] = E.useState(e === "system" ? null : e);
  return (
    E.useEffect(() => {
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
function $s(e = null, r = { target: Vp, actInsideInputWithModifier: !0 }) {
  const [o, i] = E.useState(!1),
    l = E.useRef(!1),
    u = E.useRef(new Set([])),
    [c, d] = E.useMemo(() => {
      if (e !== null) {
        const m = (Array.isArray(e) ? e : [e])
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
          v = m.reduce((g, x) => g.concat(...x), []);
        return [m, v];
      }
      return [[], []];
    }, [e]);
  return (
    E.useEffect(() => {
      const p = (r == null ? void 0 : r.target) ?? Vp,
        m = (r == null ? void 0 : r.actInsideInputWithModifier) ?? !0;
      if (e !== null) {
        const v = (S) => {
            var C, b;
            if (
              ((l.current = S.ctrlKey || S.metaKey || S.shiftKey || S.altKey),
              (!l.current || (l.current && !m)) && b0(S))
            )
              return !1;
            const j = Up(S.code, d);
            if ((u.current.add(S[j]), Wp(c, u.current, !1))) {
              const I =
                  ((b = (C = S.composedPath) == null ? void 0 : C.call(S)) ==
                  null
                    ? void 0
                    : b[0]) || S.target,
                k =
                  (I == null ? void 0 : I.nodeName) === "BUTTON" ||
                  (I == null ? void 0 : I.nodeName) === "A";
              (r.preventDefault !== !1 &&
                (l.current || !k) &&
                S.preventDefault(),
                i(!0));
            }
          },
          g = (S) => {
            const w = Up(S.code, d);
            (Wp(c, u.current, !0)
              ? (i(!1), u.current.clear())
              : u.current.delete(S[w]),
              S.key === "Meta" && u.current.clear(),
              (l.current = !1));
          },
          x = () => {
            (u.current.clear(), i(!1));
          };
        return (
          p == null || p.addEventListener("keydown", v),
          p == null || p.addEventListener("keyup", g),
          window.addEventListener("blur", x),
          window.addEventListener("contextmenu", x),
          () => {
            (p == null || p.removeEventListener("keydown", v),
              p == null || p.removeEventListener("keyup", g),
              window.removeEventListener("blur", x),
              window.removeEventListener("contextmenu", x));
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
  const e = Ke();
  return E.useMemo(
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
            panZoom: d,
          } = e.getState(),
          p = rd(r, i, l, u, c, (o == null ? void 0 : o.padding) ?? 0.1);
        return d
          ? (await d.setViewport(p, {
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
        const { x: d, y: p } = c.getBoundingClientRect(),
          m = { x: r.x - d, y: r.y - p },
          v = o.snapGrid ?? l,
          g = o.snapToGrid ?? u;
        return Ys(m, i, g, v);
      },
      flowToScreenPosition: (r) => {
        const { transform: o, domNode: i } = e.getState();
        if (!i) return r;
        const { x: l, y: u } = i.getBoundingClientRect(),
          c = Fl(r, o);
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
    const d = { ...u };
    for (const p of c) NE(p, d);
    o.push(d);
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
function kr(e, r) {
  return { id: e, type: "select", selected: r };
}
function fo(e, r = new Set(), o = !1) {
  const i = [];
  for (const [l, u] of e) {
    const c = r.has(l);
    !(u.selected === void 0 && !c) &&
      u.selected !== c &&
      (o && (u.selected = c), i.push(kr(u.id, c)));
  }
  return i;
}
function Yp({ items: e = [], lookup: r }) {
  var l;
  const o = [],
    i = new Map(e.map((u) => [u.id, u]));
  for (const [u, c] of e.entries()) {
    const d = r.get(c.id),
      p =
        ((l = d == null ? void 0 : d.internals) == null
          ? void 0
          : l.userNode) ?? d;
    (p !== void 0 && p !== c && o.push({ id: c.id, item: c, type: "replace" }),
      p === void 0 && o.push({ item: c, type: "add", index: u }));
  }
  for (const [u] of r) i.get(u) === void 0 && o.push({ id: u, type: "remove" });
  return o;
}
function Xp(e) {
  return { id: e.id, type: "remove" };
}
const Kp = (e) => QS(e),
  CE = (e) => x0(e);
function J0(e) {
  return E.forwardRef(e);
}
const bE = typeof window < "u" ? E.useLayoutEffect : E.useEffect;
function Qp(e) {
  const [r, o] = E.useState(BigInt(0)),
    [i] = E.useState(() => jE(() => o((l) => l + BigInt(1))));
  return (
    bE(() => {
      const l = i.get();
      l.length && (e(l), i.reset());
    }, [r]),
    i
  );
}
function jE(e) {
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
const Z0 = E.createContext(null);
function _E({ children: e }) {
  const r = Ke(),
    o = E.useCallback((d) => {
      const {
        nodes: p = [],
        setNodes: m,
        hasDefaultNodes: v,
        onNodesChange: g,
        nodeLookup: x,
        fitViewQueued: S,
        onNodesChangeMiddlewareMap: w,
      } = r.getState();
      let j = p;
      for (const b of d) j = typeof b == "function" ? b(j) : b;
      let C = Yp({ items: j, lookup: x });
      for (const b of w.values()) C = b(C);
      (v && m(j),
        C.length > 0
          ? g == null || g(C)
          : S &&
            window.requestAnimationFrame(() => {
              const { fitViewQueued: b, nodes: I, setNodes: k } = r.getState();
              b && k(I);
            }));
    }, []),
    i = Qp(o),
    l = E.useCallback((d) => {
      const {
        edges: p = [],
        setEdges: m,
        hasDefaultEdges: v,
        onEdgesChange: g,
        edgeLookup: x,
      } = r.getState();
      let S = p;
      for (const w of d) S = typeof w == "function" ? w(S) : w;
      v ? m(S) : g && g(Yp({ items: S, lookup: x }));
    }, []),
    u = Qp(l),
    c = E.useMemo(() => ({ nodeQueue: i, edgeQueue: u }), []);
  return h.jsx(Z0.Provider, { value: c, children: e });
}
function IE() {
  const e = E.useContext(Z0);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const ME = (e) => !!e.panZoom;
function cd() {
  const e = kE(),
    r = Ke(),
    o = IE(),
    i = ze(ME),
    l = E.useMemo(() => {
      const u = (g) => r.getState().nodeLookup.get(g),
        c = (g) => {
          o.nodeQueue.push(g);
        },
        d = (g) => {
          o.edgeQueue.push(g);
        },
        p = (g) => {
          var b, I;
          const { nodeLookup: x, nodeOrigin: S } = r.getState(),
            w = Kp(g) ? g : x.get(g.id),
            j = w.parentId
              ? N0(w.position, w.measured, w.parentId, x, S)
              : w.position,
            C = {
              ...w,
              position: j,
              width: ((b = w.measured) == null ? void 0 : b.width) ?? w.width,
              height:
                ((I = w.measured) == null ? void 0 : I.height) ?? w.height,
            };
          return vo(C);
        },
        m = (g, x, S = { replace: !1 }) => {
          c((w) =>
            w.map((j) => {
              if (j.id === g) {
                const C = typeof x == "function" ? x(j) : x;
                return S.replace && Kp(C) ? C : { ...j, ...C };
              }
              return j;
            })
          );
        },
        v = (g, x, S = { replace: !1 }) => {
          d((w) =>
            w.map((j) => {
              if (j.id === g) {
                const C = typeof x == "function" ? x(j) : x;
                return S.replace && CE(C) ? C : { ...j, ...C };
              }
              return j;
            })
          );
        };
      return {
        getNodes: () => r.getState().nodes.map((g) => ({ ...g })),
        getNode: (g) => {
          var x;
          return (x = u(g)) == null ? void 0 : x.internals.userNode;
        },
        getInternalNode: u,
        getEdges: () => {
          const { edges: g = [] } = r.getState();
          return g.map((x) => ({ ...x }));
        },
        getEdge: (g) => r.getState().edgeLookup.get(g),
        setNodes: c,
        setEdges: d,
        addNodes: (g) => {
          const x = Array.isArray(g) ? g : [g];
          o.nodeQueue.push((S) => [...S, ...x]);
        },
        addEdges: (g) => {
          const x = Array.isArray(g) ? g : [g];
          o.edgeQueue.push((S) => [...S, ...x]);
        },
        toObject: () => {
          const { nodes: g = [], edges: x = [], transform: S } = r.getState(),
            [w, j, C] = S;
          return {
            nodes: g.map((b) => ({ ...b })),
            edges: x.map((b) => ({ ...b })),
            viewport: { x: w, y: j, zoom: C },
          };
        },
        deleteElements: async ({ nodes: g = [], edges: x = [] }) => {
          const {
              nodes: S,
              edges: w,
              onNodesDelete: j,
              onEdgesDelete: C,
              triggerNodeChanges: b,
              triggerEdgeChanges: I,
              onDelete: k,
              onBeforeDelete: _,
            } = r.getState(),
            { nodes: D, edges: z } = await e5({
              nodesToRemove: g,
              edgesToRemove: x,
              nodes: S,
              edges: w,
              onBeforeDelete: _,
            }),
            R = z.length > 0,
            H = D.length > 0;
          if (R) {
            const V = z.map(Xp);
            (C == null || C(z), I(V));
          }
          if (H) {
            const V = D.map(Xp);
            (j == null || j(D), b(V));
          }
          return (
            (H || R) && (k == null || k({ nodes: D, edges: z })),
            { deletedNodes: D, deletedEdges: z }
          );
        },
        getIntersectingNodes: (g, x = !0, S) => {
          const w = wp(g),
            j = w ? g : p(g),
            C = S !== void 0;
          return j
            ? (S || r.getState().nodes).filter((b) => {
                const I = r.getState().nodeLookup.get(b.id);
                if (I && !w && (b.id === g.id || !I.internals.positionAbsolute))
                  return !1;
                const k = vo(C ? b : I),
                  _ = zs(k, j);
                return (
                  (x && _ > 0) ||
                  _ >= k.width * k.height ||
                  _ >= j.width * j.height
                );
              })
            : [];
        },
        isNodeIntersecting: (g, x, S = !0) => {
          const j = wp(g) ? g : p(g);
          if (!j) return !1;
          const C = zs(j, x);
          return (
            (S && C > 0) || C >= x.width * x.height || C >= j.width * j.height
          );
        },
        updateNode: m,
        updateNodeData: (g, x, S = { replace: !1 }) => {
          m(
            g,
            (w) => {
              const j = typeof x == "function" ? x(w) : x;
              return S.replace
                ? { ...w, data: j }
                : { ...w, data: { ...w.data, ...j } };
            },
            S
          );
        },
        updateEdge: v,
        updateEdgeData: (g, x, S = { replace: !1 }) => {
          v(
            g,
            (w) => {
              const j = typeof x == "function" ? x(w) : x;
              return S.replace
                ? { ...w, data: j }
                : { ...w, data: { ...w.data, ...j } };
            },
            S
          );
        },
        getNodesBounds: (g) => {
          const { nodeLookup: x, nodeOrigin: S } = r.getState();
          return GS(g, { nodeLookup: x, nodeOrigin: S });
        },
        getHandleConnections: ({ type: g, id: x, nodeId: S }) => {
          var w;
          return Array.from(
            ((w = r
              .getState()
              .connectionLookup.get(`${S}-${g}${x ? `-${x}` : ""}`)) == null
              ? void 0
              : w.values()) ?? []
          );
        },
        getNodeConnections: ({ type: g, handleId: x, nodeId: S }) => {
          var w;
          return Array.from(
            ((w = r
              .getState()
              .connectionLookup.get(
                `${S}${g ? (x ? `-${g}-${x}` : `-${g}`) : ""}`
              )) == null
              ? void 0
              : w.values()) ?? []
          );
        },
        fitView: async (g) => {
          const x = r.getState().fitViewResolver ?? o5();
          return (
            r.setState({
              fitViewQueued: !0,
              fitViewOptions: g,
              fitViewResolver: x,
            }),
            o.nodeQueue.push((S) => [...S]),
            x.promise
          );
        },
      };
    }, []);
  return E.useMemo(() => ({ ...l, ...e, viewportInitialized: i }), [i]);
}
const Gp = (e) => e.selected,
  PE = typeof window < "u" ? window : void 0;
function RE({ deleteKeyCode: e, multiSelectionKeyCode: r }) {
  const o = Ke(),
    { deleteElements: i } = cd(),
    l = $s(e, { actInsideInputWithModifier: !1 }),
    u = $s(r, { target: PE });
  (E.useEffect(() => {
    if (l) {
      const { edges: c, nodes: d } = o.getState();
      (i({ nodes: d.filter(Gp), edges: c.filter(Gp) }),
        o.setState({ nodesSelectionActive: !1 }));
    }
  }, [l]),
    E.useEffect(() => {
      o.setState({ multiSelectionActive: u });
    }, [u]));
}
function TE(e) {
  const r = Ke();
  E.useEffect(() => {
    const o = () => {
      var l, u, c, d;
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
        ((d = (c = r.getState()).onError) == null ||
          d.call(c, "004", hn.error004())),
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
const ta = {
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
  panOnScrollMode: u = jr.Free,
  zoomOnDoubleClick: c = !0,
  panOnDrag: d = !0,
  defaultViewport: p,
  translateExtent: m,
  minZoom: v,
  maxZoom: g,
  zoomActivationKeyCode: x,
  preventScrolling: S = !0,
  children: w,
  noWheelClassName: j,
  noPanClassName: C,
  onViewportChange: b,
  isControlledViewport: I,
  paneClickDistance: k,
  selectionOnDrag: _,
}) {
  const D = Ke(),
    z = E.useRef(null),
    { userSelectionActive: R, lib: H, connectionInProgress: V } = ze(LE, Xe),
    ie = $s(x),
    X = E.useRef();
  TE(z);
  const Y = E.useCallback(
    (te) => {
      (b == null || b({ x: te[0], y: te[1], zoom: te[2] }),
        I || D.setState({ transform: te }));
    },
    [b, I]
  );
  return (
    E.useEffect(() => {
      if (z.current) {
        X.current = F5({
          domNode: z.current,
          minZoom: v,
          maxZoom: g,
          translateExtent: m,
          viewport: p,
          onDraggingChange: (B) => D.setState({ paneDragging: B }),
          onPanZoomStart: (B, K) => {
            const { onViewportChangeStart: A, onMoveStart: $ } = D.getState();
            ($ == null || $(B, K), A == null || A(K));
          },
          onPanZoom: (B, K) => {
            const { onViewportChange: A, onMove: $ } = D.getState();
            ($ == null || $(B, K), A == null || A(K));
          },
          onPanZoomEnd: (B, K) => {
            const { onViewportChangeEnd: A, onMoveEnd: $ } = D.getState();
            ($ == null || $(B, K), A == null || A(K));
          },
        });
        const { x: te, y: L, zoom: q } = X.current.getViewport();
        return (
          D.setState({
            panZoom: X.current,
            transform: [te, L, q],
            domNode: z.current.closest(".react-flow"),
          }),
          () => {
            var B;
            (B = X.current) == null || B.destroy();
          }
        );
      }
    }, []),
    E.useEffect(() => {
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
          panOnDrag: d,
          zoomActivationKeyPressed: ie,
          preventScrolling: S,
          noPanClassName: C,
          userSelectionActive: R,
          noWheelClassName: j,
          lib: H,
          onTransformChange: Y,
          connectionInProgress: V,
          selectionOnDrag: _,
          paneClickDistance: k,
        });
    }, [e, r, o, i, l, u, c, d, ie, S, C, R, j, H, Y, V, _, k]),
    h.jsx("div", {
      className: "react-flow__renderer",
      ref: z,
      style: ta,
      children: w,
    })
  );
}
const AE = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect,
});
function $E() {
  const { userSelectionActive: e, userSelectionRect: r } = ze(AE, Xe);
  return e && r
    ? h.jsx("div", {
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
  selectionMode: o = Ls.Full,
  panOnDrag: i,
  paneClickDistance: l,
  selectionOnDrag: u,
  onSelectionStart: c,
  onSelectionEnd: d,
  onPaneClick: p,
  onPaneContextMenu: m,
  onPaneScroll: v,
  onPaneMouseEnter: g,
  onPaneMouseMove: x,
  onPaneMouseLeave: S,
  children: w,
}) {
  const j = Ke(),
    {
      userSelectionActive: C,
      elementsSelectable: b,
      dragging: I,
      connectionInProgress: k,
    } = ze(DE, Xe),
    _ = b && (e || C),
    D = E.useRef(null),
    z = E.useRef(),
    R = E.useRef(new Set()),
    H = E.useRef(new Set()),
    V = E.useRef(!1),
    ie = (A) => {
      if (V.current || k) {
        V.current = !1;
        return;
      }
      (p == null || p(A),
        j.getState().resetSelectedElements(),
        j.setState({ nodesSelectionActive: !1 }));
    },
    X = (A) => {
      if (Array.isArray(i) && i != null && i.includes(2)) {
        A.preventDefault();
        return;
      }
      m == null || m(A);
    },
    Y = v ? (A) => v(A) : void 0,
    te = (A) => {
      V.current && (A.stopPropagation(), (V.current = !1));
    },
    L = (A) => {
      var F, Q;
      const { domNode: $ } = j.getState();
      if (
        ((z.current = $ == null ? void 0 : $.getBoundingClientRect()),
        !z.current)
      )
        return;
      const U = A.target === D.current;
      if (
        (!U && !!A.target.closest(".nokey")) ||
        !e ||
        !((u && U) || r) ||
        A.button !== 0 ||
        !A.isPrimary
      )
        return;
      ((Q = (F = A.target) == null ? void 0 : F.setPointerCapture) == null ||
        Q.call(F, A.pointerId),
        (V.current = !1));
      const { x: ne, y: oe } = nn(A.nativeEvent, z.current);
      (j.setState({
        userSelectionRect: {
          width: 0,
          height: 0,
          startX: ne,
          startY: oe,
          x: ne,
          y: oe,
        },
      }),
        U || (A.stopPropagation(), A.preventDefault()));
    },
    q = (A) => {
      const {
        userSelectionRect: $,
        transform: U,
        nodeLookup: P,
        edgeLookup: M,
        connectionLookup: ne,
        triggerNodeChanges: oe,
        triggerEdgeChanges: F,
        defaultEdgeOptions: Q,
        resetSelectedElements: re,
      } = j.getState();
      if (!z.current || !$) return;
      const { x: G, y: se } = nn(A.nativeEvent, z.current),
        { startX: ce, startY: fe } = $;
      if (!V.current) {
        const me = r ? 0 : l;
        if (Math.hypot(G - ce, se - fe) <= me) return;
        (re(), c == null || c(A));
      }
      V.current = !0;
      const pe = {
          startX: ce,
          startY: fe,
          x: G < ce ? G : ce,
          y: se < fe ? se : fe,
          width: Math.abs(G - ce),
          height: Math.abs(se - fe),
        },
        ge = R.current,
        Se = H.current;
      ((R.current = new Set(
        nd(P, pe, U, o === Ls.Partial, !0).map((me) => me.id)
      )),
        (H.current = new Set()));
      const Pe = (Q == null ? void 0 : Q.selectable) ?? !0;
      for (const me of R.current) {
        const Ce = ne.get(me);
        if (Ce)
          for (const { edgeId: he } of Ce.values()) {
            const _e = M.get(he);
            _e && (_e.selectable ?? Pe) && H.current.add(he);
          }
      }
      if (!Sp(ge, R.current)) {
        const me = fo(P, R.current, !0);
        oe(me);
      }
      if (!Sp(Se, H.current)) {
        const me = fo(M, H.current);
        F(me);
      }
      j.setState({
        userSelectionRect: pe,
        userSelectionActive: !0,
        nodesSelectionActive: !1,
      });
    },
    B = (A) => {
      var $, U;
      A.button === 0 &&
        ((U = ($ = A.target) == null ? void 0 : $.releasePointerCapture) ==
          null || U.call($, A.pointerId),
        !C &&
          A.target === D.current &&
          j.getState().userSelectionRect &&
          (ie == null || ie(A)),
        j.setState({ userSelectionActive: !1, userSelectionRect: null }),
        V.current &&
          (d == null || d(A),
          j.setState({ nodesSelectionActive: R.current.size > 0 })));
    },
    K = i === !0 || (Array.isArray(i) && i.includes(0));
  return h.jsxs("div", {
    className: nt([
      "react-flow__pane",
      { draggable: K, dragging: I, selection: e },
    ]),
    onClick: _ ? void 0 : fc(ie, D),
    onContextMenu: fc(X, D),
    onWheel: fc(Y, D),
    onPointerEnter: _ ? void 0 : g,
    onPointerMove: _ ? q : x,
    onPointerUp: _ ? B : void 0,
    onPointerDownCapture: _ ? L : void 0,
    onClickCapture: _ ? te : void 0,
    onPointerLeave: S,
    ref: D,
    style: ta,
    children: [w, h.jsx($E, {})],
  });
}
function Lc({ id: e, store: r, unselect: o = !1, nodeRef: i }) {
  const {
      addSelectedNodes: l,
      unselectNodesAndEdges: u,
      multiSelectionActive: c,
      nodeLookup: d,
      onError: p,
    } = r.getState(),
    m = d.get(e);
  if (!m) {
    p == null || p("012", hn.error012(e));
    return;
  }
  (r.setState({ nodesSelectionActive: !1 }),
    m.selected
      ? (o || (m.selected && c)) &&
        (u({ nodes: [m], edges: [] }),
        requestAnimationFrame(() => {
          var v;
          return (v = i == null ? void 0 : i.current) == null
            ? void 0
            : v.blur();
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
  const d = Ke(),
    [p, m] = E.useState(!1),
    v = E.useRef();
  return (
    E.useEffect(() => {
      v.current = b5({
        getStoreItems: () => d.getState(),
        onNodeMouseDown: (g) => {
          Lc({ id: g, store: d, nodeRef: e });
        },
        onDragStart: () => {
          m(!0);
        },
        onDragStop: () => {
          m(!1);
        },
      });
    }, []),
    E.useEffect(() => {
      var g, x;
      if (r) (g = v.current) == null || g.destroy();
      else if (e.current)
        return (
          (x = v.current) == null ||
            x.update({
              noDragClassName: o,
              handleSelector: i,
              domNode: e.current,
              isSelectable: u,
              nodeId: l,
              nodeClickDistance: c,
            }),
          () => {
            var S;
            (S = v.current) == null || S.destroy();
          }
        );
    }, [o, i, r, u, e, l]),
    p
  );
}
const FE = (e) => (r) =>
  r.selected && (r.draggable || (e && typeof r.draggable > "u"));
function tg() {
  const e = Ke();
  return E.useCallback((o) => {
    const {
        nodeExtent: i,
        snapToGrid: l,
        snapGrid: u,
        nodesDraggable: c,
        onError: d,
        updateNodePositions: p,
        nodeLookup: m,
        nodeOrigin: v,
      } = e.getState(),
      g = new Map(),
      x = FE(c),
      S = l ? u[0] : 5,
      w = l ? u[1] : 5,
      j = o.direction.x * S * o.factor,
      C = o.direction.y * w * o.factor;
    for (const [, b] of m) {
      if (!x(b)) continue;
      let I = {
        x: b.internals.positionAbsolute.x + j,
        y: b.internals.positionAbsolute.y + C,
      };
      l && (I = Us(I, u));
      const { position: k, positionAbsolute: _ } = v0({
        nodeId: b.id,
        nextPosition: I,
        nodeLookup: m,
        nodeExtent: i,
        nodeOrigin: v,
        onError: d,
      });
      ((b.position = k), (b.internals.positionAbsolute = _), g.set(b.id, b));
    }
    p(g);
  }, []);
}
const dd = E.createContext(null),
  HE = dd.Provider;
dd.Consumer;
const ng = () => E.useContext(dd),
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
      { fromHandle: d, toHandle: p, isValid: m } = c,
      v =
        (p == null ? void 0 : p.nodeId) === e &&
        (p == null ? void 0 : p.id) === r &&
        (p == null ? void 0 : p.type) === o;
    return {
      connectingFrom:
        (d == null ? void 0 : d.nodeId) === e &&
        (d == null ? void 0 : d.id) === r &&
        (d == null ? void 0 : d.type) === o,
      connectingTo: v,
      clickConnecting:
        (l == null ? void 0 : l.nodeId) === e &&
        (l == null ? void 0 : l.id) === r &&
        (l == null ? void 0 : l.type) === o,
      isPossibleEndHandle:
        u === yo.Strict
          ? (d == null ? void 0 : d.type) !== o
          : e !== (d == null ? void 0 : d.nodeId) ||
            r !== (d == null ? void 0 : d.id),
      connectionInProcess: !!d,
      clickConnectionInProcess: !!l,
      valid: v && m,
    };
  };
function WE(
  {
    type: e = "source",
    position: r = Ne.Top,
    isValidConnection: o,
    isConnectable: i = !0,
    isConnectableStart: l = !0,
    isConnectableEnd: u = !0,
    id: c,
    onConnect: d,
    children: p,
    className: m,
    onMouseDown: v,
    onTouchStart: g,
    ...x
  },
  S
) {
  var q, B;
  const w = c || null,
    j = e === "target",
    C = Ke(),
    b = ng(),
    { connectOnClick: I, noPanClassName: k, rfId: _ } = ze(BE, Xe),
    {
      connectingFrom: D,
      connectingTo: z,
      clickConnecting: R,
      isPossibleEndHandle: H,
      connectionInProcess: V,
      clickConnectionInProcess: ie,
      valid: X,
    } = ze(VE(b, w, e), Xe);
  b ||
    (B = (q = C.getState()).onError) == null ||
    B.call(q, "010", hn.error010());
  const Y = (K) => {
      const {
          defaultEdgeOptions: A,
          onConnect: $,
          hasDefaultEdges: U,
        } = C.getState(),
        P = { ...A, ...K };
      if (U) {
        const { edges: M, setEdges: ne } = C.getState();
        ne(P0(P, M));
      }
      ($ == null || $(P), d == null || d(P));
    },
    te = (K) => {
      if (!b) return;
      const A = j0(K.nativeEvent);
      if (l && ((A && K.button === 0) || !A)) {
        const $ = C.getState();
        Tc.onPointerDown(K.nativeEvent, {
          handleDomNode: K.currentTarget,
          autoPanOnConnect: $.autoPanOnConnect,
          connectionMode: $.connectionMode,
          connectionRadius: $.connectionRadius,
          domNode: $.domNode,
          nodeLookup: $.nodeLookup,
          lib: $.lib,
          isTarget: j,
          handleId: w,
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
      A ? v == null || v(K) : g == null || g(K);
    },
    L = (K) => {
      const {
        onClickConnectStart: A,
        onClickConnectEnd: $,
        connectionClickStartHandle: U,
        connectionMode: P,
        isValidConnection: M,
        lib: ne,
        rfId: oe,
        nodeLookup: F,
        connection: Q,
      } = C.getState();
      if (!b || (!U && !l)) return;
      if (!U) {
        (A == null ||
          A(K.nativeEvent, { nodeId: b, handleId: w, handleType: e }),
          C.setState({
            connectionClickStartHandle: { nodeId: b, type: e, id: w },
          }));
        return;
      }
      const re = C0(K.target),
        G = o || M,
        { connection: se, isValid: ce } = Tc.isValid(K.nativeEvent, {
          handle: { nodeId: b, id: w, type: e },
          connectionMode: P,
          fromNodeId: U.nodeId,
          fromHandleId: U.id || null,
          fromType: U.type,
          isValidConnection: G,
          flowId: oe,
          doc: re,
          lib: ne,
          nodeLookup: F,
        });
      ce && se && Y(se);
      const fe = structuredClone(Q);
      (delete fe.inProgress,
        (fe.toPosition = fe.toHandle ? fe.toHandle.position : null),
        $ == null || $(K, fe),
        C.setState({ connectionClickStartHandle: null }));
    };
  return h.jsx("div", {
    "data-handleid": w,
    "data-nodeid": b,
    "data-handlepos": r,
    "data-id": `${_}-${b}-${w}-${e}`,
    className: nt([
      "react-flow__handle",
      `react-flow__handle-${r}`,
      "nodrag",
      k,
      m,
      {
        source: !j,
        target: j,
        connectable: i,
        connectablestart: l,
        connectableend: u,
        clickconnecting: R,
        connectingfrom: D,
        connectingto: z,
        valid: X,
        connectionindicator: i && (!V || H) && (V || ie ? u : l),
      },
    ]),
    onMouseDown: te,
    onTouchStart: te,
    onClick: I ? L : void 0,
    ref: S,
    ...x,
    children: p,
  });
}
const Eo = E.memo(J0(WE));
function UE({ data: e, isConnectable: r, sourcePosition: o = Ne.Bottom }) {
  return h.jsxs(h.Fragment, {
    children: [
      e == null ? void 0 : e.label,
      h.jsx(Eo, { type: "source", position: o, isConnectable: r }),
    ],
  });
}
function YE({
  data: e,
  isConnectable: r,
  targetPosition: o = Ne.Top,
  sourcePosition: i = Ne.Bottom,
}) {
  return h.jsxs(h.Fragment, {
    children: [
      h.jsx(Eo, { type: "target", position: o, isConnectable: r }),
      e == null ? void 0 : e.label,
      h.jsx(Eo, { type: "source", position: i, isConnectable: r }),
    ],
  });
}
function XE() {
  return null;
}
function KE({ data: e, isConnectable: r, targetPosition: o = Ne.Top }) {
  return h.jsxs(h.Fragment, {
    children: [
      h.jsx(Eo, { type: "target", position: o, isConnectable: r }),
      e == null ? void 0 : e.label,
    ],
  });
}
const Hl = {
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
  } = Ws(e.nodeLookup, { filter: (u) => !!u.selected });
  return {
    width: tn(r) ? r : null,
    height: tn(o) ? o : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${i}px,${l}px)`,
  };
};
function qE({
  onSelectionContextMenu: e,
  noPanClassName: r,
  disableKeyboardA11y: o,
}) {
  const i = Ke(),
    {
      width: l,
      height: u,
      transformString: c,
      userSelectionActive: d,
    } = ze(GE, Xe),
    p = tg(),
    m = E.useRef(null);
  if (
    (E.useEffect(() => {
      var x;
      o || (x = m.current) == null || x.focus({ preventScroll: !0 });
    }, [o]),
    eg({ nodeRef: m }),
    d || !l || !u)
  )
    return null;
  const v = e
      ? (x) => {
          const S = i.getState().nodes.filter((w) => w.selected);
          e(x, S);
        }
      : void 0,
    g = (x) => {
      Object.prototype.hasOwnProperty.call(Hl, x.key) &&
        (x.preventDefault(),
        p({ direction: Hl[x.key], factor: x.shiftKey ? 4 : 1 }));
    };
  return h.jsx("div", {
    className: nt(["react-flow__nodesselection", "react-flow__container", r]),
    style: { transform: c },
    children: h.jsx("div", {
      ref: m,
      className: "react-flow__nodesselection-rect",
      onContextMenu: v,
      tabIndex: o ? void 0 : -1,
      onKeyDown: o ? void 0 : g,
      style: { width: l, height: u },
    }),
  });
}
const Jp = typeof window < "u" ? window : void 0,
  JE = (e) => ({
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
  paneClickDistance: d,
  deleteKeyCode: p,
  selectionKeyCode: m,
  selectionOnDrag: v,
  selectionMode: g,
  onSelectionStart: x,
  onSelectionEnd: S,
  multiSelectionKeyCode: w,
  panActivationKeyCode: j,
  zoomActivationKeyCode: C,
  elementsSelectable: b,
  zoomOnScroll: I,
  zoomOnPinch: k,
  panOnScroll: _,
  panOnScrollSpeed: D,
  panOnScrollMode: z,
  zoomOnDoubleClick: R,
  panOnDrag: H,
  defaultViewport: V,
  translateExtent: ie,
  minZoom: X,
  maxZoom: Y,
  preventScrolling: te,
  onSelectionContextMenu: L,
  noWheelClassName: q,
  noPanClassName: B,
  disableKeyboardA11y: K,
  onViewportChange: A,
  isControlledViewport: $,
}) {
  const { nodesSelectionActive: U, userSelectionActive: P } = ze(JE, Xe),
    M = $s(m, { target: Jp }),
    ne = $s(j, { target: Jp }),
    oe = ne || H,
    F = ne || _,
    Q = v && oe !== !0,
    re = M || P || Q;
  return (
    RE({ deleteKeyCode: p, multiSelectionKeyCode: w }),
    h.jsx(zE, {
      onPaneContextMenu: u,
      elementsSelectable: b,
      zoomOnScroll: I,
      zoomOnPinch: k,
      panOnScroll: F,
      panOnScrollSpeed: D,
      panOnScrollMode: z,
      zoomOnDoubleClick: R,
      panOnDrag: !M && oe,
      defaultViewport: V,
      translateExtent: ie,
      minZoom: X,
      maxZoom: Y,
      zoomActivationKeyCode: C,
      preventScrolling: te,
      noWheelClassName: q,
      noPanClassName: B,
      onViewportChange: A,
      isControlledViewport: $,
      paneClickDistance: d,
      selectionOnDrag: Q,
      children: h.jsxs(OE, {
        onSelectionStart: x,
        onSelectionEnd: S,
        onPaneClick: r,
        onPaneMouseEnter: o,
        onPaneMouseMove: i,
        onPaneMouseLeave: l,
        onPaneContextMenu: u,
        onPaneScroll: c,
        panOnDrag: oe,
        isSelecting: !!re,
        selectionMode: g,
        selectionKeyPressed: M,
        paneClickDistance: d,
        selectionOnDrag: Q,
        children: [
          e,
          U &&
            h.jsx(qE, {
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
const ZE = E.memo(rg),
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
  return ze(E.useCallback(ek(e), [e]), Xe);
}
const nk = (e) => e.updateNodeInternals;
function rk() {
  const e = ze(nk),
    [r] = E.useState(() =>
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
    E.useEffect(
      () => () => {
        r == null || r.disconnect();
      },
      [r]
    ),
    r
  );
}
function ok({ node: e, nodeType: r, hasDimensions: o, resizeObserver: i }) {
  const l = Ke(),
    u = E.useRef(null),
    c = E.useRef(null),
    d = E.useRef(e.sourcePosition),
    p = E.useRef(e.targetPosition),
    m = E.useRef(r),
    v = o && !!e.internals.handleBounds;
  return (
    E.useEffect(() => {
      u.current &&
        !e.hidden &&
        (!v || c.current !== u.current) &&
        (c.current && (i == null || i.unobserve(c.current)),
        i == null || i.observe(u.current),
        (c.current = u.current));
    }, [v, e.hidden]),
    E.useEffect(
      () => () => {
        c.current && (i == null || i.unobserve(c.current), (c.current = null));
      },
      []
    ),
    E.useEffect(() => {
      if (u.current) {
        const g = m.current !== r,
          x = d.current !== e.sourcePosition,
          S = p.current !== e.targetPosition;
        (g || x || S) &&
          ((m.current = r),
          (d.current = e.sourcePosition),
          (p.current = e.targetPosition),
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
  nodesDraggable: d,
  elementsSelectable: p,
  nodesConnectable: m,
  nodesFocusable: v,
  resizeObserver: g,
  noDragClassName: x,
  noPanClassName: S,
  disableKeyboardA11y: w,
  rfId: j,
  nodeTypes: C,
  nodeClickDistance: b,
  onError: I,
}) {
  const {
    node: k,
    internals: _,
    isParent: D,
  } = ze((G) => {
    const se = G.nodeLookup.get(e),
      ce = G.parentLookup.has(e);
    return { node: se, internals: se.internals, isParent: ce };
  }, Xe);
  let z = k.type || "default",
    R = (C == null ? void 0 : C[z]) || qp[z];
  R === void 0 &&
    (I == null || I("003", hn.error003(z)),
    (z = "default"),
    (R = (C == null ? void 0 : C.default) || qp.default));
  const H = !!(k.draggable || (d && typeof k.draggable > "u")),
    V = !!(k.selectable || (p && typeof k.selectable > "u")),
    ie = !!(k.connectable || (m && typeof k.connectable > "u")),
    X = !!(k.focusable || (v && typeof k.focusable > "u")),
    Y = Ke(),
    te = k0(k),
    L = ok({ node: k, nodeType: z, hasDimensions: te, resizeObserver: g }),
    q = eg({
      nodeRef: L,
      disabled: k.hidden || !H,
      noDragClassName: x,
      handleSelector: k.dragHandle,
      nodeId: e,
      isSelectable: V,
      nodeClickDistance: b,
    }),
    B = tg();
  if (k.hidden) return null;
  const K = Pn(k),
    A = QE(k),
    $ = V || H || r || o || i || l,
    U = o ? (G) => o(G, { ..._.userNode }) : void 0,
    P = i ? (G) => i(G, { ..._.userNode }) : void 0,
    M = l ? (G) => l(G, { ..._.userNode }) : void 0,
    ne = u ? (G) => u(G, { ..._.userNode }) : void 0,
    oe = c ? (G) => c(G, { ..._.userNode }) : void 0,
    F = (G) => {
      const { selectNodesOnDrag: se, nodeDragThreshold: ce } = Y.getState();
      (V && (!se || !H || ce > 0) && Lc({ id: e, store: Y, nodeRef: L }),
        r && r(G, { ..._.userNode }));
    },
    Q = (G) => {
      if (!(b0(G.nativeEvent) || w)) {
        if (p0.includes(G.key) && V) {
          const se = G.key === "Escape";
          Lc({ id: e, store: Y, unselect: se, nodeRef: L });
        } else if (
          H &&
          k.selected &&
          Object.prototype.hasOwnProperty.call(Hl, G.key)
        ) {
          G.preventDefault();
          const { ariaLabelConfig: se } = Y.getState();
          (Y.setState({
            ariaLiveMessage: se["node.a11yDescription.ariaLiveMessage"]({
              direction: G.key.replace("Arrow", "").toLowerCase(),
              x: ~~_.positionAbsolute.x,
              y: ~~_.positionAbsolute.y,
            }),
          }),
            B({ direction: Hl[G.key], factor: G.shiftKey ? 4 : 1 }));
        }
      }
    },
    re = () => {
      var Se;
      if (w || !((Se = L.current) != null && Se.matches(":focus-visible")))
        return;
      const {
        transform: G,
        width: se,
        height: ce,
        autoPanOnNodeFocus: fe,
        setCenter: pe,
      } = Y.getState();
      if (!fe) return;
      nd(new Map([[e, k]]), { x: 0, y: 0, width: se, height: ce }, G, !0)
        .length > 0 ||
        pe(k.position.x + K.width / 2, k.position.y + K.height / 2, {
          zoom: G[2],
        });
    };
  return h.jsx("div", {
    className: nt([
      "react-flow__node",
      `react-flow__node-${z}`,
      { [S]: H },
      k.className,
      {
        selected: k.selected,
        selectable: V,
        parent: D,
        draggable: H,
        dragging: q,
      },
    ]),
    ref: L,
    style: {
      zIndex: _.z,
      transform: `translate(${_.positionAbsolute.x}px,${_.positionAbsolute.y}px)`,
      pointerEvents: $ ? "all" : "none",
      visibility: te ? "visible" : "hidden",
      ...k.style,
      ...A,
    },
    "data-id": e,
    "data-testid": `rf__node-${e}`,
    onMouseEnter: U,
    onMouseMove: P,
    onMouseLeave: M,
    onContextMenu: ne,
    onClick: F,
    onDoubleClick: oe,
    onKeyDown: X ? Q : void 0,
    tabIndex: X ? 0 : void 0,
    onFocus: X ? re : void 0,
    role: k.ariaRole ?? (X ? "group" : void 0),
    "aria-roledescription": "node",
    "aria-describedby": w ? void 0 : `${Y0}-${j}`,
    "aria-label": k.ariaLabel,
    ...k.domAttributes,
    children: h.jsx(HE, {
      value: e,
      children: h.jsx(R, {
        id: e,
        data: k.data,
        type: z,
        positionAbsoluteX: _.positionAbsolute.x,
        positionAbsoluteY: _.positionAbsolute.y,
        selected: k.selected ?? !1,
        selectable: V,
        draggable: H,
        deletable: k.deletable ?? !0,
        isConnectable: ie,
        sourcePosition: k.sourcePosition,
        targetPosition: k.targetPosition,
        dragging: q,
        dragHandle: k.dragHandle,
        zIndex: _.z,
        parentId: k.parentId,
        ...K,
      }),
    }),
  });
}
var ik = E.memo(sk);
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
    } = ze(lk, Xe),
    c = tk(e.onlyRenderVisibleElements),
    d = rk();
  return h.jsx("div", {
    className: "react-flow__nodes",
    style: ta,
    children: c.map((p) =>
      h.jsx(
        ik,
        {
          id: p,
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
          resizeObserver: d,
          nodesDraggable: r,
          nodesConnectable: o,
          nodesFocusable: i,
          elementsSelectable: l,
          nodeClickDistance: e.nodeClickDistance,
          onError: u,
        },
        p
      )
    ),
  });
}
og.displayName = "NodeRenderer";
const ak = E.memo(og);
function uk(e) {
  return ze(
    E.useCallback(
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
    Xe
  );
}
const ck = ({ color: e = "none", strokeWidth: r = 1 }) => {
    const o = { strokeWidth: r, ...(e && { stroke: e }) };
    return h.jsx("polyline", {
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
    return h.jsx("polyline", {
      className: "arrowclosed",
      style: o,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      points: "-5,-4 0,0 -5,4 -5,-4",
    });
  },
  Zp = { [Dl.Arrow]: ck, [Dl.ArrowClosed]: dk };
function fk(e) {
  const r = Ke();
  return E.useMemo(() => {
    var l, u;
    return Object.prototype.hasOwnProperty.call(Zp, e)
      ? Zp[e]
      : ((u = (l = r.getState()).onError) == null ||
          u.call(l, "009", hn.error009(e)),
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
    orient: d = "auto-start-reverse",
  }) => {
    const p = fk(r);
    return p
      ? h.jsx("marker", {
          className: "react-flow__arrowhead",
          id: e,
          markerWidth: `${i}`,
          markerHeight: `${l}`,
          viewBox: "-10 -10 20 20",
          markerUnits: u,
          orient: d,
          refX: "0",
          refY: "0",
          children: h.jsx(p, { color: o, strokeWidth: c }),
        })
      : null;
  },
  sg = ({ defaultColor: e, rfId: r }) => {
    const o = ze((u) => u.edges),
      i = ze((u) => u.defaultEdgeOptions),
      l = E.useMemo(
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
      ? h.jsx("svg", {
          className: "react-flow__marker",
          "aria-hidden": "true",
          children: h.jsx("defs", {
            children: l.map((u) =>
              h.jsx(
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
var pk = E.memo(sg);
function ig({
  x: e,
  y: r,
  label: o,
  labelStyle: i,
  labelShowBg: l = !0,
  labelBgStyle: u,
  labelBgPadding: c = [2, 4],
  labelBgBorderRadius: d = 2,
  children: p,
  className: m,
  ...v
}) {
  const [g, x] = E.useState({ x: 1, y: 0, width: 0, height: 0 }),
    S = nt(["react-flow__edge-textwrapper", m]),
    w = E.useRef(null);
  return (
    E.useEffect(() => {
      if (w.current) {
        const j = w.current.getBBox();
        x({ x: j.x, y: j.y, width: j.width, height: j.height });
      }
    }, [o]),
    o
      ? h.jsxs("g", {
          transform: `translate(${e - g.width / 2} ${r - g.height / 2})`,
          className: S,
          visibility: g.width ? "visible" : "hidden",
          ...v,
          children: [
            l &&
              h.jsx("rect", {
                width: g.width + 2 * c[0],
                x: -c[0],
                y: -c[1],
                height: g.height + 2 * c[1],
                className: "react-flow__edge-textbg",
                style: u,
                rx: d,
                ry: d,
              }),
            h.jsx("text", {
              className: "react-flow__edge-text",
              y: g.height / 2,
              dy: "0.3em",
              ref: w,
              style: i,
              children: o,
            }),
            p,
          ],
        })
      : null
  );
}
ig.displayName = "EdgeText";
const mk = E.memo(ig);
function na({
  path: e,
  labelX: r,
  labelY: o,
  label: i,
  labelStyle: l,
  labelShowBg: u,
  labelBgStyle: c,
  labelBgPadding: d,
  labelBgBorderRadius: p,
  interactionWidth: m = 20,
  ...v
}) {
  return h.jsxs(h.Fragment, {
    children: [
      h.jsx("path", {
        ...v,
        d: e,
        fill: "none",
        className: nt(["react-flow__edge-path", v.className]),
      }),
      m
        ? h.jsx("path", {
            d: e,
            fill: "none",
            strokeOpacity: 0,
            strokeWidth: m,
            className: "react-flow__edge-interaction",
          })
        : null,
      i && tn(r) && tn(o)
        ? h.jsx(mk, {
            x: r,
            y: o,
            label: i,
            labelStyle: l,
            labelShowBg: u,
            labelBgStyle: c,
            labelBgPadding: d,
            labelBgBorderRadius: p,
          })
        : null,
    ],
  });
}
function em({ pos: e, x1: r, y1: o, x2: i, y2: l }) {
  return e === Ne.Left || e === Ne.Right
    ? [0.5 * (r + i), o]
    : [r, 0.5 * (o + l)];
}
function lg({
  sourceX: e,
  sourceY: r,
  sourcePosition: o = Ne.Bottom,
  targetX: i,
  targetY: l,
  targetPosition: u = Ne.Top,
}) {
  const [c, d] = em({ pos: o, x1: e, y1: r, x2: i, y2: l }),
    [p, m] = em({ pos: u, x1: i, y1: l, x2: e, y2: r }),
    [v, g, x, S] = _0({
      sourceX: e,
      sourceY: r,
      targetX: i,
      targetY: l,
      sourceControlX: c,
      sourceControlY: d,
      targetControlX: p,
      targetControlY: m,
    });
  return [`M${e},${r} C${c},${d} ${p},${m} ${i},${l}`, v, g, x, S];
}
function ag(e) {
  return E.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      sourcePosition: c,
      targetPosition: d,
      label: p,
      labelStyle: m,
      labelShowBg: v,
      labelBgStyle: g,
      labelBgPadding: x,
      labelBgBorderRadius: S,
      style: w,
      markerEnd: j,
      markerStart: C,
      interactionWidth: b,
    }) => {
      const [I, k, _] = lg({
          sourceX: o,
          sourceY: i,
          sourcePosition: c,
          targetX: l,
          targetY: u,
          targetPosition: d,
        }),
        D = e.isInternal ? void 0 : r;
      return h.jsx(na, {
        id: D,
        path: I,
        labelX: k,
        labelY: _,
        label: p,
        labelStyle: m,
        labelShowBg: v,
        labelBgStyle: g,
        labelBgPadding: x,
        labelBgBorderRadius: S,
        style: w,
        markerEnd: j,
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
  return E.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      label: c,
      labelStyle: d,
      labelShowBg: p,
      labelBgStyle: m,
      labelBgPadding: v,
      labelBgBorderRadius: g,
      style: x,
      sourcePosition: S = Ne.Bottom,
      targetPosition: w = Ne.Top,
      markerEnd: j,
      markerStart: C,
      pathOptions: b,
      interactionWidth: I,
    }) => {
      const [k, _, D] = Mc({
          sourceX: o,
          sourceY: i,
          sourcePosition: S,
          targetX: l,
          targetY: u,
          targetPosition: w,
          borderRadius: b == null ? void 0 : b.borderRadius,
          offset: b == null ? void 0 : b.offset,
          stepPosition: b == null ? void 0 : b.stepPosition,
        }),
        z = e.isInternal ? void 0 : r;
      return h.jsx(na, {
        id: z,
        path: k,
        labelX: _,
        labelY: D,
        label: c,
        labelStyle: d,
        labelShowBg: p,
        labelBgStyle: m,
        labelBgPadding: v,
        labelBgBorderRadius: g,
        style: x,
        markerEnd: j,
        markerStart: C,
        interactionWidth: I,
      });
    }
  );
}
const dg = cg({ isInternal: !1 }),
  fg = cg({ isInternal: !0 });
dg.displayName = "SmoothStepEdge";
fg.displayName = "SmoothStepEdgeInternal";
function hg(e) {
  return E.memo(({ id: r, ...o }) => {
    var l;
    const i = e.isInternal ? void 0 : r;
    return h.jsx(dg, {
      ...o,
      id: i,
      pathOptions: E.useMemo(() => {
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
  return E.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      label: c,
      labelStyle: d,
      labelShowBg: p,
      labelBgStyle: m,
      labelBgPadding: v,
      labelBgBorderRadius: g,
      style: x,
      markerEnd: S,
      markerStart: w,
      interactionWidth: j,
    }) => {
      const [C, b, I] = R0({ sourceX: o, sourceY: i, targetX: l, targetY: u }),
        k = e.isInternal ? void 0 : r;
      return h.jsx(na, {
        id: k,
        path: C,
        labelX: b,
        labelY: I,
        label: c,
        labelStyle: d,
        labelShowBg: p,
        labelBgStyle: m,
        labelBgPadding: v,
        labelBgBorderRadius: g,
        style: x,
        markerEnd: S,
        markerStart: w,
        interactionWidth: j,
      });
    }
  );
}
const xk = mg({ isInternal: !1 }),
  gg = mg({ isInternal: !0 });
xk.displayName = "StraightEdge";
gg.displayName = "StraightEdgeInternal";
function yg(e) {
  return E.memo(
    ({
      id: r,
      sourceX: o,
      sourceY: i,
      targetX: l,
      targetY: u,
      sourcePosition: c = Ne.Bottom,
      targetPosition: d = Ne.Top,
      label: p,
      labelStyle: m,
      labelShowBg: v,
      labelBgStyle: g,
      labelBgPadding: x,
      labelBgBorderRadius: S,
      style: w,
      markerEnd: j,
      markerStart: C,
      pathOptions: b,
      interactionWidth: I,
    }) => {
      const [k, _, D] = I0({
          sourceX: o,
          sourceY: i,
          sourcePosition: c,
          targetX: l,
          targetY: u,
          targetPosition: d,
          curvature: b == null ? void 0 : b.curvature,
        }),
        z = e.isInternal ? void 0 : r;
      return h.jsx(na, {
        id: z,
        path: k,
        labelX: _,
        labelY: D,
        label: p,
        labelStyle: m,
        labelShowBg: v,
        labelBgStyle: g,
        labelBgPadding: x,
        labelBgBorderRadius: S,
        style: w,
        markerEnd: j,
        markerStart: C,
        interactionWidth: I,
      });
    }
  );
}
const vk = yg({ isInternal: !1 }),
  xg = yg({ isInternal: !0 });
vk.displayName = "BezierEdge";
xg.displayName = "BezierEdgeInternal";
const tm = {
    default: xg,
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
  wk = (e, r, o) => (o === Ne.Left ? e - r : o === Ne.Right ? e + r : e),
  Sk = (e, r, o) => (o === Ne.Top ? e - r : o === Ne.Bottom ? e + r : e),
  rm = "react-flow__edgeupdater";
function om({
  position: e,
  centerX: r,
  centerY: o,
  radius: i = 10,
  onMouseDown: l,
  onMouseEnter: u,
  onMouseOut: c,
  type: d,
}) {
  return h.jsx("circle", {
    onMouseDown: l,
    onMouseEnter: u,
    onMouseOut: c,
    className: nt([rm, `${rm}-${d}`]),
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
  sourcePosition: d,
  targetPosition: p,
  onReconnect: m,
  onReconnectStart: v,
  onReconnectEnd: g,
  setReconnecting: x,
  setUpdateHover: S,
}) {
  const w = Ke(),
    j = (_, D) => {
      if (_.button !== 0) return;
      const {
          autoPanOnConnect: z,
          domNode: R,
          isValidConnection: H,
          connectionMode: V,
          connectionRadius: ie,
          lib: X,
          onConnectStart: Y,
          onConnectEnd: te,
          cancelConnection: L,
          nodeLookup: q,
          rfId: B,
          panBy: K,
          updateConnection: A,
        } = w.getState(),
        $ = D.type === "target",
        U = (ne, oe) => {
          (x(!1), g == null || g(ne, o, D.type, oe));
        },
        P = (ne) => (m == null ? void 0 : m(o, ne)),
        M = (ne, oe) => {
          (x(!0), v == null || v(_, o, D.type), Y == null || Y(ne, oe));
        };
      Tc.onPointerDown(_.nativeEvent, {
        autoPanOnConnect: z,
        connectionMode: V,
        connectionRadius: ie,
        domNode: R,
        handleId: D.id,
        nodeId: D.nodeId,
        nodeLookup: q,
        isTarget: $,
        edgeUpdaterType: D.type,
        lib: X,
        flowId: B,
        cancelConnection: L,
        panBy: K,
        isValidConnection: H,
        onConnect: P,
        onConnectStart: M,
        onConnectEnd: te,
        onReconnectEnd: U,
        updateConnection: A,
        getTransform: () => w.getState().transform,
        getFromHandle: () => w.getState().connection.fromHandle,
        dragThreshold: w.getState().connectionDragThreshold,
        handleDomNode: _.currentTarget,
      });
    },
    C = (_) =>
      j(_, { nodeId: o.target, id: o.targetHandle ?? null, type: "target" }),
    b = (_) =>
      j(_, { nodeId: o.source, id: o.sourceHandle ?? null, type: "source" }),
    I = () => S(!0),
    k = () => S(!1);
  return h.jsxs(h.Fragment, {
    children: [
      (e === !0 || e === "source") &&
        h.jsx(om, {
          position: d,
          centerX: i,
          centerY: l,
          radius: r,
          onMouseDown: C,
          onMouseEnter: I,
          onMouseOut: k,
          type: "source",
        }),
      (e === !0 || e === "target") &&
        h.jsx(om, {
          position: p,
          centerX: u,
          centerY: c,
          radius: r,
          onMouseDown: b,
          onMouseEnter: I,
          onMouseOut: k,
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
  onMouseEnter: d,
  onMouseMove: p,
  onMouseLeave: m,
  reconnectRadius: v,
  onReconnect: g,
  onReconnectStart: x,
  onReconnectEnd: S,
  rfId: w,
  edgeTypes: j,
  noPanClassName: C,
  onError: b,
  disableKeyboardA11y: I,
}) {
  let k = ze((pe) => pe.edgeLookup.get(e));
  const _ = ze((pe) => pe.defaultEdgeOptions);
  k = _ ? { ..._, ...k } : k;
  let D = k.type || "default",
    z = (j == null ? void 0 : j[D]) || tm[D];
  z === void 0 &&
    (b == null || b("011", hn.error011(D)),
    (D = "default"),
    (z = (j == null ? void 0 : j.default) || tm.default));
  const R = !!(k.focusable || (r && typeof k.focusable > "u")),
    H =
      typeof g < "u" &&
      (k.reconnectable || (o && typeof k.reconnectable > "u")),
    V = !!(k.selectable || (i && typeof k.selectable > "u")),
    ie = E.useRef(null),
    [X, Y] = E.useState(!1),
    [te, L] = E.useState(!1),
    q = Ke(),
    {
      zIndex: B,
      sourceX: K,
      sourceY: A,
      targetX: $,
      targetY: U,
      sourcePosition: P,
      targetPosition: M,
    } = ze(
      E.useCallback(
        (pe) => {
          const ge = pe.nodeLookup.get(k.source),
            Se = pe.nodeLookup.get(k.target);
          if (!ge || !Se) return { zIndex: k.zIndex, ...nm };
          const Pe = p5({
            id: e,
            sourceNode: ge,
            targetNode: Se,
            sourceHandle: k.sourceHandle || null,
            targetHandle: k.targetHandle || null,
            connectionMode: pe.connectionMode,
            onError: b,
          });
          return {
            zIndex: l5({
              selected: k.selected,
              zIndex: k.zIndex,
              sourceNode: ge,
              targetNode: Se,
              elevateOnSelect: pe.elevateEdgesOnSelect,
              zIndexMode: pe.zIndexMode,
            }),
            ...(Pe || nm),
          };
        },
        [
          k.source,
          k.target,
          k.sourceHandle,
          k.targetHandle,
          k.selected,
          k.zIndex,
        ]
      ),
      Xe
    ),
    ne = E.useMemo(
      () => (k.markerStart ? `url('#${Pc(k.markerStart, w)}')` : void 0),
      [k.markerStart, w]
    ),
    oe = E.useMemo(
      () => (k.markerEnd ? `url('#${Pc(k.markerEnd, w)}')` : void 0),
      [k.markerEnd, w]
    );
  if (k.hidden || K === null || A === null || $ === null || U === null)
    return null;
  const F = (pe) => {
      var me;
      const {
        addSelectedEdges: ge,
        unselectNodesAndEdges: Se,
        multiSelectionActive: Pe,
      } = q.getState();
      (V &&
        (q.setState({ nodesSelectionActive: !1 }),
        k.selected && Pe
          ? (Se({ nodes: [], edges: [k] }),
            (me = ie.current) == null || me.blur())
          : ge([e])),
        l && l(pe, k));
    },
    Q = u
      ? (pe) => {
          u(pe, { ...k });
        }
      : void 0,
    re = c
      ? (pe) => {
          c(pe, { ...k });
        }
      : void 0,
    G = d
      ? (pe) => {
          d(pe, { ...k });
        }
      : void 0,
    se = p
      ? (pe) => {
          p(pe, { ...k });
        }
      : void 0,
    ce = m
      ? (pe) => {
          m(pe, { ...k });
        }
      : void 0,
    fe = (pe) => {
      var ge;
      if (!I && p0.includes(pe.key) && V) {
        const { unselectNodesAndEdges: Se, addSelectedEdges: Pe } =
          q.getState();
        pe.key === "Escape"
          ? ((ge = ie.current) == null || ge.blur(), Se({ edges: [k] }))
          : Pe([e]);
      }
    };
  return h.jsx("svg", {
    style: { zIndex: B },
    children: h.jsxs("g", {
      className: nt([
        "react-flow__edge",
        `react-flow__edge-${D}`,
        k.className,
        C,
        {
          selected: k.selected,
          animated: k.animated,
          inactive: !V && !l,
          updating: X,
          selectable: V,
        },
      ]),
      onClick: F,
      onDoubleClick: Q,
      onContextMenu: re,
      onMouseEnter: G,
      onMouseMove: se,
      onMouseLeave: ce,
      onKeyDown: R ? fe : void 0,
      tabIndex: R ? 0 : void 0,
      role: k.ariaRole ?? (R ? "group" : "img"),
      "aria-roledescription": "edge",
      "data-id": e,
      "data-testid": `rf__edge-${e}`,
      "aria-label":
        k.ariaLabel === null
          ? void 0
          : k.ariaLabel || `Edge from ${k.source} to ${k.target}`,
      "aria-describedby": R ? `${X0}-${w}` : void 0,
      ref: ie,
      ...k.domAttributes,
      children: [
        !te &&
          h.jsx(z, {
            id: e,
            source: k.source,
            target: k.target,
            type: k.type,
            selected: k.selected,
            animated: k.animated,
            selectable: V,
            deletable: k.deletable ?? !0,
            label: k.label,
            labelStyle: k.labelStyle,
            labelShowBg: k.labelShowBg,
            labelBgStyle: k.labelBgStyle,
            labelBgPadding: k.labelBgPadding,
            labelBgBorderRadius: k.labelBgBorderRadius,
            sourceX: K,
            sourceY: A,
            targetX: $,
            targetY: U,
            sourcePosition: P,
            targetPosition: M,
            data: k.data,
            style: k.style,
            sourceHandleId: k.sourceHandle,
            targetHandleId: k.targetHandle,
            markerStart: ne,
            markerEnd: oe,
            pathOptions: "pathOptions" in k ? k.pathOptions : void 0,
            interactionWidth: k.interactionWidth,
          }),
        H &&
          h.jsx(Ek, {
            edge: k,
            isReconnectable: H,
            reconnectRadius: v,
            onReconnect: g,
            onReconnectStart: x,
            onReconnectEnd: S,
            sourceX: K,
            sourceY: A,
            targetX: $,
            targetY: U,
            sourcePosition: P,
            targetPosition: M,
            setUpdateHover: Y,
            setReconnecting: L,
          }),
      ],
    }),
  });
}
var Nk = E.memo(kk);
const Ck = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError,
});
function vg({
  defaultMarkerColor: e,
  onlyRenderVisibleElements: r,
  rfId: o,
  edgeTypes: i,
  noPanClassName: l,
  onReconnect: u,
  onEdgeContextMenu: c,
  onEdgeMouseEnter: d,
  onEdgeMouseMove: p,
  onEdgeMouseLeave: m,
  onEdgeClick: v,
  reconnectRadius: g,
  onEdgeDoubleClick: x,
  onReconnectStart: S,
  onReconnectEnd: w,
  disableKeyboardA11y: j,
}) {
  const {
      edgesFocusable: C,
      edgesReconnectable: b,
      elementsSelectable: I,
      onError: k,
    } = ze(Ck, Xe),
    _ = uk(r);
  return h.jsxs("div", {
    className: "react-flow__edges",
    children: [
      h.jsx(pk, { defaultColor: e, rfId: o }),
      _.map((D) =>
        h.jsx(
          Nk,
          {
            id: D,
            edgesFocusable: C,
            edgesReconnectable: b,
            elementsSelectable: I,
            noPanClassName: l,
            onReconnect: u,
            onContextMenu: c,
            onMouseEnter: d,
            onMouseMove: p,
            onMouseLeave: m,
            onClick: v,
            reconnectRadius: g,
            onDoubleClick: x,
            onReconnectStart: S,
            onReconnectEnd: w,
            rfId: o,
            onError: k,
            edgeTypes: i,
            disableKeyboardA11y: j,
          },
          D
        )
      ),
    ],
  });
}
vg.displayName = "EdgeRenderer";
const bk = E.memo(vg),
  jk = (e) =>
    `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function _k({ children: e }) {
  const r = ze(jk);
  return h.jsx("div", {
    className: "react-flow__viewport xyflow__viewport react-flow__container",
    style: { transform: r },
    children: e,
  });
}
function Ik(e) {
  const r = cd(),
    o = E.useRef(!1);
  E.useEffect(() => {
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
  const r = ze(Mk),
    o = Ke();
  return (
    E.useEffect(() => {
      e && (r == null || r(e), o.setState({ transform: [e.x, e.y, e.zoom] }));
    }, [e, r]),
    null
  );
}
function Rk(e) {
  return e.connection.inProgress
    ? { ...e.connection, to: Ys(e.connection.to, e.transform) }
    : { ...e.connection };
}
function Tk(e) {
  return Rk;
}
function Lk(e) {
  const r = Tk();
  return ze(r, Xe);
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
    isValid: d,
    inProgress: p,
  } = ze(zk, Xe);
  return !(u && l && p)
    ? null
    : h.jsx("svg", {
        style: e,
        width: u,
        height: c,
        className: "react-flow__connectionline react-flow__container",
        children: h.jsx("g", {
          className: nt(["react-flow__connection", y0(d)]),
          children: h.jsx(wg, {
            style: r,
            type: o,
            CustomComponent: i,
            isValid: d,
          }),
        }),
      });
}
const wg = ({
  style: e,
  type: r = tr.Bezier,
  CustomComponent: o,
  isValid: i,
}) => {
  const {
    inProgress: l,
    from: u,
    fromNode: c,
    fromHandle: d,
    fromPosition: p,
    to: m,
    toNode: v,
    toHandle: g,
    toPosition: x,
    pointer: S,
  } = Lk();
  if (!l) return;
  if (o)
    return h.jsx(o, {
      connectionLineType: r,
      connectionLineStyle: e,
      fromNode: c,
      fromHandle: d,
      fromX: u.x,
      fromY: u.y,
      toX: m.x,
      toY: m.y,
      fromPosition: p,
      toPosition: x,
      connectionStatus: y0(i),
      toNode: v,
      toHandle: g,
      pointer: S,
    });
  let w = "";
  const j = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: m.x,
    targetY: m.y,
    targetPosition: x,
  };
  switch (r) {
    case tr.Bezier:
      [w] = I0(j);
      break;
    case tr.SimpleBezier:
      [w] = lg(j);
      break;
    case tr.Step:
      [w] = Mc({ ...j, borderRadius: 0 });
      break;
    case tr.SmoothStep:
      [w] = Mc(j);
      break;
    default:
      [w] = R0(j);
  }
  return h.jsx("path", {
    d: w,
    fill: "none",
    className: "react-flow__connection-path",
    style: e,
  });
};
wg.displayName = "ConnectionLine";
const $k = {};
function sm(e = $k) {
  (E.useRef(e), Ke(), E.useEffect(() => {}, [e]));
}
function Dk() {
  (Ke(), E.useRef(!1), E.useEffect(() => {}, []));
}
function Sg({
  nodeTypes: e,
  edgeTypes: r,
  onInit: o,
  onNodeClick: i,
  onEdgeClick: l,
  onNodeDoubleClick: u,
  onEdgeDoubleClick: c,
  onNodeMouseEnter: d,
  onNodeMouseMove: p,
  onNodeMouseLeave: m,
  onNodeContextMenu: v,
  onSelectionContextMenu: g,
  onSelectionStart: x,
  onSelectionEnd: S,
  connectionLineType: w,
  connectionLineStyle: j,
  connectionLineComponent: C,
  connectionLineContainerStyle: b,
  selectionKeyCode: I,
  selectionOnDrag: k,
  selectionMode: _,
  multiSelectionKeyCode: D,
  panActivationKeyCode: z,
  zoomActivationKeyCode: R,
  deleteKeyCode: H,
  onlyRenderVisibleElements: V,
  elementsSelectable: ie,
  defaultViewport: X,
  translateExtent: Y,
  minZoom: te,
  maxZoom: L,
  preventScrolling: q,
  defaultMarkerColor: B,
  zoomOnScroll: K,
  zoomOnPinch: A,
  panOnScroll: $,
  panOnScrollSpeed: U,
  panOnScrollMode: P,
  zoomOnDoubleClick: M,
  panOnDrag: ne,
  onPaneClick: oe,
  onPaneMouseEnter: F,
  onPaneMouseMove: Q,
  onPaneMouseLeave: re,
  onPaneScroll: G,
  onPaneContextMenu: se,
  paneClickDistance: ce,
  nodeClickDistance: fe,
  onEdgeContextMenu: pe,
  onEdgeMouseEnter: ge,
  onEdgeMouseMove: Se,
  onEdgeMouseLeave: Pe,
  reconnectRadius: me,
  onReconnect: Ce,
  onReconnectStart: he,
  onReconnectEnd: _e,
  noDragClassName: De,
  noWheelClassName: it,
  noPanClassName: ht,
  disableKeyboardA11y: ye,
  nodeExtent: Ie,
  rfId: Re,
  viewport: Le,
  onViewportChange: Qe,
}) {
  return (
    sm(e),
    sm(r),
    Dk(),
    Ik(o),
    Pk(Le),
    h.jsx(ZE, {
      onPaneClick: oe,
      onPaneMouseEnter: F,
      onPaneMouseMove: Q,
      onPaneMouseLeave: re,
      onPaneContextMenu: se,
      onPaneScroll: G,
      paneClickDistance: ce,
      deleteKeyCode: H,
      selectionKeyCode: I,
      selectionOnDrag: k,
      selectionMode: _,
      onSelectionStart: x,
      onSelectionEnd: S,
      multiSelectionKeyCode: D,
      panActivationKeyCode: z,
      zoomActivationKeyCode: R,
      elementsSelectable: ie,
      zoomOnScroll: K,
      zoomOnPinch: A,
      zoomOnDoubleClick: M,
      panOnScroll: $,
      panOnScrollSpeed: U,
      panOnScrollMode: P,
      panOnDrag: ne,
      defaultViewport: X,
      translateExtent: Y,
      minZoom: te,
      maxZoom: L,
      onSelectionContextMenu: g,
      preventScrolling: q,
      noDragClassName: De,
      noWheelClassName: it,
      noPanClassName: ht,
      disableKeyboardA11y: ye,
      onViewportChange: Qe,
      isControlledViewport: !!Le,
      children: h.jsxs(_k, {
        children: [
          h.jsx(bk, {
            edgeTypes: r,
            onEdgeClick: l,
            onEdgeDoubleClick: c,
            onReconnect: Ce,
            onReconnectStart: he,
            onReconnectEnd: _e,
            onlyRenderVisibleElements: V,
            onEdgeContextMenu: pe,
            onEdgeMouseEnter: ge,
            onEdgeMouseMove: Se,
            onEdgeMouseLeave: Pe,
            reconnectRadius: me,
            defaultMarkerColor: B,
            noPanClassName: ht,
            disableKeyboardA11y: ye,
            rfId: Re,
          }),
          h.jsx(Ak, { style: j, type: w, component: C, containerStyle: b }),
          h.jsx("div", { className: "react-flow__edgelabel-renderer" }),
          h.jsx(ak, {
            nodeTypes: e,
            onNodeClick: i,
            onNodeDoubleClick: u,
            onNodeMouseEnter: d,
            onNodeMouseMove: p,
            onNodeMouseLeave: m,
            onNodeContextMenu: v,
            nodeClickDistance: fe,
            onlyRenderVisibleElements: V,
            noPanClassName: ht,
            noDragClassName: De,
            disableKeyboardA11y: ye,
            nodeExtent: Ie,
            rfId: Re,
          }),
          h.jsx("div", { className: "react-flow__viewport-portal" }),
        ],
      }),
    })
  );
}
Sg.displayName = "GraphView";
const Ok = E.memo(Sg),
  im = ({
    nodes: e,
    edges: r,
    defaultNodes: o,
    defaultEdges: i,
    width: l,
    height: u,
    fitView: c,
    fitViewOptions: d,
    minZoom: p = 0.5,
    maxZoom: m = 2,
    nodeOrigin: v,
    nodeExtent: g,
    zIndexMode: x = "basic",
  } = {}) => {
    const S = new Map(),
      w = new Map(),
      j = new Map(),
      C = new Map(),
      b = i ?? r ?? [],
      I = o ?? e ?? [],
      k = v ?? [0, 0],
      _ = g ?? Ts;
    z0(j, C, b);
    const D = Rc(I, S, w, { nodeOrigin: k, nodeExtent: _, zIndexMode: x });
    let z = [0, 0, 1];
    if (c && l && u) {
      const R = Ws(S, {
          filter: (X) =>
            !!((X.width || X.initialWidth) && (X.height || X.initialHeight)),
        }),
        {
          x: H,
          y: V,
          zoom: ie,
        } = rd(R, l, u, p, m, (d == null ? void 0 : d.padding) ?? 0.1);
      z = [H, V, ie];
    }
    return {
      rfId: "1",
      width: l ?? 0,
      height: u ?? 0,
      transform: z,
      nodes: I,
      nodesInitialized: D,
      nodeLookup: S,
      parentLookup: w,
      edges: b,
      edgeLookup: C,
      connectionLookup: j,
      onNodesChange: null,
      onEdgesChange: null,
      hasDefaultNodes: o !== void 0,
      hasDefaultEdges: i !== void 0,
      panZoom: null,
      minZoom: p,
      maxZoom: m,
      translateExtent: Ts,
      nodeExtent: _,
      nodesSelectionActive: !1,
      userSelectionActive: !1,
      userSelectionRect: null,
      connectionMode: yo.Strict,
      domNode: null,
      paneDragging: !1,
      noPanClassName: "nopan",
      nodeOrigin: k,
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
      fitViewOptions: d,
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
      zIndexMode: x,
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
    fitViewOptions: d,
    minZoom: p,
    maxZoom: m,
    nodeOrigin: v,
    nodeExtent: g,
    zIndexMode: x,
  }) =>
    oE((S, w) => {
      async function j() {
        const {
          nodeLookup: C,
          panZoom: b,
          fitViewOptions: I,
          fitViewResolver: k,
          width: _,
          height: D,
          minZoom: z,
          maxZoom: R,
        } = w();
        b &&
          (await ZS(
            {
              nodes: C,
              width: _,
              height: D,
              panZoom: b,
              minZoom: z,
              maxZoom: R,
            },
            I
          ),
          k == null || k.resolve(!0),
          S({ fitViewResolver: null }));
      }
      return {
        ...im({
          nodes: e,
          edges: r,
          width: l,
          height: u,
          fitView: c,
          fitViewOptions: d,
          minZoom: p,
          maxZoom: m,
          nodeOrigin: v,
          nodeExtent: g,
          defaultNodes: o,
          defaultEdges: i,
          zIndexMode: x,
        }),
        setNodes: (C) => {
          const {
              nodeLookup: b,
              parentLookup: I,
              nodeOrigin: k,
              elevateNodesOnSelect: _,
              fitViewQueued: D,
              zIndexMode: z,
            } = w(),
            R = Rc(C, b, I, {
              nodeOrigin: k,
              nodeExtent: g,
              elevateNodesOnSelect: _,
              checkEquality: !0,
              zIndexMode: z,
            });
          D && R
            ? (j(),
              S({
                nodes: C,
                nodesInitialized: R,
                fitViewQueued: !1,
                fitViewOptions: void 0,
              }))
            : S({ nodes: C, nodesInitialized: R });
        },
        setEdges: (C) => {
          const { connectionLookup: b, edgeLookup: I } = w();
          (z0(b, I, C), S({ edges: C }));
        },
        setDefaultNodesAndEdges: (C, b) => {
          if (C) {
            const { setNodes: I } = w();
            (I(C), S({ hasDefaultNodes: !0 }));
          }
          if (b) {
            const { setEdges: I } = w();
            (I(b), S({ hasDefaultEdges: !0 }));
          }
        },
        updateNodeInternals: (C) => {
          const {
              triggerNodeChanges: b,
              nodeLookup: I,
              parentLookup: k,
              domNode: _,
              nodeOrigin: D,
              nodeExtent: z,
              debug: R,
              fitViewQueued: H,
              zIndexMode: V,
            } = w(),
            { changes: ie, updatedInternals: X } = E5(C, I, k, _, D, z, V);
          X &&
            (x5(I, k, { nodeOrigin: D, nodeExtent: z, zIndexMode: V }),
            H ? (j(), S({ fitViewQueued: !1, fitViewOptions: void 0 })) : S({}),
            (ie == null ? void 0 : ie.length) > 0 &&
              (R && console.log("React Flow: trigger node changes", ie),
              b == null || b(ie)));
        },
        updateNodePositions: (C, b = !1) => {
          const I = [];
          let k = [];
          const {
            nodeLookup: _,
            triggerNodeChanges: D,
            connection: z,
            updateConnection: R,
            onNodesChangeMiddlewareMap: H,
          } = w();
          for (const [V, ie] of C) {
            const X = _.get(V),
              Y = !!(
                X != null &&
                X.expandParent &&
                X != null &&
                X.parentId &&
                ie != null &&
                ie.position
              ),
              te = {
                id: V,
                type: "position",
                position: Y
                  ? {
                      x: Math.max(0, ie.position.x),
                      y: Math.max(0, ie.position.y),
                    }
                  : ie.position,
                dragging: b,
              };
            if (X && z.inProgress && z.fromNode.id === X.id) {
              const L = Pr(X, z.fromHandle, Ne.Left, !0);
              R({ ...z, from: L });
            }
            (Y &&
              X.parentId &&
              I.push({
                id: V,
                parentId: X.parentId,
                rect: {
                  ...ie.internals.positionAbsolute,
                  width: ie.measured.width ?? 0,
                  height: ie.measured.height ?? 0,
                },
              }),
              k.push(te));
          }
          if (I.length > 0) {
            const { parentLookup: V, nodeOrigin: ie } = w(),
              X = ud(I, _, V, ie);
            k.push(...X);
          }
          for (const V of H.values()) k = V(k);
          D(k);
        },
        triggerNodeChanges: (C) => {
          const {
            onNodesChange: b,
            setNodes: I,
            nodes: k,
            hasDefaultNodes: _,
            debug: D,
          } = w();
          if (C != null && C.length) {
            if (_) {
              const z = G0(C, k);
              I(z);
            }
            (D && console.log("React Flow: trigger node changes", C),
              b == null || b(C));
          }
        },
        triggerEdgeChanges: (C) => {
          const {
            onEdgesChange: b,
            setEdges: I,
            edges: k,
            hasDefaultEdges: _,
            debug: D,
          } = w();
          if (C != null && C.length) {
            if (_) {
              const z = q0(C, k);
              I(z);
            }
            (D && console.log("React Flow: trigger edge changes", C),
              b == null || b(C));
          }
        },
        addSelectedNodes: (C) => {
          const {
            multiSelectionActive: b,
            edgeLookup: I,
            nodeLookup: k,
            triggerNodeChanges: _,
            triggerEdgeChanges: D,
          } = w();
          if (b) {
            const z = C.map((R) => kr(R, !0));
            _(z);
            return;
          }
          (_(fo(k, new Set([...C]), !0)), D(fo(I)));
        },
        addSelectedEdges: (C) => {
          const {
            multiSelectionActive: b,
            edgeLookup: I,
            nodeLookup: k,
            triggerNodeChanges: _,
            triggerEdgeChanges: D,
          } = w();
          if (b) {
            const z = C.map((R) => kr(R, !0));
            D(z);
            return;
          }
          (D(fo(I, new Set([...C]))), _(fo(k, new Set(), !0)));
        },
        unselectNodesAndEdges: ({ nodes: C, edges: b } = {}) => {
          const {
              edges: I,
              nodes: k,
              nodeLookup: _,
              triggerNodeChanges: D,
              triggerEdgeChanges: z,
            } = w(),
            R = C || k,
            H = b || I,
            V = R.map((X) => {
              const Y = _.get(X.id);
              return (Y && (Y.selected = !1), kr(X.id, !1));
            }),
            ie = H.map((X) => kr(X.id, !1));
          (D(V), z(ie));
        },
        setMinZoom: (C) => {
          const { panZoom: b, maxZoom: I } = w();
          (b == null || b.setScaleExtent([C, I]), S({ minZoom: C }));
        },
        setMaxZoom: (C) => {
          const { panZoom: b, minZoom: I } = w();
          (b == null || b.setScaleExtent([I, C]), S({ maxZoom: C }));
        },
        setTranslateExtent: (C) => {
          var b;
          ((b = w().panZoom) == null || b.setTranslateExtent(C),
            S({ translateExtent: C }));
        },
        resetSelectedElements: () => {
          const {
            edges: C,
            nodes: b,
            triggerNodeChanges: I,
            triggerEdgeChanges: k,
            elementsSelectable: _,
          } = w();
          if (!_) return;
          const D = b.reduce(
              (R, H) => (H.selected ? [...R, kr(H.id, !1)] : R),
              []
            ),
            z = C.reduce((R, H) => (H.selected ? [...R, kr(H.id, !1)] : R), []);
          (I(D), k(z));
        },
        setNodeExtent: (C) => {
          const {
            nodes: b,
            nodeLookup: I,
            parentLookup: k,
            nodeOrigin: _,
            elevateNodesOnSelect: D,
            nodeExtent: z,
            zIndexMode: R,
          } = w();
          (C[0][0] === z[0][0] &&
            C[0][1] === z[0][1] &&
            C[1][0] === z[1][0] &&
            C[1][1] === z[1][1]) ||
            (Rc(b, I, k, {
              nodeOrigin: _,
              nodeExtent: C,
              elevateNodesOnSelect: D,
              checkEquality: !1,
              zIndexMode: R,
            }),
            S({ nodeExtent: C }));
        },
        panBy: (C) => {
          const {
            transform: b,
            width: I,
            height: k,
            panZoom: _,
            translateExtent: D,
          } = w();
          return k5({
            delta: C,
            panZoom: _,
            transform: b,
            translateExtent: D,
            width: I,
            height: k,
          });
        },
        setCenter: async (C, b, I) => {
          const { width: k, height: _, maxZoom: D, panZoom: z } = w();
          if (!z) return Promise.resolve(!1);
          const R = typeof (I == null ? void 0 : I.zoom) < "u" ? I.zoom : D;
          return (
            await z.setViewport(
              { x: k / 2 - C * R, y: _ / 2 - b * R, zoom: R },
              {
                duration: I == null ? void 0 : I.duration,
                ease: I == null ? void 0 : I.ease,
                interpolate: I == null ? void 0 : I.interpolate,
              }
            ),
            Promise.resolve(!0)
          );
        },
        cancelConnection: () => {
          S({ connection: { ...g0 } });
        },
        updateConnection: (C) => {
          S({ connection: C });
        },
        reset: () => S({ ...im() }),
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
  initialMaxZoom: d,
  initialFitViewOptions: p,
  fitView: m,
  nodeOrigin: v,
  nodeExtent: g,
  zIndexMode: x,
  children: S,
}) {
  const [w] = E.useState(() =>
    Fk({
      nodes: e,
      edges: r,
      defaultNodes: o,
      defaultEdges: i,
      width: l,
      height: u,
      fitView: m,
      minZoom: c,
      maxZoom: d,
      fitViewOptions: p,
      nodeOrigin: v,
      nodeExtent: g,
      zIndexMode: x,
    })
  );
  return h.jsx(sE, { value: w, children: h.jsx(_E, { children: S }) });
}
function Bk({
  children: e,
  nodes: r,
  edges: o,
  defaultNodes: i,
  defaultEdges: l,
  width: u,
  height: c,
  fitView: d,
  fitViewOptions: p,
  minZoom: m,
  maxZoom: v,
  nodeOrigin: g,
  nodeExtent: x,
  zIndexMode: S,
}) {
  return E.useContext(Zl)
    ? h.jsx(h.Fragment, { children: e })
    : h.jsx(Hk, {
        initialNodes: r,
        initialEdges: o,
        defaultNodes: i,
        defaultEdges: l,
        initialWidth: u,
        initialHeight: c,
        fitView: d,
        initialFitViewOptions: p,
        initialMinZoom: m,
        initialMaxZoom: v,
        nodeOrigin: g,
        nodeExtent: x,
        zIndexMode: S,
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
    onNodeClick: d,
    onEdgeClick: p,
    onInit: m,
    onMove: v,
    onMoveStart: g,
    onMoveEnd: x,
    onConnect: S,
    onConnectStart: w,
    onConnectEnd: j,
    onClickConnectStart: C,
    onClickConnectEnd: b,
    onNodeMouseEnter: I,
    onNodeMouseMove: k,
    onNodeMouseLeave: _,
    onNodeContextMenu: D,
    onNodeDoubleClick: z,
    onNodeDragStart: R,
    onNodeDrag: H,
    onNodeDragStop: V,
    onNodesDelete: ie,
    onEdgesDelete: X,
    onDelete: Y,
    onSelectionChange: te,
    onSelectionDragStart: L,
    onSelectionDrag: q,
    onSelectionDragStop: B,
    onSelectionContextMenu: K,
    onSelectionStart: A,
    onSelectionEnd: $,
    onBeforeDelete: U,
    connectionMode: P,
    connectionLineType: M = tr.Bezier,
    connectionLineStyle: ne,
    connectionLineComponent: oe,
    connectionLineContainerStyle: F,
    deleteKeyCode: Q = "Backspace",
    selectionKeyCode: re = "Shift",
    selectionOnDrag: G = !1,
    selectionMode: se = Ls.Full,
    panActivationKeyCode: ce = "Space",
    multiSelectionKeyCode: fe = As() ? "Meta" : "Control",
    zoomActivationKeyCode: pe = As() ? "Meta" : "Control",
    snapToGrid: ge,
    snapGrid: Se,
    onlyRenderVisibleElements: Pe = !1,
    selectNodesOnDrag: me,
    nodesDraggable: Ce,
    autoPanOnNodeFocus: he,
    nodesConnectable: _e,
    nodesFocusable: De,
    nodeOrigin: it = K0,
    edgesFocusable: ht,
    edgesReconnectable: ye,
    elementsSelectable: Ie = !0,
    defaultViewport: Re = xE,
    minZoom: Le = 0.5,
    maxZoom: Qe = 2,
    translateExtent: Be = Ts,
    preventScrolling: Et = !0,
    nodeExtent: Fe,
    defaultMarkerColor: Mt = "#b1b1b7",
    zoomOnScroll: gn = !0,
    zoomOnPinch: xt = !0,
    panOnScroll: vt = !1,
    panOnScrollSpeed: or = 0.5,
    panOnScrollMode: yn = jr.Free,
    zoomOnDoubleClick: sr = !0,
    panOnDrag: bo = !0,
    onPaneClick: jo,
    onPaneMouseEnter: _o,
    onPaneMouseMove: Rn,
    onPaneMouseLeave: Tn,
    onPaneScroll: Xs,
    onPaneContextMenu: Ks,
    paneClickDistance: Qs = 1,
    nodeClickDistance: Gs = 0,
    children: qs,
    onReconnect: Io,
    onReconnectStart: Js,
    onReconnectEnd: ir,
    onEdgeContextMenu: Mo,
    onEdgeDoubleClick: lr,
    onEdgeMouseEnter: ra,
    onEdgeMouseMove: ar,
    onEdgeMouseLeave: Rr,
    reconnectRadius: Tr = 10,
    onNodesChange: Po,
    onEdgesChange: oa,
    noDragClassName: sa = "nodrag",
    noWheelClassName: ia = "nowheel",
    noPanClassName: on = "nopan",
    fitView: Ro,
    fitViewOptions: To,
    connectOnClick: la,
    attributionPosition: Zs,
    proOptions: ei,
    defaultEdgeOptions: ti,
    elevateNodesOnSelect: ni = !0,
    elevateEdgesOnSelect: aa = !1,
    disableKeyboardA11y: ri = !1,
    autoPanOnConnect: Ge,
    autoPanOnNodeDrag: ua,
    autoPanSpeed: Lo,
    connectionRadius: oi,
    isValidConnection: Lr,
    onError: ca,
    style: si,
    id: ur,
    nodeDragThreshold: Ot,
    connectionDragThreshold: da,
    viewport: Pt,
    onViewportChange: fa,
    width: ha,
    height: pa,
    colorMode: zr = "light",
    debug: Ar,
    onScroll: sn,
    ariaLabelConfig: $r,
    zIndexMode: ii = "basic",
    ...ma
  },
  zo
) {
  const Dr = ur || "1",
    Ao = EE(zr),
    cr = E.useCallback(
      (li) => {
        (li.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }),
          sn == null || sn(li));
      },
      [sn]
    );
  return h.jsx("div", {
    "data-testid": "rf__wrapper",
    ...ma,
    onScroll: cr,
    style: { ...si, ...Vk },
    ref: zo,
    className: nt(["react-flow", l, Ao]),
    id: ur,
    role: "application",
    children: h.jsxs(Bk, {
      nodes: e,
      edges: r,
      width: ha,
      height: pa,
      fitView: Ro,
      fitViewOptions: To,
      minZoom: Le,
      maxZoom: Qe,
      nodeOrigin: it,
      nodeExtent: Fe,
      zIndexMode: ii,
      children: [
        h.jsx(Ok, {
          onInit: m,
          onNodeClick: d,
          onEdgeClick: p,
          onNodeMouseEnter: I,
          onNodeMouseMove: k,
          onNodeMouseLeave: _,
          onNodeContextMenu: D,
          onNodeDoubleClick: z,
          nodeTypes: u,
          edgeTypes: c,
          connectionLineType: M,
          connectionLineStyle: ne,
          connectionLineComponent: oe,
          connectionLineContainerStyle: F,
          selectionKeyCode: re,
          selectionOnDrag: G,
          selectionMode: se,
          deleteKeyCode: Q,
          multiSelectionKeyCode: fe,
          panActivationKeyCode: ce,
          zoomActivationKeyCode: pe,
          onlyRenderVisibleElements: Pe,
          defaultViewport: Re,
          translateExtent: Be,
          minZoom: Le,
          maxZoom: Qe,
          preventScrolling: Et,
          zoomOnScroll: gn,
          zoomOnPinch: xt,
          zoomOnDoubleClick: sr,
          panOnScroll: vt,
          panOnScrollSpeed: or,
          panOnScrollMode: yn,
          panOnDrag: bo,
          onPaneClick: jo,
          onPaneMouseEnter: _o,
          onPaneMouseMove: Rn,
          onPaneMouseLeave: Tn,
          onPaneScroll: Xs,
          onPaneContextMenu: Ks,
          paneClickDistance: Qs,
          nodeClickDistance: Gs,
          onSelectionContextMenu: K,
          onSelectionStart: A,
          onSelectionEnd: $,
          onReconnect: Io,
          onReconnectStart: Js,
          onReconnectEnd: ir,
          onEdgeContextMenu: Mo,
          onEdgeDoubleClick: lr,
          onEdgeMouseEnter: ra,
          onEdgeMouseMove: ar,
          onEdgeMouseLeave: Rr,
          reconnectRadius: Tr,
          defaultMarkerColor: Mt,
          noDragClassName: sa,
          noWheelClassName: ia,
          noPanClassName: on,
          rfId: Dr,
          disableKeyboardA11y: ri,
          nodeExtent: Fe,
          viewport: Pt,
          onViewportChange: fa,
        }),
        h.jsx(SE, {
          nodes: e,
          edges: r,
          defaultNodes: o,
          defaultEdges: i,
          onConnect: S,
          onConnectStart: w,
          onConnectEnd: j,
          onClickConnectStart: C,
          onClickConnectEnd: b,
          nodesDraggable: Ce,
          autoPanOnNodeFocus: he,
          nodesConnectable: _e,
          nodesFocusable: De,
          edgesFocusable: ht,
          edgesReconnectable: ye,
          elementsSelectable: Ie,
          elevateNodesOnSelect: ni,
          elevateEdgesOnSelect: aa,
          minZoom: Le,
          maxZoom: Qe,
          nodeExtent: Fe,
          onNodesChange: Po,
          onEdgesChange: oa,
          snapToGrid: ge,
          snapGrid: Se,
          connectionMode: P,
          translateExtent: Be,
          connectOnClick: la,
          defaultEdgeOptions: ti,
          fitView: Ro,
          fitViewOptions: To,
          onNodesDelete: ie,
          onEdgesDelete: X,
          onDelete: Y,
          onNodeDragStart: R,
          onNodeDrag: H,
          onNodeDragStop: V,
          onSelectionDrag: q,
          onSelectionDragStart: L,
          onSelectionDragStop: B,
          onMove: v,
          onMoveStart: g,
          onMoveEnd: x,
          noPanClassName: on,
          nodeOrigin: it,
          rfId: Dr,
          autoPanOnConnect: Ge,
          autoPanOnNodeDrag: ua,
          autoPanSpeed: Lo,
          onError: ca,
          connectionRadius: oi,
          isValidConnection: Lr,
          selectNodesOnDrag: me,
          nodeDragThreshold: Ot,
          connectionDragThreshold: da,
          onBeforeDelete: U,
          debug: Ar,
          ariaLabelConfig: $r,
          zIndexMode: ii,
        }),
        h.jsx(yE, { onSelectionChange: te }),
        qs,
        h.jsx(fE, { proOptions: ei, position: Zs }),
        h.jsx(dE, { rfId: Dr, disableKeyboardA11y: ri }),
      ],
    }),
  });
}
var Uk = J0(Wk);
function Yk(e) {
  const [r, o] = E.useState(e),
    i = E.useCallback((l) => o((u) => G0(l, u)), []);
  return [r, o, i];
}
function Xk(e) {
  const [r, o] = E.useState(e),
    i = E.useCallback((l) => o((u) => q0(l, u)), []);
  return [r, o, i];
}
function Kk({ dimensions: e, lineWidth: r, variant: o, className: i }) {
  return h.jsx("path", {
    strokeWidth: r,
    d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`,
    className: nt(["react-flow__background-pattern", o, i]),
  });
}
function Qk({ radius: e, className: r }) {
  return h.jsx("circle", {
    cx: e,
    cy: e,
    r: e,
    className: nt(["react-flow__background-pattern", "dots", r]),
  });
}
var nr;
(function (e) {
  ((e.Lines = "lines"), (e.Dots = "dots"), (e.Cross = "cross"));
})(nr || (nr = {}));
const Gk = { [nr.Dots]: 1, [nr.Lines]: 1, [nr.Cross]: 6 },
  qk = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function Eg({
  id: e,
  variant: r = nr.Dots,
  gap: o = 20,
  size: i,
  lineWidth: l = 1,
  offset: u = 0,
  color: c,
  bgColor: d,
  style: p,
  className: m,
  patternClassName: v,
}) {
  const g = E.useRef(null),
    { transform: x, patternId: S } = ze(qk, Xe),
    w = i || Gk[r],
    j = r === nr.Dots,
    C = r === nr.Cross,
    b = Array.isArray(o) ? o : [o, o],
    I = [b[0] * x[2] || 1, b[1] * x[2] || 1],
    k = w * x[2],
    _ = Array.isArray(u) ? u : [u, u],
    D = C ? [k, k] : I,
    z = [_[0] * x[2] || 1 + D[0] / 2, _[1] * x[2] || 1 + D[1] / 2],
    R = `${S}${e || ""}`;
  return h.jsxs("svg", {
    className: nt(["react-flow__background", m]),
    style: {
      ...p,
      ...ta,
      "--xy-background-color-props": d,
      "--xy-background-pattern-color-props": c,
    },
    ref: g,
    "data-testid": "rf__background",
    children: [
      h.jsx("pattern", {
        id: R,
        x: x[0] % I[0],
        y: x[1] % I[1],
        width: I[0],
        height: I[1],
        patternUnits: "userSpaceOnUse",
        patternTransform: `translate(-${z[0]},-${z[1]})`,
        children: j
          ? h.jsx(Qk, { radius: k / 2, className: v })
          : h.jsx(Kk, {
              dimensions: D,
              lineWidth: l,
              variant: r,
              className: v,
            }),
      }),
      h.jsx("rect", {
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
E.memo(Eg);
function Jk() {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    children: h.jsx("path", {
      d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z",
    }),
  });
}
function Zk() {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 5",
    children: h.jsx("path", { d: "M0 0h32v4.2H0z" }),
  });
}
function eN() {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 30",
    children: h.jsx("path", {
      d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z",
    }),
  });
}
function tN() {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32",
    children: h.jsx("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z",
    }),
  });
}
function nN() {
  return h.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 32",
    children: h.jsx("path", {
      d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z",
    }),
  });
}
function xl({ children: e, className: r, ...o }) {
  return h.jsx("button", {
    type: "button",
    className: nt(["react-flow__controls-button", r]),
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
  onFitView: d,
  onInteractiveChange: p,
  className: m,
  children: v,
  position: g = "bottom-left",
  orientation: x = "vertical",
  "aria-label": S,
}) {
  const w = Ke(),
    {
      isInteractive: j,
      minZoomReached: C,
      maxZoomReached: b,
      ariaLabelConfig: I,
    } = ze(rN, Xe),
    { zoomIn: k, zoomOut: _, fitView: D } = cd(),
    z = () => {
      (k(), u == null || u());
    },
    R = () => {
      (_(), c == null || c());
    },
    H = () => {
      (D(l), d == null || d());
    },
    V = () => {
      (w.setState({
        nodesDraggable: !j,
        nodesConnectable: !j,
        elementsSelectable: !j,
      }),
        p == null || p(!j));
    },
    ie = x === "horizontal" ? "horizontal" : "vertical";
  return h.jsxs(ea, {
    className: nt(["react-flow__controls", ie, m]),
    position: g,
    style: e,
    "data-testid": "rf__controls",
    "aria-label": S ?? I["controls.ariaLabel"],
    children: [
      r &&
        h.jsxs(h.Fragment, {
          children: [
            h.jsx(xl, {
              onClick: z,
              className: "react-flow__controls-zoomin",
              title: I["controls.zoomIn.ariaLabel"],
              "aria-label": I["controls.zoomIn.ariaLabel"],
              disabled: b,
              children: h.jsx(Jk, {}),
            }),
            h.jsx(xl, {
              onClick: R,
              className: "react-flow__controls-zoomout",
              title: I["controls.zoomOut.ariaLabel"],
              "aria-label": I["controls.zoomOut.ariaLabel"],
              disabled: C,
              children: h.jsx(Zk, {}),
            }),
          ],
        }),
      o &&
        h.jsx(xl, {
          className: "react-flow__controls-fitview",
          onClick: H,
          title: I["controls.fitView.ariaLabel"],
          "aria-label": I["controls.fitView.ariaLabel"],
          children: h.jsx(eN, {}),
        }),
      i &&
        h.jsx(xl, {
          className: "react-flow__controls-interactive",
          onClick: V,
          title: I["controls.interactive.ariaLabel"],
          "aria-label": I["controls.interactive.ariaLabel"],
          children: j ? h.jsx(nN, {}) : h.jsx(tN, {}),
        }),
      v,
    ],
  });
}
kg.displayName = "Controls";
const oN = E.memo(kg);
function sN({
  id: e,
  x: r,
  y: o,
  width: i,
  height: l,
  style: u,
  color: c,
  strokeColor: d,
  strokeWidth: p,
  className: m,
  borderRadius: v,
  shapeRendering: g,
  selected: x,
  onClick: S,
}) {
  const { background: w, backgroundColor: j } = u || {},
    C = c || w || j;
  return h.jsx("rect", {
    className: nt(["react-flow__minimap-node", { selected: x }, m]),
    x: r,
    y: o,
    rx: v,
    ry: v,
    width: i,
    height: l,
    style: { fill: C, stroke: d, strokeWidth: p },
    shapeRendering: g,
    onClick: S ? (b) => S(b, e) : void 0,
  });
}
const iN = E.memo(sN),
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
  const d = ze(lN, Xe),
    p = hc(r),
    m = hc(e),
    v = hc(o),
    g =
      typeof window > "u" || window.chrome
        ? "crispEdges"
        : "geometricPrecision";
  return h.jsx(h.Fragment, {
    children: d.map((x) =>
      h.jsx(
        cN,
        {
          id: x,
          nodeColorFunc: p,
          nodeStrokeColorFunc: m,
          nodeClassNameFunc: v,
          nodeBorderRadius: i,
          nodeStrokeWidth: l,
          NodeComponent: u,
          onClick: c,
          shapeRendering: g,
        },
        x
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
  NodeComponent: d,
  onClick: p,
}) {
  const {
    node: m,
    x: v,
    y: g,
    width: x,
    height: S,
  } = ze((w) => {
    const { internals: j } = w.nodeLookup.get(e),
      C = j.userNode,
      { x: b, y: I } = j.positionAbsolute,
      { width: k, height: _ } = Pn(C);
    return { node: C, x: b, y: I, width: k, height: _ };
  }, Xe);
  return !m || m.hidden || !k0(m)
    ? null
    : h.jsx(d, {
        x: v,
        y: g,
        width: x,
        height: S,
        style: m.style,
        selected: !!m.selected,
        className: i(m),
        color: r(m),
        borderRadius: l,
        strokeColor: o(m),
        strokeWidth: u,
        shapeRendering: c,
        onClick: p,
        id: m.id,
      });
}
const cN = E.memo(uN);
var dN = E.memo(aN);
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
        e.nodeLookup.size > 0 ? E0(Ws(e.nodeLookup, { filter: pN }), r) : r,
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
  nodeComponent: d,
  bgColor: p,
  maskColor: m,
  maskStrokeColor: v,
  maskStrokeWidth: g,
  position: x = "bottom-right",
  onClick: S,
  onNodeClick: w,
  pannable: j = !1,
  zoomable: C = !1,
  ariaLabel: b,
  inversePan: I,
  zoomStep: k = 1,
  offsetScale: _ = 5,
}) {
  const D = Ke(),
    z = E.useRef(null),
    {
      boundingRect: R,
      viewBB: H,
      rfId: V,
      panZoom: ie,
      translateExtent: X,
      flowWidth: Y,
      flowHeight: te,
      ariaLabelConfig: L,
    } = ze(mN, Xe),
    q = (e == null ? void 0 : e.width) ?? fN,
    B = (e == null ? void 0 : e.height) ?? hN,
    K = R.width / q,
    A = R.height / B,
    $ = Math.max(K, A),
    U = $ * q,
    P = $ * B,
    M = _ * $,
    ne = R.x - (U - R.width) / 2 - M,
    oe = R.y - (P - R.height) / 2 - M,
    F = U + M * 2,
    Q = P + M * 2,
    re = `${gN}-${V}`,
    G = E.useRef(0),
    se = E.useRef();
  ((G.current = $),
    E.useEffect(() => {
      if (z.current && ie)
        return (
          (se.current = R5({
            domNode: z.current,
            panZoom: ie,
            getTransform: () => D.getState().transform,
            getViewScale: () => G.current,
          })),
          () => {
            var ge;
            (ge = se.current) == null || ge.destroy();
          }
        );
    }, [ie]),
    E.useEffect(() => {
      var ge;
      (ge = se.current) == null ||
        ge.update({
          translateExtent: X,
          width: Y,
          height: te,
          inversePan: I,
          pannable: j,
          zoomStep: k,
          zoomable: C,
        });
    }, [j, C, I, k, X, Y, te]));
  const ce = S
      ? (ge) => {
          var me;
          const [Se, Pe] = ((me = se.current) == null
            ? void 0
            : me.pointer(ge)) || [0, 0];
          S(ge, { x: Se, y: Pe });
        }
      : void 0,
    fe = w
      ? E.useCallback((ge, Se) => {
          const Pe = D.getState().nodeLookup.get(Se).internals.userNode;
          w(ge, Pe);
        }, [])
      : void 0,
    pe = b ?? L["minimap.ariaLabel"];
  return h.jsx(ea, {
    position: x,
    style: {
      ...e,
      "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
      "--xy-minimap-mask-background-color-props":
        typeof m == "string" ? m : void 0,
      "--xy-minimap-mask-stroke-color-props": typeof v == "string" ? v : void 0,
      "--xy-minimap-mask-stroke-width-props":
        typeof g == "number" ? g * $ : void 0,
      "--xy-minimap-node-background-color-props":
        typeof i == "string" ? i : void 0,
      "--xy-minimap-node-stroke-color-props": typeof o == "string" ? o : void 0,
      "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0,
    },
    className: nt(["react-flow__minimap", r]),
    "data-testid": "rf__minimap",
    children: h.jsxs("svg", {
      width: q,
      height: B,
      viewBox: `${ne} ${oe} ${F} ${Q}`,
      className: "react-flow__minimap-svg",
      role: "img",
      "aria-labelledby": re,
      ref: z,
      onClick: ce,
      children: [
        pe && h.jsx("title", { id: re, children: pe }),
        h.jsx(dN, {
          onClick: fe,
          nodeColor: i,
          nodeStrokeColor: o,
          nodeBorderRadius: u,
          nodeClassName: l,
          nodeStrokeWidth: c,
          nodeComponent: d,
        }),
        h.jsx("path", {
          className: "react-flow__minimap-mask",
          d: `M${ne - M},${oe - M}h${F + M * 2}v${Q + M * 2}h${-F - M * 2}z
        M${H.x},${H.y}h${H.width}v${H.height}h${-H.width}z`,
          fillRule: "evenodd",
          pointerEvents: "none",
        }),
      ],
    }),
  });
}
Ng.displayName = "MiniMap";
const yN = E.memo(Ng),
  xN = (e) => (r) => (e ? `${Math.max(1 / r.transform[2], 1)}` : void 0),
  vN = { [So.Line]: "right", [So.Handle]: "bottom-right" };
function wN({
  nodeId: e,
  position: r,
  variant: o = So.Handle,
  className: i,
  style: l = void 0,
  children: u,
  color: c,
  minWidth: d = 10,
  minHeight: p = 10,
  maxWidth: m = Number.MAX_VALUE,
  maxHeight: v = Number.MAX_VALUE,
  keepAspectRatio: g = !1,
  resizeDirection: x,
  autoScale: S = !0,
  shouldResize: w,
  onResizeStart: j,
  onResize: C,
  onResizeEnd: b,
}) {
  const I = ng(),
    k = typeof e == "string" ? e : I,
    _ = Ke(),
    D = E.useRef(null),
    z = o === So.Handle,
    R = ze(E.useCallback(xN(z && S), [z, S]), Xe),
    H = E.useRef(null),
    V = r ?? vN[o];
  E.useEffect(() => {
    if (!(!D.current || !k))
      return (
        H.current ||
          (H.current = Y5({
            domNode: D.current,
            nodeId: k,
            getStoreItems: () => {
              const {
                nodeLookup: X,
                transform: Y,
                snapGrid: te,
                snapToGrid: L,
                nodeOrigin: q,
                domNode: B,
              } = _.getState();
              return {
                nodeLookup: X,
                transform: Y,
                snapGrid: te,
                snapToGrid: L,
                nodeOrigin: q,
                paneDomNode: B,
              };
            },
            onChange: (X, Y) => {
              const {
                  triggerNodeChanges: te,
                  nodeLookup: L,
                  parentLookup: q,
                  nodeOrigin: B,
                } = _.getState(),
                K = [],
                A = { x: X.x, y: X.y },
                $ = L.get(k);
              if ($ && $.expandParent && $.parentId) {
                const U = $.origin ?? B,
                  P = X.width ?? $.measured.width ?? 0,
                  M = X.height ?? $.measured.height ?? 0,
                  ne = {
                    id: $.id,
                    parentId: $.parentId,
                    rect: {
                      width: P,
                      height: M,
                      ...N0(
                        { x: X.x ?? $.position.x, y: X.y ?? $.position.y },
                        { width: P, height: M },
                        $.parentId,
                        L,
                        U
                      ),
                    },
                  },
                  oe = ud([ne], L, q, B);
                (K.push(...oe),
                  (A.x = X.x ? Math.max(U[0] * P, X.x) : void 0),
                  (A.y = X.y ? Math.max(U[1] * M, X.y) : void 0));
              }
              if (A.x !== void 0 && A.y !== void 0) {
                const U = { id: k, type: "position", position: { ...A } };
                K.push(U);
              }
              if (X.width !== void 0 && X.height !== void 0) {
                const P = {
                  id: k,
                  type: "dimensions",
                  resizing: !0,
                  setAttributes: x
                    ? x === "horizontal"
                      ? "width"
                      : "height"
                    : !0,
                  dimensions: { width: X.width, height: X.height },
                };
                K.push(P);
              }
              for (const U of Y) {
                const P = { ...U, type: "position" };
                K.push(P);
              }
              te(K);
            },
            onEnd: ({ width: X, height: Y }) => {
              const te = {
                id: k,
                type: "dimensions",
                resizing: !1,
                dimensions: { width: X, height: Y },
              };
              _.getState().triggerNodeChanges([te]);
            },
          })),
        H.current.update({
          controlPosition: V,
          boundaries: { minWidth: d, minHeight: p, maxWidth: m, maxHeight: v },
          keepAspectRatio: g,
          resizeDirection: x,
          onResizeStart: j,
          onResize: C,
          onResizeEnd: b,
          shouldResize: w,
        }),
        () => {
          var X;
          (X = H.current) == null || X.destroy();
        }
      );
  }, [V, d, p, m, v, g, j, C, b, w]);
  const ie = V.split("-");
  return h.jsx("div", {
    className: nt(["react-flow__resize-control", "nodrag", ...ie, o, i]),
    ref: D,
    style: {
      ...l,
      scale: R,
      ...(c && { [z ? "backgroundColor" : "borderColor"]: c }),
    },
    children: u,
  });
}
E.memo(wN);
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
    ft(this, "ws", null);
    ft(this, "url", "");
    ft(this, "config");
    ft(this, "reconnectAttempts", 0);
    ft(this, "reconnectTimer", null);
    ft(this, "currentSessionId", null);
    ft(this, "connectionState", "disconnected");
    ft(this, "onJoined", null);
    ft(this, "onLeft", null);
    ft(this, "onMessage", null);
    ft(this, "onTyping", null);
    ft(this, "onError", null);
    ft(this, "onConnectionChange", null);
    ft(this, "onEdgeCreated", null);
    ft(this, "onEdgeDeleted", null);
    ft(this, "onTokensUpdated", null);
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
    var o, i, l, u, c, d, p, m, v, g;
    try {
      const x = JSON.parse(r);
      if (!EN(x)) {
        (console.error("[WebSocket] Invalid message format:", x),
          (o = this.onError) == null ||
            o.call(this, "Invalid message from server"));
        return;
      }
      const S = x;
      switch (S.type) {
        case "joined":
          (i = this.onJoined) == null || i.call(this, S.sessionId, S.messages);
          break;
        case "left":
          (l = this.onLeft) == null || l.call(this, S.sessionId);
          break;
        case "new-message":
          (u = this.onMessage) == null || u.call(this, S.message);
          break;
        case "typing":
          (c = this.onTyping) == null || c.call(this, S.sessionId, S.isTyping);
          break;
        case "error":
          (d = this.onError) == null || d.call(this, S.message);
          break;
        case "edge_created":
          (p = this.onEdgeCreated) == null || p.call(this, S.edge);
          break;
        case "edge_deleted":
          (m = this.onEdgeDeleted) == null ||
            m.call(this, S.edgeId, S.remainingContext);
          break;
        case "tokens_updated":
          (v = this.onTokensUpdated) == null || v.call(this, S.tokens);
          break;
      }
    } catch (x) {
      (console.error("[WebSocket] Failed to parse message:", x),
        (g = this.onError) == null ||
          g.call(this, "Failed to parse server message"));
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
const st = new NN(),
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
  xs = {
    MAX_MESSAGES: 1e3,
    CONNECTION_TIMEOUT_MS: 5e3,
    CONNECTION_CHECK_INTERVAL_MS: 100,
  },
  lm = () =>
    `${window.location.protocol === "https:" ? "wss:" : "ws:"}//localhost:3001`;
let Cr = null;
function mc() {
  Cr && (clearTimeout(Cr), (Cr = null));
}
const Il = Uc(
    (e, r) => (
      (st.onConnectionChange = (o) => {
        e({ connectionState: o });
      }),
      (st.onJoined = (o, i) => {
        e({ currentSessionId: o, messages: i, lastError: null });
      }),
      (st.onLeft = () => {
        e({ currentSessionId: null, messages: [], typingSessionId: null });
      }),
      (st.onMessage = (o) => {
        e((i) => {
          const l = [...i.messages, o];
          return l.length > xs.MAX_MESSAGES
            ? { messages: l.slice(-1e3) }
            : { messages: l };
        });
      }),
      (st.onTyping = (o, i) => {
        e({ typingSessionId: i ? o : null });
      }),
      (st.onError = (o) => {
        e({ lastError: o });
      }),
      (st.onEdgeCreated = (o) => {
        e({ lastEdgeCreated: o });
      }),
      (st.onEdgeDeleted = (o, i) => {
        e({ lastEdgeDeleted: { edgeId: o, remainingContext: i } });
      }),
      (st.onTokensUpdated = (o) => {
        e({ lastTokensUpdated: o });
      }),
      {
        ...pc,
        connect: (o) => {
          const i = o || lm();
          st.connect(i);
        },
        disconnect: () => {
          (mc(), st.disconnect(), e(pc));
        },
        joinSession: (o) => {
          const { connectionState: i } = r();
          if ((mc(), i !== "connected")) {
            const l = lm();
            st.connect(l);
            let u = 0;
            const c = Math.floor(
                xs.CONNECTION_TIMEOUT_MS / xs.CONNECTION_CHECK_INTERVAL_MS
              ),
              d = () => {
                st.getConnectionState() === "connected"
                  ? (st.joinSession(o), (Cr = null))
                  : u < c
                    ? (u++,
                      (Cr = setTimeout(d, xs.CONNECTION_CHECK_INTERVAL_MS)))
                    : (console.error("[WebSocketStore] Connection timeout"),
                      e({ lastError: "Connection timeout" }),
                      (Cr = null));
              };
            Cr = setTimeout(d, xs.CONNECTION_CHECK_INTERVAL_MS);
          } else st.joinSession(o);
        },
        leaveSession: () => {
          const { currentSessionId: o } = r();
          (o && st.leaveSession(o),
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
          st.sendMessage(i, o);
        },
        setTyping: (o) => {
          const { currentSessionId: i, connectionState: l } = r();
          l !== "connected" || !i || st.sendTyping(i, o);
        },
        clearError: () => {
          e({ lastError: null });
        },
        clearEdgeEvents: () => {
          e({ lastEdgeCreated: null, lastEdgeDeleted: null });
        },
        reset: () => {
          (mc(), st.disconnect(), e(pc));
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
  jN = 260,
  _N = 140,
  Ac = 20;
function am(e) {
  return e.type === "context"
    ? { width: jN, height: _N }
    : { width: CN, height: bN };
}
function Bl(e, r) {
  const o = am(e),
    i = am(r),
    l = { x: e.position.x + o.width / 2, y: e.position.y + o.height / 2 },
    u = { x: r.position.x + i.width / 2, y: r.position.y + i.height / 2 },
    c = (o.width + i.width) / 2 + Ac,
    d = (o.height + i.height) / 2 + Ac,
    p = Math.abs(l.x - u.x),
    m = Math.abs(l.y - u.y);
  return p < c && m < d;
}
function jg(e, r) {
  const o = { ...e.position },
    i = r.filter((p) => p.id !== e.id),
    l = { ...e, position: o };
  if (!i.some((p) => Bl(l, p))) return o;
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
    d = Ac + 20;
  for (let p = 1; p <= 10; p++)
    for (const m of c) {
      const v = { x: o.x + m.dx * d * p, y: o.y + m.dy * d * p };
      if (((l.position = v), !i.some((x) => Bl(l, x)))) return v;
    }
  return { x: o.x + d * 3, y: o.y };
}
function um(e) {
  const r = [];
  let o = !1;
  for (const i of e) {
    const l = { ...i },
      u = jg(l, [...r, l]);
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
    d = 80,
    p = c + (e % 4) * u,
    m = d + Math.floor(e / 4) * l,
    v = { type: o, position: { x: p, y: m } };
  if (!r.some((w) => Bl(v, w))) return { x: p, y: m };
  const x = [
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
    for (const j of x) {
      const C = { x: p + j.dx * S * w, y: m + j.dy * S * w };
      if (((v.position = C), !r.some((I) => Bl(v, I)) && C.x >= 0 && C.y >= 0))
        return C;
    }
  return { x: p, y: m + l * (e + 1) };
}
function dm() {
  try {
    const e = localStorage.getItem(Cg);
    return e ? JSON.parse(e) : {};
  } catch {
    return {};
  }
}
function ao(e) {
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
function vs(e) {
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
function vl(e) {
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
function Ns(e) {
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
  wl = {
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
    l = E.useCallback(
      (d) => {
        var p;
        (d.key === "Enter" || d.key === " ") &&
          (d.preventDefault(), (p = e.onClick) == null || p.call(e));
      },
      [e]
    ),
    u = e.issueType ? LN[e.issueType] || e.issueType : "問題あり";
  return h.jsxs("div", {
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
      h.jsx(Eo, {
        type: "source",
        position: Ne.Right,
        className: "w-3 h-3 bg-[var(--color-primary-500)]",
        "aria-hidden": "true",
      }),
      e.hasIssues &&
        h.jsx("div", {
          className:
            "absolute -top-2 -left-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center cursor-help",
          title: u,
          children: h.jsx("span", {
            role: "img",
            "aria-label": "問題あり",
            children: "🐛",
          }),
        }),
      (e.inputTokens !== void 0 || e.outputTokens !== void 0) &&
        h.jsxs("div", {
          className:
            "absolute -top-2 -right-2 bg-[var(--bg-elevated)] text-[var(--text-muted)] text-[10px] px-1.5 py-0.5 rounded-full border border-[var(--border-default)] whitespace-nowrap",
          "aria-label": `Input: ${e.inputTokens || 0}, Output: ${e.outputTokens || 0}`,
          children: [
            "in:",
            Ns(e.inputTokens || 0),
            " / out:",
            Ns(e.outputTokens || 0),
          ],
        }),
      h.jsx("div", {
        className: `text-sm font-semibold truncate ${o}`,
        children: e.label,
      }),
      h.jsxs("div", {
        className: "flex items-center gap-2 mt-1",
        children: [
          h.jsxs("div", {
            className: "flex items-center gap-2 min-w-0",
            children: [
              e.date &&
                h.jsx("span", {
                  className: "text-xs text-[var(--text-secondary)]",
                  children: e.date,
                }),
              e.projectName &&
                h.jsx("span", {
                  className:
                    "px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded text-[10px] text-[var(--text-primary)] truncate max-w-[70px]",
                  title: e.projectName,
                  children: e.projectName,
                }),
            ],
          }),
          h.jsxs("div", {
            className: "flex items-center gap-1 ml-auto shrink-0",
            children: [
              e.importance &&
                e.importance !== "medium" &&
                h.jsx("span", {
                  className: `w-4 h-4 rounded border text-[9px] font-bold flex items-center justify-center ${zN[e.importance] || ""}`,
                  title: `重要度: ${e.importance}`,
                  "aria-label": `重要度: ${e.importance}`,
                  children: e.importance === "high" ? "H" : "L",
                }),
              e.category &&
                h.jsx("span", {
                  className:
                    "w-4 h-4 rounded bg-[var(--bg-elevated)] text-[9px] font-semibold text-[var(--text-secondary)] flex items-center justify-center",
                  title: wl[e.category] || e.category,
                  "aria-label": wl[e.category] || e.category,
                  children:
                    AN[e.category] ||
                    ((c = wl[e.category]) == null ? void 0 : c[0]) ||
                    "O",
                }),
            ],
          }),
        ],
      }),
      (e.category || (e.importance && e.importance !== "medium")) &&
        h.jsx("div", {
          className:
            "absolute left-0 right-0 top-full mt-1 z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity",
          children: h.jsxs("div", {
            className:
              "px-2 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-primary)] shadow-lg flex items-center gap-2",
            children: [
              e.importance &&
                e.importance !== "medium" &&
                h.jsxs("span", {
                  className: "font-semibold",
                  children: ["重要度: ", e.importance === "high" ? "高" : "低"],
                }),
              e.category &&
                h.jsx("span", {
                  className: "text-[var(--text-secondary)]",
                  children: wl[e.category] || e.category,
                }),
            ],
          }),
        }),
    ],
  });
}
function DN({ data: e }) {
  var u, c, d;
  const r = E.useCallback(() => {
      var p;
      (p = e.onExport) == null || p.call(e);
    }, [e]),
    o = !!e.sessionId,
    i = e.mergeStatus === "merging",
    l = e.mergeStatus === "completed" && e.mergedSummary;
  return h.jsxs("div", {
    className: `px-6 py-4 text-white rounded-xl shadow-lg min-w-[240px] text-center cursor-pointer transition-colors relative ${i ? "bg-[var(--color-primary-400)] animate-pulse" : "bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-500)]"}`,
    onClick: r,
    children: [
      h.jsx(Eo, {
        type: "target",
        position: Ne.Left,
        className: "w-3 h-3 bg-[var(--color-cream-100)]",
      }),
      (e.inputTokens !== void 0 || e.outputTokens !== void 0) &&
        h.jsxs("div", {
          className:
            "absolute -top-2 -right-2 bg-white text-[var(--color-primary-600)] text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[var(--color-primary-600)] whitespace-nowrap",
          children: [
            "in:",
            Ns(e.inputTokens || 0),
            " / out:",
            Ns(e.outputTokens || 0),
          ],
        }),
      h.jsx("div", {
        className: "text-sm font-bold truncate max-w-[220px]",
        children: o ? e.sessionName || e.sessionId : "セッション未接続",
      }),
      o &&
        h.jsxs("div", {
          className: "flex items-center gap-2 mt-1",
          children: [
            e.projectName &&
              h.jsx("span", {
                className:
                  "px-1.5 py-0.5 bg-white/20 rounded text-xs truncate max-w-[100px]",
                title: e.projectName,
                children: e.projectName,
              }),
            e.sessionId &&
              h.jsx("span", {
                className: "text-xs opacity-60 font-mono truncate",
                children: e.sessionId,
              }),
          ],
        }),
      h.jsxs("div", {
        className: "text-xs opacity-90 mt-3 flex justify-center gap-3",
        children: [
          h.jsxs("span", {
            className: "bg-white/20 px-2 py-0.5 rounded",
            children: [e.observationCount, " obs"],
          }),
          h.jsxs("span", {
            className: "bg-white/20 px-2 py-0.5 rounded",
            children: ["+", e.connectedCount, " merged"],
          }),
        ],
      }),
      i &&
        h.jsx("div", {
          className: "text-xs mt-2 bg-white/30 px-2 py-1 rounded",
          children: "🔄 要約を生成中...",
        }),
      l &&
        h.jsxs("div", {
          className: "text-xs mt-2 bg-white/20 px-2 py-1 rounded text-left",
          children: [
            h.jsx("div", {
              className: "font-bold mb-1",
              children: "📝 統合要約:",
            }),
            h.jsx("div", {
              className: "line-clamp-2 opacity-90",
              children: (u = e.mergedSummary) == null ? void 0 : u.shortSummary,
            }),
            h.jsxs("div", {
              className: "opacity-60 mt-1",
              children: [
                (c = e.mergedSummary) == null ? void 0 : c.sessionCount,
                "セッション →",
                " ",
                Ns(
                  ((d = e.mergedSummary) == null ? void 0 : d.mergedTokens) || 0
                ),
                " tokens",
              ],
            }),
          ],
        }),
      e.mergeStatus === "error" &&
        h.jsx("div", {
          className: "text-xs mt-2 bg-red-500/30 px-2 py-1 rounded",
          children: "⚠️ マージ失敗",
        }),
      h.jsx("div", {
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
  pendingDelete: d,
  onDeleteComplete: p,
  onMerge: m,
  mergeStateByContext: v = {},
  onSessionDetail: g,
  hoveredSessionId: x,
}) {
  const S = E.useRef(dm()),
    w = E.useRef(IN()),
    j = E.useRef(MN()),
    [C, b] = E.useState(j.current),
    [I, k] = E.useState({}),
    _ = E.useRef(new Set()),
    [D, z, R] = Yk([]),
    [H, V, ie] = Xk(w.current),
    X = E.useMemo(() => new Map(r.map((F) => [F.projectId, F.name])), [r]),
    Y = E.useCallback(
      (F) => {
        (R(F),
          F.filter(
            (re) => re.type === "position" && "position" in re && re.position
          ).length > 0 &&
            requestAnimationFrame(() => {
              z((re) => {
                const G = {};
                return (
                  re.forEach((se) => {
                    G[se.id] = se.position;
                  }),
                  ao(G),
                  re
                );
              });
            }));
      },
      [R, z]
    ),
    te = E.useCallback(
      (F) => {
        (ie(F),
          requestAnimationFrame(() => {
            V((Q) => (vs(Q), Q));
          }));
      },
      [ie, V]
    ),
    L = E.useCallback(
      (F) => () => {
        (console.log("[Viewer] Export session:", F), u == null || u(F));
      },
      [u]
    );
  (E.useEffect(() => {
    z((F) => {
      const Q = S.current,
        re = new Set(
          F.filter((me) => me.id.startsWith("context-")).map((me) => me.id)
        ),
        G = [];
      let se = [...F],
        ce = 0;
      o.forEach((me) => {
        const Ce = me.session;
        if (!Ce) return;
        const he = `context-${Ce.sessionId}`,
          _e = Q[he],
          De = _e || cm(ce, se, "context");
        if (!re.has(he)) {
          const it = C[he] || [],
            ht = v[he] || { status: "idle", summary: null },
            ye = {
              id: he,
              type: "context",
              position: De,
              data: {
                label: "進行中セッション",
                sessionId: Ce.sessionId,
                sessionName: Ce.name,
                status: Ce.status,
                tokenCount: me.tokenCount,
                inputTokens: Ce.inputTokens ?? me.inputTokens,
                outputTokens: Ce.outputTokens ?? me.outputTokens,
                connectedCount: it.length,
                observationCount: me.observationCount,
                projectName: Ce.projectId ? X.get(Ce.projectId) : void 0,
                onExport: L(Ce.sessionId),
                mergeStatus: ht.status,
                mergedSummary: ht.summary,
              },
            };
          (G.push(ye), (se = [...se, ye]), ce++);
        }
      });
      const fe = new Set(
          o
            .filter((me) => me.session)
            .map((me) => `context-${me.session.sessionId}`)
        ),
        ge = [
          ...F.filter((me) =>
            me.id.startsWith("context-") ? fe.has(me.id) : !0
          ).map((me) => {
            if (me.id.startsWith("context-")) {
              const Ce = me.id.replace("context-", ""),
                he = o.find((_e) => {
                  var De;
                  return (
                    ((De = _e.session) == null ? void 0 : De.sessionId) === Ce
                  );
                });
              if (he != null && he.session) {
                const _e = C[me.id] || [],
                  De = v[me.id] || { status: "idle", summary: null };
                return {
                  ...me,
                  data: {
                    ...me.data,
                    sessionId: he.session.sessionId,
                    sessionName: he.session.name,
                    status: he.session.status,
                    tokenCount: he.tokenCount,
                    inputTokens: he.session.inputTokens ?? he.inputTokens,
                    outputTokens: he.session.outputTokens ?? he.outputTokens,
                    connectedCount: _e.length,
                    observationCount: he.observationCount,
                    projectName: he.session.projectId
                      ? X.get(he.session.projectId)
                      : void 0,
                    onExport: L(he.session.sessionId),
                    mergeStatus: De.status,
                    mergedSummary: De.summary,
                  },
                };
              }
            }
            return me;
          }),
          ...G,
        ],
        Se = um(ge),
        Pe = Se.changed ? Se.nodes : ge;
      if (G.length > 0) {
        const me = {};
        (Pe.forEach((Ce) => {
          me[Ce.id] = Ce.position;
        }),
          ao(me));
      }
      return Pe;
    });
  }, [o, C, L, z, v, X]),
    E.useEffect(() => {
      z((F) => {
        const Q = new Set(F.map((he) => he.id)),
          re = [],
          G = S.current,
          se = new Map(e.map((he) => ["session-" + he.sessionId, he])),
          ce = F.map((he) => {
            if (he.type === "session") {
              const _e = se.get(he.id);
              if (_e) {
                const De = _e.projectId ? X.get(_e.projectId) : void 0;
                if (
                  he.data.label !== _e.name ||
                  he.data.projectName !== De ||
                  he.data.inputTokens !== _e.inputTokens ||
                  he.data.outputTokens !== _e.outputTokens ||
                  he.data.hasIssues !== _e.hasIssues ||
                  he.data.importance !== _e.importance ||
                  he.data.category !== _e.category ||
                  he.data.theme !== i
                )
                  return {
                    ...he,
                    data: {
                      ...he.data,
                      label: _e.name,
                      status: _e.status,
                      date: new Date(_e.updatedAt).toLocaleDateString("ja-JP"),
                      tokenCount: _e.tokenCount,
                      inputTokens: _e.inputTokens,
                      outputTokens: _e.outputTokens,
                      projectName: De,
                      hasIssues: _e.hasIssues,
                      issueType: _e.issueType,
                      importance: _e.importance,
                      category: _e.category,
                      theme: i,
                    },
                  };
              }
            }
            return he;
          });
        let fe = [...ce],
          pe = 0;
        e.forEach((he) => {
          const _e = "session-" + he.sessionId;
          if (!Q.has(_e)) {
            const De = G[_e],
              it = De || cm(pe, fe, "session"),
              ht = he.projectId ? X.get(he.projectId) : void 0,
              ye = {
                id: _e,
                type: "session",
                position: it,
                data: {
                  label: he.name,
                  sessionId: he.sessionId,
                  status: he.status,
                  date: new Date(he.updatedAt).toLocaleDateString("ja-JP"),
                  tokenCount: he.tokenCount,
                  inputTokens: he.inputTokens,
                  outputTokens: he.outputTokens,
                  projectName: ht,
                  hasIssues: he.hasIssues,
                  issueType: he.issueType,
                  importance: he.importance,
                  category: he.category,
                  theme: i,
                  onClick: () => (g == null ? void 0 : g(he.sessionId)),
                },
              };
            (re.push(ye), (fe = [...fe, ye]), pe++);
          }
        });
        const ge = new Set(e.map((he) => "session-" + he.sessionId)),
          Pe = [
            ...ce.filter((he) => he.id.startsWith("context-") || ge.has(he.id)),
            ...re,
          ],
          me = um(Pe),
          Ce = me.changed ? me.nodes : Pe;
        if (re.length > 0) {
          const he = {};
          (Ce.forEach((_e) => {
            he[_e.id] = _e.position;
          }),
            ao(he));
        }
        return Ce;
      });
    }, [e, X, z, i, g]),
    E.useEffect(() => {
      z((F) =>
        F.map((Q) => {
          if (Q.type === "session") {
            const G = Q.data.sessionId === x;
            if (Q.data.isHovered !== G)
              return { ...Q, data: { ...Q.data, isHovered: G } };
          }
          return Q;
        })
      );
    }, [x, z]),
    E.useEffect(() => {
      (async () => {
        for (const Q of o) {
          const re = Q.session;
          if (!re) continue;
          const G = re.sessionId;
          if (_.current.has(G)) continue;
          _.current.add(G);
          const se = await TN(G);
          if (se.length === 0) continue;
          const ce = [],
            fe = {},
            pe = [];
          for (const Se of se) {
            const Pe = `reactflow__edge-session-${Se.sourceSessionId}-context-${G}`;
            (ce.push({
              id: Pe,
              source: `session-${Se.sourceSessionId}`,
              target: `context-${G}`,
            }),
              (fe[Pe] = Se.edgeId),
              pe.push(Se.sourceSessionId));
          }
          (V((Se) => {
            const Pe = new Set(Se.map((he) => he.id)),
              me = ce.filter((he) => !Pe.has(he.id)),
              Ce = [...Se, ...me];
            return (vs(Ce), Ce);
          }),
            k((Se) => ({ ...Se, ...fe })));
          const ge = `context-${G}`;
          b((Se) => {
            const Pe = Se[ge] || [],
              me = [...new Set([...Pe, ...pe])],
              Ce = { ...Se, [ge]: me };
            return (vl(Ce), Ce);
          });
        }
      })();
    }, [o, V]));
  const q = Il((F) => F.lastEdgeCreated),
    B = Il((F) => F.clearEdgeEvents);
  E.useEffect(() => {
    if (!q) return;
    const { edgeId: F, sourceSessionId: Q, targetClaudeSessionId: re } = q,
      G = `reactflow__edge-session-${Q}-context-${re}`;
    (V((ce) => {
      if (ce.some((ge) => ge.id === G)) return ce;
      const fe = { id: G, source: `session-${Q}`, target: `context-${re}` },
        pe = [...ce, fe];
      return (vs(pe), pe);
    }),
      k((ce) => ({ ...ce, [G]: F })));
    const se = `context-${re}`;
    (b((ce) => {
      const fe = ce[se] || [];
      if (fe.includes(Q)) return ce;
      const pe = [...fe, Q],
        ge = { ...ce, [se]: pe };
      return (vl(ge), ge);
    }),
      z((ce) =>
        ce.map((fe) => {
          if (fe.id === se) {
            const pe =
              typeof fe.data.connectedCount == "number"
                ? fe.data.connectedCount
                : 0;
            return { ...fe, data: { ...fe.data, connectedCount: pe + 1 } };
          }
          return fe;
        })
      ),
      B(),
      console.log(`[NodeEditor] Edge created via WebSocket: ${Q} -> ${re}`));
  }, [q, V, z, B]);
  const K = Il((F) => F.lastEdgeDeleted),
    [A, $] = E.useState(!1);
  E.useEffect(() => {
    if (!K) return;
    const { edgeId: F, remainingContext: Q } = K;
    (Q &&
      ($(!0),
      console.log(
        `[NodeEditor] Edge deleted via WebSocket: ${F}. Context pending for /clear.`
      )),
      B());
  }, [K, B]);
  const U = E.useCallback(
      async (F) => {
        if (
          !(!F.source || !F.target) &&
          F.source.startsWith("session-") &&
          F.target.startsWith("context-")
        ) {
          const Q = F.source.replace("session-", ""),
            re = F.target.replace("context-", ""),
            G = F.target,
            se = C[G] || [];
          if (se.includes(Q)) return;
          const ce = await PN(Q, re);
          V((ge) => {
            var Pe;
            const Se = P0(F, ge);
            if ((vs(Se), ce)) {
              const me =
                (Pe = Se.find(
                  (Ce) => Ce.source === F.source && Ce.target === F.target
                )) == null
                  ? void 0
                  : Pe.id;
              me && k((Ce) => ({ ...Ce, [me]: ce.edgeId }));
            }
            return Se;
          });
          const fe = [...se, Q],
            pe = { ...C, [G]: fe };
          (b(pe),
            vl(pe),
            z((ge) =>
              ge.map((Se) =>
                Se.id === G
                  ? { ...Se, data: { ...Se.data, connectedCount: fe.length } }
                  : Se
              )
            ),
            l == null || l(Q),
            fe.length >= 2 && m && m(G, fe));
        }
      },
      [C, V, z, l, m]
    ),
    P = E.useCallback(
      (F) => {
        const Q = H.find((se) => se.id === F);
        if (!Q) return;
        const re = Q.source.replace("session-", ""),
          G = e.find((se) => se.sessionId === re);
        c == null ||
          c({ type: "edge", id: F, name: (G == null ? void 0 : G.name) || re });
      },
      [H, e, c]
    ),
    M = E.useCallback(
      (F, Q) => {
        P(Q.id);
      },
      [P]
    ),
    ne = E.useCallback(
      async (F) => {
        const Q = {};
        for (const G of F)
          if (
            G.source.startsWith("session-") &&
            G.target.startsWith("context-")
          ) {
            const se = G.source.replace("session-", ""),
              ce = G.target;
            (Q[ce] || (Q[ce] = []), Q[ce].push(se));
          }
        for (const G of F) {
          const se = I[G.id];
          se &&
            (await RN(se),
            k((ce) => {
              const fe = { ...ce };
              return (delete fe[G.id], fe);
            }));
        }
        const re = { ...C };
        for (const [G, se] of Object.entries(Q)) {
          const ce = re[G] || [];
          ((re[G] = ce.filter((fe) => !se.includes(fe))),
            re[G].length === 0 && delete re[G]);
        }
        (b(re),
          vl(re),
          V((G) => (vs(G), G)),
          z((G) =>
            G.map((se) => {
              var ce;
              if (se.id.startsWith("context-") && Q[se.id]) {
                const fe = ((ce = re[se.id]) == null ? void 0 : ce.length) || 0;
                return { ...se, data: { ...se.data, connectedCount: fe } };
              }
              return se;
            })
          ));
      },
      [C, z, V, I]
    ),
    oe = E.useCallback(
      (F, Q) => {
        const re = D.map((se) =>
            se.id === Q.id ? { ...se, position: Q.position } : se
          ),
          G = jg(Q, re);
        if (G.x !== Q.position.x || G.y !== Q.position.y)
          z((se) => {
            const ce = se.map((pe) =>
                pe.id === Q.id ? { ...pe, position: G } : pe
              ),
              fe = {};
            return (
              ce.forEach((pe) => {
                fe[pe.id] = pe.position;
              }),
              ao(fe),
              ce
            );
          });
        else {
          const se = {};
          (re.forEach((ce) => {
            se[ce.id] = ce.position;
          }),
            ao(se));
        }
      },
      [D, z]
    );
  return (
    E.useEffect(() => {
      if (d) {
        if (d.type === "edge") {
          const F = H.find((Q) => Q.id === d.id);
          F && (ne([F]), V((Q) => Q.filter((re) => re.id !== d.id)));
        } else if (d.type === "node" && !d.id.startsWith("context-")) {
          const F = H.filter((re) => re.source === d.id || re.target === d.id);
          (F.length > 0 &&
            (ne(F),
            V((re) =>
              re.filter((G) => G.source !== d.id && G.target !== d.id)
            )),
            z((re) => re.filter((G) => G.id !== d.id)));
          const Q = dm();
          (delete Q[d.id], ao(Q));
        }
        p == null || p();
      }
    }, [d, H, ne, V, z, p]),
    h.jsxs("div", {
      className: `w-full h-full bg-[var(--bg-base)] relative ${i === "dark" ? "react-flow-theme-dark" : ""}`,
      children: [
        h.jsxs(Uk, {
          nodes: D,
          edges: H,
          onNodesChange: Y,
          onEdgesChange: te,
          onConnect: U,
          onEdgesDelete: ne,
          onEdgeClick: M,
          onNodeDragStop: oe,
          nodeTypes: ON,
          fitView: !0,
          proOptions: { hideAttribution: !0 },
          className: "bg-[var(--bg-base)]",
          children: [
            h.jsx(oN, {
              className:
                "bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg",
            }),
            h.jsx(yN, {
              className:
                "bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg",
              nodeColor: "#d97757",
              maskColor: "rgba(15, 15, 14, 0.8)",
            }),
          ],
        }),
        A &&
          h.jsx("div", {
            className:
              "absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50",
            children: h.jsxs("div", {
              className:
                "bg-yellow-500/90 text-black px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md",
              children: [
                h.jsx("span", { className: "text-xl", children: "⚠️" }),
                h.jsxs("div", {
                  className: "flex-1",
                  children: [
                    h.jsx("div", {
                      className: "font-semibold",
                      children: "コンテキストが変更されました",
                    }),
                    h.jsxs("div", {
                      className: "text-sm opacity-80",
                      children: [
                        "Claude Code で",
                        " ",
                        h.jsx("code", {
                          className: "bg-black/20 px-1 rounded",
                          children: "/clear",
                        }),
                        " ",
                        "を実行してください。残りのセッションは自動的に復元されます。",
                      ],
                    }),
                  ],
                }),
                h.jsx("button", {
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
  var $, U, P;
  const { projects: r, fetchProjects: o } = Yc(),
    {
      skills: i,
      hooks: l,
      mcpServers: u,
      rules: c,
      loading: d,
      fetchSystemContext: p,
    } = HN(),
    [m, v] = E.useState("skills"),
    [g, x] = E.useState(null),
    [S, w] = E.useState(null),
    [j, C] = E.useState(new Set()),
    [b, I] = E.useState(""),
    [k, _] = E.useState(!1),
    [D, z] = E.useState(!1),
    [R, H] = E.useState(!1),
    [V, ie] = E.useState(null);
  (E.useEffect(() => {
    o();
  }, [o]),
    E.useEffect(() => {
      const M = r.find((ne) => ne.projectId === g);
      p(M == null ? void 0 : M.path);
    }, [g, r, p]),
    E.useMemo(() => {
      var M;
      if (g)
        return (M = r.find((ne) => ne.projectId === g)) == null
          ? void 0
          : M.path;
    }, [g, r]));
  const X = E.useMemo(() => {
      var M;
      if (S)
        return (M = r.find((ne) => ne.projectId === S)) == null
          ? void 0
          : M.path;
    }, [S, r]),
    Y = E.useMemo(() => {
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
    te = E.useMemo(() => {
      if (!b) return Y;
      const M = b.toLowerCase();
      return Y.filter((ne) => {
        const oe = "name" in ne ? ne.name : "event" in ne ? ne.event : "",
          F = "description" in ne ? ne.description : "";
        return (
          oe.toLowerCase().includes(M) ||
          (F == null ? void 0 : F.toLowerCase().includes(M))
        );
      });
    }, [Y, b]),
    L = E.useCallback(
      (M) =>
        "name" in M && "path" in M
          ? `${M.source}:${M.name}`
          : "event" in M
            ? `${M.source}:${M.event}:${M.command}`
            : `${M.source}:${JSON.stringify(M)}`,
      []
    ),
    q = E.useCallback(
      (M) => ("name" in M ? M.name : "event" in M ? M.event : "Unknown"),
      []
    ),
    B = E.useCallback(
      (M) => {
        const ne = L(M);
        C((oe) => {
          const F = new Set(oe);
          return (F.has(ne) ? F.delete(ne) : F.add(ne), F);
        });
      },
      [L]
    ),
    K = E.useCallback(() => {
      j.size === te.length ? C(new Set()) : C(new Set(te.map(L)));
    }, [te, j.size, L]),
    A = E.useCallback(async () => {
      if (!(!X || j.size === 0)) {
        (H(!0), ie(null));
        try {
          const M = te
              .filter((F) => j.has(L(F)))
              .filter((F) => "path" in F)
              .map((F) => ({ type: m, sourcePath: F.path, name: q(F) })),
            ne = await fetch("/api/system-context/copy", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items: M, targetProjectPath: X }),
            });
          if (!ne.ok) {
            const F = await ne.json();
            throw new Error(F.error || "コピーに失敗しました");
          }
          const oe = await ne.json();
          (ie({ success: !0, message: `${oe.copied}件をコピーしました` }),
            C(new Set()));
        } catch (M) {
          ie({
            success: !1,
            message: M instanceof Error ? M.message : "コピーに失敗しました",
          });
        } finally {
          H(!1);
        }
      }
    }, [X, j, te, m, L, q]);
  return (
    E.useEffect(() => {
      C(new Set());
    }, [m]),
    h.jsxs("div", {
      className: "h-full flex flex-col bg-[var(--bg-base)]",
      children: [
        h.jsxs("div", {
          className:
            "flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]",
          children: [
            ["skills", "hooks", "mcp", "rules"].map((M) => {
              const ne = VN[M],
                oe =
                  M === "skills"
                    ? i.length
                    : M === "hooks"
                      ? l.length
                      : M === "mcp"
                        ? u.length
                        : c.length;
              return h.jsxs(
                "button",
                {
                  onClick: () => v(M),
                  className: `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${m === M ? `${WN[M]} text-white` : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"}`,
                  children: [
                    h.jsx(ne, { className: "w-4 h-4" }),
                    h.jsx("span", { className: "capitalize", children: M }),
                    h.jsx("span", {
                      className: `px-1.5 py-0.5 rounded text-xs ${m === M ? "bg-white/20" : "bg-[var(--bg-elevated)]"}`,
                      children: oe,
                    }),
                  ],
                },
                M
              );
            }),
            h.jsx("div", { className: "flex-1" }),
            e &&
              h.jsx("button", {
                onClick: () => e(m, Array.from(j)),
                disabled: j.size === 0,
                className:
                  "px-3 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-400)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                children: "最適化",
              }),
          ],
        }),
        h.jsxs("div", {
          className: "flex-1 flex overflow-hidden",
          children: [
            h.jsxs("div", {
              className:
                "w-1/2 flex flex-col border-r border-[var(--border-subtle)]",
              children: [
                h.jsxs("div", {
                  className:
                    "p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]",
                  children: [
                    h.jsxs("div", {
                      className: "relative",
                      children: [
                        h.jsxs("button", {
                          onClick: () => _(!k),
                          className:
                            "w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors",
                          children: [
                            h.jsxs("div", {
                              className: "flex items-center gap-2",
                              children: [
                                h.jsx(kl, {
                                  className: "w-4 h-4 text-[var(--text-muted)]",
                                }),
                                h.jsx("span", {
                                  className:
                                    "text-sm text-[var(--text-primary)]",
                                  children: g
                                    ? ($ = r.find((M) => M.projectId === g)) ==
                                      null
                                      ? void 0
                                      : $.name
                                    : "グローバル設定",
                                }),
                              ],
                            }),
                            h.jsx(wc, {
                              className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${k ? "rotate-180" : ""}`,
                            }),
                          ],
                        }),
                        k &&
                          h.jsxs("div", {
                            className:
                              "absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto",
                            children: [
                              h.jsx("button", {
                                onClick: () => {
                                  (x(null), _(!1));
                                },
                                className: `w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${g ? "text-[var(--text-primary)]" : "text-[var(--color-primary-400)] bg-[var(--bg-surface)]"}`,
                                children: "グローバル設定",
                              }),
                              r.map((M) =>
                                h.jsx(
                                  "button",
                                  {
                                    onClick: () => {
                                      (x(M.projectId), _(!1));
                                    },
                                    className: `w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${g === M.projectId ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]" : "text-[var(--text-primary)]"}`,
                                    children: M.name,
                                  },
                                  M.projectId
                                )
                              ),
                            ],
                          }),
                      ],
                    }),
                    h.jsxs("div", {
                      className: "mt-2 relative",
                      children: [
                        h.jsx(qv, {
                          className:
                            "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]",
                        }),
                        h.jsx("input", {
                          type: "text",
                          value: b,
                          onChange: (M) => I(M.target.value),
                          placeholder: "検索...",
                          className:
                            "w-full pl-9 pr-3 py-2 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]",
                        }),
                      ],
                    }),
                  ],
                }),
                h.jsx("div", {
                  className: "flex-1 overflow-y-auto p-2",
                  children: d
                    ? h.jsx("div", {
                        className: "space-y-2 p-2",
                        children: [1, 2, 3].map((M) =>
                          h.jsx(
                            "div",
                            {
                              className:
                                "h-16 bg-[var(--bg-elevated)] rounded-lg animate-pulse",
                            },
                            M
                          )
                        ),
                      })
                    : te.length === 0
                      ? h.jsx("div", {
                          className: "p-4 text-center text-[var(--text-muted)]",
                          children: b
                            ? "検索結果がありません"
                            : "アイテムがありません",
                        })
                      : h.jsx("div", {
                          className: "space-y-1",
                          children: te.map((M) => {
                            const ne = L(M),
                              oe = j.has(ne),
                              F = q(M),
                              Q = M.source,
                              re = "description" in M ? M.description : void 0;
                            return h.jsxs(
                              "div",
                              {
                                onClick: () => B(M),
                                className: `p-3 rounded-lg cursor-pointer transition-colors ${oe ? "bg-[var(--color-primary-500)]/20 border border-[var(--color-primary-500)]" : "bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] border border-transparent"}`,
                                children: [
                                  h.jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      h.jsx("div", {
                                        className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${oe ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]" : "border-[var(--border-default)]"}`,
                                        children:
                                          oe &&
                                          h.jsx(_s, {
                                            className: "w-3 h-3 text-white",
                                          }),
                                      }),
                                      h.jsx("span", {
                                        className:
                                          "flex-1 text-sm font-medium text-[var(--text-primary)] truncate",
                                        children: F,
                                      }),
                                      h.jsx("span", {
                                        className: `px-1.5 py-0.5 rounded text-xs ${BN[Q]}`,
                                        children: Q[0].toUpperCase(),
                                      }),
                                    ],
                                  }),
                                  re &&
                                    h.jsx("div", {
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
                h.jsxs("div", {
                  className:
                    "p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-2",
                  children: [
                    h.jsx("button", {
                      onClick: K,
                      className:
                        "px-3 py-1.5 rounded text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors",
                      children: j.size === te.length ? "全解除" : "全選択",
                    }),
                    h.jsxs("span", {
                      className: "text-sm text-[var(--text-muted)]",
                      children: [j.size, "件選択中"],
                    }),
                  ],
                }),
              ],
            }),
            h.jsxs("div", {
              className: "w-1/2 flex flex-col",
              children: [
                h.jsx("div", {
                  className:
                    "p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]",
                  children: h.jsxs("div", {
                    className: "relative",
                    children: [
                      h.jsxs("button", {
                        onClick: () => z(!D),
                        className:
                          "w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-elevated)] rounded-lg hover:brightness-110 transition-colors",
                        children: [
                          h.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              h.jsx(kl, {
                                className: "w-4 h-4 text-[var(--text-muted)]",
                              }),
                              h.jsx("span", {
                                className: "text-sm text-[var(--text-primary)]",
                                children: S
                                  ? (U = r.find((M) => M.projectId === S)) ==
                                    null
                                    ? void 0
                                    : U.name
                                  : "コピー先を選択...",
                              }),
                            ],
                          }),
                          h.jsx(wc, {
                            className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${D ? "rotate-180" : ""}`,
                          }),
                        ],
                      }),
                      D &&
                        h.jsx("div", {
                          className:
                            "absolute top-full left-0 right-0 mt-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto",
                          children: r
                            .filter((M) => M.projectId !== g)
                            .map((M) =>
                              h.jsxs(
                                "button",
                                {
                                  onClick: () => {
                                    (w(M.projectId), z(!1));
                                  },
                                  className: `w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-surface)] ${S === M.projectId ? "text-[var(--color-primary-400)] bg-[var(--bg-surface)]" : "text-[var(--text-primary)]"}`,
                                  children: [
                                    h.jsx("div", { children: M.name }),
                                    h.jsx("div", {
                                      className:
                                        "text-xs text-[var(--text-muted)] truncate",
                                      children: M.path,
                                    }),
                                  ],
                                },
                                M.projectId
                              )
                            ),
                        }),
                    ],
                  }),
                }),
                h.jsx("div", {
                  className:
                    "flex-1 flex flex-col items-center justify-center p-8 text-center",
                  children: S
                    ? j.size === 0
                      ? h.jsxs("div", {
                          className: "text-[var(--text-muted)]",
                          children: [
                            h.jsx(_s, {
                              className: "w-16 h-16 mx-auto mb-4 opacity-30",
                            }),
                            h.jsx("p", {
                              children:
                                "左のリストからコピーするアイテムを選択してください",
                            }),
                          ],
                        })
                      : h.jsxs("div", {
                          className: "w-full max-w-sm",
                          children: [
                            h.jsxs("div", {
                              className:
                                "text-lg font-medium text-[var(--text-primary)] mb-4",
                              children: [
                                j.size,
                                "件を",
                                h.jsx("br", {}),
                                h.jsx("span", {
                                  className: "text-[var(--color-primary-400)]",
                                  children:
                                    (P = r.find((M) => M.projectId === S)) ==
                                    null
                                      ? void 0
                                      : P.name,
                                }),
                                h.jsx("br", {}),
                                "にコピー",
                              ],
                            }),
                            h.jsx("button", {
                              onClick: A,
                              disabled: R,
                              className:
                                "w-full px-6 py-3 rounded-lg text-sm font-medium bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-400)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                              children: R ? "コピー中..." : "コピーを実行",
                            }),
                            V &&
                              h.jsx("div", {
                                className: `mt-4 p-3 rounded-lg text-sm ${V.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`,
                                children: V.message,
                              }),
                          ],
                        })
                    : h.jsxs("div", {
                        className: "text-[var(--text-muted)]",
                        children: [
                          h.jsx(kl, {
                            className: "w-16 h-16 mx-auto mb-4 opacity-30",
                          }),
                          h.jsx("p", {
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
  const [u, c] = E.useState(!1),
    [d, p] = E.useState(!1),
    [m, v] = E.useState(null),
    [g, x] = E.useState(new Set()),
    [S, w] = E.useState(null),
    [j, C] = E.useState(new Set()),
    b = E.useCallback(async () => {
      var R;
      (c(!0), w(null));
      try {
        const H = await fetch(`/api/sessions/${o}/analyze`, { method: "POST" });
        if (!H.ok) {
          const ie = await H.json();
          throw new Error(
            ((R = ie.error) == null ? void 0 : R.message) ||
              "分析に失敗しました"
          );
        }
        const V = await H.json();
        v(V);
      } catch (H) {
        w(H instanceof Error ? H.message : "分析に失敗しました");
      } finally {
        c(!1);
      }
    }, [o]);
  (E.useEffect(() => {
    e && !m && !u && b();
  }, [e, m, u, b]),
    E.useEffect(() => {
      e || (v(null), x(new Set()), w(null), C(new Set()));
    }, [e]));
  const I = E.useCallback((R) => {
      x((H) => {
        const V = new Set(H);
        return (V.has(R) ? V.delete(R) : V.add(R), V);
      });
    }, []),
    k = E.useCallback((R) => {
      C((H) => {
        const V = new Set(H);
        return (V.has(R) ? V.delete(R) : V.add(R), V);
      });
    }, []),
    _ = E.useCallback(
      () =>
        m
          ? m.groups
              .filter((R) => g.has(R.category))
              .flatMap((R) => R.observationIds)
          : [],
      [m, g]
    ),
    D = E.useCallback(
      () =>
        m
          ? m.groups
              .filter((R) => g.has(R.category))
              .reduce((R, H) => R + H.estimatedTokens, 0)
          : 0,
      [m, g]
    ),
    z = E.useCallback(async () => {
      var ie, X;
      const R = _();
      if (R.length === 0) return;
      const H =
          m == null
            ? void 0
            : m.groups
                .filter((Y) => g.has(Y.category))
                .map((Y) => Y.description)
                .join(", "),
        V =
          window.prompt(
            `Export: ${R.length} observations

新しいセッション名を入力してください:`,
            `Export: ${H}`
          ) || `Export from ${i}`;
      if (V) {
        (p(!0), w(null));
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
              ((ie = L.error) == null ? void 0 : ie.message) ||
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
          w(Y instanceof Error ? Y.message : "Export に失敗しました");
        } finally {
          p(!1);
        }
      }
    }, [_, m, g, o, i, l, r]);
  return e
    ? h.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          h.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: r,
          }),
          h.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[600px] max-h-[80vh] flex flex-col border border-[var(--border-default)]",
            children: [
              h.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  h.jsxs("div", {
                    children: [
                      h.jsx("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: "Smart Export",
                      }),
                      h.jsx("p", {
                        className: "text-sm text-[var(--text-muted)] mt-1",
                        children: i,
                      }),
                    ],
                  }),
                  h.jsx("button", {
                    onClick: r,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                    children: h.jsx("svg", {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: h.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12",
                      }),
                    }),
                  }),
                ],
              }),
              h.jsxs("div", {
                className: "flex-1 overflow-y-auto px-6 py-4",
                children: [
                  u &&
                    h.jsxs("div", {
                      className:
                        "flex flex-col items-center justify-center py-12",
                      children: [
                        h.jsx("div", {
                          className:
                            "w-8 h-8 border-2 border-[var(--color-primary-500)] border-t-transparent rounded-full animate-spin",
                        }),
                        h.jsx("p", {
                          className: "mt-4 text-[var(--text-muted)]",
                          children: "AI で分析中...",
                        }),
                      ],
                    }),
                  S &&
                    h.jsxs("div", {
                      className:
                        "bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4",
                      children: [
                        h.jsx("p", { className: "text-red-400", children: S }),
                        h.jsx("button", {
                          onClick: b,
                          className:
                            "mt-2 text-sm text-red-400 hover:text-red-300 underline",
                          children: "再試行",
                        }),
                      ],
                    }),
                  m &&
                    !u &&
                    h.jsxs(h.Fragment, {
                      children: [
                        h.jsxs("div", {
                          className: "flex gap-4 mb-6 text-sm",
                          children: [
                            h.jsxs("div", {
                              className:
                                "bg-[var(--bg-elevated)] px-3 py-2 rounded-lg",
                              children: [
                                h.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "総数: ",
                                }),
                                h.jsxs("span", {
                                  className:
                                    "text-[var(--text-primary)] font-medium",
                                  children: [m.totalObservations, " obs"],
                                }),
                              ],
                            }),
                            h.jsxs("div", {
                              className:
                                "bg-[var(--bg-elevated)] px-3 py-2 rounded-lg",
                              children: [
                                h.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "トークン: ",
                                }),
                                h.jsx("span", {
                                  className:
                                    "text-[var(--text-primary)] font-medium",
                                  children: gc(m.totalEstimatedTokens),
                                }),
                              ],
                            }),
                            h.jsxs("div", {
                              className:
                                "bg-[var(--bg-elevated)] px-3 py-2 rounded-lg",
                              children: [
                                h.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "分析時間: ",
                                }),
                                h.jsxs("span", {
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
                        h.jsx("div", {
                          className: "space-y-3",
                          children: m.groups.map((R) =>
                            h.jsxs(
                              "div",
                              {
                                className: `border rounded-lg overflow-hidden transition-colors ${g.has(R.category) ? "border-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10" : "border-[var(--border-default)] bg-[var(--bg-elevated)]"}`,
                                children: [
                                  h.jsxs("div", {
                                    className:
                                      "flex items-center gap-3 p-4 cursor-pointer",
                                    onClick: () => I(R.category),
                                    children: [
                                      h.jsx("div", {
                                        className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${g.has(R.category) ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]" : "border-[var(--border-default)]"}`,
                                        children:
                                          g.has(R.category) &&
                                          h.jsx("svg", {
                                            className: "w-3 h-3 text-white",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: h.jsx("path", {
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              strokeWidth: 3,
                                              d: "M5 13l4 4L19 7",
                                            }),
                                          }),
                                      }),
                                      h.jsx("span", {
                                        className: "text-xl",
                                        children: YN(R.category),
                                      }),
                                      h.jsxs("div", {
                                        className: "flex-1",
                                        children: [
                                          h.jsxs("div", {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              h.jsx("span", {
                                                className:
                                                  "font-medium text-[var(--text-primary)]",
                                                children: R.categoryLabel,
                                              }),
                                              h.jsxs("span", {
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
                                          h.jsx("p", {
                                            className:
                                              "text-sm text-[var(--text-muted)] mt-0.5",
                                            children: R.description,
                                          }),
                                        ],
                                      }),
                                      h.jsxs("div", {
                                        className:
                                          "text-sm text-[var(--text-muted)]",
                                        children: [
                                          gc(R.estimatedTokens),
                                          " tokens",
                                        ],
                                      }),
                                      h.jsx("button", {
                                        onClick: (H) => {
                                          (H.stopPropagation(), k(R.category));
                                        },
                                        className:
                                          "p-1 hover:bg-[var(--bg-surface)] rounded transition-colors",
                                        children: h.jsx("svg", {
                                          className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${j.has(R.category) ? "rotate-180" : ""}`,
                                          fill: "none",
                                          stroke: "currentColor",
                                          viewBox: "0 0 24 24",
                                          children: h.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 9l-7 7-7-7",
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                  j.has(R.category) &&
                                    h.jsx("div", {
                                      className: "px-4 pb-4 pt-0",
                                      children: h.jsx("div", {
                                        className:
                                          "bg-[var(--bg-base)] rounded-lg p-3 text-xs font-mono text-[var(--text-muted)] max-h-32 overflow-y-auto",
                                        children: R.observationIds.map((H, V) =>
                                          h.jsxs(
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
              h.jsxs("div", {
                className:
                  "px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  h.jsx("div", {
                    className: "text-sm text-[var(--text-muted)]",
                    children:
                      g.size > 0 &&
                      h.jsxs(h.Fragment, {
                        children: [
                          "選択中: ",
                          _().length,
                          " obs (",
                          gc(D()),
                          " tokens)",
                        ],
                      }),
                  }),
                  h.jsxs("div", {
                    className: "flex gap-3",
                    children: [
                      h.jsx("button", {
                        onClick: r,
                        className:
                          "px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                        children: "キャンセル",
                      }),
                      h.jsx("button", {
                        onClick: z,
                        disabled: g.size === 0 || d || u,
                        className: `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${g.size === 0 || d || u ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed" : "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]"}`,
                        children: d ? "Exporting..." : "Export & 削除",
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
  const [c, d] = E.useState(!1),
    [p, m] = E.useState(null),
    v = E.useCallback(async () => {
      (d(!0), m(null));
      try {
        (await o(), r());
      } catch (x) {
        m(x instanceof Error ? x.message : "削除に失敗しました");
      } finally {
        d(!1);
      }
    }, [o, r]),
    g = E.useCallback(() => {
      c || (m(null), r());
    }, [c, r]);
  return e
    ? h.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          h.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: g,
          }),
          h.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[400px] border border-[var(--border-default)]",
            children: [
              h.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  h.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      h.jsx("div", {
                        className: "p-2 bg-red-500/10 rounded-lg",
                        children: h.jsx(bs, {
                          className: "w-5 h-5 text-red-500",
                        }),
                      }),
                      h.jsxs("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: [fm[i], "を削除"],
                      }),
                    ],
                  }),
                  h.jsx("button", {
                    onClick: g,
                    disabled: c,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                    children: h.jsx(js, {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                    }),
                  }),
                ],
              }),
              h.jsxs("div", {
                className: "px-6 py-6",
                children: [
                  h.jsxs("p", {
                    className: "text-[var(--text-secondary)]",
                    children: ["以下の", fm[i], "を削除しますか？"],
                  }),
                  h.jsxs("div", {
                    className: "mt-4 p-4 bg-[var(--bg-elevated)] rounded-lg",
                    children: [
                      h.jsx("p", {
                        className:
                          "font-medium text-[var(--text-primary)] truncate",
                        children: l,
                      }),
                      u &&
                        h.jsx("p", {
                          className:
                            "text-xs text-[var(--text-muted)] font-mono mt-1 truncate",
                          children: u,
                        }),
                    ],
                  }),
                  h.jsx("p", {
                    className: "mt-4 text-sm text-[var(--text-muted)]",
                    children: "この操作は取り消せません。",
                  }),
                  p &&
                    h.jsx("div", {
                      className:
                        "mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3",
                      children: h.jsx("p", {
                        className: "text-sm text-red-400",
                        children: p,
                      }),
                    }),
                ],
              }),
              h.jsxs("div", {
                className:
                  "px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-3",
                children: [
                  h.jsx("button", {
                    onClick: g,
                    disabled: c,
                    className:
                      "px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                    children: "キャンセル",
                  }),
                  h.jsx("button", {
                    onClick: v,
                    disabled: c,
                    className:
                      "px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2",
                    children: c
                      ? h.jsxs(h.Fragment, {
                          children: [
                            h.jsx("div", {
                              className:
                                "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin",
                            }),
                            "削除中...",
                          ],
                        })
                      : h.jsxs(h.Fragment, {
                          children: [
                            h.jsx(bs, { className: "w-4 h-4" }),
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
  const [u, c] = E.useState(null),
    [d, p] = E.useState(!1),
    [m, v] = E.useState(null),
    [g, x] = E.useState(!1),
    [S, w] = E.useState(""),
    [j, C] = E.useState(!1);
  E.useEffect(() => {
    if (!e || !o) return;
    (async () => {
      var H;
      (p(!0), v(null));
      try {
        const [V, ie, X] = await Promise.all([
          fetch(`/api/sessions/${o}`),
          fetch(`/api/sessions/${o}/summary`),
          fetch(`/api/sessions/${o}/observations?limit=1`),
        ]);
        if (!V.ok) throw new Error("セッション情報の取得に失敗しました");
        const Y = await V.json(),
          te = ie.ok ? await ie.json() : null,
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
        v(
          V instanceof Error ? V.message : "セッション情報の取得に失敗しました"
        );
      } finally {
        p(!1);
      }
    })();
  }, [e, o]);
  const b = E.useCallback(() => {
      (c(null), v(null), x(!1), w(""), r());
    }, [r]),
    I = E.useCallback(() => {
      u && (w(u.name), x(!0));
    }, [u]),
    k = E.useCallback(() => {
      (x(!1), w(""));
    }, []),
    _ = E.useCallback(async () => {
      if (!(!u || !S.trim())) {
        C(!0);
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
          (c({ ...u, name: H }), x(!1), w(""), l == null || l(u.sessionId, H));
        } catch (R) {
          alert(R instanceof Error ? R.message : "名前の更新に失敗しました");
        } finally {
          C(!1);
        }
      }
    }, [u, S, l]);
  if (
    (E.useEffect(() => {
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
    z = {
      idle: "bg-gray-500",
      active: "bg-blue-500",
      completed: "bg-green-500",
      error: "bg-red-500",
      processing: "bg-yellow-500",
      merged: "bg-purple-500",
    };
  return h.jsxs("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center",
    children: [
      h.jsx("div", {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: b,
      }),
      h.jsxs("div", {
        className:
          "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[500px] max-h-[80vh] border border-[var(--border-default)] flex flex-col",
        children: [
          h.jsxs("div", {
            className:
              "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between flex-shrink-0",
            children: [
              h.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  h.jsx("div", {
                    className:
                      "p-2 bg-[var(--color-primary-500)]/10 rounded-lg",
                    children: h.jsx(ep, {
                      className: "w-5 h-5 text-[var(--color-primary-500)]",
                    }),
                  }),
                  h.jsx("h2", {
                    className:
                      "text-lg font-semibold text-[var(--text-primary)]",
                    children: "セッション詳細",
                  }),
                ],
              }),
              h.jsx("button", {
                onClick: b,
                className:
                  "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                children: h.jsx(js, {
                  className: "w-5 h-5 text-[var(--text-muted)]",
                }),
              }),
            ],
          }),
          h.jsx("div", {
            className: "flex-1 overflow-y-auto px-6 py-4",
            children: d
              ? h.jsxs("div", {
                  className: "space-y-4",
                  children: [
                    h.jsx("div", {
                      className:
                        "h-6 bg-[var(--bg-elevated)] rounded animate-pulse",
                    }),
                    h.jsx("div", {
                      className:
                        "h-4 bg-[var(--bg-elevated)] rounded animate-pulse w-3/4",
                    }),
                    h.jsx("div", {
                      className:
                        "h-20 bg-[var(--bg-elevated)] rounded animate-pulse",
                    }),
                  ],
                })
              : m
                ? h.jsx("div", {
                    className:
                      "bg-red-500/10 border border-red-500/30 rounded-lg p-4",
                    children: h.jsx("p", {
                      className: "text-sm text-red-400",
                      children: m,
                    }),
                  })
                : u
                  ? h.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        h.jsxs("div", {
                          children: [
                            g
                              ? h.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    h.jsx("input", {
                                      type: "text",
                                      value: S,
                                      onChange: (R) => w(R.target.value),
                                      className:
                                        "flex-1 px-3 py-2 text-lg font-medium bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary-400)]",
                                      autoFocus: !0,
                                      onKeyDown: (R) => {
                                        (R.key === "Enter" && _(),
                                          R.key === "Escape" && k());
                                      },
                                    }),
                                    h.jsx("button", {
                                      onClick: _,
                                      disabled: j || !S.trim(),
                                      className:
                                        "p-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] disabled:opacity-50 transition-colors",
                                      title: "保存",
                                      children: h.jsx(_s, {
                                        className: "w-5 h-5",
                                      }),
                                    }),
                                    h.jsx("button", {
                                      onClick: k,
                                      className:
                                        "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                                      title: "キャンセル",
                                      children: h.jsx(js, {
                                        className:
                                          "w-5 h-5 text-[var(--text-muted)]",
                                      }),
                                    }),
                                  ],
                                })
                              : h.jsxs("div", {
                                  className: "flex items-center gap-2 group",
                                  children: [
                                    h.jsx("h3", {
                                      className:
                                        "text-xl font-medium text-[var(--text-primary)]",
                                      children: u.name,
                                    }),
                                    h.jsx("button", {
                                      onClick: I,
                                      className:
                                        "p-1.5 opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-elevated)] rounded-lg transition-all",
                                      title: "名前を編集",
                                      children: h.jsx(Am, {
                                        className:
                                          "w-4 h-4 text-[var(--text-muted)]",
                                      }),
                                    }),
                                  ],
                                }),
                            h.jsxs("div", {
                              className: "flex items-center gap-2 mt-2",
                              children: [
                                h.jsx("span", {
                                  className: `w-2 h-2 rounded-full ${z[u.status] || "bg-gray-500"}`,
                                }),
                                h.jsx("span", {
                                  className:
                                    "text-sm text-[var(--text-secondary)] capitalize",
                                  children: u.status,
                                }),
                              ],
                            }),
                          ],
                        }),
                        h.jsxs("div", {
                          className:
                            "bg-[var(--bg-elevated)] rounded-lg p-4 space-y-3",
                          children: [
                            h.jsxs("div", {
                              className: "flex items-center gap-2 text-sm",
                              children: [
                                h.jsx(Zh, {
                                  className: "w-4 h-4 text-[var(--text-muted)]",
                                }),
                                h.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "作成日時:",
                                }),
                                h.jsx("span", {
                                  className: "text-[var(--text-primary)]",
                                  children: D(u.createdAt),
                                }),
                              ],
                            }),
                            h.jsxs("div", {
                              className: "flex items-center gap-2 text-sm",
                              children: [
                                h.jsx(Zh, {
                                  className: "w-4 h-4 text-[var(--text-muted)]",
                                }),
                                h.jsx("span", {
                                  className: "text-[var(--text-muted)]",
                                  children: "更新日時:",
                                }),
                                h.jsx("span", {
                                  className: "text-[var(--text-primary)]",
                                  children: D(u.updatedAt),
                                }),
                              ],
                            }),
                            u.observationCount !== void 0 &&
                              h.jsxs("div", {
                                className: "flex items-center gap-2 text-sm",
                                children: [
                                  h.jsx(ep, {
                                    className:
                                      "w-4 h-4 text-[var(--text-muted)]",
                                  }),
                                  h.jsx("span", {
                                    className: "text-[var(--text-muted)]",
                                    children: "観測記録:",
                                  }),
                                  h.jsxs("span", {
                                    className: "text-[var(--text-primary)]",
                                    children: [u.observationCount, "件"],
                                  }),
                                ],
                              }),
                            u.tokenCount !== void 0 &&
                              u.tokenCount > 0 &&
                              h.jsxs("div", {
                                className: "flex items-center gap-2 text-sm",
                                children: [
                                  h.jsx("span", {
                                    className:
                                      "w-4 h-4 text-center text-[var(--text-muted)]",
                                    children: "#",
                                  }),
                                  h.jsx("span", {
                                    className: "text-[var(--text-muted)]",
                                    children: "トークン:",
                                  }),
                                  h.jsx("span", {
                                    className: "text-[var(--text-primary)]",
                                    children: u.tokenCount.toLocaleString(),
                                  }),
                                ],
                              }),
                          ],
                        }),
                        u.summary &&
                          h.jsxs("div", {
                            children: [
                              h.jsx("h4", {
                                className:
                                  "text-sm font-medium text-[var(--text-muted)] mb-2",
                                children: "要約",
                              }),
                              h.jsx("div", {
                                className:
                                  "bg-[var(--bg-elevated)] rounded-lg p-4",
                                children: h.jsx("p", {
                                  className:
                                    "text-sm text-[var(--text-secondary)] whitespace-pre-wrap",
                                  children: u.summary,
                                }),
                              }),
                            ],
                          }),
                        h.jsx("div", {
                          className:
                            "pt-2 border-t border-[var(--border-subtle)]",
                          children: h.jsxs("p", {
                            className:
                              "text-xs text-[var(--text-muted)] font-mono",
                            children: ["ID: ", u.sessionId],
                          }),
                        }),
                      ],
                    })
                  : null,
          }),
          h.jsxs("div", {
            className:
              "px-6 py-4 border-t border-[var(--border-subtle)] flex justify-between flex-shrink-0",
            children: [
              i && o
                ? h.jsx("button", {
                    onClick: () => {
                      (i(o), b());
                    },
                    className:
                      "px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors",
                    children: "削除",
                  })
                : h.jsx("div", {}),
              h.jsx("button", {
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
  const [e, r] = E.useState(() => {
    if (typeof window < "u") {
      const l = localStorage.getItem(pm);
      if (l === "light" || l === "dark") return l;
    }
    return "dark";
  });
  E.useEffect(() => {
    const l = document.documentElement;
    ((l.dataset.theme = e),
      e === "light"
        ? (l.classList.add("light"), l.classList.remove("dark"))
        : (l.classList.add("dark"), l.classList.remove("light")),
      localStorage.setItem(pm, e));
  }, [e]);
  const o = E.useCallback(() => {
      r((l) => (l === "dark" ? "light" : "dark"));
    }, []),
    i = E.useCallback((l) => {
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
    ? h.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          h.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: r,
          }),
          h.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[560px] max-h-[80vh] overflow-hidden border border-[var(--border-default)]",
            children: [
              h.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  h.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      h.jsx("div", {
                        className: "p-2 bg-orange-500/10 rounded-lg",
                        children: h.jsx($m, {
                          className: "w-5 h-5 text-orange-500",
                        }),
                      }),
                      h.jsx("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: "操作ガイド",
                      }),
                    ],
                  }),
                  h.jsx("button", {
                    onClick: r,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors",
                    children: h.jsx(js, {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                    }),
                  }),
                ],
              }),
              h.jsx("div", {
                className: "px-6 py-6 overflow-y-auto max-h-[calc(80vh-140px)]",
                children: h.jsx("div", {
                  className: "space-y-6",
                  children: GN.map((o) =>
                    h.jsxs(
                      "div",
                      {
                        children: [
                          h.jsx("h3", {
                            className:
                              "text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3",
                            children: o.title,
                          }),
                          h.jsx("div", {
                            className: "space-y-2",
                            children: o.items.map((i) =>
                              h.jsxs(
                                "div",
                                {
                                  className:
                                    "flex items-start gap-3 p-3 bg-[var(--bg-elevated)] rounded-lg",
                                  children: [
                                    h.jsx("span", {
                                      className:
                                        "text-sm font-medium text-[var(--text-primary)] min-w-[120px]",
                                      children: i.label,
                                    }),
                                    h.jsx("span", {
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
              h.jsx("div", {
                className:
                  "px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end",
                children: h.jsx("button", {
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
const JN = [
  {
    type: "bug",
    label: "バグ報告",
    icon: h.jsx(Xc, { className: "w-4 h-4" }),
    description: "問題や不具合を報告",
  },
  {
    type: "feature_request",
    label: "機能要望",
    icon: h.jsx(c1, { className: "w-4 h-4" }),
    description: "新機能のリクエスト",
  },
  {
    type: "improvement",
    label: "改善提案",
    icon: h.jsx(d1, { className: "w-4 h-4" }),
    description: "既存機能の改善",
  },
  {
    type: "other",
    label: "その他",
    icon: h.jsx(Zv, { className: "w-4 h-4" }),
    description: "その他のフィードバック",
  },
];
function ZN({ isOpen: e, onClose: r }) {
  const [o, i] = E.useState(null),
    [l, u] = E.useState(""),
    [c, d] = E.useState(!1),
    [p, m] = E.useState(!1),
    [v, g] = E.useState(null),
    x = l.length,
    S = 10,
    w = 1e3,
    j = x >= S && x <= w,
    C = E.useCallback(() => {
      c || (i(null), u(""), g(null), m(!1), r());
    }, [c, r]),
    b = E.useCallback(async () => {
      var I;
      if (!o) {
        g("カテゴリを選択してください");
        return;
      }
      if (!j) {
        g(`内容は${S}〜${w}文字で入力してください`);
        return;
      }
      (d(!0), g(null));
      try {
        const k = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: o, content: l.trim() }),
        });
        if (!k.ok) {
          const _ = await k.json();
          throw new Error(
            ((I = _.error) == null ? void 0 : I.message) || "送信に失敗しました"
          );
        }
        (m(!0),
          i(null),
          u(""),
          setTimeout(() => {
            (m(!1), r());
          }, 3e3));
      } catch (k) {
        g(k instanceof Error ? k.message : "エラーが発生しました");
      } finally {
        d(!1);
      }
    }, [o, l, j, r]);
  return e
    ? h.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          h.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: C,
          }),
          h.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[480px] max-h-[85vh] overflow-hidden border border-[var(--border-default)]",
            children: [
              h.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  h.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      h.jsx("div", {
                        className: "p-2 bg-orange-500/10 rounded-lg",
                        children: h.jsx(Xc, {
                          className: "w-5 h-5 text-orange-500",
                        }),
                      }),
                      h.jsx("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: "フィードバック",
                      }),
                    ],
                  }),
                  h.jsx("button", {
                    onClick: C,
                    disabled: c,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                    children: h.jsx(js, {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                    }),
                  }),
                ],
              }),
              h.jsx("div", {
                className: "px-6 py-6 overflow-y-auto max-h-[calc(85vh-140px)]",
                children: p
                  ? h.jsxs("div", {
                      className:
                        "flex flex-col items-center justify-center py-8",
                      children: [
                        h.jsx("div", {
                          className:
                            "w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4",
                          children: h.jsx(e1, {
                            className: "w-8 h-8 text-green-500",
                          }),
                        }),
                        h.jsx("h3", {
                          className:
                            "text-lg font-bold text-[var(--text-primary)] mb-2",
                          children: "送信完了!",
                        }),
                        h.jsxs("p", {
                          className:
                            "text-[var(--text-muted)] text-sm text-center",
                          children: [
                            "フィードバックをお送りいただきありがとうございます。",
                            h.jsx("br", {}),
                            "いただいたご意見は今後の改善に活かします。",
                          ],
                        }),
                      ],
                    })
                  : h.jsxs(h.Fragment, {
                      children: [
                        h.jsxs("div", {
                          className: "mb-5",
                          children: [
                            h.jsx("label", {
                              className:
                                "block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider",
                              children: "カテゴリを選択",
                            }),
                            h.jsx("div", {
                              className: "grid grid-cols-2 gap-2",
                              children: JN.map((I) =>
                                h.jsxs(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => i(I.type),
                                    className: `
                        flex flex-col items-start p-3 rounded-lg border transition-all duration-200
                        ${o === I.type ? "border-orange-500 bg-orange-500/10 text-orange-500" : "border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-subtle)] hover:bg-[var(--bg-surface)]"}
                      `,
                                    children: [
                                      h.jsxs("div", {
                                        className:
                                          "flex items-center gap-2 mb-1",
                                        children: [
                                          I.icon,
                                          h.jsx("span", {
                                            className: "text-xs font-medium",
                                            children: I.label,
                                          }),
                                        ],
                                      }),
                                      h.jsx("span", {
                                        className:
                                          "text-[10px] text-[var(--text-muted)]",
                                        children: I.description,
                                      }),
                                    ],
                                  },
                                  I.type
                                )
                              ),
                            }),
                          ],
                        }),
                        h.jsxs("div", {
                          className: "mb-4",
                          children: [
                            h.jsx("label", {
                              className:
                                "block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider",
                              children: "内容",
                            }),
                            h.jsx("textarea", {
                              value: l,
                              onChange: (I) => u(I.target.value),
                              placeholder: "詳しく教えてください...",
                              className: `
                    w-full h-32 p-3 rounded-lg border bg-[var(--bg-elevated)] text-[var(--text-primary)] placeholder-[var(--text-muted)]
                    text-sm resize-none focus:outline-none transition-colors
                    ${v && !j ? "border-red-500 focus:border-red-500" : "border-[var(--border-default)] focus:border-orange-500"}
                  `,
                            }),
                            h.jsxs("div", {
                              className:
                                "flex justify-between items-center mt-1",
                              children: [
                                h.jsx("span", {
                                  className: `text-xs ${x < S ? "text-[var(--text-muted)]" : x > w ? "text-red-500" : "text-[var(--text-muted)]"}`,
                                  children:
                                    x < S
                                      ? `あと${S - x}文字以上`
                                      : x > w
                                        ? `${x - w}文字超過`
                                        : "",
                                }),
                                h.jsxs("span", {
                                  className: `text-xs ${x > w ? "text-red-500" : "text-[var(--text-muted)]"}`,
                                  children: [x, "/", w],
                                }),
                              ],
                            }),
                          ],
                        }),
                        v &&
                          h.jsx("div", {
                            className:
                              "mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm",
                            children: v,
                          }),
                      ],
                    }),
              }),
              !p &&
                h.jsxs("div", {
                  className:
                    "px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-3",
                  children: [
                    h.jsx("button", {
                      onClick: C,
                      disabled: c,
                      className:
                        "px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                      children: "キャンセル",
                    }),
                    h.jsx("button", {
                      onClick: b,
                      disabled: c || !o || !j,
                      className: `
                px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2
                ${c || !o || !j ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"}
              `,
                      children: c
                        ? h.jsxs(h.Fragment, {
                            children: [
                              h.jsx("div", {
                                className:
                                  "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin",
                              }),
                              "送信中...",
                            ],
                          })
                        : h.jsxs(h.Fragment, {
                            children: [
                              h.jsx(f1, { className: "w-4 h-4" }),
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
function eC(e, r) {
  const o = e.split(`
`),
    i = r.split(`
`),
    l = [],
    u = tC(o, i);
  let c = 0,
    d = 0,
    p = 0;
  for (; c < o.length || d < i.length; )
    p < u.length && c < o.length && o[c] === u[p]
      ? d < i.length && i[d] === u[p]
        ? (l.push({
            type: "unchanged",
            content: u[p],
            lineNumber: { original: c + 1, modified: d + 1 },
          }),
          c++,
          d++,
          p++)
        : (l.push({
            type: "added",
            content: i[d],
            lineNumber: { modified: d + 1 },
          }),
          d++)
      : c < o.length
        ? (l.push({
            type: "removed",
            content: o[c],
            lineNumber: { original: c + 1 },
          }),
          c++)
        : d < i.length &&
          (l.push({
            type: "added",
            content: i[d],
            lineNumber: { modified: d + 1 },
          }),
          d++);
  return l;
}
function tC(e, r) {
  const o = e.length,
    i = r.length,
    l = Array.from({ length: o + 1 }, () => Array(i + 1).fill(0));
  for (let p = 1; p <= o; p++)
    for (let m = 1; m <= i; m++)
      e[p - 1] === r[m - 1]
        ? (l[p][m] = l[p - 1][m - 1] + 1)
        : (l[p][m] = Math.max(l[p - 1][m], l[p][m - 1]));
  const u = [];
  let c = o,
    d = i;
  for (; c > 0 && d > 0; )
    e[c - 1] === r[d - 1]
      ? (u.unshift(e[c - 1]), c--, d--)
      : l[c - 1][d] > l[c][d - 1]
        ? c--
        : d--;
  return u;
}
function nC({ original: e, modified: r, fileName: o }) {
  const i = E.useMemo(() => eC(e, r), [e, r]),
    l = E.useMemo(() => {
      const u = i.filter((d) => d.type === "added").length,
        c = i.filter((d) => d.type === "removed").length;
      return { added: u, removed: c };
    }, [i]);
  return h.jsxs("div", {
    className:
      "bg-[var(--bg-base)] rounded-lg overflow-hidden border border-[var(--border-default)]",
    children: [
      o &&
        h.jsxs("div", {
          className:
            "px-4 py-2 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between",
          children: [
            h.jsx("span", {
              className: "text-sm font-mono text-[var(--text-secondary)]",
              children: o,
            }),
            h.jsxs("div", {
              className: "flex gap-3 text-xs",
              children: [
                h.jsxs("span", {
                  className: "text-green-400",
                  children: ["+", l.added],
                }),
                h.jsxs("span", {
                  className: "text-red-400",
                  children: ["-", l.removed],
                }),
              ],
            }),
          ],
        }),
      h.jsx("div", {
        className: "overflow-x-auto",
        children: h.jsx("table", {
          className: "w-full text-xs font-mono",
          children: h.jsx("tbody", {
            children: i.map((u, c) =>
              h.jsxs(
                "tr",
                {
                  className: `
                  ${u.type === "added" ? "bg-green-500/10" : ""}
                  ${u.type === "removed" ? "bg-red-500/10" : ""}
                `,
                  children: [
                    h.jsx("td", {
                      className:
                        "w-10 px-2 py-0.5 text-right text-[var(--text-muted)] select-none border-r border-[var(--border-subtle)]",
                      children: u.lineNumber.original || "",
                    }),
                    h.jsx("td", {
                      className:
                        "w-10 px-2 py-0.5 text-right text-[var(--text-muted)] select-none border-r border-[var(--border-subtle)]",
                      children: u.lineNumber.modified || "",
                    }),
                    h.jsx("td", {
                      className: "w-6 px-1 py-0.5 text-center select-none",
                      children:
                        u.type !== "unchanged" &&
                        h.jsx("span", {
                          className:
                            u.type === "added"
                              ? "text-green-400"
                              : "text-red-400",
                          children: u.type === "added" ? "+" : "-",
                        }),
                    }),
                    h.jsx("td", {
                      className:
                        "px-2 py-0.5 whitespace-pre text-[var(--text-primary)]",
                      children: u.content || " ",
                    }),
                  ],
                },
                c
              )
            ),
          }),
        }),
      }),
    ],
  });
}
function rC(e) {
  return e.split("/").pop() || e;
}
function oC(e) {
  switch (e) {
    case "rule":
      return "bg-blue-500/20 text-blue-400";
    case "example":
      return "bg-green-500/20 text-green-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}
function sC({
  isOpen: e,
  onClose: r,
  result: o,
  onApprove: i,
  isApplying: l = !1,
}) {
  const [u, c] = E.useState(() => new Set(o.changes.map((w) => w.id))),
    [d, p] = E.useState(null),
    m = E.useCallback((w) => {
      c((j) => {
        const C = new Set(j);
        return (C.has(w) ? C.delete(w) : C.add(w), C);
      });
    }, []),
    v = E.useCallback((w) => {
      p((j) => (j === w ? null : w));
    }, []),
    g = E.useMemo(() => o.changes.filter((w) => u.has(w.id)), [o.changes, u]),
    x = E.useMemo(() => {
      const w = o.changes.reduce((b, I) => b + I.lineCountBefore, 0),
        j = o.changes.reduce((b, I) => b + I.lineCountAfter, 0),
        C = o.changes.reduce((b, I) => b + I.extractedFiles.length, 0);
      return {
        totalLinesBefore: w,
        totalLinesAfter: j,
        linesReduced: w - j,
        extractedFilesCount: C,
      };
    }, [o.changes]),
    S = E.useCallback(async () => {
      await i(g);
    }, [i, g]);
  return e
    ? h.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
          h.jsx("div", {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: r,
          }),
          h.jsxs("div", {
            className:
              "relative bg-[var(--bg-surface)] rounded-xl shadow-2xl w-[800px] max-h-[85vh] flex flex-col border border-[var(--border-default)]",
            children: [
              h.jsxs("div", {
                className:
                  "px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  h.jsxs("div", {
                    children: [
                      h.jsx("h2", {
                        className:
                          "text-lg font-semibold text-[var(--text-primary)]",
                        children: "最適化結果の確認",
                      }),
                      h.jsx("p", {
                        className: "text-sm text-[var(--text-muted)] mt-1",
                        children: "変更を適用する前に確認してください",
                      }),
                    ],
                  }),
                  h.jsx("button", {
                    onClick: r,
                    disabled: l,
                    className:
                      "p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                    children: h.jsx("svg", {
                      className: "w-5 h-5 text-[var(--text-muted)]",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: h.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12",
                      }),
                    }),
                  }),
                ],
              }),
              h.jsxs("div", {
                className:
                  "px-6 py-3 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex gap-6 text-sm",
                children: [
                  h.jsxs("div", {
                    children: [
                      h.jsx("span", {
                        className: "text-[var(--text-muted)]",
                        children: "変更ファイル: ",
                      }),
                      h.jsx("span", {
                        className: "text-[var(--text-primary)] font-medium",
                        children: o.changes.length,
                      }),
                    ],
                  }),
                  h.jsxs("div", {
                    children: [
                      h.jsx("span", {
                        className: "text-[var(--text-muted)]",
                        children: "行数削減: ",
                      }),
                      h.jsxs("span", {
                        className: "text-green-400 font-medium",
                        children: ["-", x.linesReduced, "行"],
                      }),
                    ],
                  }),
                  h.jsxs("div", {
                    children: [
                      h.jsx("span", {
                        className: "text-[var(--text-muted)]",
                        children: "抽出ファイル: ",
                      }),
                      h.jsx("span", {
                        className: "text-[var(--text-primary)] font-medium",
                        children: x.extractedFilesCount,
                      }),
                    ],
                  }),
                  o.retryCount > 0 &&
                    h.jsxs("div", {
                      children: [
                        h.jsx("span", {
                          className: "text-[var(--text-muted)]",
                          children: "リトライ: ",
                        }),
                        h.jsxs("span", {
                          className: "text-yellow-400 font-medium",
                          children: [o.retryCount, "回"],
                        }),
                      ],
                    }),
                ],
              }),
              h.jsxs("div", {
                className: "flex-1 overflow-y-auto px-6 py-4",
                children: [
                  o.changes.length === 0
                    ? h.jsx("div", {
                        className: "text-center py-8 text-[var(--text-muted)]",
                        children: "最適化対象のファイルがありません",
                      })
                    : h.jsx("div", {
                        className: "space-y-3",
                        children: o.changes.map((w) =>
                          h.jsxs(
                            "div",
                            {
                              className: `border rounded-lg overflow-hidden transition-colors ${u.has(w.id) ? "border-[var(--color-primary-500)] bg-[var(--color-primary-500)]/5" : "border-[var(--border-default)] bg-[var(--bg-elevated)]"}`,
                              children: [
                                h.jsxs("div", {
                                  className:
                                    "flex items-center gap-3 p-4 cursor-pointer",
                                  onClick: () => m(w.id),
                                  children: [
                                    h.jsx("div", {
                                      className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${u.has(w.id) ? "bg-[var(--color-primary-500)] border-[var(--color-primary-500)]" : "border-[var(--border-default)]"}`,
                                      children:
                                        u.has(w.id) &&
                                        h.jsx("svg", {
                                          className: "w-3 h-3 text-white",
                                          fill: "none",
                                          stroke: "currentColor",
                                          viewBox: "0 0 24 24",
                                          children: h.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 3,
                                            d: "M5 13l4 4L19 7",
                                          }),
                                        }),
                                    }),
                                    h.jsxs("div", {
                                      className: "flex-1",
                                      children: [
                                        h.jsxs("div", {
                                          className: "flex items-center gap-2",
                                          children: [
                                            h.jsx("span", {
                                              className:
                                                "font-medium text-[var(--text-primary)]",
                                              children: rC(w.filePath),
                                            }),
                                            h.jsx("span", {
                                              className: `text-xs px-2 py-0.5 rounded ${w.type === "claude-md" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`,
                                              children:
                                                w.type === "claude-md"
                                                  ? "CLAUDE.md"
                                                  : "Skill",
                                            }),
                                          ],
                                        }),
                                        h.jsxs("p", {
                                          className:
                                            "text-sm text-[var(--text-muted)] mt-0.5",
                                          children: [
                                            w.lineCountBefore,
                                            "行 → ",
                                            w.lineCountAfter,
                                            "行",
                                            h.jsxs("span", {
                                              className: "text-green-400 ml-2",
                                              children: [
                                                "(-",
                                                w.lineCountBefore -
                                                  w.lineCountAfter,
                                                "行)",
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    w.extractedFiles.length > 0 &&
                                      h.jsxs("div", {
                                        className:
                                          "text-sm text-[var(--text-muted)]",
                                        children: [
                                          w.extractedFiles.length,
                                          " ファイル抽出",
                                        ],
                                      }),
                                    h.jsx("button", {
                                      onClick: (j) => {
                                        (j.stopPropagation(), v(w.id));
                                      },
                                      className:
                                        "p-1 hover:bg-[var(--bg-surface)] rounded transition-colors",
                                      children: h.jsx("svg", {
                                        className: `w-4 h-4 text-[var(--text-muted)] transition-transform ${d === w.id ? "rotate-180" : ""}`,
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: h.jsx("path", {
                                          strokeLinecap: "round",
                                          strokeLinejoin: "round",
                                          strokeWidth: 2,
                                          d: "M19 9l-7 7-7-7",
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                                d === w.id &&
                                  h.jsxs("div", {
                                    className: "px-4 pb-4 pt-0",
                                    children: [
                                      h.jsx(nC, {
                                        original: w.originalContent,
                                        modified: w.optimizedContent,
                                        fileName: w.filePath,
                                      }),
                                      w.extractedFiles.length > 0 &&
                                        h.jsxs("div", {
                                          className: "mt-4",
                                          children: [
                                            h.jsx("h4", {
                                              className:
                                                "text-sm font-medium text-[var(--text-secondary)] mb-2",
                                              children: "抽出ファイル:",
                                            }),
                                            h.jsx("div", {
                                              className: "space-y-1",
                                              children: w.extractedFiles.map(
                                                (j, C) =>
                                                  h.jsxs(
                                                    "div",
                                                    {
                                                      className:
                                                        "flex items-center gap-2 text-sm",
                                                      children: [
                                                        h.jsx("span", {
                                                          className: `px-1.5 py-0.5 rounded text-xs ${oC(j.referenceType)}`,
                                                          children:
                                                            j.referenceType,
                                                        }),
                                                        h.jsx("span", {
                                                          className:
                                                            "text-[var(--text-muted)] font-mono",
                                                          children: j.path,
                                                        }),
                                                      ],
                                                    },
                                                    C
                                                  )
                                              ),
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                              ],
                            },
                            w.id
                          )
                        ),
                      }),
                  o.errors.length > 0 &&
                    h.jsxs("div", {
                      className:
                        "mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4",
                      children: [
                        h.jsx("h4", {
                          className: "text-sm font-medium text-red-400 mb-2",
                          children: "警告・エラー:",
                        }),
                        h.jsx("ul", {
                          className:
                            "text-sm text-red-300 list-disc list-inside",
                          children: o.errors.map((w, j) =>
                            h.jsx("li", { children: w }, j)
                          ),
                        }),
                      ],
                    }),
                ],
              }),
              h.jsxs("div", {
                className:
                  "px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between",
                children: [
                  h.jsx("div", {
                    className: "text-sm text-[var(--text-muted)]",
                    children:
                      u.size > 0 &&
                      h.jsxs(h.Fragment, {
                        children: ["選択中: ", u.size, " ファイル"],
                      }),
                  }),
                  h.jsxs("div", {
                    className: "flex gap-3",
                    children: [
                      h.jsx("button", {
                        onClick: r,
                        disabled: l,
                        className:
                          "px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors disabled:opacity-50",
                        children: "キャンセル",
                      }),
                      h.jsx("button", {
                        onClick: S,
                        disabled: u.size === 0 || l,
                        className: `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${u.size === 0 || l ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed" : "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]"}`,
                        children: l ? "適用中..." : "選択した変更を適用",
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
function iC() {
  const [e, r] = E.useState(!1),
    [o, i] = E.useState(!1),
    [l, u] = E.useState([]),
    [c, d] = E.useState(null),
    [p, m] = E.useState(null),
    [v, g] = E.useState(""),
    x = E.useCallback(async (j) => {
      var C;
      (r(!0), m(null), d(null), u([]), g(j.projectPath));
      try {
        const b = await fetch("/api/optimize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectPath: j.projectPath,
            globalPath: j.globalPath,
            targets: j.targets ?? ["claude-md", "skills"],
            dryRun: !0,
          }),
        });
        if (!b.ok) {
          const k = await b.json();
          throw new Error(
            ((C = k.error) == null ? void 0 : C.message) ||
              "最適化に失敗しました"
          );
        }
        const I = await b.json();
        return (d(I), I);
      } catch (b) {
        const I = b instanceof Error ? b.message : "最適化に失敗しました";
        return (m(I), null);
      } finally {
        r(!1);
      }
    }, []),
    S = E.useCallback(
      async (j) => {
        var C;
        if (j.length === 0) return (m("適用する変更がありません"), !1);
        (i(!0), m(null));
        try {
          const b = await fetch("/api/optimize/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ changes: j, projectPath: v }),
          });
          if (!b.ok) {
            const I = await b.json();
            throw new Error(
              ((C = I.error) == null ? void 0 : C.message) ||
                "変更の適用に失敗しました"
            );
          }
          return !0;
        } catch (b) {
          const I = b instanceof Error ? b.message : "変更の適用に失敗しました";
          return (m(I), !1);
        } finally {
          i(!1);
        }
      },
      [v]
    ),
    w = E.useCallback(() => {
      (r(!1), i(!1), u([]), d(null), m(null), g(""));
    }, []);
  return {
    isRunning: e,
    isApplying: o,
    progress: l,
    result: c,
    error: p,
    startOptimize: x,
    applyChanges: S,
    reset: w,
  };
}
function lC() {
  const { theme: e, toggleTheme: r } = QN(),
    { selectedProjectId: o, projects: i } = Yc(),
    [l, u] = E.useState([]),
    [c, d] = E.useState("sessions"),
    [p, m] = E.useState([]),
    [v, g] = E.useState([]),
    [x, S] = E.useState(!1),
    [w, j] = E.useState(null),
    [C, b] = E.useState(null),
    [I, k] = E.useState(null),
    _ = E.useRef(null),
    [D, z] = E.useState({}),
    [R, H] = E.useState(null),
    [V, ie] = E.useState(null),
    [X, Y] = E.useState(!1),
    [te, L] = E.useState(!1),
    [q, B] = E.useState(!1),
    {
      isApplying: K,
      result: A,
      error: $,
      startOptimize: U,
      applyChanges: P,
      reset: M,
    } = iC(),
    ne = E.useMemo(
      () =>
        l
          .filter((ye) => !p.includes(ye.sessionId))
          .filter((ye) => !o || ye.projectId === o),
      [l, p, o]
    ),
    oe = E.useCallback(async () => {
      try {
        const ye = await fetch("/api/sessions?limit=100&status=completed");
        if (!ye.ok) throw new Error("Failed to fetch");
        const Ie = await ye.json();
        u(Ie.items || []);
      } catch (ye) {
        (console.error("[ViewerPage] Failed to fetch sessions:", ye), u([]));
      }
    }, []);
  (E.useEffect(() => {
    oe();
  }, [oe]),
    E.useEffect(() => {
      let ye = !0;
      const Ie = async () => {
        try {
          const Le = [],
            Qe = await fetch("/api/sessions?limit=10&status=processing");
          if (Qe.ok) {
            const Fe = await Qe.json();
            Le.push(...(Fe.items || []));
          }
          const Be = await fetch("/api/sessions?limit=10&status=idle");
          if (Be.ok) {
            const Fe = await Be.json();
            Le.push(...(Fe.items || []));
          }
          if (!ye) return;
          if (Le.length === 0) {
            g([]);
            return;
          }
          const Et = await Promise.all(
            Le.map(async (Fe) => {
              var Mt;
              try {
                const gn = await fetch(
                  `/api/sessions/${Fe.sessionId}/observations?limit=100`
                );
                if (gn.ok) {
                  const xt = await gn.json();
                  return {
                    session: Fe,
                    observations: xt.items || [],
                    observationCount:
                      ((Mt = xt.items) == null ? void 0 : Mt.length) || 0,
                    tokenCount: Fe.tokenCount || 0,
                    inputTokens: Fe.inputTokens,
                    outputTokens: Fe.outputTokens,
                  };
                }
              } catch {}
              return {
                session: Fe,
                observations: [],
                observationCount: 0,
                tokenCount: Fe.tokenCount || 0,
                inputTokens: Fe.inputTokens,
                outputTokens: Fe.outputTokens,
              };
            })
          );
          ye && g(Et);
        } catch (Le) {
          console.error("[ViewerPage] Failed to fetch current sessions:", Le);
        }
      };
      Ie();
      const Re = setInterval(Ie, 5e3);
      return () => {
        ((ye = !1), clearInterval(Re));
      };
    }, []));
  const { connect: F, lastTokensUpdated: Q } = Il();
  (E.useEffect(() => {
    F();
  }, [F]),
    E.useEffect(() => {
      Q &&
        g((ye) =>
          ye.map((Ie) => {
            var Re;
            return ((Re = Ie.session) == null ? void 0 : Re.sessionId) ===
              Q.sessionId
              ? {
                  ...Ie,
                  inputTokens: Q.inputTokens,
                  outputTokens: Q.outputTokens,
                  session: Ie.session
                    ? {
                        ...Ie.session,
                        inputTokens: Q.inputTokens,
                        outputTokens: Q.outputTokens,
                      }
                    : null,
                }
              : Ie;
          })
        );
    }, [Q]));
  const re = E.useCallback((ye) => {
      m((Ie) =>
        Ie.includes(ye.sessionId)
          ? Ie.filter((Re) => Re !== ye.sessionId)
          : [...Ie, ye.sessionId]
      );
    }, []),
    G = E.useCallback((ye) => {
      (console.log("[Viewer] Session clicked:", ye.sessionId), H(ye.sessionId));
    }, []),
    se = E.useCallback((ye) => {
      console.log("[Viewer] Get session:", ye);
    }, []),
    ce = E.useCallback((ye) => {
      j(ye);
    }, []),
    fe = E.useCallback(async () => {
      var Ie;
      if (!w) return;
      const ye = w.sessionId;
      try {
        const Re = await fetch(`/api/sessions/${ye}`, { method: "DELETE" });
        if (!Re.ok) {
          const Le = await Re.json();
          throw new Error(
            ((Ie = Le.error) == null ? void 0 : Ie.message) ||
              "削除に失敗しました"
          );
        }
        (u((Le) => Le.filter((Qe) => Qe.sessionId !== ye)),
          m((Le) => Le.filter((Qe) => Qe !== ye)),
          j(null));
      } catch (Re) {
        (console.error("[ViewerPage] Failed to delete session:", Re),
          alert(
            Re instanceof Error ? Re.message : "セッションの削除に失敗しました"
          ));
      }
    }, [w]),
    pe = E.useCallback(
      (ye) => {
        const Ie = l.find((Re) => Re.sessionId === ye);
        j(
          Ie
            ? { sessionId: Ie.sessionId, name: Ie.name }
            : { sessionId: ye, name: ye }
        );
      },
      [l]
    ),
    ge = E.useCallback((ye, Ie) => {
      u((Re) =>
        Re.map((Le) => (Le.sessionId === ye ? { ...Le, name: Ie } : Le))
      );
    }, []),
    Se = E.useCallback(async (ye) => {
      var Ie;
      try {
        const Re = await fetch("/api/sessions/bulk-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionIds: ye }),
        });
        if (!Re.ok) {
          const Be = await Re.json();
          throw new Error(
            ((Ie = Be.error) == null ? void 0 : Ie.message) ||
              "一括削除に失敗しました"
          );
        }
        const Le = await Re.json(),
          Qe = new Set(
            Le.results.filter((Be) => Be.success).map((Be) => Be.sessionId)
          );
        (u((Be) => Be.filter((Et) => !Qe.has(Et.sessionId))),
          m((Be) => Be.filter((Et) => !Qe.has(Et))));
      } catch (Re) {
        (console.error("[ViewerPage] Failed to bulk delete sessions:", Re),
          alert(Re instanceof Error ? Re.message : "一括削除に失敗しました"));
      }
    }, []),
    Pe = E.useCallback((ye) => {
      b(ye);
    }, []),
    me = E.useCallback(async () => {
      if (C)
        return new Promise((ye) => {
          ((_.current = ye), k({ type: C.type, id: C.id }));
        });
    }, [C]),
    Ce = E.useCallback(() => {
      (k(null), b(null), _.current && (_.current(), (_.current = null)));
    }, []),
    [he, _e] = E.useState(null),
    De = E.useCallback(
      (ye) => {
        const Ie = v.find((Re) => {
          var Le;
          return ((Le = Re.session) == null ? void 0 : Le.sessionId) === ye;
        });
        if (!(Ie != null && Ie.session) || Ie.observationCount === 0) {
          alert("エクスポートするobservationsがありません");
          return;
        }
        (console.log("[Viewer] Opening Smart Export modal:", ye),
          _e(Ie),
          S(!0));
      },
      [v]
    ),
    it = E.useCallback(async () => {
      (console.log("[Viewer] Smart Export completed"), await oe());
    }, [oe]),
    ht = E.useCallback(async (ye, Ie) => {
      var Re, Le, Qe, Be, Et, Fe, Mt, gn;
      if (Ie.length < 2) return null;
      (console.log("[Viewer] Starting merge for context:", ye, Ie),
        z((xt) => ({ ...xt, [ye]: { status: "merging", summary: null } })));
      try {
        const xt = await fetch("/api/merges/with-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceSessionIds: Ie }),
        });
        if (!xt.ok) {
          const yn = await xt.json();
          return (
            console.error("[Viewer] Merge failed:", yn),
            z((sr) => ({ ...sr, [ye]: { status: "error", summary: null } })),
            null
          );
        }
        const vt = await xt.json(),
          or = {
            shortSummary:
              ((Re = vt.summary) == null ? void 0 : Re.shortSummary) || "",
            detailedSummary:
              ((Le = vt.summary) == null ? void 0 : Le.detailedSummary) || "",
            keyDecisions:
              ((Qe = vt.summary) == null ? void 0 : Qe.keyDecisions) || [],
            topics: ((Be = vt.summary) == null ? void 0 : Be.topics) || [],
            sessionCount:
              ((Et = vt.summary) == null ? void 0 : Et.sessionCount) ||
              Ie.length,
            totalOriginalTokens:
              ((Fe = vt.summary) == null ? void 0 : Fe.totalOriginalTokens) ||
              0,
            mergedTokens:
              ((Mt = vt.summary) == null ? void 0 : Mt.mergedTokens) || 0,
            compressionRatio:
              ((gn = vt.summary) == null ? void 0 : gn.compressionRatio) || 0,
          };
        return (
          z((yn) => ({ ...yn, [ye]: { status: "completed", summary: or } })),
          console.log("[Viewer] Merge completed for context:", ye, or),
          or
        );
      } catch (xt) {
        return (
          console.error("[Viewer] Merge error:", xt),
          z((vt) => ({ ...vt, [ye]: { status: "error", summary: null } })),
          null
        );
      }
    }, []);
  return h.jsxs("div", {
    className: `${e === "dark" ? "viewer-theme " : ""}h-screen flex flex-col bg-[var(--bg-base)]`,
    children: [
      h.jsxs("header", {
        className:
          "h-12 flex items-center justify-between px-4 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]",
        children: [
          h.jsxs("div", {
            className: "flex items-center gap-4",
            children: [
              h.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  h.jsx("span", {
                    className:
                      "text-lg font-semibold text-[var(--color-primary-500)]",
                    children: "cnthub",
                  }),
                  h.jsx("span", {
                    className: "text-sm text-[var(--text-muted)]",
                    children: "Viewer",
                  }),
                ],
              }),
              h.jsxs("div", {
                className:
                  "flex items-center bg-[var(--bg-elevated)] rounded-lg p-1",
                role: "tablist",
                "aria-label": "ビュー切り替え",
                children: [
                  h.jsxs("button", {
                    role: "tab",
                    "aria-selected": c === "sessions",
                    "aria-controls": "sessions-panel",
                    onClick: () => d("sessions"),
                    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${c === "sessions" ? "bg-[var(--color-primary-500)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"}`,
                    children: [h.jsx(Jv, { className: "w-4 h-4" }), "Sessions"],
                  }),
                  h.jsxs("button", {
                    role: "tab",
                    "aria-selected": c === "system",
                    "aria-controls": "system-panel",
                    onClick: () => d("system"),
                    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${c === "system" ? "bg-[var(--color-primary-500)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"}`,
                    children: [h.jsx(s1, { className: "w-4 h-4" }), "System"],
                  }),
                ],
              }),
            ],
          }),
          h.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              h.jsx("button", {
                onClick: () => L(!0),
                className:
                  "p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors",
                "aria-label": "フィードバックを送信",
                children: h.jsx(Xc, {
                  className: "w-5 h-5 text-[var(--text-secondary)]",
                }),
              }),
              h.jsx("button", {
                onClick: () => Y(!0),
                className:
                  "p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors",
                "aria-label": "操作ガイドを表示",
                children: h.jsx($m, {
                  className: "w-5 h-5 text-[var(--text-secondary)]",
                }),
              }),
              h.jsx("button", {
                onClick: r,
                className:
                  "p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors",
                "aria-label":
                  e === "dark" ? "ライトモードに切替" : "ダークモードに切替",
                children:
                  e === "dark"
                    ? h.jsx(n1, {
                        className: "w-5 h-5 text-[var(--text-secondary)]",
                      })
                    : h.jsx(t1, {
                        className: "w-5 h-5 text-[var(--text-secondary)]",
                      }),
              }),
            ],
          }),
        ],
      }),
      h.jsx("div", {
        className: "flex-1 flex overflow-hidden",
        children:
          c === "sessions"
            ? h.jsxs(h.Fragment, {
                children: [
                  h.jsx(h1, {
                    sessions: l,
                    onSessionSelect: re,
                    onSessionClick: G,
                    onSessionDelete: ce,
                    onBulkDelete: Se,
                    onSessionHover: ie,
                    selectedSessionIds: p,
                  }),
                  h.jsx("main", {
                    className: "flex-1 overflow-hidden",
                    children: h.jsx("div", {
                      id: "sessions-panel",
                      role: "tabpanel",
                      "aria-labelledby": "sessions-tab",
                      className: "h-full",
                      children: h.jsx(FN, {
                        sessions: ne,
                        projects: i,
                        currentSessionsData: v,
                        theme: e,
                        onGetSession: se,
                        onExportSession: De,
                        onDeleteRequest: Pe,
                        pendingDelete: I,
                        onDeleteComplete: Ce,
                        onMerge: ht,
                        mergeStateByContext: D,
                        onSessionDetail: (ye) => H(ye),
                        hoveredSessionId: V,
                      }),
                    }),
                  }),
                ],
              })
            : h.jsx("main", {
                className: "flex-1 overflow-hidden",
                children: h.jsx("div", {
                  id: "system-panel",
                  role: "tabpanel",
                  "aria-labelledby": "system-tab",
                  className: "h-full",
                  children: h.jsx(UN, {
                    onOptimize: async (ye, Ie) => {
                      console.log("[System] Optimize requested:", ye, Ie);
                      const Re = i.find((Fe) => Fe.projectId === o);
                      if (!(Re != null && Re.path)) {
                        alert("プロジェクトを選択してください");
                        return;
                      }
                      const Be = ["skills", "rules", "mcp", "hooks"].includes(
                        ye
                      )
                        ? ["skills", "claude-md"]
                        : ["claude-md"];
                      (await U({ projectPath: Re.path, targets: Be }))
                        ? B(!0)
                        : $ && alert(`最適化エラー: ${$}`);
                    },
                  }),
                }),
              }),
      }),
      (he == null ? void 0 : he.session) &&
        h.jsx(XN, {
          isOpen: x,
          onClose: () => {
            (S(!1), _e(null));
          },
          sessionId: he.session.sessionId,
          sessionName: he.session.name,
          onExportComplete: it,
        }),
      h.jsx(hm, {
        isOpen: !!w,
        onClose: () => j(null),
        onConfirm: fe,
        targetType: "session",
        targetName: (w == null ? void 0 : w.name) || "",
        targetId: w == null ? void 0 : w.sessionId,
      }),
      h.jsx(hm, {
        isOpen: !!C,
        onClose: () => b(null),
        onConfirm: me,
        targetType: (C == null ? void 0 : C.type) === "node" ? "node" : "edge",
        targetName: (C == null ? void 0 : C.name) || "",
        targetId: C == null ? void 0 : C.id,
      }),
      h.jsx(KN, {
        isOpen: !!R,
        onClose: () => H(null),
        sessionId: R,
        onDelete: pe,
        onNameChange: ge,
      }),
      h.jsx(qN, { isOpen: X, onClose: () => Y(!1) }),
      h.jsx(ZN, { isOpen: te, onClose: () => L(!1) }),
      A &&
        h.jsx(sC, {
          isOpen: q,
          onClose: () => {
            (B(!1), M());
          },
          result: A,
          onApprove: async (ye) => {
            (await P(ye))
              ? (alert("変更を適用しました"), B(!1), M())
              : alert(`変更の適用に失敗しました: ${$ || "不明なエラー"}`);
          },
          isApplying: K,
        }),
    ],
  });
}
function aC() {
  return h.jsxs(pv, {
    children: [
      h.jsx(xc, { path: "/", element: h.jsx(lC, {}) }),
      h.jsx(xc, { path: "*", element: h.jsx(fv, { to: "/", replace: !0 }) }),
    ],
  });
}
const uC = "/viewer/";
gx.createRoot(document.getElementById("root")).render(
  h.jsx(uo.StrictMode, {
    children: h.jsx(Dv, { basename: uC, children: h.jsx(aC, {}) }),
  })
);
//# sourceMappingURL=index-BZC-zzn9.js.map

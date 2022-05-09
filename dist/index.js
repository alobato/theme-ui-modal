var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var src_exports = {};
__export(src_exports, {
  Modal: () => Modal_default
});
module.exports = __toCommonJS(src_exports);

// src/Modal.jsx
var import_react2 = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_web = require("@react-spring/web");
var import_css = require("@theme-ui/css");
var import_react3 = require("@emotion/react");
var import_css2 = require("@emotion/css");

// src/useLockBodyScroll.js
var import_react = __toESM(require("react"));
function getClosestBody(el) {
  if (!el) {
    return null;
  } else if (el.tagName === "BODY") {
    return el;
  } else if (el.tagName === "IFRAME") {
    const document2 = el.contentDocument;
    return document2 ? document2.body : null;
  } else if (!el.offsetParent) {
    return null;
  }
  return getClosestBody(el.offsetParent);
}
function preventDefault(rawEvent) {
  const e = rawEvent || window.event;
  if (e.touches.length > 1)
    return true;
  if (e.preventDefault)
    e.preventDefault();
  return false;
}
var isIosDevice = typeof window !== "undefined" && window.navigator && window.navigator.platform && /iP(ad|hone|od)/.test(window.navigator.platform);
var bodies = /* @__PURE__ */ new Map();
var doc = typeof document === "object" ? document : void 0;
var documentListenerAdded = false;
function useLockBody(locked = true, elementRef) {
  elementRef = import_react.default.useRef(doc.body);
  const lock = (body) => {
    const bodyInfo = bodies.get(body);
    if (!bodyInfo) {
      bodies.set(body, { counter: 1, initialOverflow: body.style.overflow });
      if (isIosDevice) {
        if (!documentListenerAdded) {
          document.addEventListener("touchmove", preventDefault, {
            passive: false
          });
          documentListenerAdded = true;
        }
      } else {
        body.style.overflow = "hidden";
      }
    } else {
      bodies.set(body, {
        counter: bodyInfo.counter + 1,
        initialOverflow: bodyInfo.initialOverflow
      });
    }
  };
  const unlock = (body) => {
    const bodyInfo = bodies.get(body);
    if (bodyInfo) {
      if (bodyInfo.counter === 1) {
        bodies.delete(body);
        if (isIosDevice) {
          body.ontouchmove = null;
          if (documentListenerAdded) {
            document.removeEventListener("touchmove", preventDefault);
            documentListenerAdded = false;
          }
        } else {
          body.style.overflow = bodyInfo.initialOverflow;
        }
      } else {
        bodies.set(body, {
          counter: bodyInfo.counter - 1,
          initialOverflow: bodyInfo.initialOverflow
        });
      }
    }
  };
  import_react.default.useEffect(() => {
    const body = getClosestBody(elementRef.current);
    if (!body)
      return;
    if (locked) {
      lock(body);
    } else {
      unlock(body);
    }
  }, [locked, elementRef.current]);
  import_react.default.useEffect(() => {
    const body = getClosestBody(elementRef.current);
    if (!body)
      return;
    return () => {
      unlock(body);
    };
  }, []);
}
var useLockBodyScroll_default = useLockBody;

// src/Modal.jsx
function ModalContent(_a) {
  var _b = _a, { __themeKey = "modals", __css, variant = "large", sx, style } = _b, rest = __objRest(_b, ["__themeKey", "__css", "variant", "sx", "style"]);
  const theme = (0, import_react3.useTheme)();
  const baseStyles = {
    position: "relative",
    zIndex: "1001",
    margin: "0 auto",
    with: "calc(100% - 32px)",
    maxWidth: 1e3,
    top: 16
  };
  const __cssStyles = (0, import_css.css)(__css)(theme);
  const variantInTheme = (0, import_css.get)(theme, `${__themeKey}.${variant}`) || (0, import_css.get)(theme, variant);
  const variantStyles = variantInTheme && (0, import_css.css)(variantInTheme)(theme);
  const sxPropStyles = (0, import_css.css)(sx)(theme);
  const emotionStyle = __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, baseStyles), __cssStyles), variantStyles), sxPropStyles);
  const className = (0, import_css2.css)(emotionStyle);
  return /* @__PURE__ */ import_react2.default.createElement(import_web.animated.div, __spreadValues({
    className,
    style
  }, rest));
}
var ModalBody = ({ children }) => {
  const mainDivRef = import_react2.default.useRef(document.createElement("div"));
  const modalRootRef = import_react2.default.useRef(document.getElementById("modal-root"));
  import_react2.default.useEffect(() => {
    const modalRoot = modalRootRef.current;
    if (!modalRoot)
      throw new Error("No modal-root exists!");
    const mainDiv = mainDivRef.current;
    modalRoot.appendChild(mainDiv);
    return () => {
      modalRoot.removeChild(mainDiv);
    };
  }, []);
  return (0, import_react_dom.createPortal)(children, mainDivRef.current);
};
var Modal = ({ children, onCancel, closeOnClickOutside = true, shown, lockBodyScroll = true, backdrop = true, immediate = false, backdropColor = "hsl(0deg 0% 0% / 70%)", sx, variant }) => {
  useLockBodyScroll_default(shown && lockBodyScroll);
  const parentDiv = import_react2.default.useRef(null);
  import_react2.default.useEffect(() => {
    if (shown && parentDiv.current)
      parentDiv.current.focus();
  }, [shown]);
  const keyHandler = (e) => {
    if (shown && e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onCancel();
    }
  };
  const transition = (0, import_web.useTransition)(shown, {
    immediate,
    from: { opacity: 0, transform: "translateY(-1000px)" },
    enter: {
      opacity: 1,
      transform: "translateY(0px)",
      config: (item) => {
        if (item === "transform")
          return __spreadValues({}, import_web.config.stiff);
        return __spreadProps(__spreadValues({}, import_web.config.default), { duration: 300 });
      }
    },
    leave: {
      opacity: 0,
      config: (item) => {
        return __spreadProps(__spreadValues({}, import_web.config.default), { duration: 100 });
      }
    }
  });
  if (!shown)
    return null;
  return transition((style, item) => {
    return item && /* @__PURE__ */ import_react2.default.createElement(ModalBody, null, backdrop ? /* @__PURE__ */ import_react2.default.createElement("div", {
      ref: parentDiv,
      onKeyDown: keyHandler,
      tabIndex: 0,
      "aria-modal": "true",
      role: "dialog",
      style: { position: "fixed", top: 0, right: 0, bottom: 0, left: 0, overflow: "hidden", outline: "none" }
    }, /* @__PURE__ */ import_react2.default.createElement(ModalContent, {
      sx,
      variant,
      style: { transform: style.transform, opacity: style.opacity }
    }, children({ onRequestClose: onCancel })), backdrop && /* @__PURE__ */ import_react2.default.createElement(import_web.animated.div, {
      onClick: () => {
        if (closeOnClickOutside) {
          onCancel();
        }
      },
      style: { backgroundColor: backdropColor, opacity: style.opacity, position: "fixed", zIndex: 1e3, top: 0, right: 0, bottom: 0, left: 0, outline: "none", tabIndex: -1 }
    })) : /* @__PURE__ */ import_react2.default.createElement("div", {
      ref: parentDiv,
      onKeyDown: keyHandler,
      tabIndex: 0,
      "aria-modal": "true",
      role: "dialog"
    }, /* @__PURE__ */ import_react2.default.createElement(ModalContent, {
      sx,
      variant,
      style: { transform: style.transform, opacity: style.opacity }
    }, children({ onRequestClose: onCancel }))));
  });
};
var Modal_default = Modal;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Modal
});

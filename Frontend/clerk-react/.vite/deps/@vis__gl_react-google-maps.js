import {
  require_react_dom
} from "./chunk-DXOUNB47.js";
import {
  require_react
} from "./chunk-JBG67EE7.js";
import {
  __commonJS,
  __toESM
} from "./chunk-UV5CTPV7.js";

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/@vis.gl/react-google-maps/dist/index.modern.mjs
var import_react = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
var import_fast_deep_equal = __toESM(require_fast_deep_equal(), 1);
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i)
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var APILoadingStatus = {
  NOT_LOADED: "NOT_LOADED",
  LOADING: "LOADING",
  LOADED: "LOADED",
  FAILED: "FAILED",
  AUTH_FAILURE: "AUTH_FAILURE"
};
var MAPS_API_BASE_URL = "https://maps.googleapis.com/maps/api/js";
var GoogleMapsApiLoader = class {
  /**
   * Loads the Google Maps API with the specified parameters.
   * Since the Maps library can only be loaded once per page, this will
   * produce a warning when called multiple times with different
   * parameters.
   *
   * The returned promise resolves when loading completes
   * and rejects in case of an error or when the loading was aborted.
   */
  static async load(params, onLoadingStatusChange) {
    var _window$google;
    const libraries = params.libraries ? params.libraries.split(",") : [];
    const serializedParams = this.serializeParams(params);
    if (!((_window$google = window.google) != null && (_window$google = _window$google.maps) != null && _window$google.importLibrary)) {
      this.serializedApiParams = serializedParams;
      this.initImportLibrary(params, onLoadingStatusChange);
    } else {
      if (!this.serializedApiParams) {
        this.loadingStatus = APILoadingStatus.LOADED;
      }
      onLoadingStatusChange(this.loadingStatus);
    }
    if (this.serializedApiParams && this.serializedApiParams !== serializedParams) {
      console.warn(`The maps API has already been loaded with different parameters and will not be loaded again. Refresh the page for new values to have effect.`);
    }
    for (const lib of ["maps", ...libraries]) {
      await google.maps.importLibrary(lib);
    }
  }
  static serializeParams(params) {
    return [params.v, params.key, params.language, params.region, params.authReferrerPolicy, params.solutionChannel].join("/");
  }
  static initImportLibrary(params, onLoadingStatusChange) {
    if (!window.google)
      window.google = {};
    if (!window.google.maps)
      window.google.maps = {};
    if (window.google.maps["importLibrary"]) {
      console.warn("initImportLibrary can only be called once.", params);
      return;
    }
    let apiPromise = null;
    const loadApi = (library) => {
      if (apiPromise)
        return apiPromise;
      apiPromise = new Promise((resolve, reject) => {
        var _document$querySelect;
        const scriptElement = document.createElement("script");
        const urlParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
          const urlParamName = key.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase());
          urlParams.set(urlParamName, value);
        }
        urlParams.set("libraries", library);
        urlParams.set("loading", "async");
        urlParams.set("callback", "__googleMapsCallback__");
        scriptElement.async = true;
        scriptElement.src = MAPS_API_BASE_URL + `?` + urlParams.toString();
        window.__googleMapsCallback__ = () => {
          this.loadingStatus = APILoadingStatus.LOADED;
          onLoadingStatusChange(this.loadingStatus);
          resolve();
        };
        window.gm_authFailure = () => {
          this.loadingStatus = APILoadingStatus.AUTH_FAILURE;
          onLoadingStatusChange(this.loadingStatus);
        };
        scriptElement.onerror = () => {
          this.loadingStatus = APILoadingStatus.FAILED;
          onLoadingStatusChange(this.loadingStatus);
          reject(new Error("The Google Maps JavaScript API could not load."));
        };
        scriptElement.nonce = ((_document$querySelect = document.querySelector("script[nonce]")) == null ? void 0 : _document$querySelect.nonce) || "";
        this.loadingStatus = APILoadingStatus.LOADING;
        onLoadingStatusChange(this.loadingStatus);
        document.head.append(scriptElement);
      });
      return apiPromise;
    };
    google.maps.importLibrary = (libraryName) => loadApi(libraryName).then(() => google.maps.importLibrary(libraryName));
  }
};
GoogleMapsApiLoader.loadingStatus = APILoadingStatus.NOT_LOADED;
GoogleMapsApiLoader.serializedApiParams = void 0;
var _excluded$3 = ["onLoad", "apiKey", "version", "libraries"];
var _excluded2 = ["children"];
var APIProviderContext = import_react.default.createContext(null);
function useMapInstances() {
  const [mapInstances, setMapInstances] = (0, import_react.useState)({});
  const addMapInstance = (mapInstance, id = "default") => {
    setMapInstances((instances) => _extends({}, instances, {
      [id]: mapInstance
    }));
  };
  const removeMapInstance = (id = "default") => {
    setMapInstances((_ref) => {
      let remaining = _objectWithoutPropertiesLoose(_ref, [id].map(_toPropertyKey));
      return remaining;
    });
  };
  const clearMapInstances = () => {
    setMapInstances({});
  };
  return {
    mapInstances,
    addMapInstance,
    removeMapInstance,
    clearMapInstances
  };
}
function useGoogleMapsApiLoader(props) {
  const {
    onLoad,
    apiKey,
    version,
    libraries = []
  } = props, otherApiParams = _objectWithoutPropertiesLoose(props, _excluded$3);
  const [status, setStatus] = (0, import_react.useState)(GoogleMapsApiLoader.loadingStatus);
  const [loadedLibraries, addLoadedLibrary] = (0, import_react.useReducer)((loadedLibraries2, action) => {
    return _extends({}, loadedLibraries2, {
      [action.name]: action.value
    });
  }, {});
  const librariesString = (0, import_react.useMemo)(() => libraries == null ? void 0 : libraries.join(","), [libraries]);
  const serializedParams = (0, import_react.useMemo)(() => JSON.stringify(_extends({
    apiKey,
    version
  }, otherApiParams)), [apiKey, version, otherApiParams]);
  const importLibrary = (0, import_react.useCallback)(async (name) => {
    var _google;
    if (loadedLibraries[name]) {
      return loadedLibraries[name];
    }
    if (!((_google = google) != null && (_google = _google.maps) != null && _google.importLibrary)) {
      throw new Error("[api-provider-internal] importLibrary was called before google.maps.importLibrary was defined.");
    }
    const res = await window.google.maps.importLibrary(name);
    addLoadedLibrary({
      name,
      value: res
    });
    return res;
  }, [loadedLibraries]);
  (0, import_react.useEffect)(
    () => {
      (async () => {
        try {
          const params = _extends({
            key: apiKey
          }, otherApiParams);
          if (version)
            params.v = version;
          if ((librariesString == null ? void 0 : librariesString.length) > 0)
            params.libraries = librariesString;
          await GoogleMapsApiLoader.load(params, (status2) => setStatus(status2));
          for (const name of ["core", "maps", ...libraries]) {
            await importLibrary(name);
          }
          if (onLoad) {
            onLoad();
          }
        } catch (error) {
          console.error("<ApiProvider> failed to load Google Maps API", error);
        }
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiKey, librariesString, serializedParams]
  );
  return {
    status,
    loadedLibraries,
    importLibrary
  };
}
var APIProvider = (props) => {
  const {
    children
  } = props, loaderProps = _objectWithoutPropertiesLoose(props, _excluded2);
  const {
    mapInstances,
    addMapInstance,
    removeMapInstance,
    clearMapInstances
  } = useMapInstances();
  const {
    status,
    loadedLibraries,
    importLibrary
  } = useGoogleMapsApiLoader(loaderProps);
  return import_react.default.createElement(APIProviderContext.Provider, {
    value: {
      mapInstances,
      addMapInstance,
      removeMapInstance,
      clearMapInstances,
      status,
      loadedLibraries,
      importLibrary
    }
  }, children);
};
function useMapEvents(map, props) {
  for (const propName of eventPropNames) {
    const handler = props[propName];
    const eventType = propNameToEventType[propName];
    (0, import_react.useEffect)(() => {
      if (!map)
        return;
      if (!handler)
        return;
      const listener = google.maps.event.addListener(map, eventType, (ev) => {
        handler(createMapEvent(eventType, map, ev));
      });
      return () => listener.remove();
    }, [map, eventType, handler]);
  }
}
function createMapEvent(type, map, srcEvent) {
  const ev = {
    type,
    map,
    detail: {},
    stoppable: false,
    stop: () => {
    }
  };
  if (cameraEventTypes.includes(type)) {
    const camEvent = ev;
    const center = map.getCenter();
    const zoom = map.getZoom();
    const heading = map.getHeading() || 0;
    const tilt = map.getTilt() || 0;
    const bounds = map.getBounds();
    if (!center || !bounds || !Number.isFinite(zoom)) {
      console.warn("[createEvent] at least one of the values from the map returned undefined. This is not expected to happen. Please report an issue at https://github.com/visgl/react-google-maps/issues/new");
    }
    camEvent.detail = {
      center: (center == null ? void 0 : center.toJSON()) || {
        lat: 0,
        lng: 0
      },
      zoom: zoom || 0,
      heading,
      tilt,
      bounds: (bounds == null ? void 0 : bounds.toJSON()) || {
        north: 90,
        east: 180,
        south: -90,
        west: -180
      }
    };
    return camEvent;
  } else if (mouseEventTypes.includes(type)) {
    var _srcEvent$latLng;
    if (!srcEvent)
      throw new Error("[createEvent] mouse events must provide a srcEvent");
    const mouseEvent = ev;
    mouseEvent.domEvent = srcEvent.domEvent;
    mouseEvent.stoppable = true;
    mouseEvent.stop = () => srcEvent.stop();
    mouseEvent.detail = {
      latLng: ((_srcEvent$latLng = srcEvent.latLng) == null ? void 0 : _srcEvent$latLng.toJSON()) || null,
      placeId: srcEvent.placeId
    };
    return mouseEvent;
  }
  return ev;
}
var propNameToEventType = {
  onBoundsChanged: "bounds_changed",
  onCenterChanged: "center_changed",
  onClick: "click",
  onContextmenu: "contextmenu",
  onDblclick: "dblclick",
  onDrag: "drag",
  onDragend: "dragend",
  onDragstart: "dragstart",
  onHeadingChanged: "heading_changed",
  onIdle: "idle",
  onIsFractionalZoomEnabledChanged: "isfractionalzoomenabled_changed",
  onMapCapabilitiesChanged: "mapcapabilities_changed",
  onMapTypeIdChanged: "maptypeid_changed",
  onMousemove: "mousemove",
  onMouseout: "mouseout",
  onMouseover: "mouseover",
  onProjectionChanged: "projection_changed",
  onRenderingTypeChanged: "renderingtype_changed",
  onTilesLoaded: "tilesloaded",
  onTiltChanged: "tilt_changed",
  onZoomChanged: "zoom_changed",
  // note: onCameraChanged is an alias for the bounds_changed event,
  // since that is going to be fired in every situation where the camera is
  // updated.
  onCameraChanged: "bounds_changed"
};
var cameraEventTypes = ["bounds_changed", "center_changed", "heading_changed", "projection_changed", "tilt_changed", "zoom_changed"];
var mouseEventTypes = ["click", "contextmenu", "dblclick", "mousemove", "mouseout", "mouseover"];
var eventPropNames = Object.keys(propNameToEventType);
function useDeepCompareEffect(effect, deps) {
  const ref = (0, import_react.useRef)(void 0);
  if (!ref.current || !(0, import_fast_deep_equal.default)(deps, ref.current)) {
    ref.current = deps;
  }
  (0, import_react.useEffect)(effect, ref.current);
}
var mapOptionKeys = /* @__PURE__ */ new Set(["backgroundColor", "clickableIcons", "controlSize", "disableDefaultUI", "disableDoubleClickZoom", "draggable", "draggableCursor", "draggingCursor", "fullscreenControl", "fullscreenControlOptions", "gestureHandling", "isFractionalZoomEnabled", "keyboardShortcuts", "mapTypeControl", "mapTypeControlOptions", "mapTypeId", "maxZoom", "minZoom", "noClear", "panControl", "panControlOptions", "restriction", "rotateControl", "rotateControlOptions", "scaleControl", "scaleControlOptions", "scrollwheel", "streetView", "streetViewControl", "streetViewControlOptions", "styles", "zoomControl", "zoomControlOptions"]);
function useMapOptions(map, mapProps) {
  const mapOptions = {};
  const keys = Object.keys(mapProps);
  for (const key of keys) {
    if (!mapOptionKeys.has(key))
      continue;
    mapOptions[key] = mapProps[key];
  }
  useDeepCompareEffect(() => {
    if (!map)
      return;
    map.setOptions(mapOptions);
  }, [mapOptions]);
}
function useForceUpdate() {
  const [, forceUpdate] = (0, import_react.useReducer)((x) => x + 1, 0);
  return forceUpdate;
}
function handleBoundsChange(map, ref) {
  const center = map.getCenter();
  const zoom = map.getZoom();
  const heading = map.getHeading() || 0;
  const tilt = map.getTilt() || 0;
  const bounds = map.getBounds();
  if (!center || !bounds || !Number.isFinite(zoom)) {
    console.warn("[useTrackedCameraState] at least one of the values from the map returned undefined. This is not expected to happen. Please report an issue at https://github.com/visgl/react-google-maps/issues/new");
  }
  Object.assign(ref.current, {
    center: (center == null ? void 0 : center.toJSON()) || {
      lat: 0,
      lng: 0
    },
    zoom: zoom || 0,
    heading,
    tilt
  });
}
function useTrackedCameraStateRef(map) {
  const forceUpdate = useForceUpdate();
  const ref = (0, import_react.useRef)({
    center: {
      lat: 0,
      lng: 0
    },
    heading: 0,
    tilt: 0,
    zoom: 0
  });
  (0, import_react.useEffect)(() => {
    if (!map)
      return;
    const listener = google.maps.event.addListener(map, "bounds_changed", () => {
      handleBoundsChange(map, ref);
      forceUpdate();
    });
    return () => listener.remove();
  }, [map, forceUpdate]);
  return ref;
}
function useApiLoadingStatus() {
  var _useContext;
  return ((_useContext = (0, import_react.useContext)(APIProviderContext)) == null ? void 0 : _useContext.status) || APILoadingStatus.NOT_LOADED;
}
function useDeckGLCameraUpdate(map, props) {
  const {
    viewport,
    viewState
  } = props;
  const isDeckGlControlled = !!viewport;
  (0, import_react.useLayoutEffect)(() => {
    if (!map || !viewState)
      return;
    const {
      latitude,
      longitude,
      bearing: heading,
      pitch: tilt,
      zoom
    } = viewState;
    map.moveCamera({
      center: {
        lat: latitude,
        lng: longitude
      },
      heading,
      tilt,
      zoom: zoom + 1
    });
  }, [map, viewState]);
  return isDeckGlControlled;
}
function isLatLngLiteral(obj) {
  if (!obj || typeof obj !== "object")
    return false;
  if (!("lat" in obj && "lng" in obj))
    return false;
  return Number.isFinite(obj.lat) && Number.isFinite(obj.lng);
}
function latLngEquals(a, b) {
  if (!a || !b)
    return false;
  const A = toLatLngLiteral(a);
  const B = toLatLngLiteral(b);
  if (A.lat !== B.lat || A.lng !== B.lng)
    return false;
  return true;
}
function toLatLngLiteral(obj) {
  if (isLatLngLiteral(obj))
    return obj;
  return obj.toJSON();
}
function useMapCameraParams(map, cameraStateRef, mapProps) {
  const center = mapProps.center ? toLatLngLiteral(mapProps.center) : null;
  let lat = null;
  let lng = null;
  if (center && Number.isFinite(center.lat) && Number.isFinite(center.lng)) {
    lat = center.lat;
    lng = center.lng;
  }
  const zoom = Number.isFinite(mapProps.zoom) ? mapProps.zoom : null;
  const heading = Number.isFinite(mapProps.heading) ? mapProps.heading : null;
  const tilt = Number.isFinite(mapProps.tilt) ? mapProps.tilt : null;
  (0, import_react.useLayoutEffect)(() => {
    if (!map)
      return;
    const nextCamera = {};
    let needsUpdate = false;
    if (lat !== null && lng !== null && (cameraStateRef.current.center.lat !== lat || cameraStateRef.current.center.lng !== lng)) {
      nextCamera.center = {
        lat,
        lng
      };
      needsUpdate = true;
    }
    if (zoom !== null && cameraStateRef.current.zoom !== zoom) {
      nextCamera.zoom = zoom;
      needsUpdate = true;
    }
    if (heading !== null && cameraStateRef.current.heading !== heading) {
      nextCamera.heading = heading;
      needsUpdate = true;
    }
    if (tilt !== null && cameraStateRef.current.tilt !== tilt) {
      nextCamera.tilt = tilt;
      needsUpdate = true;
    }
    if (needsUpdate) {
      map.moveCamera(nextCamera);
    }
  });
}
var AuthFailureMessage = () => {
  const style = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 999,
    display: "flex",
    flexFlow: "column nowrap",
    textAlign: "center",
    justifyContent: "center",
    fontSize: ".8rem",
    color: "rgba(0,0,0,0.6)",
    background: "#dddddd",
    padding: "1rem 1.5rem"
  };
  return import_react.default.createElement("div", {
    style
  }, import_react.default.createElement("h2", null, "Error: AuthFailure"), import_react.default.createElement("p", null, "A problem with your API key prevents the map from rendering correctly. Please make sure the value of the ", import_react.default.createElement("code", null, "APIProvider.apiKey"), " prop is correct. Check the error-message in the console for further details."));
};
function useCallbackRef() {
  const [el, setEl] = (0, import_react.useState)(null);
  const ref = (0, import_react.useCallback)((value) => setEl(value), [setEl]);
  return [el, ref];
}
function useApiIsLoaded() {
  const status = useApiLoadingStatus();
  return status === APILoadingStatus.LOADED;
}
var _excluded$2 = ["id", "defaultBounds", "defaultCenter", "defaultZoom", "defaultHeading", "defaultTilt"];
function useMapInstance(props, context) {
  const apiIsLoaded = useApiIsLoaded();
  const [map, setMap] = (0, import_react.useState)(null);
  const [container, containerRef] = useCallbackRef();
  const {
    id,
    defaultBounds,
    defaultCenter,
    defaultZoom,
    defaultHeading,
    defaultTilt
  } = props, mapOptions = _objectWithoutPropertiesLoose(props, _excluded$2);
  if (!mapOptions.center && defaultCenter)
    mapOptions.center = defaultCenter;
  if (!mapOptions.zoom && Number.isFinite(defaultZoom))
    mapOptions.zoom = defaultZoom;
  if (!mapOptions.heading && Number.isFinite(defaultHeading))
    mapOptions.heading = defaultHeading;
  if (!mapOptions.tilt && Number.isFinite(defaultTilt))
    mapOptions.tilt = defaultTilt;
  (0, import_react.useEffect)(
    () => {
      if (!container || !apiIsLoaded)
        return;
      const {
        addMapInstance,
        removeMapInstance
      } = context;
      const newMap = new google.maps.Map(container, mapOptions);
      setMap(newMap);
      addMapInstance(newMap, id);
      if (defaultBounds) {
        newMap.fitBounds(defaultBounds);
      }
      return () => {
        if (!container || !apiIsLoaded)
          return;
        google.maps.event.clearInstanceListeners(newMap);
        setMap(null);
        removeMapInstance(id);
      };
    },
    // some dependencies are ignored in the list below:
    //  - defaultBounds and the default* camera props will only be used once, and
    //    changes should be ignored
    //  - mapOptions has special hooks that take care of updating the options
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [container, apiIsLoaded, id, props.mapId]
  );
  return [map, containerRef];
}
var GoogleMapsContext = import_react.default.createContext(null);
var Map = (props) => {
  const {
    children,
    id,
    className,
    style
  } = props;
  const context = (0, import_react.useContext)(APIProviderContext);
  const loadingStatus = useApiLoadingStatus();
  if (!context) {
    throw new Error("<Map> can only be used inside an <ApiProvider> component.");
  }
  const [map, mapRef] = useMapInstance(props, context);
  const cameraStateRef = useTrackedCameraStateRef(map);
  useMapCameraParams(map, cameraStateRef, props);
  useMapEvents(map, props);
  useMapOptions(map, props);
  const isDeckGlControlled = useDeckGLCameraUpdate(map, props);
  const isControlledExternally = !!props.controlled;
  (0, import_react.useEffect)(() => {
    if (!map)
      return;
    if (isDeckGlControlled) {
      map.setOptions({
        disableDefaultUI: true
      });
    }
    if (isDeckGlControlled || isControlledExternally) {
      map.setOptions({
        gestureHandling: "none",
        keyboardShortcuts: false
      });
    }
    return () => {
      map.setOptions({
        gestureHandling: props.gestureHandling,
        keyboardShortcuts: props.keyboardShortcuts
      });
    };
  }, [map, isDeckGlControlled, isControlledExternally, props.gestureHandling, props.keyboardShortcuts]);
  const center = props.center ? toLatLngLiteral(props.center) : null;
  let lat = null;
  let lng = null;
  if (center && Number.isFinite(center.lat) && Number.isFinite(center.lng)) {
    lat = center.lat;
    lng = center.lng;
  }
  const cameraOptions = (0, import_react.useMemo)(() => {
    var _lat, _lng, _props$zoom, _props$heading, _props$tilt;
    return {
      center: {
        lat: (_lat = lat) != null ? _lat : 0,
        lng: (_lng = lng) != null ? _lng : 0
      },
      zoom: (_props$zoom = props.zoom) != null ? _props$zoom : 0,
      heading: (_props$heading = props.heading) != null ? _props$heading : 0,
      tilt: (_props$tilt = props.tilt) != null ? _props$tilt : 0
    };
  }, [lat, lng, props.zoom, props.heading, props.tilt]);
  (0, import_react.useLayoutEffect)(() => {
    if (!map || !isControlledExternally)
      return;
    map.moveCamera(cameraOptions);
    const listener = map.addListener("bounds_changed", () => {
      map.moveCamera(cameraOptions);
    });
    return () => listener.remove();
  }, [map, isControlledExternally, cameraOptions]);
  const combinedStyle = (0, import_react.useMemo)(() => _extends({
    width: "100%",
    height: "100%",
    // when using deckgl, the map should be sent to the back
    zIndex: isDeckGlControlled ? -1 : 0
  }, style), [style, isDeckGlControlled]);
  if (loadingStatus === APILoadingStatus.AUTH_FAILURE) {
    return import_react.default.createElement("div", {
      style: _extends({
        position: "relative"
      }, className ? {} : combinedStyle),
      className
    }, import_react.default.createElement(AuthFailureMessage, null));
  }
  return import_react.default.createElement("div", _extends({
    ref: mapRef,
    "data-testid": "map",
    style: className ? void 0 : combinedStyle,
    className
  }, id ? {
    id
  } : {}), map ? import_react.default.createElement(GoogleMapsContext.Provider, {
    value: {
      map
    }
  }, children) : null);
};
Map.deckGLViewProps = true;
function useMapsLibrary(name) {
  const apiIsLoaded = useApiIsLoaded();
  const ctx = (0, import_react.useContext)(APIProviderContext);
  (0, import_react.useEffect)(() => {
    if (!apiIsLoaded || !ctx)
      return;
    void ctx.importLibrary(name);
  }, [apiIsLoaded, ctx, name]);
  return (ctx == null ? void 0 : ctx.loadedLibraries[name]) || null;
}
var AdvancedMarkerContext = import_react.default.createContext(null);
function useAdvancedMarker(props) {
  var _useContext;
  const [marker, setMarker] = (0, import_react.useState)(null);
  const [contentContainer, setContentContainer] = (0, import_react.useState)(null);
  const map = (_useContext = (0, import_react.useContext)(GoogleMapsContext)) == null ? void 0 : _useContext.map;
  const markerLibrary = useMapsLibrary("marker");
  const {
    children,
    className,
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    collisionBehavior,
    draggable,
    position,
    title,
    zIndex
  } = props;
  const numChilds = import_react.Children.count(children);
  (0, import_react.useEffect)(() => {
    if (!map || !markerLibrary)
      return;
    const newMarker = new markerLibrary.AdvancedMarkerElement();
    newMarker.map = map;
    setMarker(newMarker);
    if (numChilds > 0) {
      const el = document.createElement("div");
      if (className)
        el.className = className;
      newMarker.content = el;
      setContentContainer(el);
    }
    return () => {
      newMarker.map = null;
      setMarker(null);
      setContentContainer(null);
    };
  }, [map, markerLibrary, numChilds]);
  (0, import_react.useEffect)(() => {
    if (!contentContainer)
      return;
    contentContainer.className = className != null ? className : "";
  }, [contentContainer, className]);
  (0, import_react.useEffect)(() => {
    if (!marker)
      return;
    const gme = google.maps.event;
    if (onClick)
      gme.addListener(marker, "click", onClick);
    if (onDrag)
      gme.addListener(marker, "drag", onDrag);
    if (onDragStart)
      gme.addListener(marker, "dragstart", onDragStart);
    if (onDragEnd)
      gme.addListener(marker, "dragend", onDragEnd);
    if ((onDrag || onDragStart || onDragEnd) && !draggable) {
      console.warn("You need to set the marker to draggable to listen to drag-events.");
    }
    const m = marker;
    return () => {
      gme.clearInstanceListeners(m);
    };
  }, [marker, draggable, onClick, onDragStart, onDrag, onDragEnd]);
  (0, import_react.useEffect)(() => {
    if (!marker)
      return;
    if (position !== void 0)
      marker.position = position;
    if (draggable !== void 0)
      marker.gmpDraggable = draggable;
    if (collisionBehavior !== void 0)
      marker.collisionBehavior = collisionBehavior;
    if (zIndex !== void 0)
      marker.zIndex = zIndex;
    if (typeof title === "string")
      marker.title = title;
  }, [marker, position, draggable, collisionBehavior, zIndex, title]);
  return [marker, contentContainer];
}
var AdvancedMarker = (0, import_react.forwardRef)((props, ref) => {
  const {
    children
  } = props;
  const [marker, contentContainer] = useAdvancedMarker(props);
  (0, import_react.useImperativeHandle)(ref, () => marker, [marker]);
  if (!marker) {
    return null;
  }
  return import_react.default.createElement(AdvancedMarkerContext.Provider, {
    value: {
      marker
    }
  }, contentContainer !== null && (0, import_react_dom.createPortal)(children, contentContainer));
});
function useAdvancedMarkerRef() {
  const [marker, setMarker] = (0, import_react.useState)(null);
  const refCallback = (0, import_react.useCallback)((m) => {
    setMarker(m);
  }, []);
  return [refCallback, marker];
}
var _excluded$1 = ["children", "anchor", "onCloseClick"];
var InfoWindow = (props) => {
  var _useContext;
  const {
    children,
    anchor,
    onCloseClick
  } = props, infoWindowOptions = _objectWithoutPropertiesLoose(props, _excluded$1);
  const map = (_useContext = (0, import_react.useContext)(GoogleMapsContext)) == null ? void 0 : _useContext.map;
  const infoWindowRef = (0, import_react.useRef)(null);
  const [contentContainer, setContentContainer] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (!map)
      return;
    const newInfowindow = new google.maps.InfoWindow(infoWindowOptions);
    const el = document.createElement("div");
    newInfowindow.setContent(el);
    infoWindowRef.current = newInfowindow;
    setContentContainer(el);
    return () => {
      google.maps.event.clearInstanceListeners(newInfowindow);
      newInfowindow.close();
      el.remove();
      setContentContainer(null);
    };
  }, [map, children]);
  (0, import_react.useEffect)(() => {
    var _infoWindowRef$curren;
    (_infoWindowRef$curren = infoWindowRef.current) == null || _infoWindowRef$curren.setOptions(infoWindowOptions);
  }, [infoWindowOptions]);
  (0, import_react.useEffect)(() => {
    if (!infoWindowRef.current)
      return;
    let listener = null;
    if (onCloseClick) {
      listener = google.maps.event.addListener(infoWindowRef.current, "closeclick", onCloseClick);
    }
    return () => {
      if (listener)
        listener.remove();
    };
  }, [onCloseClick]);
  (0, import_react.useEffect)(() => {
    if (!contentContainer || !infoWindowRef.current || anchor === null)
      return;
    const openOptions = {
      map
    };
    if (anchor) {
      openOptions.anchor = anchor;
    }
    infoWindowRef.current.open(openOptions);
  }, [contentContainer, infoWindowRef, anchor, map]);
  return import_react.default.createElement(import_react.default.Fragment, null, contentContainer !== null && (0, import_react_dom.createPortal)(children, contentContainer));
};
var shownMessages = /* @__PURE__ */ new Set();
function logErrorOnce(...args) {
  const key = JSON.stringify(args);
  if (!shownMessages.has(key)) {
    shownMessages.add(key);
    console.error(...args);
  }
}
var useMap = (id = null) => {
  const ctx = (0, import_react.useContext)(APIProviderContext);
  const {
    map
  } = (0, import_react.useContext)(GoogleMapsContext) || {};
  if (ctx === null) {
    logErrorOnce("useMap(): failed to retrieve APIProviderContext. Make sure that the <APIProvider> component exists and that the component you are calling `useMap()` from is a sibling of the <APIProvider>.");
    return null;
  }
  const {
    mapInstances
  } = ctx;
  if (id !== null)
    return mapInstances[id] || null;
  if (map)
    return map;
  return mapInstances["default"] || null;
};
var ControlPosition = {
  TOP_LEFT: 1,
  TOP_CENTER: 2,
  TOP: 2,
  TOP_RIGHT: 3,
  LEFT_CENTER: 4,
  LEFT_TOP: 5,
  LEFT: 5,
  LEFT_BOTTOM: 6,
  RIGHT_TOP: 7,
  RIGHT: 7,
  RIGHT_CENTER: 8,
  RIGHT_BOTTOM: 9,
  BOTTOM_LEFT: 10,
  BOTTOM_CENTER: 11,
  BOTTOM: 11,
  BOTTOM_RIGHT: 12,
  CENTER: 13,
  BLOCK_START_INLINE_START: 14,
  BLOCK_START_INLINE_CENTER: 15,
  BLOCK_START_INLINE_END: 16,
  INLINE_START_BLOCK_CENTER: 17,
  INLINE_START_BLOCK_START: 18,
  INLINE_START_BLOCK_END: 19,
  INLINE_END_BLOCK_START: 20,
  INLINE_END_BLOCK_CENTER: 21,
  INLINE_END_BLOCK_END: 22,
  BLOCK_END_INLINE_START: 23,
  BLOCK_END_INLINE_CENTER: 24,
  BLOCK_END_INLINE_END: 25
};
var MapControl = ({
  children,
  position
}) => {
  const controlContainer = (0, import_react.useMemo)(() => document.createElement("div"), []);
  const map = useMap();
  (0, import_react.useEffect)(() => {
    if (!map)
      return;
    const controls = map.controls[position];
    controls.push(controlContainer);
    return () => {
      const index = controls.getArray().indexOf(controlContainer);
      controls.removeAt(index);
    };
  }, [controlContainer, map, position]);
  return (0, import_react_dom.createPortal)(children, controlContainer);
};
var _excluded = ["onClick", "onDrag", "onDragStart", "onDragEnd", "onMouseOver", "onMouseOut"];
function useMarker(props) {
  var _useContext;
  const [marker, setMarker] = (0, import_react.useState)(null);
  const map = (_useContext = (0, import_react.useContext)(GoogleMapsContext)) == null ? void 0 : _useContext.map;
  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut
  } = props, markerOptions = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    position,
    draggable
  } = markerOptions;
  (0, import_react.useEffect)(() => {
    if (!map) {
      if (map === void 0)
        console.error("<Marker> has to be inside a Map component.");
      return;
    }
    const newMarker = new google.maps.Marker(markerOptions);
    newMarker.setMap(map);
    setMarker(newMarker);
    return () => {
      newMarker.setMap(null);
      setMarker(null);
    };
  }, [map]);
  (0, import_react.useEffect)(() => {
    if (!marker)
      return;
    const m = marker;
    const gme = google.maps.event;
    if (onClick)
      gme.addListener(m, "click", onClick);
    if (onDrag)
      gme.addListener(m, "drag", onDrag);
    if (onDragStart)
      gme.addListener(m, "dragstart", onDragStart);
    if (onDragEnd)
      gme.addListener(m, "dragend", onDragEnd);
    if (onMouseOver)
      gme.addListener(m, "mouseover", onMouseOver);
    if (onMouseOut)
      gme.addListener(m, "mouseout", onMouseOut);
    marker.setDraggable(Boolean(draggable));
    return () => {
      gme.clearInstanceListeners(m);
    };
  }, [marker, draggable, onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut]);
  (0, import_react.useEffect)(() => {
    if (!marker)
      return;
    if (markerOptions)
      marker.setOptions(markerOptions);
  }, [marker, markerOptions]);
  (0, import_react.useEffect)(() => {
    if (draggable || !position || !marker)
      return;
    marker.setPosition(position);
  }, [draggable, position, marker]);
  return marker;
}
var Marker = (0, import_react.forwardRef)((props, ref) => {
  const marker = useMarker(props);
  (0, import_react.useImperativeHandle)(ref, () => marker, [marker]);
  return import_react.default.createElement(import_react.default.Fragment, null);
});
function useMarkerRef() {
  const [marker, setMarker] = (0, import_react.useState)(null);
  const refCallback = (0, import_react.useCallback)((m) => {
    setMarker(m);
  }, []);
  return [refCallback, marker];
}
var Pin = (props) => {
  var _useContext;
  const advancedMarker = (_useContext = (0, import_react.useContext)(AdvancedMarkerContext)) == null ? void 0 : _useContext.marker;
  const glyphContainer = (0, import_react.useMemo)(() => document.createElement("div"), []);
  (0, import_react.useEffect)(() => {
    if (!advancedMarker) {
      if (advancedMarker === void 0) {
        console.error("The <Pin> component can only be used inside <AdvancedMarker>.");
      }
      return;
    }
    if (props.glyph && props.children) {
      logErrorOnce("The <Pin> component only uses children to render the glyph if both the glyph property and children are present.");
    }
    if (import_react.Children.count(props.children) > 1) {
      logErrorOnce("Passing multiple children to the <Pin> component might lead to unexpected results.");
    }
    const pinViewOptions = _extends({}, props);
    const pinElement = new google.maps.marker.PinElement(pinViewOptions);
    if (props.children) {
      pinElement.glyph = glyphContainer;
    }
    advancedMarker.content = pinElement.element;
  }, [advancedMarker, glyphContainer, props]);
  return (0, import_react_dom.createPortal)(props.children, glyphContainer);
};
function assertNotNull(value, message = "assertion failed") {
  if (value === null || value === void 0) {
    throw Error(message);
  }
}
var useDirectionsRenderer = (mapId, renderOnMap, renderOptions) => {
  const map = useMap(mapId);
  const directionsRenderer = (0, import_react.useMemo)(
    () => {
      if (!map || !renderOnMap)
        return null;
      const renderer = new google.maps.DirectionsRenderer(renderOptions);
      renderer.setMap(map);
      return renderer;
    },
    // note: no dependency on renderOptions since those are handled in the
    // next effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, renderOnMap]
  );
  (0, import_react.useEffect)(
    () => {
      if (!directionsRenderer)
        return;
      directionsRenderer.setOptions(renderOptions || {});
    },
    // note: directionsRenderer dependency isn't needed since the
    // renderOptions will be set on initialization when creating the renderer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderOptions]
  );
  return directionsRenderer;
};
var useDirectionsService = (props = {}) => {
  const {
    mapId = null,
    renderOnMap,
    renderOptions
  } = props;
  const isApiLoaded = useApiIsLoaded();
  const directionsService = (0, import_react.useMemo)(() => {
    if (!isApiLoaded)
      return null;
    return new google.maps.DirectionsService();
  }, [isApiLoaded]);
  const directionsRenderer = useDirectionsRenderer(mapId, renderOnMap, renderOptions);
  const renderRoute = (0, import_react.useCallback)(async (request) => {
    assertNotNull(directionsService);
    assertNotNull(directionsRenderer);
    const result = await directionsService.route(request);
    directionsRenderer.setDirections(result);
    return result;
  }, [directionsService, directionsRenderer]);
  const setRenderedRouteIndex = (index) => {
    assertNotNull(directionsRenderer);
    directionsRenderer.setRouteIndex(index);
  };
  return {
    directionsService,
    directionsRenderer,
    renderRoute: directionsService && directionsRenderer ? renderRoute : null,
    setRenderedRouteIndex: directionsService && directionsRenderer ? setRenderedRouteIndex : null
  };
};
var useStreetViewPanorama = (props = {}) => {
  const {
    mapId,
    divElement,
    position,
    pov,
    zoom
  } = props;
  const googleMapsAPIIsLoaded = useApiIsLoaded();
  const map = useMap(mapId);
  const [streetViewPanorama, setStreetViewPanorama] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(
    () => {
      if (!googleMapsAPIIsLoaded)
        return;
      let pano = null;
      if (divElement) {
        pano = new google.maps.StreetViewPanorama(divElement);
      } else if (map) {
        pano = map.getStreetView();
      }
      setStreetViewPanorama(pano);
      if (!pano)
        return;
      if (pov)
        pano.setPov(pov);
      if (position)
        pano.setPosition(position);
      if (zoom || zoom === 0)
        pano.setZoom(zoom);
      return () => {
        setStreetViewPanorama(null);
        if (map)
          map.setStreetView(null);
      };
    },
    // fixme: implement extra hook to update FOV when props change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [googleMapsAPIIsLoaded, map, divElement]
  );
  return streetViewPanorama;
};
var mapLinear = (x, a1, a2, b1, b2) => b1 + (x - a1) * (b2 - b1) / (a2 - a1);
var getMapMaxTilt = (zoom) => {
  if (zoom <= 10) {
    return 30;
  }
  if (zoom >= 15.5) {
    return 67.5;
  }
  if (zoom <= 14) {
    return mapLinear(zoom, 10, 14, 30, 45);
  }
  return mapLinear(zoom, 14, 15.5, 45, 67.5);
};
var limitTiltRange = ({
  viewState
}) => {
  const pitch = viewState.pitch;
  const gmZoom = viewState.zoom + 1;
  const maxTilt = getMapMaxTilt(gmZoom);
  return _extends({}, viewState, {
    fovy: 25,
    pitch: Math.min(maxTilt, pitch)
  });
};
export {
  APIProvider,
  APIProviderContext,
  AdvancedMarker,
  AdvancedMarkerContext,
  ControlPosition,
  GoogleMapsContext,
  InfoWindow,
  Map,
  MapControl,
  Marker,
  Pin,
  isLatLngLiteral,
  latLngEquals,
  limitTiltRange,
  toLatLngLiteral,
  useAdvancedMarkerRef,
  useApiIsLoaded,
  useApiLoadingStatus,
  useDirectionsService,
  useMap,
  useMapsLibrary,
  useMarkerRef,
  useStreetViewPanorama
};
//# sourceMappingURL=@vis__gl_react-google-maps.js.map

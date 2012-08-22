(function(window) {
  var BrowserDetect = {init:function() {
    this.isFirefox = navigator.userAgent.indexOf("Firefox") > -1
  }};
  BrowserDetect.init();
  window.BrowserDetect = BrowserDetect
})(window);
(function(window) {
  var AbstractLoader = function() {
    this.init()
  };
  AbstractLoader.prototype = {};
  var p = AbstractLoader.prototype;
  p.loaded = false;
  p.onProgress = null;
  p.onLoadStart = null;
  p.onFileLoad = null;
  p.onComplete = null;
  p.onFileError = null;
  p.init = function() {
  };
  p._sendLoadStart = function(value) {
    if(this.onLoadStart) {
      this.onLoadStart(value)
    }
  };
  p._sendProgress = function(value) {
    if(this.onProgress) {
      this.onProgress(value)
    }
  };
  p._sendComplete = function() {
    if(this.onComplete) {
      this.onComplete(this)
    }
  };
  p._sendFileComplete = function(file) {
    if(this.onFileLoad) {
      this.onFileLoad(file)
    }
  };
  p._sendError = function(data) {
    if(this.onError) {
      this.onError(this)
    }
  };
  p.toString = function() {
    return"[PreloadJS AbstractLoader]"
  };
  window.AbstractLoader = AbstractLoader
})(window);
(function(window) {
  var PreloadJS = function(useXHR2) {
    this.initialize(useXHR2)
  };
  var p = PreloadJS.prototype = new AbstractLoader;
  var s = PreloadJS;
  s.IMAGE = "image";
  s.SOUND = "sound";
  s.JSON = "json";
  s.JAVASCRIPT = "javascript";
  s.CSS = "css";
  s.XML = "xml";
  s.TEXT = "text";
  s.TIMEOUT_TIME = 8E3;
  p.useXHR = true;
  p.async = false;
  p.stopOnError = false;
  p.maintainScriptOrder = true;
  p._maxLoads = 1;
  p.typeHandlers;
  p.extensionHandlers;
  p.next = null;
  p._currentLoads = null;
  p._loadQueue = null;
  p._loadedItemsById = null;
  p._loadedItemsBySrc = null;
  p._numItems = 0;
  p._targetProgress = 0;
  p._progressInterval = null;
  p._currentProgress = 0;
  p._totalPercentLoaded = null;
  p._scriptOrder = null;
  p._loadedScripts = null;
  p.TAG_LOAD_OGGS = true;
  p.initialize = function(useXHR) {
    this._totalPercentLoaded = 0;
    this._targetProgress = 0;
    this._numItems = 0;
    this._paused = false;
    this._currentLoads = [];
    this._loadQueue = [];
    this._scriptOrder = [];
    this._loadedScripts = [];
    this._loadedItemsById = {};
    this._loadedItemsBySrc = {};
    this.typeHandlers = {};
    this.extensionHandlers = {};
    this.useXHR = useXHR != false && window.XMLHttpRequest != null;
    this.determineCapabilities()
  };
  p.determineCapabilities = function() {
    var BD = BrowserDetect;
    if(BD == null) {
      return
    }
    this.TAG_LOAD_OGGS = BD.isFirefox;
    this.TAG_LOAD_OGGS = BD.isFirefox
  };
  s.isBinary = function(type) {
    switch(type) {
      case PreloadJS.IMAGE:
      ;
      case PreloadJS.SOUND:
        return true;
      default:
        return false
    }
  };
  p.installPlugin = function(plugin) {
    if(plugin == null || plugin.getPreloadHandlers == null) {
      return
    }
    var map = plugin.getPreloadHandlers();
    if(map.types != null) {
      for(var i = 0, l = map.types.length;i < l;i++) {
        this.typeHandlers[map.types[i]] = map.callback
      }
    }
    if(map.extensions != null) {
      for(i = 0, l = map.extensions.length;i < l;i++) {
        this.extensionHandlers[map.extensions[i]] = map.callback
      }
    }
  };
  p.setMaxLoads = function(value) {
    this._maxLoads = value;
    if(!this._paused) {
      this._loadNext()
    }
  };
  p.loadFile = function(file, loadNow) {
    this._addItem(file);
    if(loadNow === undefined || loadNow == true) {
      this.setPaused(false)
    }
  };
  p.loadManifest = function(manifest, loadNow) {
    var data;
    if(manifest instanceof Array) {
      data = manifest
    }else {
      if(manifest instanceof Object) {
        data = [manifest]
      }
    }
    for(var i = 0, l = data.length;i < l;i++) {
      this._addItem(data[i])
    }
    if(loadNow != false) {
      this._loadNext()
    }
  };
  p.load = function() {
    this.setPaused(false)
  };
  p.getResult = function(value) {
    return this._loadedItemsById[value] || this._loadedItemsBySrc[value]
  };
  p.getProgress = function() {
    return this._currentProgress
  };
  p.setPaused = function(value) {
    this._paused = value;
    if(!this._paused) {
      this._loadNext()
    }
  };
  p.close = function() {
    while(this._currentLoads.length) {
      this._currentLoads.pop().cancel()
    }
    this._currentLoads = [];
    this._scriptOrder = [];
    this._loadedScripts = []
  };
  p._addItem = function(item) {
    var loadItem = this._createLoadItem(item);
    if(loadItem != null) {
      this._loadQueue.push(loadItem);
      this._numItems++;
      if(loadItem.getItem().type == PreloadJS.JAVASCRIPT) {
        this._scriptOrder.push(loadItem.getItem());
        this._loadedScripts.push(null)
      }
    }
  };
  p._loadNext = function() {
    if(this._paused) {
      return
    }
    while(this._loadQueue.length && this._currentLoads.length < this._maxLoads) {
      var loadItem = this._loadQueue.shift();
      loadItem.onProgress = PreloadJS.proxy(this._handleProgress, this);
      loadItem.onFileLoad = PreloadJS.proxy(this._handleFileComplete, this);
      loadItem.onComplete = PreloadJS.proxy(this._handleFileComplete, this);
      loadItem.onError = PreloadJS.proxy(this._handleFileError, this);
      this._currentLoads.push(loadItem);
      loadItem.load()
    }
  };
  p._handleFileError = function(loader) {
    var result = this._createResultData(loader.getItem());
    this._totalPercentLoaded += 1 / this._numItems;
    this._sendError(result);
    if(!this.stopOnError) {
      this._removeLoadItem(loader);
      this._loadNext()
    }
  };
  p._createResultData = function(item) {
    return{id:item.id, result:null, data:item.data, type:item.type, src:item.src}
  };
  p._handleFileComplete = function(loader) {
    this._totalPercentLoaded += 1 / this._numItems;
    var item = loader.getItem();
    this._removeLoadItem(loader);
    var resultData = this._createResultData(item);
    if(loader instanceof PreloadJS.lib.XHRLoader) {
      resultData.result = this._createResult(item, loader.getResult())
    }else {
      resultData.result = item.tag
    }
    this._loadedItemsById[item.id] = resultData;
    this._loadedItemsBySrc[item.src] = resultData;
    var _this = this;
    switch(item.type) {
      case PreloadJS.IMAGE:
        if(item instanceof PreloadJS.lib.XHRLoader) {
          resultData.result.onload = function(event) {
            _this._handleFileTagComplete(item, resultData)
          }
        }
        break;
      case PreloadJS.JAVASCRIPT:
        if(this.maintainScriptOrder) {
          this._loadedScripts[this._scriptOrder.indexOf(item)] = item;
          this._checkScriptLoadOrder();
          return
        }
        break
    }
    this._handleFileTagComplete(item, resultData)
  };
  p._checkScriptLoadOrder = function() {
    var l = this._loadedScripts.length;
    for(var i = 0;i < l;i++) {
      var order = this._loadedScripts[i];
      if(order === null) {
        break
      }
      if(order === true) {
        continue
      }
      var item = this.getResult(order.src);
      console.log("item: ", item);
      this._handleFileTagComplete(item, item.result);
      this._loadedScripts[i] = true;
      i--;
      l--
    }
  };
  p._handleFileTagComplete = function(item, resultData) {
    if(item.completeHandler) {
      item.completeHandler(resultData)
    }
    this._sendFileComplete(resultData);
    this._sendProgress(this._totalPercentLoaded);
    if(this._loadQueue.length == 0) {
      this._sendComplete();
      if(this.next && this.next.load) {
        this.next.load.apply(this.next)
      }
    }else {
      this._loadNext()
    }
  };
  p._removeLoadItem = function(loader) {
    var l = this._currentLoads.length;
    for(var i = 0;i < l;i++) {
      if(this._currentLoads[i] == loader) {
        this._currentLoads.splice(i, 1);
        break
      }
    }
  };
  p._createResult = function(item, data) {
    var tag = null;
    var resultData;
    switch(item.type) {
      case PreloadJS.IMAGE:
        tag = this._createImage();
        break;
      case PreloadJS.SOUND:
        tag = item.tag || this._createAudio();
        break;
      case PreloadJS.CSS:
        tag = this._createLink();
        break;
      case PreloadJS.JAVASCRIPT:
        tag = this._createScript();
        break;
      case PreloadJS.XML:
        if(window.DOMParser) {
          var parser = new DOMParser;
          data = parser.parseFromString(data, "text/xml")
        }else {
          var parser = new ActiveXObject("Microsoft.XMLDOM");
          parser.async = false;
          parser.loadXML(data);
          resultData = parser
        }
        break;
      case PreloadJS.JSON:
      ;
      case PreloadJS.TEXT:
        resultData = data
    }
    if(tag) {
      if(item.type == PreloadJS.CSS) {
        tag.href = item.src
      }else {
        tag.src = item.src
      }
      return tag
    }else {
      return resultData
    }
  };
  p._handleProgress = function(event) {
    var percentComplete = event.loaded / event.total;
    var currentItemLoad = percentComplete * (1 / this._numItems);
    this._sendProgress(currentItemLoad + this._totalPercentLoaded)
  };
  p._sendProgress = function(value) {
    if(value == this._targetProgress) {
      return
    }
    this._targetProgress = value;
    this._currentProgress = value;
    this._dispatchProgress();
    return
  };
  p._dispatchProgress = function() {
    if(this.onProgress) {
      this.onProgress(this._currentProgress)
    }
  };
  p._createLoadItem = function(loadItem) {
    var item = {};
    switch(typeof loadItem) {
      case "string":
        item.src = loadItem;
        break;
      case "object":
        if(loadItem instanceof HTMLAudioElement) {
          item.tag = loadItem;
          item.src = item.tag.src;
          item.type = PreloadJS.SOUND
        }else {
          item = loadItem
        }
        break;
      default:
        break
    }
    item.ext = this._getNameAfter(item.src, ".");
    if(!item.type) {
      item.type = this.getType(item.ext)
    }
    if(item.id == null || item.id == "") {
      item.id = this._getNameAfter(item.src, "/")
    }
    var customHandler = this.typeHandlers[item.type] || this.extensionHandlers[item.ext];
    if(customHandler) {
      var result = customHandler(item.src, item.type, item.id, item.data);
      if(result === false) {
        return null
      }else {
        if(result === true) {
        }else {
          if(result.src != null) {
            item.src = result.src
          }
          if(result.id != null) {
            item.id = result.id
          }
          if(result.tag != null && result.tag.load instanceof Function) {
            item.tag = result.tag
          }
        }
      }
      item.ext = this._getNameAfter(item.src, ".")
    }
    var useXHR2 = this.useXHR;
    switch(item.type) {
      case PreloadJS.JSON:
      ;
      case PreloadJS.XML:
      ;
      case PreloadJS.TEXT:
        useXHR2 = true;
        break;
      case PreloadJS.SOUND:
        if(item.ext == "ogg" && PreloadJS.TAG_LOAD_OGGS) {
          useXHR2 = false
        }
        break
    }
    if(useXHR2) {
      return new PreloadJS.lib.XHRLoader(item)
    }else {
      if(!item.tag) {
        var tag;
        var srcAttr = "src";
        var useXHR = false;
        switch(item.type) {
          case PreloadJS.IMAGE:
            tag = this._createImage();
            break;
          case PreloadJS.SOUND:
            tag = this._createAudio();
            break;
          case PreloadJS.CSS:
            srcAttr = "href";
            useXHR = true;
            tag = this._createLink();
            break;
          case PreloadJS.JAVASCRIPT:
            useXHR = true;
            tag = this._createScript();
            break;
          default:
        }
        item.tag = tag;
        return new PreloadJS.lib.TagLoader(item, srcAttr, useXHR)
      }else {
        return new PreloadJS.lib.TagLoader(item)
      }
    }
  };
  p.getType = function(ext) {
    switch(ext) {
      case "jpeg":
      ;
      case "jpg":
      ;
      case "gif":
      ;
      case "png":
        return PreloadJS.IMAGE;
      case "ogg":
      ;
      case "mp3":
      ;
      case "wav":
        return PreloadJS.SOUND;
      case "json":
        return PreloadJS.JSON;
      case "xml":
        return PreloadJS.XML;
      case "css":
        return PreloadJS.CSS;
      case "js":
        return PreloadJS.JAVASCRIPT;
      default:
        return PreloadJS.TEXT
    }
  };
  p._getNameAfter = function(path, token) {
    var dotIndex = path.lastIndexOf(token);
    var lastPiece = path.substr(dotIndex + 1);
    var endIndex = lastPiece.lastIndexOf(/[\b|\?|\#|\s]/);
    return endIndex == -1 ? lastPiece : lastPiece.substr(0, endIndex)
  };
  p._createImage = function() {
    return document.createElement("img")
  };
  p._createAudio = function() {
    var tag = document.createElement("audio");
    tag.autoplay = false;
    tag.type = "audio/ogg";
    return tag
  };
  p._createScript = function() {
    var tag = document.createElement("script");
    tag.type = "text/javascript";
    return tag
  };
  p._createLink = function() {
    var tag = document.createElement("link");
    tag.type = "text/css";
    tag.rel = "stylesheet";
    return tag
  };
  p.toString = function() {
    return"[PreloadJS]"
  };
  s.proxy = function(method, scope) {
    return function(event) {
      return method.apply(scope, arguments)
    }
  };
  s.log = function() {
    if(console == null) {
      return
    }
  };
  PreloadJS.lib = {};
  window.PreloadJS = PreloadJS
})(window);
(function(window) {
  var TagLoader = function(item, srcAttr, useXHR) {
    this.init(item, srcAttr, useXHR)
  };
  var p = TagLoader.prototype = new AbstractLoader;
  p._item = null;
  p._srcAttr = null;
  p._loadTimeOutTimeout = null;
  p.tagCompleteProxy = null;
  p.init = function(item, srcAttr, useXHR) {
    this._item = item;
    this._srcAttr = srcAttr || "src";
    this._useXHR = useXHR == true;
    this.isAudio = item.tag instanceof HTMLAudioElement;
    this.tagCompleteProxy = PreloadJS.proxy(this._handleTagLoad, this)
  };
  p.getItem = function() {
    return this._item
  };
  p.cancel = function() {
    this._clean();
    this.getItem().src = null
  };
  p.load = function() {
    if(this._useXHR) {
      this.loadXHR()
    }else {
      this.loadTag()
    }
  };
  p.loadXHR = function() {
    var item = this.getItem();
    var xhr = new PreloadJS.lib.XHRLoader(item);
    xhr.onProgress = PreloadJS.proxy(this._handleProgress, this);
    xhr.onFileLoad = PreloadJS.proxy(this._handleXHRComplete, this);
    xhr.onComplete = PreloadJS.proxy(this._handleXHRComplete, this);
    xhr.onFileError = PreloadJS.proxy(this._handleLoadError, this);
    xhr.load()
  };
  p._handleXHRComplete = function(loader) {
    this._clean();
    var item = loader.getItem();
    var result = loader.getResult();
    item.onload = PreloadJS.proxy(this._handleXHRLoad, this);
    item.tag[this._srcAttr] = item.src
  };
  p._handleXHRLoad = function(event) {
    var tag = this.getItem();
    this._sendComplete()
  };
  p._handleLoadError = function(event) {
    this._clean();
    this._sendError(event)
  };
  p.loadTag = function() {
    var item = this.getItem();
    var tag = item.tag;
    clearTimeout(this._loadTimeOutTimeout);
    this._loadTimeOutTimeout = setTimeout(PreloadJS.proxy(this._handleLoadTimeOut, this), PreloadJS.TIMEOUT_TIME);
    if(this.isAudio) {
      tag.src = null;
      tag.preload = "auto";
      tag.setAttribute("data-temp", "true")
    }
    tag.onerror = PreloadJS.proxy(this._handleLoadError, this);
    tag.onprogress = PreloadJS.proxy(this._handleProgress, this);
    if(this.isAudio) {
      tag.onstalled = PreloadJS.proxy(this._handleStalled, this);
      tag.addEventListener("canplaythrough", this.tagCompleteProxy)
    }else {
      tag.onload = PreloadJS.proxy(this._handleTagLoad, this)
    }
    tag[this._srcAttr] = item.src;
    var isOgg = item.type == PreloadJS.SOUND && item.ext == "ogg" && BrowserDetect.isFirefox;
    if(tag.load != null && !isOgg) {
      tag.load()
    }
  };
  p._handleLoadTimeOut = function() {
    this._clean();
    this._sendError()
  };
  p._handleStalled = function() {
  };
  p._handleTagError = function(event) {
    this._clean();
    this._sendError()
  };
  p._handleTagLoad = function(event) {
    var tag = this.getItem().tag;
    clearTimeout(this._loadTimeOutTimeout);
    if(this.isAudio && tag.readyState !== 4) {
      return
    }
    if(this.loaded) {
      return
    }
    this.loaded = true;
    this._clean();
    this._sendComplete(this)
  };
  p._clean = function() {
    clearTimeout(this._loadTimeOutTimeout);
    var tag = this.getItem().tag;
    tag.onload = null;
    tag.removeEventListener("canplaythrough", this.tagCompleteProxy);
    tag.onstalled = null;
    tag.onprogress = null;
    tag.onerror = null
  };
  p._handleProgress = function(event) {
    clearTimeout(this._loadTimeOutTimeout);
    var progress = event;
    if(this.isAudio) {
      var item = this.getItem();
      if(item.buffered == null) {
        PreloadJS.log("No Buffer");
        return
      }
      progress = {loaded:item.buffered.length > 0 ? item.buffered.end(0) : 0, total:item.duration}
    }
    this._sendProgress(progress)
  };
  p.toString = function() {
    return"[PreloadJS TagLoader]"
  };
  window.PreloadJS.lib.TagLoader = TagLoader
})(window);
(function(window) {
  var XHRLoader = function(file) {
    this.init(file)
  };
  var p = XHRLoader.prototype = new AbstractLoader;
  p._wasLoaded = false;
  p._request = null;
  p._item = null;
  p._loadTimeOutTimeout = null;
  p._xhrLevel = null;
  p.init = function(item) {
    this._item = item;
    if(!this._createXHR(item)) {
      PreloadJS.log("Unable to create XHR instance")
    }
  };
  p.getItem = function() {
    return this._item
  };
  p.getResult = function() {
    try {
      if(this._request.responseXML) {
        return this._request.responseXML.xml
      }
    }catch(error) {
    }
    return this._request.response
  };
  p.cancel = function() {
    this._clean();
    this._request.abort()
  };
  p.load = function() {
    if(this._request == null) {
      PreloadJS.log("XHR unavailable");
      return
    }
    if(this._xhrLevel == 1) {
      this._loadTimeOutTimeout = setTimeout(PreloadJS.proxy(this.handleTimeout, this), PreloadJS.TIMEOUT_TIME)
    }
    this._request.onloadstart = PreloadJS.proxy(this.handleLoadStart, this);
    this._request.onprogress = PreloadJS.proxy(this.handleProgress, this);
    this._request.onabort = PreloadJS.proxy(this.handleAbort, this);
    this._request.onerror = PreloadJS.proxy(this.handleError, this);
    this._request.ontimeout = PreloadJS.proxy(this.handleTimeout, this);
    this._request.onload = PreloadJS.proxy(this.handleLoad, this);
    this._request.onreadystatechange = PreloadJS.proxy(this.handleReadyStateChange, this);
    this._request.send()
  };
  p.handleProgress = function(event) {
    this._sendProgress(event)
  };
  p.handleLoadStart = function() {
    clearTimeout(this._loadTimeOutTimeout);
    this._sendLoadStart()
  };
  p.handleAbort = function() {
    this._clean();
    this._sendError()
  };
  p.handleError = function() {
    this._clean();
    this._sendError()
  };
  p.handleReadyStateChange = function() {
    if(this._request.readyState == 4) {
      this.handleLoad()
    }
  };
  p.handleLoad = function(event) {
    if(this.loaded) {
      return
    }
    this.loaded = true;
    this._clean();
    this._sendFileComplete(this)
  };
  p.handleTimeout = function() {
    this._clean();
    this._sendError()
  };
  p.handleLoadEnd = function() {
    this._clean()
  };
  p._createXHR = function(item) {
    this._xhrLevel = 1;
    if(window.ArrayBuffer) {
      this._xhrLevel = 2
    }
    if(window.XMLHttpRequest) {
      this._request = new XMLHttpRequest
    }else {
      try {
        this._request = new ActiveXObject("MSXML2.XMLHTTP.3.0")
      }catch(ex) {
        return null
      }
    }
    if(item.type == PreloadJS.TEXT) {
      this._request.overrideMimeType("text/plain; charset=x-user-defined")
    }
    this._request.open("GET", item.src, true);
    if(PreloadJS.isBinary(item.type)) {
      this._request.responseType = "arraybuffer"
    }
  };
  p._clean = function() {
    clearTimeout(this._loadTimeOutTimeout);
    var req = this._request;
    req.onloadstart = null;
    req.onprogress = null;
    req.onabort = null;
    req.onerror = null;
    req.onload = null;
    req.ontimeout = null;
    req.onloadend = null;
    req.onreadystatechange = null;
    clearInterval(this._checkLoadInterval)
  };
  p.toString = function() {
    return"[PreloadJS XHRLoader]"
  };
  window.PreloadJS.lib.XHRLoader = XHRLoader
})(window);


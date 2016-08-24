if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

//Polyfill
Function.prototype.multiline = function () {
    var s = this.toString();

    var pi = s.indexOf('/*');
    var pf = s.indexOf('*/');

    return this.toString().slice(pi + 2, pf);
}

if (!String.prototype.replaceAll) {	
    String.prototype.replaceAll = function(find, replace) {
            var s = this;

            while (s.indexOf(find)>0)
                    s = s.replace(find, replace);

            return s;
    }
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
    };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

if (![].contains) {
  Object.defineProperty(Array.prototype, 'contains', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(searchElement/*, fromIndex*/) {
      if (this === undefined || this === null) {
        throw new TypeError('Cannot convert this value to object');
      }
      var O = Object(this);
      var len = parseInt(O.length) || 0;
      if (len === 0) { return false; }
      var n = parseInt(arguments[1]) || 0;
      if (n >= len) { return false; }
      var k;
      if (n >= 0) {
        k = n;
      } else {
        k = len + n;
        if (k < 0) k = 0;
      }
      while (k < len) {
        var currentElement = O[k];
        if (searchElement === currentElement ||
            searchElement !== searchElement && currentElement !== currentElement
        ) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
	
String.prototype.download = function (fileName) {
    var str = this;

    var link = document.createElement('a');
    link.download = fileName;
    link.href = 'data:text/plain;base64,' + utf8_to_b64(str);
    link.click();
}

String.prototype.left = function(n) {
    var str = this;

    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0,n);
}

String.prototype.right = function(n) {
    var str = this;
	
    if (n <= 0)
       return str.substring(0, str.length + n);
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

var h5 = function(resource) {
    var tpl = "/{APPNAME}/ADI_Programacao/ADI_Bin/html5/" + resource;                
    var src = tpl.replace("{APPNAME}", location.pathname.split("/")[1]);

    if (src.endsWith(".js"))             
            var tag = '<' + 'scr' + 'ipt src="' + src + '"><' + '/sc' + 'ript>';    
    else if (src.endsWith(".css"))
            var tag = '<' + 'link ' + 'rel="styl' + 'esheet" href="' + src + '"/>';

    document.write(tag);
}

h5("jquery-2.2.0.min.js");
h5("date.js");
h5("url.js");
h5("cookie.js");
h5("crypto.js");
h5("cabecalho.js");
h5("loading.js");

h5("jquery.maskedinput.min.js");
h5("jquery.tabletojson.js");
h5("datamask.js");
h5("contenteditable-onchange.js");
h5("pouchdb-5.2.0.min.js");

h5("jquery-ui-1.11.4.redmond/jquery-ui.js");
h5("jquery-ui-1.11.4.redmond/jquery-ui.min.css");
h5("jquery-ui-1.11.4.redmond/jquery-ui.structure.min.css");
h5("jquery-ui-1.11.4.redmond/jquery-ui.theme.min.css");

h5("data-tooltip.css");

h5("tooltipster/js/jquery.tooltipster.min.js");
h5("tooltipster/css/tooltipster.css");

h5("alertify/js/alertify.js");
h5("alertify/css/alertify.css");

h5("codemirror/lib/codemirror.js");
h5("codemirror/lib/codemirror.css");
h5("codemirror/mode/sql/sql.js");
//h5("codemirror/doc/docs.css");
h5("codemirror/addon/hint/show-hint.css");
h5("codemirror/addon/hint/show-hint.js");
h5("codemirror/addon/hint/sql-hint.js");

h5("funcoes.js");
h5("recalculo.js");
h5("html5-continue.js");

if (location.pathname == "/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/folha/cadastros/funcionarios/ferias/folFuncFerias_con.jsp")
	document.write('<script src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/html5/FOLT0315.js"></script>');


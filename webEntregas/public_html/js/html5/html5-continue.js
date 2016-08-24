document.addEventListener("DOMContentLoaded", function() {
    window.baseTeste = cookie.get("baseTeste")
    window.error = alert;

    if (! (alertify.alert) ) 
            console.error("alertify not loaded");

    if (typeof window.debug == "object")
            window.debug = window.debug.errors;

    if ( (window.debug) && (alertify.alert) ) {	
            window.alert = function(message) {
                    if ( (window.lastAlert) && (window.lastAlert != message) ) {
                            alertify.alert(message);
                    } else {
                            window.lastAlert = message;
                            alertify.alert(message);
                    }
            }

            window.error = function(message) {
                    if ( (window.lastError) && (window.lastError != message) ) {
                                    console.error(message);

                            if (window.debug)
                                    alertify.error(message);			

                    } else {
                            window.lastError = message;					
                            console.error(message);

                            if (window.debug)
                                    alertify.error(message);				
                    }
            }
    }
});

$(document).ajaxSend(function(event, request, settings) {
    if (settings.data)
	settings.data['rnd'] = Math.random()*9999999999999999999;
});

$(document).ajaxError(function( event, xhr, settings, error ) {
	if ( (xhr.responseJSON) && (xhr.responseJSON.error) && (xhr.responseJSON.error.message) ) {				
		console.error(xhr.responseJSON.error.message);
		
		if (! (window.ajaxerrors) )
			window.ajaxerrors = [];
		
		window.ajaxerrors.push(xhr.responseJSON);
		console.error("window.ajaxerrors for more details");
	} else {
		console.error(xhr.responseText);
	
		if ( (window.debug) ) {
			if (xhr.responseText.indexOf("<html") >= 0) {
				var wo = window.open();
				wo.document.body.innerHTML = xhr.responseText;
			}
		}
	}
});

jQuery.error = console.error;

(function() {
    var start = function () {
        var tas = document.getElementsByTagName("textarea");

        for (var i = 0; i < tas.length; i++) {
            var ta = tas[i];

            if (ta.getAttribute('data-wysiwyg') == 'sql') {
                    ta.wysiwyg = CodeMirror.fromTextArea(ta, {
                            mode: 'text/x-sql',
                            indentWithTabs: true,
                            smartIndent: true,
                            lineNumbers: true,
                            matchBrackets : true,
                            autofocus: true,
                    });

                    ta.wysiwyg.setSize(ta.style.width, ta.style.height);
            }
        }
    }

    if (window.jQuery)
        jQuery(document).ready(start);
    else 
        document.addEventListener("DOMContentLoaded", start);
})();

$(function() {
    window.version = CryptoJS.MD5(document.documentElement.outerHTML).toString();
    console.log("VERSION: " + window.version);
});

function insideframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

//document.title = window.version.left(3) + " - " + document.title;

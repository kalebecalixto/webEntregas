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
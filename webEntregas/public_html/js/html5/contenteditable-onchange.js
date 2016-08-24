(function() {
	window.contentEditableOnChange = function() {
		var tags = document.getElementsByTagName("*");
				
		for (var i=tags.length-1; i>=0; i--) {
			var tag = tags[i];
			
			var ce = tag.getAttribute("contenteditable");			
			if (ce == null) continue;
			
			var ch = tag.getAttribute("onchange");
			if (ch == null) continue;
			
			if (typeof(tags[i].onblur)!='function') {
				tags[i].onfocus = function() {
				  this.data_orig=this.innerHTML;
				};
				
				tags[i].onblur = function() {
					if (this.innerHTML != this.data_orig)
						this.onchange();
					
					delete this.data_orig;
				};
			}
		}
	}
	
	document.addEventListener("DOMContentLoaded", contentEditableOnChange);
})();

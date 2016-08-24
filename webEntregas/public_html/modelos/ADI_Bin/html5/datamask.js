if (jQuery) {	
	$(document).ready(function() {
		var elms = document.getElementsByTagName("input");
		
		for (var i = 0; i < elms.length; i++) {
			var elm = elms[i];
			
			if (elm.getAttribute("data-mask"))
				jQuery(elm).mask(elm.getAttribute("data-mask"))				
		}
	});
}
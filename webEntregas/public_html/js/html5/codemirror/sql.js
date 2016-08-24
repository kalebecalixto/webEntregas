(function() {
	Function.prototype.multiline = function () {
		var s = this.toString();

		var pi = s.indexOf('/*');
		var pf = s.indexOf('*/');

		return this.toString().slice(pi + 2, pf);
	}	
		
	var headTags = function() {/*
	<script src="/{APPNAME}/ADI_Programacao/ADI_Bin/html5/jquery-2.2.0.min.js"></script>
	<script src="/{APPNAME}/ADI_Programacao/ADI_Bin/html5/codemirror/lib/codemirror.js"></script>
	<link rel="stylesheet" href="/{APPNAME}/ADI_Programacao/ADI_Bin/html5/codemirror/lib/codemirror.css" />
	<script src="/{APPNAME}/ADI_Programacao/ADI_Bin/html5/codemirror/mode/sql/sql.js"></script>

	<link rel="stylesheet" href="/{APPNAME}/ADI_Programacao/ADI_Bin/html5/codemirror/doc/docs.css" />
	<link rel="stylesheet" href="/{APPNAME}/ADI_Programacao/ADI_Bin/html5/codemirror/addon/hint/show-hint.css" />
	<script src="/{APPNAME}/ADI_Programacao/ADI_Bin/html5/codemirror/addon/hint/show-hint.js"></script>
	<script src="/{APPNAME}/ADI_Programacao/ADI_Bin/html5/codemirror/addon/hint/sql-hint.js"></script>

	<style>
		.CodeMirror {
			border: 1px solid gray;
		}
	</style>
	
	<script src="/{APPNAME}/ADI_Programacao/ADI_Bin/html5/codemirror/sql-continue.js"></script>
	*/}.multiline();
	
	while(headTags.indexOf("{APPNAME}") > 0) 
		headTags = headTags.replace("{APPNAME}", location.pathname.split("/")[1]);
	
	document.write(headTags);
})();
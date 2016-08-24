<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/fechaBrowser.jsp */ %>
<html>
	<head>
		 <title> </title>
	</head>
	<body>
		<script>
			location.href="<%= String.valueOf( application.getInitParameter( "dirStartupPath" ) ) %>/index.jsp";
		</script>
	</body>
</html>

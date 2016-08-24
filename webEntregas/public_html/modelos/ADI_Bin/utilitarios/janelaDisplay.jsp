<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/janelaDisplay.jsp */ %>
<%
String conteudo = ""+request.getParameter("conteudo");
String titulo = ""+request.getParameter("titulo");
%>
<html>
	<head>
		<title><%=titulo%></title> 
	</head>
		<body>
		<br><br><br>
			<table border=0 width="100%" cellspacing="1" cellpadding="1" bgcolor="black">
				<tr>
				    <td bgColor="silver"><center><font size="2">Conteudo Completo da coluna : <b><%=titulo%></b></center></td>
				 </tr>
				 <tr>  
					<td bgColor="white">
					    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<%=conteudo%>
					</td>
				</tr>
			</table>
		</body>
</html>		 	

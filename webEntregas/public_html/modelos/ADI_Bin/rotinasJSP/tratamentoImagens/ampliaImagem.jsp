<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/tratamentoImagens/ampliaImagem.jsp */ %>
<%
/*
ADI Informatica
Descricao: rotina para ampliar a foto/logotipo da pessoa
Autor: lucas
Data criação: 06/11/2002
data ultima alteração: 26.02.2008 lucas hermano
Alteração Efetuada: Retirado a classe telas
*/
%>
<%
String caminho = ""+request.getParameter("caminho");
String tituloJanela = ""+request.getParameter("tituloJanela");
if(tituloJanela.equals("null"))
	tituloJanela = "ADI - Informática";
%>
<html>
<head>
	<title><%=tituloJanela%></title>
</head>	
<center>
<table cellpadding=0 border=0 width=100% height=100%>
<tr>
<td align="center">
<img src="<%=caminho%>" border=0 >
</td>
</tr>
</table>
</body>
</html>

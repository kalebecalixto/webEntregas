<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/exibeProcesso.jsp */ %>
<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/exibeProcesso.jsp */  %>
<%
/*
 * ADI Inform�tica Ltda.
 * Descri��o: Exibe uma anima��o e um texto indicando a a��o que est� sendo feita.
 * Autor: Diego R. Drumond
 * Data cria��o: 25.03.2004
 * Param�tros: titulo - T�tulo da janela.
 *             img    - Nome do arquivo .gif que ser� exibido. Formato 350x100.
 *             msg    - Mensagem explicativa que aparece abaixo da imagem.
 */
%>
<html>
 <head>
   <title><%= String.valueOf( request.getParameter( "titulo" ) ) %></title>
 </head>
<body topmargin="0" leftmargin="0">
  <table width="100%" height="100%">
    <tr>
      <td align="center"><img src="<%= application.getInitParameter( "imagensGenericasPath" ) %>/mensagens/<%= String.valueOf( request.getParameter( "img" ) ) %>"></td>
    </tr>
    <tr>
      <td align="center"><font size="1" face="Verdana"><b><%= String.valueOf( request.getParameter( "msg" ) ) %></b></font></td>
    </tr>
  </table>
</body>

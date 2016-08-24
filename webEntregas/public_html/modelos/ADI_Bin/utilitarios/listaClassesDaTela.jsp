<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/listaClassesDaTela.jsp */ %>
<jsp:useBean id="telas" scope="page" class="adi.componentes.util.telas.TelasDoSistema" />
<html>
 <head>
   <title>Lista das Classes de Todos os JSP's</title>
	<style type=text/css>
		a:link {color:#003399; text-decoration: none;}
		a:visited {color:#003399; text-decoration: none;}
		a:hover {color:red; text-decoration: underline;}
    </style>
 </head>
 <body>
 <basefont face="Verdana" size=1>
 <center>
 <table>
   <%
	request.getSession( true ).setAttribute( "codSis", "bas" );
	telas.setContext( application );
	telas.setSessao( session );
	telas.listaClasses( out );
   %>
 </table>
 </center>
 </body>
</html>

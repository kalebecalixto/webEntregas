<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/atualizaCadastroDeTelas.jsp */ %>
<jsp:useBean id="telas" scope="page" class="adi.componentes.util.telas.TelasDoSistema" />
<html>
 <head>
   <title>Atualização do Cadastro de Telas</title>
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
	request.getSession(true).setAttribute( "jdbcEmp",  application.getInitParameter( "jdbc_Emp"  + request.getSession(true).getAttribute("idEmpresa") ) + "" );
	request.getSession(true).setAttribute( "seqEmp",   application.getInitParameter( "seq_Emp"   + request.getSession(true).getAttribute("idEmpresa") ) + "" );
	request.getSession(true).setAttribute( "urlEmp",   application.getInitParameter( "url_Emp"   + request.getSession(true).getAttribute("idEmpresa") ) + "" );
	request.getSession(true).setAttribute( "userEmp",  application.getInitParameter( "user_Emp"  + request.getSession(true).getAttribute("idEmpresa") ) + "" );
	request.getSession(true).setAttribute( "senhaEmp", application.getInitParameter( "senha_Emp" + request.getSession(true).getAttribute("idEmpresa") ) + "" );
	telas.setContext( application );
	telas.setSessao( session );
	telas.cadastraTelas( (String)application.getInitParameter( "repXMLPath" )+"/criacaoDeXML/telas.xml", request, out );
   %>
 </table>
 </center>
 </body>
</html>

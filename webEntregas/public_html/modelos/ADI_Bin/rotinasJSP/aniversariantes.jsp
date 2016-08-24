<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/aniversariantes.jsp */ %>
<%
/*  $Revision: 1.9 $
    $Author: joaog $
    $Date: 2013/05/28 19:11:57 $ */
%>
<jsp:useBean id="vtSQL" scope="page" class="adi.componentes.sql.vetorSqlPlus" />
<jsp:useBean id="dt" scope="page" class="adi.componentes.data.datas" />
<html>
<head>
<title>SIGMA - Aniversariantes do dia!</title>
<%
if(String.valueOf(request.getParameter("naoMostrar")).equals("1"))
    session.setAttribute( "exibeAniver", "false" );
else
    session.removeAttribute( "exibeAniver" );

vtSQL.setSessao( session );
vtSQL.setContext( application );       
%>
<style type="text/css">
<!--
body,td,th {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 10px;
	color: #666666;
}
.style1 {color: #000000}
body {
	background-image:  url('<%= application.getInitParameter( "imagensGenericasPath" ) %>/imagensDeFundo/bolo.gif');
	background-repeat: no-repeat;
	background-position: bottom right;
	margin-left: 3px;
	margin-top: 3px;
	margin-right: 3px;
	margin-bottom: 3px;
}
a:link {
	color: #000000;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
	color: #000000;
}
a:hover {
	text-decoration: none;
	color: #FF0000;
}
a:active {
	text-decoration: none;
	color: #000000;
}
.style3 {color: #B3B3B3}
-->
</style>
<script>

function naoMostrar()
{
    loadIframe("IatualizaAniversariante", "aniversariantes.jsp?naoMostrar=" + (document.forms[0].chkExibir.checked ? "1" : "0"));
}

function loadIframe(iframeName, url)
{
    window.frames[iframeName].location = url;
}
</script>
</head>
<body>

<form name="frmAniver" method="post">
<%
if(String.valueOf(request.getParameter("naoMostrar")).equals("null")) {
%>
    <iframe type="hidden" src="" frameborder="0" id="IatualizaAniversariante" name="IatualizaAniversariante" scrolling="no" width="0" height="0"></iframe>
<%
}
%>   
    <table width="100%" height="100%" border="0" cellpadding="3" cellspacing="2" style="">
      <tr>
        <td background="<%= application.getInitParameter( "imagensGenericasPath" ) %>/imagensDeFundo/calendario.gif" style="border: 1px solid #ABABAB; background-repeat:no-repeat;" height="21" colspan="3" bgcolor="#F3F3F3"><div align="center"><span class="style1">Aniversariantes de hoje, <strong><%= dt.formataData( dt.dataSistema( ), "DD/MM/YYYY", "EXTENSO2" ) %></strong></span></div>    </td>
      </tr>
  <%
StringBuilder aniversariantes = new StringBuilder();
aniversariantes.append(" SELECT P.nomeRazaoSocial ");
aniversariantes.append(" FROM segUsuario U ");
aniversariantes.append(" INNER JOIN basPessoaFisica PF ON ");
aniversariantes.append(" PF.codPessoa = U.codPessoa ");
aniversariantes.append(" INNER JOIN basPessoas P ON ");
aniversariantes.append(" P.codPessoa = PF.codPessoa ");
aniversariantes.append(" WHERE P.statusExclusao = 0 ");
aniversariantes.append(" AND U.idExclusao = 0 ");
aniversariantes.append(" AND U.statusUsuario = 1 ");
aniversariantes.append(" AND P.dtNasFundacao LIKE '%-").append(dt.dataSistema("MM-DD")).append("' ");
aniversariantes.append(" AND U.seqInicializacao = 1 ");
aniversariantes.append(" GROUP BY P.nomeRazaoSocial ");
aniversariantes.append(" ORDER BY P.nomeRazaoSocial ");

    vtSQL.buscaRegistro(aniversariantes.toString(), request, 1);
  for( int i = 0; i < vtSQL.vt.size( ); i++ )
  {
  %>
  <tr>
    <td colspan="3" height="20" style="border: 1px solid #E3E3E3"><%= String.valueOf( vtSQL.vt.elementAt( i ) ) %></td>
  </tr>
  <%
  }
  %>
  <tr>
    <td height="99%" colspan="3">&nbsp;</td>
  </tr>
  <tr>
    <td width="1%" height="21" valign="middle">
        <div align="right">
            <input name="chkExibir" type="checkbox" style="width: 15px; height: 15px" value="checkbox" onchange="javascript:naoMostrar();"/>
        </div>
    </td>
    <td colspan="2" valign="middle">Não exibir esta mensagem novamente.</td>
  </tr>
</form>
</table>
</body>
</html>

    <% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/aniversariantes.jsp */ %>
<%
/*  $Revision: 1.9 $
    $Author: joaog $
    $Date: 2014/08/18 19:11:57 $ */
%>
<jsp:useBean id="vtSQL" scope="page" class="adi.componentes.sql.vetorSqlPlus" />
<jsp:useBean id="dt" scope="page" class="adi.componentes.data.datas" />
<jsp:useBean id="consulta" scope="page" class="adi.componentes.sql.Consulta" /><% consulta.setContext(application); consulta.setSessao(session); %>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" /><% xmlTelas.setContext(application); xmlTelas.setSessao(session); %>
<jsp:useBean id="query"    scope="page" class="adi.componentes.sql.query" /><% query.setContext(application); query.setSessao(session); %>
<html>
<head>
<title>Funcionários que farão ou têm mais de 70 anos</title>
<%
xmlTelas.codTela      = "FOLT1104";
if(String.valueOf(request.getParameter("naoMostrar")).equals("1"))
    session.setAttribute( "exibeServ", "false" );
else
    session.removeAttribute( "exibeServ" );

vtSQL.setSessao( session );
vtSQL.setContext( application );       
%>
<script>
function naoMostrar()
{
    loadIframe("IatualizaServidores70Anos", "servidores70Anos.jsp?naoMostrar=" + (document.forms[0].chkExibir.checked ? "1" : "0"));
}

function loadIframe(iframeName, url)
{
    window.frames[iframeName].location = url;
}

function redireciona(parametro)
{
    parent.top.opener.location.href = "<%=application.getInitParameter("folhaPath")%>/cadastros/funcionarios/folFuncionarios_ficha.jsp?matriculaFunc=" + parametro[3] + "&codPessoa=" + parametro[2] + "&seqFuncionario=" + parametro[4]+"&exibeVoltar=0";
}
</script>
</head>
<body>

<form name="frmAniver" method="post">
<table width="100%" border="0" cellpadding="3" cellspacing="2" style="">
<%
consulta.idUtilManut   = false;
consulta.imprimeFiltro = false;

if(String.valueOf(request.getParameter("naoMostrar")).equals("null")) 
{
%>
    <iframe type="hidden" src="" frameborder="0" id="IatualizaServidores70Anos" name="IatualizaServidores70Anos" scrolling="no" width="0" height="0"></iframe>
<%
}
%>   
<tr>
  <td background="<%= application.getInitParameter( "imagensGenericasPath" ) %>/imagensDeFundo/calendario.gif" style="border: 1px solid #ABABAB; background-repeat:no-repeat;" height="10" colspan="4" bgcolor="#F3F3F3"><div align="center"><span class="style1">Funcionários ativos com idade superior a 69 anos</span></div></td>
</tr>
<%
consulta.montaColunasTabela(xmlTelas.codTela,"fol");
consulta.imprimeCabConsulta( out, request, 5 );

String sql =    " SELECT "+
                " P.nomeRazaoSocial, "+
                " REPLACE(REPLACE(REPLACE(REPLACE(AGE(dtNasFundacao),'year', 'ano'),'mons', 'meses'), 'mon', 'mês'),'day','dia') as idade, "+
                " P.codpessoa, "+
                " F.matriculaFunc, "+
                " F.seqFuncionario "+
                " FROM basPessoas P "+
                " INNER JOIN basPessoaFisica PF ON "+
                " P.codPessoa = PF.codPessoa "+
                " INNER JOIN folfuncionarios F ON "+
                " PF.codPessoa = F.codPessoa "+
                " LEFT JOIN folfuncrescisaocontratual RES ON "+
                " RES.codpessoa = F.codpessoa "+
                " AND RES.codempresa = F.codempresa "+
                " AND RES.seqfuncionario = F.seqfuncionario "+
                " AND RES.idativo = 1 "+
                " AND RES.dtafastamento < current_date "+
                " INNER JOIN folTipoSituacFuncional TSF ON "+
                " TSF.seqTipoSitFuncional = F.seqTipoSitFuncional "+
                " INNER JOIN folRelacaoFuncional RF ON "+
                " RF.seqrelacaofuncional = F.seqrelacaofuncional "+
                " WHERE "+
                " P.dtNasFundacao IS NOT NULL "+
                " AND RF.idEfetivo = 1 "+
                " AND AGE(P.dtNasFundacao) > 69 "+
                " AND TSF.iddemissao = 0 "+
                " AND ( CASE WHEN F.dtvencimentocontrato IS NOT NULL THEN F.dtvencimentocontrato < CURRENT_DATE  ELSE 1 = 1 END ) "+
                " AND RES.seqfuncionario IS NULL "+
                " ORDER BY nomeRazaoSocial ";

consulta.montaDisplay(80,"nomeRazaoSocial^ ");
consulta.imprimeConsulta(false);
consulta.insereLink("redireciona", 0);
consulta.autoExecuta (true);
consulta.linhasPorPagina = 1000;
consulta.executa(request,out, sql);
%>
</table>
<table border="0">
<tr>
  <td width="1%" height="21" valign="middle">
    <input name="chkExibir" type="checkbox" style="width: 15px; height: 15px" value="checkbox" onchange="javascript:naoMostrar();"/>
  </td>  
  <td colspan="2" valign="middle"><font size="2">Não exibir esta mensagem novamente.</font></td>
</table>
</form>
</body>
</html>
<%= xmlTelas.fechaHtml() %>
<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/impressao/utiImpressora_man.jsp */ %>
<%
/*
ADI Informatica
Descricao:Atendimento Tecnico ao Cliente - Manutenção
Autor:Cleiton Ferreira
*/
%>
<jsp:useBean id="xsql" scope="page" class="adi.componentes.xml.xmlSQL" />
<jsp:useBean id="xman" scope="page" class="adi.componentes.xml.xmlManutencao" />
<jsp:useBean id="xvet" scope="page" class="adi.componentes.xml.vetorXml" />
<jsp:useBean id="criticas" scope="page" class="adi.componentes.xml.criticas" />
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<%
xmlTelas.botoesTela = "FAV";
xmlTelas.nomeTela= "Impressoras - Manutenção";
xmlTelas.siglaSistema = "util";
xmlTelas.codTela = "UTIT0010";
xmlTelas.versao = "01.000";
xmlTelas.nomeArquivo = "telItensMenuXml";
xmlTelas.tipoTela = "man";
xmlTelas.geraCabecalho(out,request,response);
%>
<%
  String porta = ""+request.getParameter("porta");
  String sql = " select descrImpressora, portaImpressora "+
        " from \\utilitario\\impressao\\impressoras.xml where portaImpressora = "+porta;
  xsql.sqlToXML(sql);
  xvet = xman.consulta(xsql);
%>
<form method="post" action="/adiNet/servlet/adi.componentes.xml.controleManutencaoExml_srv" name="frmInc">
<script language="JavaScript" src="/adiNet/scripts/estilo.js"></script>
<script language="JavaScript" src="/adiNet/scripts/auxScript.js"></script>
<script language="JavaScript" src="/adiNet/scripts/criticaCampos.js"></script>
<%@ include file="/ADI_Bin/tratamentoDeDados/criticaDeCampos.jsp"  %>
<% criticas.sistema = "util"; %>
<% criticas.geraCritica(out, "UTIT0010");%>
<input type=hidden name="xmlMan1" value="">
<input type=hidden name="xmlManArq1" value="\utilitario\impressao\impressoras.dtd">
<input type=hidden name="xmlManCampo1" value="portaImpressora">
<input type=hidden name="xmlManChave1" value="<%=porta%>">
<input type=hidden name="caminhoRetorno" value="/adiNet/utilitario/impressao/utiImpressora_con.jsp">
<table width="100%" border=0 cellspacing='0' cellpadding='0'>
<%
 xmlTelas.sistema = "util";
 xmlTelas.conteudo = xvet.vt;
 xmlTelas.geraTelas(out, "UTIT0010");
%>
</table>
<BR><br>
<% xmlTelas.geraRodape(out,"alterar", "submeteXML"); %>
</form>
<%= xmlTelas.fechaHtml() %>

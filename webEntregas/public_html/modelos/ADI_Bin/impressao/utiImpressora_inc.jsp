<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/impressao/utiImpressora_inc.jsp */ %>
<%/*
ADI Informatica
Descricao: Cadastro de Impressoras
Autor: Alexandre Ubaldo
*/%>
<jsp:useBean id="criticas" scope="page" class="adi.componentes.xml.criticas" />
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<%
xmlTelas.botoesTela = "FAVC";
xmlTelas.nomeTela= "Impressora - Inclusão";
xmlTelas.siglaSistema = "util";
xmlTelas.codTela = "UTIT0008";
xmlTelas.versao = "01.000";
xmlTelas.nomeArquivo = "utiImpressora";
xmlTelas.tipoTela = "inc";
xmlTelas.geraCabecalho(out,request,response);
%>
<%@ include file="/ADI_Bin/tratamentoDeDados/criticaDeCampos.jsp"  %>
<% criticas.sistema = "util"; %>
<% criticas.geraCritica(out, "UTIT0008"); %>
<form method="post" action="/adiNet/servlet/adi.componentes.xml.controleManutencaoExml_srv" name="frmInc">
<script language="JavaScript" src="/adiNet/scripts/estilo.js"></script>
<script language="JavaScript" src="/adiNet/scripts/auxScript.js"></script>
<script language="JavaScript" src="/adiNet/scripts/criticaCampos.js"></script>
<input type=hidden name="xmlinc1" value="\utilitario\impressao\impressoras.dtd">
<input type=hidden name="xmlarq1" value="\utilitario\impressao\impressoras.xml">
<input type=hidden name="caminhoRetorno" value="/adiNet/utilitario/impressao/utiImpressora_inc.jsp">
<!--
<input type=hidden name="xmlIncAutoInc1" value="seqItem">
-->
<table width="100%" border=0 cellspacing='0' cellpadding='0'>
<%
 xmlTelas.sistema = "util";
 xmlTelas.geraTelas(out, "UTIT0008");
%>
</table>
<BR><br>
<% xmlTelas.geraRodape(out,"incluir", "grava");%>
<script>
  function grava() {
    submeteXML("incluir");
  }
</script>
</form>
<%= xmlTelas.fechaHtml() %>

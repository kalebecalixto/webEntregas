<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/impressao/imprime.jsp */ %>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<%
response.setHeader("Cache-Control","no-cache");
response.setHeader("Pragma","no-cache");
%>
<%
xmlTelas.botoesTela = "FA";
String codTela = "UTIT0005";
xmlTelas.obtemDadosTela(codTela);
xmlTelas.nomeTela = "Impressão de Consulta";
xmlTelas.nomeArquivo = "impressao";
xmlTelas.tipoTela = "con";
xmlTelas.geraCabecalho(out,request,response);
%>
<%
  String arquivo = ""+request.getParameter("arquivo");
  String titulo = ""+request.getParameter("tituloConsulta");
  System.out.println("Arquivo: "+arquivo+" e "+!arquivo.equals("null"));
  String oculta = ""+ request.getParameter("oculta");
  if (!arquivo.equals("null")) {
%>
  <center>
  <BR>
  Para salvar o arquivo da consulta clique com o
  Salvar Como (ou Save as) e depois indique a
  pasta em que este arquivo será gravado.
  <BR><BR><BR>
  <form>
  <a href="<%=arquivo%>">Arquivo Consulta - <%=titulo%></a><BR><BR>
  <input type=button value="Fechar" name=fecha onclick='window.close()'>
   </form>
  <!--
<%
}
%>
<%
  String fechar = ""+request.getParameter("fechar");
  if (!fechar.equals("null")) {
  oculta = "S";
%>
  <center>
  <BR>
  Impressão concluida com sucesso.
  <BR><BR><BR>
  <form>
  <input type=button value="Fechar" name=fecha onclick='window.close()'>
  </form>
  <!--
<%
}
%>
<form method="post" action="/adiNet/servlet/adi.componentes.impressao.imprimeConsulta_srv" name="frmPrint">
<%@ page import = "java.util.Vector" %>
<%
      // -----------------------------------------------------------------------\
      // RECEBE DADOS E REPASSA
      //Recebe o sql da consulta para relatorio
      String sql = ""+request.getParameter("sqlRelatorio");
      out.write("<input type=hidden name='sqlRelatorio' value=\""+sql+"\">");
      out.write("\n");
      out.write("<input type=hidden name='tituloConsulta' value='"+titulo+"'>");
      //Recupera as colunas ocultas
        int y=0;
        while (request.getParameter("relColuna"+y)!=null) {
          String texto = ""+request.getParameter("relColuna"+y);
          System.out.println(" ## Recuperando Colunas Ocultas (JSP): "+texto);
          out.write("<input type=hidden name='relColuna"+y+"' value='"+texto+"'>");
          out.write("\n");
          y++;
        }
      // -----------------------------------------------------------------------/
%>
<%@ include file="listaImpressoras.jsp"  %>    
<% if (!oculta.equals("S")) {
out.write("passou  "  + oculta); 
%>
<input type="button" name="imprimir" value="Imprimir" onclick="imprime()">
<% } %>
<!--
<input type="button" name="visualiza" value="Visualizar Impressão">
<input type="button" name="cancela" value="Cancelar">
-->
<input type="hidden" name="larguraPagina" value="">
<input type="hidden" name="alturaPagina" value="">
<script>
function imprime() {
  //[]
  index  = document.frmPrint.papel.options.selectedIndex;
  eval(document.frmPrint.papel.options[index].value);
  document.frmPrint.alturaPagina.value = arrayPapel[0];
  document.frmPrint.larguraPagina.value = arrayPapel[1];
  document.frmPrint.submit();
}
</script>
</form>
<%=xmlTelas.fechaHtml()%>

<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/moveArquivos/enviaDiretorio.jsp */ %>
<%// A partir da escolha de um diret�rio, este programa transfere todos os arquivos deste diret�rio
  // para um outro diret�rio informado na p�gina jsp que o chamar.%>
%>
<jsp:useBean id="myJSPBrUpload" scope="session" class="adi.componentes.arquivos.upload" />
<%@ page import = "java.io.InputStream" %>
<%
// diretorio Destino
String diretorio1 =  application.getInitParameter("baseUploadPath")+"/empresa"+request.getSession(true).getAttribute("idEmpresa").toString();
  String diretorio = request.getParameter("diretorio");
  diretorio = diretorio1+""+diretorio;
  String nomeArquivo = request.getParameter("nomeArquivo");
  myJSPBrUpload.setTargetDir(diretorio);
  myJSPBrUpload.setNomeDestino(nomeArquivo);
  myJSPBrUpload.uploadFile (request.getInputStream());
%>
<%
  String caminhoRetorno = ""+request.getParameter("caminhoRetorno");
  if (!caminhoRetorno.equals("null")) {
%>
  <script>self.parent.location.href = "<%=caminhoRetorno%>"</script>
<%
}
%>

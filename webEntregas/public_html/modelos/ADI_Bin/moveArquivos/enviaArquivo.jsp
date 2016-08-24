<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/moveArquivos/enviaArquivo.jsp */ %>
<%
/*
A partir da escolha de um arquivo, este programa transfere o arquivo escolhido 
para um outro diretório informado na página jsp que o chamar.
Alterado por: Marcos
Data ultima alteração: 29/12/2005
Alteração Efetuada: Mudanca na variavel nomeArquivo, mudou de string pra StringBuilder
*/
%>
<jsp:useBean id="myJSPBrUpload" scope="session" class="adi.componentes.arquivos.upload" />
<%@ page import = "java.io.InputStream" %>
<% 
myJSPBrUpload.setTargetDir(diretorio);
myJSPBrUpload.setNomeDestino(nomeArquivo.toString());
myJSPBrUpload.uploadFile (request.getInputStream());
%>
<%
caminhoRetorno = ""+request.getParameter("caminhoRetorno");
if (!caminhoRetorno.equals("null"))
{
%>
  <script>self.location.href = "<%=caminhoRetorno%>"</script>
<%
}
%>

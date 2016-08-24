<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/desbloqueiaLogDeUsuario.jsp */ %>
<%
/*
ADI Informatica
Descricao: rotina para deleter os arquivos que travam os usuarios que deslogaram incorretamente
Autor: lucas
Data criação: 02/11/2002
data última alteração: 
Alteração Efetuada: 
*/
%>
<jsp:useBean id="arq" scope="page" class="adi.componentes.arquivos.learquivo" />
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<%
arq.setContext(application);
xmlTelas.setContext(application);
xmlTelas.setSessao(session);
xmlTelas.geraCabecalhoOculto(out,request,response);
String caminho = ""+application.getInitParameter("baseUploadPath")+"/empresa1/usuarios/";
arq.deletaArquivos(caminho);
%>
<center><BR><BR><BR>
<h3>DESBLOQUEANDO USUÁRIOS - FAVOR AGUARDAR</h3>
 <script>
       barraProgresso(1000, "fechaJanela()");
       function fechaJanela(){
       window.close();
       }
 </script>  

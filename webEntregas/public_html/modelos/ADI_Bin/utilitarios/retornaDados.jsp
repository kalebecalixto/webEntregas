<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/retornaDados.jsp */ %>
<%
/*
ADI Informatica
Descricao:  Rotina Para Passagem de codigo e descricao para Uma Combo-box
Autor:  
Data cria��o:  
Data ultima altera��o: 02/09/2002 - Jorge
Altera��o Efetuada:  Coloca�ao da rotina na nova estrutura com BIN
*/
%>
<jsp:useBean id="txt"    scope="page" class="adi.componentes.util.formata.textos" />
<%
String codigo = ""+request.getParameter("codigo");
String descricao = ""+request.getParameter("descricao");
descricao = txt.replace(descricao, "^virgula^", ", ");
descricao = txt.replace(descricao, "^OperadorIgualDade^", " = ");
descricao = txt.replace(descricao, "^'^", "''");
%>
<script>
      self.opener.enviar("<%= descricao %>", "<%= codigo %>");
      window.close();
</script>

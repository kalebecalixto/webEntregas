<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/tratamentoDeExcessoes/mensagemRetorno.jsp */ %>
<%
//Deve ser feito um include desta página em todas as páginas com retorno de inclusao/alteracao/exclusao
	String mensagem = "";
	if (request.getParameter("msg") != null) 
	{
		mensagem = (request.getParameter("msg"));
%>
        <script>
                var codigoRetorno = "<%=mensagem%>";
        </script>
<%
	}
%>

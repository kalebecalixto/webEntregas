<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/executaSql/binExecutaSql.jsp */ %>
/<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/executaSql/ */ %>
<%
/*
             Cabeçalho Da Telas
              Empresa: ADI Informática
            Descrição: Rotina que recebe os componentes da tela e executa os sqls dependendo da opcao(on - executar; off - não executa)
                Autor: lucas hermano
         Data criação: 13/11/2003
*/
%>
<jsp:useBean id="query"     scope="page" class="adi.componentes.sql.query" />
<%
query.setContext(application); 
query.setSessao(session);
String caminhoRetorno = request.getParameter("caminhoRetorno");
String sql   = "",
	   opcao = "";
for(int x=1;;x++)
{
	sql = ""+request.getParameter("sql"+x);
	if(sql.equals("null"))
		break;
	opcao = ""+request.getParameter("opcao"+x);
	if(opcao.equals("on"))
		query.executaSQL(sql);
}
response.sendRedirect(caminhoRetorno);
%>

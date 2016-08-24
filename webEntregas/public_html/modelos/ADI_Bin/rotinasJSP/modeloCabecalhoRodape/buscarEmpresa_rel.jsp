<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/modeloCabecalhoRodape/buscarEmpresa_rel.jsp */ %><%
// Pegar empresa
	String codigoDaEmpresa = ""+request.getSession(true).getAttribute("codEmpresa");
	String nomeDaEmpresa   = ""+request.getSession(true).getAttribute("nomeEmp");
	String sqlCodSis       = "select BP.nomeRazaoSocial from segEmpresa as SE, basPessoas as BP where SE.codPessoa = BP.codPessoa and BP.statusExclusao = 0 and SE.codEmpresa = "+codigoDaEmpresa+" ";
	String empresa         = nomeDaEmpresa.equals("")?""+query.retornaDescricao(sqlCodSis).trim():nomeDaEmpresa;
%>
<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/modeloCabecalhoRodape/cabecalhoComOrganiz_rel.jsp */ %><%!
String orgaoParte2 = "";
String orgaoParte1 = "";
%><%
/*
ADI Informatica
Descricao: Cabeзalho dos Relatуrios
Autor: Cleiton Ferreira
Data criaзгo: 18/06/2003
Data ultima alteraзгo: 10.07.2006 lucas hermano
Alteraзгo Efetuada: retirada a quebra de linha do arquivo que estava gerando erro na impressao dos relatorios
Instruзгo: contPage, linhaDivide, varColsRodCab, titulo e contLinha devem ter sido inicializados
*/
	if(defineSistema.equals("iss") || defineSistema.equals("iptu")){
		%><%@ include file="/ADI_Programacao/ADI_MaxNetADI/package/iss/relatorios/issBuscaOrgaoGerenciador.jsp"%><%
	}
	%><%@ include file="/ADI_Programacao/ADI_Bin/rotinasJSP/modeloCabecalhoRodape/buscarEmpresa_rel.jsp"%><%
	String sqlRedSis   = "select BP.nomeReduzCorresp from segEmpresa as SE, basPessoas as BP where SE.codPessoa = BP.codPessoa and BP.statusExclusao = 0 and SE.codEmpresa = "+codigoDaEmpresa+" ";
	String empresaRed = ""+query.retornaDescricao(sqlRedSis);
	document.add( datatable );
	int nrows2 = datatable.size( );
	//Limpa a tabela antes de iniciar a nova pagina.
	for( int d = 0; d < nrows2; d++ ) datatable.deleteRow( 0 );
	contPage++;
	contLinha=0;
	document.newPage();
	datatable.getDefaultCell( ).setColspan( varColsRodCab );
	datatable.getDefaultCell( ).setHorizontalAlignment( Element.ALIGN_CENTER );
	datatable.addCell( new Phrase( empresa, FontFactory.getFont( FontFactory.COURIER_BOLD, 11 ) ) );
	datatable.addCell( new Phrase( orgaoParte1, FontFactory.getFont( FontFactory.COURIER_BOLD, 11  ) ) );
	datatable.addCell( new Phrase( orgaoParte2, FontFactory.getFont( FontFactory.COURIER, 11 ) ) );
	datatable.addCell( new Phrase( "", FontFactory.getFont( FontFactory.COURIER, 11 ) ) );
	datatable.addCell( new Phrase( titulo, FontFactory.getFont( FontFactory.COURIER, 11 ) ) );
	datatable.getDefaultCell( ).setHorizontalAlignment( Element.ALIGN_CENTER );
	datatable.addCell( new Phrase( linhaDivide, FontFactory.getFont( FontFactory.COURIER, 11  ) ) );
%>
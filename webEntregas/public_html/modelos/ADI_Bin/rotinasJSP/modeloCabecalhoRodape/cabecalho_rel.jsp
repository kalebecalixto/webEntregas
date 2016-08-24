<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/modeloCabecalhoRodape/cabecalho_rel.jsp */ %><%
/*
ADI Informatica
Descricao: Cabeçalho dos Relatórios
Autor: Cleiton Ferreira
Data criação: 18/06/2003
Data ultima alteração: 17.10.2006 lucas hermano
Alteração Efetuada: retirando as quebras de linha do arquivo
Instrução:  linhaDivide: Linha tracejada
			varColsRodCab: número de Colunas do rodapé e cabeçalho
			contPage: Contador de páginas
			titulo: Tílulo do relatório
			contLinha: Contador de Linnhas
			sessão devem estar Funcionando
			data, text e hora devem estar instanciados
*/
	//Tamanho do cabeçalho 06 linhas no tamanho COURIER, 11
	// buscar Empresa
	%><%@ include file="/ADI_Programacao/ADI_Bin/rotinasJSP/modeloCabecalhoRodape/buscarEmpresa_rel.jsp"%><%
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
	datatable.addCell( new Phrase( "", FontFactory.getFont( FontFactory.COURIER, 11 ) ) );
	datatable.addCell( new Phrase( titulo, FontFactory.getFont( FontFactory.COURIER_BOLD, 11  ) ) );
	datatable.addCell( new Phrase( "", FontFactory.getFont( FontFactory.COURIER, 11 ) ) );
	datatable.addCell( new Phrase( " ", FontFactory.getFont( FontFactory.COURIER, 11 ) ) );
	datatable.getDefaultCell( ).setHorizontalAlignment( Element.ALIGN_CENTER );
	datatable.addCell( new Phrase( linhaDivide, FontFactory.getFont( FontFactory.COURIER, 11  ) ) );
%>
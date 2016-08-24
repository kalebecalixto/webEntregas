<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/modeloCabecalhoRodape/rodape_rel.jsp */ %><%
/*
ADI Informatica
Descricao: Rodapé dos Relatórios
Autor: Cleiton Ferreira
Data criação: 18/06/2003
Data ultima alteração: 17.10.2006 lucas hermano
Alteração Efetuada: retirando as quebras de linha do arquivo
Instrução:  linhaDivide: Linha tracejada
			varColsRodCab: número de Colunas do rodapé e cabeçalho
			sessão devem estar Funcionando
		    data, text e hora devem estar instanciados
	Variações:  crie contPage como int para ser contador de páginas sendo este modelo 1 original
				crie contPage como string para poder passar o texto a ser escrito na ponta direita
				sendo este o modelo 2
Include:
@include file="/ADI_Programacao/ADI_Bin/rotinasJSP/modeloCabecalhoRodape/rodape_rel.jsp"
*/
	//Tamanho do rodapé 02 linhas no tamanho COURIER, 11
	datatable.getDefaultCell( ).setColspan( varColsRodCab );
	String usser = ""+request.getSession(true).getAttribute("codUser");
	if(usser.length()<10) for(int k=10-usser.length(); k>0; k--) usser += " ";
	else usser = usser.substring(0,10)+"...";
	try{
	    Integer.parseInt( contPage+"" );
		datatable.getDefaultCell( ).setHorizontalAlignment( Element.ALIGN_CENTER );
		datatable.addCell( new Phrase( linhaDivide, FontFactory.getFont( FontFactory.COURIER, 11 ) ) );
		datatable.getDefaultCell( ).setHorizontalAlignment( Element.ALIGN_LEFT );
		datatable.addCell( new Phrase( "Usuário: "+usser+"     Data: "+data.dataSistema("DD/MM/YYYY")+" - "+hora.horaSistema()+"       Página(s): "+txt.formata(""+contPage,"casasNumericas","00000"), FontFactory.getFont( FontFactory.COURIER, 11 ) ) );
	}catch(Exception e){
		PdfPTable datatable101 = new PdfPTable(3);
		int headerwidths101[ ] = { 25,35,40 };
		datatable101.setWidths( headerwidths101 );
		datatable101.getDefaultCell( ).setBorderWidth(0);
		datatable.getDefaultCell( ).setPadding( 2 );
		datatable101.getDefaultCell( ).setHorizontalAlignment( Element.ALIGN_CENTER );
		datatable101.getDefaultCell( ).setVerticalAlignment( Element.ALIGN_LEFT );
		datatable101.addCell( new Phrase( "ADI - LTDA  (31)3274-0700", FontFactory.getFont( FontFactory.HELVETICA, 8 ) ) );
		datatable101.getDefaultCell( ).setHorizontalAlignment( Element.ALIGN_CENTER );
		datatable101.addCell( new Phrase( request.getSession(true).getAttribute("codUser")+"("+data.dataSistema("DD/MM/YYYY")+"  "+hora.horaSistema()+")", FontFactory.getFont( FontFactory.HELVETICA, 8 ) ) );
		datatable101.getDefaultCell( ).setHorizontalAlignment( Element.ALIGN_RIGHT );
		datatable101.addCell( new Phrase( contPage+"", FontFactory.getFont( FontFactory.HELVETICA, 8 ) ) );
		datatable.addCell(datatable101);
	}
%>
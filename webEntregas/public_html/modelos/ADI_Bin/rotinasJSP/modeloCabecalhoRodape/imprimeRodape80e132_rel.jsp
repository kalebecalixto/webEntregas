<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/modeloCabecalhoRodape/imprimeRodape80e132_rel.jsp */ %><%
/*
ADI Informatica
Descricao: Rodapé dos Relatórios 132
Autor: Alan Nunes Voiski
Data criação: 08/09/2003
Data ultima alteração: 10.07.2006 lucas hermano
Alteração Efetuada: retirada a quebra de linha do arquivo que estava gerando erro na impressao dos relatorios
*
Parametros: contPage- número da página;
			validaA4 - valida padrão 80, true para 80 ou false para 132;
*/
//DADOS RODAPE===========================>
  float h = document.top( ),// altura da pagina
		w = document.right( ),// largura da pagina
		l = document.left( ),// tamanho da borda lateral (esquerda ou direita)
		b = document.bottom( );// tamanho da borda (superior ou inferior)
  String usser = ""+request.getSession(true).getAttribute("codUser");
  if(usser.length()<20) for(int k=20-usser.length(); k>0; k--) usser += " ";
  else usser = usser.substring(0,20)+"...";
%><%!
//DADOS PARA FUNCAO RODAPE===========================>
adi.componentes.data.horas hora = new adi.componentes.data.horas();
adi.componentes.data.datas data = new adi.componentes.data.datas();
adi.componentes.util.formata.textos txt = new adi.componentes.util.formata.textos();
  PdfContentByte cb;
  BaseFont bf;
  float h,w,l,b;// tamanho da borda (superior ou inferior)
  String usser="";
//Função===========================================================================>  
	void imprimeRodape(int contPage,boolean validaA4){
		cb.setLineDash(4,2,0);// linha tracejada
		// Linha antes do RodaPé
		cb.moveTo(l,b+20);
		cb.lineTo(w,b+20);
		// Linha depois do RodaPé
		cb.moveTo(l,b);
		cb.lineTo(w,b);
		cb.stroke( );
	    cb.beginText();
	    cb.setFontAndSize(bf, 11);
	    if(validaA4){
		    usser=usser.trim();
		    if(usser.length()<10) for(int k=10-usser.length(); k>0; k--) usser += " ";
			else usser = usser.substring(0,10)+"...";
		    cb.showTextAligned(PdfContentByte.ALIGN_CENTER, "Usuário: "+usser+"        Data: "+data.dataSistema("DD/MM/YYYY")+" - "+hora.horaSistema()+"        Página(s): "+txt.formata(""+contPage,"casasNumericas","00000"), w-l-227, 42, 0);
	    }else cb.showTextAligned(PdfContentByte.ALIGN_CENTER, "Usuário: "+usser+"               Data: "+data.dataSistema("DD/MM/YYYY")+" - "+hora.horaSistema()+"                             Página(s): "+txt.formata(""+contPage,"casasNumericas","00000"), w-l-349, 42, 0);
	    cb.endText();
    }
    void atualizaValores(float a1,float a2,float a3,float a4,String novoUser,PdfContentByte cb2,BaseFont bf2){
	    h=a1;
	    w=a2;
	    l=a3;
	    b=a4;
	    usser=novoUser;
	    cb = cb2;
	    bf = bf2;
    }
	%><%atualizaValores(h,w,l,b,usser,wr.getDirectContent( ),BaseFont.createFont(BaseFont.COURIER, BaseFont.CP1252, BaseFont.NOT_EMBEDDED));%>
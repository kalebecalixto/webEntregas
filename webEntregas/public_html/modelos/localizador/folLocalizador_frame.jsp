<%@page import="adi.componentes.sql.DBConnection"%>
<%@page import="br.com.adi.maxnet.security.Restriction"%>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<%/*
 $Revision: 1.6 $
 $Author: kalebe $
 $Date: 2016/04/25 14:36:43 $
*/%>
<%

    String codTela = "FOLT1212";
    String siglaSistema = "fol";
    String nomeTela = "Localizador Estrutura Organizacional";
    String nomeArquivo = "localizador_frame.jsp";
    
    //String codPessoa = String.valueOf( request.getParameter( "codPessoa" ) );
    //String seqFuncionario = String.valueOf( request.getParameter( "seqFuncionario" ));
   
    String caminhoInf = "";
    
    String caminhoSup = application.getInitParameter("BinPath")+"/cabecalho.jsp?codTela="+codTela+"&siglaSistema="+siglaSistema+"&nomeTela="+nomeTela+"&nomeArquivo="+nomeArquivo;
    
    xmlTelas.setContext( application );
    xmlTelas.setSessao( session ); 
    xmlTelas.botoesTela = "";
    xmlTelas.codTela = codTela;
    xmlTelas.versao = "01.000";
    xmlTelas.siglaSistema = siglaSistema;
    xmlTelas.nomeTela = nomeTela;
    xmlTelas.nomeArquivo = nomeArquivo;
     
    xmlTelas.trataPermissao(out, request, response );
    
    
    caminhoInf = application.getInitParameter("folhaPath")+"/localizador/folLocalizador.html";
%>
<html>
	<head>
	  <title>Localizador Horus</title>
	</head>
	<frameset rows='80,*'>
	  <frame src="<%=caminhoSup%>" name="cabecalho" border=0 frameborder="0" scrolling="no" noresize marginwidth="5" marginheight="0">
	  <frame style="height:100%;  width: 100%; " src="<%=caminhoInf%>" name="conteudo"    border=0 frameborder="0" scrolling="no" noresize marginwidth="5" marginheight="0">
	</frameset>
</html>

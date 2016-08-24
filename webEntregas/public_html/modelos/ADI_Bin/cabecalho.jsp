<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/cabecalho.jsp */ %>
<%/*
    
$Rev::             $:
$Author::          $:
$Date::            $:
*/
%>
<jsp:useBean id="xmlTelas" scope="page" class="adi.componentes.xml.telas" />
<% 
    
    String codTela = String.valueOf( request.getParameter( "codTela" ) );
    String siglaSistema = String.valueOf( request.getParameter( "siglaSistema" ) );
    String nomeTela = String.valueOf( request.getParameter( "nomeTela" ) );
    String nomeArquivo = String.valueOf( request.getParameter( "nomeArquivo" ) );
    
    
    xmlTelas.setContext( application );
    xmlTelas.setSessao( session ); 
    xmlTelas.botoesTela = "";
    xmlTelas.codTela = codTela;
    xmlTelas.versao = "01.000";
    xmlTelas.siglaSistema = siglaSistema;
    xmlTelas.nomeTela = nomeTela;
    xmlTelas.nomeArquivo = nomeArquivo;
    xmlTelas.geraCabecalho( out, request, response );
%>

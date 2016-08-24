<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/manipulacaoArquivo/binGeraDownload.jsp */ %>
<%/*
ADI Inform�tica
Descricao: Abre caixa de dialogo de download para arquivo .txt e demais (para n�o abrir no browser)
Autor: Marcos Fabricio
Data Cria��o: 11/04/2006
Data ultima altera��o: 15.08.2006 Alan Voiski
Altera��o Efetuada: Copiado jsp presente no or�amento na exporta��o da Presta��o De Contas, devido utiliza��o deste em v�rios sistemas.
O outro ser� mantido tempor�riamente, at� que os jsps relacionados sejam arrumados para apontar a nova localiza��o do jsp.
*/%>
<%--
caminho do arquivo:
    application.getInitParameter("BinPath") + "/rotinasJSP/manipulacaoArquivo/binGeraDownload.jsp"
Parametros
    fileName = nome do arquivo juntamento com extens�o dele
    diretorio = caminho do arquivo a ser enviado
Exemplo de uso:

parte html:
<table><tr>
	<td width='8%'><center>
		<a href='<%= application.getInitParameter("BinPath") %>/rotinasJSP/manipulacaoArquivo/binGeraDownload.jsp?arquivo=nomeArquivo&diretorio=.../prestacaoDeContas/exportarDados/TCE-MG/SIACE-PCA/'>
		<img src="<%= application.getInitParameter("imagensGenericasPath") %>/botoes/download.gif" border=0 alt="Clique sobre o arquivo para fazer o download"></a></td>
</tr></table>
--%><%@page import="java.io.*;"%><%
   //orcGeraDownload.
        String fileName = request.getParameter( "arquivo" );
        String diretorio = request.getParameter( "diretorio" );
        InputStream entrada = new FileInputStream( diretorio.trim() + fileName.trim() );
        DataInputStream dataInput = new DataInputStream( entrada );
        
        response.setHeader( "Content-Disposition", "attachment;filename=" + fileName );
        
        OutputStream os = response.getOutputStream(  );
        byte auxByte;
        
        while( 1 == 1 )
        {
            auxByte = ( byte )entrada.read(  );
            
            if( auxByte == -1 )
                break;
            else
            {
                os.write( auxByte );
            }
        }   
        
        os.flush(  );
        os.close(  );
%><script>window.close();</script>
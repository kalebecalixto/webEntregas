<%@ page language="java" import="java.util.*" %>
<html>
    <head>
        <title>Salvar Dados em Disco</title>
        <link href="../sample.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
    <br>
        <table width="100%" border="0" cellspacing="0" bordercolor="#999999">
            <tr style="FONT-WEIGHT: bold; COLOR: #dddddd; BACKGROUND-COLOR: #999999">
                <td noWrap align="center">Texto Salvo com sucesso!&nbsp;&nbsp; <a href="c:\teste.html" target="_blank">Clique aqui</a> &nbsp;&nbsp; para abri-lo</td>
            </tr>
            <tr>
                <td height="100">&nbsp;</td>
            </tr>
            <tr>
                <td>
                    <%
                    String parameter = null ;
                    if( request.getParameter( "MaxNetEditor" ) != null )
                    {
                            java.io.File arq = new java.io.File( "c:\\teste.html" );

                            if( arq.exists(  ) )
                                arq.delete(  );
                            arq.createNewFile(  );

                            java.io.FileOutputStream arquivo = new java.io.FileOutputStream( arq );
                            arquivo.write( String.valueOf( request.getParameter( "MaxNetEditor" ) ).getBytes(  ) );
                            out.println( request.getParameter( "MaxNetEditor" ) );
                            arquivo.close(  );
                    }
                    %>
                </td>
            </tr>
        </table>
    </body>
</html>
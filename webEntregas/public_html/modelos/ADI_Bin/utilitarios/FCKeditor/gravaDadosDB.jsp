<%@ page language="java" import="java.util.*" %>
<%@page import ="java.sql.*, adi.componentes.sql.DBConnection, javax.sql.rowset.serial.SerialClob"%>
<%@page import ="javax.sql.rowset.serial.SerialException, java.util.*, java.sql.ResultSet"%>
                    <%

                    String auxClob;
                    // Segunda condição do If criada por causa do despacho do arquivo protocolo/movimentacao/enviar/proEnviarProcesso_inc.jsp
                    if( ( ( auxClob = request.getParameter( "MaxNetEditor" ) ) != null ) && !String.valueOf( request.getParameter( "apenasInsere" ) ).equals( "1" ) )
                    {
                        Connection conn = null;
                        PreparedStatement prep = null;
                        String tabela = null;
                        String where = null;
                        SerialClob clob = null;
                        DBConnection dbc = ( DBConnection )session.getAttribute( "datasource" );
                        String caminhoRetorno = request.getParameter( "caminhoRetorno" );

                        if( request.getParameter( "tabela" ) != null )
                            tabela = String.valueOf( request.getParameter( "tabela" ) );
                        else
                        {
                            session.setAttribute( "except0", new adi.componentes.util.erros.GeneralException( "O parametro tabela a ser usado no Update nao foi definido Corretamente" ) );
                            out.write( "<script>location.href=\"" + application.getInitParameter( "excessoesPath" ) + "/erro.jsp?redirect=2&exception=except0\";</script>" );
                            return;
                        } 
                        
                        if( request.getParameter( "where" ) != null )
                            where = String.valueOf( request.getParameter( "where" ) );
                        else
                        {
                            session.setAttribute( "except0", new adi.componentes.util.erros.GeneralException( "O parametro where a ser usado no Update nao foi definido Corretamente" ) );
                            out.write( "<script>location.href=\"" + application.getInitParameter( "excessoesPath" ) + "/erro.jsp?redirect=2&exception=except0\";</script>" );
                            return;
                        }
                                                
                        if( dbc == null )
                            return;
                            

                        StringBuilder sql = new StringBuilder(  );

                        try
                        {
                            conn = dbc.abreConexao( true );
                            sql.append( " UPDATE " ).append( tabela );
                            sql.append( " SET " );
                            sql.append( request.getParameter( "campo" ) );
                            sql.append( " = ? " );
                            sql.append( where );
                            
                            prep = dbc.preparaSQL( conn, String.valueOf( sql ) );
                            auxClob = auxClob.replaceAll("'", "''");
                          
                            try
                            {
                                prep.setClob( 1, new SerialClob( auxClob.toCharArray(  ) ) );
                            }
                            catch( SerialException SE )
                            {
                                prep.setString( 1, auxClob );
                            }

                            prep.executeUpdate(  );
                        }
                        catch( Exception ex )
                        {
                            ex.printStackTrace(  );
                            session.setAttribute( "except0", new adi.componentes.util.erros.GeneralException( ex ) );
                            out.write( "<script>location.href=\"" + application.getInitParameter( "excessoesPath" ) + "/erro.jsp?redirect=2&exception=except0\";</script>" );
                            return;
                        }
                        finally
                        {
                            dbc.fechaPreparedStatement( prep );
                            dbc.fechaConexao( conn, true );
                        }
                    }
                    else
                    {
                        out.write( "<script>parent.opener.document.frmInc.valorEditorRetorno.value = '" + request.getParameter( "MaxNetEditor" ).replaceAll("\n", "").replaceAll("\r", "") + "'</script>" );
                    }
                    out.println( "<html>\n" );
                    out.println( "    <head>\n" );
                    out.println( "        <title>Salvar Dados em Disco</title>\n" );
                    out.println( "        <link href='../sample.css' rel='stylesheet' type='text/css' />\n" );
                    out.println( "    </head>\n" );
                    out.println( "    <body style='margin: 0;'> " );
                    out.println( "    <br>\n" );
                    out.println( " <div style='border:0px; overflow:auto; width:98%; height:98%; margin:0;'> ");
                    out.println( "        <table width='100%' height='100%' border='0' cellspacing='0'  marginwidth='0' marginheight='0' bordercolor='#999999'>\n" );
                    out.println( "            <tr style='FONT-WEIGHT: bold; COLOR: #dddddd; BACKGROUND-COLOR: #999999'>\n" );
                    out.println( "                <td noWrap align='center'>Texto Salvo com sucesso!&nbsp;&nbsp;</td>\n" );
                    out.println( "            </tr>\n" );
                    out.println( "            <tr>\n" );
                    out.println( "                <td height='100'>&nbsp;</td>\n" );
                    out.println( "            </tr>\n" );
                    out.println( "            <tr>\n" );
                    out.println( "                <td>\n" );

                    out.println(request.getParameter( "MaxNetEditor" ));
                    out.println( "<script> " );
                    out.println( "    cacheEditor = parent.opener.document.getElementById( 'cacheEditor" + request.getParameter( "campo" ) +"' ) " );
                    out.println( "    if( cacheEditor ){ " );
                    out.println( "        cacheEditor.value = '';} " );
                    out.println( "</script> " );
                    out.println( "                </td>\n" );
                    out.println( "            </tr>\n" );
                    out.println( "        </table>\n" );
                    out.println( " </div> ");
                    out.println( "    </body>\n" );
                    out.println( "</html>\n" );
                    %>
<%!
StringBuilder leClob( String tabela, String where, String campo, HttpSession session, JspWriter out, ServletContext application ) throws java.io.IOException, adi.componentes.util.erros.GeneralException
{
    //HttpSession session, HttpServletRequest request, JspWriter out, ServletContext application
    Connection conn = null;
    ResultSet rs = null;
    DBConnection dbc = ( DBConnection )session.getAttribute( "datasource" );
    StringBuilder retorno = new StringBuilder(  );

    if( tabela == null )
    {
        session.setAttribute( "except0", new adi.componentes.util.erros.GeneralException( "O parametro tabela a ser usado no Update nao foi definido Corretamente" ) );
        out.write( "<script>location.href=\"" + application.getInitParameter( "excessoesPath" ) + "/erro.jsp?redirect=2&exception=except0\";</script>" );
        return retorno;
    } 

    if( where == null )
    {
        session.setAttribute( "except0", new adi.componentes.util.erros.GeneralException( "O parametro where a ser usado no Update nao foi definido Corretamente" ) );
        out.write( "<script>location.href=\"" + application.getInitParameter( "excessoesPath" ) + "/erro.jsp?redirect=2&exception=except0\";</script>" );
        return retorno;
    }

    try
    {
        conn = dbc.abreConexao( true );
        retorno.append( " SELECT " ).append( campo );
        retorno.append( " FROM " ).append( tabela );
        retorno.append( where );

        rs = dbc.executaQuery( conn, String.valueOf( retorno ) );

        retorno.delete( 0, retorno.length(  ) );
        if( rs.next(  ) )
        {
            retorno.append( rs.getString( 1 ) );
        }
        System.out.println("RETORNO: " + retorno);
    }
    catch( Exception ex )
    {
        ex.printStackTrace(  );
        session.setAttribute( "except0", new adi.componentes.util.erros.GeneralException( ex ) );
        out.write( "<script>location.href=\"" + application.getInitParameter( "excessoesPath" ) + "/erro.jsp?redirect=2&exception=except0\";</script>" );
        return retorno;
    }
    finally
    {
        dbc.fechaResultSet( rs );
        dbc.fechaConexao( conn, true );
    }

    return retorno;
}
%>

<%!
String trocaVariaveis ( Connection conn, HttpServletRequest request) throws SQLException
{
    String texto = request.getParameter( "MaxNetEditor" );
    String[  ] variaveis = (request.getParameter("variaveis")).split("~");
    String[  ] sql = (request.getParameter("sqlDaObtencao")).split("~");
    
    ResultSet rs = null;

    for( int i = 0 ; i < sql.length; i++){
        try{
            rs = DBConnection.executaQueryEstatico( conn, sql[ i ] );
            if( rs.next(  ) ){
                
                String valorVariavel = rs.getString( i );
                texto = texto.replaceAll("\\$" + variaveis[i] + " ", valorVariavel + " ");
                texto = texto.replaceAll("\\$" + variaveis[i] + "\\:", valorVariavel + ":");
                texto = texto.replaceAll("\\$" + variaveis[i] + "\\;", valorVariavel + ";");
                texto = texto.replaceAll("\\$" + variaveis[i] + "\\,", valorVariavel + ",");
                texto = texto.replaceAll("\\$" + variaveis[i] + "\\!", valorVariavel + "!");
                texto = texto.replaceAll("\\$" + variaveis[i] + "\\@", valorVariavel + "@");
                texto = texto.replaceAll("\\$" + variaveis[i] + "\\?", valorVariavel + "?");
            }
        }
        catch( SQLException ex2 ){
            ex2.printStackTrace(  );
            throw ex2;
        
        }finally{
            DBConnection.fechaResultSetEstatico( rs );
        }
    }
    return texto;
}
%>
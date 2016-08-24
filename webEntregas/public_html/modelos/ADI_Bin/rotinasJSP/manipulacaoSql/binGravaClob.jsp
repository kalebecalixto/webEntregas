<%@page import ="java.sql.*,java.util.*,java.io.*,adi.componentes.sql.*,javax.sql.rowset.serial.SerialClob
"%>
<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/manipulacaoSql/binGravaClob.jsp 
    Cabeçalho Da Telas
    Empresa: ADI Informática
    Descrição: procedimento de gravação de campo clob
    Autor: Marcos
    Data criação: 30/05/2007
    Data ultima alteração: 
    Alteração Efetuada: 
*/%>
<%@page import ="java.sql.*, adi.componentes.sql.DBConnection, javax.sql.rowset.serial.SerialClob"%>
<%@page import ="javax.sql.rowset.serial.SerialException, java.util.*"%>
<%
    boolean gravar = request.getParameter("gravar") != null ? true : false;

    if( gravar )
    {
        Connection conn = null;
        PreparedStatement prep = null;
        String tabela = null;
        String where = null;
        SerialClob clob = null;
        DBConnection dbc = ( DBConnection )session.getAttribute( "datasource" );
        String caminhoRetorno = String.valueOf( request.getParameter("caminhoRetorno") );

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

            for( Object parametro : request.getParameterMap(  ).keySet(  ) )
            {
                if( String.valueOf( parametro ).startsWith( "clob" ) )
                {
                    sql.append( String.valueOf( parametro ).substring( 4, String.valueOf( parametro ).length(  ) ) );
                    sql.append( " = ?, " );
                }
            }

            sql.delete( sql.length(  ) - 2, sql.length(  )  );
            sql.append( " "+ where );

            prep = dbc.preparaSQL( conn, String.valueOf( sql ) );

            int campos = 1;
            for( Object parametro : request.getParameterMap(  ).keySet(  ) )
            {
                if( String.valueOf( parametro ).startsWith( "clob" ) )
                {
                    try
                    {
                        String auxClob = String.valueOf( request.getParameter( String.valueOf( parametro ) ) );
                        prep.setClob( campos, new SerialClob( auxClob.toCharArray(  ) ) );
                    }
                    catch( SerialException SE )
                    {
                        prep.setString( campos, String.valueOf( request.getParameter( String.valueOf( parametro ) ) ) );
                    }
                    campos++;
                }
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
            response.sendRedirect( caminhoRetorno );
        }
    }
%>
<%!
    private StringBuilder leClob( String sql, HttpServletRequest req )
    {
        Connection conn = null;
        ResultSet rs = null;
        SerialClob clob = null;
        DBConnection dbc = ( DBConnection )req.getSession(  ).getAttribute( "datasource" );
        StringBuilder saida = new StringBuilder(  );

        if( dbc == null )
            return saida;

        try
        {
            conn = dbc.abreConexao( true );
            rs = dbc.executaQuery( conn, sql );
            if( rs.next(  ) )
            {
                if( rs.getObject( 1 ) instanceof Clob )
                    saida.append( rs.getClob( 1 ) != null ? rs.getClob( 1 ).getSubString( 1, ( ( int ) rs.getClob( 1 ).length(  ) ) ) : "" );
               else
                   saida.append( String.valueOf( rs.getObject( 1 ) != null ? rs.getObject( 1 ) : "" ) );
            }
        }
        catch( Exception ex )
        {
            ex.printStackTrace(  );
        }
        finally
        {
            dbc.fechaResultSet( rs );
            dbc.fechaConexao( conn, true );
            return saida;
        }
    }
%>
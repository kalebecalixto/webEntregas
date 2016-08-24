<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/folha/parametrosGerais/utilitarios/autoComp.jsp */
/*
    Assessoria e Desenvolvimento em Informática Ltda.
    Descrição: Monta sql/ajax para retornar o (autoCompletar)
    Autor: Marcos
    Data: 20/12/2007
    Data ultima alteração: 
    Alteração Efetuada: 
*/%><%@page import ="java.sql.*, adi.componentes.sql.DBConnection "%><%
    response.setContentType( "application/xml" );
    boolean executa = true;
    Connection conn = null;
    ResultSet rs = null;
    DBConnection dbc = ( DBConnection )session.getAttribute( "datasource" );
    StringBuilder retorno = new StringBuilder( 200 );

    String campo = request.getParameter( "campo" );
    String tabela = request.getParameter( "tabela" );
    String where = request.getParameter( "where" );

    out.write( "<?xml version='1.0' encoding='ISO-8859-1' ?>\n<root>\n" );

    if( campo == null )
    {
        out.write( "</root>\n" );
        return;
    }
    else if( tabela == null )
    {
        out.write( "</root>\n" );
        return;
    }
    else if( where == null )
    {
        out.write( "</root>\n" );
        return;
    }

    try
    {
        conn = dbc.abreConexao( true );
        retorno.append( " SELECT " ).append( campo );
        retorno.append( " FROM " ).append( tabela );
        retorno.append( " "+ where );

        rs = dbc.executaQuery( conn, String.valueOf( retorno ) );

        if( rs.next(  ) )
        {
            out.write( "<editor>\n" );
            out.write( "    <![CDATA[" );
            out.write( rs.getString( 1 ) );
            out.write( "]]> \n" );
            out.write( "</editor>\n" );
        }
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
        dbc.fechaResultSet( rs );
        dbc.fechaConexao( conn, true );
        out.write( "</root>\n" );
    }
%>
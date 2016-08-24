<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/manipulacaoSql/binManipulaConexao.jsp */ %>
<%/*
ADI Informatica
Descricao: Manipula��o com Conex�o
Autor: F�bio
Data cria��o: 08.08.2006
Data ultima altera��o: 27.04.2007 Alan
Altera��o Efetuada: transformado as fun��es que abrem a conex�o para boolean afim de ter permitir confirma��o de sucesso
    Acrescentado a fun��o que altera o tipo de transa��o da conex�o, com retorno de sucesso da troca.
*/
%><%-- include:
<%@ include file="/ADI_Programacao/ADI_Bin/rotinasJSP/manipulacaoSql/binManipulaConexao.jsp"  %>
--%><%!
private adi.componentes.sql.DBConnection dbc = null;
private java.sql.Connection con = null;//Conex�o
private java.sql.ResultSet rsAux = null,//Auxiliar
                      rs = null;//s
private java.sql.PreparedStatement pstmtAux = null;

/**
 * Op��es de Transaction, quanto mais alto, maior seguran�a, mais lento o processo, analise bem
    0: Libera leitura de dados n�o comitados
    1: Trava leituras de dados n�o comitados
    2: Trava leituras feitas, impedindo q outros o alterem
    3: Impede inclus�o de novos dados onde atenda a condi��o de uma das leituras
 **/
private boolean mudaTransacaoConexao( int opcao )throws java.lang.Exception
{
    int condicao=0;
    switch( opcao )
    {
        case 0: condicao=con.TRANSACTION_READ_UNCOMMITTED; break;
        case 1: condicao=con.TRANSACTION_READ_COMMITTED; break;
        case 2: condicao=con.TRANSACTION_REPEATABLE_READ; break;
        case 3: condicao=con.TRANSACTION_SERIALIZABLE; break;
    }
    //Transa��o n�o suportada
    if( con.getTransactionIsolation( ) == con.TRANSACTION_NONE || condicao==0  )
        return false;
    //Sucesso
    else 
    {
        con.setTransactionIsolation( condicao );
        return true;
    }
}
private boolean conAberto=false;
private boolean abreConexao( HttpServletRequest request, boolean autoCommit )throws java.lang.Exception
{
    if(con!=null)
        if(!con.isClosed())
        {
            conAberto=true;
            return true;
        }
    boolean sucesso=true;
    try
    {
       dbc = ( adi.componentes.sql.DBConnection )request.getSession().getAttribute( "datasource" );
       con = dbc.abreConexao( autoCommit );
       conAberto=true;
    }
    catch( Exception e )
    {
        e.printStackTrace();
        sucesso=false;
    }
    finally
    {
       return sucesso;
    }

}

private boolean abreConexao( HttpServletRequest request )throws java.lang.Exception
{
    return abreConexao( request, false );
}

private void fechaConexao( Object objeto )throws java.lang.Exception
{
   if( objeto instanceof java.sql.PreparedStatement )
       dbc.fechaPreparedStatement( (java.sql.PreparedStatement)objeto );

   if( objeto instanceof java.sql.ResultSet )
       dbc.fechaResultSet( (java.sql.ResultSet)objeto );

   if( objeto instanceof java.sql.Connection )
       dbc.fechaConexao( (java.sql.Connection)objeto, true );

}

private void fechaConexao( boolean comit )throws java.lang.Exception
{
   if( pstmtAux != null )
       dbc.fechaPreparedStatement( pstmtAux );
   if( rs != null )
       dbc.fechaResultSet( rs );
   if( rsAux != null )
       dbc.fechaResultSet( rsAux );
   if( con != null )
   {
       conAberto=false;
       dbc.fechaConexao( con, comit );
   }
}%>
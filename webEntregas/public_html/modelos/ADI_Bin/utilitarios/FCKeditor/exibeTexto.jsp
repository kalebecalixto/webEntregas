<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/FCKEditor/exibeTexto.jsp */
/*
    Assessoria e Desenvolvimento em Informática Ltda.
    Descrição: faz a troca de variaveis do texto
    Autor: Júnio
    Data: 04/07/2008
    Data ultima alteração: 18/03/2009 - Rafael C
    Alteração Efetuada: Refeito comparação com o naoImprimeLogo.
*/%>
<%@page import ="java.sql.*, adi.componentes.sql.DBConnection"%>
<%
    response.setContentType( "application/xml" );
    boolean executa = true;
    Connection conn = null;
    ResultSet rs = null;
    DBConnection dbc = ( DBConnection )session.getAttribute( "datasource" );

    StringBuilder retorno = new StringBuilder( 200 );
    response.setContentType( "text/html" );
    response.setHeader( "Cache-Control", "no-cache" );
    String[  ] parametros = String.valueOf( request.getParameter( "parametros" ) ).split( "\\^" );
    String campo = request.getParameter( "campo" );
    String tabela = request.getParameter( "tabela" );
    String where = request.getParameter( "where" );
    String codSistema = request.getParameter( "codSistema" );
    String naoImprimeLogo = String.valueOf( request.getParameter( "naoImprimeLogo" ) );
    
    String codEmpresa = parametros[9];
    
    
    if( campo == null )
        throw new Exception( "campo da busca deve ser informado" );
    if( tabela == null )
        throw new Exception( "tabela da busca deve ser informado" );
    if( where == null )
        throw new Exception( "where da busca deve ser informado" );
    try
    {
        conn = dbc.abreConexao( true );
        retorno.append(" SELECT logotipo, segEmpresa.codPessoa FROM basPessoas, segEmpresa WHERE segEmpresa.codEmpresa = ");
        retorno.append( session.getAttribute( "codEmpresa" ) ).append(" AND segEmpresa.codPessoa = basPessoas.codPessoa ");

        rs = dbc.executaQuery( conn, String.valueOf( retorno ) );
        String logotipo = "";

        if ( rs.next(  ) )
        {
            String codPessoa = String.valueOf(rs.getString(2));
            logotipo = application.getInitParameter( "baseUploadPath" ) + "/empresa" + session.getAttribute( "idEmpresa" ) + "/persona/pessoa" + codPessoa + "/" + rs.getString(1);
        }

        retorno.delete(0, retorno.length(  ) );
        retorno.append(" SELECT	P.nomeRazaoSocial FROM segempresa E ");
        retorno.append(" INNER JOIN baspessoajuridica PJ ON E.codpessoa = PJ.codpessoa ");
        retorno.append(" INNER JOIN basPessoas P ON P.codPessoa = PJ.codPessoa ");
        retorno.append(" WHERE E.codempresa = ").append(codEmpresa);

        rs = dbc.executaQuery( conn, String.valueOf( retorno ) );
        String nomeEmpresa = "";
        
         if ( rs.next(  ) )
        {
            nomeEmpresa = String.valueOf(rs.getString(1));
        }

        retorno.delete(0, retorno.length(  ) );
        retorno.append( " SELECT " ).append( campo );
        retorno.append( " FROM " ).append( tabela );
        retorno.append( " WHERE").append( where );
        rs = dbc.executaQuery( conn, String.valueOf( retorno ) );
        rs.next();
        String texto =  rs.getString(1);
        
        if (texto != null && !texto.equals("null")){
        
            texto = rs.getString(1);
            StringBuilder sqlPegaVariaveis = new StringBuilder();
            sqlPegaVariaveis.append("SELECT nomeVariavel, sqlDaObtencao " );
            sqlPegaVariaveis.append("FROM basVariavelDeEdicao VE INNER JOIN basVariavelDeEdicaoSistema VES ON VE.seqVariavel = VES.seqVariavel ");
            sqlPegaVariaveis.append("WHERE VES.codSistema = ").append(codSistema);
            sqlPegaVariaveis.append(" ORDER BY nomeVariavel");
            rs = dbc.executaQuery( conn, sqlPegaVariaveis.toString());
            rs.last(  );
            int registrosCount = rs.getRow(  );
            rs.beforeFirst(  );

            String[] variavel = new String[registrosCount];
            String[] sql = new String[registrosCount];

            for (int i = 0; rs.next(); i ++){
                variavel[i] = rs.getString(1);
                sql[i]      = rs.getString(2);
            }

            StringBuilder valorVariavel;
            //faz troca das variaveis pelos seus repectivos resultados da sql do campo sqlDaObtencao
            for( int i = 0 ; i < registrosCount; i ++){
                valorVariavel = new StringBuilder();

                if (texto.contains("$" + variavel[i])){
                    texto = texto.replaceAll("\\$" + variavel[i] , montaValorVariavel(conn, dbc, rs, sql[i], "", parametros));
                }
                if (texto.contains("$" + variavel[i] + " ")){
                    texto = texto.replaceAll("\\$" + variavel[i] + "\\ ", montaValorVariavel(conn, dbc, rs, sql[i], " ", parametros));
                }

                if (texto.contains("$" + variavel[i] + "\\:")){
                    texto = texto.replaceAll("\\$" + variavel[i] + "\\:", montaValorVariavel(conn, dbc, rs, sql[i], ":", parametros));
                }

                if (texto.contains("$" + variavel[i] + "\\;")){
                    texto = texto.replaceAll("\\$" + variavel[i] + "\\;", montaValorVariavel(conn, dbc, rs, sql[i], ";", parametros));
                }

                if (texto.contains("$" + variavel[i] + "\\,")){
                    texto = texto.replaceAll("\\$" + variavel[i] + "\\,", montaValorVariavel(conn, dbc, rs, sql[i], ",", parametros));
                }

                if (texto.contains("$" + variavel[i] + "\\!")){
                    texto = texto.replaceAll("\\$" + variavel[i] + "\\!", montaValorVariavel(conn, dbc, rs, sql[i], "!", parametros));
                }

                if (texto.contains("$" + variavel[i] + "\\@")){
                    texto = texto.replaceAll("\\$" + variavel[i] + "\\@", montaValorVariavel(conn, dbc, rs, sql[i], "@", parametros));
                }

                if (texto.contains("$" + variavel[i] + "\\?")){
                    texto = texto.replaceAll("\\$" + variavel[i] + "\\?", montaValorVariavel(conn, dbc, rs, sql[i], "?", parametros));
                }
             }
         }else{
            texto = "";
         }

        if ( !naoImprimeLogo.equals("1") ) 
        {
            out.println(" <table width = '100%'> <tr> <td width=115 height=115> ");
            if (!logotipo.equals("") ) 
            {
               out.println("<img src='"+logotipo+"' width=110 height=110>");
            }
            out.println(" </td> <td>");
            if (!nomeEmpresa.equals("") && ( !naoImprimeLogo.equals("1") ) )
            {
                out.println("<center><h2>"+nomeEmpresa+"</h2></center>");
            }
            out.println(" </td></tr></table> ");

            out.println("<hr width=100%/><br><br>");
        }

        out.println(texto);
        out.println("<br><br>");

        if ( !naoImprimeLogo.equals("1") )
            out.println("<form name='frm'><center><input title='Imprimir(ALT + I)' class='botoes' type='button' name='Imprimir' value=' Imprimir ' accesskey='i' onclick='javaScript:enviaImpressao()'></center></form>");   }
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
    }
%>

<%!
    public String montaValorVariavel (Connection conn, DBConnection dbc, ResultSet rs, String sql, String delimitador, String[  ] parametros ) throws Exception{
        StringBuilder valorVariavel = new StringBuilder();
        
        //troca as variaveis da sql pelos parametros passados da tela.
        if (sql.split("\\$").length > 1){
            for (int i = 0; i < parametros.length; i += 2){
                sql = sql.replaceAll( "\\" + parametros[ i ], parametros[ i+1 ] );
            }
        }
        
        rs = dbc.executaQuery(conn, sql);
        
        rs.last();
        int ultimaPosicao = rs.getRow();
        rs.beforeFirst();
        //troca as variaveis do texto pelo resultado da sqlDaObtencao
        while (rs.next()){

            if(rs.getRow() > 1){
                valorVariavel.append(", ");
            }

            valorVariavel.append(rs.getString(1));

            if(rs.getRow() == ultimaPosicao){
                valorVariavel.append(delimitador);
            }
        }

        return valorVariavel.toString();
    }

%>
<SCRIPT>
    function enviaImpressao(  )
    {
        document.frm.Imprimir.style.visibility = 'hidden';
        window.print();
        window.close();
    }
</SCRIPT>

<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/montagemSql/binBuscaFaixaDeValores.jsp */ %>
<%/*
                 ADI Informática
            Descricao: Monta cláusula "WHERE" do SQL contendo a lógica para pesquisa em faixa
                       de valores com várias chaves.
                Autor: Diego R. Drumond
         Data Criação: 02.08.2004
Data ultima alteração: -
   Alteração Efetuada: -
*/%><%!
String montaWhere( String[ ] campos, String[ ] ini, String[ ] fim )
{
	String where = "( ";
	int i, j;
	if( campos.length != ini.length || ini.length != fim.length )
		return "";
	where += "( ";
	for( i = ( campos.length - 1 ); i >= 0; i-- )
	{
		where += "( ";
		for( j = 0; j < i; j++ )
		{
			where += campos[ j ] + " = " + ini[ j ] + " AND ";
		}
		where += campos[ j ] +" > " + ini[ j ];
		where += " ) OR ";
	}
	where = where.substring( 0, where.length( ) - 4 ) + " ) AND ( ";
	//codigo foi duplicado para evitar uma chamada de método, ganhando performance.
	for( i = ( campos.length - 1 ); i >= 0; i-- )
	{
		where += "( ";
		for( j = 0; j < i; j++ )
		{
			where += campos[ j ] + " = " + fim[ j ] + " AND ";
		}
		where += campos[ j ] +" < " + fim[ j ];
		where += " ) OR ";
	}
	return where.substring( 0, where.length( ) - 4 ) + " ) )";
}
/*
 * Retorna array contendo a inscrição cadastral do imóvel.
 */
String[ ] retornaInscCadITPU( String inscricao )
{
	String[ ] insc = new String[ 5 ];
	insc[ 0 ] = inscricao.substring( 0, 2 );
	insc[ 1 ] = inscricao.substring( 3, 6 );
	insc[ 2 ] = inscricao.substring( 7, 11 );
	insc[ 3 ] = inscricao.substring( 12, 16 );
	insc[ 4 ] = inscricao.substring( 17, 21 );
	return insc;
}
%>

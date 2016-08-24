<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJSP/montagemSql/binBuscaEndereco.jsp */ %><%!
/*
ADI Informatica
Descricao: Busca Endere�o
Autor: Alan N Voiski
Data cria��o: 10/03/2003
Data ultima altera��o: 17/08/2007 - Marcos
Altera��o Efetuada: Voltando a versao anterior


//Include=================>
include file="/ADI_Programacao/ADI_Bin/rotinasJSP/montagemSql/binBuscaEndereco.jsp"
//Parametros==============>
sql = sql a ser relacionado
    PS:No 'select' ou no 'order by' onde ficam os componentes selecionados, coloque
    um "Nx" onde x � um n�mero relacionado aos dados a serem retornados...
    Coloque '%endereco' para que retorne todos campos...
tabelaRelacao    = tabela, ou alias da tabela caso a tenha, a ser relacionada com logradouro
//Retorno=================>
String sql montado relacionado
PS1: com opcional "%endereco"(veja acima) sql retornado todos os campos
PS2: com opcional "%2"(veja acima) sql retornado tamb�m com ordena��o padr�o
//Exemplo=================>
  //retornar sql montado
    sql="select %endereco from";
    sql=buscaEndereco(sql,"basEnderecosDaPessoa");
  //retornar formato endereco padr�o
    consulta.adicionaColunaFormatada(buscaEndereco("",""),4);
*/
String buscaEndereco(String sql, String tabelaRelacao) throws java.io.IOException
{
    return buscaEndereco2( sql, tabelaRelacao+".seqDoNucleoDoEndereco" );
}
String buscaEndereco2(String sql, String relacionamento) throws java.io.IOException{
    if(sql.equals("")) return "codTipoLograd codTitNobreza codPreposicao NucleoNomeLogradouro - numDoEndereco, codTipoComplEndereco, numeroDoTipoDoComplemento/ descrBairro";
    else{
            //Campos padr�es
        String[] camPad={"BEL.codLogradouro",//0
                        "BEN.seqDoNucleoDoEndereco",//1
                        "BEL.codTipoLograd",//2
                        "BEL.codTitNobreza",//3
                        "BEL.codPreposicao",//4
                        "BEL.NucleoNomeLogradouro",//5
                        "BEC.numDoEndereco",//6
                        "BEN.codTipoComplEndereco",//7
                        "BEN.numeroDoTipoDoComplemento",//8
                        "BEN.suplementoDoCompleEndereco",//9
                        "BEB.descrBairro",//10
                        "BEM.descrMunicipio",//11
                        "BEUF.codUf",//12
                        "BEUF.descricaoUF",//13
                        "BEP.descrPais",//14
                        "BEM.codMunicipio",//15
                        "BEC.cepCorreio",//16
                        "BEB.codBairroMunicipio"//17
                        };
        //Montagem sql - 1a parte - select
            if(sql.indexOf("%endereco") > 0)
                for(int x=0; x < (camPad.length - 1); x++) {
                    sql = sql.replaceAll("%endereco", camPad[x] + ",%endereco");
                }
            
            for(int x=camPad.length - 1; x > -1; x--) {
                sql = sql.replaceAll("N" + x, camPad[x]);
            }
            
            sql = sql.replaceAll(",%endereco"," ");
        //Montagem sql - 2a parte - from
            String sqlFrom= (relacionamento.length()==0?" basNucleoDoEndereco BEN ":" "+
                            "inner join basNucleoDoEndereco BEN on BEN.seqDoNucleoDoEndereco="+relacionamento+" ")+
                            
                            "inner join basCadastroDeEnderecos BEC on BEC.seqEndereco=BEN.seqEndereco "+
                            "inner join basLogradouros BEL on BEC.seqLogradouro=BEL.seqLogradouro "+
                            "inner join basBairro BEB on BEC.seqBairro=BEB.seqBairro "+
                            "inner join basMunicipio BEM on BEB.codMunicipio=BEM.codMunicipio "+


                            "inner join basUF BEUF on BEM.seqUF = BEUF.seqUF "+
                            "inner join basPais BEP on BEUF.codPais = BEP.codPais ";
        //Verificando exist�ncia do where para uso na montagem...
            int    auxVer =  adi.componentes.sql.consultas.buscaEstruturaSqlPrincipal(sql.toLowerCase(),"where");
            if(auxVer==-1)auxVer=adi.componentes.sql.consultas.buscaEstruturaSqlPrincipal(sql.toLowerCase(),"group by");//caso naum se ache o where
            if(auxVer==-1)auxVer=adi.componentes.sql.consultas.buscaEstruturaSqlPrincipal(sql.toLowerCase(),"order by");// caso naum se ache tb o group
            if(auxVer==-1)auxVer=sql.length();
        //Montagem sql - 3a parte - Juntando
        //Juntando sql com dados do 'from' montados anteriormente
            sql=sql.substring(0,auxVer)+sqlFrom+sql.substring(auxVer,sql.length());
        //retorno da fun��o
            return(sql);
    }
}
/*
   Descricao: Fun��o Auxiliar para buscaEndereco para ordena��o, ocultamento e formata��o das colunas
       Autor: Alan Nunes Voiski
Data cria��o: 15/07/2004
*
//Parametros==============>
caonsulta    =   classe adi.componentes.sql.consultas sendo usanda pela tela que estiver chamando
                esta fun��o
coluna101    =   para coluna onde ser� inserida coluna formatada
                PS:informe -1 para n�o utilizar esta op��o
//Retorno=================>
nenhum
o efeito ser� de ordena��o e ocultamento das colunas padr�o com opcional para insere coluna
*/
void buscaEnderecoConsulta(adi.componentes.sql.consultas consulta,int coluna101) throws java.io.IOException{
    consulta.ordenaColuna("NucleoNomeLogradouro");
    consulta.ordenaColuna("descrBairro");
    consulta.ordenaColuna("numDoEndereco");
    consulta.ordenaColuna("numeroDoTipoDoComplemento");
    consulta.ordenaColuna("codTipoLograd");
    consulta.ordenaColuna("codTipoComplEndereco");
    consulta.multiOrdena=true;
    consulta.escondeColuna("codLogradouro");
    consulta.escondeColuna("codTitNobreza");
    consulta.escondeColuna("codPreposicao");
    consulta.escondeColuna("codTipoLograd");
    consulta.escondeColuna("NucleoNomeLogradouro");
    consulta.escondeColuna("numDoEndereco");
    consulta.escondeColuna("codTipoComplEndereco");
    consulta.escondeColuna("numeroDoTipoDoComplemento");
    consulta.escondeColuna("descrBairro");
    if(coluna101>-1)consulta.adicionaColunaFormatada(buscaEndereco("",""), coluna101);
}
/*
                  ADI Informatica
            Descricao: Busca Endere�o
                Autor: Alan N Voiski
         Data cria��o: 10/03/2003
Data ultima altera��o:
   Altera��o Efetuada:
*
Parametros
consulta=classe consulta
sql= sql a ser montado
tabelaRelacao=tabela de relacao com endere�o(seqDoNucleoDoEndereco)
OBS:coloque ^ para esconder colunas
*/
%><%!
String buscaEndereco(adi.componentes.sql.consultas consulta, String sql, String tabelaRelacao) throws java.io.IOException
{
    if(sql.equals("")) return "a2 a3 - a4, a5, a6/ a7";
    else{
        boolean escondeCol=false;
        int colAdicao=-1;
        //Verificando mudan�a de linha padr�o
        String sqlParte1 =    " CE.codLogradouro,CE.a2,CE.a3,CE.a4,CE.a5,CE.a6,CE.a7";
        int linP=tabelaRelacao.indexOf("#");
        if(linP>0){
            sqlParte1=" "+tabelaRelacao.substring(linP+1,tabelaRelacao.indexOf("#",linP+1));
            tabelaRelacao=tabelaRelacao.substring(0,linP)+tabelaRelacao.substring(tabelaRelacao.indexOf("#",linP+1)+1,tabelaRelacao.length());
        }
        //Verificando Parametro de Adi��o Coluna Autom�tico
        if(tabelaRelacao.indexOf("^")>0){
            if((tabelaRelacao.indexOf("^")+1)<tabelaRelacao.length())
                colAdicao=Integer.parseInt(tabelaRelacao.substring(tabelaRelacao.indexOf("^")+1,tabelaRelacao.length()));
            tabelaRelacao=tabelaRelacao.substring(0,tabelaRelacao.indexOf("^"));
            escondeCol=true;
        }
        //Partes do sql do endereco
            //sqlParte1 - Olhar acima esta parte como linhas padrao
            String sqlParte2 =  "(select L.codLogradouro,"+
                                ""   +  "N.seqDoNucleoDoEndereco,"+
                                ""   +  "L.codTipoLograd as a2,"+
                                ""   +  "L.NucleoNomeLogradouro as a3,"+
                                ""   +  "C.numDoEndereco as a4,"+
                                ""   +  "N.codTipoComplEndereco as a5,"+
                                ""   +  "N.numeroDoTipoDoComplemento as a6,"+
                                ""   +  "B.descrBairro as a7,"+
                                ""   +  "descrMunicipio as a8,"+
                                ""   +  "descricaoUF as a9,"+
                                ""   +  "descrPais as a10, "+
                                ""   +  "codUf, "+
                                ""   +  "M.codMunicipio, "+
                                ""   +  "C.cepCorreio, "+
                                ""   +  "codPreposicao, "+
                                ""   +  "codTitNobreza, "+
                                ""   +  "suplementoDoCompleEndereco "+
                                "from basCadastroDeEnderecos C,"+
                                "" + "basNucleoDoEndereco N,"+
                                "" + "basLogradouros L,"+
                                "" + "basBairro B,"+
                                "" + "basMunicipio M,"+
                                "" + "basUF UF,"+
                                "" + "basPais P "+
                                "where C.seqLogradouro=L.seqLogradouro and "+
                                ""  + "C.seqEndereco=N.seqEndereco and "+
                                ""  + "C.seqBairro=B.seqBairro and "+
                                ""  + "B.codMunicipio=M.codMunicipio and "+
                                ""  + "M.seqUF = UF.seqUF and "+
                                ""  + "UF.codPais = P.codPais) CE,";
            String sqlParte3 =    "CE.seqDoNucleoDoEndereco="+tabelaRelacao+".seqDoNucleoDoEndereco ";
            String sqlParte4 =    " CE.a3,CE.a7,CE.a4,CE.a6,CE.a2,CE.a5";
        //concatenando sql com estrutura do endereco===============>
                        sql=sql.toLowerCase();
            if(sql.indexOf(" where ")>0){
                sqlParte3 = " and "+sqlParte3;
            }else{
                sqlParte3 = " where "+sqlParte3;
            }
        //colocando campos selecionados e relacionamento e ordena��o
            if(sql.indexOf(" order ")<sql.indexOf(" by ") && sql.indexOf(" order ")>0){//coloca campos selecionados apos os mandados com sql
                sql = sql.substring(0,sql.indexOf(" from"))+","+sqlParte1+sql.substring(sql.indexOf(" from"),sql.indexOf("order"))+//campos selecionados
                      sqlParte3+sql.substring(sql.indexOf("order"),sql.length())+","+sqlParte4;
            }else{//coloca campos selecionados antes dos mandados com sql
                sql = sql.substring(0,sql.indexOf("select")+6)+sqlParte1+","+//campos selecionados
                      sql.substring(sql.indexOf("select")+6,sql.length())+sqlParte3+"order by"+sqlParte4;//relacionamento/ordena��o
            }
        //colocando tabela sub-sql
            sql = sql.substring(0,sql.indexOf("from")+5)+sqlParte2+sql.substring(sql.indexOf("from")+5,sql.length());
        //Formata��o e ordena��o pela classe
            consulta.ordenaColuna("a3");
            consulta.ordenaColuna("a7");
            consulta.ordenaColuna("a4");
            consulta.ordenaColuna("a6");
            consulta.ordenaColuna("a2");
            consulta.ordenaColuna("a5");
            if(escondeCol){
                if(colAdicao>-1)
                    consulta.adicionaColunaFormatada("a2 a3 - a4, a5, a6/ a7",colAdicao);
                consulta.escondeColuna("codLogradouro");
                consulta.escondeColuna("a2");
                consulta.escondeColuna("a3");
                consulta.escondeColuna("a4");
                consulta.escondeColuna("a5");
                consulta.escondeColuna("a6");
                consulta.escondeColuna("a7");
            }
            consulta.multiOrdena=true;
        //retorno da fun��o
            return(sql);
    }
}
%>

<%!
String buscaEnderecoFormatado( String seqDoNucleoDoEndereco, HttpServletRequest request, ServletContext application) throws java.sql.SQLException,java.io.IOException
{
    adi.componentes.sql.vetorSqlPlus man = new adi.componentes.sql.vetorSqlPlus( );
    man.setContext(application);    
    man.setSessao( request.getSession(true));
    
    String sqlEndereco = " SELECT %endereco FROM basNucleoDoEndereco NEF WHERE NEF.seqDoNucleoDoEndereco = "+seqDoNucleoDoEndereco;
    sqlEndereco = buscaEndereco2( sqlEndereco, "NEF.seqDoNucleoDoEndereco" );
    
    man.buscaRegistro( sqlEndereco, request, 17 );
    
    if( man.vt.size() == 0 )
           return "Endere�o Inexistente";
    
    StringBuilder enderecoFormatado = new StringBuilder( "" );
    
    //01 - codTipoLograd
    enderecoFormatado.append( String.valueOf( man.vt.elementAt( 2 ) ) );
    enderecoFormatado.append( " " );
    
    //02 - codPreposicao
    if( !String.valueOf( man.vt.elementAt( 4 ) ).trim().equals( "" ) )
    {
        enderecoFormatado.append( String.valueOf( man.vt.elementAt( 5 ) ) );
        enderecoFormatado.append( " " );
    }
    
    //03 - codTitNobreza
    if( !String.valueOf( man.vt.elementAt( 3 ) ).trim().equals( "" ) )
    {
        enderecoFormatado.append( String.valueOf( man.vt.elementAt( 3 ) ) );
        enderecoFormatado.append( " " );
    }
    
    //04 - NucleoNomeLogradouro
    enderecoFormatado.append( String.valueOf( man.vt.elementAt( 5 ) ) );
    enderecoFormatado.append( ", " );
    
    //05 - numDoEndereco
    enderecoFormatado.append( "n� " );    
    enderecoFormatado.append( String.valueOf( man.vt.elementAt( 6 ) ) );
    enderecoFormatado.append( ", " );    
    
    //06 - codTipoComplEndereco
    if( !String.valueOf( man.vt.elementAt( 7 ) ).trim().equals( "" ) )
    {
        enderecoFormatado.append( String.valueOf( man.vt.elementAt( 7 ) ) );
        enderecoFormatado.append( " " );
    }
    
    //07 - numeroDoTipoDoComplemento
    if( !String.valueOf( man.vt.elementAt( 8 ) ).trim().equals( "" ) )
    {
        enderecoFormatado.append( String.valueOf( man.vt.elementAt( 8 ) ) );
        enderecoFormatado.append( " " );
    }
    
    //08 - suplementoDoCompleEndereco
    if( !String.valueOf( man.vt.elementAt( 9 ) ).trim().equals( "" ) )
    {
        enderecoFormatado.append( String.valueOf( man.vt.elementAt( 9 ) ) );
        enderecoFormatado.append( " " );
    }
    
    //09 - CEP
    enderecoFormatado.append( "- CEP.: " );
    enderecoFormatado.append( String.valueOf( man.vt.elementAt( 16 ) ) );
    enderecoFormatado.append( " " );
    
    //10 - descrBairro
    enderecoFormatado.append( String.valueOf( man.vt.elementAt( 10 ) ) );
    enderecoFormatado.append( " / " );
    
    //11 - descrMunicipio
    enderecoFormatado.append( String.valueOf( man.vt.elementAt( 11 ) ) );
    enderecoFormatado.append( " " );
    
    //12 - codUf
    enderecoFormatado.append( String.valueOf( man.vt.elementAt( 12 ) ) );
    enderecoFormatado.append( " - " );
    
    //13 - descrPais
    enderecoFormatado.append( String.valueOf( man.vt.elementAt( 14 ) ) );
    
    return String.valueOf( enderecoFormatado );
}
%>

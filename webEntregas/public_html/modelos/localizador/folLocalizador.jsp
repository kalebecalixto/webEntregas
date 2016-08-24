<%@page import="adi.sistemas.endereco.EnderecoFormat"%>
<jsp:useBean id="xmlTelas" scope="page"    class="adi.componentes.xml.telas" />
<%@page import="com.horus.sigma.geral.client.model.PermissaoTelaModel"%><%@page import="com.horus.sigma.geral.server.DAO.GeralServiceDAO"%><%@page import="adi.sistemas.folha.DotacaoCalcFunc"%><%@page import="java.sql.*"%><%@page import="java.io.*"%><%@page import="horus.html5.JspJson"%><%@page import="com.google.gson.*"%><%@page pageEncoding="UTF-8"%><%
    Connection con = null;
    
    
    String acao = request.getParameter("acao");   
    String chave = request.getParameter("chave");   
    String ordemNivel = request.getParameter("ordemNivel");   
    String codEstrut = request.getParameter("codEstrut");   
    
    //System.out.println(acao);
    
    String sqlComboNivel = "";
    
    sqlComboNivel += " select seqnivelestrut as seq, ordemdonivelestrut||' - '||descrnivelestrut as descr, ordemdonivelestrut as ordem  ";
    sqlComboNivel += " from basniveishierarestrutorganiz N ";
    sqlComboNivel += " inner join bashierarquiaestorganiz H ON ";
    sqlComboNivel += " H.seqhierarquia = N.seqhierarquia ";
    sqlComboNivel += " where N.idexclusao  = 0 "; 
    sqlComboNivel += " and H.iddesativado = 0; ";
    
    

    String sqlComboEstrutura = "";
    sqlComboEstrutura += " select seqestruturaorganiz as seq, codestruturaorganiz||' - '||descrestruturaorganiz as descr, codestruturaorganiz as cod from basestruturaorganiz ";
    sqlComboEstrutura += " where seqnivelestrut = "+chave;
    sqlComboEstrutura += " order by codestruturaorganiz ";

    
    try
    {
        if(acao.equals("carregarComboNivel"))
        {
            con = JspJson.AbreCon(session);    
            PreparedStatement psLNivel = con.prepareStatement(sqlComboNivel);
            
            //System.out.println(psLNivel.toString());
            ResultSet rsLNivel = psLNivel.executeQuery();
            

            String dadosListaNivelJson = adi.componentes.sql.QueryOutput.ToJson(rsLNivel);
            
            //System.out.println(dadosListaNivelJson);
            org.json.JSONObject jsonfinal = new org.json.JSONObject();
            jsonfinal.put("listaNivel", dadosListaNivelJson);
            

            
            rsLNivel.close();
            rsLNivel = null;
            psLNivel.close();
            psLNivel = null;
            
            JspJson.WriteJson(response, jsonfinal.toString());
            
        }
        else if(acao.equals("carregarComboEstrutura"))
        {
            con = JspJson.AbreCon(session);    
            PreparedStatement psLEstrut = con.prepareStatement(sqlComboEstrutura);
            
            //System.out.println(psLNivel.toString());
            ResultSet rsLEstrut = psLEstrut.executeQuery();
            

            String dadosListaEstrutJson = adi.componentes.sql.QueryOutput.ToJson(rsLEstrut);
            
            //System.out.println(dadosListaJson);
            org.json.JSONObject jsonfinal = new org.json.JSONObject();
            jsonfinal.put("listaEstrut", dadosListaEstrutJson);
            

            
            rsLEstrut.close();
            rsLEstrut = null;
            psLEstrut.close();
            psLEstrut = null;
            
            JspJson.WriteJson(response, jsonfinal.toString());
            
        }
        
        else if(acao.equals("buscarEnderecos"))
        {
            
            //System.out.println("teste");
            //System.out.println(Integer.parseInt(ordemNivel));
            //System.out.println(codEstrut);
            
            String codPesquisar = "";
            
            if(!codEstrut.equals("%."))
            {
                for(int i = 0; i < Integer.parseInt(ordemNivel); i++)
                {
                    codPesquisar += codEstrut.split("\\.")[i]+".";
                }
            }
            else
                codPesquisar += codEstrut;
                
            
            String sqlBuscaEndereco = " ";
            sqlBuscaEndereco += "\n select EO.seqestruturaorganiz, seqDoNucleoDoEndereco as seqnucleo, codestruturaorganiz, descrestruturaorganiz, ";

            sqlBuscaEndereco += "\n array_to_String( ";
            sqlBuscaEndereco += "\n    array( ";
            sqlBuscaEndereco += "\n       select '('||ddd||') '||numtelefone as tes  ";
            sqlBuscaEndereco += "\n       from bastelefonessetor  ";
            sqlBuscaEndereco += "\n       where seqestruturaorganiz = EO.seqestruturaorganiz  ";
            sqlBuscaEndereco += "\n    ), ' / ' ";
            sqlBuscaEndereco += "\n ) as telefone, ";
            sqlBuscaEndereco += "\n  ";
            sqlBuscaEndereco += "\n EO.email, ";
            sqlBuscaEndereco += "\n EO.homePage, ";
            sqlBuscaEndereco += "\n  ";
            sqlBuscaEndereco += "\n  ";
            sqlBuscaEndereco += "\n array_to_String( ";
            sqlBuscaEndereco += "\n    array( ";
            sqlBuscaEndereco += "\n       select codlocaldetrabalho||' - '||descrestruturafisica from follocaldetrabalho  ";
            sqlBuscaEndereco += "\n       where seqestruturaorganiz = EO.seqestruturaorganiz  ";
            sqlBuscaEndereco += "\n    ), ';' ";
            sqlBuscaEndereco += "\n ) as locais, ";
            sqlBuscaEndereco += "\n  ";
            sqlBuscaEndereco += "\n array_to_String( ";
            sqlBuscaEndereco += "\n    array( ";
            sqlBuscaEndereco += "\n  ";
            sqlBuscaEndereco += "\n 	select lpad(COUNT(F.matriculafunc), 5, '0')||' - '||RF.descrRelacaofuncional from folfuncionarios F ";
            sqlBuscaEndereco += "\n 	inner join folfunclocaldetrabalho FLT ON ";
            sqlBuscaEndereco += "\n 	F.j_seqfuncionario = FLT.seqfuncionario ";
            sqlBuscaEndereco += "\n 	and F.j_codpessoa = FLT.codpessoa ";
            sqlBuscaEndereco += "\n 	and F.i_i_codempresa = FLT.i_codempresa ";
            sqlBuscaEndereco += "\n 	and F.j_codempresa = FLT.codempresa ";
            sqlBuscaEndereco += "\n 	and F.dtinicio = FLT.dtinicio ";
            sqlBuscaEndereco += "\n 	and F.seqlocaldetrabalho = FLT.seqlocaldetrabalho ";
            sqlBuscaEndereco += "\n 	inner join follocaldetrabalho LT ON ";
            sqlBuscaEndereco += "\n 	LT.seqlocaldetrabalho = FLT.seqlocaldetrabalho ";
            sqlBuscaEndereco += "\n 	and LT.codempresa = FLT.i_codempresa ";
            sqlBuscaEndereco += "\n 	inner join folrelacaofuncional RF ON ";
            sqlBuscaEndereco += "\n 	RF.seqrelacaofuncional = F.seqrelacaofuncional ";
            sqlBuscaEndereco += "\n 	where  ";
            sqlBuscaEndereco += "\n 	--LT.seqestruturaorganiz = 1528 ";
            sqlBuscaEndereco += "\n 	LT.seqestruturaorganiz = EO.seqestruturaorganiz  ";
            sqlBuscaEndereco += "\n 	AND FLT.idativo = 1 ";
            sqlBuscaEndereco += "\n 	and FLT.dtfim is null ";
            sqlBuscaEndereco += "\n 	GROUP BY RF.descrRelacaofuncional ";
            sqlBuscaEndereco += "\n  ), ';' ";
            sqlBuscaEndereco += "\n ) as funcnolocal ";
            
            sqlBuscaEndereco += "\n from basestruturaorganiz EO ";
            sqlBuscaEndereco += "\n inner join basenderecodosetor ES ON ";
            sqlBuscaEndereco += "\n ES.seqestruturaorganiz = EO.seqestruturaorganiz ";
            
            sqlBuscaEndereco += "\n inner join basniveishierarestrutorganiz N ON ";
            sqlBuscaEndereco += "\n N.seqnivelestrut = EO.seqnivelestrut ";
            sqlBuscaEndereco += "\n inner join bashierarquiaestorganiz H ON  ";
            sqlBuscaEndereco += "\n H.seqhierarquia = N.seqhierarquia  ";
        
            sqlBuscaEndereco += "\n where ";
  
            sqlBuscaEndereco += "\n replace(EO.codestruturaorganiz,'.','') like  ";
            sqlBuscaEndereco += "\n ( ";
            sqlBuscaEndereco += "\n   SUBSTRING(replace(EO.codestruturaorganiz, '.',''), 1,  ";
            sqlBuscaEndereco += "\n  cast((  ";
            sqlBuscaEndereco += "\n    select   ";
            sqlBuscaEndereco += "\n  ";
            sqlBuscaEndereco += "\n    coalesce((    ";
            sqlBuscaEndereco += "\n       SELECT SUM(tamanhonivelestrut) FROM basniveishierarestrutorganiz   ";
            sqlBuscaEndereco += "\n       WHERE seqhierarquia = ( select seqhierarquia from bashierarquiaestorganiz where iddesativado = 0)  ";
            sqlBuscaEndereco += "\n       AND ordemdonivelestrut <= NH1.ordemdonivelestrut  ";
            sqlBuscaEndereco += "\n    ), 0)  ";
            sqlBuscaEndereco += "\n  ";
            sqlBuscaEndereco += "\n    from basniveishierarestrutorganiz NH1 where  ordemdonivelestrut = "+ordemNivel+" and seqhierarquia = H.seqhierarquia "; 
            sqlBuscaEndereco += "\n  ) as int)  ";
            sqlBuscaEndereco += "\n  ";
            sqlBuscaEndereco += "\n  ) ";
            sqlBuscaEndereco += "\n )||'%' ";
                    
            sqlBuscaEndereco += "\n and EO.codestruturaorganiz like '"+codPesquisar+"%' ";
            sqlBuscaEndereco += "\n and N.idexclusao  = 0 ";
            sqlBuscaEndereco += "\n and H.iddesativado = 0; ";
            

            con = JspJson.AbreCon(session);    
            PreparedStatement psEndeEstrut = con.prepareStatement(sqlBuscaEndereco);
            
            //System.out.println(psEndeEstrut.toString());
            ResultSet rsEndeEstrut = psEndeEstrut.executeQuery();
            
            
            
            //String dadosListaEstrutJson = adi.componentes.sql.QueryOutput.ToJson(rsEndeEstrut);
            
            //System.out.println(dadosListaEstrutJson);
            
            
            
            String Objetos = "\n[";
            
            while(rsEndeEstrut.next())
            {
                adi.sistemas.endereco.EnderecoFormat Endereco = new EnderecoFormat(rsEndeEstrut.getString("seqnucleo"), request );
                Objetos += "\n   {";
                
                Objetos += "\n       \"codEstrutura\": \""+rsEndeEstrut.getString("codestruturaorganiz")+"\",";
                Objetos += "\n       \"descrEstrutura\": \""+rsEndeEstrut.getString("descrestruturaorganiz")+"\",";
                Objetos += "\n       \"endereco\": \""+Endereco.getEnderecoFormatado("%TL %TN %CP %NN nº %NE - CEP.: %CC %DB / %DM %CU %DP")+"\",";
                
                Objetos += "\n       \"telefone\": \""+rsEndeEstrut.getString("telefone")+"\",";
                Objetos += "\n       \"email\": \""+rsEndeEstrut.getString("email")+"\",";
                Objetos += "\n       \"homepage\": \""+rsEndeEstrut.getString("homepage")+"\",";
                Objetos += "\n       \"locais\": \""+rsEndeEstrut.getString("locais")+"\",";
                Objetos += "\n       \"seqestruturaorganiz\": \""+rsEndeEstrut.getString("seqestruturaorganiz")+"\",";
                Objetos += "\n       \"funcnolocal\": \""+rsEndeEstrut.getString("funcnolocal")+"\"";
                
                
                Objetos += "\n   }";
                
                Objetos += (rsEndeEstrut.isLast() ? "" : "," );
                
                //System.out.println(rsEndeEstrut.getString("codestruturaorganiz"));
                //System.out.println(rsEndeEstrut.getString("descrestruturaorganiz"));
                //System.out.println(Endereco.getEnderecoFormatado("%TL %TN %CP %NN nº %NE - CEP.: %CC %DB / %DM %CU %DP"));
            }
            
            Objetos += "\n]";
            
            
            //System.out.println(Objetos);
            
            
            
            //System.out.println(dadosListaJson);
            org.json.JSONObject jsonfinal = new org.json.JSONObject();
            jsonfinal.put("listaEnderecoEstrut", Objetos);
            
            //System.out.println(jsonfinal.toString());
            
            rsEndeEstrut.close();
            rsEndeEstrut = null;
            psEndeEstrut.close();
            psEndeEstrut = null;
            
            JspJson.WriteJson(response, jsonfinal.toString());
            
        }
        
        
        
    }
    catch(Exception ex) {
        if (con != null)
            con.rollback();
        
        out.print(JspJson.buildErrors(ex));
    } finally {
        JspJson.FechaCon(session, con);
    }
    
    

%>
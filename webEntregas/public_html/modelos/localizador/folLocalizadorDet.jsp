<%@page import="adi.sistemas.endereco.EnderecoFormat"%>
<jsp:useBean id="xmlTelas" scope="page"    class="adi.componentes.xml.telas" />
<%@page import="com.horus.sigma.geral.client.model.PermissaoTelaModel"%><%@page import="com.horus.sigma.geral.server.DAO.GeralServiceDAO"%><%@page import="adi.sistemas.folha.DotacaoCalcFunc"%><%@page import="java.sql.*"%><%@page import="java.io.*"%><%@page import="horus.html5.JspJson"%><%@page import="com.google.gson.*"%><%@page pageEncoding="UTF-8"%><%
    Connection con = null;
    
    
    String acao = request.getParameter("acao");   
    String chave = request.getParameter("chave");   
    
    //System.out.println(acao);
    
    String sqlLocais = "";
    
    

    sqlLocais += " select   ";
    sqlLocais += " LT.seqlocaldetrabalho,   ";
    sqlLocais += " LT.codlocaldetrabalho,   ";
    sqlLocais += " LT.descrestruturafisica    ";
    sqlLocais += " from follocaldetrabalho LT  ";
    sqlLocais += " where   ";
    sqlLocais += " LT.idativo = 1  ";
    sqlLocais += " and LT.seqestruturaorganiz = "+chave;
    

    String sqlPainelAfastamento = "";
    
    sqlPainelAfastamento += " select  ";
    sqlPainelAfastamento += " descrrelacaofuncional,  ";
    sqlPainelAfastamento += " TA.descrtipoafastamento, ";
    sqlPainelAfastamento += " F.matriculafunc||' - '||P.nomerazaosocial as func ";
    sqlPainelAfastamento += " from follocaldetrabalho LT ";
    sqlPainelAfastamento += " inner join folfunclocaldetrabalho FLT ON ";
    sqlPainelAfastamento += " FLT.seqlocaldetrabalho = LT.seqlocaldetrabalho  ";
    sqlPainelAfastamento += " and FLT.i_codempresa = LT.codempresa ";
    sqlPainelAfastamento += " inner join folfuncionarios F ON ";
    sqlPainelAfastamento += " F.j_codempresa = FLT.codempresa ";
    sqlPainelAfastamento += " and F.j_codpessoa = FLT.codpessoa ";
    sqlPainelAfastamento += " and F.j_seqfuncionario = FLT.seqfuncionario ";
    sqlPainelAfastamento += " and F.i_i_codempresa = FLT.i_codempresa ";
    sqlPainelAfastamento += " and F.dtinicio = FLT.dtinicio ";
    sqlPainelAfastamento += " and F.seqlocaldetrabalho  = FLT.seqlocaldetrabalho ";
    sqlPainelAfastamento += " inner join folrelacaofuncional RF ON ";
    sqlPainelAfastamento += " RF.seqrelacaofuncional = F.seqrelacaofuncional ";
    sqlPainelAfastamento += " inner join folfuncafastadosdafolha AFA ON ";
    sqlPainelAfastamento += " AFA.seqfuncionario = F.seqfuncionario  ";
    sqlPainelAfastamento += " and AFA.codempresa = F.codempresa  ";
    sqlPainelAfastamento += " and AFA.codpessoa = F.codpessoa  ";
    sqlPainelAfastamento += " inner join foltipoafastamento TA ON ";
    sqlPainelAfastamento += " TA.codtipoafastamento = AFA.codtipoafastamento ";
    sqlPainelAfastamento += " inner join baspessoafisica PF ON ";
    sqlPainelAfastamento += " PF.codpessoa = F.codpessoa ";
    sqlPainelAfastamento += " inner join baspessoas P ON ";
    sqlPainelAfastamento += " P.codpessoa = PF.codpessoa ";
    sqlPainelAfastamento += " where LT.seqlocaldetrabalho = "+chave;
    sqlPainelAfastamento += " and current_date between dtafastamento and dtfinalafastamento ";
    sqlPainelAfastamento += " and AFA.idativo = 1 ";

    String sqlPainelFerias = "";
    

    sqlPainelFerias += " select ";
    sqlPainelFerias += " descrrelacaofuncional,  ";
    sqlPainelFerias += " TF.descrferias, ";
    sqlPainelFerias += " F.matriculafunc||' - '||P.nomerazaosocial  as func, ";
    sqlPainelFerias += " to_char(FG.dtiniciogozo, 'DD/MM/YYYY') as dtiniciogozo, ";
    sqlPainelFerias += " to_char(FG.dtfimgozo, 'DD/MM/YYYY') as dtfimgozo ";
    sqlPainelFerias += " from follocaldetrabalho LT ";
    sqlPainelFerias += " inner join folfunclocaldetrabalho FLT ON ";
    sqlPainelFerias += " FLT.seqlocaldetrabalho = LT.seqlocaldetrabalho  ";
    sqlPainelFerias += " and FLT.i_codempresa = LT.codempresa ";
    sqlPainelFerias += " inner join folfuncionarios F ON ";
    sqlPainelFerias += " F.j_codempresa = FLT.codempresa ";
    sqlPainelFerias += " and F.j_codpessoa = FLT.codpessoa ";
    sqlPainelFerias += " and F.j_seqfuncionario = FLT.seqfuncionario ";
    sqlPainelFerias += " and F.i_i_codempresa = FLT.i_codempresa ";
    sqlPainelFerias += " and F.dtinicio = FLT.dtinicio ";
    sqlPainelFerias += " and F.seqlocaldetrabalho  = FLT.seqlocaldetrabalho ";
    sqlPainelFerias += " inner join folrelacaofuncional RF ON ";
    sqlPainelFerias += " RF.seqrelacaofuncional = F.seqrelacaofuncional ";
    sqlPainelFerias += "  ";
    sqlPainelFerias += " inner join folfuncferiasfuncionario FER ON ";
    sqlPainelFerias += " FER.seqfuncionario = F.seqfuncionario  ";
    sqlPainelFerias += " and FER.codempresa = F.codempresa  ";
    sqlPainelFerias += " and FER.codpessoa = F.codpessoa  ";
    sqlPainelFerias += "  ";
    sqlPainelFerias += " inner join folfuncferiasctrdegozo FG ON ";
    sqlPainelFerias += " FG.seqfuncionario = FER.seqfuncionario  ";
    sqlPainelFerias += " and FG.codempresa = FER.codempresa  ";
    sqlPainelFerias += " and FG.codpessoa = FER.codpessoa  ";
    sqlPainelFerias += " and FG.dtinicioperiodoaquisitivo = FER.dtinicioperiodoaquisitivo ";
    sqlPainelFerias += "  ";
    sqlPainelFerias += " inner join foltipoferias TF ON ";
    sqlPainelFerias += " TF.seqtipoferias = FER.seqtipoferias ";
    sqlPainelFerias += "  ";
    sqlPainelFerias += "  ";
    sqlPainelFerias += " inner join baspessoafisica PF ON ";
    sqlPainelFerias += " PF.codpessoa = F.codpessoa ";
    sqlPainelFerias += " inner join baspessoas P ON ";
    sqlPainelFerias += " P.codpessoa = PF.codpessoa ";
    sqlPainelFerias += " where LT.seqlocaldetrabalho = 123 ";
    sqlPainelFerias += " and current_date between dtiniciogozo and dtfimgozo ";
    sqlPainelFerias += " and FG.idativo = 1 ";

    
    
    String sqlTabelaAfastamento = "";
    
    sqlTabelaAfastamento += " ";
    
    sqlTabelaAfastamento += " SELECT ";

    sqlTabelaAfastamento += " F.matriculaFunc as matricula,  ";
    sqlTabelaAfastamento += " P.nomeRazaoSocial as nome,  ";
    sqlTabelaAfastamento += " to_char(AFA.dtAfastamento, 'DD/MM/YYYY') as inicio,  ";
    sqlTabelaAfastamento += " to_char(AFA.dtfinalafastamento, 'DD/MM/YYYY') as fim, ";
    sqlTabelaAfastamento += " coalesce(AFA.qteDiasDeAfastamento,0) as qteDiasDeAfastamento, ";
    sqlTabelaAfastamento += " AFA.codTipoAfastamento as codafastamento,  ";
    sqlTabelaAfastamento += " TA.descrTipoAfastamento as descricao, ";
    sqlTabelaAfastamento += " RF.descrrelacaofuncional ";
    sqlTabelaAfastamento += "  ";
    sqlTabelaAfastamento += "  ";
    sqlTabelaAfastamento += " FROM folFuncAfastadosDaFolha AFA ";
    sqlTabelaAfastamento += " INNER JOIN folFuncionarios F ON ";
    sqlTabelaAfastamento += " F.codPessoa = AFA.codPessoa ";
    sqlTabelaAfastamento += " AND F.codEmpresa = AFA.codEmpresa ";
    sqlTabelaAfastamento += " AND F.seqFuncionario = AFA.seqFuncionario ";
    sqlTabelaAfastamento += " INNER JOIN basPessoas P ON ";
    sqlTabelaAfastamento += " P.codPessoa = F.codPessoa ";
    sqlTabelaAfastamento += " INNER JOIN folTipoAfastamento TA ON ";
    sqlTabelaAfastamento += " TA.codTipoAfastamento = AFA.codTipoAfastamento ";
    sqlTabelaAfastamento += "  ";
    sqlTabelaAfastamento += " INNER JOIN folrelacaofuncional RF ON ";
    sqlTabelaAfastamento += " RF.seqrelacaofuncional = F.seqrelacaofuncional ";
    sqlTabelaAfastamento += "  ";
    sqlTabelaAfastamento += " INNER JOIN folfunclocaldetrabalho FLT ON ";
    sqlTabelaAfastamento += " FLT.codempresa = F.j_codempresa ";
    sqlTabelaAfastamento += " AND FLT.seqlocaldetrabalho = F.seqlocaldetrabalho ";
    sqlTabelaAfastamento += " AND FLT.codpessoa = F.j_codpessoa ";
    sqlTabelaAfastamento += " AND FLT.i_codempresa = F.i_i_codempresa ";
    sqlTabelaAfastamento += " AND FLT.seqfuncionario = F.j_seqfuncionario ";
    sqlTabelaAfastamento += " AND FLT.dtinicio = F.dtinicio ";
    sqlTabelaAfastamento += "  ";
    sqlTabelaAfastamento += "  ";
    sqlTabelaAfastamento += " WHERE AFA.idativo = 1 ";
    sqlTabelaAfastamento += " and FLT.seqlocaldetrabalho = "+chave;
    

    String sqlTabelaFerias = "";
    
    sqlTabelaFerias += " ";    
    
    sqlTabelaFerias += " select ";
    sqlTabelaFerias += " FRF.descrrelacaofuncional, ";
    sqlTabelaFerias += " coalesce(to_char(FER.dtinicioperiodoaquisitivo, 'DD/MM/YYYY')||' / '||to_char(FER.dtfimperiodoaquisitivo, 'DD/MM/YYYY'), '') as aquisitivo,  ";
    sqlTabelaFerias += " coalesce(to_char(dtiniciogozo, 'DD/MM/YYYY')||' / '||to_char(dtfimgozo, 'DD/MM/YYYY'), '')  as gozo, ";
    sqlTabelaFerias += " coalesce((dtfimgozo - dtiniciogozo)+1, 0) as qteDias,  ";
    sqlTabelaFerias += " TF.descrferias, ";
    sqlTabelaFerias += " F.matriculafunc as matricula, ";
    sqlTabelaFerias += " P.nomerazaosocial as nome, ";
    sqlTabelaFerias += " (case when GOZO.idconfirmada = 1 then 'SIM' else 'Não' end) as confirmada";
    sqlTabelaFerias += " from folfuncferiasctrdegozo GOZO ";
    sqlTabelaFerias += " inner join folfuncferiasfuncionario FER ON ";
    sqlTabelaFerias += " FER.seqtipoferias = GOZO.seqtipoferias ";
    sqlTabelaFerias += " and FER.codpessoa = GOZO.codpessoa ";
    sqlTabelaFerias += " and FER.codempresa = GOZO.codempresa ";
    sqlTabelaFerias += " and FER.seqfuncionario = GOZO.seqfuncionario ";
    sqlTabelaFerias += " and FER.dtinicioperiodoaquisitivo = GOZO.dtinicioperiodoaquisitivo ";
    sqlTabelaFerias += " inner join foltipoferias TF ON ";
    sqlTabelaFerias += " TF.seqtipoferias = FER.seqtipoferias ";
    sqlTabelaFerias += " inner join folfuncionarios F ON ";
    sqlTabelaFerias += " F.codpessoa = FER.codpessoa ";
    sqlTabelaFerias += " and F.codempresa = FER.codempresa ";
    sqlTabelaFerias += " and F.seqfuncionario = FER.seqfuncionario ";
    sqlTabelaFerias += " inner join baspessoafisica PF ON ";
    sqlTabelaFerias += " PF.codpessoa = F.codpessoa ";
    sqlTabelaFerias += " inner join baspessoas P ON ";
    sqlTabelaFerias += " P.codpessoa = PF.codpessoa ";
    sqlTabelaFerias += " INNER join folfunclocaldetrabalho LT ON ";
    sqlTabelaFerias += " F.j_codempresa = LT.codempresa ";
    sqlTabelaFerias += " AND F.seqlocaldetrabalho = LT.seqlocaldetrabalho ";
    sqlTabelaFerias += " AND F.j_codpessoa = LT.codpessoa ";
    sqlTabelaFerias += " AND F.i_i_codempresa = LT.i_codempresa ";
    sqlTabelaFerias += " AND F.j_seqfuncionario = LT.seqfuncionario ";
    sqlTabelaFerias += " AND F.dtinicio = LT.dtinicio ";
    sqlTabelaFerias += " INNER join follocaldetrabalho FLT ON ";
    sqlTabelaFerias += " FLT.codempresa = LT.codempresa ";
    sqlTabelaFerias += " AND FLT.seqlocaldetrabalho = LT.seqlocaldetrabalho ";
    sqlTabelaFerias += " inner join folrelacaofuncional FRF ON ";
    sqlTabelaFerias += " FRF.seqrelacaofuncional = F.seqrelacaofuncional ";
    sqlTabelaFerias += "  ";
    sqlTabelaFerias += " where ";
    sqlTabelaFerias += " GOZO.idativo = 1 ";
    sqlTabelaFerias += " and FER.idativo = 1 ";
    sqlTabelaFerias += " and F.idativo = 1 ";
    sqlTabelaFerias += " and FLT.seqlocaldetrabalho = "+chave;
   
    
    String sqlTabelaFuncionarios = "";
    
    sqlTabelaFuncionarios += " ";    

    sqlTabelaFuncionarios += " SELECT  ";    
    sqlTabelaFuncionarios += " RF.descrrelacaofuncional, ";    
    sqlTabelaFuncionarios += " F.matriculaFunc as matricula, ";    
    sqlTabelaFuncionarios += " P.nomerazaosocial as nome, ";    
    sqlTabelaFuncionarios += " coalesce(CF.codCargoFuncao||' - ','')||CF.descrCargoFuncao as cargo, ";    
    sqlTabelaFuncionarios += " to_char(F.dtadmissao, 'DD/MM/YYYY') as dtadmissao, ";    
    sqlTabelaFuncionarios += " TSF.descrtipositfuncional, ";    
    sqlTabelaFuncionarios += "  ";    
    sqlTabelaFuncionarios += " ( ";    
    sqlTabelaFuncionarios += "  select salario from folsalariosdatabela  ";    
    sqlTabelaFuncionarios += "  where  ";    
    sqlTabelaFuncionarios += "  codempresa = FGCF.codempresa ";    
    sqlTabelaFuncionarios += "  and seqtabela = FGCF.seqtabela ";    
    sqlTabelaFuncionarios += "  and codtabgrau = FGCF.codtabgrau ";    
    sqlTabelaFuncionarios += "  and i_codempresa = CF.codempresa ";    
    sqlTabelaFuncionarios += "  and i_seqtabela = CF.seqtabela ";    
    sqlTabelaFuncionarios += "  and codtabnivel = CF.codtabnivel ";    
    sqlTabelaFuncionarios += " )||'' as salario ";    
    sqlTabelaFuncionarios += "  ";    
    sqlTabelaFuncionarios += " from follocaldetrabalho LT ";    
    sqlTabelaFuncionarios += " inner join folfunclocaldetrabalho FLT ON ";    
    sqlTabelaFuncionarios += " FLT.seqlocaldetrabalho = LT.seqlocaldetrabalho  ";    
    sqlTabelaFuncionarios += " and FLT.i_codempresa = LT.codempresa ";    
    sqlTabelaFuncionarios += " inner join folfuncionarios F ON ";    
    sqlTabelaFuncionarios += " F.j_codempresa = FLT.codempresa ";    
    sqlTabelaFuncionarios += " and F.j_codpessoa = FLT.codpessoa ";    
    sqlTabelaFuncionarios += " and F.j_seqfuncionario = FLT.seqfuncionario ";    
    sqlTabelaFuncionarios += " and F.i_i_codempresa = FLT.i_codempresa ";    
    sqlTabelaFuncionarios += " and F.dtinicio = FLT.dtinicio ";    
    sqlTabelaFuncionarios += " and F.seqlocaldetrabalho  = FLT.seqlocaldetrabalho ";    
    sqlTabelaFuncionarios += " inner join folrelacaofuncional RF ON ";    
    sqlTabelaFuncionarios += " RF.seqrelacaofuncional = F.seqrelacaofuncional ";    
    sqlTabelaFuncionarios += " inner join baspessoafisica PF ON ";    
    sqlTabelaFuncionarios += " PF.codpessoa = F.codpessoa ";    
    sqlTabelaFuncionarios += " inner join baspessoas P ON ";    
    sqlTabelaFuncionarios += " P.codpessoa = PF.codpessoa ";    
    sqlTabelaFuncionarios += " inner join foltiposituacfuncional TSF ON ";    
    sqlTabelaFuncionarios += " TSF.seqtipositfuncional = F.seqtipositfuncional ";    
    sqlTabelaFuncionarios += " inner join folfunccargofuncao FCF ON ";    
    sqlTabelaFuncionarios += " FCF.seqfunccargo = F.seqfunccargo ";    
    sqlTabelaFuncionarios += " and FCF.codempresa = F.i_codempresa ";    
    sqlTabelaFuncionarios += " and FCF.seqfuncionario = F.i_seqfuncionario ";    
    sqlTabelaFuncionarios += " and FCF.codpessoa = F.i_codpessoa ";    
    sqlTabelaFuncionarios += " inner join folcargofuncao CF ON ";    
    sqlTabelaFuncionarios += " CF.codempresa = FCF.i_codempresa ";    
    sqlTabelaFuncionarios += " and CF.seqcargofuncao = FCF.seqcargofuncao ";    
    sqlTabelaFuncionarios += "  ";    
    sqlTabelaFuncionarios += " inner join folfuncgrauscargofuncao FGCF ON ";    
    sqlTabelaFuncionarios += " FGCF.seqfunccargo = FCF.seqfunccargo ";    
    sqlTabelaFuncionarios += " and FGCF.codpessoa = FCF.codpessoa ";    
    sqlTabelaFuncionarios += " and FGCF.codempresa = FCF.codempresa ";    
    sqlTabelaFuncionarios += " and FGCF.seqfuncionario = FCF.seqfuncionario ";
    sqlTabelaFuncionarios += " and FGCF.idativo = 1 ";
    sqlTabelaFuncionarios += " and FGCF.dtfimgrau is null ";
    sqlTabelaFuncionarios += "  ";    
    sqlTabelaFuncionarios += "  ";    
    sqlTabelaFuncionarios += " where LT.seqlocaldetrabalho = "+chave;    
    sqlTabelaFuncionarios += " and F.idativo = 1 ";    
        
    
    
    try
    {
        if(acao.equals("carregaLocais"))
        {
            con = JspJson.AbreCon(session);    
            PreparedStatement psLocal = con.prepareStatement(sqlLocais);
            
            //System.out.println(psLocal.toString());
            ResultSet rsLocal = psLocal.executeQuery();
            

            String dadosListaLocalJson = adi.componentes.sql.QueryOutput.ToJson(rsLocal);
            
            //System.out.println(dadosListaLocalJson);
            org.json.JSONObject jsonfinal = new org.json.JSONObject();
            jsonfinal.put("listaLocais", dadosListaLocalJson);
            
            rsLocal.close();
            rsLocal = null;
            psLocal.close();
            psLocal = null;
            
            JspJson.WriteJson(response, jsonfinal.toString());
            
        }
        
        if(acao.equals("carregaDadosPainelLocal"))
        {
            con = JspJson.AbreCon(session);    
            PreparedStatement psPainelAfastDados = con.prepareStatement(sqlPainelAfastamento);
            PreparedStatement psPainelFeriasDados = con.prepareStatement(sqlPainelFerias);
            
            //System.out.println(psLocal.toString());
            ResultSet rsPainelAfastDados = psPainelAfastDados.executeQuery();
            ResultSet rsPainelFeriasDados = psPainelFeriasDados.executeQuery();
            

            String dadosPainelAfastLocalJson = adi.componentes.sql.QueryOutput.ToJson(rsPainelAfastDados);
            String dadosPainelFeriasLocalJson = adi.componentes.sql.QueryOutput.ToJson(rsPainelFeriasDados);
            
            //System.out.println(dadosPainelAfastLocalJson);
            //System.out.println(dadosPainelFeriasLocalJson);
            
            org.json.JSONObject jsonfinal = new org.json.JSONObject();
            
            jsonfinal.put("painelAfastLocal", dadosPainelAfastLocalJson);
            jsonfinal.put("painelFeriasLocal", dadosPainelFeriasLocalJson);
            
            rsPainelAfastDados.close();
            rsPainelAfastDados = null;
            rsPainelFeriasDados.close();
            rsPainelFeriasDados = null;
            psPainelAfastDados.close();
            psPainelAfastDados = null;
            psPainelFeriasDados.close();
            psPainelFeriasDados = null;
            
            JspJson.WriteJson(response, jsonfinal.toString());
            
        }
        if(acao.equals("carregaTabelaAfastamento"))
        {
            con = JspJson.AbreCon(session);    
            PreparedStatement psTabelaAfastDados = con.prepareStatement(sqlTabelaAfastamento);
            
            //System.out.println(sqlTabelaAfastamento.toString());
            ResultSet rsTabelaAfastDados = psTabelaAfastDados.executeQuery();

            String dadosTabelaAfastLocalJson = adi.componentes.sql.QueryOutput.ToJson(rsTabelaAfastDados);
            
            //System.out.println(dadosTabelaAfastLocalJson);
            
            org.json.JSONObject jsonfinal = new org.json.JSONObject();
            
            jsonfinal.put("tabelaAfastLocal", dadosTabelaAfastLocalJson);
            
            rsTabelaAfastDados.close();
            rsTabelaAfastDados = null;
            psTabelaAfastDados.close();
            psTabelaAfastDados = null;
            
            JspJson.WriteJson(response, jsonfinal.toString());
        }
        if(acao.equals("carregaTabelaFerias"))
        {
            con = JspJson.AbreCon(session);    
            PreparedStatement psTabelaFeriasDados = con.prepareStatement(sqlTabelaFerias);
            
            //System.out.println(sqlTabelaFerias.toString());
            ResultSet rsTabelaFeriasDados = psTabelaFeriasDados.executeQuery();

            String dadosTabelaFeriasLocalJson = adi.componentes.sql.QueryOutput.ToJson(rsTabelaFeriasDados);
            
            //System.out.println(dadosTabelaFeriasLocalJson);
            
            org.json.JSONObject jsonfinal = new org.json.JSONObject();
            
            jsonfinal.put("tabelaFeriasLocal", dadosTabelaFeriasLocalJson);
            
            rsTabelaFeriasDados.close();
            rsTabelaFeriasDados = null;
            psTabelaFeriasDados.close();
            psTabelaFeriasDados = null;
            
            JspJson.WriteJson(response, jsonfinal.toString());
        }
        
        if(acao.equals("carregaTabelaFuncionario"))
        {
            con = JspJson.AbreCon(session);    
            PreparedStatement psTabelaFuncionarioDados = con.prepareStatement(sqlTabelaFuncionarios);
            
            //System.out.println(sqlTabelaFerias.toString());
            ResultSet rsTabelaFuncionarioDados = psTabelaFuncionarioDados.executeQuery();

            String dadosTabelaFuncionarioLocalJson = adi.componentes.sql.QueryOutput.ToJson(rsTabelaFuncionarioDados);
            
            //System.out.println(dadosTabelaFuncionarioLocalJson);
            
            org.json.JSONObject jsonfinal = new org.json.JSONObject();
            
            jsonfinal.put("tabelaFuncionarioLocal", dadosTabelaFuncionarioLocalJson);
            
            rsTabelaFuncionarioDados.close();
            rsTabelaFuncionarioDados = null;
            psTabelaFuncionarioDados.close();
            psTabelaFuncionarioDados = null;
            
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
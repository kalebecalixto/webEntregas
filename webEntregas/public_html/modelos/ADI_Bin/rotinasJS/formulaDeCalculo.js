<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formulaDeCalculo.js -->

/**
 * Função que busca o modelo ativo de determinada formula de calculo
 * @version 26/07/2006
 * @author lucas hermano
 * @param campo: sequencial da formula de calculo
 * @param tabela: tabela que contem o sequencial da formula de calculo
 * @param seqExercicio: não obrigatório, somente caso a tabela for por exercicio
 * @Obrigatório.: É nescessário estanciar o multiple e Ajax, criar o form do Ajax com componente sql1 no jsp que o chama
**/
    
    function buscaModeloFormula( campo, tabela, seqExercicio )
    {
        document.frmAjax.sql1.value = " select FC.seqFormulaDeCalculo, FC.nomeDaFormula, "+
                                      " FC.nomeDoArquivo, MFC.seqModeloFormula, "+
                                      " FC.codModuloCalculo, FC.codFinalidadeCalculo "+
                                      " from "+tabela+" G "+
                                      " inner join basFormulaDeCalculo FC on "+
                                      " FC.seqFormulaDeCalculo = G."+campo+" "+
                                      " left join basModelosFormulaCalculo MFC on "+
                                      " MFC.seqFormulaDeCalculo = FC.seqFormulaDeCalculo and "+
                                      " MFC.idAtivo = 1 "+
                                      ( seqExercicio != null ? " where G.seqExercicio = "+seqExercicio : "" ) ;

        ajaxRequest( document.frmAjax, verificaModeloFormula );
    }    
    
    function verificaModeloFormula( )
    {
        if(ajax_request.readyState==4)
        {
            if( ajax_request.status == 200 )
            {
                var sqls = ajax_request.responseXML.getElementsByTagName( "seqformuladecalculo" );
                seqFormulaDeCalculo = "";
                if( sqls.length > 0 )
                    seqFormulaDeCalculo = sqls[0].childNodes[0].nodeValue;
                
                if( seqFormulaDeCalculo == "" )
                {
                    alert( GENBA0045.replace( "^%1^", "Modelo Ativo desta Fórmula de Cálculo " ) );
                    return;
                }

                sqls = ajax_request.responseXML.getElementsByTagName( "nomedaformula" );
                nomeDaFormula = "";
                if( sqls.length > 0 )
                    nomeDaFormula = sqls[0].childNodes[0].nodeValue;
                
                sqls = ajax_request.responseXML.getElementsByTagName( "nomedoarquivo" );
                nomeDoArquivo = "";
                if( sqls.length > 0 )
                    nomeDoArquivo = sqls[0].childNodes[0].nodeValue;
                
                sqls = ajax_request.responseXML.getElementsByTagName( "codmodulocalculo" );
                codModuloCalculo = "";
                if( sqls.length > 0 )
                    codModuloCalculo = sqls[0].childNodes[0].nodeValue;
                
                sqls = ajax_request.responseXML.getElementsByTagName( "codfinalidadecalculo" );
                codFinalidadeCalculo = "";
                if( sqls.length > 0 )
                    codFinalidadeCalculo = sqls[0].childNodes[0].nodeValue;
                
                sqls = ajax_request.responseXML.getElementsByTagName( "seqmodeloformula" );
                seqModeloFormula = "";
                if( sqls.length > 0 )
                    seqModeloFormula = sqls[0].childNodes[0].nodeValue;
                
                if( seqModeloFormula == "" )
                {
                    alert( GENBA0045.replace( "^%1^", "Modelo ativo não" ) );
                    return;
                }
                
                document.frmCalculo.arquivoCalculo.value = packagePath+"basico/bin/calculos/"+codFinalidadeCalculo+"/"+codModuloCalculo+"/"+nomeDoArquivo+"_MOD"+acreZero( seqModeloFormula, 2 )+".class";
                
                afterModeloFormula();
            }
        }
        
    }

    function afterModeloFormula( )
    {
	    
    }
    
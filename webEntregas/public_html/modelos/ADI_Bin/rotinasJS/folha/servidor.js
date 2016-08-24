<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/folha/servidor.js -->

/**
 * Monta os sql's para atualização dos saldos de acordo com o(s) cargo(s) e local(is) de trabalho do servidor ( utilizada na manutenção do servidor, manutenção do cargo/função e manutenção do local de trabalho )
 *
 * @version 1.0 28/09/2007
 * @author lucas hermano

 */

    var codEmpresa = "0";
    var codPessoa = "0";
    var seqFuncionario = "0";
    var seqLocalDeTrabalho = "0";
    var seqCargoFuncao = "0";
    var msgVagas = "";
    var sqlAtualizaSaldo = "";
    var apareceMensagem = 1;
    var dataAtual = formataDatas(data(), 'DD/MM/YYYY', 'YYYY-MM-DD');

    /* Valores buscados do banco */
    var r_dtFim = "";
    var r_idAtivo = "1";
    
    /* Valores dos componentes da tela */
    var c_idAtivo = "";
    var c_dtFim = "";
    
    var hidSaldo = "0";
    
    function atualizaSaldoServidor(  )
    {
        if( codEmpresa == "0" || codPessoa == "0" || seqFuncionario == "0" )
        {
            alert( "Erro na passagem de parâmetros do servidor!" );
            return;
        }
        
        if( c_idAtivo == "" )
        {
            alert( "Erro na passagem de parâmetros dos componentes da tela!" );
            return;
        }
        
        sqlAtualizaSaldo = "";
        
        /* Caso o registro for desativado, adiciona no saldo; caso for ativado, subtrai do saldo */

        /* hidSaldo => utilizado no controle de ambos os saldos, do local de trabalho e do cargo/função */
        if( c_idAtivo == "1" )
        {
            //caso for a primeira vez que preenche a data fim, significa que o registro não está mais ativo;
            if( c_dtFim != "" && r_dtFim == "" )
            {
                hidSaldo = ( r_idAtivo == "1" ? "1" : "0" );
            }
            else
            //caso seja retirado a data fim e o registro estiver com data fim preenchida
            if( c_dtFim == "" && r_dtFim != "" )
                hidSaldo = "-1";
            else
            //caso seja preenchido a data fim e o 
            if( c_dtFim != "" )
                hidSaldo = "0";
            else
                hidSaldo = ( r_idAtivo == "1" ? "0" : "-1" );
        }
        else
        {
            if( r_dtFim == "" && r_idAtivo == "1" )
                hidSaldo = "1";
            else
                hidSaldo = "0";
        }
        
        document.frmAjax.sql1.value = " SELECT "+
                                      " FLT.seqLocalDeTrabalho, "+
                                      " FCF.seqCargoFuncao, "+

                                      " CF.descrCargoFuncao, "+
                                      " EO.descrEstruturaOrganiz, "+

                                      " LTC.numMaximoVagas, "+
                                      " LTC.numMinimoVagas, "+
                                      " LTC.saldoDasVagas, "+

                                      " CFGV.numMaximoVagas as numMaximoGestao, "+
                                      " CFGV.numMinimoVagas as numMinimoGestao, "+
                                      " CFGV.saldoDasVagas as saldoGestao "+

                                      " FROM folFuncCargoFuncao FCF "+

                                      " INNER JOIN folFuncLocalDeTrabalho FLT ON "+
                                      " FLT.codEmpresa = FCF.codEmpresa AND "+
                                      " FLT.seqFuncionario = FCF.seqFuncionario AND "+
                                      " FLT.codPessoa = FCF.codPessoa AND "+
                                      " FLT.idAtivo = 1 AND "+
                                      " ( FLT.dtFim > '"+dataAtual+"' or FLT.dtFim is null ) "+

                                      " INNER JOIN folLocalDeTrabalho LT ON "+
                                      " LT.codEmpresa = FLT.codEmpresa AND "+
                                      " LT.seqLocalDeTrabalho = FLT.seqLocalDeTrabalho "+

                                      " INNER JOIN basEstruturaOrganiz EO ON "+
                                      " EO.seqEstruturaOrganiz = LT.seqEstruturaOrganiz "+

                                      " INNER JOIN folLocalDeTrabalhoCargos LTC ON "+
                                      " LTC.seqCargoFuncao = FCF.seqCargoFuncao AND "+
                                      " LTC.seqLocalDeTrabalho = FLT.seqLocalDeTrabalho "+

                                      " INNER JOIN folCargoFuncao CF ON "+
                                      " CF.seqCargoFuncao = FCF.seqCargoFuncao "+

                                      " INNER JOIN folCargoFuncaoGestaoVagas CFGV ON "+
                                      " CFGV.seqCargoFuncao = FCF.seqCargoFuncao "+

                                      " WHERE "+
                                      " FCF.idAtivo = 1 AND "+
                                      " ( FCF.dtFim > '"+dataAtual+"' or FCF.dtFim is null ) and ( FCF.dtSuspensao > '"+dataAtual+"' or FCF.dtSuspensao is null ) AND "+
                                      " FCF.codEmpresa = "+codEmpresa+" AND "+
                                      " FCF.codPessoa = "+codPessoa+" AND "+
                                      " FCF.seqFuncionario = "+seqFuncionario+" AND "+
                                      " ( FCF.seqCargoFuncao = "+seqCargoFuncao+" or "+seqCargoFuncao+" = 0 ) AND "+
                                      " ( FLT.seqLocalDeTrabalho = "+seqLocalDeTrabalho+" or "+seqLocalDeTrabalho+" = 0 ) "+

                                      " ORDER BY FCF.seqFuncionario, FCF.codPessoa, FLT.seqLocalDeTrabalho, FCF.seqCargoFuncao ";

        ajaxRequest( document.frmAjax, criticaSaldoServidor );
    }
    
    function criticaSaldoServidor(  )
    {
        if( ajax_request.readyState == 4 )
        {
            if( ajax_request.status == 200 )
            {
                var vtSeqCargoFuncao   = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "seqcargofuncao" ) );
                var vtDescrCargoFuncao = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "descrcargofuncao" ) );
                
                var vtSeqLocalDeTrabalho    = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "seqlocaldetrabalho" ) );
                var vtDescrEstruturaOrganiz = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "descrestruturaorganiz" ) );
                
                /* vagas do cargo/funcao no local de trabalho */
                var vtNumMaximoVagas = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "nummaximovagas" ) );
                var vtNumMinimoVagas = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "numminimovagas" ) );
                var vtSaldoDasVagas  = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "saldodasvagas" ) );
                
                /* gestao das vagas do cargo/funcao */
                var vtNumMaximoGestao = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "nummaximogestao" ) );
                var vtNumMinimoGestao = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "numminimogestao" ) );
                var vtSaldoGestao     = retornaValoresArray( ajax_request.responseXML.getElementsByTagName( "saldogestao" ) );
                msgVagas = "";
                for( var x=0; x<vtDescrCargoFuncao.length; x++ )
                {
                    if( vtSaldoDasVagas[ x ]*1 == 0 && r_idAtivo != c_idAtivo)
                    {
                        msgVagas += "Número de Vagas do Cargo/Função ( " + vtDescrCargoFuncao[ x ] + " ) no local "+vtDescrEstruturaOrganiz[ x ]+" esgotada.\n";
                    }
                    
                    /* Verificando o saldo das vagas na gestão do Cargo/Função  */
                    if( vtSaldoGestao[ x ]*1 < 0 )
                    {
                        msgVagas += "Saldo das Vagas da Gestão do Cargo/Função ( " + vtDescrCargoFuncao[ x ] + " ) no local "+vtDescrEstruturaOrganiz[ x ]+" esgotado.\n";
                    }

                    sqlAtualizaSaldo += " ^ UPDATE folLocalDeTrabalhoCargos SET "+
                                        " saldoDasVagas = saldoDasVagas + hidSaldo "+
                                        " WHERE codEmpresa = "+codEmpresa+" and "+
                                        " i_codEmpresa = "+codEmpresa+" and "+
                                        " seqLocalDeTrabalho = "+vtSeqLocalDeTrabalho[ x ]+" and "+
                                        " seqCargoFuncao = "+vtSeqCargoFuncao[ x ]

                //Retirada a atualização do Gestao de vagas, por causa da alteração do diagrama. Gestao só pode ser alterado no Local de trabalho - Rafael C 03/06/2008
                                        /*
                                        " ^ UPDATE folCargoFuncaoGestaoVagas SET "+
                                        " saldoDasVagas = saldoDasVagas + hidSaldo "+
                                        " WHERE codEmpresa = "+codEmpresa+" AND "+
                                        " seqCargoFuncao = "+vtSeqCargoFuncao[ x ];*/
                    
                }

                if( msgVagas.length > 0 && apareceMensagem == 1 )
                    alert( msgVagas );

                if( document.forms[0].hidSaldo )
                    document.forms[0].hidSaldo.value = hidSaldo;

                afterAtualizaSaldo(  );                

            }
        }
    }
    
    function afterAtualizaSaldo(  )
    {
        
    }

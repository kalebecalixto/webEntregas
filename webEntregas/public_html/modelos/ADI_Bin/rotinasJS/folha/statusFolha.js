<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/folha/statusFolha.js -->

/**
 * Verifica o status do mês da folha de pagamentos
 *
 * @version 1.0 11/09/2007
 * @author lucas hermano
 * @param anoStatus conterá o sequencial do ano para busca do status
 * @param codMesStatus conterá o sequencial do mês para busca do status
 * @param codEmpresaStatus conterá o sequencial da empresa logada para busca do status
 * @param statusMesFolha resultado contendo o status da folha no mes indicado ( 0 - Não Encerrado; 1 - Encerrado )
 * @param idMensagemStatus indica se esta função exibirá ou não a mensagem de que o mês encontra-se encerrado
 */

    var anoStatus = "0";
    var codMesStatus = "0";
    var codEmpresaStatus = "0";
    var statusMesFolha = "0";
    var idMensagemStatus = true;
    
    function verificaStatusFolha(  )
    {
        document.frmAjax.sql1.value = " SELECT SF.idEncerrado, M.descrMes "+
                                      " FROM folStatusFolhaMesAno SF "+
                                      " INNER JOIN basMes M ON "+
                                      " M.codMes = SF.codMes "+
                                      " WHERE SF.codEmpresa = "+codEmpresaStatus+" AND "+
                                      " SF.ano = "+anoStatus+" AND "+
                                      " SF.codMes = "+codMesStatus;
        ajaxRequest( document.frmAjax, criticaStatusFolha );
    }
    
    function criticaStatusFolha(  )
    {
        if( ajax_request.readyState == 4 )
        {
            if( ajax_request.status == 200 )
            {
                var sqls = ajax_request.responseXML.getElementsByTagName( "idencerrado" );
                var idEncerrado = "0";
                if( sqls.length > 0 )
                    idEncerrado = sqls[0].childNodes[0].nodeValue;
                    
                sqls = ajax_request.responseXML.getElementsByTagName( "descrmes" );
                var descrMes = "";
                if( sqls.length > 0 )
                    descrMes = sqls[0].childNodes[0].nodeValue;
                
                statusMesFolha = idEncerrado;
                
                if( idMensagemStatus )
                {
                    if( idEncerrado == "1" )
                    {
                        alert( "Mês de "+descrMes+" encontra-se encerrado nos parâmetros gerais do Recursos Humanos." );
                    }
                }
                
                afterStatusFolha(  );
                
            }
        }        
    }
    
    function afterStatusFolha(  )
    {
    }


/**
 * Verifica a permissão do usuário logado para efetuar o cálculo
 *
 * @version 1.0 11/09/2007
 * @author lucas hermano
 * @param codUsuarioPermissao conterá o usuário que acessa o cálculo
 * @param codEmpresaPermissao conterá a empresa logada
 * @param idMensagemPermissao indica se esta função exibirá ou não a mensagem de que o usuário possui ou não permissão para efetuar o cálculo
 * @param idCalculo conterá o valor da permissão do usuário
 */

var codUsuarioPermissao = "";
var codEmpresaPermissao = "0";
var idMensagemPermissao = true;
var idCalculo           = "0";
var opcaoExecucaoCalculo = "0";

    function verificaPermissaoUsuario(  )
    {
        document.frmAjax.sql1.value = " SELECT coalesce(idCalculo,0) as idCalculo, idManutFunc, coalesce(idcalcgeral,0) as idcalcgeral, coalesce(idcalcfaixa,0) as idcalcfaixa "+
                                      " FROM folPermissoesUsuarios "+
                                      " WHERE codEmpresa = "+codEmpresaPermissao+
                                      " AND codUsuario = '"+codUsuarioPermissao+"' "+
                                      " AND idAtivo = 1 ";
        ajaxRequest( document.frmAjax, criticaPermissaoUsuario );
    }

    function criticaPermissaoUsuario(  )
    {
        if( ajax_request.readyState == 4 )
        {
            if( ajax_request.status == 200 )
            {
                var sqls = ajax_request.responseXML.getElementsByTagName( "idcalculo" );
                idCalculo = "0";
                if( sqls.length > 0 )
                    idCalculo = sqls[0].childNodes[0].nodeValue;
                
                sqls = ajax_request.responseXML.getElementsByTagName( "idcalcgeral" );
                var idcalcgeral = "0";
                if( sqls.length > 0 )
                    idcalcgeral = sqls[0].childNodes[0].nodeValue;
                
                sqls = ajax_request.responseXML.getElementsByTagName( "idcalcfaixa" );
                var idcalcfaixa = "0";
                if( sqls.length > 0 )
                    idcalcfaixa = sqls[0].childNodes[0].nodeValue;

                sqls = ajax_request.responseXML.getElementsByTagName( "idmanutfunc" );
                var idManutFunc = "0";
                if( sqls.length > 0 )
                    idManutFunc = sqls[0].childNodes[0].nodeValue;
                    
                if( idCalculo == "0" )
                {
                    if(idMensagemPermissao)
                    {
                        alert( "Usuário não tem permissão de efetuar cálculos." );
                    }
                }
                else if(opcaoExecucaoCalculo == "2" && idcalcgeral == "0")
                {
                    idCalculo = "0";

                    if(idMensagemPermissao)
                    {
                        alert( "Usuário não tem permissão de efetuar cálculo geral." );
                    }
                }
                else if(opcaoExecucaoCalculo == "0" && idcalcfaixa == "0")
                {
                    idCalculo = "0";

                    if(idMensagemPermissao)
                    {
                        alert( "Usuário não tem permissão de efetuar cálculo por faixa." );
                    }
                }

                afterPermissaoUsuario(  );
                
            }
        }        
    }
    
    function afterPermissaoUsuario(  )
    {
    }


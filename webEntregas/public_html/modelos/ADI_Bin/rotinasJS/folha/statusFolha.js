<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/folha/statusFolha.js -->

/**
 * Verifica o status do m�s da folha de pagamentos
 *
 * @version 1.0 11/09/2007
 * @author lucas hermano
 * @param anoStatus conter� o sequencial do ano para busca do status
 * @param codMesStatus conter� o sequencial do m�s para busca do status
 * @param codEmpresaStatus conter� o sequencial da empresa logada para busca do status
 * @param statusMesFolha resultado contendo o status da folha no mes indicado ( 0 - N�o Encerrado; 1 - Encerrado )
 * @param idMensagemStatus indica se esta fun��o exibir� ou n�o a mensagem de que o m�s encontra-se encerrado
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
                        alert( "M�s de "+descrMes+" encontra-se encerrado nos par�metros gerais do Recursos Humanos." );
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
 * Verifica a permiss�o do usu�rio logado para efetuar o c�lculo
 *
 * @version 1.0 11/09/2007
 * @author lucas hermano
 * @param codUsuarioPermissao conter� o usu�rio que acessa o c�lculo
 * @param codEmpresaPermissao conter� a empresa logada
 * @param idMensagemPermissao indica se esta fun��o exibir� ou n�o a mensagem de que o usu�rio possui ou n�o permiss�o para efetuar o c�lculo
 * @param idCalculo conter� o valor da permiss�o do usu�rio
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
                        alert( "Usu�rio n�o tem permiss�o de efetuar c�lculos." );
                    }
                }
                else if(opcaoExecucaoCalculo == "2" && idcalcgeral == "0")
                {
                    idCalculo = "0";

                    if(idMensagemPermissao)
                    {
                        alert( "Usu�rio n�o tem permiss�o de efetuar c�lculo geral." );
                    }
                }
                else if(opcaoExecucaoCalculo == "0" && idcalcfaixa == "0")
                {
                    idCalculo = "0";

                    if(idMensagemPermissao)
                    {
                        alert( "Usu�rio n�o tem permiss�o de efetuar c�lculo por faixa." );
                    }
                }

                afterPermissaoUsuario(  );
                
            }
        }        
    }
    
    function afterPermissaoUsuario(  )
    {
    }


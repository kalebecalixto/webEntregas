<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/contabilidade/statusContabilidade.js -->

/**
 * Verifica o status do m�s da contabilidade
 *
 * @version 1.0 06/10/2007
 * @author lucas hermano
 * @param exercicioStatusContab conter� o sequencial do ano para busca do status
 * @param codMesStatusContab conter� o sequencial do m�s para busca do status
 * @param codEmpresaStatusContab conter� o sequencial da empresa logada para busca do status
 * @param statusExercicioContab resultado contendo o status da folha no exerc�cio indicado ( 0 - N�o Encerrado; 1 - Encerrado )
 * @param statusMesContab resultado contendo o status da folha no mes indicado ( 0 - N�o Encerrado; 1 - Encerrado )
 * @param statusContabil resultado contendo se o status contabil est� ok ( 1 ) ou n�o est� ok ( 0 )
 * @param idMensagemStatusContab indica se esta fun��o exibir� ou n�o a mensagem de que o m�s encontra-se encerrado
 */

    var exercicioStatusContab   = "0";
    var codMesStatusContab      = "0";
    var codEmpresaStatusContab  = "0";
    var statusExercicioContab   = "1";
    var statusMesContab         = "1";
    var statusContabil          = "1";
    var idMensagemStatusContab  = true;

    function verificaStatusContabilidade(  )
    {
        document.frmAjax.sql1.value = " SELECT "+
                                      " ( SELECT COUNT( ES.situacaoSistema ) FROM segEmpresasSistemas ES WHERE ES.codEmpresa = "+codEmpresaStatusContab+" AND ES.codSistema = S.codSistema ) AS existeModulo, "+
                                      " ( SELECT COUNT( ES.situacaoSistema ) FROM segEmpresasSistemas ES WHERE ES.codEmpresa = "+codEmpresaStatusContab+" AND ES.codSistema = S.codSistema AND ES.situacaoSistema < 2  ) AS situacao, "+
                                      " ( SELECT PS.idExercicioEncerrado FROM ctbParametrosDoSistema PS WHERE PS.codEmpresa = "+codEmpresaStatusContab+" AND PS.seqExercicio = "+exercicioStatusContab+" ) AS idExercicioEncerrado, "+
                                      " ( SELECT SC.idEncerrado FROM ctbStatusDaContabilidade SC WHERE SC.codEmpresa = "+codEmpresaStatusContab+" AND SC.seqExercicio = "+exercicioStatusContab+" AND SC.codMes = "+codMesStatusContab+" ) AS idMesEncerrado, "+
                                      " ( SELECT M.descrMes FROM basMes M WHERE M.codMes = "+codMesStatusContab+" ) AS descrMes "+

                                      " FROM segSistema S "+
                                      " WHERE S.codSistema = 9 ";

        ajaxRequest( document.frmAjax, criticaStatusContabilidade );
    }

    function criticaStatusContabilidade(  )
    {
        if( ajax_request.readyState == 4 )
        {
            if( ajax_request.status == 200 )
            {
                var sqls = ajax_request.responseXML.getElementsByTagName( "existemodulo" );
                var existeModulo = "0";
                if( sqls.length > 0 )
                    existeModulo = sqls[0].childNodes[0].nodeValue;

                sqls = ajax_request.responseXML.getElementsByTagName( "situacao" );
                var situacao = "0";
                if( sqls.length > 0 )
                    situacao = sqls[0].childNodes[0].nodeValue;

                /* Somente validar� o exerc�cio e o mes caso a empresa logada possuir o m�dulo da folha e tamb�m verificando o seu status atual */
                if( existeModulo*1 > 0 && situacao*1 > 0 )
                {
                    sqls = ajax_request.responseXML.getElementsByTagName( "idexercicioencerrado" );
                    statusExercicioContab = "1";
                    if( sqls.length > 0 )
                        statusExercicioContab = sqls[0].childNodes[0].nodeValue;

                    sqls = ajax_request.responseXML.getElementsByTagName( "idmesencerrado" );
                    statusMesContab = "1";
                    if( sqls.length > 0 )
                        statusMesContab = sqls[0].childNodes[0].nodeValue;

                    sqls = ajax_request.responseXML.getElementsByTagName( "descrmes" );
                    var descrMes = "";
                    if( sqls.length > 0 )
                        descrMes = sqls[0].childNodes[0].nodeValue;

                    if( idMensagemStatusContab )
                    {
                        if( statusExercicioContab*1 == 1 )
                        {
                            statusContabil = "0";
                            alert( "Exerc�cio "+exercicioStatusContab+" encontra-se encerrado nos Par�metros da Contabilidade." );
                        }
                        else
                        if( statusMesContab*1 == 1 )
                        {
                            statusContabil = "0";
                            alert( "M�s "+descrMes+" encontra-se encerrado nos Par�metros da Contabilidade." );
                        }
                    }

                }

                afterStatusContabilidade(  );
                
            }
        }
    }
    
    function afterStatusContabilidade(  )
    {
    }

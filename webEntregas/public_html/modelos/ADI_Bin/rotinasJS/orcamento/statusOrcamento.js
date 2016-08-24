<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/folha/statusFolha.js -->

/**
 * Verifica o status do m�s da folha de pagamentos
 *
 * @version 1.0 16/01/2008
 * @author Bruno
 * @param codEmpresaStatus conter� o sequencial da empresa logada para busca do status
 * @param statusSistemaIntegrado resultado contendo se o orcamento esta integrado na prefeitura ( 0 - N�o Encerrado; 1 - Encerrado )
 * @param idMensagemStatus indica se esta fun��o exibir� ou n�o a mensagem de que o Orcamento n�o est� integrado
 */

    var codEmpresaStatus = "0";
    var statusSistemaIntegrado = "0";
    var idMensagemStatus = true;
    
    function verificaStatusOrcamento(  )
    {
        document.frmAjax.sql1.value = " select count(situacaoSistema) as situacao from segEmpresasSistemas where codSistema = 34 and situacaoSistema = 1";
        ajaxRequest( document.frmAjax, criticaStatusOrcamento );
    }
    
    function criticaStatusOrcamento(  )
    {
        if( ajax_request.readyState == 4 )
        {
            if( ajax_request.status == 200 )
            {
                var sqls = ajax_request.responseXML.getElementsByTagName( "situacao" );
                var idSituacao = "0";
                if( sqls.length > 0 )
                    idSituacao = sqls[0].childNodes[0].nodeValue;

                   statusSistemaIntegrado = idSituacao;

                if( idMensagemStatus )
                {
                    if( idSituacao == "0" )
                    {
                        alert( "Sistema n�o possui Or�amento Integrado!" );
                    }
                }
                
                afterStatusOrcamento(  );
                
            }
        }        
    }
    
    function afterStatusOrcamento(  )
    {
    }



/**
 * Monta comando SQL de inserção para telas geradas pela classe adi.componentes.html.boletins
 *
 * @author Diego R. Drumond
 * @version 1.0 01.04.2004
 */
var itemEscolhido = '';
var sqlInsert = '';
var valRetorno ;
var verCombinacao = false;
var classeCampo = "";
var classeVerificaPermitida = "";
var classeVerificaNaoPermitida = "";

function montaSqlClasseAssociada( ){
    valRetorno = null;
    totItens = document.forms[0].totItens.value;
    totItens = totItens * 1;
    itemEscolhido = '';
    sqlInsert = '';
    for( i=1;i<=totItens;i++ )
    {
        sqlAux = document.forms[0].sqlInsert.value;
        campoComplemento = 'document.forms[0].complemento'+i;
        if( eval( campoComplemento ) != undefined )
        {
            campoComplemento = eval( campoComplemento+'.value' );
            sqlAux = trocaString( sqlAux, 'txtcomplemento', campoComplemento );
        }
        else
            sqlAux = trocaString( sqlAux, 'txtcomplemento', '' );
        if(  eval( 'document.forms[0].'+document.forms[0].colunaChaveSubItem.value+i ) != undefined  )
        {
            chaveSubItem     = eval( 'document.forms[0].'+ document.forms[0].colunaChaveSubItem.value+i+'.value' );
            strChaveSubItem  = 'txt'+document.forms[0].colunaChaveSubItem.value;
            if( chaveSubItem != '' )
                itemEscolhido  += chaveSubItem+", ";
            
            sqlAux = trocaString( sqlAux, strChaveSubItem, chaveSubItem );
            if( eval( 'document.forms[0].conteudo'+document.forms[0].colunaChaveSubItem.value+i ) )
            {
                conteudoSubItem = eval( 'document.forms[0].conteudo'+document.forms[0].colunaChaveSubItem.value+i+'.value' );
                sqlAux = trocaString( sqlAux, 'txt'+document.forms[0].colunaConteudo.value, conteudoSubItem );
            }
            else
                sqlAux = trocaString( sqlAux, 'txt'+document.forms[0].colunaConteudo.value, '' );
            if( chaveSubItem!='' )
            {
                sqlInsert += '^'+sqlAux;
            }
        }
        else
        {
            ct = 0;
            while(  eval( 'document.forms[0].'+document.forms[0].colunaChaveSubItem.value+i+'_'+ct )!= undefined  )
            {
                sqlAux = document.forms[0].sqlInsert.value;
                chaveSubItem = eval( 'document.forms[0].'+ document.forms[0].colunaChaveSubItem.value+i+'_'+ct+'.value' );
                strChaveSubItem = 'txt'+document.forms[0].colunaChaveSubItem.value;
                if( chaveSubItem != '' )
                    itemEscolhido  += chaveSubItem+", ";
                sqlAux = trocaString( sqlAux, strChaveSubItem, chaveSubItem );
                if( eval( 'document.forms[0].conteudo'+document.forms[0].colunaChaveSubItem.value+i+'_'+ct ) )
                {
                    conteudoSubItem = eval( 'document.forms[0].conteudo'+document.forms[0].colunaChaveSubItem.value+i+'_'+ct+'.value' );
                    sqlAux = trocaString( sqlAux, 'txt'+document.forms[0].colunaConteudo.value, conteudoSubItem );
                }
                else
                    sqlAux = trocaString( sqlAux, 'txt'+document.forms[0].colunaConteudo.value, '' );
                if( chaveSubItem!='' )
                {
                    sqlInsert += '^'+sqlAux;
                }
                ct += 2;
            }
        }
    }

    if( verCombinacao )
        buscaCombinacao( itemEscolhido );
    else
        retornaValor(  );
}

function buscaCombinacao( item ){
    auxItem = item;
    auxItem = auxItem.substring( 0,  auxItem.length-2 );

    document.frmAjax.sql1.value = " SELECT seqCombinacao, "+
                                  " ( SELECT COUNT("+classeCampo+") "+
                                  " FROM "+classeVerificaNaoPermitida+" CNP "+ 
                                  " WHERE CNP.SEQCOMBINACAO = CP.SEQCOMBINACAO "+
                                  " AND CNP.idAtivo = 1 ) as itens, "+
                                  " ( SELECT COUNT("+classeCampo+") "+
                                  " FROM "+classeVerificaNaoPermitida+" CNP "+
                                  " WHERE CNP.SEQCOMBINACAO = CP.SEQCOMBINACAO "+
                                  " AND CNP.idAtivo = 1 "+
                                  " AND CNP."+classeCampo+" IN ( "+auxItem+" ) ) as choose "+
                                  " FROM "+classeVerificaPermitida+" CP ";

    ajaxRequest( document.frmAjax, verificaCombinacao, true );
}

function verificaCombinacao (){
    if( ajax_request.readyState == 4 ){
        if( ajax_request.status == 200 ){
            var registro = ajax_request.responseXML.getElementsByTagName( "registro" );
            var ITENS = ajax_request.responseXML.getElementsByTagName( "itens" );
            var CHOOSE = ajax_request.responseXML.getElementsByTagName( "choose" );
                            
            for( i = 0; i < registro.length; i++ ){
                itens = ITENS[i].childNodes[0].nodeValue;
                choose = CHOOSE[i].childNodes[0].nodeValue;
                if( itens*1 == 0)
                    continue;
                if( choose*1 == itens*1 ){
                    valRetorno = false;
                }
            }
        }
    }

    if( valRetorno == null ){
        valRetorno = true;
    }
    if( !valRetorno ){
        alert("Combinação de Itens não permitida conforme parametrização. ");
    }else{
        retornaValor();
    }
}

function retornaValor(){
    
}

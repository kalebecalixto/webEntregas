<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/retornaEndereco.js -->
/**
 * Função que retorna o endereço
 * @versiON 1.0 21/09/2006
 * @author Fabio Faria
 * @param nucleo - seqDoNucleoDoEndereco que esta sendo buscado 
 * @param nucleo - campo que receberá o texto do endereco 
 * @param AJAX - Obrigatorio que a tela que ultiza esta funcao tenha um frmAjax
 * @return string (resultado da consulta )

 //Include=================>
<script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/retornaEndereco.js"></script>
 */
var campoAtualizado;

function retornaEndereco( nucleo, campo ){

    sqlEndereco = " SELECT BEL.codTipoLograd, BEL.codTitNobreza, BEL.codPreposicao, BEL.NucleoNomeLogradouro, "+
                  " BEC.numDoEndereco, BEN.codTipoComplEndereco, BEN.numeroDoTipoDoComplemento, BEN.suplementoDoCompleEndereco, "+
                  " BEB.descrBairro, BEM.descrMunicipio, BEUF.codUf, BEP.descrPais, BEC.cepCorreio "+
                  " FROM basNucleoDoEndereco BEN  "+
                  " INNER JOIN basCadastroDeEnderecos BEC "+
                  "  ON BEC.seqEndereco=BEN.seqEndereco "+
                  " INNER JOIN basLogradouros BEL "+
                  "  ON BEC.seqLogradouro=BEL.seqLogradouro "+
                  " INNER JOIN basBairro BEB "+
                  "  ON BEC.seqBairro=BEB.seqBairro "+
                  " INNER JOIN basMunicipio BEM "+
                  "  ON BEB.codMunicipio=BEM.codMunicipio "+
                  " INNER JOIN basUF BEUF "+
                  "  ON BEM.seqUF = BEUF.seqUF "+
                  " INNER JOIN basPais BEP "+
                  "  ON BEUF.codPais = BEP.codPais "+
				  " WHERE BEN.seqDoNucleoDoEndereco="+nucleo;

                                  
	document.frmAjax.sql1.value = sqlEndereco;
	campoAtualizado = eval(campo);

    ajaxRequest( document.frmAjax, formataEnderecoCompleto, true );

}

function confereExistencia( objeto ){
	
	if( objeto.length > 0 ){
		if( objeto[0].nodeValue == 'null' || objeto[0].nodeValue == ' ' ){
			return "";
		}else{
			return objeto[0].nodeValue;
		}
	}else{
		return "";
	}
}


function formataEnderecoCompleto(){
    if( ajax_request.readyState == 4 ){
        if( ajax_request.status == 200 ){
            registro                   = ajax_request.responseXML.getElementsByTagName( "registro" );
            codtipolograd              = ajax_request.responseXML.getElementsByTagName( "codtipolograd" );
            codtitnobreza              = ajax_request.responseXML.getElementsByTagName( "codtitnobreza" );
            codpreposicao              = ajax_request.responseXML.getElementsByTagName( "codpreposicao" );
            nucleonomelogradouro       = ajax_request.responseXML.getElementsByTagName( "nucleonomelogradouro" );
            numdoendereco              = ajax_request.responseXML.getElementsByTagName( "numdoendereco" );
            codtipocomplendereco       = ajax_request.responseXML.getElementsByTagName( "codtipocomplendereco" );
            numerodotipodocomplemento  = ajax_request.responseXML.getElementsByTagName( "numerodotipodocomplemento" );
            suplementodocompleendereco = ajax_request.responseXML.getElementsByTagName( "suplementodocompleendereco" );
            descrbairro                = ajax_request.responseXML.getElementsByTagName( "descrbairro" );
            descrmunicipio             = ajax_request.responseXML.getElementsByTagName( "descrmunicipio" );
            coduf                      = ajax_request.responseXML.getElementsByTagName( "coduf" );
            descrpais                  = ajax_request.responseXML.getElementsByTagName( "descrpais" );
            cep                        = ajax_request.responseXML.getElementsByTagName( "cepcorreio" );
            if(registro.length > 0 ){

				codTipoLograd              = confereExistencia( codtipolograd[0].childNodes );
				codTitNobreza              = confereExistencia( codtitnobreza[0].childNodes );
				codPreposicao              = confereExistencia( codpreposicao[0].childNodes );
				NucleoNomeLogradouro       = confereExistencia( nucleonomelogradouro[0].childNodes );
				numDoEndereco              = confereExistencia( numdoendereco[0].childNodes );
				codTipoComplEndereco       = confereExistencia( codtipocomplendereco[0].childNodes );
				numeroDoTipoDoComplemento  = confereExistencia( numerodotipodocomplemento[0].childNodes );
				suplementoDoCompleEndereco = confereExistencia( suplementodocompleendereco[0].childNodes );
				descrBairro                = confereExistencia( descrbairro[0].childNodes );
				descrMunicipio             = confereExistencia( descrmunicipio[0].childNodes );
				codUf                      = confereExistencia( coduf[0].childNodes );
				descrPais                  = confereExistencia( descrpais[0].childNodes );
				CEP                        = confereExistencia( cep[0].childNodes );

                campoAtualizado.value = "";
                campoAtualizado.value += codTipoLograd+" ";
                campoAtualizado.value += codTitNobreza==""?"":codTitNobreza+" ";
                campoAtualizado.value += codPreposicao==""?"":codPreposicao+" ";
                campoAtualizado.value += NucleoNomeLogradouro+" ";
                campoAtualizado.value += "nº "+numDoEndereco+", ";
                campoAtualizado.value += codTipoComplEndereco==""?"":codTipoComplEndereco+" ";
                campoAtualizado.value += numeroDoTipoDoComplemento==""?"":numeroDoTipoDoComplemento+" ";
                campoAtualizado.value += suplementoDoCompleEndereco==""?"":suplementoDoCompleEndereco+" ";
				campoAtualizado.value += "- CEP.: "+CEP+" ";
                campoAtualizado.value += descrBairro+" / "+descrMunicipio+" ";
                campoAtualizado.value += codUf+" - "+descrPais ;
            }else{
                campoAtualizado.value =  "Endereço Inexistente";
            }
        }
		afterCompletaEndereco();
    }
}

function afterCompletaEndereco( ){

}

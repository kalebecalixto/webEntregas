<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/critHora.js -->
/**
 * Função para critica de campos do tipo Hora
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param objCampo Campo a ser criticado
 * @return true se o campo for criticado,  false se Não
 */

function critHora(objCampo)
{// inicio da function critHora(objCampo)

	if( objCampo.value.length == 5 )
		objCampo.value += ":00";

	if (objCampo.value.length == 0)
	{
       alert(GENBA0002);
       objCampo.select( );
       return false;
    }
     
	if( objCampo.value.charAt( 2 ) != ':' || objCampo.value.charAt( 5 ) != ':' )
	{
		alert( GENHR0001 );
		return false;
	}
    
	hh = parseFloat( objCampo.value.substring( 0, 2 ) );
	mm = parseFloat( objCampo.value.substring( 3, 5 ) );
	ss = parseFloat( objCampo.value.substring( 6, 8 ) );

	if( isNaN( hh ) || isNaN( mm ) || isNaN( ss ) )
	{
		alert( GENHR0001 );
		objCampo.select( );
		return false;
	}
	
	if( hh < 0 || hh > 23 )
	{
		alert( GENHR0001 );
		objCampo.select( );
		return false;
	}

	if( mm < 0 || mm > 59 )
	{
		alert( GENHR0001 );
		objCampo.select( );
		return false;
	}

	if( ss < 0 || ss > 59 )
	{
		alert( GENHR0001 );
		objCampo.select( );
		return false;
	}
	
	return true;
	    
}// fim da function critHora(objCampo)

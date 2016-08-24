<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/validaDatas.js -->
/**
 * Função para validar datas
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param dataEntrada Data a ser verificada (DD/MM/YYYY)
 * @return true se a data for válida, false se for inválida
 */
 
function validaDatas(dataEntrada) 
{// inicio da function validaDatas(dataEntrada)
  var confirmaBisexto = "";
  //var dataEntrada = document.frmInc.datatelatxtDtInicial.value;
  diaData = dataEntrada.substring(0,2);
  mesData = dataEntrada.substring(3,5);
  anoData = dataEntrada.substring(6,10);

		if (mesData > 12 || mesData == 0) {
		alert(GENDT0007);
		return false;
		}
        
		if (diaData <= 28) {
		return true ;
		}

//local de verificacao de ano bisexto
var bisexto = anoData % 4 ;

	if (bisexto == 0) {
	   confirmaBisexto = "S";
	   } else {
	     confirmaBisexto = "N";
	}	 
//fim da verificacao de ano bisexto


// local de validacao de fevereiro com 29 dias

   if (mesData == 02) 
   {
		if  (diaData > 28) 
		{
			if (diaData == 29 && confirmaBisexto == "S" )
			   return true;

			if (diaData == 29 && confirmaBisexto == "N" ) {
			   alert(GENDT0003);
			   return false;
		    }					  
        	if (diaData > 29) {
			   alert(GENDT0003);
			   return false;
			}		
		}
	}

// fim da validacao de fevereiro com 29 dias
	 //local de validacao da data com 31 dias
	 if ((mesData==4 || mesData==6 || mesData==9 || mesData==11) && diaData==31) {
	      alert(GENDT0003)
		  return false;
	  }
   // fim do local de validacao da data com 31 dias
  // local de validacao de qualquer mês para não aceitar mais de 31 dias
    if( diaData > 31) {
	alert(GENDT0003);
	return false;
	}
	
	return true;
	
  // fim de validacao de qualquer mês para não aceitar mais de 31 dias
}// fim da function validaDatas(dataEntrada)

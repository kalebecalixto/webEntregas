<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcData.js -->
/**
 * Função que critica a data
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @deprecated Use o <a href='#validaDatas'>validaDatas<a> do validaDatas.js
 */


function ctcData()
{// inicio da function ctcData()
  (arrayAux[1]);
	 data=eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value;");
	 arrayLim = new Array("","31","","31","30","31","30","31","31","30","31","30","31");
 	err=false;
	 if (data.length!=6 && data.length!=8)
  {
		  err=true;
		  men="Digite uma data com 6 ou 8 dígitos.";
	 } else {
         		dia=data.substring(0,2);
         		mes=data.substring(2,4);
         		ano=data.substring(4);
         		if (ano.length==2)
         			if (ano>arrayAux[3])
         				ano="19"+ano;
         			else
         				ano="20"+ano;
		         if (mes=="02")
           {
       				  arrayLim[2]="28"
       				  if (mod(ano,4)==0) arrayLim[2]="29";
			        }
  			      if (mes>12)
           {
  				       err=true;
  				       men="Mês inválido";
  			      } else if (dia>arrayLim[mes*1])
                  {
                 			err=true;
                				men="Mês de "+arrayLim[mes*1]+" dias.";
                				if (mes=="02" && dia=="29") men="O ano não é bissexto."
  			             }
	        }//fim else
      	  if (err)
         {
	     	    mensagem=mensagem+salto+"Erro no campo \""+arrayAux[0]+"\". "+men;
		         if (salto=="")
           {
          			componenteRetorno=arrayAux[1];
          			salto="\n";
		         }
	        } else {
                		data=dia+"/"+mes+"/"+ano;
                		eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".value=data");
                		eval("document."+arrayCriticas[0]+"."+arrayAux[1]+".style.textAlign = 'center'");
                }
}// fim da function ctcData()

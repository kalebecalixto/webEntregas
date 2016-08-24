<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/criticaData.js -->
/**
 * Função para critica de datas
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param dtparam Campo a ser criticado
 * @return true se o campo for válido, false se for inválido
 */

function criticaData(dtparam)
{// inicio da function  criticaData(dtparam)

    dtparam = 	tiraCaracter(dtparam, ' ','T')
    var diaparam   = dtparam.substring(0,2);
    var mesparam = dtparam.substring(3,5);
    var anoparam = dtparam.substring(6,10);
    var barra1 = dtparam.substring(2,3);
    var barra2 = dtparam.substring(5,6);

    if ((barra1 != '/')||(barra2!='/'))
    {
       return false;
    }

	if (isNaN(diaparam))
    {
       return false;
    }

	if (isNaN(mesparam))
    {
       return false;
    }

	if (mesparam > 12)
    {
       return false
    }

	if (isNaN(anoparam))
    {
       return false;
    }

	if (anoparam.length < 4)
    {
       return false;
    }

	if (anoparam<1900)
    {
       return false;
    }

		if ((mesparam == 2)&&(diaparam > 29))
    {
        return false;
    }

		if (diaparam==31)
    {
       if ((mesparam!=1)&&(mesparam!=3)&&(mesparam!=5)&&(mesparam!=7)&&(mesparam!=8)&&(mesparam!=10)&&(mesparam!=12))
       {
          return false;
       }
    }

	if (diaparam>31)
    {
       return false;
    }

		var bis = anoparam % 4
    if (diaparam == 29)
    {
       if ((mesparam == 2)&&(bis!=0))
       {
      	 return false;
       }
    }
    return true;
}// fim da function criticaData(dtparam)

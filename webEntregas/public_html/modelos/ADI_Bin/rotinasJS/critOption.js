<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/critOption.js -->
/**
 * Função para critica de campos do tipo option
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param objCampo Campo a ser criticado
 * @return true se o campo está checado, false se não
 */

//objCampo= objeto option a ser criticado
function critOption(objCampo)
{// inicio da function critOption(objCampo)
   ctChecado = false;
   for (iTam=0;iTam<objCampo.length;iTam++)
   {
      if (objCampo[iTam].checked)
      {
         ctChecado = true;
         break;
      }
   }
   if (!ctChecado)
   {
      alert(GENBA0001);
      objCampo[0].focus();
   }
   return ctChecado;
}//fim da function critOption(objCampo)

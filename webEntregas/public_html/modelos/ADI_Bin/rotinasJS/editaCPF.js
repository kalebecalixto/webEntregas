<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/editaCPF.js -->
/**
 * Função que edita CPF
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param campo Campo do CPF
 * @param pTamMax Tamanho máximo do campo
 * @param pPos1 Posição do primeiro ponto (.)
 * @param pPos2 Posição do segundo ponto (.)
 * @param pPosTraco Posição do hífen (-)
 * @param pTeclaPres Tecla pressionada (event)
 */

function editaCPF(campo,pTamMax,pPos1,pPos2,pPosTraco,pTeclaPres)
{// inicio da função editaCPF(campo,pTamMax,pPos1,pPos2,pPosTraco,pTeclaPres)
  var wTecla, wVr, wTam;
  // alert(pForm[pCampo].value);
  wTecla = pTeclaPres.keyCode;
  wVr = campo.value;
  // alert(wVr);
  wVr = wVr.toString().replace( "-", "" );
  wVr = wVr.toString().replace( ".", "" );
  wVr = wVr.toString().replace( ".", "" );
  wVr = wVr.toString().replace( "/", "" );
  wTam = wVr.length ;
  if (wTam < pTamMax && wTecla != 8)
  {
    wTam = wVr.length + 1 ;
  }
  if (wTecla == 8 )
  {
    wTam = wTam - 1 ;
  }
  if ( wTecla == 8 || wTecla == 88 || wTecla >= 48 && wTecla <= 57 || wTecla >= 96 && wTecla <= 105 )
  {
    // verificando o valor do wTam
    if ( wTam <= 2 )
    {
       campo.value = wVr ;
    }
    if (wTam > pPosTraco && wTam <= pTamMax)
    {
       wVr = wVr.substr(0, wTam - pPosTraco) + '-' + wVr.substr(wTam - pPosTraco, wTam);
    }
    if ( wTam == pTamMax)
    {
        wVr = wVr.substr( 0, wTam - pPos1 ) + '.' + wVr.substr(wTam - pPos1, 3) + '.' + wVr.substr(wTam - pPos2, wTam);
    }
   campo.value = wVr;
  }
}// FIM DA EDICAO DE CPF

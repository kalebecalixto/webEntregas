<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/abreScroll.js -->
/**
 * Fun��o que verifica navegador e o tamanho da tela, para ser usado como default
 * @version 1.0 29/04/2003
 * @author Diego R. Drumond
 * @return Tamanho da tela(em px).
 */


// se o navegador for Netscape e a vers�o for maior ou igual a 4
// isMinNS4 recebe 1, sen�o recebe 0
var isMinNS4=(navigator.appName.indexOf("Netscape")>=0&&parseFloat(navigator.appVersion)>=4)?1:0;

// para vers�o 4 do IE
var isMinIE4=(document.all)?1:0;

// se o navegador for Internet Explorer com vers�o 5 
// isMinIE5 recebe 1, sen�o recebe 0
var isMinIE5=(isMinIE4&&navigator.appVersion.indexOf("5.")>=0)?1:0;

function getWindowWidth()
{
   //Pega o tamanho da tela
   if(isMinNS4)return window.innerWidth;
   if(isMinIE4)return document.body.clientWidth;
   //sen�o
   return-1;
}

// recebe o resultado da function, como chamada recursiva
var fullWidth = getWindowWidth()

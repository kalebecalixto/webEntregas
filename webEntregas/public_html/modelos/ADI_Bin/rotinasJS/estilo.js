<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/estilo.js -->
/**
 * Função de estilo - Apenas contém código de inserção de tela
 * @version 01/01/2000
 * @author Alexandre
 * @see scriptGeral
 */

  //Condicao para escrever todos os botoes se nenhum for especificado
  if (!self.botoes)
  {
        botoes = 'FAVNIC';
  }
  //Condicao para nao escrever os botoes se 0 for especificado
  if (botoes!='0')
  {
      for (i=0; i<botoes.length; i++)
      {
          funcao = 'escreve'+botoes.substring(i,i+1)+'()';
          eval(funcao);
      }
   }
   //escreve o final da tabela
   document.writeln("</td><td align='right' bgcolor='" + cor2 +"'>&nbsp;<font color='white' size=2><b>"+ sistema +"&nbsp;</td></tr></table><hr>");
   //Escreveo titulo da Tela
   if (texto == '_inc')
   {
     document.writeln("<center><b>INCLUSÃO:</b><br><bR></center>");
   }
   if (texto == '_con')
   {
      document.writeln("<center><b>CONSULTA:</b><br><br></center>");
   }
   if (texto == '_man')
   {
     document.writeln("<center><b>MANUTENÇÃO:</b><br><br></center>");
   }

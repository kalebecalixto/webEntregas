<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/formataHora.js -->
/**
 * Função para formatar hora 
 * @version 1.1 16/04/2004
 * @author Diego R. Drumond
 * @param campo Campo da hora (this)
 * @param pTeclaPres Tecla pressionada (event)
 */
function formataHora( campo, evt )
{
	retornaEstadosTeclas( evt );
	tecla = retornaKeyCode( evt );
	//verifica se usuário digitou tecla de atalho para inserir hora atual no campo.
	if( tecla == 104 || tecla == 72 ) // 104 = h, 72 = H
	{
		hoje = new Date( );
		horaAtual  = ( (   hoje.getHours( ) + 100 ).toString( ) ).substring( 1, 3 ) + ":";
		horaAtual += ( ( hoje.getMinutes( ) + 100 ).toString( ) ).substring( 1, 3 ) + ":";
		horaAtual += ( ( hoje.getSeconds( ) + 100 ).toString( ) ).substring( 1, 3 );
		campo.value = horaAtual;
		cancelaEvento( evt );
		return true;
	}
	//se campo estiver preenchido, aciona atalhos para somar e subtrair minutos da hora.
	if( campo.value.length == 8 )
	{
		//Se o usuario digitar Shift + '+', acrescenta 1 hora
		if( shift && tecla == 43 )
		{
			campo.value = operaHora( campo.value, ( 60 * 60 ) );
			cancelaEvento( evt );
			return true;
		}
		//Se o usuario digitar '+', acrescenta 1 minuto
		else if( tecla == 43 )
		{
			campo.value = operaHora( campo.value, 60 );
			cancelaEvento( evt );
			return true;
		}
		//Se o usuario digitar Shift + '-', subtrai 1 hora
		if( shift && tecla == 45 )
		{
			campo.value = operaHora( campo.value, -( 60 * 60 ) );
			cancelaEvento( evt );
			return true;
		}
		//Se o usuario digitar '-', subtrai 1 minuto
		else if( tecla == 45 )
		{
			campo.value = operaHora( campo.value, -60 );
			cancelaEvento( evt );
			return true;
		}
	}
	mascara( campo, evt, "99:99:99" );
}
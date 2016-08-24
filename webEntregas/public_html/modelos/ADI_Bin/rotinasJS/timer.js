<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/timer.js -->
/**
 * Temporizador.
 */
function Timer( )
{
	this._segundos = 0,
	this._minutos  = 0,
	this._horas    = 0,
	this._dias     = 0;

	this.validaInt   = _validaInt;

	this.setSegundos = _setSegundos;
	this.getSegundos = _getSegundos;
	this.addSegundos = _addSegundos;
	
	this.addTempo = _addTempo;

	this.setMinutos  = _setMinutos;
	this.getMinutos  = _getMinutos;
	this.addMinutos  = _addMinutos;
	
	this.setHoras    = _setHoras;
	this.getHoras    = _getHoras;
	this.addHoras    = _addHoras;
	
	this.setDias     = _setDias;
	this.getDias     = _getDias;
	this.addDias     = _addDias;
	
	this.toString    = _toString;
}

function _validaInt( num, msgErro )
{
	if( isNaN( parseInt( num ) ) )
	{
		alert( msgErro );
		return false;
	}
	return true;
}
/* Metodos para trabalhar com segundos. */
/**
 * Define os segundos
 * @param seg Numero contendo os segundos.
 */
function _setSegundos( seg )
{
	if( this.validaInt( seg, "Tempo.setSegundos( int ) - Número inválido." ) )
		this._segundos = seg;
}
/**
 * Retorna os segundos.
 */
function _getSegundos( )
{
	if( isNaN( this._segundos ) )
		this._segundos = 0;
	return this._segundos;
}
function _addSegundos( qtde )
{
	if( this.getSegundos( ) + qtde == 60 )
		this.addMinutos( 1 );
	else
		this.addTempo( this.getSegundos( ) + qtde );
}
/**
 * Adiciona segundos aos segundos já definidos.
 * @param qtde Quantidade de segundos a serem adicionados.
 */
function _addTempo( qtde )
{
	if( !this.validaInt( qtde, "Tempo.addTempo( int ) - Número inválido." ) )
		return;

 	if( qtde < 60 )
 	{
 		this.setSegundos( qtde );
 	}
	else if( qtde >= 60 && qtde < ( 60 * 60 ) )
	{
		this.setMinutos( parseInt( qtde / 60 ) );
		this.setSegundos( qtde % 60 );
	}
	else if( qtde >= ( 60 * 60 ) && qtde < ( 60 * 60 * 24 ) )
	{
		hrs = parseInt( qtde / ( 60 * 60 ) );
		this.setHoras( hrs );
		this.setMinutos( 0 );
		this.addMinutos( parseInt( ( qtde - ( hrs * 60 * 60 ) ) / 60 ) );
	}
	else if( qtde >= ( 60 * 60 * 24 ) )
	{
		d = parseInt( qtde / ( 60 * 60 * 24 ) );
		this.setDias( d );
		this.setHoras( 0 );
		this.addHoras( parseInt( ( qtde - ( d * 60 * 60 * 24 ) ) / ( 60 * 60 ) ) );
	}
}
/* Metodos para trabalhar com minutos. */
/**
 * Define os minutos
 * @param min Numero contendo os minutos.
 */
function _setMinutos( min )
{
	if( this.validaInt( min, "Tempo.setMinutos( int ) - Número inválido." ) )
		this._minutos = min;
}
/**
 * Retorna os minutos.
 */
function _getMinutos( )
{
	if( isNaN( this._minutos ) )
		this._minutos = 0;
	return this._minutos;
}
/**
 * Adiciona segundos aos minutos já definidos.
 * @param qtde Quantidade de minutos a serem adicionados.
 */
function _addMinutos( qtde )
{
	if( this.getSegundos( ) == 59 && this.getMinutos( ) + qtde == 60 )
		this.addHoras( 1 );
	else
		this.addTempo( ( this.getMinutos( ) + qtde ) * 60 );
}
/* Metodos para trabalhar com Horas. */
/**
 * Define os horas
 * @param hr Numero contendo os horas.
 */
function _setHoras( hr )
{
	if( this.validaInt( hr, "Tempo.setHoras( int ) - Número inválido." ) )
		this._horas = hr;
}
/**
 * Retorna os horas.
 */
function _getHoras( )
{
	if( isNaN( this._horas ) )
		this._horas = 0;
	return this._horas;
}
/**
 * Adiciona segundos aos horas já definidos.
 * @param qtde Quantidade de horas a serem adicionados.
 */
function _addHoras( qtde )
{
	if( this.getSegundos( ) == 59 && this.getMinutos( ) == 59 && this.getHoras( ) + qtde == 24 )
	{
		this.setSegundos( 1 );
		this.setMinutos( 0 );
		this.setHoras( 0 );
		this.addDias( 1 );
	}
	else
		this.addTempo( ( this.getHoras( ) + qtde ) * 60 * 60 );
}
/* Metodos para trabalhar com Dias. */
/**
 * Define os Dias
 * @param hr Numero contendo os Dias.
 */
function _setDias( d )
{
	if( this.validaInt( d, "Tempo.setDias( int ) - Número inválido." ) )
		this._dias = d;
}
/**
 * Retorna os Dias.
 */
function _getDias( )
{
	if( isNaN( this._dias ) )
		this._dias = 0;
	return this._dias;
}
/**
 * Adiciona segundos aos Dias já definidos.
 * @param qtde Quantidade de Dias a serem adicionados.
 */
function _addDias( qtde )
{
	this.addTempo( ( this.getDias( ) + qtde ) * 60 * 60 * 24 );
}
/**
 * Retorna o tempo formatado.
 */
function _toString( )
{
	ss = ( this.getSegundos( ) + 100 ).toString( ).substr( 1, 2 );
	mm = (  this.getMinutos( ) + 100 ).toString( ).substr( 1, 2 );
	hh = (    this.getHoras( ) + 100 ).toString( ).substr( 1, 2 );

	dd = this.getDias( );

	if( dd == 0 )
		return hh + ":" + mm + ":" + ss;
	else if( dd == 1 )
		return dd + " dia e " + hh + ":" + mm + ":" + ss;
	else
		return dd + " dias e " + hh + ":" + mm + ":" + ss;
}

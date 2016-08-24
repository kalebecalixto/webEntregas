function ScrollerBar( divID, divItensBgID, divItensID, x, y, width, height, visible, scrollSpeed )
{
	this._divObj        = null;
	this._divID         = divID;
	this._divItensBgObj = null;
	this._divItensBgID  = divItensID;
	this._divItensObj   = null;
	this._divItensID    = divItensID;
	this._visible       = visible;
	this._scrollSpeed   = scrollSpeed;
	//
	this._ox = x;
	this._oy = y;
	this._ow = width;
	this._oh = height;
	//
	this._x      = 0;
	this._y      = 0;
	this._width  = 0;
	this._height = 0;
	//
	this._scrollTimeout = 0;
	
	//
	this.isVisible = function( )
	{
		return this._visible;
	}
	
	//
	this.init = function( )
	{
		this._divObj        = document.getElementById( this._divID );
		this._divItensBgObj = document.getElementById( this._divItensBgID );
		this._divItensObj   = document.getElementById( this._divItensID );
		
		//previne tamanhos percentuais.
		this._x      = ( this._ox.toString( ).indexOf( "%" ) >= 0 ) ? this._calculateX( ) : this._ox;
		this._y      = ( this._oy.toString( ).indexOf( "%" ) >= 0 ) ? this._calculateY( ) : this._oy;
		this._width  = ( this._ow.toString( ).indexOf( "%" ) >= 0 ) ? this._calculateWidth( ) : this._ow;
		this._height = ( this._oh.toString( ).indexOf( "%" ) >= 0 ) ? this._calculateHeight( ) : this._oh;
		
		with( this._divItensBgObj.style )
		{
			width      = this._width - 42;
		}
		
		with( this._divObj.style )
		{
			left = document.body.scrollLeft + ( this.isVisible( ) ) ? this._x : ( this._width * -1 ) - 10;
			top  = document.body.scrollTop + this._y;
			
			width  = this._width;
			height = this._height;
		}
	}
	
	//
	this.repaint = function( )
	{
		this.init( );
	}
	
	//
	this.show = function( )
	{
		this._divObj.style.left = this._x;
		
		this._visible = true;
	}
	
	//
	this.hide = function( )
	{
		this._divObj.style.left = ( this._width * -1 ) - 10;
		this._divItensBgObj.scrollLeft = 0;
		
		this._visible = false;
	}
	
	//
	this.toggleVisible = function( )
	{
		if( this.isVisible( ) )
			this.hide( );
		else
			this.show( );
	}
	
	//
	this.scrollLeft = function( )
	{
		this.scroll( this._divItensBgID, -10 );
	}
	
	//
	this.scrollRight = function( )
	{
		this.scroll( this._divItensBgID, +10 );
	}
	
	this.scroll = function( objId, x )
	{
		if( this.isVisible( ) )
			_scroll( objId, x );
	}
	
	//
	this.scrollStop = function( )
	{
		clearTimeout( this._scrollTimeout );
	}
	
	//
	this._calculateX = function( )
	{
		return ( document.body.clientWidth * parseInt( this._ox ) ) / 100;
	}
	
	//
	this._calculateY = function( )
	{
		return ( document.body.clientHeight * parseInt( this._oy ) ) / 100;
	}
	
	//
	this._calculateWidth = function( )
	{
		return ( document.body.clientWidth * parseInt( this._ow ) ) / 100;
	}
	
	//
	this._calculateHeight = function( )
	{
		return ( document.body.clientHeight * parseInt( this._oh ) ) / 100;
	}
}

function _scroll( objId, x )
{
	var obj = document.getElementById( objId );
	
	obj.scrollLeft -= x;
	
	sbar._scrollTimeout = setTimeout( "_scroll( '"+objId+"', "+x+" )", 50 );
}
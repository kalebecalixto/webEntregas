<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/fscombo.js -->
/** Indica qual combo está sendo utilizado(desdobrado) para ser fechado caso outro combo seja aberto. */
var _active = null;

/**
 * 
 *
 * @author Diego R. Drumond
 * @version 1.0 25-01-2006
 */
function FSCombo( name, width, height, readonly, img, defaultValue )
{
    this.name = name;
    this.width = width;
    this.height = height;
    this.readonly = readonly;
    this.img = img;
    this.space_width = 2;

    this.value = defaultValue;
    this.selectedIndex = -1;
    this.alignment = "left";

    this.animSpeed = 100;
    this.timer = null;
    this.counter= null;

    this.fold = true;

    this.onclick = null;
    this.onchange = null;

    this.animations = new Array( );

    this.options = new Array( );
    //
    this.addOption = function( text, value )
    {
        this.options[ this.options.length ] = new FSComboOption( text, value );
    }
    //
    this.toString = function( )
    {
        with( this )
        {
            var output = "";

            output += "<table width='"+width+"' height='"+height+"' border='0' cellspacing='0' cellpadding='0'>" +
                        " <tr>";

            if( readonly )
                output += "<td onclick='_hideActive("+name+");"+name+".show();"+( onclick ? onclick+"("+name+");" : "" )+
                            "' class='fscombo'><input class='fscombo_text' style='cursor: Default; text-align: "+alignment+";' id='"+this.name+"' readonly></td>";
            else
                output += "<td class='fscombo'><input class='fscombo_text' style='text-align: "+alignment+"' id='"+this.name+"' onfocus='_hideActive("+name+");"+
                            name+".highlight(this,\"fscombo_text_highlight\")' onblur='"+name+".highlight(this,\"fscombo_text\")'' " +
                            "onchange='"+name+".changeValue(this.value);"+( onchange ? onchange+"("+name+");" : "" )+"'></td>";

            output += "   <td width='"+space_width+"'></td><td onclick='_hideActive("+name+");"+name+".show();"+( onclick ? onclick+"("+name+");" : "" ) +
                        "' class='fscombo_button' onmouseout='"+name+".highlight(this,\"fscombo_button\")'" +
                        " onmouseover='"+name+".highlight(this,\"fscombo_button_highlight\")'>" +
                        "<label><img src='"+img+"'></label></td>" +
                        " </tr>" +
                        " <tr>" +
                        "   <td colspan='2'>" +
                        "     <div id='options_"+name+"' class='fscombo_options' style='position: absolute; z-index: 1; visibility: hidden; width: "+width+"px;'>" +
                        "       <table width='100%' border='0' cellspacing='0' cellpadding='0'>";
            for( i = 0; i < options.length; i++ )
            {
                output += "<tr>" +
                            "  <td height='"+height+"' onclick='"+name+".selectIndex("+i+");"+
                            "' class='fscombo_option' onmouseout='"+name+".highlight(this,\"fscombo_option\")'"+
                            " onmouseover='"+name+".highlight(this,\"fscombo_option_highlight\")'><label>"+options[ i ].text+"</label></td>" +
                            "</tr>";	
            }
            output += "       </table>" +
                        "     </div>" +
                        "   </td>" + 
                        "</tr></table>";

            return output;
        }
    }
    //
    this.getTextFromValue = function( val )
    {
        with( this )
        {
            for( var i = 0; i < options.length; i++ )
            {
                if( options[ i ].value == val )
                    return options[ i ].text;
            }

            return val;
        }
    }

    //
    this.selectIndex = function( ind )
    {
        with( this )
        {
            if( ind != selectedIndex )
            {
                selectedIndex = ind;
                value = options[ ind ].value;

                campo = document.getElementById( name );
                campo.value = options[ ind ].text;

                if( onchange )
                    onchange( this );
            }
            show( false );
        }
    }
    //
    this.setValue = function( val )
    {
        with( this )
        {
            for( var j = 0; j < options.length; j++ )
                if( options[ j ].value == val )
                {
                    selectIndex( j );
                    return j;
                }

            value = val;

            document.getElementById( name ).value = value;

            if( onchange )
                    onchange( this );

            return val;
        }
    }
    //
    this.changeValue = function( val )
    {
        with( this )
        {
            if( val != value  )
            {
                value = val;
                selectedIndex = -1;

                show( false );

                if( onchange )
                    onchange( this );
            }
        }
    }
    //
    this.highlight = function( obj, css )
    {
        obj.className = css;
    }
    //
    this.show = function( sh )
    {
        with( this )
        {
            this.timer |= 0;
            this.counter |= 0;

            if( arguments.length == 0 )
            {
                sh = fold;
                fold = !fold;
            }
            else
                fold = !sh;

            opts = document.getElementById( "options_" + name );

            clearTimeout( timer );
            if( sh && !counter )
                opts.style.visibility = 'visible';

            for( a = 0; a < animations.length; a++ )
                animations[ a ]( opts, counter );

            counter += animSpeed * ( sh ? 1 : -1 );

            if( counter > 100 )
            {
                counter = 100;

                _active = this;
            }
            else if( counter <= 0 )
            {
                counter = 0;
                opts.style.visibility = 'hidden';

                _active = null;
            }
            else
                timer = setTimeout( '_fscombo_show( '+sh+', '+name+' )', 50 );
        }
    }
}

/**
 * 
 *
 * @author Diego R. Drumond
 * @version 1.0 25-01-2006
 */
function FSComboOption( text, value )
{
    this.text = text;
    this.value = value;

    this.toString = function( )
    {
        with( this )
            return text + '=' + value;
    }
}

/**
 * 
 *
 * @author Diego R. Drumond
 * @version 1.0 25-01-2006
 */
function _hideActive( from )
{
    if( _active && _active != from )
        _active.show( false );
}

/**
 * 
 *
 * @author Diego R. Drumond
 * @version 1.0 25-01-2006
 */
function _fscombo_show( sh, from )
{
    if( from )
        from.show( sh );
}
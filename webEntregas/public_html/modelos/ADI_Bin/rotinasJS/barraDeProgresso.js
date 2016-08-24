<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/barraDeProgresso.js -->
var bp_bars_num = 50;
var bp_style = "border: 0px;";
var bp_style2 = "border: 0px;";
var bp_bar_on_style = "border: 0px solid #000000; width: 3px; height: 12px;";
var bp_bar_off_style = "border: 0px solid #000000; width: 3px; height: 12px;";
var bp_bar_sel_style = "border: 0px solid #000000; width: 3px; height: 12px; background-Color: #000066";
var bp_perc_style = "width: 10px; height: 14px; font-size: 12px; font-family: Courier New, Courier, mono; color: #000000; width: 31px; text-align: center";
var bp_pos_max = 50;

/**
 * Função que imprime uma barra de progresso.
 *
 * @version 1.0 20/09/2005
 * @author Diego R. Drumond
 */
function barraDeProgresso( )
{
	document.write( "<table style='" + bp_style + "' align='center' cellpadding='0' cellspacing='0'><tr>" );
	for( i = 0; i < bp_bars_num; i++ )
	{
		document.write( "<td><div id='num"+i+"' style='" + bp_bar_off_style + "'></td>" );
	}
	document.write( "</tr></table>" );
}

function barraDeProgressoCompleta( )
{
    var ret = "";
	ret += "<table style='" + bp_style + "' align='center' cellpadding='0' cellspacing='0'><tr>";
	for( i = 0; i < 125; i++ )
	{
		ret += "<td><div id='num"+i+"' style='" + bp_bar_sel_style + "'></td>";
	}
	ret += "</tr></table>";

    return ret;
}

function percentual()
{
    document.write( "<table style='" + bp_style2 + "' align='center' cellpadding='0' cellspacing='0'><tr>" );
    document.write( "<td style='" + bp_perc_style + "' id='bp_percentual'><b>Iniciando...</b></td>" );
    document.write( "</tr></table>" );
}

function percentualFinalizado()
{
    var ret = "";

    ret += "<table style='" + bp_style2 + "' align='center' cellpadding='0' cellspacing='0'><tr>";
    ret += "<td style='" + bp_perc_style + "' id='bp_percentual'><b>Finalizado!</b></td>";
    ret += "</tr></table>";

    return ret;
}

/**
 * Função que move a barra de progresso.
 *
 * @version 1.0 20/09/2005
 * @author Diego R. Drumond
 */
function moveBarraDeProgresso( bp_pos )
{
	if( bp_pos == 0 )
		bp_pos = 1;

	perc = ( bp_pos * 100 ) / bp_pos_max;
	
	if( ( bp_pos * bp_bars_num ) / bp_pos_max > bp_bars_num )
		return;
	
	for( i = 0; i < ( bp_pos * bp_bars_num ) / bp_pos_max; i++ )
		document.getElementById( "num"+i ).style.backgroundColor = "#D8A75E";
	for( i++; i < bp_bars_num; i++ )
		document.getElementById( "num"+i ).style.backgroundColor = "WHITE";
    
        percentualFicticio = Math.round( perc );
        
        if(percentualFicticio == 100 && bp_pos != bp_pos_max)
            percentualFicticio = 99;
    
	document.getElementById( "bp_percentual" ).innerHTML = percentualFicticio + "%";
}
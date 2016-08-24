/**  */
Yoffset = 10;

/**  */
var yyy = -1000;

/**  */
var startY = 0;

/**  */
var ns4 = document.layers

/**  */
var ns6 = document.getElementById && !document.all

/**  */
var ie4 = document.all

/**  */
currentY = 0;

/**  */
lastScrollY = 1;

/**  */
NS = ( document.layers ) ? 1 : 0;

/**  */
IE = ( document.all ) ? 1 : 0;

/**  */
opcoes_fechado = true;

/**  */
isLuceneQuery = false;

/**
 * 
 *
 * @author Diego R. Drumond
 * @version 1.0 01.01.2006
 */
function submeteConsulta( )
{
    var frm = document.forms[ 0 ];
    
    alertUser = false;
    
    if( isLuceneQuery )
    {
        if( frm[ "noField-and" ] )
        {
            and    = trim( frm[ "noField-and" ].value );
            phrase = trim( frm[ "noField-phrase-input" ].value );
            or     = trim( frm[ "noField-or" ].value );
            not    = trim( frm[ "noField-not" ].value );

            if( and != '' || phrase != '' || or != '' || not != '' )
                doSubmitForm( frm );
        }
        
        if( !doCheckLuceneQuery( frm.txtFiltro ) )
        {
            alert( 'Foi encontrado um erro nos parâmetros de pesquisa: "' + frm.txtFiltro.value + '"' );
            return false;
        }
    }
    
    if( !document.forms[ 0 ].txtFiltro && trim( document.forms[ 0 ].txtFiltro.value ) == "" )
    {
        alert( 'Informe o texto a ser pesquisado.' );
        return false;
    }
    
    document.forms[ 0 ].pagina.value = 0;
    return true;
}

/**
 * Função para definir qual será a próxima página a ser exibida na consulta.
 *
 * @author Diego R. Drumond
 * @version 1.0 30.12.2005
 * @param pos Número de páginas a serem incrementados ou decrementados da página atual.
 * @param relativo Indica se a posição é passada como parâmetro será relativa a posição
 *                 atual ou será o número da página para qual o usuário será direcionado.
 */
function paginacao( pos, relativo )
{

    if( ! document.forms[ 0 ].pagina )
        return;
    
    //se o valor for relativo, adiciona o valor passado ao número da página atual.
    if( relativo )
        document.forms[ 0 ].pagina.value = ( document.forms[ 0 ].pagina.value * 1 ) + pos;
    else
        document.forms[ 0 ].pagina.value = pos;

    if( ( document.forms[ 0 ].pagina.value * 1 ) < 0 )
        document.forms[ 0 ].pagina.value = 0;

    else if( ( document.forms[ 0 ].pagina.value * 1 ) > ( document.forms[ 0 ].numeroPaginas.value * 1 ) - 1 )
        document.forms[ 0 ].pagina.value = document.forms[ 0 ].numeroPaginas.value - 1;

    document.forms[ 0 ].submit( );
}

/**
 * 
 *
 * @author Diego R. Drumond
 * @version 1.0 13.01.2006
 */
function consultaQual( letra )
{
    if( letra == "" )
    {
        if( !confirm( GENBA0086 ) )
            return;
    }
    document.forms[ 0 ].txtFiltro.value = letra;
    submeteConsulta( );
}

/**
 * 
 *
 * @author Diego R. Drumond
 * @version 1.0 13.01.2006
 */
function mostraOpcoes( )
{
    if( opcoes_fechado )
    {
        tipoResult = trim( document.forms[ 0 ].txtTipoResultado.value );
        formatoTxt = trim( document.forms[ 0 ].txtFormatoTexto.value );
        registros  = trim( document.forms[ 0 ].registrosPorPagina.value );

        if( tipoResult == '' )
            tipoResult = document.forms[ 0 ].txtTipoResultado.value = 0;

        if( formatoTxt == '' )
            formatoTxt = document.forms[ 0 ].txtFormatoTexto.value = 2;

        if( registros == '' )
            registros = document.forms[ 0 ].registrosPorPagina.value = 20;

        if( !isLuceneQuery )
        {
            document.getElementById( "opcoes_consulta" ).innerHTML = '' +
                    '<table class="table_opcoes_content" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                    '  <tr> ' +
                    '	<th colspan="2">Procurar o texto</th>' +
                    '	<th colspan="2">Procurar resultados</th>' +
                    '	<th colspan="2">Registros por p&aacute;gina</th>' +
                    '  </tr>' +
                    '  <tr> ' +
                    '    <td width="5"></td>' +
                    '    <td><input type="radio" id="rdoFormatoTexto" name="rdoFormatoTexto" ' + ( ( formatoTxt == 0 ) ? 'checked' : '' ) +
                    ' onClick="document.forms[ 0 ].txtFormatoTexto.value = 0">Com todas as letras mai&uacute;sculas</td>' +
                    '    <td width="5"></td>' +
                    '    <td><input type="radio" name="rdoTipoResultado" ' + ( ( tipoResult == 0 ) ? 'checked' : '' ) +
                    ' onClick="document.forms[ 0 ].txtTipoResultado.value = 0">Que come&ccedil;em com texto informado</td>' +
                    '    <td width="10"></td>' +
                    '    <td><input type="text" name="txtRegistrosPorPagina" value="' + registros + '"'+
                    ' onBlur="document.forms[ 0 ].registrosPorPagina.value = this.value" class="texto" size="5" maxlength="3"></td>' +
                    '  </tr>' +
                    '  <tr>' +
                    '    <td></td>' +
                    '    <td><input type="radio" id="rdoFormatoTexto" name="rdoFormatoTexto" ' + ( ( formatoTxt == 1 ) ? 'checked' : '' ) +
                    ' onClick="document.forms[ 0 ].txtFormatoTexto.value = 1">Com todas as letras min&uacute;sculas</td>' +
                    '    <td></td>' +
                    '    <td><input type="radio" name="rdoTipoResultado" ' + ( ( tipoResult == 1 ) ? 'checked' : '' ) +
                    ' onClick="document.forms[ 0 ].txtTipoResultado.value = 1">Que terminem com o texto informado</td>' +
                    '    <td></td>' +
                    '    <td></td>' +
                    '  </tr>' +
                    '  <tr>' +
                    '    <td></td>' +
                    '    <td><input type="radio" id="rdoFormatoTexto" name="rdoFormatoTexto" ' + ( ( formatoTxt == 2 ) ? 'checked' : '' ) +
                    ' onClick="document.forms[ 0 ].txtFormatoTexto.value = 2">Da forma digitada</td>' +
                    '    <td></td>' +
                    '    <td><input type="radio" name="rdoTipoResultado" ' + ( ( tipoResult == 2 ) ? 'checked' : '' ) +
                    ' onClick="document.forms[ 0 ].txtTipoResultado.value = 2">Que contenham o texto informado</td>' +
                    '    <td></td>' +
                    '    <td></td>' +
                    '  </tr>' +
                    '</table>';

            document.getElementById( "rdoFormatoTexto" ).focus( );
        }
        else
        {
            document.getElementById( "opcoes_consulta" ).innerHTML = ''+
                '<table class="table_opcoes_content" width="100%" border="0" cellspacing="0" cellpadding="0">' +
                '<tr>'+
                '  <th width="14%"></th>'+
                '  <td width="17%"></td>'+
                '  <tr>'+
                '    <td rowspan="4" nowrap>'+
                '      <div align="left"><b>Procurar resultados&nbsp;&nbsp;</b>'+
                '        <input name="noField-andModifier" value="+|0" type="hidden">'+
                '        <input name="noField-phraseModifier" value="+|+" type="hidden">'+
                '        <input name="noField-orModifier" value=" |+" type="hidden">'+  
                '        <input name="noField-notModifier" value="-|0" type="hidden">'+
                '      </div></td>'+
                '    <td nowrap class="bodytext">com <strong>todas</strong> as palavras</td>'+
                '    <td width="13%" class="bodytext">'+
                '      <input type="text" name="noField-and" class="texto" size="25"></td>'+
                '    <td>'+
                '    <td><input type="text" name="txtRegistrosPorPagina" value="' + registros + '" onBlur="document.forms[ 0 ].registrosPorPagina.value = this.value" class="texto" size="5" maxlength="3"> registros por página' +
                '    </td>'+
                '  </tr>'+
                '  <tr>'+
                '    <td nowrap class="bodytext">com a <strong>express&atilde;o</strong></td>'+
                '    <td class="bodytext">'+
                '      <input type="text" name="noField-phrase-input" class="texto" size="25">'+
                '      <input type="hidden" name="noField-phrase">'+
                '    </td>'+
                '    <td rowspan="3">&nbsp;</td>'+
                '  </tr>'+
                '  <tr>'+
                '    <td nowrap class="bodytext">com <strong>qualquer uma</strong> das palavras</td>'+
                '    <td class="bodytext">'+
                '      <input type="text" name="noField-or" class="texto" size="25">'+
                '    </td>'+
                '  </tr>'+
                '  <tr>'+
                '    <td nowrap class="bodytext"><strong>sem</strong> as palavras</td>'+
                '    <td class="bodytext">'+
                '      <input type="text" name="noField-not" class="texto" size="25">'+
                '    </td>'+
                '  </tr>'+
                '</table>';
                
            document.forms[ 0 ][ "noField-and" ].focus( );
        }
        opcoes_fechado = false;
    }
    else
    {
        document.getElementById( "opcoes_consulta" ).innerHTML = '<br> ';
        opcoes_fechado = true;
        
        document.forms[ 0 ].txtFiltro.focus( );
    }

    return false;
}

/**
 * 
 *
 * @author Diego R. Drumond
 * @version 1.0 13.01.2006
 */
function moveCabecalho( )
{
	if( IE )
		diffY = document.body.scrollTop; 

	else if( NS )
		diffY = self.pageYOffset;

	if( diffY > startY )
		diffY -= startY;
	else
	{
		diffY = lastScrollY = 0;
		
		if( IE )
			document.all.cabecalho_consulta.style.pixelTop = startY - document.all.cabecalho_consulta.height;
		else if( NS )
			document.cabecalho_consulta.top = startY - document.cabecalho_consulta.height;
			
		return;
	}

	if( diffY != lastScrollY )
	{
		percent = 1 * ( diffY - lastScrollY );
		if( percent > 0 )
			percent = Math.ceil( percent );
		else 
			percent = Math.floor( percent );
			
		if( IE )
			document.all.cabecalho_consulta.style.pixelTop += percent;
			
		if( NS )
			document.cabecalho_consulta.top += percent;
			
		lastScrollY = lastScrollY + percent;
	}
}
/*
if( NS || IE )
	action = window.setInterval( "moveCabecalho()", 1000 );
*/

function doSubmitForm( frm )
{
    if( frm[ "noField-phrase-input" ].value.length > 0 )
        frm[ "noField-phrase" ].value = quote( frm[ "noField-phrase-input" ].value );
    else if( frm[ "noField-phrase" ].value.length > 0 )
        frm[ "noField-phrase" ].value = '';
    
    doMakeQuery( frm.txtFiltro );
}

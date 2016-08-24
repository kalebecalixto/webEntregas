var ie  = document.all;
var ns6 = document.getElementById && !document.all;

function popdate( obj, div, ddd ){
    if( ddd.length != 10 ) {
        today = new Date();
    } else {
        ddd = formataDatas( ddd, "DD/MM/YYYY", "MM/DD/YYYY" );
        today = new Date( ddd );
    }

    date_Form = eval ( obj );
    if ( date_Form.value.length != 10 ) { 
        date_Form = new Date();
    } else {
        date_Form = new Date( formataDatas( date_Form.value, "DD/MM/YYYY", "MM/DD/YYYY" ) );
    }
  
    ano = today.getFullYear();
    mmonth = today.getMonth ();
    day = today.getDate();
  
    umonth = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
    days_Feb = (!(ano % 4) ? 29 : 28);
    days = new Array (31, days_Feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    if ( (mmonth < 0) || (mmonth > 11) )  
        alert(mmonth);

    if ( (mmonth - 1) == -1 ) { 
        month_prior = 11; 
        ano_prior = ano - 1;
    } else {
        month_prior = mmonth - 1; 
        ano_prior = ano;
    }

    if ( (mmonth + 1) == 12) {
        month_next  = 0;
        ano_next  = ano + 1;
    } else {
        month_next  = mmonth + 1; 
        ano_next  = ano;
    }
	
    if( ie ){
        txt = "<table bgcolor='#efefff' style='border:solid #330099; border-width:2' cellspacing='0' cellpadding='3' border='0' width='150' height='165'>\n"
        txt += "<tr bgcolor='#FFFFFF'>\n<td colspan='7' align='center'><table border='0' cellpadding='0' width='100%' bgcolor='#FFFFFF'>\n<tr>\n"
        txt += "<td width='20%' align='center'><a href=javascript:parent.popdate('"+obj+"','"+div+"','"+( acreZero( day, 2 )+"/"+acreZero( (mmonth+1), 2 )+"/"+(ano-1).toString() )+"') class='Cabecalho_Calendario' title='Ano Anterior'><<</a></td>\n"
        txt += "<td width='20%' align='center'><a href=javascript:parent.popdate('"+obj+"','"+div+"','"+( acreZero( day, 2 )+"/"+acreZero( (month_prior+1), 2 ) +"/" + ano_prior.toString() )+"') class='Cabecalho_Calendario' title='Mês Anterior'><</a></td>\n"
        txt += "<td width='20%' align='center'><a href=javascript:parent.popdate('"+obj+"','"+div+"','"+( acreZero( day, 2 )+"/"+acreZero( (month_next+1), 2 )+"/" + ano_next.toString() )+"') class='Cabecalho_Calendario' title='Próximo Mês'>></a></td>\n"
        txt += "<td width='20%' align='center'><a href=javascript:parent.popdate('"+obj+"','"+div+"','"+( acreZero( day, 2 )+"/"+acreZero( (mmonth+1), 2 )+"/"+(ano+1).toString() )+"') class='Cabecalho_Calendario' title='Próximo Ano'>>></a></td>\n"
        txt += "<td width='20%' align='right'><a href=javascript:parent.force_close('"+div+"') class='Cabecalho_Calendario' title='Fechar Calendário'><b>X</b></a></td></tr></table></td></tr>\n"
        txt += "<tr><td colspan='7' align='right' bgcolor='#ccccff' class='mes'><a href=javascript:parent.pop_year('"+obj+"','"+div+"','" + (mmonth+1) + "') class='mes'>" + ano.toString() + "</a>\n"
        txt += " <a href=javascript:parent.pop_month('"+obj+"','"+div+"','" + ano + "') class='mes'>" + umonth[mmonth] + "</a> <div id='popd' style='position:relative'></div></td></tr>\n"
        txt += "<tr bgcolor='#330099'><td width='14%' class='dia' align=center><b>Dom</b></td><td width='14%' class='dia' align=center><b>Seg</b></td><td width='14%' class='dia' align=center><b>Ter</b></td><td width='14%' class='dia' align=center><b>Qua</b></td><td width='14%' class='dia' align=center><b>Qui</b></td><td width='14%' class='dia' align=center><b>Sex<b></td><td width='14%' class='dia' align=center><b>Sab</b></td></tr>\n"
    }else if ( ns6){
        txt = "<table bgcolor='#efefff' style='border:solid #330099; border-width:2' cellspacing='0' cellpadding='3' border='0' width='150' height='165'>\n"
        txt += "<tr bgcolor='#FFFFFF'>\n<td colspan='7' align='center'><table border='0' cellpadding='0' width='100%' bgcolor='#FFFFFF'>\n<tr>\n"
        txt += "<td width='20%' align='center'><a href=javascript:popdate('"+obj+"','"+div+"','"+( acreZero( day, 2 )+"/"+acreZero( (mmonth+1), 2 )+"/"+(ano-1).toString() )+"') class='Cabecalho_Calendario' title='Ano Anterior'><<</a></td>\n"
        txt += "<td width='20%' align='center'><a href=javascript:popdate('"+obj+"','"+div+"','"+( acreZero( day, 2 )+"/"+acreZero( (month_prior+1), 2 ) +"/" + ano_prior.toString() )+"') class='Cabecalho_Calendario' title='Mês Anterior'><</a></td>\n"
        txt += "<td width='20%' align='center'><a href=javascript:popdate('"+obj+"','"+div+"','"+( acreZero( day, 2 )+"/"+acreZero( (month_next+1), 2 )+"/" + ano_next.toString() )+"') class='Cabecalho_Calendario' title='Próximo Mês'>></a></td>\n"
        txt += "<td width='20%' align='center'><a href=javascript:popdate('"+obj+"','"+div+"','"+( acreZero( day, 2 )+"/"+acreZero( (mmonth+1), 2 )+"/"+(ano+1).toString() )+"') class='Cabecalho_Calendario' title='Próximo Ano'>>></a></td>\n"
        txt += "<td width='20%' align='right'><a href=javascript:force_close('"+div+"') class='Cabecalho_Calendario' title='Fechar Calendário'><b>X</b></a></td></tr></table></td></tr>\n"
        txt += "<tr><td colspan='7' align='right' bgcolor='#ccccff' class='mes'><a href=javascript:pop_year('"+obj+"','"+div+"','" + (mmonth+1) + "') class='mes'>" + ano.toString() + "</a>\n"
        txt += " <a href=javascript:pop_month('"+obj+"','"+div+"','" + ano + "') class='mes'>" + umonth[mmonth] + "</a> <div id='popd' style='position:relative'></div></td></tr>\n"
        txt += "<tr bgcolor='#330099'><td width='14%' class='dia' align=center><b>Dom</b></td><td width='14%' class='dia' align=center><b>Seg</b></td><td width='14%' class='dia' align=center><b>Ter</b></td><td width='14%' class='dia' align=center><b>Qua</b></td><td width='14%' class='dia' align=center><b>Qui</b></td><td width='14%' class='dia' align=center><b>Sex<b></td><td width='14%' class='dia' align=center><b>Sab</b></td></tr>\n"
    }

    today1 = new Date( (mmonth+1).toString()+"/01/"+ano.toString() );
    diainicio = today1.getDay () + 1;
    week = d = 1;
    start = false;

    for ( n=1; n <= 42; n++ ){
        if ( week == 1 )  
            txt += "<tr bgcolor='#efefff' align='center'>\n";

        if ( week == diainicio ) 
            start = true;

        if ( d > days[mmonth] ) 
            start=false;

        if (start) {
            dat = new Date( (mmonth+1) + "/" + acreZero( d, 2 ) + "/" + ano.toString() );

            if( ( dat.getDate() == date_Form.getDate() ) 
            && ( dat.getMonth() == date_Form.getMonth() )
            && ( dat.getFullYear() == date_Form.getFullYear() ) ){ 
                if( ie ){
                    txt += "<td bgcolor='#FFCC00' align='center'><a href=javascript:parent.block('"+ acreZero( d, 2 ) + "/" + acreZero( (mmonth+1), 2 ) + "/" + ano.toString() +"','"+ obj +"','" + div +"') class='data'>"+ acreZero( d, 2 ) + "</a></td>\n";
                }else if( ns6 ){
                    txt += "<td bgcolor='#FFCC00' align='center'><a href=javascript:block('"+ acreZero( d, 2 ) + "/" + acreZero( (mmonth+1), 2 ) + "/" + ano.toString() +"','"+ obj +"','" + div +"') class='data'>"+ acreZero( d, 2 ) + "</a></td>\n";
                }                
            }else{
                if( ie ){
                    txt += "<td align='center'><a href=javascript:parent.block('"+ acreZero( d, 2 ) + "/" + acreZero( (mmonth+1), 2 ) + "/" + ano.toString() +"','"+ obj +"','" + div +"') class='data'>"+ acreZero( d, 2 ) + "</a></td>\n";
                }else if( ns6 ){
                    txt += "<td align='center'><a href=javascript:block('"+ acreZero( d, 2 ) + "/" + acreZero( (mmonth+1), 2 ) + "/" + ano.toString() +"','"+ obj +"','" + div +"') class='data'>"+ acreZero( d, 2 ) + "</a></td>\n";
                }
            }

            d ++;
        }else { 
            txt += "<td class='data' align='center'> </td>\n";
        }

        week ++;
        if ( week == 8 ) { 
            week = 1; 
            txt += "</tr>\n";	
        }		 
    }
    limpaSpan();
    txt += "</table>\n";
	document.getElementById(div).style.visibility = 'visible'

     if( ie ){
        document.getElementById(div).innerHTML = "<IFRAME name='ifraCalendario' frameBorder='0' marginwidth='0' marginheight='0' width='190' height='171' scrolling='no'></IFRAME>";
        ifraCalendario.document.write( '<link href="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/estilosCSS/estilo_pag_adi_ie.css" rel="stylesheet" />' );
        ifraCalendario.document.write( txt );
    }else if( ns6 ){
        document.getElementById(div).innerHTML = txt ;
    }
}
  
// função para exibir a janela com os meses
function pop_month( obj, div, ano ){
    txt  = "<table bgcolor='#efefff' style='border:solid #330099; border-width:2' cellspacing='0' cellpadding='3' border='0' width='150' height='165'>\n"
    txt += "<tr bgcolor='#FFFFFF'>\n<td colspan='7' align='center'><table border='0' cellpadding='0' width='100%' bgcolor='#FFFFFF'>\n<tr>\n"
    txt += "<td width='80%' align='center'></td>\n"

    if( ie ){
        txt += "<td width='20%' align='right'><a href=javascript:parent.force_close('"+div+"') class='Cabecalho_Calendario' title='Fechar Calendário'><b>X</b></a></td></tr></table></td></tr>\n"
    }else if( ns6 ){
        txt += "<td width='20%' align='right'><a href=javascript:force_close('"+div+"') class='Cabecalho_Calendario' title='Fechar Calendário'><b>X</b></a></td></tr></table></td></tr>\n"
    }

    l = 1
    for (n = 0; n < 12; n++){ 
        if (l == 1) txt += "<tr>\n"

        txt += "<td align='center' class='Cabecalho_Calendario' >\n";
        
        if( ie ){
            txt += "<a href=javascript:parent.popdate('"+obj+"','"+div+"','"+("01/" + acreZero( (n+1), 2 ) + "/" + ano.toString())+"')>\n";
        }else if( ns6 ){
            txt += "<a href=javascript:popdate('"+obj+"','"+div+"','"+("01/" + acreZero( (n+1), 2 ) + "/" + ano.toString())+"')>\n";
        }

        txt += umonth[n] +"</a></td>\n"; 
        l++
        if (l == 3){
            txt += "</tr>"; 
            l = 1 
        }
    }

    txt += "</tr></table>"
    if( ie ){
        document.getElementById(div).innerHTML = "<IFRAME name='ifraCalendario' frameBorder='0' marginwidth='0' marginheight='0' width='150' height='165' scrolling='no'></IFRAME>";
        ifraCalendario.document.write( '<link href="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/estilosCSS/estilo_pag_adi_ie.css" rel="stylesheet" />' );
        ifraCalendario.document.write( txt );
    }else if( ns6 ){
        document.getElementById(div).innerHTML = txt ;
    }
}

// função para exibir a janela com os anos
function pop_year( obj, div, umonth ){
    txt  = "<table bgcolor='#efefff' style='border:solid #330099; border-width:2' cellspacing='0' cellpadding='3' border='0' width='150' height='165'>\n"
    txt += "<tr bgcolor='#FFFFFF'>\n<td colspan='7' align='center'><table border='0' cellpadding='0' width='100%' bgcolor='#FFFFFF'>\n<tr>\n"
    txt += "<td width='80%' align='center'></td>\n"

    if( ie ){
        txt += "<td width='20%' align='right'><a href=javascript:parent.force_close('"+div+"') class='Cabecalho_Calendario' title='Fechar Calendário'><b>X</b></a></td></tr></table></td></tr>\n"
    }else if( ns6 ){
        txt += "<td width='20%' align='right'><a href=javascript:force_close('"+div+"') class='Cabecalho_Calendario' title='Fechar Calendário'><b>X</b></a></td></tr></table></td></tr>\n"
    }
    
    l = 1
    for ( n = ano-10; n < ano+11; n++ ) {  
        if (l == 1) txt += "<tr>\n"

        txt += "<td align='center' class='mes' >\n"

        if( ie ){
            txt += "<a href=javascript:parent.popdate('"+obj+"','"+div+"','01/"+( acreZero( umonth, 2 ) +"/" + n) +"')>";
        }else if( ns6 ){
            txt += "<a href=javascript:popdate('"+obj+"','"+div+"','01/"+( acreZero( umonth, 2 ) +"/" + n) +"')>";
        }

        txt += n + "</a></td>\n"
        l++
        if (l == 4){
            txt += "</tr>"; 
            l = 1 
        } 
    }
    txt += "</tr></table>\n"
    if( ie ){
        document.getElementById(div).innerHTML = "<IFRAME name='ifraCalendario' frameBorder='0' marginwidth='0' marginheight='0' width='150' height='170' scrolling='no'></IFRAME>";
        ifraCalendario.document.write( '<link href="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/estilosCSS/estilo_pag_adi_ie.css" rel="stylesheet" />' );
        ifraCalendario.document.write( txt );
    }else if( ns6 ){
        document.getElementById(div).innerHTML = txt ;
    }
}

// função para fechar o calendário
function force_close(div) { 
    document.getElementById(div).style.visibility = 'hidden'
}
    
// função para fechar o calendário e setar a data no campo de data associado
function block( data, obj, div ){ 
    force_close (div)
    obj2 = eval( obj )
    obj2.value = data 
    callBackAlteraComponente();
}

function callBackAlteraComponente(){}

//função para limpar os outros calendarios abertos na tela
function limpaSpan(){
    nodes = document.getElementsByTagName('span');
    qteSpan = nodes.length;
    for( var cvb = 0; cvb < qteSpan; cvb++){        
        spanID =  nodes[cvb].getAttribute('id');
        if( spanID.substring(0,5) == 'sptxt' ) 
            nodes[cvb].innerHTML = '';
    }
}

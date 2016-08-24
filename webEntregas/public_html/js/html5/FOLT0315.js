(function() {
	var start = function () {
        var elemts = document.getElementsByTagName("a");

        for (var i = 0; i < elemts.length; i++) {
			var elemt = elemts[i];
				
			var wanted = "javascript:abreAfastamentos(";			
			var href = elemt.getAttribute('href');
			
			if (href.startsWith(wanted)) {			

				if (elemt.innerHTML=='0') {
					elemt.parentElement.insertAdjacentHTML('afterbegin', '0');
					elemt.parentElement.removeChild(elemt);										
				} else {
					var pi = wanted.length;
					var pf = href.indexOf(")'>");
					var paramStr = href.slice(pi, pf);
					var parametro = eval(paramStr);
					elemt.parametro = parametro;
										
					$(elemt).tooltipster({
						contentAsHTML: true,
						content: 'Carregando...',
						interactive: true,
						
					    functionBefore: function(origin, continueTooltip) {
					        continueTooltip();					        

					        var renderAfastamentos = function() {																					        	
					        	var fh = "<table border=\"0\" class=\"table_consulta\" cellpadding=\"2\" cellspacing=\"0\" style=\"margin-bottom:10px; margin-top:20px;\" width=\"80%\"><tr bgcolor=\"#EEE9E9\"><td class=\"cabecalho\" lign=\"center\">Afastamento</td><td class=\"cabecalho\" align=\"center\">Início</td><td class=\"cabecalho\" align=\"center\">Fim</td></tr>\n";
					        	var rt = "<tr class=\"cor1\" onMouseOver=\"this.className='mouseover';\" nMouseOut=\"this.className='cor1'\" bgcolor=\"#EEE9E9\"><td><font size=\"2\">{DESCRICAO}</font></td><td><font size=\"2\">{INICIO}</font></td><td><font size=\"2\">{FIM}</font></td></tr>\n";
					        		
				        		for (var i = 0; i < window.afastamentoRows.length; i++) {
				        			var r = window.afastamentoRows[i];
				        			
				        			var inicioAfastamentoDate = Date.parse(r.dtafastamento);
				        			var finalAfastamentoDate = Date.parse(r.dtfinalafastamento);
				        			
				        			var desc = r.descrtipoafastamento;
				        			var inicioAfastamentoStr = inicioAfastamentoDate.toString("dd/MM/yyyy");
				        			var finalAfastamentoStr = finalAfastamentoDate.toString("dd/MM/yyyy");
				        							        			
				        			var inicioAquisitivoStr = origin.context.parametro[1];
				        			var fimAquisitivoStr = origin.context.parametro[2];
				        			
				        			var inicioAquisitivoDate = Date.parse(inicioAquisitivoStr);
				        			var fimAquisitivoDate = Date.parse(fimAquisitivoStr);
				        							        			
				        			if (
					        			(
					        				(inicioAfastamentoDate >= inicioAquisitivoDate)
					        				&&
					        				(inicioAfastamentoDate <= fimAquisitivoDate)
					        			)
					        			||
					        			(
					        				(finalAfastamentoDate >= inicioAquisitivoDate)
					        				&&
					        				(finalAfastamentoDate <= fimAquisitivoDate)
						        		)
						        		||
						        		(
						        			(inicioAfastamentoDate <= fimAquisitivoDate)
						        			&&
						        			(finalAfastamentoDate >= fimAquisitivoDate)
						        		)
				        			) {
				        			
					        			var rh = rt;
					        			rh = rh.replace("{DESCRICAO}", desc);
					        			rh = rh.replace("{INICIO}", inicioAfastamentoStr);
					        			rh = rh.replace("{FIM}", finalAfastamentoStr);
					        			
					        			fh = fh + rh;
				        			}
				        		}					        		
					        	
					        	origin.tooltipster('content', fh);
					        }
					        
			        		if (! (window.afastamentosRows) ) {
					        	
					        	$.get(location.toString(), {jsJsonAfastamentos: true}, function(rows) {
					        		window.afastamentoRows = rows;
					        		
					        		renderAfastamentos();						        		
					        	});
					        } else {
					        	renderAfastamentos();
					        }
			        		
			        		
					    }
					});						
					
				}
			}
        }
    }
		
	if (window.jQuery)
		jQuery(document).ready(start);
	else 
		document.addEventListener("DOMContentLoaded", start);	
})();
					
/*
<a class="redireciona" href='javascript:abreAfastamentos(Array("Normais", "2013-01-01", "2013-12-31", "1", "1", "1", "0" ))'>0</a>
href='javascript:abreAfastamentos(Array("Normais", "2013-01-01", "2013-12-31", "1", "1", "1", "0" ))'
var path = "/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/folha/cadastros/funcionarios/afastamentos/folFuncAfastadosDaFolha_frame.jsp?";
var aa = abreAfastamentos.toString();				
var pi = aa.indexOf(path) + path.length;
var pf = aa.indexOf('"', pi);
var codPessoaSeqFuncionario = aa.slice(pi, pf);								

var requestUrl = 
	"http://localhost:8080/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/folha/cadastros/funcionarios/afastamentos/folFuncAfastadosDaFolha_con.jsp?" 
	+ codPessoaSeqFuncionario;
									
window.xData = document.createElement('iframe');
xData.setAttribute('src', requestUrl);																
document.body.appendChild(xData);
*/
function cabecalho() {
	var rodou = false;
		
	var cab = function() {		
		if (! ( (window.document) && (window.document.body) ) ) {
			setTimeout(cab, 100);
			return;
		}
		
		if (rodou) return;
		else rodou = true;

		var css = function() {
			/*
				<style type="text/css">
					.tdBarraCorModulo
					{
						background-image:url("/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/folha/bin/imagens/barraCor.jpg");
						background-repeat:repeat-x;
					}
					.tdcabecalhor1c2
					{
						background-image:url("/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r1_c2.jpg");
						background-repeat: repeat-x;
					}
					.tdcabecalhor3c2
					{
						background-image:url("/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r3_c2.jpg");
						background-repeat:repeat;
					}
					.tdcabecalhor5c3
					{
						background-image:url("/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r5_c3.jpg");
						background-repeat:repeat;
					}
					.tdCompFundoModulo
					{
						background-image:url("/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/folha/bin/imagens/tblFundo.jpg");
						background-repeat:repeat;
					}
					.tdCompTracoModulo
					{
						background-image:url("/ADI_Intranet_Root/ADI_Programacao/ADI_MaxNetADI/package/folha/bin/imagens/tblTraco.jpg");
						background-repeat:repeat-x;
					}
				</style>
			*/
		}.multiline();

		var html = function() {
			/*
				<div id="cabecalhoContent" style="position: fixed; top: 0; left: 0; z-index: 100; height: 80px; border: 0px solid red; background-color: white; width: 98%">
					<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: white">
					  <tr> 
						<td width="13" height="4"><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r1_c1.jpg" width="13" height="4" border="0" alt=""></td>
						<td width="99%" class="tdcabecalhor1c2"></td>
						<td width="13"><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r1_c3.jpg" width="13" height="4" border="0" alt=""></td>
					  </tr>
					  <tr>
						<td width="13" height="27"><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r2_c1.jpg" width="13" height="27" border="0" alt=""></td>
						<td><table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: white">
							<tr>
							  <td nowrap bgcolor="#FFFFFF"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><b>Folha De Pagamentos</font> <font size='2' color='#008B45'> &nbsp &nbsp - {nomedabase}</font></b>
							  <td align="right" bgcolor="#FFFFFF" valign="bottom"><font size="1"><table cellspacing='0' cellpadding='0' border='0'>
					<tr>
					</tr>
					</table>
							 </font></td>
							</tr>
						  </table>
						</td>
						<td width="13"><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r2_c2.jpg" width="13" height="27" border="0" alt=""></td>
					  </tr>
					  <tr>
						<td width="13" height="3"><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r3_c1.jpg" width="13" height="3" border="0" alt=""></td>
						<td width="99%" class="tdcabecalhor3c2"></td>
						<td width="13"><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r3_c3.jpg" width="13" height="3" border="0" alt=""></td>
						<td width="1"></td>
					  </tr>
					  <tr>
						<td class="tdBarraCorModulo"> <img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r4_c1.jpg" width="2" height="20" border="0" alt=""></td>
						<td class="tdBarraCorModulo">      <table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
							  <td><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><em>{descricaodatela}</em></font></td>
							  <td align="right"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong><em>{codigodatela}</em></strong> <font size="1">v01.000</font></font></td>
							</tr>
						  </table>
						</td>
						<td class="tdBarraCorModulo" align="right"><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r4_c2.jpg" width="2" height="20" border="0" alt=""></td>
					  </tr>
					  <tr>
						<td class="tdcabecalhor5c3"><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r5_c1.jpg" width="2" height="20" border="0" alt=""><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r5_c2.jpg" width="4" height="20" border="0" alt=""></td>
						<td class="tdcabecalhor5c3"><table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
							  <td valign="top"><font size="1" face="Verdana, Arial, Helvetica, sans-serif">Usu&aacute;rio: <strong>{nomedousuario}<font size="2">&nbsp;</font></strong></font></td>
							  <td width="3"><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r5_c4.jpg" width="4" height="20" border="0" alt=""></td>
							  <td valign="top"><font size="2" face="Verdana, Arial, Helvetica, sans-serif"><strong>&nbsp;</strong></font><font size="1" face="Verdana, Arial, Helvetica, sans-serif">Empresa: <strong>{nomedaempresa}	</strong></font></td>
							</tr>
						  </table></td>
						<td align="right" class="tdcabecalhor5c3"><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r5_c5.jpg" width="4" height="20" border="0" alt=""><img src="/ADI_Intranet_Root/ADI_Programacao/ADI_Bin/imagens/tabelas/cabecalho_r5_c6.jpg" width="2" height="20" border="0" alt=""></td>
					  </tr>
					</table>
					<br />
					<br />
				</div>
				<div id="cabecalhoFundo" style="height: 80px; background-color: white: z-index: 50; border: 0px solid blue; width: 98%"></div>						
			*/
		}.multiline();

		$.post(url.jsp(), {action: 'cabecalho'}, function(data) {
                        cabecalho.data = data;
			html = html.replace('{nomedabase}', data.nomedabase);
			html = html.replace('{nomedousuario}', data.codusuario);
			html = html.replace('{nomedaempresa}', data.nomeempresa);
			html = html.replace('{codigodatela}', data.codigotela);
			html = html.replace('{descricaodatela}', data.descricaotela);
			
			document.head.insertAdjacentHTML("beforeend", css);
			document.body.insertAdjacentHTML("afterbegin", html);
		}).fail(function(xhr) {
			console.error(xhr.responseText);
			
			try { alertify.alert(xhr.response.error.message); }
			catch(ex) { alertify.alert("Falha");}
		});
	}
	/*
	document.addEventListener("DOMContentLoaded", cab);
	
	if (window.onload)
		var wol = window.onload;
	else
		var wol = function() {}
	
	window.onload = function() {
		wol();
		cab();
	}
	
	if (window.jQuery)
		jQuery(cab);
	
	setTimeout(cab, 1000);	
	*/
	cab();
}
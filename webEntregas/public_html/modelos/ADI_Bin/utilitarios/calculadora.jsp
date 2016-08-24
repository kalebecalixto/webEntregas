<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/utilitarios/calculadora.jsp */ %>
<html>
	<head>
		<title>Calculadora - ADI</title>
		<style>
			.texto  { border: 1px solid #2f7739; background: #ffffff;}
			.texto2 { cursor: hand; border: 1px solid #2f7739; background: #ffffff; Font: bold}
		</style>
	</head>
	<BODY bgcolor=#c7f9f9 topMargin=0 leftMargin=0>
	<CENTER>
		<FORM>
			<table border=2 bordercolor=#90b8cc>
				<tr bgcolor=#c7f9f9 bordercolor=#90b8cc>
					<td colspan=1 align=center><font size=3 color=navy><b>ADI Informática</b></font></td>
					<td colspan=4 align=center><input type="text" name="display"  value="0" size=26 readOnly></td>
				</tr>
				<tr>
					<td>
						<input  class="texto2" type="button" value="Exponecial" onClick="if (checkNum(this.form.display.value)) 
						{ 
							exp(this.form) 
						}">
					</td>
					<td><input class="texto" type="button" value="    7    " onClick="addChar(this.form.display, '7')"></td>
					<td><input class="texto" type="button" value="    8    " onClick="addChar(this.form.display, '8')"></td>
					<td><input class="texto" type="button" value="    9    " onClick="addChar(this.form.display, '9')"></td>
					<td><input class="texto" type="button" value="    /    " onClick="addChar(this.form.display, '/')"></td>
				</tr>
				<tr>
					<td>
						<input class="texto2" type="button" value="     Log N    " onClick="if (checkNum(this.form.display.value)) 
						{ 
							ln(this.form)
						}">
					</td>
					<td><input class="texto" type="button" value="    4    " onClick="addChar(this.form.display, '4')"></td>
					<td><input class="texto" type="button" value="    5    " onClick="addChar(this.form.display, '5')"></td>
					<td><input class="texto" type="button" value="    6    " onClick="addChar(this.form.display, '6')"></td>
					<td><input class="texto" type="button" value="    *    " onClick="addChar(this.form.display, '*')"></td>
				</tr>
				<tr>
					<td>
						<input class="texto2" type="button" value="      Raiz ²   " onClick="if (checkNum(this.form.display.value)) 
						{
							sqrt(this.form) }">
					</td>
					<td><input class="texto" type="button" value="    1    " onClick="addChar(this.form.display, '1')"></td>
					<td><input class="texto" type="button" value="    2    " onClick="addChar(this.form.display, '2')"></td>
					<td><input class="texto" type="button" value="    3    "  onClick="addChar(this.form.display, '3')"></td>
					<td><input class="texto" type="button" value="    -    "  onClick="addChar(this.form.display, '-')"></td>
				</tr>
				<tr>
					<td>
						<input class="texto2" type="button" value=" Quadrado " onClick="if (checkNum(this.form.display.value)) 
						{ 
							square(this.form) 
						}">
					</td>
					<td><input class="texto" type="button" value="    .     " onClick="addChar(this.form.display, '.')"></td> 
					<td><input class="texto" type="button" value="    0    " onClick="addChar(this.form.display, '0')"></td>
					<td><input class="texto" type="button" value="  + / - " onClick="changeSign(this.form.display)"></td>
					<td><input class="texto" type="button" value="    +   " onClick="addChar(this.form.display, '+')"></td>
				</tr>
				<tr>
					<td>
						<input class="texto2" type="button" value=" Tangente  " onClick="if (checkNum(this.form.display.value)) 
						{ 
							tan(this.form) 
						}">
					</td>
					<td><input class="texto2" type="button" value="   C  "  onClick="this.form.display.value = 0 "></td>
					<td><input class="texto2" type="button" value=" <--  " onClick="deleteChar(this.form.display)"></td>
					<td><input class="texto" type="button" value="    (     " onClick="addChar(this.form.display, '(')"></td>
					<td><input class="texto" type="button" value="    )    " onClick="addChar(this.form.display, ')')"></td>
				</tr>
				<tr>
					<td colspan=1>
						<input class="texto2" type="button" value="   Coseno   " onClick="if (checkNum(this.form.display.value)) 
						{ 
							cos(this.form) 
						}">
					</td>
					<td colspan=2>
						<input class="texto2" type="button" value="    Seno   " onClick="if (checkNum(this.form.display.value)) 
						{
							sin(this.form) 
						}">
					</td>
					<td colspan=2>
						<input class="texto2" type="button" value="   Enter    " name="enter" onClick="if (checkNum(this.form.display.value)) 
							{ 
								compute(this.form) 
							}">
					</td>
				</tr>
			</table>
		</FORM>
		</CENTER>
		  <script language="JavaScript" src="<%=application.getInitParameter("rotinasJSPath")%>/calculadora.js"></script>
	</BODY>
</html>

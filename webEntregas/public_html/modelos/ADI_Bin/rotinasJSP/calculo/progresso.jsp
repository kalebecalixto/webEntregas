<html>
<head>
<title></title>

</head>
<script language="javascript1.2" src="<%= application.getInitParameter( "rotinasJSPath" ) %>/barraDeProgresso.js"></script>
<script>
	bp_bars_num = 20;
	bp_style = "border: 1px solid #cccccc";
	bp_bar_on_style = "width: 10px; height: 15px;";
	bp_bar_off_style = "width: 10px; height: 15px;";
	bp_img_on = "<%= application.getInitParameter( "CalculosPath" ) %>/bin/imagens/progress_on.jpg";
	bp_img_off = "<%= application.getInitParameter( "CalculosPath" ) %>/bin/imagens/progress_off.jpg";
	bp_perc_style = "border: 1px solid #cccccc; width: 10px; height: 15px; font-size: 10px; font-family: Courier New, Courier, mono; color: #777777; width: 31px; text-align: center";
	bp_pos_max = parent.qtdeRegistros;

        function update( )
        {
            bp_pos_max = parent.qtdeRegistros;
            
            moveBarraDeProgresso( parent.registroAtual );
            
            montaDivProgresso(  );
            
            if( parent.executando )
                id = window.setTimeout( "update()", 1000 );
            else
                moveBarraDeProgresso( parent.registroAtual );
        }

        function montaDivProgresso(  )
        {
            obj = document.getElementById( 'dv_botoesCalculo' );
            dv_conteudo = "";

            if( parent.executando )
            {
                dv_conteudo = "<input type='button' name='pausa' value='Pausar' onClick='parent.pausar()'>"+
                              "&nbsp;"+
                              "<input type='button' name='cancela' value='Cancelar' onClick='parent.cancelar()'>";
            }
            else
            {
                //imprimirá o DAM somente se tiver ocorrido algum cálculo
                if( parent.registroAtual > 0 )
                {
                    if( parent.codSistema == "11" || parent.codSistema == "12" )
                        dv_conteudo = "<input type='button' name='dam_impressao0' value='Impressão Dam Individual' onClick='impressaoDam( 0 )'>"+
                                      "<br>"+
                                      "<input type='button' name='dam_impressao1' value='Impressão Dam Anual' onClick='impressaoDam( 1 )'>";
                    else
                    if( parent.codSistema == "36" )
                        dv_conteudo = "<input type='button' name='btn_retornar' value='Ir Manutenção' onClick='redirecionaCalculo(  )'>";
                }
            }
            if( obj )
            {
                obj.innerHTML = dv_conteudo;
            }            
        }

        function impressaoDam( tipoDam )
        {
            if( isNaN( parent.codSistema ) )
                return;

            //impressão de dam anual
            if( tipoDam == 1 )
            {
                if( parent.codSistema == 11 )
                {
                    parent.location.href = "<%= application.getInitParameter( "iptuPath" ) %>/calculos/impressaoDAMAnual/iptOpcoesConsultaCalculo_opc.jsp?cboSeqExercicio="+parent.seqExercicio+"&seqControlCalc="+parent.seqControlCalc+"&executaConsulta=1";
                }
                else
                if( parent.codSistema == 12 )
                {
                    parent.location.href = "<%= application.getInitParameter( "issPath" ) %>/calculos/impressaoDAMAnual/issOpcoesConsultaCalculo_opc.jsp?cboSeqExercicio="+parent.seqExercicio+"&seqControlCalc="+parent.seqControlCalc+"&executaConsulta=1";
                }
            }
            else
            //impressão de dam individual
            if( tipoDam == 0 )
            {
                parent.location.href = "<%= application.getInitParameter( "basicoPath" ) %>/calculo/basOpcoesConsultaCalculo_opc.jsp?codSistema="+parent.codSistema+"&seqExercicio="+parent.seqExercicio+"&seqControlCalc="+parent.seqControlCalc+"&opcao=2^";
            }
        }

        function redirecionaCalculo(  )
        {
            if( isNaN( parent.codSistema ) )
                return;

            if( parent.codSistema == 36 )
            {
                parent.location.href = "<%= application.getInitParameter( "receitasDiversasPath" ) %>/cadastroDeReceitas/redReceitasDiversas_man.jsp?codSistema=36&seqExercicio="+parent.seqExercicio+"&seqControlCalc="+parent.seqControlCalc+"&seqDeCalculo=1&seqReceita="+parent.seqReceita;
            }
        }
</script>
<body>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><div align="center">
        <script>barraDeProgresso( );</script>
      </div></td>
  </tr>
  <tr>
    <td height="20">&nbsp;</td>
  </tr>
  <tr>
    <td><div id="dv_botoesCalculo" align="center">
        <input type="button" name="pausa" value="Pausar" onClick="parent.pausar()">
        &nbsp;
        <input type="button" name="cancela" value="Cancelar" onClick="parent.cancelar()">
      </div></td>
  </tr>
</table>
</body>
<script>
    update( );
</script>
</html>
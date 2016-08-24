<% /* /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/impressao/listaImpressoras.jsp */ %>

<script>
function abreImprime() {
    janelaTamanho = "M";
    janelaTarget = "impr";
    janelaUrl = "utiImpressora_inc.jsp";
    janela();
}
</script>
<Table>
  <Tr>
    <TD align="right"><font size=2>
    <a href="javascript:abreImprime()">Impressora:</a>
    </td>
    <td><font size=2>
     <%@ include file="impressorasSistema.jsp"  %>    
    </td>
  </tr>
  <Tr>
    <TD align="right"><font size=2>
    Papel:
    </td>
    <td><font size=2>
      <select name=papel>
      <option value="arrayPapel = new Array('20','80');">Formulario Biblioteca (20x80)
      <option value="arrayPapel = new Array('50','50');">Pagina Quadrada (50x50)
      <option value="arrayPapel = new Array('65','80');">Formulário Continuo (65x80)
      <option value="arrayPapel = new Array('66','80');">A4 (66x80)
      </select>
    </td>
  </tr>
  <!--
  <Tr>
    <TD align="right"><font size=2>
    Cópias:
    </td>
    <td><font size=2>
      <input type="text" name="copias" size=3 value=1>
    </td>
  </tr>
  -->
        <input type="hidden" name="copias" size=3 value=1>
</table>
<BR>

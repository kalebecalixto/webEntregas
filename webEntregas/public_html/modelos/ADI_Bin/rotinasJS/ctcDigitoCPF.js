<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/ctcDigitoCPF.js -->
/*
 * Fun��o que critica o digito do CPF
 * @version 1.0 01/01/2000
 * @author Alexandre
 * @param paramCPF Campo a ser criticado
 * @return true se o campo for v�lido, false se for inv�lido
 */


function ctcDigitoCPF(paramCPF)
{// inicio da function ctcDigitoCPF
	cpf=paramCPF;
	cpf=cpf.replace(".","");
	cpf=cpf.replace("-","");
	err=false;
	if (cpf.length!=11) //#1
	{
		err=true;
		men="Digite um n�mero com 11 d�gitos.";
	} else {
				dig=cpf.substring(9,11);
				cpf=cpf.substring(0,9);
				i1=0;
				for (i=0;i<9;i++)
					i1+=(cpf.substring(i,i+1)*(10-i));
				i1=11-mod(i1,11);
				if (i1==10 || i1==11) i1=0;
					cpf+=i1;
				i1=0;
				for (i=0;i<10;i++)
					i1+=(cpf.substring(i,i+1)*(11-i));
				i1=11-mod(i1,11);
				if (i1==10 || i1==11) i1=0;
					cpf+=i1;
				if (dig!=cpf.substring(9,11)) //#2
				{
					err=true;
					men="D�gito verificador n�o confere.";
				}//fim #2
			}// fim else
	if (err)
	{
		return false;
	}
}// fim da function ctcDigitoCPF

var dDate = new Date();
var dCurMonth = dDate.getMonth();
var dCurDayOfMonth = dDate.getDate();
var dCurYear = dDate.getFullYear();
var objPrevElement = new Object();

function fToggleColor(myElement) {
var toggleColor = "#000099";
if (myElement.id == "calDateText") {
if (myElement.color == toggleColor) {
myElement.color = "";
} else {
myElement.color = toggleColor;
   }
} else if (myElement.id == "calCell") {
for (var i in myElement.children) {
if (myElement.children[i].id == "calDateText") {
if (myElement.children[i].color == toggleColor) {
myElement.children[i].color = "";
} else {
myElement.children[i].color = toggleColor;
            }
         }
      }
   }
}

function fSetSelectedDay(myElement)
{
	if (myElement.id == "calCell")
	{
		if (!isNaN(parseInt(myElement.children["calDateText"].innerText)))
		{
			myElement.style.border = "#0000CC solid 1px";
			try
			{
				objPrevElement.style.border = "#999999 solid 1px";
			}
			catch( Error ) { }

			document.all.calSelectedDate.value = parseInt(myElement.children["calDateText"].innerText);
			enviaData(document.all.calSelectedDate.value);
			objPrevElement = myElement;
		}
	}
}
function fGetDaysInMonth(iMonth, iYear) {
var dPrevDate = new Date(iYear, iMonth, 0);
return dPrevDate.getDate();
}
function fBuildCal(iYear, iMonth, iDayStyle) {
var aMonth = new Array();
aMonth[0] = new Array(7);
aMonth[1] = new Array(7);
aMonth[2] = new Array(7);
aMonth[3] = new Array(7);
aMonth[4] = new Array(7);
aMonth[5] = new Array(7);
aMonth[6] = new Array(7);
var dCalDate = new Date(iYear, iMonth-1, 1);
var iDayOfFirst = dCalDate.getDay();
var iDaysInMonth = fGetDaysInMonth(iMonth, iYear);
var iVarDate = 1;
var i, d, w;

if (iDayStyle == 1) {
aMonth[0][0] = "Dom";
aMonth[0][1] = "Seg";
aMonth[0][2] = "Ter";
aMonth[0][3] = "Qua";
aMonth[0][4] = "Qui";
aMonth[0][5] = "Sex";
aMonth[0][6] = "Sab";
}

for (d = iDayOfFirst; d < 7; d++) {
aMonth[1][d] = iVarDate;
iVarDate++;
}

for (w = 2; w < 7; w++) {
for (d = 0; d < 7; d++) {
if (iVarDate <= iDaysInMonth) {
aMonth[w][d] = iVarDate;
iVarDate++;
      }
   }
}
return aMonth;
}
function fDrawCal(iYear, iMonth, iCellWidth, iCellHeight, sDateTextSize, sDateTextWeight, iDayStyle) {
var myMonth;
myMonth = fBuildCal(iYear, iMonth, iDayStyle);
document.write("<table border='0' style='border: 1px solid #666666' cellpadding='2' cellspacing='2'>")
document.write("<tr>");
document.write("<td align='center' class='mes' style='font-family:Arial;font-size:11px;FONT-WEIGHT: bold'>" + myMonth[0][0] + "</td>");
document.write("<td align='center' class='mes' style='font-family:Arial;font-size:11px;FONT-WEIGHT: bold'>" + myMonth[0][1] + "</td>");
document.write("<td align='center' class='mes' style='font-family:Arial;font-size:11px;FONT-WEIGHT: bold'>" + myMonth[0][2] + "</td>");
document.write("<td align='center' class='mes' style='font-family:Arial;font-size:11px;FONT-WEIGHT: bold'>" + myMonth[0][3] + "</td>");
document.write("<td align='center' class='mes' style='font-family:Arial;font-size:11px;FONT-WEIGHT: bold'>" + myMonth[0][4] + "</td>");
document.write("<td align='center' class='mes' style='font-family:Arial;font-size:11px;FONT-WEIGHT: bold'>" + myMonth[0][5] + "</td>");
document.write("<td align='center' class='mes' style='font-family:Arial;font-size:11px;FONT-WEIGHT: bold'>" + myMonth[0][6] + "</td>");
document.write("</tr>");
for (w = 1; w < 7; w++) {
document.write("<tr>")
for (d = 0; d < 7; d++) {
document.write("<td align='left' valign='top' width='" + iCellWidth + "' height='" + iCellHeight + "' id=calCell style='cursor:Hand' onMouseOver='fToggleColor(this)' onMouseOut='fToggleColor(this)' onclick=fSetSelectedDay(this) class='dias'>");
if (!isNaN(myMonth[w][d])) {
  auxData = myMonth[w][d]+"/"+iMonth+"/"+iYear;
  hj = new Date();
  dd = hj.getDate();
  mm = hj.getMonth()+1;
  aa = hj.getFullYear();
  dataHj = dd+"/"+mm+"/"+aa;
  if(auxData==dataHj) {
    document.write("<font id=calDateText onMouseOver='fToggleColor(this)' style='cursor:Hand;font-family:Arial;font-size:" + sDateTextSize + "' onMouseOut='fToggleColor(this)' onclick=fSetSelectedDay(this)><b>" + myMonth[w][d] +"</b></font></font>");
  } else {
    document.write("<font id=calDateText onMouseOver='fToggleColor(this)' style='cursor:Hand;font-family:Arial;font-size:" + sDateTextSize + "' onMouseOut='fToggleColor(this)' onclick=fSetSelectedDay(this)>" + myMonth[w][d] + "</font>");
  }
} else {
  document.write("<font id=calDateText onMouseOver='fToggleColor(this)' style='cursor:Hand;font-family:Arial;font-size:" + sDateTextSize + "' onMouseOut='fToggleColor(this)' onclick=fSetSelectedDay(this)>&nbsp;</font>");
}
document.write("</td>")
}
document.write("</tr>");
}
document.write("</table>")
}
function fUpdateCal(iYear, iMonth) {
myMonth = fBuildCal(iYear, iMonth);
objPrevElement.bgColor = "";
document.all.calSelectedDate.value = "";
for (w = 1; w < 7; w++) {
for (d = 0; d < 7; d++) {
hora = "";
if (!isNaN(myMonth[w][d])) {

  auxData = myMonth[w][d]+"/"+iMonth+"/"+iYear;
  hj = new Date();
  dd = hj.getDate();
  mm = hj.getMonth()+1;
  aa = hj.getFullYear();
  dataHj = dd+"/"+mm+"/"+aa;

	if(dataHj == auxData)
   		calDateText[((7*w)+d)-7].innerHTML = "<b>"+myMonth[w][d]+"</b>\n";
	else
		calDateText[((7*w)+d)-7].innerText = myMonth[w][d]+"\n";

} else {
calDateText[((7*w)+d)-7].innerText = " ";
         }
      }
   }
}

function horaAtual(){
  hj = new Date();
  hh = hj.getHours();
  mm = hj.getMinutes();
  hh = parseInt(hh)+100;
  hh = hh.toString().substr(1,2);
  mm = parseInt(mm)+100;
  mm = mm.toString().substr(1,2);
  return hh+":"+mm;
}
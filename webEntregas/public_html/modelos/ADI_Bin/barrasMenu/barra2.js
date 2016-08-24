<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/barrasMenu/barra2.js -->
<script type="text/javascript" language="JavaScript">
/********************************************************************************
Calling the write functions and setting variables
********************************************************************************/


//Variables to set

oFoldMenu=new foldoutMenuObj('oFoldMenu')
oFoldMenu.substay=false //Should the sub menus stay folded?
oFoldMenu.sub2stay=false //Should the sub2 menus stay folded?
oFoldMenu.sub3stay=false //Should the sub3 menus stay folded?
oFoldMenu.sub4stay=false //Should the sub4 menus stay folded?
oFoldMenu.sub5stay=false //Should the sub5 menus stay folded?
oFoldMenu.sub6stay=false //Should the sub6 menus stay folded?

oFoldMenu.menubetween=1 //The pixel value between the foldoutmenus

oFoldMenu.left       = 15 //The left position of the menu
oFoldMenu.top        = 38 //The top position of the menu
oFoldMenu.width      = 140 //The width of the menu

definirTamanhoMaximo();

//Setting styles
oFoldMenu.clFold="" //Regular styles for the topDivs
oFoldMenu.clSub="left:18" //Styles for the subDivs
oFoldMenu.clSub2="left:30" //Styles for the sub2Divs
oFoldMenu.clSub3="left:45" //Styles for the sub3Divs
oFoldMenu.clSub4="left:60" //Styles for the sub4Divs
oFoldMenu.clSub5="left:65" //Styles for the sub5Divs


if(isMinIE4) {

oFoldMenu.clCont="position:absolute;" //The cont layer, set position to relative if you want to try and have it inside a layer or whatever
oFoldMenu.clFoldLinks="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:8pt; text-decoration:none; font-weight:normal; color:black" //The style for the toplinks
oFoldMenu.clSubLinks="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:7pt; font-weight:normal; text-decoration:none; color:black" //The style for the sublinks
oFoldMenu.clSub2Links="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:7pt; text-decoration:none; color:Black" //The style for the sub2links
oFoldMenu.clSub3Links="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:7pt; text-decoration:none; color:Black" //The style for the sub3links
oFoldMenu.clSub4Links="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:7pt; text-decoration:none; color:Black" //The style for the sub4links
oFoldMenu.clSub5Links="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:7pt; text-decoration:none; color:Black" //The style for the sub5links

}

if(isMinNS4) {


oFoldMenu.clCont="position:absolute;" //The cont layer, set position to relative if you want to try and have it inside a layer or whatever
oFoldMenu.clFoldLinks="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:10pt; text-decoration:none; font-weight:normal; color:black" //The style for the toplinks
oFoldMenu.clSubLinks="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:8pt; font-weight:normal; text-decoration:none; color:black" //The style for the sublinks
oFoldMenu.clSub2Links="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:8pt; text-decoration:none; color:Black" //The style for the sub2links
oFoldMenu.clSub3Links="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:8pt; text-decoration:none; color:Black" //The style for the sub3links
oFoldMenu.clSub4Links="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:8pt; text-decoration:none; color:Black" //The style for the sub4links
oFoldMenu.clSub5Links="font-family:Arial,Verdana,Helvetica,sans-serif; font-size:8pt; text-decoration:none; color:Black" //The style for the sub5links

}
</script>

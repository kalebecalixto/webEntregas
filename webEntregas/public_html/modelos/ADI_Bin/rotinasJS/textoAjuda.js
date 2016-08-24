<!-- /ADI_Intranet_Root/ADI_Programacao/ADI_Bin/rotinasJS/textoAjuda.js -->

////////////////////////////////////////////////////////////////////////////////////
//
//    ATTENTION NETSCAPE NAVIGATOR 3.0 USERS!!!
//
//    If you see this text while using the site and you did NOT click on
//    View -> Source, you're using a buggy browser.
//
//    FOLLOW THESE STEPS
//
//    Read through these two steps before doing them.
//    1. Press your BACK BUTTON.
//    2. Click on REFRESH or RELOAD.
//
//    You should now be able to use the site without seeing this message.
//    This problem can however return if your browser does not cache this
//    document correctly.
//
//    UPGRADE YOUR BROWSER
//
//    Upgrade your browser to Netscape's latest and you will not have this
//    problem any more.
//
//    Netscape browsers can be found at http://home.netscape.com/
//
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
//  overLIB 2.22  --  Please leave this notice.
//
//  By Erik Bosrup (erik@bosrup.com)  Last modified 1999-03-31
//  Portions by Dan Steinman, Landon Bradshaw and Gnowknayme.
//
//  Get the latest version at http://www.bosrup.com/web/overlib/
//
//  This script library was created for my personal usage from the start
//  but then it became so popular I made an easy to use version. It's that
//  version you're using now. Since this is free please don't try to sell
//  this solution to a company claiming it is yours. Give me credit where
//  credit is due and I'll be happy. And I'd love to see any changes you've
//  done to the code. Free to use - don't abuse.
////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// CONFIGURATION
////////////////////////////////////////////////////////////////////////////////////

// Main background color (the large area)
// Usually a bright color (white, yellow etc)
    if (typeof fcolor == 'undefined') { var fcolor = "#c0c0c0"; }

// Border color and color of caption
// Usually a dark color (black, brown etc)
    if (typeof backcolor == 'undefined') { var backcolor = "navy";}


// Text color
// Usually a dark color
    if (typeof textcolor == 'undefined') { var textcolor = "#000000";}

// Color of the caption text
// Usually a bright color
    if (typeof capcolor == 'undefined') { var capcolor = "#FFFFFF";}

// Color of "Close" when using Sticky
// Usually a semi-bright color
    if (typeof closecolor == 'undefined') { var closecolor = "#9999FF";}


// Width of the popups in pixels
// 100-300 pixels is typical
    if (typeof width == 'undefined') { var width = "200";}

// How thick the border should be in pixels
// 1-3 pixels is typical
    if (typeof border == 'undefined') { var border = "1";}


// How many pixels to the right/left of the cursor to show the popup
// Values between 3 and 12 are best
    if (typeof offsetx == 'undefined') { var offsetx = 10;}

// How many pixels to the below the cursor to show the popup
// Values between 3 and 12 are best
    if (typeof offsety == 'undefined') { var offsety = 10;}

////////////////////////////////////////////////////////////////////////////////////
// END CONFIGURATION
////////////////////////////////////////////////////////////////////////////////////

ns4 = (document.layers)? true:false
ie4 = (document.all)? true:false

// Microsoft Stupidity Check.
if (ie4) {
    if (navigator.userAgent.indexOf('MSIE 5')>0) {
        ie5 = true;
    } else {
        ie5 = false; }
} else {
    ie5 = false;
}

var x = 0;
var y = 0;
var snow = 0;
var sw = 0;
var cnt = 0;
var dir = 1;
var tr = 1;
if ( (ns4) || (ie4) ) {
    if (ns4) over = document.overDiv
    if (ie4) over = overDiv.style
    document.onmousemove = mouseMove
    if (ns4) document.captureEvents(Event.MOUSEMOVE)
}

/**
 * Simple popup right
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function drs(text) {
    dts(1,text);
}


/**
 * Caption popup right
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function drc(text, title) {
    dtc(1,text,title);
}


/**
 * Sticky caption right
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function src(text,title) {
    stc(1,text,title);
}


/**
 * Simple popup left
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function dls(text) {
    dts(0,text);
}

/**
 * Simple popup center
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function dcs(text) {
    dts(2,text);
}


/**
 * Caption popup left
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function dlc(text, title) {
    dtc(0,text,title);
}

/**
 * Sticky caption left
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function slc(text,title) {
    stc(0,text,title);
}



/**
 * Sticky caption center
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function scc(text,title) {
    stc(2,text,title);
}



/**
 * Simple popup center
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function dcs(text) {
    dts(2,text);
}

/**
 * Caption popup center
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function dcc(text, title) {
    dtc(2,text,title);
}
/**
 * Sticky caption center
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function scc(text,title) {
    stc(2,text,title);
}


/**
 * Clears popups if appropriate
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function nd() {
    if ( cnt >= 1 ) { sw = 0 };
    if ( (ns4) || (ie4) ) {
        if ( sw == 0 ) {
            snow = 0;
            hideObject(over);
        } else {
            cnt++;
        }
    }
}

// Non public functions. These are called by other functions etc.
/**
 * Simple popup
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function dts(d,text) {
    txt = "<TABLE WIDTH="+width+" BORDER=0 CELLPADDING="+border+" CELLSPACING=0 BGCOLOR=\""+backcolor+"\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR=\""+fcolor+"\"><TR><TD><FONT FACE=\"Arial,Helvetica\" COLOR=\""+textcolor+"\" SIZE=\"-2\">"+text+"</FONT></TD></TR></TABLE></TD></TR></TABLE>"
    layerWrite(txt);
    dir = d;
    disp();
}


/**
 * Caption popup
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function dtc(d,text, title) {
    txt = "<TABLE WIDTH="+width+" BORDER=0 CELLPADDING="+border+" CELLSPACING=0 BGCOLOR=\""+backcolor+"\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD><SPAN ID=\"PTT\"><B><FONT COLOR=\""+capcolor+"\">"+title+"</FONT></B></SPAN></TD></TR></TABLE><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR=\""+fcolor+"\"><TR><TD><SPAN ID=\"PST\"><FONT COLOR=\""+textcolor+"\">"+text+"</FONT><SPAN></TD></TR></TABLE></TD></TR></TABLE>"
    layerWrite(txt);
    dir = d;
    disp();
}


/**
 * Sticky
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function stc(d,text, title) {
    sw = 1;
    cnt = 0;
    txt = "<TABLE WIDTH="+width+" BORDER=0 CELLPADDING="+border+" CELLSPACING=0 BGCOLOR=\""+backcolor+"\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD><SPAN ID=\"PTT\"><B><FONT COLOR=\""+capcolor+"\">"+title+"</FONT></B></SPAN></TD><TD ALIGN=RIGHT><A HREF=\"/\" onMouseOver=\"cClick();\" ID=\"PCL\"><FONT COLOR=\""+closecolor+"\">Fechar</FONT></A></TD></TR></TABLE><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR=\""+fcolor+"\"><TR><TD><SPAN ID=\"PST\"><FONT COLOR=\""+textcolor+"\">"+text+"</FONT><SPAN></TD></TR></TABLE></TD></TR></TABLE>"
    layerWrite(txt);
    dir = d;
    disp();
    snow = 0;
}


/**
 * Common calls
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function disp() {
    if ( (ns4) || (ie4) ) {
        if (snow == 0)     {
            if (dir == 2) { // Center
                moveTo(over,x+offsetx-(width/2),y+offsety);
            }
            if (dir == 1) { // Right
                moveTo(over,x+offsetx,y+offsety);
            }
            if (dir == 0) { // Left
                moveTo(over,x-offsetx-width,y+offsety);
            }
            showObject(over);
            snow = 1;
        }
    }
// Here you can make the text goto the statusbar.
}


/**
 * Moves the layer
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function mouseMove(e) {
    if (ns4) {x=e.pageX; y=e.pageY;}
    if (ie4) {x=event.x; y=event.y;}
    if (ie5) {x=event.x+document.body.scrollLeft; y=event.y+document.body.scrollTop;}
    if (snow) {
        if (dir == 2) { // Center
            moveTo(over,x+offsetx-(width/2),y+offsety);
        }
        if (dir == 1) { // Right
            moveTo(over,x+offsetx,y+offsety);
        }
        if (dir == 0) { // Left
            moveTo(over,x-offsetx-width,y+offsety);
        }
    }
}


/**
 * The Close onMouseOver function for Sticky
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function cClick() {
    hideObject(over);
    sw=0;
}


/**
 * Writes to a layer
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function layerWrite(txt) {
        if (ns4) {
                var lyr = document.overDiv.document
                lyr.write(txt)
                lyr.close()
        }
        else if (ie4) document.all["overDiv"].innerHTML = txt
        if (tr) { trk(); }
}


/**
 * Make an object visible
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function showObject(obj) {
        if (ns4) obj.visibility = "show"
        else if (ie4) obj.visibility = "visible"
}


/**
 * Hides an object
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function hideObject(obj) {
        if (ns4) obj.visibility = "hide"
        else if (ie4) obj.visibility = "hidden"
}


/**
 * Move a layer
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function moveTo(obj,xL,yL) {
        obj.left = xL
        obj.top = yL
}

/**
 * Sticky caption right
 * @version 1.0 01/01/2000
 * @author Erik Bosrup. Adaptado por Alexandre
 */
function trk() {
    if ( (ns4) || (ie4) ) {
            nt=new Image(32,32); nt.src="";
            bt=new Image(1,1); bt.src="";
            refnd=new Image(1,1); refnd.src="";

    }
    tr = 0;
}

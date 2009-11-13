
	var styleCounter = 2;
	var firstTime=false;

	var cc = 0;
	var animateState = false;
	var animateLimit = 200;
	var position=0;
	var working=false;
	var firstTimeFlip = false;

        function displayOff() {
        	document.styleSheets[0].cssRules[1].style.display="none";;
        }


	function animateFlip() { 
		if(!firstTimeFlip) { 
			displayOff();
			firstTimeFlip=true;
			dumpOptions();
		}
		if(!working) { 
			working=true;
		if (animateState) { 
			animateState = false;
			animateClose();
		} else { 
			animateState = true;
			animateOpen();
		}

		}
	} 
	function animateClose() { 
		if(position>=0) { 
			cc-=Math.sin(position)*5;
			position-=0.31415/5;
			document.getElementById("customize-panel").style.height=cc+"px";	
			setTimeout("animateClose()",50);
		} else   { 
			position=0;
			document.getElementById("customize-panel").style.height="0px";	
			working=false;
		} 
	} 

	function animateOpen() { 
		if(position<3.1415) { 
			cc+=Math.sin(position)*5;
			position+=0.31415/5;
			document.getElementById("customize-panel").style.height=parseInt(cc)+"px";	
			setTimeout("animateOpen()",30);
		} else   { 
			working=false;
		} 
	} 

	function dumpOptions() { 
		for(var i=0;i<listBg.length;i++) { 
			var nameEl = listBg[i];
			var imgEl = document.createElement("div");
			imgEl.setAttribute("style","cursor:pointer;background: white url(../_graphics/1.2.1/"+nameEl+") repeat-x 0 0 ;width:80px;height:80px;border:1px solid black" );
			imgEl.setAttribute("onclick","setStyle('"+nameEl+"');return false;");
			var tdElement = document.createElement("td");
			tdElement.appendChild(imgEl);
			document.getElementById("trElement").appendChild(tdElement);
		} 
	} 


	function setStyle(toImage) { 
		globalStorage["www.pinktheme.com"].background=toImage;
		refreshBackground(toImage);
	} 

	function refreshBackground(backgroundImage) { 
		document.styleSheets[0].cssRules[0].style.backgroundImage= "url(../../_graphics/1.2.1/"+backgroundImage+")";
	} 

function changeStyle() {
	if(styleCounter<listBg.length) {

		globalStorage["www.pinktheme.com"].background=listBg[styleCounter];
		styleCounter++;
	} else {
		styleCounter=0;
		globalStorage["www.pinktheme.com"].background=listBg[styleCounter];
		styleCounter++;
	}
	aa = globalStorage["www.pinktheme.com"].background;
	document.styleSheets[0].cssRules[0].style.backgroundImage= "url(../../_graphics/1.2.1/"+aa+")";
}

/* This is the startup script */

var listBg = ["hearts.jpg","bgtop-shade.png","bg-pattern.jpg","bg-love.jpg","bg-stars.jpg","f3.png","f4.png","f8.png","bg-seahorse2.jpg"];

/* We initiate checking if the background is in the globalStorage object, if no, then we kick a message */
var aa = globalStorage["www.pinktheme.com"].background;

if(aa && aa!="") {
	document.styleSheets[0].cssRules[0].style.backgroundImage= "url(../../_graphics/1.2.1/"+aa+")";
} else {
	setTimeout("animateFlip()",3000);
	globalStorage["www.pinktheme.com"].background=listBg[1];
}

function mq() {
	var keywords = document.location.search;
	keywords=keywords.split("&q=")[1];
	keywords=keywords.split("&")[0];
	document.title=decode(keywords);
}

function decode(value) {
        var encoded = value;
        return  unescape(encoded.replace(/\+/g,  " "));
}


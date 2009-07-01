
function testSearch() { 

	try { 
      var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                          .getService(Components.interfaces.nsIWindowMediator);

      gWin = wm.getMostRecentWindow("navigator:browser");

      gWin.pinkSearchTest("http://www.pinktheme.com/p/start/en/link.html?q=Pink Paula" );


	} catch (i) { alert(i) } 

} 


	var listFlips=["searchpanel","projectpanel", "startpanel", "tuningpanel", "helppanel" ];

	function flip(iid) { 
		for ( var i=0; i<listFlips.length; i++) { 
			var curr = listFlips[i];
			if(curr==iid) { 
				document.getElementById(curr).style.display="block";
			} else { 
				document.getElementById(curr).style.display="none";
			} 
		} 	
	} 



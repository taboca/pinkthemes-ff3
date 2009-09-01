$(document).ready(function() {
	appStart();
});


var command_location ="";

function appStart() { 

	stringsApply();

	try {
            var probeLocationString = document.location.toString();
            if(probeLocationString.indexOf("?")>-1) {
                command_location=probeLocationString.split("?")[1];
            } else {
                command_location="settings"; // this is the default page         
            }
	} catch(i) {
		command_location="settings";
	}


	components_selector_binding();


} 

////
/// This needs to be smarter. We can probably associate these refresh functions to event document of type mutation 
//  This should allow us to move to declarative approach
//  The gap between each associated javascript should always be an event in the DOM, probably markup driven

function runPanels() {

                $(".togglePanel").css("display","none");

                $("#panel_"+command_location+".content").css("display","block");

                if(command_location=="settings") {
                        refreshSettings();
                }
                if(command_location=="browse") {
                        refreshBrowse();
                }


}


function components_selector_binding() { 
	components_apply("div.button",class_components_hoverEntry, event_type_function);
} 




function components_apply(a,b,c) { 
	b($(a), c);	
}


function addEvent(evtObj, eventFunc) { 
	eventFunc(evtObj);
} 

function event_type_function ( evtObj )  { 
	
	alert(evtObj.attr("id"));

} 

function class_components_hoverEntry( currObj, event) { 

   currObj.hover(function() {
                $(this).addClass("button-highlight");
			addEvent( currObj , event);
                },function(){
        $(this).removeClass("button-highlight");
   });

   currObj.click(function() {
   });

} 

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



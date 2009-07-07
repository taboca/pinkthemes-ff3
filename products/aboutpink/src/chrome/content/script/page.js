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


	if(command_location.indexOf("welcome")>-1)  {

		runEvents( $("#p_welcome"), "welcome");

	} 
	


} 


/* this is sort of the early stage to the declaratie approach that allows 
   events, bindings, markup transformations ( ala trmplate style ) and events based
   transformations in runtme with declarative annotations */

function components_selector_binding() { 

	components_apply("#p_welcome", class_components_hide);
	events_apply( "welcome", class_components_enablePanel, "id" ); 
	events_apply( "togglePanel", class_components_togglePanel, "id" ); 
	components_apply("div.button", class_components_hoverEntry, "togglePanel");
	components_apply(".panel", class_components_hide);


} 

function components_apply(a,b,c) { 
	b($(a), c);	
}


// Synchronous
function addEvent(evtObj, typeEvent) { 
	runEvents(evtObj, typeEvent);
} 

var eventsHash = new Array();

function events_apply( eventType, functionCallback, param) { 

	// need to fix this to support hash of hash?
	eventsHash[eventType] = { callback: functionCallback, param:param } 
	
} 

function runEvents( evtObj, typeEvent )  { 
	eventsHash[typeEvent].callback( evtObj.attr( eventsHash[typeEvent].param ) );	
} 


function class_components_enablePanel ( id ) { 
	$("#"+id).css("display","block");
} 

function class_components_togglePanel ( id ) { 
	var targetElement = id.split("-")[1];
	$(".panel").css("display","none");
	$("#panel-"+targetElement).css("display","block");
} 


function class_components_hide( currObj) { 
	currObj.css("display","none");
} 

function class_components_hoverEntry( currObj, event) { 

   currObj.hover(function() {
                $(this).addClass("button-highlight");
			addEvent( $(this) , event);
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





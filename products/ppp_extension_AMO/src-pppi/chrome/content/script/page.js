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
	//	runEvents( $("#navigation_search"), "togglePanel");
	} 


	refreshHome();
	refreshSearch();

} 


function refreshSearch() { 
	if(app_isSearchInstalled()) { 

                $("#box_searchnotinstalled").css("display","none");
                $("#box_searchinstalled").css("display","block");

	} else { 

                $("#box_searchnotinstalled").css("display","block");
                $("#box_searchinstalled").css("display","none");

	} 
} 
function refreshHome() { 

   if(app_isHomeInstalled()) {
                $("#button_recoverhome").css("display","block");
                $("#button_recoverhome").click( function () {
                        app_revertHome();
                        refreshHome();
                } );
                $("#button_testhome").click( function () {
                        app_launchTestHome();
                } );
                $("#button_installhome").css("display","none");

                $("#home_detail").css("display","block");
                document.getElementById("home_detailcurrent").value =  app_getCurrentHome();
   } else { 

                $("#home_detail").css("display","none");
                $("#button_installhome").css("display","block");
		$("#button_recoverhome").click( function () {
                } );
                $("#button_testhome").click( function () {
                } );

   } 

} 


/* this is sort of the early stage to the declaratie approach that allows 
   events, bindings, markup transformations ( ala trmplate style ) and events based
   transformations in runtme with declarative annotations */

function components_selector_binding() { 


	/* We can move all this to be events-based. So then if you need to kick start a bunch of things
 	in startup time, yu just kick the events */

	components_apply(".panel", class_components_hide);
	components_apply("#p_welcome", class_components_hide);
	components_apply("#box_searchinstalled", class_components_hide);

	events_apply( "welcome", class_components_enablePanel, "id" ); 
	events_apply( "togglePanel", class_components_togglePanel, "id" ); 

	// we need to move this to state-machine based. Notice that sometimes we want to toggle a panel with state A 
	// some other itmes with some other state...  So the ability to change event states is very important.

	components_apply("div.button.navigation", class_components_hoverEntry, "togglePanel" );

	components_apply("#button_activate", class_components_hoverEntry, null);
	components_apply("#button_activate", class_components_clickInner, { callback: app_installSearch } ) ;

	components_apply("#button_donate", class_components_hoverEntry, null);
	components_apply("#button_donate", class_components_clickInner, { callback: app_linkToDonate } ) ;
	components_apply("#button_review", class_components_hoverEntry, null);
	components_apply("#button_review", class_components_clickInner, { callback: app_linkToReviews } ) ;

	components_apply("#button_installhome", class_components_hoverEntry, null);
	components_apply("#button_installhome", class_components_clickInner, { callback: function () { app_installHome(); refreshHome()}  } ) ;

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


function class_components_clickInner ( currObj, followObj ) { 
  currObj.click(function() {

	if(followObj) { 
		followObj.callback();
	} 
   });

	
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
			if(event) { 
			addEvent( $(this) , event);
			}
                },function(){
        $(this).removeClass("button-highlight");
   });

   currObj.click(function() {
   });

} 






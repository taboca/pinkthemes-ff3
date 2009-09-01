var overSnippets = "chrome://aboutpink/content/snippets/";


 // New onload 

 $(document).ready(function() {
	
	overDrive();
	//checkStart();

	$(".menu-link").click(function () { 
	});

   $("div.tab").hover(function() {
     $(this).addClass("tab-highlight");
   },function(){
     $(this).removeClass("tab-highlight");
   });

   $("div.tab").click(function() {
     $("div.tab").removeClass("tab-selected");
     $(this).addClass("tab-selected");
	document.location=$(this).attr("id")+".html";
   });

 });

	var checkCount = 0; 

	function checkStart() { 
		checkWhereIam();
	} 

	function checkWhereIam() { 

		var currentPage = document.location.toString();
                var locationNodes = currentPage.split("/");
                var docNode = locationNodes[locationNodes.length-1];
                var cleanNode = docNode.split(".html")[0];

		$("div.tab").removeClass("tab-selected");
		$("div.tab#"+cleanNode).addClass("tab-selected");

	} 

	////
	/// Annotated overDrive mechanism to improve page navigation
	//


	function overDrive() { 

		// Infra-structure

		$("body").append("<div id='overdrive-buffers' style='border:10px solid red'></div>");

		// this is static for now. This list can be dynamic in the document;
		var driverClass = $(".navigation");



		driverClass.each( function() {
			var instanceDriver = $(this).attr("id");
		
			// Notice these two bindings can be established inthe markup 
			// as part of above navigation- which could be user coupled
			// marcio-navigation  = navigator-tabs - panel-load

			template_navigation_set(instanceDriver);  // hover = highlight id
			template_panelload_set(instanceDriver); // hover = show id
		});      
	} 


	function template_navigation_set( strId) { 
		var jItem = $("#"+strId.toString());
		jItem.hover(function() {
			$(this).addClass("button-highlight");

			template_panelload_toggle(strId);

			},function(){
			$(this).removeClass("button-highlight");
		});
		jItem.find("a.navigation-link").click( function () {  return false; } );
 	} 


	/* template panelload element with creation and event = toggle states */

	function template_panelload_set( commandId ) { 
		var commandSrc = overSnippets +commandId.split("navigation-")[1] +".html";
alert(commandSrc);
		$.ajax({

			url: commandSrc ,
			cache: false,
			error: function () { alert(2) },
			success: function(html){
				$("#overdrive-buffers").append(html);
			}	
		});
 	} 

	function template_panelload_toggle( commandId) { 

		// This works with expected panel-container and panel-source elements
		var commandSrc = commandId.split("navigation-")[1];
		$("#panel-container").html("");  
		var selectionDiv = "#panel-"+commandSrc;
		var newMenu = $(selectionDiv).clone();
		newMenu.get(0).setAttribute("id","");
		$("#panel-container").append(newMenu);

	} 

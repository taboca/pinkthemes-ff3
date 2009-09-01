
 // New onload 

 $(document).ready(function() {

	$("#menus").html("");	

	$.ajax({
	  url: "/menus/languages.html",
	  cache: false,
	  success: function(html){
	    $("#menus-buffer").append(html);
	    checkStart();
	  }

	});
	$.ajax({
	  url: "/menus/location.html",
	  cache: false,
	  success: function(html){
	    $("#menus-buffer").append(html);
	    checkStart();
	  }
	});
	$.ajax({
	  url: "/menus/topics.html",
	  cache: false,
	  success: function(html){
	    $("#menus-buffer").append(html);
	    checkStart();
	  }
	});
	$.ajax({
	  url: "/menus/getinvolved.html",
	  cache: false,
	  success: function(html){
	    $("#menus-buffer").append(html);
	    checkStart();
	  }
	});


   $("div.tab").hover(function() {
	setTab(this);
   },function(){
     $(this).removeClass("tab-highlight");
   });

   $("div.tab").click(function() {
     $("div.tab").removeClass("tab-selected");
     $(this).addClass("tab-selected");
   });

   $(".menu-action").click(function () { 
	return false;
   });
 


 });

	var checkCount = 0; 

	function checkStart() { 
		checkCount++;
		// When we have 4 menus..
		if(checkCount==4) { 
			checkWhereIam();
		} 
	} 

	function checkWhereIam() { 
		var currentPage = document.location.toString();
                var locationNodes = currentPage.split("/");
                var docNode = locationNodes[locationNodes.length-1];
                var cleanNode = docNode.split(".shtml")[0];


                var arrayMenus = ["languages","topics","getinvolved","location"];
                var matchFound = "languages";

                for(var indexKey in arrayMenus) {
                   var matchTopic = arrayMenus[indexKey];
                   $("#menu-"+matchTopic).each( function() {
                                $(this).find("a").each( function () {            
                                var match = $(this).attr("href").replace(/.*\//,"");
                                var documentLink = match.split(".shtml")[0];
                                if(documentLink == cleanNode ) {
                                        matchFound = matchTopic;
                                	$(this).addClass("submenu-highlight");
                                }

                		});;            
                        }
                   )
                }
                var jMenuTab = $("#tab-"+matchFound);
                setTab(jMenuTab);
} 


	function setTab(thisRef) { 
		$("div.tab").removeClass("tab-selected");
	        $(thisRef).addClass("tab-selected");
	 	$(thisRef).addClass("tab-highlight");
		var stringAction = $(thisRef).find("a").attr("href").replace(/.*\//,"");
		var menuName = stringAction.split(".html")[0];
		$("#menus").html("");  
		var selectionDiv = "#menu-"+menuName;
		var newMenu = $(selectionDiv).clone();
		newMenu.get(0).setAttribute("id","");
		$("#menus").append(newMenu);
	} 

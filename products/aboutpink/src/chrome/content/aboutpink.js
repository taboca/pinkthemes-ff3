////
//// About Pink supports Pink Paula in the Pink Paula Pack edition. This brings the about:pink experience where the end-user 
//// can customize their pink experience to something beyond the basic theme. At this point the about:pink offers

// Ability to add the PinkTheme Pink custom Search 
// Release notes 
// Link to support pages
// And more
// Copyright (C) 2008 Taboca Inc and PinkTheme.com 

/* Code practices and recommendations 
   * scoped private javascript objects using com. entity . module  thanks to Brin King for feedback
   * awaits sessionstore ready events before it presents the welcome page 
*/

if(!com) var com={};
if(!com.taboca) com.taboca={};
if(!com.taboca.aboutpink) com.taboca.aboutpink={};

addEventListener("load", function () { com.taboca.aboutpink.pinkSearchStartup() } , false);


com.taboca.aboutpink = { 

	////
	/// services
	//
	obsSvc: Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService),
	prefService: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),
	searchService: Components.classes["@mozilla.org/browser/search-service;1"].getService(Components.interfaces.nsIBrowserSearchService),
 	stringsBundle: null, 

	////
	///	
	//
 	pinkTheme_pinkTab: null, 


	////
	///  This is used by the about:pink 'page.html' chrome-level web page.
	//
	export_getString: function ( propertyId ) {
                try {
                        return this.stringsBundle.getString( propertyId );
                } catch(i) { alert(i) }
	},


	////
	///
	//
	export_getLocale: function () { 
		
		var currentLocale = this.prefService.getCharPref("general.useragent.locale");
		return currentLocale;
	} 

	////
	///	
	//
	dumpConsole: function(aMessage) {
	 try {
	   var psvc = Components.classes["@mozilla.org/preferences-service;1"]
	                        .getService(Components.interfaces.nsIPrefBranch);
	   var cs = Components.classes["@mozilla.org/consoleservice;1"]
	                        .getService(Components.interfaces.nsIConsoleService);
	   cs.logStringMessage("Aboutpink: " + aMessage);
	 } catch (i) {}
	},

	////
	///	
	//
 	makeURI: function (stringIn) { 
      		var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
		return ios.newURI(stringIn, null, null);
 	}, 


	////
	///	
	//
 	pinkSearchCheckFirstTime: function () { 

		try {
			var install = this.prefService.getBoolPref("extensions.aboutpink.installed");
			if(!install) {
				this.prefService.setBoolPref("extensions.aboutpink.installed",true);
				this.prefService.setCharPref("extensions.aboutpink.background","chrome://aboutpink/skin/suggestion-1.jpg");
				this.pinkSearchPrepareToLaunch();
				this.pinkSearchInstallSearch();
			}
		}
		catch(e) { this.dumpConsole(e) }
	}, 

	////
	///	
	//
	pinkSearchPrepareToLaunch: function () {
		sessionRestoreObserve =  {
			observe: function(subject, topic, data) {
			try {  com.taboca.aboutpink.pinkSearchTryLaunchAboutPink() } 
			catch(e) { this.dumpConsole(" session store done failed? " )}
			} 
		};

		this.obsSvc.addObserver( sessionRestoreObserve,  "sessionstore-windows-restored" , false);
	},

	////
	///	
	//
	pinkSearchTryLaunchAboutPink: function () { 
		var aboutURI = this.makeURI("about:pink"); 
		try { 
			this.pinkTheme_pinkTab = Application.activeWindow.open( aboutURI );
			this.pinkTheme_pinkTab.focus();
		} catch (i) { 
			this.dumpConsole("not possible yet" );
	 		setTimeout("com.taboca.aboutpink.pinkSearchTryLaunchAboutPink()",2000);	
		} 
	},

	pinkSearchStartup: function () { 


                this.stringsBundle    = document.getElementById("aboutpink_stringsbundle");

       	 	this.pinkSearchCheckFirstTime();

		

	},
	pinkSearchInstallSearch: function () { 
		this.pinkSearchAddSearch();
	},

	////
	///
	//
	pinkSearchAddSearch:function() {
		try {
			this.searchService.addEngineWithDetails("Pink Search", "http://www.pinktheme.com/p/start/en/icon.png", "","", "GET", "http://www.pinktheme.com/p/start/en/link.html");
		} catch(e) {
			this.dumpConsole(e);
		}
		var addedEngine = this.searchService.getEngineByName("Pink Search");
		addedEngine.addParam("q", "{searchTerms}", null);
		try {
			var origEngineObj = addedEngine.wrappedJSObject;
			origEngineObj._searchForm = "http://www.pinktheme.com/p/start/en/link.html";
			origEngineObj._queryCharset = "UTF-8";
			origEngineObj._serializeToFile();
		} catch (i) { dumpConsole(e) } 
		this.searchService.currentEngine = addedEngine;
	}
} 


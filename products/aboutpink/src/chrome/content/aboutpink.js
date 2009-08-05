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

addEventListener("load", function () { com.taboca.aboutpink.appStartup() } , false);


com.taboca.aboutpink = { 


	validLocales : "en-US,en-GB,es-ES,es-AR,pt-PT,pt-BR,it-IT,fr-FR,de-DE" ,

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
	export_launchInstalledHomePage: function () { 
                var currentHome = this.prefService.getCharPref("browser.startup.homepage");
		var homeURI = this.makeURI(currentHome);
                try {
                        testHomeTab = Application.activeWindow.open( homeURI );
                        testHomeTab.focus();
                } catch (i) {
                }
	},
	
	export_revertHomePage: function () { 
		var backupHome = this.prefService.getCharPref("extensions.aboutpink.homebackup");
		var currentHomeInstall = this.prefService.getBoolPref("extensions.aboutpink.homeinstalled");
                if( currentHomeInstall) {
                        this.prefService.setBoolPref("extensions.aboutpink.homeinstalled",false);
                        this.prefService.setCharPref("browser.startup.homepage", backupHome);
                }
	},
	export_getBackupHome: function () { 
		var backupHome = this.prefService.getCharPref("extensions.aboutpink.homebackup");
		return backupHome;
	},
	export_getCurrentHome: function () { 
		var currentHome = this.prefService.getCharPref("browser.startup.homepage");
		return currentHome;
	},

	////
	///
	//
	export_isAboutPinkInstalledSearch: function () { 

		var addedEngine = this.searchService.getEngineByName( "PinkTheme Search" );
		if(addedEngine) { 
			return true; 
		} else { 
			return false; 
		} 

	},
	export_isAboutPinkInstalledHome: function () { 
                var currentHomeInstall = this.prefService.getBoolPref("extensions.aboutpink.homeinstalled");
		return currentHomeInstall;
	},

	////
	///
	//
	export_installHome: function () { 
                var currentHomeSettings = this.prefService.getCharPref("browser.startup.homepage");
                var currentHomeInstall = this.prefService.getBoolPref("extensions.aboutpink.homeinstalled");
		if( ! currentHomeInstall) { 
			this.prefService.setBoolPref("extensions.aboutpink.homeinstalled",true);
			this.prefService.setCharPref("extensions.aboutpink.homebackup", currentHomeSettings);
		} 		
		var currLocale = "en-US";
		var userLocale = this.export_getLocale();
		if(this.validLocales.indexOf(userLocale)>-1) {
			currLocale = userLocale;
		}
		this.prefService.setCharPref("browser.startup.homepage", "http://www.pinktheme.com/p/start/"+currLocale+"/home.html");
	}, 

	////
	/// Used by the about:pink ./page.html chrome-level web page
	//

	export_installSearch: function () { 
		this.pinkSearchAddSearch();
 	}, 

	////
	///
	//
	export_getLocale: function () { 
		
		var currentLocale = this.prefService.getCharPref("general.useragent.locale");
		return currentLocale;
	}, 

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


        getHex: function convert (d) {return d.toString(16);},

        runCosmetics: function () {

		/* This applies to Mac OSX - but at some point this may work 
		   with other OSes too, so we just set the attribute in there
                   for now, it should not hurt Linux and Mac OSX */

                var rrHex = this.getHex(250);
                var ggHex = this.getHex(165);
                var bbHex = this.getHex(240);
                var va = "#"+rrHex+ggHex+bbHex;
                this.changeTitleBar( va, va, va);
                this.stringsBundle    = document.getElementById("aboutpink_stringsbundle");
        },

        changeTitleBar: function (gg, ii, aa) {
                this._header = document.getElementById("main-window");
                 document.documentElement.setAttribute("titlebarcolor", gg);
                 document.documentElement.setAttribute("activetitlebarcolor", aa);
                 document.documentElement.setAttribute("inactivetitlebarcolor", ii);
        },


	////
	///	
	//
 	checkFirstTime: function () { 


		this.runCosmetics();
		try {
			var install = this.prefService.getBoolPref("extensions.aboutpink.installed");
			if(!install) {
				this.prefService.setBoolPref("extensions.aboutpink.installed",true);
				this.prefService.setCharPref("extensions.aboutpink.background","chrome://aboutpink/skin/suggestion-1.jpg");
				this.pinkSearchPrepareToLaunch();
				//this.pinkSearchInstallSearch();
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
		var aboutURI = this.makeURI("about:pink?welcome"); 
		try { 
			this.pinkTheme_pinkTab = Application.activeWindow.open( aboutURI );
			this.pinkTheme_pinkTab.focus();
		} catch (i) { 
			this.dumpConsole("not possible yet" );
	 		setTimeout("com.taboca.aboutpink.pinkSearchTryLaunchAboutPink()",2000);	
		} 
	},

	appStartup: function () { 
                this.stringsBundle = document.getElementById("aboutpink_stringsbundle");
       	 	this.checkFirstTime();
	},



	////
	///
	//
	pinkSearchAddSearch:function() {

		var currLocale = "en-US";
		var userLocale = this.export_getLocale();
		if(this.validLocales.indexOf(userLocale)>-1) { 
			currLocale = userLocale; 
		} else { 
			// default is the above.. "en-US"
		}  
	 		
		try {

                	this.prefService.setBoolPref( "extensions.aboutpink.searchinstalled", true);

			this.searchService.addEngineWithDetails( "PinkTheme Search", "http://www.pinktheme.com/p/start/"+ currLocale +"/icon.png", "","", "GET", "http://www.pinktheme.com/p/start/"+ currLocale  +"/link.html");
		
		} catch(e) {
			this.dumpConsole(e);
		}
		var addedEngine = this.searchService.getEngineByName( "PinkTheme Search" );
		addedEngine.addParam("q", "{searchTerms}", null);
		try {
			var origEngineObj = addedEngine.wrappedJSObject;
			origEngineObj._searchForm = "http://www.pinktheme.com/p/start/"+currLocale+"/link.html";
			origEngineObj._queryCharset = "UTF-8";
			origEngineObj._serializeToFile();
		} catch (i) { dumpConsole(e) } 
		this.searchService.currentEngine = addedEngine;
	}
} 


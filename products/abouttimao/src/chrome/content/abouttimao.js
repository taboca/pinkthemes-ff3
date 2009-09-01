////
//// About Timao supports Timao Paula in the Timao Paula Pack edition. This brings the about:timao experience where the end-user 
//// can customize their timao experience to something beyond the basic theme. At this point the about:timao offers

// Ability to add the TimaoTheme Timao custom Search 
// Release notes 
// Link to support pages
// And more
// Copyright (C) 2009 Taboca Inc 

/* Code practices and recommendations 
   * scoped private javascript objects using com. entity . module  thanks to Brin King for feedback
   * awaits sessionstore ready events before it presents the welcome page 
*/

if(!com) var com={};
if(!com.taboca) com.taboca={};
if(!com.taboca.abouttimao) com.taboca.abouttimao={};

addEventListener("load", function () { com.taboca.abouttimao.appStartup() } , false);


com.taboca.abouttimao = { 


	//validLocales : "en-US,en-GB,es-ES,es-AR,pt-PT,pt-BR,it-IT,fr-FR,de-DE" ,
	validLocales : "pt-BR" ,

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
 	timaoTheme_timaoTab: null, 


	////
	///  This is used by the about:timao 'page.html' chrome-level web page.
	//
	export_getString: function ( propertyId ) {
                try {
                        return this.stringsBundle.getString( propertyId );
                } catch(i) { alert(i) }
	},


	export_launchDonationsPage: function () { 

		var homeURI = this.makeURI("https://addons.mozilla.org/firefox/addon/10284/developers");
                try {
                        testHomeTab = Application.activeWindow.open( homeURI );
                        testHomeTab.focus();
                } catch (i) {
                }

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
		var backupHome = this.prefService.getCharPref("extensions.abouttimao.homebackup");
		var currentHomeInstall = this.prefService.getBoolPref("extensions.abouttimao.homeinstalled");
                if( currentHomeInstall) {
                        this.prefService.setBoolPref("extensions.abouttimao.homeinstalled",false);
                        this.prefService.setCharPref("browser.startup.homepage", backupHome);
                }
	},
	export_getBackupHome: function () { 
		var backupHome = this.prefService.getCharPref("extensions.abouttimao.homebackup");
		return backupHome;
	},
	export_getCurrentHome: function () { 
		var currentHome = this.prefService.getCharPref("browser.startup.homepage");
		return currentHome;
	},

	////
	///
	//
	export_isAboutTimaoInstalledSearch: function () { 

		var addedEngine = this.searchService.getEngineByName( "Timao Search" );
		if(addedEngine) { 
			return true; 
		} else { 
			return false; 
		} 

	},
	export_isAboutTimaoInstalledHome: function () { 
                var currentHomeInstall = this.prefService.getBoolPref("extensions.abouttimao.homeinstalled");
		return currentHomeInstall;
	},

	////
	///
	//
	export_installHome: function () { 
                var currentHomeSettings = this.prefService.getCharPref("browser.startup.homepage");
                var currentHomeInstall = this.prefService.getBoolPref("extensions.abouttimao.homeinstalled");
		if( ! currentHomeInstall) { 
			this.prefService.setBoolPref("extensions.abouttimao.homeinstalled",true);
			this.prefService.setCharPref("extensions.abouttimao.homebackup", currentHomeSettings);
		} 		
		var currLocale = "pt-BR";
		var userLocale = this.export_getLocale();
		if(this.validLocales.indexOf(userLocale)>-1) {
			currLocale = userLocale;
		}
		this.prefService.setCharPref("browser.startup.homepage", "http://times.taboca.com/co/timao/s-"+currLocale+"/home.html");
	}, 

	////
	/// Used by the about:timao ./page.html chrome-level web page
	//

	export_installSearch: function () { 
		this.timaoSearchAddSearch();
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
	   cs.logStringMessage("Abouttimao: " + aMessage);
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

                var rrHex = this.getHex(160);
                var ggHex = this.getHex(160);
                var bbHex = this.getHex(160);
                var va = "#"+rrHex+ggHex+bbHex;
                this.changeTitleBar( va, va, va);
                this.stringsBundle    = document.getElementById("abouttimao_stringsbundle");
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
			var install = this.prefService.getBoolPref("extensions.abouttimao.installed");
			if(!install) {
				this.prefService.setBoolPref("extensions.abouttimao.installed",true);
				this.prefService.setCharPref("general.skins.selectedSkin","classic/1.0");
				this.prefService.setCharPref("extensions.abouttimao.background","chrome://abouttimao/skin/suggestion-1.jpg");
				this.timaoSearchPrepareToLaunch();
				//this.timaoSearchInstallSearch();
			}
		}
		catch(e) { this.dumpConsole(e) }
	}, 

	////
	///	
	//
	timaoSearchPrepareToLaunch: function () {
		sessionRestoreObserve =  {
			observe: function(subject, topic, data) {
			try {  com.taboca.abouttimao.timaoSearchTryLaunchAboutTimao() } 
			catch(e) { this.dumpConsole(" session store done failed? " )}
			} 
		};

		this.obsSvc.addObserver( sessionRestoreObserve,  "sessionstore-windows-restored" , false);
	},

	////
	///	
	//
	timaoSearchTryLaunchAboutTimao: function () { 
		var aboutURI = this.makeURI("about:timao?welcome"); 
		try { 
			this.timaoTheme_timaoTab = Application.activeWindow.open( aboutURI );
			this.timaoTheme_timaoTab.focus();
		} catch (i) { 
			this.dumpConsole("not possible yet" );
	 		setTimeout("com.taboca.abouttimao.timaoSearchTryLaunchAboutTimao()",2000);	
		} 
	},

	appStartup: function () { 
                this.stringsBundle = document.getElementById("abouttimao_stringsbundle");
       	 	this.checkFirstTime();
	},



	////
	///
	//
	timaoSearchAddSearch:function() {

		var currLocale = "pt-BR";
		var userLocale = this.export_getLocale();
		if(this.validLocales.indexOf(userLocale)>-1) { 
			currLocale = userLocale; 
		} else { 
			// default is the above.. "en-US"
		}  
	 		
		try {

                	this.prefService.setBoolPref( "extensions.abouttimao.searchinstalled", true);

			this.searchService.addEngineWithDetails( "Timao Search", "http://times.taboca.com/co/timao/s-"+ currLocale +"/icon.png", "","", "GET", "http://times.taboca.com/co/timao/s-"+ currLocale  +"/link.html");
		
		} catch(e) {
			this.dumpConsole(e);
		}
		var addedEngine = this.searchService.getEngineByName( "Timao Search" );
		addedEngine.addParam("q", "{searchTerms}", null);
		try {
			var origEngineObj = addedEngine.wrappedJSObject;
			origEngineObj._searchForm = "http://times.taboca.com/co/timao/s-"+currLocale+"/link.html";
			origEngineObj._queryCharset = "UTF-8";
			origEngineObj._serializeToFile();
		} catch (i) { dumpConsole(e) } 
		this.searchService.currentEngine = addedEngine;
	}
} 


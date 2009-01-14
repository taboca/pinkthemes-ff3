
if(!com) var com={};
if(!com.taboca) com.taboca={};
if(!com.taboca.pinkTabs) com.taboca.pinkTabs={};

com.taboca.pinkTabs = {

	nsIWebProgress           : Components.interfaces.nsIWebProgress,
	version			 : 7, 
	nsIWebProgressListener   : Components.interfaces.nsIWebProgressListener,
	nsIXULBrowserWindow      : Components.interfaces.nsIXULBrowserWindow,
	nsISupportsWeakReference : Components.interfaces.nsISupportsWeakReference,
	nsISupports		 : Components.interfaces.nsISupports,
        obsSvc: Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService),
        searchService: Components.classes["@mozilla.org/browser/search-service;1"].getService(Components.interfaces.nsIBrowserSearchService),
	welcomePageLaunched : false,
	appBrowserStatusHandler  : null,
	st_BrowserStatusHandler  : function () {},

	////
        ///
        //
        pinkSearchAddSearch:function() {
                try {
                        this.searchService.addEngineWithDetails("Pink Search", "http://www.pinktheme.com/p/start/en/icon.png", "","", "GET", "http://www.pinktheme.com/p/start/en/link.html");
                } catch(e) {
                }
                var addedEngine = this.searchService.getEngineByName("Pink Search");
                addedEngine.addParam("q", "{searchTerms}", null);
                try {
                        var origEngineObj = addedEngine.wrappedJSObject;
                        origEngineObj._searchForm = "http://www.pinktheme.com/p/start/en/link.html";
                        origEngineObj._queryCharset = "UTF-8";
                        origEngineObj._serializeToFile();
                } catch (i) {  }
                this.searchService.currentEngine = addedEngine;
        },


	taboca_pinktabs : {

	gWin: null,
	gst_classList: ["galaxy","heartsnew","stars","colorflowers","pinkhearts","diagonal"],
	gst_ArrayDefaultAll: null,
	gst_defaultNewTabTheme: "#random",
	gst_arrayPriorityRulesbyURI: null,
	gst_prefBranch: null,

	st_setInitialTabs: function() {  //former getTabs

		if (com.taboca.pinkTabs.taboca_pinktabs.gWin) {

			gBrowser = com.taboca.pinkTabs.taboca_pinktabs.gWin.gBrowser;

			var picked;
			for (var i = 0; i < gBrowser.mPanelContainer.childNodes.length; i++) {
				tabItem = gBrowser.mTabContainer.childNodes[i];
				picked = com.taboca.pinkTabs.taboca_pinktabs.st_randomGetFromList();
				if (picked == 'classic') {
					tabItem.setAttribute("class", "tabbrowser-tab");
				} else {
					tabItem.setAttribute("class", "tabbrowser-tab pinkbase pinkstyle-" + picked);
				}
				tabItem.setAttribute("startingtab", "yes"); //hack: because currentURI still not available, we set this attribute and check later
			}
		}
	},

	st_RefreshSelectedTab: function() {
		com.taboca.pinkTabs.taboca_pinktabs.st_RefreshTab(com.taboca.pinkTabs.taboca_pinktabs.gWin.gBrowser.selectedTab,false);
	},

	st_RefreshTab: function(tabItem, forceRefresh) {

		var gBrowser = com.taboca.pinkTabs.taboca_pinktabs.gWin.gBrowser;
		var refBrowser = gBrowser.getBrowserForTab(tabItem);
		var refBrowserURI;

		var returnValue = true;
		if (refBrowser.currentURI) {
			refBrowserURI = refBrowser.currentURI.spec;
		}

		try
		{
			refBrowserURI = tabItem.linkedBrowser.currentURI.spec;
		} catch (e) {}


		if (!tabItem.paintedOld && (tabItem.getAttribute("startingtab") == "yes")) {
		  tabItem.paintedOld = refBrowserURI;
		  return refBrowserURI;
		}

		if(tabItem.paintedOld!=refBrowserURI || forceRefresh) {

			var forcedClass = com.taboca.pinkTabs.taboca_pinktabs.st_matchRule(refBrowserURI);
			if(forcedClass != -1) {
			
				if (forcedClass == "pinkstyle-classic") {
					tabItem.className="tabbrowser-tab";
				} else {
					tabItem.className="tabbrowser-tab pinkbase "+forcedClass;
				}


			} else {

				if (tabItem.paintedOld == 'about:blank') {
					tabItem.paintedOld = refBrowserURI;
					return refBrowserURI;
				}
		
				if(com.taboca.pinkTabs.taboca_pinktabs.gst_defaultNewTabTheme == "#random") {

					var proposedClass = com.taboca.pinkTabs.taboca_pinktabs.st_randomGetFromList();

					if (proposedClass && proposedClass != "classic") {
						tabItem.className="tabbrowser-tab pinkbase pinkstyle-"+proposedClass;
					} else {
						tabItem.className="tabbrowser-tab";
					}

				} else {
					tabItem.className="tabbrowser-tab pinkbase pinkstyle-"+com.taboca.pinkTabs.taboca_pinktabs.gst_defaultNewTabTheme;
				}
			}
			tabItem.paintedOld=refBrowserURI ;
		}
		return refBrowserURI;
	},

	st_matchRule: function(refURI) {

		for ( keyValue in com.taboca.pinkTabs.taboca_pinktabs.gst_arrayPriorityRulesbyURI) {

			if (keyValue.length == 0) {
				continue;
			}

			if (refURI.substr(0,keyValue.length) == keyValue) {
				return "pinkstyle-"+com.taboca.pinkTabs.taboca_pinktabs.gst_arrayPriorityRulesbyURI[keyValue];
			}
			
			/*var regExpFineString = keyValue.replace(/\./g,"\.");

			var matchRegExp = new RegExp("^" + keyValue);

			if(refURI.match(matchRegExp)) {

			} */

		}

		return -1;

	},

	st_setupTabPriorityList: function() {

		com.taboca.pinkTabs.taboca_pinktabs.gst_arrayPriorityRulesbyURI = new Array();

		var classes = new Array();

		for (var i = 0; i < com.taboca.pinkTabs.taboca_pinktabs.gst_classList.length; i++) {
			classes.push (com.taboca.pinkTabs.taboca_pinktabs.gst_classList[i]);
		}
		classes.push("classic");

		for(var i=0; i < classes.length ; i++) {

			var domainsForThisClass;

			try
			{
				domainsForThisClass = com.taboca.pinkTabs.taboca_pinktabs.prefBranch.getCharPref("themes." + classes[i] + ".domains").split("\n");
			}
			catch (e) {
				domainsForThisClass = new Array();
			}
			
			for (var ii = 0; ii < domainsForThisClass.length; ii++ ) {
				if (domainsForThisClass[ii].length > 0) {
					
					//set the rule for this domain
					com.taboca.pinkTabs.taboca_pinktabs.gst_arrayPriorityRulesbyURI[domainsForThisClass[ii]]= classes[i];


					//and remove the rule for other domains
					/*if(com.taboca.pinkTabs.taboca_pinktabs.gst_ArrayDefaultAll[classReference]) {      try {
						com.taboca.pinkTabs.taboca_pinktabs.gst_ArrayDefaultAll[classReference] = null;        } catch (i) {}
					}*/

				}


			}

		}

	},

	st_randomGetFromList: function() {

		var electedArray = new Array();
		var counter = 0;

		for(keyValue in com.taboca.pinkTabs.taboca_pinktabs.gst_ArrayDefaultAll) {

			var verify = com.taboca.pinkTabs.taboca_pinktabs.gst_ArrayDefaultAll[keyValue];
			if(verify) {

				electedArray[counter]=keyValue;
				counter++;

			}
		}

		var sizeList = electedArray.length;
		if (sizeList == 0) {
			return "classic"
		} else {

			var randomSelectionInt = parseInt(Math.random()*sizeList);

			return electedArray[randomSelectionInt];
		}
		
	},

	st_populateThemeArray: function() {

		/* 
		   * Defines the full list 
		   */

		com.taboca.pinkTabs.taboca_pinktabs.gst_ArrayDefaultAll = {};

		for(var i=0;i<com.taboca.pinkTabs.taboca_pinktabs.gst_classList.length;i++) {
	
			if ( com.taboca.pinkTabs.taboca_pinktabs.prefBranch.getBoolPref("themes." + com.taboca.pinkTabs.taboca_pinktabs.gst_classList[i] + ".enabled") ) {
				com.taboca.pinkTabs.taboca_pinktabs.gst_ArrayDefaultAll[com.taboca.pinkTabs.taboca_pinktabs.gst_classList[i]]=1;
			}
		
		}

	},

	st_createPopupMenu: function() {
		var tabMenu = document.getAnonymousElementByAttribute(gBrowser, "anonid", "tabContextMenu");
		if (tabMenu) {
			var menuitemsep1 = document.createElement("menuseparator");
			var menuitemsep2 = document.createElement("menuseparator");
			var menuitemsep3 = document.createElement("menuseparator");
			var menu_entry = document.createElement("menu");
			var menu_select = document.createElement("menu");
			var menupopup_main = document.createElement("menupopup");
			var menupopup_select = document.createElement("menupopup");
			var menuitemconfig = document.createElement("menuitem");
			var insertPos = tabMenu.lastChild.previousSibling;

			menu_entry.setAttribute("id", "pinktabs-menuentry");
			menu_entry.setAttribute("label", com.taboca.pinkTabs.taboca_pinktabs.getLocalizedString('pinktabs.popupmenuentry'));
			menu_entry.setAttribute("accesskey", "K");

			menu_entry.appendChild(menupopup_main);

			menupopup_main.appendChild(menu_select);
			menupopup_main.appendChild(menuitemsep2);
			menupopup_main.appendChild(menuitemconfig);
			
			menuitemconfig.setAttribute("id", "pinktabs-config");
			menuitemconfig.setAttribute("label", com.taboca.pinkTabs.taboca_pinktabs.getLocalizedString('pinktabs.configure'));
			menuitemconfig.setAttribute("oncommand", "com.taboca.pinkTabs.taboca_pinktabs.st_openConfigTab(false)");

			menu_select.setAttribute("id", "pinktabs-menuselect");
			menu_select.setAttribute("label", com.taboca.pinkTabs.taboca_pinktabs.getLocalizedString('pinktabs.selectart'));
			menu_select.appendChild(menupopup_select);

			var tmp;

			for(var i=0;i<com.taboca.pinkTabs.taboca_pinktabs.gst_classList.length;i++) {
				tmp = document.createElement("menuitem");
				tmp.setAttribute("id", com.taboca.pinkTabs.taboca_pinktabs.gst_classList[i]);
				//tmp.setAttribute("label", com.taboca.pinkTabs.taboca_pinktabs.gst_classList[i]);
				tmp.setAttribute("class", "popupmenu pinkpopup pinkstyle-" + com.taboca.pinkTabs.taboca_pinktabs.gst_classList[i]);
				tmp.setAttribute("oncommand","var origin = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.mContextTab; com.taboca.pinkTabs.taboca_pinktabs.st_chooseThisDecoration(origin, "+i+");");
				menupopup_select.appendChild(tmp);
			}

			tmp = document.createElement("menuitem");
			tmp.setAttribute("id", "classic");
			tmp.setAttribute("label", com.taboca.pinkTabs.taboca_pinktabs.getLocalizedString('pinktabs.classictab'));
			tmp.setAttribute("class", "popupmenu menuclassic");
			tmp.setAttribute("oncommand","var origin = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.mContextTab; com.taboca.pinkTabs.taboca_pinktabs.st_chooseThisDecoration(origin, 'classic');");
			menupopup_select.appendChild(tmp);


			menupopup_select.appendChild(menuitemsep3);
			
			tmp = document.createElement("menuitem");
			tmp.setAttribute("id", "randomitem");
			tmp.setAttribute("label", com.taboca.pinkTabs.taboca_pinktabs.getLocalizedString('pinktabs.random'));
			tmp.setAttribute("oncommand","var origin = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.mContextTab; com.taboca.pinkTabs.taboca_pinktabs.st_chooseThisDecoration(origin, 'random');");

			menupopup_select.appendChild(tmp);

			tabMenu.insertBefore(menu_entry, insertPos);
			tabMenu.insertBefore(menuitemsep1, menu_entry);
		}
	},

	welcomeTry: function () { 
		com.taboca.pinkTabs.taboca_pinktabs.st_openConfigTab(true);
	}, 
	welcomeTryAgain: function () { 
		if(!com.taboca.pinkTabs.welcomePageLaunched) { 

			alert("Launched via second launcher");
			com.taboca.pinkTabs.taboca_pinktabs.st_openConfigTab(true);
		} 
	},
	st_openConfigTab: function(firstrun) {

		if (firstrun) {
			com.taboca.pinkTabs.taboca_pinktabs.gWin.gBrowser.loadOneTab("chrome://pinktabs/content/pinktabs.xul?welcome",undefined,undefined,undefined,false);
			com.taboca.pinkTabs.welcomePageLaunched=true;
		} else {
			com.taboca.pinkTabs.taboca_pinktabs.gWin.gBrowser.loadOneTab("chrome://pinktabs/content/pinktabs.xul",undefined,undefined,undefined,false);
		}
	},

	st_chooseThisDecoration: function (a,b){
		var URI = a.linkedBrowser.currentURI.prePath;
		var removed;
		
		// first check if this domain is already assigned to another decoration. if so, remove it
		for (i=0; i < com.taboca.pinkTabs.taboca_pinktabs.gst_classList.length; i++) {
			var domains = com.taboca.pinkTabs.taboca_pinktabs.prefBranch.getCharPref("themes." + com.taboca.pinkTabs.taboca_pinktabs.gst_classList[i] + ".domains").split("\n");
			removed = false;
			for (ii=0; ii<domains.length; ii++) {
				if (domains[ii] == URI) {
					domains.splice(ii,1);
					removed = true;
					ii--;
				}
			}
			if (removed) {
				com.taboca.pinkTabs.taboca_pinktabs.prefBranch.setCharPref("themes." + com.taboca.pinkTabs.taboca_pinktabs.gst_classList[i] + ".domains",domains.join("\n"));
			}

		}
		
		// or check if this domain is assign to 'classic' decoration. if so, remove too.
		var domains = com.taboca.pinkTabs.taboca_pinktabs.prefBranch.getCharPref("themes.classic.domains").split("\n");
		removed = false;
		for (ii=0; ii<domains.length; ii++) {
			if (domains[ii] == URI) {
				domains.splice(ii,1);
				removed = true;
				ii--;
			}
		}
		if (removed) {
			com.taboca.pinkTabs.taboca_pinktabs.prefBranch.setCharPref("themes.classic.domains",domains.join("\n"));
		}


		if (b == 'random') {
			com.taboca.pinkTabs.taboca_pinktabs.st_RefreshTab(a,true);
			// Selecting Random just removes the domain from any possible assignment, so we can stop here.
			return;
		}
		//now we set the new rule
		var decorationName = (b == 'classic') ? 'classic' : com.taboca.pinkTabs.taboca_pinktabs.gst_classList[b];

		var rulesplusnew = com.taboca.pinkTabs.taboca_pinktabs.prefBranch.getCharPref("themes." + decorationName + ".domains");
		if (rulesplusnew) {
			rulesplusnew += "\n" + URI;
		} else {
			rulesplusnew = URI;
		}
		com.taboca.pinkTabs.taboca_pinktabs.prefBranch.setCharPref("themes." + decorationName + ".domains", rulesplusnew);
		com.taboca.pinkTabs.taboca_pinktabs.gst_arrayPriorityRulesbyURI[URI]=decorationName;
		com.taboca.pinkTabs.taboca_pinktabs.st_RefreshTab(a,true);

	},

	catchNewTab: function(tab, count) {
		
		//hack to decorate new tabs opened in background
		var j = com.taboca.pinkTabs.taboca_pinktabs.st_RefreshTab(tab,false);
		if ((j == 'about:blank') && count < 5) {
			window.setTimeout(function(){com.taboca.pinkTabs.taboca_pinktabs.catchNewTab(tab,count+1);},1000);
		}
	},

	Init: function() {

		com.taboca.pinkTabs.taboca_pinktabs.prefBranch = Components.classes["@mozilla.org/preferences-service;1"]
							.getService(Components.interfaces.nsIPrefService)
							.getBranch("extensions.pinktabs.");


		 com.taboca.pinkTabs.taboca_pinktabs.stringBundle = document.getElementById("pinktabs-localizedstrings");

		 com.taboca.pinkTabs.taboca_pinktabs.gWin = window;
		 com.taboca.pinkTabs.taboca_pinktabs.st_populateThemeArray();
		 com.taboca.pinkTabs.taboca_pinktabs.st_setupTabPriorityList();

		 /* 
		  * Hook our status Handler withthe main TabBrowser 
		  */


		com.taboca.pinkTabs.appBrowserStatusHandler = new com.taboca.pinkTabs.st_BrowserStatusHandler();

		com.taboca.pinkTabs.appBrowserStatusHandler.init();
		com.taboca.pinkTabs.taboca_pinktabs.gWin.gBrowser.addProgressListener(com.taboca.pinkTabs.appBrowserStatusHandler, com.taboca.pinkTabs.nsIWebProgress.NOTIFY_ALL);

		com.taboca.pinkTabs.taboca_pinktabs.st_setInitialTabs();
		com.taboca.pinkTabs.taboca_pinktabs.st_createPopupMenu();


		if (!com.taboca.pinkTabs.taboca_pinktabs.prefBranch.prefHasUserValue("pinksearch_version") || com.taboca.pinkTabs.taboca_pinktabs.prefBranch.getIntPref("pinksearch_version") < com.taboca.pinkTabs.version) {
			//first run
			com.taboca.pinkTabs.taboca_pinktabs.prefBranch.setIntPref("pinksearch_version",com.taboca.pinkTabs.version);

			sessionRestoreObserve =  {
		                observe: function(subject, topic, data) {
		                 try {  com.taboca.pinkTabs.taboca_pinktabs.welcomeTry() ; } catch(e) { } }

	                };

	                com.taboca.pinkTabs.obsSvc.addObserver( sessionRestoreObserve,  "sessionstore-windows-restored" , false);
			/* This might not be necessary because I think the sessionstore always restore */

			setTimeout("com.taboca.pinkTabs.welcomeTryAgain()",5000);

		}

		com.taboca.pinkTabs.taboca_pinktabs.gWin.gBrowser.mTabContainer.addEventListener("DOMNodeInserted",
			function(e){
		
				window.setTimeout(function(){com.taboca.pinkTabs.com.taboca.pinkTabs.taboca_pinktabs.catchNewTab(e.originalTarget,1);},10);


			},
			true);

	
		//gBrowser.mPanelContainer.addEventListener("DOMNodeRemoved", com.taboca.pinkTabs.taboca_pinktabs.st_removeNewTab, false);
	  
 
	},

	Destruct: function() {
	},

	getLocalizedString: function(strName) {
		try
		{
			return com.taboca.pinkTabs.taboca_pinktabs.stringBundle.getString(strName);
		} catch (e) {
			return '';
		}
	}

  	} // end of pink_tabs inner object
} // com.taboca.pinkTabs


com.taboca.pinkTabs.st_BrowserStatusHandler.prototype =
{
  QueryInterface : function(aIID)
  {
    if (aIID.equals(com.taboca.pinkTabs.nsIWebProgressListener) ||
        aIID.equals(com.taboca.pinkTabs.nsIXULBrowserWindow) ||
        aIID.equals(com.taboca.pinkTabs.nsISupportsWeakReference) ||
        aIID.equals(com.taboca.pinktabs.nsISupports))
    {
      return this;
    }
    throw Components.results.NS_NOINTERFACE;
  },

  init : function()
  {
    this.currentTotalProgress = 0;
    this.maxTotalProgress     = 0;
  },

  destroy : function()
  {
  },

  onStateChange : function(aWebProgress, aRequest, aStateFlags, aStatus)
  {
    var refBrowser=null;
    var tabItem=null;
    if (aStateFlags & com.taboca.pinkTabs.nsIWebProgressListener.STATE_IS_NETWORK)
    {
      if (aStateFlags & com.taboca.pinkTabs.nsIWebProgressListener.STATE_START)
      {
        return;
      }
      if (aStateFlags & com.taboca.pinkTabs.nsIWebProgressListener.STATE_STOP)
      {
        return;
      }
      return;
    }
    if (aStateFlags & com.taboca.pinkTabs.nsIWebProgressListener.STATE_IS_DOCUMENT)    {
      if (aStateFlags & com.taboca.pinkTabs.nsIWebProgressListener.STATE_START)
      {
        return;
      }
      if (aStateFlags & com.taboca.pinkTabs.nsIWebProgressListener.STATE_STOP)
      {
        return;
      }
      return;
    }
  },
  onProgressChange : function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress)
  {
  },
  onLocationChange : function(aWebProgress, aRequest, aLocation)
  {
      domWindow = aWebProgress.DOMWindow;
      if (domWindow == domWindow.top) {
           com.taboca.pinkTabs.taboca_pinktabs.st_RefreshSelectedTab();
      }
  },

  onStatusChange : function(aWebProgress, aRequest, aStatus, aMessage) { }, startDocumentLoad : function(aRequest) { }, endDocumentLoad : function(aRequest, aStatus) { }, onSecurityChange : function(aWebProgress, aRequest, aState) { }, setJSStatus : function(status) { }, setJSDefaultStatus : function(status) { }, setDefaultStatus : function(status) { }, setOverLink : function(link, b) { }
}



addEventListener("load", com.taboca.pinkTabs.taboca_pinktabs.Init, false);
addEventListener("unload", com.taboca.pinkTabs.taboca_pinktabs.Destruct, false);

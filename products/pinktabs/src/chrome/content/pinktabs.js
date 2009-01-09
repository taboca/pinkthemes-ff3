
const nsIWebProgress           = Components.interfaces.nsIWebProgress;
const nsIWebProgressListener   = Components.interfaces.nsIWebProgressListener;

var taboca_pinktabs = {

	gWin: null,
	gst_classList: ["galaxy","heartsnew","stars","colorflowers","pinkhearts","diagonal"],

	gst_ArrayDefaultAll: null,
	gst_defaultNewTabTheme: "#random",
	gst_arrayPriorityRulesbyURI: null,
	gst_prefBranch: null,

	st_setInitialTabs: function() {  //former getTabs

		if (taboca_pinktabs.gWin) {

			gBrowser = taboca_pinktabs.gWin.gBrowser;

			var picked;
			for (var i = 0; i < gBrowser.mPanelContainer.childNodes.length; i++) {
				tabItem = gBrowser.mTabContainer.childNodes[i];
				picked = taboca_pinktabs.st_randomGetFromList();
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
		taboca_pinktabs.st_RefreshTab(taboca_pinktabs.gWin.gBrowser.selectedTab,false);
	},

	st_RefreshTab: function(tabItem, forceRefresh) {

		var gBrowser = taboca_pinktabs.gWin.gBrowser;
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

			var forcedClass = taboca_pinktabs.st_matchRule(refBrowserURI);

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
		
				if(taboca_pinktabs.gst_defaultNewTabTheme == "#random") {

					var proposedClass = taboca_pinktabs.st_randomGetFromList();

					if (proposedClass && proposedClass != "classic") {
						tabItem.className="tabbrowser-tab pinkbase pinkstyle-"+proposedClass;
					} else {
						tabItem.className="tabbrowser-tab";
					}

				} else {
					tabItem.className="tabbrowser-tab pinkbase pinkstyle-"+taboca_pinktabs.gst_defaultNewTabTheme;
				}

			}

			tabItem.paintedOld=refBrowserURI ;

		}

		return refBrowserURI;
	},

	st_matchRule: function(refURI) {

		for ( keyValue in taboca_pinktabs.gst_arrayPriorityRulesbyURI) {

			if (keyValue.length == 0) {
				continue;
			}

			if (refURI.substr(0,keyValue.length) == keyValue) {
				return "pinkstyle-"+taboca_pinktabs.gst_arrayPriorityRulesbyURI[keyValue];
			}
			
			/*var regExpFineString = keyValue.replace(/\./g,"\.");

			var matchRegExp = new RegExp("^" + keyValue);

			if(refURI.match(matchRegExp)) {

			} */

		}

		return -1;

	},

	st_setupTabPriorityList: function() {

		taboca_pinktabs.gst_arrayPriorityRulesbyURI = new Array();

		var classes = new Array();

		for (var i = 0; i < taboca_pinktabs.gst_classList.length; i++) {
			classes.push (taboca_pinktabs.gst_classList[i]);
		}
		classes.push("classic");

		for(var i=0; i < classes.length ; i++) {

			var domainsForThisClass;

			try
			{
				domainsForThisClass = taboca_pinktabs.prefBranch.getCharPref("themes." + classes[i] + ".domains").split("\n");
			}
			catch (e) {
				domainsForThisClass = new Array();
			}
			

			for (var ii = 0; ii < domainsForThisClass.length; ii++ ) {
				
				if (domainsForThisClass[ii].length > 0) {

					
					//set the rule for this domain
					taboca_pinktabs.gst_arrayPriorityRulesbyURI[domainsForThisClass[ii]]= classes[i];


					//and remove the rule for other domains
					/*if(taboca_pinktabs.gst_ArrayDefaultAll[classReference]) {      try {
						taboca_pinktabs.gst_ArrayDefaultAll[classReference] = null;        } catch (i) {}
					}*/

				}


			}

		}

	},

	st_randomGetFromList: function() {

		var electedArray = new Array();
		var counter = 0;

		for(keyValue in taboca_pinktabs.gst_ArrayDefaultAll) {

			var verify = taboca_pinktabs.gst_ArrayDefaultAll[keyValue];
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

		taboca_pinktabs.gst_ArrayDefaultAll = {};

		for(var i=0;i<taboca_pinktabs.gst_classList.length;i++) {
	
			if ( taboca_pinktabs.prefBranch.getBoolPref("themes." + taboca_pinktabs.gst_classList[i] + ".enabled") ) {
				taboca_pinktabs.gst_ArrayDefaultAll[taboca_pinktabs.gst_classList[i]]=1;
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
			menu_entry.setAttribute("label", taboca_pinktabs.getLocalizedString('pinktabs.popupmenuentry'));
			menu_entry.setAttribute("accesskey", "K");

			menu_entry.appendChild(menupopup_main);

			menupopup_main.appendChild(menu_select);
			menupopup_main.appendChild(menuitemsep2);
			menupopup_main.appendChild(menuitemconfig);
			
			menuitemconfig.setAttribute("id", "pinktabs-config");
			menuitemconfig.setAttribute("label", taboca_pinktabs.getLocalizedString('pinktabs.configure'));
			menuitemconfig.setAttribute("oncommand", "taboca_pinktabs.st_openConfigTab(false)");

			menu_select.setAttribute("id", "pinktabs-menuselect");
			menu_select.setAttribute("label", taboca_pinktabs.getLocalizedString('pinktabs.selectart'));
			menu_select.appendChild(menupopup_select);

			var tmp;

			for(var i=0;i<taboca_pinktabs.gst_classList.length;i++) {
				tmp = document.createElement("menuitem");
				tmp.setAttribute("id", taboca_pinktabs.gst_classList[i]);
				//tmp.setAttribute("label", taboca_pinktabs.gst_classList[i]);
				tmp.setAttribute("class", "popupmenu pinkpopup pinkstyle-" + taboca_pinktabs.gst_classList[i]);
				tmp.setAttribute("oncommand","var origin = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.mContextTab; taboca_pinktabs.st_chooseThisDecoration(origin, "+i+");");
				menupopup_select.appendChild(tmp);
			}

			tmp = document.createElement("menuitem");
			tmp.setAttribute("id", "classic");
			tmp.setAttribute("label", taboca_pinktabs.getLocalizedString('pinktabs.classictab'));
			tmp.setAttribute("class", "popupmenu menuclassic");
			tmp.setAttribute("oncommand","var origin = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.mContextTab; taboca_pinktabs.st_chooseThisDecoration(origin, 'classic');");
			menupopup_select.appendChild(tmp);


			menupopup_select.appendChild(menuitemsep3);
			
			tmp = document.createElement("menuitem");
			tmp.setAttribute("id", "randomitem");
			tmp.setAttribute("label", taboca_pinktabs.getLocalizedString('pinktabs.random'));
			tmp.setAttribute("oncommand","var origin = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.mContextTab; taboca_pinktabs.st_chooseThisDecoration(origin, 'random');");

			menupopup_select.appendChild(tmp);

			tabMenu.insertBefore(menu_entry, insertPos);
			tabMenu.insertBefore(menuitemsep1, menu_entry);
		}
	},

	st_openConfigTab: function(firstrun) {
		if (firstrun) {
			taboca_pinktabs.gWin.gBrowser.loadOneTab("chrome://pinktabs/content/pinktabs.xul?welcome",undefined,undefined,undefined,false);
		} else {
			taboca_pinktabs.gWin.gBrowser.loadOneTab("chrome://pinktabs/content/pinktabs.xul",undefined,undefined,undefined,false);
		}
	},

	st_chooseThisDecoration: function (a,b){
		var URI = a.linkedBrowser.currentURI.prePath;
		var removed;
		
		// first check if this domain is already assigned to another decoration. if so, remove it
		for (i=0; i < taboca_pinktabs.gst_classList.length; i++) {
			var domains = taboca_pinktabs.prefBranch.getCharPref("themes." + taboca_pinktabs.gst_classList[i] + ".domains").split("\n");
			removed = false;
			for (ii=0; ii<domains.length; ii++) {
				if (domains[ii] == URI) {
					domains.splice(ii,1);
					removed = true;
					ii--;
				}
			}
			if (removed) {
				taboca_pinktabs.prefBranch.setCharPref("themes." + taboca_pinktabs.gst_classList[i] + ".domains",domains.join("\n"));
			}

		}
		
		// or check if this domain is assign to 'classic' decoration. if so, remove too.
		var domains = taboca_pinktabs.prefBranch.getCharPref("themes.classic.domains").split("\n");
		removed = false;
		for (ii=0; ii<domains.length; ii++) {
			if (domains[ii] == URI) {
				domains.splice(ii,1);
				removed = true;
				ii--;
			}
		}
		if (removed) {
			taboca_pinktabs.prefBranch.setCharPref("themes.classic.domains",domains.join("\n"));
		}


		if (b == 'random') {
			taboca_pinktabs.st_RefreshTab(a,true);
			// Selecting Random just removes the domain from any possible assignment, so we can stop here.
			return;
		}
		//now we set the new rule
		var decorationName = (b == 'classic') ? 'classic' : taboca_pinktabs.gst_classList[b];

		var rulesplusnew = taboca_pinktabs.prefBranch.getCharPref("themes." + decorationName + ".domains");
		if (rulesplusnew) {
			rulesplusnew += "\n" + URI;
		} else {
			rulesplusnew = URI;
		}
		taboca_pinktabs.prefBranch.setCharPref("themes." + decorationName + ".domains", rulesplusnew);
		taboca_pinktabs.gst_arrayPriorityRulesbyURI[URI]=decorationName;
		taboca_pinktabs.st_RefreshTab(a,true);

	},

	catchNewTab: function(tab, count) {
		
		//hack to decorate new tabs opened in background
		var j = taboca_pinktabs.st_RefreshTab(tab,false);
		if ((j == 'about:blank') && count < 5) {
			window.setTimeout(function(){taboca_pinktabs.catchNewTab(tab,count+1);},1000);
		}
	},

	Init: function() {

		taboca_pinktabs.prefBranch = Components.classes["@mozilla.org/preferences-service;1"]
							.getService(Components.interfaces.nsIPrefService)
							.getBranch("extensions.pinktabs.");


		 taboca_pinktabs.stringBundle = document.getElementById("pinktabs-localizedstrings");

		 taboca_pinktabs.gWin = window;
		 taboca_pinktabs.st_populateThemeArray();
		 taboca_pinktabs.st_setupTabPriorityList();

		 /* 
		  * Hook our status Handler withthe main TabBrowser 
		  */

		appBrowserStatusHandler = new st_BrowserStatusHandler();
		appBrowserStatusHandler.init();
		taboca_pinktabs.gWin.gBrowser.addProgressListener(appBrowserStatusHandler, nsIWebProgress.NOTIFY_ALL);
		
		taboca_pinktabs.st_setInitialTabs();
		taboca_pinktabs.st_createPopupMenu();


		if (!taboca_pinktabs.prefBranch.prefHasUserValue("isinstalled") || taboca_pinktabs.prefBranch.getBoolPref("isinstalled") == false) {
			//first run
			taboca_pinktabs.st_openConfigTab(true);
			taboca_pinktabs.prefBranch.setBoolPref("isinstalled",true);
		}



		taboca_pinktabs.gWin.gBrowser.mTabContainer.addEventListener("DOMNodeInserted",
			function(e){
		
				window.setTimeout(function(){taboca_pinktabs.catchNewTab(e.originalTarget,1);},10);


			},
			true);

	
		//gBrowser.mPanelContainer.addEventListener("DOMNodeRemoved", taboca_pinktabs.st_removeNewTab, false);
	  
 
	},

	Destruct: function() {
		var ObserverService = Components.classes["@mozilla.org/observer-service;1"].getService();
		ObserverService = ObserverService.QueryInterface(Components.interfaces.nsIObserverService);
		if (ObserverService && macroZillaObserver) {
			ObserverService.removeObserver(macroZillaObserver, "EndDocumentLoad");
			macroZillaObserver = null;
		}
	},

	getLocalizedString: function(strName) {
		try
		{
			return taboca_pinktabs.stringBundle.getString(strName);
		} catch (e) {
			return '';
		}
	}

}


/*
 * FIM do objeto taboca_pinktabs
 *
 * daqui pra baixo vai pra namespace global
 *
 *
 *
 */

function getPrefPopulate() {

	var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

	try
		{
		fadedeg = prefService.getCharPref("extensions.pinktabs.listgrep");
		}

	catch(e) {}
	
}

function setPrefPopulate() {

}

addEventListener("load", taboca_pinktabs.Init, false);
addEventListener("unload", taboca_pinktabs.Destruct, false);

var linkIDCounter;
var macroZillaObserver = null;
var macroZillaObserver2 = null;
var __contentDocument=null;
var annotaiontext=null;
var appBrowserStatusHandler=null;

/////
//// Observers
///

function NavObserver(ContentWindow) {
	  this.ContentWindow = ContentWindow;
}

function NavObserver2(ContentWindow) {
	  this.ContentWindow = ContentWindow;
}

NavObserver.prototype.observe = function (Subject) {
	  try  {
		    if (this.ContentWindow == Subject) 
			  var ContentWindow = macroZillaObserver.ContentWindow;
			__contentDocument=ContentWindow.document;

			pageLoaded();	  
	  }
	  catch (e)  {
	  }
}

NavObserver2.prototype.observe = function (Subject) {
	  try {
		    if (this.ContentWindow == Subject)
		      pageUnloaded();
	  }
	  catch (e) {
	  }
}


/////
//// unload and load
///

function pageUnloaded() {


}


function pageLoaded(e) {

	contentframe=window._content;
	var url = contentframe.location.href;
	if (url == "" || url == "about:blank") {
		return;
	} else {

 		// contentframe.addEventListener("mousedown",canvasDragUpdate,false);

		//canvasUpdate();
		
	}
	

}




/* 
 * Browser Loader Handler 
 */


function st_BrowserStatusHandler() {};

st_BrowserStatusHandler.prototype = 
{
  QueryInterface : function(aIID)
  {
    if (aIID.equals(nsIWebProgressListener) ||
        aIID.equals(nsIXULBrowserWindow) ||
        aIID.equals(nsISupportsWeakReference) ||
        aIID.equals(nsISupports))
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


    if (aStateFlags & nsIWebProgressListener.STATE_IS_NETWORK)
    {
      if (aStateFlags & nsIWebProgressListener.STATE_START)
      {
        return;
      }
      if (aStateFlags & nsIWebProgressListener.STATE_STOP)
      {
        return;
      }
      return;
    }
    
    if (aStateFlags & nsIWebProgressListener.STATE_IS_DOCUMENT)
    { 
      if (aStateFlags & nsIWebProgressListener.STATE_START)
      {
        return;
      }
      
      if (aStateFlags & nsIWebProgressListener.STATE_STOP)
      {        

        return;
      }
      return;
    }
  },
  onProgressChange : function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress)
  {
	/*
    this.currentTotalProgress = aCurTotalProgress;
    this.maxTotalProgress     = aMaxTotalProgress;

    var percentage = parseInt((aCurTotalProgress/aMaxTotalProgress)*parseInt(gURLBarBoxObject.width));
    if(percentage<0) percentage=10;

	*/
  },
  onLocationChange : function(aWebProgress, aRequest, aLocation)
  {
    
//	alert("onLocationChange");
      domWindow = aWebProgress.DOMWindow;


      if (domWindow == domWindow.top) {
        //this.urlBar.value = aLocation.spec;
//	alert("oLC");
	   taboca_pinktabs.st_RefreshSelectedTab();
        
      }
    
  },
  
  onStatusChange : function(aWebProgress, aRequest, aStatus, aMessage)
  {
//	  alert ("aStatus: " + aStatus);
  },
  startDocumentLoad : function(aRequest)
  {
  },
  endDocumentLoad : function(aRequest, aStatus)
  {
	  //alert("endDocumentLoad");
  },
  onSecurityChange : function(aWebProgress, aRequest, aState)
  {
  },
  setJSStatus : function(status)
  {
  },
  setJSDefaultStatus : function(status)
  {
  },
  setDefaultStatus : function(status)
  {
  },
  setOverLink : function(link, b)
  {
  }
}


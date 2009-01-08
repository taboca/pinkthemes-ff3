////
//// About Pink supports Pink Paula in the Pink Paula Pack edition. This brings the about:pink experience where the end-user 
//// can customize their pink experience to something beyond the basic theme. At this point the about:pink offers

// Ability to add the PinkTheme Pink custom Search 
// Release notes 
// Link to support pages
//

// Copyright (C) 2008 Taboca Inc and PinkTheme.com 

var enableStyle = false;
var gPrefBackground = "chrome://aboutpink/skin/suggestion-1.jpg";

addEventListener("load", pinkSearchStartup, false);

function pinkSearchStatusHandler() {}

pinkSearchStatusHandler.prototype = 
{

    QueryInterface : function(aIID)
    {
        if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
            aIID.equals(Components.interfaces.nsIXULBrowserWindow) ||
            aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
            aIID.equals(Components.interfaces.nsISupports))
        {
            return this;
        }
        throw Components.results.NS_NOINTERFACE;
    },
    
    init : function()
    {
    },
    
    destroy : function()
    {
    },
    
    onStateChange : function(aWebProgress, aRequest, aStateFlags, aStatus)
    {
        const nsIWebProgressListener = Components.interfaces.nsIWebProgressListener;
        const nsIChannel = Components.interfaces.nsIChannel;
        if (aStateFlags & nsIWebProgressListener.STATE_START) {
            if (aStateFlags & nsIWebProgressListener.STATE_IS_NETWORK &&
                aRequest && aWebProgress.DOMWindow == content)
              this.startDocumentLoad(aRequest);
        }
        else if (aStateFlags & nsIWebProgressListener.STATE_STOP) {
          if (aStateFlags & nsIWebProgressListener.STATE_IS_NETWORK) {
            if (aWebProgress.DOMWindow == content) {
              if (aRequest)
                this.endDocumentLoad(aRequest, aStatus);
            }
          }
        }
    },

    onProgressChange : function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress)
    {
    },

    onLocationChange : function(aWebProgress, aRequest, aLocation)
    {
    
        enableStyle = false;
        
        const pinkmark = "http://www.pinktheme.com/aboutpink/";
    
        if(aLocation.spec.substr(0, pinkmark.length) == pinkmark ) {
        
            enableStyle = true;
    
        }
        

    },
    
    onStatusChange : function(aWebProgress, aRequest, aStatus, aMessage)
    {
    },
    
    startDocumentLoad : function(aRequest)
    {

        
    },
    
    endDocumentLoad : function(aRequest, aStatus)
    {
    
           if(enableStyle) {
                st = gBrowser.contentDocument.createElement("style");
                st.setAttribute('type', 'text/css')
                vv = gBrowser.contentDocument.createTextNode("body { background: url('"+gPrefBackground+"') repeat-x 0 0}");
                st.appendChild(vv);
                gBrowser.contentDocument.body.appendChild(st);
            }
            
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

var pinkTheme_pinkTab = null;

function makeURI(stringIn)
{
	var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
	return ios.newURI(stringIn, null, null);
}


function pinkSearchCheckFirstTime() {

	var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);


	try
		{

		var install = prefService.getBoolPref("extensions.aboutpink.installed");

		if(!install) {

			prefService.setBoolPref("extensions.aboutpink.installed",true);
			prefService.setCharPref("extensions.aboutpink.background","chrome://aboutpink/skin/suggestion-1.jpg");

			pinkSearchPrepareToLaunch(); 

                        gPrefBackground = "chrome://aboutpink/skin/suggestion-1.jpg";

			pinkSearchInstallSearch();
                        pinkSearch_firstTime = true;

			//pinkSearchOpenSidebar();

		} 
		gPrefBackground = prefService.getCharPref("extensions.aboutpink.background");
		
		}
	catch(e) { alert(e) }
	
}


var obsSvc = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);

function pinkSearchPrepareToLaunch() {

  sessionRestoreObserve =  {
            observe: function(subject, topic, data) {
              try {  pinkSearchTryLaunchAboutPink() } catch(e) { alert(" session store done failed? " )}
            }
          };
  
   obsSvc.addObserver( sessionRestoreObserve,  "sessionstore-windows-restored" , false);
  
} 
  
function pinkSearchTryLaunchAboutPink() { 

	aboutURI = makeURI("about:pink"); 
	try { 

	pinkTheme_pinkTab = Application.activeWindow.open( aboutURI );
	pinkTheme_pinkTab.focus();

	} catch (i) { 

		alert(" not possible yet" );

	 	setTimeout("pinkSearchTryLaunchAboutPink()",2000);	
	} 

} 

function pinkSearchStartup() {

		 /* 

		var appBrowserStatusHandler = new pinkSearchStatusHandler();
		appBrowserStatusHandler.init();
		gBrowser.addProgressListener(appBrowserStatusHandler, Components.interfaces.nsIWebProgress.NOTIFY_ALL);

		  * Hook our status Handler withthe main TabBrowser 
		  */

        pinkSearchCheckFirstTime();
        
}

function pinkSearchOpenSidebar() {

    setTimeout("toggleSidebar('viewfssSidebar')",1000);
    
}


function pinkSearchInstallSearch() {

    pinkSearchAddSearch();
    
}

function pinkSearchTest(URL) {

    gBrowser.loadOneTab(URL,undefined,undefined,undefined,false)
    
}
var pinkSearchAddSearch = function() {


	var ss = Components.classes["@mozilla.org/browser/search-service;1"]
			   .getService(Components.interfaces.nsIBrowserSearchService);


	try {
	  ss.addEngineWithDetails("Pink Search", "http://www.pinktheme.com/p/start/en/icon.png", "","", "GET", "http://www.pinktheme.com/p/start/en/link.html");
	} catch(e) {
		//alert(e);
	}

	var addedEngine = ss.getEngineByName("Pink Search");

	addedEngine.addParam("q", "{searchTerms}", null);

  try {
  
   var origEngineObj = addedEngine.wrappedJSObject; // I said xxx!

	origEngineObj._searchForm = "http://www.pinktheme.com/p/start/en/link.html";
	origEngineObj._queryCharset = "UTF-8";
	origEngineObj._serializeToFile();


  } catch (i) { /* alert(i) */ } 

  ss.currentEngine = addedEngine;

}

function pinkSearch_selectImage() {

     pinkSearch_setImage(gImageSource);
     pinkSearchTest("http://www.pinktheme.com/p/start/en/link.html?q=Example query");

}


function pinkSearch_setImage(imageRef) {

	try
		{
    	var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        prefService.setCharPref("extensions.aboutpink.background",imageRef);
        gPrefBackground=imageRef;
		}
	catch(e) { alert(e) }

}




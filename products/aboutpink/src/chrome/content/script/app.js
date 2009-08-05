
function app_linkToDonate() { 

	// This now launches the donations normalizided URL on AMO
	getWindow.com.taboca.aboutpink.export_launchDonationsPage();

} 

function app_launchTestHome() { 
	getWindow().com.taboca.aboutpink.export_launchInstalledHomePage();
} 
function app_revertHome() { 
	getWindow().com.taboca.aboutpink.export_revertHomePage();
} 
function app_getBackupHome() { 
 	return getWindow().com.taboca.aboutpink.export_getBackupHome();	
} 
function app_getCurrentHome() { 
 	return getWindow().com.taboca.aboutpink.export_getCurrentHome();	
} 
function app_installHome() { 
	getWindow().com.taboca.aboutpink.export_installHome();	
} 

function app_installSearch() { 
	getWindow().com.taboca.aboutpink.export_installSearch();	

	refreshSearch(); // hack
} 

function app_isSearchInstalled() { 
 	return getWindow().com.taboca.aboutpink.export_isAboutPinkInstalledSearch();	
} 

function app_isHomeInstalled() { 
 	return getWindow().com.taboca.aboutpink.export_isAboutPinkInstalledHome();	
} 

function testSearch() {

        try {
      var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                          .getService(Components.interfaces.nsIWindowMediator);

      gWin = wm.getMostRecentWindow("navigator:browser");

      gWin.pinkSearchTest("http://www.pinktheme.com/p/start/en/link.html?q=Pink Paula" );


        } catch (i) { alert(i) }

}



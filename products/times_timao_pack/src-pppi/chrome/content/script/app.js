
function app_linkToDonate() { 
	// This now launches the donations normalizided URL on AMO
	getWindow().com.taboca.abouttimao.export_launchDonationsPage();
} 

function app_launchTestHome() { 
	getWindow().com.taboca.abouttimao.export_launchInstalledHomePage();
} 
function app_revertHome() { 
	getWindow().com.taboca.abouttimao.export_revertHomePage();
} 
function app_getBackupHome() { 
 	return getWindow().com.taboca.abouttimao.export_getBackupHome();	
} 
function app_getCurrentHome() { 
 	return getWindow().com.taboca.abouttimao.export_getCurrentHome();	
} 
function app_installHome() { 
	getWindow().com.taboca.abouttimao.export_installHome();	
} 

function app_installSearch() { 
	getWindow().com.taboca.abouttimao.export_installSearch();	

	refreshSearch(); // hack
} 

function app_isSearchInstalled() { 
 	return getWindow().com.taboca.abouttimao.export_isAboutTimaoInstalledSearch();	
} 

function app_isHomeInstalled() { 
 	return getWindow().com.taboca.abouttimao.export_isAboutTimaoInstalledHome();	
} 

function testSearch() {

}



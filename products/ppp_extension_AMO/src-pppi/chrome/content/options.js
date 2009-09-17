
function getWindow() {
                var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
                return wm.getMostRecentWindow("navigator:browser");
}


function launchAboutPink() { 

	getWindow().com.taboca.aboutpink.export_launchAboutPink();
	alert("The configuration panel will be open as a tab");
	window.close();

} 

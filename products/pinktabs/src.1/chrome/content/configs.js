var openerWindow = null;

if(document.location.href.indexOf("about")>-1) {

  var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                     .getService(Components.interfaces.nsIWindowMediator);
  openerWindow = wm.getMostRecentWindow("navigator:browser");


}
else {

 openerWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                   .getInterface(Components.interfaces.nsIWebNavigation)
                   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                   .rootTreeItem
                   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                   .getInterface(Components.interfaces.nsIDOMWindow);
}

var st_ui_tabrule_checkbox = function(refId) {

	var splitName = refId.split("ref-")[1];
	if(!document.getElementById("checkbox-"+splitName).checked) {

		openerWindow.taboca_pinktabs.gst_ArrayDefaultAll[splitName]=null;
		openerWindow.taboca_pinktabs.prefBranch.setBoolPref("themes." + splitName + ".enabled", false);

	} else {
		
		openerWindow.taboca_pinktabs.gst_ArrayDefaultAll[splitName]=1;
		openerWindow.taboca_pinktabs.prefBranch.setBoolPref("themes." + splitName + ".enabled", true);

	}
};

var st_ui_tabrule_advanced = function(refId) {

	var splitName = refId.split("ref-")[1];

	var collapsedState = document.getElementById("advanced-"+splitName).collapsed;

	var button = document.getElementById("moreless-"+splitName);

	if(collapsedState ) {
		
		button.label="[-]";

	} else {

		button.label="[+]";

	}

	document.getElementById("advanced-"+splitName).collapsed=!collapsedState;

};

var stringBundle = document.getElementById("pinktabs-localizedstrings");

var getLocalizedString = function(strName) {
	try
	{
		return stringBundle.getString(strName);
	} catch (e) {
		return '';
	}
};

var runOnce = false;

var st_createUItabRules = function() {

	if(!runOnce ) { 

		runOnce = true;

	if(document.location.href.indexOf("welcome")>-1) {
		document.getElementById("welcomepanel").collapsed=false;
	}
	if(document.location.href.indexOf("about")>-1) {
		document.getElementById("aboutpanel").collapsed=false;
	}

	for(var ii=0;ii<openerWindow.taboca_pinktabs.gst_classList.length;ii++) {

		var ruleElementId = "ref-"+openerWindow.taboca_pinktabs.gst_classList[ii];

		var __vbox = document.createElement("vbox");
			__vbox.setAttribute("class","previewTabItem");

		var __hbox = document.createElement("hbox");
			__hbox.setAttribute("id",ruleElementId);

		var __checkbox = document.createElement("checkbox");
			__checkbox.setAttribute("id","checkbox-"+openerWindow.taboca_pinktabs.gst_classList[ii]);
			
			if (openerWindow.taboca_pinktabs.prefBranch.getBoolPref("themes." + openerWindow.taboca_pinktabs.gst_classList[ii] + ".enabled") ) {
			
				__checkbox.setAttribute("checked","true"); 
			} else {
				__checkbox.setAttribute("checked","false"); 
			}
			
			__checkbox.setAttribute("oncommand","st_ui_tabrule_checkbox('"+ruleElementId+"')");
	
		var __bbox = document.createElement("tab");

			__bbox.className="tabbrowser-tab pinkbase pinkdemo pinkstyle-"+openerWindow.taboca_pinktabs.gst_classList[ii];
			__bbox.setAttribute("flex","1");
			__bbox.setAttribute("height","28");
			__bbox.setAttribute("width","28");
			__bbox.setAttribute("onclick","st_ui_tabrule_advanced('"+ruleElementId+"')");

		var __ttb = document.createElement("toolbarbutton");
			__ttb.setAttribute("label","[+]");
			__ttb.setAttribute("id","moreless-"+openerWindow.taboca_pinktabs.gst_classList[ii]);
			__ttb.setAttribute("oncommand","st_ui_tabrule_advanced('"+ruleElementId+"')");


		/* felipe -- tab appearence.. (not needed)
		var __tableft=document.createElement("hbox");
			__tableft.className="tab-image-left";
		
		var __tabright=document.createElement("hbox");
			__tabright.className="tab-image-right";

		var __tabmiddle= document.createElement("hbox");
			__tabmiddle.className="tab-image-middle";
			__tabmiddle.setAttribute("flex", "1");
		
		__bbox.appendChild(__tableft);
		__bbox.appendChild(__tabmiddle);
		__bbox.appendChild(__tabright);
		/* -- */

		__hbox.appendChild(__checkbox);
		__hbox.appendChild(__bbox);
		__hbox.appendChild(__ttb);
		__vbox.appendChild(__hbox);


		var ruleElementId = "advanced-"+openerWindow.taboca_pinktabs.gst_classList[ii];

		var __hbox = document.createElement("hbox");
			__hbox.setAttribute("id",ruleElementId);
			__hbox.setAttribute("collapsed","true");

		var __textbox = document.createElement("textbox");
			__textbox.setAttribute("id","textbox-"+openerWindow.taboca_pinktabs.gst_classList[ii]);
			__textbox.setAttribute("flex","1");
			__textbox.setAttribute("onchange","st_saveTextBoxes()");	
			__textbox.setAttribute("multiline","true");
			__textbox.setAttribute("tooltiptext", getLocalizedString('config.maintooltip'));
			__textbox.setAttribute("value", openerWindow.taboca_pinktabs.prefBranch.getCharPref("themes." + openerWindow.taboca_pinktabs.gst_classList[ii] + ".domains"));
	
		__hbox.appendChild(__textbox);
		__vbox.appendChild(__hbox);



		document.getElementById("containerTabs").appendChild(__vbox);


	}

	st_addClassicTheme();

}

};

var st_saveTextBoxes = function() {

	try { 

	for (var ii = 0; ii < openerWindow.taboca_pinktabs.gst_classList.length; ii++ ) {
		var sites = document.getElementById("textbox-" + openerWindow.taboca_pinktabs.gst_classList[ii]).value;
		openerWindow.taboca_pinktabs.prefBranch.setCharPref("themes." + openerWindow.taboca_pinktabs.gst_classList[ii] + ".domains", sites);
	}

	sites = document.getElementById("textbox-classic").value;
	openerWindow.taboca_pinktabs.prefBranch.setCharPref("themes.classic.domains", sites);
	
	openerWindow.taboca_pinktabs.st_setupTabPriorityList();
	} catch(i) { } 
}


var st_addClassicTheme = function() {

		var ruleElementId = "ref-classic";

		var __vbox = document.createElement("vbox");
			__vbox.setAttribute("class","previewTabItem");

		var __hbox = document.createElement("hbox");
			__hbox.setAttribute("id",ruleElementId);


		/* var __checkbox = document.createElement("checkbox");
			__checkbox.setAttribute("id","checkbox-classic");
			
			if (openerWindow.taboca_pinktabs.prefBranch.getBoolPref("themes.classic.enabled") ) {
				__checkbox.setAttribute("checked","true"); 
			} else {
				__checkbox.setAttribute("checked","false"); 
			}
			
			__checkbox.setAttribute("oncommand","st_ui_tabrule_checkbox('"+ruleElementId+"')");
		*/


		var __bbox = document.createElement("hbox");

			__bbox.className="tabbrowser-tab pinkdemo";
			__bbox.setAttribute("flex","1");
			__bbox.setAttribute("height","28");
			__bbox.setAttribute("width","28");
			__bbox.setAttribute("onclick","st_ui_tabrule_advanced('"+ruleElementId+"')");

		/* felipe -- tab appearance */
		var __tableft=document.createElement("hbox");
			__tableft.className="tab-image-left";
		
		var __tabright=document.createElement("hbox");
			__tabright.className="tab-image-right";

		var __tabmiddle= document.createElement("hbox");
			__tabmiddle.className="tab-image-middle";
			__tabmiddle.setAttribute("flex", "1");

		var __label=document.createElement("label");
			__label.setAttribute("value",getLocalizedString('config.classictab'));
			__label.className="tab-text";

		__bbox.appendChild(__tableft);
		__bbox.appendChild(__tabmiddle);
		__bbox.appendChild(__tabright);
		__tabmiddle.appendChild(__label);
		/* -- */


		var __ttb = document.createElement("toolbarbutton");
			__ttb.setAttribute("label","[-]");
			__ttb.setAttribute("id","moreless-classic");
			__ttb.setAttribute("oncommand","st_ui_tabrule_advanced('"+ruleElementId+"')");

		//__hbox.appendChild(__checkbox);
		__hbox.appendChild(__bbox);
		__hbox.appendChild(__ttb);
		__vbox.appendChild(__hbox);



		var ruleElementId = "advanced-classic";

		var __hbox = document.createElement("hbox");
			__hbox.setAttribute("id",ruleElementId);
			__hbox.setAttribute("collapsed","true");

		var __textbox = document.createElement("textbox");
			__textbox.setAttribute("id","textbox-classic");
			__textbox.setAttribute("flex","100%");
			__textbox.setAttribute("onchange","st_saveTextBoxes()");	
			__textbox.setAttribute("multiline","true");
			__textbox.setAttribute("tooltiptext", getLocalizedString('config.classictooltip'));
			__textbox.setAttribute("value", openerWindow.taboca_pinktabs.prefBranch.getCharPref("themes.classic.domains"));
	
		__hbox.appendChild(__textbox);
		__vbox.appendChild(__hbox);

		document.getElementById("containerTabs").appendChild(__vbox);
}

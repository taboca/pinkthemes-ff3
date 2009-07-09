
function getWindow() {
                var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
                return wm.getMostRecentWindow("navigator:browser");
}



////
/// Strings bundle infra-structure. We get strings from the main app, then we apply to 
//  all the class="str" HTML objects. 

function stringsApply() { 
        $(".str").each( function() {
		var stringId = $(this).attr("id").toString();
		_do( stringId, getWindow().com.taboca.aboutpink.export_getString(stringId)); 
          } 
       )
}

function _do(strId, strValue) { 
	$("#"+strId+".str").html(strValue);
} 
 

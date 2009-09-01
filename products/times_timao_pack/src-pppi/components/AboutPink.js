const Cc = Components.classes;
const Ci = Components.interfaces;

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

function AboutPink() {}
AboutPink.prototype = {
  classDescription: "About Pink",
  contractID: "@mozilla.org/network/protocol/about;1?what=pink",
  classID: Components.ID("{8b15b3bb-6352-4776-aa8e-64eec9e081c9}"),
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

  getURIFlags: function(uri) Ci.nsIAboutModule.ALLOW_SCRIPT,

  newChannel: function(uri) {
    var ios = Cc["@mozilla.org/network/io-service;1"].
              getService(Ci.nsIIOService);
    var childURI = ios.newURI("chrome://aboutpink/content/page.html", null, null);
    var channel = ios.newChannelFromURI(childURI);
    channel.originalURI = uri;
    return channel;
  }
};

function NSGetModule(compMgr, fileSpec)
  XPCOMUtils.generateModule([AboutPink]);


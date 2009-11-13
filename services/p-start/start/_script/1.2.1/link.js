	function start() {


		try {
			if(document.location.search) {

				var value=document.location.search.split("?q=");
	
	
				var queryVal = value[1];

				queryVal = queryVal.split("&q=")[0];


				queryVal = decode(queryVal);

				document.forms[0].q.value=queryVal;
				document.forms[0].submit();

	
			}
			else { 
			document.forms[0].q.value="";
			document.forms[0].submit();

			} 
		} catch(i) { 
			document.forms[0].q.value="test";
			document.forms[0].submit();
		} 


		document.forms[0].q.focus();
	}

function decode(value) {
	var encoded = value;
	return  unescape(encoded.replace(/\+/g,  " "));
}


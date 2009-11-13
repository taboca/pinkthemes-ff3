	function start() {


		try {
			if(document.location.search) {

				var value=document.location.search.split("?q=");
	
	
				var queryVal = value[1];

				queryVal = queryVal.split("&q=")[0];

				queryVal = utf8decode(decode(queryVal));

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

function utf8decode(utftext) {  
         var string = "";  
         var i = 0;  
         var c = c1 = c2 = 0;  
   
         while ( i < utftext.length ) {  
   
             c = utftext.charCodeAt(i);  
   
             if (c < 128) {  
                 string += String.fromCharCode(c);  
                 i++;  
             }  
             else if((c > 191) && (c < 224)) {  
                 c2 = utftext.charCodeAt(i+1);  
                 string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                 i += 2;  
             }  
             else {  
                 c2 = utftext.charCodeAt(i+1);  
                 c3 = utftext.charCodeAt(i+2);  
                 string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                 i += 3;  
             }  
   
         }  
   
         return string;  
     }  


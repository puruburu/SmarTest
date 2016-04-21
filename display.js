function clear() {
/* Clears all the four options */

	console.log("here");
	document.getElementById('r1').checked = false;
	document.getElementById('r2').checked = false;
	document.getElementById('r3').checked = false;
	document.getElementById('r4').checked = false;
}

function storeResponse() {
/* Stores the students response for that question in the results table */
	
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
    		if (xhttp.responseText == 1) {
				return true;
			}
			document.getElementById("question").innnerHTML == "An error ocurred. Mark your response again.";
			return false;
	   	}
	};

	var parameters = 'q'+document.getElementById("...").value+"&response="+document.getElementById("....").value;
	xhttp.open("POST", "http://localhost:8000/storeResponse.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	return false;
}

function showQuestion() {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
    		if (xhttp.responseText == 1) {
			}
			document.getElementById("question").innnerHTML == "An error ocurred. Mark your response again.";
	   	}
	};

	var parameters = '&tnid'+gtnid;
	xhttp.open("POST", "http://localhost:8000/showQuestion.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
}

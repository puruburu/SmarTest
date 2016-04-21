var sid = 1;	//defined by me just for testing purposes
function showHistory() {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
			document.getElementById("history").innerHTML = xhttp.responseText;
	   	}
	};

	var parameters = 'sid='+sid;
	xhttp.open("POST", "http://localhost:8000/testing.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	return false;
}

var sid=5;
var gtnid = 1;
var tid = 1;
var obj;
var valid;
/*............................................................................................. */
//timer

//var endtime =  new Date();
function starttimer() {
	//console.log("in starttimer");
	var today = new Date();	
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	var endtime = new Date(today.getTime() + 180*60*1000);
	//console.log(today);
	//console.log(endtime);
	localStorage.setItem("todate", today);
	localStorage.setItem("endtime", endtime);
}

function startTime() {
	var endtime = localStorage.getItem("endtime");
	//console.log(endtime);
	//console.log("in startTime");
	var now = new Date();
	var t = (Date.parse(endtime)-Date.parse(now));
	if (t == 0) {
		showResults();
	}

	var s = Math.floor( (t / 1000) % 60);
  	var m = Math.floor( (t / 1000 / 60) % 60);
  	var h = Math.floor( (t / (1000 * 60 * 60)) % 24);
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('h').innerHTML=h;
	document.getElementById('m').innerHTML=m;
	document.getElementById('s').innerHTML=s;
	t = setTimeout(function()
		{startTime();},1000);
	}

function checkTime(i){
	if(i < 10) {
		i = "0" + i;
	}
	return i;
}

/*............................................................................................. */
function setSid(){
	var username= localStorage.getItem("username");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
console.log("in set sid");
    		if (xhttp.responseText == 0) {
			console.log("set sid dint work");return 0;
		}
		else {
			var objsid = JSON.parse(xhttp.responseText);
			sid = objsid[0].sid;
			console.log("else sid");console.log(sid);
			localStorage.setItem("gsid",objsid[0].sid);
			console.log(localStorage.getItem("gsid"));return sid;
		}
	   }
	};
	var parameters = 'username='+username;
	xhttp.open("POST", "http://localhost:8000/setSid.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
}
/*............................................................................................. */

function passwordCheck() {
	if (document.getElementById("password").value != document.getElementById("repassword").value) {
		document.getElementById("validity").innerHTML = "Passwords do not match";
		return false;
	}
	else
		return true;
}

function signup() {
	/*var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
    		if (xhttp.responseText == 1) {
				window.location = "selectTest.html";
				sid = document.getElementById("loginUsername").value;
				return true;
			}
			if (document.getElementById("validity").innnerHTML == "Some fields are missing")
				return false;
			document.getElementById("validity").innerHTML = xhttp.responseText;
	   	}
	};

	var parameters = 'username='+document.getElementById("username").value+"&password="+document.getElementById("password").value;
	xhttp.open("POST", "http://localhost:8000/action_page.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	return false;*/
	var xhttp = new XMLHttpRequest();
	console.log("in signup");

	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
		//document.getElementById("validity").innnerHTML == xhttp.responseText;
		console.log(xhttp.responseText);    
		if (xhttp.responseText == 1) {
				
				document.getElementById("validity").innnerHTML == "allotted"
				//sid = 
				//sid = setSid(document.getElementById("username").value);
				localStorage.setItem("username",document.getElementById("username").value);				
				window.location = "selectTest.html";	//uncomment later	
				return true;			}
			if (xhttp.responseText==0) {
				document.getElementById("validity").innnerHTML == "Some error occured. Please try again."
				return false;
			}
	   	}
	};

	var parameters = 'username='+document.getElementById("username").value+"&password="+document.getElementById("password").value;
	xhttp.open("POST", "http://localhost:8000/action_page.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	return false;
}

/*............................................................................... */

function missing() {
	document.getElementById("validity").innerHTML = "Some fields are missing";
}

function idcheck() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
    		//document.getElementById("validity").innerHTML = xhttp.responseText;
			if (xhttp.responseText == 1) {
				var a=signup();
				console.log("No rows found common in studentinfo");			
				return true;
			}
		else{
			document.getElementById("validity").innerHTML = "Username already in use!";
			return false;
		}
			 //else if (document.getElementById("validity").innnerHTML == 0)
				//return false;
			//else return false;
		}
	};
	var parameters = 'username='+document.getElementById("username").value;
	xhttp.open("POST", "http://localhost:8000/checkuniqueid.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	//if (yo==1)
	//	return true;
	//console.log(yo);
	//console.log("OUT HERE");
	//return false;

	/*if (yo==0)
		return false;
	else return true; */
	//if(document.getElementById("validity").innnerHTML =="username can be alloted")	
	//	{
	//	return true;
	//	}
	//return false;
}

function check() {
	// Check to see if fields have been entered
	if(document.getElementById("username").value == "") {
		missing();
		return false;
	}
	if(document.getElementById("password").value == "") {
		missing();
		return false;
	}
	if(document.getElementById("repassword").value == "") {
		missing();
		return false;
	}
	var check = passwordCheck();
	if (check == false)
		return false;
	var id = idcheck();
	if(id==false)
			console.log("YES IT IS FALSE");
	if (document.getElementById("validity").innerHTML == "Username already in use!") {
		if(id==false)
			console.log("YES IT IS FALSE");
		return false;	
	}
	console.log("Looks like id was true");
	//var signupCheck = signup();
	//if (signupCheck == true)
	//	return true;
	//return false;
	return false;
}

function passwordMatch() {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(xhttp.responseText);
			document.getElementById("login").innerHTML = xhttp.responseText;
			if (document.getElementById("login").innnerHTML == "Invalid username or password")
				return false;
			if (xhttp.responseText == 1) {
				
				console.log(document.getElementById("loginUsername").value);
				//setSid(document.getElementById("loginUsername").value);
				localStorage.setItem("username",document.getElementById("loginUsername").value);			
				console.log("in passwordMatch");
				console.log(sid);
				window.location = "selectTest.html";
			}
	   	}
	};

	var parameters = 'loginUsername='+document.getElementById("loginUsername").value+"&loginPassword="+document.getElementById("loginPassword").value;
	xhttp.open("POST", "http://localhost:8000/loginVerify.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	return false;
}

/*............................................................................................. */
//selectTest.html

function startTest(tnid) {
/* Sends infoof student id (sid) and testname id (tnid) and sends request to server to insert data in test table */
	var xhttp = new XMLHttpRequest();
	 
	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
			if (xhttp.responseText == 1) {
				localStorage.setItem("gtnid", gtnid);
				window.location = "ready.html";
				console.log(gsid,"in start test");
				return true;
			}
			document.getElementById("testcheck").innerHTML = "Some error occurred while starting the test";
			return false;
	   	}
	};
	
		var gsid=parseInt(localStorage.getItem("gsid"));
	console.log(sid,"im hers");
	var parameters = 'sid='+gsid+"&tnid="+tnid;
	xhttp.open("POST", "http://localhost:8000/selectTest.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	return false;
}

function testPage(id) {
/* Determines which test has been selected based on id and calls startTest() */
	
	//sets gloabl variable gtnid
	switch (id) {
		case "test1" :
			gtnid = 1;
			return startTest(1);
			break;
		case "test2" :
			gtnid = 2;
			return startTest(2);
			break;
		case "test3" :
			gtnid = 3;
			return startTest(3);
			break;
		case "test4" :
			gtnid = 4;
			return startTest(4);
			break;
		case "test5" :
			gtnid = 5;
			return startTest(5);
			break;
	}
	return false;
}

/*............................................................................................. */

//ready.html

function goBack() {
//Goes back to previous page selectTest
	window.location = "selectTest.html";

}

function ready() {
//takes user to display page (which displays questions) depending on which test has been selected
	starttimer();

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
			if (xhttp.responseText == 0) {
				document.getElementById("testcheck").innerHTML = "An error occurred";
				return false;
			}
			var objr = JSON.parse(xhttp.responseText);
			tid = objr[0].tid;
			localStorage.setItem("tid",tid);
			var gtnid = localStorage.getItem("gtnid");
			localStorage.setItem("gtnid", gtnid);
			//localStorage.setItem("obj", obj);
			window.location = "display.html";
			return true;
	   	}
	};

	xhttp.open("POST", "http://localhost:8000/getTid.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
	return false;
}

/*............................................................................................. */
//display.html

function clearResponse() {
/* Clears all the four options */
	document.getElementById("r1").checked = false;
	document.getElementById("r2").checked = false;
	document.getElementById("r3").checked = false;
	document.getElementById("r4").checked = false;
	//var qnum = document.getElementById("qno").innerHTML;
	responses[no] = 0;
}

function sendResponse() {
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

	var parameters = 'q='+document.getElementById("...").value+"&response="+document.getElementById("....").value;
	xhttp.open("POST", "http://localhost:8000/storeResponse.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	return false;
}

/*...........................................................................................*/

var no = 1;
var responses = [];
//responses[0] = 0;
for (var j = 0; j <= 90; j++) {
	responses[j] = 0;
}

var red = "#ff6666";
var green = "#008000";
var yellow = "#ffff33";

function qdisplay(num) {
	no = num;
	//var obj = localStorage.getItem("obj");
	//Clear the previous response
	document.getElementById("r1").checked = false;
	document.getElementById("r2").checked = false;
	document.getElementById("r3").checked = false;
	document.getElementById("r4").checked = false;

	switch(responses[num]) {
		case 1:
			document.getElementById("r1").checked = true;
			break;
		case 2:
			document.getElementById("r2").checked = true;
			break;
		case 3:
			document.getElementById("r3").checked = true;
			break;
		case 4:
			document.getElementById("r4").checked = true;
			break;
		default:
			//document.getElementById(no).style.color = red;
			break;
	}

	document.getElementById("qno").innerHTML = "Q." + no + ".";
	document.getElementById("question").innerHTML = obj[no - 1].q;
	document.getElementById("o1").textContent = obj[no - 1].option1;
	document.getElementById("o2").textContent = obj[no - 1].option2;
	document.getElementById("o3").textContent = obj[no - 1].option3;
	document.getElementById("o4").textContent = obj[no - 1].option4;
}


function nextQuestion() {
//Displays next question on screen */
	console.log("In nextQ");

	//Clear the previous response
	document.getElementById("r1").checked = false;
	document.getElementById("r2").checked = false;
	document.getElementById("r3").checked = false;
	document.getElementById("r4").checked = false;

	no = no + 1;
	
	console.log("In question");
	console.log(no);
	localStorage.setItem("obj", obj);
	qdisplay(no);
}

function storeResponse(id) {
/* Stores students response to questions in array of size 90, put 0 for unmarked answer */
	document.getElementById(no).style.color = red;
	console.log("IN storeResponse");
	console.log(id);
	console.log(no);
	console.log(responses);
	if (id == "r1") {
		responses[no] = 1;
	}
	else if (id == "r2") {
		responses[no] = 2;
	}
	else if (id == "r3") {
		responses[no] = 3;
	}
	else if (id == "r4") {
		responses[no] = 4;
	}
	else {
		responses[no] = 0;
	}
	console.log(responses);

}

function showQuestion() {
	startTime();

	var gtnid = localStorage.getItem("gtnid");
	var xhttp = new XMLHttpRequest();
	console.log("In showq");
	console.log(gtnid);
	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
		console.log("HEREEEE1");
		console.log(xhttp.responseText);
    		if (xhttp.responseText == 0) {
				document.getElementById("question").innerHTML = "An error ocurred. Mark your response again.";
		}
		else {
			//var string2=xhttp.responseText.substring();
			  obj = JSON.parse(xhttp.responseText);
			
			localStorage.setItem("obj", obj);
			//Clear the responses array

			no = 1;
			document.getElementById("qno").innerHTML = "Q.1.";
			document.getElementById("question").innerHTML = obj[0].q;
			document.getElementById("o1").textContent = obj[0].option1;
			document.getElementById("o2").textContent = obj[0].option2;
			document.getElementById("o3").textContent = obj[0].option3;
			document.getElementById("o4").textContent = obj[0].option4; 
			console.log("HEREEEE");
			console.log(xhttp.responseText);
		}
	   }
	};
	
	gtnid = parseInt(gtnid);
	console.log(gtnid);
	var parameters = 'tnid='+gtnid;
	xhttp.open("POST", "http://localhost:8000/showQuestion.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
}

/*........................................................................*/
//result displaying
function showResults() {
	console.log("In showResults");
	console.log(responses);
	localStorage.setItem("responses", responses);
	window.location = "displayResult.html";
	/*var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
    		window.location = "displayResult.html";
    	if (xhttp.responseText == 1) {
				return true;
			}
			document.getElementById("question").innnerHTML == "An error ocurred. Mark your response again.";
			return false;
	   	}
	   }
	};

	var parameters = 'responses='+responses+"&tid="+tid;
	xhttp.open("POST", "http://localhost:8000/storeResponse.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	return false; */
}
/*making a few variables global*/

//var pmarks=90;
//var cmarks;
//var mmarks;
//var pans ;
//var mans;
//var cans;
//var pcorr;
//var mcorr;
//var ccorr;
function computeResult() {

	var pmarks = 0;
	var cmarks = 0;
	var mmarks = 0;

	var pans = 0;
	var cans = 0;
	var mans = 0;
	var pcorr=0;
	var mcorr=0;
	var ccorr=0;
	var gtnid = localStorage.getItem("gtnid");
	var xhttp = new XMLHttpRequest();
	//var responses = localStorage.getItem("responses");
		var responses = JSON.parse("[" + localStorage.getItem("responses") + "]");
	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
    		if (xhttp.responseText == 0) {
				document.getElementById("question").innerHTML = "An error ocurred. Mark your response again.";
			}
			else {
				var objans = JSON.parse(xhttp.responseText);
				//objans=JSON.parse(objans);
				console.log("In computeResult");
				//console.log(objans[0].ans);
				//console.log(objans[1].ans);
				//console.log(objans[2].ans);
				console.log(responses);
				console.log(objans[0].ans);
				console.log(objans[1].ans);
				var i;
				for (i = 1; i <=30; i=i+1) {
						console.log(responses);
					var x = parseInt(responses[i]);
					//	var m = (i+1)/2
					var y = parseInt(objans[i - 1].ans);
						
					console.log(typeof x, i, x);
					console.log(typeof y, y);
					switch(x) {
						case 1:
							console.log("iM HERE1");
							pans = pans + 1;
							if (x == y) {
								pcorr+=1;
								pmarks = pmarks + 4;
							}
							else {
								pmarks = pmarks - 1;
							}
							break;
						case 2:
							console.log("iM HERE2");
							pans = pans + 1;
							if (x == y) {
								pcorr+=1;
								pmarks = pmarks + 4;
							}
							else {
								pmarks = pmarks - 1;
							}
							break;
						case 3:
							console.log("iM HERE3");
							pans = pans + 1;
							if (x == y) {
								pcorr+=1;
								pmarks = pmarks + 4;
							}
							else {
								pmarks = pmarks - 1;
							}
							break;
						case 4:
							console.log("iM HERE4");
							pans = pans + 1;
							if (x == y) {
								pcorr+=1;
								pmarks = pmarks + 4;
							}
							else {
								pmarks = pmarks - 1;
							}
							break;
						default:
							break;
					}
				}

				for (i = 31; i <= 60; i++)
			 {
					
					console.log(responses[i]);
					var x = parseInt(responses[i]);
						//var m = (i+1)/2;
					var y = parseInt(objans[i - 1].ans);
						//y=0;
					console.log(typeof x, i, x);
					console.log(typeof y, y);
					switch(x) {
						case 1:
							console.log("iM HERE1");
							cans = cans + 1;
							if (x == y) {
								ccorr+=1;
								cmarks = cmarks + 4;
							}
							else {
								cmarks = cmarks - 1;
							}
							break;
						case 2:
							console.log("iM HERE2");
							cans = cans + 1;
							if (x == y) {
								ccorr+=1;
								cmarks = cmarks + 4;
							}
							else {
								cmarks = cmarks - 1;
							}
							break;
						case 3:
							console.log("iM HERE3");
							cans = cans + 1;
							if (x == y) {
								ccorr+=1;
								cmarks = cmarks + 4;
							}
							else {
								cmarks = cmarks - 1;
							}
							break;
						case 4:
							console.log("iM HERE4");
							cans = cans + 1;
							if (x == y) {
							ccorr+=1;			
							cmarks = cmarks + 4;
							}
							else {
								cmarks = cmarks - 1;
							}
							break;
						default:
							break;
					}
				}

				for (i = 61; i < 90; i++) 
		{
					/*switch(responses[i]) {
						case 1, 2, 3, 4:
							mans = mans + 1;
							if (responses[i] == obj[i - 1].ans) {
								mmarks = mmarks + 4;
							}
							else {
								mmarks = mmarks - 1;
							}
							break;
						default:
							break;
					}*/
				console.log(responses[i]);
					var x = parseInt(responses[i]);
						//var m = (i+1)/2
					var y = parseInt(objans[i- 1].ans);
						
					console.log(typeof x, i, x);
					console.log(typeof y, y);
					switch(x) {
						case 1:
							console.log("iM HERE1");
							mans = mans + 1;
							if (x == y) {mcorr+=1;
								mmarks = mmarks + 4;
							}
							else {
								mmarks = mmarks - 1;
							}
							break;
						case 2:
							console.log("iM HERE2");
							mans = mans + 1;
							if (x == y) {mcorr+=1;
								mmarks = mmarks + 4;
							}
							else {
								mmarks = mmarks - 1;
							}
							break;
						case 3:
							console.log("iM HERE3");
							mans = mans + 1;
							if (x == y) {mcorr+=1;
								mmarks = mmarks + 4;
							}
							else {
								mmarks = mmarks - 1;
							}
							break;
						case 4:
							console.log("iM HERE4");
							pans = pans + 1;
							if (x == y) {mcorr+=1;
								mmarks = mmarks + 4;
							}
							else {
								mmarks = mmarks - 1;
							}
							break;
						default:
							break;
					}
				
				} 
				var tmarks = pmarks + cmarks + mmarks;

				//displaying result
				document.getElementById("totalScore").innerHTML = "Your score is " + tmarks;
				localStorage.setItem("marks",tmarks);
				localStorage.setItem("pmarks",pmarks);console.log("in compute",pmarks);
				localStorage.setItem("mmarks",mmarks);console.log( "niki",mmarks);
				document.getElementById("p").innerHTML = "Your Physics marks are " + pmarks;
				document.getElementById("c").innerHTML = "Your Chemistry marks are " + cmarks;
				document.getElementById("m").innerHTML = "Your Maths marks are " + mmarks;
				localStorage.setItem("cmarks",cmarks);console.log("niki",cmarks);
				localStorage.setItem("cans",cans);console.log("niki",cans);
				localStorage.setItem("mans",mans);console.log("niki",mans);
				localStorage.setItem("pans",pans);console.log("niki",pans);
				localStorage.setItem("ccorr",ccorr);console.log("niki",ccorr);
				localStorage.setItem("mcorr",mcorr);console.log("niki",mcorr);
				localStorage.setItem("pcorr",pcorr);console.log("niki",pcorr);
				setMarks();

			}
	   	}
	};

	var parameters = 'tnid='+gtnid;
	xhttp.open("POST", "http://localhost:8000/getAnswers.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	
}
function getp(){
	return pmarks;
}
function getc(){
	return cmarks;
}
function getm(){
	return mmarks;
}
function getap(){
	return pans;
}
function getac(){
	return cans;
}
function getam(){
	return mans;
}
function pcor(){
	return pcorr;
}
function mcor(){
	return mcorr;
}
function ccor(){
	return ccorr;
}



function resetForm() {
	document.getElementById("f1").reset();
	document.getElementById("f2").reset();
}



function setMarks(){
	var tid = localStorage.getItem("tid");
	tid = parseInt(tid);
	var todate = localStorage.getItem("todate");
	todate = new Date(todate);
	todate = todate.toISOString().slice(0,19).replace('T',' ');console.log(todate);
	var marks = localStorage.getItem("marks");
	marks = parseInt(marks);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() { 
			console.log(xhttp.responseText);
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
		console.log("in set marks");
    		if (xhttp.responseText == 0) {
			console.log("set marks dint work");return 0;
		}
		else {
			console.log("else marks worked");
		}
	   }
	};
	var parameters = 'tid='+tid+'&todate='+todate+'&marks='+marks;
	xhttp.open("POST", "http://localhost:8000/setMarks.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
}
//............................................................................................................................*/
function showHistory() {
	var xhttp = new XMLHttpRequest();
	var username= localStorage.getItem("username");console.log(username);
	var sid = localStorage.getItem("gsid");
	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
			document.getElementById("refername").innerHTML += username +" your previous scores are:";
			document.getElementById("history").innerHTML = xhttp.responseText;
	   	}
	};
	console.log(sid);
	var parameters = 'sid='+sid;
	xhttp.open("POST", "http://localhost:8000/testing.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	return false;
}
//.............................................................................................................................
function showHighest() {
	var xhttp = new XMLHttpRequest();
	//var username= localStorage.getItem("username");console.log(username);
	//var sid = localStorage.getItem("gsid");
	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
			//document.getElementById("refername").innerHTML += username +" your previous scores are:";
			document.getElementById("highest").innerHTML = xhttp.responseText;
	   	}
	};
	console.log(sid);
	var parameters = 'sid='+sid;
	xhttp.open("POST", "http://localhost:8000/highest.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(parameters);
	return false;
}

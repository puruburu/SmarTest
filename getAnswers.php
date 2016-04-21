<?php header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "sonika";
$dbname = "test1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$tnid = $_POST['tnid'];

$sql = "SELECT ans FROM questions WHERE tnid = '$tnid' order by qno ";
$result = $conn->query($sql);

if (!$result) {
    echo 0;
}
else {
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
    	$rows[] = $r;
	}
	echo json_encode($rows);
}

$conn->close();
?> 

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

$sql = "SELECT tid FROM test ORDER BY tid DESC LIMIT 1";
$result = $conn->query($sql);

if (!$result) {
    echo 0;
}
else {
    //echo 1;
    $rows = array();
	while($r = mysqli_fetch_assoc($result)) {
    	$rows[] = $r;
	}
	echo json_encode($rows);
}

$conn->close();
?> 

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

$sid = $_POST['sid'];
$tnid = $_POST['tnid'];

$sql = "INSERT INTO test (sid, tnid) VALUES ('$sid', '$tnid')";
$result = $conn->query($sql);

if (!$result) {
	echo "Error: " . $sql . "<br>" . $conn->error;
    //echo 0;
}
else {
    //echo "New record created successfully";
    echo 1;
}

$conn->close();
?> 

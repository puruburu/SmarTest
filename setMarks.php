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
$tid = $_POST['tid'];
$todate = $_POST['todate'];
$marks = $_POST['marks'];
//$todate=(string)$todate;
print_r("diufkj");
print_r($todate);
$sql = "UPDATE test set marks=$marks  where tid=$tid";
$result = $conn->query($sql);
$sql1 = "UPDATE test set todate = '$todate'  where tid=$tid";
$result1 = $conn->query($sql1);
if (!$result1) {
    echo 0;
}
else {
   echo 1;
}

$conn->close();
?> 

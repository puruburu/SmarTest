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

$username = $_POST["username"];
$password = $_POST["password"];

$sql = "INSERT INTO studentinfo (username, password) VALUES ('$username', '$password')";

if ($conn->query($sql) === TRUE) {
    //echo "New record created successfully";
    echo 1;
}
else {
    //echo "Error: " . $sql . "<br>" . $conn->error;
    echo 0;
}

$conn->close();
?> 

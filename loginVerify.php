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

$username = $_POST["loginUsername"];
$password = $_POST["loginPassword"];

$sql = "SELECT * FROM studentinfo WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

if (!$result) {
	echo "Error: " . $sql . "<br>" . $conn->error;
}
else {
   $rowcount = mysqli_num_rows($result);

   if ($rowcount == 0) {
   		echo "Invalid username or password";
   }
   else {
   		echo 1;
   }
}

$conn->close();
?>

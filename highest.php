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

$sql = "SELECT tnid,sid, marks, todate FROM test order by marks desc limit 20";
$result = $conn->query($sql);
$sql1 = "SELECT sid,username FROM studentinfo ";
$result1 = $conn->query($sql);


if (!$result) {
    echo 0;
}
else {
	echo "<table>
	<tr>
	<th>Test number</th>
	<th>Marks scored</th>
	<th>Date & Time</th>
	</tr>";
	$rows1 = array();
	while($r = mysqli_fetch_assoc($result1)) {
    	$rows1[] = $r;
	}
	while($row = mysqli_fetch_array($result)) {
	    echo "<tr>";
		//$name=$row['sid'];
		// echo "<td>" . $row['sid']. . "</td>";
	    echo "<td>" . $row['tnid'] . "</td>";
	    echo "<td>" . $row['marks'] . "</td>";
	    echo "<td>" . $row['todate'] . "</td>";
	    echo "</tr>";
	}
	echo "</table>";


	/*$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
    	$rows[] = $r;
	}
	echo json_encode($rows); */
}

$conn->close();
?> 

<?php
	 
	/*
	 * Following code will create a new product row
	 * All product details are read from HTTP Post Request
	 */
	 
	// array for JSON response
	$response = array();

	// include db connect class
	require_once __DIR__ . '/db_connect.php';




	if(!isset($_REQUEST["username"]) || !isset($_REQUEST["password"])){
		$response["success"] = 0;
		$response["message"] = "Provice username and password";

		// echoing JSON response
		echo json_encode($response);
		exit(0);
	}

	$username = $_REQUEST['username'];
	$password = $_REQUEST['password'];



	// connecting to db
	$db = new DB_CONNECT();

	// mysql inserting a new row
	$result = mysql_query("SELECT id,role,name,email,phone,address,logo,status FROM account WHERE username = '$username' AND password='$password' ");

	if (!empty($result)) {
		// check for empty result
		if (mysql_num_rows($result) > 0) {

			$result = mysql_fetch_array($result);

			$data = array();
			$data["id"] = $result["id"];
			$data["name"] = $result["name"];
			$data["role"] = $result["role"];
			$data["email"] = $result["email"];
			$data["phone"] = $result["phone"];
			$data["address"] = $result["address"];
			$data["status"] = $result["status"];
		
			// success
			$response["success"] = 1;

			// user node
			$response["data"] = array();

			array_push($response["data"], $data);

			// echoing JSON response
			echo json_encode($response);
		} else {
			// no product found
			$response["success"] = 0;
			$response["message"] = "No user found";

			// echo no users JSON
			echo json_encode($response);
		}
	} else {
		// no product found
		$response["success"] = 0;
		$response["message"] = "No user found";

		// echo no users JSON
		echo json_encode($response);
	}

?>
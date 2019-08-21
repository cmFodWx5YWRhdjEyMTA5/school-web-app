<?php
 
// array for JSON response
$response = array();



// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db
$db = new DB_CONNECT();

if(!isset($_REQUEST["id"]) || !isset($_REQUEST["req"])){

    $response["success"] = 0;
    $response["message"] = "Provide valid parameters.";

    echo json_encode($response);

    exit(0);
}
$req = $_REQUEST['req'];
$uId = $_REQUEST['id'];
$result = mysql_query("SELECT role FROM account WHERE id = '$uId' ");

if (!empty($result)) {
    if (mysql_num_rows($result) > 0) {
        $result = mysql_fetch_array($result);
        if($result["role"]=="admin"){

            if($req=="list"){
                listAccounts();
            }else if($req=="add"){

                if(isset($_REQUEST["data"])){
                    addAccount();
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide data.";
                
                    echo json_encode($response);
                }

            }else{
                $response["success"] = 0;
                $response["message"] = "Invalid Request.";
            
                echo json_encode($response);
            }
        }else{
            $response["success"] = 0;
            $response["message"] = "Permission Denied!";
        
            echo json_encode($response);
        }
    }
}

function addAccount(){

    $data = json_decode($_REQUEST["data"],true);

    $username = $data["username"];

    $result = mysql_query("SELECT role FROM account WHERE username = '$username' ");

    if (!empty($result) && mysql_num_rows($result) > 0){

        $response["success"] = 0;
        $response["message"] = "Username already taken";

        echo json_encode($response);

        exit(0);
    }


    $password = $data["password"];
    $name = $data["name"];
    $email = $data["email"];
    $phone = $data["phone"];
    $address = $data["address"];
    $logo = $data["logo"];

    $result = mysql_query("INSERT INTO account(id,username,password,name,email,phone,address,logo,create_date,update_date,status) 
								VALUES(null,'$username', '$password', '$name','$email', '$phone', '$address','$logo', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'1')");

    if ($result) {
 
        $response["success"] = 1;
        $response["message"] = "account created successfully.";

        echo json_encode($response);
    } else {
       
        $response["success"] = 0;
        $response["message"] = "Oops! An error occurred.";

        echo json_encode($response);
    }
}

function listAccounts(){

    $result = mysql_query("SELECT * FROM account");

    if (!empty($result)) {
        
        if (mysql_num_rows($result) > 0) {


            $response["success"] = 1;

            $response["data"] = array();

           
            while ($row = mysql_fetch_array($result)) {
                $account = array();
               
                $account["id"] = $row["id"];
                $account["role"] = $row["role"];
                $account["username"] = $row["username"];
                $account["password"] = $row["password"];
                $account["name"] = $row["name"];
                $account["email"] = $row["email"];
                $account["phone"] = $row["phone"];
                $account["logo"] = $row["logo"];
                $account["address"] = $row["address"];
                $account["created_at"] = $row["create_date"];
                $account["updated_at"] = $row["update_date"];
                $account["status"] = $row["status"];
    
                array_push($response["data"], $account);
            }

            echo json_encode($response);

        } else {
            // no product found
            $response["success"] = 2;
            $response["message"] = "No user found";

            // echo no users JSON
            echo json_encode($response);
        }
    } else {
        // no product found
        $response["success"] = 0;
        $response["message"] = "Invalid Request";

        // echo no users JSON
        echo json_encode($response);
    }
    exit(0);
}

?>
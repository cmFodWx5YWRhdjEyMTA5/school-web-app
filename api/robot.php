<?php
 
    $response = array();

    require_once __DIR__ . '/db_connect.php';

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
            if($req=="list"){
                listRobots($uId);
            }else if($req=="add"){

                if(isset($_REQUEST["data"])){
                    addRobot($uId);
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide data.";
                
                    echo json_encode($response);
                }

            }else if($req=="delete"){

                if(isset($_REQUEST["robot_id"])){
                    deleteRobot($uId);
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide robot id.";
                
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

    function addRobot($uId){

        $data = json_decode($_REQUEST["data"],true);

        $srNo = $data["sr_no"];

        $result = mysql_query("SELECT id FROM robot WHERE serial_number = '$srNo' ");

        if (!empty($result) && mysql_num_rows($result) > 0){
    
            $response["success"] = 0;
            $response["message"] = "robot already registered";
    
            echo json_encode($response);
    
            exit(0);
        }

        
        $type = $data["type"];
     
		$q = "INSERT INTO robot(id,account_id,serial_number,type,create_date,update_date,status) VALUES(null,'$uId','$srNo', '$type', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'1')";
        $result = mysql_query($q);

        if ($result) {
    
            $response["success"] = 1;
            $response["message"] = "robot successfully created.";

            echo json_encode($response);
        } else {
        
            $response["success"] = 0;
            $response["message"] = "Oops! An error occurred.";

            echo json_encode($response);
        }
    }

  

    function listRobots($uId){

        $result = mysql_query("SELECT * FROM robot  WHERE account_id = $uId");

        if (!empty($result)) {
            
            if (mysql_num_rows($result) > 0) {


                $response["success"] = 1;

                $response["data"] = array();

            
                while ($row = mysql_fetch_array($result)) {
                    $account = array();
                
                    $account["id"] = $row["id"];
                    $account["sr_no"] = $row["serial_number"];
                    $account["type"] = $row["type"];
                    $account["create_date"] = $row["create_date"];
                    $account["status"] = $row["status"];
        
                    array_push($response["data"], $account);
                }

                echo json_encode($response);

            } else {
                
                $response["success"] = 2;
                $response["message"] = "No data found";

                echo json_encode($response);
            }
        } else {
            
            $response["success"] = 0;
            $response["message"] = "Invalid Request";

            echo json_encode($response);
        }
        exit(0);
    }

    function deleteRobot($uId){

        $robotId = $_REQUEST["robot_id"];
        
        $result = mysql_query("DELETE  FROM robot WHERE id = '$robotId' ");

        if ($result) {
            $response["success"] = 1;
            $response["message"] = "robot deleted successfully";

            echo json_encode($response);
        } else {
        
            $response["success"] = 0;
            $response["message"] = "Oops! An error occurred.";

            echo json_encode($response);
        }
        exit(0);
       
    }

?>
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
                listClass($uId);
            }else if($req=="add"){

                if(isset($_REQUEST["data"])){
                    addClass($uId);
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide data.";
                
                    echo json_encode($response);
                }

            }else if($req=="update"){

                if(isset($_REQUEST["data"])){
                    updateClass($uId);
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

    function addClass($uId){

        $data = json_decode($_REQUEST["data"],true);


        $className = $data["class_name"];
        
        $teacherName = $data["teacher_name"];
     
		$q = "INSERT INTO class(class_id,account_id,class_name,teacher_name,create_date,update_date,status) 
                VALUES(null,'$uId','$className', '$teacherName', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'1')";

        $result = mysql_query($q);

        if ($result) {
     
            $name=time();

            $response["success"] = 1;
            $response["message"] = "class successfully created. $name";

            echo json_encode($response);
        } else {    
        
            $response["success"] = 0;
            $response["message"] = "Oops! An error occurred.\n".$q;

            echo json_encode($response);
        }
    }

    function updateClass($uId){

        $data = json_decode($_REQUEST["data"],true);

        $classId = $data["class_id"];
        
        $result = mysql_query("SELECT class_name FROM class WHERE class_id = '$classId' ");

        if (!empty($result) && mysql_num_rows($result) > 0){
    
            $className = $data["class_name"];
        
            $teacherName = $data["teacher_name"];
                 
            $q = "UPDATE `class` SET `class_name` = '$className', `teacher_name` = '$teacherName', `update_date` = CURRENT_TIMESTAMP WHERE `class`.`class_id` = $classId";
            
            $result = mysql_query($q);
                    
            if ($result) {
        
                $response["success"] = 1;
                $response["message"] = "class updated successfully.";
    
                echo json_encode($response);
            } else {
            
                $response["success"] = 0;
                $response["message"] = "Oops! An error occurred.";
    
                echo json_encode($response);
            }
            exit(0);
        }
        $response["success"] = 0;
        $response["message"] = "invalid Class";

        echo json_encode($response);

        exit(0);
       
    }

    function listClass($uId){

        $result = mysql_query("SELECT * FROM class  WHERE account_id = '$uId' AND status = '1'");

        if (!empty($result)) {
            
            if (mysql_num_rows($result) > 0) {


                $response["success"] = 1;

                $response["data"] = array();

            
                while ($row = mysql_fetch_array($result)) {
                    $account = array();
                
                    $account["class_id"] = $row["class_id"];
                    $account["class_name"] = $row["class_name"];
                    $account["teacher_name"] = $row["teacher_name"];
                    $account["create_date"] = $row["create_date"];
        
                    array_push($response["data"], $account);
                }

                echo json_encode($response);

            } else {
                
                $response["success"] = 0;
                $response["message"] = "No data found";

                echo json_encode($response);
            }
        } else {
            
            $response["success"] = 0;
            $response["message"] = "No data found";

            echo json_encode($response);
        }
        exit(0);
    }

?>
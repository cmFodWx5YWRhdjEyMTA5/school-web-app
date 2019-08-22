<?php
 
    $response = array();

    require_once __DIR__ . '/db_connect.php';
    require_once __DIR__ . '/validator.php';

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
                listTemperatures($uId);
            }else if($req=="add"){

                if(isset($_REQUEST["data"])){
                    addTemperature($uId);
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide data.";
                
                    echo json_encode($response);
                }

            }else if($req=="delete"){

                if(isset($_REQUEST["temperature_id"])){
                    deleteTemperature($uId);
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide temperature id.";
                
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


    function addTemperature($uId){

        $data = json_decode($_REQUEST["data"],true);

        if($data["student_id"]!=null && $data["class_id"]!=null && $data["temperature"]!=null){

            $studentId = $data["student_id"];
            $classId = $data["class_id"];
            $temperature = $data["temperature"];
           
          
    
            $q = "INSERT INTO temperature(id,account_id,class_id,student_id,date) 
                    VALUES(null,'$uId','$classId','$studentId', CURRENT_TIMESTAMP)";
    
            $result = mysql_query($q);
    
            if ($result) {
                $response["success"] = 1;
                $response["message"] = "record added successfully";
                echo json_encode($response);
            } else {
    
                $response["success"] = 0;
                $response["message"] = "Oops! An error occurred.\n";
    
                echo json_encode($response);
               
            }

        }else{
            $response["success"] = 0;
            $response["message"] = "Invalid Data";
    
            echo json_encode($response);
        }

        exit(0);
       
    }


    function deleteTemperature($uId){

        $tId = $_REQUEST["temperature_id"];
        
        $result = mysql_query("DELETE  FROM temperature WHERE id = '$tId' ");

        if ($result) {
            $response["success"] = 1;
            $response["message"] = "record deleted successfully";

            echo json_encode($response);
        } else {
        
            $response["success"] = 0;
            $response["message"] = "Oops! An error occurred.";

            echo json_encode($response);
        }
        exit(0);
       
    }


    function listTemperatures($uId){

        // "SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
        // FROM Orders
        // INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;";
        
        if(isset($_REQUEST["class_id"]) ){
            $cId = $_REQUEST["class_id"];
            $q = "SELECT temperature.id,temperature.temperature,temperature.student_id,temperature.class_id,
            student.first_name,student.last_name,student.photo,student.gender,temperature.date
            FROM temperature  
            INNER JOIN student on temperature.account_id = student.account_id
            WHERE temperature.account_id = '$uId' AND temperature.class_id = '$cId' ";            
        }else{
            $q = "SELECT temperature.id,temperature.temperature,temperature.student_id,temperature.class_id,
            student.first_name,student.last_name,student.photo,student.gender,temperature.date
            FROM temperature  
            INNER JOIN student on temperature.account_id = student.account_id
            WHERE temperature.account_id = '$uId' ";
        }

        $result = mysql_query($q);

        if (!empty($result)) {
            
            if (mysql_num_rows($result) > 0) {


                $response["success"] = 1;

                $response["data"] = array();

            
                while ($row = mysql_fetch_array($result)) {
                    $account = array();
                
                    $account["id"] = $row["id"];
                    $account["student_id"] = $row["student_id"];
                    $account["class_id"] = $row["class_id"];
                    $account["first_name"] = $row["first_name"];
                    $account["last_name"] = $row["last_name"];
                    $account["gender"] = $row["gender"];
                    $account["photo"] = $row["photo"];
                    $account["temperature"] = $row["temperature"];
                    $account["date"] = $row["date"];
        
                    array_push($response["data"], $account);
                }

                echo json_encode($response);

            } else {
                
                $response["success"] = 2;
                $response["message"] = "No data found ";

                echo json_encode($response);
            }
        } else {
            
            $response["success"] = 0;
            $response["message"] = "Invalid Request";

            echo json_encode($response);
        }
        exit(0);
    }

?>
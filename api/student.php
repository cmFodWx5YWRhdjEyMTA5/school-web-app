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
                listStudents($uId);
            }else if($req=="add"){

                if(isset($_REQUEST["data"]) && isset($_FILES['photo'])){
                    addStudent($uId);
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide data and image.";
                
                    echo json_encode($response);
                }

            }else if($req=="update"){

                if(isset($_REQUEST["data"])){
                    updateStudent($uId);
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide data.";
                
                    echo json_encode($response);
                }

            }else if($req=="delete"){

                if(isset($_REQUEST["student_id"])){
                    deleteStudent($uId);
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide student id.";
                
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


    function addStudent($uId){

        $data = json_decode($_REQUEST["data"],true);


        $firstName = $data["first_name"];
        $lastName = $data["last_name"];
        $gender = $data["gender"];
        $classId = $data["class_id"];

		$q = "INSERT INTO student(student_id,account_id,class_id,first_name,last_name,gender,create_date,update_date,status) 
                VALUES(null,'$uId','$classId','$firstName', '$lastName','$gender', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'1')";

        $result = mysql_query($q);

        if ($result) {
            savePhoto(false);
        } else {

            $response["success"] = 0;
            $response["message"] = "Oops! An error occurred.\n".$q;

            echo json_encode($response);
            exit(0);
        }
    }

    function savePhoto($isUpdate,$uId){
        
        $name=time();
    
        $response["success"] = 1;

        if($isUpdate){
            $response["message"] = "student updated successfully. ".$name;
        }else{
            $response["message"] = "student registered successfully.".$name;
        }

        echo json_encode($response);

        exit(0);
    }

    function updateStudent($uId){

        $data = json_decode($_REQUEST["data"],true);

        $studentId = $data["student_id"];
        
        $result = mysql_query("SELECT first_name FROM student WHERE student_id = '$studentId' ");

        if (!empty($result) && mysql_num_rows($result) > 0){
    

            $firstName = $data["first_name"];
            $lastName = $data["last_name"];
            $gender = $data["gender"];
            $classId = $data["class_id"];
      
            $q = "UPDATE `student` SET `first_name` = '$firstName', `last_name` = '$lastName',
             `gender` = '$gender', `class_id` = '$classId',
             `update_date` = CURRENT_TIMESTAMP WHERE `student`.`student_id` = $studentId";
            
            $result = mysql_query($q);
                    
            if ($result) {
                if(isset($_FILES['photo'])){
                    savePhoto(true,$uId);
                }else{
                    $response["success"] = 1;
                    $response["message"] = "student updated successfully.";
        
                    echo json_encode($response);
                }
            } else {
            
                $response["success"] = 0;
                $response["message"] = "Oops! An error occurred.";
    
                echo json_encode($response);
            }
            exit(0);
        }
        $response["success"] = 0;
        $response["message"] = "invalid student";

        echo json_encode($response);

        exit(0);
       
    }

    function deleteStudent($uId){

        $studentId = $_REQUEST["student_id"];
        
        $result = mysql_query("DELETE  FROM student WHERE student_id = '$studentId' ");

        if ($result) {
            $response["success"] = 1;
            $response["message"] = "student deleted successfully";

            echo json_encode($response);
        } else {
        
            $response["success"] = 0;
            $response["message"] = "Oops! An error occurred.";

            echo json_encode($response);
        }
        exit(0);
       
    }


    function listStudents($uId){

        $result = mysql_query("SELECT * FROM student  WHERE account_id = '$uId' AND status = '1'");

        if (!empty($result)) {
            
            if (mysql_num_rows($result) > 0) {


                $response["success"] = 1;

                $response["data"] = array();

            
                while ($row = mysql_fetch_array($result)) {
                    $account = array();
                
                    $account["student_id"] = $row["student_id"];
                    $account["first_name"] = $row["first_name"];
                    $account["last_name"] = $row["last_name"];
                    $account["photo"] = $row["photo"];
                    $account["gender"] = $row["gender"];
                    $account["class_id"] = $row["class_id"];
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
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
                    $studentId = $_REQUEST["student_id"];
                    deleteStudent($studentId,true);
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




        if($data["first_name"]!=null && $data["last_name"]!=null && $data["gender"]!=null && $data["class_id"]!=null  ){
            $firstName = $data["first_name"];
            $lastName = $data["last_name"];
            $gender = $data["gender"];
            $classId = $data["class_id"];
    
            $q = "INSERT INTO student(student_id,account_id,class_id,first_name,last_name,gender,create_date,update_date,status) 
                    VALUES(null,'$uId','$classId','$firstName', '$lastName','$gender', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'1')";
    
            $result = mysql_query($q);
            $autoId = mysql_query("SELECT MAX(student_id) FROM student");
            $row = mysql_fetch_row($autoId);
            $sId = $row[0];
    
            if ($result) {
                savePhoto(false,$sId);
            } else {
                $response["success"] = 0;
                $response["message"] = "Error Occurred!".$q;
            }
        }else{
            $response["success"] = 0;
            $response["message"] = "Invalid Data";
        }
        echo json_encode($response);
        exit(0);
    }

    function savePhoto($isUpdate,$sId){
        
        $response = null;

        $fileName 	= 	$_FILES['photo']['name'];
		$fileSize 	=	$_FILES['photo']['size'];
		$fileTmp 	=	$_FILES['photo']['tmp_name'];
		$fileType	=	$_FILES['photo']['type'];
		
		$value 		= 	explode(".", $fileName);
		$fileExt	=	strtolower(array_pop($value)); 
			  
		$expensions		=	array("jpeg","jpg","png");
			 

       

		if(in_array($fileExt,$expensions)=== false){
			$fileResult	=	"extension not allowed, please choose a JPEG or PNG file.";
            $errors	=	"extension not allowed, please choose a JPEG or PNG file.";
          
		}
			  
		if($fileSize == 0 || $fileSize > 2097152 ){
			$fileResult	=	'File size must be excately 2 MB';
            $errors	=	'Filse size must be 2 MB or Less ';
          
        }

        if(empty($errors)){
            $path="";
            $name = $sId.".".$fileExt;
            $path = "../data/images/students/".$sId.".".$fileExt;
			
			if (file_exists($path)) {
				unlink($path);
            }
            
            
			
			move_uploaded_file($fileTmp,$path);
                
            updatePhotoName($name,$sId);

            $res["success"]	= 1;
			if($isUpdate){
                $res["message"] = "student updated successfully.";
            }else{
                $res["message"] = "student registered successfully.";
            }
				
		}else{
            deleteStudent($sId,false);
			$res["success"]	= 0;
			$res["image"] 	= "error";
			$res["message"] = $errors;
		}
		
		print json_encode($res);

        exit(0);
    }

    function updatePhotoName($name,$studentId){
        
        $q = "UPDATE `student` SET `photo` = '$name', 
        `update_date` = CURRENT_TIMESTAMP WHERE `student`.`student_id` = '$studentId'";
       
       $result = mysql_query($q);
    }

    function updateStudent($uId){

        $data = json_decode($_REQUEST["data"],true);

        if($data["first_name"]!=null && $data["last_name"]!=null && $data["gender"]!=null && $data["class_id"]!=null  ){
           
            $studentId = $data["student_id"];
        
            $result = mysql_query("SELECT first_name FROM student WHERE student_id = '$studentId' ");
    
            if (!empty($result) && mysql_num_rows($result) > 0){
        
    
                $firstName = $data["first_name"];
                $lastName = $data["last_name"];
                $gender = $data["gender"];
                $classId = $data["class_id"];
          
                $q = "UPDATE `student` SET `first_name` = '$firstName', `last_name` = '$lastName',
                 `gender` = '$gender', `class_id` = '$classId',
                 `update_date` = CURRENT_TIMESTAMP WHERE `student`.`student_id` = $studentId AND `student`.`account_id` = $uId";
                
                $result = mysql_query($q);
                        
                if ($result) {
                    if(isset($_FILES['photo'])){
                        savePhoto(true,$studentId);
                    }else{
                        $response["success"] = 1;
                        $response["message"] = "student updated successfully.";
                    }
                } else {
                    $response["success"] = 0;
                    $response["message"] = "Oops! An error occurred.";
                }
                echo json_encode($response);
                exit(0);
            }
            $response["success"] = 0;
            $response["message"] = "invalid student";
        }else{
            $response["success"] = 0;
            $response["message"] = "Invalid Data";
        }
        echo json_encode($response);
        exit(0);

       
       
    }

    function deleteStudent($sId,$exit){

        global $uId;
        
        

        $result = mysql_query("DELETE  FROM student WHERE student_id = '$sId'  AND `student`.`account_id` = $uId ");

        if($exit){
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
      
    }


    function listStudents($uId){

        if(isset($_REQUEST["class_id"]) ){
            $cId = $_REQUEST["class_id"];
            $q = "SELECT * FROM student  WHERE account_id = '$uId' AND class_id = '$cId' AND status = '1'";
            
        }else{
            $q = "SELECT * FROM student  WHERE account_id = '$uId' AND status = '1'";
        }

        $result = mysql_query($q);

        if (!empty($result)) {
            
            if (mysql_num_rows($result) > 0) {


                $response["success"] = 1;

                $response["data"] = array();

            
                while ($row = mysql_fetch_array($result)) {
                    $account = array();
                
                    $account["student_id"] = $row["student_id"];
                    $account["photo"] = $row["photo"];
                    $account["first_name"] = $row["first_name"];
                    $account["last_name"] = $row["last_name"];
                    $account["gender"] = $row["gender"];
                    $account["class_id"] = $row["class_id"];
                    $account["create_date"] = $row["create_date"];
        
                    array_push($response["data"], $account);
                }

                echo json_encode($response);

            } else {
                
                $response["success"] = 1;
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
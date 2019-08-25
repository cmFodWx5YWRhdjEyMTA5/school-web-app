<?php
 
// array for JSON response
$response = array();



// include db connect class
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/validator.php';

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

            }else if($req=="update"){

                if(isset($_REQUEST["data"])){
                    updateAccount();
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide data.";
                
                    echo json_encode($response);
                }

            }else if($req=="logo"){

                if(isset($_FILES['photo'])){
                    saveLogo(true,$uId);
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide image.";
                
                    echo json_encode($response);
                }

            }else if($req=="delete"){

                if(isset($_REQUEST["account_id"])){
                    $aId = $_REQUEST["account_id"];
                    deleteAccount($aId,true);
                }else{
                    $response["success"] = 0;
                    $response["message"] = "provide account.";
                
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

    if($data["username"]!=null && $data["password"] && $data["name"] && $data["email"] && $data["phone"] && $data["address"]){
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
      
        $result = mysql_query("INSERT INTO account(id,username,password,name,email,phone,address,create_date,update_date,status) 
                                    VALUES(null,'$username', '$password', '$name','$email', '$phone', '$address', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'1')");
    
        if ($result) {
            if(isset($_FILES['photo'])){
                $checkId = "SELECT id FROM account WHERE username = '$username'";
                $check = mysql_query($checkId);	
                $row = mysql_fetch_array($check);
                $aId = $row[0];
    
                saveLogo(false,$aId);
            }else{
                $response["success"] = 1;
                $response["message"] = "account created successfully.";
    
              
            }
        } else {
            $response["success"] = 0;
            $response["message"] = "Oops! An error occurred.";
        }
        echo json_encode($response);
    }else{
        $response["success"] = 0;
        $response["message"] = "Invalid Data";

        echo json_encode($response);

        exit(0);
    }
}

function updateAccount(){

    $data = json_decode($_REQUEST["data"],true);

    if($data["username"]!=null && $data["password"] !=null && $data["name"] !=null && $data["email"] !=null  && $data["phone"] !=null && $data["address"] !=null){

        
        $aId = $data["id"];
       
        $result = mysql_query("SELECT role FROM account WHERE id = '$aId'");
    
        if (empty($result) || mysql_num_rows($result) < 1){
    
            $response["success"] = 0;
            $response["message"] = "Invalid data...";
    
            echo json_encode($response);
    
            exit(0);
        }

        $username = $data["username"];

        $q = "SELECT role FROM account WHERE username = '$username' AND id != '$aId'";
        $result = mysql_query($q);
    
        if (!empty($result) && mysql_num_rows($result) > 0){
    
            $response["success"] = 0;
            $response["message"] = "Username already taken ";
    
            echo json_encode($response);
    
            exit(0);
        }
    
        $password = $data["password"];
        $name = $data["name"];
        $email = $data["email"];
        $phone = $data["phone"];
        $address = $data["address"];
      
        $q = "UPDATE `account` SET `username` = '$username', `password` = '$password',
                 `name` = '$name', `address` = '$address',
                 `email` = '$email', `phone` = '$phone',
                 `update_date` = CURRENT_TIMESTAMP WHERE `account`.`id` = '$aId'";
                
                $result = mysql_query($q);
                        
                if ($result) {
                    if(isset($_FILES['photo'])){
                        saveLogo(true,$aId);
                    }else{
                        $response["success"] = 1;
                        $response["message"] = "account updated successfully.";
                    }
                } else {
                    $response["success"] = 0;
                    $response["message"] = "Oops! An error occurred.";
                }
                echo json_encode($response);
                exit(0);
    }else{
        $response["success"] = 0;
        $response["message"] = "Invalid Data";

        echo json_encode($response);

        exit(0);
    }
}

function saveLogo($isUpdate,$aId){
        
    $response = null;
   

    $fileSize 	=	$_FILES['photo']['size'];
   
    if($fileSize==null){
        $response["success"] = 0;
        $response["message"] = "Invalid Image";

        echo json_encode($response);

        exit(0);
    }

    $fileName 	= 	$_FILES['photo']['name'];
   
    $fileTmp 	=	$_FILES['photo']['tmp_name'];
    $fileType	=	$_FILES['photo']['type'];
    
    $value 		= 	explode(".", $fileName);
    $fileExt	=	strtolower(array_pop($value)); 
          
    $expensions		=	array("jpeg","jpg","png");
         
    if(in_array($fileExt,$expensions)=== false){
        $fileResult	=	"extension not allowed, please choose a JPEG or PNG file.";
        $errors	=	"extension not allowed, please choose a JPEG or PNG file.".$aId;
      
    }
          
    if($fileSize == 0 || $fileSize > 2097152 ){
        $fileResult	=	'File size must be excately 2 MB';
        $errors	=	'Filse size must be 2 MB or Less '.$aId;
      
    }

    if(empty($errors)){
        $path="";
        $name = $aId.".".$fileExt;
        $path = "../data/images/logos/".$aId.".".$fileExt;
        
        if (file_exists($path)) {
            unlink($path);
        }
        
        move_uploaded_file($fileTmp,$path);
            
        updatePhotoName($name,$aId);

        $res["success"]	= 1;
        if($isUpdate){
            $res["message"] = "account updated successfully.";
        }else{
            $res["message"] = "account with logo created successfully.";
        }
            
    }else{
        if($isUpdate){
            $res["success"]	= 0;
            $res["image"] 	=  $errors;
            $res["message"] = "Image Update Falied";
        }else{
            deleteAccount($aId,false);
            $res["success"]	= 0;
            $res["image"] 	=  $errors;
            $res["message"] = "Failed to upload image";
        }
    }
    
    print json_encode($res);

    exit(0);
}

function updatePhotoName($name,$aId){
        
    $q = "UPDATE `account` SET `logo` = '$name', 
    `update_date` = CURRENT_TIMESTAMP WHERE `account`.`id` = '$aId'";
   
   $result = mysql_query($q);
}

function deleteAccount($aId,$exit){

    $checkId = "SELECT logo FROM account WHERE id = '$aId'";
    $check = mysql_query($checkId);	
    $row = mysql_fetch_array($check);
    $logo = $row[0];
    $path = "../data/images/logos/";
    if (file_exists($path)) {
        chdir($path); 
        chown($logo,465);
    }


    $result = mysql_query("DELETE  FROM account WHERE id = '$aId' ");

    if($exit){
        if ($result) {
            $response["success"] = 1;
            $response["message"] = "account deleted successfully";

            echo json_encode($response);
        } else {
        
            $response["success"] = 0;
            $response["message"] = "Oops! An error occurred.";

            echo json_encode($response);
        }
        exit(0);
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
                $account["logo"] = $row["logo"];
                $account["role"] = $row["role"];
                $account["username"] = $row["username"];
                $account["password"] = $row["password"];
                $account["name"] = $row["name"];
                $account["email"] = $row["email"];
                $account["phone"] = $row["phone"];
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
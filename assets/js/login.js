
let txtError;
var doCallApi = true;

$(document).ready(function(){
    
    if($.session.get("username")!=null && $.session.get("password")!=null){
        performLLogin($.session.get("username"),$.session.get("password"),function(response) {
            var res = JSON.parse(response);
           
            if(res.success==1){
                let school = res.data;
                let id = school.id;
                let name = school.name;
                let address = school.address;
                let phone = school.phone;
                let email = school.email;
                let logo = school.logo;
                let role = school.role;
                let status = school.status;
    
                if(status == "1"){
                    $.session.set("id",id);
                    $.session.set("username",username.value);
                    $.session.set("password",password.value);
                    $.session.set("name",name);
                    $.session.set("address",address);
                    $.session.set("phone",phone);
                    $.session.set("email",email);
                    $.session.set("logo",logo);
                    $.session.set("role",role); 
    
                    if(role=="admin"){
                        window.location.replace("home.html");
                    }else{
                        window.location.replace("school.html");
                    }
                    
                }
            }

          });
    }

    var inUsername = document.getElementById("username");
    var inPassword = document.getElementById("password");
    txtError  = document.getElementById("txtError");

    $('#formLogin').submit(function (e) {
        txtError.innerHTML = "";
        e.preventDefault();
        if(doCallApi){
            validateLogin(inUsername,inPassword);
        }
      });


     
});

function validateLogin(username,password){

    if(username.value == "" || password.value == ""){
        txtError.innerHTML = "Enter Username and Password";
        return;
    }

    performLLogin(username.value,password.value,function(response) {
        var res = JSON.parse(response);
       
        if(res.success==1){
            let school = res.data;
            let id = school.id;
            let name = school.name;
            let address = school.address;
            let phone = school.phone;
            let email = school.email;
            let logo = school.logo;
            let role = school.role;
            let status = school.status;

            if(status == "1"){
                $.session.set("id",id);
                $.session.set("username",username.value);
                $.session.set("password",password.value);
                $.session.set("name",name);
                $.session.set("address",address);
                $.session.set("phone",phone);
                $.session.set("email",email);
                $.session.set("logo",logo);
                $.session.set("role",role); 

                if(role=="school"){
                    window.location.replace("school.html");
                }else{
                    window.location.replace("home.html");
                }
                
            }else{
                alert("Your account is disabled!\nPlease contact our support team for more information");
            }
            
        }else{
            txtError.innerHTML = "Invalid Username or Password!";
        }
      });

}


function performLLogin(username,password,callback) {   

    $.post("api/login.php",
    {
      username: username,
      password: password
    },
    function(data, status){
      
      console.log("Data: " + data + "\nStatus: " + status);
      if (status == "success") {
         callback(data);
      }else{
        var res = JSON.parse(data);
        alert(res.message);
      }
  
    });
  
  }
   



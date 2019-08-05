
let txtError;

$(document).ready(function(){
    
    var inUsername = document.getElementById("username");
    var inPassword = document.getElementById("password");
    txtError  = document.getElementById("txtError");

    $('#formLogin').submit(function (e) {
        txtError.innerHTML = "";
        e.preventDefault();
        checkLogin(inUsername,inPassword);
      });
     
});

function checkLogin(username,password){

    if(username.value == "admin" && password.value == "admin"){
        window.location.replace("home.html");
        return;
    }

    txtError.innerHTML = "Invalid Username or Password";
    

}
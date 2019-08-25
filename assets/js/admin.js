let navSchool = document.getElementById("navSchool");
let navClass = document.getElementById("navClass");
let navStudent = document.getElementById("navStudent");
let navHealth = document.getElementById("navHealth");
let navRobot = document.getElementById("navRobot");
let navLogout = document.getElementById("navLogout");
let aId = $.session.get("id");

$(document).ready(function(){

  checkLogin();

  if($.session.get("role")=="admin"){
    document.getElementById('navSchool').style.visibility='visible';
    $('#optionView').load('view/schools.html',function(responseTxt, statusTxt, xhr){
      if(statusTxt == "success")
        initSchool();
      if(statusTxt == "error")
        alert("Error: " + xhr.status + ": " + xhr.statusText);
    });
  
  }else{
    window.location.replace("index.html");
  
  }
  
 
 
  
  navSchool.onclick = function() {
    $('#optionView').load('view/schools.html',function(responseTxt, statusTxt, xhr){
      if(statusTxt == "success")
        initSchool();
        activateItem(navSchool);
      if(statusTxt == "error")
        alert("Error: " + xhr.status + ": " + xhr.statusText);
    });

  }
 
  navClass.onclick = function() {
    $('#optionView').load('view/classes.html',function(responseTxt, statusTxt, xhr){
      if(statusTxt == "success")
        initClass();
        activateItem(navClass);
      if(statusTxt == "error")
        alert("Error: " + xhr.status + ": " + xhr.statusText);
    });
   

  }
 
  navStudent.onclick = function() {
    $('#optionView').load('view/students.html',function(responseTxt, statusTxt, xhr){
      if(statusTxt == "success")
        initStudent();
        activateItem(navStudent);
      if(statusTxt == "error")
        alert("Error: " + xhr.status + ": " + xhr.statusText);
    });
  

  }
 
  navHealth.onclick = function() {
    $('#optionView').load('view/health.html',function(responseTxt, statusTxt, xhr){
      if(statusTxt == "success")
        initHealth();
        activateItem(navHealth);
      if(statusTxt == "error")
        alert("Error: " + xhr.status + ": " + xhr.statusText);
    });
  

  }
 
  navRobot.onclick = function() {
    $('#optionView').load('view/robots.html',function(responseTxt, statusTxt, xhr){
      if(statusTxt == "success")
        initRobot();
        activateItem(navRobot);
      if(statusTxt == "error")
        alert("Error: " + xhr.status + ": " + xhr.statusText);
    });
  }

  navLogout.onclick = function() {
                  $.session.remove("id");
                  $.session.remove("username");
                  $.session.remove("passeord");
                  $.session.remove("name");
                  $.session.remove("address");
                  $.session.remove("phone");
                  $.session.remove("email");
                  $.session.remove("logo");
                  $.session.remove("role"); 
                  window.location.replace("index.html");
  }

  setDetails();
  

});

function setDetails(){
  let logo = $.session.get("logo");

  // if(logo!=undefined){
  //   $('#imgUser').attr('src', "data/images/logos/"+logo);
  // }

  let name = $.session.get("name");
  document.getElementById("userName").innerHTML = name;  
}

function activateItem(navActive){
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  navActive.className += " active";
}

 
function getClassList(callback){
  $.post("api/class.php",
  {
    id: aId,
    req: "list"
  },
  function(data, status){
    
    if (status == "success") {
       callback(data);
    }else{
      var res = JSON.parse(data);
      alert(res.message);
    }

  });

}

function checkLogin(){
    let username = $.session.get("username");
    let password = $.session.get("password");

    
  if(username!=null && password!=null){
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
                  $.session.set("passeord",password.value);
                  $.session.set("name",name);
                  $.session.set("address",address);
                  $.session.set("phone",phone);
                  $.session.set("email",email);
                  $.session.set("logo",logo);
                  $.session.set("role",role); 
  
          
                  return;                  
              }
          }
          

          window.location.replace("index.html");

        });
  }else{
    window.location.replace("index.html");

  }
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
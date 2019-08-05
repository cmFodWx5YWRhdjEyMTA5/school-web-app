let navSchool = document.getElementById("navSchool");
let navClass = document.getElementById("navClass");
let navStudent = document.getElementById("navStudent");
let navHealth = document.getElementById("navHealth");
let navRobot = document.getElementById("navRobot");

$(document).ready(function(){
  
  $('#optionView').load('view/schools.html',function(responseTxt, statusTxt, xhr){
    if(statusTxt == "success")
      initSchool();
    if(statusTxt == "error")
      alert("Error: " + xhr.status + ": " + xhr.statusText);
  });

 
  
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
  
  window.onclick = function(event) {
    if (event.target == modalSchool) {
      modalSchool.style.display = "none";
    }
  }
});

function activateItem(navActive){
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  navActive.className += " active";
}
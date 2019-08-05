
let modalSchool;

let btnAddSchool;

let spanSchool; 

var listSchool; 
var schoolId;
var editSchool;
var selectionSchool;

function initSchool(){

  modalSchool   = document.getElementById("mSchool");
  btnAddSchool  = document.getElementById("btnAddSchool");
  spanSchool    = document.getElementsByClassName("close")[0];

  loadSchoolList();

  btnAddSchool.onclick = function() {
    document.getElementById("formSchool").reset();

    editSchool = false;

    modalSchool.style.display = "block";
 }
  
 spanSchool.onclick = function() {
    modalSchool.style.display = "none";
  }
  
  $('#formSchool').submit(function (e) {

    e.preventDefault();
    validateAndSubmit();
  });

  $("#fSchoolLogo").change(function() {
    getLogo(this);
  });

 
}

function getLogo(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#imgLogo').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}


function getSchoolList(callback) {   
  let xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', "assets/data/schools.json", true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

function loadSchoolList() {
    getSchoolList(function(response) {
    listSchool = JSON.parse(response);
    console.log(listSchool);
    showSchoolList(listSchool);
  });
}

function showSchoolList(listSchool){
  let x = "";

  console.log("count > "+listSchool.length);
  for(i in listSchool){
    let school = listSchool[i];
    var scId = "sc_tr_"+i;

    
    console.log("school > "+scId+"");
    
    x+="<tr id= "+scId+" >"+
        "<td><img class='rounded-circle' src='assets/img/university.png' style='width: 64px;'></td>"+
        "<td>"+school.name+"</td>"+
        "<td>"+school.username+"</td>"+
        "<td>"+school.phone+"</td>"+
        "<td class='text-center'>"+
        "<button id=sc_"+school.id+" class='btn btn-primary scEdit' style='background-color: rgb(45,200,32);' onclick='editSchoolInfo("+i+")'>Edit</button>"+
        "</td>"+
      "</tr>";


   }
   document.getElementById("schoolList").innerHTML = x;
}
 
function validateAndSubmit() {

  

  let username     = document.getElementById("fUsename").value;
   if (username === "imran") {
     alert("Username "+username+" already exist");
     return false;
   }

   let inPswd     = document.getElementById("fPswd");
   let inConfPaswd = document.getElementById("fConformPswd");

   if(inPswd.value != inConfPaswd.value ){
      alert("Password is not matching!");
      return false;
   }

   registerSchool();

  
   
 }
 




function registerSchool() {

 
  
  let inName     = document.getElementById("fName");
  let inUsername = document.getElementById("fUsename");
  let inPswd     = document.getElementById("fPswd");
  let inPhone    = document.getElementById("fPhone");
  let inEmail    = document.getElementById("fEmail");
  let inAddress  = document.getElementById("fAddress");


      if(editSchool){

        var school = {
          "id":schoolId,
          "name":inName.value,
          "username":inUsername.value,
          "password":inPswd.value,
          "email":inEmail.value,
          "phone":inPhone.value,
          "address":inAddress.value
        }
        

        listSchool[selectionSchool] = school;

        var x = "<tr id= sc_tr_"+selectionSchool+" >"+
            "<td><img class='rounded-circle' src='assets/img/university.png' style='width: 64px;'></td>"+
            "<td>"+school.name+"</td>"+
            "<td>"+school.username+"</td>"+
            "<td>"+school.phone+"</td>"+
            "<td class='text-center'><button id='sc_"+school.id+"' class='btn btn-primary scEdit'  style='background-color: rgb(45,200,32);' onclick='editSchoolInfo("+selectionSchool+")'>Edit</button></td>"+
          "</tr>";

          document.getElementById("sc_tr_"+selectionSchool).innerHTML = x;

          console.log(x);

      }else{
        
        var school = {
          "id":listSchool.length,
          "name":inName.value,
          "username":inUsername.value,
          "password":inPswd.value,
          "email":inEmail.value,
          "phone":inPhone.value,
          "address":inAddress.value
        }
        

        console.log("before add > "+listSchool.length);
        listSchool.push(school);
        console.log("after add > "+listSchool.length);
        
        var index = listSchool.length-1;

        var x = "<tr id= sc_tr_"+index+" >"+
            "<td><img class='rounded-circle' src='assets/img/university.png' style='width: 64px;'></td>"+
            "<td>"+school.name+"</td>"+
            "<td>"+school.username+"</td>"+
            "<td>"+school.phone+"</td>"+
            "<td class='text-center'><button id='sc_"+school.id+"' class='btn btn-primary scEdit'  style='background-color: rgb(45,200,32);' onclick='editSchoolInfo("+index+")'>Edit</button></td>"+
          "</tr>";

        $(x).appendTo("#schoolTable tbody");

        console.log(x);
      }
      //alert("School Registered Successfully!");
      modalSchool.style.display = "none";
}
 


function editSchoolInfo(position){
  document.getElementById("formSchool").reset();

  console.log(position+" count > "+listSchool.length);

  let school = listSchool[position];

  var scId = "sc_tr_"+position+"";    
  console.log("edit > "+scId);

  let inName      = document.getElementById("fName");
  let inUsername  = document.getElementById("fUsename");
  let inPswd      = document.getElementById("fPswd");
  let inConfPaswd = document.getElementById("fConformPswd");
  let inPhone     = document.getElementById("fPhone");
  let inEmail     = document.getElementById("fEmail");
  let inAddress   = document.getElementById("fAddress");

  inName.value          = school.name;
  inUsername.value      = school.username;
  inPswd.value          = school.password;
  inConfPaswd.value     = school.password;
  inPhone.value         = school.phone;
  inEmail.value         = school.email;
  inAddress.value       = school.address;

  editSchool = true;
  selectionSchool = position;

  schoolId = school.id;
  
  modalSchool.style.display = "block";

}

function updateSchool(){


}







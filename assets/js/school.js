
let modalSchool;

let btnAddSchool;

let spanSchool; 

var listSchool; 
var schoolId;
var editSchool;
var selectionSchool;
var logo = null;

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
    logo = input.files[0];
  }
}


function getSchools(callback) {   

  $.post("api/account.php",
  {
    id: aId,
    req: "list"
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

function loadSchoolList() {
  getSchools(function(response) {
    var res = JSON.parse(response);
    console.log(res);
    if(res.success==1){
      listSchool = res.data;
      showSchoolList(listSchool);
    }else{
      var msg;
      msg = "No Schools found "+aId;
      document.getElementById("schoolList").innerHTML = "";  
      alert(msg);

    }
  });
}

function showSchoolList(listSchool){
  let x = "";

  console.log("count > "+listSchool.length);
  for(i in listSchool){
    let school = listSchool[i];
    var scId = "sc_tr_"+i;

    console.log("school > "+scId+"");
    var img = "";
    if(school.logo!=null){
      img = "data/images/logos/"+school.logo;
    }else{
      img = "assets/img/university.png";
    }
    //rounded-circle'

    x+="<tr id= "+scId+" >"+
        "<td><img src='"+img+"' style='width: 64px;'></td>"+
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

   let inPswd     = document.getElementById("fPswd");
   let inConfPaswd = document.getElementById("fConformPswd");

   if(inPswd.value != inConfPaswd.value ){
      alert("Password is not matching!");
      return false;
   }

    let inName     = document.getElementById("fName");
    let inUsername = document.getElementById("fUsename");
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
        
        querySchool(school,true);

      }else{
        
        var school = {
          "name":inName.value,
          "username":inUsername.value,
          "password":inPswd.value,
          "email":inEmail.value,
          "phone":inPhone.value,
          "address":inAddress.value
        }

        querySchool(school,false);

      }
    
   
 }
 

function querySchool(school,update){
  console.log(">>>>>>>>>>>>>>>>>");
  
  var data = new FormData();
  if(logo!=null){
    data.append('photo', logo);
  }

  if(update){
    data.append('req', "update");
  }else{
    data.append('req', "add");
  }

  data.append('data', JSON.stringify(school));
  data.append('id', aId);

  jQuery.ajax({
    url: 'api/account.php',
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    method: 'POST',
    type: 'POST', 
    success: function(data){
      alert(data);
      var res = JSON.parse(data);
      if(res.success=="1"){
        $('#imgLogo').attr('src', "assets/img/school-circle.png");
        logo = null;
        document.getElementById("formSchool").reset();
        loadSchoolList();
        modalSchool.style.display = "none";
      }else{
        alert(res.message);
      }
       
    }

  });


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









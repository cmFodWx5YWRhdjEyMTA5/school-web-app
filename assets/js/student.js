
let modalStudent;

let btnAddStudent;

let spanStudent;

let btnSelectClass;

var listStudent; 
var studnetId;
var editStudent;
var selectionStudent;
var selectedClassName = "";
var selectedClassId;

function initStudent(){

  modalStudent  = document.getElementById("mStudent");
  btnAddStudent = document.getElementById("btnAddStudent");
  spanStudent   = document.getElementsByClassName("close")[0];
  btnSelectClass= document.getElementById("btnSelectClass");

  loadClassListForStudent();
  loadStudentList();

  btnAddStudent.onclick = function() {
    document.getElementById("formStudent").reset();

    editStudent = false;
    loadClassListToAddStudent();
    modalStudent.style.display = "block";
  }
 
  spanStudent.onclick = function() {
    modalStudent.style.display = "none";
  }
  
  $('#formStudent').submit(function (e) {

    e.preventDefault();
    saveStudent();
  });
 
  $("#fStudentPhoto").change(function() {
    getStudentPhoto(this);
  });

}

function getStudentPhoto(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#imgStudent').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}


function getStudents(callback) {   
  let xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', "assets/data/students.json", true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

function getClasses(callback){
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', "assets/data/classes.json", true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
    };
    xobj.send(null);  
}

function loadClassListForStudent() {
    getClasses(function(response) {
    let classes = JSON.parse(response);
    console.log(classes);
 
    let x = "";

    console.log("count > "+classes.length);
    for(i in classes){
      let mClass = classes[i];
    
      x+= '<h6 class="dropdown-item" role="presentation" onClick="showStudentByClass('+mClass.id+",\'" + mClass.name + '\')" >'+mClass.name+"</h6>";
    }

    document.getElementById("menuClassList").innerHTML = x;

  });
}

function loadClassListToAddStudent() {
    getClasses(function(response) {
    let classes = JSON.parse(response);
    console.log(classes);

    let x = "";

    console.log("count > "+classes.length);
    for(i in classes){
      let mClass = classes[i];
    
      x+= '<h6 class="dropdown-item" role="presentation" onClick="selectClassToRegister('+mClass.id+",\'" + mClass.name + '\')" >'+mClass.name+"</h6>";
    }
    document.getElementById("modalStudentClassList").innerHTML = x;

  });
}


function showStudentByClass(id,name){
  console.log(id+" name > "+name);
  let x = "<h4>"+name+"</h4>";
  document.getElementById("selectedClass").innerHTML = x;
}


function loadStudentList() {
    getStudents(function(response) {
    listStudent = JSON.parse(response);
    console.log(listStudent);
    showStudentList(listStudent);
  });
}



function showStudentList(listStudent){
  let x = "";

  console.log("count > "+listStudent.length);
  for(i in listStudent){
    let student = listStudent[i];
    var stId = "st_tr_"+i;

    console.log("class > "+stId+"");

    x+=  "<tr id= "+stId+" >"+
          "<td><img class='rounded-circle' src='assets/img/girl.png' style='width: 64px;'></td>"+
          "<td>"+student.first_name+" "+student.last_name+"</td>"+
          "<td>"+student.class_name+"</td>"+
          "<td class='text-center'><button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editStudentInfo("+i+")'>Edit</button></td>"+
          "<td></td>"+
        "</tr>";
   }

   document.getElementById("studentList").innerHTML = x;
}
  
function saveStudent() {
  
  
  let inFirstName   = document.getElementById("fFirstName");
  let inLastName    = document.getElementById("fLastName");
  let inRollNumber  = document.getElementById("fRollNumber");
 
  if(selectedClassName == ""){
    alert("Please select Class!");
    return false;
  }

  var x = "";

      if(editStudent){
        var student = {
          "id":studnetId,
          "first_name":inFirstName.value,
          "last_name":inLastName.value,
          "class_name":selectedClassName,
          "class_id":selectedClassId,
          "account_id":inRollNumber.value,
          "photo":"student.png",
          "created_at":"2019/07/24 10:00:00",
          "updated_at":"2019/07/24 10:00:00",
          "status":1
        }

        listStudent[selectionStudent] = student;
        
        x =  "<tr id= st_tr_"+selectionStudent+" >"+
                "<td><img class='rounded-circle' src='assets/img/girl.png' style='width: 64px;'></td>"+
                "<td>"+student.first_name+" "+student.last_name+"</td>"+
                "<td>"+student.class_name+"</td>"+
                "<td class='text-center'><button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editStudentInfo("+selectionStudent+")'>Edit</button></td>"+
                "<td></td>"+
              "</tr>";

          document.getElementById("st_tr_"+selectionStudent).innerHTML = x;

          console.log(x);

      }else{
        var student = {
          "id":listStudent.length,
          "first_name":inFirstName.value,
          "last_name":inLastName.value,
          "class_name":"Nursery",
          "account_id":inRollNumber.value,
          "photo":"student.png",
          "created_at":"2019/07/24 10:00:00",
          "updated_at":"2019/07/24 10:00:00",
          "status":1
        }

        console.log("before add > "+listStudent.length);
        listStudent[listStudent.length] = student;
        console.log("after add > "+listStudent.length);
        var index = listStudent.length-1;
 
        x =  "<tr id= st_tr_"+index+" >"+
              "<td><img class='rounded-circle' src='assets/img/girl.png' style='width: 64px;'></td>"+
              "<td>"+student.first_name+" "+student.last_name+"</td>"+
              "<td>"+student.class_name+"</td>"+
              "<td class='text-center'><button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editStudentInfo("+index+")'>Edit</button></td>"+
              "<td></td>"+
            "</tr>";

        $(x).appendTo("#studentTable tbody");

        console.log(x);
      }
      modalStudent.style.display = "none";
}
 





function selectClassToRegister(id,name){
  console.log(id+" name > "+name);
  //let x = "<h4>"+name+"</h4>";
  
  selectedClassName = name;
  selectedClassId = id;

  document.getElementById("classToRegister").innerHTML = name;
}


function editStudentInfo(position){
  document.getElementById("formStudent").reset();

  loadClassListToAddStudent();

  console.log(position+" count > "+listStudent.length);

  let student = listStudent[position];

  var stId = "st_tr_"+student.id+"";    
  console.log("edit > "+stId);

  let inFirstName   = document.getElementById("fFirstName");
  let inLastName    = document.getElementById("fLastName");
  let inRollNumber  = document.getElementById("fRollNumber");

  inFirstName.value = student.first_name;
  inLastName.value  = student.last_name;
  inRollNumber.value= student.account_id;

  editStudent = true;
  selectionStudent = position;

  studnetId = student.id;
  
  modalStudent.style.display = "block";

}







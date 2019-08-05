
let modalClass;
let btnAddClass;
let spanClass;

var listClass; 
var classId;
var editClass;
var selectionClass;

function initClass(){

  modalClass  = document.getElementById("mClass");
  btnAddClass = document.getElementById("btnAddClass");
  spanClass = document.getElementsByClassName("close")[0];



  btnAddClass.onclick = function() {
    document.getElementById("formClass").reset();

    editClass = false;

    modalClass.style.display = "block";
    }  
 
    spanClass.onclick = function() {
    modalClass.style.display = "none";
    }
    loadClassList();

      
  $('#formClass').submit(function (e) {

    e.preventDefault();
    saveClass();
  });

}


function getClassList(callback) {   
  let xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', "http://localhost:8080/classrooms", true);
      xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
  };
  xobj.send(null);  
}

function loadClassList() {
    getClassList(function(response) {
    listClass = JSON.parse(response);
    console.log(listClass);
    showClassList(listClass);
  });
}

function showClassList(listClass){
  let x = "";

  console.log("count > "+listClass.length);
  for(i in listClass){
    let mClass = listClass[i];
    var clId = "cl_tr_"+i;

    
    console.log("class > "+clId+"");
    
    x+= "<tr id= "+clId+" >"+
      "<td>"+mClass.name+"</td>"+
      "<td>"+mClass.teacherName+"</td>"+
      "<td>"+mClass.no_of_students+"</td>"+
      "<td class='text-center'>"+
        "<button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editClassDetails("+i+")'>Edit</button>"+
      "</td>"+
      "</tr>";

   }
   document.getElementById("classList").innerHTML = x;
}
  
function saveClass() {
 
  let inClassName   = document.getElementById("fClassName");
  let inTeacher     = document.getElementById("fTeacherName");

      if(editClass){
        console.log("edit her here here");
        var mClass = {
          "id":classId,
          "name":inClassName.value,
          "teacherName":inTeacher.value,
          "account_id": 123,
          "created_at":"2019/07/24 10:00:00",
          "updated_at":"2019/07/24 10:00:00",
          "no_of_students":100,
          "status":1
        }

        $.ajax({
           url: "http://localhost:8080/students",
           type: "POST",
           contentType: "application/json",
           data: JSON.stringify(mClass),
           success: function(response) {
              listClass[selectionClass] = mClass;
              var x = "<tr id= cl_tr_"+selectionClass+" >"+
                  "<td>"+mClass.name+"</td>"+
                  "<td>"+mClass.teacherName+"</td>"+
                  "<td>"+mClass.no_of_students+"</td>"+
                  "<td class='text-center'>"+
                  "<button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editClassDetails("+selectionClass+")'>Edit</button>"+
                  "</td>"+
                  "</tr>";
              document.getElementById("cl_tr_"+selectionClass).innerHTML = x;
           },
           error: function(response) {
              console.log("===> edit classroom error dipslay error messaage " + JSON.stringify(response));
           }
        });

      }else{
        var mClass = {
          "id":listClass.length,
          "name":inClassName.value,
          "teacher_name":inTeacher.value,
          "account_id": 123,
          "created_at":"2019/07/24 10:00:00",
          "updated_at":"2019/07/24 10:00:00",
          "no_of_students":100,
          "status":1
        }

        console.log("before add > "+listClass.length);
        listClass[listClass.length] = mClass;
        console.log("after add > "+listClass.length);
        var index = listClass.length-1;
 
        var x = "<tr id= cl_tr_"+index+" >"+
        "<td>"+mClass.name+"</td>"+
        "<td>"+mClass.teacher_name+"</td>"+
        "<td>"+mClass.no_of_students+"</td>"+
        "<td class='text-center'>"+
          "<button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editClassDetails("+index+")'>Edit</button>"+
        "</td>"+
        "</tr>";

        $(x).appendTo("#classTable tbody");

        console.log(x);
      }
      modalClass.style.display = "none";
}
 


function editClassDetails(position){
  document.getElementById("formClass").reset();

  console.log(position+" count > "+listClass.length);

  let mClass = listClass[position];

  var clId = "cl_tr_"+mClass.id+"";    
  console.log("edit > "+clId);

  let inClassName   = document.getElementById("fClassName");
  let inTeacher     = document.getElementById("fTeacherName");

  inClassName.value = mClass.name;
  inTeacher.value   = mClass.teacherName;

  editClass = true;
  selectionClass = position;

  classId = mClass.id;
  
  modalClass.style.display = "block";

}







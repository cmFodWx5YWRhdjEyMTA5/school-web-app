
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



function loadClassList() {
  getClassList(function(response) {
    var res = JSON.parse(response);
    console.log(res);
    if(res.success==1){
      listClass = res.data;
      showClassList(listClass);
    }else{
      alert(res.message);
    }
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
      "<td>"+mClass.class_id+"</td>"+
      "<td>"+mClass.teacher_name+"</td>"+
      "<td>"+mClass.class_name+"</td>"+
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
        var robot = {
          "class_id":classId,
          "class_name":inClassName.value,
          "teacher_name": inTeacher.value
        };
      
        
      
        $.post("api/class.php",
        {
          id: aId,
          req: "update",
          data: JSON.stringify(robot)
        },
      
        function(data, status){
          
          console.log("Data: " + data + "\nStatus: " + status);
          if (status == "success") {
            var res = JSON.parse(data);
            if(res.success=="1"){
              loadClassList();
              modalClass.style.display = "none";
            }else{
              alert(res.message);
            }
          }else{
            var res = JSON.parse(data);
            alert(res.message);
          }
      
        });

      }else{
        var robot = {
          "class_name":inClassName.value,
          "teacher_name": inTeacher.value
        };
      
        
      
        $.post("api/class.php",
        {
          id: aId,
          req: "add",
          data: JSON.stringify(robot)
        },
      
        function(data, status){
          
          console.log("Data: " + data + "\nStatus: " + status);
          if (status == "success") {
            var res = JSON.parse(data);
            if(res.success=="1"){
              loadClassList();
              modalClass.style.display = "none";
            }else{
              alert(res.message);
            }
          }else{
            var res = JSON.parse(data);
            alert(res.message);
          }
      
        });
      }
    
}
 


function editClassDetails(position){
  document.getElementById("formClass").reset();

  console.log(position+" count > "+listClass.length);

  let mClass = listClass[position];

  var clId = "cl_tr_"+mClass.class_id+"";    
  console.log("edit > "+clId);

  let inClassName   = document.getElementById("fClassName");
  let inTeacher     = document.getElementById("fTeacherName");

  inClassName.value = mClass.class_name;
  inTeacher.value   = mClass.teacher_name;

  editClass = true;
  selectionClass = position;

  classId = mClass.class_id;
  
  modalClass.style.display = "block";

}







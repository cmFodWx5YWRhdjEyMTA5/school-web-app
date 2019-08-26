
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
var classsIdForList = "";
var classNameForList = "";
var photo = null;
var gender="none";

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

  $("#rbMale") 
    .change(function(){ 
        if( $(this).is(":checked") ){ 
          gender= "Male";
          $("#rbFemale").prop("checked", false);
        }
    });

    $("#rbFemale") 
    .change(function(){ 
        if( $(this).is(":checked") ){ 
          gender= "Female";
          $("#rbMale").prop("checked", false);
        }
    });


}

function getStudentPhoto(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#imgStudent').attr('src', e.target.result).width('50%').height('auto');
      fixExifOrientation($('#imgStudent'));
    }
    
    photo = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
}


function getStudents(callback) {   

  if(classsIdForList!=""){
    $.post("api/student.php",
    {
      id: aId,
      req: "list",
      class_id: classsIdForList
    },
    function(data, status){
      
      onStudentListResponse(data,status,callback);
  
    });
  }else{
    $.post("api/student.php",
    {
      id: aId,
      req: "list"
    },
    function(data, status){
      onStudentListResponse(data,status,callback);
    });
  }
 
}

function onStudentListResponse(data,status,callback){
  console.log("Data: " + data + "\nStatus: " + status);
  if (status == "success") {
     callback(data);
  }else{
    var res = JSON.parse(data);
    alert(res.message);
  }
}



function loadClassListForStudent() {
  getClassList(function(response) {
  let res = JSON.parse(response);
  if(res.success==1){
    var listClass = res.data;
    let x = "";
    let y = "";

    console.log("count class > "+listClass.length);
    for(i in listClass){
      let mClass = listClass[i];
    
      x+= '<h6 class="dropdown-item" role="presentation" onClick="showStudentByClass('+mClass.class_id+",\'" + mClass.class_name + '\')" >'+mClass.class_name+"</h6>";
      y+= '<h6 class="dropdown-item" role="presentation" onClick="selectClassToRegister('+mClass.class_id+",\'" + mClass.class_name + '\')" >'+mClass.class_name+"</h6>";

    }

    document.getElementById("menuClassList").innerHTML = x;
    document.getElementById("modalStudentClassList").innerHTML = y;

  }else{
    alert(res.message);
  }

 
});
}


function showStudentByClass(id,name){
  console.log(id+" name > "+name);
  let x = "<h4>"+name+"</h4>";
  classsIdForList = id;
  document.getElementById("selectedClass").innerHTML = x;
  classNameForList = name;
  loadStudentList();
}


function loadStudentList() {
  getStudents(function(response) {
    var res = JSON.parse(response);
    console.log(res);
    if(res.success==1){
      listStudent = res.data;
      showStudentList(listStudent);
    }else{
      var msg;
      if(classNameForList == ""){
        msg = "No Students found ";
      }else{
        msg = "No Students found for "+classNameForList + " class";
      }
      document.getElementById("studentList").innerHTML = "";  
      alert(msg);

    }
  });
}



function showStudentList(listStudent){
  let x = "";

  console.log("count > "+listStudent.length);
  for(i in listStudent){
    let student = listStudent[i];
    var stId = "st_tr_"+i;

    console.log("class > "+stId+"");


    var img;
    if(student.photo!=null){
      img = "data/images/students/"+student.photo;
    }else{
      if(student.gender == "Male"){
        img = "assets/img/boy.png";
      }else if(student.gender == "Female"){
        img = "assets/img/girl.png";
      }else{
        img = "assets/img/user-2.png";
      }
    }

    //class='rounded-circle'
    x+=  "<tr id= "+stId+" >"+
          "<td><img  src='"+img+"' style='width: 64px;'></td>"+
          "<td>"+student.first_name+" "+student.last_name+"</td>"+
          "<td>"+student.roll_no+"</td>"+
          "<td>"+student.class_name+"</td>"+
          "<td class='text-center'><button class='btn btn-primary' style='background-color: rgb(45,200,32);' onclick='editStudentInfo("+i+")'>Edit</button></td>"+
          "<td></td>"+
        "</tr>";
   }

   document.getElementById("studentList").innerHTML = x;
}
  
function saveStudent() {
  
  if(gender==""){
    alert("please select gender");
    return;
  }

  

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
          "student_id":studnetId,
          "first_name":inFirstName.value,
          "last_name":inLastName.value,
          "class_id":selectedClassId,
          "roll_no":inRollNumber.value,
          "gender":gender
        }

        queryStudent(student,true);
      }else{
        if(photo==null){
          alert("please select photo");
          return;
        }

        var student = {
          "first_name":inFirstName.value,
          "last_name":inLastName.value,
          "class_id":selectedClassId,
          "roll_no":inRollNumber.value,
          "gender":gender
        }

        queryStudent(student,false);

      }
     
}
 
function queryStudent(student,update){
  console.log(">>>>>>>>>>>>>>>>>");
  
  var data = new FormData();
  if(photo!=null){
    data.append('photo', photo);
  }

  if(update){
    data.append('req', "update");
  }else{
    data.append('req', "add");
  }

  data.append('data', JSON.stringify(student));
  data.append('id', aId);

  jQuery.ajax({
    url: 'api/student.php',
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    method: 'POST',
    type: 'POST', 
    success: function(data){
      var res = JSON.parse(data);
      if(res.success=="1"){
        $('#imgStudent').attr('src', "assets/img/user-2.png");
        photo = null;
        gender = "";
        document.getElementById("formStudent").reset();
        loadStudentList();
        modalStudent.style.display = "none";
      }else{
        alert(res.message);
      }
       
    }

  });


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

  console.log(position+" count > "+listStudent.length);

  let student = listStudent[position];

  selectedClassName = student.class_name;
  selectedClassId = student.class_id;

  document.getElementById("classToRegister").innerHTML = selectedClassName;

  gender = student.gender;

  if(gender == "Male"){
    $("#rbMale").prop("checked", true);
    
  }else if(gender=="Female"){
    $("#rbFemale").prop("checked", true);
  }else{
    gender = "";
  }

  var img;
    if(student.photo!=null){
      img = "data/images/students/"+student.photo;
    }else{
      if(student.gender == "Male"){
        img = "assets/img/boy.png";
      }else if(student.gender == "Female"){
        img = "assets/img/girl.png";
      }else{
        img = "assets/img/user-2.png";
      }
    }
    $('#imgStudent').attr('src', img);

  var stId = "st_tr_"+student.student_id+"";    
  console.log("edit > "+stId);

  let inFirstName   = document.getElementById("fFirstName");
  let inLastName    = document.getElementById("fLastName");
  let inRollNumber  = document.getElementById("fRollNumber");

  inFirstName.value = student.first_name;
  inLastName.value  = student.last_name;
  inRollNumber.value= student.roll_no;

  editStudent = true;
  selectionStudent = position;

  studnetId = student.student_id;
  
  modalStudent.style.display = "block";

}








var listHealth; 
var selectedDate = "";
var classId = "";
var className = "";
var date = "";

function initHealth(){

  $('#mDatePicker').datepicker({ dateFormat: 'yy-mm-dd',  maxDate: 0});
  $("#mDatePicker").datepicker().datepicker("setDate", new Date());

  loadHealthRecords(); 
  loadClassListForHealth();

 

 
  $("#mDatePicker").on("change",function(){  
    selectedDate = $(this).val();  
    console.log("date > "+selectedDate);
    date = selectedDate;
    loadHealthRecords();
  }); 
}


function getTemeratureRecords(classId,date,callback) {   

  if(classId != "" && date != ""){
    $.post("api/temperature.php",
    {
      id: aId,
      req: "list",
      class_id: classId,
      date: date
    },
    function(data, status){
      
      onTemperatureRecordLoad(data,status,callback);

  
    });
  }else if(classId != ""){
    $.post("api/temperature.php",
    {
      id: aId,
      req: "list",
      class_id: classId
    },
    function(data, status){
      
      onTemperatureRecordLoad(data,status,callback);

  
    });
  }else if(date != ""){
    $.post("api/temperature.php",
    {
      id: aId,
      req: "list",
      date: date
    },
    function(data, status){
      
      onTemperatureRecordLoad(data,status,callback);

  
    });
  }else {
    $.post("api/temperature.php",
    {
      id: aId,
      req: "list"
    },
    function(data, status){
      
      onTemperatureRecordLoad(data,status,callback);
  
    });
  }

}

function onTemperatureRecordLoad(data,status,callback){
  if (status == "success") {
     callback(data);
  }else{
    var res = JSON.parse(data);
    alert(res.message);
  }
}

function loadHealthRecords() {
  getTemeratureRecords(classId,date,function(response) {
    var res = JSON.parse(response);
    console.log(res);
    if(res.success==1){
      listHealth = res.data;
      showList(listHealth);
    }else{
      var msg;
      if(className == ""){
        msg = "No Temperature records found on "+date
      }else{
        msg = "No Temperature records found for "+className+" class on "+date
      }
      document.getElementById("heathRecords").innerHTML = "";
      alert(msg);
    }
  });
}

function showList(listHealth){
  let x = "";

  console.log("count > "+listHealth.length);

  for(i in listHealth){
    let health = listHealth[i];
    
    var img;
    if(health.photo!=null){
      img = "data/images/students/"+health.photo;
    }else{
      if(health.gender == "Male"){
        img = "assets/img/boy.png";
      }else if(health.gender == "Female"){
        img = "assets/img/girl.png";
      }else{
        img = "assets/img/user-2.png";
      }
    }

    x+= " <tr>"+
            "<td><img  src='"+img+"' style='width: 64px;'></td>"+
            "<td>"+health.first_name+" "+health.last_name+"</td>"+
            "<td>"+health.class_name+"</td>"+
            "<td>"+health.temperature+"</td>"+
            "<td>"+health.date+"</td>"+
          "</tr>"

   }

   document.getElementById("countNormal").innerHTML = "0";
   document.getElementById("countFever").innerHTML = "0";
   document.getElementById("countHyperthermia").innerHTML = "0";
   document.getElementById("countHypothermia").innerHTML = "0";
   
   document.getElementById("heathRecords").innerHTML = x;
   
}
  


function loadClassListForHealth() {
  getClassList(function(response) {
  let res = JSON.parse(response);
  if(res.success==1){
    var listClass = res.data;
    let x = "";

    console.log("count class > "+listClass.length);
    for(i in listClass){
      let mClass = listClass[i];
    
      x+= '<h6 class="dropdown-item" role="presentation" onClick="showRecordsByClass('+mClass.class_id+",\'" + mClass.class_name + '\')" >'+mClass.class_name+"</h6>";
    }

    document.getElementById("menuClassList").innerHTML = x;

  }else{
    alert(res.message);
  }

 
});
}

function showRecordsByClass(id,name){
  console.log(id+" name > "+name);
  let x = "<h4>"+name+"</h4>";
  document.getElementById("selectedClass").innerHTML = x;
  classId = id;
  className = name;
  loadHealthRecords();
}



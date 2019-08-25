let modalRobot;
let btnAddRobot;
let rClose;
var listRobots; 


function initRobot(){

  modalRobot  = document.getElementById("mRobot");
  btnAddRobot = document.getElementById("btnAddRobot");
  rClose = document.getElementsByClassName("close")[0];


  btnAddRobot.onclick = function() {
    document.getElementById("formRobot").reset();

    editClass = false;

    modalRobot.style.display = "block";
    }  
 
    rClose.onclick = function() {
      modalRobot.style.display = "none";
    }
    loadRobotList();

      
  $('#formRobot').submit(function (e) {

    e.preventDefault();
    saveRobot();
  });

}


function getRobotList(callback) {   

  $.post("api/robot.php",
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

function loadRobotList() {
    getRobotList(function(response) {
    var res = JSON.parse(response);
    console.log(res);
    if(res.success==1){
      listRobots = res.data;
      showRobotList(listRobots);
    }
  });
}

function showRobotList(listRobots){
  let x = "";

  console.log("count > "+listRobots.length);
  for(i in listRobots){
    let mRobot = listRobots[i];
    var rbId = "rb_tr_"+i;

    
    console.log("class > "+rbId+"");
    
    x+= "<tr id= "+rbId+" >"+
      "<td>"+mRobot.sr_no+"</td>"+
      "<td>"+mRobot.type+"</td>"+
      "</tr>";

   }
   document.getElementById("robotList").innerHTML = x;
}
  
function saveRobot() {
 
  let inName   = document.getElementById("fRoboName");
  let inSrNo     = document.getElementById("fSrNo");

  var robot = {
    "sr_no":inSrNo.value,
    "type": inName.value
  };

  

  $.post("api/robot.php",
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
        loadRobotList();
        modalRobot.style.display = "none";
      }else{
        alert(res.message);
      }
    }else{
      var res = JSON.parse(data);
      alert(res.message);
    }

  });
            
}
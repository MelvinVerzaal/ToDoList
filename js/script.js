function addTask(){

   let Newtask = document.getElementById("Newtask").value;
    if(Newtask!=''){
        document.getElementById('Newtask').value = "";   
        try{
                processDataChange({ description:  Newtask, done: false}, 'post')
                .then((data) => {
                        document.getElementById('resultDiv').innerHTML = "";
                        setTimeout(function(){someAPICallToGetAllTasks() },200)
                })
        }
        catch(error){alert(errorNotification+' '+error);}
    }
}




function openEditTask(){
    let description = document.getElementById(this.id).innerHTML;
    let id = this.id.substring(5);
    //ik heb er voor gekozen om onderstaande in delen te doen zodat mijn regels niet te lang worden
    document.getElementById('div_'+id).innerHTML = "";
    document.getElementById('div_'+id).innerHTML += "<input type='checkbox' id='"+id+"'/>";
    document.getElementById('div_'+id).innerHTML += "<input type='text' id='edit_"+id+"' value='"+description+"' />";
    document.getElementById('div_'+id).innerHTML += "<img id='"+id+"' src='"+deleteImg+"'/>";

    document.getElementById('edit_'+id).addEventListener('blur', (event) => {editTask(document.getElementById("edit_"+id).value, id)}, false);
}




function editTask(description, id){
    try{
        /*
            set done op FALSE omdat als je een taak bewerkt,
            het inpresipe weer een andere taak wordt en daardoor hem dus standaard nog niet heb afgerond
        */
        processDataChange({description: description, done: false}, 'PUT', id )
        .then((data) => {
            document.getElementById('resultDiv').innerHTML = "";
            setTimeout(function(){someAPICallToGetAllTasks() },50)
    })
    }
    catch(error){alert(errorNotification+' '+error);}
}




function deleteTask(){
    
    try{     
        processDataChange({}, 'delete', this.id)
        .then((data) => {
            document.getElementById('resultDiv').innerHTML = "";
            setTimeout(function(){someAPICallToGetAllTasks() },50)
    })
    }
     catch(error){alert(errorNotification+' '+error);}
}




function compleetTask(){
    document.getElementById("text_"+this.id+"").style = "text-decoration:line-through;";
    description = document.getElementById('text_'+this.id).innerHTML;
    try{
        processDataChange({description: description, done: true }, 'PUT', this.id)
    }
    catch(error){alert(errorNotification+' '+error);}
}


function logKey(e) {
    /*
         is makkelijker in voeren als je na dat je de text heb ingevuld
          gewoon op enter kan druken omdat je toch al op je toetsenbord bezig bent
    */
    if(`${e.code}` == 'Enter' || `${e.code}` == 'NumpadEnter'){addTask();}

}


//set basics if page loaded
setTimeout(function(){  
let button = document.getElementsByTagName("button");
    for (let index = 0; index < button.length; index++) {
            button[index].addEventListener('click', addTask);
    }
},1000);
someAPICallToGetAllTasks();
document.addEventListener('keypress', logKey);
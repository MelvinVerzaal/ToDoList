//basics shit
const errorNotification = 'Helaas is er iets fout gegaan error:';
const noDataNotication = "<p id='noData'>Er zijn geen todo's meer, Geniet lekker van de rust, ga even wandelen of game of wat anders leuks. Kom tot rust zo dat je er straks volop tegen aan kunt</p>"
const deleteImg = 'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F41f9c901-ac90-4877-973e-13f48eb1b3b7%2Ftrash-delete-icon.jpg?table=block&id=27147a95-cf24-497d-b956-a389247de185&width=290&cache=v2';
const url = "https://wincacademydatabase.firebaseio.com/melvin.json";



function someAPICallToGetAllTasks(){
    try{
            fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let result = data
                console.log(data)
                if(data == null){document.getElementById('resultDiv').innerHTML = noDataNotication;}else{
                
                let tasks = Object.keys(result).map(key => ({
                    id: key,
                    description: result[key].description,
                    done: result[key].done
            }));
            
                for (let index = 0; index < tasks.length; index++) {
                    let id = tasks[index].id.substring(1);
                    //ik heb er voor gekozen om onderstaande in delen te doen zodat mijn regels niet te lang worden
                    document.getElementById('resultDiv').innerHTML += "<div id='div_"+id+"'></div>";
                    document.getElementById('div_'+id).innerHTML += "<input type='checkbox' id='"+id+"'/>";
                    document.getElementById('div_'+id).innerHTML += "<p id='text_"+id+"' >"+tasks[index].description+"</p>";
                    document.getElementById('div_'+id).innerHTML += "<img id='"+id+"' src='"+deleteImg+"'/>";
               if(tasks[index].done){
                    document.getElementById("text_"+id+"").style = "text-decoration:line-through;";
               }
                }
            }})  

            setTimeout(function(){  
                let inputs = document.getElementsByTagName("input");
                for (let index = 0; index < inputs.length; index++) {
                    if(inputs[index].type == 'checkbox'){
                        inputs[index].addEventListener('click', compleetTask);
                    }
                }
                let deletebox = document.getElementsByTagName("img");
                for (let index = 0; index < deletebox.length; index++) {
                        deletebox[index].addEventListener('click', deleteTask);
                }
             
            
                let text = document.getElementsByTagName("p");
                for (let index = 0; index < text.length; index++) {
                    text[index].addEventListener('click', openEditTask);
                }
            }, 1000);

        }catch(error){alert(errorNotification+' '+error);}
}
    
async function processDataChange(data = {}, type, id) {
    if(type == 'PUT' || type == 'delete'){
        callurl = 'https://wincacademydatabase.firebaseio.com/melvin/-'+id+'.json';
    }else{
        callurl = url;
    }         
   try{ 
        const response = await fetch(callurl, {
          method: type, 
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) 
        });
        return await response.json(); 
      }catch(error){alert(errorNotification+' '+error);}
}
      
     
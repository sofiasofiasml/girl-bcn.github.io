 // Import the functions you need from the SDKs you need
//  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
//  import { getDatabase, ref,get,set,child,update,remove } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";
//  // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional

 
 const firebaseConfig = {
   apiKey: "AIzaSyAQC3c8Uc8z-AI89EdScSyYy6rNZzyXYgs",
   authDomain: "girls-bcn.firebaseapp.com",
   databaseURL: "https://girls-bcn-default-rtdb.firebaseio.com",
   projectId: "girls-bcn",
   storageBucket: "girls-bcn.appspot.com",
   messagingSenderId: "808643930279",
   appId: "1:808643930279:web:9f26e58feba79d8be59382",
   measurementId: "G-LCZJWF9KD1"
 };
 

 // Initialize Firebase
 const app = firebase.initializeApp(firebaseConfig);
 var database = firebase.database();
 var storage = firebase.storage();
function insertData(data, name){
    
    var ref = database.ref(name); 
    var result = ref.push(data); 
}

 function seeData(name){
     var ref = database.ref(name); 
     ref.on('value', gotData,errData); 
 }
// Añadir asistentes en db
 function writeNewPost(id, campo, value) {

    for(var i=0; i< CORE.DicEvents.length; i++){
        if(CORE.DicEvents[i].id == id)
        var k = CORE.DicEvents[i].key; 
        CORE.DicEvents[i].asistentes.push(value); 
    }
    var db = firebase.database();

    db.ref("Eventos/"+k+"/"+campo).push(value);
        
}

function delatenodeDBforTime() 
{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    for(var i=0; i< CORE.DicEvents.length; i++){
        var dateOrdnear = CORE.DicEvents[i].date; 
        var indexBar = dateOrdnear.indexOf('-'); 
        var year = dateOrdnear.substring(0, indexBar);
        dateOrdnear = dateOrdnear.replace(dateOrdnear.substring(0,indexBar+1),'');
        var indexBar = dateOrdnear.indexOf('-'); 
        var mes = dateOrdnear.substring(0, indexBar);
        var dia = dateOrdnear.substring(indexBar+1, dateOrdnear.length);
        dateOrdnear = mes+'/'+dia+'/'+year; 
        //cuando ya ha pasado el día se borra el evento
        if(Date.parse(today)>Date.parse(dateOrdnear))
        {
            var k = CORE.DicEvents[i].key; 
            var db = firebase.database();

            db.ref("Eventos/"+k).remove();

        }
    }        
}

function delateasistentEvenDB(event)
{
    var index = event.id.indexOf("-");  
    var id = event.id.substring(0,index); 
    var pos = event.id.substring(index+1, event.id.length); 

   
    for(var i=0; i< CORE.DicEvents.length; i++){
        if(CORE.DicEvents[i].id == id)
        {
            var k = CORE.DicEvents[i].key; 
            var key = CORE.DicEvents[i].asistenteskey[pos]; 
            var db = firebase.database();
            db.ref("Eventos/"+k +"/asistentes/"+key).remove();
            var value = document.querySelector(".li"+event.id); 
            value.style.display = "none"; 

            var asi = document.querySelector(".ContadorAsistentes"+id); 
            var posvalue = asi.textContent.indexOf(": "); 

            var value = asi.textContent.substring(posvalue+2,asi.textContent.length); 

            var intvalue = parseInt(value); 
            intvalue -=1; 
            asi.textContent = 'Asistentes: '+intvalue; 

        }
    }        
    
}

function delateEvenDB(event){
    var id = event.name; 
    //var idElement = "Evento"+id; 

    for(var i=0; i< CORE.DicEvents.length; i++){
        if(CORE.DicEvents[i].id == id)
        {
            var k = CORE.DicEvents[i].key; 
           
            var db = firebase.database();
            db.ref("Eventos/"+k ).remove();
           
        }
    }        
}
// Añadir votacion db
function writeNewDatavotation(id, campo, value) {

    for(var i=0; i< CORE.Votation.length; i++){
        if(CORE.Votation[i].id == id)
        var k = CORE.Votation[i].key; 
        //CORE.Votation[i].asistentes.push(value); 
    }
    var db = firebase.database();

    db.ref("Votation/"+k+"/"+campo).set(value);
        
}


function gotData(data)
{
    var scores = data.val(); 
    if(scores && data.key =="Eventos"){
        var keys = Object.keys(scores); 
        //console.log(keys); 
        if(CORE.initDB){ // añadir evento del db
            for (var i =0; i<keys.length; i++)
            {
                var k = keys[i]; 
                var title =  scores[k].title; 
                var id =  scores[k].id; 
                var key =  k; 
                var date =  scores[k].date; 
                var hour =  scores[k].hour; 
                var image =  scores[k].image; 
                var votation =  scores[k].votation; 
                var content =  scores[k].content;
                var asistentes  = [];  
                var asistenteskey = []; 
                if(scores[k].asistentes){
                    asistentes = Object.values(scores[k].asistentes); 
                    
                    asistenteskey= Object.keys(scores[k].asistentes); 
                   
                }
                GFX.createDivEventosDB(title, id, date, hour, image, votation, content, asistentes, key, asistenteskey); 
            }
            LOGIC.ordenarEventDate(); 
            CORE.initDB = false; 
        }
       
    }
    if(scores && data.key== "Votation")
    {
        var keys = Object.keys(scores); 
        if(CORE.initDBVot){ // Solo se carga una vez toda la db 
            for (var i =0; i<keys.length; i++)
            {
                var k = keys[i]; 
                var key =  k; 
                var name =  scores[k].name; 
                var id =  scores[k].id; 
                var link =  scores[k].link; 
                var resp =  scores[k].resp; 
                CORE.Votation[CORE.Votation.length] = new Votation(id,name, key, link, resp); 
                GFX.addlistnav(); 

            }
            CORE.initDBVot = false; 
        }
        
    }
}
 function errData(err)
 {
     console.log('Error! '+ err); 
 }

 function UploadImage()
 {
    var imagenUpload = document.querySelector("#imagenUpload").files[0];
    LOGIC.saveImageUpload(imagenUpload); 

    // Upload the file
    var uploadTask = storage.ref().child('fotos/'+imagenUpload.name).put(imagenUpload);
   
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
    (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
    },
    (error) => {
        // Handle unsuccessful uploads
        alert("No se ha subido bien la imagen"); 
    },
    () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            LOGIC.saveImageUpload(downloadURL); 
            console.log('File available at', downloadURL);
        });
    }
    );
 }
 
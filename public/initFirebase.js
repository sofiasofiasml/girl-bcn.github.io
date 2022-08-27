 // Import the functions you need from the SDKs you need
//  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
//  import { getDatabase, ref,get,set,child,update,remove } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";
//  // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//  let prueba = 'https://nominatim.openstreetmap.org/reverse?lat=41.63125237270472&lon=-4.742565007934635&format=json';


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
 var auth = firebase.auth(); 
 var storage = firebase.storage();
 var storageRef = storage.ref();
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
//Delate Event
function delatenodeDBforTime() 
{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    for(var i=0; i< CORE.DicEvents.length; i++){
        var dateOrdnear = CORE.DicEvents[i].dateFin; 
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
            // if(CORE.DicEvents[i].categoria =="SubirImagen")
            // {
            //     var imgRef = storageRef.child(CORE.DicEvents[i].image); 
            //     imgRef.delete().then(() => {
            //         console.log("Borrado ok Image"); 
            //       }).catch((error) => {
            //         console.log("No borrada image"); 
            //       });
            // }
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

function editEvenDB( title, image, content,date, dateFin, hour, categoria){
    var id = CORE.idEdit;  
    
    for(var i=0; i< CORE.DicEvents.length; i++){
        if(CORE.DicEvents[i].id == id)
        {
            var k = CORE.DicEvents[i].key; 
           
            var db = firebase.database();
            const updates = {};
            updates[ `/id`] =  CORE.DicEvents[i].id;
            updates[ `/key`] =  CORE.DicEvents[i].key;
            updates[ `title`] =  title;
            if(image=="")
                updates[`image`] =  CORE.DicEvents[i].image;
            else
                updates[`image`] =  image;
            updates[`content`] =  content;
            updates[ `date`] =  date;
            updates[ `dateFin`] =  dateFin;
            updates[ `hour`] =  hour;
            updates[ `categoria`] =  categoria;
            updates[ `asistentes`] =  CORE.DicEvents[i].asistentes;


           firebase.database().ref("Eventos/"+k).update(updates);
           CORE.idEdit =-1; 
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
                var dateFin =  scores[k].dateFin; 
                var hour =  scores[k].hour; 
                var image =  scores[k].image; 
                var categoria =  scores[k].categoria; 
                var content =  scores[k].content;
                var asistentes  = [];  
                var asistenteskey = []; 
                if(scores[k].asistentes){
                    asistentes = Object.values(scores[k].asistentes); 
                    
                    asistenteskey= Object.keys(scores[k].asistentes); 
                   
                }
                GFX.createDivEventosDB(title, id, date,dateFin, hour, image, categoria, content, asistentes, key, asistenteskey); 
            }
            LOGIC.ordenarEventDate(); 
            //LOGIC.cambiarIDIfRepite(); 
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
    var imagenUpload = document.querySelector(".imagenUpload").files[0];
    if(imagenUpload){
        LOGIC.saveImageUpload(imagenUpload); 
        CORE.imageokupload = false; 
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
            var infoProcess = document.querySelector("#UploadImageProcess"); 
            infoProcess.innerText= 'Imagen subiendose: ' + progress + '% '; 
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                infoProcess.innerText= 'Error'; 
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                infoProcess.innerText= 'Imagen Subida';
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
                CORE.imageokupload = true; 
            });
        }
        );
    }
 }

 //Calendario 
 document.addEventListener('DOMContentLoaded', function() {
    if(document.title=="Girls BCN"){
        var calendarEl = document.getElementById('calendar');
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        today = yyyy +'-'+ mm + '-' + dd;
        calendarDiv = new FullCalendar.Calendar(calendarEl, {
        initialDate: today,
        initialView: 'dayGridMonth',
        //   nowIndicator: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listYear'
        },
        firstDay: 1,//  1(Monday) this can be changed to 0(Sunday) for the USA system
        locales: 'es',

        dateClick: function(info) {
            
            GFX.hiddenEvents(info.dateStr); 
            $(".day-highlight").removeClass("day-highlight");
            info.dayEl.classList.remove('fc-day-future')
            info.dayEl.classList.add('day-highlight'); 
        },

        selectable: true,
        });

        calendarDiv.render();
    }
  });
  let menu = document.querySelector('.menu');
  let toggle = document.querySelector('.toggle');
  
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });






  
 
 
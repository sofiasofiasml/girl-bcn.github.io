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
        if(CORE.initDB){
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
                if(scores[k].asistentes)
                    var asistentes = Object.values(scores[k].asistentes); 

                GFX.createDivEventosDB(title, id, date, hour, image, votation, content, asistentes, key); 
            }
            CORE.initDB = false; 
        }
        else{
            var k = keys[keys.length-1]; 
            var title =  scores[k].title; 
            var id =  scores[k].id; 
            var key =  k; 
            var date =  scores[k].date; 
            var hour =  scores[k].hour; 
            var image =  scores[k].image; 
            var votation =  scores[k].votation; 
            var content =  scores[k].content; 
            var asistentes  = [];  
            if(scores[k].asistentes)
                var asistentes = Object.values(scores[k].asistentes); 
            GFX.createDivEventosDB(title, id, date, hour, image, votation, content, asistentes, key); 
            
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
                if(scores[k].lisoptions && scores[k].votlist){
                    var lisOp = Object.values(scores[k].lisoptions); 
                    var lisVot = Object.values(scores[k].votlist); 
                }
                else{
                    var lisOp = []; 
                    var lisVot = []; 
                }
                CORE.Votation[CORE.Votation.length] = new Votation(id,name, lisOp,lisVot, key); 
                GFX.addlistnav(); 

            }
            CORE.initDBVot = false; 
        }
        else{
            var k = keys[keys.length-1]; 
            var name =  scores[k].name; 
            var id =  scores[k].id; 
            if(scores[k].lisoptions && scores[k].votlist){
                var lisOp = Object.values(scores[k].lisoptions); 
                var lisVot = Object.values(scores[k].votlist); 
            }
            else{
                var lisOp = []; 
                var lisVot = []; 
            }
            CORE.Votation[CORE.Votation.length] = new Votation(id,name, lisOp, lisVot, key); 
            GFX.addlistnav(); 

        }
    }
}
 function errData(err)
 {
     console.log('Error! '+ err); 
 }
 
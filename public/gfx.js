//Graficos (VER)
var GFX =
{
    //canvas : null, 
    init: function()
    {
        this.addEventDB(); //setInterval('contador()',1000); Para que cada 1000 mili segundos se vaya actualizando
    }, 

    draw: function()
    {
        
    },
    togglePopup: function()
    {
        document.getElementById("popup-AddEvent").classList.toggle("active"); 
    },
    togglePopupVotacion: function()
    {
        document.getElementById("popup-Votacion").classList.toggle("active"); 
    }, 
    addEventDB:function()
    {
        seeData("Eventos"); 
    },
    createDivEventos: function()
    {
        var nameEvent = document.createElement("h4");
        var valuenameEvent = document.querySelector("#nameEvent"); 
        var valueDate= document.querySelector("#dateEvent");
        var valueHour= document.querySelector("#horaEvent");
        nameEvent.innerText = valuenameEvent.value +"Fecha: "+ valueDate.value + " Hora: "+valueHour.value; 
        
        var descriptionEvent = document.createElement("div");
        descriptionEvent.classList.add("description-event");
        var proba= document.querySelector(".ck.ck-editor__main p");
        descriptionEvent.innerHTML = proba.innerHTML; 

        var imgEvent = document.createElement("img");
        imgEvent.src = "img/band.jpeg"; 

        var AsistenciaEvent = document.createElement("input"); 
        var AsisDescEvent = document.createElement("label"); 
        AsisDescEvent.innerText= "Apuntarse:"; 
        AsistenciaEvent.id="Asistencia"; 

        var bSubmit = document.createElement("input"); 
        bSubmit.setAttribute("type", "submit");
        var ulEvent = document.createElement("ul");
        
        var contEvent = document.createElement("div"); 
        contEvent.classList.add("ContadorAsistentes");
        contEvent.innerText = "Asistentes: 0"; 


        var cont1Event = document.createElement("div"); 
        cont1Event.classList.add("content"); 

        var div1Event = document.createElement("div"); 
        div1Event.classList.add("Evento"); 
        var id = CORE.DicEvents.length; 
        var newEve = new News(id, valuenameEvent.value, imgEvent.src, descriptionEvent.innerHTML, valueDate.value, valueHour.value, "No"); 
        CORE.DicEvents[CORE.DicEvents.length]=newEve; 

    }, 
    createDivEventosDB: function(title, id, date, hour, image, votation, content)
    {
        var nameEvent = document.createElement("h4");
        var valuenameEvent = document.querySelector("#nameEvent"); 
        var valueDate= date;
        var valueHour= hour;
        nameEvent.innerText = title + " Fecha: "+ valueDate +" Hora: "+hour; 
        
        var descriptionEvent = document.createElement("div");
        descriptionEvent.classList.add("description-event");
        descriptionEvent.innerHTML =  content; 

        var imgEvent = document.createElement("img");
        imgEvent.src = image; 

        var AsistenciaEvent = document.createElement("input"); 
        var AsisDescEvent = document.createElement("label"); 
        AsisDescEvent.innerText= "Apuntarse:"; 
        AsistenciaEvent.id="Asistencia"; 

        var bSubmit = document.createElement("input"); 
        bSubmit.setAttribute("type", "submit");
        var ulEvent = document.createElement("ul");
        
        // for (var i = 0; i<2; i++){
        //     var liEvent = document.createElement("li"); 
        //     if(i==0)
        //         liEvent.innerText = "Sofia"; 
        //     if(i==1)
        //         liEvent.innerText = "F"; 
        //         ulEvent.appendChild(liEvent); 
        // }
        var contEvent = document.createElement("div"); 
        contEvent.classList.add("ContadorAsistentes");
        contEvent.innerText = "Asistentes: 0"; 


        var cont1Event = document.createElement("div"); 
        cont1Event.classList.add("content"); 

        var div1Event = document.createElement("div"); 
        div1Event.classList.add("Evento"); 
        if(CORE.initDB){
            var newEve = new News(id, valuenameEvent, imgEvent.src, descriptionEvent.innerHTML, valueDate, valueHour, votation); 
            CORE.DicEvents[CORE.DicEvents.length]=newEve; 
        }
        descriptionEvent.appendChild(imgEvent); 
        cont1Event.appendChild(nameEvent); 
        cont1Event.appendChild(descriptionEvent); 
        cont1Event.appendChild(AsisDescEvent); 
        cont1Event.appendChild(AsistenciaEvent); 
        cont1Event.appendChild(bSubmit); 
        cont1Event.appendChild(ulEvent); 
        cont1Event.appendChild(contEvent); 
        div1Event.appendChild(cont1Event); 
        CORE.addEvents.appendChild(div1Event); 

    }
}

CORE.modules.push(GFX); 

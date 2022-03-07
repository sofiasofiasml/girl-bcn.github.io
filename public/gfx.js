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
        window.scrollTo(0,0);
    },
    togglePopupVotacion: function()
    {
        document.getElementById("popup-Votacion").classList.toggle("active"); 
    }, 
    addEventDB:function()
    {
        seeData("Eventos"); 
    },
    addAsistent:function(event)
    {
        var value = document.querySelector('#Asistencia'+event.name).value; 
        writeNewPost(event.name, 'asistentes', value) 
        this.seeAsistentes(event, value); 
        document.querySelector('#Asistencia'+event.name).value = ""; 
        var el = document.querySelector('#Evento'+event.name);
        el.remove(); // Removes the div with the 'div-02' id
    },
    seeAsistentes:function(event, value)
    {
        var ulEvent = document.querySelector("#ul"+event.name);
        var liEvent = document.createElement("li"); 
        liEvent.innerText = value; 
        ulEvent.appendChild(liEvent); 

        var contAsisten = document.querySelector('.ContadorAsistentes'+event.name); 
        contAsisten.innerText = "Asistentes: "+ CORE.DicEvents[event.name].asistentes.length; 
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
        var image = 'img/band.jpeg'; 

        var id = CORE.DicEvents.length; 
        var newEve = new News(id, valuenameEvent.value, image, descriptionEvent.innerHTML, valueDate.value, valueHour.value, "No", "", []); 
        CORE.DicEvents[CORE.DicEvents.length]=newEve; 

    }, 
    createDivEventosDB: function(title, id, date, hour, image, votation, content, asistentes, key)
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
        var index = image.indexOf("/img/");
        imgEvent.src = image.substring(index, image.length);
        imgEvent.alt = "img_event"; 
        imgEvent.title = "img_event"; 

        var AsistenciaEvent = document.createElement("input"); 
        var AsisDescEvent = document.createElement("label"); 
        AsisDescEvent.innerText= "Apuntarse:"; 
        AsistenciaEvent.id="Asistencia"+id; 

        var bSubmit = document.createElement("input"); 
        bSubmit.setAttribute("type", "submit");
        bSubmit.setAttribute("class", "submit");
        bSubmit.setAttribute("name", id);
        bSubmit.setAttribute("onclick", "GFX.addAsistent(this)");
        var ulEvent = document.createElement("ul");
        ulEvent.setAttribute("id", "ul"+id);
        
        for (var i = 0; i<asistentes.length; i++){
            var liEvent = document.createElement("li"); 
                liEvent.innerText = asistentes[i]; 
                ulEvent.appendChild(liEvent); 
        }
        var contEvent = document.createElement("div"); 
        contEvent.classList.add("ContadorAsistentes"+id);
        contEvent.innerText = "Asistentes: "+asistentes.length; 


        var cont1Event = document.createElement("div"); 
        cont1Event.classList.add("content"); 

        var div1Event = document.createElement("div"); 
        div1Event.classList.add("Evento"); 
        div1Event.setAttribute("id", "Evento"+id);

        if(CORE.initDB){
            var newEve = new News(id, valuenameEvent, imgEvent.src, descriptionEvent.innerHTML, valueDate, valueHour, votation, asistentes, key, asistentes); 
            if(asistentes)
                newEve.asistentes = asistentes; 
            CORE.DicEvents[CORE.DicEvents.length]=newEve; 
            // if(asistentes.length !=0)
            //     CORE.DicEvents[CORE.DicEvents.length].asistentes = asistentes; 
        }
        CORE.DicEvents[CORE.DicEvents.length-1].key =key; 

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

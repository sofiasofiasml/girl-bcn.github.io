//Graficos (VER)
var GFX =
{
    //canvas : null, 
    init: function()
    {

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
    createDivEventos: function()
    {
        var nameEvent = document.createElement("h4");
        nameEvent.innerText = "Evento: prueba"; 

        var descriptionEvent = document.createElement("div");
        descriptionEvent.classList.add("description-event");
        descriptionEvent.innerText = "Fecha: Descripción"; 

        var imgEvent = document.createElement("img");
        imgEvent.src = "img/band.jpeg"; 

        var AsistenciaEvent = document.createElement("input"); 
        var AsisDescEvent = document.createElement("label"); 
        AsisDescEvent.innerText= "Apuntarse:"; 
        AsistenciaEvent.id="Asistencia"; 

        var bSubmit = document.createElement("input"); 
        bSubmit.setAttribute("type", "submit");
        var ulEvent = document.createElement("ul");
        
        for (var i = 0; i<2; i++){
            var liEvent = document.createElement("li"); 
            if(i==0)
                liEvent.innerText = "Sofia"; 
            if(i==1)
                liEvent.innerText = "F"; 
                ulEvent.appendChild(liEvent); 
        }
        var contEvent = document.createElement("div"); 
        contEvent.classList.add("ContadorAsistentes");
        contEvent.innerText = "Asistentes: 2"; 


        var cont1Event = document.createElement("div"); 
        cont1Event.classList.add("content"); 

        var div1Event = document.createElement("div"); 
        div1Event.classList.add("Evento"); 

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

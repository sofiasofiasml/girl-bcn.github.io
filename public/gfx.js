//Graficos (VER)
var GFX =
{
    //canvas : null, 
    init: function()
    {
        this.addEventDB(); //setInterval('contador()',1000); Para que cada 1000 mili segundos se vaya actualizando
        delatenodeDBforTime(); 
    }, 

    draw: function()
    {
        
    },
    togglePopup: function()
    {
        document.getElementById("popup-AddEvent").classList.toggle("active"); 
        window.scrollTo(0,1);
    },
    togglePopupVotacion: function(element)
    {
        document.getElementById("popup-Votacion").classList.toggle("active"); 
        LOGIC.InfoVotationElement(element); 
    }, 
    togglePopupVot: function()
    {
        document.getElementById("popup-Vot").classList.toggle("active"); 
        CORE.contvoationactual = 0; 
        window.scrollTo(0,1);
    },
    addInput: function()
    {
        var divOverlay = document.querySelector("#addOtherInput"); 

        var inputdiv = document.createElement("input");
        CORE.contvoationactual +=1; 

        inputdiv.id = "Input"+CORE.contvoationactual;
        divOverlay.appendChild(inputdiv); 

    },
    addlistnav:function()
    {
        var divnav = document.querySelector("#ulnav"); 
        var liEvent = document.createElement("li"); 
        var aEvent = document.createElement("a"); 
        aEvent.setAttribute("onclick", "GFX.togglePopupVotacion(this)");
        aEvent.classList.add("votacion");
        var leng =CORE.Votation.length-1;  
        aEvent.id = "votacion"+leng;
        aEvent.innerText = CORE.Votation[CORE.Votation.length-1].name; 
        liEvent.appendChild(aEvent); 
        divnav.appendChild(liEvent); 
    },
    addEventDB:function()
    {
        seeData("Eventos"); 
        seeData("Votation"); 
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
        var image = 'img/pp.png'; 
        var id = CORE.DicEvents.length; 

        if(id!=0)
        {
            for(var i =0; i<CORE.DicEvents.length; i++)
            {
                if(CORE.DicEvents[i].id==id)
                    id++; 
            }
        }
        var newEve = new News(id, valuenameEvent.value, image, descriptionEvent.innerHTML, valueDate.value, valueHour.value, "No", "", [], []); 
        CORE.DicEvents[CORE.DicEvents.length]=newEve; 

    }, 
    createDivEventosDB: function(title, id, date, hour, image, votation, content, asistentes, key, asistenteskey)
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
        AsistenciaEvent.setAttribute("class", "AsistenciaInput");


        var bSubmit = document.createElement("input"); 
        bSubmit.setAttribute("type", "submit");
        bSubmit.setAttribute("class", "submitAsistencia");
        bSubmit.setAttribute("name", id);
        bSubmit.setAttribute("onclick", "GFX.addAsistent(this)");
        var ulEvent = document.createElement("ul");
        ulEvent.setAttribute("id", "ul"+id);
        if(asistentes){
            for (var i = 0; i<asistentes.length; i++){
                var liEvent = document.createElement("li"); 
                    liEvent.innerText = asistentes[i]; 
                    liEvent.setAttribute("class", "li"+id+"-"+i);

                var delateli = document.createElement("div");
                    delateli.innerText= String.fromCodePoint(0x1F5D1);
                    delateli.setAttribute("class", "close-btn-Asistant");
                    delateli.setAttribute("id", id+"-"+i);
                    delateli.setAttribute("onclick", "LOGIC.delateAsistant(this)");




                liEvent.appendChild(delateli); 
                    ulEvent.appendChild(liEvent); 
            }
        }
        var contEvent = document.createElement("div"); 
        contEvent.classList.add("ContadorAsistentes"+id);
        if(asistentes)
            contEvent.innerText = "Asistentes: "+asistentes.length; 
        else
            contEvent.innerText = "Asistentes: 0"; 



        var cont1Event = document.createElement("div"); 
        cont1Event.classList.add("content"); 

        var div1Event = document.createElement("div"); 
        div1Event.classList.add("Evento"); 
        div1Event.setAttribute("id", "Evento"+id);

        if(CORE.initDB){
            var newEve = new News(id, valuenameEvent, imgEvent.src, descriptionEvent.innerHTML, valueDate, valueHour, votation, asistentes, key, asistentes, asistenteskey); 
            if(asistentes){
                newEve.asistentes = asistentes; 
                newEve.asistenteskey = asistenteskey; 
            }
            CORE.DicEvents[CORE.DicEvents.length]=newEve; 
            
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

    },
    addButtonOptionVotation: function(id, name, link, resp)
    {
        var divInfoVotation = document.querySelector("#InfoVotacionDB"); 
        var title = document.createElement("h4");
        title.innerText = name; 
        divInfoVotation.appendChild(title); 

        var linkgoog = document.createElement("h4");
        linkgoog.innerText = "Link votación"; 
        divInfoVotation.appendChild(linkgoog); 
        var lik = document.createElement("a");
        lik.title = "Google aswer";
        lik.href =  link; 
        lik.innerText = 'Link Votación'; 

        divInfoVotation.appendChild(lik); 
        var br = document.createElement("br");
        divInfoVotation.appendChild(br); 

        var linkres = document.createElement("h4");
        linkres.innerText = "Link respuestas"; 
        divInfoVotation.appendChild(linkres); 
        var r = document.createElement("a");
        r.title = "Google resp";
        r.href =  resp; 
        r.innerText = 'Link respuestas'; 
        divInfoVotation.appendChild(r); 
        
        {/* <input type="submit" value="Borrar" onclick="LOGIC.idChangeToDelate(this)">  */}
        var sub = document.createElement("input");
        sub.setAttribute("type", "submit");
        sub.setAttribute("value", "Eliminar");
        sub.setAttribute("onclick", "LOGIC.idChangeToDelate(this)");
        sub.setAttribute("name", "submit"+id);
        
        divInfoVotation.appendChild(br); 
        divInfoVotation.appendChild(sub); 

    }, 
    removeChildOverlay: function()
    {
        var divInfoVotation = document.querySelector("#InfoVotacionDB"); 

        while (divInfoVotation.firstChild) {
            divInfoVotation.removeChild(divInfoVotation.lastChild);
            }
    }
    
}


CORE.modules.push(GFX); 

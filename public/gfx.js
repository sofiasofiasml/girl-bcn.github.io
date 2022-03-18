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
        document.location.reload();
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

        var valueDate= date;
        var valueHour= hour;

        var imgEvent; 
        var index = image.indexOf("/img/");
        imgEvent = image.substring(index, image.length);

        if(CORE.initDB){
            var newEve = new News(id, title, imgEvent, content, valueDate, valueHour, votation, asistentes, key, asistentes, asistenteskey); 
            if(asistentes){
                newEve.asistentes = asistentes; 
                newEve.asistenteskey = asistenteskey; 
            }
            CORE.DicEvents[CORE.DicEvents.length]=newEve; 
            
        }
        CORE.DicEvents[CORE.DicEvents.length-1].key =key; 

    },
    printEvent: function(indexEvent)
    {
        var nameEvent = document.createElement("h4");
        var valuenameEvent = document.querySelector("#nameEvent"); 
        var valueDate= CORE.DicEvents[indexEvent].date;
        var valueHour= CORE.DicEvents[indexEvent].hour;
        nameEvent.innerText = CORE.DicEvents[indexEvent].title + " Fecha: "+ valueDate +" Hora: "+valueHour; 
        
        var descriptionEvent = document.createElement("div");
        descriptionEvent.classList.add("description-event");
        descriptionEvent.innerHTML =  CORE.DicEvents[indexEvent].content; 
        descriptionEvent.style.fontWeight = "900";
    

        var imgEvent = document.createElement("img");
        var index = CORE.DicEvents[indexEvent].image.indexOf("/img/");
        imgEvent.src = CORE.DicEvents[indexEvent].image.substring(index, CORE.DicEvents[indexEvent].image.length);
        imgEvent.alt = "img_event"; 
        imgEvent.title = "img_event"; 
        imgEvent.setAttribute("class", "img_Event");


        var AsistenciaEvent = document.createElement("input"); 
        var AsisDescEvent = document.createElement("label"); 
        AsisDescEvent.innerText= "Apuntarse:"; 
        AsisDescEvent.style.fontWeight = "900";

        AsistenciaEvent.id="Asistencia"+CORE.DicEvents[indexEvent].id; 
        AsistenciaEvent.setAttribute("class", "AsistenciaInput");


        var bSubmit = document.createElement("input"); 
        bSubmit.setAttribute("type", "submit");
        bSubmit.setAttribute("class", "submitAsistencia");
        bSubmit.setAttribute("name", CORE.DicEvents[indexEvent].id);
        bSubmit.setAttribute("onclick", "GFX.addAsistent(this)");
        var ulEvent = document.createElement("ul");
        ulEvent.setAttribute("id", "ul"+CORE.DicEvents[indexEvent].id);
        if(CORE.DicEvents[indexEvent].asistentes){
            for (var i = 0; i<CORE.DicEvents[indexEvent].asistentes.length; i++){
                var liEvent = document.createElement("li"); 
                    liEvent.innerText = CORE.DicEvents[indexEvent].asistentes[i]; 
                    liEvent.style.fontWeight = "900";
                    liEvent.setAttribute("class", "li"+CORE.DicEvents[indexEvent].id+"-"+i);

                var delateli = document.createElement("div");
                    delateli.innerText= "X";
                    delateli.setAttribute("class", "close-btn-Asistant");
                    delateli.setAttribute("id", CORE.DicEvents[indexEvent].id+"-"+i);
                    delateli.setAttribute("onclick", "LOGIC.delateAsistant(this)");

                    var tooltipli = document.createElement("div");
                    tooltipli.innerText= "Borrar asistente";
                    tooltipli.setAttribute("class", "tooltiptext");

                    delateli.appendChild(tooltipli); 
                    liEvent.appendChild(delateli); 
                    ulEvent.appendChild(liEvent); 
            }
        }
        var contEvent = document.createElement("div"); 
        contEvent.classList.add("ContadorAsistentes"+CORE.DicEvents[indexEvent].id);
        if(CORE.DicEvents[indexEvent].asistentes){
            contEvent.innerText = "Asistentes: "+CORE.DicEvents[indexEvent].asistentes.length; 
            contEvent.style.fontWeight = "900";
        }
        else{
            contEvent.innerText = "Asistentes: 0"; 
            contEvent.style.fontWeight = "900";
        }

        var delatebutton = document.createElement("button"); 
        delatebutton.setAttribute("type", "button");
        delatebutton.innerText = "Eliminar"; 
        delatebutton.setAttribute("class", "delateEvent");
        delatebutton.setAttribute("name", CORE.DicEvents[indexEvent].id);
        delatebutton.setAttribute("onclick", "LOGIC.delateEvent(this)");

        var cont1Event = document.createElement("div"); 
        cont1Event.classList.add("content"); 

        var div1Event = document.createElement("div"); 
        div1Event.classList.add("Evento"); 
        div1Event.setAttribute("id", "Evento"+CORE.DicEvents[indexEvent].id);

        

        descriptionEvent.appendChild(imgEvent); 
        cont1Event.appendChild(nameEvent); 
        cont1Event.appendChild(descriptionEvent); 
        cont1Event.appendChild(AsisDescEvent); 
        cont1Event.appendChild(AsistenciaEvent); 
        cont1Event.appendChild(bSubmit); 
        cont1Event.appendChild(ulEvent); 
        cont1Event.appendChild(contEvent); 
        cont1Event.appendChild(delatebutton); 
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

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
        window.scrollTo(0,1);
    },
    toggleEditPopup: function(event)
    {
        if(event)
            CORE.idEdit = event.name; 
        document.getElementById("popup-EditEvent").classList.toggle("active"); 
        window.scrollTo(0,1);
        GFX.FillInfo(); 
    },
    downbotom: function()
    {
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    },
    UPbotom: function()
    {
        window.scrollTo(0,1);
    },
    togglePopupVotacion: function(element)
    {
        document.getElementById("popup-Votacion").classList.toggle("active"); 
        LOGIC.InfoVotationElement(element); 
    }, 
    togglePopupHoroscopo: function(val)
    {
        window.scrollTo(0,1);
        document.getElementById("popup-Horoscopo").classList.toggle("active"); 
        if(val){
            document.getElementById("Value-Horoscopo").innerHTML =val;
            switch (val) {
                case "Aries":
                  document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Aries; 
                  break;
                case "Tauro":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Tauro; 
                  break;
                case "géminis":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Geminis; 
                  break;
                case "cáncer":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Cancer; 
                    break;
                case "leo":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Leo; 
                    break;
                case "virgo":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Virgo; 
                    break;
                case "libra":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Libra; 
                    break;
                case "escorpio":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Escorpio; 
                    break;
                case "sagitario":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Sagitario; 
                    break;
                case "capricornio":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Capricornio; 
                    break;
                case "acuario":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Acuario; 
                    break;
                case "piscis":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Piscis; 
                    break;
              }
        }
        
    }, 
    togglePopupShareAgenda: function()
    {
        document.getElementById("popup-shareAgenda").classList.toggle("active"); 
        window.scrollTo(0,1);
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
    FillInfo: function()
    {
        var id = CORE.idEdit;  
        for(var i=0; i< CORE.DicEvents.length; i++){
            if(CORE.DicEvents[i].id == id)
            {
                document.querySelector("#nameEditEvent").value = CORE.DicEvents[i].title; 
                document.querySelector("#dateEditEvent").value = CORE.DicEvents[i].date; 
                document.querySelector("#dateEventEditFinish").value = CORE.DicEvents[i].dateFin; 
                document.querySelector("#horaEditEvent").value = CORE.DicEvents[i].hour; 
                document.querySelector("#categoriaEdit").value = CORE.DicEvents[i].categoria; 
                CORE.editors.NewEventEditDescription.setData(CORE.DicEvents[i].content); 
                CORE.editors.NewEventEditDescription.setData(CORE.editors.NewEventEditDescription.getData().replace("...", ""));
                break;
            }
        }
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
        aEvent.innerText = CORE.Votation[CORE.Votation.length-1].name.charAt(0).toUpperCase() +CORE.Votation[CORE.Votation.length-1].name.slice(1); 
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
        var valuenameEvent = document.querySelector("#nameEvent"); 
        var valueDate= document.querySelector("#dateEvent");
        var valueDateFin= document.querySelector("#dateEventFinish");
        var valueHour= document.querySelector("#horaEvent");
        
        var select = document.getElementById('categoria');
        var valueCategoria = select.options[select.selectedIndex].value;
        var categoria = valueCategoria; 

        
        var descriptionEvent = document.createElement("div");
        descriptionEvent.classList.add("description-event");
        // var proba= document.querySelectorAll(".ck.ck-editor__main p");
        descriptionEvent.innerHTML  = CORE.editors.NewEventDescription.getData();
         
        // for (var i =0; i<proba.length; i++){
        //     descriptionEvent.innerHTML += proba[i].innerHTML + "<br>" ; 
        // }
        
        


        var infoProcess = document.querySelector("#UploadImageProcess"); 
        if(CORE.imageUploadURL==""){
            var image = 'img/pp.png'; 
            if(infoProcess){
                if(infoProcess.innerText == 'Imagen Subida')
                    var image = CORE.imageUploadURL; 
            }
        }
        else
            var image = CORE.imageUploadURL; 
        
        var id = CORE.DicEvents.length; 

        if(id!=0)
        {
            for(var i =1; i<(Math.max(...Object.values(CORE.arrayID))+2); i++)
            {
                if(!CORE.arrayID[i]){
                    id = i; 
                    break; 
                }
            }
        }
        // var initDescription = descriptionEvent.innerHTML.substring(0, 120);
        // initDescription += "<span id='dots"+id+"'>...</span><span id='more"+id+"' style='display: none'>"
        // var finDescription = descriptionEvent.innerHTML.substring(120, descriptionEvent.length);
        // finDescription = finDescription +"</span>"; 
        initDescription = GFX.createLeerMas(descriptionEvent.innerHTML, id); 
        

        if(!image || image =="")
            var image = 'img/pp.png'; 
        var newEve = new News(id, valuenameEvent.value, image, initDescription, valueDate.value, valueDateFin.value, valueHour.value, categoria, "", [], []); 
        CORE.DicEvents[CORE.DicEvents.length]=newEve; 
        //var newEvenCalendar = new EventCalendar(valuenameEvent.value, valueDate.value, valueDate.value, ""); 
       // CORE.calendarEvents[CORE.calendarEvents.length]=newEvenCalendar;
    }, 
    createLeerMas: function(event, id){
        var initDescription = event.substring(0, 120);
        initDescription += "<span id='dots"+id+"'>...</span><span id='more"+id+"' style='display: none'>"
        var finDescription = event.substring(120, event.length);
        finDescription = finDescription +"</span>"; 
        initDescription = initDescription + finDescription; 
        return initDescription; 
    },
    createDivEventosDB: function(title, id, date,dateFin, hour, image, categoria, content, asistentes, key, asistenteskey)
    {

        var valueDate= date;
        var valueDateFin= dateFin;
        var valueHour= hour;
        
        var imgEvent; 
        var index = image.indexOf("/img/");
        imgEvent = image.substring(index, image.length);
        
        if(CORE.initDB){
            var newEve = new News(id, title, imgEvent, content, valueDate,valueDateFin, valueHour, categoria, asistentes, key, asistentes, asistenteskey); 
            if(asistentes){
                newEve.asistentes = asistentes; 
                newEve.asistenteskey = asistenteskey; 
            }
            CORE.DicEvents[CORE.DicEvents.length]=newEve; 
            //var newEvenCalendar = new EventCalendar(title, valueDate, valueDate, ""); 
            //CORE.calendarEvents[CORE.calendarEvents.length]=newEvenCalendar;
            calendarDiv.addEvent({
                title: title,
                start: valueDate+"T"+valueHour,
                end: valueDateFin+"T"+valueHour, 
                url: ""
              });
            //calendarDiv.addEvent(CORE.calendarEvents[CORE.calendarEvents.length]);  
        }
        CORE.DicEvents[CORE.DicEvents.length-1].key =key; 
        CORE.arrayID[id] = id; 
        
    },
    printEvent: function(indexEvent)
    {
        var nameEvent = document.createElement("h4");
        var valuenameEvent = document.querySelector("#nameEvent"); 
        var valueDate= CORE.DicEvents[indexEvent].date;
        var valueDateFin= CORE.DicEvents[indexEvent].dateFin;
        var valueHour= CORE.DicEvents[indexEvent].hour;
        var titleUpdate = CORE.DicEvents[indexEvent].title.charAt(0).toUpperCase() +CORE.DicEvents[indexEvent].title.slice(1);
        var mydate = new Date(valueDate); 
        var mydateFin = new Date(valueDateFin); 
       
        nameEvent.innerText = titleUpdate + " Fecha: "+  mydate.toLocaleDateString("es-ES") +"-"+ mydateFin.toLocaleDateString("es-ES")+" Hora: "+valueHour; 
        
        var descriptionEvent = document.createElement("div");
        descriptionEvent.classList.add("description-event");
        descriptionEvent.innerHTML =  CORE.DicEvents[indexEvent].content; 
        descriptionEvent.style.fontWeight = "900";
        //Poner LINK en los links
        if(descriptionEvent.querySelectorAll("a"))
        {
            for(var i=0; i<descriptionEvent.querySelectorAll("a").length; i++){
                if(descriptionEvent.querySelectorAll("a")[i].text!="LINK")
                    descriptionEvent.querySelectorAll("a")[i].text="LINK"; 
            }
            
        }
        
        
        var imgEvent = document.createElement("img");
        var index = CORE.DicEvents[indexEvent].image.indexOf("/img/");
        imgEvent.src = CORE.DicEvents[indexEvent].image.substring(index, CORE.DicEvents[indexEvent].image.length);
        imgEvent.alt = "img_event"; 
        imgEvent.title = "img_event"; 
        imgEvent.setAttribute("class", "img_Event");
        
        
        var AsistenciaEvent = document.createElement("input"); 
        var AsisDescEvent = document.createElement("label"); 
        AsisDescEvent.innerText= "\nApuntarse:"; 
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
                    liEvent.innerText = CORE.DicEvents[indexEvent].asistentes[i].charAt(0).toUpperCase() + CORE.DicEvents[indexEvent].asistentes[i].slice(1); 
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

        var ReadMore = document.createElement("a"); 
        ReadMore.innerText = "Leer más"; 
        ReadMore.setAttribute("id", "ReadMoreDescripction"+CORE.DicEvents[indexEvent].id);
        ReadMore.setAttribute("class", "ReadMoreDescripction");
        ReadMore.setAttribute("onclick", "LOGIC.seeReadMore(this)");

        var delatebutton = document.createElement("button"); 
        delatebutton.setAttribute("type", "button");
        delatebutton.innerText = "Eliminar Evento"; 
        delatebutton.setAttribute("class", "delateEvent");
        delatebutton.setAttribute("name", CORE.DicEvents[indexEvent].id);
        delatebutton.setAttribute("onclick", "LOGIC.delateEvent(this)");

        var sharebutton = document.createElement("button"); 
        sharebutton.setAttribute("type", "button");
        sharebutton.innerText = "Share Evento"; 
        sharebutton.setAttribute("class", "shareEvent");
        sharebutton.setAttribute("name", CORE.DicEvents[indexEvent].id);
        sharebutton.setAttribute("onclick", "LOGIC.sshareEvent(this)");

        var editbutton = document.createElement("button"); 
        editbutton.setAttribute("type", "button");
        editbutton.innerText = "Edit Evento"; 
        editbutton.setAttribute("class", "editEvent");
        editbutton.setAttribute("name", CORE.DicEvents[indexEvent].id);
        editbutton.setAttribute("onclick", "GFX.toggleEditPopup(this)");
        
        var cont1Event = document.createElement("div"); 
        cont1Event.classList.add("content"); 
        
        var div1Event = document.createElement("div"); 
        div1Event.classList.add("Evento"); 
        div1Event.setAttribute("id", "Evento"+CORE.DicEvents[indexEvent].id);
        
        this.colorBackgroundEvent( CORE.DicEvents[indexEvent].categoria, div1Event); 
        
        
        descriptionEvent.appendChild(imgEvent); 
        cont1Event.appendChild(nameEvent); 
        cont1Event.appendChild(descriptionEvent); 
        cont1Event.appendChild(ReadMore); 
        cont1Event.appendChild(AsisDescEvent); 
        cont1Event.appendChild(AsistenciaEvent); 
        cont1Event.appendChild(bSubmit); 
        cont1Event.appendChild(ulEvent); 
        cont1Event.appendChild(contEvent); 
        cont1Event.appendChild(delatebutton); 
        cont1Event.appendChild(sharebutton); 
        cont1Event.appendChild(editbutton); 
        div1Event.appendChild(cont1Event); 
        CORE.addEvents.appendChild(div1Event); 
    }, 
    ShowAgenda: function(msg)
    {
        var divShareAgenda = document.querySelector("#shareAgenda"); 
        //delate child
        while (divShareAgenda.firstChild) {
            divShareAgenda.removeChild(divShareAgenda.lastChild);
        }
        var textarea = document.createElement("textarea"); 
        textarea.setAttribute("style", "background: white; height: 300px; width: 100%; ");

        textarea.value = msg; 

        divShareAgenda.appendChild(textarea); 

    },
    colorBackgroundEvent: function(category, div1Event)
    {
        switch (category) {
            case "1": // Senderismo
                div1Event.setAttribute("style", "background:linear-gradient(to right bottom, #a4cd88 50%, #c3deb1 50.1%);");
              break;
            case "2": // Girls-bcn
                div1Event.setAttribute("style", "background:linear-gradient(to right bottom, #c495e2 50%, #d9b8ec 50.1%);");
              break;
            case "3": // Fiesta/Bar --
                div1Event.setAttribute("style", "background:linear-gradient(to right bottom, #fff8cd 50%, #fffade 50.1%)");
              break;
            case "4": // Cultura ---
                div1Event.setAttribute("style", "background:linear-gradient(to right bottom, #f6bbcb 50%, #f9d2dd 50.1%);");
              break;
            case "5": // Gastronomía ---
                div1Event.setAttribute("style", "background:linear-gradient(to right bottom, #efab48 50%, #f4c887 50.1%);");
              break;
            case "6": // Deporte --
                div1Event.setAttribute("style", "background:linear-gradient(to right bottom, #aed6e3 50%, #cae4ec 50.1%);");
              break;
            case "7": // Cine --
                div1Event.setAttribute("style", "background:linear-gradient(to right bottom, #e24756 50%, #ec8790 50.1%);");
                break;
            case "8": // Juegos ---
                div1Event.setAttribute("style", "background:linear-gradient(to right bottom, #e1f9f8 50%, #f7fdfd 50.1%);");
              break;
            default: // Subir imagen 
                div1Event.setAttribute("style", "background:linear-gradient(to right bottom, #c495e2 50%, #d9b8ec 50.1%);");
          }
          
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
    }, 
    loadFile: function(event)
    {
        var imageShowDOM= document.querySelector("#ShowImageUpload");
        
        imageShowDOM.src = URL.createObjectURL(event.target.files[0]);
    }, 
    //Opciones de categoria e imagen 
    selectionValue: function(selection)
    {
        if (selection.value == "SubirImagen") {
           
            var inputImage = document.createElement("input");
            inputImage.setAttribute("type","file");
            inputImage.setAttribute("id", "imagenUpload");
            inputImage.setAttribute("name", "imagen");
            inputImage.setAttribute("accept", "image/png, image/jpeg, image/jpg");
            inputImage.setAttribute("onchange", "GFX.loadFile(event)");

            var labelimage = document.createElement("label");
            labelimage.innerText= "Imagen:"; 
            labelimage.appendChild(inputImage); 
            labelimage.appendChild(inputImage); 

            var buttonImage = document.createElement("button");
            buttonImage.setAttribute("onclick", "UploadImage()");
            buttonImage.innerText= "Subir Imagen"; 
            
            var infoProcess = document.createElement("div");
            infoProcess.setAttribute("id", "UploadImageProcess");
            infoProcess.innerText= "No subida la imagen"
            
            var imageshow = document.createElement("img");
            imageshow.setAttribute("id", "ShowImageUpload");
            imageshow.setAttribute("style", "width: 50%; height: 50%; margin-left: 25%;");

            var imageDiv = document.querySelector("#ImageOption"); 
            imageDiv.appendChild(labelimage); 
            imageDiv.appendChild(buttonImage); 
            imageDiv.appendChild(imageshow); 
            imageDiv.appendChild(infoProcess); 
              
        }
        else{
            var imageDiv = document.querySelector("#ImageOption"); 
            while (imageDiv.firstChild)
                imageDiv.removeChild(imageDiv.lastChild);
            GFX.imageForCategory(selection.value); 
            
        }
            
    }, 
    imageForCategory:function(selection)
    {
        if(selection == "1") //Senderismo ----------------
                CORE.imageUploadURL = 'img/naturaleza.png'; 
            if(selection == "2") //girls-bcn
                CORE.imageUploadURL = ""; 
            if(selection == "3") //Bar FIESTA ---------------------
                CORE.imageUploadURL = 'img/fiesta.png'; 
            if(selection == "4") //Cultura --------
                CORE.imageUploadURL = 'img/cultura.png'; 
            if(selection == "5") //Gastronomia ---------------
                CORE.imageUploadURL = 'img/comida.png'; 
            if(selection == "6") //Deporte ------------------
                CORE.imageUploadURL = 'img/deporte.png'; 
            if(selection == "7") //Cine  ------------------------
                CORE.imageUploadURL = 'img/cinemas.png'; 
            if(selection == "8") //Juegos --------------------
                CORE.imageUploadURL = 'img/juego.png'; 
            return CORE.imageUploadURL; 
    },
    //Click calendar hidden events
    hiddenEvents: function(dateclick)
    {
        for(var i=0; i< CORE.DicEvents.length; i++)
        {
            var EventDiv = document.querySelector("#Evento"+CORE.DicEvents[i].id);  
            var mydate = new Date(CORE.DicEvents[i].date); 
            var myDateStirng = LOGIC.DatetoString(mydate); 
            var dateFin = new Date(CORE.DicEvents[i].dateFin); 
            dateFin = new Date(dateFin.getTime() + (1000 * 60 * 60 * 24));
            dateFin = LOGIC.DatetoString(dateFin); 
            if(CORE.DicEvents[i].date != dateclick)
            {
                EventDiv.style.display = "none";
                while(dateFin > myDateStirng && dateclick >= myDateStirng){
                    EventDiv.style.display = "none";
                    if(myDateStirng == dateclick){
                        EventDiv.style.display = "";
                        break; 
                    }
                    mydate = new Date(mydate.getTime() + (1000 * 60 * 60 * 24));
                    myDateStirng = LOGIC.DatetoString(mydate); 
                }
            }
            else{
                EventDiv.style.display = "";
                
            }
            
            
        }

    }, 
    seeAllEvents:function()
    {
        for(var i=0; i< CORE.DicEvents.length; i++)
        {
            var EventDiv = document.querySelector("#Evento"+CORE.DicEvents[i].id); 
            EventDiv.style.display = "";
        }
    },
    printOut: function(str) {
        var i = 0;
        var timePerLetter = 200,
        text = document.createTextNode('');
        document.getElementById('test').appendChild(text);
        (function main() {
          var char = str[i++];
          
          text.nodeValue += char;
          if(i < str.length){
            setTimeout(main, timePerLetter);
            
          }
          else
          {
            // text.nodeValue = ' ';
            text.nodeValue  = text.nodeValue .substring(1); 
            
            i=0;
            setTimeout(main, timePerLetter);
            
          }
          if(text.nodeValue.length > 20 ){
            text.nodeValue  = text.nodeValue .substring(1); 
            
          }
        
        })();
      }
    
}


CORE.modules.push(GFX); 

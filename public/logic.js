//logica de la app (Controler)
var LOGIC = {

    init: function()
    {

    }, 

    update: function(dt)
    {

    }, 
    // Actualización 
    update: function(dt)
    {

    }, 
    //mirar si los datos estan vacios
    writtenData: function()
    {
        var valuenameEvent = document.querySelector("#nameEvent"); 
        var valueDate= document.querySelector("#dateEvent");
        var valueHour= document.querySelector("#horaEvent");
        if(valuenameEvent.value !="" && valueDate.value !="" && valueHour.value !="" && CORE.imageokupload){

            GFX.createDivEventos(); 
            this.saveDB(); 
            
            
            if(CORE.addEventVotation){
                var VotacionesNew =  document.createElement("a");
                VotacionesNew.classList.add("votacion");
                VotacionesNew.setAttribute("onclick", "GFX.togglePopupVotacion()");
                VotacionesNew.innerText=CORE.nameNewEvent.value;
                var li =  document.createElement("li");
                li.appendChild(VotacionesNew); 
                CORE.navUl.appendChild(li); 
            }
            document.location.reload();
        }
        else{
            alert("Falta un campo o cargar la Imagen"); 
        }
    }, 
    writtenVotation:function()
    {
        this.saveDBvotation(); 
        //DB  
        var data = CORE.Votation[CORE.Votation.length-1]
        insertData(data, "Votation"); 
        document.location.reload();
    }, 
    saveDB: function()
    {
        var data = CORE.DicEvents[CORE.DicEvents.length-1]; 
        insertData(data, "Eventos"); 
    }, 
    saveDBvotation: function()
    {
        // var listOptions = []; 
        // var votlist = []; 
        // for(var i=1; i<CORE.contvoationactual+1; i++)
        // {
        //     var inputs = document.querySelector("#Input"+i); 
        //     listOptions.push(inputs.value); 
        //     votlist.push(0); 
        // }
       var auxVotation = new Votation(CORE.Votation.length, document.querySelector("#nameVotationOverlay").value,  "", document.querySelector("#googleaswer").value, document.querySelector("#googleResp").value); 
       CORE.Votation[CORE.Votation.length] = auxVotation; 
        
    },
    //Ordenar lista en funcion de la fecha
    //obtener info de la votacion o de la idea 
    InfoVotationElement: function(element)
    {
        if(element){
            var id = element.id.substring(8, element.id.length);

            for (var i = 0; i < CORE.Votation.length; i++)
            {
                if(id == CORE.Votation[i].id)
                {
                    CORE.overlayactive =CORE.Votation[i].id; 
                    // var options = CORE.Votation[i].lisoptions; 
                    // var votlist = CORE.Votation[i].votlist; 
                    GFX.addButtonOptionVotation(id, CORE.Votation[i].name, CORE.Votation[i].link, CORE.Votation[i].resp); 
                    //Modificar DB 
                    //this.modVotation(options,votlist); 
                }
            }
        }
        else //borrar hijos de overlay remove
        GFX.removeChildOverlay(); 
        
    }, 
    
    sumValue: function(event)
    {
        var j = CORE.overlayactive; 
        for(var i =0; i<CORE.Votation[j].lisoptions.length; i++)
        {
            if(event.textContent == CORE.Votation[j].lisoptions[i])
            {
                CORE.Votation[j].votlist[i] += 1;  
            }
        }
        writeNewDatavotation(j, "votlist", CORE.Votation[j].votlist)
    }, 
    idChangeToDelate: function(event)
    {
        var id = event.name.substring(6,event.name.length); 
        var indide= false;         
        var db = firebase.database();
        var leg = CORE.Votation.length; 
        for(var i=0; i< leg; i++){
            if(indide){
                var keyoth = CORE.Votation[i].key;
                CORE.Votation[i].id -=1; 
                db.ref("Votation/"+keyoth+"/id").set(CORE.Votation[i].id);
            }
            if(CORE.Votation[i].id == id){
                var k = CORE.Votation[i].key; 
                indide = true; 
                id = -1; 
            }
        }
        
        db.ref("Votation/"+k).remove();
        document.location.reload();
        
    },
    delateAsistant: function(event)
    {
        if (confirm('Vas a borrar un asistente')) {
            delateasistentEvenDB(event); 
            document.location.reload();
        }
    }, 

    delateEvent: function(event)
    {
        let person = prompt("Contraseña para borrar:", "");
        if (person == CORE.paswordEliminar) {
            delateEvenDB(event); 
            document.location.reload();
        }
       
    },
    
    // https://es.stackoverflow.com/questions/259945/ordenar-ul-javascript
    ordenarLista: function(idUl){
        //Obtenemos el elemento ul
        let ul = document.getElementById(idUl);    
        //Obtenemos la lista de li
        let lista = ul.getElementsByTagName("li");
        //Creamos el array a partir de los elementos li
        //A continuación ordenamos con sort (hay que ordenar mirando el textContent y evitando la etiqueta li
        //Por último recorremos el array ya ordenado y vamos haciendo el append en el elemento ul (sobrescribiéndolo)
        let arrayCanciones = Array.from(lista);
        arrayCanciones.sort((a, b) => a.textContent.localeCompare(b.textContent))
        .forEach(li => ul.appendChild(li));
       
    },
    ordenarEventDate: function()
    {
        var listDate = []; 

        for (var i =0; i< CORE.DicEvents.length; i++)
        {
            var dateOrdnear = CORE.DicEvents[i].date; 
            var indexBar = dateOrdnear.indexOf('-'); 
            var year = dateOrdnear.substring(0, indexBar);
            dateOrdnear = dateOrdnear.replace(dateOrdnear.substring(0,indexBar+1),'');
            var indexBar = dateOrdnear.indexOf('-'); 
            var mes = dateOrdnear.substring(0, indexBar);
            var dia = dateOrdnear.substring(indexBar+1, dateOrdnear.length);
            dateOrdnear = mes+'/'+dia+'/'+year; 

            var time = CORE.DicEvents[i].hour;
            var timeParts = time.split(":");
            var milisegHour =(+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000);
       
            listDate.push(Date.parse(dateOrdnear)+milisegHour); 
        }
        listDate = Array.from(listDate);
        listDate.sort(); 

         var listOrdenarId = []; 
         for(var i =0; i<CORE.DicEvents.length; i++)
         {
            var inside = false; 
            var dateOrdnear = CORE.DicEvents[i].date; 
            var indexBar = dateOrdnear.indexOf('-'); 
            var year = dateOrdnear.substring(0, indexBar);
            dateOrdnear = dateOrdnear.replace(dateOrdnear.substring(0,indexBar+1),'');
            var indexBar = dateOrdnear.indexOf('-'); 
            var mes = dateOrdnear.substring(0, indexBar);
            var dia = dateOrdnear.substring(indexBar+1, dateOrdnear.length);
            dateOrdnear = mes+'/'+dia+'/'+year; 
       
            var time = CORE.DicEvents[i].hour;
            var timeParts = time.split(":");
            var milisegHour =(+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000);
            dateOrdnear = Date.parse(dateOrdnear) +milisegHour; 

            for(var j =0; j<CORE.DicEvents.length; j++)
            {
                if(dateOrdnear == listDate[j] && !inside && !listOrdenarId[j])
                {
                    listOrdenarId[j]= CORE.DicEvents[i].id; 
                    inside = true; 
                }
            }
         }

         var parent = document.getElementById('AddEvents');
         parent.innerHTML = "";
         var OrdenarDiv = []; 
         for(var i =0; i< listOrdenarId.length; i++)
         {
             for(var j=0; j<CORE.DicEvents.length; j++)
             {
                 if(CORE.DicEvents[j].id==listOrdenarId[i]){
                    GFX.printEvent(j); 
                    OrdenarDiv.push(CORE.DicEvents[j]); 
                }
             }
         }
         CORE.DicEvents = OrdenarDiv;
         delatenodeDBforTime(); 
    }, 
    saveImageUpload:function(downloadURL)
    {
        CORE.imageUploadURL = downloadURL; 
    }, 
    copyInfoAgenda: function()
    {
        var message= String.fromCodePoint(0x1F308) +" AGENDA " + String.fromCodePoint(0x1F308) +"\n"; 
        for(var i=0; i< CORE.DicEvents.length; i++)
        {
            message += "*"+LOGIC.spaceTitle(CORE.DicEvents[i].title) + "* " + CORE.DicEvents[i].date + " hasta " + CORE.DicEvents[i].dateFin +"\n"; 
        }
        GFX.togglePopupShareAgenda(); 
        GFX.ShowAgenda(message); 
    }, 
    DatetoString: function(date)
    {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); 
        var yyyy = date.getFullYear();

        var StringDate = yyyy+ '-'+ mm + '-' + dd;

        return StringDate; 
    }, 
    spaceTitle: function(title)
    {
        if(title[title.length-1] == ' ')
            title = title.substring(0, title.length-1);
        if(title[0] ==' ')
            title = title.substring(1, title.length);
        return title; 
    }, 
    sshareEvent: function(ss)
    {
        var TitleEvent= ""; 
        var imageEvent= ""; 
        var DateInitEvent = ""; 
        var DateFinishEvent = "";
        var HourEvent = "";  
        var ContentEvent = "";  

        for(var i =0; i< CORE.DicEvents.length; i++)
        {
            if(CORE.DicEvents[i].id == ss.name)
            {
                TitleEvent = LOGIC.spaceTitle(CORE.DicEvents[i].title); 
                imageEvent = CORE.DicEvents[i].image; 

                //Quitar img/ ... .png
                if(imageEvent.indexOf("img/")!=-1)
                    imageEvent = imageEvent.substring(4, imageEvent.length-4);
        
                DateInitEvent =  new Date(CORE.DicEvents[i].date); 
                DateFinishEvent = new Date(CORE.DicEvents[i].dateFin); 
                HourEvent = CORE.DicEvents[i].hour; 
                ContentEvent = CORE.DicEvents[i].content;   
                break; 
            }
        }
        var StringCopyPortapapeles= "*"+TitleEvent+"* \nFecha: "+ DateInitEvent.toLocaleDateString("es-ES")+ "-"+ DateFinishEvent.toLocaleDateString("es-ES") +" Hora: "+ HourEvent+ "\n"+ ContentEvent +"\n"+ imageEvent; 
        var div = document.createElement("div");
        StringCopyPortapapeles = LOGIC.URLify(StringCopyPortapapeles); 
        div.innerHTML = StringCopyPortapapeles;
        StringCopyPortapapeles = div.textContent || div.innerText || "";
        StringCopyPortapapeles += "\nPara más información entra en la web: https://girls-bcn.web.app/ "; 

        const el = document.createElement('textarea');
        el.value = StringCopyPortapapeles;	//str is your string to copy
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');	// Copy command
        alert("Copiado portapapeles");

    },
    //Borrar <a href= ... </a> para http.....com
    URLify: function(string){
        var urls = string.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)/g);
        var linkA = string.match(/<a(.*?)<\/a>/g);
        if(urls != null && linkA!= null)
        {
            for(var i =0; i< urls.length; i++)
            {
                string = string.replace(linkA[i],  urls[i]);
            }
        }
        
        return string;
    }, 
    seeReadMore: function(event)
    {
        var id = event.id.substring("ReadMoreDescripction".length, event.id.length);
        var dots = document.getElementById("dots"+id);
        var moreText = document.getElementById("more"+id);
        var btnText = document.getElementById("ReadMoreDescripction"+id);
        if(dots){
            if (dots.style.display === "none") {
                dots.style.display = "inline";
                btnText.innerHTML = "Leer más"; 
                moreText.style.display = "none";
            } else {
                dots.style.display = "none";
                btnText.innerHTML = "Leer menos";
                moreText.style.display = "inline";
            // if(moreText.style.display == "none") 
            //     moreText.style.display = "";
            // else
            //     moreText.style.display = "none"
            }
        }
    },
    // cambiarIDIfRepite: function()
    // {
        
    //     for(var i=0; i<CORE.DicEvents.length; i++)
    //     {

    //     }
    // }
    
}; 
CORE.modules.push(LOGIC); 

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
    // modVotation: function(options,votlist)
    // {
        
        // }, 
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
       
            listDate.push(Date.parse(dateOrdnear)); 
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
       
            dateOrdnear = Date.parse(dateOrdnear); 
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
         for(var i =0; i< listOrdenarId.length; i++)
         {
             for(var j=0; j<CORE.DicEvents.length; j++)
             {
                 if(CORE.DicEvents[j].id==listOrdenarId[i])
                    GFX.printEvent(j); 
             }
         }
    }
}; 
CORE.modules.push(LOGIC); 
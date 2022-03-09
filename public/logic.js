
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
    }, 
    writtenVotation:function()
    {
        this.saveDBvotation(); 
        //DB  
        var data = CORE.Votation[CORE.Votation.length-1]
        insertData(data, "Votation"); 
    }, 
    saveDB: function()
    {
        var data = CORE.DicEvents[CORE.DicEvents.length-1]; 
        insertData(data, "Eventos"); 
    }, 
    saveDBvotation: function()
    {
        var listOptions = []; 
        for(var i=1; i<CORE.contvoationactual+1; i++)
        {
            var inputs = document.querySelector("#Input"+i); 
            listOptions.push(inputs.value); 
        }
        var auxVotation = new Votation(CORE.Votation.length, document.querySelector("#nameVotationOverlay").value, listOptions); 
       CORE.Votation[CORE.Votation.length] = auxVotation; 
        
    },
    //Ordenar lista en funcion de la fecha
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
    //obtener info de la votacion o de la idea 
    InfoVotationElement: function(element)
    {
        if(element){
            var id = element.id.substring(8, element.id.length);

            for (var i = 0; i < CORE.Votation.length; i++)
            {
                if(id == CORE.Votation[i].id)
                {
                    var options = CORE.Votation[i].lisoptions; 
                    GFX.addButtonOptionVotation(CORE.Votation[i].name, options); 
                    //Modificar DB 
                }
            }
        }
        else //borrar hijos de overlay remove
            GFX.removeChildOverlay(); 
            
    }



}; 
CORE.modules.push(LOGIC); 
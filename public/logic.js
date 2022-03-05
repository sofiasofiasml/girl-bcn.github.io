
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
    saveDB: function()
    {
        var data = CORE.DicEvents[CORE.DicEvents.length-1]; 
        insertData(data, "Eventos"); 
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
       
    }


}; 
CORE.modules.push(LOGIC); 
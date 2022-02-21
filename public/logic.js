
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
        if(CORE.addEventVotation){
            var VotacionesNew =  document.createElement("a");
            VotacionesNew.classList.add("votacion");
            VotacionesNew.setAttribute("onclick", "GFX.togglePopupVotacion()");
            VotacionesNew.innerText=CORE.nameNewEvent.value;
            var li =  document.createElement("li");
            li.appendChild(VotacionesNew); 
            CORE.navUl.appendChild(li); 
        }
    }


}; 
CORE.modules.push(LOGIC); 
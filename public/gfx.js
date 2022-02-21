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
    }
}

CORE.modules.push(GFX); 

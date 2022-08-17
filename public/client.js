var CLIENT =
{
    init: function(server)
    {
        this.server = server; 
        //this.server.onmessage = this.processMessage.bind(this); 
    }, 
    //cada vez que llega un mensaje del servidor
    processMessage: function(e)
    {
        //Con el bind ahora this es client, sino seria el socket

    }
}

CORE.modules.push(CLIENT); 

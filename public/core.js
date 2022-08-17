//Todo accesible global, todo lo importante de la app (MODEL)
ClassicEditor
    .create( document.querySelector( '#NewEventDescription' ), {
        toolbar: [ ],
        
        link: {
            defaultProtocol: 'http://'
            
        }
    } )
.then(  )
.catch( error =>{console.error(error)
} );



var CORE = 
{
    //state of app
    initDB: true, 
    initDBVot: true, 
    server: null, 
    canvas: null, 
    modules: [],
    mouse_pos :[0,0],
    keys: {},
    contvoationactual:0, 
    overlayactive: 0, 
    //settings
    server_url:  "ws://localhost:9001", 
    addEvents: "", 
    addEventVotation: false, 
    nameNewEvent: "Prueba", 
    navUl: "", 
    DicEvents: [],
    Votation:[],
    imageUploadURL: "", 
    arrayID: {}, 
    imageokupload: true, 
    paswordEliminar:"EliminarEvento",
    //calendarEvents: [], 
    calendarDiv: "", 
    init: function()
    {
        this.last_time = performance.now(); 
        //this.canvas = document.querySelector("canvas");
        //this.server = new WebSocket(server_url); 

        CLIENT.init(this.server); 
        GFX.init(); 
        WORLD.init(); 
        LOGIC.init(); 
        //bind events
        document.body.addEventListener("keydown", this.onKey.bind(this)); 
        document.body.addEventListener("keyup", this.onKey.bind(this)); 
        document.body.addEventListener("mousedown", this.onMouse.bind(this)); 
        document.body.addEventListener("keydown", this.onMouse.bind(this)); 
        document.body.addEventListener("keydown", this.onMouse.bind(this)); 
        document.body.addEventListener("keydown", this.onMouse.bind(this)); 
        this.nameNewEvent = document.querySelector("input#nameUser"); 
        this.addEvents = document.querySelector("#AddEvents"); 
        this.navUl = document.querySelector("nav ul"); 
        //this.loop();
        this.draw(); 
        GFX.printOut("NOVEDAD: VÍDEO Y PODCASTS EN LA SECCIÓN REVISTA ");
        
    }, 

    onKey:  function(event)
    {
        //process key 
        this.keys[event.key] = event.type == "keydown" ? true: false; 

        if(event.key == "F1")
        {
            event.preventDefault(); 
        }

        for(var i =0; i< this.modules.length; i++)
        {
            var modules = this.modules[i]; 
            if (modules.onKey)
                modules.onKey(); 
        }

    }, 

    onMouse: function(e)
    {
        //var rect = this.canvas.getBoundingClientRect(); 
        // var canvasx = this.mouse_pos[0] = e.clientX - rect.left; 
        // var canvasy = this.mouse_pos[1] = e.clientY - rect.top;
        // if(e.type == "mousedown")
        // {

        // }
        // else if(e.type == "mousemove")
        // {

        // } 
        // else //mousup
        // {

        // }
    }, 

    // loop: function()
    // {
    //     this.draw(); 

    //     var now = performance.now(); 
    //     var elapsed_time = (now - this.last_time)/ 1000; 

    //     this.last_time = now; 
    //     this.update(elapsed_time); 
    //     requestAnimationFrame(this.loop.bind(this)); 

    // },

    draw: function()
    {
        for(var i =0; i< this.modules.length; i++)
        {
            var modules = this.modules[i]; 
            if (modules.draw)
                modules.draw(); 
        }
    }, 
    update: function(dt)
    {
        for(var i =0; i< this.modules.length; i++)
        {
            var modules = this.modules[i]; 
            if (modules.update)
                modules.update(dt); 
        }
    }
    
}
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
    idEdit: -1, 
    editors : {},
    des_Horosc: ['1. Aries amigo',
    '2.',
     '3.',
      '4.',
      '5.','6.','7.', '8.', '9.', '10.', '11.', '12.'], 
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
         //CORE.ReadJson("./des_Horoscopo.json"); 
        //this.loop();
        this.draw(); 
        GFX.printOut("NOVEDAD: VÍDEO Y PODCASTS EN LA SECCIÓN REVISTA ");
        //CKeditor
        CORE.createEditor( 'NewEventDescription' );
        CORE.createEditor( 'NewEventEditDescription' );
    }, 
    // ReadJson: function(fichero)
    // {
    //     // var results= fetch(fichero).then(function (resp){return resp.json()}).then(console.log)
    //     // return results; 
    //     let response =  fetch(fichero); 
    //     if (response.ok) { // si el HTTP-status es 200-299
    //         // obtener cuerpo de la respuesta (método debajo)
    //         let json =  response.json();
    //       } else {
    //         alert("Error-HTTP: " + response.status);
    //       }
    // },
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
    createEditor:function( elementId ) { 
        return ClassicEditor 
        .create( document.getElementById( elementId ), {
                    toolbar: [ ],
                    
                    link: {
                        defaultProtocol: 'http://'
                        
                    }
                } ) 
        .then( editor => { CORE.editors[ elementId ] = editor; } ) 
        .catch( err => console.error( err.stack ) );
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
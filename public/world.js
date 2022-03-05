//Los datos de la appliación 
//CLASS USER
class User {
    constructor(name, id) {
        this.id = id; 
        this.name = name;
    }
}
//Info del servidor
User.prototype.fromJSON = function(json)
{
    this.id = json.id; 
    this.name = json.name;
}
//enviar info al servidor
User.prototype.toJSON = function()
{
    return{
        id: this.id, 
        name: this.name
    }
}

class News {
    constructor(id, title, image, content, date, hour, votation) {
        this.id = id, 
        this.title = title, 
        this.image = image, 
        this.content = content, 
        this.date = date, 
        this.hour = hour, 
        this.votation = votation
    }
}


//Info del servidor
News.prototype.fromJSON = function(json)
{
    this.id = json.id, 
    this.title = json.title, 
    this.image = json.image, 
    this.content = json.content, 
    this.date = json.date, 
    this.hour = json.hour, 
    this.votation = json.votation
}
//enviar info al servidor
News.prototype.toJSON = function()
{
    return{
        id: this.id, 
        title: this.title, 
        image: this.image, 
        content: this.content, 
        date: this.date, 
        hour: this.hour, 
        votation: this.votation
    }
}
var WORLD={
    news_l: [], 
    users: [], 
    nameUser: document.querySelector("#nameUser"), 
    id: 0, 
    init: function()
    {
        // this.loadWorld(demo); 
    },

    createUser: function()
    {
        id +=1; 
        var user = new User(this.nameUser, this.id);
        this.users.push(user); 
        return user; 
    },

    loadWorld: function(json)
    {
        for(var i =0; i<json.user.length; i++)
        {
            var name_json = json.user[i]; 
            var user = new User(name_json, i); 
            user.fromJSON(user); 
            this.users.push(user); 
        }

        for(var i =0; i<json.new.length; i++)
        {
            var new_json = json.new[i]; 
            var news = new News(i, new_json.title, new_json.image, new_json.content, new_json.date, new_json.votation); 
            news.fromJSON(news); 
            this.news_l.push(news); 
        }
    }
}; 

CORE.modules.push(WORLD); 

const posts = []
const url = "http://www.mirales.es/category/cultura-entretenimiento";
const baseUrl = "https://www.mirales.es"
// Get HTML from page
 
 
 
$.get(url, function (html) {
    // Loop through elements you want to scrape content from
    $(html).find("article.section-post-teaser-full").each( (idx, el) =>{
        const post = { link: "", title: "" , image:""};
        post.link = baseUrl + $(el).children("h3.article-title").children("a").attr('href');
        post.title = $(el).children("h3.article-title").children("a").children("span").text();
        post.image = baseUrl+ $(el).children("div.article-image-overlay")[0].style.backgroundImage.slice(4, -1).replace(/"/g, ""); 
        posts.push(post);
        var text = $(this).text();
         
    })
    console.log(posts);
});


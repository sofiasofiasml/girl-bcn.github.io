// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
//import axios from 'axios';
import fetch from 'node-fetch';
import { load } from 'cheerio';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// URL of the page we want to scrape
const url = "https://www.mirales.es/category/cultura-entretenimiento";
const baseUrl = "https://www.mirales.es"

// Async function which scrapes the data
async function scrapeData() {
    try {
        // Fetch HTML of the page we want to scrape
        const response = await fetch(url);
        const body = await response.text();

        //console.log(body);
        let $ = load(body);
        //console.log($);
        // Load HTML we fetched in the previous line
        // Select all the list items in plainlist class
        //const listItems = $(".plainlist ul li");
        const listItems = $(".article-title");
        //console.log(listItems);
        // Stores data for all posts
        const posts = [];
        // Use .each method to loop through the li we selected
        listItems.each((idx, el) => {
            // Object holding data for each post/jurisdiction
            const post = { link: "", title: "" };
            // Select the text content of a and span elements
            // Store the textcontent in the above object
            post.link = baseUrl + $(el).children("a").attr('href');
            post.title = $(el).children("a").children("span").text();
            // Populate posts array with post data
            posts.push(post);
        });
        // Logs posts array to the console
        console.dir(posts);
        // Write posts array in posts.json file

    } catch (err) {
        console.error(err);
    }
}
// Invoke the above function
scrapeData();
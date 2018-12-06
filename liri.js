// dotenv loads from env file, allowing for obfuscated keys
require('dotenv').config();

// loading in my keys, axios for i/o, spotify,inquire, request, moment and fs
const keys = require('./keys');
const axios = require('axios');
const Spotify = require('node-spotify-api');
const request = require('request');
const moment = require('moment');
const fs = require('fs');
const inquirer = require('inquirer');

// adding keys to spotify.
let spotify = new Spotify(keys.spotify);


var liriReq = process.argv[2];
var searchReq = "";
// Inquirer prompts, going to make it a choice type
inquirer.prompt([{
    type: 'list',
    name: 'command',
    message: 'What would you like to do?',
    choices: ['concert-this','spotify-this','movie-this','do-what-it-says'],


}])

if (liriReq === "concert-this"){

} else if (liriReq === "spotify-this-song"){

} else if (liriReq === "movie-this"){

} else if (liriReq === "do-what-it-says"){

} else {
    console.log("I DON'T UNDERSTAND!!!")
}

console.log(liriReq);
console.log(searchReq);



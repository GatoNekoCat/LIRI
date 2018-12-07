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

// This will hold the search request
var searchReq = "";

//This is called after the promise of searchWhat is fulfilled
function concertFunc(){
    axios.get("https://rest.bandsintown.com/artists/" + searchReq + "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log(response);
        
    });
};
// Inquirer prompts, going to make it a choice type
inquirer.prompt([{
    type: 'list',
    name: 'command',
    message: 'What would you like to do?',
    choices: ['concert-this','spotify-this','movie-this','do-what-it-says']
    },{
    type: 'input',
    name: 'value',
    message: 'Enter a name:'
    
    
}]).then(function(inquirerResponse){
    var whatDidYouExpectIWonderPeriodToSaveSomeTimeTypingByStoringTheResponseInAVariableIThinkNot = inquirerResponse.command;
    var promptValueToSearch = inquirerResponse.value.split(" ").join("%20");
    console.log(promptValueToSearch);
if (whatDidYouExpectIWonderPeriodToSaveSomeTimeTypingByStoringTheResponseInAVariableIThinkNot === "concert-this"){
    axios.get('https://rest.bandsintown.com/artists/' + promptValueToSearch + '/events?app_id=codingbootcamp&date=upcoming').then(
        function(response){
            var jsonData = response.data;

            jsonData.forEach(e => {  

            var venuData = [
                "----------------------------------------",
                "Venue: " + e.venue.name,
                "Location: " + e.venue.city + " " + e.venue.region + " " + e.venue.country,
                "----------------------------------------",


            ].join("\n\n");
            console.log(venuData);
            fs.appendFile("log.txt", venuData,(error) => {})
            });

            
            // console.log(jsonData);
        }
        
    )

} else if (whatDidYouExpectIWonderPeriodToSaveSomeTimeTypingByStoringTheResponseInAVariableIThinkNot === "spotify-this-song"){

} else if (whatDidYouExpectIWonderPeriodToSaveSomeTimeTypingByStoringTheResponseInAVariableIThinkNot === "movie-this"){

} else if (whatDidYouExpectIWonderPeriodToSaveSomeTimeTypingByStoringTheResponseInAVariableIThinkNot === "do-what-it-says"){

} else {
    console.log("I DON'T UNDERSTAND!!!")
}

});
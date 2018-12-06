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
// boolean to check if search value has 
var searchFlag = false;
function searchWhat(){
    
    inquirer.prompt([{
        type: 'input',
        name: 'userInput',
        message: 'What would you like to look up?',

    }]).then(function(inquirerResponse){
        searchReq = inquirerResponse.userInput;
        searchFlag = true;

    })
};
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
    choices: ['concert-this','spotify-this','movie-this','do-what-it-says'],
    
}]).then(function(inquirerResponse){
    var whatDidYouExpectIWonderPeriodToSaveSomeTimeTypingByStoringTheResponseInAVariableIThinkNot = inquirerResponse.command;


if (whatDidYouExpectIWonderPeriodToSaveSomeTimeTypingByStoringTheResponseInAVariableIThinkNot === "concert-this"){
    do {
        searchWhat();
    } while(!searchFlag)

    if (searchFlag === true) {
         concertFunc();
        };

} else if (whatDidYouExpectIWonderPeriodToSaveSomeTimeTypingByStoringTheResponseInAVariableIThinkNot === "spotify-this-song"){
    searchWhat();

} else if (whatDidYouExpectIWonderPeriodToSaveSomeTimeTypingByStoringTheResponseInAVariableIThinkNot === "movie-this"){
    searchWhat();

} else if (whatDidYouExpectIWonderPeriodToSaveSomeTimeTypingByStoringTheResponseInAVariableIThinkNot === "do-what-it-says"){

} else {
    console.log("I DON'T UNDERSTAND!!!")
}

});

// console.log(liriReq);
// console.log(searchReq);



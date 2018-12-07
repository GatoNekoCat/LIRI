// dotenv loads from env file, allowing for obfuscated keys
require('dotenv').config();

// loading in my keys, axios for i/o, spotify,inquire, request, moment and fs
const keys = require('./keys');
const axios = require('axios');
const Spotify = require('node-spotify-api');
const moment = require('moment');
const fs = require('fs');
const inquirer = require('inquirer');

// adding keys to spotify.
let spotify = new Spotify(keys.spotify);

// This will hold the search request
var searchReq = "";

//This is called after the promise of searchWhat is fulfilled
function concertFunc() {
    axios.get("https://rest.bandsintown.com/artists/" + searchReq + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log(response);

        });
};
// Inquirer prompts, going to make it a choice type
inquirer.prompt([{
    type: 'list',
    name: 'command',
    message: 'What would you like to do?',
    choices: ['concert-this', 'spotify-this', 'movie-this', 'do-what-it-says']
}, {
    type: 'input',
    name: 'value',
    message: 'Enter a name:'


}]).then(function (inquirerResponse) {
    var responseCommand = inquirerResponse.command;
    var promptValue = inquirerResponse.value;
    // console.log('this here is the inquirerValue' + promptValue);

    switch (responseCommand) {
        case 'concert-this':
            promptValue.split(" ").join("%20")
            axios.get('https://rest.bandsintown.com/artists/' + promptValue + '/events?app_id=codingbootcamp&date=upcoming').then(
                function (response) {
                    var jsonData = response.data;

                    jsonData.forEach(e => {

                        var venuData = [
                            "----------------------------------------",
                            "Venue: " + e.venue.name,
                            "Location: " + e.venue.city + " " + e.venue.region + " " + e.venue.country,
                            "Date: " + e.datetime,
                            "----------------------------------------",


                        ].join("\n\n");
                        console.log(venuData);
                        fs.appendFile("log.txt", venuData, (error) => { })
                    });

                }

            )
            break;

        case 'spotify-this':

            spotify.search({ type: 'track', query: promptValue }, function (err, apiData) {
                if (err) {
                    return console.log('Error Has occured: ' + err);
                }
                var songs = apiData.tracks.items;


                for (let i = 0; i < songs.length; i++) {
                    console.log("Number: ", i, "/", songs.length);
                    // console.log("Artist(s): ", songs[i].artists.map(getArtistName));
                    console.log("Song Name: ", songs[i].name);
                    console.log("Preview URL: ", songs[i].preview_url);
                    console.log("Album: ", songs[i].album.name);
                    console.log("--------------------------------");
                }

                const trackData = apiData.tracks.items[0];
                var songData = [
                    "----------------------------------------",
                    trackData.name,
                    "Song By: " + trackData.artists[0].name,
                    "Album: " + trackData.album.name,
                    "----------------------------------------",

                ]
                fs.appendFile("log.txt", songData, (error) => { });
                // console.log(songData);
            })
            break;

        case 'movie-this':
            getMovie(promptValue);
            break;
        case 'do-what-it-says':
            followFileCommands(promptValue);
            break;
        default:
            console.log("LIRI doesn't know that command, please try again.");

    };


});

function getMovie(movie){
    if (movie === undefined || movie === " ") {
        movie = 'Fargo';
    };
    movie.split(" ").join("+");

    const queryURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy';
    axios.get(queryURL).then(function(result){
        // console.log(result);
        console.log('Title: ' + result.data.Title);
        console.log('Rated: ' + result.data.Rated);
        console.log('Year: ' + result.data.Year);
        console.log('IMDB Rating: ' + result.data.imdbRating);
        console.log('Country: ' + result.data.Country);
        console.log('Language: ' + result.data.Language);
        console.log('Plot: ' + result.data.Plot);
        console.log('Actors: ' + result.data.Actors);
        console.log("------------------------------------------------");
    });

}

function followFileCommands (fileToRead) {
    fs.readFile(fileToRead,"utf8",(err,data)=>{
        if(err)throw err;

        var readData = data;
        console.log(readData);
    })
}
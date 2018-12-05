// dotenv loads from env file, allowing for obfuscated keys
require('dotenv').config();


const keys = require('./keys');

const axios = require('axios');

const Spotify = require('node-spotify-api');

const request = require('request');

const moment = require('moment');

const fs = require('fs');

let spotify = new Spotify(key.spotify);

var liriReq = process.argv[2];

console.log(liriReq);



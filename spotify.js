var Spotify = require("dotenv").config;
var keys = require("./keys.js");

var search = function ()
{   // var spotify = new Spotify (keys.spotify);
    console.log ("spotify.search ()");
}

module.exports.search = search;

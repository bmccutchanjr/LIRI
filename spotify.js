var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const log = require("./log.js");                           // log file module

 
function printArtists (artists)
{   // The cast list is a comma delimited string

    for (var i=0; i<artists.length; i++)
    {   log.output ("     " + artists[i].name);
    }
}

function printTrack (track)
{   // This data doesn't seem to apply to a single line of text as much as the Bands In Town search, so
    // output several lines to make the results a little more readable. That also means this function will
    // output data, and not return it to search()
    
    log.output ("==============================");
    log.output (track.name + " is on the album " + track.album.name);
    log.output ("featuring: ");
    printArtists (track.artists);
    log.output ("You can hear this song here: " + track.external_urls.spotify);
}

function search (what = "The Sign")
{   // Search Spotify

    log.output ("Searching Spotify for " + what);

    var spotify = new Spotify(
    {   id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
 
    spotify.search(
        {   type: "track",
            query: what,
            limit: 1
        }, function(err, data)
    {
        if (err)
        {   log.output("an error occured");

            console.log('Error occurred: ' + err);;
            return;
        }
 
        data.tracks.items.forEach (function (myData)
        {
// console.log (myData);
console.log (myData.artists[0].name);
console.log (myData.name);
console.log (myData.external_urls.spotify);
console.log (myData.album.name);
printTrack (myData);
        });
    });
}

module.exports.search = search;

const bandsintown = require('bandsintown')("codingbootcamp");
const log = require("./log.js");                           // log file module
const moment = require("moment");                          // DateFNS

function formatEvent (event)
{   // Create a text string with the data we want for this event

    var returnText = event.datetime + " in " +
                     event.venue.city + ", " + event.venue.country + "  at " + 
                     event.venue.name;
    return returnText;
}

var search = function (...params)
{   // Search Bands In Town for concert information for the indicated band / artist

    bandsintown
    .getArtistEventList('Joe Bonamassa')
    .then(function(events)
    {   // events is an array of objects...build an output string with the information we want

        // var allEvents = [];
        events.forEach (function (event)
        {   log.output (formatEvent(event));
        });
    })
    .catch (function (error)
    {   console.log ("error: ", error);
    });
}

module.exports.search = search;

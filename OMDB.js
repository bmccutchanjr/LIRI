var request = require("request");
const log = require("./log.js");                           // log file module

function printCast (cast)
{   // The cast list is a comma delimited string

    var actors = cast.split (",");

    for (var i=0; i<actors.length; i++)
    {   log.output ("     " + actors[i].trim());
    }
}

function printRating (ratings)
{
    for (var i=0; i<ratings.length; i++)
    {   log.output ("     " + ratings[i].Source  + ": " + ratings[i].Value);
    }
}

function formatMovie (movie)
{   // This data doesn't seem to apply to a single line of text as much as the Bands In Town search, so
    // output several lines to make the results a little more readable. That also means this function will
    // output data, and not return it to search()
    
    log.output ("==============================");
    log.output (movie.Title);
    log.output (movie.Plot);
    log.output ("starring: ");
    printCast (movie.Actors);
    log.output ("rating: ");
    printRating (movie.Ratings);
    log.output ("released in: " + movie.Country + " in " + movie.Year);
    log.output (movie.Language);
}

var search = function (what = "Mr. Nobody")
{   // Search OMDB for data on the indicated movie.  Searches are by title.

    log.output ("Searching OMDB for " + what);

    var url = "https://www.omdbapi.com/?t=" + what + "&incTomatoes&apikey=78d19ea8";
    request(url, function(error, response, body)
    {   if(!error && response.statusCode == 200)
        {   // No errors and we have data...

            formatMovie (JSON.parse(body));
        }
        else console.log (error);
    });
}

module.exports.search = search;
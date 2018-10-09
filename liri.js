// import code for dependencies
// starting with my modules to implement API searches
const bandsInTown = require("./bandsintown.js");            // Bands in Town module
const omdb = require("./omdb.js");                          // OMDB module
const spotify = require ("./spotify.js");                   // Spotify module

// and then get these additional modules needed for this app
const fs = require("fs");                                   // Node's file system module
const log = require("./log.js");                            // log file module
const inquirer = require("inquirer");                       // interactive prompt

var commands = ["concert-this",
                "do-what-it-says",
                "movie-this",
                "spotify-this-song"
               ];

function concatSearch (search)
{   // Concatenate all of the command line parameters to form the search terms

    var searchFor = "";
    for (var i=0; i<search.length; i++)
    {   searchFor += search[i];
        if (i<(search.length - 1)) searchFor += " ";
    }

    return searchFor;
}

function executeSearch (command, search)
{   // execute the appropriate search command

    log.output ("\n==============================\nLIRI\n==============================");
        
    if (command === "concert-this")
    {   bandsInTown.search (search)
    }
    else
    if (command === "do-what-it-says")
    {   randomSearch ();
    }
    else
    if (command === "movie-this")
    {   omdb.search (search);
    }
    else
    if (command === "spotify-this-song")
    {   spotify.search (search);
    }
}

function randomSearch ()
{   // Read the contents of random.txt and parse it into an array of objects.  These objects contain the
    // LIRIcommand and search terms for random searches.

    fs.readFile ("random.txt", "utf8", function (error, data)
    {   
        if (error) console.log ("error: ", error);
        else
        {   // Make an array of strings from the data returned, split the data on "\r\n"

            var commands = data.split ("\r\n");

            var cLength = commands.length;

            // parse the individual elements of the array and create an object with two properties:
            // 'command' and 'what'

            for (var i=0; i<cLength; i++)
            {   var parts = commands[i].split (",");
                if (parts[1])
                {
                    var pLength = parts[1].length;
                    parts[1] = parts[1].substring (1, pLength - 1);
                    var obj = 
                    {   "command":  parts[0],
                        "what": parts[1]
                    }
        
                    // put the object bak into the array
                    commands[i] = obj;
                }
            }

            // randomly select one of the elements of the array, and return it...
            var randomIndex = Math.floor(Math.random() * commands.length);
            executeSearch (commands[randomIndex].command, commands[randomIndex].what);
        }
    })
}

var argLength = process.argv.length;
var commandToPerform = "";

if (argLength === 2)
{   // LIRI was called without command line parameters.  Perform some random search...
//     var doWhat = random.random ();
// console.log (doWhat);
// 
//     executeSearch (doWhat.command, doWhat.what);
    randomSearch ();
}
else
{   // Okay, LIRI was called with command line parameters.  But that doesn't mean those parameters include a
    // valid LIRI command

    var argv2 = process.argv [2].toLowerCase();
    if (commands.indexOf (argv2) > -1)
    {   // A valid command was passed to LIRI on the command line...so we'll do that

        log.output ("LIRI says 'Okay, I will " + argv2);

        var searchTerms = "";

        if (process.argv.length > 3)
        {   // More than one parameter was passed from the command line.  All parameters after index 2
            // can be assumed to be the search terms

            executeSearch (argv2, concatSearch(process.argv.slice(3)));
        }
        else
        {   // No search terms were provided...perform the default search

            executeSearch (argv2);
        }
    }
}
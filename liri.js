// import code for dependencies

// required for Bands In Town
const bandsInTown = require("./bandsintown.js");            // Bands in Town module

// required for OMDB
const omdb = require("./omdb.js");                          // OMDB module

// required for Spotify
// const env = require ("dotenv").config();                 // environment variables
// const keys = require ("./keys.js");                      // Spotify API keys
// var spotify = require ("./spotify.js");                 // Spotify module
// // spotify.search ();

// import additional modules needed for this app
// const fs = require("fs");                                // file stream
const log = require("./log.js");                           // log file module
// var moment = require("moment");                        // DateFNS
const inquirer = require("inquirer");                    // interactive prompt

var commands = ["concert-this",
                "do-what-it-says",
                "movie-this",
                "spotify-this-song"
               ];

// function output (text)
// {   // Receive a string of text and output to the console and log file.  It is the responsibility of the
//     // function that calls output to format the text.
// 
//     console.log (text);
//     fs.appendFileSync ("LIRI.log", text + "\n", function (error)
//     {   console.log ("LIRI says 'An error occured writing to the log file");
//     });
// }

function doWhat ()
{   // prompt the user for action to perform

    inquirer
    .prompt (
    {   type:    "list",
        name:    "command",
        message: "What do you want me to do?",
        choices: commands
    })
    .then (function (answer)
    {   log.output ("LIRI says, 'Okay, I will " + answer.command);

    })
    .catch (function (error)
    {   log.output ("==============================");
        log.output ("LIRI says: 'An error occured -- terminating");
        log.output ("==============================");
    });
}

function searchForWhat ()
{   // prompt the user for a search string

    inquirer
    .prompt (
    {   type:    "input",
        name:    "URL",
        message: "What do you want me to search for?",
        choices: commands
    })
    .then (function (answer)
    {   log.output ("LIRI says, 'Okay, I will " + answer.command);
    })
    .catch (function (error)
    {   log.output ("==============================");
        log.output ("LIRI says: 'An error occured -- terminating");
        log.output ("==============================");
        return;
    });
}

var argLength = process.argv.length;
var commandToPerform = "";

function executeSearch (command, ...search)
{   // execute the appropriate search command

    if (command === "concert-this")
    {   log.output ("\n==============================\nSearching Bands In Town for ");
//     var theEvents = bandsInTown.search ();
//     console.log (typeof theEvents);
// //         console.log ("returned ", theEvents.length);
bandsInTown.search ()
}
    else
    if (command === "movie-this") omdb.search ();
    else
    if (command === "spotify-this-song") spotify.search ();
}

if (argLength === 2)
{   // LIRI was called without command line parameters.  Prompt the user for the action to take...
    doWhat ();
    searchForWhat ();
}
else
{   // Okay, LIRI was called with command line parameters.  But that doesn't mean those parameters include a
    // valid LIRI command

    if (commands.indexOf (process.argv [2]) > -1)
    {   // A valid command was passed to LIRI on the command line...so we'll do that

        commandToPerform = process.argv[2];
        log.output ("LIRI says 'Okay, I will " + commandToPerform);

        executeSearch (commandToPerform);
    }
    else
    {   // LIRI was called with command line parameters,  but thise parameters do not represent a known
        // LIRI command.  Prompt the user for correct action to take...

        doWhat ();
    }
};
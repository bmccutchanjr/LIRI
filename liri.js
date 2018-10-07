// // import code for dependencies
// var bandsInTown = require("./bandsintown.js");          // Bands in Town API
// // bandsInTown.search ();
// var omdb = require("./omdb.js");                        // OMDB API
// // omdb.search ();
// var spotify = require ("./spotify.js");                 // Spotify API
// // spotify.search ();
// // import additional modules needed for this app
const fs = require("fs");                                // file stream
// var moment = require("moment");                        // DateFNS
const inquirer = require("inquirer");                    // interactive prompt

var commands = ["command",
                "concerts",
                "movies",
                "music"
               ];

function output (text)
{   // Receive a string of text and output to the console and log file.  It is the responsibility of the
    // function that calls output to format the text.

    console.log (text);
    fs.appendFileSync ("LIRI.log", text + "\n", function (error)
    {   console.log ("LIRI says 'An error occured writing to the log file");
    });
}

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
    {   output ("LIRI says, 'Okay, I will " + answer.command);

    })
    .catch (function (error)
    {   output ("==============================");
        output ("LIRI says: 'An error occured -- terminating");
        output ("==============================");
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
    {   output ("LIRI says, 'Okay, I will " + answer.command);
    })
    .catch (function (error)
    {   output ("==============================");
        output ("LIRI says: 'An error occured -- terminating");
        output ("==============================");
        return;
    });
}

var argLength = process.argv.length;
var commandToPerform = "";

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
        output ("LIRI says 'Okay, I will ", commandToPerfrom);
    }
    else
    {   // LIRI was called with command line parameters,  but thise parameters do not represent a known
        // LIRI command.  Prompt the user for correct action to take...

        doWhat ();
    }
};
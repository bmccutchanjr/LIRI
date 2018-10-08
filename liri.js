// import code for dependencies
// starting with my modules to implement API searches
const bandsInTown = require("./bandsintown.js");            // Bands in Town module
const omdb = require("./omdb.js");                          // OMDB module
const spotify = require ("./spotify.js");                   // Spotify module
// spotify.search ();

// and then get these additional modules needed for this app
const log = require("./log.js");                            // log file module
const inquirer = require("inquirer");                       // interactive prompt

var commands = ["concert-this",
                "do-what-it-says",
                "movie-this",
                "spotify-this-song"
               ];
function concatSearch (search)
{
    var searchFor = "";
    for (var i=0; i<search.length; i++)
    {   searchFor += search[i];
        if (i<(search.length - 1)) searchFor += " ";
    }
    return searchFor;
}

function executeSearch (command, search)
{   // execute the appropriate search command
               
    if (command === "concert-this")
    {   log.output ("\n==============================\nSearching Bands In Town for ");
        bandsInTown.search (search)
    }
    else
    if (command === "movie-this")
    {   log.output ("\n==============================\nSearching OMDB for ");
        omdb.search (search);
    }
    else
    if (command === "spotify-this-song")
    {   log.output ("\n==============================\nSearching Spotify for ");
        spotify.search ();
    }
}
               
function searchForWhat (command)
{   // prompt the user for a search string

    // The parameter passed to this function id the command to execute.  Because this prompt is an
    // asynchronous operation, the search cannot be executed from the calling function.  The search
    // has to be called from this function when the prompt is completed.
               
    inquirer               
    .prompt (
    {   type:    "input",
        name:    "search",
        message: "What do you want me to search for?",
    })
    .then (function (answer)
    {   log.output ("LIRI says, 'Okay, I will search for " + answer.search);
        executeSearch (command, answer.search);
    })
    .catch (function (error)
    {   log.output ("==============================");
        log.output ("LIRI says: 'An error occured -- terminating");
        log.output ("==============================");
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
    {   log.output ("LIRI says, 'Okay, I will " + answer.command);

        if (process.args.length === 2)
        {   // No parameters were passed from the command line, so prompt for search terms.
            searchForWhat (answer.command);
        }
    })
    .catch (function (error)
    {   log.output ("==============================");
        log.output ("LIRI says: 'An error occured -- terminating");
        log.output ("==============================");
    });
}

var argLength = process.argv.length;
var commandToPerform = "";

if (argLength === 2)
{   // LIRI was called without command line parameters.  Prompt the user for the action to take...
    doWhat ();
}
else
{   // Okay, LIRI was called with command line parameters.  But that doesn't mean those parameters include a
    // valid LIRI command

    if (commands.indexOf (process.argv [2].toLowerCase()) > -1)
    {   // A valid command was passed to LIRI on the command line...so we'll do that

        commandToPerform = process.argv[2].toLowerCase();
        log.output ("LIRI says 'Okay, I will " + commandToPerform);

        if (process.argv.length > 2)
        {   // More than one parameter was passed from the command line.  All parameters after index 2
            // can be assumed to be the search terms

            executeSearch (commandToPerform, concatSearch(process.argv.slice(3)));
        }
    }
    else
    {   // LIRI was called with command line parameters,  but thise parameters do not represent a known
        // LIRI command.  Prompt the user for correct action to take...

        doWhat ();

        // and assume the parameters were intended as the search terms instead...so execute the search
        executeSearch (commandToPerform, concatSearch(process.argv.slice(2)));

    }
};
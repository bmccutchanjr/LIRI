// import the NodeJS File Stream module
const fs = require("fs");

function output (text)
{   // Receive a string of text and output to the console and log file.  It is the responsibility of the
    // function that calls output to format the text.

    console.log (text);
    fs.appendFileSync ("LIRI.log", text + "\n", function (error)
    {   console.log ("LIRI says 'An error occured writing to the log file");
    });
}

module.exports.output = output;
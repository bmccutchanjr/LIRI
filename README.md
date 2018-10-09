# LIRI

LIRI is a command line application written in JavaScript and using NodeJS.  It is a simple application that takes several command line parameters and searches one of three API's for upcoming concert events (using Bands In Town), a movie synopsis (using OMDB) or data on a song (using Spotify).

The data retreived is output to the console screen and simultaneously to a log file (called LIRI.log).

This is a command line application.  There is no web page to view, but I do have a [video on Google Drive](
https://drive.google.com/file/d/1wN4MEgCLi1f_xqJMWUBEDKKm3Bo6zESZ/view) for demonstration.

## About LIRI

The main script is in liri.js.  liri.js imports several modules to access specific functionality.

```js
const bandsInTown = require("./bandsintown.js");            // Bands in Town module
const omdb = require("./omdb.js");                          // OMDB module
const spotify = require ("./spotify.js");                   // Spotify module

// and then get these additional modules needed for this app
const fs = require("fs");                                   // Node's file system module
const log = require("./log.js");                            // log file module
const inquirer = require("inquirer");                       // interactive prompt
```
Four of these are custom modules written for LIRI and are `bandsintown.js`, `omdb.js`, `spotify.js` and `log.js`.  These modules in turn import modules from their respective API developers.

LIRI also makes use of the standard Node modules `fs`.

If you want to download and run LIRI on your own system, you'll need to run `npm i` to install the required dependencies.
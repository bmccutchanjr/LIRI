var request = require("request");

var search = function ()
{   var url = "https://www.omdbapi.com/?s=SAW&apikey=78d19ea8";
    // request(url, function(error, response, body)
    // {   if(!error && response.statusCode == 200)
    //     {   
    // console.log(JSON.parse(body));
    //     }
    // });
    console.log ("omdb.search ()");
}

module.exports.search = search;
var request = require("request");

var search = function ()
{   var url = "https://www.omdbapi.com/?s=Saw&apikey=78d19ea8";
    request(url, function(error, response, body)
    {   if(!error && response.statusCode == 200)
        {   
    console.log(JSON.parse(body));
        }
        else console.log (error);
    });
//     console.log ("omdb.search ()");
}

module.exports.search = search;
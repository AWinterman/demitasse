// # Cork #
// A [flask][0]-inspired microframework for nodejs.
// 
// Uses event based logic to handle routing. 
// 
// ## Usage: ##
// 
// In your index.js file, you might have


var cork = require("cork")
  , through = require("through")

cork.route("/")
    .on("GET", function(){
        return "hello world"
    })
       
// 
// Then from the command line you might run `cork run`, navigate to
// localhost:8000, and view the rendered string.  This will handle the streaming
// of response and the data type etc. for you.
// 
// [0]: http://flask.pocoo.org/

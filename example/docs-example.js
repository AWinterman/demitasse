//  This is a brief example using `demi` and
//  `[docco](http://jashkenas.github.io/docco/)` to display the source code of
//  `demi` itself. This example assumes you'd run it from the project root.
//

/* By Andrew Winterman */

//  First things first, we need demi...
var Demi = require("../lib/demi")

// ... and a few system utilities.
var fs = require("fs")
  , url = require("url")
  , exec = require("child_process").exec

// On instantiation you set the public directory relative to project root.
// `demi` will serve up static files from here upon request. No need to get up, 
// `docco` will create a docs file into which it will place the its generated
// html and css.
var demi = new Demi("./docs")
  , indexHTML 


// Docco has lacks support for iterating over directories. You hand it file
// names, it spits out one html file per input, and that's it. So this
// backticks and bash wildcards it is.

exec("docco `echo example/* lib/*`", function(err, stdout, stderr){
  console.log(stdout)
  indexHTML = fs.readFileSync("./docs/docs-example.html")
})


// Finally, supposing we have the indexHTML, we render it. Otherwise, some
// placeholder html saying, "nope, not done yet". The awkwardness of this is
// strong argument for moving away from the `function(req){ return string}`
// paradigm, and instead passing `function(req, resp)`, and letting the user
// take advantage of event emmitters, etc. There really is something to be said
// for using the established patterns. Concievably, I could still support
// returning a string, but given that even reading from the file system is
// generally asynchronous it doesn't really seem to make much sense.

demi.route("^/$", "index.html")
    .on("GET", function(req){
      if(!indexHTML){
        return "<body> <head><title>loading</title> loading... /body>"
      } else {
        return indexHTML
      }
    })

// now run it.
demi.run(8769)

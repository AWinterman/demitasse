//  This is a brief example using `demi` and
//  `[docco](http://jashkenas.github.io/docco/)` to display the source code of
//  `demi` itself. This example assumes you'd run it from the project root.
//
//  It depends on the `docco` command, so if you havent got it, `npm install -g docco`
//
//  The module supposes you run it from the project root.

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
var demi = new Demi("./docs", on_static_load)
  , indexHTML 

// Add a route and define what should happen on GET. Anything else will get a
// standard error message.
demi.route("^/$", "index.html")
    .on("GET", doccer)

// `landing` defines what happens when you hit the landing page. It
// just makes sure the docco'd source of this file gets displayed
function doccer(req, resp){
  var headers = {"Content-Type":"text/html"}
  resp.writeHead(headers)
  fs.readFile("./docs/docs-example.html", function(err, data){
    resp.write(data)
    resp.end()
  })
}

// This is a little rediculous-- every time a static file is loaded, this is
// going to rerun docco on every source file. At least it happens
// asynchronously
function on_static_load(err, data){
  exec("docco `echo example/* lib/*`", function(err, stdout, stderr){ 
    console.log(stdout)
    console.log(stderr)
  })
}


// now run it.
demi.run(8769)

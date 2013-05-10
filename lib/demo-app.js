var Cork = require("./lib/cork")
  , fs = require("fs")
  , url = require("url")

cork = new Cork("./docs")

// route multiple urls to the index
cork.route("^/$", "index.html")
    .on("GET", function(req){
      return fs.readFileSync("docs/index.html")
    })

// A couple of paths
cork.route("cork.*")
    .on("GET", function(req){
      return fs.readFileSync("docs/cork.html")
    })

cork.route("^/stream_handler*")
    .on("GET", function(req){
      return fs.readFileSync("docs/stream_handler.html")
    })

// Currently have to write your own path to static files :(
cork.route(".*\.css")
    .on("GET", function(req){
      var parsed = url.parse(req.url, true)
      return fs.readFileSync("docs/" + parsed.pathname)
    })
// Run th server
cork.run(8769)


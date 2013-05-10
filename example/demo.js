var Demi = require("../lib/demi")
  , fs = require("fs")
  , url = require("url")

demi = new Demi("./docs")

demi.route("^/$", "index.html")
    .on("GET", function(req){
      return fs.readFileSync("docs/index.html")
    })

demi.route("demi.*")
    .on("GET", function(req){
      return fs.readFileSync("docs/demi.html")
    })

demi.route("^/stream_handler*")
    .on("GET", function(req){
      return fs.readFileSync("docs/stream_handler.html")
    })

demi.route("/demo*")
    .on("GET", function(req){
      return fs.readFileSync("docs/demo-app.html")
    })

demi.route(".*\.css")
    .on("GET", function(req){
      var parsed = url.parse(req.url, true)
      return fs.readFileSync("docs/" + parsed.pathname)
    })

demi.run(8769)


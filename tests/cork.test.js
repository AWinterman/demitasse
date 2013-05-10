var Cork = require("../lib/cork")
  , fs = require("fs")
  , url = require("url")

cork = new Cork("./docs")

cork.route("^/$", "index.html")
    .on("GET", function(req){
      return fs.readFileSync("docs/index.html")
    })

cork.route("cork.*")
    .on("GET", function(req){
      return fs.readFileSync("docs/cork.html")
    })

cork.route("^/stream_handler*")
    .on("GET", function(req){
      return fs.readFileSync("docs/stream_handler.html")
    })

cork.route("/demo")
    .on("GET", function(req){
      return "hello hello hello!"
      return fs.readFileSync("docs/demo-app.html")
    })

cork.route(".*\.css")
    .on("GET", function(req){
      var parsed = url.parse(req.url, true)
      return fs.readFileSync("docs/" + parsed.pathname)
    })

cork.run(8769)


var Demi = require("../lib/demi")
  , fs = require("fs")
  , url = require("url")

demi = new Demi("./docs")

demi.route("^/$", "index.html")
    .on("GET", function(req){
      return fs.readFileSync("docs/index.html")
    })

demi.run(8769)


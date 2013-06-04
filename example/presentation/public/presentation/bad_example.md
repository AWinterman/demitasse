# An Example: #

```javascript
var Demi = require("demi")
  , fs = require("fs")

var demi = new Demi("./docs")
  , indexHTML 

fs.readFile("./docs/docs-example.html", function(err, data){
    indexHTML = data
})

demi.route("^/$", "index.html")
    .on("GET", function(){
        return indexHTML
    })

// now run it.
demi.run(8769)
```

[this is problematic](problems.md)


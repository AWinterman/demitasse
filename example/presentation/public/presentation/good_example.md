# This feels nicer: #
```
var Demi = require("demi")
  , fs = require("fs")
  , marked = require("marked")
  , through = require("through")

var demi = new Demi('public_dir')

fs.readdir('presentation_dir', serve_slides)
    
function serve_slides(err, data){
  data.forEach(make_route)
  demi.run(7999)
}

function make_route(fname){
  demi.route(fname)
      .on("GET", function(req, resp){
        fs.createReadStream(presentation_dir + fname)
          .pipe(through(mark))
          .pipe(through(add_css))
          .pipe(resp)
      })
}
```

[lessons!](lessons_learned.md)


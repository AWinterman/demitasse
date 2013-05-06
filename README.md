# Cork #
A [flask][0]-inspired microframework for nodejs.

Uses event based logic to handle routing. 

## Usage: ##

In your index.js file, you might have

```javascript

var cork = require("cork")
  , through = require("through")

cork.route("/")
    .on("GET", function(){
        "hello world"
    })
       
```

Then from the command line you might run `cork run`, navigate to
localhost:8000, and view the rendered string.  This will handle the streaming
of response and the data type etc. for you.


## TODO ##
- make sure I'm not redundant with any of [these][1] libraries
- try to find similar functionality on NPM
- url routing
- reverse url routing 
- consider api more carefully

[0]: http://flask.pocoo.org/docs/
[1]: https://github.com/joyent/node/wiki/modules#wiki-web-frameworks-routers

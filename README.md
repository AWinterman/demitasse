# Demitasse #
A [flask][0]-inspired microframework for nodejs.

Uses event based logic to handle routing. 

## Usage: ##

In your index.js file, you might have

```javascript

var Demi = require("demi")
  , demi = new Demi("./public")

demi.route("/")
    .on("GET", function(req, resp){
      resp.write("hello world")
    })
       
```


Then from the command line you might run `demi run`, navigate to
localhost:8000, and view the rendered string.  This will handle the streaming
of response and the data type etc. for you.


## Install ##

``` npm install demi ```

## Examples ##

There are examples in the examples/ directory. Run them with 

```
node examples/<example-name>
```


[0]: http://flask.pocoo.org/

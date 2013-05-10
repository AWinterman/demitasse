// usage:
// Cork.route("/")
//     .on("GET", function(param_obj){
//       return "hello " + arguments.join(", ")
//     })

module.exports = Router

var url = require("url")
  , http = require("http")
  , Stream = require("stream")
  , endpoint = require("./endpoint")
  , qs = require("qs")
  , through = require('through')


function Router(){
  this.http_methods = ["GET", "POST", "PUT", "DELETE"]
  this.routes = {}
}


proto = Router.prototype
cons = Router

// private methods are defined as a function
function emit_event_for_url(self, request){
  // need to find out what the url is.
  // match the url to a registered path, else return_404
  // find out what the request method is
  // emit the method to the endpoint with the arguments specified in the urls.
  var matching_regex = find_path(request.url)
    , params = qs.parse(url.parse(request.url).query)
  // now I just emit it to the event emitter for the url, with the data
  self.route[matching_regex]
      .emit(request.method, params)
}

function find_path(endpoint, regexen){
  // look for the given path amongst the previously supplied regexen
  for (var i = 0, len = regexen.length; i < len; ++i){
    if (url.parse(endpoint).pathname.test(regexen[i])) {
      return regexen
    }
  }
  return false
}


// upon registering a route, create a new event emmitter corresponding to the
// routes object. Returns a stream, which emits 
proto.route = function(regex){
  var self = this
  if (!regex in self.routes){
    // if the regex isn't a registered route, register it. 
    // otherwise self is JUST a reference.
    self.routes[regex] = new Endpoint()
  }

  for (var i = 0, len = self.http_methods.length; i < len; ++i){
    self.routes[regex].on(self.http_methods[i], return_404)
  }

  // needs to return an object which implements the future elements the new
  // .on method needs. .on needs to know the most recent route registered,
  // also needs to know the 
  return endpoint(ee)
}


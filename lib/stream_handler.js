// # Stream Handler
//
// A little module to handle a stream which corresponds to each user defined
// route in Cork. 

module.exports = StreamHandler

var Stream = require("stream")


function StreamHandler(){
  this.stream = new Stream
}

var proto = StreamHandler.prototype
  , cons = StreamHandler
proto.constructor = cons


// ** `.on(name, callback, mimetype)` **
// 
// `name` is a string with the name of the event to be handled. Expects HTTP
// methods
// 
// `callback(req)` is a function of the
// [http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage)
// object representing the clients request. This might be a little blunt, but
// allows the user to respond to url parameters, headers, or the body of the
// request as they see fit. Of course they can also ignore the request object
// entirely, which would be roughly equivalent to the way Flask handles things
// by default.
//
// `response_headers` is a function of a
// [http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage)
// object representing the incoming request.  It is an optional argument-- If
// supplied it will be evaluated and included in the response header.
//
// Finally, `.on` returns proto, so you can chain `on` definitions.
proto.on = function(name, callback, response_headers){
  var current_listeners = this.stream.listeners(name)
  if (current_listeners){
    this.stream.removeAllListeners(name)
  }
  this.stream.on(name, framework_for_response.call(this, callback, response_headers))
  return this
}

// ** `framework_for_response` **
// This private function wraps up the user-supplied `callback` in a function which handles
// emmitting a `data` event with the response string and a `headers` event for
// the the response_headers object. It is meant to be called with
// `framework_for_response.call(stream, callback, response_headers)
function framework_for_response(callback, response_headers){
  response_headers = response_headers || function(x){ return x }
  var self = this
  return function(req) {
    var str = callback(req)
    self.stream.emit("headers", response_headers(req))
    if (callback) self.stream.emit("data", str)
    self.stream.emit("end")
  }
}


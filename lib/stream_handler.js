// # Stream Handler
//
// A little module to handle a stream which corresponds to each user defined
// route in Cork. 

module.exports = StreamHandler

var Stream = require("stream")
  , ap = require("ap")


function StreamHandler(){
  this.stream = new Stream
  this.embedded_args = []
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
proto.on = function(name, callback, response_headers, cleanup){
  if (this.stream.listeners(name)){
    this.stream.removeAllListeners(name)
  }

  console.log(name)
  this.stream.on(
      name
    , framework_for_response.bind(this, callback, response_headers, cleanup)
  )
  return this
}

proto.register = function(args) {
  this.embedded_args = args
  return this
}


// ** `framework_for_response` **
// This private function wraps up the user-supplied `callback` in a function which handles
// emmitting a `data` event with the response string and a `headers` event for
// the the response_headers object. It is meant to be called with
// `framework_for_response.call(stream, callback, response_headers)
function framework_for_response(callback, response_headers, cleanup, embedded_args){
  var response_headers = response_headers || identity
    , callback = callback || identity 
    , cleanup = cleanup || identity

  function identity(x) { return x }

  this.stream.emit("headers", wrapped_response_headers)
  this.stream.emit("data", wrapped_callback)
  this.stream.emit("end", wrapped_end)

  function wrapped_response_headers(req){
    return response_headers(req)
  }

  function wrapped_callback(req) {
    return callback(req)
  }

  function wrapped_end(end) {
    return cleanup(end)
  }
}


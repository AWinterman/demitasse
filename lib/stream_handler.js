// # Stream Handler
//
// A little module to handle a stream which corresponds to each user defined
// route in Cork. 

module.exports = StreamHandler

var Stream = require("stream")


function StreamHandler(){
  this.stream = new Stream
  this.embedded_args = []
}



var proto = StreamHandler.prototype
  , cons = StreamHandler
proto.constructor = cons


// ** `.on(name, callback)` **
// 
// `name` is a string with the name of the event to be handled. Expects HTTP
// methods
// 
// `callback(req, resp)` is a function of the
// [http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage)
// object representing the clients request, and an
// [http.ServerResponse](http://nodejs.org/api/http.html#http_class_http_serverresponse)
// object representing the incoming request.
//
// Finally, `.on` returns proto, so you can chain `on` definitions.
proto.on = function(name, callback){
  if (this.stream.listeners(name)){
    this.stream.removeAllListeners(name)
  }
  this.stream.on(name, callback)
  return this
}

proto.register = function(args) {
  this.embedded_args = args
  return this
}


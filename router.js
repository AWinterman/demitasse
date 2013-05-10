module.exports = Route

var url = require("url")
var http = require("http")

var Stream = require("stream")


function Router(){
  this.http_methods = ["GET", "POST", "PUT", "DELETE"]
}


proto = Router.prototype = new Stream
cons = Router()

proto.on = function(type, listener){
  if (this.http_methods.indexOf(type)){
    throw new Error("unrecognized http method")
  }
}


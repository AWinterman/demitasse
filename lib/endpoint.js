// a class which is returned each time you initialize a class.
//
// implements a .on method, which is not your grandma's on method. 
//
//
Stream = require("stream")

function Endpoint(ee){
  this.ee = ee
}

proto = Endpoint.prototype
cons = Endpoint

// user says Cork.on(<method>, callback)
// In fact the user is registering a stream.
// Any `on` stream passes through the  route.
// and assignes the listener to the route.
//
// You can't chain seperate route definitions, sorry
proto.on = function(method, your_listener){
  this.ee.on(method, listener)
  return this
}


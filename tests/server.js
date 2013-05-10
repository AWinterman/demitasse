parseUrl = require("../lib/server.js")


var fake_url = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'


var z = parseUrl(fake_url)

console.log(z)

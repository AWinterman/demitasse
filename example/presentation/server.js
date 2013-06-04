// Dependencies:
var Demi = require("../../index")
  , fs = require("fs")
  , marked = require("marked")
  , through = require("through")
  , handlebars = require("handlebars")
  , concat = require("concat-stream")

// Setting up a few requirements:
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    if (lang === 'js') {
      return highlighter.javascript(code);
    }
    return code;
  }
});

// public_dir, and the presentation dir
var public_dir = "./public/"
  , presentation_dir = "./public/presentation/"

// Instantiate Demi with the root path for static files (e.g. the path you
// would use in your html files.)

var demi = new Demi(public_dir)

// Serve the files when you hit the corresponding route.
fs.readdir(presentation_dir, function(err, data){
  data.forEach(make_route)
  demi.run(7999)
})


// Create a route for each file in the presentation directory.
function make_route(fname) {
  demi.route(fname)
      .on("GET", function(req, resp){
        fs.createReadStream(presentation_dir + fname)
          .pipe(through(mark))
          .pipe(concat(template))
          .pipe(resp)
      })
}

// Parse the markdown data. This function feeds into a through stream.
function mark(data){
  var parsed = marked(""+data)
  this.queue(parsed)
}

// Put it into a template. This function feeds into a concat-stream template.
function template(err, data) {
  var self = this
  if(err) { self.emit("error", err) } 
  fs.readFile(public_dir + "template.html", function(error, html){
    var compiler = handlebars.compile(""+html)
    var out = compiler({ html: data, css_addr: "mark.css" })
    self.emit('data', out)
    self.emit('end')
  })
}

## A better way: ##

make like native `http`:

```javascript
demi.route("/")
  .on("GET", function(req, resp){

      // proccess the request

      resp.write("Hello World!")
      resp.end()
  })
```

[good_example](good_example.md)

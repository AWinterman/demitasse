## There should be basically nothing to it ##

(as far as the user is concerned)

```python
@app.route("/")
def hello_world():
  return "Hello World!"
```

##So: ##
```javascript

route("/").on("GET", hello_world)

function hello_world(){
  return "Hello World!"
}
```

[until recently, this was exactly how it worked](current.md)

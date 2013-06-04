## [Flask is awesome](http://flask.pocoo.org/) ##

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
```

I hunted for [something similar in node](hunted.md)

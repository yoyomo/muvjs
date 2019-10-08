# muvjs
MUV architecture in pure javascript

## How-to use
1. create the root div 
```html
<div id="root"></div>
```
2. copy or link `muv.js` and `virtual-dom.js` 
```html
<script src="muv.js"></script>
<script src="virtual-dom.js"></script>
```

3. Call muv 
```js
muv(init)(update)(view)("root")
```

Then you can edit `app.js` to your needs

Have fun!

## Example
```html
<!DOCTYPE html>
<html>

<body>
  <div id="root"></div>

  <script src="muv.js"></script>
  <script src="virtual-dom.js"></script>

  <script src="app.js"></script>
  <script>
    muv(init)(update)(view)("root")
  </script>
</body>

</html>
```

`app.js`
```js
"use strict";

// MODEL

const init =
{
  count: 0
};

// UPDATE

const Increment = "increment"
const Decrement = "decrement"

const update = model => action => {
  switch (action) {
    case Increment: {
      model = { ...model };
      model.count = model.count + 1;
      break;
    }
    case Decrement: {
      model = { ...model };
      model.count = model.count - 1;
      break;
    }
  }
  return model;
}

// VIEW 

const view = dispatch => model =>
  div()(
    [
      , button({ onclick: dispatch(Decrement) })('-')
      , div()(model.count)
      , button({ onclick: dispatch(Increment) })('+')
    ]
  )
```

# muvjs
MUV architecture in pure javascript

### Usage
1. Construct your modular `App.js` with the following syntax
    ```js
    import {div} from './node_modules/muvjs/muv-dom.js';

    // MODEL
    
    export const init =
      {
        // initialize your model
        ...
      };
    
    // UPDATE
    
    export const update = model => action => {
      //handle actions, and change model accordingly
      ...
      return model;
    };
    
    // VIEW
    
    export const view = dispatch => model =>
      // display app according to the model
      ...
    
    
    ```
    importing components from `muv-dom.js`,
     and exporting the initial model `init`,
      the update function `update`
       and the view function `view`

2. Create your muv modular initializer `index.js` 
    ```js
    import {muv} from './node_modules/muvjs/muv.js';
    import {init, update, view} from './App.js'
    
    muv(init)(update)(view)("root");
    ```
3. create the root div, and include your muv modular initializer in your `index.html`
    ```html
    <div id="root"></div>
    <script type="module" src="index.mjs"></script>
    ```

Then you can edit your `App.js` to your needs

Have fun!

## Example

`App.js`
```js
"use strict";
import {div, button} from './node_modules/muvjs/muv-dom.js';

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

view full example at https://github.com/yoyomo/muvjs-example

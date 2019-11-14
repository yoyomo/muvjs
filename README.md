# muvjs
MUV architecture in modular javascript

### Background
MUV (**Model Update View**), otherwise known as MVC (Model View Component), is found in many applications' core software architecture using a one way state change. The idea revolves around state immutability and functional programming. For example, a **View** listens for **user events** that fire an **action** through a **dispatch** which is handled by an **update** function that returns a new **model** which gets re-**rendered** in the **view**

Note: MuvJS's architecture is heavily inspired in ELM, and React+Redux format. I encourage you to learn both. 

Since v2.0, there are two new concepts added: Ignition and Subscriptions. Therefore this can technically be called MUVisJS.  An ***Ignition*** is just a simple call to a dispatch that will initialize anything necessary; used for signing the user in, or reading at cookies, etc. Basically things that do not require user input but are required at startup. And ***Subscriptions*** are all asynchronous operation that are not required to be within the internal loop of MUV; used to call servers and the likes. Think of it like what is Saga to Redux+Saga.

Ignitions are called only once, while subscriptions are called by the *update* function (or in other words, after actions are dispatched and handled. For they eventually are ***effects of actions***).

### Usage
1. Construct your modular app `App.mjs` with the following syntax
    ```js
    
    // initialize your model
    
    export const model = {
      ...
    }
    
    //handle actions, change model accordingly, and create new effects
    
    export const update = model => action => {
      ...
      return {model, effects};
    };
    
    // display app according to the model, and dispatch any actions
    
    export const view = dispatch => model => {
      ...
    }
    
    
    ```
    importing components from `muv-dom.mjs`,
     and exporting the initial model `model`,
      the update function `update`
       and the view function `view`


     Since v2.0, now you can add the following:
     ```js
      // dispatch any initializing action

      export const ignition = dispatch => {
        ...
      }

      // handle effects, and dispatch any actions

      export const subscriptions = dispatch => {
        ...
      }

      
     ```
     exporting the subscriptions `subscriptions`,
       and the ignition function `ignition`

2. Create your muv modular initializer `index.mjs` 
    ```js
    import {muv} from 'muvjs/muv.mjs';
    import {model, update, view, ignition, subscriptions} from './App'
    
    muv({model, update, view, ignition, subscriptions})('root');
    ```
3. create the root div, and include your muv modular initializer in your `index.html`
    ```html
    <div id="root"></div>
    <script type="module" src="index.mjs"></script>
    ```

Then you can edit your `App.js` to your needs

Have fun!

## Example

View full examples at https://github.com/yoyomo/muvjs-example

### Create MuvJS App
You can now use a brew command to create a MuvJS app from scratch: 
https://github.com/yoyomo/create-muvjs-app
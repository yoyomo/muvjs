"use strict";

// MODEL

const init =
{
  count: 0
};

// UPDATE

const update = model => action => {
  switch (action) {
    case "increment": {
      model = { ...model };
      model.count = model.count + 1;
      break;
    }
    case "decrement": {
      model = { ...model };
      model.count = model.count - 1;
      break;
    }
  }
  return model;
}

// VIEW 

const component = elementType => attributes => {
  let element = document.createElement(elementType);
  if (attributes) {
    for (let attr in attributes) {
      if (typeof attributes[attr] === "function") {
        element[attr] = attributes[attr];
      } else {
        element.setAttribute(k, v.attributes[k]);
      }
    }
  }

  return (...children) => {
    if (children) {
      children.map(child => {
        if (typeof child === "object") {
          element.appendChild(child);
        } else {
          element.innerText = child;
        }
      });
    }
    return element;
  }
}

const div = component('div');
const button = component('button');



const view = dispatch => model => root => {
  root.innerHTML = null;
  [
    , button({ onclick: dispatch("decrement") })('-')
    , div()(model.count)
    , button({ onclick: dispatch("increment") })('+')

  ].forEach(child => root.appendChild(child))
}


// MAIN

const mount = rootId => {
  let root = document.getElementById(rootId);
  let model = init;
  const dispatch = action => {
    return () => {
      model = update(model)(action);
      view(dispatch)(model)(root);
    }
  }
  view(dispatch)(init)(root)
}

mount("root")
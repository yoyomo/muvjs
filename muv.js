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
    button({ onclick: dispatch(Decrement) })('-')
    , div()(model.count)
    , button({ onclick: dispatch(Increment) })('+')
  )

// MAIN

const component = elementType => attributes => (...children) => {
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

const div = component('div');
const button = component('button');

const render = dispatch => model => root => {
  root.innerHTML = null;
  root.appendChild(view(dispatch)(model))
}

const mount = rootId => {
  let root = document.getElementById(rootId);
  let model = init;
  const dispatch = action => {
    return () => {
      model = update(model)(action);
      render(dispatch)(model)(root);
    }
  }
  render(dispatch)(init)(root)
}

mount("root")
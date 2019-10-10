"use strict";

// MODEL

import {button, div} from "./muv-dom.mjs";

export const init =
  {
    count: 0
  };

// UPDATE

const Increment = "increment";
const Decrement = "decrement";

export const update = model => action => {
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
};

// VIEW

export const view = dispatch => model =>
  div()(
    [
      , button({ onclick: dispatch(Decrement) })('-')
      , div()(model.count)
      , button({ onclick: dispatch(Increment) })('+')
    ]
  );


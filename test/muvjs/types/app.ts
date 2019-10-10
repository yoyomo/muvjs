import {Dispatch, Update, View} from "./types";
import {button, div} from "./muv-dom";

export const init =
  {
    count: 0
  };

export type Model = typeof init;

const Increment = "increment";
const Decrement = "decrement";

export type Action =  typeof Increment | typeof Decrement;

export const update: Update<Model, Action> =
  (model: Model) =>
    (action: Action) => {
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

export const view: View<Model, Action> =
  (dispatch: Dispatch<Action>) =>
    (model: Model) =>
      div()(
        [
          , button({ onclick: dispatch(Decrement) })('-')
          , div()(model.count)
          , button({ onclick: dispatch(Increment) })('+')
        ]
      );
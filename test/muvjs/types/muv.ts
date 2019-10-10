import {Dispatch, Muv, Render, Update, View} from "./types";

const render = function <Model, Action>(): Render<Model, Action> {
  return (
    (dispatch: Dispatch<Action>) =>
      (model: Model) =>
        (view: View<Model, Action>) =>
          (root: HTMLElement) => {
            root.innerHTML = null;
            root.appendChild(view(dispatch)(model))
          }
  )
}();


export const muv = function <Model, Action>(): Muv<Model, Action> {
  return (
    (model: Model) =>
      (update: Update<Model, Action>) =>
        (view: View<Model, Action>) =>
          (rootId: string) => {

            let root = document.getElementById(rootId);
            const dispatch = action => {
              return () => {
                model = update(model)(action);
                render(dispatch)(model)(view)(root);
              }
            };
            render(dispatch)(model)(view)(root)

          }
  )
}();
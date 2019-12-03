import {rerender, View} from './muv-dom'

function handleEffects<E>(subscriptions: (e: E) => void) {
  return (effects: E[]) => {
    if (!effects) return;
    effects.map(effect => {
      subscriptions(effect);
    })
  };
}

export type MUV<M,U,V,I,S,A,E> = {
  model: M,
  update: (m: M) => (a: A) => { model: M, effects: E[] },
  view: (d: (a: A) => void) => (m: M) => View,
  ignition: (d: (a: A) => void) => void,
  subscriptions: (d: (a: A) => void) => (e: E) => void
};

export function muv<M,U,V,I,S,A,E>(muv: MUV<M,U,V,I,S,A,E>){
  let {model,update,view,ignition,subscriptions} = muv;
  return (rootId: string) => {
    let root = document.getElementById(rootId);
    if(!root) return;

    let oldView: View;
    let subs: (e: E) => void;
    const dispatch = (action: A) => {
      const updated = update(model)(action);
      model = updated.model;
      handleEffects(subs)(updated.effects);

      const newView = view(dispatch)(model);
      rerender(root)(oldView)(newView)(0);
      oldView = newView;
    };

    root.innerHTML = "";
    oldView = view(dispatch)(model);
    root.appendChild(oldView.render());

    subs = subscriptions(dispatch);
    ignition(dispatch)
  };
}

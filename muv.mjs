"use strict";
import {rerender} from 'muvjs/muv-dom'

const handleEffects = subscriptions => effects => {
  if (!effects) return;
  effects.map(effect => {
    subscriptions(effect);
  })
}

export const muv = model => update => view => ignition => subscriber => rootId => {

  let root = document.getElementById(rootId);
  let subscriptions;
  let oldView;

  const dispatch = action => {
    const updated = update(model)(action);
    model = updated.model;
    handleEffects(subscriptions)(updated.effects);

    const newView = view(dispatch)(model);
    rerender(root)(oldView)(newView)(0)
    oldView = newView;
  };

  root.innerHTML = null;
  oldView = view(dispatch)(model)
  root.appendChild(oldView.render())

  subscriptions = subscriber(dispatch);
  ignition(dispatch)
};

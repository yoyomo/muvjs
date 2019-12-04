"use strict";
import {rerender} from './muv-dom'

const handleEffects = subscriptions => effects => {
  if (!effects) return;
  effects.map(effect => {
    subscriptions(effect);
  })
};


export const muv = ({model, update, view, ignition, subscriptions}) => rootId => {
  let root = document.getElementById(rootId);
  if (!root) return;

  let oldView;
  let subs;

  const dispatch = action => {
    const updated = update(model)(action);
    model = updated.model;
    if (updated.effects) handleEffects(subs)(updated.effects);

    const newView = view(dispatch)(model);
    rerender(root)(oldView)(newView)(0);
    oldView = newView;
  };

  root.innerHTML = "";
  oldView = view(dispatch)(model);
  root.appendChild(oldView.render());

  if (subscriptions) subs = subscriptions(dispatch);
  if (ignition) ignition(dispatch)
};

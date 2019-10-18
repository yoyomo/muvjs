"use strict";

// MAIN

const handleEffects = subscriptions => effects => {
  if (!effects) return;
  effects.map(effect => {
    subscriptions(effect);
  })
}

const render = dispatch => model => view => root => {
  root.innerHTML = null;
  root.appendChild(view(dispatch)(model))
};

export const muv = model => update => view => subscriber => ignition => rootId => {
  let root = document.getElementById(rootId);
  let subscriptions;
  const dispatch = action => {
    const updated = update(model)(action);
    model = updated.model;
    handleEffects(subscriptions)(updated.effects)
    render(dispatch)(model)(view)(root);
  };
  render(dispatch)(model)(view)(root);

  subscriptions = subscriber(dispatch);
  ignition(dispatch)
};

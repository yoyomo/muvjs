"use strict";

// MAIN

const render = dispatch => model => view => root => {
  root.innerHTML = null;
  root.appendChild(view(dispatch)(model))
}

const mount = model => update => view => rootId => {
  let root = document.querySelector(rootId);
  const dispatch = action => {
    return () => {
      model = update(model)(action);
      render(dispatch)(model)(view)(root);
    }
  }
  render(dispatch)(model)(view)(root)
}

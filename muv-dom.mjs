"use strict";

export const isNull = value => value === undefined || value === null;

const setAttributes = element => attributes => {
  if (isNull(attributes)) return;

  for (let attr in attributes) {
    if (typeof attributes[attr] === "function") {
      element[attr] = attributes[attr];
    } else {
      element.setAttribute(attr, attributes[attr]);
    }
  }
};

const appendChildren = element => child => {
  if (isNull(child)) return;

  if (typeof child === "object") {
    if (child instanceof Array) {
      child.map(c => appendChildren(element)(c))
    } else {
      element.appendChild(child.render());
    }
  } else {
    element.innerText = child;
  }
};

export const component = elementType => attributes => (...children) => {
  return {
    elementType: elementType,
    attributes: attributes,
    children: children,
    render: () => {
      let element = document.createElement(elementType);

      setAttributes(element)(attributes);

      appendChildren(element)(children);

      return element;
    }
  };
}

const getChildrenOrArray = view => {
  if ((view.children && view.children.length > 0)) {
    return view.children
  } else if (view instanceof Array) {
    return view
  }
}

export const rerender = element => oldView => newView => index => {
  if (
    (typeof oldView === "object"
      && typeof oldView === typeof newView
      && oldView.elementType === newView.elementType
      && JSON.stringify(oldView.attributes) === JSON.stringify(newView.attributes))
    || (oldView === newView)) {

    let newChildren = getChildrenOrArray(newView);
    let oldChildren = getChildrenOrArray(oldView);

    if (!isNull(newChildren)) {
      newChildren.map((newChild, i) => {
        if (!isNull(oldChildren[i])) {
          if (element.children[index]) {
            rerender(element.children[index])(oldChildren[i])(newChild)(i)
          } else if (!isNull(element.innerText)) {
            rerender(element)(oldChildren[i])(newChild)(i)
          }
        } else if (newChild.render) {
          element.appendChild(newChild.render())
        }

      })
    }

  } else {
    element.innerText = newView;
    element.value = newView;
  }
}

export const div = component('div');
export const button = component('button');
export const label = component('label');
export const input = component('input');
export const textarea = component('textarea');
export const ul = component('ul');
export const li = component('li');
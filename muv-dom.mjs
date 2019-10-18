"use strict";

export const isNull = value => value === undefined || value === null;
export const isArray = a => !isNull(a) && a instanceof Array

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

const appendChildren = element => child => index => {
  if (isNull(child)) return;

  if (typeof child === "object") {
    if (isArray(child)) {
      child.map((c, i) => appendChildren(element)(c)(i))
    } else {
      element.appendChild(child.render(element.getAttribute("key"), index));
    }
  } else {
    element.innerText = child;
  }
};

export const component = elementType => attributes => (...children) => {
  return {
    elementType: elementType,
    attributes: attributes,
    children: children.flat(),
    genKey: function (parentKey, index) {
      const geneKey = parentKey ? `${parentKey}-${index}-` : ""
      this.attributes = this.attributes || {};
      this.attributes["key"] = geneKey + elementType;
    },
    render: function (parentKey, index) {
      let element = document.createElement(elementType);

      this.genKey(parentKey, index);
      setAttributes(element)(this.attributes);

      appendChildren(element)(this.children)(0);

      return element;
    }
  };
}

export const rerender = parent => oldView => newView => index => {

  if (typeof oldView !== "object" && typeof newView !== "object") {
    if (oldView !== newView) {
      parent.innerText = newView;
      parent.value = newView;
    }
    return;
  }

  if (isNull(oldView) && newView.render) {
    parent.appendChild(newView.render(parent.getAttribute("key"), index));
    return;
  }

  if (isNull(newView)) {
    parent.removeChild(parent.children[index]);
    return;
  }

  if ((!newView.attributes || !newView.attributes["key"]) && newView.genKey) {
    newView.genKey(parent.getAttribute("key"), index)
  }


  if (oldView.elementType === newView.elementType && oldView.attributes["key"] === newView.attributes["key"]) {

    if (JSON.stringify(oldView.attributes) !== JSON.stringify(newView.attributes)) {
      let element = parent.children[index] || parent;
      for (let attr in {...oldView.attributes, ...newView.attributes}) {
        if (oldView.attributes[attr] !== newView.attributes[attr]) {
          if (typeof newView.attributes[attr] === "function") {
            element[attr] = newView.attributes[attr];
          } else {
            element.setAttribute(attr, newView.attributes[attr]);
          }
        }
      }
    }

    const newChildren = newView.children;
    const oldChildren = oldView.children;

    const childrenNum = newChildren.length >= oldChildren.length ? newChildren.length : oldChildren.length;
    for (let i = 0; i < childrenNum; i++) {
      rerender(parent.children[index])(oldChildren[i])(newChildren[i])(i)
    }

  } else {
    parent.insertBefore(newView.render(parent.getAttribute("key"), index), parent.children[index])
    parent.removeChild(parent.children[index + 1])
  }
}

export const div = component('div');
export const button = component('button');
export const label = component('label');
export const input = component('input');
export const textarea = component('textarea');
export const ul = component('ul');
export const li = component('li');
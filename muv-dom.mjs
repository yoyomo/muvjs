"use strict";

// VIRTUAL DOM

const isNull = value => value === undefined || value === null;

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
      element.appendChild(child);
    }
  } else {
    element.innerText = child;
  }
};

export const component = elementType => attributes => (...children) => {
  let element = document.createElement(elementType);

  setAttributes(element)(attributes);

  appendChildren(element)(children);

  return element;
};

export const div = component('div');
export const button = component('button');
export const label = component('label');
export const input = component('input');
export const textarea = component('textarea');
export const ul = component('ul');
export const li = component('li');
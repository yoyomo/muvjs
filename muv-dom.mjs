"use strict";

export const isNull = (value) => value === undefined || value === null;
export const isArray = (a) => !isNull(a) && a instanceof Array;

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
      element.appendChild(child.render(element.getAttribute("key") || "", index));
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
      const geneKey = parentKey ? `${parentKey}-${index}-` : "";
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
};

export const rerender = parent => oldView => newView => index => {

  if (!parent) return;

  if (typeof oldView !== "object" && typeof newView !== "object") {
    if (oldView !== newView) {
      parent.innerText = newView;
      parent.value = newView;
    }
    return;
  }

  if (isNull(newView)) {
    if (!isNull(parent.children[index])) parent.removeChild(parent.children[index]);
    return;
  }

  if (isNull(oldView) && newView.render) {
    parent.appendChild(newView.render(parent.getAttribute("key") || "", index));
    return;
  }

  if ((!newView.attributes || !newView.attributes["key"]) && newView.genKey) {
    newView.genKey(parent.getAttribute("key") || "", index)
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
    parent.insertBefore(newView.render(parent.getAttribute("key") || "", index), parent.children[index]);
    parent.removeChild(parent.children[index + 1])
  }
};

export const div = component('div');
export const button = component('button');
export const label = component('label');
export const input = component('input');
export const textarea = component('textarea');
export const ul = component('ul');
export const li = component('li');
export const img = component('img');
export const a = component('a');
export const abbr = component('abbr');
export const address = component('address');
export const area = component('area');
export const article = component('article');
export const aside = component('aside');
export const audio = component('audio');
export const b = component('b');
export const base = component('base');
export const bdo = component('bdo');
export const blockquote = component('blockquote');
export const body = component('body');
export const br = component('br');
export const canvas = component('canvas');
export const caption = component('caption');
export const cite = component('cite');
export const code = component('code');
export const col = component('col');
export const colgroup = component('colgroup');
export const datalist = component('datalist');
export const dd = component('dd');
export const del = component('del');
export const details = component('details');
export const dfn = component('dfn');
export const dialog = component('dialog');
export const dl = component('dl');
export const dt = component('dt');
export const em = component('em');
export const embed = component('embed');
export const fieldset = component('fieldset');
export const figcaption = component('figcaption');
export const figure = component('figure');
export const footer = component('footer');
export const form = component('form');
export const head = component('head');
export const header = component('header');
export const h1 = component('h1');
export const h2 = component('h2');
export const h3 = component('h3');
export const h4 = component('h4');
export const h5 = component('h5');
export const h6 = component('h6');
export const hr = component('hr');
export const html = component('html');
export const i = component('i');
export const iframe = component('iframe');
export const ins = component('ins');
export const kbd = component('kbd');
export const legend = component('legend');
export const link = component('link');
export const map = component('map');
export const mark = component('mark');
export const menu = component('menu');
export const meta = component('meta');
export const meter = component('meter');
export const nav = component('nav');
export const object = component('object');
export const ol = component('ol');
export const optgroup = component('optgroup');
export const option = component('option');
export const output = component('output');
export const p = component('p');
export const param = component('param');
export const pre = component('pre');
export const progress = component('progress');
export const q = component('q');
export const s = component('s');
export const samp = component('samp');
export const script = component('script');
export const section = component('section');
export const select = component('select');
export const small = component('small');
export const source = component('source');
export const span = component('span');
export const strong = component('strong');
export const style = component('style');
export const sub = component('sub');
export const summary = component('summary');
export const sup = component('sup');
export const table = component('table');
export const tbody = component('tbody');
export const td = component('td');
export const tfoot = component('tfoot');
export const th = component('th');
export const thead = component('thead');
export const tr = component('tr');
export const time = component('time');
export const title = component('title');
export const track = component('track');
export const u = component('u');
export const varElement = component('var');
export const video = component('video');

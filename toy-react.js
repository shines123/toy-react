class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, val) {
    this.root.setAttribute(name, val);
  }
  appendChild(component) {
    this.root.appendChild(component.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }
  setAttribute(name, val) {
    this.props[name] = val;
  }
  appendChild(component) {
    this.children.push(component);
  }
  get root() {
    if (!this._root) {
      this._root = this.render().root;
    }
    return this._root;
  }
}
export function createElement(tagName, attributes, ...children) {
  let e;
  if (typeof tagName === "string") {
    e = new ElementWrapper(tagName);
  } else {
    e = new tagName();
  }
  for (let p in attributes) {
    e.setAttribute(p, attributes[p]);
  }
  let insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === "string") {
        child = new TextWrapper(child);
      }
      if (typeof child === "object" && child instanceof Array) {
        insertChildren(child);
      } else {
        e.appendChild(child);
      }
    }
  };
  insertChildren(children);

  return e;
}

export function render(component, parentElement) {
  parentElement.appendChild(component.root);
}

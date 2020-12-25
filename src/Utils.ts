export const splitAttr = (value: string): Set<string> => {
  return new Set(value.trim().split(" "));
}

export const createElement = (name: string, attributes: {[prop: string]: string}, textContent?: string): HTMLElement => {
  const el = document.createElement(name);
  for (const attr in attributes) {
    el.setAttribute(attr, attributes[attr]);
  }
  if (textContent) {
    el.textContent = textContent;
  }
  return el;
}
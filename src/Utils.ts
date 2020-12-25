export const splitAttr = (value: string): string[] => {
  return value.trim().split(" ");
}

export const createElement = (name: string, attributes: {[prop: string]: string}): HTMLElement => {
  const el = document.createElement(name);
  for (const attr in attributes) {
    el.setAttribute(attr, attributes[attr]);
  }
  return el;
}
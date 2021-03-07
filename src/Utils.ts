/** Returns a Set of values for a given attribute */
export const splitAttr = (value: string): Set<string> => {
  return new Set(value.trim().split(" "));
}

/** Creates an element with attributes and text content */
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

/** Adds a parameter to an existing URL */
export const addParamToUrl = (href: string, prefix: string, param: string): string => {
  let newHref = new URL(href);

  if (newHref.search.length > 0) {
    // We need to check that because Edge doesn’t sanitize the search string
    if (newHref.search !== "?") {
      newHref.search += `&${prefix}=${param}`;
    } else {
      newHref.search = `?${prefix}=${param}`;
    }
  } else {
    newHref.search += `?${prefix}=${param}`;
  }
  
  return newHref.href;
}
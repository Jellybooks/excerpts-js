// @ts-nocheck
import { expect } from "chai";
import { JSDOM, ResourceLoader } from "jsdom";

import { Modal } from "../src/Modal";

class CustomResourceLoader extends ResourceLoader {
  fetch(url: string, options) {
    // Override the contents of this script to do something unusual.
    if (url === "http://www.test.org/?embedded=true") {
      return Promise.resolve(Buffer.from(`<!doctype HTML><html>
  <body>
    <div>
      <a data-jb-modal href="http://www.test.org"><span>Read Preview</span></a>
    </div>
  </body>
</html>`));
    }

    return super.fetch(url, options);
  }
}

describe("Modal focussing", () => {
  beforeEach(() => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a data-jb-modal href="http://www.test.org"><span>Read Preview</span></a>
    </div>
  </body>
</html>`;
    const dom = new JSDOM(html,{
      resources:new CustomResourceLoader()
    });
    const window = dom.window
    global.document = window.document;

    Object.defineProperty(window, "matchMedia", {
      value: () => {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {}
        };
      }
    });

  });
  it("should give the model focus", async () => {
    
    function oneEvent(eventTarget: Element, eventName: string) {
      return new Promise(resolve => {
        function listener(ev: Event) {
          resolve(ev);
          eventTarget.removeEventListener(eventName, listener);
        }
        eventTarget.addEventListener(eventName, listener);
      });
    }
    new Modal();

    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    const loadEvent = oneEvent(iframe, "load")
    expect(iframe).not.to.be.null;
    let focusSet = false;
    iframe.focus = function focus () {
      focusSet = true;
    }
    expect(iframe.contentWindow).not.to.be.null
    expect(iframe.src).to.equal("about:blank");

    const anchor = document.querySelector("a") as HTMLAnchorElement;
    const closeButton = document.querySelector("button.jb-modal-close") as HTMLButtonElement;

    anchor.click();
    expect(iframe.src).to.equal("http://www.test.org/?embedded=true");
    await loadEvent
    expect(focusSet).to.be.true;
    closeButton.click();
  });
})
import { expect } from "chai";
import { JSDOM } from "jsdom";

import * as peekInside from "../src/index";

describe("App", () => {
  Object.defineProperty(window, "matchMedia", {
    value: () => {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {}
      };
    }
  });

  it("should init both label and modal", () => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a data-jb-modal href="http://www.test.org">
        <img data-jb-label src="http://www.test.org/image.jpg" alt="" />
      </a>
    </div>
  </body>
</html>`;
    const { window } = new JSDOM(html);
    global.document = window.document;

    peekInside.init();

    const img = document.querySelector("img") as HTMLImageElement;
    const labelContainer = img.parentElement as HTMLElement;
    
    expect(labelContainer).not.to.be.null;
    expect(labelContainer.className).to.equal("jb-peek-container");

    const label = img.nextElementSibling as HTMLElement;
    expect(label).not.to.be.null;
    expect(label.className).to.contain("jb-peek-label");
    expect(label.className).to.contain("top");
    expect(label.className).to.contain("right");

    const labelText = label.querySelector(".jb-peek-label-text") as HTMLElement;
    expect(labelText).not.to.be.null;
    expect(labelText.textContent).to.equal("Peek Inside");

    const modalContainer = document.querySelector(".jb-modal-container") as HTMLDivElement;
    expect(modalContainer).not.to.be.null;
  });

  it("should handle configuration via JS", () => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a class="jb-modal-class" href="http://www.test.org">
        <img class="jb-modal-label" src="http://www.test.org/image.jpg" alt="" />
      </a>
    </div>
  </body>
</html>`;
    const { window } = new JSDOM(html);
    global.document = window.document;

    peekInside.init({
      label: {
        selector: ".jb-modal-label",
        text: "Preview",
        placement: "bottom center"
      },
      modal: {
        selector: ".jb-modal-class"
      }
    });

    const img = document.querySelector("img") as HTMLImageElement;
    const labelContainer = img.parentElement as HTMLElement;
    
    expect(labelContainer).not.to.be.null;
    expect(labelContainer.className).to.equal("jb-peek-container");

    const label = img.nextElementSibling as HTMLElement;
    expect(label).not.to.be.null;
    expect(label.className).to.contain("jb-peek-label");
    expect(label.className).to.contain("bottom");
    expect(label.className).to.contain("center");

    const labelText = label.querySelector(".jb-peek-label-text") as HTMLElement;
    expect(labelText).not.to.be.null;
    expect(labelText.textContent).to.equal("Preview");

    const modalContainer = document.querySelector(".jb-modal-container") as HTMLDivElement;
    expect(modalContainer).not.to.be.null;
  });
})
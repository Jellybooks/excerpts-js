import { expect } from "chai";
import { JSDOM } from "jsdom";

import { Modal } from "../src/Modal";

describe("Modal", () => {
  beforeEach(() => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a data-jb-modal href="http://www.test.org">Read Preview</a>
    </div>
  </body>
</html>`;
    const { window } = new JSDOM(html);
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

  it("should create the modal", () => {
    new Modal();

    const modalContainer = document.querySelector(".jb-modal-container") as HTMLDivElement;
    expect(modalContainer).not.to.be.null;
    expect(modalContainer.className).to.contain("jb-modal-hidden");
    expect(modalContainer.hasAttribute("hidden")).to.be.true;

    const overlay = modalContainer.querySelector(".jb-modal-overlay") as HTMLDivElement;
    expect(overlay).not.to.be.null;
    expect(overlay.tabIndex).to.equal(-1);

    const modal = modalContainer.querySelector(".jb-modal") as HTMLDivElement;
    expect(modal).not.to.be.null;
    expect(modal.getAttribute("role")).to.equal("dialog");
    expect(modal.getAttribute("aria-label")).to.equal("excerpt");
    expect(modal.getAttribute("aria-hidden")).to.equal("true");

    const closeButton = modal.querySelector("button.jb-modal-close") as HTMLButtonElement;
    expect(closeButton).not.to.be.null;
    expect(closeButton.getAttribute("type")).to.equal("button");
    expect(closeButton.getAttribute("aria-label")).to.equal("Close Excerpt");
    expect(closeButton.textContent).to.equal("x");

    const iframe = modal.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).not.to.be.null;
    expect(iframe.src).to.equal("about:blank");
  });

  it("should open the modal", () => {
    new Modal();

    const anchor = document.querySelector("a")  as HTMLAnchorElement;
    anchor.click();

    const modalContainer = document.querySelector(".jb-modal-container") as HTMLDivElement;
    const modal = modalContainer.querySelector(".jb-modal") as HTMLDivElement;
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;

    expect(modalContainer.className).not.to.contain("jb-modal-hidden");
    expect(modalContainer.hasAttribute("hidden")).to.be.false;
    expect(modal.hasAttribute("aria-hidden")).to.be.false;
    expect(iframe.src).to.equal("http://www.test.org/");
    expect(document.body.style.overflow).to.equal("hidden");
  });

  it("should close the modal", () => {
    new Modal();

    const anchor = document.querySelector("a") as HTMLAnchorElement;

    anchor.click();

    const modalContainer = document.querySelector(".jb-modal-container") as HTMLDivElement;
    const modal = modalContainer.querySelector(".jb-modal") as HTMLDivElement;
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;

    expect(modalContainer.className).not.to.contain("jb-modal-hidden");
    expect(modalContainer.hasAttribute("hidden")).to.be.false;
    expect(modal.hasAttribute("aria-hidden")).to.be.false;
    expect(iframe.src).to.equal("http://www.test.org/");

    const closeButton = modalContainer.querySelector("button.jb-modal-close") as HTMLButtonElement;
    closeButton.click();

    expect(modalContainer.className).to.contain("jb-modal-hidden");
    expect(modalContainer.hasAttribute("hidden")).to.be.true;
    expect(modal.hasAttribute("aria-hidden")).to.be.true;

    anchor.click();

    expect(modalContainer.className).not.to.contain("jb-modal-hidden");
    expect(modalContainer.hasAttribute("hidden")).to.be.false;
    expect(modal.hasAttribute("aria-hidden")).to.be.false;

    const overlay = modalContainer.querySelector(".jb-modal-overlay") as HTMLDivElement;
    overlay.click();

    expect(modalContainer.className).to.contain("jb-modal-hidden");
    expect(modalContainer.hasAttribute("hidden")).to.be.true;
    expect(modal.hasAttribute("aria-hidden")).to.be.true;
    expect(document.body.style.overflow).to.not.equal("hidden");
  });

  it("should handle the configured selector", () => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a class="jb-modal-class" href="http://www.test.org">Read Preview</a>
    </div>
  </body>
</html>`;
    const { window } = new JSDOM(html);
    global.document = window.document;

    new Modal({
      selector: ".jb-modal-class"
    });

    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).not.to.be.null;
    expect(iframe.src).to.equal("about:blank");

    const anchor = document.querySelector("a") as HTMLAnchorElement;
    anchor.click();

    expect(iframe.src).to.equal("http://www.test.org/");
  });

  it("should handle multiple anchors", () => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a data-jb-modal href="http://www.test.org">Read Preview</a>
      <a data-jb-modal href="http://test.org">Read Another Preview</a>
    </div>
  </body>
</html>`;
    const { window } = new JSDOM(html);
    global.document = window.document;
    new Modal();

    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).not.to.be.null;
    expect(iframe.src).to.equal("about:blank");

    const anchor = document.querySelectorAll("a")  as NodeListOf<HTMLAnchorElement>;
    const closeButton = document.querySelector("button.jb-modal-close") as HTMLButtonElement;

    anchor[0].click();

    expect(iframe.src).to.equal("http://www.test.org/");

    closeButton.click();

    anchor[1].click();

    expect(iframe.src).to.equal("http://test.org/");
  });
})
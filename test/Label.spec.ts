import { expect } from "chai";
import { JSDOM } from "jsdom";

import { DefaultConfig } from "../src/DefaultConfig";
import { Label } from "../src/Label";

describe("Label", () => {
  beforeEach(() => {
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
  })

  it("should create the label", () => {
    new Label();

    const img = document.querySelector("img") as HTMLImageElement;
    const labelContainer = img.parentElement as HTMLElement;
    
    expect(labelContainer).not.to.be.null;
    expect(labelContainer.className).to.equal("jb-peek-container");

    const label = img.nextElementSibling as HTMLElement;
    expect(label).not.to.be.null;
    expect(label.className).to.contain("jb-peek-label");
    expect(label.className).to.contain(DefaultConfig.PLACEMENT_OBJECT.x);
    expect(label.className).to.contain(DefaultConfig.PLACEMENT_OBJECT.y);

    const labelText = label.querySelector(".jb-peek-label-text") as HTMLElement;
    expect(labelText).not.to.be.null;
    expect(labelText.textContent).to.equal(DefaultConfig.LABEL_TEXT);
  });

  it("should handle the configured selector", () => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a data-jb-modal href="http://www.test.org">
        <img class="jb-label" src="http://www.test.org/image.jpg" alt="" />
      </a>
    </div>
  </body>
</html>`;
    const { window } = new JSDOM(html);
    global.document = window.document;

    new Label({
      selector: "img.jb-label"
    });

    const img = document.querySelector("img") as HTMLImageElement;
    const labelContainer = img.parentElement as HTMLElement;
    
    expect(labelContainer).not.to.be.null;
    expect(labelContainer.className).to.equal("jb-peek-container");

    const label = img.nextElementSibling as HTMLElement;
    expect(label).not.to.be.null;
    expect(label.className).to.contain("jb-peek-label");
    expect(label.className).to.contain(DefaultConfig.PLACEMENT_OBJECT.x);
    expect(label.className).to.contain(DefaultConfig.PLACEMENT_OBJECT.y);

    const labelText = label.querySelector(".jb-peek-label-text") as HTMLElement;
    expect(labelText).not.to.be.null;
    expect(labelText.textContent).to.equal(DefaultConfig.LABEL_TEXT);
  });

  it("should handle the configured text", () => {
    new Label({
      text: "Preview"
    });

    const img = document.querySelector("img") as HTMLImageElement;
    const label = img.nextElementSibling as HTMLElement;
    const labelText = label.querySelector(".jb-peek-label-text") as HTMLElement;
    
    expect(labelText.textContent).to.equal("Preview");
  });

  it("should handle the configured placement", () => {
    new Label({
      placement: {
        x: "center",
        y: "bottom"
      }
    });

    const img = document.querySelector("img") as HTMLImageElement;
    const label = img.nextElementSibling as HTMLElement;
    expect(label).not.to.be.null;
    expect(label.className).to.contain("bottom");
    expect(label.className).to.contain("center");
  });

  it("should handle the custom label text attribute", () => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a data-jb-modal href="http://www.test.org">
        <img data-jb-label data-jb-label-text="Read Excerpt" src="http://www.test.org/image.jpg" alt="" />
      </a>
    </div>
  </body>
</html>`;
    const { window } = new JSDOM(html);
    global.document = window.document;

    new Label();

    const img = document.querySelector("img") as HTMLImageElement;
    const label = img.nextElementSibling as HTMLElement;
    const labelText = label.querySelector(".jb-peek-label-text") as HTMLElement;
    
    expect(labelText.textContent).to.equal("Read Excerpt");
  });

  it("should handle the custom label placement attribute", () => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a data-jb-modal href="http://www.test.org">
        <img data-jb-label data-jb-label-placement="bottom left" src="http://www.test.org/image.jpg" alt="" />
      </a>
    </div>
  </body>
</html>`;
    const { window } = new JSDOM(html);
    global.document = window.document;

    new Label();

    const img = document.querySelector("img") as HTMLImageElement;
    const label = img.nextElementSibling as HTMLElement;
    expect(label.className).to.contain("bottom");
    expect(label.className).to.contain("left");
  });

  it("should handle a missing placement axis and fallback on default", () => {
    const html = `<!doctype HTML><html>
    <body>
      <div>
        <a data-jb-modal href="http://www.test.org">
          <img data-jb-label data-jb-label-placement="bottom" src="http://www.test.org/image.jpg" alt="" />
        </a>
      </div>
    </body>
  </html>`;
      const { window } = new JSDOM(html);
      global.document = window.document;
  
      new Label();
  
      const img = document.querySelector("img") as HTMLImageElement;
      const label = img.nextElementSibling as HTMLElement;
      expect(label.className).to.contain(DefaultConfig.PLACEMENT_OBJECT.x);
      expect(label.className).to.contain("bottom");
  });

  it("should ignore non-conformant placement values (more than 2 in string)", () => {
    const html = `<!doctype HTML><html>
    <body>
      <div>
        <a data-jb-modal href="http://www.test.org">
          <img data-jb-label data-jb-label-placement="bottom left top" src="http://www.test.org/image.jpg" alt="" />
        </a>
      </div>
    </body>
  </html>`;
      const { window } = new JSDOM(html);
      global.document = window.document;
  
      new Label();
  
      const img = document.querySelector("img") as HTMLImageElement;
      const label = img.nextElementSibling as HTMLElement;
      expect(label.className).to.contain(DefaultConfig.PLACEMENT_OBJECT.x);
      expect(label.className).to.contain(DefaultConfig.PLACEMENT_OBJECT.y);
  });

  it("should prioritize the attribute over the JS config", () => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a data-jb-modal href="http://www.test.org">
        <img data-jb-label data-jb-label-text="Preview" data-jb-label-placement="top center" src="http://www.test.org/image.jpg" alt="" />
      </a>
    </div>
  </body>
</html>`;
    const { window } = new JSDOM(html);
    global.document = window.document;

    new Label({
      text: "Read Excerpt",
      placement: {
        x: "center",
        y: "bottom"
      }
    });

    const img = document.querySelector("img") as HTMLImageElement;
    const label = img.nextElementSibling as HTMLElement;
    const labelText = label.querySelector(".jb-peek-label-text") as HTMLElement;

    expect(label.className).to.contain("top");
    expect(label.className).to.contain("center");
    expect(labelText.textContent).to.equal("Preview");
  });

  it("should handle multiple labels", () => {
    const html = `<!doctype HTML><html>
  <body>
    <div>
      <a data-jb-modal href="http://www.test.org">
        <img data-jb-label src="http://www.test.org/image.jpg" alt="" />
      </a>
      <a data-jb-modal href="http://test.org">
        <img data-jb-label src="http://test.org/image.jpg" alt="" />
      </a>
    </div>
  </body>
</html>`;
    const { window } = new JSDOM(html);
    global.document = window.document;

    new Label();

    const imgs = document.querySelectorAll("img");
    imgs.forEach((img: HTMLImageElement) => {
      const label = img.nextElementSibling as HTMLElement;
      expect(label).not.to.be.null;
    })
  });
})
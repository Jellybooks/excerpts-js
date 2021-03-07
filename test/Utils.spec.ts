import { expect } from "chai";
import { JSDOM } from "jsdom";

import * as Utils from "../src/Utils";

describe("Utils", () => {
  describe("Splitting Attributes", () => {
    it("should split an attribute and create a Set", () => {
      const string = "top right";
      const set = Utils.splitAttr(string);

      expect(set.size).to.equal(2);
      expect(set.has("top")).to.be.true;
      expect(set.has("right")).to.be.true;
    });

    it("should not have duplicates", () => {
      const string = "top top";
      const set = Utils.splitAttr(string);

      expect(set.size).to.equal(1);
      expect(set.has("top")).to.be.true;
    });

    it("should not arbitrarily reduce the size of the set", () => {
      const string = "top right bottom left";
      const set = Utils.splitAttr(string);

      expect(set.size).to.equal(4);
    });
  });

  describe("Creating elements", () => {
    const { window } = new JSDOM(); 
  
    global.document = window.document;

    it("should create an element", () => {
      const el = Utils.createElement("div", {});

      expect(el.tagName.toLowerCase()).to.equal("div");
    });

    it("should create an element with an attribute", () => {
      const el = Utils.createElement("div", {"class": "my-class"});

      expect(el.tagName.toLowerCase()).to.equal("div");
      expect(el.className).to.equal("my-class");
    });

    it("should create an element with several attributes", () => {
      const el = Utils.createElement("div", {"class": "my-class", "aria-hidden": "true"});

      expect(el.tagName.toLowerCase()).to.equal("div");
      expect(el.className).to.equal("my-class");
      expect(el.getAttribute("aria-hidden")).to.equal("true");
    });

    it("should create an element with textContent", () => {
      const el = Utils.createElement("div", {}, "Hello World!");

      expect(el.tagName.toLowerCase()).to.equal("div");
      expect(el.textContent).to.equal("Hello World!");
    });
  });

  describe("Appending Parameters to URL", () => {
    it("should add a parameter", () => {
      const src = "http://www.test.org";
      const url = Utils.addParamToUrl(src, "embedded", "true");
      expect(url).to.equal("http://www.test.org/?embedded=true");
    });

    it("should append if there is one already", () => {
      const src = "http://www.test.org?hello=world";
      const url = Utils.addParamToUrl(src, "embedded", "true");
      expect(url).to.equal("http://www.test.org/?hello=world&embedded=true");
    });
  });
});
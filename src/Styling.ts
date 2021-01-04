import * as Utils from "./Utils";

export class Styling {
  public static init(): HTMLStyleElement {
    const stylesheet = Utils.createElement("style", {
      "id": "jb-modal-stylesheet",
      "type": "text/css"
    }, `#jb-modal {
      z-index: 99999;
      left: 10%;
      top: 10vh;
      width: 80%;
      height: 80vh;
      position: fixed;
    }
    .jb-modal-hidden {
      display: none;
    }
    #jb-modal-close {
      position: absolute;
      top: -2rem;
      right: -2rem;
      font-size: 2rem;
      -webkit-appearance: none;
    }
    #jb-modal-overlay {
      z-index: 99988;
      background-color: rgba(0, 0, 0, 0.25);
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
    }
    iframe {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: white;
      border: 1px solid #666;
    }
    `) as HTMLStyleElement;
    return stylesheet;
  }
}
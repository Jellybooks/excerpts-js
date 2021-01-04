import * as Utils from "./Utils";

export class Styling {
  public static init(): HTMLStyleElement {
    const stylesheet = Utils.createElement("style", {
      "id": "jb-modal-stylesheet",
      "type": "text/css"
    }, `.jb-modal-hidden {
      display: none;
    }
    .jb-modal {
      z-index: 99999;
      left: 10%;
      top: 10vh;
      width: 80%;
      height: 80vh;
      position: fixed;
    }
    .jb-modal iframe {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: white;
      border: 1px solid #666;
    }
    .jb-peek-container {
      position: relative;
    }
    .jb-peek-label {
      position: absolute;
      padding: 0.25rem 1rem 0.5rem;
      border: 0.0625rem solid #000000;
      background-color: #FFFFFF;
      font-weight: bold;
      display: inline-block;
      line-height: 1;
    }
    .jb-peek-label.top {
      top: 0;
    }
    .jb-peek-label.bottom {
      bottom: 0;
    }
    .jb-peek-label.left {
      left: 0;
    }
    .jb-peek-label.center {
      left: 50%;
      transform: translateX(-50%);
    }
    .jb-peek-label.right {
      right: 0;
    }
    .jb-peek-label-text {
      text-align: center;
      font-family: inherit;
      font-weight: bold;
    }
    .jb-modal-close {
      position: absolute;
      top: -2rem;
      right: -2rem;
      font-size: 2rem;
      border: 0.0625rem solid #000000;
      background-color: #FFFFFF;
      font-family: inherit;
      padding: 0.25rem 1rem 0.5rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      line-height: 1;
      -webkit-appearance: none;
    }
    .jb-modal-overlay {
      z-index: 99988;
      background-color: rgba(0, 0, 0, 0.5);
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
    }`) as HTMLStyleElement;
    return stylesheet;
  }
}
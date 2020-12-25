import { DefaultConfig } from "./DefaultConfig";
import * as Utils from "./Utils";

type PlacementX = "left" | "center" | "right";
type PlacementY = "top" | "bottom";

export interface IPlacementObject {
  x: PlacementX;
  y: PlacementY;
}

export interface ILabelConfig {
  selector?: string;
  text?: string;
  placement?: string | IPlacementObject;
}

export class Label {
  private placement: IPlacementObject;
  private text: string;

  private elements: NodeListOf<HTMLImageElement>;

  constructor(config: ILabelConfig) {
    this.placement = this.handlePlacementConfig(config.placement);
    this.text = config.text || DefaultConfig.PEEK_TEXT;

    if (config.selector) {
      this.elements = document.querySelectorAll(config.selector);
    } else {
      this.elements = document.querySelectorAll(DefaultConfig.LABEL_SELECTOR)
    }

    this.create();
  }

  private create() {
    this.elements.forEach(img => {
      // TODO: Label attributes + placement

      const label = Utils.createElement("div", {
        "id": "jb-peek-label",
        "class": "jb-peek-label"
      });

      const peekText: string = img.getAttribute(DefaultConfig.PREVIEW_TEXT_ATTR) || this.text;

      const labelText = Utils.createElement("span", {
        "id": "jb-peek-label-text",
        "class": "jb-peek-label-text"
      }, peekText);
  
      label.appendChild(labelText);
      img.parentElement?.appendChild(label);
    });
  }

  // TODO: Refacto to make it easier to re-use
  private handlePlacementConfig(placement?: string | IPlacementObject): IPlacementObject {
    let result: IPlacementObject = DefaultConfig.PLACEMENT_OBJECT;
    if (placement) {
      if (typeof placement === "string") {
        const values = Utils.splitAttr(placement);
        values.forEach((value) => {
          if (value === "left" || value === "center" || value === "right") {
            result.x = value;
          } else if (value === "top" || value === "bottom") {
            result.y = value;
          }
        })
      } else {
        if (placement.x === "left" || placement.x === "center" || placement.x === "right") {
          result.x = placement.x;
        }
        if (placement.y === "top" || placement.y === "bottom") {
          result.y = placement.y;
        }
      }
    }
    return result;
  }
}
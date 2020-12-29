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
  private globalPlacement: IPlacementObject;
  private text: string;

  private elements: NodeListOf<HTMLImageElement>;

  constructor(config: ILabelConfig) {
    this.globalPlacement = this.handleGlobalPlacement(config.placement);
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
      let peekPlacement: IPlacementObject = this.globalPlacement; 
      const placementAttr = this.checkPlacementAttr(img);
      if (placementAttr !== null) {
        peekPlacement.x = placementAttr.x;
        peekPlacement.y = placementAttr.y;
      }

      const label = Utils.createElement("div", {
        "id": "jb-peek-label",
        "class": `jb-peek-label ${peekPlacement.x} ${peekPlacement.y}`
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

  // TODO: Refacto to make it cleaner
  private handleGlobalPlacement(placement?: string | IPlacementObject): IPlacementObject {
    let result: IPlacementObject = DefaultConfig.PLACEMENT_OBJECT;
    if (placement) {
      if (typeof placement === "string") {
        const convertedPlacement = this.convertStringPlacement(placement);
        if (convertedPlacement !== null) {
          result.x = convertedPlacement.x;
          result.y = convertedPlacement.y;
        }
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

  private convertStringPlacement(placement: string): IPlacementObject | null {
    const values = Utils.splitAttr(placement);
    if (values.size === 2) {
      let placementX, placementY;
      values.forEach((value) => {
        if (value === "left" || value === "center" || value === "right") {
          placementX = value;
        } else if (value === "top" || value === "bottom") {
          placementY = value;
        }
      });
      if (placementX && placementY) {
        return {x: placementX, y: placementY};
      }
    }
    
    return null;
  }

  private checkPlacementAttr(img: HTMLImageElement): IPlacementObject | null {
    if (img.hasAttribute(DefaultConfig.PLACEMENT_ATTR)) {
      const placement = img.getAttribute(DefaultConfig.PLACEMENT_ATTR) as string;
      const convertedPlacement = this.convertStringPlacement(placement);
      if (convertedPlacement !== null) {
        return {
          x: convertedPlacement.x,
          y: convertedPlacement.y
        }
      }
    }

    return null;
  }
}
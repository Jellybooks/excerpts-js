import { DefaultConfig } from "./DefaultConfig";
import * as Utils from "./Utils";

const XPlacements = ["left", "center", "right"] as const;
type PlacementXTuple = typeof XPlacements;
type PlacementX = PlacementXTuple[number];

const YPlacements = ["top", "bottom"] as const;
type PlacementYTuple = typeof YPlacements;
type PlacementY = PlacementYTuple[number];

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

  constructor(config?: ILabelConfig) {
    this.globalPlacement = this.handleGlobalPlacement(config?.placement);
    this.text = config?.text || DefaultConfig.PEEK_TEXT;

    if (config?.selector) {
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

      const container = Utils.createElement("div", {
        "class": "jb-peek-container",
        "style": "pointer-events: none"
      });

      const label = Utils.createElement("div", {
        "class": `jb-peek-label ${peekPlacement.x} ${peekPlacement.y}`
      });

      const peekText: string = img.getAttribute(DefaultConfig.PREVIEW_TEXT_ATTR) || this.text;

      const labelText = Utils.createElement("span", {
        "class": "jb-peek-label-text"
      }, peekText);
  
      label.appendChild(labelText);

      img.parentNode?.insertBefore(container, img);
      container.appendChild(img);
      container.appendChild(label);
      container.style.width = window.getComputedStyle(container.parentElement as HTMLElement).getPropertyValue("width");
      container.style.height = window.getComputedStyle(container.parentElement as HTMLElement).getPropertyValue("height");
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
        if (XPlacements.includes(placement.x)) {
          result.x = placement.x;
        }
        if (YPlacements.includes(placement.y)) {
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
      values.forEach((value: any) => {
        if (XPlacements.includes(value)) {
          placementX = value;
        } else if (YPlacements.includes(value)) {
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
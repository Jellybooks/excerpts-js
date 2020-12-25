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

  }

  private create() {
    
  }
}
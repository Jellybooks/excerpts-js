import { IPlacementObject } from "./Label";

export class DefaultConfig {
  public static readonly MODAL_SELECTOR: string = "a[data-jb-modal]";
  public static readonly LABEL_SELECTOR: string = "img[data-jb-peek]";

  public static readonly PREVIEW_TEXT_ATTR: string = "data-jb-peek-text";
  public static readonly PLACEMENT_ATTR: string = "data-jb-peek-placement";
  public static readonly PLACEMENT_X_ATTR: string = "data-jb-peek-placement-x";
  public static readonly PLACEMENT_Y_ATTR: string = "data-jb-peek-placement-y";

  public static readonly PLACEMENT_OBJECT: IPlacementObject = {
    x: "right",
    y: "top"
  }

  public static readonly MOBILE_QUERY: string = "(min-width: 768px)";
}
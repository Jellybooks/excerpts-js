import { ILabelConfig, Label } from "./Label";
import { IModalConfig, Modal } from "./Modal";

interface IOptions {
  peek?: ILabelConfig;
  modal?: IModalConfig;
}

export default class {
  protected label: Label;
  protected modal: Modal;

  constructor(config?: IOptions) {
    this.label = new Label(config?.peek);
    this.modal = new Modal(config?.modal);
  }

  public static init(config?: IOptions) {
    return new this(config);
  }
}
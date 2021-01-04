import { ILabelConfig, Label } from "./Label";
import { IModalConfig, Modal } from "./Modal";

interface IOptions {
  peek?: ILabelConfig;
  modal?: IModalConfig;
}

export const init = (config?: IOptions) => {
  new Label(config?.peek);
  new Modal(config?.modal);
}
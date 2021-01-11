import { ILabelConfig, Label } from "./Label";
import { IModalConfig, Modal } from "./Modal";

interface IOptions {
  label?: ILabelConfig;
  modal?: IModalConfig;
}

export const init = (config?: IOptions) => {
  new Label(config?.label);
  new Modal(config?.modal);
}
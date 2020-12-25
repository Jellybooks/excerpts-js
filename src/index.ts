import { ILabelConfig } from "./Label";
import { IModalConfig } from "./Modal";

interface IOptions {
  peek?: ILabelConfig;
  modal?: IModalConfig;
}

export class Excerpts {
  constructor(config?: IOptions) {

  }

  public static init(config: IOptions): Excerpts {
    return new this(config);
  }
}
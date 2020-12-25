export interface IModalConfig {
  selector?: string;
  showOnMobile?: boolean;
}

export class Modal {
  private showOnMobile: boolean = false;
  private elements: NodeListOf<HTMLAnchorElement>;

  constructor(config: IModalConfig) {

  }
}
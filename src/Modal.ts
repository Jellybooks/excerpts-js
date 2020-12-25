import { DefaultConfig } from "./DefaultConfig";
import { Styling } from "./Styling";
import * as Utils from "./Utils";

export interface IModalConfig {
  selector?: string;
  showOnMobile?: boolean;
}

export class Modal {
  private showOnMobile: boolean;
  private isMobile: boolean = false;

  private elements: NodeListOf<HTMLAnchorElement>;

  private stylesheet: HTMLElement | null = null;
  private modal: HTMLElement | null = null;
  private closeButton: HTMLElement | null = null;
  private overlay: HTMLElement | null = null;
  private iframe: HTMLElement | null = null;

  constructor(config: IModalConfig) {
    this.showOnMobile = config.showOnMobile || false;
    
    if (config.selector) {
      this.elements = document.querySelectorAll(config.selector);
    } else {
      this.elements = document.querySelectorAll(DefaultConfig.MODAL_SELECTOR);
    }
    
    this.create();
    this.setupEvents();
  }

  private create(): void {    
    this.stylesheet = Styling.init();
    document.head.appendChild(this.stylesheet);

    this.modal = Utils.createElement("div", {
      "id": "jb-modal",
      "class": "jb-modal",
      "role": "dialog",
      "aria-label": "excerpt"
    });

    this.closeButton = Utils.createElement("button", {
      "type": "button",
      "id": "jb-modal-close",
      "class": "jb-modal-close",
      "aria-label": "Close Excerpt"
    });
    this.closeButton.textContent = "x";

    this.overlay = Utils.createElement("div", {
      "id": "jb-modal-overlay",
      "class": "jb-modal-overlay",
      "tabindex": "-1"
    });

    this.iframe = Utils.createElement("iframe", {
      "src": "_blank",
    });

    this.modal.appendChild(this.closeButton);
    this.modal.appendChild(this.iframe);

    document.body.appendChild(this.modal);
    document.body.appendChild(this.overlay);
  }

  private setupEvents(): void {
    this.elements.forEach(anchor => {
      anchor.addEventListener("click", this.open.bind(this));
    })
    this.closeButton?.addEventListener("click", this.close.bind(this));
    this.overlay?.addEventListener("click", this.close.bind(this));
    this.handleMobileQuery();
  }

  private open(event: Event): void {
    
  }

  private close(): void {

  }

  private handleMobileQuery(): void {
    const mediaQuery = window.matchMedia(DefaultConfig.MOBILE_QUERY);
    mediaQuery.addListener((event: MediaQueryListEvent) => {
      if (event.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    })
  }
}
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

  private stylesheet: HTMLStyleElement | null = null;
  private modal: HTMLDivElement | null = null;
  private closeButton: HTMLButtonElement | null = null;
  private overlay: HTMLDivElement | null = null;
  private iframe: HTMLIFrameElement | null = null;

  constructor(config?: IModalConfig) {
    this.showOnMobile = config?.showOnMobile || false;
    
    if (config?.selector) {
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
      "class": "jb-modal jb-modal-hidden",
      "role": "dialog",
      "aria-label": "excerpt",
      "aria-hidden": "true",
      "hidden": "true"
    }) as HTMLDivElement;

    this.closeButton = Utils.createElement("button", {
      "type": "button",
      "id": "jb-modal-close",
      "class": "jb-modal-close",
      "aria-label": "Close Excerpt"
    }, "x") as HTMLButtonElement;

    this.overlay = Utils.createElement("div", {
      "id": "jb-modal-overlay",
      "class": "jb-modal-overlay",
      "tabindex": "-1"
    }) as HTMLDivElement;

    this.iframe = Utils.createElement("iframe", {
      "src": "_blank",
    }) as HTMLIFrameElement;

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

  private open(event: MouseEvent): void {
    if (this.isMobile && !this.showOnMobile) {
      return;
    }
    const target = event.target as HTMLAnchorElement;
    if (this.iframe && target.href) {
      event.preventDefault();
      event.stopPropagation();

      this.iframe.src = target.href;
      this.modal?.classList.remove("jb-modal-hidden");
      this.modal?.removeAttribute("aria-hidden");
      this.modal?.removeAttribute("hidden");
    }
  }

  private close(): void {
    this.modal?.classList.add("jb-modal-hidden");
    this.modal?.setAttribute("aria-hidden", "true");
    this.modal?.setAttribute("hidden", "true");
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
import { DefaultConfig } from "./DefaultConfig";
import * as Utils from "./Utils";

export interface IModalConfig {
  selector?: string;
  showOnMobile?: boolean;
  positioning?: "left" | "right" | "center";
}

export class Modal {
  private showOnMobile: boolean;
  private isMobile: boolean = false;

  private elements: NodeListOf<HTMLAnchorElement>;

  private modalContainer: HTMLDivElement | null = null;
  private modal: HTMLDivElement | null = null;
  private closeButton: HTMLButtonElement | null = null;
  private overlay: HTMLDivElement | null = null;
  private iframe: HTMLIFrameElement | null = null;
  private positioning: "left" | "right" | "center";
  constructor(config?: IModalConfig) {
    this.showOnMobile = config?.showOnMobile || false;

    if (config?.selector) {
      this.elements = document.querySelectorAll(config.selector);
    } else {
      this.elements = document.querySelectorAll(DefaultConfig.MODAL_SELECTOR);
    }
    if (config?.positioning) {
      this.positioning = config.positioning;
    } else {
      this.positioning = "center";
    }

    this.create();
    this.setupEvents();
  }

  private create(): void {
    this.modalContainer = Utils.createElement("div", {
      class: "jb-modal-container jb-modal-hidden",
      hidden: "true",
    }) as HTMLDivElement;

    this.modal = Utils.createElement("div", {
      class: "jb-modal",
      role: "dialog",
      "aria-label": "excerpt",
      "aria-hidden": "true",
    }) as HTMLDivElement;

    if (this.positioning) {
      this.modal.classList.add("jb-" + this.positioning);
    }

    this.closeButton = Utils.createElement(
      "button",
      {
        type: "button",
        class: "jb-modal-close",
        "aria-label": "Close Excerpt",
      },
      "x"
    ) as HTMLButtonElement;

    this.overlay = Utils.createElement("div", {
      class: "jb-modal-overlay",
      tabindex: "-1",
    }) as HTMLDivElement;

    this.iframe = Utils.createElement("iframe", {
      src: "about:blank",
    }) as HTMLIFrameElement;

    this.modal.appendChild(this.closeButton);
    this.modal.appendChild(this.iframe);

    this.modalContainer.appendChild(this.modal);
    this.modalContainer.appendChild(this.overlay);

    document.body.appendChild(this.modalContainer);
  }

  private setupEvents(): void {
    this.elements.forEach((anchor) => {
      anchor.addEventListener("click", this.open.bind(this));
    });
    this.closeButton?.addEventListener("click", this.close.bind(this));
    this.overlay?.addEventListener("click", this.close.bind(this));
    this.handleMobileQuery();
    const iframe = this.iframe
    if (iframe) {
      iframe.addEventListener("load", function () {
        iframe.focus()
      })
    }
  }

  private open(event: MouseEvent): void {
    if (this.isMobile && !this.showOnMobile) {
      return;
    }

    const target = event.currentTarget as HTMLAnchorElement;
    if (this.iframe && target.href) {
      event.preventDefault();
      event.stopPropagation();
      
      this.iframe.src = Utils.addParamToUrl(target.href, "embedded", "true");
      this.modalContainer?.classList.remove("jb-modal-hidden");
      this.modalContainer?.removeAttribute("hidden");
      this.modal?.removeAttribute("aria-hidden");
      document.body.style.overflow = "hidden";
    }
  }

  private close(): void {
    this.modalContainer?.classList.add("jb-modal-hidden");
    this.modalContainer?.setAttribute("hidden", "true");
    this.modal?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  private handleMobileQuery(): void {
    const mediaQuery = window.matchMedia(DefaultConfig.MOBILE_QUERY);
    mediaQuery.addListener((event: MediaQueryListEvent) => {
      if (event.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
}

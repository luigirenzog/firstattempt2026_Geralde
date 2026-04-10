import { LitElement, html } from 'lit'
import adduLogo from './assets/ADDULogo.jpg'

class AlumniSidebar extends LitElement {
  static properties = {
    showCloseButton: { type: Boolean, attribute: 'show-close-button' },
    currentView: { type: String, attribute: 'current-view' },
  }

  constructor() {
    super()
    this.showCloseButton = false
    this.currentView = 'home'
  }

  createRenderRoot() {
    return this
  }

  get menuItems() {
    return [
      { label: 'Home', icon: this.homeIcon(), view: 'home', active: this.currentView === 'home' },
      { label: 'News & Updates', icon: this.newsIcon(), view: 'news', active: this.currentView === 'news' },
      { label: 'My Profile', icon: this.userIcon(), view: 'profile', active: this.currentView === 'profile' },
      { label: 'Alumni Calendar', icon: this.calendarIcon(), view: 'calendar', active: this.currentView === 'calendar' },
      { label: 'Networking & Events', icon: this.gridIcon(), view: 'networking', active: this.currentView === 'networking' },
      { label: 'Document Request', icon: this.documentIcon(), view: 'document-request', active: this.currentView === 'document-request' },
      { label: 'Job Opportunities', icon: this.jobIcon(), view: 'job-offerings', active: this.currentView === 'job-offerings' },
      { label: 'Career Opportunities', icon: this.buildingIcon() },
      { label: 'Donations', icon: this.heartIcon(), view: 'donations', active: this.currentView === 'donations' },
    ]
  }

  emitClose() {
    this.dispatchEvent(
      new CustomEvent('close-sidebar', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  emitSignOut() {
    this.dispatchEvent(
      new CustomEvent('sign-out', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  emitNavigate(view) {
    if (!view) {
      return
    }

    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { view },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <div class="relative flex h-full flex-col bg-gradient-to-b from-[#1f2f7a] via-[#243c96] to-[#2c4cb4] text-[#e4ecff]">
        <div class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/6"></div>
        <div class="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/6"></div>

        <header class="border-b border-white/15 px-5 pb-4 pt-5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/20">
                <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
              </div>
              <div>
                <p class="text-[24px] font-semibold leading-none text-white">Alumni Portal</p>
                <p class="mt-1 text-sm text-[#d5ddff]">Ateneo de Davao</p>
              </div>
            </div>

            ${this.showCloseButton
              ? html`
                  <button
                    type="button"
                    @click=${this.emitClose}
                    class="flex h-9 w-9 items-center justify-center rounded-full bg-white/14 text-[#d9e4ff] lg:hidden"
                    aria-label="Close sidebar"
                  >
                    ${this.closeIcon()}
                  </button>
                `
              : ''}
          </div>
        </header>

        <nav class="flex-1 space-y-1 overflow-y-auto px-4 py-5">
          ${this.menuItems.map(
            (item) => html`
              <button
                type="button"
                @click=${() => this.emitNavigate(item.view)}
                class=${`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${item.active ? 'bg-white/12 text-white' : 'text-[#d6e0ff] hover:bg-white/10'}`}
              >
                <span class="flex items-center gap-3">
                  <span class="text-[#ffd451]">${item.icon}</span>
                  <span class="text-[16px] font-medium">${item.label}</span>
                </span>
                ${item.active ? html`<span class="h-2 w-2 rounded-full bg-[#ffd451]"></span>` : ''}
              </button>
            `,
          )}
        </nav>

        <footer class="border-t border-white/15 px-5 py-5">
          <div class="mb-4 flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-white/14 font-semibold text-white">JD</div>
            <div>
              <p class="text-[16px] font-semibold text-white">Juan C. Dela Cruz</p>
              <p class="text-sm text-[#d6e0ff]">Alumni</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button type="button" class="rounded-2xl bg-white/12 py-2.5 text-[15px] font-semibold text-white hover:bg-white/18">Settings</button>
            <button type="button" @click=${this.emitSignOut} class="rounded-2xl bg-white/12 py-2.5 text-[15px] font-semibold text-white hover:bg-white/18">Sign Out</button>
          </div>
        </footer>
      </div>
    `
  }

  iconBase(path) {
    return html`
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${path}
      </svg>
    `
  }

  closeIcon() {
    return this.iconBase(html`<line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line>`)
  }

  homeIcon() {
    return this.iconBase(html`<path d="M3 10.5 12 3l9 7.5"></path><path d="M5 10v10h14V10"></path>`)
  }

  newsIcon() {
    return this.iconBase(html`<rect x="4" y="4" width="16" height="16" rx="2"></rect><line x1="8" y1="9" x2="16" y2="9"></line><line x1="8" y1="13" x2="16" y2="13"></line>`)
  }

  userIcon() {
    return this.iconBase(html`<circle cx="12" cy="8" r="3"></circle><path d="M6 20a6 6 0 0 1 12 0"></path>`)
  }

  calendarIcon() {
    return this.iconBase(html`<rect x="3" y="5" width="18" height="16" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line><line x1="8" y1="3" x2="8" y2="7"></line><line x1="16" y1="3" x2="16" y2="7"></line>`)
  }

  gridIcon() {
    return this.iconBase(html`<rect x="4" y="4" width="6" height="6"></rect><rect x="14" y="4" width="6" height="6"></rect><rect x="4" y="14" width="6" height="6"></rect><rect x="14" y="14" width="6" height="6"></rect>`)
  }

  documentIcon() {
    return this.iconBase(html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><line x1="8" y1="13" x2="16" y2="13"></line>`)
  }

  jobIcon() {
    return this.iconBase(html`<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>`)
  }

  buildingIcon() {
    return this.iconBase(html`<rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01"></path>`)
  }

  heartIcon() {
    return this.iconBase(html`<path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.4-7 10-7 10z"></path>`)
  }
}

customElements.define('alumni-sidebar', AlumniSidebar)

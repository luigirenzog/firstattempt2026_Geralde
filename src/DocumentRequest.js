import { LitElement, html } from 'lit'
import adduLogo from './assets/ADDULogo.jpg'

class DocumentRequestPage extends LitElement {
  static properties = {
    activeTab: { state: true },
    showNewRequestModal: { state: true },
    selectedDocumentId: { state: true },
    searchQuery: { state: true },
    purpose: { state: true },
    copies: { state: true },
    pickupMethod: { state: true },
    myRequests: { state: true },
  }

  constructor() {
    super()
    this.activeTab = 'request'
    this.showNewRequestModal = false
    this.selectedDocumentId = null
    this.searchQuery = ''
    this.purpose = ''
    this.copies = 1
    this.pickupMethod = 'Pickup at Office'
    this.myRequests = [
      {
        id: 'REQ-1001',
        documentType: 'Official Transcript of Records',
        office: 'Registrar Office',
        status: 'processing',
        requestDate: '2026-04-01',
        copies: 2,
        trackingNumber: 'ADDU-TOR-8841',
        notes: 'For overseas job application.',
      },
      {
        id: 'REQ-1002',
        documentType: 'Certificate of Graduation',
        office: 'Registrar Office',
        status: 'ready',
        requestDate: '2026-03-20',
        copies: 1,
        trackingNumber: 'ADDU-COG-7609',
        notes: 'Ready for pickup at Window 3.',
      },
    ]
  }

  createRenderRoot() {
    return this
  }

  get documentTypes() {
    return [
      {
        id: 'tor',
        name: 'Official Transcript of Records',
        office: 'Registrar Office',
        description: 'Complete academic transcript with university seal and dry stamp.',
        fee: 250,
        processingDays: '5-7 business days',
        requirements: ['Valid government ID', 'No pending accountabilities', 'Filled-out request form'],
      },
      {
        id: 'cog',
        name: 'Certificate of Graduation',
        office: 'Registrar Office',
        description: 'Official certification confirming graduation status and degree earned.',
        fee: 150,
        processingDays: '3-5 business days',
        requirements: ['Valid government ID', 'Alumni ID or student number'],
      },
      {
        id: 'good-moral',
        name: 'Certificate of Good Moral Character',
        office: 'Student Affairs Office',
        description: 'Certification of character and conduct issued by Student Affairs.',
        fee: 120,
        processingDays: '2-4 business days',
        requirements: ['Valid government ID', 'Latest clearance slip'],
      },
      {
        id: 'diploma',
        name: 'Certified True Copy of Diploma',
        office: 'Registrar Office',
        description: 'Certified copy of diploma for employment and licensure requirements.',
        fee: 200,
        processingDays: '4-6 business days',
        requirements: ['Valid government ID', 'Original diploma for verification'],
      },
      {
        id: 'units',
        name: 'Certification of Units Earned',
        office: 'Registrar Office',
        description: 'Official record of completed units per semester and overall program.',
        fee: 130,
        processingDays: '3-5 business days',
        requirements: ['Valid government ID'],
      },
    ]
  }

  get selectedDocument() {
    return this.documentTypes.find((item) => item.id === this.selectedDocumentId) || null
  }

  get filteredDocumentTypes() {
    const query = this.searchQuery.trim().toLowerCase()
    if (!query) {
      return this.documentTypes
    }
    return this.documentTypes.filter((doc) => `${doc.name} ${doc.office}`.toLowerCase().includes(query))
  }

  emitToggleSidebar() {
    this.dispatchEvent(
      new CustomEvent('toggle-sidebar', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  setActiveTab(tab) {
    this.activeTab = tab
  }

  openRequestModal(documentId) {
    this.selectedDocumentId = documentId
    this.purpose = ''
    this.copies = 1
    this.pickupMethod = 'Pickup at Office'
    this.showNewRequestModal = true
  }

  closeRequestModal() {
    this.showNewRequestModal = false
    this.selectedDocumentId = null
  }

  submitRequest() {
    if (!this.selectedDocument) {
      return
    }

    const created = {
      id: `REQ-${Date.now()}`,
      documentType: this.selectedDocument.name,
      office: this.selectedDocument.office,
      status: 'pending',
      requestDate: new Date().toISOString(),
      copies: Number(this.copies) || 1,
      trackingNumber: `ADDU-${Math.floor(Math.random() * 9000 + 1000)}`,
      notes: this.purpose ? `Purpose: ${this.purpose}` : 'No additional note.',
    }

    this.myRequests = [created, ...this.myRequests]
    this.closeRequestModal()
    this.activeTab = 'history'
  }

  statusClass(status) {
    if (status === 'pending') return 'bg-[#fff5d9] text-[#b57d00] border-[#f4d788]'
    if (status === 'processing') return 'bg-[#e5f0ff] text-[#315faf] border-[#b9cef8]'
    if (status === 'ready') return 'bg-[#e2f6ea] text-[#22754d] border-[#a9dfbf]'
    if (status === 'completed') return 'bg-[#eceff5] text-[#58627d] border-[#ccd3e2]'
    return 'bg-[#ffe8e8] text-[#b03636] border-[#f0b6b6]'
  }

  statusIcon(status) {
    if (status === 'pending') return html`<span>◷</span>`
    if (status === 'processing') return html`<span>⌛</span>`
    if (status === 'ready') return html`<span>✓</span>`
    if (status === 'completed') return html`<span>✓</span>`
    return html`<span>✕</span>`
  }

  render() {
    return html`
      <main class="min-h-full bg-gradient-to-b from-[#1a2a6c] via-[#1e3a8a] to-[#2563eb] px-4 py-5 text-white sm:px-6 lg:px-8">
        <section class="mx-auto w-full max-w-[1220px]">
          <header class="rounded-3xl bg-gradient-to-r from-[#223787] to-[#2d50b8] px-5 py-5 shadow-[0_20px_40px_-24px_rgba(8,19,72,0.95)]">
            <div class="flex items-center justify-between">
              <button type="button" @click=${this.emitToggleSidebar} class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#dbe5ff] lg:hidden" aria-label="Open sidebar">${this.menuIcon()}</button>
              <div>
                <h1 class="text-[36px] font-semibold leading-tight">Document Request</h1>
                <p class="mt-1 text-[17px] text-[#d7e1ff]">Request official documents from university offices</p>
              </div>
              <div class="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/25">
                <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
              </div>
            </div>
          </header>

          <section class="mt-4 rounded-3xl bg-[#eef2f9] p-4 text-[#1f327f] shadow-[0_16px_36px_-24px_rgba(8,19,72,0.8)]">
            <div class="mb-4 flex flex-wrap gap-2">
              <button type="button" @click=${() => this.setActiveTab('request')} class=${`rounded-xl px-4 py-2 text-[14px] font-semibold ${this.activeTab === 'request' ? 'bg-[#1f327f] text-white' : 'bg-[#dde5f3] text-[#4f6394] hover:bg-[#d5deef]'}`}>New Request</button>
              <button type="button" @click=${() => this.setActiveTab('history')} class=${`rounded-xl px-4 py-2 text-[14px] font-semibold ${this.activeTab === 'history' ? 'bg-[#1f327f] text-white' : 'bg-[#dde5f3] text-[#4f6394] hover:bg-[#d5deef]'}`}>My Requests</button>
            </div>

            ${this.activeTab === 'request' ? this.renderRequestTab() : this.renderHistoryTab()}
          </section>
        </section>

        ${this.showNewRequestModal && this.selectedDocument ? this.renderNewRequestModal() : ''}
      </main>
    `
  }

  renderRequestTab() {
    return html`
      <div class="space-y-4">
        <div class="relative">
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8fa1c8]">${this.searchIcon()}</span>
          <input
            type="text"
            .value=${this.searchQuery}
            @input=${(event) => {
              this.searchQuery = event.target.value
            }}
            placeholder="Search documents..."
            class="w-full rounded-xl border border-[#ccd6ea] bg-white px-10 py-2.5 text-[15px] text-[#2e437d] outline-none"
          />
        </div>

        <div class="grid grid-cols-1 gap-3 xl:grid-cols-2">
          ${this.filteredDocumentTypes.map(
            (doc) => html`
              <button type="button" @click=${() => this.openRequestModal(doc.id)} class="rounded-2xl border border-[#d5deee] bg-white p-4 text-left shadow-[0_12px_24px_-22px_rgba(16,33,80,0.8)] transition hover:bg-[#f8faff]">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h3 class="text-[22px] font-semibold text-[#233f8b]">${doc.name}</h3>
                    <p class="text-[14px] text-[#687ca8]">${doc.office}</p>
                  </div>
                  <span class="text-[#9bb0da]">${this.chevronRightIcon()}</span>
                </div>
                <p class="mt-2 text-[15px] leading-6 text-[#4f618f]">${doc.description}</p>
                <div class="mt-3 flex items-center gap-2 text-[13px]">
                  <span class="font-semibold text-[#d69d2d]">PHP ${doc.fee}</span>
                  <span class="text-[#97a8cc]">•</span>
                  <span class="text-[#6d80ad]">${doc.processingDays}</span>
                </div>
              </button>
            `,
          )}
        </div>
      </div>
    `
  }

  renderHistoryTab() {
    return html`
      <div class="space-y-3">
        ${this.myRequests.length === 0
          ? html`
              <div class="rounded-2xl border border-[#d5deee] bg-white py-12 text-center">
                <div class="mx-auto mb-3 text-[#9db1d9]">${this.fileIcon()}</div>
                <p class="text-[16px] text-[#6d80ad]">No document requests yet</p>
              </div>
            `
          : this.myRequests.map(
              (request) => html`
                <article class="rounded-2xl border border-[#d5deee] bg-white p-4 shadow-[0_12px_24px_-22px_rgba(16,33,80,0.8)]">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <h3 class="text-[20px] font-semibold text-[#233f8b]">${request.documentType}</h3>
                      <p class="text-[14px] text-[#687ca8]">${request.office}</p>
                      <div class=${`mt-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] font-semibold ${this.statusClass(request.status)}`}>
                        ${this.statusIcon(request.status)}
                        <span class="capitalize">${request.status}</span>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-[11px] text-[#8fa1c8]">Tracking #</p>
                      <p class="text-[12px] font-mono text-[#37589f]">${request.trackingNumber}</p>
                    </div>
                  </div>

                  <p class="mt-3 text-[14px] text-[#5a6f9a]">${request.notes}</p>

                  <div class="mt-3 flex items-center justify-between text-[12px] text-[#7284ae]">
                    <span>Requested: ${new Date(request.requestDate).toLocaleDateString()}</span>
                    <span>${request.copies} ${request.copies > 1 ? 'copies' : 'copy'}</span>
                  </div>

                  ${request.status === 'ready'
                    ? html`<button type="button" class="mt-3 w-full rounded-lg bg-[#e6c65a] px-3 py-2 text-[13px] font-semibold text-[#1a2a6c]">View Pickup Details</button>`
                    : ''}
                </article>
              `,
            )}
      </div>
    `
  }

  renderNewRequestModal() {
    const doc = this.selectedDocument
    return html`
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-6 backdrop-blur-[2px]" @click=${this.closeRequestModal}>
        <article class="flex max-h-[86vh] w-full max-w-[760px] flex-col overflow-hidden rounded-3xl bg-white text-[#1f327f] shadow-[0_30px_70px_-28px_rgba(6,15,60,0.95)]" @click=${(event) => event.stopPropagation()}>
          <header class="border-b border-[#e0e6f3] px-5 py-4">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-[24px] font-semibold">${doc.name}</h2>
              <button type="button" @click=${this.closeRequestModal} class="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef2fb] text-[#6278a8]">${this.closeIcon()}</button>
            </div>
          </header>

          <div class="flex-1 overflow-y-auto px-5 py-4">
            <div class="space-y-4 text-[15px] text-[#4f618f]">
              <div>
                <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Office</h3>
                <p>${doc.office}</p>
              </div>

              <div>
                <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Description</h3>
                <p>${doc.description}</p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Processing Time</h3>
                  <p>${doc.processingDays}</p>
                </div>
                <div>
                  <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Fee</h3>
                  <p class="font-semibold text-[#d69d2d]">PHP ${doc.fee}</p>
                </div>
              </div>

              <div>
                <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Requirements</h3>
                <ul class="space-y-1">
                  ${doc.requirements.map((req) => html`<li class="flex items-start gap-2"><span class="mt-1 text-[#2a49a8]">•</span><span>${req}</span></li>`) }
                </ul>
              </div>

              <label class="block">
                <span class="mb-1 block text-[14px] font-semibold text-[#264796]">Purpose</span>
                <input
                  type="text"
                  .value=${this.purpose}
                  @input=${(event) => {
                    this.purpose = event.target.value
                  }}
                  placeholder="e.g., Job Application, Further Studies"
                  class="w-full rounded-lg border border-[#d0d9ec] px-3 py-2 text-[14px] outline-none"
                />
              </label>

              <label class="block">
                <span class="mb-1 block text-[14px] font-semibold text-[#264796]">Number of Copies</span>
                <input
                  type="number"
                  min="1"
                  .value=${String(this.copies)}
                  @input=${(event) => {
                    this.copies = Number(event.target.value) || 1
                  }}
                  class="w-full rounded-lg border border-[#d0d9ec] px-3 py-2 text-[14px] outline-none"
                />
              </label>

              <div>
                <span class="mb-1 block text-[14px] font-semibold text-[#264796]">Pickup Method</span>
                <div class="space-y-2">
                  ${['Pickup at Office', 'Email (PDF)', 'Mail Delivery'].map(
                    (method) => html`
                      <label class="flex cursor-pointer items-center gap-2 rounded-lg border border-[#d0d9ec] px-3 py-2 hover:bg-[#f7f9fd]">
                        <input type="radio" name="pickup" .checked=${this.pickupMethod === method} @change=${() => { this.pickupMethod = method }} />
                        <span class="text-[14px] text-[#4f618f]">${method}</span>
                      </label>
                    `,
                  )}
                </div>
              </div>
            </div>
          </div>

          <footer class="border-t border-[#e0e6f3] px-5 py-4">
            <div class="space-y-2">
              <button type="button" @click=${this.submitRequest} class="w-full rounded-lg bg-[#1a2a6c] px-3 py-3 text-[15px] font-semibold text-white hover:bg-[#152252]">Submit Request</button>
              <button type="button" @click=${this.closeRequestModal} class="w-full rounded-lg bg-[#f1f4fb] px-3 py-2.5 text-[14px] text-[#6278a8] hover:bg-[#e7edf9]">Cancel</button>
            </div>
          </footer>
        </article>
      </div>
    `
  }

  iconBase(path) {
    return html`<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`
  }

  menuIcon() {
    return this.iconBase(html`<line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line>`)
  }

  searchIcon() {
    return this.iconBase(html`<circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>`)
  }

  chevronRightIcon() {
    return this.iconBase(html`<polyline points="9 18 15 12 9 6"></polyline>`)
  }

  closeIcon() {
    return this.iconBase(html`<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`)
  }

  fileIcon() {
    return this.iconBase(html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><line x1="8" y1="13" x2="16" y2="13"></line>`)
  }
}

customElements.define('document-request-page', DocumentRequestPage)
import { LitElement, html } from 'lit'
import adduLogo from './assets/ADDULogo.jpg'

class DonationsPage extends LitElement {
  static properties = {
    activeTab: { state: true },
    selectedCategory: { state: true },
    selectedCampaignId: { state: true },
    showDonateModal: { state: true },
    donationAmount: { state: true },
    paymentMethod: { state: true },
    myDonations: { state: true },
  }

  constructor() {
    super()
    this.activeTab = 'campaigns'
    this.selectedCategory = 'all'
    this.selectedCampaignId = null
    this.showDonateModal = false
    this.donationAmount = 1000
    this.paymentMethod = 'Credit/Debit Card'
    this.myDonations = [
      {
        id: 'DON-1001',
        campaignTitle: 'Future Scholars Fund',
        amount: 2500,
        date: '2026-03-20',
        method: 'GCash',
        receiptNumber: 'ADDU-REC-88210',
      },
      {
        id: 'DON-1002',
        campaignTitle: 'Research Innovation Grant',
        amount: 1000,
        date: '2026-02-14',
        method: 'Bank Transfer',
        receiptNumber: 'ADDU-REC-86172',
      },
    ]
  }

  createRenderRoot() {
    return this
  }

  get categories() {
    return ['all', 'scholarship', 'infrastructure', 'research', 'community', 'general']
  }

  get donationCampaigns() {
    return [
      {
        id: 'cmp-001',
        title: 'Future Scholars Fund',
        organizer: 'AdDU Scholarship Office',
        category: 'scholarship',
        featured: true,
        description: 'Support deserving students with tuition and learning support grants.',
        story: 'Every donation contributes directly to scholarship allocation and academic support services.',
        currentAmount: 780000,
        targetAmount: 1200000,
        donorCount: 431,
      },
      {
        id: 'cmp-002',
        title: 'Campus Learning Spaces Upgrade',
        organizer: 'Facilities Development Unit',
        category: 'infrastructure',
        featured: true,
        description: 'Help modernize classrooms and create better collaborative learning spaces.',
        story: 'This campaign funds upgraded rooms, equipment, and accessibility improvements.',
        currentAmount: 340000,
        targetAmount: 900000,
        donorCount: 189,
      },
      {
        id: 'cmp-003',
        title: 'Research Innovation Grant',
        organizer: 'College of Science and Engineering',
        category: 'research',
        featured: false,
        description: 'Enable student and faculty-led projects to solve real community problems.',
        story: 'Funds are used for materials, publication support, and prototype development.',
        currentAmount: 220000,
        targetAmount: 500000,
        donorCount: 116,
      },
      {
        id: 'cmp-004',
        title: 'Community Outreach Missions',
        organizer: 'Community Engagement Office',
        category: 'community',
        featured: false,
        description: 'Extend social impact programs through education, health, and livelihood initiatives.',
        story: 'Support outreach teams, supplies, and transportation for partner communities.',
        currentAmount: 145000,
        targetAmount: 300000,
        donorCount: 94,
      },
      {
        id: 'cmp-005',
        title: 'Alumni Giving Pool',
        organizer: 'Alumni Relations Office',
        category: 'general',
        featured: false,
        description: 'Flexible fund used where the university needs support most.',
        story: 'This fund is distributed across urgent and high-impact institutional priorities.',
        currentAmount: 510000,
        targetAmount: 700000,
        donorCount: 260,
      },
    ]
  }

  get impactStats() {
    return {
      totalDonated: this.myDonations.reduce((sum, item) => sum + item.amount, 0),
      studentsHelped: 4,
      donationRank: 'Gold Patron',
      campaignsSupported: 3,
    }
  }

  get selectedCampaign() {
    return this.donationCampaigns.find((campaign) => campaign.id === this.selectedCampaignId) || null
  }

  get filteredCampaigns() {
    if (this.selectedCategory === 'all') {
      return this.donationCampaigns
    }
    return this.donationCampaigns.filter((campaign) => campaign.category === this.selectedCategory)
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

  setCategory(category) {
    this.selectedCategory = category
  }

  openDonateModal(campaignId) {
    this.selectedCampaignId = campaignId
    this.donationAmount = 1000
    this.paymentMethod = 'Credit/Debit Card'
    this.showDonateModal = true
  }

  closeDonateModal() {
    this.showDonateModal = false
    this.selectedCampaignId = null
  }

  progressPercentage(current, target) {
    return Math.min((current / target) * 100, 100)
  }

  categoryClass(category) {
    if (category === 'scholarship') return 'bg-[#e5f0ff] text-[#315faf] border-[#b9cef8]'
    if (category === 'infrastructure') return 'bg-[#efe9ff] text-[#6a46b5] border-[#cebdf3]'
    if (category === 'research') return 'bg-[#e2f6ea] text-[#22754d] border-[#a9dfbf]'
    if (category === 'community') return 'bg-[#fff0e1] text-[#bf5e0f] border-[#f2c9a0]'
    return 'bg-[#eceff5] text-[#58627d] border-[#ccd3e2]'
  }

  submitDonation() {
    const selectedCampaign = this.selectedCampaign
    const amount = Number(this.donationAmount) || 0

    if (!selectedCampaign || amount <= 0) {
      return
    }

    this.myDonations = [
      {
        id: `DON-${Date.now()}`,
        campaignTitle: selectedCampaign.title,
        amount,
        date: new Date().toISOString(),
        method: this.paymentMethod,
        receiptNumber: `ADDU-REC-${Math.floor(Math.random() * 90000 + 10000)}`,
      },
      ...this.myDonations,
    ]

    this.closeDonateModal()
    this.activeTab = 'history'
  }

  formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  render() {
    return html`
      <main class="min-h-full bg-gradient-to-b from-[#1a2a6c] via-[#1e3a8a] to-[#2563eb] px-4 py-5 text-white sm:px-6 lg:px-8">
        <section class="mx-auto w-full max-w-[1240px]">
          <header class="rounded-3xl bg-gradient-to-r from-[#223787] to-[#2d50b8] px-5 py-5 shadow-[0_20px_40px_-24px_rgba(8,19,72,0.95)]">
            <div class="flex items-center justify-between">
              <button type="button" @click=${this.emitToggleSidebar} class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#dbe5ff] lg:hidden" aria-label="Open sidebar">${this.menuIcon()}</button>
              <div>
                <h1 class="text-[36px] font-semibold leading-tight">Donations</h1>
                <p class="mt-1 text-[17px] text-[#d7e1ff]">Support AdDU's mission and make an impact</p>
              </div>
              <div class="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/25">
                <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
              </div>
            </div>
          </header>

          <section class="mt-4 rounded-3xl bg-[#eef2f9] p-4 text-[#1f327f] shadow-[0_16px_36px_-24px_rgba(8,19,72,0.8)]">
            <div class="mb-4 flex flex-wrap gap-2">
              <button type="button" @click=${() => this.setActiveTab('campaigns')} class=${`rounded-xl px-4 py-2 text-[14px] font-semibold ${this.activeTab === 'campaigns' ? 'bg-[#1f327f] text-white' : 'bg-[#dde5f3] text-[#4f6394] hover:bg-[#d5deef]'}`}>
                Campaigns
              </button>
              <button type="button" @click=${() => this.setActiveTab('impact')} class=${`rounded-xl px-4 py-2 text-[14px] font-semibold ${this.activeTab === 'impact' ? 'bg-[#1f327f] text-white' : 'bg-[#dde5f3] text-[#4f6394] hover:bg-[#d5deef]'}`}>
                My Impact
              </button>
              <button type="button" @click=${() => this.setActiveTab('history')} class=${`rounded-xl px-4 py-2 text-[14px] font-semibold ${this.activeTab === 'history' ? 'bg-[#1f327f] text-white' : 'bg-[#dde5f3] text-[#4f6394] hover:bg-[#d5deef]'}`}>
                History
              </button>
            </div>

            ${this.activeTab === 'campaigns' ? this.renderCampaignsTab() : this.activeTab === 'impact' ? this.renderImpactTab() : this.renderHistoryTab()}
          </section>
        </section>

        ${this.showDonateModal && this.selectedCampaign ? this.renderDonateModal() : ''}
      </main>
    `
  }

  renderCampaignsTab() {
    const featuredCampaigns = this.filteredCampaigns.filter((campaign) => campaign.featured)
    const otherCampaigns = this.filteredCampaigns.filter((campaign) => !campaign.featured)

    return html`
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          ${this.categories.map(
            (category) => html`
              <button
                type="button"
                @click=${() => this.setCategory(category)}
                class=${`rounded-full px-3 py-1.5 text-[12px] font-semibold ${this.selectedCategory === category ? 'bg-[#e6c65a] text-[#1a2a6c]' : 'bg-[#dde5f3] text-[#4f6394] hover:bg-[#d5deef]'}`}
              >
                ${this.formatCategory(category)}
              </button>
            `,
          )}
        </div>

        ${featuredCampaigns.length > 0
          ? html`
              <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
                ${featuredCampaigns.map(
                  (campaign) => html`
                    <article class="overflow-hidden rounded-2xl border border-[#d5deee] bg-white shadow-[0_12px_24px_-22px_rgba(16,33,80,0.8)]">
                      <div class="h-40 bg-gradient-to-br from-[#2d50b8] via-[#3b67d3] to-[#6f8ce1]"></div>
                      <div class="p-4">
                        <div class="mb-2 flex items-start justify-between gap-2">
                          <div>
                            <h3 class="text-[22px] font-semibold text-[#233f8b]">${campaign.title}</h3>
                            <p class="text-[14px] text-[#687ca8]">${campaign.organizer}</p>
                          </div>
                          <span class=${`rounded-md border px-2 py-1 text-[12px] font-semibold capitalize ${this.categoryClass(campaign.category)}`}>
                            ${campaign.category}
                          </span>
                        </div>

                        <p class="text-[14px] leading-6 text-[#4f618f]">${campaign.description}</p>

                        <div class="mt-3">
                          <div class="mb-1.5 flex items-center justify-between text-[12px]">
                            <span class="font-semibold text-[#d69d2d]">PHP ${campaign.currentAmount.toLocaleString()}</span>
                            <span class="text-[#7b8db7]">Goal: PHP ${campaign.targetAmount.toLocaleString()}</span>
                          </div>
                          <div class="h-2 overflow-hidden rounded-full bg-[#e2e8f5]">
                            <div class="h-full bg-gradient-to-r from-[#e6c65a] to-[#f1d981]" style=${`width: ${this.progressPercentage(campaign.currentAmount, campaign.targetAmount)}%`}></div>
                          </div>
                          <div class="mt-1.5 flex items-center justify-between text-[12px]">
                            <span class="text-[#7284ae]">${campaign.donorCount} donors</span>
                            <span class="font-semibold text-[#d69d2d]">${this.progressPercentage(campaign.currentAmount, campaign.targetAmount).toFixed(0)}%</span>
                          </div>
                        </div>

                        <button type="button" @click=${() => this.openDonateModal(campaign.id)} class="mt-4 w-full rounded-lg bg-[#e6c65a] px-3 py-2.5 text-[14px] font-semibold text-[#1a2a6c] hover:bg-[#d4b54a]">
                          Donate Now
                        </button>
                      </div>
                    </article>
                  `,
                )}
              </div>
            `
          : ''}

        <div class="space-y-2">
          ${otherCampaigns.map(
            (campaign) => html`
              <button
                type="button"
                @click=${() => this.openDonateModal(campaign.id)}
                class="w-full rounded-2xl border border-[#d5deee] bg-white p-3 text-left shadow-[0_12px_24px_-22px_rgba(16,33,80,0.8)] transition hover:bg-[#f8faff]"
              >
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <h3 class="text-[18px] font-semibold text-[#233f8b]">${campaign.title}</h3>
                    <p class="text-[13px] text-[#687ca8]">${campaign.organizer}</p>
                  </div>
                  <span class="text-[#9bb0da]">${this.chevronRightIcon()}</span>
                </div>

                <div class="mt-2 flex items-center gap-2 text-[12px]">
                  <span class="font-semibold text-[#d69d2d]">PHP ${campaign.currentAmount.toLocaleString()}</span>
                  <span class="text-[#97a8cc]">of</span>
                  <span class="text-[#6d80ad]">PHP ${campaign.targetAmount.toLocaleString()}</span>
                </div>

                <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e2e8f5]">
                  <div class="h-full bg-[#e6c65a]" style=${`width: ${this.progressPercentage(campaign.currentAmount, campaign.targetAmount)}%`}></div>
                </div>
              </button>
            `,
          )}
        </div>
      </div>
    `
  }

  renderImpactTab() {
    return html`
      <div class="space-y-3">
        <section class="rounded-2xl bg-gradient-to-br from-[#e6c65a] to-[#d4b54a] p-4 text-[#1a2a6c]">
          <div class="mb-3 flex items-center justify-between">
            <h3 class="text-[20px] font-semibold">Your Impact</h3>
            <span>${this.awardIcon()}</span>
          </div>
          <p class="text-[14px] text-[#1a2a6c]/80">Thank you for your generosity!</p>

          <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div class="rounded-lg bg-[#1a2a6c]/10 p-3">
              <p class="text-[12px] text-[#1a2a6c]/75">Total Donated</p>
              <p class="text-[24px] font-semibold">PHP ${this.impactStats.totalDonated.toLocaleString()}</p>
            </div>
            <div class="rounded-lg bg-[#1a2a6c]/10 p-3">
              <p class="text-[12px] text-[#1a2a6c]/75">Students Helped</p>
              <p class="text-[24px] font-semibold">${this.impactStats.studentsHelped}</p>
            </div>
          </div>
        </section>

        <section class="rounded-2xl border border-[#d5deee] bg-white p-4 text-center shadow-[0_12px_24px_-22px_rgba(16,33,80,0.8)]">
          <div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#f9efc5] text-[#d6a52b]">${this.awardIcon()}</div>
          <h3 class="text-[20px] font-semibold text-[#233f8b]">${this.impactStats.donationRank}</h3>
          <p class="text-[14px] text-[#687ca8]">You've supported ${this.impactStats.campaignsSupported} campaigns</p>
        </section>

        <section class="rounded-2xl border border-[#d5deee] bg-white p-4 shadow-[0_12px_24px_-22px_rgba(16,33,80,0.8)]">
          <h3 class="mb-3 text-[18px] font-semibold text-[#233f8b]">Your Impact Stories</h3>
          <div class="space-y-3">
            <div class="flex gap-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eef2fb] text-[#d6a52b]">${this.usersIcon()}</div>
              <div>
                <p class="text-[14px] font-semibold text-[#2e437d]">4 Scholarship Recipients</p>
                <p class="text-[13px] text-[#687ca8]">Your donations helped students complete their education.</p>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eef2fb] text-[#d6a52b]">${this.trendingUpIcon()}</div>
              <div>
                <p class="text-[14px] font-semibold text-[#2e437d]">Lab Equipment Funded</p>
                <p class="text-[13px] text-[#687ca8]">Contributed to the new science laboratory setup.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-xl border border-[#b9cef8] bg-[#e5f0ff] p-3 text-[13px] text-[#315faf]">
          <span class="font-semibold">Tax Deductible:</span>
          Your donations are eligible for tax deduction. Download receipts from your donation history.
        </section>
      </div>
    `
  }

  renderHistoryTab() {
    return html`
      <div class="space-y-3">
        ${this.myDonations.length === 0
          ? html`
              <div class="rounded-2xl border border-[#d5deee] bg-white py-12 text-center">
                <div class="mx-auto mb-3 text-[#9db1d9]">${this.heartIcon()}</div>
                <p class="text-[16px] text-[#6d80ad]">No donations yet</p>
              </div>
            `
          : this.myDonations.map(
              (donation) => html`
                <article class="rounded-2xl border border-[#d5deee] bg-white p-4 shadow-[0_12px_24px_-22px_rgba(16,33,80,0.8)]">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <h3 class="text-[20px] font-semibold text-[#233f8b]">${donation.campaignTitle}</h3>
                    </div>
                    <p class="text-[16px] font-semibold text-[#d69d2d]">PHP ${donation.amount.toLocaleString()}</p>
                  </div>

                  <div class="mt-2 flex items-center justify-between text-[12px] text-[#7284ae]">
                    <span>${new Date(donation.date).toLocaleDateString()}</span>
                    <span class="capitalize">${donation.method}</span>
                  </div>

                  ${donation.receiptNumber
                    ? html`
                        <div class="mt-3 flex items-center justify-between border-t border-[#e6ecf7] pt-3">
                          <div>
                            <p class="text-[11px] text-[#8fa1c8]">Receipt #</p>
                            <p class="text-[12px] font-mono text-[#37589f]">${donation.receiptNumber}</p>
                          </div>
                          <button type="button" class="rounded-lg bg-[#f1f4fb] px-3 py-1.5 text-[12px] font-semibold text-[#6278a8] hover:bg-[#e7edf9]">Download</button>
                        </div>
                      `
                    : ''}
                </article>
              `,
            )}
      </div>
    `
  }

  renderDonateModal() {
    const campaign = this.selectedCampaign

    return html`
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-6 backdrop-blur-[2px]" @click=${this.closeDonateModal}>
        <article class="flex max-h-[90vh] w-full max-w-[760px] flex-col overflow-hidden rounded-3xl bg-white text-[#1f327f] shadow-[0_30px_70px_-28px_rgba(6,15,60,0.95)]" @click=${(event) => event.stopPropagation()}>
          <header class="border-b border-[#e0e6f3] px-5 py-4">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-[24px] font-semibold">Donate to Campaign</h2>
              <button type="button" @click=${this.closeDonateModal} class="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef2fb] text-[#6278a8]">${this.closeIcon()}</button>
            </div>
          </header>

          <div class="flex-1 overflow-y-auto px-5 py-4">
            <div class="space-y-4 text-[15px] text-[#4f618f]">
              <div>
                <h3 class="text-[20px] font-semibold text-[#233f8b]">${campaign.title}</h3>
                <p class="text-[14px] text-[#687ca8]">${campaign.organizer}</p>
              </div>

              <div>
                <h4 class="mb-1 text-[14px] font-semibold text-[#264796]">Campaign Story</h4>
                <p>${campaign.story || campaign.description}</p>
              </div>

              <label class="block">
                <span class="mb-1 block text-[14px] font-semibold text-[#264796]">Donation Amount</span>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#7084b2]">PHP</span>
                  <input
                    type="number"
                    min="1"
                    .value=${String(this.donationAmount)}
                    @input=${(event) => {
                      this.donationAmount = Number(event.target.value) || 0
                    }}
                    class="w-full rounded-lg border border-[#d0d9ec] px-12 py-2 text-[14px] outline-none"
                  />
                </div>
                <div class="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                  ${[500, 1000, 2500, 5000].map(
                    (amount) => html`
                      <button type="button" @click=${() => { this.donationAmount = amount }} class="rounded-lg border border-[#d0d9ec] px-2 py-2 text-[13px] text-[#4f618f] hover:bg-[#f7f9fd]">
                        PHP ${amount}
                      </button>
                    `,
                  )}
                </div>
              </label>

              <div>
                <span class="mb-1 block text-[14px] font-semibold text-[#264796]">Payment Method</span>
                <div class="space-y-2">
                  ${['Credit/Debit Card', 'GCash', 'Bank Transfer', 'PayMaya'].map(
                    (method) => html`
                      <label class="flex cursor-pointer items-center gap-2 rounded-lg border border-[#d0d9ec] px-3 py-2 hover:bg-[#f7f9fd]">
                        <input type="radio" name="payment" .checked=${this.paymentMethod === method} @change=${() => { this.paymentMethod = method }} />
                        <span class="text-[14px] text-[#4f618f]">${method}</span>
                      </label>
                    `,
                  )}
                </div>
              </div>

              <div class="rounded-lg border border-[#b9cef8] bg-[#e5f0ff] p-3 text-[13px] text-[#315faf]">
                <span class="font-semibold">Tax Deductible:</span>
                You will receive a receipt for tax deduction purposes after your donation is processed.
              </div>
            </div>
          </div>

          <footer class="border-t border-[#e0e6f3] px-5 py-4">
            <div class="space-y-2">
              <button type="button" @click=${this.submitDonation} class="w-full rounded-lg bg-[#1a2a6c] px-3 py-3 text-[15px] font-semibold text-white hover:bg-[#152252]">Proceed to Payment</button>
              <button type="button" @click=${this.closeDonateModal} class="w-full rounded-lg bg-[#f1f4fb] px-3 py-2.5 text-[14px] text-[#6278a8] hover:bg-[#e7edf9]">Cancel</button>
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

  chevronRightIcon() {
    return this.iconBase(html`<polyline points="9 18 15 12 9 6"></polyline>`)
  }

  closeIcon() {
    return this.iconBase(html`<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`)
  }

  heartIcon() {
    return this.iconBase(html`<path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.4-7 10-7 10z"></path>`)
  }

  usersIcon() {
    return this.iconBase(html`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`)
  }

  trendingUpIcon() {
    return this.iconBase(html`<path d="m22 7-8.5 8.5-5-5L2 17"></path><path d="M16 7h6v6"></path>`)
  }

  awardIcon() {
    return this.iconBase(html`<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"></polyline>`)
  }
}

customElements.define('donations-page', DonationsPage)

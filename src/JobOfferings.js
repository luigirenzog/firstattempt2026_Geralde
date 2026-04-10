import { LitElement, html } from 'lit'
import adduLogo from './assets/ADDULogo.jpg'

class JobOfferingsPage extends LitElement {
  static properties = {
    activeTab: { state: true },
    selectedJobId: { state: true },
    showJobModal: { state: true },
    searchQuery: { state: true },
    selectedType: { state: true },
    myApplications: { state: true },
  }

  constructor() {
    super()
    this.activeTab = 'browse'
    this.selectedJobId = null
    this.showJobModal = false
    this.searchQuery = ''
    this.selectedType = 'all'
    this.myApplications = [
      {
        id: 'APP-1001',
        jobId: 'job-001',
        jobTitle: 'Frontend Engineer',
        company: 'BluePeak Labs',
        status: 'reviewing',
        appliedDate: '2026-04-02',
        notes: 'Your profile is currently under recruiter review.',
      },
      {
        id: 'APP-1002',
        jobId: 'job-002',
        jobTitle: 'Data Analyst',
        company: 'Ateneo Analytics Center',
        status: 'shortlisted',
        appliedDate: '2026-03-27',
        notes: 'You have been shortlisted for a technical interview.',
      },
    ]
  }

  createRenderRoot() {
    return this
  }

  get jobPostings() {
    return [
      {
        id: 'job-001',
        title: 'Frontend Engineer',
        company: 'BluePeak Labs',
        location: 'Davao City, Philippines',
        locationType: 'hybrid',
        employmentType: 'full-time',
        industry: 'Technology',
        salary: 'PHP 55,000 - 75,000 / month',
        experience: '2-4 years',
        description: 'Build and maintain user-facing web applications used by thousands of daily users.',
        requirements: ['BS Computer Science or related degree', 'Strong JavaScript and UI development skills', 'Experience with component-based frameworks'],
        responsibilities: ['Implement responsive user interfaces', 'Collaborate with designers and backend developers', 'Optimize web performance and accessibility'],
        benefits: ['HMO on day 1', 'Hybrid setup', 'Performance bonus'],
        verified: true,
        applicants: 18,
        posterName: 'Maria L. Santos',
        postedDate: '2026-04-01',
        deadline: '2026-04-30',
      },
      {
        id: 'job-002',
        title: 'Data Analyst',
        company: 'Ateneo Analytics Center',
        location: 'Remote - Philippines',
        locationType: 'remote',
        employmentType: 'full-time',
        industry: 'Education',
        salary: 'PHP 45,000 - 60,000 / month',
        experience: '1-3 years',
        description: 'Translate institutional and business data into actionable insights and dashboards.',
        requirements: ['Experience in SQL and spreadsheets', 'Strong analytical thinking', 'Knowledge in BI tools'],
        responsibilities: ['Prepare weekly analytics reports', 'Build dashboard views', 'Support leadership planning with data'],
        benefits: ['Internet allowance', 'Flexible hours', 'Learning budget'],
        verified: true,
        applicants: 12,
        posterName: 'J. R. Navarro',
        postedDate: '2026-03-28',
        deadline: '2026-04-25',
      },
      {
        id: 'job-003',
        title: 'UI/UX Design Intern',
        company: 'Pixel Harbor Studio',
        location: 'Makati City, Philippines',
        locationType: 'onsite',
        employmentType: 'internship',
        industry: 'Design',
        salary: 'PHP 12,000 stipend / month',
        experience: 'Internship',
        description: 'Join the product design team to prototype, test, and improve digital experiences.',
        requirements: ['Portfolio of design projects', 'Familiarity with Figma', 'Good communication skills'],
        responsibilities: ['Create wireframes and mockups', 'Support usability testing', 'Document design decisions'],
        benefits: ['Mentorship program', 'Certificate of completion', 'Potential full-time conversion'],
        verified: false,
        applicants: 7,
        posterName: 'Angela C. Flores',
        postedDate: '2026-04-03',
        deadline: '2026-05-05',
      },
      {
        id: 'job-004',
        title: 'Project Coordinator',
        company: 'Southpoint Ventures',
        location: 'Cebu City, Philippines',
        locationType: 'hybrid',
        employmentType: 'contract',
        industry: 'Operations',
        salary: 'PHP 35,000 - 45,000 / month',
        experience: '2+ years',
        description: 'Coordinate timelines, stakeholders, and deliverables across multiple client initiatives.',
        requirements: ['Project coordination experience', 'Strong organization and reporting skills', 'Familiarity with collaboration tools'],
        responsibilities: ['Manage cross-functional timelines', 'Track project blockers and risks', 'Prepare weekly status updates'],
        benefits: ['Flexible setup', 'Project completion bonus', 'Networking opportunities'],
        verified: true,
        applicants: 10,
        posterName: 'Carlo M. Lim',
        postedDate: '2026-04-04',
        deadline: '2026-05-01',
      },
    ]
  }

  get selectedJob() {
    return this.jobPostings.find((job) => job.id === this.selectedJobId) || null
  }

  get filteredJobs() {
    const query = this.searchQuery.trim().toLowerCase()
    return this.jobPostings.filter((job) => {
      const matchesSearch = !query || `${job.title} ${job.company} ${job.location}`.toLowerCase().includes(query)
      const matchesType = this.selectedType === 'all' || job.employmentType === this.selectedType
      return matchesSearch && matchesType
    })
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

  setType(type) {
    this.selectedType = type
  }

  openJobModal(jobId) {
    this.selectedJobId = jobId
    this.showJobModal = true
  }

  closeJobModal() {
    this.showJobModal = false
    this.selectedJobId = null
  }

  applyNow() {
    const selectedJob = this.selectedJob
    if (!selectedJob) {
      return
    }

    const exists = this.myApplications.some((app) => app.jobId === selectedJob.id)
    if (!exists) {
      this.myApplications = [
        {
          id: `APP-${Date.now()}`,
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          company: selectedJob.company,
          status: 'submitted',
          appliedDate: new Date().toISOString(),
          notes: 'Application submitted successfully. Please wait for updates.',
        },
        ...this.myApplications,
      ]
    }

    this.closeJobModal()
    this.activeTab = 'applications'
  }

  locationTypeClass(type) {
    if (type === 'remote') return 'bg-[#e2f6ea] text-[#22754d] border-[#a9dfbf]'
    if (type === 'hybrid') return 'bg-[#e5f0ff] text-[#315faf] border-[#b9cef8]'
    return 'bg-[#efe9ff] text-[#6a46b5] border-[#cebdf3]'
  }

  employmentTypeClass(type) {
    if (type === 'full-time') return 'bg-[#e2f6ea] text-[#22754d] border-[#a9dfbf]'
    if (type === 'part-time') return 'bg-[#fff5d9] text-[#b57d00] border-[#f4d788]'
    if (type === 'contract') return 'bg-[#fff0e1] text-[#bf5e0f] border-[#f2c9a0]'
    return 'bg-[#ffe7f3] text-[#b93d7b] border-[#f5b8d4]'
  }

  applicationStatusClass(status) {
    if (status === 'submitted') return 'bg-[#e5f0ff] text-[#315faf] border-[#b9cef8]'
    if (status === 'reviewing') return 'bg-[#fff5d9] text-[#b57d00] border-[#f4d788]'
    if (status === 'shortlisted') return 'bg-[#e2f6ea] text-[#22754d] border-[#a9dfbf]'
    if (status === 'interview') return 'bg-[#efe9ff] text-[#6a46b5] border-[#cebdf3]'
    if (status === 'offered') return 'bg-[#dff8ee] text-[#126040] border-[#9adfbe]'
    return 'bg-[#ffe8e8] text-[#b03636] border-[#f0b6b6]'
  }

  applicationStatusIcon(status) {
    if (status === 'reviewing') return html`<span>◷</span>`
    if (status === 'shortlisted' || status === 'offered') return html`<span>✓</span>`
    if (status === 'rejected') return html`<span>✕</span>`
    return html`<span>•</span>`
  }

  formatLabel(value) {
    return value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  render() {
    return html`
      <main class="min-h-full bg-gradient-to-b from-[#1a2a6c] via-[#1e3a8a] to-[#2563eb] px-4 py-5 text-white sm:px-6 lg:px-8">
        <section class="mx-auto w-full max-w-[1240px]">
          <header class="rounded-3xl bg-gradient-to-r from-[#223787] to-[#2d50b8] px-5 py-5 shadow-[0_20px_40px_-24px_rgba(8,19,72,0.95)]">
            <div class="flex items-center justify-between">
              <button type="button" @click=${this.emitToggleSidebar} class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#dbe5ff] lg:hidden" aria-label="Open sidebar">${this.menuIcon()}</button>
              <div>
                <h1 class="text-[36px] font-semibold leading-tight">Job Opportunities</h1>
                <p class="mt-1 text-[17px] text-[#d7e1ff]">Explore career opportunities from our alumni network</p>
              </div>
              <div class="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/25">
                <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
              </div>
            </div>
          </header>

          <section class="mt-4 rounded-3xl bg-[#eef2f9] p-4 text-[#1f327f] shadow-[0_16px_36px_-24px_rgba(8,19,72,0.8)]">
            <div class="mb-4 flex flex-wrap gap-2">
              <button type="button" @click=${() => this.setActiveTab('browse')} class=${`rounded-xl px-4 py-2 text-[14px] font-semibold ${this.activeTab === 'browse' ? 'bg-[#1f327f] text-white' : 'bg-[#dde5f3] text-[#4f6394] hover:bg-[#d5deef]'}`}>
                Browse Jobs
              </button>
              <button type="button" @click=${() => this.setActiveTab('applications')} class=${`relative rounded-xl px-4 py-2 text-[14px] font-semibold ${this.activeTab === 'applications' ? 'bg-[#1f327f] text-white' : 'bg-[#dde5f3] text-[#4f6394] hover:bg-[#d5deef]'}`}>
                My Applications
                ${this.myApplications.length > 0
                  ? html`<span class="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#e6c65a] px-1 text-[11px] font-bold text-[#1a2a6c]">${this.myApplications.length}</span>`
                  : ''}
              </button>
            </div>

            ${this.activeTab === 'browse' ? this.renderBrowseTab() : this.renderApplicationsTab()}
          </section>
        </section>

        ${this.showJobModal && this.selectedJob ? this.renderJobModal() : ''}
      </main>
    `
  }

  renderBrowseTab() {
    const typeFilters = ['all', 'full-time', 'part-time', 'contract', 'internship']

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
            placeholder="Search jobs, companies..."
            class="w-full rounded-xl border border-[#ccd6ea] bg-white px-10 py-2.5 text-[15px] text-[#2e437d] outline-none"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          ${typeFilters.map(
            (type) => html`
              <button
                type="button"
                @click=${() => this.setType(type)}
                class=${`rounded-full px-3 py-1.5 text-[12px] font-semibold ${this.selectedType === type ? 'bg-[#e6c65a] text-[#1a2a6c]' : 'bg-[#dde5f3] text-[#4f6394] hover:bg-[#d5deef]'}`}
              >
                ${this.formatLabel(type)}
              </button>
            `,
          )}
        </div>

        ${this.filteredJobs.length === 0
          ? html`
              <div class="rounded-2xl border border-[#d5deee] bg-white py-12 text-center">
                <div class="mx-auto mb-3 text-[#9db1d9]">${this.briefcaseIcon()}</div>
                <p class="text-[16px] text-[#6d80ad]">No jobs found</p>
              </div>
            `
          : html`
              <div class="grid grid-cols-1 gap-3 xl:grid-cols-2">
                ${this.filteredJobs.map(
                  (job) => html`
                    <button
                      type="button"
                      @click=${() => this.openJobModal(job.id)}
                      class="rounded-2xl border border-[#d5deee] bg-white p-4 text-left shadow-[0_12px_24px_-22px_rgba(16,33,80,0.8)] transition hover:bg-[#f8faff]"
                    >
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <h3 class="text-[22px] font-semibold text-[#233f8b]">${job.title}</h3>
                          <p class="text-[14px] text-[#687ca8]">${job.company}</p>
                        </div>
                        <span class="text-[#9bb0da]">${this.chevronRightIcon()}</span>
                      </div>

                      <div class="mt-3 flex flex-wrap gap-1.5 text-[12px]">
                        <span class=${`inline-flex items-center rounded-md border px-2 py-1 font-semibold capitalize ${this.locationTypeClass(job.locationType)}`}>
                          ${job.locationType}
                        </span>
                        <span class=${`inline-flex items-center rounded-md border px-2 py-1 font-semibold capitalize ${this.employmentTypeClass(job.employmentType)}`}>
                          ${job.employmentType.replace('-', ' ')}
                        </span>
                        ${job.verified
                          ? html`<span class="inline-flex items-center gap-1 rounded-md border border-[#b9cef8] bg-[#e5f0ff] px-2 py-1 font-semibold text-[#315faf]">✓ Verified</span>`
                          : ''}
                      </div>

                      <div class="mt-3 flex items-center gap-2 text-[13px] text-[#5f749f]">
                        <span class="text-[#8fa1c8]">${this.mapPinIcon()}</span>
                        <span>${job.location}</span>
                        ${job.salary ? html`<span class="text-[#97a8cc]">•</span><span>${job.salary}</span>` : ''}
                      </div>

                      <div class="mt-3 text-[12px] text-[#7284ae]">
                        Posted by ${job.posterName} • ${new Date(job.postedDate).toLocaleDateString()}
                      </div>
                    </button>
                  `,
                )}
              </div>
            `}
      </div>
    `
  }

  renderApplicationsTab() {
    return html`
      <div class="space-y-3">
        ${this.myApplications.length === 0
          ? html`
              <div class="rounded-2xl border border-[#d5deee] bg-white py-12 text-center">
                <div class="mx-auto mb-3 text-[#9db1d9]">${this.briefcaseIcon()}</div>
                <p class="text-[16px] text-[#6d80ad]">No applications yet</p>
                <button type="button" @click=${() => this.setActiveTab('browse')} class="mt-4 rounded-lg bg-[#1a2a6c] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#152252]">Browse Jobs</button>
              </div>
            `
          : this.myApplications.map(
              (app) => html`
                <article class="rounded-2xl border border-[#d5deee] bg-white p-4 shadow-[0_12px_24px_-22px_rgba(16,33,80,0.8)]">
                  <h3 class="text-[20px] font-semibold text-[#233f8b]">${app.jobTitle}</h3>
                  <p class="text-[14px] text-[#687ca8]">${app.company}</p>

                  <div class=${`mt-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] font-semibold capitalize ${this.applicationStatusClass(app.status)}`}>
                    ${this.applicationStatusIcon(app.status)}
                    <span>${app.status}</span>
                  </div>

                  ${app.notes ? html`<p class="mt-3 text-[14px] text-[#5a6f9a]">${app.notes}</p>` : ''}

                  <div class="mt-3 text-[12px] text-[#7284ae]">Applied: ${new Date(app.appliedDate).toLocaleDateString()}</div>
                </article>
              `,
            )}
      </div>
    `
  }

  renderJobModal() {
    const selectedJob = this.selectedJob

    return html`
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-6 backdrop-blur-[2px]" @click=${this.closeJobModal}>
        <article class="flex max-h-[90vh] w-full max-w-[860px] flex-col overflow-hidden rounded-3xl bg-white text-[#1f327f] shadow-[0_30px_70px_-28px_rgba(6,15,60,0.95)]" @click=${(event) => event.stopPropagation()}>
          <header class="border-b border-[#e0e6f3] px-5 py-4">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-[24px] font-semibold">${selectedJob.title}</h2>
              <button type="button" @click=${this.closeJobModal} class="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef2fb] text-[#6278a8]">${this.closeIcon()}</button>
            </div>
            <p class="mt-1 text-[15px] text-[#5a6f9a]">${selectedJob.company}</p>
          </header>

          <div class="flex-1 overflow-y-auto px-5 py-4">
            <div class="space-y-4 text-[15px] text-[#4f618f]">
              <div class="flex flex-wrap gap-2 text-[12px]">
                <span class=${`inline-flex items-center rounded-md border px-2 py-1 font-semibold capitalize ${this.locationTypeClass(selectedJob.locationType)}`}>${selectedJob.locationType}</span>
                <span class=${`inline-flex items-center rounded-md border px-2 py-1 font-semibold capitalize ${this.employmentTypeClass(selectedJob.employmentType)}`}>${selectedJob.employmentType.replace('-', ' ')}</span>
                ${selectedJob.verified
                  ? html`<span class="inline-flex items-center rounded-md border border-[#b9cef8] bg-[#e5f0ff] px-2 py-1 font-semibold text-[#315faf]">Verified</span>`
                  : ''}
              </div>

              <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Location</h3>
                  <p>${selectedJob.location}</p>
                </div>
                <div>
                  <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Experience</h3>
                  <p>${selectedJob.experience}</p>
                </div>
                ${selectedJob.salary
                  ? html`
                      <div class="md:col-span-2">
                        <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Salary Range</h3>
                        <p class="font-semibold text-[#d69d2d]">${selectedJob.salary}</p>
                      </div>
                    `
                  : ''}
              </div>

              <div>
                <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Job Description</h3>
                <p>${selectedJob.description}</p>
              </div>

              <div>
                <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Requirements</h3>
                <ul class="space-y-1">
                  ${selectedJob.requirements.map((req) => html`<li class="flex items-start gap-2"><span class="mt-1 text-[#2a49a8]">•</span><span>${req}</span></li>`) }
                </ul>
              </div>

              <div>
                <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Responsibilities</h3>
                <ul class="space-y-1">
                  ${selectedJob.responsibilities.map((item) => html`<li class="flex items-start gap-2"><span class="mt-1 text-[#2a49a8]">•</span><span>${item}</span></li>`) }
                </ul>
              </div>

              <div>
                <h3 class="mb-1 text-[14px] font-semibold text-[#264796]">Benefits</h3>
                <ul class="space-y-1">
                  ${selectedJob.benefits.map((item) => html`<li class="flex items-start gap-2"><span class="mt-1 text-[#2a49a8]">•</span><span>${item}</span></li>`) }
                </ul>
              </div>

              <div class="rounded-xl bg-[#f3f6fc] p-3 text-[13px] text-[#5a6f9a]">
                <div class="flex items-center justify-between"><span>Posted by</span><span class="font-semibold text-[#35589f]">${selectedJob.posterName}</span></div>
                <div class="mt-1 flex items-center justify-between"><span>Posted on</span><span>${new Date(selectedJob.postedDate).toLocaleDateString()}</span></div>
                <div class="mt-1 flex items-center justify-between"><span>Deadline</span><span>${new Date(selectedJob.deadline).toLocaleDateString()}</span></div>
              </div>
            </div>
          </div>

          <footer class="border-t border-[#e0e6f3] px-5 py-4">
            <div class="space-y-2">
              <button type="button" @click=${this.applyNow} class="w-full rounded-lg bg-[#1a2a6c] px-3 py-3 text-[15px] font-semibold text-white hover:bg-[#152252]">Apply Now</button>
              <button type="button" @click=${this.closeJobModal} class="w-full rounded-lg bg-[#f1f4fb] px-3 py-2.5 text-[14px] text-[#6278a8] hover:bg-[#e7edf9]">Close</button>
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

  briefcaseIcon() {
    return this.iconBase(html`<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>`)
  }

  mapPinIcon() {
    return this.iconBase(html`<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"></path><circle cx="12" cy="10" r="2.5"></circle>`)
  }
}

customElements.define('job-offerings-page', JobOfferingsPage)

import { LitElement, html } from 'lit'
import profilePhoto from './assets/4thProfileHome.jpg'

class MyProfilePage extends LitElement {
  static properties = {
    view: { state: true },
    milestones: { state: true },
    isMilestoneModalOpen: { state: true },
    editingMilestoneId: { state: true },
    milestoneForm: { state: true },
  }

  constructor() {
    super()
    this.view = 'profile'
    this.milestones = [
      {
        id: 1,
        jobTitle: 'Software Engineer',
        company: 'Tech Corp Philippines',
        startDate: '2023',
        endDate: 'Present',
        description: 'Leading full-stack development of enterprise web applications using React and Node.js.',
      },
      {
        id: 2,
        jobTitle: 'Junior Developer',
        company: 'StartUp Davao Inc.',
        startDate: '2019',
        endDate: '2023',
        description: 'Built mobile-first web apps and REST APIs for local government digital services.',
      },
      {
        id: 3,
        jobTitle: 'IT Intern',
        company: 'Ateneo de Davao University',
        startDate: '2015',
        endDate: '2016',
        description: "Assisted in maintaining the university's student portal and internal tools.",
      },
    ]
    this.isMilestoneModalOpen = false
    this.editingMilestoneId = null
    this.milestoneForm = this.getEmptyMilestoneForm()
  }

  createRenderRoot() {
    return this
  }

  emitLogout() {
    this.dispatchEvent(
      new CustomEvent('logout', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  openAcademicRecords() {
    this.view = 'academic'
  }

  openCareerMilestones() {
    this.view = 'career'
  }

  backToProfile() {
    this.view = 'profile'
  }

  getEmptyMilestoneForm() {
    return {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      supportingDocument: '',
    }
  }

  openMilestoneModal(id = null) {
    this.editingMilestoneId = id
    if (id == null) {
      this.milestoneForm = this.getEmptyMilestoneForm()
    } else {
      const item = this.milestones.find((entry) => entry.id === id)
      if (item) {
        this.milestoneForm = {
          jobTitle: item.jobTitle,
          company: item.company,
          startDate: item.startDate,
          endDate: item.endDate,
          description: item.description,
          supportingDocument: '',
        }
      }
    }
    this.isMilestoneModalOpen = true
  }

  closeMilestoneModal() {
    this.isMilestoneModalOpen = false
    this.editingMilestoneId = null
    this.milestoneForm = this.getEmptyMilestoneForm()
  }

  updateMilestoneField(field, value) {
    this.milestoneForm = {
      ...this.milestoneForm,
      [field]: value,
    }
  }

  saveMilestone(event) {
    event.preventDefault()

    if (this.editingMilestoneId == null) {
      const nextId = this.milestones.length ? Math.max(...this.milestones.map((item) => item.id)) + 1 : 1
      this.milestones = [
        {
          id: nextId,
          jobTitle: this.milestoneForm.jobTitle || 'Untitled Role',
          company: this.milestoneForm.company || 'Company',
          startDate: this.milestoneForm.startDate || 'N/A',
          endDate: this.milestoneForm.endDate || 'N/A',
          description: this.milestoneForm.description || 'No description provided.',
        },
        ...this.milestones,
      ]
    } else {
      this.milestones = this.milestones.map((item) =>
        item.id === this.editingMilestoneId
          ? {
              ...item,
              jobTitle: this.milestoneForm.jobTitle,
              company: this.milestoneForm.company,
              startDate: this.milestoneForm.startDate,
              endDate: this.milestoneForm.endDate,
              description: this.milestoneForm.description,
            }
          : item,
      )
    }

    this.closeMilestoneModal()
  }

  deleteMilestone(id) {
    this.milestones = this.milestones.filter((item) => item.id !== id)
  }

  handleEditMilestone(event, id) {
    event.stopPropagation()
    this.openMilestoneModal(id)
  }

  handleDeleteMilestone(event, id) {
    event.stopPropagation()
    this.deleteMilestone(id)
  }

  renderProfileView() {
    return html`
      <section class="w-full">
        <header class="mb-2 flex items-center justify-between rounded-2xl bg-[#f3f4f8] px-3 py-2">
          <div class="flex items-center gap-3">
            <button type="button" class="flex h-8 w-8 items-center justify-center rounded-lg text-[#253f85]">
              ${this.menuIcon()}
            </button>
            <h1 class="text-[22px] font-semibold leading-none sm:text-[24px]">My Profile</h1>
          </div>
          <button type="button" class="inline-flex items-center gap-2 rounded-xl bg-[#1f327f] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#1a2a6d]">
            ${this.editIcon()}
            Edit Profile
          </button>
        </header>

        <article class="overflow-hidden rounded-3xl bg-gradient-to-r from-[#243c94] to-[#2c4eb4] px-4 pb-4 pt-4 text-[#dbe6ff] shadow-[0_22px_44px_-24px_rgba(12,23,74,0.95)] ring-1 ring-white/12 sm:px-5 sm:pb-5 sm:pt-5">
          <div class="flex items-center gap-4">
            <img src=${profilePhoto} alt="Juan Dela Cruz" class="h-16 w-16 rounded-full object-cover ring-2 ring-white/45 sm:h-20 sm:w-20" />
            <div>
              <p class="text-[34px] font-semibold leading-tight text-white sm:text-[40px]">Juan Dela Cruz</p>
              <p class="text-[19px] text-[#bfd0ff] sm:text-[22px]">Class of 2015 • BS Computer Science</p>
            </div>
          </div>

          <div class="my-4 h-px bg-white/18"></div>

          <div class="grid grid-cols-1 gap-2 text-[18px] sm:grid-cols-2 sm:text-[20px]">
            <p class="inline-flex items-center gap-2 text-[#d8e3ff]">${this.mailIcon()} juan.delacruz@email.com</p>
            <p class="inline-flex items-center gap-2 text-[#d8e3ff]">${this.phoneIcon()} +63 912 345 6789</p>
            <p class="inline-flex items-center gap-2 text-[#d8e3ff]">${this.locationIcon()} Davao City, Philippines</p>
            <p class="inline-flex items-center gap-2 text-[#d8e3ff]">${this.jobIcon()} Software Engineer at Techline</p>
          </div>
        </article>

        <div class="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-[1.45fr_1fr]">
          <section class="rounded-3xl bg-[#f3f4f8] px-3 pb-3 pt-3 shadow-[0_12px_28px_-22px_rgba(13,24,68,0.8)]">
            <h2 class="text-[24px] font-semibold text-[#173581] sm:text-[26px]">Personal Information</h2>

            <div class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              ${this.infoField('First Name', 'Juan')}
              ${this.infoField('Last Name', 'Dela Cruz')}
              ${this.infoField('Email Address', 'juan.delacruz@email.com')}
              ${this.infoField('Phone Number', '+63 912 345 6789')}
            </div>

            <div class="mt-2">
              ${this.infoField('Address', '123 Main Street, Davao City, Philippines', true)}
            </div>
          </section>

          <section class="overflow-hidden rounded-3xl bg-[#f3f4f8] shadow-[0_12px_28px_-22px_rgba(13,24,68,0.8)]">
            ${this.menuRow('Academic Records', 'View your saved academic information', this.capIcon(), 'bg-[#e5ecff] text-[#2f5fcf]', () => this.openAcademicRecords())}
            ${this.menuRow('Career Milestones', 'Resume, certificates and credentials', this.documentIcon(), 'bg-[#f8edcd] text-[#dd8f2e]', () => this.openCareerMilestones())}
            ${this.menuRow('Account Settings', 'Privacy, security and preferences', this.settingsIcon(), 'bg-[#e2f3e6] text-[#2f9b57]')}

            <button
              type="button"
              @click=${this.emitLogout}
              class="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[#f44b4b] transition hover:bg-[#f7f8fc]"
            >
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8e8e8]">${this.logoutIcon()}</span>
              <span class="text-[18px] font-semibold">Sign Out</span>
            </button>
          </section>
        </div>
      </section>
    `
  }

  renderAcademicRecordsView() {
    return html`
      <section class="w-full overflow-y-auto">
        <header class="rounded-2xl bg-gradient-to-r from-[#243c94] to-[#2c4eb4] px-4 pb-4 pt-3 text-white shadow-[0_18px_36px_-24px_rgba(12,23,74,0.95)]">
          <div class="mb-3 flex items-center justify-between">
            <button type="button" @click=${this.backToProfile} aria-label="Back to profile" class="flex h-9 w-9 items-center justify-center rounded-full bg-white/14 text-white">
              <span class="text-[18px] leading-none">&larr;</span>
            </button>
            <p class="text-[18px] font-semibold">Academic Records</p>
            <button type="button" aria-label="Edit academic records" class="flex h-9 w-9 items-center justify-center rounded-full bg-white/14 text-white">
              <span class="text-[17px] leading-none">&#9998;</span>
            </button>
          </div>

          <div class="flex items-center gap-3">
            <img src=${profilePhoto} alt="Juan Dela Cruz" class="h-14 w-14 rounded-full object-cover ring-2 ring-white/40" />
            <div>
              <p class="text-[24px] font-semibold">Juan C. Dela Cruz</p>
              <p class="inline-flex items-center gap-2 text-[15px] text-[#d4dfff] [&_svg]:h-4 [&_svg]:w-4">${this.hashIcon()} ADDU-2015-03247</p>
              <p class="inline-flex items-center gap-2 text-[15px] text-[#d4dfff] [&_svg]:h-4 [&_svg]:w-4">${this.capIcon()} Bachelor of Science in Computer Science</p>
            </div>
          </div>
        </header>

        <div class="mt-3 rounded-3xl bg-[#f3f4f8] p-4 shadow-[0_14px_30px_-24px_rgba(12,23,74,0.9)]">
          <div class="mb-3 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5ecff] text-[#2f5fcf] [&_svg]:h-5 [&_svg]:w-5">${this.bookOpenIcon()}</span>
            <div>
              <p class="text-[22px] font-semibold text-[#173581]">Saved Academic Information</p>
              <p class="text-[14px] text-[#8595bf]">Auto-synced from university records</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            ${this.academicInfoCard('Student ID', 'ADDU-2015-03247', this.hashIcon())}
            ${this.academicInfoCard('Degree Program', 'Bachelor of Science in Computer Science', this.capIcon())}
          </div>

          <div class="mt-4">
            <div class="mb-2 flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8edcd] text-[#dd8f2e] [&_svg]:h-5 [&_svg]:w-5">${this.awardIcon()}</span>
              <p class="text-[22px] font-semibold text-[#173581]">Honors & Awards</p>
            </div>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              ${this.honorCard('Cum Laude')}
              ${this.honorCard("Dean's Lister (6 semesters)")}
            </div>
          </div>

          <div class="mt-4 rounded-2xl bg-[#e7ecf7] px-3 py-3 text-[14px] text-[#3f5794]">
            <p class="inline-flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4">${this.infoIcon()} This information will be automatically used when applying for alumni services.</p>
          </div>

          <button type="button" class="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#24409d] px-4 py-3 text-[20px] font-semibold text-white hover:bg-[#1f3789] [&_svg]:h-5 [&_svg]:w-5">
            ${this.checkFileIcon()}
            Use This Information for Applications
          </button>

          <button type="button" class="mt-3 inline-flex w-full items-center justify-center gap-2 text-[15px] font-semibold text-[#2d4aa4] hover:underline [&_svg]:h-4 [&_svg]:w-4">
            ${this.editIcon()}
            Request a Record Update
          </button>
        </div>
      </section>
    `
  }

  renderCareerMilestonesView() {
    return html`
      <section class="w-full overflow-y-auto">
        <header class="rounded-2xl bg-gradient-to-r from-[#152b74] to-[#203b95] px-4 pb-4 pt-3 text-white shadow-[0_18px_36px_-24px_rgba(12,23,74,0.95)]">
          <div class="mb-3 flex items-center justify-between">
            <button type="button" @click=${this.backToProfile} aria-label="Back to profile" class="flex h-9 w-9 items-center justify-center rounded-full bg-white/14 text-white">
              <span class="text-[18px] leading-none">&larr;</span>
            </button>
            <p class="text-[18px] font-semibold">Career Milestones</p>
            <button type="button" aria-label="Edit milestones" class="flex h-9 w-9 items-center justify-center rounded-full bg-white/14 text-white">
              <span class="text-[17px] leading-none">&#9998;</span>
            </button>
          </div>

          <div class="flex items-center gap-3">
            <img src=${profilePhoto} alt="Juan Dela Cruz" class="h-14 w-14 rounded-full object-cover ring-2 ring-white/40" />
            <div>
              <p class="text-[24px] font-semibold">Juan C. Dela Cruz</p>
              <p class="inline-flex items-center gap-2 text-[15px] text-[#d4dfff]">${this.capIcon()} Bachelor of Science in Computer Science</p>
            </div>
          </div>
        </header>

        <div class="mt-3 rounded-3xl bg-[#f3f4f8] p-4 shadow-[0_14px_30px_-24px_rgba(12,23,74,0.9)]">
          <div class="mb-3 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8edcd] text-[#dd8f2e]">${this.documentIcon()}</span>
              <div>
                <p class="text-[28px] font-semibold text-[#173581]">My Career Milestones</p>
                <p class="text-[14px] text-[#8595bf]">Track your professional journey</p>
              </div>
            </div>
            <button type="button" @click=${() => this.openMilestoneModal()} class="inline-flex items-center gap-2 rounded-xl bg-[#1f327f] px-3 py-2 text-[16px] font-semibold text-white hover:bg-[#1a2a6d]">
              ${this.plusIcon()}
              Add
            </button>
          </div>

          <div class="space-y-3">
            ${this.milestones.map(
              (item) => html`
                <article class="rounded-2xl bg-white/75 p-4 ring-1 ring-[#d7ddea]">
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="text-[24px] font-semibold text-[#173581]">${item.jobTitle}</h3>
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Edit career milestone"
                        @click=${(event) => this.handleEditMilestone(event, item.id)}
                        class="inline-flex h-6 w-6 items-center justify-center text-[#2f5fcf] hover:text-[#224cad]"
                      >
                        <span class="text-[15px] leading-none">&#9998;</span>
                      </button>
                      <button
                        type="button"
                        aria-label="Delete career milestone"
                        @click=${(event) => this.handleDeleteMilestone(event, item.id)}
                        class="inline-flex h-6 w-6 items-center justify-center text-[#f44b4b] hover:text-[#d63d3d]"
                      >
                        <span class="text-[14px] leading-none">&#128465;</span>
                      </button>
                    </div>
                  </div>
                  <p class="mt-1 inline-flex items-center gap-2 text-[18px] text-[#35539c]">${this.jobIcon()} ${item.company}</p>
                  <p class="mt-1 inline-flex items-center gap-2 text-[15px] text-[#8392b8]">${this.calendarIcon()} ${item.startDate} - ${item.endDate}</p>
                  <p class="mt-2 text-[17px] leading-snug text-[#334f97]">${item.description}</p>
                </article>
              `,
            )}
          </div>

          <div class="mt-4 rounded-2xl bg-[#e7ecf7] px-3 py-3 text-[14px] text-[#3f5794]">
            <p class="inline-flex items-center gap-2">${this.infoIcon()} Your milestones help strengthen your alumni profile.</p>
          </div>
        </div>

        ${this.isMilestoneModalOpen ? this.renderMilestoneModal() : ''}
      </section>
    `
  }

  renderMilestoneModal() {
    return html`
      <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/25 sm:items-center">
        <div class="w-full max-w-[760px] overflow-hidden rounded-t-3xl bg-[#f3f4f8] shadow-[0_24px_60px_-28px_rgba(10,20,70,0.95)] sm:rounded-3xl">
          <div class="flex items-center justify-between border-b border-[#d9dfec] px-5 py-4">
            <h3 class="text-[30px] font-semibold text-[#173581]">${this.editingMilestoneId == null ? 'Add Milestone' : 'Edit Milestone'}</h3>
            <button type="button" @click=${this.closeMilestoneModal} class="text-[#9aa8cb] hover:text-[#6f82b2]">${this.closeIcon()}</button>
          </div>

          <form @submit=${this.saveMilestone} class="space-y-3 px-5 py-4">
            ${this.modalField('Job Title *', this.milestoneForm.jobTitle, (value) => this.updateMilestoneField('jobTitle', value))}
            ${this.modalField('Company *', this.milestoneForm.company, (value) => this.updateMilestoneField('company', value))}

            <div class="grid grid-cols-2 gap-3">
              ${this.modalField('Start Date', this.milestoneForm.startDate, (value) => this.updateMilestoneField('startDate', value))}
              ${this.modalField('End Date', this.milestoneForm.endDate, (value) => this.updateMilestoneField('endDate', value))}
            </div>

            <label class="block">
              <span class="mb-1 block text-[15px] font-medium text-[#294691]">Description</span>
              <textarea
                class="w-full rounded-xl border border-[#d2d8e7] bg-[#edf0f5] px-3 py-2 text-[17px] text-[#203c83] outline-none"
                rows="3"
                .value=${this.milestoneForm.description}
                @input=${(event) => this.updateMilestoneField('description', event.target.value)}
              ></textarea>
            </label>

            <label class="block">
              <span class="mb-1 block text-[15px] font-medium text-[#294691]">Supporting Document (optional)</span>
              <div class="rounded-xl border border-dashed border-[#bcc8e3] bg-[#f2f5fb] px-3 py-3 text-center text-[15px] font-medium text-[#4f6eb6]">
                ${this.uploadIcon()} Upload certificate or document
              </div>
            </label>

            <div class="grid grid-cols-2 gap-3 border-t border-[#d9dfec] pt-3">
              <button type="button" @click=${this.closeMilestoneModal} class="rounded-xl bg-[#e4e9f4] px-4 py-3 text-[17px] font-semibold text-[#4e6297]">Cancel</button>
              <button type="submit" class="rounded-xl bg-[#24409d] px-4 py-3 text-[17px] font-semibold text-white">${this.editingMilestoneId == null ? 'Add Milestone' : 'Save Changes'}</button>
            </div>
          </form>
        </div>
      </div>
    `
  }

  modalField(label, value, onInput) {
    return html`
      <label class="block">
        <span class="mb-1 block text-[15px] font-medium text-[#294691]">${label}</span>
        <input
          class="w-full rounded-xl border border-[#d2d8e7] bg-[#edf0f5] px-3 py-2 text-[17px] text-[#203c83] outline-none"
          .value=${value}
          @input=${(event) => onInput(event.target.value)}
        />
      </label>
    `
  }

  render() {
    return html`
      <main class="h-screen w-full overflow-hidden bg-[#e9ebf1] px-2 py-2 text-[#132f75] sm:px-3 sm:py-3">
        ${this.view === 'academic' ? this.renderAcademicRecordsView() : this.view === 'career' ? this.renderCareerMilestonesView() : this.renderProfileView()}
      </main>
    `
  }

  infoField(label, value, wide = false) {
    return html`
      <label class="block ${wide ? 'sm:col-span-2' : ''}">
        <span class="mb-1 block text-[13px] font-medium text-[#294691]">${label}</span>
        <span class="block rounded-xl bg-[#edf0f5] px-3 py-2 text-[14px] text-[#203c83] sm:text-[15px]">${value}</span>
      </label>
    `
  }

  menuRow(title, subtitle, icon, iconColors, onClick) {
    return html`
      <button type="button" @click=${onClick || null} class="flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition hover:bg-[#f7f8fc]">
        <span class=${`flex h-9 w-9 items-center justify-center rounded-full ${iconColors}`}>${icon}</span>
        <span class="min-w-0 flex-1">
          <span class="block text-[18px] font-semibold text-[#1b377f]">${title}</span>
          <span class="block text-[13px] text-[#7c8db7]">${subtitle}</span>
        </span>
        <span class="text-[#aab5d3]">${this.chevronRightIcon()}</span>
      </button>
    `
  }

  academicInfoCard(label, value, icon) {
    return html`
      <article class="rounded-2xl bg-white/75 p-3 ring-1 ring-[#d7ddea]">
        <div class="flex items-start gap-3">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9eefc] text-[#2f5fcf] [&_svg]:h-5 [&_svg]:w-5">${icon}</span>
          <div class="min-w-0 flex-1">
            <p class="text-[13px] text-[#8192be]">${label}</p>
            <p class="mt-0.5 text-[17px] font-medium leading-tight text-[#173581]">${value}</p>
          </div>
          <span class="rounded-lg bg-[#e8edf8] px-2 py-1 text-[12px] font-semibold text-[#7d8eb8]">Read-only</span>
        </div>
      </article>
    `
  }

  honorCard(title) {
    return html`
      <article class="flex items-center gap-3 rounded-2xl bg-white/75 p-3 ring-1 ring-[#d7ddea]">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8edcd] text-[#dd8f2e] [&_svg]:h-5 [&_svg]:w-5">${this.awardIcon()}</span>
        <p class="text-[18px] font-medium text-[#173581]">${title}</p>
      </article>
    `
  }

  iconBase(path) {
    return html`
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        ${path}
      </svg>
    `
  }

  menuIcon() {
    return this.iconBase(html`<line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line>`)
  }

  editIcon() {
    return this.iconBase(html`<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"></path>`)
  }

  mailIcon() {
    return this.iconBase(html`<path d="M4 5h16v14H4z"></path><path d="m4 7 8 6 8-6"></path>`)
  }

  phoneIcon() {
    return this.iconBase(html`<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.8.4 1.6.7 2.4a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6.2 6.2l1.5-1.3a2 2 0 0 1 2.1-.4c.8.3 1.6.6 2.4.7A2 2 0 0 1 22 16.9z"></path>`)
  }

  locationIcon() {
    return this.iconBase(html`<path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle>`)
  }

  jobIcon() {
    return this.iconBase(html`<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>`)
  }

  capIcon() {
    return this.iconBase(html`<path d="m3 9 9-5 9 5-9 5-9-5Z"></path><path d="M7 11.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-3.5"></path>`)
  }

  hashIcon() {
    return this.iconBase(html`<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>`)
  }

  bookOpenIcon() {
    return this.iconBase(html`<path d="M2 7a2 2 0 0 1 2-2h6a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4a2 2 0 0 1-2-2V7z"></path><path d="M22 7a2 2 0 0 0-2-2h-6a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h6a2 2 0 0 0 2-2V7z"></path>`)
  }

  awardIcon() {
    return this.iconBase(html`<circle cx="12" cy="8" r="4"></circle><path d="M8 12v8l4-2 4 2v-8"></path>`)
  }

  infoIcon() {
    return this.iconBase(html`<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>`)
  }

  checkFileIcon() {
    return this.iconBase(html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="m9 15 2 2 4-4"></path>`)
  }

  plusIcon() {
    return this.iconBase(html`<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>`)
  }

  trashIcon() {
    return this.iconBase(html`<polyline points="3 6 5 6 21 6"></polyline><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>`)
  }

  closeIcon() {
    return this.iconBase(html`<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`)
  }

  uploadIcon() {
    return this.iconBase(html`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>`)
  }

  calendarIcon() {
    return this.iconBase(html`<rect x="3" y="5" width="18" height="16" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line><line x1="8" y1="3" x2="8" y2="7"></line><line x1="16" y1="3" x2="16" y2="7"></line>`)
  }

  documentIcon() {
    return this.iconBase(html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><line x1="8" y1="13" x2="16" y2="13"></line>`)
  }

  settingsIcon() {
    return this.iconBase(html`<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z"></path>`)
  }

  logoutIcon() {
    return this.iconBase(html`<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>`)
  }

  chevronRightIcon() {
    return this.iconBase(html`<polyline points="9 18 15 12 9 6"></polyline>`)
  }

  chevronLeftIcon() {
    return this.iconBase(html`<polyline points="15 18 9 12 15 6"></polyline>`)
  }
}

customElements.define('my-profile-page', MyProfilePage)

import { LitElement, html } from 'lit'
import './Sidebar.js'
import './News&updates.js'
import './Myprofile.js'
import './Calendar.js'
import './Networking&Events.js'
import './DocumentRequest.js'
import './JobOfferings.js'
import './Donations.js'
import adduLogo from './assets/ADDULogo.jpg'

class AlumniHomepage extends LitElement {
  static properties = {
    isSidebarOpen: { state: true },
    currentView: { state: true },
    notificationsOpen: { state: true },
    notifications: { state: true },
  }

  constructor() {
    super()
    this.isSidebarOpen = false
    this.currentView = 'home'
    this.notificationsOpen = false
    this.notifications = [
      {
        id: 'notif-001',
        type: 'event',
        title: 'Guest Lecture Reminder',
        message: 'Your registered event starts tomorrow at 10:00 AM.',
        timestamp: '2026-04-09T08:20:00',
        read: false,
        actionUrl: '/engagement',
      },
      {
        id: 'notif-002',
        type: 'document',
        title: 'Document Request Updated',
        message: 'Your transcript request is now ready for pickup.',
        timestamp: '2026-04-08T13:45:00',
        read: false,
        actionUrl: '/document-request',
      },
      {
        id: 'notif-003',
        type: 'job',
        title: 'Application Under Review',
        message: 'BluePeak Labs is reviewing your Frontend Engineer application.',
        timestamp: '2026-04-07T11:15:00',
        read: true,
        actionUrl: '/job-opportunities',
      },
    ]
  }

  createRenderRoot() {
    return this
  }

  get upcomingEvents() {
    const allEvents = [
      {
        id: 'evt-001',
        title: 'Guest Lecture Program - CS Dept.',
        date: '2026-04-12',
        time: '10:00 AM - 12:00 PM',
        location: 'Room 301, Jubilee Building',
      },
      {
        id: 'evt-002',
        title: 'Digital Marketing Bootcamp',
        date: '2026-04-20',
        time: '9:00 AM - 4:00 PM',
        location: 'AdDU Innovation Hub',
      },
      {
        id: 'evt-003',
        title: 'Alumni Mentorship Meet-up',
        date: '2026-05-03',
        time: '1:00 PM - 4:00 PM',
        location: 'Faber Hall, 2nd Floor',
      },
    ]

    const now = new Date()
    return allEvents.filter((event) => new Date(event.date) > now).slice(0, 2)
  }

  get pendingRequests() {
    const documentRequests = [
      { status: 'pending' },
      { status: 'processing' },
      { status: 'ready' },
      { status: 'completed' },
    ]

    return documentRequests.filter((item) => item.status === 'pending' || item.status === 'processing' || item.status === 'ready').length
  }

  get activeApplications() {
    const myApplications = [
      { status: 'reviewing' },
      { status: 'shortlisted' },
      { status: 'rejected' },
    ]

    return myApplications.filter((item) => item.status !== 'rejected' && item.status !== 'offered').length
  }

  get unreadCount() {
    return this.notifications.filter((item) => !item.read).length
  }

  get quickActions() {
    return [
      {
        label: 'Events',
        color: 'from-blue-500 to-blue-600',
        path: '/engagement',
        type: 'events',
        badge: this.upcomingEvents.length > 0 ? this.upcomingEvents.length : null,
      },
      {
        label: 'Documents',
        color: 'from-violet-500 to-violet-600',
        path: '/document-request',
        type: 'documents',
        badge: this.pendingRequests > 0 ? this.pendingRequests : null,
      },
      {
        label: 'Jobs',
        color: 'from-emerald-500 to-emerald-600',
        path: '/job-opportunities',
        type: 'jobs',
        badge: this.activeApplications > 0 ? this.activeApplications : null,
      },
      {
        label: 'Donate',
        color: 'from-rose-500 to-rose-600',
        path: '/donation',
        type: 'donate',
        badge: null,
      },
    ]
  }

  navigateToPath(path) {
    if (!path) {
      return
    }

    let view = null

    if (path === '/profile') view = 'profile'
    if (path === '/engagement') view = 'networking'
    if (path === '/document-request') view = 'document-request'
    if (path === '/job-opportunities') view = 'job-offerings'
    if (path === '/donation') view = 'donations'
    if (path === '/mentors') view = 'networking'
    if (path === '/career-opportunities') view = 'job-offerings'
    if (path.startsWith('/event-registration/')) view = 'networking'

    if (!view) {
      return
    }

    this.currentView = view
    this.isSidebarOpen = false
    this.notificationsOpen = false
  }

  openNotifications() {
    this.notificationsOpen = true
  }

  closeNotifications() {
    this.notificationsOpen = false
  }

  markAllNotificationsRead() {
    this.notifications = this.notifications.map((item) => ({ ...item, read: true }))
    this.notificationsOpen = false
  }

  openNotificationItem(notification) {
    if (!notification) {
      return
    }

    this.notifications = this.notifications.map((item) => {
      if (item.id === notification.id) {
        return { ...item, read: true }
      }
      return item
    })

    this.navigateToPath(notification.actionUrl)
  }

  formatNotificationTime(timestamp) {
    const date = new Date(timestamp)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffMinutes = Math.floor(diffTime / (1000 * 60))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  closeSidebar() {
    this.isSidebarOpen = false
  }

  handleSignOut() {
    this.isSidebarOpen = false
    this.dispatchEvent(
      new CustomEvent('logout', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  handleNavigate(event) {
    const view = event.detail?.view
    if (!view) {
      return
    }

    this.currentView = view
    this.isSidebarOpen = false
  }

  renderHomeView() {
    return html`
      <div class="mx-auto w-full max-w-[1160px]">
        <section class="mb-5 flex items-center justify-between rounded-3xl border border-white/14 bg-white/10 px-4 py-3 backdrop-blur-sm sm:px-5">
          <button
            type="button"
            @click=${this.toggleSidebar}
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#e4ecff] lg:hidden"
            aria-label="Open sidebar"
          >
            ${this.menuIcon()}
          </button>
          <div class="h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/25 lg:hidden">
            <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
          </div>
          <div class="hidden items-center gap-3 lg:flex">
            <div class="h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/25">
              <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
            </div>
            <div>
              <p class="text-[18px] font-semibold text-white">Alumni Dashboard</p>
              <p class="text-[13px] text-[#d4defa]">Ateneo de Davao University</p>
            </div>
          </div>
          <button
            type="button"
            @click=${this.openNotifications}
            class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#e4ecff]"
            aria-label="Notifications"
          >
            ${this.bellIcon()}
            ${this.unreadCount > 0 ? html`<span class="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#ffd451]"></span>` : ''}
          </button>
        </section>

        <section>
          <h1 class="text-[34px] font-bold leading-tight sm:text-[42px]">Welcome back, Juan!</h1>
          <p class="mt-1 text-[19px] text-[#d4defa]">Here's what's happening with your alumni account</p>
        </section>

        <section class="mt-6 rounded-3xl bg-gradient-to-br from-[#e6c65a] to-[#d4b54a] p-5 text-[#17317f] shadow-[0_20px_45px_-28px_rgba(10,20,70,0.9)] sm:p-6">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-[31px] font-bold leading-tight">Complete Your Profile</h2>
              <p class="mt-1 text-[18px] text-[#264596]">Add your career milestones and connect with alumni</p>
            </div>
            <span class="text-[#17317f]">${this.awardIcon()}</span>
          </div>

          <div class="mt-4">
            <div class="mb-2 flex items-center justify-between text-[14px] font-medium text-[#1c3d95]">
              <span>Profile Strength</span>
              <span>75%</span>
            </div>
            <div class="h-3 rounded-full bg-[#c9ae49]">
              <div class="h-3 w-3/4 rounded-full bg-[#213f9f]"></div>
            </div>
          </div>

          <button type="button" @click=${() => this.navigateToPath('/profile')} class="mt-5 w-full rounded-2xl bg-[#1f378f] py-3 text-[18px] font-semibold text-white hover:bg-[#1a317f]">
            Complete Profile
          </button>
        </section>

        <section class="mt-7">
          <h2 class="text-[24px] font-semibold text-white sm:text-[28px]">Quick Actions</h2>
          <div class="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
            ${this.quickActions.map(
              (action) => html`
                <button
                  type="button"
                  @click=${() => this.navigateToPath(action.path)}
                  class="relative rounded-2xl border border-white/18 bg-white/12 p-4 text-left transition hover:bg-white/18"
                >
                  ${action.badge ? html`<span class="absolute right-2 top-2 rounded-full bg-[#f3d652] px-2 py-0.5 text-xs font-bold text-[#1f3d99]">${action.badge}</span>` : ''}
                  <span class=${`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} text-white`}>${this.quickActionIcon(action.type)}</span>
                  <p class="mt-6 text-[24px] font-semibold text-[#dee8ff]">${action.label}</p>
                </button>
              `,
            )}
          </div>
        </section>

        ${this.upcomingEvents.length > 0
          ? html`
              <section class="mt-7">
                <div class="flex items-center justify-between">
                  <h2 class="text-[24px] font-semibold text-white sm:text-[28px]">Upcoming Events</h2>
                  <button type="button" @click=${() => this.navigateToPath('/engagement')} class="text-[16px] font-semibold text-[#ffd451] hover:underline">View All</button>
                </div>

                <div class="mt-3 space-y-3">
                  ${this.upcomingEvents.map(
                    (event) => html`
                      <button type="button" @click=${() => this.navigateToPath(`/event-registration/${event.id}`)} class="w-full rounded-2xl border border-white/14 bg-white/12 px-4 py-3 text-left backdrop-blur-sm transition hover:bg-white/18">
                        <div class="flex gap-3">
                          <div class="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white/12 text-[#ffd451]">
                            <span class="text-xs font-bold uppercase">${new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                            <span class="text-[27px] font-bold leading-none text-white">${new Date(event.date).getDate()}</span>
                          </div>
                          <div class="min-w-0 flex-1">
                            <p class="truncate text-[20px] font-semibold text-white">${event.title}</p>
                            <p class="mt-1 text-[15px] text-[#c9d7ff]">${new Date(event.date).toLocaleDateString()} • ${event.time}</p>
                            <p class="mt-1 flex items-center gap-1 text-[15px] text-[#aec2f8]"><span class="text-[#d3defd]">${this.mapPinIcon()}</span>${event.location}</p>
                          </div>
                          <span class="mt-1 text-[#8ea4e6]">${this.chevronRightIcon()}</span>
                        </div>
                      </button>
                    `,
                  )}
                </div>
              </section>
            `
          : ''}

        <section class="mt-7 grid grid-cols-1 gap-3 pb-10 sm:grid-cols-2">
          <button type="button" @click=${() => this.navigateToPath('/document-request')} class="rounded-2xl border border-white/14 bg-white/12 px-4 py-4 text-left transition hover:bg-white/18">
            <div class="mb-3 flex items-center justify-between text-[#ffd451]">
              ${this.documentIcon()}
              ${this.pendingRequests > 0 ? html`<span class="rounded-full bg-[#f3d652] px-2 py-0.5 text-[13px] font-semibold text-[#1e3d98]">${this.pendingRequests}</span>` : ''}
            </div>
            <h3 class="text-[22px] font-semibold text-[#dce5ff]">Document Requests</h3>
            <p class="mt-2 text-[36px] font-bold leading-none text-white">${this.pendingRequests}</p>
            <p class="text-[18px] text-[#b8c9f9]">Active</p>
          </button>

          <button type="button" @click=${() => this.navigateToPath('/job-opportunities')} class="rounded-2xl border border-white/14 bg-white/12 px-4 py-4 text-left transition hover:bg-white/18">
            <div class="mb-3 flex items-center justify-between text-[#ffd451]">
              ${this.jobIcon()}
              ${this.activeApplications > 0 ? html`<span class="rounded-full bg-[#f3d652] px-2 py-0.5 text-[13px] font-semibold text-[#1e3d98]">${this.activeApplications}</span>` : ''}
            </div>
            <h3 class="text-[22px] font-semibold text-[#dce5ff]">Job Applications</h3>
            <p class="mt-2 text-[36px] font-bold leading-none text-white">${this.activeApplications}</p>
            <p class="text-[18px] text-[#b8c9f9]">In Progress</p>
          </button>
        </section>

        ${this.notificationsOpen ? this.renderNotificationsPanel() : ''}
      </div>
    `
  }

  renderNotificationsPanel() {
    return html`
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]" @click=${this.closeNotifications}>
        <section class="flex h-[80vh] w-full max-w-[760px] flex-col overflow-hidden rounded-3xl bg-white text-[#1a2a6c] shadow-[0_30px_70px_-28px_rgba(6,15,60,0.95)]" @click=${(event) => event.stopPropagation()}>
          <header class="flex items-center justify-between border-b border-[#e5eaf5] px-5 py-4">
            <div>
              <h2 class="text-[24px] font-semibold">Notifications</h2>
              <p class="text-[13px] text-[#6d80ad]">${this.unreadCount} unread</p>
            </div>
            <div class="flex items-center gap-2">
              ${this.unreadCount > 0
                ? html`
                    <button type="button" @click=${this.markAllNotificationsRead} class="rounded-md bg-[#eef3ff] px-2 py-1 text-[12px] font-semibold text-[#2d52b0] hover:bg-[#e5edff]">
                      Mark all read
                    </button>
                  `
                : ''}
              <button type="button" @click=${this.closeNotifications} class="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef2fb] text-[#6278a8]">${this.closeIcon()}</button>
            </div>
          </header>

          <div class="flex-1 overflow-y-auto">
            ${this.notifications.length === 0
              ? html`
                  <div class="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
                    <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#eef2fb] text-[#879cca]">${this.bellIcon()}</div>
                    <h3 class="text-[16px] font-semibold text-[#41588e]">No notifications yet</h3>
                    <p class="mt-1 text-[13px] text-[#7b8db7]">We'll notify you when something new happens.</p>
                  </div>
                `
              : html`
                  <div class="divide-y divide-[#eef2fb]">
                    ${this.notifications.map(
                      (notification) => html`
                        <button type="button" @click=${() => this.openNotificationItem(notification)} class=${`flex w-full gap-3 p-4 text-left transition hover:bg-[#f8fbff] ${notification.read ? 'bg-white' : 'bg-[#f3f7ff]'}`}>
                          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e5eaf5] text-[#4f6394] bg-white">
                            ${this.notificationTypeIcon(notification.type)}
                          </div>
                          <div class="min-w-0 flex-1">
                            <div class="mb-1 flex items-start justify-between gap-2">
                              <h3 class=${`text-[14px] ${notification.read ? 'font-medium text-[#5a6f9a]' : 'font-semibold text-[#1a2a6c]'}`}>
                                ${notification.title}
                              </h3>
                              ${!notification.read ? html`<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d52b0]"></span>` : ''}
                            </div>
                            <p class="text-[12px] text-[#6d80ad]">${notification.message}</p>
                            <p class="mt-1 text-[11px] text-[#8ea0c8]">${this.formatNotificationTime(notification.timestamp)}</p>
                          </div>
                        </button>
                      `,
                    )}
                  </div>
                `}
          </div>
        </section>
      </div>
    `
  }

  render() {
    return html`
      <main class="min-h-screen bg-gradient-to-b from-[#1e2f80] via-[#2443ae] to-[#2e5cc7] text-white lg:h-screen lg:overflow-hidden">
        <div class="mx-auto flex h-full max-w-[1600px]">
          <aside class="hidden h-screen w-[320px] border-r border-white/12 lg:block">
            <alumni-sidebar current-view=${this.currentView} @navigate=${this.handleNavigate} @sign-out=${this.handleSignOut}></alumni-sidebar>
          </aside>

          ${this.isSidebarOpen
            ? html`
                <div class="fixed inset-0 z-30 bg-[#0f1e5d]/60 lg:hidden" @click=${this.closeSidebar}></div>
                <aside class="fixed left-0 top-0 z-40 h-screen w-[86%] max-w-[340px] lg:hidden">
                  <alumni-sidebar current-view=${this.currentView} show-close-button @navigate=${this.handleNavigate} @close-sidebar=${this.closeSidebar} @sign-out=${this.handleSignOut}></alumni-sidebar>
                </aside>
              `
            : ''}

          <section
            class=${`h-screen flex-1 ${
              this.currentView === 'profile' || this.currentView === 'calendar'
                ? 'overflow-hidden p-0'
                : this.currentView === 'news' || this.currentView === 'networking' || this.currentView === 'document-request' || this.currentView === 'job-offerings' || this.currentView === 'donations'
                  ? 'overflow-y-auto p-0'
                  : 'overflow-y-auto px-4 pb-12 pt-4 sm:px-6 lg:px-8 lg:pt-6'
            }`}
          >
            <header class=${`mb-5 items-center justify-between lg:hidden ${this.currentView === 'home' || this.currentView === 'news' || this.currentView === 'profile' || this.currentView === 'calendar' || this.currentView === 'networking' || this.currentView === 'document-request' || this.currentView === 'job-offerings' || this.currentView === 'donations' ? 'hidden' : 'flex'}`}>
              <button
                type="button"
                @click=${this.toggleSidebar}
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#e4ecff]"
                aria-label="Open sidebar"
              >
                ${this.menuIcon()}
              </button>
              <div class="h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/25">
                <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
              </div>
              <button type="button" class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#e4ecff]" aria-label="Notifications">
                ${this.bellIcon()}
                <span class="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#ffd451]"></span>
              </button>
            </header>

            ${this.currentView === 'news'
              ? html`<news-updates-page></news-updates-page>`
              : this.currentView === 'calendar'
                ? html`<alumni-calendar-page @toggle-sidebar=${this.toggleSidebar}></alumni-calendar-page>`
                : this.currentView === 'networking'
                  ? html`<networking-events-page @toggle-sidebar=${this.toggleSidebar}></networking-events-page>`
              : this.currentView === 'document-request'
                ? html`<document-request-page @toggle-sidebar=${this.toggleSidebar}></document-request-page>`
              : this.currentView === 'job-offerings'
                ? html`<job-offerings-page @toggle-sidebar=${this.toggleSidebar}></job-offerings-page>`
              : this.currentView === 'donations'
                ? html`<donations-page @toggle-sidebar=${this.toggleSidebar}></donations-page>`
              : this.currentView === 'profile'
                ? html`<my-profile-page @logout=${this.handleSignOut}></my-profile-page>`
                : this.renderHomeView()}
          </section>
        </div>
      </main>
    `
  }

  actionCard(label, badge, type) {
    const icon = this.quickActionIcon(type)

    return html`
      <button type="button" class="rounded-2xl border border-white/18 bg-white/12 p-4 text-left transition hover:bg-white/18">
        <div class="flex items-start justify-between">
          <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2e74ff] text-white [&_svg]:h-6 [&_svg]:w-6 [&_svg]:stroke-[2.4]">${icon}</span>
          ${badge ? html`<span class="rounded-full bg-[#f3d652] px-2 py-0.5 text-xs font-bold text-[#1f3d99]">${badge}</span>` : ''}
        </div>
        <p class="mt-6 text-[24px] font-semibold text-[#dee8ff]">${label}</p>
      </button>
    `
  }

  networkStat(number, label, icon) {
    return html`
      <div>
        <span class="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-[#ffd451] [&_svg]:h-5 [&_svg]:w-5 [&_svg]:stroke-[2.4]">${icon}</span>
        <p class="mt-2 text-[35px] font-bold leading-none text-white">${number}</p>
        <p class="mt-1 text-[18px] text-[#bbcbfa]">${label}</p>
      </div>
    `
  }

  resourceCard(title, subtitle, type) {
    const icon = this.resourceIcon(type)

    const color = type === 'career' ? 'from-[#7453ff] to-[#d62ddb]' : 'from-[#2d7cff] to-[#2963d6]'

    return html`
      <article class="rounded-2xl border border-white/14 bg-white/12 px-4 py-4">
        <div class="flex items-center gap-3">
          <span class=${`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white [&_svg]:h-6 [&_svg]:w-6 [&_svg]:stroke-[2.4]`}>
            ${icon}
          </span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-[24px] font-semibold text-white">${title}</p>
            <p class="truncate text-[18px] text-[#b9c9f8]">${subtitle}</p>
          </div>
          <span class="text-[#8ea4e6]">${this.chevronRightIcon()}</span>
        </div>
      </article>
    `
  }

  iconBase(path) {
    return html`
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${path}
      </svg>
    `
  }

  solidIconBase(path) {
    return html`
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        ${path}
      </svg>
    `
  }

  quickActionIcon(type) {
    if (type === 'events') {
      return html`<span class="text-[22px] leading-none" aria-hidden="true">📅</span>`
    }

    if (type === 'documents') {
      return html`<span class="text-[22px] leading-none" aria-hidden="true">📄</span>`
    }

    if (type === 'jobs') {
      return html`<span class="text-[22px] leading-none" aria-hidden="true">💼</span>`
    }

    return html`<span class="text-[22px] leading-none" aria-hidden="true">❤️</span>`
  }

  networkIcon(type) {
    if (type === 'alumni') {
      return html`<span class="text-[20px] leading-none" aria-hidden="true">👥</span>`
    }

    if (type === 'events') {
      return html`<span class="text-[20px] leading-none" aria-hidden="true">📅</span>`
    }

    return html`<span class="text-[20px] leading-none" aria-hidden="true">💼</span>`
  }

  resourceIcon(type) {
    if (type === 'mentor') {
      return html`<span class="text-[22px] leading-none" aria-hidden="true">⭐</span>`
    }

    if (type === 'career') {
      return html`<span class="text-[22px] leading-none" aria-hidden="true">📈</span>`
    }

    return html`<span class="text-[22px] leading-none" aria-hidden="true">📘</span>`
  }

  menuIcon() {
    return this.iconBase(html`<line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line>`)
  }

  closeIcon() {
    return this.iconBase(html`<line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line>`)
  }

  bellIcon() {
    return this.iconBase(html`<path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>`)
  }

  mapPinIcon() {
    return this.iconBase(html`<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"></path><circle cx="12" cy="10" r="2.5"></circle>`)
  }

  awardIcon() {
    return this.iconBase(html`<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88"></polyline>`)
  }

  notificationTypeIcon(type) {
    if (type === 'event') return this.calendarIcon()
    if (type === 'document') return this.documentIcon()
    if (type === 'job') return this.jobIcon()
    if (type === 'announcement') return this.bellIcon()
    if (type === 'milestone') return this.awardIcon()
    if (type === 'donation') return this.heartIcon()
    return this.bellIcon()
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

  trendIcon() {
    return this.iconBase(html`<path d="m4 16 6-6 4 4 6-6"></path><path d="M14 8h6v6"></path>`)
  }

  starIcon() {
    return this.iconBase(html`<path d="m12 3 2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5-4.7-4.6 6.5-1L12 3z"></path>`)
  }

  bookIcon() {
    return this.iconBase(html`<path d="M4 19a2 2 0 0 1 2-2h14"></path><path d="M6 3h14v18H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>`)
  }

  chevronRightIcon() {
    return this.iconBase(html`<polyline points="9 18 15 12 9 6"></polyline>`)
  }
}

customElements.define('alumni-homepage', AlumniHomepage)

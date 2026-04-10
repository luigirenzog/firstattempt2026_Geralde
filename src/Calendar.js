import { LitElement, html } from 'lit'
import adduLogo from './assets/ADDULogo.jpg'

class AlumniCalendarPage extends LitElement {
  static properties = {
    isDetailOpen: { state: true },
    selectedEvent: { state: true },
    selectedDay: { state: true },
    currentMonthIndex: { state: true },
  }

  constructor() {
    super()
    this.isDetailOpen = false
    this.selectedEvent = null
    this.selectedDay = 10
    this.currentMonthIndex = 3
  }

  createRenderRoot() {
    return this
  }

  get months() {
    return [
      { key: '2026-02', name: 'February 2026' },
      { key: '2026-03', name: 'March 2026' },
      { key: '2026-04', name: 'April 2026' },
      { key: '2026-05', name: 'May 2026' },
      { key: '2026-06', name: 'June 2026' },
    ]
  }

  get monthLabel() {
    return this.currentMonth.name
  }

  get monthShortLabel() {
    return this.currentMonth.name.split(' ')[0]
  }

  get currentMonth() {
    return this.months[this.currentMonthIndex - 1]
  }

  get eventsByMonth() {
    return {
      '2026-02': [
        {
          id: 201,
          type: 'Event',
          title: 'Alumni Homecoming Orientation',
          day: 8,
          dateLabel: 'Sunday, February 8, 2026',
          time: '9:00 AM',
          location: 'Faber Hall',
          description: 'Orientation for alumni volunteers and batch coordinators.',
          dot: '#10b981',
          accent: '#10b981',
        },
        {
          id: 202,
          type: 'Holiday',
          title: 'People Power Anniversary',
          day: 25,
          dateLabel: 'Wednesday, February 25, 2026',
          time: '',
          location: '',
          description: '',
          dot: '#ef4444',
          accent: '#ef4444',
        },
      ],
      '2026-03': [
        {
          id: 301,
          type: 'Event',
          title: 'Resume Clinic and Portfolio Review',
          day: 6,
          dateLabel: 'Friday, March 6, 2026',
          time: '1:00 PM',
          location: 'Career Services Center',
          description: 'Career advisers review resumes and online portfolios.',
          dot: '#8b5cf6',
          accent: '#8b5cf6',
        },
        {
          id: 302,
          type: 'Event',
          title: 'Women in Tech Alumni Forum',
          day: 19,
          dateLabel: 'Thursday, March 19, 2026',
          time: '3:00 PM',
          location: 'Zoom Meeting',
          description: 'Panel session featuring women alumni leaders in technology.',
          dot: '#60a5fa',
          accent: '#60a5fa',
        },
      ],
      '2026-04': [
        {
          id: 401,
          type: 'Holiday',
          title: 'Maundy Thursday',
          day: 2,
          dateLabel: 'Thursday, April 2, 2026',
          time: '',
          location: '',
          description: '',
          dot: '#ef4444',
          accent: '#ef4444',
        },
        {
          id: 402,
          type: 'Holiday',
          title: 'Good Friday',
          day: 3,
          dateLabel: 'Friday, April 3, 2026',
          time: '',
          location: '',
          description: '',
          dot: '#ef4444',
          accent: '#ef4444',
        },
        {
          id: 403,
          type: 'Event',
          title: 'Tech Talk: AI in the Workplace',
          day: 5,
          dateLabel: 'Sunday, April 5, 2026',
          time: '2:00 PM',
          location: 'Zoom Meeting',
          description: 'Industry leaders discuss AI impact on careers',
          dot: '#8b5cf6',
          accent: '#8b5cf6',
        },
        {
          id: 404,
          type: 'Event',
          title: 'Guest Lecture Program — CS Dept.',
          day: 12,
          dateLabel: 'Sunday, April 12, 2026',
          time: '10:00 AM',
          location: 'Room 301, Jubilee Building',
          description: 'Guest alumni share current trends in software engineering.',
          dot: '#60a5fa',
          accent: '#60a5fa',
        },
        {
          id: 405,
          type: 'Holiday',
          title: 'Araw ng Kagitingan',
          day: 9,
          dateLabel: 'Thursday, April 9, 2026',
          time: '',
          location: '',
          description: '',
          dot: '#ef4444',
          accent: '#ef4444',
        },
        {
          id: 406,
          type: 'Event',
          title: 'Digital Marketing Bootcamp',
          day: 20,
          dateLabel: 'Monday, April 20, 2026',
          time: '9:00 AM',
          location: 'AdDU Innovation Hub',
          description: 'Hands-on digital marketing workshop for recent graduates.',
          dot: '#f59e0b',
          accent: '#f59e0b',
        },
      ],
      '2026-05': [
        {
          id: 501,
          type: 'Holiday',
          title: 'Labor Day',
          day: 1,
          dateLabel: 'Friday, May 1, 2026',
          time: '',
          location: '',
          description: '',
          dot: '#ef4444',
          accent: '#ef4444',
        },
        {
          id: 502,
          type: 'Event',
          title: 'Alumni Mentorship Meet-up',
          day: 3,
          dateLabel: 'Sunday, May 3, 2026',
          time: '1:00 PM',
          location: 'Faber Hall, 2nd Floor',
          description: 'Mentors and young alumni discuss career planning strategies.',
          dot: '#10b981',
          accent: '#10b981',
        },
        {
          id: 503,
          type: 'Event',
          title: 'Startup Founders Networking Night',
          day: 21,
          dateLabel: 'Thursday, May 21, 2026',
          time: '6:30 PM',
          location: 'AdDU Innovation Hub',
          description: 'Networking session for startup founders and aspiring entrepreneurs.',
          dot: '#8b5cf6',
          accent: '#8b5cf6',
        },
      ],
      '2026-06': [
        {
          id: 601,
          type: 'Holiday',
          title: 'Independence Day',
          day: 12,
          dateLabel: 'Friday, June 12, 2026',
          time: '',
          location: '',
          description: '',
          dot: '#ef4444',
          accent: '#ef4444',
        },
        {
          id: 602,
          type: 'Event',
          title: 'Career Fair 2026',
          day: 18,
          dateLabel: 'Thursday, June 18, 2026',
          time: '10:00 AM',
          location: 'Jubilee Gym',
          description: 'Employers and alumni partners meet graduating and recent alumni.',
          dot: '#60a5fa',
          accent: '#60a5fa',
        },
      ],
    }
  }

  get events() {
    return this.eventsByMonth[this.currentMonth.key] || []
  }

  get eventMap() {
    const map = new Map()
    this.events.forEach((entry) => {
      if (!map.has(entry.day)) {
        map.set(entry.day, [])
      }
      map.get(entry.day).push(entry)
    })
    return map
  }

  get calendarCells() {
    const [year, month] = this.currentMonth.key.split('-').map(Number)
    const firstWeekday = new Date(year, month - 1, 1).getDay()
    const daysInMonth = new Date(year, month, 0).getDate()
    const cells = []

    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push({ day: null })
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dayEvents = this.eventMap.get(day) || []
      cells.push({
        day,
        event: dayEvents[0] || null,
      })
    }

    return cells
  }

  previousMonth() {
    this.currentMonthIndex = this.currentMonthIndex === 1 ? this.months.length : this.currentMonthIndex - 1
    this.syncSelectionForCurrentMonth()
  }

  nextMonth() {
    this.currentMonthIndex = this.currentMonthIndex === this.months.length ? 1 : this.currentMonthIndex + 1
    this.syncSelectionForCurrentMonth()
  }

  syncSelectionForCurrentMonth() {
    const firstEvent = this.events[0]
    this.selectedDay = firstEvent ? firstEvent.day : 1
    this.closeEventDetail()
  }

  openFromDay(day) {
    this.selectedDay = day
    const dayEvents = this.eventMap.get(day)
    if (dayEvents?.length) {
      this.openEventDetail(dayEvents[0])
    }
  }

  openEventDetail(eventItem) {
    this.selectedEvent = eventItem
    this.selectedDay = eventItem.day
    this.isDetailOpen = true
  }

  closeEventDetail() {
    this.isDetailOpen = false
    this.selectedEvent = null
  }

  emitToggleSidebar() {
    this.dispatchEvent(
      new CustomEvent('toggle-sidebar', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <main class="h-full overflow-hidden bg-gradient-to-b from-[#1f2f7a] to-[#2553c3] px-4 py-4 text-white sm:px-6 lg:px-8">
        <section class="mx-auto flex h-full w-full max-w-[1120px] flex-col overflow-hidden">
          <header class="mb-4 flex items-center justify-between">
            <button
              type="button"
              @click=${this.emitToggleSidebar}
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#dbe5ff] lg:hidden"
              aria-label="Open sidebar"
            >
              ${this.menuIcon()}
            </button>
            <span class="hidden h-10 w-10 lg:block"></span>
            <div class="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20">
              <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
            </div>
            <span class="h-10 w-10"></span>
          </header>

          <h1 class="text-[38px] font-semibold leading-tight">Alumni Calendar</h1>
          <p class="text-[20px] text-[#c4d4ff]">2026 events and activities</p>

          <div class="mt-4 h-px bg-white/20"></div>

          <section class="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden xl:grid-cols-[1.1fr_1fr]">
            <div class="space-y-4">
              <article class="rounded-3xl border border-white/18 bg-white/10 p-4">
                <div class="mb-3 flex items-center justify-between">
                  <button
                    type="button"
                    @click=${this.previousMonth}
                    aria-label="Previous month"
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#eef4ff] ring-1 ring-white/15 hover:bg-white/20"
                  >
                    <span class="text-[24px] font-semibold leading-none" aria-hidden="true">&#8249;</span>
                  </button>
                  <p class="text-[34px] font-semibold">${this.monthLabel}</p>
                  <button
                    type="button"
                    @click=${this.nextMonth}
                    aria-label="Next month"
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#eef4ff] ring-1 ring-white/15 hover:bg-white/20"
                  >
                    <span class="text-[24px] font-semibold leading-none" aria-hidden="true">&#8250;</span>
                  </button>
                </div>

                <div class="grid grid-cols-7 gap-2 text-center text-[16px] font-semibold uppercase tracking-wide text-[#b9caee]">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>

                <div class="mt-2 grid grid-cols-7 gap-2">
                  ${this.calendarCells.map((cell) => {
                    if (!cell.day) {
                      return html`<span class="h-11"></span>`
                    }

                    const hasEvent = Boolean(cell.event)
                    const isSelected = this.selectedDay === cell.day

                    return html`
                      <button
                        type="button"
                        @click=${() => this.openFromDay(cell.day)}
                        class=${`relative flex h-11 items-center justify-center rounded-xl text-[22px] font-semibold transition ${
                          isSelected
                            ? 'border-2 border-[#f1d34d] bg-[#2e4aa8] text-white'
                            : hasEvent
                              ? 'border border-white/20 bg-white/8 text-[#e8efff] hover:bg-white/15'
                              : 'text-[#e8efff] hover:bg-white/8'
                        }`}
                      >
                        ${cell.day}
                        ${hasEvent
                          ? html`<span class="absolute bottom-1.5 h-1.5 w-1.5 rounded-full" style=${`background:${cell.event.dot};`}></span>`
                          : ''}
                      </button>
                    `
                  })}
                </div>
              </article>

              <article class="rounded-3xl border border-white/18 bg-white/10 p-4">
                <p class="text-[30px] font-semibold">Legend</p>
                <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[17px] text-[#d6e2ff]">
                  ${this.legendItem('#10b981', 'Event')}
                  ${this.legendItem('#f59e0b', 'Deadline')}
                  ${this.legendItem('#ef4444', 'Holiday')}
                  ${this.legendItem('#60a5fa', 'Meeting')}
                </div>
              </article>
            </div>

            <section class="flex min-h-0 flex-col rounded-3xl border border-white/18 bg-white/8 p-4">
              <h2 class="text-[34px] font-semibold">Events in ${this.monthShortLabel}</h2>
              <div class="mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                ${this.events.length
                  ? this.events.map(
                  (item) => html`
                    <article
                      @click=${() => this.openEventDetail(item)}
                      class="cursor-pointer rounded-3xl border border-white/18 bg-white/10 p-4 transition hover:bg-white/14"
                    >
                      <div class="flex gap-3">
                        <span class="mt-0.5 h-14 w-1.5 rounded-full" style=${`background:${item.accent};`}></span>
                        <div class="min-w-0 flex-1">
                          <div class="mb-1 flex flex-wrap items-center gap-2">
                            <span class=${`rounded-xl px-3 py-1 text-[16px] font-semibold ${item.type === 'Holiday' ? 'bg-[#744f8f] text-[#f8a5a5]' : 'bg-[#209f7f] text-[#bdf5e0]'}`}>${item.type}</span>
                            <span class="text-[24px] font-semibold text-[#b8c9f2]">Apr ${item.day}</span>
                          </div>
                          <p class="text-[36px] font-semibold leading-tight text-white">${item.title}</p>
                          ${item.time ? html`<p class="mt-1 inline-flex items-center gap-1.5 text-[24px] text-[#c7d5f8]">${this.clockIcon()} ${item.time}</p>` : ''}
                          ${item.location ? html`<p class="mt-0.5 inline-flex items-center gap-1.5 text-[24px] text-[#b6c7f5]">${this.pinIcon()} ${item.location}</p>` : ''}
                        </div>
                      </div>
                    </article>
                  `,
                  )
                  : html`<p class="rounded-2xl border border-white/16 bg-white/10 px-4 py-6 text-[20px] text-[#c8d5f4]">No events scheduled for this month.</p>`}
              </div>
            </section>
          </section>
        </section>

        ${this.isDetailOpen && this.selectedEvent ? this.renderEventModal() : ''}
      </main>
    `
  }

  renderEventModal() {
    const item = this.selectedEvent
    return html`
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#08164d]/62 p-6 backdrop-blur-[3px]" @click=${this.closeEventDetail}>
        <article class="w-full max-w-[980px] overflow-hidden rounded-3xl bg-[#f7f9fd] text-[#1f2f58] shadow-[0_36px_80px_-28px_rgba(6,15,60,0.95)]" @click=${(event) => event.stopPropagation()}>
          <header class="flex items-center justify-between border-b border-[#d6dce9] px-6 py-5">
            <div>
              <h3 class="text-[36px] font-semibold tracking-tight">Event Details</h3>
              <p class="text-[14px] text-[#7383a4]">Alumni Calendar</p>
            </div>
            <button
              type="button"
              @click=${this.closeEventDetail}
              aria-label="Close event details"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-[#cbd5e6] text-[#5c6986] hover:bg-[#eef2f9]"
            >
              ${this.closeIcon()}
            </button>
          </header>

          <section class="max-h-[70vh] overflow-y-auto px-6 py-5">
            <div class="mb-4 flex items-center gap-2">
              <span class="rounded-full border border-[#c6cfdf] bg-[#eef1f6] px-3 py-1 text-[13px] font-semibold uppercase tracking-wide text-[#4f5f7e]">${item.type}</span>
              <span class="h-3 w-3 rounded-full" style=${`background:${item.dot};`}></span>
            </div>

            <h4 class="text-[46px] font-semibold leading-[1.08] tracking-tight text-[#1f327c]">${item.title}</h4>

            <div class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="rounded-2xl border border-[#dbe3f0] bg-white px-4 py-4">
                <p class="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#7a879f]">Event Information</p>

                <div class="space-y-3">
                  <div class="flex items-start gap-3">
                    <span class="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#e7eef9] text-[#2f65ff]">${this.calendarIcon()}</span>
                    <div>
                      <p class="text-[13px] text-[#7a879f]">Date</p>
                      <p class="text-[22px] font-semibold leading-tight text-[#455470]">${item.dateLabel}</p>
                    </div>
                  </div>

                  ${item.time
                    ? html`
                        <div class="flex items-start gap-3">
                          <span class="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#efeafe] text-[#864df5]">${this.clockIcon()}</span>
                          <div>
                            <p class="text-[13px] text-[#7a879f]">Time</p>
                            <p class="text-[22px] font-semibold leading-tight text-[#455470]">${item.time}</p>
                          </div>
                        </div>
                      `
                    : ''}

                  ${item.location
                    ? html`
                        <div class="flex items-start gap-3">
                          <span class="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#e3f5ea] text-[#2f9a5d]">${this.pinIcon()}</span>
                          <div>
                            <p class="text-[13px] text-[#7a879f]">Location</p>
                            <p class="text-[22px] font-semibold leading-tight text-[#455470]">${item.location}</p>
                          </div>
                        </div>
                      `
                    : ''}
                </div>
              </div>

              <div class="rounded-2xl border border-[#dbe3f0] bg-white px-4 py-4">
                <p class="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#7a879f]">Overview</p>
                <p class="text-[18px] leading-8 text-[#4c5b79]">${item.description || 'This schedule item is part of the official alumni calendar for April 2026.'}</p>

                ${item.type === 'Event'
                  ? html`
                      <div class="mt-4 rounded-xl border border-[#a8c6fb] bg-[#deebff] px-3 py-3 text-[16px] leading-snug text-[#2152d8]">
                        <span class="font-semibold">Interested?</span> Visit the Events tab to register for this event.
                      </div>
                    `
                  : html`
                      <div class="mt-4 rounded-xl border border-[#f3d1d1] bg-[#fff1f1] px-3 py-3 text-[16px] leading-snug text-[#cc3d3d]">
                        <span class="font-semibold">Holiday Notice:</span> Offices may operate on adjusted schedules.
                      </div>
                    `}
              </div>
            </div>
          </section>

          <footer class="flex items-center justify-end gap-3 border-t border-[#d6dce9] px-6 py-4">
            <button type="button" @click=${this.closeEventDetail} class="rounded-xl border border-[#c7d2e8] bg-white px-4 py-2 text-[16px] font-semibold text-[#3f4f74] hover:bg-[#eef2f9]">Dismiss</button>
            <button type="button" @click=${this.closeEventDetail} class="rounded-xl bg-[#223582] px-5 py-2.5 text-[17px] font-semibold text-white">Close</button>
          </footer>
        </article>
      </div>
    `
  }

  legendItem(color, label) {
    return html`
      <span class="inline-flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full" style=${`background:${color};`}></span>
        <span>${label}</span>
      </span>
    `
  }

  iconBase(path) {
    return html`
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${path}
      </svg>
    `
  }

  menuIcon() {
    return this.iconBase(html`<line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line>`)
  }

  closeIcon() {
    return this.iconBase(html`<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`)
  }

  chevronLeftIcon() {
    return this.iconBase(html`<polyline points="15 18 9 12 15 6"></polyline>`)
  }

  chevronRightIcon() {
    return this.iconBase(html`<polyline points="9 18 15 12 9 6"></polyline>`)
  }

  calendarIcon() {
    return this.iconBase(html`<rect x="3" y="5" width="18" height="16" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line><line x1="8" y1="3" x2="8" y2="7"></line><line x1="16" y1="3" x2="16" y2="7"></line>`)
  }

  clockIcon() {
    return this.iconBase(html`<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>`)
  }

  pinIcon() {
    return this.iconBase(html`<path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z"></path><circle cx="12" cy="10" r="3"></circle>`)
  }
}

customElements.define('alumni-calendar-page', AlumniCalendarPage)
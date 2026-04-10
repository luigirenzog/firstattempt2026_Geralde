import { LitElement, html } from 'lit'
import adduLogo from './assets/ADDULogo.jpg'
import featureHero from './assets/Alumni25BG.jpg'
import pastHero from './assets/CareerFairBG.jpg'
import teachHero from './assets/LeadershipBG.jpg'
import seminarHero from './assets/AdvFinanceBG.jpg'

class NetworkingEventsPage extends LitElement {
  static properties = {
    activeTab: { state: true },
    query: { state: true },
    isDetailOpen: { state: true },
    selectedEvent: { state: true },
    isRegistrationOpen: { state: true },
    registrationForm: { state: true },
    registrationError: { state: true },
    registrationSuccess: { state: true },
    isMentorModalOpen: { state: true },
    mentorSearch: { state: true },
    selectedMentor: { state: true },
    isMentorProfileOpen: { state: true },
    requestedMentorIds: { state: true },
    mentorshipMessage: { state: true },
    isChatOpen: { state: true },
    selectedChatAlumni: { state: true },
    chatMessages: { state: true },
    chatInput: { state: true },
  }

  constructor() {
    super()
    this.activeTab = 'Upcoming'
    this.query = ''
    this.isDetailOpen = false
    this.selectedEvent = null
    this.isRegistrationOpen = false
    this.registrationForm = this.getDefaultRegistrationForm()
    this.registrationError = ''
    this.registrationSuccess = false
    this.isMentorModalOpen = false
    this.mentorSearch = ''
    this.selectedMentor = null
    this.isMentorProfileOpen = false
    this.requestedMentorIds = []
    this.mentorshipMessage = ''
    this.isChatOpen = false
    this.selectedChatAlumni = null
    this.chatMessages = []
    this.chatInput = ''
  }

  createRenderRoot() {
    return this
  }

  get tabs() {
    return ['Upcoming', 'Past', 'Teaching', 'Seminars', 'Directory']
  }

  get upcomingItems() {
    return [
      {
        title: 'Career Networking Mixer',
        date: 'March 28, 2026',
        time: '6:00 PM - 9:00 PM',
        location: 'Abreeza Mall, Davao City',
        attendees: 120,
        mode: 'Onsite',
        image: pastHero,
        description: 'An evening of professional networking with alumni across industries. Light refreshments and career coaching included.',
      },
      {
        title: 'Alumni Startup Pitch Night',
        date: 'April 7, 2026',
        time: '5:30 PM - 8:30 PM',
        location: 'AdDU Innovation Hub',
        attendees: 95,
        mode: 'Onsite',
        image: seminarHero,
        description: 'Early-stage founders showcase ideas to mentors, investors, and alumni supporters.',
      },
    ]
  }

  get featuredUpcomingItem() {
    return {
      title: 'AdDU Alumni Grand Homecoming 2026',
      date: 'March 15, 2026',
      time: '9:00 AM - 5:00 PM',
      location: 'Finster Auditorium',
      attendees: 348,
      mode: 'Onsite',
      image: featureHero,
      description: 'Reconnect with batchmates and celebrate decades of Atenean excellence. Featuring a mass, campus tour, cultural show, and grand dinner.',
      status: 'Spots Available',
      mapAddress: 'Ateneo de Davao University, E. Jacinto Street, Davao City, 8000 Philippines',
      parkingInfo: 'Free parking available at the university grounds. Overflow parking at Gaisano Mall of Davao (5 min walk).',
      dressCode: 'Smart casual or Ateneo blue attire is encouraged.',
      schedule: [
        { time: '9:00 AM', activity: 'Registration & Welcome Coffee' },
        { time: '10:00 AM', activity: 'Thanksgiving Mass' },
        { time: '11:30 AM', activity: 'Campus Heritage Tour' },
        { time: '12:30 PM', activity: 'Lunch & Batch Photo Sessions' },
        { time: '2:00 PM', activity: 'Panel: Alumni Success Stories' },
        { time: '3:30 PM', activity: 'Cultural Show & Performances' },
        { time: '5:00 PM', activity: 'Grand Dinner & Awards Night' },
      ],
    }
  }

  get pastItems() {
    return [
      {
        title: 'AdDU Homecoming 2025',
        date: 'March 22, 2025',
        time: '9:00 AM - 6:00 PM',
        location: 'Finster Auditorium, AdDU Campus',
        attendees: 420,
        mode: 'Onsite',
        image: featureHero,
        attended: true,
        description: 'A day of reconnecting with fellow Ateneans featuring thanksgiving mass, campus heritage walk, and batch photo sessions.',
      },
      {
        title: 'Tech Career Summit 2025',
        date: 'January 18, 2025',
        time: '10:00 AM - 4:00 PM',
        location: 'SMX Convention Center, Davao',
        attendees: 215,
        mode: 'Onsite',
        image: teachHero,
        attended: false,
        description: 'Industry leaders shared insights on tech career paths, with booths from major companies recruiting Atenean alumni.',
      },
    ]
  }

  get teachingItems() {
    return [
      {
        title: 'Guest Lecture Program — CS Dept.',
        date: 'April 12, 2026',
        time: '10:00 AM - 12:00 PM',
        location: 'Room 301, Jubilee Building',
        attendees: 40,
        mode: 'Onsite',
        image: teachHero,
        description: 'Share your industry experience with current CS students. The department invites alumni to deliver a 2-hour guest lecture.',
      },
      {
        title: 'Online Mentorship Matching',
        date: 'Open enrollment',
        time: 'Flexible schedule',
        location: 'Virtual — Google Meet',
        attendees: 80,
        mode: 'Online',
        image: seminarHero,
        description: 'Become a mentor for graduating students. Get matched based on industry and preferred mentoring schedule.',
      },
    ]
  }

  get seminarItems() {
    return [
      {
        title: 'Digital Marketing Bootcamp',
        date: 'April 20, 2026',
        time: '9:00 AM - 4:00 PM',
        location: 'AdDU Innovation Hub',
        attendees: 65,
        mode: 'Onsite',
        image: seminarHero,
        description: 'A full-day intensive workshop covering SEO, social media strategy, content marketing, and analytics for alumni professionals.',
      },
      {
        title: 'Leadership & Management Seminar',
        date: 'May 3, 2026',
        time: '1:00 PM - 5:00 PM',
        location: 'Zoom Webinar',
        attendees: 150,
        mode: 'Online',
        image: featureHero,
        description: 'Develop leadership skills with executive coaches. Topics include strategic communication and decision-making.',
      },
    ]
  }

  get directoryItems() {
    return [
      { initials: 'MS', name: 'Maria Santos', course: 'BS Accountancy', role: 'Senior Auditor, SGV & Co.', city: 'Davao City', batch: 'Batch 2018' },
      { initials: 'CR', name: 'Carlos Reyes', course: 'BS Computer Science', role: 'Software Engineer, Accenture', city: 'Makati City', batch: 'Batch 2016' },
      { initials: 'AL', name: 'Angela Lim', course: 'AB Communication', role: 'Marketing Manager, Globe', city: 'Taguig City', batch: 'Batch 2020' },
      { initials: 'PG', name: 'Patrick Gomez', course: 'BS Nursing', role: 'Charge Nurse, SPMC', city: 'Davao City', batch: 'Batch 2015' },
      { initials: 'JN', name: 'Jessa Navarro', course: 'BS Psychology', role: 'HR Business Partner, Aboitiz', city: 'Cebu City', batch: 'Batch 2017' },
      { initials: 'RM', name: 'Rico Martinez', course: 'BS Information Technology', role: 'Product Manager, Voyager', city: 'Pasig City', batch: 'Batch 2019' },
    ]
  }

  get mentors() {
    return [
      {
        id: 1,
        name: 'Dr. Elena Villanueva',
        role: 'Chief Marketing Officer',
        company: 'Jollibee Foods Corp.',
        years: '18 yrs exp.',
        city: 'Makati City',
        mode: 'Online',
        mentees: 12,
        rating: 4.9,
        specialties: ['Brand Strategy', 'Digital Marketing', 'Consumer Insights'],
        bio: 'Award-winning marketer with 18 years of experience building iconic Philippine brands. Passionate about mentoring the next generation of Atenean leaders.',
        course: 'AB Communication',
        batch: 'Batch 2008',
        image: featureHero,
      },
      {
        id: 2,
        name: 'Engr. Marco Aquino',
        role: 'VP of Engineering',
        company: 'Globe Telecom',
        years: '15 yrs exp.',
        city: 'Taguig City',
        mode: 'Online & Onsite',
        mentees: 8,
        rating: 4.8,
        specialties: ['Software Architecture', 'Cloud Computing', 'Team Leadership'],
        bio: 'Leads a 200-person engineering team at Globe. Believes in giving back through structured mentorship and hands-on technical coaching.',
        course: 'BS Computer Science',
        batch: 'Batch 2010',
        image: teachHero,
      },
      {
        id: 3,
        name: 'Atty. Patricia Reyes',
        role: 'Senior Partner',
        company: 'Reyes & Associates Law',
        years: '20 yrs exp.',
        city: 'Davao City',
        mode: 'Onsite',
        mentees: 15,
        rating: 5.0,
        specialties: ['Corporate Law', 'Intellectual Property', 'Legal Compliance'],
        bio: 'Two decades in corporate law with a focus on IP rights. Actively mentors pre-law and law alumni navigating their early careers.',
        course: 'AB Political Science',
        batch: 'Batch 2006',
        image: seminarHero,
      },
      {
        id: 4,
        name: 'Prof. Gabriel Torres',
        role: 'Department Chair, Finance',
        company: 'Ateneo de Davao University',
        years: '22 yrs exp.',
        city: 'Davao City',
        mode: 'Online & Onsite',
        mentees: 20,
        rating: 4.7,
        specialties: ['Financial Analysis', 'Investment Banking', 'Academic Research'],
        bio: 'Guides graduates transitioning to finance careers and supports aspiring researchers in economics and policy.',
        course: 'BS Management Accounting',
        batch: 'Batch 2001',
        image: pastHero,
      },
      {
        id: 5,
        name: 'Danielle Ong',
        role: 'Data Science Lead',
        company: 'Grab Philippines',
        years: '9 yrs exp.',
        city: 'Taguig City',
        mode: 'Online',
        mentees: 6,
        rating: 4.9,
        specialties: ['Data Science', 'Machine Learning', 'Python & SQL'],
        bio: 'Leads the data science team at Grab PH. Loves helping fresh grads break into the data and AI space with practical projects.',
        course: 'BS Mathematics',
        batch: 'Batch 2017',
        image: teachHero,
      },
      {
        id: 6,
        name: 'Ricardo Fernandez',
        role: 'Founder & CEO',
        company: 'MindanaoTech Startup Studio',
        years: '12 yrs exp.',
        city: 'Davao City',
        mode: 'Onsite',
        mentees: 10,
        rating: 4.8,
        specialties: ['Startup Strategy', 'Fundraising', 'Product Development'],
        bio: 'Serial entrepreneur who has launched 4 startups in Mindanao. Mentors aspiring founders on ideation, MVP building, and pitching to investors.',
        course: 'BS Information Technology',
        batch: 'Batch 2014',
        image: featureHero,
      },
    ]
  }

  get filteredMentors() {
    const q = this.mentorSearch.trim().toLowerCase()
    if (!q) {
      return this.mentors
    }

    return this.mentors.filter((mentor) =>
      [mentor.name, mentor.role, mentor.company, mentor.city, mentor.mode, mentor.specialties.join(' '), mentor.course, mentor.batch].join(' ').toLowerCase().includes(q),
    )
  }

  get filteredDirectory() {
    const q = this.query.trim().toLowerCase()
    if (!q) {
      return this.directoryItems
    }
    return this.directoryItems.filter((item) => [item.name, item.course, item.role, item.city, item.batch].join(' ').toLowerCase().includes(q))
  }

  eventMatchesQuery(item) {
    const q = this.query.trim().toLowerCase()
    if (!q) {
      return true
    }

    return [item.title, item.date, item.time, item.location, item.description, item.mode].join(' ').toLowerCase().includes(q)
  }

  filterEventItems(items) {
    return items.filter((item) => this.eventMatchesQuery(item))
  }

  setTab(tab) {
    this.activeTab = tab
  }

  getDefaultRegistrationForm() {
    return {
      fullName: 'Juan C. Dela Cruz',
      courseBatch: 'BS Computer Science · Batch 2015',
      email: 'juan.delacruz@email.com',
      contact: '+63 912 345 6789',
      attendanceType: 'Onsite',
      dietaryRestrictions: '',
      specialRequests: '',
      agreed: false,
    }
  }

  updateRegistrationField(field, value) {
    this.registrationForm = {
      ...this.registrationForm,
      [field]: value,
    }
  }

  openEventDetail(item) {
    const mapAddress = item.mapAddress || item.location || 'Ateneo de Davao University, E. Jacinto Street, Davao City, Philippines'
    const mapQuery = encodeURIComponent(mapAddress)

    this.selectedEvent = {
      mode: item.mode || 'Onsite',
      attendees: item.attendees ?? 0,
      title: item.title,
      date: item.date || 'TBA',
      time: item.time || 'TBA',
      location: item.location || 'Venue to be announced',
      description: item.description || 'No description available yet.',
      image: item.image || featureHero,
      mapImage: item.mapImage || item.image || featureHero,
      mapTitle: item.location || 'Map Preview',
      mapAddress,
      status: item.status || 'Spots Available',
      canRegister: item.canRegister ?? this.activeTab !== 'Past',
      hasRegistered: item.hasRegistered ?? false,
      mapEmbedUrl: item.mapEmbedUrl || `https://www.google.com/maps?q=${mapQuery}&output=embed`,
      openMapsUrl: item.openMapsUrl || `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      parkingInfo: item.parkingInfo || 'Free parking available at the university grounds. Overflow parking is available nearby.',
      dressCode: item.dressCode || 'Smart casual attire is encouraged for this event.',
      schedule:
        item.schedule ||
        [
          { time: '9:00 AM', activity: 'Registration & Welcome' },
          { time: '10:00 AM', activity: 'Main Session' },
          { time: '12:00 PM', activity: 'Networking Lunch' },
          { time: '2:00 PM', activity: 'Breakout Discussions' },
        ],
    }
    this.isDetailOpen = true
  }

  closeEventDetail() {
    this.isDetailOpen = false
    this.selectedEvent = null
  }

  openRegistrationForm() {
    if (!this.selectedEvent?.canRegister) {
      return
    }

    this.registrationForm = this.getDefaultRegistrationForm()
    this.registrationError = ''
    this.registrationSuccess = false
    this.isDetailOpen = false
    this.isRegistrationOpen = true
  }

  closeRegistrationForm() {
    this.isRegistrationOpen = false
    this.registrationError = ''
  }

  openMentorModal() {
    this.mentorSearch = ''
    this.mentorshipMessage = ''
    this.isMentorModalOpen = true
  }

  closeMentorModal() {
    this.isMentorModalOpen = false
  }

  openMentorProfile(mentor) {
    this.selectedMentor = mentor
    this.isMentorProfileOpen = true
  }

  closeMentorProfile() {
    this.isMentorProfileOpen = false
    this.selectedMentor = null
  }

  isMentorRequested(mentorId) {
    return this.requestedMentorIds.includes(mentorId)
  }

  requestMentorship(mentor) {
    if (this.isMentorRequested(mentor.id)) {
      this.mentorshipMessage = `Mentorship request already sent to ${mentor.name}.`
      return
    }

    this.requestedMentorIds = [...this.requestedMentorIds, mentor.id]
    this.mentorshipMessage = `Mentorship request sent to ${mentor.name}.`
  }

  openChat(alumni) {
    this.selectedChatAlumni = alumni
    this.chatMessages = [
      {
        from: 'me',
        text: `Hi ${alumni.name.split(' ')[0]}! I'm Juan from BS Computer Science, Batch 2015. Great to connect with a fellow Atenean!`,
        time: '11:10 PM',
      },
      {
        from: 'them',
        text: `Hey Juan! Nice to meet you. I'm from ${alumni.course}, ${alumni.batch}. How's everything going?`,
        time: '11:11 PM',
      },
    ]
    this.chatInput = ''
    this.isChatOpen = true
  }

  closeChat() {
    this.isChatOpen = false
    this.selectedChatAlumni = null
    this.chatMessages = []
    this.chatInput = ''
  }

  applySuggestion() {
    this.chatInput = "I'd love to hear about your career journey."
  }

  sendChatMessage() {
    const text = this.chatInput.trim()
    if (!text) {
      return
    }

    this.chatMessages = [
      ...this.chatMessages,
      {
        from: 'me',
        text,
        time: 'Now',
      },
    ]
    this.chatInput = ''
  }

  submitRegistration(event) {
    event.preventDefault()

    if (!this.registrationForm.agreed) {
      this.registrationError = 'Please agree to the event terms and privacy policy before confirming registration.'
      return
    }

    this.registrationError = ''
    this.registrationSuccess = true
    this.selectedEvent = {
      ...this.selectedEvent,
      hasRegistered: true,
      status: 'Registered',
      attendees: (this.selectedEvent.attendees || 0) + 1,
    }
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
      <main class="min-h-full bg-gradient-to-b from-[#1f2f7a] to-[#2553c3] px-4 py-4 text-white sm:px-6 lg:px-8">
        <section class="mx-auto w-full max-w-[1260px]">
          <header class="rounded-3xl bg-gradient-to-r from-[#223787] to-[#2d50b8] px-4 py-4 shadow-[0_20px_40px_-24px_rgba(8,19,72,0.95)] sm:px-5">
            <div class="flex items-center justify-between">
              <button
                type="button"
                @click=${this.emitToggleSidebar}
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#dbe5ff] lg:hidden"
                aria-label="Open sidebar"
              >
                ${this.chevronLeftIcon()}
              </button>
              <div class="flex items-center gap-3">
                <h1 class="text-[34px] font-semibold leading-none sm:text-[38px]">Networking & Events</h1>
              </div>
              <div class="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20">
                <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
              </div>
            </div>

            <div class="mt-4 rounded-2xl bg-white/12 px-4 py-3">
              <label class="flex items-center gap-2 text-[#cdd9fa]">
                ${this.searchIcon()}
                <input
                  type="text"
                  .value=${this.query}
                  @input=${(event) => {
                    this.query = event.target.value
                  }}
                  class="w-full bg-transparent text-[17px] text-white placeholder:text-[#b8c8f0] outline-none"
                  placeholder=${this.activeTab === 'Directory' ? 'Search alumni, course, batch, or location...' : 'Search events...'}
                />
              </label>
            </div>
          </header>

          <section class="mt-4 rounded-3xl bg-[#eef2f9] p-3 text-[#1f327f] shadow-[0_16px_36px_-24px_rgba(8,19,72,0.8)] sm:p-4">
            <div class="mb-4 flex flex-wrap gap-2">
              ${this.tabs.map(
                (tab) => html`
                  <button
                    type="button"
                    @click=${() => this.setTab(tab)}
                    class=${`rounded-full px-4 py-2 text-[14px] font-semibold transition ${this.activeTab === tab ? 'bg-[#1f327f] text-white shadow' : 'bg-[#dfe6f2] text-[#4a5f96] hover:bg-[#d4deef]'}`}
                  >
                    ${tab}
                  </button>
                `,
              )}
            </div>

            ${this.activeTab === 'Upcoming'
              ? this.renderUpcoming()
              : this.activeTab === 'Past'
                ? this.renderPast()
                : this.activeTab === 'Teaching'
                  ? this.renderTeaching()
                  : this.activeTab === 'Seminars'
                    ? this.renderSeminars()
                    : this.renderDirectory()}
          </section>
        </section>

        ${this.isDetailOpen && this.selectedEvent ? this.renderEventDetailModal() : ''}
        ${this.isRegistrationOpen && this.selectedEvent ? this.renderRegistrationModal() : ''}
        ${this.isMentorModalOpen ? this.renderMentorModal() : ''}
        ${this.isMentorProfileOpen && this.selectedMentor ? this.renderMentorProfileModal() : ''}
        ${this.isChatOpen && this.selectedChatAlumni ? this.renderChatModal() : ''}
      </main>
    `
  }

  renderHeroCard() {
    const featured = this.featuredUpcomingItem

    return html`
      <article class="overflow-hidden rounded-3xl border border-[#d6deee] bg-white shadow-[0_16px_30px_-22px_rgba(16,33,80,0.6)]">
        <div class="relative h-64">
          <img src=${featureHero} alt="Featured alumni event" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#1a2f78]/80 via-[#1a2f78]/20 to-transparent"></div>
          <div class="absolute left-4 top-4 rounded-full bg-[#d6ad3f] px-3 py-1 text-[12px] font-semibold text-white">FEATURED</div>
          <div class="absolute right-4 top-4 rounded-full bg-black/30 px-3 py-1 text-[12px] font-semibold text-white">${featured.attendees} going</div>
          <div class="absolute bottom-4 left-4 right-4 text-white">
            <h3 class="text-[36px] font-semibold leading-tight">${featured.title}</h3>
            <p class="mt-1 text-[18px] text-[#dbe5ff]">${featured.date} • ${featured.mode}</p>
          </div>
        </div>
        <div class="p-4">
          <p class="text-[20px] leading-8 text-[#4e608e]">${featured.description}</p>
          <button type="button" @click=${() => this.openEventDetail(featured)} class="mt-4 w-full rounded-2xl bg-[#2a49a8] px-4 py-3 text-[22px] font-semibold text-white hover:bg-[#223e94]">View Details</button>
        </div>
      </article>
    `
  }

  renderEventCards(items, showAttended = false, buttonColor = 'bg-[#2a49a8] hover:bg-[#223e94]') {
    return html`
      <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
        ${items.map(
          (item) => html`
            <article class="overflow-hidden rounded-3xl border border-[#d6deee] bg-white shadow-[0_14px_30px_-22px_rgba(16,33,80,0.55)]">
              <div class="relative h-44">
                <img src=${item.image} alt=${item.title} class="h-full w-full object-cover" />
                <span class=${`absolute right-3 top-3 rounded-full px-3 py-1 text-[12px] font-semibold text-white ${item.mode === 'Online' ? 'bg-[#0ea86e]' : 'bg-[#2f4fae]'}`}>${item.mode}</span>
                <span class="absolute bottom-3 right-3 rounded-full bg-black/35 px-3 py-1 text-[12px] font-semibold text-white">${item.attendees} ${showAttended ? 'attended' : ''}</span>
              </div>
              <div class="p-4">
                <p class="text-[34px] font-semibold leading-tight text-[#1f327f]">${item.title}</p>
                <p class="mt-1 text-[17px] text-[#526591]">${item.date} • ${item.time}</p>
                <p class="mt-0.5 text-[17px] text-[#6a7da7]">${item.location}</p>
                <p class="mt-2 text-[18px] leading-7 text-[#4c5f8e]">${item.description}</p>
                ${showAttended && item.attended ? html`<p class="mt-2 rounded-xl bg-[#dcf4e8] px-3 py-2 text-[15px] font-semibold text-[#228358]">You attended this event.</p>` : ''}
                <button type="button" @click=${() => this.openEventDetail(item)} class=${`mt-3 w-full rounded-2xl px-4 py-3 text-[20px] font-semibold text-white ${buttonColor}`}>View Details</button>
              </div>
            </article>
          `,
        )}
      </div>
    `
  }

  renderEventDetailModal() {
    const item = this.selectedEvent
    return html`
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#091651]/62 p-6 backdrop-blur-[2px]" @click=${this.closeEventDetail}>
        <article class="w-full max-w-[980px] overflow-hidden rounded-3xl bg-[#f7f9fd] text-[#1d2f72] shadow-[0_36px_80px_-28px_rgba(6,15,60,0.95)]" @click=${(event) => event.stopPropagation()}>
          <div class="relative h-64">
            <img src=${item.image} alt=${item.title} class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#1c2f78]/85 via-[#1c2f78]/30 to-transparent"></div>
            <button
              type="button"
              @click=${this.closeEventDetail}
              aria-label="Close event details"
              class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#71839d]/80 text-white"
            >
              ${this.closeIcon()}
            </button>

            <div class="absolute left-4 top-4 flex items-center gap-2">
              <span class=${`rounded-full px-3 py-1 text-[12px] font-semibold text-white ${item.mode === 'Online' ? 'bg-[#0ea86e]' : 'bg-[#2f4fae]'}`}>${item.mode}</span>
              <span class="rounded-full bg-black/35 px-3 py-1 text-[12px] font-semibold text-white">${item.attendees} going</span>
            </div>

            <div class="absolute bottom-4 left-4 right-4 text-white">
              <h3 class="text-[40px] font-semibold leading-tight">${item.title}</h3>
              <p class="mt-1 text-[18px] text-[#dbe5ff]">${item.date} • ${item.time}</p>
            </div>
          </div>

          <div class="max-h-[60vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-[#d6deee] px-5 py-3">
              <div class="flex items-center gap-2">
                <button type="button" class="rounded-xl border border-[#d0d9ec] bg-[#edf2fb] px-3 py-1.5 text-[14px] font-semibold text-[#264796]">Save</button>
                <button type="button" class="rounded-xl border border-[#d0d9ec] bg-[#edf2fb] px-3 py-1.5 text-[14px] font-semibold text-[#264796]">Share</button>
              </div>
              <span class="rounded-full bg-[#e5f7ef] px-3 py-1 text-[13px] font-semibold text-[#19965f]">${item.status}</span>
            </div>

            <div class="space-y-4 px-5 py-4">
              <section>
                <h4 class="text-[26px] font-semibold">Event Description</h4>
                <p class="mt-2 text-[18px] leading-8 text-[#4c5f8e]">${item.description}</p>
              </section>

              <section>
                <h4 class="text-[26px] font-semibold">Venue Details</h4>
                <div class="mt-2 rounded-2xl border border-[#d8e0ef] bg-[#f0f4fb] px-4 py-3">
                  <p class="text-[20px] font-semibold text-[#23408a]">${item.location}</p>
                  <p class="mt-1 text-[16px] leading-7 text-[#6478a4]">${item.mapAddress}</p>
                </div>
              </section>

              <section>
                <h4 class="text-[26px] font-semibold">Map Preview</h4>
                <div class="mt-2 overflow-hidden rounded-2xl border border-[#d8e0ef] bg-[#f4f7fc]">
                  <iframe
                    title="Event map preview"
                    src=${item.mapEmbedUrl}
                    class="h-56 w-full border-0"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div class="px-4 py-3">
                    <div class="rounded-xl border border-[#d8e0ef] bg-white px-3 py-2 text-[16px] font-medium text-[#2c447f]">${item.mapTitle}</div>
                    <a href=${item.openMapsUrl} target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold text-[#2a49a8] hover:underline">
                      ${this.externalLinkIcon()}
                      Open in Maps
                    </a>
                  </div>
                </div>
              </section>

              <section>
                <h4 class="inline-flex items-center gap-2 text-[26px] font-semibold">${this.parkingIcon()} Parking Information</h4>
                <div class="mt-2 rounded-2xl border border-[#d8e0ef] bg-[#f0f4fb] px-4 py-3">
                  <p class="text-[17px] leading-7 text-[#5a6f9a]">${item.parkingInfo}</p>
                </div>
              </section>

              <section>
                <h4 class="inline-flex items-center gap-2 text-[26px] font-semibold">${this.shirtIcon()} Dress Code</h4>
                <div class="mt-2 rounded-2xl border border-[#d8e0ef] bg-[#f0f4fb] px-4 py-3">
                  <div class="flex items-center gap-3">
                    <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e2e8f4] text-[#3d5eaa]">${this.shirtIcon()}</span>
                    <p class="text-[17px] leading-7 text-[#5a6f9a]">${item.dressCode}</p>
                  </div>
                </div>
              </section>

              <section>
                <h4 class="inline-flex items-center gap-2 text-[26px] font-semibold">${this.listIcon()} Event Schedule</h4>
                <div class="mt-2 rounded-2xl border border-[#d8e0ef] bg-[#f0f4fb] px-4 py-3">
                  <div class="space-y-0">
                    ${item.schedule.map(
                      (entry, index) => html`
                        <div class="relative flex gap-3 ${index === item.schedule.length - 1 ? 'pb-0' : 'pb-4'}">
                          <div class="flex w-6 shrink-0 justify-center">
                            <span class="mt-1 h-2.5 w-2.5 rounded-full ${index === 0 ? 'bg-[#355cb4]' : 'bg-white ring-2 ring-[#b9c7e6]'}"></span>
                            ${index === item.schedule.length - 1 ? '' : html`<span class="absolute left-[11px] top-4 h-[calc(100%-0.25rem)] w-px bg-[#c8d4eb]"></span>`}
                          </div>
                          <div>
                            <p class="text-[14px] font-semibold text-[#355cb4]">${entry.time}</p>
                            <p class="text-[18px] text-[#415677]">${entry.activity}</p>
                          </div>
                        </div>
                      `,
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>

          <footer class="border-t border-[#d6deee] px-5 py-4">
            <button
              type="button"
              ?disabled=${!item.canRegister}
              @click=${this.openRegistrationForm}
              class=${`w-full rounded-2xl px-4 py-3 text-[22px] font-semibold text-white ${item.canRegister ? 'bg-[#2a49a8] hover:bg-[#223e94]' : 'cursor-not-allowed bg-[#9ca7c4]'}`}
            >
              ${item.canRegister ? 'Register Now' : 'Registration Closed'}
            </button>
          </footer>
        </article>
      </div>
    `
  }

  renderRegistrationModal() {
    const eventItem = this.selectedEvent
    return html`
      <div class="fixed inset-0 z-[60] flex items-center justify-center bg-[#091651]/66 p-6 backdrop-blur-[2px]" @click=${this.closeRegistrationForm}>
        <article class="w-full max-w-[920px] overflow-hidden rounded-3xl bg-[#f7f9fd] text-[#1d2f72] shadow-[0_36px_80px_-28px_rgba(6,15,60,0.95)]" @click=${(e) => e.stopPropagation()}>
          <header class="flex items-center justify-between bg-gradient-to-r from-[#223787] to-[#2d50b8] px-5 py-4 text-white">
            <h3 class="text-[30px] font-semibold">Event Registration</h3>
            <button type="button" @click=${this.closeRegistrationForm} class="flex h-9 w-9 items-center justify-center rounded-full bg-white/18 text-white" aria-label="Close registration form">${this.closeIcon()}</button>
          </header>

          <div class="max-h-[78vh] overflow-y-auto p-5">
            <article class="overflow-hidden rounded-2xl border border-[#d8e0ef] bg-white">
              <div class="relative h-40">
                <img src=${eventItem.image} alt=${eventItem.title} class="h-full w-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#1a2f78]/70 to-transparent"></div>
                <div class="absolute right-3 top-3 rounded-full bg-[#2f4fae] px-3 py-1 text-[12px] font-semibold text-white">${eventItem.mode}</div>
                <p class="absolute bottom-3 left-3 text-[30px] font-semibold text-white">${eventItem.title}</p>
              </div>
              <div class="grid grid-cols-1 gap-3 px-4 py-3 text-[15px] text-[#4f628f] md:grid-cols-2">
                <p>${eventItem.date}<br /><span class="text-[#6e80aa]">${eventItem.time}</span></p>
                <p>${eventItem.location}<br /><span class="text-[#6e80aa]">${eventItem.mode} Event</span></p>
              </div>
            </article>

            <p class="my-4 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a99bd]">Registration Form</p>

            <form @submit=${this.submitRegistration} class="space-y-4 rounded-2xl border border-[#d8e0ef] bg-white p-4">
              <div>
                <h4 class="text-[26px] font-semibold">Your Details</h4>
                <p class="mt-2 rounded-xl bg-[#edf2fb] px-3 py-2 text-[14px] text-[#4f628f]">Some fields are auto-filled from your profile.</p>
              </div>

              <label class="block">
                <span class="mb-1 block text-[14px] text-[#4e6190]">Full Name</span>
                <div class="flex items-center justify-between rounded-xl border border-[#d6deee] bg-[#f2f5fb] px-3 py-2 text-[16px]">
                  <input .value=${this.registrationForm.fullName} @input=${(e) => this.updateRegistrationField('fullName', e.target.value)} class="w-full bg-transparent outline-none" />
                  <span class="rounded-md bg-[#dce6fb] px-2 py-0.5 text-[11px] font-semibold text-[#3a5ea8]">SYNCED</span>
                </div>
              </label>

              <label class="block">
                <span class="mb-1 block text-[14px] text-[#4e6190]">Course & Batch Year</span>
                <div class="flex items-center justify-between rounded-xl border border-[#d6deee] bg-[#f2f5fb] px-3 py-2 text-[16px]">
                  <input .value=${this.registrationForm.courseBatch} @input=${(e) => this.updateRegistrationField('courseBatch', e.target.value)} class="w-full bg-transparent outline-none" />
                  <span class="rounded-md bg-[#dce6fb] px-2 py-0.5 text-[11px] font-semibold text-[#3a5ea8]">SYNCED</span>
                </div>
              </label>

              <label class="block">
                <span class="mb-1 block text-[14px] text-[#4e6190]">Email Address</span>
                <input .value=${this.registrationForm.email} @input=${(e) => this.updateRegistrationField('email', e.target.value)} class="w-full rounded-xl border border-[#d6deee] px-3 py-2 text-[16px] outline-none" />
              </label>

              <label class="block">
                <span class="mb-1 block text-[14px] text-[#4e6190]">Contact Number</span>
                <input .value=${this.registrationForm.contact} @input=${(e) => this.updateRegistrationField('contact', e.target.value)} class="w-full rounded-xl border border-[#d6deee] px-3 py-2 text-[16px] outline-none" />
              </label>

              <div>
                <span class="mb-1 block text-[14px] text-[#4e6190]">Attendance Type</span>
                <div class="grid grid-cols-2 gap-2">
                  <button type="button" @click=${() => this.updateRegistrationField('attendanceType', 'Onsite')} class=${`rounded-xl border px-3 py-2 text-[16px] font-semibold ${this.registrationForm.attendanceType === 'Onsite' ? 'border-[#2749a8] bg-[#2a49a8] text-white' : 'border-[#d6deee] bg-white text-[#5e7097]'}`}>Onsite</button>
                  <button type="button" @click=${() => this.updateRegistrationField('attendanceType', 'Online')} class=${`rounded-xl border px-3 py-2 text-[16px] font-semibold ${this.registrationForm.attendanceType === 'Online' ? 'border-[#2749a8] bg-[#2a49a8] text-white' : 'border-[#d6deee] bg-white text-[#5e7097]'}`}>Online</button>
                </div>
              </div>

              <label class="block">
                <span class="mb-1 block text-[14px] text-[#4e6190]">Dietary Restrictions <span class="text-[#8aa0d1]">(optional)</span></span>
                <input .value=${this.registrationForm.dietaryRestrictions} @input=${(e) => this.updateRegistrationField('dietaryRestrictions', e.target.value)} placeholder="E.g., vegetarian, no pork, allergies" class="w-full rounded-xl border border-[#d6deee] px-3 py-2 text-[16px] outline-none" />
              </label>

              <label class="block">
                <span class="mb-1 block text-[14px] text-[#4e6190]">Special Requests <span class="text-[#8aa0d1]">(optional)</span></span>
                <textarea @input=${(e) => this.updateRegistrationField('specialRequests', e.target.value)} class="w-full rounded-xl border border-[#d6deee] px-3 py-2 text-[16px] outline-none" rows="3" placeholder="Any special requests or accommodations">${this.registrationForm.specialRequests}</textarea>
              </label>

              <label class="flex items-center gap-2 rounded-xl border border-[#d6deee] px-3 py-2 text-[15px] text-[#4d628f]">
                <input type="checkbox" .checked=${this.registrationForm.agreed} @change=${(e) => this.updateRegistrationField('agreed', e.target.checked)} class="h-4 w-4" />
                <span>I agree to the event terms and privacy policy</span>
              </label>

              ${this.registrationError ? html`<p class="text-[14px] font-medium text-[#c63d3d]">${this.registrationError}</p>` : ''}
              ${this.registrationSuccess ? html`<p class="text-[14px] font-medium text-[#1b8d54]">Registration confirmed. You are now registered for this event.</p>` : ''}

              <button type="submit" ?disabled=${this.registrationSuccess} class=${`w-full rounded-2xl px-4 py-3 text-[22px] font-semibold text-white ${this.registrationSuccess ? 'cursor-not-allowed bg-[#8aa1d8]' : 'bg-[#2a49a8] hover:bg-[#223e94]'}`}>
                ${this.registrationSuccess ? 'Registration Confirmed' : 'Confirm Registration'}
              </button>
            </form>
          </div>
        </article>
      </div>
    `
  }

  renderMentorBanner() {
    return html`
      <article @click=${this.openMentorModal} class="mb-4 cursor-pointer rounded-3xl bg-gradient-to-r from-[#2c4aa7] to-[#3c62cb] px-5 py-4 text-white shadow-[0_16px_32px_-24px_rgba(16,33,80,0.7)]">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14">${this.userIcon()}</span>
            <div>
              <p class="text-[30px] font-semibold">Find a Mentor</p>
              <p class="text-[17px] text-[#d6e2ff]">Connect with experienced alumni who can guide your career journey.</p>
            </div>
          </div>
          <span class="text-[#d6e2ff]">${this.chevronRightIcon()}</span>
        </div>
      </article>
    `
  }

  renderMentorModal() {
    return html`
      <div class="fixed inset-0 z-[70] flex items-center justify-center bg-[#091651]/66 p-6 backdrop-blur-[2px]" @click=${this.closeMentorModal}>
        <article class="w-full max-w-[1180px] overflow-hidden rounded-3xl bg-[#f7f9fd] text-[#1d2f72] shadow-[0_36px_80px_-28px_rgba(6,15,60,0.95)]" @click=${(e) => e.stopPropagation()}>
          <header class="bg-gradient-to-r from-[#223787] to-[#2d50b8] px-5 py-4 text-white">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-[32px] font-semibold">Mentorship & Training</h3>
                <p class="mt-1 text-[16px] text-[#d7e1ff]">Find experienced alumni mentors based on your career field and goals.</p>
              </div>
              <button type="button" @click=${this.closeMentorModal} class="flex h-9 w-9 items-center justify-center rounded-full bg-white/16 text-white" aria-label="Close mentors modal">${this.closeIcon()}</button>
            </div>

            <div class="mt-4 rounded-2xl bg-white/14 px-4 py-3">
              <label class="flex items-center gap-2 text-[#d1ddfb]">
                ${this.searchIcon()}
                <input
                  type="text"
                  .value=${this.mentorSearch}
                  @input=${(e) => {
                    this.mentorSearch = e.target.value
                  }}
                  class="w-full bg-transparent text-[16px] text-white placeholder:text-[#c1d0f6] outline-none"
                  placeholder="Search by name, industry, or expertise..."
                />
              </label>
            </div>
          </header>

          <div class="max-h-[74vh] overflow-y-auto bg-[#eff3fb] p-4">
            <div class="mb-3 flex items-center justify-between">
              <button type="button" class="rounded-full border border-[#cfd8ea] bg-white px-4 py-2 text-[14px] font-semibold text-[#536893]">Filters</button>
              <span class="text-[14px] text-[#7284ad]">${this.filteredMentors.length} mentors</span>
            </div>

            ${this.mentorshipMessage ? html`<p class="mb-3 rounded-xl bg-[#dff3e9] px-3 py-2 text-[14px] font-semibold text-[#1d8656]">${this.mentorshipMessage}</p>` : ''}

            <h4 class="mb-3 text-[24px] font-semibold text-[#243f8b]">Recommended Mentors</h4>

            <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
              ${this.filteredMentors.map(
                (mentor) => html`
                  <article class="rounded-3xl border border-[#d6deee] bg-white p-4 shadow-[0_12px_24px_-22px_rgba(16,33,80,0.8)]">
                    <div class="flex items-start justify-between gap-3">
                      <div class="flex items-start gap-3">
                        <img src=${mentor.image} alt=${mentor.name} class="h-16 w-16 rounded-2xl object-cover" />
                        <div>
                          <p class="text-[28px] font-semibold leading-tight text-[#1f327f]">${mentor.name}</p>
                          <p class="text-[16px] text-[#546a99]">${mentor.role}</p>
                          <p class="text-[16px] text-[#6a7ea9]">${mentor.company}</p>
                        </div>
                      </div>
                      <span class="rounded-full bg-[#fff3cf] px-2.5 py-1 text-[13px] font-semibold text-[#b4871e]">★ ${mentor.rating}</span>
                    </div>

                    <div class="mt-3 flex flex-wrap gap-2 text-[13px]">
                      <span class="rounded-full bg-[#edf2fb] px-2.5 py-1 text-[#4d6191]">${mentor.years}</span>
                      <span class="rounded-full bg-[#edf2fb] px-2.5 py-1 text-[#4d6191]">${mentor.city}</span>
                      <span class="rounded-full ${mentor.mode.includes('Online') ? 'bg-[#f0e9ff] text-[#7a4ccf]' : 'bg-[#e5efff] text-[#3a5ca8]'} px-2.5 py-1">${mentor.mode}</span>
                      <span class="rounded-full bg-[#edf2fb] px-2.5 py-1 text-[#4d6191]">${mentor.mentees} mentees</span>
                    </div>

                    <div class="mt-3 flex flex-wrap gap-2">
                      ${mentor.specialties.map((tag) => html`<span class="rounded-full bg-[#e8eefb] px-3 py-1 text-[13px] text-[#2f4ea1]">${tag}</span>`) }
                    </div>

                    <p class="mt-3 text-[16px] leading-7 text-[#4f618f]">${mentor.bio}</p>
                    <p class="mt-2 text-[14px] text-[#788ab2]">${mentor.course} • ${mentor.batch}</p>

                    <div class="mt-3 grid grid-cols-2 gap-2">
                      <button type="button" @click=${() => this.openMentorProfile(mentor)} class="rounded-2xl border border-[#d3dced] bg-[#f5f8fe] px-3 py-2 text-[16px] font-semibold text-[#2f4ea1] hover:bg-[#ebf1fb]">View Profile</button>
                      <button
                        type="button"
                        @click=${() => this.requestMentorship(mentor)}
                        class=${`rounded-2xl px-3 py-2 text-[16px] font-semibold text-white ${this.isMentorRequested(mentor.id) ? 'bg-[#6f84bc]' : 'bg-[#2a49a8] hover:bg-[#223e94]'}`}
                      >
                        ${this.isMentorRequested(mentor.id) ? 'Requested' : 'Request Mentorship'}
                      </button>
                    </div>
                  </article>
                `,
              )}
            </div>
          </div>
        </article>
      </div>
    `
  }

  renderMentorProfileModal() {
    const mentor = this.selectedMentor
    return html`
      <div class="fixed inset-0 z-[80] flex items-center justify-center bg-[#091651]/70 p-6 backdrop-blur-[2px]" @click=${this.closeMentorProfile}>
        <article class="w-full max-w-[760px] rounded-3xl bg-white p-5 text-[#1f327f] shadow-[0_36px_80px_-28px_rgba(6,15,60,0.95)]" @click=${(e) => e.stopPropagation()}>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-4">
              <img src=${mentor.image} alt=${mentor.name} class="h-20 w-20 rounded-2xl object-cover" />
              <div>
                <p class="text-[34px] font-semibold leading-tight">${mentor.name}</p>
                <p class="text-[18px] text-[#4f6596]">${mentor.role}</p>
                <p class="text-[17px] text-[#687ca9]">${mentor.company}</p>
              </div>
            </div>
            <button type="button" @click=${this.closeMentorProfile} class="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef3fb] text-[#4f6596]" aria-label="Close mentor profile">${this.closeIcon()}</button>
          </div>

          <div class="mt-4 flex flex-wrap gap-2 text-[14px]">
            <span class="rounded-full bg-[#edf2fb] px-3 py-1">${mentor.years}</span>
            <span class="rounded-full bg-[#edf2fb] px-3 py-1">${mentor.city}</span>
            <span class="rounded-full bg-[#edf2fb] px-3 py-1">${mentor.mode}</span>
            <span class="rounded-full bg-[#edf2fb] px-3 py-1">${mentor.mentees} mentees</span>
            <span class="rounded-full bg-[#fff3cf] px-3 py-1 text-[#b4871e]">★ ${mentor.rating}</span>
          </div>

          <p class="mt-4 text-[17px] leading-7 text-[#4f618f]">${mentor.bio}</p>

          <div class="mt-4 flex flex-wrap gap-2">
            ${mentor.specialties.map((tag) => html`<span class="rounded-full bg-[#e8eefb] px-3 py-1 text-[13px] text-[#2f4ea1]">${tag}</span>`) }
          </div>

          <p class="mt-4 text-[15px] text-[#7a8bb2]">${mentor.course} • ${mentor.batch}</p>

          <div class="mt-5 grid grid-cols-2 gap-2">
            <button type="button" @click=${this.closeMentorProfile} class="rounded-2xl border border-[#d3dced] bg-[#f5f8fe] px-3 py-2 text-[16px] font-semibold text-[#2f4ea1]">Close</button>
            <button
              type="button"
              @click=${() => this.requestMentorship(mentor)}
              class=${`rounded-2xl px-3 py-2 text-[16px] font-semibold text-white ${this.isMentorRequested(mentor.id) ? 'bg-[#6f84bc]' : 'bg-[#2a49a8] hover:bg-[#223e94]'}`}
            >
              ${this.isMentorRequested(mentor.id) ? 'Requested' : 'Request Mentorship'}
            </button>
          </div>
        </article>
      </div>
    `
  }

  renderUpcoming() {
    const filteredUpcoming = this.filterEventItems(this.upcomingItems)
    const showFeatured = this.eventMatchesQuery(this.featuredUpcomingItem)

    return html`
      ${showFeatured ? this.renderHeroCard() : ''}
      <div class="my-4 border-t border-[#d2dae9] pt-4">
        <p class="mb-3 text-[26px] font-semibold text-[#5b6e9c]">More Upcoming</p>
        ${filteredUpcoming.length
          ? this.renderEventCards(filteredUpcoming)
          : html`<p class="rounded-2xl border border-[#d6deee] bg-white px-4 py-6 text-[17px] text-[#5c6f99]">No upcoming events matched your search.</p>`}
      </div>
    `
  }

  renderPast() {
    const filteredPast = this.filterEventItems(this.pastItems)

    return html`
      <div class="mb-3 flex items-center justify-between rounded-2xl bg-[#e4eaf5] px-4 py-3">
        <p class="text-[28px] font-semibold text-[#233d89]">Past Events</p>
        <span class="text-[16px] text-[#6a7ca7]">${filteredPast.length} events</span>
      </div>
      ${filteredPast.length
        ? this.renderEventCards(filteredPast, true)
        : html`<p class="rounded-2xl border border-[#d6deee] bg-white px-4 py-6 text-[17px] text-[#5c6f99]">No past events matched your search.</p>`}
    `
  }

  renderTeaching() {
    const filteredTeaching = this.filterEventItems(this.teachingItems)

    return html`
      ${this.renderMentorBanner()}
      ${filteredTeaching.length
        ? this.renderEventCards(filteredTeaching, false, 'bg-[#d27100] hover:bg-[#b45f00]')
        : html`<p class="rounded-2xl border border-[#d6deee] bg-white px-4 py-6 text-[17px] text-[#5c6f99]">No teaching opportunities matched your search.</p>`}
    `
  }

  renderSeminars() {
    const filteredSeminars = this.filterEventItems(this.seminarItems)

    return html`
      ${this.renderMentorBanner()}
      ${filteredSeminars.length
        ? this.renderEventCards(filteredSeminars)
        : html`<p class="rounded-2xl border border-[#d6deee] bg-white px-4 py-6 text-[17px] text-[#5c6f99]">No seminars matched your search.</p>`}
    `
  }

  renderDirectory() {
    return html`
      <div class="mb-3 flex items-center justify-between rounded-2xl bg-[#e4eaf5] px-4 py-3">
        <p class="text-[28px] font-semibold text-[#233d89]">Alumni Directory</p>
        <span class="text-[16px] text-[#6a7ca7]">${this.filteredDirectory.length} alumni</span>
      </div>
      <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
        ${this.filteredDirectory.map(
          (alumni) => html`
            <article class="rounded-3xl border border-[#d6deee] bg-white p-4 shadow-[0_14px_30px_-22px_rgba(16,33,80,0.55)]">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-start gap-3">
                  <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[#244296] text-[16px] font-semibold text-white">${alumni.initials}</span>
                  <div>
                    <p class="text-[30px] font-semibold leading-tight text-[#1f327f]">${alumni.name}</p>
                    <p class="text-[17px] text-[#526591]">${alumni.course}</p>
                    <p class="text-[17px] text-[#526591]">${alumni.role}</p>
                    <p class="text-[17px] text-[#6a7da7]">${alumni.city}</p>
                  </div>
                </div>
                <span class="rounded-full bg-[#ecf1fb] px-3 py-1 text-[13px] font-semibold text-[#4965a6]">${alumni.batch}</span>
              </div>

              <div class="mt-4 flex items-center gap-2">
                <button type="button" @click=${() => this.openChat(alumni)} class="flex-1 rounded-2xl bg-[#2a49a8] px-4 py-2.5 text-[16px] font-semibold text-white hover:bg-[#223e94]">Connect</button>
                <button type="button" class="rounded-2xl bg-[#edf1fa] p-2.5 text-[#4c6197] hover:bg-[#e4ebf8]">${this.mailIcon()}</button>
              </div>
            </article>
          `,
        )}
      </div>
    `
  }

  renderChatModal() {
    const alumni = this.selectedChatAlumni
    return html`
      <div class="fixed inset-0 z-[90] flex items-center justify-center bg-[#091651]/70 p-6 backdrop-blur-[2px]" @click=${this.closeChat}>
        <article class="flex h-[86vh] w-full max-w-[980px] flex-col overflow-hidden rounded-3xl bg-[#edf1fa] shadow-[0_36px_80px_-28px_rgba(6,15,60,0.95)]" @click=${(e) => e.stopPropagation()}>
          <header class="bg-gradient-to-r from-[#223787] to-[#2d50b8] px-5 py-4 text-white">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <button type="button" @click=${this.closeChat} class="flex h-9 w-9 items-center justify-center rounded-full bg-white/16" aria-label="Close chat">${this.chevronLeftIcon()}</button>
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-[14px] font-semibold">${alumni.initials}</span>
                <div>
                  <p class="text-[24px] font-semibold leading-tight">${alumni.name}</p>
                  <p class="text-[13px] text-[#d4e0ff]">Online • ${alumni.course}, ${alumni.batch}</p>
                </div>
              </div>
              <button type="button" @click=${this.closeChat} class="flex h-9 w-9 items-center justify-center rounded-full bg-white/16" aria-label="Close chat window">${this.closeIcon()}</button>
            </div>
          </header>

          <div class="border-b border-[#d5ddee] bg-[#f6f8fd] px-5 py-2 text-center text-[13px] text-[#6277a6]">Messages are secured within the AdDU Alumni network</div>

          <div class="flex-1 overflow-y-auto px-5 py-4">
            <div class="mx-auto mb-4 max-w-[420px] rounded-full border border-[#d6deee] bg-white px-4 py-2 text-center text-[14px] text-[#3f5f9f]">You are now connected with ${alumni.name}.</div>

            <div class="space-y-4">
              ${this.chatMessages.map(
                (message) => html`
                  <div class=${`flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    ${message.from === 'them'
                      ? html`<span class="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#244296] text-[11px] font-semibold text-white">${alumni.initials}</span>`
                      : ''}
                    <div class=${`max-w-[72%] rounded-2xl px-4 py-3 ${message.from === 'me' ? 'bg-[#2a49a8] text-white' : 'bg-white text-[#2e406f] ring-1 ring-[#d7deee]'}`}>
                      <p class="text-[16px] leading-7">${message.text}</p>
                      <p class=${`mt-1 text-right text-[12px] ${message.from === 'me' ? 'text-[#d7e3ff]' : 'text-[#8a9bc0]'}`}>${message.time}</p>
                    </div>
                  </div>
                `,
              )}
            </div>

            <button type="button" @click=${this.applySuggestion} class="mt-4 rounded-full border border-[#d2dbec] bg-white px-4 py-2 text-[14px] text-[#3f5f9f]">Suggestion: "I'd love to hear about your career journey."</button>
          </div>

          <footer class="border-t border-[#d6deee] bg-white px-4 py-3">
            <div class="flex items-center gap-2">
              <button type="button" class="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2fb] text-[#6a7ea9]">${this.paperclipIcon()}</button>
              <input
                .value=${this.chatInput}
                @input=${(e) => {
                  this.chatInput = e.target.value
                }}
                @keydown=${(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    this.sendChatMessage()
                  }
                }}
                placeholder="Type a message..."
                class="w-full rounded-2xl border border-[#d6deee] bg-[#f2f5fb] px-4 py-2.5 text-[15px] text-[#334d86] outline-none"
              />
              <button type="button" @click=${this.sendChatMessage} class="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a49a8] text-white">${this.sendIcon()}</button>
            </div>
          </footer>
        </article>
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

  chevronLeftIcon() {
    return this.iconBase(html`<polyline points="15 18 9 12 15 6"></polyline>`)
  }

  chevronRightIcon() {
    return this.iconBase(html`<polyline points="9 18 15 12 9 6"></polyline>`)
  }

  closeIcon() {
    return this.iconBase(html`<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`)
  }

  externalLinkIcon() {
    return this.iconBase(html`<path d="M14 3h7v7"></path><path d="M10 14 21 3"></path><path d="M21 14v7h-7"></path><path d="M3 10V3h7"></path><path d="M3 21h7v-7"></path>`)
  }

  parkingIcon() {
    return this.iconBase(html`<circle cx="12" cy="12" r="10"></circle><path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3"></path>`)
  }

  shirtIcon() {
    return this.iconBase(html`<path d="M8 6 6 8 3 7l2 4v8h14v-8l2-4-3 1-2-2H8z"></path>`)
  }

  listIcon() {
    return this.iconBase(html`<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><circle cx="4" cy="6" r="1"></circle><circle cx="4" cy="12" r="1"></circle><circle cx="4" cy="18" r="1"></circle>`)
  }

  searchIcon() {
    return this.iconBase(html`<circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>`)
  }

  userIcon() {
    return this.iconBase(html`<circle cx="12" cy="8" r="3"></circle><path d="M6 20a6 6 0 0 1 12 0"></path>`)
  }

  mailIcon() {
    return this.iconBase(html`<path d="M4 5h16v14H4z"></path><path d="m4 7 8 6 8-6"></path>`)
  }

  paperclipIcon() {
    return this.iconBase(html`<path d="M21.44 11.05 12.25 20.24a5.5 5.5 0 0 1-7.78-7.78l9.2-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a1.5 1.5 0 0 1-2.12-2.12l8.49-8.49"></path>`)
  }

  sendIcon() {
    return this.iconBase(html`<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>`)
  }
}

customElements.define('networking-events-page', NetworkingEventsPage)
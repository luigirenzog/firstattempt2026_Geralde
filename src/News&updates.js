import { LitElement, html } from 'lit'
import adduLogo from './assets/ADDULogo.jpg'
import imgFeature1 from './assets/Alumni25BG.jpg'
import imgFeature2 from './assets/AIandMachineBG.jpg'
import imgFeature3 from './assets/LeaderSummitBG.jpg'
import imgCard1 from './assets/AdmissionsBG.jpg'
import imgCard2 from './assets/CareerFairBG.jpg'
import imgCard3 from './assets/MariaSantosBG.jpg'
import imgCard4 from './assets/HealthCareBG.jpg'
import imgCard5 from './assets/AdvFinanceBG.jpg'
import imgCard6 from './assets/LeadershipBG.jpg'
import imgCard7 from './assets/SustainBG.jpg'
import imgCard8 from './assets/PharmaBG.jpg'

class NewsUpdatesPage extends LitElement {
  static properties = {
    activeTab: { state: true },
    isDetailOpen: { state: true },
    selectedStory: { state: true },
  }

  constructor() {
    super()
    this.activeTab = 'All News'
    this.isDetailOpen = false
    this.selectedStory = null
  }

  createRenderRoot() {
    return this
  }

  get tabs() {
    return ['All News', 'Announcements', 'University', 'Alumni', 'Achievements', 'Events']
  }

  normalizeCategory(category) {
    if (!category) {
      return ''
    }

    const value = category.trim().toLowerCase()
    if (value === 'announcement' || value === 'announcements') {
      return 'announcements'
    }
    if (value === 'achievement' || value === 'achievements') {
      return 'achievements'
    }
    return value
  }

  get filteredFeaturedStories() {
    if (this.activeTab === 'All News') {
      return this.featuredStories
    }

    const active = this.normalizeCategory(this.activeTab)
    return this.featuredStories.filter((item) => this.normalizeCategory(item.category) === active)
  }

  get filteredAllNewsItems() {
    if (this.activeTab === 'All News') {
      return this.allNewsItems
    }

    const active = this.normalizeCategory(this.activeTab)
    return this.allNewsItems.filter((item) => this.normalizeCategory(item.category) === active)
  }

  get featuredStories() {
    return [
      {
        category: 'University',
        date: 'Feb 25, 2025',
        title: 'AdDU Celebrates 75 Years of Excellence in Mindanao',
        excerpt: 'The university marks a historic milestone with a year-long celebration of service, faith, and academic leadership.',
        source: 'University Communications',
        image: imgFeature1,
        categoryColor: 'bg-[#3d7cff] text-[#dce9ff]',
      },
      {
        category: 'Alumni',
        date: 'Feb 23, 2025',
        title: 'Alumni Startup Raises $2M in Series A Funding',
        excerpt: 'Tech startup founded by AdDU alumni secures major investment to expand AI-powered education platform.',
        source: 'Alumni Relations Office',
        image: imgFeature2,
        categoryColor: 'bg-[#7252ff] text-[#dfd8ff]',
      },
      {
        category: 'Achievement',
        date: 'Feb 20, 2025',
        title: 'AdDU Engineering Team Wins National Robotics Competition',
        excerpt: 'Student team brings home the championship trophy from the Philippine Robotics Olympics 2025.',
        source: 'Engineering Department',
        image: imgFeature3,
        categoryColor: 'bg-[#19b582] text-[#d5fdef]',
      },
    ]
  }

  get allNewsItems() {
    return [
      {
        category: 'Announcement',
        date: 'Feb 18, 2025',
        title: 'New Scholarship Program Launched for STEM Students',
        excerpt: 'AdDU announces PHP 10M scholarship fund for incoming STEM students.',
        image: imgCard1,
        categoryColor: 'bg-[#e8ca36] text-[#1f327d]',
      },
      {
        category: 'Event',
        date: 'Feb 15, 2025',
        title: 'Virtual Career Fair Connects 500+ Alumni with Top Employers',
        excerpt: 'Annual online career fair features major companies and local startups.',
        image: imgCard2,
        categoryColor: 'bg-[#f59d40] text-[#1f327d]',
      },
      {
        category: 'Achievement',
        date: 'Feb 12, 2025',
        title: 'Dr. Juan dela Cruz Receives National Scientist Award',
        excerpt: 'AdDU professor honored for breakthrough research in renewable energy.',
        image: imgCard3,
        categoryColor: 'bg-[#19b582] text-[#d5fdef]',
      },
      {
        category: 'University',
        date: 'Feb 10, 2025',
        title: 'AdDU Library Opens State-of-the-Art Digital Learning Wing',
        excerpt: 'New facility features collaborative zones, podcast rooms, and e-journal hubs.',
        image: imgCard4,
        categoryColor: 'bg-[#3d7cff] text-[#dce9ff]',
      },
      {
        category: 'Alumni',
        date: 'Feb 8, 2025',
        title: 'Alumni Medical Mission Serves 2,000 Families in Davao',
        excerpt: 'Healthcare professionals from the alumni network lead free consultations.',
        image: imgCard5,
        categoryColor: 'bg-[#7252ff] text-[#dfd8ff]',
      },
      {
        category: 'Announcement',
        date: 'Feb 5, 2025',
        title: 'International Exchange Program Expands to 15 Partner Schools',
        excerpt: 'New partnerships offer students more global mobility opportunities.',
        image: imgCard6,
        categoryColor: 'bg-[#e8ca36] text-[#1f327d]',
      },
      {
        category: 'Achievement',
        date: 'Feb 2, 2025',
        title: 'AdDU Debate Team Clinches Asian Championship Title',
        excerpt: 'Student debaters triumph over 50 competing universities in finals.',
        image: imgCard7,
        categoryColor: 'bg-[#19b582] text-[#d5fdef]',
      },
      {
        category: 'University',
        date: 'Jan 28, 2025',
        title: 'Campus Sustainability Initiative Reduces Carbon Footprint by 30%',
        excerpt: 'Green campus programs achieve major emissions reduction targets.',
        image: imgCard8,
        categoryColor: 'bg-[#3d7cff] text-[#dce9ff]',
      },
    ]
  }

  setTab(tab) {
    this.activeTab = tab
  }

  openStoryDetail(item) {
    const source = item.source || 'University Communications'
    const body =
      item.body ||
      'Ateneo de Davao University proudly celebrates 75 years of transformative education in Mindanao. Since 1948, AdDU has been a beacon of academic excellence, molding generations of leaders and changemakers. The Diamond Jubilee celebration features special masses, academic symposiums, cultural shows, and alumni homecoming events throughout the year.'
    const tags = item.tags || ['Anniversary', 'Milestone', 'Celebration']

    this.selectedStory = {
      ...item,
      source,
      body,
      tags,
    }
    this.isDetailOpen = true
  }

  closeStoryDetail() {
    this.isDetailOpen = false
    this.selectedStory = null
  }

  renderFeaturedCard(item) {
    return html`
      <article
        @click=${() => this.openStoryDetail(item)}
        class="cursor-pointer overflow-hidden rounded-2xl bg-[#3f58a8]/85 shadow-[0_16px_38px_-20px_rgba(8,19,72,0.95)] ring-1 ring-white/10 transition hover:-translate-y-0.5"
      >
        <img src=${item.image} alt=${item.title} class="h-52 w-full object-cover" />
        <div class="space-y-2 px-4 pb-4 pt-3 text-[#d6e0ff]">
          <div class="flex items-center gap-2 text-sm font-semibold">
            <span class=${`rounded-lg px-2 py-0.5 ${item.categoryColor}`}>${item.category}</span>
            <span class="text-[#9eb1e9]">${item.date}</span>
          </div>
          <h3 class="text-[30px] font-bold leading-[1.15] text-white">${item.title}</h3>
          <p class="text-[20px] leading-snug text-[#b9c8f2]">${item.excerpt}</p>
          <div class="flex items-center justify-between pt-1 text-[18px] text-[#a7b9ea]">
            <span class="inline-flex items-center gap-1">${this.userIcon()} ${item.source}</span>
            <button type="button" class="font-semibold text-[#f2d54b] hover:underline">Read more</button>
          </div>
        </div>
      </article>
    `
  }

  renderCompactNews(item) {
    return html`
      <article
        @click=${() => this.openStoryDetail(item)}
        class="flex cursor-pointer gap-3 rounded-2xl bg-[#3f58a8]/78 p-3 shadow-[0_16px_32px_-24px_rgba(7,17,70,0.9)] ring-1 ring-white/10 transition hover:-translate-y-0.5"
      >
        <img src=${item.image} alt=${item.title} class="h-20 w-20 shrink-0 rounded-xl object-cover" />
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <span class=${`rounded-md px-2 py-0.5 text-xs font-semibold ${item.categoryColor}`}>${item.category}</span>
            <span class="text-[#8ea2dd]">${this.chevronRightIcon()}</span>
          </div>
          <h4 class="mt-1 line-clamp-2 text-[26px] font-semibold leading-tight text-white">${item.title}</h4>
          <p class="mt-1 line-clamp-1 text-[18px] text-[#b5c5ef]">${item.excerpt}</p>
          <p class="mt-1 inline-flex items-center gap-1 text-[17px] text-[#9eb1e7]">${this.clockIcon()} ${item.date}</p>
        </div>
      </article>
    `
  }

  render() {
    return html`
      <main class="min-h-full bg-transparent px-4 py-5 text-white sm:px-6 lg:px-8">
        <section class="mx-auto w-full max-w-[1160px]">
          <header class="mb-5 rounded-3xl bg-gradient-to-r from-[#213488] to-[#2b4db8] px-4 py-4 shadow-[0_18px_42px_-24px_rgba(8,19,72,0.95)] sm:px-5 sm:py-5">
            <div class="flex items-center justify-between">
              <button type="button" class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-[#d7e2ff]">
                ${this.menuIcon()}
              </button>
              <div class="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20">
                <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
              </div>
              <span class="h-10 w-10"></span>
            </div>

            <section class="mt-3">
              <h1 class="text-[36px] font-bold leading-tight text-white sm:text-[40px]">News & Updates</h1>
              <p class="mt-1 text-[18px] text-[#d3def8] sm:text-[19px]">Stay informed with the latest from AdDU</p>

              <div class="mt-3 flex gap-2 overflow-x-auto pb-1">
                ${this.tabs.map(
                  (tab) => html`
                    <button
                      type="button"
                      @click=${() => this.setTab(tab)}
                      class=${`shrink-0 rounded-full px-4 py-2 text-[15px] font-semibold transition ${
                        this.activeTab === tab
                          ? 'bg-[#f3d652] text-[#1f327e]'
                          : 'bg-[#405aa9] text-[#d7e2ff] hover:bg-[#4c67bb]'
                      }`}
                    >
                      ${tab}
                    </button>
                  `,
                )}
              </div>
            </section>
          </header>

          <section class="mt-4 space-y-4">
            <h2 class="text-[26px] font-semibold">Featured Stories</h2>
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
              ${this.filteredFeaturedStories.map((item) => this.renderFeaturedCard(item))}
            </div>
          </section>

          <section class="mt-4 space-y-3 pb-2">
            <h2 class="text-[24px] font-semibold">All News</h2>
            <div class="grid grid-cols-1 gap-3 xl:grid-cols-2">
              ${this.filteredAllNewsItems.map((item) => this.renderCompactNews(item))}
            </div>
          </section>
        </section>

        ${this.isDetailOpen && this.selectedStory ? this.renderStoryModal() : ''}
      </main>
    `
  }

  renderStoryModal() {
    const story = this.selectedStory
    return html`
      <div class="fixed inset-0 z-50 flex items-end justify-center bg-[#0d1d58]/55 sm:items-center" @click=${this.closeStoryDetail}>
        <article
          class="relative flex h-[94vh] w-full max-w-[760px] flex-col overflow-hidden rounded-t-[2rem] bg-[#f4f6fa] text-[#2f3d5f] shadow-[0_30px_80px_-32px_rgba(7,17,70,0.95)] sm:h-[88vh] sm:rounded-[2rem]"
          @click=${(event) => event.stopPropagation()}
        >
          <div class="relative">
            <img src=${story.image} alt=${story.title} class="h-52 w-full object-cover sm:h-64" />
            <button
              type="button"
              @click=${this.closeStoryDetail}
              aria-label="Close story"
              class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#606d8d] shadow"
            >
              <span class="text-[22px] leading-none">&times;</span>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <div class="rounded-2xl bg-white px-4 py-4 ring-1 ring-[#d5dceb]">
              <div class="mb-2 flex items-center gap-2 text-sm font-semibold">
                <span class=${`rounded-lg border border-[#bcc9e5] bg-[#f2f4f8] px-2 py-0.5 text-[#66748f]`}>${story.category}</span>
              </div>
              <h3 class="text-[44px] font-bold leading-[1.15] text-[#1f327d]">${story.title}</h3>
              <p class="mt-2 text-[18px] leading-relaxed text-[#5d6a83]">${story.excerpt}</p>

              <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#d6dce8] pb-3 text-[16px] text-[#6b7892]">
                <span class="inline-flex items-center gap-1.5">${this.userIcon()} ${story.source}</span>
                <span class="inline-flex items-center gap-1.5">${this.calendarIcon()} ${story.date}</span>
              </div>

              <p class="mt-4 text-[17px] leading-9 text-[#3e4c6d]">${story.body}</p>

              <div class="mt-4 border-t border-[#d6dce8] pt-4">
                <p class="inline-flex items-center gap-1.5 text-[17px] font-semibold text-[#3b4968]">${this.tagIcon()} Tags</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  ${story.tags.map(
                    (tag) => html`<span class="rounded-xl border border-[#d0d7e6] bg-[#eceff4] px-3 py-1 text-[14px] text-[#5f6c86]">${tag}</span>`,
                  )}
                </div>
              </div>

              <div class="mt-4 rounded-xl border border-[#aac3f6] bg-[#dce8fb] px-3 py-3 text-[16px] leading-snug text-[#1a49d0]">
                Stay Connected: Follow AdDU on social media for more updates and stories from the alumni community.
              </div>
            </div>
          </div>

          <div class="border-t border-[#d9deea] bg-[#f4f6fa] px-4 py-3 sm:px-6">
            <button
              type="button"
              @click=${this.closeStoryDetail}
              class="w-full rounded-2xl bg-[#1f327e] px-4 py-3 text-[19px] font-semibold text-white hover:bg-[#1a2a6b]"
            >
              Close
            </button>
          </div>
        </article>
      </div>
    `
  }

  iconBase(path) {
    return html`
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${path}
      </svg>
    `
  }

  menuIcon() {
    return this.iconBase(html`<line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line>`)
  }

  userIcon() {
    return this.iconBase(html`<circle cx="12" cy="8" r="3"></circle><path d="M6 20a6 6 0 0 1 12 0"></path>`)
  }

  clockIcon() {
    return this.iconBase(html`<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>`)
  }

  calendarIcon() {
    return this.iconBase(html`<rect x="3" y="5" width="18" height="16" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line><line x1="8" y1="3" x2="8" y2="7"></line><line x1="16" y1="3" x2="16" y2="7"></line>`)
  }

  tagIcon() {
    return this.iconBase(html`<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V4h9l8.6 8.6a2 2 0 0 1 0 2.8Z"></path><circle cx="7.5" cy="7.5" r="1.5"></circle>`)
  }

  chevronRightIcon() {
    return this.iconBase(html`<polyline points="9 18 15 12 9 6"></polyline>`)
  }
}

customElements.define('news-updates-page', NewsUpdatesPage)

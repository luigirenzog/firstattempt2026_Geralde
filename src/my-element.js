import { LitElement, html } from 'lit'
import './Homepage.js'
import adduLogo from './assets/ADDULogo.jpg'

class AuthCareerHub extends LitElement {
  static properties = {
    isSignUp: { state: true },
    isLoggedIn: { state: true },
    showLoginPassword: { state: true },
    showSignUpPassword: { state: true },
    showSignUpConfirmPassword: { state: true },
  }

  constructor() {
    super()
    this.isSignUp = false
    this.isLoggedIn = false
    this.showLoginPassword = false
    this.showSignUpPassword = false
    this.showSignUpConfirmPassword = false
  }

  createRenderRoot() {
    return this
  }

  render() {
    if (this.isLoggedIn) {
      return html`<alumni-homepage @logout=${this.onLogout}></alumni-homepage>`
    }

    return html`
      <main class="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#334bab] via-[#2b469f] to-[#2a4198] px-4 py-6 text-[#102a73] sm:px-6 sm:py-8">
        <div class="pointer-events-none absolute -left-12 -top-10 h-40 w-40 rounded-full bg-white/15"></div>
        <div class="pointer-events-none absolute -right-14 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-white/15"></div>
        <div class="pointer-events-none absolute bottom-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/8 blur-3xl"></div>

        <section class="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[1040px] items-center justify-center sm:min-h-[calc(100vh-4rem)]">
          <div class="w-full max-w-[820px] text-center">
            <div class="mx-auto mb-6 w-full max-w-[460px] text-white sm:mb-7">
              <div class="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[5px] border-[#dce5ff] bg-[#eff4ff] shadow-[0_0_0_8px_rgba(229,237,255,0.32)] sm:h-24 sm:w-24 sm:border-[6px] sm:shadow-[0_0_0_10px_rgba(229,237,255,0.3)]">
                <img src=${adduLogo} alt="Ateneo de Davao University logo" class="h-full w-full object-cover" />
              </div>
              <h1 class="mt-5 text-[42px] font-medium leading-[0.95] tracking-[-0.03em] sm:text-[64px]">
                ${this.isSignUp ? 'Join Alumni Career Hub' : 'Alumni Career Hub'}
              </h1>
              <p class="mt-2 text-[18px] text-[#d9e4ff] sm:mt-3 sm:text-[22px]">
                ${this.isSignUp ? 'Create your alumni account' : 'Ateneo de Davao University'}
              </p>
            </div>

            <article
              class=${`mx-auto w-full rounded-[2rem] bg-[#eaedf4] text-left shadow-[0_26px_56px_-30px_rgba(16,37,106,0.9)] ${
                this.isSignUp
                  ? 'max-w-[780px] px-6 pb-8 pt-7 sm:px-9 sm:pb-9 sm:pt-8'
                  : 'max-w-[720px] px-6 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-7'
              }`}
            >
              ${this.isSignUp ? this.renderSignUp() : this.renderLogin()}
            </article>
          </div>
        </section>
      </main>
    `
  }

  renderLogin() {
    return html`
      <header>
        <h2 class="text-4xl font-medium text-[#123684] sm:text-5xl">Welcome Back</h2>
        <p class="mt-2 text-[17px] text-[#94a2c7] sm:text-[18px]">Sign in to continue to your career passport</p>
      </header>

      <form class="mt-7 space-y-[18px]" @submit=${this.onSubmit}>
        ${this.renderInput({
          label: 'Email Address',
          type: 'email',
          placeholder: 'Enter your email',
          icon: this.mailIcon(),
        })}

        ${this.renderInput({
          label: 'Password',
          type: this.showLoginPassword ? 'text' : 'password',
          placeholder: 'Enter your password',
          icon: this.lockIcon(),
          trailingButton: html`
            <button
              type="button"
              @click=${() => (this.showLoginPassword = !this.showLoginPassword)}
              class="text-[#8ca0d6] transition hover:text-[#4d66b6]"
              aria-label="Toggle password visibility"
            >
              ${this.eyeIcon()}
            </button>
          `,
        })}

        <div class="flex items-center justify-between text-[16px] text-[#4c61a6] sm:text-[17px]">
          <label class="flex items-center gap-3">
            <input type="checkbox" class="h-5 w-5 rounded-md border-[#bcc8eb] text-[#2440a6]" />
            <span>Remember me</span>
          </label>
          <a href="#" class="font-semibold text-[#2440a6] hover:underline">Forgot Password?</a>
        </div>

        <button
          type="submit"
          class="w-full rounded-[16px] bg-gradient-to-r from-[#2d46a7] to-[#28409f] py-3.5 text-[23px] font-extrabold text-white shadow-[0_14px_28px_-14px_rgba(30,60,162,0.9)] transition hover:translate-y-[-1px]"
        >
          Sign In
        </button>
      </form>

      ${this.renderDivider('or continue with')}
      ${this.renderSocialButtons()}

      <p class="mt-7 text-center text-[17px] text-[#8f9dbf] sm:text-[18px]">
        Don't have an account?
        <button
          class="ml-1 text-[17px] font-extrabold leading-none text-[#2042b2] sm:text-[18px]"
          type="button"
          @click=${() => (this.isSignUp = true)}
        >
          Sign Up
        </button>
      </p>
    `
  }

  renderSignUp() {
    return html`
      <header>
        <h2 class="text-4xl font-medium text-[#123684] sm:text-5xl">Create Account</h2>
        <p class="mt-2 text-[17px] text-[#94a2c7] sm:text-[18px]">Fill in your details to get started</p>
      </header>

      <form class="mt-7 space-y-[14px]" @submit=${this.onSubmit}>
        ${this.renderInput({
          label: 'Full Name',
          type: 'text',
          placeholder: 'Juan dela Cruz',
          icon: this.userIcon(),
        })}

        ${this.renderInput({
          label: 'Email Address',
          type: 'email',
          placeholder: 'juan.delacruz@addu.edu.ph',
          icon: this.mailIcon(),
        })}

        <div class="grid grid-cols-2 gap-3">
          ${this.renderInput({
            label: 'Student ID',
            type: 'text',
            placeholder: '2018-1234',
            icon: this.studentIcon(),
          })}
          ${this.renderInput({
            label: 'Grad Year',
            type: 'text',
            placeholder: '2022',
            icon: this.calendarIcon(),
          })}
        </div>

        ${this.renderInput({
          label: 'Program/Degree',
          type: 'text',
          placeholder: 'BS Computer Science',
          icon: this.degreeIcon(),
        })}

        ${this.renderInput({
          label: 'Password',
          type: this.showSignUpPassword ? 'text' : 'password',
          placeholder: 'Create a password',
          icon: this.lockIcon(),
          trailingButton: html`
            <button
              type="button"
              @click=${() => (this.showSignUpPassword = !this.showSignUpPassword)}
              class="text-[#8ca0d6] transition hover:text-[#4d66b6]"
              aria-label="Toggle password visibility"
            >
              ${this.eyeIcon()}
            </button>
          `,
        })}

        ${this.renderInput({
          label: 'Confirm Password',
          type: this.showSignUpConfirmPassword ? 'text' : 'password',
          placeholder: 'Re-enter your password',
          icon: this.lockIcon(),
          trailingButton: html`
            <button
              type="button"
              @click=${() => (this.showSignUpConfirmPassword = !this.showSignUpConfirmPassword)}
              class="text-[#8ca0d6] transition hover:text-[#4d66b6]"
              aria-label="Toggle password visibility"
            >
              ${this.eyeIcon()}
            </button>
          `,
        })}

        <label class="mt-1 flex items-start gap-3 text-[16px] leading-relaxed text-[#5b6ca1] sm:text-[17px]">
          <input type="checkbox" class="mt-1 h-5 w-5 rounded-md border-[#bcc8eb] text-[#2440a6]" />
          <span>
            I agree to the
            <a href="#" class="font-semibold text-[#1e43b5] hover:underline">Terms and Conditions</a>
            and
            <a href="#" class="font-semibold text-[#1e43b5] hover:underline">Privacy Policy</a>
          </span>
        </label>

        <button
          type="submit"
          class="w-full rounded-[16px] bg-gradient-to-r from-[#2d46a7] to-[#28409f] py-3.5 text-[23px] font-extrabold text-white shadow-[0_14px_28px_-14px_rgba(30,60,162,0.9)] transition hover:translate-y-[-1px]"
        >
          Create Account
        </button>
      </form>

      ${this.renderDivider('or sign up with')}
      ${this.renderSocialButtons()}

      <p class="mt-7 text-center text-[17px] text-[#8f9dbf] sm:text-[18px]">
        Already have an account?
        <button
          class="ml-1 text-[17px] font-extrabold leading-none text-[#2042b2] sm:text-[18px]"
          type="button"
          @click=${() => (this.isSignUp = false)}
        >
          Sign In
        </button>
      </p>
    `
  }

  renderDivider(text) {
    return html`
      <div class="my-6 flex items-center gap-3 text-[16px] text-[#97a6ca]">
        <span class="h-px flex-1 bg-[#d8dfef]"></span>
        <span>${text}</span>
        <span class="h-px flex-1 bg-[#d8dfef]"></span>
      </div>
    `
  }

  renderSocialButtons() {
    return html`
      <div class="grid grid-cols-2 gap-3">
        <button type="button" class="flex items-center justify-center gap-2 rounded-2xl border border-[#d2dbef] bg-white py-2.5 text-[20px] font-semibold text-[#22396f] hover:bg-[#f8faff]">
          <span class="text-[#ea4335]">G</span>
          Google
        </button>
        <button type="button" class="flex items-center justify-center gap-2 rounded-2xl border border-[#d2dbef] bg-white py-2.5 text-[20px] font-semibold text-[#22396f] hover:bg-[#f8faff]">
          <span class="text-[#2042b2]">f</span>
          Facebook
        </button>
      </div>
    `
  }

  renderInput({ label, type, placeholder, icon, trailingButton }) {
    return html`
      <label class="block">
        <span class="mb-2 block text-[19px] font-bold text-[#0f2b74] sm:text-[20px]">${label}</span>
        <span class="flex items-center gap-3 rounded-[14px] border border-[#c7d2eb] bg-[#dfe5f0] px-4 py-3 text-[#8ca0d6] focus-within:border-[#3556c0]">
          ${icon}
          <input
            class="w-full border-none bg-transparent text-[22px] text-[#3e4e86] outline-none"
            type=${type}
            placeholder=${placeholder}
          />
          ${trailingButton || ''}
        </span>
      </label>
    `
  }

  onSubmit(event) {
    event.preventDefault()

    if (!this.isSignUp) {
      this.isLoggedIn = true
    }
  }

  onLogout() {
    this.isLoggedIn = false
    this.isSignUp = false
  }

  iconBase(path) {
    return html`
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${path}
      </svg>
    `
  }

  mailIcon() {
    return this.iconBase(html`<path d="M4 5h16v14H4z"></path><path d="m4 7 8 6 8-6"></path>`)
  }

  lockIcon() {
    return this.iconBase(html`<rect x="4" y="11" width="16" height="9" rx="2"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path>`)
  }

  eyeIcon() {
    return this.iconBase(html`<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6"></path><circle cx="12" cy="12" r="3"></circle>`)
  }

  userIcon() {
    return this.iconBase(html`<path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="8" r="4"></circle>`)
  }

  studentIcon() {
    return this.iconBase(html`<path d="m3 9 9-5 9 5-9 5-9-5Z"></path><path d="M7 11.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-3.5"></path>`)
  }

  calendarIcon() {
    return this.iconBase(html`<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M8 3v4M16 3v4M3 10h18"></path>`)
  }

  degreeIcon() {
    return this.iconBase(html`<circle cx="12" cy="9" r="4"></circle><path d="M9 13v7l3-2 3 2v-7"></path>`)
  }
}

customElements.define('auth-career-hub', AuthCareerHub)

# firstattempt2026_Geralde

## Geralde

## Framework
Lit

## Module
Networking & Events

## Installation
Follow these steps to replicate this repository and run it on a different computer.

### 1. Install Required Software
1. Install Node.js (version 18 or later recommended):
https://nodejs.org/
2. Open a terminal and verify installation:

```bash
node -v
npm -v
```

### 2. Clone the Repository
1. In terminal, go to your desired folder:

```bash
cd path/to/your/projects
```

2. Clone this repository:

```bash
git clone <your-repository-url>
```

3. Enter the project folder:

```bash
cd firstattempt2026_Geralde
```

### 3. Install Dependencies
Run:

```bash
npm install
```

This will install all packages listed in package.json.

### 4. Run the Project (Development Mode)
Start the Vite development server:

```bash
npm run dev
```

Then open the local URL shown in terminal (usually http://localhost:5173).

### 5. Build for Production
Create an optimized build:

```bash
npm run build
```

### 6. Preview the Production Build
Run:

```bash
npm run preview
```

Then open the preview URL shown in terminal.

### 7. Common Troubleshooting
1. If node_modules is missing or corrupted:

```bash
rm -rf node_modules package-lock.json
npm install
```

2. If port 5173 is already in use, Vite will provide a new port automatically.
3. If commands are not recognized, restart terminal after installing Node.js.

## AI Tools Used
GitHub Copilot (GPT-5.3-Codex)

## Prompt
"referencing the first image, convert this mobile login screen to a web login page. for the second and third image are for the sign up page when "sign up" is clicked from the login page.

in creating this project use the LIT js as the main framework and use tailwindcss as the css framework. install LIT js and tailwind css in generating the web page"

## PWA Conversion Documentation

### Master Prompt (PWA)
"Help me generate a valid manifest.json file for my Progressive Web Application (PWA). The app should include University Branding with the following details:

Name: "University App"
Short Name: "UniApp"
Description: "A high-performance, offline-ready Progressive Web Application for university services."
Start URL: "/"
Display: "standalone"
Background Color: "#ffffff"
Theme Color: "#0047ab" (University Blue)
Icons: Use placeholders for now (e.g., /assets/icon-192x192.png, /assets/icon-512x512.png).

Provide the complete JSON structure for the file and explain where to save it in my project."

### Completed Checklist
- [x] Created manifest file: public/manifest.json
	- [x] Set app metadata (name, short_name, description, start_url, display, colors)
	- [x] Added icons for 192x192 and 512x512
- [x] Linked manifest in HTML head: index.html
- [x] Created and registered service worker: public/service-worker.js and src/my-element.js
- [x] Added caching strategies
	- [x] App shell pre-cache for core files
	- [x] Static asset cache-first with background update (CSS, JS, images, fonts)
	- [x] Navigation network-first with offline fallback
	- [x] API/dynamic content network-first with cache fallback
- [x] Added actual icon files
	- [x] public/assets/icon-192x192.png
	- [x] public/assets/icon-512x512.png
- [x] Added offline status banner in UI when browser is offline
- [x] Verified cache version migration and old cache cleanup

### Hallucinations and Fixes
I used this section to log mismatches between what I expected and what actually happened, then documented how I fixed each issue.

| 2026-04-20 | I clicked the service worker Update button in DevTools, but nothing changed.
- I could not see the new cache version right away. 
- I turned off offline mode, then forced an update/unregister and reloaded the app. 
- I confirmed v2/v3/v4 caches appeared correctly and older versions were removed. 

|2026-04-20 | I saw a stale service-worker.js version in DevTools Sources. 
- I was unsure whether CACHE_VERSION was actually updated. 
- I verified and edited the real project file in public/service-worker.js, then reloaded the service worker. 
- I confirmed the running worker and cache names matched the latest version. 

| 2026-04-20 | My app reload briefly failed with ERR_CONNECTION_REFUSED. 
- I could not validate service worker changes during that moment. 
- I restarted the Vite dev server. 
- I confirmed the app loaded again and the service worker returned to activated state. 

### Local Testing Notes
1. Start app with npm run dev.
2. Open DevTools > Application.
3. Confirm service worker is activated.
4. Open Cache storage and verify current version caches exist.
5. In Network tab, switch to Offline and reload to confirm cached UI still renders.
6. Bump CACHE_VERSION in public/service-worker.js and reload to verify old caches are cleaned up.

## Screenshots
These are official actual screenshots of the web application (includes the entire browser).

### 1st Image: Login Page
![1st Image - Login Page](src/assets/LoginPage.png)

### 2nd Image: Signup Page
![2nd Image - Sign Up Page](src/assets/SignupPage.png)

### 3rd Image: Home Page
![3rd Image - Homepage](src/assets/HomePage.png)

### 4th Image: News & Updates page
src/assets/News&Updates.png
![4th Image - News & Updates Page](src/assets/News&Updates.png)

### 5th Image: My profile page
src/assets/MyProfile.png
![5th Image - My Profile Page](src/assets/MyProfile.png)

### 6th Image: Alumni calendar page
src/assets/AlumniCalendar.png
![6th Image - Alumni Calendar Page](src/assets/AlumniCalendar.png)

### 7th Image: Networking & Events page
src/assets/Networking&Events.png
![7th Image - Networking & Events Page](src/assets/Networking&Events.png)
![Past Events](src/assets/PastEvents.png)
![TeachingEvents](src/assets/TeachingEvents.png)
![Seminars](src/assets/Seminars.png)
![Directory](src/assets/Directory.png)
![View Details](src/assets/ViewDetails.png)
![Event Registration](src/assets/EventRegistration.png)
![Mentorship](src/assets/Mentorship.png)




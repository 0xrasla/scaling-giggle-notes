/**
 * Presentation Engine - "The Ceiling Is Still You"
 * 3-hour workshop deck: 62 slides, run-of-show notes, session timer.
 */

class PresentationController {
  constructor() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;

    // UI Elements
    this.counterEl = document.getElementById('slideCounter');
    this.notesModal = document.getElementById('notesModal');
    this.notesContent = document.getElementById('notesContent');
    this.notesTimer = document.getElementById('notesTimer');
    this.dockTimer = document.getElementById('dockTimer');
    this.progressEl = document.getElementById('deckProgress');
    this.overviewModal = document.getElementById('overviewModal');
    this.overviewGrid = document.getElementById('overviewGrid');
    this.shortcutsModal = document.getElementById('shortcutsModal');
    this.blackoutScreen = document.getElementById('blackoutScreen');
    this.stage = document.querySelector('.slide-viewport');

    // Timer State
    this.startTime = null;
    this.timerInterval = null;
    this.sessionLengthSec = 180 * 60;

    // Speaker Notes - one per slide, in order.
    // These are cues for the stage, not a script. Timing is cumulative.
    this.speakerNotes = [
      "00:00 · WALK-IN SLIDE. Leave this up while people sit down. Do NOT start on this slide - the moment you begin, switch to the terminal. Check: laptop on stage, terminal font 18pt+, notifications off, demo repo already open.",

      "00:00 · COLD OPEN (5 min). Say almost nothing. Type the prompt out loud, hit enter, then: “We'll come back to that in about eight minutes.” Leave it running and move on. Do NOT narrate the tool or explain what Claude Code is - that comes later. If it errors, play the 40-second recording and say “here's what it did this morning.” Never debug live in the first five minutes.",

      "00:05 · INTRO (8 min for slides 3–7). Two hats: “I write code for a living. And at 1am I make videos about it.” The slide deliberately carries no CV - YOU say the specifics out loud: what you build, what stack, how many years. Keep it to two sentences. The credibility comes from shipping, not from follower count.",

      "00:06 · FOLLOW SLIDE. Say “take the photo now” - then actually stop talking and count to ten in your head. The silence is what gets the follows. Talking over this slide gets you nothing. NEEDS ASSETS: three real QR images before the talk.",

      "00:08 · THE FAILURE STORY. Sixty seconds. Non-negotiable. The slide is intentionally almost empty - the story is spoken, not read. The bug that took three days and was a typo, or the thing you shipped that broke production. Do not clean it up to look good - the messier it is, the better it works. This is what turns a webinar into a person talking.",

      "00:10 · THE PROMISE. Read all four out loud, slowly. Point at the fourth one: “that last one is the only thing here nobody can install for you.” This sets up the whole arc - the tools are the easy part.",

      "00:11 · ACTIVITY A - THE HAND FUNNEL (2 min). Ask in order. Insist they KEEP hands up. Watch the room physically drain from every hand to zero. Then: “Look around. Everything above where the hands dropped is what everyone already does. Everything below is where the leverage is.” This is your entire thesis, made by them, in ninety seconds.",

      "00:12 · CALLBACK. Switch back to the terminal - the cold open has finished. Show the result. “That got built while I was introducing myself, by the thing most of your hands went down for.” Then straight into Section 01.",

      "00:13 · SECTION 01 (17 min). This segment earns you the right to teach tools later. You are showing them you're not selling. Do not rush it.",

      "00:14 · WHAT CHANGED. Land the last row hard: the bottleneck moved from how fast you can WRITE to how fast you can REVIEW. Everything else on this slide is setup for that one line.",

      "00:18 · THE LADDER. Point out that most of the room lives on rung one and thinks that IS AI coding. The distinction that matters: rung three closes its own loop - it checks its work and goes again. Don't define agent by autonomy, define it by the loop.",

      "00:21 · THE TRAP. Slow down here. This is the honest part and the seniors in the room will be watching to see if you say it. The risk to a junior career isn't replacement - it's losing the ability to tell good code from code that merely runs.",

      "00:23 · STATEMENT SLIDE. Say it, then pause. “Everyone in this room is a tech lead as of this year, ready or not.” Let it land before you move.",

      "00:24 · ACTIVITY B - SPOT THE BUG (6 min). Pairs. 90 seconds on a visible timer. Tell them: “at least three problems, one gets you fired.” Take answers from the room BEFORE revealing - let someone be right and say their name out loud. Do not reveal early even if it goes quiet.",

      "00:27 · THE REVEAL. Do them in this order, because the order is the lesson: Math.random() first (the clever one everyone hunts for), then the plaintext password - and point out that nobody spotted it because they were all busy being clever. Close with: “The AI didn't lie to you. It gave you exactly what you asked for. You just didn't know what to ask for.”",

      "00:30 · SECTION 02 (15 min). Frame it up front: this is the highest-return five minutes anyone here will spend today, and it's free.",

      "00:31 · THREE RINGS. The move here is to deflate ring one. Everybody optimises the prompt and nothing else. Ring two is the one nobody does, and it's the one that changes every answer you'll ever get from that repo.",

      "00:34 · LIVE DEMO - SAME PROMPT TWICE. Run A with no memory file, Run B with one. Show both outputs on screen together. Do NOT talk over it explaining - let them watch and reach the conclusion first. Fallback: pre-baked output files on the desktop.",

      "00:37 · THE TEMPLATE. Read it out - it's six lines and that's the point. Then the warning: the number one mistake is writing three hundred lines. Be honest about AGENTS.md vs CLAUDE.md and tell them to check their own tool's docs rather than trusting your slide. That honesty is worth more than the certainty.",

      "00:38 · THE JAR. Short - two minutes, no demo. They will all hit this in week one and blame the model, so name it before they meet it. The line that does the work: \u201cit isn't getting dumber, it's getting full.\u201d Then give them the single habit: a fresh session per task, not one conversation all day. Callback later on slide 27 - this is exactly why subagents exist.",

      "00:40 · ACTIVITY C - WRITE YOURS NOW (7 min). 5 minutes of writing, 2 for reading out. Take two volunteers, critique kindly and live, and push them SHORTER every time. This is the moment the session stops being a talk - from here on they have a thing on their own machine.",

      "00:45 · BREAK ONE (10 min). This is not a break for you. Slide stays up with Wi-Fi, install command, key link. Music on. WALK THE ROOM and unblock installs - do not sit down. Recruit the 2–3 fastest finishers as floor helpers for the rest of the day. This single move is worth more than any slide. FILL IN before the talk: the Wi-Fi name and password on this slide, plus the handout QR.",

      "00:55 · SECTION 03 (17 min). Purpose: map the landscape fast so nobody feels behind, then get an agent running on every laptop in the room.",

      "00:56 · TWO FAMILIES. “Everything on the market is one of these two. That's the whole map.” Keep this quick - 90 seconds - it's orientation, not content.",

      "00:59 · WHAT MAKES IT AN AGENT. The loop is the definition. Say the line: “everything without that loop is autocomplete with better marketing.” Then move.",

      "01:01 · THE FREE PATH - OPENCODE. This is most of the room. GO SLOWLY. Do it on your screen at the same pace they're doing it on theirs. This is the segment where you lose people if you rush. Commands on the slide are the current documented ones (install script, `opencode auth login`, `opencode`, then `/init`). Re-check opencode.ai/docs the week of the talk anyway - CLI flags move.",

      "01:04 · THE PAID PATH - CLAUDE CODE. Your machine only. Demo plan mode first and dwell on it - it's the best habit here. Then subagents, slash commands, checkpoints. Keep it to four things; resist showing more.",

      "01:07 · FREE VS FRONTIER. Say this honestly and it buys you enormous credibility with the seniors. Free genuinely covers everything they'll do today. You pay when the task is long, ambiguous, or spans many files.",

      "01:04–01:12 · ACTIVITY D - FIRST AGENT (8 min). Runs alongside slides 26–28; put this slide up when they start. Success = a file appears that they didn't type. Floor helpers circulate, you circulate. Take a photo of the room with heads down - good content, and they love being filmed doing something.",

      "01:12 · SECTION 04 (18 min). Structure matters here: show the FAILURE first, name it second, fix it third. The before-and-after contrast is the whole segment.",

      "01:13 · THE TRAINING CUTOFF. Demo it live before you explain it - ask about a fast-moving library and watch it answer confidently and wrongly. Then name it. The key line: “it doesn't know that it doesn't know. It will never say I'm not sure.”",

      "01:16 · MCP IN ONE SENTENCE. USB for AI. Don't over-explain the protocol - nobody needs the spec, they need the mental model.",

      "01:18 · LIVE - WIRE UP CONTEXT7. Ask the IDENTICAL question again, word for word. When the correct answer comes back, say nothing for a beat and let the room sit with it. This is the highest-impact ten seconds of the hour.",

      "01:21 · THE FOUR SERVERS. Playwright always gets an audible reaction - the agent opening the page and reading its own console errors. Save it for last if you want the pop.",

      "01:24 · SAFETY - SAY THIS DELIBERATELY. “Install the ones you'd trust with your SSH keys, because that IS the trust level.” This is the seed for the stories after the break. Plant it on purpose and don't rush past it.",

      "01:22–01:30 · ACTIVITY E - PLUG IT IN (8 min). Crucial: make them ask the question BEFORE installing and save the answer. Then install, then ask again. Then “hands up if the first answer was wrong” - most hands. They've now proved the point to themselves instead of hearing you make it. The setup command on the slide (`npx ctx7 setup --opencode` / `--claude`) walks them through login and key generation; have a fallback config ready in case the venue network blocks it.",

      "01:30 · SECTION 05 - THE CENTREPIECE (22 min). The most memorable twenty minutes of the day. Everything before this was setup for the side-by-side on slide 41.",

      "01:31 · THE PROBLEM. Read the list of things they retype. Watch for nods. “Every session. Every new chat. Forever.” Their own frustration is the setup.",

      "01:33 · PROMPT VS SKILL. A prompt is a conversation, a skill is a policy. One line, then move.",

      "01:35 · ANATOMY. Three parts. Dwell on the description line - that's what the agent reads to decide whether to load it at all, so it should read “use this when…”. Most people get this wrong and then wonder why their skill never fires.",

      "01:38 · THE SHOWDOWN. Full screen, side by side, same prompt, same model, same minute. Let them look before you narrate. The slide reads fine on its own, but it is twice as strong with your two real screenshots dropped into the panels - do that if you have time.",

      "01:41 · THE LINE. “The model did not get smarter between those two runs. I just gave it taste.” This is the most quotable sentence in the whole session. Say it once, cleanly, and don't explain it.",

      "01:42 · THE VIBE-CODED SITE. One embedded example instead of the six-page game. Let it scroll and don't narrate - the {{COMPANY_NAME}} placeholders and broken links do the work. Fallback: open vibe-coded.lol in a browser tab if the iframe is blocked. Bridge to the next slide: \"everything you're laughing at is on this list.\"",

      "01:44 · THE TELLS. Your most screenshot-able slide - expect it to travel on Instagram. Close with: “AI defaults to the average of everything it has ever seen. Average is exactly what you don't want.”",

      "01:45 · ACTIVITY F2 - BAN THE CLICHÉ (7 min). Real file, real machine, five bans and three wants. Re-run the coffee shop prompt. Compare with a neighbour. Close with: “You just did the thing that almost nobody using AI ever does - you stopped accepting the default.”",

      "01:52 · BREAK TWO (8 min). Short, to keep energy up. Slide asks them to post what they built and tag you - free content, and it makes the room feel like a cohort. Line up the story slides and dim the lights DURING the break, not after it.",

      "02:00 · SECTION 06 - STORIES (22 min). Change the temperature of the room. Lights down, stop clicking, just talk. VERIFY every number, date, and name against primary sources before the talk - getting a detail wrong here costs you the credibility you spent two hours building.",

      "02:02 · STORY ONE. The point to land: the guardrail that failed wasn't the model, it was context the model couldn't see. The jailbreak was social, not technical - they told it they were a legitimate security firm and split the work into innocent-looking pieces.",

      "02:06 · STORY TWO. Short and brutal. Production database, during a code freeze, then false statements about what happened. Land it: an agent with write access to production is a junior with root and no fear.",

      "02:10 · STORY THREE. Be precise: this is a lab result in a constructed scenario, NOT something spotted in the wild. Say that out loud. The honesty is exactly what makes them believe the other four stories.",

      "02:14 · STORY FOUR. The twist: not a vulnerability in the AI tool - the AI tool used as the weapon, because it was already installed and already trusted. Land it: your AI tools are part of your attack surface now.",

      "02:17 · STORY FIVE - PROMPT INJECTION. Demo live if you possibly can; it lands ten times harder than describing it. The point: anything your agent reads is potentially something your agent obeys.",

      "02:19 · THE GUARDRAILS. This is the practical payoff of all five stories. Slow down, read them out, and tell them to photograph it. Leave it on screen longer than feels comfortable.",

      "02:17–02:22 · ACTIVITY G - ALLOW OR DENY (5 min). Thumbs up or down, vote FIRST then reveal. Fast, no dwelling. The last scenario is the important one - the instruction came from a GitHub issue, which ties straight back to story five.",

      "02:22 · SECTION 07 - GAMES (26 min). Energy payoff before the close. They now have an agent, an MCP server and a skill - this is where they find out what that combination feels like.",

      "02:22 · GAME 1 - PROMPT GOLF (6 min). Fewest characters that still work. Read the best three out loud. Reliably the biggest laugh of the day, and it teaches that specificity beats length.",

      "02:28 · GAME 2 - BUILD IN TEN (14 min: 10 build, 4 demo). Teams of three, one laptop. ANNOUNCE THE JUDGING CRITERIA UP FRONT - that's what makes them actually try. Two or three teams demo on the projector. Prize: a shoutout on your channel costs nothing and they want it more than stickers.",

      "02:42 · GAME 3 - RAPID FIRE (6 min). Eight questions, hands up, first correct answer scores. Loud and fast, do not dwell. This is a disguised recap of everything you taught - that's why it's last.",

      "02:48 · MONDAY MORNING. In this order. The whole list is about ninety minutes of work - say that, because it makes it feel doable rather than aspirational.",

      "02:51 · THE 30 DAYS. Keep it quick. The point is that week four is the only one that matters: one real feature, shipped, reviewed line by line.",

      "02:54 · THE CLOSING LINE. Say it slowly. Then STOP TALKING and let it sit for three full seconds before you move. Do not add anything after it - no “so anyway”, no “that's my talk”. Silence, then the next slide.",

      "02:55 · THANK YOU + Q&A (6–8 min). QR codes up and leave them up for the whole Q&A. Have three of your own questions ready in case nobody starts, and plant one with a floor helper - the first question is always the hardest to get, after that they flow."
    ];

    this.init();
  }

  init() {
    this.buildOverviewGrid();
    this.bindEvents();
    this.fitDeck();
    window.addEventListener('resize', () => this.fitDeck());
    this.handleHashNavigation();
    this.goToSlide(this.currentIndex, true);
    this.startTimer();
  }

  /** Scale the fixed 1280×720 stage to fit inside the window, keeping
   *  breathing room on every side so it never fills the browser. */
  fitDeck() {
    if (!this.stage) return;
    const W = 1280, H = 720;
    const padX = Math.max(32, window.innerWidth * 0.06);
    const padY = Math.max(32, window.innerHeight * 0.08);
    const scale = Math.min(
      (window.innerWidth - padX * 2) / W,
      (window.innerHeight - padY * 2) / H
    );
    this.stage.style.transform = `scale(${scale})`;
  }

  bindEvents() {
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));

    document.getElementById('prevBtn')?.addEventListener('click', () => this.prev());
    document.getElementById('nextBtn')?.addEventListener('click', () => this.next());
    document.getElementById('overviewBtn')?.addEventListener('click', () => this.toggleOverview());
    document.getElementById('notesBtn')?.addEventListener('click', () => this.toggleNotes());
    document.getElementById('fullscreenBtn')?.addEventListener('click', () => this.toggleFullscreen());
    document.getElementById('themeBtn')?.addEventListener('click', () => this.toggleTheme());
    document.getElementById('helpBtn')?.addEventListener('click', () => this.toggleShortcuts());
    document.getElementById('closeOverview')?.addEventListener('click', () => this.toggleOverview(false));
    document.getElementById('closeShortcuts')?.addEventListener('click', () => this.toggleShortcuts(false));
    this.dockTimer?.addEventListener('click', () => this.resetTimer());

    window.addEventListener('hashchange', () => this.handleHashNavigation());

    // Touch Swipe Gestures
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    document.addEventListener('touchend', (e) => {
      this.handleSwipe(touchStartX, e.changedTouches[0].screenX);
    }, false);
  }

  handleSwipe(startX, endX) {
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) this.next();
      else this.prev();
    }
  }

  handleKeyDown(e) {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        this.next();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        this.prev();
        break;
      case 'Home':
        e.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        this.goToSlide(this.totalSlides - 1);
        break;
      case 'o':
      case 'O':
        this.toggleOverview();
        break;
      case 'n':
      case 'N':
        this.toggleNotes();
        break;
      case 'f':
      case 'F':
        this.toggleFullscreen();
        break;
      case 'b':
      case 'B':
        this.toggleBlackout();
        break;
      case 'r':
      case 'R':
        this.resetTimer();
        break;
      case '?':
      case 'h':
      case 'H':
        this.toggleShortcuts();
        break;
      case 't':
      case 'T':
        this.toggleTheme();
        break;
      case 'Escape':
        this.closeAllModals();
        break;
    }
  }

  next() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  }

  goToSlide(targetIndex, force = false) {
    if (targetIndex < 0 || targetIndex >= this.totalSlides) return;
    if (targetIndex === this.currentIndex && !force) return;

    const performUpdate = () => {
      this.slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === targetIndex);
      });
      this.currentIndex = targetIndex;
      this.updateUI();
    };

    if (document.startViewTransition && !force) {
      document.startViewTransition(performUpdate);
    } else {
      performUpdate();
    }
  }

  updateUI() {
    const currentFormatted = String(this.currentIndex + 1).padStart(2, '0');
    const totalFormatted = String(this.totalSlides).padStart(2, '0');
    if (this.counterEl) {
      this.counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;
    }

    if (this.progressEl) {
      const pct = this.totalSlides > 1
        ? (this.currentIndex / (this.totalSlides - 1)) * 100
        : 100;
      const rounded = Math.round(pct);
      const fill = this.progressEl.querySelector('.deck-progress-fill');
      const pctEl = this.progressEl.querySelector('.deck-progress-pct');
      if (fill) fill.style.strokeDashoffset = String(125.66 - (pct / 100) * 125.66);
      if (pctEl) pctEl.textContent = `${rounded}%`;
    }

    window.location.hash = `slide-${this.currentIndex + 1}`;

    if (this.notesContent) {
      this.notesContent.textContent = this.speakerNotes[this.currentIndex] || 'No notes for this slide.';
    }

    const cards = this.overviewGrid?.querySelectorAll('.overview-card') || [];
    cards.forEach((card, index) => {
      card.classList.toggle('current', index === this.currentIndex);
    });
  }

  handleHashNavigation() {
    const hash = window.location.hash;
    if (hash.startsWith('#slide-')) {
      const slideNum = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= this.totalSlides) {
        this.goToSlide(slideNum - 1);
      }
    }
  }

  buildOverviewGrid() {
    if (!this.overviewGrid) return;
    this.overviewGrid.innerHTML = '';

    this.slides.forEach((slide, index) => {
      const titleEl = slide.querySelector('.slide-title');
      const titleText = titleEl ? titleEl.textContent.trim() : `Slide ${index + 1}`;
      const cueEl = slide.querySelector('.time-cue');
      const cueText = cueEl ? cueEl.textContent.trim() : '';

      const card = document.createElement('div');
      card.className = `overview-card ${index === this.currentIndex ? 'current' : ''}`;

      const num = document.createElement('span');
      num.className = 'card-num';
      num.textContent = `${String(index + 1).padStart(2, '0')}${cueText ? '  ·  ' + cueText : ''}`;

      const title = document.createElement('span');
      title.className = 'card-title';
      title.textContent = titleText;

      card.append(num, title);
      card.addEventListener('click', () => {
        this.goToSlide(index);
        this.toggleOverview(false);
      });
      this.overviewGrid.appendChild(card);
    });
  }

  toggleOverview(show = null) {
    const shouldShow = show !== null ? show : !this.overviewModal.classList.contains('active');
    this.overviewModal.classList.toggle('active', shouldShow);
  }

  toggleNotes(show = null) {
    const shouldShow = show !== null ? show : !this.notesModal.classList.contains('active');
    this.notesModal.classList.toggle('active', shouldShow);
  }

  toggleShortcuts(show = null) {
    const shouldShow = show !== null ? show : !this.shortcutsModal.classList.contains('active');
    this.shortcutsModal.classList.toggle('active', shouldShow);
  }

  toggleBlackout(show = null) {
    const shouldShow = show !== null ? show : !this.blackoutScreen.classList.contains('active');
    this.blackoutScreen.classList.toggle('active', shouldShow);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Could not enter fullscreen: ${err.message}`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
  }

  closeAllModals() {
    this.toggleOverview(false);
    this.toggleShortcuts(false);
    this.toggleBlackout(false);
  }

  /** Elapsed session time, shown in the dock and the notes panel. */
  startTimer() {
    this.startTime = Date.now();
    this.renderTimer();
    this.timerInterval = setInterval(() => this.renderTimer(), 1000);
  }

  resetTimer() {
    this.startTime = Date.now();
    this.renderTimer();
  }

  renderTimer() {
    const elapsedSec = Math.floor((Date.now() - this.startTime) / 1000);
    const minutes = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
    const seconds = String(elapsedSec % 60).padStart(2, '0');
    const label = `${minutes}:${seconds}`;

    if (this.notesTimer) this.notesTimer.textContent = label;
    if (this.dockTimer) {
      this.dockTimer.textContent = label;
      this.dockTimer.classList.toggle('over', elapsedSec > this.sessionLengthSec);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.presentation = new PresentationController();
});

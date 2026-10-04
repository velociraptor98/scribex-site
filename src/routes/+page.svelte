<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import AppWindow from "$lib/components/AppWindow.svelte";
  import PaletteDemo from "$lib/components/PaletteDemo.svelte";
  import MarksDemo from "$lib/components/MarksDemo.svelte";
  import { DOWNLOAD, REPO, REQUIREMENTS } from "$lib/site";

  const FEATURES = [
    {
      title: "Live preview",
      body: "The PDF updates a moment after you stop typing.",
    },
    {
      title: "Autosave",
      body: "Your file is saved every 10 seconds. The title bar shows when it happens.",
    },
    {
      title: "Nothing else to install",
      body: "The LaTeX engine, Tectonic, is built into the app. You don't need TeX Live.",
    },
    {
      title: "Outline",
      body: "Your sections are listed on the left. Click one to jump to it.",
    },
    {
      title: "Export",
      body: "Save a PDF in Letter, A4 or A5, with the .tex file alongside if you want it.",
    },
    {
      title: "Templates",
      body: "Start from an article, a letter, a thesis or Beamer slides.",
    },
  ];

  const SHORTCUTS: [string, string][] = [
    ["⌘K", "Commands and snippets"],
    ["⌘S", "Save"],
    ["⇧⌘S", "Save as"],
    ["⌘E", "Export as PDF"],
    ["⌘R", "Build now"],
    ["⌘O", "Open"],
    ["⌘N", "New document"],
    ["⌘B", "Bold"],
    ["⌘I", "Emphasis"],
  ];
</script>

<svelte:head>
  <title>ScribeX — a LaTeX editor for Mac</title>
  <meta
    name="description"
    content="A native LaTeX editor for Mac, written in Swift. See the PDF as you type. Works offline, with nothing else to install."
  />
  <meta property="og:title" content="ScribeX — a LaTeX editor for Mac" />
  <meta property="og:description" content="Write LaTeX and see the PDF as you type." />
  <meta property="og:type" content="website" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

<header class="nav">
  <div class="wrap nav-inner">
    <a href="/" class="home" aria-label="ScribeX home"><Logo /></a>
    <nav class="links" aria-label="Sections">
      <a href="#features">Features</a>
      <a href="#issues">Errors</a>
      <a href="#offline">Offline</a>
      <a href="#shortcuts">Shortcuts</a>
    </nav>
    <a class="btn btn-sm btn-primary" href="#download">Download</a>
  </div>
</header>

<main id="main">
  <section class="hero">
    <div class="wrap">
      <p class="rubric eyebrow">A native LaTeX editor for Mac</p>
      <h1>Write LaTeX.<br />See the <em>PDF</em>.</h1>
      <hr class="gilt-rule" />
      <p class="lede">
        ScribeX shows your document next to its source and updates it as you
        type. It's a native Mac app, written in Swift, with a typesetting
        engine in Rust. It works offline, and there's nothing else to install.
      </p>
      <div class="cta">
        <a class="btn btn-primary" href={DOWNLOAD}>Download for macOS</a>
        <a class="btn" href={REPO}>View on GitHub</a>
      </div>
      <p class="req">{REQUIREMENTS}</p>

      <div class="shot">
        <AppWindow />
      </div>
    </div>
  </section>

  <section class="section" id="features">
    <div class="wrap">
      <p class="rubric eyebrow">Features</p>
      <h2 class="h2">Everything in one window</h2>
      <div class="features">
        {#each FEATURES as f}
          <article class="feature">
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="section" id="palette">
    <div class="wrap">
      <div class="split-head">
        <div>
          <p class="rubric eyebrow">⌘K</p>
          <h2 class="h2">Type what you <em>want</em></h2>
        </div>
        <p class="lede">
          Can't remember the syntax? Press ⌘K and ask for “a 3 by 4 table” or
          “aligned equations”, and ScribeX writes the LaTeX for you. Try it here.
        </p>
      </div>
      <PaletteDemo />
    </div>
  </section>

  <section class="section" id="issues">
    <div class="wrap">
      <div class="split-head">
        <div>
          <p class="rubric eyebrow">Issues</p>
          <h2 class="h2">Errors in plain <em>English</em></h2>
        </div>
        <p class="lede">
          When something breaks, ScribeX tells you what went wrong and on which
          line. Many problems have a one-click fix. Your preview stays put while
          you work on it.
        </p>
      </div>
      <MarksDemo />
    </div>
  </section>

  <section class="section" id="offline">
    <div class="wrap offline">
      <div>
        <p class="rubric eyebrow">Offline</p>
        <h2 class="h2">Works <em>offline</em></h2>
        <p class="lede">
          ScribeX builds your documents on your Mac. It needs the internet once,
          to download LaTeX packages and fonts. After that it works offline.
        </p>
      </div>

      <ol class="steps">
        <li>
          <span class="step-n tnum">1</span>
          <div>
            <h3>Download once</h3>
            <p>
              The first time you open ScribeX, click
              <strong>Download now</strong>. It fetches about 45 MB and takes a
              minute or two. Every template works offline after that.
            </p>
            <div class="setup" aria-hidden="true">
              <span class="setup-head">Downloading the LaTeX essentials</span>
              <span class="setup-file"><code>amsmath.sty</code> · 212 of about 440 files</span>
              <span class="setup-bar"><span class="setup-fill"></span></span>
            </div>
          </div>
        </li>
        <li>
          <span class="step-n tnum">2</span>
          <div>
            <h3>Offline by default</h3>
            <p>
              <span class="lamp"><span class="lamp-dot"></span>Offline</span>
              in the title bar means ScribeX won't use the internet. Click it to
              allow downloads.
            </p>
          </div>
        </li>
        <li>
          <span class="step-n tnum">3</span>
          <div>
            <h3>More packages when you need them</h3>
            <p>
              If a document uses a package you don't have yet, ScribeX tells you
              which one and can download it. The title bar shows it coming in.
            </p>
            <div class="banner">
              <span><code>tikz.sty</code> is not in the offline cache.</span>
              <span class="btn btn-sm btn-primary">Fetch it</span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section class="section" id="shortcuts">
    <div class="wrap">
      <p class="rubric eyebrow">Shortcuts</p>
      <h2 class="h2">Keyboard <em>shortcuts</em></h2>
      <dl class="keys">
        {#each SHORTCUTS as [key, label]}
          <div class="key-row">
            <dt><kbd class="key">{key}</kbd></dt>
            <dd>{label}</dd>
          </div>
        {/each}
      </dl>
    </div>
  </section>

  <section class="section download" id="download">
    <div class="wrap download-inner">
      <img src="/app-icon.svg" alt="" width="148" height="148" class="app-icon" />
      <h2 class="h2">Download ScribeX</h2>
      <p class="lede">
        About 25 MB. The first time you open it, it downloads about 45 MB more
        for LaTeX.
      </p>
      <div class="cta">
        <a class="btn btn-primary" href={DOWNLOAD}>Download for macOS</a>
        <a class="btn" href="{REPO}#building">Build from source</a>
      </div>
      <p class="req">{REQUIREMENTS}</p>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="wrap footer-inner">
    <Logo small />
    <p>
      Built in <a href="https://www.swift.org/">Swift</a> and
      <a href="https://www.rust-lang.org/">Rust</a>, with
      <a href="https://tectonic-typesetting.github.io/">Tectonic</a>,
      <a href="https://github.com/krzyzanowskim/STTextView">STTextView</a> and
      <a href="https://developer.apple.com/documentation/pdfkit">PDFKit</a>.
    </p>
    <p class="copy">© 2026 Kunal Singh · <a href={REPO}>GitHub</a></p>
  </div>
</footer>

<style>
  .skip {
    position: absolute;
    left: 12px;
    top: -48px;
    padding: 8px 14px;
    background: var(--ink-panel);
    border: 1px solid var(--accent);
    z-index: 20;
  }
  .skip:focus { top: 12px; }

  /* ── nav ── */
  .nav {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(28, 27, 25, 0.86);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--rule);
  }
  .nav-inner { display: flex; align-items: center; gap: 28px; height: 60px; }
  .home { text-decoration: none; }
  .links { display: flex; gap: 26px; margin-left: auto; }
  .links a {
    font: 400 11px var(--font-body);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-55);
    text-decoration: none;
  }
  .links a:hover { color: var(--accent-300); }

  /* ── hero ── */
  .hero { padding: clamp(64px, 10vw, 112px) 0 clamp(72px, 10vw, 120px); overflow: hidden; }
  h1 {
    margin: 0;
    font: 300 clamp(44px, 7.4vw, 88px)/1.02 var(--font-heading);
    letter-spacing: -0.02em;
    color: var(--text);
  }
  h1 em { font-style: italic; color: var(--accent-400); }
  .cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }
  .req { margin: 16px 0 0; font: italic 400 13px var(--font-body); color: var(--text-42); }
  .shot { margin-top: clamp(48px, 7vw, 80px); position: relative; isolation: isolate; }
  .shot::before {
    z-index: -1;
    content: "";
    position: absolute;
    inset: -12% -6% auto;
    height: 70%;
    background: radial-gradient(ellipse at center, rgba(194, 141, 65, 0.13), transparent 65%);
    pointer-events: none;
  }

  /* ── features ── */
  .features {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 56px;
    border-top: 1px solid var(--rule);
  }
  .feature {
    padding: 30px 30px 34px 0;
    border-bottom: 1px solid var(--rule);
  }
  .feature:not(:nth-child(3n + 1)) { padding-left: 30px; border-left: 1px solid var(--rule); }
  .feature h3 { margin: 0 0 10px; font: 600 22px/1.2 var(--font-heading); color: var(--text); }
  .feature p { margin: 0; font-size: 15px; color: var(--text-55); }

  /* ── split section heads ── */
  .split-head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 40px;
    align-items: end;
    margin-bottom: 48px;
  }
  .split-head .lede { margin: 0; }

  /* ── offline ── */
  .offline {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    gap: clamp(40px, 6vw, 80px);
    align-items: start;
  }
  .steps { list-style: none; margin: 0; padding: 0; }
  .steps li {
    display: flex;
    gap: 20px;
    padding: 24px 0;
    border-top: 1px solid rgba(194, 141, 65, 0.35);
  }
  .steps li:last-child { border-bottom: 1px solid var(--rule); }
  .step-n {
    font: 300 30px/1 var(--font-heading);
    font-variant-numeric: lining-nums;
    color: var(--accent);
    width: 22px;
    flex: none;
  }
  .steps h3 { margin: 0 0 6px; font: 600 20px/1.2 var(--font-heading); }
  .steps p { margin: 0; font-size: 15px; color: var(--text-55); }
  .steps strong { font-weight: 500; color: var(--text); }
  .lamp { color: var(--text-70); white-space: nowrap; }
  .lamp-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-right: 6px;
    border-radius: 50%;
    background: var(--accent);
    vertical-align: 0.2em;
  }
  .banner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    padding: 10px 16px;
    background: var(--accent-wash);
    border: 1px solid var(--accent-edge);
    border-radius: var(--radius-md);
    font-size: 13.5px;
    color: var(--text-70);
  }
  .banner code { font-family: var(--font-mono); color: var(--accent-300); }
  .banner .btn { cursor: default; }
  .setup {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 16px;
    padding: 12px 16px 14px;
    background: var(--accent-wash);
    border: 1px solid var(--accent-edge);
    border-radius: var(--radius-md);
    font-size: 13.5px;
  }
  .setup-head { color: var(--accent-300); }
  .setup-file { color: var(--text-55); }
  .setup-file code { font-family: var(--font-mono); color: var(--accent-300); }
  .setup-bar { display: block; height: 3px; margin-top: 4px; background: var(--rule); }
  .setup-fill { display: block; height: 100%; width: 48%; background: var(--accent); }

  /* ── shortcuts ── */
  .keys {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 40px;
    margin: 48px 0 0;
  }
  .key-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 0;
    border-top: 1px solid var(--rule-soft);
  }
  .key-row dt { width: 58px; flex: none; }
  .key-row dd { margin: 0; font-size: 15px; color: var(--text-70); }

  /* ── download ── */
  .download { background: radial-gradient(70% 55% at 50% 0%, rgba(194, 141, 65, 0.08), rgba(194, 141, 65, 0) 100%); }
  .download-inner { display: flex; flex-direction: column; align-items: center; text-align: center; }
  .app-icon { width: 148px; height: 148px; margin-bottom: 28px; filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.55)); }
  .download .lede { margin-left: auto; margin-right: auto; }
  .download .cta { justify-content: center; }

  /* ── footer ── */
  .footer { border-top: 1px solid var(--rule); background: var(--ink-deep); }
  .footer-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 32px;
    padding-top: 32px;
    padding-bottom: 32px;
    font-size: 13px;
    color: var(--text-42);
  }
  .footer p { margin: 0; }
  .footer a { color: var(--text-55); text-underline-offset: 3px; }
  .footer a:hover { color: var(--accent-300); }
  .copy { margin-left: auto !important; }

  @media (max-width: 900px) {
    .features { grid-template-columns: 1fr 1fr; }
    .feature:not(:nth-child(3n + 1)) { padding-left: 0; border-left: 0; }
    .feature:nth-child(even) { padding-left: 24px; border-left: 1px solid var(--rule); }
    .split-head, .offline { grid-template-columns: 1fr; gap: 20px; }
    .keys { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .links { display: none; }
    .nav-inner { justify-content: space-between; }
    .features { grid-template-columns: 1fr; }
    .feature:nth-child(even) { padding-left: 0; border-left: 0; }
    .feature { padding-right: 0; }
    .keys { grid-template-columns: 1fr; }
    .copy { margin-left: 0 !important; }
  }
</style>

<script lang="ts">
  /** The editor screen, rebuilt from the app's own layout and tokens. */

  const SOURCE = [
    "\\documentclass[a4paper]{article}",
    "\\usepackage{amsmath}",
    "\\title{Notes on Heat Flow}",
    "\\author{A. Author}",
    "\\begin{document}",
    "\\maketitle",
    "",
    "\\section{Introduction}",
    "The temperature $u(x,t)$ in a thin rod obeys",
    "\\begin{equation}",
    "  \\frac{\\partial u}{\\partial t} = \\alpha \\frac{\\partial^2 u}{\\partial x^2}",
    "\\end{equation}",
    "as Fourier showed~\\cite{fourier1822}.",
    "",
    "\\section{Separation of variables}",
    "Assume $u = X(x)\\,T(t)$ and divide through.",
  ];

  const CONTENTS = ["Introduction", "Separation of variables", "Boundary conditions"];

  type Tok = { t: string; k: "cmd" | "brace" | "math" | "text" };

  /** Enough of the app's highlight style to read as LaTeX at a glance. */
  function tokens(line: string): Tok[] {
    return line
      .split(/(\\[a-zA-Z]+|[{}[\]]|\$[^$]*\$)/)
      .filter(Boolean)
      .map((t) => ({
        t,
        k: t.startsWith("\\") ? "cmd" : /^[{}[\]]$/.test(t) ? "brace" : t.startsWith("$") ? "math" : "text",
      }));
  }
</script>

<figure class="window" aria-label="The ScribeX editor: contents, LaTeX source, and the typeset page side by side">
  <div class="titlebar">
    <span class="lights" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="name">heat-flow.tex</span>
    <span class="lamp"><span class="lamp-dot"></span>Offline</span>
  </div>

  <div class="spread">
    <nav class="contents" aria-hidden="true">
      <div class="rubric">Contents</div>
      {#each CONTENTS as title, i}
        <div class="contents-item" class:is-on={i === 0}>
          <span class="num tnum">{i + 1}</span><span class="entry">{title}</span>
        </div>
      {/each}
      <hr class="hairline" />
      <div class="tally">3 sections · 1 equation<br />1 citation</div>
      <div class="foot"><span class="dot"></span>Saved</div>
    </nav>

    <div class="source" aria-hidden="true">
      {#each SOURCE as line, i}
        <div class="line">
          <span class="ln tnum">{i + 1}</span>
          <code>{#each tokens(line) as tok}<span class={tok.k}>{tok.t}</span>{/each}{#if i === SOURCE.length - 1}<span class="caret"></span>{/if}</code>
        </div>
      {/each}
    </div>

    <div class="fold"></div>

    <div class="recto">
      <div class="tabs">
        <span class="tab is-on">Proof</span>
        <span class="tab">Marks</span>
        <span class="btn btn-sm export">Export PDF</span>
      </div>

      <div class="well">
        <article class="page plate">
          <h3 class="doc-title">Notes on Heat Flow</h3>
          <p class="doc-author">A. Author</p>
          <h4 class="doc-section"><span>1</span>Introduction</h4>
          <p>The temperature <i>u</i>(<i>x</i>, <i>t</i>) in a thin rod obeys</p>
          <div class="eq">
            <span class="frac"><span><i>∂u</i></span><span><i>∂t</i></span></span>
            <span>=</span>
            <i>α</i>
            <span class="frac"><span><i>∂</i><sup>2</sup><i>u</i></span><span><i>∂x</i><sup>2</sup></span></span>
            <span class="eqno">(1)</span>
          </div>
          <p>as Fourier showed [1].</p>
          <h4 class="doc-section"><span>2</span>Separation of variables</h4>
          <p>Assume <i>u</i> = <i>X</i>(<i>x</i>) <i>T</i>(<i>t</i>) and divide through.</p>
        </article>
      </div>

      <div class="recto-foot tnum">
        <span>Page 1 of 2 · 130%</span>
        <span>Set in 684 ms</span>
      </div>
    </div>
  </div>

  <div class="presslog">
    <span class="rubric">Press log</span>
    <span class="meta tnum">Tectonic · 0.68 s ▸</span>
  </div>
</figure>

<style>
  .window {
    margin: 0;
    border: 1px solid var(--rule-strong);
    border-radius: 10px;
    overflow: hidden;
    background: var(--ink);
    box-shadow: var(--shadow-lg), 0 0 0 1px rgba(0, 0, 0, 0.4);
    font-size: 13px;
    line-height: 1.5;
    user-select: none;
  }

  .titlebar {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    background: var(--ink-raised);
    border-bottom: 1px solid var(--rule);
  }
  .lights { display: flex; gap: 8px; width: 66px; }
  .lights i { width: 12px; height: 12px; border-radius: 50%; background: #ff5f57; }
  .lights i:nth-child(2) { background: #febc2e; }
  .lights i:nth-child(3) { background: #28c840; }
  .name {
    flex: 1;
    text-align: center;
    font: 400 12.5px var(--font-heading);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-55);
  }
  .lamp {
    min-width: 66px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 7px;
    font: 400 11px var(--font-body);
    color: var(--text-42);
  }
  .lamp-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }

  .spread { display: flex; height: 520px; }

  .contents {
    width: 186px;
    flex: none;
    padding: 26px 20px;
    border-right: 1px solid rgba(236, 231, 223, 0.1);
    display: flex;
    flex-direction: column;
  }
  .contents > .rubric { margin-bottom: 18px; font-size: 10.5px; letter-spacing: 0.18em; }
  .contents-item {
    display: flex;
    gap: 12px;
    padding: 7px 9px;
    margin: 0 -9px;
    border-left: 2px solid transparent;
    font: 400 13.5px var(--font-body);
    color: var(--text-70);
  }
  .entry { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .contents-item.is-on { border-left-color: var(--accent); background: var(--accent-wash-soft); color: var(--text); }
  .num { color: var(--text-38); }
  .is-on .num { color: var(--accent); }
  .contents .hairline { margin: 22px 0; }
  .tally { font: 400 11.5px/1.7 var(--font-body); color: var(--text-42); }
  .foot {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 9px;
    padding-top: 16px;
    border-top: 1px solid rgba(236, 231, 223, 0.1);
    font: 400 11.5px var(--font-body);
    color: var(--text-42);
  }
  .dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(236, 231, 223, 0.28); }

  .source {
    flex: 1 1 0;
    min-width: 0;
    background: var(--ink-editor);
    padding: 26px 24px 0 0;
    overflow: hidden;
    font: 400 13px/28px var(--font-mono);
  }
  .line { display: flex; white-space: pre; }
  .ln { width: 46px; flex: none; padding-right: 14px; text-align: right; color: var(--text-24); }
  .line:last-child { background: var(--accent-wash-soft); }
  .line:last-child .ln { color: var(--text-55); }
  code { font: inherit; overflow: hidden; text-overflow: ellipsis; }
  .cmd { color: var(--accent); }
  .brace { color: var(--text-55); }
  .math { color: var(--accent-400); }
  .text { color: var(--text); }
  .caret {
    display: inline-block;
    width: 2px;
    height: 16px;
    margin-left: 1px;
    vertical-align: -3px;
    background: var(--accent);
    animation: blink 1.1s steps(1) infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }

  .fold {
    width: 1px;
    flex: none;
    background: linear-gradient(180deg, transparent, rgba(194, 141, 65, 0.5) 12%, rgba(194, 141, 65, 0.5) 88%, transparent);
  }

  .recto {
    flex: 0 0 44%;
    min-width: 0;
    background: var(--ink-deep);
    display: flex;
    flex-direction: column;
    padding: 0 30px 22px;
  }
  .tabs { display: flex; align-items: center; gap: 20px; padding: 18px 0 14px; }
  .tab {
    font: 400 10.5px var(--font-body);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-38);
    padding-bottom: 5px;
    border-bottom: 1px solid transparent;
  }
  .tab.is-on { color: var(--accent); border-bottom-color: var(--accent); }
  .export { margin-left: auto; font-size: 12.5px; padding: 5px 11px; cursor: default; }

  .well { flex: 1; min-height: 0; overflow: hidden; display: flex; justify-content: center; }

  /* The typeset page. A web stand-in for Computer Modern. */
  .page {
    width: 100%;
    max-width: 420px;
    padding: 34px 38px;
    font: 400 12.5px/1.55 "Latin Modern Roman", "CMU Serif", Georgia, serif;
    text-align: justify;
    hyphens: auto;
  }
  .page p { margin: 0 0 8px; }
  .doc-title { margin: 6px 0 4px; font-size: 21px; font-weight: 400; line-height: 1.2; text-align: center; }
  .doc-author { text-align: center !important; margin-bottom: 20px !important; }
  .doc-section { display: flex; gap: 14px; margin: 16px 0 6px; font-size: 14px; font-weight: 700; line-height: 1.3; }
  .eq { display: flex; align-items: center; justify-content: center; gap: 7px; margin: 10px 0 12px; position: relative; font-size: 13.5px; }
  .frac { display: inline-flex; flex-direction: column; align-items: center; line-height: 1.2; }
  .frac > span:first-child { border-bottom: 1px solid currentColor; padding: 0 2px 1px; }
  .frac > span:last-child { padding-top: 1px; }
  .eqno { position: absolute; right: 0; }
  sup { font-size: 0.7em; }

  .recto-foot {
    display: flex;
    justify-content: space-between;
    padding-top: 14px;
    font: 400 11px var(--font-body);
    color: var(--text-42);
  }

  .presslog {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 11px 26px;
    border-top: 1px solid var(--rule);
    background: var(--ink-raised);
  }
  .presslog .rubric { font-size: 10.5px; letter-spacing: 0.18em; }
  .meta { font: 400 11.5px var(--font-body); color: var(--text-42); }

  @media (max-width: 980px) {
    .contents { display: none; }
  }
  /* On a phone the page is the point: drop the source and keep the proof. */
  @media (max-width: 680px) {
    .spread { height: 440px; }
    .source, .fold { display: none; }
    .recto { flex: 1; padding: 0 16px 16px; }
    .page { padding: 24px 22px; }
    .presslog { padding: 10px 16px; }
  }
</style>

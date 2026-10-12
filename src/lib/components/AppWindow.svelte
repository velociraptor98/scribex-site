<script lang="ts">
  /** A document window, rebuilt from the app's own layout and tokens. */

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
  /** The section the caret is in, which the sidebar keeps selected. */
  const CURRENT = 1;

  type Tok = { t: string; k: "cmd" | "brace" | "text" };

  /** Enough of the app's highlight style to read as LaTeX at a glance. */
  function tokens(line: string): Tok[] {
    return line
      .split(/(\\[a-zA-Z]+|\\[^a-zA-Z]|[{}[\]$])/)
      .filter(Boolean)
      .map((t) => ({
        t,
        k: t.startsWith("\\") || t === "$" ? "cmd" : /^[{}[\]]$/.test(t) ? "brace" : "text",
      }));
  }
</script>

{#snippet lights()}
  <span class="lights"><i></i><i></i><i></i></span>
{/snippet}

<figure class="window" aria-label="A ScribeX document window: the contents, the LaTeX source and the PDF preview side by side">
  <nav class="sidebar" aria-hidden="true">
    <div class="chrome">
      {@render lights()}
      <svg class="icon" viewBox="0 0 16 16"><rect x="1.5" y="3" width="13" height="10" rx="2.5" /><path d="M6 3v10" /></svg>
    </div>
    <div class="rubric">Contents</div>
    {#each CONTENTS as title, i}
      <div class="contents-item" class:is-on={i === CURRENT}>
        <span class="num tnum">{i + 1}</span><span class="entry">{title}</span>
      </div>
    {/each}
    <div class="tally">3 sections · 1 equation<br />1 citation</div>
  </nav>

  <div class="main" aria-hidden="true">
    <div class="toolbar">
      <span class="narrow-lights">{@render lights()}</span>
      <span class="name">heat-flow.tex</span>
      <span class="tools">
        <svg class="icon" viewBox="0 0 16 16"><rect x="1.5" y="3" width="13" height="10" rx="2.5" /><rect class="solid" x="3.5" y="8.8" width="9" height="2.4" rx="0.8" /></svg>
        <svg class="icon" viewBox="0 0 16 16"><rect x="1.5" y="3" width="13" height="10" rx="2.5" /><path d="M10 3v10" /></svg>
      </span>
    </div>

    <div class="columns">
      <div class="source">
        {#each SOURCE as line, i}
          <div class="line">
            <span class="ln tnum">{i + 1}</span>
            <code>{#each tokens(line) as tok}<span class={tok.k}>{tok.t}</span>{/each}{#if i === SOURCE.length - 1}<span class="caret"></span>{/if}</code>
          </div>
        {/each}
      </div>

      <div class="preview">
        <div class="preview-head">
          <span class="rubric">Preview</span>
          <span class="zoom">
            <span class="ctl pair">
              <svg class="icon" viewBox="0 0 16 16"><path d="M4 8h8" /></svg>
              <svg class="icon" viewBox="0 0 16 16"><path d="M4 8h8M8 4v8" /></svg>
            </span>
            <span class="scale tnum">87%</span>
            <span class="ctl is-on">Fit</span>
          </span>
          <span class="ctl">Export PDF…</span>
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

        <div class="issues">
          <svg class="icon chevron" viewBox="0 0 16 16"><path d="M3.5 10 8 5.5l4.5 4.5" /></svg>
          <span class="rubric">No issues</span>
          <span class="status tnum">Built in 684 ms</span>
        </div>
      </div>
    </div>
  </div>
</figure>

<style>
  .window {
    --font-ui: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
    display: flex;
    height: 580px;
    margin: 0;
    border: 1px solid var(--rule-strong);
    border-radius: 14px;
    overflow: hidden;
    background: var(--ink);
    box-shadow: var(--shadow-lg), 0 0 0 1px rgba(0, 0, 0, 0.4);
    font-size: 13px;
    line-height: 1.5;
    user-select: none;
  }

  .icon {
    width: 16px;
    height: 16px;
    flex: none;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .icon .solid { fill: currentColor; stroke: none; }

  .lights { display: flex; gap: 8px; }
  .lights i { width: 12px; height: 12px; border-radius: 50%; background: #ff5f57; }
  .lights i:nth-child(2) { background: #febc2e; }
  .lights i:nth-child(3) { background: #28c840; }

  /* The sidebar floats in the window, as the system draws it. */
  .sidebar {
    width: 190px;
    flex: none;
    margin: 7px 0 7px 7px;
    padding: 0 10px 14px;
    display: flex;
    flex-direction: column;
    background: var(--ink-panel);
    border: 1px solid var(--rule);
    border-radius: 10px;
  }
  .chrome {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 38px;
    padding: 0 4px;
    color: var(--text-42);
  }
  .sidebar > .rubric { padding: 14px 6px 12px; font-size: 10.5px; letter-spacing: 0.16em; color: var(--text-55); }
  .contents-item {
    display: flex;
    gap: 10px;
    padding: 5px 8px;
    border-radius: 6px;
    font: 400 13px var(--font-body);
    color: var(--text);
  }
  .entry { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .contents-item.is-on { background: rgba(236, 231, 223, 0.1); }
  .num { color: var(--text-38); }
  .tally { margin-top: auto; padding: 0 6px; font: 400 11.5px/1.7 var(--font-body); color: var(--text-55); }

  .main { flex: 1; min-width: 0; display: flex; flex-direction: column; }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 16px;
    height: 52px;
    flex: none;
    padding: 0 18px 0 20px;
  }
  .narrow-lights { display: none; }
  .name { font: 700 15px var(--font-ui); color: var(--text); }
  .tools { display: flex; gap: 18px; margin-left: auto; color: var(--text-55); }
  .tools .icon { width: 19px; height: 19px; }

  .columns { flex: 1; min-height: 0; display: flex; }

  .source {
    flex: 1 1 0;
    min-width: 0;
    background: var(--ink-editor);
    padding: 34px 24px 0 0;
    overflow: hidden;
    font: 400 13px/28px var(--font-mono);
  }
  .line { display: flex; white-space: pre; }
  .ln { width: 46px; flex: none; padding-right: 14px; text-align: right; font-size: 11px; color: var(--text-24); }
  .line:last-child { background: var(--accent-wash-soft); }
  .line:last-child .ln { color: var(--text-55); }
  code { font: inherit; overflow: hidden; text-overflow: ellipsis; }
  .cmd { color: var(--accent-400); }
  .brace { color: var(--text-55); }
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

  .preview {
    flex: 0 0 44%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    background: var(--ink-deep);
    border-left: 1px solid rgba(0, 0, 0, 0.6);
    box-shadow: inset 1px 0 var(--rule);
  }
  .preview-head { display: flex; align-items: center; gap: 12px; padding: 12px; }
  .preview-head > .rubric { margin-right: auto; font-size: 10.5px; letter-spacing: 0.16em; color: var(--text-55); }
  .zoom { display: flex; align-items: center; gap: 7px; }
  .ctl {
    display: inline-flex;
    align-items: center;
    height: 20px;
    padding: 0 8px;
    border-radius: 5px;
    background: rgba(236, 231, 223, 0.09);
    font: 500 11px var(--font-ui);
    color: var(--text);
    white-space: nowrap;
  }
  .ctl.is-on { background: rgba(236, 231, 223, 0.2); }
  .pair { gap: 9px; padding: 0 5px; color: var(--text-70); }
  .pair .icon { width: 13px; height: 13px; }
  .pair .icon + .icon { box-sizing: content-box; padding-left: 8px; border-left: 1px solid var(--rule-strong); }
  .scale { font: 400 11px var(--font-ui); color: var(--text-55); }

  .well { flex: 1; min-height: 0; overflow: hidden; display: flex; justify-content: center; padding: 6px 22px 0; }

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

  /* The issues drawer, folded: it opens upward over the pages. */
  .issues {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 34px;
    flex: none;
    padding: 0 16px;
    background: var(--ink);
    border-top: 1px solid var(--rule);
    color: var(--text-70);
  }
  .chevron { width: 11px; height: 11px; stroke-width: 1.8; }
  .issues .rubric { font-size: 10.5px; letter-spacing: 0.16em; color: var(--text-55); }
  .status { margin-left: auto; font: 400 11.5px var(--font-body); color: var(--text-55); }

  @media (max-width: 980px) {
    .sidebar { display: none; }
    .narrow-lights { display: block; }
  }
  /* On a phone the page is the point: drop the source and keep the preview. */
  @media (max-width: 680px) {
    .window { height: 500px; }
    .source { display: none; }
    .preview { flex: 1; border-left: 0; box-shadow: none; }
    .well { padding: 6px 14px 0; }
    .page { padding: 24px 22px; }
  }
</style>

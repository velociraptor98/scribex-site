<script lang="ts">
  /** Two issues as the app writes them (wording from the app's
   *  ScribeXCore/Latex/Issues.swift), in its issues drawer. Applying a fix
   *  edits the source excerpt, as it does in the editor. */

  interface Mark {
    id: string;
    line: number;
    title: string;
    error: boolean;
    detail: string;
    raw: string;
    fix: string;
    before: string;
    after: string;
  }

  const MARKS: Mark[] = [
    {
      id: "cite",
      line: 13,
      title: "No such reference: knuth1894",
      error: false,
      detail: "Nothing in your bibliography matches. ScribeX found knuth1984 in refs.bib.",
      raw: "Citation `knuth1894' on page 1 undefined on input line 13.",
      fix: "Use knuth1984",
      before: "as Knuth showed~\\cite{knuth1894}.",
      after: "as Knuth showed~\\cite{knuth1984}.",
    },
    {
      id: "env",
      line: 12,
      title: "equation opened, align closed",
      error: true,
      detail: "The environment names differ. Match them and the equation will number itself.",
      raw: "\\begin{equation} on input line 10 ended by \\end{align}.",
      fix: "Fix both to equation",
      before: "\\end{align}",
      after: "\\end{equation}",
    },
  ];

  let fixed = $state<string[]>([]);
  let ignored = $state<string[]>([]);
  const open = $derived(MARKS.filter((m) => !fixed.includes(m.id) && !ignored.includes(m.id)));
  const marked = (id?: string) => open.some((m) => m.id === id);

  const summary = $derived(open.length === 0 ? "No issues" : open.length === 1 ? "1 issue" : `${open.length} issues`);
  // Ignoring an error hides it; only fixing it lets the document build.
  const status = $derived(fixed.includes("env") ? "Built in 684 ms" : "Build failed");

  const excerpt = $derived([
    { n: 8, text: "\\section{Results}" },
    { n: 9, text: "Energy and mass are related by" },
    { n: 10, text: "\\begin{equation}" },
    { n: 11, text: "  E = mc^2" },
    { n: 12, text: fixed.includes("env") ? MARKS[1].after : MARKS[1].before, id: "env" },
    { n: 13, text: fixed.includes("cite") ? MARKS[0].after : MARKS[0].before, id: "cite" },
    { n: 14, text: "" },
    { n: 15, text: "\\section{Discussion}" },
    { n: 16, text: "The constant $c$ is the speed of light." },
  ]);

  function reset() {
    fixed = [];
    ignored = [];
  }
</script>

<div class="demo">
  <div class="source" aria-label="Source excerpt">
    {#each excerpt as l}
      <div class="line" class:is-marked={marked(l.id)} class:is-fixed={l.id && fixed.includes(l.id)}>
        <span class="ln tnum">{l.n}</span><code>{l.text}</code>
      </div>
    {/each}
  </div>

  <aside class="drawer" aria-label="Issues">
    <div class="list">
      {#each open as m (m.id)}
        <article class="issue">
          {#if m.error}
            <svg class="sev is-error" viewBox="0 0 16 16" role="img" aria-label="Error"><circle cx="8" cy="8" r="7" /><path d="M8 4.5v4.2M8 11.2v.3" /></svg>
          {:else}
            <svg class="sev" viewBox="0 0 16 16" role="img" aria-label="Warning"><path class="shape" d="M8 2 14.6 13.5H1.4z" /><path d="M8 6.4v3.2M8 11.6v.3" /></svg>
          {/if}
          <div class="body">
            <div class="head">
              <h3 class="title">{m.title}</h3>
              <span class="where tnum">Line {m.line}</span>
            </div>
            <p class="detail">{m.detail}</p>
            <p class="raw">{m.raw}</p>
            <div class="actions">
              <button class="ctl prominent" onclick={() => (fixed = [...fixed, m.id])}>{m.fix}</button>
              <button class="ctl" onclick={() => (ignored = [...ignored, m.id])}>Ignore</button>
            </div>
          </div>
        </article>
      {/each}
      {#if open.length === 0}
        <p class="clean">No issues — the document built cleanly.</p>
      {/if}
    </div>

    <div class="foot">
      <svg class="chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6 8 10.5 12.5 6" /></svg>
      <span class="rubric">{summary}</span>
      {#if fixed.length || ignored.length}<button class="reset" onclick={reset}>Reset</button>{/if}
      <span class="status tnum">{status}</span>
    </div>
  </aside>
</div>

<style>
  .demo {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    border: 1px solid var(--rule-strong);
    border-radius: 12px;
    overflow: hidden;
    background: var(--ink);
  }

  .source {
    background: var(--ink-editor);
    padding: 26px 20px 26px 0;
    font: 400 13px/28px var(--font-mono);
    border-right: 1px solid var(--rule);
    overflow-x: auto;
  }
  .line { display: flex; white-space: pre; transition: background 0.3s; }
  .ln { width: 46px; flex: none; padding-right: 14px; text-align: right; font-size: 11px; color: var(--text-24); }
  code { font: inherit; color: var(--text); }
  .is-marked { background: rgba(217, 129, 104, 0.1); box-shadow: inset 2px 0 var(--mark); }
  .is-marked .ln { color: var(--mark); }
  .is-fixed { background: var(--accent-wash); box-shadow: inset 2px 0 var(--accent); }
  .is-fixed code { color: var(--accent-300); }

  .drawer { display: flex; flex-direction: column; min-width: 0; }
  .list { flex: 1; padding: 16px; }
  .issue { display: flex; gap: 12px; align-items: flex-start; }
  .issue + .issue { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--rule); }
  .sev {
    width: 16px;
    height: 16px;
    margin-top: 3px;
    flex: none;
    fill: var(--accent);
    stroke: var(--ink);
    stroke-width: 1.6;
    stroke-linecap: round;
  }
  .sev.is-error { fill: var(--mark); }
  .sev circle { stroke: none; }
  .sev .shape { stroke: var(--accent); stroke-width: 1.4; stroke-linejoin: round; }
  .body { flex: 1; min-width: 0; }
  .head { display: flex; align-items: baseline; gap: 12px; }
  .title { flex: 1; margin: 0; font: 600 17px/1.25 var(--font-heading); color: var(--text); }
  .where { flex: none; font: 400 11.5px var(--font-body); color: var(--text-55); }
  .detail { margin: 6px 0 0; font: 400 13px/1.6 var(--font-body); color: var(--text-55); }
  .raw { margin: 6px 0 0; font: 400 11px/1.5 var(--font-mono); color: var(--text-38); word-break: break-word; }
  .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
  .ctl {
    height: 22px;
    padding: 0 10px;
    border: 0;
    border-radius: 6px;
    background: rgba(236, 231, 223, 0.1);
    font: 500 11.5px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
    color: var(--text);
    cursor: pointer;
    transition: background 0.15s;
  }
  .ctl:hover { background: rgba(236, 231, 223, 0.17); }
  .ctl.prominent { background: var(--accent); color: var(--ink); }
  .ctl.prominent:hover { background: var(--accent-400); }
  .clean { margin: 0; font: italic 400 13px var(--font-body); color: var(--text-55); }

  /* The drawer's header stays at its foot, as it does under the preview. */
  .foot {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 34px;
    flex: none;
    padding: 0 16px;
    border-top: 1px solid var(--rule);
    color: var(--text-70);
  }
  .chevron {
    width: 11px;
    height: 11px;
    flex: none;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .foot .rubric { font-size: 10.5px; letter-spacing: 0.16em; color: var(--text-55); }
  .status { margin-left: auto; font: 400 11.5px var(--font-body); color: var(--text-55); }
  .reset {
    margin-left: 8px;
    font: 400 12px var(--font-body);
    background: none;
    border: 0;
    padding: 0;
    color: var(--text-55);
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .reset:hover { color: var(--accent-300); }

  @media (max-width: 860px) {
    .demo { grid-template-columns: 1fr; }
    .source { border-right: 0; border-bottom: 1px solid var(--rule); }
  }
</style>

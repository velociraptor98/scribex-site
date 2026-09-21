<script lang="ts">
  /** Two marks as the app writes them (wording from scribex/src/texlog.ts).
   *  Applying a fix edits the source excerpt, as it does in the editor. */

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
  const open = $derived(MARKS.filter((m) => !fixed.includes(m.id)));

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
</script>

<div class="demo">
  <div class="source" aria-label="Source excerpt">
    {#each excerpt as l}
      <div class="line" class:is-marked={l.id && !fixed.includes(l.id)} class:is-fixed={l.id && fixed.includes(l.id)}>
        <span class="ln tnum">{l.n}</span><code>{l.text}</code>
      </div>
    {/each}
  </div>

  <aside class="marks">
    <div class="rubric">Marks on this proof</div>
    {#each open as m (m.id)}
      <article class="mark">
        <span class="mark-line tnum">l. {m.line}</span>
        <div class="body">
          <h3 class="title" class:is-error={m.error}>{m.title}</h3>
          <p class="detail">{m.detail}</p>
          <p class="raw">{m.raw}</p>
          <div class="actions">
            <button class="btn btn-sm btn-primary" onclick={() => (fixed = [...fixed, m.id])}>{m.fix}</button>
          </div>
        </div>
      </article>
    {/each}
    <p class="clean">
      {open.length ? "Everything else set cleanly." : "Everything set cleanly."}
      {#if fixed.length}<button class="reset" onclick={() => (fixed = [])}>Reset</button>{/if}
    </p>
  </aside>
</div>

<style>
  .demo {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    border: 1px solid var(--rule-strong);
    border-radius: 8px;
    overflow: hidden;
    background: var(--ink-deep);
  }

  .source {
    background: var(--ink-editor);
    padding: 26px 20px 26px 0;
    font: 400 13px/28px var(--font-mono);
    border-right: 1px solid var(--rule);
    overflow-x: auto;
  }
  .line { display: flex; white-space: pre; transition: background 0.3s; }
  .ln { width: 46px; flex: none; padding-right: 14px; text-align: right; color: var(--text-24); }
  code { font: inherit; color: var(--text); }
  .is-marked { background: rgba(217, 129, 104, 0.1); box-shadow: inset 2px 0 var(--mark); }
  .is-marked .ln { color: var(--mark); }
  .is-fixed { background: var(--accent-wash); box-shadow: inset 2px 0 var(--accent); }
  .is-fixed code { color: var(--accent-300); }

  .marks { padding: 22px 28px 26px; }
  .marks > .rubric { margin-bottom: 16px; font-size: 10.5px; letter-spacing: 0.18em; }
  .mark {
    display: flex;
    gap: 12px;
    align-items: baseline;
    border-top: 1px solid rgba(194, 141, 65, 0.35);
    padding: 14px 0;
  }
  .mark-line { font: 400 11px var(--font-body); color: var(--accent); flex: none; }
  .body { flex: 1; min-width: 0; }
  .title { margin: 0; font: 600 18px/1.2 var(--font-heading); color: var(--text); }
  .title.is-error::after {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-left: 8px;
    border-radius: 50%;
    background: var(--mark);
    vertical-align: middle;
  }
  .detail { margin: 5px 0 0; font: 400 13px/1.65 var(--font-body); color: rgba(236, 231, 223, 0.6); }
  .raw { margin: 7px 0 0; font: 400 11.5px/1.5 var(--font-mono); color: var(--text-38); word-break: break-word; }
  .actions { margin-top: 11px; }
  .clean {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(236, 231, 223, 0.1);
    padding-top: 12px;
    margin: 0;
    font: italic 400 12.5px var(--font-body);
    color: var(--text-42);
  }
  .reset {
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
    .marks { padding: 20px; }
  }
</style>

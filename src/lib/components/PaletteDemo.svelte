<script lang="ts">
  import { CARET, suggest } from "$lib/commands";

  const TRY = ["a 3 by 4 table", "aligned equations", "figure with a caption", "2 by 2 matrix", "numbered list"];

  let query = $state(TRY[0]);
  let active = $state(0);

  const rows = $derived(query.trim() ? suggest(query, { limit: 5 }) : []);
  const chosen = $derived(rows[Math.min(active, rows.length - 1)]);
  const inserted = $derived(chosen?.text?.replace(CARET, "") ?? "");

  function onkeydown(e: KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(rows.length - 1, active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(0, active - 1); }
  }

  function tryQuery(q: string) {
    query = q;
    active = 0;
  }
</script>

<div class="demo">
  <div class="palette">
    <label class="field">
      <span class="key-glyph">⌘K</span>
      <input
        bind:value={query}
        oninput={() => (active = 0)}
        {onkeydown}
        placeholder="put a 3 by 4 table here"
        spellcheck="false"
        autocomplete="off"
        aria-label="Describe what you want to insert"
      />
      <span class="mode">Plain English</span>
    </label>

    <div class="rows" role="listbox" aria-label="Suggestions">
      {#if rows.length === 0}
        <p class="none">Nothing matches. Try naming what you want — “a bulleted list”, “aligned equations”.</p>
      {/if}
      {#each rows as row, i (row.id)}
        {#if i === 0}<div class="group">Best match</div>{/if}
        {#if i === 1}<div class="group also">Also</div>{/if}
        <button
          class="item"
          class:is-best={i === 0}
          role="option"
          aria-selected={i === active}
          data-active={i === active}
          onclick={() => (active = i)}
          onmousemove={() => (active = i)}
        >
          <span class="main">
            <span class="title">{row.title}</span>
            {#if row.preview}<span class="preview">{row.preview}</span>{/if}
          </span>
          {#if i === 0}<span class="enter">↵</span>{:else if row.hint}<span class="hint">{row.hint}</span>{/if}
        </button>
      {/each}
    </div>

    <div class="foot">↑↓ to choose · ↵ to insert</div>
  </div>

  <div class="side">
    <div class="rubric">Inserts</div>
    <pre class="out">{inserted || " "}</pre>
    <div class="rubric try-label">Try</div>
    <div class="try">
      {#each TRY as q}
        <button class="chip" class:is-on={q === query} onclick={() => tryQuery(q)}>{q}</button>
      {/each}
    </div>
  </div>
</div>

<style>
  .demo {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    gap: 28px;
    align-items: start;
  }

  .palette {
    background: var(--ink-panel);
    border: 1px solid var(--accent-edge);
    border-radius: 6px;
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  }
  .field {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 22px;
    border-bottom: 1px solid rgba(236, 231, 223, 0.14);
    cursor: text;
  }
  .key-glyph { font: 400 13px var(--font-mono); color: var(--accent); }
  input {
    flex: 1;
    min-width: 0;
    font: 400 18px var(--font-body);
    color: var(--text);
    background: none;
    border: 0;
    caret-color: var(--accent);
  }
  input::placeholder { color: var(--text-24); }
  input:focus-visible { outline: none; }
  .field:focus-within { background: rgba(236, 231, 223, 0.02); }
  .mode {
    font: 400 10.5px var(--font-body);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(236, 231, 223, 0.34);
    flex: none;
  }

  .rows { padding: 12px 0 6px; min-height: 250px; }
  .group {
    font: 400 10px var(--font-body);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(236, 231, 223, 0.34);
    padding: 6px 22px;
  }
  .also { padding-top: 14px; border-top: 1px solid var(--rule-soft); margin-top: 8px; }
  .item {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    text-align: left;
    padding: 10px 22px;
    background: none;
    border: 0;
    border-left: 2px solid transparent;
    cursor: pointer;
    font: inherit;
  }
  .item[data-active="true"] { background: var(--accent-wash); border-left-color: var(--accent); }
  .main { flex: 1; min-width: 0; }
  .title { display: block; font: 400 14.5px var(--font-body); color: rgba(236, 231, 223, 0.82); }
  .is-best .title { font-size: 15px; color: var(--text); }
  .preview {
    display: block;
    font: 400 11.5px var(--font-mono);
    color: rgba(236, 231, 223, 0.45);
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .enter {
    font: 400 11px var(--font-mono);
    padding: 3px 7px;
    border: 1px solid rgba(194, 141, 65, 0.5);
    border-radius: 3px;
    color: var(--accent);
  }
  .hint { font: 400 11px var(--font-mono); color: rgba(236, 231, 223, 0.35); }
  .none { margin: 0; padding: 8px 22px; font: italic 400 13px/1.7 var(--font-body); color: var(--text-38); }
  .foot {
    padding: 11px 22px;
    border-top: 1px solid rgba(236, 231, 223, 0.1);
    font: 400 11.5px var(--font-body);
    color: var(--text-38);
  }

  .side { min-width: 0; }
  .out {
    margin: 12px 0 28px;
    padding: 18px 20px;
    min-height: 150px;
    background: var(--ink-editor);
    border: 1px solid var(--rule);
    border-radius: var(--radius-md);
    font: 400 13px/1.75 var(--font-mono);
    color: var(--accent-400);
    overflow-x: auto;
    white-space: pre;
  }
  .try-label { margin-bottom: 12px; }
  .try { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    font: 400 13px var(--font-body);
    padding: 5px 12px;
    background: none;
    border: 1px solid var(--rule-strong);
    border-radius: 999px;
    color: var(--text-55);
    cursor: pointer;
  }
  .chip:hover { color: var(--text); border-color: var(--text-42); }
  .chip.is-on { color: var(--accent-300); border-color: var(--accent-edge); background: var(--accent-wash-soft); }

  @media (max-width: 860px) {
    .demo { grid-template-columns: 1fr; }
    .mode { display: none; }
  }
</style>

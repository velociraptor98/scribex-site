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
    <input
      bind:value={query}
      oninput={() => (active = 0)}
      {onkeydown}
      placeholder="Describe what to insert, or name a command"
      spellcheck="false"
      autocomplete="off"
      aria-label="Describe what you want to insert"
    />

    <div class="rows" role="listbox" aria-label="Suggestions">
      {#if rows.length === 0}
        <p class="none">Nothing matches. Try naming what you want — “a bulleted list”, “aligned equations”.</p>
      {/if}
      {#each rows as row, i (row.id)}
        <button
          class="item"
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
          {#if row.hint}<span class="hint">{row.hint}</span>{/if}
        </button>
      {/each}
    </div>
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

  /* The sheet ⌘K opens over the document window. */
  .palette {
    background: var(--ink);
    border: 1px solid var(--rule-strong);
    border-radius: 14px;
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  }
  input {
    display: block;
    width: 100%;
    padding: 20px;
    font: 400 18px var(--font-body);
    color: var(--text);
    background: none;
    border: 0;
    border-bottom: 1px solid var(--rule);
    caret-color: var(--accent);
  }
  input::placeholder { color: var(--text-38); }
  input:focus-visible { outline: none; }

  .rows { padding: 8px 10px; min-height: 262px; }
  .item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    text-align: left;
    padding: 8px 10px;
    background: none;
    border: 0;
    border-radius: 9px;
    cursor: pointer;
    font: inherit;
  }
  /* A hairline between rows, which the selection covers on both its sides. */
  .item + .item::before {
    content: "";
    position: absolute;
    inset: 0 10px auto;
    height: 1px;
    background: var(--rule-soft);
  }
  .item[data-active="true"]::before,
  .item[data-active="true"] + .item::before { display: none; }
  .item[data-active="true"] { background: rgba(236, 231, 223, 0.13); }
  .main { flex: 1; min-width: 0; }
  .title {
    display: block;
    font: 400 13.5px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
    color: var(--text);
  }
  .preview {
    display: block;
    font: 400 11.5px var(--font-mono);
    color: var(--text-55);
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hint { font: 400 11px var(--font-mono); color: var(--text-38); }
  .none { margin: 0; padding: 12px 10px; font: italic 400 13px/1.7 var(--font-body); color: var(--text-55); }

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
  }
</style>

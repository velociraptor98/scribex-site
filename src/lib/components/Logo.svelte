<script lang="ts">
  /** The crossed-integrals mark and wordmark from the app's welcome screen. */
  // Sized by class rather than an inline style, which the CSP forbids.
  let { small = false }: { small?: boolean } = $props();
</script>

<span class="lockup" class:small>
  <svg class="mark" viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke="var(--accent)" stroke-width="6.5" stroke-linecap="round">
      <path d="M23 33 C23 23 34 24 35 33 C37 47 63 53 65 67 C66 77 77 76 77 67" />
      <path d="M77 33 C77 23 66 24 65 33 C63 47 37 53 35 67 C34 77 23 76 23 67" />
    </g>
  </svg>
  <span class="word">Scribe<span class="x">X</span></span>
</span>

<style>
  .lockup { display: inline-flex; align-items: center; gap: 0.45em; font-size: 22px; }
  .lockup.small { font-size: 16px; }
  .mark { width: 1.6em; height: 1.6em; overflow: visible; flex: none; }
  .word { font: 300 1em/1 var(--font-heading); letter-spacing: -0.01em; color: var(--text); }
  .x { color: var(--accent); }
</style>

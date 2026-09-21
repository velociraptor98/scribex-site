<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
</script>

<svelte:head>
  <title>Page not found — ScribeX</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="wrap missing">
  <a href="/" aria-label="ScribeX home"><Logo /></a>
  <p class="rubric eyebrow">404</p>
  <h1 class="h2">This page isn't <em>here</em></h1>
  <p class="lede">The address may be mistyped, or the page may have moved.</p>
  <a class="btn btn-primary" href="/">Back to ScribeX</a>
</main>

<style>
  .missing {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0;
  }
  .missing > a:first-child { margin-bottom: 64px; text-decoration: none; }
  .missing .btn { margin-top: 34px; }
</style>

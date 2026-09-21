import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    // A single prerendered page: plain HTML, CSS and a little JS for the demo.
    adapter: adapter(),
    // Written into each page as a <meta> policy, with the hash of SvelteKit's
    // inline bootstrap script. Directives a <meta> policy can't carry
    // (frame-ancestors) are sent as headers from netlify.toml.
    csp: {
      mode: "hash",
      directives: {
        "default-src": ["self"],
        "script-src": ["self"],
        "style-src": ["self"],
        "img-src": ["self"],
        "font-src": ["self"],
        "connect-src": ["self"],
        "object-src": ["none"],
        "base-uri": ["self"],
        "form-action": ["self"],
      },
    },
  },
};

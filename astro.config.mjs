// @ts-check
import { defineConfig } from 'astro/config';

// If deploying to username.github.io/REPO_NAME, set base: '/REPO_NAME'.
// If deploying to username.github.io (user/org page), leave base as '/'.
export default defineConfig({
  site: 'https://your-username.github.io',
  // base: '/your-repo-name',
});

import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Static export for itch.io: a single index.html, relative asset paths and
			// hash-based routing, since the game is served from a subfolder inside an iframe.
			adapter: adapter(),
			router: { type: 'hash' }
		})
	],
	server: {
		allowedHosts: ['srizan-laptop.tail26511.ts.net']
	}
});

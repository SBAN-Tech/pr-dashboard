import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { ViteToml } from 'vite-plugin-toml'

export default defineConfig({
	plugins: [
		sveltekit(),
	    ViteToml()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

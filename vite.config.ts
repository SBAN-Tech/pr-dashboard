import { sveltekit } from '@sveltejs/kit/vite';
import { ViteToml } from 'vite-plugin-toml';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		ViteToml()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

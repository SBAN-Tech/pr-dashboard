import { D1Database } from "@cloudflare/workers-types";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
		        DB: D1Database;
				AUTH_SECRET: string;
				AUTH_DISCORD_ID: string;
				AUTH_DISCORD_SECRET: string;
				AUTH_DISCORD_USERS: Array<string>;
				DISCORD_WEBHOOK_URL?: string;
			}
		}
	}
}

export {};

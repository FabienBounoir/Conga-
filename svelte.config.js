import vercel from '@sveltejs/adapter-vercel';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: vercel({
			runtime: 'nodejs18.x' // or 'nodejs20.x'
		})
	}
};

export default config;



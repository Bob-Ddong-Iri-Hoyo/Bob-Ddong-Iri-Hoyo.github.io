// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://bob-ddong-iri-hoyo.github.io',
	integrations: [
		starlight({
			title: {
				ko: '밥똥이리호요',
				en: 'Bob-Ddong-Iri-Hoyo',
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: '한국어',
					lang: 'ko',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
			},
			head: [{ tag: 'script', attrs: { src: '/scripts/locale-router.js', defer: true } }],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Bob-Ddong-Iri-Hoyo/BDIH-Launcher' }],
			sidebar: [
				{
					label: '가이드',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: '예제 가이드', slug: 'guides/example' },
					],
				},
				{
					label: '레퍼런스',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});

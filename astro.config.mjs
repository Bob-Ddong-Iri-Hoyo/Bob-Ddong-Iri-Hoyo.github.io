// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const [githubOwner = 'Bob-Ddong-Iri-Hoyo', githubRepo = 'Bob-Ddong-Iri-Hoyo.github.io'] =
	process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const isRootPagesRepo = githubRepo.toLowerCase() === `${githubOwner.toLowerCase()}.github.io`;
const base = isRootPagesRepo ? '' : `/${githubRepo}`;
const site = `https://${githubOwner.toLowerCase()}.github.io`;

// https://astro.build/config
export default defineConfig({
	site,
	base,
	integrations: [
		starlight({
			title: {
				ko: '밥똥이리호요',
				en: 'Bob-Ddong-Iri-Hoyo',
				'zh-CN': 'Bob-Ddong-Iri-Hoyo',
				ja: 'Bob-Ddong-Iri-Hoyo',
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
				zh: {
					label: '简体中文',
					lang: 'zh-CN',
				},
				ja: {
					label: '日本語',
					lang: 'ja',
				},
			},
			head: [
				{ tag: 'meta', attrs: { name: 'bdih-base-path', content: base } },
				{ tag: 'script', attrs: { src: `${base}/scripts/locale-router.js`, defer: true } },
			],
			social: [
				
				{ icon: 'discord', label: 'Discord', href: 'https://discord.faby.day' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Bob-Ddong-Iri-Hoyo/BDIH-Launcher' },

			],
			sidebar: [
				{
					label: '가이드',
					translations: { en: 'Guides', 'zh-CN': '指南', ja: 'ガイド' },
					items: [
						// Each item here is one entry in the navigation menu.
						// { label: '시작하기', slug: 'guides/example' },
						{ autogenerate: { directory: 'guides' } }
					],
				},
				{
					label: '빌드',
					translations: { en: 'Build', 'zh-CN': '构建', ja: 'ビルド' },
					items: [{ autogenerate: { directory: 'build' } }],
				},
				{
					label: '레퍼런스',
					translations: { en: 'Reference', 'zh-CN': '参考', ja: 'リファレンス' },
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});

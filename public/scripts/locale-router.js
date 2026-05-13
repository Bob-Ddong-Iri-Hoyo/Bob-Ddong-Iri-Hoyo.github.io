(() => {
	const storageKey = 'bdih-preferred-locale';
	const supportedLocales = new Set(['ko', 'en']);

	const getLocaleFromPath = (pathname) => {
		if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
		return 'ko';
	};

	const stripBasePath = (pathname) => {
		const base = document.querySelector('meta[name="bdih-base-path"]')?.content || '';
		if (!base || !pathname.startsWith(`${base}/`)) return pathname;
		return pathname.slice(base.length) || '/';
	};

	const addBasePath = (pathname) => {
		const base = document.querySelector('meta[name="bdih-base-path"]')?.content || '';
		if (!base || pathname.startsWith(`${base}/`)) return pathname;
		return pathname === '/' ? `${base}/` : `${base}${pathname}`;
	};

	const getPathForLocale = (pathname, locale) => {
		pathname = stripBasePath(pathname);
		const cleanPath = pathname === '/en' ? '/' : pathname.replace(/^\/en(?=\/)/, '');

		if (locale === 'en') {
			if (pathname === '/en' || pathname.startsWith('/en/')) return pathname;
			return addBasePath(cleanPath === '/' ? '/en/' : `/en${cleanPath}`);
		}

		return addBasePath(cleanPath || '/');
	};

	const getStoredLocale = () => {
		try {
			const locale = window.localStorage.getItem(storageKey);
			return supportedLocales.has(locale) ? locale : null;
		} catch {
			return null;
		}
	};

	const setStoredLocale = (locale) => {
		if (!supportedLocales.has(locale)) return;
		try {
			window.localStorage.setItem(storageKey, locale);
		} catch {
			// Ignore storage errors in private browsing or locked-down browsers.
		}
	};

	const getBrowserLocale = () => {
		const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
		const prefersEnglish = languages.some((language) => language?.toLowerCase().startsWith('en'));
		return prefersEnglish ? 'en' : 'ko';
	};

	const redirectToLocale = (locale) => {
		const nextPath = getPathForLocale(location.pathname, locale);
		if (nextPath === location.pathname) return;
		location.replace(`${nextPath}${location.search}${location.hash}`);
	};

	document.addEventListener('click', (event) => {
		const link = event.target.closest?.('a[href]');
		if (!link) return;

		const url = new URL(link.href, location.href);
		if (url.origin !== location.origin) return;

		const currentLocale = getLocaleFromPath(location.pathname);
		const nextLocale = getLocaleFromPath(url.pathname);
		if (currentLocale !== nextLocale) setStoredLocale(nextLocale);
	});

	document.addEventListener('change', (event) => {
		const field = event.target;
		if (!(field instanceof HTMLSelectElement)) return;
		if (!field.closest('starlight-lang-select')) return;

		const selectedValue = field.value || field.selectedOptions?.[0]?.value;
		if (!selectedValue) return;

		const url = new URL(selectedValue, location.href);
		if (url.origin === location.origin) setStoredLocale(getLocaleFromPath(stripBasePath(url.pathname)));
	});

	const normalizedPath = stripBasePath(location.pathname);
	const currentLocale = getLocaleFromPath(normalizedPath);
	const storedLocale = getStoredLocale();
	const isExplicitEnglishPath = normalizedPath === '/en' || normalizedPath.startsWith('/en/');

	if (isExplicitEnglishPath) {
		setStoredLocale('en');
		return;
	}

	if (storedLocale) {
		redirectToLocale(storedLocale);
		return;
	}

	const browserLocale = getBrowserLocale();
	if (currentLocale !== browserLocale) {
		redirectToLocale(browserLocale);
	}
})();

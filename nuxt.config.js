const path = require('path');

export default {
	env: {
		oidcClientId: process.env.NODE_ENV !== 'production' ? 'TTDoc.UI' : 'TTDoc.UI-prod',
		serverUrl: 'https://192.168.4.177',
		chatServerUrl: 'https://192.168.4.161:4000'
	},
	loading: {
		color: 'white'
	},
	mode: 'spa',
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || ''
			}
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},
	router: {
		middleware: ['authorization', 'authorization-callback', 'metadata']
	},
	css: [
		{ src: 'devextreme/dist/css/dx.common.css', lang: 'css' },
		{ src: 'devextreme/dist/css/dx.custom-theme.css', lang: 'css' },
		{
			src: 'vue-awesome-notifications/dist/styles/style.scss',
			lang: 'css'
		},
		{ src: '~/assets/themes/index.scss', lang: 'scss' },
		{ src: '~/assets/flaticon/flaticon.css', lang: 'css' }
	],
	styleResources: {
		scss: ['~/assets/themes/variables.base.scss', '~/assets/themes/base-styles.scss']
	},
	plugins: [
		'~/plugins/eventBus',
		'~/plugins/axios',
		'~/plugins/data-api',
		'~/plugins/nuxt-client-init',
		'~plugins/vue-notifications',
		'~/plugins/customStore',
		'~/plugins/customValidator',
		'~/plugins/signalR',
		'~/plugins/popup',
		'~/plugins/notification',
		'~/plugins/cache',
		'~/plugins/socket'
	],
	modules: [
		'@nuxtjs/style-resources',
		'@nuxtjs/axios',
		[
			'nuxt-i18n',
			{
				locales: [
					{
						name: 'Русский',
						code: 'ru',
						iso: 'ru-RU',
						file: 'ru-RU.js'
					},
					{
						name: 'Turkmen',
						code: 'tk',
						iso: 'tk-TM',
						file: 'tk-TM.js'
					}
				],
				detectBrowserLanguage: {
					useCookie: true,
					cookieKey: 'locale',
					alwaysRedirect: true,
					fallbackLocale: 'ru'
				},
				strategy: 'no_prefix',
				lazy: true,
				langDir: 'lang/',
				defaultLocale: 'ru',
				// rootRedirect: '',
				vuex: {
					moduleName: 'i18n',
					syncLocale: true,
					syncMessages: true,
					syncRouteParams: true
				}
			}
		]
	],
	buildModules: [],
	build: {
		extend(config, ctx) {
			(config.resolve.alias['globalize$'] = path.resolve(__dirname, 'node_modules/globalize/dist/globalize.js')),
				(config.resolve.alias['globalize'] = path.resolve(__dirname, 'node_modules/globalize/dist/globalize')),
				(config.resolve.alias['cldr$'] = path.resolve(__dirname, 'node_modules/cldrjs/dist/cldr.js')),
				(config.resolve.alias['cldr'] = path.resolve(__dirname, 'node_modules/cldrjs/dist/cldr'));
		}
	}
};

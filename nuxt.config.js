
export default {
  mode: 'spa',
  router: {
    middleware: 'i18n-middleware'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: 'devextreme/dist/css/dx.common.css', lang: 'css' },
    { src: '~/assets/themes/generated/theme.base.css', lang: 'css' },
    { src: '~/assets/themes/generated/theme.additional.css', lang: 'css' },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/customStore'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      
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
        },
      ],
      detectBrowserLanguage:{
        useCookie:true,
        cookieKey: "locale",
        alwaysRedirect: true,
        fallbackLocale: "ru"
      },
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'ru',
      // rootRedirect: '',
       vuex: {
         moduleName: 'i18n',
         syncLocale: true,
         syncMessages: true,
         syncRouteParams: true
       },


    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

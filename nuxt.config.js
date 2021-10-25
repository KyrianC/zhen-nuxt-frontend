const colors = require("tailwindcss/colors");
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    host: '0' // default: localhost
  },
  head: {
    title: "frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/transitions.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
    middleware: ["checkProfile"]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    // https://color-mode.nuxtjs.org/
    "@nuxtjs/color-mode"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://auth.nuxtjs.org/
    "@nuxtjs/auth-next",
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    "@nuxtjs/toast",
    // https://i18n.nuxtjs.org/
    "nuxt-i18n",
    // https://sitemap.nuxtjs.org/
    "@nuxtjs/sitemap"
  ],

  tailwindcss: {
    config: {
      theme: {
        maxHeight: {
          '3/4': '75%',
        },
        extend: {
          colors: {
            primary: "#111F2D",
            secondary: "#BAD7F2",
            secondaryBackground: "#05121E",
            difficulty1: colors.green,
            difficulty2: colors.lime,
            difficulty3: colors.yellow,
            difficulty4: colors.orange,
            difficulty5: colors.red
          }
        }
      },
      variants: {
        extend: {
          padding: ["hover"],
          borderWidth: ['hover'],
        }
      }
    }
  },

  loading: {
    // continuous: true,
    color: "#BAD7F2",
    height: '3px'
  },

  // toast module
  toast: {
    position: 'top-center',
    duration: 2000
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || "http://localhost:8000/api"
  },

  auth: {
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "access",
          required: true,
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: "/auth/login/", method: "post" },
          logout: { url: "/auth/logout/", method: "post" },
          refresh: { url: '/auth/token/refresh/', method: 'post' },
          user: { url: "/auth/user/", method: "get" }
        }
      }
    }
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};

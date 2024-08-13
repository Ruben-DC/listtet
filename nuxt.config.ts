// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
        '@nuxtjs/google-fonts',
        '@pinia/nuxt',
        'nuxt-icon',
        "@vueuse/nuxt",
        "@pinia-plugin-persistedstate/nuxt"
    ],

	googleFonts: {
		families: {
			Poppins: [400, 700],
			Inter: '100..800',
		},
	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/styles/_colors.scss" as *;',
				},
			},
		},
	},

	css: ['@/assets/styles/index.scss'],
});
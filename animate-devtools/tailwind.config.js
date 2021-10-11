module.exports = {
	purge: ['./src/**/*.{vue,html,js,ts}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {}
	},
	variants: {
		extend: {
			textColor: ['hover']
		}
	},
	plugins: [
		require('@tailwindcss/forms')
	]
};

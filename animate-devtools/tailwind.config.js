module.exports = {
	purge: ['./src/**/*.{ts,vue,html}'],
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

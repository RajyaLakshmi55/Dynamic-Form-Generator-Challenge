// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your source files
  ],
  theme: {
    extend: {
      colors: {
        // Custom dark mode colors
        'dark-background': '#121212', // Dark background for dark mode
        'dark-text': '#e0e0e0', // Light text color in dark mode
        'dark-card': '#1E1E1E', // Dark background for cards or containers
        'light-card': '#F9F9F9', // Light background for cards or containers in light mode
        'primary': '#4CAF50', // Example for primary color
        'secondary': '#FF5722', // Example for secondary color
      },
      boxShadow: {
        'light': '0 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow
        'dark': '0 4px 6px rgba(255, 255, 255, 0.1)', // Dark shadow
      },
      spacing: {
        '18': '4.5rem', // Custom spacing (example)
      },
      fontSize: {
        'xxs': '0.65rem', // Extra extra small text size
      },
    },
  },
  plugins: [],
}

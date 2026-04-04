export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        // Backgrounds
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",

        // Text
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",

        // Borders
        "border-subtle": "var(--border-subtle)",
        "border-default": "var(--border-default)",

        // Primary brand
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-active": "var(--color-primary-active)",

        // Status colours
        success: "var(--status-success)",
        warning: "var(--status-warning)",
        danger: "var(--status-danger)",
        info: "var(--status-info)",
        neutral: "var(--status-neutral)",
      },
    },
  },
  plugins: [],
}
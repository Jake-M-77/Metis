export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        // BACKGROUNDS
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",

        // TEXT
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",

        // BORDERS
        "border-subtle": "var(--border-subtle)",
        "border-default": "var(--border-default)",

        // BUTTON SYSTEM (NEW)
        "btn-default": "var(--btn-default-bg)",
        "btn-default-hover": "var(--btn-default-hover)",
        "btn-default-active": "var(--btn-default-active)",
        "btn-ghost-hover": "var(--btn-ghost-hover)",

        // PRIMARY (SPARING USE)
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-active": "var(--color-primary-active)",

        // STATUS
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
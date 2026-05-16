const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: {
    relative: true,
    files: [
      "./layouts/**/*.{html,xml}",
      "./exampleSite/content/**/*.{md,html}",
      "./assets/**/*.{js,ts,css}",
      "./static/js/**/*.{js,ts}",
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f172a",
          foreground: "#ffffff",
        },
        link: "#3273dc",
      },
      fontFamily: {
        sans: [
          "Noto Sans JP",
          "Noto Sans",
          '"Hiragino Kaku Gothic ProN"',
          "Helvetica",
          "Meiryo",
          "YuGothic",
          "Arial",
          "sans-serif",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.slate.900"),
            "--tw-prose-headings": theme("colors.slate.900"),
            "--tw-prose-links": theme("colors.link"),
            "--tw-prose-bold": theme("colors.slate.900"),
            "--tw-prose-counters": theme("colors.slate.500"),
            "--tw-prose-bullets": theme("colors.slate.400"),
            "--tw-prose-hr": theme("colors.slate.200"),
            "--tw-prose-quotes": theme("colors.slate.900"),
            "--tw-prose-quote-borders": theme("colors.primary.DEFAULT"),
            "--tw-prose-captions": theme("colors.slate.500"),
            "--tw-prose-code": theme("colors.slate.800"),
            "--tw-prose-pre-code": theme("colors.slate.800"),
            "--tw-prose-pre-bg": theme("colors.slate.50"),
            "--tw-prose-th-borders": theme("colors.slate.300"),
            "--tw-prose-td-borders": theme("colors.slate.200"),
            a: {
              textDecoration: "none",
              fontWeight: "600",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            code: {
              borderRadius: "0.25rem",
              padding: "0.125rem 0.25rem",
            },
            blockquote: {
              fontStyle: "italic",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

// theme.js
const base = {
  spacing: { sm: 8, md: 16, lg: 24 },
  radius: { sm: 6, md: 12, lg: 20 },
  fontSizes: { small: 14, medium: 18, large: 24 },
};

const light = {
  ...base,
  colors: {
    background: "#f0f8ff",
    card: "#ffffff",
    primary: "#0077b6",
    danger: "#d90429",
    textDark: "#222",
    textLight: "#666",
  },
};

const dark = {
  ...base,
  colors: {
    background: "#121212",
    card: "#1e1e1e",
    primary: "#90e0ef",
    danger: "#ff4d6d",
    textDark: "#eee",
    textLight: "#aaa",
  },
};

export default { light, dark };

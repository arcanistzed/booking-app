/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  useTabs: true,
  tabWidth: 4,
  arrowParens: "avoid",
};

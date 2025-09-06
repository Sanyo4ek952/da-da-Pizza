module.exports = {
  extends: [
    '@it-incubator/stylelint-config', // базовые правила
    'stylelint-config-recommended-scss', // правила для SCSS
    'stylelint-config-tailwindcss', // правила для Tailwind
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'jsx-a11y/alt-text': 'off',
  },
  ignoreFiles: ['node_modules/**', 'dist/**'],
}

const codeDirs = '{app,entities,features,shared,widgets,ui,src}';

module.exports = {
  '.github/**/*.{yml,yaml}': ['prettier --write'],
  '*.{json,md,mdx,yml,yaml}': ['prettier --write'],

  [`${codeDirs}/**/*.{css,scss}`]: [
    'stylelint --allow-empty-input --fix',
    'prettier --write',
  ],

  [`${codeDirs}/**/*.{js,jsx,ts,tsx}`]: [
    'eslint --fix --max-warnings=0 --no-error-on-unmatched-pattern',
    'prettier --write',
    () => 'pnpm typecheck',
  ],
};

const codeDirs = '{app,entities,features,shared,widgets,ui,src}';

module.exports = {
  // GitHub Actions / YAML
  '.github/**/*.{yml,yaml}': ['prettier --write'],

  // Конфиги/доки по всему репо
  '*.{json,md,mdx,yml,yaml}': ['prettier --write'],

  // Стили (где бы они ни лежали)
  [`${codeDirs}/**/*.{css,scss}`]: [
    'stylelint --allow-empty-input --fix',
    'prettier --write',
  ],

  // JS/TS (все основные папки проекта)
  [`${codeDirs}/**/*.{js,jsx,ts,tsx}`]: [
    // тип-чек один раз на коммит (не по файлам)
    () => 'pnpm typecheck',
    // eslint применится к staged файлам (lint-staged сам подставит список файлов)
    'eslint --fix --max-warnings=0 --no-error-on-unmatched-pattern',
    'prettier --write',
  ],
};

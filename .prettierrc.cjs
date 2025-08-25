// .prettierrc.cjs
module.exports = {
    ...require("@it-incubator/prettier-config"),
    // переопределяем настройки здесь
    semi: false,
    singleQuote: true,
    printWidth: 100,
};
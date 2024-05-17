module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  fix: true,
  cache: false,
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*(__[a-zA-Z0-9]+)?(--[a-zA-Z0-9]+){0,2}$',
      {
        message: (name) => `Expected class selector "${name}" to be camelCase`,
      },
    ],
  },
};

/* Configuration of eslint-plugin-react: https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#configuration-legacy-eslintrc- */
module.exports = {
  react: {
    createClass: 'createReactClass',
    pragma: 'React',
    fragment: 'Fragment',
    version: 'detect',
    flowVersion: '0.53',
  },
  propWrapperFunctions: [
    'forbidExtraProps',
    { property: 'freeze', object: 'Object' },
    { property: 'myFavoriteWrapper' },
    { property: 'forbidExtraProps', exact: true },
  ],
  componentWrapperFunctions: [
    'observer',
    { property: 'styled' },
    { property: 'observer', object: 'Mobx' },
    { property: 'observer', object: '<pragma>' },
  ],
  formComponents: [
    'CustomForm',
    { name: 'SimpleForm', formAttribute: 'endpoint' },
    { name: 'Form', formAttribute: ['registerEndpoint', 'loginEndpoint'] },
  ],
  linkComponents: [
    'Hyperlink',
    { name: 'MyLink', linkAttribute: 'to' },
    { name: 'Link', linkAttribute: ['to', 'href'] },
  ],
};

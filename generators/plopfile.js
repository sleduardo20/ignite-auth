module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'application component logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/index.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/styles.ts',
        templateFile: 'templates/styles.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/stories.tsx',
        templateFile: 'templates/stories.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/tests.spec.tsx',
        templateFile: 'templates/test.hbs',
      },
    ],
  });
};

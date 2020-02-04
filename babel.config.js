const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
    },
  ],
];
const plugins = [
  [
    '@babel/plugin-proposal-pipeline-operator',
    {
      proposal: 'minimal',
    },
  ],
];

module.exports = { presets, plugins };

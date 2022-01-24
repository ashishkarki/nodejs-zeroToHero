module.exports = {
  apps: [
    {
      name: 'nasa-api',
      script: './src/server.js',
      instances: '2',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
    },
  ],
}

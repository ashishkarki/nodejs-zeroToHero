module.exports = {
  apps: [
    {
      name: 'nasa-api',
      script: './src/server.js',
      instances: '1',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
    },
  ],
}

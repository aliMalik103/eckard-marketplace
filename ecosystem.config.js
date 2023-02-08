module.exports = {
  apps : [{
    name: 'demoapp',
    script: 'node_modules/@angular/cli/bin/ng serve',
    args: 'serve --host [127.0.0.1] --disable-host-check',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
  }
};
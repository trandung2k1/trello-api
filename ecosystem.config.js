module.exports = {
    apps: [
        {
            name: 'trello-api',
            script: 'build/server.js',
            instances: 'max',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            exp_backoff_restart_delay: 100,
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy':
                'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
        },
    },
};

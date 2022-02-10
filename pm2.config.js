module.exports = {
  "apps": [
    {
      "name": "dugong-frontend",
      "script": "/app/node_modules/.bin/next start",
      "cwd": "/app",
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "max_memory_restart": "256M",
      "env_production": {
        "NODE_ENV": "production",
      }
    }
  ]
}

module.exports = {
  "apps": [
    {
      "name": "dugong-frontend",
      "script": "/app/node_modules/.bin/next start",
      "cwd": "/app",
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "max_memory_restart": "512M",
      "env_production": {
        "NODE_ENV": "production",
        "NEXT_PUBLIC_DEVELOPMENT_ENV_URL": "http://dugong:8000"
      }
    }
  ]
}

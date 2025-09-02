#!/bin/sh
echo "Injecting runtime environment variables..."

# Gunakan envsubst untuk ganti placeholder di template jadi env asli
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

# Jalankan Nginx
exec "$@"

#!/usr/bin/env sh
set -e

SERVER_CONFIG_PATH="${SERVER_CONFIG_PATH:-/etc/nginx/nginx.conf}";

ROOT_DIR="${ROOT_DIR:-/usr/share/nginx/html}";

sed -i "s#%ROOT_DIR%#${ROOT_DIR}#g" "$SERVER_CONFIG_PATH";

exec "$@";

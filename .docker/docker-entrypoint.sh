#!/bin/sh
set -e

npm run build

npm run start
# npm run dev

exec "$@"

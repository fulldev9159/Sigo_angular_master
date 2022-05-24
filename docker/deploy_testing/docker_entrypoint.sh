#!/bin/sh

set -e
set -v

sed -i -e "s#{{WEBAPI_NAME}}#${WEBAPI_NAME:-mcl-otec-webapi}#g" /etc/nginx/nginx.conf && \
sed -i -e "s#{{WEBAPI_PORT}}#${WEBAPI_PORT:-4040}#g" /etc/nginx/nginx.conf && \
nginx -g 'daemon off;'


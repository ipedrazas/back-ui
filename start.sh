#! /bin/sh

# resolve k8s.env.js
TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
FILE="/usr/share/nginx/html/assets/js/k8s.js"

sed -i -e s/__TOKEN__/$TOKEN/g "$FILE"
sed -i -e s/__API_SERVER__/$KUBERNETES_PORT_443_TCP_ADDR/g "$FILE"

# Start nginx
nginx -g "daemon off;"
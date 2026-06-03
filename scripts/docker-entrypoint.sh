#!/bin/sh
set -e

# Capture runtime UID/GID from environment variables, defaulting to 1000
PUID=${USER_UID:-1000}
PGID=${USER_GID:-1000}

# Adjust the node user's UID/GID if they differ from the runtime request
# and fix volume ownership only when a remap is needed
changed=0

if [ "$(id -u node)" -ne "$PUID" ]; then
    echo "Updating node UID to $PUID"
    usermod -o -u "$PUID" node
    changed=1
fi

if [ "$(id -g node)" -ne "$PGID" ]; then
    echo "Updating node GID to $PGID"
    groupmod -o -g "$PGID" node
    usermod -g "$PGID" node
    changed=1
fi

if [ "$changed" = "1" ]; then
    chown -R node:node /paperclip
fi
# Ensure config directory and allowed hostnames exist
mkdir -p /paperclip/instances/default
if [ ! -f /paperclip/instances/default/config.json ]; then
    echo '{"allowedHostnames":["paperclip-server","localhost","127.0.0.1"]}' > /paperclip/instances/default/config.json
else
    # Add paperclip-server to existing config if not already there
    node -e "
const fs = require('fs');
const cfg = JSON.parse(fs.readFileSync('/paperclip/instances/default/config.json', 'utf8'));
if (!cfg.allowedHostnames) cfg.allowedHostnames = [];
['paperclip-server','localhost','127.0.0.1'].forEach(h => {
    if (!cfg.allowedHostnames.includes(h)) cfg.allowedHostnames.push(h);
});
fs.writeFileSync('/paperclip/instances/default/config.json', JSON.stringify(cfg));
"
fi
exec gosu node "$@"

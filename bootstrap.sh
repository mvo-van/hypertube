#!/bin/bash

function append_if_not_exists() {
    LINE="$1"
    FILE="$2"
    grep -qF "$LINE" "$FILE" || echo "$LINE" >> "$FILE"
}

HOST_FILE="/etc/hosts"

# Backup the host file
cp "$HOST_FILE" /etc/hosts.bak
echo "Creating hosts file backup"

# Append new domains
append_if_not_exists "#school projects" "$HOST_FILE"
echo "Adding hypertube.local domain"
append_if_not_exists "127.0.0.1 hypertube.local" "$HOST_FILE"
echo "Adding api.hypertube.local domain"
append_if_not_exists "127.0.0.1 api.hypertube.local" "$HOST_FILE"
echo "Adding adminer.hypertube.local domain"
append_if_not_exists "127.0.0.1 adminer.hypertube.local" "$HOST_FILE"

#!/bin/sh

# Set environment variable(s)
# ? Sensible way to set a container env variable from a docker secret ?
envDatabaseUrl="`cat /run/secrets/DATABASE_URL`"
export DATABASE_URL="$envDatabaseUrl"

# Start app
npm run start:deploy:seed:prod
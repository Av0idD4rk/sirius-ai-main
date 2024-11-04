#!/bin/bash

host="$1"
shift
cmd="$@"

until nc -z "$host" 8000; do
  >&2 echo "Server is unavailable - sleeping"
  sleep 1
done

>&2 echo "Server is up - executing command"
exec $cmd
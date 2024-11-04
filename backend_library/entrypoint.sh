#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e
echo "Making database migrations"
python manage.py makemigrations
# Run migrations
echo "Applying database migrations..."
python manage.py migrate --run-syncdb

# Start the Django server
echo "Starting Django server..."
exec python manage.py runserver 0.0.0.0:8000

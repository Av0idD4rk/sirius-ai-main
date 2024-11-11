#!/bin/bash


echo "Waiting for postgres..."
while ! nc -z db 5432; do
    sleep 0.1
done
echo "PostgreSQL started"


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

#!/bin/sh
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL is not set"
  exit 1
fi

until python -c "import psycopg2, os; psycopg2.connect(os.environ['DATABASE_URL']).close()" >/dev/null 2>&1; do
  echo "Waiting for database..."
  sleep 1
done

exec uvicorn backend.src.main:app --host 0.0.0.0 --port 8000

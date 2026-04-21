FROM python:3.14-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
  && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend ./backend
COPY backend/start.sh ./
RUN chmod +x ./start.sh

ENV PYTHONPATH=/app
EXPOSE 8000

CMD ["./start.sh"]

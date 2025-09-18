FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Create directories for data and logs
RUN mkdir -p /app/data /app/logs

# Expose API port
EXPOSE 5000

# Run the API server
CMD ["python", "api.py"]
# ----------------------------------
# Stage 1: Build Dependencies
# ----------------------------------
FROM python:3.12-slim AS builder
WORKDIR /app
COPY apps/api/requirements.txt ./
RUN pip install --user --no-cache-dir -r requirements.txt

# ----------------------------------
# Stage 2: Production Server
# ----------------------------------
FROM python:3.12-slim AS runner
WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /root/.local /root/.local

# Add local bin to PATH
ENV PATH=/root/.local/bin:$PATH
ENV PYTHONPATH=/app

# Copy application source
COPY apps/api ./apps/api

EXPOSE 8000

# Use Gunicorn with Uvicorn workers for production scaling
CMD ["gunicorn", "apps.api.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]

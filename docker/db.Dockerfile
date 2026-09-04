# syntax=docker/dockerfile:1

# WorkNest database image: PostgreSQL initialized from the worknest.sql backup.
# The SQL file is executed automatically on first boot (empty data volume).
FROM postgres:16-alpine
LABEL org.opencontainers.image.title="WorkNest database"
LABEL org.opencontainers.image.description="PostgreSQL 16 initialized with the complete WorkNest SQL backup"

ENV POSTGRES_USER=worknest \
    POSTGRES_PASSWORD=worknest \
    POSTGRES_DB=worknest

# 01: full schema + data restore
COPY backups/worknest.sql /docker-entrypoint-initdb.d/01-worknest.sql
# 02: post-restore verification (prints record counts to the container log)
COPY docker/db-verify.sql /docker-entrypoint-initdb.d/02-verify.sql

EXPOSE 5432

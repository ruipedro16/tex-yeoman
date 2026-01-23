FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends texlive-full rubber make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY . .

CMD ["make"]

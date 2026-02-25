FROM texlive/texlive:latest

RUN apt-get update \
    && apt-get install -y --no-install-recommends rubber make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY . .

CMD ["make"]
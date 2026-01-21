#!/bin/bash

format_docker() {
    if ! command -v nix-shell &> /dev/null; then
        echo "nix-shell command not found. Skipping docker format."
        return 1
    fi

    DOCKER_FILES=$(git diff --cached --name-only | grep -E '(Dockerfile|\.dockerfile$|docker-compose\.ya?ml$)')
    if [ -n "$DOCKER_FILES" ]; then
        echo "Staged Docker files found:"
        echo "$DOCKER_FILES"

        echo "$DOCKER_FILES" | while read -r file; do
            nix-shell -p dockerfmt --run "dockerfmt $file" > __$file__.tmp
            mv __$file__.tmp $file
        done

        git add $DOCKER_FILES
    else
        echo "No staged Docker files."
    fi
}

format_js() {
    JS_FILES=$(git diff --cached --name-only | grep -E '\.(js|jsx|ts|tsx)$')
    if [ -n "$JS_FILES" ]; then
        echo "Staged JS/TS files found:"
        echo "$JS_FILES"

        npm run format

        git add $JS_FILES
    else
        echo "No staged JS/TS files."
    fi
}

format_docker
format_js

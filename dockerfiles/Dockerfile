FROM alpine:edge

# Skip chromium download during puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /build

# Install all tools and dependencies required
RUN apk update \
    && apk add --no-cache \
      libc6-compat \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      npm \
# Install website2pdf
    && npm i website2pdf node-prune \
    && echo "BUILD_INFO | website2pdf version: $(npx website2pdf --version)" \
# Cleanup
    && npm cache clean --force

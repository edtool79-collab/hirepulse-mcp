FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY proxy.mjs ./
USER node
ENTRYPOINT ["node", "proxy.mjs"]

FROM node:20.13.0-alpine3.19 as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force

COPY . .
RUN npm run build:api

FROM node:20.13.0-alpine3.19

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:api:prod"]
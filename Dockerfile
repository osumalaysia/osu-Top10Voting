FROM node:12.18.3-alpine AS builder
RUN npm i -g nx
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN npm run build:prod



FROM node:12.18.3-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --prod --ignore-scripts

COPY --from=builder /app/dist dist

CMD ["yarn", "start:prod"]

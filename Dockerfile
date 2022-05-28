FROM node:16.15.0-alpine as build-env

COPY . ./app
WORKDIR /app

RUN npm ci
RUN npm run build:protoc
RUN npm run build


FROM gcr.io/distroless/nodejs:16
COPY --from=build-env /app/node_modules /app/node_modules
COPY --from=build-env /app/dist /app/dist
WORKDIR /app
CMD ["dist/main.js"]
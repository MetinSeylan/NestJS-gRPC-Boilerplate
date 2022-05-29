FROM node:16.15.0-alpine as build-env

COPY ./src ./app/src
COPY ./package-lock.json ./app/package-lock.json
COPY ./package.json ./app/package.json
COPY ./tsconfig.json ./app/tsconfig.json
COPY ./tsconfig.build.json ./app/tsconfig.build.json
COPY ./nest-cli.json ./app/nest-cli.json

WORKDIR /app

RUN npm ci
RUN npm run build:protoc
RUN npm run build

FROM node:16.15.0-alpine

RUN GRPC_HEALTH_PROBE_VERSION=v0.3.1 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

COPY --from=build-env /app/node_modules /app/node_modules
COPY --from=build-env /app/dist /app/dist
WORKDIR /app
CMD ["node", "dist/main.js"]
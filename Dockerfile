FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS sample
FROM microsoft/dotnet:8.0-runtime AS base
FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 5173
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
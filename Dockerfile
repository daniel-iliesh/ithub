FROM node:16-alpine AS builder

WORKDIR /app

COPY . .

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=${REACT_APP_BASE_URL}

RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]

# FROM nginx:stable-alpine
# COPY --from=builder /app/build /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]

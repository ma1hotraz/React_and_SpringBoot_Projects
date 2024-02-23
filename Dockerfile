# Stage 1: Build Frontend
FROM node:14-alpine as nodework
WORKDIR /myapp
COPY /google_keep_clone/package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve Frontend with Nginx
FROM nginx:1.23-alpine

# Install necessary tools and dependencies
RUN apk update && \
    apk add --no-cache openjdk17 maven mysql-client

# Set up MySQL
ENV MYSQL_ROOT_PASSWORD=root
VOLUME /var/lib/mysql

# Set up backend
WORKDIR /app
COPY /keep/pom.xml .
COPY /keep/src ./src
RUN mvn clean package -DskipTests

# Copy frontend build to Nginx directory
WORKDIR /usr/share/nginx/html
COPY --from=nodework /myapp/build .

# Expose ports
EXPOSE 80 3306 8080

# Start Nginx and backend
CMD ["nginx", "-g", "daemon off;"]

# FRONT END

# BLOCK 1

FROM node:14-alpine as nodework

WORKDIR /myapp

COPY /google_keep_clone/package*.json ./

RUN npm install

COPY . .

RUN npm run build

# BLOCK 2


FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=nodework /myapp/build .

ENTRYPOINT [ "nginx","-g","daemon off;" ]

# BACKEND

FROM mysql:latest AS mysql-service

ENV MYSQL_ROOT_PASSWORD=root
VOLUME /var/lib/mysql

FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app
COPY /keep/pom.xml .
COPY /keep/src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-alpine

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 3306 8080

COPY --from=mysql-service /var/lib/mysql /var/lib/mysql

CMD ["sh", "-c", "java -jar app.jar"]




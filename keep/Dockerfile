# Stage 1: MySQL Database
FROM mysql:latest

# Environment variables to set the root password
ENV MYSQL_ROOT_PASSWORD=root

# Create a database and user
ENV MYSQL_DATABASE=notes_db
ENV MYSQL_USER=root
# ENV MYSQL_PASSWORD=mypassword

# Copy SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306

# Stage 2: Maven Build
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files to leverage Docker layer caching
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 3: Final Image with JRE and Application
FROM openjdk:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build stage to the current directory
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]

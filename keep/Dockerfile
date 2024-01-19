# Stage 1: MySQL Database
FROM mysql:latest

# Environment variables to set the root password
ENV MYSQL_ROOT_PASSWORD=root

# Create a database and user
ENV MYSQL_DATABASE=notes_db
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root

# Set the working directory in the container
WORKDIR /docker-entrypoint-initdb.d

# Copy SQL script to initialize the database
COPY init.sql .

# Expose the default MySQL port
EXPOSE 3306

# Start MySQL with skip-grant-tables and update root password
RUN service mysql start && \
     mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'your_password' WITH GRANT OPTION;" && \
     mysql -u root -e "FLUSH PRIVILEGES;" && \
#     mysql -u root -e "CREATE DATABASE notes_db;"



#Stage 2  Use a base image with JDK and Maven
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files to leverage Docker layer caching
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Create a minimal runtime image
FROM openjdk:17-jdk-alpine
WORKDIR /app

# Copy the JAR file from the build stage to the current directory
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]



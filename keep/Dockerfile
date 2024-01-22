## Stage 1: MySQL Database
#FROM mysql:latest
#
## Environment variables to set the root password
#ENV MYSQL_ROOT_PASSWORD=root
#
## Create a database and user
#ENV MYSQL_DATABASE=notes_db
#
#ENV MYSQL_USER=root
#ENV MYSQL_PASSWORD=root
#
## Set the working directory in the container
#WORKDIR /docker-entrypoint-initdb.d
#
## Copy SQL script to initialize the database
##COPY entrypoint.sh .
#COPY entrypoint.sh /docker-entrypoint-initdb.d/
#
## Expose the default MySQL port
#EXPOSE 3306
#
#RUN sleep 10
## Start MySQL with skip-grant-tables and update root password
#CMD service mysql start
#CMD sleep 10
#CMD mysql -u $MYSQL_USER -e GRANT ALL PRIVILEGES ON *.* TO $MYSQL_USER@'localhost' IDENTIFIED BY $MYSQL_USER WITH GRANT OPTION;
#CMD sleep 10
#CMD mysql -u $MYSQL_USER -e FLUSH PRIVILEGES;
#CMD sleep 10
#CMD mysql -u $MYSQL_USER -p$MYSQL_ROOT_PASSWORD
#CMD sleep 10
#CMD mysql -u $MYSQL_USER -p$MYSQL_ROOT_PASSWORD -e 'CREATE DATABASE IF NOT EXISTS notes_db;'


# Stage 1: MySQL Database
FROM mysql:latest

# Environment variables to set the root password
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=notes_db
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root

# Copy SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Copy entrypoint script to execute additional MySQL commands
COPY entrypoint.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/entrypoint.sh

# Expose the default MySQL port
EXPOSE 3306

# Use the default entrypoint script provided by the MySQL image
ENTRYPOINT ["docker-entrypoint.sh"]

# Start MySQL service
CMD ["mysqld"]




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



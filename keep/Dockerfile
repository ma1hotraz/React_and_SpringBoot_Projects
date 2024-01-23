# Stage 1: MySQL Database
FROM mysql:latest

# Set the working directory in the container
WORKDIR /docker-entrypoint-initdb.d

# Copy SQL script to initialize the database
#COPY entrypoint.sh .

RUN mysql -u root -p'root' -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;"

# Expose the default MySQL port
EXPOSE 3306

#Dockerfile for MySQL
#FROM mysql
#ENV MYSQL_ROOT_PASSWORD=root
#ENV MYSQL_DATABASE=notes_db
#EXPOSE 3308
#RUN usermod -u 1000 mysql RUN mkdir -p /var/run/mysqld
#RUN chmod -R 777 /var/run/mysqld RUN sed -i -e"s/^bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/my.cnf
#

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

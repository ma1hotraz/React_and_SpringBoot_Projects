## Use the official Maven image to build the application
#FROM maven:3.8.4-openjdk-17 AS build
#
## Set the working directory in the container
#WORKDIR /app
#
## Copy only the necessary files to leverage Docker layer caching
#COPY pom.xml .
#COPY src ./src
#
## Build the application
#RUN mvn clean package -DskipTests
#
## Create a smaller image with only the JRE and the application
#FROM openjdk:17-alpine
#
## Set the working directory in the container
#WORKDIR /app
#
## Copy the JAR file from the build stage to the current directory
#COPY --from=build /app/target/*.jar app.jar
#
## Expose the port the app runs on
##EXPOSE 443
#
## Run the application
#CMD ["java", "-jar", "app.jar"]


# Use the official OpenJDK image as the base image
FROM openjdk:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the specific JAR file to the current directory in the container
COPY target/keep-0.0.1-SNAPSHOT.jar ./app

# Run the application
CMD ["java", "-jar", "keep-0.0.1-SNAPSHOT.jar"]

# Multi-stage Dockerfile for Spring Boot deployment on Render
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app
COPY . .
# Fix Windows CRLF line endings if present and grant execution rights
RUN sed -i 's/\r$//' ./mvnw && chmod +x ./mvnw && ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

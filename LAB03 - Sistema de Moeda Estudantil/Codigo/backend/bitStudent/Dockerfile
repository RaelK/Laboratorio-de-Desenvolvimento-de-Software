# ===== STAGE 1: Build =====
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /build

COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# ===== STAGE 2: Runtime =====
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /build/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]

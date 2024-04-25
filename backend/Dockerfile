# Estágio de compilação
FROM eclipse-temurin:17-jdk-jammy as build-image
WORKDIR /app-backend

COPY .mvn/ .mvn
COPY ./src/main/ ./src/main/
COPY mvnw pom.xml ./

RUN ./mvnw clean package

# Estágio de produção
FROM eclipse-temurin:17-jre-jammy

COPY --from=build-image /app-backend/target/*.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

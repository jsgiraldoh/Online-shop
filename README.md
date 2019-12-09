# Online-shop

Para poder ejecutar el comando "docker-compose up -d", son necesarios los siguientes requerimientos"

1) desplazarse hacia la carpeta /uaa

2) ejecutar el comando 

./mvnw package -Pprod verify jib:dockerBuild

para crear la imagen de docker del microservicio uaa

3) desplazarse hacia la carpeta /gateway

4) ejecutar el comando

./mvnw package -Pprod verify jib:dockerBuild

para crear la imagen de docker del microservicio gateway

5) desplazarse hacia la carpeta /microservicio1

6) ejecutar el comando

./mvnw package -Pprod verify jib:dockerBuild

para crear la imagen de docker del microservicio microservicio1

7) para finalizar cuando estas imagenes sean creadas ejecutar el comando

docker-compose up -d 

8) Esperar a que todos los servicios esten activos y relacionados al registry

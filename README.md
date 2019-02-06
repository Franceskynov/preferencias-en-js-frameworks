# preferencias-en-js-frameworks

## Construir la imagen
`
docker build -t <your username>/preferencias-en-js-frameworks .
`

## Correr la imagen y exponerla en un puerto
`
docker run -p 80:3000 -d <your username>/preferencias-en-js-frameworks
`

## Comprobar que la imagen esta corriendo
`
docker ps
`

## Denener la imagen
`
docker stop <CONTAINER ID>
`
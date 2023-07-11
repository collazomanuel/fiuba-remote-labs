
# FIUBA Laboratorios Remotos

En este repositorio se encuentran los archivos e instrucciones para implementar el sistema de laboratorios remotos en una máquina.

## Nginx

- #### Instalación

```bash
sudo apt-get install nginx
```

- #### Configuración
  
Reemplazar los contenidos de **/etc/nginx/sites-available/default** por los siguientes:

```text
server {
    listen 80;
    server_name {DOMAIN}; # Replace with your domain or IP address

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- #### Inicialización

```bash
sudo service nginx start
```

Nginx redirige los llamados a la IP o dominio de la máquina a _localhost:3000_ en la misma máquina, donde está corriendo el servidor de Node.

## Back-end

Primero, necesitamos instalar **fswebcam** en la máquina donde se encuentra alojado el servidor:

```bash
sudo apt-get install fswebcam
```

Luego, ubicados en el directorio raíz:

```bash
npm install
node server.js
```

El servidor corre en _localhost:3000_, y se encarga tanto de proveer al Front-end de un _feed_ en vivo de la cámara conectada a la máquina donde corre, como de habilitar el manejo del microcontrolador por parte del usuario.

## Front-end

Los archivos del Front-end se encuentran en la carpeta **public**, y son provistos por el servidor en _localhost:3000_.

## Microcontrolador

Primero se debe cargar el código que se encuentra en el archivo **arduino-code.ino** al Arduino, y una vez cargado, registrar el puerto donde se encuentra conectado. El microcontrolador se comunica con el servidor por el puerto serie haciendo uso de la biblioteca **SerialPort** de Node:

```javascript
const port = new SerialPort({ path: "/dev/ttyACM0", baudRate: 9600 });
```

Notamos que debemos cambiar el campo _path_ del archivo **server.js** por el correspondiente según el puerto registrado previamente.

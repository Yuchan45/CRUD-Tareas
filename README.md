# Challenge para el puesto de Desarrollador Junior Back-end

Se realizó la implementación de un servidor utilizando Express.js que sirve como backend para una aplicación de administración de tareas.

## Instalación y ejecución
1- Abrir la terminal en la carpeta donde se desea instalar el proyecto y ejecutar el comando: "git clone https://github.com/Yuchan45/CRUD-Tareas.git".

2- Ingresar en la carpeta que se creó y ejecutar el comando "npm install" para instalar todas la dependencias.

3- Para iniciar el programa, ejecutar el comando "npm run dev" (nodemon) o "npm start". (NOTA: El servidor corre en el puerto 3001, asi que verificar que dicho puerto esté libre).


## Algunas aclaraciones
- Para simular las diferentes requests de un front, utilicé la herramienta "Postman". Sin embargo, también hice unos pequeños formularios
para realizar algunas pruebas. Estas se pueden acceder mediante GET en los siguientes endpoints.

    "Crear Tareas"   --->  http://localhost:3001/task

    "Registro"       --->  http://localhost:3001/usuario

    "Log In"         --->  http://localhost:3001/login


- Como en el enunciado no estaban especificadas las validaciones a la hora de registrar un usuario o de crear una tarea, me tomé la libertad de
validar los casos en donde los campos quedaban vacíos. Esto fue utilizando Express-validator. Si se desea agregar nuevas validaciones simplemente
hay que agregarlas en el 'validateTaskMiddleware.js' o 'validateUserMiddleware.js' dentro de la carpeta 'middlewares.'

- Para testear el correcto funcionamiento del JSON Web Token (JWT), creé un endpoint de prueba el cual devuelve las tareas:

    http://localhost:3001/protected
    Para poder acceder a dicho endpoint, en necesario pasar por header la 'key':authorization con el 'value':token. De no hacerlo, el acceso sera denegado.
    
    Dicho token se obtiene al realizar el correcto 'login'.
    
    Nota: El token tiene un tiempo de expiracion de 5 minutos.


## Detalles de implementación:
- Como patrón de diseño seguí el de "Modelo Vista y Controlador (MVC)" para una mejor prolojidad y escalabilidad.

- En cuanto a la base de datos, se utilizó un JSON para almacenar las tareas y los usuarios. Dichos archivos se encuentran dentro de la carpeta 'data'.
    
    Las tareas contienen:

        id, title, description, completed, creationDate, updatedDate
    
    Los usuarios contienen:
    
        id, username, password, creationDate


## Aclaraciones a la hora de probar los endpoints:
- POST al '/task'. El cuerpo de la solicitud debe contener de key 'title' y 'description'. Ambos campos deben estar completos para pasar la validacion.
    ![image](https://user-images.githubusercontent.com/43625804/227809105-985c2127-28d9-434e-82b8-38d64a0a1a85.png)


- POST al '/usuario'. El cuerpo de la solicitud debe contener de key 'username' y 'password'. Ambos campos deben estar completos para pasar la validacion.
    ![image](https://user-images.githubusercontent.com/43625804/227809165-385f5205-b0d0-40f9-8021-6c374c5d0b55.png)


- POST al '/login'. El cuerpo de la solicitud debe contener de key 'username' y 'password'. Ambas credenciales deben ser correctas para pasar la validacion.
    ![image](https://user-images.githubusercontent.com/43625804/227809194-9adbccae-1b35-4ba8-8cc1-2c6b759f68f5.png)


- GET al '/protected'. Debe contener en el header la 'key':authorization con el 'value':token. (Dicho token se obtiene al realizar el correcto 'login').
De no hacerlo, el acceso sera denegado.
Nota: El token tiene un tiempo de expiracion de 5 minutos.
    ![image](https://user-images.githubusercontent.com/43625804/227809236-67421926-68e0-4e0c-bec5-77f15d19c00c.png)




## Dependencias:
    "bcrypt": "^5.1.0",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-validator": "^6.15.0",
    "jsonwebtoken": "^9.0.0",
    "method-override": "^3.0.0",
    "moment": "^2.29.4",
    "uuid": "^9.0.0"




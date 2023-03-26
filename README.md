# Challenge para el puesto de Desarrollador Junior Back-end

Se realizo la implementacion de un servidor utilizando Express.js que sirve como backend para una aplicación de administración de tareas.

## Instalación
1- Clonar el repositorio de github en la carpeta deseada. "git clone https://github.com/Yuchan45/CRUD-Tareas.git".

2- Ejecutar el comando "npm install" dentro de la carpeta creada para instalar todas la dependencias.

3- Para iniciar el programa, ejecutar el comando "npm run dev" (nodemon) o "npm start".


## Algunas aclaraciones
- Para simular las diferentes requests de un front, utilice la herramienta "Postman". Sin embargo, tambien hice unos pequeños formularios
para realizar algunas pruebas. Estas se pueden acceder mediante GET en los siguientes endpoints.

    "Crear Tareas"   --->  http://localhost:3001/task

    "Registro"       --->  http://localhost:3001/usuario

    "Log In"         --->  http://localhost:3001/login


- Como en el enunciado no estaban especificadas las validaciones a la hora de registrar un usuario o de crear una tarea, me tome la libertad de
validar los casos en donde los campos quedaban vacios. Esto fue utilizando Express-validator. Si se desea agregar nuevas validaciones simplemente
hay que agregarlas en el 'validateTaskMiddleware.js' o 'validateUserMiddleware.js' dentro de la carpeta 'middlewares.'

- Para testear el correcto funcionamiento del JSON Web Token (JWT), cree un endpoint de prueba el cual devuelve las tareas:

    http://localhost:3001/protected
    Para poder acceder a dicho endpoint, en necesario pasar por header la 'key':authorization con el 'value':token. De no hacerlo, el acceso sera denegado.
    Dicho token se obtiene al realizar el correcto 'login'.
    Nota: El token tiene un tiempo de expiracion de 5 minutos.


## Detalles de implementacion:
- Como patron de diseño segui el de "Modelo Vista y Controlador (MVC)" para una mejor prolojidad y escalabilidad.

- En cuanto a la base de datos, se utilizo un JSON para almacenar las tareas y los usuarios. Dichos archivos se encuentran dentro de la carpeta 'data'.
Las tareas contienen:
    id, titulo, descripcion, completado, fecha de creacion y fecha de actualizacion.
Los usuarios contienen:
    id, usuario, contraseña y fecha de creacion.


## Aclaraciones a la hora de probar los endpoints:
- POST al '/task'. El cuerpo de la solicitud debe contener de key 'title' y 'description'. Ambos campos deben estar completos para pasar la validacion.

- POST al '/usuario'. El cuerpo de la solicitud debe contener de key 'username' y 'password'. Ambos campos deben estar completos para pasar la validacion.

- POST al '/login'. El cuerpo de la solicitud debe contener de key 'username' y 'password'. Ambas credenciales deben ser correctas para pasar la validacion.

- GET al '/protected'. Debe contener en el header la 'key':authorization con el 'value':token. (Dicho token se obtiene al realizar el correcto 'login').
De no hacerlo, el acceso sera denegado.
Nota: El token tiene un tiempo de expiracion de 5 minutos.


## Dependencias:
    "bcrypt": "^5.1.0",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-validator": "^6.15.0",
    "jsonwebtoken": "^9.0.0",
    "method-override": "^3.0.0",
    "moment": "^2.29.4",
    "uuid": "^9.0.0"




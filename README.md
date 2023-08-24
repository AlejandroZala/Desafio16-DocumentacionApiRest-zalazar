Entrega CLASE 34 - LOGGER Y PERFOMANCE - MAILING

Definición de niveles de prioridad con Winston Logger
-Creo logger.service.js y según el entorno de trabajo tengo su nivel de prioridad
    Si ejecuto npm run dev -> uso port 8080, nivel de prioridad 5 (debug) solo consola
    Si ejecuto npm run prod -> uso port 5000, nivel de prioridad 3 (info)

-Creo archivos dev.env y prod.env para desarrollo y producción.
-Creo endpoint /loggerTest para prueba de errores por medio del router logger.router,js
-Creo router para mailing (mailer.router.js) y endpoint /mail

----------------------------------------------------------------

Entrega CLASE 32 - Mocking errores
-Creo carpeta mocks, con productos y usuarios
-Creo routes para productos y usuarios.
    POSTMAN:
    -/api/mockingProducts/mockingProducts: CREA 100 PRODUCTOS SIMILARES A LOS DE MONGO
    -/api/mockingUsers/mockingUsers: CREA 100 USERS SIMILARES A LOS DE MONGO
        -con campo productos tipo array de hasta 4 productos
        -con campo role (user, admin, seller)

-Manejo de errores
POSTMAN:
    -Desde el body ingreso un usuario completo:
        POST:/api/userErrors (user agregado)
    -Desde el body ingreso un usuario incompleto: 
        POST:/api/userErrors (mensaje de error en consola) 


----------------------------------------------------------------

En esta entrega modifiqué para no usar session y pasar a usar jwt.
Todo lo que el profe hizo en clase lo pude hacer andar.

Tengo que modificar aún muchas cosas del código para que todo quede andando como antes pero con jwt.

Pude incorporar el .env y el config.js

Pude incorporar el servico de mensajeria con email con Nodemailer y sms con Twilio

Pude crear la carpeta services y los archivos de cart, user, product y ticket para services.

Pude crear el model y el manager de tikect.

Aun me queda armar los controllers....ahi es donde hago laguna!


Esta entrega la hago para cumplir con la fecha pero sé que estoy estancado y me cuesta avanzar.




Si hago un link a http://localhost:8080/ => va a /login

Si no esta registrado => ir a /register
    -Al completar el formulario se crea el user con password hasheada y se guarda en MongoDB
    -Luego redirije a Loguin con email y contraseña (con opción a restablecer contraseña) o con Github
    -Una vez logueado se inicia session => va a vista de todos los productos con saludo de bienvenida al usuario y opción de Logout
    -/profile muestra una vista con los datos del user logueado correctamente

Para hasheo de password uso bvrypt y para atenticacion y autorización uso Passport y passport-local

/chat => permite relizar un chat para el usuario ingresando el nombre

/realtimeProductos => permite ver el post de productos desde Postman en tiempo real

Products con POSTMAN:
GET/api/products    (veo la lista de productos)
POST/api/products   (cargo un nuevo producto MongoDB con autogeneraciónn de _id)
PUT/api/products/:pid    (actualizo el producto por id)
DEL/api/products/:pid    (elimino el producto por id)

Carts con POSTMAN:
GET/api/carts       (veo la lista de carts y los productos en cada cart)
POST/api/carts      (creo un nuevo cart en MongoDB con autogeneraciónn de _id)
POST/api/carts/.cid/product/:pid      (cargo un producto al cart y lo guardo en MongoDB)
PUT/api/carts/:cid    (actualizo el cart por id seleccionado)
PUT/api/carts/.cid/product/:pid      (actualiza un producto al cart y lo guardo en MongoDB)
DEL/api/carts/:cid    (elimino el cart por id seleccionado)
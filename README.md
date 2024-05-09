# Olimpiadas 2024 Paris WebApp Tickets Portal

Aplicacion portal de ventas de entradas a eventos de las olimpiadas 2024 de Paris

# Indice
- [Requirements](#Requisitos-de-Instalación)
- [Installation and Configuration Guide](#Guia-de-Instalación-y-Configuración)
- [Database and Server Configuration](#Configuración-de-la-Base-de-Datos-y-Servidor)
- [License](#Licencia)


# Requisitos de Instalación.

Una breve guia del software que se necesita antes de ejecutar toda la app

## Backend

Para el backend neceitaremos las siguientes dependencias:

> [!IMPORTANT]
> **PHP:** Make sure to have PHP installed on your machine. Symfony 7.0.5 (the version used in the specification) requires PHP 8.2.x or higher. You can download PHP from [php.net](https://www.php.net/downloads).

> [!IMPORTANT]
>  **Composer:** Composer is the PHP dependency manager and is used to install Symfony project dependencies. You can download Composer from [getcomposer.org](https://getcomposer.org/download/).

> [!IMPORTANT]
> **Symfony CLI:** Symfony CLI provides useful tools for working with Symfony applications. You can install it by following the instructions at [symfony.com/download](https://symfony.com/download).

> [!IMPORTANT] 
> **MySQL or any other compatible database management system:** You need to have a database server installed and configured. Database configuration is done through the `.env` file in your Symfony project.

> [!IMPORTANT] 
> **NodeJs:** Make sure to have NodeJs installed on your machine. You can download NodeJs from [nodejs.org](https://nodejs.org/en/download/).

## Frontend

Para el frontend necesitaremos las siguientes dependencias:

> [!IMPORTANT]
>  **NodeJs:** Make sure to have NodeJs installed on your machine. You can download NodeJs from [nodejs.org](https://nodejs.org/en/download/).

> [!IMPORTANT]
>  **NPM:** NPM is the NodeJs package manager and is used to install project dependencies. You can download NPM by installing NodeJs.

> [!IMPORTANT]
>  **Ionic:** Ionic is a framework for building cross-platform mobile applications. You can install it by running `npm install -g @ionic/cli`.

> [!IMPORTANT]
>  **Android Studio:** Android Studio is required to build and run the Android version of the application. You can download Android Studio from [developer.android.com](https://developer.android.com/studio).

> [!IMPORTANT]
>  **Xcode:** Xcode is required to build and run the iOS version of the application. You can download Xcode from the Mac App Store.

# Guia de Instalación y Configuración

Una guia paso a paso para instalar y configurar la aplicación en tu máquina.

## Backend

1. Clone the repository to your local machine.
2. Navigate to the ./backend directory.
3. Run `composer install` to install project dependencies.
4. Create a new database for the project.
5. Configure the database connection in the `.env` file and your Auth0 variables of your tenant.
6. Run `php bin/console make:migration` to create a new migration.
7. Run `php bin/console doctrine:migrations:migrate` to create the database schema.
8. Load the data from the .sql file in the root of the repo.
9. Run `symfony serve` to start the Symfony development server.

```bash
composer install
php bin/console make:migration
php bin/console doctrine:migrations:migrate
symfony serve
```

## Frontend

1. Clone the repository to your local machine.
2. Navigate to the ./frontend directory.
3. Run `npm install` to install project dependencies.
4. Run `ionic install` to install the Ionic dependencies.
5. Configure the Auth0 variables in the `src/env.tsx` file.
6. Run `ionic serve` to start the Ionic development server.

```bash
npm install
ionic serve
```

# Configuración de la Base de Datos y Servidor

## Iniciar Scheduler

- Iniciar el servicio de consumo de mensajes con salida detallada:
  ```bash
  php bin/console messenger:consume -v scheduler_default
  ```
- Comandos programados por defecto para configurar los slots:
  ```php
  RecurringMessage::cron('0 0 30 3 *', new LogSlots("First-Slots-Setter-Command")); // Programado para el 30 de marzo
  RecurringMessage::cron('0 0 1 5 *', new LogSlots("Second-Slots-Setter-Command")); // Programado para el 1 de mayo
  ```

### Probar el Scheduler
- Para probar la funcionalidad, comentar los comandos originales y reemplazarlos con estos para obtener retroalimentación inmediata:
  ```php
  RecurringMessage::every('10 seconds', new LogSlots("First-Slots-Setter-Command"));
  ```
- Ejecutar primero el comando que cambiará `user_slots`.
- Luego reemplazar y ejecutar el siguiente comando para probar el segundo cambio:
  ```php
  RecurringMessage::every('10 seconds', new LogSlots("Second-Slots-Setter-Command"));
  ```
- Este comando afectará `user_slots` y `slots_sports`.
- Después de cada ejecución, verificar los mensajes en la consola y comprobar los cambios en las tablas `user_slots` y `slots_sports` en la base de datos.
- Asegurarse de que cada comando solo se ejecute una vez para evitar repeticiones durante las pruebas. Cuando se muestre algo por consola inmediatamente control+c para parar el proceso.

### Detalles de Implementación:

- La lógica del programador se encuentra en `/MessageHandler`.
- La ejecución del programador se maneja en `/Scheduler`.

## Inicar Stripe

Para iniciar stripe en el proyecto se debe de seguir los siguientes pasos, desde la raiz del proyecto backend:

```bash
node server.js
```

# Env Variables

Para modificar la fecha maxima del frontend tenemos un env.tsx en la carpeta src del frontend, ahi se puede modificar las variables del entorno de programación:

```tsx
// src/env.tsx
const originalDate = new Date("YOUR_DATE");
export const TARGET_DATE = new Date(originalDate);
export const SYMFONY_API_URL = "YOUR_API_URL";
export const AUTH0_DOMAIN = "YOUR_AUTH0_DOMAIN";
export const AUTH0_CLIENT_ID = "YOUR_AUTH0_CLIENT_ID";
export const AUTH0_REDIRECT_URI = "YOUR_AUTH0_REDIRECT_URI";
export const AUTH0_AUDIENCE = "YOUR_AUTH0_AUDIENCE";
export const AUTH0_SCOPE = "YOUR_AUTH0_SCOPE";
export const AUTH0_TENANT = "YOUR_AUTH0_TENANT";
export const AUTH0_TOKEN_ISSUER = "YOUR_AUTH0";
```

# Licencia
Unlicensed

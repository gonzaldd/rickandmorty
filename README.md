# Rick and Morty App

Esta es una aplicación de React Native desarrollada como un ejercicio práctico. La app permite a los usuarios explorar personajes de la serie de TV "Rick and Morty", ver sus detalles y gestionar una lista de personajes favoritos.

## Features

* **Lista de Personajes**: Explora una lista de personajes obtenidos desde la API de Rick and Morty.
* **Detalles del Personaje**: Visualiza información detallada de cada personaje.
* **Favoritos**: Añade o elimina personajes de una lista personal de favoritos.
* **Manejo de Errores**: Muestra mensajes amigables para los estados de carga y errores de la API.

## Tech Stack

* **React Native (Expo)**
* **TypeScript**
* **React Navigation** (for screen navigation)
* **Zustand** (for global state management)
* **Axios** (for API requests)
* **Jest & React Native Testing Library** (for unit tests)

## Estructura del Proyecto

El proyecto está organizado usando una estructura basada en feature para promover la escalabilidad y el mantenimiento.

```
src/
├── api/          # Axios client and API call functions
├── components/   # Shared, reusable UI components
├── features/     # Core application features (characters, favorites)
├── navigation/   # React Navigation setup and type definitions
└── store/        # Zustand global state store
```

Este enfoque mantiene el código relacionado con una característica específica (como sus pantallas, componentes y tipos) en el mismo lugar, facilitando su gestión y escalabilidad.

## Cómo Empezar

### Prerrequisitos

* Node.js (versión LTS recomendada)
* La app Expo Go en tu dispositivo móvil (para pruebas) o un emulador de Android/iOS.

### Instalación y Ejecución

1.  **Clona el repositorio::**
    ```bash
    git clone <repository-url>
    cd rick-and-morty-app
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecuta la aplicación:**
    ```bash
    npm start
    ```
    Esto iniciará el empaquetador Metro. Luego, puedes escanear el código QR con la app Expo Go en tu teléfono o ejecutarlo en un emulador.

4.  **Ejecuta los tests:**
    ```bash
    npm test
    ```
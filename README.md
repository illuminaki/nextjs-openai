# Chat with OpenAI

Bienvenido al proyecto **Chat with OpenAI**, una aplicación web que permite a los usuarios interactuar con el modelo GPT-3.5-turbo (u otros modelos compatibles) utilizando una interfaz intuitiva y fácil de usar.

## Características

- **Chat en tiempo real**: Los usuarios pueden enviar mensajes y recibir respuestas generadas por OpenAI.
- **Validaciones integradas**: El servidor verifica que el mensaje sea válido antes de procesarlo.
- **Historial de chat**: Los mensajes enviados y las respuestas se muestran en un flujo de conversación.
- **Diseño moderno**: Implementado con **Tailwind CSS** para una experiencia de usuario atractiva y responsiva.

## Tecnologías utilizadas

El proyecto está construido utilizando las siguientes herramientas y dependencias:

### Frontend
- **React**: Framework de JavaScript para construir interfaces de usuario.
- **Next.js**: Framework de React para aplicaciones web de servidor y cliente.
- **Tailwind CSS**: Framework de CSS para diseño moderno y responsivo.

### Backend
- **OpenAI API**: Se utiliza la biblioteca oficial de OpenAI para interactuar con el modelo GPT.
- **Next.js API Routes**: Para manejar las solicitudes del lado del servidor.
- **PostgreSQL**: Base de datos para almacenar el historial de chats.
- **Prisma**: ORM para interactuar con la base de datos.

### Desarrollo
- **TypeScript**: Proporciona tipado estático para mejorar la calidad del código.
- **ESLint**: Herramienta de análisis estático para garantizar la calidad del código.
- **PostCSS y Autoprefixer**: Para procesar y optimizar CSS.
- **Docker**: Contenerización para simplificar la configuración y el despliegue.

## Configuración inicial

### Requisitos previos

1. Tener instalado **Docker** y **Docker Compose**.
2. Clonar el repositorio:
   ```bash
   git clone https://github.com/illuminaki/nextjs-openai.git
   cd nextjs-openai
   ```

3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
   ```env
   OPENAI_API_KEY=tu_clave_secreta_de_openai
   DATABASE_URL=postgresql://postgres:postgres@db:5432/chat_with_openai
   ```

   Asegúrate de que tu clave de OpenAI sea válida y que la URL de la base de datos coincida con la configuración en `docker compose.yml`.

### Cómo iniciar el proyecto

1. Construir y levantar los contenedores:
   ```bash
   docker compose up --build
   ```

   Este comando debe ejecutarse en una terminal y permanecer en ejecución mientras trabajas con el proyecto.

2. En otra terminal, verifica que la base de datos está funcionando correctamente. Conéctate al contenedor de PostgreSQL:
   ```bash
   docker exec -it chat-with-openai-db-1 psql -U postgres -d chat_with_openai
   ```

   Una vez dentro, puedes inspeccionar las tablas:
   ```sql
   \dt
   ```

3. Aplica las migraciones de la base de datos (desde una nueva terminal, con los contenedores en ejecución):
   ```bash
   npx prisma migrate dev --name init
   ```

4. La aplicación estará disponible en:
   [http://localhost:3000](http://localhost:3000)

### Debugging y desarrollo

Si encuentras problemas, utiliza estas herramientas para depurar:

1. **Logs del contenedor de la aplicación**:
   ```bash
   docker logs chat-with-openai-app-1
   ```

2. **Logs del contenedor de la base de datos**:
   ```bash
   docker logs chat-with-openai-db-1
   ```

3. **Cliente Prisma**:
   Si necesitas regenerar el cliente Prisma:
   ```bash
   npx prisma generate
   ```

   Aplica cualquier migración pendiente:
   ```bash
   npx prisma migrate dev --name init
   ```

### Scripts disponibles

En el directorio del proyecto, puedes ejecutar los siguientes scripts:

- `npm run dev`: Inicia la aplicación en modo de desarrollo utilizando Turbopack.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run start`: Inicia el servidor en modo de producción.
- `npm run lint`: Analiza y corrige errores de estilo de código.

## Análisis de Código con SonarQube

Para información detallada sobre cómo configurar y ejecutar SonarQube en este proyecto, consulta el documento [SONARQUBE.md](./SONARQUBE.md).


## Notas importantes

- Asegúrate de no subir tu archivo `.env` al repositorio. Este archivo debe incluirse en `.gitignore`.
- Si encuentras problemas con los binarios de Prisma, asegúrate de que el `binaryTargets` esté configurado correctamente en `schema.prisma` y ejecuta `npx prisma generate`.

## Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo, modificarlo y mejorarlo.


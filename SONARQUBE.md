# Uso de SonarQube en el Proyecto

Este documento explica cómo configurar y ejecutar SonarQube para analizar la calidad del código de esta aplicación Next.js.

## 📌 Requisitos Previos

1. **Docker y Docker Compose** deben estar instalados en tu máquina.
2. Un usuario con permisos en **SonarQube** (por defecto `admin/admin` en la instalación local).
3. **SonarScanner** instalado en tu máquina:

   - **Linux/macOS**: `brew install sonar-scanner`
   - **Windows**: `choco install sonarscanner`

## 🚀 Pasos para Ejecutar el Análisis

### 1️⃣ Configurar SonarQube

Si aún no tienes SonarQube corriendo en un contenedor, puedes usar la configuración disponible en el siguiente repositorio:

🔗 [Repositorio de SonarQube en Docker](https://github.com/illuminaki/sonarqube)

Para iniciarlo, ejecuta:

```bash
git clone https://github.com/illuminaki/sonarqube.git
cd sonarqube
docker compose up -d
```

Esto iniciará SonarQube en `http://localhost:9000`.

### 2️⃣ Crear un Proyecto en SonarQube

1. Accede a `http://localhost:9000` e inicia sesión (`admin/admin` por defecto).
2. Crea un nuevo **proyecto manual**.
3. Anota el **Project Key** asignado (por ejemplo, `nextjs-app`).

### 3️⃣ Configurar el Proyecto

Crea un archivo `sonar-project.properties` en la raíz de tu proyecto con el siguiente contenido:

```properties
# Identificación del proyecto en SonarQube
sonar.projectKey=nextjs-app
sonar.projectName=Next.js App
sonar.projectVersion=1.0

# Configuración de código fuente
sonar.sources=.
sonar.exclusions=**/node_modules/**,**/.next/**,**/build/**,**/public/**

# Configuración de análisis
sonar.language=js
sonar.sourceEncoding=UTF-8
sonar.host.url=http://localhost:9000
sonar.login=admin
sonar.password=admin
```

### 4️⃣ Ejecutar el Análisis

En la raíz del proyecto, ejecuta:

```bash
sonar-scanner
```

Esto enviará los datos de análisis a SonarQube. Una vez finalizado, ve a `http://localhost:9000` para ver los resultados.

### 5️⃣ Recomendaciones Adicionales

- **Ignorar archivos irrelevantes**: Modifica `sonar.exclusions` en `sonar-project.properties` para excluir archivos innecesarios.
- **Automatización**: Puedes integrar SonarQube en pipelines CI/CD para evaluar la calidad del código en cada cambio.

## 🔗 Referencias

- [Documentación oficial de SonarQube](https://docs.sonarqube.org/)
- [Repositorio de SonarQube en Docker](https://github.com/illuminaki/sonarqube)
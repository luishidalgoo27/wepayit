# 💸 WePayIt

> **WePayIt** es una aplicación web colaborativa que facilita la gestión de gastos compartidos en grupo. Desde viajes y cenas hasta el día a día en un piso compartido, WePayIt automatiza el cálculo de deudas, envía recordatorios y ofrece herramientas lúdicas para hacer más divertida la experiencia.

---

## 📖 Tabla de contenidos

1. [Motivación y visión](#motivación-y-visión)  
2. [Características principales](#características-principales)  
3. [Capturas de pantalla](#capturas-de-pantalla)  
4. [Tecnologías y arquitectura](#tecnologías-y-arquitectura)  
   - [Frontend](#frontend)  
   - [Backend](#backend)  
   - [Base de datos](#base-de-datos)  
   - [Despliegue](#despliegue)  
5. [Modelo de datos](#modelo-de-datos)  
6. [Flujo de comunicación](#flujo-de-comunicación)  
7. [Instalación y puesta en marcha](#instalación-y-puesta-en-marcha)  
8. [Guía de uso](#guía-de-uso)  
9. [Control de calidad y pruebas](#control-de-calidad-y-pruebas)  
10. [Diseño UI/UX](#diseño-uiux)  
11. [Contribuciones](#contribuciones)  
12. [Licencia](#licencia)  
13. [Equipo y contacto](#equipo-y-contacto)  

---

## Motivación y visión

En grupos de amigos, compañeros de piso o trabajo, dividir gastos suele ser fuente de errores y discusiones. Con WePayIt queremos:

- **Eliminar confusiones**: automatizar los cálculos y registrar quién paga qué.
- **Fomentar la transparencia**: mantener historiales accesibles y detallados.
- **Hacerlo divertido**: añadir dinámicas como ruleta de pago y amigo invisible.
- **Escalar a futuro**: ofrecer versión Premium, app móvil y nuevas integraciones.

Nuestra visión es convertirnos en la herramienta de referencia para cualquier situación que implique gastos compartidos, apostando por la simplicidad, la colaboración y la innovación constante.

---

## Características principales

1. **Autenticación y perfiles**  
   - Registro y login seguros  
   - Verificación de email opcional  
   - Avatares personalizados

2. **Gestión de grupos**  
   - Crear, editar y eliminar grupos (solo creador)  
   - Invitar miembros vía correo  
   - Roles: creador (admin), miembros

3. **Control de gastos**  
   - Crear gastos con título, descripción, fecha y categoría  
   - División automática entre participantes  
   - Visualización de balances individuales y globales  

4. **Pagos y recordatorios**  
   - Registrar pagos parciales o totales  
   - Notificaciones por email para deudas pendientes  
   - Historial detallado de transacciones

5. **Dinámicas lúdicas**  
   - **Ruleta de pago**: sortear quién paga  
   - **Excusas**: Excusas para no pagar  

6. **Modos claro/oscuro**  
   - Paleta “modo claro” (#f2fbf8)  
   - Paleta “modo oscuro” (#1d443c)

7. **Futuras ampliaciones**  
   - Versiones Premium con estadísticas avanzadas  
   - App nativa iOS/Android  
   - Integración con Bizum, Stripe y otras pasarelas  
   - Chat de soporte y FAQ interactiva  

## Tecnologías y arquitectura

### Frontend

- **React** + **TypeScript**  
- **Vite** (bundler)  
- **Tailwind CSS** (estilos utilitarios)  
- **React Router DOM** (SPA)  
- **React Hot Toast** (notificaciones)  
- **Lucide React Icons** (iconos SVG)  
- **Axios** (cliente HTTP)

### Backend

- **Laravel 10** (framework PHP MVC)  
- **Laravel Sanctum** (autenticación token)  
- **MySQL** (base de datos relacional)  
- **Cloudinary** (almacenamiento multimedia)  
- **Excalidraw** (diagramas colaborativos internos)

### Base de datos

- Tablas principales: `users`, `groups`, `expenses`, `divisions`, `notifications`, `invitations`  
- Revisiones de integridad y claves foráneas  
- Migraciones y seeders automáticos  

### Despliegue

- **Frontend**: Vercel (CI/CD desde GitHub)  
- **Backend**: Servidor Laravel (Heroku / VPS / Laravel Vapor)  
- Certificados SSL, variables de entorno seguras  


## Flujo de comunicación

1. **Acción en UI** → React captura el evento  
2. **Axios** envía petición HTTP (JSON)  
3. **Laravel** recibe, valida (`Form Request`), aplica lógica y persiste en BD  
4. **Respuesta JSON** con datos o errores → React actualiza la vista sin recarga  

---

## Instalación y puesta en marcha

### Requisitos

- Node.js ≥ 18  
- PHP ≥ 8.1  
- Composer  
- MySQL  
- Cuenta en Cloudinary (opcional)  

### Clonar y configurar

```bash
git clone https://github.com/tu_usuario/wepayit.git
cd wepayit

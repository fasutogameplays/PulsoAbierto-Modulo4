# Pulso Abierto — Programación Web, Módulo 4

**Alumno:** Fausto Martín Bonincontro  
**Proyecto:** Pulso Abierto (React + TypeScript)

## Qué hace la aplicación

Pulso Abierto muestra datos de Bitcoin, Ethereum y Solana obtenidos de la API pública de CoinGecko. Permite buscar criptomonedas, elegir cotización en dólares o pesos argentinos, abrir sus páginas de detalle y marcar favoritos. Los favoritos se guardan en el navegador para que no se pierdan al recargar.

## Tecnologías

React, TypeScript, Vite, React Router, Zustand (con `persist`), Zod, Fetch API, Vitest y Testing Library. Se utiliza la API pública de CoinGecko; no hace falta una clave de acceso para el servicio configurado en el proyecto.

## Cómo instalarlo y ejecutarlo

Requiere Node.js 20.19+ o 22.12+ y npm. Desde la carpeta donde está `package.json`:

```bash
npm install
npm run dev
```

Abrir la dirección local que muestre Vite (normalmente `http://localhost:5173/`). En Windows, si PowerShell bloquea `npm`, usar `npm.cmd` en los comandos.

## Comandos de revisión

```bash
npm run test       # pruebas automatizadas
npm run lint       # revisión con ESLint
npm run build      # compilación de producción (genera dist/)
npm run preview    # revisar localmente la versión compilada
```

Con `preview`, abrir la dirección indicada por Vite, normalmente `http://localhost:4173/`. La terminal debe permanecer abierta mientras se usa el servidor de vista previa.

## Mejora de mantenimiento hecha para la Actividad 4

**Problema encontrado:** en `src/pages/DetailPage.tsx` se repetía varias veces la comprobación `favorites.includes(coin.id)` para decidir cómo mostrar el botón de favoritos.

**Qué cambié:** ahora la pantalla calcula el valor `isFavorite` una sola vez y lo reutiliza para la clase del botón, su nombre accesible, su estado y su texto. No cambié la forma de agregar o quitar favoritos ni su almacenamiento.

**Cómo se comprueba que no afectó el funcionamiento:** volver a ejecutar `npm run test`, `npm run lint` y `npm run build`; después revisar en la aplicación el listado, el detalle de Bitcoin, marcar/quitar favorito y volver a cargar. Los resultados de estas comprobaciones se registran al final de este archivo.

## Publicación en GitHub y Vercel

1. Subir **el contenido de esta carpeta** a un repositorio de GitHub y guardar un commit con la versión final. No subir `node_modules`, `dist` ni archivos `.env` personales (están excluidos por `.gitignore`).
2. Entrar en Vercel, elegir **Add New → Project**, importar ese repositorio de GitHub y seleccionar el proyecto Vite.
3. Usar `npm run build` como comando de build y `dist` como directorio de salida.
4. Publicar y abrir la URL pública; probar tanto la portada como una ruta de detalle abierta directamente, por ejemplo `/criptomonedas/bitcoin`. El archivo `vercel.json` evita un error 404 al recargar las rutas de React Router.

No se utilizan variables de entorno propias en la configuración actual. La API pública puede limitar temporalmente las solicitudes (por ejemplo, error 429).

**Repositorio GitHub:** pendiente de agregar después de subir el proyecto.  
**Aplicación publicada en Vercel:** pendiente de agregar después del despliegue.

## Verificación final

- **Referencia del Módulo 3 (09/11/2026):** 7 pruebas automatizadas aprobadas y compilación correcta en Windows; también se revisaron listado, detalle y favoritos en Chrome.
- **Pruebas después de la mejora del Módulo 4:** pendiente de ejecutar y registrar.
- **Lint después de la mejora:** pendiente de ejecutar y registrar.
- **Build de producción después de la mejora:** pendiente de ejecutar y registrar.
- **Preview de producción:** pendiente de comprobar y registrar.
- **Publicación en GitHub/Vercel:** pendiente.
- **Fecha de preparación de esta versión:** 17/11/2026. La fecha de verificación completa debe anotarse una vez terminadas las comprobaciones.

> Este registro diferencia las pruebas reales del Módulo 3 de las comprobaciones que todavía faltan para cerrar el Módulo 4. No se da por publicada una aplicación hasta tener y verificar el enlace público.

# Arquitectura Base - Next.js Pokédex

## Topología de Directorios
La aplicación adopta una estructura modular y orientada a dominios dentro del directorio `src`:

- `src/app/`: Contiene la lógica de enrutamiento y la capa de presentación principal (Server Components).
- `src/services/`: Aísla las funciones responsables de la obtención de datos, promoviendo la separación de preocupaciones y facilitando la inyección de dependencias o reemplazo futuro de proveedores.
- `src/types/`: Centraliza los contratos de datos (interfaces de TypeScript) para garantizar coherencia y seguridad de tipos en toda la aplicación.

## Estrategia de Obtención de Datos
El consumo de la PokeAPI se rige por un paradigma de "fetch asincrónico con caché persistente". Dado que los atributos básicos de las entidades Pokémon raramente varían, se aprovecha la directiva `force-cache` nativa del framework.

Esto permite que Next.js resuelva la promesa de la red en tiempo de compilación o en la primera solicitud (según la configuración de generación), almacenando la respuesta persistente. Este enfoque minimiza la latencia para los usuarios finales, reduce drásticamente el volumen de llamadas hacia el servicio externo (cumpliendo con sus directrices de uso razonable) y establece una arquitectura orientada a la robustez.

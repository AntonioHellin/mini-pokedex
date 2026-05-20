# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-20
### Added
- Interfaz visual avanzada en el grid principal simulando una Pokédex.
- Renderizado de los primeros 151 Pokémon.
- Segmento de ruta dinámica estática `/pokemon/[id]` para la vista de detalles.
- Imágenes *official-artwork* en alta resolución integradas mediante el componente `<Image>` de Next.js.
### Changed
- Actualización de `next.config.ts` permitiendo carga de imágenes desde `raw.githubusercontent.com`.
- Extensión de la interfaz `Pokemon` y actualización del servicio de API para recuperar métricas detalladas.

## [0.1.0] - 2026-05-20
### Added
- Inicialización del repositorio y configuración base de Next.js.
- Infraestructura fundacional de Server Components y TypeScript estricto.
- Implementación de `api.ts` con consumo de PokeAPI y políticas de caché (force-cache).
- Creación de la página principal para iterar el catálogo base.
- Documentación de arquitectura en `docs/01-arquitectura-base.md`.

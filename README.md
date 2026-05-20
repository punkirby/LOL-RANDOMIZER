# Rift Roulette

Randomizador premium para League of Legends construido con Next.js, React, TypeScript, TailwindCSS, Framer Motion y Zustand.

## Experiencia incluida

- Randomizador por modo: campeón, rol, build, full challenge, team, draft, ARAM y Ultimate Bravery.
- Resultados cinematográficos con splash arts de Data Dragon.
- Builds, runas, hechizos, restricciones y challenges competitivos/troll.
- Historial, favoritos, estadísticas y modo streamer persistidos localmente.
- PWA básica con manifest e icono.
- Arquitectura por features, dominio separado y componentes reutilizables.

## Estructura

```txt
src/
  app/                         Next app router
  features/randomizer/
    components/                UI del producto
    data/                      Datos locales del juego
    domain/                    Motor de randomización
    hooks/                     Secuencias e interacciones
    store/                     Estado persistente
  shared/
    lib/                       Utilidades comunes
    types/                     Tipos de dominio
```

## Ejecutar

```bash
npm install
npm run dev
```

Luego abre `http://localhost:3000`.

## Próximos pasos de producto

- Conectar Riot API para campeones actualizados, rotaciones y perfiles.
- Añadir salas multiplayer con WebSocket/WebRTC.
- Exportar overlay real para OBS/Twitch.
- Sincronizar daily challenges y leaderboards.
- Añadir temas regionales con assets por Piltover, Noxus, Ionia y Shadow Isles.

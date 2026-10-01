
# Mi primer commit con Git

Este repositorio acompaña nuestra primera práctica con **Git**: guardar una versión de nuestro trabajo y poder reconocerla más adelante.

## El flujo básico

```bash
git init
git add README.md
git commit -m "Primer commit"
```

Cada comando cumple una función:

- `git init` prepara la carpeta para usar Git.
- `git add` selecciona los cambios que queremos guardar.
- `git commit` crea una versión con un mensaje que explica qué hicimos.

## Ver el historial

Después del commit, podemos revisar lo que ha ocurrido con:

```bash
git log --oneline
```

El primer commit es más que un punto de partida: es una pequeña fotografía de nuestro proyecto. A partir de aquí, cada cambio importante puede tener su propia versión, su propio mensaje y su propio lugar en la historia.

> Un buen commit responde con claridad a una pregunta: **¿qué cambió?**

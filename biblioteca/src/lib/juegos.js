// Utilidades para sopas de letras y crucigramas.

export function normalizar(palabra) {
  return palabra
    .toUpperCase()
    .replace(/Ñ/g, '\u0001')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u0001/g, 'Ñ')
    .replace(/[^A-ZÑ]/g, '')
}

export function rng(semilla) {
  let a = semilla >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function mezclar(arr, aleatorio = Math.random) {
  const copia = [...arr]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

// ------------------------------------------------------------ Sopa de letras

const DIRECCIONES = [
  [0, 1], // derecha
  [1, 0], // abajo
  [1, 1], // diagonal abajo
  [-1, 1], // diagonal arriba
]
const RELLENO = 'AAAAABCCDDEEEEEFGHIIIJLLMMNNÑOOOOPQRRRSSSTTUUVYZ'

export function generarSopa(palabras, semilla = Date.now()) {
  const lista = palabras.map((p) => ({ display: p, palabra: normalizar(p) }))
  const mayor = Math.max(...lista.map((p) => p.palabra.length))
  const tam = Math.max(10, mayor + 2)

  for (let intento = 0; intento < 60; intento++) {
    const azar = rng(semilla + intento * 7919)
    const grid = Array.from({ length: tam }, () => Array(tam).fill(''))
    const ubicaciones = []
    let ok = true
    const orden = [...lista].sort((a, b) => b.palabra.length - a.palabra.length)

    for (const item of orden) {
      let puesta = false
      for (let t = 0; t < 300 && !puesta; t++) {
        const [dr, dc] = DIRECCIONES[Math.floor(azar() * DIRECCIONES.length)]
        const largo = item.palabra.length
        const r0 = Math.floor(azar() * tam)
        const c0 = Math.floor(azar() * tam)
        const rf = r0 + dr * (largo - 1)
        const cf = c0 + dc * (largo - 1)
        if (rf < 0 || rf >= tam || cf < 0 || cf >= tam) continue
        let cabe = true
        for (let k = 0; k < largo; k++) {
          const actual = grid[r0 + dr * k][c0 + dc * k]
          if (actual && actual !== item.palabra[k]) {
            cabe = false
            break
          }
        }
        if (!cabe) continue
        const celdas = []
        for (let k = 0; k < largo; k++) {
          grid[r0 + dr * k][c0 + dc * k] = item.palabra[k]
          celdas.push([r0 + dr * k, c0 + dc * k])
        }
        ubicaciones.push({ ...item, celdas })
        puesta = true
      }
      if (!puesta) {
        ok = false
        break
      }
    }
    if (!ok) continue
    for (let r = 0; r < tam; r++)
      for (let c = 0; c < tam; c++)
        if (!grid[r][c]) grid[r][c] = RELLENO[Math.floor(azar() * RELLENO.length)]
    return { tam, grid, ubicaciones }
  }
  throw new Error('No se pudo armar la sopa de letras')
}

// ------------------------------------------------------------ Crucigrama

function intentarCrucigrama(entradas) {
  const celdas = new Map() // "r,c" -> { letra, dirs: Set }
  const puestas = []
  const clave = (r, c) => `${r},${c}`

  const ponerPalabra = (item, r, c, dir) => {
    const [dr, dc] = dir === 'h' ? [0, 1] : [1, 0]
    for (let k = 0; k < item.palabra.length; k++) {
      const key = clave(r + dr * k, c + dc * k)
      const celda = celdas.get(key) || { letra: item.palabra[k], dirs: new Set() }
      celda.dirs.add(dir)
      celdas.set(key, celda)
    }
    puestas.push({ ...item, r, c, dir })
  }

  const evaluar = (palabra, r, c, dir) => {
    const [dr, dc] = dir === 'h' ? [0, 1] : [1, 0]
    const [pr, pc] = dir === 'h' ? [1, 0] : [0, 1]
    if (celdas.has(clave(r - dr, c - dc))) return -1
    if (celdas.has(clave(r + dr * palabra.length, c + dc * palabra.length))) return -1
    let cruces = 0
    for (let k = 0; k < palabra.length; k++) {
      const rr = r + dr * k
      const cc = c + dc * k
      const celda = celdas.get(clave(rr, cc))
      if (celda) {
        if (celda.letra !== palabra[k] || celda.dirs.has(dir)) return -1
        cruces++
      } else if (celdas.has(clave(rr + pr, cc + pc)) || celdas.has(clave(rr - pr, cc - pc))) {
        return -1
      }
    }
    return cruces
  }

  const limites = () => {
    let minR = Infinity, maxR = -Infinity, minC = Infinity, maxC = -Infinity
    for (const key of celdas.keys()) {
      const [r, c] = key.split(',').map(Number)
      minR = Math.min(minR, r); maxR = Math.max(maxR, r)
      minC = Math.min(minC, c); maxC = Math.max(maxC, c)
    }
    return { minR, maxR, minC, maxC }
  }

  const [primera, ...resto] = entradas
  ponerPalabra(primera, 0, 0, 'h')
  let pendientes = [...resto]
  let progreso = true
  while (pendientes.length && progreso) {
    progreso = false
    for (const item of [...pendientes]) {
      let mejor = null
      for (const [key, celda] of celdas) {
        const [r, c] = key.split(',').map(Number)
        for (let i = 0; i < item.palabra.length; i++) {
          if (item.palabra[i] !== celda.letra) continue
          for (const dir of ['h', 'v']) {
            const r0 = dir === 'v' ? r - i : r
            const c0 = dir === 'h' ? c - i : c
            const cruces = evaluar(item.palabra, r0, c0, dir)
            if (cruces < 1) continue
            const l = limites()
            const fin = dir === 'h' ? [r0, c0 + item.palabra.length - 1] : [r0 + item.palabra.length - 1, c0]
            const area =
              (Math.max(l.maxR, fin[0]) - Math.min(l.minR, r0) + 1) *
              (Math.max(l.maxC, fin[1]) - Math.min(l.minC, c0) + 1)
            const puntaje = cruces * 1000 - area
            if (!mejor || puntaje > mejor.puntaje) mejor = { r: r0, c: c0, dir, puntaje }
          }
        }
      }
      if (mejor) {
        ponerPalabra(item, mejor.r, mejor.c, mejor.dir)
        pendientes = pendientes.filter((p) => p !== item)
        progreso = true
      }
    }
  }
  return { celdas, puestas, faltan: pendientes.length, limites: limites() }
}

export function generarCrucigrama(lista) {
  const entradas = lista.map((e) => ({ ...e, palabra: normalizar(e.palabra) }))
  const base = [...entradas].sort((a, b) => b.palabra.length - a.palabra.length)
  let mejor = null
  // Probar cada palabra como punto de partida y quedarse con el mejor tablero.
  for (let i = 0; i < base.length; i++) {
    const orden = [base[i], ...base.filter((_, j) => j !== i)]
    const res = intentarCrucigrama(orden)
    const { minR, maxR, minC, maxC } = res.limites
    const area = (maxR - minR + 1) * (maxC - minC + 1)
    const puntaje = -res.faltan * 100000 - area
    if (!mejor || puntaje > mejor.puntaje) mejor = { ...res, puntaje }
  }

  const { minR, maxR, minC, maxC } = mejor.limites
  const filas = maxR - minR + 1
  const cols = maxC - minC + 1
  const puestas = mejor.puestas.map((p) => ({ ...p, r: p.r - minR, c: p.c - minC }))

  // Numeración en orden de lectura.
  const inicios = [...new Set(puestas.map((p) => `${p.r},${p.c}`))]
    .map((k) => k.split(',').map(Number))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const numeroDe = new Map(inicios.map(([r, c], i) => [`${r},${c}`, i + 1]))

  const solucion = Array.from({ length: filas }, () => Array(cols).fill(null))
  for (const [key, celda] of mejor.celdas) {
    const [r, c] = key.split(',').map(Number)
    solucion[r - minR][c - minC] = celda.letra
  }

  const palabras = puestas
    .map((p) => ({ ...p, numero: numeroDe.get(`${p.r},${p.c}`) }))
    .sort((a, b) => a.numero - b.numero)

  return { filas, cols, solucion, palabras, numeroDe, faltan: mejor.faltan }
}

// ------------------------------------------------------------ Corrige el texto

/** Convierte "[mal|bien|regla]" en tokens. */
export function analizarTextoCorrige(texto) {
  const tokens = []
  const re = /\[([^|\]]+)\|([^|\]]+)\|([^\]]+)\]/g
  let ultimo = 0
  let m
  let idError = 0
  const empujarTexto = (t) => {
    // Separa palabras para que cada una se pueda tocar.
    const partes = t.split(/(\s+)/)
    for (const parte of partes) {
      if (!parte) continue
      if (/^\s+$/.test(parte)) tokens.push({ tipo: 'espacio', texto: parte })
      else tokens.push({ tipo: 'palabra', texto: parte })
    }
  }
  while ((m = re.exec(texto))) {
    empujarTexto(texto.slice(ultimo, m.index))
    tokens.push({ tipo: 'error', id: idError++, texto: m[1], correcta: m[2], regla: m[3] })
    ultimo = m.index + m[0].length
  }
  empujarTexto(texto.slice(ultimo))
  // Une la puntuación pegada a un error ("golaso" + "y") ya viene separada por espacios;
  // la puntuación sin espacio (p. ej. "].") queda como palabra corta: se marca como no tocable.
  return tokens.map((t) => (t.tipo === 'palabra' && /^[.,;:!?¡¿»«]+$/.test(t.texto) ? { ...t, tipo: 'signo' } : t))
}

export function estrellasPorErrores(errores) {
  if (errores <= 0) return 3
  if (errores <= 2) return 2
  return 1
}

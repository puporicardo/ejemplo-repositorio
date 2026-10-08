import React, { useState, useMemo } from 'react'
import { Icono } from '../common/Icono'
import { ModalVictoria } from '../common/ModalVictoria'
import { useProgreso } from '../../context/ProgresoContext'
import { generarCrucigrama } from '../../lib/juegos'

export function Crucigrama({ modulo, onFinalizar }) {
  const { registrarActividad } = useProgreso()
  const cruci = useMemo(() => generarCrucigrama(modulo.crucigrama), [modulo.crucigrama])

  // Estado del usuario en el tablero: matriz de letras ingresadas
  const [letrasUsuario, setLetrasUsuario] = useState(() => {
    return Array.from({ length: cruci.filas }, () => Array(cruci.cols).fill(''))
  })

  // Palabra activa seleccionada de la lista de pistas
  const [palabraActiva, setPalabraActiva] = useState(0)
  const [erroresCometidos, setErroresCometidos] = useState(0)
  const [mostrarVictoria, setMostrarVictoria] = useState(false)

  const clave = (r, c) => `${r},${c}`

  // Celdas que pertenecen a la palabra seleccionada actualmente
  const celdasPalabraActiva = useMemo(() => {
    const pal = cruci.palabras[palabraActiva]
    if (!pal) return new Set()
    const set = new Set()
    const [dr, dc] = pal.dir === 'h' ? [0, 1] : [1, 0]
    for (let i = 0; i < pal.palabra.length; i++) {
      set.add(clave(pal.r + dr * i, pal.c + dc * i))
    }
    return set
  }, [palabraActiva, cruci])

  const manejarCambioLetra = (r, c, val) => {
    const letra = val.toUpperCase().slice(-1)
    if (!/^[A-ZÑ]?$/.test(letra)) return

    const nueva = letrasUsuario.map((fila, ri) =>
      fila.map((col, ci) => (ri === r && ci === c ? letra : col))
    )
    setLetrasUsuario(nueva)

    // Si escribió una letra y coincide o no
    if (letra && letra !== cruci.solucion[r][c]) {
      setErroresCometidos((e) => e + 1)
    }

    // Auto-avance al siguiente casillero de la palabra activa
    if (letra) {
      const pal = cruci.palabras[palabraActiva]
      if (pal) {
        const [dr, dc] = pal.dir === 'h' ? [0, 1] : [1, 0]
        const sigR = r + dr
        const sigC = c + dc
        if (celdasPalabraActiva.has(clave(sigR, sigC))) {
          const el = document.getElementById(`celda-${sigR}-${sigC}`)
          if (el) el.focus()
        }
      }
    }

    // Comprobar si completó todo el crucigrama
    let completo = true
    for (let ri = 0; ri < cruci.filas; ri++) {
      for (let ci = 0; ci < cruci.cols; ci++) {
        if (cruci.solucion[ri][ci] && nueva[ri][ci] !== cruci.solucion[ri][ci]) {
          completo = false
          break
        }
      }
      if (!completo) break
    }

    if (completo) {
      const estrellas = erroresCometidos <= 2 ? 3 : erroresCometidos <= 5 ? 2 : 1
      registrarActividad(modulo.id, 'crucigrama', estrellas)
      setTimeout(() => setMostrarVictoria(true), 600)
    }
  }

  const reiniciar = () => {
    setLetrasUsuario(Array.from({ length: cruci.filas }, () => Array(cruci.cols).fill('')))
    setErroresCometidos(0)
    setMostrarVictoria(false)
  }

  // Contar palabras completadas
  const palabrasCompletadas = useMemo(() => {
    return cruci.palabras.filter((pal) => {
      const [dr, dc] = pal.dir === 'h' ? [0, 1] : [1, 0]
      for (let i = 0; i < pal.palabra.length; i++) {
        if (letrasUsuario[pal.r + dr * i][pal.c + dc * i] !== pal.palabra[i]) return false
      }
      return true
    }).length
  }, [letrasUsuario, cruci])

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 text-left select-none">
      <div className="flex items-center justify-between border-b-2 border-[#e6d7c3] pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#d9482f]">
            Ingenio y Vocabulario
          </span>
          <h2 className="text-2xl font-bold text-[#42230c]">Crucigrama</h2>
          <p className="text-xs text-[#695d56]">Lee las pistas y completa las palabras en la cuadrícula.</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-[#8c5835]">
            Resueltas: {palabrasCompletadas} de {cruci.palabras.length}
          </span>
          <div className="flex gap-1 mt-1 justify-end">
            {cruci.palabras.map((_, i) => (
              <div
                key={i}
                className={`w-3.5 h-2 rounded-full ${
                  i < palabrasCompletadas ? 'bg-[#2e7d32]' : 'bg-[#e0cfb8]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Tablero del crucigrama */}
        <div className="md:col-span-7 bg-[#fffdfa] border-2 border-[#e0cfb8] rounded-2xl p-4 md:p-6 shadow-sm overflow-x-auto flex justify-center">
          <div
            className="inline-grid gap-1 p-2 bg-[#f6efe1] rounded-xl border border-[#decbb3]"
            style={{
              gridTemplateColumns: `repeat(${cruci.cols}, minmax(0, 1fr))`,
            }}
          >
            {cruci.solucion.map((fila, r) =>
              fila.map((letraSol, c) => {
                if (!letraSol) {
                  return (
                    <div
                      key={clave(r, c)}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-[#2c2523]/10 rounded-xs"
                    />
                  )
                }

                const numero = cruci.numeroDe.get(clave(r, c))
                const valorActual = letrasUsuario[r][c]
                const esActiva = celdasPalabraActiva.has(clave(r, c))
                const esCorrecta = valorActual === letraSol

                return (
                  <div key={clave(r, c)} className="relative w-8 h-8 sm:w-9 sm:h-9">
                    {numero && (
                      <span className="absolute top-0.5 left-0.5 text-[9px] font-bold text-[#695d56] leading-none z-10 pointer-events-none">
                        {numero}
                      </span>
                    )}
                    <input
                      id={`celda-${r}-${c}`}
                      type="text"
                      maxLength={1}
                      value={valorActual}
                      onChange={(e) => manejarCambioLetra(r, c, e.target.value)}
                      onFocus={() => {
                        // Buscar si esta celda pertenece a alguna palabra
                        const idx = cruci.palabras.findIndex((p) => {
                          const [dr, dc] = p.dir === 'h' ? [0, 1] : [1, 0]
                          for (let i = 0; i < p.palabra.length; i++) {
                            if (p.r + dr * i === r && p.c + dc * i === c) return true
                          }
                          return false
                        })
                        if (idx !== -1) setPalabraActiva(idx)
                      }}
                      className={`w-full h-full text-center font-extrabold text-sm sm:text-base rounded-md border text-[#2c2523] uppercase outline-none transition-all ${
                        esActiva
                          ? 'bg-[#fff9db] border-[#f59f00] ring-2 ring-[#f59f00]/40'
                          : esCorrecta
                          ? 'bg-[#e8f5e9] border-[#81c784]'
                          : 'bg-white border-[#d6c4a5] hover:bg-[#fffcf7]'
                      }`}
                    />
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Pistas */}
        <div className="md:col-span-5 bg-[#fffdfa] border-2 border-[#e0cfb8] rounded-2xl p-4 md:p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#42230c] flex items-center gap-1.5 pb-2 border-b border-[#eee2d3]">
            <Icono name="Puzzle" size={16} />
            <span>Pistas del crucigrama</span>
          </h3>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {cruci.palabras.map((pal, idx) => {
              const activa = palabraActiva === idx
              const [dr, dc] = pal.dir === 'h' ? [0, 1] : [1, 0]
              let lista = true
              for (let i = 0; i < pal.palabra.length; i++) {
                if (letrasUsuario[pal.r + dr * i][pal.c + dc * i] !== pal.palabra[i]) {
                  lista = false
                  break
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setPalabraActiva(idx)
                    const el = document.getElementById(`celda-${pal.r}-${pal.c}`)
                    if (el) el.focus()
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activa
                      ? 'bg-[#fff9db] border-[#f59f00] ring-2 ring-[#f59f00]/30'
                      : lista
                      ? 'bg-[#e8f5e9] border-[#a5d6a7] opacity-80'
                      : 'bg-white border-[#e0cfb8] hover:bg-[#faf5eb]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-[#8c5835]">
                      {pal.numero}. {pal.dir === 'h' ? 'Horizontal' : 'Vertical'} ({pal.palabra.length} letras)
                    </span>
                    {lista && <Icono name="CheckCircle2" size={14} className="text-[#2e7d32]" />}
                  </div>
                  <p className="text-xs sm:text-sm text-[#382f2a] leading-snug">{pal.pista}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {mostrarVictoria && (
        <ModalVictoria
          estrellas={erroresCometidos <= 2 ? 3 : 2}
          mensaje="¡Completaste con éxito todo el crucigrama ortográfico!"
          onContinuar={onFinalizar}
          onRepetir={reiniciar}
        />
      )}
    </div>
  )
}

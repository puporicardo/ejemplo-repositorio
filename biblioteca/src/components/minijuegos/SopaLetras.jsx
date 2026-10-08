import React, { useState, useMemo } from 'react'
import { Icono } from '../common/Icono'
import { ModalVictoria } from '../common/ModalVictoria'
import { useProgreso } from '../../context/ProgresoContext'
import { generarSopa } from '../../lib/juegos'

export function SopaLetras({ modulo, onFinalizar }) {
  const { registrarActividad } = useProgreso()
  const sopa = useMemo(() => generarSopa(modulo.sopa), [modulo.sopa])

  const [seleccionadas, setSeleccionadas] = useState([]) // [[r, c], ...]
  const [encontradas, setEncontradas] = useState({}) // { [palabraNorm]: true }
  const [arrastrando, setArrastrando] = useState(false)
  const [mostrarVictoria, setMostrarVictoria] = useState(false)

  // Mapa de celdas encontradas para colorearlas
  const celdasEncontradas = useMemo(() => {
    const mapa = new Set()
    sopa.ubicaciones.forEach((ub) => {
      if (encontradas[ub.palabra]) {
        ub.celdas.forEach(([r, c]) => mapa.add(`${r},${c}`))
      }
    })
    return mapa
  }, [encontradas, sopa])

  const clave = (r, c) => `${r},${c}`

  const iniciarSeleccion = (r, c) => {
    setArrastrando(true)
    setSeleccionadas([[r, c]])
  }

  const moverSeleccion = (r, c) => {
    if (!arrastrando || seleccionadas.length === 0) return
    const [r0, c0] = seleccionadas[0]
    // Calcular dirección en línea recta
    const dr = r - r0
    const dc = c - c0
    const pasos = Math.max(Math.abs(dr), Math.abs(dc))
    if (pasos === 0) return

    // Comprobar si es horizontal, vertical o diagonal
    const pasoR = dr === 0 ? 0 : dr / Math.abs(dr)
    const pasoC = dc === 0 ? 0 : dc / Math.abs(dc)

    if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
      const nueva = []
      for (let i = 0; i <= pasos; i++) {
        nueva.push([r0 + pasoR * i, c0 + pasoC * i])
      }
      setSeleccionadas(nueva)
    }
  }

  const finalizarSeleccion = () => {
    setArrastrando(false)
    if (seleccionadas.length < 2) {
      setSeleccionadas([])
      return
    }

    // Armar la palabra seleccionada
    const letras = seleccionadas.map(([r, c]) => sopa.grid[r][c]).join('')
    const invertida = letras.split('').reverse().join('')

    // Verificar si coincide con alguna de las palabras buscadas
    const coincidencia = sopa.ubicaciones.find(
      (ub) => ub.palabra === letras || ub.palabra === invertida
    )

    if (coincidencia && !encontradas[coincidencia.palabra]) {
      const nuevas = { ...encontradas, [coincidencia.palabra]: true }
      setEncontradas(nuevas)
      if (Object.keys(nuevas).length === sopa.ubicaciones.length) {
        registrarActividad(modulo.id, 'sopa', 3)
        setTimeout(() => setMostrarVictoria(true), 600)
      }
    }
    setSeleccionadas([])
  }

  const reiniciar = () => {
    setEncontradas({})
    setSeleccionadas([])
    setMostrarVictoria(false)
  }

  const estaEnSeleccion = (r, c) => {
    return seleccionadas.some(([sr, sc]) => sr === r && sc === c)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 text-left select-none">
      <div className="flex items-center justify-between border-b-2 border-[#e6d7c3] pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8540a6]">
            Agilidad Visual y Léxica
          </span>
          <h2 className="text-2xl font-bold text-[#42230c]">Sopa de letras</h2>
          <p className="text-xs text-[#695d56]">
            Arrastra sobre las letras para encontrar las palabras del módulo.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-[#8c5835]">
            Encontradas: {Object.keys(encontradas).length} de {sopa.ubicaciones.length}
          </span>
          <div className="flex gap-1 mt-1 justify-end">
            {sopa.ubicaciones.map((ub, i) => (
              <div
                key={i}
                className={`w-3.5 h-2 rounded-full ${
                  encontradas[ub.palabra] ? 'bg-[#2e7d32]' : 'bg-[#e0cfb8]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Tablero de la Sopa */}
        <div className="md:col-span-2 bg-[#fffdfa] border-2 border-[#e0cfb8] rounded-2xl p-4 md:p-6 shadow-sm overflow-x-auto">
          <div
            className="inline-grid gap-1 md:gap-1.5 mx-auto p-2 bg-[#f6efe1] rounded-xl border border-[#decbb3]"
            style={{
              gridTemplateColumns: `repeat(${sopa.tam}, minmax(0, 1fr))`,
            }}
            onMouseLeave={finalizarSeleccion}
            onMouseUp={finalizarSeleccion}
          >
            {sopa.grid.map((fila, r) =>
              fila.map((letra, c) => {
                const encontrada = celdasEncontradas.has(clave(r, c))
                const seleccionada = estaEnSeleccion(r, c)

                let colorCelda = 'bg-white text-[#382f2a] hover:bg-[#fff7e6]'
                if (encontrada) {
                  colorCelda = 'bg-[#c8e6c9] text-[#1b5e20] font-black border-[#81c784]'
                }
                if (seleccionada) {
                  colorCelda = 'bg-[#bbdefb] text-[#0d47a1] font-black scale-105 shadow-xs'
                }

                return (
                  <button
                    key={clave(r, c)}
                    onMouseDown={() => iniciarSeleccion(r, c)}
                    onMouseEnter={() => moverSeleccion(r, c)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center font-bold text-sm md:text-base rounded-md border border-gray-200 cursor-pointer transition-all ${colorCelda}`}
                  >
                    {letra}
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Lista de palabras */}
        <div className="bg-[#fffdfa] border-2 border-[#e0cfb8] rounded-2xl p-4 md:p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#42230c] mb-3 flex items-center gap-1.5">
            <Icono name="Grid3x3" size={16} />
            <span>Palabras ocultas</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
            {sopa.ubicaciones.map((ub, idx) => {
              const estaLista = encontradas[ub.palabra]
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-sm font-semibold flex items-center justify-between border transition-all ${
                    estaLista
                      ? 'bg-[#e8f5e9] text-[#1b5e20] border-[#a5d6a7] line-through'
                      : 'bg-white text-[#54463d] border-[#e0cfb8]'
                  }`}
                >
                  <span className="capitalize">{ub.display}</span>
                  {estaLista && <Icono name="CheckCircle2" size={16} className="text-[#2e7d32]" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {mostrarVictoria && (
        <ModalVictoria
          estrellas={3}
          mensaje="¡Completaste toda la sopa de letras y encontraste cada término ortográfico!"
          onContinuar={onFinalizar}
          onRepetir={reiniciar}
        />
      )}
    </div>
  )
}

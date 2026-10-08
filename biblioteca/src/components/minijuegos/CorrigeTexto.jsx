import React, { useState } from 'react'
import { Icono } from '../common/Icono'
import { ModalVictoria } from '../common/ModalVictoria'
import { useProgreso } from '../../context/ProgresoContext'
import { analizarTextoCorrige } from '../../lib/juegos'

export function CorrigeTexto({ modulo, onFinalizar }) {
  const { registrarActividad } = useProgreso()
  const tokens = React.useMemo(() => analizarTextoCorrige(modulo.corrige), [modulo.corrige])

  const totalErrores = tokens.filter((t) => t.tipo === 'error').length
  const [corregidos, setCorregidos] = useState({}) // { [id]: true }
  const [palabrasFalladas, setPalabrasFalladas] = useState({}) // { [palabraIndex]: true }
  const [reglaActiva, setReglaActiva] = useState(null)
  const [mostrarVictoria, setMostrarVictoria] = useState(false)

  const corregidosCount = Object.keys(corregidos).length

  const handleTocarToken = (token, idx) => {
    if (token.tipo === 'error') {
      if (!corregidos[token.id]) {
        const nuevos = { ...corregidos, [token.id]: true }
        setCorregidos(nuevos)
        setReglaActiva({
          correcta: token.correcta,
          incorrecta: token.texto,
          regla: token.regla,
          tipo: 'acierto',
        })

        if (Object.keys(nuevos).length === totalErrores) {
          const fallos = Object.keys(palabrasFalladas).length
          const estrellas = fallos === 0 ? 3 : fallos <= 2 ? 2 : 1
          registrarActividad(modulo.id, 'corrige', estrellas)
          setTimeout(() => setMostrarVictoria(true), 900)
        }
      }
    } else if (token.tipo === 'palabra') {
      // Tocó una palabra que ya estaba correcta
      setPalabrasFalladas((f) => ({ ...f, [idx]: true }))
      setReglaActiva({
        correcta: token.texto,
        incorrecta: token.texto,
        regla: `«${token.texto}» ya está bien escrita. ¡Busca las palabras que tengan trampas ortográficas!`,
        tipo: 'advertencia',
      })
    }
  }

  const reiniciar = () => {
    setCorregidos({})
    setPalabrasFalladas({})
    setReglaActiva(null)
    setMostrarVictoria(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 text-left">
      <div className="flex items-center justify-between border-b-2 border-[#e6d7c3] pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1f8f72]">
            Taller del Corrector
          </span>
          <h2 className="text-2xl font-bold text-[#42230c]">Corrige el texto</h2>
          <p className="text-xs text-[#695d56]">
            Lee el párrafo y haz clic sobre las palabras mal escritas para arreglarlas.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-[#8c5835]">
            Errores corregidos: {corregidosCount} de {totalErrores}
          </span>
          <div className="flex gap-1.5 mt-1 justify-end">
            {Array.from({ length: totalErrores }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-2 rounded-full transition-all ${
                  i < corregidosCount ? 'bg-[#2e7d32]' : 'bg-[#e0cfb8]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Párrafo interactivo */}
      <div className="bg-[#fffdfa] border-2 border-[#e0cfb8] rounded-2xl p-6 md:p-8 shadow-sm mb-6 leading-loose text-lg md:text-xl text-[#382f2a]">
        {tokens.map((token, idx) => {
          if (token.tipo === 'espacio') {
            return <span key={idx}> </span>
          }
          if (token.tipo === 'signo') {
            return <span key={idx}>{token.texto}</span>
          }
          if (token.tipo === 'error') {
            const yaCorregido = corregidos[token.id]
            return (
              <button
                key={idx}
                onClick={() => handleTocarToken(token, idx)}
                className={`inline-block px-1.5 py-0.5 mx-0.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                  yaCorregido
                    ? 'bg-[#e8f5e9] border-[#2e7d32] text-[#1b5e20] line-through decoration-2 decoration-[#d9482f]'
                    : 'bg-[#fff0ed] border-[#ffab91] text-[#b71c1c] hover:bg-[#ffcdd2] underline decoration-wavy decoration-[#d9482f]'
                }`}
              >
                {yaCorregido ? (
                  <>
                    <span className="line-through opacity-60 text-xs mr-1">{token.texto}</span>
                    <span className="no-underline font-bold text-base">{token.correcta}</span>
                  </>
                ) : (
                  token.texto
                )}
              </button>
            )
          }

          // Palabra normal
          return (
            <button
              key={idx}
              onClick={() => handleTocarToken(token, idx)}
              className="inline-block px-1 py-0.5 rounded hover:bg-[#f5ebd7]/60 cursor-pointer transition-colors"
            >
              {token.texto}
            </button>
          )
        })}
      </div>

      {/* Panel de regla/detalle */}
      {reglaActiva && (
        <div
          className={`p-4 rounded-xl border animate-in fade-in flex items-start gap-3 ${
            reglaActiva.tipo === 'acierto'
              ? 'bg-[#e8f5e9] border-[#a5d6a7] text-[#1b5e20]'
              : 'bg-[#fff8e1] border-[#ffe082] text-[#795548]'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            <Icono
              name={reglaActiva.tipo === 'acierto' ? 'CheckCircle2' : 'HelpCircle'}
              size={20}
              className={reglaActiva.tipo === 'acierto' ? 'text-[#2e7d32]' : 'text-[#f57f17]'}
            />
          </div>
          <div>
            <div className="text-sm font-bold mb-0.5">
              {reglaActiva.tipo === 'acierto' ? (
                <span>
                  ¡Corregido! <strong className="underline">{reglaActiva.correcta}</strong>
                </span>
              ) : (
                <span>Esa palabra está bien</span>
              )}
            </div>
            <p className="text-xs leading-relaxed">{reglaActiva.regla}</p>
          </div>
        </div>
      )}

      {mostrarVictoria && (
        <ModalVictoria
          estrellas={Object.keys(palabrasFalladas).length === 0 ? 3 : 2}
          mensaje="¡Has encontrado y corregido todas las palabras del texto con éxito!"
          onContinuar={onFinalizar}
          onRepetir={reiniciar}
        />
      )}
    </div>
  )
}

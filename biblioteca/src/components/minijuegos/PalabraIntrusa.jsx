import React, { useState } from 'react'
import { Icono } from '../common/Icono'
import { ModalVictoria } from '../common/ModalVictoria'
import { useProgreso } from '../../context/ProgresoContext'

export function PalabraIntrusa({ modulo, onFinalizar }) {
  const { registrarActividad } = useProgreso()
  const { intrusa } = modulo
  const [indice, setIndice] = useState(0)
  const [seleccionada, setSeleccionada] = useState(null)
  const [respondido, setRespondido] = useState(false)
  const [erroresCometidos, setErroresCometidos] = useState(0)
  const [mostrarVictoria, setMostrarVictoria] = useState(false)

  const actual = intrusa[indice]

  const handleSeleccionar = (idx) => {
    if (respondido) return
    setSeleccionada(idx)
    setRespondido(true)
    if (idx !== actual.incorrecta) {
      setErroresCometidos((e) => e + 1)
    }
  }

  const handleSiguiente = () => {
    if (indice + 1 < intrusa.length) {
      setIndice((i) => i + 1)
      setSeleccionada(null)
      setRespondido(false)
    } else {
      const estrellas = erroresCometidos <= 1 ? 3 : erroresCometidos <= 3 ? 2 : 1
      registrarActividad(modulo.id, 'intrusa', estrellas)
      setMostrarVictoria(true)
    }
  }

  const reiniciar = () => {
    setIndice(0)
    setSeleccionada(null)
    setRespondido(false)
    setErroresCometidos(0)
    setMostrarVictoria(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 text-left">
      <div className="flex items-center justify-between border-b-2 border-[#e6d7c3] pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#d9482f]">
            Minijuego Ortográfico
          </span>
          <h2 className="text-2xl font-bold text-[#42230c]">La palabra intrusa</h2>
          <p className="text-xs text-[#695d56]">
            Una de las 4 opciones está mal escrita. ¡Encuéntrala y aprende por qué!
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-[#8c5835]">
            Ronda {indice + 1} de {intrusa.length}
          </span>
          <div className="flex gap-1 mt-1 justify-end">
            {intrusa.map((_, i) => (
              <div
                key={i}
                className={`w-4 h-2 rounded-full ${
                  i === indice ? 'bg-[#d9482f]' : i < indice ? 'bg-[#2e7d32]' : 'bg-[#e0cfb8]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#fffdfa] border-2 border-[#e0cfb8] rounded-2xl p-6 md:p-8 shadow-sm">
        <p className="text-sm font-semibold text-[#8c5835] mb-4">
          ¿Cuál de estas cuatro palabras tiene un error de ortografía?
        </p>

        {/* Tarjetas de palabras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {actual.opciones.map((palabra, idx) => {
            const estaSeleccionada = seleccionada === idx
            const esLaIntrusa = idx === actual.incorrecta

            let estilo = 'bg-white border-[#d6c4a5] text-[#382f2a] hover:bg-[#faf5eb]'
            if (respondido) {
              if (esLaIntrusa) {
                estilo = 'bg-[#e8f5e9] border-[#2e7d32] text-[#1b5e20] font-bold ring-2 ring-[#2e7d32]/30'
              } else if (estaSeleccionada) {
                estilo = 'bg-[#ffebee] border-[#c62828] text-[#c62828]'
              } else {
                estilo = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'
              }
            }

            return (
              <button
                key={idx}
                disabled={respondido}
                onClick={() => handleSeleccionar(idx)}
                className={`p-5 rounded-2xl border-2 text-center text-lg md:text-xl font-bold transition-all cursor-pointer flex items-center justify-between ${estilo}`}
              >
                <span className="flex-1 text-center">{palabra}</span>
                {respondido && esLaIntrusa && (
                  <Icono name="CheckCircle2" size={24} className="text-[#2e7d32]" />
                )}
                {respondido && estaSeleccionada && !esLaIntrusa && (
                  <Icono name="XCircle" size={24} className="text-[#c62828]" />
                )}
              </button>
            )
          })}
        </div>

        {/* Explicación de la regla */}
        {respondido && (
          <div className="bg-[#fff8e1] border border-[#ffe082] p-4 rounded-xl mb-6 animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-bold text-[#b78103] mb-1">
              <Icono name="SpellCheck" size={18} />
              <span>
                {seleccionada === actual.incorrecta ? '¡Excelente hallazgo!' : '¡Cuidado! Esa estaba bien.'}
              </span>
            </div>
            <p className="text-sm text-[#5d4037] mb-2">
              La palabra correcta es <strong className="text-[#1b5e20] underline">{actual.correcta}</strong>.
            </p>
            <p className="text-xs text-[#795548] bg-white/70 p-2.5 rounded-lg border border-[#ffecb3]">
              <strong>Regla:</strong> {actual.regla}
            </p>
          </div>
        )}

        {respondido && (
          <div className="flex justify-end">
            <button
              onClick={handleSiguiente}
              className="px-6 py-2.5 bg-[#d9482f] hover:bg-[#b53a24] text-white rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              <span>{indice + 1 < intrusa.length ? 'Siguiente ronda' : 'Ver resultados'}</span>
              <Icono name="ArrowRight" size={16} />
            </button>
          </div>
        )}
      </div>

      {mostrarVictoria && (
        <ModalVictoria
          estrellas={erroresCometidos <= 1 ? 3 : erroresCometidos <= 3 ? 2 : 1}
          mensaje={`Completaste las ${intrusa.length} rondas de detección de palabras.`}
          onContinuar={onFinalizar}
          onRepetir={reiniciar}
        />
      )}
    </div>
  )
}

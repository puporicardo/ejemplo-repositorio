import React, { useState } from 'react'
import { Icono } from '../common/Icono'
import { ModalVictoria } from '../common/ModalVictoria'
import { useProgreso } from '../../context/ProgresoContext'

export function LecturaComprensiva({ modulo, onFinalizar }) {
  const { registrarActividad } = useProgreso()
  const { lectura } = modulo
  const [paso, setPaso] = useState('leer') // 'leer' o 'preguntas'
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [seleccionada, setSeleccionada] = useState(null)
  const [respondido, setRespondido] = useState(false)
  const [aciertos, setAciertos] = useState(0)
  const [mostrarVictoria, setMostrarVictoria] = useState(false)

  const preg = lectura.preguntas[preguntaActual]

  const handleSeleccionar = (idx) => {
    if (respondido) return
    setSeleccionada(idx)
    setRespondido(true)
    if (idx === preg.correcta) {
      setAciertos((a) => a + 1)
    }
  }

  const handleSiguientePregunta = () => {
    if (preguntaActual + 1 < lectura.preguntas.length) {
      setPreguntaActual((p) => p + 1)
      setSeleccionada(null)
      setRespondido(false)
    } else {
      const estrellas = aciertos + (seleccionada === preg.correcta ? 1 : 0) >= 3 ? 3 : aciertos >= 2 ? 2 : 1
      registrarActividad(modulo.id, 'lectura', estrellas)
      setMostrarVictoria(true)
    }
  }

  const reiniciar = () => {
    setPaso('leer')
    setPreguntaActual(0)
    setSeleccionada(null)
    setRespondido(false)
    setAciertos(0)
    setMostrarVictoria(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 text-left">
      {/* Encabezado */}
      <div className="flex items-center justify-between border-b-2 border-[#e6d7c3] pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8c5835]">
            Lectura y Comprensión
          </span>
          <h2 className="text-2xl font-bold text-[#42230c]">{lectura.titulo}</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPaso('leer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              paso === 'leer'
                ? 'bg-[#8c5835] text-white border-[#633919]'
                : 'bg-white text-[#633919] border-[#d6c4a5] hover:bg-[#f5ebd7]'
            }`}
          >
            <Icono name="BookOpen" size={14} />
            Texto
          </button>
          <button
            onClick={() => setPaso('preguntas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              paso === 'preguntas'
                ? 'bg-[#8c5835] text-white border-[#633919]'
                : 'bg-white text-[#633919] border-[#d6c4a5] hover:bg-[#f5ebd7]'
            }`}
          >
            <Icono name="PencilLine" size={14} />
            Preguntas ({lectura.preguntas.length})
          </button>
        </div>
      </div>

      {paso === 'leer' ? (
        <div className="bg-[#fffdfa] border-2 border-[#e0cfb8] rounded-2xl p-6 md:p-8 shadow-sm">
          {lectura.verso && (
            <div className="bg-[#fcf8f0] border border-[#e0cfb8] p-4 rounded-xl mb-6 italic text-[#54463d] leading-relaxed text-base">
              {lectura.verso.map((v, i) => (
                <p key={i}>{v}</p>
              ))}
            </div>
          )}

          <div className="space-y-4 text-[#382f2a] text-base md:text-lg leading-relaxed">
            {lectura.parrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-[#eee2d3] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="text-xs text-[#8c786a] italic">{lectura.fuente}</span>
            <button
              onClick={() => setPaso('preguntas')}
              className="px-5 py-2.5 bg-[#2c59c9] hover:bg-[#2044a1] text-white rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              <span>¡Listo para responder!</span>
              <Icono name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#fffdfa] border-2 border-[#e0cfb8] rounded-2xl p-6 md:p-8 shadow-sm">
          {/* Progreso de preguntas */}
          <div className="flex items-center justify-between mb-4 text-xs font-bold text-[#8c5835]">
            <span>Pregunta {preguntaActual + 1} de {lectura.preguntas.length}</span>
            <div className="flex gap-1.5">
              {lectura.preguntas.map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-2 rounded-full ${
                    i === preguntaActual
                      ? 'bg-[#2c59c9]'
                      : i < preguntaActual
                      ? 'bg-[#2e7d32]'
                      : 'bg-[#e0cfb8]'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#42230c] mb-6">{preg.pregunta}</h3>

          <div className="space-y-3 mb-6">
            {preg.opciones.map((op, idx) => {
              const estaSeleccionada = seleccionada === idx
              const esCorrecta = idx === preg.correcta

              let estilo = 'bg-white border-[#d6c4a5] text-[#382f2a] hover:bg-[#faf5eb]'
              if (respondido) {
                if (esCorrecta) {
                  estilo = 'bg-[#e8f5e9] border-[#2e7d32] text-[#1b5e20] font-bold'
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
                  className={`w-full p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${estilo}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {respondido && esCorrecta ? (
                      <Icono name="CheckCircle2" size={20} className="text-[#2e7d32]" />
                    ) : respondido && estaSeleccionada ? (
                      <Icono name="XCircle" size={20} className="text-[#c62828]" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </div>
                    )}
                  </div>
                  <span className="text-base">{op}</span>
                </button>
              )
            })}
          </div>

          {respondido && (
            <div className="bg-[#f2f7ff] border border-[#bcd7ff] p-4 rounded-xl mb-6 animate-in fade-in">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1b439c] mb-1">
                <Icono name="BookOpen" size={16} />
                <span>Explicación ortográfica y de lectura</span>
              </div>
              <p className="text-sm text-[#2b4c7e]">{preg.explicacion}</p>
            </div>
          )}

          {respondido && (
            <div className="flex justify-end">
              <button
                onClick={handleSiguientePregunta}
                className="px-6 py-2.5 bg-[#8c5835] hover:bg-[#704223] text-white rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <span>
                  {preguntaActual + 1 < lectura.preguntas.length ? 'Siguiente Pregunta' : 'Finalizar Lectura'}
                </span>
                <Icono name="ArrowRight" size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {mostrarVictoria && (
        <ModalVictoria
          estrellas={aciertos === 3 ? 3 : aciertos >= 2 ? 2 : 1}
          mensaje={`Respondiste correctamente ${aciertos} de ${lectura.preguntas.length} preguntas.`}
          onContinuar={onFinalizar}
          onRepetir={reiniciar}
        />
      )}
    </div>
  )
}

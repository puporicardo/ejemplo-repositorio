import React, { useState } from 'react'
import { Icono } from '../common/Icono'
import { ModalVictoria } from '../common/ModalVictoria'
import { useProgreso } from '../../context/ProgresoContext'

export function CompletaPalabra({ modulo, onFinalizar }) {
  const { registrarActividad } = useProgreso()
  const { completa } = modulo
  const [indice, setIndice] = useState(0)
  const [seleccionada, setSeleccionada] = useState(null)
  const [respondido, setRespondido] = useState(false)
  const [errores, setErrores] = useState(0)
  const [mostrarVictoria, setMostrarVictoria] = useState(false)

  const actual = completa[indice]

  const handleOpcion = (op) => {
    if (respondido) return
    setSeleccionada(op)
    setRespondido(true)
    if (op !== actual.correcta) {
      setErrores((e) => e + 1)
    }
  }

  const handleSiguiente = () => {
    if (indice + 1 < completa.length) {
      setIndice((i) => i + 1)
      setSeleccionada(null)
      setRespondido(false)
    } else {
      const estrellas = errores <= 1 ? 3 : errores <= 3 ? 2 : 1
      registrarActividad(modulo.id, 'completa', estrellas)
      setMostrarVictoria(true)
    }
  }

  const reiniciar = () => {
    setIndice(0)
    setSeleccionada(null)
    setRespondido(false)
    setErrores(0)
    setMostrarVictoria(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 text-left">
      <div className="flex items-center justify-between border-b-2 border-[#e6d7c3] pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2c59c9]">
            Minijuego Ortográfico
          </span>
          <h2 className="text-2xl font-bold text-[#42230c]">Completa la palabra</h2>
          <p className="text-xs text-[#695d56]">Elige la letra o signo correcto para armar la palabra.</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-[#8c5835]">
            Pregunta {indice + 1} de {completa.length}
          </span>
          <div className="flex gap-1 mt-1 justify-end">
            {completa.map((_, i) => (
              <div
                key={i}
                className={`w-4 h-2 rounded-full ${
                  i === indice ? 'bg-[#2c59c9]' : i < indice ? 'bg-[#2e7d32]' : 'bg-[#e0cfb8]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#fffdfa] border-2 border-[#e0cfb8] rounded-2xl p-6 md:p-8 shadow-sm text-center">
        {/* Despliegue de la palabra incompleta o pregunta */}
        <div className="my-8 py-6 px-4 bg-[#fcf8f0] border-2 border-dashed border-[#d6c4a5] rounded-3xl inline-block min-w-[260px]">
          {actual.texto ? (
            <span className="text-3xl md:text-5xl font-extrabold tracking-wider text-[#382f2a]">
              {actual.texto.split('_').map((fragmento, i, arr) => (
                <React.Fragment key={i}>
                  {fragmento}
                  {i < arr.length - 1 && (
                    <span
                      className={`inline-block px-3 py-1 mx-1 border-2 rounded-lg min-w-[40px] shadow-xs ${
                        respondido
                          ? seleccionada === actual.correcta
                            ? 'bg-[#e8f5e9] border-[#2e7d32] text-[#2e7d32]'
                            : 'bg-[#ffebee] border-[#c62828] text-[#c62828]'
                          : 'bg-white border-[#2c59c9] text-[#2c59c9]'
                      }`}
                    >
                      {respondido ? actual.correcta : '?'}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </span>
          ) : (
            <span className="text-xl md:text-2xl font-bold text-[#382f2a]">{actual.pregunta}</span>
          )}
        </div>

        {/* Opciones */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {actual.opciones.map((op, idx) => {
            const esCorrecta = op === actual.correcta
            const fueSeleccionada = seleccionada === op

            let estilo = 'bg-white border-[#d6c4a5] text-[#382f2a] hover:bg-[#faf5eb]'
            if (respondido) {
              if (esCorrecta) {
                estilo = 'bg-[#e8f5e9] border-[#2e7d32] text-[#1b5e20] ring-2 ring-[#2e7d32]/30'
              } else if (fueSeleccionada) {
                estilo = 'bg-[#ffebee] border-[#c62828] text-[#c62828]'
              } else {
                estilo = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'
              }
            }

            return (
              <button
                key={idx}
                disabled={respondido}
                onClick={() => handleOpcion(op)}
                className={`min-w-[100px] px-6 py-4 rounded-2xl border-2 text-xl font-bold transition-transform cursor-pointer hover:scale-105 active:scale-95 shadow-sm ${estilo}`}
              >
                {op}
              </button>
            )
          })}
        </div>

        {/* Retroalimentación formativa */}
        {respondido && (
          <div className="text-left bg-[#eef4ff] border border-[#bcd7ff] p-4 rounded-xl mb-6 max-w-xl mx-auto animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1b439c] mb-1">
              <Icono name={seleccionada === actual.correcta ? 'CheckCircle2' : 'HelpCircle'} size={18} />
              <span>
                {seleccionada === actual.correcta ? '¡Exacto!' : '¡No te preocupes, así aprendemos!'}
              </span>
            </div>
            <p className="text-xs text-[#2b4c7e] leading-relaxed">
              <strong>Regla:</strong> {actual.regla}
            </p>
          </div>
        )}

        {respondido && (
          <div className="flex justify-end max-w-xl mx-auto">
            <button
              onClick={handleSiguiente}
              className="px-6 py-2.5 bg-[#2c59c9] hover:bg-[#2044a1] text-white rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              <span>{indice + 1 < completa.length ? 'Siguiente palabra' : 'Finalizar reto'}</span>
              <Icono name="ArrowRight" size={16} />
            </button>
          </div>
        )}
      </div>

      {mostrarVictoria && (
        <ModalVictoria
          estrellas={errores <= 1 ? 3 : errores <= 3 ? 2 : 1}
          mensaje={`Completaste las ${completa.length} palabras del módulo.`}
          onContinuar={onFinalizar}
          onRepetir={reiniciar}
        />
      )}
    </div>
  )
}

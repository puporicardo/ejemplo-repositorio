import React from 'react'
import { Icono } from './common/Icono'
import { useProgreso } from '../context/ProgresoContext'

export function FichaLector({ onCerrar }) {
  const { progreso, reiniciarProgreso } = useProgreso()

  const niveles = [
    { sellos: 0, titulo: 'Lector Aprendiz', color: '#8c5835' },
    { sellos: 6, titulo: 'Explorador de Letras', color: '#1f8f72' },
    { sellos: 15, titulo: 'Guardián del Diccionario', color: '#2c59c9' },
    { sellos: 30, titulo: 'Maestro de la Ortografía', color: '#d9482f' },
    { sellos: 48, titulo: 'Gran Sabio de la Biblioteca Rinrín', color: '#8540a6' },
  ]

  const nivelActual =
    [...niveles].reverse().find((n) => progreso.totalSellos >= n.sellos) || niveles[0]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-[#fffcf7] border-4 border-[#8c5835] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left animate-in fade-in zoom-in-95">
        <button
          onClick={onCerrar}
          className="absolute top-4 right-4 p-2 text-[#8c5835] hover:bg-[#8c5835]/10 rounded-full cursor-pointer transition-colors"
          title="Cerrar ficha"
        >
          <Icono name="XCircle" size={24} />
        </button>

        {/* Encabezado Ficha tipo Biblioteca */}
        <div className="border-b-2 border-dashed border-[#d6c4a5] pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8c5835]">
            <Icono name="Bookmark" size={16} />
            <span>Biblioteca Escolar de Lenguaje · Grado 5.°</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#42230c] mt-1">
            Ficha de Préstamo y Logros
          </h2>
        </div>

        {/* Datos del lector */}
        <div className="bg-[#f7efe1] p-4 rounded-2xl border border-[#e3d3bd] mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#8c5835]">Rango actual:</span>
            <h3 className="text-lg font-black text-[#42230c] flex items-center gap-2">
              <Icono name="Award" size={20} color={nivelActual.color} />
              <span>{nivelActual.titulo}</span>
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-[#8c5835]">Estrellas acumuladas:</span>
            <div className="text-xl font-black text-[#f59f00] flex items-center gap-1 justify-end">
              <Icono name="Star" size={20} />
              <span>{progreso.totalEstrellas}</span>
            </div>
          </div>
        </div>

        {/* Cuadrícula de Sellos coleccionables */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#695d56]">
              Sellos de lectura y minijuegos ({progreso.totalSellos} conseguidos)
            </h4>
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 p-3 bg-[#fdfbf7] border-2 border-[#e6d7c3] rounded-2xl max-h-48 overflow-y-auto">
            {Array.from({ length: 48 }).map((_, i) => {
              const tieneSello = i < progreso.totalSellos
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-xl border flex items-center justify-center transition-all ${
                    tieneSello
                      ? 'bg-[#e8f5e9] border-[#2e7d32] text-[#2e7d32] shadow-xs'
                      : 'bg-[#f5ebd7]/40 border-dashed border-[#d6c4a5] text-[#b09e86]'
                  }`}
                  title={tieneSello ? `Sello de mérito #${i + 1}` : 'Por desbloquear'}
                >
                  <Icono name={tieneSello ? 'CheckCircle2' : 'Bookmark'} size={16} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Pie y acciones */}
        <div className="flex items-center justify-between pt-4 border-t border-[#eee2d3]">
          <button
            onClick={() => {
              if (window.confirm('¿Seguro que deseas reiniciar tu progreso en este navegador?')) {
                reiniciarProgreso()
              }
            }}
            className="text-xs text-[#a94442] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Icono name="RotateCcw" size={14} />
            Reiniciar progreso
          </button>

          <button
            onClick={onCerrar}
            className="px-6 py-2 bg-[#8c5835] hover:bg-[#704223] text-white rounded-xl font-bold text-sm cursor-pointer shadow-sm"
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  )
}

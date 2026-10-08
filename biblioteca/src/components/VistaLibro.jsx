import React, { useState } from 'react'
import { Icono } from './common/Icono'
import { ACTIVIDADES } from '../data/modulos'
import { useProgreso } from '../context/ProgresoContext'
import { LecturaComprensiva } from './minijuegos/LecturaComprensiva'
import { PalabraIntrusa } from './minijuegos/PalabraIntrusa'
import { CompletaPalabra } from './minijuegos/CompletaPalabra'
import { CorrigeTexto } from './minijuegos/CorrigeTexto'
import { SopaLetras } from './minijuegos/SopaLetras'
import { Crucigrama } from './minijuegos/Crucigrama'

export function VistaLibro({ modulo, onVolver }) {
  const { progreso } = useProgreso()
  const [actividadActiva, setActividadActiva] = useState('lectura')
  const [mostrarReglas, setMostrarReglas] = useState(false)

  const modProgreso = progreso.modulos[modulo.id] || {}

  return (
    <div className="min-h-screen bg-[#fbf7ee] pb-16">
      {/* Barra superior del Libro Abierto */}
      <header className="sticky top-0 z-40 bg-[#fffdfa]/95 backdrop-blur-xs border-b-2 border-[#e6d7c3] px-4 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onVolver}
              className="p-2 rounded-xl border border-[#d6c4a5] hover:bg-[#f5ebd7] text-[#633919] font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Icono name="ArrowLeft" size={18} />
              <span className="hidden sm:inline">Regresar al estante</span>
            </button>
            <div className="h-6 w-px bg-[#e6d7c3]" />
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border border-black/20"
                style={{ backgroundColor: modulo.color }}
              />
              <span className="font-extrabold text-[#42230c] text-sm sm:text-base">
                Libro: {modulo.titulo}
              </span>
              <span className="hidden md:inline text-xs text-[#8c5835] italic">
                — {modulo.lema}
              </span>
            </div>
          </div>

          <button
            onClick={() => setMostrarReglas(!mostrarReglas)}
            className="px-3 py-1.5 bg-[#f5ebd7] hover:bg-[#ecdcc3] text-[#633919] border border-[#d6c4a5] rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Icono name="BookOpen" size={16} />
            <span>Reglas RAE del libro</span>
          </button>
        </div>
      </header>

      {/* Menú de pestañas de los 6 Minijuegos */}
      <nav className="bg-[#f5ebd7]/60 border-b border-[#e6d7c3] py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {ACTIVIDADES.map((act) => {
            const estaActiva = actividadActiva === act.id
            const completada = modProgreso[act.id]?.completado
            const estrellas = modProgreso[act.id]?.estrellas || 0

            return (
              <button
                key={act.id}
                onClick={() => setActividadActiva(act.id)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                  estaActiva
                    ? 'bg-[#42230c] text-white border-[#2c1505] shadow-xs'
                    : 'bg-white text-[#54463d] border-[#e0cfb8] hover:bg-[#faf5eb]'
                }`}
              >
                <Icono name={act.icono} size={16} />
                <span>{act.nombre}</span>
                {completada && (
                  <span className="flex items-center text-[#f59f00]">
                    <Icono name="Star" size={13} />
                    <span className="text-[11px] ml-0.5 text-current font-extrabold">{estrellas}</span>
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Modal o Panel desplegable con las Reglas RAE del libro */}
      {mostrarReglas && (
        <div className="max-w-4xl mx-auto my-4 p-4 sm:p-6 bg-[#fffcf7] border-2 border-[#8c5835] rounded-2xl shadow-md text-left animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#e6d7c3] mb-4">
            <h3 className="text-lg font-bold text-[#42230c] flex items-center gap-2">
              <Icono name="SpellCheck" size={20} color="#8c5835" />
              <span>Reglas ortográficas del módulo: {modulo.titulo}</span>
            </h3>
            <button
              onClick={() => setMostrarReglas(false)}
              className="text-[#8c5835] hover:bg-[#8c5835]/10 p-1.5 rounded-lg cursor-pointer"
            >
              <Icono name="XCircle" size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modulo.reglas.map((r, i) => (
              <div key={i} className="p-3 bg-[#fbf7ee] rounded-xl border border-[#e6d7c3]">
                <h4 className="text-xs font-bold text-[#633919] mb-1">{r.titulo}</h4>
                <div className="flex flex-wrap gap-1">
                  {r.ejemplos.map((ej, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-0.5 bg-white border border-[#d6c4a5] rounded-md font-medium text-[#42230c]"
                    >
                      {ej}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contenedor del Minijuego Activo */}
      <main className="max-w-5xl mx-auto mt-6 px-4">
        {actividadActiva === 'lectura' && (
          <LecturaComprensiva
            modulo={modulo}
            onFinalizar={() => setActividadActiva('intrusa')}
          />
        )}
        {actividadActiva === 'intrusa' && (
          <PalabraIntrusa
            modulo={modulo}
            onFinalizar={() => setActividadActiva('completa')}
          />
        )}
        {actividadActiva === 'completa' && (
          <CompletaPalabra
            modulo={modulo}
            onFinalizar={() => setActividadActiva('corrige')}
          />
        )}
        {actividadActiva === 'corrige' && (
          <CorrigeTexto
            modulo={modulo}
            onFinalizar={() => setActividadActiva('sopa')}
          />
        )}
        {actividadActiva === 'sopa' && (
          <SopaLetras
            modulo={modulo}
            onFinalizar={() => setActividadActiva('crucigrama')}
          />
        )}
        {actividadActiva === 'crucigrama' && (
          <Crucigrama
            modulo={modulo}
            onFinalizar={onVolver}
          />
        )}
      </main>
    </div>
  )
}

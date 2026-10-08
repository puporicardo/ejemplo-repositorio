import React, { useState } from 'react'
import { Icono } from './components/common/Icono'
import { MODULOS, PROXIMOS } from './data/modulos'
import { ProgresoProvider, useProgreso } from './context/ProgresoContext'
import { EstanteriaLibros } from './components/EstanteriaLibros'
import { VistaLibro } from './components/VistaLibro'
import { FichaLector } from './components/FichaLector'
import { ModalIngreso } from './components/ModalIngreso'

function ContenidoPrincipal() {
  const { estudiante, progreso, sincronizando } = useProgreso()
  const [moduloSeleccionado, setModuloSeleccionado] = useState(null)
  const [mostrarFicha, setMostrarFicha] = useState(false)
  const [mostrarIngreso, setMostrarIngreso] = useState(!estudiante)

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7ee]">
      {/* Encabezado Principal */}
      <header className="bg-[#42230c] text-[#fffdf9] border-b-4 border-[#2c1505] shadow-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f5ebd7] text-[#42230c] flex items-center justify-center shadow-xs">
              <Icono name="BookOpen" size={24} />
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                Biblioteca Rinrín
              </h1>
              <p className="text-[11px] sm:text-xs text-[#d6c4a5] font-medium">
                Minijuegos de Ortografía y Lectura · 5.° de Primaria
              </p>
            </div>
          </div>

          {/* Ficha rápida de lector, usuario y estrellas */}
          <div className="flex items-center gap-2 sm:gap-3">
            {estudiante ? (
              <div
                onClick={() => setMostrarFicha(true)}
                className="hidden sm:flex items-center gap-2 bg-[#2c1505]/70 hover:bg-[#2c1505] px-3 py-1.5 rounded-xl border border-[#8c5835]/50 cursor-pointer transition-colors"
                title="Ver mi progreso detallado"
              >
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-[#d6c4a5] block leading-none">
                    Lector:
                  </span>
                  <span className="text-xs font-bold text-white leading-tight">
                    {estudiante.nombre} {estudiante.apellido}
                  </span>
                </div>
                <div className="h-5 w-px bg-[#8c5835]/80" />
                <div className="flex items-center gap-1 text-[#f59f00] font-black text-xs">
                  <Icono name="Star" size={14} />
                  <span>{progreso.totalEstrellas}</span>
                </div>
                <div className="flex items-center gap-1 text-[#81c784] font-black text-xs">
                  <Icono name="Award" size={14} />
                  <span>{progreso.totalSellos}</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setMostrarIngreso(true)}
                className="px-3 py-1.5 bg-[#f5ebd7]/20 hover:bg-[#f5ebd7]/30 text-[#f5ebd7] rounded-xl text-xs font-bold flex items-center gap-1.5 border border-[#8c5835] cursor-pointer"
              >
                <Icono name="Bookmark" size={14} />
                <span>Ingresar nombre</span>
              </button>
            )}

            <button
              onClick={() => {
                if (!estudiante) setMostrarIngreso(true)
                else setMostrarFicha(true)
              }}
              className="px-3.5 py-2 bg-[#f5ebd7] hover:bg-[#fff9ed] text-[#42230c] rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xs cursor-pointer transition-all hover:scale-105"
            >
              <Icono name="Bookmark" size={16} />
              <span>{estudiante ? 'Mi Ficha' : 'Ingresar'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Dinámico: Estantería o Libro Abierto */}
      {moduloSeleccionado ? (
        <VistaLibro
          modulo={moduloSeleccionado}
          onVolver={() => setModuloSeleccionado(null)}
        />
      ) : (
        <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full text-left">
          {/* Banner de Bienvenida pedagógico */}
          <div className="bg-[#fffdfa] border-2 border-[#e0cfb8] rounded-3xl p-6 sm:p-8 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8c5835] flex items-center gap-1.5">
                <Icono name="Sparkles" size={14} />
                <span>Sala infantil de lectura y ortografía colombiana</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#42230c] mt-1 mb-2">
                {estudiante
                  ? `¡Hola, ${estudiante.nombre}! Tus libros te esperan.`
                  : '¡Bienvenido a la Biblioteca de Letras!'}
              </h2>
              <p className="text-sm sm:text-base text-[#54463d] leading-relaxed">
                Elige cualquiera de los libros del estante para descubrir relatos de la literatura colombiana y tradicional, y supera los 6 minijuegos: sopa de letras, crucigramas, corrector de textos, adivinar la palabra intrusa y completar oraciones. Tu avance se guarda automáticamente en la base de datos con tu nombre.
              </p>
            </div>
            <div className="bg-[#f5ebd7] p-4 rounded-2xl border border-[#d6c4a5] shrink-0 text-center w-full md:w-auto">
              <span className="text-xs font-bold text-[#8c5835] block">Módulos disponibles</span>
              <span className="text-3xl font-black text-[#42230c]">{MODULOS.length}</span>
              <span className="text-[11px] text-[#695d56] block mt-0.5">8 libros en estante</span>
            </div>
          </div>

          {/* Los Estantes de Libros */}
          <EstanteriaLibros
            modulos={MODULOS}
            proximos={PROXIMOS}
            onSeleccionarModulo={(mod) => setModuloSeleccionado(mod)}
          />
        </main>
      )}

      {/* Modales: Ficha de Lector o Ingreso de Estudiante */}
      {mostrarFicha && (
        <FichaLector
          onCerrar={() => setMostrarFicha(false)}
          onCambiarEstudiante={() => {
            setMostrarFicha(false)
            setMostrarIngreso(true)
          }}
        />
      )}

      {mostrarIngreso && (
        <ModalIngreso onCerrar={() => setMostrarIngreso(false)} />
      )}

      {/* Pie de página con rigor pedagógico */}
      <footer className="bg-[#ecdcc3] border-t-2 border-[#d6c4a5] py-6 px-4 text-center text-xs text-[#695d56] mt-auto">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-[#42230c]">
            Biblioteca Rinrín · Plataforma didáctica para quinto grado de primaria
          </p>
          <p>
            Basada en la <em>Ortografía de la lengua española</em> (RAE y ASALE) y en los Estándares Básicos de Competencias del Ministerio de Educación Nacional de Colombia (MEN).
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <ProgresoProvider>
      <ContenidoPrincipal />
    </ProgresoProvider>
  )
}

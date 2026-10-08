import React from 'react'
import { Icono } from './common/Icono'
import { useProgreso } from '../context/ProgresoContext'

export function EstanteriaLibros({ modulos, proximos, onSeleccionarModulo }) {
  const { obtenerInfoModulo } = useProgreso()

  // Dividir los módulos en estantes de 4 libros cada uno
  const estante1 = modulos.slice(0, 4)
  const estante2 = modulos.slice(4, 8)

  return (
    <div className="space-y-12 my-6">
      {/* Estante Superior */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-2 text-xs font-bold uppercase tracking-wider text-[#8c5835]">
          <Icono name="Bookmark" size={14} />
          <span>Estante 1: Reglas de Letras y Grafías</span>
        </div>
        <div className="madera-fondo p-4 sm:p-6 rounded-t-3xl shadow-inner">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-end min-h-[220px]">
            {estante1.map((mod) => {
              const info = obtenerInfoModulo(mod.id)
              return (
                <button
                  key={mod.id}
                  onClick={() => onSeleccionarModulo(mod)}
                  className="lomo-libro group relative text-left cursor-pointer flex flex-col justify-between p-4 rounded-xl border-2 border-black/20 shadow-lg"
                  style={{
                    backgroundColor: mod.color,
                    color: mod.tinta,
                    minHeight: '210px',
                  }}
                >
                  {/* Encabezado del lomo */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                        <Icono name={mod.icono} size={18} color={mod.tinta} />
                      </div>
                      <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-full bg-black/20">
                        {info.actividadesCompletadas}/6
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black leading-tight tracking-tight drop-shadow-xs">
                      {mod.titulo}
                    </h3>
                    <p className="text-xs opacity-90 font-medium mt-1 line-clamp-2">
                      {mod.lema}
                    </p>
                  </div>

                  {/* Pie del lomo con estrellas */}
                  <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                      Abrir libro
                    </span>
                    <div className="flex items-center gap-1 font-bold text-xs">
                      <Icono name="Star" size={13} color="#f59f00" />
                      <span>{info.estrellasModulo}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
        {/* Balda de madera */}
        <div className="madera-estante h-7 rounded-b-xl" />
      </div>

      {/* Estante Inferior */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-2 text-xs font-bold uppercase tracking-wider text-[#8c5835]">
          <Icono name="Bookmark" size={14} />
          <span>Estante 2: Tildes, Puntuación y Palabras Dudadas</span>
        </div>
        <div className="madera-fondo p-4 sm:p-6 rounded-t-3xl shadow-inner">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-end min-h-[220px]">
            {estante2.map((mod) => {
              const info = obtenerInfoModulo(mod.id)
              return (
                <button
                  key={mod.id}
                  onClick={() => onSeleccionarModulo(mod)}
                  className="lomo-libro group relative text-left cursor-pointer flex flex-col justify-between p-4 rounded-xl border-2 border-black/20 shadow-lg"
                  style={{
                    backgroundColor: mod.color,
                    color: mod.tinta,
                    minHeight: '210px',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                        <Icono name={mod.icono} size={18} color={mod.tinta} />
                      </div>
                      <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-full bg-black/20">
                        {info.actividadesCompletadas}/6
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black leading-tight tracking-tight drop-shadow-xs">
                      {mod.titulo}
                    </h3>
                    <p className="text-xs opacity-90 font-medium mt-1 line-clamp-2">
                      {mod.lema}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                      Abrir libro
                    </span>
                    <div className="flex items-center gap-1 font-bold text-xs">
                      <Icono name="Star" size={13} color="#f59f00" />
                      <span>{info.estrellasModulo}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
        {/* Balda de madera */}
        <div className="madera-estante h-7 rounded-b-xl" />
      </div>

      {/* Estante de Próximos Volúmenes */}
      {proximos && proximos.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 px-2 text-xs font-bold uppercase tracking-wider text-[#8c5835]">
            <Icono name="Compass" size={14} />
            <span>Nuevos Libros en Catalogación (Próximamente)</span>
          </div>
          <div className="madera-fondo p-4 sm:p-6 rounded-t-3xl opacity-80 shadow-inner">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 items-end min-h-[140px]">
              {proximos.map((prox, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border-2 border-dashed border-[#8c5835]/40 flex flex-col justify-between"
                  style={{
                    backgroundColor: prox.color,
                    minHeight: '130px',
                  }}
                >
                  <div>
                    <div className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center mb-2">
                      <Icono name="Lock" size={14} className="text-[#633919]" />
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-[#42230c]">
                      {prox.titulo}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#633919]/70">
                    En preparación
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="madera-estante h-6 rounded-b-xl" />
        </div>
      )}
    </div>
  )
}

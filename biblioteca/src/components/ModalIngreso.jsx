import React, { useState } from 'react'
import { Icono } from './common/Icono'
import { useProgreso } from '../context/ProgresoContext'

export function ModalIngreso({ onCerrar }) {
  const { identificarEstudiante, cargando } = useProgreso()
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nombre.trim() || !apellido.trim()) {
      setError('Por favor escribe tu nombre y tu apellido.')
      return
    }
    setError('')
    const res = await identificarEstudiante(nombre, apellido)
    if (res.error) {
      setError(res.error)
    } else {
      if (onCerrar) onCerrar()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-[#fffcf7] border-4 border-[#8c5835] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-left animate-in fade-in zoom-in-95">
        {onCerrar && (
          <button
            onClick={onCerrar}
            className="absolute top-4 right-4 p-2 text-[#8c5835] hover:bg-[#8c5835]/10 rounded-full cursor-pointer transition-colors"
          >
            <Icono name="XCircle" size={24} />
          </button>
        )}

        <div className="w-16 h-16 mx-auto mb-4 bg-[#f5ebd7] border-2 border-[#8c5835] text-[#8c5835] rounded-2xl flex items-center justify-center shadow-xs">
          <Icono name="Bookmark" size={32} />
        </div>

        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8c5835]">
            Biblioteca Rinrín · Quinto de Primaria
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#42230c] mt-1">
            Tu Ficha de Lector
          </h2>
          <p className="text-xs sm:text-sm text-[#695d56] mt-2">
            Ingresa con tu <strong>nombre y apellido</strong> para guardar tus estrellas, sellos y continuar tu avance desde cualquier dispositivo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#633919] mb-1.5">
              Tu Nombre
            </label>
            <input
              type="text"
              required
              placeholder="Ejemplo: Mariana"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#d6c4a5] bg-[#fffdfa] text-[#42230c] font-semibold text-base focus:border-[#8c5835] focus:outline-none transition-all shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#633919] mb-1.5">
              Tu Apellido
            </label>
            <input
              type="text"
              required
              placeholder="Ejemplo: Gómez"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#d6c4a5] bg-[#fffdfa] text-[#42230c] font-semibold text-base focus:border-[#8c5835] focus:outline-none transition-all shadow-inner"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[#ffebee] border border-[#ffcdd2] text-[#c62828] text-xs font-semibold flex items-center gap-2">
              <Icono name="XCircle" size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={cargando}
              className="w-full py-3.5 bg-[#8c5835] hover:bg-[#704223] active:scale-98 text-white rounded-xl font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
            >
              {cargando ? (
                <span>Buscando en la biblioteca...</span>
              ) : (
                <>
                  <Icono name="Bookmark" size={20} />
                  <span>Abrir mi progreso</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#eee2d3] text-center">
          <p className="text-[11px] text-[#8c786a] italic">
            Sin contraseñas difíciles. Cada vez que vuelvas y escribas tu nombre y apellido, encontrarás todos tus libros y sellos tal como los dejaste.
          </p>
        </div>
      </div>
    </div>
  )
}

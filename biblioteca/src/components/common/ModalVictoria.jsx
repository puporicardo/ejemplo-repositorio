import React, { useState } from 'react'
import { Icono } from '../common/Icono'

export function ModalVictoria({ estrellas = 3, mensaje = '¡Bien hecho!', onContinuar, onRepetir }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-[#fffdf9] border-4 border-[#8c5835] rounded-3xl max-w-md w-full p-6 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 mx-auto mb-3 bg-[#e8f5e9] border-2 border-[#2e7d32] text-[#2e7d32] rounded-full flex items-center justify-center">
          <Icono name="Award" size={36} />
        </div>

        <h3 className="text-2xl font-bold text-[#42230c] mb-1">¡Misión Cumplida!</h3>
        <p className="text-[#695d56] text-sm mb-4">{mensaje}</p>

        {/* Estrellas ganadas */}
        <div className="flex justify-center items-center gap-2 mb-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`p-2 rounded-2xl border-2 transition-all duration-300 ${
                num <= estrellas
                  ? 'bg-[#fff9db] border-[#f59f00] text-[#f59f00] scale-110'
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}
            >
              <Icono name="Star" size={28} />
            </div>
          ))}
        </div>

        {/* Sellos de lector */}
        <div className="bg-[#f5ebd7] p-3 rounded-xl border border-[#d6c4a5] mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-[#633919]">
          <Icono name="Sparkles" size={16} />
          <span>¡Nuevo sello agregado a tu ficha de lector!</span>
        </div>

        <div className="flex gap-3 justify-center">
          {onRepetir && (
            <button
              onClick={onRepetir}
              className="px-4 py-2.5 rounded-xl border-2 border-[#8c5835] text-[#8c5835] hover:bg-[#8c5835]/10 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Icono name="RotateCcw" size={16} />
              Reintentar
            </button>
          )}
          <button
            onClick={onContinuar}
            className="px-6 py-2.5 rounded-xl bg-[#2e7d32] hover:bg-[#256629] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          >
            <span>Continuar</span>
            <Icono name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

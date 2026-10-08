import React, { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'rinrin_biblioteca_progreso_v1'

const ProgresoContext = createContext(null)

export function ProgresoProvider({ children }) {
  const [progreso, setProgreso] = useState(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY)
      if (guardado) return JSON.parse(guardado)
    } catch (e) {
      console.error('Error leyendo progreso de localStorage:', e)
    }
    return {
      // modulos: { [moduloId]: { [actividadId]: { completado: boolean, estrellas: number, fecha: string } } }
      modulos: {},
      totalSellos: 0,
      totalEstrellas: 0,
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso))
    } catch (e) {
      console.error('Error guardando progreso:', e)
    }
  }, [progreso])

  const registrarActividad = (moduloId, actividadId, estrellas = 3) => {
    setProgreso((prev) => {
      const moduloActual = prev.modulos[moduloId] || {}
      const actPrevia = moduloActual[actividadId]

      // Si ya tenía estrellas, guardamos el máximo obtenido
      const estrellasFinal = Math.max(actPrevia?.estrellas || 0, estrellas)
      const eraNuevo = !actPrevia?.completado

      const nuevoModulo = {
        ...moduloActual,
        [actividadId]: {
          completado: true,
          estrellas: estrellasFinal,
          fecha: new Date().toISOString(),
        },
      }

      const nuevosModulos = {
        ...prev.modulos,
        [moduloId]: nuevoModulo,
      }

      // Recalcular métricas globales
      let estrellasTotales = 0
      let sellosTotales = 0

      Object.values(nuevosModulos).forEach((mod) => {
        Object.values(mod).forEach((act) => {
          if (act.completado) {
            sellosTotales += 1
            estrellasTotales += act.estrellas || 0
          }
        })
      })

      return {
        modulos: nuevosModulos,
        totalSellos: sellosTotales,
        totalEstrellas: estrellasTotales,
      }
    })
  }

  const reiniciarProgreso = () => {
    const inicial = { modulos: {}, totalSellos: 0, totalEstrellas: 0 }
    setProgreso(inicial)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {}
  }

  const obtenerInfoModulo = (moduloId) => {
    const mod = progreso.modulos[moduloId] || {}
    const actividadesCompletadas = Object.values(mod).filter((a) => a.completado).length
    const estrellasModulo = Object.values(mod).reduce((acc, a) => acc + (a.estrellas || 0), 0)
    return {
      actividadesCompletadas,
      estrellasModulo,
      completado: actividadesCompletadas >= 6, // 6 minijuegos por módulo
    }
  }

  return (
    <ProgresoContext.Provider
      value={{
        progreso,
        registrarActividad,
        reiniciarProgreso,
        obtenerInfoModulo,
      }}
    >
      {children}
    </ProgresoContext.Provider>
  )
}

export function useProgreso() {
  const ctx = useContext(ProgresoContext)
  if (!ctx) throw new Error('useProgreso debe usarse dentro de ProgresoProvider')
  return ctx
}

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ESTUDIANTE_KEY = 'rinrin_biblioteca_estudiante_v1'
const LOCAL_PROGRESO_PREFIX = 'rinrin_progreso_'

const ProgresoContext = createContext(null)

export function ProgresoProvider({ children }) {
  // Estudiante activo: { id, nombre, apellido } o null si aún no se ha identificado
  const [estudiante, setEstudiante] = useState(() => {
    try {
      const guardado = localStorage.getItem(ESTUDIANTE_KEY)
      if (guardado) return JSON.parse(guardado)
    } catch (e) {
      console.error('Error leyendo estudiante de localStorage:', e)
    }
    return null
  })

  // Progreso en memoria del estudiante actual
  const [progreso, setProgreso] = useState({
    modulos: {},
    totalSellos: 0,
    totalEstrellas: 0,
  })

  const [cargando, setCargando] = useState(false)
  const [sincronizando, setSincronizando] = useState(false)

  // Cargar progreso cuando cambia el estudiante
  useEffect(() => {
    if (!estudiante) {
      // Si no hay estudiante, mostrar estado inicial en blanco
      setProgreso({ modulos: {}, totalSellos: 0, totalEstrellas: 0 })
      return
    }

    const cargarProgresoEstudiante = async () => {
      setCargando(true)

      // 1. Intentar cargar desde caché local para respuesta instantánea
      const cacheKey = `${LOCAL_PROGRESO_PREFIX}${estudiante.id}`
      try {
        const local = localStorage.getItem(cacheKey)
        if (local) {
          setProgreso(JSON.parse(local))
        }
      } catch (e) {}

      // 2. Cargar datos frescos desde Supabase
      try {
        const { data, error } = await supabase
          .from('progreso_actividades')
          .select('*')
          .eq('estudiante_id', estudiante.id)

        if (!error && data) {
          const modulos = {}
          let totalSellos = 0
          let totalEstrellas = 0

          data.forEach((fila) => {
            if (!modulos[fila.modulo_id]) {
              modulos[fila.modulo_id] = {}
            }
            modulos[fila.modulo_id][fila.actividad_id] = {
              completado: fila.completado,
              estrellas: fila.estrellas,
              fecha: fila.updated_at,
            }
            if (fila.completado) {
              totalSellos += 1
              totalEstrellas += fila.estrellas || 0
            }
          })

          const progresoFinal = { modulos, totalSellos, totalEstrellas }
          setProgreso(progresoFinal)
          localStorage.setItem(cacheKey, JSON.stringify(progresoFinal))
        }
      } catch (err) {
        console.error('Error cargando progreso desde Supabase:', err)
      } finally {
        setCargando(false)
      }
    }

    cargarProgresoEstudiante()
  }, [estudiante])

  // Iniciar sesión / Identificar estudiante por nombre y apellido
  const identificarEstudiante = async (nombreRaw, apellidoRaw) => {
    const nombre = nombreRaw.trim()
    const apellido = apellidoRaw.trim()
    if (!nombre || !apellido) return { error: 'Por favor ingresa tu nombre y apellido.' }

    setCargando(true)
    try {
      // Buscar o crear estudiante en Supabase mediante upsert con el constraint único
      const { data, error } = await supabase
        .from('estudiantes')
        .upsert(
          { nombre, apellido },
          { onConflict: 'nombre_normalizado,apellido_normalizado' }
        )
        .select()
        .single()

      if (error) {
        throw error
      }

      setEstudiante(data)
      localStorage.setItem(ESTUDIANTE_KEY, JSON.stringify(data))
      return { data }
    } catch (err) {
      console.error('Error identificando estudiante:', err)
      return { error: 'No se pudo conectar con la biblioteca. Revisa tu conexión a internet.' }
    } finally {
      setCargando(false)
    }
  }

  // Cerrar la ficha del estudiante actual (cambiar de niño)
  const cerrarSesionEstudiante = () => {
    setEstudiante(null)
    localStorage.removeItem(ESTUDIANTE_KEY)
    setProgreso({ modulos: {}, totalSellos: 0, totalEstrellas: 0 })
  }

  // Guardar actividad completada tanto en memoria/local como en Supabase
  const registrarActividad = async (moduloId, actividadId, estrellas = 3) => {
    // 1. Actualización optimista local
    let nuevoProgreso = null

    setProgreso((prev) => {
      const moduloActual = prev.modulos[moduloId] || {}
      const actPrevia = moduloActual[actividadId]
      const estrellasFinal = Math.max(actPrevia?.estrellas || 0, estrellas)

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

      let sellosTotales = 0
      let estrellasTotales = 0

      Object.values(nuevosModulos).forEach((mod) => {
        Object.values(mod).forEach((act) => {
          if (act.completado) {
            sellosTotales += 1
            estrellasTotales += act.estrellas || 0
          }
        })
      })

      nuevoProgreso = {
        modulos: nuevosModulos,
        totalSellos: sellosTotales,
        totalEstrellas: estrellasTotales,
      }
      return nuevoProgreso
    })

    // Guardar en caché local si hay estudiante
    if (estudiante && nuevoProgreso) {
      try {
        localStorage.setItem(
          `${LOCAL_PROGRESO_PREFIX}${estudiante.id}`,
          JSON.stringify(nuevoProgreso)
        )
      } catch (e) {}
    }

    // 2. Guardar en Supabase si el estudiante está identificado
    if (estudiante) {
      setSincronizando(true)
      try {
        const { error } = await supabase.from('progreso_actividades').upsert(
          {
            estudiante_id: estudiante.id,
            modulo_id: moduloId,
            actividad_id: actividadId,
            estrellas,
            completado: true,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'estudiante_id,modulo_id,actividad_id' }
        )

        if (error) {
          console.error('Error guardando progreso en Supabase:', error)
        }
      } catch (err) {
        console.error('Error de red al guardar en Supabase:', err)
      } finally {
        setSincronizando(false)
      }
    }
  }

  const obtenerInfoModulo = (moduloId) => {
    const mod = progreso.modulos[moduloId] || {}
    const actividadesCompletadas = Object.values(mod).filter((a) => a.completado).length
    const estrellasModulo = Object.values(mod).reduce((acc, a) => acc + (a.estrellas || 0), 0)
    return {
      actividadesCompletadas,
      estrellasModulo,
      completado: actividadesCompletadas >= 6,
    }
  }

  return (
    <ProgresoContext.Provider
      value={{
        estudiante,
        progreso,
        cargando,
        sincronizando,
        identificarEstudiante,
        cerrarSesionEstudiante,
        registrarActividad,
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

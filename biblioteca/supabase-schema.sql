-- Esquema de base de datos para Biblioteca Rinrín (Supabase / PostgreSQL)

-- 1. Tabla de Estudiantes (identificados por nombre y apellido)
CREATE TABLE IF NOT EXISTS public.estudiantes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    nombre_normalizado TEXT GENERATED ALWAYS AS (LOWER(TRIM(nombre))) STORED,
    apellido_normalizado TEXT GENERATED ALWAYS AS (LOWER(TRIM(apellido))) STORED,
    grado TEXT DEFAULT '5° Primaria',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT estudiante_unico UNIQUE (nombre_normalizado, apellido_normalizado)
);

-- 2. Tabla de Progreso de Actividades
CREATE TABLE IF NOT EXISTS public.progreso_actividades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID NOT NULL REFERENCES public.estudiantes(id) ON DELETE CASCADE,
    modulo_id TEXT NOT NULL,
    actividad_id TEXT NOT NULL,
    estrellas INTEGER NOT NULL CHECK (estrellas >= 1 AND estrellas <= 3),
    completado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT progreso_unico UNIQUE (estudiante_id, modulo_id, actividad_id)
);

-- Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_estudiantes_lookup ON public.estudiantes(nombre_normalizado, apellido_normalizado);
CREATE INDEX IF NOT EXISTS idx_progreso_estudiante ON public.progreso_actividades(estudiante_id);

-- Configuración de Row Level Security (RLS) abierta para lectura y escritura desde la aplicación web
ALTER TABLE public.estudiantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progreso_actividades ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir todo a estudiantes anonimos" ON public.estudiantes;
CREATE POLICY "Permitir todo a estudiantes anonimos"
    ON public.estudiantes
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir todo a progreso anonimo" ON public.progreso_actividades;
CREATE POLICY "Permitir todo a progreso anonimo"
    ON public.progreso_actividades
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

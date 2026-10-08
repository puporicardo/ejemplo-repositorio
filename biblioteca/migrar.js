import pg from 'pg'
import fs from 'fs'

// Desactivar rechazo de certificados autofirmados de pooler temporalmente para la migración
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const rawUrl =
  process.env.POSTGRES_PRISMA_URL ||
  'postgres://postgres.tjdnfmfxbugafeaogshu:5J5Be65KhM2vcP9D@aws-0-us-east-1.pooler.supabase.com:6543/postgres'

// Limpiar query params de ssl para configurarlo explícitamente en el driver pg
const cleanUrl = rawUrl.split('?')[0]

console.log('Conectando a PostgreSQL de Supabase en aws-0-us-east-1...')

const client = new pg.Client({
  connectionString: cleanUrl,
  ssl: {
    rejectUnauthorized: false,
  },
})

async function ejecutar() {
  try {
    await client.connect()
    console.log('¡Conexión establecida exitosamente!')

    const sql = fs.readFileSync('supabase-schema.sql', 'utf8')
    await client.query(sql)
    console.log('¡Tablas, índices y políticas de seguridad (RLS) creadas con éxito!')

    const resEst = await client.query('SELECT COUNT(*) FROM public.estudiantes')
    console.log('Tabla "estudiantes" verificada. Total registros:', resEst.rows[0].count)

    const resProg = await client.query('SELECT COUNT(*) FROM public.progreso_actividades')
    console.log('Tabla "progreso_actividades" verificada. Total registros:', resProg.rows[0].count)
  } catch (err) {
    console.error('Error durante la migración:', err)
  } finally {
    await client.end()
  }
}

ejecutar()

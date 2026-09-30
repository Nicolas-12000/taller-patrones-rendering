import { getQuakes } from '@/lib/quakes'

export const dynamic = 'force-dynamic'

// Endpoint que consume la página CSR desde el navegador.
export async function GET() {
  const data = await getQuakes({ cache: 'no-store' })
  return Response.json(data)
}

import { NextResponse } from 'next/server'
import { DOCTORS } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const specialty = searchParams.get('specialty')
  const available = searchParams.get('available')

  let doctors = DOCTORS

  if (specialty && specialty !== 'all') {
    doctors = doctors.filter(d =>
      d.specialty.toLowerCase().includes(specialty.toLowerCase())
    )
  }
  if (available === 'true') {
    doctors = doctors.filter(d => d.available)
  }

  return NextResponse.json({ doctors })
}

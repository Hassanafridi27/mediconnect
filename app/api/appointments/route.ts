import { NextResponse } from 'next/server'
import { MOCK_APPOINTMENTS } from '@/lib/data'

// GET /api/appointments?role=patient&id=...
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role')

  // In production: query your DB (Prisma, Supabase, etc.)
  // const appointments = await db.appointment.findMany({ where: { patientId } })

  return NextResponse.json({ appointments: MOCK_APPOINTMENTS })
}

// POST /api/appointments — create a new appointment
export async function POST(request: Request) {
  const body = await request.json()
  const { doctorId, doctorName, patientName, patientEmail, date, time, type, fee, specialty, symptoms } = body

  // Validate (use zod in production)
  if (!doctorId || !patientName || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // In production: save to DB, send confirmation email, create Daily.co room
  // const room = await createDailyRoom(appointmentId)
  // await db.appointment.create({ data: { ...body, roomUrl: room.url } })
  // await sendConfirmationEmail(patientEmail, { doctorName, date, time })

  const newAppointment = {
    id: `appt_${Date.now()}`,
    doctorId,
    doctorName,
    patientName,
    patientEmail,
    date,
    time,
    status: 'upcoming' as const,
    type: type || 'video',
    fee,
    specialty,
    symptoms,
    roomUrl: `https://mediconnect.daily.co/room_${Date.now()}`,
  }

  return NextResponse.json({ appointment: newAppointment }, { status: 201 })
}

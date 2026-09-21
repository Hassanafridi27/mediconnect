import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { appointmentId } = body

  // Daily.co Integration (see README for full setup)
  // const response = await fetch('https://api.daily.co/v1/rooms', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${process.env.DAILY_API_KEY}` },
  //   body: JSON.stringify({
  //     name: `appt-${appointmentId}`,
  //     privacy: 'private',
  //     properties: { exp: Math.floor(Date.now()/1000) + 3600, max_participants: 2 },
  //   }),
  // })
  // const room = await response.json()
  // return NextResponse.json({ url: room.url })

  return NextResponse.json({
    url: `https://mediconnect.daily.co/appt-${appointmentId}`,
    expires_at: new Date(Date.now() + 3600000).toISOString(),
  })
}

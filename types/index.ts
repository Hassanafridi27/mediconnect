export type Doctor = {
  id: string
  name: string
  specialty: string
  rating: number
  reviewCount: number
  fee: number
  available: boolean
  nextSlot: string
  avatar: string
  tags: string[]
  experience: number
  bio: string
}

export type Appointment = {
  id: string
  doctorId: string
  doctorName: string
  patientName: string
  patientEmail: string
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
  type: 'video' | 'audio' | 'chat'
  fee: number
  specialty: string
  symptoms?: string
  roomUrl?: string
}

export type TimeSlot = {
  time: string
  available: boolean
}

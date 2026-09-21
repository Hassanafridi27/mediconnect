'use client'
import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { DOCTORS, TIME_SLOTS } from '@/lib/data'
import { Check, Heart, Star, ChevronLeft, Video, Mic, MessageSquare, AlertCircle } from 'lucide-react'

function BookingForm() {
  const params = useSearchParams()
  const router = useRouter()
  const doctorId = params.get('doctor') || 'd4'
  const doctor = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0]
  const COLORS = ['bg-slate-800','bg-teal-600','bg-purple-600','bg-amber-600','bg-rose-600','bg-blue-600']
  const colorIdx = DOCTORS.indexOf(doctor)

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', phone: '', dob: '', symptoms: '', consultType: 'video' })
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)
  const [apptId, setApptId] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleConfirm = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: doctor.id, doctorName: doctor.name,
          patientName: form.name, patientEmail: form.email,
          date, time: slot, type: form.consultType,
          fee: doctor.fee, specialty: doctor.specialty, symptoms: form.symptoms,
        }),
      })
      const data = await res.json()
      setApptId(data.appointment.id)
      setBooked(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (booked) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 max-w-md w-full text-center shadow-sm">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check className="w-8 h-8 text-teal-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Appointment Confirmed!</h2>
        <p className="text-gray-500 mb-6">A confirmation has been sent to {form.email}</p>
        <div className="bg-gray-50 rounded-xl p-5 text-left space-y-3 mb-6">
          {[['Doctor', doctor.name], ['Date', date], ['Time', slot], ['Type', form.consultType === 'video' ? 'Video call' : form.consultType], ['Fee', `$${doctor.fee}`], ['Ref', apptId]].map(([k,v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-gray-500">{k}</span>
              <span className="font-semibold text-gray-900">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/patient" className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 text-sm text-center">Go to dashboard</Link>
          <Link href={`/video/${apptId}`} className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 text-sm text-center">Join call</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-slate-900 py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/doctors" className="text-slate-400 hover:text-white p-1"><ChevronLeft className="w-5 h-5" /></Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center"><Heart className="w-3.5 h-3.5 text-white fill-white" /></div>
            <span className="text-white font-semibold">MediConnect</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Doctor card */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6 flex items-center gap-4">
          <div className={`w-14 h-14 ${COLORS[colorIdx % COLORS.length]} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>{doctor.avatar}</div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{doctor.name}</h2>
            <p className="text-sm text-teal-600">{doctor.specialty}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs text-gray-500">{doctor.rating} · {doctor.reviewCount} reviews</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">${doctor.fee}</p>
            <p className="text-xs text-gray-400">per session</p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['Patient info', 'Date & time', 'Confirm'].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${step > i+1 ? 'bg-teal-600 text-white' : step === i+1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {step > i+1 ? <Check className="w-3.5 h-3.5" /> : i+1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step === i+1 ? 'text-teal-600' : 'text-gray-400'}`}>{s}</span>
              {i < 2 && <div className={`flex-1 h-px ${step > i+1 ? 'bg-teal-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          {/* Step 1: Patient info */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-900">Your details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1.5">Full name *</label>
                  <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Sara Ahmed"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1.5">Phone</label>
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 000 0000"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1.5">Date of birth</label>
                  <input type="date" value={form.dob} onChange={e => update('dob', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1.5">Consultation type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[['video','Video',Video],['audio','Audio',Mic],['chat','Chat',MessageSquare]].map(([val, label, Icon]: any) => (
                      <button key={val} onClick={() => update('consultType', val)}
                        className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg border text-xs font-medium transition-colors ${form.consultType === val ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1.5">Symptoms / reason for visit</label>
                  <textarea value={form.symptoms} onChange={e => update('symptoms', e.target.value)} rows={3}
                    placeholder="Briefly describe your symptoms or reason for consultation…"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
                </div>
              </div>
              <button onClick={() => setStep(2)} disabled={!form.name || !form.email}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                Continue to date &amp; time
              </button>
            </div>
          )}

          {/* Step 2: Date & time */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-900">Pick a date &amp; time</h3>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1.5">Date *</label>
                <input type="date" value={date} min={today} onChange={e => setDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Available time slots</label>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map(ts => (
                    <button key={ts.time} onClick={() => ts.available && setSlot(ts.time)} disabled={!ts.available}
                      className={`py-2.5 text-sm rounded-lg border font-medium transition-colors ${!ts.available ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed' : slot === ts.time ? 'border-teal-500 bg-teal-600 text-white' : 'border-gray-200 hover:border-teal-400 text-gray-700'}`}>
                      {ts.time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(3)} disabled={!date || !slot} className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue to confirm
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-900">Confirm your booking</h3>
              <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                {[['Doctor', doctor.name], ['Specialty', doctor.specialty], ['Patient', form.name], ['Email', form.email], ['Date', date], ['Time', slot], ['Type', form.consultType], ['Symptoms', form.symptoms || '—'], ['Fee', `$${doctor.fee}`]].map(([k,v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium text-gray-900 max-w-[60%] text-right">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2.5 text-sm text-gray-500 bg-blue-50 rounded-xl p-4">
                <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                Your consultation is end-to-end encrypted. A video link will be sent to {form.email} 30 minutes before your appointment.
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50">Back</button>
                <button onClick={handleConfirm} disabled={loading} className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {loading ? 'Confirming…' : 'Confirm & Pay $' + doctor.fee}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BookPage() {
  return <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div>}><BookingForm /></Suspense>
}

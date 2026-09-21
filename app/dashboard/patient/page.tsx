'use client'
import Link from 'next/link'
import { MOCK_APPOINTMENTS, DOCTORS } from '@/lib/data'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Calendar, Video, Star, Clock, TrendingUp, Plus } from 'lucide-react'

export default function PatientDashboard() {
  const upcoming = MOCK_APPOINTMENTS.filter(a => a.status === 'upcoming')
  const completed = MOCK_APPOINTMENTS.filter(a => a.status === 'completed')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="patient" />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Good morning, Sara 👋</h1>
              <p className="text-gray-400 text-sm mt-1">Saturday, September 19, 2026</p>
            </div>
            <Link href="/book" className="bg-teal-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> New appointment
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Upcoming', value: upcoming.length, icon: Calendar, color: 'text-teal-600 bg-teal-50' },
              { label: 'Completed', value: completed.length, icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
              { label: 'Doctors seen', value: 3, icon: Star, color: 'text-amber-600 bg-amber-50' },
              { label: 'Hours saved', value: '4.5', icon: Clock, color: 'text-purple-600 bg-purple-50' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                  <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Upcoming appointments */}
          <div className="bg-white rounded-xl border border-gray-100 mb-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Upcoming appointments</h2>
              <Link href="/dashboard/patient/appointments" className="text-xs text-teal-600 font-medium hover:text-teal-700">View all</Link>
            </div>
            {upcoming.length === 0 ? (
              <div className="py-12 text-center">
                <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No upcoming appointments</p>
                <Link href="/book" className="mt-3 inline-block bg-teal-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-teal-700">Book one now</Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {upcoming.map((appt, i) => (
                  <div key={appt.id} className="px-6 py-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${['bg-slate-800','bg-teal-600','bg-purple-600'][i % 3]}`}>
                      {appt.doctorName.split(' ').slice(1).map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{appt.doctorName}</p>
                      <p className="text-xs text-gray-400">{appt.specialty} · {appt.date} at {appt.time}</p>
                      {appt.symptoms && <p className="text-xs text-gray-500 mt-0.5 truncate">{appt.symptoms}</p>}
                    </div>
                    <StatusBadge status={appt.status} />
                    <Link href={`/video/${appt.id}`} className="flex items-center gap-1.5 bg-teal-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-teal-700 transition-colors flex-shrink-0">
                      <Video className="w-3.5 h-3.5" /> Join call
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended doctors */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Recommended doctors</h2>
              <Link href="/doctors" className="text-xs text-teal-600 font-medium hover:text-teal-700">Browse all</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {DOCTORS.slice(0, 3).map((doc, i) => (
                <div key={doc.id} className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold ${['bg-slate-800','bg-teal-600','bg-purple-600'][i]}`}>{doc.avatar}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                      <p className="text-xs text-teal-600">{doc.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-gray-500">{doc.rating}</span>
                    </div>
                    <Link href={`/book?doctor=${doc.id}`} className="text-xs text-teal-600 font-medium hover:text-teal-700">Book ${doc.fee} →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

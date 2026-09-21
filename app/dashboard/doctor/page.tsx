'use client'
import Link from 'next/link'
import { DOCTOR_APPOINTMENTS } from '@/lib/data'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Video, Users, DollarSign, Star, TrendingUp, Clock, ChevronRight, CheckCircle } from 'lucide-react'

export default function DoctorDashboard() {
  const upcoming = DOCTOR_APPOINTMENTS.filter(a => a.status === 'upcoming')
  const completed = DOCTOR_APPOINTMENTS.filter(a => a.status === 'completed')
  const earnings = DOCTOR_APPOINTMENTS.reduce((sum, a) => sum + (a.status === 'completed' ? a.fee : 0), 0)
  const todaySlots = ['9:00 AM','10:00 AM','11:30 AM','2:00 PM','3:00 PM','4:30 PM']

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="doctor" />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Good morning, Dr. Rahman 👋</h1>
              <p className="text-gray-400 text-sm mt-1">Saturday, September 19, 2026 · 2 appointments today</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Available
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Today's patients", value: upcoming.length, icon: Users, color: 'text-teal-600 bg-teal-50', sub: 'appointments' },
              { label: 'Monthly earnings', value: `$${(earnings * 20).toLocaleString()}`, icon: DollarSign, color: 'text-green-600 bg-green-50', sub: 'this month' },
              { label: 'Total patients', value: '284', icon: TrendingUp, color: 'text-blue-600 bg-blue-50', sub: 'all time' },
              { label: 'Avg. rating', value: '4.9', icon: Star, color: 'text-amber-600 bg-amber-50', sub: '312 reviews' },
            ].map(({ label, value, icon: Icon, color, sub }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                  <Icon className="w-[18px] h-[18px]" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                <p className="text-xs text-gray-300 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's appointments */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Today's appointments</h2>
                <Link href="/dashboard/doctor/appointments" className="text-xs text-teal-600 font-medium flex items-center gap-1 hover:text-teal-700">
                  View all <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {upcoming.map(appt => (
                  <div key={appt.id} className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 text-xs font-bold flex-shrink-0">
                        {appt.patientName.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-gray-900">{appt.patientName}</p>
                          <StatusBadge status={appt.status} />
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {appt.date} at {appt.time}
                        </p>
                        {appt.symptoms && (
                          <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                            <p className="text-xs text-amber-700 font-medium">Patient notes:</p>
                            <p className="text-xs text-amber-600 mt-0.5">{appt.symptoms}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 ml-14">
                      <Link href={`/video/${appt.id}`} className="flex items-center gap-1.5 bg-teal-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-teal-700 transition-colors">
                        <Video className="w-3.5 h-3.5" /> Start video call
                      </Link>
                      <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <CheckCircle className="w-3.5 h-3.5" /> Mark complete
                      </button>
                    </div>
                  </div>
                ))}
                {completed.map(appt => (
                  <div key={appt.id} className="px-6 py-4 opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold flex-shrink-0">
                        {appt.patientName.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="text-sm font-medium text-gray-600">{appt.patientName}</p>
                          <StatusBadge status={appt.status} />
                        </div>
                        <p className="text-xs text-gray-400">{appt.date} at {appt.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Today's schedule */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm">Today's schedule</h3>
                <div className="space-y-2">
                  {todaySlots.map((slot, i) => {
                    const booked = upcoming[i] || completed[i-2] || null
                    const isComp = i >= upcoming.length
                    return (
                      <div key={slot} className={`flex items-center gap-3 py-2 px-3 rounded-lg ${booked ? (isComp ? 'bg-gray-50' : 'bg-teal-50') : 'bg-gray-50/50'}`}>
                        <span className="text-xs text-gray-400 w-16 flex-shrink-0 font-mono">{slot}</span>
                        {booked ? (
                          <span className={`text-xs font-medium truncate ${isComp ? 'text-gray-400 line-through' : 'text-teal-700'}`}>
                            {booked.patientName}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-300">— Free</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick stats */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm">This week</h3>
                <div className="space-y-3">
                  {[['Consultations','18','↑ 12%'],['Revenue','$810','↑ 8%'],['Avg. session','24 min','—'],['5-star ratings','14','↑ 3']].map(([label, val, change]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{val}</span>
                        <span className="text-xs text-green-500">{change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { LayoutDashboard, Calendar, User, Video, Settings, Heart, LogOut } from 'lucide-react'

const patientNav = [
  { href: '/dashboard/patient', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/patient/appointments', label: 'Appointments', icon: Calendar },
  { href: '/doctors', label: 'Find a doctor', icon: User },
  { href: '/dashboard/patient/profile', label: 'Profile', icon: Settings },
]
const doctorNav = [
  { href: '/dashboard/doctor', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/doctor/appointments', label: 'Appointments', icon: Calendar },
  { href: '/dashboard/doctor/schedule', label: 'My schedule', icon: Video },
  { href: '/dashboard/doctor/profile', label: 'Profile', icon: Settings },
]

export function DashboardSidebar({ role }: { role: 'patient' | 'doctor' }) {
  const path = usePathname()
  const nav = role === 'doctor' ? doctorNav : patientNav

  return (
    <aside className="w-60 bg-white border-r border-gray-100 flex flex-col min-h-screen">
      <div className="p-5 border-b border-gray-100">
        <div className={clsx('inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full', role === 'doctor' ? 'bg-purple-50 text-purple-700' : 'bg-teal-50 text-teal-700')}>
          <span className={clsx('w-1.5 h-1.5 rounded-full', role === 'doctor' ? 'bg-purple-500' : 'bg-teal-500')} />
          {role === 'doctor' ? 'Doctor portal' : 'Patient portal'}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold', role === 'doctor' ? 'bg-purple-600' : 'bg-teal-600')}>
            {role === 'doctor' ? 'AR' : 'SA'}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{role === 'doctor' ? 'Dr. Aisha Rahman' : 'Sara Ahmed'}</p>
            <p className="text-xs text-gray-400">{role === 'doctor' ? 'Cardiologist' : 'Patient ID #1042'}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={clsx('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            path === href ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-1">
        <Link href={role === 'doctor' ? '/dashboard/patient' : '/dashboard/doctor'} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
          <Heart className="w-4 h-4" />
          Switch to {role === 'doctor' ? 'patient' : 'doctor'} view
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </aside>
  )
}

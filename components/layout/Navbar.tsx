'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart } from 'lucide-react'

export function Navbar() {
  const path = usePathname()
  const isDoctor = path.startsWith('/dashboard/doctor')

  return (
    <nav className="bg-slate-900 sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-white font-semibold text-lg">Medi<span className="text-teal-400">Connect</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/doctors" className="text-slate-400 hover:text-white text-sm transition-colors">Find a doctor</Link>
            <Link href="/#specialties" className="text-slate-400 hover:text-white text-sm transition-colors">Specialties</Link>
            <Link href="/#how" className="text-slate-400 hover:text-white text-sm transition-colors">How it works</Link>
          </div>

          <div className="flex items-center gap-3">
            {isDoctor ? (
              <Link href="/dashboard/patient" className="text-slate-400 hover:text-white text-sm transition-colors">Switch to patient</Link>
            ) : (
              <Link href="/dashboard/doctor" className="text-slate-400 hover:text-white text-sm transition-colors">Doctor portal</Link>
            )}
            <Link href="/dashboard/patient" className="bg-teal-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium">
              My dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

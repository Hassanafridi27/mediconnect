'use client'
import { useState } from 'react'
import Link from 'next/link'
import { DOCTORS } from '@/lib/data'
import { Search, Star, Filter, Heart } from 'lucide-react'

const SPECIALTIES = ['All', 'Cardiologist', 'Dermatologist', 'Psychiatrist', 'General Physician', 'Paediatrician', 'Neurologist']
const COLORS = ['bg-slate-800','bg-teal-600','bg-purple-600','bg-amber-600','bg-rose-600','bg-blue-600']

export default function DoctorsPage() {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [availableOnly, setAvailableOnly] = useState(false)

  const filtered = DOCTORS.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase())
    const matchSpec = specialty === 'All' || d.specialty === specialty
    const matchAvail = !availableOnly || d.available
    return matchSearch && matchSpec && matchAvail
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-900 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center"><Heart className="w-3.5 h-3.5 text-white fill-white" /></div>
            <span className="text-white font-semibold">Medi<span className="text-teal-400">Connect</span></span>
          </Link>
          <h1 className="text-3xl font-semibold text-white mb-2">Find a doctor</h1>
          <p className="text-slate-400 mb-8">Browse {DOCTORS.length} verified specialists available for virtual consultations</p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or specialty…"
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-teal-500" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {SPECIALTIES.map(s => (
              <button key={s} onClick={() => setSpecialty(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${specialty === s ? 'bg-teal-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-teal-300'}`}>
                {s}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 ml-auto cursor-pointer">
            <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="rounded text-teal-600" />
            <span className="text-sm text-gray-600">Available today only</span>
          </label>
        </div>

        <p className="text-sm text-gray-500 mb-5">{filtered.length} doctors found</p>

        {/* Doctor list */}
        <div className="space-y-4">
          {filtered.map((doc, i) => (
            <div key={doc.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 ${COLORS[i % COLORS.length]} rounded-full flex items-center justify-center text-white font-semibold text-base flex-shrink-0`}>{doc.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-teal-600 font-medium">{doc.specialty} · {doc.experience} yrs experience</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-gray-700">{doc.rating}</span>
                        <span className="text-sm text-gray-400">({doc.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xl font-bold text-gray-900">${doc.fee}</p>
                      <p className="text-xs text-gray-400">per session</p>
                      <div className="flex items-center gap-1.5 justify-end mt-1">
                        <span className={`w-2 h-2 rounded-full ${doc.available ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className="text-xs text-gray-500">{doc.nextSlot}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">{doc.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {doc.tags.map(t => <span key={t} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{t}</span>)}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
                <Link href={`/book?doctor=${doc.id}`} className="flex-1 bg-teal-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg hover:bg-teal-700 transition-colors text-center">
                  Book appointment
                </Link>
                <button className="border border-gray-200 text-gray-600 text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  View profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

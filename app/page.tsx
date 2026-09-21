import Link from 'next/link'
import { DOCTORS } from '@/lib/data'
import { Heart, Shield, Clock, Star, Video, ChevronRight } from 'lucide-react'

export default function HomePage() {
  const specialties = [
    { name: 'Cardiology', count: 142, icon: '🫀' },
    { name: 'General Physician', count: 389, icon: '🩺' },
    { name: 'Dermatology', count: 98, icon: '✨' },
    { name: 'Psychiatry', count: 211, icon: '🧠' },
    { name: 'Paediatrics', count: 176, icon: '👶' },
    { name: 'Neurology', count: 87, icon: '⚡' },
    { name: 'Gynaecology', count: 134, icon: '💜' },
    { name: 'Oncology', count: 63, icon: '🔬' },
  ]

  return (
    <>
      {/* Nav */}
      <nav className="bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-white font-semibold text-lg">Medi<span className="text-teal-400">Connect</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/doctors" className="text-slate-400 hover:text-white text-sm">Find a doctor</Link>
            <Link href="#specialties" className="text-slate-400 hover:text-white text-sm">Specialties</Link>
            <Link href="#how" className="text-slate-400 hover:text-white text-sm">How it works</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/doctor" className="text-slate-400 hover:text-white text-sm hidden md:block">Doctor portal</Link>
            <Link href="/dashboard/patient" className="bg-teal-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-teal-700 font-medium">My dashboard</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-slate-900 pt-20 pb-0 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,143,127,0.15),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-teal-900/40 border border-teal-700/30 text-teal-300 px-4 py-1.5 rounded-full text-sm mb-8">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            Doctors available now
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight tracking-tight mb-6">
            See a doctor from<br /><span className="text-teal-400">anywhere, any time</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto font-light">
            Connect with board-certified physicians in minutes. No waiting rooms, no travel.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-16">
            <Link href="/doctors" className="bg-teal-600 text-white px-7 py-3.5 rounded-xl hover:bg-teal-700 font-semibold text-base transition-colors">
              Find a doctor
            </Link>
            <Link href="/book" className="border border-slate-600 text-slate-300 px-7 py-3.5 rounded-xl hover:border-slate-400 hover:text-white font-medium text-base transition-colors">
              Book appointment
            </Link>
          </div>
          {/* Stats */}
          <div className="bg-slate-800/60 border-t border-slate-700/50 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-700/50">
            {[['2,800+','Verified doctors'],['50+','Specialties'],['4.9★','Avg. rating'],['<15 min','Avg. wait']].map(([num,label])=>(
              <div key={label} className="py-5 px-4">
                <p className="text-2xl font-semibold text-white">{num}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Specialty</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>All specialties</option>
                {specialties.map(s => <option key={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Date</label>
              <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <Link href="/doctors" className="bg-teal-600 text-white py-2.5 px-5 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors text-center">
              Search doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label">Our specialists</p>
            <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Top-rated doctors, ready to see you</h2>
          </div>
          <Link href="/doctors" className="text-teal-600 text-sm font-medium hover:text-teal-700 flex items-center gap-1">View all <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {DOCTORS.map((doc, i) => (
            <Link key={doc.id} href={`/book?doctor=${doc.id}`} className="bg-white rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all p-5 block">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${['bg-slate-800','bg-teal-600','bg-purple-600','bg-amber-600','bg-rose-600','bg-blue-600'][i%6]}`}>{doc.avatar}</div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{doc.name}</h3>
                  <p className="text-xs text-teal-600 font-medium">{doc.specialty}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-gray-500">{doc.rating} ({doc.reviewCount})</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {doc.tags.slice(0,2).map(t=><span key={t} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <span className="text-base font-bold text-gray-900">${doc.fee}</span>
                  <span className="text-xs text-gray-400 ml-1">/ session</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? 'bg-green-500' : 'bg-gray-300'}`} />
                  {doc.nextSlot}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <p className="section-label text-teal-400 text-center">How it works</p>
          <h2 className="text-3xl font-semibold text-white text-center mb-14 tracking-tight">From search to consultation in minutes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {[
              { step:'01', title:'Find your doctor', desc:'Browse by specialty, read reviews, and check real-time availability.', icon:'🔍' },
              { step:'02', title:'Pick a time slot', desc:'Choose from available slots, including same-day options.', icon:'📅' },
              { step:'03', title:'Share symptoms', desc:'Fill a brief health form so your doctor arrives prepared.', icon:'📋' },
              { step:'04', title:'Join consultation', desc:'Enter the encrypted video room and get diagnosed.', icon:'🎥' },
            ].map((s,i) => (
              <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="text-3xl mb-4 opacity-20 font-bold text-white">{s.step}</div>
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section id="specialties" className="max-w-7xl mx-auto px-4 py-20">
        <p className="section-label">Browse by specialty</p>
        <h2 className="text-3xl font-semibold text-slate-900 mb-10 tracking-tight">Whatever you need, we have a specialist</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {specialties.map(s => (
            <Link key={s.name} href={`/doctors?specialty=${s.name}`} className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:border-teal-300 hover:bg-teal-50 transition-all group">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-xs font-semibold text-gray-800">{s.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.count} doctors</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-600 py-20 text-center">
        <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight">Your health can't wait.</h2>
        <p className="text-teal-100 mb-8 text-lg font-light">Join over 400,000 patients who've made the switch to virtual care.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/book" className="bg-white text-teal-700 px-7 py-3.5 rounded-xl font-semibold hover:bg-teal-50 transition-colors">Book an appointment</Link>
          <Link href="/dashboard/doctor" className="border border-teal-400/50 text-white px-7 py-3.5 rounded-xl font-medium hover:bg-teal-700/30 transition-colors">Are you a doctor? Join us</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center"><Heart className="w-3.5 h-3.5 text-white fill-white"/></div>
              <span className="text-white font-semibold">Medi<span className="text-teal-400">Connect</span></span>
            </div>
            <p className="text-sm max-w-xs">Connecting patients with board-certified doctors through secure, convenient virtual consultations.</p>
          </div>
          {[['Platform',['Find a doctor','Book appointment','How it works']],['Doctors',['Join as a doctor','Doctor dashboard','Earnings']],['Support',['Help centre','Privacy policy','Contact us']]].map(([title,links])=>(
            <div key={title as string}>
              <h4 className="text-white text-sm font-semibold mb-3">{title as string}</h4>
              {(links as string[]).map(l=><a key={l} href="#" className="block text-sm text-slate-400 hover:text-white mb-2">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between text-xs gap-2">
          <span>© 2026 MediConnect. All rights reserved.</span>
          <span>HIPAA compliant · SSL secured · ISO 27001</span>
        </div>
      </footer>
    </>
  )
}

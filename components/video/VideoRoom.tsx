'use client'
import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Monitor, Users } from 'lucide-react'

type VideoRoomProps = {
  roomUrl: string
  doctorName: string
  patientName: string
  onEnd: () => void
}

// In production: replace this component body with Daily.co React hooks
// import DailyIframe from '@daily-co/daily-js'
// or use @daily-co/react-call-object for a fully custom UI

export function VideoRoom({ roomUrl, doctorName, patientName, onEnd }: VideoRoomProps) {
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'System', text: 'Consultation started. This session is encrypted and private.' }
  ])
  const [draft, setDraft] = useState('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`

  const sendMsg = () => {
    if (!draft.trim()) return
    setMessages(m => [...m, { from: patientName, text: draft.trim() }])
    setDraft('')
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Main video area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Live consultation</span>
            <span className="text-gray-400 text-sm font-mono">{fmt(elapsed)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            2 participants · End-to-end encrypted
          </div>
        </div>

        {/* Video feeds */}
        <div className="flex-1 relative bg-gray-950 p-4">
          {/* Doctor video (main) */}
          <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="text-center">
              <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">AR</div>
              <p className="text-lg font-medium">{doctorName}</p>
              <p className="text-gray-400 text-sm mt-1">Camera connecting…</p>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm">{doctorName}</div>
          </div>

          {/* Patient video (PiP) */}
          <div className="absolute top-8 right-8 w-44 h-32 bg-gray-800 rounded-xl border-2 border-gray-700 flex items-center justify-center overflow-hidden shadow-2xl">
            {camOn ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-1">SA</div>
                <p className="text-xs text-gray-300">{patientName}</p>
              </div>
            ) : (
              <div className="text-center">
                <VideoOff className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Camera off</p>
              </div>
            )}
            <div className="absolute bottom-2 left-2 text-xs text-gray-400 bg-black/40 px-2 py-0.5 rounded">You</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 border-t border-gray-800 px-6 py-5 flex items-center justify-center gap-4">
          <button onClick={() => setMicOn(m => !m)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${micOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}>
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button onClick={() => setCamOn(c => !c)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${camOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}>
            {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>
          <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
            <Monitor className="w-5 h-5" />
          </button>
          <button onClick={() => setChatOpen(c => !c)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${chatOpen ? 'bg-teal-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
            <MessageSquare className="w-5 h-5" />
          </button>
          <button onClick={onEnd} className="w-14 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors ml-4">
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat panel */}
      {chatOpen && (
        <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
          <div className="px-4 py-4 border-b border-gray-800">
            <p className="text-sm font-semibold">In-call chat</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`${m.from === 'System' ? 'text-center' : ''}`}>
                {m.from === 'System' ? (
                  <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-full">{m.text}</span>
                ) : (
                  <div className={`max-w-[85%] ${m.from === patientName ? 'ml-auto' : ''}`}>
                    <p className="text-xs text-gray-400 mb-1">{m.from}</p>
                    <div className={`px-3 py-2 rounded-xl text-sm ${m.from === patientName ? 'bg-teal-700 ml-auto' : 'bg-gray-800'}`}>{m.text}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-800 flex gap-2">
            <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder="Type a message…" className="flex-1 bg-gray-800 text-white placeholder-gray-500 text-sm px-3 py-2 rounded-lg border border-gray-700 outline-none focus:border-teal-500" />
            <button onClick={sendMsg} className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-3 py-2 rounded-lg transition-colors">Send</button>
          </div>
        </div>
      )}
    </div>
  )
}

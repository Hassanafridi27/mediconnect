# MediConnect — Virtual Doctor Appointment Platform

A full-stack Next.js 15 telemedicine platform with video consultations, doctor/patient dashboards, and appointment booking.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 📁 Project Structure

```
mediconnect/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── doctors/page.tsx            # Browse & search doctors
│   ├── book/page.tsx               # 3-step booking wizard
│   ├── video/[id]/page.tsx         # Video call room
│   ├── dashboard/
│   │   ├── patient/page.tsx        # Patient dashboard
│   │   └── doctor/page.tsx         # Doctor dashboard
│   └── api/
│       ├── appointments/route.ts   # GET/POST appointments
│       ├── doctors/route.ts        # GET doctors list
│       └── video/room/route.ts     # Create Daily.co rooms
├── components/
│   ├── ui/                         # Button, Badge, Avatar, StatusBadge
│   ├── layout/                     # Navbar, DashboardSidebar
│   └── video/VideoRoom.tsx         # Video call UI
├── lib/data.ts                     # Mock data (replace with DB)
└── types/index.ts                  # TypeScript types
```

---

## 🎥 Video API Comparison & Recommendation

### ✅ BEST CHOICE: Daily.co

| Feature | Details |
|---|---|
| **Free tier** | 10,000 participant-minutes/month (~833 hrs of 1-on-1 calls) |
| **Paid rate** | $0.004/participant-minute (~$0.48 for a 1hr doctor+patient call) |
| **HIPAA** | $500/month add-on (required for medical apps in the US) |
| **React SDK** | ✅ `@daily-co/react-call-object` — best DX |
| **Recording** | $0.01349/min |

**Why Daily.co over the others:**
- Cleanest React SDK, designed for embedded video
- No resolution tiering (HD included in base price)
- Best for MVP — 10K free minutes = plenty to test
- HIPAA add-on available when you need it

---

### Agora.io

| Feature | Details |
|---|---|
| **Free tier** | 10,000 minutes/month (shared bucket) |
| **Paid rate** | $3.99/1k HD video minutes |
| **HIPAA** | Requires custom contract |
| **Best for** | Large-scale live streaming, global reach |

**When to choose Agora:** You need China mainland coverage or already use Agora for other products.

---

### Twilio Video

| Feature | Details |
|---|---|
| **Free tier** | Trial credit only (no ongoing free tier) |
| **Paid rate** | $0.004/participant/minute (group rooms) |
| **HIPAA** | ✅ BAA available |
| **Best for** | Already using Twilio for SMS/calls |

**When to choose Twilio:** You're already on Twilio for SMS notifications and want one vendor for everything.

---

## 🔌 Daily.co Integration (3 steps)

### 1. Install
```bash
npm install @daily-co/daily-js @daily-co/react-call-object
```

### 2. Get API key
Sign up at [daily.co](https://www.daily.co) → Dashboard → Developers → API Key

### 3. Add to .env.local
```env
DAILY_API_KEY=your_key_here
NEXT_PUBLIC_DAILY_DOMAIN=yourdomain.daily.co
```

### 4. Create a room (API route — already set up)
Uncomment the real API call in `app/api/video/room/route.ts`:
```typescript
const response = await fetch('https://api.daily.co/v1/rooms', {
  method: 'POST',
  headers: { Authorization: `Bearer ${process.env.DAILY_API_KEY}` },
  body: JSON.stringify({
    name: `appt-${appointmentId}`,
    privacy: 'private',
    properties: {
      exp: Math.floor(Date.now() / 1000) + 3600,
      max_participants: 2,
      enable_recording: 'cloud',
    },
  }),
})
const room = await response.json()
```

### 5. Replace the mock VideoRoom component
```tsx
// components/video/VideoRoom.tsx
import DailyIframe from '@daily-co/daily-js'
import { DailyProvider, useParticipantIds, useLocalParticipant } from '@daily-co/react-call-object'

export function VideoRoom({ roomUrl, onEnd }) {
  return (
    <DailyProvider url={roomUrl}>
      <CallUI onEnd={onEnd} />
    </DailyProvider>
  )
}
```

---

## 🗄️ Database Setup

Replace `lib/data.ts` mock data with real DB queries. Recommended options:

### Option A — Supabase (easiest, PostgreSQL)
```bash
npm install @supabase/supabase-js
```
```typescript
// app/api/appointments/route.ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function GET() {
  const { data } = await supabase.from('appointments').select('*')
  return NextResponse.json({ appointments: data })
}

export async function POST(req) {
  const body = await req.json()
  const { data } = await supabase.from('appointments').insert(body).select().single()
  return NextResponse.json({ appointment: data }, { status: 201 })
}
```

### Option B — Prisma + PostgreSQL
```bash
npm install prisma @prisma/client
npx prisma init
```
```prisma
model Appointment {
  id          String   @id @default(cuid())
  doctorId    String
  patientName String
  patientEmail String
  date        String
  time        String
  status      String   @default("upcoming")
  type        String   @default("video")
  fee         Int
  symptoms    String?
  roomUrl     String?
  createdAt   DateTime @default(now())
}
```

---

## 💳 Payment Integration

Add Stripe for collecting consultation fees:
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

Add to `.env.local`:
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 🔐 Auth Setup (NextAuth.js)

```bash
npm install next-auth
```

Supports Google, email magic links, and credentials login. Separate sessions for doctors and patients using roles.

---

## 📧 Email Notifications

Use **Resend** (free 3,000 emails/month):
```bash
npm install resend
```
Send confirmation and reminder emails from your API routes.

---

## 🌍 Deployment

```bash
# Vercel (recommended)
npx vercel

# Set env vars in Vercel dashboard:
# DAILY_API_KEY, SUPABASE_URL, SUPABASE_KEY, STRIPE_SECRET_KEY, etc.
```

---

## 📋 .env.local template

```env
# Video
DAILY_API_KEY=
NEXT_PUBLIC_DAILY_DOMAIN=yourdomain.daily.co

# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=
SUPABASE_KEY=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Payments
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email
RESEND_API_KEY=
```

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VideoRoom } from "@/components/video/VideoRoom";
import { Heart, Shield } from "lucide-react";

export function VideoPageClient({ id }: { id: string }) {
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [ended, setEnded] = useState(false);

  if (ended)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-teal-900/40 rounded-full flex items-center justify-center mx-auto mb-5">
            <Heart className="w-8 h-8 text-teal-400 fill-teal-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Consultation ended</h2>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">
            Thank you for using MediConnect. Your prescription and notes will be
            sent to your email within 10 minutes.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push("/dashboard/patient")}
              className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-teal-700 text-sm"
            >
              Back to dashboard
            </button>
            <button
              onClick={() => router.push("/book")}
              className="border border-gray-700 text-gray-300 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-800 text-sm"
            >
              Book follow-up
            </button>
          </div>
        </div>
      </div>
    );

  if (!joined)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-sm w-full text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-semibold">MediConnect</span>
          </div>
          <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
            AR
          </div>
          <h2 className="text-lg font-semibold mb-1">Dr. Aisha Rahman</h2>
          <p className="text-gray-400 text-sm mb-6">
            Cardiologist · Appointment #{id.slice(-6)}
          </p>
          <div className="bg-gray-800 rounded-xl p-4 mb-6 text-left space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Doctor is in the waiting room
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-teal-500" />
              End-to-end encrypted session
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl h-32 flex items-center justify-center mb-4 text-gray-500 text-sm">
            📷 Camera preview
          </div>
          <p className="text-xs text-gray-500 mb-5">
            Your camera and microphone will be requested when you join
          </p>
          <button
            onClick={() => setJoined(true)}
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
          >
            Join consultation
          </button>
          <button
            onClick={() => router.back()}
            className="w-full mt-3 text-gray-400 text-sm hover:text-white py-2"
          >
            Go back
          </button>
        </div>
      </div>
    );

  return (
    <VideoRoom
      roomUrl={`https://mediconnect.daily.co/${id}`}
      doctorName="Dr. Aisha Rahman"
      patientName="Sara Ahmed"
      onEnd={() => setEnded(true)}
    />
  );
}

import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[320px] sm:h-[380px] md:h-[460px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient and vignette overlays to make text readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.0),rgba(2,6,23,0.05))]" />

      <div className="relative z-10 h-full flex items-end p-6 sm:p-8">
        <div>
          <h1 className="text-slate-900 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Supply Chain Task & Workflow Hub
          </h1>
          <p className="mt-2 text-slate-600 max-w-3xl">
            Coordinate chemical shipments, supplier documents, and customer updates across states — with clear ownership,
            smart reminders, and a unified, modern dashboard.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 border border-blue-100">
              Real-time overview
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 border border-emerald-100">
              Compliance documents
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 border border-amber-100">
              Smart reminders
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

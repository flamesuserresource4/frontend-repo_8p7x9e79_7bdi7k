import React, { useMemo } from 'react';
import { CheckCircle2, Clock, AlertTriangle, Package, Truck, TimerReset } from 'lucide-react';

function ProgressBar({ value, color = 'bg-blue-600' }) {
  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export default function DashboardOverview({ tasks = [], shipmentSummary }) {
  const stats = useMemo(() => {
    const total = tasks.length || 1;
    const byStatus = {
      Pending: tasks.filter(t => t.status === 'Pending').length,
      'In Progress': tasks.filter(t => t.status === 'In Progress').length,
      Done: tasks.filter(t => t.status === 'Done').length,
    };
    const byPriority = {
      High: tasks.filter(t => t.priority === 'High').length,
      Medium: tasks.filter(t => t.priority === 'Medium').length,
      Low: tasks.filter(t => t.priority === 'Low').length,
    };
    return { total, byStatus, byPriority };
  }, [tasks]);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Status Cards */}
      <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="text-amber-600" size={18} />
              <span className="text-sm font-medium text-slate-600">Pending</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{stats.byStatus['Pending']}</span>
          </div>
          <div className="mt-2">
            <ProgressBar value={(stats.byStatus['Pending'] / stats.total) * 100} color="bg-amber-500" />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TimerReset className="text-blue-600" size={18} />
              <span className="text-sm font-medium text-slate-600">In Progress</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{stats.byStatus['In Progress']}</span>
          </div>
          <div className="mt-2">
            <ProgressBar value={(stats.byStatus['In Progress'] / stats.total) * 100} color="bg-blue-600" />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-emerald-600" size={18} />
              <span className="text-sm font-medium text-slate-600">Done</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{stats.byStatus['Done']}</span>
          </div>
          <div className="mt-2">
            <ProgressBar value={(stats.byStatus['Done'] / stats.total) * 100} color="bg-emerald-600" />
          </div>
        </div>
      </div>

      {/* Shipment Summary */}
      <div className="col-span-1 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Package size={18} className="text-slate-700" />
            <h3 className="text-sm font-semibold text-slate-900">Today: Shipment Summary</h3>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
            <div className="text-xs text-emerald-700">Shipped</div>
            <div className="text-lg font-semibold text-emerald-800">{shipmentSummary.shipped}</div>
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-100 p-3">
            <div className="text-xs text-amber-700">Awaiting Docs</div>
            <div className="text-lg font-semibold text-amber-800">{shipmentSummary.awaitingDocs}</div>
          </div>
          <div className="rounded-lg bg-rose-50 border border-rose-100 p-3">
            <div className="flex items-center gap-1 text-xs text-rose-700">
              <AlertTriangle size={14} /> Delayed
            </div>
            <div className="text-lg font-semibold text-rose-800">{shipmentSummary.delayed}</div>
          </div>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="col-span-1 rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 text-sm font-semibold text-slate-900">Priority</div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-rose-600">High</span>
              <span className="text-slate-600">{stats.byPriority.High}</span>
            </div>
            <ProgressBar value={(stats.byPriority.High / stats.total) * 100} color="bg-rose-500" />
          </div>
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-600">Medium</span>
              <span className="text-slate-600">{stats.byPriority.Medium}</span>
            </div>
            <ProgressBar value={(stats.byPriority.Medium / stats.total) * 100} color="bg-amber-500" />
          </div>
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-blue-600">Low</span>
              <span className="text-slate-600">{stats.byPriority.Low}</span>
            </div>
            <ProgressBar value={(stats.byPriority.Low / stats.total) * 100} color="bg-blue-500" />
          </div>
        </div>
      </div>

      {/* Daily Routine Template */}
      <div className="col-span-1 lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 text-sm font-semibold text-slate-900">Daily Routine</div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
          <li className="flex items-center gap-2"><Truck size={16} className="text-slate-500" /> Check open orders</li>
          <li className="flex items-center gap-2"><Truck size={16} className="text-slate-500" /> Update tracking and ship dates</li>
          <li className="flex items-center gap-2"><Truck size={16} className="text-slate-500" /> Follow up for pending COAs/SDS</li>
          <li className="flex items-center gap-2"><Truck size={16} className="text-slate-500" /> Confirm warehouse readiness</li>
          <li className="flex items-center gap-2"><Truck size={16} className="text-slate-500" /> Send daily report summary</li>
        </ul>
      </div>
    </div>
  );
}

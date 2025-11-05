import React, { useEffect, useMemo, useState, useCallback } from 'react';
import HeroCover from './components/HeroCover';
import NavTabs from './components/NavTabs';
import DashboardOverview from './components/DashboardOverview';
import TaskBoard from './components/TaskBoard';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard');

  const employees = useMemo(() => ['Ana', 'Andrew', 'Nakeeta'], []);
  const shipmentSummary = useMemo(() => ({ shipped: 18, delayed: 2, awaitingDocs: 5 }), []);

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/tasks`);
      if (!res.ok) throw new Error(`Failed to load tasks (${res.status})`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <HeroCover />
        <NavTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'Dashboard' && (
          <DashboardOverview tasks={tasks} shipmentSummary={shipmentSummary} />
        )}

        {activeTab === 'Tasks' && (
          <>
            <TaskForm onCreated={fetchTasks} employees={employees} />
            {loading && (
              <div className="mt-4 text-sm text-slate-500">Loading tasks…</div>
            )}
            {error && (
              <div className="mt-4 text-sm text-rose-600">{error}</div>
            )}
            <TaskBoard tasks={tasks} />
          </>
        )}

        {activeTab === 'Documents' && (
          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold">Document Tracker</h3>
              <p className="mt-2 text-slate-600 text-sm">
                Upload and track SDS, COA, TDS, and TSCA documents. Search and filter by document type or chemical name.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-sm font-medium">SDS — IPA 99%</div>
                  <div className="text-xs text-slate-500 mt-1">Customer: Vantage • Linked Order: #4491</div>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-sm font-medium">COA — MEK Lot 23-11</div>
                  <div className="text-xs text-slate-500 mt-1">Supplier: ChemX • Linked Order: #7728</div>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-sm font-medium">TSCA — New import</div>
                  <div className="text-xs text-slate-500 mt-1">Project: Capacity</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Customers' && (
          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold">Customer Communication Log</h3>
              <p className="mt-2 text-slate-600 text-sm">
                Track follow-ups, emails, and calls. Mark items as Replied, Pending, or Escalated.
              </p>
              <div className="mt-4 divide-y divide-slate-100">
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Vantage — Shipment ETA update</div>
                    <div className="text-xs text-slate-500">Email sent • Status: Pending</div>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">Pending</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Proline — COA confirmation</div>
                    <div className="text-xs text-slate-500">Call logged • Status: Replied</div>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">Replied</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Capacity — Delay escalation</div>
                    <div className="text-xs text-slate-500">Follow-up required • Status: Escalated</div>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">Escalated</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Reports' && (
          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold">Reports & Analytics</h3>
              <p className="mt-2 text-slate-600 text-sm">
                Weekly performance summaries, shipment delays, and supplier performance will appear here with charts and export options.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-xs text-slate-500">Tasks Completed (This Week)</div>
                  <div className="text-2xl font-semibold mt-1">34</div>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-xs text-slate-500">Avg. Completion Time</div>
                  <div className="text-2xl font-semibold mt-1">1.8 days</div>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-xs text-slate-500">Delayed Shipments</div>
                  <div className="text-2xl font-semibold mt-1">2</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold">Team & Permissions</h3>
              <p className="mt-2 text-slate-600 text-sm">
                Configure roles and access. Admin can view and assign all tasks. Team members can update their own items.
              </p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <li className="rounded-lg border border-slate-200 p-3">Ana — Admin</li>
                <li className="rounded-lg border border-slate-200 p-3">Andrew — Member</li>
                <li className="rounded-lg border border-slate-200 p-3">Nakeeta — Member</li>
                <li className="rounded-lg border border-slate-200 p-3">Add new user…</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

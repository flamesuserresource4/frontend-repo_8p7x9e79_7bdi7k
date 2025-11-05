import React, { useState } from 'react';

const defaultForm = {
  title: '',
  description: '',
  assigned_to: 'Ana',
  customer: '',
  supplier: '',
  project: '',
  priority: 'Medium',
  status: 'Pending',
  due_date: '',
  notes: '',
  recurring: 'none',
};

export default function TaskForm({ onCreated, employees = ['Ana', 'Andrew', 'Nakeeta'] }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Failed to create task (${res.status})`);
      const data = await res.json();
      setForm(defaultForm);
      setOpen(false);
      onCreated?.(data.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">Add a new task to the board</div>
        <button
          onClick={() => setOpen(o => !o)}
          className="rounded-lg bg-blue-600 text-white text-sm px-3 py-2 hover:bg-blue-700 transition-colors"
        >
          {open ? 'Close' : 'Add Task'}
        </button>
      </div>

      {open && (
        <form onSubmit={handleSubmit} className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-600">Title</label>
              <input
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., COA follow-up for Vantage"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Add details..."
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600">Assigned To</label>
                <select
                  value={form.assigned_to}
                  onChange={e => setForm({ ...form, assigned_to: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {employees.map(e => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-600">Customer</label>
                <input
                  value={form.customer}
                  onChange={e => setForm({ ...form, customer: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Vantage"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600">Supplier</label>
                <input
                  value={form.supplier}
                  onChange={e => setForm({ ...form, supplier: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ChemX"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600">Project</label>
                <input
                  value={form.project}
                  onChange={e => setForm({ ...form, project: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Capacity"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-600">Priority</label>
                <select
                  value={form.priority}
                  onChange={e => setForm({ ...form, priority: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-600">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-600">Due Date</label>
                <input
                  value={form.due_date}
                  onChange={e => setForm({ ...form, due_date: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2025-11-05 or Today"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-600">Notes</label>
              <textarea
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                placeholder="Any additional context"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600">Recurring</label>
                <select
                  value={form.recurring}
                  onChange={e => setForm({ ...form, recurring: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex items-end justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-emerald-600 text-white text-sm px-4 py-2 hover:bg-emerald-700 disabled:opacity-50"
                >
                  {loading ? 'Saving…' : 'Create Task'}
                </button>
              </div>
            </div>
            {error && <div className="text-sm text-rose-600">{error}</div>}
          </div>
        </form>
      )}
    </div>
  );
}

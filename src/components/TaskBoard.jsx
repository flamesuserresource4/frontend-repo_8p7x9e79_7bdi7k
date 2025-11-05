import React, { useMemo, useState } from 'react';
import { Search, Filter } from 'lucide-react';

const statusColumns = ['Pending', 'In Progress', 'Done'];

function Badge({ children, color = 'bg-slate-100 text-slate-700 border-slate-200' }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${color}`}>
      {children}
    </span>
  );
}

function TaskCard({ task }) {
  const priorityColor =
    task.priority === 'High'
      ? 'bg-rose-50 text-rose-700 border-rose-200'
      : task.priority === 'Medium'
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-blue-50 text-blue-700 border-blue-200';
  const assigned = task.assignedTo || task.assigned_to;
  const due = task.dueDate || task.due_date;
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-slate-900">{task.title}</div>
          <div className="mt-1 text-xs text-slate-600 line-clamp-2">{task.description}</div>
        </div>
        <Badge color={priorityColor}>{task.priority}</Badge>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {assigned && <Badge>{assigned}</Badge>}
        {task.customer && <Badge>{task.customer}</Badge>}
        {due && <Badge>{due}</Badge>}
      </div>
    </div>
  );
}

export default function TaskBoard({ tasks }) {
  const [query, setQuery] = useState('');
  const [assigned, setAssigned] = useState('All');
  const [customer, setCustomer] = useState('All');
  const [status, setStatus] = useState('All');

  const allAssignees = useMemo(
    () => Array.from(new Set(tasks.map(t => t.assignedTo || t.assigned_to).filter(Boolean))),
    [tasks]
  );
  const allCustomers = useMemo(
    () => Array.from(new Set(tasks.map(t => t.customer).filter(Boolean))),
    [tasks]
  );

  const filtered = useMemo(() => {
    return tasks.filter(t => {
      const matchesQuery = query
        ? [t.title, t.description, t.customer, t.supplier, t.project].filter(Boolean).some(v =>
            String(v).toLowerCase().includes(query.toLowerCase())
          )
        : true;
      const assignee = t.assignedTo || t.assigned_to;
      const matchesAssigned = assigned === 'All' || assignee === assigned;
      const matchesCustomer = customer === 'All' || t.customer === customer;
      const matchesStatus = status === 'All' || t.status === status;
      return matchesQuery && matchesAssigned && matchesCustomer && matchesStatus;
    });
  }, [tasks, query, assigned, customer, status]);

  const grouped = useMemo(() => {
    const obj = { Pending: [], 'In Progress': [], Done: [] };
    filtered.forEach(t => obj[t.status]?.push(t));
    return obj;
  }, [filtered]);

  return (
    <div className="mt-6">
      {/* Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Quick search (orders, docs, chemicals)"
              className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select
              value={assigned}
              onChange={e => setAssigned(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              {allAssignees.map(a => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={customer}
              onChange={e => setCustomer(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              {allCustomers.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              {statusColumns.map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {statusColumns.map(col => (
          <div key={col} className="rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between p-3">
              <div className="text-sm font-semibold text-slate-800">{col}</div>
              <div className="text-xs text-slate-500">{grouped[col]?.length || 0}</div>
            </div>
            <div className="space-y-3 p-3">
              {grouped[col]?.length ? (
                grouped[col].map(t => <TaskCard key={t.id || t._id} task={t} />)
              ) : (
                <div className="text-sm text-slate-500">No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

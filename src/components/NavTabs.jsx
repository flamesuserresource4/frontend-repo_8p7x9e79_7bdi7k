import React from 'react';
import { Home, ListTodo, FileText, Users, BarChart3, Settings } from 'lucide-react';

const tabs = [
  { key: 'Dashboard', label: 'Dashboard', icon: Home },
  { key: 'Tasks', label: 'Tasks', icon: ListTodo },
  { key: 'Documents', label: 'Documents', icon: FileText },
  { key: 'Customers', label: 'Customers', icon: Users },
  { key: 'Reports', label: 'Reports', icon: BarChart3 },
  { key: 'Settings', label: 'Settings', icon: Settings },
];

export default function NavTabs({ activeTab, onChange }) {
  return (
    <div className="mt-6 w-full overflow-x-auto">
      <div className="inline-flex min-w-full gap-2 border-b border-slate-200">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`group relative -mb-px inline-flex items-center gap-2 rounded-t-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-blue-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-blue-700' : 'text-slate-500 group-hover:text-slate-900'} />
              <span>{label}</span>
              <span
                className={`absolute bottom-[-1px] left-0 right-0 h-0.5 transition-all ${
                  isActive ? 'bg-blue-600' : 'bg-transparent group-hover:bg-slate-200'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

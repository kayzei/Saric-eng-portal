
import React from 'react';

const Icon = ({ path, className = "h-6 w-6" }: { path: string, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export const ICONS = {
  dashboard: <Icon path="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3.75M3.75 3h16.5M3.75 3v1.5m16.5-1.5v1.5m-16.5 5.25h16.5" />,
  suppliers: <Icon path="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.512 2.72a3 3 0 01-4.682-2.72M12 18.72v-5.25m0 5.25v-5.25m0 5.25v-5.25M9 13.5l3 3m0 0l3-3m-3 3v-5.25m-6 5.25v-5.25m6-3l3-3m0 0l3 3m-3-3v5.25" />,
  projects: <Icon path="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
  employees: <Icon path="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 12A3.75 3.75 0 1012 4.5 3.75 3.75 0 0012 12z" />,
  reports: <Icon path="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />,
  survey: <Icon path="M9 6.75V15m6-6v8.25m.503-6.498l4.875-2.437a.375.375 0 01.497.31v11.375a.375.375 0 01-.497.31l-4.875-2.438m-8.006 0l4.875 2.438a.375.375 0 010 .62l-4.875 2.438a.375.375 0 01-.497-.31V8.438a.375.375 0 01.497-.31z" />,
  logout: <Icon path="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />,
};

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard },
  { id: 'suppliers', label: 'Suppliers', icon: ICONS.suppliers },
  { id: 'projects', label: 'Projects', icon: ICONS.projects },
  { id: 'employees', label: 'Employees', icon: ICONS.employees },
  { id: 'reports', label: 'Reports & Analytics', icon: ICONS.reports },
  { id: 'survey', label: 'Survey Data', icon: ICONS.survey, disabled: true },
];

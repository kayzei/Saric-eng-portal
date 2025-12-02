import React from 'react';
import { mockSuppliers, mockProjects, mockEmployees } from '../data/mockData';
import Card from './shared/Card';
import { ICONS } from '../constants';
import { User, Project } from '../types';

// Must use `React.` prefix as Recharts is loaded from a script tag.
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {

  // Data for Project Status Bar Chart
  const projectStatusCounts = mockProjects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.keys(projectStatusCounts).map(status => ({
    name: status,
    projects: projectStatusCounts[status],
  }));
  
  // Data for Projects by Region Pie Chart
  const projectRegionCounts = mockProjects.reduce((acc, project) => {
    acc[project.region] = (acc[project.region] || 0) + 1;
    return acc;
  }, {} as Record<Project['region'], number>);

  const pieChartData = Object.keys(projectRegionCounts).map(region => ({
      name: region,
      value: projectRegionCounts[region as Project['region']],
  }));

  const PIE_COLORS = ['#00A3FF', '#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user.name}!</h1>
      <p className="text-gray-400 mb-8">Here's a summary of engineering and project data.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Total Suppliers" value={mockSuppliers.length.toString()} icon={ICONS.suppliers} />
        <Card title="Active Projects" value={mockProjects.filter(p => p.status === 'On Track').length.toString()} icon={ICONS.projects} />
        <Card title="Total Employees" value={mockEmployees.length.toString()} icon={ICONS.employees} />
        <Card title="Survey Datasets" value="0" icon={ICONS.survey} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-saric-medium p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Project Status Overview</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                        <XAxis dataKey="name" stroke="#A0AEC0" />
                        <YAxis stroke="#A0AEC0" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', color: '#E2E8F0' }} 
                          cursor={{fill: '#2A2A2A80'}}
                        />
                        <Bar dataKey="projects" fill="#00A3FF" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-saric-medium p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Projects by Region</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                        </Pie>
                         <Tooltip 
                          contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', color: '#E2E8F0' }} 
                          cursor={{fill: '#2A2A2A80'}}
                        />
                        <Legend wrapperStyle={{ color: '#E2E8F0', paddingTop: '20px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </div>
      </div>
      
      <div className="bg-saric-medium p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Real-time Activity Feed</h2>
        <div className="text-gray-400">
          <p>Activity feed feature coming soon...</p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
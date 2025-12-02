import React from 'react';
import { mockProjects } from '../data/mockData';
import Table from './shared/Table';
import Button from './shared/Button';
import { Role, Project, User } from '../types';

interface ProjectsProps {
    user: User;
}

// FIX: Define a type for the transformed project data used in the table.
type ProjectTableRow = Omit<Project, 'budget' | 'status'> & {
    budget: string;
    status: React.ReactNode;
};

const Projects: React.FC<ProjectsProps> = ({ user }) => {
    const canModify = user.role === Role.ADMIN || user.role === Role.MANAGER;

    // FIX: Explicitly type the columns array to match the data structure.
    const columns: { header: string; accessor: keyof ProjectTableRow }[] = [
        { header: 'Project Name', accessor: 'name' },
        { header: 'Client', accessor: 'client' },
        { header: 'Location', accessor: 'location' },
        { header: 'Region', accessor: 'region' },
        { header: 'Manager', accessor: 'manager' },
        { header: 'Budget', accessor: 'budget' },
        { header: 'Status', accessor: 'status' },
    ];
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Track': return 'bg-green-500 text-green-900';
            case 'Completed': return 'bg-blue-500 text-blue-900';
            case 'At Risk': return 'bg-yellow-500 text-yellow-900';
            case 'On Hold': return 'bg-gray-500 text-gray-900';
            default: return 'bg-gray-200 text-gray-800';
        }
    }

    const renderRow = (project: Project): ProjectTableRow => ({
        ...project,
        budget: formatCurrency(project.budget),
        status: (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
            </span>
        )
    });

    const baseActions = [
        { label: 'View on Map', onClick: (item: ProjectTableRow) => alert(`Showing ${item.name} at ${item.location} on the map.`) },
    ];

    const modifyingActions = canModify ? [
        ...baseActions,
        { label: 'Edit', onClick: (item: ProjectTableRow) => alert(`Editing ${item.name}`) },
        { label: 'Delete', onClick: (item: ProjectTableRow) => alert(`Deleting ${item.name}`), className: 'bg-red-600 hover:bg-red-700' },
    ] : baseActions;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Project Management</h1>
                {canModify && <Button onClick={() => alert('Add new project')}>Add Project</Button>}
            </div>
            <Table columns={columns} data={mockProjects.map(renderRow)} actions={modifyingActions} />
        </div>
    );
};

export default Projects;
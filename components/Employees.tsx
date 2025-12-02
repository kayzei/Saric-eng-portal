import React from 'react';
import { mockEmployees } from '../data/mockData';
import Table from './shared/Table';
import Button from './shared/Button';
import { Role, Employee, User } from '../types';

interface EmployeesProps {
    user: User;
}

const Employees: React.FC<EmployeesProps> = ({ user }) => {
    const canModify = user.role === Role.ADMIN; // Only Admin can modify employee data

    const columns: { header: string; accessor: keyof Employee }[] = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role' },
        { header: 'Department', accessor: 'department' },
        { header: 'Assigned Project', accessor: 'assignedProject' },
    ];
    
    const baseActions = [
        { label: 'View CV', onClick: (item: Employee) => alert(`Viewing CV for ${item.name}`) },
    ];

    const modifyingActions = canModify ? [
        ...baseActions,
        { label: 'Edit', onClick: (item: Employee) => alert(`Editing ${item.name}`) },
        { label: 'Delete', onClick: (item: Employee) => alert(`Deleting ${item.name}`), className: 'bg-red-600 hover:bg-red-700' },
    ] : baseActions;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Employee Management</h1>
                {canModify && <Button onClick={() => alert('Add new employee')}>Add Employee</Button>}
            </div>
            <Table columns={columns} data={mockEmployees} actions={modifyingActions} />
        </div>
    );
};

export default Employees;
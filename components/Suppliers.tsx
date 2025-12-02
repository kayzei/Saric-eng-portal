import React from 'react';
import { mockSuppliers } from '../data/mockData';
import Table from './shared/Table';
import Button from './shared/Button';
import { Role, Supplier, User } from '../types';

interface SuppliersProps {
  user: User;
}

type SupplierTableRow = Omit<Supplier, 'status' | 'productsServices' | 'certification'> & { 
  status: React.ReactNode;
  productsServices: string;
  certification: React.ReactNode;
};

const Suppliers: React.FC<SuppliersProps> = ({ user }) => {
  const canModify = user.role === Role.ADMIN || user.role === Role.MANAGER;

  const columns: { header: string; accessor: keyof SupplierTableRow }[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Contact Person', accessor: 'contactPerson' },
    { header: 'Email', accessor: 'email' },
    { header: 'Products/Services', accessor: 'productsServices' },
    { header: 'Certification', accessor: 'certification' },
    { header: 'Status', accessor: 'status' },
  ];

  const renderStatus = (status: Supplier['status']) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
      status === 'Active' ? 'bg-green-500 text-green-900' : 'bg-red-500 text-red-900'
    }`}>
      {status}
    </span>
  );

  const renderCertification = (status: Supplier['certification']) => {
    const colorMap = {
      'Certified': 'bg-blue-500 text-blue-900',
      'Pending': 'bg-yellow-500 text-yellow-900',
      'None': 'bg-gray-500 text-gray-900',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorMap[status]}`}>
        {status}
      </span>
    );
  };

  const renderRow = (supplier: Supplier): SupplierTableRow => ({
    ...supplier,
    status: renderStatus(supplier.status),
    productsServices: supplier.productsServices.join(', '),
    certification: renderCertification(supplier.certification),
  });
  
  const baseActions = [
      { label: 'View Docs', onClick: (item: SupplierTableRow) => alert(`Viewing documents for ${item.name}`) },
  ];

  const modifyingActions = canModify ? [
    ...baseActions,
    { label: 'Edit', onClick: (item: SupplierTableRow) => alert(`Editing ${item.name}`) },
    { label: 'Delete', onClick: (item: SupplierTableRow) => alert(`Deleting ${item.name}`), className: 'bg-red-600 hover:bg-red-700' },
  ] : baseActions;

  return (
    <div>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-white">Supplier Management</h1>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => alert('Exporting to PDF...')} className="bg-saric-light hover:bg-opacity-80">Export to PDF</Button>
          <Button onClick={() => alert('Exporting to Sheets...')} className="bg-saric-light hover:bg-opacity-80">Export to Sheets</Button>
          {canModify && <Button onClick={() => alert('Add new supplier')}>Add Supplier</Button>}
        </div>
      </div>
      <Table 
        columns={columns} 
        data={mockSuppliers.map(renderRow)} 
        actions={modifyingActions} 
      />
    </div>
  );
};

export default Suppliers;
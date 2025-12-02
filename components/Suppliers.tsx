
import React, { useState } from 'react';
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierTableRow | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

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

  const handleContactClick = (supplier: SupplierTableRow) => {
    setSelectedSupplier(supplier);
    setSubject('');
    setMessage('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of sending a message
    alert(`Message sent to ${selectedSupplier?.email} (${selectedSupplier?.contactPerson})\n\nSubject: ${subject}\nMessage: ${message}`);
    handleCloseModal();
  };
  
  const baseActions = [
      { label: 'View Docs', onClick: (item: SupplierTableRow) => alert(`Viewing documents for ${item.name}`) },
  ];

  const modifyingActions = canModify ? [
    ...baseActions,
    { label: 'Contact', onClick: (item: SupplierTableRow) => handleContactClick(item), className: 'bg-green-600 hover:bg-green-700' },
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

      {isModalOpen && selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-saric-medium rounded-lg shadow-xl w-full max-w-md border border-saric-light">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Contact Supplier</h2>
                        <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="mb-4 text-sm text-gray-400">
                        To: <span className="text-white font-semibold">{selectedSupplier.contactPerson}</span> at <span className="text-white font-semibold">{selectedSupplier.name}</span>
                    </div>

                    <form onSubmit={handleSendMessage}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                            <input 
                                type="text" 
                                className="w-full bg-saric-light text-white p-3 rounded-lg border border-gray-600 focus:border-saric-blue focus:ring-1 focus:ring-saric-blue focus:outline-none transition-all"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                placeholder="Inquiry regarding..."
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                            <textarea 
                                className="w-full bg-saric-light text-white p-3 rounded-lg border border-gray-600 focus:border-saric-blue focus:ring-1 focus:ring-saric-blue focus:outline-none transition-all h-32 resize-none"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Type your message here..."
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button 
                                type="button"
                                onClick={handleCloseModal}
                                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-saric-light transition-colors"
                            >
                                Cancel
                            </button>
                            <Button type="submit">
                                Send Message
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;

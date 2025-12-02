
import React, { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import Table from './shared/Table';
import { Role, User } from '../types';

interface BankingProps {
  user: User;
}

interface FinancialService {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const Banking: React.FC<BankingProps> = ({ user }) => {
  const canAccessConfidential = user.role === Role.ADMIN || user.role === Role.MANAGER;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<FinancialService | null>(null);

  const services: FinancialService[] = [
    { 
      id: 'factoring', 
      title: 'Invoice Factoring', 
      description: 'Get early payment on your outstanding invoices to improve cash flow.',
      icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    { 
      id: 'equipment', 
      title: 'Equipment Leasing', 
      description: 'Flexible financing options for heavy machinery and survey equipment.',
      icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
    },
    { 
      id: 'insurance', 
      title: 'Project Insurance', 
      description: 'Comprehensive coverage for construction sites, workers, and transit.',
      icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'
    },
    { 
      id: 'forex', 
      title: 'Forex & Cross-Border', 
      description: 'Competitive exchange rates and settlement for international logistics.',
      icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
    },
  ];

  const recentTransactions = [
    { id: 1, date: '2023-10-25', description: 'Equipment Leasing - Caterpillar D6', amount: '-$15,000.00', status: 'Completed', type: 'Debit' },
    { id: 2, date: '2023-10-24', description: 'Client Payment - Titan Bridge', amount: '+$120,000.00', status: 'Completed', type: 'Credit' },
    { id: 3, date: '2023-10-22', description: 'Supplier Payment - Quantum Supplies', amount: '-$45,200.00', status: 'Pending', type: 'Debit' },
    { id: 4, date: '2023-10-20', description: 'Payroll Run - Oct 2023', amount: '-$85,000.00', status: 'Completed', type: 'Debit' },
  ];

  const handleOpenModal = (service: FinancialService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Banking & Financial Services</h1>
      <p className="text-gray-400 mb-8">Integrated financial solutions for your logistics and engineering needs.</p>

      {/* Account Overview - Only for Admin/Manager */}
      {canAccessConfidential && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card 
            title="Operational Account (ZMW)" 
            value="ZMW 2,540,200" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>} 
          />
          <Card 
            title="Forex Account (USD)" 
            value="$ 154,300" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} 
          />
          <Card 
            title="Available Credit Limit" 
            value="$ 500,000" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>} 
          />
        </div>
      )}

      {/* Services Section */}
      <h2 className="text-xl font-semibold text-white mb-6">Services We Offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {services.map((service) => (
          <div key={service.id} className="bg-saric-medium p-6 rounded-lg shadow-lg border border-transparent hover:border-saric-blue transition-colors group">
            <div className="bg-saric-light w-12 h-12 rounded-lg flex items-center justify-center text-saric-blue mb-4 group-hover:bg-saric-blue group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{service.description}</p>
            <Button onClick={() => handleOpenModal(service)} className="w-full text-sm">
              Inquire / Apply
            </Button>
          </div>
        ))}
      </div>

      {/* Recent Transactions - Admin/Manager only */}
      {canAccessConfidential && (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
                 <Button onClick={() => alert('Download Statement')}>Download Statement</Button>
            </div>
            <Table 
                columns={[
                    { header: 'Date', accessor: 'date' },
                    { header: 'Description', accessor: 'description' },
                    { header: 'Type', accessor: 'type' },
                    { header: 'Amount', accessor: 'amount' },
                    { header: 'Status', accessor: 'status' },
                ]} 
                data={recentTransactions.map(t => ({
                    ...t,
                    amount: <span className={t.type === 'Credit' ? 'text-green-400' : 'text-white'}>{t.amount}</span>,
                    status: <span className={`px-2 py-1 text-xs rounded-full ${t.status === 'Completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>{t.status}</span>
                }))} 
            />
        </div>
      )}

      {/* Service Request Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-saric-medium rounded-lg shadow-xl w-full max-w-md border border-saric-light">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">{selectedService.title}</h2>
                        <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <p className="text-gray-300 mb-6 text-sm">
                        Submit an inquiry to our financial department regarding <strong>{selectedService.title}</strong>. A representative will contact you shortly.
                    </p>

                    <form onSubmit={(e) => { e.preventDefault(); alert('Request submitted successfully!'); handleCloseModal(); }}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-medium mb-2">Company / Project Name</label>
                            <input 
                                type="text" 
                                className="w-full bg-saric-light text-white p-3 rounded-lg border border-gray-600 focus:border-saric-blue focus:ring-1 focus:ring-saric-blue focus:outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm font-medium mb-2">Additional Details</label>
                            <textarea 
                                className="w-full bg-saric-light text-white p-3 rounded-lg border border-gray-600 focus:border-saric-blue focus:ring-1 focus:ring-saric-blue focus:outline-none transition-all h-24 resize-none"
                                placeholder="e.g. Estimated amount required, timeline..."
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
                                Submit Request
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

export default Banking;

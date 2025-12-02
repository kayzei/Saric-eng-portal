
import React, { useState } from 'react';
import { mockFleet } from '../data/mockData';
import Table from './shared/Table';
import Button from './shared/Button';
import Card from './shared/Card';
import Spinner from './shared/Spinner';
import { User, Vehicle } from '../types';

interface FleetProps {
    user: User;
}

const Fleet: React.FC<FleetProps> = ({ user }) => {
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizationMsg, setOptimizationMsg] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [selectedMapVehicle, setSelectedMapVehicle] = useState<string | null>(null);

    const activeVehicles = mockFleet.filter(v => v.status === 'In Transit').length;
    const maintenanceVehicles = mockFleet.filter(v => v.status === 'Maintenance').length;
    const avgFuel = Math.round(mockFleet.reduce((acc, v) => acc + v.fuelLevel, 0) / mockFleet.length);

    const handleOptimizeRoutes = () => {
        setIsOptimizing(true);
        setOptimizationMsg('');
        // Simulate AI processing time
        setTimeout(() => {
            setIsOptimizing(false);
            setOptimizationMsg('Kiprojects AI: Routes optimized. Estimated savings: 150km (approx. 45L fuel) for today\'s fleet.');
        }, 2000);
    };

    const renderStatus = (status: Vehicle['status']) => {
        const colors = {
            'In Transit': 'bg-blue-500 text-blue-900',
            'Idle': 'bg-gray-500 text-gray-900',
            'Maintenance': 'bg-red-500 text-red-900',
            'Loading': 'bg-yellow-500 text-yellow-900',
        };
        return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[status]}`}>{status}</span>;
    };

    const renderHealth = (status: Vehicle['healthStatus']) => {
        const colors = {
            'Good': 'text-green-500',
            'Warning': 'text-yellow-500',
            'Critical': 'text-red-500 animate-pulse',
        };
        return (
            <div className="flex items-center">
                <span className={`h-2 w-2 rounded-full mr-2 bg-current ${colors[status]}`}></span>
                <span className="text-gray-300">{status}</span>
            </div>
        );
    };

    const renderOwner = (owner: string) => (
        <span className={`text-xs px-2 py-0.5 rounded border ${owner === 'SARIC' ? 'border-saric-blue text-saric-blue' : 'border-gray-500 text-gray-400'}`}>
            {owner}
        </span>
    );

    const columns: { header: string; accessor: keyof Vehicle | 'healthDisplay' | 'statusDisplay' | 'ownerDisplay' }[] = [
        { header: 'Vehicle ID', accessor: 'id' },
        { header: 'Type', accessor: 'type' },
        { header: 'Owner', accessor: 'ownerDisplay' },
        { header: 'Driver', accessor: 'driver' },
        { header: 'Location', accessor: 'location' },
        { header: 'Destination', accessor: 'destination' },
        { header: 'ETA', accessor: 'eta' },
        { header: 'Health', accessor: 'healthDisplay' },
        { header: 'Status', accessor: 'statusDisplay' },
    ];

    const tableData = mockFleet.map(v => ({
        ...v,
        statusDisplay: renderStatus(v.status),
        healthDisplay: renderHealth(v.healthStatus),
        ownerDisplay: renderOwner(v.owner),
    }));

    // Generate deterministic "coordinates" based on ID for demo purposes
    const getMockCoordinates = (id: string) => {
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        // Use hash to place randomly on the "map" (20% to 80% range to avoid edges)
        const top = (hash * 17) % 60 + 20; 
        const left = (hash * 31) % 60 + 20;
        return { top: `${top}%`, left: `${left}%` };
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Fleet & Logistics</h1>
                    <p className="text-xs text-saric-blue font-semibold tracking-wider uppercase">Powered by Kiprojects Systems</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden lg:block">
                        <p className="text-gray-400 text-sm">Security Level: <span className="text-green-400">High</span></p>
                        <p className="text-gray-500 text-xs">Encrypted Stream • Live</p>
                    </div>
                    <div className="flex bg-saric-medium p-1 rounded-lg border border-saric-light">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-saric-blue text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        >
                            List View
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-saric-blue text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        >
                            Live Map
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card 
                    title="Active Fleet" 
                    value={activeVehicles.toString()} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>}
                />
                <Card 
                    title="In Maintenance" 
                    value={maintenanceVehicles.toString()} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l5.652-4.655M17.25 21l-2.831-2.831a2.652 2.652 0 012.831 2.831zm0-9.17l-3.03 2.496c-.384.317-.626.74-.766 1.208L13.413 6a3 3 0 115.837 5.837l-2.003-2.667z" /></svg>}
                />
                <Card 
                    title="Avg Fuel Level" 
                    value={`${avgFuel}%`} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /></svg>}
                />
                <div className="bg-saric-medium p-6 rounded-lg shadow-lg flex flex-col justify-between border border-saric-light">
                    <p className="text-gray-400 text-sm">AI Automation</p>
                    <div className="mt-2">
                        {isOptimizing ? (
                             <div className="flex items-center text-saric-blue">
                                <Spinner />
                                <span className="ml-2 text-sm font-semibold">Calculating routes...</span>
                             </div>
                        ) : (
                             <Button onClick={handleOptimizeRoutes} className="w-full py-1 text-sm bg-indigo-600 hover:bg-indigo-700">
                                Optimize Routes
                             </Button>
                        )}
                    </div>
                </div>
            </div>

            {optimizationMsg && (
                <div className="mb-6 bg-indigo-900 bg-opacity-40 border border-indigo-700 text-indigo-200 p-4 rounded-lg flex items-start animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{optimizationMsg}</span>
                </div>
            )}

            {viewMode === 'list' ? (
                <Table 
                    columns={columns as any} 
                    data={tableData}
                    actions={[
                        { label: 'Track Live', onClick: (item) => { setViewMode('map'); setSelectedMapVehicle(item.id); } }
                    ]}
                />
            ) : (
                <div className="bg-saric-medium rounded-lg shadow-lg border border-saric-light h-[600px] relative overflow-hidden group">
                    {/* Map Background Pattern */}
                    <div className="absolute inset-0 bg-[#1a202c]">
                        {/* Grid Lines */}
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(#2d3748 1px, transparent 1px), linear-gradient(90deg, #2d3748 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            opacity: 0.2
                        }}></div>
                        
                        {/* Simulated Roads/Features */}
                        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M-10 300 Q 400 250 800 400 T 1600 300" stroke="#4A5568" strokeWidth="15" fill="none" />
                             <path d="M200 -10 Q 250 300 150 800" stroke="#4A5568" strokeWidth="15" fill="none" />
                             <circle cx="50%" cy="50%" r="200" stroke="#4A5568" strokeWidth="2" fill="none" strokeDasharray="10 5" />
                        </svg>
                    </div>

                    {/* Map Controls (Visual Only) */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                        <button className="bg-saric-light p-2 rounded text-white hover:bg-saric-blue transition-colors">+</button>
                        <button className="bg-saric-light p-2 rounded text-white hover:bg-saric-blue transition-colors">-</button>
                    </div>
                    <div className="absolute top-6 left-6 bg-saric-dark bg-opacity-80 p-3 rounded border border-saric-light backdrop-blur-sm">
                        <h3 className="text-white font-bold text-sm">Live Operations Map</h3>
                        <p className="text-xs text-gray-400">Region: Zambia Central</p>
                    </div>

                    {/* Vehicles */}
                    {mockFleet.filter(v => v.status === 'In Transit').map(v => {
                        const coords = getMockCoordinates(v.id);
                        const isSelected = selectedMapVehicle === v.id;
                        
                        return (
                            <div 
                                key={v.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ease-in-out"
                                style={{ top: coords.top, left: coords.left }}
                                onClick={() => setSelectedMapVehicle(isSelected ? null : v.id)}
                            >
                                {/* Ripple Effect */}
                                <div className="absolute -inset-4 bg-saric-blue rounded-full opacity-20 animate-ping"></div>
                                
                                {/* Vehicle Marker */}
                                <div className={`relative z-10 flex items-center justify-center h-10 w-10 rounded-full border-2 shadow-lg transition-transform hover:scale-110 ${isSelected ? 'bg-saric-blue border-white scale-110' : 'bg-saric-medium border-saric-blue'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-saric-blue'}`}>
                                        <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                                        <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.171 1.522-.93 1.522-1.838V9.75c0-.414-.168-.811-.461-1.104l-2.025-2.025a1.56 1.56 0 00-1.104-.461h-2.182a.75.75 0 00-.75.75z" />
                                        <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                    </svg>
                                </div>

                                {/* Info Popup */}
                                <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-56 bg-saric-dark border border-saric-light rounded-lg shadow-xl overflow-hidden z-20 transition-all duration-200 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <div className="bg-saric-blue px-3 py-2">
                                        <h4 className="text-white font-bold text-sm">{v.id}</h4>
                                    </div>
                                    <div className="p-3 text-xs space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Driver:</span>
                                            <span className="text-gray-200">{v.driver}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Status:</span>
                                            <span className="text-green-400">In Transit</span>
                                        </div>
                                        <div className="pt-2 border-t border-gray-700 mt-2">
                                            <p className="text-gray-400 mb-1">Current Location:</p>
                                            <p className="text-white font-medium">{v.location}</p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-gray-400 mb-1">Destination:</p>
                                            <p className="text-white font-medium">{v.destination}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Fleet;

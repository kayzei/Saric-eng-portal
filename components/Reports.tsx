import React, { useState } from 'react';
import Button from './shared/Button';
import Spinner from './shared/Spinner';
import { generateReportSummary } from '../services/geminiService';
import { mockProjects, mockSuppliers } from '../data/mockData';

const Reports: React.FC = () => {
    const [prompt, setPrompt] = useState('Summarize the current status of all active projects, highlighting any that are at risk. Also, list our active suppliers.');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [report, setReport] = useState<string | null>(null);

    const handleGenerateReport = async () => {
        if (!prompt.trim()) {
            setError('Prompt cannot be empty.');
            return;
        }
        setLoading(true);
        setError(null);
        setReport(null);
        try {
            const dataContext = {
                projects: mockProjects,
                suppliers: mockSuppliers,
            };
            const result = await generateReportSummary(prompt, dataContext);
            setReport(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Reports & Analytics</h1>
            
            <div className="bg-saric-medium p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Standard Reports</h2>
                <p className="text-gray-400 mb-4">
                    Generate and download standard reports in various formats.
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => alert('Generating PDF report...')} className="bg-saric-light hover:bg-opacity-80">
                        Generate Project Summary (PDF)
                    </Button>
                    <Button onClick={() => alert('Exporting to Excel...')} className="bg-saric-light hover:bg-opacity-80">
                        Export All Data (Excel)
                    </Button>
                </div>
            </div>

            <div className="bg-saric-medium p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">AI-Powered Data Analysis</h2>
                <p className="text-gray-400 mb-4">
                    Ask a question about your projects or suppliers, and our AI will generate a summary for you. The current data context will be provided to the AI automatically.
                </p>
                <textarea
                    className="w-full p-3 bg-saric-light text-gray-200 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-saric-blue transition-shadow"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Which projects are over budget? or List suppliers with inactive status."
                />
                <div className="mt-4">
                    <Button onClick={handleGenerateReport} disabled={loading}>
                        {loading ? <Spinner /> : 'Generate AI Summary'}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="mt-6 bg-red-900 border border-red-700 text-red-200 p-4 rounded-lg">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            {report && (
                 <div className="mt-6 bg-saric-medium p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">Generated AI Report</h2>
                    <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
                        {report}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reports;